//=============================================================================
// VisuStella MZ - Main Menu Core
// VisuMZ_1_MainMenuCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MainMenuCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MainMenuCore = VisuMZ.MainMenuCore || {};
VisuMZ.MainMenuCore.version = 1.02;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.02] [MainMenuCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Main_Menu_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Main Menu Core plugin is designed to give you more control over the Main
 * Menu outside of RPG Maker MZ's editor's control. Game devs are given control
 * over how commands work, visual aesthetics pertaining to the Main Menu, and 
 * assign menu images to actors as background portraits.
 *
 * Features include all (but not limited to) the following:
 *
 * * Control over general Main Menu settings.
 * * The ability to set Menu Background Portraits for individual actors.
 * * Flexibility in changing which commands appear in the Main Menu.
 * * Add new windows like the Playtime Window and Variable windows.
 * * Change the style of how the windows are arranged in the Main Menu.
 * * Change the way the status list is displayed and the way it's displayed.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 *
 * <Menu Image: filename>
 *
 * - Used for: Actor
 * - Sets the menu image for the actor to 'filename'.
 * - Replace 'filename' with a picture found within your game project's
 *   img/pictures/ folder. Filenames are case sensitive. Leave out the filename
 *   extension from the notetag.
 *
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Change Menu Image (Group)
 * Actor: Change Menu Image (Range)
 * Actor: Change Menu Image (JS)
 * - Changes the actor's Menu Image.
 * - Each version has a different means of selecting Actor ID's.
 *
 *   Step 1: Actor:
 *   - Select which ID(s) to affect.
 *
 *     Single:
 *     - Select which specific ID to affect.
 *
 *     Variable Reference:
 *     - Which variable is used to determine which ID to affect?
 *
 *     Range Start:
 *     - Select where the ID range begins.
 *
 *     Range End:
 *     - Select where the ID range ends.
 *
 *     Group:
 *     - Select which group of ID(s) to affect.
 *
 *     JavaScript:
 *     - JavaScript code to return an array on which ID(s) to affect.
 *
 *   Step 2: Target:
 *   - Select operation on what to change the switch(es) to.
 *   - Depending on what you pick here, one of the following actions are used
 *     in combination with the ID's picked from Step 1.
 *
 *     Filename:
 *     - Selected actor(s) will have their menu images changed to this.
 *
 *     Variable Reference:
 *     - Select the variable used to determine filename used for the selected
 *       actor(s).
 *
 *     JavaScript:
 *     - JavaScript code to determine what filename is used for the selected
 *       actor(s).
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These general settings contain various settings on how the Main Menu scene
 * displays certain windows, alters how specific windows behave, and determines
 * which scenes would display actor menu images as background portraits.
 *
 * ---
 *
 * Gold Window
 * 
 *   Thinner Gold Window:
 *   - Make the Gold Window thinner in the Main Menu?
 *   - Used to match the Playtime and Variable Windows.
 * 
 *   Auto Adjust Height:
 *   - Automatically adjust the height for the thinner Gold Window?
 *
 *   Auto Adjust Y:
 *   - Automatically adjust the Y position for the thinner Gold Window?
 *
 * ---
 *
 * Solo Party
 *
 *   Solo Quick Mode:
 *   - When selecting "Skills", "Equip", or "Status" with one party member,
 *     immediately go to the scene.
 *
 * ---
 *
 * Sub Menus
 *
 *   Menus with Actor BG's:
 *   - A list of the menus that would be compatible with Actor Menu Backgrounds
 *
 *   JS: Actor BG Action:
 *   - Code used to determine how to display the sprites upon loading.
 *
 * ---
 * 
 * Party Window
 * 
 *   Show Reserve Memebers:
 *   - Show reserve members while on the Main Menu scene?
 * 
 *   Hide Main Menu Only
 *   - If reserve members are hidden, hide them only in the main menu or
 *     all scenes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Command Window List
 * ============================================================================
 *
 * The Command Window functions as a hub to the various scenes linked from the
 * Main Menu. These include 'Item', 'Skill', 'Equip', 'Status', 'Save', and
 * so on. This Plugin Parameter is an array that lets you add, remove, and/or
 * alter the Command Window's various commands, how they're handled, whether or
 * not they're visible, and how they react when selected.
 *
 * These will require knowledge of JavaScript to use them properly.
 *
 * ---
 *
 * Command Window List
 * 
 *   Symbol:
 *   - The symbol used for this command.
 *
 *   Icon:
 *   - Icon used for this command.
 *   - Use 0 for no icon.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 *   JS: Personal Code:
 *   - JavaScript code that runs once the actor list is selected with this
 *     command highlighted.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Playtime Window
 * ============================================================================
 *
 * The Playtime Window is an optional feature that can be displayed in the
 * Main Menu. As its name suggests, it displays the playtime of the player's
 * current play through.
 *
 * ---
 *
 * Playtime Window
 * 
 *   Enable:
 *   - Use the Playtime Window?
 * 
 *   Adjust Command Window:
 *   - Adjust the command window's height to fit in the Playtime Window?
 *
 *   Background Type:
 *   - Select background type for the Playtime window.
 * 
 *   Font Size:
 *   - Font size used for displaying Gold inside the Playtime window.
 * 
 *   Time Icon:
 *   - Icon displayed for the 'Time' label.
 * 
 *   Time Text:
 *   - Text for the display of 'Time' in the Playtime window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for the Playtime window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Variable Window
 * ============================================================================
 *
 * The Variable Window is an optional feature that can be displayed in the
 * Main Menu. If enabled, the Variable Window will display variables of the
 * game dev's choice in the Main Menu itself.
 *
 * ---
 *
 * Variable Window
 * 
 *   Enable:
 *   - Use the Variable Window?
 * 
 *   Adjust Command Window:
 *   - Adjust the command window's height to fit in the Variable Window?
 *
 *   Background Type:
 *   - Select background type for the Variable window.
 * 
 *   Font Size:
 *   - Font size used for displaying Gold inside the Variable window.
 * 
 *   Variable List:
 *   - Select variables to be displayed into the window.
 *     Use \i[x] to determine their icon.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for the Variable window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Command Window Style & Command Style Settings
 * ============================================================================
 *
 * This determines how the Main Menu appears based on the Command Window Style.
 * If anything but the 'Default' is used, then these settings will take over
 * the window placement settings for the Main Menu. This means that even if you
 * are using VisuStella's Core Engine, the window layouts will be overwritten.
 *
 * ---
 *
 * Command Window Style:
 * - Choose the positioning and style of the Main Menu Command Window.
 * - This will automatically rearrange windows.
 * 
 *   Default Vertical Side Style:
 *   - The default Main Menu layout style.
 *   - Affected by VisuStella's Core Engine's Plugin Parameter settings.
 * 
 *   Top Horizontal Style:
 *   - Puts the Command Window at the top of the screen.
 *   - Gold, Playlist, and Variable Windows are moved to the bottom.
 *   - The Actor List Window is placed in the middle.
 *   - Unaffected by VisuStella's Core Engine's Plugin Parameter settings.
 *
 *   Bottom Horizontal Style:
 *   - Puts the Command Window at the bottom of the screen.
 *   - Gold, Playlist, and Variable Windows are moved to the top.
 *   - The Actor List Window is placed in the middle.
 *   - Unaffected by VisuStella's Core Engine's Plugin Parameter settings.
 * 
 *   Mobile Full Screen Style:
 *   - Puts the Command Window at the center of the screen with larger buttons.
 *   - Gold, Playlist, and Variable Windows are moved to the bottom.
 *   - The Actor List Window is hidden until prompted to be selected.
 *   - Unaffected by VisuStella's Core Engine's Plugin Parameter settings.
 *
 * ---
 *
 * Command Style Settings
 *
 *   Style:
 *   - How do you wish to draw command entries in the Command Window?
 *   - Text Only: displays only text.
 *   - Icon Only: displays only the icon.
 *   - Icon + Text: displays icon first, then text.
 *   - Automatic: determines the best fit for the size
 *
 *   Text Alignment:
 *   - Decide how you want the text to be aligned.
 *   - Left, Center, or Right
 * 
 *   Rows:
 *   - Number of visible rows.
 *   - Applies only to Top, Bottom, and Mobile styles.
 * 
 *   Columns:
 *   - Number of maximum columns.
 *   - Applies only to Top, Bottom, and Mobile styles.
 * 
 *   Mobile Thickness:
 *   - The thickness of the buttons for mobile version.
 *   - Applies only to Top, Bottom, and Mobile styles.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Status Graphic, Status List Style, & List Style Settings
 * ============================================================================
 *
 * Choose how the contents Actor Status List Window in the Main Menu appears.
 * This can range from the which actor graphic is drawn to the style used for
 * the data that's displayed.
 *
 * ---
 *
 * Status Graphic:
 * - Choose how the graphic for actor graphics appear in status-like menus.
 * 
 *   None:
 *   - Don't display any graphic for the actors.
 * 
 *   Face:
 *   - Display the actors' faces. This is the default option in RPG Maker MZ.
 *
 *   Map Sprite:
 *   - Display the actors' map sprites.
 * 
 *   Sideview Battler:
 *   - Display the actors' sideview battlers.
 *
 * ---
 *
 * Main Menu List Style
 * - Choose how the actor status list looks in the Main Menu.
 *
 * Inner-Menu List Style
 * - Choose how the actor status list looks in the inner menus like Scene_Item,
 *   Scene_Skill, etc.
 *
 *   Default Horizontal Style:
 *   - This is the default style found in RPG Maker MZ's Main Menu.
 *
 *   Vertical Style:
 *   - Makes the display for the actor list vertical instead of horizontal.
 *
 *   Portrait Style:
 *   - Similar to the vertical style, except each actor's Menu Image is
 *     displayed in the background instead. Portraits are required.
 *
 *   Solo Style:
 *   - Used for solo party member games. Extends the whole view of the Status
 *     Window to accomodate a single actor.
 *
 *   Thin Horizontal Style:
 *   - Makes the selectable menu entries for the actors a single line thin.
 *
 *   Thicker Horizontal Style:
 *   - Makes the selectable menu entries for the actors two lines thick.
 *
 * ---
 *
 * List Styles
 *   JavaScript code used to determine how the individual styles are drawn.
 *
 *   JS: Default:
 *   JS: Vertical:
 *   JS: Portrait:
 *   JS: Solo:
 *   JS: Thin:
 *   JS: Thicker:
 *   - Code used to draw the data for these styles.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.02: September 13, 2020
 * * Compatibility Update!
 * ** Better compatibility for SV Actor graphics.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Skill check plugin parameter for show fixed. Fixed by Yanfly and Shaz.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Command Window List > skill >
 *     JS: Show > and changing 'this.needsCommand("item")' to
 *     'this.needsCommand("skill")'
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChangeActorMenuImageGroup
 * @text Actor: Change Menu Image (Group)
 * @desc Changes the actor's Menu Image.
 * Select from a group of actor ID's to change.
 *
 * @arg Step1:arraynum
 * @text Step 1: Target ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step2:str
 * @text Step 2: Filename
 * @type file
 * @dir img/pictures/
 * @desc Selected actor(s) will have their menu images changed to this.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChangeActorMenuImageRange
 * @text Actor: Change Menu Image (Range)
 * @desc Changes the actor's Menu Image.
 * Select from a range of actor ID's to change.
 *
 * @arg Step1
 * @text Step 1: ID Range
 *
 * @arg Step1Start:num
 * @text Range Start
 * @parent Step1
 * @type actor
 * @desc Select which Actor ID to start from.
 * @default 1
 *
 * @arg Step1End:num
 * @text Range End
 * @parent Step1
 * @type actor
 * @desc Select which Actor ID to end at.
 * @default 4
 *
 * @arg Step2:str
 * @text Step 2: Filename
 * @type file
 * @dir img/pictures/
 * @desc Selected actor(s) will have their menu images changed to this.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChangeActorMenuImageJS
 * @text Actor: Change Menu Image (JS)
 * @desc Changes the actor's Menu Image.
 * Select from a group of actor ID's using JavaScript.
 *
 * @arg Step1:arrayeval
 * @text Step 1: Target ID(s)
 * @type string[]
 * @desc Enter which Actor ID(s) to affect.
 * You may use JavaScript code.
 * @default ["$gameVariables.value(1)"]
 *
 * @arg Step2:str
 * @text Step 2: Filename
 * @type file
 * @dir img/pictures/
 * @desc Selected actor(s) will have their menu images changed to this.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param MainMenuCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings pertaining to the Main Menu and related.
 * @default {"GoldWindow":"","ThinGoldWindow:eval":"true","AutoGoldHeight:eval":"true","AutoGoldY:eval":"true","SoloParty":"","SoloQuick:eval":"true","SubMenus":"","ActorBgMenus:arraystr":"[\"Scene_Skill\"]","ActorBgMenuJS:func":"\"this.anchor.x = 0.5;\\nconst scale = 1.25;\\nthis.scale.x = this.scale.y = scale;\\nthis.x = Graphics.width;\\nthis.y = Graphics.height - (this.bitmap.height * Math.abs(scale));\\nthis._targetX = Graphics.width * 3 / 4;\\nthis._targetY = Graphics.height - (this.bitmap.height * Math.abs(scale));\\nthis._duration = 10;\\nthis.opacity = 0;\"","PartyWindow":"","ShowReserve:eval":"true","HideMainMenuOnly:eval":"true"}
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Main Menu.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"item\",\"Icon:num\":\"208\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.item;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"item\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandItem();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"classChange\",\"Icon:num\":\"133\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.classChangeMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_ClassChangeSystem &&\\\\n    this.isClassChangeCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled() &&\\\\n    this.isClassChangeCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_ClassChange);\\\"\"}","{\"Symbol:str\":\"skill\",\"Icon:num\":\"101\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.skill;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"skill\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Skill);\\\"\"}","{\"Symbol:str\":\"equip\",\"Icon:num\":\"137\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.equip;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"equip\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Equip);\\\"\"}","{\"Symbol:str\":\"status\",\"Icon:num\":\"82\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.status;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"status\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Status);\\\"\"}","{\"Symbol:str\":\"itemCrafting\",\"Icon:num\":\"223\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.ItemCraftingMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_ItemCraftingSys &&\\\\n    this.isItemCraftingCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isItemCraftingCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandItemCrafting();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"quest\",\"Icon:num\":\"186\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.questCommandName;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_QuestSystem &&\\\\n    this.isQuestCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isQuestCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandQuest();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"formation\",\"Icon:num\":\"75\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.formation;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"formation\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isFormationEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandFormation();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"options\",\"Icon:num\":\"83\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"options\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isOptionsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"save\",\"Icon:num\":\"189\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.save;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"save\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isSaveEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandSave();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"commonEvent1\",\"Icon:num\":\"88\",\"TextStr:str\":\"Common Event 1\",\"TextJS:func\":\"\\\"return 'Text';\\\"\",\"ShowJS:func\":\"\\\"return false;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return 1;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandCommonEvent();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"commonEvent2\",\"Icon:num\":\"87\",\"TextStr:str\":\"Common Event 2\",\"TextJS:func\":\"\\\"return 'Text';\\\"\",\"ShowJS:func\":\"\\\"return false;\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return 2;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"// Declare Ext\\\\nconst ext = arguments[0];\\\\n\\\\n// Declare Status Window\\\\nconst statusWindow = SceneManager._scene._statusWindow;\\\\n\\\\n// Declare Actor ID\\\\nconst actorId = statusWindow.actor(statusWindow.index()).actorId();\\\\n\\\\n// Set variable 1 to Actor ID\\\\n$gameVariables.setValue(1, actorId);\\\\n\\\\n// Prepare Common Event ext to run\\\\n$gameTemp.reserveCommonEvent(ext);\\\\n\\\\n// Exit Main Menu\\\\nSceneManager._scene.popScene();\\\"\"}","{\"Symbol:str\":\"gameEnd\",\"Icon:num\":\"187\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"gameEnd\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isGameEndEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandGameEnd();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}"]
 *
 * @param Playtime:struct
 * @text Playtime Window
 * @type struct<Playtime>
 * @desc Settings for the Playtime Window.
 * @default {"Enable:eval":"true","AdjustCommandHeight:func":"true","BgType:num":"0","FontSize:num":"24","Icon:num":"75","Time:str":"Time","WindowRect:func":"\"const rows = 1;\\nconst ww = this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(rows, false);\\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\\nlet wy = this.mainAreaBottom() - wh;\\nif (this._goldWindow) wy -= this._goldWindow.height;\\nif (this.canCreateVariableWindow()) wy -= this.variableWindowRect().height;\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 *
 * @param Variable:struct
 * @text Variable Window
 * @type struct<Variable>
 * @desc Settings for the Variable Window.
 * @default {"Enable:eval":"false","AdjustCommandHeight:func":"true","BgType:num":"0","FontSize:num":"24","VarList:arraynum":"[\"1\",\"2\"]","WindowRect:func":"\"const rows = VisuMZ.MainMenuCore.Settings.Variable.VarList.length;\\nconst ww = this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(rows, false);\\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\\nlet wy = this.mainAreaBottom() - wh;\\nif (this._goldWindow) wy -= this._goldWindow.height;\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 *
 * @param ParamBreak1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param CommandWindowStyle:str
 * @text Command Window Style
 * @type select
 * @option Default Vertical Side Style
 * @value default
 * @option Top Horizontal Style
 * @value top
 * @option Thin Top Horizontal Style
 * @value thinTop
 * @option Bottom Horizontal Style
 * @value bottom
 * @option Thin Bottom Horizontal Style
 * @value thinBottom
 * @option Mobile Full Screen Style
 * @value mobile
 * @desc Choose the positioning and style of the Main Menu Command Window. This will automatically rearrange windows.
 * @default top
 *
 * @param CustomCmdWin:struct
 * @text Command Style Settings
 * @parent CommandWindowStyle:str
 * @type struct<CustomCmdWin>
 * @desc Settings for the non-default Command Window Styles.
 * @default {"Style:str":"auto","TextAlign:str":"center","Rows:num":"2","Cols:num":"4","MobileThickness:num":"5"}
 *
 * @param ParamBreak2
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param StatusGraphic:str
 * @text Status Graphic
 * @type select
 * @option None
 * @value none
 * @option Face
 * @value face
 * @option Map Sprite
 * @value sprite
 * @option Sideview Battler
 * @value svbattler
 * @desc Choose how the actor graphics appear in status-like menus.
 * @default face
 *
 * @param StatusListStyle:str
 * @text Main Menu List Style
 * @type select
 * @option Default Horizontal Style
 * @value default
 * @option Vertical Style
 * @value vertical
 * @option Portrait Style
 * @value portrait
 * @option Solo Style
 * @value solo
 * @option Thin Horizontal Style
 * @value thin
 * @option Thicker Horizontal Style
 * @value thicker
 * @desc Choose how the actor status list looks in the Main Menu.
 * @default portrait
 *
 * @param InnerMenuListStyle:str
 * @text Inner-Menu List Style
 * @parent StatusListStyle:str
 * @type select
 * @option Default Horizontal Style
 * @value default
 * @option Vertical Style
 * @value vertical
 * @option Portrait Style
 * @value portrait
 * @option Solo Style
 * @value solo
 * @option Thin Horizontal Style
 * @value thin
 * @option Thicker Horizontal Style
 * @value thicker
 * @desc Choose how the actor status list looks in the inner menus
 * like Scene_Item, Scene_Skill, etc.
 * @default default
 *
 * @param ListStyles:struct
 * @text List Style Settings
 * @parent StatusListStyle:str
 * @type struct<ListStyles>
 * @desc JavaScript code used to determine how the individual styles are drawn.
 * @default {"DefaultStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Draw Actor Graphic\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Status Stuff\\nconst sx = rect.x + 180;\\nconst sy = rect.y + rect.height / 2 - this.lineHeight() * 1.5;\\nconst lineHeight = this.lineHeight();\\nconst sx2 = sx + 180;\\nthis.drawActorName(actor, sx, sy);\\nthis.drawActorLevel(actor, sx, sy + lineHeight * 1);\\nthis.drawActorIcons(actor, sx, sy + lineHeight * 2);\\nthis.drawActorClass(actor, sx2, sy);\\n\\n// Place Gauges\\nconst sy2 = sy + lineHeight;\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nthis.placeGauge(actor, \\\"hp\\\", sx2, sy2);\\nthis.placeGauge(actor, \\\"mp\\\", sx2, sy2 + gaugeLineHeight);\\nconst roomForTp = (sy2 + gaugeLineHeight * 3) <= rect.y + rect.height;\\nif ($dataSystem.optDisplayTp && roomForTp) {\\n    this.placeGauge(actor, \\\"tp\\\", sx2, sy2 + gaugeLineHeight * 2);\\n}\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nconst sx3 = sx2 + 180;\\nconst sw = rect.width - sx3 - 2;\\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    const pw = Math.floor(sw / 2) - 24;\\n    let px = sx3;\\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, py, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx3;\\n            py += gaugeLineHeight;\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n}\"","VerticalStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\\n\\n// Draw Actor Graphic\\nconst gw = rect.width;\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nconst gx = rect.x;\\nconst gy = Math.max(rect.y, rect.y + (rect.height - totalHeight - gh) / 2);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Actor Name\\nlet sx = rect.x;\\nlet sy = Math.max(gy + gh, rect.y + (rect.height - totalHeight + gh) / 2);\\nlet sw = rect.width;\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\n\\n// Draw Actor Level\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorLevel(actor, sx, sy);\\n\\n// Draw Actor Class\\nconst className = actor.currentClass().name;\\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\\nsy += lineHeight;\\nthis.drawTextEx(className, sx, sy, sw);\\n\\n// Draw Actor Icons\\nsx = rect.x + Math.round((rect.width - 144) / 2);\\nsy += lineHeight;\\nthis.drawActorIcons(actor, sx, sy);\\n\\n// Draw Gauges\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nif ($dataSystem.optDisplayTp) {\\n    this.placeGauge(actor, \\\"tp\\\", sx, sy);\\n}\"","PortraitStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Make Constants\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\\n\\n// Draw Actor Graphic\\nconst gw = rect.width;\\nconst gh = rect.height;\\nconst gx = rect.x;\\nconst gy = rect.y;\\nthis.drawItemActorMenuImage(actor, gx, gy, gw, gh);\\n\\n// Draw Dark Rectangle\\nlet sx = rect.x;\\nlet sy = Math.max(rect.y, rect.y + (rect.height - totalHeight));\\nlet sw = rect.width;\\nlet sh = rect.y + rect.height - sy;\\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\\n\\n// Draw Actor Name\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\n\\n// Draw Actor Level\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorLevel(actor, sx, sy);\\n\\n// Draw Actor Class\\nconst className = actor.currentClass().name;\\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\\nsy += lineHeight;\\nthis.drawTextEx(className, sx, sy, sw);\\n\\n// Draw Actor Icons\\nsx = rect.x + Math.round((rect.width - 144) / 2);\\nsy += lineHeight;\\nthis.drawActorIcons(actor, sx, sy);\\n\\n// Draw Gauges\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nif ($dataSystem.optDisplayTp) {\\n    this.placeGauge(actor, \\\"tp\\\", sx, sy);\\n}\"","SoloStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Make Constants\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\n\\n// Draw Actor Graphic\\nlet sx = rect.x;\\nlet sy = rect.y;\\nlet sw = rect.width;\\nlet sh = rect.height;\\n\\n// Portrait\\nif (actor.getMenuImage() !== '') {\\n    this.drawItemActorMenuImage(actor, rect.x, rect.y, rect.width, rect.height);\\n\\n// Everything Else\\n} else {\\n    const gx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - ImageManager.faceWidth) / 2));\\n    const gy = Math.max(0, rect.y + rect.height - Math.ceil(lineHeight * 4.5) - ImageManager.faceHeight);\\n    this.drawActorGraphic(actor, gx, gy, ImageManager.faceWidth, ImageManager.faceHeight);\\n}\\n\\n// Draw Dark Rectangle\\nsh = Math.ceil(lineHeight * 4.5);\\nsy = rect.y + rect.height - sh;\\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\\n\\n// Draw Actor Name\\nsw = Math.round(rect.width / 2);\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\n\\n// Draw Actor Level\\nsx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - 128) / 2));\\nsy += lineHeight;\\nthis.drawActorLevel(actor, sx, sy);\\n\\n// Draw Actor Class\\nconst className = actor.currentClass().name;\\nsx = rect.x + Math.round(((rect.width / 2) - this.textSizeEx(className).width) / 2);\\nsy += lineHeight;\\nthis.drawTextEx(className, sx, sy, sw);\\n\\n// Draw Actor Icons\\nsx = rect.x + Math.round(((rect.width / 2) - 144) / 2);\\nsy += lineHeight;\\nthis.drawActorIcons(actor, sx, sy);\\n\\n// Prepare Stat Coordinates\\nsx = rect.x + Math.floor(rect.width / 2);\\nsw = rect.width / 2;\\nsh = rect.height;\\nconst sx3 = sx;\\nconst cw = rect.width - sx3 - 2;\\n\\n// Prepare Total Content Height to vertically center the content.\\nlet totalHeight = gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    totalHeight += lineHeight;\\n    totalHeight += Math.ceil(params.length / 2) * gaugeLineHeight;\\n}\\nconst equips = actor.equips();\\ntotalHeight += lineHeight;\\ntotalHeight += equips.length * lineHeight;\\nsy = Math.max(rect.y, rect.y + Math.floor((rect.height - totalHeight) / 2));\\n\\n// Place Gauges\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nif ($dataSystem.optDisplayTp) {\\n    sy += gaugeLineHeight;\\n    this.placeGauge(actor, \\\"tp\\\", sx, sy);\\n    sy += gaugeLineHeight;\\n}\\nlet ny = sy;\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    sy += lineHeight;\\n    const pw = Math.floor(cw / 2) - 24;\\n    let px = sx3;\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, sy, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, sy, pw, gaugeLineHeight, 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx3;\\n            sy += gaugeLineHeight;\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n    ny += lineHeight;\\n    ny += Math.ceil(params.length / 2) * gaugeLineHeight;\\n}\\n\\n// Draw Actor Equipment\\nthis.resetFontSettings();\\nsx = rect.x + Math.floor(rect.width / 2);\\nsy = ny + lineHeight;\\nsw = rect.width / 2;\\nfor (const equip of equips) {\\n    if (equip) {\\n        this.drawItemName(equip, sx, sy, sw);\\n        sy += lineHeight;\\n        if (sy + lineHeight > rect.y + rect.height) return;\\n    }\\n}\"","ThinStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Draw Actor Graphic\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Status Stuff\\nconst lineHeight = this.lineHeight();\\nlet sx = rect.x + 160;\\nlet sy = rect.y + ((rect.height - lineHeight) / 2) - 2;\\n\\n// Draw Actor Data\\nthis.drawActorName(actor, sx, sy);\\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\\n\\n// Place Gauges\\nsx += 180;\\nsy += (lineHeight - this.gaugeLineHeight()) / 2;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsx += 140;\\nif ((sx + 128) > rect.x + rect.width) return;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nsx += 140;\\nif ((sx + 128) > rect.x + rect.width) return;\\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \\\"tp\\\", sx, sy);\"","ThickerStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Draw Actor Graphic\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Status Stuff\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nlet sx = rect.x + 160;\\nlet sy = rect.y + ((rect.height - (lineHeight * 2)) / 2) - 2;\\n\\n// Draw Actor Data\\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\\nthis.drawActorName(actor, sx, sy);\\nthis.drawActorClass(actor, sx, sy + lineHeight);\\n//this.drawActorLevel(actor, sx, sy + lineHeight);\\n\\n// Place Gauges\\nsx += 180;\\nsy = rect.y + ((rect.height - (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2))) / 2) - 2;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy + gaugeLineHeight);\\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \\\"tp\\\", sx, sy + (gaugeLineHeight * 2));\\nsx += 160;\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nconst sx3 = sx;\\nconst sw = rect.width - sx3 - 2;\\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    const pw = Math.floor(sw / 2) - 24;\\n    sy = rect.y + ((rect.height - (gaugeLineHeight * Math.ceil(params.length / 2))) / 2) - 2;\\n    let px = sx3;\\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, py, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx3;\\n            py += gaugeLineHeight;\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n}\""}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param Icon:num
 * @text Icon
 * @desc Icon used for this command.
 * Use 0 for no icon.
 * @default 0
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this menu command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default "const ext = arguments[0];"
 *
 * @param PersonalHandlerJS:func
 * @text JS: Personal Code
 * @type note
 * @desc JavaScript code that runs once the actor list is selected with this command highlighted.
 * @default "const ext = arguments[0];"
 *
 */
/* ----------------------------------------------------------------------------
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param ThinGoldWindow:eval
 * @text Thinner Gold Window
 * @parent GoldWindow
 * @type boolean
 * @on Thinner
 * @off Normal
 * @desc Make the Gold Window thinner in the Main Menu?
 * Used to match the Playtime and Variable Windows.
 * @default true
 *
 * @param AutoGoldHeight:eval
 * @text Auto Adjust Height
 * @parent GoldWindow
 * @type boolean
 * @on Automatic
 * @off Manual
 * @desc Automatically adjust the height for the thinner Gold Window?
 * @default true
 *
 * @param AutoGoldY:eval
 * @text Auto Adjust Y
 * @parent GoldWindow
 * @type boolean
 * @on Automatic
 * @off Manual
 * @desc Automatically adjust the Y position for the thinner Gold Window?
 * @default true
 *
 * @param SoloParty
 * @text Solo Party
 *
 * @param SoloQuick:eval
 * @text Solo Quick Mode
 * @parent SoloParty
 * @type boolean
 * @on Quick
 * @off Normal
 * @desc When selecting "Skills", "Equip", or "Status" with one party member, immediately go to the scene.
 * @default true
 *
 * @param SubMenus
 * @text Sub Menus
 *
 * @param ActorBgMenus:arraystr
 * @text Menus with Actor BG's
 * @parent SubMenus
 * @type string[]
 * @desc A list of the menus that would be compatible with Actor Menu Backgrounds.
 * @default ["Scene_Skill","Scene_Equip","Scene_Status"]
 *
 * @param ActorBgMenuJS:func
 * @text JS: Actor BG Action
 * @parent SubMenus
 * @type note
 * @desc Code used to determine how to display the sprites upon loading.
 * @default "this.anchor.x = 0.5;\nconst scale = 1.25;\nthis.scale.x = this.scale.y = scale;\nthis.x = Graphics.width;\nthis.y = Graphics.height - (this.bitmap.height * Math.abs(scale));\nthis._targetX = Graphics.width * 3 / 4;\nthis._targetY = Graphics.height - (this.bitmap.height * Math.abs(scale));\nthis._duration = 10;\nthis.opacity = 0;"
 *
 * @param PartyWindow
 * @text Party Window
 *
 * @param ShowReserve:eval
 * @text Show Reserve Memebers
 * @parent PartyWindow
 * @type boolean
 * @on Show Reserve Members
 * @off Hide Reserve Members
 * @desc Show reserve members while on the Main Menu scene?
 * @default true
 *
 * @param HideMainMenuOnly:eval
 * @text Hide Main Menu Only
 * @parent ShowReserve:eval
 * @type boolean
 * @on Hide in Main Menu Only
 * @off Hide in all Scenes
 * @desc If reserve members are hidden, hide them only in the main menu or all scenes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Playtime Window
 * ----------------------------------------------------------------------------
 */
/*~struct~Playtime:
 *
 * @param Enable:eval
 * @text Use Window
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc Use the Playtime Window?
 * @default true
 *
 * @param AdjustCommandHeight:func
 * @text Adjust Command Window
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Adjust the command window's height to fit in the Playtime Window?
 * @default true
 *
 * @param BgType:num
 * @text Background Type
 * @type select
 * @option Window
 * @value 0
 * @option Dim
 * @value 1
 * @option Transparent
 * @value 2
 * @desc Select background type for the Playtime window.
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside the Playtime window.
 * Default: 26
 * @default 20
 *
 * @param Icon:num
 * @text Time Icon
 * @desc Icon displayed for the 'Time' label.
 * @default 75
 *
 * @param Time:str
 * @text Time Text
 * @desc Text for the display of 'Time' in the Playtime window.
 * @default Time
 *
 * @param WindowRect:func
 * @text JS: X, Y, W, H
 * @type note
 * @desc Code used to determine the dimensions for the Playtime window.
 * @default "const rows = 1;\nconst ww = this.mainCommandWidth();\nconst wh = this.calcWindowHeight(rows, false);\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\nlet wy = this.mainAreaBottom() - wh;\nif (this._goldWindow) wy -= this._goldWindow.height;\nif (this.canCreateVariableWindow()) wy -= this.variableWindowRect().height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
/* ----------------------------------------------------------------------------
 * Variable Window
 * ----------------------------------------------------------------------------
 */
/*~struct~Variable:
 *
 * @param Enable:eval
 * @text Use Window
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc Use the Variable Window?
 * @default false
 *
 * @param AdjustCommandHeight:func
 * @text Adjust Command Window
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Adjust the command window's height to fit in the Variable Window?
 * @default true
 *
 * @param BgType:num
 * @text Background Type
 * @type select
 * @option Window
 * @value 0
 * @option Dim
 * @value 1
 * @option Transparent
 * @value 2
 * @desc Select background type for the Variable window.
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside the Variable window.
 * Default: 26
 * @default 20
 *
 * @param VarList:arraynum
 * @text Variable List
 * @type variable[]
 * @desc Select variables to be displayed into the window.
 * Use \i[x] to determine their icon.
 * @default ["1","2","3"]
 *
 * @param WindowRect:func
 * @text JS: X, Y, W, H
 * @type note
 * @desc Code used to determine the dimensions for the Variable window.
 * @default "const rows = VisuMZ.MainMenuCore.Settings.Variable.VarList.length;\nconst ww = this.mainCommandWidth();\nconst wh = this.calcWindowHeight(rows, false);\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\nlet wy = this.mainAreaBottom() - wh;\nif (this._goldWindow) wy -= this._goldWindow.height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
/* ----------------------------------------------------------------------------
 * Horizontal Command Window Style
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomCmdWin:
 *
 * @param Style:str
 * @text Command Style
 * @parent MainList
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw command entries in the Command Window?
 * @default auto
 *
 * @param TextAlign:str
 * @text Text Alignment
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Decide how you want the text to be aligned.
 * @default center
 *
 * @param Rows:num
 * @text Rows
 * @type number
 * @min 1
 * @desc Number of visible rows.
 * @default 2
 *
 * @param Cols:num
 * @text Columns
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 4
 *
 * @param MobileThickness:num
 * @text Mobile Thickness
 * @type number
 * @min 1
 * @desc The thickness of the buttons for mobile version.
 * @default 5
 *
 */
/* ----------------------------------------------------------------------------
 * List Style Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ListStyles:
 *
 * @param DefaultStyle:func
 * @text JS: Default
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Draw Actor Graphic\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst sx = rect.x + 180;\nconst sy = rect.y + rect.height / 2 - this.lineHeight() * 1.5;\nconst lineHeight = this.lineHeight();\nconst sx2 = sx + 180;\nthis.drawActorName(actor, sx, sy);\nthis.drawActorLevel(actor, sx, sy + lineHeight * 1);\nthis.drawActorIcons(actor, sx, sy + lineHeight * 2);\nthis.drawActorClass(actor, sx2, sy);\n\n// Place Gauges\nconst sy2 = sy + lineHeight;\nconst gaugeLineHeight = this.gaugeLineHeight();\nthis.placeGauge(actor, \"hp\", sx2, sy2);\nthis.placeGauge(actor, \"mp\", sx2, sy2 + gaugeLineHeight);\nconst roomForTp = (sy2 + gaugeLineHeight * 3) <= rect.y + rect.height;\nif ($dataSystem.optDisplayTp && roomForTp) {\n    this.placeGauge(actor, \"tp\", sx2, sy2 + gaugeLineHeight * 2);\n}\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nconst sx3 = sx2 + 180;\nconst sw = rect.width - sx3 - 2;\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    const pw = Math.floor(sw / 2) - 24;\n    let px = sx3;\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, py, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            py += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n}"
 *
 * @param VerticalStyle:func
 * @text JS: Vertical
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\n\n// Draw Actor Graphic\nconst gw = rect.width;\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nconst gx = rect.x;\nconst gy = Math.max(rect.y, rect.y + (rect.height - totalHeight - gh) / 2);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Actor Name\nlet sx = rect.x;\nlet sy = Math.max(gy + gh, rect.y + (rect.height - totalHeight + gh) / 2);\nlet sw = rect.width;\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round((rect.width - 144) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Draw Gauges\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsy += gaugeLineHeight;\nif ($dataSystem.optDisplayTp) {\n    this.placeGauge(actor, \"tp\", sx, sy);\n}"
 *
 * @param PortraitStyle:func
 * @text JS: Portrait
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Make Constants\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\n\n// Draw Actor Graphic\nconst gw = rect.width;\nconst gh = rect.height;\nconst gx = rect.x;\nconst gy = rect.y;\nthis.drawItemActorMenuImage(actor, gx, gy, gw, gh);\n\n// Draw Dark Rectangle\nlet sx = rect.x;\nlet sy = Math.max(rect.y, rect.y + (rect.height - totalHeight));\nlet sw = rect.width;\nlet sh = rect.y + rect.height - sy;\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\n\n// Draw Actor Name\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round((rect.width - 144) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Draw Gauges\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsy += gaugeLineHeight;\nif ($dataSystem.optDisplayTp) {\n    this.placeGauge(actor, \"tp\", sx, sy);\n}"
 *
 * @param SoloStyle:func
 * @text JS: Solo
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Make Constants\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\n\n// Draw Actor Graphic\nlet sx = rect.x;\nlet sy = rect.y;\nlet sw = rect.width;\nlet sh = rect.height;\n\n// Portrait\nif (actor.getMenuImage() !== '') {\n    this.drawItemActorMenuImage(actor, rect.x, rect.y, rect.width, rect.height);\n\n// Everything Else\n} else {\n    const gx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - ImageManager.faceWidth) / 2));\n    const gy = Math.max(0, rect.y + rect.height - Math.ceil(lineHeight * 4.5) - ImageManager.faceHeight);\n    this.drawActorGraphic(actor, gx, gy, ImageManager.faceWidth, ImageManager.faceHeight);\n}\n\n// Draw Dark Rectangle\nsh = Math.ceil(lineHeight * 4.5);\nsy = rect.y + rect.height - sh;\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\n\n// Draw Actor Name\nsw = Math.round(rect.width / 2);\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - 128) / 2));\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round(((rect.width / 2) - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round(((rect.width / 2) - 144) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Prepare Stat Coordinates\nsx = rect.x + Math.floor(rect.width / 2);\nsw = rect.width / 2;\nsh = rect.height;\nconst sx3 = sx;\nconst cw = rect.width - sx3 - 2;\n\n// Prepare Total Content Height to vertically center the content.\nlet totalHeight = gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    totalHeight += lineHeight;\n    totalHeight += Math.ceil(params.length / 2) * gaugeLineHeight;\n}\nconst equips = actor.equips();\ntotalHeight += lineHeight;\ntotalHeight += equips.length * lineHeight;\nsy = Math.max(rect.y, rect.y + Math.floor((rect.height - totalHeight) / 2));\n\n// Place Gauges\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nif ($dataSystem.optDisplayTp) {\n    sy += gaugeLineHeight;\n    this.placeGauge(actor, \"tp\", sx, sy);\n    sy += gaugeLineHeight;\n}\nlet ny = sy;\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    sy += lineHeight;\n    const pw = Math.floor(cw / 2) - 24;\n    let px = sx3;\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, sy, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, sy, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            sy += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n    ny += lineHeight;\n    ny += Math.ceil(params.length / 2) * gaugeLineHeight;\n}\n\n// Draw Actor Equipment\nthis.resetFontSettings();\nsx = rect.x + Math.floor(rect.width / 2);\nsy = ny + lineHeight;\nsw = rect.width / 2;\nfor (const equip of equips) {\n    if (equip) {\n        this.drawItemName(equip, sx, sy, sw);\n        sy += lineHeight;\n        if (sy + lineHeight > rect.y + rect.height) return;\n    }\n}"
 *
 * @param ThinStyle:func
 * @text JS: Thin
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Draw Actor Graphic\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst lineHeight = this.lineHeight();\nlet sx = rect.x + 160;\nlet sy = rect.y + ((rect.height - lineHeight) / 2) - 2;\n\n// Draw Actor Data\nthis.drawActorName(actor, sx, sy);\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\n\n// Place Gauges\nsx += 180;\nsy += (lineHeight - this.gaugeLineHeight()) / 2;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsx += 140;\nif ((sx + 128) > rect.x + rect.width) return;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsx += 140;\nif ((sx + 128) > rect.x + rect.width) return;\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \"tp\", sx, sy);"
 *
 * @param ThickerStyle:func
 * @text JS: Thicker
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Draw Actor Graphic\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nlet sx = rect.x + 160;\nlet sy = rect.y + ((rect.height - (lineHeight * 2)) / 2) - 2;\n\n// Draw Actor Data\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\nthis.drawActorName(actor, sx, sy);\nthis.drawActorClass(actor, sx, sy + lineHeight);\n//this.drawActorLevel(actor, sx, sy + lineHeight);\n\n// Place Gauges\nsx += 180;\nsy = rect.y + ((rect.height - (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2))) / 2) - 2;\nthis.placeGauge(actor, \"hp\", sx, sy);\nthis.placeGauge(actor, \"mp\", sx, sy + gaugeLineHeight);\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \"tp\", sx, sy + (gaugeLineHeight * 2));\nsx += 160;\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nconst sx3 = sx;\nconst sw = rect.width - sx3 - 2;\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    const pw = Math.floor(sw / 2) - 24;\n    sy = rect.y + ((rect.height - (gaugeLineHeight * Math.ceil(params.length / 2))) / 2) - 2;\n    let px = sx3;\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, py, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            py += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n}"
 *
 */
//=============================================================================

const _0x5bb1=['Style','updateTimer','save','resetFontSettings','drawItemStatusDefaultStyle','setTargetActor','_duration','Window_MenuStatus_maxItems','CfNIE','_list','LGgaR','commandWindowRectTopStyle','_dummyWindow','drawItemActorSvBattler','updateDuration','concat','drawItemActorFace','iconText','Scene_Menu_goldWindowRect','CommandList','updateCommandNameWindow','value','CommandWindowStyle','width','Scene_Menu_onPersonalCancel','SoloQuick','ConvertParams','setBackgroundType','_data','isCommandEnabled','playtimeWindowRectTopStyle','ARRAYSTRUCT','commandWindowRect','description','setMenuImage','_actorMenuBgSprite','_actor','loadSvActor','createBackground','itemLineRect','mobile','pUZBS','height','woTHq','filter','NAuQs','_timer','updateOpacity','Playtime','CallHandlerJS','addChild','exit','Window_MenuStatus_drawItemImage','ThickerStyle','Symbol','refresh','battlerName','drawAllItems','ARRAYSTR','Variable','EnableJS','index','applyThinnerGoldWindowRect','center','Step1','StatusGraphic','drawItemStatusPortraitStyle','commandWindowRectBottomStyle','shtcJ','addSymbolBridge','drawItemStatusThinStyle','ceil','UKBet','fOXTc','replace','thinBottom','thinGoldWindow','FnfNU','fontSize','Time','qqvYD','DefaultStyle','ChangeActorMenuImageGroup','Enable','needsDummyWindow','drawItemStatusVerticalStyle','format','playtimeWindowRectBottomStyle','_variableWindow','playtimeWindowRect','ExtJS','addOriginalCommands','ShowReserve','onPersonalCancel','EIKZx','parameters','thin','note','trim','qsQdk','default','variableWindowRectBottomStyle','createActorMenuBackgroundImageSprite','constructor','svActorHorzCells','commandStyle','gxhUP','update','drawActorFace','goldWindowRectTopStyle','addSaveCommand','numVisibleRows','Scene_Menu_commandFormation','drawItemStatusSoloStyle','drawItemActorSprite','bmSQk','normalColor','ShowJS','openness','Game_Actor_setup','adjustDefaultCommandWindowRect','adjustStatusWindowMobile','maxBattleMembers','drawItemStyleIconText','draTE','calcWindowHeight','makeMainMenuCoreCommandList','iconWidth','adjustCommandHeightByVariable','svbattler','NUM','createGoldWindow','DVAsd','actor','callUpdateHelp','variables','variableWindowRectTopStyle','drawTimeIcon','Scene_Menu_onFormationCancel','ayLaV','iHoBT','addCommand','loadOtherActorImages','initMenuImage','faceHeight','createStatusWindow','mainAreaBottom','FKzbJ','graphicType','isBigCharacter','InnerMenuListStyle','commandNameWindowDrawBackground','drawItemStatusPortraitStyleOnLoad','opacity','ActorBgMenus','mainAreaHeight','commandWindowRectThinBottomStyle','adjustCommandHeightByPlaytime','_statusWindow','jZyKX','innerWidth','Window_StatusBase_loadFaceImages','AdjustCommandHeight','mainCommandWidth','addLoadListener','boxHeight','auto','_commandWindow','icon','changePaintOpacity','ActorBgMenuJS','Scene_Menu_commandWindowRect','max','addMainCommands','drawItemStatusThickerStyle','BgType','push','AutoGoldY','call','itemRect','getMenuImage','mgxNv','setup','VerticalStyle','name','drawPendingItemBackground','Window_MenuStatus_itemHeight','ThinStyle','maxCols','commandNameWindowCenter','createPlaytimeWindow','EHLMT','drawTimeLabel','updatePosition','drawTextEx','FUNC','commandNameWindowDrawText','ChangeActorMenuImageJS','VarList','_menuImage','commandWindowStyle','FontSize','reserveCommonEvent','addWindow','addFormationCommand','_playtimeWindow','activate','length','drawItemImage','PortraitStyle','Scene_Menu_statusWindowRect','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','mainAreaTop','statusWindowRectMobileStyle','commandCommonEvent','showOnlyBattleMembers','currentSymbol','_goldWindow','onBitmapLoad','isSoloQuickMode','cehyg','ThinGoldWindow','solo','popScene','Scene_Menu_commandPersonal','prototype','variableWindowRect','_commandNameWindow','map','createCommandNameWindow','Step2','_scene','bind','vXwAu','loadBitmap','Step1End','gameEnd','colSpacing','initialize','\x5cI[%1]%2','statusWindowRectTopStyle','setHandler','drawItem','drawItemBackground','JSON','thicker','goldWindowRectBottomStyle','canCreateVariableWindow','return\x200','commandStyleCheck','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','itemTextAlign','faceWidth','floor','goldWindowRect','statusWindowRectBottomStyle','top','playtimeText','battleMembers','fittingHeight','create','AutoGoldHeight','Settings','match','drawActorGraphic','portrait','HideMainMenuOnly','CustomCmdWin','none','PersonalHandlerJS','drawItemActorMenuImage','left','drawItemStyleIcon','listStyle','drawText','Scene_MenuBase_createBackground','Rows','WindowRect','svActorVertCells','StatusListStyle','MainMenuCore','min','MobileThickness','_playtimeText','canCreatePlaytimeWindow','Cols','updateActor','ListStyles','ARRAYJSON','text','thinTop','_commandList','ARRAYNUM','isDisplayActorMenuBackgroundImage','parse','isArray','Scene_Menu_createStatusWindow','registerCommand','Icon','isExpGaugeDrawn','iconHeight','isBattleMember','EMEKL','contents','ARRAYFUNC','toUpperCase','close','lineHeight','sprite','loadFaceImages','iomwr','bitmap','vertical','xpgyc','_bitmapReady','currentExt','wJOgx','createDummyWindow','drawItemStatusSoloStyleOnLoad','open','changeTextColor','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','createVariableWindow','topIndex','ARRAYEVAL','onFormationCancel','GzRCW','maxVisibleItems','statusWindowRect','maxItems','onPersonalOk','loadCharacter','General','DEWLU','systemColor','jatFB','blt','nYbee','characterName','boxWidth','clear','round','characterIndex','drawIcon','commandWindowRectThinTopStyle','itemHeight','includes','Window_MenuCommand_initialize','makeCommandList','Scene_Menu_create','commandWindowRectMobileStyle','setActor','drawItemStatus','textSizeEx','XVYsV','options','addOptionsCommand','status','addGameEndCommand','commandPersonal','bottom','formation','commandName','TextAlign','right','_targetY','Step1Start','Scene_MenuBase_updateActor','GzLMR','shift','loadPicture','elMqO','members'];(function(_0xf7e6b6,_0x5bb15f){const _0x2260b1=function(_0x17eb5c){while(--_0x17eb5c){_0xf7e6b6['push'](_0xf7e6b6['shift']());}};_0x2260b1(++_0x5bb15f);}(_0x5bb1,0xa5));const _0x2260=function(_0xf7e6b6,_0x5bb15f){_0xf7e6b6=_0xf7e6b6-0x0;let _0x2260b1=_0x5bb1[_0xf7e6b6];return _0x2260b1;};var label=_0x2260('0x73'),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x2260('0xfc')](function(_0x5bb7e6){return _0x5bb7e6[_0x2260('0xc0')]&&_0x5bb7e6[_0x2260('0xf1')][_0x2260('0xb5')]('['+label+']');})[0x0];VisuMZ[label][_0x2260('0x61')]=VisuMZ[label][_0x2260('0x61')]||{},VisuMZ[_0x2260('0xea')]=function(_0x3a2d6d,_0x166b7f){for(const _0x631349 in _0x166b7f){if(_0x631349[_0x2260('0x62')](/(.*):(.*)/i)){if('dHBNQ'==='dHBNQ'){const _0x5a1b84=String(RegExp['$1']),_0x46bb19=String(RegExp['$2'])[_0x2260('0x8c')]()[_0x2260('0x132')]();let _0x2cefb0,_0x41cde1,_0x9b8d06;switch(_0x46bb19){case _0x2260('0x152'):_0x2cefb0=_0x166b7f[_0x631349]!==''?Number(_0x166b7f[_0x631349]):0x0;break;case _0x2260('0x7f'):_0x41cde1=_0x166b7f[_0x631349]!==''?JSON[_0x2260('0x81')](_0x166b7f[_0x631349]):[],_0x2cefb0=_0x41cde1[_0x2260('0x3f')](_0x1158f0=>Number(_0x1158f0));break;case'EVAL':_0x2cefb0=_0x166b7f[_0x631349]!==''?eval(_0x166b7f[_0x631349]):null;break;case _0x2260('0x9f'):_0x41cde1=_0x166b7f[_0x631349]!==''?JSON['parse'](_0x166b7f[_0x631349]):[],_0x2cefb0=_0x41cde1[_0x2260('0x3f')](_0x46196e=>eval(_0x46196e));break;case _0x2260('0x4f'):_0x2cefb0=_0x166b7f[_0x631349]!==''?JSON[_0x2260('0x81')](_0x166b7f[_0x631349]):'';break;case _0x2260('0x7b'):_0x41cde1=_0x166b7f[_0x631349]!==''?JSON['parse'](_0x166b7f[_0x631349]):[],_0x2cefb0=_0x41cde1[_0x2260('0x3f')](_0x213d92=>JSON[_0x2260('0x81')](_0x213d92));break;case _0x2260('0x1e'):_0x2cefb0=_0x166b7f[_0x631349]!==''?new Function(JSON[_0x2260('0x81')](_0x166b7f[_0x631349])):new Function(_0x2260('0x53'));break;case _0x2260('0x8b'):_0x41cde1=_0x166b7f[_0x631349]!==''?JSON[_0x2260('0x81')](_0x166b7f[_0x631349]):[],_0x2cefb0=_0x41cde1['map'](_0x36b5e8=>new Function(JSON[_0x2260('0x81')](_0x36b5e8)));break;case'STR':_0x2cefb0=_0x166b7f[_0x631349]!==''?String(_0x166b7f[_0x631349]):'';break;case _0x2260('0x10a'):_0x41cde1=_0x166b7f[_0x631349]!==''?JSON[_0x2260('0x81')](_0x166b7f[_0x631349]):[],_0x2cefb0=_0x41cde1[_0x2260('0x3f')](_0x5323e4=>String(_0x5323e4));break;case'STRUCT':_0x9b8d06=_0x166b7f[_0x631349]!==''?JSON[_0x2260('0x81')](_0x166b7f[_0x631349]):{},_0x3a2d6d[_0x5a1b84]={},VisuMZ[_0x2260('0xea')](_0x3a2d6d[_0x5a1b84],_0x9b8d06);continue;case _0x2260('0xef'):_0x41cde1=_0x166b7f[_0x631349]!==''?JSON['parse'](_0x166b7f[_0x631349]):[],_0x2cefb0=_0x41cde1[_0x2260('0x3f')](_0x359316=>VisuMZ[_0x2260('0xea')]({},JSON[_0x2260('0x81')](_0x359316)));break;default:continue;}_0x3a2d6d[_0x5a1b84]=_0x2cefb0;}else{function _0x155622(){return _0x2260('0x7c');}}}}return _0x3a2d6d;},(_0x3c3c5d=>{const _0x4a3faf=_0x3c3c5d[_0x2260('0x13')];for(const _0x5e0f9a of dependencies){if(!Imported[_0x5e0f9a]){alert(_0x2260('0x55')[_0x2260('0x126')](_0x4a3faf,_0x5e0f9a)),SceneManager[_0x2260('0x103')]();break;}}const _0x340c65=_0x3c3c5d[_0x2260('0xf1')];if(_0x340c65[_0x2260('0x62')](/\[Version[ ](.*?)\]/i)){const _0x1e8267=Number(RegExp['$1']);_0x1e8267!==VisuMZ[label]['version']&&(alert(_0x2260('0x2e')[_0x2260('0x126')](_0x4a3faf,_0x1e8267)),SceneManager['exit']());}if(_0x340c65[_0x2260('0x62')](/\[Tier[ ](\d+)\]/i)){if('LGgaR'===_0x2260('0xda')){const _0x57589d=Number(RegExp['$1']);if(_0x57589d<tier){if(_0x2260('0x89')!==_0x2260('0x89')){function _0xf33070(){const _0x42dff0=_0x5363d3[_0x2260('0xae')]-this[_0x2260('0x34')][_0x2260('0xe7')]-(this['_playtimeWindow']?this[_0x2260('0x28')][_0x2260('0xe7')]:0x0),_0x31d459=this[_0x2260('0x14d')](0x1,![]),_0x4a09c1=this[_0x2260('0x34')]['x']-_0x42dff0,_0x4cffae=this[_0x2260('0x2f')]();return new _0x2950dc(_0x4a09c1,_0x4cffae,_0x42dff0,_0x31d459);}}else alert(_0x2260('0x9c')[_0x2260('0x126')](_0x4a3faf,_0x57589d,tier)),SceneManager[_0x2260('0x103')]();}else{if('viQDv'===_0x2260('0xfd')){function _0x3a46f9(){_0x30ac44[_0x2260('0x73')][_0x2260('0x15a')]['call'](this);if(this[_0x2260('0x23')]()===_0x2260('0xf8'))this[_0x2260('0x16e')][_0x2260('0x8d')]();}}else tier=Math[_0x2260('0x7')](_0x57589d,tier);}}else{function _0x1a5d13(){const _0x16533e=this[_0x2260('0x173')](),_0x48ee12=this[_0x2260('0x14d')](0x1,![]),_0x54fedd=0x0,_0x5218e9=this['mainAreaTop']();return new _0x34d86f(_0x54fedd,_0x5218e9,_0x16533e,_0x48ee12);}}}VisuMZ[_0x2260('0xea')](VisuMZ[label][_0x2260('0x61')],_0x3c3c5d[_0x2260('0x12f')]);})(pluginData),PluginManager['registerCommand'](pluginData[_0x2260('0x13')],_0x2260('0x122'),_0x5e561c=>{VisuMZ['ConvertParams'](_0x5e561c,_0x5e561c);const _0x5298d2=_0x5e561c[_0x2260('0x110')],_0x4928a9=_0x5e561c[_0x2260('0x41')];for(let _0x3bb7cf of _0x5298d2){if(_0x2260('0xf9')!==_0x2260('0xf9')){function _0x26f642(){this[_0x2260('0x4')](_0x1e6f29[_0x2260('0x88')]());}}else{_0x3bb7cf=parseInt(_0x3bb7cf)||0x0;if(_0x3bb7cf<=0x0)continue;const _0x20ae21=$gameActors[_0x2260('0x155')](_0x3bb7cf);if(!_0x20ae21)continue;_0x20ae21[_0x2260('0xf2')](_0x4928a9);}}}),PluginManager[_0x2260('0x84')](pluginData[_0x2260('0x13')],'ChangeActorMenuImageRange',_0xe3810=>{VisuMZ[_0x2260('0xea')](_0xe3810,_0xe3810);const _0x241710=_0xe3810[_0x2260('0x46')]>=_0xe3810[_0x2260('0xc9')]?_0xe3810[_0x2260('0xc9')]:_0xe3810[_0x2260('0x46')],_0x5518e6=_0xe3810[_0x2260('0x46')]>=_0xe3810[_0x2260('0xc9')]?_0xe3810['Step1End']:_0xe3810[_0x2260('0xc9')],_0x37f0d8=Array(_0x5518e6-_0x241710+0x1)['fill']()['map']((_0x6bc581,_0x582bda)=>_0x241710+_0x582bda),_0x5df7fb=_0xe3810[_0x2260('0x41')];for(let _0x1a4789 of _0x37f0d8){if('VyGle'!==_0x2260('0x154')){_0x1a4789=parseInt(_0x1a4789)||0x0;if(_0x1a4789<=0x0)continue;const _0x1e5013=$gameActors[_0x2260('0x155')](_0x1a4789);if(!_0x1e5013)continue;_0x1e5013[_0x2260('0xf2')](_0x5df7fb);}else{function _0x15bf67(){const _0x2d93fd=this[_0x2260('0xd6')];this[_0x2260('0x169')]=(this[_0x2260('0x169')]*(_0x2d93fd-0x1)+0xff)/_0x2d93fd;}}}}),PluginManager[_0x2260('0x84')](pluginData[_0x2260('0x13')],_0x2260('0x20'),_0x4194d7=>{VisuMZ[_0x2260('0xea')](_0x4194d7,_0x4194d7);const _0x38f00e=_0x4194d7[_0x2260('0x110')];let _0x59875e=[];while(_0x38f00e[_0x2260('0x2a')]>0x0){if(_0x2260('0x15b')!=='ayLaV'){function _0x10fc2c(){const _0x3b3c04=this[_0x2260('0x2')][_0x2260('0x33')](),_0x17c351=this[_0x2260('0x2')][_0x2260('0x96')]();for(const _0x84bdf1 of _0x399164[_0x2260('0x7e')]){if(_0x84bdf1['Symbol']===_0x3b3c04){_0x84bdf1['PersonalHandlerJS']['call'](this,_0x17c351);return;}}}}else{const _0x168e2b=_0x38f00e[_0x2260('0xcc')]();Array[_0x2260('0x82')](_0x168e2b)?_0x59875e=_0x59875e[_0x2260('0xdf')](_0x168e2b):_0x59875e[_0x2260('0xb')](_0x168e2b);}}const _0x48a835=_0x4194d7[_0x2260('0x41')];for(let _0x21989d of _0x59875e){_0x21989d=parseInt(_0x21989d)||0x0;if(_0x21989d<=0x0)continue;const _0x5ca295=$gameActors[_0x2260('0x155')](_0x21989d);if(!_0x5ca295)continue;_0x5ca295['setMenuImage'](_0x48a835);}}),VisuMZ[_0x2260('0x73')]['Game_Actor_setup']=Game_Actor[_0x2260('0x3c')][_0x2260('0x11')],Game_Actor['prototype'][_0x2260('0x11')]=function(_0x47c25f){VisuMZ[_0x2260('0x73')][_0x2260('0x147')][_0x2260('0xd')](this,_0x47c25f),this['initMenuImage']();},Game_Actor[_0x2260('0x3c')][_0x2260('0x15f')]=function(){this[_0x2260('0x22')]='',this[_0x2260('0x155')]()&&this[_0x2260('0x155')]()[_0x2260('0x131')][_0x2260('0x62')](/<MENU (?:IMAGE|PORTRAIT):[ ](.*)>/i)&&(this[_0x2260('0x22')]=String(RegExp['$1']));},Game_Actor[_0x2260('0x3c')][_0x2260('0xf')]=function(){if(this[_0x2260('0x22')]===undefined)this[_0x2260('0x15f')]();return this[_0x2260('0x22')];},Game_Actor['prototype'][_0x2260('0xf2')]=function(_0x433b15){if(this[_0x2260('0x22')]===undefined)this[_0x2260('0x15f')]();this[_0x2260('0x22')]=_0x433b15;},Scene_MenuBase[_0x2260('0x3c')][_0x2260('0x80')]=function(){return VisuMZ[_0x2260('0x73')]['Settings'][_0x2260('0xa7')][_0x2260('0x16a')]['includes'](this['constructor'][_0x2260('0x13')]);},VisuMZ[_0x2260('0x73')][_0x2260('0x6e')]=Scene_MenuBase[_0x2260('0x3c')][_0x2260('0xf6')],Scene_MenuBase[_0x2260('0x3c')][_0x2260('0xf6')]=function(){VisuMZ[_0x2260('0x73')][_0x2260('0x6e')][_0x2260('0xd')](this),this[_0x2260('0x136')]();},Scene_MenuBase[_0x2260('0x3c')]['createActorMenuBackgroundImageSprite']=function(){this[_0x2260('0xf3')]=new Sprite_MenuBackgroundActor(),this[_0x2260('0x102')](this[_0x2260('0xf3')]);},VisuMZ['MainMenuCore'][_0x2260('0xca')]=Scene_MenuBase[_0x2260('0x3c')][_0x2260('0x79')],Scene_MenuBase[_0x2260('0x3c')][_0x2260('0x79')]=function(){VisuMZ[_0x2260('0x73')][_0x2260('0xca')][_0x2260('0xd')](this);if(this[_0x2260('0x80')]()&&this[_0x2260('0xf3')]){if(_0x2260('0x15c')!=='Uazjb')this[_0x2260('0xf3')][_0x2260('0xba')](this['_actor']);else{function _0x4cdfea(){_0x18611a[_0x2260('0xd5')](_0x52e0df[_0x2260('0xcf')]()[0x0]),this[_0x2260('0xa5')]();}}}},VisuMZ[_0x2260('0x73')][_0x2260('0xb8')]=Scene_Menu[_0x2260('0x3c')][_0x2260('0x5f')],Scene_Menu[_0x2260('0x3c')][_0x2260('0x5f')]=function(){VisuMZ['MainMenuCore'][_0x2260('0xb8')]['call'](this),this[_0x2260('0x19')](),this[_0x2260('0x9d')](),this[_0x2260('0x98')]();},Scene_Menu[_0x2260('0x3c')]['createCommandWindow']=function(){const _0x4ea983=this[_0x2260('0xf0')](),_0x1503ce=new Window_MenuCommand(_0x4ea983);_0x1503ce[_0x2260('0x4c')]('cancel',this[_0x2260('0x3a')][_0x2260('0x43')](this)),this[_0x2260('0x26')](_0x1503ce),this[_0x2260('0x2')]=_0x1503ce;},VisuMZ[_0x2260('0x73')][_0x2260('0x6')]=Scene_Menu[_0x2260('0x3c')]['commandWindowRect'],Scene_Menu['prototype'][_0x2260('0xf0')]=function(){const _0x4ed5e0=this['commandWindowStyle']();if(_0x4ed5e0===_0x2260('0x5b'))return this[_0x2260('0xdb')]();else{if(_0x4ed5e0===_0x2260('0x7d')){if(_0x2260('0xd8')!==_0x2260('0x120'))return this[_0x2260('0xb3')]();else{function _0x510983(){if(this[_0x2260('0x22')]===_0xac6a7f)this['initMenuImage']();this[_0x2260('0x22')]=_0x56940e;}}}else{if(_0x4ed5e0===_0x2260('0xc3'))return this[_0x2260('0x113')]();else{if(_0x4ed5e0==='thinBottom'){if(_0x2260('0x16f')!==_0x2260('0xac'))return this[_0x2260('0x16c')]();else{function _0x7e22ea(){_0x4a1a14['MainMenuCore'][_0x2260('0x61')][_0x2260('0x7a')][_0x2260('0x2c')][_0x2260('0xd')](this,_0x11ea1b,_0x3be9b7);}}}else{if(_0x4ed5e0===_0x2260('0xf8')){if(_0x2260('0x37')!==_0x2260('0x37')){function _0x157b0f(){return _0x34ad51[_0x2260('0x73')]['Settings'][_0x2260('0xe6')];}}else return this[_0x2260('0xb9')]();}else{const _0x13cf5b=VisuMZ[_0x2260('0x73')][_0x2260('0x6')][_0x2260('0xd')](this);return this[_0x2260('0x148')](_0x13cf5b),_0x13cf5b;}}}}}},Scene_Menu[_0x2260('0x3c')][_0x2260('0x148')]=function(_0x708e1){this[_0x2260('0x16d')]()&&(_0x708e1['height']-=this[_0x2260('0x129')]()[_0x2260('0xfa')]),this[_0x2260('0x150')]()&&(_0x708e1[_0x2260('0xfa')]-=this[_0x2260('0x3d')]()['height']);},Scene_Menu[_0x2260('0x3c')][_0x2260('0xdb')]=function(){const _0x31d8f1=VisuMZ['MainMenuCore'][_0x2260('0x61')][_0x2260('0x66')]['Rows'],_0xc569d7=Graphics[_0x2260('0xae')],_0x5c0879=this[_0x2260('0x14d')](_0x31d8f1,!![]),_0x18628a=0x0,_0x34b694=this[_0x2260('0x2f')]();return new Rectangle(_0x18628a,_0x34b694,_0xc569d7,_0x5c0879);},Scene_Menu[_0x2260('0x3c')][_0x2260('0xb3')]=function(){const _0x957c3b=VisuMZ[_0x2260('0x73')][_0x2260('0x61')][_0x2260('0x66')][_0x2260('0x6f')],_0x2f695a=Graphics[_0x2260('0xae')],_0x461ba5=this[_0x2260('0x14d')](0x1,!![]),_0x188b99=0x0,_0x39e205=this[_0x2260('0x2f')]();return new Rectangle(_0x188b99,_0x39e205,_0x2f695a,_0x461ba5);},Scene_Menu[_0x2260('0x3c')][_0x2260('0x113')]=function(){const _0x285e47=VisuMZ[_0x2260('0x73')][_0x2260('0x61')][_0x2260('0x66')][_0x2260('0x6f')],_0x2834f5=Graphics[_0x2260('0xae')],_0x2813f3=this[_0x2260('0x14d')](_0x285e47,!![]),_0x26ad5c=0x0,_0x376ad0=this[_0x2260('0x162')]()-_0x2813f3;return new Rectangle(_0x26ad5c,_0x376ad0,_0x2834f5,_0x2813f3);},Scene_Menu[_0x2260('0x3c')][_0x2260('0x16c')]=function(){const _0x29ab5e=VisuMZ[_0x2260('0x73')]['Settings']['CustomCmdWin'][_0x2260('0x6f')],_0xcf39c0=Graphics[_0x2260('0xae')],_0x463e2b=this[_0x2260('0x14d')](0x1,!![]),_0x3edbf0=0x0,_0x29dd3d=this[_0x2260('0x162')]()-_0x463e2b;return new Rectangle(_0x3edbf0,_0x29dd3d,_0xcf39c0,_0x463e2b);},Scene_Menu[_0x2260('0x3c')]['commandWindowRectMobileStyle']=function(){const _0x308597=VisuMZ['MainMenuCore'][_0x2260('0x61')][_0x2260('0x66')][_0x2260('0x6f')],_0x35f029=Graphics[_0x2260('0xae')],_0x1d2652=Window_MenuCommand[_0x2260('0x3c')][_0x2260('0x5e')](_0x308597),_0x2ea555=0x0,_0x451944=Math['round']((Graphics['boxHeight']-_0x1d2652)/0x2);return new Rectangle(_0x2ea555,_0x451944,_0x35f029,_0x1d2652);},Scene_Menu[_0x2260('0x3c')]['commandWindowStyle']=function(){return VisuMZ[_0x2260('0x73')][_0x2260('0x61')][_0x2260('0xe6')];},Scene_Menu[_0x2260('0x3c')][_0x2260('0x11c')]=function(){if(this[_0x2260('0x23')]()!==_0x2260('0x134'))return!![];return VisuMZ[_0x2260('0x73')]['Settings'][_0x2260('0xa7')][_0x2260('0x38')];},Scene_Menu[_0x2260('0x3c')][_0x2260('0x153')]=function(){const _0x566a24=this['goldWindowRect']();this[_0x2260('0x34')]=this[_0x2260('0x11c')]()?new Window_ThinGold(_0x566a24):new Window_Gold(_0x566a24),this[_0x2260('0x26')](this[_0x2260('0x34')]);},VisuMZ[_0x2260('0x73')][_0x2260('0xe2')]=Scene_Menu[_0x2260('0x3c')][_0x2260('0x59')],Scene_Menu[_0x2260('0x3c')][_0x2260('0x59')]=function(){const _0x356a8c=this[_0x2260('0x23')]();if([_0x2260('0x5b'),_0x2260('0x7d'),_0x2260('0xf8')]['includes'](_0x356a8c))return this[_0x2260('0x13d')]();else{if([_0x2260('0xc3'),_0x2260('0x11b')][_0x2260('0xb5')](_0x356a8c))return this['goldWindowRectBottomStyle']();else{const _0x2f0c8b=VisuMZ[_0x2260('0x73')][_0x2260('0xe2')][_0x2260('0xd')](this);return this[_0x2260('0x10e')](_0x2f0c8b),_0x2f0c8b;}}},Scene_Menu[_0x2260('0x3c')][_0x2260('0x10e')]=function(_0x376ed7){if(this[_0x2260('0x11c')]()){if(VisuMZ['MainMenuCore'][_0x2260('0x61')][_0x2260('0xa7')][_0x2260('0xc')]){const _0x12a9bb=_0x376ed7[_0x2260('0xfa')]-this[_0x2260('0x14d')](0x1,![]);_0x376ed7['y']+=_0x12a9bb;}VisuMZ[_0x2260('0x73')][_0x2260('0x61')][_0x2260('0xa7')][_0x2260('0x60')]&&(_0x376ed7[_0x2260('0xfa')]=this[_0x2260('0x14d')](0x1,![]));}},Scene_Menu['prototype']['goldWindowRectTopStyle']=function(){const _0x33eb0b=this[_0x2260('0x173')](),_0x3e1af8=this[_0x2260('0x14d')](0x1,![]),_0xf7b90a=Graphics[_0x2260('0xae')]-_0x33eb0b,_0x294909=this[_0x2260('0x162')]()-_0x3e1af8;return new Rectangle(_0xf7b90a,_0x294909,_0x33eb0b,_0x3e1af8);},Scene_Menu['prototype'][_0x2260('0x51')]=function(){const _0x223cfc=this[_0x2260('0x173')](),_0x397c73=this['calcWindowHeight'](0x1,![]),_0x2cdbc9=Graphics['boxWidth']-_0x223cfc,_0x2144e3=this['mainAreaTop']();return new Rectangle(_0x2cdbc9,_0x2144e3,_0x223cfc,_0x397c73);},VisuMZ[_0x2260('0x73')][_0x2260('0x83')]=Scene_Menu[_0x2260('0x3c')][_0x2260('0x161')],Scene_Menu['prototype'][_0x2260('0x161')]=function(){VisuMZ['MainMenuCore'][_0x2260('0x83')][_0x2260('0xd')](this),this[_0x2260('0x149')]();},Scene_Menu[_0x2260('0x3c')]['adjustStatusWindowMobile']=function(){this['commandWindowStyle']()===_0x2260('0xf8')&&(this['_statusWindow'][_0x2260('0x146')]=0x0);},VisuMZ['MainMenuCore'][_0x2260('0x2d')]=Scene_Menu[_0x2260('0x3c')][_0x2260('0xa3')],Scene_Menu[_0x2260('0x3c')][_0x2260('0xa3')]=function(){const _0x770b3d=this[_0x2260('0x23')]();if(['top',_0x2260('0x7d')]['includes'](_0x770b3d))return this[_0x2260('0x4b')]();else{if([_0x2260('0xc3'),_0x2260('0x11b')][_0x2260('0xb5')](_0x770b3d))return this[_0x2260('0x5a')]();else{if(_0x770b3d===_0x2260('0xf8'))return this['statusWindowRectMobileStyle']();else{if(_0x2260('0xfb')!==_0x2260('0x1a'))return VisuMZ[_0x2260('0x73')][_0x2260('0x2d')][_0x2260('0xd')](this);else{function _0x476743(){return this[_0x2260('0x135')]();}}}}}},Scene_Menu[_0x2260('0x3c')]['statusWindowRectTopStyle']=function(){const _0x1f094e=Graphics[_0x2260('0xae')],_0x380bd1=this[_0x2260('0x16b')]()-this[_0x2260('0x2')][_0x2260('0xfa')]-this[_0x2260('0x34')][_0x2260('0xfa')],_0x1e803b=0x0,_0x50bf73=this[_0x2260('0x2')]['y']+this[_0x2260('0x2')]['height'];return new Rectangle(_0x1e803b,_0x50bf73,_0x1f094e,_0x380bd1);},Scene_Menu[_0x2260('0x3c')][_0x2260('0x5a')]=function(){const _0x5036da=Graphics[_0x2260('0xae')],_0x177321=this[_0x2260('0x16b')]()-this[_0x2260('0x2')][_0x2260('0xfa')]-this[_0x2260('0x34')][_0x2260('0xfa')],_0x80fdd1=0x0,_0x4f0418=this[_0x2260('0x34')]['y']+this[_0x2260('0x34')]['height'];return new Rectangle(_0x80fdd1,_0x4f0418,_0x5036da,_0x177321);},Scene_Menu['prototype'][_0x2260('0x30')]=function(){const _0x12662e=Graphics[_0x2260('0xae')],_0x29f8d9=this[_0x2260('0x16b')]()-this[_0x2260('0x34')][_0x2260('0xfa')],_0x3f4a7f=0x0,_0x7e68ad=this['mainAreaBottom']()-this[_0x2260('0x34')][_0x2260('0xfa')]-_0x29f8d9;return new Rectangle(_0x3f4a7f,_0x7e68ad,_0x12662e,_0x29f8d9);},Scene_Menu[_0x2260('0x3c')][_0x2260('0x19')]=function(){if(!this[_0x2260('0x77')]())return new Rectangle(0x0,0x0,0x0,0x0);const _0x500e9b=this[_0x2260('0x129')]();this[_0x2260('0x28')]=new Window_Playtime(_0x500e9b),this[_0x2260('0x28')][_0x2260('0xeb')](VisuMZ['MainMenuCore'][_0x2260('0x61')]['Playtime'][_0x2260('0xa')]),this[_0x2260('0x26')](this['_playtimeWindow']);},Scene_Menu['prototype'][_0x2260('0x77')]=function(){return VisuMZ[_0x2260('0x73')][_0x2260('0x61')][_0x2260('0x100')][_0x2260('0x123')];},Scene_Menu[_0x2260('0x3c')][_0x2260('0x16d')]=function(){return this[_0x2260('0x77')]()&&VisuMZ[_0x2260('0x73')][_0x2260('0x61')][_0x2260('0x100')][_0x2260('0x172')];},Scene_Menu[_0x2260('0x3c')][_0x2260('0x129')]=function(){const _0x9099e7=this[_0x2260('0x23')]();if([_0x2260('0x5b'),_0x2260('0x7d'),_0x2260('0xf8')][_0x2260('0xb5')](_0x9099e7))return this['playtimeWindowRectTopStyle']();else{if([_0x2260('0xc3'),_0x2260('0x11b')][_0x2260('0xb5')](_0x9099e7))return this[_0x2260('0x127')]();else{if(_0x2260('0x118')===_0x2260('0x118'))return VisuMZ[_0x2260('0x73')][_0x2260('0x61')][_0x2260('0x100')][_0x2260('0x70')][_0x2260('0xd')](this);else{function _0x15f5d8(){this[_0x2260('0x1d')](_0x1b7e5e,_0x369baf['x'],_0xf3051a['y'],_0x5b76aa);}}}}},Scene_Menu[_0x2260('0x3c')][_0x2260('0xee')]=function(){const _0x28b173=this[_0x2260('0x173')](),_0x1627d4=this[_0x2260('0x14d')](0x1,![]),_0x512832=0x0,_0x478555=this[_0x2260('0x162')]()-_0x1627d4;return new Rectangle(_0x512832,_0x478555,_0x28b173,_0x1627d4);},Scene_Menu[_0x2260('0x3c')][_0x2260('0x127')]=function(){const _0x3ec626=this[_0x2260('0x173')](),_0x4fbb50=this[_0x2260('0x14d')](0x1,![]),_0x1dbad8=0x0,_0x32725d=this[_0x2260('0x2f')]();return new Rectangle(_0x1dbad8,_0x32725d,_0x3ec626,_0x4fbb50);},Scene_Menu[_0x2260('0x3c')][_0x2260('0x9d')]=function(){if(!this[_0x2260('0x52')]())return new Rectangle(0x0,0x0,0x0,0x0);const _0x2d8c9b=this['variableWindowRect']();this[_0x2260('0x128')]=new Window_MenuVariables(_0x2d8c9b),this[_0x2260('0x128')][_0x2260('0xeb')](VisuMZ[_0x2260('0x73')][_0x2260('0x61')][_0x2260('0x10b')][_0x2260('0xa')]),this['addWindow'](this[_0x2260('0x128')]);},Scene_Menu[_0x2260('0x3c')][_0x2260('0x52')]=function(){return VisuMZ[_0x2260('0x73')]['Settings'][_0x2260('0x10b')][_0x2260('0x123')];},Scene_Menu[_0x2260('0x3c')][_0x2260('0x150')]=function(){return this[_0x2260('0x52')]()&&VisuMZ[_0x2260('0x73')][_0x2260('0x61')][_0x2260('0x10b')][_0x2260('0x172')];},Scene_Menu[_0x2260('0x3c')]['variableWindowRect']=function(){const _0x59a159=this[_0x2260('0x23')]();if([_0x2260('0x5b'),'thinTop','mobile'][_0x2260('0xb5')](_0x59a159)){if(_0x2260('0x13a')!==_0x2260('0x13a')){function _0x5b78ef(){_0x52843a[_0x2260('0x73')][_0x2260('0x61')][_0x2260('0x7a')][_0x2260('0x16')][_0x2260('0xd')](this,_0x53b6f4,_0x187d1e);}}else return this[_0x2260('0x158')]();}else{if([_0x2260('0xc3'),_0x2260('0x11b')][_0x2260('0xb5')](_0x59a159))return this[_0x2260('0x135')]();else{if(_0x2260('0x44')!==_0x2260('0xcb'))return VisuMZ[_0x2260('0x73')][_0x2260('0x61')]['Variable']['WindowRect'][_0x2260('0xd')](this);else{function _0x4bde06(){this[_0x2260('0x2')]['activate']();}}}}},Scene_Menu[_0x2260('0x3c')][_0x2260('0x158')]=function(){const _0x25f895=Graphics[_0x2260('0xae')]-this[_0x2260('0x34')][_0x2260('0xe7')]-(this[_0x2260('0x28')]?this['_playtimeWindow'][_0x2260('0xe7')]:0x0),_0x234f51=this['calcWindowHeight'](0x1,![]),_0x408b01=this['_goldWindow']['x']-_0x25f895,_0x3270f7=this[_0x2260('0x162')]()-_0x234f51;return new Rectangle(_0x408b01,_0x3270f7,_0x25f895,_0x234f51);},Scene_Menu[_0x2260('0x3c')][_0x2260('0x135')]=function(){const _0x279e1a=Graphics[_0x2260('0xae')]-this[_0x2260('0x34')][_0x2260('0xe7')]-(this[_0x2260('0x28')]?this[_0x2260('0x28')]['width']:0x0),_0x4f719b=this[_0x2260('0x14d')](0x1,![]),_0xfc4f11=this[_0x2260('0x34')]['x']-_0x279e1a,_0x176f91=this['mainAreaTop']();return new Rectangle(_0xfc4f11,_0x176f91,_0x279e1a,_0x4f719b);},Scene_Menu[_0x2260('0x3c')][_0x2260('0x98')]=function(){if(!this[_0x2260('0x124')]())return;const _0x6f6974=this[_0x2260('0x3d')]();this[_0x2260('0xdc')]=new Window_Base(_0x6f6974),this[_0x2260('0xdc')][_0x2260('0xeb')](VisuMZ[_0x2260('0x73')][_0x2260('0x61')][_0x2260('0x10b')][_0x2260('0xa')]),this[_0x2260('0x26')](this[_0x2260('0xdc')]);},Scene_Menu[_0x2260('0x3c')][_0x2260('0x124')]=function(){if([_0x2260('0x134'),_0x2260('0xf8')][_0x2260('0xb5')](this[_0x2260('0x23')]()))return![];if(this[_0x2260('0x128')])return![];return!![];},VisuMZ[_0x2260('0x73')][_0x2260('0x3b')]=Scene_Menu[_0x2260('0x3c')][_0x2260('0xc2')],Scene_Menu[_0x2260('0x3c')][_0x2260('0xc2')]=function(){if(this['isSoloQuickMode']()&&this['_statusWindow'])$gameParty[_0x2260('0xd5')]($gameParty[_0x2260('0xcf')]()[0x0]),this[_0x2260('0xa5')]();else{if(_0x2260('0x12e')!==_0x2260('0x12e')){function _0x398a79(){const _0x7fa748=this['topIndex']();for(let _0x2a4302=0x0;_0x2a4302<this[_0x2260('0xa2')]();_0x2a4302++){const _0x3226d3=_0x7fa748+_0x2a4302;_0x3226d3<this[_0x2260('0xa4')]()&&(this[_0x2260('0x4e')](_0x3226d3),this[_0x2260('0x4d')](_0x3226d3));}}}else{if(this[_0x2260('0x23')]()===_0x2260('0xf8'))this[_0x2260('0x16e')][_0x2260('0x9a')]();VisuMZ[_0x2260('0x73')][_0x2260('0x3b')]['call'](this);}}},Scene_Menu[_0x2260('0x3c')][_0x2260('0x36')]=function(){return VisuMZ[_0x2260('0x73')][_0x2260('0x61')][_0x2260('0xa7')][_0x2260('0xe9')]&&$gameParty[_0x2260('0xcf')]()[_0x2260('0x2a')]<=0x1;},Scene_Menu[_0x2260('0x3c')][_0x2260('0xa5')]=function(){const _0x552162=this[_0x2260('0x2')]['currentSymbol'](),_0x509e36=this[_0x2260('0x2')][_0x2260('0x96')]();for(const _0x96f420 of Window_MenuCommand['_commandList']){if(_0x2260('0x163')!=='FKzbJ'){function _0x2ad860(){const _0x1512f5=_0x28b848[_0x2260('0xae')]-this[_0x2260('0x34')][_0x2260('0xe7')]-(this[_0x2260('0x28')]?this[_0x2260('0x28')]['width']:0x0),_0x4ed5df=this['calcWindowHeight'](0x1,![]),_0x32f598=this[_0x2260('0x34')]['x']-_0x1512f5,_0x4cab97=this['mainAreaBottom']()-_0x4ed5df;return new _0x1f43db(_0x32f598,_0x4cab97,_0x1512f5,_0x4ed5df);}}else{if(_0x96f420['Symbol']===_0x552162){_0x96f420[_0x2260('0x68')][_0x2260('0xd')](this,_0x509e36);return;}}}},VisuMZ[_0x2260('0x73')][_0x2260('0xe8')]=Scene_Menu[_0x2260('0x3c')]['onPersonalCancel'],Scene_Menu['prototype'][_0x2260('0x12d')]=function(){VisuMZ[_0x2260('0x73')][_0x2260('0xe8')][_0x2260('0xd')](this);if(this['commandWindowStyle']()===_0x2260('0xf8'))this[_0x2260('0x16e')]['close']();},Scene_Menu[_0x2260('0x3c')][_0x2260('0x31')]=function(){const _0x590bca=parseInt(this[_0x2260('0x2')]['currentExt']());if(_0x590bca)$gameTemp[_0x2260('0x25')](_0x590bca),this['popScene']();else{if(_0x2260('0xa1')===_0x2260('0xa1'))this[_0x2260('0x2')][_0x2260('0x29')]();else{function _0x4917be(){if(!this[_0x2260('0x52')]())return new _0x16ece4(0x0,0x0,0x0,0x0);const _0x43eb88=this[_0x2260('0x3d')]();this[_0x2260('0x128')]=new _0x5c2813(_0x43eb88),this['_variableWindow'][_0x2260('0xeb')](_0x2c4789['MainMenuCore']['Settings'][_0x2260('0x10b')]['BgType']),this[_0x2260('0x26')](this[_0x2260('0x128')]);}}}},VisuMZ[_0x2260('0x73')][_0x2260('0x140')]=Scene_Menu['prototype']['commandFormation'],Scene_Menu[_0x2260('0x3c')]['commandFormation']=function(){VisuMZ[_0x2260('0x73')][_0x2260('0x140')][_0x2260('0xd')](this);if(this[_0x2260('0x23')]()===_0x2260('0xf8'))this[_0x2260('0x16e')][_0x2260('0x9a')]();},VisuMZ[_0x2260('0x73')]['Scene_Menu_onFormationCancel']=Scene_Menu[_0x2260('0x3c')][_0x2260('0xa0')],Scene_Menu[_0x2260('0x3c')]['onFormationCancel']=function(){VisuMZ[_0x2260('0x73')][_0x2260('0x15a')]['call'](this);if(this[_0x2260('0x23')]()===_0x2260('0xf8'))this[_0x2260('0x16e')]['close']();};function Sprite_MenuBackgroundActor(){this[_0x2260('0x49')](...arguments);}Sprite_MenuBackgroundActor[_0x2260('0x3c')]=Object[_0x2260('0x5f')](Sprite[_0x2260('0x3c')]),Sprite_MenuBackgroundActor[_0x2260('0x3c')]['constructor']=Sprite_MenuBackgroundActor,Sprite_MenuBackgroundActor['prototype'][_0x2260('0x49')]=function(){this[_0x2260('0xf4')]=null,this[_0x2260('0x95')]=![],Sprite[_0x2260('0x3c')][_0x2260('0x49')][_0x2260('0xd')](this),this['x']=Graphics[_0x2260('0xe7')];},Sprite_MenuBackgroundActor[_0x2260('0x3c')][_0x2260('0xba')]=function(_0x8b4607){this[_0x2260('0xf4')]!==_0x8b4607&&(this[_0x2260('0xf4')]=_0x8b4607,this['loadBitmap']());},Sprite_MenuBackgroundActor[_0x2260('0x3c')][_0x2260('0x45')]=function(){this[_0x2260('0x95')]=![];if(this[_0x2260('0xf4')]){if('bmSQk'===_0x2260('0x143'))this[_0x2260('0x92')]=ImageManager[_0x2260('0xcd')](this[_0x2260('0xf4')][_0x2260('0xf')]()),this[_0x2260('0x92')][_0x2260('0x174')](this[_0x2260('0x35')]['bind'](this));else{function _0x48c0c4(){const _0x4912de=_0x1c8c00[_0x2260('0xcd')](_0x294dca['getMenuImage']());_0x4912de['addLoadListener'](this[_0x2260('0x168')]['bind'](this,_0x62c246,_0x459963));}}}else{if(_0x2260('0x10')!==_0x2260('0x14c'))this['bitmap']=new Bitmap(0x1,0x1);else{function _0x43342f(){return this[_0x2260('0x32')]()?_0xe2d85f[_0x2260('0x5d')]()[_0x2260('0x2a')]:_0x169d91[_0x2260('0x73')][_0x2260('0xd7')][_0x2260('0xd')](this);}}}},Sprite_MenuBackgroundActor[_0x2260('0x3c')]['onBitmapLoad']=function(){this[_0x2260('0x95')]=!![],VisuMZ[_0x2260('0x73')][_0x2260('0x61')]['General'][_0x2260('0x5')][_0x2260('0xd')](this);},Sprite_MenuBackgroundActor[_0x2260('0x3c')][_0x2260('0x13b')]=function(){Sprite[_0x2260('0x3c')]['update'][_0x2260('0xd')](this),this[_0x2260('0x95')]&&(this[_0x2260('0xff')](),this[_0x2260('0x1c')](),this[_0x2260('0xde')]());},Sprite_MenuBackgroundActor[_0x2260('0x3c')]['updateOpacity']=function(){if(this[_0x2260('0xd6')]>0x0){const _0x6bd375=this[_0x2260('0xd6')];this[_0x2260('0x169')]=(this['opacity']*(_0x6bd375-0x1)+0xff)/_0x6bd375;}},Sprite_MenuBackgroundActor[_0x2260('0x3c')][_0x2260('0x1c')]=function(){if(this['_duration']>0x0){const _0x42c0d7=this[_0x2260('0xd6')];this['x']=(this['x']*(_0x42c0d7-0x1)+this['_targetX'])/_0x42c0d7,this['y']=(this['y']*(_0x42c0d7-0x1)+this[_0x2260('0xc8')])/_0x42c0d7;}},Sprite_MenuBackgroundActor[_0x2260('0x3c')]['updateDuration']=function(){if(this[_0x2260('0xd6')]>0x0)this[_0x2260('0xd6')]--;},ImageManager[_0x2260('0x138')]=ImageManager[_0x2260('0x138')]||0x9,ImageManager[_0x2260('0x71')]=ImageManager[_0x2260('0x71')]||0x6,Window_Base[_0x2260('0x3c')]['drawSvActor']=function(_0x35d085,_0x4fd102,_0x49dcba){const _0xd4db95=ImageManager[_0x2260('0xf5')](_0x35d085),_0x4ec7c9=_0xd4db95[_0x2260('0xe7')]/ImageManager[_0x2260('0x138')],_0x26ab4f=_0xd4db95['height']/ImageManager['svActorVertCells'],_0x1d5fdc=0x0,_0x1544b5=0x0;this[_0x2260('0x8a')][_0x2260('0xab')](_0xd4db95,_0x1d5fdc,_0x1544b5,_0x4ec7c9,_0x26ab4f,_0x4fd102-_0x4ec7c9/0x2,_0x49dcba-_0x26ab4f);},Window_MenuCommand[_0x2260('0x7e')]=VisuMZ[_0x2260('0x73')]['Settings'][_0x2260('0xe3')],VisuMZ['MainMenuCore'][_0x2260('0xb6')]=Window_MenuCommand[_0x2260('0x3c')][_0x2260('0x49')],Window_MenuCommand[_0x2260('0x3c')]['initialize']=function(_0x540c5a){VisuMZ[_0x2260('0x73')][_0x2260('0xb6')][_0x2260('0xd')](this,_0x540c5a),this[_0x2260('0x40')](_0x540c5a);},Window_MenuCommand[_0x2260('0x3c')]['createCommandNameWindow']=function(_0x3c86fe){const _0x2cd196=new Rectangle(0x0,0x0,_0x3c86fe[_0x2260('0xe7')],_0x3c86fe[_0x2260('0xfa')]);this[_0x2260('0x3e')]=new Window_Base(_0x2cd196),this[_0x2260('0x3e')][_0x2260('0x169')]=0x0,this[_0x2260('0x102')](this[_0x2260('0x3e')]),this['updateCommandNameWindow']();},Window_MenuCommand[_0x2260('0x3c')][_0x2260('0x156')]=function(){Window_HorzCommand['prototype']['callUpdateHelp'][_0x2260('0xd')](this);if(this[_0x2260('0x3e')])this[_0x2260('0xe4')]();},Window_MenuCommand[_0x2260('0x3c')][_0x2260('0xe4')]=function(){const _0x5adbf6=this[_0x2260('0x3e')];_0x5adbf6[_0x2260('0x8a')][_0x2260('0xaf')]();const _0x8f1090=this[_0x2260('0x54')](this[_0x2260('0x10d')]());if(_0x8f1090===_0x2260('0x3')){const _0x518b0e=this['itemLineRect'](this[_0x2260('0x10d')]());let _0x2bf436=this[_0x2260('0xc5')](this[_0x2260('0x10d')]());_0x2bf436=_0x2bf436[_0x2260('0x11a')](/\\I\[(\d+)\]/gi,''),_0x5adbf6[_0x2260('0xd3')](),this[_0x2260('0x167')](_0x2bf436,_0x518b0e),this[_0x2260('0x1f')](_0x2bf436,_0x518b0e),this[_0x2260('0x18')](_0x2bf436,_0x518b0e);}},Window_MenuCommand[_0x2260('0x3c')][_0x2260('0x167')]=function(_0x42948f,_0x758915){},Window_MenuCommand[_0x2260('0x3c')][_0x2260('0x1f')]=function(_0x5c20c6,_0x57a7d7){const _0x2bf19c=this['_commandNameWindow'];_0x2bf19c[_0x2260('0x6d')](_0x5c20c6,0x0,_0x57a7d7['y'],_0x2bf19c[_0x2260('0x170')],_0x2260('0x10f'));},Window_MenuCommand[_0x2260('0x3c')]['commandNameWindowCenter']=function(_0x20d3dd,_0x2d05fe){const _0x33e56e=this[_0x2260('0x3e')],_0xd14e4f=$gameSystem['windowPadding'](),_0x35136a=_0x2d05fe['x']+Math[_0x2260('0x58')](_0x2d05fe[_0x2260('0xe7')]/0x2)+_0xd14e4f;_0x33e56e['x']=_0x33e56e[_0x2260('0xe7')]/-0x2+_0x35136a,_0x33e56e['y']=Math[_0x2260('0x58')](_0x2d05fe[_0x2260('0xfa')]/0x4);},Window_MenuCommand[_0x2260('0x3c')]['itemHeight']=function(){const _0x6c3b7d=SceneManager[_0x2260('0x42')][_0x2260('0x23')]();if(_0x6c3b7d===_0x2260('0xf8')){const _0x87bf6c=VisuMZ['MainMenuCore'][_0x2260('0x61')]['CustomCmdWin'][_0x2260('0x75')];return this[_0x2260('0x8e')]()*_0x87bf6c+0x8;}else return Window_Command[_0x2260('0x3c')][_0x2260('0xb4')][_0x2260('0xd')](this);},Window_MenuCommand[_0x2260('0x3c')][_0x2260('0xb7')]=function(){this['makeMainMenuCoreCommandList']();},Window_MenuCommand[_0x2260('0x3c')][_0x2260('0x14e')]=function(){for(const _0x6dc599 of Window_MenuCommand['_commandList']){const _0x343c83=_0x6dc599[_0x2260('0x106')];if(_0x6dc599[_0x2260('0x145')][_0x2260('0xd')](this)){if(_0x2260('0x94')===_0x2260('0x94')){let _0x42c779=_0x6dc599['TextStr'];if(['','Untitled']['includes'](_0x42c779))_0x42c779=_0x6dc599['TextJS'][_0x2260('0xd')](this);const _0x5514e3=_0x6dc599[_0x2260('0x85')];_0x5514e3>0x0&&this[_0x2260('0x139')]()!==_0x2260('0x7c')&&(_0x42c779=_0x2260('0x4a')['format'](_0x5514e3,_0x42c779));const _0x807111=_0x6dc599[_0x2260('0x10c')][_0x2260('0xd')](this),_0x5b0ec8=_0x6dc599[_0x2260('0x12a')]['call'](this);this[_0x2260('0x15d')](_0x42c779,_0x343c83,_0x807111,_0x5b0ec8),this[_0x2260('0x4c')](_0x343c83,_0x6dc599[_0x2260('0x101')][_0x2260('0x43')](this,_0x5b0ec8));}else{function _0x49037f(){return this[_0x2260('0x5a')]();}}}this[_0x2260('0x115')](_0x343c83);}},Window_MenuCommand[_0x2260('0x3c')][_0x2260('0x115')]=function(_0x1e443f){switch(_0x1e443f){case'item':this[_0x2260('0x8')]();break;case _0x2260('0xc4'):this[_0x2260('0x27')](),this[_0x2260('0x12b')]();break;case _0x2260('0xbe'):this[_0x2260('0xbf')]();break;case _0x2260('0xd2'):this[_0x2260('0x13e')]();break;case _0x2260('0x47'):this[_0x2260('0xc1')]();break;}},Window_MenuCommand[_0x2260('0x3c')][_0x2260('0x8')]=function(){},Window_MenuCommand[_0x2260('0x3c')][_0x2260('0x27')]=function(){},Window_MenuCommand['prototype'][_0x2260('0x12b')]=function(){},Window_MenuCommand[_0x2260('0x3c')][_0x2260('0xbf')]=function(){},Window_MenuCommand[_0x2260('0x3c')][_0x2260('0x13e')]=function(){},Window_MenuCommand[_0x2260('0x3c')][_0x2260('0xc1')]=function(){},Window_MenuCommand['prototype'][_0x2260('0x17')]=function(){const _0x10a683=SceneManager['_scene']['commandWindowStyle']();if([_0x2260('0x7d'),_0x2260('0x11b')][_0x2260('0xb5')](_0x10a683))return this[_0x2260('0xd9')]?this[_0x2260('0xa4')]():0x4;else return _0x10a683!==_0x2260('0x134')?VisuMZ[_0x2260('0x73')][_0x2260('0x61')][_0x2260('0x66')][_0x2260('0x78')]:Window_Command[_0x2260('0x3c')][_0x2260('0x17')][_0x2260('0xd')](this);},Window_MenuCommand[_0x2260('0x3c')][_0x2260('0x56')]=function(){return VisuMZ['MainMenuCore'][_0x2260('0x61')][_0x2260('0x66')][_0x2260('0xc6')];},Window_MenuCommand[_0x2260('0x3c')][_0x2260('0x4d')]=function(_0x544019){const _0x695c10=this[_0x2260('0x54')](_0x544019);if(_0x695c10===_0x2260('0xe1'))this[_0x2260('0x14b')](_0x544019);else{if(_0x695c10===_0x2260('0x3'))this[_0x2260('0x6b')](_0x544019);else{if(_0x2260('0x97')===_0x2260('0x91')){function _0x4e6395(){return _0x2d9dc5[_0x2260('0x3c')][_0x2260('0xb4')][_0x2260('0xd')](this);}}else Window_Command[_0x2260('0x3c')][_0x2260('0x4d')][_0x2260('0xd')](this,_0x544019);}}},Window_MenuCommand['prototype'][_0x2260('0x139')]=function(){return VisuMZ[_0x2260('0x73')][_0x2260('0x61')][_0x2260('0x66')][_0x2260('0xd0')];},Window_MenuCommand[_0x2260('0x3c')][_0x2260('0x54')]=function(_0xf18247){const _0x338380=this[_0x2260('0x139')]();if(_0x338380!==_0x2260('0x1')){if(_0x2260('0x114')!=='cJuvY')return _0x338380;else{function _0x39b100(){_0x5b1c31[_0x2260('0x3c')][_0x2260('0x13b')][_0x2260('0xd')](this),this[_0x2260('0x95')]&&(this[_0x2260('0xff')](),this[_0x2260('0x1c')](),this[_0x2260('0xde')]());}}}else{const _0x1a7048=this[_0x2260('0xc5')](_0xf18247);if(_0x1a7048['match'](/\\I\[(\d+)\]/i)){const _0x32bfcc=this['itemLineRect'](_0xf18247),_0x3bd27b=this[_0x2260('0xbc')](_0x1a7048)[_0x2260('0xe7')];return _0x3bd27b<=_0x32bfcc['width']?_0x2260('0xe1'):_0x2260('0x3');}else return _0x2260('0x7c');}},Window_MenuCommand[_0x2260('0x3c')][_0x2260('0x14b')]=function(_0x178fcf){const _0x1207dd=this[_0x2260('0xf7')](_0x178fcf),_0x20057c=this[_0x2260('0xc5')](_0x178fcf),_0xcc679d=this[_0x2260('0xbc')](_0x20057c)['width'];this[_0x2260('0x4')](this[_0x2260('0xed')](_0x178fcf));let _0x52c476=this[_0x2260('0x56')]();if(_0x52c476==='right')this['drawTextEx'](_0x20057c,_0x1207dd['x']+_0x1207dd[_0x2260('0xe7')]-_0xcc679d,_0x1207dd['y'],_0xcc679d);else{if(_0x52c476===_0x2260('0x10f')){const _0x2144c6=_0x1207dd['x']+Math[_0x2260('0x58')]((_0x1207dd[_0x2260('0xe7')]-_0xcc679d)/0x2);this[_0x2260('0x1d')](_0x20057c,_0x2144c6,_0x1207dd['y'],_0xcc679d);}else{if(_0x2260('0xce')===_0x2260('0x133')){function _0x4b22c5(){return this[_0x2260('0x113')]();}}else this[_0x2260('0x1d')](_0x20057c,_0x1207dd['x'],_0x1207dd['y'],_0xcc679d);}}},Window_MenuCommand[_0x2260('0x3c')][_0x2260('0x6b')]=function(_0x1248ac){this[_0x2260('0xc5')](_0x1248ac)[_0x2260('0x62')](/\\I\[(\d+)\]/i);const _0x1cd3fa=Number(RegExp['$1']),_0x50750c=this[_0x2260('0xf7')](_0x1248ac),_0xde3a98=_0x50750c['x']+Math[_0x2260('0x58')]((_0x50750c[_0x2260('0xe7')]-ImageManager[_0x2260('0x14f')])/0x2),_0x1ad5b5=_0x50750c['y']+(_0x50750c[_0x2260('0xfa')]-ImageManager[_0x2260('0x87')])/0x2;this['drawIcon'](_0x1cd3fa,_0xde3a98,_0x1ad5b5);},VisuMZ['MainMenuCore'][_0x2260('0x171')]=Window_StatusBase[_0x2260('0x3c')][_0x2260('0x90')],Window_StatusBase['prototype']['loadFaceImages']=function(){VisuMZ[_0x2260('0x73')][_0x2260('0x171')][_0x2260('0xd')](this),this[_0x2260('0x15e')]();},Window_StatusBase[_0x2260('0x3c')]['loadOtherActorImages']=function(){switch(this[_0x2260('0x164')]()){case'sprite':for(const _0x1e15a9 of $gameParty[_0x2260('0xcf')]()){if(_0x2260('0xa8')!==_0x2260('0xa8')){function _0x41c6dc(){const _0x4c172f=this[_0x2260('0x3e')];_0x4c172f[_0x2260('0x8a')][_0x2260('0xaf')]();const _0x14adba=this[_0x2260('0x54')](this[_0x2260('0x10d')]());if(_0x14adba==='icon'){const _0x4146a7=this[_0x2260('0xf7')](this[_0x2260('0x10d')]());let _0x27143c=this['commandName'](this[_0x2260('0x10d')]());_0x27143c=_0x27143c[_0x2260('0x11a')](/\\I\[(\d+)\]/gi,''),_0x4c172f[_0x2260('0xd3')](),this[_0x2260('0x167')](_0x27143c,_0x4146a7),this[_0x2260('0x1f')](_0x27143c,_0x4146a7),this[_0x2260('0x18')](_0x27143c,_0x4146a7);}}}else ImageManager[_0x2260('0xa6')](_0x1e15a9[_0x2260('0xad')]());}break;case _0x2260('0x151'):for(const _0xfcd59 of $gameParty[_0x2260('0xcf')]()){ImageManager[_0x2260('0xf5')](_0xfcd59[_0x2260('0x108')]());}break;}},Window_StatusBase[_0x2260('0x3c')]['graphicType']=function(){return VisuMZ[_0x2260('0x73')][_0x2260('0x61')][_0x2260('0x111')];},Window_StatusBase[_0x2260('0x3c')][_0x2260('0xe0')]=function(_0x2999ea,_0x49fadf,_0x12aca6,_0x1dc237,_0x5e1716){_0x1dc237=_0x1dc237||ImageManager[_0x2260('0x57')],_0x5e1716=_0x5e1716||ImageManager[_0x2260('0x160')];const _0x2fe6f0=ImageManager[_0x2260('0x57')],_0x26d4c6=_0x5e1716-0x2,_0x2a5813=_0x49fadf+Math[_0x2260('0x58')]((_0x1dc237-_0x2fe6f0)/0x2);this[_0x2260('0x137')]===Window_MenuStatus&&this[_0x2260('0x4')](_0x2999ea[_0x2260('0x88')]()),this[_0x2260('0x13c')](_0x2999ea,_0x2a5813,_0x12aca6,_0x2fe6f0,_0x26d4c6),this['changePaintOpacity'](!![]);},Window_StatusBase[_0x2260('0x3c')]['drawItemActorSprite']=function(_0x3d74b3,_0x4b1fb4,_0xab59c7,_0x403b3c,_0x221d67){_0x403b3c=_0x403b3c||ImageManager['faceWidth'],_0x221d67=_0x221d67||ImageManager['faceHeight'];const _0x262eea=_0x3d74b3[_0x2260('0xad')](),_0x4a46da=_0x3d74b3[_0x2260('0xb1')](),_0x2050ca=ImageManager[_0x2260('0xa6')](_0x262eea),_0x250076=ImageManager[_0x2260('0x165')](_0x262eea),_0x179a30=_0x2050ca[_0x2260('0xe7')]/(_0x250076?0x3:0xc),_0x3d1acc=_0x2050ca[_0x2260('0xfa')]/(_0x250076?0x4:0x8),_0x36bee5=_0x403b3c,_0xc5ada2=_0x221d67-0x2,_0x3f196d=_0x4b1fb4+Math[_0x2260('0x58')](_0x36bee5/0x2),_0x4fda5d=_0xab59c7+Math[_0x2260('0x117')]((_0x221d67+_0x3d1acc)/0x2);if(this['constructor']===Window_MenuStatus){if(_0x2260('0xaa')==='jatFB')this[_0x2260('0x4')](_0x3d74b3[_0x2260('0x88')]());else{function _0x32f8c5(){const _0xdcf410=_0x2f0ae9[_0x2260('0x73')][_0x2260('0x61')]['CustomCmdWin']['Rows'],_0x71b193=_0x2dd84f[_0x2260('0xae')],_0x4a7cd0=_0x18e88f[_0x2260('0x3c')]['fittingHeight'](_0xdcf410),_0x4366bf=0x0,_0x18ef50=_0x1ee43f[_0x2260('0xb0')]((_0x46f142[_0x2260('0x0')]-_0x4a7cd0)/0x2);return new _0x28f6ff(_0x4366bf,_0x18ef50,_0x71b193,_0x4a7cd0);}}}const _0x14e0fc=Math['min'](_0x403b3c,_0x179a30),_0x1064b6=Math[_0x2260('0x74')](_0x221d67,_0x3d1acc),_0xfb874f=Math[_0x2260('0x58')](_0x4b1fb4+Math['max'](_0x403b3c-_0x179a30,0x0)/0x2),_0x2722ad=Math[_0x2260('0x58')](_0xab59c7+Math['max'](_0x221d67-_0x3d1acc,0x0)/0x2),_0x52be4=_0x250076?0x0:_0x4a46da,_0x4755fd=(_0x52be4%0x4*0x3+0x1)*_0x179a30,_0x2aec74=Math[_0x2260('0x58')](_0x52be4/0x4)*0x4*_0x3d1acc;this['contents'][_0x2260('0xab')](_0x2050ca,_0x4755fd,_0x2aec74,_0x14e0fc,_0x1064b6,_0xfb874f,_0x2722ad),this[_0x2260('0x4')](!![]);},Window_StatusBase['prototype'][_0x2260('0xdd')]=function(_0x332c3a,_0x2a1ccd,_0x3d8f56,_0x4f4f35,_0x2abcff){_0x4f4f35=_0x4f4f35||ImageManager['faceWidth'],_0x2abcff=_0x2abcff||ImageManager['faceHeight'];const _0x2fdf20=ImageManager[_0x2260('0xf5')](_0x332c3a[_0x2260('0x108')]()),_0x4f9ce4=_0x2fdf20[_0x2260('0xe7')]/ImageManager[_0x2260('0x138')],_0x3c1111=_0x2fdf20[_0x2260('0xfa')]/ImageManager[_0x2260('0x71')],_0x2cb93c=_0x4f4f35,_0x341143=_0x2abcff-0x2,_0x8ede0a=_0x2a1ccd+Math[_0x2260('0x58')](_0x2cb93c/0x2),_0x2962ef=_0x3d8f56+Math[_0x2260('0x117')]((_0x2abcff+_0x3c1111)/0x2);this[_0x2260('0x137')]===Window_MenuStatus&&this[_0x2260('0x4')](_0x332c3a['isBattleMember']());const _0x454609=Math['min'](_0x4f4f35,_0x4f9ce4),_0x5bf6ed=Math[_0x2260('0x74')](_0x2abcff,_0x3c1111),_0xb2f2e6=Math[_0x2260('0x58')](_0x2a1ccd+Math[_0x2260('0x7')](_0x4f4f35-_0x4f9ce4,0x0)/0x2),_0x13d767=Math[_0x2260('0x58')](_0x3d8f56+Math[_0x2260('0x7')](_0x2abcff-_0x3c1111,0x0)/0x2),_0x44b819=0x0,_0x1edfce=0x0;this[_0x2260('0x8a')][_0x2260('0xab')](_0x2fdf20,_0x44b819,_0x1edfce,_0x454609,_0x5bf6ed,_0xb2f2e6,_0x13d767),this[_0x2260('0x4')](!![]);},Window_StatusBase['prototype'][_0x2260('0x69')]=function(_0x5b57fe,_0x893ee3,_0x585ec2,_0x5cc81a,_0x5dfb7){const _0x389c8d=ImageManager[_0x2260('0xcd')](_0x5b57fe[_0x2260('0xf')]());_0x5cc81a=(_0x5cc81a||ImageManager[_0x2260('0x57')])-0x2,_0x5dfb7=(_0x5dfb7||ImageManager['faceHeight'])-0x2;const _0x2597b0=_0x389c8d[_0x2260('0xe7')],_0x1f2d0c=_0x389c8d[_0x2260('0xfa')],_0xa3a666=_0x5cc81a,_0x4e33f7=_0x5dfb7-0x2,_0x261989=_0x893ee3+Math['floor'](_0xa3a666/0x2),_0x57e533=_0x585ec2+Math['ceil']((_0x5dfb7+_0x1f2d0c)/0x2);this['constructor']===Window_MenuStatus&&this[_0x2260('0x4')](_0x5b57fe[_0x2260('0x88')]());const _0x5e2887=Math[_0x2260('0x74')](_0x5cc81a,_0x2597b0),_0x3d5899=Math[_0x2260('0x74')](_0x5dfb7,_0x1f2d0c),_0x31f1d1=_0x893ee3+0x1,_0x307c8b=Math[_0x2260('0x7')](_0x585ec2+0x1,_0x585ec2+_0x4e33f7-_0x1f2d0c+0x3),_0x3841b8=(_0x2597b0-_0x5e2887)/0x2,_0x2b8fe9=(_0x1f2d0c-_0x3d5899)/0x2;this[_0x2260('0x8a')][_0x2260('0xab')](_0x389c8d,_0x3841b8,_0x2b8fe9,_0x5e2887,_0x3d5899,_0x31f1d1,_0x307c8b),this[_0x2260('0x4')](!![]);},VisuMZ[_0x2260('0x73')][_0x2260('0xd7')]=Window_MenuStatus[_0x2260('0x3c')][_0x2260('0xa4')],Window_MenuStatus[_0x2260('0x3c')][_0x2260('0xa4')]=function(){return this[_0x2260('0x32')]()?$gameParty[_0x2260('0x5d')]()['length']:VisuMZ[_0x2260('0x73')][_0x2260('0xd7')][_0x2260('0xd')](this);},Window_MenuStatus[_0x2260('0x3c')][_0x2260('0x32')]=function(){const _0x4b7afb=VisuMZ[_0x2260('0x73')][_0x2260('0x61')]['General'];if(_0x4b7afb[_0x2260('0x12c')]===undefined)_0x4b7afb['ShowReserve']=!![];const _0x4dc1bf=SceneManager[_0x2260('0x42')];if(!_0x4b7afb[_0x2260('0x12c')]){if(_0x4b7afb[_0x2260('0x65')])return _0x4dc1bf[_0x2260('0x137')]===Scene_Menu;return!![];}return![];},Window_MenuStatus[_0x2260('0x3c')][_0x2260('0x6c')]=function(){const _0xe7d91f=SceneManager['_scene'][_0x2260('0x137')];return _0xe7d91f===Scene_Menu?VisuMZ[_0x2260('0x73')][_0x2260('0x61')][_0x2260('0x72')]:VisuMZ[_0x2260('0x73')][_0x2260('0x61')]['InnerMenuListStyle'];},Window_MenuStatus[_0x2260('0x3c')][_0x2260('0x13f')]=function(){const _0x4624e0=this[_0x2260('0x6c')]();switch(_0x4624e0){case'vertical':case'portrait':return 0x1;case _0x2260('0x39'):return 0x1;default:return $gameParty[_0x2260('0x14a')]();}},Window_MenuStatus[_0x2260('0x3c')][_0x2260('0x17')]=function(){const _0x32622d=this['listStyle']();switch(_0x32622d){case'vertical':case _0x2260('0x64'):return $gameParty[_0x2260('0x14a')]();default:return 0x1;}},VisuMZ[_0x2260('0x73')][_0x2260('0x15')]=Window_MenuStatus[_0x2260('0x3c')][_0x2260('0xb4')],Window_MenuStatus['prototype'][_0x2260('0xb4')]=function(){const _0x2a26fd=this['listStyle']();switch(_0x2a26fd){case _0x2260('0x93'):case'portrait':case _0x2260('0x39'):return this['innerHeight'];case _0x2260('0x130'):return Window_Selectable[_0x2260('0x3c')][_0x2260('0xb4')]['call'](this);case'thicker':return this[_0x2260('0x8e')]()*0x2+0x8;default:return VisuMZ[_0x2260('0x73')][_0x2260('0x15')][_0x2260('0xd')](this);}},Window_MenuStatus[_0x2260('0x3c')][_0x2260('0x4d')]=function(_0x128e84){this[_0x2260('0x14')](_0x128e84),this[_0x2260('0xbb')](_0x128e84);},VisuMZ[_0x2260('0x73')][_0x2260('0x104')]=Window_MenuStatus[_0x2260('0x3c')][_0x2260('0x2b')],Window_MenuStatus[_0x2260('0x3c')][_0x2260('0x63')]=function(_0x2ebc21,_0xad1d01,_0x5070b3,_0x425404,_0x5cf311){switch(this[_0x2260('0x164')]()){case _0x2260('0x67'):break;case _0x2260('0x8f'):this[_0x2260('0x142')](_0x2ebc21,_0xad1d01,_0x5070b3+0x1,_0x425404,_0x5cf311-0x2);break;case _0x2260('0x151'):this[_0x2260('0xdd')](_0x2ebc21,_0xad1d01,_0x5070b3+0x1,_0x425404,_0x5cf311-0x2);break;default:this[_0x2260('0xe0')](_0x2ebc21,_0xad1d01,_0x5070b3,_0x425404,_0x5cf311);break;}},Window_MenuStatus[_0x2260('0x3c')][_0x2260('0xbb')]=function(_0x7d2f58){this[_0x2260('0xd3')]();const _0x5d7b24=this['actor'](_0x7d2f58),_0x1a535b=this[_0x2260('0xe')](_0x7d2f58),_0x37c62a=this['listStyle']();switch(_0x37c62a){case _0x2260('0x93'):this[_0x2260('0x125')](_0x5d7b24,_0x1a535b);break;case'portrait':this[_0x2260('0x112')](_0x5d7b24,_0x1a535b);break;case'solo':this[_0x2260('0x141')](_0x5d7b24,_0x1a535b);break;case _0x2260('0x130'):this[_0x2260('0x116')](_0x5d7b24,_0x1a535b);break;case'thicker':this[_0x2260('0x9')](_0x5d7b24,_0x1a535b);break;default:this[_0x2260('0xd4')](_0x5d7b24,_0x1a535b);break;}},Window_MenuStatus[_0x2260('0x3c')][_0x2260('0x125')]=function(_0x4f2b2f,_0x31ebe0){VisuMZ[_0x2260('0x73')][_0x2260('0x61')]['ListStyles'][_0x2260('0x12')][_0x2260('0xd')](this,_0x4f2b2f,_0x31ebe0);},Window_MenuStatus[_0x2260('0x3c')][_0x2260('0x112')]=function(_0x453ff2,_0x5b7cff){if(_0x453ff2[_0x2260('0xf')]()!==''){if(_0x2260('0xbd')===_0x2260('0x11d')){function _0x22ac23(){_0x87f540[_0x2260('0x73')][_0x2260('0xca')]['call'](this),this['isDisplayActorMenuBackgroundImage']()&&this['_actorMenuBgSprite']&&this[_0x2260('0xf3')][_0x2260('0xba')](this[_0x2260('0xf4')]);}}else{const _0x5abf4a=ImageManager[_0x2260('0xcd')](_0x453ff2[_0x2260('0xf')]());_0x5abf4a[_0x2260('0x174')](this[_0x2260('0x168')][_0x2260('0x43')](this,_0x453ff2,_0x5b7cff));}}else{if(_0x2260('0x119')!==_0x2260('0x119')){function _0x52fe92(){return _0x59a612[_0x2260('0x73')][_0x2260('0x61')][_0x2260('0x10b')][_0x2260('0x123')];}}else this['drawItemStatusVerticalStyle'](_0x453ff2,_0x5b7cff);}},Window_MenuStatus[_0x2260('0x3c')][_0x2260('0x168')]=function(_0x40cb0b,_0x2afd19){VisuMZ[_0x2260('0x73')][_0x2260('0x61')][_0x2260('0x7a')][_0x2260('0x2c')][_0x2260('0xd')](this,_0x40cb0b,_0x2afd19);},Window_MenuStatus[_0x2260('0x3c')][_0x2260('0x141')]=function(_0x4faf13,_0x50bc30){const _0x31bdf6=ImageManager['loadPicture'](_0x4faf13[_0x2260('0xf')]());_0x31bdf6['addLoadListener'](this['drawItemStatusSoloStyleOnLoad']['bind'](this,_0x4faf13,_0x50bc30));},Window_MenuStatus[_0x2260('0x3c')][_0x2260('0x99')]=function(_0x5c9bd0,_0x508a45){VisuMZ[_0x2260('0x73')]['Settings'][_0x2260('0x7a')]['SoloStyle']['call'](this,_0x5c9bd0,_0x508a45);},Window_MenuStatus[_0x2260('0x3c')][_0x2260('0x116')]=function(_0x703dfa,_0x1e3076){VisuMZ[_0x2260('0x73')]['Settings']['ListStyles']['ThinStyle'][_0x2260('0xd')](this,_0x703dfa,_0x1e3076);},Window_MenuStatus[_0x2260('0x3c')][_0x2260('0x9')]=function(_0x270fd1,_0x1554aa){VisuMZ[_0x2260('0x73')][_0x2260('0x61')][_0x2260('0x7a')][_0x2260('0x105')][_0x2260('0xd')](this,_0x270fd1,_0x1554aa);},Window_MenuStatus[_0x2260('0x3c')][_0x2260('0x86')]=function(){const _0x317174=this[_0x2260('0x6c')]();if([_0x2260('0x130'),_0x2260('0x50')][_0x2260('0xb5')](_0x317174))return![];return Window_StatusBase[_0x2260('0x3c')][_0x2260('0x86')][_0x2260('0xd')](this);},Window_MenuStatus[_0x2260('0x3c')][_0x2260('0xd4')]=function(_0x42484a,_0x3dd756){VisuMZ[_0x2260('0x73')][_0x2260('0x61')][_0x2260('0x7a')][_0x2260('0x121')][_0x2260('0xd')](this,_0x42484a,_0x3dd756);},Window_SkillStatus[_0x2260('0x3c')][_0x2260('0x13c')]=function(_0x16bc34,_0x52eb52,_0x4e802b,_0x2ad5d8,_0x14d8ab){switch(this[_0x2260('0x164')]()){case _0x2260('0x67'):break;case _0x2260('0x8f'):this[_0x2260('0x142')](_0x16bc34,_0x52eb52,_0x4e802b,_0x2ad5d8,_0x14d8ab);break;case _0x2260('0x151'):this['drawItemActorSvBattler'](_0x16bc34,_0x52eb52,_0x4e802b,_0x2ad5d8,_0x14d8ab);break;default:Window_StatusBase[_0x2260('0x3c')][_0x2260('0x13c')][_0x2260('0xd')](this,_0x16bc34,_0x52eb52,_0x4e802b,_0x2ad5d8,_0x14d8ab);break;}},Window_EquipStatus['prototype'][_0x2260('0x13c')]=function(_0x1d933a,_0x1157e8,_0x23b147,_0x52fd29,_0x47662a){switch(this[_0x2260('0x164')]()){case _0x2260('0x67'):break;case _0x2260('0x8f'):this[_0x2260('0x142')](_0x1d933a,_0x1157e8,_0x23b147,_0x52fd29,_0x47662a);break;case _0x2260('0x151'):this[_0x2260('0xdd')](_0x1d933a,_0x1157e8,_0x23b147,_0x52fd29,_0x47662a);break;default:Window_StatusBase['prototype'][_0x2260('0x13c')][_0x2260('0xd')](this,_0x1d933a,_0x1157e8,_0x23b147,_0x52fd29,_0x47662a);break;}};function Window_ThinGold(){this[_0x2260('0x49')](...arguments);}Window_ThinGold[_0x2260('0x3c')]=Object[_0x2260('0x5f')](Window_Gold[_0x2260('0x3c')]),Window_ThinGold['prototype'][_0x2260('0x137')]=Window_ThinGold,Window_ThinGold[_0x2260('0x3c')][_0x2260('0xb4')]=function(){return this[_0x2260('0x8e')]();},Window_ThinGold[_0x2260('0x3c')]['colSpacing']=function(){return Window_Selectable[_0x2260('0x3c')][_0x2260('0x48')][_0x2260('0xd')](this);};function Window_Playtime(){this[_0x2260('0x49')](...arguments);}Window_Playtime[_0x2260('0x3c')]=Object[_0x2260('0x5f')](Window_Selectable[_0x2260('0x3c')]),Window_Playtime[_0x2260('0x3c')][_0x2260('0x137')]=Window_Playtime,Window_Playtime[_0x2260('0x3c')][_0x2260('0x49')]=function(_0xae9bc4){this[_0x2260('0x76')]=$gameSystem[_0x2260('0x5c')](),this[_0x2260('0xfe')]=0x3c,Window_Selectable[_0x2260('0x3c')][_0x2260('0x49')][_0x2260('0xd')](this,_0xae9bc4),this[_0x2260('0x107')]();},Window_Playtime[_0x2260('0x3c')][_0x2260('0xb4')]=function(){return this[_0x2260('0x8e')]();},Window_Playtime[_0x2260('0x3c')][_0x2260('0x13b')]=function(){Window_Selectable['prototype'][_0x2260('0x13b')][_0x2260('0xd')](this),this[_0x2260('0xd1')]();},Window_Playtime[_0x2260('0x3c')][_0x2260('0xd1')]=function(){if(this[_0x2260('0xfe')]-->0x0){if(this[_0x2260('0xfe')]<=0x0)this[_0x2260('0x107')]();}},Window_Playtime[_0x2260('0x3c')][_0x2260('0x107')]=function(){this[_0x2260('0xfe')]=0x3c;const _0x52629d=this[_0x2260('0xf7')](0x0),_0x3c427a=_0x52629d['x'],_0xfc4229=_0x52629d['y'],_0x4b05f9=_0x52629d[_0x2260('0xe7')];this[_0x2260('0x8a')][_0x2260('0xaf')](),this[_0x2260('0x159')](_0x52629d),this[_0x2260('0x1b')](_0x52629d),this['drawPlaytime'](_0x52629d);},Window_Playtime[_0x2260('0x3c')]['resetFontSettings']=function(){Window_Selectable[_0x2260('0x3c')][_0x2260('0xd3')][_0x2260('0xd')](this),this[_0x2260('0x8a')][_0x2260('0x11e')]=VisuMZ[_0x2260('0x73')][_0x2260('0x61')][_0x2260('0x100')][_0x2260('0x24')];},Window_Playtime[_0x2260('0x3c')][_0x2260('0x159')]=function(_0xa7963d){if(VisuMZ[_0x2260('0x73')]['Settings'][_0x2260('0x100')][_0x2260('0x85')]>0x0){const _0x147c88=VisuMZ['MainMenuCore'][_0x2260('0x61')][_0x2260('0x100')]['Icon'],_0x594eef=_0xa7963d['y']+(this[_0x2260('0x8e')]()-ImageManager[_0x2260('0x87')])/0x2;this[_0x2260('0xb2')](_0x147c88,_0xa7963d['x'],_0x594eef);const _0x23fa7a=ImageManager[_0x2260('0x14f')]+0x4;_0xa7963d['x']+=_0x23fa7a,_0xa7963d['width']-=_0x23fa7a;}},Window_Playtime[_0x2260('0x3c')][_0x2260('0x1b')]=function(_0x20e6f6){this[_0x2260('0xd3')](),this['changeTextColor'](ColorManager[_0x2260('0xa9')]());const _0x5f547d=VisuMZ['MainMenuCore'][_0x2260('0x61')][_0x2260('0x100')][_0x2260('0x11f')];this[_0x2260('0x6d')](_0x5f547d,_0x20e6f6['x'],_0x20e6f6['y'],_0x20e6f6[_0x2260('0xe7')],_0x2260('0x6a')),this['resetTextColor']();},Window_Playtime['prototype']['drawPlaytime']=function(_0x203e72){const _0x13d63a=$gameSystem['playtimeText']();this['drawText'](_0x13d63a,_0x203e72['x'],_0x203e72['y'],_0x203e72[_0x2260('0xe7')],_0x2260('0xc7'));};function Window_MenuVariables(){this[_0x2260('0x49')](...arguments);}Window_MenuVariables[_0x2260('0x3c')]=Object[_0x2260('0x5f')](Window_Selectable[_0x2260('0x3c')]),Window_MenuVariables[_0x2260('0x3c')][_0x2260('0x137')]=Window_MenuVariables,Window_MenuVariables[_0x2260('0x3c')][_0x2260('0x49')]=function(_0x1bc775){Window_Selectable['prototype'][_0x2260('0x49')][_0x2260('0xd')](this,_0x1bc775),this[_0x2260('0xec')]=VisuMZ[_0x2260('0x73')][_0x2260('0x61')][_0x2260('0x10b')][_0x2260('0x21')],this[_0x2260('0x107')]();},Window_MenuVariables[_0x2260('0x3c')][_0x2260('0xb4')]=function(){return this[_0x2260('0x8e')]();},Window_MenuVariables[_0x2260('0x3c')][_0x2260('0x17')]=function(){const _0x29d2c6=SceneManager['_scene'][_0x2260('0x23')]();if(_0x29d2c6===_0x2260('0x134')){if('VPKRm'==='VPKRm')return 0x1;else{function _0x25f6ce(){return _0x212b99[_0x2260('0x73')]['Settings'][_0x2260('0x166')];}}}else return VisuMZ[_0x2260('0x73')][_0x2260('0x61')]['Variable'][_0x2260('0x21')]['length'];},Window_MenuVariables[_0x2260('0x3c')]['resetFontSettings']=function(){Window_Selectable[_0x2260('0x3c')][_0x2260('0xd3')][_0x2260('0xd')](this),this[_0x2260('0x8a')][_0x2260('0x11e')]=VisuMZ['MainMenuCore'][_0x2260('0x61')][_0x2260('0x10b')][_0x2260('0x24')],this[_0x2260('0x9b')](ColorManager[_0x2260('0xa9')]());},Window_MenuVariables['prototype'][_0x2260('0xa4')]=function(){return this['_data'][_0x2260('0x2a')];},Window_MenuVariables[_0x2260('0x3c')][_0x2260('0x109')]=function(){const _0x583df7=this[_0x2260('0x9e')]();for(let _0x3a4832=0x0;_0x3a4832<this[_0x2260('0xa2')]();_0x3a4832++){const _0x4ccd37=_0x583df7+_0x3a4832;_0x4ccd37<this[_0x2260('0xa4')]()&&(this[_0x2260('0x4e')](_0x4ccd37),this[_0x2260('0x4d')](_0x4ccd37));}},Window_MenuVariables['prototype'][_0x2260('0x4e')]=function(_0x3f9af8){},Window_MenuVariables[_0x2260('0x3c')][_0x2260('0x4d')]=function(_0x798ee7){const _0x165ba0=this[_0x2260('0xec')][_0x798ee7];if(_0x165ba0<=0x0)return;const _0x22e96b=this['itemLineRect'](_0x798ee7);this['resetFontSettings']();let _0x445dba=0x0,_0x147dc2=$dataSystem[_0x2260('0x157')][_0x165ba0][_0x2260('0x132')]();_0x147dc2[_0x2260('0x62')](/\\I\[(\d+)\]/i)&&(_0x445dba=Number(RegExp['$1']),_0x147dc2=_0x147dc2[_0x2260('0x11a')](/\\I\[(\d+)\]/i,'')[_0x2260('0x132')]());if(_0x445dba>0x0){if('SdjKX'!=='OYLkN'){const _0x1e436a=_0x22e96b['y']+(this[_0x2260('0x8e')]()-ImageManager['iconHeight'])/0x2;this['drawIcon'](_0x445dba,_0x22e96b['x'],_0x1e436a);const _0x36edf8=ImageManager[_0x2260('0x14f')]+0x4;_0x22e96b['x']+=_0x36edf8,_0x22e96b[_0x2260('0xe7')]-=_0x36edf8;}else{function _0x56033a(){const _0x53a57a=this[_0x2260('0xf7')](_0x96a32a),_0x3f2234=this[_0x2260('0xc5')](_0x4824bb),_0x525bd5=this['textSizeEx'](_0x3f2234)[_0x2260('0xe7')];this[_0x2260('0x4')](this[_0x2260('0xed')](_0x26e4e3));let _0x33ec6c=this[_0x2260('0x56')]();if(_0x33ec6c===_0x2260('0xc7'))this[_0x2260('0x1d')](_0x3f2234,_0x53a57a['x']+_0x53a57a[_0x2260('0xe7')]-_0x525bd5,_0x53a57a['y'],_0x525bd5);else{if(_0x33ec6c===_0x2260('0x10f')){const _0x4b16b6=_0x53a57a['x']+_0xede4e2[_0x2260('0x58')]((_0x53a57a[_0x2260('0xe7')]-_0x525bd5)/0x2);this[_0x2260('0x1d')](_0x3f2234,_0x4b16b6,_0x53a57a['y'],_0x525bd5);}else this[_0x2260('0x1d')](_0x3f2234,_0x53a57a['x'],_0x53a57a['y'],_0x525bd5);}}}}this[_0x2260('0x6d')](_0x147dc2,_0x22e96b['x'],_0x22e96b['y'],_0x22e96b[_0x2260('0xe7')],_0x2260('0x6a')),this[_0x2260('0x9b')](ColorManager[_0x2260('0x144')]()),this[_0x2260('0x6d')]($gameVariables[_0x2260('0xe5')](_0x165ba0),_0x22e96b['x'],_0x22e96b['y'],_0x22e96b[_0x2260('0xe7')],_0x2260('0xc7'));};