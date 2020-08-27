﻿//=============================================================================
// NRP_GameWindowSize.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc v1.01 Resize the entire game window & add to the options.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/475413177.html
 *
 * @help Change the window size of the entire game.
 * It also adds the ability to change the window size to the options screen.
 * 
 * Please be aware of the conflict with YEP_CoreEngine.
 * YEP_CoreEngine has a specification
 * that forces the window size to match the resolution.
 * By placing this plugin underneath the YEP_CoreEngine,
 * you can only resize the window appropriately.
 * 
 * For more information, please see below.
 * http://newrpg.seesaa.net/article/475413177.html
 * 
 * <Terms>
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but we will respond to defects as far as possible.
 * 
 * @param windowWidth
 * @type string
 * @default Graphics.width
 * @desc The width of the window (exclude frame) as the standard.
 * The default value is the same as the resolution.
 * 
 * @param windowHeight
 * @type string
 * @default Graphics.height
 * @desc The height of the window (exclude frame) as the standard.
 * The default value is the same as the resolution.
 * 
 * @param <option>
 * 
 * @param useOption
 * @parent <option>
 * @type boolean
 * @default true
 * @desc Add the ability to change the window size to the options screen.
 * 
 * @param optionName
 * @parent <option>
 * @type string
 * @default Window Size
 * @desc Set the display name on the options screen.
 * 
 * @param optionDispType
 * @parent <option>
 * @type select
 * @option % Style @value percent
 * @option Width*Heigth Style @value size
 * @default percent
 * @desc Set the display type on the options screen.
 * 
 * @param windowSizeMin
 * @parent <option>
 * @type string
 * @default 50
 * @desc The minimum window size that can be changed.
 * The default value is 50(%).
 * 
 * @param windowSizeMax
 * @parent <option>
 * @type string
 * @default 150
 * @desc The maximum window size that can be changed.
 * The default value is 150(%).
 * 
 * @param windowSizeOffset
 * @parent <option>
 * @type string
 * @default 25
 * @desc The unit of change in window size.
 * The default value is 25(%).
 * 
 * @param <cooperation>
 * 
 * @param overWriteSceneManagerRun
 * @parent <cooperation>
 * @type boolean
 * @default true
 * @desc Override the SceneManager.run function. This function is used to disable window resizing by YEP_CoreEngine.
 */

/*:ja
 * @target MZ
 * @plugindesc v1.01 ゲーム全体のウィンドウサイズを変更＆オプションに追加
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/475413177.html
 *
 * @help ゲーム全体のウィンドウサイズを変更します。
 * また、オプション画面にウィンドウサイズの変更機能を追加します。
 * 
 * ※YEP_CoreEngineとの競合にご注意ください。
 * YEP_CoreEngineには、強制的にウィンドウサイズを解像度に合わせる仕様があります。
 * このプラグインをYEP_CoreEngineの下へ配置すれば、
 * 適切にウィンドウサイズだけを変更できます。
 * 
 * 詳細は以下をご覧ください。
 * http://newrpg.seesaa.net/article/475413177.html
 * 
 * ■利用規約
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @param windowWidth
 * @text ウィンドウ横幅
 * @type string
 * @default Graphics.width
 * @desc 標準とするウィンドウの横幅（枠除く）です。
 * 初期値は解像度と同じです。
 * 
 * @param windowHeight
 * @text ウィンドウ縦幅
 * @type string
 * @default Graphics.height
 * @desc 標準とするウィンドウの縦幅（枠除く）です。
 * 初期値は解像度と同じです。
 * 
 * @param <option>
 * @text ＜オプション＞
 * 
 * @param useOption
 * @text オプションに表示
 * @parent <option>
 * @type boolean
 * @default true
 * @desc ウィンドウサイズの変更機能をオプション画面に追加します。
 * 
 * @param optionName
 * @text オプション表示名
 * @parent <option>
 * @type string
 * @default ウィンドウサイズ
 * @desc オプション画面での表示名を設定します。
 * 
 * @param optionDispType
 * @text オプション表示形式
 * @parent <option>
 * @type select
 * @option ％表示 @value percent
 * @option 横*縦表示 @value size
 * @default percent
 * @desc オプション画面での表示形式を設定します。
 * 
 * @param windowSizeMin
 * @text 最小ウィンドウサイズ
 * @parent <option>
 * @type string
 * @default 50
 * @desc 変更可能な最小のウィンドウサイズです。
 * 初期値は50(%)です。
 * 
 * @param windowSizeMax
 * @text 最大ウィンドウサイズ
 * @parent <option>
 * @type string
 * @default 150
 * @desc 変更可能な最大のウィンドウサイズです。
 * 初期値は150(%)です。
 * 
 * @param windowSizeOffset
 * @text 変更単位
 * @parent <option>
 * @type string
 * @default 25
 * @desc ウィンドウサイズの変更単位です。
 * 初期値は25(%)です。
 * 
 * @param <cooperation>
 * @text ＜外部連携＞
 * 
 * @param overWriteSceneManagerRun
 * @text SceneManager.runを上書
 * @parent <cooperation>
 * @type boolean
 * @default true
 * @desc SceneManager.run関数を上書きします。YEP_CoreEngineのウィンドウサイズ変更を無効化するための機能です。
 */

