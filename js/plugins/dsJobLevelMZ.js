//==============================================================================
// dsJobLevelMZ.js
// Copyright (c) 2015 - 2020 Douraku
// Released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//==============================================================================

/*:
 * @target MZ
 * @plugindesc ジョブレベルシステム ver1.0.0
 * @author 道楽
 * @base UniqueDataLoader
 * @orderAfter dsJobChangeMZ
 * 
 * @requiredAssets	img/system/Master.png
 *
 * @param Gain Jp Enable Switch Id
 * @type switch
 * @desc JPを獲得するかを切り替えるスイッチ番号
 *       0の場合は常に有効
 * @default 0
 *
 * @help
 * 本プラグインはdsJobChangeMZ.jsのアドオンプラグインです。
 */

var Imported = Imported || {};
Imported.dsJobLevelMZ = true;

(function (exports) {
	'use strict';

	exports.Param = (function() {
		var ret = {};
		var parameters = PluginManager.parameters("dsJobLevelMZ");
		ret.GainJpEnableSwitchId = Number(parameters["Gain Jp Enable Switch Id"]);
		return ret;
	})();

	//--------------------------------------------------------------------------
	/** Data_JobLevel */
	exports.Data_JobLevel = (function() {

		function Data_JobLevel()
		{
			this.initialize.apply(this, arguments);
		}

		Data_JobLevel.prototype.initialize = function(classId)
		{
			this._data = $dataUniques.jobLevels.find(data => data.id === classId);
		};

		// Property
		Object.defineProperties(Data_JobLevel.prototype, {
			id: { get: function() { return this._data ? this._data.id : 0; }, configurable: true },
			maxLevel: { get: function() { return this._data ? this._data.levels.length : 0; }, configurable: true }
		});

		Data_JobLevel.prototype.jobExp = function(index)
		{
			return this._data.levels[index].jobExp;
		};

		Data_JobLevel.prototype.learningSkillId = function(index)
		{
			return this._data.levels[index].skillId;
		};

		Data_JobLevel.prototype.learnSkills = function(actor, level)
		{
			for (var ii = 0; ii < level; ii++ )
			{
				actor.learnSkill(this._data.levels[ii].skillId);
			}
		};

		Data_JobLevel.prototype.jobExpForLevel = function(level)
		{
			var jobExp = 0;
			for (var ii = 0; ii < level; ii++ )
			{
				jobExp += this._data.levels[ii].jobExp;
			}
			return jobExp;
		};

		Data_JobLevel.prototype.remainJobExp = function(actor, level)
		{
			if ( actor.jobLevel(this.id) < level )
			{
				return this.jobExp(level);
			}
			const nowJobExp = actor.jobExp(this.id);
			const nextJobExp = this.jobExpForLevel(level+1);
			return Math.max(nextJobExp - nowJobExp, 0);
		};

		return Data_JobLevel;
	})();

	//--------------------------------------------------------------------------
	/** TextManager */
	Object.defineProperties(TextManager, {
		jobLevel: { get: function() { return "ソウルレベル"; } },
		jobLevelA: { get: function() { return "SLV"; } },
		jobExp: { get: function() { return "XP"; } },
		learningComplete: { get: function() { return "★"; } },
		obtainJobExp: { get: function() { return "%1 の%2を獲得！"; } },
		jobLevelUp: { get: function() { return "%1は%2の%3が %4 に上がった！"; } },
		jobLevelMaster: { get: function() { return "%1は%2をマスターした！"; } }
	});

	//--------------------------------------------------------------------------
	/** BattleManager */
	(function () {
		const base = BattleManager.makeRewards;
		BattleManager.makeRewards = function()
		{
			base.call(this);
			this._rewards.jobExp = $gameTroop.jobExpTotal();
		};
	}());

	(function () {
		const base = BattleManager.displayRewards;
		BattleManager.displayRewards = function()
		{
			base.call(this);
			this.displayJobExp();
		};
	}());

	BattleManager.displayJobExp = function()
	{
		const enabled = (exports.Param.GainJpEnableSwitchId === 0) ? true : $gameSwitches.value(exports.Param.GainJpEnableSwitchId);
		if ( !enabled )
		{
			return;
		}
		const jobExp = this._rewards.jobExp;
		if ( jobExp > 0 )
		{
			const text = TextManager.obtainJobExp.format(jobExp, TextManager.jobExp);
			$gameMessage.add("\\." + text);
		}
	};

	(function () {
		const base = BattleManager.gainRewards;
		BattleManager.gainRewards = function()
		{
			base.call(this);
			this.gainJobExp();
		};
	}());

	BattleManager.gainJobExp = function()
	{
		const enabled = (exports.Param.GainJpEnableSwitchId === 0) ? true : $gameSwitches.value(exports.Param.GainJpEnableSwitchId);
		if ( !enabled )
		{
			return;
		}
		const jobExp = this._rewards.jobExp;
		for (const actor of $gameParty.allMembers())
		{
			actor.gainJobExp(jobExp);
		}
	};

	//--------------------------------------------------------------------------
	/** Game_Actor */
	(function () {
		const base = Game_Actor.prototype.initExp;
		Game_Actor.prototype.initExp = function()
		{
			base.call(this);
			this._jobExp = [];
			this._jobLevel = [];
		};
	}());

	Game_Actor.prototype.currentJobExp = function()
	{
		return this.jobExp(this._classId);
	};

	Game_Actor.prototype.currentJobLevel = function()
	{
		return this.jobLevel(this._classId);
	};

	Game_Actor.prototype.changeJobExp = function(exp, show)
	{
		this._jobExp[this._classId] = Math.max(exp, 0);
		const lastLevel = this.currentJobLevel();
		const lastSkills = this.skills();
		const data = new exports.Data_JobLevel(this._classId);
		while (this.currentJobLevel() < data.maxLevel && this.currentJobExp() >= data.jobExpForLevel(this.currentJobLevel() + 1))
		{
			this.jobLevelUp();
		}
		while (this.currentJobExp() < data.jobExpForLevel(this.currentJobLevel()))
		{
			this.jobLevelDown();
		}
		if (show && this.currentJobLevel() > lastLevel)
		{
			this.displayJobLevelUp(this.findNewSkills(lastSkills));
		}
		this.refresh();
	};

	Game_Actor.prototype.gainJobExp = function(jobExp)
	{
		const newJobExp = this.currentJobExp() + Math.round(jobExp * this.finalJobExpRate());
		this.changeJobExp(newJobExp, this.shouldDisplayJobLevelUp());
	};

	Game_Actor.prototype.finalJobExpRate = function()
	{
		return 1.0;
	};

	Game_Actor.prototype.jobLevelUp = function()
	{
		this._jobLevel[this._classId] = (this._jobLevel[this._classId] + 1) || 0;
		const data = new exports.Data_JobLevel(this._classId);
		data.learnSkills(this, this._jobLevel[this._classId]);
	};

	Game_Actor.prototype.jobLevelDown = function()
	{
		this._jobLevel[this._classId]--;
	};

	Game_Actor.prototype.displayJobLevelUp = function(newSkills)
	{
		$gameMessage.newPage();
		if (this.jobMaster(this._classId))
		{
			const text = TextManager.jobLevelMaster.format(
				this._name,
				this.currentClass().name
			);
			$gameMessage.add(text);
		}
		else
		{
			const text = TextManager.jobLevelUp.format(
				this._name,
				this.currentClass().name,
				TextManager.jobLevel,
				this.currentJobLevel()
			);
			$gameMessage.add(text);
		}
		for ( const skill of newSkills )
		{
			$gameMessage.add(TextManager.obtainSkill.format(skill.name));
		}
	};

	Game_Actor.prototype.jobMaster = function(classId)
	{
		const data = new exports.Data_JobLevel(classId);
		return (data.maxLevel > 0) ? (this.jobLevel(classId) >= data.maxLevel) : false;
	};

	Game_Actor.prototype.jobExp = function(classId) { return this._jobExp[classId] ? this._jobExp[classId] : 0; };
	Game_Actor.prototype.jobLevel = function(classId) { return this._jobLevel[classId] ? this._jobLevel[classId] : 0; };
	Game_Actor.prototype.shouldDisplayJobLevelUp = function() { return true; };

	//--------------------------------------------------------------------------
	/** Game_Enemy */
	Game_Enemy.prototype.jobExp = function()
	{
		const enemy = this.enemy();
		return enemy.meta.jobExp ? Number(enemy.meta.jobExp) : 0;
	};

	//--------------------------------------------------------------------------
	/** Game_Troop */
	Game_Troop.prototype.jobExpTotal = function()
	{
		const total = this.deadMembers().reduce((r, enemy) => r + enemy.jobExp(), 0);
		return Math.ceil(total);
	};

	//--------------------------------------------------------------------------
	/** Sprite_JobMaster */
	exports.Sprite_JobMaster = (function() {

		function Sprite_JobMaster()
		{
			this.initialize.apply(this, arguments);
		}

		Sprite_JobMaster.prototype = Object.create(Sprite.prototype);
		Sprite_JobMaster.prototype.constructor = Sprite_JobMaster;

		Sprite_JobMaster.prototype.initialize = function()
		{
			Sprite.prototype.initialize.call(this);
			this.loadBitmap();
			this.initMembers();
		};

		Sprite_JobMaster.prototype.loadBitmap = function()
		{
			this.bitmap = ImageManager.loadSystem("Master");
		};

		Sprite_JobMaster.prototype.initMembers = function()
		{
			this.anchor.x = 0.5;
			this.anchor.y = 1;
		};

		return Sprite_JobMaster;
	})();

	//--------------------------------------------------------------------------
	/** Sprite_JobSelectionEx */
	exports.Sprite_JobSelectionEx = (function() {

		function Sprite_JobSelectionEx()
		{
			this.initialize.apply(this, arguments);
		}

		Sprite_JobSelectionEx.prototype = Object.create(dsJobChangeMZ.Sprite_JobSelection.prototype);
		Sprite_JobSelectionEx.prototype.constructor = Sprite_JobSelectionEx;

		Sprite_JobSelectionEx.prototype.initialize = function(classId, rootX, rootY)
		{
			dsJobChangeMZ.Sprite_JobSelection.prototype.initialize.apply(this, arguments);
			this.createMasterSprite();
		};

		Sprite_JobSelectionEx.prototype.initClassData = function(classId)
		{
			dsJobChangeMZ.Sprite_JobSelection.prototype.initClassData.apply(this, arguments);
			this._levelData = new exports.Data_JobLevel(classId);
		};

		Sprite_JobSelectionEx.prototype.createMasterSprite = function()
		{
			this._masterSprite = new exports.Sprite_JobMaster();
			this._masterSprite.y = -64;
			this._masterSprite.hide();
			this.addChild(this._masterSprite);
		};

		Sprite_JobSelectionEx.prototype.update = function()
		{
			dsJobChangeMZ.Sprite_JobSelection.prototype.update.apply(this, arguments);
			this.updateMaster();
		};

		Sprite_JobSelectionEx.prototype.updateMaster = function()
		{
			let showMaster = false;
			if ( this._actor && this._classData && this._levelData )
			{
				showMaster = this._actor.jobMaster(this._classData.id);
			}
			if ( showMaster )
			{
				this._masterSprite.show();
			}
			else
			{
				this._masterSprite.hide();
			}
		};

		return Sprite_JobSelectionEx;
	})();

	//--------------------------------------------------------------------------
	/** Window_JobChange */
	(function () {
		const base = dsJobChangeMZ.Window_JobChange.prototype.updateHelp;
		dsJobChangeMZ.Window_JobChange.prototype.updateHelp = function()
		{
			base.call(this);
			if ( this._learningWindow )
			{
				const classId = this.selectedClassId();
				this._learningWindow.setClassId(classId);
			}
		};
	}());

	dsJobChangeMZ.Window_JobChange.prototype.setLearningWindow = function(learningWindow)
	{
		this._learningWindow = learningWindow;
		this.callUpdateHelp();
	};

	dsJobChangeMZ.Window_JobChange.prototype._createSelectionJobSprite = function(classId, rootX, rootY)
	{
		return new exports.Sprite_JobSelectionEx(classId, rootX, rootY);
	};

	//--------------------------------------------------------------------------
	/** Window_JobLearning */
	exports.Window_JobLearning = (function() {

		function Window_JobLearning()
		{
			this.initialize.apply(this, arguments);
		}

		Window_JobLearning.prototype = Object.create(Window_Selectable.prototype);
		Window_JobLearning.prototype.constructor = Window_JobLearning;

		Window_JobLearning.prototype.initialize = function(rect)
		{
			Window_Selectable.prototype.initialize.call(this, rect);
			this._actor = null;
			this._data = null;
			this.openness = 0;
			this.show();
		};

		Window_JobLearning.prototype.setActor = function(actor)
		{
			if ( this._actor !== actor )
			{
				this._actor = actor;
				this.refresh();
				this.reopen();
			}
		};

		Window_JobLearning.prototype.setClassId = function(classId)
		{
			if ( !this._data || this._data.id !== classId )
			{
				this._data = new exports.Data_JobLevel(classId);
				this.refresh();
				this.reopen();
			}
		};

		Window_JobLearning.prototype.reopen = function()
		{
			this.openness = 0;
			this.open();
		};

		Window_JobLearning.prototype.drawItem = function(index)
		{
			if ( !this._actor )
			{
				return;
			}
			const rect = this.itemRect(index);
			const width1 = 12 * 5 / 2; // ちょっと潰す
			const width3 = 30;
			const x1 = rect.x + this.itemPadding();
			const x2 = x1 + (width1+ 6);
			const x3 = rect.x + rect.width - this.itemPadding() - width3;
			const y = rect.y + 2;
			const width2 = x3 - x2 - 6;
			this.drawJobLevel(index, x1, y, width1);
			this.drawLearningSkill(index, x2, y, width2);
			this.drawLearningExp(index, x3, y, width3);
		};

		Window_JobLearning.prototype.drawJobLevel = function(index, x, y, width)
		{
			const level = index + 1;
			const text = TextManager.jobLevelA + ":" + ("  " + level).slice(-2);
			this.resetTextColor();
			this.contents.fontSize = this.stdFontSize();
			this.drawText(text, x, y, width, "left");
			this.contents.fontSize = $gameSystem.mainFontSize();
		};

		Window_JobLearning.prototype.drawLearningSkill = function(index, x, y, width)
		{
			const skillId = this._data.learningSkillId(index);
			const text = $dataSkills[skillId].name;
			this.resetTextColor();
			this.contents.fontSize = this.stdFontSize();
			this.drawText(text, x, y, width, "left");
			this.contents.fontSize = $gameSystem.mainFontSize();
		};

		Window_JobLearning.prototype.drawLearningExp = function(index, x, y, width)
		{
			const level = index + 1;
			const classId = this._data.id;
			if (level <= this._actor.jobLevel(classId))
			{
				this.drawLearningComplete(index, x, y, width);
			}
			else
			{
				this.drawLearningRemainExp(index, x, y, width);
			}
		};

		Window_JobLearning.prototype.drawLearningRemainExp = function(index, x, y, width)
		{
			const jobExp = this._data.remainJobExp(this._actor, index);
			const text = ("   " + jobExp).slice(-3);
			const width2 = 8 * 3 / 2;
			const width1 = width - width2;
			this.resetTextColor();
			this.contents.fontSize = this.stdFontSize();
			this.drawText(text, x, y, width1, "right");
			this.contents.fontSize = this.expFontSize();
			this.drawText(TextManager.jobExp, x+width1, y+4, width2, "right");
			this.contents.fontSize = $gameSystem.mainFontSize();
		};

		Window_JobLearning.prototype.drawLearningComplete = function(index, x, y, width)
		{
			this.changeTextColor(ColorManager.systemColor());
			this.contents.fontSize = this.stdFontSize();
			this.drawText(TextManager.learningComplete, x, y, width, "right");
			this.contents.fontSize = $gameSystem.mainFontSize();
		};

		Window_JobLearning.prototype.lineHeight = function() { return 20; };
		Window_JobLearning.prototype.maxItems = function() { return this._data.maxLevel; };
		Window_JobLearning.prototype.stdFontSize = function() { return 16; };
		Window_JobLearning.prototype.expFontSize = function() { return 8; };

		// unused
		Window_JobLearning.prototype.drawShape = function(graphics) {};

		return Window_JobLearning;
	})();

	//--------------------------------------------------------------------------
	/** Scene_JobChange */
	(function () {
		const base = dsJobChangeMZ.Scene_JobChange.prototype.createAddonWindow;
		dsJobChangeMZ.Scene_JobChange.prototype.createAddonWindow = function()
		{
			base.call(this);
			this.createLearningWindow();
		};
	}());

	dsJobChangeMZ.Scene_JobChange.prototype.createLearningWindow = function()
	{
		const rect = this.learningWindowRect();
		this._leaningWindow = new exports.Window_JobLearning(rect);
		this._windowLayer.addChildAt(this._leaningWindow, 0);
		this._jobWindow.setLearningWindow(this._leaningWindow);
	};

	dsJobChangeMZ.Scene_JobChange.prototype.learningWindowRect = function()
	{
		const padding = $gameSystem.windowPadding();
		const ww = 280;
		const wx = Graphics.boxWidth - ww - padding;
		const wy = this.mainAreaTop() + this._statusWindow.height + padding;
		const wh = this._helpWindow.y - wy - padding;
		return new Rectangle(wx, wy, ww, wh);
	};

	(function () {
		const base = dsJobChangeMZ.Scene_JobChange.prototype.refreshActor;
		dsJobChangeMZ.Scene_JobChange.prototype.refreshActor = function()
		{
			base.call(this);
			this._leaningWindow.setActor(this.actor());
		};
	}());

}((this.dsJobLevelMZ = this.dsJobLevelMZ || {})));
