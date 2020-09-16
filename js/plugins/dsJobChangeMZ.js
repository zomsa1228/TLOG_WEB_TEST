//==============================================================================
// dsJobChangeMZ.js
// Copyright (c) 2015 - 2020 DOURAKU
// Released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//==============================================================================

/*:
 * @target MZ
 * @plugindesc ジョブチェンジシステム ver1.0.0
 * @author 道楽
 *
 * @noteParam faceName
 * @require 1
 * @noteDir img/faces/
 * @noteType file
 * @noteData classes
 *
 * @noteParam characterName
 * @require 1
 * @noteDir img/characters/
 * @noteType file
 * @noteData classes
 *
 * @noteParam battlerName
 * @require 1
 * @noteDir img/sv_actors/
 * @noteType file
 * @noteData classes
 *
 * @param Optimize Equip Enable
 * @type boolean
 * @desc ジョブチェンジ後に最強装備にするか
 * @default true
 *
 * @param Optimize Equip Text
 * @type string
 * @desc ジョブチェンジ後の最強装備にした際に表示されるメッセージ
 * @default 最強装備します
 *
 * @param Keep Exp
 * @type boolean
 * @desc ジョブチェンジ後も経験値を維持するか
 * @default false
 *
 * @param Menu Command
 *
 * @param Show Command
 * @type boolean
 * @parent Menu Command
 * @desc メニューにコマンドを表示するか
 * @default true
 *
 * @param Command Name
 * @type string
 * @parent Menu Command
 * @desc ジョブチェンジコマンドの名称
 * @default ジョブチェンジ
 *
 * @param Enable Switch Id
 * @type switch
 * @parent Menu Command
 * @desc メニューの有効無効を切り替えるスイッチ番号
 *       0の場合は常に有効
 * @default 0
 * 
 * @command OpenJobChangeMenu
 * @text ジョブチェンジメニューを開く
 * @desc 変数で指定したアイテム/武器/防具を獲得する
 *
 * @arg memberIndex
 * @type number
 * @default 0
 * @text 変数番号
 * @desc ジョブチェンジの対象となるパーティメンバーの番号
 *
 * @arg changeActorEnable
 * @type boolean
 * @default false
 * @text アクター切り替え許可
 * @desc メニュー内でアクターの切り替えができるか
 *
 * @help
 * このプラグインは以下のメモタグの設定ができます。
 *
 * -----------------------------------------------------------------------------
 * アクターに設定するメモタグ
 *
 * <ignoreChangeImage>
 *   ジョブチェンジしても見た目が変更されないようになります。
 *
 * <classLevel[職業番号]:[初期レベル]>
 *   職業の初期レベルを設定します。
 *  [職業番号]   - 0001～9999までの4桁の数値が設定できます。(数字)
 *                 データベースの職業タブで表示されている番号になります。
 *  [初期レベル] - 職業の初期レベル。(数字)
 *
 * -----------------------------------------------------------------------------
 * 職業に設定するメモタグ
 *
 * <faceName:[ファイル名],[番号]>
 *  ジョブチェンジした時に使用される顔画像を設定します。
 *  [ファイル名] - 顔画像のファイル名。(文字列)
 *  [番号]       - ファイル内の画像番号。(数字)
 *                 0 1 2 3
 *                 4 5 6 7
 *
 * <faceName[アクター番号]:[ファイル名],[番号]>
 *  アクターがジョブチェンジした時に使用される専用顔画像を設定します。
 *  [アクター番号] - 0001～9999までの4桁の数値が設定できます。(数字)
 *                   データベースのアクタータブで表示されている番号になります。
 *  [ファイル名]   - 顔画像のファイル名。(文字列)
 *  [番号]         - ファイル内の画像番号。(数字)
 *                   0 1 2 3
 *                   4 5 6 7
 *
 * <characterName:[ファイル名],[番号]>
 *  ジョブチェンジした時に使用される歩行キャラ画像を設定します。
 *  [ファイル名] - 歩行キャラ画像のファイル名。(文字列)
 *  [番号]       - ファイル内の画像番号。(数字)
 *                 0 1 2 3
 *                 4 5 6 7
 *
 * <characterName[アクター番号]:[ファイル名],[番号]>
 *  アクターがジョブチェンジした時に使用される専用歩行キャラ画像を設定します。
 *  [アクター番号] - 0001～9999までの4桁の数値が設定できます。(数字)
 *                   データベースのアクタータブで表示されている番号になります。
 *  [ファイル名]   - 歩行キャラ画像のファイル名。(文字列)
 *  [番号]         - ファイル内の画像番号。(数字)
 *                   0 1 2 3
 *                   4 5 6 7
 *
 * <battlerName:[ファイル名]>
 *  ジョブチェンジした時に使用される戦闘キャラ画像を設定します。
 *  このタグが設定されていない場合は転職できません。
 *  [ファイル名] - 戦闘キャラ画像のファイル名。(文字列)
 *
 * <battlerName[アクター番号]:[ファイル名]>
 *  アクターがジョブチェンジした時に使用される専用戦闘キャラ画像を設定します。
 *  [アクター番号] - 0001～9999までの4桁の数値が設定できます。(数字)
 *                   データベースのアクタータブで表示されている番号になります。
 *  [ファイル名]   - 戦闘キャラ画像のファイル名。(文字列)
 *
 * <jobInfo:[説明文]>
 *  画面下部のヘルプウィンドウに表示される説明文を設定します。
 *  [説明文] - ヘルプウィンドウに表示する文章。(文字列)
 *
 * <changeableActor:[アクター番号,...]>
 *  ジョブチェンジできるアクター番号を設定します。
 *  このタグが設定されていない場合は全てのアクターがジョブチェンジできます。
 *  [アクター番号] - ジョブチェンジできるアクター番号。(数字)
 *                   「,」区切りで複数設定することも出来ます。
 *
 * <requirement[条件番号]:[条件],[引数,...]>
 *  ジョブチェンジできる条件を設定します。
 *  [条件番号]   - 00～09までの2桁の数値が設定できます。
 *                 なお、ひとつの職業に同じ条件番号を複数設定出来ません。
 *  [条件][引数] - 下記に定義されている条件と引数の組み合わせ。
 *  ・level,[職業番号],[必要なレベル]
 *     設定した職業のレベルが数値以上必要になります。
 *     [職業番号]に「0」を設定した場合は現在の職業のレベルとなります。
 *
 *  ・mhp,[必要な能力値]
 *     設定した数値以上の最大ＨＰが必要になります。
 *
 *  ・mmp,[必要な能力値]
 *     設定した数値以上の最大ＭＰが必要になります。
 *
 *  ・atk,[必要な能力値]
 *     設定した数値以上の攻撃力が必要になります。
 *
 *  ・def,[必要な能力値]
 *     設定した数値以上の防御力が必要になります。
 *
 *  ・mat,[必要な能力値]
 *     設定した数値以上の魔法力が必要になります。
 *
 *  ・mdf,[必要な能力値]
 *     設定した数値以上の魔法防御が必要になります。
 *
 *  ・agi,[必要な能力値]
 *     設定した数値以上の敏捷性が必要になります。
 *
 *  ・luk,[必要な能力値]
 *     設定した数値以上の運が必要になります。
 *
 *  ・switch,[スイッチ番号]
 *     設定した番号のスイッチがONにする必要があります。
 *
 * 使用例)
 *  ・職業0001のレベルが10以上で最大ＨＰが1000以上ならジョブチェンジできる
 *     <requirement00:level,1,10>
 *     <requirement01:mhp,1000>
 *
 *  ・スイッチ20がONの状態で現在のレベルが20以上ならジョブチェンジできる
 *     <requirement00:switch,20>
 *     <requirement01:level,0,20>
 *
 * <showConditionOneself>
 *  自身がジョブチェンジできる条件を満たしていれば表示されます
 * 
 * <showConditionAnyOne>
 *  メンバーのうちの誰かがジョブチェンジできる条件を満たしていれば表示されます
 */

