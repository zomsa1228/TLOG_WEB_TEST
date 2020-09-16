//=============================================================================
// VisuStella MZ - Battle Core
// VisuMZ_1_BattleCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_BattleCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleCore = VisuMZ.BattleCore || {};
VisuMZ.BattleCore.version = 1.04;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.04] [BattleCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Battle Core plugin revamps the battle engine provided by RPG Maker MZ to
 * become more flexible, streamlined, and support a variety of features. The
 * updated battle engine allows for custom Action Sequences, battle layout
 * styles, and a lot of control over the battle mechanics, too.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Action Sequence Plugin Commands to give you full control over what happens
 *   during the course of a skill or item.
 * * Animated Sideview Battler support for enemies!
 * * Auto Battle options for party-wide and actor-only instances.
 * * Base Troop Events to quickly streamline events for all Troop events.
 * * Battle Command control to let you change which commands appear for actors.
 * * Battle Layout styles to change the way the battle scene looks.
 * * Casting animation support for skills.
 * * Critical Hit control over the success rate formula and damage multipliers.
 * * Custom target scopes added for skills and items.
 * * Damage formula control, including Damage Styles.
 * * Damage caps, both hard caps and soft caps.
 * * Damage traits such Armor Penetration/Reduction to bypass defenses.
 * * Elements & Status Menu Core support for traits.
 * * Multitude of JavaScript notetags and global Plugin Parameters to let you
 *   make a variety of effects across various instances during battle.
 * * Party Command window can be skipped/disabled entirely.
 * * Weather effects now show in battle.
 * * Streamlined Battle Log to remove redundant information and improve the
 *   flow of battle.
 * * Visual HP Gauges can be displayed above the heads of actors and/or enemies
 *   with a possible requirement for enemies to be defeated at least once first
 *   in order for them to show.
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
 * Major Changes
 * ============================================================================
 *
 * This plugin will overwrite some core parts of the RPG Maker MZ base code in
 * order to ensure the Battle Core plugin will work at full capacity. The
 * following are explanations of what has been changed.
 *
 * ---
 *
 * Action Sequences
 *
 * - Action sequences are now done either entirely by the Battle Log Window or
 * through common events if the <Custom Action Sequence> notetag is used.
 * In RPG Maker MZ by default, Action Sequences would be a mixture of using the
 * Battle Log Window, the Battle Manager, and the Battle Scene, making it hard
 * to fully grab control of the situation.
 *
 * ---
 *
 * Action Speed
 *
 * - Action speeds determine the turn order in the default battle system. The
 * AGI of a battle unit is also taken into consideration. However, the random
 * variance applied to the action speed system makes the turn order extremely
 * chaotic and hard for the player to determine. Thus, the random variance
 * aspect of it has been turned off. This can be reenabled by default through
 * Plugin Parameters => Mechanics Settings => Allow Random Speed?
 *
 * ---
 *
 * Animated Sideview Battler Support For Enemies
 *
 * - Enemies can now use Sideview Actor sprites for themselves! They will
 * behave like actors and can even carry their own set of weapons for physical
 * attacks. These must be set up using notetags. More information can be found
 * in the notetag section.
 *
 * - As the sprites are normally used for actors, some changes have been made
 * to Sprite_Actor to be able to support both actors and enemies. These changes
 * should have minimal impact on other plugins.
 *
 * ---
 *
 * Battle Sprite Updates
 *
 * - A lot of functions in Sprite_Battler, Sprite_Actor, and Sprite_Enemy have
 * been overwritten to make the new Action Sequence system added by this plugin
 * possible. These changes make it possible for the sprites to move anywhere on
 * the screen, jump, float, change visibility, and more.
 *
 * ---
 *
 * Change Battle Back in Battle
 * 
 * - By default, the Change Battle Back event command does not work in battle.
 * Any settings made to it will only reflect in the following battle. Now, if
 * the battle back event command is used during battle, it will reflect upon
 * any new changes immediately.
 *
 * ---
 *
 * Critical Hit - LUK Influence
 *
 * - The LUK Buffs now affect the critical hit rate based off how the formula
 * is now calculated. Each stack of a LUK Buff will double the critical hit
 * rate and compound upon that. That means a x1 LUK Buff stack will raise it by
 * x2, a x2 LUK Buff stack will raise the critical hit rate by x4, a x3 LUK
 * Buff Stack will raise the critical hit rate stack by x8, and so on.
 *
 * - LUK also plays a role in how much damage is dealt with critical hits. The
 * default critical hit multiplier has been reduced from x3 to x2. However, a
 * percentage of LUK will added on (based off the user's CRI rate) onto the
 * finalized critical damage. If the user's CRI rate is 4%, then 4% of the user
 * LUK value will also be added onto the damage.
 *
 * - This change can be altered through Plugin Parameters => Damage Settings =>
 * Critical Hits => JS: Rate Formula and JS: Damage Formula.
 *
 * ---
 * 
 * Damage Popups
 * 
 * - Damage popups are now formatted with + and - to determine healing and
 * damage. MP Damage will also include "MP" at the back. This is to make it
 * clearer what each colored variant of the damage popup means as well as help
 * color blind players read the on-screen data properly.
 * 
 * - Damage popups have also been rewritten to show all changed aspects instead
 * of just one. Previously with RPG Maker MZ, if an action would deal both HP
 * and MP damage, only one of them would show. Now, everything is separated and
 * both HP and MP changes will at a time.
 * 
 * ---
 *
 * Force Action
 *
 * - Previously, Forced Actions would interrupt the middle of an event to
 * perform an action. However, with the addition of more flexible Action
 * Sequences, the pre-existing Force Action system would not be able to exist
 * and would require being remade.
 *
 * - Forced Actions now are instead, added to a separate queue from the action
 * battler list. Whenever an action and/or common event is completed, then if
 * there's a Forced Action battler queued, then the Forced Action battler will
 * have its turn. This is the cleanest method available and avoids the most
 * conflicts possible.
 *
 * - This means if you planned to make cinematic sequences with Forced Actions,
 * you will need to account for the queued Force Actions. However, in the case
 * of battle cinematics, we would highly recommend that you use the newly added
 * Action Sequence Plugin Commands instead as those give you more control than
 * any Force Action ever could.
 *
 * ---
 *
 * Random Scope
 *
 * - The skill and item targeting scopes for Random Enemy, 2 Random Enemies,
 * 3 Random Enemies, 4 Random Enemies will now ignore TGR and utilize true
 * randomness.
 *
 * ---
 *
 * Spriteset_Battle Update
 *
 * - The spriteset now has extra containers to separate battlers (actors and
 * enemies), animations, and damage. This is to make actors and enemy battler
 * sprites more efficient to sort (if enabled), so that animations won't
 * interfere with and cover damage sprites, and to make sure damage sprites are
 * unaffected by screen tints in order to ensure the player will always have a
 * clear read on the information relaying sprites.
 *
 * ---
 *
 * Weather Displayed in Battle
 *
 * - Previously, weather has not been displayed in battle. This means that any
 * weather effects placed on the map do not transfer over to battle and causes
 * a huge disconnect for players. The Battle Core plugin will add weather
 * effects to match the map's weather conditions. Any changes made to weather
 * through event commands midway through battle will also be reflected.
 *
 * ---
 *
 * ============================================================================
 * Base Troops
 * ============================================================================
 *
 * Base Troops can be found, declared, and modified in the Plugin Parameters =>
 * Mechanics Settings => Base Troop ID's. All of the listed Troop ID's here
 * will have their page events replicated and placed under all other troops
 * found in the database.
 *
 * ---
 *
 * This means that if you have an event that runs on Turn 1 of a Base Troop,
 * then for every troop out there, that same event will also run on Turn 1,
 * as well. This is useful for those who wish to customize their battle system
 * further and to reduce the amount of work needed to copy/paste said event
 * pages into every database troop object manually.
 *
 * ---
 *
 * ============================================================================
 * Damage Styles
 * ============================================================================
 *
 * Damage Styles are a new feature added through the Battle Core plugin. When
 * using certain Battle Styles, you can completely ignore typing in the whole
 * damage formula inside the damage formula input box, and instead, insert
 * either a power amount or a multiplier depending on the Damage Style. The
 * plugin will then automatically calculate damage using that value factoring
 * in ATK, DEF, MAT, MDF values.
 *
 * ---
 *
 * Here is a list of the Damage Styles that come with this plugin by default.
 * You can add in your own and even edit them to your liking.
 * Or just remove them if you want.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Style          Use Formula As   PH/MA Disparity   Stat Scale   Damage Scale
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Standard       Formula          No                Varies       Varies
 * ArmorScaling   Formula          No                Varies       Varies
 * CT             Multiplier       Yes               Low          Normal
 * D4             Multiplier       No                High         Normal
 * DQ             Multiplier       No                Low          Low
 * FF7            Power            Yes               Low          High
 * FF8            Power            Yes               Medium       Normal
 * FF9            Power            Yes               Low          Normal
 * FF10           Power            Yes               Medium       High
 * MK             Multiplier       No                Medium       Low
 * MOBA           Multiplier       No                Medium       Normal
 * PKMN           Power            No                Low          Normal
 *
 * Use the above chart to figure out which Damage Style best fits your game,
 * if you plan on using them.
 *
 * The 'Standard' style is the same as the 'Manual' formula input, except that
 * it allows for the support of <Armor Penetration> and <Armor Reduction>
 * notetags.
 *
 * The 'Armor Scaling' style allows you to type in the base damage calculation
 * without the need to type in any defending modifiers.
 *
 * NOTE: While these are based off the damage formulas found in other games,
 * not all of them are exact replicas. Many of them are adapted for use in
 * RPG Maker MZ since not all RPG's use the same set of parameters and not all
 * external multipliers function the same way as RPG Maker MZ.
 * 
 * ---
 *
 * Style:
 * - This is what the Damage Style is.
 *
 * Use Formula As:
 * - This is what you insert into the formula box.
 * - Formula: Type in the formula for the action just as you would normally.
 * - Multiplier: Type in the multiplier for the action.
 *     Use float values. This means 250% is typed out as 2.50
 * - Power: Type in the power constant for the action.
 *     Use whole numbers. Type in something like 16 for a power constant.
 * 
 * PH/MA Disparity:
 * - Is there a disparity between how Physical Attacks and Magical Attacks
 *   are calculated?
 * - If yes, then physical attacks and magical attacks will have different
 *   formulas used.
 * - If no, then physical attacks and magical attacks will share similar
 *   formulas for how they're calculated.
 *
 * Stat Scale:
 * - How much should stats scale throughout the game?
 * - Low: Keep them under 100 for the best results.
 * - Medium: Numbers work from low to mid 400's for best results.
 * - High: The numbers really shine once they're higher.
 *
 * Damage Scale:
 * - How much does damage vary depending on small parameter changes?
 * - Low: Very little increase from parameter changes.
 * - Normal: Damage scales close to proportionally with parameter changes.
 * - High: Damage can boost itself drastically with parameter changes.
 *
 * ---
 *
 * To determine what kind of parameters are used for the Damage Styles, they
 * will depend on two things: the action's 'Hit Type' (ie Physical Attack,
 * Magical Attack, and Certain Hit) and the action's 'Damage Type' (ie. Damage,
 * Recovery, or Drain).
 *
 * Certain Hit tends to use whichever value is higher: ATK or MAT, and then
 * ignores the target's defense values. Use Certain Hits for 'True Damage'.
 *
 * Use the chart below to figure out everything else:
 * 
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Hit Type      Damage Type   Attacker Parameter   Defender Parameter
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Physical      Damage        ATK                  DEF
 * Magical       Damage        MAT                  MDF
 * Certain Hit   Damage        Larger (ATK, MAT)    -Ignores-
 * Physical      Recover       DEF                  -Ignores-
 * Magical       Recover       MDF                  -Ignores-
 * Certain Hit   Recover       Larger (ATK, MAT)    -Ignores-
 * Physical      Drain         ATK                  DEF
 * Magical       Drain         MAT                  MDF
 * Certain Hit   Drain         Larger (ATK, MAT)    -Ignores-
 *
 * These can be modified within the Plugin Parameters in the individual
 * Damage Styles themselves.
 *
 * ---
 *
 * Skills and Items can use different Damage Styles from the setting you've
 * selected in the Plugin Parameters. They can be altered to have different
 * Damage Styles through the usage of a notetag:
 *
 * <Damage Style: name>
 *
 * This will use whichever style is found in the Plugin Parameters.
 *
 * If "Manual" is used, then no style will be used and all calculations will be
 * made strictly based off the formula found inside the formula box.
 *
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 * 
 * === HP Gauge-Related Notetags ===
 * 
 * The following notetags allow you to set whether or not HP Gauges can be
 * displayed by enemies regardless of Plugin Parameter settings.
 * 
 * ---
 *
 * <Show HP Gauge>
 *
 * - Used for: Enemy Notetags
 * - Will always show the HP Gauge for the enemy regardless of the defeat
 *   requirement setting.
 * - This does not bypass the player's Options preferences.
 * - This does not bypass disabling enemy HP Gauges as a whole.
 * 
 * ---
 *
 * <Hide HP Gauge>
 *
 * - Used for: Enemy Notetags
 * - Will always hide the HP Gauge for the enemy regardless of the defeat
 *   requirement setting.
 * - This does not bypass the player's Options preferences.
 * 
 * ---
 * 
 * <Battle UI Offset: +x, +y>
 * <Battle UI Offset: -x, -y>
 * 
 * <Battle UI Offset X: +x>
 * <Battle UI Offset X: -x>
 * 
 * <Battle UI Offset Y: +y>
 * <Battle UI Offset Y: -y>
 * 
 * - Used for: Actor and Enemy Notetags
 * - Adjusts the offset of HP Gauges and State Icons above the heads of actors
 *   and enemies.
 * - Replace 'x' with a number value that offsets the x coordinate.
 * - Negative x values offset left. Positive x values offset right.
 * - Replace 'y' with a number value that offsets the y coordinate.
 * - Negative y values offset up. Positive x values offset down.
 * 
 * ---
 *
 * === Animation-Related Notetags ===
 *
 * The following notetags allow you to set animations to play at certain
 * instances and/or conditions.
 *
 * ---
 *
 * <Slip Animation: x>
 *
 * - Requires VisuMZ_0_CoreEngine!
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - During the phase at which the user regenerates HP, MP, or TP, this
 *   animation will play as long as the user is alive and visible.
 * - Replace 'x' with a number value representing the Animation ID to play.
 *
 * ---
 *
 * <Cast Animation: x>
 *
 * - Used for: Skill Notetags
 * - Plays a battle animation at the start of the skill.
 * - Replace 'x' with a number value representing the Animation ID to play.
 *
 * ---
 *
 * <Attack Animation: x>
 *
 * - Used for: Enemy Notetags
 * - Gives an enemy an attack animation to play for its basic attack.
 * - Replace 'x' with a number value representing the Animation ID to play.
 *
 * ---
 *
 * === Battleback-Related Notetags ===
 *
 * You can apply these notetags to have some control over the battlebacks that
 * appear in different regions of the map for random or touch encounters.
 *
 * ---
 *
 * <Region x Battleback1: filename>
 * <Region x Battleback2: filename>
 * 
 * - Used for: Map Notetags
 * - If the player starts a battle while standing on 'x' region, then the
 *   'filename' battleback will be used.
 * - Replace 'x' with a number representing the region ID you wish to use.
 * - Replace 'filename' with the filename of the graphic to use. Do not insert
 *   any extensions. This means the file 'Castle1.png' will be only inserted
 *   as 'Castle1' without the '.png' at the end.
 * - *NOTE: This will override any specified battleback settings.
 *
 * ---
 *
 * === Battle Command-Related Notetags ===
 *
 * You can use notetags to change how the battle commands of playable
 * characters appear in battle as well as whether or not they can be used.
 *
 * ---
 *
 * <Seal Attack>
 * <Seal Guard>
 * <Seal Item>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Prevents specific battle commands from being able to be used.
 *
 * ---
 *
 * <Battle Commands>
 *  Attack
 *  Skills
 *  SType: x
 *  SType: name
 *  All Skills
 *  Skill: x
 *  Skill: name
 *  Guard
 *  Item
 *  Party
 *  Escape
 *  Auto Battle
 * </Battle Commands>
 *
 * - Used for: Class Notetags
 * - Changes which commands appear in the Actor Command Window in battle.
 *   If this notetag is not used, then the default commands determined in
 *   Plugin Parameters => Actor Command Window => Command List will be used.
 * - Add/remove/modify entries as needed.
 *
 * - Attack 
 *   - Adds the basic attack command.
 * 
 * - Skills
 *   - Displays all the skill types available to the actor.
 * 
 * - SType: x
 * - Stype: name
 *   - Adds in a specific skill type.
 *   - Replace 'x' with the ID of the skill type.
 *   - Replace 'name' with the name of the skill type (without text codes).
 *
 * - All Skills
 *   - Adds all usable battle skills as individual actions.
 * 
 * - Skill: x
 * - Skill: name
 *   - Adds in a specific skill as a usable action.
 *   - Replace 'x' with the ID of the skill.
 *   - Replace 'name' with the name of the skill.
 * 
 * - Guard
 *   - Adds the basic guard command.
 * 
 * - Item
 *   - Adds the basic item command.
 *
 * - Party
 *   - Requires VisuMZ_2_PartySystem.
 *   - Allows this actor to switch out with a different party member.
 * 
 * - Escape
 *   - Adds the escape command.
 * 
 * - Auto Battle
 *   - Adds the auto battle command.
 *
 * Example:
 *
 * <Battle Commands>
 *  Attack
 *  Skill: Heal
 *  Skills
 *  Guard
 *  Item
 *  Escape
 * </Battle Commands>
 *
 * ---
 *
 * <Command Text: x>
 *
 * - Used for: Skill Notetags
 * - When a skill is used in a <Battle Commands> notetag set, you can change
 *   the skill name text that appears to something else.
 * - Replace 'x' with the skill's name you want to shown in the Actor Battle
 *   Command window.
 * - Recommended Usage: Shorten skill names that are otherwise too big to fit
 *   inside of the Actor Battle Command window.
 *
 * ---
 *
 * <Command Icon: x>
 *
 * - Used for: Skill Notetags
 * - When a skill is used in a <Battle Commands> notetag set, you can change
 *   the skill icon that appears to something else.
 * - Replace 'x' with the ID of icon you want shown in the Actor Battle Command
 *   window to represent the skill.
 *
 * ---
 * 
 * <Command Show Switch: x>
 * 
 * <Command Show All Switches: x,x,x>
 * <Command Show Any Switches: x,x,x>
 * 
 * - Used for: Skill Notetags
 * - Determines if a battle command is visible or not through switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, item will be hidden until all
 *   switches are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, item will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 * - This can be applied to Attack and Guard commands, too.
 * 
 * ---
 * 
 * <Command Hide Switch: x>
 * 
 * <Command Hide All Switches: x,x,x>
 * <Command Hide Any Switches: x,x,x>
 * 
 * - Used for: Skill Notetags
 * - Determines if a battle command is visible or not through switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, item will be shown until all
 *   switches are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, item will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 * - This can be applied to Attack and Guard commands, too.
 * 
 * ---
 * 
 * <Battle Portrait: filename>
 *
 * - Used for: Actor
 * - This is used with the "Portrait" Battle Layout.
 * - Sets the battle portrait image for the actor to 'filename'.
 * - Replace 'filename' with a picture found within your game project's
 *   img/pictures/ folder. Filenames are case sensitive. Leave out the filename
 *   extension from the notetag.
 * - This will override any menu images used for battle only.
 * 
 * ---
 * 
 * === JavaScript Notetag: Battle Command-Related ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if skill-based battle commands are visible or hidden.
 * 
 * ---
 * 
 * <JS Command Visible>
 *  code
 *  code
 *  visible = code;
 * </JS Command Visible>
 * 
 * - Used for: Skill Notetags
 * - The 'visible' variable is the final returned variable to determine the
 *   skill's visibility in the Battle Command Window.
 * - Replace 'code' with JavaScript code to determine the skill's visibility in
 *   the Battle Command Window.
 * - The 'user' variable represents the user who will perform the skill.
 * - The 'skill' variable represents the skill to be used.
 * 
 * ---
 *
 * === Targeting-Related Notetags ===
 *
 * The following notetags are related to the targeting aspect of skills and
 * items and may adjust the scope of how certain skills/items work.
 *
 * ---
 *
 * <Always Hit>
 *
 * <Always Hit Rate: x%>
 *
 * - Used for: Skill, Item Notetags
 * - Causes the action to always hit or to always have a hit rate of exactly
 *   the marked x%.
 * - Replace 'x' with a number value representing the hit success percentage.
 *
 * ---
 *
 * <Repeat Hits: x>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the number of hits the action will produce.
 * - Replace 'x' with a number value representing the number of hits to incur.
 *
 * ---
 *
 * <Target: x Random Any>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the skill pick 'x' random targets when used.
 * - Targets can be both actors and enemies.
 * - Replace 'x' with a number value representing the number of random targets.
 *
 * ---
 *
 * <Target: x Random Enemies>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the skill pick 'x' random targets when used.
 * - Targets are only enemies.
 * - Replace 'x' with a number value representing the number of random targets.
 *
 * ---
 *
 * <Target: x Random Allies>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the skill pick 'x' random targets when used.
 * - Targets are only actors.
 * - Replace 'x' with a number value representing the number of random targets.
 *
 * ---
 *
 * <Target: All Allies But User>
 *
 * - Used for: Skill, Item Notetags
 * - Targets all allies with the exception of the user.
 *
 * ---
 *
 * === JavaScript Notetag: Targeting-Related ===
 *
 * ---
 * 
 * <JS Targets>
 *  code
 *  code
 *  targets = [code];
 * </JS Targets>
 *
 * - Used for: Skill, Item Notetags
 * - The 'targets' variable is an array that is returned to be used as a
 *   container for all the valid action targets.
 * - Replace 'code' with JavaScript code to determine valid targets.
 *
 * ---
 *
 * === Damage-Related Notetags ===
 *
 * ---
 *
 * <Damage Style: name>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'name' with a Damage Style name to change the way calculations are
 *   made using the damage formula input box.
 * - Names can be found in Plugin Parameters => Damage Settings => Style List
 *
 * ---
 *
 * <Armor Reduction: x>
 * <Armor Reduction: x%>
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, sets the current skill/item's armor
 *   reduction properties to 'x' and/or 'x%'.
 * - If used on trait objects, adds 'x' and/or 'x%' armor reduction properties
 *   when calculating one's own armor.
 * - This applies to physical attacks.
 * - Use the 'x' notetag variant to determine a flat reduction value.
 * - Use the 'x%' notetag variant to determine a percentile reduction value.
 *
 * ---
 *
 * <Armor Penetration: x>
 * <Armor Penetration: x%>
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, sets the current skill/item's armor
 *   penetration properties to 'x' and/or 'x%'.
 * - If used on trait objects, adds 'x' and/or 'x%' armor penetration
 *   properties when calculating a target's armor.
 * - This applies to physical attacks.
 * - Use the 'x' notetag variant to determine a flat penetration value.
 * - Use the 'x%' notetag variant to determine a percentile penetration value.
 *
 * ---
 *
 * <Magic Reduction: x>
 * <Magic Reduction: x%>
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, sets the current skill/item's armor
 *   reduction properties to 'x' and/or 'x%'.
 * - If used on trait objects, adds 'x' and/or 'x%' armor reduction properties
 *   when calculating one's own armor.
 * - This applies to magical attacks.
 * - Use the 'x' notetag variant to determine a flat reduction value.
 * - Use the 'x%' notetag variant to determine a percentile reduction value.
 *
 * ---
 *
 * <Magic Penetration: x>
 * <Magic Penetration: x%>
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, sets the current skill/item's armor
 *   penetration properties to 'x' and/or 'x%'.
 * - If used on trait objects, adds 'x' and/or 'x%' armor penetration
 *   properties when calculating a target's armor.
 * - This applies to magical attacks.
 * - Use the 'x' notetag variant to determine a flat penetration value.
 * - Use the 'x%' notetag variant to determine a percentile penetration value.
 *
 * ---
 *
 * <Bypass Damage Cap>
 * 
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, this will cause the action to never have
 *   its damage capped.
 * - If used on trait objects, this will cause the affected unit to never have
 *   its damage capped.
 *
 * ---
 *
 * <Damage Cap: x>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, this will declare the hard damage cap to
 *   be the 'x' value.
 * - If used on trait objects, this will raise the affect unit's hard damage
 *   cap to 'x' value. If another trait object has a higher value, use that
 *   value instead.
 *
 * ---
 *
 * <Bypass Soft Damage Cap>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, this will cause the action to never have
 *   its damage scaled downward to the soft cap.
 * - If used on trait objects, this will cause the affected unit to never have
 *   its damage scaled downward to the soft cap.
 *
 * ---
 *
 * <Soft Damage Cap: +x%>
 * <Soft Damage Cap: -x%>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, this will increase/decrease the action's
 *   soft cap by x% where 'x' is a percentage value representing the increment
 *   changed by the hard cap value.
 * - If used on trait objects, this will raise the affect unit's soft damage
 *   limit by x% where 'x' is a percentage value representing the increment
 *   changed by the hard cap value.
 *
 * ---
 *
 * <Unblockable>
 *
 * - Used for: Skill, Item Notetags
 * - Using "Guard" against this skill will not reduce any damage.
 *
 * ---
 *
 * === Critical-Related Notetags ===
 *
 * The following notetags affect skill and item critical hit rates and the
 * critical damage multiplier.
 *
 * ---
 *
 * <Always Critical>
 *
 * - Used for: Skill, Item Notetags
 * - This skill/item will always land a critical hit regardless of the
 *   user's CRI parameter value.
 *
 * ---
 *
 * <Set Critical Rate: x%>
 *
 * - Used for: Skill, Item Notetags
 * - This skill/item will always have a x% change to land a critical hit
 *   regardless of user's CRI parameter value.
 * - Replace 'x' with a percerntage value representing the success rate.
 *
 * ---
 *
 * <Modify Critical Rate: x%>
 * <Modify Critical Rate: +x%>
 * <Modify Critical Rate: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - Modifies the user's CRI parameter calculation for this skill/item.
 * - The 'x%' notetag variant will multiply the user's CRI parameter value
 *   for this skill/item.
 * - The '+x%' and '-x%' notetag variants will incremenetally increase/decrease
 *   the user's CRI parameter value for this skill/item.
 *
 * ---
 *
 * <Modify Critical Multiplier: x%>
 * <Modify Critical Multiplier: +x%>
 * <Modify Critical Multiplier: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - These notetags determine the damage multiplier when a critical hit lands.
 * - The 'x%' notetag variant multiply the multiplier to that exact percentage.
 * - The '+x%' and '-x%' notetag variants will change the multiplier with an
 *   incremenetal rate for this skill/item.
 *
 * ---
 *
 * <Modify Critical Bonus Damage: x%>
 * <Modify Critical Bonus Damage: +x%>
 * <Modify Critical Bonus Damage: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - These notetags determine the bonus damage added when a critical hit lands.
 * - The 'x%' notetag variant multiply the damage to that exact percentage.
 * - The '+x%' and '-x%' notetag variants will change the bonus damage with an
 *   incremenetal rate for this skill/item.
 *
 * ---
 *
 * === JavaScript Notetags: Critical-Related ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine how critical hit-related aspects are calculated.
 *
 * ---
 *
 * <JS Critical Rate>
 *  code
 *  code
 *  rate = code;
 * </JS Critical Rate>
 *
 * - Used for: Skill, Item Notetags
 * - The 'rate' variable is the final returned amount to determine the
 *   critical hit success rate.
 * - Replace 'code' with JavaScript code to determine the final 'rate' to be
 *   returned as the critical hit success rate.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Critical Damage>
 *  code
 *  code
 *  multiplier = code;
 *  bonusDamage = code;
 * </JS Critical Damage>
 *
 * - Used for: Skill, Item Notetags
 * - The 'multiplier' variable is returned later and used as the damage
 *   multiplier used to amplify the critical damage amount.
 * - The 'bonusDamage' variable is returned later and used as extra added
 *   damage for the critical damage amount.
 * - Replace 'code' with JavaScript code to determine how the 'multiplier' and
 *   'bonusDamage' variables are calculated.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * === Action Sequence-Related Notetags ===
 *
 * Action Sequences allow you full control over how a skill and/or item plays
 * through its course. These notetags give you control over various aspects of
 * those Action Sequences. More information is found in the Action Sequences
 * help section.
 *
 * ---
 *
 * <Custom Action Sequence>
 *
 * - Used for: Skill, Item Notetags
 * - Removes all automated Action Sequence parts from the skill.
 * - Everything Action Sequence-related will be done by Common Events.
 * - Insert Common Event(s) into the skill/item's effects list to make use of
 *   the Custom Action Sequences.
 * - This will prevent common events from loading in the Item Scene and Skill
 *   Scene when used outside of battle.
 *
 * ---
 *
 * <Display Icon: x>
 * <Display Text: string>
 *
 * - Used for: Skill, Item Notetags
 * - When displaying the skill/item name in the Action Sequence, determine the
 *   icon and/or text displayed.
 * - Replace 'x' with a number value representing the icon ID to be displayed.
 * - Replace 'string' with a text value representing the displayed name.
 *
 * ---
 *
 * === Animated Sideview Battler-Related Notetags ===
 *
 * Enemies can use Animated Sideview Actor graphics thanks to this plugin.
 * These notetags give you control over that aspect. Some of these also affect
 * actors in addition to enemies.
 *
 * ---
 *
 * <Sideview Battler: filename>
 *
 * <Sideview Battlers>
 *  filename: weight
 *  filename: weight
 *  filename: weight
 * </Sideview Battlers>
 *
 * - Used for: Enemy Notetags
 * - Replaces the enemy's battler graphic with an animated Sideview Actor
 *   graphic found in the img/sv_actors/ folder.
 * - Replace 'filename' with the filename of the graphic to use. Do not insert
 *   any extensions. This means the file 'Actor1_1.png' will be only inserted
 *   as 'Actor1_1' without the '.png' at the end.
 * - If the multiple notetag vaiant is used, then a random filename is selected
 *   from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the 'filename'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'filename' instead.
 * - Add/remove lines as you see fit.
 *
 * Example:
 *
 * <Sideview Battlers>
 *  Actor1_1: 25
 *  Actor1_3: 10
 *  Actor1_5
 *  Actor1_7
 * </Sideview Battlers>
 *
 * ---
 *
 * <Sideview Anchor: x, y>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets the sprite anchor positions for the sideview sprite.
 * - Replace 'x' and 'y' with numbers depicting where the anchors should be for
 *   the sideview sprite.
 * - By default, the x and y anchors are 0.5 and 1.0.
 *
 * ---
 * 
 * <Sideview Home Offset: +x, +y>
 * <Sideview Home Offset: -x, -y>
 * 
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Offsets the sideview actor sprite's home position by +/-x, +/-y.
 * - Replace 'x' and 'y' with numbers depicting how much to offset each of the
 *   coordinates by. For '0' values, use +0 or -0.
 * - This notetag will not work if you remove it from the JavaScript code in
 *   Plugin Parameters > Actor > JS:  Home Position
 * 
 * ---
 * 
 * <Sideview Weapon Offset: +x, +y>
 * <Sideview Weapon Offset: -x, -y>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy State Notetags
 * - Offsets the sideview weapon sprite's position by +/-x, +/-y.
 * - Replace 'x' and 'y' with numbers depicting how much to offset each of the
 *   coordinates by. For '0' values, use +0 or -0.
 * 
 * ---
 *
 * <Sideview Show Shadow>
 * <Sideview Hide Shadow>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets it so the sideview battler's shadow will be visible or hidden.
 *
 * ---
 *
 * <Sideview Collapse>
 * <Sideview No Collapse>
 *
 * - Used for: Enemy Notetags
 * - Either shows the collapse graphic or does not show the collapse graphic.
 * - Collapse graphic means the enemy will 'fade away' once it's defeated.
 * - No collapse graphic means the enemy's corpse will remain on the screen.
 *
 * ---
 *
 * <Sideview Idle Motion: name>
 *
 * <Sideview Idle Motions>
 *  name: weight
 *  name: weight
 *  name: weight
 * </Sideview Idle Motions>
 *
 * - Used for: Enemy Notetags
 * - Changes the default idle motion for the enemy.
 * - Replace 'name' with any of the following motion names:
 *   - 'walk', 'wait', 'chant', 'guard', 'damage', 'evade', 'thrust', 'swing',
 *     'missile', 'skill', 'spell', 'item', 'escape', 'victory', 'dying',
 *     'abnormal', 'sleep', 'dead'
 * - If the multiple notetag vaiant is used, then a random motion name is
 *   selected from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the 'name'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'name' instead.
 * - Add/remove lines as you see fit.
 *
 * Example:
 *
 * <Sideview Idle Motions>
 *  walk: 25
 *  wait: 50
 *  guard
 *  victory
 *  abnormal
 * </Sideview Idle Motions>
 *
 * ---
 *
 * <Sideview Size: width, height>
 *
 * - Used for: Enemy Notetags
 * - When using a sideview battler, its width and height will default to the
 *   setting made in Plugin Parameters => Enemy Settings => Size: Width/Height.
 * - This notetag lets you change that value to something else.
 * - Replace 'width' and 'height' with numbers representing how many pixels
 *   wide/tall the sprite will be treated as.
 *
 * ---
 *
 * <Sideview Weapon: weapontype>
 *
 * <Sideview Weapons>
 *  weapontype: weight
 *  weapontype: weight
 *  weapontype: weight
 * </Sideview Weapons>
 *
 * - Used for: Enemy Notetags
 * - Give your sideview enemies weapons to use.
 * - Replace 'weapontype' with the name of the weapon type found under the
 *   Database => Types => Weapon Types list (without text codes).
 * - If the multiple notetag vaiant is used, then a random weapon type is
 *   selected from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the weapontype
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'weapontype' instead.
 * - Add/remove lines as you see fit.
 *
 * Example:
 *
 * <Sideview Weapons>
 *  Dagger: 25
 *  Sword: 25
 *  Axe
 * </Sideview Weapons>
 *
 * ---
 *
 * <traitname Sideview Battler: filename>
 *
 * <traitname Sideview Battlers>
 *  filename: weight
 *  filename: weight
 *  filename: weight
 * </traitname Sideview Battlers>
 *
 * - Used for: Enemy Notetags
 * - Requires VisuMZ_1_ElementStatusCore
 * - Allows certain Trait Sets to cause battlers to have a unique appearance.
 * - Replace 'filename' with the filename of the graphic to use. Do not insert
 *   any extensions. This means the file 'Actor1_1.png' will be only inserted
 *   as 'Actor1_1' without the '.png' at the end.
 * - If the multiple notetag vaiant is used, then a random filename is selected
 *   from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the 'filename'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'filename' instead.
 * - Add/remove lines as you see fit.
 *
 * Examples:
 *
 * <Male Sideview Battlers>
 *  Actor1_1: 25
 *  Actor1_3: 10
 *  Actor1_5
 *  Actor1_7
 * </Male Sideview Battlers>
 *
 * <Female Sideview Battlers>
 *  Actor1_2: 25
 *  Actor1_4: 10
 *  Actor1_6
 *  Actor1_8
 * </Female Sideview Battlers>
 *
 * ---
 *
 * <traitname Sideview Idle Motion: name>
 *
 * <traitname Sideview Idle Motions>
 *  name: weight
 *  name: weight
 *  name: weight
 * </traitname Sideview Idle Motions>
 *
 * - Used for: Enemy Notetags
 * - Requires VisuMZ_1_ElementStatusCore
 * - Allows certain Trait Sets to cause battlers to have unique idle motions.
 * - Replace 'name' with any of the following motion names:
 *   - 'walk', 'wait', 'chant', 'guard', 'damage', 'evade', 'thrust', 'swing',
 *     'missile', 'skill', 'spell', 'item', 'escape', 'victory', 'dying',
 *     'abnormal', 'sleep', 'dead'
 * - If the multiple notetag vaiant is used, then a random motion name is
 *   selected from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the 'name'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'name' instead.
 * - Add/remove lines as you see fit.
 *
 * Examples:
 *
 * <Jolly Sideview Idle Motions>
 *  wait: 25
 *  victory: 10
 *  walk
 * </Jolly Sideview Idle Motions>
 *
 * <Serious Sideview Idle Motions>
 *  walk: 25
 *  guard: 10
 *  wait
 * </Jolly Sideview Idle Motions>
 *
 * ---
 *
 * <traitname Sideview Weapon: weapontype>
 *
 * <traitname Sideview Weapons>
 *  weapontype: weight
 *  weapontype: weight
 *  weapontype: weight
 * </traitname Sideview Weapons>
 *
 * - Used for: Enemy Notetags
 * - Requires VisuMZ_1_ElementStatusCore
 * - Allows certain Trait Sets to cause battlers to have unique weapons.
 * - Replace 'weapontype' with the name of the weapon type found under the
 *   Database => Types => Weapon Types list (without text codes).
 * - If the multiple notetag vaiant is used, then a random weapon type is
 *   selected from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the weapontype
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'weapontype' instead.
 * - Add/remove lines as you see fit.
 *
 * Examples:
 *
 * <Male Sideview Weapons>
 *  Dagger: 25
 *  Sword: 25
 *  Axe
 * </Male Sideview Weapons>
 *
 * <Female Sideview Weapons>
 *  Dagger: 25
 *  Spear: 25
 *  Cane
 * </Female Sideview Weapons>
 *
 * ---
 *
 * === Enemy-Related Notetags ===
 *
 * ---
 *
 * <Battler Sprite Cannot Move>
 *
 * - Used for: Enemy Notetags
 * - Prevents the enemy from being able to move, jump, and/or float due to
 *   Action Sequences. Useful for rooted enemies.
 *
 * ---
 *
 * <Swap Enemies>
 *  name: weight
 *  name: weight
 *  name: weight
 * </Swap Enemies>
 *
 * - Used for: Enemy Notetags
 * - Causes this enemy database object to function as a randomizer for any of
 *   the listed enemies inside the notetag. When the enemy is loaded into the
 *   battle scene, the enemy is immediately replaced with one of the enemies
 *   listed. The randomization is based off the 'weight' given to each of the
 *   enemy 'names'.
 * - Replace 'name' with the database enemy of the enemy you wish to replace
 *   the enemy with.
 * - Replace 'weight' with a number value representing how often the 'name'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'name' instead.
 * - Add/remove lines as you see fit.
 *
 * Example:
 *
 * <Swap Enemies>
 *  Bat: 50
 *  Slime: 25
 *  Orc
 *  Minotaur
 * </Swap Enemies>
 *
 * ---
 *
 * === JavaScript Notetags: Mechanics-Related ===
 *
 * These JavaScript notetags allow you to run code at specific instances during
 * battle provided that the unit has that code associated with them in a trait
 * object (actor, class, weapon, armor, enemy, or state). How you use these is
 * entirely up to you and will depend on your ability to understand the code
 * used and driven for each case.
 *
 * ---
 *
 * <JS Pre-Start Battle>
 *  code
 *  code
 *  code
 * </JS Pre-Start Battle>
 *
 * <JS Post-Start Battle>
 *  code
 *  code
 *  code
 * </JS Post-Start Battle>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the start of battle aimed at the function:
 *   BattleManager.startBattle()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-Start Turn>
 *  code
 *  code
 *  code
 * </JS Pre-Start Turn>
 *
 * <JS Post-Start Turn>
 *  code
 *  code
 *  code
 * </JS Post-Start Turn>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the start of a turn aimed at the function:
 *   BattleManager.startTurn()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-Start Action>
 *  code
 *  code
 *  code
 * </JS Pre-Start Action>
 *
 * <JS Post-Start Action>
 *  code
 *  code
 *  code
 * </JS Post-Start Action>
 * 
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the start of an action aimed at the function:
 *   BattleManager.startAction()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-Apply>
 *  code
 *  code
 *  code
 * </JS Pre-Apply>
 * 
 * - Used for: Skill, Item Notetags
 * - Runs JavaScript code at the start of an action hit aimed at the function:
 *   Game_Action.prototype.apply()
 *   - 'Pre' runs before the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Pre-Apply as User>
 *  code
 *  code
 *  code
 * </JS Pre-Apply as User>
 *
 * <JS Pre-Apply as Target>
 *  code
 *  code
 *  code
 * </JS Pre-Apply as Target>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the start of an action hit aimed at the function:
 *   Game_Action.prototype.apply()
 *   - 'Pre' runs before the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - If the 'as User' notetag variant is used, this code will be run as a
 *   response to the action from the action user end.
 * - If the 'as Target' notetag variant is used, this code will be run as a
 *   response to the action from the action target end.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Pre-Damage>
 *  code
 *  code
 *  code
 * </JS Pre-Damage>
 * 
 * - Used for: Skill, Item Notetags
 * - Runs JavaScript code before damage is dealt aimed at the function:
 *   Game_Action.prototype.executeDamage()
 *   - 'Pre' runs before the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Pre-Damage as User>
 *  code
 *  code
 *  code
 * </JS Pre-Damage as User>
 *
 * <JS Pre-Damage as Target>
 *  code
 *  code
 *  code
 * </JS Pre-Damage as Target>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code before damage is dealt aimed at the function:
 *   Game_Action.prototype.executeDamage()
 *   - 'Pre' runs before the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - If the 'as User' notetag variant is used, this code will be run as a
 *   response to the action from the action user end.
 * - If the 'as Target' notetag variant is used, this code will be run as a
 *   response to the action from the action target end.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Post-Damage>
 *  code
 *  code
 *  code
 * </JS Post-Damage>
 * 
 * - Used for: Skill, Item Notetags
 * - Runs JavaScript code after damage is dealt aimed at the function:
 *   Game_Action.prototype.executeDamage()
 *   - 'Post' runs after the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Post-Damage as User>
 *  code
 *  code
 *  code
 * </JS Post-Damage as User>
 *
 * <JS Post-Damage as Target>
 *  code
 *  code
 *  code
 * </JS Post-Damage as Target>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code after damage is dealt aimed at the function:
 *   Game_Action.prototype.executeDamage()
 *   - 'Post' runs after the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - If the 'as User' notetag variant is used, this code will be run as a
 *   response to the action from the action user end.
 * - If the 'as Target' notetag variant is used, this code will be run as a
 *   response to the action from the action target end.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Post-Apply>
 *  code
 *  code
 *  code
 * </JS Post-Apply>
 * 
 * - Used for: Skill, Item Notetags
 * - Runs JavaScript code at the end of an action hit aimed at the function:
 *   Game_Action.prototype.apply()
 *   - 'Post' runs after the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Post-Apply as User>
 *  code
 *  code
 *  code
 * </JS Post-Apply as User>
 *
 * <JS Post-Apply as Target>
 *  code
 *  code
 *  code
 * </JS Post-Apply as Target>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the end of an action hit aimed at the function:
 *   Game_Action.prototype.apply()
 *   - 'Post' runs after the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - If the 'as User' notetag variant is used, this code will be run as a
 *   response to the action from the action user end.
 * - If the 'as Target' notetag variant is used, this code will be run as a
 *   response to the action from the action target end.
 * - Replace 'code' with JavaScript code to run desired effects.
 *
 * ---
 *
 * <JS Pre-End Action>
 *  code
 *  code
 *  code
 * </JS Pre-End Action>
 *
 * <JS Post-End Action>
 *  code
 *  code
 *  code
 * </JS Post-End Action>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the end of an action aimed at the function:
 *   BattleManager.endAction()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-End Turn>
 *  code
 *  code
 *  code
 * </JS Pre-End Turn>
 *
 * <JS Post-End Turn>
 *  code
 *  code
 *  code
 * </JS Post-End Turn>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the end of a turn aimed at the function:
 *   Game_Battler.prototype.onTurnEnd()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-Regenerate Turn>
 *  code
 *  code
 *  code
 * </JS Pre-Regenerate Turn>
 *
 * <JS Post-Regenerate Turn>
 *  code
 *  code
 *  code
 * </JS Post-Regenerate Turn>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when a unit regenerates HP/MP aimed at the function:
 *   Game_Battler.prototype.regenerateAll()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Battle Victory>
 *  code
 *  code
 *  code
 * </JS Battle Victory>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when a battle is won aimed at the function:
 *   BattleManager.processVictory()
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Escape Success>
 *  code
 *  code
 *  code
 * </JS Escape Success>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when escaping succeeds aimed at the function:
 *   BattleManager.onEscapeSuccess()
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Escape Failure>
 *  code
 *  code
 *  code
 * </JS Escape Failure>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when escaping fails aimed at the function:
 *   BattleManager.onEscapeFailure()
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Battle Defeat>
 *  code
 *  code
 *  code
 * </JS Battle Defeat>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when a battle is lost aimed at the function:
 *   BattleManager.processDefeat()
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-End Battle>
 *  code
 *  code
 *  code
 * </JS Pre-End Battle>
 *
 * <JS Post-End Battle>
 *  code
 *  code
 *  code
 * </JS Post-End Battle>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when the battle is over aimed at the function:
 *   BattleManager.endBattle()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * ============================================================================
 * Action Sequence - Plugin Commands
 * ============================================================================
 *
 * Skills and items, when used in battle, have a pre-determined series of
 * actions to display to the player as a means of representing what's going on
 * with the action. For some game devs, this may not be enough and they would
 * like to get more involved with the actions themselves.
 *
 * Action Sequences, added through this plugin, enable this. To give a skill or
 * item a Custom Action Sequence, a couple of steps must be followed:
 *
 * ---
 *
 * 1. Insert the <Custom Action Sequence> notetag into the skill or item's
 *    notebox (or else this would not work as intended).
 * 2. Give that skill/item a Common Event through the Effects box. The selected
 *    Common Event will contain all the Action Sequence data.
 * 3. Create the Common Event with Action Sequence Plugin Commands and/or event
 *    commands to make the skill/item do what you want it to do.
 *
 * ---
 *
 * The Plugin Commands added through the Battle Core plugin focus entirely on
 * Action Sequences. However, despite the fact that they're made for skills and
 * items, some of these Action Sequence Plugin Commands can still be used for
 * regular Troop events and Common Events.
 *
 * ---
 *
 * === Action Sequence - Action Sets ===
 *
 * Action Sequence Action Sets are groups of commonly used
 * Action Sequence Commands put together for more efficient usage.
 *
 * ---
 *
 * ACSET: Setup Action Set
 * - The generic start to most actions.
 *
 *   Display Action:
 *   Immortal: On:
 *   Battle Step:
 *   Wait For Movement:
 *   Cast Animation:
 *   Wait For Animation:
 *   - Use this part of the action sequence?
 *
 * ---
 *
 * ACSET: All Targets Action Set
 * - Affects all targets simultaneously performing the following.
 *
 *   Perform Action:
 *   Wait Count:
 *   Action Animation:
 *   Wait For Animation:
 *   Action Effect:
 *   Immortal: Off:
 *   - Use this part of the action sequence?
 *   - Insert values for the Wait Count(s).
 *
 * ---
 *
 * ACSET: Each Target Action Set
 * - Goes through each target one by one to perform the following.
 *
 *   Perform Action:
 *   Wait Count:
 *   Action Animation:
 *   Wait Count:
 *   Action Effect:
 *   Immortal: Off:
 *   - Use this part of the action sequence?
 *   - Insert values for the Wait Count(s).
 *
 * ---
 *
 * ACSET: Finish Action
 * - The generic ending to most actions.
 *
 *   Wait For New Line:
 *   Wait For Effects:
 *   Clear Battle Log:
 *   Home Reset:
 *   Wait For Movement:
 *   - Use this part of the action sequence?
 *
 * ---
 * 
 * === Action Sequences - Angle ===
 * 
 * These action sequences allow you to have control over the camera angle.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * ---
 *
 * ANGLE: Change Angle
 * - Changes the camera angle.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Angle:
 *   - Change the camera angle to this many degrees.
 *
 *   Duration:
 *   - Duration in frames to change camera angle.
 *
 *   Angle Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Angle?:
 *   - Wait for angle changes to complete before performing next command?
 *
 * ---
 *
 * ANGLE: Reset Angle
 * - Reset any angle settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Duration:
 *   - Duration in frames to reset camera angle.
 *
 *   Angle Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Angle?:
 *   - Wait for angle changes to complete before performing next command?
 *
 * ---
 *
 * ANGLE: Wait For Angle
 * - Waits for angle changes to complete before performing next command.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * === Action Sequences - Animations ===
 *
 * These Action Sequences are related to the 'Animations' that can be found in
 * the Animations tab of the Database.
 *
 * ---
 *
 * ANIM: Action Animation
 * - Plays the animation associated with the action.
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *
 *   Mirror Animation:
 *   - Mirror the animation?
 *
 *   Wait For Animation?:
 *   - Wait for animation to complete before performing next command?
 *
 * ---
 *
 * ANIM: Attack Animation
 * - Plays the animation associated with the user's weapon.
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *
 *   Mirror Animation:
 *   - Mirror the animation?
 *
 *   Wait For Animation?:
 *   - Wait for animation to complete before performing next command?
 *
 * ---
 *
 * ANIM: Cast Animation
 * - Plays the cast animation associated with the action.
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *
 *   Mirror Animation:
 *   - Mirror the animation?
 *
 *   Wait For Animation?:
 *   - Wait for animation to complete before performing next command?
 *
 * ---
 *
 * ANIM: Change Battle Portrait
 * - Changes the battle portrait of the actor (if it's an actor).
 * - Can be used outside of battle/action sequences.
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *   - Valid units can only be actors.
 *
 *   Filename:
 *   - Select the file to change the actor's portrait to.
 *
 * ---
 *
 * ANIM: Show Animation
 * - Plays the a specific animation on unit(s).
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *
 *   Animation ID:
 *   - Select which animation to play on unit(s).
 *
 *   Mirror Animation:
 *   - Mirror the animation?
 *
 *   Wait For Animation?:
 *   - Wait for animation to complete before performing next command?
 *
 * ---
 *
 * ANIM: Wait For Animation
 * - Causes the interpreter to wait for any animation(s) to finish.
 *
 * ---
 *
 * === Action Sequences - Battle Log ===
 *
 * These Action Sequences are related to the Battle Log Window, the window
 * found at the top of the battle screen.
 *
 * ---
 *
 * BTLOG: Add Text
 * - Adds a new line of text into the Battle Log.
 *
 *   Text:
 *   - Add this text into the Battle Log.
 *   - Text codes allowed.
 *
 * ---
 *
 * BTLOG: Clear Battle Log
 * - Clears all the text in the Battle Log.
 *
 * ---
 *
 * BTLOG: Display Action
 * - plays the current action in the Battle Log.
 *
 * ---
 *
 * BTLOG: Pop Base Line
 * - Removes the Battle Log's last added base line and  all text up to its
 *   former location.
 *
 * ---
 *
 * BTLOG: Push Base Line
 * - Adds a new base line to where the Battle Log currently is at.
 *
 * ---
 *
 * BTLOG: Refresh Battle Log
 * - Refreshes the Battle Log.
 *
 * ---
 *
 * BTLOG: UI Show/Hide
 * - Shows or hides the Battle UI (including the Battle Log).
 *
 *   Show/Hide?:
 *   - Shows/hides the Battle UI.
 *
 * ---
 *
 * BTLOG: Wait For Battle Log
 * - Causes the interpreter to wait for the Battle Log to finish.
 *
 * ---
 *
 * BTLOG: Wait For New Line
 * - Causes the interpreter to wait for a new line in the Battle Log.
 *
 * ---
 *
 * === Action Sequences - Camera ===
 *
 * These Action Sequences are battle camera-related.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * CAMERA: Clamp ON/OFF
 * - Turns battle camera clamping on/off.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Setting:
 *   - Turns camera clamping on/off.
 *
 * ---
 *
 * CAMERA: Focus Point
 * - Focus the battle camera on a certain point in the screen.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   X Coordinate:
 *   - Insert the point to focus the camera on.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - Insert the point to focus the camera on.
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for camera focus change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Focus Target(s)
 * - Focus the battle camera on certain battler target(s).
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Targets:
 *   - Select unit(s) to focus the battle camera on.
 *
 *   Duration:
 *   - Duration in frames for camera focus change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Offset
 * - Offset the battle camera from the focus target.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Offset X:
 *   - How much to offset the camera X by.
 *   - Negative: left. Positive: right.
 *
 *   Offset Y:
 *   - How much to offset the camera Y by.
 *   - Negative: up. Positive: down.
 *
 *   Duration:
 *   - Duration in frames for offset change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Reset
 * - Reset the battle camera settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Reset Focus?:
 *   - Reset the focus point?
 *
 *   Reset Offset?:
 *   - Reset the camera offset?
 *
 *   Duration:
 *   - Duration in frames for reset change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Wait For Camera
 * - Waits for camera changes to complete before performing next command.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * === Action Sequences - Dragonbones ===
 *
 * These Action Sequences are Dragonbones-related.
 * Requires VisuMZ_2_DragonbonesUnion!
 *
 * ---
 *
 * DB: Dragonbones Animation
 * - Causes the unit(s) to play a Dragonbones motion animation.
 * - Requires VisuMZ_2_DragonbonesUnion!
 *
 *   Targets:
 *   - Select which unit(s) to perform a motion animation.
 *
 *   Motion Animation:
 *   - What is the name of the Dragonbones motion animation you wish to play?
 *
 * ---
 *
 * DB: Dragonbones Time Scale
 * - Causes the unit(s) to change their Dragonbones time scale.
 * - Requires VisuMZ_2_DragonbonesUnion!
 *
 *   Targets:
 *   - Select which unit(s) to perform a motion animation.
 *
 *   Time Scale:
 *   - Change the value of the Dragonbones time scale to this.
 *
 * ---
 *
 * === Action Sequences - Elements ===
 *
 * These Action Sequences can change up the element(s) used for the action's
 * damage calculation midway through an action.
 *
 * They also require the VisuMZ_1_ElementStatusCore plugin to be present in
 * order for them to work.
 *
 * ---
 *
 * ELE: Add Elements
 * - Adds element(s) to be used when calculating damage.
 * - Requires VisuMZ_1_ElementStatusCore!
 *
 *   Elements:
 *   - Select which element ID to add onto the action.
 *   - Insert multiple element ID's to add multiple at once.
 *
 * ---
 *
 * ELE: Clear Element Changes
 * - Clears all element changes made through Action Sequences.
 * - Requires VisuMZ_1_ElementStatusCore!
 *
 * ---
 *
 * ELE: Force Elements
 * - Forces only specific element(s) when calculating damage.
 * - Requires VisuMZ_1_ElementStatusCore!
 *
 *   Elements:
 *   - Select which element ID to force in the action.
 *   - Insert multiple element ID's to force multiple at once.
 *
 * ---
 *
 * ELE: Null Element
 * - Forces no element to be used when calculating damage.
 * - Requires VisuMZ_1_ElementStatusCore!
 *
 * ---
 *
 * === Action Sequences - Mechanics ===
 *
 * These Action Sequences are related to various mechanics related to the
 * battle system.
 *
 * ---
 *
 * MECH: Action Effect
 * - Causes the unit(s) to take damage/healing from action and incurs any
 *   changes made such as buffs and states.
 *
 *   Targets:
 *   - Select unit(s) to receive the current action's effects.
 *
 * ---
 *
 * MECH: Add Buff/Debuff
 * - Adds buff(s)/debuff(s) to unit(s). 
 * - Determine which parameters are affected and their durations.
 *
 *   Targets:
 *   - Select unit(s) to receive the buff(s) and/or debuff(s).
 *
 *   Buff Parameters:
 *   - Select which parameter(s) to buff.
 *   - Insert a parameter multiple times to raise its stacks.
 *
 *   Debuff Parameters:
 *   - Select which parameter(s) to debuff.
 *   - Insert a parameter multiple times to raise its stacks.
 *
 *   Turns:
 *   - Number of turns to set the parameter(s) buffs to.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * MECH: Add State
 * - Adds state(s) to unit(s).
 *
 *   Targets:
 *   - Select unit(s) to receive the buff(s).
 *
 *   States:
 *   - Select which state ID(s) to add to unit(s).
 *   - Insert multiple state ID's to add multiple at once.
 *
 * ---
 *
 * MECH: Armor Penetration
 * - Adds an extra layer of defensive penetration/reduction.
 * - You may use JavaScript code for any of these.
 *
 *   Armor/Magic Penetration:
 *
 *     Rate:
 *     - Penetrates an extra multiplier of armor by this value.
 *
 *     Flat:
 *     - Penetrates a flat amount of armor by this value.
 *
 *   Armor/Magic Reduction:
 *
 *     Rate:
 *     - Reduces an extra multiplier of armor by this value.
 *
 *     Flat:
 *     - Reduces a flat amount of armor by this value.
 *
 * ---
 * 
 * MECH: ATB Gauge
 * - Alters the ATB/TPB Gauges.
 * - Requires VisuMZ_2_BattleSystemATB!
 * 
 *   Targets:
 *   - Select unit(s) to alter the ATB/TPB Gauges for.
 * 
 *   Charging:
 *   
 *     Charge Rate:
 *     - Changes made to the ATB Gauge if it is currently charging.
 * 
 *   Casting:
 *   
 *     Cast Rate:
 *     - Changes made to the ATB Gauge if it is currently casting.
 *   
 *     Interrupt?:
 *     - Interrupt the ATB Gauge if it is currently casting?
 * 
 * ---
 *
 * MECH: Collapse
 * - Causes the unit(s) to perform its collapse animation if the unit(s)
 *   has died.
 *
 *   Targets:
 *   - Select unit(s) to process a death collapse.
 *
 *   Force Death:
 *   - Force death even if the unit has not reached 0 HP?
 *   - This will remove immortality.
 *
 *   Wait For Effect?:
 *   - Wait for the collapse effect to complete before performing next command?
 *
 * ---
 *
 * MECH: Damage Popup
 * - Causes the unit(s) to display the current state of damage received
 *   or healed.
 *
 *   Targets:
 *   - Select unit(s) to prompt a damage popup.
 *
 * ---
 *
 * MECH: Dead Label Jump
 * - If the active battler is dead, jump to a specific label in the
 *   common event.
 *
 *   Jump To Label:
 *   - If the active battler is dead, jump to this specific label in the
 *     common event.
 *
 * ---
 *
 * MECH: HP, MP, TP
 * - Alters the HP, MP, and TP values for unit(s).
 * - Positive values for healing. Negative values for damage.
 *
 *   Targets:
 *   - Select unit(s) to receive the current action's effects.
 *
 *   HP, MP, TP:
 *
 *     Rate:
 *     - Changes made to the parameter based on rate.
 *     - Positive values for healing. Negative values for damage.
 *
 *     Flat:
 *     - Flat changes made to the parameter.
 *     - Positive values for healing. Negative values for damage.
 *
 *   Damage Popup?:
 *   - Display a damage popup after?
 *
 * ---
 *
 * MECH: Immortal
 * - Changes the immortal flag of targets. If immortal flag is removed and a
 *   unit would die, collapse that unit.
 *
 *   Targets:
 *   - Alter the immortal flag of these groups. If immortal flag is removed and
 *     a unit would die, collapse that unit.
 *
 *   Immortal:
 *   - Turn immortal flag for unit(s) on/off?
 *
 * ---
 *
 * MECH: Multipliers
 * - Changes the multipliers for the current action.
 * - You may use JavaScript code for any of these.
 *
 *   Critical Hit%:
 *
 *     Rate:
 *     - Affects chance to land a critical hit by this multiplier.
 *
 *     Flat:
 *     - Affects chance to land a critical hit by this flat bonus.
 *
 *   Critical Damage
 *
 *     Rate:
 *     - Affects critical damage by this multiplier.
 *
 *     Flat:
 *     - Affects critical damage by this flat bonus.
 *
 *   Damage/Healing
 *
 *     Rate:
 *     - Sets the damage/healing multiplier for current action.
 *
 *     Flat:
 *     - Sets the damage/healing bonus for current action.
 *
 *   Hit Rate
 *
 *     Rate:
 *     - Affects chance to connect attack by this multiplier.
 *
 *     Flat:
 *     - Affects chance to connect attack by this flat bonus.
 *
 * ---
 *
 * MECH: Remove Buff/Debuff
 * - Removes buff(s)/debuff(s) from unit(s). 
 * - Determine which parameters are removed.
 *
 *   Targets:
 *   - Select unit(s) to have the buff(s) and/or debuff(s) removed.
 *
 *   Buff Parameters:
 *   - Select which buffed parameter(s) to remove.
 *
 *   Debuff Parameters:
 *   - Select which debuffed parameter(s) to remove.
 *
 * ---
 *
 * MECH: Remove State
 * - Remove state(s) from unit(s).
 *
 *   Targets:
 *   - Select unit(s) to have states removed from.
 *
 *   States:
 *   - Select which state ID(s) to remove from unit(s).
 *   - Insert multiple state ID's to remove multiple at once.
 *
 * ---
 * 
 * MECH: Text Popup
 * - Causes the unit(s) to display a text popup.
 * 
 *   Targets:
 *   - Select unit(s) to prompt a text popup.
 * 
 *   Text:
 *   - What text do you wish to display?
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
 * 
 * ---
 *
 * MECH: Wait For Effect
 * - Waits for the effects to complete before performing next command.
 *
 * ---
 *
 * === Action Sequences - Motion ===
 *
 * These Action Sequences allow you the ability to control the motions of
 * sideview sprites.
 *
 * ---
 *
 * MOTION: Motion Type
 * - Causes the unit(s) to play the selected motion.
 *
 *   Targets:
 *   - Select which unit(s) to perform a motion.
 *
 *   Motion Type:
 *   - Play this motion for the unit(s).
 *
 *   Show Weapon?:
 *   - If using 'attack', 'thrust', 'swing', or 'missile', display the
 *     weapon sprite?
 *
 * ---
 *
 * MOTION: Perform Action
 * - Causes the unit(s) to play the proper motion based on the current action.
 *
 *   Targets:
 *   - Select which unit(s) to perform a motion.
 *
 * ---
 *
 * MOTION: Refresh Motion
 * - Cancels any set motions unit(s) has to do and use their most natural
 *   motion at the moment.
 *
 *   Targets:
 *   - Select which unit(s) to refresh their motion state.
 *
 * ---
 *
 * MOTION: Wait By Motion Frame
 * - Creates a wait equal to the number of motion frames passing.
 * - Time is based on Plugin Parameters => Actors => Motion Speed.
 *
 *   Motion Frames to Wait?:
 *   - Each "frame" is equal to the value found in 
 *     Plugin Parameters => Actors => Motion Speed
 *
 * ---
 *
 * === Action Sequences - Movement ===
 *
 * These Action Sequences allow you the ability to control the sprites of
 * actors and enemies in battle.
 *
 * ---
 *
 * MOVE: Battle Step
 * - Causes the unit(s) to move forward past their home position to prepare
 *   for action.
 *
 *   Targets:
 *   - Select which unit(s) to move.
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Face Direction
 * - Causes the unit(s) to face forward or backward.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to change direction.
 *
 *   Direction:
 *   - Select which direction to face.
 *
 * ---
 *
 * MOVE: Face Point
 * - Causes the unit(s) to face a point on the screen.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to change direction.
 *
 *   Point:
 *   - Select which point to face.
 *     - Home
 *     - Center
 *     - Point X, Y
 *       - Replace 'x' and 'y' with coordinates
 *
 *   Face Away From?:
 *   - Face away from the point instead?
 *
 * ---
 *
 * MOVE: Face Target(s)
 * - Causes the unit(s) to face other targets on the screen.
 * - Sideview-only!
 *
 *   Targets (facing):
 *   - Select which unit(s) to change direction.
 *
 *   Targets (destination):
 *   - Select which unit(s) for the turning unit(s) to face.
 *
 *   Face Away From?:
 *   - Face away from the unit(s) instead?
 *
 * ---
 *
 * MOVE: Float
 * - Causes the unit(s) to float above the ground.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to make float.
 *
 *   Desired Height:
 *   - Vertical distance to float upward.
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total float amount.
 *
 *   Float Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Float?:
 *   - Wait for floating to complete before performing next command?
 *
 * ---
 *
 * MOVE: Home Reset
 * - Causes the unit(s) to move back to their home position(s) and face back to
 *   their original direction(s).
 *
 *   Targets:
 *   - Select which unit(s) to move.
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Jump
 * - Causes the unit(s) to jump into the air.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to make jump.
 *
 *   Desired Height:
 *   - Max jump height to go above the ground
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total jump amount.
 *
 *   Wait For Jump?:
 *   - Wait for jumping to complete before performing next command?
 *
 * ---
 *
 * MOVE: Move Distance
 * - Moves unit(s) by a distance from their current position(s).
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to move.
 *
 *   Distance Adjustment:
 *   - Makes adjustments to distance values to determine which direction to
 *     move unit(s).
 *     - Normal - No adjustments made
 *     - Horizontal - Actors adjust left, Enemies adjust right
 *     - Vertical - Actors adjust Up, Enemies adjust down
 *     - Both - Applies both Horizontal and Vertical
 *
 *     Distance: X:
 *     - Horizontal distance to move.
 *     - You may use JavaScript code.
 *
 *     Distance: Y:
 *     - Vertical distance to move.
 *     - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total movement amount.
 *
 *   Face Destination?:
 *   - Turn and face the destination?
 *
 *   Movement Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Movement Motion:
 *   - Play this motion for the unit(s).
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Move To Point
 * - Moves unit(s) to a designated point on the screen.
 * - Sideview-only! Points based off Graphics.boxWidth/Height.
 *
 *   Targets:
 *   - Select which unit(s) to move.
 *
 *   Destination Point:
 *   - Select which point to face.
 *     - Home
 *     - Center
 *     - Point X, Y
 *       - Replace 'x' and 'y' with coordinates
 *
 *   Offset Adjustment:
 *   - Makes adjustments to offset values to determine which direction to
 *     adjust the destination by.
 *
 *     Offset: X:
 *     - Horizontal offset to move.
 *     - You may use JavaScript code.
 *
 *     Offset: Y:
 *     - Vertical offset to move.
 *     - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total movement amount.
 *
 *   Face Destination?:
 *   - Turn and face the destination?
 *
 *   Movement Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Movement Motion:
 *   - Play this motion for the unit(s).
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Move To Target(s)
 * - Moves unit(s) to another unit(s) on the battle field.
 * - Sideview-only!
 *
 *   Targets (Moving):
 *   - Select which unit(s) to move.
 *
 *   Targets (Destination):
 *   - Select which unit(s) to move to.
 *
 *     Target Location:
 *     - Select which part target group to move to.
 *       - front head
 *       - front center
 *       - front base
 *       - middle head
 *       - middle center
 *       - middle base
 *       - back head
 *       - back center
 *       - back base
 *
 *     Melee Distance:
 *     - The melee distance away from the target location in addition to the
 *       battler's width.
 *
 *   Offset Adjustment:
 *   - Makes adjustments to offset values to determine which direction to
 *     adjust the destination by.
 *
 *     Offset: X:
 *     - Horizontal offset to move.
 *     - You may use JavaScript code.
 *
 *     Offset: Y:
 *     - Vertical offset to move.
 *     - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total movement amount.
 *
 *   Face Destination?:
 *   - Turn and face the destination?
 *
 *   Movement Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Movement Motion:
 *   - Play this motion for the unit(s).
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Opacity
 * - Causes the unit(s) to change opacity.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to make float.
 *
 *   Desired Opacity:
 *   - Change to this opacity value.
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for opacity change.
 *
 *   Opacity Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Opacity?:
 *   - Wait for opacity changes to complete before performing next command?
 *
 * ---
 *
 * MOVE: Scale/Grow/Shrink
 * - Causes the unit(s) to scale, grow, or shrink?.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to change the scale of.
 *
 *   Scale X:
 *   Scale Y:
 *   - What target scale value do you want?
 *   - 1.0 is normal size.
 *
 *   Duration:
 *   - Duration in frames to scale for.
 *
 *   Scale Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Scale?:
 *   - Wait for scaling to complete before performing next command?
 *
 * ---
 *
 * MOVE: Skew/Distort
 * - Causes the unit(s) to skew.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to skew.
 *
 *   Skew X:
 *   Skew Y:
 *   - What variance to skew?
 *   - Use small values for the best results.
 *
 *   Duration:
 *   - Duration in frames to skew for.
 *
 *   Skew Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Skew?:
 *   - Wait for skew to complete before performing next command?
 *
 * ---
 *
 * MOVE: Spin/Rotate
 * - Causes the unit(s) to spin.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to spin.
 *
 *   Angle:
 *   - How many degrees to spin?
 *
 *   Duration:
 *   - Duration in frames to spin for.
 *
 *   Spin Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Spin?:
 *   - Wait for spin to complete before performing next command?
 *
 * ---
 *
 * MOVE: Wait For Float
 * - Waits for floating to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Jump
 * - Waits for jumping to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Movement
 * - Waits for movement to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Opacity
 * - Waits for opacity changes to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Scale
 * - Waits for scaling to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Skew
 * - Waits for skewing to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Spin
 * - Waits for spinning to complete before performing next command.
 *
 * ---
 * 
 * === Action Sequences - Skew ===
 * 
 * These action sequences allow you to have control over the camera skew.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * ---
 *
 * SKEW: Change Skew
 * - Changes the camera skew.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Skew X:
 *   - Change the camera skew X to this value.
 *
 *   Skew Y:
 *   - Change the camera skew Y to this value.
 *
 *   Duration:
 *   - Duration in frames to change camera skew.
 *
 *   Skew Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Skew?:
 *   - Wait for skew changes to complete before performing next command?
 *
 * ---
 *
 * SKEW: Reset Skew
 * - Reset any skew settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Duration:
 *   - Duration in frames to reset camera skew.
 *
 *   Skew Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Skew?:
 *   - Wait for skew changes to complete before performing next command?
 *
 * ---
 *
 * SKEW: Wait For Skew
 * - Waits for skew changes to complete before performing next command.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * === Action Sequences - Target ===
 *
 * If using a manual target by target Action Sequence, these commands will give
 * you full control over its usage.
 *
 * ---
 *
 * TARGET: Current Index
 * - Sets the current index to this value.
 * - Then decide to jump to a label (optional).
 *
 *   Set Index To:
 *   - Sets current targeting index to this value.
 *   - 0 is the starting index of a target group.
 *
 *   Jump To Label:
 *   - If a target is found after the index change, jump to this label in the
 *     Common Event.
 *
 * ---
 *
 * TARGET: Next Target
 * - Moves index forward by 1 to select a new current target.
 * - Then decide to jump to a label (optional).
 *
 *   Jump To Label:
 *   - If a target is found after the index change, jump to this label in the
 *     Common Event.
 *
 * ---
 *
 * TARGET: Previous Target
 * - Moves index backward by 1 to select a new current target.
 * - Then decide to jump to a label (optional).
 *
 *   Jump To Label:
 *   - If a target is found after the index change, jump to this label in the
 *     Common Event.
 *
 * ---
 *
 * TARGET: Random Target
 * - Sets index randomly to determine new currernt target.
 * - Then decide to jump to a label (optional).
 *
 *   Force Random?:
 *   - Index cannot be its previous index amount after random.
 *
 *   Jump To Label:
 *   - If a target is found after the index change, jump to this label in the
 *     Common Event.
 *
 * ---
 *
 * === Action Sequences - Zoom ===
 *
 * These Action Sequences are zoom-related.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * ZOOM: Change Scale
 * - Changes the zoom scale.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Scale:
 *   - The zoom scale to change to.
 *
 *   Duration:
 *   - Duration in frames to reset battle zoom.
 *
 *   Zoom Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Zoom?
 *   - Wait for zoom changes to complete before performing next command?
 *
 * ---
 *
 * ZOOM: Reset Zoom
 * - Reset any zoom settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Duration:
 *   - Duration in frames to reset battle zoom.
 *
 *   Zoom Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Zoom?
 *   - Wait for zoom changes to complete before performing next command?
 *
 * ---
 *
 * ZOOM: Wait For Zoom
 * - Waits for zoom changes to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Auto Battle Settings
 * ============================================================================
 *
 * These Plugin Parameter settings allow you to change the aspects added by
 * this plugin that support Auto Battle and the Auto Battle commands.
 *
 * Auto Battle commands can be added to the Party Command Window and/or Actor
 * Command Window. The one used by the Party Command Window will cause the
 * whole party to enter an Auto Battle state until stopped by a button input.
 * The command used by the Actor Command Window, however, will cause the actor
 * to select an action based off the Auto Battle A.I. once for the current turn
 * instead.
 *
 * ---
 *
 * Battle Display
 * 
 *   Message:
 *   - Message that's displayed when Auto Battle is on.
 *     Text codes allowed. %1 - OK button, %2 - Cancel button
 * 
 *   OK Button:
 *   - Text used to represent the OK button.
 *   - If VisuMZ_0_CoreEngine is present, ignore this.
 * 
 *   Cancel Button:
 *   - Text used to represent the Cancel button.
 *   - If VisuMZ_0_CoreEngine is present, ignore this.
 * 
 *   Background Type:
 *   - Select background type for Auto Battle window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Options
 * 
 *   Add Option?:
 *   - Add the Auto Battle options to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Startup Name:
 *   - Command name of the option.
 * 
 *   Style Name:
 *   - Command name of the option.
 * 
 *   OFF:
 *   - Text displayed when Auto Battle Style is OFF.
 * 
 *   ON:
 *   - Text displayed when Auto Battle Style is ON.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Damage Settings
 * ============================================================================
 *
 * These Plugin Parameters add a variety of things to how damage is handled in
 * battle. These range from hard damage caps to soft damage caps to how damage
 * popups appear, how the formulas for various aspects are handled and more.
 *
 * Damage Styles are also a feature added through this plugin. More information
 * can be found in the help section above labeled 'Damage Styles'.
 *
 * ---
 *
 * Damage Cap
 * 
 *   Enable Damage Cap?:
 *   - Put a maximum hard damage cap on how far damage can go?
 *   - This can be broken through the usage of notetags.
 * 
 *   Default Hard Cap:
 *   - The default hard damage cap used before applying damage.
 * 
 *   Enable Soft Cap?:
 *   - Soft caps ease in the damage values leading up to the  hard damage cap.
 *   - Requires hard Damage Cap enabled.
 * 
 *     Base Soft Cap Rate:
 *     - The default soft damage cap used before applying damage.
 * 
 *     Soft Scale Constant:
 *     - The default soft damage cap used before applying damage.
 *
 * ---
 *
 * Popups
 * 
 *   Popup Duration:
 *   - Adjusts how many frames a popup stays visible.
 * 
 *   Newest Popups Bottom:
 *   - Puts the newest popups at the bottom.
 * 
 *   Shift X:
 *   - Sets how much to shift the sprites by horizontally.
 * 
 *   Shift Y:
 *   - Sets how much to shift the sprites by vertically.
 * 
 *   Critical Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Critical Duration:
 *   - Adjusts how many frames a the flash lasts.
 *
 * ---
 *
 * Formulas
 * 
 *   JS: Overall Formula:
 *   - The overall formula used when calculating damage.
 * 
 *   JS: Variance Formula:
 *   - The formula used when damage variance.
 * 
 *   JS: Guard Formula:
 *   - The formula used when damage is guarded.
 *
 * ---
 *
 * Critical Hits
 * 
 *   JS: Rate Formula:
 *   - The formula used to calculate Critical Hit Rates.
 * 
 *   JS: Damage Formula:
 *   - The formula used to calculate Critical Hit Damage modification.
 *
 * ---
 *
 * Damage Styles
 * 
 *   Default Style:
 *   - Which Damage Style do you want to set as default?
 *   - Use 'Manual' to not use any styles at all.
 *     - The 'Manual' style will not support <Armor Penetration> notetags.
 *     - The 'Manual' style will not support <Armor Reduction> notetags.
 * 
 *   Style List:
 *   - A list of the damage styles available.
 *   - These are used to calculate base damage.
 * 
 *     Name:
 *     - Name of this Damage Style.
 *     -Used for notetags and such.
 * 
 *     JS: Formula:
 *     - The base formula for this Damage Style.
 * 
 *     Items & Equips Core:
 * 
 *       HP Damage:
 *       MP Damage:
 *       HP Recovery:
 *       MP Recovery:
 *       HP Drain:
 *       MP Drain:
 *       - Vocabulary used for this data entry.
 * 
 *       JS: Damage Display:
 *       - Code used the data displayed for this category.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Some of the base settings for the various mechanics found in the battle
 * system can be altered here in these Plugin Parameters. Most of these will
 * involve JavaScript code and require you to have to good understanding of
 * how the RPG Maker MZ code works before tampering with it.
 *
 * ---
 *
 * Action Speed
 * 
 *   Allow Random Speed?:
 *   - Allow speed to be randomized base off the user's AGI?
 * 
 *   JS: Calculate:
 *   - Code used to calculate action speed.
 *
 * ---
 *
 * Base Troop
 * 
 *   Base Troop ID's:
 *   - Select the Troop ID(s) to duplicate page events from for all
 *     other troops.
 *   - More information can be found in the dedicated Help section above.
 *
 * ---
 *
 * Escape
 * 
 *   JS: Calc Escape Ratio:
 *   - Code used to calculate the escape success ratio.
 * 
 *   JS: Calc Escape Raise:
 *   - Code used to calculate how much the escape success ratio raises upon
 *     each failure.
 * 
 * ---
 * 
 * Common Events
 * 
 *   Post-Battle Event:
 *   Victory Event:
 *   Defeat Event:
 *   Escape Success Event:
 *   Escape Fail Event:
 *   - Queued Common Event to run upon meeting the condition.
 *   - Use to 0 to not run any Common Event at all.
 *   - "Post-Battle Event" will always run regardless.
 *   - If any events are running before the battle, they will continue running
 *     to the end first before the queued Common Events will run.
 *
 * ---
 *
 * JS: Battle-Related
 * 
 *   JS: Pre-Start Battle:
 *   - Target function: BattleManager.startBattle()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Start Battle:
 *   - Target function: BattleManager.startBattle()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Battle Victory:
 *   - Target function: BattleManager.processVictory()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Escape Success:
 *   - Target function: BattleManager.onEscapeSuccess()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Escape Failure:
 *   - Target function: BattleManager.onEscapeFailure()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Battle Defeat:
 *   - Target function: BattleManager.processDefeat()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Pre-End Battle:
 *   - Target function: BattleManager.endBattle()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-End Battle:
 *   - Target function: BattleManager.endBattle()
 *   - JavaScript code occurs after function is run.
 *
 * ---
 *
 * JS: Turn-Related
 * 
 *   JS: Pre-Start Turn:
 *   - Target function: BattleManager.startTurn()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Start Turn:
 *   - Target function: BattleManager.startTurn()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Pre-End Turn:
 *   - Target function: Game_Battler.prototype.onTurnEnd()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-End Turn:
 *   - Target function: Game_Battler.prototype.onTurnEnd()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Pre-Regenerate:
 *   - Target function: Game_Battler.prototype.regenerateAll()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Regenerate:
 *   - Target function: Game_Battler.prototype.regenerateAll()
 *   - JavaScript code occurs after function is run.
 *
 * ---
 *
 * JS: Action-Related
 * 
 *   JS: Pre-Start Action:
 *   - Target function: BattleManager.startAction()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Start Action:
 *   - Target function: BattleManager.startAction()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Pre-Apply:
 *   - Target function: Game_Action.prototype.apply()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Pre-Damage:
 *   - Target function: Game_Action.prototype.executeDamage()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Damage:
 *   - Target function: Game_Action.prototype.executeDamage()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Post-Apply:
 *   - Target function: Game_Action.prototype.apply()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Pre-End Action:
 *   - Target function: BattleManager.endAction()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-End Action:
 *   - DescriTarget function: BattleManager.endAction()
 *   - JavaScript code occurs after function is run.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle Layout Settings
 * ============================================================================
 *
 * The Battle Layout Settings Plugin Parameter gives you control over the look,
 * style, and appearance of certain UI elements. These range from the way the
 * Battle Status Window presents its information to the way certain windows
 * like the Party Command Window and Actor Command Window appear.
 *
 * ---
 *
 * Battle Layout Style
 * - The style used for the battle layout.
 * 
 *   Default:
 *   - Shows actor faces in Battle Status.
 * 
 *   List:
 *   - Lists actors in Battle Status.
 * 
 *   XP:
 *   - Shows actor battlers in a stretched Battle Status.
 * 
 *   Portrait:
 *   - Shows portraits in a stretched Battle Status.
 * 
 *   Border:
 *   - Displays windows around the screen border.
 *
 * ---
 *
 * List Style
 * 
 *   Show Faces:
 *   - Shows faces in List Style?
 *
 * ---
 *
 * XP Style
 * 
 *   Command Lines:
 *   - Number of action lines in the Actor Command Window for the XP Style.
 * 
 *   Sprite Height:
 *   - Default sprite height used when if the sprite's height has not been
 *     determined yet.
 * 
 *   Sprite Base Location:
 *   - Determine where the sprite is located on the Battle Status Window.
 *     - Above Name - Sprite is located above the name.
 *     - Bottom - Sprite is located at the bottom of the window.
 *     - Centered - Sprite is centered in the window.
 *     - Top - Sprite is located at the top of the window.
 *
 * ---
 *
 * Portrait Style
 * 
 *   Show Portraits?:
 *   - Requires VisuMZ_1_MainMenuCore.
 *   - Shows the actor's portrait instead of a face.
 * 
 *   Portrait Scaling:
 *   - If portraits are used, scale them by this much.
 *
 * ---
 *
 * Border Style
 * 
 *   Columns:
 *   - The total number of columns for Skill & Item Windows in the battle scene
 * 
 *   Show Portraits?:
 *   - Requires VisuMZ_1_MainMenuCore.
 *   - Shows the actor's portrait at the edge of the screen.
 * 
 *   Portrait Scaling:
 *   - If portraits are used, scale them by this much.
 *
 * ---
 *
 * Skill & Item Windows
 * 
 *   Middle Layout:
 *   - Shows the Skill & Item Windows in mid-screen?
 * 
 *   Columns:
 *   - The total number of columns for Skill & Item Windows in the battle scene
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle Log Settings
 * ============================================================================
 *
 * These Plugin Parameters give you control over how the Battle Log Window, the
 * window shown at the top of the screen in the battle layout, appears, its
 * various properties, and which text will be displayed.
 *
 * The majority of the text has been disabled by default with this plugin to
 * make the flow of battle progress faster.
 *
 * ---
 *
 * General
 * 
 *   Back Color:
 *   - Use #rrggbb for a hex color.
 * 
 *   Max Lines:
 *   - Maximum number of lines to be displayed.
 * 
 *   Message Wait:
 *   - Number of frames for a usual message wait.
 * 
 *   Text Align:
 *   - Text alignment for the Window_BattleLog.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for the battle log.
 *
 * ---
 *
 * Start Turn
 * 
 *   Show Start Turn?:
 *   - Display turn changes at the start of the turn?
 * 
 *   Start Turn Message:
 *   - Message displayed at turn start.
 *   - %1 - Turn Count
 * 
 *   Start Turn Wait:
 *   - Number of frames to wait after a turn started.
 *
 * ---
 *
 * Display Action
 * 
 *   Show Centered Action?:
 *   - Display a centered text of the action name?
 * 
 *   Show Skill Message 1?:
 *   - Display the 1st skill message?
 * 
 *   Show Skill Message 2?:
 *   - Display the 2nd skill message?
 * 
 *   Show Item Message?:
 *   - Display the item use message?
 *
 * ---
 *
 * Action Changes
 * 
 *   Show Counter?:
 *   - Display counter text?
 * 
 *   Show Reflect?:
 *   - Display magic reflection text?
 * 
 *   Show Substitute?:
 *   - Display substitute text?
 *
 * ---
 *
 * Action Results
 * 
 *   Show No Effect?:
 *   - Display no effect text?
 * 
 *   Show Critical?:
 *   - Display critical text?
 * 
 *   Show Miss/Evasion?:
 *   - Display miss/evasion text?
 * 
 *   Show HP Damage?:
 *   - Display HP Damage text?
 * 
 *   Show MP Damage?:
 *   - Display MP Damage text?
 * 
 *   Show TP Damage?:
 *   - Display TP Damage text?
 *
 * ---
 *
 * Display States
 * 
 *   Show Added States?:
 *   - Display added states text?
 * 
 *   Show Removed States?:
 *   - Display removed states text?
 * 
 *   Show Current States?:
 *   - Display the currently affected state text?
 * 
 *   Show Added Buffs?:
 *   - Display added buffs text?
 * 
 *   Show Added Debuffs?:
 *   - Display added debuffs text?
 * 
 *   Show Removed Buffs?:
 *   - Display removed de/buffs text?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Party Command Window
 * ============================================================================
 *
 * These Plugin Parameters allow you control over how the Party Command Window
 * operates in the battle scene. You can turn disable it from appearing or make
 * it so that it doesn't 
 *
 * ---
 *
 * Command Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Party Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Party Command Window.
 * 
 *   Fight Icon:
 *   - The icon used for the Fight command.
 * 
 *   Add Auto Battle?:
 *   - Add the "Auto Battle" command to the Command Window?
 * 
 *     Auto Battle Icon:
 *     - The icon used for the Auto Battle command.
 * 
 *     Auto Battle Text:
 *     - The text used for the Auto Battle command.
 * 
 *   Add Options?:
 *   - Add the "Options" command to the Command Window?
 * 
 *     Options Icon:
 *     - The icon used for the Options command.
 * 
 *     Active TPB Message:
 *     - Message that will be displayed when selecting options during the
 *       middle of an action.
 * 
 *   Escape Icon:
 *   - The icon used for the Escape command.
 *
 * ---
 *
 * Access
 * 
 *   Skip Party Command:
 *   - DTB: Skip Party Command selection on turn start.
 *   - TPB: Skip Party Command selection at battle start.
 * 
 *   Disable Party Command:
 *   - Disable the Party Command Window entirely?
 *
 * ---
 *
 * Help Window
 * 
 *   Fight:
 *   - Text displayed when selecting a skill type.
 *   - %1 - Skill Type Name
 * 
 *   Auto Battle:
 *   - Text displayed when selecting the Auto Battle command.
 * 
 *   Options:
 *   - Text displayed when selecting the Options command.
 * 
 *   Escape:
 *   - Text displayed when selecting the escape command.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Actor Command Window
 * ============================================================================
 *
 * These Plugin Parameters allow you to change various aspects regarding the
 * Actor Command Window and how it operates in the battle scene. This ranges
 * from how it appears to the default battle commands given to all players
 * without a custom <Battle Commands> notetag.
 *
 * ---
 *
 * Command Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Actor Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Actor Command Window.
 * 
 *   Item Icon:
 *   - The icon used for the Item command.
 * 
 *   Normal SType Icon:
 *   - Icon used for normal skill types that aren't assigned any icons.
 *   - Ignore if VisuMZ_1_SkillsStatesCore is installed.
 * 
 *   Magic SType Icon:
 *   - Icon used for magic skill types that aren't assigned any icons.
 *   - Ignore if VisuMZ_1_SkillsStatesCore is installed.
 *
 * ---
 *
 * Battle Commands
 * 
 *   Command List:
 *   - List of battle commands that appear by default if the <Battle Commands>
 *     notetag isn't present.
 *
 *     - Attack 
 *       - Adds the basic attack command.
 * 
 *     - Skills
 *       - Displays all the skill types available to the actor.
 * 
 *     - SType: x
 *     - Stype: name
 *       - Adds in a specific skill type.
 *       - Replace 'x' with the ID of the skill type.
 *       - Replace 'name' with the name of the skill type (without text codes).
 *
 *     - All Skills
 *       - Adds all usable battle skills as individual actions.
 * 
 *     - Skill: x
 *     - Skill: name
 *       - Adds in a specific skill as a usable action.
 *       - Replace 'x' with the ID of the skill.
 *       - Replace 'name' with the name of the skill.
 * 
 *     - Guard
 *       - Adds the basic guard command.
 * 
 *     - Item
 *       - Adds the basic item command.
 * 
 *     - Escape
 *       - Adds the escape command.
 * 
 *     - Auto Battle
 *       - Adds the auto battle command.
 *
 * ---
 *
 * Help Window
 * 
 *   Skill Types:
 *   - Text displayed when selecting a skill type.
 *   - %1 - Skill Type Name
 * 
 *   Items:
 *   - Text displayed when selecting the item command.
 * 
 *   Escape:
 *   - Text displayed when selecting the escape command.
 * 
 *   Auto Battle:
 *   - Text displayed when selecting the Auto Battle command.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Actor Battler Settings
 * ============================================================================
 *
 * These Plugin Parameter settings adjust how the sideview battlers behave for
 * the actor sprites. Some of these settings are shared with enemies if they
 * use sideview battler graphics.
 *
 * ---
 *
 * Flinch
 * 
 *   Flinch Distance X:
 *   - The normal X distance when flinching.
 * 
 *   Flinch Distance Y:
 *   - The normal Y distance when flinching.
 * 
 *   Flinch Duration:
 *   - The number of frames for a flinch to complete.
 *
 * ---
 *
 * Sideview Battlers
 * 
 *   Anchor: X:
 *   - Default X anchor for Sideview Battlers.
 * 
 *   Anchor: Y:
 *   - Default Y anchor for Sideview Battlers.
 * 
 *   Offset X:
 *   - Offsets X position where actor is positioned.
 *   - Negative values go left. Positive values go right.
 * 
 *   Offset Y:
 *   - Offsets Y position where actor is positioned.
 *   - Negative values go up. Positive values go down.
 * 
 *   Motion Speed:
 *   - The number of frames in between each motion.
 * 
 *   Shadow Visible:
 *   - Show or hide the shadow for Sideview Battlers.
 * 
 *   Smooth Image:
 *   - Smooth out the battler images or pixelate them?
 * 
 *   JS: Home Position:
 *   - Code used to calculate the home position of actors.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Enemy Battler Settings
 * ============================================================================
 *
 * These Plugin Parameter settings adjust how enemies appear visually in the
 * battle scene. Some of these settings will override the settings used for
 * actors if used as sideview battlers. Other settings include changing up the
 * default attack animation for enemies, how the enemy select window functions,
 * and more.
 *
 * ---
 *
 * Visual
 * 
 *   Attack Animation:
 *   - Default attack animation used for enemies.
 *   - Use <Attack Animation: x> for custom animations.
 * 
 *   Emerge Text:
 *   - Show or hide the 'Enemy emerges!' text at the start of battle.
 * 
 *   Offset X:
 *   - Offsets X position where enemy is positioned.
 *   - Negative values go left. Positive values go right.
 * 
 *   Offset Y:
 *   - Offsets Y position where enemy is positioned.
 *   - Negative values go up. Positive values go down.
 * 
 *   Smooth Image:
 *   - Smooth out the battler images or pixelate them?
 *
 * ---
 *
 * Select Window
 * 
 *   FV: Right Priority:
 *   - If using frontview, auto select the enemy furthest right.
 * 
 *   SV: Right Priority:
 *   - If using sideview, auto select the enemy furthest right.
 * 
 *   Name: Font Size:
 *   - Font size used for enemy names.
 *
 * ---
 *
 * Sideview Battlers
 * 
 *   Allow Collapse:
 *   - Causes defeated enemies with SV Battler graphics to "fade away"
 *     when defeated?
 * 
 *   Anchor: X:
 *   - Default X anchor for Sideview Battlers.
 * 
 *   Anchor: Y:
 *   - Default Y anchor for Sideview Battlers.
 * 
 *   Motion: Idle:
 *   - Sets default idle animation used by Sideview Battlers.
 * 
 *   Shadow Visible:
 *   - Show or hide the shadow for Sideview Battlers.
 * 
 *   Size: Width:
 *   - Default width for enemies that use Sideview Battlers.
 * 
 *   Size: Height:
 *   - Default height for enemies that use Sideview Battlers.
 * 
 *   Weapon Type:
 *   - Sets default weapon type used by Sideview Battlers.
 *   - Use 0 for Bare Hands.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: HP Gauge Settings
 * ============================================================================
 *
 * Settings that adjust the visual HP Gauge displayed in battle.
 *
 * ---
 *
 * Show Gauges For
 * 
 *   Actors:
 *   - Show HP Gauges over the actor sprites' heads?
 *   - Requires SV Actors to be visible.
 * 
 *   Enemies:
 *   - Show HP Gauges over the enemy sprites' heads?
 *   - Can be bypassed with <Hide HP Gauge> notetag.
 * 
 *     Requires Defeat?:
 *     - Requires defeating the enemy once to show HP Gauge?
 *     - Can be bypassed with <Show HP Gauge> notetag.
 * 
 *       Battle Test Bypass?:
 *       - Bypass the defeat requirement in battle test?
 *
 * ---
 *
 * Settings
 * 
 *   Anchor X:
 *   Anchor Y:
 *   - Where do you want the HP Gauge sprite's anchor X/Y to be?
 * 
 *   Scale:
 *   - How large/small do you want the HP Gauge to be scaled?
 * 
 *   Offset X:
 *   Offset Y:
 *   - How many pixels to offset the HP Gauge's X/Y by?
 *
 * ---
 *
 * Options
 * 
 *   Add Option?:
 *   - Add the 'Show HP Gauge' option to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Option Name:
 *   - Command name of the option.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Action Sequence Settings
 * ============================================================================
 *
 * Action Sequence Plugin Parameters allow you to decide if you want automatic
 * Action Sequences to be used for physical attacks, the default casting
 * animations used, how counters and reflects appear visually, and what the
 * default stepping distances are.
 *
 * ---
 *
 * Automatic Sequences
 * 
 *   Melee Single Target:
 *   - Allow this auto sequence for physical, single target actions?
 * 
 *   Melee Multi Target:
 *   - Allow this auto sequence for physical, multi-target actions?
 *
 * ---
 *
 * Cast Animations
 * 
 *   Certain Hit:
 *   - Cast animation for Certain Hit skills.
 * 
 *   Physical:
 *   - Cast animation for Physical skills.
 * 
 *   Magical:
 *   - Cast animation for Magical skills.
 *
 * ---
 *
 * Counter/Reflect
 * 
 *   Counter Back:
 *   - Play back the attack animation used?
 * 
 *   Reflect Animation:
 *   - Animation played when an action is reflected.
 * 
 *   Reflect Back:
 *   - Play back the attack animation used?
 *
 * ---
 *
 * Stepping
 * 
 *   Melee Distance:
 *   - Minimum distance in pixels for Movement Action Sequences.
 * 
 *   Step Distance X:
 *   - The normal X distance when stepping forward.
 * 
 *   Step Distance Y:
 *   - The normal Y distance when stepping forward.
 * 
 *   Step Duration:
 *   - The number of frames for a stepping action to complete.
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
 * ** Active Battler Sprites now remain on top and won't be hidden behind
 *    other sprites for better visual clarity. Fix made by Arisu.
 * ** Collapsing battlers will now show the dead motion properly. Fix made by
 *    Olivia.
 * ** Dead battlers can no longer be given immortality. Fix made by Olivia.
 * ** Going into the Options menu with no battleback set will no longer set a
 *    battle snapshot.
 * ** HP Gauges for Sideview Enemies are no longer flipped! Fix made by Yanfly.
 * ** Moving a dead battler would no longer reset their animation. Fix made by
 *    Olivia.
 * ** Pre-Battle Common Events now work with events instead of just random
 *    encounters. Fix made by Yanfly.
 * ** Sideview Enemy shadows no longer twitch. Fix made by Irina.
 * * Documentation Updates!
 * ** Added further explanations for Anchor X and Anchor Y plugin parameters.
 *    This is because there's a lot of confusion for users who aren't familiar
 *    with how sprites work. Added by Irina.
 * ** <Magic Reduction: x> notetag updated to say magical damage instead of
 *    physical damage. Fix made by Yanfly.
 * * New Features!
 * ** Additional Action Sequence Plugin Commands have been added in preparation
 *    of upcoming plugins! Additions made by Irina.
 * *** Action Sequences - Angle (for VisuMZ_3_ActSeqCamera)
 * *** Action Sequences - Camera (for VisuMZ_3_ActSeqCamera)
 * *** Action Sequences - Skew (for VisuMZ_3_ActSeqCamera)
 * *** Action Sequences - Zoom (for VisuMZ_3_ActSeqCamera)
 * ** Additional Action Sequence Plugin Commands have been made available now
 *    and added to Battle Core! Additions made by Irina.
 * *** MOVE: Scale/Grow/Shrink
 * *** MOVE: Skew/Distort
 * *** MOVE: Spin/Rotate
 * *** MOVE: Wait For Scale
 * *** MOVE: Wait For Skew
 * *** MOVE: Wait For Spin
 * ** Plugin Parameters Additions. Additions made by Irina.
 * *** Plugin Params > Actor Battler Settings > Offset X
 * *** Plugin Params > Actor Battler Settings > Offset Y
 * *** Plugin Params > Actor Battler Settings > Smooth Image
 * *** Plugin Params > Enemy Battler Settings > Offset X
 * *** Plugin Params > Enemy Battler Settings > Offset Y
 * *** Plugin Params > Enemy Battler Settings > Smooth Image
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Animated Battlers will refresh their motions from the death motion once
 *    they're revived instead of waiting for their next input phase. Fix made
 *    by Yanfly.
 * ** Battle Log speed sometimes went by too fast for certain enabled messages.
 *    Wait timers are now added to them, like state results, buff results, and
 *    debuff results. Fix made by Yanfly.
 * ** Boss Collapse animation now works properly. Fix made by Yanfly.
 * ** Freeze fix for TPB (Wait) if multiple actors get a turn at the same time.
 *    Fix made by Olivia.
 * ** Pressing cancel on a target window after selecting a single skill no
 *    longer causes the status window to twitch.
 * ** Sideview Enemies had a split frame of being visible if they were to start
 *    off hidden in battle. Fix made by Shaz.
 * * Compatibility Update:
 * ** Battle Core's Sprite_Damage.setup() function is now separated fro the
 *    default to allow for better compatibility. Made by Yanfly.
 * * Documentation Update:
 * ** Inserted more information for "Damage Popups" under "Major Changes"
 * * New Features!
 * ** <Magic Penetration: x>, <Magic Penetration: x%> notetags added.
 * ** <Magic Reduction: x>, <Magic Reduction: x%> notetags added.
 * ** <Battle UI Offset: +x, +y>, <Battle UI Offset X: +x>, and
 *    <Battle UI Offset Y: +y> notetags added for adjusting the positions of
 *    HP Gauges and State Icons.
 * *** Notetags added by Yanfly.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** Failsafes added for parsing battle targets. Fix made by Yanfly.
 * ** Immortality is no longer ignored by skills/items with the Normal Attack
 *    state effect. Fix made by Yanfly.
 * ** Miss and Evasion sound effects work again! Fix made by Yanfly.
 * ** Selecting "Escape" from the Actor Command Window will now have the
 *    Inputting Battler show its escape motion. Fix made by Yanfly.
 * ** Wait for Movement now applies to SV Enemies. Fix made by Yanfly.
 * * New Features!
 * ** Plugin Command "ACSET: Finish Action" now has an option to turn off the
 *    Immortality of targets. Feature added by Yanfly.
 * * Optimization Update
 * ** Uses less resources when making checks for Pre-Battle Battle Start events
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Plugin Parameters > Damage Settings > Damage Formats are now fixed.
 *    Fix made by Olivia.
 * ** TPB Battle System with Disable Party Command fixed. Fix made by Olivia.
 * ** States now show in list format if faces are disabled. Fix made by Yanfly.
 * ** The default damage styles were missing the 'v' variable to allow for
 *    variable data input. These are back now. Fix made by Yanfly.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Damage Settings > Style List > the style
 *     you want, and adding "const v = $gameVariables._data;" to JS: Formula
 * * New Notetags Added:
 * ** <Command Show Switch: x> added by Olivia
 * ** <Command Show All Switches: x,x,x> added by Olivia
 * ** <Command Show Any Switches: x,x,x> added by Olivia
 * ** <Command Hide Switch: x> added by Olivia
 * ** <Command Hide All Switches: x,x,x> added by Olivia
 * ** <Command Hide Any Switches: x,x,x> added by Olivia
 * ** <JS Command Visible> added by Olivia
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
 * @command ActionSequenceSpaceStart
 * @text -
 * @desc The following are Action Sequences commands/sets.
 * These Plugin Commands only work in battle.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakSet
 * @text Action Sequence - Action Sets
 * @desc Action Sequence Action Sets are groups of commonly used
 * Action Sequence Commands put together for more efficient usage.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Set_SetupAction
 * @text ACSET: Setup Action Set
 * @desc The generic start to most actions.
 * 
 * @arg DisplayAction:eval
 * @text Display Action
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ApplyImmortal:eval
 * @text Immortal: On
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ActionStart:eval
 * @text Battle Step
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg CastAnimation:eval
 * @text Cast Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Set_WholeActionSet
 * @text ACSET: All Targets Action Set
 * @desc Affects all targets simultaneously performing the following.
 * 
 * @arg PerformAction:eval
 * @text Perform Action
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitCount:eval
 * @text Wait Count
 * @desc How many frames should the action sequence wait?
 * You may use JavaScript code.
 * @default Sprite_Battler._motionSpeed
 * 
 * @arg ActionAnimation:eval
 * @text Action Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ActionEffect:eval
 * @text Action Effect
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ApplyImmortal:eval
 * @text Immortal: Off
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Set_TargetActionSet
 * @text ACSET: Each Target Action Set
 * @desc Goes through each target one by one to perform the following.
 * 
 * @arg PerformAction:eval
 * @text Perform Action
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitCount1:eval
 * @text Wait Count
 * @desc How many frames should the action sequence wait?
 * You may use JavaScript code.
 * @default Sprite_Battler._motionSpeed
 * 
 * @arg ActionAnimation:eval
 * @text Action Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitCount2:eval
 * @text Wait Count
 * @desc How many frames should the action sequence wait?
 * You may use JavaScript code.
 * @default Sprite_Battler._motionSpeed * 2
 * 
 * @arg ActionEffect:eval
 * @text Action Effect
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ApplyImmortal:eval
 * @text Immortal: Off
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Set_FinishAction
 * @text ACSET: Finish Action
 * @desc The generic ending to most actions.
 * 
 * @arg ApplyImmortal:eval
 * @text Immortal: Off
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForNewLine:eval
 * @text Wait For New Line
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForEffect:eval
 * @text Wait For Effects
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ClearBattleLog:eval
 * @text Clear Battle Log
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ActionEnd:eval
 * @text Home Reset
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceAngle
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakAngle
 * @text Action Sequences - Angle
 * @desc Allows you to have control over the camera angle.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_ChangeAngle
 * @text ANGLE: Change Angle
 * @desc Changes the camera angle.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Angle:eval
 * @text Angle
 * @desc Change the camera angle to this many degrees.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to change camera angle.
 * @default 60
 *
 * @arg EasingType:str
 * @text Angle Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForAngle:eval
 * @text Wait For Angle?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for angle changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Angle_Reset
 * @text ANGLE: Reset Angle
 * @desc Reset any angle settings.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to reset camera angle.
 * @default 60
 *
 * @arg EasingType:str
 * @text Angle Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForAngle:eval
 * @text Wait For Angle?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for angle changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Angle_WaitForAngle
 * @text ANGLE: Wait For Angle
 * @desc Waits for angle changes to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceAnimation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakAnimation
 * @text Action Sequences - Animations
 * @desc These Action Sequences are related to the 'Animations' that
 * can be found in the Animations tab of the Database.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_ActionAnimation
 * @text ANIM: Action Animation
 * @desc Plays the animation associated with the action.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["all targets"]
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_AttackAnimation
 * @text ANIM: Attack Animation
 * @desc Plays the animation associated with the user's weapon.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["all targets"]
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_CastAnimation
 * @text ANIM: Cast Animation
 * @desc Plays the cast animation associated with the action.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["user"]
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_ChangeBattlePortrait
 * @text ANIM: Change Battle Portrait
 * @desc Changes the battle portrait of the actor (if it's an actor).
 * Can be used outside of battle/action sequences.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to change the portraits for.
 * Valid units can only be actors.
 * @default ["user"]
 * 
 * @arg Filename:str
 * @text Filename
 * @type file
 * @dir img/pictures/
 * @desc Select the file to change the actor's portrait to.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_ShowAnimation
 * @text ANIM: Show Animation
 * @desc Plays the a specific animation on unit(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["all targets"]
 * 
 * @arg AnimationID:num
 * @text Animation ID
 * @type animation
 * @desc Select which animation to play on unit(s).
 * @default 1
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_WaitForAnimation
 * @text ANIM: Wait For Animation
 * @desc Causes the interpreter to wait for any animation(s) to finish.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceBattleLog
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakBattleLog
 * @text Action Sequences - Battle Log
 * @desc These Action Sequences are related to the Battle Log Window,
 * the window found at the top of the battle screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_AddText
 * @text BTLOG: Add Text
 * @desc Adds a new line of text into the Battle Log.
 * 
 * @arg Text:str
 * @text Text
 * @desc Add this text into the Battle Log.
 * Text codes allowed.
 * @default Insert text here.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_Clear
 * @text BTLOG: Clear Battle Log
 * @desc Clears all the text in the Battle Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_DisplayAction
 * @text BTLOG: Display Action
 * @desc Displays the current action in the Battle Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_PopBaseLine
 * @text BTLOG: Pop Base Line
 * @desc Removes the Battle Log's last added base line and 
 * all text up to its former location.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_PushBaseLine
 * @text BTLOG: Push Base Line
 * @desc Adds a new base line to where the Battle Log currently is at.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_Refresh
 * @text BTLOG: Refresh Battle Log
 * @desc Refreshes the Battle Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_UI
 * @text BTLOG: UI Show/Hide
 * @desc Shows or hides the Battle UI (including the Battle Log).
 * 
 * @arg ShowHide:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides the Battle UI.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_WaitForBattleLog
 * @text BTLOG: Wait For Battle Log
 * @desc Causes the interpreter to wait for the Battle Log to finish.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_WaitForNewLine
 * @text BTLOG: Wait For New Line
 * @desc Causes the interpreter to wait for a new line in the Battle Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceCamera
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakCamera
 * @text Action Sequences - Camera
 * @desc Allows you to have control over the camera.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_Clamp
 * @text CAMERA: Clamp ON/OFF
 * @desc Turns battle camera clamping on/off.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Setting:eval
 * @text ON/OFF
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Turns camera clamping on/off.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_FocusPoint
 * @text CAMERA: Focus Point
 * @desc Focus the battle camera on a certain point in the screen.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg FocusX:eval
 * @text X Coordinate
 * @desc Insert the point to focus the camera on.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 * 
 * @arg FocusY:eval
 * @text Y Coordinate
 * @desc Insert the point to focus the camera on.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for camera focus change.
 * @default 60
 *
 * @arg EasingType:str
 * @text Camera Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForCamera:eval
 * @text Wait For Camera?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for camera changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_FocusTarget
 * @text CAMERA: Focus Target(s)
 * @desc Focus the battle camera on certain battler target(s).
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to focus the battle camera on.
 * @default ["user"]
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for camera focus change.
 * @default 60
 *
 * @arg EasingType:str
 * @text Camera Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForCamera:eval
 * @text Wait For Camera?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for camera changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_Offset
 * @text CAMERA: Offset
 * @desc Offset the battle camera from the focus target.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg OffsetX:eval
 * @text Offset X
 * @desc How much to offset the camera X by.
 * Negative: left. Positive: right.
 * @default +0
 * 
 * @arg OffsetY:eval
 * @text Offset Y
 * @desc How much to offset the camera Y by.
 * Negative: up. Positive: down.
 * @default +0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for offset change.
 * @default 60
 *
 * @arg EasingType:str
 * @text Camera Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForCamera:eval
 * @text Wait For Camera?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for camera changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_Reset
 * @text CAMERA: Reset
 * @desc Reset the battle camera settings.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg ResetFocus:eval
 * @text Reset Focus?
 * @type boolean
 * @on On
 * @off Off
 * @desc Reset the focus point?
 * @default true
 * 
 * @arg ResetOffset:eval
 * @text Reset Offset?
 * @type boolean
 * @on On
 * @off Off
 * @desc Reset the camera offset?
 * @default true
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for reset change.
 * @default 60
 *
 * @arg EasingType:str
 * @text Camera Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForCamera:eval
 * @text Wait For Camera?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for camera changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_WaitForCamera
 * @text CAMERA: Wait For Camera
 * @desc Waits for camera to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 *
 * @command ActionSequenceSpaceDragonbones
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreaDragonbones
 * @text Action Sequences - Dragonbones
 * @desc These Action Sequences are Dragonbones-related.
 * Requires VisuMZ_2_DragonbonesUnion!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_DB_DragonbonesMotionAni
 * @text DB: Dragonbones Animation
 * @desc Causes the unit(s) to play a Dragonbones motion animation.
 * Requires VisuMZ_2_DragonbonesUnion!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to perform a motion animation.
 * @default ["user"]
 *
 * @arg MotionAni:str
 * @text Motion Animation
 * @desc What is the name of the Dragonbones motion animation you wish to play?
 * @default attack
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_DB_DragonbonesTimeScale
 * @text DB: Dragonbones Time Scale
 * @desc Causes the unit(s) to change their Dragonbones time scale.
 * Requires VisuMZ_2_DragonbonesUnion!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to perform a motion animation.
 * @default ["user"]
 *
 * @arg TimeScale:num
 * @text Time Scale
 * @desc Change the value of the Dragonbones time scale to this.
 * @default 1.0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceElements
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakElements
 * @text Action Sequences - Elements
 * @desc These Action Sequences are related to elements.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Element_AddElements
 * @text ELE: Add Elements
 * @desc Adds element(s) to be used when calculating damage.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @arg Elements:arraynum
 * @text Elements
 * @type number[]
 * @min 1
 * @max 99
 * @desc Select which element ID to add onto the action.
 * Insert multiple element ID's to add multiple at once.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Element_Clear
 * @text ELE: Clear Element Changes
 * @desc Clears all element changes made through Action Sequences.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Element_ForceElements
 * @text ELE: Force Elements
 * @desc Forces only specific element(s) when calculating damage.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @arg Elements:arraynum
 * @text Elements
 * @type number[]
 * @min 1
 * @max 99
 * @desc Select which element ID to force in the action.
 * Insert multiple element ID's to force multiple at once.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Element_NullElements
 * @text ELE: Null Element
 * @desc Forces no element to be used when calculating damage.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceMechanics
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakMechanics
 * @text Action Sequences - Mechanics
 * @desc These Action Sequences are related to various mechanics
 * related to the battle system.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_ActionEffect
 * @text MECH: Action Effect
 * @desc Causes the unit(s) to take damage/healing from action and
 * incurs any changes made such as buffs and states.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to receive the current action's effects.
 * @default ["all targets"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_AddBuffDebuff
 * @text MECH: Add Buff/Debuff
 * @desc Adds buff(s)/debuff(s) to unit(s). 
 * Determine which parameters are affected and their durations.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to receive the buff(s) and/or debuff(s).
 * @default ["user"]
 * 
 * @arg Buffs:arraystr
 * @text Buff Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @desc Select which parameter(s) to buff.
 * Insert a parameter multiple times to raise its stacks.
 * @default ["ATK"]
 *
 * @arg Debuffs:arraystr
 * @text Debuff Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @desc Select which parameter(s) to debuff.
 * Insert a parameter multiple times to raise its stacks.
 * @default ["DEF"]
 * 
 * @arg Turns:eval
 * @text Turns
 * @desc Number of turns to set the parameter(s) buffs to.
 * You may use JavaScript code.
 * @default 5
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_AddState
 * @text MECH: Add State
 * @desc Adds state(s) to unit(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to receive the buff(s).
 * @default ["user"]
 * 
 * @arg States:arraynum
 * @text States
 * @type state[]
 * @desc Select which state ID(s) to add to unit(s).
 * Insert multiple state ID's to add multiple at once.
 * @default ["4"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_ArmorPenetration
 * @text MECH: Armor Penetration
 * @desc Adds an extra layer of defensive penetration/reduction.
 * You may use JavaScript code for any of these.
 *
 * @arg ArmorPenetration
 * @text Armor/Magic Penetration
 * 
 * @arg ArPenRate:eval
 * @text Rate
 * @parent ArmorPenetration
 * @desc Penetrates an extra multiplier of armor by this value.
 * @default 0.00
 * 
 * @arg ArPenFlat:eval
 * @text Flat
 * @parent ArmorPenetration
 * @desc Penetrates a flat amount of armor by this value.
 * @default 0
 *
 * @arg ArmorReduction
 * @text Armor/Magic Reduction
 * 
 * @arg ArRedRate:eval
 * @text Rate
 * @parent ArmorReduction
 * @desc Reduces an extra multiplier of armor by this value.
 * @default 0.00
 * 
 * @arg ArRedFlat:eval
 * @text Flat
 * @parent ArmorReduction
 * @desc Reduces a flat amount of armor by this value.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_AtbGauge
 * @text MECH: ATB Gauge
 * @desc Alters the ATB/TPB Gauges.
 * Requires VisuMZ_2_BattleSystemATB!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to alter the ATB/TPB Gauges for.
 * @default ["all targets"]
 *
 * @arg Charging
 * 
 * @arg ChargeRate:eval
 * @text Charge Rate
 * @parent Charging
 * @desc Changes made to the ATB Gauge if it is currently charging.
 * @default -0.00
 * 
 * @arg Casting
 * 
 * @arg CastRate:eval
 * @text Cast Rate
 * @parent Casting
 * @desc Changes made to the ATB Gauge if it is currently casting.
 * @default -0.00
 * 
 * @arg Interrupt:eval
 * @text Interrupt?
 * @parent Casting
 * @type boolean
 * @on Interrupt
 * @off Don't Interrupt
 * @desc Interrupt the ATB Gauge if it is currently casting?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_Collapse
 * @text MECH: Collapse
 * @desc Causes the unit(s) to perform its collapse animation
 * if the unit(s) has died.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to process a death collapse.
 * @default ["all targets"]
 * 
 * @arg ForceDeath:eval
 * @text Force Death
 * @type boolean
 * @on On
 * @off Off
 * @desc Force death even if the unit has not reached 0 HP?
 * This will remove immortality.
 * @default false
 * 
 * @arg WaitForEffect:eval
 * @text Wait For Effect?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for the collapse effect to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_DamagePopup
 * @text MECH: Damage Popup
 * @desc Causes the unit(s) to display the current state of
 * damage received or healed.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to prompt a damage popup.
 * @default ["all targets"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_DeathBreak
 * @text MECH: Dead Label Jump
 * @desc If the active battler is dead, jump to a specific label in the common event.
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If the active battler is dead, jump to this specific label in the common event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_HpMpTp
 * @text MECH: HP, MP, TP
 * @desc Alters the HP, MP, and TP values for unit(s).
 * Positive values for healing. Negative values for damage.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to receive the current action's effects.
 * @default ["user"]
 *
 * @arg HP
 * 
 * @arg HP_Rate:eval
 * @text HP Rate
 * @parent HP
 * @desc Changes made to HP based on rate.
 * Positive values for healing. Negative values for damage.
 * @default +0.00
 * 
 * @arg HP_Flat:eval
 * @text HP Flat
 * @parent HP
 * @desc Flat changes made to HP.
 * Positive values for healing. Negative values for damage.
 * @default +0
 * 
 * @arg MP
 * 
 * @arg MP_Rate:eval
 * @text MP Rate
 * @parent MP
 * @desc Changes made to MP based on rate.
 * Positive values for healing. Negative values for damage.
 * @default +0.00
 * 
 * @arg MP_Flat:eval
 * @text MP Flat
 * @parent MP
 * @desc Flat changes made to MP.
 * Positive values for healing. Negative values for damage.
 * @default +0
 *
 * @arg TP
 * 
 * @arg TP_Rate:eval
 * @text TP Rate
 * @parent TP
 * @desc Changes made to TP based on rate.
 * Positive values for healing. Negative values for damage.
 * @default +0.00
 * 
 * @arg TP_Flat:eval
 * @text TP Flat
 * @parent TP
 * @desc Flat changes made to TP.
 * Positive values for healing. Negative values for damage.
 * @default +0
 * 
 * @arg ShowPopup:eval
 * @text Damage Popup?
 * @type boolean
 * @on On
 * @off Off
 * @desc Display a damage popup after?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_Immortal
 * @text MECH: Immortal
 * @desc Changes the immortal flag of targets. If immortal flag is
 * removed and a unit would die, collapse that unit.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Alter the immortal flag of these groups. If immortal flag
 * is removed and a unit would die, collapse that unit.
 * @default ["user","all targets"]
 * 
 * @arg Immortal:eval
 * @text Immortal
 * @type boolean
 * @on On
 * @off Off
 * @desc Turn immortal flag for unit(s) on/off?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_Multipliers
 * @text MECH: Multipliers
 * @desc Changes the multipliers for the current action.
 * You may use JavaScript code for any of these.
 *
 * @arg CriticalHit
 * @text Critical Hit%
 * 
 * @arg CriticalHitRate:eval
 * @text Rate
 * @parent CriticalHit
 * @desc Affects chance to land a critical hit by this multiplier.
 * @default 1.00
 * 
 * @arg CriticalHitFlat:eval
 * @text Flat
 * @parent CriticalHit
 * @desc Affects chance to land a critical hit by this flat bonus.
 * @default +0.00
 *
 * @arg CriticalDmg
 * @text Critical Damage
 * 
 * @arg CriticalDmgRate:eval
 * @text Rate
 * @parent CriticalDmg
 * @desc Affects critical damage by this multiplier.
 * @default 1.00
 * 
 * @arg CriticalDmgFlat:eval
 * @text Flat
 * @parent CriticalDmg
 * @desc Affects critical damage by this flat bonus.
 * @default +0.00
 *
 * @arg Damage
 * @text Damage/Healing
 * 
 * @arg DamageRate:eval
 * @text Rate
 * @parent Damage
 * @desc Sets the damage/healing multiplier for current action.
 * @default 1.00
 * 
 * @arg DamageFlat:eval
 * @text Flat
 * @parent Damage
 * @desc Sets the damage/healing bonus for current action.
 * @default +0.00
 *
 * @arg HitRate
 * @text Hit Rate
 * 
 * @arg HitRate:eval
 * @text Rate
 * @parent HitRate
 * @desc Affects chance to connect attack by this multiplier.
 * @default 1.00
 * 
 * @arg HitFlat:eval
 * @text Flat
 * @parent HitRate
 * @desc Affects chance to connect attack by this flat bonus.
 * @default +0.00
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_RemoveBuffDebuff
 * @text MECH: Remove Buff/Debuff
 * @desc Removes buff(s)/debuff(s) from unit(s). 
 * Determine which parameters are removed.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to have the buff(s) and/or debuff(s) removed.
 * @default ["user"]
 * 
 * @arg Buffs:arraystr
 * @text Buff Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @desc Select which buffed parameter(s) to remove.
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @arg Debuffs:arraystr
 * @text Debuff Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @desc Select which debuffed parameter(s) to remove.
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_RemoveState
 * @text MECH: Remove State
 * @desc Remove state(s) from unit(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to have states removed from.
 * @default ["user"]
 * 
 * @arg States:arraynum
 * @text States
 * @type state[]
 * @desc Select which state ID(s) to remove from unit(s).
 * Insert multiple state ID's to remove multiple at once.
 * @default ["4"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_TextPopup
 * @text MECH: Text Popup
 * @desc Causes the unit(s) to display a text popup.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to prompt a text popup.
 * @default ["target"]
 * 
 * @arg Text:str
 * @text Text
 * @desc What text do you wish to display?
 * @default Text
 * 
 * @arg TextColor:str
 * @text Text Color
 * @parent Text:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #ffffff
 *
 * @arg FlashColor:eval
 * @text Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 * 
 * @arg FlashDuration:num
 * @text Flash Duration
 * @parent FlashColor:eval
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_WaitForEffect
 * @text MECH: Wait For Effect
 * @desc Waits for the effects to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceMotion
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakMotion
 * @text Action Sequences - Motion
 * @desc These Action Sequences allow you the ability to control
 * the motions of sideview sprites.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_MotionType
 * @text MOTION: Motion Type
 * @desc Causes the unit(s) to play the selected motion.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to perform a motion.
 * @default ["user"]
 *
 * @arg MotionType:str
 * @text Motion Type
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option attack
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Play this motion for the unit(s).
 * @default attack
 *
 * @arg ShowWeapon:eval
 * @text Show Weapon?
 * @type combo
 * @type boolean
 * @on Show
 * @off Hide
 * @desc If using 'attack', 'thrust', 'swing', or 'missile',
 * display the weapon sprite?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_PerformAction
 * @text MOTION: Perform Action
 * @desc Causes the unit(s) to play the proper motion based
 * on the current action.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to perform a motion.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_RefreshMotion
 * @text MOTION: Refresh Motion
 * @desc Cancels any set motions unit(s) has to do and use
 * their most natural motion at the moment.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to refresh their motion state.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_WaitMotionFrame
 * @text MOTION: Wait By Motion Frame
 * @desc Creates a wait equal to the number of motion frames passing.
 * Time is based on Plugin Parameters => Actors => Motion Speed.
 *
 * @arg MotionFrameWait:num
 * @text Motion Frames to Wait?
 * @type number
 * @min 1
 * @desc Each "frame" is equal to the value found in
 * Plugin Parameters => Actors => Motion Speed
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceMovement
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakMovement
 * @text Action Sequences - Movement
 * @desc These Action Sequences allow you the ability to control
 * the sprites of actors and enemies in battle.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_BattleStep
 * @text MOVE: Battle Step
 * @desc Causes the unit(s) to move forward past their home position
 * to prepare for action.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["user"]
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_FaceDirection
 * @text MOVE: Face Direction
 * @desc Causes the unit(s) to face forward or backward.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change direction.
 * @default ["user"]
 * 
 * @arg Direction:str
 * @text Direction
 * @type combo
 * @option forward
 * @option backward
 * @option random
 * @desc Select which direction to face.
 * @default forward
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_FacePoint
 * @text MOVE: Face Point
 * @desc Causes the unit(s) to face a point on the screen.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change direction.
 * @default ["user"]
 * 
 * @arg Point:str
 * @text Point
 * @type combo
 * @option home
 * @option center
 * @option point x, y
 * @desc Select which point to face.
 * Replace 'x' and 'y' with coordinates
 * @default home
 * 
 * @arg FaceAway:eval
 * @text Face Away From?
 * @type boolean
 * @on Turn Away
 * @off Face Directly
 * @desc Face away from the point instead?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_FaceTarget
 * @text MOVE: Face Target(s)
 * @desc Causes the unit(s) to face other targets on the screen.
 * Sideview-only!
 * 
 * @arg Targets1:arraystr
 * @text Targets (facing)
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change direction.
 * @default ["user"]
 * 
 * @arg Targets2:arraystr
 * @text Targets (destination)
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) for the turning unit(s) to face.
 * @default ["current target"]
 * 
 * @arg FaceAway:eval
 * @text Face Away From?
 * @type boolean
 * @on Turn Away
 * @off Face Directly
 * @desc Face away from the unit(s) instead?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Float
 * @text MOVE: Float
 * @desc Causes the unit(s) to float above the ground.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to make float.
 * @default ["user"]
 * 
 * @arg Height:eval
 * @text Desired Height
 * @desc Vertical distance to float upward.
 * You may use JavaScript code.
 * @default 100
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total float amount.
 * @default 12
 *
 * @arg EasingType:str
 * @text Float Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @arg WaitForFloat:eval
 * @text Wait For Float?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for floating to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_HomeReset
 * @text MOVE: Home Reset
 * @desc Causes the unit(s) to move back to their home position(s)
 * and face back to their original direction(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["alive battlers"]
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Jump
 * @text MOVE: Jump
 * @desc Causes the unit(s) to jump into the air.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to make jump.
 * @default ["user"]
 * 
 * @arg Height:eval
 * @text Desired Height
 * @desc Max jump height to go above the ground
 * You may use JavaScript code.
 * @default 100
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total jump amount.
 * @default 12
 * 
 * @arg WaitForJump:eval
 * @text Wait For Jump?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for jumping to complete before performing next command?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_MoveBy
 * @text MOVE: Move Distance
 * @desc Moves unit(s) by a distance from their current position(s).
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["user"]
 *
 * @arg DistanceAdjust:str
 * @text Distance Adjustment
 * @type select
 * @option Normal - No adjustments made
 * @value none
 * @option Horizontal - Actors adjust left, Enemies adjust right
 * @value horz
 * @option Vertical - Actors adjust Up, Enemies adjust down
 * @value vert
 * @option Both - Applies both Horizontal and Vertical
 * @value horz + vert
 * @desc Makes adjustments to distance values to determine
 * which direction to move unit(s).
 * @default horz
 * 
 * @arg DistanceX:eval
 * @text Distance: X
 * @parent DistanceAdjust:str
 * @desc Horizontal distance to move.
 * You may use JavaScript code.
 * @default 48
 * 
 * @arg DistanceY:eval
 * @text Distance: Y
 * @parent DistanceAdjust:str
 * @desc Vertical distance to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total movement amount.
 * @default 12
 * 
 * @arg FaceDirection:eval
 * @text Face Destination?
 * @type boolean
 * @on Turn
 * @off Don't
 * @desc Turn and face the destination?
 * @default true
 *
 * @arg EasingType:str
 * @text Movement Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 *
 * @arg MotionType:str
 * @text Movement Motion
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option attack
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Play this motion for the unit(s).
 * @default walk
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_MoveToPoint
 * @text MOVE: Move To Point
 * @desc Moves unit(s) to a designated point on the screen.
 * Sideview-only! Points based off Graphics.boxWidth/Height.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["user"]
 * 
 * @arg Destination:str
 * @text Destination Point
 * @type combo
 * @option home
 * @option center
 * @option point x, y
 * @desc Select which point to face.
 * Replace 'x' and 'y' with coordinates
 * @default home
 *
 * @arg OffsetAdjust:str
 * @text Offset Adjustment
 * @parent Destination:str
 * @type select
 * @option Normal - No adjustments made
 * @value none
 * @option Horizontal - Actors adjust left, Enemies adjust right
 * @value horz
 * @option Vertical - Actors adjust Up, Enemies adjust down
 * @value vert
 * @option Both - Applies both Horizontal and Vertical
 * @value horz + vert
 * @desc Makes adjustments to offset values to determine
 * which direction to adjust the destination by.
 * @default horz
 * 
 * @arg OffsetX:eval
 * @text Offset: X
 * @parent OffsetAdjust:str
 * @desc Horizontal offset to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg OffsetY:eval
 * @text Offset: Y
 * @parent OffsetAdjust:str
 * @desc Vertical offset to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total movement amount.
 * @default 12
 * 
 * @arg FaceDirection:eval
 * @text Face Destination?
 * @type boolean
 * @on Turn
 * @off Don't
 * @desc Turn and face the destination?
 * @default true
 *
 * @arg EasingType:str
 * @text Movement Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 *
 * @arg MotionType:str
 * @text Movement Motion
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option attack
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Play this motion for the unit(s).
 * @default walk
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_MoveToTarget
 * @text MOVE: Move To Target(s)
 * @desc Moves unit(s) to another unit(s) on the battle field.
 * Sideview-only!
 * 
 * @arg Targets1:arraystr
 * @text Targets (Moving)
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["user"]
 * 
 * @arg Targets2:arraystr
 * @text Targets (Destination)
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move to.
 * @default ["all targets"]
 * 
 * @arg TargetLocation:str
 * @text Target Location
 * @parent Targets2:arraystr
 * @type combo
 * @option front head
 * @option front center
 * @option front base
 * @option middle head
 * @option middle center
 * @option middle base
 * @option back head
 * @option back center
 * @option back base
 * @desc Select which part target group to move to.
 * @default front base
 * 
 * @arg MeleeDistance:eval
 * @text Melee Distance
 * @parent TargetLocation:str
 * @desc The melee distance away from the target location
 * in addition to the battler's width.
 * @default 24
 *
 * @arg OffsetAdjust:str
 * @text Offset Adjustment
 * @parent Targets2:arraystr
 * @type select
 * @option Normal - No adjustments made
 * @value none
 * @option Horizontal - Actors adjust left, Enemies adjust right
 * @value horz
 * @option Vertical - Actors adjust Up, Enemies adjust down
 * @value vert
 * @option Both - Applies both Horizontal and Vertical
 * @value horz + vert
 * @desc Makes adjustments to offset values to determine
 * which direction to adjust the destination by.
 * @default horz
 * 
 * @arg OffsetX:eval
 * @text Offset: X
 * @parent OffsetAdjust:str
 * @desc Horizontal offset to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg OffsetY:eval
 * @text Offset: Y
 * @parent OffsetAdjust:str
 * @desc Vertical offset to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total movement amount.
 * @default 12
 * 
 * @arg FaceDirection:eval
 * @text Face Destination?
 * @type boolean
 * @on Turn
 * @off Don't
 * @desc Turn and face the destination?
 * @default true
 *
 * @arg EasingType:str
 * @text Movement Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 *
 * @arg MotionType:str
 * @text Movement Motion
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option attack
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Play this motion for the unit(s).
 * @default walk
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Opacity
 * @text MOVE: Opacity
 * @desc Causes the unit(s) to change opacity.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to make float.
 * @default ["user"]
 * 
 * @arg Opacity:eval
 * @text Desired Opacity
 * @desc Change to this opacity value.
 * You may use JavaScript code.
 * @default 255
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for opacity change.
 * @default 12
 *
 * @arg EasingType:str
 * @text Opacity Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @arg WaitForOpacity:eval
 * @text Wait For Opacity?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for opacity changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Scale
 * @text MOVE: Scale/Grow/Shrink
 * @desc Causes the unit(s) to scale, grow, or shrink?.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change the scale of.
 * @default ["user"]
 * 
 * @arg ScaleX:eval
 * @text Scale X
 * @desc What target scale value do you want?
 * 1.0 is normal size.
 * @default 1.00
 * 
 * @arg ScaleY:eval
 * @text Scale Y
 * @desc What target scale value do you want?
 * 1.0 is normal size.
 * @default 1.00
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to scale for.
 * @default 12
 *
 * @arg EasingType:str
 * @text Scale Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @arg WaitForScale:eval
 * @text Wait For Scale?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for scaling to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Skew
 * @text MOVE: Skew/Distort
 * @desc Causes the unit(s) to skew.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to skew.
 * @default ["user"]
 * 
 * @arg SkewX:eval
 * @text Skew X
 * @desc X variance to skew?
 * Use small values for the best results.
 * @default 0.00
 * 
 * @arg SkewY:eval
 * @text Skew Y
 * @desc Y variance to skew?
 * Use small values for the best results.
 * @default 0.00
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to skew for.
 * @default 12
 *
 * @arg EasingType:str
 * @text Skew Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @arg WaitForSkew:eval
 * @text Wait For Skew?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for skew to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Spin
 * @text MOVE: Spin/Rotate
 * @desc Causes the unit(s) to spin.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to spin.
 * @default ["user"]
 * 
 * @arg Angle:eval
 * @text Angle
 * @desc How many degrees to spin?
 * @default 360
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to spin for.
 * @default 12
 *
 * @arg EasingType:str
 * @text Spin Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @arg WaitForSpin:eval
 * @text Wait For Spin?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for spin to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForFloat
 * @text MOVE: Wait For Float
 * @desc Waits for floating to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForJump
 * @text MOVE: Wait For Jump
 * @desc Waits for jumping to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForMovement
 * @text MOVE: Wait For Movement
 * @desc Waits for movement to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForOpacity
 * @text MOVE: Wait For Opacity
 * @desc Waits for opacity changes to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForScale
 * @text MOVE: Wait For Scale
 * @desc Waits for scaling to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForSkew
 * @text MOVE: Wait For Skew
 * @desc Waits for skewing to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForSpin
 * @text MOVE: Wait For Spin
 * @desc Waits for spinning to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceSkew
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakSkew
 * @text Action Sequences - Skew
 * @desc Allows you to have control over the camera skew.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_ChangeSkew
 * @text SKEW: Change Skew
 * @desc Changes the camera skew.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg SkewX:eval
 * @text Skew X
 * @desc Change the camera skew X to this value.
 * @default 0
 * 
 * @arg SkewY:eval
 * @text Skew Y
 * @desc Change the camera skew Y to this value.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to change camera skew.
 * @default 60
 *
 * @arg EasingType:str
 * @text Skew Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForSkew:eval
 * @text Wait For Skew?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for skew changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Skew_Reset
 * @text SKEW: Reset Skew
 * @desc Reset any skew settings.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to reset camera skew.
 * @default 60
 *
 * @arg EasingType:str
 * @text Skew Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForSkew:eval
 * @text Wait For Skew?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for skew changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Skew_WaitForSkew
 * @text SKEW: Wait For Skew
 * @desc Waits for skew changes to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceTarget
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakTarget
 * @text Action Sequences - Target
 * @desc If using a manual target by target Action Sequence,
 * these commands will give you full control over its usage.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Target_CurrentIndex
 * @text TARGET: Current Index
 * @desc Sets the current index to this value.
 * Then decide to jump to a label (optional).
 * 
 * @arg Index:eval
 * @text Set Index To
 * @desc Sets current targeting index to this value.
 * 0 is the starting index of a target group.
 * @default 0
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a target is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Target_NextTarget
 * @text TARGET: Next Target
 * @desc Moves index forward by 1 to select a new current target.
 * Then decide to jump to a label (optional).
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a target is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Target_PrevTarget
 * @text TARGET: Previous Target
 * @desc Moves index backward by 1 to select a new current target.
 * Then decide to jump to a label (optional).
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a target is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Target_RandTarget
 * @text TARGET: Random Target
 * @desc Sets index randomly to determine new currernt target.
 * Then decide to jump to a label (optional).
 * 
 * @arg ForceRandom:eval
 * @text Force Random?
 * @type boolean
 * @on On
 * @off Off
 * @desc Index cannot be its previous index amount after random.
 * @default false
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a target is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceZoom
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakZoom
 * @text Action Sequences - Zoom
 * @desc Allows you to have control over the screen zoom.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Zoom_Scale
 * @text ZOOM: Change Scale
 * @desc Changes the zoom scale.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Scale:eval
 * @text Scale
 * @desc The zoom scale to change to.
 * @default 1.0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to change battle zoom.
 * @default 60
 *
 * @arg EasingType:str
 * @text Zoom Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForZoom:eval
 * @text Wait For Zoom?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for zoom changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Zoom_Reset
 * @text ZOOM: Reset Zoom
 * @desc Reset any zoom settings.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to reset battle zoom.
 * @default 60
 *
 * @arg EasingType:str
 * @text Zoom Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForZoom:eval
 * @text Wait For Zoom?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for zoom changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Zoom_WaitForZoom
 * @text ZOOM: Wait For Zoom
 * @desc Waits for zoom to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceEnd
 * @text -
 * @desc -
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
 * @param BattleCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param AutoBattle:struct
 * @text Auto Battle Settings
 * @type struct<AutoBattle>
 * @desc Settings pertaining to Auto Battle.
 * @default {"BattleDisplay":"","AutoBattleMsg:str":"Press %1 or %2 to stop Auto Battle","AutoBattleOK:str":"OK","AutoBattleCancel:str":"Cancel","AutoBattleBgType:num":"1","AutoBattleRect:func":"\"const width = Graphics.width;\\nconst height = this.calcWindowHeight(1, false);\\nconst x = 0;\\nconst y = (Graphics.height - height) / 2;\\nreturn new Rectangle(x, y, width, height);\"","Options":"","AddOption:eval":"true","AdjustRect:eval":"true","StartName:str":"Auto Battle Start","StyleName:str":"Auto Battle Style","StyleOFF:str":"Attack","StyleON:str":"Skills"}
 *
 * @param Damage:struct
 * @text Damage Settings
 * @type struct<Damage>
 * @desc Settings pertaining to damage calculations.
 * @default {"Cap":"","EnableDamageCap:eval":"false","DefaultHardCap:num":"9999","EnableSoftCap:eval":"false","DefaultSoftCap:num":"0.80","DefaultSoftScaler:num":"0.1275","Popups":"","PopupDuration:num":"128","NewPopupBottom:eval":"true","PopupShiftX:num":"8","PopupShiftY:num":"-28","hpDamageFmt:str":"-%1","hpHealingFmt:str":"+%1","mpDamageFmt:str":"-%1 %2","mpHealingFmt:str":"+%1 %2","CriticalColor:eval":"[255, 0, 0, 160]","CriticalDuration:num":"128","Formulas":"","OverallFormulaJS:func":"\"// Declare Constants\\nconst target = arguments[0];\\nconst critical = arguments[1];\\nconst item = this.item();\\n\\n// Get Base Damage\\nconst baseValue = this.evalDamageFormula(target);\\n\\n// Calculate Element Modifiers\\nlet value = baseValue * this.calcElementRate(target);\\n\\n// Calculate Physical and Magical Modifiers\\nif (this.isPhysical()) {\\n    value *= target.pdr;\\n}\\nif (this.isMagical()) {\\n    value *= target.mdr;\\n}\\n\\n// Apply Healing Modifiers\\nif (baseValue < 0) {\\n    value *= target.rec;\\n}\\n\\n// Apply Critical Modifiers\\nif (critical) {\\n    value = this.applyCritical(value);\\n}\\n\\n// Apply Variance and Guard Modifiers\\nvalue = this.applyVariance(value, item.damage.variance);\\nvalue = this.applyGuard(value, target);\\n\\n// Finalize Damage\\nvalue = Math.round(value);\\nreturn value;\"","VarianceFormulaJS:func":"\"// Declare Constants\\nconst damage = arguments[0];\\nconst variance = arguments[1];\\n\\n// Calculate Variance\\nconst amp = Math.floor(Math.max((Math.abs(damage) * variance) / 100, 0));\\nconst v = Math.randomInt(amp + 1) + Math.randomInt(amp + 1) - amp;\\n\\n// Return Damage\\nreturn damage >= 0 ? damage + v : damage - v;\"","GuardFormulaJS:func":"\"// Declare Constants\\nconst damage = arguments[0];\\nconst target = arguments[1];\\n\\n// Return Damage Early\\nconst note = this.item().note;\\nif (note.match(/<UNBLOCKABLE>/i)) return damage;\\nif (!target.isGuard()) return damage;\\nif (damage < 0) return damage;\\n\\n// Declare Guard Rate\\nlet guardRate = 0.5;\\nguardRate /= target.grd;\\n\\n// Return Damage\\nreturn damage * guardRate;\"","Critical":"","CriticalHitRateJS:func":"\"// Declare Constants\\nconst user = this.subject();\\nconst target = arguments[0];\\n\\n// Create Base Critical Rate\\nlet rate = this.subject().cri * (1 - target.cev);\\n\\n// Apply Notetags\\nconst note = this.item().note;\\nif (note.match(/<ALWAYS CRITICAL>/i)) {\\n    return 1;\\n}\\nif (note.match(/<SET CRITICAL RATE:[ ](\\\\d+)([%％])>/i)) {\\n    return Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL RATE:[ ](\\\\d+)([%％])>/i)) {\\n    rate *= Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL RATE:[ ]([\\\\+\\\\-]\\\\d+)([%％])>/i)) {\\n    rate += Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<JS CRITICAL RATE>\\\\s*([\\\\s\\\\S]*)\\\\s*<\\\\/JS CRITICAL RATE>/i)) {\\n    const code = String(RegExp.$1);\\n    try {\\n        eval(code);\\n    } catch (e) {\\n        if ($gameTemp.isPlaytest()) console.log(e);\\n    }\\n}\\n\\n// Apply LUK Buffs/Debuffs\\nconst lukStack = this.subject().buff(7);\\nrate *= 2 ** lukStack;\\n\\n// Return Rate\\nreturn rate;\"","CriticalHitMultiplier:func":"\"// Declare Constants\\nconst user = this.subject();\\nlet damage = arguments[0];\\nlet multiplier = 2.0;\\nlet bonusDamage = this.subject().luk * this.subject().cri;\\n\\n// Apply Notetags\\nconst note = this.item().note;\\nif (note.match(/<MODIFY CRITICAL MULTIPLIER:[ ](\\\\d+)([%％])>/i)) {\\n    multiplier = Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL MULTIPLIER:[ ]([\\\\+\\\\-]\\\\d+)([%％])>/i)) {\\n    multiplier += Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL BONUS DAMAGE:[ ](\\\\d+)([%％])>/i)) {\\n    bonusDamage *= Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL BONUS DAMAGE:[ ]([\\\\+\\\\-]\\\\d+)([%％])>/i)) {\\n    bonusDamage += bonusDamage * (RegExp.$1) / 100;\\n}\\nif (note.match(/<JS CRITICAL DAMAGE>\\\\s*([\\\\s\\\\S]*)\\\\s*<\\\\/JS CRITICAL DAMAGE>/i)) {\\n    const code = String(RegExp.$1);\\n    try {\\n        eval(code);\\n    } catch (e) {\\n        if ($gameTemp.isPlaytest()) console.log(e);\\n    }\\n}\\n\\n// Return Damage\\nreturn damage * multiplier + bonusDamage;\"","DamageStyles":"","DefaultDamageStyle:str":"Standard","DamageStyleList:arraystruct":"[\"{\\\"Name:str\\\":\\\"Standard\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Declare Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Replace Formula\\\\\\\\nlet formula = item.damage.formula;\\\\\\\\nif (SceneManager.isSceneBattle() && !this.isCertainHit()) {\\\\\\\\n    const fmt = 'Math.max(this.applyArmorModifiers(b, %1), 1)';\\\\\\\\n    formula = formula.replace(/b.def/g, fmt.format('b.def'));\\\\\\\\n    formula = formula.replace(/b.mdf/g, fmt.format('b.mdf'));\\\\\\\\n    formula = formula.replace(/b.agi/g, fmt.format('b.agi'));\\\\\\\\n    formula = formula.replace(/b.luk/g, fmt.format('b.luk'));\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nlet value = Math.max(eval(formula), 0);\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"return this.getItemDamageAmountTextOriginal();\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"Armor Scaling\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Declare Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Replace Formula\\\\\\\\nlet formula = item.damage.formula;\\\\\\\\nif (SceneManager.isSceneBattle() && !this.isCertainHit()) {\\\\\\\\n    const fmt = 'Math.max(this.applyArmorModifiers(b, %1), 1)';\\\\\\\\n    formula = formula.replace(/b.def/g, fmt.format('b.def'));\\\\\\\\n    formula = formula.replace(/b.mdf/g, fmt.format('b.mdf'));\\\\\\\\n    formula = formula.replace(/b.agi/g, fmt.format('b.agi'));\\\\\\\\n    formula = formula.replace(/b.luk/g, fmt.format('b.luk'));\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nlet value = Math.max(eval(formula), 0);\\\\\\\\n\\\\\\\\n// Apply Defender's Defense Parameter\\\\\\\\nif (this.isDamage() && !this.isCertainHit()) {\\\\\\\\n\\\\\\\\n    // Calculate Base Armor\\\\\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\n    armor = this.applyArmorModifiers(target, armor);\\\\\\\\n\\\\\\\\n    // Apply Armor to Damage\\\\\\\\n    if (armor >= 0) {\\\\\\\\n        value *= 100 / (100 + armor);\\\\\\\\n    } else {\\\\\\\\n        value *= 2 - (100 / (100 - armor));\\\\\\\\n    }\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"return this.getItemDamageAmountTextOriginal();\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"CT\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Multiplier\\\\\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Values\\\\\\\\nlet value = 0;\\\\\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = Math.max(this.applyArmorModifiers(target, armor), 0);\\\\\\\\nlet attackStat = 0;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    attackStat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    attackStat =  a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    attackStat =  a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    attackStat =  a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nattackStat = (attackStat * 1.75) + (level ** 2 / 45.5);\\\\\\\\nvalue = attackStat * 4;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value *= Math.max(256 - armor, 0) / 256;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value *= Math.max(102.4 - armor, 0) / 128;\\\\\\\\n}\\\\\\\\nvalue *= multiplier;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"D4\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Multiplier\\\\\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Values\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(target, armor);\\\\\\\\nlet stat = 0;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    stat = a.def;\\\\\\\\n    armor = 0;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    stat = a.mdf;\\\\\\\\n    armor = 0;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage \\\\\\\\nlet value = 1.5 * Math.max(2 * stat * multiplier - armor, 1) * multiplier / 5;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"DQ\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Multiplier\\\\\\\\nlet multiplier = Math.max(eval(item.damage.formula), 0);\\\\\\\\nif (this.isCertainHit()) {\\\\\\\\n    let value = multiplier * Math.max(a.atk, a.mat);\\\\\\\\n    return (isNaN(value) ? 0 : value) * sign;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Get Primary Stats\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(b, armor);\\\\\\\\nlet stat = 1;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    stat = a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    stat = a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Check for Recovery\\\\\\\\nif (this.isRecover()) {\\\\\\\\n    let value = stat * multiplier * sign;\\\\\\\\n    return isNaN(value) ? 0 : value;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nlet value = 0;\\\\\\\\nif (stat < ((2 + armor) / 2)) {\\\\\\\\n    // Plink Damage\\\\\\\\n    let baseline = Math.max(stat - ((12 * (armor - stat + 1)) / stat), 5);\\\\\\\\n    value = baseline / 3;\\\\\\\\n} else {\\\\\\\\n    // Normal Damage\\\\\\\\n    let baseline = Math.max(stat - (armor / 2), 1);\\\\\\\\n    value = baseline / 2;\\\\\\\\n}\\\\\\\\nvalue *= multiplier;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn isNaN(value) ? 0 : value;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"FF7\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Power\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare base Damage\\\\\\\\nlet baseDamage = 0;\\\\\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    baseDamage = a.atk + ((a.atk + level) / 32) * ((a.atk * level) / 32);\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    baseDamage = 6 * (a.mat + level);\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    baseDamage = 6 * (a.def + level);\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    baseDamage = 6 * (a.mdf + level);\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Final Damage\\\\\\\\nlet value = baseDamage;\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(target, armor);\\\\\\\\nif (this.isRecover()) {\\\\\\\\n    value += 22 * power;\\\\\\\\n} else {\\\\\\\\n    value = (power * Math.max(512 - armor, 1) * baseDamage) / (16 * 512);\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"FF8\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Power\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Damage\\\\\\\\nlet Value = 0;\\\\\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(target, armor);\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = a.atk ** 2 / 16 + a.atk;\\\\\\\\n    value *= Math.max(265 - armor, 1) / 256;\\\\\\\\n    value *= power / 16;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = a.mat + power;\\\\\\\\n    value *= Math.max(265 - armor, 1) / 4;\\\\\\\\n    value *= power / 256;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    value = (power + a.def) * power / 2;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    value = (power + a.mdf) * power / 2;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"FF9\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Damage Constant\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\nif (this.isCertainHit()) {\\\\\\\\n    return (isNaN(power) ? 0 : power) * sign;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Declare Main Stats\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(b, armor);\\\\\\\\nlet stat = 1;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    stat = a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    stat = a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Declare Base Damage\\\\\\\\nlet baseDamage = power;\\\\\\\\nif (this.isPhysical()) {\\\\\\\\n    baseDamage += stat;\\\\\\\\n}\\\\\\\\nif (this.isDamage() || this.isDrain()) {\\\\\\\\n    baseDamage -= armor;\\\\\\\\n    baseDamage = Math.max(1, baseDamage);\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Declare Bonus Damage\\\\\\\\nlet bonusDamage = stat + (((a.level || a.luk) + stat) / 8);\\\\\\\\n\\\\\\\\n// Declare Final Damage\\\\\\\\nlet value = baseDamage * bonusDamage * sign;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn isNaN(value) ? 0 : value;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"FF10\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Damage Constant\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\nif (this.isCertainHit()) {\\\\\\\\n    return (isNaN(power) ? 0 : power) * sign;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Create Damage Offense Value\\\\\\\\nlet value = power;\\\\\\\\n\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = (((a.atk ** 3) / 32) + 32) * power / 16;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = power * ((a.mat ** 2 / 6) + power) / 4;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    value = power * ((a.def + power) / 2);\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    value = power * ((a.mdf + power) / 2);\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Apply Damage Defense Value\\\\\\\\nif (this.isDamage() || this.isDrain()) {\\\\\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\n    armor = this.applyArmorModifiers(b, armor);\\\\\\\\n    armor = Math.max(armor, 1);\\\\\\\\n    value *= ((((armor - 280.4) ** 2) / 110) / 16) / 730;\\\\\\\\n    value *= (730 - (armor * 51 - (armor ** 2) / 11) / 10) / 730;\\\\\\\\n} else if (this.isRecover()) {\\\\\\\\n    value *= -1;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn isNaN(value) ? 0 : value;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"MK\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Multiplier\\\\\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Values\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(target, armor);\\\\\\\\nconst denominator = Math.max(200 + armor, 1);\\\\\\\\n\\\\\\\\n// Calculate Damage \\\\\\\\nlet value = 0;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = 200 * a.atk / denominator;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = 200 * a.mat / denominator;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    value = 200 * a.def / 200;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    value = 200 * a.mdf / 200;\\\\\\\\n}\\\\\\\\nvalue *= multiplier;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"MOBA\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Damage Value\\\\\\\\nlet value = Math.max(eval(item.damage.formula), 0) * sign;\\\\\\\\n\\\\\\\\n// Apply Attacker's Offense Parameter\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value *= a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value *= a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    value *= a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    value *= a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Apply Defender's Defense Parameter\\\\\\\\nif (this.isDamage() && !this.isCertainHit()) {\\\\\\\\n\\\\\\\\n    // Calculate Base Armor\\\\\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\n    armor = this.applyArmorModifiers(target, armor);\\\\\\\\n\\\\\\\\n    // Apply Armor to Damage\\\\\\\\n    if (armor >= 0) {\\\\\\\\n        value *= 100 / (100 + armor);\\\\\\\\n    } else {\\\\\\\\n        value *= 2 - (100 / (100 - armor));\\\\\\\\n    }\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn isNaN(value) ? 0 : value;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"PKMN\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Power\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Values\\\\\\\\nlet value = 0;\\\\\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = Math.max(this.applyArmorModifiers(target, armor), 0);\\\\\\\\nlet attackStat = 0;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    attackStat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    attackStat =  a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    attackStat =  a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    attackStat =  a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nvalue = (((((2 * level) / 5) + 2) * power * (attackStat / armor)) / 50) + 2;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\"]"}
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Settings pertaining to damage calculations.
 * @default {"ActionSpeed":"","AllowRandomSpeed:eval":"false","CalcActionSpeedJS:func":"\"// Declare Constants\\nconst agi = this.subject().agi;\\n\\n// Create Speed\\nlet speed = agi;\\nif (this.allowRandomSpeed()) {\\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\\n}\\nif (this.item()) {\\n    speed += this.item().speed;\\n}\\nif (this.isAttack()) {\\n    speed += this.subject().attackSpeed();\\n}\\n\\n// Return Speed\\nreturn speed;\"","BaseTroop":"","BaseTroopIDs:arraynum":"[\"1\"]","CommonEvents":"","BattleStartEvent:num":"0","BattleEndEvent:num":"0","VictoryEvent:num":"0","DefeatEvent:num":"0","EscapeSuccessEvent:num":"0","EscapeFailEvent:num":"0","Escape":"","CalcEscapeRatioJS:func":"\"// Calculate Escape Ratio\\nlet ratio = 0.5;\\nratio *= $gameParty.agility();\\nratio /= $gameTroop.agility();\\n\\n// Return Ratio\\nreturn ratio;\"","CalcEscapeRaiseJS:func":"\"// Calculate Escape Ratio\\nlet value = 0.1;\\nvalue += $gameParty.aliveMembers().length;\\n\\n// Return Value\\nreturn value;\"","BattleJS":"","PreStartBattleJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostStartBattleJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","BattleVictoryJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","EscapeSuccessJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","EscapeFailureJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","BattleDefeatJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PreEndBattleJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostEndBattleJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","TurnJS":"","PreStartTurnJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostStartTurnJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PreEndTurnJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostEndTurnJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PreRegenerateJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostRegenerateJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","ActionJS":"","PreStartActionJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst user = this.subject();\\nconst target = user;\\nconst a = user;\\nconst b = user;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\"","PostStartActionJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst user = this.subject();\\nconst target = user;\\nconst a = user;\\nconst b = user;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\"","PreApplyJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst target = arguments[1];\\nconst user = this.subject();\\nconst a = user;\\nconst b = target;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\\n// Return Value\\nreturn value;\"","PreDamageJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst target = arguments[1];\\nconst user = this.subject();\\nconst a = user;\\nconst b = target;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\\n// Return Value\\nreturn value;\"","PostDamageJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst target = arguments[1];\\nconst user = this.subject();\\nconst a = user;\\nconst b = target;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\\n// Return Value\\nreturn value;\"","PostApplyJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst target = arguments[1];\\nconst user = this.subject();\\nconst a = user;\\nconst b = target;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\\n// Return Value\\nreturn value;\"","PreEndActionJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst user = this.subject();\\nconst target = user;\\nconst a = user;\\nconst b = user;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\"","PostEndActionJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst user = this.subject();\\nconst target = user;\\nconst a = user;\\nconst b = user;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\""}
 *
 * @param CmdWindows
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param BattleLayout:struct
 * @text Battle Layout Settings
 * @type struct<BattleLayout>
 * @desc Settings that adjust how the battle layout appears.
 * @default {"Style:str":"default","ListStyle":"","ShowFacesListStyle:eval":"true","XPStyle":"","XPActorCommandLines:num":"4","XPActorDefaultHeight:num":"64","XPSpriteYLocation:str":"name","PotraitStyle":"","ShowPortraits:eval":"true","PortraitScale:num":"0.5","BorderStyle":"","SkillItemBorderCols:num":"1","ShowPortraitsBorderStyle:eval":"true","PortraitScaleBorderStyle:num":"1.25","SkillItemWindows":"","SkillItemMiddleLayout:eval":"false","SkillItemStandardCols:num":"2"}
 *
 * @param BattleLog:struct
 * @text Battle Log Settings
 * @type struct<BattleLog>
 * @desc Settings that adjust how Window_BattleLog behaves.
 * @default {"General":"","BackColor:str":"#000000","MaxLines:num":"10","MessageWait:num":"16","TextAlign:str":"center","BattleLogRectJS:func":"\"const wx = 0;\\nconst wy = 0;\\nconst ww = Graphics.boxWidth;\\nconst wh = this.calcWindowHeight(10, false);\\nreturn new Rectangle(wx, wy, ww, wh);\"","StartTurn":"","StartTurnShow:eval":"true","StartTurnMsg:str":"Turn %1","StartTurnWait:num":"40","DisplayAction":"","ActionCenteredName:eval":"true","ActionSkillMsg1:eval":"false","ActionSkillMsg2:eval":"true","ActionItemMsg:eval":"false","ActionChanges":"","ShowCounter:eval":"true","ShowReflect:eval":"true","ShowSubstitute:eval":"true","ActionResults":"","ShowFailure:eval":"false","ShowCritical:eval":"false","ShowMissEvasion:eval":"false","ShowHpDmg:eval":"false","ShowMpDmg:eval":"false","ShowTpDmg:eval":"false","DisplayStates":"","ShowAddedState:eval":"false","ShowRemovedState:eval":"false","ShowCurrentState:eval":"false","ShowAddedBuff:eval":"false","ShowAddedDebuff:eval":"false","ShowRemovedBuff:eval":"false"}
 *
 * @param PartyCmd:struct
 * @text Party Command Window
 * @type struct<PartyCmd>
 * @desc Settings that alter the Party Command Window in battle.
 * @default {"Cmd":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","CmdIconFight:num":"76","CommandAddAutoBattle:eval":"true","CmdIconAutoBattle:num":"78","CmdTextAutoBattle:str":"Auto","CommandAddOptions:eval":"true","CmdIconOptions:num":"83","ActiveTpbOptionsMessage:str":"Options Menu queued after action is complete.","CmdIconEscape:num":"82","Access":"","SkipPartyCmd:eval":"true","DisablePartyCmd:eval":"false","HelpWindow":"","HelpFight:str":"Select actions to fight.","HelpAutoBattle:str":"Sets party to Auto Battle mode.","HelpOptions:str":"Opens up the Options Menu.","HelpEscape:str":"Attempt to escape the battle."}
 *
 * @param ActorCmd:struct
 * @text Actor Command Window
 * @type struct<ActorCmd>
 * @desc Settings that alter the Actor Command Window in battle.
 * @default {"Cmd":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","CmdIconItem:num":"176","IconStypeNorm:num":"78","IconStypeMagic:num":"79","BattleCmd":"","BattleCmdList:arraystr":"[\"attack\",\"skills\",\"guard\",\"item\",\"escape\"]","HelpWindow":"","HelpSkillType:str":"Opens up a list of skills under the \\C[16]%1\\C[0] category.","HelpItem:str":"Opens up a list of items that you can use.","HelpEscape:str":"Attempt to escape the battle.","HelpAutoBattle:str":"Automatically choose an action suitable for combat."}
 *
 * @param VisualBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Actor:struct
 * @text Actor Battler Settings
 * @type struct<Actor>
 * @desc Settings that alter various properties for actors.
 * @default {"Flinch":"","FlinchDistanceX:num":"12","FlinchDistanceY:num":"0","FlinchDuration:num":"6","SvBattlers":"","AnchorX:num":"0.5","AnchorY:num":"1.0","OffsetX:num":"0","OffsetY:num":"0","MotionSpeed:num":"12","Shadow:eval":"true","SmoothImage:eval":"false","HomePosJS:func":"\"// Declare Constants\\nconst sprite = this;\\nconst actor = this._actor;\\nconst index = arguments[0];\\n\\n// Make Calculations\\nlet x = Math.round((Graphics.width / 2) + 192)\\nx -= Math.floor((Graphics.width - Graphics.boxWidth) / 2);\\nx += index * 32;\\nlet y = (Graphics.height - 200) - ($gameParty.maxBattleMembers() * 48);\\ny -= Math.floor((Graphics.height - Graphics.boxHeight) / 2);\\ny += index * 48;\\n\\n// Home Position Offsets\\nconst offsetNote = /<SIDEVIEW HOME OFFSET:[ ]([\\\\+\\\\-]\\\\d+),[ ]([\\\\+\\\\-]\\\\d+)>/i;\\nconst xOffsets = actor.traitObjects().map((obj) => (obj && obj.note.match(offsetNote) ? Number(RegExp.$1) : 0));\\nconst yOffsets = actor.traitObjects().map((obj) => (obj && obj.note.match(offsetNote) ? Number(RegExp.$2) : 0));\\nx = xOffsets.reduce((r, offset) => r + offset, x);\\ny = yOffsets.reduce((r, offset) => r + offset, y);\\n\\n// Set Home Position\\nthis.setHome(x, y);\""}
 *
 * @param Enemy:struct
 * @text Enemy Battler Settings
 * @type struct<Enemy>
 * @desc Settings that alter various properties for enemies.
 * @default {"Visual":"","AttackAnimation:num":"1","EmergeText:eval":"false","OffsetX:num":"0","OffsetY:num":"0","SmoothImage:eval":"true","SelectWindow":"","FrontViewSelect:eval":"false","SideviewSelect:eval":"true","NameFontSize:num":"22","SvBattlers":"","AllowCollapse:eval":"false","AnchorX:num":"0.5","AnchorY:num":"1.0","MotionIdle:str":"walk","Shadow:eval":"true","Width:num":"64","Height:num":"64","WtypeId:num":"0"}
 *
 * @param HpGauge:struct
 * @text HP Gauge Settings
 * @type struct<HpGauge>
 * @desc Settings that adjust the visual HP Gauge displayed in battle.
 * @default {"Display":"","ShowActorGauge:eval":"false","ShowEnemyGauge:eval":"true","RequiresDefeat:eval":"false","BTestBypass:eval":"true","Settings":"","AnchorX:num":"0.5","AnchorY:num":"1.0","Scale:num":"0.5","OffsetX:num":"0","OffsetY:num":"-3","Options":"","AddHpGaugeOption:eval":"true","AdjustRect:eval":"true","Name:str":"Show HP Gauge"}
 *
 * @param ActionSequence:struct
 * @text Action Sequence Settings
 * @type struct<ActionSequence>
 * @desc Settings that adjust how certain Action Sequences work.
 * @default {"AutoSequences":"","AutoMeleeSolo:eval":"true","AutoMeleeAoE:eval":"true","CastAnimations":"","CastCertain:num":"120","CastPhysical:num":"52","CastMagical:num":"51","CounterReflection":"","CounterPlayback:eval":"true","ReflectAnimation:num":"1","ReflectPlayback:eval":"true","Stepping":"","MeleeDistance:num":"24","StepDistanceX:num":"48","StepDistanceY:num":"0","StepDuration:num":"12"}
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
 * Auto Battle Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutoBattle:
 *
 * @param BattleDisplay
 * @text Battle Display
 *
 * @param AutoBattleMsg:str
 * @text Message
 * @parent BattleDisplay
 * @desc Message that's displayed when Auto Battle is on.
 * Text codes allowed. %1 - OK button, %2 - Cancel button
 * @default Press %1 or %2 to stop Auto Battle
 *
 * @param AutoBattleOK:str
 * @text OK Button
 * @parent BattleDisplay
 * @desc Text used to represent the OK button.
 * If VisuMZ_0_CoreEngine is present, ignore this.
 * @default OK
 *
 * @param AutoBattleCancel:str
 * @text Cancel Button
 * @parent BattleDisplay
 * @desc Text used to represent the Cancel button.
 * If VisuMZ_0_CoreEngine is present, ignore this.
 * @default Cancel
 *
 * @param AutoBattleBgType:num
 * @text Background Type
 * @parent BattleDisplay
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for Auto Battle window.
 * @default 1
 *
 * @param AutoBattleRect:func
 * @text JS: X, Y, W, H
 * @parent BattleDisplay
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.width;\nconst height = this.calcWindowHeight(1, false);\nconst x = 0;\nconst y = (Graphics.height - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param Options
 *
 * @param AddOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the Auto Battle options to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param StartName:str
 * @text Startup Name
 * @parent Options
 * @desc Command name of the option.
 * @default Auto Battle Start
 *
 * @param StyleName:str
 * @text Style Name
 * @parent Options
 * @desc Command name of the option.
 * @default Auto Battle Style
 *
 * @param StyleOFF:str
 * @text OFF
 * @parent StyleName:str
 * @desc Text displayed when Auto Battle Style is OFF.
 * @default Attack
 *
 * @param StyleON:str
 * @text ON
 * @parent StyleName:str
 * @desc Text displayed when Auto Battle Style is ON.
 * @default Skills
 *
 */
/* ----------------------------------------------------------------------------
 * Damage Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Damage:
 *
 * @param Cap
 * @text Damage Cap
 *
 * @param EnableDamageCap:eval
 * @text Enable Damage Cap?
 * @parent Cap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Put a maximum hard damage cap on how far damage can go?
 * This can be broken through the usage of notetags.
 * @default false
 *
 * @param DefaultHardCap:num
 * @text Default Hard Cap
 * @parent EnableDamageCap:eval
 * @type number
 * @min 1
 * @desc The default hard damage cap used before applying damage.
 * @default 9999
 *
 * @param EnableSoftCap:eval
 * @text Enable Soft Cap?
 * @parent Cap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Soft caps ease in the damage values leading up to the 
 * hard damage cap. Requires hard Damage Cap enabled.
 * @default false
 *
 * @param DefaultSoftCap:num
 * @text Base Soft Cap Rate
 * @parent EnableSoftCap:eval
 * @desc The default soft damage cap used before applying damage.
 * @default 0.80
 *
 * @param DefaultSoftScaler:num
 * @text Soft Scale Constant
 * @parent EnableSoftCap:eval
 * @desc The default soft damage cap used before applying damage.
 * @default 0.1275
 *
 * @param Popups
 *
 * @param PopupDuration:num
 * @text Popup Duration
 * @parent Popups
 * @type number
 * @min 1
 * @desc Adjusts how many frames a popup stays visible.
 * @default 128
 *
 * @param NewPopupBottom:eval
 * @text Newest Popups Bottom
 * @parent Popups
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Puts the newest popups at the bottom.
 * @default true
 *
 * @param PopupShiftX:num
 * @text Shift X
 * @parent Popups
 * @desc Sets how much to shift the sprites by horizontally.
 * @default 8
 *
 * @param PopupShiftY:num
 * @text Shift Y
 * @parent Popups
 * @desc Sets how much to shift the sprites by vertically.
 * @default -28
 *
 * @param hpDamageFmt:str
 * @text HP Damage Format
 * @parent Popups
 * @desc Determines HP damage format for popup.
 * %1 - Value, %2 - HP Text
 * @default -%1
 *
 * @param hpHealingFmt:str
 * @text HP Healing Format
 * @parent Popups
 * @desc Determines HP healing format for popup.
 * %1 - Value, %2 - HP Text
 * @default +%1
 *
 * @param mpDamageFmt:str
 * @text MP Damage Format
 * @parent Popups
 * @desc Determines MP damage format for popup.
 * %1 - Value, %2 - MP Text
 * @default -%1 %2
 *
 * @param mpHealingFmt:str
 * @text MP Healing Format
 * @parent Popups
 * @desc Determines MP healing format for popup.
 * %1 - Value, %2 - MP Text
 * @default +%1 %2
 *
 * @param CriticalColor:eval
 * @text Critical Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 *
 * @param CriticalDuration:num
 * @text Critical Duration
 * @parent Popups
 * @type number
 * @min 1
 * @desc Adjusts how many frames a the flash lasts.
 * @default 128
 *
 * @param Formulas
 *
 * @param OverallFormulaJS:func
 * @text JS: Overall Formula
 * @parent Formulas
 * @type note
 * @desc The overall formula used when calculating damage.
 * @default "// Declare Constants\nconst target = arguments[0];\nconst critical = arguments[1];\nconst item = this.item();\n\n// Get Base Damage\nconst baseValue = this.evalDamageFormula(target);\n\n// Calculate Element Modifiers\nlet value = baseValue * this.calcElementRate(target);\n\n// Calculate Physical and Magical Modifiers\nif (this.isPhysical()) {\n    value *= target.pdr;\n}\nif (this.isMagical()) {\n    value *= target.mdr;\n}\n\n// Apply Healing Modifiers\nif (baseValue < 0) {\n    value *= target.rec;\n}\n\n// Apply Critical Modifiers\nif (critical) {\n    value = this.applyCritical(value);\n}\n\n// Apply Variance and Guard Modifiers\nvalue = this.applyVariance(value, item.damage.variance);\nvalue = this.applyGuard(value, target);\n\n// Finalize Damage\nvalue = Math.round(value);\nreturn value;"
 *
 * @param VarianceFormulaJS:func
 * @text JS: Variance Formula
 * @parent Formulas
 * @type note
 * @desc The formula used when damage variance.
 * @default "// Declare Constants\nconst damage = arguments[0];\nconst variance = arguments[1];\n\n// Calculate Variance\nconst amp = Math.floor(Math.max((Math.abs(damage) * variance) / 100, 0));\nconst v = Math.randomInt(amp + 1) + Math.randomInt(amp + 1) - amp;\n\n// Return Damage\nreturn damage >= 0 ? damage + v : damage - v;"
 *
 * @param GuardFormulaJS:func
 * @text JS: Guard Formula
 * @parent Formulas
 * @type note
 * @desc The formula used when damage is guarded.
 * @default "// Declare Constants\nconst damage = arguments[0];\nconst target = arguments[1];\n\n// Return Damage Early\nconst note = this.item().note;\nif (note.match(/<UNBLOCKABLE>/i)) return damage;\nif (!target.isGuard()) return damage;\nif (damage < 0) return damage;\n\n// Declare Guard Rate\nlet guardRate = 0.5;\nguardRate /= target.grd;\n\n// Return Damage\nreturn damage * guardRate;"
 *
 * @param Critical
 * @text Critical Hits
 *
 * @param CriticalHitRateJS:func
 * @text JS: Rate Formula
 * @parent Critical
 * @type note
 * @desc The formula used to calculate Critical Hit Rates.
 * @default "// Declare Constants\nconst user = this.subject();\nconst target = arguments[0];\n\n// Create Base Critical Rate\nlet rate = this.subject().cri * (1 - target.cev);\n\n// Apply Notetags\nconst note = this.item().note;\nif (note.match(/<ALWAYS CRITICAL>/i)) {\n    return 1;\n}\nif (note.match(/<SET CRITICAL RATE:[ ](\\d+)([%％])>/i)) {\n    return Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL RATE:[ ](\\d+)([%％])>/i)) {\n    rate *= Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL RATE:[ ]([\\+\\-]\\d+)([%％])>/i)) {\n    rate += Number(RegExp.$1) / 100;\n}\nif (note.match(/<JS CRITICAL RATE>\\s*([\\s\\S]*)\\s*<\\/JS CRITICAL RATE>/i)) {\n    const code = String(RegExp.$1);\n    try {\n        eval(code);\n    } catch (e) {\n        if ($gameTemp.isPlaytest()) console.log(e);\n    }\n}\n\n// Apply LUK Buffs/Debuffs\nconst lukStack = this.subject().buff(7);\nrate *= 2 ** lukStack;\n\n// Return Rate\nreturn rate;"
 *
 * @param CriticalHitMultiplier:func
 * @text JS: Damage Formula
 * @parent Critical
 * @type note
 * @desc The formula used to calculate Critical Hit Damage modification.
 * @default "// Declare Constants\nconst user = this.subject();\nlet damage = arguments[0];\nlet multiplier = 2.0;\nlet bonusDamage = this.subject().luk * this.subject().cri;\n\n// Apply Notetags\nconst note = this.item().note;\nif (note.match(/<MODIFY CRITICAL MULTIPLIER:[ ](\\d+)([%％])>/i)) {\n    multiplier = Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL MULTIPLIER:[ ]([\\+\\-]\\d+)([%％])>/i)) {\n    multiplier += Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL BONUS DAMAGE:[ ](\\d+)([%％])>/i)) {\n    bonusDamage *= Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL BONUS DAMAGE:[ ]([\\+\\-]\\d+)([%％])>/i)) {\n    bonusDamage += bonusDamage * (RegExp.$1) / 100;\n}\nif (note.match(/<JS CRITICAL DAMAGE>\\s*([\\s\\S]*)\\s*<\\/JS CRITICAL DAMAGE>/i)) {\n    const code = String(RegExp.$1);\n    try {\n        eval(code);\n    } catch (e) {\n        if ($gameTemp.isPlaytest()) console.log(e);\n    }\n}\n\n// Return Damage\nreturn damage * multiplier + bonusDamage;"
 *
 * @param DamageStyles
 * @text Damage Styles
 *
 * @param DefaultDamageStyle:str
 * @text Default Style
 * @parent DamageStyles
 * @desc Which Damage Style do you want to set as default?
 * Use 'Manual' to not use any styles at all.
 * @default Standard
 *
 * @param DamageStyleList:arraystruct
 * @text Style List
 * @parent DamageStyles
 * @type struct<DamageStyle>[]
 * @desc A list of the damage styles available.
 * These are used to calculate base damage.
 * @default ["{\"Name:str\":\"Standard\",\"Formula:func\":\"\\\"// Declare Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Replace Formula\\\\nlet formula = item.damage.formula;\\\\nif (SceneManager.isSceneBattle() && !this.isCertainHit()) {\\\\n    const fmt = 'Math.max(this.applyArmorModifiers(b, %1), 1)';\\\\n    formula = formula.replace(/b.def/g, fmt.format('b.def'));\\\\n    formula = formula.replace(/b.mdf/g, fmt.format('b.mdf'));\\\\n    formula = formula.replace(/b.agi/g, fmt.format('b.agi'));\\\\n    formula = formula.replace(/b.luk/g, fmt.format('b.luk'));\\\\n}\\\\n\\\\n// Calculate Damage\\\\nlet value = Math.max(eval(formula), 0);\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"return this.getItemDamageAmountTextOriginal();\\\"\"}","{\"Name:str\":\"Armor Scaling\",\"Formula:func\":\"\\\"// Declare Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Replace Formula\\\\nlet formula = item.damage.formula;\\\\nif (SceneManager.isSceneBattle() && !this.isCertainHit()) {\\\\n    const fmt = 'Math.max(this.applyArmorModifiers(b, %1), 1)';\\\\n    formula = formula.replace(/b.def/g, fmt.format('b.def'));\\\\n    formula = formula.replace(/b.mdf/g, fmt.format('b.mdf'));\\\\n    formula = formula.replace(/b.agi/g, fmt.format('b.agi'));\\\\n    formula = formula.replace(/b.luk/g, fmt.format('b.luk'));\\\\n}\\\\n\\\\n// Calculate Damage\\\\nlet value = Math.max(eval(formula), 0);\\\\n\\\\n// Apply Defender's Defense Parameter\\\\nif (this.isDamage() && !this.isCertainHit()) {\\\\n\\\\n    // Calculate Base Armor\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\n    armor = this.applyArmorModifiers(target, armor);\\\\n\\\\n    // Apply Armor to Damage\\\\n    if (armor >= 0) {\\\\n        value *= 100 / (100 + armor);\\\\n    } else {\\\\n        value *= 2 - (100 / (100 - armor));\\\\n    }\\\\n}\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"return this.getItemDamageAmountTextOriginal();\\\"\"}","{\"Name:str\":\"CT\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Multiplier\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Values\\\\nlet value = 0;\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = Math.max(this.applyArmorModifiers(target, armor), 0);\\\\nlet attackStat = 0;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    attackStat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    attackStat =  a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    attackStat =  a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    attackStat =  a.mdf;\\\\n}\\\\n\\\\n// Calculate Damage\\\\nattackStat = (attackStat * 1.75) + (level ** 2 / 45.5);\\\\nvalue = attackStat * 4;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value *= Math.max(256 - armor, 0) / 256;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value *= Math.max(102.4 - armor, 0) / 128;\\\\n}\\\\nvalue *= multiplier;\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"D4\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Multiplier\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Values\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(target, armor);\\\\nlet stat = 0;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    stat = a.def;\\\\n    armor = 0;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    stat = a.mdf;\\\\n    armor = 0;\\\\n}\\\\n\\\\n// Calculate Damage \\\\nlet value = 1.5 * Math.max(2 * stat * multiplier - armor, 1) * multiplier / 5;\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"DQ\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Multiplier\\\\nlet multiplier = Math.max(eval(item.damage.formula), 0);\\\\nif (this.isCertainHit()) {\\\\n    let value = multiplier * Math.max(a.atk, a.mat);\\\\n    return (isNaN(value) ? 0 : value) * sign;\\\\n}\\\\n\\\\n// Get Primary Stats\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(b, armor);\\\\nlet stat = 1;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    stat = a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    stat = a.mdf;\\\\n}\\\\n\\\\n// Check for Recovery\\\\nif (this.isRecover()) {\\\\n    let value = stat * multiplier * sign;\\\\n    return isNaN(value) ? 0 : value;\\\\n}\\\\n\\\\n// Calculate Damage\\\\nlet value = 0;\\\\nif (stat < ((2 + armor) / 2)) {\\\\n    // Plink Damage\\\\n    let baseline = Math.max(stat - ((12 * (armor - stat + 1)) / stat), 5);\\\\n    value = baseline / 3;\\\\n} else {\\\\n    // Normal Damage\\\\n    let baseline = Math.max(stat - (armor / 2), 1);\\\\n    value = baseline / 2;\\\\n}\\\\nvalue *= multiplier;\\\\n\\\\n// Return Value\\\\nreturn isNaN(value) ? 0 : value;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"FF7\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Power\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare base Damage\\\\nlet baseDamage = 0;\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    baseDamage = a.atk + ((a.atk + level) / 32) * ((a.atk * level) / 32);\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    baseDamage = 6 * (a.mat + level);\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    baseDamage = 6 * (a.def + level);\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    baseDamage = 6 * (a.mdf + level);\\\\n}\\\\n\\\\n// Calculate Final Damage\\\\nlet value = baseDamage;\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(target, armor);\\\\nif (this.isRecover()) {\\\\n    value += 22 * power;\\\\n} else {\\\\n    value = (power * Math.max(512 - armor, 1) * baseDamage) / (16 * 512);\\\\n}\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"FF8\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Power\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Damage\\\\nlet Value = 0;\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(target, armor);\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value = a.atk ** 2 / 16 + a.atk;\\\\n    value *= Math.max(265 - armor, 1) / 256;\\\\n    value *= power / 16;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value = a.mat + power;\\\\n    value *= Math.max(265 - armor, 1) / 4;\\\\n    value *= power / 256;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    value = (power + a.def) * power / 2;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    value = (power + a.mdf) * power / 2;\\\\n}\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"FF9\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Damage Constant\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\nif (this.isCertainHit()) {\\\\n    return (isNaN(power) ? 0 : power) * sign;\\\\n}\\\\n\\\\n// Declare Main Stats\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(b, armor);\\\\nlet stat = 1;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    stat = a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    stat = a.mdf;\\\\n}\\\\n\\\\n// Declare Base Damage\\\\nlet baseDamage = power;\\\\nif (this.isPhysical()) {\\\\n    baseDamage += stat;\\\\n}\\\\nif (this.isDamage() || this.isDrain()) {\\\\n    baseDamage -= armor;\\\\n    baseDamage = Math.max(1, baseDamage);\\\\n}\\\\n\\\\n// Declare Bonus Damage\\\\nlet bonusDamage = stat + (((a.level || a.luk) + stat) / 8);\\\\n\\\\n// Declare Final Damage\\\\nlet value = baseDamage * bonusDamage * sign;\\\\n\\\\n// Return Value\\\\nreturn isNaN(value) ? 0 : value;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"FF10\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Damage Constant\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\nif (this.isCertainHit()) {\\\\n    return (isNaN(power) ? 0 : power) * sign;\\\\n}\\\\n\\\\n// Create Damage Offense Value\\\\nlet value = power;\\\\n\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value = (((a.atk ** 3) / 32) + 32) * power / 16;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value = power * ((a.mat ** 2 / 6) + power) / 4;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    value = power * ((a.def + power) / 2);\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    value = power * ((a.mdf + power) / 2);\\\\n}\\\\n\\\\n// Apply Damage Defense Value\\\\nif (this.isDamage() || this.isDrain()) {\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\n    armor = this.applyArmorModifiers(b, armor);\\\\n    armor = Math.max(armor, 1);\\\\n    value *= ((((armor - 280.4) ** 2) / 110) / 16) / 730;\\\\n    value *= (730 - (armor * 51 - (armor ** 2) / 11) / 10) / 730;\\\\n} else if (this.isRecover()) {\\\\n    value *= -1;\\\\n}\\\\n\\\\n// Return Value\\\\nreturn isNaN(value) ? 0 : value;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"MK\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Multiplier\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Values\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(target, armor);\\\\nconst denominator = Math.max(200 + armor, 1);\\\\n\\\\n// Calculate Damage \\\\nlet value = 0;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value = 200 * a.atk / denominator;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value = 200 * a.mat / denominator;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    value = 200 * a.def / 200;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    value = 200 * a.mdf / 200;\\\\n}\\\\nvalue *= multiplier;\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"MOBA\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Damage Value\\\\nlet value = Math.max(eval(item.damage.formula), 0) * sign;\\\\n\\\\n// Apply Attacker's Offense Parameter\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value *= a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value *= a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    value *= a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    value *= a.mdf;\\\\n}\\\\n\\\\n// Apply Defender's Defense Parameter\\\\nif (this.isDamage() && !this.isCertainHit()) {\\\\n\\\\n    // Calculate Base Armor\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\n    armor = this.applyArmorModifiers(target, armor);\\\\n\\\\n    // Apply Armor to Damage\\\\n    if (armor >= 0) {\\\\n        value *= 100 / (100 + armor);\\\\n    } else {\\\\n        value *= 2 - (100 / (100 - armor));\\\\n    }\\\\n}\\\\n\\\\n// Return Value\\\\nreturn isNaN(value) ? 0 : value;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"PKMN\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Power\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Values\\\\nlet value = 0;\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = Math.max(this.applyArmorModifiers(target, armor), 0);\\\\nlet attackStat = 0;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    attackStat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    attackStat =  a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    attackStat =  a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    attackStat =  a.mdf;\\\\n}\\\\n\\\\n// Calculate Damage\\\\nvalue = (((((2 * level) / 5) + 2) * power * (attackStat / armor)) / 50) + 2;\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}"]
 *
 */
/* ----------------------------------------------------------------------------
 * Damage Formula Style
 * ----------------------------------------------------------------------------
 */
/*~struct~DamageStyle:
 *
 * @param Name:str
 * @text Name
 * @desc Name of this Damage Style.
 * Used for notetags and such.
 * @default Untitled
 *
 * @param Formula:func
 * @text JS: Formula
 * @parent Name:str
 * @type note
 * @desc The base formula for this Damage Style.
 * @default "// Define Constants\nconst item = this.item();\nconst a = this.subject();\nconst b = target;\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\n\n// Create Damage Value\nlet value = Math.max(eval(item.damage.formula), 0) * sign;\n\n// Return Value\nreturn isNaN(value) ? 0 : value;"
 *
 * @param ItemsEquipsCore
 * @text Items & Equips Core
 *
 * @param DamageType
 * @text Damage Label
 * @parent ItemsEquipsCore
 *
 * @param DamageType1:str
 * @text HP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage Multiplier
 *
 * @param DamageType2:str
 * @text MP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage Multiplier
 *
 * @param DamageType3:str
 * @text HP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType4:str
 * @text MP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType5:str
 * @text HP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Drain Multiplier
 *
 * @param DamageType6:str
 * @text MP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Drain Multiplier
 *
 * @param DamageDisplay:func
 * @text JS: Damage Display
 * @parent ItemsEquipsCore
 * @type note
 * @desc Code used the data displayed for this category.
 * @default "// Define Constants\nconst item = this._item;\nconst formula = item.damage.formula;\nconst a = this._tempActorA;\nconst b = this._tempActorB;\nconst user = a;\nconst target = b;\n\n// Return Value\ntry {\n    const value = Math.max(eval(formula), 0);\n    return '%1%'.format(Math.round(value * 100));\n} catch (e) {\n    if ($gameTemp.isPlaytest()) {\n        console.log('Damage Formula Error for %1'.format(this._item.name));\n    }\n    return '?????';\n}"
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param ActionSpeed
 * @text Action Speed
 *
 * @param AllowRandomSpeed:eval
 * @text Allow Random Speed?
 * @parent ActionSpeed
 * @type boolean
 * @on Allow
 * @off Disable
 * @desc Allow speed to be randomized base off the user's AGI?
 * @default false
 *
 * @param CalcActionSpeedJS:func
 * @text JS: Calculate
 * @parent ActionSpeed
 * @type note
 * @desc Code used to calculate action speed.
 * @default "// Declare Constants\nconst agi = this.subject().agi;\n\n// Create Speed\nlet speed = agi;\nif (this.allowRandomSpeed()) {\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\n}\nif (this.item()) {\n    speed += this.item().speed;\n}\nif (this.isAttack()) {\n    speed += this.subject().attackSpeed();\n}\n\n// Return Speed\nreturn speed;"
 *
 * @param BaseTroop
 * @text Base Troop
 *
 * @param BaseTroopIDs:arraynum
 * @text Base Troop ID's
 * @parent BaseTroop
 * @type troop[]
 * @desc Select the Troop ID(s) to duplicate page events from for all other troops.
 * @default ["1"]
 *
 * @param CommonEvents
 * @text Common Events
 *
 * @param BattleStartEvent:num
 * @text Pre-Battle Event
 * @parent CommonEvents
 * @type common_event
 * @desc Common Event to run before each battle.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param BattleEndEvent:num
 * @text Post-Battle Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run after each battle.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param VictoryEvent:num
 * @text Victory Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run upon victory.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param DefeatEvent:num
 * @text Defeat Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run upon defeat.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param EscapeSuccessEvent:num
 * @text Escape Success Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run upon escape success.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param EscapeFailEvent:num
 * @text Escape Fail Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run upon escape failure.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param Escape
 *
 * @param CalcEscapeRatioJS:func
 * @text JS: Calc Escape Ratio
 * @parent Escape
 * @type note
 * @desc Code used to calculate the escape success ratio.
 * @default "// Calculate Escape Ratio\nlet ratio = 0.5;\nratio *= $gameParty.agility();\nratio /= $gameTroop.agility();\n\n// Return Ratio\nreturn ratio;"
 *
 * @param CalcEscapeRaiseJS:func
 * @text JS: Calc Escape Raise
 * @parent Escape
 * @type note
 * @desc Code used to calculate how much the escape success ratio raises upon each failure.
 * @default "// Calculate Escape Ratio\nlet value = 0.1;\nvalue += $gameParty.aliveMembers().length;\n\n// Return Value\nreturn value;"
 *
 * @param BattleJS
 * @text JS: Battle-Related
 * 
 * @param PreStartBattleJS:func
 * @text JS: Pre-Start Battle
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.startBattle()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostStartBattleJS:func
 * @text JS: Post-Start Battle
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.startBattle()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 * 
 * @param BattleVictoryJS:func
 * @text JS: Battle Victory
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.processVictory()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param EscapeSuccessJS:func
 * @text JS: Escape Success
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.onEscapeSuccess()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param EscapeFailureJS:func
 * @text JS: Escape Failure
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.onEscapeFailure()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 * 
 * @param BattleDefeatJS:func
 * @text JS: Battle Defeat
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.processDefeat()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 * 
 * @param PreEndBattleJS:func
 * @text JS: Pre-End Battle
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.endBattle()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostEndBattleJS:func
 * @text JS: Post-End Battle
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.endBattle()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param TurnJS
 * @text JS: Turn-Related
 *
 * @param PreStartTurnJS:func
 * @text JS: Pre-Start Turn
 * @parent TurnJS
 * @type note
 * @desc Target function: BattleManager.startTurn()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostStartTurnJS:func
 * @text JS: Post-Start Turn
 * @parent TurnJS
 * @type note
 * @desc Target function: BattleManager.startTurn()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PreEndTurnJS:func
 * @text JS: Pre-End Turn
 * @parent TurnJS
 * @type note
 * @desc Target function: Game_Battler.prototype.onTurnEnd()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostEndTurnJS:func
 * @text JS: Post-End Turn
 * @parent TurnJS
 * @type note
 * @desc Target function: Game_Battler.prototype.onTurnEnd()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PreRegenerateJS:func
 * @text JS: Pre-Regenerate
 * @parent TurnJS
 * @type note
 * @desc Target function: Game_Battler.prototype.regenerateAll()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostRegenerateJS:func
 * @text JS: Post-Regenerate
 * @parent TurnJS
 * @type note
 * @desc Target function: Game_Battler.prototype.regenerateAll()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param ActionJS
 * @text JS: Action-Related
 *
 * @param PreStartActionJS:func
 * @text JS: Pre-Start Action
 * @parent ActionJS
 * @type note
 * @desc Target function: BattleManager.startAction()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst user = this.subject();\nconst target = user;\nconst a = user;\nconst b = user;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n"
 *
 * @param PostStartActionJS:func
 * @text JS: Post-Start Action
 * @parent ActionJS
 * @type note
 * @desc Target function: BattleManager.startAction()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst user = this.subject();\nconst target = user;\nconst a = user;\nconst b = user;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n"
 *
 * @param PreApplyJS:func
 * @text JS: Pre-Apply
 * @parent ActionJS
 * @type note
 * @desc Target function: Game_Action.prototype.apply()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst target = arguments[1];\nconst user = this.subject();\nconst a = user;\nconst b = target;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n\n// Return Value\nreturn value;"
 *
 * @param PreDamageJS:func
 * @text JS: Pre-Damage
 * @parent ActionJS
 * @type note
 * @desc Target function: Game_Action.prototype.executeDamage()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst target = arguments[1];\nconst user = this.subject();\nconst a = user;\nconst b = target;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n\n// Return Value\nreturn value;"
 *
 * @param PostDamageJS:func
 * @text JS: Post-Damage
 * @parent ActionJS
 * @type note
 * @desc Target function: Game_Action.prototype.executeDamage()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst target = arguments[1];\nconst user = this.subject();\nconst a = user;\nconst b = target;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n\n// Return Value\nreturn value;"
 *
 * @param PostApplyJS:func
 * @text JS: Post-Apply
 * @parent ActionJS
 * @type note
 * @desc Target function: Game_Action.prototype.apply()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst target = arguments[1];\nconst user = this.subject();\nconst a = user;\nconst b = target;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n\n// Return Value\nreturn value;"
 *
 * @param PreEndActionJS:func
 * @text JS: Pre-End Action
 * @parent ActionJS
 * @type note
 * @desc Target function: BattleManager.endAction()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst user = this.subject();\nconst target = user;\nconst a = user;\nconst b = user;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n"
 *
 * @param PostEndActionJS:func
 * @text JS: Post-End Action
 * @parent ActionJS
 * @type note
 * @desc Target function: BattleManager.endAction()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst user = this.subject();\nconst target = user;\nconst a = user;\nconst b = user;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Battle Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BattleLayout:
 *
 * @param Style:str
 * @text Battle Layout Style
 * @type select
 * @option Default - Shows actor faces in Battle Status.
 * @value default
 * @option List - Lists actors in Battle Status.
 * @value list
 * @option XP - Shows actor battlers in a stretched Battle Status.
 * @value xp
 * @option Portrait - Shows portraits in a stretched Battle Status.
 * @value portrait
 * @option Border - Displays windows around the screen border.
 * @value border
 * @desc The style used for the battle layout.
 * @default default
 *
 * @param ListStyle
 * @text List Style
 * @parent Style:str
 *
 * @param ShowFacesListStyle:eval
 * @text Show Faces
 * @parent ListStyle
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows faces in List Style?
 * @default true
 *
 * @param XPStyle
 * @text XP Style
 * @parent Style:str
 *
 * @param XPActorCommandLines:num
 * @text Command Lines
 * @parent XPStyle
 * @type number
 * @min 1
 * @desc Number of action lines in the Actor Command Window for the XP Style.
 * @default 4
 *
 * @param XPActorDefaultHeight:num
 * @text Sprite Height
 * @parent XPStyle
 * @type number
 * @min 1
 * @desc Default sprite height used when if the sprite's height has not been determined yet.
 * @default 64
 *
 * @param XPSpriteYLocation:str
 * @text Sprite Base Location
 * @parent XPStyle
 * @type select
 * @option Above Name - Sprite is located above the name.
 * @value name
 * @option Bottom - Sprite is located at the bottom of the window.
 * @value bottom
 * @option Centered - Sprite is centered in the window.
 * @value center
 * @option Top - Sprite is located at the top of the window.
 * @value top
 * @desc Determine where the sprite is located on the Battle Status Window.
 * @default name
 *
 * @param PotraitStyle
 * @text Portrait Style
 * @parent Style:str
 *
 * @param ShowPortraits:eval
 * @text Show Portraits?
 * @parent PotraitStyle
 * @type boolean
 * @on Portraits
 * @off Faces
 * @desc Requires VisuMZ_1_MainMenuCore.
 * Shows the actor's portrait instead of a face.
 * @default true
 *
 * @param PortraitScale:num
 * @text Portrait Scaling
 * @parent PotraitStyle
 * @desc If portraits are used, scale them by this much.
 * @default 0.5
 *
 * @param BorderStyle
 * @text Border Style
 * @parent Style:str
 *
 * @param SkillItemBorderCols:num
 * @text Columns
 * @parent BorderStyle
 * @type number
 * @min 1
 * @desc The total number of columns for Skill & Item Windows
 * in the battle scene.
 * @default 1
 *
 * @param ShowPortraitsBorderStyle:eval
 * @text Show Portraits?
 * @parent BorderStyle
 * @type boolean
 * @on Portraits
 * @off Faces
 * @desc Requires VisuMZ_1_MainMenuCore.
 * Shows the actor's portrait at the edge of the screen.
 * @default true
 *
 * @param PortraitScaleBorderStyle:num
 * @text Portrait Scaling
 * @parent BorderStyle
 * @desc If portraits are used, scale them by this much.
 * @default 1.0
 *
 * @param SkillItemWindows
 * @text Skill & Item Windows
 *
 * @param SkillItemMiddleLayout:eval
 * @text Middle Layout
 * @parent SkillItemWindows
 * @type boolean
 * @on Middle
 * @off Bottom
 * @desc Shows the Skill & Item Windows in mid-screen?
 * @default false
 *
 * @param SkillItemStandardCols:num
 * @text Columns
 * @parent SkillItemWindows
 * @type number
 * @min 1
 * @desc The total number of columns for Skill & Item Windows
 * in the battle scene.
 * @default 2
 *
 */
/* ----------------------------------------------------------------------------
 * Battle Log Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BattleLog:
 *
 * @param General
 *
 * @param BackColor:str
 * @text Back Color
 * @parent General
 * @desc Use #rrggbb for a hex color.
 * @default #000000
 *
 * @param MaxLines:num
 * @text Max Lines
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of lines to be displayed.
 * @default 10
 *
 * @param MessageWait:num
 * @text Message Wait
 * @parent General
 * @type number
 * @min 1
 * @desc Number of frames for a usual message wait.
 * @default 16
 *
 * @param TextAlign:str
 * @text Text Align
 * @parent General
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Window_BattleLog.
 * @default center
 *
 * @param BattleLogRectJS:func
 * @text JS: X, Y, W, H
 * @parent General
 * @type note
 * @desc Code used to determine the dimensions for the battle log.
 * @default "const wx = 0;\nconst wy = 0;\nconst ww = Graphics.boxWidth;\nconst wh = this.calcWindowHeight(10, false);\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param StartTurn
 * @text Start Turn
 *
 * @param StartTurnShow:eval
 * @text Show Start Turn?
 * @parent StartTurn
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display turn changes at the start of the turn?
 * @default false
 *
 * @param StartTurnMsg:str
 * @text Start Turn Message
 * @parent StartTurn
 * @desc Message displayed at turn start.
 * %1 - Turn Count
 * @default Turn %1
 *
 * @param StartTurnWait:num
 * @text Start Turn Wait
 * @parent StartTurn
 * @type number
 * @min 1
 * @desc Number of frames to wait after a turn started.
 * @default 40
 *
 * @param DisplayAction
 * @text Display Action
 *
 * @param ActionCenteredName:eval
 * @text Show Centered Action?
 * @parent DisplayAction
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display a centered text of the action name?
 * @default true
 *
 * @param ActionSkillMsg1:eval
 * @text Show Skill Message 1?
 * @parent DisplayAction
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display the 1st skill message?
 * @default false
 *
 * @param ActionSkillMsg2:eval
 * @text Show Skill Message 2?
 * @parent DisplayAction
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display the 2nd skill message?
 * @default true
 *
 * @param ActionItemMsg:eval
 * @text Show Item Message?
 * @parent DisplayAction
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display the item use message?
 * @default false
 *
 * @param ActionChanges
 * @text Action Changes
 *
 * @param ShowCounter:eval
 * @text Show Counter?
 * @parent ActionChanges
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display counter text?
 * @default true
 *
 * @param ShowReflect:eval
 * @text Show Reflect?
 * @parent ActionChanges
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display magic reflection text?
 * @default true
 *
 * @param ShowSubstitute:eval
 * @text Show Substitute?
 * @parent ActionChanges
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display substitute text?
 * @default true
 *
 * @param ActionResults
 * @text Action Results
 *
 * @param ShowFailure:eval
 * @text Show No Effect?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display no effect text?
 * @default false
 *
 * @param ShowCritical:eval
 * @text Show Critical?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display critical text?
 * @default false
 *
 * @param ShowMissEvasion:eval
 * @text Show Miss/Evasion?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display miss/evasion text?
 * @default false
 *
 * @param ShowHpDmg:eval
 * @text Show HP Damage?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display HP Damage text?
 * @default false
 *
 * @param ShowMpDmg:eval
 * @text Show MP Damage?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display MP Damage text?
 * @default false
 *
 * @param ShowTpDmg:eval
 * @text Show TP Damage?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display TP Damage text?
 * @default false
 *
 * @param DisplayStates
 * @text Display States
 *
 * @param ShowAddedState:eval
 * @text Show Added States?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display added states text?
 * @default false
 *
 * @param ShowRemovedState:eval
 * @text Show Removed States?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display removed states text?
 * @default false
 *
 * @param ShowCurrentState:eval
 * @text Show Current States?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display the currently affected state text?
 * @default false
 *
 * @param ShowAddedBuff:eval
 * @text Show Added Buffs?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display added buffs text?
 * @default false
 *
 * @param ShowAddedDebuff:eval
 * @text Show Added Debuffs?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display added debuffs text?
 * @default false
 *
 * @param ShowRemovedBuff:eval
 * @text Show Removed Buffs?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display removed de/buffs text?
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Party Command Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PartyCmd:
 *
 * @param Cmd
 * @text Command Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Cmd
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Party Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Cmd
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Party Command Window.
 * @default left
 *
 * @param CmdIconFight:num
 * @text Fight Icon
 * @parent Cmd
 * @desc The icon used for the Fight command.
 * @default 76
 *
 * @param CommandAddAutoBattle:eval
 * @text Add Auto Battle?
 * @parent Cmd
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Auto Battle" command to the Command Window?
 * @default true
 *
 * @param CmdIconAutoBattle:num
 * @text Auto Battle Icon
 * @parent CommandAddAutoBattle:eval
 * @desc The icon used for the Auto Battle command.
 * @default 78
 *
 * @param CmdTextAutoBattle:str
 * @text Auto Battle Text
 * @parent CommandAddAutoBattle:eval
 * @desc The text used for the Auto Battle command.
 * @default Auto
 *
 * @param CommandAddOptions:eval
 * @text Add Options?
 * @parent Cmd
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Options" command to the Command Window?
 * @default true
 *
 * @param CmdIconOptions:num
 * @text Options Icon
 * @parent CommandAddOptions:eval
 * @desc The icon used for the Options command.
 * @default 83
 *
 * @param ActiveTpbOptionsMessage:str
 * @text Active TPB Message
 * @parent CommandAddOptions:eval
 * @desc Message that will be displayed when selecting options during the middle of an action.
 * @default Options Menu queued after action is complete.
 *
 * @param CmdIconEscape:num
 * @text Escape Icon
 * @parent Cmd
 * @desc The icon used for the Escape command.
 * @default 82
 *
 * @param Access
 *
 * @param SkipPartyCmd:eval
 * @text Skip Party Command
 * @parent Access
 * @type boolean
 * @on Skip
 * @off Don't
 * @desc DTB: Skip Party Command selection on turn start.
 * TPB: Skip Party Command selection at battle start.
 * @default true
 *
 * @param DisablePartyCmd:eval
 * @text Disable Party Command
 * @parent Access
 * @type boolean
 * @on Disable
 * @off Don't
 * @desc Disable the Party Command Window entirely?
 * @default false
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpFight:str
 * @text Fight
 * @parent HelpWindow
 * @desc Text displayed when selecting a skill type.
 * %1 - Skill Type Name
 * @default Select actions to fight.
 *
 * @param HelpAutoBattle:str
 * @text Auto Battle
 * @parent HelpWindow
 * @desc Text displayed when selecting the Auto Battle command.
 * @default Sets party to Auto Battle mode.
 *
 * @param HelpOptions:str
 * @text Options
 * @parent HelpWindow
 * @desc Text displayed when selecting the Options command.
 * @default Opens up the Options Menu.
 *
 * @param HelpEscape:str
 * @text Escape
 * @parent HelpWindow
 * @desc Text displayed when selecting the escape command.
 * @default Attempt to escape the battle.
 *
 */
/* ----------------------------------------------------------------------------
 * Actor Command Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ActorCmd:
 *
 * @param Cmd
 * @text Command Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Cmd
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Actor Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Cmd
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Actor Command Window.
 * @default left
 *
 * @param CmdIconItem:num
 * @text Item Icon
 * @parent Cmd
 * @desc The icon used for the Item command.
 * @default 176
 *
 * @param IconStypeNorm:num
 * @text Normal SType Icon
 * @parent Cmd
 * @desc Icon used for normal skill types that aren't assigned any
 * icons. Ignore if VisuMZ_1_SkillsStatesCore is installed.
 * @default 78
 *
 * @param IconStypeMagic:num
 * @text Magic SType Icon
 * @parent Cmd
 * @desc Icon used for magic skill types that aren't assigned any
 * icons. Ignore if VisuMZ_1_SkillsStatesCore is installed.
 * @default 79
 *
 * @param BattleCmd
 * @text Battle Commands
 *
 * @param BattleCmdList:arraystr
 * @text Command List
 * @parent BattleCmd
 * @type combo[]
 * @option attack
 * @option skills
 * @option guard
 * @option item
 * @option party
 * @option escape
 * @option auto battle
 * @option stypes
 * @option stype: x
 * @option stype: name
 * @option all skills
 * @option skill: x
 * @option skill: name
 * @desc List of battle commands that appear by default
 * if the <Battle Commands> notetag isn't present.
 * @default ["attack","skills","guard","party","item"]
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpSkillType:str
 * @text Skill Types
 * @parent HelpWindow
 * @desc Text displayed when selecting a skill type.
 * %1 - Skill Type Name
 * @default Opens up a list of skills under the \C[16]%1\C[0] category.
 *
 * @param HelpItem:str
 * @text Items
 * @parent HelpWindow
 * @desc Text displayed when selecting the item command.
 * @default Opens up a list of items that you can use.
 *
 * @param HelpEscape:str
 * @text Escape
 * @parent HelpWindow
 * @desc Text displayed when selecting the escape command.
 * @default Attempt to escape the battle.
 *
 * @param HelpAutoBattle:str
 * @text Auto Battle
 * @parent HelpWindow
 * @desc Text displayed when selecting the Auto Battle command.
 * @default Automatically choose an action suitable for combat.
 *
 */
/* ----------------------------------------------------------------------------
 * Actor Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Actor:
 *
 * @param Flinch
 *
 * @param FlinchDistanceX:num
 * @text Flinch Distance X
 * @parent Flinch
 * @desc The normal X distance when flinching.
 * @default 12
 *
 * @param FlinchDistanceY:num
 * @text Flinch Distance Y
 * @parent Flinch
 * @desc The normal Y distance when flinching.
 * @default 0
 *
 * @param FlinchDuration:num
 * @text Flinch Duration
 * @parent Flinch
 * @desc The number of frames for a flinch to complete.
 * @default 6
 *
 * @param SvBattlers
 * @text Sideview Battlers
 *
 * @param AnchorX:num
 * @text Anchor: X
 * @parent SvBattlers
 * @desc Default X anchor for Sideview Battlers.
 * This changes where the actor is centered horizontally.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor: Y
 * @parent SvBattlers
 * @desc Default Y anchor for Sideview Battlers.
 * This changes where the actor is centered vertically.
 * @default 1.0
 *
 * @param OffsetX:num
 * @text Offset: X
 * @parent SvBattlers
 * @desc Offsets X position where actor is positioned.
 * Negative values go left. Positive values go right.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset: Y
 * @parent SvBattlers
 * @desc Offsets Y position where actor is positioned.
 * Negative values go up. Positive values go down.
 * @default 0
 *
 * @param MotionSpeed:num
 * @text Motion Speed
 * @parent SvBattlers
 * @type number
 * @min 1
 * @desc The number of frames in between each motion.
 * @default 12
 *
 * @param Shadow:eval
 * @text Shadow Visible
 * @parent SvBattlers
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Show or hide the shadow for Sideview Battlers.
 * @default true
 *
 * @param SmoothImage:eval
 * @text Smooth Image
 * @parent SvBattlers
 * @type boolean
 * @on Smooth
 * @off Pixelated
 * @desc Smooth out the battler images or pixelate them?
 * @default false
 *
 * @param HomePosJS:func
 * @text JS: Home Position
 * @parent SvBattlers
 * @type note
 * @desc Code used to calculate the home position of actors.
 * @default "// Declare Constants\nconst sprite = this;\nconst actor = this._actor;\nconst index = arguments[0];\n\n// Make Calculations\nlet x = Math.round((Graphics.width / 2) + 192)\nx -= Math.floor((Graphics.width - Graphics.boxWidth) / 2);\nx += index * 32;\nlet y = (Graphics.height - 200) - ($gameParty.maxBattleMembers() * 48);\ny -= Math.floor((Graphics.height - Graphics.boxHeight) / 2);\ny += index * 48;\n\n// Home Position Offsets\nconst offsetNote = /<SIDEVIEW HOME OFFSET:[ ]([\\+\\-]\\d+),[ ]([\\+\\-]\\d+)>/i;\nconst xOffsets = actor.traitObjects().map((obj) => (obj && obj.note.match(offsetNote) ? Number(RegExp.$1) : 0));\nconst yOffsets = actor.traitObjects().map((obj) => (obj && obj.note.match(offsetNote) ? Number(RegExp.$2) : 0));\nx = xOffsets.reduce((r, offset) => r + offset, x);\ny = yOffsets.reduce((r, offset) => r + offset, y);\n\n// Set Home Position\nthis.setHome(x, y);"
 *
 */
/* ----------------------------------------------------------------------------
 * Enemy Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Enemy:
 *
 * @param Visual
 *
 * @param AttackAnimation:num
 * @text Attack Animation
 * @parent Visual
 * @type animation
 * @desc Default attack animation used for enemies.
 * Use <Attack Animation: x> for custom animations.
 * @default 1
 *
 * @param EmergeText:eval
 * @text Emerge Text
 * @parent Visual
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show or hide the 'Enemy emerges!' text at the start of battle.
 * @default false
 *
 * @param OffsetX:num
 * @text Offset: X
 * @parent Visual
 * @desc Offsets X position where enemy is positioned.
 * Negative values go left. Positive values go right.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset: Y
 * @parent Visual
 * @desc Offsets Y position where enemy is positioned.
 * Negative values go up. Positive values go down.
 * @default 0
 *
 * @param SmoothImage:eval
 * @text Smooth Image
 * @parent Visual
 * @type boolean
 * @on Smooth
 * @off Pixelated
 * @desc Smooth out the battler images or pixelate them?
 * @default true
 *
 * @param SelectWindow
 * @text Select Window
 *
 * @param FrontViewSelect:eval
 * @text FV: Right Priority
 * @parent SelectWindow
 * @type boolean
 * @on Right
 * @off Normal
 * @desc If using frontview, auto select the enemy furthest right.
 * @default false
 *
 * @param SideviewSelect:eval
 * @text SV: Right Priority
 * @parent SelectWindow
 * @type boolean
 * @on Right
 * @off Normal
 * @desc If using sideview, auto select the enemy furthest right.
 * @default true
 *
 * @param NameFontSize:num
 * @text Name: Font Size
 * @parent SelectWindow
 * @desc Font size used for enemy names.
 * @default 22
 *
 * @param SvBattlers
 * @text Sideview Battlers
 *
 * @param AllowCollapse:eval
 * @text Allow Collapse
 * @parent SvBattlers
 * @type boolean
 * @on Allow
 * @off Don't
 * @desc Causes defeated enemies with SV Battler graphics
 * to "fade away" when defeated?
 * @default false
 *
 * @param AnchorX:num
 * @text Anchor: X
 * @parent SvBattlers
 * @desc Default X anchor for Sideview Battlers.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor: Y
 * @parent SvBattlers
 * @desc Default Y anchor for Sideview Battlers.
 * @default 1.0
 *
 * @param MotionIdle:str
 * @text Motion: Idle
 * @parent SvBattlers
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Sets default idle animation used by Sideview Battlers.
 * @default walk
 *
 * @param Shadow:eval
 * @text Shadow Visible
 * @parent SvBattlers
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Show or hide the shadow for Sideview Battlers.
 * @default true
 *
 * @param Width:num
 * @text Size: Width
 * @parent SvBattlers
 * @type number
 * @min 1
 * @desc Default width for enemies that use Sideview Battlers.
 * @default 64
 *
 * @param Height:num
 * @text Size: Height
 * @parent SvBattlers
 * @type number
 * @min 1
 * @desc Default height for enemies that use Sideview Battlers.
 * @default 64
 *
 * @param WtypeId:num
 * @text Weapon Type
 * @parent SvBattlers
 * @type number
 * @min 0
 * @desc Sets default weapon type used by Sideview Battlers.
 * Use 0 for Bare Hands.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * HP Gauge Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~HpGauge:
 *
 * @param Display
 * @text Show Gauges For
 *
 * @param ShowActorGauge:eval
 * @text Actors
 * @parent Display
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show HP Gauges over the actor sprites' heads?
 * Requires SV Actors to be visible.
 * @default true
 *
 * @param ShowEnemyGauge:eval
 * @text Enemies
 * @parent Display
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show HP Gauges over the enemy sprites' heads?
 * Can be bypassed with <Hide HP Gauge> notetag.
 * @default true
 *
 * @param RequiresDefeat:eval
 * @text Requires Defeat?
 * @parent ShowEnemyGauge:eval
 * @type boolean
 * @on Require Defeat First
 * @off No Requirement
 * @desc Requires defeating the enemy once to show HP Gauge?
 * Can be bypassed with <Show HP Gauge> notetag.
 * @default true
 *
 * @param BTestBypass:eval
 * @text Battle Test Bypass?
 * @parent RequiresDefeat:eval
 * @type boolean
 * @on Bypass
 * @off Don't Bypass
 * @desc Bypass the defeat requirement in battle test?
 * @default true
 *
 * @param Settings
 *
 * @param AnchorX:num
 * @text Anchor X
 * @parent Settings
 * @desc Where do you want the HP Gauge sprite's anchor X to be?
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor Y
 * @parent Settings
 * @desc Where do you want the HP Gauge sprite's anchor Y to be?
 * @default 1.0
 *
 * @param Scale:num
 * @text Scale
 * @parent Settings
 * @desc How large/small do you want the HP Gauge to be scaled?
 * @default 0.5
 *
 * @param OffsetX:num
 * @text Offset X
 * @parent Settings
 * @desc How many pixels to offset the HP Gauge's X by?
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @parent Settings
 * @desc How many pixels to offset the HP Gauge's Y by?
 * @default -3
 *
 * @param Options
 * @text Options
 *
 * @param AddHpGaugeOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Show HP Gauge' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @parent Options
 * @desc Command name of the option.
 * @default Show HP Gauge
 *
 */
/* ----------------------------------------------------------------------------
 * Action Sequence Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ActionSequence:
 *
 * @param AutoSequences
 * @text Automatic Sequences
 *
 * @param AutoMeleeSolo:eval
 * @text Melee Single Target
 * @parent AutoSequences
 * @type boolean
 * @on Allow
 * @off Ignore
 * @desc Allow this auto sequence for physical, single target actions?
 * @default true
 *
 * @param AutoMeleeAoE:eval
 * @text Melee Multi Target
 * @parent AutoSequences
 * @type boolean
 * @on Allow
 * @off Ignore
 * @desc Allow this auto sequence for physical, multi-target actions?
 * @default true
 *
 * @param CastAnimations
 * @text Cast Animations
 *
 * @param CastCertain:num
 * @text Certain Hit
 * @parent CastAnimations
 * @type animation
 * @desc Cast animation for Certain Hit skills.
 * @default 120
 *
 * @param CastPhysical:num
 * @text Physical
 * @parent CastAnimations
 * @type animation
 * @desc Cast animation for Physical skills.
 * @default 52
 *
 * @param CastMagical:num
 * @text Magical
 * @parent CastAnimations
 * @type animation
 * @desc Cast animation for Magical skills.
 * @default 51
 *
 * @param CounterReflection
 * @text Counter/Reflect
 *
 * @param CounterPlayback:eval
 * @text Counter Back
 * @parent CounterReflection
 * @type boolean
 * @on Play Back
 * @off Ignore
 * @desc Play back the attack animation used?
 * @default true
 *
 * @param ReflectAnimation:num
 * @text Reflect Animation
 * @parent CounterReflection
 * @type animation
 * @desc Animation played when an action is reflected.
 * @default 1
 *
 * @param ReflectPlayback:eval
 * @text Reflect Back
 * @parent CounterReflection
 * @type boolean
 * @on Play Back
 * @off Ignore
 * @desc Play back the attack animation used?
 * @default true
 *
 * @param Stepping
 *
 * @param MeleeDistance:num
 * @text Melee Distance
 * @parent Stepping
 * @desc Minimum distance in pixels for Movement Action Sequences.
 * @default 24
 *
 * @param StepDistanceX:num
 * @text Step Distance X
 * @parent Stepping
 * @desc The normal X distance when stepping forward.
 * @default 48
 *
 * @param StepDistanceY:num
 * @text Step Distance Y
 * @parent Stepping
 * @desc The normal Y distance when stepping forward.
 * @default 0
 *
 * @param StepDuration:num
 * @text Step Duration
 * @parent Stepping
 * @desc The number of frames for a stepping action to complete.
 * @default 12
 *
 */
//=============================================================================

const _0x2ae5=['isSpriteVisible','PyWJr','ActSeq_Motion_WaitMotionFrame','Scene_Battle_partyCommandWindowRect','Class-%1-%2','isOptionsCommandAdded','isAnyoneSkewing','preemptive','ZtOSP','bgType','collapseType','filters','wait','MDF','QfFUM','_immortal','compareEnemySprite','isCommandEnabled','commandEscape','JumpToLabel','getNextDamagePopup','_damages','hasSkill','Game_Map_battleback2Name','GhjCU','Mechanics','_wtypeIDs','aDget','iconIndex','center','partyCommandWindowRectBorderStyle','playReflection','OysLa','DistanceX','turn','isAlive','szNvs','wLwNZ','CriticalDmgFlat','setText','pStzE','Window_BattleLog_pushBaseLine','updateBattlerContainer','Scene_Battle_startPartyCommandSelection','commandNameWindowCenter','walk','ActSeq_Mechanics_AddState','WaitForMovement','actionBattleCoreJS','fdWEG','UIxOt','statusWindowRect','applyBattleCoreJS','fnTLP','performAttack','setupBattleback','mpDamageFmt','HRlXm','BTestBypass','command301','CmdTextAutoBattle','ckubW','Scene_Battle_skillWindowRect','Sprite_Battler_initMembers','skillId','includes','isLearnedSkill','getNextSubject','_damageContainer','displayStartMessages','ActionSequence','_lines','SideviewSelect','Yykta','KUvxc','applyHardDamageCap','DistanceAdjust','missile','isChangingOpacity','hide','ForceDeath','Game_Interpreter_command301','selectNextCommand','%1StartTurnJS','commandOptions','zeWfD','PreDamage%1JS','fsrpf','SvWeaponSolo-%1-%2','icon','BattleEndEvent','_reflectionTarget','ONgbS','frontviewSpriteY','inBattle','AutoBattleMsg','mxeym','onDisabledPartyCommandSelection','performMiss','CommandAddAutoBattle','uJEfM','isForRandom','removeAnimation','Bvpkr','TextAlign','bitmap','DamageRate','itemEffectAddAttackState','addDebuff','Scene_Battle_logWindowRect','Sprite_Actor_updateShadow','statusWindowRectDefaultStyle','aWZyK','mVwxR','Scene_Battle_onActorCancel','GiTHM','split','getAttackMotion','Scene_Battle_onEnemyCancel','drawIcon','_waitMode','JDxcU','applyDamageCaps','_svBattlerSprite','EnableSoftCap','addEscapeCommand','isItem','parameters','processAnimationRequests','Sprite_Actor_updateBitmap','_targetSkewX','onRegeneratePlayStateAnimation','isSceneBattle','StartTurnMsg','attackMotions','skillItemWindowRectMiddle','pushBaseLine','mzcnL','OffsetX','_shadowSprite','Game_Battler_regenerateAll','Game_Action_apply','BattleManager_endAction','ActSeq_Camera_FocusPoint','maxLines','transform','requestFauxAnimation','BattleManager_selectNextCommand','Window_BattleLog_performCounter','pRjVY','_iconIndex','PreRegenerateJS','_isBattlerFlipped','updateBossCollapse','OLbcV','HpGauge','_actor','JS\x20%1END\x20TURN','performRecovery','commandSymbol','isDebuffAffected','Scene_Battle_helpWindowRect','Scene_Battle_createPartyCommandWindow','ESCAPE','ARRAYNUM','onBattleStartBattleCore','displayCurrentState','setBattler','Window_ItemList_maxCols','_damagePopupArray','addState','hpAffected','hasBeenDefeatedBefore','createEmptyBitmap','isBattlerFlipped','VisuMZ_0_CoreEngine','_baseX','user','sleep','Direction','smeYr','_targetOpacity','parent','alive\x20friends','updateCancel','ActSeq_Movement_WaitForJump','battleMove','isTurnBased','loadPicture','startWeaponAnimation','cvoxY','sBryz','onEnemyCancel','dying','IwSfA','process_VisuMZ_BattleCore_CreateRegExp','AddHpGaugeOption','createStateSprite','replace','initVisibility','lineRect','Game_Action_makeTargets','isAnyoneJumping','addSingleSkillCommand','attackAnimationId2','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','startMotion','CoreEngine','refreshCursor','process_VisuMZ_BattleCore_jsFunctions','_flashColor','sort','launchBattle','Text','ActSeq_Movement_BattleStep','ActSeq_Animation_WaitForAnimation','JS\x20ESCAPE\x20FAILURE','createActorCommandWindow','isStateResist','ShowSubstitute','createCancelButton','ActSeq_Movement_FacePoint','Spriteset_Battle_update','Scene_Battle_start','AutoBattle','visualHpGauge','%1Event','EFWrT','RegExp','_phase','surprise','addSkillCommands','waitCount','cancelButtonText','Sprite_Battler_startMove','LnwCR','autoBattleStyle','requestDragonbonesAnimation','isAttack','IktUH','eispg','PostStartTurnJS','\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20','rIFnI','\x5cI[%1]%2','apply','CmdIconAutoBattle','PortraitScaleBorderStyle','fPGqe','rUIrU','_jumpWholeDuration','battleUIOffsetX','spriteId','onEscapeFailure','randomInt','DistanceY','ShrBf','DefaultSoftScaler','vphry','paIga','evade','ciCpB','initMembers','GIzZq','_mainSprite','ShowCurrentState','_actorCommandWindow','_regionBattleback1','battleOpacity','frameVisible','PortraitScale','loadSvActor','changePaintOpacity','gcUEy','PostApplyAsTargetJS','enemy','_updateFilterArea','mainSpriteScaleY','yWBsw','dCiFr','performEvasion','ActSeq_ChangeAngle','applyVariance','rksFv','FBzrY','hitRate','commandNameWindowDrawText','getBattlePortrait','note','hYXkO','Game_BattlerBase_canGuard','updateShadowBattleCore','vnhiJ','physical','ULFQB','performReflection','showNormalAnimation','itemTextAlign','ActSeq_Movement_WaitForMovement','dead\x20actors','_floatEasing','updateAction','PopupShiftX','Qlkqe','fontSize','isImmortal','JlGwU','evalDamageFormulaBattleCore','CvyEv','swapEnemyIDs','vNlNd','ActSeq_ChangeSkew','XnLfi','cgZnv','DamageStyleList','_skillIDs','ActSeq_Zoom_Reset','startEnemySelection','VisuMZ_2_DragonbonesUnion','AddOption','effect','BattleStartEvent','escape','WaitForFloat','alive\x20actors\x20not\x20target','PostApplyJS','allBattleMembers','getStypeIdWithName','_forcing','KRsAr','WrxaN','Window_BattleStatus_initialize','MAXHP','_effectsContainer','setBattlerFacePoint','PartyCmd','Game_Battler_performActionStart','selectNextActor','calcWindowHeight','onTurnEnd','Spriteset_Battle_updateActors','forceSelect','displayFailure','itemCri','resizeWindowBorderStyle','gradientFillRect','Game_BattlerBase_canAttack','setupBattleCoreData','setupMotion','qccax','makeTargetsBattleCore','_skewY','gotzk','displayEvasion','ShowFacesListStyle','Game_Map_setupBattleback','drawItemStyleIconText','GmQWe','checkCacheKey','ITEM','drawSkillCost','caTcs','DamageStyles','makeTargetSprites','SJorD','_commonEventQueue','vfHhj','PreEndBattleJS','clone','width','_animationSprites','PostEndTurnJS','startPartyCommandSelection','_battleCoreNoElement','regenerateAll','AUTO\x20BATTLE','animationShouldMirror','dataId','createTargetsJS','JS\x20%1APPLY\x20%2','drawItemImage','updatePositionBattleCore','Game_Action_needsSelection','AutoBattleOK','weatherType','isPartyCommandWindowDisabled','_borderPortraitSprite','wSNGX','Scene_ItemBase_applyItem','AdjustRect','CBaMK','PreDamageAsUserJS','startSkew','performActionEnd','reserveCommonEvent','IQFCf','isBusy','startGrow','endAnimation','Game_Battler_forceAction','ActSeq_Animation_CastAnimation','ActSeq_Element_ForceElements','FlashColor','isEffecting','ntkoy','cWXyJ','Scene_Battle_selectNextCommand','applyEasing','NewPopupBottom','Scene_Battle_startActorSelection','Window_BattleLog_displayMiss','_opacityDuration','_defeatedEnemies','Sprite_Actor_setBattler','actor%1-portrait','IqRqd','woHta','ofNkH','battleSpriteSkew','updateVisibility','isForFriendBattleCore','updateCommandNameWindow','Mmacm','addAnimationSpriteToContainer','AsUser','zlkVY','updateInterpreter','JS\x20BATTLE\x20DEFEAT','arPenFlat','BStJp','nPjTk','DigitGroupingDamageSprites','_eventId','ActionAnimation','StyleOFF','Name','lsZgm','drawItem','_handlers','isRightInputMode','_effectDuration','Nlesn','ReflectPlayback','startFloat','displayMiss','AS\x20USER','isOpen','_target','UEEGK','motionIdle','_totalValue','JS\x20%1START\x20BATTLE','criticalHitRate','Spriteset_Battle_createBattleField','ActSeq_Camera_Clamp','substitute','JcmEO','actorCommandSingleSkill','wolfh','removeAnimationFromContainer','anchorX','MoFsR','svBattlerShadowVisible','isTPB','displayCounter','itemRect','battleAnimation','setHelpWindowItem','Game_BattlerBase_initMembers','battleback1Name','ActSeq_Animation_ActionAnimation','value','_visualHpGauge_JustDied','create','_forcedBattlers','friendsUnit','Game_Action_isForOpponent','changeAtbChargeTime','_jumpMaxHeight','CreateActionSequenceTargets','_text','drawActorFace','registerDefeatedEnemy','zKMre','autoBattleAtStart','maxCols','lYodw','GdawZ','anchorY','selectPreviousCommand','Window_PartyCommand_initialize','PreApplyJS','Shadow2','Sprite_Actor_initMembers','process_VisuMZ_BattleCore_TraitObject_Notetags','retreat','Game_Action_evalDamageFormula','isAnyoneGrowing','createMiss','isTickBased','FlinchDistanceY','windowAreaHeight','yxxhJ','isOptionsCommandEnabled','VisuMZ_1_ElementStatusCore','applyArmorModifiers','itemEffectAddNormalState','_attackAnimationId','createContents','onOpacityEnd','phKHE','_enemy','lLFEh','IconStypeNorm','moveToStartPosition','damage','guardSkillId','wtypeId','_stypeIDs','updateShadow','Sprite_Actor_moveToStartPosition','damageContainer','_requestRefresh','_targets','startBattle','xqyUx','repositionCancelButtonBorderStyle','asCrV','statusWindowRectBorderStyle','_methods','isPlaytest','onJumpEnd','jaqyf','vouPx','skillTypes','contents','isCustomBattleScope','updateBattleProcess','AllowRandomSpeed','selectNextCommandTpb','getSkillIdWithName','FnTLw','isNextScene','animationBaseDelay','isAtbCastingState','registerCommand','addImmortal','showAnimation','smooth','rVRkL','messageSpeed','ActSeq_Movement_HomeReset','uoiyN','eXnRq','performMagicEvasion','wholeActionSet','maxTp','Game_Actor_setup','Targets','getConfigValue','BOGLY','battleEffect','EscapeFailureJS','eUKWA','_stateIconSprite','xwIhf','terminate','MANUAL','Post','extraPositionX','HitRate','close','nKUHr','Scene_Battle_stop','ARRAYFUNC','ZcmPm','isAtbChargingState','sdUKm','HelpFight','refreshMotion','HbpLq','join','moveBattlerToPoint','useItem','poiMY','Sprite_Enemy_createStateIconSprite','setActorHome','setImmortal','_helpWindow','helpWindowRectBorderStyle','_battleField','ActSeq_Target_NextTarget','MfNuX','Scene_Battle_createCancelButton','_angleWholeDuration','randomTargets','Window_BattleEnemy_show','processEscape','displayTpDamage','command283','top','NgmyF','_cursorArea','ARRAYEVAL','NQUzw','updateSpin','_enemySprites','_actionBattlers','ActSeq_BattleLog_DisplayAction','joaom','JfwXn','HQfsn','setHandler','LmjwB','initBattlePortrait','JVFRk','CheckSkillCommandShowSwitches','item','_homeX','getMenuImage','Game_Action_itemHit','GIDol','command339','SvWeaponMass-%1-%2','blt','Window_BattleLog_popBaseLine','updatePadding','Bzlqx','isCustomActionSequence','timeScale','removeChild','isSceneChanging','Window_BattleLog_performActionStart','updateWaitMode','Window_BattleLog_displayEvasion','isGrowing','ConfigManager_makeData','AsTarget','_commandNameWindow','EvzdP','Window_BattleLog_refresh','svBattlerName','IAOAB','ActSeq_Angle_Reset','setAttack','displayBuffs','WaitForEffect','canAttack','startTurn','%1EndTurnJS','updateBattlebackBitmap','Window_BattleLog_performDamage','Window_BattleLog_displayFailure','NEuZy','isTpb','addBattleCoreAutoBattleStartupCommand','match','cFVtN','YGlxH','isNextSceneBattleTransitionable','getDamageStyle','animation','Linear','battleSpin','AllowCollapse','stzXJ','onEncounter','_battleLayoutStyle','origin','wCKmP','createDistortionSprite','front\x20center','shift','Window_Options_addGeneralOptions','Zrkzh','stepBack','trueRandomTarget','isSkillItemWindowsMiddle','dead\x20battlers','Window_ActorCommand_initialize','BattleManager_onEscapeSuccess','ActSeq_Angle_WaitForAngle','ntloP','initBattleGauges','isMagicSkill','_list','_weather','ActSeq_Movement_Jump','drawItemImagePortraitStyle','isItemCommandEnabled','canGuardBattleCore','Window_BattleLog_popupDamage','RzUDi','process_VisuMZ_BattleCore_BaseTroops','rdUsp','changeBattlebacks','VkIby','ChargeRate','flashColor','min','waitForNewLine','toString','loadBattleback1','xpBQc','faceWidth','tIpwe','_hpGaugeSprite','IgSvx','hpDamage','DefaultDamageStyle','grlyJ','missed','IpJPe','updatePosition','makeCommandList','IBShZ','enemyNames','UHKFI','activate','isGuard','ShowHpDmg','ALL\x20SKILLS','startDamagePopup','Scene_Battle_terminate','ActionStart','HTjAN','alive\x20friends\x20not\x20target','performJump','Window_BattleLog_performRecovery','VwjdJ','Sprite_Battler_setBattler','_statusWindow','repeatTargets','weaponTypes','battleCoreResumeLaunchBattle','dimColor1','partyCommandWindowRectXPStyle','<%1>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/%1>','WaitForZoom','_flashDuration','weatherPower','hsrfT','%1RegenerateJS','ActSeq_Mechanics_TextPopup','_windowLayer','FrontViewSelect','alive\x20actors','updateScale','addBuff','bind','displayReflectionPlayBack','alive\x20battlers\x20not\x20user','isSideView','qoyFR','UiXMS','ResetOffset','onEncounterBattleCore','GGqjO','isBattleTest','_itemWindow','weapons','deathStateId','addOptionsCommand','CriticalHitFlat','_targetFloatHeight','PostEndBattleJS','qLRwO','yhAOU','HagFU','onEnemyOk','reyxp','xveHI','kcLOX','PriDM','_dragonbonesSpriteContainer','lsyVA','MOTIONS','Game_Interpreter_terminate','applyItem','ActSeq_Mechanics_Multipliers','BattleManager_startAction','setCursorRect','eOtKH','commandNameWindowDrawBackground','onAngleEnd','addCommand','EasingType','updateStart','Game_Interpreter_updateWaitMode','ActSeq_Movement_WaitForSpin','_callSceneOptions','performCollapse','opponentsUnit','PostDamageAsTargetJS','feZxo','IconStypeMagic','addPartyCommand','addDamageSprite','eraseState','onFloatEnd','fsIxp','addItemCommand','OkCfe','+%1\x20MP','findTargetSprite','softDamageCap','updateOpacity','BfwHp','redraw','loadSvEnemy','popBaseLine','stypeId','JySbD','fdkzR','removedStateObjects','statusWindowRectXPStyle','sDSSX','createEnemies','battleLayoutStyle','TargetLocation','PreStartTurnJS','_multipliers','performCounter','drawItemStatusXPStyle','update','_battlePortrait','_cancelButton','CmdStyle','logWindowRect','_motionCount','ShowAddedBuff','currentSymbol','canInput','isChanting','_updateClientArea','Sprite_Enemy_updateCollapse','yJjrF','createPartyCommandWindowBattleCore','createBorderStylePortraitSprite','prepareCustomActionSequence','AGI','changeBattlerOpacity','isFloating','mainSpriteWidth','removeBuff','drawGauge','CmdTextAlign','TEErn','KRbJX','ShowAddedState','isQueueOptionsMenu','RTgEH','KMhQK','singleSkill','JaZoM','ZwnFg','Angle','_duration','svShadow','showEnemyAttackAnimation','clearDamagePopup','isForRandomBattleCore','battleSkew','getItemDamageAmountLabelOriginal','inHomePosition','uWfSM','canAttackBattleCore','stepFlinch','updateHelp','ActSeq_Movement_MoveToPoint','getItemDamageAmountTextOriginal','_appeared','okButtonText','qVJui','TmtrK','GYYOA','ShowMissEvasion','command3011','Window_ActorCommand_setup','anchor','spell','removedBuffs','Game_Action_executeDamage','addedDebuffs','IhzwW','SvMotionIdleMass-%1-%2','createMainSprite','qwxtm','Game_Battler_onBattleStart','createActorCommandWindowBattleCore','BARE\x20HANDS','svBattlerAnchorY','prototype','maxItems','applyAngleChange','BxOpu','_enemyID','battleGrow','_growY','uipFb','ActSeq_Motion_MotionType','STYPES','setSkill','ActSeq_Animation_AttackAnimation','_battleCoreForcedElements','Style','Window_BattleLog_performAction','endAction','ArRedRate','makeAutoBattleActions','drawText','all\x20targets','initialize','ActSeq_DB_DragonbonesTimeScale','tIaKx','_active','loadEnemy','loadBitmap','autoBattleWindowRect','playCancel','createLowerLayer','members','isAutoBattleCommandAdded','removeDamageSprite','speed','hRxUV','autoBattleUseSkills','waitForFloat','logActionList','sMqAF','createActors','battlerSmoothImage','some','softDamageCapRate','ActSeq_Movement_FaceDirection','ActionCenteredName','Window_Options_statusText','Scale','xZYvY','Scene_Battle_itemWindowRect','rrZkz','faceRect','isCancelled','updateActors','canMove','placeTimeGauge','callNextMethod','evalDamageFormula','ConfigManager_applyData','call','CZnOB','onDatabaseLoaded','thrust','pjNoH','iconText','playEnemyAttack','_createClientArea','faepG','height','mainSpriteHeight','#ffffff','HelpOptions','TPB','ATTACK','HfqrL','displayChangedBuffs','show','start','RhwLl','_growDuration','YvRJW','SkewX','Defeat','focus','ksmfF','cancel','setBattleZoom','AlphaFilter','displayCritical','onActorOk','MotionType','log','WaitCount2','processPostBattleCommonEvents','DnEsH','Mirror','setBattleAngle','needsSelection','States','getTraitSetKeys','uhOVK','ActSeq_Mechanics_DeathBreak','CuGpu','Filename','addGuardCommand','lineHeight','createEffectActionSet','ActSeq_Target_RandTarget','addedStateObjects','createShadowSprite','ShowPopup','itemHit','ZTzSN','setHelpWindow','setBattleSkew','_battleCoreBattleStartEvent','makeDeepCopy','ShowHide','Window_BattleLog_performActionEnd','Game_Action_isForFriend','performActionMotions','DamageType%1','setupBattlebackBattleCore','toLowerCase','createBattleUIOffsetY','UFFYD','_battler','+%1','hmrvH','_battlerName','setMoveEasingType','RTaIw','isJumping','ShowTpDmg','shadow','ARRAYSTR','TimeScale','Targets1','AttackAnimation','zPHVi','Game_Battler_clearDamagePopup','remove','VCoin','_colorType','vjteA','Scene_Battle_updateStatusWindowPosition','WaitForNewLine','Buffs','ForceRandom','HP_Flat','attackSkillId','addShowHpGaugeCommand','isBattleSys','_regionBattleback2','fillRect','CmdIconItem','battleUIOffsetY','KdYyq','OHWJa','makeBattleCommand','aVRVj','CPDXD','waitForAnimation','stateMotionIndex','getItemDamageAmountLabelBattleCore','loop','ActSeq_Element_NullElements','Shadow','Ffnoh','open','ArPenRate','stop','_checkOn','clearMotion','GWHxj','LICbu','MotionAni','active','FaceAway','version','attackAnimationId1','getItemDamageAmountTextBattleCore','AutoBattleCancel','hardDamageCap','RZQIU','battler','nDVdE','itemHeight','ElementStatusCore','createPartyCommandWindow','FlashDuration','_borderPortraitTargetX','ShowCounter','SvBattlerMass-%1-%2','Sprite_StateIcon_updateFrame','createDigits','Scene_Battle_createHelpWindow','setWaitMode','_baseY','_distortionSprite','MP_Rate','battleback2Name','dead\x20enemies','boxWidth','createBattleFieldBattleCore','battleDisplayText','skew','kfFVT','getBattlePortraitFilename','setBattleCameraTargets','_skewX','callOptions','BattleManager_onEncounter','setupActionSet','ShowRemovedBuff','waitForEffect','AnimationID','textColor','scale','prepareBorderActor','tuxUZ','displaySubstitute','ActSeq_Movement_WaitForFloat','ZroBm','_animationContainer','LUK','iconHeight','isFlipped','isDTB','trim','maxBattleMembers','ZjYJe','JS\x20%1START\x20TURN','StEVT','status','Game_Actor_makeActionList','resizeWindowXPStyle','_floatHeight','unKko','ceil','isUndecided','getEnemyIdWithName','SvBattlerSolo-%1-%2','SJyhG','worldTransform','criticalHitFlat','isForOpponent','guard','_enemyWindow','aWYZx','enemyId','Duration','YIcsq','FPlaJ','Game_BattlerBase_isStateResist','_skewWholeDuration','ZecIh','angleDuration','ZgpvO','nzXlZ','hTNfd','isShownOnBattlePortrait','yzQAE','CounterPlayback','createDamageSprite','Game_Action_itemEffectAddNormalState','resize','addChild','MessageWait','Scene_Battle_createActorCommandWindow','_cursorSprite','addCustomCommands','AwoOP','_offsetY','forceWeaponAnimation','_initialOffset','ShowPortraits','IconSet','ActionEffect','return\x200','PreApply%1JS','battleSys','Game_Enemy_setup','scope','magicReflection','PostDamageAsUserJS','isBattleCoreTargetScope','autoMeleeSingleTargetActionSet','createJS','XIEPK','dMAGw','jump','MPpYG','bdCmj','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','mDWiR','NtXZK','swing','Immortal','_action','isActiveTpb','isHidden','yHutF','statusTextAutoBattleStyle','setBackgroundType','canBattlerMove','name','ActSeq_Camera_Reset','damageOffsetY','_autoBattleWindow','currentValue','kWirb','regenerateAllBattleCore','ScaleY','ActSeq_Zoom_Scale','<CENTER>%1','isFrameVisible','ActSeq_BattleLog_PopBaseLine','ActionSkillMsg1','TP_Flat','onGrowEnd','abs','processBattleCoreJS','_surprise','bsZUn','Window_BattleLog_performMagicEvasion','DPQZS','visible','PostApply%1JS','BattleVictoryJS','isTriggered','addChildAt','left','_subject','WaitForAnimation','createStateIconSprite','updateTargetPosition','MHaDg','counterAttack','QpCVk','SsJYG','createHelpWindow','pop','ActSeq_Movement_Opacity','options','_weaponImageId','getWtypeIdWithName','setBattlerBattleCore','isPreviousSceneBattleTransitionable','PveeB','AuNeq','_floatWholeDuration','applyData','isGuardWaiting','Window_BattleLog_displayMpDamage','message2','traitObjects','process_VisuMZ_BattleCore_Notetags','processDefeat','moveBattlerDistance','ext','_logWindow','startOpacity','KDzJR','_skewDuration','zoomDuration','Game_Battler_startTpbTurn','ActSeq_BattleLog_AddText','_animation','mpDamage','snapForBackground','ClearBattleLog','ActSeq_Set_FinishAction','displayAction','Game_Action_isForRandom','updateCollapse','waitForOpacity','filter','JS\x20%1START\x20ACTION','%1Apply%2JS','%1StartActionJS','critical','command357','createString','PARTY','wikjA','Sprite_Enemy_updateBossCollapse','type','createWeather','startSpin','parse','result','Setting','DEF','Scene_Battle_onActorOk','LoqVo','makeTargets','battleCameraData','_weaponSprite','PostStartBattleJS','SceneManager_isSceneChanging','FUojZ','ActSeq_Movement_MoveToTarget','innerWidth','getLastPluginCommandInterpreter','HelpAutoBattle','CastCertain','Sprite_Battler_updatePosition','ActorCmd','KBHnp','_emptyBitmap','Enemy','_dimmerSprite','SmoothImage','RabqX','performCastAnimation','vmpab','oqahT','validTargets','turnCount','onActorCancel','DisablePartyCmd','description','isBypassDamageCap','ShowActorGauge','ActSeq_Element_Clear','WtypeId','YYNRr','Sprite_Actor_createStateSprite','DefaultHardCap','attachSpritesToDistortionSprite','initElementStatusCore','BackColor','addLoadListener','fmDwH','process_VisuMZ_BattleCore_DamageStyles','drawItemImageXPStyle','endBattle','uBhRS','isAutoBattle','forceAction','ActSeq_Camera_FocusTarget','battleAngle','clearBattleCoreData','createAnimationSprite','resetFontSettings','pkayo','createBattleField','doWrq','textSizeEx','_shake','right','HaRdJ','JDuRv','PreEndTurnJS','process_VisuMZ_BattleCore_PluginParams','Window_BattleLog_clear','Interrupt','ScaleX','isDead','setupWeaponAnimation','NIqxo','indexOf','processForcedAction','PostRegenerateJS','WaitCount','WOmld','EHaJh','_preBattleCommonEvent','drawItemStyleIcon','BattleManager_initMembers','jumpBattler','_scene','YkWRA','startAttackWeaponAnimation','Sprite_Enemy_updateStateSprite','SkillItemBorderCols','createHpGaugeSprite','Tqkgc','PopupShiftY','DisplayAction','isEscapeCommandEnabled','EscapeSuccess','shouldPopupDamage','BattleManager_startInput','Game_Battler_performActionEnd','drawBackgroundRect','gaugeX','addChildToBack','wKkDi','createKeyJS','statusText','_animationCount','_angleDuration','not\x20focus','destroyDamageSprite','extraPositionY','Formula','iterateBattler','param','Actor','wFWrq','bpnDF','_borderPortraitDuration','canGuard','_floatDuration','jqeAA','ActSeq_BattleLog_WaitForBattleLog','RNLlN','unshift','subject','updateWeather','AS\x20TARGET','Scene_Map_launchBattle','PostEndActionJS','hmRAA','createCommandNameWindow','ActSeq_DB_DragonbonesMotionAni','destroy','wIggF','createCommandVisibleJS','removeState','inputtingAction','processRandomizedData','_waitCount','Game_System_initialize','CriticalHitRate','compareBattlerSprites','ucARV','MAT','okTargetSelectionVisibility','arRedRate','text','qbgfa','_forceAction','_currentActor','BattleLogRectJS','PreApplyAsUserJS','string','BXApS','updateMain','ATK','qAgKr','placeGauge','placeBasicGauges','SWPEH','CmdIconFight','CastPhysical','skillItemWindowRectBorderStyle','_battleCoreAddedElements','uiMenuStyle','_targetGrowY','isActing','PerformAction','autoSelect','battleCorePreBattleCommonEvent','maxCommands','VpkgX','QlDts','battleStatusWindowAnimationContainer','clear','ResetFocus','_homeY','processVictory','windowPadding','HbJrz','YMZnj','forceMotion','waitForMovement','Scene_Boot_onDatabaseLoaded','TP_Rate','_motionType','ActSeq_Camera_WaitForCamera','round','oIPoI','Appxv','helpAreaBottom','ActSeq_Animation_ChangeBattlePortrait','HelpEscape','DefaultSoftCap','waitForJump','gainMp','atbInterrupt','Game_BattlerBase_addNewState','vjCGO','_back1Sprite','zzEzJ','performFlinch','setupDamagePopup','Sprite_Battler_updateMain','wKaoT','Window_BattleStatus_drawItemImage','_autoBattle','aQRdZ','isFriendly','AnchorY','JSON','Sprite_Enemy_setHue','isPhysical','isActor','chant','createSeparateDamagePopups','ActSeq_BattleLog_Refresh','ScqOw','VisuMZ_2_PartySystem','StepDistanceX','updateSkew','Sprite_Actor_update','FBCUS','CmdIconEscape','padding','FUNC','performSubstitute','invokeMagicReflection','EscapeSuccessJS','Sprite_Enemy_loadBitmap','HelpSkillType','updateEffectContainers','_opacityWholeDuration','SsbiO','command301_PreBattleEvent','ywMlJ','NameFontSize','NiJpi','dBdBC','addBattleCoreAutoBattleStyleCommand','command119','applyGuard','addGeneralOptions','OffsetAdjust','MeleeDistance','addSkillTypeCommand','isAnyoneSpinning','criticalDmgRate','isAnyoneFloating','_motionSpeed','Height','displayAddedStates','updateCustomActionSequence','ActSeq_Camera_Offset','JS\x20%1DAMAGE\x20%2','needsSelectionBattleCore','drain','children','eLyRz','ShowCritical','setHue','format','Game_Battler_performDamage','PreDamageJS','_actorSprites','clamp','qaVWQ','UZwhV','Game_Action_clear','_enemies','uBZZb','TLOjz','cqmBb','_motion','contentsOpacity','_offsetX','StartTurnWait','nameY','nQXfh','DamageDisplay','tohRr','getAttackWeaponAnimationId','centerFrontViewSprite','performAction','vrooF','extraHeight','getHardDamageCap','skills','ActSeq_Mechanics_Immortal','Window_BattleLog_displayCurrentState','Kzexn','usePremadeActionSequence','ShowAddedDebuff','ActSeq_Mechanics_WaitForEffect','_effectType','SkillItemStandardCols','canAddSkillCommand','boxHeight','battleCamera','rowSpacing','isDying','addAutoBattleCommands','YotnQ','isFightCommandEnabled','index','damageStyle','loadSystem','BattleManager_processVictory','initBattleCore','GgHHE','_back2Sprite','collapse','isCertainHit','SkillItemMiddleLayout','requestAnimation','nhsHW','angle','displayType','onBattleStart','setupIconTextPopup','isForOpponentBattleCore','setBattleCameraOffset','_growEasing','StepDistanceY','BattleDefeatJS','Turns','_skewEasing','mpHealingFmt','deadMembers','border','StyleName','alive\x20friends\x20not\x20user','Elements','mhp','hpHealingFmt','makeData','message4','displayReflection','filterArea','ActSeq_Element_AddElements','applyImmortal','NruyJ','createEnemyNameContainer','_enemyIDs','Game_BattlerBase_eraseState','isVisualHpGaugeDisplayed','Scene_Battle_windowAreaHeight','setHome','actor','isForFriend','PostDamageJS','CmdIconOptions','autoBattle','ShowWeapon','updateGrow','requestMotion','HP_Rate','loadBattleback2','isSideButtonLayout','measureTextWidth','finalizeScale','blockWidth','ActionEnd','_skillWindow','setBattlerFlip','isOnCurrentMap','Opacity','CQNVD','NYVsI','SkewY','pIlsZ','Spriteset_Battle_createLowerLayer','ActSeq_Mechanics_AddBuffDebuff','Sprite_Actor_setActorHome','_angleEasing','makeTargetSelectionMoreVisible','zxoRP','svAnchorX','updateAngleCalculations','_executedValue','dUfBf','canEscape','bottom','BattleLog','stepForward','_enemyNameContainer','NjrQa','uzmGP','BattleManager_endBattle','makeActions','getInputButtonString','Skills','performMoveToPoint','optDisplayTp','gwSBx','VisuMZ_1_MainMenuCore','Damage','canUse','CriticalColor','isSkipPartyCommandWindow','Scene_Battle_updateBattleProcess','ActSeq_Movement_Scale','adjustWeaponSpriteOffset','placeStateIcon','float','TextColor','clodP','bvdDl','dead','MAXMP','SlTsT','getColor','updateShadowPosition','BattleManager_processDefeat','WGlmO','requestMotionRefresh','reverse','applyCritical','Window_BattleLog_displayCritical','_allTargets','Sprite_Enemy_setBattler','ApplyImmortal','yHJTa','updateStateSprite','ryJUU','Point','max','XPActorCommandLines','gOCwQ','list','opacity','SHIDP','commandStyleCheck','current\x20target','mainSprite','_targetSkewY','PopupDuration','fZatb','_svBattlerData','changeWeather','ActSeq_Motion_PerformAction','svAnchorY','pages','sortDamageSprites','hxpPq','EnableDamageCap','skewDuration','WaitForSkew','iconWidth','_updateCursorArea','addFightCommand','_baseLineStack','_createCursorArea','GroupDigits','onSelectAction','Item-%1-%2','JS\x20%1REGENERATE','addText','ArRedFlat','KoMcu','exit','_targetAngle','victory','BHifI','fight','HomePosJS','PreEndActionJS','StepDuration','ActionItemMsg','lCVHM','_battlerContainer','map','VisuMZ_3_ActSeqCamera','onSkewEnd','OffsetY','ShowPortraitsBorderStyle','performActionStart','cancelTargetSelectionVisibility','_battlerHue','gainTp','Game_BattlerBase_refresh','isOpponent','STR','message1','PeHng','MP_Flat','PreStartBattleJS','alive\x20opponents\x20not\x20target','WaitForAngle','LtYYj','_createDamageContainer','_currentAngle','\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20targets\x20=\x20arguments[1];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20return\x20targets\x20||\x20[];\x0a\x20\x20\x20\x20','Sprite_Enemy_initVisibility','drawTextEx','custom','floor','battleFloat','AutoMeleeSolo','Window_SkillList_maxCols','regionId','kwcwT','battleZoom','useDigitGrouping','isInputting','setupTextPopup','damageFlat','WaitForOpacity','BattleManager_updatePhase','_actions','isAutoBattleCommandEnabled','recoverAll','makeEscapeRatio','tYwpL','startJump','clearElementChanges','Window_BattleLog_performEvasion','spinBattler','WaitForCamera','YojbP','CriticalDuration','HUdke','push','applySoftDamageCap','ActSeq_Mechanics_Collapse','executeDamage','HitFlat','NjYQD','_createCursorSprite','Weapon-%1-%2','_additionalSprites','RGrmp','ActSeq_Movement_Float','helpWindowRect','sortEnemies','_flinched','isSkewing','ShowMpDmg','Debuffs','BattleManager_startBattle','isSkill','WaitForJump','MaxLines','BattleManager_onEscapeFailure','zZXbL','isDeathStateAffected','actionSplicePoint','_flipScaleX','vBXpW','currentClass','power','updatePhase','Skill-%1-%2','action','CriticalHitMultiplier','_spriteset','isMVAnimation','qZdjm','makeActionList','Sprite_Weapon_loadBitmap','refreshActorPortrait','BattleManager_startTurn','Scene_Battle_onEnemyOk','BattleCore','ActSeq_Movement_Skew','_stateSprite','displayActionResults','CNceY','addedBuffs','cWeuL','dimColor2','State-%1-%2','updateBorderSprite','_partyCommandWindow','ActSeq_BattleLog_UI','alive\x20actors\x20not\x20user','ShowFailure','updateFloat','isAnimationShownOnBattlePortrait','random','CommandVisible','wLZir','makeActionListAutoAttack','createAutoBattleWindow','_opacityEasing','TCJnf','Game_Interpreter_PluginCommand','setBattlePortrait','vQbKp','_targetGrowX','basicGaugesY','displayItemMessage','updateHpGaugePosition','damageOffsetX','_jumpDuration','currentExt','AutoBattleBgType','PostStartActionJS','setVisibleUI','AutoBattleRect','initMembersBattleCore','-%1\x20MP','CriticalHitRateJS','ActSeq_Animation_ShowAnimation','numTargets','yiTvy','setBattleCameraPoint','sodrm','performMoveToTargets','splice','DamageFlat','UNTITLED','repeats','_growX','SKILLS','_armorPenetration','Settings','front\x20base','move','slice','_item','command236','startTpbTurn','autoMeleeMultiTargetActionSet','isMagical','addAutoBattleCommand','dkIxf','callUpdateHelp','ActSeq_Set_SetupAction','skillWindowRect','setFrame','pbmtv','Game_Temp_requestAnimation','WPHuz','finishActionSet','qWUBD','hasSvBattler','displayMpDamage','bossCollapse','startMove','removeImmortal','animationId','DTB','BattleLayout','itemLineRect','mQtzE','ConvertParams','xxApl','createChildSprite','createAllWindows','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','_pattern','Enemy-%1-%2','ADibP','XPSpriteYLocation','_jumpHeight','qMHaE','battleCommandIcon','TnydP','battleCommands','Window_BattleLog_performReflection','updateFrame','commandStyle','wVGOt','isAnyoneChangingOpacity','popupDamage','ActSeq_Movement_WaitForScale','Game_Map_battleback1Name','hXLGM','startInput','_lastPluginCommandInterpreter','setSvBattlerSprite','getSkillTypes','updateStateSpriteBattleCore','_escapeRatio','%1Damage%2JS','svBattlerData','QSzpe','ActSeq_Mechanics_HpMpTp','Targets2','criticalDmgFlat','attack','createInnerPortrait','HIvEk','forceEscapeSprite','XUqWp','motionSpeed','ARRAYSTRUCT','Window_BattleLog_displayTpDamage','startActorSelection','showPortraits','ShowEnemyGauge','_cache','EhjyO','_targetIndex','PreStartActionJS','debuffAdd','WaitCount1','_createEffectsContainer','drawItemImageListStyle','SOsKc','evaded','battleCommandName','isEnemy','Window_BattleLog_performMiss','showHelpWindow','fPoFB','jUyjP','refresh','QBYfo','growBattler','isAnimationPlaying','OverallFormulaJS','battlerSprites','TyauQ','placeActorName','setup','backColor','performDamage','animationWait','ShowRemovedState','dfjdN','ZIaYT','aliveMembers','setupCriticalEffect','actorCommandAutoBattle','process_VisuMZ_BattleCore_Action_Notetags','auto','commandName','processBorderActor','battleMembers','xlIhC','Scene_Battle_startEnemySelection','isMoving','addAttackCommand','SkipPartyCmd','FaceDirection','updateStatusWindowPosition','fittingHeight','setLastPluginCommandInterpreter','makeHpDamageText','ActSeq_Mechanics_AtbGauge','IjvKS','portrait','length','getDefeatedEnemies','actionEffect','oZCtA','isAnyoneMoving','ActSeq_Target_CurrentIndex','BkQpf','toUpperCase','setupHpGaugeSprite','_growWholeDuration','actorCommandEscape','isBattleFlipped','PreApplyAsTargetJS','updateJump','buffAdd','drawLineText','AnchorX','VfcKI','VisuMZ_1_SkillsStatesCore','constructor','battleJump','changeAtbCastTime','DfeVp','uKklm','weaponImageId','dTukG','tifAu','ShowReflect','yKFOx','yCDdi','svBattlerAnchorX','Scene_Battle_selectPreviousCommand','Scene_Options_maxCommands','IJWEX','reduce','updateBitmap','createHelpWindowBattleCore','udlos','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20obj\x20=\x20arguments[2];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20value\x20=\x20arguments[3]\x20||\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20originalValue\x20=\x20value;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Constants\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20action\x20=\x20(this.constructor\x20===\x20Game_Action)\x20?\x20this\x20:\x20user.currentAction();\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20attacker\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20defender\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20healer\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20receiver\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20actor\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20currentClass\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20(this.constructor\x20===\x20Game_Action)\x20?\x20this.item()\x20:\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20item\x20=\x20(this.constructor\x20===\x20Game_Action)\x20?\x20this.item()\x20:\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20weapon\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20armor\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20enemy\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20obj;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Create\x20Compatibility\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20origin\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(Imported.VisuMZ_1_SkillsStatesCore\x20&&\x20$dataStates.includes(obj))\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20origin\x20=\x20target.getStateOrigin(obj.id);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(value)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20value\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20value\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20value\x20=\x20originalValue;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20value;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','_padding','jPPmW','drawItemStatusListStyle','concat','createBattleUIOffsetX','ActSeq_Movement_WaitForOpacity','mainSpriteScaleX','default','isBorderStylePortraitShown','hYsKL','Actor-%1-%2','cameraOffsetDuration','floatBattler','addSingleSkillCommands','battlelog','flashDuration','isDisplayEmergedEnemies','skill','allowCollapse','emerge','wqWbg','getNextSubjectFromPool','text\x20target','isSpinning','isConfused','innerHeight','cameraDuration','updateFlip','currentAction','#%1','Sprite_Battler_setHome','targetObjects','Window_BattleLog_performCollapse','processRefresh','Game_Battler_onTurnEnd','displayHpDamage','isDamagePopupRequested','onEscapeSuccess','startAction','partyCommandWindowRect','itemWindowRect','ERsoi'];(function(_0x30583d,_0x2ae5c3){const _0x40366c=function(_0x57443b){while(--_0x57443b){_0x30583d['push'](_0x30583d['shift']());}};_0x40366c(++_0x2ae5c3);}(_0x2ae5,0x12f));const _0x4036=function(_0x30583d,_0x2ae5c3){_0x30583d=_0x30583d-0x0;let _0x40366c=_0x2ae5[_0x30583d];return _0x40366c;};var label='BattleCore',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x4036('0x3c4')](function(_0x38446a){return _0x38446a['status']&&_0x38446a[_0x4036('0x3f1')][_0x4036('0x747')]('['+label+']');})[0x0];VisuMZ[label][_0x4036('0x635')]=VisuMZ[label][_0x4036('0x635')]||{},VisuMZ[_0x4036('0x653')]=function(_0x265ebb,_0x416a38){for(const _0x1f987a in _0x416a38){if(_0x1f987a['match'](/(.*):(.*)/i)){if(_0x4036('0x4ef')!==_0x4036('0x32a')){const _0x2b8a20=String(RegExp['$1']),_0xe67363=String(RegExp['$2'])[_0x4036('0x6bc')]()['trim']();let _0x2343b1,_0x176112,_0x293053;switch(_0xe67363){case'NUM':_0x2343b1=_0x416a38[_0x1f987a]!==''?Number(_0x416a38[_0x1f987a]):0x0;break;case _0x4036('0x7aa'):_0x176112=_0x416a38[_0x1f987a]!==''?JSON[_0x4036('0x3d1')](_0x416a38[_0x1f987a]):[],_0x2343b1=_0x176112[_0x4036('0x5a4')](_0x329ef8=>Number(_0x329ef8));break;case'EVAL':_0x2343b1=_0x416a38[_0x1f987a]!==''?eval(_0x416a38[_0x1f987a]):null;break;case _0x4036('0x12c'):_0x176112=_0x416a38[_0x1f987a]!==''?JSON[_0x4036('0x3d1')](_0x416a38[_0x1f987a]):[],_0x2343b1=_0x176112['map'](_0x5b4412=>eval(_0x5b4412));break;case _0x4036('0x49f'):_0x2343b1=_0x416a38[_0x1f987a]!==''?JSON[_0x4036('0x3d1')](_0x416a38[_0x1f987a]):'';break;case'ARRAYJSON':_0x176112=_0x416a38[_0x1f987a]!==''?JSON[_0x4036('0x3d1')](_0x416a38[_0x1f987a]):[],_0x2343b1=_0x176112[_0x4036('0x5a4')](_0x53dfd9=>JSON['parse'](_0x53dfd9));break;case _0x4036('0x4ae'):_0x2343b1=_0x416a38[_0x1f987a]!==''?new Function(JSON[_0x4036('0x3d1')](_0x416a38[_0x1f987a])):new Function(_0x4036('0x362'));break;case _0x4036('0x10f'):_0x176112=_0x416a38[_0x1f987a]!==''?JSON[_0x4036('0x3d1')](_0x416a38[_0x1f987a]):[],_0x2343b1=_0x176112[_0x4036('0x5a4')](_0x11d571=>new Function(JSON['parse'](_0x11d571)));break;case _0x4036('0x5af'):_0x2343b1=_0x416a38[_0x1f987a]!==''?String(_0x416a38[_0x1f987a]):'';break;case _0x4036('0x2d2'):_0x176112=_0x416a38[_0x1f987a]!==''?JSON[_0x4036('0x3d1')](_0x416a38[_0x1f987a]):[],_0x2343b1=_0x176112[_0x4036('0x5a4')](_0x3efe12=>String(_0x3efe12));break;case'STRUCT':_0x293053=_0x416a38[_0x1f987a]!==''?JSON['parse'](_0x416a38[_0x1f987a]):{},_0x265ebb[_0x2b8a20]={},VisuMZ[_0x4036('0x653')](_0x265ebb[_0x2b8a20],_0x293053);continue;case _0x4036('0x67c'):_0x176112=_0x416a38[_0x1f987a]!==''?JSON[_0x4036('0x3d1')](_0x416a38[_0x1f987a]):[],_0x2343b1=_0x176112[_0x4036('0x5a4')](_0x5a733a=>VisuMZ[_0x4036('0x653')]({},JSON[_0x4036('0x3d1')](_0x5a733a)));break;default:continue;}_0x265ebb[_0x2b8a20]=_0x2343b1;}else{function _0x5c58ff(){_0x1bbc56[_0x4036('0x600')][_0x4036('0x6e')]['call'](this,_0x3d16df),this[_0x4036('0x3a6')](_0x3ae97a);}}}}return _0x265ebb;},(_0x2fad98=>{const _0x56226f=_0x2fad98['name'];for(const _0x2acb19 of dependencies){if(_0x4036('0x1c3')===_0x4036('0x201')){function _0x29025b(){_0x512023[_0x4036('0x49b')]=!![],_0x4d3301[_0x4036('0x552')](),this[_0x4036('0x758')]();}}else{if(!Imported[_0x2acb19]){alert(_0x4036('0x657')[_0x4036('0x4d2')](_0x56226f,_0x2acb19)),SceneManager[_0x4036('0x599')]();break;}}}const _0x5e77e1=_0x2fad98[_0x4036('0x3f1')];if(_0x5e77e1['match'](/\[Version[ ](.*?)\]/i)){const _0x584c13=Number(RegExp['$1']);_0x584c13!==VisuMZ[label][_0x4036('0x2fe')]&&(alert(_0x4036('0x7d3')['format'](_0x56226f,_0x584c13)),SceneManager[_0x4036('0x599')]());}if(_0x5e77e1[_0x4036('0x161')](/\[Tier[ ](\d+)\]/i)){if(_0x4036('0x460')!==_0x4036('0x74f')){const _0x21e1c1=Number(RegExp['$1']);_0x21e1c1<tier?(alert(_0x4036('0x371')[_0x4036('0x4d2')](_0x56226f,_0x21e1c1,tier)),SceneManager[_0x4036('0x599')]()):tier=Math['max'](_0x21e1c1,tier);}else{function _0x2c4b32(){_0x26bee7[_0x4036('0x5d7')](new _0x171a03(_0x17e00b));}}}VisuMZ[_0x4036('0x653')](VisuMZ[label]['Settings'],_0x2fad98[_0x4036('0x785')]);})(pluginData),VisuMZ[_0x4036('0xb0')]=function(_0x49b6ff){let _0x30c884=[];for(const _0x1f1f47 of _0x49b6ff){_0x30c884=_0x30c884['concat'](VisuMZ['ConvertActionSequenceTarget'](_0x1f1f47));}return _0x30c884[_0x4036('0x3c4')](_0x12a136=>_0x12a136);},VisuMZ['ConvertActionSequenceTarget']=function(_0x22cc2c){const _0x61d82b=BattleManager[_0x4036('0x17')](),_0x26e829=BattleManager[_0x4036('0x398')],_0x50029a=BattleManager[_0x4036('0x90')],_0x39efbb=BattleManager[_0x4036('0x570')]?BattleManager[_0x4036('0x570')][_0x4036('0x638')](0x0):_0x61d82b;_0x22cc2c=_0x22cc2c[_0x4036('0x2c6')]()['trim']();if(_0x22cc2c===_0x4036('0x7b7'))return[_0x26e829];else{if(_0x22cc2c===_0x4036('0x57e')){if(_0x4036('0x1fe')===_0x4036('0x10d')){function _0x230017(){this[_0x4036('0x312')][_0x4036('0x356')](this[_0x4036('0x1d7')]);}}else return[_0x50029a];}else{if(_0x22cc2c==='prev\x20target'){if(_0x50029a){const _0x5f5326=_0x39efbb['indexOf'](_0x50029a);return _0x5f5326>=0x0?[_0x39efbb[_0x5f5326-0x1]||_0x50029a]:[_0x50029a];}}else{if(_0x22cc2c===_0x4036('0x6f2')){if(_0x50029a){const _0x485626=_0x39efbb['indexOf'](_0x50029a);return _0x485626>=0x0?[_0x39efbb[_0x485626+0x1]||_0x50029a]:[_0x50029a];}}else{if(_0x22cc2c===_0x4036('0x260')){if(_0x4036('0x73b')===_0x4036('0x73b'))return _0x39efbb;else{function _0x5d308c(){_0x5c9c83[_0x4036('0x600')][_0x4036('0x149')]['call'](this,_0x42aaba,_0xac542d),this[_0x4036('0x283')]();}}}else{if(_0x22cc2c===_0x4036('0x29e'))return[_0x26e829][_0x4036('0x6df')](_0x39efbb);else{if(_0x22cc2c===_0x4036('0x439')){if('SOsKc'!==_0x4036('0x689')){function _0x234af1(){if(!this['_damageContainer'])return;if(!_0x21c41b)return;if(!_0x552812)return;const _0x14fe0d=this['itemRect'](_0x183135[_0x4036('0x4fd')]());_0x14fe0d['x']+=_0x14fe0d[_0x4036('0x42')]/0x2+this['padding'],_0xb64c9['x']=_0x14fe0d['x'],_0x575f33['y']=_0x14fe0d['y'],this[_0x4036('0x74a')][_0x4036('0x356')](_0x2eff18);}}else return _0x61d82b[_0x4036('0x3c4')](_0x187b01=>_0x187b01!==_0x26e829&&!_0x39efbb[_0x4036('0x747')](_0x187b01));}}}}}}}if(_0x26e829){if(_0x22cc2c===_0x4036('0x7bd'))return _0x26e829['friendsUnit']()[_0x4036('0x6a0')]();else{if(_0x22cc2c===_0x4036('0x518'))return _0x26e829[_0x4036('0xac')]()[_0x4036('0x6a0')]()[_0x4036('0x3c4')](_0x2e0093=>_0x2e0093!==_0x26e829);else{if(_0x22cc2c===_0x4036('0x1a7'))return _0x26e829[_0x4036('0xac')]()[_0x4036('0x6a0')]()[_0x4036('0x3c4')](_0x574999=>_0x574999!==_0x50029a);else{if(_0x22cc2c==='dead\x20friends'){if(_0x4036('0x8a')==='Nlesn')return _0x26e829[_0x4036('0xac')]()[_0x4036('0x515')]();else{function _0x460d71(){if(!this[_0x4036('0x7af')])this[_0x4036('0x22d')]();return _0x4887f2[_0x4036('0x600')][_0x4036('0x635')]['Damage']['NewPopupBottom']?this[_0x4036('0x7af')][_0x4036('0x171')]():this[_0x4036('0x7af')][_0x4036('0x3a1')]();}}}else{if(_0x22cc2c[_0x4036('0x161')](/FRIEND INDEX (\d+)/i)){const _0x59b045=Number(RegExp['$1']);return[_0x26e829[_0x4036('0xac')]()[_0x4036('0x26a')]()[_0x59b045]];}}}}}if(_0x22cc2c==='alive\x20opponents')return _0x26e829[_0x4036('0x1e9')]()[_0x4036('0x6a0')]();else{if(_0x22cc2c===_0x4036('0x5b4')){if(_0x4036('0x228')===_0x4036('0x228'))return _0x26e829[_0x4036('0x1e9')]()['aliveMembers']()[_0x4036('0x3c4')](_0x2a931e=>_0x2a931e!==_0x50029a);else{function _0x1844cd(){return _0x3e928c[_0x4036('0x5d7')](...this['friendsUnit']()['aliveMembers']()[_0x4036('0x3c4')](_0x38eef5=>_0x38eef5!==this[_0x4036('0x449')]())),this[_0x4036('0x1ad')](_0x5cb80c);}}}else{if(_0x22cc2c==='dead\x20opponents'){if(_0x4036('0x690')===_0x4036('0x53f')){function _0xebaf26(){if(!_0x206c5c[_0x4036('0x1c1')]()&&this[_0x4036('0x6c8')]===_0x94a076){const _0x5eea5d=_0x587726[_0x4036('0x24d')][_0x4036('0x203')]();['default',_0x4036('0x57a'),'portrait',_0x4036('0x516')][_0x4036('0x747')](_0x5eea5d)&&(this[_0x4036('0x57b')]=0x0);}}}else return _0x26e829['opponentsUnit']()[_0x4036('0x515')]();}else{if(_0x22cc2c[_0x4036('0x161')](/OPPONENT INDEX (\d+)/i)){const _0x5ed8d0=Number(RegExp['$1']);return[_0x26e829[_0x4036('0x1e9')]()[_0x4036('0x26a')]()[_0x5ed8d0]];}}}}}if(_0x22cc2c===_0x4036('0x1bb')){if(_0x4036('0x6cb')!==_0x4036('0x327'))return $gameParty[_0x4036('0x6a0')]();else{function _0x8dbff8(){_0x4e105a[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x43f')][_0x4036('0x59e')]['call'](this,_0x23a00b);}}}else{if(_0x22cc2c===_0x4036('0x60c'))return $gameParty[_0x4036('0x6a0')]()[_0x4036('0x3c4')](_0x4ff5d6=>_0x4ff5d6!==_0x26e829);else{if(_0x22cc2c===_0x4036('0x15'))return $gameParty[_0x4036('0x6a0')]()[_0x4036('0x3c4')](_0x42db33=>_0x42db33!==_0x50029a);else{if(_0x22cc2c===_0x4036('0x831')){if(_0x4036('0x5fa')!==_0x4036('0x194'))return $gameParty[_0x4036('0x515')]();else{function _0x502aa8(){const _0xd43960=this[_0x4036('0x791')]['bitmap'];this[_0x4036('0x791')][_0x4036('0x643')](0x0,0x0,_0xd43960[_0x4036('0x42')],_0xd43960[_0x4036('0x28f')]);}}}else{if(_0x22cc2c[_0x4036('0x161')](/ACTOR INDEX (\d+)/i)){const _0x33dbbb=Number(RegExp['$1']);return[$gameParty[_0x4036('0x26a')]()[_0x33dbbb]];}else{if(_0x22cc2c[_0x4036('0x161')](/ACTOR ID (\d+)/i)){const _0x246d0c=Number(RegExp['$1']);return[$gameActors[_0x4036('0x529')](_0x246d0c)];}}}}}}if(_0x22cc2c==='alive\x20enemies'){if(_0x4036('0x370')!==_0x4036('0x370')){function _0x50d894(){_0x570f2d=_0x4990a6[_0x4036('0x1ba')];}}else return $gameTroop[_0x4036('0x6a0')]();}else{if(_0x22cc2c==='alive\x20enemies\x20not\x20user')return $gameTroop[_0x4036('0x6a0')]()[_0x4036('0x3c4')](_0x4d58ad=>_0x4d58ad!==_0x26e829);else{if(_0x22cc2c==='alive\x20enemies\x20not\x20target')return $gameTroop[_0x4036('0x6a0')]()[_0x4036('0x3c4')](_0x276073=>_0x276073!==_0x50029a);else{if(_0x22cc2c===_0x4036('0x315')){if(_0x4036('0x69e')!==_0x4036('0x69e')){function _0x42f389(){_0x46a9f3+=_0x35b3bc['x']-this[_0x4036('0x61e')]();const _0x40ee20=_0x4aca7d[_0x4036('0x2b4')]()*0x3/0x4;_0x4ec46e=_0x577258['y']+_0x40ee20,_0x3edee2=_0x56138c[_0x4036('0x18c')](_0x5b8213,_0x4a96d3['y']+this['y']-this[_0x4036('0x28f')]+_0x40ee20);}}else return $gameTroop[_0x4036('0x515')]();}else{if(_0x22cc2c[_0x4036('0x161')](/ENEMY INDEX (\d+)/i)){if(_0x4036('0x1eb')===_0x4036('0x1eb')){const _0x1482af=Number(RegExp['$1']);return[$gameTroop[_0x4036('0x26a')]()[_0x1482af]];}else{function _0xd978df(){this[_0x4036('0x20a')]=_0xae75b4(_0x192c2d['$1']);}}}else{if(_0x22cc2c[_0x4036('0x161')](/ENEMY ID (\d+)/i)){if('bpnDF'!==_0x4036('0x441')){function _0x22e0d2(){_0x1ead9f=_0x4bf659(_0x3c45db['$1']);}}else{const _0xe5e8f9=Number(RegExp['$1']);return $gameTroop['aliveMembers']()['filter'](_0x5090ad=>_0x5090ad[_0x4036('0x345')]()===_0xe5e8f9);}}}}}}}if(_0x22cc2c==='alive\x20battlers')return _0x61d82b[_0x4036('0x3c4')](_0x2e467b=>_0x2e467b[_0x4036('0x729')]());else{if(_0x22cc2c===_0x4036('0x1c0'))return _0x61d82b[_0x4036('0x3c4')](_0x3f0d97=>_0x3f0d97[_0x4036('0x729')]()&&_0x3f0d97!==_0x26e829);else{if(_0x22cc2c==='alive\x20battlers\x20not\x20target')return _0x61d82b[_0x4036('0x3c4')](_0x2d64b4=>_0x2d64b4[_0x4036('0x729')]()&&_0x2d64b4!==_0x50029a);else{if(_0x22cc2c===_0x4036('0x177'))return _0x61d82b[_0x4036('0x3c4')](_0x57d173=>_0x57d173[_0x4036('0x416')]());}}}return[];},PluginManager[_0x4036('0xf2')](pluginData[_0x4036('0x37d')],_0x4036('0x641'),_0x1f2b12=>{if(!SceneManager[_0x4036('0x78a')]())return;VisuMZ[_0x4036('0x653')](_0x1f2b12,_0x1f2b12);const _0x8a5ff4=$gameTemp[_0x4036('0x3df')](),_0x9f8836=BattleManager['_action'],_0xc8987b=BattleManager[_0x4036('0x398')],_0x5847b0=BattleManager[_0x4036('0x570')]?BattleManager[_0x4036('0x570')][_0x4036('0x638')](0x0):[],_0x463d1c=BattleManager['_logWindow'];if(!_0x8a5ff4||!_0x9f8836||!_0xc8987b)return;if(!_0x9f8836[_0x4036('0x13a')]())return;if(_0x1f2b12[_0x4036('0x42b')])_0x463d1c[_0x4036('0x3c0')](_0xc8987b,_0x9f8836[_0x4036('0x13a')]());if(_0x1f2b12['ApplyImmortal']){if(_0x4036('0x445')===_0x4036('0x445'))_0x463d1c[_0x4036('0x5d7')](_0x4036('0x521'),_0xc8987b,_0x5847b0,!![]);else{function _0x4ec176(){if(!_0x5d4bf6)return 0x0;let _0x22b7bc=0x0;const _0x36eb59=_0x4bafc0[_0x4036('0x826')];return _0x36eb59[_0x4036('0x161')](/<BATTLE UI OFFSET X:[ ]([\+\-]\d+)>/i)&&(_0x22b7bc+=_0xdd43d(_0x37c1b6['$1'])),_0x36eb59['match'](/<BATTLE UI OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x22b7bc+=_0x408513(_0x3a2ecb['$1'])),_0x22b7bc;}}}if(_0x1f2b12[_0x4036('0x1a5')])_0x463d1c[_0x4036('0x5d7')](_0x4036('0x5a9'),_0xc8987b,_0x9f8836);if(_0x1f2b12[_0x4036('0x735')])_0x463d1c[_0x4036('0x5d7')]('waitForMovement');if(_0x1f2b12['CastAnimation'])_0x463d1c[_0x4036('0x5d7')]('performCastAnimation',_0xc8987b,_0x9f8836);if(_0x1f2b12[_0x4036('0x399')])_0x463d1c['push'](_0x4036('0x2ed'));_0x8a5ff4[_0x4036('0x310')](_0x4036('0x6ea'));}),PluginManager[_0x4036('0xf2')](pluginData[_0x4036('0x37d')],'ActSeq_Set_WholeActionSet',_0x1df870=>{if(!SceneManager['isSceneBattle']())return;VisuMZ['ConvertParams'](_0x1df870,_0x1df870);const _0x595f4d=$gameTemp['getLastPluginCommandInterpreter'](),_0x587681=BattleManager[_0x4036('0x376')],_0x31a22f=BattleManager['_subject'],_0x574453=BattleManager[_0x4036('0x570')]?BattleManager['_allTargets'][_0x4036('0x638')](0x0):[],_0x4add03=BattleManager['_logWindow'];if(!_0x595f4d||!_0x587681||!_0x31a22f)return;if(!_0x587681['item']())return;if(_0x1df870[_0x4036('0x474')])_0x4add03['push'](_0x4036('0x4e8'),_0x31a22f,_0x587681);if(_0x1df870['WaitCount']>0x0)_0x4add03['push']('waitCount',_0x1df870[_0x4036('0x41c')]);if(_0x1df870[_0x4036('0x82')])_0x4add03[_0x4036('0x5d7')](_0x4036('0xf4'),_0x31a22f,_0x574453,_0x587681[_0x4036('0x13a')]()[_0x4036('0x64e')]);if(_0x1df870[_0x4036('0x399')])_0x4add03[_0x4036('0x5d7')](_0x4036('0x2ed'));for(const _0x3b5e8d of _0x574453){if('RqHYg'!==_0x4036('0x62c')){if(!_0x3b5e8d)continue;if(_0x1df870[_0x4036('0x361')])_0x4add03[_0x4036('0x5d7')](_0x4036('0x6b7'),_0x31a22f,_0x3b5e8d);}else{function _0x249600(){_0xbf2de[_0x4036('0x5f')]&&_0x29ed74['endAnimation']();}}}if(_0x1df870[_0x4036('0x572')])_0x4add03[_0x4036('0x5d7')](_0x4036('0x521'),_0x31a22f,_0x574453,![]);_0x595f4d[_0x4036('0x310')](_0x4036('0x6ea'));}),PluginManager[_0x4036('0xf2')](pluginData[_0x4036('0x37d')],'ActSeq_Set_TargetActionSet',_0x224f16=>{if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x4036('0x653')](_0x224f16,_0x224f16);const _0x586119=$gameTemp[_0x4036('0x3df')](),_0x5219e2=BattleManager['_action'],_0x18909f=BattleManager[_0x4036('0x398')],_0x432ee1=BattleManager[_0x4036('0x570')]?BattleManager[_0x4036('0x570')][_0x4036('0x638')](0x0):[],_0x379396=BattleManager[_0x4036('0x3b4')];if(!_0x586119||!_0x5219e2||!_0x18909f)return;if(!_0x5219e2[_0x4036('0x13a')]())return;for(const _0x508a5d of _0x432ee1){if(!_0x508a5d)continue;if(_0x224f16[_0x4036('0x474')])_0x379396[_0x4036('0x5d7')](_0x4036('0x4e8'),_0x18909f,_0x5219e2);if(_0x224f16[_0x4036('0x686')]>0x0)_0x379396[_0x4036('0x5d7')](_0x4036('0x7ee'),_0x224f16[_0x4036('0x686')]);if(_0x224f16[_0x4036('0x82')])_0x379396[_0x4036('0x5d7')](_0x4036('0xf4'),_0x18909f,[_0x508a5d],_0x5219e2['item']()[_0x4036('0x64e')]);if(_0x224f16[_0x4036('0x2a7')]>0x0)_0x379396[_0x4036('0x5d7')]('waitCount',_0x224f16[_0x4036('0x2a7')]);if(_0x224f16['ActionEffect'])_0x379396['push'](_0x4036('0x6b7'),_0x18909f,_0x508a5d);}if(_0x224f16[_0x4036('0x572')])_0x379396[_0x4036('0x5d7')](_0x4036('0x521'),_0x18909f,_0x432ee1,![]);_0x586119[_0x4036('0x310')](_0x4036('0x6ea'));}),PluginManager['registerCommand'](pluginData['name'],_0x4036('0x3bf'),_0xdc52d2=>{if(!SceneManager[_0x4036('0x78a')]())return;VisuMZ[_0x4036('0x653')](_0xdc52d2,_0xdc52d2);const _0x37b820=$gameTemp[_0x4036('0x3df')](),_0x2c4fce=BattleManager[_0x4036('0x376')],_0x70af49=BattleManager[_0x4036('0x398')],_0x1667f1=BattleManager[_0x4036('0x570')]?BattleManager[_0x4036('0x570')][_0x4036('0x638')](0x0):[],_0x14120b=BattleManager[_0x4036('0x3b4')];if(!_0x37b820||!_0x2c4fce||!_0x70af49)return;if(!_0x2c4fce[_0x4036('0x13a')]())return;if(_0xdc52d2[_0x4036('0x572')])_0x14120b[_0x4036('0x5d7')]('applyImmortal',_0x70af49,_0x1667f1,![]);if(_0xdc52d2[_0x4036('0x2dd')])_0x14120b[_0x4036('0x5d7')](_0x4036('0x18d'));if(_0xdc52d2[_0x4036('0x157')])_0x14120b[_0x4036('0x5d7')](_0x4036('0x322'));if(_0xdc52d2[_0x4036('0x3be')])_0x14120b[_0x4036('0x5d7')](_0x4036('0x47b'));if(_0xdc52d2[_0x4036('0x537')])_0x14120b[_0x4036('0x5d7')]('performActionEnd',_0x70af49);if(_0xdc52d2[_0x4036('0x735')])_0x14120b[_0x4036('0x5d7')](_0x4036('0x483'));_0x37b820[_0x4036('0x310')]('battlelog');}),PluginManager[_0x4036('0xf2')](pluginData[_0x4036('0x37d')],_0x4036('0x81f'),_0x4b9250=>{if(!SceneManager[_0x4036('0x78a')]())return;if(!Imported[_0x4036('0x5a5')])return;VisuMZ['ConvertParams'](_0x4b9250,_0x4b9250);const _0x567af2=$gameTemp[_0x4036('0x3df')](),_0x4f3314=_0x4b9250[_0x4036('0x5b5')];if(!_0x567af2)return;$gameScreen[_0x4036('0x2ab')](_0x4b9250[_0x4036('0x229')],_0x4b9250['Duration'],_0x4b9250[_0x4036('0x1e3')]);if(_0x4f3314)_0x567af2[_0x4036('0x310')](_0x4036('0x405'));}),PluginManager[_0x4036('0xf2')](pluginData[_0x4036('0x37d')],_0x4036('0x154'),_0x125530=>{if(!SceneManager[_0x4036('0x78a')]())return;if(!Imported[_0x4036('0x5a5')])return;VisuMZ[_0x4036('0x653')](_0x125530,_0x125530);const _0x464b6f=$gameTemp[_0x4036('0x3df')](),_0x4d3fdd=_0x125530[_0x4036('0x5b5')];if(!_0x464b6f)return;$gameScreen['setBattleAngle'](0x0,_0x125530[_0x4036('0x346')],_0x125530[_0x4036('0x1e3')]);if(_0x4d3fdd)_0x464b6f['setWaitMode'](_0x4036('0x405'));}),PluginManager[_0x4036('0xf2')](pluginData['name'],_0x4036('0x17a'),_0x3ba624=>{if(!SceneManager[_0x4036('0x78a')]())return;if(!Imported[_0x4036('0x5a5')])return;const _0x242d1c=$gameTemp[_0x4036('0x3df')]();if(!_0x242d1c)return;_0x242d1c[_0x4036('0x310')](_0x4036('0x405'));}),PluginManager['registerCommand'](pluginData[_0x4036('0x37d')],_0x4036('0xa7'),_0x16cf5f=>{if(!SceneManager[_0x4036('0x78a')]())return;VisuMZ[_0x4036('0x653')](_0x16cf5f,_0x16cf5f);const _0x1089c1=$gameTemp[_0x4036('0x3df')](),_0x19040e=BattleManager['_action'],_0x34949f=BattleManager['_subject'],_0x4265f8=VisuMZ['CreateActionSequenceTargets'](_0x16cf5f[_0x4036('0xff')]),_0xe072b3=_0x16cf5f['Mirror'],_0x1bbb24=BattleManager[_0x4036('0x3b4')];if(!_0x1089c1||!_0x19040e||!_0x34949f)return;if(!_0x19040e['item']())return;let _0xca85a7=_0x19040e['item']()[_0x4036('0x64e')];if(_0xca85a7<0x0)_0xca85a7=_0x34949f[_0x4036('0x2ff')]();$gameTemp[_0x4036('0x507')](_0x4265f8,_0xca85a7,_0xe072b3);if(_0x16cf5f['WaitForAnimation']){if('AENYT'!==_0x4036('0x4e9'))_0x1089c1[_0x4036('0x310')](_0x4036('0xa3'));else{function _0x1b34db(){this['_cache']['svAnchorY']=_0x5f0864[_0x4036('0x24d')][_0x4036('0x24c')][_0x4036('0x286')](this);}}}}),PluginManager['registerCommand'](pluginData[_0x4036('0x37d')],_0x4036('0x258'),_0x1425fc=>{if(!SceneManager[_0x4036('0x78a')]())return;VisuMZ[_0x4036('0x653')](_0x1425fc,_0x1425fc);const _0x1d15e1=$gameTemp[_0x4036('0x3df')](),_0x154378=BattleManager[_0x4036('0x398')],_0x49e6cc=VisuMZ[_0x4036('0xb0')](_0x1425fc[_0x4036('0xff')]),_0x54562a=_0x1425fc['Mirror'],_0x338f26=BattleManager['_logWindow'];if(!_0x1d15e1||!_0x154378)return;const _0x3ca5e1=_0x154378[_0x4036('0x2ff')]();$gameTemp[_0x4036('0x507')](_0x49e6cc,_0x3ca5e1,_0x54562a);if(_0x1425fc[_0x4036('0x399')]){if('kxLGo'==='ecgFi'){function _0x1a75c5(){return _0x2f6b24['aliveMembers']()[_0x4036('0x638')](0x0);}}else _0x1d15e1['setWaitMode'](_0x4036('0xa3'));}}),PluginManager[_0x4036('0xf2')](pluginData[_0x4036('0x37d')],_0x4036('0x61'),_0xe99d89=>{if(!SceneManager[_0x4036('0x78a')]())return;VisuMZ[_0x4036('0x653')](_0xe99d89,_0xe99d89);const _0x16474a=$gameTemp[_0x4036('0x3df')](),_0x57390c=BattleManager[_0x4036('0x376')],_0x4ee57e=_0xe99d89[_0x4036('0x2aa')],_0x311cd2=VisuMZ[_0x4036('0xb0')](_0xe99d89[_0x4036('0xff')]);if(!_0x16474a||!_0x57390c)return;if(!_0x57390c[_0x4036('0x13a')]())return;for(const _0x3f59e0 of _0x311cd2){if(!_0x3f59e0)continue;_0x3f59e0[_0x4036('0x3ea')](_0x57390c,_0x4ee57e);}if(_0xe99d89[_0x4036('0x399')])_0x16474a['setWaitMode'](_0x4036('0xa3'));}),PluginManager[_0x4036('0xf2')](pluginData[_0x4036('0x37d')],_0x4036('0x48c'),_0x15fc33=>{VisuMZ[_0x4036('0x653')](_0x15fc33,_0x15fc33);const _0x1c452f=$gameTemp[_0x4036('0x3df')](),_0x5704ad=VisuMZ[_0x4036('0xb0')](_0x15fc33['Targets']),_0x2a472a=_0x15fc33[_0x4036('0x2b2')];if(!_0x2a472a)return;for(const _0xc6b0ea of _0x5704ad){if(!_0xc6b0ea)continue;if(!_0xc6b0ea['isActor']())continue;_0xc6b0ea[_0x4036('0x618')](_0x2a472a);}}),PluginManager[_0x4036('0xf2')](pluginData[_0x4036('0x37d')],_0x4036('0x628'),_0xfd262b=>{if(!SceneManager[_0x4036('0x78a')]())return;VisuMZ[_0x4036('0x653')](_0xfd262b,_0xfd262b);const _0x2c71da=$gameTemp[_0x4036('0x3df')](),_0x25a9ae=VisuMZ[_0x4036('0xb0')](_0xfd262b['Targets']),_0x1b6e78=_0xfd262b[_0x4036('0x323')],_0x840a65=_0xfd262b['Mirror'];if(!_0x2c71da)return;$gameTemp['requestAnimation'](_0x25a9ae,_0x1b6e78,_0x840a65);if(_0xfd262b['WaitForAnimation'])_0x2c71da[_0x4036('0x310')]('battleAnimation');}),PluginManager[_0x4036('0xf2')](pluginData[_0x4036('0x37d')],_0x4036('0x7dd'),_0x4a6128=>{if(!SceneManager[_0x4036('0x78a')]())return;const _0x35fc5b=$gameTemp[_0x4036('0x3df')]();if(!_0x35fc5b)return;_0x35fc5b[_0x4036('0x310')](_0x4036('0xa3'));}),PluginManager[_0x4036('0xf2')](pluginData[_0x4036('0x37d')],_0x4036('0x3ba'),_0x1af395=>{if(!SceneManager[_0x4036('0x78a')]())return;VisuMZ[_0x4036('0x653')](_0x1af395,_0x1af395);const _0x32bbcc=BattleManager[_0x4036('0x3b4')];_0x32bbcc[_0x4036('0x596')](_0x1af395[_0x4036('0x7db')]);}),PluginManager[_0x4036('0xf2')](pluginData[_0x4036('0x37d')],'ActSeq_BattleLog_Clear',_0x3f1e46=>{if(!SceneManager['isSceneBattle']())return;const _0x2c07ea=BattleManager[_0x4036('0x3b4')];_0x2c07ea[_0x4036('0x47b')]();}),PluginManager[_0x4036('0xf2')](pluginData[_0x4036('0x37d')],_0x4036('0x131'),_0x4b23b1=>{if(!SceneManager[_0x4036('0x78a')]())return;const _0x26c1b9=$gameTemp[_0x4036('0x3df')](),_0x6bd3a6=BattleManager['_action'],_0x59b3a1=BattleManager[_0x4036('0x398')],_0xf7994f=BattleManager[_0x4036('0x3b4')];if(!_0x26c1b9||!_0x6bd3a6||!_0x59b3a1)return;if(!_0x6bd3a6[_0x4036('0x13a')]())return;_0xf7994f[_0x4036('0x3c0')](_0x59b3a1,_0x6bd3a6[_0x4036('0x13a')]()),_0x26c1b9['setWaitMode'](_0x4036('0x6ea'));}),PluginManager[_0x4036('0xf2')](pluginData[_0x4036('0x37d')],_0x4036('0x388'),_0x66b511=>{if(!SceneManager[_0x4036('0x78a')]())return;const _0x168665=BattleManager[_0x4036('0x3b4')];_0x168665[_0x4036('0x1fb')]();}),PluginManager[_0x4036('0xf2')](pluginData[_0x4036('0x37d')],'ActSeq_BattleLog_PushBaseLine',_0x23a46a=>{if(!SceneManager[_0x4036('0x78a')]())return;const _0x315e53=BattleManager[_0x4036('0x3b4')];_0x315e53[_0x4036('0x78e')]();}),PluginManager[_0x4036('0xf2')](pluginData[_0x4036('0x37d')],_0x4036('0x4a5'),_0xdd4587=>{if(!SceneManager[_0x4036('0x78a')]())return;const _0x1eba58=BattleManager[_0x4036('0x3b4')];_0x1eba58['refresh']();}),PluginManager[_0x4036('0xf2')](pluginData['name'],_0x4036('0x60b'),_0x3d76e7=>{if(!SceneManager[_0x4036('0x78a')]())return;VisuMZ[_0x4036('0x653')](_0x3d76e7,_0x3d76e7),SceneManager[_0x4036('0x423')][_0x4036('0x623')](_0x3d76e7[_0x4036('0x2c0')]);}),PluginManager[_0x4036('0xf2')](pluginData['name'],_0x4036('0x446'),_0x34133f=>{if(!SceneManager[_0x4036('0x78a')]())return;const _0x128b81=$gameTemp['getLastPluginCommandInterpreter']();_0x128b81[_0x4036('0x310')]('battlelog');}),PluginManager[_0x4036('0xf2')](pluginData[_0x4036('0x37d')],'ActSeq_BattleLog_WaitForNewLine',_0x4814d8=>{if(!SceneManager['isSceneBattle']())return;const _0x382499=$gameTemp[_0x4036('0x3df')](),_0xbde9fd=BattleManager[_0x4036('0x3b4')];_0xbde9fd[_0x4036('0x18d')](),_0x382499[_0x4036('0x310')](_0x4036('0x6ea'));}),PluginManager['registerCommand'](pluginData[_0x4036('0x37d')],_0x4036('0x97'),_0x2f618c=>{if(!SceneManager[_0x4036('0x78a')]())return;if(!Imported[_0x4036('0x5a5')])return;VisuMZ[_0x4036('0x653')](_0x2f618c,_0x2f618c);const _0x5138d1=$gameScreen[_0x4036('0x3d8')]();_0x5138d1['cameraClamp']=_0x2f618c[_0x4036('0x3d3')];}),PluginManager['registerCommand'](pluginData[_0x4036('0x37d')],_0x4036('0x795'),_0x4e2a45=>{if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x4036('0x5a5')])return;VisuMZ['ConvertParams'](_0x4e2a45,_0x4e2a45);const _0x49c90a=$gameTemp['getLastPluginCommandInterpreter'](),_0x5c97af=_0x4e2a45[_0x4036('0x5d3')];$gameScreen[_0x4036('0x62b')](_0x4e2a45['FocusX'],_0x4e2a45['FocusY'],_0x4e2a45[_0x4036('0x346')],_0x4e2a45[_0x4036('0x1e3')]);if(_0x5c97af)_0x49c90a[_0x4036('0x310')](_0x4036('0x4f7'));}),PluginManager[_0x4036('0xf2')](pluginData[_0x4036('0x37d')],_0x4036('0x404'),_0x59165a=>{if(!SceneManager[_0x4036('0x78a')]())return;if(!Imported[_0x4036('0x5a5')])return;VisuMZ['ConvertParams'](_0x59165a,_0x59165a);const _0x4fcc78=$gameTemp[_0x4036('0x3df')](),_0x4a79cd=VisuMZ[_0x4036('0xb0')](_0x59165a[_0x4036('0xff')]),_0x5c06e5=_0x59165a[_0x4036('0x5d3')];$gameScreen[_0x4036('0x31c')](_0x4a79cd,_0x59165a['Duration'],_0x59165a[_0x4036('0x1e3')]);if(_0x5c06e5)_0x4fcc78[_0x4036('0x310')](_0x4036('0x4f7'));}),PluginManager[_0x4036('0xf2')](pluginData[_0x4036('0x37d')],_0x4036('0x4ca'),_0x3489ee=>{if(!SceneManager[_0x4036('0x78a')]())return;if(!Imported['VisuMZ_3_ActSeqCamera'])return;VisuMZ[_0x4036('0x653')](_0x3489ee,_0x3489ee);const _0x4fd1c4=$gameTemp[_0x4036('0x3df')](),_0x469120=_0x3489ee[_0x4036('0x5d3')];$gameScreen[_0x4036('0x50e')](_0x3489ee[_0x4036('0x790')],_0x3489ee[_0x4036('0x5a7')],_0x3489ee[_0x4036('0x346')],_0x3489ee[_0x4036('0x1e3')]);if(_0x469120)_0x4fd1c4[_0x4036('0x310')](_0x4036('0x4f7'));}),PluginManager[_0x4036('0xf2')](pluginData[_0x4036('0x37d')],_0x4036('0x37e'),_0x4577e1=>{if(!SceneManager[_0x4036('0x78a')]())return;if(!Imported[_0x4036('0x5a5')])return;VisuMZ[_0x4036('0x653')](_0x4577e1,_0x4577e1);const _0x28cfa8=$gameTemp[_0x4036('0x3df')](),_0x41569d=_0x4577e1[_0x4036('0x47c')],_0x1ecbc3=_0x4577e1[_0x4036('0x1c4')],_0x34e6d6=_0x4577e1[_0x4036('0x5d3')];if(_0x41569d){const _0x5b0bf9=Math[_0x4036('0x488')](Graphics['width']/0x2),_0x49e8e0=Math[_0x4036('0x488')](Graphics[_0x4036('0x28f')]/0x2);$gameScreen['setBattleCameraPoint'](_0x5b0bf9,_0x49e8e0,_0x4577e1[_0x4036('0x346')],_0x4577e1[_0x4036('0x1e3')]);}if(_0x1ecbc3){if(_0x4036('0x493')!==_0x4036('0x7ff'))$gameScreen['setBattleCameraOffset'](0x0,0x0,_0x4577e1['Duration'],_0x4577e1[_0x4036('0x1e3')]);else{function _0x589e49(){if(!_0x12557f['isSceneBattle']())return;if(!_0x2c2890[_0x4036('0x5a5')])return;const _0x2f4bb2=_0xdc672f[_0x4036('0x3df')]();if(!_0x2f4bb2)return;_0x2f4bb2[_0x4036('0x310')](_0x4036('0x22f'));}}}if(_0x34e6d6)_0x28cfa8[_0x4036('0x310')](_0x4036('0x4f7'));}),PluginManager[_0x4036('0xf2')](pluginData[_0x4036('0x37d')],_0x4036('0x487'),_0x15a83a=>{if(!SceneManager[_0x4036('0x78a')]())return;if(!Imported[_0x4036('0x5a5')])return;const _0xd0f107=$gameTemp[_0x4036('0x3df')]();if(!_0xd0f107)return;_0xd0f107[_0x4036('0x310')]('battleCamera');}),PluginManager[_0x4036('0xf2')](pluginData[_0x4036('0x37d')],_0x4036('0x450'),_0x41ec27=>{if(!SceneManager[_0x4036('0x78a')]())return;if(!Imported[_0x4036('0xf')])return;VisuMZ['ConvertParams'](_0x41ec27,_0x41ec27);const _0x5cd5fe=VisuMZ[_0x4036('0xb0')](_0x41ec27[_0x4036('0xff')]),_0x2ff35d=_0x41ec27[_0x4036('0x2fb')]['toLowerCase']()[_0x4036('0x330')]();for(const _0x42b7c2 of _0x5cd5fe){if(!_0x42b7c2)continue;_0x42b7c2[_0x4036('0x7f3')](_0x2ff35d);}}),PluginManager[_0x4036('0xf2')](pluginData[_0x4036('0x37d')],_0x4036('0x262'),_0x4b5f9d=>{if(!SceneManager[_0x4036('0x78a')]())return;if(!Imported[_0x4036('0xf')])return;VisuMZ[_0x4036('0x653')](_0x4b5f9d,_0x4b5f9d);const _0x8bb986=VisuMZ[_0x4036('0xb0')](_0x4b5f9d[_0x4036('0xff')]),_0x4e7bf6=_0x4b5f9d[_0x4036('0x2d3')];for(const _0x52b3e6 of _0x8bb986){if(_0x4036('0x4ba')===_0x4036('0x4ba')){if(!_0x52b3e6)continue;_0x52b3e6['dragonbonesData']()[_0x4036('0x146')]=_0x4e7bf6;}else{function _0xb1d49b(){const _0x1694ed=_0x2327f4[_0x2ccbba];if(_0x1694ed)_0x5c3aab[_0x4036('0x5d7')](_0x2a499d[_0x4036('0x2bf')](_0x1694ed));}}}}),PluginManager[_0x4036('0xf2')](pluginData[_0x4036('0x37d')],_0x4036('0x520'),_0x253b41=>{if(!SceneManager[_0x4036('0x78a')]())return;if(!Imported['VisuMZ_1_ElementStatusCore'])return;VisuMZ[_0x4036('0x653')](_0x253b41,_0x253b41);const _0x4c4a54=BattleManager[_0x4036('0x376')],_0x28d017=_0x253b41['Elements'];if(!_0x4c4a54)return;_0x4c4a54[_0x4036('0x470')]=_0x28d017;}),PluginManager[_0x4036('0xf2')](pluginData[_0x4036('0x37d')],_0x4036('0x3f4'),_0x24766d=>{if(!SceneManager[_0x4036('0x78a')]())return;if(!Imported[_0x4036('0xc9')])return;const _0x43afcb=BattleManager[_0x4036('0x376')];if(!_0x43afcb)return;_0x43afcb[_0x4036('0x5d0')]();}),PluginManager[_0x4036('0xf2')](pluginData[_0x4036('0x37d')],_0x4036('0x62'),_0x20659a=>{if(!SceneManager[_0x4036('0x78a')]())return;if(!Imported[_0x4036('0xc9')])return;VisuMZ['ConvertParams'](_0x20659a,_0x20659a);const _0x3beea6=BattleManager[_0x4036('0x376')],_0x515429=_0x20659a[_0x4036('0x519')];if(!_0x3beea6)return;_0x3beea6[_0x4036('0x259')]=_0x515429;}),PluginManager[_0x4036('0xf2')](pluginData[_0x4036('0x37d')],_0x4036('0x2f1'),_0x22461e=>{if(!SceneManager[_0x4036('0x78a')]())return;if(!Imported['VisuMZ_1_ElementStatusCore'])return;const _0x570b3d=BattleManager[_0x4036('0x376')];if(!_0x570b3d)return;_0x570b3d[_0x4036('0x46')]=!![];}),PluginManager[_0x4036('0xf2')](pluginData[_0x4036('0x37d')],'ActSeq_Mechanics_ActionEffect',_0x377800=>{if(!SceneManager['isSceneBattle']())return;VisuMZ['ConvertParams'](_0x377800,_0x377800);const _0x1be35c=$gameTemp[_0x4036('0x3df')](),_0xcd3d70=BattleManager[_0x4036('0x376')],_0x22ce49=BattleManager[_0x4036('0x398')],_0x30b5d8=BattleManager[_0x4036('0x3b4')];if(!_0x1be35c||!_0xcd3d70||!_0x22ce49)return;if(!_0xcd3d70[_0x4036('0x13a')]())return;const _0x3264a5=VisuMZ[_0x4036('0xb0')](_0x377800[_0x4036('0xff')]);for(const _0x19fef5 of _0x3264a5){if(_0x4036('0x15e')!==_0x4036('0x27b')){if(!_0x19fef5)continue;_0x30b5d8['push']('actionEffect',_0x22ce49,_0x19fef5);}else{function _0x3621e8(){this['_statusWindow'][_0x4036('0x297')](),this[_0x4036('0x810')][_0x4036('0x19f')]();}}}_0x1be35c[_0x4036('0x310')](_0x4036('0x6ea'));}),PluginManager[_0x4036('0xf2')](pluginData[_0x4036('0x37d')],_0x4036('0x541'),_0x45a217=>{if(!SceneManager[_0x4036('0x78a')]())return;VisuMZ[_0x4036('0x653')](_0x45a217,_0x45a217);const _0x543608=[_0x4036('0x1d'),_0x4036('0x566'),_0x4036('0x468'),_0x4036('0x3d4'),_0x4036('0x45c'),_0x4036('0x713'),'AGI',_0x4036('0x32c')],_0x110be1=_0x45a217[_0x4036('0x2de')],_0x24949a=_0x45a217[_0x4036('0x5e7')],_0xb2cec0=_0x45a217[_0x4036('0x512')],_0x412dfc=VisuMZ[_0x4036('0xb0')](_0x45a217[_0x4036('0xff')]);for(const _0x40dbc6 of _0x412dfc){if(!_0x40dbc6)continue;for(const _0x56d2c0 of _0x110be1){const _0x34824f=_0x543608['indexOf'](_0x56d2c0[_0x4036('0x6bc')]()['trim']());_0x34824f>=0x0&&_0x34824f<=0x7&&_0x40dbc6[_0x4036('0x1bd')](_0x34824f,_0xb2cec0);}for(const _0x6796ef of _0x24949a){const _0x1147dc=_0x543608['indexOf'](_0x6796ef[_0x4036('0x6bc')]()[_0x4036('0x330')]());_0x1147dc>=0x0&&_0x1147dc<=0x7&&_0x40dbc6[_0x4036('0x772')](_0x1147dc,_0xb2cec0);}}}),PluginManager['registerCommand'](pluginData[_0x4036('0x37d')],_0x4036('0x734'),_0x1f42cf=>{if(!SceneManager[_0x4036('0x78a')]())return;VisuMZ[_0x4036('0x653')](_0x1f42cf,_0x1f42cf);const _0x4c2819=_0x1f42cf[_0x4036('0x2ad')],_0x57a47e=VisuMZ[_0x4036('0xb0')](_0x1f42cf['Targets']);for(const _0xba598d of _0x57a47e){if(_0x4036('0x81c')!==_0x4036('0x6f0')){if(!_0xba598d)continue;for(const _0x3ef1d5 of _0x4c2819){_0xba598d['addState'](_0x3ef1d5);}}else{function _0x220974(){if(!this[_0x4036('0x281')]())return;if(!this[_0x4036('0x312')])return;if(this[_0x4036('0x61a')]===_0x447b5f&&this[_0x4036('0x472')]===_0x73db08)return;this[_0x4036('0x61a')]=_0x9888f,this[_0x4036('0x472')]=_0x5ec919,this[_0x4036('0x29a')]=_0x977cf0,this[_0x4036('0x6be')]=_0x56b09f,this[_0x4036('0x50f')]=_0x144654||_0x4036('0x167'),_0xba6c6e<=0x0&&(this['_growX']=this['_targetGrowX'],this[_0x4036('0x253')]=this[_0x4036('0x472')]);}}}}),PluginManager['registerCommand'](pluginData[_0x4036('0x37d')],'ActSeq_Mechanics_ArmorPenetration',_0x3eb7d2=>{if(!SceneManager[_0x4036('0x78a')]())return;VisuMZ['ConvertParams'](_0x3eb7d2,_0x3eb7d2);const _0x4ea7db=BattleManager[_0x4036('0x376')],_0x12821a={'arPenRate':_0x3eb7d2[_0x4036('0x2f5')],'arPenFlat':_0x3eb7d2['ArPenFlat'],'arRedRate':_0x3eb7d2[_0x4036('0x25d')],'arRedFlat':_0x3eb7d2[_0x4036('0x597')]};_0x4ea7db[_0x4036('0x634')]=_0x12821a;}),PluginManager[_0x4036('0xf2')](pluginData[_0x4036('0x37d')],_0x4036('0x6b2'),_0x1806bf=>{if(!SceneManager[_0x4036('0x78a')]())return;VisuMZ[_0x4036('0x653')](_0x1806bf,_0x1806bf);const _0xa6fda5=VisuMZ[_0x4036('0xb0')](_0x1806bf[_0x4036('0xff')]),_0x5bbbb7=_0x1806bf[_0x4036('0x18a')],_0x2cb948=_0x1806bf[_0x4036('0x18a')],_0x3b3566=_0x1806bf[_0x4036('0x414')];for(const _0x12e5f8 of _0xa6fda5){if(_0x4036('0x41e')===_0x4036('0x41e')){if(!_0x12e5f8)continue;if(_0x12e5f8[_0x4036('0x111')]()){if(_0x4036('0x197')===_0x4036('0x9e')){function _0x45d24c(){return this[_0x4036('0x696')]()['some'](_0x2bc07e=>_0x2bc07e[_0x4036('0x14c')]());}}else _0x12e5f8[_0x4036('0xae')](_0x5bbbb7);}else{if(_0x12e5f8[_0x4036('0xf1')]()){_0x12e5f8[_0x4036('0x6ca')](_0x5bbbb7);if(_0x3b3566)_0x12e5f8[_0x4036('0x491')]();}}}else{function _0x3db988(){this['x']=this[_0x4036('0x819')]()[_0x4036('0x304')]()[_0x4036('0x7b6')];}}}}),PluginManager[_0x4036('0xf2')](pluginData[_0x4036('0x37d')],_0x4036('0x5d9'),_0x5cd855=>{if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x4036('0x653')](_0x5cd855,_0x5cd855);const _0x389728=$gameTemp['getLastPluginCommandInterpreter'](),_0x3210e4=BattleManager[_0x4036('0x376')],_0x417d2e=BattleManager['_subject'];if(!_0x389728||!_0x3210e4||!_0x417d2e)return;if(!_0x3210e4[_0x4036('0x13a')]())return;const _0x5ee5e6=VisuMZ[_0x4036('0xb0')](_0x5cd855[_0x4036('0xff')]);for(const _0x20cf41 of _0x5ee5e6){if(!_0x20cf41)continue;_0x5cd855[_0x4036('0x756')]&&(_0x20cf41[_0x4036('0x64d')](),_0x20cf41['addState'](_0x20cf41[_0x4036('0x1ca')]()));if(_0x20cf41[_0x4036('0x5ee')]())_0x20cf41[_0x4036('0x1e8')]();}_0x389728['setWaitMode'](_0x4036('0x102'));}),PluginManager[_0x4036('0xf2')](pluginData[_0x4036('0x37d')],'ActSeq_Mechanics_DamagePopup',_0x4c3c33=>{if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x4036('0x653')](_0x4c3c33,_0x4c3c33);const _0x309a8d=VisuMZ['CreateActionSequenceTargets'](_0x4c3c33['Targets']);for(const _0x540acc of _0x309a8d){if(!_0x540acc)continue;if(_0x540acc[_0x4036('0x42e')]())_0x540acc[_0x4036('0x1a3')]();}}),PluginManager[_0x4036('0xf2')](pluginData[_0x4036('0x37d')],_0x4036('0x2b0'),_0x18fa92=>{if(!SceneManager[_0x4036('0x78a')]())return;VisuMZ[_0x4036('0x653')](_0x18fa92,_0x18fa92);const _0x1963e7=$gameTemp[_0x4036('0x3df')](),_0x4fe667=BattleManager[_0x4036('0x398')],_0x547222=_0x18fa92[_0x4036('0x719')];if(!_0x1963e7)return;if(!_0x4fe667)return;if(_0x4fe667&&_0x4fe667[_0x4036('0x416')]()&&_0x547222[_0x4036('0x6bc')]()[_0x4036('0x330')]()!==_0x4036('0x630')){if(_0x4036('0x82c')!==_0x4036('0x616'))_0x1963e7[_0x4036('0x4bd')]([_0x547222]);else{function _0x5c84a3(){const _0x180abd=this[_0x4036('0xab')][_0x4036('0x171')](),_0x25cf72=_0x180abd[0x0];return _0x25cf72[_0x4036('0x5ca')]=_0x25cf72['_actions']||[],_0x25cf72[_0x4036('0x5ca')][0x0]=_0x180abd[0x1],_0x25cf72;}}}}),PluginManager[_0x4036('0xf2')](pluginData[_0x4036('0x37d')],_0x4036('0x673'),_0x40538b=>{if(!SceneManager[_0x4036('0x78a')]())return;VisuMZ[_0x4036('0x653')](_0x40538b,_0x40538b);const _0x38e614=VisuMZ[_0x4036('0xb0')](_0x40538b[_0x4036('0xff')]),_0x256876=_0x40538b[_0x4036('0x531')],_0x4fc812=_0x40538b[_0x4036('0x2e0')],_0x56ac18=_0x40538b[_0x4036('0x313')],_0xfcf739=_0x40538b[_0x4036('0x5b2')],_0x374d42=_0x40538b[_0x4036('0x485')],_0x3cfa61=_0x40538b[_0x4036('0x38a')],_0x132a61=_0x40538b[_0x4036('0x2b9')];for(const _0xe9cf of _0x38e614){if(!_0xe9cf)continue;const _0x10b979=Math['round'](_0x256876*_0xe9cf[_0x4036('0x51a')]+_0x4fc812),_0x5d1995=Math[_0x4036('0x488')](_0x56ac18*_0xe9cf['mmp']+_0xfcf739),_0x248adb=Math['round'](_0x374d42*_0xe9cf[_0x4036('0xfd')]()+_0x3cfa61);if(_0x10b979!==0x0)_0xe9cf['gainHp'](_0x10b979);if(_0x5d1995!==0x0)_0xe9cf[_0x4036('0x490')](_0x5d1995);if(_0x248adb!==0x0)_0xe9cf[_0x4036('0x5ac')](_0x248adb);if(_0x132a61)_0xe9cf[_0x4036('0x1a3')]();}}),PluginManager[_0x4036('0xf2')](pluginData[_0x4036('0x37d')],_0x4036('0x4ed'),_0x2559f7=>{if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x4036('0x653')](_0x2559f7,_0x2559f7);const _0x40db4d=VisuMZ[_0x4036('0xb0')](_0x2559f7[_0x4036('0xff')]);for(const _0x5730e6 of _0x40db4d){if(_0x4036('0x80b')!==_0x4036('0x80b')){function _0xe1cf45(){_0x3a2a90[_0x4036('0x600')][_0x4036('0x413')][_0x4036('0x286')](this),this[_0x4036('0x283')]();}}else{if(!_0x5730e6)continue;_0x5730e6[_0x4036('0x11c')](_0x2559f7[_0x4036('0x375')]);}}}),PluginManager[_0x4036('0xf2')](pluginData[_0x4036('0x37d')],_0x4036('0x1dc'),_0x4242c0=>{if(!SceneManager[_0x4036('0x78a')]())return;VisuMZ[_0x4036('0x653')](_0x4242c0,_0x4242c0);const _0x50468c=BattleManager[_0x4036('0x376')],_0xab9542={'criticalHitRate':_0x4242c0[_0x4036('0x459')],'criticalHitFlat':_0x4242c0[_0x4036('0x1cc')],'criticalDmgRate':_0x4242c0['CriticalDmgRate'],'criticalDmgFlat':_0x4242c0[_0x4036('0x72c')],'damageRate':_0x4242c0[_0x4036('0x770')],'damageFlat':_0x4242c0[_0x4036('0x62f')],'hitRate':_0x4242c0[_0x4036('0x10b')],'hitFlat':_0x4242c0[_0x4036('0x5db')]};_0x50468c[_0x4036('0x206')]=_0xab9542;}),PluginManager[_0x4036('0xf2')](pluginData[_0x4036('0x37d')],'ActSeq_Mechanics_RemoveBuffDebuff',_0x3e5f6d=>{if(!SceneManager[_0x4036('0x78a')]())return;VisuMZ[_0x4036('0x653')](_0x3e5f6d,_0x3e5f6d);const _0xb8aa69=[_0x4036('0x1d'),_0x4036('0x566'),'ATK','DEF','MAT',_0x4036('0x713'),_0x4036('0x219'),_0x4036('0x32c')],_0x284312=_0x3e5f6d['Buffs'],_0x590972=_0x3e5f6d[_0x4036('0x5e7')],_0x177053=VisuMZ[_0x4036('0xb0')](_0x3e5f6d[_0x4036('0xff')]);for(const _0x47974f of _0x177053){if(_0x4036('0x495')===_0x4036('0x2a9')){function _0xce6033(){this['_battler']['isSpriteVisible']()&&this[_0x4036('0x353')]();}}else{if(!_0x47974f)continue;for(const _0x4d2ef1 of _0x284312){const _0x13fc74=_0xb8aa69[_0x4036('0x419')](_0x4d2ef1[_0x4036('0x6bc')]()[_0x4036('0x330')]());_0x13fc74>=0x0&&_0x13fc74<=0x7&&_0x47974f['isBuffAffected'](_0x13fc74)&&_0x47974f[_0x4036('0x21d')](_0x13fc74);}for(const _0x32180b of _0x590972){if(_0x4036('0x65d')===_0x4036('0x567')){function _0x4b4f3c(){return this[_0x4036('0x80e')]||this;}}else{const _0x4ba6dc=_0xb8aa69[_0x4036('0x419')](_0x32180b[_0x4036('0x6bc')]()['trim']());_0x4ba6dc>=0x0&&_0x4ba6dc<=0x7&&_0x47974f[_0x4036('0x7a6')](_0x4ba6dc)&&_0x47974f[_0x4036('0x21d')](_0x4ba6dc);}}}}}),PluginManager[_0x4036('0xf2')](pluginData[_0x4036('0x37d')],'ActSeq_Mechanics_RemoveState',_0x3f496b=>{if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x4036('0x653')](_0x3f496b,_0x3f496b);const _0x1f64e9=_0x3f496b[_0x4036('0x2ad')],_0xccbaf=VisuMZ[_0x4036('0xb0')](_0x3f496b[_0x4036('0xff')]);for(const _0x1f0240 of _0xccbaf){if(!_0x1f0240)continue;for(const _0x30091f of _0x1f64e9){if('SsbiO'!==_0x4036('0x4b6')){function _0x70de67(){_0x56399c[_0x4036('0x600')][_0x4036('0x55')][_0x4036('0x286')](this),this[_0x4036('0x13a')]()['note'][_0x4036('0x161')](/<CUSTOM ACTION SEQUENCE>/i)&&(_0x552c7e[_0x4036('0x3e')]=[]);}}else _0x1f0240[_0x4036('0x454')](_0x30091f);}}}),PluginManager[_0x4036('0xf2')](pluginData[_0x4036('0x37d')],_0x4036('0x1b8'),_0xb4693f=>{if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x4036('0x653')](_0xb4693f,_0xb4693f);const _0x3fde25=VisuMZ[_0x4036('0xb0')](_0xb4693f[_0x4036('0xff')]),_0x3a86c4=_0xb4693f[_0x4036('0x7db')],_0x245ad5={'textColor':ColorManager['getColor'](_0xb4693f[_0x4036('0x562')]),'flashColor':_0xb4693f[_0x4036('0x63')],'flashDuration':_0xb4693f[_0x4036('0x309')]};for(const _0x1c2476 of _0x3fde25){if(_0x4036('0xb8')===_0x4036('0x295')){function _0x4cd348(){if(this[_0x4036('0x6ee')]())_0x599d8a['BattleCore'][_0x4036('0x214')][_0x4036('0x286')](this);}}else{if(!_0x1c2476)continue;_0x1c2476[_0x4036('0x5c6')](_0x3a86c4,_0x245ad5);}}}),PluginManager[_0x4036('0xf2')](pluginData[_0x4036('0x37d')],_0x4036('0x4f2'),_0x33909c=>{if(!SceneManager[_0x4036('0x78a')]())return;const _0x28acc3=$gameTemp[_0x4036('0x3df')]();if(!_0x28acc3)return;_0x28acc3['setWaitMode'](_0x4036('0x102'));}),PluginManager['registerCommand'](pluginData[_0x4036('0x37d')],_0x4036('0x255'),_0x423983=>{if(!SceneManager[_0x4036('0x78a')]())return;VisuMZ[_0x4036('0x653')](_0x423983,_0x423983);const _0x1d4d5a=VisuMZ[_0x4036('0xb0')](_0x423983[_0x4036('0xff')]),_0x1ca57f=_0x423983[_0x4036('0x2a5')][_0x4036('0x2c6')]()['trim'](),_0x18eac1=_0x423983[_0x4036('0x52e')];for(const _0x67ae1c of _0x1d4d5a){if(_0x4036('0x4dc')!==_0x4036('0x4dc')){function _0x27c384(){return _0x402787[_0x4036('0x6a0')]()['filter'](_0x135251=>_0x135251!==_0x19ebb1);}}else{if(!_0x67ae1c)continue;_0x1ca57f===_0x4036('0x676')?_0x67ae1c[_0x4036('0x73c')]():_0x67ae1c[_0x4036('0x530')](_0x1ca57f);if([_0x4036('0x676'),_0x4036('0x289'),_0x4036('0x374'),_0x4036('0x753')][_0x4036('0x747')](_0x1ca57f)){if('TMtCp'!==_0x4036('0x56b'))_0x67ae1c[_0x4036('0x425')]();else{function _0x80688d(){_0x360a3e[_0x4036('0x310')]('battleAnimation');}}}else _0x67ae1c[_0x4036('0x7c3')](0x0);}}}),PluginManager[_0x4036('0xf2')](pluginData[_0x4036('0x37d')],_0x4036('0x585'),_0xcc2f42=>{if(!SceneManager[_0x4036('0x78a')]())return;VisuMZ[_0x4036('0x653')](_0xcc2f42,_0xcc2f42);const _0x15d421=BattleManager[_0x4036('0x376')];if(!_0x15d421)return;if(!_0x15d421[_0x4036('0x13a')]())return;const _0x42b397=VisuMZ['CreateActionSequenceTargets'](_0xcc2f42['Targets']);for(const _0x557f74 of _0x42b397){if('SPGmO'!==_0x4036('0x34b')){if(!_0x557f74)continue;_0x557f74[_0x4036('0x4e8')](_0x15d421);}else{function _0x40b285(){return _0x752bd3[_0x4036('0x6a0')]()[_0x4036('0x3c4')](_0x279ea2=>_0x279ea2!==_0x220e52);}}}}),PluginManager[_0x4036('0xf2')](pluginData['name'],'ActSeq_Motion_RefreshMotion',_0x162863=>{if(!SceneManager['isSceneBattle']())return;VisuMZ['ConvertParams'](_0x162863,_0x162863);const _0x5600b8=VisuMZ['CreateActionSequenceTargets'](_0x162863[_0x4036('0xff')]);for(const _0x219b88 of _0x5600b8){if(_0x4036('0x144')!==_0x4036('0x144')){function _0x459169(){return this[_0x4036('0x2e3')](_0x4036('0x293'));}}else{if(!_0x219b88)continue;_0x219b88[_0x4036('0x56c')]();}}}),PluginManager[_0x4036('0xf2')](pluginData['name'],_0x4036('0x708'),_0x17afd3=>{if(!SceneManager[_0x4036('0x78a')]())return;VisuMZ[_0x4036('0x653')](_0x17afd3,_0x17afd3);const _0x4d0ff3=$gameTemp[_0x4036('0x3df')](),_0x2b1da7=_0x17afd3['MotionFrameWait']*Sprite_Battler[_0x4036('0x4c6')];_0x4d0ff3[_0x4036('0x712')](_0x2b1da7);}),PluginManager['registerCommand'](pluginData[_0x4036('0x37d')],_0x4036('0x7dc'),_0x3d6b42=>{if(!SceneManager[_0x4036('0x78a')]())return;VisuMZ[_0x4036('0x653')](_0x3d6b42,_0x3d6b42);const _0x1ba095=$gameTemp[_0x4036('0x3df')](),_0x2dad6e=BattleManager[_0x4036('0x376')];if(!_0x1ba095||!_0x2dad6e)return;if(!_0x2dad6e['item']())return;const _0x46288f=VisuMZ[_0x4036('0xb0')](_0x3d6b42[_0x4036('0xff')]);for(const _0x43eaac of _0x46288f){if(!_0x43eaac)continue;_0x43eaac[_0x4036('0x5a9')](_0x2dad6e);}if(_0x3d6b42[_0x4036('0x735')])_0x1ba095[_0x4036('0x310')](_0x4036('0x7c0'));}),PluginManager[_0x4036('0xf2')](pluginData[_0x4036('0x37d')],_0x4036('0x277'),_0x3ec78c=>{if(!SceneManager[_0x4036('0x78a')]())return;if(!$gameSystem[_0x4036('0x1c1')]())return;VisuMZ[_0x4036('0x653')](_0x3ec78c,_0x3ec78c);const _0x324fea=VisuMZ[_0x4036('0xb0')](_0x3ec78c[_0x4036('0xff')]);let _0x4fa609=_0x3ec78c['Direction'][_0x4036('0x161')](/back/i);for(const _0x15f203 of _0x324fea){if(_0x4036('0xf6')!==_0x4036('0x71')){if(!_0x15f203)continue;if(_0x3ec78c[_0x4036('0x7b9')][_0x4036('0x161')](/rand/i))_0x4fa609=Math[_0x4036('0x804')](0x2);_0x15f203[_0x4036('0x539')](!!_0x4fa609);}else{function _0x5057a5(){const _0x5135a9=new _0x40d38f(0x0,0x0,_0x386740[_0x4036('0x42')],_0xb8b799['height']);this[_0x4036('0x14f')]=new _0x1e7417(_0x5135a9),this[_0x4036('0x14f')][_0x4036('0x57b')]=0x0,this[_0x4036('0x356')](this[_0x4036('0x14f')]),this[_0x4036('0x76')]();}}}}),PluginManager[_0x4036('0xf2')](pluginData[_0x4036('0x37d')],_0x4036('0x7e3'),_0x148fe7=>{if(!SceneManager['isSceneBattle']())return;if(!$gameSystem[_0x4036('0x1c1')]())return;VisuMZ[_0x4036('0x653')](_0x148fe7,_0x148fe7);const _0x48617e=VisuMZ[_0x4036('0xb0')](_0x148fe7[_0x4036('0xff')]);let _0x224658=_0x148fe7[_0x4036('0x576')];const _0x24e6f1=_0x148fe7['FaceAway'];for(const _0x196717 of _0x48617e){if('XslVc'==='XslVc'){if(!_0x196717)continue;let _0x211f10=_0x196717[_0x4036('0x304')]()[_0x4036('0x7b6')],_0x15b107=_0x196717['battler']()['_baseY'];if(_0x224658[_0x4036('0x161')](/home/i))_0x211f10=_0x196717[_0x4036('0x304')]()[_0x4036('0x13b')],_0x15b107=_0x196717[_0x4036('0x304')]()[_0x4036('0x47d')];else{if(_0x224658[_0x4036('0x161')](/center/i)){if('WibJg'!=='WibJg'){function _0x2ab873(){if(!_0x2289d7[_0x4036('0x78a')]())return;if(!_0x516a9e[_0x4036('0x5a5')])return;_0x1ab236[_0x4036('0x653')](_0x42a249,_0x1cb50b);const _0xe157f9=_0x59b8b7['getLastPluginCommandInterpreter'](),_0xda359c=_0x761ae8[_0x4036('0xb0')](_0xa4e086[_0x4036('0xff')]),_0x1457e0=_0x498601['WaitForCamera'];_0x43a63f['setBattleCameraTargets'](_0xda359c,_0x1cd29f[_0x4036('0x346')],_0x679e2[_0x4036('0x1e3')]);if(_0x1457e0)_0xe157f9[_0x4036('0x310')](_0x4036('0x4f7'));}}else _0x211f10=Graphics[_0x4036('0x316')]/0x2,_0x15b107=Graphics[_0x4036('0x4f6')]/0x2;}else _0x224658[_0x4036('0x161')](/point (\d+), (\d+)/i)&&(_0x211f10=Number(RegExp['$1']),_0x15b107=Number(RegExp['$2']));}_0x196717[_0x4036('0x1f')](Math[_0x4036('0x488')](_0x211f10),Math['round'](_0x15b107),!!_0x24e6f1);}else{function _0x1e85f3(){if(!_0xa7d642[_0x4036('0x600')]['Settings'][_0x4036('0x54c')][_0x4036('0x69d')])return;const _0x55ca3a=_0x2cd0ef[_0x4036('0x3d2')](),_0x51d108=_0x55ca3a[_0x4036('0x1ff')]();for(const _0x285865 of _0x51d108){_0x285865['message4']&&(this[_0x4036('0x5d7')](_0x4036('0x1fb')),this[_0x4036('0x5d7')]('pushBaseLine'),this[_0x4036('0x5d7')]('addText',_0x285865[_0x4036('0x51d')][_0x4036('0x4d2')](_0x22a052[_0x4036('0x37d')]())),this[_0x4036('0x5d7')](_0x4036('0x712')));}}}}}),PluginManager[_0x4036('0xf2')](pluginData[_0x4036('0x37d')],'ActSeq_Movement_FaceTarget',_0x18ab08=>{if(!SceneManager[_0x4036('0x78a')]())return;if(!$gameSystem[_0x4036('0x1c1')]())return;VisuMZ[_0x4036('0x653')](_0x18ab08,_0x18ab08);const _0x4c972f=VisuMZ[_0x4036('0xb0')](_0x18ab08[_0x4036('0x2d4')]),_0x5d143d=VisuMZ[_0x4036('0xb0')](_0x18ab08[_0x4036('0x674')]),_0x2e1ef3=_0x5d143d[_0x4036('0x5a4')](_0x5a1acb=>_0x5a1acb&&_0x5a1acb[_0x4036('0x304')]()?_0x5a1acb['battler']()[_0x4036('0x7b6')]:0x0)/(_0x5d143d[_0x4036('0x6b5')]||0x1),_0x5438b9=_0x5d143d[_0x4036('0x5a4')](_0x32a89f=>_0x32a89f&&_0x32a89f[_0x4036('0x304')]()?_0x32a89f[_0x4036('0x304')]()[_0x4036('0x311')]:0x0)/(_0x5d143d[_0x4036('0x6b5')]||0x1),_0x1c82eb=_0x18ab08[_0x4036('0x2fd')];for(const _0x3ca2c9 of _0x4c972f){if(!_0x3ca2c9)continue;_0x3ca2c9[_0x4036('0x1f')](Math['round'](_0x2e1ef3),Math[_0x4036('0x488')](_0x5438b9),!!_0x1c82eb);}}),PluginManager[_0x4036('0xf2')](pluginData[_0x4036('0x37d')],_0x4036('0x5e1'),_0x1ffec0=>{if(!SceneManager[_0x4036('0x78a')]())return;VisuMZ['ConvertParams'](_0x1ffec0,_0x1ffec0);const _0x7de2ab=$gameTemp['getLastPluginCommandInterpreter'](),_0x100ebe=VisuMZ[_0x4036('0xb0')](_0x1ffec0[_0x4036('0xff')]),_0x365328=_0x1ffec0[_0x4036('0x4c7')],_0x778818=_0x1ffec0[_0x4036('0x346')],_0x23e5ca=_0x1ffec0[_0x4036('0x1e3')],_0x114278=_0x1ffec0[_0x4036('0x14')];if(!_0x7de2ab)return;for(const _0x3167b0 of _0x100ebe){if(_0x4036('0x70')===_0x4036('0x70')){if(!_0x3167b0)continue;_0x3167b0[_0x4036('0x6e8')](_0x365328,_0x778818,_0x23e5ca);}else{function _0x3e3022(){return _0x3c309b['_scene']['_spriteset']['_damageContainer'];}}}if(_0x114278)_0x7de2ab['setWaitMode'](_0x4036('0x5be'));}),PluginManager[_0x4036('0xf2')](pluginData[_0x4036('0x37d')],_0x4036('0xf8'),_0x3624f3=>{if(!SceneManager[_0x4036('0x78a')]())return;VisuMZ[_0x4036('0x653')](_0x3624f3,_0x3624f3);const _0x489124=$gameTemp['getLastPluginCommandInterpreter']();if(!_0x489124)return;const _0x59e71c=VisuMZ[_0x4036('0xb0')](_0x3624f3['Targets']);for(const _0x458102 of _0x59e71c){if(_0x4036('0x7f1')==='byvTc'){function _0x5ac088(){_0x4c0a5b=!_0x25bbb1;}}else{if(!_0x458102)continue;_0x458102[_0x4036('0x5a')]();}}if(_0x3624f3[_0x4036('0x735')])_0x489124[_0x4036('0x310')](_0x4036('0x7c0'));}),PluginManager[_0x4036('0xf2')](pluginData[_0x4036('0x37d')],_0x4036('0x180'),_0x5036d4=>{if(!SceneManager[_0x4036('0x78a')]())return;VisuMZ[_0x4036('0x653')](_0x5036d4,_0x5036d4);const _0x272da6=$gameTemp[_0x4036('0x3df')](),_0x376784=VisuMZ[_0x4036('0xb0')](_0x5036d4[_0x4036('0xff')]),_0x2c751a=_0x5036d4['Height'],_0x24c8fa=_0x5036d4['Duration'],_0x5a0961=_0x5036d4[_0x4036('0x5ea')];if(!_0x272da6)return;for(const _0x40c7f8 of _0x376784){if(_0x4036('0x68f')===_0x4036('0x68f')){if(!_0x40c7f8)continue;_0x40c7f8[_0x4036('0x422')](_0x2c751a,_0x24c8fa);}else{function _0x12946b(){if(!_0x52c30c[_0x4036('0x78a')]())return;const _0x28b8c5=_0x5a25e5[_0x4036('0x3df')]();if(!_0x28b8c5)return;_0x28b8c5[_0x4036('0x310')](_0x4036('0xa3'));}}}if(_0x5a0961)_0x272da6[_0x4036('0x310')](_0x4036('0x6c9'));}),PluginManager[_0x4036('0xf2')](pluginData[_0x4036('0x37d')],'ActSeq_Movement_MoveBy',_0x1a9bc7=>{if(!SceneManager[_0x4036('0x78a')]())return;if(!$gameSystem[_0x4036('0x1c1')]())return;VisuMZ[_0x4036('0x653')](_0x1a9bc7,_0x1a9bc7);const _0xf4ebb4=$gameTemp['getLastPluginCommandInterpreter'](),_0x3baebe=VisuMZ['CreateActionSequenceTargets'](_0x1a9bc7[_0x4036('0xff')]),_0x22e0bc=_0x1a9bc7[_0x4036('0x752')],_0x136333=_0x1a9bc7[_0x4036('0x727')],_0x804bd=_0x1a9bc7[_0x4036('0x805')],_0x52f8f6=_0x1a9bc7['Duration'],_0x5e729f=_0x1a9bc7['FaceDirection'],_0x1c4e45=_0x1a9bc7['EasingType'],_0x5251d8=_0x1a9bc7[_0x4036('0x2a5')],_0x646099=_0x1a9bc7['WaitForMovement'];if(!_0xf4ebb4)return;for(const _0x3da1f9 of _0x3baebe){if(_0x4036('0x619')===_0x4036('0x619')){if(!_0x3da1f9)continue;let _0xeb205a=_0x136333,_0x5115f8=_0x804bd;if(_0x22e0bc['match'](/horz/i))_0xeb205a*=_0x3da1f9[_0x4036('0x4a2')]()?-0x1:0x1;if(_0x22e0bc['match'](/vert/i))_0x5115f8*=_0x3da1f9[_0x4036('0x4a2')]()?-0x1:0x1;_0x3da1f9[_0x4036('0x3b2')](_0xeb205a,_0x5115f8,_0x52f8f6,_0x5e729f,_0x1c4e45),_0x3da1f9[_0x4036('0x530')](_0x5251d8);}else{function _0x4d0652(){_0x5674d2[_0x4036('0x2d1')]=![];}}}if(_0x646099)_0xf4ebb4[_0x4036('0x310')](_0x4036('0x7c0'));}),PluginManager[_0x4036('0xf2')](pluginData[_0x4036('0x37d')],_0x4036('0x236'),_0x183fa2=>{if(!SceneManager['isSceneBattle']())return;if(!$gameSystem[_0x4036('0x1c1')]())return;VisuMZ['ConvertParams'](_0x183fa2,_0x183fa2);const _0x195b02=$gameTemp['getLastPluginCommandInterpreter'](),_0x285b1c=VisuMZ[_0x4036('0xb0')](_0x183fa2[_0x4036('0xff')]),_0x5b2ecd=_0x183fa2['Destination'],_0x135b90=_0x183fa2[_0x4036('0x4c0')],_0x47cc21=_0x183fa2[_0x4036('0x790')],_0x2acfea=_0x183fa2[_0x4036('0x5a7')],_0x1ecbf8=_0x183fa2[_0x4036('0x346')],_0x3c7b5f=_0x183fa2[_0x4036('0x6ad')],_0x29f058=_0x183fa2['EasingType'],_0x575113=_0x183fa2[_0x4036('0x2a5')],_0x5c0af1=_0x183fa2['WaitForMovement'];if(!_0x195b02)return;for(const _0x4aad2d of _0x285b1c){if(_0x4036('0x827')!==_0x4036('0x373')){if(!_0x4aad2d)continue;let _0x598acf=_0x4aad2d[_0x4036('0x304')]()[_0x4036('0x7b6')],_0x599051=_0x4aad2d[_0x4036('0x304')]()['_baseY'];if(_0x5b2ecd[_0x4036('0x161')](/home/i))_0x598acf=_0x4aad2d[_0x4036('0x304')]()[_0x4036('0x13b')],_0x599051=_0x4aad2d[_0x4036('0x304')]()[_0x4036('0x47d')];else{if(_0x5b2ecd[_0x4036('0x161')](/center/i)){if(_0x4036('0x31a')!==_0x4036('0x31a')){function _0x330e10(){_0x3f6410?this[_0x4036('0xf3')]():this[_0x4036('0x64d')]();}}else _0x598acf=Graphics[_0x4036('0x316')]/0x2,_0x599051=Graphics[_0x4036('0x4f6')]/0x2;}else _0x5b2ecd[_0x4036('0x161')](/point (\d+), (\d+)/i)&&(_0x598acf=Number(RegExp['$1']),_0x599051=Number(RegExp['$2']));}if(_0x135b90[_0x4036('0x161')](/horz/i))_0x598acf+=_0x4aad2d[_0x4036('0x4a2')]()?-_0x47cc21:_0x47cc21;if(_0x135b90[_0x4036('0x161')](/vert/i))_0x599051+=_0x4aad2d[_0x4036('0x4a2')]()?-_0x2acfea:_0x2acfea;_0x4aad2d[_0x4036('0x117')](_0x598acf,_0x599051,_0x1ecbf8,_0x3c7b5f,_0x29f058,-0x1),_0x4aad2d[_0x4036('0x530')](_0x575113);}else{function _0x2fe873(){this['isDead']()&&this[_0x4036('0x486')]!=='dead'&&this[_0x4036('0x530')](_0x4036('0x565'));if(this[_0x4036('0x416')]()&&this[_0x4036('0x486')]===_0x4036('0x565'))return;if(this[_0x4036('0x68c')]()){this[_0x4036('0x304')]()[_0x4036('0x114')]();return;}if(this[_0x4036('0x486')]===_0x4036('0x59b'))return;if(this['_motionType']===_0x4036('0x13')&&!_0x648e5f['isInputting']())return;if(this[_0x4036('0x486')]===_0x4036('0x342')&&!_0x386bd3[_0x4036('0x5c5')]())return;this['clearMotion'](),this[_0x4036('0x304')]()&&_0x4f963d[_0x4036('0x5c5')]()&&this[_0x4036('0x304')]()[_0x4036('0x114')]();}}}if(_0x5c0af1)_0x195b02[_0x4036('0x310')](_0x4036('0x7c0'));}),PluginManager[_0x4036('0xf2')](pluginData[_0x4036('0x37d')],_0x4036('0x3dd'),_0x3de124=>{if(!SceneManager[_0x4036('0x78a')]())return;if(!$gameSystem[_0x4036('0x1c1')]())return;VisuMZ[_0x4036('0x653')](_0x3de124,_0x3de124);const _0x39b476=$gameTemp[_0x4036('0x3df')](),_0x2cf5d1=VisuMZ[_0x4036('0xb0')](_0x3de124[_0x4036('0x2d4')]),_0x1e92e5=VisuMZ[_0x4036('0xb0')](_0x3de124[_0x4036('0x674')]),_0xe6c29c=_0x3de124[_0x4036('0x204')];let _0x35a54a=_0x3de124[_0x4036('0x4c1')];const _0x4c278b=_0x3de124['OffsetAdjust'],_0x49a9d2=_0x3de124[_0x4036('0x790')],_0x5445d2=_0x3de124[_0x4036('0x5a7')],_0xd459c4=_0x3de124[_0x4036('0x346')],_0xe4019f=_0x3de124[_0x4036('0x6ad')],_0x21304b=_0x3de124['EasingType'],_0x27e28b=_0x3de124[_0x4036('0x2a5')],_0x2886bc=_0x3de124[_0x4036('0x735')],_0x36e2da=Math[_0x4036('0x18c')](..._0x1e92e5[_0x4036('0x5a4')](_0x2bbc52=>_0x2bbc52['battler']()['_baseX']-_0x2bbc52[_0x4036('0x304')]()[_0x4036('0x21c')]()/0x2)),_0x42044d=Math[_0x4036('0x577')](..._0x1e92e5['map'](_0x528450=>_0x528450[_0x4036('0x304')]()[_0x4036('0x7b6')]+_0x528450[_0x4036('0x304')]()['mainSpriteWidth']()/0x2)),_0x494c50=Math[_0x4036('0x18c')](..._0x1e92e5['map'](_0x6157ea=>_0x6157ea[_0x4036('0x304')]()[_0x4036('0x311')]-_0x6157ea[_0x4036('0x304')]()[_0x4036('0x290')]())),_0x512065=Math[_0x4036('0x577')](..._0x1e92e5[_0x4036('0x5a4')](_0x1481d5=>_0x1481d5[_0x4036('0x304')]()[_0x4036('0x311')])),_0x41cfaf=_0x1e92e5['filter'](_0x24ebb8=>_0x24ebb8[_0x4036('0x4a2')]())[_0x4036('0x6b5')],_0x3cc1d9=_0x1e92e5[_0x4036('0x3c4')](_0x536b7a=>_0x536b7a['isEnemy']())[_0x4036('0x6b5')];let _0x2afff7=0x0,_0x4b6267=0x0;if(_0xe6c29c[_0x4036('0x161')](/front/i))_0x2afff7=_0x41cfaf>=_0x3cc1d9?_0x36e2da:_0x42044d;else{if(_0xe6c29c[_0x4036('0x161')](/middle/i)){if(_0x4036('0x34d')!==_0x4036('0x34d')){function _0x548c96(){if(this[_0x4036('0x6ee')]())_0xfd9a90[_0x4036('0x600')][_0x4036('0x3cd')][_0x4036('0x286')](this);}}else _0x2afff7=(_0x36e2da+_0x42044d)/0x2,_0x35a54a=-0x1;}else{if(_0xe6c29c[_0x4036('0x161')](/back/i)){if(_0x4036('0x23a')===_0x4036('0x49c')){function _0xd0b14(){this[_0x4036('0x38d')](_0x4036('0x411')),_0x372ea8['BattleCore'][_0x4036('0x6fe')][_0x4036('0x286')](this),this[_0x4036('0x38d')](_0x4036('0x44'));}}else _0x2afff7=_0x41cfaf>=_0x3cc1d9?_0x42044d:_0x36e2da;}}}if(_0xe6c29c[_0x4036('0x161')](/head/i)){if(_0x4036('0x66')===_0x4036('0x66'))_0x4b6267=_0x494c50;else{function _0x1010c5(){const _0x413bbe=_0x46c50c[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x71f')];_0x413bbe[_0x4036('0x760')]&&_0x3ec376['reserveCommonEvent'](_0x413bbe['BattleEndEvent']);const _0x4eb910=_0x4036('0x7e8')[_0x4036('0x4d2')](_0x4b5081);_0x413bbe[_0x4eb910]&&_0x552267[_0x4036('0x5b')](_0x413bbe[_0x4eb910]);}}}else{if(_0xe6c29c[_0x4036('0x161')](/center/i))_0x4b6267=(_0x494c50+_0x512065)/0x2;else{if(_0xe6c29c['match'](/base/i)){if('YIcsq'!==_0x4036('0x347')){function _0x59d0b5(){this[_0x4036('0x338')]=this[_0x4036('0x68')](this[_0x4036('0x338')],this[_0x4036('0x1cd')],_0x37ce79,_0x5673b8,_0x121211);}}else _0x4b6267=_0x512065;}}}if(!_0x39b476)return;for(const _0x3043a1 of _0x2cf5d1){if(_0x4036('0x2af')===_0x4036('0x2af')){if(!_0x3043a1)continue;let _0x220623=_0x2afff7,_0x2902f2=_0x4b6267;if(_0x4c278b[_0x4036('0x161')](/horz/i))_0x220623+=_0x3043a1[_0x4036('0x4a2')]()?-_0x49a9d2:_0x49a9d2;if(_0x4c278b[_0x4036('0x161')](/vert/i))_0x2902f2+=_0x3043a1['isActor']()?-_0x5445d2:_0x5445d2;_0x3043a1['moveBattlerToPoint'](_0x220623,_0x2902f2,_0xd459c4,_0xe4019f,_0x21304b,_0x35a54a),_0x3043a1[_0x4036('0x530')](_0x27e28b);}else{function _0x32ecaf(){const _0x858dd3=_0x2e4b84[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x559')];this[_0x4036('0x7d8')]=_0x858dd3[_0x4036('0x55b')][_0x4036('0x638')](0x0),this['_flashDuration']=_0x858dd3[_0x4036('0x5d5')];}}}if(_0x2886bc)_0x39b476[_0x4036('0x310')](_0x4036('0x7c0'));}),PluginManager[_0x4036('0xf2')](pluginData[_0x4036('0x37d')],_0x4036('0x3a2'),_0x55805b=>{if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x4036('0x653')](_0x55805b,_0x55805b);const _0xeba96a=$gameTemp[_0x4036('0x3df')](),_0x232e2d=VisuMZ[_0x4036('0xb0')](_0x55805b['Targets']),_0x14d031=_0x55805b[_0x4036('0x53b')],_0x3cdad0=_0x55805b['Duration'],_0x41ca1a=_0x55805b[_0x4036('0x1e3')],_0x3489e7=_0x55805b[_0x4036('0x5c8')];if(!_0xeba96a)return;for(const _0x5dfd19 of _0x232e2d){if(!_0x5dfd19)continue;_0x5dfd19[_0x4036('0x21a')](_0x14d031,_0x3cdad0,_0x41ca1a);}if(_0x3489e7)_0xeba96a[_0x4036('0x310')]('battleOpacity');}),PluginManager['registerCommand'](pluginData[_0x4036('0x37d')],_0x4036('0x55e'),_0xf97aee=>{if(!SceneManager[_0x4036('0x78a')]())return;VisuMZ[_0x4036('0x653')](_0xf97aee,_0xf97aee);const _0x245586=$gameTemp[_0x4036('0x3df')](),_0x27d639=VisuMZ[_0x4036('0xb0')](_0xf97aee[_0x4036('0xff')]),_0xe4a8e6=_0xf97aee[_0x4036('0x415')],_0x4d72f0=_0xf97aee[_0x4036('0x384')],_0x5e4d36=_0xf97aee['Duration'],_0x446792=_0xf97aee['EasingType'],_0x51e5b0=_0xf97aee['WaitForScale'];if(!_0x245586)return;for(const _0x44e8ef of _0x27d639){if(!_0x44e8ef)continue;_0x44e8ef['growBattler'](_0xe4a8e6,_0x4d72f0,_0x5e4d36,_0x446792);}if(_0x51e5b0)_0x245586['setWaitMode'](_0x4036('0x252'));}),PluginManager[_0x4036('0xf2')](pluginData[_0x4036('0x37d')],_0x4036('0x601'),_0x35de43=>{if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x4036('0x653')](_0x35de43,_0x35de43);const _0x29ae0c=$gameTemp[_0x4036('0x3df')](),_0x451c07=VisuMZ[_0x4036('0xb0')](_0x35de43[_0x4036('0xff')]),_0x38582c=_0x35de43[_0x4036('0x29c')],_0x28052f=_0x35de43[_0x4036('0x53e')],_0x5e20de=_0x35de43[_0x4036('0x346')],_0x1d4afd=_0x35de43[_0x4036('0x1e3')],_0x502d55=_0x35de43['WaitForSkew'];if(!_0x29ae0c)return;for(const _0xf3a55f of _0x451c07){if(!_0xf3a55f)continue;_0xf3a55f['skewBattler'](_0x38582c,_0x28052f,_0x5e20de,_0x1d4afd);}if(_0x502d55)_0x29ae0c[_0x4036('0x310')](_0x4036('0x73'));}),PluginManager['registerCommand'](pluginData['name'],'ActSeq_Movement_Spin',_0x3dca18=>{if(!SceneManager[_0x4036('0x78a')]())return;VisuMZ[_0x4036('0x653')](_0x3dca18,_0x3dca18);const _0x191680=$gameTemp[_0x4036('0x3df')](),_0x34b6a8=VisuMZ[_0x4036('0xb0')](_0x3dca18[_0x4036('0xff')]),_0x4c6a28=_0x3dca18[_0x4036('0x229')],_0x202bfa=_0x3dca18[_0x4036('0x346')],_0x37609d=_0x3dca18['EasingType'],_0x513c3f=_0x3dca18['WaitForSpin'];if(!_0x191680)return;for(const _0x36c237 of _0x34b6a8){if(!_0x36c237)continue;_0x36c237['spinBattler'](_0x4c6a28,_0x202bfa,_0x37609d);}if(_0x513c3f)_0x191680[_0x4036('0x310')](_0x4036('0x168'));}),PluginManager['registerCommand'](pluginData[_0x4036('0x37d')],_0x4036('0x329'),_0x56b811=>{if(!SceneManager['isSceneBattle']())return;const _0x22a0cd=$gameTemp[_0x4036('0x3df')]();if(!_0x22a0cd)return;_0x22a0cd[_0x4036('0x310')](_0x4036('0x5be'));}),PluginManager[_0x4036('0xf2')](pluginData[_0x4036('0x37d')],_0x4036('0x7bf'),_0x1e7b79=>{if(!SceneManager['isSceneBattle']())return;const _0xc36bd6=$gameTemp[_0x4036('0x3df')]();if(!_0xc36bd6)return;_0xc36bd6[_0x4036('0x310')]('battleJump');}),PluginManager['registerCommand'](pluginData[_0x4036('0x37d')],_0x4036('0x830'),_0x521061=>{if(!SceneManager[_0x4036('0x78a')]())return;const _0x5552da=$gameTemp[_0x4036('0x3df')]();if(!_0x5552da)return;_0x5552da[_0x4036('0x310')](_0x4036('0x7c0'));}),PluginManager[_0x4036('0xf2')](pluginData[_0x4036('0x37d')],_0x4036('0x6e1'),_0x1ff90e=>{if(!SceneManager[_0x4036('0x78a')]())return;const _0xf43c3b=$gameTemp['getLastPluginCommandInterpreter']();if(!_0xf43c3b)return;_0xf43c3b[_0x4036('0x310')](_0x4036('0x812'));}),PluginManager[_0x4036('0xf2')](pluginData['name'],_0x4036('0x667'),_0x956348=>{if(!SceneManager[_0x4036('0x78a')]())return;const _0x21d426=$gameTemp['getLastPluginCommandInterpreter']();if(!_0x21d426)return;_0x21d426[_0x4036('0x310')]('battleGrow');}),PluginManager[_0x4036('0xf2')](pluginData['name'],'ActSeq_Movement_WaitForSkew',_0x96b47c=>{if(!SceneManager[_0x4036('0x78a')]())return;const _0x4eb6e4=$gameTemp[_0x4036('0x3df')]();if(!_0x4eb6e4)return;_0x4eb6e4[_0x4036('0x310')](_0x4036('0x73'));}),PluginManager[_0x4036('0xf2')](pluginData[_0x4036('0x37d')],_0x4036('0x1e6'),_0xeb0f67=>{if(!SceneManager[_0x4036('0x78a')]())return;const _0x524b05=$gameTemp[_0x4036('0x3df')]();if(!_0x524b05)return;_0x524b05['setWaitMode'](_0x4036('0x168'));}),PluginManager[_0x4036('0xf2')](pluginData[_0x4036('0x37d')],_0x4036('0x8'),_0x529cb1=>{if(!SceneManager['isSceneBattle']())return;if(!Imported['VisuMZ_3_ActSeqCamera'])return;VisuMZ['ConvertParams'](_0x529cb1,_0x529cb1);const _0x174926=$gameTemp[_0x4036('0x3df')](),_0x39bcf4=_0x529cb1[_0x4036('0x58c')];if(!_0x174926)return;$gameScreen[_0x4036('0x2bd')](_0x529cb1[_0x4036('0x29c')],_0x529cb1[_0x4036('0x53e')],_0x529cb1[_0x4036('0x346')],_0x529cb1['EasingType']);if(_0x39bcf4)_0x174926['setWaitMode'](_0x4036('0x22f'));}),PluginManager[_0x4036('0xf2')](pluginData[_0x4036('0x37d')],'ActSeq_Skew_Reset',_0x3a8b35=>{if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x4036('0x5a5')])return;VisuMZ[_0x4036('0x653')](_0x3a8b35,_0x3a8b35);const _0x3cdf23=$gameTemp['getLastPluginCommandInterpreter'](),_0xa80838=_0x3a8b35[_0x4036('0x58c')];if(!_0x3cdf23)return;$gameScreen[_0x4036('0x2bd')](0x0,0x0,_0x3a8b35[_0x4036('0x346')],_0x3a8b35[_0x4036('0x1e3')]);if(_0xa80838)_0x3cdf23['setWaitMode'](_0x4036('0x22f'));}),PluginManager['registerCommand'](pluginData[_0x4036('0x37d')],'ActSeq_Skew_WaitForSkew',_0x441ae6=>{if(!SceneManager[_0x4036('0x78a')]())return;if(!Imported[_0x4036('0x5a5')])return;const _0x33c7a3=$gameTemp[_0x4036('0x3df')]();if(!_0x33c7a3)return;_0x33c7a3[_0x4036('0x310')](_0x4036('0x22f'));}),PluginManager['registerCommand'](pluginData[_0x4036('0x37d')],_0x4036('0x6ba'),_0xe86527=>{if(!SceneManager[_0x4036('0x78a')]())return;VisuMZ[_0x4036('0x653')](_0xe86527,_0xe86527);const _0x2c974f=$gameTemp[_0x4036('0x3df')](),_0x1dbed6=_0xe86527['Index'],_0x1e21a4=_0xe86527[_0x4036('0x719')];if(!_0x2c974f)return;BattleManager[_0x4036('0x683')]=_0x1dbed6,BattleManager[_0x4036('0x90')]=BattleManager['_allTargets']?BattleManager['_allTargets'][BattleManager[_0x4036('0x683')]]||null:null,BattleManager['_target']&&_0x1e21a4[_0x4036('0x6bc')]()['trim']()!==_0x4036('0x630')&&_0x2c974f[_0x4036('0x4bd')]([_0x1e21a4]);}),PluginManager[_0x4036('0xf2')](pluginData[_0x4036('0x37d')],_0x4036('0x120'),_0x27b648=>{if(!SceneManager[_0x4036('0x78a')]())return;VisuMZ[_0x4036('0x653')](_0x27b648,_0x27b648);const _0x591495=$gameTemp[_0x4036('0x3df')](),_0x1c47d7=_0x27b648[_0x4036('0x719')];if(!_0x591495)return;BattleManager[_0x4036('0x683')]++,BattleManager[_0x4036('0x90')]=BattleManager[_0x4036('0x570')][BattleManager[_0x4036('0x683')]]||null;if(BattleManager[_0x4036('0x90')]&&_0x1c47d7[_0x4036('0x6bc')]()[_0x4036('0x330')]()!==_0x4036('0x630')){if(_0x4036('0x2cb')===_0x4036('0x2cb'))_0x591495[_0x4036('0x4bd')]([_0x1c47d7]);else{function _0x43c289(){if(!_0x4dab8a[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x559')][_0x4036('0x782')])return _0x2b8f61;const _0x52762c=/<BYPASS SOFT DAMAGE CAP>/i;if(this[_0x4036('0x13a')]()[_0x4036('0x826')]['match'](_0x52762c))return!![];if(this['subject']()[_0x4036('0x3af')]()['some'](_0x150e50=>_0x150e50&&_0x150e50[_0x4036('0x826')][_0x4036('0x161')](_0x52762c)))return!![];const _0x4376c2=_0x465398<0x0?-0x1:0x1;_0x5c69dd=_0x89b27d[_0x4036('0x38c')](_0x26bbb4);let _0xa42d07=this['subject']()['softDamageCapRate']();this['item']()[_0x4036('0x826')][_0x4036('0x161')](/<SOFT DAMAGE CAP:[ ]([\+\-]\d+)([%％])>/i)&&(_0xa42d07+=_0x410a4e(_0x11ab4f['$1'])/0x64);_0xa42d07=_0xa42d07[_0x4036('0x4d6')](0.01,0x1);const _0x4161a2=this[_0x4036('0x4eb')](),_0x45cd46=_0xa42d07*_0x4161a2;if(_0x22ff48>_0x45cd46&&_0x4161a2>_0x45cd46){_0x496f76-=_0x45cd46;const _0x27719e=_0x20c5e2[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x559')]['DefaultSoftScaler'],_0x180198=_0x301dc4['max'](0x1-_0x344602/((_0x4161a2-_0x45cd46)*_0x27719e+_0x2a31fe),0.01);_0x38730d*=_0x180198,_0x284d31+=_0x45cd46;}return _0x70e289*_0x4376c2;}}}}),PluginManager['registerCommand'](pluginData['name'],'ActSeq_Target_PrevTarget',_0x1d283b=>{if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x4036('0x653')](_0x1d283b,_0x1d283b);const _0x3fc306=$gameTemp['getLastPluginCommandInterpreter'](),_0x5a7f4b=_0x1d283b[_0x4036('0x719')];if(!_0x3fc306)return;BattleManager[_0x4036('0x683')]--,BattleManager[_0x4036('0x90')]=BattleManager[_0x4036('0x570')][BattleManager[_0x4036('0x683')]]||null;if(BattleManager[_0x4036('0x90')]&&_0x5a7f4b[_0x4036('0x6bc')]()[_0x4036('0x330')]()!==_0x4036('0x630')){if(_0x4036('0x35b')===_0x4036('0x35b'))_0x3fc306[_0x4036('0x4bd')]([_0x5a7f4b]);else{function _0x3cbe0e(){const _0x255a38=_0x4036('0x7f8')[_0x4036('0x4d2')](_0x12a38e);_0x1367db[_0x4036('0x600')]['JS'][_0x105df7]=new _0x4f75ac(_0x255a38);}}}}),PluginManager[_0x4036('0xf2')](pluginData['name'],_0x4036('0x2b6'),_0x5d2d81=>{if(!SceneManager[_0x4036('0x78a')]())return;VisuMZ['ConvertParams'](_0x5d2d81,_0x5d2d81);const _0x1d8b59=$gameTemp[_0x4036('0x3df')](),_0x8e491b=_0x5d2d81[_0x4036('0x2df')],_0xf4114a=_0x5d2d81[_0x4036('0x719')];if(!_0x1d8b59)return;const _0x3d1c73=BattleManager[_0x4036('0x683')];for(;;){BattleManager[_0x4036('0x683')]=Math[_0x4036('0x804')](BattleManager[_0x4036('0x570')][_0x4036('0x6b5')]);if(!_0x8e491b)break;if(BattleManager[_0x4036('0x683')]!==_0x3d1c73)break;if(BattleManager[_0x4036('0x570')][_0x4036('0x6b5')]<=0x1){BattleManager['_targetIndex']=0x0;break;}}BattleManager[_0x4036('0x90')]=BattleManager[_0x4036('0x570')][BattleManager[_0x4036('0x683')]]||null;if(BattleManager[_0x4036('0x90')]&&_0xf4114a[_0x4036('0x6bc')]()[_0x4036('0x330')]()!==_0x4036('0x630')){if(_0x4036('0x563')!==_0x4036('0x648'))_0x1d8b59[_0x4036('0x4bd')]([_0xf4114a]);else{function _0x121a8a(){this[_0x4036('0x32b')][_0x4036('0x356')](_0xf37ba3);}}}}),PluginManager['registerCommand'](pluginData[_0x4036('0x37d')],_0x4036('0x385'),_0x3bf348=>{if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x4036('0x5a5')])return;VisuMZ[_0x4036('0x653')](_0x3bf348,_0x3bf348);const _0xc09801=$gameTemp[_0x4036('0x3df')](),_0x446958=_0x3bf348[_0x4036('0x1b3')];if(!_0xc09801)return;$gameScreen[_0x4036('0x2a1')](_0x3bf348[_0x4036('0x27a')],_0x3bf348[_0x4036('0x346')],_0x3bf348[_0x4036('0x1e3')]);if(_0x446958)_0xc09801[_0x4036('0x310')](_0x4036('0x5c3'));}),PluginManager[_0x4036('0xf2')](pluginData[_0x4036('0x37d')],_0x4036('0xd'),_0xd5a14b=>{if(!SceneManager[_0x4036('0x78a')]())return;if(!Imported[_0x4036('0x5a5')])return;VisuMZ[_0x4036('0x653')](_0xd5a14b,_0xd5a14b);const _0x973e9c=$gameTemp[_0x4036('0x3df')](),_0xb02e6f=_0xd5a14b[_0x4036('0x1b3')];if(!_0x973e9c)return;$gameScreen[_0x4036('0x2a1')](0x1,_0xd5a14b['Duration'],_0xd5a14b[_0x4036('0x1e3')]);if(_0xb02e6f)_0x973e9c[_0x4036('0x310')](_0x4036('0x5c3'));}),PluginManager[_0x4036('0xf2')](pluginData[_0x4036('0x37d')],'ActSeq_Zoom_WaitForZoom',_0x30dedd=>{if(!SceneManager[_0x4036('0x78a')]())return;if(!Imported[_0x4036('0x5a5')])return;const _0xde2bb3=$gameTemp[_0x4036('0x3df')]();if(!_0xde2bb3)return;_0xde2bb3['setWaitMode'](_0x4036('0x5c3'));}),VisuMZ['BattleCore'][_0x4036('0x484')]=Scene_Boot[_0x4036('0x24d')][_0x4036('0x288')],Scene_Boot[_0x4036('0x24d')][_0x4036('0x288')]=function(){VisuMZ[_0x4036('0x600')]['Scene_Boot_onDatabaseLoaded']['call'](this),this[_0x4036('0x3b0')]();},Scene_Boot[_0x4036('0x24d')][_0x4036('0x3b0')]=function(){this['process_VisuMZ_BattleCore_PluginParams'](),this[_0x4036('0x3fe')](),this[_0x4036('0x7c9')](),this['process_VisuMZ_BattleCore_Action_Notetags'](),this['process_VisuMZ_BattleCore_TraitObject_Notetags'](),this[_0x4036('0x186')](),this[_0x4036('0x7d7')]();},Scene_Boot[_0x4036('0x24d')][_0x4036('0x412')]=function(){const _0x589528=VisuMZ[_0x4036('0x600')][_0x4036('0x635')];_0x589528[_0x4036('0x43f')][_0x4036('0x3e8')]===undefined&&(_0x589528['Actor'][_0x4036('0x3e8')]=![]);if(_0x589528['Enemy'][_0x4036('0x3e8')]===undefined){if(_0x4036('0x6cc')!==_0x4036('0x1aa'))_0x589528[_0x4036('0x3e6')][_0x4036('0x3e8')]=!![];else{function _0xce035d(){_0x294c71[_0x4036('0x600')][_0x4036('0x484')][_0x4036('0x286')](this),this[_0x4036('0x3b0')]();}}}},VisuMZ['DamageStyles']={},Scene_Boot[_0x4036('0x24d')][_0x4036('0x3fe')]=function(){for(const _0x221d2e of VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x559')][_0x4036('0xb')]){if(!_0x221d2e)continue;const _0x17b7b4=_0x221d2e[_0x4036('0x84')][_0x4036('0x6bc')]()[_0x4036('0x330')]();VisuMZ[_0x4036('0x3b')][_0x17b7b4]=_0x221d2e;}},VisuMZ[_0x4036('0x600')]['RegExp']={},Scene_Boot[_0x4036('0x24d')][_0x4036('0x7c9')]=function(){const _0x16e69d=VisuMZ[_0x4036('0x600')]['RegExp'],_0x189b59=_0x4036('0x1b2'),_0x11366b=[['Pre','PRE-'],[_0x4036('0x109'),'POST-']],_0x1d4821=[[_0x4036('0x3c6'),_0x4036('0x4c')],[_0x4036('0x670'),_0x4036('0x4cb')]],_0x454bb6=[['',''],[_0x4036('0x79'),_0x4036('0x8e')],[_0x4036('0x14e'),_0x4036('0x44b')]];for(const _0xef1d01 of _0x1d4821){if(_0x4036('0x721')===_0x4036('0x721'))for(const _0x43074a of _0x454bb6){for(const _0x4a878f of _0x11366b){if(_0x4036('0x287')!==_0x4036('0x40b')){const _0x1df621=_0xef1d01[0x0][_0x4036('0x4d2')](_0x4a878f[0x0],_0x43074a[0x0]),_0x56e971=_0xef1d01[0x1][_0x4036('0x4d2')](_0x4a878f[0x1],_0x43074a[0x1])[_0x4036('0x330')](),_0xa9dec8=new RegExp(_0x189b59['format'](_0x56e971),'i');_0x16e69d[_0x1df621]=_0xa9dec8;}else{function _0x5cbb31(){const _0x2f8a73=_0x1a5b98(_0x4493c8['$1'])['toUpperCase']()[_0x4036('0x330')]();if(_0x2f8a73==='MANUAL')return _0x4036('0x108');if(_0x1af2aa['DamageStyles'][_0x2f8a73])return _0x2f8a73;}}}}else{function _0x4bb8fa(){return _0x20b17a[_0x4036('0x600')][_0x4036('0x2c2')]['call'](this);}}}const _0x519fbd=[[_0x4036('0x3c7'),_0x4036('0x3c5')],['%1EndActionJS','JS\x20%1END\x20ACTION']];for(const _0x80cd34 of _0x519fbd){if('ryJUU'!==_0x4036('0x575')){function _0x49f365(){return 0x0;}}else for(const _0x522913 of _0x11366b){const _0x314941=_0x80cd34[0x0][_0x4036('0x4d2')](_0x522913[0x0]),_0x1d7294=_0x80cd34[0x1][_0x4036('0x4d2')](_0x522913[0x1]),_0x5e91a7=new RegExp(_0x189b59[_0x4036('0x4d2')](_0x1d7294),'i');_0x16e69d[_0x314941]=_0x5e91a7;}}const _0x4ab00b=[['%1StartBattleJS',_0x4036('0x94')],['%1EndBattleJS','JS\x20%1END\x20BATTLE'],[_0x4036('0x394'),'JS\x20BATTLE\x20VICTORY'],[_0x4036('0x511'),_0x4036('0x7c')],[_0x4036('0x4b1'),'JS\x20ESCAPE\x20SUCCESS'],[_0x4036('0x103'),_0x4036('0x7de')],[_0x4036('0x759'),_0x4036('0x333')],[_0x4036('0x15a'),_0x4036('0x7a3')],[_0x4036('0x1b7'),_0x4036('0x595')]];for(const _0x1be51e of _0x4ab00b){for(const _0x227cab of _0x11366b){if(_0x4036('0x2f9')!==_0x4036('0x71e')){const _0x3a2411=_0x1be51e[0x0][_0x4036('0x4d2')](_0x227cab[0x0]),_0x5a3314=_0x1be51e[0x1][_0x4036('0x4d2')](_0x227cab[0x1]),_0xececcd=new RegExp(_0x189b59[_0x4036('0x4d2')](_0x5a3314),'i');_0x16e69d[_0x3a2411]=_0xececcd;}else{function _0x5e252b(){if(!_0x4fa918[_0x4036('0x78a')]())return;if(!_0x27871a['VisuMZ_3_ActSeqCamera'])return;_0xb030b3[_0x4036('0x653')](_0x314a34,_0x2c9c80);const _0x1e8e71=_0x4e6218['getLastPluginCommandInterpreter'](),_0x4602cf=_0x23d134[_0x4036('0x58c')];if(!_0x1e8e71)return;_0x6875a6[_0x4036('0x2bd')](0x0,0x0,_0x419910[_0x4036('0x346')],_0x5ba9d4['EasingType']);if(_0x4602cf)_0x1e8e71[_0x4036('0x310')]('battleSkew');}}}}},Scene_Boot['prototype'][_0x4036('0x6a3')]=function(){const _0x5e9921=$dataSkills[_0x4036('0x6df')]($dataItems),_0x2f82b6=[_0x4036('0xbc'),_0x4036('0x16'),_0x4036('0x4d4'),_0x4036('0x52b'),_0x4036('0x684'),_0x4036('0x622'),_0x4036('0x59f'),'PostEndActionJS'];for(const _0x385991 of _0x5e9921){if('CuGpu'!==_0x4036('0x2b1')){function _0x1c35ab(){return!![];}}else{if(!_0x385991)continue;for(const _0x5e278f of _0x2f82b6){VisuMZ[_0x4036('0x600')][_0x4036('0x36b')](_0x385991,_0x5e278f);}const _0x1dbaef=_0x385991[_0x4036('0x826')];_0x1dbaef[_0x4036('0x161')](/<ALWAYS CRITICAL/i)&&(_0x385991[_0x4036('0xd4')][_0x4036('0x3c8')]=!![]),_0x1dbaef[_0x4036('0x161')](/<(?:REPEAT|REPEATS|REPEAT HITS):[ ](\d+)/i)&&(_0x385991[_0x4036('0x631')]=Math[_0x4036('0x577')](0x1,Number(RegExp['$1']))),_0x1dbaef['match'](/<TARGET:[ ](.*)>/i)&&(_0x385991['scope']=String(RegExp['$1'])[_0x4036('0x6bc')]()[_0x4036('0x330')]());}}},Scene_Boot[_0x4036('0x24d')][_0x4036('0xbf')]=function(){const _0x17f128=$dataActors[_0x4036('0x6df')]($dataClasses,$dataWeapons,$dataArmors,$dataEnemies,$dataStates),_0x3cb01b=[_0x4036('0x464'),'PostApplyAsUserJS',_0x4036('0x58'),_0x4036('0x368'),_0x4036('0x6c1'),_0x4036('0x818'),'PreDamageAsTargetJS',_0x4036('0x1ea'),'PreStartActionJS',_0x4036('0x622'),_0x4036('0x59f'),_0x4036('0x44d'),_0x4036('0x5b3'),_0x4036('0x3da'),_0x4036('0x40'),_0x4036('0x1ce'),_0x4036('0x394'),'BattleDefeatJS','EscapeSuccessJS','EscapeFailureJS',_0x4036('0x205'),_0x4036('0x7f7'),_0x4036('0x411'),_0x4036('0x44'),_0x4036('0x79d'),_0x4036('0x41b')];for(const _0x3c7bcc of _0x17f128){if(!_0x3c7bcc)continue;for(const _0x35c1b6 of _0x3cb01b){VisuMZ[_0x4036('0x600')][_0x4036('0x36b')](_0x3c7bcc,_0x35c1b6);}const _0x2a215a=_0x3c7bcc[_0x4036('0x826')];}},VisuMZ[_0x4036('0x600')]['JS']={},VisuMZ['BattleCore']['createJS']=function(_0x569fe0,_0x397efb){const _0x40befb=_0x569fe0[_0x4036('0x826')];if(_0x40befb['match'](VisuMZ[_0x4036('0x600')][_0x4036('0x7ea')][_0x397efb])){if('RPTTN'===_0x4036('0x6bb')){function _0x27fb3e(){_0xeed163+=_0x568398(_0x40064d['$1']);}}else{const _0x2a1638=String(RegExp['$1']),_0x1cb964='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20obj\x20=\x20arguments[2];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20value\x20=\x20arguments[3]\x20||\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20originalValue\x20=\x20value;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Constants\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20action\x20=\x20(this.constructor\x20===\x20Game_Action)\x20?\x20this\x20:\x20user.currentAction();\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20attacker\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20defender\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20healer\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20receiver\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20actor\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20currentClass\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20(this.constructor\x20===\x20Game_Action)\x20?\x20this.item()\x20:\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20item\x20=\x20(this.constructor\x20===\x20Game_Action)\x20?\x20this.item()\x20:\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20weapon\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20armor\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20enemy\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20obj;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Create\x20Compatibility\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20origin\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(Imported.VisuMZ_1_SkillsStatesCore\x20&&\x20$dataStates.includes(obj))\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20origin\x20=\x20target.getStateOrigin(obj.id);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(value)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20value\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20value\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20value\x20=\x20originalValue;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20value;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'['format'](_0x2a1638),_0x342ede=VisuMZ[_0x4036('0x600')]['createKeyJS'](_0x569fe0,_0x397efb);VisuMZ[_0x4036('0x600')]['JS'][_0x342ede]=new Function(_0x1cb964);}}},VisuMZ[_0x4036('0x600')]['createKeyJS']=function(_0x322ff5,_0x8c168d){let _0x204e95='';if($dataActors['includes'](_0x322ff5))_0x204e95=_0x4036('0x6e6')[_0x4036('0x4d2')](_0x322ff5['id'],_0x8c168d);if($dataClasses[_0x4036('0x747')](_0x322ff5))_0x204e95=_0x4036('0x70a')[_0x4036('0x4d2')](_0x322ff5['id'],_0x8c168d);if($dataSkills[_0x4036('0x747')](_0x322ff5))_0x204e95=_0x4036('0x5f5')[_0x4036('0x4d2')](_0x322ff5['id'],_0x8c168d);if($dataItems[_0x4036('0x747')](_0x322ff5))_0x204e95=_0x4036('0x594')[_0x4036('0x4d2')](_0x322ff5['id'],_0x8c168d);if($dataWeapons[_0x4036('0x747')](_0x322ff5))_0x204e95=_0x4036('0x5de')[_0x4036('0x4d2')](_0x322ff5['id'],_0x8c168d);if($dataArmors[_0x4036('0x747')](_0x322ff5))_0x204e95='Armor-%1-%2'[_0x4036('0x4d2')](_0x322ff5['id'],_0x8c168d);if($dataEnemies[_0x4036('0x747')](_0x322ff5))_0x204e95=_0x4036('0x659')['format'](_0x322ff5['id'],_0x8c168d);if($dataStates[_0x4036('0x747')](_0x322ff5))_0x204e95=_0x4036('0x608')[_0x4036('0x4d2')](_0x322ff5['id'],_0x8c168d);return _0x204e95;},Scene_Boot['prototype'][_0x4036('0x186')]=function(){const _0x435a3c=VisuMZ[_0x4036('0x600')][_0x4036('0x635')]['Mechanics']['BaseTroopIDs'],_0x2d66b5=[];for(const _0x5739ef of _0x435a3c){if(_0x4036('0x1cf')===_0x4036('0x372')){function _0x2c49e2(){const _0x403090=_0x3a4e57['note'];if(_0x403090[_0x4036('0x161')](_0x4c2b9e[_0x4036('0x600')][_0x4036('0x7ea')][_0x10f89c])){const _0x42c17b=_0x4d47b3(_0x3da55c['$1']),_0x519c6a=_0x4036('0x6db')[_0x4036('0x4d2')](_0x42c17b),_0x48939e=_0x481be1[_0x4036('0x600')][_0x4036('0x435')](_0x30ce57,_0x4b37ca);_0x4fa6e4['BattleCore']['JS'][_0x48939e]=new _0x4101ff(_0x519c6a);}}}else{const _0x459da5=$dataTroops[_0x5739ef];if(_0x459da5)_0x2d66b5[_0x4036('0x5d7')](JsonEx[_0x4036('0x2bf')](_0x459da5));}}for(const _0x23d87d of $dataTroops){if(!_0x23d87d)continue;for(const _0x4f835f of _0x2d66b5){if(_0x4f835f['id']===_0x23d87d['id'])continue;_0x23d87d['pages']=_0x23d87d[_0x4036('0x587')][_0x4036('0x6df')](_0x4f835f[_0x4036('0x587')]);}}},Scene_Boot[_0x4036('0x24d')][_0x4036('0x7d7')]=function(){const _0x241f01=$dataSkills['concat']($dataItems);for(const _0x875228 of _0x241f01){if(_0x4036('0x726')!==_0x4036('0x134')){if(!_0x875228)continue;const _0x3e19a7=_0x875228['note'];if(_0x875228[_0x4036('0x826')][_0x4036('0x161')](/<JS TARGETS>\s*([\s\S]*)\s*<\/JS TARGETS>/i)){const _0x2dc5ff=String(RegExp['$1']),_0x4496a6=VisuMZ[_0x4036('0x600')][_0x4036('0x435')](_0x875228,_0x4036('0xff'));VisuMZ[_0x4036('0x600')][_0x4036('0x4b')](_0x2dc5ff,_0x4496a6);}if(_0x875228['note'][_0x4036('0x161')](/<JS COMMAND (?:VISIBLE|SHOW|HIDE)>\s*([\s\S]*)\s*<\/JS COMMAND (?:VISIBLE|SHOW|HIDE)>/i)){const _0x1162bf=String(RegExp['$1']),_0x11e04c=VisuMZ[_0x4036('0x600')][_0x4036('0x435')](_0x875228,'CommandVisible');VisuMZ[_0x4036('0x600')][_0x4036('0x453')](_0x1162bf,_0x11e04c);}}else{function _0x5dd58d(){if(this[_0x4036('0x442')]>0x0){const _0x5b14b1=this[_0x4036('0x442')],_0xd7519a=this[_0x4036('0x53')];_0xd7519a['x']=(_0xd7519a['x']*(_0x5b14b1-0x1)+this['_borderPortraitTargetX'])/_0x5b14b1,_0xd7519a[_0x4036('0x57b')]=(_0xd7519a['opacity']*(_0x5b14b1-0x1)+0xff)/_0x5b14b1,this[_0x4036('0x442')]--;}}}}},VisuMZ[_0x4036('0x600')][_0x4036('0x4b')]=function(_0x1a9ff1,_0x4623fa){const _0x22934c=_0x4036('0x5b9')[_0x4036('0x4d2')](_0x1a9ff1);VisuMZ['BattleCore']['JS'][_0x4623fa]=new Function(_0x22934c);},VisuMZ['BattleCore'][_0x4036('0x453')]=function(_0x3f3115,_0x1e23b5){const _0x21dce0='\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20'[_0x4036('0x4d2')](_0x3f3115);VisuMZ[_0x4036('0x600')]['JS'][_0x1e23b5]=new Function(_0x21dce0);},TextManager[_0x4036('0x52d')]=VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x20')][_0x4036('0x742')],TextManager['autoBattleStart']=VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x7e6')]['StartName'],TextManager['autoBattleStyle']=VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x7e6')][_0x4036('0x517')],TextManager[_0x4036('0x7e7')]=VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x7a1')][_0x4036('0x84')],ColorManager[_0x4036('0x568')]=function(_0x1d5cae){if(_0x1d5cae['match'](/#(.*)/i))return'#%1'[_0x4036('0x4d2')](String(RegExp['$1']));else{if(_0x4036('0x1c2')!=='VzWLO')return this[_0x4036('0x324')](Number(_0x1d5cae));else{function _0x28d7b1(){this['_cache'][_0x4036('0x22b')]=_0x24169e[_0x4036('0x24d')][_0x4036('0x9f')][_0x4036('0x286')](this);}}}},DataManager[_0x4036('0x165')]=function(_0x27c15a){if(_0x27c15a[_0x4036('0x826')]['match'](/<DAMAGE STYLE:[ ](.*)>/i)){const _0x7a1422=String(RegExp['$1'])[_0x4036('0x6bc')]()[_0x4036('0x330')]();if(_0x7a1422==='MANUAL')return _0x4036('0x108');if(VisuMZ[_0x4036('0x3b')][_0x7a1422])return _0x7a1422;}const _0x203a71=VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x559')]['DefaultDamageStyle']['toUpperCase']()[_0x4036('0x330')]();if(VisuMZ[_0x4036('0x3b')][_0x203a71])return _0x203a71;return _0x4036('0x108');},DataManager['getStypeIdWithName']=function(_0x4cf4c7){_0x4cf4c7=_0x4cf4c7[_0x4036('0x6bc')]()[_0x4036('0x330')](),this[_0x4036('0xd7')]=this[_0x4036('0xd7')]||{};if(this[_0x4036('0xd7')][_0x4cf4c7])return this['_stypeIDs'][_0x4cf4c7];for(let _0x239ab1=0x1;_0x239ab1<0x64;_0x239ab1++){if(!$dataSystem[_0x4036('0xe7')][_0x239ab1])continue;let _0x26a202=$dataSystem[_0x4036('0xe7')][_0x239ab1][_0x4036('0x6bc')]()[_0x4036('0x330')]();_0x26a202=_0x26a202[_0x4036('0x7cc')](/\x1I\[(\d+)\]/gi,''),_0x26a202=_0x26a202[_0x4036('0x7cc')](/\\I\[(\d+)\]/gi,''),this[_0x4036('0xd7')][_0x26a202]=_0x239ab1;}return this[_0x4036('0xd7')][_0x4cf4c7]||0x0;},DataManager[_0x4036('0xed')]=function(_0x393303){_0x393303=_0x393303[_0x4036('0x6bc')]()[_0x4036('0x330')](),this['_skillIDs']=this[_0x4036('0xc')]||{};if(this[_0x4036('0xc')][_0x393303])return this[_0x4036('0xc')][_0x393303];for(const _0x5751b4 of $dataSkills){if(_0x4036('0x3')===_0x4036('0x3')){if(!_0x5751b4)continue;this[_0x4036('0xc')][_0x5751b4[_0x4036('0x37d')][_0x4036('0x6bc')]()[_0x4036('0x330')]()]=_0x5751b4['id'];}else{function _0x5c21f3(){_0x18f647[_0x4036('0x600')][_0x4036('0x1a4')][_0x4036('0x286')](this);}}}return this[_0x4036('0xc')][_0x393303]||0x0;},DataManager['getEnemyIdWithName']=function(_0x4fffc4){_0x4fffc4=_0x4fffc4[_0x4036('0x6bc')]()[_0x4036('0x330')](),this[_0x4036('0x524')]=this[_0x4036('0x524')]||{};if(this[_0x4036('0x524')][_0x4fffc4])return this[_0x4036('0x524')][_0x4fffc4];for(const _0x30cd7c of $dataEnemies){if(!_0x30cd7c)continue;this['_enemyIDs'][_0x30cd7c[_0x4036('0x37d')]['toUpperCase']()[_0x4036('0x330')]()]=_0x30cd7c['id'];}return this[_0x4036('0x524')][_0x4fffc4]||0x0;},DataManager[_0x4036('0x3a5')]=function(_0x97ceb9){_0x97ceb9=_0x97ceb9['toUpperCase']()['trim'](),this[_0x4036('0x720')]=this[_0x4036('0x720')]||{};if(this[_0x4036('0x720')][_0x97ceb9])return this[_0x4036('0x720')][_0x97ceb9];for(let _0x30bc37=0x1;_0x30bc37<0x64;_0x30bc37++){if(!$dataSystem['weaponTypes'][_0x30bc37])continue;let _0x5f1d27=$dataSystem[_0x4036('0x1ae')][_0x30bc37][_0x4036('0x6bc')]()[_0x4036('0x330')]();_0x5f1d27=_0x5f1d27['replace'](/\x1I\[(\d+)\]/gi,''),_0x5f1d27=_0x5f1d27[_0x4036('0x7cc')](/\\I\[(\d+)\]/gi,''),this[_0x4036('0x720')][_0x5f1d27]=_0x30bc37;}return this[_0x4036('0x720')][_0x4036('0x24b')]=0x0,this[_0x4036('0x720')][_0x97ceb9]||0x0;},DataManager[_0x4036('0x318')]=function(_0x575a45){const _0x5c64dd=_0x4036('0x7fa');let _0x16e8b5=_0x575a45[_0x4036('0x722')],_0x2e9839=_0x575a45['name'];const _0x3d3548=_0x575a45[_0x4036('0x826')];return _0x3d3548[_0x4036('0x161')](/<DISPLAY ICON: (\d+)>/i)&&(_0x16e8b5=Number(RegExp['$1'])),_0x3d3548[_0x4036('0x161')](/<DISPLAY TEXT: (.*)>/i)&&(_0x2e9839=String(RegExp['$1'])),_0x5c64dd['format'](_0x16e8b5,_0x2e9839);},DataManager[_0x4036('0x68b')]=function(_0x193af5){if(_0x193af5['note']['match'](/<COMMAND TEXT: (.*)>/i)){if('bqXYh'!=='wSTKy')return String(RegExp['$1']);else{function _0x2e61d2(){return _0x25ed9e[_0x4036('0x335')]&&_0x1dc09b[_0x4036('0x3f1')][_0x4036('0x747')]('['+_0x668e72+']');}}}else{if(_0x4036('0x809')!=='hWZdD')return _0x193af5[_0x4036('0x37d')];else{function _0x1d3a32(){_0x740db4[_0x4036('0x600')][_0x4036('0x72f')]['call'](this),this['callNextMethod']();}}}},DataManager[_0x4036('0x65e')]=function(_0x1b5155){if(_0x1b5155[_0x4036('0x826')][_0x4036('0x161')](/<COMMAND ICON: (\d+)>/i)){if(_0x4036('0x6da')!==_0x4036('0x6da')){function _0x1f4cd2(){_0x5e331f[_0x4036('0x24d')]['drawItem'][_0x4036('0x286')](this,_0x180879);}}else return Number(RegExp['$1']);}else{if('jnTYJ'===_0x4036('0x0')){function _0x5820d1(){this[_0x4036('0x238')]=!this[_0x4036('0xd0')]['isHidden'](),!this[_0x4036('0x238')]&&(this[_0x4036('0x57b')]=0x0);}}else return _0x1b5155[_0x4036('0x722')];}},DataManager[_0x4036('0x6')]=function(_0x1bd7dc){const _0x1e28d8=$dataEnemies[_0x1bd7dc];if(_0x1e28d8){if(_0x4036('0x822')===_0x4036('0x4b8')){function _0x185aed(){return this[_0x4036('0xd0')][_0x4036('0x6ee')]();}}else{if(_0x1e28d8[_0x4036('0x826')][_0x4036('0x161')](/<SWAP ENEMIES>\s*([\s\S]*)\s*<\/SWAP ENEMIES>/i)){if('OkCfe'!==_0x4036('0x1f3')){function _0x3ff55e(){_0x9d90a5[_0x4036('0x600')][_0x4036('0x68d')][_0x4036('0x286')](this,_0x49451c),this[_0x4036('0x283')]();}}else{const _0x4b6c0d=String(RegExp['$1'])[_0x4036('0x77a')](/[\r\n]+/)[_0x4036('0x2d8')](''),_0xc9f662=this[_0x4036('0x456')](_0x4b6c0d);_0x1bd7dc=this[_0x4036('0x33c')](_0xc9f662)||_0x1bd7dc,_0x1bd7dc=DataManager[_0x4036('0x6')](_0x1bd7dc);}}}}return _0x1bd7dc;},DataManager['processRandomizedData']=function(_0x5ebb37){let _0x300003=0x0;const _0x3a424b={};for(const _0x11a30b of _0x5ebb37){if(_0x11a30b[_0x4036('0x161')](/(.*):[ ](\d+)/i)){if('rFfZu'===_0x4036('0x5d4')){function _0xeacf10(){this['drawGauge']();}}else{const _0x299cf5=String(RegExp['$1'])[_0x4036('0x330')](),_0x23d8aa=Number(RegExp['$2']);_0x3a424b[_0x299cf5]=_0x23d8aa,_0x300003+=_0x23d8aa;}}else{if(_0x11a30b[_0x4036('0x161')](/(.*):[ ](\d+\.?\d+)/i)){const _0xf84b08=String(RegExp['$1'])[_0x4036('0x330')](),_0x594994=Number(RegExp['$2']);_0x3a424b[_0xf84b08]=_0x594994,_0x300003+=_0x594994;}else _0x11a30b!==''&&(_0x3a424b[_0x11a30b]=0x1,_0x300003++);}}if(_0x300003<=0x0)return'';let _0x15dc44=Math[_0x4036('0x610')]()*_0x300003;for(const _0x5f2c04 in _0x3a424b){if('bmGuf'!=='KcIsO'){_0x15dc44-=_0x3a424b[_0x5f2c04];if(_0x15dc44<=0x0)return _0x5f2c04;}else{function _0x598cb2(){if(_0x495142['battleCameraData']()[_0x4036('0x6f6')]>0x0)return!![];if(_0x5d579a[_0x4036('0x3d8')]()['cameraOffsetDuration']>0x0)return!![];this['_waitMode']='';}}}return'';},ConfigManager[_0x4036('0xb5')]=![],ConfigManager[_0x4036('0x26f')]=![],ConfigManager[_0x4036('0x7e7')]=!![],VisuMZ[_0x4036('0x600')][_0x4036('0x14d')]=ConfigManager[_0x4036('0x51c')],ConfigManager[_0x4036('0x51c')]=function(){const _0x4b560c=VisuMZ[_0x4036('0x600')]['ConfigManager_makeData'][_0x4036('0x286')](this);return _0x4b560c[_0x4036('0xb5')]=this[_0x4036('0xb5')],_0x4b560c['autoBattleUseSkills']=this[_0x4036('0x26f')],_0x4b560c[_0x4036('0x7e7')]=this[_0x4036('0x7e7')],_0x4b560c;},VisuMZ[_0x4036('0x600')][_0x4036('0x285')]=ConfigManager[_0x4036('0x3ab')],ConfigManager[_0x4036('0x3ab')]=function(_0xa79b45){VisuMZ['BattleCore'][_0x4036('0x285')][_0x4036('0x286')](this,_0xa79b45);if('autoBattleAtStart'in _0xa79b45){if('BfwHp'===_0x4036('0x1f8'))this[_0x4036('0xb5')]=_0xa79b45['autoBattleAtStart'];else{function _0x3995b1(){return _0x58f8c1[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x559')][_0x4036('0x695')][_0x4036('0x286')](this,_0x2c0883,_0x43b1b2);}}}else{if(_0x4036('0x185')===_0x4036('0x227')){function _0x46757f(){return _0xe59bb0[_0x4036('0xac')]()[_0x4036('0x6a0')]()[_0x4036('0x3c4')](_0x4a5a95=>_0x4a5a95!==_0x3b339d);}}else this[_0x4036('0xb5')]=![];}if(_0x4036('0x26f')in _0xa79b45){if(_0x4036('0x303')!=='HREek')this[_0x4036('0x26f')]=_0xa79b45[_0x4036('0x26f')];else{function _0x315378(){return _0xfee0ef[_0x4036('0x7b5')]?_0x60af47[_0x4036('0x553')](_0x4036('0x2a0')):_0x22064e[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x7e6')]['AutoBattleCancel'];}}}else this[_0x4036('0x26f')]=![];_0x4036('0x7e7')in _0xa79b45?this['visualHpGauge']=_0xa79b45[_0x4036('0x7e7')]:this[_0x4036('0x7e7')]=!![];},VisuMZ[_0x4036('0x600')][_0x4036('0x421')]=BattleManager[_0x4036('0x80c')],BattleManager['initMembers']=function(){VisuMZ[_0x4036('0x600')][_0x4036('0x421')][_0x4036('0x286')](this),this[_0x4036('0xab')]=[];},BattleManager[_0x4036('0x364')]=function(){if(BattleManager[_0x4036('0x15f')]())return _0x4036('0x293');return _0x4036('0x64f');},BattleManager[_0x4036('0x2e3')]=function(_0x25613a){return _0x25613a=_0x25613a[_0x4036('0x6bc')]()['trim'](),this[_0x4036('0x364')]()===_0x25613a;},BattleManager[_0x4036('0xa0')]=function(){return this[_0x4036('0x2e3')](_0x4036('0x293'));},BattleManager[_0x4036('0x32f')]=function(){return this['isBattleSys'](_0x4036('0x64f'));},BattleManager[_0x4036('0x7c1')]=function(){return this[_0x4036('0x32f')]();},BattleManager[_0x4036('0xc4')]=function(){return!this['isTurnBased']();},BattleManager[_0x4036('0x38d')]=function(_0x4a06f6){$gameParty[_0x4036('0x38d')](_0x4a06f6),$gameTroop['processBattleCoreJS'](_0x4a06f6);},VisuMZ[_0x4036('0x600')][_0x4036('0x5e8')]=BattleManager[_0x4036('0xdd')],BattleManager[_0x4036('0xdd')]=function(){this['_autoBattle']=ConfigManager['autoBattleAtStart'],this[_0x4036('0x38d')](_0x4036('0x5b3')),VisuMZ[_0x4036('0x600')][_0x4036('0x5e8')]['call'](this),this[_0x4036('0x38d')](_0x4036('0x3da'));},BattleManager[_0x4036('0x2a8')]=function(_0x15e429){const _0x1861d1=VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x71f')];_0x1861d1[_0x4036('0x760')]&&$gameTemp[_0x4036('0x5b')](_0x1861d1['BattleEndEvent']);const _0x152a3d='%1Event'[_0x4036('0x4d2')](_0x15e429);_0x1861d1[_0x152a3d]&&$gameTemp['reserveCommonEvent'](_0x1861d1[_0x152a3d]);},VisuMZ[_0x4036('0x600')][_0x4036('0x500')]=BattleManager[_0x4036('0x47e')],BattleManager[_0x4036('0x47e')]=function(){this[_0x4036('0x38d')]('BattleVictoryJS'),VisuMZ['BattleCore'][_0x4036('0x500')][_0x4036('0x286')](this),this['processPostBattleCommonEvents']('Victory');},VisuMZ[_0x4036('0x600')][_0x4036('0x56a')]=BattleManager[_0x4036('0x3b1')],BattleManager[_0x4036('0x3b1')]=function(){this[_0x4036('0x38d')](_0x4036('0x511')),VisuMZ[_0x4036('0x600')][_0x4036('0x56a')][_0x4036('0x286')](this),this['processPostBattleCommonEvents'](_0x4036('0x29d'));},VisuMZ[_0x4036('0x600')][_0x4036('0x551')]=BattleManager[_0x4036('0x400')],BattleManager[_0x4036('0x400')]=function(_0xff3b1a){this[_0x4036('0x49b')]=![],this[_0x4036('0x38d')](_0x4036('0x40')),VisuMZ[_0x4036('0x600')][_0x4036('0x551')][_0x4036('0x286')](this,_0xff3b1a),this[_0x4036('0x38d')](_0x4036('0x1ce'));},VisuMZ[_0x4036('0x600')][_0x4036('0x5fe')]=BattleManager[_0x4036('0x159')],BattleManager['startTurn']=function(){if(this[_0x4036('0x7c1')]())this['processBattleCoreJS']('PreStartTurnJS');VisuMZ['BattleCore'][_0x4036('0x5fe')][_0x4036('0x286')](this);if(this[_0x4036('0x7c1')]())this[_0x4036('0x38d')](_0x4036('0x7f7'));},VisuMZ[_0x4036('0x600')][_0x4036('0x1dd')]=BattleManager[_0x4036('0x702')],BattleManager[_0x4036('0x702')]=function(){const _0x418f96=this[_0x4036('0x398')][_0x4036('0x6f8')]();if(_0x418f96)_0x418f96['actionBattleCoreJS'](_0x4036('0x684'));VisuMZ[_0x4036('0x600')][_0x4036('0x1dd')][_0x4036('0x286')](this);if(_0x418f96)_0x418f96[_0x4036('0x736')]('PostStartActionJS');},VisuMZ[_0x4036('0x600')][_0x4036('0x794')]=BattleManager[_0x4036('0x25c')],BattleManager[_0x4036('0x25c')]=function(){const _0x13b67d=this[_0x4036('0x376')];if(_0x13b67d)_0x13b67d['actionBattleCoreJS'](_0x4036('0x59f'));VisuMZ[_0x4036('0x600')][_0x4036('0x794')][_0x4036('0x286')](this);if(_0x13b67d)_0x13b67d['actionBattleCoreJS'](_0x4036('0x44d'));},BattleManager[_0x4036('0x833')]=function(){!this[_0x4036('0x3b4')][_0x4036('0x5d')]()&&this['endAction']();},BattleManager[_0x4036('0x5cd')]=function(){this[_0x4036('0x66f')]=VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x71f')]['CalcEscapeRatioJS'][_0x4036('0x286')](this);},VisuMZ[_0x4036('0x600')][_0x4036('0x179')]=BattleManager[_0x4036('0x701')],BattleManager[_0x4036('0x701')]=function(){this[_0x4036('0x38d')](_0x4036('0x4b1')),BattleManager['_spriteset'][_0x4036('0x126')](),VisuMZ[_0x4036('0x600')]['BattleManager_onEscapeSuccess'][_0x4036('0x286')](this),this[_0x4036('0x2a8')](_0x4036('0x42d'));},VisuMZ['BattleCore']['BattleManager_onEscapeFailure']=BattleManager['onEscapeFailure'],BattleManager[_0x4036('0x803')]=function(){this[_0x4036('0x38d')](_0x4036('0x103'));const _0x3645c2=this[_0x4036('0x66f')];VisuMZ[_0x4036('0x600')][_0x4036('0x5ec')][_0x4036('0x286')](this),this['_escapeRatio']=_0x3645c2+VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x71f')]['CalcEscapeRaiseJS'][_0x4036('0x286')](this),this[_0x4036('0x2a8')]('EscapeFail');},BattleManager[_0x4036('0x74b')]=function(){let _0x123930=![];if(this[_0x4036('0x6ec')]())for(const _0x71f19c of $gameTroop[_0x4036('0x19d')]()){this[_0x4036('0x3b4')][_0x4036('0x5d7')](_0x4036('0x596'),TextManager[_0x4036('0x6ef')][_0x4036('0x4d2')](_0x71f19c)),this[_0x4036('0x3b4')][_0x4036('0x5d7')](_0x4036('0x712')),_0x123930=!![];}if(this['_preemptive'])this[_0x4036('0x3b4')][_0x4036('0x5d7')](_0x4036('0x596'),TextManager[_0x4036('0x70d')][_0x4036('0x4d2')]($gameParty[_0x4036('0x37d')]())),this[_0x4036('0x3b4')][_0x4036('0x5d7')](_0x4036('0x712'));else this[_0x4036('0x38e')]&&(this[_0x4036('0x3b4')][_0x4036('0x5d7')](_0x4036('0x596'),TextManager[_0x4036('0x7ec')][_0x4036('0x4d2')]($gameParty['name']())),this['_logWindow'][_0x4036('0x5d7')]('wait'));if(_0x123930){if('blYuS'!=='blYuS'){function _0x2f9487(){const _0x54fc23=_0x41f134[_0x4036('0x529')]();if(_0x54fc23)_0x54fc23['battler']()[_0x4036('0x174')]();_0x505463[_0x4036('0x600')][_0x4036('0x67')][_0x4036('0x286')](this);}}else this[_0x4036('0x3b4')][_0x4036('0x5d7')](_0x4036('0x712')),this[_0x4036('0x3b4')][_0x4036('0x5d7')](_0x4036('0x47b'));}if(this[_0x4036('0x15f')]()&&this[_0x4036('0x55c')]()){if(_0x4036('0x40f')===_0x4036('0x5c2')){function _0x46fec6(){this[_0x4036('0x53')][_0x4036('0x392')]=_0x4b1687[_0x4036('0x5c5')]();const _0x105438=_0x48b687[_0x4036('0x529')]();if(_0x105438===this[_0x4036('0x53')][_0x4036('0x529')])return;this[_0x4036('0x53')]['actor']=_0x105438||this[_0x4036('0x53')][_0x4036('0x529')];if(!_0x105438)return;else{if(_0x105438[_0x4036('0x31b')]()===''){this[_0x4036('0x53')][_0x4036('0x76f')]=_0x178949['_emptyBitmap'];return;}else{const _0x514b08=_0xf4299[_0x4036('0x7c2')](_0x105438['getBattlePortraitFilename']());_0x514b08[_0x4036('0x3fc')](this['processBorderActor'][_0x4036('0x1be')](this,_0x514b08));}}}}else this['_tpbNeedsPartyCommand']=![];}},BattleManager[_0x4036('0x6ec')]=function(){if(BattleManager[_0x4036('0x49b')])return![];return VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x3e6')]['EmergeText'];},VisuMZ[_0x4036('0x600')][_0x4036('0x42f')]=BattleManager[_0x4036('0x66a')],BattleManager[_0x4036('0x66a')]=function(){VisuMZ[_0x4036('0x600')][_0x4036('0x42f')][_0x4036('0x286')](this),this['isDTB']()&&this[_0x4036('0x55c')]()&&!this[_0x4036('0x38e')]&&$gameParty[_0x4036('0x211')]()&&this[_0x4036('0x758')]();},BattleManager[_0x4036('0x55c')]=function(){return VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x20')][_0x4036('0x6ac')];},BattleManager[_0x4036('0x4b0')]=function(_0x375cc0,_0xce3fa1){this[_0x4036('0x376')][_0x4036('0x761')]=_0xce3fa1,this['_logWindow']['displayReflection'](_0xce3fa1),this[_0x4036('0x3b4')][_0x4036('0x1bf')](_0x375cc0,this['_action']),this[_0x4036('0x376')][_0x4036('0x7fb')](_0x375cc0),this[_0x4036('0x3b4')][_0x4036('0x603')](_0x375cc0,_0x375cc0);},VisuMZ[_0x4036('0x600')][_0x4036('0x5c9')]=BattleManager[_0x4036('0x5f4')],BattleManager[_0x4036('0x5f4')]=function(_0x16b59c){if(this[_0x4036('0x7eb')]===_0x4036('0x5bc'))this['updateCustomActionSequence']();else{if(this[_0x4036('0x7eb')]===_0x4036('0x403')){if(_0x4036('0x1d8')!==_0x4036('0x1d8')){function _0x42d80b(){_0x3796e6[_0x4036('0x24d')][_0x4036('0x297')][_0x4036('0x286')](this);if(!_0x2f0ac3[_0x4036('0x1c1')]())this[_0x4036('0x691')]();}}else this['updateForceAction']();}else{if(_0x4036('0x508')===_0x4036('0x672')){function _0x4b47ae(){this[_0x4036('0x7d8')]=_0x420a93[_0x4036('0x18b')]||[0x0,0x0,0x0,0x0],this[_0x4036('0x7d8')]=_0x1ddd1a['makeDeepCopy'](this[_0x4036('0x7d8')]),this[_0x4036('0x1b4')]=_0x183bbe[_0x4036('0x6eb')]||0x0;const _0x1aa212=this[_0x4036('0x1')](),_0x26aecd=_0x357c86[_0x4036('0x5bd')](_0x1aa212*0x1e),_0xc0cdf3=this[_0x4036('0x655')](_0x26aecd,_0x1aa212);_0xc0cdf3[_0x4036('0x76f')][_0x4036('0x324')]=_0x4e28e2[_0x4036('0x568')](_0x29ce95[_0x4036('0x324')]),_0xc0cdf3[_0x4036('0x76f')][_0x4036('0x25f')](_0x28520a,0x0,0x0,_0x26aecd,_0x1aa212,_0x4036('0x723')),_0xc0cdf3['dy']=0x0;}}else VisuMZ[_0x4036('0x600')][_0x4036('0x5c9')][_0x4036('0x286')](this,_0x16b59c);}}},BattleManager['prepareCustomActionSequence']=function(){this['_allTargets']=this[_0x4036('0xdc')][_0x4036('0x638')](0x0),this[_0x4036('0x683')]=0x0,this['_target']=this[_0x4036('0x570')][0x0]||null,this[_0x4036('0x7eb')]=_0x4036('0x5bc');},BattleManager[_0x4036('0x4c9')]=function(){!this['updateEventMain']()&&!this[_0x4036('0x3b4')]['isBusy']()&&(this[_0x4036('0x7eb')]=_0x4036('0x5f6'));},BattleManager[_0x4036('0x403')]=function(_0x322e05){this[_0x4036('0x130')][_0x4036('0x2d8')](_0x322e05);const _0x28f556=JsonEx['makeDeepCopy'](_0x322e05['currentAction']());this[_0x4036('0xab')][_0x4036('0x5d7')]([_0x322e05,_0x28f556]);},BattleManager[_0x4036('0x41a')]=function(){},BattleManager[_0x4036('0x1e4')]=function(){if(this[_0x4036('0x15f')]())this[_0x4036('0x7eb')]=_0x4036('0x728');else this[_0x4036('0xab')][_0x4036('0x6b5')]>0x0?this[_0x4036('0x7eb')]=_0x4036('0x728'):this[_0x4036('0x66a')]();},BattleManager[_0x4036('0x749')]=function(){for(;;){const _0x1ea298=this[_0x4036('0x6f1')]();if(!_0x1ea298){if(_0x4036('0x4e3')==='eAdqD'){function _0x89d254(){_0xb25bba['BattleCore'][_0x4036('0x2d7')]['call'](this),this[_0x4036('0x7af')]=[];}}else return null;}if(_0x1ea298['isBattleMember']()&&_0x1ea298[_0x4036('0x729')]()){if(_0x4036('0x4dd')!=='tJoow')return _0x1ea298;else{function _0x4af69e(){const _0x42a9d0=this[_0x4036('0x14f')];_0x42a9d0[_0x4036('0xe8')]['clear']();const _0x331cb6=this[_0x4036('0x57d')](this[_0x4036('0x4fd')]());if(_0x331cb6===_0x4036('0x75f')&&this[_0x4036('0x24e')]()>0x0){const _0x3fc3c7=this['itemLineRect'](this['index']());let _0x3bf10e=this[_0x4036('0x6a5')](this['index']());_0x3bf10e=_0x3bf10e[_0x4036('0x7cc')](/\\I\[(\d+)\]/gi,''),_0x42a9d0[_0x4036('0x408')](),this['commandNameWindowDrawBackground'](_0x3bf10e,_0x3fc3c7),this[_0x4036('0x824')](_0x3bf10e,_0x3fc3c7),this[_0x4036('0x732')](_0x3bf10e,_0x3fc3c7);}}}}}},BattleManager[_0x4036('0x6f1')]=function(){if(this['_forcedBattlers'][_0x4036('0x6b5')]>0x0){const _0x4e5f72=this[_0x4036('0xab')][_0x4036('0x171')](),_0x195f66=_0x4e5f72[0x0];return _0x195f66['_actions']=_0x195f66[_0x4036('0x5ca')]||[],_0x195f66['_actions'][0x0]=_0x4e5f72[0x1],_0x195f66;}else{if(_0x4036('0x452')!==_0x4036('0x452')){function _0x3ace76(){if(!_0x535193[_0x4036('0x78a')]())return;if(!_0x105dcd['VisuMZ_3_ActSeqCamera'])return;_0x2e863c[_0x4036('0x653')](_0x4ad194,_0x570bf0);const _0x23424c=_0x393a7e['getLastPluginCommandInterpreter'](),_0xd53158=_0xaf03a7[_0x4036('0x5b5')];if(!_0x23424c)return;_0x7f76[_0x4036('0x2ab')](_0x468a57['Angle'],_0x15276c[_0x4036('0x346')],_0x461999[_0x4036('0x1e3')]);if(_0xd53158)_0x23424c[_0x4036('0x310')](_0x4036('0x405'));}}else return this[_0x4036('0x130')][_0x4036('0x171')]();}},VisuMZ[_0x4036('0x600')][_0x4036('0x60')]=Game_Battler['prototype']['forceAction'],Game_Battler[_0x4036('0x24d')][_0x4036('0x403')]=function(_0x50316d,_0x2ed4d9){VisuMZ[_0x4036('0x600')][_0x4036('0x60')][_0x4036('0x286')](this,_0x50316d,_0x2ed4d9),this[_0x4036('0x5ca')][this[_0x4036('0x5ca')][_0x4036('0x6b5')]-0x1][_0x4036('0x461')]=!![];},Game_Interpreter[_0x4036('0x24d')][_0x4036('0x13f')]=function(_0x580312){return this[_0x4036('0x43d')](_0x580312[0x0],_0x580312[0x1],_0x51d7e8=>{if(_0x4036('0x652')===_0x4036('0x106')){function _0x5943f2(){const _0x4556d4=this['itemLineRect'](_0x59d8de),_0x35312d=this[_0x4036('0x40c')](_0x343135)[_0x4036('0x42')];return _0x35312d<=_0x4556d4[_0x4036('0x42')]?_0x4036('0x28b'):_0x4036('0x75f');}}else!_0x51d7e8[_0x4036('0x5ee')]()&&(_0x51d7e8[_0x4036('0x403')](_0x580312[0x2],_0x580312[0x3]),BattleManager['forceAction'](_0x51d7e8));}),!![];},VisuMZ[_0x4036('0x600')]['BattleManager_selectNextCommand']=BattleManager[_0x4036('0x758')],BattleManager[_0x4036('0x758')]=function(){this[_0x4036('0x15f')]()?this[_0x4036('0xec')]():VisuMZ[_0x4036('0x600')][_0x4036('0x799')]['call'](this);},BattleManager[_0x4036('0xec')]=function(){if(this[_0x4036('0x462')]){if(this[_0x4036('0x462')]['selectNextCommand']())return;this['finishActorInput']();}else!this['_subject']&&this['selectNextActor']();},SceneManager[_0x4036('0x78a')]=function(){return this[_0x4036('0x423')]&&this[_0x4036('0x423')][_0x4036('0x6c8')]===Scene_Battle;},SceneManager[_0x4036('0x6c0')]=function(){return Spriteset_Battle[_0x4036('0x24d')][_0x4036('0x32e')]();},SceneManager[_0x4036('0x3a7')]=function(){if(SceneManager['isPreviousScene'](Scene_Options))return!![];return![];},SceneManager[_0x4036('0x164')]=function(){if(SceneManager[_0x4036('0xef')](Scene_Options))return!![];return![];},VisuMZ[_0x4036('0x600')][_0x4036('0x645')]=Game_Temp[_0x4036('0x24d')][_0x4036('0x507')],Game_Temp[_0x4036('0x24d')][_0x4036('0x507')]=function(_0xe4d77a,_0x349005,_0x16d476){_0xe4d77a=_0xe4d77a[_0x4036('0x3c4')]((_0x58b0db,_0x27fcaf,_0x49d005)=>_0x49d005[_0x4036('0x419')](_0x58b0db)===_0x27fcaf);if(SceneManager[_0x4036('0x78a')]()&&SceneManager[_0x4036('0x6c0')]()){if('tYwpL'===_0x4036('0x5ce'))_0x16d476=!_0x16d476;else{function _0x44de15(){this[_0x4036('0x1ac')][_0x4036('0x297')](),this[_0x4036('0x810')][_0x4036('0x19f')]();}}}VisuMZ[_0x4036('0x600')][_0x4036('0x645')]['call'](this,_0xe4d77a,_0x349005,_0x16d476),SceneManager['isSceneBattle']()&&BattleManager[_0x4036('0x5f8')][_0x4036('0x786')]();},Game_Temp[_0x4036('0x24d')]['setLastPluginCommandInterpreter']=function(_0xe40b52){this[_0x4036('0x66b')]=_0xe40b52;},Game_Temp[_0x4036('0x24d')][_0x4036('0x3df')]=function(){return this[_0x4036('0x66b')];},VisuMZ['BattleCore']['Game_System_initialize']=Game_System['prototype'][_0x4036('0x261')],Game_System[_0x4036('0x24d')]['initialize']=function(){VisuMZ[_0x4036('0x600')][_0x4036('0x458')][_0x4036('0x286')](this),this[_0x4036('0x501')]();},Game_System['prototype'][_0x4036('0x501')]=function(){this[_0x4036('0x6d')]=this['_defeatedEnemies']||[];},Game_System[_0x4036('0x24d')][_0x4036('0x6b6')]=function(){if(this[_0x4036('0x6d')]===undefined)this[_0x4036('0x17c')]();return this[_0x4036('0x6d')];},Game_System[_0x4036('0x24d')][_0x4036('0xb3')]=function(_0x152898){if(this[_0x4036('0x6d')]===undefined)this[_0x4036('0x17c')]();if(!_0x152898)return;if(this[_0x4036('0x6d')][_0x4036('0x747')](_0x152898))return;this[_0x4036('0x6d')]['push'](_0x152898),this[_0x4036('0x6d')]['sort']((_0x3e9cfd,_0x3450f3)=>_0x3e9cfd-_0x3450f3);},VisuMZ[_0x4036('0x600')][_0x4036('0x492')]=Game_BattlerBase['prototype']['addNewState'],Game_BattlerBase[_0x4036('0x24d')]['addNewState']=function(_0x299fa9){const _0xa576ca=this['isAlive']();VisuMZ[_0x4036('0x600')][_0x4036('0x492')][_0x4036('0x286')](this,_0x299fa9),this[_0x4036('0x68c')]()&&_0xa576ca&&this[_0x4036('0x416')]()&&(this[_0x4036('0xa9')]=!this[_0x4036('0x7b2')](),$gameSystem[_0x4036('0xb3')](this[_0x4036('0x345')]()));},Game_Enemy['prototype'][_0x4036('0x7b2')]=function(){return $gameSystem['getDefeatedEnemies']()[_0x4036('0x747')](this['_enemyId']);},VisuMZ[_0x4036('0x600')][_0x4036('0x525')]=Game_BattlerBase[_0x4036('0x24d')][_0x4036('0x1ef')],Game_BattlerBase['prototype'][_0x4036('0x1ef')]=function(_0x10b250){VisuMZ['BattleCore'][_0x4036('0x525')]['call'](this,_0x10b250);if(this[_0x4036('0x68c')]()&&_0x10b250===this[_0x4036('0x1ca')]()&&this[_0x4036('0x729')]()){if(_0x4036('0x77f')===_0x4036('0x6b8')){function _0x2ecea8(){if(!_0x9efe57[_0x4036('0x78a')]())return;if(!this[_0x4036('0x304')]())return;if(_0x55fbcc[_0x4036('0x6b5')]<=0x0)return;_0xb3dba3=_0x1b2f8f||{},_0x5358c6[_0x4036('0x324')]=_0x570201[_0x4036('0x324')]||_0x4036('0x291'),_0x24d850[_0x4036('0x18b')]=_0x34d7f6['flashColor']||[0x0,0x0,0x0,0x0],_0x2e3ae6[_0x4036('0x6eb')]=_0x2dc1f3[_0x4036('0x6eb')]||0x0,this[_0x4036('0x304')]()[_0x4036('0x50c')](_0x19d931,_0x22abe5,_0x3ffff6);}}else this[_0x4036('0xa9')]=![];}if(SceneManager['isSceneBattle']()){if(_0x4036('0x23b')!==_0x4036('0x23b')){function _0x3959b6(){this[_0x4036('0x7d4')]('escape');}}else this[_0x4036('0x56c')]();}},VisuMZ[_0x4036('0x600')][_0x4036('0x4d9')]=Game_Action[_0x4036('0x24d')]['clear'],Game_Action[_0x4036('0x24d')][_0x4036('0x47b')]=function(){VisuMZ[_0x4036('0x600')][_0x4036('0x4d9')][_0x4036('0x286')](this),this[_0x4036('0x634')]={'arPenRate':0x0,'arPenFlat':0x0,'arRedRate':0x0,'arRedFlat':0x0},this['_multipliers']={'criticalHitRate':0x1,'criticalHitFlat':0x0,'criticalDmgRate':0x1,'criticalDmgFlat':0x0,'damageRate':0x1,'damageFlat':0x0,'hitRate':0x1,'hitFlat':0x0};},Game_Action[_0x4036('0x24d')]['makeDamageValue']=function(_0x5508b5,_0x4e4233){return VisuMZ[_0x4036('0x600')][_0x4036('0x635')]['Damage'][_0x4036('0x695')][_0x4036('0x286')](this,_0x5508b5,_0x4e4233);},Game_Action[_0x4036('0x24d')][_0x4036('0x820')]=function(_0x3003c3,_0x5a44c2){return VisuMZ['BattleCore'][_0x4036('0x635')][_0x4036('0x559')]['VarianceFormulaJS'][_0x4036('0x286')](this,_0x3003c3,_0x5a44c2);},Game_Action[_0x4036('0x24d')][_0x4036('0x4be')]=function(_0x246968,_0x26d96f){return VisuMZ['BattleCore'][_0x4036('0x635')][_0x4036('0x559')]['GuardFormulaJS'][_0x4036('0x286')](this,_0x246968,_0x26d96f);},VisuMZ['BattleCore'][_0x4036('0x13d')]=Game_Action['prototype'][_0x4036('0x2ba')],Game_Action['prototype'][_0x4036('0x2ba')]=function(_0x39abc2){const _0x3ce505=this['item']()['note'];if(_0x3ce505[_0x4036('0x161')](/<ALWAYS HIT>/i))return 0x1;else{if(_0x3ce505[_0x4036('0x161')](/<ALWAYS HIT RATE: (\d+)([%％])>/i)){if(_0x4036('0xd1')===_0x4036('0xd1'))return Number(RegExp['$1'])/0x64;else{function _0x426a5a(){_0x37de1b[_0x4036('0x7b0')](_0x5be2bd);}}}else{let _0xa2551c=VisuMZ[_0x4036('0x600')]['Game_Action_itemHit'][_0x4036('0x286')](this,_0x39abc2);return _0xa2551c=this[_0x4036('0x206')][_0x4036('0x823')]*_0xa2551c+this[_0x4036('0x206')]['hitFlat'],_0xa2551c;}}},Game_Action['prototype'][_0x4036('0x28')]=function(_0x2dc59f){if(!this['item']()[_0x4036('0xd4')][_0x4036('0x3c8')])return 0x0;let _0x43c44a=VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x559')][_0x4036('0x627')]['call'](this,_0x2dc59f);return _0x43c44a=this['_multipliers'][_0x4036('0x95')]*_0x43c44a+this[_0x4036('0x206')][_0x4036('0x340')],_0x43c44a;},Game_Action[_0x4036('0x24d')][_0x4036('0x56e')]=function(_0x5cce30){return _0x5cce30=VisuMZ[_0x4036('0x600')]['Settings']['Damage'][_0x4036('0x5f7')][_0x4036('0x286')](this,_0x5cce30),_0x5cce30=this['_multipliers'][_0x4036('0x4c4')]*_0x5cce30+this['_multipliers'][_0x4036('0x675')],_0x5cce30;},VisuMZ[_0x4036('0x600')]['Game_Action_evalDamageFormula']=Game_Action[_0x4036('0x24d')]['evalDamageFormula'],Game_Action['prototype'][_0x4036('0x284')]=function(_0x189e8b){const _0x21068c=DataManager[_0x4036('0x165')](this['item']());if(_0x21068c===_0x4036('0x108')){if(_0x4036('0x750')===_0x4036('0x46c')){function _0x206639(){this[_0x4036('0x38d')]('BattleDefeatJS'),_0x12165c['BattleCore']['BattleManager_processDefeat'][_0x4036('0x286')](this),this[_0x4036('0x2a8')]('Defeat');}}else return VisuMZ[_0x4036('0x600')][_0x4036('0xc1')][_0x4036('0x286')](this,_0x189e8b);}else{if(_0x4036('0x1b6')!==_0x4036('0x1b6')){function _0x1515fb(){if(_0x478510[_0x4036('0x32f')]())this[_0x4036('0x758')]();else _0x121771[_0x4036('0xa0')]()&&_0x5ee5b0[_0x4036('0x600')]['Scene_Battle_startPartyCommandSelection'][_0x4036('0x286')](this);}}else return this[_0x4036('0x4')](_0x189e8b);}},Game_Action[_0x4036('0x24d')][_0x4036('0x4fe')]=function(){if(this[_0x4036('0x13a')]()['note'][_0x4036('0x161')](/<DAMAGE STYLE:[ ](.*)>/i)){const _0x29513c=String(RegExp['$1'])[_0x4036('0x6bc')]()[_0x4036('0x330')]();return _0x29513c;}return _0x4036('0x108');},Game_Action[_0x4036('0x24d')][_0x4036('0x4')]=function(_0x32b5f9){const _0x75a551=DataManager[_0x4036('0x165')](this['item']()),_0x3160eb=VisuMZ['DamageStyles'][_0x75a551];try{if(_0x4036('0x38f')===_0x4036('0x91')){function _0x3db774(){if(this[_0x4036('0x3b7')]<=0x0)return;if(!this[_0x4036('0x312')])return;const _0x2ac4b8=this[_0x4036('0x3b7')],_0x52d568=this[_0x4036('0x34a')],_0xd7ad71=this['_skewEasing'],_0x28ff18=this[_0x4036('0x312')];_0x5b890e['VisuMZ_0_CoreEngine']?(_0x28ff18[_0x4036('0x319')]['x']=this[_0x4036('0x68')](_0x28ff18[_0x4036('0x319')]['x'],this[_0x4036('0x788')],_0x2ac4b8,_0x52d568,_0xd7ad71),_0x28ff18['skew']['y']=this[_0x4036('0x68')](_0x28ff18[_0x4036('0x319')]['y'],this[_0x4036('0x580')],_0x2ac4b8,_0x52d568,_0xd7ad71)):(_0x28ff18['skew']['x']=(_0x28ff18[_0x4036('0x319')]['x']*(_0x2ac4b8-0x1)+this['_targetSkewX'])/_0x2ac4b8,_0x28ff18[_0x4036('0x319')]['y']=(_0x28ff18[_0x4036('0x319')]['y']*(_0x2ac4b8-0x1)+this[_0x4036('0x580')])/_0x2ac4b8);this[_0x4036('0x3b7')]--;if(this[_0x4036('0x3b7')]<=0x0)this[_0x4036('0x5a6')]();}}else return _0x3160eb[_0x4036('0x43c')][_0x4036('0x286')](this,_0x32b5f9);}catch(_0x1fdce0){if('KoMcu'===_0x4036('0x598')){if($gameTemp[_0x4036('0xe3')]())console[_0x4036('0x2a6')](_0x1fdce0);return VisuMZ['BattleCore'][_0x4036('0xc1')][_0x4036('0x286')](this);}else{function _0xeeb74a(){const _0xb69be0=this[_0x4036('0x27e')](_0x2e6936);this[_0x4036('0xb2')](_0x44c23a,_0xb69be0['x'],_0xb69be0['y'],_0xb69be0[_0x4036('0x42')],_0xb69be0[_0x4036('0x28f')]);}}}},Game_Action[_0x4036('0x24d')][_0x4036('0xca')]=function(_0x11eb24,_0xecaf23){if(this[_0x4036('0x505')]())return _0xecaf23;const _0x6d9250=this[_0x4036('0x449')](),_0x55c9ad=_0x11eb24;let _0x49f922=[],_0x52698f=[];_0x49f922[_0x4036('0x5d7')](this[_0x4036('0x634')][_0x4036('0x7d')],this[_0x4036('0x634')]['arRedFlat']),_0x52698f[_0x4036('0x5d7')](this[_0x4036('0x634')]['arPenRate'],this[_0x4036('0x634')][_0x4036('0x45e')]);const _0xf26623=this[_0x4036('0x4a1')]()?/<ARMOR REDUCTION:[ ](\d+\.?\d*)>/i:/<MAGIC REDUCTION:[ ](\d+\.?\d*)>/i,_0x46fbca=this[_0x4036('0x4a1')]()?/<ARMOR REDUCTION:[ ](\d+\.?\d*)([%％])>/i:/<MAGIC REDUCTION:[ ](\d+\.?\d*)([%％])>/i,_0x1c38c7=this[_0x4036('0x4a1')]()?/<ARMOR PENETRATION:[ ](\d+\.?\d*)>/i:/<MAGIC PENETRATION:[ ](\d+\.?\d*)>/i,_0x275b78=this[_0x4036('0x4a1')]()?/<ARMOR PENETRATION:[ ](\d+\.?\d*)([%％])>/i:/<MAGIC PENETRATION:[ ](\d+\.?\d*)([%％])>/i;_0x49f922=_0x49f922[_0x4036('0x6df')](_0x55c9ad[_0x4036('0x3af')]()[_0x4036('0x5a4')](_0x16c2d0=>_0x16c2d0&&_0x16c2d0['note'][_0x4036('0x161')](_0xf26623)?Number(RegExp['$1']):0x0)),_0x52698f=_0x52698f[_0x4036('0x6df')](_0x55c9ad[_0x4036('0x3af')]()[_0x4036('0x5a4')](_0x2e8626=>_0x2e8626&&_0x2e8626[_0x4036('0x826')]['match'](_0x46fbca)?Number(RegExp['$1'])/0x64:0x0)),_0x49f922=_0x49f922[_0x4036('0x6df')](_0x6d9250['traitObjects']()[_0x4036('0x5a4')](_0x22e2dd=>_0x22e2dd&&_0x22e2dd['note'][_0x4036('0x161')](_0x1c38c7)?Number(RegExp['$1']):0x0)),_0x52698f=_0x52698f[_0x4036('0x6df')](_0x6d9250[_0x4036('0x3af')]()[_0x4036('0x5a4')](_0x13c9f1=>_0x13c9f1&&_0x13c9f1['note'][_0x4036('0x161')](_0x275b78)?Number(RegExp['$1'])/0x64:0x0));this['item']()[_0x4036('0x826')][_0x4036('0x161')](_0x1c38c7)&&_0x49f922[_0x4036('0x5d7')](Number(RegExp['$1']));if(this[_0x4036('0x13a')]()['note'][_0x4036('0x161')](_0x275b78)){if('KRsAr'===_0x4036('0x1a'))_0x52698f[_0x4036('0x5d7')](Number(RegExp['$1']));else{function _0x385f10(){_0x3fa61c['changeWeather'](_0x4152d7[0x0],_0x587f42[0x1],_0x2b3f47[0x2]);if(_0x538386[0x3])this[_0x4036('0x712')](_0x1df5db[0x2]);return!![];}}}return _0xecaf23=_0x49f922[_0x4036('0x6d7')]((_0x189290,_0x207193)=>_0x189290-_0x207193,_0xecaf23),_0xecaf23>0x0&&(_0xecaf23=_0x52698f[_0x4036('0x6d7')]((_0x2270ca,_0x3509f7)=>_0x2270ca*(0x1-_0x3509f7),_0xecaf23)),_0xecaf23;},VisuMZ[_0x4036('0x600')][_0x4036('0x243')]=Game_Action[_0x4036('0x24d')][_0x4036('0x5da')],Game_Action['prototype'][_0x4036('0x5da')]=function(_0x1ad272,_0x5cafc5){_0x5cafc5=_0x5cafc5*this[_0x4036('0x206')]['damageRate'],_0x5cafc5+=this[_0x4036('0x206')][_0x4036('0x5c7')]*(_0x5cafc5>=0x0?0x1:-0x1),_0x5cafc5=this['applyBattleCoreJS'](_0x4036('0x75c'),_0x1ad272,_0x5cafc5,![]),_0x5cafc5=this[_0x4036('0x780')](_0x5cafc5),_0x5cafc5=Math[_0x4036('0x488')](_0x5cafc5),this['_executedValue']=_0x5cafc5,this[_0x4036('0x93')]=this[_0x4036('0x93')]||0x0,this['_totalValue']+=_0x5cafc5,VisuMZ[_0x4036('0x600')]['Game_Action_executeDamage'][_0x4036('0x286')](this,_0x1ad272,_0x5cafc5),this[_0x4036('0x73a')]('PostDamage%1JS',_0x1ad272,_0x5cafc5,!![]);},Game_Action[_0x4036('0x24d')][_0x4036('0x780')]=function(_0x607060){if(this[_0x4036('0x3f2')]())return _0x607060;return _0x607060=this['applySoftDamageCap'](_0x607060),_0x607060=this[_0x4036('0x751')](_0x607060),_0x607060;},Game_Action[_0x4036('0x24d')]['isBypassDamageCap']=function(){const _0xa771e0=/<BYPASS DAMAGE CAP>/i;if(this[_0x4036('0x13a')]()[_0x4036('0x826')][_0x4036('0x161')](_0xa771e0))return!![];if(this[_0x4036('0x449')]()[_0x4036('0x3af')]()[_0x4036('0x275')](_0xc30b1a=>_0xc30b1a&&_0xc30b1a['note']['match'](_0xa771e0)))return!![];return!VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x559')][_0x4036('0x58a')];},Game_Action[_0x4036('0x24d')][_0x4036('0x5d8')]=function(_0x270823){if(!VisuMZ[_0x4036('0x600')]['Settings'][_0x4036('0x559')]['EnableSoftCap'])return _0x270823;const _0x4ddb67=/<BYPASS SOFT DAMAGE CAP>/i;if(this['item']()['note'][_0x4036('0x161')](_0x4ddb67))return!![];if(this[_0x4036('0x449')]()[_0x4036('0x3af')]()[_0x4036('0x275')](_0x5004f8=>_0x5004f8&&_0x5004f8[_0x4036('0x826')][_0x4036('0x161')](_0x4ddb67)))return!![];const _0x20a596=_0x270823<0x0?-0x1:0x1;_0x270823=Math[_0x4036('0x38c')](_0x270823);let _0x4bfc0b=this['subject']()[_0x4036('0x276')]();this['item']()[_0x4036('0x826')][_0x4036('0x161')](/<SOFT DAMAGE CAP:[ ]([\+\-]\d+)([%％])>/i)&&(_0x4bfc0b+=Number(RegExp['$1'])/0x64);_0x4bfc0b=_0x4bfc0b[_0x4036('0x4d6')](0.01,0x1);const _0x228282=this[_0x4036('0x4eb')](),_0x3f7597=_0x4bfc0b*_0x228282;if(_0x270823>_0x3f7597&&_0x228282>_0x3f7597){if(_0x4036('0x1d0')==='Xrqec'){function _0xa1f038(){return this['isDTB']();}}else{_0x270823-=_0x3f7597;const _0x2cb631=VisuMZ[_0x4036('0x600')]['Settings'][_0x4036('0x559')][_0x4036('0x807')],_0x4d1e15=Math[_0x4036('0x577')](0x1-_0x270823/((_0x228282-_0x3f7597)*_0x2cb631+_0x270823),0.01);_0x270823*=_0x4d1e15,_0x270823+=_0x3f7597;}}return _0x270823*_0x20a596;},Game_Action[_0x4036('0x24d')]['getHardDamageCap']=function(){return this[_0x4036('0x13a')]()[_0x4036('0x826')][_0x4036('0x161')](/<DAMAGE CAP:[ ](\d+)>/i)?Number(RegExp['$1']):this[_0x4036('0x449')]()[_0x4036('0x302')]();},Game_Action['prototype'][_0x4036('0x751')]=function(_0x4a6ee0){let _0x23107d=this[_0x4036('0x4eb')]();return _0x4a6ee0['clamp'](-_0x23107d,_0x23107d);},VisuMZ['BattleCore']['Game_Action_apply']=Game_Action[_0x4036('0x24d')][_0x4036('0x7fb')],Game_Action[_0x4036('0x24d')][_0x4036('0x7fb')]=function(_0x389457){this['applyBattleCoreJS'](_0x4036('0x363'),_0x389457,0x0,!![]),VisuMZ['BattleCore'][_0x4036('0x793')]['call'](this,_0x389457),this[_0x4036('0x73a')](_0x4036('0x393'),_0x389457,this[_0x4036('0x548')]||0x0,!![]);},Game_Action[_0x4036('0x24d')][_0x4036('0x73a')]=function(_0x4eaa5d,_0x6cf989,_0x23a2a7,_0x92793f){_0x23a2a7=_0x23a2a7||0x0;const _0x14d807=_0x23a2a7,_0x5e374e=VisuMZ[_0x4036('0x600')]['Settings'][_0x4036('0x71f')],_0x175537=_0x4eaa5d[_0x4036('0x4d2')]('');if(_0x5e374e[_0x175537]){_0x23a2a7=_0x5e374e[_0x175537][_0x4036('0x286')](this,_0x23a2a7,_0x6cf989);if(_0x92793f)_0x23a2a7=_0x14d807;}let _0xe34e39=VisuMZ[_0x4036('0x600')][_0x4036('0x435')](this[_0x4036('0x13a')](),_0x4eaa5d[_0x4036('0x4d2')](''));if(VisuMZ['BattleCore']['JS'][_0xe34e39]){_0x23a2a7=VisuMZ[_0x4036('0x600')]['JS'][_0xe34e39]['call'](this,this['subject'](),_0x6cf989,this[_0x4036('0x13a')](),_0x23a2a7);if(_0x92793f)_0x23a2a7=_0x14d807;}for(const _0x4f0d77 of this[_0x4036('0x449')]()['traitObjects']()){if('mdKcW'==='mdKcW'){if(!_0x4f0d77)continue;_0xe34e39=VisuMZ[_0x4036('0x600')]['createKeyJS'](_0x4f0d77,_0x4eaa5d[_0x4036('0x4d2')](_0x4036('0x79')));if(VisuMZ[_0x4036('0x600')]['JS'][_0xe34e39]){_0x23a2a7=VisuMZ[_0x4036('0x600')]['JS'][_0xe34e39]['call'](this,this[_0x4036('0x449')](),_0x6cf989,_0x4f0d77,_0x23a2a7);if(_0x92793f)_0x23a2a7=_0x14d807;}}else{function _0x1021eb(){const _0xd82255=this[_0x4036('0x663')](),_0xf15142=_0x51a379[_0x4036('0x600')][_0x4036('0x635')]['ActorCmd']['CmdIconItem'],_0x4885c8=_0xd82255===_0x4036('0x45f')?_0x2ab937['item']:_0x4036('0x7fa')[_0x4036('0x4d2')](_0xf15142,_0x338328[_0x4036('0x13a')]),_0x4aa509=this[_0x4036('0x182')]();this[_0x4036('0x1e2')](_0x4885c8,_0x4036('0x13a'),_0x4aa509);}}}for(const _0x31295d of _0x6cf989[_0x4036('0x3af')]()){if(!_0x31295d)continue;_0xe34e39=VisuMZ['BattleCore'][_0x4036('0x435')](_0x31295d,_0x4eaa5d[_0x4036('0x4d2')](_0x4036('0x14e')));if(VisuMZ[_0x4036('0x600')]['JS'][_0xe34e39]){_0x23a2a7=VisuMZ['BattleCore']['JS'][_0xe34e39][_0x4036('0x286')](this,this[_0x4036('0x449')](),_0x6cf989,_0x31295d,_0x23a2a7);if(_0x92793f)_0x23a2a7=_0x14d807;}}return _0x23a2a7;},Game_Action[_0x4036('0x24d')][_0x4036('0x736')]=function(_0x4adc7c){const _0x5a0d36=this[_0x4036('0x93')]||0x0,_0x2c66f0=VisuMZ['BattleCore'][_0x4036('0x635')][_0x4036('0x71f')],_0x41caa6=_0x4adc7c[_0x4036('0x4d2')]('');_0x2c66f0[_0x41caa6]&&_0x2c66f0[_0x41caa6][_0x4036('0x286')](this,_0x5a0d36);let _0xb84b0b=VisuMZ[_0x4036('0x600')][_0x4036('0x435')](this['item'](),_0x4adc7c);VisuMZ[_0x4036('0x600')]['JS'][_0xb84b0b]&&VisuMZ[_0x4036('0x600')]['JS'][_0xb84b0b][_0x4036('0x286')](this,this[_0x4036('0x449')](),this[_0x4036('0x449')](),this['item'](),_0x5a0d36);for(const _0x25e9a2 of this['subject']()[_0x4036('0x3af')]()){if(!_0x25e9a2)continue;_0xb84b0b=VisuMZ[_0x4036('0x600')][_0x4036('0x435')](_0x25e9a2,_0x4adc7c);if(VisuMZ[_0x4036('0x600')]['JS'][_0xb84b0b]){if(_0x4036('0x2f3')==='Ffnoh')VisuMZ[_0x4036('0x600')]['JS'][_0xb84b0b]['call'](this,this[_0x4036('0x449')](),this[_0x4036('0x449')](),_0x25e9a2,_0x5a0d36);else{function _0x392085(){if(this[_0x4036('0x649')]()){const _0x69067d=this[_0x4036('0xd0')][_0x4036('0x671')]();this[_0x4036('0x76f')]=new _0xc35c75(_0x69067d[_0x4036('0x42')],_0x69067d[_0x4036('0x28f')]);}else _0x4cf7f4[_0x4036('0x600')][_0x4036('0x4b2')][_0x4036('0x286')](this,_0x360d61);}}}}},Game_Action[_0x4036('0x24d')][_0x4036('0x26d')]=function(){return VisuMZ[_0x4036('0x600')]['Settings'][_0x4036('0x71f')]['CalcActionSpeedJS']['call'](this);},Game_Action['prototype']['allowRandomSpeed']=function(){return VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x71f')][_0x4036('0xeb')];},Game_Action['prototype'][_0x4036('0xe9')]=function(){return this[_0x4036('0x13a')]()['note'][_0x4036('0x161')](/<JS TARGETS>/i);},Game_Action[_0x4036('0x24d')][_0x4036('0x369')]=function(){if(!this[_0x4036('0x19')]&&this[_0x4036('0x449')]()['isConfused']())return![];if(this[_0x4036('0xe9')]())return!![];return typeof this[_0x4036('0x13a')]()[_0x4036('0x366')]===_0x4036('0x465');},VisuMZ[_0x4036('0x600')]['Game_Action_isForOpponent']=Game_Action[_0x4036('0x24d')]['isForOpponent'],Game_Action[_0x4036('0x24d')][_0x4036('0x341')]=function(){return this['isBattleCoreTargetScope']()&&!this[_0x4036('0xe9')]()?this[_0x4036('0x50d')]():VisuMZ[_0x4036('0x600')][_0x4036('0xad')]['call'](this);},Game_Action['prototype'][_0x4036('0x50d')]=function(){const _0x46c8f1=this[_0x4036('0x13a')]()['scope'];return _0x46c8f1[_0x4036('0x161')](/(?:ENEMY|ENEMIES|FOE|FOES)/i);},VisuMZ[_0x4036('0x600')][_0x4036('0x2c2')]=Game_Action[_0x4036('0x24d')][_0x4036('0x52a')],Game_Action[_0x4036('0x24d')]['isForFriend']=function(){if(this[_0x4036('0x369')]()&&!this[_0x4036('0xe9')]())return this[_0x4036('0x75')]();else{if('LtYYj'!==_0x4036('0x5b6')){function _0x13f0ef(){return this['_skewDuration']>0x0;}}else return VisuMZ[_0x4036('0x600')]['Game_Action_isForFriend'][_0x4036('0x286')](this);}},Game_Action[_0x4036('0x24d')]['isForFriendBattleCore']=function(){const _0x3a6c60=this['item']()[_0x4036('0x366')];return _0x3a6c60[_0x4036('0x161')](/(?:ALLY|ALLIES|FRIEND|FRIENDS)/i);},VisuMZ[_0x4036('0x600')][_0x4036('0x3c1')]=Game_Action[_0x4036('0x24d')][_0x4036('0x76b')],Game_Action['prototype'][_0x4036('0x76b')]=function(){return this['isBattleCoreTargetScope']()&&!this[_0x4036('0xe9')]()?this[_0x4036('0x22e')]():VisuMZ[_0x4036('0x600')][_0x4036('0x3c1')][_0x4036('0x286')](this);},Game_Action[_0x4036('0x24d')][_0x4036('0x22e')]=function(){const _0x5c1483=this['item']()[_0x4036('0x366')];return _0x5c1483['match'](/(?:RAND|RANDOM)/i);},VisuMZ[_0x4036('0x600')][_0x4036('0x4f')]=Game_Action[_0x4036('0x24d')][_0x4036('0x2ac')],Game_Action['prototype']['needsSelection']=function(){if(this['isBattleCoreTargetScope']()&&!this['isCustomBattleScope']()){if(_0x4036('0x36d')!==_0x4036('0xfa'))return this['needsSelectionBattleCore']();else{function _0x244f10(){if(!this[_0x4036('0x13a')]()[_0x4036('0xd4')][_0x4036('0x3c8')])return 0x0;let _0x1dc177=_0x9086c[_0x4036('0x600')]['Settings'][_0x4036('0x559')][_0x4036('0x627')][_0x4036('0x286')](this,_0x3d60b2);return _0x1dc177=this[_0x4036('0x206')][_0x4036('0x95')]*_0x1dc177+this[_0x4036('0x206')]['criticalHitFlat'],_0x1dc177;}}}else return VisuMZ['BattleCore'][_0x4036('0x4f')]['call'](this);},Game_Action[_0x4036('0x24d')][_0x4036('0x4cc')]=function(){const _0x46779a=this[_0x4036('0x13a')]()[_0x4036('0x366')];if(_0x46779a[_0x4036('0x161')](/RANDOM/i))return![];return VisuMZ[_0x4036('0x600')][_0x4036('0x4f')]['call'](this);},VisuMZ[_0x4036('0x600')][_0x4036('0x7cf')]=Game_Action[_0x4036('0x24d')]['makeTargets'],Game_Action[_0x4036('0x24d')][_0x4036('0x3d7')]=function(){return this[_0x4036('0x369')]()?this['makeTargetsBattleCore']():VisuMZ[_0x4036('0x600')][_0x4036('0x7cf')][_0x4036('0x286')](this);},Game_Action['prototype'][_0x4036('0x2f')]=function(){let _0x45362a=[];const _0x428909=String(this[_0x4036('0x13a')]()[_0x4036('0x366')]),_0x1ffe4d=VisuMZ[_0x4036('0x600')][_0x4036('0x435')](this[_0x4036('0x13a')](),_0x4036('0xff'));if(VisuMZ[_0x4036('0x600')]['JS'][_0x1ffe4d]){if('hTbBQ'===_0x4036('0x499')){function _0x1f1d03(){if(_0x4db675[_0x4036('0x3a7')]())return;_0x140700[_0x4036('0x600')][_0x4036('0xd9')][_0x4036('0x286')](this);}}else{const _0x3debc4=VisuMZ[_0x4036('0x600')][_0x4036('0x435')](this[_0x4036('0x13a')](),_0x4036('0xff'));return _0x45362a=VisuMZ[_0x4036('0x600')]['JS'][_0x3debc4]['call'](this,this['subject'](),_0x45362a),this['repeatTargets'](_0x45362a);}}if(_0x428909[_0x4036('0x161')](/(\d+) RANDOM ANY/i)){let _0x3e46a8=Number(RegExp['$1']);while(_0x3e46a8--){if(_0x4036('0x110')!==_0x4036('0x3dc')){const _0x452827=Math[_0x4036('0x804')](0x2)===0x0?this['opponentsUnit']():this['friendsUnit']();_0x45362a['push'](_0x452827[_0x4036('0x175')]());}else{function _0x23885a(){_0xd19505[_0x4036('0x600')][_0x4036('0x4d9')]['call'](this),this[_0x4036('0x634')]={'arPenRate':0x0,'arPenFlat':0x0,'arRedRate':0x0,'arRedFlat':0x0},this[_0x4036('0x206')]={'criticalHitRate':0x1,'criticalHitFlat':0x0,'criticalDmgRate':0x1,'criticalDmgFlat':0x0,'damageRate':0x1,'damageFlat':0x0,'hitRate':0x1,'hitFlat':0x0};}}}return this[_0x4036('0x1ad')](_0x45362a);}if(_0x428909[_0x4036('0x161')](/(\d+) RANDOM (?:ENEMY|ENEMIES|FOE|FOES)/i)){let _0x38f859=Number(RegExp['$1']);while(_0x38f859--){if(_0x4036('0x39e')!==_0x4036('0x39e')){function _0xbdd958(){if(!_0x56f0d9[_0x4036('0x7e7')])return;if(this['constructor']===_0x27d190)return;const _0x111d17=_0x30e0e3['BattleCore']['Settings'][_0x4036('0x7a1')],_0x7d1344=new _0x46829b();_0x7d1344[_0x4036('0x240')]['x']=_0x111d17[_0x4036('0x6c5')],_0x7d1344['anchor']['y']=_0x111d17[_0x4036('0x49e')],_0x7d1344[_0x4036('0x325')]['x']=_0x7d1344[_0x4036('0x325')]['y']=_0x111d17[_0x4036('0x27a')],this[_0x4036('0x193')]=_0x7d1344,this[_0x4036('0x356')](this[_0x4036('0x193')]);}}else _0x45362a[_0x4036('0x5d7')](this['opponentsUnit']()['trueRandomTarget']());}return this[_0x4036('0x1ad')](_0x45362a);}if(_0x428909[_0x4036('0x161')](/(\d+) RANDOM (?:ALLY|ALLIES|FRIEND|FRIENDS)/i)){let _0x2ba058=Number(RegExp['$1']);while(_0x2ba058--){if(_0x4036('0x564')!==_0x4036('0x564')){function _0x13a1f4(){const _0x378fde=_0xcf4d52['_scene'][_0x4036('0x1ac')];if(_0x378fde)_0x378fde[_0x4036('0x5fd')](this);}}else _0x45362a[_0x4036('0x5d7')](this[_0x4036('0xac')]()[_0x4036('0x175')]());}return this['repeatTargets'](_0x45362a);}if(_0x428909['match'](/ALL (?:ALLY|ALLIES|FRIEND|FRIENDS) (?:BUT|EXCEPT) (?:USER|SELF)/i)){if(_0x4036('0x429')!==_0x4036('0x429')){function _0xf5b404(){return[_0x39d0d2];}}else return _0x45362a['push'](...this[_0x4036('0xac')]()[_0x4036('0x6a0')]()[_0x4036('0x3c4')](_0x439f20=>_0x439f20!==this[_0x4036('0x449')]())),this[_0x4036('0x1ad')](_0x45362a);}return VisuMZ[_0x4036('0x600')][_0x4036('0x7cf')][_0x4036('0x286')](this);},Game_Action[_0x4036('0x24d')][_0x4036('0x124')]=function(_0x294324){const _0xf82eee=[];for(let _0x203a40=0x0;_0x203a40<this[_0x4036('0x629')]();_0x203a40++){_0xf82eee[_0x4036('0x5d7')](_0x294324[_0x4036('0x175')]());}return _0xf82eee;},VisuMZ[_0x4036('0x600')]['Game_Action_itemEffectAddAttackState']=Game_Action[_0x4036('0x24d')][_0x4036('0x771')],Game_Action[_0x4036('0x24d')][_0x4036('0x771')]=function(_0x1f70ee,_0x578202){const _0x3cd113=_0x1f70ee[_0x4036('0x2')]();if(this[_0x4036('0x449')]()['attackStates']()[_0x4036('0x747')](_0x1f70ee[_0x4036('0x1ca')]())){if(_0x4036('0x3fd')!==_0x4036('0x29b'))_0x1f70ee[_0x4036('0x11c')](![]);else{function _0x3e875c(){for(;;){const _0x2846a8=this[_0x4036('0x6f1')]();if(!_0x2846a8)return null;if(_0x2846a8['isBattleMember']()&&_0x2846a8['isAlive']())return _0x2846a8;}}}}VisuMZ[_0x4036('0x600')]['Game_Action_itemEffectAddAttackState'][_0x4036('0x286')](this,_0x1f70ee,_0x578202),_0x1f70ee['setImmortal'](_0x3cd113);},VisuMZ[_0x4036('0x600')]['Game_Action_itemEffectAddNormalState']=Game_Action[_0x4036('0x24d')]['itemEffectAddNormalState'],Game_Action['prototype'][_0x4036('0xcb')]=function(_0x1d35f2,_0x248ec5){const _0x4edd9c=_0x1d35f2[_0x4036('0x2')]();_0x248ec5[_0x4036('0x4a')]===_0x1d35f2['deathStateId']()&&_0x1d35f2[_0x4036('0x11c')](![]),VisuMZ[_0x4036('0x600')][_0x4036('0x354')][_0x4036('0x286')](this,_0x1d35f2,_0x248ec5),_0x1d35f2[_0x4036('0x11c')](_0x4edd9c);},VisuMZ['BattleCore'][_0x4036('0xa5')]=Game_BattlerBase[_0x4036('0x24d')][_0x4036('0x80c')],Game_BattlerBase[_0x4036('0x24d')][_0x4036('0x80c')]=function(){VisuMZ[_0x4036('0x600')][_0x4036('0xa5')]['call'](this),this[_0x4036('0x625')]();},Game_BattlerBase[_0x4036('0x24d')][_0x4036('0x625')]=function(){this[_0x4036('0x715')]=![];},VisuMZ['BattleCore']['Game_BattlerBase_refresh']=Game_BattlerBase[_0x4036('0x24d')][_0x4036('0x691')],Game_BattlerBase[_0x4036('0x24d')][_0x4036('0x691')]=function(){this[_0x4036('0x681')]={},VisuMZ[_0x4036('0x600')][_0x4036('0x5ad')][_0x4036('0x286')](this);},Game_BattlerBase[_0x4036('0x24d')]['checkCacheKey']=function(_0x3ade0d){return this[_0x4036('0x681')]=this[_0x4036('0x681')]||{},this[_0x4036('0x681')][_0x3ade0d]!==undefined;},Game_BattlerBase[_0x4036('0x24d')][_0x4036('0x302')]=function(){if(this[_0x4036('0x681')][_0x4036('0x302')]!==undefined)return this[_0x4036('0x681')]['hardDamageCap'];const _0x70487=/<DAMAGE CAP:[ ](\d+)>/i,_0x343958=this[_0x4036('0x3af')]()[_0x4036('0x5a4')](_0x293a69=>_0x293a69&&_0x293a69[_0x4036('0x826')][_0x4036('0x161')](_0x70487)?Number(RegExp['$1']):0x0);let _0x1cf389=_0x343958['length']>0x0?Math['max'](..._0x343958):0x0;if(_0x1cf389<=0x0)_0x1cf389=VisuMZ[_0x4036('0x600')]['Settings'][_0x4036('0x559')][_0x4036('0x3f8')];return this[_0x4036('0x681')][_0x4036('0x302')]=_0x1cf389,this[_0x4036('0x681')][_0x4036('0x302')];},Game_BattlerBase[_0x4036('0x24d')][_0x4036('0x276')]=function(){if(this[_0x4036('0x681')][_0x4036('0x1f6')]!==undefined)return this[_0x4036('0x681')]['softDamageCap'];let _0x2eff3c=VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x559')][_0x4036('0x48e')];const _0x1b463f=/<SOFT DAMAGE CAP:[ ]([\+\-]\d+)([%％])>/i,_0x53721b=this['traitObjects']()[_0x4036('0x5a4')](_0x5ab5ba=>_0x5ab5ba&&_0x5ab5ba[_0x4036('0x826')][_0x4036('0x161')](_0x1b463f)?Number(RegExp['$1'])/0x64:0x0);return _0x2eff3c=_0x53721b['reduce']((_0x208212,_0x93e600)=>_0x208212+_0x93e600,_0x2eff3c),this['_cache'][_0x4036('0x1f6')]=_0x2eff3c,this[_0x4036('0x681')]['softDamageCap'][_0x4036('0x4d6')](0.01,0x1);},Game_BattlerBase[_0x4036('0x24d')][_0x4036('0x304')]=function(){if(!SceneManager[_0x4036('0x78a')]())return null;if(!SceneManager['_scene'][_0x4036('0x5f8')])return null;return SceneManager[_0x4036('0x423')][_0x4036('0x5f8')][_0x4036('0x1f5')](this);},Game_BattlerBase[_0x4036('0x24d')][_0x4036('0x6d3')]=function(){return VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x43f')][_0x4036('0x6c5')];},Game_BattlerBase[_0x4036('0x24d')][_0x4036('0x24c')]=function(){return VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x43f')][_0x4036('0x49e')];},Game_BattlerBase[_0x4036('0x24d')][_0x4036('0x9f')]=function(){return VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x43f')][_0x4036('0x2f2')];},Game_BattlerBase['prototype'][_0x4036('0x274')]=function(){return!![];},Game_BattlerBase[_0x4036('0x24d')][_0x4036('0x801')]=function(){return 0x0;},Game_BattlerBase[_0x4036('0x24d')][_0x4036('0x2e7')]=function(){return 0x0;},Game_BattlerBase['prototype'][_0x4036('0x6e0')]=function(_0x47f4b){if(!_0x47f4b)return 0x0;let _0x417f0f=0x0;const _0x367d18=_0x47f4b[_0x4036('0x826')];_0x367d18[_0x4036('0x161')](/<BATTLE UI OFFSET X:[ ]([\+\-]\d+)>/i)&&(_0x417f0f+=Number(RegExp['$1']));if(_0x367d18[_0x4036('0x161')](/<BATTLE UI OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)){if(_0x4036('0x3d6')===_0x4036('0x3d6'))_0x417f0f+=Number(RegExp['$1']);else{function _0x31976a(){const _0x17d63e=_0x181dbf['attackAnimationId1']();_0x17d63e<=0x0?_0x370899[_0x4036('0x28c')]():this[_0x4036('0x82e')](_0x5df426,_0x17d63e);}}}return _0x417f0f;},Game_BattlerBase['prototype'][_0x4036('0x2c7')]=function(_0x41c83d){if(!_0x41c83d)return 0x0;let _0x5ecf01=0x0;const _0x468cfc=_0x41c83d['note'];return _0x468cfc[_0x4036('0x161')](/<BATTLE UI OFFSET Y:[ ]([\+\-]\d+)>/i)&&(_0x5ecf01+=Number(RegExp['$1'])),_0x468cfc[_0x4036('0x161')](/<BATTLE UI OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x5ecf01+=Number(RegExp['$2'])),_0x5ecf01;},VisuMZ[_0x4036('0x600')][_0x4036('0x349')]=Game_BattlerBase[_0x4036('0x24d')][_0x4036('0x7e0')],Game_BattlerBase[_0x4036('0x24d')][_0x4036('0x7e0')]=function(_0x1c4315){if(_0x1c4315===this[_0x4036('0x1ca')]()&&this[_0x4036('0x2')]())return!![];return VisuMZ[_0x4036('0x600')][_0x4036('0x349')][_0x4036('0x286')](this,_0x1c4315);},Game_BattlerBase[_0x4036('0x24d')]['isImmortal']=function(){return this['_immortal'];},Game_BattlerBase[_0x4036('0x24d')][_0x4036('0x11c')]=function(_0x446dff){_0x446dff?this[_0x4036('0xf3')]():this[_0x4036('0x64d')]();},Game_BattlerBase[_0x4036('0x24d')][_0x4036('0xf3')]=function(){if(this['isDead']())return;this[_0x4036('0x715')]=!![];},Game_BattlerBase[_0x4036('0x24d')][_0x4036('0x64d')]=function(){const _0x4c2769=this[_0x4036('0x729')]();this[_0x4036('0x715')]=![],this[_0x4036('0x691')]();if(this[_0x4036('0x416')]()&&_0x4c2769){if('wSXyw'===_0x4036('0x119')){function _0xe68292(){this[_0x4036('0x658')]++;}}else this['performCollapse'](),this[_0x4036('0x56c')]();}},VisuMZ[_0x4036('0x600')][_0x4036('0x2b')]=Game_BattlerBase[_0x4036('0x24d')][_0x4036('0x158')],Game_BattlerBase[_0x4036('0x24d')][_0x4036('0x158')]=function(){if(!this[_0x4036('0x233')]())return![];return VisuMZ[_0x4036('0x600')][_0x4036('0x2b')][_0x4036('0x286')](this);},Game_BattlerBase['prototype'][_0x4036('0x233')]=function(){for(const _0x5549b3 of this[_0x4036('0x3af')]()){if(!_0x5549b3)continue;if(_0x5549b3[_0x4036('0x826')][_0x4036('0x161')](/<(?:ATTACK SEAL|SEAL ATTACK)>/i))return![];}return!![];},VisuMZ[_0x4036('0x600')][_0x4036('0x828')]=Game_BattlerBase['prototype'][_0x4036('0x443')],Game_BattlerBase['prototype'][_0x4036('0x443')]=function(){if(!this[_0x4036('0x183')]())return![];return VisuMZ['BattleCore'][_0x4036('0x828')][_0x4036('0x286')](this);},Game_BattlerBase[_0x4036('0x24d')][_0x4036('0x183')]=function(){for(const _0x484afe of this[_0x4036('0x3af')]()){if(_0x4036('0x332')===_0x4036('0x332')){if(!_0x484afe)continue;if(_0x484afe[_0x4036('0x826')][_0x4036('0x161')](/<(?:GUARD SEAL|SEAL GUARD)>/i))return![];}else{function _0x105580(){if(_0x31e299===_0x4036('0x59b'))this['_checkOn']=!![];if(this['_battler']&&this[_0x4036('0x2c9')]['isDead']())return;const _0x546dc4=_0x4e6a34[_0x4036('0x1d9')][_0x3cd671];this[_0x4036('0x4de')]=_0x546dc4,this['_motionCount']=0x0,this[_0x4036('0x658')]=0x0;}}}return!![];},Game_BattlerBase['prototype']['canUseItemCommand']=function(){for(const _0x4ed056 of this[_0x4036('0x3af')]()){if('tifAu'!==_0x4036('0x6cf')){function _0x173a92(){this[_0x4036('0x52')]()?this[_0x4036('0x767')]():_0x2c3398['BattleCore'][_0x4036('0x731')][_0x4036('0x286')](this);}}else{if(!_0x4ed056)continue;if(_0x4ed056[_0x4036('0x826')][_0x4036('0x161')](/<(?:ITEM SEAL|SEAL ITEM|SEAL ITEMS)>/i))return![];}}return!![];},VisuMZ[_0x4036('0x600')][_0x4036('0x792')]=Game_Battler[_0x4036('0x24d')][_0x4036('0x47')],Game_Battler['prototype']['regenerateAll']=function(){if(SceneManager['isSceneBattle']()&&$gameTroop[_0x4036('0x3ee')]()<=0x0)return;this[_0x4036('0x38d')]('PreRegenerateJS'),VisuMZ[_0x4036('0x600')][_0x4036('0x792')][_0x4036('0x286')](this),this[_0x4036('0x383')](),this['processBattleCoreJS'](_0x4036('0x41b'));},Game_Battler['prototype'][_0x4036('0x383')]=function(){if(SceneManager[_0x4036('0x78a')]())for(const _0x290b94 of this[_0x4036('0x3af')]()){if(_0x4036('0x737')!=='NpBBN'){if(!_0x290b94)continue;this['onRegeneratePlayStateAnimation'](_0x290b94);}else{function _0x3c2e4c(){if(this[_0x4036('0x16c')])return this['_battleLayoutStyle'];return this[_0x4036('0x16c')]=_0x20d56b['_scene']['battleLayoutStyle'](),this[_0x4036('0x16c')];}}}},Game_Battler[_0x4036('0x24d')][_0x4036('0x789')]=function(_0x5f6f3f){if(!Imported[_0x4036('0x7b5')])return;if(!SceneManager[_0x4036('0x78a')]())return;if(this[_0x4036('0x416')]())return;if(this[_0x4036('0x378')]())return;if(_0x5f6f3f['note'][_0x4036('0x161')](/<(?:REGENERATE|REGEN|DEGEN|DOT|SLIP)[ ]ANIMATION:[ ](\d+)>/i)){if(_0x4036('0x7')===_0x4036('0x3a9')){function _0xbede76(){this[_0x4036('0x304')]()['refreshMotion']();return;}}else{const _0x1de369=Number(RegExp['$1']);$gameTemp[_0x4036('0x798')]([this],_0x1de369,![],![]);}}},VisuMZ[_0x4036('0x600')][_0x4036('0x3b9')]=Game_Battler[_0x4036('0x24d')][_0x4036('0x63b')],Game_Battler['prototype']['startTpbTurn']=function(){this[_0x4036('0x38d')](_0x4036('0x205')),VisuMZ[_0x4036('0x600')]['Game_Battler_startTpbTurn'][_0x4036('0x286')](this),this[_0x4036('0x38d')]('PostStartTurnJS');},VisuMZ[_0x4036('0x600')][_0x4036('0x6fe')]=Game_Battler[_0x4036('0x24d')][_0x4036('0x24')],Game_Battler[_0x4036('0x24d')][_0x4036('0x24')]=function(){this[_0x4036('0x38d')](_0x4036('0x411')),VisuMZ['BattleCore'][_0x4036('0x6fe')][_0x4036('0x286')](this),this[_0x4036('0x38d')](_0x4036('0x44'));},Game_Battler[_0x4036('0x24d')][_0x4036('0x38d')]=function(_0x2226f){const _0x11a577=VisuMZ['BattleCore']['Settings']['Mechanics'];if(_0x11a577[_0x2226f])_0x11a577[_0x2226f][_0x4036('0x286')](this);for(const _0x38837a of this[_0x4036('0x3af')]()){if(_0x4036('0x57')!==_0x4036('0x7a')){if(!_0x38837a)continue;key=VisuMZ[_0x4036('0x600')][_0x4036('0x435')](_0x38837a,_0x2226f),VisuMZ[_0x4036('0x600')]['JS'][key]&&VisuMZ['BattleCore']['JS'][key][_0x4036('0x286')](this,this,this,_0x38837a,0x0);}else{function _0x52bee4(){return _0x1d4527;}}}},VisuMZ['BattleCore'][_0x4036('0x2d7')]=Game_Battler['prototype']['clearDamagePopup'],Game_Battler['prototype'][_0x4036('0x22d')]=function(){VisuMZ[_0x4036('0x600')][_0x4036('0x2d7')][_0x4036('0x286')](this),this[_0x4036('0x7af')]=[];},Game_Battler[_0x4036('0x24d')][_0x4036('0x700')]=function(){if(!this[_0x4036('0x7af')])this['clearDamagePopup']();return this['_damagePopupArray'][_0x4036('0x6b5')]>0x0;},Game_Battler[_0x4036('0x24d')][_0x4036('0x1a3')]=function(){if(!SceneManager[_0x4036('0x78a')]())return;if(!this[_0x4036('0x7af')])this[_0x4036('0x22d')]();this[_0x4036('0x4a4')]();const _0x22da42=this['battler']();if(_0x22da42)_0x22da42[_0x4036('0x497')]();},Game_Battler[_0x4036('0x24d')][_0x4036('0x4a4')]=function(){const _0xc5d1e5=this[_0x4036('0x3d2')]();if(_0xc5d1e5[_0x4036('0x198')]||_0xc5d1e5[_0x4036('0x68a')]){const _0x49ce18=JsonEx[_0x4036('0x2bf')](_0xc5d1e5);_0x49ce18[_0x4036('0x7b1')]=![],_0x49ce18[_0x4036('0x3bc')]=0x0,this[_0x4036('0x7af')][_0x4036('0x5d7')](_0x49ce18);}if(_0xc5d1e5[_0x4036('0x7b1')]){const _0x4538b7=JsonEx[_0x4036('0x2bf')](_0xc5d1e5);_0x4538b7[_0x4036('0x198')]=![],_0x4538b7[_0x4036('0x68a')]=![],_0x4538b7[_0x4036('0x3bc')]=0x0,this[_0x4036('0x7af')][_0x4036('0x5d7')](_0x4538b7);}if(_0xc5d1e5[_0x4036('0x3bc')]!==0x0){const _0x3ef35e=JsonEx[_0x4036('0x2bf')](_0xc5d1e5);_0x3ef35e[_0x4036('0x198')]=![],_0x3ef35e[_0x4036('0x68a')]=![],_0x3ef35e['hpAffected']=![],this['_damagePopupArray']['push'](_0x3ef35e);}},Game_Battler['prototype'][_0x4036('0x71a')]=function(){if(!this[_0x4036('0x7af')])this[_0x4036('0x22d')]();return VisuMZ['BattleCore'][_0x4036('0x635')][_0x4036('0x559')][_0x4036('0x69')]?this[_0x4036('0x7af')][_0x4036('0x171')]():this[_0x4036('0x7af')][_0x4036('0x3a1')]();},Game_Battler[_0x4036('0x24d')]['setupTextPopup']=function(_0x5bef2b,_0x38c554){if(!SceneManager[_0x4036('0x78a')]())return;if(!this['battler']())return;if(_0x5bef2b[_0x4036('0x6b5')]<=0x0)return;_0x38c554=_0x38c554||{},_0x38c554[_0x4036('0x324')]=_0x38c554[_0x4036('0x324')]||_0x4036('0x291'),_0x38c554[_0x4036('0x18b')]=_0x38c554['flashColor']||[0x0,0x0,0x0,0x0],_0x38c554[_0x4036('0x6eb')]=_0x38c554[_0x4036('0x6eb')]||0x0,this[_0x4036('0x304')]()[_0x4036('0x5c6')](_0x5bef2b,_0x38c554);},Game_Battler['prototype'][_0x4036('0x50c')]=function(_0x1940f,_0x52424c,_0x4f58ba){if(!SceneManager['isSceneBattle']())return;if(!this[_0x4036('0x304')]())return;if(_0x52424c['length']<=0x0)return;_0x4f58ba=_0x4f58ba||{},_0x4f58ba[_0x4036('0x324')]=_0x4f58ba[_0x4036('0x324')]||_0x4036('0x291'),_0x4f58ba[_0x4036('0x18b')]=_0x4f58ba[_0x4036('0x18b')]||[0x0,0x0,0x0,0x0],_0x4f58ba[_0x4036('0x6eb')]=_0x4f58ba[_0x4036('0x6eb')]||0x0,this['battler']()[_0x4036('0x50c')](_0x1940f,_0x52424c,_0x4f58ba);},Game_Battler[_0x4036('0x24d')][_0x4036('0x37c')]=function(){return!![];},VisuMZ[_0x4036('0x600')][_0x4036('0x249')]=Game_Battler[_0x4036('0x24d')][_0x4036('0x50b')],Game_Battler['prototype'][_0x4036('0x50b')]=function(_0x5587a5){VisuMZ[_0x4036('0x600')][_0x4036('0x249')][_0x4036('0x286')](this,_0x5587a5),this[_0x4036('0x7ab')](_0x5587a5);},Game_Battler[_0x4036('0x24d')]['onBattleStartBattleCore']=function(_0xa6b1f){this[_0x4036('0x539')](![]);},VisuMZ[_0x4036('0x600')][_0x4036('0x21')]=Game_Battler[_0x4036('0x24d')][_0x4036('0x5a9')],Game_Battler[_0x4036('0x24d')][_0x4036('0x5a9')]=function(_0x33a2ea){VisuMZ[_0x4036('0x600')][_0x4036('0x21')][_0x4036('0x286')](this,_0x33a2ea);if(!_0x33a2ea[_0x4036('0x1a0')]()){const _0x5cd9d7=this['battler']();if(_0x5cd9d7)_0x5cd9d7[_0x4036('0x54d')]();}this[_0x4036('0x539')](![]);},VisuMZ[_0x4036('0x600')][_0x4036('0x430')]=Game_Battler[_0x4036('0x24d')][_0x4036('0x5a')],Game_Battler['prototype'][_0x4036('0x5a')]=function(){VisuMZ['BattleCore']['Game_Battler_performActionEnd']['call'](this),this[_0x4036('0x5e4')]=![];const _0x22cd5=this[_0x4036('0x304')]();if(_0x22cd5)_0x22cd5[_0x4036('0x174')]();this[_0x4036('0x539')](![]),this[_0x4036('0x56c')]();},Game_Battler['prototype'][_0x4036('0x2c3')]=function(_0x437817){if(_0x437817[_0x4036('0x7f4')]())this[_0x4036('0x73c')]();else{if(_0x437817[_0x4036('0x1a0')]())this[_0x4036('0x530')](_0x4036('0x342'));else{if(_0x437817[_0x4036('0x17d')]())this[_0x4036('0x530')](_0x4036('0x241'));else{if(_0x437817[_0x4036('0x5e9')]()){if(_0x437817[_0x4036('0x13a')]()['damage'][_0x4036('0x3ce')]>0x0){if(_0x4036('0x4cf')===_0x4036('0x2c8')){function _0x34be2a(){return this[_0x4036('0x75')]();}}else this[_0x4036('0x73c')]();}else this[_0x4036('0x530')](_0x4036('0x6ed'));}else _0x437817[_0x4036('0x784')]()&&this[_0x4036('0x530')]('item');}}}},Game_Battler[_0x4036('0x24d')][_0x4036('0x77b')]=function(){return $dataSystem[_0x4036('0x78c')][0x0];},Game_Battler[_0x4036('0x24d')][_0x4036('0x4e6')]=function(){const _0x32d7b1=this[_0x4036('0x77b')]();return _0x32d7b1?_0x32d7b1[_0x4036('0x6cd')]:0x0;},Game_Battler[_0x4036('0x24d')][_0x4036('0x4af')]=function(_0x49bb47){if(!$gameSystem[_0x4036('0x1c1')]())return;const _0xf41907=this[_0x4036('0x304')](),_0x473edf=_0x49bb47[_0x4036('0x304')]();if(!_0xf41907||!_0x473edf)return;const _0x340702=_0x473edf[_0x4036('0x7b6')],_0x32cdc7=_0x473edf['_baseY'];this[_0x4036('0x117')](_0x340702,_0x32cdc7,0x0,![],_0x4036('0x167'),-0x1),_0xf41907[_0x4036('0x19a')]();const _0x41d19f=VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x74c')];let _0x3d5594=(_0x473edf[_0x4036('0x42')]+_0xf41907[_0x4036('0x42')])/0x2;_0x3d5594*=this[_0x4036('0x4a2')]()?0x1:-0x1;let _0x201dc6=_0x41d19f[_0x4036('0x510')]*(this['isActor']()?0x1:-0x1);_0x49bb47[_0x4036('0x3b2')](_0x3d5594,_0x201dc6,0x0,![],_0x4036('0x167')),_0x473edf[_0x4036('0x19a')]();},Game_Battler[_0x4036('0x24d')][_0x4036('0x530')]=function(_0x40cc71){if(SceneManager[_0x4036('0x78a')]()){if(_0x4036('0x5ed')===_0x4036('0x5ed')){const _0x2b4c89=this[_0x4036('0x304')]();if(_0x2b4c89)_0x2b4c89[_0x4036('0x482')](_0x40cc71);}else{function _0x52a54a(){this['_svBattlerSprite']['_stateSprite'][_0x4036('0x325')]['x']=-0x1/(this['scale']['x']||0.001),this[_0x4036('0x781')][_0x4036('0x602')]['scale']['y']=0x1/(this[_0x4036('0x325')]['y']||0.001);}}}},Game_Battler[_0x4036('0x24d')][_0x4036('0x7c3')]=function(_0x1f77ff){if(SceneManager[_0x4036('0x78a')]()){const _0x4631dd=this[_0x4036('0x304')]();if(_0x4631dd)_0x4631dd[_0x4036('0x35d')](_0x1f77ff);}},Game_Battler[_0x4036('0x24d')][_0x4036('0x425')]=function(){if(SceneManager[_0x4036('0x78a')]()){if(_0x4036('0x254')!==_0x4036('0x254')){function _0x43c3f2(){const _0x31effa=_0x295451[0x0][_0x4036('0x4d2')](_0x3a94d7[0x0]),_0x4968ed=_0x435fe3[0x1]['format'](_0x5392be[0x1]),_0x57781b=new _0x1ba9e8(_0x398449['format'](_0x4968ed),'i');_0x23ca65[_0x31effa]=_0x57781b;}}else{const _0x44f53d=this['getAttackWeaponAnimationId']();this[_0x4036('0x7c3')](_0x44f53d);}}},Game_Battler['prototype']['performCastAnimation']=function(_0x2abc71,_0x4500f4){if(!_0x2abc71)return;if(!_0x2abc71[_0x4036('0x13a')]())return;if(_0x2abc71[_0x4036('0x7f4')]())return;if(_0x2abc71[_0x4036('0x1a0')]())return;if(_0x2abc71[_0x4036('0x784')]())return;let _0x14286b=0x0;const _0x3a3869=VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x74c')],_0x233af7=_0x2abc71[_0x4036('0x13a')]()[_0x4036('0x826')];if(_0x233af7[_0x4036('0x161')](/<CAST ANIMATION: (\d+)>/i)){if(_0x4036('0x224')===_0x4036('0x12d')){function _0x2343d6(){const _0x1c9fe5=_0x4036('0x7fa');let _0x3c9ebe=_0x13f629[_0x4036('0x722')],_0x18e1ba=_0x2e9a4f[_0x4036('0x37d')];const _0x27ac06=_0x4ff253[_0x4036('0x826')];return _0x27ac06[_0x4036('0x161')](/<DISPLAY ICON: (\d+)>/i)&&(_0x3c9ebe=_0xde345(_0x1d3333['$1'])),_0x27ac06[_0x4036('0x161')](/<DISPLAY TEXT: (.*)>/i)&&(_0x18e1ba=_0x33e2af(_0x702b80['$1'])),_0x1c9fe5[_0x4036('0x4d2')](_0x3c9ebe,_0x18e1ba);}}else _0x14286b=Number(RegExp['$1']);}else{if(_0x233af7[_0x4036('0x161')](/<NO CAST ANIMATION>/i)){if('wwJBN'!==_0x4036('0x669'))return;else{function _0xcad3e1(){_0x36ee23['BattleCore'][_0x4036('0x178')][_0x4036('0x286')](this,_0x2e834b),this[_0x4036('0x44f')](_0x1313cd);}}}else{if(_0x2abc71[_0x4036('0x505')]())_0x14286b=_0x3a3869[_0x4036('0x3e1')];else{if(_0x2abc71[_0x4036('0x4a1')]())_0x14286b=_0x3a3869[_0x4036('0x46e')];else _0x2abc71[_0x4036('0x63d')]()&&(_0x14286b=_0x3a3869['CastMagical']);}}}_0x14286b>0x0&&$gameTemp[_0x4036('0x507')]([this],_0x14286b,!!_0x4500f4);},Game_Battler[_0x4036('0x24d')][_0x4036('0x82d')]=function(){SoundManager[_0x4036('0x725')]();let _0x4c2b5c=VisuMZ[_0x4036('0x600')][_0x4036('0x635')]['ActionSequence']['ReflectAnimation'];if(_0x4c2b5c>0x0){if(_0x4036('0x16a')!==_0x4036('0x1d4'))$gameTemp[_0x4036('0x507')]([this],_0x4c2b5c);else{function _0x40facc(){this[_0x4036('0x6a5')](_0x3d4001)[_0x4036('0x161')](/\\I\[(\d+)\]/i);const _0x3a6110=_0x17327c(_0x2197ee['$1'])||0x0,_0x2292d1=this[_0x4036('0x651')](_0x261a31),_0x4c16a9=_0x2292d1['x']+_0xe1ca6b['floor']((_0x2292d1[_0x4036('0x42')]-_0x124b66[_0x4036('0x58d')])/0x2),_0x585655=_0x2292d1['y']+(_0x2292d1['height']-_0x5f5d40[_0x4036('0x32d')])/0x2;this[_0x4036('0x77d')](_0x3a6110,_0x4c16a9,_0x585655);}}}},VisuMZ['BattleCore'][_0x4036('0x4d3')]=Game_Battler['prototype']['performDamage'],Game_Battler[_0x4036('0x24d')]['performDamage']=function(){VisuMZ[_0x4036('0x600')][_0x4036('0x4d3')][_0x4036('0x286')](this),this[_0x4036('0x496')]();},Game_Battler[_0x4036('0x24d')][_0x4036('0x496')]=function(){if(!$gameSystem['isSideView']())return;if(this[_0x4036('0x5e4')])return;this[_0x4036('0x5e4')]=!![];const _0x17431a=this[_0x4036('0x304')]();if(_0x17431a)_0x17431a[_0x4036('0x234')]();},Game_Battler[_0x4036('0x24d')]['requestMotionRefresh']=function(){this[_0x4036('0x416')]()&&this[_0x4036('0x486')]!==_0x4036('0x565')&&this['requestMotion'](_0x4036('0x565'));if(this[_0x4036('0x416')]()&&this[_0x4036('0x486')]===_0x4036('0x565'))return;if(this[_0x4036('0x68c')]()){this[_0x4036('0x304')]()[_0x4036('0x114')]();return;}if(this[_0x4036('0x486')]===_0x4036('0x59b'))return;if(this[_0x4036('0x486')]===_0x4036('0x13')&&!BattleManager[_0x4036('0x5c5')]())return;if(this['_motionType']==='guard'&&!BattleManager[_0x4036('0x5c5')]())return;this[_0x4036('0x2f8')](),this[_0x4036('0x304')]()&&BattleManager['isInputting']()&&this[_0x4036('0x304')]()[_0x4036('0x114')]();},Game_Battler['prototype'][_0x4036('0x7b4')]=function(){return this['_isBattlerFlipped'];},Game_Battler['prototype'][_0x4036('0x539')]=function(_0x68217b){if(!$gameSystem[_0x4036('0x1c1')]())return;this[_0x4036('0x79e')]=_0x68217b;const _0xc9754b=this['battler']();if(_0xc9754b)_0xc9754b[_0x4036('0x6f7')]();},Game_Battler['prototype']['setBattlerFacePoint']=function(_0x3b511a,_0x44baf4,_0x2cff5d){if(!$gameSystem[_0x4036('0x1c1')]())return;const _0x11037f=this[_0x4036('0x304')]();if(!_0x11037f)return;if(_0x3b511a===_0x11037f[_0x4036('0x7b6')])return;let _0x4f672e=![];if(this[_0x4036('0x4a2')]()){if('nDVdE'!==_0x4036('0x305')){function _0x1f5c41(){const _0xd7252d=_0x5e61c5[_0x4036('0x488')](_0x43ff15[_0x4036('0x316')]/0x3),_0x37f934=_0x5bb5d8[_0x4036('0x488')](_0x4167cf['boxWidth']/_0x4e7979['battleMembers']()[_0x4036('0x6b5')]),_0x33a851=_0x188b9d[_0x4036('0x18c')](_0xd7252d,_0x37f934),_0xffc077=this[_0x4036('0x6af')](_0x4b0800[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x650')][_0x4036('0x578')]),_0x228939=_0x37f934*_0x25eeff['index']()+(_0x37f934-_0x33a851)/0x2,_0x415e21=_0x10e06e[_0x4036('0x423')][_0x4036('0x1ac')]['y']-_0xffc077;this['move'](_0x228939,_0x415e21,_0x33a851,_0xffc077),this['createContents'](),this[_0x4036('0x37b')](0x1);}}else{if(_0x3b511a>_0x11037f[_0x4036('0x7b6')])_0x4f672e=!![];if(_0x3b511a<_0x11037f[_0x4036('0x7b6')])_0x4f672e=![];}}else{if(this[_0x4036('0x68c')]()){if(_0x3b511a>_0x11037f[_0x4036('0x7b6')])_0x4f672e=![];if(_0x3b511a<_0x11037f[_0x4036('0x7b6')])_0x4f672e=!![];}};this[_0x4036('0x539')](_0x2cff5d?!_0x4f672e:_0x4f672e),_0x11037f[_0x4036('0x6f7')]();},Game_Battler[_0x4036('0x24d')][_0x4036('0x3b2')]=function(_0x31768d,_0x1044a8,_0x32ff67,_0x5db862,_0x1c4581){if(!$gameSystem['isSideView']())return;const _0x4c132c=this['battler']();if(!_0x4c132c)return;if(_0x5db862)this[_0x4036('0x1f')](_0x31768d+_0x4c132c[_0x4036('0x7b6')],_0x1044a8+_0x4c132c[_0x4036('0x311')],![]);_0x31768d+=_0x4c132c[_0x4036('0x7b6')]-_0x4c132c[_0x4036('0x13b')],_0x1044a8+=_0x4c132c[_0x4036('0x311')]-_0x4c132c[_0x4036('0x47d')],_0x4c132c['startMove'](_0x31768d,_0x1044a8,_0x32ff67);if(Imported[_0x4036('0x7b5')])_0x4c132c[_0x4036('0x2cd')](_0x1c4581||_0x4036('0x167'));},Game_Battler[_0x4036('0x24d')][_0x4036('0x117')]=function(_0x38bca1,_0x567521,_0x456c5f,_0x23be74,_0x2eeca0,_0x53b43d){if(!$gameSystem[_0x4036('0x1c1')]())return;const _0x249964=this[_0x4036('0x304')]();if(!_0x249964)return;if(_0x53b43d>=0x0){if(_0x249964[_0x4036('0x7b6')]>_0x38bca1)_0x38bca1+=_0x249964[_0x4036('0x42')]/0x2+_0x53b43d;if(_0x249964[_0x4036('0x7b6')]<_0x38bca1)_0x38bca1-=_0x249964[_0x4036('0x42')]/0x2+_0x53b43d;}if(_0x23be74)this['setBattlerFacePoint'](_0x38bca1,_0x567521,![]);_0x38bca1-=_0x249964['_homeX'],_0x567521-=_0x249964['_homeY'],_0x249964[_0x4036('0x64c')](_0x38bca1,_0x567521,_0x456c5f);if(Imported['VisuMZ_0_CoreEngine'])_0x249964[_0x4036('0x2cd')](_0x2eeca0||_0x4036('0x167'));},Game_Battler[_0x4036('0x24d')]['floatBattler']=function(_0x27ae36,_0x5d2833,_0x33a2f8){if(!$gameSystem[_0x4036('0x1c1')]())return;const _0xf1281f=this['battler']();if(!_0xf1281f)return;_0xf1281f[_0x4036('0x8c')](_0x27ae36,_0x5d2833,_0x33a2f8);},Game_Battler[_0x4036('0x24d')][_0x4036('0x422')]=function(_0x2de6b0,_0x409c3e){if(!$gameSystem[_0x4036('0x1c1')]())return;const _0x1bad1d=this['battler']();if(!_0x1bad1d)return;_0x1bad1d[_0x4036('0x5cf')](_0x2de6b0,_0x409c3e);},Game_Battler[_0x4036('0x24d')][_0x4036('0x5d2')]=function(_0x54d665,_0x1803b4,_0x12e85c){if(!$gameSystem[_0x4036('0x1c1')]())return;const _0x4fbcc0=this[_0x4036('0x304')]();if(!_0x4fbcc0)return;_0x4fbcc0[_0x4036('0x3d0')](_0x54d665,_0x1803b4,_0x12e85c);},Game_Battler[_0x4036('0x24d')]['skewBattler']=function(_0x2069df,_0x28c9f8,_0x5f03ea,_0x20271e){if(!$gameSystem[_0x4036('0x1c1')]())return;const _0x41fab6=this['battler']();if(!_0x41fab6)return;this['isActor']()&&(_0x2069df*=-0x1,_0x28c9f8*=-0x1),_0x41fab6[_0x4036('0x59')](_0x2069df,_0x28c9f8,_0x5f03ea,_0x20271e);},Game_Battler[_0x4036('0x24d')][_0x4036('0x693')]=function(_0x2e44f9,_0x1bfca1,_0x1a7be2,_0x5b9b62){if(!$gameSystem[_0x4036('0x1c1')]())return;const _0x2abcc0=this[_0x4036('0x304')]();if(!_0x2abcc0)return;_0x2abcc0['startGrow'](_0x2e44f9,_0x1bfca1,_0x1a7be2,_0x5b9b62);},Game_Battler[_0x4036('0x24d')][_0x4036('0x21a')]=function(_0x32cbaf,_0x376e14,_0x20ed87){if(!$gameSystem[_0x4036('0x1c1')]())return;const _0x44b8dd=this[_0x4036('0x304')]();if(!_0x44b8dd)return;_0x44b8dd[_0x4036('0x3b5')](_0x32cbaf,_0x376e14,_0x20ed87);},Game_Battler[_0x4036('0x24d')][_0x4036('0x49d')]=function(_0x460ac5){if(!_0x460ac5)return![];return _0x460ac5[_0x4036('0xac')]()===this[_0x4036('0xac')]();},Game_Battler[_0x4036('0x24d')][_0x4036('0x5ae')]=function(_0x26e4cb){if(!_0x26e4cb)return![];return _0x26e4cb['opponentsUnit']()===this[_0x4036('0xac')]();},VisuMZ[_0x4036('0x600')][_0x4036('0xfe')]=Game_Actor[_0x4036('0x24d')][_0x4036('0x699')],Game_Actor[_0x4036('0x24d')][_0x4036('0x699')]=function(_0x1d9257){VisuMZ[_0x4036('0x600')][_0x4036('0xfe')][_0x4036('0x286')](this,_0x1d9257),this[_0x4036('0x137')]();},Game_Actor[_0x4036('0x24d')][_0x4036('0x137')]=function(){this[_0x4036('0x20a')]='';if(this[_0x4036('0x529')]()&&this['actor']()[_0x4036('0x826')][_0x4036('0x161')](/<BATTLE (?:IMAGE|PORTRAIT):[ ](.*)>/i)){if(_0x4036('0x263')===_0x4036('0x762')){function _0x4603f6(){const _0x1277aa=this[_0x4036('0x12b')][_0x4036('0x33f')][_0x4036('0x7fb')](new _0x5943de(0x0,0x0)),_0xf1499a=this[_0x4036('0x12b')][_0x4036('0x51f')];_0xf1499a['x']=_0x1277aa['x']+this['origin']['x'],_0xf1499a['y']=_0x1277aa['y']+this['origin']['y'],_0xf1499a['width']=this[_0x4036('0x3de')],_0xf1499a['height']=this[_0x4036('0x6f5')];}}else this[_0x4036('0x20a')]=String(RegExp['$1']);}},Game_Actor[_0x4036('0x24d')]['getBattlePortraitFilename']=function(){if(this['getBattlePortrait']()!==''){if(_0x4036('0x82a')===_0x4036('0xb7')){function _0x18c14a(){const _0x4fe8da=_0x13bb64[_0x4036('0x826')];if(_0x4fe8da[_0x4036('0x161')](/<COMMAND REQUIRE LEARN>/i)){if(!this[_0x4036('0x7a2')][_0x4036('0x748')](_0x213fb7['id']))return![];}if(_0x4fe8da[_0x4036('0x161')](/<COMMAND REQUIRE ACCESS>/i)){if(!this[_0x4036('0x7a2')][_0x4036('0x71c')](_0x4a60b6['id']))return![];}const _0x18a1df=_0x3a053a['BattleCore'][_0x4036('0x435')](_0x2daf80,_0x4036('0x611'));if(_0x3cec1b[_0x4036('0x600')]['JS'][_0x18a1df]){if(!_0x389978[_0x4036('0x600')]['JS'][_0x18a1df][_0x4036('0x286')](this,this['_actor'],_0x28c4f7))return![];}return _0x4381e4[_0x4036('0x600')][_0x4036('0x139')](_0x5bc4ea);}}else return this['getBattlePortrait']();}else{if(Imported[_0x4036('0x558')]&&this[_0x4036('0x13c')]()!==''){if(_0x4036('0x779')==='WXCze'){function _0x1141a3(){const _0x1b7e66=_0x291601[_0x4036('0x419')](_0x2b207a[_0x4036('0x6bc')]()[_0x4036('0x330')]());_0x1b7e66>=0x0&&_0x1b7e66<=0x7&&_0x2386e9['addBuff'](_0x1b7e66,_0x1e8191);}}else return this[_0x4036('0x13c')]();}}return'';},Game_Actor[_0x4036('0x24d')][_0x4036('0x825')]=function(){if(this[_0x4036('0x20a')]===undefined)this[_0x4036('0x137')]();return this['_battlePortrait'];},Game_Actor[_0x4036('0x24d')][_0x4036('0x618')]=function(_0x2a5534){if(this['_battlePortrait']===undefined)this['initBattlePortrait']();this['_battlePortrait']=_0x2a5534;if(SceneManager['isSceneBattle']()&&$gameParty[_0x4036('0x6a7')]()[_0x4036('0x747')](this)){if(_0x4036('0x478')===_0x4036('0x604')){function _0x45339d(){this[_0x4036('0x681')][_0x4036('0x22b')]=!![];}}else{const _0x28926d=SceneManager[_0x4036('0x423')][_0x4036('0x1ac')];if(_0x28926d)_0x28926d[_0x4036('0x5fd')](this);}}},Game_Actor[_0x4036('0x24d')][_0x4036('0x706')]=function(){return!![];},Game_Actor['prototype'][_0x4036('0x402')]=function(){if(!this[_0x4036('0x6f4')]()&&BattleManager[_0x4036('0x49b')])return!![];return Game_Battler[_0x4036('0x24d')][_0x4036('0x402')][_0x4036('0x286')](this);},VisuMZ['BattleCore'][_0x4036('0x336')]=Game_Actor['prototype'][_0x4036('0x5fb')],Game_Actor[_0x4036('0x24d')][_0x4036('0x5fb')]=function(){if(BattleManager[_0x4036('0x49b')]&&!ConfigManager[_0x4036('0x26f')])return this[_0x4036('0x613')]();else{return VisuMZ[_0x4036('0x600')][_0x4036('0x336')]['call'](this);;}},Game_Actor[_0x4036('0x24d')][_0x4036('0x613')]=function(){const _0x280d75=[],_0x266aa4=new Game_Action(this);return _0x266aa4[_0x4036('0x155')](),_0x280d75['push'](_0x266aa4),_0x280d75;},Game_Actor[_0x4036('0x24d')][_0x4036('0x660')]=function(){if(this[_0x4036('0x5f2')]()[_0x4036('0x826')][_0x4036('0x161')](/<BATTLE COMMANDS>\s*([\s\S]*)\s*<\/BATTLE COMMANDS>/i)){if(_0x4036('0x7a0')!=='OLbcV'){function _0x2c8c42(){_0x34a71a[_0x4036('0x600')]['Scene_Battle_onActorOk'][_0x4036('0x286')](this),this[_0x4036('0x45d')]();}}else return String(RegExp['$1'])[_0x4036('0x77a')](/[\r\n]+/);}else return VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x3e3')]['BattleCmdList'];},Game_Actor[_0x4036('0x24d')][_0x4036('0x6d3')]=function(){if(this[_0x4036('0x681')][_0x4036('0x546')]!==undefined)return this[_0x4036('0x681')][_0x4036('0x546')];return this['actor']()['note'][_0x4036('0x161')](/<SIDEVIEW ANCHOR: (.*), (.*)>/i)?(this['_cache'][_0x4036('0x546')]=eval(RegExp['$1']),this[_0x4036('0x681')][_0x4036('0x586')]=eval(RegExp['$2'])):this[_0x4036('0x681')]['svAnchorX']=Game_Battler[_0x4036('0x24d')][_0x4036('0x6d3')]['call'](this),this['_cache'][_0x4036('0x546')];},Game_Actor[_0x4036('0x24d')][_0x4036('0x24c')]=function(){if(this['_cache'][_0x4036('0x586')]!==undefined)return this[_0x4036('0x681')][_0x4036('0x586')];return this[_0x4036('0x529')]()['note'][_0x4036('0x161')](/<SIDEVIEW ANCHOR: (.*), (.*)>/i)?(this[_0x4036('0x681')]['svAnchorX']=eval(RegExp['$1']),this[_0x4036('0x681')][_0x4036('0x586')]=eval(RegExp['$2'])):this['_cache'][_0x4036('0x586')]=Game_Battler[_0x4036('0x24d')]['svBattlerAnchorY'][_0x4036('0x286')](this),this[_0x4036('0x681')][_0x4036('0x586')];},Game_Actor[_0x4036('0x24d')][_0x4036('0x9f')]=function(){if(this['_cache'][_0x4036('0x22b')]!==undefined)return this[_0x4036('0x681')]['svShadow'];if(this['actor']()[_0x4036('0x826')][_0x4036('0x161')](/<SIDEVIEW SHOW SHADOW>/i))this[_0x4036('0x681')][_0x4036('0x22b')]=!![];else this['actor']()[_0x4036('0x826')][_0x4036('0x161')](/<SIDEVIEW HIDE SHADOW>/i)?this['_cache'][_0x4036('0x22b')]=![]:this[_0x4036('0x681')][_0x4036('0x22b')]=Game_Battler['prototype']['svBattlerShadowVisible'][_0x4036('0x286')](this);return this[_0x4036('0x681')]['svShadow'];},Game_Actor[_0x4036('0x24d')]['battlerSmoothImage']=function(){return VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x43f')][_0x4036('0x3e8')];},Game_Actor[_0x4036('0x24d')][_0x4036('0x4e8')]=function(_0xad8368){Game_Battler[_0x4036('0x24d')][_0x4036('0x4e8')][_0x4036('0x286')](this,_0xad8368),this[_0x4036('0x2c3')](_0xad8368);},Game_Actor[_0x4036('0x24d')][_0x4036('0x77b')]=function(){const _0x47933a=this[_0x4036('0x1c9')](),_0x425ef9=_0x47933a[0x0]?_0x47933a[0x0][_0x4036('0xd6')]:0x0;return $dataSystem[_0x4036('0x78c')][_0x425ef9];},Game_Actor[_0x4036('0x24d')][_0x4036('0x801')]=function(){let _0x5d9b6e=_0x4036('0x801');if(this[_0x4036('0x37')](_0x5d9b6e))return this[_0x4036('0x681')][_0x5d9b6e];return this[_0x4036('0x681')][_0x5d9b6e]=this['createBattleUIOffsetX'](this[_0x4036('0x529')]()),this[_0x4036('0x681')][_0x5d9b6e];},Game_Actor[_0x4036('0x24d')]['battleUIOffsetY']=function(){let _0x323a07=_0x4036('0x2e7');if(this['checkCacheKey'](_0x323a07))return this['_cache'][_0x323a07];return this[_0x4036('0x681')][_0x323a07]=this[_0x4036('0x2c7')](this[_0x4036('0x529')]()),this[_0x4036('0x681')][_0x323a07];},VisuMZ[_0x4036('0x600')][_0x4036('0x365')]=Game_Enemy[_0x4036('0x24d')][_0x4036('0x699')],Game_Enemy[_0x4036('0x24d')][_0x4036('0x699')]=function(_0x5e263e,_0x49acf9,_0x7489bd){_0x5e263e=DataManager['swapEnemyIDs'](_0x5e263e),VisuMZ['BattleCore'][_0x4036('0x365')][_0x4036('0x286')](this,_0x5e263e,_0x49acf9,_0x7489bd);if(Imported[_0x4036('0xc9')]){if(_0x4036('0xe0')===_0x4036('0x19c')){function _0x7506b8(){this[_0x4036('0x1ed')]();}}else this[_0x4036('0x3fa')]();}this[_0x4036('0x406')](),this[_0x4036('0x2c')]();if(Imported[_0x4036('0xc9')]){if(_0x4036('0x112')===_0x4036('0x112'))this[_0x4036('0x5cc')]();else{function _0x58778f(){const _0x275801=_0x2512cb[_0x4036('0x3d1')]('['+_0xe8cc5d['$1'][_0x4036('0x161')](/\d+/g)+']');for(const _0x4b2912 of _0x275801){if(_0xf70231['value'](_0x4b2912))return![];}return!![];}}}},Game_Enemy['prototype'][_0x4036('0x406')]=function(){const _0x4878cd=VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x3e6')];this[_0x4036('0xcc')]=_0x4878cd[_0x4036('0x2d5')],this[_0x4036('0x583')]={};},Game_Enemy[_0x4036('0x24d')][_0x4036('0x2c')]=function(){const _0x44415c=VisuMZ[_0x4036('0x600')][_0x4036('0x635')]['Enemy'],_0x33daa7=this[_0x4036('0x819')]()[_0x4036('0x826')];this['_svBattlerData']={'name':'','wtypeId':_0x44415c[_0x4036('0x3f5')],'collapse':_0x44415c[_0x4036('0x169')],'motionIdle':_0x44415c['MotionIdle'],'width':_0x44415c['Width']||0x40,'height':_0x44415c[_0x4036('0x4c7')]||0x40,'anchorX':_0x44415c[_0x4036('0x6c5')]||0x0,'anchorY':_0x44415c[_0x4036('0x49e')]||0x0,'shadow':_0x44415c['Shadow']};if(_0x33daa7[_0x4036('0x161')](/<ATTACK ANIMATION:[ ](\d+)>/i)){if(_0x4036('0x348')===_0x4036('0x766')){function _0x42cc96(){if(this[_0x4036('0x203')]()!==_0x4036('0x6b4'))return;this[_0x4036('0x181')](_0x568ac9[_0x4036('0x4fd')]());}}else this[_0x4036('0xcc')]=Number(RegExp['$1']);}const _0x1c5e6a=this[_0x4036('0x583')];if(_0x33daa7['match'](/<SIDEVIEW BATTLER: (.*)>/i))_0x1c5e6a[_0x4036('0x37d')]=String(RegExp['$1']);else{if(_0x33daa7[_0x4036('0x161')](/<SIDEVIEW BATTLERS>\s*([\s\S]*)\s*<\/SIDEVIEW BATTLERS>/i)){const _0x24b2b6=String(RegExp['$1'])[_0x4036('0x77a')](/[\r\n]+/)['remove']('');_0x1c5e6a['name']=DataManager[_0x4036('0x456')](_0x24b2b6);}}_0x33daa7[_0x4036('0x161')](/<SIDEVIEW ANCHOR: (.*), (.*)>/i)&&(_0x1c5e6a[_0x4036('0x9d')]=eval(RegExp['$1']),_0x1c5e6a[_0x4036('0xb9')]=eval(RegExp['$2']));if(_0x33daa7[_0x4036('0x161')](/<SIDEVIEW COLLAPSE>/i)){if(_0x4036('0x1b')!==_0x4036('0x1b')){function _0x54e69e(){const _0x543717=_0x43978d[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x7e6')],_0xf3d4e=this[_0x4036('0x100')]('autoBattleUseSkills');return _0xf3d4e?_0x543717['StyleON']:_0x543717['StyleOFF'];}}else _0x1c5e6a[_0x4036('0x504')]=!![];}else{if(_0x33daa7['match'](/<SIDEVIEW NO COLLAPSE>/i)){if(_0x4036('0x738')==='UIxOt')_0x1c5e6a[_0x4036('0x504')]=![];else{function _0x43b188(){this[_0x4036('0x4f0')](_0x1c7f3c,_0x5fdd91,_0x8e0f9a);}}}}if(_0x33daa7[_0x4036('0x161')](/<SIDEVIEW SHOW SHADOW>/i)){if(_0x4036('0x7f6')===_0x4036('0x34f')){function _0x34a8bf(){this[_0x4036('0x53')]=new _0x23cf59();const _0x311983=_0x765a10[_0x4036('0x423')],_0x3b9e6d=_0x311983[_0x4036('0x4ce')][_0x4036('0x419')](_0x311983['_windowLayer']);_0x311983[_0x4036('0x396')](this[_0x4036('0x53')],_0x3b9e6d),this[_0x4036('0x53')][_0x4036('0x240')]['x']=0.5,this['_borderPortraitSprite']['anchor']['y']=0x1;const _0x1df8b7=_0x184da7[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x650')][_0x4036('0x7fd')];this['_borderPortraitSprite'][_0x4036('0x325')]['x']=_0x1df8b7,this[_0x4036('0x53')][_0x4036('0x325')]['y']=_0x1df8b7,this[_0x4036('0x53')]['y']=this['y']+this['height'],this[_0x4036('0x442')]=0x0;}}else _0x1c5e6a['shadow']=!![];}else _0x33daa7[_0x4036('0x161')](/<SIDEVIEW HIDE SHADOW>/i)&&(_0x1c5e6a['shadow']=![]);if(_0x33daa7[_0x4036('0x161')](/<SIDEVIEW IDLE MOTION: (.*)>/i)){if(_0x4036('0x4fb')===_0x4036('0x67a')){function _0x12cefd(){return _0x13f64e[_0x4036('0x6b0')](this),_0x58405b[_0x4036('0x600')][_0x4036('0x617')][_0x4036('0x286')](this,_0xfcc3b);}}else _0x1c5e6a[_0x4036('0x92')]=String(RegExp['$1'])[_0x4036('0x2c6')]()[_0x4036('0x330')]();}else{if(_0x33daa7[_0x4036('0x161')](/<SIDEVIEW IDLE MOTIONS>\s*([\s\S]*)\s*<\/SIDEVIEW IDLE MOTIONS>/i)){if(_0x4036('0x115')===_0x4036('0x1d1')){function _0x16b3a0(){return _0x2e2cc4[_0x4036('0x826')][_0x4036('0x161')](/<COMMAND ICON: (\d+)>/i)?_0x80b613(_0xfad94f['$1']):_0x3a3ba5['iconIndex'];}}else{const _0x4512d7=String(RegExp['$1'])[_0x4036('0x77a')](/[\r\n]+/)[_0x4036('0x2d8')]('');_0x1c5e6a[_0x4036('0x92')]=DataManager[_0x4036('0x456')](_0x4512d7);}}}_0x33daa7[_0x4036('0x161')](/<SIDEVIEW SIZE: (\d+), (\d+)>/i)&&(_0x1c5e6a['width']=Number(RegExp['$1']),_0x1c5e6a['height']=Number(RegExp['$2']));if(_0x33daa7['match'](/<SIDEVIEW WEAPON: (.*)>/i)){if(_0x4036('0x53d')===_0x4036('0x339')){function _0x32770e(){this[_0x4036('0x71b')][_0x4036('0x5d7')](_0x39346b);if(this[_0x4036('0x350')]())_0x5ef57a[_0x4036('0x423')][_0x4036('0x1ac')][_0x4036('0x1ee')](_0xbc4af7,this[_0x4036('0x2c9')]);else{this[_0x4036('0xda')]()[_0x4036('0x356')](_0x26a49b);if(_0x541909[_0x4036('0x6c0')]())_0x45aeb9[_0x4036('0x325')]['x']=-0x1;}}}else _0x1c5e6a[_0x4036('0xd6')]=DataManager[_0x4036('0x3a5')](RegExp['$1']);}else{if(_0x33daa7[_0x4036('0x161')](/<SIDEVIEW WEAPONS>\s*([\s\S]*)\s*<\/SIDEVIEW WEAPONS>/i)){if(_0x4036('0x4d7')===_0x4036('0x4d7')){const _0x3c5964=String(RegExp['$1'])[_0x4036('0x77a')](/[\r\n]+/)['remove'](''),_0x5b0a8d=DataManager[_0x4036('0x456')](_0x3c5964);_0x1c5e6a['wtypeId']=DataManager[_0x4036('0x3a5')](_0x5b0a8d);}else{function _0x5a89ea(){const _0x5944ee=_0x5cfdd4['x']+_0x2119ee[_0x4036('0x5bd')]((_0x1b3209[_0x4036('0x42')]-_0x1ea31f)/0x2);this[_0x4036('0x5bb')](_0x569c4d,_0x5944ee,_0x3ce6d2['y'],_0x48dae5);}}}}if(Imported[_0x4036('0xc9')]){if('kCmXC'===_0x4036('0x29f')){function _0x24f80e(){this[_0x4036('0x105')]['x']=0x0,this[_0x4036('0x105')]['x']+=this['_battler']['battleUIOffsetX'](),this[_0x4036('0x105')]['y']=-this[_0x4036('0x76f')]['height']-this[_0x4036('0x105')][_0x4036('0x28f')],this[_0x4036('0x105')]['y']+=this[_0x4036('0x2c9')][_0x4036('0x2e7')](),this[_0x4036('0x105')][_0x4036('0x325')]['x']=0x1/(this[_0x4036('0x325')]['x']||0.001),this[_0x4036('0x105')][_0x4036('0x325')]['y']=0x1/(this[_0x4036('0x325')]['y']||0.001),this[_0x4036('0x649')]()&&(this[_0x4036('0x781')][_0x4036('0x602')][_0x4036('0x325')]['x']=-0x1/(this[_0x4036('0x325')]['x']||0.001),this['_svBattlerSprite'][_0x4036('0x602')][_0x4036('0x325')]['y']=0x1/(this[_0x4036('0x325')]['y']||0.001));}}else{const _0x2b77a3=this[_0x4036('0x2ae')]();for(const _0x5a1a93 of _0x2b77a3){const _0x1956db=this['traitSet'](_0x5a1a93)[_0x4036('0x84')][_0x4036('0x6bc')]()[_0x4036('0x330')](),_0x630e3d=_0x5a1a93[_0x4036('0x6bc')]()[_0x4036('0x330')]();if(_0x33daa7[_0x4036('0x161')](VisuMZ[_0x4036('0x307')][_0x4036('0x7ea')][_0x4036('0x33d')[_0x4036('0x4d2')](_0x630e3d,_0x1956db)])){if(_0x4036('0x81d')!==_0x4036('0x81d')){function _0xd6e99(){_0x4f7c49=_0x189328[_0x4036('0x304')]()[_0x4036('0x13b')],_0x3275f2=_0x1828ef[_0x4036('0x304')]()[_0x4036('0x47d')];}}else _0x1c5e6a[_0x4036('0x37d')]=String(RegExp['$1']);}else{if(_0x33daa7[_0x4036('0x161')](VisuMZ[_0x4036('0x307')]['RegExp'][_0x4036('0x30c')[_0x4036('0x4d2')](_0x630e3d,_0x1956db)])){const _0x5eb7d6=String(RegExp['$1'])[_0x4036('0x77a')](/[\r\n]+/)[_0x4036('0x2d8')]('');_0x1c5e6a[_0x4036('0x37d')]=DataManager['processRandomizedData'](_0x5eb7d6);}}if(_0x33daa7[_0x4036('0x161')](VisuMZ['ElementStatusCore'][_0x4036('0x7ea')][_0x4036('0x75e')[_0x4036('0x4d2')](_0x630e3d,_0x1956db)])){if('gwSBx'===_0x4036('0x557'))console['log']('a'),_0x1c5e6a[_0x4036('0xd6')]=DataManager[_0x4036('0x3a5')](RegExp['$1']);else{function _0x32cf8d(){this[_0x4036('0x420')](_0x571ced);}}}else{if(_0x33daa7[_0x4036('0x161')](VisuMZ[_0x4036('0x307')]['RegExp'][_0x4036('0x140')[_0x4036('0x4d2')](_0x630e3d,_0x1956db)])){console[_0x4036('0x2a6')]('b');const _0x9eb409=String(RegExp['$1'])[_0x4036('0x77a')](/[\r\n]+/)[_0x4036('0x2d8')](''),_0x7f7288=DataManager[_0x4036('0x456')](_0x9eb409);_0x1c5e6a[_0x4036('0xd6')]=DataManager[_0x4036('0x3a5')](_0x7f7288);}}if(_0x33daa7['match'](VisuMZ[_0x4036('0x307')][_0x4036('0x7ea')]['SvMotionIdleSolo-%1-%2'[_0x4036('0x4d2')](_0x630e3d,_0x1956db)])){if(_0x4036('0x133')==='JfwXn')_0x1c5e6a[_0x4036('0x92')]=String(RegExp['$1'])[_0x4036('0x2c6')]()[_0x4036('0x330')]();else{function _0x652db7(){this[_0x4036('0x5d7')](_0x4036('0x69b'),_0x54d4af);}}}else{if(_0x33daa7[_0x4036('0x161')](VisuMZ[_0x4036('0x307')]['RegExp'][_0x4036('0x246')[_0x4036('0x4d2')](_0x630e3d,_0x1956db)])){if(_0x4036('0x334')!==_0x4036('0x334')){function _0xbb6b49(){return this[_0x4036('0x449')]()[_0x4036('0x302')]();}}else{const _0x4a618a=String(RegExp['$1'])[_0x4036('0x77a')](/[\r\n]+/)[_0x4036('0x2d8')]('');_0x1c5e6a[_0x4036('0x92')]=DataManager['processRandomizedData'](_0x4a618a);}}}}}}},Game_Enemy['prototype'][_0x4036('0x2ff')]=function(){return this[_0x4036('0xcc')]||0x0;},Game_Enemy['prototype'][_0x4036('0x7d2')]=function(){return 0x0;},Game_Enemy[_0x4036('0x24d')]['canBattlerMove']=function(){if(this[_0x4036('0x819')]()['note'][_0x4036('0x161')](/<BATTLER SPRITE CANNOT MOVE>/i))return![];return Game_Battler[_0x4036('0x24d')][_0x4036('0x37c')][_0x4036('0x286')](this);},Game_Enemy[_0x4036('0x24d')][_0x4036('0x4ec')]=function(){const _0x4820cf=[];for(const _0x2584ed of this['enemy']()['actions']){const _0x28b286=$dataSkills[_0x2584ed[_0x4036('0x746')]];if(_0x28b286&&!_0x4820cf[_0x4036('0x747')](_0x28b286))_0x4820cf[_0x4036('0x5d7')](_0x28b286);}return _0x4820cf;},Game_Enemy[_0x4036('0x24d')][_0x4036('0x801')]=function(){let _0x63f7bd=_0x4036('0x801');if(this[_0x4036('0x37')](_0x63f7bd))return this[_0x4036('0x681')][_0x63f7bd];return this[_0x4036('0x681')][_0x63f7bd]=this[_0x4036('0x6e0')](this['enemy']()),this['_cache'][_0x63f7bd];},Game_Enemy[_0x4036('0x24d')][_0x4036('0x2e7')]=function(){let _0x11d532=_0x4036('0x2e7');if(this[_0x4036('0x37')](_0x11d532))return this[_0x4036('0x681')][_0x11d532];return this['_cache'][_0x11d532]=this[_0x4036('0x2c7')](this[_0x4036('0x819')]()),this[_0x4036('0x681')][_0x11d532];},Game_Enemy[_0x4036('0x24d')]['svBattlerData']=function(){if(this[_0x4036('0x583')]!==undefined)return this['_svBattlerData'];return this[_0x4036('0x2c')](),this['_svBattlerData'];},Game_Enemy[_0x4036('0x24d')][_0x4036('0x649')]=function(){return this[_0x4036('0x671')]()[_0x4036('0x37d')]!=='';},Game_Enemy[_0x4036('0x24d')][_0x4036('0x152')]=function(){return this[_0x4036('0x671')]()[_0x4036('0x37d')];},Game_Enemy[_0x4036('0x24d')][_0x4036('0x274')]=function(){if(this[_0x4036('0x649')]()){if('pVgIR'===_0x4036('0x522')){function _0x36c86f(){const _0x51c6db=_0x3221cd[_0x4036('0x13a')]();this[_0x4036('0x320')](_0x451ac7,_0x194c0e,_0x5a1267),this['createEffectActionSet'](_0x2fb898,_0x590e62,_0xe938b3),this[_0x4036('0x647')](_0x1eb7fd,_0x24eee5,_0x1c678d);}}else return VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x43f')][_0x4036('0x3e8')];}else{if('HHtID'===_0x4036('0x192')){function _0x41515c(){return _0x4e2ddf['BattleCore'][_0x4036('0x3c1')]['call'](this);}}else return VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x3e6')]['SmoothImage'];}},Game_Enemy[_0x4036('0x24d')][_0x4036('0x4e8')]=function(_0x4b63dd){Game_Battler[_0x4036('0x24d')][_0x4036('0x4e8')][_0x4036('0x286')](this,_0x4b63dd);if(this[_0x4036('0x649')]())this[_0x4036('0x2c3')](_0x4b63dd);},Game_Enemy[_0x4036('0x24d')][_0x4036('0x73c')]=function(){const _0x187334=this[_0x4036('0x671')]()[_0x4036('0xd6')]||0x0,_0x720a12=$dataSystem[_0x4036('0x78c')][_0x187334];if(_0x720a12){if(_0x720a12[_0x4036('0x3ce')]===0x0)this[_0x4036('0x530')](_0x4036('0x289'));else{if(_0x720a12[_0x4036('0x3ce')]===0x1){if(_0x4036('0x4a6')===_0x4036('0x4a6'))this['requestMotion'](_0x4036('0x374'));else{function _0x34c3e8(){const _0x1b83af=_0x6832a7[_0x4036('0x24d')]['battleLayoutStyle']();[_0x4036('0x6e3'),_0x4036('0x57a'),'portrait',_0x4036('0x516')][_0x4036('0x747')](_0x1b83af)&&(this[_0x4036('0x57b')]=0x0);}}}else{if(_0x720a12['type']===0x2){if(_0x4036('0x70e')!==_0x4036('0x1df'))this[_0x4036('0x530')](_0x4036('0x753'));else{function _0xf05cbe(){return _0xfb2718(_0x2bd743['$1']);}}}}}this[_0x4036('0x7c3')](_0x720a12[_0x4036('0x6cd')]);}},Game_Enemy['prototype'][_0x4036('0x77b')]=function(){const _0x485aea=this[_0x4036('0x671')]()[_0x4036('0xd6')]||0x0;return $dataSystem['attackMotions'][_0x485aea];},Game_Enemy[_0x4036('0x24d')][_0x4036('0x69b')]=function(){Game_Battler[_0x4036('0x24d')][_0x4036('0x69b')][_0x4036('0x286')](this),this['isSpriteVisible']()&&this[_0x4036('0x649')]()&&this[_0x4036('0x530')](_0x4036('0xd4')),SoundManager['playEnemyDamage']();},Game_Enemy[_0x4036('0x24d')][_0x4036('0x81e')]=function(){Game_Battler[_0x4036('0x24d')][_0x4036('0x81e')][_0x4036('0x286')](this),this[_0x4036('0x530')](_0x4036('0x80a'));},Game_Enemy[_0x4036('0x24d')][_0x4036('0xfb')]=function(){Game_Battler['prototype']['performMagicEvasion']['call'](this),this['requestMotion'](_0x4036('0x80a'));},Game_Enemy[_0x4036('0x24d')]['performCounter']=function(){Game_Battler[_0x4036('0x24d')][_0x4036('0x207')][_0x4036('0x286')](this),this[_0x4036('0x73c')]();},Game_Enemy[_0x4036('0x24d')][_0x4036('0x6ee')]=function(){if(this[_0x4036('0x649')]()){if(this[_0x4036('0x710')]()>=0x1)return!![];return this[_0x4036('0x671')]()[_0x4036('0x504')];}else{if(_0x4036('0x440')!==_0x4036('0x440')){function _0x159d78(){for(const _0x1a4d5b of this[_0x4036('0x71b')]){_0x1a4d5b['x']+=_0x21894c[_0x4036('0x834')]*_0x58da5c,_0x1a4d5b['y']+=_0x59a582[_0x4036('0x42a')];}}}else return!![];}},Game_Enemy['prototype'][_0x4036('0x6d3')]=function(){return this[_0x4036('0x671')]()[_0x4036('0x9d')];},Game_Enemy[_0x4036('0x24d')]['svBattlerAnchorY']=function(){return this[_0x4036('0x671')]()[_0x4036('0xb9')];},Game_Enemy[_0x4036('0x24d')][_0x4036('0x9f')]=function(){return this[_0x4036('0x671')]()[_0x4036('0x2d1')];},VisuMZ['BattleCore']['Game_Enemy_transform']=Game_Enemy[_0x4036('0x24d')][_0x4036('0x797')],Game_Enemy[_0x4036('0x24d')][_0x4036('0x797')]=function(_0xb892e4){VisuMZ[_0x4036('0x600')]['Game_Enemy_transform']['call'](this,_0xb892e4),this[_0x4036('0x406')](),this['setupBattleCoreData']();const _0x5bc1af=this[_0x4036('0x304')]();if(_0x5bc1af)_0x5bc1af[_0x4036('0x7ad')](this);},Game_Unit[_0x4036('0x24d')][_0x4036('0x38d')]=function(_0x4e505d){for(const _0x29f2a2 of this[_0x4036('0x26a')]()){if(_0x4036('0x6b3')!==_0x4036('0xb4')){if(_0x29f2a2)_0x29f2a2[_0x4036('0x38d')](_0x4e505d);}else{function _0x5e29da(){return _0x52c3c3['BattleCore'][_0x4036('0x635')][_0x4036('0x54c')][_0x4036('0x463')][_0x4036('0x286')](this);}}}},Game_Unit[_0x4036('0x24d')][_0x4036('0x175')]=function(){const _0x377e11=this['aliveMembers']();return _0x377e11[Math['randomInt'](_0x377e11[_0x4036('0x6b5')])];},VisuMZ[_0x4036('0x600')][_0x4036('0x34')]=Game_Map['prototype'][_0x4036('0x73d')],Game_Map[_0x4036('0x24d')][_0x4036('0x73d')]=function(){VisuMZ[_0x4036('0x600')]['Game_Map_setupBattleback']['call'](this),this[_0x4036('0x2c5')]();},Game_Map['prototype'][_0x4036('0x2c5')]=function(){this[_0x4036('0x811')]={},this[_0x4036('0x2e4')]={};if(!$dataMap)return;const _0x29752a=$dataMap[_0x4036('0x826')];if(!_0x29752a)return;const _0x857d2b=_0x29752a[_0x4036('0x161')](/<REGION (\d+) BATTLEBACK(\d+): (.*)>/gi);if(_0x857d2b)for(const _0x5bb5db of _0x857d2b){if(_0x4036('0x4d8')===_0x4036('0x132')){function _0x1e4338(){const _0x39abd7=_0x48c216['actor']();if(_0x39abd7)_0x39abd7[_0x4036('0x304')]()[_0x4036('0x174')]();_0x366838[_0x4036('0x600')][_0x4036('0x6d4')][_0x4036('0x286')](this);}}else{_0x5bb5db['match'](/<REGION (\d+) BATTLEBACK(\d+): (.*)>/i);const _0x3f0372=Number(RegExp['$1']),_0x3c92b9=Number(RegExp['$2']),_0x1c5140=_0x3c92b9===0x1?this['_regionBattleback1']:this[_0x4036('0x2e4')],_0x5287ce=String(RegExp['$3']);_0x1c5140[_0x3f0372]=_0x5287ce;}}},VisuMZ[_0x4036('0x600')][_0x4036('0x668')]=Game_Map[_0x4036('0x24d')][_0x4036('0xa6')],Game_Map[_0x4036('0x24d')]['battleback1Name']=function(){if(!BattleManager['isBattleTest']()){const _0x3ba76=$gamePlayer['regionId']($gamePlayer['x'],$gamePlayer['y']);if(this[_0x4036('0x811')]&&this[_0x4036('0x811')][_0x3ba76]){if(_0x4036('0x1fd')!==_0x4036('0x379'))return this['_regionBattleback1'][_0x3ba76];else{function _0xd44330(){if(this['contentsOpacity']>0x0)this['contentsOpacity']-=0x10;}}}}return VisuMZ[_0x4036('0x600')][_0x4036('0x668')]['call'](this);},VisuMZ[_0x4036('0x600')][_0x4036('0x71d')]=Game_Map[_0x4036('0x24d')][_0x4036('0x314')],Game_Map[_0x4036('0x24d')][_0x4036('0x314')]=function(){if(!BattleManager['isBattleTest']()){if(_0x4036('0x104')===_0x4036('0x447')){function _0x10fa3b(){this['_currentAngle']=this[_0x4036('0x59a')];}}else{const _0x5ec306=$gamePlayer[_0x4036('0x5c1')]($gamePlayer['x'],$gamePlayer['y']);if(this[_0x4036('0x811')]&&this['_regionBattleback2'][_0x5ec306]){if(_0x4036('0x59c')===_0x4036('0x59c'))return this['_regionBattleback2'][_0x5ec306];else{function _0x5851c7(){return _0x916bef[_0x4036('0x54a')]();}}}}}return VisuMZ[_0x4036('0x600')][_0x4036('0x71d')][_0x4036('0x286')](this);},VisuMZ[_0x4036('0x600')][_0x4036('0x617')]=Game_Interpreter[_0x4036('0x24d')][_0x4036('0x3c9')],Game_Interpreter[_0x4036('0x24d')][_0x4036('0x3c9')]=function(_0x96d4f3){return $gameTemp[_0x4036('0x6b0')](this),VisuMZ[_0x4036('0x600')][_0x4036('0x617')][_0x4036('0x286')](this,_0x96d4f3);},VisuMZ['BattleCore'][_0x4036('0x1e5')]=Game_Interpreter[_0x4036('0x24d')][_0x4036('0x14a')],Game_Interpreter[_0x4036('0x24d')][_0x4036('0x14a')]=function(){if(SceneManager[_0x4036('0x78a')]())switch(this[_0x4036('0x77e')]){case _0x4036('0x405'):if(Imported[_0x4036('0x5a5')]){if(_0x4036('0x199')!=='IpJPe'){function _0x119ec5(){const _0x29183e=_0x1ffd4b[_0x4036('0x4a2')]()?_0x24b228[_0x4036('0x5b0')]:_0x4de20c['message2'];_0x29183e&&_0x5639b7[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x54c')][_0x4036('0x222')]&&(this['push'](_0x4036('0x1fb')),this[_0x4036('0x5d7')]('pushBaseLine'),this[_0x4036('0x5d7')]('addText',_0x29183e[_0x4036('0x4d2')](_0x4fc28b[_0x4036('0x37d')]())),this[_0x4036('0x5d7')]('wait')),_0x29b1f7['id']===_0x261368['deathStateId']()&&this[_0x4036('0x5d7')](_0x4036('0x1e8'),_0x347b07);}}else{if($gameScreen[_0x4036('0x3d8')]()[_0x4036('0x34c')]>0x0)return!![];this[_0x4036('0x77e')]='';}}break;case _0x4036('0xa3'):if(BattleManager['_spriteset'][_0x4036('0x694')]())return!![];this[_0x4036('0x77e')]='';break;case _0x4036('0x4f7'):if(Imported[_0x4036('0x5a5')]){if($gameScreen[_0x4036('0x3d8')]()['cameraDuration']>0x0)return!![];if($gameScreen[_0x4036('0x3d8')]()[_0x4036('0x6e7')]>0x0)return!![];this[_0x4036('0x77e')]='';}break;case _0x4036('0x102'):if(BattleManager[_0x4036('0x5f8')][_0x4036('0x64')]())return!![];this['_waitMode']='';break;case _0x4036('0x5be'):if(BattleManager[_0x4036('0x5f8')][_0x4036('0x4c5')]())return!![];this[_0x4036('0x77e')]='';break;case'battleJump':if(BattleManager[_0x4036('0x5f8')][_0x4036('0x7d0')]())return!![];this[_0x4036('0x77e')]='';break;case _0x4036('0x6ea'):if(BattleManager[_0x4036('0x3b4')][_0x4036('0x5d')]())return!![];this[_0x4036('0x77e')]='';break;case _0x4036('0x7c0'):if(BattleManager[_0x4036('0x5f8')][_0x4036('0x6b9')]())return!![];this[_0x4036('0x77e')]='';break;case _0x4036('0x812'):if(BattleManager[_0x4036('0x5f8')][_0x4036('0x665')]())return!![];this[_0x4036('0x77e')]='';break;case _0x4036('0x252'):if(BattleManager[_0x4036('0x5f8')][_0x4036('0xc2')]())return!![];this[_0x4036('0x77e')]='';break;case _0x4036('0x73'):if(BattleManager[_0x4036('0x5f8')][_0x4036('0x70c')]())return!![];this['_waitMode']='';break;case _0x4036('0x22f'):if(Imported['VisuMZ_3_ActSeqCamera']){if($gameScreen[_0x4036('0x3d8')]()[_0x4036('0x58b')]>0x0)return!![];this[_0x4036('0x77e')]='';}break;case _0x4036('0x168'):if(BattleManager[_0x4036('0x5f8')]['isAnyoneSpinning']())return!![];this[_0x4036('0x77e')]='';break;case _0x4036('0x5c3'):if(Imported[_0x4036('0x5a5')]){if($gameScreen[_0x4036('0x3d8')]()[_0x4036('0x3b8')]>0x0)return!![];this[_0x4036('0x77e')]='';}break;}return VisuMZ[_0x4036('0x600')][_0x4036('0x1e5')][_0x4036('0x286')](this);},VisuMZ['BattleCore'][_0x4036('0x757')]=Game_Interpreter['prototype'][_0x4036('0x741')],Game_Interpreter[_0x4036('0x24d')][_0x4036('0x741')]=function(_0x5d5951){return!$gameParty[_0x4036('0x764')]()?this['command301_PreBattleEvent'](_0x5d5951):VisuMZ[_0x4036('0x600')][_0x4036('0x757')][_0x4036('0x286')](this,_0x5d5951);},Game_Interpreter[_0x4036('0x24d')][_0x4036('0x23e')]=function(_0x4b87e1){return VisuMZ[_0x4036('0x600')][_0x4036('0x757')][_0x4036('0x286')](this,_0x4b87e1);},Game_Interpreter[_0x4036('0x24d')][_0x4036('0x4b7')]=function(_0x1b04be){const _0x30eacd=VisuMZ['BattleCore'][_0x4036('0x635')]['Mechanics'],_0x52adbb=_0x30eacd[_0x4036('0x12')],_0x475a68=$dataCommonEvents[_0x52adbb];if(_0x475a68){const _0x4e8271=this[_0x4036('0x53a')]()?this[_0x4036('0x81')]:0x0,_0x2edd8a=JsonEx['makeDeepCopy'](_0x475a68[_0x4036('0x57a')]),_0x58f2b7=_0x2edd8a[_0x4036('0x6b5')]-0x1,_0x10c32d={'code':0xbc3,'indent':0x0,'parameters':JsonEx[_0x4036('0x2bf')](_0x1b04be)};_0x2edd8a[_0x4036('0x62e')](_0x58f2b7,0x0,_0x10c32d),this['setupChild'](_0x2edd8a,_0x4e8271);}else return VisuMZ[_0x4036('0x600')]['Game_Interpreter_command301'][_0x4036('0x286')](this,_0x1b04be);return!![];},VisuMZ[_0x4036('0x600')][_0x4036('0x31f')]=BattleManager[_0x4036('0x16b')],BattleManager[_0x4036('0x16b')]=function(){VisuMZ[_0x4036('0x600')][_0x4036('0x31f')]['call'](this),this[_0x4036('0x1c5')]();},BattleManager[_0x4036('0x1c5')]=function(){const _0x5785dc=VisuMZ[_0x4036('0x600')]['Settings'][_0x4036('0x71f')];if(_0x5785dc[_0x4036('0x12')]){if(_0x4036('0x7c4')!==_0x4036('0x7c4')){function _0x2af3bd(){const _0x49dbdd=_0x2d2a1c(_0x31799e['$1']),_0x3a8be8=_0x4036('0x6db')[_0x4036('0x4d2')](_0x49dbdd),_0x374e9b=_0x4b114d[_0x4036('0x600')][_0x4036('0x435')](_0x36799f,_0x3ffabe);_0x155f3a[_0x4036('0x600')]['JS'][_0x374e9b]=new _0x50e506(_0x3a8be8);}}else this[_0x4036('0x2be')]=!![],$gameTemp[_0x4036('0x5b')](_0x5785dc[_0x4036('0x12')]),$gameMap[_0x4036('0x7b')](),$gameMap['_interpreter'][_0x4036('0x41f')]=!![];}},VisuMZ['BattleCore'][_0x4036('0x44c')]=Scene_Map[_0x4036('0x24d')][_0x4036('0x7da')],Scene_Map[_0x4036('0x24d')][_0x4036('0x7da')]=function(){if(BattleManager[_0x4036('0x2be')])this[_0x4036('0x476')]();else{if(_0x4036('0x63f')!=='zYJGv')VisuMZ[_0x4036('0x600')]['Scene_Map_launchBattle'][_0x4036('0x286')](this);else{function _0x58ba18(){const _0x4492ea=_0x14f8a6['BattleCore'][_0x4036('0x635')];_0x4492ea[_0x4036('0x43f')][_0x4036('0x3e8')]===_0x227056&&(_0x4492ea['Actor'][_0x4036('0x3e8')]=![]),_0x4492ea[_0x4036('0x3e6')][_0x4036('0x3e8')]===_0x5f207c&&(_0x4492ea[_0x4036('0x3e6')][_0x4036('0x3e8')]=!![]);}}}},Scene_Map[_0x4036('0x24d')][_0x4036('0x476')]=function(){this[_0x4036('0x264')]=!![];},VisuMZ[_0x4036('0x600')][_0x4036('0x3db')]=SceneManager[_0x4036('0x148')],SceneManager[_0x4036('0x148')]=function(){if(BattleManager[_0x4036('0x2be')])return![];return VisuMZ['BattleCore'][_0x4036('0x3db')]['call'](this);},VisuMZ['BattleCore']['Game_Interpreter_terminate']=Game_Interpreter[_0x4036('0x24d')][_0x4036('0x107')],Game_Interpreter[_0x4036('0x24d')]['terminate']=function(){VisuMZ[_0x4036('0x600')][_0x4036('0x1da')][_0x4036('0x286')](this),this[_0x4036('0x41f')]&&(this[_0x4036('0x41f')]=undefined,SceneManager['_scene'][_0x4036('0x1af')]());},Scene_Map[_0x4036('0x24d')][_0x4036('0x1af')]=function(){BattleManager[_0x4036('0x2be')]=undefined,this['stop']();},VisuMZ[_0x4036('0x600')][_0x4036('0x55')]=Scene_ItemBase['prototype'][_0x4036('0x1db')],Scene_ItemBase[_0x4036('0x24d')][_0x4036('0x1db')]=function(){VisuMZ[_0x4036('0x600')][_0x4036('0x55')][_0x4036('0x286')](this),this[_0x4036('0x13a')]()[_0x4036('0x826')][_0x4036('0x161')](/<CUSTOM ACTION SEQUENCE>/i)&&($gameTemp['_commonEventQueue']=[]);},VisuMZ[_0x4036('0x600')][_0x4036('0x6d5')]=Scene_Options['prototype'][_0x4036('0x477')],Scene_Options['prototype']['maxCommands']=function(){let _0x74dad4=VisuMZ[_0x4036('0x600')][_0x4036('0x6d5')][_0x4036('0x286')](this);const _0x949ed5=VisuMZ[_0x4036('0x600')][_0x4036('0x635')];if(_0x949ed5[_0x4036('0x7e6')][_0x4036('0x10')]&&_0x949ed5[_0x4036('0x7e6')][_0x4036('0x56')])_0x74dad4+=0x2;if(_0x949ed5[_0x4036('0x7a1')][_0x4036('0x10')]&&_0x949ed5[_0x4036('0x7a1')][_0x4036('0x56')])_0x74dad4+=0x1;return _0x74dad4;},VisuMZ[_0x4036('0x600')][_0x4036('0x7e5')]=Scene_Battle[_0x4036('0x24d')]['start'],Scene_Battle[_0x4036('0x24d')]['start']=function(){SceneManager[_0x4036('0x3a7')]()?Scene_Message[_0x4036('0x24d')][_0x4036('0x298')][_0x4036('0x286')](this):VisuMZ[_0x4036('0x600')]['Scene_Battle_start'][_0x4036('0x286')](this);},VisuMZ[_0x4036('0x600')][_0x4036('0x10e')]=Scene_Battle[_0x4036('0x24d')][_0x4036('0x2f6')],Scene_Battle[_0x4036('0x24d')][_0x4036('0x2f6')]=function(){SceneManager[_0x4036('0x164')]()?Scene_Message[_0x4036('0x24d')]['stop'][_0x4036('0x286')](this):VisuMZ[_0x4036('0x600')][_0x4036('0x10e')][_0x4036('0x286')](this);},VisuMZ['BattleCore'][_0x4036('0x1a4')]=Scene_Battle[_0x4036('0x24d')][_0x4036('0x107')],Scene_Battle[_0x4036('0x24d')][_0x4036('0x107')]=function(){SceneManager[_0x4036('0x164')]()?Scene_Message[_0x4036('0x24d')][_0x4036('0x107')][_0x4036('0x286')](this):VisuMZ[_0x4036('0x600')][_0x4036('0x1a4')][_0x4036('0x286')](this);},Scene_Battle[_0x4036('0x24d')][_0x4036('0x88')]=function(){if(ConfigManager[_0x4036('0x471')]&&ConfigManager['uiInputPosition']!==undefined){if('EvzdP'===_0x4036('0x150'))return ConfigManager['uiInputPosition'];else{function _0x249037(){this[_0x4036('0x6a1')]();}}}else{if(this[_0x4036('0x203')]()==='border')return![];else{return Scene_Message[_0x4036('0x24d')]['isRightInputMode'][_0x4036('0x286')](this);;}}},VisuMZ[_0x4036('0x600')]['Scene_Battle_createAllWindows']=Scene_Battle[_0x4036('0x24d')]['createAllWindows'],Scene_Battle[_0x4036('0x24d')][_0x4036('0x656')]=function(){this[_0x4036('0x523')](),VisuMZ[_0x4036('0x600')]['Scene_Battle_createAllWindows'][_0x4036('0x286')](this),this[_0x4036('0x614')]();},VisuMZ[_0x4036('0x600')]['Scene_Battle_createCancelButton']=Scene_Battle[_0x4036('0x24d')][_0x4036('0x7e2')],Scene_Battle[_0x4036('0x24d')][_0x4036('0x7e2')]=function(){VisuMZ[_0x4036('0x600')][_0x4036('0x122')][_0x4036('0x286')](this),this[_0x4036('0x203')]()===_0x4036('0x516')&&this[_0x4036('0xdf')]();},Scene_Battle['prototype'][_0x4036('0x623')]=function(_0x525674){_0x525674?(this[_0x4036('0x1b9')]['x']=(Graphics[_0x4036('0x42')]-Graphics[_0x4036('0x316')])/0x2,this[_0x4036('0x1b9')]['y']=(Graphics[_0x4036('0x28f')]-Graphics[_0x4036('0x4f6')])/0x2):(this[_0x4036('0x1b9')]['x']=Graphics[_0x4036('0x42')]*0xa,this[_0x4036('0x1b9')]['y']=Graphics[_0x4036('0x28f')]*0xa);},VisuMZ[_0x4036('0x600')][_0x4036('0x67')]=Scene_Battle[_0x4036('0x24d')][_0x4036('0x758')],Scene_Battle['prototype'][_0x4036('0x758')]=function(){const _0x113508=BattleManager['actor']();if(_0x113508)_0x113508[_0x4036('0x304')]()['stepBack']();VisuMZ['BattleCore'][_0x4036('0x67')][_0x4036('0x286')](this);},VisuMZ[_0x4036('0x600')][_0x4036('0x6d4')]=Scene_Battle[_0x4036('0x24d')][_0x4036('0xba')],Scene_Battle[_0x4036('0x24d')][_0x4036('0xba')]=function(){const _0x3ad0e3=BattleManager['actor']();if(_0x3ad0e3)_0x3ad0e3[_0x4036('0x304')]()['stepBack']();VisuMZ[_0x4036('0x600')]['Scene_Battle_selectPreviousCommand']['call'](this);},VisuMZ[_0x4036('0x600')][_0x4036('0x773')]=Scene_Battle['prototype'][_0x4036('0x20d')],Scene_Battle[_0x4036('0x24d')][_0x4036('0x20d')]=function(){if(VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x54c')][_0x4036('0x463')])return VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x54c')][_0x4036('0x463')][_0x4036('0x286')](this);return VisuMZ[_0x4036('0x600')][_0x4036('0x773')][_0x4036('0x286')](this);},VisuMZ[_0x4036('0x600')][_0x4036('0x7a8')]=Scene_Battle[_0x4036('0x24d')][_0x4036('0x308')],Scene_Battle['prototype'][_0x4036('0x308')]=function(){VisuMZ['BattleCore'][_0x4036('0x7a8')][_0x4036('0x286')](this),this[_0x4036('0x216')]();},Scene_Battle[_0x4036('0x24d')][_0x4036('0x216')]=function(){const _0x44461e=this[_0x4036('0x60a')];_0x44461e[_0x4036('0x135')](_0x4036('0x52d'),this['commandAutoBattle']['bind'](this)),_0x44461e[_0x4036('0x135')](_0x4036('0x3a3'),this['commandOptions'][_0x4036('0x1be')](this));const _0x6ac586=this[_0x4036('0x203')]();switch(_0x6ac586){case'xp':case'portrait':return this[_0x4036('0x60a')][_0x4036('0x37b')](0x1);break;}},Scene_Battle[_0x4036('0x24d')]['commandAutoBattle']=function(){BattleManager[_0x4036('0x49b')]=!![],$gameParty[_0x4036('0x552')](),this[_0x4036('0x758')]();},Scene_Battle[_0x4036('0x24d')][_0x4036('0x75a')]=function(){if(this[_0x4036('0x223')]()){if('dcEFF'===_0x4036('0x5b1')){function _0x3cde04(){this[_0x4036('0xb5')]=_0x3c00d2[_0x4036('0xb5')];}}else this['_callSceneOptions']=!![],this['_logWindow'][_0x4036('0x5d7')](_0x4036('0x596'),VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x20')]['ActiveTpbOptionsMessage']);}else{if(_0x4036('0x65f')===_0x4036('0x480')){function _0x5e198f(){_0x337f9f[_0x4036('0x268')](),_0x26fa51[_0x4036('0x49b')]=![],_0xec0f28[_0x4036('0x47b')](),_0x22c6b5[_0x4036('0x47b')]();}}else this[_0x4036('0x31e')]();}},Scene_Battle[_0x4036('0x24d')][_0x4036('0x223')]=function(){return BattleManager[_0x4036('0x377')]();},Scene_Battle[_0x4036('0x24d')][_0x4036('0x31e')]=function(){this['_callSceneOptions']=![],this[_0x4036('0x5f8')][_0x4036('0x209')](),this[_0x4036('0x1b9')][_0x4036('0x392')]=![];if(BattleManager[_0x4036('0x1c7')]())($dataSystem[_0x4036('0xa6')]||$dataSystem[_0x4036('0x314')])&&SceneManager[_0x4036('0x3bd')]();else($gameMap[_0x4036('0xa6')]()||$gameMap[_0x4036('0x314')]())&&SceneManager['snapForBackground']();SceneManager[_0x4036('0x5d7')](Scene_Options);},VisuMZ[_0x4036('0x600')]['Scene_Battle_updateBattleProcess']=Scene_Battle[_0x4036('0x24d')][_0x4036('0xea')],Scene_Battle['prototype']['updateBattleProcess']=function(){VisuMZ[_0x4036('0x600')][_0x4036('0x55d')][_0x4036('0x286')](this);if(this[_0x4036('0x1e7')]&&!BattleManager['_subject'])this['callOptions']();},Scene_Battle[_0x4036('0x24d')][_0x4036('0x614')]=function(){const _0x745ac4=this[_0x4036('0x267')]();this['_autoBattleWindow']=new Window_AutoBattleCancel(_0x745ac4),this[_0x4036('0x380')][_0x4036('0x755')](),this[_0x4036('0x356')](this[_0x4036('0x380')]);},Scene_Battle[_0x4036('0x24d')][_0x4036('0x267')]=function(){return VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x7e6')][_0x4036('0x624')][_0x4036('0x286')](this);},Scene_Battle[_0x4036('0x24d')]['isPartyCommandWindowDisabled']=function(){return VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x20')][_0x4036('0x3f0')];},VisuMZ['BattleCore'][_0x4036('0x731')]=Scene_Battle['prototype'][_0x4036('0x45')],Scene_Battle[_0x4036('0x24d')][_0x4036('0x45')]=function(){this['isPartyCommandWindowDisabled']()?this['onDisabledPartyCommandSelection']():VisuMZ[_0x4036('0x600')][_0x4036('0x731')][_0x4036('0x286')](this);},Scene_Battle['prototype'][_0x4036('0x767')]=function(){if(BattleManager[_0x4036('0x32f')]())this['selectNextCommand']();else BattleManager['isTPB']()&&VisuMZ[_0x4036('0x600')][_0x4036('0x731')][_0x4036('0x286')](this);},VisuMZ['BattleCore'][_0x4036('0x358')]=Scene_Battle['prototype'][_0x4036('0x7df')],Scene_Battle[_0x4036('0x24d')][_0x4036('0x7df')]=function(){VisuMZ[_0x4036('0x600')][_0x4036('0x358')][_0x4036('0x286')](this),this['createActorCommandWindowBattleCore']();},Scene_Battle[_0x4036('0x24d')][_0x4036('0x24a')]=function(){const _0x33b17b=this[_0x4036('0x810')];_0x33b17b[_0x4036('0x135')](_0x4036('0x13'),this[_0x4036('0x6bf')][_0x4036('0x1be')](this)),_0x33b17b[_0x4036('0x135')](_0x4036('0x52d'),this[_0x4036('0x6a2')][_0x4036('0x1be')](this)),_0x33b17b[_0x4036('0x135')](_0x4036('0x226'),this[_0x4036('0x9a')][_0x4036('0x1be')](this));if(this[_0x4036('0x52')]()&&BattleManager[_0x4036('0xa0')]()){if(_0x4036('0x466')!==_0x4036('0x466')){function _0x37c221(){this['opacity']=this['_targetOpacity'];}}else delete _0x33b17b[_0x4036('0x87')][_0x4036('0x2a0')];}},Scene_Battle['prototype'][_0x4036('0x6bf')]=function(){this[_0x4036('0x718')]();},Scene_Battle['prototype'][_0x4036('0x6a2')]=function(){BattleManager['actor']()[_0x4036('0x25e')](),BattleManager['finishActorInput'](),BattleManager[_0x4036('0x22')](),this['changeInputWindow']();},Scene_Battle[_0x4036('0x24d')]['actorCommandSingleSkill']=function(){const _0x3a36b8=BattleManager[_0x4036('0x455')]();_0x3a36b8[_0x4036('0x257')](this[_0x4036('0x810')][_0x4036('0x620')]()),this[_0x4036('0x593')]();},VisuMZ[_0x4036('0x600')][_0x4036('0x30f')]=Scene_Battle[_0x4036('0x24d')][_0x4036('0x3a0')],Scene_Battle[_0x4036('0x24d')]['createHelpWindow']=function(){VisuMZ[_0x4036('0x600')][_0x4036('0x30f')][_0x4036('0x286')](this),this[_0x4036('0x6d9')]();},Scene_Battle['prototype'][_0x4036('0x6d9')]=function(){this['_actorCommandWindow'][_0x4036('0x2bc')](this[_0x4036('0x11d')]),this[_0x4036('0x60a')][_0x4036('0x2bc')](this['_helpWindow']);},Scene_Battle['prototype'][_0x4036('0x203')]=function(){if(this[_0x4036('0x16c')])return this[_0x4036('0x16c')];return this[_0x4036('0x16c')]=VisuMZ[_0x4036('0x600')][_0x4036('0x635')]['BattleLayout'][_0x4036('0x25a')][_0x4036('0x2c6')]()[_0x4036('0x330')](),this['_battleLayoutStyle'];},VisuMZ['BattleCore'][_0x4036('0x527')]=Scene_Battle[_0x4036('0x24d')][_0x4036('0xc6')],Scene_Battle[_0x4036('0x24d')][_0x4036('0xc6')]=function(){const _0x345cd6=this[_0x4036('0x203')]();switch(_0x345cd6){case'list':return this['calcWindowHeight'](Math[_0x4036('0x577')](0x1,$gameParty[_0x4036('0x331')]()),!![]);break;default:return VisuMZ[_0x4036('0x600')]['Scene_Battle_windowAreaHeight'][_0x4036('0x286')](this);break;}},VisuMZ['BattleCore']['Scene_Battle_helpWindowRect']=Scene_Battle[_0x4036('0x24d')][_0x4036('0x5e2')],Scene_Battle[_0x4036('0x24d')][_0x4036('0x5e2')]=function(){const _0x173a1f=this[_0x4036('0x203')]();switch(_0x173a1f){case _0x4036('0x516'):return this[_0x4036('0x11e')]();break;case _0x4036('0x6e3'):case _0x4036('0x57a'):case'xp':case _0x4036('0x6b4'):default:return VisuMZ[_0x4036('0x600')][_0x4036('0x7a7')][_0x4036('0x286')](this);break;}},Scene_Battle[_0x4036('0x24d')][_0x4036('0x739')]=function(){const _0x29e65d=this[_0x4036('0x203')]();switch(_0x29e65d){case'xp':case _0x4036('0x6b4'):return this[_0x4036('0x200')]();break;case _0x4036('0x516'):return this[_0x4036('0xe1')]();break;case _0x4036('0x6e3'):case _0x4036('0x57a'):default:return this[_0x4036('0x775')]();break;}},VisuMZ[_0x4036('0x600')][_0x4036('0x709')]=Scene_Battle[_0x4036('0x24d')][_0x4036('0x703')],Scene_Battle[_0x4036('0x24d')][_0x4036('0x703')]=function(){const _0x9c3edb=this[_0x4036('0x203')]();switch(_0x9c3edb){case'xp':case _0x4036('0x6b4'):return this[_0x4036('0x1b1')]();break;case'border':return this['partyCommandWindowRectBorderStyle']();case'default':case _0x4036('0x57a'):default:return VisuMZ[_0x4036('0x600')][_0x4036('0x709')][_0x4036('0x286')](this);break;}},VisuMZ[_0x4036('0x600')][_0x4036('0x2dc')]=Scene_Battle['prototype'][_0x4036('0x6ae')],Scene_Battle[_0x4036('0x24d')][_0x4036('0x6ae')]=function(){const _0x280825=this[_0x4036('0x203')]();switch(_0x280825){case'xp':case'portrait':case'border':break;case _0x4036('0x6e3'):case _0x4036('0x57a'):default:VisuMZ['BattleCore'][_0x4036('0x2dc')]['call'](this);break;}},VisuMZ['BattleCore']['Scene_Battle_startActorSelection']=Scene_Battle[_0x4036('0x24d')][_0x4036('0x67e')],Scene_Battle[_0x4036('0x24d')][_0x4036('0x67e')]=function(){VisuMZ[_0x4036('0x600')][_0x4036('0x6a')][_0x4036('0x286')](this),this[_0x4036('0x544')]();},VisuMZ[_0x4036('0x600')][_0x4036('0x6a9')]=Scene_Battle[_0x4036('0x24d')][_0x4036('0xe')],Scene_Battle[_0x4036('0x24d')][_0x4036('0xe')]=function(){VisuMZ[_0x4036('0x600')][_0x4036('0x6a9')][_0x4036('0x286')](this),this[_0x4036('0x343')][_0x4036('0x475')](),this['makeTargetSelectionMoreVisible']();},Scene_Battle[_0x4036('0x24d')][_0x4036('0x544')]=function(){const _0x157331=this['battleLayoutStyle']();['xp',_0x4036('0x6b4'),_0x4036('0x516')][_0x4036('0x747')](_0x157331)&&this[_0x4036('0x810')][_0x4036('0x10c')](),(_0x157331===_0x4036('0x516')||this[_0x4036('0x176')]())&&(this[_0x4036('0x538')][_0x4036('0x10c')](),this[_0x4036('0x1c8')][_0x4036('0x10c')]());},VisuMZ[_0x4036('0x600')][_0x4036('0x3d5')]=Scene_Battle[_0x4036('0x24d')][_0x4036('0x2a4')],Scene_Battle[_0x4036('0x24d')]['onActorOk']=function(){VisuMZ[_0x4036('0x600')][_0x4036('0x3d5')]['call'](this),this[_0x4036('0x45d')]();},VisuMZ[_0x4036('0x600')][_0x4036('0x778')]=Scene_Battle[_0x4036('0x24d')][_0x4036('0x3ef')],Scene_Battle['prototype'][_0x4036('0x3ef')]=function(){if(this[_0x4036('0x810')][_0x4036('0x210')]()===_0x4036('0x226'))this[_0x4036('0x1ac')][_0x4036('0x297')](),this[_0x4036('0x810')][_0x4036('0x19f')]();else{if(_0x4036('0x33e')!==_0x4036('0x53c'))VisuMZ[_0x4036('0x600')][_0x4036('0x778')][_0x4036('0x286')](this);else{function _0xa9f70c(){return _0x454e9c[_0x4036('0x600')][_0x4036('0x336')][_0x4036('0x286')](this);;}}}this[_0x4036('0x5aa')]();},VisuMZ[_0x4036('0x600')][_0x4036('0x5ff')]=Scene_Battle[_0x4036('0x24d')][_0x4036('0x1d2')],Scene_Battle[_0x4036('0x24d')][_0x4036('0x1d2')]=function(){VisuMZ[_0x4036('0x600')][_0x4036('0x5ff')][_0x4036('0x286')](this),this[_0x4036('0x45d')]();},VisuMZ[_0x4036('0x600')][_0x4036('0x77c')]=Scene_Battle[_0x4036('0x24d')][_0x4036('0x7c6')],Scene_Battle[_0x4036('0x24d')][_0x4036('0x7c6')]=function(){if(this['_actorCommandWindow'][_0x4036('0x210')]()===_0x4036('0x226')){if('NDlHT'===_0x4036('0x44e')){function _0x5d53b9(){if(this[_0x4036('0x681')][_0x4036('0x22b')]!==_0xbfd996)return this[_0x4036('0x681')]['svShadow'];if(this[_0x4036('0x529')]()[_0x4036('0x826')][_0x4036('0x161')](/<SIDEVIEW SHOW SHADOW>/i))this[_0x4036('0x681')][_0x4036('0x22b')]=!![];else this['actor']()[_0x4036('0x826')][_0x4036('0x161')](/<SIDEVIEW HIDE SHADOW>/i)?this['_cache'][_0x4036('0x22b')]=![]:this[_0x4036('0x681')][_0x4036('0x22b')]=_0x247fb1[_0x4036('0x24d')]['svBattlerShadowVisible'][_0x4036('0x286')](this);return this[_0x4036('0x681')][_0x4036('0x22b')];}}else this[_0x4036('0x1ac')][_0x4036('0x297')](),this[_0x4036('0x810')]['activate']();}else VisuMZ[_0x4036('0x600')][_0x4036('0x77c')][_0x4036('0x286')](this);this[_0x4036('0x5aa')]();},Scene_Battle[_0x4036('0x24d')][_0x4036('0x45d')]=function(){const _0x170763=this[_0x4036('0x203')]();if(_0x170763===_0x4036('0x516')||this[_0x4036('0x176')]()){if(_0x4036('0x418')!==_0x4036('0x3f6')){this[_0x4036('0x538')][_0x4036('0x2f4')]();if(this[_0x4036('0x538')][_0x4036('0x2fc')]){if('fLsGJ'!==_0x4036('0xcf'))this['_skillWindow'][_0x4036('0x297')]();else{function _0x55acdf(){return!![];}}}this[_0x4036('0x1c8')][_0x4036('0x2f4')]();if(this['_itemWindow'][_0x4036('0x2fc')]){if(_0x4036('0x3a')===_0x4036('0x3a'))this[_0x4036('0x1c8')][_0x4036('0x297')]();else{function _0x15aa34(){this[_0x4036('0x811')]={},this['_regionBattleback2']={};if(!_0x2cdda3)return;const _0x2f5d7c=_0x4017f7[_0x4036('0x826')];if(!_0x2f5d7c)return;const _0x594e99=_0x2f5d7c['match'](/<REGION (\d+) BATTLEBACK(\d+): (.*)>/gi);if(_0x594e99)for(const _0x11770e of _0x594e99){_0x11770e['match'](/<REGION (\d+) BATTLEBACK(\d+): (.*)>/i);const _0x15b503=_0x390f1b(_0x23ae96['$1']),_0x266bf3=_0x2e4e8f(_0x531d48['$2']),_0x2cc302=_0x266bf3===0x1?this[_0x4036('0x811')]:this[_0x4036('0x2e4')],_0x3d1baf=_0x53b048(_0x25e5d6['$3']);_0x2cc302[_0x15b503]=_0x3d1baf;}}}}}else{function _0x528bd3(){if(this[_0x4036('0x438')]<=0x0)return;const _0x5f10be=this[_0x4036('0x438')],_0x25e580=this['_angleWholeDuration'],_0x22a813=this[_0x4036('0x543')];_0x55b23d['VisuMZ_0_CoreEngine']?this['_currentAngle']=this['applyEasing'](this[_0x4036('0x5b8')],this['_targetAngle'],_0x5f10be,_0x25e580,_0x22a813):this[_0x4036('0x5b8')]=(this[_0x4036('0x5b8')]*(_0x5f10be-0x1)+this['_targetAngle'])/_0x5f10be;this['_angleDuration']--;if(this['_angleDuration']<=0x0)this['onAngleEnd']();}}}},Scene_Battle['prototype'][_0x4036('0x5aa')]=function(){const _0x48f607=this[_0x4036('0x203')]();if(['xp',_0x4036('0x6b4'),'border'][_0x4036('0x747')](_0x48f607)){if(_0x4036('0x69f')===_0x4036('0x69f'))this[_0x4036('0x810')][_0x4036('0x2f4')]();else{function _0x1871cc(){if(this[_0x4036('0x681')][_0x4036('0x1f6')]!==_0x5afc27)return this[_0x4036('0x681')][_0x4036('0x1f6')];let _0x59276d=_0xcf7ab3['BattleCore']['Settings'][_0x4036('0x559')][_0x4036('0x48e')];const _0x57ca79=/<SOFT DAMAGE CAP:[ ]([\+\-]\d+)([%％])>/i,_0x1a5bf0=this[_0x4036('0x3af')]()[_0x4036('0x5a4')](_0x1edaf9=>_0x1edaf9&&_0x1edaf9[_0x4036('0x826')][_0x4036('0x161')](_0x57ca79)?_0xfd439d(_0x117c8f['$1'])/0x64:0x0);return _0x59276d=_0x1a5bf0[_0x4036('0x6d7')]((_0x3e0cc6,_0x5a5343)=>_0x3e0cc6+_0x5a5343,_0x59276d),this[_0x4036('0x681')][_0x4036('0x1f6')]=_0x59276d,this[_0x4036('0x681')]['softDamageCap'][_0x4036('0x4d6')](0.01,0x1);}}}this[_0x4036('0x45d')]();},Scene_Battle[_0x4036('0x24d')][_0x4036('0x775')]=function(){const _0x7efbcb=Window_BattleStatus[_0x4036('0x24d')]['extraHeight'](),_0x4fea5a=Graphics[_0x4036('0x316')]-0xc0,_0x564e12=this[_0x4036('0xc6')]()+_0x7efbcb,_0x19ac88=this[_0x4036('0x88')]()?0x0:Graphics[_0x4036('0x316')]-_0x4fea5a,_0x348e90=Graphics[_0x4036('0x4f6')]-_0x564e12+_0x7efbcb;return new Rectangle(_0x19ac88,_0x348e90,_0x4fea5a,_0x564e12);},Scene_Battle[_0x4036('0x24d')][_0x4036('0x200')]=function(){const _0x38b2cf=Window_BattleStatus[_0x4036('0x24d')]['extraHeight'](),_0x4937ee=Graphics[_0x4036('0x316')],_0x29a3d6=this[_0x4036('0xc6')]()+_0x38b2cf,_0x4600fb=0x0,_0x27e71f=Graphics[_0x4036('0x4f6')]-_0x29a3d6+_0x38b2cf;return new Rectangle(_0x4600fb,_0x27e71f,_0x4937ee,_0x29a3d6);},Scene_Battle[_0x4036('0x24d')][_0x4036('0x1b1')]=function(){const _0x52f1c5=Graphics[_0x4036('0x316')]/0x2,_0x523405=this[_0x4036('0x23')](VisuMZ[_0x4036('0x600')]['Settings'][_0x4036('0x650')][_0x4036('0x578')],!![]),_0x24c30d=Math[_0x4036('0x488')]((Graphics[_0x4036('0x316')]-_0x52f1c5)/0x2),_0x24087c=Graphics[_0x4036('0x4f6')]-_0x523405-this[_0x4036('0x200')]()[_0x4036('0x28f')];return new Rectangle(_0x24c30d,_0x24087c,_0x52f1c5,_0x523405);},Scene_Battle['prototype'][_0x4036('0x11e')]=function(){const _0x48e732=Graphics[_0x4036('0x42')],_0x4fbcd7=Math[_0x4036('0x488')]((Graphics[_0x4036('0x316')]-_0x48e732)/0x2),_0xb676e1=this['helpAreaHeight'](),_0x44759b=(Graphics[_0x4036('0x28f')]-Graphics[_0x4036('0x4f6')])/-0x2;return new Rectangle(_0x4fbcd7,_0x44759b,_0x48e732,_0xb676e1);},Scene_Battle['prototype'][_0x4036('0xe1')]=function(){const _0x2309dd=Graphics[_0x4036('0x42')],_0xb23c84=Math[_0x4036('0x488')]((Graphics[_0x4036('0x316')]-_0x2309dd)/0x2),_0x468b88=this[_0x4036('0x23')](0x4,!![]),_0x5bdd61=Graphics[_0x4036('0x4f6')]-_0x468b88+(Graphics[_0x4036('0x28f')]-Graphics['boxHeight'])/0x2;return new Rectangle(_0xb23c84,_0x5bdd61,_0x2309dd,_0x468b88);},Scene_Battle[_0x4036('0x24d')]['partyCommandWindowRectBorderStyle']=function(){const _0x4f15a6=Math[_0x4036('0x5bd')](Graphics['width']/0x3),_0x5f0a50=this[_0x4036('0x88')]()?(Graphics[_0x4036('0x42')]+Graphics[_0x4036('0x316')])/0x2-_0x4f15a6:(Graphics[_0x4036('0x42')]-Graphics['boxWidth'])/-0x2,_0x44155b=this['helpWindowRectBorderStyle'](),_0x547342=_0x44155b['y']+_0x44155b[_0x4036('0x28f')],_0x351364=this[_0x4036('0xe1')](),_0x159297=_0x351364['y']-_0x547342;return new Rectangle(_0x5f0a50,_0x547342,_0x4f15a6,_0x159297);},Scene_Battle['prototype'][_0x4036('0x46f')]=function(){const _0x3f07be=Math[_0x4036('0x33a')](Graphics[_0x4036('0x42')]/0x3),_0x419654=Math[_0x4036('0x488')]((Graphics[_0x4036('0x316')]-_0x3f07be)/0x2),_0x2b9d7b=this[_0x4036('0x724')](),_0x2bc038=_0x2b9d7b['y'],_0x56f011=_0x2b9d7b[_0x4036('0x28f')];return new Rectangle(_0x419654,_0x2bc038,_0x3f07be,_0x56f011);},Scene_Battle[_0x4036('0x24d')][_0x4036('0xdf')]=function(){this[_0x4036('0x20b')]['y']=this[_0x4036('0x11d')]['y']+this[_0x4036('0x11d')][_0x4036('0x28f')],this[_0x4036('0x88')]()?this[_0x4036('0x20b')]['x']=-this[_0x4036('0x20b')][_0x4036('0x42')]-0x4:this[_0x4036('0x20b')]['x']=Graphics[_0x4036('0x42')]-(Graphics[_0x4036('0x42')]-Graphics[_0x4036('0x316')])/0x2-this['_cancelButton'][_0x4036('0x42')]-0x4;},VisuMZ[_0x4036('0x600')][_0x4036('0x744')]=Scene_Battle[_0x4036('0x24d')][_0x4036('0x642')],Scene_Battle[_0x4036('0x24d')][_0x4036('0x642')]=function(){if(this[_0x4036('0x203')]()==='border')return this['skillItemWindowRectBorderStyle']();else{if(this['isSkillItemWindowsMiddle']())return this['skillItemWindowRectMiddle']();else{if(_0x4036('0x36')!==_0x4036('0x36')){function _0x3135f8(){if(!this[_0x4036('0x281')]())return;if(_0x22069d<=0x0)return;this[_0x4036('0xaf')]=_0x283cd3,this[_0x4036('0x61f')]=_0x3e5343,this[_0x4036('0x800')]=_0x57cc45;}}else return VisuMZ[_0x4036('0x600')][_0x4036('0x744')][_0x4036('0x286')](this);}}},VisuMZ[_0x4036('0x600')][_0x4036('0x27c')]=Scene_Battle[_0x4036('0x24d')][_0x4036('0x704')],Scene_Battle[_0x4036('0x24d')]['itemWindowRect']=function(){if(this[_0x4036('0x203')]()===_0x4036('0x516')){if(_0x4036('0xe6')===_0x4036('0xe6'))return this[_0x4036('0x46f')]();else{function _0x523b7c(){_0xc21ebf[_0x4036('0x24d')][_0x4036('0x80c')][_0x4036('0x286')](this),this['_enemy']=null,this['_appeared']=![],this[_0x4036('0x2cc')]='',this[_0x4036('0x5ab')]=0x0,this[_0x4036('0x4f3')]=null,this[_0x4036('0x89')]=0x0,this[_0x4036('0x40d')]=0x0,this[_0x4036('0x247')](),this[_0x4036('0x39a')]();}}}else return this[_0x4036('0x176')]()?this[_0x4036('0x78d')]():VisuMZ['BattleCore'][_0x4036('0x27c')][_0x4036('0x286')](this);},Scene_Battle[_0x4036('0x24d')][_0x4036('0x176')]=function(){return VisuMZ['BattleCore'][_0x4036('0x635')][_0x4036('0x650')][_0x4036('0x506')];},Scene_Battle[_0x4036('0x24d')][_0x4036('0x78d')]=function(){const _0x3e96d3=Sprite_Button[_0x4036('0x24d')][_0x4036('0x536')]()*0x2+0x4;let _0x309ed6=Graphics[_0x4036('0x316')]-_0x3e96d3;if(Imported[_0x4036('0x7b5')]&&SceneManager[_0x4036('0x533')]()){if(_0x4036('0x806')!==_0x4036('0x806')){function _0x3ead35(){_0x356630=_0x4fe53a;}}else _0x309ed6+=_0x3e96d3;}const _0x5ba95d=this[_0x4036('0x48b')](),_0x439396=Graphics[_0x4036('0x4f6')]-_0x5ba95d-this['statusWindowRect']()[_0x4036('0x28f')]+Window_BattleStatus[_0x4036('0x24d')][_0x4036('0x4ea')](),_0x2c39ba=0x0;return new Rectangle(_0x2c39ba,_0x5ba95d,_0x309ed6,_0x439396);},Scene_Battle[_0x4036('0x24d')][_0x4036('0x523')]=function(){this[_0x4036('0x54e')]=new Sprite(),this['_enemyNameContainer']['x']=this[_0x4036('0x1b9')]['x'],this[_0x4036('0x54e')]['y']=this[_0x4036('0x1b9')]['y'];const _0x4fce29=this[_0x4036('0x4ce')][_0x4036('0x419')](this[_0x4036('0x1b9')]);this[_0x4036('0x396')](this['_enemyNameContainer'],_0x4fce29);for(let _0x698e18=0x0;_0x698e18<0x8;_0x698e18++){const _0x3c6740=new Window_EnemyName(_0x698e18);this[_0x4036('0x54e')][_0x4036('0x356')](_0x3c6740);}},Sprite_Battler['_motionSpeed']=VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x43f')]['MotionSpeed'],VisuMZ['BattleCore'][_0x4036('0x745')]=Sprite_Battler[_0x4036('0x24d')][_0x4036('0x80c')],Sprite_Battler[_0x4036('0x24d')][_0x4036('0x80c')]=function(){VisuMZ[_0x4036('0x600')][_0x4036('0x745')][_0x4036('0x286')](this),this[_0x4036('0x625')]();if(this[_0x4036('0x6c8')]===Sprite_Enemy)this[_0x4036('0x2b8')]();this[_0x4036('0x16f')]();},Sprite_Battler[_0x4036('0x24d')][_0x4036('0x625')]=function(){this[_0x4036('0x7b6')]=0x0,this['_baseY']=0x0,this[_0x4036('0x338')]=0x0,this[_0x4036('0x1cd')]=0x0,this[_0x4036('0x444')]=0x0,this[_0x4036('0x3aa')]=0x0,this['_floatEasing']=_0x4036('0x167'),this[_0x4036('0x65c')]=0x0,this[_0x4036('0xaf')]=0x0,this[_0x4036('0x61f')]=0x0,this[_0x4036('0x800')]=0x0,this[_0x4036('0x7bb')]=0xff,this[_0x4036('0x6c')]=0x0,this[_0x4036('0x4b5')]=0x0,this[_0x4036('0x615')]=_0x4036('0x167'),this[_0x4036('0x5b8')]=0x0,this[_0x4036('0x59a')]=0x0,this[_0x4036('0x438')]=0x0,this[_0x4036('0x123')]=0x0,this[_0x4036('0x543')]='Linear',this[_0x4036('0x31d')]=0x0,this['_skewY']=0x0,this[_0x4036('0x788')]=0x0,this[_0x4036('0x580')]=0x0,this[_0x4036('0x3b7')]=0x0,this['_skewWholeDuration']=0x0,this[_0x4036('0x513')]=_0x4036('0x167'),this[_0x4036('0x632')]=0x1,this[_0x4036('0x253')]=0x1,this['_targetGrowX']=0x1,this['_targetGrowY']=0x1,this[_0x4036('0x29a')]=0x0,this[_0x4036('0x6be')]=0x0,this[_0x4036('0x50f')]='Linear',this[_0x4036('0x5f0')]=0x1;},Sprite_Battler[_0x4036('0x24d')][_0x4036('0x2b8')]=function(){this[_0x4036('0x791')]=new Sprite(),this[_0x4036('0x791')][_0x4036('0x76f')]=ImageManager[_0x4036('0x4ff')](_0x4036('0xbd')),this[_0x4036('0x791')][_0x4036('0x76f')][_0x4036('0xf5')]=VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x43f')][_0x4036('0x3e8')],this[_0x4036('0x791')]['anchor']['x']=0.5,this[_0x4036('0x791')][_0x4036('0x240')]['y']=0.5,this[_0x4036('0x791')]['y']=-0x2,this[_0x4036('0x791')][_0x4036('0x392')]=![],this[_0x4036('0x356')](this[_0x4036('0x791')]);},Sprite_Battler[_0x4036('0x24d')][_0x4036('0x16f')]=function(){this[_0x4036('0x312')]=new Sprite(),this[_0x4036('0x312')][_0x4036('0x240')]['x']=0.5,this[_0x4036('0x312')][_0x4036('0x240')]['y']=0.5,this[_0x4036('0x356')](this[_0x4036('0x312')]);},Sprite_Battler[_0x4036('0x24d')][_0x4036('0x3f9')]=function(){if(!this[_0x4036('0x312')])return;this[_0x4036('0x781')]&&this[_0x4036('0x312')][_0x4036('0x356')](this[_0x4036('0x781')]);if(this[_0x4036('0x3d9')]){if('wLZir'===_0x4036('0x612'))this['_distortionSprite'][_0x4036('0x356')](this['_weaponSprite']);else{function _0x3ca947(){return _0xf9f75a[_0x4036('0x600')][_0x4036('0x279')][_0x4036('0x286')](this,_0x3c033f);}}}this[_0x4036('0x80e')]&&this[_0x4036('0x312')][_0x4036('0x356')](this[_0x4036('0x80e')]);if(this[_0x4036('0x1d7')]){if(_0x4036('0x2ec')===_0x4036('0x401')){function _0x3f59dd(){return 0xa;}}else this[_0x4036('0x312')][_0x4036('0x356')](this[_0x4036('0x1d7')]);}},Sprite_Battler[_0x4036('0x24d')][_0x4036('0xda')]=function(){if(SceneManager[_0x4036('0x78a')]())return SceneManager[_0x4036('0x423')][_0x4036('0x5f8')]['_damageContainer'];else{if('QZIbi'!==_0x4036('0x682'))return this[_0x4036('0x7bc')];else{function _0x5755dd(){this['_mainSprite']&&this[_0x4036('0x80e')][_0x4036('0x4d1')](_0x134dce);}}}},Sprite_Battler['prototype']['setupTextPopup']=function(_0x565475,_0x16fdf1){if(!this['_battler'][_0x4036('0x706')]())return;const _0x225c43=VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x559')],_0x44bcf0=new Sprite_Damage();_0x44bcf0[_0x4036('0x22a')]=_0x225c43[_0x4036('0x581')],this[_0x4036('0x588')](_0x44bcf0),_0x44bcf0[_0x4036('0x5c6')](_0x565475,_0x16fdf1),this[_0x4036('0x1ee')](_0x44bcf0);},Sprite_Battler[_0x4036('0x24d')]['setupIconTextPopup']=function(_0x200108,_0x252e1f,_0x1e8e5a){if(!this[_0x4036('0x2c9')]['isSpriteVisible']())return;const _0x506ac2=VisuMZ['BattleCore'][_0x4036('0x635')][_0x4036('0x559')],_0x4f87b4=new Sprite_Damage();_0x4f87b4[_0x4036('0x22a')]=_0x506ac2[_0x4036('0x581')],this['sortDamageSprites'](_0x4f87b4),_0x4f87b4['setupIconTextPopup'](_0x200108,_0x252e1f,_0x1e8e5a),this[_0x4036('0x1ee')](_0x4f87b4);},Sprite_Battler[_0x4036('0x24d')][_0x4036('0x497')]=function(){if(!this['_battler'][_0x4036('0x700')]())return;while(this[_0x4036('0x2c9')][_0x4036('0x700')]()){this[_0x4036('0x2c9')][_0x4036('0x706')]()&&this[_0x4036('0x353')]();}this[_0x4036('0x2c9')]['clearDamagePopup'](),this[_0x4036('0x2c9')]['clearResult']();},Sprite_Battler[_0x4036('0x24d')][_0x4036('0x353')]=function(){const _0x323e28=VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x559')],_0x1b5474=new Sprite_Damage();_0x1b5474[_0x4036('0x22a')]=_0x323e28[_0x4036('0x581')],this[_0x4036('0x588')](_0x1b5474),_0x1b5474['setup'](this[_0x4036('0x2c9')]),_0x1b5474['setupBattleCore'](this[_0x4036('0x2c9')]),this[_0x4036('0x1ee')](_0x1b5474);},Sprite_Battler[_0x4036('0x24d')]['addDamageSprite']=function(_0x130235){this['_damages'][_0x4036('0x5d7')](_0x130235);if(this[_0x4036('0x350')]()){if(_0x4036('0x76a')!=='gzIXA')SceneManager['_scene']['_statusWindow'][_0x4036('0x1ee')](_0x130235,this[_0x4036('0x2c9')]);else{function _0x13ef0c(){this[_0x4036('0x55f')](),this[_0x4036('0x3d9')][_0x4036('0x699')](_0x2ac2e6),this[_0x4036('0x7a2')]['clearWeaponAnimation']();}}}else{this[_0x4036('0xda')]()[_0x4036('0x356')](_0x130235);if(SceneManager[_0x4036('0x6c0')]())_0x130235[_0x4036('0x325')]['x']=-0x1;}},Sprite_Battler[_0x4036('0x24d')][_0x4036('0x350')]=function(){return!$gameSystem['isSideView']()&&this[_0x4036('0x2c9')]&&this[_0x4036('0x2c9')][_0x4036('0x4a2')]()&&Window_BattleStatus[_0x4036('0x24d')]['battleLayoutStyle']()==='portrait';},Sprite_Battler[_0x4036('0x24d')][_0x4036('0x588')]=function(_0x24386a){const _0x29229f=VisuMZ[_0x4036('0x600')][_0x4036('0x635')]['Damage'],_0x53f0fa=SceneManager[_0x4036('0x6c0')]()?-0x1:0x1;let _0x326af0=this['x'],_0x487e19=this['y'];const _0x562dad=SceneManager[_0x4036('0x423')][_0x4036('0x1ac')];if(_0x562dad&&this[_0x4036('0x7bc')]===_0x562dad){_0x326af0+=_0x562dad['x']-this[_0x4036('0x61e')]();const _0x51d7b6=_0x562dad[_0x4036('0x2b4')]()*0x3/0x4;_0x487e19=_0x562dad['y']+_0x51d7b6,_0x487e19=Math[_0x4036('0x18c')](_0x487e19,_0x562dad['y']+this['y']-this[_0x4036('0x28f')]+_0x51d7b6);}_0x24386a['x']=Math[_0x4036('0x488')](_0x326af0+this[_0x4036('0x61e')]()*_0x53f0fa),_0x24386a['y']=Math[_0x4036('0x488')](_0x487e19+this[_0x4036('0x37f')]());if(_0x29229f[_0x4036('0x69')]){if(_0x4036('0x7f')!=='SCBfl')for(const _0x55d0c9 of this['_damages']){if('dTukG'===_0x4036('0x6ce'))_0x55d0c9['x']+=_0x29229f['PopupShiftX']*_0x53f0fa,_0x55d0c9['y']+=_0x29229f[_0x4036('0x42a')];else{function _0x28bd08(){this['_skillWindow'][_0x4036('0x10c')](),this[_0x4036('0x1c8')][_0x4036('0x10c')]();}}}else{function _0x210852(){return this[_0x4036('0x13a')]()[_0x4036('0x826')][_0x4036('0x161')](/<JS TARGETS>/i);}}}else{const _0x1efe90=this[_0x4036('0x71b')][this[_0x4036('0x71b')][_0x4036('0x6b5')]-0x1];if(_0x1efe90){if(_0x4036('0x3ec')===_0x4036('0x3ec'))_0x24386a['x']=_0x1efe90['x']+_0x29229f[_0x4036('0x834')]*_0x53f0fa,_0x24386a['y']=_0x1efe90['y']+_0x29229f[_0x4036('0x42a')];else{function _0x5d8237(){if(this[_0x4036('0x710')]()>=0x1)return!![];return this[_0x4036('0x671')]()[_0x4036('0x504')];}}}}},Sprite_Battler[_0x4036('0x24d')][_0x4036('0x43a')]=function(_0x34c1dd){this[_0x4036('0x350')]()?SceneManager[_0x4036('0x423')][_0x4036('0x1ac')][_0x4036('0x26c')](_0x34c1dd):(this[_0x4036('0xda')]()[_0x4036('0x147')](_0x34c1dd),this[_0x4036('0x71b')][_0x4036('0x2d8')](_0x34c1dd),_0x34c1dd['destroy']());},VisuMZ['BattleCore'][_0x4036('0x6fa')]=Sprite_Battler[_0x4036('0x24d')][_0x4036('0x528')],Sprite_Battler[_0x4036('0x24d')][_0x4036('0x528')]=function(_0x1a28d7,_0x48d674){if(!this[_0x4036('0x35e')]){if(_0x4036('0xe5')!==_0x4036('0xe5')){function _0x42760e(){if(_0x525482[_0x4036('0x826')][_0x4036('0x161')](/<DAMAGE STYLE:[ ](.*)>/i)){const _0x31d2ac=_0x1bfca9(_0x318729['$1'])[_0x4036('0x6bc')]()[_0x4036('0x330')]();if(_0x31d2ac===_0x4036('0x108'))return _0x4036('0x108');if(_0x13f985[_0x4036('0x3b')][_0x31d2ac])return _0x31d2ac;}const _0x31198b=_0x4f9393[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x559')][_0x4036('0x196')][_0x4036('0x6bc')]()[_0x4036('0x330')]();if(_0x5b5de9[_0x4036('0x3b')][_0x31198b])return _0x31198b;return'MANUAL';}}else{this[_0x4036('0x35e')]=!![];const _0x4ff310=VisuMZ[_0x4036('0x600')][_0x4036('0x635')];if(this['constructor']===Sprite_Actor){if('cWeuL'===_0x4036('0x606'))_0x1a28d7+=_0x4ff310[_0x4036('0x43f')][_0x4036('0x790')]||0x0,_0x48d674+=_0x4ff310[_0x4036('0x43f')][_0x4036('0x5a7')]||0x0;else{function _0x198ba3(){return _0x1f6d28[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x3e6')][_0x4036('0x3e8')];}}}else this[_0x4036('0x6c8')]===Sprite_Enemy&&(_0x1a28d7+=_0x4ff310[_0x4036('0x3e6')][_0x4036('0x790')]||0x0,_0x48d674+=_0x4ff310[_0x4036('0x3e6')]['OffsetY']||0x0);}}VisuMZ['BattleCore'][_0x4036('0x6fa')][_0x4036('0x286')](this,_0x1a28d7,_0x48d674);},VisuMZ[_0x4036('0x600')][_0x4036('0x498')]=Sprite_Battler['prototype'][_0x4036('0x467')],Sprite_Battler[_0x4036('0x24d')][_0x4036('0x467')]=function(){this[_0x4036('0x1bc')](),this[_0x4036('0x4a9')](),this[_0x4036('0x12e')](),this['updateFlip'](),this[_0x4036('0x61d')](),VisuMZ[_0x4036('0x600')][_0x4036('0x498')]['call'](this);if(this[_0x4036('0x6c8')]===Sprite_Enemy)this[_0x4036('0xd8')]();},VisuMZ[_0x4036('0x600')][_0x4036('0x3e2')]=Sprite_Battler[_0x4036('0x24d')][_0x4036('0x19a')],Sprite_Battler[_0x4036('0x24d')][_0x4036('0x19a')]=function(){VisuMZ[_0x4036('0x600')][_0x4036('0x3e2')][_0x4036('0x286')](this),this[_0x4036('0x4e')](),this[_0x4036('0x1f7')]();},Sprite_Battler[_0x4036('0x24d')][_0x4036('0x4e')]=function(){this[_0x4036('0x7b6')]=this['x'],this[_0x4036('0x311')]=this['y'],this[_0x4036('0x60e')](),this['updateJump'](),this['x']+=this[_0x4036('0x10a')](),this['y']+=this[_0x4036('0x43b')](),this['x']=Math['round'](this['x']),this['y']=Math[_0x4036('0x488')](this['y']);},Sprite_Battler[_0x4036('0x24d')][_0x4036('0x10a')]=function(){let _0x493a6e=0x0;return _0x493a6e;},Sprite_Battler[_0x4036('0x24d')][_0x4036('0x43b')]=function(){let _0x3d8795=0x0;_0x3d8795-=this[_0x4036('0x338')],_0x3d8795-=this[_0x4036('0x65c')];if(this['_distortionSprite']&&this[_0x4036('0x6c8')]!==Sprite_SvEnemy){if(_0x4036('0x777')!==_0x4036('0x28a')){const _0x2a93c4=this[_0x4036('0x312')][_0x4036('0x325')]['y'];_0x3d8795-=(_0x2a93c4-0x1)*this[_0x4036('0x28f')];}else{function _0x2cb645(){return _0x21a594[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x650')][_0x4036('0x4f4')];}}}return _0x3d8795;},Sprite_Battler[_0x4036('0x24d')][_0x4036('0x6f7')]=function(){const _0x5051b5=this['_battler']&&this[_0x4036('0x2c9')]['isBattlerFlipped']();this[_0x4036('0x5f0')]=(_0x5051b5?-0x1:0x1)*Math[_0x4036('0x38c')](this[_0x4036('0x325')]['x']);},Sprite_Battler[_0x4036('0x24d')][_0x4036('0x8c')]=function(_0x41b727,_0x4d8baa,_0x532b31){if(!this[_0x4036('0x281')]())return;if(this[_0x4036('0x1cd')]===_0x41b727)return;this[_0x4036('0x1cd')]=_0x41b727,this[_0x4036('0x444')]=_0x4d8baa,this[_0x4036('0x3aa')]=_0x4d8baa,this[_0x4036('0x832')]=_0x532b31||_0x4036('0x167');if(_0x4d8baa<=0x0)this[_0x4036('0x338')]=_0x41b727;},Sprite_Battler[_0x4036('0x24d')][_0x4036('0x60e')]=function(){if(this[_0x4036('0x444')]<=0x0)return;const _0x1a4e66=this[_0x4036('0x444')],_0x4b4777=this[_0x4036('0x3aa')],_0x35eb85=this[_0x4036('0x832')];if(Imported[_0x4036('0x7b5')]){if(_0x4036('0x664')!==_0x4036('0x644'))this[_0x4036('0x338')]=this[_0x4036('0x68')](this[_0x4036('0x338')],this[_0x4036('0x1cd')],_0x1a4e66,_0x4b4777,_0x35eb85);else{function _0x45fcc8(){this['_jumpHeight']=0x0;}}}else this[_0x4036('0x338')]=(this[_0x4036('0x338')]*(_0x1a4e66-0x1)+this[_0x4036('0x1cd')])/_0x1a4e66;this[_0x4036('0x444')]--;if(this[_0x4036('0x444')]<=0x0)this[_0x4036('0x1f0')]();},Sprite_Battler[_0x4036('0x24d')][_0x4036('0x1f0')]=function(){this[_0x4036('0x338')]=this[_0x4036('0x1cd')];},Sprite_Battler[_0x4036('0x24d')][_0x4036('0x21b')]=function(){return this[_0x4036('0x444')]>0x0;},Sprite_Battler[_0x4036('0x24d')][_0x4036('0x5cf')]=function(_0x97f692,_0x110c4d){if(!this[_0x4036('0x281')]())return;if(_0x110c4d<=0x0)return;this[_0x4036('0xaf')]=_0x97f692,this[_0x4036('0x61f')]=_0x110c4d,this['_jumpWholeDuration']=_0x110c4d;},Sprite_Battler[_0x4036('0x24d')][_0x4036('0x6c2')]=function(){if(this[_0x4036('0x61f')]<=0x0)return;const _0x55d896=this[_0x4036('0x800')]-this['_jumpDuration'],_0x2593cc=this[_0x4036('0x800')]/0x2,_0x2a0028=this[_0x4036('0xaf')],_0xf56064=-_0x2a0028/Math['pow'](_0x2593cc,0x2);this[_0x4036('0x65c')]=_0xf56064*Math['pow'](_0x55d896-_0x2593cc,0x2)+_0x2a0028,this[_0x4036('0x61f')]--;if(this[_0x4036('0x61f')]<=0x0)return this['onJumpEnd']();},Sprite_Battler[_0x4036('0x24d')][_0x4036('0xe4')]=function(){this['_jumpHeight']=0x0;},Sprite_Battler[_0x4036('0x24d')][_0x4036('0x2cf')]=function(){return this['_jumpDuration']>0x0;},Sprite_Battler[_0x4036('0x24d')]['startOpacity']=function(_0x1c6fa5,_0xc39f0e,_0x29516a){if(this[_0x4036('0x7bb')]===_0x1c6fa5)return;this[_0x4036('0x7bb')]=_0x1c6fa5,this[_0x4036('0x6c')]=_0xc39f0e,this['_opacityWholeDuration']=_0xc39f0e,this[_0x4036('0x615')]=_0x29516a||_0x4036('0x167');if(_0xc39f0e<=0x0)this[_0x4036('0x57b')]=_0x1c6fa5;},Sprite_Battler[_0x4036('0x24d')][_0x4036('0x1f7')]=function(){if(this[_0x4036('0x6c')]<=0x0)return;const _0x2fecad=this[_0x4036('0x6c')],_0x2365e8=this[_0x4036('0x4b5')],_0x3d0d8b=this[_0x4036('0x615')];if(Imported[_0x4036('0x7b5')]){if(_0x4036('0x23c')!==_0x4036('0x23c')){function _0x9c75f2(){_0xb12552[_0x4036('0x600')][_0x4036('0x7a8')][_0x4036('0x286')](this),this[_0x4036('0x216')]();}}else this[_0x4036('0x57b')]=this[_0x4036('0x68')](this[_0x4036('0x57b')],this[_0x4036('0x7bb')],_0x2fecad,_0x2365e8,_0x3d0d8b);}else this[_0x4036('0x57b')]=(this['opacity']*(_0x2fecad-0x1)+this[_0x4036('0x7bb')])/_0x2fecad;this[_0x4036('0x6c')]--;if(this['_opacityDuration']<=0x0)this['onOpacityEnd']();},Sprite_Battler[_0x4036('0x24d')][_0x4036('0xce')]=function(){this['opacity']=this[_0x4036('0x7bb')];},Sprite_Battler[_0x4036('0x24d')][_0x4036('0x754')]=function(){return this[_0x4036('0x6c')]>0x0;},Sprite_Battler[_0x4036('0x24d')][_0x4036('0xd8')]=function(){this[_0x4036('0x791')][_0x4036('0x392')]=this[_0x4036('0x2c9')][_0x4036('0x649')](),this[_0x4036('0x569')]();},Sprite_Battler[_0x4036('0x24d')]['updateShadowPosition']=function(){if(!this[_0x4036('0x791')])return;this[_0x4036('0x791')]['y']=-this[_0x4036('0x43b')]()-0x2;},Sprite_Battler[_0x4036('0x24d')]['updateScale']=function(){if(this[_0x4036('0x6c8')]===Sprite_SvEnemy)return;this[_0x4036('0x52f')](),this[_0x4036('0x535')]();},Sprite_Battler['prototype']['finalizeScale']=function(){const _0x258407=this['_distortionSprite'];_0x258407&&(_0x258407[_0x4036('0x325')]['x']=this[_0x4036('0x6e2')](),_0x258407[_0x4036('0x325')]['y']=this[_0x4036('0x81b')]());},Sprite_Battler[_0x4036('0x24d')][_0x4036('0x6e2')]=function(){let _0x38a7f2=0x1;return _0x38a7f2*=this['_flipScaleX'],_0x38a7f2*=this['_growX'],_0x38a7f2;},Sprite_Battler['prototype'][_0x4036('0x81b')]=function(){return 0x1*this[_0x4036('0x253')];},Sprite_Battler[_0x4036('0x24d')][_0x4036('0x21c')]=function(){return this[_0x4036('0x42')]*this[_0x4036('0x6e2')]();},Sprite_Battler[_0x4036('0x24d')][_0x4036('0x290')]=function(){return this['height']*this[_0x4036('0x81b')]();},Sprite_Battler[_0x4036('0x24d')][_0x4036('0x5e')]=function(_0x5f3689,_0x522dc8,_0x186d0a,_0x80ca9d){if(!this[_0x4036('0x281')]())return;if(!this[_0x4036('0x312')])return;if(this[_0x4036('0x61a')]===_0x5f3689&&this[_0x4036('0x472')]===_0x522dc8)return;this['_targetGrowX']=_0x5f3689,this[_0x4036('0x472')]=_0x522dc8,this['_growDuration']=_0x186d0a,this[_0x4036('0x6be')]=_0x186d0a,this[_0x4036('0x50f')]=_0x80ca9d||_0x4036('0x167'),_0x186d0a<=0x0&&(this[_0x4036('0x632')]=this['_targetGrowX'],this['_growY']=this[_0x4036('0x472')]);},Sprite_Battler[_0x4036('0x24d')][_0x4036('0x52f')]=function(){if(this[_0x4036('0x29a')]<=0x0)return;if(!this[_0x4036('0x312')])return;const _0x2644e1=this['_growDuration'],_0x472d16=this[_0x4036('0x6be')],_0x1d838c=this[_0x4036('0x50f')];if(Imported[_0x4036('0x7b5')])this[_0x4036('0x632')]=this[_0x4036('0x68')](this[_0x4036('0x632')],this[_0x4036('0x61a')],_0x2644e1,_0x472d16,_0x1d838c),this[_0x4036('0x253')]=this[_0x4036('0x68')](this[_0x4036('0x253')],this[_0x4036('0x472')],_0x2644e1,_0x472d16,_0x1d838c);else{if(_0x4036('0x13e')!==_0x4036('0x187'))this['_growX']=(this[_0x4036('0x632')]*(_0x2644e1-0x1)+this[_0x4036('0x61a')])/_0x2644e1,this[_0x4036('0x253')]=(this[_0x4036('0x253')]*(_0x2644e1-0x1)+this[_0x4036('0x472')])/_0x2644e1;else{function _0x57bceb(){if(!_0x535593)return;if(!this[_0x4036('0x193')])return;if(_0x5683dd[_0x4036('0x4a2')]()){}else{if(_0xf74e7d[_0x4036('0x68c')]()){if(this[_0x4036('0x6c8')]===_0x1c005e&&!_0x2a1be3[_0x4036('0x649')]())return;}}this[_0x4036('0x193')][_0x4036('0x699')](_0x47217c,'hp');}}}this['_growDuration']--;if(this['_growDuration']<=0x0)this[_0x4036('0x38b')]();},Sprite_Battler[_0x4036('0x24d')][_0x4036('0x38b')]=function(){this[_0x4036('0x632')]=this[_0x4036('0x61a')],this[_0x4036('0x253')]=this[_0x4036('0x472')];},Sprite_Battler['prototype'][_0x4036('0x14c')]=function(){return this[_0x4036('0x29a')]>0x0;},Sprite_Battler[_0x4036('0x24d')][_0x4036('0x59')]=function(_0x43e54f,_0x3a7586,_0x20b2b1,_0x2c3471){if(!this[_0x4036('0x281')]())return;if(!this[_0x4036('0x312')])return;if(this[_0x4036('0x788')]===_0x43e54f&&this[_0x4036('0x580')]===_0x3a7586)return;this[_0x4036('0x788')]=_0x43e54f,this[_0x4036('0x580')]=_0x3a7586,this[_0x4036('0x3b7')]=_0x20b2b1,this[_0x4036('0x34a')]=_0x20b2b1,this[_0x4036('0x513')]=_0x2c3471||'Linear',_0x20b2b1<=0x0&&(this[_0x4036('0x312')][_0x4036('0x319')]['x']=this[_0x4036('0x788')],this[_0x4036('0x312')][_0x4036('0x319')]['y']=this['_targetSkewY']);},Sprite_Battler[_0x4036('0x24d')][_0x4036('0x4a9')]=function(){if(this[_0x4036('0x3b7')]<=0x0)return;if(!this[_0x4036('0x312')])return;const _0x1dc6f9=this[_0x4036('0x3b7')],_0x4d0097=this[_0x4036('0x34a')],_0xf2e420=this[_0x4036('0x513')],_0x2c6f17=this['_distortionSprite'];if(Imported[_0x4036('0x7b5')])_0x2c6f17[_0x4036('0x319')]['x']=this[_0x4036('0x68')](_0x2c6f17[_0x4036('0x319')]['x'],this[_0x4036('0x788')],_0x1dc6f9,_0x4d0097,_0xf2e420),_0x2c6f17[_0x4036('0x319')]['y']=this[_0x4036('0x68')](_0x2c6f17[_0x4036('0x319')]['y'],this['_targetSkewY'],_0x1dc6f9,_0x4d0097,_0xf2e420);else{if('yJjrF'===_0x4036('0x215'))_0x2c6f17[_0x4036('0x319')]['x']=(_0x2c6f17[_0x4036('0x319')]['x']*(_0x1dc6f9-0x1)+this[_0x4036('0x788')])/_0x1dc6f9,_0x2c6f17[_0x4036('0x319')]['y']=(_0x2c6f17[_0x4036('0x319')]['y']*(_0x1dc6f9-0x1)+this[_0x4036('0x580')])/_0x1dc6f9;else{function _0x3a77b6(){if(this[_0x4036('0x681')][_0x4036('0x586')]!==_0xffdd65)return this[_0x4036('0x681')]['svAnchorY'];return this[_0x4036('0x529')]()['note']['match'](/<SIDEVIEW ANCHOR: (.*), (.*)>/i)?(this[_0x4036('0x681')][_0x4036('0x546')]=_0x5f58b(_0x3d2845['$1']),this[_0x4036('0x681')][_0x4036('0x586')]=_0x195180(_0x31e6cd['$2'])):this[_0x4036('0x681')][_0x4036('0x586')]=_0xc9acac[_0x4036('0x24d')][_0x4036('0x24c')][_0x4036('0x286')](this),this['_cache'][_0x4036('0x586')];}}}this[_0x4036('0x3b7')]--;if(this[_0x4036('0x3b7')]<=0x0)this[_0x4036('0x5a6')]();},Sprite_Battler[_0x4036('0x24d')][_0x4036('0x5a6')]=function(){this[_0x4036('0x312')][_0x4036('0x319')]['x']=this[_0x4036('0x788')],this[_0x4036('0x312')]['skew']['y']=this['_targetSkewY'];},Sprite_Battler[_0x4036('0x24d')]['isSkewing']=function(){return this[_0x4036('0x3b7')]>0x0;},Sprite_Battler['prototype']['startSpin']=function(_0x5cbd3c,_0x5ddde7,_0x4e55c5){if(!this['canMove']())return;if(!this['_distortionSprite'])return;if(this[_0x4036('0x59a')]===_0x5cbd3c)return;this[_0x4036('0x59a')]=_0x5cbd3c,this[_0x4036('0x438')]=_0x5ddde7,this[_0x4036('0x123')]=_0x5ddde7,this[_0x4036('0x543')]=_0x4e55c5||'Linear';if(_0x5ddde7<=0x0)this[_0x4036('0x5b8')]=_0x5cbd3c;},Sprite_Battler[_0x4036('0x24d')][_0x4036('0x12e')]=function(){this[_0x4036('0x547')](),this[_0x4036('0x24f')]();},Sprite_Battler[_0x4036('0x24d')][_0x4036('0x547')]=function(){if(this[_0x4036('0x438')]<=0x0)return;const _0xb23ec5=this[_0x4036('0x438')],_0x214615=this[_0x4036('0x123')],_0x4016a8=this[_0x4036('0x543')];Imported[_0x4036('0x7b5')]?this[_0x4036('0x5b8')]=this[_0x4036('0x68')](this['_currentAngle'],this['_targetAngle'],_0xb23ec5,_0x214615,_0x4016a8):this[_0x4036('0x5b8')]=(this[_0x4036('0x5b8')]*(_0xb23ec5-0x1)+this[_0x4036('0x59a')])/_0xb23ec5;this['_angleDuration']--;if(this[_0x4036('0x438')]<=0x0)this['onAngleEnd']();},Sprite_Battler[_0x4036('0x24d')][_0x4036('0x1e1')]=function(){this['_currentAngle']=this[_0x4036('0x59a')];},Sprite_Battler['prototype']['isSpinning']=function(){return this[_0x4036('0x438')]>0x0;},Sprite_Battler['prototype'][_0x4036('0x24f')]=function(){if(!this[_0x4036('0x312')])return;const _0x18a390=this[_0x4036('0x5b8')],_0x3691f6=this[_0x4036('0x325')]['x'],_0x435480=this[_0x4036('0x2c9')][_0x4036('0x4a2')]()?-0x1:0x1;this[_0x4036('0x312')][_0x4036('0x509')]=_0x18a390*_0x3691f6*_0x435480;const _0x15e9f5=this[_0x4036('0x312')][_0x4036('0x325')]['y'];this[_0x4036('0x312')]['y']=this[_0x4036('0x28f')]*-0.5*(0x2-_0x15e9f5);const _0xf7629d=[this[_0x4036('0x80e')],this[_0x4036('0x781')],this[_0x4036('0x1d7')]];for(const _0x5b49ba of _0xf7629d){if(_0x4036('0x7fe')===_0x4036('0x7fe')){if(!_0x5b49ba)continue;_0x5b49ba['y']=this[_0x4036('0x28f')]*0.5;}else{function _0x5cf19e(){this[_0x4036('0x359')]=new _0x348871();for(let _0x36e96d=0x0;_0x36e96d<0x9;_0x36e96d++){this['_cursorSprite']['addChild'](new _0x53773c());}this[_0x4036('0x12b')][_0x4036('0x356')](this[_0x4036('0x359')]);}}}this[_0x4036('0x791')]&&(this[_0x4036('0x791')]['scale']['x']=this['_distortionSprite'][_0x4036('0x325')]['x'],this[_0x4036('0x791')][_0x4036('0x325')]['y']=this[_0x4036('0x312')][_0x4036('0x325')]['y']);},VisuMZ[_0x4036('0x600')][_0x4036('0x3f7')]=Sprite_Actor['prototype'][_0x4036('0x7cb')],Sprite_Actor[_0x4036('0x24d')][_0x4036('0x7cb')]=function(){VisuMZ[_0x4036('0x600')][_0x4036('0x3f7')][_0x4036('0x286')](this);if(VisuMZ[_0x4036('0x600')][_0x4036('0x635')]['HpGauge'][_0x4036('0x3f3')]){if(_0x4036('0x808')==='vphry')this[_0x4036('0x428')]();else{function _0x523acd(){return _0x4036('0x6f9')[_0x4036('0x4d2')](_0x37b476(_0x8dd48b['$1']));}}}},VisuMZ[_0x4036('0x600')]['Sprite_Enemy_createStateIconSprite']=Sprite_Enemy[_0x4036('0x24d')][_0x4036('0x39a')],Sprite_Enemy['prototype'][_0x4036('0x39a')]=function(){if(VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x7a1')][_0x4036('0x680')]){if(_0x4036('0x26e')===_0x4036('0x7e9')){function _0x1e2f6c(){return _0x282ec7[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x7e6')][_0x4036('0x301')];}}else this[_0x4036('0x428')]();}VisuMZ[_0x4036('0x600')][_0x4036('0x11a')][_0x4036('0x286')](this);},Sprite_Battler[_0x4036('0x24d')][_0x4036('0x428')]=function(){if(!ConfigManager[_0x4036('0x7e7')])return;if(this[_0x4036('0x6c8')]===Sprite_SvEnemy)return;const _0x18697a=VisuMZ[_0x4036('0x600')][_0x4036('0x635')]['HpGauge'],_0x4b8841=new Sprite_HpGauge();_0x4b8841[_0x4036('0x240')]['x']=_0x18697a[_0x4036('0x6c5')],_0x4b8841['anchor']['y']=_0x18697a['AnchorY'],_0x4b8841[_0x4036('0x325')]['x']=_0x4b8841['scale']['y']=_0x18697a[_0x4036('0x27a')],this['_hpGaugeSprite']=_0x4b8841,this['addChild'](this[_0x4036('0x193')]);},VisuMZ[_0x4036('0x600')][_0x4036('0x1ab')]=Sprite_Battler['prototype'][_0x4036('0x7ad')],Sprite_Battler[_0x4036('0x24d')][_0x4036('0x7ad')]=function(_0x3b62f2){VisuMZ['BattleCore'][_0x4036('0x1ab')][_0x4036('0x286')](this,_0x3b62f2),this[_0x4036('0x6bd')](_0x3b62f2);},Sprite_Battler[_0x4036('0x24d')]['setupHpGaugeSprite']=function(_0x4323c2){if(!_0x4323c2)return;if(!this[_0x4036('0x193')])return;if(_0x4323c2['isActor']()){}else{if(_0x4323c2['isEnemy']()){if('vnKMT'===_0x4036('0x5f1')){function _0x16b6d4(){_0x1aec4c[_0x4036('0x24d')]['activate'][_0x4036('0x286')](this);const _0x22f32d=this[_0x4036('0x203')]();_0x22f32d===_0x4036('0x516')&&this[_0x4036('0x68e')]();}}else{if(this[_0x4036('0x6c8')]===Sprite_SvEnemy&&!_0x4323c2[_0x4036('0x649')]())return;}}}this[_0x4036('0x193')][_0x4036('0x699')](_0x4323c2,'hp');},Sprite_Battler[_0x4036('0x24d')][_0x4036('0x61d')]=function(){if(!this['_battler'])return;if(!this[_0x4036('0x193')])return;const _0x130642=VisuMZ['BattleCore'][_0x4036('0x635')][_0x4036('0x7a1')],_0x295cfd=this[_0x4036('0x193')];_0x295cfd[_0x4036('0x392')]=this['isVisualHpGaugeDisplayed']();const _0x2a5eb0=_0x130642[_0x4036('0x790')],_0xcf3053=_0x130642[_0x4036('0x5a7')];_0x295cfd['x']=_0x2a5eb0,_0x295cfd['x']+=this['_battler'][_0x4036('0x801')](),_0x295cfd['y']=-this[_0x4036('0x28f')]+_0xcf3053,_0x295cfd['y']+=this[_0x4036('0x2c9')][_0x4036('0x2e7')]();},Sprite_Battler[_0x4036('0x24d')][_0x4036('0x526')]=function(){if(this[_0x4036('0x2c9')][_0x4036('0x4a2')]())return!![];const _0x486ef5=this[_0x4036('0x2c9')][_0x4036('0x819')]()[_0x4036('0x826')];if(_0x486ef5[_0x4036('0x161')](/<SHOW HP GAUGE>/i))return!![];if(_0x486ef5[_0x4036('0x161')](/<HIDE HP GAUGE>/i))return![];const _0x484538=VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x7a1')];if(_0x484538['RequiresDefeat']){if(_0x484538[_0x4036('0x740')]&&BattleManager[_0x4036('0x1c7')]())return!![];if(this[_0x4036('0x2c9')][_0x4036('0xa9')])return![];return this[_0x4036('0x2c9')][_0x4036('0x7b2')]();}return!![];},VisuMZ[_0x4036('0x600')]['Sprite_Battler_startMove']=Sprite_Battler['prototype'][_0x4036('0x64c')],Sprite_Battler['prototype'][_0x4036('0x64c')]=function(_0x3e2bee,_0x3aa4d6,_0x348404){this['canMove']()&&VisuMZ[_0x4036('0x600')][_0x4036('0x7f0')]['call'](this,_0x3e2bee,_0x3aa4d6,_0x348404);},Sprite_Battler[_0x4036('0x24d')][_0x4036('0x281')]=function(){if(this[_0x4036('0x2c9')]&&this['_battler'][_0x4036('0x416')]())return![];if(this[_0x4036('0x2c9')]&&!this[_0x4036('0x2c9')]['canBattlerMove']())return![];return $gameSystem['isSideView']();},Sprite_Battler[_0x4036('0x24d')][_0x4036('0x54d')]=function(){},Sprite_Battler[_0x4036('0x24d')][_0x4036('0x174')]=function(){this[_0x4036('0x64c')](0x0,0x0,0xc);},Sprite_Battler['prototype'][_0x4036('0xc0')]=function(){},Sprite_Battler[_0x4036('0x24d')]['stepFlinch']=function(){const _0x1a42da=VisuMZ[_0x4036('0x600')][_0x4036('0x635')]['Actor'],_0x491142=this[_0x4036('0x2c9')]&&this['_battler']['isActor']()?0x1:-0x1,_0x3e9938=this[_0x4036('0x7b6')]-this[_0x4036('0x13b')]+_0x491142*_0x1a42da['FlinchDistanceX'],_0x372248=this[_0x4036('0x311')]-this[_0x4036('0x47d')]+_0x491142*_0x1a42da[_0x4036('0xc5')],_0x14ab40=_0x1a42da['FlinchDuration'];this['startMove'](_0x3e9938,_0x372248,_0x14ab40);},VisuMZ[_0x4036('0x600')][_0x4036('0xbe')]=Sprite_Actor['prototype'][_0x4036('0x80c')],Sprite_Actor[_0x4036('0x24d')][_0x4036('0x80c')]=function(){VisuMZ['BattleCore'][_0x4036('0xbe')][_0x4036('0x286')](this),this[_0x4036('0x3f9')]();},VisuMZ[_0x4036('0x600')][_0x4036('0xd9')]=Sprite_Actor[_0x4036('0x24d')][_0x4036('0xd3')],Sprite_Actor[_0x4036('0x24d')][_0x4036('0xd3')]=function(){if(SceneManager[_0x4036('0x3a7')]())return;VisuMZ[_0x4036('0x600')][_0x4036('0xd9')][_0x4036('0x286')](this);},VisuMZ[_0x4036('0x600')][_0x4036('0x542')]=Sprite_Actor[_0x4036('0x24d')][_0x4036('0x11b')],Sprite_Actor[_0x4036('0x24d')][_0x4036('0x11b')]=function(_0x5ad8ad){if(VisuMZ[_0x4036('0x600')][_0x4036('0x635')]['Actor'][_0x4036('0x59e')])VisuMZ['BattleCore'][_0x4036('0x635')]['Actor']['HomePosJS'][_0x4036('0x286')](this,_0x5ad8ad);else{if(_0x4036('0x36c')!==_0x4036('0x36c')){function _0x3837f9(){const _0x5ee25c=_0x20e9dd[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x74c')],_0x402c95=_0x5ee25c[_0x4036('0x4a8')],_0x42e5ca=_0x5ee25c[_0x4036('0x510')],_0x51610a=_0x5ee25c[_0x4036('0x5a0')];this[_0x4036('0x64c')](-_0x402c95,-_0x42e5ca,_0x51610a);}}else VisuMZ['BattleCore'][_0x4036('0x542')]['call'](this,_0x5ad8ad);}},VisuMZ[_0x4036('0x600')][_0x4036('0x6e')]=Sprite_Actor[_0x4036('0x24d')][_0x4036('0x7ad')],Sprite_Actor[_0x4036('0x24d')][_0x4036('0x7ad')]=function(_0x4b8316){VisuMZ[_0x4036('0x600')][_0x4036('0x6e')][_0x4036('0x286')](this,_0x4b8316),this[_0x4036('0x3a6')](_0x4b8316);},Sprite_Actor[_0x4036('0x24d')][_0x4036('0x3a6')]=function(_0x1c1df8){if(!_0x1c1df8)return;if(!this[_0x4036('0x80e')])return;this[_0x4036('0x80e')][_0x4036('0x240')]['x']=this[_0x4036('0x7a2')][_0x4036('0x6d3')](),this[_0x4036('0x80e')][_0x4036('0x240')]['y']=this[_0x4036('0x7a2')][_0x4036('0x24c')]();if(!this['_shadowSprite'])return;if(this[_0x4036('0x7a2')]['svBattlerShadowVisible']()){const _0x5ef02e=this[_0x4036('0x791')][_0x4036('0x76f')];this[_0x4036('0x791')]['setFrame'](0x0,0x0,_0x5ef02e[_0x4036('0x42')],_0x5ef02e[_0x4036('0x28f')]);}else this[_0x4036('0x791')][_0x4036('0x643')](0x0,0x0,0x0,0x0);},VisuMZ[_0x4036('0x600')][_0x4036('0x4aa')]=Sprite_Actor[_0x4036('0x24d')][_0x4036('0x209')],Sprite_Actor[_0x4036('0x24d')][_0x4036('0x209')]=function(){VisuMZ[_0x4036('0x600')][_0x4036('0x4aa')][_0x4036('0x286')](this),this[_0x4036('0x7a2')]&&(this['updateStateSprite'](),this['updateStyleOpacity']());},VisuMZ[_0x4036('0x600')]['Sprite_Actor_updateBitmap']=Sprite_Actor[_0x4036('0x24d')][_0x4036('0x6d8')],Sprite_Actor[_0x4036('0x24d')][_0x4036('0x6d8')]=function(){VisuMZ[_0x4036('0x600')][_0x4036('0x787')][_0x4036('0x286')](this),this[_0x4036('0x80e')]&&this[_0x4036('0x80e')][_0x4036('0x76f')]&&this[_0x4036('0x2c9')]&&(this[_0x4036('0x80e')]['bitmap'][_0x4036('0xf5')]=this[_0x4036('0x2c9')][_0x4036('0x274')]());},VisuMZ['BattleCore']['Sprite_Actor_updateShadow']=Sprite_Actor[_0x4036('0x24d')][_0x4036('0xd8')],Sprite_Actor[_0x4036('0x24d')][_0x4036('0xd8')]=function(){VisuMZ[_0x4036('0x600')]['Sprite_Actor_updateShadow'][_0x4036('0x286')](this),this[_0x4036('0x829')]();},Sprite_Actor[_0x4036('0x24d')]['updateShadowBattleCore']=function(){if(!this[_0x4036('0x80e')])return;this[_0x4036('0x569')]();if(this[_0x4036('0x7a2')]&&this[_0x4036('0x7a2')][_0x4036('0x9f')]()){if(_0x4036('0x549')!==_0x4036('0x549')){function _0x1fd5a9(){const _0x75ade4=_0x50bfbf[_0x4036('0x455')]();_0x75ade4['setSkill'](this[_0x4036('0x810')][_0x4036('0x620')]()),this[_0x4036('0x593')]();}}else{const _0x3666ac=this[_0x4036('0x791')]['bitmap'];this[_0x4036('0x791')][_0x4036('0x643')](0x0,0x0,_0x3666ac['width'],_0x3666ac[_0x4036('0x28f')]);}}else this[_0x4036('0x791')]['setFrame'](0x0,0x0,0x0,0x0);},Sprite_Actor[_0x4036('0x24d')][_0x4036('0x574')]=function(){this[_0x4036('0x602')][_0x4036('0x325')]['x']=0x1/(this[_0x4036('0x325')]['x']||0.001),this[_0x4036('0x602')][_0x4036('0x325')]['y']=0x1/(this[_0x4036('0x325')]['y']||0.001);},Sprite_Actor[_0x4036('0x24d')]['updateStyleOpacity']=function(){if(!$gameSystem[_0x4036('0x1c1')]()&&this['constructor']===Sprite_Actor){const _0x2a9a1e=Scene_Battle[_0x4036('0x24d')][_0x4036('0x203')]();if([_0x4036('0x6e3'),_0x4036('0x57a'),_0x4036('0x6b4'),_0x4036('0x516')]['includes'](_0x2a9a1e)){if(_0x4036('0x2fa')!==_0x4036('0x3e4'))this[_0x4036('0x57b')]=0x0;else{function _0xf9409a(){return _0x41ebb0[_0x4036('0x6a0')]()[_0x4036('0x3c4')](_0x47b4f4=>_0x47b4f4!==_0x452254);}}}}},Sprite_Actor[_0x4036('0x24d')][_0x4036('0x114')]=function(){const _0x18da75=this[_0x4036('0x7a2')];if(_0x18da75){const _0x23f5e5=_0x18da75[_0x4036('0x2ee')]();if(_0x18da75[_0x4036('0x5c5')]()||_0x18da75[_0x4036('0x473')]()){if(_0x4036('0x579')===_0x4036('0x479')){function _0x1f14c0(){if(!_0x5411dc['isSceneBattle']())return;const _0x337cd6=_0x542ed8[_0x4036('0x3b4')];_0x337cd6[_0x4036('0x78e')]();}}else this[_0x4036('0x7d4')](_0x4036('0x733'));}else{if(_0x23f5e5===0x3){if(_0x4036('0x12a')===_0x4036('0x5dc')){function _0x46cb32(){if(!_0x1399b2[_0x4036('0x78a')]())return![];if(!_0x205834)return![];if(!_0x1be198['item']())return![];if(_0x1a0a40[_0x4036('0x13a')]()[_0x4036('0x826')][_0x4036('0x161')](/<CUSTOM ACTION SEQUENCE>/i))return!![];return![];}}else this['startMotion']('dead');}else{if(_0x23f5e5===0x2)this[_0x4036('0x7d4')](_0x4036('0x7b8'));else{if(this[_0x4036('0x679')])this['startMotion'](_0x4036('0x13'));else{if(_0x18da75[_0x4036('0x212')]()){if(_0x4036('0x78f')===_0x4036('0x2d6')){function _0x594282(){this[_0x4036('0x2da')]=_0x4800d9['mpDamage']>=0x0?0x2:0x3,this['createDigits'](_0x3ae17a[_0x4036('0x3bc')]);}}else this[_0x4036('0x7d4')]('chant');}else{if(_0x18da75[_0x4036('0x1a0')]()||_0x18da75[_0x4036('0x3ac')]()){if(_0x4036('0x31')!=='gotzk'){function _0x11b3e4(){return _0x56e709[_0x4036('0x600')]['Window_ItemList_maxCols'][_0x4036('0x286')](this);}}else this[_0x4036('0x7d4')](_0x4036('0x342'));}else{if(_0x23f5e5===0x1){if(_0x4036('0x65a')!==_0x4036('0xa'))this['startMotion']('abnormal');else{function _0x49bfd2(){return!![];}}}else{if(_0x18da75[_0x4036('0x4f9')]())this[_0x4036('0x7d4')]('dying');else{if(_0x18da75[_0x4036('0x33b')]()){if(_0x4036('0x73f')===_0x4036('0x136')){function _0x38fde3(){this[_0x4036('0x712')]();}}else this[_0x4036('0x7d4')](_0x4036('0x733'));}else _0x18da75['currentAction']()?this[_0x4036('0x7d4')](_0x4036('0x712')):this['startMotion'](_0x4036('0x733'));}}}}}}}}}},Sprite_Actor[_0x4036('0x24d')]['onMoveEnd']=function(){Sprite_Battler[_0x4036('0x24d')]['onMoveEnd'][_0x4036('0x286')](this);},Sprite_Actor[_0x4036('0x24d')][_0x4036('0x67b')]=function(){return Sprite_Battler['_motionSpeed'];},Sprite_Weapon[_0x4036('0x24d')][_0x4036('0x69c')]=function(){return Sprite_Battler[_0x4036('0x4c6')];},Sprite_Actor['prototype'][_0x4036('0x2d')]=function(){},Sprite_Actor['prototype'][_0x4036('0x417')]=function(){},Sprite_Actor[_0x4036('0x24d')]['updateMotionCount']=function(){if(this[_0x4036('0x4de')]&&++this[_0x4036('0x20e')]>=this[_0x4036('0x67b')]()){if(this['_motion'][_0x4036('0x2f0')])this['_pattern']=(this[_0x4036('0x658')]+0x1)%0x4;else{if(this[_0x4036('0x658')]<0x2)this['_pattern']++;else{if(_0x4036('0x28e')!==_0x4036('0x28e')){function _0xb81686(){_0x42a5ca['BattleCore'][_0x4036('0x635')]['Actor'][_0x4036('0x59e')]?_0x382252[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x43f')][_0x4036('0x59e')][_0x4036('0x286')](this,_0x4d0966):_0x2132ba[_0x4036('0x600')][_0x4036('0x542')]['call'](this,_0x2fd93c);}}else this[_0x4036('0x114')]();}}this[_0x4036('0x20e')]=0x0;}},Sprite_Actor[_0x4036('0x24d')][_0x4036('0x482')]=function(_0x1f619e){if(_0x1f619e==='victory')this[_0x4036('0x2f7')]=!![];if(this['_battler']&&this['_battler'][_0x4036('0x416')]())return;const _0x21802a=Sprite_Actor[_0x4036('0x1d9')][_0x1f619e];this[_0x4036('0x4de')]=_0x21802a,this[_0x4036('0x20e')]=0x0,this['_pattern']=0x0;},Sprite_Actor[_0x4036('0x24d')][_0x4036('0x35d')]=function(_0x1fc4fc){this[_0x4036('0x55f')](),this['_weaponSprite'][_0x4036('0x699')](_0x1fc4fc),this[_0x4036('0x7a2')]['clearWeaponAnimation']();},Sprite_Actor[_0x4036('0x24d')][_0x4036('0x55f')]=function(){let _0x1813d0=-0x10,_0x1ff2d8=this[_0x4036('0x28f')]*0.5;const _0xa86b27=/<SIDEVIEW WEAPON OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i,_0x5f5508=this[_0x4036('0x2c9')][_0x4036('0x3af')]()[_0x4036('0x5a4')](_0x2046c5=>_0x2046c5&&_0x2046c5[_0x4036('0x826')]['match'](_0xa86b27)?Number(RegExp['$1']):0x0),_0x2a62b8=this[_0x4036('0x2c9')][_0x4036('0x3af')]()[_0x4036('0x5a4')](_0x38c9e8=>_0x38c9e8&&_0x38c9e8[_0x4036('0x826')][_0x4036('0x161')](_0xa86b27)?Number(RegExp['$2']):0x0);_0x1813d0=_0x5f5508[_0x4036('0x6d7')]((_0x1cd33d,_0x303483)=>_0x1cd33d+_0x303483,_0x1813d0),_0x1ff2d8=_0x2a62b8[_0x4036('0x6d7')]((_0x3c5b3a,_0x3d9bb3)=>_0x3c5b3a+_0x3d9bb3,_0x1ff2d8),this[_0x4036('0x3d9')]['x']=_0x1813d0,this['_weaponSprite']['y']=_0x1ff2d8,this['_weaponSprite'][_0x4036('0x209')]();},Sprite_Weapon[_0x4036('0x24d')]['setup']=function(_0x1689be){this[_0x4036('0x3a4')]=_0x1689be,this[_0x4036('0x437')]=-0x1,this[_0x4036('0x658')]=0x0,this[_0x4036('0x266')](),this[_0x4036('0x662')]();},Sprite_Actor[_0x4036('0x24d')][_0x4036('0x39b')]=function(){},Sprite_Actor[_0x4036('0x24d')][_0x4036('0x54d')]=function(){const _0x3237ee=VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x74c')],_0x4b3fe6=_0x3237ee[_0x4036('0x4a8')],_0x1fec32=_0x3237ee['StepDistanceY'],_0x300ca8=_0x3237ee[_0x4036('0x5a0')];this[_0x4036('0x64c')](-_0x4b3fe6,-_0x1fec32,_0x300ca8);},Sprite_Enemy[_0x4036('0x24d')][_0x4036('0x80c')]=function(){Sprite_Battler[_0x4036('0x24d')][_0x4036('0x80c')][_0x4036('0x286')](this),this[_0x4036('0xd0')]=null,this['_appeared']=![],this['_battlerName']='',this[_0x4036('0x5ab')]=0x0,this[_0x4036('0x4f3')]=null,this[_0x4036('0x89')]=0x0,this[_0x4036('0x40d')]=0x0,this[_0x4036('0x247')](),this[_0x4036('0x39a')]();},Sprite_Enemy['prototype'][_0x4036('0x247')]=function(){this['_mainSprite']=new Sprite(),this[_0x4036('0x80e')]['anchor']['x']=0.5,this[_0x4036('0x80e')][_0x4036('0x240')]['y']=0x1,this['addChild'](this['_mainSprite']),this[_0x4036('0x3f9')]();},Sprite_Enemy[_0x4036('0x24d')][_0x4036('0x57f')]=function(){return this[_0x4036('0x80e')]||this;},Sprite_Enemy[_0x4036('0x24d')]['loadBitmap']=function(_0x30a777){this[_0x4036('0x76f')]=new Bitmap(0x1,0x1);if($gameSystem[_0x4036('0x1c1')]())this[_0x4036('0x80e')][_0x4036('0x76f')]=ImageManager[_0x4036('0x1fa')](_0x30a777);else{if(_0x4036('0x6c6')===_0x4036('0x138')){function _0x244e15(){_0x4e4d6e[_0x4036('0xd4')][_0x4036('0x3c8')]=!![];}}else this['_mainSprite']['bitmap']=ImageManager[_0x4036('0x265')](_0x30a777);}this[_0x4036('0x80e')][_0x4036('0x76f')][_0x4036('0x3fc')](this[_0x4036('0x7b3')][_0x4036('0x1be')](this));},Sprite_Enemy[_0x4036('0x24d')][_0x4036('0x7b3')]=function(){const _0x195519=this[_0x4036('0x80e')][_0x4036('0x76f')];_0x195519&&(this['bitmap']=new Bitmap(_0x195519[_0x4036('0x42')],_0x195519[_0x4036('0x28f')]));},VisuMZ['BattleCore'][_0x4036('0x4a0')]=Sprite_Enemy[_0x4036('0x24d')][_0x4036('0x4d1')],Sprite_Enemy[_0x4036('0x24d')][_0x4036('0x4d1')]=function(_0x55a6e4){if(this[_0x4036('0x80e')]){if(_0x4036('0x382')===_0x4036('0x382'))this[_0x4036('0x80e')][_0x4036('0x4d1')](_0x55a6e4);else{function _0x4d782a(){const _0x1a864e=_0x16e847(_0x54e433['$1']);_0x1a864e!==_0x24c594[_0x2e4973][_0x4036('0x2fe')]&&(_0x4ac8da('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x4036('0x4d2')](_0x4d946f,_0x1a864e)),_0x17bc9a[_0x4036('0x599')]());}}}},VisuMZ['BattleCore']['Sprite_Enemy_initVisibility']=Sprite_Enemy[_0x4036('0x24d')][_0x4036('0x7cd')],Sprite_Enemy[_0x4036('0x24d')][_0x4036('0x7cd')]=function(){if(this[_0x4036('0x6ee')]()){if(_0x4036('0x101')==='BOGLY')VisuMZ[_0x4036('0x600')][_0x4036('0x5ba')][_0x4036('0x286')](this);else{function _0x2dd28f(){if(!this[_0x4036('0x26b')]())return;const _0x3c6160=this[_0x4036('0x663')](),_0x326c68=_0x5df08d[_0x4036('0x600')]['Settings'][_0x4036('0x20')][_0x4036('0x7fc')],_0x362cdc=_0x3c6160===_0x4036('0x45f')?_0x52a177[_0x4036('0x52d')]:_0x4036('0x7fa')['format'](_0x326c68,_0x17ecb0[_0x4036('0x52d')]),_0x3d408e=this[_0x4036('0x5cb')]();this[_0x4036('0x1e2')](_0x362cdc,'autoBattle',_0x3d408e);}}}else{if(_0x4036('0x2e8')!==_0x4036('0x77')){this[_0x4036('0x238')]=!this[_0x4036('0xd0')][_0x4036('0x378')]();if(!this['_appeared']){if(_0x4036('0x6d2')!==_0x4036('0x48a'))this[_0x4036('0x57b')]=0x0;else{function _0x4d8ec0(){return _0x404daa[_0x4036('0x43c')][_0x4036('0x286')](this,_0x4a18af);}}}}else{function _0x49a1ae(){this[_0x4036('0x539')](![]);}}}},VisuMZ['BattleCore'][_0x4036('0x214')]=Sprite_Enemy[_0x4036('0x24d')][_0x4036('0x3c2')],Sprite_Enemy[_0x4036('0x24d')][_0x4036('0x3c2')]=function(){if(this[_0x4036('0x6ee')]())VisuMZ[_0x4036('0x600')][_0x4036('0x214')][_0x4036('0x286')](this);},Sprite_Enemy[_0x4036('0x24d')][_0x4036('0x662')]=function(){Sprite_Battler[_0x4036('0x24d')]['updateFrame'][_0x4036('0x286')](this);const _0x4b42af=this[_0x4036('0x57f')]()||this;if(!_0x4b42af)return;!_0x4b42af['bitmap']&&(_0x4b42af[_0x4036('0x76f')]=new Bitmap(this[_0x4036('0x42')],this[_0x4036('0x28f')]));if(this[_0x4036('0x4f3')]===_0x4036('0x64b')){if(_0x4036('0x5d6')!==_0x4036('0x5'))_0x4b42af[_0x4036('0x643')](0x0,0x0,_0x4b42af[_0x4036('0x76f')][_0x4036('0x42')],this[_0x4036('0x89')]);else{function _0x42fd7a(){this[_0x4036('0x41f')]=_0x1cb475,_0x36ee4e[_0x4036('0x423')][_0x4036('0x1af')]();}}}else{if(_0x4036('0x72b')===_0x4036('0x72b'))_0x4b42af[_0x4036('0x643')](0x0,0x0,_0x4b42af[_0x4036('0x76f')][_0x4036('0x42')],this['bitmap']['height']);else{function _0x428b7f(){this[_0x4036('0x251')]=_0x12b4c1,this[_0x4036('0xb1')]='';const _0x214e67=new _0xf80050(0x0,0x0,_0x226785[_0x4036('0x316')],this['lineHeight']()*0x4);_0x5cf101[_0x4036('0x24d')][_0x4036('0x261')][_0x4036('0x286')](this,_0x214e67),this[_0x4036('0x37b')](0x2),this[_0x4036('0x4df')]=0x0;}}}},VisuMZ[_0x4036('0x600')][_0x4036('0x3cd')]=Sprite_Enemy[_0x4036('0x24d')][_0x4036('0x79f')],Sprite_Enemy[_0x4036('0x24d')][_0x4036('0x79f')]=function(){if(this[_0x4036('0x6ee')]())VisuMZ[_0x4036('0x600')][_0x4036('0x3cd')][_0x4036('0x286')](this);},Sprite_Enemy['prototype'][_0x4036('0x6aa')]=function(){return Sprite_Battler[_0x4036('0x24d')][_0x4036('0x6aa')][_0x4036('0x286')](this);},VisuMZ['BattleCore']['Sprite_Enemy_updateStateSprite']=Sprite_Enemy[_0x4036('0x24d')][_0x4036('0x574')],Sprite_Enemy[_0x4036('0x24d')][_0x4036('0x574')]=function(){VisuMZ[_0x4036('0x600')][_0x4036('0x426')][_0x4036('0x286')](this),this[_0x4036('0x66e')]();},Sprite_Enemy[_0x4036('0x24d')][_0x4036('0x66e')]=function(){this[_0x4036('0x105')]['x']=0x0,this[_0x4036('0x105')]['x']+=this[_0x4036('0x2c9')]['battleUIOffsetX'](),this[_0x4036('0x105')]['y']=-this[_0x4036('0x76f')]['height']-this[_0x4036('0x105')][_0x4036('0x28f')],this[_0x4036('0x105')]['y']+=this[_0x4036('0x2c9')][_0x4036('0x2e7')](),this['_stateIconSprite'][_0x4036('0x325')]['x']=0x1/(this[_0x4036('0x325')]['x']||0.001),this[_0x4036('0x105')][_0x4036('0x325')]['y']=0x1/(this[_0x4036('0x325')]['y']||0.001);if(this[_0x4036('0x649')]()){if('tIHjI'===_0x4036('0x162')){function _0x128aa0(){_0x1be9fb[_0x4036('0x507')]([this],_0xbe65db,!!_0x462fc5);}}else this[_0x4036('0x781')]['_stateSprite'][_0x4036('0x325')]['x']=-0x1/(this[_0x4036('0x325')]['x']||0.001),this[_0x4036('0x781')][_0x4036('0x602')]['scale']['y']=0x1/(this[_0x4036('0x325')]['y']||0.001);}},VisuMZ[_0x4036('0x600')][_0x4036('0x571')]=Sprite_Enemy[_0x4036('0x24d')][_0x4036('0x7ad')],Sprite_Enemy[_0x4036('0x24d')][_0x4036('0x7ad')]=function(_0xe5a0a2){VisuMZ[_0x4036('0x600')]['Sprite_Enemy_setBattler'][_0x4036('0x286')](this,_0xe5a0a2),this[_0x4036('0x66c')](_0xe5a0a2);},Sprite_Enemy[_0x4036('0x24d')][_0x4036('0x66c')]=function(_0xc48450){!this[_0x4036('0x781')]&&(this[_0x4036('0x781')]=new Sprite_SvEnemy(_0xc48450),this[_0x4036('0x3f9')]()),this[_0x4036('0x781')][_0x4036('0x7ad')](_0xc48450);},Sprite_Enemy[_0x4036('0x24d')][_0x4036('0x649')]=function(){return this[_0x4036('0xd0')]&&this[_0x4036('0xd0')]['hasSvBattler']();},VisuMZ[_0x4036('0x600')][_0x4036('0x4b2')]=Sprite_Enemy[_0x4036('0x24d')][_0x4036('0x266')],Sprite_Enemy[_0x4036('0x24d')]['loadBitmap']=function(_0x207fdb){if(this['hasSvBattler']()){const _0x8e278a=this[_0x4036('0xd0')][_0x4036('0x671')]();this['bitmap']=new Bitmap(_0x8e278a[_0x4036('0x42')],_0x8e278a[_0x4036('0x28f')]);}else VisuMZ[_0x4036('0x600')][_0x4036('0x4b2')][_0x4036('0x286')](this,_0x207fdb);},Sprite_Enemy['prototype']['allowCollapse']=function(){return this[_0x4036('0x649')]()?this[_0x4036('0xd0')][_0x4036('0x6ee')]():!![];},Sprite_Enemy[_0x4036('0x24d')][_0x4036('0x114')]=function(){if(this[_0x4036('0x649')]())this[_0x4036('0x781')][_0x4036('0x114')]();},Sprite_Enemy[_0x4036('0x24d')][_0x4036('0x482')]=function(_0x51d052){if(this[_0x4036('0x649')]())this[_0x4036('0x781')][_0x4036('0x482')](_0x51d052);},Sprite_Enemy[_0x4036('0x24d')][_0x4036('0x35d')]=function(_0x399fab){if(this[_0x4036('0x649')]())this['_svBattlerSprite'][_0x4036('0x35d')](_0x399fab);},Sprite_Enemy[_0x4036('0x24d')][_0x4036('0x54d')]=function(){const _0x492051=VisuMZ[_0x4036('0x600')]['Settings']['ActionSequence'],_0x4055fe=_0x492051[_0x4036('0x4a8')],_0x5826c1=_0x492051[_0x4036('0x510')],_0x3ea631=_0x492051[_0x4036('0x5a0')];this[_0x4036('0x64c')](_0x4055fe,_0x5826c1,_0x3ea631);};function Sprite_SvEnemy(){this[_0x4036('0x261')](...arguments);}Sprite_SvEnemy[_0x4036('0x24d')]=Object[_0x4036('0xaa')](Sprite_Actor[_0x4036('0x24d')]),Sprite_SvEnemy[_0x4036('0x24d')][_0x4036('0x6c8')]=Sprite_SvEnemy,Sprite_SvEnemy[_0x4036('0x24d')][_0x4036('0x261')]=function(_0x92fc1d){Sprite_Actor['prototype'][_0x4036('0x261')][_0x4036('0x286')](this,_0x92fc1d),this[_0x4036('0x325')]['x']=-0x1,this[_0x4036('0x602')]['scale']['x']=-0x1;},Sprite_SvEnemy[_0x4036('0x24d')][_0x4036('0x2b8')]=function(){},Sprite_SvEnemy[_0x4036('0x24d')][_0x4036('0xd3')]=function(){},Sprite_SvEnemy[_0x4036('0x24d')][_0x4036('0x11b')]=function(_0x156d50){},Sprite_SvEnemy[_0x4036('0x24d')][_0x4036('0xd8')]=function(){},Sprite_SvEnemy[_0x4036('0x24d')][_0x4036('0x569')]=function(){},Sprite_SvEnemy[_0x4036('0x24d')][_0x4036('0x574')]=function(){this[_0x4036('0x602')][_0x4036('0x392')]=![];},Sprite_SvEnemy[_0x4036('0x24d')][_0x4036('0x6d8')]=function(){Sprite_Battler[_0x4036('0x24d')][_0x4036('0x6d8')][_0x4036('0x286')](this);const _0x1d41ff=this[_0x4036('0x7a2')][_0x4036('0x152')]();this[_0x4036('0x2cc')]!==_0x1d41ff&&(this['_battlerName']=_0x1d41ff,this[_0x4036('0x80e')][_0x4036('0x76f')]=ImageManager[_0x4036('0x815')](_0x1d41ff)),this[_0x4036('0x80e')]&&this[_0x4036('0x80e')][_0x4036('0x76f')]&&this[_0x4036('0x2c9')]&&(this[_0x4036('0x80e')][_0x4036('0x76f')][_0x4036('0xf5')]=this[_0x4036('0x2c9')][_0x4036('0x274')]());},Sprite_SvEnemy[_0x4036('0x24d')][_0x4036('0xc0')]=function(){},Sprite_SvEnemy[_0x4036('0x24d')][_0x4036('0x64c')]=function(_0x40ee72,_0x4db83f,_0x338c3f){if(this[_0x4036('0x7bc')])this[_0x4036('0x7bc')][_0x4036('0x64c')](_0x40ee72,_0x4db83f,_0x338c3f);},Sprite_SvEnemy['prototype'][_0x4036('0x114')]=function(){const _0x1a5d0c=this[_0x4036('0x7a2')];if(_0x1a5d0c){const _0x12f8b2=_0x1a5d0c[_0x4036('0x2ee')]();if(_0x1a5d0c[_0x4036('0x5c5')]()||_0x1a5d0c[_0x4036('0x473')]())this[_0x4036('0x7d4')](_0x4036('0x733'));else{if(_0x12f8b2===0x3)this[_0x4036('0x7d4')](_0x4036('0x565'));else{if(_0x12f8b2===0x2)this[_0x4036('0x7d4')](_0x4036('0x7b8'));else{if(_0x1a5d0c[_0x4036('0x212')]())this[_0x4036('0x7d4')](_0x4036('0x4a3'));else{if(_0x1a5d0c[_0x4036('0x1a0')]()||_0x1a5d0c[_0x4036('0x3ac')]())this[_0x4036('0x7d4')](_0x4036('0x342'));else{if(_0x12f8b2===0x1)this[_0x4036('0x7d4')]('abnormal');else{if(_0x1a5d0c['isDying']())this[_0x4036('0x7d4')](_0x4036('0x7c7'));else{if(_0x1a5d0c[_0x4036('0x33b')]()){if(_0x4036('0x589')===_0x4036('0x589'))this[_0x4036('0x7d4')]('walk');else{function _0x29b756(){_0x3b0bcb[_0x4036('0x76f')]=_0x2929c7['loadPicture'](_0x4a0960);}}}else this[_0x4036('0x7d4')](_0x1a5d0c[_0x4036('0x671')]()[_0x4036('0x92')]||'walk');}}}}}}}}},Sprite_SvEnemy[_0x4036('0x24d')][_0x4036('0x231')]=function(){if(this[_0x4036('0x7bc')]){if(_0x4036('0xc7')!==_0x4036('0xc7')){function _0x50cb3b(){_0x431f27[_0x4036('0x600')][_0x4036('0x6fc')][_0x4036('0x286')](this,_0x1e9cf7),this['callNextMethod']();}}else return this[_0x4036('0x7bc')][_0x4036('0x4e0')]===0x0&&this['parent'][_0x4036('0x35c')]===0x0;}else return!![];},Sprite_SvEnemy['prototype'][_0x4036('0x6f7')]=function(){},Sprite_Damage[_0x4036('0x24d')]['setupBattleCore']=function(_0x3e1398){const _0x51df70=_0x3e1398[_0x4036('0x71a')]();if(_0x51df70[_0x4036('0x198')]||_0x51df70['evaded'])this[_0x4036('0x2da')]=0x0,this[_0x4036('0xc3')]();else{if(_0x51df70['hpAffected'])this['_colorType']=_0x51df70[_0x4036('0x195')]>=0x0?0x0:0x1,this[_0x4036('0x30e')](_0x51df70[_0x4036('0x195')]);else{if(_0x3e1398[_0x4036('0x729')]()&&_0x51df70['mpDamage']!==0x0){if('dBdBC'!==_0x4036('0x4bb')){function _0x4c1075(){const _0x5eb1e2=_0xb24481['battler']();this[_0x4036('0x5d7')](_0x4036('0x1a8'),[_0x1dc384],_0x4d878b,_0x1d5e36),this[_0x4036('0x5d7')](_0x4036('0x555'),_0xf01c3e,_0x5eb1e2[_0x4036('0x13b')],_0x5eb1e2[_0x4036('0x47d')],_0x4ee91f,![],_0x4036('0x167')),this['push'](_0x4036('0x530'),[_0x4de0b6],_0x4036('0x80a')),this[_0x4036('0x5d7')]('waitForMovement'),this[_0x4036('0x5d7')](_0x4036('0x530'),[_0x4ecdd2],_0x4036('0x733'));}}else this[_0x4036('0x2da')]=_0x51df70['mpDamage']>=0x0?0x2:0x3,this[_0x4036('0x30e')](_0x51df70[_0x4036('0x3bc')]);}}}if(_0x51df70[_0x4036('0x3c8')]){if(_0x4036('0x7ba')!==_0x4036('0x27d'))this[_0x4036('0x6a1')]();else{function _0x26c9bb(){const _0x3670f1=this[_0x4036('0x3e7')]['bitmap'],_0xf7c74e=this[_0x4036('0x42')]-0x8,_0x46bef8=this[_0x4036('0x28f')],_0x4d2fa3=this['padding'],_0x39cd21=_0x133af0[_0x4036('0x1b0')](),_0x4d1d26=_0x3c0029[_0x4036('0x607')]();this[_0x4036('0x3e7')]['x']=0x4,_0x3670f1[_0x4036('0x355')](_0xf7c74e,_0x46bef8),_0x3670f1[_0x4036('0x2a')](0x0,0x0,_0xf7c74e,_0x4d2fa3,_0x4d1d26,_0x39cd21,!![]),_0x3670f1[_0x4036('0x2e5')](0x0,_0x4d2fa3,_0xf7c74e,_0x46bef8-_0x4d2fa3*0x2,_0x39cd21),_0x3670f1[_0x4036('0x2a')](0x0,_0x46bef8-_0x4d2fa3,_0xf7c74e,_0x4d2fa3,_0x39cd21,_0x4d1d26,!![]),this[_0x4036('0x3e7')][_0x4036('0x643')](0x0,0x0,_0xf7c74e,_0x46bef8);}}}},Sprite_Damage[_0x4036('0x24d')][_0x4036('0x699')]=function(_0x574b22){},Sprite_Damage[_0x4036('0x24d')][_0x4036('0x30e')]=function(_0x4b3820){let _0x47425f=this[_0x4036('0x3ca')](_0x4b3820);const _0x3fc47a=this[_0x4036('0x1')](),_0x13492a=Math[_0x4036('0x5bd')](_0x3fc47a*0.75);for(let _0x33874e=0x0;_0x33874e<_0x47425f[_0x4036('0x6b5')];_0x33874e++){const _0x42ead6=this[_0x4036('0x655')](_0x13492a,_0x3fc47a);_0x42ead6[_0x4036('0x76f')]['drawText'](_0x47425f[_0x33874e],0x0,0x0,_0x13492a,_0x3fc47a,'center'),_0x42ead6['x']=(_0x33874e-(_0x47425f['length']-0x1)/0x2)*_0x13492a,_0x42ead6['dy']=-_0x33874e;}},Sprite_Damage[_0x4036('0x24d')][_0x4036('0x3ca')]=function(_0x5a945b){let _0x210b82=Math[_0x4036('0x38c')](_0x5a945b)[_0x4036('0x18e')]();this['useDigitGrouping']()&&(_0x210b82=VisuMZ[_0x4036('0x592')](_0x210b82));const _0x1077b8=VisuMZ[_0x4036('0x600')][_0x4036('0x635')]['Damage'];let _0x41f7e6='',_0x37bd7c='';switch(this[_0x4036('0x2da')]){case 0x0:_0x41f7e6=_0x1077b8['hpDamageFmt']||'-%1',_0x37bd7c=TextManager['hp'];if(_0x5a945b===0x0)_0x41f7e6='%1';break;case 0x1:_0x41f7e6=_0x1077b8[_0x4036('0x51b')]||_0x4036('0x2ca'),_0x37bd7c=TextManager['hp'];break;case 0x2:_0x41f7e6=_0x1077b8[_0x4036('0x73e')]||_0x4036('0x626'),_0x37bd7c=TextManager['mp'];break;case 0x3:_0x41f7e6=_0x1077b8[_0x4036('0x514')]||_0x4036('0x1f4'),_0x37bd7c=TextManager['mp'];break;}return _0x41f7e6[_0x4036('0x4d2')](_0x210b82,_0x37bd7c)[_0x4036('0x330')]();},Sprite_Damage[_0x4036('0x24d')][_0x4036('0x5c4')]=function(){if(Imported[_0x4036('0x7b5')]){if(_0x4036('0x2d9')!==_0x4036('0x2d9')){function _0x2502df(){if(!this[_0x4036('0x281')]())return;if(this[_0x4036('0x1cd')]===_0x328d8d)return;this[_0x4036('0x1cd')]=_0x3d16a3,this[_0x4036('0x444')]=_0x1be1d2,this[_0x4036('0x3aa')]=_0xe1021f,this[_0x4036('0x832')]=_0xadeb61||_0x4036('0x167');if(_0x2fc415<=0x0)this['_floatHeight']=_0x242fa9;}}else return VisuMZ[_0x4036('0x7d5')][_0x4036('0x635')]['QoL'][_0x4036('0x80')];}else{if(_0x4036('0x582')!==_0x4036('0x582')){function _0x19e7ea(){_0xf692d5(_0x4036('0x7d3')[_0x4036('0x4d2')](_0x575794,_0x246f24)),_0x2c9761[_0x4036('0x599')]();}}else return![];}},Sprite_Damage[_0x4036('0x24d')]['setupCriticalEffect']=function(){const _0x5ea0d4=VisuMZ[_0x4036('0x600')][_0x4036('0x635')]['Damage'];this[_0x4036('0x7d8')]=_0x5ea0d4[_0x4036('0x55b')]['slice'](0x0),this['_flashDuration']=_0x5ea0d4[_0x4036('0x5d5')];},Sprite_Damage[_0x4036('0x24d')][_0x4036('0x5c6')]=function(_0xd9c5ef,_0x35c869){this[_0x4036('0x7d8')]=_0x35c869[_0x4036('0x18b')]||[0x0,0x0,0x0,0x0],this[_0x4036('0x7d8')]=JsonEx['makeDeepCopy'](this[_0x4036('0x7d8')]),this[_0x4036('0x1b4')]=_0x35c869['flashDuration']||0x0;const _0x86413d=this[_0x4036('0x1')](),_0x4a9944=Math[_0x4036('0x5bd')](_0x86413d*0x1e),_0x5dc662=this['createChildSprite'](_0x4a9944,_0x86413d);_0x5dc662[_0x4036('0x76f')][_0x4036('0x324')]=ColorManager[_0x4036('0x568')](_0x35c869['textColor']),_0x5dc662['bitmap'][_0x4036('0x25f')](_0xd9c5ef,0x0,0x0,_0x4a9944,_0x86413d,_0x4036('0x723')),_0x5dc662['dy']=0x0;},Sprite_Damage['prototype']['setupIconTextPopup']=function(_0x4483f4,_0x39dff9,_0x1d82fe){const _0x373b06=Math['max'](this[_0x4036('0x1')](),ImageManager[_0x4036('0x32d')]),_0x174a69=Math[_0x4036('0x5bd')](_0x373b06*0x1e),_0x40b46c=this[_0x4036('0x655')](_0x174a69,_0x373b06),_0x54c548=ImageManager[_0x4036('0x58d')]/0x2,_0x4dcd57=_0x40b46c['bitmap'][_0x4036('0x534')](_0x39dff9+'\x20');_0x40b46c['bitmap'][_0x4036('0x324')]=ColorManager['getColor'](_0x1d82fe[_0x4036('0x324')]),_0x40b46c[_0x4036('0x76f')][_0x4036('0x25f')](_0x39dff9,_0x54c548,0x0,_0x174a69-_0x54c548,_0x373b06,_0x4036('0x723'));const _0x58a214=Math[_0x4036('0x488')]((_0x373b06-ImageManager['iconHeight'])/0x2),_0x30ddb5=_0x174a69/0x2-ImageManager[_0x4036('0x58d')]-_0x4dcd57/0x2+_0x54c548/0x2,_0xa38f75=ImageManager[_0x4036('0x4ff')](_0x4036('0x360')),_0x1c6637=ImageManager[_0x4036('0x58d')],_0xa90be8=ImageManager[_0x4036('0x32d')],_0xe4b731=_0x4483f4%0x10*_0x1c6637,_0x29d4cf=Math[_0x4036('0x5bd')](_0x4483f4/0x10)*_0xa90be8;_0x40b46c[_0x4036('0x76f')][_0x4036('0x141')](_0xa38f75,_0xe4b731,_0x29d4cf,_0x1c6637,_0xa90be8,_0x30ddb5,_0x58a214),this[_0x4036('0x7d8')]=_0x1d82fe[_0x4036('0x18b')]||[0x0,0x0,0x0,0x0],this[_0x4036('0x7d8')]=JsonEx[_0x4036('0x2bf')](this[_0x4036('0x7d8')]),this[_0x4036('0x1b4')]=_0x1d82fe[_0x4036('0x6eb')]||0x0,_0x40b46c['dy']=0x0;},VisuMZ[_0x4036('0x600')]['Sprite_StateIcon_updateFrame']=Sprite_StateIcon['prototype'][_0x4036('0x662')],Sprite_StateIcon[_0x4036('0x24d')][_0x4036('0x662')]=function(){VisuMZ[_0x4036('0x600')]['Sprite_StateIcon_updateFrame'][_0x4036('0x286')](this),this[_0x4036('0x392')]=this[_0x4036('0x79c')]>0x0?!![]:![];},VisuMZ['BattleCore'][_0x4036('0x5fc')]=Sprite_Weapon[_0x4036('0x24d')][_0x4036('0x266')],Sprite_Weapon[_0x4036('0x24d')]['loadBitmap']=function(){VisuMZ[_0x4036('0x600')][_0x4036('0x5fc')][_0x4036('0x286')](this),this['bitmap']&&(this[_0x4036('0x76f')][_0x4036('0xf5')]=VisuMZ['BattleCore'][_0x4036('0x635')][_0x4036('0x43f')]['SmoothImage']);};function Sprite_HpGauge(){this[_0x4036('0x261')](...arguments);}Sprite_HpGauge['prototype']=Object[_0x4036('0xaa')](Sprite_Gauge[_0x4036('0x24d')]),Sprite_HpGauge[_0x4036('0x24d')][_0x4036('0x6c8')]=Sprite_HpGauge,Sprite_HpGauge['prototype'][_0x4036('0x261')]=function(){Sprite_Gauge['prototype']['initialize'][_0x4036('0x286')](this);},Sprite_HpGauge[_0x4036('0x24d')][_0x4036('0x432')]=function(){return 0x0;},Sprite_HpGauge[_0x4036('0x24d')][_0x4036('0x1f9')]=function(){this['bitmap']['clear']();const _0x18770c=this[_0x4036('0x381')]();if(!isNaN(_0x18770c)){if(_0x4036('0x434')==='wKkDi')this[_0x4036('0x21e')]();else{function _0x468bae(){this[_0x4036('0x12b')][_0x4036('0x392')]=![];}}}},Spriteset_Battle[_0x4036('0x24d')][_0x4036('0x32e')]=function(){if(!$gameSystem[_0x4036('0x1c1')]())return![];return![];},Spriteset_Battle['prototype'][_0x4036('0xf0')]=function(){return 0x0;},Spriteset_Battle[_0x4036('0x24d')]['animationNextDelay']=function(){return 0x0;},VisuMZ['BattleCore'][_0x4036('0x540')]=Spriteset_Battle[_0x4036('0x24d')][_0x4036('0x269')],Spriteset_Battle['prototype']['createLowerLayer']=function(){VisuMZ[_0x4036('0x600')][_0x4036('0x540')][_0x4036('0x286')](this),this[_0x4036('0x3cf')]();},VisuMZ['BattleCore'][_0x4036('0x7e4')]=Spriteset_Battle['prototype'][_0x4036('0x209')],Spriteset_Battle[_0x4036('0x24d')][_0x4036('0x209')]=function(){VisuMZ[_0x4036('0x600')][_0x4036('0x7e4')][_0x4036('0x286')](this),this[_0x4036('0x44a')]();},Spriteset_Battle[_0x4036('0x24d')][_0x4036('0x3cf')]=function(){this['_weather']=new Weather(),this['_battleField'][_0x4036('0x356')](this[_0x4036('0x17f')]);},Spriteset_Battle[_0x4036('0x24d')][_0x4036('0x44a')]=function(){this[_0x4036('0x17f')][_0x4036('0x3ce')]=$gameScreen[_0x4036('0x51')](),this[_0x4036('0x17f')][_0x4036('0x5f3')]=$gameScreen[_0x4036('0x1b5')]();},Game_Interpreter[_0x4036('0x24d')][_0x4036('0x63a')]=function(_0x63e2d9){$gameScreen[_0x4036('0x584')](_0x63e2d9[0x0],_0x63e2d9[0x1],_0x63e2d9[0x2]);if(_0x63e2d9[0x3])this[_0x4036('0x712')](_0x63e2d9[0x2]);return!![];},VisuMZ[_0x4036('0x600')]['Game_Interpreter_command283']=Game_Interpreter[_0x4036('0x24d')]['command283'],Game_Interpreter[_0x4036('0x24d')][_0x4036('0x128')]=function(_0x5a3cdb){if(SceneManager[_0x4036('0x78a')]())return SceneManager[_0x4036('0x423')][_0x4036('0x5f8')][_0x4036('0x188')](_0x5a3cdb[0x0],_0x5a3cdb[0x1]),!![];else{if(_0x4036('0x1d5')==='kecfc'){function _0x4f3005(){_0x532195=_0xe58d8c[_0x4036('0x46e')];}}else return VisuMZ['BattleCore']['Game_Interpreter_command283'][_0x4036('0x286')](this,_0x5a3cdb);}},Spriteset_Battle[_0x4036('0x24d')]['changeBattlebacks']=function(_0x370136,_0x18231c){_0x370136=_0x370136||this[_0x4036('0x494')][_0x4036('0xa6')](),_0x18231c=_0x18231c||this['_back2Sprite'][_0x4036('0x314')]();const _0x4e401c=ImageManager[_0x4036('0x18f')](_0x370136);_0x4e401c['addLoadListener'](this[_0x4036('0x15b')][_0x4036('0x1be')](this,this[_0x4036('0x494')],_0x4e401c));const _0x346884=ImageManager[_0x4036('0x532')](_0x18231c);_0x346884[_0x4036('0x3fc')](this['updateBattlebackBitmap']['bind'](this,this[_0x4036('0x503')],_0x346884));},Spriteset_Battle[_0x4036('0x24d')][_0x4036('0x15b')]=function(_0x376842,_0x52bb32){_0x376842['bitmap']=_0x52bb32;},VisuMZ[_0x4036('0x600')]['Spriteset_Battle_createBattleField']=Spriteset_Battle[_0x4036('0x24d')][_0x4036('0x40a')],Spriteset_Battle[_0x4036('0x24d')][_0x4036('0x40a')]=function(){VisuMZ[_0x4036('0x600')][_0x4036('0x96')]['call'](this),this['createBattleFieldBattleCore']();},Spriteset_Battle[_0x4036('0x24d')][_0x4036('0x317')]=function(){this[_0x4036('0x5a3')]=new Sprite(),this[_0x4036('0x11f')][_0x4036('0x356')](this[_0x4036('0x5a3')]),this[_0x4036('0x32b')]=new Sprite(),this[_0x4036('0x11f')][_0x4036('0x356')](this[_0x4036('0x32b')]),this[_0x4036('0x74a')]=new Sprite(),this[_0x4036('0x74a')]['x']=this[_0x4036('0x11f')]['x'],this[_0x4036('0x74a')]['y']=this[_0x4036('0x11f')]['y'],this[_0x4036('0x356')](this[_0x4036('0x74a')]);if(!this[_0x4036('0x32e')]())return;this[_0x4036('0x5a3')][_0x4036('0x325')]['x']=-0x1,this[_0x4036('0x5a3')]['x']=this[_0x4036('0x11f')][_0x4036('0x42')],this[_0x4036('0x32b')]['scale']['x']=-0x1,this[_0x4036('0x32b')]['x']=this[_0x4036('0x11f')]['width'],this[_0x4036('0x74a')]['scale']['x']=-0x1,this[_0x4036('0x74a')]['x']=this[_0x4036('0x11f')]['x']+this[_0x4036('0x11f')][_0x4036('0x42')];},Spriteset_Battle[_0x4036('0x24d')][_0x4036('0x202')]=function(){if(Imported[_0x4036('0x7b5')]&&VisuMZ['CoreEngine'][_0x4036('0x635')]['UI']['RepositionEnemies']){if('fsrpf'!==_0x4036('0x75d')){function _0x3f1bc4(){_0x332545[_0x4036('0x6ca')](_0x562c74);if(_0x3b8921)_0x35d6b5[_0x4036('0x491')]();}}else this['repositionEnemiesByResolution']();}const _0x1aaf49=$gameTroop[_0x4036('0x26a')](),_0x4d332e=[];for(const _0x5c1d5a of _0x1aaf49){if(_0x4036('0x190')!=='MZjsl')_0x4d332e[_0x4036('0x5d7')](new Sprite_Enemy(_0x5c1d5a));else{function _0x40caa0(){if(!_0x42d9d6[_0x4036('0x600')]['Settings'][_0x4036('0x54c')][_0x4036('0x4d0')])return;_0x401ce8[_0x4036('0x600')][_0x4036('0x56f')][_0x4036('0x286')](this,_0x12fba5);}}}_0x4d332e['sort'](this[_0x4036('0x716')][_0x4036('0x1be')](this));for(const _0x32a6cd of _0x4d332e){if(_0x4036('0x6a8')!==_0x4036('0x6a8')){function _0x241df9(){this[_0x4036('0x530')](_0x4036('0x289'));}}else this['_battlerContainer'][_0x4036('0x356')](_0x32a6cd);}this[_0x4036('0x12f')]=_0x4d332e;},Spriteset_Battle[_0x4036('0x24d')][_0x4036('0x273')]=function(){this[_0x4036('0x4d5')]=[];for(let _0x389953=0x0;_0x389953<$gameParty['maxBattleMembers']();_0x389953++){const _0x56efe7=new Sprite_Actor();_0x56efe7[_0x4036('0x7ad')]($gameParty[_0x4036('0x6a7')]()[_0x389953]),this[_0x4036('0x4d5')][_0x4036('0x5d7')](_0x56efe7),this[_0x4036('0x5a3')][_0x4036('0x356')](_0x56efe7);}},Spriteset_Battle[_0x4036('0x24d')][_0x4036('0x407')]=function(_0x310003,_0x2048e3,_0x5392fc,_0x41290d){const _0x53bc43=this[_0x4036('0x5f9')](_0x2048e3),_0x34f581=new(_0x53bc43?Sprite_AnimationMV:Sprite_Animation)(),_0xa6f1e3=this[_0x4036('0x3c')](_0x310003);if(this[_0x4036('0x49')](_0x310003[0x0])){if('hYsKL'!==_0x4036('0x6e5')){function _0x5e93cc(){this['autoMeleeSingleTargetActionSet'](_0x143e55,_0x43b0e7,_0x213a82);}}else _0x5392fc=!_0x5392fc;}_0x34f581[_0x4036('0x6fb')]=_0x310003,_0x34f581[_0x4036('0x699')](_0xa6f1e3,_0x2048e3,_0x5392fc,_0x41290d),this[_0x4036('0x78')](_0x34f581);},Spriteset_Battle['prototype'][_0x4036('0x78')]=function(_0x51cc22){this[_0x4036('0x60f')](_0x51cc22)?this[_0x4036('0x47a')]()[_0x4036('0x356')](_0x51cc22):this[_0x4036('0x32b')]['addChild'](_0x51cc22),this[_0x4036('0x43')][_0x4036('0x5d7')](_0x51cc22);},Spriteset_Battle[_0x4036('0x24d')][_0x4036('0x60f')]=function(_0x5c07eb){if(!_0x5c07eb)return![];if(!_0x5c07eb[_0x4036('0x3bb')])return![];if(_0x5c07eb[_0x4036('0x3bb')][_0x4036('0x50a')]!==0x0)return![];if(!_0x5c07eb[_0x4036('0x6fb')][0x0])return![];if(!_0x5c07eb[_0x4036('0x6fb')][0x0][_0x4036('0x4a2')]())return![];if($gameSystem[_0x4036('0x1c1')]())return![];if(!this[_0x4036('0x47a')]())return![];return Window_BattleStatus['prototype'][_0x4036('0x203')]()===_0x4036('0x6b4');},Spriteset_Battle[_0x4036('0x24d')][_0x4036('0x47a')]=function(){if(!SceneManager['_scene'])return;if(!SceneManager['_scene'][_0x4036('0x1ac')])return;if(!SceneManager[_0x4036('0x423')][_0x4036('0x1ac')][_0x4036('0x1e')])return;return SceneManager[_0x4036('0x423')][_0x4036('0x1ac')][_0x4036('0x1e')];},Spriteset_Battle[_0x4036('0x24d')][_0x4036('0x76c')]=function(_0x421660){this[_0x4036('0x9c')](_0x421660);for(const _0x3ccf26 of _0x421660['targetObjects']){_0x3ccf26[_0x4036('0x5f')]&&_0x3ccf26[_0x4036('0x5f')]();}_0x421660[_0x4036('0x451')]();},Spriteset_Battle[_0x4036('0x24d')][_0x4036('0x9c')]=function(_0x30f1b0){this[_0x4036('0x43')][_0x4036('0x2d8')](_0x30f1b0);if(this['isAnimationShownOnBattlePortrait'](_0x30f1b0)){if('gZEMq'===_0x4036('0x646')){function _0x182579(){return _0x2c3911[_0x4036('0x600')][_0x4036('0x4f')][_0x4036('0x286')](this);}}else this[_0x4036('0x47a')]()[_0x4036('0x147')](_0x30f1b0);}else{if(_0x4036('0x2e9')!=='OHWJa'){function _0x104111(){if(_0x2eb559)_0xb14495[_0x4036('0x38d')](_0x9af7be);}}else this[_0x4036('0x32b')][_0x4036('0x147')](_0x30f1b0);}},VisuMZ[_0x4036('0x600')][_0x4036('0x25')]=Spriteset_Battle[_0x4036('0x24d')][_0x4036('0x280')],Spriteset_Battle[_0x4036('0x24d')][_0x4036('0x280')]=function(){VisuMZ[_0x4036('0x600')][_0x4036('0x25')][_0x4036('0x286')](this),this[_0x4036('0x730')]();},Spriteset_Battle[_0x4036('0x24d')][_0x4036('0x730')]=function(){this[_0x4036('0x5a3')][_0x4036('0x4ce')][_0x4036('0x7d9')](this['compareBattlerSprites'][_0x4036('0x1be')](this));const _0x17fd69=BattleManager[_0x4036('0x398')];if(_0x17fd69){if(_0x17fd69[_0x4036('0x4a2')]()&&!$gameSystem[_0x4036('0x1c1')]())return;const _0x3e8192=_0x17fd69['battler']();if(_0x3e8192&&_0x17fd69[_0x4036('0x4a2')]())this[_0x4036('0x5a3')]['addChild'](_0x3e8192);}},Spriteset_Battle[_0x4036('0x24d')][_0x4036('0x45a')]=function(_0x3e9dbe,_0x1a2e0d){return _0x3e9dbe['_baseY']!==_0x1a2e0d[_0x4036('0x311')]?_0x3e9dbe[_0x4036('0x311')]-_0x1a2e0d[_0x4036('0x311')]:_0x1a2e0d[_0x4036('0x802')]-_0x3e9dbe[_0x4036('0x802')];},Spriteset_Battle[_0x4036('0x24d')][_0x4036('0x126')]=function(){for(const _0x27d508 of $gameParty[_0x4036('0x6a0')]()){if(_0x4036('0x705')==='ERsoi'){if(!_0x27d508)continue;if(!_0x27d508[_0x4036('0x304')]())continue;_0x27d508[_0x4036('0x304')]()['forceEscapeSprite']=!![];}else{function _0x3558a3(){this[_0x4036('0x681')][_0x4036('0x546')]=_0x65f3f3(_0xdb2a4a['$1']),this['_cache'][_0x4036('0x586')]=_0x11fca7(_0x13456b['$2']);}}}},Spriteset_Battle[_0x4036('0x24d')][_0x4036('0x5d')]=function(){return![];},Spriteset_Battle[_0x4036('0x24d')][_0x4036('0x4c5')]=function(){return this[_0x4036('0x696')]()['some'](_0x1b3405=>_0x1b3405[_0x4036('0x21b')]());},Spriteset_Battle[_0x4036('0x24d')][_0x4036('0x7d0')]=function(){return this[_0x4036('0x696')]()[_0x4036('0x275')](_0x4fac7a=>_0x4fac7a[_0x4036('0x2cf')]());},Spriteset_Battle[_0x4036('0x24d')][_0x4036('0xc2')]=function(){return this[_0x4036('0x696')]()[_0x4036('0x275')](_0x28a9b3=>_0x28a9b3[_0x4036('0x14c')]());},Spriteset_Battle['prototype'][_0x4036('0x70c')]=function(){return this[_0x4036('0x696')]()[_0x4036('0x275')](_0x59a54b=>_0x59a54b[_0x4036('0x5e5')]());},Spriteset_Battle[_0x4036('0x24d')][_0x4036('0x4c3')]=function(){return this[_0x4036('0x696')]()[_0x4036('0x275')](_0x3a4232=>_0x3a4232['isSpinning']());},Spriteset_Battle[_0x4036('0x24d')][_0x4036('0x665')]=function(){return this[_0x4036('0x696')]()[_0x4036('0x275')](_0xcc57ff=>_0xcc57ff[_0x4036('0x754')]());},VisuMZ[_0x4036('0x600')][_0x4036('0x7ae')]=Window_ItemList[_0x4036('0x24d')][_0x4036('0xb6')],Window_ItemList[_0x4036('0x24d')][_0x4036('0xb6')]=function(){if(SceneManager[_0x4036('0x78a')]()){if(_0x4036('0x550')!==_0x4036('0x550')){function _0x3afef2(){const _0x487712=this[_0x4036('0x14f')],_0x425911=_0x339852[_0x4036('0x47f')](),_0x4c5a63=_0x2487d1['x']+_0x39e9f4[_0x4036('0x5bd')](_0x434db6[_0x4036('0x42')]/0x2)+_0x425911;_0x487712['x']=_0x487712['width']/-0x2+_0x4c5a63,_0x487712['y']=_0x222fa2[_0x4036('0x5bd')](_0x2a6aa9['height']/0x2);}}else{if(SceneManager[_0x4036('0x423')][_0x4036('0x203')]()==='border'){if(_0x4036('0x424')==='YkWRA')return VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x650')][_0x4036('0x427')];else{function _0x49cb73(){this[_0x4036('0x5cc')]();}}}else return VisuMZ['BattleCore']['Settings'][_0x4036('0x650')][_0x4036('0x4f4')];}}else return VisuMZ[_0x4036('0x600')][_0x4036('0x7ae')][_0x4036('0x286')](this);},VisuMZ['BattleCore'][_0x4036('0x5c0')]=Window_SkillList['prototype'][_0x4036('0xb6')],Window_SkillList[_0x4036('0x24d')][_0x4036('0xb6')]=function(){if(SceneManager[_0x4036('0x78a')]()){if(SceneManager[_0x4036('0x423')][_0x4036('0x203')]()===_0x4036('0x516')){if('eWVMa'===_0x4036('0x36f')){function _0x3dd68c(){_0x355cdb[_0x4036('0x600')][_0x4036('0x3e2')]['call'](this),this[_0x4036('0x4e')](),this[_0x4036('0x1f7')]();}}else return VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x650')][_0x4036('0x427')];}else return VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x650')][_0x4036('0x4f4')];}else{if(_0x4036('0x79b')===_0x4036('0x79b'))return VisuMZ[_0x4036('0x600')][_0x4036('0x5c0')][_0x4036('0x286')](this);else{function _0x37d9d1(){return![];}}}},VisuMZ[_0x4036('0x600')]['Window_Options_addGeneralOptions']=Window_Options[_0x4036('0x24d')][_0x4036('0x4bf')],Window_Options[_0x4036('0x24d')][_0x4036('0x4bf')]=function(){VisuMZ[_0x4036('0x600')][_0x4036('0x172')][_0x4036('0x286')](this),this[_0x4036('0x4fa')](),this[_0x4036('0x2e2')]();},Window_Options['prototype'][_0x4036('0x4fa')]=function(){VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x7e6')][_0x4036('0x10')]&&(this[_0x4036('0x160')](),this[_0x4036('0x4bc')]());},Window_Options['prototype'][_0x4036('0x2e2')]=function(){if(!VisuMZ[_0x4036('0x600')][_0x4036('0x635')]['HpGauge']['AddHpGaugeOption'])return;const _0x1d2c35=TextManager[_0x4036('0x7e7')],_0x584809=_0x4036('0x7e7');this['addCommand'](_0x1d2c35,_0x584809);},Window_Options[_0x4036('0x24d')][_0x4036('0x160')]=function(){const _0x5cfc94=TextManager['autoBattleStart'],_0x1f1d7b=_0x4036('0xb5');this['addCommand'](_0x5cfc94,_0x1f1d7b);},Window_Options[_0x4036('0x24d')][_0x4036('0x4bc')]=function(){const _0x26a0f0=TextManager[_0x4036('0x7f2')],_0x312a9c=_0x4036('0x26f');this[_0x4036('0x1e2')](_0x26a0f0,_0x312a9c);},VisuMZ[_0x4036('0x600')][_0x4036('0x279')]=Window_Options['prototype'][_0x4036('0x436')],Window_Options[_0x4036('0x24d')][_0x4036('0x436')]=function(_0x5f3324){const _0x4f111a=this[_0x4036('0x7a5')](_0x5f3324);return _0x4f111a===_0x4036('0x26f')?this[_0x4036('0x37a')]():VisuMZ[_0x4036('0x600')][_0x4036('0x279')][_0x4036('0x286')](this,_0x5f3324);},Window_Options[_0x4036('0x24d')][_0x4036('0x37a')]=function(){const _0x1ff69a=VisuMZ['BattleCore'][_0x4036('0x635')]['AutoBattle'],_0x5b398f=this[_0x4036('0x100')](_0x4036('0x26f'));return _0x5b398f?_0x1ff69a['StyleON']:_0x1ff69a[_0x4036('0x83')];},Window_ShopStatus[_0x4036('0x24d')][_0x4036('0x2ef')]=function(){const _0x50bd59=DataManager[_0x4036('0x165')](this[_0x4036('0x639')]),_0x366648=VisuMZ[_0x4036('0x3b')][_0x50bd59];if(!_0x366648)return this[_0x4036('0x230')]();const _0x188bd8=_0x4036('0x2c4')['format'](this[_0x4036('0x639')][_0x4036('0xd4')][_0x4036('0x3ce')]),_0x229174=[null,TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp']][this[_0x4036('0x639')][_0x4036('0xd4')]['type']];return _0x366648[_0x188bd8][_0x4036('0x4d2')](_0x229174);},Window_ShopStatus['prototype'][_0x4036('0x300')]=function(){const _0x5ec7ac=DataManager[_0x4036('0x165')](this[_0x4036('0x639')]),_0x51025c=VisuMZ['DamageStyles'][_0x5ec7ac];if(!_0x51025c)return this[_0x4036('0x237')]();return _0x51025c[_0x4036('0x4e4')]['call'](this);},VisuMZ[_0x4036('0x600')][_0x4036('0xbb')]=Window_PartyCommand[_0x4036('0x24d')][_0x4036('0x261')],Window_PartyCommand[_0x4036('0x24d')][_0x4036('0x261')]=function(_0x4696fd){VisuMZ[_0x4036('0x600')][_0x4036('0xbb')][_0x4036('0x286')](this,_0x4696fd),this[_0x4036('0x44f')](_0x4696fd);},Window_PartyCommand[_0x4036('0x24d')]['createCommandNameWindow']=function(_0x4cf5ed){const _0x4ec3f7=new Rectangle(0x0,0x0,_0x4cf5ed[_0x4036('0x42')],_0x4cf5ed[_0x4036('0x28f')]);this[_0x4036('0x14f')]=new Window_Base(_0x4ec3f7),this[_0x4036('0x14f')][_0x4036('0x57b')]=0x0,this[_0x4036('0x356')](this[_0x4036('0x14f')]),this[_0x4036('0x76')]();},Window_PartyCommand[_0x4036('0x24d')][_0x4036('0x640')]=function(){Window_Command['prototype']['callUpdateHelp'][_0x4036('0x286')](this);if(this[_0x4036('0x14f')])this[_0x4036('0x76')]();},Window_PartyCommand[_0x4036('0x24d')][_0x4036('0x76')]=function(){const _0x40ed60=this[_0x4036('0x14f')];_0x40ed60[_0x4036('0xe8')][_0x4036('0x47b')]();const _0x376266=this[_0x4036('0x57d')](this[_0x4036('0x4fd')]());if(_0x376266===_0x4036('0x75f')&&this['maxItems']()>0x0){const _0x21af80=this[_0x4036('0x651')](this[_0x4036('0x4fd')]());let _0x52ca7f=this['commandName'](this[_0x4036('0x4fd')]());_0x52ca7f=_0x52ca7f[_0x4036('0x7cc')](/\\I\[(\d+)\]/gi,''),_0x40ed60[_0x4036('0x408')](),this[_0x4036('0x1e0')](_0x52ca7f,_0x21af80),this[_0x4036('0x824')](_0x52ca7f,_0x21af80),this['commandNameWindowCenter'](_0x52ca7f,_0x21af80);}},Window_PartyCommand[_0x4036('0x24d')][_0x4036('0x1e0')]=function(_0x1806ba,_0x451b8e){},Window_PartyCommand[_0x4036('0x24d')]['commandNameWindowDrawText']=function(_0x5601e4,_0x5073d0){const _0x592e80=this['_commandNameWindow'];_0x592e80[_0x4036('0x25f')](_0x5601e4,0x0,_0x5073d0['y'],_0x592e80['innerWidth'],_0x4036('0x723'));},Window_PartyCommand['prototype'][_0x4036('0x732')]=function(_0x42ec5b,_0xf1f287){const _0x1b400e=this[_0x4036('0x14f')],_0x41bbe4=$gameSystem[_0x4036('0x47f')](),_0x23ad6e=_0xf1f287['x']+Math[_0x4036('0x5bd')](_0xf1f287['width']/0x2)+_0x41bbe4;_0x1b400e['x']=_0x1b400e['width']/-0x2+_0x23ad6e,_0x1b400e['y']=Math[_0x4036('0x5bd')](_0xf1f287['height']/0x2);},Window_PartyCommand[_0x4036('0x24d')][_0x4036('0x19b')]=function(){this[_0x4036('0x58f')](),this[_0x4036('0x63e')](),this[_0x4036('0x35a')](),this[_0x4036('0x1cb')](),this[_0x4036('0x783')]();},Window_PartyCommand['prototype'][_0x4036('0x58f')]=function(){const _0x560ffe=this[_0x4036('0x663')](),_0x191461=VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x20')][_0x4036('0x46d')],_0x537467=_0x560ffe===_0x4036('0x45f')?TextManager[_0x4036('0x59d')]:'\x5cI[%1]%2'[_0x4036('0x4d2')](_0x191461,TextManager[_0x4036('0x59d')]),_0x234c35=this[_0x4036('0x4fc')]();this[_0x4036('0x1e2')](_0x537467,_0x4036('0x59d'),_0x234c35);},Window_PartyCommand[_0x4036('0x24d')]['isFightCommandEnabled']=function(){return!![];},Window_PartyCommand[_0x4036('0x24d')][_0x4036('0x63e')]=function(){if(!this[_0x4036('0x26b')]())return;const _0x14116d=this[_0x4036('0x663')](),_0x4a4458=VisuMZ['BattleCore']['Settings'][_0x4036('0x20')]['CmdIconAutoBattle'],_0x37703f=_0x14116d===_0x4036('0x45f')?TextManager[_0x4036('0x52d')]:_0x4036('0x7fa')[_0x4036('0x4d2')](_0x4a4458,TextManager[_0x4036('0x52d')]),_0x4e7214=this['isAutoBattleCommandEnabled']();this['addCommand'](_0x37703f,_0x4036('0x52d'),_0x4e7214);},Window_PartyCommand[_0x4036('0x24d')][_0x4036('0x26b')]=function(){return VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x20')][_0x4036('0x769')];},Window_PartyCommand[_0x4036('0x24d')][_0x4036('0x5cb')]=function(){return!![];},Window_PartyCommand['prototype'][_0x4036('0x35a')]=function(){},Window_PartyCommand[_0x4036('0x24d')][_0x4036('0x1cb')]=function(){if(!this[_0x4036('0x70b')]())return;const _0x1043d9=this[_0x4036('0x663')](),_0x5bbeee=VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x20')][_0x4036('0x52c')],_0x5cc262=_0x1043d9===_0x4036('0x45f')?TextManager[_0x4036('0x3a3')]:_0x4036('0x7fa')['format'](_0x5bbeee,TextManager[_0x4036('0x3a3')]),_0x50b2f6=this[_0x4036('0xc8')]();this[_0x4036('0x1e2')](_0x5cc262,_0x4036('0x3a3'),_0x50b2f6);},Window_PartyCommand[_0x4036('0x24d')][_0x4036('0x70b')]=function(){return VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x20')]['CommandAddOptions'];},Window_PartyCommand[_0x4036('0x24d')][_0x4036('0xc8')]=function(){return!![];},Window_PartyCommand[_0x4036('0x24d')]['addEscapeCommand']=function(){const _0x22c1df=this['commandStyle'](),_0x2a75db=VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x20')][_0x4036('0x4ac')],_0x402614=_0x22c1df===_0x4036('0x45f')?TextManager[_0x4036('0x13')]:_0x4036('0x7fa')[_0x4036('0x4d2')](_0x2a75db,TextManager['escape']),_0x210ec7=this[_0x4036('0x42c')]();this[_0x4036('0x1e2')](_0x402614,_0x4036('0x13'),_0x210ec7);},Window_PartyCommand[_0x4036('0x24d')][_0x4036('0x42c')]=function(){return BattleManager[_0x4036('0x54a')]();},Window_PartyCommand['prototype'][_0x4036('0x82f')]=function(){return VisuMZ[_0x4036('0x600')][_0x4036('0x635')]['PartyCmd']['CmdTextAlign'];},Window_PartyCommand['prototype'][_0x4036('0x86')]=function(_0x2a8803){const _0xe8cbe=this[_0x4036('0x57d')](_0x2a8803);if(_0xe8cbe===_0x4036('0x28b'))this[_0x4036('0x35')](_0x2a8803);else{if(_0xe8cbe===_0x4036('0x75f'))this[_0x4036('0x420')](_0x2a8803);else{if('WOmld'===_0x4036('0x41d'))Window_Command[_0x4036('0x24d')][_0x4036('0x86')]['call'](this,_0x2a8803);else{function _0x427b6b(){return!![];}}}}},Window_PartyCommand[_0x4036('0x24d')][_0x4036('0x663')]=function(){return VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x20')][_0x4036('0x20c')];},Window_PartyCommand[_0x4036('0x24d')][_0x4036('0x57d')]=function(_0x3a56d6){if(_0x3a56d6<0x0)return _0x4036('0x45f');const _0x5f08ab=this[_0x4036('0x663')]();if(_0x5f08ab!==_0x4036('0x6a4'))return _0x5f08ab;else{if(this[_0x4036('0x24e')]()>0x0){const _0x2e6e78=this[_0x4036('0x6a5')](_0x3a56d6);if(_0x2e6e78[_0x4036('0x161')](/\\I\[(\d+)\]/i)){const _0x3a867b=this[_0x4036('0x651')](_0x3a56d6),_0x4eca0b=this[_0x4036('0x40c')](_0x2e6e78)[_0x4036('0x42')];if(_0x4eca0b<=_0x3a867b[_0x4036('0x42')]){if(_0x4036('0x39f')!==_0x4036('0x714'))return'iconText';else{function _0x379ebd(){if(this[_0x4036('0x20a')]===_0x24ad37)this[_0x4036('0x137')]();this[_0x4036('0x20a')]=_0x53c420;if(_0x16d18d[_0x4036('0x78a')]()&&_0x5865ad[_0x4036('0x6a7')]()[_0x4036('0x747')](this)){const _0x3d1db4=_0x2bbc84[_0x4036('0x423')]['_statusWindow'];if(_0x3d1db4)_0x3d1db4[_0x4036('0x5fd')](this);}}}}else return _0x4036('0x75f');}}}return _0x4036('0x45f');},Window_PartyCommand[_0x4036('0x24d')]['drawItemStyleIconText']=function(_0x584dff){const _0x367bc8=this[_0x4036('0x651')](_0x584dff),_0x5ecb7b=this[_0x4036('0x6a5')](_0x584dff),_0x55ec91=this[_0x4036('0x40c')](_0x5ecb7b)[_0x4036('0x42')];this[_0x4036('0x816')](this[_0x4036('0x717')](_0x584dff));const _0x4f1fb6=this[_0x4036('0x82f')]();if(_0x4f1fb6===_0x4036('0x40e')){if(_0x4036('0x62a')!==_0x4036('0x62a')){function _0x265d36(){_0x146bd7[_0x4036('0x643')](0x0,0x0,_0xb8d448[_0x4036('0x76f')][_0x4036('0x42')],this[_0x4036('0x76f')][_0x4036('0x28f')]);}}else this['drawTextEx'](_0x5ecb7b,_0x367bc8['x']+_0x367bc8[_0x4036('0x42')]-_0x55ec91,_0x367bc8['y'],_0x55ec91);}else{if(_0x4f1fb6===_0x4036('0x723')){if(_0x4036('0x821')!==_0x4036('0x821')){function _0xaaf941(){this['_mainSprite'][_0x4036('0x76f')][_0x4036('0xf5')]=this[_0x4036('0x2c9')][_0x4036('0x274')]();}}else{const _0x59170c=_0x367bc8['x']+Math[_0x4036('0x5bd')]((_0x367bc8[_0x4036('0x42')]-_0x55ec91)/0x2);this[_0x4036('0x5bb')](_0x5ecb7b,_0x59170c,_0x367bc8['y'],_0x55ec91);}}else{if(_0x4036('0x225')!==_0x4036('0x225')){function _0x51f675(){if(!_0x1a4a47[_0x4036('0x600')]['Settings'][_0x4036('0x7a1')][_0x4036('0x7ca')])return;const _0xd6753f=_0xcc895c[_0x4036('0x7e7')],_0x44d4c9=_0x4036('0x7e7');this[_0x4036('0x1e2')](_0xd6753f,_0x44d4c9);}}else this['drawTextEx'](_0x5ecb7b,_0x367bc8['x'],_0x367bc8['y'],_0x55ec91);}}},Window_PartyCommand[_0x4036('0x24d')][_0x4036('0x420')]=function(_0x4d9dd2){this[_0x4036('0x6a5')](_0x4d9dd2)[_0x4036('0x161')](/\\I\[(\d+)\]/i);const _0x4b2b54=Number(RegExp['$1'])||0x0,_0x290d2f=this[_0x4036('0x651')](_0x4d9dd2),_0x1d2126=_0x290d2f['x']+Math[_0x4036('0x5bd')]((_0x290d2f[_0x4036('0x42')]-ImageManager[_0x4036('0x58d')])/0x2),_0x17087c=_0x290d2f['y']+(_0x290d2f[_0x4036('0x28f')]-ImageManager['iconHeight'])/0x2;this['drawIcon'](_0x4b2b54,_0x1d2126,_0x17087c);},Window_PartyCommand[_0x4036('0x24d')][_0x4036('0x755')]=function(){},Window_PartyCommand[_0x4036('0x24d')]['activate']=function(){Window_Command[_0x4036('0x24d')][_0x4036('0x19f')][_0x4036('0x286')](this);const _0x4ff6d2=this[_0x4036('0x203')]();_0x4ff6d2==='border'&&this[_0x4036('0x68e')]();},Window_PartyCommand[_0x4036('0x24d')][_0x4036('0x203')]=function(){if(this[_0x4036('0x16c')])return this[_0x4036('0x16c')];return this[_0x4036('0x16c')]=SceneManager[_0x4036('0x423')][_0x4036('0x203')](),this[_0x4036('0x16c')];},Window_PartyCommand['prototype'][_0x4036('0x235')]=function(){const _0x17417c=VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x20')],_0x25e5b7=this['currentSymbol']();switch(_0x25e5b7){case _0x4036('0x59d'):this[_0x4036('0x11d')][_0x4036('0x72d')](_0x17417c[_0x4036('0x113')]);break;case'autoBattle':this[_0x4036('0x11d')]['setText'](_0x17417c[_0x4036('0x3e0')]);break;case'options':this[_0x4036('0x11d')]['setText'](_0x17417c[_0x4036('0x292')]);break;case'escape':this['_helpWindow']['setText'](_0x17417c[_0x4036('0x48d')]);break;default:this[_0x4036('0x11d')][_0x4036('0x72d')]('');break;}},VisuMZ[_0x4036('0x600')][_0x4036('0x178')]=Window_ActorCommand[_0x4036('0x24d')][_0x4036('0x261')],Window_ActorCommand[_0x4036('0x24d')][_0x4036('0x261')]=function(_0x334619){VisuMZ[_0x4036('0x600')][_0x4036('0x178')]['call'](this,_0x334619),this['createCommandNameWindow'](_0x334619);},Window_ActorCommand[_0x4036('0x24d')][_0x4036('0x44f')]=function(_0x570674){const _0x415139=new Rectangle(0x0,0x0,_0x570674[_0x4036('0x42')],_0x570674[_0x4036('0x28f')]);this[_0x4036('0x14f')]=new Window_Base(_0x415139),this[_0x4036('0x14f')]['opacity']=0x0,this[_0x4036('0x356')](this['_commandNameWindow']),this['updateCommandNameWindow']();},Window_ActorCommand[_0x4036('0x24d')][_0x4036('0x640')]=function(){Window_Command['prototype'][_0x4036('0x640')][_0x4036('0x286')](this);if(this[_0x4036('0x14f')])this[_0x4036('0x76')]();},Window_ActorCommand[_0x4036('0x24d')][_0x4036('0x76')]=function(){const _0x555c26=this[_0x4036('0x14f')];_0x555c26[_0x4036('0xe8')]['clear']();const _0x101905=this[_0x4036('0x57d')](this[_0x4036('0x4fd')]());return;if(_0x101905===_0x4036('0x75f')&&this[_0x4036('0x24e')]()>0x0){const _0x2ced87=this[_0x4036('0x651')](this[_0x4036('0x4fd')]());let _0x45a305=this['commandName'](this['index']());_0x45a305=_0x45a305[_0x4036('0x7cc')](/\\I\[(\d+)\]/gi,''),_0x555c26[_0x4036('0x408')](),this[_0x4036('0x1e0')](_0x45a305,_0x2ced87),this[_0x4036('0x824')](_0x45a305,_0x2ced87),this['commandNameWindowCenter'](_0x45a305,_0x2ced87);}},Window_ActorCommand[_0x4036('0x24d')]['commandNameWindowDrawBackground']=function(_0x242f61,_0x3a4684){},Window_ActorCommand[_0x4036('0x24d')][_0x4036('0x824')]=function(_0x5aca45,_0x527c44){const _0x35feb8=this[_0x4036('0x14f')];_0x35feb8[_0x4036('0x25f')](_0x5aca45,0x0,_0x527c44['y'],_0x35feb8[_0x4036('0x3de')],_0x4036('0x723'));},Window_ActorCommand[_0x4036('0x24d')][_0x4036('0x732')]=function(_0x2066a0,_0x58a108){const _0x18beb9=this[_0x4036('0x14f')],_0x2d71c1=$gameSystem[_0x4036('0x47f')](),_0x58181b=_0x58a108['x']+Math[_0x4036('0x5bd')](_0x58a108[_0x4036('0x42')]/0x2)+_0x2d71c1;_0x18beb9['x']=_0x18beb9[_0x4036('0x42')]/-0x2+_0x58181b,_0x18beb9['y']=Math[_0x4036('0x5bd')](_0x58a108['height']/0x2);},Window_ActorCommand['prototype'][_0x4036('0x19b')]=function(){if(!this[_0x4036('0x7a2')])return;const _0x591325=this[_0x4036('0x7a2')][_0x4036('0x660')]();for(const _0x2991bd of _0x591325){this[_0x4036('0x2ea')](_0x2991bd[_0x4036('0x6bc')]()[_0x4036('0x330')]());}},Window_ActorCommand['prototype'][_0x4036('0x2ea')]=function(_0x4abf56){_0x4abf56===_0x4036('0x294')&&this['addAttackCommand']();[_0x4036('0x256'),_0x4036('0x633')][_0x4036('0x747')](_0x4abf56)&&this[_0x4036('0x7ed')]();_0x4abf56==='GUARD'&&this['addGuardCommand']();_0x4abf56===_0x4036('0x38')&&this['addItemCommand']();if(_0x4abf56===_0x4036('0x7a9')){if('ciwup'===_0x4036('0x19e')){function _0x21a371(){_0x32dd65=_0x394cde[_0x4036('0x6d7')]((_0x5aba00,_0x2c12cd)=>_0x5aba00*(0x1-_0x2c12cd),_0x1f4ff1);}}else this[_0x4036('0x783')]();}_0x4abf56===_0x4036('0x48')&&this[_0x4036('0x63e')]();if(_0x4abf56[_0x4036('0x161')](/STYPE: (\d+)/i)){if('tdNpZ'!==_0x4036('0x220')){const _0x1ae6f6=Number(RegExp['$1']);this[_0x4036('0x4c2')](_0x1ae6f6);}else{function _0x596893(){_0x2d33fb=this[_0x4036('0x590')][this[_0x4036('0x590')][_0x4036('0x6b5')]-0x1];}}}else{if(_0x4abf56[_0x4036('0x161')](/STYPE: (.*)/i)){const _0x2c7998=DataManager[_0x4036('0x18')](RegExp['$1']);this['addSkillTypeCommand'](_0x2c7998);}}_0x4abf56===_0x4036('0x1a2')&&this[_0x4036('0x6e9')]();if(_0x4abf56[_0x4036('0x161')](/SKILL: (\d+)/i)){const _0x1c437f=Number(RegExp['$1']);this[_0x4036('0x7d1')]($dataSkills[_0x1c437f]);}else{if(_0x4abf56[_0x4036('0x161')](/SKILL: (.*)/i)){if(_0x4036('0x481')!==_0x4036('0x189')){const _0x2c8bcd=DataManager['getSkillIdWithName'](RegExp['$1']);this['addSingleSkillCommand']($dataSkills[_0x2c8bcd]);}else{function _0x5eb782(){const _0x58c305=_0x14ea0c[_0x4036('0x2bf')](_0x286ea5);_0x58c305[_0x4036('0x7b1')]=![],_0x58c305[_0x4036('0x3bc')]=0x0,this[_0x4036('0x7af')][_0x4036('0x5d7')](_0x58c305);}}}}_0x4abf56===_0x4036('0x3cb')&&Imported[_0x4036('0x4a7')]&&this[_0x4036('0x1ed')]();},Window_ActorCommand[_0x4036('0x24d')][_0x4036('0x6ab')]=function(){const _0x2edc1d=$dataSkills[this['_actor'][_0x4036('0x2e1')]()];if(!_0x2edc1d)return;if(!this[_0x4036('0x4f5')](_0x2edc1d))return;const _0x264879=this[_0x4036('0x663')](),_0x54ccd4=DataManager['battleCommandName'](_0x2edc1d),_0x573044=DataManager[_0x4036('0x65e')](_0x2edc1d),_0x3a4f08=_0x264879===_0x4036('0x45f')?_0x54ccd4:_0x4036('0x7fa')[_0x4036('0x4d2')](_0x573044,_0x54ccd4);this[_0x4036('0x1e2')](_0x3a4f08,_0x4036('0x676'),this['_actor'][_0x4036('0x158')]());},Window_ActorCommand[_0x4036('0x24d')][_0x4036('0x2b3')]=function(){const _0x42fbc6=$dataSkills[this[_0x4036('0x7a2')][_0x4036('0xd5')]()];if(!_0x42fbc6)return;if(!this[_0x4036('0x4f5')](_0x42fbc6))return;const _0x42a302=this[_0x4036('0x663')](),_0x19fcee=DataManager['battleCommandName'](_0x42fbc6),_0x375886=DataManager[_0x4036('0x65e')](_0x42fbc6),_0x2f6e2e=_0x42a302===_0x4036('0x45f')?_0x19fcee:_0x4036('0x7fa')[_0x4036('0x4d2')](_0x375886,_0x19fcee);this[_0x4036('0x1e2')](_0x2f6e2e,_0x4036('0x342'),this[_0x4036('0x7a2')][_0x4036('0x443')]());},Window_ActorCommand[_0x4036('0x24d')][_0x4036('0x1f2')]=function(){const _0x2dbdf2=this[_0x4036('0x663')](),_0x542b69=VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x3e3')][_0x4036('0x2e6')],_0x1c5d96=_0x2dbdf2===_0x4036('0x45f')?TextManager['item']:_0x4036('0x7fa')['format'](_0x542b69,TextManager[_0x4036('0x13a')]),_0x458ab4=this[_0x4036('0x182')]();this[_0x4036('0x1e2')](_0x1c5d96,_0x4036('0x13a'),_0x458ab4);},Window_ActorCommand['prototype']['isItemCommandEnabled']=function(){return this[_0x4036('0x7a2')]&&this[_0x4036('0x7a2')]['canUseItemCommand']();},Window_ActorCommand[_0x4036('0x24d')][_0x4036('0x7ed')]=function(){const _0x438c68=this[_0x4036('0x7a2')][_0x4036('0xe7')]();for(const _0x4feb60 of _0x438c68){if(_0x4036('0x34e')===_0x4036('0x5a2')){function _0x3a285a(){const _0x84e8f7=this[_0x4036('0x203')]();(_0x84e8f7===_0x4036('0x516')||this[_0x4036('0x176')]())&&(this[_0x4036('0x538')][_0x4036('0x2f4')](),this[_0x4036('0x538')][_0x4036('0x2fc')]&&this[_0x4036('0x538')][_0x4036('0x297')](),this[_0x4036('0x1c8')][_0x4036('0x2f4')](),this[_0x4036('0x1c8')][_0x4036('0x2fc')]&&this[_0x4036('0x1c8')]['show']());}}else this[_0x4036('0x4c2')](_0x4feb60);}},Window_ActorCommand['prototype'][_0x4036('0x4c2')]=function(_0x38748c){let _0x178453=$dataSystem[_0x4036('0xe7')][_0x38748c];if(!_0x178453)return;let _0x18c989=_0x178453;const _0x26171a=this[_0x4036('0x663')]();if(_0x26171a===_0x4036('0x45f'))_0x18c989=_0x18c989[_0x4036('0x7cc')](/\x1I\[(\d+)\]/gi,''),_0x18c989=_0x18c989[_0x4036('0x7cc')](/\\I\[(\d+)\]/gi,'');else{if(!_0x178453[_0x4036('0x161')](/\\I\[(\d+)\]/i)){if(_0x4036('0x7e')===_0x4036('0x7e')){const _0x3cc861=Imported[_0x4036('0x6c7')]?VisuMZ['SkillsStatesCore'][_0x4036('0x635')][_0x4036('0x554')]:VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x3e3')],_0x4b687f=$dataSystem['magicSkills'][_0x4036('0x747')](_0x38748c),_0x3954=_0x4b687f?_0x3cc861[_0x4036('0x1ec')]:_0x3cc861[_0x4036('0xd2')];_0x18c989=_0x4036('0x7fa')[_0x4036('0x4d2')](_0x3954,_0x178453);}else{function _0x2083ea(){_0x872c87=_0x4593bc[_0x4036('0x304')]()[_0x4036('0x13b')],_0x3c0e77=_0x4f0f2d[_0x4036('0x304')]()['_homeY'];}}}}this[_0x4036('0x1e2')](_0x18c989,_0x4036('0x6ed'),!![],_0x38748c);},Window_ActorCommand['prototype'][_0x4036('0x6e9')]=function(){const _0x2395a5=this[_0x4036('0x7a2')][_0x4036('0xe7')](),_0x2efc26=this[_0x4036('0x7a2')][_0x4036('0x4ec')]();for(const _0x599aa5 of _0x2efc26){if('vgVQX'!==_0x4036('0x54')){if(!_0x599aa5)continue;if(Imported[_0x4036('0x6c7')]){if(_0x4036('0xde')===_0x4036('0x39c')){function _0x55619b(){_0x28d072[_0x4036('0x600')][_0x4036('0x426')][_0x4036('0x286')](this),this[_0x4036('0x66e')]();}}else{const _0x3cf693=_0x2395a5[_0x4036('0x3c4')](_0xc41802=>DataManager[_0x4036('0x66d')](_0x599aa5)['includes'](_0xc41802));if(_0x3cf693[_0x4036('0x6b5')]<=0x0)continue;}}else{if(!_0x2395a5['includes'](_0x599aa5[_0x4036('0x1fc')]))continue;}this[_0x4036('0x7d1')](_0x599aa5);}else{function _0x542692(){_0x5c043f['reserveCommonEvent'](_0x3bd6fe[_0x469470]);}}}},Window_ActorCommand[_0x4036('0x24d')][_0x4036('0x7d1')]=function(_0x3570c1){if(!_0x3570c1)return;if(!this[_0x4036('0x4f5')](_0x3570c1))return;const _0x1f0012=this[_0x4036('0x663')](),_0x186a4a=DataManager[_0x4036('0x68b')](_0x3570c1),_0x43b535=DataManager[_0x4036('0x65e')](_0x3570c1),_0x323e12=_0x1f0012===_0x4036('0x45f')?_0x186a4a:_0x4036('0x7fa')[_0x4036('0x4d2')](_0x43b535,_0x186a4a),_0x316429=this[_0x4036('0x7a2')][_0x4036('0x55a')](_0x3570c1);this[_0x4036('0x1e2')](_0x323e12,_0x4036('0x226'),_0x316429,_0x3570c1['id']);},Window_ActorCommand[_0x4036('0x24d')]['canAddSkillCommand']=function(_0x2202ad){const _0x1d4904=_0x2202ad[_0x4036('0x826')];if(_0x1d4904[_0x4036('0x161')](/<COMMAND REQUIRE LEARN>/i)){if(!this[_0x4036('0x7a2')]['isLearnedSkill'](_0x2202ad['id']))return![];}if(_0x1d4904[_0x4036('0x161')](/<COMMAND REQUIRE ACCESS>/i)){if('RhwLl'===_0x4036('0x299')){if(!this[_0x4036('0x7a2')][_0x4036('0x71c')](_0x2202ad['id']))return![];}else{function _0x81a240(){this[_0x4036('0x32b')]['removeChild'](_0x594fc1);}}}const _0x3ea65a=VisuMZ['BattleCore'][_0x4036('0x435')](_0x2202ad,_0x4036('0x611'));if(VisuMZ[_0x4036('0x600')]['JS'][_0x3ea65a]){if(_0x4036('0x678')!==_0x4036('0x678')){function _0x5912f0(){return _0xe0e8b1[_0x4036('0x7b5')]?_0x3fb451[_0x4036('0x553')]('ok'):_0x416c28[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x7e6')][_0x4036('0x50')];}}else{if(!VisuMZ['BattleCore']['JS'][_0x3ea65a]['call'](this,this[_0x4036('0x7a2')],_0x2202ad))return![];}}return VisuMZ['BattleCore'][_0x4036('0x139')](_0x2202ad);},VisuMZ[_0x4036('0x600')][_0x4036('0x139')]=function(_0x8b2613){const _0x4f4c4e=_0x8b2613[_0x4036('0x826')];if(_0x4f4c4e[_0x4036('0x161')](/<COMMAND SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3a969a=JSON[_0x4036('0x3d1')]('['+RegExp['$1'][_0x4036('0x161')](/\d+/g)+']');for(const _0x2fb2ec of _0x3a969a){if(_0x4036('0x1f1')!==_0x4036('0x163')){if(!$gameSwitches[_0x4036('0xa8')](_0x2fb2ec))return![];}else{function _0x2d98fe(){this[_0x4036('0x80e')][_0x4036('0x76f')]=_0x489b90['loadSvEnemy'](_0x391552);}}}return!![];}if(_0x4f4c4e[_0x4036('0x161')](/<COMMAND SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('vLQtA'===_0x4036('0x2ce')){function _0x258351(){this['performAttack']();}}else{const _0x249b56=JSON[_0x4036('0x3d1')]('['+RegExp['$1'][_0x4036('0x161')](/\d+/g)+']');for(const _0x5b2ff2 of _0x249b56){if(!$gameSwitches[_0x4036('0xa8')](_0x5b2ff2))return![];}return!![];}}if(_0x4f4c4e[_0x4036('0x161')](/<COMMAND SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5346a2=JSON[_0x4036('0x3d1')]('['+RegExp['$1'][_0x4036('0x161')](/\d+/g)+']');for(const _0x1428d6 of _0x5346a2){if($gameSwitches[_0x4036('0xa8')](_0x1428d6))return!![];}return![];}if(_0x4f4c4e[_0x4036('0x161')](/<COMMAND HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('KFcJs'!==_0x4036('0x250')){const _0x428431=JSON[_0x4036('0x3d1')]('['+RegExp['$1'][_0x4036('0x161')](/\d+/g)+']');for(const _0x4cab29 of _0x428431){if(!$gameSwitches['value'](_0x4cab29))return!![];}return![];}else{function _0x39c7eb(){const _0x4e1434=_0x48d706[0x0][_0x4036('0x4d2')](_0x7c308[0x0],_0x10b0a6[0x0]),_0x2d7811=_0x42e8e3[0x1][_0x4036('0x4d2')](_0x619d9a[0x1],_0x46b1a3[0x1])[_0x4036('0x330')](),_0x277d5b=new _0x33adcd(_0x2b0be6[_0x4036('0x4d2')](_0x2d7811),'i');_0x365d7f[_0x4e1434]=_0x277d5b;}}}if(_0x4f4c4e[_0x4036('0x161')](/<COMMAND HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x4036('0x2bb')!==_0x4036('0x2bb')){function _0x404d5b(){this[_0x4036('0x7d4')](_0x4036('0x733'));}}else{const _0x39a142=JSON[_0x4036('0x3d1')]('['+RegExp['$1'][_0x4036('0x161')](/\d+/g)+']');for(const _0x23f727 of _0x39a142){if(!$gameSwitches[_0x4036('0xa8')](_0x23f727))return!![];}return![];}}if(_0x4f4c4e['match'](/<COMMAND HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x28a089=JSON['parse']('['+RegExp['$1'][_0x4036('0x161')](/\d+/g)+']');for(const _0x1e220e of _0x28a089){if(_0x4036('0x4ab')!==_0x4036('0x697')){if($gameSwitches['value'](_0x1e220e))return![];}else{function _0x35c84c(){_0x44bf77[_0x4036('0x24d')][_0x4036('0x6d8')][_0x4036('0x286')](this);const _0x4ae081=this[_0x4036('0x7a2')][_0x4036('0x152')]();this[_0x4036('0x2cc')]!==_0x4ae081&&(this['_battlerName']=_0x4ae081,this[_0x4036('0x80e')][_0x4036('0x76f')]=_0x2e3da9[_0x4036('0x815')](_0x4ae081)),this[_0x4036('0x80e')]&&this[_0x4036('0x80e')][_0x4036('0x76f')]&&this[_0x4036('0x2c9')]&&(this[_0x4036('0x80e')][_0x4036('0x76f')][_0x4036('0xf5')]=this[_0x4036('0x2c9')][_0x4036('0x274')]());}}}return!![];}return!![];},Window_ActorCommand['prototype'][_0x4036('0x783')]=function(){const _0x5072ef=this[_0x4036('0x663')](),_0x40c9f=VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x20')][_0x4036('0x4ac')],_0x64308=_0x5072ef===_0x4036('0x45f')?TextManager[_0x4036('0x13')]:_0x4036('0x7fa')[_0x4036('0x4d2')](_0x40c9f,TextManager[_0x4036('0x13')]),_0x5801b9=this[_0x4036('0x42c')]();this[_0x4036('0x1e2')](_0x64308,_0x4036('0x13'),_0x5801b9);},Window_ActorCommand['prototype'][_0x4036('0x42c')]=function(){return BattleManager[_0x4036('0x54a')]();},Window_ActorCommand[_0x4036('0x24d')][_0x4036('0x63e')]=function(){const _0xeb1bf7=this[_0x4036('0x663')](),_0x53fe5e=VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x20')][_0x4036('0x7fc')],_0x24de70=_0xeb1bf7==='text'?TextManager[_0x4036('0x52d')]:_0x4036('0x7fa')[_0x4036('0x4d2')](_0x53fe5e,TextManager[_0x4036('0x52d')]),_0xe1a431=this[_0x4036('0x5cb')]();this[_0x4036('0x1e2')](_0x24de70,_0x4036('0x52d'),_0xe1a431);},Window_ActorCommand[_0x4036('0x24d')][_0x4036('0x5cb')]=function(){return!![];},Window_ActorCommand[_0x4036('0x24d')][_0x4036('0x82f')]=function(){return VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x3e3')][_0x4036('0x21f')];},Window_ActorCommand[_0x4036('0x24d')][_0x4036('0x86')]=function(_0x6051ae){const _0x4a47c3=this[_0x4036('0x57d')](_0x6051ae);if(_0x4a47c3==='iconText')this[_0x4036('0x35')](_0x6051ae);else _0x4a47c3===_0x4036('0x75f')?this[_0x4036('0x420')](_0x6051ae):Window_Command[_0x4036('0x24d')][_0x4036('0x86')][_0x4036('0x286')](this,_0x6051ae);this['drawSingleSkillCost'](_0x6051ae);},Window_ActorCommand[_0x4036('0x24d')]['commandStyle']=function(){return VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x3e3')][_0x4036('0x20c')];},Window_ActorCommand[_0x4036('0x24d')][_0x4036('0x57d')]=function(_0x314cde){if(_0x314cde<0x0)return'text';const _0x49ba42=this[_0x4036('0x663')]();if(_0x49ba42!==_0x4036('0x6a4')){if(_0x4036('0x72e')==='pStzE')return _0x49ba42;else{function _0x2a76b8(){const _0x2f3626=_0x5e4e1e['getDamageStyle'](this[_0x4036('0x639')]),_0x5410d3=_0x734ec[_0x4036('0x3b')][_0x2f3626];if(!_0x5410d3)return this[_0x4036('0x230')]();const _0x225154='DamageType%1'[_0x4036('0x4d2')](this[_0x4036('0x639')]['damage'][_0x4036('0x3ce')]),_0x44af9b=[null,_0x2b316a['hp'],_0x220305['mp'],_0x3c4168['hp'],_0x1067d0['mp'],_0x217fe9['hp'],_0x51ad8f['mp']][this['_item']['damage'][_0x4036('0x3ce')]];return _0x5410d3[_0x225154][_0x4036('0x4d2')](_0x44af9b);}}}else{if(this[_0x4036('0x24e')]()>0x0){if('SSLfX'===_0x4036('0x6d6')){function _0x17cd8d(){this['_cancelButton']['x']=_0x2cb3ec[_0x4036('0x42')]-(_0x59bbe7[_0x4036('0x42')]-_0x5a8835[_0x4036('0x316')])/0x2-this[_0x4036('0x20b')]['width']-0x4;}}else{const _0x554abc=this[_0x4036('0x6a5')](_0x314cde);if(_0x554abc[_0x4036('0x161')](/\\I\[(\d+)\]/i)){const _0x37e479=this['itemLineRect'](_0x314cde),_0x26de58=this[_0x4036('0x40c')](_0x554abc)['width'];return _0x26de58<=_0x37e479['width']?_0x4036('0x28b'):'icon';}}}}return _0x4036('0x45f');},Window_ActorCommand[_0x4036('0x24d')][_0x4036('0x35')]=function(_0xf9904b){const _0x5b359f=this[_0x4036('0x651')](_0xf9904b),_0x128b39=this[_0x4036('0x6a5')](_0xf9904b),_0x5eab52=this[_0x4036('0x40c')](_0x128b39)[_0x4036('0x42')];this['changePaintOpacity'](this[_0x4036('0x717')](_0xf9904b));const _0x286e8e=this[_0x4036('0x82f')]();if(_0x286e8e==='right')this['drawTextEx'](_0x128b39,_0x5b359f['x']+_0x5b359f['width']-_0x5eab52,_0x5b359f['y'],_0x5eab52);else{if(_0x286e8e===_0x4036('0x723')){const _0x3a69de=_0x5b359f['x']+Math['floor']((_0x5b359f[_0x4036('0x42')]-_0x5eab52)/0x2);this[_0x4036('0x5bb')](_0x128b39,_0x3a69de,_0x5b359f['y'],_0x5eab52);}else this[_0x4036('0x5bb')](_0x128b39,_0x5b359f['x'],_0x5b359f['y'],_0x5eab52);}},Window_ActorCommand[_0x4036('0x24d')]['drawItemStyleIcon']=function(_0x2766a3){this[_0x4036('0x6a5')](_0x2766a3)[_0x4036('0x161')](/\\I\[(\d+)\]/i);const _0x91a60c=Number(RegExp['$1'])||0x0,_0x453dc5=this[_0x4036('0x651')](_0x2766a3),_0x5cfbfc=_0x453dc5['x']+Math[_0x4036('0x5bd')]((_0x453dc5[_0x4036('0x42')]-ImageManager[_0x4036('0x58d')])/0x2),_0x4496a8=_0x453dc5['y']+(_0x453dc5['height']-ImageManager[_0x4036('0x32d')])/0x2;this[_0x4036('0x77d')](_0x91a60c,_0x5cfbfc,_0x4496a8);},Window_ActorCommand[_0x4036('0x24d')]['drawSingleSkillCost']=function(_0x5c1817){const _0x5231ab=this[_0x4036('0x7a5')](_0x5c1817);if(![_0x4036('0x676'),_0x4036('0x342'),_0x4036('0x226')][_0x4036('0x747')](_0x5231ab))return;const _0xc9f688=this[_0x4036('0x651')](_0x5c1817);let _0x7ac985=null;if(_0x5231ab===_0x4036('0x676')){if('IQFCf'===_0x4036('0x5c'))_0x7ac985=$dataSkills[this['_actor'][_0x4036('0x2e1')]()];else{function _0x18ae0f(){return _0x5db8ba[_0x4036('0xac')]()[_0x4036('0x6a0')]()[_0x4036('0x3c4')](_0x2fe1fe=>_0x2fe1fe!==_0x286db3);}}}else{if(_0x5231ab==='guard'){if(_0x4036('0x6dd')===_0x4036('0x54f')){function _0x19b3cf(){const _0x300620=_0x4036('0x6f')[_0x4036('0x4d2')](_0x3543aa['actorId']()),_0x419162=this['createInnerPortrait'](_0x300620,_0x3b7586),_0xa511ac=_0x6759c8['getBattlePortraitFilename']();_0xa511ac!==''?_0x419162['bitmap']=_0x2101e8[_0x4036('0x7c2')](_0xa511ac):_0x419162['bitmap']=_0x53e225[_0x4036('0x3e5')];const _0xb224b8=this['itemRect'](_0x38bc6a);_0x419162[_0x4036('0x240')]['x']=0.5,_0x419162[_0x4036('0x240')]['y']=0x1;const _0x4a4299=_0x467093[_0x4036('0x488')](_0xb224b8['x']+_0xb224b8[_0x4036('0x42')]/0x2)+this[_0x4036('0x4ad')],_0xdcb5a1=_0x57bb33[_0x4036('0x488')](this[_0x4036('0x28f')]);_0x419162[_0x4036('0x637')](_0x4a4299,_0xdcb5a1);const _0x178df5=_0x2c0eb8[_0x4036('0x600')][_0x4036('0x635')]['BattleLayout'][_0x4036('0x814')];_0x419162[_0x4036('0x325')]['x']=_0x178df5,_0x419162[_0x4036('0x325')]['y']=_0x178df5,_0x419162[_0x4036('0x297')]();}}else _0x7ac985=$dataSkills[this[_0x4036('0x7a2')][_0x4036('0x2e1')]()];}else{if(_0x4036('0x232')===_0x4036('0x232'))_0x7ac985=$dataSkills[this[_0x4036('0x17e')][_0x5c1817][_0x4036('0x3b3')]];else{function _0x4f14e4(){return this[_0x4036('0x5f2')]()[_0x4036('0x826')][_0x4036('0x161')](/<BATTLE COMMANDS>\s*([\s\S]*)\s*<\/BATTLE COMMANDS>/i)?_0x14c04d(_0x4007ef['$1'])[_0x4036('0x77a')](/[\r\n]+/):_0x1914fb[_0x4036('0x600')][_0x4036('0x635')]['ActorCmd']['BattleCmdList'];}}}}this[_0x4036('0x39')](this[_0x4036('0x7a2')],_0x7ac985,_0xc9f688['x'],_0xc9f688['y'],_0xc9f688[_0x4036('0x42')]);},Window_ActorCommand[_0x4036('0x24d')][_0x4036('0x39')]=function(_0x24affc,_0x440a2f,_0x5b9bd7,_0x45cd09,_0x320bdd){if(!_0x440a2f)return;Imported[_0x4036('0x6c7')]?Window_Command[_0x4036('0x24d')][_0x4036('0x39')][_0x4036('0x286')](this,_0x24affc,_0x440a2f,_0x5b9bd7,_0x45cd09,_0x320bdd):Window_SkillList[_0x4036('0x24d')]['drawSkillCost']['call'](this,_0x440a2f,_0x5b9bd7,_0x45cd09,_0x320bdd);},Window_ActorCommand[_0x4036('0x24d')]['hide']=function(){},Window_ActorCommand[_0x4036('0x24d')][_0x4036('0x19f')]=function(){Window_Command[_0x4036('0x24d')][_0x4036('0x19f')][_0x4036('0x286')](this);const _0xcbf31a=this[_0x4036('0x203')]();_0xcbf31a===_0x4036('0x516')&&this[_0x4036('0x68e')]();},Window_ActorCommand[_0x4036('0x24d')]['battleLayoutStyle']=function(){if(this[_0x4036('0x16c')])return this[_0x4036('0x16c')];return this[_0x4036('0x16c')]=SceneManager[_0x4036('0x423')][_0x4036('0x203')](),this[_0x4036('0x16c')];},VisuMZ['BattleCore'][_0x4036('0x23f')]=Window_ActorCommand[_0x4036('0x24d')]['setup'],Window_ActorCommand[_0x4036('0x24d')][_0x4036('0x699')]=function(_0xd03bcd){const _0x10e505=this[_0x4036('0x203')]();if(_0xd03bcd&&['xp',_0x4036('0x6b4')]['includes'](_0x10e505))this[_0x4036('0x337')](_0xd03bcd);else _0xd03bcd&&[_0x4036('0x516')][_0x4036('0x747')](_0x10e505)&&(this[_0x4036('0x29')](_0xd03bcd),this[_0x4036('0x68e')]());VisuMZ[_0x4036('0x600')][_0x4036('0x23f')][_0x4036('0x286')](this,_0xd03bcd);if(_0xd03bcd){if('kvggR'==='Voaud'){function _0x537639(){this[_0x4036('0x7b6')]=0x0,this['_baseY']=0x0,this['_floatHeight']=0x0,this[_0x4036('0x1cd')]=0x0,this['_floatDuration']=0x0,this[_0x4036('0x3aa')]=0x0,this[_0x4036('0x832')]=_0x4036('0x167'),this[_0x4036('0x65c')]=0x0,this[_0x4036('0xaf')]=0x0,this[_0x4036('0x61f')]=0x0,this['_jumpWholeDuration']=0x0,this['_targetOpacity']=0xff,this['_opacityDuration']=0x0,this['_opacityWholeDuration']=0x0,this[_0x4036('0x615')]=_0x4036('0x167'),this[_0x4036('0x5b8')]=0x0,this[_0x4036('0x59a')]=0x0,this['_angleDuration']=0x0,this['_angleWholeDuration']=0x0,this[_0x4036('0x543')]=_0x4036('0x167'),this[_0x4036('0x31d')]=0x0,this[_0x4036('0x30')]=0x0,this[_0x4036('0x788')]=0x0,this[_0x4036('0x580')]=0x0,this['_skewDuration']=0x0,this[_0x4036('0x34a')]=0x0,this[_0x4036('0x513')]=_0x4036('0x167'),this[_0x4036('0x632')]=0x1,this['_growY']=0x1,this['_targetGrowX']=0x1,this['_targetGrowY']=0x1,this['_growDuration']=0x0,this[_0x4036('0x6be')]=0x0,this[_0x4036('0x50f')]=_0x4036('0x167'),this['_flipScaleX']=0x1;}}else _0xd03bcd['battler']()[_0x4036('0x54d')]();}},Window_ActorCommand['prototype'][_0x4036('0x337')]=function(_0x1b1b88){const _0x337cee=Math[_0x4036('0x488')](Graphics[_0x4036('0x316')]/0x3),_0x4ca883=Math[_0x4036('0x488')](Graphics[_0x4036('0x316')]/$gameParty[_0x4036('0x6a7')]()['length']),_0x19048e=Math[_0x4036('0x18c')](_0x337cee,_0x4ca883),_0x379cd0=this[_0x4036('0x6af')](VisuMZ[_0x4036('0x600')]['Settings'][_0x4036('0x650')][_0x4036('0x578')]),_0x35dbcb=_0x4ca883*_0x1b1b88[_0x4036('0x4fd')]()+(_0x4ca883-_0x19048e)/0x2,_0x16d2a4=SceneManager[_0x4036('0x423')][_0x4036('0x1ac')]['y']-_0x379cd0;this[_0x4036('0x637')](_0x35dbcb,_0x16d2a4,_0x19048e,_0x379cd0),this['createContents'](),this['setBackgroundType'](0x1);},Window_ActorCommand['prototype'][_0x4036('0x29')]=function(_0x79b8db){const _0x547585=SceneManager[_0x4036('0x423')][_0x4036('0x724')]();this['move'](_0x547585['x'],_0x547585['y'],_0x547585[_0x4036('0x42')],_0x547585[_0x4036('0x28f')]),this[_0x4036('0xcd')](),this[_0x4036('0x37b')](0x0);},Window_ActorCommand[_0x4036('0x24d')]['refreshDimmerBitmap']=function(){if(this[_0x4036('0x3e7')]){if(_0x4036('0x1a6')!==_0x4036('0x1a6')){function _0x2e749c(){this[_0x4036('0x261')](...arguments);}}else{const _0x395a74=this['_dimmerSprite'][_0x4036('0x76f')],_0x4b4288=this[_0x4036('0x42')]-0x8,_0x4e445b=this[_0x4036('0x28f')],_0x36eae0=this[_0x4036('0x4ad')],_0x47216f=ColorManager[_0x4036('0x1b0')](),_0x15e18e=ColorManager[_0x4036('0x607')]();this[_0x4036('0x3e7')]['x']=0x4,_0x395a74[_0x4036('0x355')](_0x4b4288,_0x4e445b),_0x395a74[_0x4036('0x2a')](0x0,0x0,_0x4b4288,_0x36eae0,_0x15e18e,_0x47216f,!![]),_0x395a74['fillRect'](0x0,_0x36eae0,_0x4b4288,_0x4e445b-_0x36eae0*0x2,_0x47216f),_0x395a74[_0x4036('0x2a')](0x0,_0x4e445b-_0x36eae0,_0x4b4288,_0x36eae0,_0x47216f,_0x15e18e,!![]),this[_0x4036('0x3e7')]['setFrame'](0x0,0x0,_0x4b4288,_0x4e445b);}}},Window_ActorCommand[_0x4036('0x24d')][_0x4036('0x235')]=function(){if(!this[_0x4036('0x7a2')])return;const _0x2fce46=VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x3e3')],_0x425d38=this[_0x4036('0x210')]();switch(_0x425d38){case'attack':this[_0x4036('0xa4')]($dataSkills[this[_0x4036('0x7a2')][_0x4036('0x2e1')]()]);break;case _0x4036('0x342'):this[_0x4036('0xa4')]($dataSkills[this['_actor'][_0x4036('0xd5')]()]);break;case'skill':const _0x1d1c75=_0x2fce46[_0x4036('0x4b3')],_0x4e606a=_0x1d1c75[_0x4036('0x4d2')]($dataSystem[_0x4036('0xe7')][this['currentExt']()]);this[_0x4036('0x11d')][_0x4036('0x72d')](_0x4e606a);break;case _0x4036('0x226'):this['setHelpWindowItem']($dataSkills[this[_0x4036('0x620')]()]);break;case'item':this[_0x4036('0x11d')][_0x4036('0x72d')](_0x2fce46['HelpItem']);break;case'escape':this[_0x4036('0x11d')][_0x4036('0x72d')](_0x2fce46[_0x4036('0x48d')]);break;case _0x4036('0x52d'):this[_0x4036('0x11d')][_0x4036('0x72d')](_0x2fce46['HelpAutoBattle']);break;default:this[_0x4036('0x11d')]['setText']('');break;}},VisuMZ[_0x4036('0x600')][_0x4036('0x1c')]=Window_BattleStatus['prototype'][_0x4036('0x261')],Window_BattleStatus[_0x4036('0x24d')][_0x4036('0x261')]=function(_0x3fbdb1){VisuMZ[_0x4036('0x600')][_0x4036('0x1c')]['call'](this,_0x3fbdb1),this[_0x4036('0x501')]();},Window_BattleStatus['prototype'][_0x4036('0x501')]=function(){this[_0x4036('0x813')]=this[_0x4036('0x387')]();},Window_BattleStatus[_0x4036('0x24d')][_0x4036('0x203')]=function(){if(this['_battleLayoutStyle'])return this['_battleLayoutStyle'];return this[_0x4036('0x16c')]=SceneManager[_0x4036('0x423')][_0x4036('0x203')](),this['_battleLayoutStyle'];},Window_BattleStatus[_0x4036('0x24d')][_0x4036('0x387')]=function(){const _0x19ea35=this[_0x4036('0x203')]();switch(_0x19ea35){case'list':case _0x4036('0x516'):return!![];break;case _0x4036('0x6e3'):case'xp':case _0x4036('0x6b4'):default:return![];break;}},Window_BattleStatus[_0x4036('0x24d')][_0x4036('0x4ea')]=function(){if(this[_0x4036('0x387')]()){if(_0x4036('0x16e')===_0x4036('0x16e'))return 0x0;else{function _0x1e4b5d(){this[_0x4036('0x47a')]()['removeChild'](_0x5b91cb);}}}else return 0xa;},Window_BattleStatus[_0x4036('0x24d')][_0x4036('0xb6')]=function(){const _0x1bc8b1=this[_0x4036('0x203')]();switch(_0x1bc8b1){case _0x4036('0x57a'):return 0x1;break;case'xp':case _0x4036('0x6b4'):return $gameParty[_0x4036('0x6a7')]()[_0x4036('0x6b5')];break;case _0x4036('0x6e3'):default:return $gameParty['maxBattleMembers']();break;}},Window_BattleStatus[_0x4036('0x24d')][_0x4036('0x306')]=function(){const _0xde837e=this[_0x4036('0x203')]();switch(_0xde837e){case _0x4036('0x57a'):return Window_StatusBase['prototype'][_0x4036('0x306')][_0x4036('0x286')](this);break;case _0x4036('0x6e3'):case'xp':case _0x4036('0x6b4'):default:return this[_0x4036('0x6f5')];break;}},Window_BattleStatus[_0x4036('0x24d')][_0x4036('0x4f8')]=function(){const _0x27ba39=this[_0x4036('0x203')]();switch(_0x27ba39){case _0x4036('0x57a'):return Window_StatusBase[_0x4036('0x24d')][_0x4036('0x4f8')][_0x4036('0x286')](this);break;case _0x4036('0x6e3'):case'xp':case _0x4036('0x6b4'):default:return 0x0;break;}},Window_BattleStatus[_0x4036('0x24d')][_0x4036('0x143')]=function(){if(this['isFrameVisible']()){if(_0x4036('0x1d6')==='KDWcx'){function _0x17d299(){_0x56a9bd[_0x4036('0x64d')](),_0x27d205[_0x4036('0x7b0')](_0x949da3[_0x4036('0x1ca')]());}}else Window_StatusBase[_0x4036('0x24d')][_0x4036('0x143')][_0x4036('0x286')](this);}else{if(_0x4036('0x3cc')===_0x4036('0x45b')){function _0x29843e(){!this[_0x4036('0x781')]&&(this['_svBattlerSprite']=new _0x1c7031(_0x57e76e),this[_0x4036('0x3f9')]()),this['_svBattlerSprite'][_0x4036('0x7ad')](_0x1eba83);}}else this[_0x4036('0x4ad')]=0x8;}},Window_BattleStatus['prototype']['update']=function(){Window_StatusBase[_0x4036('0x24d')][_0x4036('0x209')][_0x4036('0x286')](this),this[_0x4036('0x4b4')]();if(this[_0x4036('0x203')]()===_0x4036('0x516'))this['updateBorderStyle']();},Window_BattleStatus[_0x4036('0x24d')][_0x4036('0x297')]=function(){Window_StatusBase['prototype'][_0x4036('0x297')]['call'](this);if(!$gameSystem['isSideView']())this[_0x4036('0x691')]();},Window_BattleStatus[_0x4036('0x24d')][_0x4036('0x755')]=function(){if(this[_0x4036('0x6c8')]===Window_BattleStatus)return;Window_StatusBase['prototype'][_0x4036('0x755')]['call'](this);},Window_BattleStatus[_0x4036('0x24d')][_0x4036('0x431')]=function(_0x28bd84){const _0xca3c86=this[_0x4036('0x203')]();switch(_0xca3c86){case'xp':case _0x4036('0x6b4'):break;case _0x4036('0x6e3'):case _0x4036('0x57a'):default:return Window_StatusBase['prototype'][_0x4036('0x431')][_0x4036('0x286')](this,_0x28bd84);break;}},VisuMZ[_0x4036('0x600')][_0x4036('0x49a')]=Window_BattleStatus[_0x4036('0x24d')]['drawItemImage'],Window_BattleStatus[_0x4036('0x24d')][_0x4036('0x4d')]=function(_0x578300){const _0x856730=this[_0x4036('0x203')]();switch(_0x856730){case _0x4036('0x57a'):this[_0x4036('0x688')](_0x578300);break;case'xp':this[_0x4036('0x3ff')](_0x578300);break;case'portrait':this[_0x4036('0x181')](_0x578300);break;case _0x4036('0x6e3'):case _0x4036('0x516'):default:VisuMZ[_0x4036('0x600')][_0x4036('0x49a')][_0x4036('0x286')](this,_0x578300);break;}},Window_BattleStatus[_0x4036('0x24d')]['drawItemStatus']=function(_0x1e331f){const _0x459278=this[_0x4036('0x203')]();if(!$gameSystem[_0x4036('0x1c1')]())this[_0x4036('0x4e7')](_0x1e331f);switch(_0x459278){case'list':this[_0x4036('0x6de')](_0x1e331f);break;case'xp':case _0x4036('0x6b4'):case _0x4036('0x6e3'):default:this[_0x4036('0x208')](_0x1e331f);break;}},Window_BattleStatus[_0x4036('0x24d')][_0x4036('0x7d6')]=function(){const _0x33c39c=this[_0x4036('0x203')]();if(['xp'][_0x4036('0x747')](_0x33c39c)&&!$gameSystem['isSideView']()){if(_0x4036('0x85')!==_0x4036('0x173')){this[_0x4036('0x1de')](0x0,0x0,0x0,0x0);return;}else{function _0x4a1805(){if(this[_0x4036('0x3f2')]())return _0xb856a2;return _0x4c9a04=this['applySoftDamageCap'](_0xad32e6),_0x505f0b=this[_0x4036('0x751')](_0x1bb67c),_0x4eff6a;}}}Window_StatusBase[_0x4036('0x24d')]['refreshCursor']['call'](this);},Window_BattleStatus[_0x4036('0x24d')][_0x4036('0x4e7')]=function(_0x26241e){const _0xde84d8=this[_0x4036('0x529')](_0x26241e)[_0x4036('0x304')]();if(!_0xde84d8)return;const _0x20555e=this[_0x4036('0x203')](),_0x18c051=this[_0x4036('0xa2')](_0x26241e);let _0x53ff40=Math[_0x4036('0x488')](_0x18c051['x']+_0x18c051[_0x4036('0x42')]/0x2);if([_0x4036('0x57a')][_0x4036('0x747')](_0x20555e)){if('ckubW'!==_0x4036('0x743')){function _0x41ad11(){_0xe32ee8[_0x4036('0x600')][_0x4036('0x774')][_0x4036('0x286')](this),this[_0x4036('0x829')]();}}else _0x53ff40=_0x18c051[_0x4036('0x42')]/$gameParty[_0x4036('0x6a7')]()[_0x4036('0x6b5')],_0x53ff40*=_0x26241e,_0x53ff40+=_0x18c051[_0x4036('0x42')]/$gameParty[_0x4036('0x6a7')]()[_0x4036('0x6b5')]/0x2;}let _0x38f3e7=Math[_0x4036('0x488')](this[_0x4036('0x763')](_0x26241e,_0xde84d8,_0x18c051));_0xde84d8[_0x4036('0x528')](_0x53ff40,_0x38f3e7),this[_0x4036('0x396')](_0xde84d8,0x1),_0xde84d8[_0x4036('0x297')]();},Window_BattleStatus[_0x4036('0x24d')][_0x4036('0x763')]=function(_0x2da72d,_0x44cae2,_0x3563b9){const _0x4560b5=VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x650')],_0x4d14af=this[_0x4036('0x203')]();if(_0x4d14af==='xp'){if(_0x4036('0x573')===_0x4036('0x3f')){function _0x59310d(){this[_0x4036('0x5d7')](_0x4036('0x768'),_0x41079e);}}else{const _0x43b24a=_0x4560b5[_0x4036('0x65b')];switch(_0x43b24a[_0x4036('0x2c6')]()['trim']()){case _0x4036('0x54b'):return _0x3563b9['height']-_0x44cae2[_0x4036('0x791')]['height']/0x4;break;case _0x4036('0x723'):const _0x380763=_0x4560b5['XPActorDefaultHeight'];return(_0x3563b9[_0x4036('0x28f')]+(_0x44cae2[_0x4036('0x28f')]||_0x380763))/0x2;break;case _0x4036('0x129'):return 0x0;case _0x4036('0x37d'):default:return this[_0x4036('0x4e2')](_0x3563b9);break;}}}else{if(_0x4d14af===_0x4036('0x6b4')){}}return _0x44cae2[_0x4036('0x28f')];},Window_BattleStatus[_0x4036('0x24d')]['drawItemImageListStyle']=function(_0x46cff4){if(!VisuMZ[_0x4036('0x600')][_0x4036('0x635')]['BattleLayout'][_0x4036('0x33')])return;const _0x50b04f=this['actor'](_0x46cff4),_0x4e50ee=this[_0x4036('0xa2')](_0x46cff4);_0x4e50ee[_0x4036('0x42')]=ImageManager[_0x4036('0x191')],_0x4e50ee[_0x4036('0x28f')]-=0x2,this[_0x4036('0xb2')](_0x50b04f,_0x4e50ee['x']+0x1,_0x4e50ee['y']+0x1,_0x4e50ee[_0x4036('0x42')],_0x4e50ee['height']);},Window_BattleStatus[_0x4036('0x24d')][_0x4036('0x6de')]=function(_0x2ec298){const _0x1cab2e=$dataSystem[_0x4036('0x556')]?0x4:0x3,_0x212b3d=_0x1cab2e*0x80+(_0x1cab2e-0x1)*0x8+0x4,_0xf98481=this[_0x4036('0x529')](_0x2ec298),_0x29b820=this[_0x4036('0xa2')](_0x2ec298);let _0x305902=_0x29b820['x']+this[_0x4036('0x4ad')];if(VisuMZ['BattleCore'][_0x4036('0x635')][_0x4036('0x650')][_0x4036('0x33')]){if(_0x4036('0x75b')===_0x4036('0x75b'))_0x305902=_0x29b820['x']+ImageManager['faceWidth']+0x8;else{function _0x59092a(){return this[_0x4036('0x696')]()[_0x4036('0x275')](_0x3b9e8b=>_0x3b9e8b[_0x4036('0x6f3')]());}}}else _0x305902+=ImageManager[_0x4036('0x58d')];const _0x41add0=Math[_0x4036('0x488')](Math[_0x4036('0x18c')](_0x29b820['x']+_0x29b820['width']-_0x212b3d,_0x305902)),_0x26c06d=Math[_0x4036('0x488')](_0x29b820['y']+(_0x29b820[_0x4036('0x28f')]-Sprite_Name[_0x4036('0x24d')]['bitmapHeight']())/0x2),_0x506cc8=Math['round'](_0x41add0-ImageManager[_0x4036('0x58d')]/0x2-0x4),_0x504169=Math[_0x4036('0x488')](_0x29b820['y']+(_0x29b820['height']-ImageManager[_0x4036('0x32d')])/0x2+ImageManager[_0x4036('0x32d')]/0x2);let _0x2a7ee4=_0x41add0+0x88;const _0x5df87f=_0x26c06d;this['placeTimeGauge'](_0xf98481,_0x41add0-0x4,_0x26c06d),this[_0x4036('0x698')](_0xf98481,_0x41add0,_0x26c06d),this[_0x4036('0x560')](_0xf98481,_0x506cc8,_0x504169),this[_0x4036('0x46a')](_0xf98481,'hp',_0x2a7ee4+0x88*0x0,_0x5df87f),this['placeGauge'](_0xf98481,'mp',_0x2a7ee4+0x88*0x1,_0x5df87f);if($dataSystem[_0x4036('0x556')]){if(_0x4036('0x2db')!==_0x4036('0x4db'))this['placeGauge'](_0xf98481,'tp',_0x2a7ee4+0x88*0x2,_0x5df87f);else{function _0x2ffaeb(){if(this[_0x4036('0x6c8')]===_0x15390d)return;this[_0x4036('0x52f')](),this[_0x4036('0x535')]();}}}},Window_BattleStatus[_0x4036('0x24d')][_0x4036('0x3ff')]=function(_0x41c67c){if(!$gameSystem[_0x4036('0x1c1')]())return;VisuMZ[_0x4036('0x600')][_0x4036('0x49a')][_0x4036('0x286')](this,_0x41c67c);},Window_BattleStatus[_0x4036('0x24d')][_0x4036('0x208')]=function(_0x36f4e8){const _0x359c74=this[_0x4036('0x529')](_0x36f4e8),_0x1c967b=this[_0x4036('0xa2')](_0x36f4e8),_0x2778a8=Math['round'](_0x1c967b['x']+(_0x1c967b['width']-0x80)/0x2),_0x5a7bdd=this[_0x4036('0x4e2')](_0x1c967b);let _0x18ab07=_0x2778a8-ImageManager[_0x4036('0x58d')]/0x2-0x4,_0x23dfc1=_0x5a7bdd+ImageManager[_0x4036('0x32d')]/0x2;_0x18ab07-ImageManager[_0x4036('0x58d')]/0x2<_0x1c967b['x']&&(_0x18ab07=_0x2778a8+ImageManager[_0x4036('0x58d')]/0x2-0x4,_0x23dfc1=_0x5a7bdd-ImageManager[_0x4036('0x32d')]/0x2);const _0x4ef976=_0x2778a8,_0x5627ed=this[_0x4036('0x61b')](_0x1c967b);this[_0x4036('0x282')](_0x359c74,_0x2778a8,_0x5a7bdd),this['placeActorName'](_0x359c74,_0x2778a8,_0x5a7bdd),this[_0x4036('0x560')](_0x359c74,_0x18ab07,_0x23dfc1),this[_0x4036('0x46b')](_0x359c74,_0x4ef976,_0x5627ed);},Window_BattleStatus[_0x4036('0x24d')][_0x4036('0x67f')]=function(_0x4d88bd){if(!VisuMZ['BattleCore'][_0x4036('0x635')][_0x4036('0x650')][_0x4036('0x35f')])return![];if(_0x4d88bd[_0x4036('0x825')]())return!![];return Imported[_0x4036('0x558')]&&_0x4d88bd['getMenuImage']();},Window_BattleStatus[_0x4036('0x24d')][_0x4036('0x181')]=function(_0x1965e5){const _0x4a262a=this[_0x4036('0x529')](_0x1965e5);if(this[_0x4036('0x67f')](_0x4a262a)){const _0x46669d=_0x4036('0x6f')[_0x4036('0x4d2')](_0x4a262a['actorId']()),_0xb1e97a=this[_0x4036('0x677')](_0x46669d,Sprite),_0x47ecca=_0x4a262a[_0x4036('0x31b')]();_0x47ecca!==''?_0xb1e97a[_0x4036('0x76f')]=ImageManager[_0x4036('0x7c2')](_0x47ecca):_0xb1e97a[_0x4036('0x76f')]=ImageManager[_0x4036('0x3e5')];const _0x566438=this[_0x4036('0xa2')](_0x1965e5);_0xb1e97a[_0x4036('0x240')]['x']=0.5,_0xb1e97a[_0x4036('0x240')]['y']=0x1;const _0x118abb=Math[_0x4036('0x488')](_0x566438['x']+_0x566438[_0x4036('0x42')]/0x2)+this[_0x4036('0x4ad')],_0x45a2b6=Math['round'](this[_0x4036('0x28f')]);_0xb1e97a[_0x4036('0x637')](_0x118abb,_0x45a2b6);const _0x439305=VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x650')][_0x4036('0x814')];_0xb1e97a['scale']['x']=_0x439305,_0xb1e97a['scale']['y']=_0x439305,_0xb1e97a['show']();}else{const _0x2c4a06=this[_0x4036('0x27e')](_0x1965e5);this[_0x4036('0xb2')](_0x4a262a,_0x2c4a06['x'],_0x2c4a06['y'],_0x2c4a06[_0x4036('0x42')],_0x2c4a06[_0x4036('0x28f')]);}},Window_BattleStatus[_0x4036('0x24d')][_0x4036('0x677')]=function(_0x4d24a7,_0x4551af){const _0x24a06b=this[_0x4036('0x5df')];if(_0x24a06b[_0x4d24a7])return _0x24a06b[_0x4d24a7];else{const _0x33282f=new _0x4551af();return _0x24a06b[_0x4d24a7]=_0x33282f,this[_0x4036('0x433')](_0x33282f),this[_0x4036('0x433')](this[_0x4036('0x12b')]),_0x33282f;}},Window_BattleStatus['prototype'][_0x4036('0x28d')]=function(){this[_0x4036('0x591')](),this[_0x4036('0x687')](),Window_StatusBase[_0x4036('0x24d')][_0x4036('0x28d')][_0x4036('0x286')](this),this[_0x4036('0x5b7')]();},Window_BattleStatus[_0x4036('0x24d')][_0x4036('0x591')]=function(){this[_0x4036('0x12b')]=new Sprite(),this[_0x4036('0x12b')][_0x4036('0x711')]=[new PIXI['filters'][(_0x4036('0x2a2'))]()],this['_cursorArea']['filterArea']=new Rectangle(),this['_cursorArea'][_0x4036('0x637')](this[_0x4036('0x6dc')],this[_0x4036('0x6dc')]),this[_0x4036('0x356')](this[_0x4036('0x12b')]);},Window_BattleStatus[_0x4036('0x24d')][_0x4036('0x687')]=function(){this[_0x4036('0x1e')]=new Sprite(),this[_0x4036('0x356')](this[_0x4036('0x1e')]);},Window_BattleStatus[_0x4036('0x24d')][_0x4036('0x5b7')]=function(){this[_0x4036('0x74a')]=new Sprite(),this[_0x4036('0x356')](this['_damageContainer']);},Window_BattleStatus[_0x4036('0x24d')][_0x4036('0x5dd')]=function(){this['_cursorSprite']=new Sprite();for(let _0x456c6f=0x0;_0x456c6f<0x9;_0x456c6f++){this[_0x4036('0x359')][_0x4036('0x356')](new Sprite());}this['_cursorArea'][_0x4036('0x356')](this[_0x4036('0x359')]);},Window_BattleStatus[_0x4036('0x24d')][_0x4036('0x213')]=function(){Window_StatusBase[_0x4036('0x24d')][_0x4036('0x213')][_0x4036('0x286')](this),this[_0x4036('0x58e')]();},Window_BattleStatus[_0x4036('0x24d')][_0x4036('0x58e')]=function(){const _0x3753c4=this[_0x4036('0x6dc')];this[_0x4036('0x12b')][_0x4036('0x637')](_0x3753c4,_0x3753c4),this['_cursorArea']['x']=_0x3753c4-this[_0x4036('0x16d')]['x'],this[_0x4036('0x12b')]['y']=_0x3753c4-this[_0x4036('0x16d')]['y'],this[_0x4036('0x3de')]>0x0&&this[_0x4036('0x6f5')]>0x0?this[_0x4036('0x12b')][_0x4036('0x392')]=this[_0x4036('0x8f')]():this['_cursorArea'][_0x4036('0x392')]=![];},Window_BattleStatus['prototype'][_0x4036('0x81a')]=function(){Window_StatusBase[_0x4036('0x24d')][_0x4036('0x81a')][_0x4036('0x286')](this),this['_updateCursorFilterArea']();},Window_BattleStatus[_0x4036('0x24d')]['_updateCursorFilterArea']=function(){const _0x5a202e=this[_0x4036('0x12b')][_0x4036('0x33f')][_0x4036('0x7fb')](new Point(0x0,0x0)),_0x492800=this[_0x4036('0x12b')][_0x4036('0x51f')];_0x492800['x']=_0x5a202e['x']+this[_0x4036('0x16d')]['x'],_0x492800['y']=_0x5a202e['y']+this[_0x4036('0x16d')]['y'],_0x492800['width']=this[_0x4036('0x3de')],_0x492800[_0x4036('0x28f')]=this[_0x4036('0x6f5')];},Window_BattleStatus['prototype'][_0x4036('0x5fd')]=function(_0x1b1bba){if(this[_0x4036('0x203')]()!==_0x4036('0x6b4'))return;this[_0x4036('0x181')](_0x1b1bba[_0x4036('0x4fd')]());},Window_BattleStatus['prototype'][_0x4036('0x1ee')]=function(_0x5ed7a1,_0x2ecaac){if(!this['_damageContainer'])return;if(!_0x5ed7a1)return;if(!_0x2ecaac)return;const _0x19e334=this[_0x4036('0xa2')](_0x2ecaac['index']());_0x19e334['x']+=_0x19e334[_0x4036('0x42')]/0x2+this['padding'],_0x5ed7a1['x']=_0x19e334['x'],_0x5ed7a1['y']=_0x19e334['y'],this['_damageContainer'][_0x4036('0x356')](_0x5ed7a1);},Window_BattleStatus[_0x4036('0x24d')][_0x4036('0x26c')]=function(_0x56af01){if(!this[_0x4036('0x74a')])return;if(!_0x56af01)return;this[_0x4036('0x74a')][_0x4036('0x147')](_0x56af01);},Window_BattleStatus[_0x4036('0x24d')]['updateBorderStyle']=function(){if(!this[_0x4036('0x6e4')]())return;if(!this[_0x4036('0x53')])this[_0x4036('0x217')]();this[_0x4036('0x326')](),this[_0x4036('0x609')]();},Window_BattleStatus[_0x4036('0x24d')][_0x4036('0x6e4')]=function(){if(this[_0x4036('0x6c8')]!==Window_BattleStatus)return![];if(!SceneManager[_0x4036('0x78a')]())return![];return VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x650')][_0x4036('0x5a8')];},Window_BattleStatus[_0x4036('0x24d')][_0x4036('0x217')]=function(){this[_0x4036('0x53')]=new Sprite();const _0x511e14=SceneManager[_0x4036('0x423')],_0x96ec88=_0x511e14[_0x4036('0x4ce')][_0x4036('0x419')](_0x511e14['_windowLayer']);_0x511e14[_0x4036('0x396')](this[_0x4036('0x53')],_0x96ec88),this[_0x4036('0x53')][_0x4036('0x240')]['x']=0.5,this[_0x4036('0x53')][_0x4036('0x240')]['y']=0x1;const _0x308246=VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x650')][_0x4036('0x7fd')];this[_0x4036('0x53')][_0x4036('0x325')]['x']=_0x308246,this[_0x4036('0x53')]['scale']['y']=_0x308246,this[_0x4036('0x53')]['y']=this['y']+this['height'],this[_0x4036('0x442')]=0x0;},Window_BattleStatus[_0x4036('0x24d')][_0x4036('0x326')]=function(){this[_0x4036('0x53')][_0x4036('0x392')]=BattleManager[_0x4036('0x5c5')]();const _0x524360=BattleManager[_0x4036('0x529')]();if(_0x524360===this[_0x4036('0x53')][_0x4036('0x529')])return;this[_0x4036('0x53')][_0x4036('0x529')]=_0x524360||this[_0x4036('0x53')][_0x4036('0x529')];if(!_0x524360){if(_0x4036('0x17b')===_0x4036('0x17b'))return;else{function _0x3dc4a0(){_0x16bf53['BattleCore'][_0x4036('0x30d')][_0x4036('0x286')](this),this['visible']=this[_0x4036('0x79c')]>0x0?!![]:![];}}}else{if(_0x524360[_0x4036('0x31b')]()===''){if(_0x4036('0x502')===_0x4036('0x5e0')){function _0x58a1bf(){this['applyBattleCoreJS'](_0x4036('0x363'),_0x261630,0x0,!![]),_0x2fbffa[_0x4036('0x600')][_0x4036('0x793')][_0x4036('0x286')](this,_0x59b63c),this[_0x4036('0x73a')](_0x4036('0x393'),_0x2534b6,this['_executedValue']||0x0,!![]);}}else{this['_borderPortraitSprite'][_0x4036('0x76f')]=ImageManager[_0x4036('0x3e5')];return;}}else{if(_0x4036('0x776')!==_0x4036('0xee')){const _0x59afa6=ImageManager['loadPicture'](_0x524360[_0x4036('0x31b')]());_0x59afa6[_0x4036('0x3fc')](this[_0x4036('0x6a6')]['bind'](this,_0x59afa6));}else{function _0x7b44ba(){_0x3bfbc9[_0x4036('0x600')][_0x4036('0x125')][_0x4036('0x286')](this),this['y']=_0x4b01d1[_0x4036('0x28f')]*0xa;}}}}},Window_BattleStatus[_0x4036('0x24d')]['processBorderActor']=function(_0x171e05){this[_0x4036('0x442')]=0x14,this[_0x4036('0x53')]['bitmap']=_0x171e05;if(SceneManager[_0x4036('0x423')][_0x4036('0x88')]())this[_0x4036('0x53')]['x']=0x0,this[_0x4036('0x30a')]=Math[_0x4036('0x33a')](_0x171e05[_0x4036('0x42')]/0x2);else{if(_0x4036('0x469')!==_0x4036('0x65'))this[_0x4036('0x53')]['x']=this[_0x4036('0x42')],this[_0x4036('0x30a')]=this[_0x4036('0x42')]*0x3/0x4;else{function _0x46e7f0(){this[_0x4036('0x338')]=this[_0x4036('0x1cd')];}}}this[_0x4036('0x53')][_0x4036('0x57b')]=0x0;},Window_BattleStatus[_0x4036('0x24d')][_0x4036('0x609')]=function(){if(this[_0x4036('0x442')]>0x0){if(_0x4036('0x153')===_0x4036('0x99')){function _0x439bbf(){if(!_0x1f759f['BattleCore'][_0x4036('0x635')]['BattleLog'][_0x4036('0x60d')])return;_0x39d41b[_0x4036('0x600')][_0x4036('0x15d')]['call'](this,_0x4360c7);}}else{const _0x2e32b5=this['_borderPortraitDuration'],_0x455163=this['_borderPortraitSprite'];_0x455163['x']=(_0x455163['x']*(_0x2e32b5-0x1)+this['_borderPortraitTargetX'])/_0x2e32b5,_0x455163[_0x4036('0x57b')]=(_0x455163[_0x4036('0x57b')]*(_0x2e32b5-0x1)+0xff)/_0x2e32b5,this[_0x4036('0x442')]--;}}},Window_BattleStatus[_0x4036('0x24d')][_0x4036('0x4b4')]=function(){return;this[_0x4036('0x1e')]&&(this[_0x4036('0x1e')]['x']=this['x'],this[_0x4036('0x1e')]['y']=this['y']);if(this[_0x4036('0x74a')]){if(_0x4036('0x9b')==='tzLtA'){function _0x4cd2bb(){if(this[_0x4036('0x29a')]<=0x0)return;if(!this[_0x4036('0x312')])return;const _0x1538b5=this[_0x4036('0x29a')],_0x28ccdd=this[_0x4036('0x6be')],_0x28ffd4=this[_0x4036('0x50f')];_0x5ef663[_0x4036('0x7b5')]?(this['_growX']=this[_0x4036('0x68')](this['_growX'],this[_0x4036('0x61a')],_0x1538b5,_0x28ccdd,_0x28ffd4),this[_0x4036('0x253')]=this[_0x4036('0x68')](this['_growY'],this['_targetGrowY'],_0x1538b5,_0x28ccdd,_0x28ffd4)):(this[_0x4036('0x632')]=(this['_growX']*(_0x1538b5-0x1)+this[_0x4036('0x61a')])/_0x1538b5,this[_0x4036('0x253')]=(this[_0x4036('0x253')]*(_0x1538b5-0x1)+this[_0x4036('0x472')])/_0x1538b5);this[_0x4036('0x29a')]--;if(this['_growDuration']<=0x0)this[_0x4036('0x38b')]();}}else this[_0x4036('0x74a')]['x']=this['x'],this[_0x4036('0x74a')]['y']=this['y'];}},Window_BattleEnemy[_0x4036('0x24d')][_0x4036('0xb6')]=function(){return this[_0x4036('0x24e')]();},VisuMZ[_0x4036('0x600')][_0x4036('0x125')]=Window_BattleEnemy[_0x4036('0x24d')][_0x4036('0x297')],Window_BattleEnemy[_0x4036('0x24d')]['show']=function(){VisuMZ[_0x4036('0x600')][_0x4036('0x125')][_0x4036('0x286')](this),this['y']=Graphics[_0x4036('0x28f')]*0xa;},Window_BattleEnemy[_0x4036('0x24d')][_0x4036('0x3ed')]=function(){return $gameTroop['aliveMembers']()[_0x4036('0x638')](0x0);},Window_BattleEnemy[_0x4036('0x24d')][_0x4036('0x691')]=function(){this[_0x4036('0x4da')]=this[_0x4036('0x3ed')](),this['sortEnemies'](),Window_Selectable[_0x4036('0x24d')][_0x4036('0x691')][_0x4036('0x286')](this);},Window_BattleEnemy['prototype'][_0x4036('0x5e3')]=function(){this[_0x4036('0x4da')][_0x4036('0x7d9')]((_0xf14e4f,_0x285e2f)=>{if(_0x4036('0x72')===_0x4036('0x72'))return _0xf14e4f[_0x4036('0x304')]()[_0x4036('0x7b6')]===_0x285e2f[_0x4036('0x304')]()[_0x4036('0x7b6')]?_0xf14e4f[_0x4036('0x304')]()['_baseY']-_0x285e2f[_0x4036('0x304')]()[_0x4036('0x311')]:_0xf14e4f['battler']()[_0x4036('0x7b6')]-_0x285e2f[_0x4036('0x304')]()[_0x4036('0x7b6')];else{function _0xfbee64(){if(_0x2b419b[_0x4036('0x4a2')]()&&!_0x18a6a3[_0x4036('0x1c1')]())return;const _0x211809=_0x1281cf['battler']();if(_0x211809&&_0x5c0e97[_0x4036('0x4a2')]())this[_0x4036('0x5a3')][_0x4036('0x356')](_0x211809);}}}),SceneManager[_0x4036('0x6c0')]()&&this[_0x4036('0x4da')][_0x4036('0x56d')]();},Window_BattleEnemy['prototype'][_0x4036('0x475')]=function(){const _0x27f882=VisuMZ[_0x4036('0x600')]['Settings'][_0x4036('0x3e6')];let _0xe2fae8=![];if($gameSystem[_0x4036('0x1c1')]())_0xe2fae8=_0x27f882[_0x4036('0x74e')];else{if(_0x4036('0x692')==='QBYfo')_0xe2fae8=_0x27f882[_0x4036('0x1ba')];else{function _0x4725d9(){if(this[_0x4036('0x6c8')]===_0x183ad9)return;_0x307e1f[_0x4036('0x24d')]['hide']['call'](this);}}}this[_0x4036('0x26')](_0xe2fae8?this[_0x4036('0x24e')]()-0x1:0x0);};function Window_AutoBattleCancel(){this[_0x4036('0x261')](...arguments);}Window_AutoBattleCancel[_0x4036('0x24d')]=Object[_0x4036('0xaa')](Window_Base[_0x4036('0x24d')]),Window_AutoBattleCancel[_0x4036('0x24d')][_0x4036('0x6c8')]=Window_AutoBattleCancel,Window_AutoBattleCancel[_0x4036('0x24d')][_0x4036('0x261')]=function(_0x221933){Window_Base[_0x4036('0x24d')]['initialize'][_0x4036('0x286')](this,_0x221933),this[_0x4036('0x37b')](this[_0x4036('0x70f')]()),this[_0x4036('0x691')]();},Window_AutoBattleCancel[_0x4036('0x24d')]['bgType']=function(){return VisuMZ['BattleCore'][_0x4036('0x635')][_0x4036('0x7e6')][_0x4036('0x621')];},Window_AutoBattleCancel['prototype'][_0x4036('0x691')]=function(){this[_0x4036('0xe8')][_0x4036('0x47b')]();const _0x1d6bf6=VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x7e6')][_0x4036('0x765')],_0x1c4a37=_0x1d6bf6[_0x4036('0x4d2')](this[_0x4036('0x239')](),this[_0x4036('0x7ef')]()),_0x5583dd=this[_0x4036('0x40c')](_0x1c4a37)[_0x4036('0x42')],_0x1ac48c=Math[_0x4036('0x5bd')]((this[_0x4036('0x3de')]-_0x5583dd)/0x2);this[_0x4036('0x5bb')](_0x1c4a37,_0x1ac48c,0x0,_0x5583dd);},Window_AutoBattleCancel['prototype'][_0x4036('0x239')]=function(){if(Imported[_0x4036('0x7b5')]){if('cWaJC'===_0x4036('0x1c6')){function _0x228dab(){this[_0x4036('0xb5')]=![];}}else return TextManager[_0x4036('0x553')]('ok');}else{if(_0x4036('0x3eb')===_0x4036('0x3eb'))return VisuMZ[_0x4036('0x600')]['Settings']['AutoBattle'][_0x4036('0x50')];else{function _0x3b248b(){_0x2f91fa[_0x4036('0x600')]['BattleManager_updatePhase'][_0x4036('0x286')](this,_0x2d663f);}}}},Window_AutoBattleCancel[_0x4036('0x24d')]['cancelButtonText']=function(){return Imported[_0x4036('0x7b5')]?TextManager[_0x4036('0x553')](_0x4036('0x2a0')):VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x7e6')][_0x4036('0x301')];},Window_AutoBattleCancel['prototype'][_0x4036('0x209')]=function(){Window_Base[_0x4036('0x24d')][_0x4036('0x209')][_0x4036('0x286')](this),this[_0x4036('0x74')](),this[_0x4036('0x7be')]();},Window_AutoBattleCancel[_0x4036('0x24d')][_0x4036('0x74')]=function(){this[_0x4036('0x392')]=BattleManager[_0x4036('0x49b')];},Window_AutoBattleCancel[_0x4036('0x24d')][_0x4036('0x7be')]=function(){if(!BattleManager[_0x4036('0x49b')])return;if(Input[_0x4036('0x395')]('ok')||Input[_0x4036('0x395')](_0x4036('0x2a0'))||TouchInput['isClicked']()||TouchInput[_0x4036('0x27f')]()){if(_0x4036('0x9')!==_0x4036('0x9')){function _0x2e3ec2(){this[_0x4036('0x350')]()?_0x2e786d[_0x4036('0x423')][_0x4036('0x1ac')][_0x4036('0x26c')](_0x722b3e):(this[_0x4036('0xda')]()[_0x4036('0x147')](_0x4c7322),this[_0x4036('0x71b')][_0x4036('0x2d8')](_0x4dff80),_0x36fee9[_0x4036('0x451')]());}}else SoundManager['playCancel'](),BattleManager[_0x4036('0x49b')]=![],Input[_0x4036('0x47b')](),TouchInput['clear']();}};function Window_EnemyName(){this[_0x4036('0x261')](...arguments);}Window_EnemyName[_0x4036('0x24d')]=Object['create'](Window_Base[_0x4036('0x24d')]),Window_EnemyName[_0x4036('0x24d')][_0x4036('0x6c8')]=Window_EnemyName,Window_EnemyName[_0x4036('0x24d')][_0x4036('0x261')]=function(_0x2ba807){this[_0x4036('0x251')]=_0x2ba807,this[_0x4036('0xb1')]='';const _0x37319f=new Rectangle(0x0,0x0,Graphics['boxWidth'],this['lineHeight']()*0x4);Window_Base[_0x4036('0x24d')]['initialize'][_0x4036('0x286')](this,_0x37319f),this[_0x4036('0x37b')](0x2),this[_0x4036('0x4df')]=0x0;},Window_EnemyName[_0x4036('0x24d')][_0x4036('0x143')]=function(){this[_0x4036('0x4ad')]=0x0;},Window_EnemyName['prototype'][_0x4036('0x819')]=function(){return $gameTroop['members']()[this[_0x4036('0x251')]];},Window_EnemyName[_0x4036('0x24d')][_0x4036('0x209')]=function(){Window_Base[_0x4036('0x24d')][_0x4036('0x209')][_0x4036('0x286')](this);if(this['enemy']()&&this['enemy']()[_0x4036('0x37d')]()!==this[_0x4036('0xb1')])this[_0x4036('0x691')]();this[_0x4036('0x1f7')](),this['updatePosition']();},Window_EnemyName[_0x4036('0x24d')][_0x4036('0x1f7')]=function(){if(!this[_0x4036('0x819')]()){if(_0x4036('0x121')===_0x4036('0x121')){if(this[_0x4036('0x4df')]>0x0)this[_0x4036('0x4df')]-=0x10;}else{function _0x96d402(){_0x65505a['prototype']['drawItem'][_0x4036('0x286')](this,_0x436ef0);}}}else{if(this[_0x4036('0x819')]()[_0x4036('0x416')]()){if(_0x4036('0x3e9')!=='sHQHY'){if(this[_0x4036('0x4df')]>0x0)this[_0x4036('0x4df')]-=0x10;}else{function _0x3624aa(){const _0xb4dab=_0x489454['BattleCore'][_0x4036('0x635')][_0x4036('0x54c')],_0x2b5e5b=_0x2c8c53[_0x4036('0x3d2')]();if(_0xb4dab[_0x4036('0x20f')])this[_0x4036('0x156')](_0x49083f,_0x2b5e5b[_0x4036('0x605')],_0xf9f453[_0x4036('0x6c3')]);if(_0xb4dab[_0x4036('0x4f1')])this[_0x4036('0x156')](_0x5b0919,_0x2b5e5b['addedDebuffs'],_0x34da3a[_0x4036('0x685')]);if(_0xb4dab['ShowRemovedBuff'])this['displayBuffs'](_0x1fd9fb,_0x2b5e5b[_0x4036('0x242')],_0x3a1bb4['buffRemove']);}}}else{if(SceneManager['_scene'][_0x4036('0x343')]&&SceneManager[_0x4036('0x423')][_0x4036('0x343')][_0x4036('0x2fc')]&&SceneManager[_0x4036('0x423')][_0x4036('0x343')][_0x4036('0x4da')][_0x4036('0x747')](this[_0x4036('0x819')]())){if(_0x4036('0x7c5')!=='XEXqf'){if(this[_0x4036('0x4df')]<0xff)this[_0x4036('0x4df')]+=0x10;}else{function _0x30c9b2(){this[_0x4036('0x74d')][_0x4036('0x5d7')](_0x590e40),this[_0x4036('0x691')](),this[_0x4036('0x283')]();}}}else this[_0x4036('0x4df')]>0x0&&(this[_0x4036('0x4df')]-=0x10);}}},Window_EnemyName['prototype'][_0x4036('0x19a')]=function(){if(!this['enemy']())return;if(SceneManager[_0x4036('0x6c0')]()){if(_0x4036('0x3a8')===_0x4036('0x248')){function _0x3e4901(){this[_0x4036('0x810')][_0x4036('0x210')]()===_0x4036('0x226')?(this['_statusWindow'][_0x4036('0x297')](),this['_actorCommandWindow']['activate']()):_0x101201[_0x4036('0x600')][_0x4036('0x77c')][_0x4036('0x286')](this),this[_0x4036('0x5aa')]();}}else this['x']=Graphics[_0x4036('0x316')]-this[_0x4036('0x819')]()[_0x4036('0x304')]()[_0x4036('0x7b6')];}else{if(_0x4036('0x272')===_0x4036('0x272'))this['x']=this[_0x4036('0x819')]()[_0x4036('0x304')]()[_0x4036('0x7b6')];else{function _0x5d0765(){_0x2365ee[_0x4036('0x600')][_0x4036('0x7e4')]['call'](this),this['updateWeather']();}}}this['x']-=Math[_0x4036('0x488')](this['width']/0x2),this['y']=this[_0x4036('0x819')]()[_0x4036('0x304')]()[_0x4036('0x311')]-Math[_0x4036('0x488')](this[_0x4036('0x2b4')]()*1.5);},Window_EnemyName[_0x4036('0x24d')][_0x4036('0x408')]=function(){Window_Base[_0x4036('0x24d')]['resetFontSettings'][_0x4036('0x286')](this),this[_0x4036('0xe8')][_0x4036('0x1')]=VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x3e6')][_0x4036('0x4b9')];},Window_EnemyName[_0x4036('0x24d')][_0x4036('0x691')]=function(){this[_0x4036('0xe8')]['clear']();if(!this[_0x4036('0x819')]())return;this['_text']=this[_0x4036('0x819')]()[_0x4036('0x37d')]();const _0x49da18=this[_0x4036('0x40c')](this['_text'])[_0x4036('0x42')],_0x43ac2a=Math[_0x4036('0x488')]((this[_0x4036('0x3de')]-_0x49da18)/0x2);this[_0x4036('0x5bb')](this[_0x4036('0xb1')],_0x43ac2a,0x0,_0x49da18+0x8);},Window_BattleLog[_0x4036('0x24d')][_0x4036('0x796')]=function(){return VisuMZ['BattleCore'][_0x4036('0x635')]['BattleLog'][_0x4036('0x5eb')];},Window_BattleLog[_0x4036('0x24d')][_0x4036('0xf7')]=function(){return VisuMZ[_0x4036('0x600')][_0x4036('0x635')]['BattleLog'][_0x4036('0x357')];},Window_BattleLog['prototype'][_0x4036('0x69a')]=function(){return VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x54c')][_0x4036('0x3fb')];},Window_BattleLog[_0x4036('0x24d')]['isFastForward']=function(){return![];},Window_BattleLog[_0x4036('0x24d')][_0x4036('0x6b7')]=function(_0x1dc59e,_0x2c17a4){this[_0x4036('0x448')]('actionSplicePoint'),BattleManager['invokeAction'](_0x1dc59e,_0x2c17a4),this[_0x4036('0x283')]();},Window_BattleLog[_0x4036('0x24d')][_0x4036('0x5ef')]=function(){this[_0x4036('0x283')]();},Window_BattleLog[_0x4036('0x24d')][_0x4036('0x5d7')]=function(_0x203098){const _0x1406ba=Array['prototype']['slice'][_0x4036('0x286')](arguments,0x1),_0x69f166={'name':_0x203098,'params':_0x1406ba},_0x239c2d=this[_0x4036('0xe2')][_0x4036('0x5a4')](_0x9771f7=>_0x9771f7[_0x4036('0x37d')])[_0x4036('0x419')](_0x4036('0x5ef'));_0x239c2d>=0x0?this['_methods'][_0x4036('0x62e')](_0x239c2d,0x0,_0x69f166):this[_0x4036('0xe2')][_0x4036('0x5d7')](_0x69f166);},Window_BattleLog['prototype'][_0x4036('0x448')]=function(_0x3101d8){const _0x2e7722=Array[_0x4036('0x24d')][_0x4036('0x638')][_0x4036('0x286')](arguments,0x1);this[_0x4036('0xe2')][_0x4036('0x448')]({'name':_0x3101d8,'params':_0x2e7722});},Window_BattleLog[_0x4036('0x24d')][_0x4036('0x271')]=function(){if(!$gameTemp['isPlaytest']())return;console[_0x4036('0x2a6')](this[_0x4036('0xe2')][_0x4036('0x5a4')](_0x264be6=>_0x264be6[_0x4036('0x37d')])[_0x4036('0x116')]('\x0a'));},VisuMZ[_0x4036('0x600')]['Window_BattleLog_refresh']=Window_BattleLog[_0x4036('0x24d')]['refresh'],Window_BattleLog['prototype'][_0x4036('0x691')]=function(){this[_0x4036('0xdb')]=!![];},VisuMZ['BattleCore']['Window_BattleLog_update']=Window_BattleLog[_0x4036('0x24d')]['update'],Window_BattleLog['prototype']['update']=function(){VisuMZ[_0x4036('0x600')]['Window_BattleLog_update'][_0x4036('0x286')](this);if(this['_requestRefresh'])this[_0x4036('0x6fd')]();},Window_BattleLog[_0x4036('0x24d')]['processRefresh']=function(){this[_0x4036('0xdb')]=![],VisuMZ[_0x4036('0x600')][_0x4036('0x151')][_0x4036('0x286')](this);},Window_BattleLog[_0x4036('0x24d')][_0x4036('0x6c4')]=function(_0x3bf4ec){let _0x168444=VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x54c')][_0x4036('0x76e')][_0x4036('0x2c6')]()[_0x4036('0x330')](),_0x3c98a8=this[_0x4036('0x74d')][_0x3bf4ec];if(_0x3c98a8[_0x4036('0x161')](/<LEFT>/i))_0x168444=_0x4036('0x397');else{if(_0x3c98a8[_0x4036('0x161')](/<CENTER>/i)){if(_0x4036('0x221')!==_0x4036('0x221')){function _0xf634b5(){if(_0x2284e6[_0x4036('0x78a')]()&&_0x4e297e[_0x4036('0x3ee')]()<=0x0)return;this['processBattleCoreJS'](_0x4036('0x79d')),_0x35d6b7['BattleCore']['Game_Battler_regenerateAll'][_0x4036('0x286')](this),this[_0x4036('0x383')](),this['processBattleCoreJS'](_0x4036('0x41b'));}}else _0x168444=_0x4036('0x723');}else _0x3c98a8[_0x4036('0x161')](/<RIGHT>/i)&&(_0x168444=_0x4036('0x40e'));}_0x3c98a8=_0x3c98a8[_0x4036('0x7cc')](/<(?:LEFT|CENTER|RIGHT)>/gi,''),_0x3c98a8=_0x3c98a8[_0x4036('0x7cc')](/\\I\[0\]/gi,'');const _0x426e0f=this[_0x4036('0x7ce')](_0x3bf4ec);this[_0x4036('0xe8')]['clearRect'](_0x426e0f['x'],_0x426e0f['y'],_0x426e0f[_0x4036('0x42')],_0x426e0f['height']);const _0x3eea6e=this[_0x4036('0x40c')](_0x3c98a8)['width'];let _0x57afad=_0x426e0f['x'];if(_0x168444===_0x4036('0x723'))_0x57afad+=(_0x426e0f[_0x4036('0x42')]-_0x3eea6e)/0x2;else{if(_0x168444===_0x4036('0x40e')){if('AJqmX'!==_0x4036('0x3d'))_0x57afad+=_0x426e0f[_0x4036('0x42')]-_0x3eea6e;else{function _0x216f93(){return this[_0x4036('0x29a')]>0x0;}}}}this[_0x4036('0x5bb')](_0x3c98a8,_0x57afad,_0x426e0f['y'],_0x3eea6e+0x8);},Window_BattleLog[_0x4036('0x24d')]['addText']=function(_0x25489c){this[_0x4036('0x74d')]['push'](_0x25489c),this[_0x4036('0x691')](),this[_0x4036('0x283')]();},Window_BattleLog['prototype'][_0x4036('0x14a')]=function(){let _0x3fb6f6=![];switch(this[_0x4036('0x77e')]){case _0x4036('0x11'):_0x3fb6f6=this[_0x4036('0x5f8')]['isEffecting']();break;case'movement':_0x3fb6f6=this['_spriteset']['isAnyoneMoving']();break;case _0x4036('0x166'):_0x3fb6f6=this[_0x4036('0x5f8')][_0x4036('0x694')]();break;case _0x4036('0x561'):_0x3fb6f6=this[_0x4036('0x5f8')]['isAnyoneFloating']();break;case _0x4036('0x36e'):_0x3fb6f6=this['_spriteset'][_0x4036('0x7d0')]();break;case _0x4036('0x57b'):_0x3fb6f6=this[_0x4036('0x5f8')][_0x4036('0x665')]();break;}return!_0x3fb6f6&&(this[_0x4036('0x77e')]=''),_0x3fb6f6;},Window_BattleLog['prototype'][_0x4036('0x2ed')]=function(){this[_0x4036('0x310')](_0x4036('0x166'));},Window_BattleLog['prototype'][_0x4036('0x270')]=function(){this[_0x4036('0x310')](_0x4036('0x561'));},Window_BattleLog[_0x4036('0x24d')][_0x4036('0x48f')]=function(){this[_0x4036('0x310')](_0x4036('0x36e'));},Window_BattleLog[_0x4036('0x24d')][_0x4036('0x3c3')]=function(){this['setWaitMode'](_0x4036('0x57b'));},Window_BattleLog[_0x4036('0x24d')][_0x4036('0x159')]=function(){const _0x6b91c1=VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x54c')];if(!_0x6b91c1['StartTurnShow'])return;this['push']('addText',_0x6b91c1[_0x4036('0x78b')][_0x4036('0x4d2')]($gameTroop[_0x4036('0x3ee')]())),this[_0x4036('0x5d7')](_0x4036('0x7ee'),_0x6b91c1[_0x4036('0x4e1')]),this['push'](_0x4036('0x47b'));},Window_BattleLog[_0x4036('0x24d')][_0x4036('0x702')]=function(_0x1b2240,_0xf332ba,_0x13d641){if(this[_0x4036('0x145')](_0xf332ba)){if('JzFdp'!==_0x4036('0x76d'))BattleManager[_0x4036('0x218')]();else{function _0x4bf57d(){return this[_0x4036('0x78d')]();}}}else this[_0x4036('0x4f0')](_0x1b2240,_0xf332ba,_0x13d641);},Window_BattleLog[_0x4036('0x24d')][_0x4036('0x145')]=function(_0x236838){if(!SceneManager[_0x4036('0x78a')]())return![];if(!_0x236838)return![];if(!_0x236838['item']())return![];if(_0x236838[_0x4036('0x13a')]()['note']['match'](/<CUSTOM ACTION SEQUENCE>/i))return!![];return![];},Window_BattleLog[_0x4036('0x24d')][_0x4036('0x4f0')]=function(_0x29e88b,_0x4948ea,_0xeb11c){const _0x31023f=_0x4948ea[_0x4036('0x13a')]();this['setupActionSet'](_0x29e88b,_0x4948ea,_0xeb11c),this['createEffectActionSet'](_0x29e88b,_0x4948ea,_0xeb11c),this['finishActionSet'](_0x29e88b,_0x4948ea,_0xeb11c);},Window_BattleLog[_0x4036('0x24d')][_0x4036('0x3c0')]=function(_0x510ff4,_0x1f81ca){const _0x4e97e9=VisuMZ['BattleCore'][_0x4036('0x635')]['BattleLog'];if(_0x4e97e9[_0x4036('0x278')]){if(_0x4036('0x2eb')===_0x4036('0x344')){function _0x3abf71(){return _0x3e0ea7[_0x4036('0x600')]['Settings'][_0x4036('0x54c')][_0x4036('0x5eb')];}}else this[_0x4036('0x5d7')](_0x4036('0x596'),_0x4036('0x386')[_0x4036('0x4d2')](DataManager[_0x4036('0x318')](_0x1f81ca)));}if(DataManager[_0x4036('0x5e9')](_0x1f81ca)){if(_0x4e97e9[_0x4036('0x389')])this[_0x4036('0x61c')](_0x1f81ca[_0x4036('0x5b0')],_0x510ff4,_0x1f81ca);if(_0x4e97e9['ActionSkillMsg2'])this[_0x4036('0x61c')](_0x1f81ca[_0x4036('0x3ae')],_0x510ff4,_0x1f81ca);}else{if(_0x4036('0x57c')==='SHIDP'){if(_0x4e97e9[_0x4036('0x5a1')])this[_0x4036('0x61c')](TextManager[_0x4036('0x118')],_0x510ff4,_0x1f81ca);}else{function _0x27d273(){this[_0x4036('0x80e')][_0x4036('0x76f')][_0x4036('0xf5')]=this[_0x4036('0x2c9')][_0x4036('0x274')]();}}}},Window_BattleLog[_0x4036('0x24d')][_0x4036('0x320')]=function(_0x16a6a5,_0x53d7e6,_0x2064d8){const _0x29eaed=_0x53d7e6[_0x4036('0x13a')]();this['displayAction'](_0x16a6a5,_0x29eaed),this['push'](_0x4036('0x521'),_0x16a6a5,_0x2064d8,!![]),this[_0x4036('0x5d7')]('performActionStart',_0x16a6a5,_0x53d7e6),this[_0x4036('0x5d7')](_0x4036('0x483')),this['push'](_0x4036('0x3ea'),_0x16a6a5,_0x53d7e6),this[_0x4036('0x5d7')](_0x4036('0x2ed'));},Window_BattleLog[_0x4036('0x24d')][_0x4036('0x2b5')]=function(_0x32a690,_0x101877,_0x3146b2){if(this['isMeleeSingleTargetAction'](_0x101877)){if(_0x4036('0x72a')===_0x4036('0x72a'))this[_0x4036('0x36a')](_0x32a690,_0x101877,_0x3146b2);else{function _0x5ad63b(){return 0x0;}}}else{if(this['isMeleeMultiTargetAction'](_0x101877))this[_0x4036('0x63c')](_0x32a690,_0x101877,_0x3146b2);else{if(_0x101877[_0x4036('0x76b')]()){if(_0x4036('0x7f5')!==_0x4036('0x80d'))this['targetActionSet'](_0x32a690,_0x101877,_0x3146b2);else{function _0x48b18e(){if(!_0x3d9131[_0x4036('0x1c1')]())return;const _0x4663cc=this[_0x4036('0x304')]();if(!_0x4663cc)return;this[_0x4036('0x4a2')]()&&(_0xa5b230*=-0x1,_0xefdc77*=-0x1),_0x4663cc[_0x4036('0x59')](_0x52849e,_0x117c78,_0x3077a1,_0x28f18b);}}}else this[_0x4036('0xfc')](_0x32a690,_0x101877,_0x3146b2);}}},Window_BattleLog['prototype']['isMeleeSingleTargetAction']=function(_0x48194d){if(!_0x48194d[_0x4036('0x4a1')]())return![];if(!_0x48194d['isForOne']())return![];if(!_0x48194d['isForOpponent']())return![];return VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x74c')][_0x4036('0x5bf')];},Window_BattleLog[_0x4036('0x24d')][_0x4036('0x36a')]=function(_0x174bde,_0x2024d3,_0x2b3cdf){const _0x4b8b69=_0x174bde[_0x4036('0x77b')]()[_0x4036('0x3ce')]<0x2,_0x239cff=0x14,_0x450f46=0x30;if(_0x4b8b69){if(_0x4036('0x817')===_0x4036('0x817'))this['push'](_0x4036('0x1a8'),[_0x174bde],_0x450f46,_0x239cff),this[_0x4036('0x5d7')](_0x4036('0x62d'),_0x174bde,_0x2b3cdf,_0x4036('0x636'),_0x239cff,!![],_0x4036('0x167'),!![]),this[_0x4036('0x5d7')](_0x4036('0x530'),[_0x174bde],_0x4036('0x733')),this[_0x4036('0x5d7')](_0x4036('0x483'));else{function _0x48c13e(){this[_0x4036('0x312')][_0x4036('0x319')]['x']=this[_0x4036('0x788')],this['_distortionSprite'][_0x4036('0x319')]['y']=this['_targetSkewY'];}}}if(_0x2024d3['item']()[_0x4036('0x64e')]<0x0){if(_0x4036('0x409')===_0x4036('0x409'))this['targetActionSet'](_0x174bde,_0x2024d3,_0x2b3cdf);else{function _0x2f167c(){if(!this[_0x4036('0x7a2')])return;const _0x24f267=this[_0x4036('0x7a2')][_0x4036('0x660')]();for(const _0x1a92ad of _0x24f267){this['makeBattleCommand'](_0x1a92ad['toUpperCase']()[_0x4036('0x330')]());}}}}else{if('zxoRP'===_0x4036('0x545'))this['wholeActionSet'](_0x174bde,_0x2024d3,_0x2b3cdf);else{function _0x532e59(){_0x249a46=_0x3e330d[this[_0x4036('0x7a2')][_0x4036('0x2e1')]()];}}}if(_0x4b8b69){const _0x23c314=_0x174bde['battler']();this['push']('performJump',[_0x174bde],_0x450f46,_0x239cff),this[_0x4036('0x5d7')](_0x4036('0x555'),_0x174bde,_0x23c314[_0x4036('0x13b')],_0x23c314[_0x4036('0x47d')],_0x239cff,![],'Linear'),this[_0x4036('0x5d7')](_0x4036('0x530'),[_0x174bde],_0x4036('0x80a')),this['push'](_0x4036('0x483')),this[_0x4036('0x5d7')](_0x4036('0x530'),[_0x174bde],_0x4036('0x733'));}},Window_BattleLog[_0x4036('0x24d')]['isMeleeMultiTargetAction']=function(_0x222c79){if(!_0x222c79[_0x4036('0x4a1')]())return![];if(!_0x222c79['isForAll']())return![];if(!_0x222c79[_0x4036('0x341')]())return![];return VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x74c')]['AutoMeleeAoE'];},Window_BattleLog[_0x4036('0x24d')][_0x4036('0x63c')]=function(_0x30d308,_0x354be8,_0x9c8c81){const _0x161724=_0x30d308[_0x4036('0x77b')]()[_0x4036('0x3ce')]<0x2,_0x42dbb5=0x14,_0x31afe4=0x30;if(_0x161724){if(_0x4036('0x654')!==_0x4036('0x1d3'))this[_0x4036('0x5d7')](_0x4036('0x1a8'),[_0x30d308],_0x31afe4,_0x42dbb5),this[_0x4036('0x5d7')](_0x4036('0x62d'),_0x30d308,_0x9c8c81,_0x4036('0x170'),_0x42dbb5,!![],_0x4036('0x167'),!![]),this[_0x4036('0x5d7')]('requestMotion',[_0x30d308],_0x4036('0x733')),this[_0x4036('0x5d7')](_0x4036('0x483'));else{function _0x2f8384(){const _0x13a4f5=this[_0x4036('0x57d')](_0x47d5ce);if(_0x13a4f5==='iconText')this['drawItemStyleIconText'](_0x2b87ed);else _0x13a4f5===_0x4036('0x75f')?this[_0x4036('0x420')](_0x5d3cc9):_0x13e37a[_0x4036('0x24d')][_0x4036('0x86')][_0x4036('0x286')](this,_0x1fbd1a);this['drawSingleSkillCost'](_0x4b5037);}}}this[_0x4036('0xfc')](_0x30d308,_0x354be8,_0x9c8c81);if(_0x161724){const _0x2e6101=_0x30d308[_0x4036('0x304')]();this[_0x4036('0x5d7')](_0x4036('0x1a8'),[_0x30d308],_0x31afe4,_0x42dbb5),this['push'](_0x4036('0x555'),_0x30d308,_0x2e6101[_0x4036('0x13b')],_0x2e6101[_0x4036('0x47d')],_0x42dbb5,![],_0x4036('0x167')),this[_0x4036('0x5d7')](_0x4036('0x530'),[_0x30d308],_0x4036('0x80a')),this['push'](_0x4036('0x483')),this[_0x4036('0x5d7')](_0x4036('0x530'),[_0x30d308],'walk');}},Window_BattleLog['prototype']['targetActionSet']=function(_0x2282f3,_0x517bb7,_0x320b42){const _0x164849=_0x517bb7[_0x4036('0x13a')]();for(const _0x4843cf of _0x320b42){if(_0x4036('0x351')==='yzQAE'){if(!_0x4843cf)continue;this[_0x4036('0x5d7')](_0x4036('0x4e8'),_0x2282f3,_0x517bb7),this[_0x4036('0x5d7')](_0x4036('0x7ee'),Sprite_Battler[_0x4036('0x4c6')]),this['push'](_0x4036('0xf4'),_0x2282f3,[_0x4843cf],_0x164849[_0x4036('0x64e')]),this[_0x4036('0x5d7')](_0x4036('0x7ee'),0x18),this[_0x4036('0x5d7')](_0x4036('0x6b7'),_0x2282f3,_0x4843cf);}else{function _0x472abd(){this[_0x4036('0x312')][_0x4036('0x356')](this[_0x4036('0x781')]);}}}this['push'](_0x4036('0x521'),_0x2282f3,_0x320b42,![]);},Window_BattleLog[_0x4036('0x24d')][_0x4036('0xfc')]=function(_0x3ab596,_0x415a15,_0x2f3219){const _0x1526a3=_0x415a15['item']();this[_0x4036('0x5d7')](_0x4036('0x4e8'),_0x3ab596,_0x415a15),this[_0x4036('0x5d7')](_0x4036('0x7ee'),Sprite_Battler['_motionSpeed']),this[_0x4036('0x5d7')](_0x4036('0xf4'),_0x3ab596,_0x2f3219[_0x4036('0x41')](),_0x1526a3[_0x4036('0x64e')]),this[_0x4036('0x5d7')](_0x4036('0x2ed'));for(const _0x415b53 of _0x2f3219){if(!_0x415b53)continue;this['push'](_0x4036('0x6b7'),_0x3ab596,_0x415b53);}this[_0x4036('0x5d7')](_0x4036('0x521'),_0x3ab596,_0x2f3219,![]);},Window_BattleLog[_0x4036('0x24d')]['finishActionSet']=function(_0x31acec,_0xeb66bd,_0x2fe019){const _0x54461b=_0xeb66bd[_0x4036('0x13a')]();this[_0x4036('0x5d7')]('applyImmortal',_0x31acec,_0x2fe019,![]),this[_0x4036('0x5d7')](_0x4036('0x18d')),this[_0x4036('0x5d7')](_0x4036('0x322')),this[_0x4036('0x5d7')](_0x4036('0x47b')),this[_0x4036('0x5d7')](_0x4036('0x5a'),_0x31acec),this[_0x4036('0x5d7')](_0x4036('0x483'));},Window_BattleLog[_0x4036('0x24d')][_0x4036('0x25c')]=function(_0x244cdf){},VisuMZ[_0x4036('0x600')][_0x4036('0x4ee')]=Window_BattleLog[_0x4036('0x24d')][_0x4036('0x7ac')],Window_BattleLog[_0x4036('0x24d')][_0x4036('0x7ac')]=function(_0x46598a){if(!VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x54c')][_0x4036('0x80f')])return;VisuMZ[_0x4036('0x600')]['Window_BattleLog_displayCurrentState']['call'](this,_0x46598a);},Window_BattleLog['prototype'][_0x4036('0xa1')]=function(_0x1127c4){this[_0x4036('0x5d7')]('performCounter',_0x1127c4);VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x74c')][_0x4036('0x352')]&&this[_0x4036('0x5d7')](_0x4036('0xf4'),_0x1127c4,[BattleManager[_0x4036('0x398')]],-0x1);if(!VisuMZ[_0x4036('0x600')][_0x4036('0x635')]['BattleLog'][_0x4036('0x30b')])return;this['push'](_0x4036('0x596'),TextManager[_0x4036('0x39d')][_0x4036('0x4d2')](_0x1127c4[_0x4036('0x37d')]()));},Window_BattleLog['prototype'][_0x4036('0x51e')]=function(_0x2de74e){this[_0x4036('0x5d7')](_0x4036('0x82d'),_0x2de74e);if(!VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x54c')][_0x4036('0x6d0')])return;this[_0x4036('0x5d7')](_0x4036('0x596'),TextManager[_0x4036('0x367')][_0x4036('0x4d2')](_0x2de74e[_0x4036('0x37d')]()));},Window_BattleLog[_0x4036('0x24d')][_0x4036('0x1bf')]=function(_0x375a3e,_0x286ad9){if(VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x74c')][_0x4036('0x8b')]){const _0x31cd25=_0x286ad9[_0x4036('0x13a')]();this[_0x4036('0x5d7')](_0x4036('0xf4'),_0x375a3e,[_0x375a3e],_0x31cd25[_0x4036('0x64e')]);}},Window_BattleLog[_0x4036('0x24d')][_0x4036('0x328')]=function(_0x171fc5,_0x3f039b){this[_0x4036('0x5d7')](_0x4036('0x4af'),_0x171fc5,_0x3f039b);if(!VisuMZ['BattleCore'][_0x4036('0x635')][_0x4036('0x54c')][_0x4036('0x7e1')])return;const _0x371cd1=_0x171fc5[_0x4036('0x37d')](),_0x1fe89f=TextManager[_0x4036('0x98')]['format'](_0x371cd1,_0x3f039b[_0x4036('0x37d')]());this[_0x4036('0x5d7')](_0x4036('0x596'),_0x1fe89f);},VisuMZ[_0x4036('0x600')][_0x4036('0x15d')]=Window_BattleLog['prototype'][_0x4036('0x27')],Window_BattleLog[_0x4036('0x24d')][_0x4036('0x27')]=function(_0x1d99a1){if(!VisuMZ[_0x4036('0x600')]['Settings'][_0x4036('0x54c')][_0x4036('0x60d')])return;VisuMZ[_0x4036('0x600')][_0x4036('0x15d')][_0x4036('0x286')](this,_0x1d99a1);},VisuMZ[_0x4036('0x600')][_0x4036('0x56f')]=Window_BattleLog['prototype'][_0x4036('0x2a3')],Window_BattleLog['prototype']['displayCritical']=function(_0x304f44){if(!VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x54c')][_0x4036('0x4d0')])return;VisuMZ[_0x4036('0x600')][_0x4036('0x56f')][_0x4036('0x286')](this,_0x304f44);},VisuMZ['BattleCore'][_0x4036('0x6b')]=Window_BattleLog[_0x4036('0x24d')]['displayMiss'],Window_BattleLog[_0x4036('0x24d')][_0x4036('0x8d')]=function(_0x2ed176){!VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x54c')][_0x4036('0x23d')]?this[_0x4036('0x5d7')]('performMiss',_0x2ed176):VisuMZ[_0x4036('0x600')]['Window_BattleLog_displayMiss']['call'](this,_0x2ed176);},VisuMZ[_0x4036('0x600')][_0x4036('0x14b')]=Window_BattleLog[_0x4036('0x24d')][_0x4036('0x32')],Window_BattleLog[_0x4036('0x24d')][_0x4036('0x32')]=function(_0x133886){if(!VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x54c')]['ShowMissEvasion']){if(_0x4036('0x4e5')===_0x4036('0x7c8')){function _0x12a587(){_0x5ea186[_0x4036('0x50e')](0x0,0x0,_0x24a546[_0x4036('0x346')],_0x55d70d['EasingType']);}}else _0x133886[_0x4036('0x3d2')]()[_0x4036('0x82b')]?this[_0x4036('0x5d7')](_0x4036('0x81e'),_0x133886):this[_0x4036('0x5d7')](_0x4036('0xfb'),_0x133886);}else VisuMZ[_0x4036('0x600')][_0x4036('0x14b')][_0x4036('0x286')](this,_0x133886);},Window_BattleLog['prototype'][_0x4036('0x6ff')]=function(_0xea6175){if(_0xea6175[_0x4036('0x3d2')]()[_0x4036('0x7b1')]){if(_0x4036('0x707')!==_0x4036('0x707')){function _0x48c7f7(){if(_0x5ba518[_0x4036('0x3ce')]===0x0)this[_0x4036('0x530')](_0x4036('0x289'));else{if(_0xd8023a['type']===0x1)this[_0x4036('0x530')](_0x4036('0x374'));else _0x2fbe5f[_0x4036('0x3ce')]===0x2&&this[_0x4036('0x530')](_0x4036('0x753'));}this[_0x4036('0x7c3')](_0x3b4ae6[_0x4036('0x6cd')]);}}else{if(_0xea6175[_0x4036('0x3d2')]()[_0x4036('0x195')]>0x0&&!_0xea6175[_0x4036('0x3d2')]()[_0x4036('0x4cd')]){if(_0x4036('0x245')!=='FLnbt')this[_0x4036('0x5d7')](_0x4036('0x69b'),_0xea6175);else{function _0x4e5926(){const _0x425ce7=_0x1d8a87(_0x3d9224['$1']);return _0x315c74['aliveMembers']()[_0x4036('0x3c4')](_0x32503a=>_0x32503a['enemyId']()===_0x425ce7);}}}if(_0xea6175[_0x4036('0x3d2')]()[_0x4036('0x195')]<0x0){if(_0x4036('0x489')===_0x4036('0x489'))this[_0x4036('0x5d7')](_0x4036('0x7a4'),_0xea6175);else{function _0x3f193a(){const _0xd113b5=this[_0x4036('0x651')](_0x35f0ed),_0x6019c8=this[_0x4036('0x6a5')](_0x5392db),_0x2c9ed9=this[_0x4036('0x40c')](_0x6019c8)['width'];this[_0x4036('0x816')](this[_0x4036('0x717')](_0x43c5e7));const _0x4dacd3=this[_0x4036('0x82f')]();if(_0x4dacd3==='right')this[_0x4036('0x5bb')](_0x6019c8,_0xd113b5['x']+_0xd113b5[_0x4036('0x42')]-_0x2c9ed9,_0xd113b5['y'],_0x2c9ed9);else{if(_0x4dacd3===_0x4036('0x723')){const _0x4ff747=_0xd113b5['x']+_0x26f194[_0x4036('0x5bd')]((_0xd113b5[_0x4036('0x42')]-_0x2c9ed9)/0x2);this[_0x4036('0x5bb')](_0x6019c8,_0x4ff747,_0xd113b5['y'],_0x2c9ed9);}else this['drawTextEx'](_0x6019c8,_0xd113b5['x'],_0xd113b5['y'],_0x2c9ed9);}}}}VisuMZ[_0x4036('0x600')][_0x4036('0x635')]['BattleLog'][_0x4036('0x1a1')]&&this[_0x4036('0x5d7')](_0x4036('0x596'),this[_0x4036('0x6b1')](_0xea6175));}}},VisuMZ[_0x4036('0x600')]['Window_BattleLog_displayMpDamage']=Window_BattleLog[_0x4036('0x24d')][_0x4036('0x64a')],Window_BattleLog[_0x4036('0x24d')][_0x4036('0x64a')]=function(_0x3f30b6){if(!VisuMZ[_0x4036('0x600')][_0x4036('0x635')]['BattleLog'][_0x4036('0x5e6')])return;VisuMZ[_0x4036('0x600')][_0x4036('0x3ad')][_0x4036('0x286')](this,_0x3f30b6);},VisuMZ[_0x4036('0x600')][_0x4036('0x67d')]=Window_BattleLog[_0x4036('0x24d')][_0x4036('0x127')],Window_BattleLog[_0x4036('0x24d')]['displayTpDamage']=function(_0x20a932){if(!VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x54c')][_0x4036('0x2d0')])return;VisuMZ['BattleCore']['Window_BattleLog_displayTpDamage'][_0x4036('0x286')](this,_0x20a932);},Window_BattleLog[_0x4036('0x24d')][_0x4036('0x4c8')]=function(_0x18d11){const _0x2f63c3=_0x18d11[_0x4036('0x3d2')](),_0x57b2b0=_0x2f63c3[_0x4036('0x2b7')]();for(const _0x365354 of _0x57b2b0){if(_0x4036('0x6d1')!=='yKFOx'){function _0x3f21c2(){this[_0x4036('0xf3')]();}}else{const _0x34f446=_0x18d11[_0x4036('0x4a2')]()?_0x365354[_0x4036('0x5b0')]:_0x365354['message2'];_0x34f446&&VisuMZ[_0x4036('0x600')]['Settings'][_0x4036('0x54c')][_0x4036('0x222')]&&(this[_0x4036('0x5d7')](_0x4036('0x1fb')),this['push'](_0x4036('0x78e')),this[_0x4036('0x5d7')](_0x4036('0x596'),_0x34f446[_0x4036('0x4d2')](_0x18d11[_0x4036('0x37d')]())),this[_0x4036('0x5d7')](_0x4036('0x712')));if(_0x365354['id']===_0x18d11[_0x4036('0x1ca')]()){if(_0x4036('0x3b6')==='fzbRy'){function _0x43bf27(){if(!_0x5809de['isSceneBattle']())return;if(!_0x31e759[_0x4036('0x5a5')])return;_0x43f9ca[_0x4036('0x653')](_0x29538b,_0x23844d);const _0x9b9eb7=_0x48f12c[_0x4036('0x3df')](),_0x56a9e4=_0x46df69['WaitForAngle'];if(!_0x9b9eb7)return;_0x526c5f[_0x4036('0x2ab')](0x0,_0x57adbb[_0x4036('0x346')],_0x6dd720[_0x4036('0x1e3')]);if(_0x56a9e4)_0x9b9eb7['setWaitMode'](_0x4036('0x405'));}}else this[_0x4036('0x5d7')](_0x4036('0x1e8'),_0x18d11);}}}},Window_BattleLog[_0x4036('0x24d')]['displayRemovedStates']=function(_0x286c0e){if(!VisuMZ[_0x4036('0x600')][_0x4036('0x635')][_0x4036('0x54c')]['ShowRemovedState'])return;const _0xab81c3=_0x286c0e[_0x4036('0x3d2')](),_0x353034=_0xab81c3[_0x4036('0x1ff')]();for(const _0xa2578d of _0x353034){_0xa2578d[_0x4036('0x51d')]&&(this[_0x4036('0x5d7')](_0x4036('0x1fb')),this['push'](_0x4036('0x78e')),this[_0x4036('0x5d7')]('addText',_0xa2578d[_0x4036('0x51d')]['format'](_0x286c0e[_0x4036('0x37d')]())),this[_0x4036('0x5d7')](_0x4036('0x712')));}},Window_BattleLog[_0x4036('0x24d')][_0x4036('0x296')]=function(_0x14c008){const _0x2451ae=VisuMZ[_0x4036('0x600')]['Settings']['BattleLog'],_0x31c229=_0x14c008[_0x4036('0x3d2')]();if(_0x2451ae[_0x4036('0x20f')])this['displayBuffs'](_0x14c008,_0x31c229[_0x4036('0x605')],TextManager[_0x4036('0x6c3')]);if(_0x2451ae[_0x4036('0x4f1')])this[_0x4036('0x156')](_0x14c008,_0x31c229[_0x4036('0x244')],TextManager[_0x4036('0x685')]);if(_0x2451ae[_0x4036('0x321')])this[_0x4036('0x156')](_0x14c008,_0x31c229[_0x4036('0x242')],TextManager['buffRemove']);},Window_BattleLog[_0x4036('0x24d')]['displayBuffs']=function(_0x33d25b,_0x54c7ab,_0x1bf826){for(const _0x3f9f60 of _0x54c7ab){const _0x461a2c=_0x1bf826[_0x4036('0x4d2')](_0x33d25b[_0x4036('0x37d')](),TextManager[_0x4036('0x43e')](_0x3f9f60));this['push'](_0x4036('0x1fb')),this[_0x4036('0x5d7')](_0x4036('0x78e')),this[_0x4036('0x5d7')](_0x4036('0x596'),_0x461a2c),this[_0x4036('0x5d7')](_0x4036('0x712'));}},VisuMZ[_0x4036('0x600')][_0x4036('0x413')]=Window_BattleLog[_0x4036('0x24d')][_0x4036('0x47b')],Window_BattleLog[_0x4036('0x24d')][_0x4036('0x47b')]=function(){VisuMZ[_0x4036('0x600')]['Window_BattleLog_clear'][_0x4036('0x286')](this),this[_0x4036('0x283')]();},VisuMZ[_0x4036('0x600')][_0x4036('0x72f')]=Window_BattleLog[_0x4036('0x24d')]['pushBaseLine'],Window_BattleLog[_0x4036('0x24d')][_0x4036('0x78e')]=function(){VisuMZ['BattleCore'][_0x4036('0x72f')][_0x4036('0x286')](this),this['callNextMethod']();},VisuMZ[_0x4036('0x600')][_0x4036('0x142')]=Window_BattleLog[_0x4036('0x24d')]['popBaseLine'],Window_BattleLog['prototype'][_0x4036('0x1fb')]=function(){VisuMZ[_0x4036('0x600')]['Window_BattleLog_popBaseLine'][_0x4036('0x286')](this),this[_0x4036('0x691')](),this[_0x4036('0x283')]();},VisuMZ[_0x4036('0x600')][_0x4036('0x184')]=Window_BattleLog[_0x4036('0x24d')]['popupDamage'],Window_BattleLog[_0x4036('0x24d')][_0x4036('0x666')]=function(_0x3fe94e){VisuMZ[_0x4036('0x600')][_0x4036('0x184')][_0x4036('0x286')](this,_0x3fe94e),this[_0x4036('0x283')]();},Window_BattleLog[_0x4036('0x24d')]['waitForNewLine']=function(){let _0x279246=0x0;this[_0x4036('0x590')][_0x4036('0x6b5')]>0x0&&(_0x279246=this['_baseLineStack'][this['_baseLineStack']['length']-0x1]);if(this['_lines'][_0x4036('0x6b5')]>_0x279246){if(_0x4036('0x2e')!==_0x4036('0x2e')){function _0x262254(){const _0x18f617=this[_0x4036('0x304')]();if(_0x18f617)_0x18f617[_0x4036('0x54d')]();}}else this[_0x4036('0x712')]();}else{if(_0x4036('0x410')!==_0x4036('0x410')){function _0x5b0cf4(){_0x455814*=-0x1,_0x2f05b2*=-0x1;}}else this[_0x4036('0x283')]();}},VisuMZ[_0x4036('0x600')][_0x4036('0x149')]=Window_BattleLog['prototype'][_0x4036('0x5a9')],Window_BattleLog[_0x4036('0x24d')]['performActionStart']=function(_0x269c32,_0x54f241){VisuMZ[_0x4036('0x600')][_0x4036('0x149')][_0x4036('0x286')](this,_0x269c32,_0x54f241),this[_0x4036('0x283')]();},VisuMZ[_0x4036('0x600')][_0x4036('0x25b')]=Window_BattleLog[_0x4036('0x24d')]['performAction'],Window_BattleLog[_0x4036('0x24d')][_0x4036('0x4e8')]=function(_0x2c71b4,_0x2be516){VisuMZ[_0x4036('0x600')][_0x4036('0x25b')][_0x4036('0x286')](this,_0x2c71b4,_0x2be516),this[_0x4036('0x283')]();},VisuMZ[_0x4036('0x600')][_0x4036('0x2c1')]=Window_BattleLog['prototype']['performActionEnd'],Window_BattleLog[_0x4036('0x24d')][_0x4036('0x5a')]=function(_0x56a2cb){for(const _0x382d57 of BattleManager[_0x4036('0x17')]()){if(!_0x382d57)continue;if(_0x382d57[_0x4036('0x416')]())continue;_0x382d57[_0x4036('0x5a')]();}this['callNextMethod']();},VisuMZ[_0x4036('0x600')][_0x4036('0x15c')]=Window_BattleLog[_0x4036('0x24d')][_0x4036('0x69b')],Window_BattleLog[_0x4036('0x24d')][_0x4036('0x69b')]=function(_0x5e6129){VisuMZ[_0x4036('0x600')][_0x4036('0x15c')][_0x4036('0x286')](this,_0x5e6129),this[_0x4036('0x283')]();},VisuMZ['BattleCore'][_0x4036('0x68d')]=Window_BattleLog['prototype'][_0x4036('0x768')],Window_BattleLog[_0x4036('0x24d')][_0x4036('0x768')]=function(_0x372361){VisuMZ[_0x4036('0x600')]['Window_BattleLog_performMiss'][_0x4036('0x286')](this,_0x372361),this[_0x4036('0x283')]();},VisuMZ[_0x4036('0x600')][_0x4036('0x1a9')]=Window_BattleLog[_0x4036('0x24d')][_0x4036('0x7a4')],Window_BattleLog[_0x4036('0x24d')][_0x4036('0x7a4')]=function(_0x27ee81){VisuMZ['BattleCore'][_0x4036('0x1a9')][_0x4036('0x286')](this,_0x27ee81),this[_0x4036('0x283')]();},VisuMZ[_0x4036('0x600')][_0x4036('0x5d1')]=Window_BattleLog[_0x4036('0x24d')][_0x4036('0x81e')],Window_BattleLog['prototype'][_0x4036('0x81e')]=function(_0x497772){VisuMZ[_0x4036('0x600')][_0x4036('0x5d1')]['call'](this,_0x497772),this['callNextMethod']();},VisuMZ[_0x4036('0x600')][_0x4036('0x390')]=Window_BattleLog[_0x4036('0x24d')][_0x4036('0xfb')],Window_BattleLog[_0x4036('0x24d')][_0x4036('0xfb')]=function(_0x218c3c){VisuMZ[_0x4036('0x600')]['Window_BattleLog_performMagicEvasion'][_0x4036('0x286')](this,_0x218c3c),this[_0x4036('0x283')]();},VisuMZ[_0x4036('0x600')][_0x4036('0x79a')]=Window_BattleLog[_0x4036('0x24d')][_0x4036('0x207')],Window_BattleLog['prototype']['performCounter']=function(_0x504d64){VisuMZ[_0x4036('0x600')]['Window_BattleLog_performCounter'][_0x4036('0x286')](this,_0x504d64),this[_0x4036('0x283')]();},VisuMZ[_0x4036('0x600')][_0x4036('0x661')]=Window_BattleLog[_0x4036('0x24d')][_0x4036('0x82d')],Window_BattleLog[_0x4036('0x24d')][_0x4036('0x82d')]=function(_0x47b1be){VisuMZ[_0x4036('0x600')][_0x4036('0x661')][_0x4036('0x286')](this,_0x47b1be),this['callNextMethod']();},VisuMZ[_0x4036('0x600')]['Window_BattleLog_performSubstitute']=Window_BattleLog[_0x4036('0x24d')]['performSubstitute'],Window_BattleLog[_0x4036('0x24d')][_0x4036('0x4af')]=function(_0x380c0b,_0x3cc97b){VisuMZ[_0x4036('0x600')]['Window_BattleLog_performSubstitute']['call'](this,_0x380c0b,_0x3cc97b),this[_0x4036('0x283')]();},VisuMZ[_0x4036('0x600')][_0x4036('0x6fc')]=Window_BattleLog[_0x4036('0x24d')]['performCollapse'],Window_BattleLog[_0x4036('0x24d')][_0x4036('0x1e8')]=function(_0x4985f2){VisuMZ[_0x4036('0x600')][_0x4036('0x6fc')][_0x4036('0x286')](this,_0x4985f2),this[_0x4036('0x283')]();},Window_BattleLog[_0x4036('0x24d')][_0x4036('0x3ea')]=function(_0x457b25,_0x22a256){_0x457b25[_0x4036('0x3ea')](_0x22a256),this[_0x4036('0x283')]();},Window_BattleLog[_0x4036('0x24d')][_0x4036('0x22c')]=function(_0x34d9f1,_0x1d41fc){const _0x368e36=_0x34d9f1['attackAnimationId1']();if(_0x368e36<=0x0)SoundManager[_0x4036('0x28c')]();else{if(_0x4036('0x7f9')==='rIFnI')this['showNormalAnimation'](_0x1d41fc,_0x368e36);else{function _0x543408(){_0x466d95[_0x4036('0x600')][_0x4036('0x31f')]['call'](this),this['onEncounterBattleCore']();}}}},Window_BattleLog[_0x4036('0x24d')][_0x4036('0x521')]=function(_0x14139e,_0x594af6,_0x3ddcef){const _0x58ebbb=[_0x14139e][_0x4036('0x6df')](_0x594af6);for(const _0xb684e9 of _0x58ebbb){if(!_0xb684e9)continue;_0xb684e9[_0x4036('0x11c')](_0x3ddcef);}this['callNextMethod']();},Window_BattleLog['prototype']['waitCount']=function(_0x269151){this[_0x4036('0x457')]=_0x269151;},Window_BattleLog[_0x4036('0x24d')][_0x4036('0x530')]=function(_0x23f6c0,_0x1c2aea){for(const _0x46fd16 of _0x23f6c0){if(!_0x46fd16)continue;_0x46fd16[_0x4036('0x530')](_0x1c2aea);}this[_0x4036('0x283')]();},Window_BattleLog[_0x4036('0x24d')][_0x4036('0x555')]=function(_0x8c68a1,_0x1018c8,_0x4c5a57,_0x473aa1,_0xa85568,_0xc67983){_0x8c68a1[_0x4036('0x117')](_0x1018c8,_0x4c5a57,_0x473aa1,_0xa85568,_0xc67983,-0x1),this[_0x4036('0x283')]();},Window_BattleLog['prototype'][_0x4036('0x62d')]=function(_0x177ef3,_0x4337c2,_0x11227b,_0x42b3eb,_0x12b883,_0x4c7c4d,_0x3645d5){const _0x4c307a=Math[_0x4036('0x18c')](..._0x4337c2[_0x4036('0x5a4')](_0xb00f90=>_0xb00f90[_0x4036('0x304')]()[_0x4036('0x7b6')]-_0xb00f90[_0x4036('0x304')]()[_0x4036('0x21c')]()/0x2)),_0xf5286f=Math[_0x4036('0x577')](..._0x4337c2[_0x4036('0x5a4')](_0x5a9907=>_0x5a9907[_0x4036('0x304')]()[_0x4036('0x7b6')]+_0x5a9907[_0x4036('0x304')]()[_0x4036('0x21c')]()/0x2)),_0x4b19d4=Math[_0x4036('0x18c')](..._0x4337c2['map'](_0x1541bb=>_0x1541bb['battler']()[_0x4036('0x311')]-_0x1541bb[_0x4036('0x304')]()[_0x4036('0x290')]())),_0x5740ba=Math[_0x4036('0x577')](..._0x4337c2[_0x4036('0x5a4')](_0x2869e6=>_0x2869e6['battler']()[_0x4036('0x311')])),_0x2b1bd6=_0x4337c2['filter'](_0x2e0389=>_0x2e0389[_0x4036('0x4a2')]())['length'],_0x5fb484=_0x4337c2[_0x4036('0x3c4')](_0x4c4796=>_0x4c4796[_0x4036('0x68c')]())[_0x4036('0x6b5')];let _0x3639fb=0x0,_0x25bd56=0x0;if(_0x11227b[_0x4036('0x161')](/front/i))_0x3639fb=_0x2b1bd6>=_0x5fb484?_0x4c307a:_0xf5286f;else{if(_0x11227b[_0x4036('0x161')](/middle/i))_0x3639fb=(_0x4c307a+_0xf5286f)/0x2,_0x3645d5=-0x1;else{if(_0x11227b[_0x4036('0x161')](/back/i)){if(_0x4036('0xf9')===_0x4036('0xf9'))_0x3639fb=_0x2b1bd6>=_0x5fb484?_0xf5286f:_0x4c307a;else{function _0x32e728(){this[_0x4036('0x715')]=![];}}}}}if(_0x11227b[_0x4036('0x161')](/head/i)){if(_0x4036('0x391')==='DPQZS')_0x25bd56=_0x4b19d4;else{function _0x537443(){_0xa5b1e6[_0x4036('0x13a')]()[_0x4036('0xd4')]['type']>0x0?this[_0x4036('0x73c')]():this[_0x4036('0x530')](_0x4036('0x6ed'));}}}else{if(_0x11227b[_0x4036('0x161')](/center/i))_0x25bd56=(_0x4b19d4+_0x5740ba)/0x2;else _0x11227b[_0x4036('0x161')](/base/i)&&(_0x25bd56=_0x5740ba);}_0x177ef3[_0x4036('0x117')](_0x3639fb,_0x25bd56,_0x42b3eb,_0x12b883,_0x4c7c4d,_0x3645d5),this[_0x4036('0x283')]();},Window_BattleLog[_0x4036('0x24d')][_0x4036('0x1a8')]=function(_0xf8932,_0x5cd273,_0x487da8){for(const _0x15fe69 of _0xf8932){if(!_0x15fe69)continue;_0x15fe69[_0x4036('0x422')](_0x5cd273,_0x487da8);}this[_0x4036('0x283')]();};