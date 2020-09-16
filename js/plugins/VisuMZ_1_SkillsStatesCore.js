//=============================================================================
// VisuStella MZ - Skills & States Core
// VisuMZ_1_SkillsStatesCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_SkillsStatesCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillsStatesCore = VisuMZ.SkillsStatesCore || {};
VisuMZ.SkillsStatesCore.version = 1.03;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.03] [SkillsStatesCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skills_and_States_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Skills & States Core plugin extends and builds upon the functionality of
 * RPG Maker MZ's inherent skill, state, and buff functionalities and allows
 * game devs to customize its various aspects.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Assigning multiple Skill Types to Skills.
 * * Making custom Skill Cost Types (such as HP, Gold, and Items).
 * * Allowing Skill Costs to become percentile-based or dynamic either directly
 *   through the Skills themselves or through trait-like notetags.
 * * Replacing gauges for different classes to display different types of
 *   Skill Cost Type resources.
 * * Hiding/Showing and enabling/disabling skills based on switches, learned
 *   skills, and code.
 * * Setting rulings for states, including if they're cleared upon death, how
 *   reapplying the state affects their turn count, and more.
 * * Allowing states to be categorized and affected by categories, too.
 * * Displaying turn counts on states drawn in the window or on sprites.
 * * Manipulation of state, buff, and debuff turns through skill and item
 *   effect notetags.
 * * Create custom damage over time state calculations through notetags.
 * * Allow database objects to apply passive states to its user.
 * * Passive states can have conditions before they become active as well.
 * * Updated Skill Menu Scene layout to fit more modern appearances.
 * * Added bonus if Items & Equips Core is installed to utilize the Shop Status
 *   Window to display skill data inside the Skill Menu.
 * * Control over various aspects of the Skill Menu Scene.
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
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Buff & Debuff Level Management
 *
 * - In RPG Maker MZ, buffs and debuffs when applied to one another will shift
 * the buff modifier level up or down. This plugin will add an extra change to
 * the mechanic by making it so that once the buff modifier level reaches a
 * neutral point, the buff or debuff is removed altogether and resets the buff
 * and debuff turn counter for better accuracy.
 *
 * ---
 *
 * Skill Costs
 *
 * - In RPG Maker MZ, skill costs used to be hard-coded. Now, all Skill Cost
 * Types are now moved to the Plugin Parameters, including MP and TP. This
 * means that from payment to checking for them, it's all done through the
 * options available.
 *
 * - By default in RPG Maker MZ, displayed skill costs would only display only
 * one type: TP if available, then MP. If a skill costs both TP and MP, then
 * only TP was displayed. This plugin changes that aspect by displaying all the
 * cost types available in order of the Plugin Parameter Skill Cost Types.
 *
 * - By default in RPG Maker MZ, displayed skill costs were only color-coded.
 * This plugin changes that aspect by displaying the Skill Cost Type's name
 * alongside the cost. This is to help color-blind players distinguish what
 * costs a skill has.
 *
 * ---
 *
 * Sprite Gauges
 *
 * - Sprite Gauges in RPG Maker MZ by default are hard-coded and only work for
 * HP, MP, TP, and Time (used for ATB). This plugin makes it possible for them
 * to be customized through the use of Plugin Parameters under the Skill Cost
 * Types and their related-JavaScript entries.
 *
 * ---
 *
 * Window Functions Moved
 *
 * - Some functions found in RPG Maker MZ's default code for Window_StatusBase
 * and Window_SkillList are now moved to Window_Base to make the functions
 * available throughout all windows for usage.
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
 * === General Skill Notetags ===
 *
 * The following are general notetags that are skill-related.
 *
 * ---
 *
 * <Skill Type: x>
 * <Skill Types: x,x,x>
 *
 * <Skill Type: name>
 * <Skill Types: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Marks the skill to have multiple Skill Types, meaning they would appear
 *   under different skill types without needing to create duplicate skills.
 * - Replace 'x' with a number value representing the Skill Type's ID.
 * - If using 'name' notetag variant, replace 'name' with the Skill Type(s)
 *   name desired to be added.
 *
 * ---
 *
 * === Skill Cost Notetags ===
 *
 * The following are notetags that can be used to adjust skill costs. Some of
 * these notetags are added through the Plugin Parameter: Skill Cost Types and
 * can be altered there. This also means that some of these notetags can have
 * their functionality altered and/or removed.
 *
 * ---
 *
 * <type Cost: x>
 * <type Cost: x%>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to designate costs of custom or already existing
 *   types that cannot be made by the Database Editor.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the exact type cost value.
 *   This lets you bypass the Database Editor's limit of 9,999 MP and 100 TP.
 * - The 'x%' version is replaced with a percentile value to determine a cost
 *   equal to a % of the type's maximum quantity limit.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: 500>
 *   <MP Cost: 25%>
 *   <Gold Cost: 3000>
 *   <Potion Cost: 5>
 *
 * ---
 *
 * <type Cost Max: x>
 * <type Cost Min: x>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to ensure conditional and % costs don't become too
 *   large or too small.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the maximum or minimum values
 *   that the cost can be.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost Max: 1500>
 *   <MP Cost Min: 5>
 *   <Gold Cost Max: 10000>
 *   <Potion Cost Min: 3>
 *
 * ---
 *
 * <type Cost: +x>
 * <type Cost: -x>
 *
 * <type Cost: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - For % notetag variant: Replace 'x' with a number value to determine the
 *   rate to adjust the Skill Cost Type by as a flat value. This is applied
 *   before <type Cost: +x> and <type Cost: -x> notetags.
 * - For + and - notetag variants: Replace 'x' with a number value to determine
 *   how much to adjust the Skill Cost Type by as a flat value. This is applied
 *   after <type Cost: x%> notetags.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: +20>
 *   <MP Cost: -10>
 *   <Gold Cost: 50%>
 *   <Potion Cost: 200%>
 *
 * ---
 *
 * <Custom Cost Text>
 *  text
 * </Custom Cost Text>
 *
 * - Used for: Skill Notetags
 * - Allows you to insert custom text into the skill's cost area towards the
 *   end of the costs.
 * - Replace 'text' with the text you wish to display.
 * - Text codes may be used.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Costs ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine any dynamic Skill Cost Types used for particular skills.
 *
 * ---
 *
 * <JS type Cost>
 *  code
 *  code
 *  cost = code;
 * </JS type Cost>
 *
 * - Used for: Skill Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'code' to determine the type 'cost' of the skill.
 * - Insert the final type cost into the 'cost' variable.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - Functionality for the notetag can be altered in the Plugin Parameters.
 *
 * ---
 *
 * === Gauge Replacement Notetags ===
 *
 * Certain classes can have their gauges swapped out for other Skill Cost
 * Types. This is especially helpful for the classes that don't utilize those
 * Skill Cost Types. You can mix and match them however you want.
 *
 * ---
 *
 * <Replace HP Gauge: type>
 * <Replace MP Gauge: type>
 * <Replace TP Gauge: type>
 *
 * - Used for: Class Notetags
 * - Replaces the HP (1st), MP (2nd), or TP (3rd) gauge with a different Skill
 *   Cost Type.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'type' with 'none' to not display any gauges there.
 * - The <Replace TP Gauge: type> will require 'Display TP in Window' setting
 *   to be on in the Database > System 1 tab.
 * - Functionality for the notetags can be altered by changes made to the
 *   Skill & States Core Plugin Parameters.
 *
 * ---
 *
 * === Skill Accessibility Notetags ===
 *
 * Sometimes, you don't want all skills to be visible whether it be to hide
 * menu-only skills during battle, until certain switches are turned ON/OFF, or
 * until certain skills have been learned.
 *
 * ---
 *
 * <Hide in Battle>
 * <Hide outside Battle>
 *
 * - Used for: Skill Notetags
 * - Makes the specific skill visible or hidden depending on whether or not the
 *   player is currently in battle.
 *
 * ---
 *
 * <Show Switch: x>
 *
 * <Show All Switches: x,x,x>
 * <Show Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Switch: x>
 *
 * <Hide All Switches: x,x,x>
 * <Hide Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if learned Skill: x>
 *
 * <Show if learned All Skills: x,x,x>
 * <Show if learned Any Skills: x,x,x>
 *
 * <Show if learned Skill: name>
 *
 * <Show if learned All Skills: name, name, name>
 * <Show if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if learned Skill: x>
 *
 * <Hide if learned All Skills: x,x,x>
 * <Hide if learned Any Skills: x,x,x>
 *
 * <Hide if learned Skill: name>
 *
 * <Hide if learned All Skills: name, name, name>
 * <Hide if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if has Skill: x>
 *
 * <Show if have All Skills: x,x,x>
 * <Show if have Any Skills: x,x,x>
 *
 * <Show if has Skill: name>
 *
 * <Show if have All Skills: name, name, name>
 * <Show if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if has Skill: x>
 *
 * <Hide if have All Skills: x,x,x>
 * <Hide if have Any Skills: x,x,x>
 *
 * <Hide if has Skill: name>
 *
 * <Hide if have All Skills: name, name, name>
 * <Hide if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, skill will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, skill will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if a skill can be accessible visibly or through usage.
 *
 * ---
 *
 * <JS Skill Visible>
 *  code
 *  code
 *  visible = code;
 * </JS Skill Visible>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on JavaScript code.
 * - Replace 'code' to determine the type visibility of the skill.
 * - The 'visible' variable returns a boolean (true/false) to determine if the
 *   skill will be visible or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other visibility conditions must be met for this code to count.
 *
 * ---
 *
 * <JS Skill Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Skill Enable>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on JavaScript code.
 * - Replace 'code' to determine the type enabled status of the skill.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   skill will be enabled or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other skill conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === General State-Related Notetags ===
 *
 * The following notetags are centered around states, such as how their turn
 * counts are displayed, items and skills that affect state turns, if the state
 * can avoid removal by death state, etc.
 *
 * ---
 *
 * <No Death Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon death.
 *
 * ---
 *
 * <No Recover All Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon using the Recover All command.
 *
 * ---
 *
 * <Group Defeat>
 *
 * - Used for: State Notetags
 * - If an entire party is affected by states with the <Group Defeat> notetag,
 *   they are considered defeated.
 * - Usage for this includes party-wide petrification, frozen, etc.
 *
 * ---
 *
 * <Reapply Rules: Ignore>
 * <Reapply Rules: Reset>
 * <Reapply Rules: Greater>
 * <Reapply Rules: Add>
 *
 * - Used for: State Notetags
 * - Choose what kind of rules this state follows if the state is being applied
 *   to a target that already has the state. This affects turns specifically.
 * - 'Ignore' will bypass any turn changes.
 * - 'Reset' will recalculate the state's turns.
 * - 'Greater' will choose to either keep the current turn count if it's higher
 *   than the reset amount or reset it if the current turn count is lower.
 * - 'Add' will add the state's turn count to the applied amount.
 * - If this notetag isn't used, it will use the rules set in the States >
 *   Plugin Parameters.
 *
 * ---
 *
 * <Positive State>
 * <Negative State>
 *
 * - Used for: State Notetags
 * - Marks the state as a positive state or negative state, also altering the
 *   state's turn count color to match the Plugin Parameter settings.
 * - This also puts the state into either the 'Positive' category or
 *   'Negative' category.
 *
 * ---
 *
 * <Category: name>
 * <Category: name, name, name>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace 'name' with a category name to mark this state as.
 * - Insert multiples of this to mark the state with  multiple categories.
 *
 * ---
 *
 * <Categories>
 *  name
 *  name
 * </Categories>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace each 'name' with a category name to mark this state as.
 *
 * ---
 *
 * <State x Category Remove: y>
 *
 * - Used for: Skill, Item Notetags
 * - Allows the skill/item to remove 'y' states from specific category 'x'.
 * - Replace 'x' with a category name to remove from.
 * - Replace 'y' with the number of times to remove from that category.
 * - Insert multiples of this to remove different types of categories.
 *
 * ---
 *
 * <Hide State Turns>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - This will by pass any Plugin Parameter settings.
 *
 * ---
 *
 * <Turn Color: x>
 * <Turn Color: #rrggbb>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - Determines the color of the state's turn count.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 *
 * <State id Turns: +x>
 * <State id Turns: -x>
 *
 * <Set State id Turns: x>
 *
 * <State name Turns: +x>
 * <State name Turns: -x>
 *
 * <Set State name Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by state 'id' or state 'name', change the state
 *   turn duration for target.
 * - For 'id' variant, replace 'id' with the ID of the state to modify.
 * - For 'name' variant, replace 'name' with the name of the state to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple states at once.
 *
 * ---
 *
 * <param Buff Turns: +x>
 * <param Buff Turns: -x>
 *
 * <Set param Buff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' buff, change that buff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter buff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * <param Debuff Turns: +x>
 * <param Debuff Turns: -x>
 *
 * <Set param Debuff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' debuff, change that debuff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter debuff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * === JavaScript Notetags: On Add/Erase/Expire ===
 *
 * Using JavaScript code, you can use create custom effects that occur when a
 * state has bee added, erased, or expired.
 * 
 * ---
 *
 * <JS On Add State>
 *  code
 *  code
 * </JS On Add State>
 *
 * - Used for: State Notetags
 * - When a state is added, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Erase State>
 *  code
 *  code
 * </JS On Erase State>
 *
 * - Used for: State Notetags
 * - When a state is erased, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Expire State>
 *  code
 *  code
 * </JS On Expire State>
 *
 * - Used for: State Notetags
 * - When a state has expired, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * === JavaScript Notetags: Slip Damage/Healing ===
 *
 * Slip Damage, in RPG Maker vocabulary, refers to damage over time. The
 * following notetags allow you to perform custom slip damage/healing.
 *
 * ---
 *
 * <JS type Slip Damage>
 *  code
 *  code
 *  damage = code;
 * </JS type Slip Damage>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip damage is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip damage.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the damage.
 * - The 'state' variable refers to the current state being affected.
 * - The 'damage' variable is the finalized slip damage to be dealt.
 *
 * ---
 *
 * <JS type Slip Heal>
 *  code
 *  code
 *  heal = code;
 * </JS type Slip Heal>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip healing is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip healing.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the healing.
 * - The 'state' variable refers to the current state being affected.
 * - The 'heal' variable is the finalized slip healing to be recovered.
 *
 * ---
 *
 * === Passive State Notetags ===
 *
 * Passive States are states that are always applied to actors and enemies
 * provided that their conditions have been met. These can be granted through
 * database objects or through the Passive States Plugin Parameters.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 *
 * <Passive State: x>
 * <Passive States: x,x,x>
 *
 * <Passive State: name>
 * <Passive States: name, name, name>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy Notetags
 * - Adds passive state(s) x to trait object, applying it to related actor or
 *   enemy unit(s).
 * - Replace 'x' with a number to determine which state to add as a passive.
 * - If using 'name' notetag variant, replace 'name' with the name of the
 *   state(s) to add as a passive.
 * - Note: If you plan on applying a passive state through a skill, it must be
 *   through a skill that has been learned by the target and not a skill that
 *   is given through a trait.
 *
 * ---
 *
 * <Passive Stackable>
 *
 * - Used for: State Notetags
 * - Makes it possible for this passive state to be added multiple times.
 * - Otherwise, only one instance of the passive state can be available.
 *
 * ---
 *
 * <Passive Condition Switch ON: x>
 *
 * <Passive Condition All Switches ON: x,x,x>
 * <Passive Condition Any Switch ON: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are ON. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are ON. Otherwise, it would not be met.
 *
 * ---
 *
 * <Passive Condition Switch OFF: x>
 *
 * <Passive Condition All Switches OFF: x,x,x>
 * <Passive Condition Any Switch OFF: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are OFF. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are OFF. Otherwise, it would not be met.
 *
 * ---
 *
 * === JavaScript Notetags: Passive State ===
 *
 * The following is a notetag made for users with JavaScript knowledge to
 * determine if a passive state's condition can be met.
 *
 * ---
 *
 * <JS Passive Condition>
 *  code
 *  code
 *  condition = code;
 * </JS Passive Condition>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the state based on JavaScript code.
 * - Replace 'code' to determine if a passive state's condition has been met.
 * - The 'condition' variable returns a boolean (true/false) to determine if
 *   the passive state's condition is met or not.
 * - The 'user' variable refers to the user affected by the passive state.
 * - The 'state' variable refers to the passive state being checked.
 * - All other passive conditions must be met for this code to count.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Skill Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust various aspects of the game regarding skills
 * from the custom Skill Menu Layout to global custom effects made in code.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Skill Menu Layout provided by this plugin?
 *   - This will automatically enable the Status Window.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 *
 * Skill Type Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Skill Type Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Skill Type Window.
 *
 * ---
 *
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Skill Menu?:
 *   - Show the Shop Status Window in the Skill Menu?
 *   - This is enabled if the Updated Layout is on.
 * 
 *   Adjust List Window?:
 *   - Automatically adjust the Skill List Window in the Skill Menu if using
 *     the Shop Status Window?
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Shop Status Window in the
 *     Skill Menu.
 *
 * ---
 *
 * Skill Types
 * 
 *   Hidden Skill Types:
 *   - Insert the ID's of the Skill Types you want hidden from view ingame.
 * 
 *   Hidden During Battle:
 *   - Insert the ID's of the Skill Types you want hidden during battle only.
 * 
 *   Icon: Normal Type:
 *   - Icon used for normal skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 * 
 *   Icon: Magic Type:
 *   - Icon used for magic skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Skill Conditions:
 *   - JavaScript code for a global-wide skill condition check.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Skill Cost Types
 * ============================================================================
 *
 * Skill Cost Types are the resources that are used for your skills. These can
 * range from the default MP and TP resources to the newly added HP, Gold, and
 * Potion resources.
 *
 * ---
 *
 * Settings
 * 
 *   Name:
 *   - A name for this Skill Cost Type.
 * 
 *   Icon:
 *   - Icon used for this Skill Cost Type.
 *   - Use 0 for no icon.
 * 
 *   Font Color:
 *   - Text Color used to display this cost.
 *   - For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * 
 *   Font Size:
 *   - Font size used to display this cost.
 *
 * ---
 *
 * Cost Processing
 * 
 *   JS: Cost Calculation:
 *   - Code on how to calculate this resource cost for the skill.
 * 
 *   JS: Can Pay Cost?:
 *   - Code on calculating whether or not the user is able to pay the cost.
 * 
 *   JS: Paying Cost:
 *   - Code for if met, this is the actual process of paying of the cost.
 *
 * ---
 *
 * Window Display
 * 
 *   JS: Show Cost?:
 *   - Code for determining if the cost is shown or not.
 * 
 *   JS: Cost Text:
 *   - Code to determine the text (with Text Code support) used for the
 *     displayed cost.
 *
 * ---
 *
 * Gauge Display
 * 
 *   JS: Maximum Value:
 *   - Code to determine the maximum value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Current Value:
 *   - Code to determine the current value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Draw Gauge:
 *   - Code to determine how to draw the Skill Cost resource for this 
 *     gauge type.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General State Settings
 * ============================================================================
 *
 * These are general settings regarding RPG Maker MZ's state-related aspects
 * from how turns are reapplied to custom code that's ran whenever states are
 * added, erased, or expired.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying states.
 *   - Ignore: State doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let states go up to.
 *   - This can be changed with the <Max Turns: x> notetag.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display state turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Turn Color: Neutral:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Positive:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Negative:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Data Display
 * 
 *   Show Data?:
 *   - Display state data on top of window icons and sprites?
 * 
 *   Data Font Size:
 *   - Font size used for displaying state data.
 * 
 *   Offset X:
 *   - Offset the X position of the state data display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the state data display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is added.
 * 
 *   JS: On Erase State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is erased.
 * 
 *   JS: On Expire State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     has expired.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Buff/Debuff Settings
 * ============================================================================
 *
 * Buffs and debuffs don't count as states by RPG Maker MZ's mechanics, but
 * they do function close enough for them to be added to this plugin for
 * adjusting. Change these settings to make buffs and debuffs work to your
 * game's needs.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying buffs/debuffs.
 *   - Ignore: Buff/Debuff doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let buffs and debuffs go up to.
 *
 * ---
 *
 * Stacking
 * 
 *   Max Stacks: Buff:
 *   - Maximum number of stacks for buffs.
 * 
 *   Max Stacks: Debuff:
 *   - Maximum number of stacks for debuffs.
 * 
 *   JS: Buff/Debuff Rate:
 *   - Code to determine how much buffs and debuffs affect parameters.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display buff and debuff turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Color: Buffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Debuffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Rate Display
 * 
 *   Show Rate?:
 *   - Display buff and debuff rate on top of window icons and sprites?
 * 
 *   Rate Font Size:
 *   - Font size used for displaying rate.
 * 
 *   Offset X:
 *   - Offset the X position of the rate display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the rate display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Add Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Erase Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Erase Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Expire Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Expire Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Passive State Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust passive states that can affect all actors and
 * enemies as well as have global conditions.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 *
 * ---
 *
 * List
 * 
 *   Global Passives:
 *   - A list of passive states to affect actors and enemies.
 * 
 *   Actor-Only Passives:
 *   - A list of passive states to affect actors only.
 * 
 *   Enemy Passives:
 *   - A list of passive states to affect enemies only.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Condition Check:
 *   - JavaScript code for a global-wide passive condition check.
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
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.03: September 13, 2020
 * * Bug Fixes!
 * ** <JS type Slip Damage> custom notetags now work for passive states. Fix
 *    made by Olivia.
 * ** Setting the Command Window style to "Text Only" will no longer add in
 *    the icon text codes. Bug fixed by Yanfly.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** The JS Notetags for Add, Erase, and Expire states are now fixed. Fix made
 *    by Yanfly.
 * * Documentation Update!
 * ** <Show if learned Skill: x> and <Hide if learned Skill: x> notetags have
 *    the following added to their descriptions:
 * *** This does not apply to skills added by traits on actors, classes, any
 *     equipment, or states. These are not considered learned skills. They are
 *     considered temporary skills.
 * * New Features!
 * ** Notetags added by Yanfly:
 * *** <Show if has Skill: x>
 * *** <Show if have All Skills: x,x,x>
 * *** <Show if have Any Skills: x,x,x>
 * *** <Show if has Skill: name>
 * *** <Show if have All Skills: name, name, name>
 * *** <Show if have Any Skills: name, name, name>
 * *** <Hide if has Skill: x>
 * *** <Hide if have All Skills: x,x,x>
 * *** <Hide if have Any Skills: x,x,x>
 * *** <Hide if has Skill: name>
 * *** <Hide if have All Skills: name, name, name>
 * *** <Hide if have Any Skills: name, name, name>
 * *** These have been added to remove the confusion regarding learned skills
 *     as skills added through trait effects are not considered learned skills
 *     by RPG Maker MZ.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Passive states from Elements & Status Menu Core are now functional.
 *    Fix made by Olivia.
 * * Compatibility Update
 * ** Extended functions to allow for better compatibility.
 * * Updated documentation
 * ** Explains that passive states are not directly applied and are therefore
 *    not affected by code such as "a.isStateAffected(10)".
 * ** Instead, use "a.states().includes($dataStates[10])"
 * ** "Use #rrggbb for a hex color." lines now replaced with
 *    "For a hex color, use #rrggbb with VisuMZ_1_MessageCore"
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param SkillsStatesCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Skills:struct
 * @text Skill Settings
 * @type struct<Skills>
 * @desc Adjust general skill settings here.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","SkillTypeWindow":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","ListWindow":"","ListWindowCols:num":"1","ShopStatusWindow":"","ShowShopStatus:eval":"true","SkillSceneAdjustSkillList:eval":"true","SkillMenuStatusRect:func":"\"const ww = this.shopStatusWidth();\\nconst wh = this._itemWindow.height;\\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\\nconst wy = this._itemWindow.y;\\nreturn new Rectangle(wx, wy, ww, wh);\"","SkillTypes":"","HiddenSkillTypes:arraynum":"[]","BattleHiddenSkillTypes:arraynum":"[]","IconStypeNorm:num":"78","IconStypeMagic:num":"79","CustomJS":"","SkillConditionJS:func":"\"// Declare Variables\\nconst skill = arguments[0];\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet enabled = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn enabled;\""}
 *
 * @param Costs:arraystruct
 * @text Skill Cost Types
 * @parent Skills:struct
 * @type struct<Cost>[]
 * @desc A list of all the skill cost types added by this plugin
 * and the code that controls them in-game.
 * @default ["{\"Name:str\":\"HP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"20\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mhp / 100);\\\\n}\\\\nif (note.match(/<JS HP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS HP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<HP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<HP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<HP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<HP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nif (cost <= 0) {\\\\n    return true;\\\\n} else {\\\\n    return user._hp > cost;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._hp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.hp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mhp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.hp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Gauge\\\\nconst color1 = ColorManager.hpGaugeColor1();\\\\nconst color2 = ColorManager.hpGaugeColor2();\\\\nconst gx = 0;\\\\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\\\\nconst gw = sprite.bitmapWidth() - gx;\\\\nconst gh = sprite.gaugeHeight();\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.hpA;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.hpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"MP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"23\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = Math.floor(skill.mpCost * user.mcr);\\\\nif (note.match(/<MP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mmp / 100);\\\\n}\\\\nif (note.match(/<JS MP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS MP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<MP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<MP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<MP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<MP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._mp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._mp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.mp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mmp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Gauge\\\\nconst color1 = ColorManager.mpGaugeColor1();\\\\nconst color2 = ColorManager.mpGaugeColor2();\\\\nconst gx = 0;\\\\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\\\\nconst gw = sprite.bitmapWidth() - gx;\\\\nconst gh = sprite.gaugeHeight();\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.mpA;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.mpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"TP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"29\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = skill.tpCost;\\\\nif (note.match(/<TP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.maxTp() / 100);\\\\n}\\\\nif (note.match(/<JS TP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS TP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<TP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<TP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<TP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<TP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._tp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._tp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.tp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.maxTp();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.tp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Gauge\\\\nconst color1 = ColorManager.tpGaugeColor1();\\\\nconst color2 = ColorManager.tpGaugeColor2();\\\\nconst gx = 0;\\\\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\\\\nconst gw = sprite.bitmapWidth() - gx;\\\\nconst gh = sprite.gaugeHeight();\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.tpA;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.tpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Gold\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"17\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * $gameParty.gold() / 100);\\\\n}\\\\nif (note.match(/<JS GOLD COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS GOLD COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<GOLD COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<GOLD COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<GOLD COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<GOLD COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn $gameParty.gold() >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n$gameParty.loseGold(cost);\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.currencyUnit;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxGold();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.gold();\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.currencyUnit;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Potion\",\"Settings\":\"\",\"Icon:num\":\"176\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<POTION COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<JS POTION COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS POTION COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<POTION COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<POTION COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<POTION COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<POTION COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return Boolean\\\\nif (user.isActor() && cost > 0) {\\\\n    return $gameParty.numItems(item) >= cost;\\\\n} else {\\\\n    return true;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Process Payment\\\\nif (user.isActor()) {\\\\n    $gameParty.loseItem(item, cost);\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '×%1'.format(cost);\\\\n\\\\n// Text: Add Icon\\\\ntext += '\\\\\\\\\\\\\\\\I[%1]'.format(item.iconIndex);\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxItems(item);\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.numItems(item);\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst item = $dataItems[7];\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Gauge\\\\nconst color1 = ColorManager.textColor(30);\\\\nconst color2 = ColorManager.textColor(31);\\\\nconst gx = 0;\\\\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\\\\nconst gw = sprite.bitmapWidth() - gx;\\\\nconst gh = sprite.gaugeHeight();\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Icon\\\\nconst iconIndex = item.iconIndex;\\\\nconst iconBitmap = ImageManager.loadSystem(\\\\\\\"IconSet\\\\\\\");\\\\nconst pw = ImageManager.iconWidth;\\\\nconst ph = ImageManager.iconHeight;\\\\nconst sx = (iconIndex % 16) * pw;\\\\nconst sy = Math.floor(iconIndex / 16) * ph;\\\\nbitmap.blt(iconBitmap, sx, sy, pw, ph, 0, 0, 24, 24);\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}"]
 *
 * @param BreakSkills
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param States:struct
 * @text State Settings
 * @type struct<States>
 * @desc Adjust general state settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorNeutral:str":"0","ColorPositive:str":"24","ColorNegative:str":"27","Data":"","ShowData:eval":"true","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\"","onEraseStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param Buffs:struct
 * @text Buff/Debuff Settings
 * @parent States:struct
 * @type struct<Buffs>
 * @desc Adjust general buff/debuff settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","Stacking":"","StackBuffMax:num":"2","StackDebuffMax:num":"2","MultiplierJS:func":"\"// Declare Variables\\nconst user = this;\\nconst paramId = arguments[0];\\nconst buffLevel = arguments[1];\\nlet rate = 1;\\n\\n// Perform Calculations\\nrate += buffLevel * 0.25;\\n\\n// Return Rate\\nreturn Math.max(0, rate);\"","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorBuff:str":"24","ColorDebuff:str":"27","Data":"","ShowData:eval":"false","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onAddDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param PassiveStates:struct
 * @text Passive States
 * @parent States:struct
 * @type struct<PassiveStates>
 * @desc Adjust passive state settings here.
 * @default {"List":"","Global:arraynum":"[]","Actor:arraynum":"[]","Enemy:arraynum":"[]","CustomJS":"","PassiveConditionJS:func":"\"// Declare Variables\\nconst state = arguments[0];\\nconst stateId = state.id;\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet condition = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn condition;\""}
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
 * General Skill Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Skills:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Skill Menu Layout provided by this plugin?
 * This will automatically enable the Status Window.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent SkillTypeWindow
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Skill Type Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent SkillTypeWindow
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Skill Type Window.
 * @default left
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListWindowCols:num
 * @text Columns
 * @parent ListWindow
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 1
 *
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Skill Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Skill Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param SkillSceneAdjustSkillList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Skill List Window in the Skill Menu if using the Shop Status Window?
 * @default true
 *
 * @param SkillMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Shop Status Window in the Skill Menu.
 * @default "const ww = this.shopStatusWidth();\nconst wh = this._itemWindow.height;\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\nconst wy = this._itemWindow.y;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param SkillTypes
 * @text Skill Types
 *
 * @param HiddenSkillTypes:arraynum
 * @text Hidden Skill Types
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden from view ingame.
 * @default []
 *
 * @param BattleHiddenSkillTypes:arraynum
 * @text Hidden During Battle
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden during battle only.
 * @default []
 *
 * @param IconStypeNorm:num
 * @text Icon: Normal Type
 * @parent SkillTypes
 * @desc Icon used for normal skill types that aren't assigned any icons.
 * @default 78
 *
 * @param IconStypeMagic:num
 * @text Icon: Magic Type
 * @parent SkillTypes
 * @desc Icon used for magic skill types that aren't assigned any icons.
 * @default 79
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param SkillConditionJS:func
 * @text JS: Skill Conditions
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide skill condition check.
 * @default "// Declare Variables\nconst skill = arguments[0];\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet enabled = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn enabled;"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Cost Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Cost:
 *
 * @param Name:str
 * @text Name
 * @desc A name for this Skill Cost Type.
 * @default Untitled
 *
 * @param Settings
 *
 * @param Icon:num
 * @text Icon
 * @parent Settings
 * @desc Icon used for this Skill Cost Type.
 * Use 0 for no icon.
 * @default 0
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Settings
 * @desc Text Color used to display this cost.
 * For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @parent Settings
 * @type number
 * @min 1
 * @desc Font size used to display this cost.
 * @default 22
 *
 * @param Cost
 * @text Cost Processing
 *
 * @param CalcJS:func
 * @text JS: Cost Calculation
 * @parent Cost
 * @type note
 * @desc Code on how to calculate this resource cost for the skill.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nlet cost = 0;\n\n// Return cost value\nreturn Math.round(Math.max(0, cost));"
 *
 * @param CanPayJS:func
 * @text JS: Can Pay Cost?
 * @parent Cost
 * @type note
 * @desc Code on calculating whether or not the user is able to pay the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn true;"
 *
 * @param PayJS:func
 * @text JS: Paying Cost
 * @parent Cost
 * @type note
 * @desc Code for if met, this is the actual process of paying of the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Process Payment\n"
 *
 * @param Windows
 * @text Window Display
 *
 * @param ShowJS:func
 * @text JS: Show Cost?
 * @parent  Windows
 * @type note
 * @desc Code for determining if the cost is shown or not.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn cost > 0;"
 *
 * @param TextJS:func
 * @text JS: Cost Text
 * @parent  Windows
 * @type note
 * @desc Code to determine the text (with Text Code support) used for the displayed cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\nconst settings = arguments[2];\nconst fontSize = settings.FontSize;\nconst color = settings.FontColor;\nconst name = settings.Name;\nconst icon = settings.Icon;\nlet text = '';\n\n// Text: Change Font Size\ntext += '\\\\FS[%1]'.format(fontSize);\n\n// Text: Add Color\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\n    text += '\\\\HexColor<#%1>'.format(String(RegExp.$1));\n} else {\n    text += '\\\\C[%1]'.format(color);\n}\n\n// Text: Add Cost\ntext += '%1 %2'.format(cost, name);\n\n// Text: Add Icon\nif (icon  > 0) {\n    text += '\\\\I[%1]'.format(icon);\n}\n\n// Return text\nreturn text;"
 *
 * @param Gauges
 * @text Gauge Display
 *
 * @param GaugeMaxJS:func
 * @text JS: Maximum Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the maximum value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeCurrentJS:func
 * @text JS: Current Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the current value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeDrawJS:func
 * @text JS: Draw Gauge
 * @parent  Gauges
 * @type note
 * @desc Code to determine how to draw the Skill Cost resource for this gauge type.
 * @default "// Declare Variables\nconst sprite = this;\nconst settings = sprite._costSettings;\nconst bitmap = sprite.bitmap;\nconst user = sprite._battler;\nconst currentValue = sprite.currentDisplayedValue();\n\n// Draw Gauge\nconst color1 = ColorManager.textColor(30);\nconst color2 = ColorManager.textColor(31);\nconst gx = 0;\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\nconst gw = sprite.bitmapWidth() - gx;\nconst gh = sprite.gaugeHeight();\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\n\n// Draw Label\nconst label = settings.Name;\nconst lx = 4;\nconst ly = 0;\nconst lw = sprite.bitmapWidth();\nconst lh = sprite.bitmapHeight();\nsprite.setupLabelFont();\nbitmap.paintOpacity = 255;\nbitmap.drawText(label, lx, ly, lw, lh, \"left\");\n\n// Draw Value\nconst vw = sprite.bitmapWidth() - 2;\nconst vh = sprite.bitmapHeight();\nsprite.setupValueFont();\nbitmap.textColor = ColorManager.normalColor();\nbitmap.drawText(currentValue, 0, 0, vw, vh, \"right\");"
 *
 */
/* ----------------------------------------------------------------------------
 * General State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~States:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: State doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying states.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let states go up to.
 * This can be changed with the <Max Turns: x> notetag.
 * @default 9999
 *
 * @param Turns
 * @text Turn Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param ColorNeutral:str
 * @text Turn Color: Neutral
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorPositive:str
 * @text Turn Color: Positive
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorNegative:str
 * @text Turn Color: Negative
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Data Display
 *
 * @param ShowData:eval
 * @text Show Data?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state data on top of window icons and sprites?
 * @default true
 *
 * @param DataFontSize:num
 * @text Data Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying state data.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the state data display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the state data display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddStateJS:func
 * @text JS: On Add State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is added.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseStateJS:func
 * @text JS: On Erase State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is erased.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireStateJS:func
 * @text JS: On Expire State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state has expired.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * General Buff/Debuff Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Buffs:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: Buff/Debuff doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying buffs/debuffs.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let buffs and debuffs go up to.
 * @default 9999
 *
 * @param Stacking
 *
 * @param StackBuffMax:num
 * @text Max Stacks: Buff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for buffs.
 * @default 2
 *
 * @param StackDebuffMax:num
 * @text Max Stacks: Debuff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for debuffs.
 * @default 2
 *
 * @param MultiplierJS:func
 * @text JS: Buff/Debuff Rate
 * @parent Stacking
 * @type note
 * @desc Code to determine how much buffs and debuffs affect parameters.
 * @default "// Declare Variables\nconst user = this;\nconst paramId = arguments[0];\nconst buffLevel = arguments[1];\nlet rate = 1;\n\n// Perform Calculations\nrate += buffLevel * 0.25;\n\n// Return Rate\nreturn Math.max(0, rate);"
 *
 * @param Turns
 * @text Turns Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param ColorBuff:str
 * @text Turn Color: Buffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorDebuff:str
 * @text Turn Color: Debuffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Rate Display
 *
 * @param ShowData:eval
 * @text Show Rate?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff rate on top of window icons and sprites?
 * @default false
 *
 * @param DataFontSize:num
 * @text Rate Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying rate.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the rate display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the rate display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddBuffJS:func
 * @text JS: On Add Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onAddDebuffJS:func
 * @text JS: On Add Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseBuffJS:func
 * @text JS: On Erase Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseDebuffJS:func
 * @text JS: On Erase Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireBuffJS:func
 * @text JS: On Expire Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireDebuffJS:func
 * @text JS: On Expire Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Passive State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PassiveStates:
 *
 * @param List
 *
 * @param Global:arraynum
 * @text Global Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors and enemies.
 * @default []
 *
 * @param Actor:arraynum
 * @text Actor-Only Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors only.
 * @default []
 *
 * @param Enemy:arraynum
 * @text Enemy Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect enemies only.
 * @default []
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param PassiveConditionJS:func
 * @text JS: Condition Check
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide passive condition check.
 * @default "// Declare Variables\nconst state = arguments[0];\nconst stateId = state.id;\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet condition = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn condition;"
 *
 */
//=============================================================================

const _0x42f1=['text','log','Scene_Skill_statusWindowRect','Game_BattlerBase_refresh','floor','addBuffTurns','Ibnrr','addCommand','getStateOrigin','setStypeId','FJBrL','CmdStyle','qRMUX','allowCreateShopStatusWindow','isStateExpired','Game_Action_applyItemUserEffect','clamp','onExpireDebuffGlobalJS','mffTh','hasState','OswWW','addPassiveStatesByNotetag','itemWindowRectSkillsStatesCore','ATK','WCgPC','addDebuff','drawActorBuffRates','egYao','mZekS','zdMuM','GEJle','ovaZS','drawActorIconsAllTurnCounters','uCCBf','isMaxDebuffAffected','Game_BattlerBase_initMembers','NWfIK','skillCostSeparator','stateTpSlipDamageJS','makeAdditionalSkillCostText','onAddStateCustomJS','members','updateCommandNameWindow','setActor','stateData','ShowTurns','enemyId','maxCols','meetsPassiveStateConditionSwitches','mainCommandWidth','GcLus','anchor','clearStateRetainType','\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this.getCurrentStateActiveUser();\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','MaxTurns','Sprite_Gauge_gaugeRate','death','TurnOffsetX','FceWt','value','drawActorStateData','clearStateOrigin','ShowShopStatus','initialize','applyStateTurnManipulationEffects','stateTpSlipHealJS','buff','stypeId','skillTpCost','drawActorIcons','process_VisuMZ_SkillsStatesCore_State_Category','CalcJS','drawItemStyleIconText','updateFrame','Param','iiaQN','boxWidth','vVUDX','Scene_Skill_skillTypeWindowRect','makeCommandList','IBnuF','placeExactGauge','GWIil','FkzZd','addBuff','Game_BattlerBase_eraseBuff','stateMaximumTurns','isRightInputMode','JaEtT','meetsPassiveStateGlobalConditionJS','addState','user','Window_SkillList_setActor','getStateData','IconStypeNorm','MlfBv','debuffColor','gFVBy','meetsSkillConditionsEnableJS','_categoryWindow','VisuMZ_1_ItemsEquipsCore','qaBkl','Scene_Skill_helpWindowRect','setItem','isBottomHelpMode','gainHp','onEraseDebuffJS','isBuffOrDebuffAffected','ZNZPl','SkillConditionJS','yXrUS','drawText','_stored_debuffColor','sort','initMembers','ConvertParams','_currentTroopUniqueID','includes','eabpe','gzpRc','roiZk','setStateTurns','commandStyle','Buffs','Game_BattlerBase_skillTpCost','States','MAXMP','passiveStates','Enemy','regenerateAll','onExpireStateJS','getCurrentTroopUniqueID','uiMenuStyle','clearStates','getColor','removeStatesByCategory','Game_BattlerBase_overwriteBuffTurns','vXaxL','_cache','CoWhP','onExpireBuffGlobalJS','prototype','concat','createShopStatusWindow','Game_BattlerBase_resetStateCounts','_stateTurns','getStateOriginByKey','active','onEraseBuffGlobalJS','%1\x20%2\x20%3','Settings','_buffTurns','onEraseStateCustomJS','_stateMaxTurns','csDZo','usableSkills','DataOffsetY','process_VisuMZ_SkillsStatesCore_Skill_Cost','ScMLN','Game_BattlerBase_skillMpCost','KGLsA','DataFontSize','isSkillUsableForAutoBattle','yVmTK','states','removeBuff','cuYyi','skillTypes','buffTurns','NiPJn','keys','statePassiveConditionJS','currentDisplayedValue','mainAreaTop','getColorDataFromPluginParameters','KVQHc','isMaxBuffAffected','ShowJS','fillRect','TextJS','equips','CXCbQ','_stateDisplay','itemTextAlign','STR','convertPassiveStates','Window_SkillList_maxCols','_currentActor','ignore','name','autoRemovalTiming','PvAxA','mainFontFace','overwriteBuffTurns','slice','ZyBUX','makeSuccess','_battler','rhQAT','Game_Battler_regenerateAll','cGUCD','paramValueByName','_itemWindow','inBattle','eraseBuff','hvUEf','GaugeCurrentJS','checkShowHideJS','GroupDigits','EVAL','POSITIVE','HiddenSkillTypes','redrawSkillsStatesCore','getStypeIdWithName','Game_BattlerBase_eraseState','state','skillTypeWindowRect','ARRAYNUM','PtTDQ','bitmap','lineHeight','BTMSG','setupSkillsStatesCore','VisuMZ_0_CoreEngine','ARRAYSTRUCT','index','iconWidth','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','resetTextColor','nuvQW','jmARl','_buffs','skillId','priority','PassiveConditionJS','Game_BattlerBase_increaseBuff','DEF','setup','process_VisuMZ_SkillsStatesCore_State_PassiveJS','isGroupDefeatStateAffected','ColorNeutral','mpCost','CoreEngine','VisuMZ_1_ElementStatusCore','indexOf','EnableLayout','unbSo','onExpireState','Game_Troop_setup','wzDyN','jSzun','none','uSMEi','Game_BattlerBase_meetsSkillConditions','checkShowHideNotetags','redraw','checkSkillConditionsNotetags','canClearState','_stypeIDs','process_VisuMZ_SkillsStatesCore_Notetags','clearStateData','blMPi','nXttE','groupDefeat','Game_Actor_learnSkill','_stored_buffColor','center','onEraseDebuffGlobalJS','createSkillCostText','VSeJK','slipMp','drawItemStyleIcon','setStateRetainType','getStateIdWithName','drawItem','refresh','SqRJp','CanPayJS','greater','gaugeBackColor','SkillsStatesCore','mukNc','AONhO','updateHelp','paySkillCost','textSizeEx','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','clearStateDisplay','addPassiveStatesFromOtherPlugins','mbXhy','ZwKJJ','helpAreaHeight','drawIcon','Actor','checkShowHideSkillNotetags','skillMpCost','CmdTextAlign','Game_Battler_addDebuff','ColorBuff','process_VisuMZ_SkillsStatesCore_State_SlipEffectJS','onAddDebuffJS','currentMaxValue','WgRqE','push','item','LayoutStyle','LLSrS','Game_Actor_skillTypes','tvSrc','isUseSkillsStatesCoreUpdatedLayout','DisplayedParams','ZWHKu','commandStyleCheck','drawExtendedParameter','applyItemUserEffect','clear','process_VisuMZ_SkillsStatesCore_Skill_Notetags','JYhzo','IconStypeMagic','EjijI','heal','removeBuffsAuto','Scene_Skill_itemWindowRect','Game_BattlerBase_states','onAddBuffJS','mgVjp','scrollTo','getSkillIdWithName','stateExpireJS','buffIconIndex','currentClass','onExpireStateGlobalJS','setStateData','tjEEr','skillVisibleJS','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','buffLength','Costs','Game_Actor_forgetSkill','onDatabaseLoaded','MAT','round','stateId','stateHpSlipDamageJS','number','onEraseBuffJS','CbVqT','PwPvE','convertGaugeTypeSkillsStatesCore','isDebuffAffected','ZHugP','ReapplyRules','ceil','qkbPh','_stored_state-%1-color','loadBitmap','Sprite_StateIcon_loadBitmap','uiHelpPosition','meetsPassiveStateConditions','FUOMT','isActor','MAXHP','changeOutlineColor','DLbNx','Skills','PayJS','JSON','getStateRetainType','resetFontSettings','match','iconHeight','setStateOrigin','%1%','uDSjr','meetsStateCondition','vXqKV','stateColor','statusWindowRectSkillsStatesCore','stateEraseJS','Sprite_Gauge_setup','calcWindowHeight','HWpnV','stateHpSlipHealJS','MDF','kHMPq','allIcons','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20condition\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20condition;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','createCommandNameWindow','mEqAU','Sprite_Gauge_currentMaxValue','Sprite_Gauge_currentValue','_skillTypeWindow','Window_SkillList_includes','_turnDisplaySprite','VisuMZ_1_MainMenuCore','maxItems','iconIndex','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','addStateTurns','ListWindowCols','paramBuffRate','drawExtendedSkillsStatesCoreStatus','add','bzxtG','Scene_Boot_onDatabaseLoaded','PassiveStates','applyBuffTurnManipulationEffects','addWindow','onRegenerateCustomStateDamageOverTime','Sprite_Gauge_initMembers','gainSilentTp','vPnRV','convertTargetToStateOriginKey','frameCount','zVnJn','RpwQA','BattleHiddenSkillTypes','_costSettings','helpWindowRectSkillsStatesCore','statusWindowRect','makeCommandName','itemWindowRect','checkShowHideSwitchNotetags','onAddBuffGlobalJS','fontSize','callUpdateHelp','itemLineRect','setStateDisplay','isPassiveStateStackable','Game_BattlerBase_clearStates','xPxAT','version','TurnFontSize','_shopStatusWindow','nFede','process_VisuMZ_SkillsStatesCore_State_ApplyRemoveLeaveJS','onAddStateMakeCustomSlipValues','helpAreaTop','_subject','UIxgP','isLearnedSkill','onEraseDebuff','_stateRetainType','length','canUse','filter','Window_StatusBase_placeGauge','mainFontSize','Window_StatusBase_drawActorIcons','mrads','removeState','max','BrEhK','onAddState','Sprite_StateIcon_updateFrame','addPassiveStates','untitled','_colorCache','onAddDebuffGlobalJS','checkSkillConditionsSwitchNotetags','toeRT','LwBCG','meetsPassiveStateConditionJS','height','gaugeRate','toUpperCase','status','categories','DQplt','isBuffAffected','onEraseStateGlobalJS','<actor-%1>','eraseState','updateTurnDisplaySprite','MFgkX','addPassiveStatesByPluginParameters','stateAddJS','_statusWindow','_commandNameWindow','_stypeId','dHTAY','parse','NUM','resetStateCounts','meetsSkillConditions','ColorNegative','innerHeight','ColorPositive','ybolC','retrieveStateColor','forgetSkill','onAddStateJS','constructor','die','applySkillsStatesCoreEffects','getSkillTypes','commandNameWindowDrawText','StackDebuffMax','GBRNR','GlMIE','call','Game_BattlerBase_buffIconIndex','placeGauge','changeTextColor','actorId','isAllDead','recover\x20all','passiveStateObjects','commandName','woayU','success','adjustItemWidthByShopStatus','onRemoveState','setStatusWindow','slipHp','setDebuffTurns','xudty','checkShowHideBattleNotetags','stateMpSlipDamageJS','OAQGq','checkSkillTypeMatch','toLowerCase','menuActor','shopStatusWidth','format','jYxiI','skills','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','map','eBcGW','kBZeP','onAddDebuff','setPassiveStateSlipDamageJS','drawSkillCost','getCurrentStateActiveUser','LUK','gradientFillRect','onAddBuff','fontBold','applyStateCategoryRemovalEffects','tpCost','Game_BattlerBase_recoverAll','fontFace','Name','onExpireStateCustomJS','auto','_skillIDs','currentValueSkillsStatesCore','checkCacheKey','slipTp','updatedLayoutStyle','vyfkJ','drawActorBuffTurns','isPlaytest','nAUWy','onEraseStateJS','_result','actions','shopStatusWindowRectSkillsStatesCore','xXJAn','isBuffExpired','changePaintOpacity','skill','description','GlCxh','applyDebuffTurnManipulationEffects','learnSkill','includesSkillsStatesCore','drawActorStateTurns','SkillMenuStatusRect','jTHnr','Game_Battler_addState','_scene','dnRCg','TurnOffsetY','getStateReapplyRulings','_stateOrigin','mSFul','ColorDebuff','RSSUC','commandNameWindowDrawBackground','hasSkill','currentMaxValueSkillsStatesCore','\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20%2\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20%2\x20=\x20Math.round(Math.max(0,\x20%2)\x20*\x20%3);\x0a\x20\x20\x20\x20\x20\x20\x20\x20this.setStateData(stateId,\x20\x27%4\x27,\x20%2);\x0a\x20\x20\x20\x20','VVXtE','recoverAll','UmoKU','helpWindowRect','width','#%1','MZcLP','drawParamText','NEGATIVE','ySpKR','peMDf','GaugeMaxJS','_stateData','getCurrentStateOriginKey','mainAreaHeight','pwTba','replace','onEraseBuff','ZyAoY','right','isAlive','getStateDisplay','sTAst','textColor','giLjA','createAllSkillCostText','ANY','ARRAYJSON','stateTurns','uiInputPosition','AGI','fmsXM','addChild','meetsSkillConditionsGlobalJS','return\x200','Game_BattlerBase_die','OeDZU','MultiplierJS','process_VisuMZ_SkillsStatesCore_Skill_JS','bwdly','buttonAssistText1','Window_SkillList_updateHelp','StackBuffMax','drawFullGauge','HibzR','NwIXn','_skills','onAddStateGlobalJS','zFwhC','jZaGT','isSkillCostShown','damage','buttonAssistSwitch','skillEnableJS','commandNameWindowCenter','skillTypeWindowRectSkillsStatesCore','drawTextEx','shopStatusWindowRect','TvvEh','ARRAYFUNC','iconText','clearStatesWithStateRetain','onExpireBuff','rgba(0,\x200,\x200,\x201)','Sprite_Gauge_redraw','isPartyAllAffectedByGroupDefeatStates','isStateAffected','note','_actor','vulzD','JMDxa','Global','BPRqC','ETUcW','Game_BattlerBase_decreaseBuff','onExpireDebuff','dIfJG','_stateIDs','decreaseBuff','contents','currentValue','statesByCategory','opacity','hmvDk','enemy','XMJeE','icon','makeCurrentTroopUniqueID','uYHVj','outlineColor','Window_SkillType_initialize','removeStatesAuto','itemAt','Game_Unit_isAllDead','split','buffColor','Game_Battler_addBuff','actor','reset','addDebuffTurns','xfhhG','BIVgU','aliveMembers','IXBFT','isUseModernControls','FMseW','exit','GaugeDrawJS','gYEZh','setBuffTurns','createTurnDisplaySprite','Window_SkillStatus_refresh','stateMpSlipHealJS','debuffTurns','trim','regenerateAllSkillsStatesCore','gaugeLineHeight'];(function(_0x28c2ec,_0x42f12b){const _0x1f85de=function(_0x153d74){while(--_0x153d74){_0x28c2ec['push'](_0x28c2ec['shift']());}};_0x1f85de(++_0x42f12b);}(_0x42f1,0x10f));const _0x1f85=function(_0x28c2ec,_0x42f12b){_0x28c2ec=_0x28c2ec-0x0;let _0x1f85de=_0x42f1[_0x28c2ec];return _0x1f85de;};var label=_0x1f85('0x9'),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x1f85('0xae')](function(_0x242931){return _0x242931[_0x1f85('0xc3')]&&_0x242931[_0x1f85('0x124')]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x1f85('0x244')]=VisuMZ[label][_0x1f85('0x244')]||{},VisuMZ[_0x1f85('0x221')]=function(_0x5adda1,_0x2a0f62){for(const _0x16584c in _0x2a0f62){if(_0x1f85('0xd9')!==_0x1f85('0xd9')){function _0xa67839(){_0x1ced3c[_0x1f85('0xc4')][_0x1f85('0x20')](_0x5c2308[_0x1f85('0xc2')]()['trim']());}}else{if(_0x16584c[_0x1f85('0x62')](/(.*):(.*)/i)){const _0x2a24f0=String(RegExp['$1']),_0x539f27=String(RegExp['$2'])[_0x1f85('0xc2')]()[_0x1f85('0x1ab')]();let _0x519f9e,_0x46fbdf,_0x40bb84;switch(_0x539f27){case _0x1f85('0xd3'):_0x519f9e=_0x2a0f62[_0x16584c]!==''?Number(_0x2a0f62[_0x16584c]):0x0;break;case _0x1f85('0x287'):_0x46fbdf=_0x2a0f62[_0x16584c]!==''?JSON['parse'](_0x2a0f62[_0x16584c]):[],_0x519f9e=_0x46fbdf[_0x1f85('0x101')](_0x13900d=>Number(_0x13900d));break;case _0x1f85('0x27f'):_0x519f9e=_0x2a0f62[_0x16584c]!==''?eval(_0x2a0f62[_0x16584c]):null;break;case'ARRAYEVAL':_0x46fbdf=_0x2a0f62[_0x16584c]!==''?JSON[_0x1f85('0xd2')](_0x2a0f62[_0x16584c]):[],_0x519f9e=_0x46fbdf[_0x1f85('0x101')](_0x53fe54=>eval(_0x53fe54));break;case _0x1f85('0x5f'):_0x519f9e=_0x2a0f62[_0x16584c]!==''?JSON[_0x1f85('0xd2')](_0x2a0f62[_0x16584c]):'';break;case _0x1f85('0x154'):_0x46fbdf=_0x2a0f62[_0x16584c]!==''?JSON[_0x1f85('0xd2')](_0x2a0f62[_0x16584c]):[],_0x519f9e=_0x46fbdf[_0x1f85('0x101')](_0x5d9a22=>JSON[_0x1f85('0xd2')](_0x5d9a22));break;case'FUNC':_0x519f9e=_0x2a0f62[_0x16584c]!==''?new Function(JSON['parse'](_0x2a0f62[_0x16584c])):new Function(_0x1f85('0x15b'));break;case _0x1f85('0x174'):_0x46fbdf=_0x2a0f62[_0x16584c]!==''?JSON['parse'](_0x2a0f62[_0x16584c]):[],_0x519f9e=_0x46fbdf[_0x1f85('0x101')](_0x530c4a=>new Function(JSON[_0x1f85('0xd2')](_0x530c4a)));break;case _0x1f85('0x266'):_0x519f9e=_0x2a0f62[_0x16584c]!==''?String(_0x2a0f62[_0x16584c]):'';break;case'ARRAYSTR':_0x46fbdf=_0x2a0f62[_0x16584c]!==''?JSON[_0x1f85('0xd2')](_0x2a0f62[_0x16584c]):[],_0x519f9e=_0x46fbdf[_0x1f85('0x101')](_0x1a70ad=>String(_0x1a70ad));break;case'STRUCT':_0x40bb84=_0x2a0f62[_0x16584c]!==''?JSON['parse'](_0x2a0f62[_0x16584c]):{},_0x5adda1[_0x2a24f0]={},VisuMZ[_0x1f85('0x221')](_0x5adda1[_0x2a24f0],_0x40bb84);continue;case _0x1f85('0x28e'):_0x46fbdf=_0x2a0f62[_0x16584c]!==''?JSON['parse'](_0x2a0f62[_0x16584c]):[],_0x519f9e=_0x46fbdf[_0x1f85('0x101')](_0x243757=>VisuMZ[_0x1f85('0x221')]({},JSON[_0x1f85('0xd2')](_0x243757)));break;default:continue;}_0x5adda1[_0x2a24f0]=_0x519f9e;}}}return _0x5adda1;},(_0x3366cf=>{const _0x174cc2=_0x3366cf['name'];for(const _0x4df017 of dependencies){if(!Imported[_0x4df017]){if(_0x1f85('0x13')!==_0x1f85('0x8c')){alert(_0x1f85('0x100')['format'](_0x174cc2,_0x4df017)),SceneManager[_0x1f85('0x1a3')]();break;}else{function _0x1e8e40(){const _0x5dbd28=_0x226772[_0x1f85('0x17c')];return _0x5dbd28['match'](/<REAPPLY RULES:[ ](.*)>/i)?_0x125ff9(_0x4b923f['$1']):_0x4a355f[_0x1f85('0x9')][_0x1f85('0x244')][_0x1f85('0x22b')][_0x1f85('0x50')];}}}}const _0x3c826a=_0x3366cf[_0x1f85('0x124')];if(_0x3c826a[_0x1f85('0x62')](/\[Version[ ](.*?)\]/i)){if(_0x1f85('0x1e0')!==_0x1f85('0x1d2')){const _0x47cb7e=Number(RegExp['$1']);_0x47cb7e!==VisuMZ[label][_0x1f85('0xa0')]&&(alert(_0x1f85('0x291')[_0x1f85('0xfd')](_0x174cc2,_0x47cb7e)),SceneManager[_0x1f85('0x1a3')]());}else{function _0x3811f2(){this[_0x1f85('0x1')](_0x1f85('0xeb')),_0x1a599b[_0x1f85('0x9')]['Game_BattlerBase_recoverAll'][_0x1f85('0xe5')](this),this[_0x1f85('0x1e2')]();}}}if(_0x3c826a[_0x1f85('0x62')](/\[Tier[ ](\d+)\]/i)){const _0x20fca7=Number(RegExp['$1']);if(_0x20fca7<tier)alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x1f85('0xfd')](_0x174cc2,_0x20fca7,tier)),SceneManager[_0x1f85('0x1a3')]();else{if(_0x1f85('0x1cd')!==_0x1f85('0x23'))tier=Math[_0x1f85('0xb4')](_0x20fca7,tier);else{function _0x36515e(){return this[_0x1f85('0x6a')]();}}}}VisuMZ[_0x1f85('0x221')](VisuMZ[label][_0x1f85('0x244')],_0x3366cf['parameters']);})(pluginData),VisuMZ[_0x1f85('0x9')][_0x1f85('0x85')]=Scene_Boot[_0x1f85('0x23b')][_0x1f85('0x44')],Scene_Boot[_0x1f85('0x23b')][_0x1f85('0x44')]=function(){VisuMZ[_0x1f85('0x9')][_0x1f85('0x85')][_0x1f85('0xe5')](this),this['process_VisuMZ_SkillsStatesCore_Notetags']();},Scene_Boot[_0x1f85('0x23b')][_0x1f85('0x2b1')]=function(){this['process_VisuMZ_SkillsStatesCore_Skill_Notetags'](),this['process_VisuMZ_SkillsStatesCore_State_Notetags']();},Scene_Boot[_0x1f85('0x23b')][_0x1f85('0x2d')]=function(){for(const _0x481da1 of $dataSkills){if(_0x1f85('0x148')===_0x1f85('0x36')){function _0x349d79(){return _0x37b985;}}else{if(!_0x481da1)continue;this[_0x1f85('0x24b')](_0x481da1),this[_0x1f85('0x15f')](_0x481da1);}}},Scene_Boot[_0x1f85('0x23b')]['process_VisuMZ_SkillsStatesCore_Skill_Cost']=function(_0x44febb){const _0x428f0a=_0x44febb[_0x1f85('0x17c')];_0x428f0a[_0x1f85('0x62')](/<MP COST:[ ](\d+)>/i)&&(_0x44febb[_0x1f85('0x29f')]=Number(RegExp['$1']));if(_0x428f0a[_0x1f85('0x62')](/<TP COST:[ ](\d+)>/i)){if(_0x1f85('0x200')===_0x1f85('0x200'))_0x44febb[_0x1f85('0x10d')]=Number(RegExp['$1']);else{function _0xee883e(){_0x421d9f[_0x1f85('0x9')][_0x1f85('0x244')]['Buffs'][_0x1f85('0x35')]['call'](this,_0x431acd,_0x3e7756);}}}},VisuMZ[_0x1f85('0x9')][_0x1f85('0x16e')]={},VisuMZ['SkillsStatesCore'][_0x1f85('0x3f')]={},Scene_Boot[_0x1f85('0x23b')][_0x1f85('0x15f')]=function(_0x42e95d){const _0x278935=_0x42e95d[_0x1f85('0x17c')];if(_0x278935['match'](/<JS SKILL ENABLE>\s*([\s\S]*)\s*<\/JS SKILL ENABLE>/i)){if(_0x1f85('0x2aa')!==_0x1f85('0x2aa')){function _0x31a2e7(){this[_0x1f85('0xab')]=_0x52133a;}}else{const _0x5a2453=String(RegExp['$1']),_0x157df8=_0x1f85('0x40')['format'](_0x5a2453);VisuMZ['SkillsStatesCore'][_0x1f85('0x16e')][_0x42e95d['id']]=new Function(_0x1f85('0x123'),_0x157df8);}}if(_0x278935[_0x1f85('0x62')](/<JS SKILL VISIBLE>\s*([\s\S]*)\s*<\/JS SKILL VISIBLE>/i)){if(_0x1f85('0x11b')!==_0x1f85('0x2b3')){const _0x4b2ea0=String(RegExp['$1']),_0x5d1cd0=_0x1f85('0x7e')[_0x1f85('0xfd')](_0x4b2ea0);VisuMZ[_0x1f85('0x9')][_0x1f85('0x3f')][_0x42e95d['id']]=new Function(_0x1f85('0x123'),_0x5d1cd0);}else{function _0x349f4e(){_0x4888b5(_0x1f85('0xf')[_0x1f85('0xfd')](_0x3bf7cb,_0x5264f7,_0x523f4c)),_0x4d18ed[_0x1f85('0x1a3')]();}}}},Scene_Boot[_0x1f85('0x23b')]['process_VisuMZ_SkillsStatesCore_State_Notetags']=function(){for(const _0x32ccc2 of $dataStates){if(_0x1f85('0xb2')!==_0x1f85('0x165')){if(!_0x32ccc2)continue;this[_0x1f85('0x1f4')](_0x32ccc2),this[_0x1f85('0x29c')](_0x32ccc2),this[_0x1f85('0x1c')](_0x32ccc2),this[_0x1f85('0xa4')](_0x32ccc2);}else{function _0x50fc75(){const _0x14184e=_0x2110e4[_0x1f85('0x17c')];if(_0x86dc8c===_0x1f85('0x1e6')&&_0x14184e[_0x1f85('0x62')](/<NO DEATH CLEAR>/i))return![];if(_0xf84e97===_0x1f85('0xeb')&&_0x14184e[_0x1f85('0x62')](/<NO RECOVER ALL CLEAR>/i))return![];}}}},Scene_Boot['prototype'][_0x1f85('0x1f4')]=function(_0x552e94){_0x552e94[_0x1f85('0xc4')]=['ALL',_0x1f85('0x153')];const _0x37746a=_0x552e94[_0x1f85('0x17c')],_0x4ce286=_0x37746a[_0x1f85('0x62')](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x4ce286)for(const _0x597753 of _0x4ce286){_0x597753[_0x1f85('0x62')](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x2e13b6=String(RegExp['$1'])[_0x1f85('0xc2')]()[_0x1f85('0x1ab')]()[_0x1f85('0x197')](',');for(const _0x3a3251 of _0x2e13b6){if(_0x1f85('0x14b')!==_0x1f85('0x166'))_0x552e94[_0x1f85('0xc4')]['push'](_0x3a3251[_0x1f85('0x1ab')]());else{function _0x479d73(){const _0x4715a2=_0x4a96e2[_0x1f85('0xd2')]('['+_0x2c5819['$1'][_0x1f85('0x62')](/\d+/g)+']');for(const _0x4822a9 of _0x4715a2){if(!this[_0x1f85('0x17d')][_0x1f85('0xa9')](_0x4822a9))return!![];}return![];}}}}if(_0x37746a[_0x1f85('0x62')](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){const _0x32edb1=RegExp['$1']['split'](/[\r\n]+/);for(const _0x16066e of _0x32edb1){_0x552e94['categories'][_0x1f85('0x20')](_0x16066e[_0x1f85('0xc2')]()['trim']());}}_0x37746a['match'](/<POSITIVE STATE>/i)&&_0x552e94['categories'][_0x1f85('0x20')](_0x1f85('0x280'));if(_0x37746a[_0x1f85('0x62')](/<NEGATIVE STATE>/i)){if('wzDyN'!==_0x1f85('0x2a7')){function _0x2c655c(){return _0x28a593(_0x3556cf['$1']);}}else _0x552e94[_0x1f85('0xc4')][_0x1f85('0x20')]('NEGATIVE');}},VisuMZ[_0x1f85('0x9')][_0x1f85('0x259')]={},Scene_Boot[_0x1f85('0x23b')][_0x1f85('0x29c')]=function(_0x223604){const _0x53c525=_0x223604['note'];if(_0x53c525[_0x1f85('0x62')](/<JS PASSIVE CONDITION>\s*([\s\S]*)\s*<\/JS PASSIVE CONDITION>/i)){if(_0x1f85('0x25d')===_0x1f85('0x25d')){const _0x194826=String(RegExp['$1']),_0x52d8c6='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20condition\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20condition;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x1f85('0xfd')](_0x194826);VisuMZ['SkillsStatesCore'][_0x1f85('0x259')][_0x223604['id']]=new Function(_0x1f85('0x285'),_0x52d8c6);}else{function _0x283ca3(){const _0x2d0c27=this[_0x1f85('0x152')](_0x20c60b,_0x54dfde),_0x43f498=this[_0x1f85('0xe')](_0x2d0c27,_0xae3a4f,_0x3c1da1,_0x3af9ad),_0x56a773=_0x5becd6+_0x2dda33-_0x43f498[_0x1f85('0x13d')];this['drawTextEx'](_0x2d0c27,_0x56a773,_0x1a0912,_0x32aa67),this[_0x1f85('0x61')]();}}}},VisuMZ[_0x1f85('0x9')]['stateHpSlipDamageJS']={},VisuMZ[_0x1f85('0x9')][_0x1f85('0x6f')]={},VisuMZ[_0x1f85('0x9')][_0x1f85('0xf7')]={},VisuMZ[_0x1f85('0x9')]['stateMpSlipHealJS']={},VisuMZ['SkillsStatesCore'][_0x1f85('0x1d4')]={},VisuMZ[_0x1f85('0x9')][_0x1f85('0x1ef')]={},Scene_Boot[_0x1f85('0x23b')][_0x1f85('0x1c')]=function(_0x4b3333){const _0x5cae10=_0x4b3333['note'],_0xb04af=_0x1f85('0x138');if(_0x5cae10[_0x1f85('0x62')](/<JS HP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS HP SLIP DAMAGE>/i)){const _0x5708aa=String(RegExp['$1']),_0x36252b=_0xb04af[_0x1f85('0xfd')](_0x5708aa,'damage',-0x1,'slipHp');VisuMZ[_0x1f85('0x9')]['stateHpSlipDamageJS'][_0x4b3333['id']]=new Function(_0x1f85('0x47'),_0x36252b);}else{if(_0x5cae10[_0x1f85('0x62')](/<JS HP SLIP HEAL>\s*([\s\S]*)\s*<\/JS HP SLIP HEAL>/i)){if(_0x1f85('0xe3')===_0x1f85('0x248')){function _0x4f7412(){return _0x1c63b5['uiHelpPosition'];}}else{const _0x401753=String(RegExp['$1']),_0x398e4c=_0xb04af[_0x1f85('0xfd')](_0x401753,_0x1f85('0x31'),0x1,_0x1f85('0xf3'));VisuMZ[_0x1f85('0x9')][_0x1f85('0x6f')][_0x4b3333['id']]=new Function(_0x1f85('0x47'),_0x398e4c);}}}if(_0x5cae10[_0x1f85('0x62')](/<JS MP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS MP SLIP DAMAGE>/i)){const _0x1d1f74=String(RegExp['$1']),_0x173bfb=_0xb04af[_0x1f85('0xfd')](_0x1d1f74,_0x1f85('0x16c'),-0x1,_0x1f85('0x2bc'));VisuMZ['SkillsStatesCore']['stateMpSlipDamageJS'][_0x4b3333['id']]=new Function('stateId',_0x173bfb);}else{if(_0x5cae10[_0x1f85('0x62')](/<JS MP SLIP HEAL>\s*([\s\S]*)\s*<\/JS MP SLIP HEAL>/i)){if(_0x1f85('0x1c6')===_0x1f85('0x1c6')){const _0x618c75=String(RegExp['$1']),_0x403793=_0xb04af[_0x1f85('0xfd')](_0x618c75,_0x1f85('0x31'),0x1,_0x1f85('0x2bc'));VisuMZ['SkillsStatesCore'][_0x1f85('0x1a9')][_0x4b3333['id']]=new Function(_0x1f85('0x47'),_0x403793);}else{function _0x56aa5f(){const _0x6f15b6=_0x8701af(_0x54f793['$1']),_0x1878d6=_0x239c67[_0x1f85('0xfd')](_0x6f15b6,_0x1f85('0x31'),0x1,_0x1f85('0x2bc'));_0x28e6b3[_0x1f85('0x9')][_0x1f85('0x1a9')][_0x4de164['id']]=new _0x796b21(_0x1f85('0x47'),_0x1878d6);}}}}if(_0x5cae10[_0x1f85('0x62')](/<JS TP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS TP SLIP DAMAGE>/i)){if(_0x1f85('0xa')===_0x1f85('0x254')){function _0x1910d1(){const _0x47028c=this[_0x1f85('0x1df')](),_0x5cf2cb=this[_0x1f85('0x6d')](0x3,!![]),_0x4be4d0=this[_0x1f85('0x205')]()?_0x21e80f['boxWidth']-_0x47028c:0x0,_0x37392a=this[_0x1f85('0x25b')]();return new _0x4d8a0c(_0x4be4d0,_0x37392a,_0x47028c,_0x5cf2cb);}}else{const _0x794a72=String(RegExp['$1']),_0x2d2665=_0xb04af[_0x1f85('0xfd')](_0x794a72,'damage',-0x1,'slipTp');VisuMZ[_0x1f85('0x9')][_0x1f85('0x1d4')][_0x4b3333['id']]=new Function(_0x1f85('0x47'),_0x2d2665);}}else{if(_0x5cae10['match'](/<JS TP SLIP HEAL>\s*([\s\S]*)\s*<\/JS TP SLIP HEAL>/i)){const _0x31354f=String(RegExp['$1']),_0x2ad9b2=_0xb04af[_0x1f85('0xfd')](_0x31354f,_0x1f85('0x31'),0x1,_0x1f85('0x116'));VisuMZ[_0x1f85('0x9')][_0x1f85('0x1ef')][_0x4b3333['id']]=new Function(_0x1f85('0x47'),_0x2ad9b2);}}},VisuMZ[_0x1f85('0x9')][_0x1f85('0xcd')]={},VisuMZ[_0x1f85('0x9')][_0x1f85('0x6b')]={},VisuMZ[_0x1f85('0x9')][_0x1f85('0x39')]={},Scene_Boot['prototype']['process_VisuMZ_SkillsStatesCore_State_ApplyRemoveLeaveJS']=function(_0x3356bc){const _0x5074af=_0x3356bc['note'],_0x2c32e7=_0x1f85('0x1e3');if(_0x5074af[_0x1f85('0x62')](/<JS ON ADD STATE>\s*([\s\S]*)\s*<\/JS ON ADD STATE>/i)){if(_0x1f85('0x52')!=='qkbPh'){function _0x122540(){const _0x2139f9=this['aliveMembers']();for(const _0x52ee7c of _0x2139f9){if(!_0x52ee7c[_0x1f85('0x29d')]())return![];}return!![];}}else{const _0x31fd5b=String(RegExp['$1']),_0x3bc23b=_0x2c32e7[_0x1f85('0xfd')](_0x31fd5b);VisuMZ[_0x1f85('0x9')][_0x1f85('0xcd')][_0x3356bc['id']]=new Function(_0x1f85('0x47'),_0x3bc23b);}}if(_0x5074af['match'](/<JS ON ERASE STATE>\s*([\s\S]*)\s*<\/JS ON ERASE STATE>/i)){const _0x55c12f=String(RegExp['$1']),_0xe2961=_0x2c32e7[_0x1f85('0xfd')](_0x55c12f);VisuMZ[_0x1f85('0x9')][_0x1f85('0x6b')][_0x3356bc['id']]=new Function(_0x1f85('0x47'),_0xe2961);}if(_0x5074af[_0x1f85('0x62')](/<JS ON EXPIRE STATE>\s*([\s\S]*)\s*<\/JS ON EXPIRE STATE>/i)){const _0x32f096=String(RegExp['$1']),_0x34d3b=_0x2c32e7[_0x1f85('0xfd')](_0x32f096);VisuMZ['SkillsStatesCore'][_0x1f85('0x39')][_0x3356bc['id']]=new Function(_0x1f85('0x47'),_0x34d3b);}},DataManager[_0x1f85('0xe0')]=function(_0x3b70e4){this[_0x1f85('0x2b0')]=this[_0x1f85('0x2b0')]||{};if(this[_0x1f85('0x2b0')][_0x3b70e4['id']])return this[_0x1f85('0x2b0')][_0x3b70e4['id']];this[_0x1f85('0x2b0')][_0x3b70e4['id']]=[_0x3b70e4[_0x1f85('0x1f1')]];if(_0x3b70e4['note'][_0x1f85('0x62')](/<SKILL[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5a9b10=JSON[_0x1f85('0xd2')]('['+RegExp['$1'][_0x1f85('0x62')](/\d+/g)+']');this[_0x1f85('0x2b0')][_0x3b70e4['id']]=this[_0x1f85('0x2b0')][_0x3b70e4['id']][_0x1f85('0x23c')](_0x5a9b10);}else{if(_0x3b70e4['note'][_0x1f85('0x62')](/<SKILL[ ](?:TYPE|TYPES):[ ](.*)>/i)){const _0x491d9e=RegExp['$1'][_0x1f85('0x197')](',');for(const _0x183cba of _0x491d9e){const _0x242d04=DataManager[_0x1f85('0x283')](_0x183cba);if(_0x242d04)this[_0x1f85('0x2b0')][_0x3b70e4['id']][_0x1f85('0x20')](_0x242d04);}}}return this[_0x1f85('0x2b0')][_0x3b70e4['id']];},DataManager['getStypeIdWithName']=function(_0x50bf61){_0x50bf61=_0x50bf61[_0x1f85('0xc2')]()[_0x1f85('0x1ab')](),this[_0x1f85('0x2b0')]=this['_stypeIDs']||{};if(this[_0x1f85('0x2b0')][_0x50bf61])return this['_stypeIDs'][_0x50bf61];for(let _0x432816=0x1;_0x432816<0x64;_0x432816++){if(_0x1f85('0x2a8')==='HdhrD'){function _0x1240c7(){const _0x494030=_0x5789be[_0x53684b-_0x46e092[_0x1f85('0xac')]];if(!_0x494030)return;_0x2c9b67[_0x1f85('0x23b')][_0x1f85('0x119')][_0x1f85('0xe5')](this,_0x3e36c8,_0x494030,0x0,0x0),_0x5db4d4[_0x1f85('0x23b')]['drawActorBuffRates']['call'](this,_0x2a7498,_0x494030,0x0,0x0);}}else{if(!$dataSystem[_0x1f85('0x255')][_0x432816])continue;let _0x3f9ef8=$dataSystem[_0x1f85('0x255')][_0x432816][_0x1f85('0xc2')]()['trim']();_0x3f9ef8=_0x3f9ef8[_0x1f85('0x149')](/\x1I\[(\d+)\]/gi,''),_0x3f9ef8=_0x3f9ef8[_0x1f85('0x149')](/\\I\[(\d+)\]/gi,''),this[_0x1f85('0x2b0')][_0x3f9ef8]=_0x432816;}}return this['_stypeIDs'][_0x50bf61]||0x0;},DataManager[_0x1f85('0x38')]=function(_0x333607){_0x333607=_0x333607['toUpperCase']()[_0x1f85('0x1ab')](),this[_0x1f85('0x113')]=this[_0x1f85('0x113')]||{};if(this[_0x1f85('0x113')][_0x333607])return this[_0x1f85('0x113')][_0x333607];for(const _0x4d7e1e of $dataSkills){if(_0x1f85('0x1ba')!=='qRMUX'){function _0xb77091(){return _0x1f85('0x13e')[_0x1f85('0xfd')](_0x3a4e40(_0x4f462c['$1']));}}else{if(!_0x4d7e1e)continue;this[_0x1f85('0x113')][_0x4d7e1e[_0x1f85('0x26b')]['toUpperCase']()[_0x1f85('0x1ab')]()]=_0x4d7e1e['id'];}}return this['_skillIDs'][_0x333607]||0x0;},DataManager[_0x1f85('0x2')]=function(_0x175dbe){_0x175dbe=_0x175dbe[_0x1f85('0xc2')]()[_0x1f85('0x1ab')](),this['_stateIDs']=this[_0x1f85('0x186')]||{};if(this[_0x1f85('0x186')][_0x175dbe])return this[_0x1f85('0x186')][_0x175dbe];for(const _0x192c70 of $dataStates){if(!_0x192c70)continue;this[_0x1f85('0x186')][_0x192c70[_0x1f85('0x26b')][_0x1f85('0xc2')]()[_0x1f85('0x1ab')]()]=_0x192c70['id'];}return this[_0x1f85('0x186')][_0x175dbe]||0x0;},DataManager[_0x1f85('0x204')]=function(_0x17e5c3){this['_stateMaxTurns']=this[_0x1f85('0x247')]||{};if(this[_0x1f85('0x247')][_0x17e5c3])return this[_0x1f85('0x247')][_0x17e5c3];if($dataStates[_0x17e5c3][_0x1f85('0x17c')][_0x1f85('0x62')](/<MAX TURNS:[ ](\d+)>/i)){if(_0x1f85('0x24c')!==_0x1f85('0x19e'))this[_0x1f85('0x247')][_0x17e5c3]=Number(RegExp['$1']);else{function _0x574b0d(){return _0x223be7['SkillsStatesCore'][_0x1f85('0x244')][_0x1f85('0x5d')][_0x1f85('0x19')];}}}else this[_0x1f85('0x247')][_0x17e5c3]=VisuMZ[_0x1f85('0x9')]['Settings'][_0x1f85('0x22b')][_0x1f85('0x1e4')];return this['_stateMaxTurns'][_0x17e5c3];},ColorManager[_0x1f85('0x25c')]=function(_0x460dee,_0x35967c){return _0x35967c=String(_0x35967c),this[_0x1f85('0xba')]=this['_colorCache']||{},_0x35967c['match'](/#(.*)/i)?this[_0x1f85('0xba')][_0x460dee]=_0x1f85('0x13e')[_0x1f85('0xfd')](String(RegExp['$1'])):this[_0x1f85('0xba')][_0x460dee]=this[_0x1f85('0x150')](Number(_0x35967c)),this[_0x1f85('0xba')][_0x460dee];},ColorManager[_0x1f85('0x234')]=function(_0x355a82){_0x355a82=String(_0x355a82);if(_0x355a82[_0x1f85('0x62')](/#(.*)/i))return'#%1'[_0x1f85('0xfd')](String(RegExp['$1']));else{if(_0x1f85('0x2e')==='smRaY'){function _0x59606f(){!_0x303a24[_0x1f85('0x223')](_0x28e2e9)&&this[_0x1f85('0x129')](_0x125b8e,_0x3a4dca,_0x3859cf,_0x21c635),this[_0x1f85('0x1ea')](_0x134832,_0x1d005b,_0x195f63,_0x1f476e),_0x299b2b[_0x1f85('0x20')](_0x439304);}}else return this[_0x1f85('0x150')](Number(_0x355a82));}},ColorManager[_0x1f85('0x69')]=function(_0x3fd085){if(typeof _0x3fd085===_0x1f85('0x49'))_0x3fd085=$dataStates[_0x3fd085];const _0x16725f=_0x1f85('0x53')[_0x1f85('0xfd')](_0x3fd085['id']);this[_0x1f85('0xba')]=this[_0x1f85('0xba')]||{};if(this[_0x1f85('0xba')][_0x16725f])return this[_0x1f85('0xba')][_0x16725f];const _0xe64e4e=this[_0x1f85('0xda')](_0x3fd085);return this[_0x1f85('0x25c')](_0x16725f,_0xe64e4e);},ColorManager[_0x1f85('0xda')]=function(_0x236156){const _0x570ea8=_0x236156[_0x1f85('0x17c')];if(_0x570ea8[_0x1f85('0x62')](/<TURN COLOR:[ ](.*)>/i)){if('VFjSA'==='VFjSA')return String(RegExp['$1']);else{function _0x23a4d3(){if(!_0x4d905a[_0x1f85('0x1e9')](_0x405577))return![];}}}else{if(_0x570ea8[_0x1f85('0x62')](/<POSITIVE STATE>/i)){if('yaQRa'!==_0x1f85('0x12b'))return VisuMZ['SkillsStatesCore'][_0x1f85('0x244')][_0x1f85('0x22b')][_0x1f85('0xd8')];else{function _0x43507f(){const _0x5716e5=this[_0x1f85('0x107')]();return this[_0x1f85('0x8d')](_0x5716e5);}}}else{if(_0x570ea8[_0x1f85('0x62')](/<NEGATIVE STATE>/i)){if(_0x1f85('0xa8')===_0x1f85('0x13b')){function _0x516b59(){return _0xc3cd2a-_0x3653ff;}}else return VisuMZ[_0x1f85('0x9')][_0x1f85('0x244')]['States'][_0x1f85('0xd6')];}else{if(_0x1f85('0x118')!==_0x1f85('0x118')){function _0x2a8d3f(){if(_0x472576[_0x1f85('0x1e9')](_0x2f94e))return!![];}}else return VisuMZ['SkillsStatesCore'][_0x1f85('0x244')][_0x1f85('0x22b')][_0x1f85('0x29e')];}}}},ColorManager[_0x1f85('0x198')]=function(){const _0x3e4167=_0x1f85('0x2b7');this['_colorCache']=this['_colorCache']||{};if(this[_0x1f85('0xba')][_0x3e4167])return this[_0x1f85('0xba')][_0x3e4167];const _0x52bd6c=VisuMZ[_0x1f85('0x9')][_0x1f85('0x244')][_0x1f85('0x229')][_0x1f85('0x1b')];return this[_0x1f85('0x25c')](_0x3e4167,_0x52bd6c);},ColorManager[_0x1f85('0x20e')]=function(){const _0x3476a4=_0x1f85('0x21e');this[_0x1f85('0xba')]=this[_0x1f85('0xba')]||{};if(this['_colorCache'][_0x3476a4])return this[_0x1f85('0xba')][_0x3476a4];const _0x5aca46=VisuMZ[_0x1f85('0x9')][_0x1f85('0x244')][_0x1f85('0x229')][_0x1f85('0x133')];return this[_0x1f85('0x25c')](_0x3476a4,_0x5aca46);},VisuMZ['SkillsStatesCore'][_0x1f85('0x1bd')]=Game_Action[_0x1f85('0x23b')][_0x1f85('0x2b')],Game_Action[_0x1f85('0x23b')][_0x1f85('0x2b')]=function(_0x5499f1){VisuMZ[_0x1f85('0x9')][_0x1f85('0x1bd')][_0x1f85('0xe5')](this,_0x5499f1),this[_0x1f85('0xdf')](_0x5499f1);},Game_Action['prototype'][_0x1f85('0xdf')]=function(_0x43ae4a){this[_0x1f85('0x10c')](_0x43ae4a),this['applyStateTurnManipulationEffects'](_0x43ae4a),this[_0x1f85('0x87')](_0x43ae4a),this[_0x1f85('0x126')](_0x43ae4a);},Game_Action[_0x1f85('0x23b')]['applyStateCategoryRemovalEffects']=function(_0x3559d1){if(_0x3559d1['states']()[_0x1f85('0xac')]<=0x0)return;const _0x52f14d=this[_0x1f85('0x21')]()[_0x1f85('0x17c')],_0x146b7e=_0x52f14d[_0x1f85('0x62')](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/gi);if(_0x146b7e)for(const _0x202404 of _0x146b7e){_0x202404[_0x1f85('0x62')](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0x397007=String(RegExp['$1']),_0x568ec7=Number(RegExp['$2']);_0x3559d1[_0x1f85('0x235')](_0x397007,_0x568ec7);}},Game_Action['prototype'][_0x1f85('0x1ee')]=function(_0x3a2a73){const _0x402673=this['item']()['note'],_0x48e657=_0x402673[_0x1f85('0x62')](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/gi);if(_0x48e657){if('GlMIE'!==_0x1f85('0xe4')){function _0x5e8b2f(){_0x48f659['SkillsStatesCore'][_0x1f85('0x1bd')][_0x1f85('0xe5')](this,_0x3e53e1),this[_0x1f85('0xdf')](_0x2273d1);}}else for(const _0x37523a of _0x48e657){let _0x792e18=0x0,_0x1c9452=0x0;if(_0x37523a[_0x1f85('0x62')](/<SET STATE[ ](\d+)[ ]TURNS:[ ](\d+)>/i))_0x792e18=Number(RegExp['$1']),_0x1c9452=Number(RegExp['$2']);else{if(_0x37523a[_0x1f85('0x62')](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/i)){if(_0x1f85('0x143')===_0x1f85('0x143'))_0x792e18=DataManager['getStateIdWithName'](RegExp['$1']),_0x1c9452=Number(RegExp['$2']);else{function _0x1f648e(){return _0xb64dbe[_0x1f85('0x9')][_0x1f85('0x244')][_0x1f85('0x5d')][_0x1f85('0x21b')]['call'](this,_0x5411e4);}}}}_0x3a2a73[_0x1f85('0x227')](_0x792e18,_0x1c9452),this['makeSuccess'](_0x3a2a73);}}const _0x536ef6=_0x402673[_0x1f85('0x62')](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/gi);if(_0x536ef6)for(const _0x1682b2 of _0x536ef6){if(_0x1f85('0x71')!==_0x1f85('0x6e')){let _0x56df83=0x0,_0x2b1ed9=0x0;if(_0x1682b2[_0x1f85('0x62')](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i))_0x56df83=Number(RegExp['$1']),_0x2b1ed9=Number(RegExp['$2']);else _0x1682b2['match'](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)&&(_0x56df83=DataManager[_0x1f85('0x2')](RegExp['$1']),_0x2b1ed9=Number(RegExp['$2']));_0x3a2a73[_0x1f85('0x7f')](_0x56df83,_0x2b1ed9),this[_0x1f85('0x272')](_0x3a2a73);}else{function _0x202b6f(){_0x3518fb[_0x4d539a][_0x145755]&&_0x55716b[_0xec0a7a][_0x29e4de][_0x1f85('0xe5')](this,_0x5ccd1a);}}}},Game_Action[_0x1f85('0x23b')][_0x1f85('0x87')]=function(_0x1e2d98){const _0x3edd40=[_0x1f85('0x5a'),_0x1f85('0x22c'),_0x1f85('0x1c5'),_0x1f85('0x29a'),_0x1f85('0x45'),_0x1f85('0x70'),_0x1f85('0x157'),_0x1f85('0x108')],_0x279ad1=this[_0x1f85('0x21')]()['note'],_0x16bf67=_0x279ad1[_0x1f85('0x62')](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/gi);if(_0x16bf67)for(const _0xd68dbc of _0x16bf67){_0xd68dbc[_0x1f85('0x62')](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0x349bc5=_0x3edd40[_0x1f85('0x2a2')](String(RegExp['$1'])['toUpperCase']()),_0x431aa5=Number(RegExp['$2']);_0x349bc5>=0x0&&(_0x1e2d98[_0x1f85('0x1a6')](_0x349bc5,_0x431aa5),this[_0x1f85('0x272')](_0x1e2d98));}const _0x3651ee=_0x279ad1['match'](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x3651ee)for(const _0x5df8b7 of _0x16bf67){_0x5df8b7['match'](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x12c169=_0x3edd40[_0x1f85('0x2a2')](String(RegExp['$1'])[_0x1f85('0xc2')]()),_0x177357=Number(RegExp['$2']);if(_0x12c169>=0x0){if(_0x1f85('0x20f')===_0x1f85('0x20f'))_0x1e2d98['addBuffTurns'](_0x12c169,_0x177357),this['makeSuccess'](_0x1e2d98);else{function _0x30898c(){const _0x4130ca=this['_buffs'][_0x4cc2b0];this[_0x1f85('0x253')](_0x21dd1d);if(_0x4130ca>0x0)this[_0x1f85('0x177')](_0x2975ed);if(_0x4130ca<0x0)this[_0x1f85('0x184')](_0x2aa06f);}}}}},Game_Action['prototype'][_0x1f85('0x126')]=function(_0x36d884){const _0x1ad69c=[_0x1f85('0x5a'),'MAXMP',_0x1f85('0x1c5'),_0x1f85('0x29a'),_0x1f85('0x45'),_0x1f85('0x70'),_0x1f85('0x157'),_0x1f85('0x108')],_0x5d4b51=this[_0x1f85('0x21')]()[_0x1f85('0x17c')],_0x13eebe=_0x5d4b51[_0x1f85('0x62')](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/gi);if(_0x13eebe)for(const _0x457f2c of _0x13eebe){_0x457f2c[_0x1f85('0x62')](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0x188443=_0x1ad69c[_0x1f85('0x2a2')](String(RegExp['$1'])[_0x1f85('0xc2')]()),_0x2d7c90=Number(RegExp['$2']);_0x188443>=0x0&&(_0x36d884[_0x1f85('0xf4')](_0x188443,_0x2d7c90),this[_0x1f85('0x272')](_0x36d884));}const _0x2e434b=_0x5d4b51[_0x1f85('0x62')](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x2e434b)for(const _0x4d7a16 of _0x13eebe){_0x4d7a16['match'](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x58e0af=_0x1ad69c[_0x1f85('0x2a2')](String(RegExp['$1'])[_0x1f85('0xc2')]()),_0x4c553e=Number(RegExp['$2']);if(_0x58e0af>=0x0){if('TIHca'!=='hEQVa')_0x36d884[_0x1f85('0x19c')](_0x58e0af,_0x4c553e),this[_0x1f85('0x272')](_0x36d884);else{function _0x2f8d94(){const _0x3f50b1=_0xbec606[_0x1f85('0xd2')]('['+_0x201e70['$1']['match'](/\d+/g)+']');for(const _0x437931 of _0x3f50b1){if(_0x69ad97[_0x1f85('0x1e9')](_0x437931))return!![];}return![];}}}}},VisuMZ[_0x1f85('0x9')][_0x1f85('0x1d1')]=Game_BattlerBase[_0x1f85('0x23b')][_0x1f85('0x220')],Game_BattlerBase[_0x1f85('0x23b')][_0x1f85('0x220')]=function(){this[_0x1f85('0x238')]={},this['initMembersSkillsStatesCore'](),VisuMZ[_0x1f85('0x9')][_0x1f85('0x1d1')][_0x1f85('0xe5')](this);},Game_BattlerBase['prototype']['initMembersSkillsStatesCore']=function(){this[_0x1f85('0xab')]='',this[_0x1f85('0x145')]={},this['_stateDisplay']={},this[_0x1f85('0x131')]={};},Game_BattlerBase[_0x1f85('0x23b')][_0x1f85('0x115')]=function(_0x258124){return this[_0x1f85('0x238')]=this[_0x1f85('0x238')]||{},this[_0x1f85('0x238')][_0x258124]!==undefined;},VisuMZ[_0x1f85('0x9')][_0x1f85('0x1b1')]=Game_BattlerBase[_0x1f85('0x23b')][_0x1f85('0x4')],Game_BattlerBase[_0x1f85('0x23b')][_0x1f85('0x4')]=function(){this['_cache']={},VisuMZ[_0x1f85('0x9')][_0x1f85('0x1b1')][_0x1f85('0xe5')](this);},VisuMZ[_0x1f85('0x9')][_0x1f85('0x284')]=Game_BattlerBase[_0x1f85('0x23b')]['eraseState'],Game_BattlerBase['prototype'][_0x1f85('0xc9')]=function(_0x607c23){let _0x408519=this[_0x1f85('0x17b')](_0x607c23);VisuMZ[_0x1f85('0x9')][_0x1f85('0x284')][_0x1f85('0xe5')](this,_0x607c23);if(_0x408519&&!this[_0x1f85('0x17b')](_0x607c23))this[_0x1f85('0xf1')](_0x607c23);},Game_BattlerBase[_0x1f85('0x23b')][_0x1f85('0xf1')]=function(_0x587b53){this['clearStateData'](_0x587b53),this[_0x1f85('0x10')](_0x587b53),this[_0x1f85('0x1eb')](_0x587b53);},VisuMZ['SkillsStatesCore'][_0x1f85('0x23e')]=Game_BattlerBase[_0x1f85('0x23b')][_0x1f85('0xd4')],Game_BattlerBase[_0x1f85('0x23b')]['resetStateCounts']=function(_0x182b5b){const _0x33220c=$dataStates[_0x182b5b],_0x501d45=this[_0x1f85('0x155')](_0x182b5b),_0x302c52=this[_0x1f85('0x130')](_0x33220c)[_0x1f85('0xfa')]()[_0x1f85('0x1ab')]();switch(_0x302c52){case'ignore':if(_0x501d45<=0x0)VisuMZ[_0x1f85('0x9')][_0x1f85('0x23e')]['call'](this,_0x182b5b);break;case _0x1f85('0x19b'):VisuMZ[_0x1f85('0x9')]['Game_BattlerBase_resetStateCounts']['call'](this,_0x182b5b);break;case _0x1f85('0x7'):VisuMZ[_0x1f85('0x9')]['Game_BattlerBase_resetStateCounts'][_0x1f85('0xe5')](this,_0x182b5b),this[_0x1f85('0x23f')][_0x182b5b]=Math['max'](this[_0x1f85('0x23f')][_0x182b5b],_0x501d45);break;case _0x1f85('0x83'):VisuMZ[_0x1f85('0x9')][_0x1f85('0x23e')][_0x1f85('0xe5')](this,_0x182b5b),this['_stateTurns'][_0x182b5b]+=_0x501d45;break;default:VisuMZ[_0x1f85('0x9')][_0x1f85('0x23e')][_0x1f85('0xe5')](this,_0x182b5b);break;}},Game_BattlerBase['prototype']['getStateReapplyRulings']=function(_0x3cbfb4){const _0x4331fe=_0x3cbfb4[_0x1f85('0x17c')];if(_0x4331fe[_0x1f85('0x62')](/<REAPPLY RULES:[ ](.*)>/i))return String(RegExp['$1']);else{if('zCjqm'===_0x1f85('0x185')){function _0x3a1883(){this[_0x1f85('0x10a')](_0x217737,_0x2dace4);}}else return VisuMZ[_0x1f85('0x9')][_0x1f85('0x244')][_0x1f85('0x22b')][_0x1f85('0x50')];}},VisuMZ[_0x1f85('0x9')][_0x1f85('0x236')]=Game_BattlerBase[_0x1f85('0x23b')]['overwriteBuffTurns'],Game_BattlerBase[_0x1f85('0x23b')][_0x1f85('0x26f')]=function(_0x4a7ac9,_0x5511e7){const _0x3990f3=VisuMZ[_0x1f85('0x9')][_0x1f85('0x244')]['Buffs'][_0x1f85('0x50')],_0x28c9ee=this['buffTurns'](_0x4a7ac9);switch(_0x3990f3){case _0x1f85('0x26a'):if(_0x28c9ee<=0x0)this[_0x1f85('0x245')][_0x4a7ac9]=_0x5511e7;break;case _0x1f85('0x19b'):this[_0x1f85('0x245')][_0x4a7ac9]=_0x5511e7;break;case'greater':this['_buffTurns'][_0x4a7ac9]=Math[_0x1f85('0xb4')](_0x28c9ee,_0x5511e7);break;case _0x1f85('0x83'):this[_0x1f85('0x245')][_0x4a7ac9]+=_0x5511e7;break;default:VisuMZ['SkillsStatesCore'][_0x1f85('0x236')][_0x1f85('0xe5')](this,_0x4a7ac9,_0x5511e7);break;}const _0x4727e0=VisuMZ['SkillsStatesCore']['Settings']['Buffs'][_0x1f85('0x1e4')];this[_0x1f85('0x245')][_0x4a7ac9]=this['_buffTurns'][_0x4a7ac9][_0x1f85('0x1be')](0x0,_0x4727e0);},Game_BattlerBase[_0x1f85('0x23b')][_0x1f85('0x29d')]=function(){if(this[_0x1f85('0x238')][_0x1f85('0x2b5')]!==undefined)return this[_0x1f85('0x238')][_0x1f85('0x2b5')];this[_0x1f85('0x238')][_0x1f85('0x2b5')]=![];const _0x9ca85c=this[_0x1f85('0x252')]();for(const _0x473d58 of _0x9ca85c){if(!_0x473d58)continue;if(_0x473d58[_0x1f85('0x17c')][_0x1f85('0x62')](/<GROUP DEFEAT>/i)){this[_0x1f85('0x238')][_0x1f85('0x2b5')]=!![];break;}}return this['_cache'][_0x1f85('0x2b5')];},VisuMZ[_0x1f85('0x9')]['Game_BattlerBase_clearStates']=Game_BattlerBase[_0x1f85('0x23b')][_0x1f85('0x233')],Game_BattlerBase[_0x1f85('0x23b')][_0x1f85('0x233')]=function(){if(this[_0x1f85('0x60')]()!=='')this['clearStatesWithStateRetain']();else{if(_0x1f85('0x134')==='RSSUC')VisuMZ[_0x1f85('0x9')][_0x1f85('0x9e')][_0x1f85('0xe5')](this),this['initMembersSkillsStatesCore']();else{function _0x22ceb0(){return this[_0x1f85('0x1c4')]();}}}},Game_BattlerBase[_0x1f85('0x23b')][_0x1f85('0x176')]=function(){const _0x167285=this['states']();for(const _0x6055ae of _0x167285){if(_0x6055ae&&this[_0x1f85('0x2af')](_0x6055ae))this[_0x1f85('0xc9')](_0x6055ae['id']);}this[_0x1f85('0x238')]={};},Game_BattlerBase[_0x1f85('0x23b')][_0x1f85('0x2af')]=function(_0x5108d5){const _0x1c3604=this['getStateRetainType']();if(_0x1c3604!==''){const _0x24d8cb=_0x5108d5[_0x1f85('0x17c')];if(_0x1c3604===_0x1f85('0x1e6')&&_0x24d8cb[_0x1f85('0x62')](/<NO DEATH CLEAR>/i))return![];if(_0x1c3604===_0x1f85('0xeb')&&_0x24d8cb[_0x1f85('0x62')](/<NO RECOVER ALL CLEAR>/i))return![];}return this[_0x1f85('0x17b')](_0x5108d5['id']);},Game_BattlerBase[_0x1f85('0x23b')]['getStateRetainType']=function(){return this[_0x1f85('0xab')];},Game_BattlerBase[_0x1f85('0x23b')][_0x1f85('0x1')]=function(_0x338a8a){this[_0x1f85('0xab')]=_0x338a8a;},Game_BattlerBase[_0x1f85('0x23b')][_0x1f85('0x1e2')]=function(){this[_0x1f85('0xab')]='';},VisuMZ['SkillsStatesCore']['Game_BattlerBase_die']=Game_BattlerBase['prototype'][_0x1f85('0xde')],Game_BattlerBase[_0x1f85('0x23b')][_0x1f85('0xde')]=function(){this[_0x1f85('0x1')](_0x1f85('0x1e6')),VisuMZ[_0x1f85('0x9')][_0x1f85('0x15c')][_0x1f85('0xe5')](this),this['clearStateRetainType']();},VisuMZ[_0x1f85('0x9')][_0x1f85('0x10e')]=Game_BattlerBase[_0x1f85('0x23b')][_0x1f85('0x13a')],Game_BattlerBase[_0x1f85('0x23b')][_0x1f85('0x13a')]=function(){this['setStateRetainType'](_0x1f85('0xeb')),VisuMZ[_0x1f85('0x9')]['Game_BattlerBase_recoverAll'][_0x1f85('0xe5')](this),this[_0x1f85('0x1e2')]();},Game_BattlerBase[_0x1f85('0x23b')]['canPaySkillCost']=function(_0x2742de){for(settings of VisuMZ[_0x1f85('0x9')][_0x1f85('0x244')][_0x1f85('0x42')]){const _0x2a8fc6=settings[_0x1f85('0x1f5')][_0x1f85('0xe5')](this,_0x2742de);if(!settings[_0x1f85('0x6')]['call'](this,_0x2742de,_0x2a8fc6))return![];}return!![];},Game_BattlerBase[_0x1f85('0x23b')][_0x1f85('0xd')]=function(_0x77a10e){for(settings of VisuMZ['SkillsStatesCore'][_0x1f85('0x244')][_0x1f85('0x42')]){if(_0x1f85('0x257')!==_0x1f85('0x257')){function _0x313c7e(){_0x57f08c[_0x1f85('0x9')][_0x1f85('0x244')]['Buffs']['onExpireBuffJS']['call'](this,_0x1986fa);}}else{const _0x40f92e=settings[_0x1f85('0x1f5')][_0x1f85('0xe5')](this,_0x77a10e);settings[_0x1f85('0x5e')][_0x1f85('0xe5')](this,_0x77a10e,_0x40f92e);}}},VisuMZ[_0x1f85('0x9')][_0x1f85('0x2ab')]=Game_BattlerBase[_0x1f85('0x23b')][_0x1f85('0xd5')],Game_BattlerBase[_0x1f85('0x23b')]['meetsSkillConditions']=function(_0x2534d3){if(!_0x2534d3)return![];if(!VisuMZ[_0x1f85('0x9')][_0x1f85('0x2ab')]['call'](this,_0x2534d3))return![];if(!this[_0x1f85('0x2ae')](_0x2534d3))return![];if(!this[_0x1f85('0x210')](_0x2534d3))return![];if(!this['meetsSkillConditionsGlobalJS'](_0x2534d3))return![];return!![];},Game_BattlerBase[_0x1f85('0x23b')][_0x1f85('0x2ae')]=function(_0x113569){if(!this[_0x1f85('0xbc')](_0x113569))return![];return!![];},Game_BattlerBase['prototype'][_0x1f85('0xbc')]=function(_0x359868){const _0xe73e3b=_0x359868[_0x1f85('0x17c')];if(_0xe73e3b[_0x1f85('0x62')](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x29319d=JSON[_0x1f85('0xd2')]('['+RegExp['$1'][_0x1f85('0x62')](/\d+/g)+']');for(const _0x26b925 of _0x29319d){if(_0x1f85('0x17e')!==_0x1f85('0x17e')){function _0x12d78f(){return this[_0x1f85('0x170')]();}}else{if(!$gameSwitches['value'](_0x26b925))return![];}}return!![];}if(_0xe73e3b[_0x1f85('0x62')](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1f85('0xfe')!==_0x1f85('0xfe')){function _0x347054(){return!![];}}else{const _0x14c429=JSON[_0x1f85('0xd2')]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x16c307 of _0x14c429){if(!$gameSwitches[_0x1f85('0x1e9')](_0x16c307))return![];}return!![];}}if(_0xe73e3b[_0x1f85('0x62')](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x775669=JSON['parse']('['+RegExp['$1'][_0x1f85('0x62')](/\d+/g)+']');for(const _0x6bdd95 of _0x775669){if($gameSwitches[_0x1f85('0x1e9')](_0x6bdd95))return!![];}return![];}if(_0xe73e3b[_0x1f85('0x62')](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1f85('0x1e8')!==_0x1f85('0x1e8')){function _0x9d675e(){_0x3fce6e[_0x1f85('0x9')][_0x1f85('0x244')]['Buffs'][_0x1f85('0x1d')]['call'](this,_0x58ab89,_0x51913c);}}else{const _0x4a6882=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x3f26e5 of _0x4a6882){if(!$gameSwitches['value'](_0x3f26e5))return!![];}return![];}}if(_0xe73e3b[_0x1f85('0x62')](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1f85('0xee')!==_0x1f85('0xee')){function _0x397d47(){return _0x47e1aa(_0xe765f4['$1']);}}else{const _0x180c1c=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x3d151d of _0x180c1c){if(!$gameSwitches['value'](_0x3d151d))return!![];}return![];}}if(_0xe73e3b[_0x1f85('0x62')](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('jZaGT'!==_0x1f85('0x16a')){function _0x231013(){return this[_0x1f85('0xff')]()[_0x1f85('0xae')](_0x3abf9b=>this[_0x1f85('0x250')](_0x3abf9b));}}else{const _0x29ee04=JSON[_0x1f85('0xd2')]('['+RegExp['$1'][_0x1f85('0x62')](/\d+/g)+']');for(const _0x724ec6 of _0x29ee04){if(_0x1f85('0x225')!==_0x1f85('0x18c')){if($gameSwitches[_0x1f85('0x1e9')](_0x724ec6))return![];}else{function _0xe0c45d(){_0x10bb73(_0x1f85('0x291')['format'](_0x5cc72f,_0x343a02)),_0x843fc8[_0x1f85('0x1a3')]();}}}return!![];}}return!![];},Game_BattlerBase['prototype'][_0x1f85('0x210')]=function(_0x56249a){const _0x7faaf2=_0x56249a[_0x1f85('0x17c')],_0x5340b2=VisuMZ[_0x1f85('0x9')][_0x1f85('0x16e')];return _0x5340b2[_0x56249a['id']]?_0x5340b2[_0x56249a['id']][_0x1f85('0xe5')](this,_0x56249a):!![];},Game_BattlerBase[_0x1f85('0x23b')][_0x1f85('0x15a')]=function(_0x5bc536){return VisuMZ['SkillsStatesCore'][_0x1f85('0x244')][_0x1f85('0x5d')][_0x1f85('0x21b')]['call'](this,_0x5bc536);},VisuMZ[_0x1f85('0x9')][_0x1f85('0x24d')]=Game_BattlerBase[_0x1f85('0x23b')][_0x1f85('0x18')],Game_BattlerBase[_0x1f85('0x23b')]['skillMpCost']=function(_0x24a553){for(settings of VisuMZ['SkillsStatesCore']['Settings'][_0x1f85('0x42')]){if('oMLFl'!==_0x1f85('0x151')){if(settings[_0x1f85('0x110')][_0x1f85('0xc2')]()==='MP')return settings['CalcJS'][_0x1f85('0xe5')](this,_0x24a553);}else{function _0x3d9c7d(){_0x35e1d1['SkillsStatesCore'][_0x1f85('0xb7')][_0x1f85('0xe5')](this),this[_0x1f85('0xca')]();}}}return VisuMZ[_0x1f85('0x9')][_0x1f85('0x24d')][_0x1f85('0xe5')](this,_0x24a553);},VisuMZ[_0x1f85('0x9')][_0x1f85('0x22a')]=Game_BattlerBase[_0x1f85('0x23b')][_0x1f85('0x1f2')],Game_BattlerBase[_0x1f85('0x23b')]['skillTpCost']=function(_0x2e8e53){for(settings of VisuMZ[_0x1f85('0x9')][_0x1f85('0x244')]['Costs']){if(settings[_0x1f85('0x110')][_0x1f85('0xc2')]()==='TP')return settings[_0x1f85('0x1f5')]['call'](this,_0x2e8e53);}return VisuMZ[_0x1f85('0x9')]['Game_BattlerBase_skillTpCost'][_0x1f85('0xe5')](this,_0x2e8e53);},Game_BattlerBase[_0x1f85('0x23b')][_0x1f85('0x1c1')]=function(_0x4f1161){if(typeof _0x4f1161===_0x1f85('0x49'))_0x4f1161=$dataStates[_0x4f1161];return this[_0x1f85('0x252')]()['includes'](_0x4f1161);},VisuMZ[_0x1f85('0x9')][_0x1f85('0x34')]=Game_BattlerBase[_0x1f85('0x23b')][_0x1f85('0x252')],Game_BattlerBase[_0x1f85('0x23b')][_0x1f85('0x252')]=function(){let _0x3476e9=VisuMZ['SkillsStatesCore'][_0x1f85('0x34')]['call'](this);return this[_0x1f85('0xb8')](_0x3476e9),_0x3476e9;},Game_BattlerBase[_0x1f85('0x23b')][_0x1f85('0xb8')]=function(_0x2bd516){const _0x5da9f5=this[_0x1f85('0x22d')]();for(state of _0x5da9f5){if(!state)continue;if(!this['isPassiveStateStackable'](state)&&_0x2bd516[_0x1f85('0x223')](state))continue;_0x2bd516['push'](state);}if(_0x5da9f5[_0x1f85('0xac')]>0x0){if(_0x1f85('0x19d')===_0x1f85('0xcb')){function _0x3a9be6(){return this[_0x1f85('0x26')]()?this[_0x1f85('0x93')]():_0x234fcb[_0x1f85('0x9')][_0x1f85('0x214')][_0x1f85('0xe5')](this);}}else _0x2bd516[_0x1f85('0x21f')]((_0x17ad83,_0x2eed89)=>{const _0x3bee11=_0x17ad83[_0x1f85('0x297')],_0x17a09a=_0x2eed89[_0x1f85('0x297')];if(_0x3bee11!==_0x17a09a)return _0x17a09a-_0x3bee11;return _0x17ad83-_0x2eed89;});}},Game_BattlerBase[_0x1f85('0x23b')][_0x1f85('0x9d')]=function(_0x3c718b){return _0x3c718b[_0x1f85('0x17c')][_0x1f85('0x62')](/<PASSIVE STACKABLE>/i);},Game_BattlerBase['prototype'][_0x1f85('0x267')]=function(){const _0x117fcf=[];for(const _0x517052 of this[_0x1f85('0x238')][_0x1f85('0x22d')]){const _0x8f41c3=$dataStates[_0x517052];if(!_0x8f41c3)continue;if(!this[_0x1f85('0x57')](_0x8f41c3))continue;_0x117fcf[_0x1f85('0x20')](_0x8f41c3);}return _0x117fcf;},Game_BattlerBase[_0x1f85('0x23b')][_0x1f85('0x57')]=function(_0x129f61){if(!this['meetsPassiveStateConditionSwitches'](_0x129f61))return![];if(!this[_0x1f85('0xbf')](_0x129f61))return![];if(!this[_0x1f85('0x207')](_0x129f61))return![];return!![];},Game_BattlerBase[_0x1f85('0x23b')][_0x1f85('0x1de')]=function(_0x4b33e5){const _0x14d5c8=_0x4b33e5[_0x1f85('0x17c')];if(_0x14d5c8['match'](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1f85('0x24e')!==_0x1f85('0x24e')){function _0x10ba5e(){const _0x3ff15c=_0x340e88[_0x1f85('0xd2')]('['+_0x526b5e['$1']['match'](/\d+/g)+']');for(const _0x339d5c of _0x3ff15c){if(!_0x1d3e68[_0x1f85('0x1e9')](_0x339d5c))return![];}return!![];}}else{const _0x55974e=JSON[_0x1f85('0xd2')]('['+RegExp['$1'][_0x1f85('0x62')](/\d+/g)+']');for(const _0x5afb14 of _0x55974e){if(_0x1f85('0x12')!==_0x1f85('0x1a5')){if(!$gameSwitches[_0x1f85('0x1e9')](_0x5afb14))return![];}else{function _0x4d9418(){_0x333dde[_0x1f85('0x9')][_0x1f85('0x183')][_0x1f85('0xe5')](this,_0x59c711);if(!this[_0x1f85('0x219')](_0xdaadfa))this[_0x1f85('0x27a')](_0xeaaa85);}}}return!![];}}if(_0x14d5c8['match'](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x960a6d=JSON['parse']('['+RegExp['$1'][_0x1f85('0x62')](/\d+/g)+']');for(const _0x2ccefa of _0x960a6d){if(!$gameSwitches['value'](_0x2ccefa))return![];}return!![];}if(_0x14d5c8[_0x1f85('0x62')](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('xhREF'!=='KHzxC'){const _0x291c61=JSON[_0x1f85('0xd2')]('['+RegExp['$1'][_0x1f85('0x62')](/\d+/g)+']');for(const _0x524576 of _0x291c61){if($gameSwitches[_0x1f85('0x1e9')](_0x524576))return!![];}return![];}else{function _0x46eedf(){this[_0x1f85('0xce')][_0x1f85('0x215')](this[_0x1f85('0x195')](0x0));}}}if(_0x14d5c8[_0x1f85('0x62')](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x354783=JSON[_0x1f85('0xd2')]('['+RegExp['$1'][_0x1f85('0x62')](/\d+/g)+']');for(const _0x104298 of _0x354783){if('ulmsh'!==_0x1f85('0x14f')){if(!$gameSwitches[_0x1f85('0x1e9')](_0x104298))return!![];}else{function _0x4464d1(){if(!this[_0x1f85('0xbc')](_0x36a780))return![];return!![];}}}return![];}if(_0x14d5c8[_0x1f85('0x62')](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('egYao'===_0x1f85('0x1c9')){const _0x472c25=JSON[_0x1f85('0xd2')]('['+RegExp['$1'][_0x1f85('0x62')](/\d+/g)+']');for(const _0x48e51c of _0x472c25){if(!$gameSwitches[_0x1f85('0x1e9')](_0x48e51c))return!![];}return![];}else{function _0x49ddd8(){this[_0x1f85('0x98')](_0x379308,_0x13fd33);}}}if(_0x14d5c8[_0x1f85('0x62')](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('sDyfS'===_0x1f85('0x181')){function _0x558eca(){const _0x5d4f03=_0x4497bb[_0x5a5800-_0xcc2d1e[_0x1f85('0xac')]];this[_0x1f85('0x119')](_0x44ef3d,_0x5d4f03,_0x4c9384,_0x338ae8),this[_0x1f85('0x1c8')](_0x3ec259,_0x5d4f03,_0x4cfeb9,_0x50ab74);}}else{const _0x2d320b=JSON[_0x1f85('0xd2')]('['+RegExp['$1'][_0x1f85('0x62')](/\d+/g)+']');for(const _0x4f0064 of _0x2d320b){if($gameSwitches[_0x1f85('0x1e9')](_0x4f0064))return![];}return!![];}}return!![];},Game_BattlerBase[_0x1f85('0x23b')][_0x1f85('0xbf')]=function(_0xd5a9e7){const _0xb131ea=VisuMZ[_0x1f85('0x9')][_0x1f85('0x259')];if(_0xb131ea[_0xd5a9e7['id']]&&!_0xb131ea[_0xd5a9e7['id']][_0x1f85('0xe5')](this,_0xd5a9e7))return![];return!![];},Game_BattlerBase[_0x1f85('0x23b')]['meetsPassiveStateGlobalConditionJS']=function(_0x3ee61){return VisuMZ[_0x1f85('0x9')]['Settings'][_0x1f85('0x86')][_0x1f85('0x298')]['call'](this,_0x3ee61);},Game_BattlerBase[_0x1f85('0x23b')]['passiveStates']=function(){if(this[_0x1f85('0x115')](_0x1f85('0x22d')))return this[_0x1f85('0x267')]();return this[_0x1f85('0x238')][_0x1f85('0x22d')]=[],this[_0x1f85('0x11')](),this[_0x1f85('0x1c3')](),this[_0x1f85('0xcc')](),this[_0x1f85('0x267')]();},Game_BattlerBase[_0x1f85('0x23b')]['addPassiveStatesFromOtherPlugins']=function(){if(Imported[_0x1f85('0x2a1')])this['addPassiveStatesTraitSets']();},Game_BattlerBase[_0x1f85('0x23b')]['passiveStateObjects']=function(){return[];},Game_BattlerBase[_0x1f85('0x23b')][_0x1f85('0x1c3')]=function(){const _0xcfff07=this[_0x1f85('0xec')]();for(const _0xa2935a of _0xcfff07){if(!_0xa2935a)continue;const _0x1e0b23=_0xa2935a['note'][_0x1f85('0x62')](/<PASSIVE (?:STATE|STATES):[ ](.*)>/gi);if(_0x1e0b23)for(const _0x5bafe6 of _0x1e0b23){_0x5bafe6[_0x1f85('0x62')](/<PASSIVE (?:STATE|STATES):[ ](.*)>/i);const _0x43d74d=RegExp['$1'];if(_0x43d74d[_0x1f85('0x62')](/(\d+(?:\s*,\s*\d+)*)/i)){const _0x4fe738=JSON[_0x1f85('0xd2')]('['+RegExp['$1'][_0x1f85('0x62')](/\d+/g)+']');this[_0x1f85('0x238')][_0x1f85('0x22d')]=this[_0x1f85('0x238')][_0x1f85('0x22d')][_0x1f85('0x23c')](_0x4fe738);}else{const _0x421cf5=_0x43d74d[_0x1f85('0x197')](',');for(const _0x33594d of _0x421cf5){if('JcBVT'===_0x1f85('0x1f9')){function _0x144f2d(){const _0x25cc96=this[_0x1f85('0x95')](_0x1b1a2e);this[_0x1f85('0x1b5')](_0x25cc96,_0x1f85('0x123'),!![],_0x4c1eb7);}}else{const _0x557eb6=DataManager[_0x1f85('0x2')](_0x33594d);if(_0x557eb6)this[_0x1f85('0x238')][_0x1f85('0x22d')][_0x1f85('0x20')](_0x557eb6);}}}}}},Game_BattlerBase['prototype']['addPassiveStatesByPluginParameters']=function(){const _0x17b76d=VisuMZ[_0x1f85('0x9')][_0x1f85('0x244')][_0x1f85('0x86')][_0x1f85('0x180')];this['_cache'][_0x1f85('0x22d')]=this[_0x1f85('0x238')][_0x1f85('0x22d')][_0x1f85('0x23c')](_0x17b76d);},Game_BattlerBase[_0x1f85('0x23b')]['stateTurns']=function(_0x3534f1){if(typeof _0x3534f1!==_0x1f85('0x49'))_0x3534f1=_0x3534f1['id'];return this[_0x1f85('0x23f')][_0x3534f1]||0x0;},Game_BattlerBase[_0x1f85('0x23b')][_0x1f85('0x227')]=function(_0x1ecc20,_0x586bd5){if(typeof _0x1ecc20!==_0x1f85('0x49'))_0x1ecc20=_0x1ecc20['id'];if(this[_0x1f85('0x17b')](_0x1ecc20)){const _0x323fa1=DataManager[_0x1f85('0x204')](_0x1ecc20);this[_0x1f85('0x23f')][_0x1ecc20]=_0x586bd5[_0x1f85('0x1be')](0x0,_0x323fa1);if(this[_0x1f85('0x23f')][_0x1ecc20]<=0x0)this['removeState'](_0x1ecc20);}},Game_BattlerBase['prototype'][_0x1f85('0x7f')]=function(_0x238550,_0x4fa79f){if(typeof _0x238550!==_0x1f85('0x49'))_0x238550=_0x238550['id'];this[_0x1f85('0x17b')](_0x238550)&&(_0x4fa79f+=this[_0x1f85('0x155')](_0x238550),this[_0x1f85('0x227')](_0x238550,_0x4fa79f));},VisuMZ[_0x1f85('0x9')][_0x1f85('0x203')]=Game_BattlerBase['prototype'][_0x1f85('0x27a')],Game_BattlerBase['prototype'][_0x1f85('0x27a')]=function(_0x58badd){const _0x12ed5b=this['_buffs'][_0x58badd];VisuMZ[_0x1f85('0x9')][_0x1f85('0x203')][_0x1f85('0xe5')](this,_0x58badd);if(_0x12ed5b>0x0)this['onEraseBuff'](_0x58badd);if(_0x12ed5b<0x0)this[_0x1f85('0xaa')](_0x58badd);},VisuMZ[_0x1f85('0x9')][_0x1f85('0x299')]=Game_BattlerBase[_0x1f85('0x23b')]['increaseBuff'],Game_BattlerBase[_0x1f85('0x23b')]['increaseBuff']=function(_0xb1e144){VisuMZ[_0x1f85('0x9')][_0x1f85('0x299')][_0x1f85('0xe5')](this,_0xb1e144);if(!this[_0x1f85('0x219')](_0xb1e144))this[_0x1f85('0x27a')](_0xb1e144);},VisuMZ['SkillsStatesCore'][_0x1f85('0x183')]=Game_BattlerBase[_0x1f85('0x23b')]['decreaseBuff'],Game_BattlerBase[_0x1f85('0x23b')][_0x1f85('0x187')]=function(_0x573e3e){VisuMZ[_0x1f85('0x9')]['Game_BattlerBase_decreaseBuff'][_0x1f85('0xe5')](this,_0x573e3e);if(!this[_0x1f85('0x219')](_0x573e3e))this[_0x1f85('0x27a')](_0x573e3e);},Game_BattlerBase[_0x1f85('0x23b')][_0x1f85('0x14a')]=function(_0x157119){},Game_BattlerBase['prototype'][_0x1f85('0xaa')]=function(_0x701046){},Game_BattlerBase[_0x1f85('0x23b')][_0x1f85('0x25e')]=function(_0x238acd){return this[_0x1f85('0x295')][_0x238acd]===VisuMZ[_0x1f85('0x9')][_0x1f85('0x244')][_0x1f85('0x229')][_0x1f85('0x163')];},Game_BattlerBase[_0x1f85('0x23b')][_0x1f85('0x1d0')]=function(_0x3e6b1c){return this[_0x1f85('0x295')][_0x3e6b1c]===-VisuMZ[_0x1f85('0x9')]['Settings']['Buffs'][_0x1f85('0xe2')];},VisuMZ[_0x1f85('0x9')][_0x1f85('0xe6')]=Game_BattlerBase[_0x1f85('0x23b')][_0x1f85('0x3a')],Game_BattlerBase[_0x1f85('0x23b')][_0x1f85('0x3a')]=function(_0x5960b4,_0x352cc2){return _0x5960b4=_0x5960b4[_0x1f85('0x1be')](-0x2,0x2),VisuMZ[_0x1f85('0x9')][_0x1f85('0xe6')][_0x1f85('0xe5')](this,_0x5960b4,_0x352cc2);},Game_BattlerBase[_0x1f85('0x23b')][_0x1f85('0x81')]=function(_0xae691d){const _0x4c32d2=this['_buffs'][_0xae691d];return VisuMZ[_0x1f85('0x9')]['Settings'][_0x1f85('0x229')][_0x1f85('0x15e')][_0x1f85('0xe5')](this,_0xae691d,_0x4c32d2);},Game_BattlerBase['prototype'][_0x1f85('0x256')]=function(_0x40dd0d){return this[_0x1f85('0x245')][_0x40dd0d]||0x0;},Game_BattlerBase[_0x1f85('0x23b')][_0x1f85('0x1aa')]=function(_0x193099){return this[_0x1f85('0x256')](_0x193099);},Game_BattlerBase[_0x1f85('0x23b')][_0x1f85('0x1a6')]=function(_0x55701e,_0x449419){if(this[_0x1f85('0xc6')](_0x55701e)){if(_0x1f85('0x132')!==_0x1f85('0x1fe')){const _0x4ef116=VisuMZ[_0x1f85('0x9')][_0x1f85('0x244')][_0x1f85('0x229')][_0x1f85('0x1e4')];this[_0x1f85('0x245')][_0x55701e]=_0x449419[_0x1f85('0x1be')](0x0,_0x4ef116);}else{function _0x2ad27d(){this[_0x1f85('0x1bc')](_0x3144d3['id'])&&_0xda87ae[_0x1f85('0x26c')]===_0x30c080&&(this[_0x1f85('0xb3')](_0xeb1438['id']),this[_0x1f85('0x2a5')](_0x3704ab['id']),this[_0x1f85('0x3c')](_0x208726['id']));}}}},Game_BattlerBase[_0x1f85('0x23b')][_0x1f85('0x1b3')]=function(_0x4f67e4,_0x17a95a){this[_0x1f85('0xc6')](_0x4f67e4)&&(_0x17a95a+=this[_0x1f85('0x256')](stateId),this[_0x1f85('0x227')](_0x4f67e4,_0x17a95a));},Game_BattlerBase['prototype'][_0x1f85('0xf4')]=function(_0xa7bf49,_0x1903a4){if(this[_0x1f85('0x4e')](_0xa7bf49)){const _0x3663d1=VisuMZ[_0x1f85('0x9')][_0x1f85('0x244')][_0x1f85('0x229')][_0x1f85('0x1e4')];this[_0x1f85('0x245')][_0xa7bf49]=_0x1903a4['clamp'](0x0,_0x3663d1);}},Game_BattlerBase[_0x1f85('0x23b')][_0x1f85('0x19c')]=function(_0x21060d,_0x2632b8){if(this['isDebuffAffected'](_0x21060d)){if(_0x1f85('0x5')===_0x1f85('0x173')){function _0x45eab6(){_0x492b61[_0x1f85('0x9')][_0x1f85('0x2b6')][_0x1f85('0xe5')](this,_0x1b525c),this[_0x1f85('0x238')]={};}}else _0x2632b8+=this[_0x1f85('0x256')](stateId),this[_0x1f85('0x227')](_0x21060d,_0x2632b8);}},Game_BattlerBase[_0x1f85('0x23b')][_0x1f85('0x1da')]=function(_0x55182e){if(typeof _0x55182e!==_0x1f85('0x49'))_0x55182e=_0x55182e['id'];return this[_0x1f85('0x145')]=this[_0x1f85('0x145')]||{},this[_0x1f85('0x145')][_0x55182e]=this['_stateData'][_0x55182e]||{},this[_0x1f85('0x145')][_0x55182e];},Game_BattlerBase[_0x1f85('0x23b')][_0x1f85('0x20b')]=function(_0x23f484,_0x12efa6){if(typeof _0x23f484!=='number')_0x23f484=_0x23f484['id'];const _0x5414e9=this[_0x1f85('0x1da')](_0x23f484);return _0x5414e9[_0x12efa6];},Game_BattlerBase[_0x1f85('0x23b')][_0x1f85('0x3d')]=function(_0x224d3b,_0xc33d71,_0x50fd39){if(typeof _0x224d3b!==_0x1f85('0x49'))_0x224d3b=_0x224d3b['id'];const _0x347154=this['stateData'](_0x224d3b);_0x347154[_0xc33d71]=_0x50fd39;},Game_BattlerBase[_0x1f85('0x23b')][_0x1f85('0x2b2')]=function(_0x2661f4){if(typeof _0x2661f4!==_0x1f85('0x49'))_0x2661f4=_0x2661f4['id'];this[_0x1f85('0x145')]=this[_0x1f85('0x145')]||{},this[_0x1f85('0x145')][_0x2661f4]={};},Game_BattlerBase[_0x1f85('0x23b')][_0x1f85('0x14e')]=function(_0x4a7454){if(typeof _0x4a7454!==_0x1f85('0x49'))_0x4a7454=_0x4a7454['id'];this['_stateDisplay']=this[_0x1f85('0x264')]||{};if(this[_0x1f85('0x264')][_0x4a7454]===undefined){if('enApr'!==_0x1f85('0x1c2'))this[_0x1f85('0x264')][_0x4a7454]='';else{function _0x40bf6e(){const _0x119704=_0x4e01f0[_0x1f85('0xd2')]('['+_0x564ea7['$1']['match'](/\d+/g)+']');for(const _0x3b99ab of _0x119704){if(!this[_0x1f85('0x17d')][_0x1f85('0xa9')](_0x3b99ab))return![];}return!![];}}}return this[_0x1f85('0x264')][_0x4a7454];},Game_BattlerBase[_0x1f85('0x23b')][_0x1f85('0x9c')]=function(_0x5b92b8,_0x39aa1a){if(typeof _0x5b92b8!==_0x1f85('0x49'))_0x5b92b8=_0x5b92b8['id'];this[_0x1f85('0x264')]=this[_0x1f85('0x264')]||{},this[_0x1f85('0x264')][_0x5b92b8]=_0x39aa1a;},Game_BattlerBase['prototype'][_0x1f85('0x10')]=function(_0x540fc6){if(typeof _0x540fc6!==_0x1f85('0x49'))_0x540fc6=_0x540fc6['id'];this[_0x1f85('0x264')]=this[_0x1f85('0x264')]||{},this[_0x1f85('0x264')][_0x540fc6]='';},Game_BattlerBase[_0x1f85('0x23b')][_0x1f85('0x1b6')]=function(_0x397050){if(typeof _0x397050!==_0x1f85('0x49'))_0x397050=_0x397050['id'];this['_stateOrigin']=this[_0x1f85('0x131')]||{},this[_0x1f85('0x131')][_0x397050]=this[_0x1f85('0x131')][_0x397050]||_0x1f85('0x209');const _0x599a08=this[_0x1f85('0x131')][_0x397050];return this[_0x1f85('0x240')](_0x599a08);},Game_BattlerBase['prototype'][_0x1f85('0x64')]=function(_0x2ef5d9,_0x5c276f){this[_0x1f85('0x131')]=this[_0x1f85('0x131')]||{};const _0xbedf75=_0x5c276f?this['convertTargetToStateOriginKey'](_0x5c276f):this[_0x1f85('0x146')]();this[_0x1f85('0x131')][_0x2ef5d9]=_0xbedf75;},Game_BattlerBase[_0x1f85('0x23b')][_0x1f85('0x1eb')]=function(_0xd01578){this['_stateOrigin']=this[_0x1f85('0x131')]||{},delete this[_0x1f85('0x131')][_0xd01578];},Game_BattlerBase[_0x1f85('0x23b')][_0x1f85('0x146')]=function(){const _0x30e7b4=this[_0x1f85('0x107')]();return this[_0x1f85('0x8d')](_0x30e7b4);},Game_BattlerBase['prototype'][_0x1f85('0x107')]=function(){if($gameParty[_0x1f85('0x279')]()){if(BattleManager['_subject'])return BattleManager[_0x1f85('0xa7')];else{if(BattleManager[_0x1f85('0x269')])return BattleManager[_0x1f85('0x269')];}}else{const _0x111831=SceneManager['_scene'];if(![Scene_Map,Scene_Item][_0x1f85('0x223')](_0x111831[_0x1f85('0xdd')]))return $gameParty[_0x1f85('0xfb')]();}return this;},Game_BattlerBase[_0x1f85('0x23b')][_0x1f85('0x8d')]=function(_0x258ada){if(!_0x258ada)return _0x1f85('0x209');if(_0x258ada['isActor']())return _0x1f85('0xc8')['format'](_0x258ada[_0x1f85('0xe9')]());else{if(_0x1f85('0x1a0')!=='Swgru'){const _0x5bdb3c='<enemy-%1>'[_0x1f85('0xfd')](_0x258ada[_0x1f85('0x1dc')]()),_0x556cd8='<member-%1>'[_0x1f85('0xfd')](_0x258ada[_0x1f85('0x28f')]()),_0x5ecdbd='<troop-%1>'[_0x1f85('0xfd')]($gameTroop[_0x1f85('0x231')]());return _0x1f85('0x243')[_0x1f85('0xfd')](_0x5bdb3c,_0x556cd8,_0x5ecdbd);}else{function _0x1669d4(){const _0x1e6f48=this[_0x1f85('0xfc')](),_0x3d48ee=this['_itemWindow'][_0x1f85('0xc0')],_0x3a8d78=this[_0x1f85('0x205')]()?0x0:_0x557568[_0x1f85('0x1fa')]-this['shopStatusWidth'](),_0x5310dd=this[_0x1f85('0x278')]['y'];return new _0xf3bc9c(_0x3a8d78,_0x5310dd,_0x1e6f48,_0x3d48ee);}}}return _0x1f85('0x209');},Game_BattlerBase[_0x1f85('0x23b')][_0x1f85('0x240')]=function(_0x104012){if(_0x104012===_0x1f85('0x209'))return this;else{if(_0x104012[_0x1f85('0x62')](/<actor-(\d+)>/i))return $gameActors[_0x1f85('0x19a')](Number(RegExp['$1']));else{if(_0x1f85('0x263')!==_0x1f85('0x263')){function _0xe29890(){let _0x4812bf=[this['actor'](),this[_0x1f85('0x3b')]()];_0x4812bf=_0x4812bf[_0x1f85('0x23c')](this[_0x1f85('0x262')]()[_0x1f85('0xae')](_0xe7c456=>_0xe7c456));for(const _0x3bb8c0 of this[_0x1f85('0x167')]){const _0x3c8222=_0x54cb9b[_0x3bb8c0];if(_0x3c8222)_0x4812bf['push'](_0x3c8222);}return _0x4812bf;}}else{if($gameParty[_0x1f85('0x279')]()&&_0x104012[_0x1f85('0x62')](/<troop-(\d+)>/i)){const _0x3496c0=Number(RegExp['$1']);if(_0x3496c0===$gameTroop[_0x1f85('0x231')]()){if(_0x1f85('0x21c')!==_0x1f85('0x21c')){function _0x3bdd31(){_0x22c4c1['match'](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0x4be5aa=_0x5a00bb['indexOf'](_0x2535dc(_0x10d0cc['$1'])['toUpperCase']()),_0x2828fd=_0x2bbb05(_0x103ba7['$2']);_0x4be5aa>=0x0&&(_0x232d74[_0x1f85('0xf4')](_0x4be5aa,_0x2828fd),this[_0x1f85('0x272')](_0x5db971));}}else{if(_0x104012[_0x1f85('0x62')](/<member-(\d+)>/i)){if(_0x1f85('0x201')===_0x1f85('0x160')){function _0xa73534(){this[_0x1f85('0x131')]=this[_0x1f85('0x131')]||{},delete this['_stateOrigin'][_0x4225a7];}}else return $gameTroop[_0x1f85('0x1d7')]()[Number(RegExp['$1'])];}}}}if(_0x104012[_0x1f85('0x62')](/<enemy-(\d+)>/i))return new Game_Enemy(Number(RegExp['$1']),-0x1f4,-0x1f4);}}}return this;},VisuMZ[_0x1f85('0x9')]['Game_Battler_addState']=Game_Battler[_0x1f85('0x23b')][_0x1f85('0x208')],Game_Battler[_0x1f85('0x23b')][_0x1f85('0x208')]=function(_0x4e5cc1){VisuMZ[_0x1f85('0x9')][_0x1f85('0x12c')][_0x1f85('0xe5')](this,_0x4e5cc1);if(this['hasState']($dataStates[_0x4e5cc1])){if(_0x1f85('0xbd')!==_0x1f85('0xbd')){function _0x46f90b(){if(this[_0x1f85('0x115')](_0x1f85('0x22d')))return this[_0x1f85('0x267')]();return this[_0x1f85('0x238')][_0x1f85('0x22d')]=[],this[_0x1f85('0x11')](),this['addPassiveStatesByNotetag'](),this[_0x1f85('0xcc')](),this[_0x1f85('0x267')]();}}else{this[_0x1f85('0xb6')](_0x4e5cc1);;}}},Game_Battler[_0x1f85('0x23b')][_0x1f85('0xb6')]=function(_0x2d9e8e){this[_0x1f85('0x64')](_0x2d9e8e),this[_0x1f85('0xa5')](_0x2d9e8e),this['onAddStateCustomJS'](_0x2d9e8e),this['onAddStateGlobalJS'](_0x2d9e8e);},Game_Battler['prototype'][_0x1f85('0xf1')]=function(_0x1aa4d8){Game_BattlerBase[_0x1f85('0x23b')][_0x1f85('0xf1')][_0x1f85('0xe5')](this,_0x1aa4d8),this[_0x1f85('0x246')](_0x1aa4d8),this[_0x1f85('0xc7')](_0x1aa4d8);},Game_Battler[_0x1f85('0x23b')][_0x1f85('0x194')]=function(_0x128800){for(const _0x4bb50e of this[_0x1f85('0x252')]()){if('RpwQA'===_0x1f85('0x90'))this[_0x1f85('0x1bc')](_0x4bb50e['id'])&&_0x4bb50e[_0x1f85('0x26c')]===_0x128800&&(this[_0x1f85('0xb3')](_0x4bb50e['id']),this[_0x1f85('0x2a5')](_0x4bb50e['id']),this[_0x1f85('0x3c')](_0x4bb50e['id']));else{function _0x500ac6(){for(const _0x2962e4 of _0x37751a){_0x2962e4[_0x1f85('0x62')](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x58f87a=_0x28b1a4[_0x1f85('0x2a2')](_0x2ac34a(_0x34a676['$1'])['toUpperCase']()),_0x2453cb=_0x2abd9a(_0xc1d26f['$2']);_0x58f87a>=0x0&&(_0x4a29c5[_0x1f85('0x1b3')](_0x58f87a,_0x2453cb),this['makeSuccess'](_0x4885f5));}}}}},Game_Battler['prototype'][_0x1f85('0x2a5')]=function(_0x1633cb){this[_0x1f85('0x111')](_0x1633cb);},Game_Battler[_0x1f85('0x23b')][_0x1f85('0x1d6')]=function(_0x3990e7){const _0x4c8358=VisuMZ[_0x1f85('0x9')][_0x1f85('0xcd')];if(_0x4c8358[_0x3990e7])_0x4c8358[_0x3990e7][_0x1f85('0xe5')](this,_0x3990e7);},Game_Battler['prototype'][_0x1f85('0x246')]=function(_0x219520){const _0x22637a=VisuMZ['SkillsStatesCore']['stateEraseJS'];if(_0x22637a[_0x219520])_0x22637a[_0x219520][_0x1f85('0xe5')](this,_0x219520);},Game_Battler[_0x1f85('0x23b')][_0x1f85('0x111')]=function(_0x2d833b){const _0x3f83e3=VisuMZ['SkillsStatesCore'][_0x1f85('0x39')];if(_0x3f83e3[_0x2d833b])_0x3f83e3[_0x2d833b][_0x1f85('0xe5')](this,_0x2d833b);},Game_Battler[_0x1f85('0x23b')][_0x1f85('0x168')]=function(_0x467678){try{VisuMZ[_0x1f85('0x9')][_0x1f85('0x244')][_0x1f85('0x22b')][_0x1f85('0xdc')][_0x1f85('0xe5')](this,_0x467678);}catch(_0x5aec36){if($gameTemp[_0x1f85('0x11a')]())console[_0x1f85('0x1af')](_0x5aec36);}},Game_Battler[_0x1f85('0x23b')][_0x1f85('0xc7')]=function(_0x225507){try{if(_0x1f85('0x239')==='EzCzD'){function _0x306804(){return this[_0x1f85('0x137')]();}}else VisuMZ[_0x1f85('0x9')][_0x1f85('0x244')][_0x1f85('0x22b')][_0x1f85('0x11c')][_0x1f85('0xe5')](this,_0x225507);}catch(_0x547839){if($gameTemp[_0x1f85('0x11a')]())console['log'](_0x547839);}},Game_Battler[_0x1f85('0x23b')][_0x1f85('0x3c')]=function(_0x226197){try{VisuMZ[_0x1f85('0x9')][_0x1f85('0x244')][_0x1f85('0x22b')][_0x1f85('0x230')][_0x1f85('0xe5')](this,_0x226197);}catch(_0x2e153f){if($gameTemp[_0x1f85('0x11a')]())console[_0x1f85('0x1af')](_0x2e153f);}},Game_Battler[_0x1f85('0x23b')][_0x1f85('0x18a')]=function(_0x3f1fed){return _0x3f1fed=_0x3f1fed['toUpperCase']()['trim'](),this[_0x1f85('0x252')]()[_0x1f85('0xae')](_0x183c56=>_0x183c56[_0x1f85('0xc4')][_0x1f85('0x223')](_0x3f1fed));},Game_Battler[_0x1f85('0x23b')][_0x1f85('0x235')]=function(_0x3e3cb8,_0x170667){_0x3e3cb8=_0x3e3cb8['toUpperCase']()[_0x1f85('0x1ab')](),_0x170667=_0x170667||0x0;const _0xa98bc3=this[_0x1f85('0x18a')](_0x3e3cb8);for(state of _0xa98bc3){if(_0x1f85('0x213')!==_0x1f85('0x213')){function _0x58ad63(){this[_0x1f85('0x188')]['outlineColor']=_0x185b3b;}}else{if(_0x170667<=0x0)return;this[_0x1f85('0xb3')](state['id']),this[_0x1f85('0x11d')][_0x1f85('0xef')]=!![],_0x170667--;}}},VisuMZ[_0x1f85('0x9')][_0x1f85('0x199')]=Game_Battler[_0x1f85('0x23b')][_0x1f85('0x202')],Game_Battler[_0x1f85('0x23b')][_0x1f85('0x202')]=function(_0x455e9e,_0x59c6d8){VisuMZ[_0x1f85('0x9')][_0x1f85('0x199')][_0x1f85('0xe5')](this,_0x455e9e,_0x59c6d8),this[_0x1f85('0xc6')](_0x455e9e)&&this[_0x1f85('0x10a')](_0x455e9e,_0x59c6d8);},VisuMZ[_0x1f85('0x9')]['Game_Battler_addDebuff']=Game_Battler[_0x1f85('0x23b')][_0x1f85('0x1c7')],Game_Battler[_0x1f85('0x23b')][_0x1f85('0x1c7')]=function(_0x408374,_0x258309){VisuMZ[_0x1f85('0x9')][_0x1f85('0x1a')][_0x1f85('0xe5')](this,_0x408374,_0x258309),this[_0x1f85('0x4e')](_0x408374)&&this[_0x1f85('0x104')](_0x408374,_0x258309);},Game_Battler[_0x1f85('0x23b')][_0x1f85('0x32')]=function(){for(let _0x57575f=0x0;_0x57575f<this[_0x1f85('0x41')]();_0x57575f++){if(this[_0x1f85('0x121')](_0x57575f)){const _0x5d4ea1=this['_buffs'][_0x57575f];this[_0x1f85('0x253')](_0x57575f);if(_0x5d4ea1>0x0)this[_0x1f85('0x177')](_0x57575f);if(_0x5d4ea1<0x0)this[_0x1f85('0x184')](_0x57575f);}}},Game_Battler['prototype'][_0x1f85('0x10a')]=function(_0x331bec,_0x4d29f4){this[_0x1f85('0x98')](_0x331bec,_0x4d29f4);},Game_Battler[_0x1f85('0x23b')][_0x1f85('0x104')]=function(_0x4f63c5,_0x285e82){this[_0x1f85('0xbb')](_0x4f63c5,_0x285e82);},Game_Battler[_0x1f85('0x23b')][_0x1f85('0x14a')]=function(_0x517422){Game_BattlerBase[_0x1f85('0x23b')][_0x1f85('0x14a')]['call'](this,_0x517422),this[_0x1f85('0x242')](_0x517422);},Game_Battler[_0x1f85('0x23b')][_0x1f85('0xaa')]=function(_0x22e42f){Game_BattlerBase[_0x1f85('0x23b')]['onEraseDebuff'][_0x1f85('0xe5')](this,_0x22e42f),this[_0x1f85('0x2b9')](_0x22e42f);},Game_Battler[_0x1f85('0x23b')][_0x1f85('0x177')]=function(_0x222661){this[_0x1f85('0x23a')](_0x222661);},Game_Battler[_0x1f85('0x23b')][_0x1f85('0x184')]=function(_0x567ff4){this[_0x1f85('0x1bf')](_0x567ff4);},Game_Battler[_0x1f85('0x23b')]['onAddBuffGlobalJS']=function(_0x53a11d,_0x88143e){VisuMZ[_0x1f85('0x9')][_0x1f85('0x244')][_0x1f85('0x229')]['onAddBuffJS'][_0x1f85('0xe5')](this,_0x53a11d,_0x88143e);},Game_Battler[_0x1f85('0x23b')][_0x1f85('0xbb')]=function(_0x83915e,_0x3a78cd){VisuMZ[_0x1f85('0x9')][_0x1f85('0x244')]['Buffs'][_0x1f85('0x1d')][_0x1f85('0xe5')](this,_0x83915e,_0x3a78cd);},Game_BattlerBase[_0x1f85('0x23b')]['onEraseBuffGlobalJS']=function(_0x69fb3e){VisuMZ['SkillsStatesCore'][_0x1f85('0x244')][_0x1f85('0x229')][_0x1f85('0x4a')][_0x1f85('0xe5')](this,_0x69fb3e);},Game_BattlerBase[_0x1f85('0x23b')]['onEraseDebuffGlobalJS']=function(_0x3d160b){VisuMZ[_0x1f85('0x9')][_0x1f85('0x244')][_0x1f85('0x229')][_0x1f85('0x218')][_0x1f85('0xe5')](this,_0x3d160b);},Game_Battler['prototype'][_0x1f85('0x23a')]=function(_0x1d4da2){VisuMZ[_0x1f85('0x9')]['Settings'][_0x1f85('0x229')]['onExpireBuffJS'][_0x1f85('0xe5')](this,_0x1d4da2);},Game_Battler[_0x1f85('0x23b')][_0x1f85('0x1bf')]=function(_0x37679b){VisuMZ[_0x1f85('0x9')][_0x1f85('0x244')]['Buffs']['onExpireDebuffJS'][_0x1f85('0xe5')](this,_0x37679b);},Game_Battler[_0x1f85('0x23b')][_0x1f85('0xa5')]=function(_0xc7a490){const _0x29ef5f=VisuMZ['SkillsStatesCore'],_0x339856=[_0x1f85('0x48'),_0x1f85('0x6f'),_0x1f85('0xf7'),_0x1f85('0x1a9'),_0x1f85('0x1d4'),_0x1f85('0x1ef')];for(const _0x3d317e of _0x339856){if(_0x29ef5f[_0x3d317e][_0xc7a490]){if(_0x1f85('0x26d')===_0x1f85('0xd1')){function _0x3b1aea(){if(!_0x69c668[_0x1f85('0x1e9')](_0x417c87))return![];}}else _0x29ef5f[_0x3d317e][_0xc7a490][_0x1f85('0xe5')](this,_0xc7a490);}}},VisuMZ[_0x1f85('0x9')][_0x1f85('0x275')]=Game_Battler[_0x1f85('0x23b')]['regenerateAll'],Game_Battler[_0x1f85('0x23b')][_0x1f85('0x22f')]=function(){VisuMZ[_0x1f85('0x9')]['Game_Battler_regenerateAll'][_0x1f85('0xe5')](this),this['setPassiveStateSlipDamageJS'](),this[_0x1f85('0x1ac')]();},Game_Battler[_0x1f85('0x23b')][_0x1f85('0x105')]=function(){for(const _0x235829 of this[_0x1f85('0x22d')]()){if(!_0x235829)continue;this['onAddStateMakeCustomSlipValues'](_0x235829['id']);}},Game_Battler['prototype'][_0x1f85('0x1ac')]=function(){if(!this[_0x1f85('0x14d')]())return;const _0x417d06=this[_0x1f85('0x252')]();for(const _0x31dfde of _0x417d06){if(!_0x31dfde)continue;this[_0x1f85('0x89')](_0x31dfde);}},Game_Battler['prototype']['onRegenerateCustomStateDamageOverTime']=function(_0x545b91){const _0x51efd9=this[_0x1f85('0x20b')](_0x545b91['id'],_0x1f85('0xf3'))||0x0,_0x2ba78a=-this['maxSlipDamage'](),_0x25f20c=Math[_0x1f85('0xb4')](_0x51efd9,_0x2ba78a);if(_0x25f20c!==0x0)this[_0x1f85('0x217')](_0x25f20c);const _0x45ce88=this[_0x1f85('0x20b')](_0x545b91['id'],_0x1f85('0x2bc'))||0x0;if(_0x45ce88!==0x0)this['gainMp'](_0x45ce88);const _0x45804c=this[_0x1f85('0x20b')](_0x545b91['id'],_0x1f85('0x116'))||0x0;if(_0x45804c!==0x0)this[_0x1f85('0x8b')](_0x45ce88);},VisuMZ[_0x1f85('0x9')][_0x1f85('0x24')]=Game_Actor[_0x1f85('0x23b')]['skillTypes'],Game_Actor['prototype'][_0x1f85('0x255')]=function(){const _0x34ccb6=VisuMZ['SkillsStatesCore'][_0x1f85('0x24')]['call'](this),_0x36c775=VisuMZ[_0x1f85('0x9')][_0x1f85('0x244')][_0x1f85('0x5d')];let _0x3b8bf9=_0x36c775[_0x1f85('0x281')];return $gameParty[_0x1f85('0x279')]()&&(_0x3b8bf9=_0x3b8bf9[_0x1f85('0x23c')](_0x36c775[_0x1f85('0x91')])),_0x34ccb6['filter'](_0x4bfa48=>!_0x3b8bf9['includes'](_0x4bfa48));},Game_Actor['prototype'][_0x1f85('0x249')]=function(){return this[_0x1f85('0xff')]()[_0x1f85('0xae')](_0x2aaa63=>this[_0x1f85('0x250')](_0x2aaa63));},Game_Actor[_0x1f85('0x23b')]['isSkillUsableForAutoBattle']=function(_0x389f2d){if(!this[_0x1f85('0xad')](_0x389f2d))return![];const _0x541cea=this[_0x1f85('0x255')](),_0xf95e5f=DataManager[_0x1f85('0xe0')](_0x389f2d),_0x52ddd1=_0x541cea[_0x1f85('0xae')](_0x581eb6=>_0xf95e5f[_0x1f85('0x223')](_0x581eb6));return _0x52ddd1[_0x1f85('0xac')]>0x0;},Game_Actor[_0x1f85('0x23b')][_0x1f85('0xec')]=function(){let _0x5dc3b5=[this[_0x1f85('0x19a')](),this[_0x1f85('0x3b')]()];_0x5dc3b5=_0x5dc3b5[_0x1f85('0x23c')](this['equips']()[_0x1f85('0xae')](_0x3c694e=>_0x3c694e));for(const _0x1669ed of this[_0x1f85('0x167')]){const _0x364f6a=$dataSkills[_0x1669ed];if(_0x364f6a)_0x5dc3b5[_0x1f85('0x20')](_0x364f6a);}return _0x5dc3b5;},Game_Actor[_0x1f85('0x23b')][_0x1f85('0xcc')]=function(){Game_Battler[_0x1f85('0x23b')][_0x1f85('0xcc')][_0x1f85('0xe5')](this);const _0x55d2d5=VisuMZ[_0x1f85('0x9')][_0x1f85('0x244')]['PassiveStates'][_0x1f85('0x16')];this[_0x1f85('0x238')][_0x1f85('0x22d')]=this[_0x1f85('0x238')][_0x1f85('0x22d')][_0x1f85('0x23c')](_0x55d2d5);},VisuMZ['SkillsStatesCore'][_0x1f85('0x2b6')]=Game_Actor[_0x1f85('0x23b')][_0x1f85('0x127')],Game_Actor[_0x1f85('0x23b')][_0x1f85('0x127')]=function(_0x1a9181){VisuMZ['SkillsStatesCore']['Game_Actor_learnSkill'][_0x1f85('0xe5')](this,_0x1a9181),this[_0x1f85('0x238')]={};},VisuMZ[_0x1f85('0x9')][_0x1f85('0x43')]=Game_Actor[_0x1f85('0x23b')][_0x1f85('0xdb')],Game_Actor[_0x1f85('0x23b')][_0x1f85('0xdb')]=function(_0x3bd2e3){VisuMZ[_0x1f85('0x9')][_0x1f85('0x43')][_0x1f85('0xe5')](this,_0x3bd2e3),this[_0x1f85('0x238')]={};},Game_Enemy[_0x1f85('0x23b')][_0x1f85('0xec')]=function(){let _0x375b0d=[this['enemy']()];return _0x375b0d['concat'](this['skills']());},Game_Enemy['prototype'][_0x1f85('0xcc')]=function(){Game_Battler[_0x1f85('0x23b')]['addPassiveStatesByPluginParameters'][_0x1f85('0xe5')](this);const _0xd8cd94=VisuMZ['SkillsStatesCore'][_0x1f85('0x244')]['PassiveStates'][_0x1f85('0x22e')];this['_cache'][_0x1f85('0x22d')]=this[_0x1f85('0x238')]['passiveStates']['concat'](_0xd8cd94);},Game_Enemy['prototype'][_0x1f85('0xff')]=function(){const _0x38cd2f=[];for(const _0x7857be of this[_0x1f85('0x18d')]()[_0x1f85('0x11e')]){if('KMRqq'!==_0x1f85('0x20d')){const _0x2de340=$dataSkills[_0x7857be[_0x1f85('0x296')]];if(_0x2de340&&!_0x38cd2f['includes'](_0x2de340))_0x38cd2f[_0x1f85('0x20')](_0x2de340);}else{function _0x22b4eb(){return _0x5034cd;}}}return _0x38cd2f;},Game_Enemy['prototype'][_0x1f85('0x67')]=function(_0x2e502b){return this[_0x1f85('0x1c1')]($dataStates[_0x2e502b]);},VisuMZ[_0x1f85('0x9')][_0x1f85('0x196')]=Game_Unit[_0x1f85('0x23b')][_0x1f85('0xea')],Game_Unit[_0x1f85('0x23b')][_0x1f85('0xea')]=function(){if(this[_0x1f85('0x17a')]())return!![];return VisuMZ[_0x1f85('0x9')][_0x1f85('0x196')][_0x1f85('0xe5')](this);},Game_Unit[_0x1f85('0x23b')][_0x1f85('0x17a')]=function(){const _0x555f77=this[_0x1f85('0x19f')]();for(const _0x3439d5 of _0x555f77){if(!_0x3439d5[_0x1f85('0x29d')]())return![];}return!![];},VisuMZ[_0x1f85('0x9')][_0x1f85('0x2a6')]=Game_Troop[_0x1f85('0x23b')][_0x1f85('0x29b')],Game_Troop[_0x1f85('0x23b')]['setup']=function(_0x3ed896){VisuMZ['SkillsStatesCore'][_0x1f85('0x2a6')][_0x1f85('0xe5')](this,_0x3ed896),this[_0x1f85('0x190')]();},Game_Troop[_0x1f85('0x23b')][_0x1f85('0x190')]=function(){this[_0x1f85('0x222')]=Graphics['frameCount'];},Game_Troop['prototype'][_0x1f85('0x231')]=function(){return this[_0x1f85('0x222')]=this[_0x1f85('0x222')]||Graphics[_0x1f85('0x8e')],this[_0x1f85('0x222')];},Scene_Skill[_0x1f85('0x23b')][_0x1f85('0x216')]=function(){if(ConfigManager[_0x1f85('0x232')]&&ConfigManager[_0x1f85('0x56')]!==undefined)return ConfigManager[_0x1f85('0x56')];else{if(this['isUseSkillsStatesCoreUpdatedLayout']())return this['updatedLayoutStyle']()[_0x1f85('0x62')](/LOWER/i);else Scene_ItemBase[_0x1f85('0x23b')][_0x1f85('0x205')][_0x1f85('0xe5')](this);}},Scene_Skill[_0x1f85('0x23b')]['isRightInputMode']=function(){if(ConfigManager[_0x1f85('0x232')]&&ConfigManager[_0x1f85('0x156')]!==undefined)return ConfigManager[_0x1f85('0x156')];else{if(this[_0x1f85('0x26')]())return this['updatedLayoutStyle']()[_0x1f85('0x62')](/RIGHT/i);else Scene_ItemBase[_0x1f85('0x23b')][_0x1f85('0x205')][_0x1f85('0xe5')](this);}},Scene_Skill['prototype'][_0x1f85('0x117')]=function(){return VisuMZ['SkillsStatesCore'][_0x1f85('0x244')][_0x1f85('0x5d')][_0x1f85('0x22')];},Scene_Skill[_0x1f85('0x23b')]['isUseModernControls']=function(){return this[_0x1f85('0x211')]&&this[_0x1f85('0x211')][_0x1f85('0x1a1')]();},Scene_Skill[_0x1f85('0x23b')][_0x1f85('0x26')]=function(){return VisuMZ[_0x1f85('0x9')]['Settings'][_0x1f85('0x5d')][_0x1f85('0x2a3')];},VisuMZ[_0x1f85('0x9')][_0x1f85('0x214')]=Scene_Skill[_0x1f85('0x23b')][_0x1f85('0x13c')],Scene_Skill[_0x1f85('0x23b')][_0x1f85('0x13c')]=function(){if(this[_0x1f85('0x26')]()){if(_0x1f85('0x288')!==_0x1f85('0x142'))return this['helpWindowRectSkillsStatesCore']();else{function _0x4896b0(){const _0x395878=_0x3e7a52[_0x1f85('0xd2')]('['+_0x234f47['$1']['match'](/\d+/g)+']');for(const _0x28218f of _0x395878){if(this[_0x1f85('0x17d')][_0x1f85('0xa9')](_0x28218f))return!![];}return![];}}}else return VisuMZ[_0x1f85('0x9')]['Scene_Skill_helpWindowRect'][_0x1f85('0xe5')](this);},Scene_Skill[_0x1f85('0x23b')]['helpWindowRectSkillsStatesCore']=function(){const _0x4b41ba=0x0,_0x1fab75=this[_0x1f85('0xa6')](),_0x3bd827=Graphics['boxWidth'],_0x40e2dd=this[_0x1f85('0x14')]();return new Rectangle(_0x4b41ba,_0x1fab75,_0x3bd827,_0x40e2dd);},VisuMZ['SkillsStatesCore'][_0x1f85('0x1fc')]=Scene_Skill[_0x1f85('0x23b')][_0x1f85('0x286')],Scene_Skill['prototype']['skillTypeWindowRect']=function(){return this[_0x1f85('0x26')]()?this[_0x1f85('0x170')]():VisuMZ[_0x1f85('0x9')][_0x1f85('0x1fc')]['call'](this);},Scene_Skill[_0x1f85('0x23b')][_0x1f85('0x170')]=function(){const _0x4b545b=this['mainCommandWidth'](),_0x2dcf98=this[_0x1f85('0x6d')](0x3,!![]),_0x700bbd=this['isRightInputMode']()?Graphics[_0x1f85('0x1fa')]-_0x4b545b:0x0,_0x2c90a5=this[_0x1f85('0x25b')]();return new Rectangle(_0x700bbd,_0x2c90a5,_0x4b545b,_0x2dcf98);},VisuMZ[_0x1f85('0x9')][_0x1f85('0x1b0')]=Scene_Skill['prototype']['statusWindowRect'],Scene_Skill[_0x1f85('0x23b')][_0x1f85('0x94')]=function(){return this[_0x1f85('0x26')]()?this[_0x1f85('0x6a')]():VisuMZ[_0x1f85('0x9')][_0x1f85('0x1b0')][_0x1f85('0xe5')](this);},Scene_Skill[_0x1f85('0x23b')][_0x1f85('0x6a')]=function(){const _0xe83726=Graphics[_0x1f85('0x1fa')]-this['mainCommandWidth'](),_0x3e6bf3=this[_0x1f85('0x78')][_0x1f85('0xc0')],_0x4ba540=this[_0x1f85('0x205')]()?0x0:Graphics[_0x1f85('0x1fa')]-_0xe83726,_0x4fec6e=this[_0x1f85('0x25b')]();return new Rectangle(_0x4ba540,_0x4fec6e,_0xe83726,_0x3e6bf3);},VisuMZ[_0x1f85('0x9')]['Scene_Skill_createItemWindow']=Scene_Skill[_0x1f85('0x23b')]['createItemWindow'],Scene_Skill[_0x1f85('0x23b')]['createItemWindow']=function(){VisuMZ[_0x1f85('0x9')]['Scene_Skill_createItemWindow'][_0x1f85('0xe5')](this),this[_0x1f85('0x1bb')]()&&this[_0x1f85('0x23d')]();},VisuMZ[_0x1f85('0x9')]['Scene_Skill_itemWindowRect']=Scene_Skill[_0x1f85('0x23b')]['itemWindowRect'],Scene_Skill[_0x1f85('0x23b')][_0x1f85('0x96')]=function(){if(this[_0x1f85('0x26')]()){if('OAQGq'===_0x1f85('0xf8'))return this[_0x1f85('0x1c4')]();else{function _0x3a4f13(){this[_0x1f85('0xbb')](_0x468ab8,_0x5d48a3);}}}else{const _0x21abfd=VisuMZ['SkillsStatesCore'][_0x1f85('0x33')][_0x1f85('0xe5')](this);if(this['allowCreateShopStatusWindow']()&&this[_0x1f85('0xf0')]()){if(_0x1f85('0x1cc')===_0x1f85('0x1cc'))_0x21abfd[_0x1f85('0x13d')]-=this['shopStatusWidth']();else{function _0x12452b(){if(typeof _0xa5598d!==_0x1f85('0x49'))_0x4bf970=_0xb42a2b['id'];this[_0x1f85('0x264')]=this[_0x1f85('0x264')]||{},this[_0x1f85('0x264')][_0x55632e]=_0x2c2bd4;}}}return _0x21abfd;}},Scene_Skill[_0x1f85('0x23b')][_0x1f85('0x1c4')]=function(){const _0x4c3fba=Graphics['boxWidth']-this[_0x1f85('0xfc')](),_0x561c32=this[_0x1f85('0x147')]()-this[_0x1f85('0xce')][_0x1f85('0xc0')],_0x234cfc=this[_0x1f85('0x205')]()?Graphics[_0x1f85('0x1fa')]-_0x4c3fba:0x0,_0x58b90d=this[_0x1f85('0xce')]['y']+this[_0x1f85('0xce')]['height'];return new Rectangle(_0x234cfc,_0x58b90d,_0x4c3fba,_0x561c32);},Scene_Skill[_0x1f85('0x23b')]['allowCreateShopStatusWindow']=function(){if(!Imported[_0x1f85('0x212')])return![];else{if(this[_0x1f85('0x26')]()){if(_0x1f85('0x13f')===_0x1f85('0x13f'))return!![];else{function _0x3569a6(){_0x38f649[_0x1f85('0x9')]['Sprite_StateIcon_loadBitmap'][_0x1f85('0xe5')](this),this[_0x1f85('0x1a7')]();}}}else{if(_0x1f85('0x1cb')!==_0x1f85('0x1cb')){function _0x565d80(){this['_statusWindow']&&this['_statusWindow'][_0x1f85('0xdd')]===_0x2a3fa4&&this[_0x1f85('0xce')][_0x1f85('0x215')](this[_0x1f85('0x195')](0x0));}}else return VisuMZ[_0x1f85('0x9')][_0x1f85('0x244')][_0x1f85('0x5d')][_0x1f85('0x1ec')];}}},Scene_Skill[_0x1f85('0x23b')][_0x1f85('0xf0')]=function(){return VisuMZ[_0x1f85('0x9')][_0x1f85('0x244')]['Skills']['SkillSceneAdjustSkillList'];},Scene_Skill[_0x1f85('0x23b')][_0x1f85('0x23d')]=function(){const _0x31c948=this['shopStatusWindowRect']();this[_0x1f85('0xa2')]=new Window_ShopStatus(_0x31c948),this[_0x1f85('0x88')](this[_0x1f85('0xa2')]),this['_itemWindow'][_0x1f85('0xf2')](this[_0x1f85('0xa2')]);},Scene_Skill[_0x1f85('0x23b')][_0x1f85('0x172')]=function(){if(this['isUseSkillsStatesCoreUpdatedLayout']()){if('yuQch'===_0x1f85('0x75')){function _0x1ea487(){const _0x33ac40=this[_0x1f85('0x172')]();this[_0x1f85('0xa2')]=new _0x1cc68a(_0x33ac40),this[_0x1f85('0x88')](this[_0x1f85('0xa2')]),this['_itemWindow']['setStatusWindow'](this['_shopStatusWindow']);}}else return this[_0x1f85('0x11f')]();}else return VisuMZ[_0x1f85('0x9')][_0x1f85('0x244')][_0x1f85('0x5d')][_0x1f85('0x12a')][_0x1f85('0xe5')](this);},Scene_Skill[_0x1f85('0x23b')][_0x1f85('0x11f')]=function(){const _0x20b631=this[_0x1f85('0xfc')](),_0x46b52c=this[_0x1f85('0x278')][_0x1f85('0xc0')],_0x43879c=this[_0x1f85('0x205')]()?0x0:Graphics[_0x1f85('0x1fa')]-this['shopStatusWidth'](),_0x4594d4=this[_0x1f85('0x278')]['y'];return new Rectangle(_0x43879c,_0x4594d4,_0x20b631,_0x46b52c);},Scene_Skill[_0x1f85('0x23b')][_0x1f85('0xfc')]=function(){return Imported[_0x1f85('0x212')]?Scene_Shop[_0x1f85('0x23b')]['statusWidth']():0x0;},Scene_Skill['prototype'][_0x1f85('0x161')]=function(){if(this[_0x1f85('0x78')]&&this[_0x1f85('0x78')][_0x1f85('0x241')])return TextManager[_0x1f85('0x16d')];else{if(_0x1f85('0x18e')!==_0x1f85('0x18e')){function _0x5d78a7(){const _0x1921cd=_0x44aa4a['SkillsStatesCore'][_0x1f85('0x244')][_0x1f85('0x42')][_0x1f85('0xae')](_0x4fc6f6=>_0x4fc6f6[_0x1f85('0x110')][_0x1f85('0xc2')]()===_0x1bd763[_0x1f85('0xc2')]());_0x1921cd[_0x1f85('0xac')]>=0x1?this[_0x1f85('0x92')]=_0x1921cd[0x0]:this[_0x1f85('0x92')]=null;}}else return'';}},VisuMZ[_0x1f85('0x9')][_0x1f85('0x8a')]=Sprite_Gauge[_0x1f85('0x23b')][_0x1f85('0x220')],Sprite_Gauge['prototype']['initMembers']=function(){VisuMZ[_0x1f85('0x9')][_0x1f85('0x8a')][_0x1f85('0xe5')](this),this[_0x1f85('0x92')]=null;},VisuMZ['SkillsStatesCore'][_0x1f85('0x6c')]=Sprite_Gauge[_0x1f85('0x23b')][_0x1f85('0x29b')],Sprite_Gauge['prototype'][_0x1f85('0x29b')]=function(_0x5421cd,_0x2dc1a5){this[_0x1f85('0x28c')](_0x5421cd,_0x2dc1a5),_0x2dc1a5=_0x2dc1a5['toLowerCase'](),VisuMZ['SkillsStatesCore']['Sprite_Gauge_setup'][_0x1f85('0xe5')](this,_0x5421cd,_0x2dc1a5);},Sprite_Gauge[_0x1f85('0x23b')][_0x1f85('0x28c')]=function(_0x285d50,_0x17a334){const _0x51a0fc=VisuMZ['SkillsStatesCore'][_0x1f85('0x244')][_0x1f85('0x42')]['filter'](_0x508fd0=>_0x508fd0[_0x1f85('0x110')][_0x1f85('0xc2')]()===_0x17a334['toUpperCase']());if(_0x51a0fc['length']>=0x1){if(_0x1f85('0x5c')===_0x1f85('0x5c'))this[_0x1f85('0x92')]=_0x51a0fc[0x0];else{function _0x385b3d(){return _0x44189a[_0x1f85('0x9')][_0x1f85('0x244')][_0x1f85('0x5d')][_0x1f85('0x2a3')];}}}else{if(_0x1f85('0xbe')===_0x1f85('0xbe'))this[_0x1f85('0x92')]=null;else{function _0x304561(){if(!this[_0x1f85('0x17d')][_0x1f85('0x136')](_0x4527fa))return!![];}}}},VisuMZ[_0x1f85('0x9')][_0x1f85('0x77')]=Sprite_Gauge[_0x1f85('0x23b')][_0x1f85('0x189')],Sprite_Gauge[_0x1f85('0x23b')][_0x1f85('0x189')]=function(){if(this[_0x1f85('0x273')]&&this[_0x1f85('0x92')]){if('BTMSG'===_0x1f85('0x28b'))return this[_0x1f85('0x114')]();else{function _0x900a63(){const _0x42ca85=_0x387887[_0x1f85('0x9')][_0x1f85('0x244')][_0x1f85('0x86')]['Global'];this[_0x1f85('0x238')][_0x1f85('0x22d')]=this[_0x1f85('0x238')]['passiveStates'][_0x1f85('0x23c')](_0x42ca85);}}}else return VisuMZ[_0x1f85('0x9')][_0x1f85('0x77')][_0x1f85('0xe5')](this);},Sprite_Gauge['prototype']['currentValueSkillsStatesCore']=function(){return this[_0x1f85('0x92')][_0x1f85('0x27c')]['call'](this['_battler']);},VisuMZ['SkillsStatesCore'][_0x1f85('0x76')]=Sprite_Gauge[_0x1f85('0x23b')][_0x1f85('0x1e')],Sprite_Gauge[_0x1f85('0x23b')][_0x1f85('0x1e')]=function(){if(this[_0x1f85('0x273')]&&this['_costSettings'])return this[_0x1f85('0x137')]();else{if('SAYWK'==='QtwaF'){function _0x295954(){return _0x2b868d[_0x1f85('0x9')][_0x1f85('0x1fc')][_0x1f85('0xe5')](this);}}else return VisuMZ[_0x1f85('0x9')][_0x1f85('0x76')][_0x1f85('0xe5')](this);}},Sprite_Gauge[_0x1f85('0x23b')][_0x1f85('0x137')]=function(){return this['_costSettings'][_0x1f85('0x144')][_0x1f85('0xe5')](this['_battler']);},VisuMZ['SkillsStatesCore'][_0x1f85('0x1e5')]=Sprite_Gauge['prototype'][_0x1f85('0xc1')],Sprite_Gauge[_0x1f85('0x23b')][_0x1f85('0xc1')]=function(){const _0x4bce75=VisuMZ[_0x1f85('0x9')][_0x1f85('0x1e5')][_0x1f85('0xe5')](this);return _0x4bce75[_0x1f85('0x1be')](0x0,0x1);},VisuMZ[_0x1f85('0x9')][_0x1f85('0x179')]=Sprite_Gauge[_0x1f85('0x23b')][_0x1f85('0x2ad')],Sprite_Gauge[_0x1f85('0x23b')][_0x1f85('0x2ad')]=function(){if(this[_0x1f85('0x273')]&&this[_0x1f85('0x92')])this[_0x1f85('0x289')][_0x1f85('0x2c')](),this[_0x1f85('0x282')]();else{if(_0x1f85('0x1ca')===_0x1f85('0x1ca'))VisuMZ[_0x1f85('0x9')][_0x1f85('0x179')][_0x1f85('0xe5')](this);else{function _0x1f7e75(){return _0x20d6a5['buttonAssistSwitch'];}}}},Sprite_Gauge['prototype'][_0x1f85('0x25a')]=function(){let _0x5a4b32=this[_0x1f85('0x189')]();if(Imported['VisuMZ_0_CoreEngine']&&this['useDigitGrouping']()){if(_0x1f85('0x4b')===_0x1f85('0x4b'))_0x5a4b32=VisuMZ[_0x1f85('0x27e')](_0x5a4b32);else{function _0x197406(){if(_0x32a348[_0x1f85('0x1e9')](_0x26edf4))return![];}}}return _0x5a4b32;},Sprite_Gauge[_0x1f85('0x23b')]['redrawSkillsStatesCore']=function(){this[_0x1f85('0x92')][_0x1f85('0x1a4')][_0x1f85('0xe5')](this);},Sprite_Gauge[_0x1f85('0x23b')][_0x1f85('0x164')]=function(_0x4364f1,_0x58b146,_0x21e5eb,_0x40bd84,_0x3bc506,_0x4a6d87){const _0x541002=this['gaugeRate'](),_0x39d6b6=Math[_0x1f85('0x1b2')]((_0x3bc506-0x2)*_0x541002),_0x419b5e=_0x4a6d87-0x2,_0x3158cc=this[_0x1f85('0x8')]();this[_0x1f85('0x289')][_0x1f85('0x260')](_0x21e5eb,_0x40bd84,_0x3bc506,_0x4a6d87,_0x3158cc),this[_0x1f85('0x289')][_0x1f85('0x109')](_0x21e5eb+0x1,_0x40bd84+0x1,_0x39d6b6,_0x419b5e,_0x4364f1,_0x58b146);},VisuMZ[_0x1f85('0x9')][_0x1f85('0x55')]=Sprite_StateIcon[_0x1f85('0x23b')][_0x1f85('0x54')],Sprite_StateIcon[_0x1f85('0x23b')][_0x1f85('0x54')]=function(){VisuMZ[_0x1f85('0x9')][_0x1f85('0x55')][_0x1f85('0xe5')](this),this[_0x1f85('0x1a7')]();},Sprite_StateIcon['prototype'][_0x1f85('0x1a7')]=function(){const _0x231ed4=Window_Base[_0x1f85('0x23b')][_0x1f85('0x28a')]();this[_0x1f85('0x7a')]=new Sprite(),this[_0x1f85('0x7a')][_0x1f85('0x289')]=new Bitmap(ImageManager[_0x1f85('0x290')],_0x231ed4),this['_turnDisplaySprite'][_0x1f85('0x1e1')]['x']=this[_0x1f85('0x1e1')]['x'],this[_0x1f85('0x7a')][_0x1f85('0x1e1')]['y']=this[_0x1f85('0x1e1')]['y'],this[_0x1f85('0x159')](this[_0x1f85('0x7a')]),this[_0x1f85('0x188')]=this['_turnDisplaySprite'][_0x1f85('0x289')];},VisuMZ[_0x1f85('0x9')]['Sprite_StateIcon_updateFrame']=Sprite_StateIcon[_0x1f85('0x23b')][_0x1f85('0x1f7')],Sprite_StateIcon[_0x1f85('0x23b')][_0x1f85('0x1f7')]=function(){VisuMZ[_0x1f85('0x9')][_0x1f85('0xb7')][_0x1f85('0xe5')](this),this['updateTurnDisplaySprite']();},Sprite_StateIcon['prototype']['drawText']=function(_0x2d0b07,_0x70f87d,_0x53a2e8,_0x55d5af,_0x4c69ae){this[_0x1f85('0x188')][_0x1f85('0x21d')](_0x2d0b07,_0x70f87d,_0x53a2e8,_0x55d5af,this['contents'][_0x1f85('0xc0')],_0x4c69ae);},Sprite_StateIcon[_0x1f85('0x23b')][_0x1f85('0xca')]=function(){this[_0x1f85('0x61')](),this[_0x1f85('0x188')]['clear']();const _0x47d116=this[_0x1f85('0x273')];if(!_0x47d116)return;const _0x220fe6=_0x47d116['states']()[_0x1f85('0xae')](_0x1c3b43=>_0x1c3b43[_0x1f85('0x7d')]>0x0),_0x542c55=[...Array(0x8)[_0x1f85('0x258')]()]['filter'](_0x330be3=>_0x47d116[_0x1f85('0x1f0')](_0x330be3)!==0x0),_0x190d1a=this['_animationIndex'],_0x496261=_0x220fe6[_0x190d1a];if(_0x496261){if(_0x1f85('0x25')===_0x1f85('0xb5')){function _0x3ea3d6(){_0x3fa0db['prototype'][_0x1f85('0x129')][_0x1f85('0xe5')](this,_0x4052bf,_0x4e6bf1,0x0,0x0),_0x1729ca[_0x1f85('0x23b')][_0x1f85('0x1ea')]['call'](this,_0x43bcfd,_0x894eab,0x0,0x0);}}else Window_Base[_0x1f85('0x23b')][_0x1f85('0x129')][_0x1f85('0xe5')](this,_0x47d116,_0x496261,0x0,0x0),Window_Base[_0x1f85('0x23b')][_0x1f85('0x1ea')][_0x1f85('0xe5')](this,_0x47d116,_0x496261,0x0,0x0);}else{const _0x2261e7=_0x542c55[_0x190d1a-_0x220fe6[_0x1f85('0xac')]];if(!_0x2261e7)return;Window_Base[_0x1f85('0x23b')][_0x1f85('0x119')][_0x1f85('0xe5')](this,_0x47d116,_0x2261e7,0x0,0x0),Window_Base[_0x1f85('0x23b')][_0x1f85('0x1c8')][_0x1f85('0xe5')](this,_0x47d116,_0x2261e7,0x0,0x0);}},Sprite_StateIcon[_0x1f85('0x23b')]['resetFontSettings']=function(){this['contents'][_0x1f85('0x10f')]=$gameSystem[_0x1f85('0x26e')](),this[_0x1f85('0x188')]['fontSize']=$gameSystem[_0x1f85('0xb0')](),this[_0x1f85('0x292')]();},Sprite_StateIcon[_0x1f85('0x23b')][_0x1f85('0x292')]=function(){this[_0x1f85('0xe8')](ColorManager['normalColor']()),this[_0x1f85('0x5b')](ColorManager[_0x1f85('0x192')]());},Sprite_StateIcon[_0x1f85('0x23b')][_0x1f85('0xe8')]=function(_0x428eac){this[_0x1f85('0x188')][_0x1f85('0x150')]=_0x428eac;},Sprite_StateIcon['prototype'][_0x1f85('0x5b')]=function(_0x3b460b){this[_0x1f85('0x188')][_0x1f85('0x192')]=_0x3b460b;},Window_Base[_0x1f85('0x23b')][_0x1f85('0x106')]=function(_0x544c2b,_0x7b84b,_0xa95e16,_0x996d50,_0x327169){const _0x5e7f7c=this[_0x1f85('0x152')](_0x544c2b,_0x7b84b),_0x5c3d65=this[_0x1f85('0xe')](_0x5e7f7c,_0xa95e16,_0x996d50,_0x327169),_0x87d866=_0xa95e16+_0x327169-_0x5c3d65['width'];this[_0x1f85('0x171')](_0x5e7f7c,_0x87d866,_0x996d50,_0x327169),this[_0x1f85('0x61')]();},Window_Base['prototype'][_0x1f85('0x152')]=function(_0x13a6de,_0x2a3358){let _0x157ce1='';for(settings of VisuMZ[_0x1f85('0x9')][_0x1f85('0x244')][_0x1f85('0x42')]){if(!this[_0x1f85('0x16b')](_0x13a6de,_0x2a3358,settings))continue;if(_0x157ce1[_0x1f85('0xac')]>0x0)_0x157ce1+=this[_0x1f85('0x1d3')]();_0x157ce1+=this[_0x1f85('0x2ba')](_0x13a6de,_0x2a3358,settings);}_0x157ce1=this['makeAdditionalSkillCostText'](_0x13a6de,_0x2a3358,_0x157ce1);if(_0x2a3358[_0x1f85('0x17c')][_0x1f85('0x62')](/<CUSTOM COST TEXT>\s*([\s\S]*)\s*<\/CUSTOM COST TEXT>/i)){if('mffTh'===_0x1f85('0x1c0')){if(_0x157ce1[_0x1f85('0xac')]>0x0)_0x157ce1+=this[_0x1f85('0x1d3')]();_0x157ce1+=String(RegExp['$1']);}else{function _0x33af06(){_0x2efb0e[_0x1f85('0x23b')][_0x1f85('0x106')][_0x1f85('0xe5')](this,this[_0x1f85('0x17d')],_0x41b031,_0x4c135a,_0x138e93,_0x3b6e7e);}}}return _0x157ce1;},Window_Base[_0x1f85('0x23b')][_0x1f85('0x1d5')]=function(_0x460ecf,_0x3ee670,_0x5a42ab){return _0x5a42ab;},Window_Base[_0x1f85('0x23b')][_0x1f85('0x16b')]=function(_0x533b2e,_0xc91f52,_0x1f835d){const _0x3adf65=_0x1f835d[_0x1f85('0x1f5')][_0x1f85('0xe5')](_0x533b2e,_0xc91f52);return _0x1f835d[_0x1f85('0x25f')]['call'](_0x533b2e,_0xc91f52,_0x3adf65,_0x1f835d);},Window_Base[_0x1f85('0x23b')][_0x1f85('0x2ba')]=function(_0x536fcf,_0x109c95,_0x55c733){const _0x3ee79a=_0x55c733['CalcJS'][_0x1f85('0xe5')](_0x536fcf,_0x109c95);return _0x55c733[_0x1f85('0x261')]['call'](_0x536fcf,_0x109c95,_0x3ee79a,_0x55c733);},Window_Base[_0x1f85('0x23b')]['skillCostSeparator']=function(){return'\x20';},Window_Base[_0x1f85('0x23b')][_0x1f85('0x1f3')]=function(_0x337ac3,_0x41a4fd,_0x14e5c2,_0x387878){if(!_0x337ac3)return;VisuMZ[_0x1f85('0x9')][_0x1f85('0xb1')][_0x1f85('0xe5')](this,_0x337ac3,_0x41a4fd,_0x14e5c2,_0x387878),this['drawActorIconsAllTurnCounters'](_0x337ac3,_0x41a4fd,_0x14e5c2,_0x387878);},Window_Base[_0x1f85('0x23b')]['drawActorIconsAllTurnCounters']=function(_0x47b0e7,_0x5e51fb,_0x41ba3e,_0x36fd40){_0x36fd40=_0x36fd40||0x90;const _0x2c0a05=ImageManager[_0x1f85('0x290')],_0xe0886f=_0x47b0e7[_0x1f85('0x72')]()[_0x1f85('0x270')](0x0,Math[_0x1f85('0x1b2')](_0x36fd40/_0x2c0a05)),_0x1b27ce=_0x47b0e7[_0x1f85('0x252')]()[_0x1f85('0xae')](_0x4ddbd3=>_0x4ddbd3['iconIndex']>0x0),_0x2a39c7=[...Array(0x8)[_0x1f85('0x258')]()][_0x1f85('0xae')](_0xce7fab=>_0x47b0e7[_0x1f85('0x1f0')](_0xce7fab)!==0x0),_0x126454=[];let _0x4cf00a=_0x5e51fb;for(let _0x3e3408=0x0;_0x3e3408<_0xe0886f['length'];_0x3e3408++){if(_0x1f85('0x139')===_0x1f85('0x139')){this['resetFontSettings']();const _0x643b08=_0x1b27ce[_0x3e3408];if(_0x643b08){if(_0x1f85('0x1fb')===_0x1f85('0x294')){function _0x4d4639(){const _0x1ed8bc=_0x1db9d0[_0x1f85('0xd2')]('['+_0x5af73a['$1'][_0x1f85('0x62')](/\d+/g)+']');for(const _0x5dc8af of _0x1ed8bc){if(_0x4f8f76[_0x1f85('0x1e9')](_0x5dc8af))return![];}return!![];}}else!_0x126454[_0x1f85('0x223')](_0x643b08)&&this['drawActorStateTurns'](_0x47b0e7,_0x643b08,_0x4cf00a,_0x41ba3e),this[_0x1f85('0x1ea')](_0x47b0e7,_0x643b08,_0x4cf00a,_0x41ba3e),_0x126454[_0x1f85('0x20')](_0x643b08);}else{const _0x5ac691=_0x2a39c7[_0x3e3408-_0x1b27ce[_0x1f85('0xac')]];this[_0x1f85('0x119')](_0x47b0e7,_0x5ac691,_0x4cf00a,_0x41ba3e),this[_0x1f85('0x1c8')](_0x47b0e7,_0x5ac691,_0x4cf00a,_0x41ba3e);}_0x4cf00a+=_0x2c0a05;}else{function _0x22b12e(){return![];}}}},Window_Base[_0x1f85('0x23b')][_0x1f85('0x129')]=function(_0x98d317,_0x58cd87,_0x3343cb,_0x4055e2){if(!VisuMZ[_0x1f85('0x9')][_0x1f85('0x244')][_0x1f85('0x22b')][_0x1f85('0x1db')])return;if(!_0x98d317[_0x1f85('0x17b')](_0x58cd87['id']))return;if(_0x58cd87[_0x1f85('0x26c')]===0x0)return;if(_0x58cd87[_0x1f85('0x17c')]['match'](/<HIDE STATE TURNS>/i))return;const _0x458466=_0x98d317[_0x1f85('0x155')](_0x58cd87['id']),_0x3c4863=ImageManager[_0x1f85('0x290')],_0x235d70=ColorManager[_0x1f85('0x69')](_0x58cd87);this[_0x1f85('0xe8')](_0x235d70),this[_0x1f85('0x5b')](_0x1f85('0x178')),this[_0x1f85('0x188')]['fontBold']=!![],this[_0x1f85('0x188')][_0x1f85('0x99')]=VisuMZ[_0x1f85('0x9')]['Settings'][_0x1f85('0x22b')][_0x1f85('0xa1')],_0x3343cb+=VisuMZ['SkillsStatesCore'][_0x1f85('0x244')][_0x1f85('0x22b')][_0x1f85('0x1e7')],_0x4055e2+=VisuMZ[_0x1f85('0x9')][_0x1f85('0x244')][_0x1f85('0x22b')]['TurnOffsetY'],this[_0x1f85('0x21d')](_0x458466,_0x3343cb,_0x4055e2,_0x3c4863,_0x1f85('0x14c')),this[_0x1f85('0x188')][_0x1f85('0x10b')]=![],this[_0x1f85('0x61')]();},Window_Base['prototype'][_0x1f85('0x1ea')]=function(_0x4ec982,_0x1dddff,_0x105f2b,_0x5ece03){if(!VisuMZ[_0x1f85('0x9')][_0x1f85('0x244')][_0x1f85('0x22b')]['ShowData'])return;const _0x3f838b=ImageManager[_0x1f85('0x290')],_0x1bcb75=ImageManager['iconHeight']/0x2,_0x4a0542=ColorManager['normalColor']();this[_0x1f85('0xe8')](_0x4a0542),this[_0x1f85('0x5b')](_0x1f85('0x178')),this[_0x1f85('0x188')][_0x1f85('0x10b')]=!![],this[_0x1f85('0x188')][_0x1f85('0x99')]=VisuMZ[_0x1f85('0x9')][_0x1f85('0x244')][_0x1f85('0x22b')][_0x1f85('0x24f')],_0x105f2b+=VisuMZ[_0x1f85('0x9')][_0x1f85('0x244')]['States']['DataOffsetX'],_0x5ece03+=VisuMZ[_0x1f85('0x9')][_0x1f85('0x244')][_0x1f85('0x22b')]['DataOffsetY'];const _0x5bc47c=String(_0x4ec982['getStateDisplay'](_0x1dddff['id']));this[_0x1f85('0x21d')](_0x5bc47c,_0x105f2b,_0x5ece03,_0x3f838b,_0x1f85('0x2b8')),this[_0x1f85('0x188')][_0x1f85('0x10b')]=![],this['resetFontSettings']();},Window_Base[_0x1f85('0x23b')][_0x1f85('0x119')]=function(_0x18fbbc,_0x2b14f8,_0x3a98df,_0x2404f9){if(!VisuMZ[_0x1f85('0x9')]['Settings'][_0x1f85('0x229')][_0x1f85('0x1db')])return;const _0x5763b2=_0x18fbbc['buff'](_0x2b14f8);if(_0x5763b2===0x0)return;const _0x5ca665=_0x18fbbc['buffTurns'](_0x2b14f8),_0xde2ba3=ImageManager[_0x1f85('0x290')],_0x2531a4=_0x5763b2>0x0?ColorManager['buffColor']():ColorManager[_0x1f85('0x20e')]();this[_0x1f85('0xe8')](_0x2531a4),this[_0x1f85('0x5b')](_0x1f85('0x178')),this[_0x1f85('0x188')][_0x1f85('0x10b')]=!![],this[_0x1f85('0x188')][_0x1f85('0x99')]=VisuMZ['SkillsStatesCore'][_0x1f85('0x244')][_0x1f85('0x229')][_0x1f85('0xa1')],_0x3a98df+=VisuMZ[_0x1f85('0x9')][_0x1f85('0x244')][_0x1f85('0x229')][_0x1f85('0x1e7')],_0x2404f9+=VisuMZ[_0x1f85('0x9')][_0x1f85('0x244')][_0x1f85('0x229')][_0x1f85('0x12f')],this[_0x1f85('0x21d')](_0x5ca665,_0x3a98df,_0x2404f9,_0xde2ba3,_0x1f85('0x14c')),this[_0x1f85('0x188')][_0x1f85('0x10b')]=![],this['resetFontSettings']();},Window_Base[_0x1f85('0x23b')][_0x1f85('0x1c8')]=function(_0x5d6773,_0x58fc4a,_0x3c5530,_0x193084){if(!VisuMZ[_0x1f85('0x9')][_0x1f85('0x244')][_0x1f85('0x229')]['ShowData'])return;const _0x107e6e=_0x5d6773[_0x1f85('0x81')](_0x58fc4a),_0x346343=_0x5d6773[_0x1f85('0x1f0')](_0x58fc4a),_0x287d4d=ImageManager[_0x1f85('0x290')],_0xe6b707=ImageManager[_0x1f85('0x63')]/0x2,_0x15a18b=_0x346343>0x0?ColorManager[_0x1f85('0x198')]():ColorManager[_0x1f85('0x20e')]();this['changeTextColor'](_0x15a18b),this[_0x1f85('0x5b')](_0x1f85('0x178')),this[_0x1f85('0x188')][_0x1f85('0x10b')]=!![],this[_0x1f85('0x188')][_0x1f85('0x99')]=VisuMZ[_0x1f85('0x9')][_0x1f85('0x244')]['Buffs'][_0x1f85('0x24f')],_0x3c5530+=VisuMZ[_0x1f85('0x9')]['Settings'][_0x1f85('0x229')]['DataOffsetX'],_0x193084+=VisuMZ[_0x1f85('0x9')][_0x1f85('0x244')]['Buffs'][_0x1f85('0x24a')];const _0x1256cb=_0x1f85('0x65')['format'](Math[_0x1f85('0x46')](_0x107e6e*0x64));this['drawText'](_0x1256cb,_0x3c5530,_0x193084,_0x287d4d,_0x1f85('0x2b8')),this[_0x1f85('0x188')]['fontBold']=![],this[_0x1f85('0x61')]();},VisuMZ[_0x1f85('0x9')]['Window_StatusBase_placeGauge']=Window_StatusBase[_0x1f85('0x23b')][_0x1f85('0xe7')],Window_StatusBase[_0x1f85('0x23b')]['placeGauge']=function(_0x235429,_0x1f558d,_0x12234f,_0xe44cd){if(_0x235429[_0x1f85('0x59')]())_0x1f558d=this[_0x1f85('0x4d')](_0x235429,_0x1f558d);this[_0x1f85('0x1ff')](_0x235429,_0x1f558d,_0x12234f,_0xe44cd);},Window_StatusBase[_0x1f85('0x23b')][_0x1f85('0x1ff')]=function(_0x222f9d,_0x38dd6a,_0x351304,_0x80e554){if([_0x1f85('0x2a9'),_0x1f85('0xb9')][_0x1f85('0x223')](_0x38dd6a[_0x1f85('0xfa')]()))return;VisuMZ[_0x1f85('0x9')][_0x1f85('0xaf')][_0x1f85('0xe5')](this,_0x222f9d,_0x38dd6a,_0x351304,_0x80e554);},Window_StatusBase[_0x1f85('0x23b')]['convertGaugeTypeSkillsStatesCore']=function(_0x6a0d0a,_0x4f2229){const _0x27bb5c=_0x6a0d0a[_0x1f85('0x3b')]()[_0x1f85('0x17c')];if(_0x4f2229==='hp'&&_0x27bb5c[_0x1f85('0x62')](/<REPLACE HP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x4f2229==='mp'&&_0x27bb5c[_0x1f85('0x62')](/<REPLACE MP GAUGE:[ ](.*)>/i)){if(_0x1f85('0x182')===_0x1f85('0x182'))return String(RegExp['$1']);else{function _0x51469c(){return this[_0x1f85('0x114')]();}}}else{if(_0x4f2229==='tp'&&_0x27bb5c['match'](/<REPLACE TP GAUGE:[ ](.*)>/i)){if(_0x1f85('0x125')==='GlCxh')return String(RegExp['$1']);else{function _0x124286(){_0x4282f0[_0x1f85('0x23b')][_0x1f85('0xcc')][_0x1f85('0xe5')](this);const _0x1bd73d=_0x2b1133[_0x1f85('0x9')][_0x1f85('0x244')][_0x1f85('0x86')][_0x1f85('0x16')];this[_0x1f85('0x238')][_0x1f85('0x22d')]=this[_0x1f85('0x238')][_0x1f85('0x22d')][_0x1f85('0x23c')](_0x1bd73d);}}}else{if(_0x1f85('0x15d')!==_0x1f85('0x15d')){function _0x4ef629(){this[_0x1f85('0xba')][_0x4b19bd]=_0x1f85('0x13e')[_0x1f85('0xfd')](_0x2d3399(_0x12b872['$1']));}}else return _0x4f2229;}}}},VisuMZ['SkillsStatesCore'][_0x1f85('0xb1')]=Window_StatusBase['prototype'][_0x1f85('0x1f3')],Window_StatusBase[_0x1f85('0x23b')][_0x1f85('0x1f3')]=function(_0x35a256,_0x132b2,_0x1707ac,_0x241910){if(!_0x35a256)return;Window_Base[_0x1f85('0x23b')][_0x1f85('0x1f3')][_0x1f85('0xe5')](this,_0x35a256,_0x132b2,_0x1707ac,_0x241910);},VisuMZ[_0x1f85('0x9')]['Window_SkillType_initialize']=Window_SkillType[_0x1f85('0x23b')][_0x1f85('0x1ed')],Window_SkillType[_0x1f85('0x23b')][_0x1f85('0x1ed')]=function(_0xd4aee7){VisuMZ[_0x1f85('0x9')][_0x1f85('0x193')]['call'](this,_0xd4aee7),this[_0x1f85('0x74')](_0xd4aee7);},Window_SkillType[_0x1f85('0x23b')]['createCommandNameWindow']=function(_0x44f140){const _0x5d8688=new Rectangle(0x0,0x0,_0x44f140[_0x1f85('0x13d')],_0x44f140[_0x1f85('0xc0')]);this[_0x1f85('0xcf')]=new Window_Base(_0x5d8688),this[_0x1f85('0xcf')][_0x1f85('0x18b')]=0x0,this['addChild'](this['_commandNameWindow']),this['updateCommandNameWindow']();},Window_SkillType[_0x1f85('0x23b')][_0x1f85('0x9a')]=function(){Window_Command[_0x1f85('0x23b')][_0x1f85('0x9a')][_0x1f85('0xe5')](this);if(this[_0x1f85('0xcf')])this[_0x1f85('0x1d8')]();},Window_SkillType[_0x1f85('0x23b')]['updateCommandNameWindow']=function(){const _0x41924e=this[_0x1f85('0xcf')];_0x41924e['contents'][_0x1f85('0x2c')]();const _0x238a7f=this[_0x1f85('0x29')](this[_0x1f85('0x28f')]());if(_0x238a7f===_0x1f85('0x18f')&&this[_0x1f85('0x7c')]()>0x0){const _0x1a2c98=this['itemLineRect'](this[_0x1f85('0x28f')]());let _0x5da31f=this[_0x1f85('0xed')](this[_0x1f85('0x28f')]());_0x5da31f=_0x5da31f[_0x1f85('0x149')](/\\I\[(\d+)\]/gi,''),_0x41924e[_0x1f85('0x61')](),this[_0x1f85('0x135')](_0x5da31f,_0x1a2c98),this[_0x1f85('0xe1')](_0x5da31f,_0x1a2c98),this[_0x1f85('0x16f')](_0x5da31f,_0x1a2c98);}},Window_SkillType['prototype'][_0x1f85('0x135')]=function(_0x417e53,_0x28487b){},Window_SkillType[_0x1f85('0x23b')][_0x1f85('0xe1')]=function(_0x9c40d0,_0x1e74b3){const _0x1bcdf0=this[_0x1f85('0xcf')];_0x1bcdf0[_0x1f85('0x21d')](_0x9c40d0,0x0,_0x1e74b3['y'],_0x1bcdf0['innerWidth'],_0x1f85('0x2b8'));},Window_SkillType[_0x1f85('0x23b')][_0x1f85('0x16f')]=function(_0x5b544a,_0x358475){const _0x107eb9=this[_0x1f85('0xcf')],_0x24990c=$gameSystem['windowPadding'](),_0x4c09be=_0x358475['x']+Math[_0x1f85('0x1b2')](_0x358475['width']/0x2)+_0x24990c;_0x107eb9['x']=_0x107eb9[_0x1f85('0x13d')]/-0x2+_0x4c09be,_0x107eb9['y']=Math[_0x1f85('0x1b2')](_0x358475[_0x1f85('0xc0')]/0x2);},Window_SkillType['prototype'][_0x1f85('0x1a1')]=function(){return Imported[_0x1f85('0x28d')]&&Window_Command['prototype'][_0x1f85('0x1a1')][_0x1f85('0xe5')](this);},Window_SkillType[_0x1f85('0x23b')][_0x1f85('0x1fd')]=function(){if(!this[_0x1f85('0x17d')])return;const _0x11a7d2=this[_0x1f85('0x17d')][_0x1f85('0x255')]();for(const _0x466121 of _0x11a7d2){const _0x28b773=this[_0x1f85('0x95')](_0x466121);this[_0x1f85('0x1b5')](_0x28b773,_0x1f85('0x123'),!![],_0x466121);}},Window_SkillType[_0x1f85('0x23b')]['makeCommandName']=function(_0x10005d){let _0x15ed08=$dataSystem[_0x1f85('0x255')][_0x10005d];if(_0x15ed08[_0x1f85('0x62')](/\\I\[(\d+)\]/i))return _0x15ed08;if(this[_0x1f85('0x228')]()===_0x1f85('0x1ae'))return _0x15ed08;const _0x5c19d7=VisuMZ[_0x1f85('0x9')]['Settings'][_0x1f85('0x5d')],_0x2325f7=$dataSystem['magicSkills'][_0x1f85('0x223')](_0x10005d),_0x4960d8=_0x2325f7?_0x5c19d7[_0x1f85('0x2f')]:_0x5c19d7[_0x1f85('0x20c')];return'\x5cI[%1]%2'['format'](_0x4960d8,_0x15ed08);},Window_SkillType[_0x1f85('0x23b')][_0x1f85('0x265')]=function(){return VisuMZ[_0x1f85('0x9')]['Settings']['Skills'][_0x1f85('0x19')];},Window_SkillType[_0x1f85('0x23b')][_0x1f85('0x3')]=function(_0x3cf8e7){const _0x31355e=this[_0x1f85('0x29')](_0x3cf8e7);if(_0x31355e===_0x1f85('0x175'))this[_0x1f85('0x1f6')](_0x3cf8e7);else _0x31355e==='icon'?this[_0x1f85('0x0')](_0x3cf8e7):Window_Command['prototype'][_0x1f85('0x3')][_0x1f85('0xe5')](this,_0x3cf8e7);},Window_SkillType[_0x1f85('0x23b')][_0x1f85('0x228')]=function(){return VisuMZ['SkillsStatesCore'][_0x1f85('0x244')][_0x1f85('0x5d')][_0x1f85('0x1b9')];},Window_SkillType['prototype'][_0x1f85('0x29')]=function(_0x1a6551){if(_0x1a6551<0x0)return _0x1f85('0x1ae');const _0x38a089=this[_0x1f85('0x228')]();if(_0x38a089!==_0x1f85('0x112')){if(_0x1f85('0x169')===_0x1f85('0x169'))return _0x38a089;else{function _0x6873ff(){for(const _0x34580b of this[_0x1f85('0x252')]()){this[_0x1f85('0x1bc')](_0x34580b['id'])&&_0x34580b[_0x1f85('0x26c')]===_0x120a28&&(this['removeState'](_0x34580b['id']),this[_0x1f85('0x2a5')](_0x34580b['id']),this[_0x1f85('0x3c')](_0x34580b['id']));}}}}else{if(this[_0x1f85('0x7c')]()>0x0){const _0x46b239=this[_0x1f85('0xed')](_0x1a6551);if(_0x46b239[_0x1f85('0x62')](/\\I\[(\d+)\]/i)){const _0x2845a6=this[_0x1f85('0x9b')](_0x1a6551),_0x59fee4=this[_0x1f85('0xe')](_0x46b239)[_0x1f85('0x13d')];if(_0x59fee4<=_0x2845a6['width'])return _0x1f85('0x175');else{if(_0x1f85('0x8f')===_0x1f85('0x2bb')){function _0xba813e(){_0x5e6a91[_0x1f85('0xc4')][_0x1f85('0x20')](_0x1f85('0x141'));}}else return _0x1f85('0x18f');}}}}return _0x1f85('0x1ae');},Window_SkillType[_0x1f85('0x23b')][_0x1f85('0x1f6')]=function(_0x5e53f5){const _0x3c688b=this[_0x1f85('0x9b')](_0x5e53f5),_0x303c3d=this[_0x1f85('0xed')](_0x5e53f5),_0x75ebf2=this[_0x1f85('0xe')](_0x303c3d)[_0x1f85('0x13d')];this[_0x1f85('0x122')](this['isCommandEnabled'](_0x5e53f5));const _0x2b26cc=this[_0x1f85('0x265')]();if(_0x2b26cc===_0x1f85('0x14c')){if(_0x1f85('0x17f')!==_0x1f85('0x1f'))this['drawTextEx'](_0x303c3d,_0x3c688b['x']+_0x3c688b['width']-_0x75ebf2,_0x3c688b['y'],_0x75ebf2);else{function _0x1d38f1(){const _0x539410=_0x5c0d8d['SkillsStatesCore'][_0x1f85('0x33')]['call'](this);return this[_0x1f85('0x1bb')]()&&this[_0x1f85('0xf0')]()&&(_0x539410['width']-=this[_0x1f85('0xfc')]()),_0x539410;}}}else{if(_0x2b26cc===_0x1f85('0x2b8')){if(_0x1f85('0x103')==='NoWKk'){function _0x4ae43c(){_0x5b60b6[_0x1f85('0x23b')][_0x1f85('0x14a')]['call'](this,_0x4540a2),this[_0x1f85('0x242')](_0x37976e);}}else{const _0xe325f=_0x3c688b['x']+Math[_0x1f85('0x1b2')]((_0x3c688b[_0x1f85('0x13d')]-_0x75ebf2)/0x2);this['drawTextEx'](_0x303c3d,_0xe325f,_0x3c688b['y'],_0x75ebf2);}}else{if(_0x1f85('0xf5')!=='xudty'){function _0x3823d3(){_0x2dd325[_0x43734d][_0x17af92][_0x1f85('0xe5')](this,_0x3fa49d);}}else this['drawTextEx'](_0x303c3d,_0x3c688b['x'],_0x3c688b['y'],_0x75ebf2);}}},Window_SkillType[_0x1f85('0x23b')][_0x1f85('0x0')]=function(_0x390a02){this[_0x1f85('0xed')](_0x390a02)[_0x1f85('0x62')](/\\I\[(\d+)\]/i);const _0x8ed1b4=Number(RegExp['$1'])||0x0,_0x391d06=this[_0x1f85('0x9b')](_0x390a02),_0x366073=_0x391d06['x']+Math['floor']((_0x391d06[_0x1f85('0x13d')]-ImageManager[_0x1f85('0x290')])/0x2),_0x451e41=_0x391d06['y']+(_0x391d06[_0x1f85('0xc0')]-ImageManager[_0x1f85('0x63')])/0x2;this[_0x1f85('0x15')](_0x8ed1b4,_0x366073,_0x451e41);},VisuMZ[_0x1f85('0x9')][_0x1f85('0x1a8')]=Window_SkillStatus[_0x1f85('0x23b')][_0x1f85('0x4')],Window_SkillStatus[_0x1f85('0x23b')][_0x1f85('0x4')]=function(){VisuMZ['SkillsStatesCore'][_0x1f85('0x1a8')][_0x1f85('0xe5')](this);if(this[_0x1f85('0x17d')])this[_0x1f85('0x82')]();},Window_SkillStatus[_0x1f85('0x23b')][_0x1f85('0x82')]=function(){if(!Imported[_0x1f85('0x28d')])return;if(!Imported[_0x1f85('0x7b')])return;const _0x27778e=this[_0x1f85('0x1ad')]();let _0xcb0150=this['colSpacing']()/0x2+0xb4+0xb4+0xb4,_0x22a588=this['innerWidth']-_0xcb0150-0x2;if(_0x22a588>=0x12c){if(_0x1f85('0x274')===_0x1f85('0x274')){const _0x25cdee=VisuMZ[_0x1f85('0x2a0')]['Settings'][_0x1f85('0x1f8')][_0x1f85('0x27')],_0x89c610=Math['floor'](_0x22a588/0x2)-0x18;let _0xf318ce=_0xcb0150,_0x2493ac=Math['floor']((this[_0x1f85('0xd7')]-Math[_0x1f85('0x51')](_0x25cdee[_0x1f85('0xac')]/0x2)*_0x27778e)/0x2),_0x21574a=0x0;for(const _0x381bd7 of _0x25cdee){if(_0x1f85('0x27b')===_0x1f85('0x4c')){function _0x15f49c(){if(!_0x18e14b[_0x1f85('0x1e9')](_0x5d6b1e))return![];}}else{this[_0x1f85('0x2a')](_0xf318ce,_0x2493ac,_0x89c610,_0x381bd7),_0x21574a++;if(_0x21574a%0x2===0x0){if(_0x1f85('0x30')===_0x1f85('0x251')){function _0x2b4b3b(){this[_0x1f85('0xce')]['setItem'](this[_0x1f85('0x21')]());}}else _0xf318ce=_0xcb0150,_0x2493ac+=_0x27778e;}else _0xf318ce+=_0x89c610+0x18;}}}else{function _0x2e237f(){_0x759f29[_0x1f85('0x19c')](_0x397639,_0x313b37),this['makeSuccess'](_0x1cbc43);}}}this[_0x1f85('0x61')]();},Window_SkillStatus[_0x1f85('0x23b')][_0x1f85('0x2a')]=function(_0x3b3d4a,_0x3a3e11,_0x1d3393,_0x3f45f1){const _0x12419a=this[_0x1f85('0x1ad')]();this[_0x1f85('0x61')](),this[_0x1f85('0x140')](_0x3b3d4a,_0x3a3e11,_0x1d3393,_0x3f45f1,!![]),this[_0x1f85('0x292')](),this[_0x1f85('0x188')][_0x1f85('0x99')]-=0x8;const _0x2f1f44=this['_actor'][_0x1f85('0x277')](_0x3f45f1,!![]);this[_0x1f85('0x188')][_0x1f85('0x21d')](_0x2f1f44,_0x3b3d4a,_0x3a3e11,_0x1d3393,_0x12419a,_0x1f85('0x14c'));},VisuMZ[_0x1f85('0x9')][_0x1f85('0x79')]=Window_SkillList[_0x1f85('0x23b')][_0x1f85('0x223')],Window_SkillList[_0x1f85('0x23b')][_0x1f85('0x223')]=function(_0xd613aa){return this[_0x1f85('0x128')](_0xd613aa);},VisuMZ[_0x1f85('0x9')][_0x1f85('0x268')]=Window_SkillList[_0x1f85('0x23b')][_0x1f85('0x1dd')],Window_SkillList[_0x1f85('0x23b')][_0x1f85('0x1dd')]=function(){if(SceneManager[_0x1f85('0x12d')][_0x1f85('0xdd')]===Scene_Battle){if(_0x1f85('0x1b8')===_0x1f85('0x1b8'))return VisuMZ[_0x1f85('0x9')][_0x1f85('0x268')][_0x1f85('0xe5')](this);else{function _0x12967b(){if(!_0x17b563)return;_0xecbaf0[_0x1f85('0x9')][_0x1f85('0xb1')][_0x1f85('0xe5')](this,_0x36267b,_0x34b215,_0x48ed4e,_0x841655),this[_0x1f85('0x1ce')](_0x49b679,_0x15ae69,_0x44f35e,_0x2eb06e);}}}else return VisuMZ[_0x1f85('0x9')][_0x1f85('0x244')][_0x1f85('0x5d')][_0x1f85('0x80')];},VisuMZ[_0x1f85('0x9')][_0x1f85('0x20a')]=Window_SkillList[_0x1f85('0x23b')][_0x1f85('0x1d9')],Window_SkillList[_0x1f85('0x23b')]['setActor']=function(_0x2cbb70){const _0x35e1c6=this['_actor']!==_0x2cbb70;VisuMZ[_0x1f85('0x9')]['Window_SkillList_setActor']['call'](this,_0x2cbb70);if(_0x35e1c6){if(_0x1f85('0x58')===_0x1f85('0x58'))this[_0x1f85('0xce')]&&this[_0x1f85('0xce')][_0x1f85('0xdd')]===Window_ShopStatus&&this[_0x1f85('0xce')][_0x1f85('0x215')](this['itemAt'](0x0));else{function _0x3d10ed(){return this[_0x1f85('0x26')]()?this[_0x1f85('0x6a')]():_0x5746cb[_0x1f85('0x9')][_0x1f85('0x1b0')][_0x1f85('0xe5')](this);}}}},Window_SkillList['prototype'][_0x1f85('0x1b7')]=function(_0x25b7a9){if(this[_0x1f85('0xd0')]===_0x25b7a9)return;this['_stypeId']=_0x25b7a9,this[_0x1f85('0x4')](),this[_0x1f85('0x37')](0x0,0x0);if(this[_0x1f85('0xce')]&&this[_0x1f85('0xce')]['constructor']===Window_ShopStatus){if(_0x1f85('0x293')!==_0x1f85('0x237'))this[_0x1f85('0xce')][_0x1f85('0x215')](this[_0x1f85('0x195')](0x0));else{function _0x4a6fd3(){const _0x7ac695=_0x1f85('0x21e');this[_0x1f85('0xba')]=this[_0x1f85('0xba')]||{};if(this[_0x1f85('0xba')][_0x7ac695])return this[_0x1f85('0xba')][_0x7ac695];const _0x30d90f=_0x3c2088['SkillsStatesCore']['Settings'][_0x1f85('0x229')]['ColorDebuff'];return this[_0x1f85('0x25c')](_0x7ac695,_0x30d90f);}}}},Window_SkillList[_0x1f85('0x23b')][_0x1f85('0x128')]=function(_0x2a9c2f){if(!_0x2a9c2f)return VisuMZ['SkillsStatesCore'][_0x1f85('0x79')][_0x1f85('0xe5')](this,_0x2a9c2f);if(!this[_0x1f85('0xf9')](_0x2a9c2f))return![];if(!this[_0x1f85('0x2ac')](_0x2a9c2f))return![];if(!this[_0x1f85('0x27d')](_0x2a9c2f))return![];return!![];},Window_SkillList[_0x1f85('0x23b')][_0x1f85('0xf9')]=function(_0x3216d5){return DataManager['getSkillTypes'](_0x3216d5)[_0x1f85('0x223')](this['_stypeId']);},Window_SkillList[_0x1f85('0x23b')][_0x1f85('0x2ac')]=function(_0x2e4d5e){if(!this[_0x1f85('0xf6')](_0x2e4d5e))return![];if(!this[_0x1f85('0x97')](_0x2e4d5e))return![];if(!this[_0x1f85('0x17')](_0x2e4d5e))return![];return!![];},Window_SkillList[_0x1f85('0x23b')]['checkShowHideBattleNotetags']=function(_0x287525){const _0xc2b34a=_0x287525[_0x1f85('0x17c')];if(_0xc2b34a[_0x1f85('0x62')](/<HIDE IN BATTLE>/i)&&$gameParty[_0x1f85('0x279')]())return![];else return _0xc2b34a[_0x1f85('0x62')](/<HIDE OUTSIDE BATTLE>/i)&&!$gameParty[_0x1f85('0x279')]()?![]:!![];},Window_SkillList[_0x1f85('0x23b')][_0x1f85('0x97')]=function(_0x10679c){const _0x2ea9c4=_0x10679c[_0x1f85('0x17c')];if(_0x2ea9c4[_0x1f85('0x62')](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x11aed6=JSON[_0x1f85('0xd2')]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x4751bd of _0x11aed6){if(!$gameSwitches[_0x1f85('0x1e9')](_0x4751bd))return![];}return!![];}if(_0x2ea9c4[_0x1f85('0x62')](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1f85('0x68')===_0x1f85('0x158')){function _0x34f255(){const _0xc4e8ed=_0x6a3a91[_0x1f85('0x197')](',');for(const _0x1144c8 of _0xc4e8ed){const _0x29a697=_0x4d172b[_0x1f85('0x2')](_0x1144c8);if(_0x29a697)this[_0x1f85('0x238')][_0x1f85('0x22d')][_0x1f85('0x20')](_0x29a697);}}}else{const _0x1a7329=JSON[_0x1f85('0xd2')]('['+RegExp['$1'][_0x1f85('0x62')](/\d+/g)+']');for(const _0x18b2ba of _0x1a7329){if(!$gameSwitches['value'](_0x18b2ba))return![];}return!![];}}if(_0x2ea9c4[_0x1f85('0x62')](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x423192=JSON[_0x1f85('0xd2')]('['+RegExp['$1'][_0x1f85('0x62')](/\d+/g)+']');for(const _0x56fb74 of _0x423192){if($gameSwitches[_0x1f85('0x1e9')](_0x56fb74))return!![];}return![];}if(_0x2ea9c4[_0x1f85('0x62')](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x40b423=JSON['parse']('['+RegExp['$1'][_0x1f85('0x62')](/\d+/g)+']');for(const _0x2af943 of _0x40b423){if(_0x1f85('0x4f')===_0x1f85('0x4f')){if(!$gameSwitches[_0x1f85('0x1e9')](_0x2af943))return!![];}else{function _0x290ec9(){for(const _0x2d3ce3 of _0x41babf){let _0x176744=0x0,_0x871b41=0x0;if(_0x2d3ce3[_0x1f85('0x62')](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i))_0x176744=_0xc84f6c(_0x4874d1['$1']),_0x871b41=_0x415760(_0x2e4283['$2']);else _0x2d3ce3[_0x1f85('0x62')](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)&&(_0x176744=_0x327787['getStateIdWithName'](_0x203c2a['$1']),_0x871b41=_0xfaa8a(_0x71538['$2']));_0x6d5792['addStateTurns'](_0x176744,_0x871b41),this[_0x1f85('0x272')](_0x109a43);}}}}return![];}if(_0x2ea9c4[_0x1f85('0x62')](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('eBcGW'===_0x1f85('0x102')){const _0x5e5caa=JSON[_0x1f85('0xd2')]('['+RegExp['$1'][_0x1f85('0x62')](/\d+/g)+']');for(const _0x10075c of _0x5e5caa){if(_0x1f85('0x12e')==='dnRCg'){if(!$gameSwitches[_0x1f85('0x1e9')](_0x10075c))return!![];}else{function _0x2d671e(){const _0x778df9=_0x4f1c67['parse']('['+_0xae95c['$1'][_0x1f85('0x62')](/\d+/g)+']');for(const _0x196d72 of _0x778df9){if(!_0x2a8c48[_0x1f85('0x1e9')](_0x196d72))return!![];}return![];}}}return![];}else{function _0x30b2de(){const _0xb18fff=this['_commandNameWindow'],_0x44e10a=_0x2299ba['windowPadding'](),_0x333522=_0x50880b['x']+_0x420cdf[_0x1f85('0x1b2')](_0x4f148a[_0x1f85('0x13d')]/0x2)+_0x44e10a;_0xb18fff['x']=_0xb18fff[_0x1f85('0x13d')]/-0x2+_0x333522,_0xb18fff['y']=_0x2d6f9a[_0x1f85('0x1b2')](_0x1128b3[_0x1f85('0xc0')]/0x2);}}}if(_0x2ea9c4['match'](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5e532c=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x5beb4f of _0x5e532c){if($gameSwitches[_0x1f85('0x1e9')](_0x5beb4f))return![];}return!![];}return!![];},Window_SkillList['prototype'][_0x1f85('0x17')]=function(_0x218b21){const _0x535c2f=_0x218b21[_0x1f85('0x17c')];if(_0x535c2f[_0x1f85('0x62')](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xd2da74=JSON[_0x1f85('0xd2')]('['+RegExp['$1'][_0x1f85('0x62')](/\d+/g)+']');for(const _0x366a9f of _0xd2da74){if(!this[_0x1f85('0x17d')][_0x1f85('0xa9')](_0x366a9f))return![];}return!![];}else{if(_0x535c2f[_0x1f85('0x62')](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if('EKUNI'===_0x1f85('0x206')){function _0x56639a(){_0x4791dc[_0x1f85('0x9')][_0x1f85('0x8a')]['call'](this),this[_0x1f85('0x92')]=null;}}else{const _0x444dcd=RegExp['$1'][_0x1f85('0x197')](',');for(const _0x9b844e of _0x444dcd){const _0x46d4e6=DataManager['getSkillIdWithName'](_0x46d4e6);if(!_0x46d4e6)continue;if(!this[_0x1f85('0x17d')]['isLearnedSkill'](_0x46d4e6))return![];}return!![];}}}if(_0x535c2f[_0x1f85('0x62')](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4bb155=JSON[_0x1f85('0xd2')]('['+RegExp['$1'][_0x1f85('0x62')](/\d+/g)+']');for(const _0x5525c2 of _0x4bb155){if(!this['_actor'][_0x1f85('0xa9')](_0x5525c2))return![];}return!![];}else{if(_0x535c2f[_0x1f85('0x62')](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x245193=RegExp['$1']['split'](',');for(const _0x5699bb of _0x245193){const _0x893a99=DataManager['getSkillIdWithName'](_0x893a99);if(!_0x893a99)continue;if(!this[_0x1f85('0x17d')][_0x1f85('0xa9')](_0x893a99))return![];}return!![];}}if(_0x535c2f['match'](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x334205=JSON[_0x1f85('0xd2')]('['+RegExp['$1'][_0x1f85('0x62')](/\d+/g)+']');for(const _0x315ae4 of _0x334205){if('NejSg'!=='LDTAi'){if(this[_0x1f85('0x17d')][_0x1f85('0xa9')](_0x315ae4))return!![];}else{function _0x2b9eed(){if(!_0x1b1c6a[_0x1f85('0x1e9')](_0x4b9a4f))return![];}}}return![];}else{if(_0x535c2f['match'](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x5774da=RegExp['$1']['split'](',');for(const _0x641766 of _0x5774da){if(_0x1f85('0x66')==='uDSjr'){const _0x25bbfa=DataManager['getSkillIdWithName'](_0x25bbfa);if(!_0x25bbfa)continue;if(this[_0x1f85('0x17d')][_0x1f85('0xa9')](_0x25bbfa))return!![];}else{function _0x502d54(){this['setupSkillsStatesCore'](_0x699edf,_0x4fbbc7),_0x3abc19=_0x3ac5d9[_0x1f85('0xfa')](),_0x4a76e6[_0x1f85('0x9')][_0x1f85('0x6c')][_0x1f85('0xe5')](this,_0x4c161e,_0x2336d6);}}}return![];}}if(_0x535c2f[_0x1f85('0x62')](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4debf0=JSON[_0x1f85('0xd2')]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0xb3ac9c of _0x4debf0){if(!this[_0x1f85('0x17d')]['isLearnedSkill'](_0xb3ac9c))return!![];}return![];}else{if(_0x535c2f[_0x1f85('0x62')](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x36f2e8=RegExp['$1'][_0x1f85('0x197')](',');for(const _0x327069 of _0x36f2e8){const _0xcd14b4=DataManager[_0x1f85('0x38')](_0xcd14b4);if(!_0xcd14b4)continue;if(!this['_actor'][_0x1f85('0xa9')](_0xcd14b4))return!![];}return![];}}if(_0x535c2f['match'](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1f85('0x1a2')!==_0x1f85('0x1a2')){function _0x141d87(){return _0x5410bb[_0x1f85('0x23b')]['statusWidth']();}}else{const _0x1e66af=JSON['parse']('['+RegExp['$1'][_0x1f85('0x62')](/\d+/g)+']');for(const _0x30e8e2 of _0x1e66af){if(!this[_0x1f85('0x17d')][_0x1f85('0xa9')](_0x30e8e2))return!![];}return![];}}else{if(_0x535c2f[_0x1f85('0x62')](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x1f85('0x1b4')!==_0x1f85('0x9f')){const _0x4e7126=RegExp['$1'][_0x1f85('0x197')](',');for(const _0x347ea3 of _0x4e7126){const _0x42f43d=DataManager[_0x1f85('0x38')](_0x42f43d);if(!_0x42f43d)continue;if(!this[_0x1f85('0x17d')]['isLearnedSkill'](_0x42f43d))return!![];}return![];}else{function _0x2091d5(){if(!this['_actor'])return;const _0x514ec2=this['_actor']['skillTypes']();for(const _0x525c91 of _0x514ec2){const _0x33a70d=this['makeCommandName'](_0x525c91);this[_0x1f85('0x1b5')](_0x33a70d,_0x1f85('0x123'),!![],_0x525c91);}}}}}if(_0x535c2f[_0x1f85('0x62')](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xe7cc7b=JSON[_0x1f85('0xd2')]('['+RegExp['$1'][_0x1f85('0x62')](/\d+/g)+']');for(const _0x3e0a6a of _0xe7cc7b){if(_0x1f85('0x3e')!=='qXAGV'){if(this[_0x1f85('0x17d')][_0x1f85('0xa9')](_0x3e0a6a))return![];}else{function _0x3d41ef(){if(!this[_0x1f85('0x1de')](_0x263fe4))return![];if(!this[_0x1f85('0xbf')](_0x12b967))return![];if(!this[_0x1f85('0x207')](_0x30c401))return![];return!![];}}}return!![];}else{if(_0x535c2f[_0x1f85('0x62')](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x45a0b9=RegExp['$1']['split'](',');for(const _0x3be7bb of _0x45a0b9){const _0x4b4e72=DataManager[_0x1f85('0x38')](_0x4b4e72);if(!_0x4b4e72)continue;if(this[_0x1f85('0x17d')][_0x1f85('0xa9')](_0x4b4e72))return![];}return!![];}}if(_0x535c2f[_0x1f85('0x62')](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1f85('0x120')!==_0x1f85('0x276')){const _0x1aa3e8=JSON[_0x1f85('0xd2')]('['+RegExp['$1'][_0x1f85('0x62')](/\d+/g)+']');for(const _0x264782 of _0x1aa3e8){if(!this[_0x1f85('0x17d')][_0x1f85('0x136')](_0x264782))return![];}return!![];}else{function _0x470489(){return _0x21d1eb[_0x1f85('0x9')][_0x1f85('0x244')][_0x1f85('0x22b')][_0x1f85('0x29e')];}}}else{if(_0x535c2f[_0x1f85('0x62')](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if('kImNA'===_0x1f85('0x21a')){function _0x258319(){return _0x2a6947=_0x411d9e(_0x5a313e),this['_colorCache']=this[_0x1f85('0xba')]||{},_0xb0df9b[_0x1f85('0x62')](/#(.*)/i)?this[_0x1f85('0xba')][_0x4b59aa]=_0x1f85('0x13e')[_0x1f85('0xfd')](_0x2a6980(_0x1e2146['$1'])):this[_0x1f85('0xba')][_0x31a670]=this[_0x1f85('0x150')](_0x118ed6(_0x2ece05)),this[_0x1f85('0xba')][_0x6197d2];}}else{const _0x180690=RegExp['$1'][_0x1f85('0x197')](',');for(const _0x8f194a of _0x180690){if(_0x1f85('0x191')===_0x1f85('0x271')){function _0x2544a0(){if(_0x370439[_0x1f85('0x110')][_0x1f85('0xc2')]()==='TP')return _0x3a4211[_0x1f85('0x1f5')][_0x1f85('0xe5')](this,_0x4e1722);}}else{const _0xe1abf5=DataManager[_0x1f85('0x38')](_0xe1abf5);if(!_0xe1abf5)continue;if(!this[_0x1f85('0x17d')][_0x1f85('0x136')](_0xe1abf5))return![];}}return!![];}}}if(_0x535c2f[_0x1f85('0x62')](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1f7cc2=JSON['parse']('['+RegExp['$1'][_0x1f85('0x62')](/\d+/g)+']');for(const _0x3ac106 of _0x1f7cc2){if(!this['_actor'][_0x1f85('0x136')](_0x3ac106))return![];}return!![];}else{if(_0x535c2f[_0x1f85('0x62')](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x5781c8=RegExp['$1'][_0x1f85('0x197')](',');for(const _0x481508 of _0x5781c8){const _0x5a8297=DataManager['getSkillIdWithName'](_0x5a8297);if(!_0x5a8297)continue;if(!this[_0x1f85('0x17d')]['hasSkill'](_0x5a8297))return![];}return!![];}}if(_0x535c2f[_0x1f85('0x62')](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x7e33ab=JSON[_0x1f85('0xd2')]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x31fe96 of _0x7e33ab){if(this[_0x1f85('0x17d')][_0x1f85('0x136')](_0x31fe96))return!![];}return![];}else{if(_0x535c2f['match'](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x3f4f3a=RegExp['$1'][_0x1f85('0x197')](',');for(const _0x1401c5 of _0x3f4f3a){const _0x8048b5=DataManager['getSkillIdWithName'](_0x8048b5);if(!_0x8048b5)continue;if(this[_0x1f85('0x17d')]['hasSkill'](_0x8048b5))return!![];}return![];}}if(_0x535c2f[_0x1f85('0x62')](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x511551=JSON['parse']('['+RegExp['$1'][_0x1f85('0x62')](/\d+/g)+']');for(const _0x264390 of _0x511551){if(_0x1f85('0x2b4')!==_0x1f85('0x226')){if(!this['_actor'][_0x1f85('0x136')](_0x264390))return!![];}else{function _0x2cf803(){this[_0x1f85('0x2a')](_0x3d291a,_0x2fff75,_0x27556d,_0x3ede74),_0x4ca074++,_0x5152d0%0x2===0x0?(_0xa74499=_0x49e421,_0x53424e+=_0x48e12a):_0x3cff9d+=_0x3286bc+0x18;}}}return![];}else{if(_0x535c2f[_0x1f85('0x62')](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x3855b3=RegExp['$1']['split'](',');for(const _0x5f2349 of _0x3855b3){const _0x465dcf=DataManager[_0x1f85('0x38')](_0x465dcf);if(!_0x465dcf)continue;if(!this[_0x1f85('0x17d')][_0x1f85('0x136')](_0x465dcf))return!![];}return![];}}if(_0x535c2f[_0x1f85('0x62')](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3ddf1e=JSON[_0x1f85('0xd2')]('['+RegExp['$1'][_0x1f85('0x62')](/\d+/g)+']');for(const _0x3a46ce of _0x3ddf1e){if(!this[_0x1f85('0x17d')][_0x1f85('0x136')](_0x3a46ce))return!![];}return![];}else{if(_0x535c2f[_0x1f85('0x62')](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x1f85('0x84')==='bzxtG'){const _0x24632f=RegExp['$1'][_0x1f85('0x197')](',');for(const _0x2d895c of _0x24632f){const _0x1e6e9a=DataManager[_0x1f85('0x38')](_0x1e6e9a);if(!_0x1e6e9a)continue;if(!this[_0x1f85('0x17d')][_0x1f85('0x136')](_0x1e6e9a))return!![];}return![];}else{function _0x15a6e3(){return _0x1f85('0x175');}}}}if(_0x535c2f['match'](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1f85('0xb')===_0x1f85('0xa3')){function _0x4eba77(){const _0x32962a=_0x138435[_0x1f85('0xd2')]('['+_0x5ef91e['$1'][_0x1f85('0x62')](/\d+/g)+']');for(const _0x4116d1 of _0x32962a){if(!_0x834fb1[_0x1f85('0x1e9')](_0x4116d1))return!![];}return![];}}else{const _0x451f42=JSON[_0x1f85('0xd2')]('['+RegExp['$1'][_0x1f85('0x62')](/\d+/g)+']');for(const _0x104cf7 of _0x451f42){if(this['_actor'][_0x1f85('0x136')](_0x104cf7))return![];}return!![];}}else{if(_0x535c2f[_0x1f85('0x62')](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x1f85('0xc5')===_0x1f85('0x224')){function _0xf5e945(){if(_0x3fda6c[_0x1f85('0xa7')])return _0x3e9ca2[_0x1f85('0xa7')];else{if(_0x6d030e[_0x1f85('0x269')])return _0x48836c[_0x1f85('0x269')];}}}else{const _0x4d42b3=RegExp['$1'][_0x1f85('0x197')](',');for(const _0x25b434 of _0x4d42b3){if(_0x1f85('0x2a4')==='vFKJu'){function _0x72f63d(){const _0x5b09cd=_0x2a53a8(_0x4a7d5b['$1']),_0x5c27e3=_0x1f85('0x73')[_0x1f85('0xfd')](_0x5b09cd);_0x13112d[_0x1f85('0x9')][_0x1f85('0x259')][_0x3dd100['id']]=new _0xb4e8a4(_0x1f85('0x285'),_0x5c27e3);}}else{const _0xa385ba=DataManager[_0x1f85('0x38')](_0xa385ba);if(!_0xa385ba)continue;if(this[_0x1f85('0x17d')][_0x1f85('0x136')](_0xa385ba))return![];}}return!![];}}}return!![];},Window_SkillList[_0x1f85('0x23b')][_0x1f85('0x27d')]=function(_0x419aad){const _0x2bac02=_0x419aad[_0x1f85('0x17c')],_0x3cdfba=VisuMZ[_0x1f85('0x9')]['skillVisibleJS'];if(_0x3cdfba[_0x419aad['id']]){if(_0x1f85('0x1cf')!==_0x1f85('0x28'))return _0x3cdfba[_0x419aad['id']][_0x1f85('0xe5')](this,_0x419aad);else{function _0x58c881(){this['setStateOrigin'](_0x5240a4),this[_0x1f85('0xa5')](_0x3be3ef),this[_0x1f85('0x1d6')](_0x2aeb48),this[_0x1f85('0x168')](_0x10b22b);}}}else return!![];},Window_SkillList[_0x1f85('0x23b')][_0x1f85('0x106')]=function(_0x334201,_0x180b17,_0x3dacab,_0x168f82){Window_Base[_0x1f85('0x23b')]['drawSkillCost']['call'](this,this[_0x1f85('0x17d')],_0x334201,_0x180b17,_0x3dacab,_0x168f82);},Window_SkillList[_0x1f85('0x23b')][_0x1f85('0xf2')]=function(_0x61e2d2){this[_0x1f85('0xce')]=_0x61e2d2,this[_0x1f85('0x9a')]();},VisuMZ[_0x1f85('0x9')][_0x1f85('0x162')]=Window_SkillList[_0x1f85('0x23b')][_0x1f85('0xc')],Window_SkillList[_0x1f85('0x23b')][_0x1f85('0xc')]=function(){VisuMZ[_0x1f85('0x9')][_0x1f85('0x162')][_0x1f85('0xe5')](this),this[_0x1f85('0xce')]&&this[_0x1f85('0xce')][_0x1f85('0xdd')]===Window_ShopStatus&&this['_statusWindow'][_0x1f85('0x215')](this['item']());};