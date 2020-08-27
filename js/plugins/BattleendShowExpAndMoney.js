/*:
* @target MZ
* @plugindesc 戦闘終了時にパーティの状態を表示するアレと経験値バー
* Ver 1.0.2
* @author 木下英一
* @help BattleendShowExpAndMoney.js
*
* 基本的にはデフォルトのシステム用に作られています。
* ターン制・タイムプログレス制両対応。
* （簡単な確認しかしてないけど）
*
* ＜アレ＞
* 戦闘終了時（勝利の場合）、
* 戦闘メンバーの経験値の状態とパーティの所持金を表示します。
* 表示タイミングは勝利メッセージを閉じた直後です。
* そのため、戦闘画面閉じるまでの決定操作が１回増えます。
*
* ＜メニューの簡易ステータスに経験値＞
* このほかに、メニュー画面の簡易ステータスに経験値を追加できます。
* スペースの都合上、メニュー画面にＴＰは表示できなくなります。
* 詳細ステータスや戦闘中では影響ありません。
*
* ＜他＞
* プラグインコマンドはありません。
*
* 設定変更して戦闘テストする場合、
* 戦闘テスト前にセーブしないと反映されませんのでご注意ください。
*
* 無保証。改造自由。
* 利用も商用・無償・年齢区分にかかわらず自由。
*
* 全体的に力業でやってるので、改造はちょっと難しいかもしれません。
* 他プラグインとぶつかったりするかもしれません。
* その時は、その…。何とかがんばって。
*
* ＜履歴＞
* Ver 1.0.2
* ・「バトルの中断」と全滅に対応し忘れてたので対応。
* ・メソッド呼び出しミスでタイムプログレス系でいきなりエラー落ちしていたのを修正。
*
* Ver 1.0.1
* ・一部ローカル変数を初期化していなかった為、
* 　２回目以降の戦闘で処理が空ループになってしまい進まなくなっていたのを修正。
*
* Ver 1.0.0
* ・一応完成。
* @url https://kinoei.sakura.ne.jp

* @param enable_endstatus
* @text 下部のステータス画面を表示するかどうか
* @desc これを有効にすると、
* アレを表示する際に下部パラメーターも一緒に表示します。
* @default false
* @type boolean
* @on うむッ！
* @off いかんッ！

* @param enable_exp_for_mainmenu
* @text いつものあの画面に経験値表示するかどうか
* @desc これを有効にすると、ＴＰ表示の代わりに
* メニュー画面の簡易ステータスに経験値欄が追加されます。
* @default true
* @type boolean
* @on うむッ！
* @off いかんッ！
*/
(() => {
	'use strict';
	//-----------------------------------------------------------------------------
	//
	//
	// パラメータをほじくるときに使います

	let plugin_params = PluginManager.parameters("BattleendShowExpAndMoney");

	//-----------------------------------------------------------------------------
	// BattleManager
	//
	// バトルの進行状況を管理する静的クラスです。

	const old_battle_manager_init_members = BattleManager.initMembers;
	BattleManager.initMembers = function() {
		old_battle_manager_init_members.apply(this, arguments);
		this._showResult = 0;
	};
	
	BattleManager.setNowExpAndMoneyWindow = function(window){
		this._nowExpAndMoneyWindow = window;
	};

	BattleManager.setStatusWindow = function(window){
		this._statusWindow = window;
	};

	BattleManager.update = function(timeActive) {
		if (!this.isBusy() && (this._nowExpAndMoneyWindow.openness < 255) && !this.updateEvent()) {
			this.updatePhase(timeActive);
		}
		if (this.isTpb()) {
			this.updateTpbInput();
		}
		if(this._showResult){
			if (!this.isBusy()){
				this.updateShowNowExpAndMoney();
			}
		}
	};

	BattleManager.updateBattleEnd = function() {
		if (this.isBattleTest()) {
			//戦闘テスト
			if(this._showResult == 3){
				AudioManager.stopBgm();
				SceneManager.exit();
			}
		} else if (!this._escaped && $gameParty.isAllDead()) {
			//撤退成功　か　敗退
			if (this._canLose) {
				$gameParty.reviveBattleMembers();
				SceneManager.pop();
			} else {
				SceneManager.goto(Scene_Gameover);
			}
		} else {
			// 勝った
			if(this._showResult == 3){
				SceneManager.pop();
			}
		}
		this._phase = "";
	};

	BattleManager.updateShowNowExpAndMoney = function() {
		if(this._showResult === 1){
			this._nowExpAndMoneyWindow.open();
			this._nowExpAndMoneyWindow.show();
			this._nowExpAndMoneyWindow.activate();
			if(plugin_params["enable_endstatus"] == "true"){
				this._statusWindow.deselect();
				this._statusWindow.show();
				this._statusWindow.open();
			}else{
				this._statusWindow.hide();
			}
			if(this._nowExpAndMoneyWindow.isOpenAndActive()){
				if(Input.isTriggered("ok") || TouchInput.isTriggered()){
					this._nowExpAndMoneyWindow.openness--;	//力業
					this._showResult = 2;
				}
			}
		}else if(this._showResult === 2){
			//これで戦闘シーンの終了
			this._showResult = 3;
			this.endBattle(0);
		}
	}

	BattleManager.processVictory = function() {
		$gameParty.removeBattleStates();
		$gameParty.performVictory();
		this.playVictoryMe();
		this.replayBgmAndBgs();
		this.makeRewards();
		this.displayVictoryMessage();
		this.displayRewards();
		this.gainRewards();
		this._showResult = 1;
		this._phase = "battleEnd";
	};

	const old_battle_manager_process_abort = BattleManager.processAbort;
	BattleManager.processAbort = function() {
		old_battle_manager_process_abort.apply(this, arguments);
		this._showResult = 3;
	};

	const old_battle_manager_process_defeat = BattleManager.processDefeat;
	BattleManager.processDefeat = function() {
		old_battle_manager_process_defeat.apply(this, arguments);
		this._showResult = 3;
	};

	//-----------------------------------------------------------------------------
	// Scene_Battle
	//
	// バトル画面のシーンクラスです。

	const old_scene_battle_initialize = Scene_Battle.prototype.initialize;
	Scene_Battle.prototype.initialize = function() {
		old_scene_battle_initialize.apply(this, arguments);

		//念のため
		if(plugin_params["enableEndstatus"] === undefined){
			plugin_params["enableEndstatus"] = false;
		}
	};

	Scene_Battle.prototype.stop = function() {
		Scene_Message.prototype.stop.call(this);
		if (this.needsSlowFadeOut()) {
			this.startFadeOut(this.slowFadeSpeed(), false);
		} else {
			this.startFadeOut(this.fadeSpeed(), false);
		}
		this._nowExpAndMoneyWindow.close();
		this._statusWindow.close();
		this._partyCommandWindow.close();
		this._actorCommandWindow.close();
	};

	const old_scene_battle_create_all_windows = Scene_Battle.prototype.createAllWindows;
	Scene_Battle.prototype.createAllWindows = function() {
		old_scene_battle_create_all_windows.apply(this, arguments);
		BattleManager.setStatusWindow(this._statusWindow);
		this.createExpAndMoneyWindow();
	};

	const old_scene_battle_create_display_objects = Scene_Battle.prototype.createDisplayObjects;
	Scene_Battle.prototype.createDisplayObjects = function() {
		old_scene_battle_create_display_objects.apply(this, arguments);
		BattleManager.setNowExpAndMoneyWindow(this._nowExpAndMoneyWindow);
	};

	Scene_Battle.prototype.createExpAndMoneyWindow = function() {
		const rect = this.nowExpAndMoneyWindowRect.apply(this, arguments);
		this._nowExpAndMoneyWindow = new Window_NowExpAndMoney(rect);
		this._nowExpAndMoneyWindow.hide();
		this.addWindow(this._nowExpAndMoneyWindow);
	};

	Scene_Battle.prototype.updateInputWindowVisibility = function() {
		if ($gameMessage.isBusy() || (BattleManager._showResult)) {
			this.closeCommandWindows();
			this.hideSubInputWindows();
		} else if (this.needsInputWindowChange()) {
			this.changeInputWindow();
		}
	};

	Scene_Battle.prototype.nowExpAndMoneyWindowRect = function() {
		const ww = parseInt(Graphics.boxWidth * 0.55, 10);
		const wh = this.calcWindowHeight($gameParty.members().length + 1, false);
		const wx = (Graphics.boxWidth >> 1) - (ww >> 1);
		const wy = (Graphics.boxHeight >> 1) - (wh >> 1);
		return new Rectangle(wx, wy, ww, wh);
	};

	//-----------------------------------------------------------------------------
	// Window_StatusBase
	//
	// アクターの状態を表示するためのウィンドウのスーパークラスです。

	Window_StatusBase.prototype.placeBasicGauges = function(actor, x, y) {
		this.placeGauge(actor, "hp", x, y);
		this.placeGauge(actor, "mp", x, y + this.gaugeLineHeight());

		//経験値
		//設定が無効になっているときはデフォルト値
		if(plugin_params["enable_exp_for_mainmenu"] == undefined){
			plugin_params["enable_exp_for_mainmenu"] == "true";
		}
		if(SceneManager._scene.constructor === Scene_Menu){
			//メニューではＴＰと経験値どっちか一つを表示（経験値優先）
			if(plugin_params["enable_exp_for_mainmenu"] == "true"){
				//ここしか使わないので直
				const key = "actor%1-gauge-%2".format(actor.actorId(), "exp");
				const sprite = this.createInnerSprite(key, Sprite_Gauge_Exp);
				sprite.setup(actor, "exp");
				sprite.move(x, y + this.gaugeLineHeight() * 2);
				sprite.show();
			}else{
				//TP
				if ($dataSystem.optDisplayTp) {
					this.placeGauge(actor, "tp", x, y + this.gaugeLineHeight() * 2);
				}
			}
		}else{
			//TP
			if ($dataSystem.optDisplayTp) {
				this.placeGauge(actor, "tp", x, y + this.gaugeLineHeight() * 2);
			}
		}
	};

	//-----------------------------------------------------------------------------
	// Window_NowExpAndMoney
	//
	// 戦闘参加中メンバーの経験値とパーティ所持金の状態を表示します。
	
	function Window_NowExpAndMoney() {
		this.initialize(...arguments);
	}
	
	Window_NowExpAndMoney.prototype = Object.create(Window_StatusBase.prototype);
	Window_NowExpAndMoney.prototype.constructor = Window_NowExpAndMoney;
	
	Window_NowExpAndMoney.prototype.initialize = function(rect) {
		Window_StatusBase.prototype.initialize.call(this, rect);
		this.openness = 0;
		this.refresh();
	};

	Window_NowExpAndMoney.prototype.update = function() {
		Window_StatusBase.prototype.update.call(this);
	}
	
	Window_NowExpAndMoney.prototype.isBusy = function() {
		return this.openness > 0;
	}

	Window_NowExpAndMoney.prototype.colSpacing = function() {
		return 0;
	};
	
	Window_NowExpAndMoney.prototype.refresh = function() {
		const rect = this.itemLineRect(0);
		const x = 6;
		const y = 6;
		const width = rect.width;
		let members = $gameParty.members()
		this.contents.clear();
		let i = 0;
		let actor;
		let ox = x;
		let oy = y;
		for(i = 0; i < members.length; i++){
			actor = members[i];
			ox = x;
			oy = i * this.lineHeight();
			this.placeActorName(actor, ox, oy);
			ox += 144;
			this.drawActorLevel(actor, ox, oy - 5);	//オフセットズレてるので（何故かは知らぬ）
			ox += 102;
			this.placeGauge(actor, "exp", ox, oy);
		}
		oy = i * this.lineHeight();
		this.drawCurrencyValue(this.goldValue(), this.currencyUnit(), x, oy, width);
	};

	Window_NowExpAndMoney.prototype.placeGauge = function(actor, type, x, y) {
		const key = "actor%1-gauge-%2".format(actor.actorId(), type);
		const sprite = this.createInnerSprite(key, Sprite_Gauge_Exp_Long);
		sprite.setup(actor, type);
		sprite.move(x, y);
		sprite.show();
	};
	
	Window_NowExpAndMoney.prototype.goldValue = function() {
		return $gameParty.gold();
	};
	
	Window_NowExpAndMoney.prototype.currencyUnit = function() {
		return TextManager.currencyUnit;
	};
	
	Window_NowExpAndMoney.prototype.open = function() {
		this.refresh();
		Window_Selectable.prototype.open.call(this);
	};

	Window_NowExpAndMoney.prototype.drawActorLevel = function(actor, x, y) {
		//元よりちょっと小さい
		this.changeTextColor(ColorManager.systemColor());
		this.drawText(TextManager.levelA, x, y, 40);
		this.resetTextColor();
		this.drawText(actor.level, x + 52, y, 36, "right");
	};

	//-----------------------------------------------------------------------------
	// Sprite_Gauge_Exp
	//
	// ステータスゲージを表示するためのスプライトです。
	function Sprite_Gauge_Exp() {
		this.initialize(...arguments);
	}

	Sprite_Gauge_Exp.prototype = Object.create(Sprite_Gauge.prototype);
	Sprite_Gauge_Exp.prototype.constructor = Sprite_Gauge_Exp;

	Sprite_Gauge_Exp.prototype.initialize = function() {
		Sprite.prototype.initialize.call(this);
		this.initMembers();
		this.createBitmap();
	};

	const old_sprite_init_members = Sprite_Gauge_Exp.prototype.initMembers;
	Sprite_Gauge.prototype.initMembers = function(width) {
		old_sprite_init_members;
		this._width = width;
	};

	const old_sprite_gauge_setup = Sprite_Gauge_Exp.prototype.setup;
	Sprite_Gauge_Exp.prototype.setup = function(battler, statusType) {
		old_sprite_gauge_setup.apply(this, arguments);
	};

	Sprite_Gauge_Exp.prototype.gaugeX = function() {
		return 42;
	};

	Sprite_Gauge_Exp.prototype.bitmapWidth = function() {
		return 128;
	};

	Sprite_Gauge_Exp.prototype.currentValue = function(flortmode = false) {
		if (this._battler) {
			//const now_exp = this._battler.currentExp() - this._battler.currentLevelExp();	//現在ＬＶの経験値閾値を０としてそこから貯まった経験値
			let sourceValue = parseFloat(((this._battler.currentExp() - this._battler.currentLevelExp()) /
							 (this._battler.nextLevelExp() - this._battler.currentLevelExp())) * 100).toFixed(2);	//貯まった割合
			if(flortmode){
				return sourceValue;
			}else{
				return parseInt(sourceValue, 10);
			}
		}
		return NaN;
	};

	Sprite_Gauge_Exp.prototype.currentMaxValue = function() {
		if (this._battler) {
			//const now_exp = this._battler.nextLevelExp() - this._battler.currentLevelExp();	//次までに必要な経験値
			return 100.00;	//割合の場合はこれ
		}
		return NaN;
	};

	Sprite_Gauge_Exp.prototype.label = function() {
		return TextManager.expA;
	};

	Sprite_Gauge_Exp.prototype.gaugeColor1 = function() {
		return ColorManager.expGaugeColor1();
	};
	
	Sprite_Gauge_Exp.prototype.gaugeColor2 = function() {
		return ColorManager.expGaugeColor2();
	};

	Sprite_Gauge_Exp.prototype.drawValue = function() {
		const currentValue = this.currentValue(true);
		const width = this.bitmapWidth();
		const height = this.bitmapHeight();
		this.setupValueFont();
		this.bitmap.drawText(currentValue + "%", 0, 0, width, height, "right");
	};

	//-----------------------------------------------------------------------------
	// Sprite_Gauge_Exp_Long
	//
	// 長いステータスゲージを表示するためのスプライトです。
	function Sprite_Gauge_Exp_Long() {
		this.initialize(...arguments);
	}

	Sprite_Gauge_Exp_Long.prototype = Object.create(Sprite_Gauge_Exp.prototype);
	Sprite_Gauge_Exp_Long.prototype.constructor = Sprite_Gauge_Exp_Long;

	Sprite_Gauge_Exp_Long.prototype.bitmapWidth = function() {
		return 160;
	};
	
	//-----------------------------------------------------------------------------
	// ColorManager
	//
	// ウィンドウの色を扱う静的クラスです。

	ColorManager.expGaugeColor1 = function() {
		return this.textColor(6);
	};
	
	ColorManager.expGaugeColor2 = function() {
		return this.textColor(14);
	};
})();