var Imported = Imported || {};
Imported.dsJobChangeMZ = true;

(function (exports) {
	'use strict';

	exports.Param = (function() {
		var ret = {};
		var parameters = PluginManager.parameters("dsJobChangeMZ");
		ret.OptimizeEquipEnable = Boolean(parameters["Optimize Equip Enable"] === "true" || false);
		ret.OptimizeEquipText = String(parameters["Optimize Equip Text"]);
		ret.KeepExp = Boolean(parameters["Keep Exp"] === "true" || false);
		ret.ShowMenuCommand = Boolean(parameters["Show Command"] === "true" || false);
		ret.MenuCommandName = String(parameters["Command Name"]);
		ret.MenuCommandEnableSwitchId = Number(parameters["Enable Switch Id"]);
		return ret;
	})();

	//--------------------------------------------------------------------------
	/** Utility */
	function Utility() {}

	Utility.normRad = function(rad)
	{
		var PI2 = Math.PI * 2;
		var div = Math.floor(rad / PI2);
		rad -= div * PI2;
		if ( rad < 0.0 )
		{
			rad += PI2;
		}
		if ( rad > Math.PI )
		{
			rad -= PI2;
		}
		return rad;
	};

	Utility.jobChangeEnable = function(data)
	{
		for ( var key in data.meta )
		{
			if ( key.includes("battlerName") )
			{
				return true;
			}
		}
		return false;
	};

	//--------------------------------------------------------------------------
	/** Data_Class */
	exports.Data_Class = (function() {

		function Data_Class()
		{
			this.initialize.apply(this, arguments);
		}

		Data_Class.prototype.initialize = function(classId)
		{
			this._data = $dataClasses[classId];
		};

		// Property
		Object.defineProperties(Data_Class.prototype, {
			id: { get: function() { return this._data.id; }, configurable: true },
			name: { get: function() { return this._data.name; }, configurable: true },
			jobInfo: { get: function() { return this._data.meta.jobInfo; }, configurable: true },
		});

		Data_Class.prototype.hasCharacterName = function(actor)
		{
			const meta = this._metaCharacterName(actor).split(",");
			return (meta && meta.length === 2);
		};

		Data_Class.prototype.characterName = function(actor)
		{
			const meta = this._metaCharacterName(actor).split(",");
			return meta[0] ? String(meta[0]) : "";
		};

		Data_Class.prototype.characterIndex = function(actor)
		{
			const meta = this._metaCharacterName(actor).split(",");
			return meta[1] ? Number(meta[1]) : 0;
		};

		Data_Class.prototype.hasFaceName = function(actor)
		{
			const meta = this._metaFaceName(actor).split(",");
			return (meta && meta.length === 2);
		};

		Data_Class.prototype.faceName = function(actor)
		{
			const meta = this._metaFaceName(actor).split(",");
			return meta[0] ? String(meta[0]) : "";
		};

		Data_Class.prototype.faceIndex = function(actor)
		{
			const meta = this._metaFaceName(actor).split(",");
			return meta[1] ? Number(meta[1]) : 0;
		};

		Data_Class.prototype.hasBattlerName = function(actor)
		{
			const meta = this._metaBattlerName(actor);
			return (meta !== "");
		};

		Data_Class.prototype.battlerName = function(actor)
		{
			return this._metaBattlerName(actor);
		};

		Data_Class.prototype.classChangeEnable = function()
		{
			for ( var key in this._data.meta )
			{
				if ( key.includes("battlerName") )
				{
					return true;
				}
			}
			return false;
		};

		Data_Class.prototype.meetConditionForClassShowing = function(actor)
		{
			if ( this._data.meta.showConditionOneself )
			{
				if ( !actor.meetsRequirements(this.id) )
				{
					return false;
				}
			}
			if ( this._data.meta.showConditionAnyOne )
			{
				const result = $gameParty.members().some(function(actor) {
					return actor.meetsRequirements(this.id);
				}, this);
				if ( !result )
				{
					return false;
				}
			}
			if ( this._data.meta.changeableActor )
			{
				const metaData = this._data.meta.changeableActor.split(",");
				const result = metaData.some(function(actorId) {
					return (actor.actorId() === Number(actorId) )
				});
				if ( !result )
				{
					return false;
				}
			}
			return true;
		};

		Data_Class.prototype._metaFileName = function(tagBase, actor)
		{
			if ( actor )
			{
				const tag = tagBase + ("0000"+actor.actorId()).slice(-4);
				if ( this._data.meta[tag] )
				{
					return String(this._data.meta[tag]);
				}
			}
			return this._data.meta[tagBase] ? String(this._data.meta[tagBase]) : "";
		};

		Data_Class.prototype._metaCharacterName = function(actor)
		{
			return this._metaFileName("characterName", actor);
		};

		Data_Class.prototype._metaFaceName = function(actor)
		{
			return this._metaFileName("faceName", actor);
		};

		Data_Class.prototype._metaBattlerName = function(actor)
		{
			return this._metaFileName("battlerName", actor);
		};

		return Data_Class;
	})();

	//--------------------------------------------------------------------------
	/** PluginManager */
	const pluginName = "dsJobChangeMZ";

	PluginManager.registerCommand(pluginName, "OpenJobChangeMenu", args => {
	});

	//--------------------------------------------------------------------------
	/** Game_Temp */
	var _Game_Temp_initialize = Game_Temp.prototype.initialize;
	Game_Temp.prototype.initialize = function()
	{
		_Game_Temp_initialize.call(this);
		this._changeActorForJobChange = true;
	};

	Game_Temp.prototype.setChangeActorForJobChange = function(changeActor)
	{
		this._changeActorForJobChange = changeActor;
	};

	Game_Temp.prototype.changeActorForJobChange = function()
	{
		return this._changeActorForJobChange;
	};

	//--------------------------------------------------------------------------
	/** Game_Actor */
	(function () {
		const base = Game_Actor.prototype.initExp;
		Game_Actor.prototype.initExp = function()
		{
			base.call(this);
			var actor = this.actor();
			$dataClasses.forEach(function(classData, idx) {
				if ( !classData )
				{
					return;
				}
				var tag = "classLevel" + ("0000"+idx).slice(-4);
				if ( actor.meta[tag] )
				{
					var level = Number(actor.meta[tag]);
					this._exp[idx] = this.expForLevelEx(idx, level);
					if ( this._classId === idx )
					{
						this._level = level;
					}
				}
			}, this);
		};
	}());

	(function () {
		const base = Game_Actor.prototype.initSkills;
		Game_Actor.prototype.initSkills = function()
		{
			base.call(this);
			if ( Imported.dsUnsharedLearningSkill )
			{
				return;
			}
			var backupClassId = this._classId;
			var backupLevel = this._level;
			var actor = this.actor();
			$dataClasses.forEach(function(classData, idx) {
				if ( !classData )
				{
					return;
				}
				var tag = "classLevel" + ("0000"+idx).slice(-4);
				if ( actor.meta[tag] )
				{
					this._classId = idx;
					this._level = Number(actor.meta[tag]);
					classData.learnings.forEach(function(learning) {
						if ( learning.level <= this._level )
						{
							this.learnSkill(learning.skillId);
						}
					}, this);
				}
			}, this);
			this._classId = backupClassId;
			this._level = backupLevel;
		};
	}());

	Game_Actor.prototype.expForLevelEx = function(classId, level)
	{
		var c = $dataClasses[classId];
		const basis = c.expParams[0];
		const extra = c.expParams[1];
		const acc_a = c.expParams[2];
		const acc_b = c.expParams[3];
		return Math.round(
			(basis * Math.pow(level - 1, 0.9 + acc_a / 250) * level * (level + 1)) /
				(6 + Math.pow(level, 2) / 50 / acc_b) +
				(level - 1) * extra
		);
	};

	Game_Actor.prototype.classExp = function(classId)
	{
		return this._exp[classId];
	};

	Game_Actor.prototype.calcClassLevel = function(classId)
	{
		var exp = this.classExp(classId);
		var level = 1;
		while ( level < this.maxLevel() && this.classExp(classId) >= this.expForLevelEx(classId, level + 1) )
		{
			level++;
		}
		return level;
	};

	Game_Actor.prototype.changeClassEx = function(classId, keepExp)
	{
		if ( !this.isIgnoreChangeImage() )
		{
			const data = new exports.Data_Class(classId);
			if ( data.hasCharacterName(this) )
			{
				const characterName = data.characterName(this);
				const characterIndex = data.characterIndex(this);
				this.setCharacterImage(characterName, characterIndex);
				$gamePlayer.refresh();
			}
			if ( data.hasFaceName(this) )
			{
				const faceName = data.faceName(this);
				const faceIndex = data.faceIndex(this);
				this.setFaceImage(faceName, faceIndex);
			}
			if ( data.hasBattlerName(this) )
			{
				const battlerName = data.battlerName(this);
				this.setBattlerImage(battlerName);
			}
		}
		const hpRate = this.hpRate();
		const mpRate = this.mpRate();
		const tpRate = this.tpRate();
		this.changeClass(classId, keepExp);
		if ( !this.isDead() )
		{
			this.setHp(Math.max(Math.floor(this.mhp * hpRate), 1));
			this.setMp(Math.max(Math.floor(this.mmp * mpRate), 1));
			this.setTp(Math.max(Math.floor(this.maxTp() * tpRate), 1));
		}
	};

	Game_Actor.prototype.isIgnoreChangeImage = function()
	{
		return (this.actor().meta.ignoreChangeImage) ? true : false;
	};

	Game_Actor.prototype.isClassChangeEnable = function(classId)
	{
		return !this.isClass($dataClasses[classId]);
	};

	Game_Actor.prototype.meetsRequirements = function(classId)
	{
		var data = $dataClasses[classId];
		for ( var key in data.meta )
		{
			if ( !key.includes("requirement") )
			{
				continue;
			}
			if ( !this.checkRequirement(data.meta[key]) )
			{
				return false;
			}
		}
		return true;
	};

	Game_Actor.prototype.checkRequirement = function(condition)
	{
		var result = true;
		var metaData = condition.split(",");
		switch ( metaData[0] )
		{
		case "level":
			if ( Number(metaData[1]) === 0 )
			{
				if ( this.level < Number(metaData[2]) )
				{
					result = false;
				}
			}
			else
			{
				if ( this.calcClassLevel(Number(metaData[1])) < Number(metaData[2]) )
				{
					result = false;
				}
			}
			break;
		case "mhp":
			if ( this.mhp < Number(metaData[1]) )
			{
				result = false;
			}
			break;
		case "mmp":
			if ( this.mmp < Number(metaData[1]) )
			{
				result = false;
			}
			break;
		case "atk":
			if ( this.atk < Number(metaData[1]) )
			{
				result = false;
			}
			break;
		case "def":
			if ( this.def < Number(metaData[1]) )
			{
				result = false;
			}
			break;
		case "mat":
			if ( this.mat < Number(metaData[1]) )
			{
				result = false;
			}
			break;
		case "mdf":
			if ( this.mdf < Number(metaData[1]) )
			{
				result = false;
			}
			break;
		case "agi":
			if ( this.agi < Number(metaData[1]) )
			{
				result = false;
			}
			break;
		case "luk":
			if ( this.luk < Number(metaData[1]) )
			{
				result = false;
			}
			break;
		case "switch":
			if ( !$gameSwitches.value(Number(metaData[1])) )
			{
				result = false;
			}
			break;
		}
		return result;
	};

	//--------------------------------------------------------------------------
	/** Sprite_Job */
	exports.Sprite_Job = (function() {

		function Sprite_Job()
		{
			this.initialize.apply(this, arguments);
		}

		Sprite_Job.prototype = Object.create(Sprite.prototype);
		Sprite_Job.prototype.constructor = Sprite_Job;

		Sprite_Job.MOTIONS = {
			idle: { index: 0, loop: true },
			wait: { index: 1, loop: true }
		};

		Sprite_Job.prototype.initialize = function(rootX, rootY)
		{
			Sprite.prototype.initialize.call(this);
			this.initMembers(rootX, rootY);
			this.updateBitmap();
		};

		Sprite_Job.prototype.initMembers = function(rootX, rootY)
		{
			this.anchor.x = 0.5;
			this.anchor.y = 1;
			this._battlerName = "";
			this._motion = Sprite_Job.MOTIONS["idle"];
			this._motionCount = 0;
			this._pattern = 0;
			this._rootX = rootX;
			this._rootY = rootY;
			this._offsetX = 0;
			this._offsetY = 0;
			this._selection = false;
			this._selectionEffectCount = 0;
			this._changeEnable = true;
			this._actor = null;
		};

		Sprite_Job.prototype.setActor = function(actor)
		{
			this._actor = actor;
		};

		Sprite_Job.prototype.setOffset = function(x, y)
		{
			this._offsetX = x;
			this._offsetY = y;
		};

		Sprite_Job.prototype.setSelection = function(selection)
		{
			this._selection = selection;
		};

		Sprite_Job.prototype.setChangeEnable = function(enable)
		{
			this._changeEnable = enable;
		};

		Sprite_Job.prototype.update = function()
		{
			Sprite.prototype.update.apply(this, arguments);
			this.updatePosition();
			this.updateBitmap();
			this.updateFrame();
			this.updateMotionCount();
			this.updateSelectionEffect();
		};

		Sprite_Job.prototype.updatePosition = function()
		{
			this.x = this._rootX + this._offsetX;
			this.y = this._rootY + this._offsetY;
		};

		Sprite_Job.prototype.updateBitmap = function()
		{
			// empty
		};

		Sprite_Job.prototype.updateFrame = function()
		{
			var bitmap = this.bitmap;
			if ( bitmap )
			{
				const motionIndex = this._motion ? this._motion.index : 0;
				const pattern = this._pattern < 3 ? this._pattern : 1;
				const cw = bitmap.width / 9;
				const ch = bitmap.height / 6;
				const cx = Math.floor(motionIndex / 6) * 3 + pattern;
				const cy = motionIndex % 6;
				this.setFrame(cx * cw, cy * ch, cw, ch);
			}
		};

		Sprite_Job.prototype.updateMotionCount = function()
		{
			if ( this._motion && ++this._motionCount >= this.motionSpeed() )
			{
				if ( this._motion.loop )
				{
					this._pattern = (this._pattern + 1) % 4;
				}
				else if ( this._pattern < 2 )
				{
					this._pattern++;
				}
				this._motionCount = 0;
			}
		};

		Sprite_Job.prototype.updateSelectionEffect = function()
		{
			if ( this._selection )
			{
				if ( ++this._selectionEffectCount % 30 < 15 )
				{
					const color = this._changeEnable ? [255, 255, 255, 64] : [96, 96, 96, 160];
					this.setBlendColor(color);
				}
				else
				{
					const color = this._changeEnable ? [0, 0, 0, 0] : [64, 64, 64, 160];
					this.setBlendColor(color);
				}
			}
			else
			{
				this._selectionEffectCount = 0;
				const color = this._changeEnable ? [0, 0, 0, 0] : [64, 64, 64, 160];
				this.setBlendColor(color);
			}
		};

		Sprite_Job.prototype.startMotion = function(motionType)
		{
			const newMotion = Sprite_Job.MOTIONS[motionType];
			if ( this._motion !== newMotion )
			{
				this._motion = newMotion;
				this._motionCount = 0;
				this._pattern = 0;
			}
		};

		Sprite_Job.prototype._onBitmapLoad = function(bitmapLoaded)
		{
			if ( this._bitmap === bitmapLoaded )
			{
				if ( this._refreshFrame && this._bitmap )
				{
					this._refreshFrame = false;
					this._frame.width = this._bitmap.width / 9;
					this._frame.height = this._bitmap.height / 6;
				}
			}
			this._refresh();
		};

		Sprite_Job.prototype._changeBitmap = function(battlerName)
		{
			if ( this._battlerName !== battlerName )
			{
				this._battlerName = battlerName;
				this.bitmap = ImageManager.loadSvActor(this._battlerName);
			}
		};

		Sprite_Job.prototype.motionSpeed = function() { return 12; };

		return Sprite_Job;
	})();

	//--------------------------------------------------------------------------
	/** Sprite_JobCurrent */
	exports.Sprite_JobCurrent = (function() {

		function Sprite_JobCurrent()
		{
			this.initialize.apply(this, arguments);
		}

		Sprite_JobCurrent.prototype = Object.create(exports.Sprite_Job.prototype);
		Sprite_JobCurrent.prototype.constructor = Sprite_JobCurrent;

		Sprite_JobCurrent.prototype.updateBitmap = function()
		{
			if ( this._actor )
			{
				const name = this._actor.battlerName();
				this._changeBitmap(name);
			}
		};

		return Sprite_JobCurrent;
	})();

	//--------------------------------------------------------------------------
	/** Sprite_JobSelection */
	exports.Sprite_JobSelection = (function() {

		function Sprite_JobSelection()
		{
			this.initialize.apply(this, arguments);
		}

		Sprite_JobSelection.prototype = Object.create(exports.Sprite_Job.prototype);
		Sprite_JobSelection.prototype.constructor = Sprite_JobSelection;

		Sprite_JobSelection.prototype.initialize = function(classId, rootX, rootY)
		{
			this.initClassData(classId);
			exports.Sprite_Job.prototype.initialize.call(this, rootX, rootY);
		};

		Sprite_JobSelection.prototype.initClassData = function(classId)
		{
			this._classData = new exports.Data_Class(classId);
		};

		Sprite_JobSelection.prototype.updateBitmap = function()
		{
			if ( this._classData )
			{
				const name = this._classData.battlerName(this._actor);
				this._changeBitmap(name);
			}
		};

		return Sprite_JobSelection;
	})();

	//--------------------------------------------------------------------------
	/** Window_JobStatus */
	exports.Window_JobStatus = (function() {

		function Window_JobStatus()
		{
			this.initialize.apply(this, arguments);
		}

		Window_JobStatus.prototype = Object.create(Window_StatusBase.prototype);
		Window_JobStatus.prototype.constructor = Window_JobStatus;

		Window_JobStatus.prototype.initialize = function(rect)
		{
			Window_StatusBase.prototype.initialize.call(this, rect);
			this._actor = null;
			this._beforeActor = null;
			this._afterActor = null;
		};

		Window_JobStatus.prototype.setActor = function(actor)
		{
			if ( this._actor !== actor )
			{
				this._actor = actor;
				this.setBeforeActor(this._actor);
				this.refresh();
			}
		};

		Window_JobStatus.prototype.setBeforeActor = function(actor)
		{
			const tempActor = JsonEx.makeDeepCopy(actor);
			tempActor.initEquips([]);
			if ( this._beforeActor !== tempActor )
			{
				this._beforeActor = tempActor;
				this.refresh();
			}
		};

		Window_JobStatus.prototype.setAfterActor = function(actor, classId)
		{
			const tempActor = JsonEx.makeDeepCopy(actor);
			tempActor.initEquips([]);
			tempActor.changeClassEx(classId, exports.Param.KeepExp);
			if ( this._afterActor !== tempActor )
			{
				this._afterActor = tempActor;
				this.refresh();
			}
		};

		Window_JobStatus.prototype.update = function()
		{
			Window_StatusBase.prototype.update.call(this);
			this.updateBeforeActor();
		};

		Window_JobStatus.prototype.updateBeforeActor = function()
		{
			if (!this._actor || !this._beforeActor)
			{
				return;
			}
			if (this._actor.currentClass() !== this._beforeActor.currentClass())
			{
				this.setBeforeActor(this._actor);
			}
		};

		Window_JobStatus.prototype.refresh = function()
		{
			Window_StatusBase.prototype.refresh.call(this);
			if ( this._actor )
			{
				const h = this.innerHeight;
				const x = this.colSpacing() / 2;
				const y = h / 2 - this.lineHeight() * 1.5;
				this.drawActorFace(this._actor, x + 1, y, 144, h);
				this.drawActorSimpleStatus(this._actor, x + 180, y);
				const x1 = x + 360;
				const rightArrowWidth = this.rightArrowWidth();
				const w = (this.innerWidth - x1 - rightArrowWidth) / 2;
				this.drawCurrentJobStatus(x1, 0, w);
				this.drawRightArrow(x1 + w, (h - this.lineHeight()) / 2);
				this.drawNewJobStatus(x1 + w + rightArrowWidth, 0, w);
			}
		};

		Window_JobStatus.prototype.drawActorSimpleStatus = function(actor, x, y)
		{
			const lineHeight = this.lineHeight();
			this.drawActorName(actor, x, y);
			this.drawActorLevel(actor, x, y + lineHeight * 1);
			this.drawActorIcons(actor, x, y + lineHeight * 2);
		};

		Window_JobStatus.prototype.drawCurrentJobStatus = function(x, y, width)
		{
			const rect = new Rectangle(x, y, width, this.innerHeight);
			this.drawBackgroundRect(rect);
			for (let i = 0; i < 6; i++)
			{
				const paramId = i + 2;
				const x1 = x + this.itemPadding();
				const y1 = y + this.paramLineHeight() * i;
				const width1 = width - this.paramWidth();
				const x2 = x + width1 - this.itemPadding();
				this.drawParamName(x1, y1, width1, paramId);
				this.drawCurrentParam(x2, y1, paramId);
			}
		};

		Window_JobStatus.prototype.drawNewJobStatus = function(x, y, width)
		{
			const rect = new Rectangle(x, y, width, this.innerHeight);
			this.drawBackgroundRect(rect);
			for (let i = 0; i < 6; i++)
			{
				const paramId = i + 2;
				const x1 = x + this.itemPadding();
				const y1 = y + this.paramLineHeight() * i;
				const width1 = width - this.paramWidth();
				const x2 = x + width1 - this.itemPadding();
				this.drawParamName(x1, y1, width1, paramId);
				this.drawNewParam(x2, y1, paramId);
			}
		};

		Window_JobStatus.prototype.drawParamName = function(x, y, width, paramId)
		{
			this.changeTextColor(ColorManager.systemColor());
			this.contents.fontSize = this.paramFontSize();
			this.drawText(TextManager.param(paramId), x, y, width);
			this.contents.fontSize = $gameSystem.mainFontSize();
		};

		Window_JobStatus.prototype.drawCurrentParam = function(x, y, paramId)
		{
			if ( !this._beforeActor )
			{
				return;
			}
			const paramWidth = this.paramWidth();
			this.resetTextColor();
			this.contents.fontSize = this.paramFontSize();
			this.drawText(this._beforeActor.param(paramId), x, y, paramWidth, "right");
			this.contents.fontSize = $gameSystem.mainFontSize();
		};

		Window_JobStatus.prototype.drawRightArrow = function(x, y)
		{
			const rightArrowWidth = this.rightArrowWidth();
			this.changeTextColor(ColorManager.systemColor());
			this.drawText("\u2192", x, y, rightArrowWidth, "center");
		};

		Window_JobStatus.prototype.drawNewParam = function(x, y, paramId)
		{
			if ( !this._afterActor || !this._beforeActor )
			{
				return;
			}
			const paramWidth = this.paramWidth();
			const newValue = this._afterActor.param(paramId);
			const diffvalue = newValue - this._beforeActor.param(paramId);
			this.changeTextColor(ColorManager.paramchangeTextColor(diffvalue));
			this.contents.fontSize = this.paramFontSize();
			this.drawText(newValue, x, y, paramWidth, "right");
			this.contents.fontSize = $gameSystem.mainFontSize();
		};

		Window_JobStatus.prototype.rightArrowWidth = function() { return 32; };
		Window_JobStatus.prototype.paramWidth = function() { return 48; };
		Window_JobStatus.prototype.paramFontSize = function() { return 16; };
		Window_JobStatus.prototype.paramLineHeight = function() { return 20; };

		return Window_JobStatus;
	})();

	//--------------------------------------------------------------------------
	/** Window_JobChange */
	exports.Window_JobChange = (function() {

		function Window_JobChange()
		{
			this.initialize.apply(this, arguments);
		}

		Window_JobChange.prototype = Object.create(Window_Selectable.prototype);
		Window_JobChange.prototype.constructor = Window_JobChange;

		Window_JobChange.introRotationMax = Math.PI * 0.8;
		Window_JobChange.introDistanceMax = 250.0;

		Window_JobChange.prototype.initialize = function(rect)
		{
			this.initMember();
			Window_Selectable.prototype.initialize.call(this, rect);
			this.createSpriteMask();
			this.createActorSprite();
			this.createJobSpriteContainer();
			this.createJobSprites();
		};

		Window_JobChange.prototype.setStatusWindow = function(statusWindow)
		{
			this._statusWindow = statusWindow;
			this.callUpdateHelp();
		};

		Window_JobChange.prototype.setActor = function(actor)
		{
			if ( this._actor !== actor )
			{
				this._actor = actor;
				this._actorSprite.setActor(this._actor);
				this._jobSprites.forEach(function(sprite) {
					sprite.setActor(this._actor);
				}, this);
				this.setupChangeableClasses(actor);
				this.selectActorClass(actor);
				this.refresh();
			}
		};

		Window_JobChange.prototype.initMember = function()
		{
			this._spriteMask = null;
			this._actor = null;
			this._actorSprite = null;
			this._jobSpriteContainer = null;
			this._jobSprites = [];
			this._introRotation = 0.0;
			this._introDistance = 0.0;
			this._rotation = this.currentRotation();
			this._classIds = [];
			this._waitForReady = false;
			this._statusWindow = null;
		};

		Window_JobChange.prototype.createSpriteMask = function()
		{
			const m = this._margin;
			const ww = this.width - m * 2;
			const wh = this.height - m * 2;
			this._spriteMask = new PIXI.Graphics();
			this._spriteMask.beginFill();
			this._spriteMask.position.x = m;
			this._spriteMask.position.y = m;
			this._spriteMask.drawRect(0, 0, ww, wh);
			this._spriteMask.endFill();
			this.addChild(this._spriteMask);
		};

		Window_JobChange.prototype.createActorSprite = function()
		{
			const rootX = this.rootX();
			const rootY = this.rootY();
			this._actorSprite = this._createCurrentJobSprite(rootX, rootY);
			this.addChild(this._actorSprite);
		};

		Window_JobChange.prototype.createJobSpriteContainer = function()
		{
			const m = this._margin;
			this._jobSpriteContainer = new Sprite();
			this._jobSpriteContainer.move(m, m);
			this._jobSpriteContainer.mask = this._spriteMask;
			this.addChild(this._jobSpriteContainer);
		};

		Window_JobChange.prototype.createJobSprites = function()
		{
			const rootX = this.rootX();
			const rootY = this.rootY();
			const classesNum = $dataClasses.length;
			for ( var ii = 1; ii < classesNum; ii++ )
			{
				if ( Utility.jobChangeEnable($dataClasses[ii]) )
				{
					var sprite = this._createSelectionJobSprite(ii, rootX, rootY);
					this._jobSprites[ii] = sprite;
					this._jobSpriteContainer.addChild(this._jobSprites[ii]);
				}
			}
			this.updateJobPosition();
		};

		Window_JobChange.prototype.isReady = function()
		{
			return ImageManager.isReady();
		};

		Window_JobChange.prototype.currentRotation = function()
		{
			var rot = this._introRotation;
			if ( this.index() >= 0 )
			{
				const unitRot = (Math.PI * 2) / this._classIds.length;
				rot += unitRot * this.index();
			}
			return Utility.normRad(rot);
		};

		Window_JobChange.prototype.isCurrentItemEnabled = function()
		{
			if ( this._actor )
			{
				if ( this.index() >= 0 )
				{
					return this.isClassChangeEnable(this._classIds[this.index()]);
				}
			}
			return false;
		};

		Window_JobChange.prototype.update = function()
		{
			this.updateIntro();
			this.updateJobRotation();
			this.updateJobPosition();
			this.updateJobSelection();
			Window_Selectable.prototype.update.call(this);
		};

		Window_JobChange.prototype.updateIntro = function()
		{
			if ( this._waitForReady )
			{
				if ( this.isReady() )
				{
					this._waitForReady = false;
				}
			}
			else
			{
				const rot = Window_JobChange.introRotationMax / 15.0;
				const dist = Window_JobChange.introDistanceMax / 15.0;
				this._introRotation = Math.max( this._introRotation - rot, 0.0 );
				this._introDistance = Math.max( this._introDistance - dist, 0.0 );
			}
		};

		Window_JobChange.prototype.updateJobRotation = function()
		{
			const rotSpeed = (Math.PI / 180.0) * 10;
			const currentRotation = this.currentRotation();
			const diff = Utility.normRad(currentRotation - this._rotation);
			if ( diff < 0.0 )
			{
				this._rotation += Math.max(-rotSpeed, diff);
			}
			else if ( diff > 0.0 )
			{
				this._rotation += Math.min(+rotSpeed, diff);
			}
			this._rotation = Utility.normRad(this._rotation);
		};

		Window_JobChange.prototype.updateJobPosition = function()
		{
			const radiusX = this.radiusX();
			const radiusY = this.radiusY();
			let rotation = this._rotation;
			const num = this._classIds.length;
			for ( var ii = 0; ii < num; ii++ )
			{
				const classId = this._classIds[ii];
				const offsetX = Math.cos(rotation) * 0 - Math.sin(rotation) * 1;
				const offsetY = Math.sin(rotation) * 0 + Math.cos(rotation) * 1;
				let sprite = this._jobSprites[classId];
				sprite.setOffset(offsetX * radiusX, offsetY * radiusY);
				rotation -= (Math.PI * 2) / num;
			}
		};

		Window_JobChange.prototype.updateJobSelection = function()
		{
			const num = this._classIds.length;
			for ( var ii = 0; ii < num; ii++ )
			{
				const classId = this._classIds[ii];
				const selection = (ii == this.index()) ? true : false;
				const enable = this.isClassChangeEnable(classId);
				this._jobSprites[classId].setSelection(selection);
				this._jobSprites[classId].setChangeEnable(enable);
			}
		};

		Window_JobChange.prototype.updateHelp = function()
		{
			const classId = this.selectedClassId();
			if ( classId )
			{
				const data = new exports.Data_Class(classId);
				if ( data.jobInfo )
				{
					this._helpWindow.setText(data.jobInfo);
				}
				else
				{
					this._helpWindow.clear();
				}
			}
			else
			{
				this._helpWindow.clear();
			}
			if ( this._actor && this._statusWindow && classId )
			{
				this._statusWindow.setAfterActor(this._actor, classId);
			}
		};

		Window_JobChange.prototype.resetIntro = function()
		{
			this._introRotation = Window_JobChange.introRotationMax;
			this._introDistance = Window_JobChange.introDistanceMax;
			this._waitForReady = true;
		};

		Window_JobChange.prototype.setupChangeableClasses = function(actor)
		{
			this._classIds = [];
			const classesNum = $dataClasses.length;
			for ( var ii = 1; ii < classesNum; ii++ )
			{
				if ( !Utility.jobChangeEnable($dataClasses[ii]) )
				{
					continue;
				}
				if ( actor.isClass($dataClasses[ii]) )
				{
					this._classIds.push(ii);
				}
				else if ( this.isShowChangeableClass(actor, ii) )
				{
					this._classIds.push(ii);
				}
				this._jobSprites[ii].hide();
			}
			this._classIds.forEach((classId)=>{
				this._jobSprites[classId].show();
			}, this);
		};

		Window_JobChange.prototype.selectActorClass = function(actor)
		{
			const num = this._classIds.length;
			for ( var ii = 0; ii < num; ii++ )
			{
				const classId = this._classIds[ii];
				if ( actor.isClass($dataClasses[classId]) )
				{
					this.select(ii);
				}
			}
			this.resetIntro();
			this._rotation = this.currentRotation();
			this.updateJobPosition();
			this.updateJobSelection();
		};

		Window_JobChange.prototype.classId = function(index)
		{
			return (0 <= index && index < this._classIds.length) ? this._classIds[index] : 0;
		};

		Window_JobChange.prototype.selectedClassId = function()
		{
			return this.classId(this.index());
		};

		Window_JobChange.prototype.selectedJobName = function()
		{
			const classId = this.selectedClassId();
			return (classId) ? $dataClasses[classId].name : "";
		};

		Window_JobChange.prototype.isShowChangeableClass = function(actor, classId)
		{
			const data = new exports.Data_Class(classId);
			return data.meetConditionForClassShowing(actor);
		};

		Window_JobChange.prototype.isAnimationEnd = function()
		{
			if ( this._introDistance <= 0.0 )
			{
				const currentRotation = this.currentRotation();
				const diff = Utility.normRad(currentRotation - this._rotation);
				if ( diff === 0.0 )
				{
					return true;
				}
			}
			return false;
		};

		Window_JobChange.prototype.isOkEnabled = function()
		{
			if ( !this.isAnimationEnd() )
			{
				return false;
			}
			return Window_Selectable.prototype.isOkEnabled.call(this);
		};

		Window_JobChange.prototype.isCursorMovable = function()
		{
			if ( !this.isAnimationEnd() )
			{
				return false;
			}
			return Window_Selectable.prototype.isCursorMovable.call(this);
		};

		Window_JobChange.prototype.isClassChangeEnable = function(classId)
		{
			if ( !this._actor )
			{
				return false;
			}
			if ( !this._actor.meetsRequirements(classId) )
			{
				return false;
			}
			return this._actor.isClassChangeEnable(classId);
		};

		Window_JobChange.prototype.refresh = function()
		{
			this.contents.clear();
			this.drawSelectedJobName();
			this.drawSelectedJobLevel();
		};

		Window_JobChange.prototype.drawSelectedJobName = function()
		{
			const rect = this.selectedJobNameRect();
			this.drawBackgroundRect(rect);
			this.drawText(this.selectedJobName(), rect.x, rect.y, rect.width, "center");
		};

		Window_JobChange.prototype.drawSelectedJobLevel = function()
		{
			if ( exports.Param.KeepExp )
			{
				return;
			}
			const classId = this.classId(index);
			if ( this._actor && classId )
			{
				const text = TextManager.jobLevelA + " " + this._actor.calcClassLevel(classId);
				const rect = this.selectedJobNameRect();
				this.contents.fontSize = this.levelFontSize();
				this.drawText(text, rect.x, rect.y-24, rect.width, "center");
				this.contents.fontSize = $gameSystem.mainFontSize();
			}
		};

		Window_JobChange.prototype.itemRect = function(index)
		{
			var rect = new Rectangle();
			if ( this._jobSprites.length > 0 )
			{
				const classId = this.classId(index);
				if ( classId )
				{
					var sprite = this._jobSprites[classId];
					rect.x = sprite.x - (sprite.width * sprite.anchor.x) - $gameSystem.windowPadding();
					rect.y = sprite.y - (sprite.height * sprite.anchor.y) - $gameSystem.windowPadding();
					rect.width = sprite.width;
					rect.height = sprite.height;
				}
			}
			return rect;
		};

		Window_JobChange.prototype.selectedJobNameRect = function()
		{
			const width = 224;
			const x = (this.innerWidth - width) * 0.5;
			const y = this.rootY() + this.radiusY() - this._introDistance - $gameSystem.windowPadding() + 24;
			return new Rectangle(x, y, width, this.lineHeight());
		};

		Window_JobChange.prototype.setCursorRect = function(x, y, width, height)
		{
		};

		Window_JobChange.prototype.select = function(index)
		{
			Window_Selectable.prototype.select.call(this, index);
			this.refresh();
		};

		Window_JobChange.prototype._createCurrentJobSprite = function(rootX, rootY)
		{
			return new exports.Sprite_JobCurrent(rootX, rootY);
		};

		Window_JobChange.prototype._createSelectionJobSprite = function(classId, rootX, rootY)
		{
			return new exports.Sprite_JobSelection(classId, rootX, rootY);
		};

		Window_JobChange.prototype.maxItems = function() { return this._classIds.length; };
		Window_JobChange.prototype.maxPageRows = function() { return 1; };
		Window_JobChange.prototype.maxCols = function() { return Math.max(this._classIds.length, 1); };
		Window_JobChange.prototype.rootX = function() { return Math.floor(this.width * 0.5); };
		Window_JobChange.prototype.rootY = function() { return Math.floor(this.height * 0.45); };
		Window_JobChange.prototype.radiusX = function() { return Math.floor(this.width * 0.4) + this._introDistance; };
		Window_JobChange.prototype.radiusY = function() { return Math.floor(this.height * 0.3) + this._introDistance; };
		Window_JobChange.prototype.levelFontSize = function() { return 18; };

		return Window_JobChange;
	})();

	//--------------------------------------------------------------------------
	/** Window_JobDialog */
	exports.Window_JobDialog = (function() {

		function Window_JobDialog()
		{
			this.initialize.apply(this, arguments);
		}

		Window_JobDialog.prototype = Object.create(Window_Base.prototype);
		Window_JobDialog.prototype.constructor = Window_JobDialog;

		Window_JobDialog.prototype.initialize = function(rect)
		{
			Window_Base.prototype.initialize.call(this, rect);
			this.openness = 0;
			this.margin = 0;
			this._showTimer = 0;
			this.refresh();
		};

		Window_JobDialog.prototype.backColor = function()
		{
			return "#000000";
		};

		Window_JobDialog.prototype.open = function()
		{
			Window_Base.prototype.open.call(this);
			this._showTimer = 60;
		};

		Window_JobDialog.prototype.update = function()
		{
			Window_Base.prototype.update.call(this);
			if ( this.isOpen() )
			{
				this._showTimer--;
				if ( this._showTimer <= 0 )
				{
					this.close();
				}
			}
		};

		Window_JobDialog.prototype.refresh = function()
		{
			this.contents.clear();
			var width = this.contentsWidth();
			this.drawText(exports.Param.OptimizeEquipText, 0, 0, width, "center");
		};

		Window_JobDialog.prototype._refreshBack = function()
		{
			const m = this._margin;
			const w = Math.max(0, this._width - m * 2);
			const h = Math.max(0, this._height - m * 2);
			const sprite = this._backSprite;
			sprite.bitmap = new Bitmap(w, h);
			sprite.bitmap.fillRect(0, 0, w, h, this.backColor());
			sprite.setFrame(0, 0, w, h);
			sprite.move(m, m);
			sprite.setColorTone(this._colorTone);
		};

		Window_JobDialog.prototype._refreshFrame = function()
		{
		};

		return Window_JobDialog;
	})();

	//--------------------------------------------------------------------------
	/** Window_MenuCommand */
	(function () {
		const base = Window_MenuCommand.prototype.addOriginalCommands;
		Window_MenuCommand.prototype.addOriginalCommands = function()
		{
			base.call(this);
			if ( exports.Param.ShowMenuCommand )
			{
				const enabled = (exports.Param.MenuCommandEnableSwitchId === 0) ? true : $gameSwitches.value(exports.Param.MenuCommandEnableSwitchId);
				this.addCommand(exports.Param.MenuCommandName, "jobChange", enabled);
			}
		};
	}());

	//--------------------------------------------------------------------------
	/** Scene_JobChange */
	exports.Scene_JobChange = (function() {

		function Scene_JobChange()
		{
			this.initialize.apply(this, arguments);
		}

		Scene_JobChange.prototype = Object.create(Scene_MenuBase.prototype);
		Scene_JobChange.prototype.constructor = Scene_JobChange;

		Scene_JobChange.prototype.initialize = function()
		{
			this._changeActorEnable = $gameTemp.changeActorForJobChange();
			Scene_MenuBase.prototype.initialize.call(this);
		};

		Scene_JobChange.prototype.create = function()
		{
			Scene_MenuBase.prototype.create.call(this);
			this.createHelpWindow();
			this.createStatusWindow();
			this.createJobChangeWindow();
			this.createAddonWindow();
			this.createDialogWindow();
			this.refreshActor();
		};

		Scene_JobChange.prototype.createStatusWindow = function()
		{
			const rect = this.statusWindowRect();
			this._statusWindow = new exports.Window_JobStatus(rect);
			this.addWindow(this._statusWindow);
		};

		Scene_JobChange.prototype.createJobChangeWindow = function()
		{
			const rect = this.jobChangeWindowRect();
			this._jobWindow = new exports.Window_JobChange(rect);
			this._jobWindow.setHelpWindow(this._helpWindow);
			this._jobWindow.setStatusWindow(this._statusWindow);
			this._jobWindow.setHandler("ok",       this.onJobChange.bind(this));
			this._jobWindow.setHandler("cancel",   this.popScene.bind(this));
			if ( this._changeActorEnable )
			{
				this._jobWindow.setHandler("pagedown", this.nextActor.bind(this));
				this._jobWindow.setHandler("pageup",   this.previousActor.bind(this));
			}
			this._jobWindow.activate();
			this.addWindow(this._jobWindow);
		};

		Scene_JobChange.prototype.createAddonWindow = function()
		{
			// customize
		};

		Scene_JobChange.prototype.createDialogWindow = function()
		{
			const rect = this.dialogWindowRect();
			this._dialogWindow = new exports.Window_JobDialog(rect);
			this.addWindow(this._dialogWindow);
		};

		Scene_JobChange.prototype.statusWindowRect = function()
		{
			const wx = 0;
			const wy = this.mainAreaTop();
			const ww = Graphics.boxWidth;
			const wh = this.calcWindowHeight(3, true);
			return new Rectangle(wx, wy, ww, wh);
		};

		Scene_JobChange.prototype.jobChangeWindowRect = function()
		{
			const wx = 0;
			const wy = this._statusWindow.y + this._statusWindow.height;
			const ww = Graphics.boxWidth;
			const wh = Graphics.boxHeight - wy - this._helpWindow.height;
			return new Rectangle(wx, wy, ww, wh);
		};

		Scene_JobChange.prototype.dialogWindowRect = function()
		{
			const ww = this.dialogWidth();
			const wh = this.calcWindowHeight(1, true);
			const wx = (Graphics.boxWidth - ww) * 0.5;
			const wy = (Graphics.boxHeight - wh) * 0.5;
			return new Rectangle(wx, wy, ww, wh);
		};

		Scene_JobChange.prototype.start = function()
		{
			Scene_MenuBase.prototype.start.call(this);
			this._statusWindow.refresh();
			this._jobWindow.resetIntro();
		};

		Scene_JobChange.prototype.onJobChange = function()
		{
			const actor = this.actor();
			if ( actor )
			{
				const classId = this._jobWindow.selectedClassId();
				actor.changeClassEx(classId, exports.Param.KeepExp);
				if ( exports.Param.OptimizeEquipEnable )
				{
					actor.optimizeEquipments();
				}
				this._jobWindow.activate();
				if ( exports.Param.OptimizeEquipEnable )
				{
					this._dialogWindow.open();
				}
			}
			this._statusWindow.refresh();
		};

		Scene_JobChange.prototype.onActorChange = function()
		{
			Scene_MenuBase.prototype.onActorChange.call(this);
			this.refreshActor();
			this._jobWindow.activate();
		};

		Scene_JobChange.prototype.refreshActor = function()
		{
			const actor = this.actor();
			this._statusWindow.setActor(actor);
			this._jobWindow.setActor(actor);
		};

		Scene_JobChange.prototype.dialogWidth = function() { return 240; };
		Scene_JobChange.prototype.needsPageButtons = function() { return true; };

		return Scene_JobChange;
	})();

	//--------------------------------------------------------------------------
	/** Scene_Menu */
	(function () {
		const base = Scene_Menu.prototype.createCommandWindow;
		Scene_Menu.prototype.createCommandWindow = function()
		{
			base.call(this);
			this._commandWindow.setHandler("jobChange", this.commandPersonal.bind(this));
		};
	}());

	(function () {
		const base = Scene_Menu.prototype.onPersonalOk;
		Scene_Menu.prototype.onPersonalOk = function()
		{
			switch ( this._commandWindow.currentSymbol() )
			{
			case "jobChange":
				$gameTemp.setChangeActorForJobChange(true);
				SceneManager.push(exports.Scene_JobChange);
				break;
			default:
				base.call(this);
				break;
			}
		};
	}());

}((this.dsJobChangeMZ = this.dsJobChangeMZ || {})));