(function() {
"use strict";

// ローカル実行以外では機能無効
if (!Utils.isNwjs()) {
    return;
}

function setDefault(str, def) {
    return str ? str : def;
}
function toNumber(str, def) {
    return isNaN(str) ? def : +(str || def);
}
function toBoolean(str) {
    if (str == true) {
        return true;
    }
    return (str == "true") ? true : false;
}

var parameters = PluginManager.parameters("NRP_GameWindowSize");
// 基本項目
var pWindowWidth = parameters["windowWidth"];
var pWindowHeight = parameters["windowHeight"];
// オプション
var pUseOption = toBoolean(parameters["useOption"]);
var pOptionName = parameters["optionName"];
var pOptionDispType = parameters["optionDispType"];
var pWindowSizeMin = setDefault(parameters["windowSizeMin"], 50);
var pWindowSizeMax = setDefault(parameters["windowSizeMax"], 150);
var pWindowSizeOffset = setDefault(parameters["windowSizeOffset"], 25);
// 外部連携
var pOverWriteSceneManagerRun = toBoolean(parameters["overWriteSceneManagerRun"]);

// 識別子
const WINDOW_SIZE_SYMBOL = "windowSize";

/**
 * 上書きの場合
 */
if (pOverWriteSceneManagerRun) {
    SceneManager.run = function(sceneClass) {
        try {
            this.initialize();
            this.goto(sceneClass);

            // MZの場合
            if (Utils.RPGMAKER_NAME == "MV") {
                this.requestUpdate();
            // MZの場合
            } else {
                Graphics.startGameLoop();
            }
        } catch (e) {
            this.catchException(e);
        }
    };
}

/**
 * ●ゲーム起動時
 */
var _Scene_Boot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
    _Scene_Boot_start.apply(this, arguments);

    // ウィンドウサイズを設定値へ変更
    changeWindowSize();
};

/**
 * ●ウィンドウサイズの変更
 */
function changeWindowSize() {
    var dw = getWindowWidth() - window.innerWidth;
    var dh = getWindowHeight() - window.innerHeight;
    window.moveBy(-dw / 2, -dh / 2);
    window.resizeBy(dw, dh);
}

/**
 * ●ウィンドウの横幅取得
 */
function getWindowWidth() {
    var width = Graphics.width;
    if (pWindowWidth) {
        width = eval(pWindowWidth);
    }
    return Math.round(width * getWindowSizeRate());
}

/**
 * ●ウィンドウの縦幅取得
 */
function getWindowHeight() {
    var height = Graphics.height;
    if (pWindowHeight) {
        height = eval(pWindowHeight);
    }
    return Math.round(height * getWindowSizeRate());
}

/**
 * ●ウィンドウサイズのレートを取得
 */
function getWindowSizeRate() {
    var windowSizeRate = 1;
    // オプションを使用しない場合は1
    if (!pUseOption) {
        return windowSizeRate;
    }

    if (ConfigManager.windowSize) {
        windowSizeRate = ConfigManager.windowSize / 100;
    }

    return windowSizeRate;
}

/**
 * オプションを使用しない場合はここで処理終了
 */
if (!pUseOption) {
    return;
}

/**
 * ●オプション用ウィンドウサイズの最小値
 */
function windowSizeMin() {
    return eval(pWindowSizeMin);
}

/**
 * ●オプション用ウィンドウサイズの最大値
 */
function windowSizeMax() {
    return eval(pWindowSizeMax);
}

/**
 * ●オプション用ウィンドウサイズの変更単位
 */
function windowSizeOffset() {
    return eval(pWindowSizeOffset);
}

// ウィンドウサイズの初期値
ConfigManager.windowSize = 100;

/**
 * ●オプション画面の項目生成
 */
var _ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function() {
    var config = _ConfigManager_makeData.apply(this, arguments);

    config.windowSize = this.windowSize;
    return config;
};

/**
 * ●オプション画面の項目生成
 */
var _ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function(config) {
    _ConfigManager_applyData.apply(this, arguments);

    this.windowSize = this.readWindowSize(config, WINDOW_SIZE_SYMBOL);
};

/**
 * 【独自】ウィンドウサイズをコンフィグから読込
 */
ConfigManager.readWindowSize = function(config, name) {
    var value = config[name];
    if (value !== undefined) {
        return Number(value).clamp(windowSizeMin(), windowSizeMax());
    } else {
        return 100;
    }
};

/**
 * ●表示状態取得
 */
var _Window_Options_statusText = Window_Options.prototype.statusText;
Window_Options.prototype.statusText = function(index) {
    var symbol = this.commandSymbol(index);
    var value = this.getConfigValue(symbol);

    if (isWindowsSizeSymbol(symbol)) {
        return windowSizeStatusText(value);
    }

    return _Window_Options_statusText.apply(this, arguments);
};

/**
 * ●ウィンドウサイズの表示名
 */
function windowSizeStatusText(value) {
    // サイズ表示
    if (pOptionDispType == "size") {
        return getWindowWidth() + "*" + getWindowHeight();
    }
    // ％表示
    return Math.round(value * 10) / 10 + '%';
}

/**
 * ●あまり細かい値にならないよう丸める
 */
function windowSizeRound(value) {
    // 最小値、最大値、100と1以内ならそれぞれの値を設定する。
    // （涙ぐましい微調整……）
    if (Math.abs(value - windowSizeMin()) < 1) {
        value = windowSizeMin();
    } else if (Math.abs(value - windowSizeMax()) < 1) {
        value = windowSizeMax();
    } else if (Math.abs(value - 100) < 1) {
        value = 100;
    }

    // 少数第二位まで
    return Math.round(value * 100) / 100;
}

/**
 * ●決定キー
 */
var _Window_Options_processOk = Window_Options.prototype.processOk;
Window_Options.prototype.processOk = function() {
    var index = this.index();
    var symbol = this.commandSymbol(index);
    var value = this.getConfigValue(symbol);

    if (isWindowsSizeSymbol(symbol)) {
        value += windowSizeOffset();
        value = windowSizeRound(value);

        if (value > windowSizeMax()) {
            value = windowSizeMin();
        }
        value = value.clamp(windowSizeMin(), windowSizeMax());
        this.changeValue(symbol, value);
        return;
    }
    
    _Window_Options_processOk.apply(this, arguments);
};

/**
 * ●カーソル右
 */
var _Window_Options_cursorRight = Window_Options.prototype.cursorRight;
Window_Options.prototype.cursorRight = function(wrap) {
    var index = this.index();
    var symbol = this.commandSymbol(index);
    var value = this.getConfigValue(symbol);

    if (isWindowsSizeSymbol(symbol)) {
        value += windowSizeOffset();
        value = windowSizeRound(value);
        value = value.clamp(windowSizeMin(), windowSizeMax());
        this.changeValue(symbol, value);
        return;
    }

    _Window_Options_cursorRight.apply(this, arguments);
};

/**
 * ●カーソル左
 */
var _Window_Options_cursorLeft = Window_Options.prototype.cursorLeft;
Window_Options.prototype.cursorLeft = function(wrap) {
    var index = this.index();
    var symbol = this.commandSymbol(index);
    var value = this.getConfigValue(symbol);

    if (isWindowsSizeSymbol(symbol)) {
        value -= windowSizeOffset();
        value = windowSizeRound(value);
        value = value.clamp(windowSizeMin(), windowSizeMax());
        this.changeValue(symbol, value);
        return;
    }

    _Window_Options_cursorLeft.apply(this, arguments);
};

/**
 * ●ウィンドウサイズの項目追加
 */
var _Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
Window_Options.prototype.addGeneralOptions = function() {
    _Window_Options_addGeneralOptions.apply(this, arguments);

    this.addCommand(pOptionName, WINDOW_SIZE_SYMBOL);
};

/**
 * ●設定値を反映
 */
var _Window_Options_setConfigValue = Window_Options.prototype.setConfigValue;
Window_Options.prototype.setConfigValue = function(symbol, volume) {
    _Window_Options_setConfigValue.apply(this, arguments);

    if (isWindowsSizeSymbol(symbol)) {
        // ウィンドウサイズを反映
        changeWindowSize();
    }
};

/**
 * ●ウィンドウサイズのオプションか？
 */
function isWindowsSizeSymbol(symbol) {
    if (symbol == WINDOW_SIZE_SYMBOL) {
        return true;
    }
    return false;
}

})();
