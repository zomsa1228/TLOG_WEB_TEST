//=============================================================================
// VisuStella MZ - Message Core
// VisuMZ_1_MessageCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MessageCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MessageCore = VisuMZ.MessageCore || {};
VisuMZ.MessageCore.version = 1.04;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.04] [MessageCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Message_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Message Core plugin extends and builds upon the message functionality of
 * RPG Maker MZ and allows you, the game dev, to customize the workflow for
 * your game's message system.
 *
 * Features include all (but not limited to) the following:
 *
 * * Control over general message settings.
 * * Auto-Color key words and/or database entries.
 * * Increases the text codes available to perform newer functions/effects.
 * * Ability for you to implement custom Text Code actions.
 * * Ability for you to implement custom Text code string replacements.
 * * Invoke a macro system to speed up the dev process.
 * * Add a Text Speed option to the Options menu.
 * * Add the ever so useful Word Wrap to your message system.
 * * Extend the choice selection process to your liking.
 * * The ability to enable/disable as well as show/hide certain choices.
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
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin. Some of
 * these are original text codes provided by RPG Maker MZ, while others are
 * new text codes added through this plugin. You may even add your own text
 * codes through the plugin parameters.
 *
 * === RPG Maker MZ Text Codes ===
 *
 * The following are text codes that come with RPG Maker MZ. These text codes
 * cannot be edited through the Plugin Parameters.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \V[x]                Replaced by the value of variable 'x'.
 * \N[x]                Replaced by the name of actor 'x'.
 * \P[x]                Replaced by the name of party member 'x'.
 * \C[x]                Draw the subsequent text with window skin color 'x'.
 * \I[x]                Draw icon 'x'.
 *
 * \PX[x]               Moves text x position to 'x'.
 * \PY[x]               Moves text y position to 'y'.
 *
 * \G                   Replaced by the currency unit.
 *
 * \{                   Increase the text font size by one step.
 * \}                   Decrease the text font size by one step.
 * \FS[x]               Changes the text font size to 'x'.
 *
 * \\                   Replaced by the backslash character.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \$                   Opens the gold window.
 * \.                   Waits a 1/4 second.
 * \|                   Waits a full second.
 * \!                   Waits for button input.
 * \>                   Display remaining text on same line all at once.
 * \<                   Cancel the effect that displays text all at once.
 * \^                   Do not wait for input after displaying text to move on.
 *
 * ---
 *
 * === Message Core Hard-Coded Text Codes ===
 *
 * The following text codes are hard-coded into VisuStella MZ Message Core's
 * code. These text codes cannot be edited through the Plugin Parameters.
 * 
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * <b>                  Makes subsequent text bold.
 * </b>                 Removes bold from subsequent text.
 * <i>                  Makes subsequent text italic.
 * </i>                 Removes italic from subsequent text.
 * 
 * <left>               Makes subsequent text left-aligned.
 * </left>              Removes left-alignment for subsequent text.
 * <center>             Makes subsequent text center-aligned.
 * </center>            Removes center-alignment for subsequent text.
 * <right>              Makes subsequent text right-aligned.
 * </right>             Removes right-alignment for subsequent text.
 *
 * Note1: Use at line-start.
 *
 * <ColorLock>          Text codes can't change text color for subsequent text.
 * </ColorLock>         Removes Color Lock property.
 *
 * <WordWrap>           Enables Word Wrap for this window. *Note2*
 * </WordWrap>          Disables Word Wrap for this window. *Note2*
 * <br>                 Adds a line break. Requires Word Wrap enabled.
 * <line break>         Adds a line break. Requires Word Wrap enabled.
 *
 * Note2: Some windows cannot use Word Wrap such as the Choice Window.
 *
 * \picture<x>          Draws picture x (filename) at current text position.
 * \CenterPicture<x>    Draws picture x (filename) centered at the window.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \CommonEvent[x]      Runs common event x when text code is reached.
 * \Wait[x]             Makes the message wait x frames before continuing.
 * 
 * <Auto>               Resizes message window dimensions to fit text. *Note3*
 * <Auto Width>         Resizes message window width to fit text. *Note3*
 * <Auto Height>        Resizes message window height to fit text. *Note3*
 * 
 * <Auto Actor: x>      Resizes message window and positions it over actor x
 *                      sprite's head. *Note3*
 * <Auto Party: x>      Resizes message window and positions it over party
 *                      member x sprite's head. *Note3*
 * <Auto Player>        Map-Only. Resizes message window and positions it over
 *                      the player sprite's head. *Note3*
 * <Auto Event: x>      Map-Only. Resizes message window and positions it over
 *                      event x sprite's head. *Note3*
 * <Auto Enemy: x>      Battle-Only. Resizes message window and positions it
 *                      over enemy x sprite's head. *Note3*
 *
 * Note3: Upon using these text codes, the message window's settings will be
 * reset for the upcoming message. These effects do not work with Word Wrap.
 *
 * ---
 *
 * -----------------------------  ---------------------------------------------
 * Text Code                      Effect (Choice Window Only)
 * -----------------------------  ---------------------------------------------
 * <Show>                         Choice is always shown.
 * <Show Switch: x>               Choice shown if switch x is ON.
 * <Show Switches: x,x,x>         Choice shown if the x switches are all ON.
 * <Show All Switches: x,x,x>     Choice shown if the x switches are all ON.
 * <Show Any Switches: x,x,x>     Choice shown if any of x switches are ON.
 *
 * <Hide>                         Choice is always hidden.
 * <Hide Switch: x>               Choice hidden if switch x is ON.
 * <Hide Switches: x,x,x>         Choice hidden if the x switches are all ON.
 * <Hide All Switches: x,x,x>     Choice hidden if the x switches are all ON.
 * <Hide Any Switches: x,x,x>     Choice hidden if any of x switches are ON.
 *
 * <Enable>                       Choice is always enabled.
 * <Enable Switch: x>             Choice enabled if switch x is ON.
 * <Enable Switches: x,x,x>       Choice enabled if the x switches are all ON.
 * <Enable All Switches: x,x,x>   Choice enabled if the x switches are all ON.
 * <Enable Any Switches: x,x,x>   Choice enabled if any of x switches are ON.
 *
 * <Disable>                      Choice is always disabled.
 * <Disable Switch: x>            Choice disabled if switch x is ON.
 * <Disable Switches: x,x,x>      Choice disabled if the x switches are all ON.
 * <Disable All Switches: x,x,x>  Choice disabled if the x switches are all ON.
 * <Disable Any Switches: x,x,x>  Choice disabled if any of x switches are ON.
 *
 * ---
 *
 * === Message Core Customizable Text Codes ===
 *
 * The following text codes can be altered through the Message Core's various
 * Plugin Parameters to adjust replacements and actions.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \Class[x]            Draws class x's icon (if have) and name.
 * \ClassName[x]        Draws class x's name only.
 *
 * \Skill[x]            Draws skill x's icon (if have) and name.
 * \SkillName[x]        Draws skill x's name only.
 *
 * \Item[x]             Draws item x's icon (if have) and name.
 * \ItemName[x]         Draws item x's name only.
 * \ItemQuantity[x]     Inserts the number of item x's owned by the party.
 *
 * \Weapon[x]           Draws weapon x's icon (if have) and name.
 * \WeaponName[x]       Draws weapon x's name only.
 * \WeaponQuantity[x]   Inserts the number of weapon x's owned by the party.
 *
 * \Armor[x]            Draws armor x's icon (if have) and name.
 * \ArmorName[x]        Draws armor x's name only.
 * \ArmorQuantity[x]    Inserts the number of armor x's owned by the party.
 *
 * \LastGainObj         Draws the icon + name of the last party-gained object.
 * \LastGainObjName     Draws the name of the last party-gained object.
 * \LastGainObjQuantity Inserts the quantity of the last party-gained object.
 *
 * \State[x]            Draws state x's icon (if have) and name.
 * \StateName[x]        Draws state x's name only.
 *
 * \Enemy[x]            Draws enemy x's icon (if have) and name.
 * \EnemyName[x]        Draws enemy x's name only.
 *
 * \Troop[x]            Draws troop x's icon (if have) and name.
 * \TroopName[x]        Draws troop x's name only.
 *
 * \TroopMember[x]      Draws troop member x's icon (if have) and name. *Note1*
 * \TroopNameMember[x]  Draws troop member x's name only. *Note1*
 * 
 * Note1: Only works in battle.
 *
 * \NormalBG            Changes background type of window to normal type.
 * \DimBG               Changes background type of window to dim type.
 * \TransparentBG       Changes background type of window to transparent type.
 *
 * \FontChange<x>       Changes font face to x font name.
 * \ResetFont           Resets font settings.
 *
 * \ResetColor          Resets color settings.
 * \HexColor<x>         Changes text color to x hex color (ie. #123abc).
 * \OutlineColor[x]     Changes outline color to text color x.
 * \OutlineHexColor<x>  Changes outline color to x hex color (ie. #123abc).
 * \OutlineWidth[x]     Changes outline width to x thickness.
 * 
 * \WindowMoveTo<x>     Moves window to exact coordinates. *Note2*
 * \WindowMoveBy<x>     Moves window by relative values. *Note2*
 * \WindowReset         Resets window position to original position.
 *
 * Note2: Replace 'x' with the following format:
 *   targetX, targetY, targetWidth, targetHeight, duration, easingType
 *   Only targetX and targetY are required arguments.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \ActorFace[x]        Inserts actor x's face into the Message Window.
 * \PartyFace[x]        Inserts party member x's face into the Message Window.
 * \ChangeFace<x,y>     Changes message face to x filename, y index.
 * \FaceIndex[x]        Changes message face index to x.
 *
 * \TextDelay[x]        Sets delay in frames between characters to x frames.
 * 
 * ---
 * 
 * As these text codes can be added, removed, and/or altered, their functions
 * may or may not be the same depending on how you've altered them. VisuStella
 * is not responsible for any errors caused by changes made to pre-made text
 * codes nor any new text codes they did not make.
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
 * === Message Plugin Commands ===
 * 
 * ---
 *
 * Message: Properties
 *   Change the various properties of the Message Window.
 *
 *   Rows:
 *   - Change the number of Message Window rows.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Width: 
 *   - Change the Message Window width in pixels.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Center:
 *   - Center the window X after changing its width?
 *
 *   Word Wrap:
 *   - Enable or disable Word Wrap for the Message Window?
 *
 * ---
 * 
 * === Choice Plugin Commands ===
 * 
 * ---
 *
 * Choice: Properties
 *   Change the properties found in the Show Choices event command.
 *
 *   Line Height:
 *   - Change the line height for the show choices.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Rows:
 *   - Maximum number of choice rows to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Columns:
 *   - Maximum number of choice columns to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Text Alignment:
 *   - Text alignment for Show Choice window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings involving the message system. These settings range from
 * adjust how the Message Window looks to more intricate settings like how
 * some of the default text codes work.
 *
 * ---
 *
 * Message Window
 *
 *   Default Rows:
 *   - Default number of rows to display for the Message Window.
 *
 *   Default Width:
 *   - Default Message Window width in pixels.
 *
 *   Fast Forward Key:
 *   - This is the key used for fast forwarding messages.
 *
 *   Text Delay:
 *   - How many frames to wait between characters drawn?
 *   - Use 0 for instant.
 *
 * ---
 *
 * Name Box Window
 *
 *   Default Color:
 *   - Default color for the Name Box Window's text.
 *
 *   Offset X:
 *   - How much to offset the name box window X by
 *     (as long as it doesn't go offscreen).
 *
 *   Offset Y:
 *   - How much to offset the name box window Y by
 *     (as long as it doesn't go offscreen).
 *
 * ---
 *
 * Choice List Window
 *
 *   Line Height:
 *   - What is the default line height for Show Choices?
 *
 *   Max Rows:
 *   - Maximum number of rows to visibly display?
 *
 *   Max Columns:
 *   - Maximum number of columns to visibly display?
 *
 *   Text Alignment:
 *   - Default alignment for Show Choice window.
 *
 * ---
 *
 * Default Text Codes
 *
 *   Relative \PX \PY:
 *   - Make \PX[x] and \PY[x] adjust relative starting position than
 *     exact coordinates.
 *
 *   \{ Maximum:
 *   - Determine the maximum size that \{ can reach.
 *
 *   \} Minimum:
 *   - Determine the minimum size that \} can reach.
 *
 *   \{ Change \}
 *   - How much does \{ and \} change font size by?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Auto-Color Settings
 * ============================================================================
 *
 * For certain windows such as the Message Window, Help Window, and Choice
 * Window, Auto-Color is enabled to automatically highlight and color certain
 * database entries, keywords, and just about anything you, the game dev, wants
 * to be automatically colored. This is done to avoid typing out \C[6]Jack\C[0]
 * every time Jack's name is written out as it will be automatically colored in
 * those specific windows.
 *
 * The Plugin Parameters will give you full reign over which database entries
 * and keywords you want to be automatically colored as long as they follow a
 * few rules:
 * 
 * -----------------
 * Auto-Color Rules:
 * -----------------
 *
 * 1. Database names and keywords are case sensitive.
 *    This means if "Potion" is a marked keyword, typing out "potion" will not
 *    prompt the auto-color to highlight "potion". You must add the lowercase
 *    version of the word into the keyword list if you want it to count.
 *
 * 2. Database names and keywords are exact size (for Roman languages)
 *    This means if "Potion" is a marked keyword, typing out "potions" will not
 *    prompt the auto-color to highlight "potions". You must type out all of
 *    the variations of the words you want affected into the keyword list to
 *    prompt the auto-color highlight.
 * 
 *    This does not apply to Japanese, Korean, or Chinese languages.
 *
 * 3. Possessive cases and other language symbols aren't counted.
 *    Symbols such as periods, commas, quotes, parentheses, and similar symbols
 *    do no count towards Rule 2. This means if "Potion" is a marked keyword,
 *    the typing out "(Potion)" will still highlight the "Potion" part of the
 *    word according to the auto-color.
 * 
 * 4. Names with special characters like !, ?, [, ], etc. will be ignored.
 *    These cause conflicts with how auto-colors are detected.
 *
 * ---
 *
 * Database Highlighting
 *
 *   Actors:
 *   Classes:
 *   Skills:
 *   Items:
 *   Weapons:
 *   Armors:
 *   Enemies:
 *   States:
 *   - Any usage of a the selected database entry's name is auto-colored with
 *     the text code number.
 *   - Use 0 to not auto-color.
 *
 * ---
 *
 * Word Highlighting
 *
 *   \C[x]: Color
 *   - These are lists of all the words that will be automatically colored with
 *     the x text color.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Actions
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * performing actions. These actions can be done through each JavaScript or by
 * a common event (if it is used in the Message Window). Adequate knowledge of
 * both is recommended before attempting to modify and/or add new Text Code
 * Actions to the Plugin Parameters.
 *
 * Each of the Text Code Actions are formatted in such a way:
 *
 * ---
 *
 * Text Code Action
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   Common Event:
 *   - Select a common event to run when this text code is used in a message.
 *
 *   JS: Action:
 *   - JavaScript code used to perform an action when this text code appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Replacements
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * replacing the text codes with text data. Text data can be replaced with
 * an exact exchange of text or dynamically through JavaScript. Adding a new
 * Text Code Replacement is done through the Plugin Parameters.
 *
 * Each of the Text Code Replacements are formatted in such a way:
 *
 * ---
 *
 * Text Code Replacement
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   STR: Text:
 *   - The text that will appear if this match appears.
 *     If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     match appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Macros
 * ============================================================================
 *
 * Text macros are used in similar fashion to text codes replacements to
 * replace themselves with text data. The primary difference is that macros are
 * made in a different format with no conditional argument modifiers (ie the
 * [x] that follows a text code).
 *
 * To use a text macro, type in the matching keyword between two [brackets] and
 * it will be replaced by the string data or run the JavaScript code found in
 * the Plugin Parameter settings.
 *
 * For example, if you have the text macro "Leader", made to return the party
 * leader's name, you can type in [Leader] in the Message Window and it will be
 * replaced with the party leader's name. The output can also output text codes
 * into the resulting text.
 *
 * Each of the Text Macros are formatted in such a way:
 *
 * ---
 *
 * Text Macro
 *
 *   Match:
 *   - This is what needs to be matched in order for this macro to work.
 *   - In [Leader], this would be the 'Leader' text.
 *
 *   STR: Text:
 *   - The replacement text that will appear from the macro.
 *   - If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     macro appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Speed Option Settings
 * ============================================================================
 *
 * Modern RPG's on the market have the option to adjust the message speed rate
 * for players. These Plugin Parameters allow you to add that option to the
 * Options Menu as well.
 *
 * ---
 *
 * Text Speed Option Settings
 *
 *   Add Option?:
 *   - Add the 'Text Speed' option to the Options menu?
 *
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 *
 *   Option Name:
 *   - Command name of the option.
 *
 *   Default Value:
 *   - 1 - 10, slowest to fastest.
 *   - 11 is instant value.
 *
 *   Instant Speed:
 *   - Text to show "instant" text.
 *
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Word Wrap Settings
 * ============================================================================
 *
 * Word wrap is a property that will cause any overflowing text to wrap around
 * and move into the next line. This property can only be enabled inside text
 * that accept text codes, such as the Message Window and Help Window. However,
 * word wrap is disabled for the Choice Window due to the nature of the Choice
 * Window's base properties.
 *
 * Word wrap can be enabled or disabled in three ways. One is by using the text
 * code <WordWrap> to enable it or </WordWrap> to disable it. The second method
 * is by enabling it with the Plugin Command: 'Message: Properties'. The third
 * method is by enabling it by default with the Plugin Parameters.
 *
 * ---
 *
 * Enable Word Wrap
 *
 *   Message Window:
 *   - Automatically enable Word Wrap for this window?
 *
 *   Help Window:
 *   - Automatically enable Word Wrap for this window?
 *
 * ---
 *
 * Rules
 *
 *   Link Break -> Space:
 *   - Convert manually placed (non tagged) line breaks with spaces?
 *   - Line breaks must be inserted using the <br> text code.
 *
 *   Tight Wrap:
 *   - If a face graphic is present in a message, word wrap will be tighter.
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
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Word wrap no longer affects specific battle messages. Fix made by Irina.
 * ** Word wrap now updates properly after using the 'Message: Properties'
 *    Plugin Command. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Autoplacement of the name box window now takes its offset Y setting into
 *    account before sending it to the bottom of the message window. Fix made
 *    by Yanfly.
 * ** Added automatic feature setting to turn off word wrap when using the
 *    auto-size and auto-position text codes. This is because the auto-size and
 *    auto-position effects don't work properly with Word Wrap based on how
 *    they both clash when adjusting the window settings. Fix made by Irina.
 * ** New message pages after auto-sizing no longer put out empty messages.
 *    Fix made by Irina and Shiro.
 * * Documentation Update!
 * ** Extended the note for auto-size and auto-position text codes to include
 *    that they do not work with Word Wrap. Added by Irina.
 * 
 * Version 1.02: August 30, 2020
 * * New Features!
 * ** Added new hard-coded text codes for auto-sizing and auto-positioning:
 * *** <Auto>, <Auto Width>, <Auto Height>
 * *** <Auto Actor: x>, <Auto Party: x>, <Auto Enemy: x>
 * *** <Auto Player>, <Auto Actor: x>, <Auto Party: x>, <Auto Event: x>
 * **** New features added by Irina.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** </Wordwrap> now works.
 * ** \ActorFace[x] text code now fixed.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Text Code Replacements > ActorFace >
 *     JS: Text > and changing "$gameActors.actor(1)" to
 *     "$gameActors.actor(actorId)"
 * ** Actors with empty names would cause auto hightlight problems. Fixed!
 * ** Auto-colors now ignore names with special characters like !, ?, [, ], and
 *    so on.
 * ** Line break spacing fixed.
 * * New Features!
 * ** Wordwrap now works with <left>, <center> and <right> alignment tags.
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
 * @command MessageWindowProperties
 * @text Message: Properties
 * @desc Change the various properties of the Message Window.
 *
 * @arg Rows:num
 * @text Rows
 * @type number
 * @min 0
 * @desc Change the number of Message Window rows.
 * Leave at 0 to keep it unchanged.
 * @default 4
 *
 * @arg Width:num
 * @text Width
 * @type number
 * @min 0
 * @desc Change the Message Window width in pixels.
 * Leave at 0 to keep it unchanged.
 * @default 816
 *
 * @arg Center:eval
 * @text Center Window X?
 * @parent Width
 * @type boolean
 * @on Center
 * @off Don't
 * @desc Center the window X after changing its width?
 * @default true
 *
 * @arg WordWrap:str
 * @text Word Wrap
 * @type select
 * @option No Change
 * @value No Change
 * @option Enable
 * @value true
 * @option Disable
 * @value false
 * @desc Enable or disable Word Wrap for the Message Window?
 * @default No Change
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChoiceWindowProperties
 * @text Choices: Properties
 * @desc Change the properties found in the Show Choices event command.
 *
 * @arg LineHeight:num
 * @text Line Height
 * @type number
 * @min 0
 * @desc Change the line height for the show choices.
 * Leave at 0 to keep this unchanged.
 * @default 36
 *
 * @arg MaxRows:num
 * @text Max Rows
 * @type number
 * @min 0
 * @desc Maximum number of choice rows to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 8
 *
 * @arg MaxCols:num
 * @text Max Columns
 * @type number
 * @min 0
 * @desc Maximum number of choice columns to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 1
 *
 * @arg TextAlign:str
 * @text Text Alignment
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Text alignment for Show Choice window.
 * @default default
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
 * @param MessageCore
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
 * @desc General settings involving the message system.
 * @default {"MessageWindow":"","MessageRows:num":"4","MessageWidth:num":"816","FastForwardKey:str":"shift","MessageTextDelay:num":"1","StretchDimmedBg:eval":"true","NameBoxWindow":"","NameBoxWindowDefaultColor:num":"6","NameBoxWindowOffsetX:num":"0","NameBoxWindowOffsetY:num":"0","ChoiceListWindow":"","ChoiceWindowLineHeight:num":"36","ChoiceWindowMaxRows:num":"8","ChoiceWindowMaxCols:num":"1","ChoiceWindowTextAlign:str":"default","DefaultTextCodes":"","RelativePXPY:eval":"true","FontBiggerCap:eval":"108","FontSmallerCap:eval":"12","FontChangeValue:eval":"12"}
 *
 * @param AutoColor:struct
 * @text Auto-Color Settings
 * @type struct<AutoColor>
 * @desc Automatically color certain keywords a specific way.
 * @default {"DatabaseHighlighting":"","Actors:str":"6","Classes:str":"4","Skills:str":"4","Items:str":"4","Weapons:str":"4","Armors:str":"4","Enemies:str":"2","States:str":"4","WordHighlighting":"","TextColor1:arraystr":"[]","TextColor2:arraystr":"[]","TextColor3:arraystr":"[]","TextColor4:arraystr":"[]","TextColor5:arraystr":"[]","TextColor6:arraystr":"[]","TextColor7:arraystr":"[]","TextColor8:arraystr":"[]","TextColor9:arraystr":"[]","TextColor10:arraystr":"[]","TextColor11:arraystr":"[]","TextColor12:arraystr":"[]","TextColor13:arraystr":"[]","TextColor14:arraystr":"[]","TextColor15:arraystr":"[]","TextColor16:arraystr":"[]","TextColor17:arraystr":"[]","TextColor18:arraystr":"[]","TextColor19:arraystr":"[]","TextColor20:arraystr":"[]","TextColor21:arraystr":"[]","TextColor22:arraystr":"[]","TextColor23:arraystr":"[]","TextColor24:arraystr":"[]","TextColor25:arraystr":"[]","TextColor26:arraystr":"[]","TextColor27:arraystr":"[]","TextColor28:arraystr":"[]","TextColor29:arraystr":"[]","TextColor30:arraystr":"[]","TextColor31:arraystr":"[]"}
 *
 * @param TextCodeActions:arraystruct
 * @text Text Code Actions
 * @type struct<TextCodeAction>[]
 * @desc Text codes that perform actions.
 * @default ["{\"Match:str\":\"ChangeFace\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const filename = data[0].trim();\\\\n    const index = parseInt(data[1] || '0');\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"FaceIndex\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst index = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    const filename = $gameMessage.faceName();\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"TextDelay\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst delay = this.obtainEscapeParam(textState);\\\\nif (textState.drawing && this.constructor === Window_Message) {\\\\n    this.setTextDelay(delay);\\\\n}\\\"\"}","{\"Match:str\":\"NormalBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(0);\\\\n}\\\"\"}","{\"Match:str\":\"DimBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(1);\\\\n}\\\"\"}","{\"Match:str\":\"TransparentBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(2);\\\\n}\\\"\"}","{\"Match:str\":\"FontChange\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst fontName = this.obtainEscapeString(textState);\\\\nthis.contents.fontFace = fontName;\\\"\"}","{\"Match:str\":\"ResetFont\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetFontSettings();\\\"\"}","{\"Match:str\":\"ResetColor\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetTextColor();\\\"\"}","{\"Match:str\":\"HexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeTextColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineColor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst colorIndex = this.obtainEscapeParam(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(ColorManager.textColor(colorIndex));\\\\n}\\\"\"}","{\"Match:str\":\"OutlineHexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineWidth\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst width = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    this.contents.outlineWidth = width;\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveTo\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : this.x;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : this.y;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : this.width;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : this.height;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveTo(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveBy\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : 0;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : 0;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : 0;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : 0;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveBy(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowReset\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    const frames = 20;\\\\n    const easingType = 0;\\\\n    this.resetRect(frames, easingType);\\\\n}\\\"\"}"]
 *
 * @param TextCodeReplace:arraystruct
 * @text Text Code Replacements
 * @type struct<TextCodeReplace>[]
 * @desc Text codes that replace themselves with text.
 * @default ["{\"Match:str\":\"ActorFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const actorId = parseInt(arguments[1]);\\\\nconst actor = $gameActors.actor(actorId);\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"PartyFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const index = parseInt(arguments[1]) - 1;\\\\nconst actor = $gameParty.members()[index];\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"Class\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ClassName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Skill\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"SkillName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Item\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"Weapon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"LastGainObj\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = true;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjName\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = false;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjQuantity\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"return this.lastGainedObjectQuantity();\\\"\"}","{\"Match:str\":\"Armor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"State\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"StateName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Enemy\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"EnemyName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Troop\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMember\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMemberName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}"]
 *
 * @param TextMacros:arraystruct
 * @text Text Macros
 * @type struct<TextMacro>[]
 * @desc Macros that are used to quickly write batches of text.
 * @default ["{\"Match:str\":\"Example Macro\",\"TextStr:str\":\"This is the text that will be displayed when you type [Example Macro].\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}","{\"Match:str\":\"Leader\",\"TextStr:str\":\"\\\\P[1]\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}"]
 *
 * @param TextSpeed:struct
 * @text Text Speed Option Settings
 * @type struct<TextSpeed>
 * @desc Text Speed Options Menu settings.
 * @default {"AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Text Speed","Default:num":"10","Instant:str":"Instant"}
 *
 * @param WordWrap:struct
 * @text Word Wrap Settings
 * @type struct<WordWrap>
 * @desc Settings involving Word Wrap.
 * @default {"EnableWordWrap":"","MessageWindow:eval":"false","HelpWindow:eval":"false","Rules":"","LineBreakSpace:eval":"true","TightWrap:eval":"false"}
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
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param MessageWindow
 * @text Message Window
 *
 * @param MessageRows:num
 * @text Default Rows
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default number of rows to display for the Message Window.
 * @default 4
 *
 * @param MessageWidth:num
 * @text Default Width
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default Message Window width in pixels.
 * @default 816
 *
 * @param FastForwardKey:str
 * @text Fast Forward Key
 * @parent MessageWindow
 * @type combo
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc This is the key used for fast forwarding messages.
 * @default shift
 *
 * @param MessageTextDelay:num
 * @text Text Delay
 * @parent MessageWindow
 * @type num
 * @min 0
 * @desc How many frames to wait between characters drawn?
 * Use 0 for instant.
 * @default 1
 *
 * @param StretchDimmedBg:eval
 * @text Stretch Dimmed BG
 * @parent MessageWindow
 * @type boolean
 * @on Stretch
 * @off Don't
 * @desc Stretch dimmed window background to fit the whole screen.
 * @default true
 *
 * @param NameBoxWindow
 * @text Name Box Window
 *
 * @param NameBoxWindowDefaultColor:num
 * @text Default Color
 * @parent NameBoxWindow
 * @min 0
 * @max 31
 * @desc Default color for the Name Box Window's text.
 * @default 6
 *
 * @param NameBoxWindowOffsetX:num
 * @text Offset X
 * @parent NameBoxWindow
 * @desc How much to offset the name box window X by (as long as it doesn't go offscreen).
 * @default 0
 *
 * @param NameBoxWindowOffsetY:num
 * @text Offset Y
 * @parent NameBoxWindow
 * @desc How much to offset the name box window Y by (as long as it doesn't go offscreen).
 * @default 0
 *
 * @param ChoiceListWindow
 * @text Choice List Window
 *
 * @param ChoiceWindowLineHeight:num
 * @text Line Height
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc What is the default line height for Show Choices?
 * @default 36
 *
 * @param ChoiceWindowMaxRows:num
 * @text Max Rows
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of rows to visibly display?
 * @default 8
 *
 * @param ChoiceWindowMaxCols:num
 * @text Max Columns
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of columns to visibly display?
 * @default 1
 *
 * @param ChoiceWindowTextAlign:str
 * @text Text Alignment
 * @parent ChoiceListWindow
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Default alignment for Show Choice window.
 * @default default
 *
 * @param DefaultTextCodes
 * @text Default Text Codes
 *
 * @param RelativePXPY:eval
 * @text Relative \PX \PY
 * @parent DefaultTextCodes
 * @type boolean
 * @on Better
 * @off Normal
 * @desc Make \PX[x] and \PY[x] adjust relative starting position than exact coordinates.
 * @default true
 *
 * @param FontBiggerCap:eval
 * @text \{ Maximum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the maximum size that \{ can reach.
 * @default 108
 *
 * @param FontSmallerCap:eval
 * @text \} Minimum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the minimum size that \} can reach.
 * @default 12
 *
 * @param FontChangeValue:eval
 * @text \{ Change \}
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc How much does \{ and \} change font size by?
 * @default 12
 *
 */
/* ----------------------------------------------------------------------------
 * Auto Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutoColor:
 *
 * @param DatabaseHighlighting
 * @text Database Highlighting
 *
 * @param Actors:str
 * @text Actors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Actor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 6
 *
 * @param Classes:str
 * @text Classes
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Class's name is given this text color.
 * Use 0 to not auto-color.
 * @default 4
 *
 * @param Skills:str
 * @text Skills
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Skill's name is given this text color.
 * Use 0 to not auto-color.
 * @default 4
 *
 * @param Items:str
 * @text Items
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Item's name is given this text color.
 * Use 0 to not auto-color.
 * @default 4
 *
 * @param Weapons:str
 * @text Weapons
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Weapon's name is given this text color.
 * Use 0 to not auto-color.
 * @default 4
 *
 * @param Armors:str
 * @text Armors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Armor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 4
 *
 * @param Enemies:str
 * @text Enemies
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Enemy's name is given this text color.
 * Use 0 to not auto-color.
 * @default 2
 *
 * @param States:str
 * @text States
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a State's name is given this text color.
 * Use 0 to not auto-color.
 * @default 4
 *
 * @param WordHighlighting
 * @text Word Highlighting
 *
 * @param TextColor1:arraystr
 * @text \C[1]: Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor2:arraystr
 * @text \C[2]: Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor3:arraystr
 * @text \C[3]: Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor4:arraystr
 * @text \C[4]: Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor5:arraystr
 * @text \C[5]: Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor6:arraystr
 * @text \C[6]: Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor7:arraystr
 * @text \C[7]: Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor8:arraystr
 * @text \C[8]: Light Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor9:arraystr
 * @text \C[9]: Dark Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor10:arraystr
 * @text \C[10]: Dark Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor11:arraystr
 * @text \C[11]: Dark Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor12:arraystr
 * @text \C[12]: Dark Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor13:arraystr
 * @text \C[13]: Dark Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor14:arraystr
 * @text \C[14]: Solid Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor15:arraystr
 * @text \C[15]: Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor16:arraystr
 * @text \C[16]: System Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor17:arraystr
 * @text \C[17]: Crisis Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor18:arraystr
 * @text \C[18]: Dead Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor19:arraystr
 * @text \C[19]: Outline Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor20:arraystr
 * @text \C[20]: HP Orange 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor21:arraystr
 * @text \C[21]: HP Orange 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor22:arraystr
 * @text \C[22]: MP Blue 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor23:arraystr
 * @text \C[23]: MP Blue 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor24:arraystr
 * @text \C[24]: Param Up Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor25:arraystr
 * @text \C[25]: Param Down Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor26:arraystr
 * @text \C[26]: System Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor27:arraystr
 * @text \C[27]: System Pink
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor28:arraystr
 * @text \C[28]: TP Green 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor29:arraystr
 * @text \C[29]: TP Green 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor30:arraystr
 * @text \C[30]: EXP Purple 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor31:arraystr
 * @text \C[31]: EXP Purple 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Actions
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeAction:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param CommonEvent:num
 * @text Common Event
 * @type common_event
 * @desc Select a common event to run when this text code is used in a message.
 * @default 0
 *
 * @param ActionJS:func
 * @text JS: Action
 * @type note
 * @desc JavaScript code used to perform an action when this text code appears.
 * @default "const textState = arguments[0];"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Replacements
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeReplace:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The text that will appear if this match appears.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this match appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Macro
 * ----------------------------------------------------------------------------
 */
/*~struct~TextMacro:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this macro to work.
 * @default Key
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The replacement text that will appear from the macro.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this macro appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Speed Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TextSpeed:
 *
 * @param AddOption:eval
 * @text Add Option?
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Text Speed' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @desc Command name of the option.
 * @default Text Speed
 *
 * @param Default:num
 * @text Default Value
 * @type number
 * @min 1
 * @max 11
 * @desc 1 - 10, slowest to fastest.
 * 11 is instant value.
 * @default 10
 *
 * @param Instant:str
 * @text Instant Speed
 * @desc Text to show "instant" text.
 * @default Instant
 *
 */
/* ----------------------------------------------------------------------------
 * Word Wrap Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~WordWrap:
 *
 * @param EnableWordWrap
 * @text Enable Word Wrap
 *
 * @param MessageWindow:eval
 * @text Message Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param HelpWindow:eval
 * @text Help Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param Rules
 * @text Rules
 *
 * @param LineBreakSpace:eval
 * @text Link Break -> Space
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Convert manually placed (non tagged) line breaks with spaces?
 * @default true
 *
 * @param TightWrap:eval
 * @text Tight Wrap
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc If a face graphic is present in a message, word wrap will be tighter.
 * @default false
 *
 */
//=============================================================================

const _0x37c9=['isMessageWindowWordWrap','prototype','onNewPageMessageCore','_messagePositionReset','Weapons','setTextDelay','nextEventCode','push','_index','lineHeight','Width','outputWidth','loadPicture','COLORLOCK','surprise','stretchDimmerSprite','updateBackground','index','ConfigManager_applyData','AutoColor','Window_Message_newPage','FontSmallerCap','processControlCharacter','prepareShowTextCommand','UZvZB','clearCommandList','textCodeResult','</LEFT>','PEfJM','processAllText','maxCols','Window_Options_makeCommandList','drawBackPicture','\x5c%1','aDcSJ','quantity','updateOffsetPosition','setLastGainedItemData','_textDelay','AMpxz','Name','getPreservedFontSettings','onDatabaseLoaded','AddAutoColor','preConvertEscapeCharacters','helpWordWrap','lSvyg','toUpperCase','preemptive','_moveTargetY','blt','changeVolume','_indent','processPreviousColor','AJleu','processStoredAutoColorChanges','Instant','BbRiD','apVyD','messageWidth','mainFontFace','activate','setupChoices','adjustShowChoiceExtension','WordWrap','WRAPBREAK','xvTSS','cnMQy','changeOutlineColor','textSizeExTextAlignment','victory','addExtraShowChoices','setColorLock','GZjlX','DLTxL','</B>','adjustShowChoiceDefault','_autoPosRegExp','Window_Message_isTriggered','faceWidth','Settings','fontBold','_autoSizeRegexp','setMessageWindowRows','addMessageCoreCommands','mainFontSize','updateOverlappingY','registerActorNameAutoColorChanges','_list','VHdFY','QDhJS','SWITCH','tnxQe','prepareWordWrapEscapeCharacters','_moveTargetHeight','WfOJq','ConvertTextAutoColorRegExpFriendly','indent','Center','Window_Message_terminateMessage','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','textSpeedStatusText','clearActorNameAutoColor','StretchDimmedBg','filter','aLiAw','processNewLine','processActorNameAutoColorChanges','MessageWindowProperties','canMove','_textDelayCount','DISABLE','instantTextSpeed','updateMove','PREVCOLOR','MessageWidth','AutoColorRegExp','_dimmerSprite','WAIT','TextStr','TextJS','processFontChangeBold','setRelativePosition','fOQYM','TightWrap','default','slice','TextCodeActions','center','Window_NameBox_updatePlacement','moveBy','tzqYo','shift','RelativePXPY','substr','isRunning','Game_Party_initialize','LineBreakSpace','WrapBreak[0]','<LEFT>','ActionJS','processTextAlignmentX','applyMoveEasing','gacrf','HcGhS','<COLORLOCK>','nKYJp','Skills','exit','JfVjG','ChoiceWindowMaxCols','processPxTextCode','dTaYZ','text','getChoiceListLineHeight','setupNumInput','false','escapeStart','textWidth','Xdysf','convertTextMacros','windowWidth','bCkha','isSceneBattle','commandName','rtl','ITALIC[1]','actor','calcMoveEasing','makeFontSmaller','processCommonEvent','YlwLU','indexOf','wNrTG','textCodeCheck','[0]','getMessageWindowWidth','start','dVtKP','resetPositionX','inBattle','setBackground','Window_ChoiceList_updatePlacement','convertShowChoiceEscapeCodes','_moveEasingType','NWVFn','process_VisuMZ_MessageCore_TextCodes_Action','wTPbD','FontChangeValue','Actors','kfjhF','fyWZB','fontItalic','Window_Base_processEscapeCharacter','(((','constructor','AddOption','initTextAlignement','refreshDimmerBitmap','colSpacing','setupEvents','XwrNO','_textAlignment','databaseObjectName','width','cgnPO','convertTextAlignmentEscapeCharacters','refresh','setChoiceListLineHeight','applyDatabaseAutoColor','NameBoxWindowDefaultColor','TextManager_message','updateRelativePosition','process_VisuMZ_MessageCore_TextCodes_Replace','Window_Message_updatePlacement','isArmor','followers','easeIn','height','NameBoxWindowOffsetY','<RIGHT>','SWITCHES','EjUrq','processFontChangeItalic','map\x20party','processTextAlignmentChange','processCustomWait','max','min','Window_Base_processControlCharacter','setup','COMMONEVENT','AdjustRect','_resetRect','TEXTALIGNMENT','unshift','pYcTy','windowX','battle\x20actor','choice','itemPadding','VisuMZ_0_CoreEngine','sort','makeDeepCopy','resetTextColor','isItem','zBMgF','BOLD[1]','selectDefault','newPage','itemLineRect','eBzNT','vaLon','BpHcz','easeInOut','processColorLock','XrRSt','CommonEvent','convertMessageCoreEscapeActions','left','actorName','ChoiceWindowTextAlign','Game_Interpreter_setupChoices','drawBackCenteredPicture','MaxCols','_centerMessageWindow','setChoiceListMaxRows','split','getChoiceListMaxRows','messageCoreWindowX','processAutoSize','_autoColorActorNames','convertFontSettingsEscapeCharacters','setWaitMode','C[%1]%2PREVCOLOR[0]','YaATf','_nameBoxWindow','members','processPyTextCode','Game_Map_initialize','Game_Party_gainItem','azuNx','_spriteset','clampPlacementPosition','setSpeakerName','Window_Base_update','textSizeEx','ITALIC[0]','JUGhn','vAqTB','getChoiceListMaxColumns','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','Items','QKuPN','calcWindowHeight','return\x20\x27','process_VisuMZ_MessageCore_AutoColor','isAutoColorAffected','_autoSizeCheck','createTextState','boxHeight','onProcessCharacter','bfybs','Undefined','choiceLineHeight','bFaCe','Scene_Boot_onDatabaseLoaded','isWordWrapEnabled','postConvertEscapeCharacters','processFsTextCode','obtainEscapeString','lHTdV','ChoiceWindowLineHeight','openness','outputHeight','changeTextSpeed','format','map\x20player','return\x200','ENABLE','ChoiceWindowMaxRows','pIuhC','partyMemberName','_moveTargetWidth','setupItemChoice','addMessageCommonEvent','IQfuo','length','CENTERPICTURE','addMessageCoreTextSpeedCommand','FontBiggerCap','Game_System_initialize','createContents','getChoiceListTextAlign','Window_Options_statusText','updateMessageCommonEvents','PJTxW','messageRows','Match','LineHeight','command101','paintOpacity','map\x20event','isWeapon','defeat','outlineWidth','returnPreservedFontSettings','AOkfp','Type','</WORDWRAP>','prepareShowTextFollowups','drawing','DFSGU','addLoadListener','isBreakShowTextCommands','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','processCharacter','numVisibleRows','ceil','hhVdb','exec','bSMvj','dIzNU','General','isVolumeSymbol','TextAlign','event','clear','_relativePosition','call','_wholeMoveDuration','MessageWindow','_scene','cFSHs','</RIGHT>','XXvAp','launchMessageCommonEvent','TEXTALIGNMENT[2]','floor','processEscapeCharacter','PxRfj','TxOLw','TEXTALIGNMENT[0]','mLAPn','messageWindowRect','placeCancelButton','name','windowPadding','startY','choiceRows','itemRectWithPadding','CreateAutoColorRegExpLists','_showFast','_moveDuration','addWrapBreakAfterPunctuation','Default','BOLD','updateAutoPosition','convertVariableEscapeCharacters','lastGainedObjectName','ixMmu','choiceTextAlign','gwshJ','clamp','processWrapBreak','Window_Base_changeTextColor','getTextAlignment','maxCommands','COLORLOCK[0]','contents','battle\x20party','ConfigManager_makeData','obtainEscapeParam','TEXTALIGNMENT[3]','txeAr','textColor','makeFontBigger','ZEMLu','fontSize','FastForwardKey','toLowerCase','iconIndex','uzjwt','list','updateEvents','initialize','zMFYl','bouOd','TextCodeReplace','sNEwg','isRTL','ERHzY','choicePositionType','none','HelpWindow','JSON','choiceCols','parameters','sbsHg','convertEscapeCharacters','myqJJ','remove','setWordWrap','BOLD[0]','RRmng','obtainGold','ukidx','innerWidth','_texts','Window_Options_changeVolume','contentsBack','registerCommand','setFaceImage','maxLines','_MessageCoreSettings','<CENTER>','choices','match','isChoiceVisible','ARRAYNUM','hoyop','replace','JxjiO','_eventId','map','description','UOlFr','startX','updateAutoSizePosition','TextSpeed','_commonEventId','_messageWindow','trim','CreateAutoColorRegExpListEntries','EVAL','Window_Base_initialize','TEXTALIGNMENT[1]','boxWidth','applyData','ogpHw','_cancelButton','Scene_Options_maxCommands','close','jaPbj','processAutoPosition','sOEcr','commandSymbol','PICTURE','Window_NameBox_refresh','adjustShowChoiceCancel','iFxUP','States','itemHeight','getLastGainedItemData','<WORDWRAP>','code','Game_Map_setupEvents','registerResetRect','Kgupe','scale','addContinuousShowTextCommands','TEXTALIGNMENT','true','maxChoiceWidth','add','easeOut','isBusy','faceName','isHelpWindowWordWrap','changePaintOpacity','STRUCT','Window_Base_processAllText','utxHt','<%1>','rzPhW','STR','Armors','ChoiceWindowProperties','Window_ChoiceList_windowX','messageCoreTextSpeed','messageWordWrap','lhmli','rguls','includes','SortObjectByKeyLength','prepareAutoSizeEscapeCharacters','_moveTargetX','substring','join','process_VisuMZ_MessageCore_TextMacros','NUM','</I>','LxhAg','MessageTextDelay','levelUp','terminateMessage','Window_Help_refresh','processMessageCoreEscapeActions','HyaGw','isCommandEnabled','TextMacros','currentCommand','parse','ALL','MaxRows','ddpeN','maxFontSizeInLine','processDrawCenteredPicture','fontFace','_textColorStack','i[%1]%2','processAutoColorWords','setChoiceListMaxColumns','_wordWrap','statusText','Window_Message_clearFlags','open','isContinuePrepareShowTextCommands','changeValue','addContinuousShowChoices','convertBackslashCharacters','zRxGg','processDrawPicture','outlineColor','Window_Options_isVolumeSymbol','ARRAYFUNC','setChoiceListTextAlign','HtxkD','BqOdR','changeTextColor','_messageCommonEvents','makeData','_lastGainedItemData','fXYZx','moveTo','messagePositionReset','Rows','ConvertParams','MessageCore','outLineColor','Window_Base_processNewLine','isSceneMap','resetRect','normalColor','isTriggered','isColorLocked','setPositionType','convertLockColorsEscapeCharacters','startWait','makeCommandList','<B>','updatePlacement','ARRAYSTR','message','update','_autoPositionTarget','isPressed','status','getMessageWindowRows','addCommand','resetFontSettings','map\x20actor','NameBoxWindowOffsetX','isChoiceEnabled','updateNameBoxMove','initMessageCore','clearFlags','splice','mainSprite','Window_Message_processEscapeCharacter','type','textSizeExWordWrap','TUERG','GmYQx','IrRmT','<I>','AutoColorBypassList','setTextAlignment','textSpeed','updateDimensions','onChoice','bind','Window_Message_synchronizeNameBox','Classes','value','resetWordWrap','HIDE','battle\x20enemy','_interpreter','ZlpCl','dwORe','<LINE\x20BREAK>','Enemies','ARRAYSTRUCT','SZZCy','Mrjtj','COLORLOCK[1]','Game_Map_updateEvents','_positionType','setMessageWindowWidth','obtainExp','tJIsr','round','padding'];(function(_0x32ce7d,_0x37c9a1){const _0x316505=function(_0x14cb52){while(--_0x14cb52){_0x32ce7d['push'](_0x32ce7d['shift']());}};_0x316505(++_0x37c9a1);}(_0x37c9,0x139));const _0x3165=function(_0x32ce7d,_0x37c9a1){_0x32ce7d=_0x32ce7d-0x0;let _0x316505=_0x37c9[_0x32ce7d];return _0x316505;};var label=_0x3165('0x109'),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x3165('0x1b3')](function(_0x463b87){return _0x463b87[_0x3165('0x11c')]&&_0x463b87[_0x3165('0x98')][_0x3165('0xd2')]('['+label+']');})[0x0];VisuMZ[label][_0x3165('0x19b')]=VisuMZ[label][_0x3165('0x19b')]||{},VisuMZ['ConvertParams']=function(_0x54b990,_0x57fa2d){for(const _0x5ca24f in _0x57fa2d){if(_0x5ca24f[_0x3165('0x90')](/(.*):(.*)/i)){if(_0x3165('0xa6')!==_0x3165('0x44')){const _0x506ec4=String(RegExp['$1']),_0x39938a=String(RegExp['$2'])[_0x3165('0x17a')]()[_0x3165('0x9f')]();let _0x1cc2fe,_0x3ad078,_0x24de35;switch(_0x39938a){case _0x3165('0xd9'):_0x1cc2fe=_0x57fa2d[_0x5ca24f]!==''?Number(_0x57fa2d[_0x5ca24f]):0x0;break;case _0x3165('0x92'):_0x3ad078=_0x57fa2d[_0x5ca24f]!==''?JSON[_0x3165('0xe5')](_0x57fa2d[_0x5ca24f]):[],_0x1cc2fe=_0x3ad078[_0x3165('0x97')](_0x85c16a=>Number(_0x85c16a));break;case _0x3165('0xa1'):_0x1cc2fe=_0x57fa2d[_0x5ca24f]!==''?eval(_0x57fa2d[_0x5ca24f]):null;break;case'ARRAYEVAL':_0x3ad078=_0x57fa2d[_0x5ca24f]!==''?JSON[_0x3165('0xe5')](_0x57fa2d[_0x5ca24f]):[],_0x1cc2fe=_0x3ad078[_0x3165('0x97')](_0x165f99=>eval(_0x165f99));break;case _0x3165('0x7a'):_0x1cc2fe=_0x57fa2d[_0x5ca24f]!==''?JSON[_0x3165('0xe5')](_0x57fa2d[_0x5ca24f]):'';break;case'ARRAYJSON':_0x3ad078=_0x57fa2d[_0x5ca24f]!==''?JSON['parse'](_0x57fa2d[_0x5ca24f]):[],_0x1cc2fe=_0x3ad078[_0x3165('0x97')](_0x1b547d=>JSON[_0x3165('0xe5')](_0x1b547d));break;case'FUNC':_0x1cc2fe=_0x57fa2d[_0x5ca24f]!==''?new Function(JSON[_0x3165('0xe5')](_0x57fa2d[_0x5ca24f])):new Function(_0x3165('0x5'));break;case _0x3165('0xfc'):_0x3ad078=_0x57fa2d[_0x5ca24f]!==''?JSON['parse'](_0x57fa2d[_0x5ca24f]):[],_0x1cc2fe=_0x3ad078[_0x3165('0x97')](_0x1a0f57=>new Function(JSON['parse'](_0x1a0f57)));break;case _0x3165('0xca'):_0x1cc2fe=_0x57fa2d[_0x5ca24f]!==''?String(_0x57fa2d[_0x5ca24f]):'';break;case _0x3165('0x117'):_0x3ad078=_0x57fa2d[_0x5ca24f]!==''?JSON[_0x3165('0xe5')](_0x57fa2d[_0x5ca24f]):[],_0x1cc2fe=_0x3ad078['map'](_0x30d960=>String(_0x30d960));break;case _0x3165('0xc5'):_0x24de35=_0x57fa2d[_0x5ca24f]!==''?JSON[_0x3165('0xe5')](_0x57fa2d[_0x5ca24f]):{},_0x54b990[_0x506ec4]={},VisuMZ['ConvertParams'](_0x54b990[_0x506ec4],_0x24de35);continue;case _0x3165('0x140'):_0x3ad078=_0x57fa2d[_0x5ca24f]!==''?JSON['parse'](_0x57fa2d[_0x5ca24f]):[],_0x1cc2fe=_0x3ad078[_0x3165('0x97')](_0x2389dc=>VisuMZ['ConvertParams']({},JSON[_0x3165('0xe5')](_0x2389dc)));break;default:continue;}_0x54b990[_0x506ec4]=_0x1cc2fe;}else{function _0x37f6b6(){return this[_0x3165('0x274')]()&&(_0x4e42ff=this[_0x3165('0x182')](_0x425b4c),_0x1ba170=this[_0x3165('0x1b6')](_0x1a939f)),_0x3ff888;}}}}return _0x54b990;},(_0x41f5cb=>{const _0x35e3e4=_0x41f5cb[_0x3165('0x49')];for(const _0x138b80 of dependencies){if(_0x3165('0xf8')!==_0x3165('0x7d')){if(!Imported[_0x138b80]){alert(_0x3165('0x26e')[_0x3165('0x3')](_0x35e3e4,_0x138b80)),SceneManager[_0x3165('0x1df')]();break;}}else{function _0x48be89(){const _0x2b1731=_0x4a85fc[_0x3165('0x49')],_0x2f620f=this[_0x3165('0x269')](_0x2b1731)['width'],_0x50e6c9=_0x9cc8[_0x3165('0x2d')](_0x2f620f)+this[_0x3165('0x23b')]()*0x2;_0xec53<_0x50e6c9&&(_0xcfa992=_0x50e6c9);}}}const _0x1a0a38=_0x41f5cb[_0x3165('0x98')];if(_0x1a0a38['match'](/\[Version[ ](.*?)\]/i)){const _0x2b3164=Number(RegExp['$1']);_0x2b3164!==VisuMZ[label]['version']&&(alert(_0x3165('0x1af')[_0x3165('0x3')](_0x35e3e4,_0x2b3164)),SceneManager['exit']());}if(_0x1a0a38[_0x3165('0x90')](/\[Tier[ ](\d+)\]/i)){if(_0x3165('0x1a7')===_0x3165('0x1a7')){const _0x18dddc=Number(RegExp['$1']);if(_0x18dddc<tier){if(_0x3165('0xc9')!==_0x3165('0x12b'))alert(_0x3165('0x2a')['format'](_0x35e3e4,_0x18dddc,tier)),SceneManager[_0x3165('0x1df')]();else{function _0x1bd3ee(){if(this[_0x3165('0x8d')]===_0x378f30)this[_0x3165('0x124')]();if(this[_0x3165('0x8d')][_0x3165('0xcf')]===_0x3249a8)this[_0x3165('0x124')]();this['_MessageCoreSettings']['messageWordWrap']=_0x1b57c5;}}}else tier=Math[_0x3165('0x22e')](_0x18dddc,tier);}else{function _0x4c2103(){const _0x4131af=_0x3f84e4[_0x3165('0x109')][_0x3165('0x19b')][_0x3165('0x15e')];let _0x42c5ee=0x0;if(_0x330a27===_0x23cfd3)_0x42c5ee=_0x4131af[_0x3165('0x208')];if(_0x48b251===_0x396bd7)_0x42c5ee=_0x4131af[_0x3165('0x136')];if(_0x31e20d===_0x5cf3c1)_0x42c5ee=_0x4131af['Skills'];if(_0x1ed83e===_0x35de4c)_0x42c5ee=_0x4131af[_0x3165('0x26f')];if(_0x28b4a1===_0x51c863)_0x42c5ee=_0x4131af[_0x3165('0x14f')];if(_0x5c07fd===_0x45db9b)_0x42c5ee=_0x4131af[_0x3165('0xcb')];if(_0xc68083===_0x3df3ec)_0x42c5ee=_0x4131af[_0x3165('0x13f')];if(_0x2aa8f9===_0x23f4cd)_0x42c5ee=_0x4131af[_0x3165('0xb2')];return _0x42c5ee>0x0&&(_0x40ebfc=_0x3165('0x25d')['format'](_0x42c5ee,_0x2da8bb)),_0xbd6ef8;}}}VisuMZ[_0x3165('0x108')](VisuMZ[label][_0x3165('0x19b')],_0x41f5cb[_0x3165('0x7c')]);})(pluginData),PluginManager[_0x3165('0x8a')](pluginData[_0x3165('0x49')],_0x3165('0xcc'),_0x96c8f=>{VisuMZ[_0x3165('0x108')](_0x96c8f,_0x96c8f);const _0x3218f2=_0x96c8f[_0x3165('0x1a')]||$gameSystem[_0x3165('0x1e5')]()||0x1,_0x1203af=_0x96c8f[_0x3165('0xe7')]||$gameSystem[_0x3165('0x257')]()||0x1,_0x370490=_0x96c8f[_0x3165('0x253')]||$gameSystem[_0x3165('0x26d')]()||0x1,_0x2929fe=_0x96c8f[_0x3165('0x34')]['toLowerCase']()||'default';$gameSystem['setChoiceListLineHeight'](_0x3218f2),$gameSystem[_0x3165('0x255')](_0x1203af),$gameSystem[_0x3165('0xef')](_0x370490),$gameSystem[_0x3165('0xfd')](_0x2929fe);}),PluginManager[_0x3165('0x8a')](pluginData['name'],_0x3165('0x1b7'),_0x506847=>{VisuMZ[_0x3165('0x108')](_0x506847,_0x506847);const _0x42ae2a=_0x506847[_0x3165('0x107')]||$gameSystem[_0x3165('0x11d')]()||0x1,_0x5e92e9=_0x506847[_0x3165('0x155')]||$gameSystem[_0x3165('0x1fb')]()||0x1;$gameTemp[_0x3165('0x254')]=_0x506847[_0x3165('0x1ad')]||![];const _0x51af50=_0x506847['WordWrap'][_0x3165('0x6b')]();$gameSystem[_0x3165('0x19e')](_0x42ae2a),$gameSystem['setMessageWindowWidth'](_0x5e92e9);[_0x3165('0xbd'),_0x3165('0x1e7')][_0x3165('0xd2')](_0x51af50)&&$gameSystem['setMessageWindowWordWrap'](eval(_0x51af50));const _0x3116b9=SceneManager['_scene']['_messageWindow'];_0x3116b9&&(_0x3116b9[_0x3165('0x138')](),_0x3116b9[_0x3165('0x132')](),_0x3116b9[_0x3165('0x13')]());}),VisuMZ[_0x3165('0x109')][_0x3165('0x27d')]=Scene_Boot['prototype']['onDatabaseLoaded'],Scene_Boot[_0x3165('0x14c')][_0x3165('0x175')]=function(){VisuMZ[_0x3165('0x109')][_0x3165('0x27d')][_0x3165('0x38')](this),this[_0x3165('0x205')](),this[_0x3165('0x220')](),this[_0x3165('0xd8')](),this[_0x3165('0x273')]();},VisuMZ[_0x3165('0x109')][_0x3165('0xd3')]=function(_0x3f3fd1){const _0x18efc5=VisuMZ[_0x3165('0x109')][_0x3165('0x19b')][_0x3f3fd1];_0x18efc5['sort']((_0x10e984,_0xc090dd)=>{if(!_0x10e984||!_0xc090dd)return-0x1;return _0xc090dd[_0x3165('0x19')][_0x3165('0xe')]-_0x10e984['Match'][_0x3165('0xe')];});},Scene_Boot[_0x3165('0x14c')][_0x3165('0x205')]=function(){VisuMZ[_0x3165('0x109')][_0x3165('0xd3')](_0x3165('0x1ca'));for(const _0xcc6ec1 of VisuMZ[_0x3165('0x109')][_0x3165('0x19b')][_0x3165('0x1ca')]){_0xcc6ec1[_0x3165('0x19')]=_0xcc6ec1[_0x3165('0x19')]['toUpperCase'](),_0xcc6ec1['textCodeCheck']=new RegExp(''+_0xcc6ec1[_0x3165('0x19')],'gi'),_0xcc6ec1[_0x3165('0x165')]=''+_0xcc6ec1[_0x3165('0x19')];if(_0xcc6ec1[_0x3165('0x23')]==='')_0xcc6ec1[_0x3165('0x165')]+=_0x3165('0x1fa');}},Scene_Boot[_0x3165('0x14c')][_0x3165('0x220')]=function(){VisuMZ[_0x3165('0x109')][_0x3165('0xd3')](_0x3165('0x73'));for(const _0x1e2cad of VisuMZ[_0x3165('0x109')][_0x3165('0x19b')][_0x3165('0x73')]){if('SFrOP'!=='SFrOP'){function _0x4d29ae(){return!![];}}else _0x1e2cad[_0x3165('0x1f9')]=new RegExp(''+_0x1e2cad[_0x3165('0x19')]+_0x1e2cad[_0x3165('0x23')],'gi'),_0x1e2cad['TextStr']!==''&&_0x1e2cad[_0x3165('0x1c2')]!==_0x3165('0x27a')?_0x1e2cad[_0x3165('0x165')]=new Function(_0x3165('0x272')+_0x1e2cad[_0x3165('0x1c2')][_0x3165('0x94')](/\\/g,'')+'\x27'):_0x1e2cad[_0x3165('0x165')]=_0x1e2cad['TextJS'];}},Scene_Boot[_0x3165('0x14c')]['process_VisuMZ_MessageCore_TextMacros']=function(){for(const _0x536072 of VisuMZ[_0x3165('0x109')][_0x3165('0x19b')][_0x3165('0xe3')]){_0x536072[_0x3165('0x1f9')]=new RegExp('\x5c['+_0x536072[_0x3165('0x19')]+'\x5c]','gi');if(_0x536072[_0x3165('0x1c2')]!==''&&_0x536072[_0x3165('0x1c2')]!==_0x3165('0x27a'))_0x536072['textCodeResult']=new Function('return\x20\x27'+_0x536072['TextStr']['replace'](/\\/g,'')+'\x27');else{if(_0x3165('0x167')===_0x3165('0x26b')){function _0xd8c05c(){return this[_0x3165('0x9e')]?this['messageCoreWindowX']():_0x2df9cc[_0x3165('0x109')][_0x3165('0xcd')][_0x3165('0x38')](this);}}else _0x536072[_0x3165('0x165')]=_0x536072[_0x3165('0x1c3')];}}},Scene_Boot[_0x3165('0x14c')]['process_VisuMZ_MessageCore_AutoColor']=function(){const _0x2de11e=VisuMZ[_0x3165('0x109')][_0x3165('0x19b')][_0x3165('0x15e')];VisuMZ[_0x3165('0x109')][_0x3165('0x176')]($dataClasses,_0x2de11e[_0x3165('0x136')]),VisuMZ[_0x3165('0x109')]['AddAutoColor']($dataSkills,_0x2de11e[_0x3165('0x1de')]),VisuMZ[_0x3165('0x109')][_0x3165('0x176')]($dataItems,_0x2de11e[_0x3165('0x26f')]),VisuMZ[_0x3165('0x109')][_0x3165('0x176')]($dataWeapons,_0x2de11e[_0x3165('0x14f')]),VisuMZ[_0x3165('0x109')][_0x3165('0x176')]($dataArmors,_0x2de11e[_0x3165('0xcb')]),VisuMZ[_0x3165('0x109')]['AddAutoColor']($dataEnemies,_0x2de11e[_0x3165('0x13f')]),VisuMZ[_0x3165('0x109')]['AddAutoColor']($dataStates,_0x2de11e[_0x3165('0xb2')]),VisuMZ[_0x3165('0x109')][_0x3165('0x4e')]();},VisuMZ[_0x3165('0x109')][_0x3165('0x12f')]=['V','N','P','C','I','PX','PY','G','{','}','<','>','FS','\x5c','$','.','|','!','<','>','^',_0x3165('0x115'),_0x3165('0x196'),_0x3165('0x12e'),_0x3165('0xda'),_0x3165('0x1d6'),_0x3165('0x166'),_0x3165('0x8e'),'</CENTER>',_0x3165('0x227'),_0x3165('0x3d'),_0x3165('0x1dc'),'</COLORLOCK>',_0x3165('0x20d'),')))',_0x3165('0xb5'),_0x3165('0x24'),'<BR>',_0x3165('0x13e'),_0x3165('0xae'),_0x3165('0xf'),_0x3165('0x232'),_0x3165('0x1c1'),'SHOW',_0x3165('0x139'),_0x3165('0x6'),_0x3165('0x1ba'),_0x3165('0x1a6'),_0x3165('0x228'),_0x3165('0xe6'),'ANY'],VisuMZ[_0x3165('0x109')][_0x3165('0x176')]=function(_0x23b458,_0x49ef24){if(_0x49ef24<=0x0)return;const _0x5d8bb7=VisuMZ[_0x3165('0x109')][_0x3165('0x19b')][_0x3165('0x15e')]['TextColor'+_0x49ef24],_0x224904=JsonEx[_0x3165('0x23e')](_0x23b458);for(const _0x53b4c8 of _0x224904){if(!_0x53b4c8)continue;let _0x363fc9=_0x53b4c8[_0x3165('0x49')]['trim']();if(VisuMZ[_0x3165('0x109')][_0x3165('0x12f')][_0x3165('0xd2')](_0x363fc9[_0x3165('0x17a')]()))continue;_0x363fc9=_0x363fc9[_0x3165('0x94')](/\\I\[(\d+)\]/gi,''),_0x363fc9=_0x363fc9[_0x3165('0x94')](/\x1bI\[(\d+)\]/gi,'');if(_0x363fc9[_0x3165('0xe')]<=0x0)continue;if(_0x363fc9['match'](/-----/i))continue;_0x5d8bb7[_0x3165('0x152')](_0x363fc9);}},VisuMZ[_0x3165('0x109')][_0x3165('0x4e')]=function(){VisuMZ[_0x3165('0x109')]['AutoColorRegExp']=[];for(let _0x1e92a9=0x1;_0x1e92a9<=0x1f;_0x1e92a9++){const _0x44780f='TextColor%1'['format'](_0x1e92a9),_0x261855=VisuMZ['MessageCore'][_0x3165('0x19b')][_0x3165('0x15e')][_0x44780f];_0x261855[_0x3165('0x23d')]((_0x473948,_0x902f16)=>{if('fOQYM'===_0x3165('0x1c6')){if(!_0x473948||!_0x902f16)return-0x1;return _0x902f16['length']-_0x473948[_0x3165('0xe')];}else{function _0x2f9920(){this[_0x3165('0x63')](_0x14a6cf);if(this[_0x3165('0x110')]())return;_0x31cf6d['drawing']&&(this[_0x3165('0xec')]=this[_0x3165('0xec')]||[],this[_0x3165('0x60')][_0x3165('0x66')]=this[_0x3165('0xec')][_0x3165('0x1cf')]()||_0x420f33['normalColor']());}}}),this['CreateAutoColorRegExpListEntries'](_0x261855,_0x1e92a9);}},VisuMZ[_0x3165('0x109')][_0x3165('0xa0')]=function(_0x37a3b4,_0x3d8355){for(const _0xfa5bd4 of _0x37a3b4){if(_0x3165('0x43')!==_0x3165('0x13d')){if(_0xfa5bd4[_0x3165('0xe')]<=0x0)continue;let _0x512f0f=VisuMZ[_0x3165('0x109')]['ConvertTextAutoColorRegExpFriendly'](_0xfa5bd4);if(_0xfa5bd4[_0x3165('0x90')](/[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g)){if(_0x3165('0x71')===_0x3165('0x71'))var _0x3c8022=new RegExp(_0x512f0f,'i');else{function _0x21e449(){_0x45f5dd[_0x3165('0x109')][_0x3165('0x15d')][_0x3165('0x38')](this,_0x44653d),_0x3165('0x131')in _0x20db2d?this[_0x3165('0x131')]=_0x8cc9cc(_0xf729e7[_0x3165('0x131')])[_0x3165('0x5a')](0x1,0xb):this[_0x3165('0x131')]=_0xbb5d8d['MessageCore'][_0x3165('0x19b')][_0x3165('0x9c')][_0x3165('0x52')];}}}else{if(_0x3165('0x1f6')==='YlwLU')var _0x3c8022=new RegExp('\x5cb'+_0x512f0f+'\x5cb','g');else{function _0x151a5c(){let _0x492b87=_0x2fb9cc[_0x3165('0x217')]+_0x52222b[_0x3165('0x4a')]()*0x2+0x6;const _0x14a917=_0x11b3f4[_0x3165('0xc2')]()!=='',_0x1569cd=_0x54ebf5[_0x3165('0x19a')],_0x35dde=0x14;_0x492b87+=_0x14a917?_0x1569cd+_0x35dde:0x4,_0x2aa8a3[_0x3165('0x146')](_0x492b87);}}}VisuMZ[_0x3165('0x109')]['AutoColorRegExp'][_0x3165('0x152')]([_0x3c8022,_0x3165('0x25d')[_0x3165('0x3')](_0x3d8355,_0xfa5bd4)]);}else{function _0x5a998e(){_0x58a373['MessageCore'][_0x3165('0x10b')][_0x3165('0x38')](this,_0x168bc4),this[_0x3165('0x1d8')](_0x57c86d);}}}},VisuMZ[_0x3165('0x109')]['ConvertTextAutoColorRegExpFriendly']=function(_0x2faf87){return _0x2faf87=_0x2faf87[_0x3165('0x94')](/(\W)/gi,(_0x2b3519,_0x1dff21)=>_0x3165('0x16c')[_0x3165('0x3')](_0x1dff21)),_0x2faf87;},SceneManager[_0x3165('0x1ee')]=function(){return this[_0x3165('0x3b')]&&this[_0x3165('0x3b')][_0x3165('0x20e')]===Scene_Battle;},SceneManager[_0x3165('0x10c')]=function(){return this[_0x3165('0x3b')]&&this[_0x3165('0x3b')][_0x3165('0x20e')]===Scene_Map;},VisuMZ[_0x3165('0x109')]['TextManager_message']=TextManager[_0x3165('0x118')],TextManager['message']=function(_0x3e257c){const _0x3d6333=[_0x3165('0xdd'),'emerge',_0x3165('0x17b'),_0x3165('0x159'),_0x3165('0x191'),_0x3165('0x1f'),_0x3165('0x1e8'),_0x3165('0x147'),_0x3165('0x84'),'obtainItem'];let _0xa882c8=VisuMZ[_0x3165('0x109')][_0x3165('0x21e')]['call'](this,_0x3e257c);return _0x3d6333[_0x3165('0xd2')](_0x3e257c)&&(_0xa882c8=_0x3165('0x24')+_0xa882c8),_0xa882c8;},ConfigManager[_0x3165('0x131')]=VisuMZ['MessageCore'][_0x3165('0x19b')][_0x3165('0x9c')][_0x3165('0x52')],VisuMZ[_0x3165('0x109')][_0x3165('0x62')]=ConfigManager[_0x3165('0x102')],ConfigManager[_0x3165('0x102')]=function(){const _0x5d29b9=VisuMZ[_0x3165('0x109')][_0x3165('0x62')][_0x3165('0x38')](this);return _0x5d29b9[_0x3165('0x131')]=this[_0x3165('0x131')],_0x5d29b9;},VisuMZ['MessageCore'][_0x3165('0x15d')]=ConfigManager[_0x3165('0xa5')],ConfigManager[_0x3165('0xa5')]=function(_0x3f4728){VisuMZ[_0x3165('0x109')][_0x3165('0x15d')]['call'](this,_0x3f4728);if(_0x3165('0x131')in _0x3f4728){if(_0x3165('0x16d')==='aDcSJ')this[_0x3165('0x131')]=Number(_0x3f4728[_0x3165('0x131')])[_0x3165('0x5a')](0x1,0xb);else{function _0x755ee7(){const _0x497f9d=_0xef3700[_0x3165('0xe5')]('['+_0xb846b1['$1']['match'](/\d+/g)+']');for(const _0x1721b1 of _0x497f9d){if(!_0x4e6e23[_0x3165('0x137')](_0x1721b1))return!![];}return![];}}}else{if(_0x3165('0x1ea')!=='Xdysf'){function _0x1ec3bf(){return _0x3c867b[_0x3165('0x1bb')];}}else this['textSpeed']=VisuMZ['MessageCore'][_0x3165('0x19b')]['TextSpeed'][_0x3165('0x52')];}},TextManager[_0x3165('0xce')]=VisuMZ[_0x3165('0x109')][_0x3165('0x19b')][_0x3165('0x9c')][_0x3165('0x173')],TextManager[_0x3165('0x1bb')]=VisuMZ[_0x3165('0x109')][_0x3165('0x19b')][_0x3165('0x9c')][_0x3165('0x183')],VisuMZ['MessageCore'][_0x3165('0x12')]=Game_System['prototype'][_0x3165('0x70')],Game_System[_0x3165('0x14c')][_0x3165('0x70')]=function(){VisuMZ[_0x3165('0x109')][_0x3165('0x12')][_0x3165('0x38')](this),this[_0x3165('0x124')]();},Game_System[_0x3165('0x14c')][_0x3165('0x124')]=function(){const _0xf2f7c9=VisuMZ[_0x3165('0x109')][_0x3165('0x19b')][_0x3165('0x32')],_0x15e6a3=VisuMZ[_0x3165('0x109')][_0x3165('0x19b')][_0x3165('0x18b')];this[_0x3165('0x8d')]={'messageRows':_0xf2f7c9['MessageRows'],'messageWidth':_0xf2f7c9[_0x3165('0x1be')],'messageWordWrap':_0x15e6a3[_0x3165('0x3a')],'helpWordWrap':_0x15e6a3[_0x3165('0x79')],'choiceLineHeight':_0xf2f7c9[_0x3165('0x283')],'choiceRows':_0xf2f7c9[_0x3165('0x7')],'choiceCols':_0xf2f7c9[_0x3165('0x1e1')],'choiceTextAlign':_0xf2f7c9[_0x3165('0x250')]};},Game_System[_0x3165('0x14c')][_0x3165('0x11d')]=function(){if(this[_0x3165('0x8d')]===undefined)this[_0x3165('0x124')]();if(this['_MessageCoreSettings'][_0x3165('0x18')]===undefined)this[_0x3165('0x124')]();return this[_0x3165('0x8d')][_0x3165('0x18')];},Game_System[_0x3165('0x14c')][_0x3165('0x19e')]=function(_0x210a22){if(this[_0x3165('0x8d')]===undefined)this[_0x3165('0x124')]();if(this[_0x3165('0x8d')]['messageRows']===undefined)this[_0x3165('0x124')]();this[_0x3165('0x8d')][_0x3165('0x18')]=_0x210a22||0x1;},Game_System[_0x3165('0x14c')][_0x3165('0x1fb')]=function(){if(this[_0x3165('0x8d')]===undefined)this[_0x3165('0x124')]();if(this[_0x3165('0x8d')][_0x3165('0x186')]===undefined)this[_0x3165('0x124')]();return this['_MessageCoreSettings']['messageWidth'];},Game_System[_0x3165('0x14c')][_0x3165('0x146')]=function(_0x1401eb){if(this[_0x3165('0x8d')]===undefined)this[_0x3165('0x124')]();if(this[_0x3165('0x8d')][_0x3165('0x186')]===undefined)this[_0x3165('0x124')]();this[_0x3165('0x8d')][_0x3165('0x186')]=_0x1401eb||0x1;},Game_System['prototype'][_0x3165('0x14b')]=function(){if(this[_0x3165('0x8d')]===undefined)this[_0x3165('0x124')]();if(this[_0x3165('0x8d')][_0x3165('0xcf')]===undefined)this[_0x3165('0x124')]();return this['_MessageCoreSettings'][_0x3165('0xcf')];},Game_System[_0x3165('0x14c')]['setMessageWindowWordWrap']=function(_0xa2734f){if(this[_0x3165('0x8d')]===undefined)this[_0x3165('0x124')]();if(this[_0x3165('0x8d')]['messageWordWrap']===undefined)this[_0x3165('0x124')]();this[_0x3165('0x8d')][_0x3165('0xcf')]=_0xa2734f;},Game_System[_0x3165('0x14c')][_0x3165('0xc3')]=function(){if(this[_0x3165('0x8d')]===undefined)this[_0x3165('0x124')]();if(this[_0x3165('0x8d')][_0x3165('0x178')]===undefined)this[_0x3165('0x124')]();return this[_0x3165('0x8d')][_0x3165('0x178')];},Game_System[_0x3165('0x14c')]['setHelpWindowWordWrap']=function(_0xe5f00b){if(this['_MessageCoreSettings']===undefined)this[_0x3165('0x124')]();if(this[_0x3165('0x8d')][_0x3165('0x178')]===undefined)this[_0x3165('0x124')]();this[_0x3165('0x8d')][_0x3165('0x178')]=_0xe5f00b;},Game_System[_0x3165('0x14c')][_0x3165('0x1e5')]=function(){if(this[_0x3165('0x8d')]===undefined)this[_0x3165('0x124')]();if(this[_0x3165('0x8d')]['choiceLineHeight']===undefined)this[_0x3165('0x124')]();return this[_0x3165('0x8d')][_0x3165('0x27b')];},Game_System[_0x3165('0x14c')][_0x3165('0x21b')]=function(_0x480fb9){if(this[_0x3165('0x8d')]===undefined)this[_0x3165('0x124')]();if(this['_MessageCoreSettings'][_0x3165('0x27b')]===undefined)this[_0x3165('0x124')]();this[_0x3165('0x8d')]['choiceLineHeight']=_0x480fb9||0x1;},Game_System[_0x3165('0x14c')][_0x3165('0x257')]=function(){if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this[_0x3165('0x8d')][_0x3165('0x4c')]===undefined)this[_0x3165('0x124')]();return this[_0x3165('0x8d')][_0x3165('0x4c')];},Game_System[_0x3165('0x14c')][_0x3165('0x255')]=function(_0x3f2f80){if(this[_0x3165('0x8d')]===undefined)this['initMessageCore']();if(this[_0x3165('0x8d')]['choiceRows']===undefined)this[_0x3165('0x124')]();this[_0x3165('0x8d')]['choiceRows']=_0x3f2f80||0x1;},Game_System['prototype'][_0x3165('0x26d')]=function(){if(this[_0x3165('0x8d')]===undefined)this[_0x3165('0x124')]();if(this['_MessageCoreSettings']['choiceCols']===undefined)this['initMessageCore']();return this[_0x3165('0x8d')][_0x3165('0x7b')];},Game_System['prototype'][_0x3165('0xef')]=function(_0x1ad026){if(this['_MessageCoreSettings']===undefined)this[_0x3165('0x124')]();if(this[_0x3165('0x8d')]['choiceCols']===undefined)this[_0x3165('0x124')]();this[_0x3165('0x8d')][_0x3165('0x7b')]=_0x1ad026||0x1;},Game_System[_0x3165('0x14c')][_0x3165('0x14')]=function(){if(this[_0x3165('0x8d')]===undefined)this[_0x3165('0x124')]();if(this[_0x3165('0x8d')]['choiceTextAlign']===undefined)this[_0x3165('0x124')]();return this[_0x3165('0x8d')][_0x3165('0x58')];},Game_System[_0x3165('0x14c')][_0x3165('0xfd')]=function(_0x188164){if(this[_0x3165('0x8d')]===undefined)this[_0x3165('0x124')]();if(this[_0x3165('0x8d')][_0x3165('0x58')]===undefined)this[_0x3165('0x124')]();this['_MessageCoreSettings'][_0x3165('0x58')]=_0x188164[_0x3165('0x6b')]();},VisuMZ[_0x3165('0x109')][_0x3165('0x1d3')]=Game_Party[_0x3165('0x14c')][_0x3165('0x70')],Game_Party['prototype'][_0x3165('0x70')]=function(){VisuMZ[_0x3165('0x109')][_0x3165('0x1d3')][_0x3165('0x38')](this),this[_0x3165('0x124')]();},Game_Party['prototype']['initMessageCore']=function(){this[_0x3165('0x103')]={'type':0x0,'id':0x0,'quantity':0x0};},Game_Party[_0x3165('0x14c')][_0x3165('0xb4')]=function(){if(this['_lastGainedItemData']===undefined)this[_0x3165('0x124')]();return this[_0x3165('0x103')];},Game_Party[_0x3165('0x14c')][_0x3165('0x170')]=function(_0x1549e4,_0x1445f3){if(this[_0x3165('0x103')]===undefined)this[_0x3165('0x124')]();if(!_0x1549e4)return;if(DataManager[_0x3165('0x240')](_0x1549e4))this[_0x3165('0x103')][_0x3165('0x129')]=0x0;else{if(DataManager[_0x3165('0x1e')](_0x1549e4))this['_lastGainedItemData'][_0x3165('0x129')]=0x1;else{if(DataManager[_0x3165('0x222')](_0x1549e4)){if(_0x3165('0x179')!=='lSvyg'){function _0xf9b0a4(){if(!this[_0x3165('0xa7')])return;const _0x51b2e7=0x8,_0x51284e=this[_0x3165('0xa7')],_0x5145e0=this['x']+this[_0x3165('0x217')],_0x331f38=_0x1d2020['floor']((_0x241644[_0x3165('0x217')]-_0x30a46f[_0x3165('0xa4')])/0x2);_0x5145e0>=_0x2664ce[_0x3165('0xa4')]+_0x331f38-_0x51284e[_0x3165('0x217')]+_0x51b2e7?_0x51284e['x']=-_0x51284e[_0x3165('0x217')]-_0x51b2e7:_0x51284e['x']=this[_0x3165('0x217')]+_0x51b2e7,_0x51284e['y']=this[_0x3165('0x225')]/0x2-_0x51284e[_0x3165('0x225')]/0x2;}}else this[_0x3165('0x103')][_0x3165('0x129')]=0x2;}}}this[_0x3165('0x103')]['id']=_0x1549e4['id'],this[_0x3165('0x103')][_0x3165('0x16e')]=_0x1445f3;},VisuMZ[_0x3165('0x109')][_0x3165('0x263')]=Game_Party[_0x3165('0x14c')]['gainItem'],Game_Party[_0x3165('0x14c')]['gainItem']=function(_0x52b3a4,_0xc0f9d8,_0x1d30ab){VisuMZ['MessageCore']['Game_Party_gainItem'][_0x3165('0x38')](this,_0x52b3a4,_0xc0f9d8,_0x1d30ab),_0xc0f9d8>0x0&&this[_0x3165('0x170')](_0x52b3a4,_0xc0f9d8);},VisuMZ[_0x3165('0x109')][_0x3165('0x262')]=Game_Map[_0x3165('0x14c')][_0x3165('0x70')],Game_Map['prototype'][_0x3165('0x70')]=function(){VisuMZ[_0x3165('0x109')]['Game_Map_initialize'][_0x3165('0x38')](this),this[_0x3165('0x101')]=[];},VisuMZ[_0x3165('0x109')][_0x3165('0xb7')]=Game_Map['prototype'][_0x3165('0x213')],Game_Map['prototype']['setupEvents']=function(){VisuMZ[_0x3165('0x109')][_0x3165('0xb7')][_0x3165('0x38')](this),this['_messageCommonEvents']=[];},VisuMZ['MessageCore']['Game_Map_updateEvents']=Game_Map[_0x3165('0x14c')][_0x3165('0x6f')],Game_Map['prototype'][_0x3165('0x6f')]=function(){VisuMZ[_0x3165('0x109')][_0x3165('0x144')][_0x3165('0x38')](this),this[_0x3165('0x16')]();},Game_Map[_0x3165('0x14c')][_0x3165('0xc')]=function(_0x348d4e){this['_messageCommonEvents']=this[_0x3165('0x101')]||[];const _0x3ba42c=this[_0x3165('0x13b')]['_eventId'],_0x49c9c7=new Game_MessageCommonEvent(_0x348d4e,_0x3ba42c);this['_messageCommonEvents'][_0x3165('0x152')](_0x49c9c7);},Game_Map[_0x3165('0x14c')][_0x3165('0x16')]=function(){this[_0x3165('0x101')]=this[_0x3165('0x101')]||[];for(const _0x229b1c of this[_0x3165('0x101')]){if(!_0x229b1c[_0x3165('0x13b')]){if('vAvhV'!==_0x3165('0x13c'))this[_0x3165('0x101')][_0x3165('0x80')](_0x229b1c);else{function _0x34284a(){if(this['_lastGainedItemData']===_0x5df031)this[_0x3165('0x124')]();if(!_0xb910a4)return;if(_0xa5a949[_0x3165('0x240')](_0x28114))this[_0x3165('0x103')][_0x3165('0x129')]=0x0;else{if(_0x3bd650[_0x3165('0x1e')](_0x3672b0))this['_lastGainedItemData'][_0x3165('0x129')]=0x1;else _0x6d288d[_0x3165('0x222')](_0xd13d21)&&(this[_0x3165('0x103')]['type']=0x2);}this[_0x3165('0x103')]['id']=_0x1f6c37['id'],this[_0x3165('0x103')][_0x3165('0x16e')]=_0xc1c23e;}}}else{if(_0x3165('0x2e')===_0x3165('0x2e'))_0x229b1c['update']();else{function _0x9c233d(){const _0xa442b7=this[_0x3165('0x281')](_0x1cec15)[_0x3165('0x256')](',');if(!_0x2147d6[_0x3165('0x26')])return;const _0x1cdaee=_0xa442b7[0x0][_0x3165('0x9f')](),_0x191a2b=_0x5e7508[_0x3165('0x157')](_0x1cdaee),_0x387242=_0x3e7d40[_0x3165('0x23e')](_0x578bc6),_0x3fc0aa=this['contents'][_0x3165('0x1c')];_0x191a2b['addLoadListener'](this[_0x3165('0x252')][_0x3165('0x134')](this,_0x191a2b,_0x387242,_0x3fc0aa));}}}}},Game_Interpreter[_0x3165('0x14c')][_0x3165('0x1b')]=function(_0x4715af){if($gameMessage[_0x3165('0xc1')]())return![];return this[_0x3165('0x162')](_0x4715af),this[_0x3165('0xbb')](_0x4715af),this[_0x3165('0x25')](_0x4715af),this[_0x3165('0x25c')]('message'),!![];},Game_Interpreter[_0x3165('0x14c')][_0x3165('0x162')]=function(_0x279e03){$gameMessage[_0x3165('0x8b')](_0x279e03[0x0],_0x279e03[0x1]),$gameMessage[_0x3165('0x200')](_0x279e03[0x2]),$gameMessage[_0x3165('0x111')](_0x279e03[0x3]),$gameMessage[_0x3165('0x267')](_0x279e03[0x4]);},Game_Interpreter[_0x3165('0x14c')]['addContinuousShowTextCommands']=function(_0x144c03){while(this[_0x3165('0xf4')]()){if('mYdJL'===_0x3165('0x20a')){function _0x483288(){return _0x50e3ec;}}else{this[_0x3165('0x153')]++;if(this[_0x3165('0xe4')]()[_0x3165('0xb6')]===0x191){if('SZZCy'!==_0x3165('0x141')){function _0x4f2085(){this[_0x3165('0x234')]=_0x30979a[_0x3165('0x23e')](_0x27649b);}}else $gameMessage[_0x3165('0xbf')](this[_0x3165('0xe4')]()[_0x3165('0x7c')][0x0]);}if(this[_0x3165('0x29')]())break;}}},Game_Interpreter['prototype'][_0x3165('0xf4')]=function(){if(this[_0x3165('0x151')]()===0x65&&$gameSystem[_0x3165('0x11d')]()>0x4)return!![];else{if('bFaCe'===_0x3165('0x27c'))return this[_0x3165('0x151')]()===0x191;else{function _0xa9dce6(){_0x41f1af['ConvertParams'](_0x424741,_0x45e7fa);const _0x4488bb=_0x37207a['LineHeight']||_0x375051['getChoiceListLineHeight']()||0x1,_0x1224b2=_0x793ed9[_0x3165('0xe7')]||_0x48318e[_0x3165('0x257')]()||0x1,_0x19ce41=_0x2c13d4[_0x3165('0x253')]||_0x4201be[_0x3165('0x26d')]()||0x1,_0x4e3241=_0xfc5f3c['TextAlign'][_0x3165('0x6b')]()||_0x3165('0x1c8');_0x433b0e[_0x3165('0x21b')](_0x4488bb),_0x386dd2[_0x3165('0x255')](_0x1224b2),_0x20dabd[_0x3165('0xef')](_0x19ce41),_0x4a3547[_0x3165('0xfd')](_0x4e3241);}}}},Game_Interpreter[_0x3165('0x14c')][_0x3165('0x29')]=function(){return $gameMessage['_texts'][_0x3165('0xe')]>=$gameSystem[_0x3165('0x11d')]()&&this['nextEventCode']()!==0x191;},Game_Interpreter['prototype']['prepareShowTextFollowups']=function(_0x4df3bd){switch(this[_0x3165('0x151')]()){case 0x66:this['_index']++,this[_0x3165('0x189')](this[_0x3165('0xe4')]()[_0x3165('0x7c')]);break;case 0x67:this[_0x3165('0x153')]++,this[_0x3165('0x1e6')](this[_0x3165('0xe4')]()[_0x3165('0x7c')]);break;case 0x68:this[_0x3165('0x153')]++,this[_0x3165('0xb')](this[_0x3165('0xe4')]()[_0x3165('0x7c')]);break;}},VisuMZ[_0x3165('0x109')][_0x3165('0x251')]=Game_Interpreter['prototype'][_0x3165('0x189')],Game_Interpreter['prototype']['setupChoices']=function(_0x40c807){_0x40c807=this['addContinuousShowChoices'](),VisuMZ[_0x3165('0x109')][_0x3165('0x251')][_0x3165('0x38')](this,_0x40c807);},Game_Interpreter[_0x3165('0x14c')][_0x3165('0xf6')]=function(){const _0x565c9a=this[_0x3165('0x153')],_0x2c17b5=[];let _0x9d38b=0x0;this[_0x3165('0x153')]++;while(this[_0x3165('0x153')]<this[_0x3165('0x1a3')][_0x3165('0xe')]){if(this[_0x3165('0xe4')]()[_0x3165('0x1ac')]===this[_0x3165('0x17f')]){if(_0x3165('0x12c')!==_0x3165('0x12c')){function _0x3747d6(){this[_0x3165('0x105')](this[_0x3165('0x234')]['x'],this[_0x3165('0x145')]*(_0x21706f['boxHeight']-this['height'])/0x2,this[_0x3165('0x234')]['width'],this[_0x3165('0x234')][_0x3165('0x225')],_0x2c387a,_0x588600);}}else{if(this[_0x3165('0xe4')]()[_0x3165('0xb6')]===0x194&&this[_0x3165('0x151')]()!==0x66)break;else{if(this['currentCommand']()[_0x3165('0xb6')]===0x66)this['adjustShowChoiceExtension'](_0x9d38b,this['currentCommand'](),_0x565c9a),this[_0x3165('0x153')]-=0x2;else this[_0x3165('0xe4')]()['code']===0x192&&(this[_0x3165('0xe4')]()[_0x3165('0x7c')][0x0]=_0x9d38b,_0x9d38b++);}}}this[_0x3165('0x153')]++;}return this['_index']=_0x565c9a,this[_0x3165('0xe4')]()[_0x3165('0x7c')];},Game_Interpreter['prototype'][_0x3165('0x18a')]=function(_0x1ee40a,_0x5cc593,_0x56a7b1){this[_0x3165('0x197')](_0x1ee40a,_0x5cc593,_0x56a7b1),this[_0x3165('0xb0')](_0x1ee40a,_0x5cc593,_0x56a7b1),this['addExtraShowChoices'](_0x5cc593,_0x56a7b1);},Game_Interpreter[_0x3165('0x14c')][_0x3165('0x197')]=function(_0x21cd34,_0x23c903,_0x151ec3){if(_0x23c903[_0x3165('0x7c')][0x2]<0x0)return;const _0xf09b11=_0x23c903['parameters'][0x2]+_0x21cd34;this[_0x3165('0x1a3')][_0x151ec3]['parameters'][0x2]=_0xf09b11;},Game_Interpreter['prototype'][_0x3165('0xb0')]=function(_0x179962,_0x36e162,_0x1a2263){if(_0x36e162[_0x3165('0x7c')][0x1]>=0x0){var _0x4c9e77=_0x36e162[_0x3165('0x7c')][0x1]+_0x179962;this[_0x3165('0x1a3')][_0x1a2263][_0x3165('0x7c')][0x1]=_0x4c9e77;}else _0x36e162[_0x3165('0x7c')][0x1]===-0x2&&(this['_list'][_0x1a2263]['parameters'][0x1]=_0x36e162[_0x3165('0x7c')][0x1]);},Game_Interpreter['prototype'][_0x3165('0x192')]=function(_0xd8544d,_0x4eea0b){for(const _0xd27761 of _0xd8544d[_0x3165('0x7c')][0x0]){if(_0x3165('0x237')!=='ednXL')this['_list'][_0x4eea0b][_0x3165('0x7c')][0x0][_0x3165('0x152')](_0xd27761);else{function _0x5e80d1(){const _0x18fc92=_0x343259[_0x3165('0xe5')]('['+_0x7d2e08['$1'][_0x3165('0x90')](/\d+/g)+']');for(const _0xf4ac07 of _0x18fc92){if(!_0x5856e2['value'](_0xf4ac07))return!![];}return![];}}}this[_0x3165('0x1a3')][_0x3165('0x126')](this[_0x3165('0x153')]-0x1,0x2);};function Game_MessageCommonEvent(){this[_0x3165('0x70')](...arguments);}Game_MessageCommonEvent[_0x3165('0x14c')][_0x3165('0x70')]=function(_0x2b257,_0x334eec){this[_0x3165('0x9d')]=_0x2b257,this[_0x3165('0x96')]=_0x334eec||0x0,this['refresh']();},Game_MessageCommonEvent[_0x3165('0x14c')]['event']=function(){return $dataCommonEvents[this[_0x3165('0x9d')]];},Game_MessageCommonEvent[_0x3165('0x14c')][_0x3165('0x6e')]=function(){return this[_0x3165('0x35')]()[_0x3165('0x6e')];},Game_MessageCommonEvent['prototype']['refresh']=function(){this[_0x3165('0x13b')]=new Game_Interpreter(),this['_interpreter'][_0x3165('0x231')](this[_0x3165('0x6e')](),this[_0x3165('0x96')]);},Game_MessageCommonEvent[_0x3165('0x14c')][_0x3165('0x119')]=function(){if(this[_0x3165('0x13b')]){if(this[_0x3165('0x13b')][_0x3165('0x1d2')]()){if(_0x3165('0x214')!==_0x3165('0xe8'))this[_0x3165('0x13b')][_0x3165('0x119')]();else{function _0x2e0d3a(){_0xe8fd48=_0xbee309||_0xc545b1[_0x3165('0x217')],_0x46dc30=_0x11e635||_0x341e6a[_0x3165('0x225')],this[_0x3165('0x89')][_0x3165('0x1c')]=_0x5e4ef2,this[_0x3165('0x89')][_0x3165('0x17d')](_0x2585bf,0x0,0x0,_0x7ed54a[_0x3165('0x217')],_0x11eb47[_0x3165('0x225')],_0x4f5df8,_0x3d348c,_0x4eac9b,_0x1b08d2),this[_0x3165('0x89')][_0x3165('0x1c')]=0xff;}}}else{if(_0x3165('0x59')===_0x3165('0xff')){function _0x2b29bd(){this[_0x3165('0x9d')]=_0x2b3627,this[_0x3165('0x96')]=_0x2d4d70||0x0,this[_0x3165('0x21a')]();}}else this['clear']();}}},Game_MessageCommonEvent['prototype'][_0x3165('0x36')]=function(){this[_0x3165('0x13b')]=null;},Scene_Message[_0x3165('0x14c')][_0x3165('0x47')]=function(){const _0x7d8316=Math[_0x3165('0x22f')](Graphics[_0x3165('0x217')],$gameSystem['getMessageWindowWidth']()),_0x3a5cfe=$gameSystem[_0x3165('0x11d')](),_0x1683e0=this[_0x3165('0x271')](_0x3a5cfe,![]),_0x201069=(Graphics[_0x3165('0xa4')]-_0x7d8316)/0x2,_0x263d8d=0x0;return new Rectangle(_0x201069,_0x263d8d,_0x7d8316,_0x1683e0);},VisuMZ[_0x3165('0x109')][_0x3165('0xa8')]=Scene_Options[_0x3165('0x14c')][_0x3165('0x5e')],Scene_Options['prototype'][_0x3165('0x5e')]=function(){let _0x10252b=VisuMZ[_0x3165('0x109')][_0x3165('0xa8')][_0x3165('0x38')](this);const _0x76a77a=VisuMZ[_0x3165('0x109')][_0x3165('0x19b')];if(_0x76a77a[_0x3165('0x9c')][_0x3165('0x20f')]&&_0x76a77a[_0x3165('0x9c')][_0x3165('0x233')])_0x10252b++;return _0x10252b;},VisuMZ[_0x3165('0x109')][_0x3165('0xa2')]=Window_Base['prototype'][_0x3165('0x70')],Window_Base[_0x3165('0x14c')][_0x3165('0x70')]=function(_0x3f10ab){this[_0x3165('0x124')](_0x3f10ab),VisuMZ[_0x3165('0x109')][_0x3165('0xa2')]['call'](this,_0x3f10ab);},Window_Base[_0x3165('0x14c')]['initMessageCore']=function(_0x2c9ab6){this[_0x3165('0x210')](),this[_0x3165('0x138')](),this[_0x3165('0xb8')](_0x2c9ab6);},Window_Base[_0x3165('0x14c')][_0x3165('0x210')]=function(){this[_0x3165('0x130')]('default');},Window_Base[_0x3165('0x14c')][_0x3165('0x130')]=function(_0x1a4b70){this[_0x3165('0x215')]=_0x1a4b70;},Window_Base[_0x3165('0x14c')][_0x3165('0x5d')]=function(){return this[_0x3165('0x215')];},VisuMZ['MessageCore'][_0x3165('0xc6')]=Window_Base[_0x3165('0x14c')]['processAllText'],Window_Base[_0x3165('0x14c')][_0x3165('0x168')]=function(_0x2ae0da){VisuMZ[_0x3165('0x109')][_0x3165('0xc6')][_0x3165('0x38')](this,_0x2ae0da);if(_0x2ae0da['drawing'])this[_0x3165('0x130')](_0x3165('0x1c8'));},Window_Base[_0x3165('0x14c')]['resetWordWrap']=function(){this[_0x3165('0x81')](![]);},Window_Base[_0x3165('0x14c')][_0x3165('0x27e')]=function(){return this[_0x3165('0xf0')];},Window_Base[_0x3165('0x14c')][_0x3165('0x81')]=function(_0x401ec9){return this[_0x3165('0xf0')]=_0x401ec9,'';},Window_Base[_0x3165('0x14c')][_0x3165('0xb8')]=function(_0x1dba4a){this[_0x3165('0x234')]=JsonEx[_0x3165('0x23e')](_0x1dba4a);},Window_Base[_0x3165('0x14c')][_0x3165('0x11f')]=function(){this['contents'][_0x3165('0xeb')]=$gameSystem[_0x3165('0x187')](),this[_0x3165('0x60')][_0x3165('0x69')]=$gameSystem['mainFontSize'](),this[_0x3165('0x60')][_0x3165('0x19c')]=![],this[_0x3165('0x60')][_0x3165('0x20b')]=![],this[_0x3165('0x23f')]();},Window_Base[_0x3165('0x14c')]['resetTextColor']=function(){this[_0x3165('0x100')](ColorManager[_0x3165('0x10e')]()),this[_0x3165('0x18f')](ColorManager[_0x3165('0xfa')]()),this[_0x3165('0x60')][_0x3165('0x20')]=0x3,this[_0x3165('0x193')](![]);},Window_Base[_0x3165('0x14c')][_0x3165('0x193')]=function(_0x558f87){this['_colorLock']=_0x558f87;},Window_Base[_0x3165('0x14c')][_0x3165('0x110')]=function(){return this['_colorLock'];},Window_Base[_0x3165('0x14c')][_0x3165('0x274')]=function(){return![];},Window_Base[_0x3165('0x14c')]['getPreservedFontSettings']=function(){const _0x137470=[_0x3165('0xeb'),_0x3165('0x69'),_0x3165('0x19c'),_0x3165('0x20b'),_0x3165('0x66'),_0x3165('0x10a'),_0x3165('0x20'),_0x3165('0x1c')];let _0x3c64be={};for(const _0x1c5a75 of _0x137470){_0x3c64be[_0x1c5a75]=this['contents'][_0x1c5a75];}return _0x3c64be;},Window_Base[_0x3165('0x14c')][_0x3165('0x21')]=function(_0x12fcc6){for(const _0xd29d31 in _0x12fcc6){this[_0x3165('0x60')][_0xd29d31]=_0x12fcc6[_0xd29d31];}},VisuMZ[_0x3165('0x109')]['Window_Base_update']=Window_Base[_0x3165('0x14c')][_0x3165('0x119')],Window_Base[_0x3165('0x14c')][_0x3165('0x119')]=function(){VisuMZ[_0x3165('0x109')][_0x3165('0x268')][_0x3165('0x38')](this),this[_0x3165('0x1bc')]();},Window_Base['prototype'][_0x3165('0x1b8')]=function(){return![];},Window_Base[_0x3165('0x14c')][_0x3165('0x1bc')]=function(){if(this[_0x3165('0x50')]>0x0){if(this[_0x3165('0x1b8')]()){if(_0x3165('0x85')===_0x3165('0x85'))this['x']=this[_0x3165('0x1d9')](this['x'],this[_0x3165('0xd5')]),this['y']=this[_0x3165('0x1d9')](this['y'],this[_0x3165('0x17c')]),this[_0x3165('0x217')]=this['applyMoveEasing'](this[_0x3165('0x217')],this[_0x3165('0xa')]),this[_0x3165('0x225')]=this[_0x3165('0x1d9')](this[_0x3165('0x225')],this[_0x3165('0x1a9')]),this[_0x3165('0x266')]();else{function _0x8171a1(){const _0x19d47e=_0x246041(_0x47b407['$1']);_0x19d47e!==_0x213924[_0x2becb4]['version']&&(_0x1bdde5('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x3165('0x3')](_0x2f855c,_0x19d47e)),_0x2c1d44[_0x3165('0x1df')]());}}}this['_moveDuration']--;}},Window_Base['prototype'][_0x3165('0x266')]=function(){this['width']=Math[_0x3165('0x22f')](this[_0x3165('0x217')],Graphics[_0x3165('0x217')]),this['height']=Math['min'](this[_0x3165('0x225')],Graphics[_0x3165('0x225')]);const _0x48d5db=-(Math[_0x3165('0x41')](Graphics['width']-Graphics[_0x3165('0xa4')])/0x2),_0x32e104=_0x48d5db+Graphics[_0x3165('0x217')]-this[_0x3165('0x217')],_0x43b595=-(Math['floor'](Graphics[_0x3165('0x225')]-Graphics[_0x3165('0x277')])/0x2),_0x17cf3d=_0x43b595+Graphics['height']-this[_0x3165('0x225')];this['x']=this['x'][_0x3165('0x5a')](_0x48d5db,_0x32e104),this['y']=this['y'][_0x3165('0x5a')](_0x43b595,_0x17cf3d);},Window_Base['prototype'][_0x3165('0x1d9')]=function(_0x35f35f,_0x571c49){const _0x389f1f=this[_0x3165('0x50')],_0x46a5fe=this['_wholeMoveDuration'],_0x3e3714=this[_0x3165('0x1f3')]((_0x46a5fe-_0x389f1f)/_0x46a5fe),_0x2788de=this[_0x3165('0x1f3')]((_0x46a5fe-_0x389f1f+0x1)/_0x46a5fe),_0x1000dd=(_0x35f35f-_0x571c49*_0x3e3714)/(0x1-_0x3e3714);return _0x1000dd+(_0x571c49-_0x1000dd)*_0x2788de;},Window_Base[_0x3165('0x14c')][_0x3165('0x1f3')]=function(_0x5c6b12){const _0x3d3473=0x2;switch(this[_0x3165('0x203')]){case 0x0:return _0x5c6b12;case 0x1:return this[_0x3165('0x224')](_0x5c6b12,_0x3d3473);case 0x2:return this[_0x3165('0xc0')](_0x5c6b12,_0x3d3473);case 0x3:return this[_0x3165('0x249')](_0x5c6b12,_0x3d3473);default:if(Imported[_0x3165('0x23c')]){if(_0x3165('0x18d')!==_0x3165('0xaa'))return VisuMZ[_0x3165('0x1d9')](_0x5c6b12,this[_0x3165('0x203')]);else{function _0x5c68bb(){return _0x15f18c[_0x3165('0x87')][_0x3165('0xe')]>=_0xec3167[_0x3165('0x11d')]()&&this[_0x3165('0x151')]()!==0x191;}}}else{if('tJIsr'===_0x3165('0x148'))return _0x5c6b12;else{function _0x1b4912(){const _0x47981c=_0x1d9279[_0x3165('0xe5')]('['+_0x23d266['$1']['match'](/\d+/g)+']');for(const _0x2c2653 of _0x47981c){if(!_0x35c95c[_0x3165('0x137')](_0x2c2653))return![];}return!![];}}}}},Window_Base[_0x3165('0x14c')]['moveTo']=function(_0x4ea991,_0x2c77ad,_0x26c946,_0x3bc402,_0x17dbf5,_0x334d58){this[_0x3165('0xd5')]=_0x4ea991,this['_moveTargetY']=_0x2c77ad,this['_moveTargetWidth']=_0x26c946||this['width'],this[_0x3165('0x1a9')]=_0x3bc402||this[_0x3165('0x225')],this[_0x3165('0x50')]=_0x17dbf5||0x1;if(this[_0x3165('0x50')]<=0x0)this[_0x3165('0x50')]=0x1;this[_0x3165('0x39')]=this[_0x3165('0x50')],this[_0x3165('0x203')]=_0x334d58||0x0;},Window_Base[_0x3165('0x14c')][_0x3165('0x1cd')]=function(_0x59c9a6,_0x505891,_0xaa93b0,_0x345e7a,_0x120f93,_0x4c1ae3){this[_0x3165('0xd5')]=this['x']+_0x59c9a6,this[_0x3165('0x17c')]=this['y']+_0x505891,this[_0x3165('0xa')]=this[_0x3165('0x217')]+(_0xaa93b0||0x0),this[_0x3165('0x1a9')]=this[_0x3165('0x225')]+(_0x345e7a||0x0),this[_0x3165('0x50')]=_0x120f93||0x1;if(this['_moveDuration']<=0x0)this[_0x3165('0x50')]=0x1;this['_wholeMoveDuration']=this['_moveDuration'],this[_0x3165('0x203')]=_0x4c1ae3||0x0;},Window_Base[_0x3165('0x14c')][_0x3165('0x10d')]=function(_0xf181b3,_0x95b3bc){this[_0x3165('0x105')](this[_0x3165('0x234')]['x'],this['_resetRect']['y'],this[_0x3165('0x234')][_0x3165('0x217')],this[_0x3165('0x234')][_0x3165('0x225')],_0xf181b3,_0x95b3bc);},VisuMZ[_0x3165('0x109')][_0x3165('0x5c')]=Window_Base[_0x3165('0x14c')][_0x3165('0x100')],Window_Base[_0x3165('0x14c')]['changeTextColor']=function(_0x539dce){if(this[_0x3165('0x110')]())return;_0x539dce=_0x539dce[_0x3165('0x94')](/\,/g,''),this[_0x3165('0xec')]=this['_textColorStack']||[],this[_0x3165('0xec')][_0x3165('0x236')](this[_0x3165('0x60')][_0x3165('0x66')]),VisuMZ[_0x3165('0x109')]['Window_Base_changeTextColor'][_0x3165('0x38')](this,_0x539dce);},Window_Base[_0x3165('0x14c')]['processPreviousColor']=function(_0x20d42e){this[_0x3165('0x63')](_0x20d42e);if(this[_0x3165('0x110')]())return;_0x20d42e[_0x3165('0x26')]&&(this[_0x3165('0xec')]=this['_textColorStack']||[],this[_0x3165('0x60')]['textColor']=this[_0x3165('0xec')][_0x3165('0x1cf')]()||ColorManager[_0x3165('0x10e')]());},Window_Base['prototype'][_0x3165('0x7e')]=function(_0x3839c2){return _0x3839c2=this[_0x3165('0x1eb')](_0x3839c2),_0x3839c2=this[_0x3165('0xf7')](_0x3839c2),_0x3839c2=this[_0x3165('0x55')](_0x3839c2),_0x3839c2=this[_0x3165('0x177')](_0x3839c2),_0x3839c2=this['convertShowChoiceEscapeCodes'](_0x3839c2),_0x3839c2=this[_0x3165('0x25b')](_0x3839c2),_0x3839c2=this[_0x3165('0x219')](_0x3839c2),_0x3839c2=this[_0x3165('0x112')](_0x3839c2),_0x3839c2=this['convertBaseEscapeCharacters'](_0x3839c2),_0x3839c2=this[_0x3165('0x24d')](_0x3839c2),_0x3839c2=this['convertMessageCoreEscapeReplacements'](_0x3839c2),_0x3839c2=this[_0x3165('0x27f')](_0x3839c2),_0x3839c2=this[_0x3165('0x55')](_0x3839c2),_0x3839c2=this[_0x3165('0xee')](_0x3839c2),_0x3839c2=this[_0x3165('0x1a8')](_0x3839c2),_0x3839c2;},Window_Base[_0x3165('0x14c')][_0x3165('0x1eb')]=function(_0x3dd1ff){for(const _0x41e86a of VisuMZ[_0x3165('0x109')][_0x3165('0x19b')][_0x3165('0xe3')]){if(_0x3165('0x99')!==_0x3165('0x1b4'))_0x3dd1ff['match'](_0x41e86a[_0x3165('0x1f9')])&&(_0x3dd1ff=_0x3dd1ff['replace'](_0x41e86a[_0x3165('0x1f9')],_0x41e86a['textCodeResult'][_0x3165('0x134')](this)));else{function _0x56cb2d(){return _0x32cee4=_0x3e282d[_0x3165('0x94')](/<(?:SHOW|HIDE|DISABLE|ENABLE)>/i,''),_0x506c47=_0x1fcc68['replace'](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,''),_0x1f958e=_0x12906b[_0x3165('0x94')](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:ALL|ANY)[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,''),_0x55ac87;}}}return _0x3dd1ff;},Window_Base[_0x3165('0x14c')][_0x3165('0xf7')]=function(_0x4a71a2){return _0x4a71a2=_0x4a71a2[_0x3165('0x94')](/\\/g,''),_0x4a71a2=_0x4a71a2[_0x3165('0x94')](/\x1b\x1b/g,'\x5c'),_0x4a71a2;},Window_Base[_0x3165('0x14c')]['convertVariableEscapeCharacters']=function(_0x4070ba){for(;;){if(_0x4070ba[_0x3165('0x90')](/\\V\[(\d+)\]/gi)){if(_0x3165('0x282')===_0x3165('0x17')){function _0x2826db(){return _0x458c55[_0x3165('0x1e5')]();}}else _0x4070ba=_0x4070ba[_0x3165('0x94')](/\\V\[(\d+)\]/gi,(_0x168aef,_0x486bc8)=>this[_0x3165('0xf7')](String($gameVariables['value'](parseInt(_0x486bc8)))));}else{if(_0x4070ba[_0x3165('0x90')](/\x1bV\[(\d+)\]/gi))_0x4070ba=_0x4070ba['replace'](/\x1bV\[(\d+)\]/gi,(_0x35cc2d,_0x3395ac)=>this[_0x3165('0xf7')](String($gameVariables[_0x3165('0x137')](parseInt(_0x3395ac)))));else{if(_0x3165('0x72')!=='OaDcT')break;else{function _0xd3b05f(){const _0x45fd64=_0x3d0ae3[_0x3165('0xe5')]('['+_0x48b8d1['$1'][_0x3165('0x90')](/\d+/g)+']');for(const _0x1f8716 of _0x45fd64){if(!_0x37bf00[_0x3165('0x137')](_0x1f8716))return!![];}return![];}}}}}return _0x4070ba;},Window_Base[_0x3165('0x14c')][_0x3165('0x177')]=function(_0x238a79){return this[_0x3165('0x1a2')](),_0x238a79;},Window_Base[_0x3165('0x14c')][_0x3165('0x27f')]=function(_0x4c932c){return _0x4c932c;},Window_Base[_0x3165('0x14c')][_0x3165('0x202')]=function(_0x5a773f){return _0x5a773f=_0x5a773f[_0x3165('0x94')](/<(?:SHOW|HIDE|DISABLE|ENABLE)>/i,''),_0x5a773f=_0x5a773f[_0x3165('0x94')](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,''),_0x5a773f=_0x5a773f[_0x3165('0x94')](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:ALL|ANY)[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,''),_0x5a773f;},Window_Base[_0x3165('0x14c')][_0x3165('0x25b')]=function(_0x119ab1){return _0x119ab1=_0x119ab1['replace'](/<B>/gi,_0x3165('0x242')),_0x119ab1=_0x119ab1[_0x3165('0x94')](/<\/B>/gi,_0x3165('0x82')),_0x119ab1=_0x119ab1[_0x3165('0x94')](/<I>/gi,_0x3165('0x1f1')),_0x119ab1=_0x119ab1[_0x3165('0x94')](/<\/I>/gi,_0x3165('0x26a')),_0x119ab1;},Window_Base[_0x3165('0x14c')][_0x3165('0x219')]=function(_0x2223b1){return _0x2223b1=_0x2223b1[_0x3165('0x94')](/<LEFT>/gi,_0x3165('0xa3')),_0x2223b1=_0x2223b1[_0x3165('0x94')](/<\/LEFT>/gi,_0x3165('0x45')),_0x2223b1=_0x2223b1[_0x3165('0x94')](/<CENTER>/gi,_0x3165('0x40')),_0x2223b1=_0x2223b1[_0x3165('0x94')](/<\/CENTER>/gi,_0x3165('0x45')),_0x2223b1=_0x2223b1[_0x3165('0x94')](/<RIGHT>/gi,_0x3165('0x64')),_0x2223b1=_0x2223b1[_0x3165('0x94')](/<\/RIGHT>/gi,_0x3165('0x45')),_0x2223b1;},Window_Base[_0x3165('0x14c')][_0x3165('0x112')]=function(_0x364c69){return _0x364c69=_0x364c69[_0x3165('0x94')](/<COLORLOCK>/gi,_0x3165('0x143')),_0x364c69=_0x364c69[_0x3165('0x94')](/<\/COLORLOCK>/gi,_0x3165('0x5f')),_0x364c69=_0x364c69[_0x3165('0x94')](/\(\(\(/gi,_0x3165('0x143')),_0x364c69=_0x364c69[_0x3165('0x94')](/\)\)\)/gi,_0x3165('0x5f')),_0x364c69;},Window_Base[_0x3165('0x14c')]['convertBaseEscapeCharacters']=function(_0x45575b){return _0x45575b=_0x45575b[_0x3165('0x94')](/\x1bN\[(\d+)\]/gi,(_0xb7b911,_0x4aa124)=>this[_0x3165('0x24f')](parseInt(_0x4aa124))),_0x45575b=_0x45575b['replace'](/\x1bP\[(\d+)\]/gi,(_0x5557ca,_0x18040f)=>this[_0x3165('0x9')](parseInt(_0x18040f))),_0x45575b=_0x45575b[_0x3165('0x94')](/\x1bG/gi,TextManager['currencyUnit']),_0x45575b;},Window_Base[_0x3165('0x14c')][_0x3165('0x24d')]=function(_0x4b9e6c){for(const _0x4a678c of VisuMZ[_0x3165('0x109')][_0x3165('0x19b')][_0x3165('0x1ca')]){if(_0x3165('0x22')!==_0x3165('0x6d')){if(_0x4b9e6c[_0x3165('0x90')](_0x4a678c['textCodeCheck'])){if(_0x3165('0x1e3')===_0x3165('0x1e3'))_0x4b9e6c=_0x4b9e6c[_0x3165('0x94')](_0x4a678c['textCodeCheck'],_0x4a678c[_0x3165('0x165')]),_0x4b9e6c=this['convertVariableEscapeCharacters'](_0x4b9e6c);else{function _0x598abd(){_0x48ebe4[_0x3165('0x165')]=new _0x1c517b('return\x20\x27'+_0x46d9db[_0x3165('0x1c2')][_0x3165('0x94')](/\\/g,'')+'\x27');}}}}else{function _0x3a9889(){for(const _0x151e03 of _0x2780b5['MessageCore'][_0x3165('0x19b')][_0x3165('0x73')]){_0x4e1235[_0x3165('0x90')](_0x151e03[_0x3165('0x1f9')])&&(_0x1c844c=_0x3929da['replace'](_0x151e03[_0x3165('0x1f9')],_0x151e03[_0x3165('0x165')][_0x3165('0x134')](this)),_0xe83237=this[_0x3165('0x55')](_0x26bf65));}return _0x46b26f;}}}return _0x4b9e6c;},Window_Base[_0x3165('0x14c')]['convertMessageCoreEscapeReplacements']=function(_0x6d621a){for(const _0x216d6d of VisuMZ[_0x3165('0x109')]['Settings'][_0x3165('0x73')]){if(_0x3165('0x184')==='BbRiD')_0x6d621a[_0x3165('0x90')](_0x216d6d[_0x3165('0x1f9')])&&(_0x6d621a=_0x6d621a[_0x3165('0x94')](_0x216d6d[_0x3165('0x1f9')],_0x216d6d['textCodeResult'][_0x3165('0x134')](this)),_0x6d621a=this[_0x3165('0x55')](_0x6d621a));else{function _0x50dc81(){return this['_relativePosition']=_0x37763c,'';}}}return _0x6d621a;},Window_Base[_0x3165('0x14c')][_0x3165('0x24f')]=function(_0x55073b){const _0x14b82e=_0x55073b>=0x1?$gameActors[_0x3165('0x1f2')](_0x55073b):null,_0x130371=_0x14b82e?_0x14b82e[_0x3165('0x49')]():'',_0x194ef0=VisuMZ[_0x3165('0x109')][_0x3165('0x19b')][_0x3165('0x15e')][_0x3165('0x208')];if(this[_0x3165('0x274')]()&&_0x194ef0!==0x0)return _0x3165('0x25d')[_0x3165('0x3')](_0x194ef0,_0x130371);else{if(_0x3165('0x229')==='EjUrq')return _0x130371;else{function _0x41cf78(){if(!_0x5a55e9[_0x3165('0x137')](_0x4d426c))return!![];}}}},Window_Base['prototype'][_0x3165('0x9')]=function(_0x20be9f){const _0x3da185=_0x20be9f>=0x1?$gameParty[_0x3165('0x260')]()[_0x20be9f-0x1]:null,_0x3d544f=_0x3da185?_0x3da185['name']():'',_0x5b2c65=VisuMZ['MessageCore'][_0x3165('0x19b')][_0x3165('0x15e')]['Actors'];if(this[_0x3165('0x274')]()&&_0x5b2c65!==0x0){if(_0x3165('0x163')!=='BanWa')return'C[%1]%2PREVCOLOR[0]'[_0x3165('0x3')](_0x5b2c65,_0x3d544f);else{function _0x45827b(){return _0xe82d5f[_0x3165('0x1d9')](_0x3d0834,this[_0x3165('0x203')]);}}}else{if(_0x3165('0xdb')===_0x3165('0xc7')){function _0x4d73e3(){return _0x41c354=_0x1a5d1f[_0x3165('0x94')](/<COLORLOCK>/gi,_0x3165('0x143')),_0x2368b4=_0x38fc74[_0x3165('0x94')](/<\/COLORLOCK>/gi,_0x3165('0x5f')),_0x33db9c=_0x5508b5[_0x3165('0x94')](/\(\(\(/gi,_0x3165('0x143')),_0x3148e1=_0x4c48ca[_0x3165('0x94')](/\)\)\)/gi,_0x3165('0x5f')),_0x3d0921;}}else return _0x3d544f;}},Window_Base[_0x3165('0x14c')][_0x3165('0xee')]=function(_0x300a19){if(this[_0x3165('0x274')]()){if(_0x3165('0xd0')===_0x3165('0xd0'))_0x300a19=this['processStoredAutoColorChanges'](_0x300a19),_0x300a19=this[_0x3165('0x1b6')](_0x300a19);else{function _0x294034(){return _0x3165('0x25d')[_0x3165('0x3')](_0x3d717f,_0x1db06c);}}}return _0x300a19;},Window_Base[_0x3165('0x14c')][_0x3165('0x182')]=function(_0x3740a7){for(autoColor of VisuMZ[_0x3165('0x109')][_0x3165('0x1bf')]){_0x3740a7=_0x3740a7[_0x3165('0x94')](autoColor[0x0],autoColor[0x1]);}return _0x3740a7;},Window_Base[_0x3165('0x14c')][_0x3165('0x1b1')]=function(){this[_0x3165('0x25a')]=[];},Window_Base[_0x3165('0x14c')][_0x3165('0x1a2')]=function(){this[_0x3165('0x1b1')]();const _0x1bef00=VisuMZ[_0x3165('0x109')][_0x3165('0x19b')][_0x3165('0x15e')],_0x53a070=_0x1bef00[_0x3165('0x208')];if(_0x53a070<=0x0)return;for(const _0x92a24a of $gameActors['_data']){if(!_0x92a24a)continue;const _0x204aca=_0x92a24a['name']();if(_0x204aca[_0x3165('0x9f')]()[_0x3165('0xe')]<=0x0)continue;if(_0x204aca[_0x3165('0x90')](/-----/i))continue;let _0x3de679=VisuMZ[_0x3165('0x109')][_0x3165('0x1ab')](_0x204aca);const _0x3d7718=new RegExp('\x5cb'+_0x3de679+'\x5cb','g'),_0x4ba932=_0x3165('0x25d')['format'](_0x53a070,_0x204aca);this[_0x3165('0x25a')][_0x3165('0x152')]([_0x3d7718,_0x4ba932]);}},Window_Base['prototype'][_0x3165('0x1b6')]=function(_0x338ad6){this[_0x3165('0x25a')]===undefined&&this['registerActorNameAutoColorChanges']();for(autoColor of this[_0x3165('0x25a')]){if(_0x3165('0x31')!==_0x3165('0x31')){function _0x451cf0(){_0x3603db[_0x3165('0x109')][_0x3165('0xf2')][_0x3165('0x38')](this),this['clearActorNameAutoColor'](),this[_0x3165('0x138')](),this[_0x3165('0x193')](![]),this[_0x3165('0x130')](_0x3165('0x1c8')),this['setTextDelay'](_0x4271[_0x3165('0x109')][_0x3165('0x19b')][_0x3165('0x32')][_0x3165('0xdc')]);}}else _0x338ad6=_0x338ad6['replace'](autoColor[0x0],autoColor[0x1]);}return _0x338ad6;},Window_Base[_0x3165('0x14c')][_0x3165('0x216')]=function(_0x41f529,_0x459aa8,_0x421e49){if(!_0x41f529)return'';const _0x49ee81=_0x41f529[_0x459aa8];let _0xe58a39='';if(_0x49ee81&&_0x421e49&&_0x49ee81['iconIndex']){if(_0x3165('0x1db')!=='HcGhS'){function _0x218d2d(){_0x368fc5[_0x3165('0x1f9')]=new _0x4f71b6('\x5c['+_0x27770d[_0x3165('0x19')]+'\x5c]','gi'),_0x3410aa[_0x3165('0x1c2')]!==''&&_0x1ccafa[_0x3165('0x1c2')]!==_0x3165('0x27a')?_0x5d2848[_0x3165('0x165')]=new _0x51008e(_0x3165('0x272')+_0x30f95d[_0x3165('0x1c2')][_0x3165('0x94')](/\\/g,'')+'\x27'):_0x85363f[_0x3165('0x165')]=_0x5f5c34[_0x3165('0x1c3')];}}else{const _0xafaf8=_0x3165('0xed');_0xe58a39=_0xafaf8[_0x3165('0x3')](_0x49ee81[_0x3165('0x6c')],_0x49ee81[_0x3165('0x49')]);}}else{if(_0x49ee81)_0xe58a39=_0x49ee81[_0x3165('0x49')];else{if(_0x3165('0x7f')!==_0x3165('0x93'))_0xe58a39='';else{function _0x6f775e(){if(this[_0x3165('0x8d')]===_0x387882)this[_0x3165('0x124')]();if(this['_MessageCoreSettings'][_0x3165('0x186')]===_0x3b8ac2)this[_0x3165('0x124')]();this['_MessageCoreSettings']['messageWidth']=_0x22f256||0x1;}}}}if(this[_0x3165('0x274')]()){if(_0x3165('0x74')!==_0x3165('0x24b'))_0xe58a39=this[_0x3165('0x21c')](_0xe58a39,_0x41f529);else{function _0x2f29ab(){this[_0x3165('0xd4')](_0x897031),this[_0x3165('0x132')]();}}}return _0xe58a39;},Window_Base[_0x3165('0x14c')][_0x3165('0x56')]=function(_0x4273e8){const _0x471c3e=$gameParty[_0x3165('0xb4')]();if(_0x471c3e['id']<0x0)return'';let _0x5cc623=null;if(_0x471c3e[_0x3165('0x129')]===0x0)_0x5cc623=$dataItems[_0x471c3e['id']];if(_0x471c3e[_0x3165('0x129')]===0x1)_0x5cc623=$dataWeapons[_0x471c3e['id']];if(_0x471c3e['type']===0x2)_0x5cc623=$dataArmors[_0x471c3e['id']];if(!_0x5cc623)return'';return _0x4273e8?'i[%1]%2'[_0x3165('0x3')](_0x5cc623[_0x3165('0x6c')],_0x5cc623[_0x3165('0x49')]):_0x5cc623['name'];},Window_Base[_0x3165('0x14c')]['lastGainedObjectQuantity']=function(){const _0x3dfe77=$gameParty[_0x3165('0xb4')]();if(_0x3dfe77['id']<=0x0)return'';return _0x3dfe77[_0x3165('0x16e')];},Window_Base['prototype'][_0x3165('0x21c')]=function(_0x14d1d1,_0x1bdcf1){const _0x4d130a=VisuMZ['MessageCore'][_0x3165('0x19b')][_0x3165('0x15e')];let _0x3c8480=0x0;if(_0x1bdcf1===$dataActors)_0x3c8480=_0x4d130a[_0x3165('0x208')];if(_0x1bdcf1===$dataClasses)_0x3c8480=_0x4d130a[_0x3165('0x136')];if(_0x1bdcf1===$dataSkills)_0x3c8480=_0x4d130a[_0x3165('0x1de')];if(_0x1bdcf1===$dataItems)_0x3c8480=_0x4d130a[_0x3165('0x26f')];if(_0x1bdcf1===$dataWeapons)_0x3c8480=_0x4d130a[_0x3165('0x14f')];if(_0x1bdcf1===$dataArmors)_0x3c8480=_0x4d130a[_0x3165('0xcb')];if(_0x1bdcf1===$dataEnemies)_0x3c8480=_0x4d130a[_0x3165('0x13f')];if(_0x1bdcf1===$dataStates)_0x3c8480=_0x4d130a[_0x3165('0xb2')];return _0x3c8480>0x0&&(_0x14d1d1='C[%1]%2PREVCOLOR[0]'[_0x3165('0x3')](_0x3c8480,_0x14d1d1)),_0x14d1d1;},Window_Base[_0x3165('0x14c')]['prepareWordWrapEscapeCharacters']=function(_0x580fd8){_0x580fd8=_0x580fd8[_0x3165('0x94')](/<(?:WORDWRAP|WORD WRAP)>/gi,(_0x2bcf06,_0x1c5ac1)=>this[_0x3165('0x81')](!![])),_0x580fd8=_0x580fd8[_0x3165('0x94')](/<(?:NOWORDWRAP|NO WORD WRAP)>/gi,(_0x4fe4f9,_0x47556d)=>this[_0x3165('0x81')](![])),_0x580fd8=_0x580fd8[_0x3165('0x94')](/<\/(?:WORDWRAP|WORD WRAP)>/gi,(_0x24935c,_0x22242b)=>this['setWordWrap'](![]));if(_0x580fd8[_0x3165('0x90')](Window_Message['_autoSizeRegexp'])){if(_0x3165('0x1da')===_0x3165('0x1da'))this['setWordWrap'](![]);else{function _0x395cc3(){const _0x1c954f=_0x190472[_0x3165('0xb4')]();if(_0x1c954f['id']<0x0)return'';let _0x46b71a=null;if(_0x1c954f[_0x3165('0x129')]===0x0)_0x46b71a=_0x14b3d3[_0x1c954f['id']];if(_0x1c954f[_0x3165('0x129')]===0x1)_0x46b71a=_0x69b3cc[_0x1c954f['id']];if(_0x1c954f[_0x3165('0x129')]===0x2)_0x46b71a=_0x2b1831[_0x1c954f['id']];if(!_0x46b71a)return'';return _0x1a4a4b?_0x3165('0xed')[_0x3165('0x3')](_0x46b71a['iconIndex'],_0x46b71a[_0x3165('0x49')]):_0x46b71a[_0x3165('0x49')];}}}else _0x580fd8[_0x3165('0x90')](Window_Message['_autoPosRegExp'])&&this[_0x3165('0x81')](![]);if(!this[_0x3165('0x27e')]())return _0x580fd8;if(_0x580fd8['length']<=0x0)return _0x580fd8;if(VisuMZ[_0x3165('0x109')][_0x3165('0x19b')][_0x3165('0x18b')][_0x3165('0x1d4')])_0x580fd8=_0x580fd8[_0x3165('0x94')](/[\n\r]+/g,'\x20'),_0x580fd8=_0x580fd8[_0x3165('0x94')](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a');else{if(_0x3165('0xb9')!==_0x3165('0x1ce'))_0x580fd8=_0x580fd8[_0x3165('0x94')](/[\n\r]+/g,''),_0x580fd8=_0x580fd8[_0x3165('0x94')](/<(?:BR|LINEBREAK)>/gi,'\x0a');else{function _0xc57b00(){this['onNewPageMessageCore'](_0x248a4c),_0xd06e57[_0x3165('0x109')][_0x3165('0x15f')][_0x3165('0x38')](this,_0x4c3a06),this[_0x3165('0x13')]();}}}return _0x580fd8=this[_0x3165('0x51')](_0x580fd8),_0x580fd8=_0x580fd8[_0x3165('0x256')]('\x20')[_0x3165('0xd7')](_0x3165('0x1d5')),_0x580fd8=_0x580fd8[_0x3165('0x94')](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x580fd8=_0x580fd8[_0x3165('0x94')](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x580fd8;},Window_Base[_0x3165('0x14c')][_0x3165('0x51')]=function(_0x19e0c3){return _0x19e0c3;},VisuMZ[_0x3165('0x109')][_0x3165('0x10b')]=Window_Base['prototype'][_0x3165('0x1b5')],Window_Base[_0x3165('0x14c')][_0x3165('0x1b5')]=function(_0x27f787){VisuMZ[_0x3165('0x109')][_0x3165('0x10b')][_0x3165('0x38')](this,_0x27f787),this[_0x3165('0x1d8')](_0x27f787);},VisuMZ['MessageCore']['Window_Base_processControlCharacter']=Window_Base[_0x3165('0x14c')][_0x3165('0x161')],Window_Base['prototype'][_0x3165('0x161')]=function(_0x44c55a,_0x1b0ec6){VisuMZ[_0x3165('0x109')][_0x3165('0x230')][_0x3165('0x38')](this,_0x44c55a,_0x1b0ec6);if(_0x1b0ec6===_0x3165('0x1d5')){if(_0x3165('0x264')===_0x3165('0x264'))this[_0x3165('0x5b')](_0x44c55a);else{function _0x445494(){const _0x6b97c0=0xb-_0x48285f[_0x3165('0x131')];_0x2adc8e=_0x5e7e4d[_0x3165('0x149')](_0x3b0293*_0x6b97c0),this[_0x3165('0x1b9')]=_0x2ad70a,this[_0x3165('0x171')]=_0x27cba7;}}}},Window_Base[_0x3165('0x14c')][_0x3165('0x281')]=function(_0x4a9053){var _0x5158ee=/^\<(.*?)\>/[_0x3165('0x2f')](_0x4a9053[_0x3165('0x1e4')][_0x3165('0x1c9')](_0x4a9053[_0x3165('0x15c')]));if(_0x5158ee)return _0x4a9053[_0x3165('0x15c')]+=_0x5158ee[0x0]['length'],String(_0x5158ee[0x0][_0x3165('0x1c9')](0x1,_0x5158ee[0x0][_0x3165('0xe')]-0x1));else{if(_0x3165('0xe1')===_0x3165('0x181')){function _0x274bc3(){return this[_0x3165('0x259')](_0x4eea50,![],!![]),this[_0x3165('0xab')](_0x3165('0x78')),'';}}else return'';}},VisuMZ['MessageCore']['Window_Base_processEscapeCharacter']=Window_Base[_0x3165('0x14c')][_0x3165('0x42')],Window_Base[_0x3165('0x14c')][_0x3165('0x42')]=function(_0x4051ee,_0x5e3d94){switch(_0x4051ee){case'C':_0x5e3d94[_0x3165('0x26')]?VisuMZ[_0x3165('0x109')][_0x3165('0x20c')][_0x3165('0x38')](this,_0x4051ee,_0x5e3d94):this[_0x3165('0x63')](_0x5e3d94);break;case'I':case'{':case'}':VisuMZ[_0x3165('0x109')][_0x3165('0x20c')][_0x3165('0x38')](this,_0x4051ee,_0x5e3d94);break;case'FS':this[_0x3165('0x280')](_0x5e3d94);break;case'PX':this[_0x3165('0x1e2')](_0x5e3d94);break;case'PY':this[_0x3165('0x261')](_0x5e3d94);break;case _0x3165('0x53'):this[_0x3165('0x1c4')](this['obtainEscapeParam'](_0x5e3d94));break;case _0x3165('0xf'):this[_0x3165('0xea')](_0x5e3d94);break;case _0x3165('0x158'):this[_0x3165('0x24a')](_0x5e3d94);break;case'COMMONEVENT':this[_0x3165('0x1f5')](_0x5e3d94);break;case'ITALIC':this[_0x3165('0x22a')](this['obtainEscapeParam'](_0x5e3d94));break;case _0x3165('0xae'):this[_0x3165('0xf9')](_0x5e3d94);break;case _0x3165('0x1bd'):this[_0x3165('0x180')](_0x5e3d94);break;case _0x3165('0x235'):this[_0x3165('0x22c')](_0x5e3d94);break;case _0x3165('0x1c1'):this['processCustomWait'](_0x5e3d94);break;case _0x3165('0x18c'):this[_0x3165('0x5b')](_0x5e3d94);break;default:this[_0x3165('0xe0')](_0x4051ee,_0x5e3d94);}},Window_Base[_0x3165('0x14c')]['processMessageCoreEscapeActions']=function(_0x36bea4,_0x4b16a7){for(const _0x5c5a39 of VisuMZ[_0x3165('0x109')][_0x3165('0x19b')]['TextCodeActions']){if(_0x5c5a39[_0x3165('0x19')]===_0x36bea4){if(_0x5c5a39['Type']==='')this[_0x3165('0x63')](_0x4b16a7);_0x5c5a39[_0x3165('0x1d7')][_0x3165('0x38')](this,_0x4b16a7);if(this[_0x3165('0x20e')]===Window_Message){const _0x20ec88=_0x5c5a39[_0x3165('0x24c')]||0x0;if(_0x20ec88>0x0)this[_0x3165('0x3f')](_0x20ec88);}}}},Window_Base[_0x3165('0x14c')][_0x3165('0x67')]=function(){this[_0x3165('0x60')][_0x3165('0x69')]+=VisuMZ[_0x3165('0x109')][_0x3165('0x19b')][_0x3165('0x32')][_0x3165('0x207')],this[_0x3165('0x60')][_0x3165('0x69')]=Math[_0x3165('0x22f')](this[_0x3165('0x60')][_0x3165('0x69')],VisuMZ[_0x3165('0x109')]['Settings'][_0x3165('0x32')][_0x3165('0x11')]);},Window_Base[_0x3165('0x14c')][_0x3165('0x1f4')]=function(){this[_0x3165('0x60')][_0x3165('0x69')]-=VisuMZ[_0x3165('0x109')][_0x3165('0x19b')][_0x3165('0x32')][_0x3165('0x207')],this[_0x3165('0x60')][_0x3165('0x69')]=Math['max'](this[_0x3165('0x60')][_0x3165('0x69')],VisuMZ[_0x3165('0x109')][_0x3165('0x19b')][_0x3165('0x32')]['FontSmallerCap']);},Window_Base['prototype'][_0x3165('0x280')]=function(_0x5db633){const _0x500ed1=this['obtainEscapeParam'](_0x5db633);this[_0x3165('0x60')][_0x3165('0x69')]=_0x500ed1[_0x3165('0x5a')](VisuMZ[_0x3165('0x109')]['Settings'][_0x3165('0x32')]['FontSmallerCap'],VisuMZ[_0x3165('0x109')]['Settings'][_0x3165('0x32')][_0x3165('0x11')]);},Window_Base[_0x3165('0x14c')][_0x3165('0xe9')]=function(_0x2ae9fa){let _0x754f41=this[_0x3165('0x60')][_0x3165('0x69')];const _0x14aff5=/\x1b({|}|FS)(\[(\d+)])?/gi;for(;;){const _0xb6ac6f=_0x14aff5[_0x3165('0x2f')](_0x2ae9fa);if(!_0xb6ac6f){if(_0x3165('0xd')!=='Toklo')break;else{function _0x31746b(){return _0x14121e;}}}const _0x4bee66=String(_0xb6ac6f[0x1])[_0x3165('0x17a')]();if(_0x4bee66==='{')this[_0x3165('0x67')]();else{if(_0x4bee66==='}'){if('QKuPN'===_0x3165('0x270'))this[_0x3165('0x1f4')]();else{function _0x1ceabd(){return this[_0x3165('0x259')](_0x54a318,!![],!![]),this[_0x3165('0xab')](_0x3165('0x61'),_0x54b1cf(_0x4b2293)||0x0),'';}}}else _0x4bee66==='FS'&&(this[_0x3165('0x60')][_0x3165('0x69')]=parseInt(_0xb6ac6f[0x3])[_0x3165('0x5a')](VisuMZ[_0x3165('0x109')][_0x3165('0x19b')][_0x3165('0x32')][_0x3165('0x160')],VisuMZ['MessageCore']['Settings'][_0x3165('0x32')][_0x3165('0x11')]));}this[_0x3165('0x60')]['fontSize']>_0x754f41&&(_0x754f41=this['contents'][_0x3165('0x69')]);}return _0x754f41;},Window_Base['prototype'][_0x3165('0x1e2')]=function(_0x3b410b){_0x3b410b['x']=this[_0x3165('0x63')](_0x3b410b),VisuMZ[_0x3165('0x109')]['Settings'][_0x3165('0x32')][_0x3165('0x1d0')]&&(_0x3b410b['x']+=_0x3b410b[_0x3165('0x9a')]);},Window_Base[_0x3165('0x14c')][_0x3165('0x261')]=function(_0x1470ff){_0x1470ff['y']=this[_0x3165('0x63')](_0x1470ff);if(VisuMZ['MessageCore'][_0x3165('0x19b')][_0x3165('0x32')][_0x3165('0x1d0')]){if(_0x3165('0x142')===_0x3165('0x142'))_0x1470ff['y']+=_0x1470ff['startY'];else{function _0x340a2b(){return this[_0x3165('0x35')]()[_0x3165('0x6e')];}}}},Window_Base[_0x3165('0x14c')][_0x3165('0x1c4')]=function(_0x4a8bd5){this[_0x3165('0x60')][_0x3165('0x19c')]=!!_0x4a8bd5;},Window_Base['prototype']['processFontChangeItalic']=function(_0x3744ed){this['contents'][_0x3165('0x20b')]=!!_0x3744ed;},Window_Base[_0x3165('0x14c')][_0x3165('0x22c')]=function(_0x35eaeb){const _0x4f0a5b=this[_0x3165('0x63')](_0x35eaeb);if(!_0x35eaeb[_0x3165('0x26')])return;switch(_0x4f0a5b){case 0x0:this[_0x3165('0x130')]('default');return;case 0x1:this[_0x3165('0x130')](_0x3165('0x24e'));break;case 0x2:this[_0x3165('0x130')](_0x3165('0x1cb'));break;case 0x3:this[_0x3165('0x130')]('right');break;}this[_0x3165('0x1d8')](_0x35eaeb);},Window_Base['prototype']['processTextAlignmentX']=function(_0x54c903){if(!_0x54c903[_0x3165('0x26')])return;if(_0x54c903[_0x3165('0x1f0')])return;if(this[_0x3165('0x5d')]()===_0x3165('0x1c8'))return;let _0x29f1eb=_0x54c903[_0x3165('0x1e4')][_0x3165('0x1f7')](_0x3165('0xbc'),_0x54c903[_0x3165('0x15c')]+0x1),_0x36dde4=_0x54c903[_0x3165('0x1e4')]['indexOf']('\x0a',_0x54c903[_0x3165('0x15c')]+0x1);if(_0x29f1eb<0x0)_0x29f1eb=_0x54c903[_0x3165('0x1e4')][_0x3165('0xe')]+0x1;if(_0x36dde4>0x0)_0x29f1eb=Math[_0x3165('0x22f')](_0x29f1eb,_0x36dde4);const _0x4c823e=_0x54c903[_0x3165('0x1e4')][_0x3165('0xd6')](_0x54c903[_0x3165('0x15c')],_0x29f1eb),_0x26329a=this[_0x3165('0x190')](_0x4c823e)[_0x3165('0x217')],_0x214a1d=_0x54c903[_0x3165('0x217')]||this[_0x3165('0x86')],_0x27f8e7=this['constructor']===Window_Message&&$gameMessage[_0x3165('0xc2')]()!=='';switch(this['getTextAlignment']()){case _0x3165('0x24e'):_0x54c903['x']=_0x54c903[_0x3165('0x9a')];break;case _0x3165('0x1cb'):_0x54c903['x']=_0x54c903[_0x3165('0x9a')],_0x54c903['x']+=Math[_0x3165('0x41')]((_0x214a1d-_0x26329a)/0x2);_0x27f8e7&&(_0x54c903['x']-=_0x54c903[_0x3165('0x9a')]/0x2);break;case'right':_0x54c903['x']=_0x214a1d-_0x26329a+_0x54c903[_0x3165('0x9a')];if(_0x27f8e7){if('XXvAp'===_0x3165('0x3e'))_0x54c903['x']-=_0x54c903['startX'];else{function _0x51dc58(){_0x2ae9c['x']-=_0x193f31[_0x3165('0x9a')]/0x2;}}}break;}},Window_Base[_0x3165('0x14c')][_0x3165('0x190')]=function(_0xe4c9ef){_0xe4c9ef=_0xe4c9ef[_0x3165('0x94')](/\x1b!/g,''),_0xe4c9ef=_0xe4c9ef[_0x3165('0x94')](/\x1b\|/g,''),_0xe4c9ef=_0xe4c9ef[_0x3165('0x94')](/\x1b\./g,'');const _0x5afb34=this['createTextState'](_0xe4c9ef,0x0,0x0,0x0),_0x5e8400=this[_0x3165('0x174')]();return _0x5afb34[_0x3165('0x26')]=![],this[_0x3165('0x168')](_0x5afb34),this['returnPreservedFontSettings'](_0x5e8400),{'width':_0x5afb34[_0x3165('0x156')],'height':_0x5afb34[_0x3165('0x1')]};},Window_Base[_0x3165('0x14c')][_0x3165('0x5b')]=function(_0x230faa){const _0x2ff6f5=(_0x230faa[_0x3165('0x1f0')]?-0x1:0x1)*this[_0x3165('0x1e9')]('\x20');_0x230faa['x']+=_0x2ff6f5;if(this['obtainEscapeParam'](_0x230faa)>0x0)_0x230faa['x']+=_0x2ff6f5;if(_0x230faa[_0x3165('0x1f0')])return;let _0x29ddd9=_0x230faa['text'][_0x3165('0x1f7')](_0x3165('0x1d5'),_0x230faa['index']+0x1),_0x232ec2=_0x230faa['text'][_0x3165('0x1f7')]('\x0a',_0x230faa[_0x3165('0x15c')]+0x1);if(_0x29ddd9<0x0)_0x29ddd9=_0x230faa['text'][_0x3165('0xe')]+0x1;if(_0x232ec2>0x0)_0x29ddd9=Math[_0x3165('0x22f')](_0x29ddd9,_0x232ec2);const _0x5aa439=_0x230faa[_0x3165('0x1e4')]['substring'](_0x230faa[_0x3165('0x15c')],_0x29ddd9),_0xb21e65=this['textSizeExWordWrap'](_0x5aa439)['width'];let _0x366f68=_0x230faa[_0x3165('0x217')]||this[_0x3165('0x86')];if(this['constructor']===Window_Message){if(_0x3165('0x27')==='DFSGU'){const _0x289241=$gameMessage[_0x3165('0xc2')]()===''?0x0:ImageManager['faceWidth']+0x14;_0x366f68-=_0x289241,VisuMZ[_0x3165('0x109')][_0x3165('0x19b')][_0x3165('0x18b')][_0x3165('0x1c7')]&&(_0x366f68-=_0x289241);}else{function _0x355a87(){this[_0x3165('0x25a')]=[];}}}let _0xd48dcb=![];if(_0x230faa['x']+_0xb21e65>_0x230faa['startX']+_0x366f68)_0xd48dcb=!![];if(_0xb21e65===0x0)_0xd48dcb=!![];_0xd48dcb&&(_0x230faa['text']=_0x230faa[_0x3165('0x1e4')][_0x3165('0x1c9')](0x0,_0x230faa[_0x3165('0x15c')])+'\x0a'+_0x230faa[_0x3165('0x1e4')][_0x3165('0x1d1')](_0x230faa['index']));},Window_Base['prototype'][_0x3165('0x12a')]=function(_0x309a36){const _0x27656f=this[_0x3165('0x276')](_0x309a36,0x0,0x0,0x0),_0x5a55d3=this[_0x3165('0x174')]();return _0x27656f[_0x3165('0x26')]=![],this[_0x3165('0x81')](![]),this[_0x3165('0x168')](_0x27656f),this[_0x3165('0x81')](!![]),this['returnPreservedFontSettings'](_0x5a55d3),{'width':_0x27656f[_0x3165('0x156')],'height':_0x27656f[_0x3165('0x1')]};},Window_Base['prototype'][_0x3165('0x1f5')]=function(_0x49635f){return this[_0x3165('0x63')](_0x49635f);},Window_Base[_0x3165('0x14c')][_0x3165('0xf9')]=function(_0x343af7){const _0x361cbf=this['obtainEscapeString'](_0x343af7)['split'](',');if(!_0x343af7[_0x3165('0x26')])return;const _0x6c5031=_0x361cbf[0x0]['trim'](),_0x5baf10=_0x361cbf[0x1]||0x0,_0x2fb4a4=_0x361cbf[0x2]||0x0,_0x303707=ImageManager[_0x3165('0x157')](_0x6c5031),_0x232676=this[_0x3165('0x60')]['paintOpacity'];_0x303707[_0x3165('0x28')](this[_0x3165('0x16b')][_0x3165('0x134')](this,_0x303707,_0x343af7['x'],_0x343af7['y'],_0x5baf10,_0x2fb4a4,_0x232676));},Window_Base[_0x3165('0x14c')][_0x3165('0x16b')]=function(_0x279488,_0x7f810c,_0x5a1292,_0x5a628b,_0x26d90c,_0x20cd41){_0x5a628b=_0x5a628b||_0x279488[_0x3165('0x217')],_0x26d90c=_0x26d90c||_0x279488[_0x3165('0x225')],this[_0x3165('0x89')][_0x3165('0x1c')]=_0x20cd41,this[_0x3165('0x89')][_0x3165('0x17d')](_0x279488,0x0,0x0,_0x279488[_0x3165('0x217')],_0x279488[_0x3165('0x225')],_0x7f810c,_0x5a1292,_0x5a628b,_0x26d90c),this[_0x3165('0x89')][_0x3165('0x1c')]=0xff;},Window_Base['prototype']['processDrawCenteredPicture']=function(_0x35a467){const _0x3619e1=this[_0x3165('0x281')](_0x35a467)[_0x3165('0x256')](',');if(!_0x35a467[_0x3165('0x26')])return;const _0x15f7ae=_0x3619e1[0x0][_0x3165('0x9f')](),_0x5f4f1e=ImageManager[_0x3165('0x157')](_0x15f7ae),_0x53a5a3=JsonEx[_0x3165('0x23e')](_0x35a467),_0x19756e=this[_0x3165('0x60')][_0x3165('0x1c')];_0x5f4f1e[_0x3165('0x28')](this['drawBackCenteredPicture'][_0x3165('0x134')](this,_0x5f4f1e,_0x53a5a3,_0x19756e));},Window_Base[_0x3165('0x14c')][_0x3165('0x252')]=function(_0x26280a,_0x46ea34,_0x2025bf){const _0x5c801d=_0x46ea34[_0x3165('0x217')]||this[_0x3165('0x86')],_0x1c07f9=this[_0x3165('0x153')]!==undefined?this[_0x3165('0xb3')]():this['innerHeight'],_0x2a785f=_0x5c801d/_0x26280a[_0x3165('0x217')],_0x26a46a=_0x1c07f9/_0x26280a[_0x3165('0x225')],_0x5b81d0=Math[_0x3165('0x22f')](_0x2a785f,_0x26a46a,0x1),_0x53094c=this[_0x3165('0x153')]!==undefined?(this[_0x3165('0x4d')](0x0)[_0x3165('0x225')]-this[_0x3165('0x154')]())/0x2:0x0,_0x4d40f2=_0x26280a[_0x3165('0x217')]*_0x5b81d0,_0x1e6440=_0x26280a[_0x3165('0x225')]*_0x5b81d0,_0x1cd858=Math[_0x3165('0x41')]((_0x5c801d-_0x4d40f2)/0x2)+_0x46ea34[_0x3165('0x9a')],_0x38845a=Math[_0x3165('0x41')]((_0x1c07f9-_0x1e6440)/0x2)+_0x46ea34[_0x3165('0x4b')]-_0x53094c*0x2;this['contentsBack']['paintOpacity']=_0x2025bf,this[_0x3165('0x89')]['blt'](_0x26280a,0x0,0x0,_0x26280a[_0x3165('0x217')],_0x26280a[_0x3165('0x225')],_0x1cd858,_0x38845a,_0x4d40f2,_0x1e6440),this[_0x3165('0x89')][_0x3165('0x1c')]=0xff;},Window_Base[_0x3165('0x14c')]['processColorLock']=function(_0x74dcff){const _0xcfc34=this[_0x3165('0x63')](_0x74dcff);if(_0x74dcff['drawing'])this[_0x3165('0x193')](_0xcfc34>0x0);},Window_Base[_0x3165('0x14c')][_0x3165('0x22d')]=function(_0x14d655){const _0x447174=this['obtainEscapeParam'](_0x14d655);this[_0x3165('0x20e')]===Window_Message&&_0x14d655[_0x3165('0x26')]&&this[_0x3165('0x113')](_0x447174);},Window_Help['prototype']['resetWordWrap']=function(){this[_0x3165('0x81')]($gameSystem[_0x3165('0xc3')]());},Window_Help[_0x3165('0x14c')][_0x3165('0x274')]=function(){return!![];},VisuMZ[_0x3165('0x109')][_0x3165('0xdf')]=Window_Help[_0x3165('0x14c')][_0x3165('0x21a')],Window_Help['prototype'][_0x3165('0x21a')]=function(){this[_0x3165('0x1b1')](),VisuMZ[_0x3165('0x109')][_0x3165('0xdf')][_0x3165('0x38')](this),this[_0x3165('0x138')]();},VisuMZ[_0x3165('0x109')][_0x3165('0x16a')]=Window_Options['prototype'][_0x3165('0x114')],Window_Options['prototype'][_0x3165('0x114')]=function(){VisuMZ[_0x3165('0x109')][_0x3165('0x16a')][_0x3165('0x38')](this),this[_0x3165('0x19f')]();},Window_Options[_0x3165('0x14c')][_0x3165('0x19f')]=function(){if(VisuMZ['MessageCore']['Settings'][_0x3165('0x9c')][_0x3165('0x20f')]){if(_0x3165('0x83')===_0x3165('0x83'))this[_0x3165('0x10')]();else{function _0x5b4b9b(){return!![];}}}},Window_Options[_0x3165('0x14c')][_0x3165('0x10')]=function(){const _0x533142=TextManager[_0x3165('0xce')],_0x365417=_0x3165('0x131');this['addCommand'](_0x533142,_0x365417);},VisuMZ[_0x3165('0x109')][_0x3165('0x15')]=Window_Options['prototype'][_0x3165('0xf1')],Window_Options[_0x3165('0x14c')][_0x3165('0xf1')]=function(_0x1f593a){const _0x31015f=this[_0x3165('0xad')](_0x1f593a);if(_0x31015f===_0x3165('0x131'))return this[_0x3165('0x1b0')]();return VisuMZ['MessageCore'][_0x3165('0x15')]['call'](this,_0x1f593a);},VisuMZ[_0x3165('0x109')]['Window_Options_isVolumeSymbol']=Window_Options[_0x3165('0x14c')][_0x3165('0x33')],Window_Options[_0x3165('0x14c')][_0x3165('0x33')]=function(_0x46dfbe){if(_0x46dfbe==='textSpeed')return!![];return VisuMZ[_0x3165('0x109')][_0x3165('0xfb')][_0x3165('0x38')](this,_0x46dfbe);},Window_Options['prototype']['textSpeedStatusText']=function(){const _0x4ab931=this['getConfigValue'](_0x3165('0x131'));if(_0x4ab931>0xa){if('QDhJS'!==_0x3165('0x1a5')){function _0x32bc7f(){_0x1a3a0e['x']-=_0x536c14[_0x3165('0x9a')];}}else return TextManager[_0x3165('0x1bb')];}else{if(_0x3165('0x30')!==_0x3165('0x1dd'))return _0x4ab931;else{function _0x7b93cd(){_0x45e6e2=_0x3165('0x25d')[_0x3165('0x3')](_0x43ba42,_0x41e384);}}}},VisuMZ['MessageCore'][_0x3165('0x88')]=Window_Options[_0x3165('0x14c')]['changeVolume'],Window_Options[_0x3165('0x14c')][_0x3165('0x17e')]=function(_0x348b30,_0x448cf8,_0x3c2908){if(_0x348b30===_0x3165('0x131'))return this[_0x3165('0x2')](_0x348b30,_0x448cf8,_0x3c2908);VisuMZ[_0x3165('0x109')][_0x3165('0x88')]['call'](this,_0x348b30,_0x448cf8,_0x3c2908);},Window_Options['prototype'][_0x3165('0x2')]=function(_0x342681,_0x24f2cd,_0x362081){const _0x17a788=this['getConfigValue'](_0x342681),_0x41758e=0x1,_0x410d92=_0x17a788+(_0x24f2cd?_0x41758e:-_0x41758e);_0x410d92>0xb&&_0x362081?this['changeValue'](_0x342681,0x1):this[_0x3165('0xf5')](_0x342681,_0x410d92[_0x3165('0x5a')](0x1,0xb));},Window_Message[_0x3165('0x14c')]['refreshDimmerBitmap']=function(){Window_Base[_0x3165('0x14c')][_0x3165('0x211')][_0x3165('0x38')](this),VisuMZ['MessageCore'][_0x3165('0x19b')][_0x3165('0x32')][_0x3165('0x1b2')]&&this[_0x3165('0x15a')]();},Window_Message[_0x3165('0x14c')][_0x3165('0x15a')]=function(){this[_0x3165('0x1c0')]['x']=Math[_0x3165('0x149')](this[_0x3165('0x217')]/0x2),this['_dimmerSprite']['anchor']['x']=0.5,this['_dimmerSprite'][_0x3165('0xba')]['x']=Graphics[_0x3165('0x217')];},VisuMZ[_0x3165('0x109')][_0x3165('0xf2')]=Window_Message[_0x3165('0x14c')]['clearFlags'],Window_Message[_0x3165('0x14c')][_0x3165('0x125')]=function(){VisuMZ[_0x3165('0x109')]['Window_Message_clearFlags']['call'](this),this['clearActorNameAutoColor'](),this[_0x3165('0x138')](),this[_0x3165('0x193')](![]),this[_0x3165('0x130')](_0x3165('0x1c8')),this[_0x3165('0x150')](VisuMZ[_0x3165('0x109')][_0x3165('0x19b')][_0x3165('0x32')][_0x3165('0xdc')]);},Window_Message[_0x3165('0x14c')]['resetWordWrap']=function(){this['setWordWrap']($gameSystem[_0x3165('0x14b')]());},Window_Message[_0x3165('0x14c')]['isAutoColorAffected']=function(){return!![];},Window_Message[_0x3165('0x14c')][_0x3165('0x150')]=function(_0xe4ab62){const _0x3e312f=0xb-ConfigManager[_0x3165('0x131')];_0xe4ab62=Math[_0x3165('0x149')](_0xe4ab62*_0x3e312f),this[_0x3165('0x1b9')]=_0xe4ab62,this['_textDelay']=_0xe4ab62;},VisuMZ[_0x3165('0x109')][_0x3165('0x199')]=Window_Message[_0x3165('0x14c')][_0x3165('0x10f')],Window_Message['prototype'][_0x3165('0x10f')]=function(){return VisuMZ[_0x3165('0x109')][_0x3165('0x199')][_0x3165('0x38')](this)||Input[_0x3165('0x11b')](VisuMZ['MessageCore'][_0x3165('0x19b')][_0x3165('0x32')][_0x3165('0x6a')]);},VisuMZ['MessageCore'][_0x3165('0x221')]=Window_Message[_0x3165('0x14c')][_0x3165('0x116')],Window_Message[_0x3165('0x14c')][_0x3165('0x116')]=function(){let _0x3c00bf=this['y'];VisuMZ[_0x3165('0x109')][_0x3165('0x221')][_0x3165('0x38')](this);if(this[_0x3165('0x11a')])this['y']=_0x3c00bf;this['clampPlacementPosition']();},VisuMZ[_0x3165('0x109')][_0x3165('0x15f')]=Window_Message['prototype'][_0x3165('0x244')],Window_Message[_0x3165('0x14c')][_0x3165('0x244')]=function(_0x387967){this[_0x3165('0x14d')](_0x387967),VisuMZ[_0x3165('0x109')][_0x3165('0x15f')][_0x3165('0x38')](this,_0x387967),this[_0x3165('0x13')]();},Window_Message[_0x3165('0x14c')]['onNewPageMessageCore']=function(_0xfd113e){this['prepareAutoSizeEscapeCharacters'](_0xfd113e),this[_0x3165('0x132')]();},VisuMZ[_0x3165('0x109')][_0x3165('0x1ae')]=Window_Message['prototype']['terminateMessage'],Window_Message[_0x3165('0x14c')][_0x3165('0xde')]=function(){VisuMZ[_0x3165('0x109')][_0x3165('0x1ae')][_0x3165('0x38')](this),this[_0x3165('0x125')]();if(this[_0x3165('0x14e')])this['messagePositionReset']();},Window_Message[_0x3165('0x14c')][_0x3165('0x132')]=function(){this['width']=$gameSystem[_0x3165('0x1fb')](),this[_0x3165('0x217')]=Math[_0x3165('0x22f')](Graphics['width'],this[_0x3165('0x217')]);const _0x3c879c=$gameSystem[_0x3165('0x11d')]();this[_0x3165('0x225')]=SceneManager['_scene'][_0x3165('0x271')](_0x3c879c,![]),this[_0x3165('0x225')]=Math[_0x3165('0x22f')](Graphics[_0x3165('0x225')],this[_0x3165('0x225')]);if($gameTemp[_0x3165('0x254')])this[_0x3165('0x1fe')]();},Window_Message[_0x3165('0x14c')]['resetPositionX']=function(){this['x']=(Graphics['boxWidth']-this[_0x3165('0x217')])/0x2,$gameTemp[_0x3165('0x254')]=undefined,this[_0x3165('0x266')]();},Window_Message[_0x3165('0x14c')][_0x3165('0x1bc')]=function(){const _0x164f41={'x':this['x'],'y':this['y']};Window_Base[_0x3165('0x14c')][_0x3165('0x1bc')]['call'](this),this[_0x3165('0x123')](_0x164f41);},Window_Message[_0x3165('0x14c')][_0x3165('0x1b8')]=function(){return!![];},Window_Message[_0x3165('0x14c')]['updateNameBoxMove']=function(_0x18f268){this[_0x3165('0x25f')]&&(this[_0x3165('0x25f')]['x']+=this['x']-_0x18f268['x'],this[_0x3165('0x25f')]['y']+=this['y']-_0x18f268['y']);},Window_Message[_0x3165('0x14c')][_0x3165('0x10d')]=function(_0x4888ec,_0x1a2ffe){this[_0x3165('0x105')](this[_0x3165('0x234')]['x'],this[_0x3165('0x145')]*(Graphics[_0x3165('0x277')]-this[_0x3165('0x225')])/0x2,this[_0x3165('0x234')]['width'],this['_resetRect'][_0x3165('0x225')],_0x4888ec,_0x1a2ffe);},Window_Message[_0x3165('0x14c')][_0x3165('0x1f5')]=function(_0x51d045){const _0x473dd1=Window_Base[_0x3165('0x14c')][_0x3165('0x1f5')][_0x3165('0x38')](this,_0x51d045);this[_0x3165('0x3f')](_0x473dd1);},Window_Message[_0x3165('0x14c')][_0x3165('0x3f')]=function(_0x4a6c5c){if($gameParty[_0x3165('0x1ff')]()){}else{if(_0x3165('0x95')!==_0x3165('0x248'))$gameMap[_0x3165('0xc')](_0x4a6c5c);else{function _0x37b260(){this[_0x3165('0x103')][_0x3165('0x129')]=0x2;}}}},Window_Message[_0x3165('0x14c')][_0x3165('0x2b')]=function(_0x2c396b){this[_0x3165('0x1b9')]--;if(this[_0x3165('0x1b9')]<=0x0){if(_0x3165('0x18e')==='cnMQy')this[_0x3165('0x278')](_0x2c396b),Window_Base[_0x3165('0x14c')][_0x3165('0x2b')]['call'](this,_0x2c396b);else{function _0x325e67(){_0x669017['setFaceImage'](_0x570433[0x0],_0x56ff0c[0x1]),_0x31824b[_0x3165('0x200')](_0x43e078[0x2]),_0x57cec1[_0x3165('0x111')](_0x419427[0x3]),_0xa65e5c[_0x3165('0x267')](_0x3a5e49[0x4]);}}}},Window_Message[_0x3165('0x14c')][_0x3165('0x278')]=function(_0x1d2139){this['_textDelayCount']=this['_textDelay'];if(this[_0x3165('0x171')]<=0x0)this[_0x3165('0x4f')]=!![];},VisuMZ[_0x3165('0x109')][_0x3165('0x128')]=Window_Message['prototype'][_0x3165('0x42')],Window_Message[_0x3165('0x14c')][_0x3165('0x42')]=function(_0x1f3c63,_0x25ca89){!_0x25ca89[_0x3165('0x26')]?Window_Base[_0x3165('0x14c')][_0x3165('0x42')][_0x3165('0x38')](this,_0x1f3c63,_0x25ca89):VisuMZ['MessageCore'][_0x3165('0x128')][_0x3165('0x38')](this,_0x1f3c63,_0x25ca89);},Window_Message[_0x3165('0x14c')][_0x3165('0xd4')]=function(_0x2ba2a6){let _0x5659a3=_0x2ba2a6[_0x3165('0x1e4')];_0x5659a3=_0x5659a3['replace'](/<(?:AUTO|AUTOSIZE|AUTO SIZE)>/gi,()=>{if('IWebk'!=='IWebk'){function _0x2704cd(){this['x']=(_0x54d682[_0x3165('0xa4')]-this[_0x3165('0x217')])/0x2,_0x4cd502['_centerMessageWindow']=_0x35c7cf,this[_0x3165('0x266')]();}}else return this[_0x3165('0x259')](_0x5659a3,!![],!![]),this['processAutoPosition'](_0x3165('0x78')),'';}),_0x5659a3=_0x5659a3[_0x3165('0x94')](/<(?:AUTOWIDTH|AUTO WIDTH)>/gi,()=>{return this[_0x3165('0x259')](_0x5659a3,!![],![]),this[_0x3165('0xab')](_0x3165('0x78')),'';}),_0x5659a3=_0x5659a3[_0x3165('0x94')](/<(?:AUTOHEIGHT|AUTO HEIGHT)>/gi,()=>{if('dOCQf'===_0x3165('0x1a4')){function _0x125e0f(){_0x517141=_0x11904c[_0x3165('0x49')];}}else return this[_0x3165('0x259')](_0x5659a3,![],!![]),this[_0x3165('0xab')](_0x3165('0x78')),'';});if(SceneManager['isSceneBattle']()){if(_0x3165('0x1f8')===_0x3165('0x1f8'))_0x5659a3=_0x5659a3[_0x3165('0x94')](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x27fa6b,_0xb9c8d)=>{if('rJoMP'!==_0x3165('0x104'))return this[_0x3165('0x259')](_0x5659a3,!![],!![]),this[_0x3165('0xab')](_0x3165('0x239'),Number(_0xb9c8d)||0x1),'';else{function _0x30a444(){var _0x22e683=new _0x3e75d0('\x5cb'+_0x238365+'\x5cb','g');}}}),_0x5659a3=_0x5659a3[_0x3165('0x94')](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x7dc43a,_0x2dc33a)=>{if('vAqTB'===_0x3165('0x26c'))return this[_0x3165('0x259')](_0x5659a3,!![],!![]),this[_0x3165('0xab')]('battle\x20party',Number(_0x2dc33a)||0x0),'';else{function _0x4d2b18(){this['makeFontBigger']();}}}),_0x5659a3=_0x5659a3['replace'](/<(?:AUTOENEMY|AUTO ENEMY):[ ](.*?)>/gi,(_0x1c908e,_0x2cb6d2)=>{return this[_0x3165('0x259')](_0x5659a3,!![],!![]),this[_0x3165('0xab')](_0x3165('0x13a'),Number(_0x2cb6d2)||0x0),'';});else{function _0x4b4761(){this[_0x3165('0x60')][_0x3165('0xeb')]=_0x4a3018[_0x3165('0x187')](),this[_0x3165('0x60')][_0x3165('0x69')]=_0x12dbbd[_0x3165('0x1a0')](),this['contents'][_0x3165('0x19c')]=![],this[_0x3165('0x60')][_0x3165('0x20b')]=![],this['resetTextColor']();}}}else{if(SceneManager[_0x3165('0x10c')]()){if(_0x3165('0x209')!==_0x3165('0x209')){function _0x5a8b28(){_0x307752['x']=this[_0x3165('0x63')](_0x26d6d9),_0x34bf95[_0x3165('0x109')][_0x3165('0x19b')][_0x3165('0x32')][_0x3165('0x1d0')]&&(_0x488756['x']+=_0x5a9ccf[_0x3165('0x9a')]);}}else _0x5659a3=_0x5659a3[_0x3165('0x94')](/<(?:AUTOPLAYER|AUTO PLAYER)>/gi,(_0x4be650,_0x3191c3)=>{return this[_0x3165('0x259')](_0x5659a3,!![],!![]),this[_0x3165('0xab')](_0x3165('0x4'),0x0),'';}),_0x5659a3=_0x5659a3['replace'](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x24d388,_0x1257ba)=>{if('uSzYG'===_0x3165('0x279')){function _0x2d4f74(){_0x59d038[_0x3165('0x109')]['Game_Map_updateEvents'][_0x3165('0x38')](this),this['updateMessageCommonEvents']();}}else return this[_0x3165('0x259')](_0x5659a3,!![],!![]),this[_0x3165('0xab')](_0x3165('0x120'),Number(_0x1257ba)||0x1),'';}),_0x5659a3=_0x5659a3[_0x3165('0x94')](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x413665,_0x10286c)=>{if(_0x3165('0x185')!==_0x3165('0x185')){function _0x49e62c(){const _0x206e25=_0x598bd5[_0x3165('0xe5')]('['+_0x163ac8['$1'][_0x3165('0x90')](/\d+/g)+']');for(const _0x5cda21 of _0x206e25){if(_0x4429fc[_0x3165('0x137')](_0x5cda21))return![];}return!![];}}else return this[_0x3165('0x259')](_0x5659a3,!![],!![]),this[_0x3165('0xab')](_0x3165('0x22b'),Number(_0x10286c)||0x0),'';}),_0x5659a3=_0x5659a3[_0x3165('0x94')](/<(?:AUTOEVENT|AUTO EVENT):[ ](.*?)>/gi,(_0x53f9c0,_0x2db2e7)=>{return this[_0x3165('0x259')](_0x5659a3,!![],!![]),this[_0x3165('0xab')](_0x3165('0x1d'),Number(_0x2db2e7)||0x0),'';});}}_0x2ba2a6[_0x3165('0x1e4')]=_0x5659a3;},Window_Message[_0x3165('0x19d')]=/<(?:AUTO|AUTOSIZE|AUTO SIZE|AUTOWIDTH|AUTO WIDTH|AUTOHEIGHT|AUTO HEIGHT|AUTOPLAYER|AUTO PLAYER)>/gi,Window_Message[_0x3165('0x198')]=/<(?:AUTOPARTY|AUTO PARTY|AUTOPLAYER|AUTO PLAYER|AUTOEVENT|AUTO EVENT|AUTOENEMY|AUTO ENEMY):[ ](.*?)>/gi,Window_Message[_0x3165('0x14c')][_0x3165('0x259')]=function(_0x4b2019,_0x1f3d77,_0x39942a){_0x4b2019=_0x4b2019[_0x3165('0x94')](Window_Message[_0x3165('0x19d')],''),_0x4b2019=_0x4b2019['replace'](Window_Message[_0x3165('0x198')],''),this[_0x3165('0x275')]=!![];const _0x22f5ba=this['textSizeEx'](_0x4b2019);if(_0x1f3d77){if(_0x3165('0x247')!==_0x3165('0x247')){function _0x1f0d49(){if(this[_0x3165('0x8d')]===_0x36ad5d)this[_0x3165('0x124')]();if(this[_0x3165('0x8d')][_0x3165('0x4c')]===_0x45ff9c)this[_0x3165('0x124')]();return this['_MessageCoreSettings']['choiceRows'];}}else{let _0x4e71a1=_0x22f5ba['width']+$gameSystem[_0x3165('0x4a')]()*0x2+0x6;const _0x45ebcb=$gameMessage[_0x3165('0xc2')]()!=='',_0x579421=ImageManager[_0x3165('0x19a')],_0x13bc61=0x14;_0x4e71a1+=_0x45ebcb?_0x579421+_0x13bc61:0x4,$gameSystem[_0x3165('0x146')](_0x4e71a1);}}if(_0x39942a){if(_0x3165('0x46')===_0x3165('0x46')){let _0x35071b=Math['ceil'](_0x22f5ba[_0x3165('0x225')]/this[_0x3165('0x154')]());$gameSystem[_0x3165('0x19e')](_0x35071b);}else{function _0x3030e0(){_0x4a5a24=_0x5d186f[_0x3165('0x94')](/\\V\[(\d+)\]/gi,(_0x52efde,_0xf61d74)=>this[_0x3165('0xf7')](_0x30c98a(_0x5ddd5a[_0x3165('0x137')](_0x328487(_0xf61d74)))));}}}this[_0x3165('0x9b')](),this[_0x3165('0x275')]=![],this[_0x3165('0x14e')]=!![];},Window_Message[_0x3165('0x14c')]['updateAutoSizePosition']=function(){this[_0x3165('0x132')](),this[_0x3165('0x116')](),this[_0x3165('0x1fe')](),this[_0x3165('0x60')][_0x3165('0x36')](),this[_0x3165('0x13')]();},Window_Message[_0x3165('0x14c')][_0x3165('0xab')]=function(_0x3b06c5,_0x574b2d){switch(_0x3b06c5[_0x3165('0x6b')]()[_0x3165('0x9f')]()){case _0x3165('0x239'):this[_0x3165('0x11a')]=$gameActors[_0x3165('0x1f2')](_0x574b2d);break;case _0x3165('0x61'):this[_0x3165('0x11a')]=$gameParty['members']()[_0x574b2d-0x1];break;case'battle\x20enemy':this['_autoPositionTarget']=$gameTroop[_0x3165('0x260')]()[_0x574b2d-0x1];break;case'map\x20player':this[_0x3165('0x11a')]=$gamePlayer;break;case _0x3165('0x120'):const _0x13b2df=$gameActors[_0x3165('0x1f2')](_0x574b2d)[_0x3165('0x15c')]();this[_0x3165('0x11a')]=$gamePlayer[_0x3165('0x223')]()[_0x13b2df-0x1];break;case _0x3165('0x22b'):this['_autoPositionTarget']=$gamePlayer[_0x3165('0x223')]()[_0x574b2d-0x1];break;case'map\x20event':this[_0x3165('0x11a')]=$gameMap[_0x3165('0x35')](_0x574b2d);break;}this['_autoPositionTarget']&&this[_0x3165('0x54')]();},VisuMZ[_0x3165('0x109')][_0x3165('0x135')]=Window_Message[_0x3165('0x14c')]['synchronizeNameBox'],Window_Message[_0x3165('0x14c')]['synchronizeNameBox']=function(){this[_0x3165('0x54')](),VisuMZ[_0x3165('0x109')][_0x3165('0x135')][_0x3165('0x38')](this);},Window_Message[_0x3165('0x14c')][_0x3165('0x54')]=function(){if(!this[_0x3165('0x11a')])return;const _0x8be2a8=SceneManager[_0x3165('0x3b')];if(!_0x8be2a8)return;if(!_0x8be2a8[_0x3165('0x265')])return;const _0x5996be=_0x8be2a8[_0x3165('0x265')]['findTargetSprite'](this[_0x3165('0x11a')]);if(!_0x5996be)return;let _0x53953b=_0x5996be['x'];_0x53953b-=this[_0x3165('0x217')]/0x2;let _0x393a45=_0x5996be['y'];_0x393a45-=this[_0x3165('0x225')],_0x5996be[_0x3165('0x127')]?_0x393a45-=_0x5996be['mainSprite']()[_0x3165('0x225')]+0x18:_0x393a45-=_0x5996be[_0x3165('0x225')]+0x8,this['x']=Math[_0x3165('0x149')](_0x53953b),this['y']=Math[_0x3165('0x149')](_0x393a45),this[_0x3165('0x266')](),this[_0x3165('0x25f')][_0x3165('0x116')]();},Window_Message[_0x3165('0x14c')][_0x3165('0x106')]=function(){this[_0x3165('0x14e')]=![],this[_0x3165('0x11a')]=undefined,$gameSystem['initMessageCore'](),this[_0x3165('0x9b')](),this[_0x3165('0x0')]=0x0;},Window_NameBox[_0x3165('0x14c')][_0x3165('0x274')]=function(){return![];},Window_NameBox[_0x3165('0x14c')]['resetTextColor']=function(){Window_Base[_0x3165('0x14c')][_0x3165('0x23f')][_0x3165('0x38')](this),this['changeTextColor'](this['defaultColor']());},Window_NameBox[_0x3165('0x14c')]['defaultColor']=function(){const _0x1f1358=VisuMZ[_0x3165('0x109')][_0x3165('0x19b')][_0x3165('0x32')][_0x3165('0x21d')];return ColorManager[_0x3165('0x66')](_0x1f1358);},VisuMZ[_0x3165('0x109')][_0x3165('0x1cc')]=Window_NameBox[_0x3165('0x14c')][_0x3165('0x116')],Window_NameBox[_0x3165('0x14c')][_0x3165('0x116')]=function(){VisuMZ[_0x3165('0x109')]['Window_NameBox_updatePlacement'][_0x3165('0x38')](this),this[_0x3165('0x21f')](),this['updateOffsetPosition'](),this[_0x3165('0x266')](),this[_0x3165('0x1a1')]();},Window_NameBox[_0x3165('0x14c')][_0x3165('0x177')]=function(_0x533b9a){return _0x533b9a=_0x533b9a[_0x3165('0x94')](/<LEFT>/gi,this['setRelativePosition']['bind'](this,0x0)),_0x533b9a=_0x533b9a[_0x3165('0x94')](/<CENTER>/gi,this[_0x3165('0x1c5')][_0x3165('0x134')](this,0x5)),_0x533b9a=_0x533b9a[_0x3165('0x94')](/<RIGHT>/gi,this[_0x3165('0x1c5')][_0x3165('0x134')](this,0xa)),_0x533b9a=_0x533b9a[_0x3165('0x94')](/<POSITION:[ ](\d+)>/gi,(_0x422e5b,_0xd226ca)=>this[_0x3165('0x1c5')](parseInt(_0xd226ca))),_0x533b9a=_0x533b9a[_0x3165('0x94')](/<\/LEFT>/gi,''),_0x533b9a=_0x533b9a['replace'](/<\/CENTER>/gi,''),_0x533b9a=_0x533b9a[_0x3165('0x94')](/<\/RIGHT>/gi,''),Window_Base[_0x3165('0x14c')][_0x3165('0x177')][_0x3165('0x38')](this,_0x533b9a);},Window_NameBox['prototype'][_0x3165('0x1c5')]=function(_0x4df4a6){return this[_0x3165('0x37')]=_0x4df4a6,'';},Window_NameBox[_0x3165('0x14c')][_0x3165('0x21f')]=function(){if($gameMessage[_0x3165('0x75')]())return;this[_0x3165('0x37')]=this[_0x3165('0x37')]||0x0;const _0x4027e3=this[_0x3165('0x9e')],_0x236417=Math[_0x3165('0x41')](_0x4027e3[_0x3165('0x217')]*this[_0x3165('0x37')]/0xa);this['x']=_0x4027e3['x']+_0x236417-Math[_0x3165('0x41')](this[_0x3165('0x217')]/0x2),this['x']=this['x'][_0x3165('0x5a')](_0x4027e3['x'],_0x4027e3['x']+_0x4027e3[_0x3165('0x217')]-this['width']);},Window_NameBox[_0x3165('0x14c')][_0x3165('0x16f')]=function(){if($gameMessage[_0x3165('0x75')]())return;this['_relativePosition']=this['_relativePosition']||0x0;const _0x3898c0=VisuMZ[_0x3165('0x109')][_0x3165('0x19b')]['General'][_0x3165('0x121')],_0x142546=VisuMZ[_0x3165('0x109')][_0x3165('0x19b')]['General'][_0x3165('0x226')],_0x42783a=(0x5-this[_0x3165('0x37')])/0x5;this['x']+=Math[_0x3165('0x41')](_0x3898c0*_0x42783a),this['y']+=_0x142546;},Window_NameBox['prototype'][_0x3165('0x1a1')]=function(){const _0x467863=this[_0x3165('0x9e')],_0x404c16=_0x467863['y'],_0x15f8ac=VisuMZ['MessageCore'][_0x3165('0x19b')][_0x3165('0x32')][_0x3165('0x226')];if(_0x404c16>this['y']&&_0x404c16<this['y']+this[_0x3165('0x225')]-_0x15f8ac){if('txeAr'===_0x3165('0x65'))this['y']=_0x467863['y']+_0x467863[_0x3165('0x225')];else{function _0x2fe0b4(){if(!_0x3ec155[_0x3165('0x137')](_0x238f1b))return![];}}}},VisuMZ[_0x3165('0x109')][_0x3165('0xaf')]=Window_NameBox['prototype']['refresh'],Window_NameBox[_0x3165('0x14c')][_0x3165('0x21a')]=function(){this[_0x3165('0x37')]=0x0,VisuMZ[_0x3165('0x109')]['Window_NameBox_refresh'][_0x3165('0x38')](this);},Window_ChoiceList[_0x3165('0x14c')]['isWordWrapEnabled']=function(){return![];},Window_ChoiceList[_0x3165('0x14c')]['isAutoColorAffected']=function(){return!![];},Window_ChoiceList[_0x3165('0x14c')]['lineHeight']=function(){return $gameSystem[_0x3165('0x1e5')]();},Window_ChoiceList[_0x3165('0x14c')][_0x3165('0x169')]=function(){return $gameSystem[_0x3165('0x26d')]();},Window_ChoiceList['prototype'][_0x3165('0x1fc')]=function(){this[_0x3165('0x15b')](),this[_0x3165('0x21a')](),this[_0x3165('0x243')](),this[_0x3165('0xf3')](),this[_0x3165('0x188')]();},Window_ChoiceList['prototype'][_0x3165('0x21a')]=function(){this[_0x3165('0x164')](),this['makeCommandList']();if(this['_messageWindow']){if(_0x3165('0x25e')!==_0x3165('0x25e')){function _0x6acbcb(){_0x44c5d1['Match']=_0x5c9c68[_0x3165('0x19')]['toUpperCase'](),_0x5e8094[_0x3165('0x1f9')]=new _0x13b673(''+_0x39a997[_0x3165('0x19')],'gi'),_0x1d8d6a[_0x3165('0x165')]=''+_0x273c9a['Match'];if(_0x5b279c['Type']==='')_0xa68be1[_0x3165('0x165')]+=_0x3165('0x1fa');}}else this[_0x3165('0x116')](),this['placeCancelButton']();}this[_0x3165('0x13')](),Window_Selectable['prototype'][_0x3165('0x21a')][_0x3165('0x38')](this);},Window_ChoiceList[_0x3165('0x14c')][_0x3165('0x114')]=function(){const _0xc8f8fa=$gameMessage[_0x3165('0x8f')]();let _0x4954ba=0x0;for(const _0xc6f4a9 of _0xc8f8fa){if(_0x3165('0x57')===_0x3165('0x57')){if(this['isChoiceVisible'](_0xc6f4a9)){const _0x47d7e3=_0xc6f4a9,_0x36b8ff=this[_0x3165('0x122')](_0xc6f4a9);this[_0x3165('0x11e')](_0x47d7e3,_0x3165('0x23a'),_0x36b8ff,_0x4954ba);}_0x4954ba++;}else{function _0x227a5e(){if(this[_0x3165('0x8d')]===_0xcbf19d)this[_0x3165('0x124')]();if(this[_0x3165('0x8d')]['choiceCols']===_0x2e9b7c)this[_0x3165('0x124')]();this[_0x3165('0x8d')][_0x3165('0x7b')]=_0xf1a5e6||0x1;}}}},Window_ChoiceList['prototype'][_0x3165('0x91')]=function(_0x16f0d0){if(_0x16f0d0[_0x3165('0x90')](/<HIDE>/i))return![];if(_0x16f0d0[_0x3165('0x90')](/<SHOW>/i))return!![];if(_0x16f0d0[_0x3165('0x90')](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2a45f6=JSON[_0x3165('0xe5')]('['+RegExp['$1'][_0x3165('0x90')](/\d+/g)+']');for(const _0x7de13e of _0x2a45f6){if(!$gameSwitches[_0x3165('0x137')](_0x7de13e))return![];}return!![];}if(_0x16f0d0[_0x3165('0x90')](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x3165('0xb1')!==_0x3165('0xfe')){const _0x4fe0d6=JSON['parse']('['+RegExp['$1'][_0x3165('0x90')](/\d+/g)+']');for(const _0x31ccb0 of _0x4fe0d6){if(_0x3165('0x1ed')!=='AMmII'){if(!$gameSwitches[_0x3165('0x137')](_0x31ccb0))return![];}else{function _0x3d529a(){_0x488134[_0x3165('0x109')][_0x3165('0x16a')][_0x3165('0x38')](this),this[_0x3165('0x19f')]();}}}return!![];}else{function _0x4ab5b2(){if(!_0xbf5e9b[_0x3165('0x137')](_0xae4b08))return![];}}}if(_0x16f0d0[_0x3165('0x90')](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x3165('0x1fd')!==_0x3165('0x218')){const _0x1f2888=JSON[_0x3165('0xe5')]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x31e9f9 of _0x1f2888){if($gameSwitches[_0x3165('0x137')](_0x31e9f9))return!![];}return![];}else{function _0x2b9949(){if(this[_0x3165('0x8d')]===_0x5c95ab)this['initMessageCore']();if(this[_0x3165('0x8d')][_0x3165('0x58')]===_0x2498ed)this[_0x3165('0x124')]();this[_0x3165('0x8d')][_0x3165('0x58')]=_0x4b7c2f[_0x3165('0x6b')]();}}}if(_0x16f0d0[_0x3165('0x90')](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1789f4=JSON['parse']('['+RegExp['$1'][_0x3165('0x90')](/\d+/g)+']');for(const _0x2a4af3 of _0x1789f4){if(_0x3165('0xac')!==_0x3165('0xac')){function _0x29a0c1(){return this[_0x3165('0x151')]()===0x65&&_0x436616[_0x3165('0x11d')]()>0x4?!![]:this[_0x3165('0x151')]()===0x191;}}else{if(!$gameSwitches['value'](_0x2a4af3))return!![];}}return![];}if(_0x16f0d0[_0x3165('0x90')](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x3165('0x12d')!==_0x3165('0x12d')){function _0x471254(){_0x409bff=this[_0x3165('0x60')][_0x3165('0x69')];}}else{const _0x36154e=JSON[_0x3165('0xe5')]('['+RegExp['$1'][_0x3165('0x90')](/\d+/g)+']');for(const _0x5a0e7d of _0x36154e){if(!$gameSwitches[_0x3165('0x137')](_0x5a0e7d))return!![];}return![];}}if(_0x16f0d0[_0x3165('0x90')](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1e13ba=JSON['parse']('['+RegExp['$1'][_0x3165('0x90')](/\d+/g)+']');for(const _0x975790 of _0x1e13ba){if(_0x3165('0x204')===_0x3165('0x206')){function _0x38f79d(){return this[_0x3165('0x259')](_0x17428b,!![],![]),this[_0x3165('0xab')](_0x3165('0x78')),'';}}else{if($gameSwitches[_0x3165('0x137')](_0x975790))return![];}}return!![];}return!![];},Window_ChoiceList[_0x3165('0x14c')][_0x3165('0x122')]=function(_0x3f6c4f){if(_0x3f6c4f[_0x3165('0x90')](/<DISABLE>/i))return![];if(_0x3f6c4f[_0x3165('0x90')](/<ENABLE>/i))return!![];if(_0x3f6c4f[_0x3165('0x90')](/<ENABLE[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4eda7c=JSON[_0x3165('0xe5')]('['+RegExp['$1'][_0x3165('0x90')](/\d+/g)+']');for(const _0x4803b1 of _0x4eda7c){if(!$gameSwitches[_0x3165('0x137')](_0x4803b1))return![];}return!![];}if(_0x3f6c4f[_0x3165('0x90')](/<ENABLE ALL[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x3165('0x1e0')==='JfVjG'){const _0x2a4804=JSON[_0x3165('0xe5')]('['+RegExp['$1'][_0x3165('0x90')](/\d+/g)+']');for(const _0x1c681a of _0x2a4804){if(!$gameSwitches[_0x3165('0x137')](_0x1c681a))return![];}return!![];}else{function _0x26d9bc(){const _0x314dc6=_0x5756b0[_0x3165('0xe5')]('['+_0xd4b135['$1'][_0x3165('0x90')](/\d+/g)+']');for(const _0x5f03dd of _0x314dc6){if(!_0x458ee9[_0x3165('0x137')](_0x5f03dd))return![];}return!![];}}}if(_0x3f6c4f[_0x3165('0x90')](/<ENABLE ANY[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3622ec=JSON[_0x3165('0xe5')]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x3db0f8 of _0x3622ec){if(_0x3165('0x172')!==_0x3165('0xd1')){if($gameSwitches[_0x3165('0x137')](_0x3db0f8))return!![];}else{function _0x155767(){const _0x144d14=_0x397467,_0x7d9a45=this[_0x3165('0x122')](_0x45058a);this[_0x3165('0x11e')](_0x144d14,'choice',_0x7d9a45,_0x328251);}}}return![];}if(_0x3f6c4f[_0x3165('0x90')](/<DISABLE[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x3165('0x194')!==_0x3165('0x241')){const _0x3c2988=JSON[_0x3165('0xe5')]('['+RegExp['$1'][_0x3165('0x90')](/\d+/g)+']');for(const _0x1f5b03 of _0x3c2988){if('WfOJq'===_0x3165('0x1aa')){if(!$gameSwitches[_0x3165('0x137')](_0x1f5b03))return!![];}else{function _0x25f0b3(){return this[_0x3165('0x259')](_0x38d5d6,!![],!![]),this[_0x3165('0xab')](_0x3165('0x13a'),_0x976e15(_0x115040)||0x0),'';}}}return![];}else{function _0x4ce841(){const _0x5f2ccd=this[_0x3165('0x281')](_0xb7f58f)['split'](',');if(!_0x4597e4[_0x3165('0x26')])return;const _0xbcefd4=_0x5f2ccd[0x0][_0x3165('0x9f')](),_0x7b00d4=_0x5f2ccd[0x1]||0x0,_0x47a4f0=_0x5f2ccd[0x2]||0x0,_0x2c0cd3=_0x470197[_0x3165('0x157')](_0xbcefd4),_0x213ba2=this['contents'][_0x3165('0x1c')];_0x2c0cd3[_0x3165('0x28')](this[_0x3165('0x16b')]['bind'](this,_0x2c0cd3,_0x1518a9['x'],_0xe69d14['y'],_0x7b00d4,_0x47a4f0,_0x213ba2));}}}if(_0x3f6c4f[_0x3165('0x90')](/<DISABLE ALL[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1375ae=JSON[_0x3165('0xe5')]('['+RegExp['$1'][_0x3165('0x90')](/\d+/g)+']');for(const _0x57b952 of _0x1375ae){if(!$gameSwitches[_0x3165('0x137')](_0x57b952))return!![];}return![];}if(_0x3f6c4f[_0x3165('0x90')](/<DISABLE ANY[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x3165('0x3c')===_0x3165('0x3c')){const _0x58a1d1=JSON[_0x3165('0xe5')]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x18a61f of _0x58a1d1){if($gameSwitches[_0x3165('0x137')](_0x18a61f))return![];}return!![];}else{function _0x5ab17c(){_0x2197ac=_0x3a650c[_0x3165('0x94')](/\x1b!/g,''),_0xd981c4=_0x32df47[_0x3165('0x94')](/\x1b\|/g,''),_0x18c37a=_0x16c0ed[_0x3165('0x94')](/\x1b\./g,'');const _0x277f21=this[_0x3165('0x276')](_0x18f8f4,0x0,0x0,0x0),_0x35c8bc=this[_0x3165('0x174')]();return _0x277f21[_0x3165('0x26')]=![],this[_0x3165('0x168')](_0x277f21),this[_0x3165('0x21')](_0x35c8bc),{'width':_0x277f21[_0x3165('0x156')],'height':_0x277f21[_0x3165('0x1')]};}}}return!![];},VisuMZ[_0x3165('0x109')]['Window_ChoiceList_updatePlacement']=Window_ChoiceList[_0x3165('0x14c')]['updatePlacement'],Window_ChoiceList['prototype'][_0x3165('0x116')]=function(){VisuMZ[_0x3165('0x109')][_0x3165('0x201')][_0x3165('0x38')](this),this[_0x3165('0x266')]();},Window_ChoiceList['prototype'][_0x3165('0x48')]=function(){if(!this[_0x3165('0xa7')])return;const _0x144045=0x8,_0x4a7cb3=this[_0x3165('0xa7')],_0x378dba=this['x']+this[_0x3165('0x217')],_0x3c6df9=Math[_0x3165('0x41')]((Graphics[_0x3165('0x217')]-Graphics[_0x3165('0xa4')])/0x2);_0x378dba>=Graphics[_0x3165('0xa4')]+_0x3c6df9-_0x4a7cb3[_0x3165('0x217')]+_0x144045?_0x4a7cb3['x']=-_0x4a7cb3[_0x3165('0x217')]-_0x144045:_0x4a7cb3['x']=this[_0x3165('0x217')]+_0x144045,_0x4a7cb3['y']=this[_0x3165('0x225')]/0x2-_0x4a7cb3[_0x3165('0x225')]/0x2;},VisuMZ[_0x3165('0x109')][_0x3165('0xcd')]=Window_ChoiceList[_0x3165('0x14c')][_0x3165('0x238')],Window_ChoiceList[_0x3165('0x14c')][_0x3165('0x238')]=function(){if(this[_0x3165('0x9e')])return this[_0x3165('0x258')]();else{if(_0x3165('0x68')!==_0x3165('0x68')){function _0x563620(){this[_0x3165('0x101')]=this[_0x3165('0x101')]||[];const _0x2bef8d=this[_0x3165('0x13b')]['_eventId'],_0x54cf16=new _0x2c6ddc(_0x54ca5d,_0x2bef8d);this[_0x3165('0x101')][_0x3165('0x152')](_0x54cf16);}}else return VisuMZ[_0x3165('0x109')][_0x3165('0xcd')][_0x3165('0x38')](this);}},Window_ChoiceList[_0x3165('0x14c')][_0x3165('0x258')]=function(){const _0xa24b5e=$gameMessage[_0x3165('0x77')]();if(_0xa24b5e===0x1)return(Graphics[_0x3165('0xa4')]-this[_0x3165('0x1ec')]())/0x2;else return _0xa24b5e===0x2?this[_0x3165('0x9e')]['x']+this[_0x3165('0x9e')]['width']-this[_0x3165('0x1ec')]():this[_0x3165('0x9e')]['x'];},Window_ChoiceList[_0x3165('0x14c')][_0x3165('0x1ec')]=function(){const _0x2a64cc=(this[_0x3165('0xbe')]()+this[_0x3165('0x212')]())*this[_0x3165('0x169')]()+this[_0x3165('0x14a')]*0x2;return Math[_0x3165('0x22f')](_0x2a64cc,Graphics[_0x3165('0x217')]);},Window_ChoiceList[_0x3165('0x14c')][_0x3165('0x2c')]=function(){const _0x3b117e=Math[_0x3165('0x2d')]($gameMessage[_0x3165('0x8f')]()[_0x3165('0xe')]/this[_0x3165('0x169')]());return Math[_0x3165('0x22f')](_0x3b117e,this[_0x3165('0x8c')]());},Window_ChoiceList[_0x3165('0x14c')][_0x3165('0x8c')]=function(){const _0x25c28f=this[_0x3165('0x9e')],_0x5e46dc=_0x25c28f?_0x25c28f['y']:0x0,_0x51b1d4=_0x25c28f?_0x25c28f[_0x3165('0x225')]:0x0,_0x2f5d8a=Graphics['boxHeight']/0x2;if(_0x5e46dc<_0x2f5d8a&&_0x5e46dc+_0x51b1d4>_0x2f5d8a){if(_0x3165('0x246')!==_0x3165('0x246')){function _0x29a84f(){return this[_0x3165('0x3b')]&&this[_0x3165('0x3b')][_0x3165('0x20e')]===_0x34b4aa;}}else return 0x4;}else return $gameSystem['getChoiceListMaxRows']();},Window_ChoiceList[_0x3165('0x14c')][_0x3165('0xbe')]=function(){let _0x239e7d=0x60;for(const _0x51e0d9 of this[_0x3165('0x1a3')]){if(_0x3165('0x195')===_0x3165('0x195')){const _0x10c8d3=_0x51e0d9['name'],_0x4a8a0b=this['textSizeEx'](_0x10c8d3)[_0x3165('0x217')],_0x10ab9c=Math[_0x3165('0x2d')](_0x4a8a0b)+this[_0x3165('0x23b')]()*0x2;if(_0x239e7d<_0x10ab9c){if(_0x3165('0x76')===_0x3165('0x8')){function _0x2b62e8(){if(this[_0x3165('0x103')]===_0x229735)this['initMessageCore']();return this[_0x3165('0x103')];}}else _0x239e7d=_0x10ab9c;}}else{function _0x593c20(){_0xa68ce4-=_0x14aa8a[_0x3165('0x225')]+0x8;}}}return _0x239e7d;},Window_ChoiceList[_0x3165('0x14c')]['drawItem']=function(_0x555573){const _0x54418d=this[_0x3165('0x245')](_0x555573),_0x536cbd=$gameSystem[_0x3165('0x14')]()!==_0x3165('0x1c8')?_0x3165('0xc8')[_0x3165('0x3')]($gameSystem['getChoiceListTextAlign']()):'',_0x5a5942=_0x536cbd+this[_0x3165('0x1ef')](_0x555573);this[_0x3165('0xc4')](this[_0x3165('0xe2')](_0x555573)),this['drawTextEx'](_0x5a5942,_0x54418d['x'],_0x54418d['y'],_0x54418d[_0x3165('0x217')]);},Window_ChoiceList[_0x3165('0x14c')]['callOkHandler']=function(){$gameMessage[_0x3165('0x133')](this['currentExt']()),this['_messageWindow'][_0x3165('0xde')](),this[_0x3165('0xa9')]();};