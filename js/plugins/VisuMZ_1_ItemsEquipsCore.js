//=============================================================================
// VisuStella MZ - Items & Equips Core
// VisuMZ_1_ItemsEquipsCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_ItemsEquipsCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ItemsEquipsCore = VisuMZ.ItemsEquipsCore || {};
VisuMZ.ItemsEquipsCore.version = 1.04;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.04] [ItemsEquipsCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Items_and_Equips_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Items & Equips Core makes improvements to the RPG Maker MZ item and
 * equipment dedicated scenes (including the shop) and how they're handled.
 * From more item categories, better parameter control, rulings, and more, game
 * devs are able to take control over key aspects of their game's items.
 *
 * Features include all (but not limited to) the following:
 *
 * * Modifying the appearances to the Item Scene, Equip Scene, and Shop Scene.
 * * Categorizing items in unique and multiple categories.
 * * Item Scene and Shop Scene will now display detailed information on items.
 * * NEW! marker can be displayed over recently acquired items in-game.
 * * Equipment notetags to adjust parameters past the editor limitations.
 * * Equipment Rulings to adjust what slot types can and can't be unequipped
 *   and/or optimized.
 * * Equipment Type Handling offers more control over equipment loadouts.
 * * Items sold in shops can be hidden/shown based on Switches.
 * * Items sold in shops can have varying prices adjusted by notetags.
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
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Equipment Type Handling
 *
 * - Characters will no longer have one universal equipment slot setting.
 * Classes can have different equipment type loadouts, made possible through
 * the usage of notetags. Also, equipment types of matching names would be
 * treated as the same type, where previously, they would be different types.
 * This means if you have two "Accessory" slots, be it in the form of notetags
 * or through the Database > Types tab, they can both equip the same type of
 * accessories.
 *
 * - The Change Equip event command is now updated to reflect this new change.
 * When processing an equip change, the slot changed will go to the first
 * empty slot of matching type. If all of the actor's matching slot types are
 * equipped, then the equip will replace the last slot available.
 *
 * ---
 *
 * Shop Status Window
 *
 * - The Status Window found in the Shop Scene was originally barren and did
 * not display much information at all. This is changed through this plugin's
 * new features. While the contents of the Shop Status Window can be customized
 * through the Plugin Parameters, it is a change that cannot be reversed and
 * for the better since it gives players the much needed information revolving
 * around the game's items.
 *
 * ---
 *
 * Core Engine Compatibility: Modern Controls
 *
 * - If the VisuStella Core Engine is added to your game with Modern Controls
 * enabled, then the Item Menu Scene, Equip Menu Scene, and Shop Menu Scene's
 * controls will be changed a bit.
 *
 * - The Item Menu Scene will automatically have the Item List Window active,
 * with using the Left/Right (for singul column) or Page Up/Page Down (for
 * multi-columns) to navigate between the Item Categories. Similar will occur
 * when trying to sell items in the Shop Menu Scene.
 *
 * - The Equip Menu Scene will automatically have the Equip Slots Window active
 * and only activate the command window upon moving up to it.
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
 * === General ===
 * 
 * These notetags affect the Items, Weapons, and Armors on a general scale.
 *
 * ---
 *
 * <Max: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the maximum quantity that can be held for this item.
 * - Replace 'x' with a number value to determine the maximum amount.
 *
 * ---
 *
 * <Color: x>
 * <Color: #rrggbb>
 *
 * - Used for: Item, Weapon, Armor, Skill Notetags
 * - Determines the color of the object inside the in-game menus.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 *
 * <Category: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace 'x' with a category name to mark this item as.
 *
 * ---
 *
 * <Categories>
 *  x
 *  x
 * </Categories>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace each 'x' with a category name to mark this item as.
 *
 * ---
 *
 * === Item Accessibility Notetags ===
 *
 * The following notetags allow you to choose when items can/cannot be used
 * based on switches.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, item will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, item will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Item Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if an item can be accessible by code.
 *
 * ---
 *
 * <JS Item Enable>
 *  code
 *  code
 *  visible = code;
 * </JS Item Enable>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on JavaScript code.
 * - Replace 'code' to determine the type enabled status of the item.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   item will be enabled or not.
 * - The 'user' variable refers to the user with the item.
 * - The 'item' variable refers to the item being checked.
 * - All other item conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === Equipment Notetags ===
 *
 * The following notetags provide equipment-related effects from deciding what
 * equip slots can be given to classes to the base parameter changes asigned
 * to weapons and armors.
 *
 * ---
 *
 * <Equip Slots>
 *  slotName
 *  slotName
 *  slotName
 * </Equip Slots>
 *
 * - Used for: Class Notetags
 * - Changes the equipment slot loadout for any actor who is that class.
 * - Replace 'slotName' with an Equipment Type name from Database > Types.
 *   This is case-sensitive.
 * - Insert or remove as many "slotName" equipment types as needed.
 *
 * ---
 *
 * <param: +x>
 * <param: -x>
 *
 * - Used for: Weapon, Armor Notetags
 * - Changes the base parameter value for the equip item.
 * - Replace 'param' with any of the following: 'MaxHP', 'MaxMP', 'ATK', 'DEF',
 *   'MAT', 'MDF', 'AGI', or 'LUK' to change that specific parameter's value.
 * - Replace 'x' with a number value to set the parameter value to.
 * - This allows you to bypass the Database Editor's number limitations.
 *
 * ---
 *
 * === JavaScript Notetags: Equipment ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * adjust the parameter through code.
 *
 * ---
 *
 * <JS Parameters>
 *  MaxHP = code;
 *  MaxMP = code;
 *  ATK = code;
 *  DEF = code;
 *  MAT = code;
 *  MDF = code;
 *  AGI = code;
 *  LUK = code;
 * </JS Parameters>
 *
 * - Used for: Weapon, Armor Notetags
 * - Uses JavaScript to determine the values for the basic parameters based on
 *   the code used to calculate its value.
 * - The variables 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', and
 *   'LUK' are used to determine the finalized value of the parameter. This
 *   variable is case sensitive.
 * - If a parameter is not present, its value will be treated as +0.
 *
 * ---
 *
 * === Status Window Notetags ===
 *
 * The following notetags will affect the Shop Status Window info. If for any
 * reason the data that is displayed is not to your liking or insufficient,
 * you can change it up using the following notetags.
 *
 * ---
 *
 * <Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Status Info>
 *
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - If you do not like the generated data that's displayed, you can change it
 *   using this notetag to display what you want.
 * - Replace 'key' with one of the following:
 *   - Consumable
 *   - Quantity
 *   - Occasion
 *   - Scope
 *   - Speed
 *   - Success Rate
 *   - Repeat
 *   - Hit Type
 *   - Element
 *   - Damage Multiplier
 *   - HP Recovery
 *   - MP Recovery
 *   - TP Recovery
 *   - HP Damage
 *   - MP Damage
 *   - TP Damage
 *   - User TP Gain
 *   - Added Effects
 *   - Removed Effects
 * - Replace 'data' with the text data you want to visually appear. You may use
 *   text codes for this.
 * - This only affects info entries that are already visible and won't make
 *   other categories suddenly appear.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 *
 * <Custom Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Custom Status Info>
 *
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - If you want custom categories and data to be displayed for your items that
 *   aren't provided by the Shop Status Window Info to begin with, you can use
 *   this notetag to add in your own entries.
 * - Replace 'key' with text of the exact label you want. You may use text
 *   codes for this.
 * - Replace 'data' with text of the exact text data you want. You may use text
 *   codes for this.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 *
 * === Shop Menu Notetags ===
 *
 * These notetags adjust how prices and such are managed inside the Shop Menu
 * as well as whether or not some items are visible depending on switch states.
 *
 * ---
 *
 * <Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Adjusts the buying price for this item.
 * - Replace 'x' with a number depicting the desired value for the buy price.
 * - This allows you to bypass the RPG Maker MZ editor's limitation of 999,999.
 *
 * ---
 *
 * <Can Sell>
 * <Cannot Sell>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Makes the item either always sellable or cannot be sold.
 * - This bypasses the game's internal hard-coding to prevent items with a
 *   price of 0 from being able to be sold.
 * - This bypasses the game's internal hard-coding to always allow items with
 *   a price value of being able to be sold.
 *
 * ---
 *
 * <Sell Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Changes the sell price to be something different than the default amount.
 * - Replace 'x' with a number depicting the desired value for the sell price.
 *
 * ---
 *
 * <Show Shop Switch: x>
 *
 * <Show Shop All Switches: x,x,x>
 * <Show Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, item will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Shop Switch: x>
 *
 * <Hide Shop All Switches: x,x,x>
 * <Hide Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, item will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Cannot Sell Switch: x>
 *
 * <Cannot Sell All Switches: x,x,x>
 * <Cannot Sell Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the sellability of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's sellability.
 * - If 'All' notetag variant is used, item cannot be sold until all switches
 *   are ON. Otherwise, it can be sold.
 * - If 'Any' notetag variant is used, item cannot be sold if any of the
 *   switches are ON. Otherwise, it can be sold.
 *
 * ---
 *
 * === JavaScript Notetags: Shop Menu ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Buy and Sell prices.
 *
 * ---
 *
 * <JS Buy Price>
 *  code
 *  code
 *  price = code;
 * </JS Buy Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the buying 'price' of the item.
 * - Insert the final buy price into the 'price' variable.
 * - The 'item' variable refers to the item being bought.
 *
 * ---
 *
 * <JS Sell Price>
 *  code
 *  code
 *  price = code;
 * </JS Sell Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the selling 'price' of the item.
 * - Insert the final sell price into the 'price' variable.
 * - The 'item' variable refers to the item being sold.
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
 * === Shop Plugin Commands ===
 * 
 * ---
 *
 * Shop: Advanced
 * - Make it easier to put together inventories for a shop.
 * - WARNING: Does not allow for event-specific prices.
 *
 *   Step 1: Item ID's
 *   - Select which Item ID ranges to add.
 *
 *   Step 2: Weapon ID's
 *   - Select which Weapon ID ranges to add.
 *
 *   Step 3: Armor ID's
 *   - Select which Armor ID ranges to add.
 *
 *   Step 4: Purchase Only?
 *   - Make the shop purchase-only?
 * 
 *   Optional:
 * 
 *     Blacklist
 *     - A list of categories to blacklist from the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 * 
 *     Whitelist
 *     - A list of categories to whitelist for the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 *
 * This Plugin Command primarily functions as an alternative to the editor's
 * "Shop Processing" event command as that one requires you to add items one at
 * a time, making it extremely tedious to add large amounts of items. This
 * Plugin Command will mitigate that by allowing ID ranges to determine which
 * items to make available.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Menu Settings
 * ============================================================================
 *
 * The Item Menu Settings allow you to adjust specifics on how key objects and
 * windows in the Item Menu Scene operate.
 *
 * ---
 *
 * General Window
 *
 *   Use Updated Layout:
 *   - Use the Updated Item Menu Layout provided by this plugin?
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
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *
 * ---
 *
 * Item Quantity
 *
 *   Item Max:
 *   Weapon Max:
 *   Armor Max:
 *   - The default maximum quantity for items, weapons, and/or armors.
 * 
 *   Quantity Format:
 *   - How to display an item's quantity.
 *   - %1 - Item Quantity
 *
 *   Font Size:
 *   - Default font size for item quantity.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Item Menu?:
 *   - Show the Shop Status Window in the Item Menu?
 *   - This is enabled if the Updated Layout is on.
 *
 *   Adjust List Window?:
 *   - Automatically adjust the Item List Window in the Item Menu if using the
 *     Shop Status Window?
 *
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Status Window in the
 *     Item Menu.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Switch Category:
 *   - Button assist text used for switching categories.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Categories
 * ============================================================================
 *
 * Item Categories appear both in the Item Menu Scene and Shop Menu Scene (but
 * only under the Sell command). These Plugin Parameters give you the ability
 * to add in the specific categories you want displayed, remove the ones you
 * don't, and associate them with icons.
 *
 * ---
 *
 * List
 *
 *   Category List
 *   - A list of the item categories displayed in the Item/Shop menus.
 * 
 *     Type:
 *     - A list of the item categories displayed in the Item/Shop menus.
 *     - Replace x with ID numbers or text.
 *     - AllItems, RegularItems, KeyItems
 *     - HiddenItemA, HiddenItemB
 *     - Consumable, Nonconsumable
 *     - AlwaysUsable, BattleUsable, FieldUsable, NeverUsable
 *     - AllWeapons, WType:x
 *     - AllArmors, AType:x, EType:x
 *     - Category:x
 * 
 *     Icon:
 *     - Icon used for this category.
 *     - Use 0 for no icon.
 *
 *   Style:
 *   - How do you wish to draw categorie entries in the Category Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 *
 *   Text Alignment
 *   - Decide how you want the text to be aligned.
 *
 * ---
 *
 * Vocabulary
 *
 *   Hidden Item A
 *   Hidden Item B
 *   Consumable
 *   Nonconsumable
 *   Always Usable
 *   Battle Usable
 *   Field Usable
 *   Never Usable
 *   - How these categories are named in the Item Menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: NEW! Labels
 * ============================================================================
 *
 * Whenever the player receives a new item(s), a NEW! Label can be placed on
 * top of the item's icon when browsing a menu displaying the item(s). This is
 * a quality of life addition from more modern RPG's to help players figure out
 * what they've recently received. The following are Plugin Parameters made to
 * adjust how the NEW! Labels are handled in-game.
 *
 * ---
 *
 * NEW! Labels
 * 
 *   Use NEW! Labels?:
 *   - Use the NEW! Labels or not?
 * 
 *   Icon:
 *   - The icon index used to represent the NEW! text.
 *   - Use 0 to not draw any icons.
 * 
 *   Text:
 *   - The text written on the NEW! Label.
 * 
 *     Font Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *     Font Size:
 *     - The font size used for the NEW! text.
 * 
 *   Fade Limit:
 *   - What's the upper opaque limit before reversing?
 * 
 *   Fade Speed:
 *   - What's the fade speed of the NEW! Label?
 * 
 *   Offset X:
 *   - How much to offset the NEW! Label's X position by.
 * 
 *   Offset Y:
 *   - How much to offset the NEW! Label's Y position by.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Equip Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust the Equipment Menu Scene, ranging from using
 * a more updated and modern layout, changing the styles of other windows, and
 * other key visual aspects of the Equip Menu Scene. Other settings here allow
 * you to adjust how equipment operate under certain rulings, too.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Equip Layout provided by this plugin?
 * 
 *     Param Font Size:
 *     - The font size used for parameter values.
 * 
 *     Show Menu Portraits?:
 *     - If Main Menu Core is installed, display the Menu Portraits instead of
 *       the actor's face in the status window?
 * 
 *     JS: Portrait Upper:
 *     - If Menu Portraits are available, this is code used to draw the upper
 *       data like this in the Status Window.
 * 
 *     JS: Face Upper:
 *     - If faces used used, this is code used to draw the upper data like this
 *       in the Status Window.
 * 
 *     JS: Parameter Lower:
 *     - Code to determine how parameters are drawn in the Status Window.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 * 
 *   Status Window Width:
 *   - The usual width of the status window if using the non-Updated Equip
 *     Menu Layout.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Command Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Equip Icon:
 *   - The icon used for the Equip command.
 * 
 *   Add Optimize Command?:
 *   - Add the "Optimize" command to the Command Window?
 * 
 *     Optimize Icon:
 *     - The icon used for the Optimize command.
 * 
 *   Add Clear Command?:
 *   - Add the "Clear" command to the Command Window?
 * 
 *     Clear Icon:
 *     - The icon used for the Clear command.
 *
 * ---
 *
 * Remove Equip
 * 
 *   Icon:
 *   - Icon used for equipment removal.
 * 
 *   Text:
 *   - Text used for equipment removal.
 * 
 *   Use SHIFT Shortcut?:
 *   - Add the "Shift" button as a shortcut key to removing items?
 *
 * ---
 *
 * Rulings
 * 
 *   Equip-Adjust HP/MP:
 *   - Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 * 
 *   Non-Removable Types:
 *   - Insert ID's of the Equipment Types that must always have an item
 *     equipped and cannot be empty.
 * 
 *   Non-Optomized Types:
 *   - Insert ID's of the Equipment Types that will be ignored when equipment
 *     is being optimized.
 *
 * ---
 *
 * Button Assist Window
 *
 *   SHIFT: Remove:
 *   - Button assist text used for the SHIFT Remove Shortcut.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters allow you a number of options to adjust the Shop
 * Menu Scene. These options range from enabling an updated and modern layout,
 * adjust how various key visual aspects appear, and determine how prices can
 * be affected when it comes to selling them or buying them (for coders).
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Shop Layout provided by this plugin?
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
 * Command Window
 * 
 *   Hide Unavailable?:
 *   - Hide all unavailable commands like when a shop is set to Purchase Only?
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Buy Icon:
 *   - The icon used for the Buy command.
 * 
 *   Sell Icon:
 *   - The icon used for the Sell command.
 * 
 *   Cancel Icon:
 *   - The icon used for the Cancel command.
 * 
 *   Rename "Cancel":
 *   - Rename Cancel to something more logical for the Shop Menu Scene.
 *
 * ---
 *
 * Prices
 * 
 *   Sell Price Rate:
 *   - The default sell price rate.
 * 
 *   JS: Buy Price:
 *   - Modificatons made to the buy price before finalizing it.
 * 
 *   JS: Sell Price:
 *   - Modificatons made to the sell price before finalizing it.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Small Increment:
 *   Large Increment:
 *   - Text used for changing amount bought/sold.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Status Window
 * ============================================================================
 *
 * These Plugin Parameters focuses on the Shop Status Window and determines how
 * its data is displayed.
 *
 * ---
 *
 * General
 * 
 *   Window Width:
 *   - The usual width of the status window.
 * 
 *   Parameter Font Size:
 *   - Font size used for parameter changes.
 * 
 *   Translucent Opacity:
 *   - Opacity setting used for translucent window objects.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Equipment Data
 * 
 *   Already Equipped:
 *   - Marker used to show an actor cannot equip an item.
 * 
 *   Can't Equip:
 *   - Marker used to show an actor cannot equip an item.
 * 
 *   No Changes:
 *   - Marker used to show no changes have occurred.
 * 
 *   JS: Draw Equip Data:
 *   - Code used to draw the equipment data for the Shop Status Window.
 *
 * ---
 *
 * Item Data
 * 
 *   Max State/Buff Icons:
 *   - Maximum number of icons that can be displayed for Add/Remove
 *     States/Buffs.
 * 
 *   Multiplier Standard:
 *   - Constant standard to filter out random values when calculating the
 *     damage multiplier.
 * 
 *   JS: Draw Item Data:
 *   - Code used to draw the item data for the Shop Status Window.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Consumable:
 *   Occasions:
 *   Scope:
 *   Speed:
 *   Success Rate:
 *   Repeats:
 *   Hit Type:
 *   Element:
 *   Damage Type:
 *   Effects:
 *   - Vocabulary used for these data entries.
 *   - Some of these have Plugin Parameters have sub-entries.
 * 
 *   NOTE: Regarding Damage Labels
 * 
 *   If Visu_1_BattleCore is installed, priority goes to its Damage Style
 *   settings. The label displayed is based on the damage style settings in
 *   place for that specific skill or item.
 * 
 *   Go to Battle Core > Plugin Parameters > Damage Settings > Style List >
 *   pick the damage style you want to edit > Damage Label and change the
 *   text settings you'd like there.
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
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Pressing Shift to quickly remove equipment should no longer crash the
 *    game. This will also clear the help window text. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** If both Optimize and Clear commands have been removed and using modern
 *    controls, pressing up at the top of the slot window list will not go to
 *    the window. Fix made by Yanfly.
 * ** If both Optimize and Clear commands have been removed, the window will no
 *    longer appear and the slot window will be moved upward to fill any empty
 *    spaces. Fix made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added in NEW! Label to let you adjust the font face.
 * ** New Plugin Parameters added in Equip Menu Scene Settings for disabling
 *    the back rectangles and/or changing their colors.
 * ** New Plugin Parameters added in Shop Status Window Settings for disabling
 *    the back rectangles and/or changing their colors.
 * 
 * Version 1.02: August 30, 2020
 * * Documentation Fix!
 * ** Added: NOTE: Regarding Damage Labels
 * *** If Visu_1_BattleCore is installed, priority goes to its Damage Style
 *   settings. The label displayed is based on the damage style settings in
 *   place for that specific skill or item.
 * *** Go to Battle Core > Plugin Parameters > Damage Settings > Style List >
 *   pick the damage style you want to edit > Damage Label and change the
 *   text settings you'd like there.
 * *** Documentation update added by Yanfly.
 * 
 * Version 1.01: August 23, 2020
 * * Added failsafe to prevent non-existent equipment (because the database
 *   entries have been deleted) from being equipped as initial equipment.
 *   Fix made by Olivia.
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
 * @command BatchShop
 * @text Shop: Advanced
 * @desc Make it easier to put together inventories for a shop.
 * WARNING: Does not allow for event-specific prices.
 *
 * @arg Step1
 * @text Step 1: Item ID's
 *
 * @arg Step1Start:num
 * @text Range Start
 * @parent Step1
 * @type item
 * @desc Select which Item ID to start from.
 * @default 1
 *
 * @arg Step1End:num
 * @text Range End
 * @parent Step1
 * @type item
 * @desc Select which Item ID to end at.
 * @default 4
 *
 * @arg Step2
 * @text Step 2: Weapon ID's
 *
 * @arg Step2Start:num
 * @text Range Start
 * @parent Step2
 * @type weapon
 * @desc Select which Weapon ID to start from.
 * @default 1
 *
 * @arg Step2End:num
 * @text Range End
 * @parent Step2
 * @type weapon
 * @desc Select which Weapon ID to end at.
 * @default 4
 *
 * @arg Step3
 * @text Step 3: Armor ID's
 *
 * @arg Step3Start:num
 * @text Range Start
 * @parent Step3
 * @type armor
 * @desc Select which Armor ID to start from.
 * @default 1
 *
 * @arg Step3End:num
 * @text Range End
 * @parent Step3
 * @type armor
 * @desc Select which Armor ID to end at.
 * @default 4
 *
 * @arg PurchaseOnly:eval
 * @text Step 4: Purchase Only?
 * @type boolean
 * @on Purchase-Only
 * @off Sell Accessible
 * @desc Make the shop purchase-only?
 * @default false
 * 
 * @arg Optional
 * 
 * @arg Blacklist:arraystr
 * @text Blacklisted Categories
 * @parent Optional
 * @type string[]
 * @desc A list of categories to blacklist from the shop.
 * Not used if empty. Mark categories with <Category: x>
 * @default []
 * 
 * @arg Whitelist:arraystr
 * @text Whitelisted Categories
 * @parent Optional
 * @type string[]
 * @desc A list of categories to whitelist for the shop.
 * Not used if empty. Mark categories with <Category: x>
 * @default []
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
 * @param ItemsEquipsCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ItemScene:struct
 * @text Item Menu Settings
 * @type struct<ItemScene>
 * @desc Change the Item Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","ListWindow":"","ListWindowCols:num":"1","ItemQt":"","MaxItems:num":"99","MaxWeapons:num":"99","MaxArmors:num":"99","ItemQuantityFmt:str":"×%1","ItemQuantityFontSize:num":"22","ShopStatusWindow":"","ShowShopStatus:eval":"true","ItemSceneAdjustItemList:eval":"true","ItemMenuStatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._itemWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._itemWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","ButtonAssist":"","buttonAssistCategory:str":"Switch Category"}
 *
 * @param Categories:struct
 * @text Item Categories
 * @parent ItemScene:struct
 * @type struct<Categories>
 * @desc Change the categories displayed in the Item/Shop menus.
 * @default {"MainList":"","List:arraystruct":"[\"{\\\"Type:str\\\":\\\"FieldUsable\\\",\\\"Icon:num\\\":\\\"208\\\"}\",\"{\\\"Type:str\\\":\\\"BattleUsable\\\",\\\"Icon:num\\\":\\\"218\\\"}\",\"{\\\"Type:str\\\":\\\"NeverUsable\\\",\\\"Icon:num\\\":\\\"302\\\"}\",\"{\\\"Type:str\\\":\\\"AllWeapons\\\",\\\"Icon:num\\\":\\\"97\\\"}\",\"{\\\"Type:str\\\":\\\"EType:2\\\",\\\"Icon:num\\\":\\\"128\\\"}\",\"{\\\"Type:str\\\":\\\"EType:3\\\",\\\"Icon:num\\\":\\\"131\\\"}\",\"{\\\"Type:str\\\":\\\"EType:4\\\",\\\"Icon:num\\\":\\\"137\\\"}\",\"{\\\"Type:str\\\":\\\"EType:5\\\",\\\"Icon:num\\\":\\\"145\\\"}\",\"{\\\"Type:str\\\":\\\"KeyItems\\\",\\\"Icon:num\\\":\\\"195\\\"}\"]","Style:str":"icon","TextAlign:str":"center","Vocabulary":"","HiddenItemA:str":"Special Items","HiddenItemB:str":"Unique Items","Consumable:str":"Consumable","Nonconsumable:str":"Nonconsumable","AlwaysUsable:str":"Usable","BattleUsable:str":"Battle","FieldUsable:str":"Field","NeverUsable:str":"Materials"}
 *
 * @param New:struct
 * @text NEW! Labels
 * @parent ItemScene:struct
 * @type struct<NewLabel>
 * @desc Change how NEW! Labels apply to your game project.
 * @default {"Enable:eval":"true","Icon:num":"0","Text:str":"NEW!","FontColor:str":"17","FontFace:str":"Verdana","FontSize:str":"16","FadeLimit:num":"360","FadeSpeed:num":"4","OffsetX:num":"0","OffsetY:num":"4"}
 *
 * @param EquipScene:struct
 * @text Equip Menu Settings
 * @type struct<EquipScene>
 * @desc Adjust the settings regarding the Equip Menu Scene.
 * @default {"General":"","EnableLayout:eval":"true","ParamValueFontSize:num":"22","MenuPortraits:eval":"true","DrawPortraitJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst x1 = padding;\\nconst x2 = this.innerWidth - 128 - padding;\\n\\n// Draw Menu Image\\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\\n\\n// Draw Data\\nthis.drawActorName(this._actor, x1, lineHeight * 0);\\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);\"","DrawFaceJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst x = Math.floor(this.innerWidth / 2);\\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\\nconst actorY = Math.floor((limitHeight - ImageManager.faceHeight) / 2);\\nlet dataHeight = lineHeight * 3;\\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nconst dataY = Math.floor((limitHeight - dataHeight) / 2);\\n\\n// Draw Data\\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);\"","DrawParamJS:func":"\"// Declare variables\\nconst params = this.actorParams();\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst baseX = 0;\\nconst baseY = this.innerHeight - params.length * lineHeight;\\nconst baseWidth = this.innerWidth;\\nconst valueFontSize = this.paramValueFontSize();\\n\\n// Calculate Widths\\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\\nparamNameWidth += padding * 2;\\nif (this.isUseParamNamesWithIcons()) {\\n    paramNameWidth += ImageManager.iconWidth + 4;\\n}\\nlet arrowWidth = this.rightArrowWidth();\\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\\n\\n// Draw Parameters\\nlet x = baseX;\\nlet y = baseY;\\nlet value = 0;\\nlet diffValue = 0;\\nlet alter = 2;\\nfor (const paramId of params) {\\n    // Draw Param Name\\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\\n    this.resetFontSettings();\\n    x += paramNameWidth;\\n\\n    // Draw Param Before\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\\n    this.resetFontSettings();\\n    x += paramValueWidth;\\n\\n    // Draw Arrow\\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\\n    this.drawRightArrow(x, y);\\n    x += arrowWidth;\\n\\n    // Draw Param After\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\\n    x += paramValueWidth;\\n\\n    // Draw Param Change\\n    if (totalDivides > 2) {\\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\\n    }\\n\\n    // Prepare Next Parameter\\n    x = baseX;\\n    y += lineHeight;\\n    alter = alter === 2 ? 1 : 2;\\n}\"","LayoutStyle:str":"upper/right","StatusWindowWidth:num":"312","DrawBackRect:eval":"true","BackRectColor:str":"19","Command":"","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconEquip:num":"136","CommandAddOptimize:eval":"false","CmdIconOptimize:num":"137","CommandAddClear:eval":"false","CmdIconClear:num":"135","RemoveEquip":"","RemoveEquipIcon:num":"16","RemoveEquipText:str":"Remove","ShiftShortcutKey:eval":"true","Rulings":"","EquipAdjustHpMp:eval":"true","NonRemoveETypes:arraynum":"[]","NonOptimizeETypes:arraynum":"[]","ButtonAssist":"","buttonAssistRemove:str":"Unequip"}
 *
 * @param ShopScene:struct
 * @text Shop Menu Settings
 * @type struct<ShopScene>
 * @desc Change the Shop Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","Command":"","CmdHideDisabled:eval":"true","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconBuy:num":"208","CmdIconSell:num":"314","CmdIconCancel:num":"82","CmdCancelRename:str":"Exit","Prices":"","SellPriceRate:num":"0.50","BuyPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","SellPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","ButtonAssist":"","buttonAssistSmallIncrement:str":"-1/+1","buttonAssistLargeIncrement:str":"-10/+10"}
 *
 * @param StatusWindow:struct
 * @text Shop Status Window
 * @parent ShopScene:struct
 * @type struct<StatusWindow>
 * @desc Change the Item Status Window settings.
 * @default {"General":"","Width:num":"352","ParamChangeFontSize:num":"22","Translucent:num":"64","DrawBackRect:eval":"true","BackRectColor:str":"19","EquipData":"","AlreadyEquipMarker:str":"E","CannotEquipMarker:str":"-","NoChangeMarker:str":"-","DrawEquipData:func":"\"// Set Variables\\nconst lineHeight = this.lineHeight();\\nconst paramheight = this.gaugeLineHeight() + 8;\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name, Type, and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\nif (this.drawItemEquipType(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\n\\n// Draw Parameter Names\\nconst params = this.actorParams();\\nconst backY = y;\\ny = height - (params.length * paramheight) - 4;\\nlet paramX = x;\\nlet paramWidth = 0;\\nlet tableY = y;\\nfor (const paramId of params) {\\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\\n    y += paramheight;\\n}\\n\\n// Draw Actor Data\\nconst actorMax = $gameParty.maxBattleMembers();\\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\\nparamWidth = width - (actorWidth * actorMax);\\nfor (const actor of $gameParty.battleMembers()) {\\n    const index = $gameParty.battleMembers().indexOf(actor);\\n    const actorX = paramX + paramWidth + (index * actorWidth);\\n    this.changePaintOpacity(actor.canEquip(this._item));\\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\\n    let actorY = tableY;\\n\\n    // Draw Parameter Changes\\n    for (const paramId of params) {\\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\\n        actorY += paramheight;\\n    }\\n}\\n\\n// Draw Back Rectangles\\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\\nfor (let i = 0; i < actorMax; i++) {\\n    const actorX = paramX + paramWidth + (i * actorWidth);\\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\\n}\\nfor (const paramId of params) {\\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\\n    for (let i = 0; i < actorMax; i++) {\\n        const actorX = paramX + paramWidth + (i * actorWidth);\\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\\n    }\\n    tableY += paramheight;\\n}\"","ItemData":"","ItemGeneral":"","MaxIcons:num":"8","MultiplierStandard:num":"1000000","DrawItemData:func":"\"const lineHeight = this.lineHeight();\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\n\\n// Draw Main Item Properties\\nif (this.drawItemConsumable(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\nif (this._item.occasion < 3) {\\n    y = this.drawItemDamage(x, y, width);\\n    y = this.drawItemEffects(x, y, width);\\n}\\ny = this.drawItemCustomEntries(x, y, width);\\n\\n// Draw Remaining Item Properties\\nif (this._item.occasion < 3) {\\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemHitType(x, y, hw)) y += 0;\\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\\n}\\n\\n// Fill Rest of the Window\\nthis.drawItemDarkRect(x, y, width, height - y);\"","Vocabulary":"","LabelConsume:str":"Consumable","Consumable:str":"✔","NotConsumable:str":"✘","Occasions":"","Occasion0:str":"Anytime Use","Occasion1:str":"Battle-Only","Occasion2:str":"Field-Only","Occasion3:str":"-","Scope":"","Scope0:str":"No Target","Scope1:str":"1 Foe","Scope2:str":"All Foes","Scope3:str":"Random Foe","Scope4:str":"2 Random Foes","Scope5:str":"3 Random Foes","Scope6:str":"4 Random Foes","Scope7:str":"1 Ally","Scope8:str":"Alive Allies","Scope9:str":"Dead Ally","Scope10:str":"Dead Allies","Scope11:str":"User","Scope12:str":"Any Ally","Scope13:str":"All Allies","Scope14:str":"Everybody","BattleCore":"","ScopeRandomAny:str":"%1 Random Units","ScopeRandomEnemies:str":"%1 Random Foes","ScopeRandomAllies:str":"%1 Random Allies","ScopeAlliesButUser:str":"Other Allies","LabelSpeed:str":"Speed","Speed2000:str":"Fastest","Speed1000:str":"Faster","Speed1:str":"Fast","Speed0:str":"Normal","SpeedNeg999:str":"Slow","SpeedNeg1999:str":"Slower","SpeedNeg2000:str":"Slowest","LabelSuccessRate:str":"Accuracy","LabelRepeats:str":"Hits","LabelHitType:str":"Type","HitType0:str":"Neutral","HitType1:str":"Physical","HitType2:str":"Magical","LabelElement:str":"Element","ElementWeapon:str":"\\I[97]Weapon","ElementNone:str":"\\I[160]No Element","DamageType":"","DamageType1:str":"%1 Damage Multiplier","DamageType2:str":"%1 Damage Multiplier","DamageType3:str":"%1 Recovery Multiplier","DamageType4:str":"%1 Recovery Multiplier","DamageType5:str":"%1 Drain Multiplier","DamageType6:str":"%1 Drain Multiplier","Effects":"","LabelRecoverHP:str":"%1 Recovery","LabelRecoverMP:str":"%1 Recovery","LabelRecoverTP:str":"%1 Recovery","LabelSelfGainTP:str":"User %1","LabelDamageHP:str":"%1 Damage","LabelDamageMP:str":"%1 Damage","LabelDamageTP:str":"%1 Damage","LabelApply:str":"Applies","LabelRemove:str":"Removes"}
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
 * Item Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Item Menu Layout provided by this plugin?
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
 * @param ItemQt
 * @text Item Quantity
 *
 * @param MaxItems:num
 * @text Item Max
 * @parent ItemQt
 * @desc The default maximum quantity for items.
 * @default 99
 *
 * @param MaxWeapons:num
 * @text Weapon Max
 * @parent ItemQt
 * @desc The default maximum quantity for weapons.
 * @default 99
 *
 * @param MaxArmors:num
 * @text Armor Max
 * @parent ItemQt
 * @desc The default maximum quantity for armors.
 * @default 99
 *
 * @param ItemQuantityFmt:str
 * @text Quantity Format
 * @parent ItemQt
 * @desc How to display an item's quantity.
 * %1 - Item Quantity
 * @default ×%1
 *
 * @param ItemQuantityFontSize:num
 * @text Font Size
 * @parent ItemQt
 * @desc Default font size for item quantity.
 * @default 22
 *
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Item Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Item Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param ItemSceneAdjustItemList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Item List Window in the Item Menu if using the Shop Status Window?
 * @default true
 *
 * @param ItemMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Status Window in the Item Menu.
 * @default "const width = this.statusWidth();\nconst height = this._itemWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._itemWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistCategory:str
 * @text Switch Category
 * @parent ButtonAssist
 * @desc Button assist text used for switching categories.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default Switch Category
 *
 */
/* ----------------------------------------------------------------------------
 * Item Categories
 * ----------------------------------------------------------------------------
 */
/*~struct~Categories:
 *
 * @param MainList
 * @text List
 * 
 * @param List:arraystruct
 * @text Category List
 * @parent MainList
 * @type struct<Category>[]
 * @desc A list of the item categories displayed in the Item/Shop menus.
 * @default ["{\"Type:str\":\"RegularItems\",\"Icon:num\":\"208\"}","{\"Type:str\":\"AllWeapons\",\"Icon:num\":\"97\"}","{\"Type:str\":\"AllArmors\",\"Icon:num\":\"137\"}","{\"Type:str\":\"KeyItems\",\"Icon:num\":\"195\"}"]
 *
 * @param Style:str
 * @text Category Style
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
 * @desc How do you wish to draw categorie entries in the Category Window?
 * @default icon
 *
 * @param TextAlign:str
 * @text Text Alignment
 * @parent MainList
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Decide how you want the text to be aligned.
 * @default center
 *
 * @param Vocabulary
 *
 * @param HiddenItemA:str
 * @text Hidden Item A
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Special Items
 *
 * @param HiddenItemB:str
 * @text Hidden Item B
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Unique Items
 *
 * @param Consumable:str
 * @text Consumable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Consumable
 *
 * @param Nonconsumable:str
 * @textm Nonconsumable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Nonconsumable
 *
 * @param AlwaysUsable:str
 * @text Always Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Usable
 *
 * @param BattleUsable:str
 * @text Battle Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Battle
 *
 * @param FieldUsable:str
 * @text Field Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Field
 *
 * @param NeverUsable:str
 * @text Never Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Materials
 *
 */
/* ----------------------------------------------------------------------------
 * Category Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Category:
 *
 * @param Type:str
 * @text Type
 * @type combo
 * @option AllItems
 * @option 
 * @option RegularItems
 * @option KeyItems
 * @option HiddenItemA
 * @option HiddenItemB
 * @option 
 * @option Consumable
 * @option Nonconsumable
 * @option 
 * @option AlwaysUsable
 * @option BattleUsable
 * @option FieldUsable
 * @option NeverUsable
 * @option 
 * @option AllWeapons
 * @option WType:x
 * @option 
 * @option AllArmors
 * @option AType:x
 * @option 
 * @option EType:x
 * @option 
 * @option Category:x
 * @option
 * @desc A list of the item categories displayed in the Item/Shop
 * menus. Replace x with ID numbers or text.
 * @default RegularItems
 *
 * @param Icon:num
 * @text Icon
 * @desc Icon used for this category.
 * Use 0 for no icon.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * New Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NewLabel:
 *
 * @param Enable:eval
 * @text Use NEW! Labels?
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the NEW! Labels or not?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @desc The icon index used to represent the NEW! text.
 * Use 0 to not draw any icons.
 * @default 0
 *
 * @param Text:str
 * @text Text
 * @desc The text written on the NEW! Label.
 * @default NEW!
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Text:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param FontFace:str
 * @text Font Face
 * @parent Text:str
 * @desc Font face used for the NEW! Label.
 * @default Verdana
 *
 * @param FontSize:str
 * @text Font Size
 * @parent Text:str
 * @desc The font size used for the NEW! text.
 * @default 16
 *
 * @param FadeLimit:num
 * @text Fade Limit
 * @desc What's the upper opaque limit before reversing?
 * @default 360
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @desc What's the fade speed of the NEW! Label?
 * @default 4
 *
 * @param OffsetX:num
 * @text Offset X
 * @desc How much to offset the NEW! Label's X position by.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @desc How much to offset the NEW! Label's Y position by.
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Equip Layout provided by this plugin?
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
 * @default upper/right
 *
 * @param ParamValueFontSize:num
 * @text Param Font Size
 * @parent EnableLayout:eval
 * @desc The font size used for parameter values.
 * @default 22
 *
 * @param MenuPortraits:eval
 * @text Show Menu Portraits?
 * @parent EnableLayout:eval
 * @type boolean
 * @on Use Portraits
 * @off Use Faces
 * @desc If Main Menu Core is installed, display the Menu Portraits
 * instead of the actor's face in the status window?
 * @default true
 *
 * @param DrawPortraitJS:func
 * @text JS: Portrait Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If Menu Portraits are available, this is code used to draw
 * the upper data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst x1 = padding;\nconst x2 = this.innerWidth - 128 - padding;\n\n// Draw Menu Image\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\n\n// Draw Data\nthis.drawActorName(this._actor, x1, lineHeight * 0);\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);"
 *
 * @param DrawFaceJS:func
 * @text JS: Face Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If faces used used, this is code used to draw the upper
 * data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst x = Math.floor(this.innerWidth / 2);\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\nconst actorY = Math.floor((limitHeight - ImageManager.faceHeight) / 2);\nlet dataHeight = lineHeight * 3;\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nconst dataY = Math.floor((limitHeight - dataHeight) / 2);\n\n// Draw Data\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);"
 *
 * @param DrawParamJS:func
 * @text JS: Parameter Lower
 * @parent EnableLayout:eval
 * @type note
 * @desc Code to determine how parameters are drawn in the
 * Status Window.
 * @default "// Declare variables\nconst params = this.actorParams();\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst baseX = 0;\nconst baseY = this.innerHeight - params.length * lineHeight;\nconst baseWidth = this.innerWidth;\nconst valueFontSize = this.paramValueFontSize();\n\n// Calculate Widths\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\nparamNameWidth += padding * 2;\nif (this.isUseParamNamesWithIcons()) {\n    paramNameWidth += ImageManager.iconWidth + 4;\n}\nlet arrowWidth = this.rightArrowWidth();\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\n\n// Draw Parameters\nlet x = baseX;\nlet y = baseY;\nlet value = 0;\nlet diffValue = 0;\nfor (const paramId of params) {\n    // Draw Param Name\n    this.drawItemDarkRect(x, y, paramNameWidth);\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\n    this.resetFontSettings();\n    x += paramNameWidth;\n\n    // Draw Param Before\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth);\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\n    this.resetFontSettings();\n    x += paramValueWidth;\n\n    // Draw Arrow\n    this.drawItemDarkRect(x, y, arrowWidth);\n    this.drawRightArrow(x, y);\n    x += arrowWidth;\n\n    // Draw Param After\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth);\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\n    x += paramValueWidth;\n\n    // Draw Param Change\n    if (totalDivides > 2) {\n        this.drawItemDarkRect(x, y, paramValueWidth);\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\n    }\n\n    // Prepare Next Parameter\n    x = baseX;\n    y += lineHeight;\n}"
 *
 * @param StatusWindowWidth:num
 * @text Status Window Width
 * @parent General
 * @desc The usual width of the status window if using the 
 * non-Updated Equip Menu Layout.
 * @default 312
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param Command
 * @text Command Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconEquip:num
 * @text Equip Icon
 * @parent Command
 * @desc The icon used for the Equip command.
 * @default 136
 *
 * @param CommandAddOptimize:eval
 * @text Add Optimize Command?
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Optimize" command to the Command Window?
 * @default true
 *
 * @param CmdIconOptimize:num
 * @text Optimize Icon
 * @parent CommandAddOptimize:eval
 * @desc The icon used for the Optimize command.
 * @default 137
 *
 * @param CommandAddClear:eval
 * @text Add Clear Command?
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Clear" command to the Command Window?
 * @default true
 *
 * @param CmdIconClear:num
 * @text Clear Icon
 * @parent CommandAddClear:eval
 * @desc The icon used for the Clear command.
 * @default 135
 *
 * @param RemoveEquip
 * @text Remove Equip
 *
 * @param RemoveEquipIcon:num
 * @text Icon
 * @parent RemoveEquip
 * @desc Icon used for equipment removal.
 * @default 16
 *
 * @param RemoveEquipText:str
 * @text Text
 * @parent RemoveEquip
 * @desc Text used for equipment removal.
 * @default Remove
 *
 * @param ShiftShortcutKey:eval
 * @text Use SHIFT Shortcut?
 * @parent RemoveEquip
 * @type boolean
 * @on Use
 * @off Don't
 * @desc Add the "Shift" button as a shortcut key to removing items?
 * @default true

 * @param Rulings
 *
 * @param EquipAdjustHpMp:eval
 * @text Equip-Adjust HP/MP
 * @parent Rulings
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 * @default true
 * 
 * @param NonRemoveETypes:arraynum
 * @text Non-Removable Types
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc Insert ID's of the Equipment Types that must always have
 * an item equipped and cannot be empty.
 * @default []
 *
 * @param NonOptimizeETypes:arraynum
 * @text Non-Optomized Types
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc Insert ID's of the Equipment Types that will be ignored
 * when equipment is being optimized.
 * @default []
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistRemove:str
 * @text SHIFT: Remove
 * @parent ButtonAssist
 * @desc Button assist text used for the SHIFT Remove Shortcut.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default Unequip
 * 
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Shop Layout provided by this plugin?
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
 * @param Command
 * @text Command Window
 *
 * @param CmdHideDisabled:eval
 * @text Hide Unavailable?
 * @parent Command
 * @type boolean
 * @on Hide
 * @off Default
 * @desc Hide all unavailable commands like when a shop is set to Purchase Only?
 * @default true
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconBuy:num
 * @text Buy Icon
 * @parent Command
 * @desc The icon used for the Buy command.
 * @default 208
 *
 * @param CmdIconSell:num
 * @text Sell Icon
 * @parent Command
 * @desc The icon used for the Sell command.
 * @default 314
 *
 * @param CmdIconCancel:num
 * @text Cancel Icon
 * @parent Command
 * @desc The icon used for the Cancel command.
 * @default 82
 *
 * @param CmdCancelRename:str
 * @text Rename "Cancel"
 * @parent Command
 * @desc Rename Cancel to something more logical for the Shop Menu Scene.
 * @default Exit
 *
 * @param Prices
 *
 * @param SellPriceRate:num
 * @text Sell Price Rate
 * @parent Prices
 * @desc The default sell price rate.
 * @default 0.50
 *
 * @param BuyPriceJS:func
 * @text JS: Buy Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the buy price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 *
 * @param SellPriceJS:func
 * @text JS: Sell Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the sell price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 * 
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistSmallIncrement:str
 * @text Small Increment
 * @parent ButtonAssist
 * @desc Text used for changing amount bought/sold.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default -1/+1
 *
 * @param buttonAssistLargeIncrement:str
 * @text Large Increment
 * @parent ButtonAssist
 * @desc Text used for changing amount bought/sold.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default -10/+10
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Status Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusWindow:
 *
 * @param General
 *
 * @param Width:num
 * @text Window Width
 * @parent General
 * @desc The usual width of the status window.
 * @default 352
 *
 * @param ParamChangeFontSize:num
 * @text Parameter Font Size
 * @parent General
 * @desc Font size used for parameter changes.
 * @default 22
 *
 * @param Translucent:num
 * @text Translucent Opacity
 * @parent General
 * @desc Opacity setting used for translucent window objects.
 * @default 64
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param EquipData
 * @text Equipment Data
 *
 * @param AlreadyEquipMarker:str
 * @text Already Equipped
 * @parent EquipData
 * @desc Marker used to show an actor cannot equip an item.
 * @default E
 *
 * @param CannotEquipMarker:str
 * @text Can't Equip
 * @parent EquipData
 * @desc Marker used to show an actor cannot equip an item.
 * @default -
 *
 * @param NoChangeMarker:str
 * @text No Changes
 * @parent EquipData
 * @desc Marker used to show no changes have occurred.
 * @default -
 *
 * @param DrawEquipData:func
 * @text JS: Draw Equip Data
 * @parent EquipData
 * @type note
 * @desc Code used to draw the equipment data for the Shop Status Window.
 * @default "// Set Variables\nconst lineHeight = this.lineHeight();\nconst paramheight = this.gaugeLineHeight() + 8;\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name, Type, and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\nif (this.drawItemEquipType(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\n\n// Draw Parameter Names\nconst params = this.actorParams();\nconst backY = y;\ny = height - (params.length * paramheight) - 4;\nlet paramX = x;\nlet paramWidth = 0;\nlet tableY = y;\nfor (const paramId of params) {\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\n    y += paramheight;\n}\n\n// Draw Actor Data\nconst actorMax = $gameParty.maxBattleMembers();\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\nparamWidth = width - (actorWidth * actorMax);\nfor (const actor of $gameParty.battleMembers()) {\n    const index = $gameParty.battleMembers().indexOf(actor);\n    const actorX = paramX + paramWidth + (index * actorWidth);\n    this.changePaintOpacity(actor.canEquip(this._item));\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\n    let actorY = tableY;\n\n    // Draw Parameter Changes\n    for (const paramId of params) {\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\n        actorY += paramheight;\n    }\n}\n\n// Draw Back Rectangles\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\nfor (let i = 0; i < actorMax; i++) {\n    const actorX = paramX + paramWidth + (i * actorWidth);\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\n}\nfor (const paramId of params) {\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\n    for (let i = 0; i < actorMax; i++) {\n        const actorX = paramX + paramWidth + (i * actorWidth);\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\n    }\n    tableY += paramheight;\n}"
 *
 * @param ItemData
 * @text Item Data
 *
 * @param ItemGeneral
 * @parent ItemData
 *
 * @param MaxIcons:num
 * @text Max State/Buff Icons
 * @parent ItemGeneral
 * @desc Maximum number of icons that can be displayed for Add/Remove States/Buffs.
 * @default 8
 *
 * @param MultiplierStandard:num
 * @text Multiplier Standard
 * @parent ItemGeneral
 * @desc Constant standard to filter out random values when calculating the damage multiplier.
 * @default 1000000
 *
 * @param DrawItemData:func
 * @text JS: Draw Item Data
 * @parent ItemGeneral
 * @type note
 * @desc Code used to draw the item data for the Shop Status Window.
 * @default "const lineHeight = this.lineHeight();\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\n\n// Draw Main Item Properties\nif (this.drawItemConsumable(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\nif (this._item.occasion < 3) {\n    y = this.drawItemDamage(x, y, width);\n    y = this.drawItemEffects(x, y, width);\n}\ny = this.drawItemCustomEntries(x, y, width);\n\n// Draw Remaining Item Properties\nif (this._item.occasion < 3) {\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\n    if (this.drawItemHitType(x, y, hw)) y += 0;\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\n}\n\n// Fill Rest of the Window\nthis.drawItemDarkRect(x, y, width, height - y);"
 *
 * @param Vocabulary
 * @parent ItemData
 *
 * @param LabelConsume:str
 * @text Consumable
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Consumable
 *
 * @param Consumable:str
 * @text Yes
 * @parent LabelConsume:str
 * @desc Vocabulary used for this data entry.
 * @default ✔
 *
 * @param NotConsumable:str
 * @text No
 * @parent LabelConsume:str
 * @desc Vocabulary used for this data entry.
 * @default ✘
 *
 * @param Occasions
 * @parent Vocabulary
 *
 * @param Occasion0:str
 * @text Always
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Anytime Use
 *
 * @param Occasion1:str
 * @text Battle Screen
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Battle-Only
 *
 * @param Occasion2:str
 * @text Menu Screen
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Field-Only
 *
 * @param Occasion3:str
 * @text Never
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default -
 *
 * @param Scope
 * @parent Vocabulary
 *
 * @param Scope0:str
 * @text None
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default No Target
 *
 * @param Scope1:str
 * @text 1 Enemy
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 1 Foe
 *
 * @param Scope2:str
 * @text All Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default All Foes
 *
 * @param Scope3:str
 * @text 1 Random Enemy
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Random Foe
 *
 * @param Scope4:str
 * @text 2 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 2 Random Foes
 *
 * @param Scope5:str
 * @text 3 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 3 Random Foes
 *
 * @param Scope6:str
 * @text 4 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 4 Random Foes
 *
 * @param Scope7:str
 * @text 1 Ally
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 1 Ally
 *
 * @param Scope8:str
 * @text All Allies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Alive Allies
 *
 * @param Scope9:str
 * @text 1 Ally (Dead)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Dead Ally
 *
 * @param Scope10:str
 * @text All Allies (Dead)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Dead Allies
 *
 * @param Scope11:str
 * @text The User
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default User
 *
 * @param Scope12:str
 * @text 1 Ally (DoA)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Any Ally
 *
 * @param Scope13:str
 * @text All Allies (DoA)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default All Allies
 *
 * @param Scope14:str
 * @text Enemies & Allies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Everybody
 *
 * @param BattleCore
 * @text Battle Core Support
 * @parent Vocabulary
 *
 * @param ScopeRandomAny:str
 * @text x Random Any
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Any> notetag.
 * @default %1 Random Units
 *
 * @param ScopeRandomEnemies:str
 * @text x Random Enemies
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Enemies> notetag.
 * @default %1 Random Foes
 *
 * @param ScopeRandomAllies:str
 * @text x Random Allies
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Allies> notetag.
 * @default %1 Random Allies
 *
 * @param ScopeAlliesButUser:str
 * @text All Allies But User
 * @parent BattleCore
 * @desc Vocabulary used for <Target: All Allies But User> notetag.
 * @default Other Allies
 *
 * @param LabelSpeed:str
 * @text Speed
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Speed
 *
 * @param Speed2000:str
 * @text >= 2000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Fastest
 *
 * @param Speed1000:str
 * @text >= 1000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Faster
 *
 * @param Speed1:str
 * @text >= 1 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Fast
 *
 * @param Speed0:str
 * @text == 0 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Normal
 *
 * @param SpeedNeg999:str
 * @text >= -999 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slow
 *
 * @param SpeedNeg1999:str
 * @text >= -1999 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slower
 *
 * @param SpeedNeg2000:str
 * @text <= -2000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slowest
 *
 * @param LabelSuccessRate:str
 * @text Success Rate
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Accuracy
 *
 * @param LabelRepeats:str
 * @text Repeats
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Hits
 *
 * @param LabelHitType:str
 * @text Hit Type
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Type
 *
 * @param HitType0:str
 * @text Certain Hit
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Neutral
 *
 * @param HitType1:str
 * @text Physical
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Physical
 *
 * @param HitType2:str
 * @text Magical
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Magical
 *
 * @param LabelElement:str
 * @text Element
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Element
 *
 * @param ElementWeapon:str
 * @text Weapon-Based
 * @parent LabelElement:str
 * @desc Vocabulary used for this data entry.
 * @default \I[97]Weapon
 *
 * @param ElementNone:str
 * @text Nonelement Element
 * @parent LabelElement:str
 * @desc Vocabulary used for this data entry.
 * @default \I[160]No Element
 *
 * @param DamageType
 * @text Damage Type
 * @parent Vocabulary
 *
 * @param DamageType1:str
 * @text HP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Damage Multiplier
 *
 * @param DamageType2:str
 * @text MP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Damage Multiplier
 *
 * @param DamageType3:str
 * @text HP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType4:str
 * @text MP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType5:str
 * @text HP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Drain Multiplier
 *
 * @param DamageType6:str
 * @text MP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Drain Multiplier
 *
 * @param Effects
 * @parent Vocabulary
 *
 * @param LabelRecoverHP:str
 * @text Recover HP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelRecoverMP:str
 * @text Recover MP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelRecoverTP:str
 * @text Recover TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelSelfGainTP:str
 * @text Self Gain TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default User %1
 *
 * @param LabelDamageHP:str
 * @text Damage HP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelDamageMP:str
 * @text Damage MP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelDamageTP:str
 * @text Damage TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelApply:str
 * @text Add State/Buff
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default Applies
 *
 * @param LabelRemove:str
 * @text Remove State/Buff
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default Removes
 *
 */
//=============================================================================

const _0x3f76=['\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MaxHP\x20=\x200;\x20let\x20MaxMP\x20=\x200;\x20let\x20ATK\x20=\x200;\x20let\x20DEF\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MAT\x20=\x200;\x20let\x20MDF\x20=\x200;\x20let\x20AGI\x20=\x200;\x20let\x20LUK\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20[MaxHP,\x20MaxMP,\x20ATK,\x20DEF,\x20MAT,\x20MDF,\x20AGI,\x20LUK][paramId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20','drawNewLabelText','sJLnR','VisuMZ_0_CoreEngine','getItemRepeatsText','postCreateItemWindowModernControls','drawItemEffectsSelfTpGain','uHYCB','DrawPortraitJS','_calculatingJSParameters','_equips','checkShiftRemoveShortcut','boxWidth','yyIOa','updateHelp','getItemDamageAmountTextBattleCore','yivwt','commandSell','buffIconIndex','addLoadListener','JVgHd','commandBuy','center','ShopMenuStatusStandard','itypeId','uiHelpPosition','getItemEffectsMpRecoveryLabel','index','gcBPN','LabelRecoverTP','addCancelCommand','BiRVM','getItemConsumableLabel','AyjWO','W%1','Window_ShopCommand_initialize','clearNewLabelFromItem','repeats','Game_BattlerBase_param','Scene_Item_createCategoryWindow','ZLCho','refresh','Window_ShopSell_isEnabled','Scene_Equip_onSlotCancel','numItems','Param','isClearEquipOk','geUpdatedLayoutStatusWidth','auto','createItemWindow','Scene_Item_categoryWindowRect','getItemSpeedLabel','sellWindowRectItemsEquipsCore','FontSize','LabelRecoverHP','processCursorSpecialCheckModernControls','ItemSceneAdjustItemList','_buyWindowLastIndex','AlreadyEquipMarker','maxItemAmount','rFHoG','statusWidth','Step1End','_slotWindow','registerCommand','LabelElement','isEquipCommandEnabled','MaxMP','(+%1)','isClicked','dataId','getItemEffectsRemovedStatesBuffsText','update','commandEquip','maxCols','DTxRA','ARRAYEVAL','onDatabaseLoaded','lSmWw','itemTextAlign','flatHP','DrawItemData','onTouchCancel','setShopStatusWindowMode','gPADD','innerWidth','sellingPrice','drawing','ieECJ','gQbKW','removeState','Scene_Shop_onBuyCancel','HP\x20RECOVERY','wtypeId','adjustHiddenShownGoods','buttonAssistKey3','currentClass','IconSet','match','includes','_tempActorA','smallParamFontSize','nonRemovableEtypes','bUgPX','zPAAJ','AKgSa','determineBaseSellingPrice','PApjM','drawItemDarkRect','drawItemCustomEntries','czAMh','currencyUnit','cDYJw','Scene_Equip_commandEquip','GQkzr','windowPadding','fill','uiMenuStyle','SpeedNeg1999','onBuyCancel','toUpperCase','isShiftRemoveShortcutEnabled','createSlotWindow','calcWindowHeight','Window_Selectable_setHelpWindowItem','getItemSuccessRateText','getItemsEquipsCoreBackColor1','bxcaq','DamageType%1','Scene_Shop_commandWindowRect','CmdIconOptimize','Scene_Shop_sellingPrice','Step2End','pagedown','_resetFontSize','equipTypes','categoryNameWindowDrawBackground','categoryStyleCheck','commandNameWindowCenter','ScopeRandomAllies','addOptimizeCommand','hjmQC','aTQZM','wwEhf','cFKfB','damageColor','replace','resetTextColor','translucentOpacity','fontSizeRatio','ZHtpG','value2','LabelSelfGainTP','bind','isCursorMovable','meetsItemConditionsJS','UIabR','Translucent','setHandler','addClearCommand','JqkQJ','_slotId','drawItemDamageAmount','onCategoryCancelItemsEquipsCore','goldWindowRect','isOptimizeCommandEnabled','createNewLabelSprite','LmqAw','isPressed','StatusWindow','postCreateItemsEquipsCore','fillRect','OffsetY','KIQZo','hGOWW','itemAt','onBuyCancelItemsEquipsCore','LabelDamageTP','prepareNewEquipSlotsOnLoad','canConsumeItem','iXAHp','loadCharacter','trim','getItemEffectsRemovedStatesBuffsLabel','itemPadding','USER\x20TP\x20GAIN','ldDni','QUANTITY','giALv','xkIcr','hideNewLabelSprites','OVBWU','isEquipItem','weapon-%1','kVkeb','prototype','Game_BattlerBase_meetsItemConditions','DEF','indexOf','clear','aXhlN','Scene_Shop_commandBuy','onSlotOk','processDrawIcon','floor','BSLvo','Window_ItemList_colSpacing','ShowShopStatus','isClearCommandEnabled','%1%','xpaxE','postCreateSellWindowItemsEquipsCore','Categories','onSlotCancel','soFXR','_actor','lQXhB','drawIcon','iconText','getColor','getItemEffectsHpDamageLabel','initNewItemsList','getItemDamageElementText','optimizeEquipments','rHDBN','EJzct','iQhgl','IZsXf','lzbqW','iajep','NotConsumable','YWSFz','getMatchingInitEquip','getItemEffectsSelfTpGainLabel','rateMP','return\x200','_newLabelOpacityChange','MaxIcons','ScopeAlliesButUser','hide','drawItemEffectsTpRecovery','canEquip','EPhOM','BattleUsable','getItemEffectsMpRecoveryText','makeDeepCopy','updatedLayoutStyle','format','TP\x20RECOVERY','resetFontSettings','param','isClearCommandAdded','getItemHitTypeLabel','drawUpdatedParamName','GaeYF','commandBuyItemsEquipsCore','discardEquip','getItemColor','bwfph','buttonAssistLargeIncrement','initialize','getItemEffectsTpRecoveryLabel','removeDebuff','removeBuff','sKFTB','xTCOr','paramPlus','equipAdjustHpMp','setupItemDamageTempActors','evmVp','clearNewItem','round','drawItemSuccessRate','WhvED','EEoUq','getItemEffectsHpRecoveryText','sVIhN','XQWtP','SellPriceJS','EFFECT_REMOVE_BUFF','_categoryNameWindow','keyItem','isOpenAndActive','Step2Start','MAT','isPlaytest','pVrMJ','wMxcG','gainTP','#%1','OAdfF','fjULG','prepareItemCustomData','categoryStyle','MANUAL','commandStyle','Window_Selectable_initialize','gyeaI','isCancelled','actorParams','onMenuImageLoad','Whitelist','CmdCancelRename','REMOVED\x20EFFECTS','iTIGR','currentEquippedItem','hJNdz','BkbTN','itemEnableJS','Game_Actor_changeEquip','Icon','occasion','isSellCommandEnabled','drawItemStyleIcon','setNewItem','setCategory','deactivate','playCursorSound','onSlotOkAutoSelect','changeBuff','cMJpG','MaxArmors','Game_Actor_paramPlus','HIT\x20TYPE','activate','KmeEI','SpeedNeg2000','systemColor','getItemEffectsHpRecoveryLabel','EFFECT_ADD_DEBUFF','sSAQI','XtlXX','length','Scene_Equip_onActorChange','log','TpfcF','push','BorderRegExp','STRUCT','buy','equipSlots','PjfaP','Speed1','loadFaceImages','BjTUF','Lwxpn','ngsOU','KvSfQ','drawNewLabelIcon','isEnabled','isItem','Scene_Shop_createSellWindow','lwbME','CmdIconSell','setItemWindow','drawParamText','Nonconsumable','×%1','numberWindowRect','Speed2000','itemWindowRectItemsEquipsCore','EFFECT_GAIN_TP','tmjbN','equip2','MDF','(%1)','Scene_Equip_create','_purchaseOnly','getNextAvailableEtypeId','wNwEQ','BackRectColor','categoryWindowRectItemsEquipsCore','onSellOk','iKcUh','rateHP','HEQSa','0000','DrawEquipData','popScene','dHWBg','addEquipCommand','drawItemEffects','Scene_Equip_itemWindowRect','right','drawItemEffectsHpRecovery','isShiftShortcutKeyForRemove','clamp','_newItemsList','drawPossession','isEquipChangeOk','NgYnQ','elements','getTextColor','Scene_Item_create','MP\x20DAMAGE','textColor','isGoodShown','_item','makeCommandList','commandNameWindowDrawBackground','iconHeight','tGktf','Window_Selectable_refresh','categoryList','speed','AllWeapons','Scene_Shop_prepare','ShopScene','value1','_bypassNewLabel','getMenuImage','PurchaseOnly','changeEquipById','drawTextEx','_buyWindow','price','fontFace','uJhpe','addCommand','StatusWindowWidth','getItemRepeatsLabel','onCategoryOk','tmlvc','isEquipped','udOxs','AGI','bLxKY','updateMoneyAmount','getItemDamageAmountTextOriginal','addState','optimize','WeRCM','setTopRow','hoZgM','isOptimizeEquipOk','LabelRemove','mainAreaTop','refreshActorEquipSlotsIfUpdated','call','pOfwb','QoL','armor-%1','yfuoo','pYBtC','ozgwF','itemWindowRect','getItemEffectsMpDamageLabel','Scene_Equip_createSlotWindow','onActorChange','changeTextColor','tArgg','_shopStatusMenuMode','SPEED','_dummyWindow','LayoutStyle','DQkkg','maxItems','ATK','drawItemEffectsHpDamage','QezFb','values','rrVDF','DpiQg','lpbhC','drawItemEquipType','opacity','_newLabelSprites','tradeItemWithParty','TPSiS','createSellWindow','previousActor','hpRate','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','REPEAT','getItemEffectsTpDamageText','_customItemInfo','onTouchSelectModern','_commandWindow','makeItemData','Scene_Shop_commandSell','FontColor','text','cursorPageup','A%1','_tempActorB','tmalU','rvycj','xmBee','Damage\x20Formula\x20Error\x20for\x20%1','ARRAYSTRUCT','setObject','itemDataFontSize','AKhMD','itemLineRect','successRate','createCommandNameWindow','getItemEffectsTpRecoveryText','sell','JIGuI','process_VisuMZ_ItemsEquipsCore_Prices','kOOIO','drawItemActorMenuImage','isOptimizeCommandAdded','PPZAh','isHovered','statusWindowRect','canShiftRemoveEquipment','processCursorMoveModernControls','Game_Party_initialize','buttonAssistItemListRequirement','buttonAssistText3','smoothSelect','_statusWindow','NoChangeMarker','description','_goodsCount','fGYwp','Scene_Shop_sellWindowRect','isUseModernControls','drawItemCustomEntryLine','helpWindowRectItemsEquipsCore','dpbkA','iconIndex','playEquip','aiscz','ItemMenuStatusRect','isDrawItemNumber','down','CmdIconBuy','CommandAddClear','uwrTs','limitedPageUpDownSceneCheck','mLbfE','MP\x20RECOVERY','hBtau','RegularItems','prepare','mainAreaHeight','ElementNone','Game_Party_gainItem','setItem','value','ZQTWO','FadeSpeed','Window_EquipItem_isEnabled','drawItemEffectsAddedStatesBuffs','qOhau','qCPgu','cursorUp','cHoUU','cursorRight','addStateBuffChanges','placeNewLabel','process_VisuMZ_ItemsEquipsCore_EquipSlots','cursorLeft','getItemsEquipsCoreBackColor2','tQOGk','_handlers','IncludeShopItem','yRsyA','categoryNameWindowCenter','_categoryWindow','FadeLimit','sjPuQ','atk','activateSellWindow','BfzJV','drawItemKeyData','ScopeRandomAny','EquipScene','yeFjc','create','parameters','ElementWeapon','split','AllArmors','isShowNew','deselect','drawItemStyleIconText','isMainMenuCoreMenuImageOptionAvailable','drawItem','commandStyleCheck','isHandled','CqcQx','ItemQuantityFmt','addInnerChild','fYfzI','EquipParams','KeyItemProtect','MtgdP','ZHvOD','mainAreaBottom','getItemEffectsHpDamageText','map','_newLabelOpacity','HXbfx','LabelDamageMP','eGCGD','eFTOR','Settings','versionId','isWeapon','rgOJf','iULFm','drawUpdatedAfterParamValue','buyWindowRectItemsEquipsCore','shift','elementId','ParamValueFontSize','Game_Actor_tradeItemWithParty','txOrc','removeStateBuffChanges','PnsiG','lDEhQ','DaNKl','powerDownColor','NonRemoveETypes','releaseUnequippableItems','MenuPortraits','flatMP','AlwaysUsable','drawUpdatedBeforeParamValue','params','slotWindowRectItemsEquipsCore','equip','_commandNameWindow','RTHtT','playOkSound','commandName','ARRAYFUNC','RNhXo','buttonAssistSlotWindowShift','allowCreateStatusWindow','nRcbh','%1-%2','NNOUK','tpGain','drawItemEffectsMpDamage','version','processCursorHomeEndTrigger','Window_ItemCategory_setItemWindow','getItemDamageAmountLabelOriginal','ConvertParams','ARRAYSTR','FFDlO','addBuyCommand','Scene_Shop_activateSellWindow','select','buttonAssistCategory','fontSize','getItemDamageAmountLabelBattleCore','drawItemEffectsMpRecovery','placeItemNewLabel','item-%1','ShiftShortcutKey','prepareNextScene','getItemDamageElementLabel','updateCommandNameWindow','Window_EquipItem_includes','Window_ItemList_maxCols','+%1','shouldCommandWindowExist','CannotEquipMarker','Window_ItemList_drawItem','_resetFontColor','process_VisuMZ_ItemsEquipsCore_ParamValues','Width','EnTOU','convertInitEquipsToItems','commandSellItemsEquipsCore','yxOtE','updateCategoryNameWindow','height','drawItemScope','_data','AEDsO','Scene_Item_createItemWindow','onSellCancel','VRkqr','setHelpWindowItem','initNewLabelSprites','postCreateCategoryWindowItemsEquipsCore','VviXi','EnableLayout','LabelConsume','EFFECT_REMOVE_DEBUFF','YIscZ','CmdTextAlign','CmdIconClear','loadSystem','nonOptimizeEtypes','yLXpO','uiInputPosition','Enable','mainFontSize','buttonAssistKey1','clearEquipments','EFFECT_RECOVER_MP','bHUHR','addWindow','formula','kiPdk','createBitmap','process_VisuMZ_ItemsEquipsCore_RegExp','setStatusWindow','LabelSpeed','CoreEngine','paramchangeTextColor','Scene_Equip_slotWindowRect','TP\x20DAMAGE','Scene_Shop_numberWindowRect','drawParamName','JSON','Fcofc','aUtVq','initEquips','DAMAGE\x20MULTIPLIER','getItemScopeText','paramId','KkwdP','Scene_Shop_categoryWindowRect','_itemWindow','Game_Actor_discardEquip','prepareRefreshItemsEquipsCoreLayout','SQoMZ','rISaW','EYdnl','getItemHitTypeText','LabelSuccessRate','paintOpacity','createCategoryNameWindow','Scene_Shop_onSellOk','normalColor','drawItemEffectsRemovedStatesBuffs','EFFECT_ADD_STATE','cancel','hitType','playBuzzerSound','HkYPS','HHLBQ','getItemConsumableText','YLnFH','humiq','parse','commandWindowRect','processCursorMove','postCreateSlotWindowItemsEquipsCore','sellPriceRate','XPFAk','hYYRk','qfkhK','gghUg','isEquipCommandAdded','sqmXu','OffsetX','_scene','HiddenItemB','getItemEffectsTpDamageLabel','drawItemRepeats','addSellCommand','goldWindowRectItemsEquipsCore','DrawIcons','splice','qiWzd','paramPlusItemsEquipsCoreCustomJS','contentsBack','cursorPagedown','BXBtP','OAkAX','RegExp','KUHMz','lCpeF','getItemEffectsMpDamageText','drawItemDamage','status','XLVKs','_category','forceChangeEquip','_newLabelOpacityUpperLimit','process_VisuMZ_ItemsEquipsCore_ParamJS','maxVisibleItems','OEiyB','_goods','categoryNameWindowDrawText','drawItemNumber','commandNameWindowDrawText','Nlgkb','pVEuP','categoryWindowRect','getItemEffectsAddedStatesBuffsLabel','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','drawItemName','NonOptimizeETypes','sXeDo','Game_Actor_forceChangeEquip','nuPmo','IBZZe','onTouchOk','fZNKD','BHcgv','left','lxJFD','priceWidth','refreshItemsEquipsCoreNoMenuImage','upVRK','isRightInputMode','LUK','YOWai','damage','_tempActor','allowCommandWindowCursorUp','LabelDamageHP','AuqUM','isCommandEnabled','buttonAssistOffset3','FUNC','IptZE','_shopStatusMenuAlly','ARRAYNUM','+%1%','Step3Start','xMCTy','processShiftRemoveShortcut','wDrRO','scrollTo','onTouchSelect','effects','ARRAYJSON','createCategoryWindow','dErhx','Scene_Shop_onSellCancel','hitIndex','show','slotWindowRect','mhp','helpWindowRect','buyWindowRect','Window_Selectable_update','modifiedBuyPriceItemsEquipsCore','Scene_Item_itemWindowRect','daPce','?????','getInputMultiButtonStrings','isBottomHelpMode','\x5cI[%1]%2','smoothScrollTo','lineHeight','helpAreaHeight','_doubleTouch','FieldUsable','RtrUn','lEaYB','callUpdateHelp','rvcFu','VisuMZ_1_MainMenuCore','_buttonAssistWindow','iOXHX','isUseItemsEquipsCoreUpdatedLayout','xLGRm','armorTypes','exit','etypeId','getDamageStyle','ItemScene','HitType%1','process_VisuMZ_ItemsEquipsCore_Notetags','Step3End','DrawBackRect','max','newLabelEnabled','ADDED\x20EFFECTS','drawItemConsumable','scope','categories','isArmor','100%','gaugeBackColor','cZrPF','FGTLP','HP\x20DAMAGE','process_VisuMZ_ItemsEquipsCore_EnableJS','money','contents','Speed1000','ListWindowCols','Window_ShopBuy_refresh','Scene_Shop_goldWindowRect','gQeCw','eyZsx','colSpacing','category','name','drawEquipData','AllItems','KeyItems','isgqV','ItemQuantityFontSize','Scene_ItemBase_activateItemWindow','VisuMZ_1_BattleCore','kXhxs','consumable','nextActor','Window_ItemList_updateHelp','changeEquip','Scene_Shop_onCategoryCancel','type','bitmap','helpAreaTop','isTriggered','TTnlZ','meetsItemConditions','isHoverEnabled','RqTYD','members','buttonAssistSmallIncrement','constructor','_itemData','pageup','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','reloadMapIfUpdated','EFFECT_ADD_BUFF','_list','Window_EquipStatus_refresh','isOpen','ItemsEquipsCore','Window_ItemCategory_initialize','bestEquipItem','onCategoryCancel','powerUpColor','MAzSk','Consumable','getItemEffectsAddedStatesBuffsText','_money','Scene_Shop_create','Scene_Shop_createCategoryWindow','buttonAssistText1','MnLqI','Scene_Shop_statusWindowRect','getItemDamageAmountLabel','processTouchModernControls','note','getItemSuccessRateLabel','onSellOkItemsEquipsCore','buttonAssistText2','blt','\x5cI[%1]','sellWindowRect','textSizeEx','JgKKc','getItemSpeedText','_sellWindow','SUCCESS\x20RATE','SpeedNeg999','isRepeated','dACDJ','revertGlobalNamespaceVariables','Scene_Equip_commandWindowRect','statusWindowRectItemsEquipsCore','onTouchSelectModernControls','RemoveEquipText','characterName','bIaFM','adjustItemWidthByStatus','Scene_Load_reloadMapIfUpdated','paramJS','DrawFaceJS','DrawParamJS','MYJWU','isKeyItem','Scene_Boot_onDatabaseLoaded','activateItemWindow','active','STR','MaxItems','drawParamsItemsEquipsCore','icon','FontFace','cursorDown','textWidth','CONSUMABLE','changePaintOpacity','hQSTi','EFFECT_REMOVE_STATE','CommandAddOptimize','armor','NeverUsable','EYmlX','setMp','ExtDisplayedParams','actor','Scene_Shop_buyWindowRect','isBuyCommandEnabled','lSihO','numberWindowRectItemsEquipsCore','dbKGf','isNewItem','weaponTypes','drawItemData','Scope%1','paramValueByName','getItemQuantityText','iconWidth','meetsItemConditionsNotetags','eTMUr','drawItemSpeed','eptTv','pZGct','process_VisuMZ_ItemsEquipsCore_Category','mmp','loadPicture','HiddenItemA','_numberWindow','processHandling','visible','addChild','LabelHitType','LabelRepeats','drawItemEffectsTpDamage','isDualWield','mwNNt','<%1:[\x20]([\x5c+\x5c-]\x5cd+)>','currentSymbol','drawRemoveItem','XrOij','EquipAdjustHpMp','item','Step1Start','YsVIB','CmdStyle','buttonAssistKey2','Speed0','drawText','FSwcd','Hyswl','getItemDamageAmountText','equips','ceil','refreshCursor','drawItemDamageElement','lcieI','xIGxa','selfTP','BatchShop','New','commandWindowRectItemsEquipsCore','ParamChangeFontSize','width','hideDisabledCommands','checkItemConditionsSwitchNotetags'];(function(_0x39a9c5,_0x3f763f){const _0x415bc8=function(_0x37c187){while(--_0x37c187){_0x39a9c5['push'](_0x39a9c5['shift']());}};_0x415bc8(++_0x3f763f);}(_0x3f76,0x156));const _0x415b=function(_0x39a9c5,_0x3f763f){_0x39a9c5=_0x39a9c5-0x0;let _0x415bc8=_0x3f76[_0x39a9c5];return _0x415bc8;};var label='ItemsEquipsCore',tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x578569){return _0x578569[_0x415b('0x1b0')]&&_0x578569[_0x415b('0xac')][_0x415b('0x326')]('['+label+']');})[0x0];VisuMZ[label][_0x415b('0x101')]=VisuMZ[label][_0x415b('0x101')]||{},VisuMZ['ConvertParams']=function(_0x157486,_0x50ac14){for(const _0xa20ea5 in _0x50ac14){if('IfFBK'!==_0x415b('0x167')){if(_0xa20ea5[_0x415b('0x325')](/(.*):(.*)/i)){const _0x57495c=String(RegExp['$1']),_0x2ceaff=String(RegExp['$2'])[_0x415b('0x33b')]()[_0x415b('0x379')]();let _0x86c1bc,_0x2b7338,_0x5458eb;switch(_0x2ceaff){case'NUM':_0x86c1bc=_0x50ac14[_0xa20ea5]!==''?Number(_0x50ac14[_0xa20ea5]):0x0;break;case _0x415b('0x1dc'):_0x2b7338=_0x50ac14[_0xa20ea5]!==''?JSON[_0x415b('0x191')](_0x50ac14[_0xa20ea5]):[],_0x86c1bc=_0x2b7338[_0x415b('0xfb')](_0x4f811e=>Number(_0x4f811e));break;case'EVAL':_0x86c1bc=_0x50ac14[_0xa20ea5]!==''?eval(_0x50ac14[_0xa20ea5]):null;break;case _0x415b('0x30f'):_0x2b7338=_0x50ac14[_0xa20ea5]!==''?JSON[_0x415b('0x191')](_0x50ac14[_0xa20ea5]):[],_0x86c1bc=_0x2b7338[_0x415b('0xfb')](_0x4c9e0f=>eval(_0x4c9e0f));break;case _0x415b('0x172'):_0x86c1bc=_0x50ac14[_0xa20ea5]!==''?JSON[_0x415b('0x191')](_0x50ac14[_0xa20ea5]):'';break;case _0x415b('0x1e5'):_0x2b7338=_0x50ac14[_0xa20ea5]!==''?JSON[_0x415b('0x191')](_0x50ac14[_0xa20ea5]):[],_0x86c1bc=_0x2b7338['map'](_0x1e3db3=>JSON[_0x415b('0x191')](_0x1e3db3));break;case _0x415b('0x1d9'):_0x86c1bc=_0x50ac14[_0xa20ea5]!==''?new Function(JSON['parse'](_0x50ac14[_0xa20ea5])):new Function(_0x415b('0x3ae'));break;case _0x415b('0x11f'):_0x2b7338=_0x50ac14[_0xa20ea5]!==''?JSON[_0x415b('0x191')](_0x50ac14[_0xa20ea5]):[],_0x86c1bc=_0x2b7338[_0x415b('0xfb')](_0x2a7275=>new Function(JSON[_0x415b('0x191')](_0x2a7275)));break;case _0x415b('0x276'):_0x86c1bc=_0x50ac14[_0xa20ea5]!==''?String(_0x50ac14[_0xa20ea5]):'';break;case _0x415b('0x12d'):_0x2b7338=_0x50ac14[_0xa20ea5]!==''?JSON[_0x415b('0x191')](_0x50ac14[_0xa20ea5]):[],_0x86c1bc=_0x2b7338[_0x415b('0xfb')](_0xea6b32=>String(_0xea6b32));break;case _0x415b('0x415'):_0x5458eb=_0x50ac14[_0xa20ea5]!==''?JSON[_0x415b('0x191')](_0x50ac14[_0xa20ea5]):{},_0x157486[_0x57495c]={},VisuMZ[_0x415b('0x12c')](_0x157486[_0x57495c],_0x5458eb);continue;case _0x415b('0x93'):_0x2b7338=_0x50ac14[_0xa20ea5]!==''?JSON[_0x415b('0x191')](_0x50ac14[_0xa20ea5]):[],_0x86c1bc=_0x2b7338[_0x415b('0xfb')](_0x52e366=>VisuMZ['ConvertParams']({},JSON[_0x415b('0x191')](_0x52e366)));break;default:continue;}_0x157486[_0x57495c]=_0x86c1bc;}}else{function _0x5ced19(){this[_0x415b('0xb0')]()?this['onTouchSelectModern'](!![]):_0x43d04a['prototype'][_0x415b('0x1e3')]['call'](this,_0x5bdb5f);}}}return _0x157486;},(_0x26fc94=>{const _0x54e265=_0x26fc94['name'];for(const _0x3be11e of dependencies){if(!Imported[_0x3be11e]){alert(_0x415b('0x240')[_0x415b('0x3ba')](_0x54e265,_0x3be11e)),SceneManager[_0x415b('0x206')]();break;}}const _0xf2120c=_0x26fc94[_0x415b('0xac')];if(_0xf2120c[_0x415b('0x325')](/\[Version[ ](.*?)\]/i)){if(_0x415b('0x32e')==='rBfOa'){function _0x5b55b9(){const _0x37016b=this[_0x415b('0x3ea')](),_0x35d3a6=_0xf62aba['ItemsEquipsCore'][_0x415b('0x101')][_0x415b('0x41')][_0x415b('0xb')],_0x1d73ae=_0x37016b===_0x415b('0x8b')?_0x1fd9fb[_0x415b('0x9b')]:_0x415b('0x1f6')[_0x415b('0x3ba')](_0x35d3a6,_0x5cab9d['sell']),_0x12da0d=this[_0x415b('0x3fb')]();if(this['hideDisabledCommands']()&&!_0x12da0d)return;this[_0x415b('0x4c')](_0x1d73ae,_0x415b('0x9b'),_0x12da0d);}}else{const _0x445bee=Number(RegExp['$1']);_0x445bee!==VisuMZ[label][_0x415b('0x128')]&&(alert(_0x415b('0x1c0')[_0x415b('0x3ba')](_0x54e265,_0x445bee)),SceneManager[_0x415b('0x206')]());}}if(_0xf2120c['match'](/\[Tier[ ](\d+)\]/i)){if(_0x415b('0x1fc')===_0x415b('0x3cb')){function _0x2b9258(){const _0x250b3e=this[_0x415b('0x97')](_0x5a2da6),_0x57fd3f=this[_0x415b('0x11e')](_0x2708d7),_0x27861a=this[_0x415b('0x25d')](_0x57fd3f)['width'];this[_0x415b('0x27e')](this[_0x415b('0x1d7')](_0x3b214e));const _0x3cbecd=this['itemTextAlign']();if(_0x3cbecd==='right')this[_0x415b('0x47')](_0x57fd3f,_0x250b3e['x']+_0x250b3e[_0x415b('0x2c0')]-_0x27861a,_0x250b3e['y'],_0x27861a);else{if(_0x3cbecd===_0x415b('0x2d9')){const _0x24aee8=_0x250b3e['x']+_0x8abc6a[_0x415b('0x38f')]((_0x250b3e[_0x415b('0x2c0')]-_0x27861a)/0x2);this[_0x415b('0x47')](_0x57fd3f,_0x24aee8,_0x250b3e['y'],_0x27861a);}else this[_0x415b('0x47')](_0x57fd3f,_0x250b3e['x'],_0x250b3e['y'],_0x27861a);}}}else{const _0x457b08=Number(RegExp['$1']);_0x457b08<tier?(alert(_0x415b('0x82')[_0x415b('0x3ba')](_0x54e265,_0x457b08,tier)),SceneManager[_0x415b('0x206')]()):tier=Math['max'](_0x457b08,tier);}}VisuMZ[_0x415b('0x12c')](VisuMZ[label][_0x415b('0x101')],_0x26fc94[_0x415b('0xe6')]);})(pluginData),PluginManager[_0x415b('0x303')](pluginData[_0x415b('0x225')],_0x415b('0x2bc'),_0x35d960=>{VisuMZ[_0x415b('0x12c')](_0x35d960,_0x35d960);const _0x4543da=[],_0x5a89c6=_0x35d960['Blacklist']['map'](_0x279ce8=>_0x279ce8[_0x415b('0x33b')]()[_0x415b('0x379')]()),_0xaa97a5=_0x35d960[_0x415b('0x3f0')][_0x415b('0xfb')](_0x49e3ed=>_0x49e3ed['toUpperCase']()['trim']()),_0x375566=_0x35d960[_0x415b('0x301')]>=_0x35d960[_0x415b('0x2ac')]?_0x35d960[_0x415b('0x2ac')]:_0x35d960[_0x415b('0x301')],_0x19f5fc=_0x35d960['Step1End']>=_0x35d960[_0x415b('0x2ac')]?_0x35d960[_0x415b('0x301')]:_0x35d960[_0x415b('0x2ac')],_0x3c9b4d=Array(_0x19f5fc-_0x375566+0x1)['fill']()[_0x415b('0xfb')]((_0x8dea20,_0x82a62c)=>_0x375566+_0x82a62c);for(const _0x15b5b of _0x3c9b4d){const _0x11e8fb=$dataItems[_0x15b5b];if(!_0x11e8fb)continue;if(!VisuMZ[_0x415b('0x246')][_0x415b('0xd8')](_0x11e8fb,_0x5a89c6,_0xaa97a5))continue;_0x4543da['push']([0x0,_0x15b5b,0x0,_0x11e8fb[_0x415b('0x49')]]);}const _0xe8992=_0x35d960[_0x415b('0x347')]>=_0x35d960[_0x415b('0x3de')]?_0x35d960['Step2Start']:_0x35d960['Step2End'],_0x88e68a=_0x35d960['Step2End']>=_0x35d960[_0x415b('0x3de')]?_0x35d960['Step2End']:_0x35d960[_0x415b('0x3de')],_0x48033a=Array(_0x88e68a-_0xe8992+0x1)[_0x415b('0x337')]()[_0x415b('0xfb')]((_0x26d17c,_0x81b827)=>_0xe8992+_0x81b827);for(const _0x4f2da4 of _0x48033a){if(_0x415b('0x158')!==_0x415b('0x158')){function _0xc0c163(){this[_0x415b('0x24e')]=_0x36d49f[_0x415b('0x19d')][_0x415b('0x21b')]();}}else{const _0x161d10=$dataWeapons[_0x4f2da4];if(!_0x161d10)continue;if(!VisuMZ[_0x415b('0x246')][_0x415b('0xd8')](_0x161d10,_0x5a89c6,_0xaa97a5))continue;_0x4543da[_0x415b('0x413')]([0x1,_0x4f2da4,0x0,_0x161d10[_0x415b('0x49')]]);}}const _0x5a3a07=_0x35d960[_0x415b('0x20c')]>=_0x35d960['Step3Start']?_0x35d960[_0x415b('0x1de')]:_0x35d960[_0x415b('0x20c')],_0x10a3e0=_0x35d960[_0x415b('0x20c')]>=_0x35d960['Step3Start']?_0x35d960['Step3End']:_0x35d960[_0x415b('0x1de')],_0x473607=Array(_0x10a3e0-_0x5a3a07+0x1)[_0x415b('0x337')]()[_0x415b('0xfb')]((_0x5c4c38,_0x5ac8fe)=>_0x5a3a07+_0x5ac8fe);for(const _0x4121ed of _0x473607){if(_0x415b('0x190')!==_0x415b('0x32a')){const _0xc3d4d7=$dataArmors[_0x4121ed];if(!_0xc3d4d7)continue;if(!VisuMZ[_0x415b('0x246')][_0x415b('0xd8')](_0xc3d4d7,_0x5a89c6,_0xaa97a5))continue;_0x4543da[_0x415b('0x413')]([0x2,_0x4121ed,0x0,_0xc3d4d7[_0x415b('0x49')]]);}else{function _0x534517(){return _0x43a98f[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0x36c')]['Speed0'];}}}SceneManager['push'](Scene_Shop),SceneManager[_0x415b('0x139')](_0x4543da,_0x35d960[_0x415b('0x45')]);}),VisuMZ[_0x415b('0x246')][_0x415b('0xd8')]=function(_0x526df4,_0x3469f7,_0x124d33){if(_0x526df4[_0x415b('0x225')][_0x415b('0x379')]()==='')return![];if(_0x526df4[_0x415b('0x225')][_0x415b('0x325')](/-----/i))return![];const _0x57df35=_0x526df4[_0x415b('0x213')];if(_0x3469f7[_0x415b('0x40f')]>0x0){if(_0x415b('0x297')!==_0x415b('0x297')){function _0x5b8f9b(){const _0x4110c8=this[_0x415b('0x1a')](_0xb0f53b);if(_0x4110c8<0x0)return;const _0x4830fd=_0x3709b9===0x1?_0x595469[_0x4810ce]:_0x2916c1[_0x233bc8];this[_0x415b('0x231')](_0x4110c8,_0x4830fd);}}else for(const _0x561ebc of _0x3469f7){if(!_0x561ebc)continue;if(_0x57df35[_0x415b('0x326')](_0x561ebc))return![];}}if(_0x124d33['length']>0x0){if(_0x415b('0x1aa')===_0x415b('0x1f2')){function _0x5e6e35(){this[_0x415b('0x2cc')]=!![];const _0x56b4fe=_0x1a6cf4[_0x415b('0x246')][_0x415b('0x26e')][_0x35cd6d][_0x415b('0x60')](this,_0x4c51dc,_0x168186);return this[_0x415b('0x2cc')]=![],_0x56b4fe;}}else{for(const _0x214498 of _0x124d33){if(!_0x214498)continue;if(_0x57df35[_0x415b('0x326')](_0x214498))return!![];}return![];}}return!![];},VisuMZ[_0x415b('0x246')][_0x415b('0x273')]=Scene_Boot[_0x415b('0x386')]['onDatabaseLoaded'],Scene_Boot[_0x415b('0x386')][_0x415b('0x310')]=function(){VisuMZ[_0x415b('0x246')]['Scene_Boot_onDatabaseLoaded']['call'](this),this[_0x415b('0x169')](),this[_0x415b('0x20b')]();},Scene_Boot[_0x415b('0x386')][_0x415b('0x169')]=function(){VisuMZ[_0x415b('0x246')][_0x415b('0x1ab')]={},VisuMZ[_0x415b('0x246')]['RegExp']['EquipParams']=[],VisuMZ['ItemsEquipsCore'][_0x415b('0x1ab')][_0x415b('0x414')]=[];const _0x5d4bae=['MaxHP',_0x415b('0x306'),_0x415b('0x73'),_0x415b('0x388'),_0x415b('0x3df'),_0x415b('0x16'),_0x415b('0x53'),_0x415b('0x1d0')];for(const _0x3ca8a6 of _0x5d4bae){const _0x51db4c=_0x415b('0x2a6')['format'](_0x3ca8a6);VisuMZ[_0x415b('0x246')][_0x415b('0x1ab')][_0x415b('0xf5')][_0x415b('0x413')](new RegExp(_0x51db4c,'i'));const _0x3ad02d='\x5cb%1\x5cb'[_0x415b('0x3ba')](_0x3ca8a6);VisuMZ[_0x415b('0x246')][_0x415b('0x1ab')][_0x415b('0x414')][_0x415b('0x413')](new RegExp(_0x3ad02d,'g'));}},Scene_Boot[_0x415b('0x386')][_0x415b('0x20b')]=function(){this[_0x415b('0xd3')]();const _0x2f2e5a=[$dataItems,$dataWeapons,$dataArmors];for(const _0xff580a of _0x2f2e5a){if('VRkqr'!==_0x415b('0x150')){function _0x2e42cd(){this[_0x415b('0x28f')]();}}else for(const _0x4c640f of _0xff580a){if(!_0x4c640f)continue;this['process_VisuMZ_ItemsEquipsCore_Category'](_0x4c640f,_0xff580a),this[_0x415b('0x9d')](_0x4c640f,_0xff580a),this[_0x415b('0x143')](_0x4c640f,_0xff580a),this[_0x415b('0x1b5')](_0x4c640f,_0xff580a),this[_0x415b('0x21a')](_0x4c640f,_0xff580a);}}},Scene_Boot[_0x415b('0x386')][_0x415b('0xd3')]=function(){for(const _0x1d18fd of $dataClasses){if(_0x415b('0x37f')===_0x415b('0x3f6')){function _0x3ab695(){_0x8f6024['price']=_0x2b644b(_0x319fb7['$1']);}}else{if(!_0x1d18fd)continue;_0x1d18fd[_0x415b('0x417')]=[];if(_0x1d18fd[_0x415b('0x256')][_0x415b('0x325')](/<EQUIP SLOTS>\s*([\s\S]*)\s*<\/EQUIP SLOTS>/i)){const _0x15a434=String(RegExp['$1'])['split'](/[\r\n]+/);for(const _0x2b26a4 of _0x15a434){if(_0x415b('0x1b7')!==_0x415b('0x8f')){const _0x62a31f=$dataSystem[_0x415b('0x34a')][_0x415b('0x389')](_0x2b26a4[_0x415b('0x379')]());if(_0x62a31f>0x0)_0x1d18fd['equipSlots'][_0x415b('0x413')](_0x62a31f);}else{function _0x53df77(){return this[_0x415b('0x203')]()?this['slotWindowRectItemsEquipsCore']():_0x18b174[_0x415b('0x246')][_0x415b('0x16e')]['call'](this);}}}}else for(const _0x317019 of $dataSystem[_0x415b('0x34a')]){if(_0x415b('0x380')!==_0x415b('0x380')){function _0x2ea47a(){return _0x2d1474[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0xe3')]['CmdTextAlign'];}}else{const _0x2435c6=$dataSystem[_0x415b('0x34a')]['indexOf'](_0x317019[_0x415b('0x379')]());if(_0x2435c6>0x0)_0x1d18fd[_0x415b('0x417')][_0x415b('0x413')](_0x2435c6);}}}}},Scene_Boot['prototype'][_0x415b('0x299')]=function(_0x156ac9,_0x2e55c8){_0x156ac9[_0x415b('0x213')]=[];const _0x2b91d1=_0x156ac9[_0x415b('0x256')],_0x546578=_0x2b91d1['match'](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x546578){if(_0x415b('0x6c')!==_0x415b('0x335'))for(const _0x3e6435 of _0x546578){_0x3e6435[_0x415b('0x325')](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x2efbe6=String(RegExp['$1'])[_0x415b('0x33b')]()[_0x415b('0x379')]()['split'](',');for(const _0x431c2e of _0x2efbe6){_0x156ac9[_0x415b('0x213')][_0x415b('0x413')](_0x431c2e[_0x415b('0x379')]());}}else{function _0xa8fabc(){return this[_0x415b('0x3b9')]()[_0x415b('0x325')](/RIGHT/i);}}}if(_0x2b91d1[_0x415b('0x325')](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){const _0x5be664=RegExp['$1']['split'](/[\r\n]+/);for(const _0x1afd2c of _0x5be664){_0x156ac9[_0x415b('0x213')][_0x415b('0x413')](_0x1afd2c[_0x415b('0x33b')]()[_0x415b('0x379')]());}}},Scene_Boot[_0x415b('0x386')][_0x415b('0x9d')]=function(_0x5181c6,_0x47556a){_0x5181c6[_0x415b('0x256')][_0x415b('0x325')](/<PRICE:[ ](\d+)>/i)&&(_0x5181c6[_0x415b('0x49')]=Number(RegExp['$1']));},Scene_Boot[_0x415b('0x386')][_0x415b('0x143')]=function(_0xb3d12a,_0x104bd1){if(_0x104bd1===$dataItems)return;for(let _0x83804d=0x0;_0x83804d<0x8;_0x83804d++){const _0x400b23=VisuMZ[_0x415b('0x246')][_0x415b('0x1ab')]['EquipParams'][_0x83804d];_0xb3d12a[_0x415b('0x256')][_0x415b('0x325')](_0x400b23)&&(_0xb3d12a['params'][_0x83804d]=parseInt(RegExp['$1']));}},VisuMZ[_0x415b('0x246')][_0x415b('0x26e')]={},Scene_Boot[_0x415b('0x386')]['process_VisuMZ_ItemsEquipsCore_ParamJS']=function(_0x29a5b8,_0xd3ae08){if(_0xd3ae08===$dataItems)return;if(_0x29a5b8[_0x415b('0x256')][_0x415b('0x325')](/<JS PARAMETERS>\s*([\s\S]*)\s*<\/JS PARAMETERS>/i)){const _0x56d6bf=String(RegExp['$1']),_0x326c08=(_0xd3ae08===$dataWeapons?_0x415b('0x2e5'):_0x415b('0x8d'))['format'](_0x29a5b8['id']),_0x355228=_0x415b('0x2c3')[_0x415b('0x3ba')](_0x56d6bf);for(let _0x9fa552=0x0;_0x9fa552<0x8;_0x9fa552++){if(_0x415b('0xf7')!==_0x415b('0xf7')){function _0x262e0a(){this[_0x415b('0x87')][_0x415b('0xa9')](0x0),this[_0x415b('0x302')]['deactivate']();}}else{if(_0x56d6bf['match'](VisuMZ[_0x415b('0x246')]['RegExp'][_0x415b('0x414')][_0x9fa552])){const _0x515920=_0x415b('0x124')[_0x415b('0x3ba')](_0x326c08,_0x9fa552);VisuMZ[_0x415b('0x246')][_0x415b('0x26e')][_0x515920]=new Function(_0x415b('0x2ab'),_0x415b('0x178'),_0x355228);}}}}},VisuMZ[_0x415b('0x246')][_0x415b('0x3f7')]={},Scene_Boot[_0x415b('0x386')][_0x415b('0x21a')]=function(_0x2ec435,_0x15b39a){if(_0x15b39a!==$dataItems)return;if(_0x2ec435[_0x415b('0x256')][_0x415b('0x325')](/<JS ITEM ENABLE>\s*([\s\S]*)\s*<\/JS ITEM ENABLE>/i)){const _0x128aa1=String(RegExp['$1']),_0x15f401='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'['format'](_0x128aa1);VisuMZ[_0x415b('0x246')][_0x415b('0x3f7')][_0x2ec435['id']]=new Function(_0x415b('0x2ab'),_0x15f401);}},DataManager['isKeyItem']=function(_0x15a9da){return this[_0x415b('0x8')](_0x15a9da)&&_0x15a9da[_0x415b('0x2db')]===0x2;},DataManager[_0x415b('0x2fe')]=function(_0x2945de){if(!_0x2945de)return 0x63;else return _0x2945de[_0x415b('0x256')][_0x415b('0x325')](/<MAX:[ ](\d+)>/i)?parseInt(RegExp['$1']):this['defaultItemMax'](_0x2945de);},DataManager['defaultItemMax']=function(_0x1a020e){if(this[_0x415b('0x8')](_0x1a020e)){if(_0x415b('0x284')===_0x415b('0x71')){function _0x20383e(){return this[_0x415b('0x201')][_0x415b('0x2c0')]/0x5/-0x3;}}else return VisuMZ[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0x209')][_0x415b('0x277')];}else{if(this[_0x415b('0x103')](_0x1a020e))return VisuMZ['ItemsEquipsCore'][_0x415b('0x101')]['ItemScene']['MaxWeapons'];else{if(this[_0x415b('0x214')](_0x1a020e)){if(_0x415b('0x50')===_0x415b('0x204')){function _0x49346c(){const _0x1f16d5=_0x2d594a[_0x415b('0x191')]('['+_0x542c78['$1'][_0x415b('0x325')](/\d+/g)+']');for(const _0x16f334 of _0x1f16d5){if(!_0xe2538['value'](_0x16f334))return![];}}}else return VisuMZ[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0x209')][_0x415b('0x404')];}}}},ColorManager[_0x415b('0x3c4')]=function(_0x3cebba){if(!_0x3cebba)return this[_0x415b('0x186')]();else{if(_0x3cebba[_0x415b('0x256')][_0x415b('0x325')](/<COLOR:[ ](\d+)>/i))return this[_0x415b('0x35')](Number(RegExp['$1'])['clamp'](0x0,0x1f));else return _0x3cebba[_0x415b('0x256')][_0x415b('0x325')](/<COLOR:[ ]#(.*)>/i)?'#'+String(RegExp['$1']):this['normalColor']();}},ColorManager[_0x415b('0x39e')]=function(_0xb78dba){return _0xb78dba['match'](/#(.*)/i)?_0x415b('0x3e4')[_0x415b('0x3ba')](String(RegExp['$1'])):this[_0x415b('0x35')](Number(_0xb78dba));},Game_Temp[_0x415b('0x386')][_0x415b('0x20f')]=function(){if(this[_0x415b('0x43')])return![];return VisuMZ[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0x2bd')][_0x415b('0x15f')];},VisuMZ['ShopMenuStatusStandard']=VisuMZ[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0x36c')]['MultiplierStandard'],VisuMZ[_0x415b('0x246')]['Game_BattlerBase_param']=Game_BattlerBase[_0x415b('0x386')][_0x415b('0x3bd')],Game_BattlerBase['prototype'][_0x415b('0x3bd')]=function(_0x1fff73){if(this[_0x415b('0x6d')])return this[_0x415b('0x1db')]?VisuMZ[_0x415b('0x2da')]:0x1;else{if(_0x415b('0x30')===_0x415b('0x295')){function _0x45953a(){this[_0x415b('0x302')][_0x415b('0xa9')](0x0),this[_0x415b('0x302')][_0x415b('0x407')]();}}else return VisuMZ[_0x415b('0x246')][_0x415b('0x2e9')][_0x415b('0x60')](this,_0x1fff73);}},VisuMZ[_0x415b('0x246')][_0x415b('0x387')]=Game_BattlerBase[_0x415b('0x386')][_0x415b('0x238')],Game_BattlerBase['prototype'][_0x415b('0x238')]=function(_0x158e02){if(!_0x158e02)return![];if(!VisuMZ[_0x415b('0x246')][_0x415b('0x387')][_0x415b('0x60')](this,_0x158e02))return![];if(!this[_0x415b('0x294')](_0x158e02))return![];if(!this[_0x415b('0x35e')](_0x158e02))return![];return!![];},Game_BattlerBase[_0x415b('0x386')][_0x415b('0x294')]=function(_0x33d8df){if(!this[_0x415b('0x2c2')](_0x33d8df))return![];return!![];},Game_BattlerBase[_0x415b('0x386')][_0x415b('0x2c2')]=function(_0x4d13af){const _0x4cdda4=_0x4d13af[_0x415b('0x256')];if(_0x4cdda4[_0x415b('0x325')](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4effeb=JSON[_0x415b('0x191')]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x38299b of _0x4effeb){if(!$gameSwitches[_0x415b('0xc7')](_0x38299b))return![];}return!![];}if(_0x4cdda4['match'](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x415b('0x1ff')===_0x415b('0x1ff')){const _0x19c1b1=JSON['parse']('['+RegExp['$1'][_0x415b('0x325')](/\d+/g)+']');for(const _0x196e46 of _0x19c1b1){if(_0x415b('0x2ba')!==_0x415b('0x2ba')){function _0x343ca3(){_0x4616d8[_0x415b('0x246')][_0x415b('0x38c')][_0x415b('0x60')](this),this[_0x415b('0x203')]()&&this[_0x415b('0x3c2')]();}}else{if(!$gameSwitches[_0x415b('0xc7')](_0x196e46))return![];}}return!![];}else{function _0x18e748(){_0x9d5cbd=_0x5a54a8['weaponTypes'][_0x14b82e(_0x388fe5['$1'])]||'';}}}if(_0x4cdda4['match'](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x41221f=JSON[_0x415b('0x191')]('['+RegExp['$1'][_0x415b('0x325')](/\d+/g)+']');for(const _0x9b4f76 of _0x41221f){if($gameSwitches[_0x415b('0xc7')](_0x9b4f76))return!![];}return![];}if(_0x4cdda4['match'](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x415b('0x14d')===_0x415b('0x14d')){const _0x1b7af6=JSON[_0x415b('0x191')]('['+RegExp['$1'][_0x415b('0x325')](/\d+/g)+']');for(const _0x2f778b of _0x1b7af6){if(!$gameSwitches[_0x415b('0xc7')](_0x2f778b))return!![];}return![];}else{function _0x13e88e(){this[_0x415b('0x2fc')]=this[_0x415b('0x48')][_0x415b('0x2de')](),this[_0x415b('0x48')][_0x415b('0x1ea')](),this[_0x415b('0x48')][_0x415b('0xeb')](),this[_0x415b('0x48')]['smoothScrollTo'](0x0,0x0),this[_0x415b('0xaa')][_0x415b('0x1ea')](),this[_0x415b('0x6f')][_0x415b('0x3b2')]();}}}if(_0x4cdda4[_0x415b('0x325')](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x339191=JSON[_0x415b('0x191')]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x44b8e0 of _0x339191){if(!$gameSwitches[_0x415b('0xc7')](_0x44b8e0))return!![];}return![];}if(_0x4cdda4['match'](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x415b('0x2b3')!==_0x415b('0x2b3')){function _0x3ca79d(){const _0x3ad9f1=_0x277b00+(this[_0x415b('0x1f8')]()-_0x43fa46[_0x415b('0x3a')])/0x2,_0xf5f6e7=_0x5e4574[_0x415b('0x293')]+0x4,_0x4ee172=_0x17a43d['max'](0x0,_0x1ff872-_0xf5f6e7);this['changeTextColor'](_0x3204a6['getItemColor'](_0x1f9980)),this[_0x415b('0x39c')](_0x46e851['iconIndex'],_0x5b8ed2,_0x3ad9f1),this['drawText'](_0x2e6399['name'],_0x2dc893+_0xf5f6e7,_0xf9f06d,_0x4ee172),this[_0x415b('0x356')]();}}else{const _0x282124=JSON[_0x415b('0x191')]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x16fdbb of _0x282124){if($gameSwitches[_0x415b('0xc7')](_0x16fdbb))return![];}return!![];}}return!![];},Game_BattlerBase[_0x415b('0x386')][_0x415b('0x35e')]=function(_0x20eea2){const _0x16f5fb=_0x20eea2['note'],_0x5ca3a7=VisuMZ[_0x415b('0x246')][_0x415b('0x3f7')];if(_0x5ca3a7[_0x20eea2['id']]){if(_0x415b('0x2d0')===_0x415b('0x2b9')){function _0x511775(){if(_0x4fcec8===_0x5de48e)return;for(let _0x3e6faf=0x0;_0x3e6faf<0x8;_0x3e6faf++){const _0x2d4131=_0x2bfe55[_0x415b('0x246')][_0x415b('0x1ab')]['EquipParams'][_0x3e6faf];_0x2e53f0[_0x415b('0x256')][_0x415b('0x325')](_0x2d4131)&&(_0xb675ad[_0x415b('0x118')][_0x3e6faf]=_0xf36f2a(_0x3e4abb['$1']));}}}else return _0x5ca3a7[_0x20eea2['id']][_0x415b('0x60')](this,_0x20eea2);}else return!![];},Game_Actor[_0x415b('0x386')][_0x415b('0x175')]=function(_0x16477e){_0x16477e=this[_0x415b('0x146')](_0x16477e);const _0x3df508=this[_0x415b('0x417')]();this[_0x415b('0x2cd')]=[];for(let _0x5d91ed=0x0;_0x5d91ed<_0x3df508[_0x415b('0x40f')];_0x5d91ed++){if(_0x415b('0x39b')!=='unGDw')this[_0x415b('0x2cd')][_0x5d91ed]=new Game_Item();else{function _0x5b11e3(){_0x6ecdfc[_0x415b('0x386')][_0x415b('0x1cf')][_0x415b('0x60')](this);}}}for(let _0x6f502c=0x0;_0x6f502c<_0x3df508['length'];_0x6f502c++){const _0x1c0acc=_0x3df508[_0x6f502c],_0x3f773e=this[_0x415b('0x3ab')](_0x16477e,_0x1c0acc);if(this[_0x415b('0x3b4')](_0x3f773e))this[_0x415b('0x2cd')][_0x6f502c][_0x415b('0x94')](_0x3f773e);}this[_0x415b('0x113')](!![]),this[_0x415b('0x2ec')]();},Game_Actor[_0x415b('0x386')][_0x415b('0x146')]=function(_0x12b875){const _0x4a6317=[];for(let _0x36aba7=0x0;_0x36aba7<_0x12b875[_0x415b('0x40f')];_0x36aba7++){const _0x44aa9a=_0x12b875[_0x36aba7];if(_0x44aa9a<=0x0)continue;const _0x409e5c=$dataSystem[_0x415b('0x34a')][_0x36aba7+0x1];if(_0x409e5c===$dataSystem['equipTypes'][0x1]||_0x36aba7===0x1&&this[_0x415b('0x2a4')]())_0x4a6317['push']($dataWeapons[_0x44aa9a]);else{if('DaNKl'!==_0x415b('0x110')){function _0x5863d1(){this[_0x415b('0x1a8')]();}}else _0x4a6317[_0x415b('0x413')]($dataArmors[_0x44aa9a]);}}return _0x4a6317;},Game_Actor[_0x415b('0x386')]['getMatchingInitEquip']=function(_0x4df26e,_0x3240c8){for(const _0x40c8a4 of _0x4df26e){if(_0x415b('0x25e')!==_0x415b('0x25e')){function _0x29eb10(){_0x55eb2d[_0x415b('0x213')][_0x415b('0x413')](_0x5cfa04[_0x415b('0x33b')]()[_0x415b('0x379')]());}}else{if(!_0x40c8a4)continue;if(_0x40c8a4[_0x415b('0x207')]===_0x3240c8)return _0x4df26e[_0x415b('0x1a4')](_0x4df26e[_0x415b('0x389')](_0x40c8a4),0x1),_0x40c8a4;}}return null;},Game_Actor[_0x415b('0x386')]['equipSlots']=function(){const _0x4d1f04=JsonEx[_0x415b('0x3b8')](this[_0x415b('0x323')]()[_0x415b('0x417')]);if(_0x4d1f04[_0x415b('0x40f')]>=0x2&&this[_0x415b('0x2a4')]())_0x4d1f04[0x1]=0x1;return _0x4d1f04;},Game_Actor[_0x415b('0x386')][_0x415b('0x375')]=function(){const _0x23c983=this[_0x415b('0x417')]();for(let _0x601d45=0x0;_0x601d45<_0x23c983['length'];_0x601d45++){if(_0x415b('0xdd')===_0x415b('0x3c5')){function _0x3c58a0(){const _0x1c9d5e='ELEMENT';if(this[_0x415b('0x85')][_0x1c9d5e])return this['_customItemInfo'][_0x1c9d5e];if(this['_item'][_0x415b('0x1d2')][_0x415b('0x109')]<=-0x1)return _0x3425ac[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0x36c')][_0x415b('0xe7')];else return this[_0x415b('0x37')][_0x415b('0x1d2')][_0x415b('0x109')]===0x0?_0x18b11f[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0x36c')][_0x415b('0xc4')]:_0x4e98ab['elements'][this[_0x415b('0x37')][_0x415b('0x1d2')][_0x415b('0x109')]];}}else{if(!this['_equips'][_0x601d45])this[_0x415b('0x2cd')][_0x601d45]=new Game_Item();}}this['releaseUnequippableItems'](![]),this[_0x415b('0x2ec')]();},VisuMZ['ItemsEquipsCore'][_0x415b('0x3f8')]=Game_Actor[_0x415b('0x386')]['changeEquip'],Game_Actor[_0x415b('0x386')][_0x415b('0x231')]=function(_0x1800ca,_0x2f690e){if(this[_0x415b('0x1d3')]){const _0xf5b8f4=JsonEx[_0x415b('0x3b8')](this);_0xf5b8f4[_0x415b('0x1d3')]=!![],VisuMZ[_0x415b('0x246')][_0x415b('0x3f8')][_0x415b('0x60')](this,_0x1800ca,_0x2f690e),this['equipAdjustHpMp'](_0xf5b8f4);}else VisuMZ[_0x415b('0x246')][_0x415b('0x3f8')]['call'](this,_0x1800ca,_0x2f690e);},VisuMZ[_0x415b('0x246')][_0x415b('0x1c4')]=Game_Actor[_0x415b('0x386')]['forceChangeEquip'],Game_Actor[_0x415b('0x386')][_0x415b('0x1b3')]=function(_0x5685f8,_0x5614d7){if(this[_0x415b('0x1d3')]){if(_0x415b('0x399')===_0x415b('0x399')){const _0x9a440a=JsonEx['makeDeepCopy'](this);_0x9a440a['_tempActor']=!![],VisuMZ[_0x415b('0x246')][_0x415b('0x1c4')][_0x415b('0x60')](this,_0x5685f8,_0x5614d7),this[_0x415b('0x3ce')](_0x9a440a);}else{function _0x39d073(){_0x16251c=_0x415b('0x384')[_0x415b('0x3ba')](_0x3d9d71['id']);}}}else VisuMZ[_0x415b('0x246')][_0x415b('0x1c4')][_0x415b('0x60')](this,_0x5685f8,_0x5614d7);},VisuMZ[_0x415b('0x246')][_0x415b('0x17c')]=Game_Actor[_0x415b('0x386')][_0x415b('0x3c3')],Game_Actor[_0x415b('0x386')][_0x415b('0x3c3')]=function(_0x180e5f){if(!this['_tempActor']){const _0x32bc4a=JsonEx['makeDeepCopy'](this);_0x32bc4a[_0x415b('0x1d3')]=!![],VisuMZ[_0x415b('0x246')]['Game_Actor_discardEquip'][_0x415b('0x60')](this,_0x180e5f),this[_0x415b('0x3ce')](_0x32bc4a);}else VisuMZ['ItemsEquipsCore'][_0x415b('0x17c')][_0x415b('0x60')](this,_0x180e5f);},Game_Actor[_0x415b('0x386')][_0x415b('0x113')]=function(_0x262a9f){for(;;){const _0x474825=this[_0x415b('0x417')](),_0x35ad7e=this[_0x415b('0x2b5')]();let _0x397dd2=![];for(let _0x1fa34b=0x0;_0x1fa34b<_0x35ad7e[_0x415b('0x40f')];_0x1fa34b++){const _0x51e149=_0x35ad7e[_0x1fa34b];if(_0x51e149&&(!this[_0x415b('0x3b4')](_0x51e149)||_0x51e149['etypeId']!==_0x474825[_0x1fa34b])){!_0x262a9f&&this[_0x415b('0x7d')](null,_0x51e149);if(!this[_0x415b('0x1d3')]){if(_0x415b('0x1fd')!==_0x415b('0x1fd')){function _0x135991(){this[_0x415b('0x3bc')]();const _0x5940db=_0x5ef45f[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0x209')],_0x21eb80=_0x5940db[_0x415b('0xf2')],_0x1d877e=_0x21eb80[_0x415b('0x3ba')](_0x1f9600['numItems'](_0x13496c));this['contents'][_0x415b('0x133')]=_0x5940db[_0x415b('0x22a')],this[_0x415b('0x2b1')](_0x1d877e,_0x1649a3,_0x36ce04,_0x4d6f19,_0x415b('0x29')),this['resetFontSettings']();}}else{const _0x12bd34=JsonEx[_0x415b('0x3b8')](this);_0x12bd34[_0x415b('0x1d3')]=!![],this[_0x415b('0x2cd')][_0x1fa34b][_0x415b('0x94')](null),this['equipAdjustHpMp'](_0x12bd34);}}else this[_0x415b('0x2cd')][_0x1fa34b][_0x415b('0x94')](null);_0x397dd2=!![];}}if(!_0x397dd2){if('gQbKW'===_0x415b('0x31c'))break;else{function _0x587bae(){delete this[_0x415b('0xdb')][_0x415b('0xd7')]['ok'],delete this[_0x415b('0xdb')]['_handlers'][_0x415b('0x189')];}}}}},Game_Actor[_0x415b('0x386')][_0x415b('0x3ce')]=function(_0x47cfcf){if(this[_0x415b('0x1d3')])return;if(!VisuMZ[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0xe3')][_0x415b('0x2aa')])return;const _0x564444=Math[_0x415b('0x3d2')](_0x47cfcf[_0x415b('0x81')]()*this[_0x415b('0x1ec')]),_0x90065d=Math[_0x415b('0x3d2')](_0x47cfcf['mpRate']()*this[_0x415b('0x29a')]);if(this['hp']>0x0)this['setHp'](_0x564444);if(this['mp']>0x0)this[_0x415b('0x285')](_0x90065d);},Game_Actor[_0x415b('0x386')][_0x415b('0x162')]=function(){const _0x1ad0b8=this[_0x415b('0x417')]()['length'];for(let _0x27fca8=0x0;_0x27fca8<_0x1ad0b8;_0x27fca8++){if(this[_0x415b('0x2f1')](_0x27fca8))this['changeEquip'](_0x27fca8,null);}},Game_Actor[_0x415b('0x386')][_0x415b('0x2f1')]=function(_0x5e3d27){return this[_0x415b('0x329')]()['includes'](this[_0x415b('0x417')]()[_0x5e3d27])?![]:this[_0x415b('0x2f')](_0x5e3d27);},Game_Actor['prototype']['nonRemovableEtypes']=function(){return VisuMZ[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0xe3')][_0x415b('0x112')];},Game_Actor[_0x415b('0x386')][_0x415b('0x3a2')]=function(){const _0x20e7db=this['equipSlots']()[_0x415b('0x40f')];for(let _0x307b7c=0x0;_0x307b7c<_0x20e7db;_0x307b7c++){if(this[_0x415b('0x5c')](_0x307b7c))this['changeEquip'](_0x307b7c,null);}for(let _0x44e239=0x0;_0x44e239<_0x20e7db;_0x44e239++){if(this[_0x415b('0x5c')](_0x44e239))this[_0x415b('0x231')](_0x44e239,this[_0x415b('0x248')](_0x44e239));}},Game_Actor[_0x415b('0x386')][_0x415b('0x5c')]=function(_0x1ece76){return this[_0x415b('0x15c')]()[_0x415b('0x326')](this[_0x415b('0x417')]()[_0x1ece76])?![]:this['isEquipChangeOk'](_0x1ece76);},Game_Actor[_0x415b('0x386')]['nonOptimizeEtypes']=function(){return VisuMZ[_0x415b('0x246')][_0x415b('0x101')]['EquipScene'][_0x415b('0x1c2')];},VisuMZ['ItemsEquipsCore'][_0x415b('0x10b')]=Game_Actor[_0x415b('0x386')][_0x415b('0x7d')],Game_Actor[_0x415b('0x386')]['tradeItemWithParty']=function(_0x5e672a,_0x492754){$gameTemp[_0x415b('0x43')]=!![];const _0x4ad855=VisuMZ[_0x415b('0x246')][_0x415b('0x10b')]['call'](this,_0x5e672a,_0x492754);return $gameTemp[_0x415b('0x43')]=![],_0x4ad855;},Game_Actor[_0x415b('0x386')][_0x415b('0x46')]=function(_0x5cd906,_0x5fe3da){const _0x1ee565=this[_0x415b('0x1a')](_0x5cd906);if(_0x1ee565<0x0)return;const _0x553268=_0x5cd906===0x1?$dataWeapons[_0x5fe3da]:$dataArmors[_0x5fe3da];this[_0x415b('0x231')](_0x1ee565,_0x553268);},Game_Actor[_0x415b('0x386')][_0x415b('0x1a')]=function(_0xea8d2){let _0x58ebd5=0x0;const _0x55056e=this[_0x415b('0x417')](),_0x2ba058=this[_0x415b('0x2b5')]();for(let _0x5ed432=0x0;_0x5ed432<_0x55056e[_0x415b('0x40f')];_0x5ed432++){if(_0x55056e[_0x5ed432]===_0xea8d2){_0x58ebd5=_0x5ed432;if(!_0x2ba058[_0x5ed432])return _0x58ebd5;}}return _0x58ebd5;},VisuMZ[_0x415b('0x246')][_0x415b('0x405')]=Game_Actor[_0x415b('0x386')][_0x415b('0x3cd')],Game_Actor[_0x415b('0x386')][_0x415b('0x3cd')]=function(_0x351875){let _0x12724f=VisuMZ[_0x415b('0x246')][_0x415b('0x405')][_0x415b('0x60')](this,_0x351875);for(const _0x3697a4 of this[_0x415b('0x2b5')]()){if(_0x415b('0x17e')!=='fVevC'){if(_0x3697a4)_0x12724f+=this[_0x415b('0x1a6')](_0x3697a4,_0x351875);}else{function _0x17abf5(){const _0x52ddce=_0x593d97[_0x415b('0x293')],_0x3f9dc8=_0x2ab6d9[_0x415b('0x3a')];this['bitmap']=new _0x14012c(_0x52ddce,_0x3f9dc8),this[_0x415b('0x6')](),this[_0x415b('0x2c4')]();}}}return _0x12724f;},Game_Actor[_0x415b('0x386')][_0x415b('0x1a6')]=function(_0x5aa4de,_0x4e7bd1){if(this[_0x415b('0x2cc')])return 0x0;const _0x24e372=(DataManager['isWeapon'](_0x5aa4de)?'W%1':'A%1')['format'](_0x5aa4de['id']),_0x5f1b23='%1-%2'[_0x415b('0x3ba')](_0x24e372,_0x4e7bd1);if(VisuMZ[_0x415b('0x246')][_0x415b('0x26e')][_0x5f1b23]){this[_0x415b('0x2cc')]=!![];const _0x4fcb20=VisuMZ[_0x415b('0x246')][_0x415b('0x26e')][_0x5f1b23][_0x415b('0x60')](this,_0x5aa4de,_0x4e7bd1);return this[_0x415b('0x2cc')]=![],_0x4fcb20;}else return 0x0;},Game_Actor[_0x415b('0x386')]['setShopStatusWindowMode']=function(_0x11a022){this[_0x415b('0x6d')]=!![],this[_0x415b('0x1db')]=_0x11a022;},VisuMZ[_0x415b('0x246')][_0x415b('0xa6')]=Game_Party[_0x415b('0x386')][_0x415b('0x3c7')],Game_Party[_0x415b('0x386')]['initialize']=function(){VisuMZ[_0x415b('0x246')]['Game_Party_initialize'][_0x415b('0x60')](this),this[_0x415b('0x3a0')]();},Game_Party[_0x415b('0x386')][_0x415b('0x3a0')]=function(){this[_0x415b('0x2d')]=[];},Game_Party[_0x415b('0x386')]['isNewItem']=function(_0xdd33a3){if(!$gameTemp[_0x415b('0x20f')]())return![];if(this[_0x415b('0x2d')]===undefined)this[_0x415b('0x3a0')]();let _0x3e0937='';if(DataManager[_0x415b('0x8')](_0xdd33a3)){if('lSmWw'!==_0x415b('0x311')){function _0xbd5693(){_0x19e754+=_0x415b('0x25b')[_0x415b('0x3ba')](_0x1100d4),_0x5d7901++;if(_0x2c6f9b>=_0x3356b4)return _0xf71220;}}else _0x3e0937='item-%1'[_0x415b('0x3ba')](_0xdd33a3['id']);}else{if(DataManager[_0x415b('0x103')](_0xdd33a3))_0x3e0937=_0x415b('0x384')[_0x415b('0x3ba')](_0xdd33a3['id']);else{if(DataManager[_0x415b('0x214')](_0xdd33a3)){if('jssEs'!==_0x415b('0xcd'))_0x3e0937='armor-%1'[_0x415b('0x3ba')](_0xdd33a3['id']);else{function _0x4850cb(){let _0x490f4b=this[_0x415b('0x32d')]();const _0x39ec43=this[_0x415b('0x37')];return _0x490f4b=_0x55c84c['ItemsEquipsCore'][_0x415b('0x101')][_0x415b('0x41')]['SellPriceJS'][_0x415b('0x60')](this,_0x39ec43,_0x490f4b),_0x490f4b;}}}else return;}}return this[_0x415b('0x2d')][_0x415b('0x326')](_0x3e0937);},Game_Party['prototype']['setNewItem']=function(_0x288f34){if(!$gameTemp[_0x415b('0x20f')]())return;if(this[_0x415b('0x2d')]===undefined)this[_0x415b('0x3a0')]();let _0x5f3c9f='';if(DataManager['isItem'](_0x288f34)){if(_0x415b('0x10e')!==_0x415b('0x3b5'))_0x5f3c9f=_0x415b('0x137')[_0x415b('0x3ba')](_0x288f34['id']);else{function _0x465417(){_0x142180['prototype'][_0x415b('0xa5')][_0x415b('0x60')](this);}}}else{if(DataManager[_0x415b('0x103')](_0x288f34))_0x5f3c9f=_0x415b('0x384')['format'](_0x288f34['id']);else{if(DataManager[_0x415b('0x214')](_0x288f34))_0x5f3c9f='armor-%1'[_0x415b('0x3ba')](_0x288f34['id']);else return;}}if(!this[_0x415b('0x2d')][_0x415b('0x326')](_0x5f3c9f))this[_0x415b('0x2d')]['push'](_0x5f3c9f);},Game_Party[_0x415b('0x386')][_0x415b('0x3d1')]=function(_0x2d25d2){if(!$gameTemp[_0x415b('0x20f')]())return;if(this[_0x415b('0x2d')]===undefined)this[_0x415b('0x3a0')]();let _0x5494c6='';if(DataManager[_0x415b('0x8')](_0x2d25d2)){if(_0x415b('0x23a')!==_0x415b('0x3d4'))_0x5494c6=_0x415b('0x137')[_0x415b('0x3ba')](_0x2d25d2['id']);else{function _0x37bdbf(){const _0x343edd=_0x2a0e01[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0xe3')];return _0x343edd[_0x415b('0x281')]||_0x343edd[_0x415b('0xbb')];}}}else{if(DataManager['isWeapon'](_0x2d25d2)){if(_0x415b('0xbe')===_0x415b('0x3a5')){function _0x26f2cc(){const _0x3d093d=_0x42a861[_0x415b('0x29b')](_0x342256[_0x415b('0x44')]()),_0x58bbf1=this[_0x415b('0x318')]-_0x3d093d['width'];_0x537330+=_0x58bbf1/0x2;if(_0x58bbf1<0x0)_0x59e38e-=_0x58bbf1;_0x3b45f6[_0x415b('0x386')]['drawItemActorMenuImage']['call'](this,_0x21b7f2,_0xd84609,_0x5d481b,_0x3482a3,_0xa115ba);}}else _0x5494c6=_0x415b('0x384')[_0x415b('0x3ba')](_0x2d25d2['id']);}else{if(DataManager[_0x415b('0x214')](_0x2d25d2))_0x5494c6=_0x415b('0x63')[_0x415b('0x3ba')](_0x2d25d2['id']);else{if(_0x415b('0x1c9')!=='BHcgv'){function _0x1a6834(){if(!this['isUseModernControls']())_0x43bfe4['prototype'][_0x415b('0x11d')][_0x415b('0x60')](this);}}else return;}}}this[_0x415b('0x2d')][_0x415b('0x326')](_0x5494c6)&&this[_0x415b('0x2d')]['splice'](this[_0x415b('0x2d')][_0x415b('0x389')](_0x5494c6),0x1);},VisuMZ[_0x415b('0x246')][_0x415b('0xc5')]=Game_Party[_0x415b('0x386')]['gainItem'],Game_Party[_0x415b('0x386')]['gainItem']=function(_0x45c625,_0xbc9a28,_0x53b1aa){const _0x46ce2b=this[_0x415b('0x2ef')](_0x45c625);VisuMZ[_0x415b('0x246')][_0x415b('0xc5')][_0x415b('0x60')](this,_0x45c625,_0xbc9a28,_0x53b1aa);if(this['numItems'](_0x45c625)>_0x46ce2b)this[_0x415b('0x3fd')](_0x45c625);},Game_Party[_0x415b('0x386')]['maxItems']=function(_0x149ed5){return DataManager[_0x415b('0x2fe')](_0x149ed5);},VisuMZ[_0x415b('0x246')][_0x415b('0x22b')]=Scene_ItemBase[_0x415b('0x386')]['activateItemWindow'],Scene_ItemBase['prototype'][_0x415b('0x274')]=function(){VisuMZ['ItemsEquipsCore'][_0x415b('0x22b')][_0x415b('0x60')](this),this[_0x415b('0x17b')][_0x415b('0x1fe')]();},Scene_Item['prototype'][_0x415b('0x1f5')]=function(){if(ConfigManager[_0x415b('0x338')]&&ConfigManager['uiHelpPosition']!==undefined)return ConfigManager[_0x415b('0x2dc')];else{if(this[_0x415b('0x203')]()){if(_0x415b('0x22d')!==_0x415b('0x22d')){function _0x41cbd8(){const _0x8c9db6=new _0x33eaf3();return _0x488ce2[_0x65767b]=_0x8c9db6,this[_0x415b('0xf3')](_0x8c9db6),_0x8c9db6;}}else return this[_0x415b('0x3b9')]()[_0x415b('0x325')](/LOWER/i);}else Scene_ItemBase[_0x415b('0x386')]['isRightInputMode'][_0x415b('0x60')](this);}},Scene_Item[_0x415b('0x386')][_0x415b('0x1cf')]=function(){if(ConfigManager[_0x415b('0x338')]&&ConfigManager[_0x415b('0x15e')]!==undefined){if(_0x415b('0x370')!=='KIQZo'){function _0x3d0ef6(){return _0x1fb5a0[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0x209')][_0x415b('0x132')];}}else return ConfigManager[_0x415b('0x15e')];}else{if(this[_0x415b('0x203')]()){if('fGYwp'!==_0x415b('0xae')){function _0x7169fd(){return this[_0x415b('0x56')]();}}else return this[_0x415b('0x3b9')]()[_0x415b('0x325')](/RIGHT/i);}else Scene_ItemBase[_0x415b('0x386')][_0x415b('0x1cf')][_0x415b('0x60')](this);}},Scene_Item[_0x415b('0x386')][_0x415b('0x3b9')]=function(){return VisuMZ[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0x209')]['LayoutStyle'];},Scene_Item[_0x415b('0x386')][_0x415b('0xb0')]=function(){return this[_0x415b('0xdb')]&&this[_0x415b('0xdb')][_0x415b('0xb0')]();},Scene_Item[_0x415b('0x386')]['isUseItemsEquipsCoreUpdatedLayout']=function(){return VisuMZ[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0x209')][_0x415b('0x155')];},VisuMZ[_0x415b('0x246')][_0x415b('0x33')]=Scene_Item[_0x415b('0x386')][_0x415b('0xe5')],Scene_Item[_0x415b('0x386')][_0x415b('0xe5')]=function(){VisuMZ[_0x415b('0x246')][_0x415b('0x33')][_0x415b('0x60')](this);if(this[_0x415b('0xb0')]()){if('OPSbI'!=='APVNr')this[_0x415b('0x4f')]();else{function _0x5249b1(){this[_0x415b('0x3bc')](),this['changePaintOpacity'](!![]),this['prepareItemCustomData'](),this[_0x415b('0x383')]()?this[_0x415b('0x226')]():this[_0x415b('0x28f')]();}}}},Scene_Item[_0x415b('0x386')][_0x415b('0x1ed')]=function(){if(this[_0x415b('0x203')]()){if('SMDhG'!==_0x415b('0x351'))return this[_0x415b('0xb2')]();else{function _0x41a798(){return this[_0x415b('0x2f')](_0x2119c3);}}}else return Scene_ItemBase[_0x415b('0x386')][_0x415b('0x1ed')][_0x415b('0x60')](this);},Scene_Item[_0x415b('0x386')][_0x415b('0xb2')]=function(){const _0x2828d4=0x0,_0x90198b=this[_0x415b('0x235')](),_0x3bb35c=Graphics[_0x415b('0x2cf')],_0x1c81a2=this['helpAreaHeight']();return new Rectangle(_0x2828d4,_0x90198b,_0x3bb35c,_0x1c81a2);},VisuMZ[_0x415b('0x246')][_0x415b('0x2ea')]=Scene_Item[_0x415b('0x386')][_0x415b('0x1e6')],Scene_Item[_0x415b('0x386')][_0x415b('0x1e6')]=function(){VisuMZ[_0x415b('0x246')][_0x415b('0x2ea')][_0x415b('0x60')](this);if(this['isUseModernControls']()){if(_0x415b('0x3a6')!==_0x415b('0x3a6')){function _0x5f3882(){const _0x3c20a2=_0x415b('0x3f2');if(!this[_0x415b('0x23e')]['removeStateBuffChanges']&&!this[_0x415b('0x85')][_0x3c20a2])return![];const _0x594a1d=this[_0x415b('0x37a')]();this['drawItemKeyData'](_0x594a1d,_0x231b52,_0x411fcc,_0x34d4e3,!![]);const _0x248076=this[_0x415b('0x30a')]();return this[_0x415b('0xe1')](_0x248076,_0x5f3575,_0x18251c,_0xbd8e14,![],'right'),this[_0x415b('0x32f')](_0x2c6bdc,_0x3d2291,_0x53cef2),this[_0x415b('0x3bc')](),!![];}}else this[_0x415b('0x153')]();}},Scene_Item[_0x415b('0x386')][_0x415b('0x153')]=function(){delete this[_0x415b('0xdb')]['_handlers']['ok'],delete this[_0x415b('0xdb')][_0x415b('0xd7')]['cancel'];},VisuMZ['ItemsEquipsCore'][_0x415b('0x2f5')]=Scene_Item[_0x415b('0x386')][_0x415b('0x1be')],Scene_Item[_0x415b('0x386')][_0x415b('0x1be')]=function(){return this[_0x415b('0x203')]()?this[_0x415b('0x1d')]():VisuMZ[_0x415b('0x246')][_0x415b('0x2f5')]['call'](this);},Scene_Item[_0x415b('0x386')][_0x415b('0x1d')]=function(){const _0x452ae2=0x0,_0x2ee514=this[_0x415b('0x5e')](),_0x105134=Graphics[_0x415b('0x2cf')],_0x3b81f8=this[_0x415b('0x33e')](0x1,!![]);return new Rectangle(_0x452ae2,_0x2ee514,_0x105134,_0x3b81f8);},VisuMZ[_0x415b('0x246')][_0x415b('0x14e')]=Scene_Item[_0x415b('0x386')][_0x415b('0x2f4')],Scene_Item['prototype'][_0x415b('0x2f4')]=function(){VisuMZ[_0x415b('0x246')][_0x415b('0x14e')]['call'](this);this[_0x415b('0xb0')]()&&this[_0x415b('0x2c8')]();if(this[_0x415b('0x122')]()){if(_0x415b('0x3ec')!==_0x415b('0x3ec')){function _0x3b77ca(){const _0x4456b2=_0x521c7e[_0x415b('0x191')]('['+_0x3ff030['$1'][_0x415b('0x325')](/\d+/g)+']');for(const _0x1b4b35 of _0x4456b2){if(!_0x2cd8ac[_0x415b('0xc7')](_0x1b4b35))return![];}}}else this['createStatusWindow']();}},VisuMZ[_0x415b('0x246')][_0x415b('0x1f1')]=Scene_Item[_0x415b('0x386')][_0x415b('0x67')],Scene_Item[_0x415b('0x386')]['itemWindowRect']=function(){if(this[_0x415b('0x203')]()){if(_0x415b('0x2')===_0x415b('0x2ca')){function _0x4034c2(){_0x33829f=_0x415b('0x137')['format'](_0xfb6794['id']);}}else return this[_0x415b('0x12')]();}else{const _0x46d0ae=VisuMZ['ItemsEquipsCore'][_0x415b('0x1f1')][_0x415b('0x60')](this);return this[_0x415b('0x122')]()&&this[_0x415b('0x26c')]()&&(_0x46d0ae[_0x415b('0x2c0')]-=this[_0x415b('0x300')]()),_0x46d0ae;}},Scene_Item[_0x415b('0x386')][_0x415b('0x12')]=function(){const _0x4fe35f=this['isRightInputMode']()?this['statusWidth']():0x0,_0x2a1d0a=this[_0x415b('0xdb')]['y']+this[_0x415b('0xdb')][_0x415b('0x14a')],_0x11c907=Graphics[_0x415b('0x2cf')]-this[_0x415b('0x300')](),_0xf69104=this[_0x415b('0xf9')]()-_0x2a1d0a;return new Rectangle(_0x4fe35f,_0x2a1d0a,_0x11c907,_0xf69104);},Scene_Item[_0x415b('0x386')]['postCreateItemWindowModernControls']=function(){this[_0x415b('0x17b')]['setHandler'](_0x415b('0x189'),this[_0x415b('0x24')][_0x415b('0x35c')](this));},Scene_Item['prototype'][_0x415b('0x122')]=function(){return this[_0x415b('0x203')]()?!![]:VisuMZ[_0x415b('0x246')][_0x415b('0x101')]['ItemScene'][_0x415b('0x392')];},Scene_Item[_0x415b('0x386')][_0x415b('0x26c')]=function(){return VisuMZ['ItemsEquipsCore'][_0x415b('0x101')][_0x415b('0x209')][_0x415b('0x2fb')];},Scene_Item[_0x415b('0x386')]['createStatusWindow']=function(){const _0x1cc975=this['statusWindowRect']();this[_0x415b('0xaa')]=new Window_ShopStatus(_0x1cc975),this['addWindow'](this[_0x415b('0xaa')]),this[_0x415b('0x17b')][_0x415b('0x16a')](this[_0x415b('0xaa')]);},Scene_Item[_0x415b('0x386')][_0x415b('0xa3')]=function(){if(this[_0x415b('0x203')]())return this[_0x415b('0x267')]();else{if(_0x415b('0xcf')!==_0x415b('0x408'))return VisuMZ[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0x209')][_0x415b('0xb7')][_0x415b('0x60')](this);else{function _0x5df017(){if(!_0x54aea0[_0x415b('0xc7')](_0x1bbda3))return![];}}}},Scene_Item[_0x415b('0x386')][_0x415b('0x267')]=function(){const _0x2c54c2=this['statusWidth'](),_0xe1b63c=this[_0x415b('0x17b')]['height'],_0x2bfd49=this[_0x415b('0x1cf')]()?0x0:Graphics[_0x415b('0x2cf')]-this[_0x415b('0x300')](),_0x5bb11e=this['_itemWindow']['y'];return new Rectangle(_0x2bfd49,_0x5bb11e,_0x2c54c2,_0xe1b63c);},Scene_Item[_0x415b('0x386')][_0x415b('0x300')]=function(){return Scene_Shop['prototype'][_0x415b('0x300')]();},Scene_Item[_0x415b('0x386')][_0x415b('0xa7')]=function(){if(!this[_0x415b('0x3b9')]())return![];if(!this[_0x415b('0xb0')]())return![];if(!this[_0x415b('0x17b')])return![];if(!this[_0x415b('0x17b')]['active'])return![];return this['updatedLayoutStyle']()&&this[_0x415b('0xb0')]();},Scene_Item[_0x415b('0x386')][_0x415b('0x161')]=function(){if(this[_0x415b('0xa7')]()){if(this[_0x415b('0x17b')][_0x415b('0x30d')]()===0x1){if(_0x415b('0x14')!==_0x415b('0x3'))return TextManager[_0x415b('0x1f4')](_0x415b('0x1ca'),_0x415b('0x29'));else{function _0x159a1e(){return this[_0x415b('0x17b')][_0x415b('0x30d')]()===0x1?_0x544552[_0x415b('0x1f4')](_0x415b('0x1ca'),'right'):_0x2fd178[_0x415b('0x1f4')](_0x415b('0x23f'),_0x415b('0x348'));}}}else return TextManager[_0x415b('0x1f4')](_0x415b('0x23f'),_0x415b('0x348'));}return Scene_ItemBase[_0x415b('0x386')][_0x415b('0x161')][_0x415b('0x60')](this);},Scene_Item[_0x415b('0x386')][_0x415b('0x251')]=function(){if(this[_0x415b('0xa7')]())return VisuMZ['ItemsEquipsCore']['Settings'][_0x415b('0x209')][_0x415b('0x132')];return Scene_ItemBase[_0x415b('0x386')][_0x415b('0x251')][_0x415b('0x60')](this);},Scene_Equip['prototype']['isBottomHelpMode']=function(){if(ConfigManager[_0x415b('0x338')]&&ConfigManager[_0x415b('0x2dc')]!==undefined)return ConfigManager['uiHelpPosition'];else{if(this[_0x415b('0x203')]()){if(_0x415b('0xfd')===_0x415b('0x2d7')){function _0x3f0622(){this[_0x415b('0x86')](!![]);}}else return this[_0x415b('0x3b9')]()[_0x415b('0x325')](/LOWER/i);}else Scene_MenuBase[_0x415b('0x386')][_0x415b('0x1cf')][_0x415b('0x60')](this);}},Scene_Equip[_0x415b('0x386')][_0x415b('0x1cf')]=function(){if(ConfigManager[_0x415b('0x338')]&&ConfigManager[_0x415b('0x15e')]!==undefined){if(_0x415b('0x5b')!==_0x415b('0x2eb'))return ConfigManager[_0x415b('0x15e')];else{function _0x3f5202(){this[_0x415b('0x7d')](null,_0x5040e4);}}}else{if(this[_0x415b('0x203')]())return this[_0x415b('0x3b9')]()[_0x415b('0x325')](/RIGHT/i);else{if('QkVTS'===_0x415b('0x342')){function _0x23f064(){const _0x12e62b=_0x397188['x']+_0x504713[_0x415b('0x38f')]((_0x26bbe4[_0x415b('0x2c0')]-_0x52d002)/0x2);this[_0x415b('0x47')](_0x18336b,_0x12e62b,_0x3dffbc['y'],_0x1855ba);}}else Scene_MenuBase['prototype']['isRightInputMode'][_0x415b('0x60')](this);}}},Scene_Equip[_0x415b('0x386')][_0x415b('0x3b9')]=function(){return VisuMZ[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0xe3')][_0x415b('0x70')];},Scene_Equip[_0x415b('0x386')][_0x415b('0xb0')]=function(){return this[_0x415b('0x87')]&&this['_commandWindow'][_0x415b('0xb0')]();},Scene_Equip[_0x415b('0x386')][_0x415b('0x203')]=function(){return VisuMZ['ItemsEquipsCore'][_0x415b('0x101')][_0x415b('0xe3')][_0x415b('0x155')];},VisuMZ[_0x415b('0x246')]['Scene_Equip_create']=Scene_Equip[_0x415b('0x386')][_0x415b('0xe5')],Scene_Equip[_0x415b('0x386')][_0x415b('0xe5')]=function(){VisuMZ[_0x415b('0x246')][_0x415b('0x18')][_0x415b('0x60')](this),this[_0x415b('0xb0')]()&&this[_0x415b('0x30c')]();},Scene_Equip[_0x415b('0x386')][_0x415b('0x1ed')]=function(){if(this[_0x415b('0x203')]())return this[_0x415b('0xb2')]();else{if(_0x415b('0x1a9')===_0x415b('0x1e7')){function _0x170777(){this[_0x415b('0x7c')]={},this['_newLabelOpacity']=0xff,this[_0x415b('0x3af')]=_0x31cf9f['ItemsEquipsCore']['Settings'][_0x415b('0x2bd')][_0x415b('0xc9')],this[_0x415b('0x1b4')]=_0x4f3923[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0x2bd')][_0x415b('0xdc')];}}else return Scene_MenuBase[_0x415b('0x386')][_0x415b('0x1ed')][_0x415b('0x60')](this);}},Scene_Equip[_0x415b('0x386')]['helpWindowRectItemsEquipsCore']=function(){const _0xdd33b8=0x0,_0x46108c=this['helpAreaTop'](),_0x4974b9=Graphics[_0x415b('0x2cf')],_0x5e532f=this['helpAreaHeight']();return new Rectangle(_0xdd33b8,_0x46108c,_0x4974b9,_0x5e532f);},VisuMZ[_0x415b('0x246')]['Scene_Equip_statusWindowRect']=Scene_Equip[_0x415b('0x386')][_0x415b('0xa3')],Scene_Equip[_0x415b('0x386')][_0x415b('0xa3')]=function(){return this[_0x415b('0x203')]()?this['statusWindowRectItemsEquipsCore']():VisuMZ[_0x415b('0x246')]['Scene_Equip_statusWindowRect'][_0x415b('0x60')](this);},Scene_Equip[_0x415b('0x386')][_0x415b('0x267')]=function(){const _0x305db1=this[_0x415b('0x1cf')]()?0x0:Graphics[_0x415b('0x2cf')]-this[_0x415b('0x300')](),_0x435397=this['mainAreaTop'](),_0x5651a6=this[_0x415b('0x300')](),_0x19198b=this[_0x415b('0xc3')]();return new Rectangle(_0x305db1,_0x435397,_0x5651a6,_0x19198b);},VisuMZ[_0x415b('0x246')][_0x415b('0x266')]=Scene_Equip[_0x415b('0x386')][_0x415b('0x192')],Scene_Equip[_0x415b('0x386')]['commandWindowRect']=function(){return this[_0x415b('0x203')]()?this['commandWindowRectItemsEquipsCore']():VisuMZ[_0x415b('0x246')][_0x415b('0x266')][_0x415b('0x60')](this);},Scene_Equip['prototype'][_0x415b('0x13f')]=function(){const _0x387eef=VisuMZ[_0x415b('0x246')]['Settings']['EquipScene'];return _0x387eef[_0x415b('0x281')]||_0x387eef[_0x415b('0xbb')];},Scene_Equip[_0x415b('0x386')]['commandWindowRectItemsEquipsCore']=function(){const _0x55b4d2=this[_0x415b('0x13f')](),_0x56f212=this[_0x415b('0x1cf')]()?this['statusWidth']():0x0,_0x53d81d=this[_0x415b('0x5e')](),_0x33806c=Graphics[_0x415b('0x2cf')]-this[_0x415b('0x300')](),_0x37cbe1=_0x55b4d2?this[_0x415b('0x33e')](0x1,!![]):0x0;return new Rectangle(_0x56f212,_0x53d81d,_0x33806c,_0x37cbe1);},VisuMZ[_0x415b('0x246')][_0x415b('0x69')]=Scene_Equip[_0x415b('0x386')][_0x415b('0x33d')],Scene_Equip[_0x415b('0x386')]['createSlotWindow']=function(){VisuMZ[_0x415b('0x246')][_0x415b('0x69')][_0x415b('0x60')](this),this[_0x415b('0xb0')]()&&this[_0x415b('0x194')]();},VisuMZ['ItemsEquipsCore'][_0x415b('0x16e')]=Scene_Equip[_0x415b('0x386')][_0x415b('0x1eb')],Scene_Equip[_0x415b('0x386')][_0x415b('0x1eb')]=function(){return this[_0x415b('0x203')]()?this['slotWindowRectItemsEquipsCore']():VisuMZ[_0x415b('0x246')][_0x415b('0x16e')][_0x415b('0x60')](this);},Scene_Equip[_0x415b('0x386')]['slotWindowRectItemsEquipsCore']=function(){const _0x5aab35=this[_0x415b('0x192')](),_0x5e9b1b=this['isRightInputMode']()?this['statusWidth']():0x0,_0x5ce40c=_0x5aab35['y']+_0x5aab35[_0x415b('0x14a')],_0x4a62d5=Graphics[_0x415b('0x2cf')]-this[_0x415b('0x300')](),_0x222bde=this[_0x415b('0xc3')]()-_0x5aab35[_0x415b('0x14a')];return new Rectangle(_0x5e9b1b,_0x5ce40c,_0x4a62d5,_0x222bde);},VisuMZ['ItemsEquipsCore'][_0x415b('0x28')]=Scene_Equip[_0x415b('0x386')][_0x415b('0x67')],Scene_Equip[_0x415b('0x386')][_0x415b('0x67')]=function(){return this[_0x415b('0x203')]()?this[_0x415b('0x1eb')]():VisuMZ[_0x415b('0x246')][_0x415b('0x28')][_0x415b('0x60')](this);},Scene_Equip[_0x415b('0x386')]['statusWidth']=function(){return this[_0x415b('0x203')]()?this[_0x415b('0x2f2')]():VisuMZ['ItemsEquipsCore']['Settings']['EquipScene'][_0x415b('0x4d')];},Scene_Equip[_0x415b('0x386')]['geUpdatedLayoutStatusWidth']=function(){return Math[_0x415b('0x38f')](Graphics[_0x415b('0x2cf')]/0x2);},Scene_Equip[_0x415b('0x386')][_0x415b('0x194')]=function(){this[_0x415b('0x302')][_0x415b('0x361')](_0x415b('0x189'),this[_0x415b('0x24')][_0x415b('0x35c')](this)),this[_0x415b('0x302')]['setHandler'](_0x415b('0x348'),this[_0x415b('0x22f')][_0x415b('0x35c')](this)),this['_slotWindow'][_0x415b('0x361')](_0x415b('0x23f'),this[_0x415b('0x80')][_0x415b('0x35c')](this));},VisuMZ[_0x415b('0x246')][_0x415b('0x334')]=Scene_Equip[_0x415b('0x386')][_0x415b('0x30c')],Scene_Equip[_0x415b('0x386')][_0x415b('0x30c')]=function(){this['isUseModernControls']()&&(this[_0x415b('0x87')][_0x415b('0xeb')](),this[_0x415b('0x87')][_0x415b('0x3ff')]()),VisuMZ['ItemsEquipsCore'][_0x415b('0x334')][_0x415b('0x60')](this);},VisuMZ[_0x415b('0x246')]['Scene_Equip_onSlotOk']=Scene_Equip[_0x415b('0x386')][_0x415b('0x38d')],Scene_Equip[_0x415b('0x386')][_0x415b('0x38d')]=function(){this[_0x415b('0x302')][_0x415b('0x2de')]()>=0x0?(VisuMZ[_0x415b('0x246')]['Scene_Equip_onSlotOk'][_0x415b('0x60')](this),this[_0x415b('0x401')]()):(this[_0x415b('0x302')][_0x415b('0xa9')](0x0),this[_0x415b('0x302')][_0x415b('0x407')]());},Scene_Equip[_0x415b('0x386')][_0x415b('0x401')]=function(){const _0x1c28c6=this[_0x415b('0x302')][_0x415b('0x2ab')](),_0x38821f=this[_0x415b('0x17b')][_0x415b('0x14c')][_0x415b('0x389')](_0x1c28c6),_0x17eb22=Math['floor'](this[_0x415b('0x17b')][_0x415b('0x1b6')]()/0x2)-0x1;this[_0x415b('0x17b')][_0x415b('0xa9')](_0x38821f>=0x0?_0x38821f:0x0),this[_0x415b('0x17b')][_0x415b('0x5a')](this[_0x415b('0x17b')]['index']()-_0x17eb22);},VisuMZ['ItemsEquipsCore'][_0x415b('0x2ee')]=Scene_Equip[_0x415b('0x386')][_0x415b('0x398')],Scene_Equip[_0x415b('0x386')]['onSlotCancel']=function(){VisuMZ[_0x415b('0x246')]['Scene_Equip_onSlotCancel'][_0x415b('0x60')](this),this[_0x415b('0xb0')]()&&(this['_commandWindow'][_0x415b('0xa9')](0x0),this[_0x415b('0x302')][_0x415b('0x3ff')]());},VisuMZ[_0x415b('0x246')][_0x415b('0x410')]=Scene_Equip[_0x415b('0x386')][_0x415b('0x6a')],Scene_Equip[_0x415b('0x386')][_0x415b('0x6a')]=function(){VisuMZ[_0x415b('0x246')]['Scene_Equip_onActorChange'][_0x415b('0x60')](this),this[_0x415b('0xb0')]()&&(this[_0x415b('0x87')][_0x415b('0x3ff')](),this[_0x415b('0x87')][_0x415b('0xeb')](),this[_0x415b('0x302')]['smoothSelect'](0x0),this[_0x415b('0x302')][_0x415b('0x407')]());},Scene_Equip[_0x415b('0x386')]['buttonAssistSlotWindowShift']=function(){if(!this[_0x415b('0x302')])return![];if(!this['_slotWindow'][_0x415b('0x275')])return![];return this[_0x415b('0x302')][_0x415b('0x33c')]();},Scene_Equip[_0x415b('0x386')][_0x415b('0x322')]=function(){if(this[_0x415b('0x121')]())return TextManager['getInputButtonString'](_0x415b('0x108'));return Scene_MenuBase[_0x415b('0x386')][_0x415b('0x322')][_0x415b('0x60')](this);},Scene_Equip[_0x415b('0x386')][_0x415b('0xa8')]=function(){if(this['buttonAssistSlotWindowShift']()){if(_0x415b('0x317')!=='SCAyj')return VisuMZ[_0x415b('0x246')]['Settings']['EquipScene']['buttonAssistRemove'];else{function _0x4a158f(){return _0x415b('0x215');}}}return Scene_MenuBase[_0x415b('0x386')][_0x415b('0xa8')][_0x415b('0x60')](this);},Scene_Equip[_0x415b('0x386')]['buttonAssistOffset3']=function(){if(this[_0x415b('0x121')]()){if('aXhlN'===_0x415b('0x38b'))return this[_0x415b('0x201')]['width']/0x5/-0x3;else{function _0x57bf7f(){_0x477af7=_0x415b('0x63')['format'](_0x49a637['id']);}}}return Scene_MenuBase[_0x415b('0x386')][_0x415b('0x1d8')][_0x415b('0x60')](this);},VisuMZ['ItemsEquipsCore'][_0x415b('0x26d')]=Scene_Load['prototype'][_0x415b('0x241')],Scene_Load[_0x415b('0x386')][_0x415b('0x241')]=function(){VisuMZ[_0x415b('0x246')]['Scene_Load_reloadMapIfUpdated'][_0x415b('0x60')](this),this[_0x415b('0x5f')]();},Scene_Load['prototype'][_0x415b('0x5f')]=function(){if($gameSystem[_0x415b('0x102')]()!==$dataSystem[_0x415b('0x102')])for(const _0x47f63b of $gameActors[_0x415b('0x14c')]){if(_0x47f63b)_0x47f63b[_0x415b('0x375')]();}},Scene_Shop[_0x415b('0x386')][_0x415b('0x1f5')]=function(){if(ConfigManager[_0x415b('0x338')]&&ConfigManager[_0x415b('0x2dc')]!==undefined){if(_0x415b('0x52')===_0x415b('0xf4')){function _0x541170(){return _0x42edf0[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0x209')][_0x415b('0x392')];}}else return ConfigManager['uiHelpPosition'];}else{if(this[_0x415b('0x203')]())return this[_0x415b('0x3b9')]()[_0x415b('0x325')](/LOWER/i);else{if('ruavx'==='isAcN'){function _0x5b7aa2(){return this[_0x415b('0x267')]();}}else Scene_MenuBase[_0x415b('0x386')][_0x415b('0x1cf')][_0x415b('0x60')](this);}}},Scene_Shop[_0x415b('0x386')][_0x415b('0x1cf')]=function(){if(ConfigManager[_0x415b('0x338')]&&ConfigManager['uiInputPosition']!==undefined){if(_0x415b('0x3a7')===_0x415b('0x3a7'))return ConfigManager[_0x415b('0x15e')];else{function _0x419aca(){return _0x1afe37[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0x36c')]['LabelApply'];}}}else{if(this[_0x415b('0x203')]())return this[_0x415b('0x3b9')]()['match'](/RIGHT/i);else Scene_MenuBase[_0x415b('0x386')][_0x415b('0x1cf')][_0x415b('0x60')](this);}},Scene_Shop[_0x415b('0x386')][_0x415b('0x3b9')]=function(){return VisuMZ[_0x415b('0x246')][_0x415b('0x101')]['ShopScene'][_0x415b('0x70')];},Scene_Shop['prototype'][_0x415b('0xb0')]=function(){return this[_0x415b('0xdb')]&&this[_0x415b('0xdb')][_0x415b('0xb0')]();},Scene_Shop[_0x415b('0x386')][_0x415b('0x203')]=function(){return VisuMZ[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0x41')][_0x415b('0x155')];},VisuMZ[_0x415b('0x246')][_0x415b('0x40')]=Scene_Shop[_0x415b('0x386')][_0x415b('0xc2')],Scene_Shop[_0x415b('0x386')][_0x415b('0xc2')]=function(_0x378e41,_0x3e8923){_0x378e41=JsonEx[_0x415b('0x3b8')](_0x378e41),VisuMZ[_0x415b('0x246')]['Scene_Shop_prepare'][_0x415b('0x60')](this,_0x378e41,_0x3e8923),this[_0x415b('0x321')]();},Scene_Shop[_0x415b('0x386')][_0x415b('0x321')]=function(){this['_goodsCount']=0x0;for(const _0x9a902d of this[_0x415b('0x1b8')]){if(this[_0x415b('0x36')](_0x9a902d))this[_0x415b('0xad')]++;else{if(_0x415b('0x1da')===_0x415b('0x1da'))_0x9a902d[0x0]=-0x1;else{function _0x55788d(){this[_0x415b('0xd0')](_0x5a135d[_0x415b('0x236')](_0x415b('0x29')));}}}}},Scene_Shop[_0x415b('0x386')][_0x415b('0x36')]=function(_0x1594c0){if(_0x1594c0[0x0]>0x2||_0x1594c0[0x0]<0x0)return![];const _0x201096=[$dataItems,$dataWeapons,$dataArmors][_0x1594c0[0x0]][_0x1594c0[0x1]];if(!_0x201096)return![];const _0xd7da96=_0x201096[_0x415b('0x256')]||'';if(_0xd7da96[_0x415b('0x325')](/<SHOW SHOP[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x75e4c3=JSON[_0x415b('0x191')]('['+RegExp['$1'][_0x415b('0x325')](/\d+/g)+']');for(const _0x549531 of _0x75e4c3){if(_0x415b('0x3d7')!=='XDWKv'){if(!$gameSwitches[_0x415b('0xc7')](_0x549531))return![];}else{function _0x421d9c(){this[_0x415b('0x11e')](_0x108acb)[_0x415b('0x325')](/\\I\[(\d+)\]/i);const _0x349049=_0xe34cca(_0x15fd91['$1'])||0x0,_0x143818=this[_0x415b('0x97')](_0x2b8d96),_0x14f3ec=_0x143818['x']+_0xaffc9b['floor']((_0x143818['width']-_0x4dd959[_0x415b('0x293')])/0x2),_0x1aa765=_0x143818['y']+(_0x143818[_0x415b('0x14a')]-_0x5c98fc[_0x415b('0x3a')])/0x2;this[_0x415b('0x39c')](_0x349049,_0x14f3ec,_0x1aa765);}}}return!![];}if(_0xd7da96[_0x415b('0x325')](/<SHOW SHOP ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x415b('0xcc')===_0x415b('0x202')){function _0x4dcac7(){const _0x51d331=this[_0x415b('0x23e')]['changeBuff'][_0x3e2720],_0x1cc82c=_0x11375e[_0x415b('0x386')][_0x415b('0x2d5')](_0x51d331,_0x46d5d2);if(_0x1cc82c>0x0){_0x21fb23+=_0x415b('0x25b')[_0x415b('0x3ba')](_0x1cc82c),_0x485931++;if(_0xf9d80e>=_0x1c066e)return _0x238405;}}}else{const _0x303474=JSON[_0x415b('0x191')]('['+RegExp['$1'][_0x415b('0x325')](/\d+/g)+']');for(const _0x34a5d1 of _0x303474){if(!$gameSwitches[_0x415b('0xc7')](_0x34a5d1))return![];}return!![];}}if(_0xd7da96[_0x415b('0x325')](/<SHOW SHOP ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x415b('0x3a8')!==_0x415b('0x3a8')){function _0x3f8e62(){const _0x8449f4=_0x3776ed['x']+_0x4eaa45[_0x415b('0x38f')]((_0x25bb87[_0x415b('0x2c0')]-_0xaf4bb7)/0x2);this[_0x415b('0x47')](_0x9aa961,_0x8449f4,_0x5f1440['y'],_0x170589);}}else{const _0x2403f7=JSON['parse']('['+RegExp['$1'][_0x415b('0x325')](/\d+/g)+']');for(const _0x3b43c3 of _0x2403f7){if($gameSwitches[_0x415b('0xc7')](_0x3b43c3))return!![];}return![];}}if(_0xd7da96[_0x415b('0x325')](/<HIDE SHOP[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x415b('0x173')==='qkonB'){function _0x27238e(){for(const _0x5a9570 of _0x4e4079[_0x415b('0x14c')]){if(_0x5a9570)_0x5a9570[_0x415b('0x375')]();}}}else{const _0x3182c8=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x51c41c of _0x3182c8){if(!$gameSwitches[_0x415b('0xc7')](_0x51c41c))return!![];}return![];}}if(_0xd7da96[_0x415b('0x325')](/<HIDE SHOP ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4a982d=JSON[_0x415b('0x191')]('['+RegExp['$1'][_0x415b('0x325')](/\d+/g)+']');for(const _0x4ddbbd of _0x4a982d){if(!$gameSwitches[_0x415b('0xc7')](_0x4ddbbd))return!![];}return![];}if(_0xd7da96[_0x415b('0x325')](/<HIDE SHOP ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4566ff=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x286e6b of _0x4566ff){if($gameSwitches['value'](_0x286e6b))return![];}return!![];}return!![];},VisuMZ[_0x415b('0x246')]['Scene_Shop_create']=Scene_Shop[_0x415b('0x386')][_0x415b('0xe5')],Scene_Shop['prototype'][_0x415b('0xe5')]=function(){VisuMZ[_0x415b('0x246')][_0x415b('0x24f')][_0x415b('0x60')](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x415b('0x36d')]();},Scene_Shop[_0x415b('0x386')][_0x415b('0x36d')]=function(){this[_0x415b('0x6f')][_0x415b('0x3b2')](),this[_0x415b('0x48')][_0x415b('0x1ea')](),this[_0x415b('0x48')][_0x415b('0xeb')](),this[_0x415b('0xaa')][_0x415b('0x1ea')]();},Scene_Shop['prototype']['helpWindowRect']=function(){if(this[_0x415b('0x203')]()){if(_0x415b('0x9e')!==_0x415b('0x9e')){function _0x33d4e8(){return![];}}else return this[_0x415b('0xb2')]();}else{if('xpaxE'===_0x415b('0x395'))return Scene_MenuBase[_0x415b('0x386')][_0x415b('0x1ed')][_0x415b('0x60')](this);else{function _0x1e8a37(){_0x22e91b['push'](_0x127833[_0x22916c]);}}}},Scene_Shop[_0x415b('0x386')]['helpWindowRectItemsEquipsCore']=function(){const _0x413a07=0x0,_0xc75021=this[_0x415b('0x235')](),_0x1afcba=Graphics[_0x415b('0x2cf')],_0x26a300=this['helpAreaHeight']();return new Rectangle(_0x413a07,_0xc75021,_0x1afcba,_0x26a300);},VisuMZ['ItemsEquipsCore'][_0x415b('0x220')]=Scene_Shop[_0x415b('0x386')][_0x415b('0x367')],Scene_Shop[_0x415b('0x386')]['goldWindowRect']=function(){return this[_0x415b('0x203')]()?this[_0x415b('0x1a2')]():VisuMZ[_0x415b('0x246')]['Scene_Shop_goldWindowRect'][_0x415b('0x60')](this);},Scene_Shop[_0x415b('0x386')][_0x415b('0x1a2')]=function(){const _0x209f10=this['mainCommandWidth'](),_0x2125c9=this[_0x415b('0x33e')](0x1,!![]),_0x3f3757=this[_0x415b('0x1cf')]()?0x0:Graphics[_0x415b('0x2cf')]-_0x209f10,_0x5037b9=this[_0x415b('0x5e')]();return new Rectangle(_0x3f3757,_0x5037b9,_0x209f10,_0x2125c9);},VisuMZ[_0x415b('0x246')][_0x415b('0x344')]=Scene_Shop[_0x415b('0x386')][_0x415b('0x192')],Scene_Shop[_0x415b('0x386')]['commandWindowRect']=function(){if(this[_0x415b('0x203')]())return this[_0x415b('0x2be')]();else{if(_0x415b('0x148')===_0x415b('0x217')){function _0x232ce0(){return _0x2a3a08[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0x36c')]['ParamChangeFontSize'];}}else return VisuMZ[_0x415b('0x246')][_0x415b('0x344')][_0x415b('0x60')](this);}},Scene_Shop[_0x415b('0x386')][_0x415b('0x2be')]=function(){const _0xa716c5=this[_0x415b('0x1cf')]()?this['mainCommandWidth']():0x0,_0x411773=this[_0x415b('0x5e')](),_0x29204e=Graphics[_0x415b('0x2cf')]-this['mainCommandWidth'](),_0x3c2803=this[_0x415b('0x33e')](0x1,!![]);return new Rectangle(_0xa716c5,_0x411773,_0x29204e,_0x3c2803);},VisuMZ['ItemsEquipsCore'][_0x415b('0x170')]=Scene_Shop[_0x415b('0x386')][_0x415b('0x10')],Scene_Shop[_0x415b('0x386')][_0x415b('0x10')]=function(){if(this[_0x415b('0x203')]())return this[_0x415b('0x28b')]();else{if(_0x415b('0x3e2')!==_0x415b('0x75'))return VisuMZ[_0x415b('0x246')][_0x415b('0x170')][_0x415b('0x60')](this);else{function _0x3a7d33(){const _0x1f4da7=this['_commandNameWindow'];_0x1f4da7[_0x415b('0x2b1')](_0x98e6ac,0x0,_0x458bed['y'],_0x1f4da7[_0x415b('0x318')],_0x415b('0x2d9'));}}}},Scene_Shop[_0x415b('0x386')][_0x415b('0x28b')]=function(){const _0x237059=this[_0x415b('0x87')]['y']+this[_0x415b('0x87')]['height'],_0x396a90=Graphics[_0x415b('0x2cf')]-this['statusWidth'](),_0x287620=this['isRightInputMode']()?Graphics[_0x415b('0x2cf')]-_0x396a90:0x0,_0xc6860b=this[_0x415b('0xc3')]()-this[_0x415b('0x87')][_0x415b('0x14a')];return new Rectangle(_0x287620,_0x237059,_0x396a90,_0xc6860b);},VisuMZ['ItemsEquipsCore'][_0x415b('0x253')]=Scene_Shop[_0x415b('0x386')][_0x415b('0xa3')],Scene_Shop[_0x415b('0x386')][_0x415b('0xa3')]=function(){if(this['isUseItemsEquipsCoreUpdatedLayout']()){if(_0x415b('0x65')===_0x415b('0x65'))return this[_0x415b('0x267')]();else{function _0xec98d(){_0x16d741['ItemsEquipsCore']['Scene_ItemBase_activateItemWindow'][_0x415b('0x60')](this),this[_0x415b('0x17b')][_0x415b('0x1fe')]();}}}else return VisuMZ[_0x415b('0x246')]['Scene_Shop_statusWindowRect'][_0x415b('0x60')](this);},Scene_Shop['prototype'][_0x415b('0x267')]=function(){const _0x258b89=this['statusWidth'](),_0x48bdc5=this[_0x415b('0xc3')]()-this[_0x415b('0x87')][_0x415b('0x14a')],_0x3bbe6d=this[_0x415b('0x1cf')]()?0x0:Graphics[_0x415b('0x2cf')]-_0x258b89,_0x3c81bd=this['_commandWindow']['y']+this[_0x415b('0x87')][_0x415b('0x14a')];return new Rectangle(_0x3bbe6d,_0x3c81bd,_0x258b89,_0x48bdc5);},VisuMZ['ItemsEquipsCore'][_0x415b('0x288')]=Scene_Shop[_0x415b('0x386')][_0x415b('0x1ee')],Scene_Shop[_0x415b('0x386')][_0x415b('0x1ee')]=function(){if(this['isUseItemsEquipsCoreUpdatedLayout']())return this[_0x415b('0x107')]();else{if(_0x415b('0x125')===_0x415b('0x125'))return VisuMZ[_0x415b('0x246')][_0x415b('0x288')][_0x415b('0x60')](this);else{function _0x26c02c(){_0x2cd201[_0x415b('0x386')][_0x415b('0x2ec')][_0x415b('0x60')](this),this[_0x415b('0x2b7')]();}}}},Scene_Shop[_0x415b('0x386')][_0x415b('0x107')]=function(){const _0x59a4b6=this[_0x415b('0x87')]['y']+this['_commandWindow'][_0x415b('0x14a')],_0x3e194d=Graphics[_0x415b('0x2cf')]-this['statusWidth'](),_0x2855f0=this[_0x415b('0xc3')]()-this[_0x415b('0x87')][_0x415b('0x14a')],_0x497022=this[_0x415b('0x1cf')]()?Graphics[_0x415b('0x2cf')]-_0x3e194d:0x0;return new Rectangle(_0x497022,_0x59a4b6,_0x3e194d,_0x2855f0);},VisuMZ[_0x415b('0x246')]['Scene_Shop_createCategoryWindow']=Scene_Shop[_0x415b('0x386')]['createCategoryWindow'],Scene_Shop[_0x415b('0x386')][_0x415b('0x1e6')]=function(){VisuMZ[_0x415b('0x246')][_0x415b('0x250')][_0x415b('0x60')](this);if(this[_0x415b('0xb0')]()){if(_0x415b('0x3e5')===_0x415b('0x3f3')){function _0x93548f(){return[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];}}else this[_0x415b('0x153')]();}},VisuMZ['ItemsEquipsCore'][_0x415b('0x17a')]=Scene_Shop['prototype'][_0x415b('0x1be')],Scene_Shop[_0x415b('0x386')]['categoryWindowRect']=function(){return this[_0x415b('0x203')]()?this[_0x415b('0x1d')]():VisuMZ[_0x415b('0x246')][_0x415b('0x17a')]['call'](this);},Scene_Shop[_0x415b('0x386')][_0x415b('0x1d')]=function(){const _0x8931e4=this[_0x415b('0x87')]['y'],_0x5b7551=this[_0x415b('0x87')]['width'],_0x3d1172=this[_0x415b('0x33e')](0x1,!![]),_0x3b17a1=this['isRightInputMode']()?Graphics[_0x415b('0x2cf')]-_0x5b7551:0x0;return new Rectangle(_0x3b17a1,_0x8931e4,_0x5b7551,_0x3d1172);},Scene_Shop[_0x415b('0x386')][_0x415b('0x153')]=function(){delete this[_0x415b('0xdb')][_0x415b('0xd7')]['ok'],delete this['_categoryWindow']['_handlers']['cancel'];},VisuMZ[_0x415b('0x246')][_0x415b('0x9')]=Scene_Shop[_0x415b('0x386')][_0x415b('0x7f')],Scene_Shop[_0x415b('0x386')][_0x415b('0x7f')]=function(){VisuMZ[_0x415b('0x246')]['Scene_Shop_createSellWindow']['call'](this),this[_0x415b('0x203')]()&&this[_0x415b('0x396')]();},VisuMZ[_0x415b('0x246')][_0x415b('0xaf')]=Scene_Shop[_0x415b('0x386')][_0x415b('0x25c')],Scene_Shop[_0x415b('0x386')][_0x415b('0x25c')]=function(){return this[_0x415b('0x203')]()?this[_0x415b('0x2f7')]():VisuMZ[_0x415b('0x246')][_0x415b('0xaf')][_0x415b('0x60')](this);},Scene_Shop['prototype'][_0x415b('0x2f7')]=function(){const _0x3d0916=this[_0x415b('0xdb')]['y']+this[_0x415b('0xdb')][_0x415b('0x14a')],_0x3c1c33=Graphics[_0x415b('0x2cf')]-this[_0x415b('0x300')](),_0x5ca01b=this[_0x415b('0xc3')]()-this['_categoryWindow'][_0x415b('0x14a')],_0x38acdb=this[_0x415b('0x1cf')]()?Graphics[_0x415b('0x2cf')]-_0x3c1c33:0x0;return new Rectangle(_0x38acdb,_0x3d0916,_0x3c1c33,_0x5ca01b);},Scene_Shop[_0x415b('0x386')][_0x415b('0x396')]=function(){this['_sellWindow'][_0x415b('0x16a')](this[_0x415b('0xaa')]);},Scene_Shop['prototype'][_0x415b('0x300')]=function(){return VisuMZ[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0x36c')][_0x415b('0x144')];},VisuMZ[_0x415b('0x246')]['Scene_Shop_activateSellWindow']=Scene_Shop['prototype']['activateSellWindow'],Scene_Shop['prototype'][_0x415b('0xdf')]=function(){VisuMZ[_0x415b('0x246')][_0x415b('0x130')][_0x415b('0x60')](this),this[_0x415b('0x203')]()&&this[_0x415b('0xaa')]['show']();},VisuMZ[_0x415b('0x246')][_0x415b('0x38c')]=Scene_Shop['prototype']['commandBuy'],Scene_Shop[_0x415b('0x386')][_0x415b('0x2d8')]=function(){VisuMZ[_0x415b('0x246')][_0x415b('0x38c')][_0x415b('0x60')](this),this[_0x415b('0x203')]()&&this[_0x415b('0x3c2')]();},Scene_Shop['prototype'][_0x415b('0x3c2')]=function(){this['_buyWindowLastIndex']=this[_0x415b('0x2fc')]||0x0,this[_0x415b('0x48')][_0x415b('0xa9')](this['_buyWindowLastIndex']);},VisuMZ[_0x415b('0x246')]['Scene_Shop_commandSell']=Scene_Shop[_0x415b('0x386')][_0x415b('0x2d4')],Scene_Shop[_0x415b('0x386')][_0x415b('0x2d4')]=function(){VisuMZ[_0x415b('0x246')][_0x415b('0x89')][_0x415b('0x60')](this);if(this[_0x415b('0x203')]()){if(_0x415b('0x363')!==_0x415b('0x363')){function _0x36cd0f(){if(_0x1c4b40[_0x415b('0xc7')](_0x3c358a))return![];}}else this[_0x415b('0x147')]();}this[_0x415b('0xb0')]()&&(this['_categoryWindow']['smoothSelect'](0x0),this[_0x415b('0x4f')]());},Scene_Shop[_0x415b('0x386')][_0x415b('0x147')]=function(){this['_buyWindow'][_0x415b('0x3b2')](),this[_0x415b('0x87')][_0x415b('0x3b2')]();},VisuMZ[_0x415b('0x246')]['Scene_Shop_onBuyCancel']=Scene_Shop[_0x415b('0x386')][_0x415b('0x33a')],Scene_Shop[_0x415b('0x386')][_0x415b('0x33a')]=function(){VisuMZ[_0x415b('0x246')][_0x415b('0x31e')][_0x415b('0x60')](this);if(this['isUseItemsEquipsCoreUpdatedLayout']()){if(_0x415b('0xc8')!==_0x415b('0xc8')){function _0x31d696(){const _0x6b15f1=this[_0x415b('0x3bf')]();this[_0x415b('0xe1')](_0x6b15f1,_0x50f4a6,_0x3e719f,_0x58b4f9,!![]);const _0x584f4e=this[_0x415b('0x181')]();return this['drawItemKeyData'](_0x584f4e,_0x18a97f,_0x1223b4,_0xe675dc,![],_0x415b('0x29')),this[_0x415b('0x32f')](_0x459c9d,_0x303696,_0x22bb37),this[_0x415b('0x3bc')](),!![];}}else this[_0x415b('0x373')]();}},Scene_Shop[_0x415b('0x386')][_0x415b('0x373')]=function(){this['_buyWindowLastIndex']=this['_buyWindow'][_0x415b('0x2de')](),this[_0x415b('0x48')][_0x415b('0x1ea')](),this[_0x415b('0x48')][_0x415b('0xeb')](),this['_buyWindow'][_0x415b('0x1f7')](0x0,0x0),this[_0x415b('0xaa')][_0x415b('0x1ea')](),this[_0x415b('0x6f')][_0x415b('0x3b2')]();},VisuMZ[_0x415b('0x246')][_0x415b('0x232')]=Scene_Shop['prototype']['onCategoryCancel'],Scene_Shop[_0x415b('0x386')][_0x415b('0x249')]=function(){VisuMZ['ItemsEquipsCore'][_0x415b('0x232')][_0x415b('0x60')](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x415b('0x366')]();},Scene_Shop[_0x415b('0x386')][_0x415b('0x366')]=function(){this[_0x415b('0x48')][_0x415b('0x1ea')](),this[_0x415b('0x87')][_0x415b('0x1ea')]();},VisuMZ[_0x415b('0x246')][_0x415b('0x185')]=Scene_Shop[_0x415b('0x386')]['onSellOk'],Scene_Shop[_0x415b('0x386')][_0x415b('0x1e')]=function(){VisuMZ['ItemsEquipsCore'][_0x415b('0x185')][_0x415b('0x60')](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x415b('0x258')]();},Scene_Shop[_0x415b('0x386')][_0x415b('0x258')]=function(){this['_categoryWindow']['show']();},VisuMZ[_0x415b('0x246')]['Scene_Shop_onSellCancel']=Scene_Shop[_0x415b('0x386')]['onSellCancel'],Scene_Shop[_0x415b('0x386')][_0x415b('0x14f')]=function(){VisuMZ[_0x415b('0x246')][_0x415b('0x1e8')][_0x415b('0x60')](this),this[_0x415b('0xb0')]()&&this[_0x415b('0x249')]();},VisuMZ[_0x415b('0x246')][_0x415b('0x346')]=Scene_Shop[_0x415b('0x386')][_0x415b('0x319')],Scene_Shop[_0x415b('0x386')][_0x415b('0x319')]=function(){let _0x674e4d=this[_0x415b('0x32d')]();const _0x5ca46d=this[_0x415b('0x37')];return _0x674e4d=VisuMZ[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0x41')][_0x415b('0x3d9')][_0x415b('0x60')](this,_0x5ca46d,_0x674e4d),_0x674e4d;},Scene_Shop[_0x415b('0x386')][_0x415b('0x32d')]=function(){if(!this[_0x415b('0x37')])return 0x0;else{if(this[_0x415b('0x37')]['note']['match'](/<JS SELL PRICE>\s*([\s\S]*)\s*<\/JS SELL PRICE>/i)){const _0x24d9ea=String(RegExp['$1']);let _0x24adf8=this[_0x415b('0x37')],_0x28236c=_0x24adf8[_0x415b('0x49')]*this['sellPriceRate']();try{eval(_0x24d9ea);}catch(_0x222727){if($gameTemp[_0x415b('0x3e0')]())console[_0x415b('0x411')](_0x222727);}if(isNaN(_0x28236c))_0x28236c=0x0;return Math[_0x415b('0x38f')](_0x28236c);}else{if(this[_0x415b('0x37')]['note'][_0x415b('0x325')](/<SELL PRICE:[ ](\d+)>/i))return parseInt(RegExp['$1']);else{if(_0x415b('0x271')!==_0x415b('0x271')){function _0x3f88cf(){const _0x52ce53=_0x4b7a54[_0x415b('0x3b8')](this);_0x52ce53[_0x415b('0x1d3')]=!![],_0x30a492[_0x415b('0x246')]['Game_Actor_changeEquip'][_0x415b('0x60')](this,_0x5182d,_0x5196a1),this[_0x415b('0x3ce')](_0x52ce53);}}else return Math['floor'](this[_0x415b('0x37')][_0x415b('0x49')]*this['sellPriceRate']());}}}},Scene_Shop[_0x415b('0x386')][_0x415b('0x195')]=function(){return VisuMZ['ItemsEquipsCore'][_0x415b('0x101')][_0x415b('0x41')]['SellPriceRate'];},Scene_Shop[_0x415b('0x386')]['buttonAssistItemListRequirement']=function(){if(!this['updatedLayoutStyle']())return![];if(!this[_0x415b('0xb0')]())return![];if(!this[_0x415b('0x260')])return![];if(!this[_0x415b('0x260')][_0x415b('0x275')])return![];return this[_0x415b('0x3b9')]()&&this['isUseModernControls']();},Scene_Shop[_0x415b('0x386')][_0x415b('0x161')]=function(){if(this[_0x415b('0xa7')]()){if(this[_0x415b('0x260')]['maxCols']()===0x1){if(_0x415b('0x59')===_0x415b('0x59'))return TextManager[_0x415b('0x1f4')](_0x415b('0x1ca'),_0x415b('0x29'));else{function _0x3349d7(){this[_0x415b('0x30c')]();}}}else{if(_0x415b('0x403')==='KqKxT'){function _0x45ec38(){if(!_0x5ca886[_0x415b('0xc7')](_0x29c085))return![];}}else return TextManager[_0x415b('0x1f4')](_0x415b('0x23f'),_0x415b('0x348'));}}else{if(this[_0x415b('0x29d')]&&this[_0x415b('0x29d')][_0x415b('0x275')])return TextManager[_0x415b('0x1f4')]('left',_0x415b('0x29'));}return Scene_MenuBase[_0x415b('0x386')]['buttonAssistKey1'][_0x415b('0x60')](this);},Scene_Shop[_0x415b('0x386')][_0x415b('0x2af')]=function(){if(this[_0x415b('0x29d')]&&this['_numberWindow'][_0x415b('0x275')]){if('pVrMJ'===_0x415b('0x3e1'))return TextManager[_0x415b('0x1f4')]('up',_0x415b('0xb9'));else{function _0x960560(){const _0x24c2b6=this[_0x415b('0xa3')]();this[_0x415b('0xaa')]=new _0x392475(_0x24c2b6),this[_0x415b('0x165')](this['_statusWindow']),this['_itemWindow'][_0x415b('0x16a')](this[_0x415b('0xaa')]);}}}return Scene_MenuBase[_0x415b('0x386')][_0x415b('0x2af')][_0x415b('0x60')](this);},Scene_Shop[_0x415b('0x386')][_0x415b('0x251')]=function(){if(this[_0x415b('0xa7')]())return VisuMZ[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0x209')][_0x415b('0x132')];else{if(this[_0x415b('0x29d')]&&this[_0x415b('0x29d')]['active'])return VisuMZ[_0x415b('0x246')][_0x415b('0x101')]['ShopScene'][_0x415b('0x23c')];}return Scene_MenuBase[_0x415b('0x386')][_0x415b('0x251')][_0x415b('0x60')](this);},Scene_Shop[_0x415b('0x386')]['buttonAssistText2']=function(){if(this[_0x415b('0x29d')]&&this[_0x415b('0x29d')]['active']){if('OxFsh'===_0x415b('0xc0')){function _0x271f83(){if(_0x5138d8)_0x394bfa+=this[_0x415b('0x1a6')](_0x196cc4,_0x14e39a);}}else return VisuMZ[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0x41')][_0x415b('0x3c6')];}return Scene_MenuBase[_0x415b('0x386')][_0x415b('0x259')][_0x415b('0x60')](this);};function Sprite_NewLabel(){this[_0x415b('0x3c7')](...arguments);}Sprite_NewLabel['prototype']=Object[_0x415b('0xe5')](Sprite[_0x415b('0x386')]),Sprite_NewLabel[_0x415b('0x386')][_0x415b('0x23d')]=Sprite_NewLabel,Sprite_NewLabel[_0x415b('0x386')][_0x415b('0x3c7')]=function(){Sprite[_0x415b('0x386')][_0x415b('0x3c7')][_0x415b('0x60')](this),this[_0x415b('0x168')]();},Sprite_NewLabel['prototype'][_0x415b('0x168')]=function(){const _0x35260c=ImageManager[_0x415b('0x293')],_0x194682=ImageManager['iconHeight'];this[_0x415b('0x234')]=new Bitmap(_0x35260c,_0x194682),this[_0x415b('0x6')](),this[_0x415b('0x2c4')]();},Sprite_NewLabel['prototype'][_0x415b('0x6')]=function(){const _0x1f32ea=VisuMZ[_0x415b('0x246')]['Settings'][_0x415b('0x2bd')][_0x415b('0x3f9')];if(_0x1f32ea<=0x0)return;const _0x25a9bd=ImageManager['loadSystem'](_0x415b('0x324')),_0x3fd801=ImageManager['iconWidth'],_0x20e552=ImageManager[_0x415b('0x3a')],_0x39ad0b=_0x1f32ea%0x10*_0x3fd801,_0x52df00=Math['floor'](_0x1f32ea/0x10)*_0x20e552;this[_0x415b('0x234')]['blt'](_0x25a9bd,_0x39ad0b,_0x52df00,_0x3fd801,_0x20e552,0x0,0x0);},Sprite_NewLabel[_0x415b('0x386')][_0x415b('0x2c4')]=function(){const _0x5e68e4=VisuMZ[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0x2bd')],_0x15cfb8=_0x5e68e4['Text'];if(_0x15cfb8==='')return;const _0x1a02aa=ImageManager['iconWidth'],_0x510032=ImageManager[_0x415b('0x3a')];this['bitmap'][_0x415b('0x4a')]=_0x5e68e4[_0x415b('0x27a')]||$gameSystem['mainFontFace'](),this[_0x415b('0x234')][_0x415b('0x35')]=this[_0x415b('0x32')](),this['bitmap'][_0x415b('0x133')]=_0x5e68e4[_0x415b('0x2f8')],this['bitmap'][_0x415b('0x2b1')](_0x15cfb8,0x0,_0x510032/0x2,_0x1a02aa,_0x510032/0x2,_0x415b('0x2d9'));},Sprite_NewLabel[_0x415b('0x386')]['getTextColor']=function(){const _0x49852b=VisuMZ[_0x415b('0x246')][_0x415b('0x101')]['New'][_0x415b('0x8a')];return _0x49852b[_0x415b('0x325')](/#(.*)/i)?'#'+String(RegExp['$1']):ColorManager[_0x415b('0x35')](_0x49852b);},Window_Base[_0x415b('0x386')][_0x415b('0x1c1')]=function(_0x1e4a01,_0x26933c,_0x58f626,_0xd819be){if(_0x1e4a01){const _0x51310d=_0x58f626+(this['lineHeight']()-ImageManager[_0x415b('0x3a')])/0x2,_0x4dceb=ImageManager[_0x415b('0x293')]+0x4,_0x1cc0d6=Math[_0x415b('0x20e')](0x0,_0xd819be-_0x4dceb);this[_0x415b('0x6b')](ColorManager['getItemColor'](_0x1e4a01)),this[_0x415b('0x39c')](_0x1e4a01[_0x415b('0xb4')],_0x26933c,_0x51310d),this[_0x415b('0x2b1')](_0x1e4a01[_0x415b('0x225')],_0x26933c+_0x4dceb,_0x58f626,_0x1cc0d6),this[_0x415b('0x356')]();}},Window_Base['prototype'][_0x415b('0x1ba')]=function(_0x49b866,_0x3654ce,_0x1323dc,_0x1d4633){if(this[_0x415b('0xb8')](_0x49b866)){this[_0x415b('0x3bc')]();const _0x36fffc=VisuMZ[_0x415b('0x246')]['Settings'][_0x415b('0x209')],_0x3030d5=_0x36fffc[_0x415b('0xf2')],_0x1ca920=_0x3030d5[_0x415b('0x3ba')]($gameParty[_0x415b('0x2ef')](_0x49b866));this[_0x415b('0x21c')][_0x415b('0x133')]=_0x36fffc[_0x415b('0x22a')],this[_0x415b('0x2b1')](_0x1ca920,_0x3654ce,_0x1323dc,_0x1d4633,_0x415b('0x29')),this['resetFontSettings']();}},Window_Base[_0x415b('0x386')][_0x415b('0xb8')]=function(_0x3625a6){if(DataManager[_0x415b('0x272')](_0x3625a6))return $dataSystem['optKeyItemsNumber'];return!![];},Window_Base['prototype'][_0x415b('0x32f')]=function(_0x1c411b,_0xdfbd2f,_0x5cb4ed,_0x5afec9,_0x35ce04){_0x35ce04=Math[_0x415b('0x20e')](_0x35ce04||0x1,0x1);while(_0x35ce04--){_0x5afec9=_0x5afec9||this[_0x415b('0x1f8')](),this['contentsBack'][_0x415b('0x183')]=0xa0;const _0x15bcd5=ColorManager[_0x415b('0x216')]();this[_0x415b('0x1a7')][_0x415b('0x36e')](_0x1c411b+0x1,_0xdfbd2f+0x1,_0x5cb4ed-0x2,_0x5afec9-0x2,_0x15bcd5),this[_0x415b('0x1a7')][_0x415b('0x183')]=0xff;}},VisuMZ[_0x415b('0x246')]['Window_Selectable_initialize']=Window_Selectable[_0x415b('0x386')][_0x415b('0x3c7')],Window_Selectable[_0x415b('0x386')]['initialize']=function(_0x2d7867){this[_0x415b('0x152')](),VisuMZ[_0x415b('0x246')][_0x415b('0x3eb')]['call'](this,_0x2d7867);},Window_Selectable[_0x415b('0x386')][_0x415b('0x152')]=function(){this['_newLabelSprites']={},this[_0x415b('0xfc')]=0xff,this[_0x415b('0x3af')]=VisuMZ[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0x2bd')][_0x415b('0xc9')],this['_newLabelOpacityUpperLimit']=VisuMZ[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0x2bd')][_0x415b('0xdc')];},Window_Selectable[_0x415b('0x386')][_0x415b('0xea')]=function(){return![];},VisuMZ[_0x415b('0x246')]['Window_Selectable_setHelpWindowItem']=Window_Selectable[_0x415b('0x386')][_0x415b('0x151')],Window_Selectable[_0x415b('0x386')][_0x415b('0x151')]=function(_0xccb961){VisuMZ['ItemsEquipsCore'][_0x415b('0x33f')][_0x415b('0x60')](this,_0xccb961);if(this[_0x415b('0xea')]())this[_0x415b('0x2e7')](_0xccb961);},Window_Selectable[_0x415b('0x386')][_0x415b('0x2e7')]=function(_0xb338d3){if(!_0xb338d3)return;$gameParty[_0x415b('0x3d1')](_0xb338d3);let _0x93c9e='';if(DataManager[_0x415b('0x8')](_0xb338d3))_0x93c9e=_0x415b('0x137')[_0x415b('0x3ba')](_0xb338d3['id']);else{if(DataManager['isWeapon'](_0xb338d3))_0x93c9e=_0x415b('0x384')[_0x415b('0x3ba')](_0xb338d3['id']);else{if(DataManager[_0x415b('0x214')](_0xb338d3)){if(_0x415b('0xf1')===_0x415b('0xf1'))_0x93c9e=_0x415b('0x63')['format'](_0xb338d3['id']);else{function _0x4d19c3(){const _0x23a360=_0x415b('0x210');if(!this['_itemData']['addStateBuffChanges']&&!this[_0x415b('0x85')][_0x23a360])return![];const _0x2eb1f7=this[_0x415b('0x1bf')]();this[_0x415b('0xe1')](_0x2eb1f7,_0x591a18,_0x1ad809,_0x36d10f,!![]);const _0x49ab56=this[_0x415b('0x24d')]();return this[_0x415b('0xe1')](_0x49ab56,_0x2ac0d1,_0x22da59,_0x420355,![],_0x415b('0x29')),this['drawItemDarkRect'](_0x3e4d1b,_0x33c201,_0x3a7785),this[_0x415b('0x3bc')](),!![];}}}else{if(_0x415b('0x40d')===_0x415b('0x40d'))return;else{function _0x305c1c(){const _0x583522=this[_0x415b('0x11b')],_0x28691c=_0x527b46[_0x415b('0x336')](),_0x421057=_0x2a5ecd['x']+_0x364a5f[_0x415b('0x38f')](_0xd540e6[_0x415b('0x2c0')]/0x2)+_0x28691c;_0x583522['x']=_0x583522['width']/-0x2+_0x421057,_0x583522['y']=_0x4b9081['floor'](_0x2955df['height']/0x2);}}}}}const _0x4474bf=this[_0x415b('0x7c')][_0x93c9e];if(_0x4474bf)_0x4474bf[_0x415b('0x3b2')]();},VisuMZ[_0x415b('0x246')]['Window_Selectable_refresh']=Window_Selectable[_0x415b('0x386')][_0x415b('0x2ec')],Window_Selectable[_0x415b('0x386')][_0x415b('0x2ec')]=function(){this[_0x415b('0x381')](),VisuMZ['ItemsEquipsCore'][_0x415b('0x3c')][_0x415b('0x60')](this);},Window_Selectable[_0x415b('0x386')][_0x415b('0x381')]=function(){for(const _0x57d96f of Object['values'](this[_0x415b('0x7c')])){_0x57d96f[_0x415b('0x3b2')]();}},VisuMZ['ItemsEquipsCore'][_0x415b('0x1ef')]=Window_Selectable[_0x415b('0x386')][_0x415b('0x30b')],Window_Selectable['prototype'][_0x415b('0x30b')]=function(){this['updateNewLabelOpacity'](),VisuMZ[_0x415b('0x246')][_0x415b('0x1ef')][_0x415b('0x60')](this);},Window_Selectable[_0x415b('0x386')]['updateNewLabelOpacity']=function(){if(!this[_0x415b('0xea')]())return;const _0x3cb2d4=this[_0x415b('0x1b4')];this[_0x415b('0xfc')]+=this[_0x415b('0x3af')];if(this[_0x415b('0xfc')]>=_0x3cb2d4||this[_0x415b('0xfc')]<=0x0){if('kEMLk'!==_0x415b('0xd6'))this[_0x415b('0x3af')]*=-0x1;else{function _0x16c99f(){return this[_0x415b('0x1a2')]();}}}this[_0x415b('0xfc')]=this[_0x415b('0xfc')][_0x415b('0x2c')](0x0,_0x3cb2d4);for(const _0x4ad8cf of Object[_0x415b('0x76')](this[_0x415b('0x7c')])){if('NFZdO'==='NFZdO')_0x4ad8cf['opacity']=this[_0x415b('0xfc')];else{function _0x49ca04(){return _0x5b55a5[_0x415b('0x3b1')];}}}},Window_Selectable[_0x415b('0x386')]['createNewLabelSprite']=function(_0x1b323d){const _0x543f95=this['_newLabelSprites'];if(_0x543f95[_0x1b323d])return _0x543f95[_0x1b323d];else{if(_0x415b('0x382')!==_0x415b('0x164')){const _0x3e263a=new Sprite_NewLabel();return _0x543f95[_0x1b323d]=_0x3e263a,this['addInnerChild'](_0x3e263a),_0x3e263a;}else{function _0x1a8668(){this[_0x415b('0x1a8')]();}}}},Window_Selectable[_0x415b('0x386')]['placeNewLabel']=function(_0x5e1adc,_0xb03fea,_0x186f3a){let _0x565afd='';if(DataManager[_0x415b('0x8')](_0x5e1adc)){if(_0x415b('0x9c')==='JIGuI')_0x565afd=_0x415b('0x137')['format'](_0x5e1adc['id']);else{function _0x5da9ad(){return _0x3c7b67['ItemsEquipsCore'][_0x415b('0x101')][_0x415b('0x209')][_0x415b('0x21e')];}}}else{if(DataManager['isWeapon'](_0x5e1adc)){if(_0x415b('0x1ad')!==_0x415b('0x3d0'))_0x565afd=_0x415b('0x384')[_0x415b('0x3ba')](_0x5e1adc['id']);else{function _0xbdc19d(){_0x1a7c5a[_0x415b('0x246')][_0x415b('0x250')][_0x415b('0x60')](this),this[_0x415b('0xb0')]()&&this[_0x415b('0x153')]();}}}else{if(DataManager[_0x415b('0x214')](_0x5e1adc))_0x565afd=_0x415b('0x63')['format'](_0x5e1adc['id']);else return;}}const _0xbb758d=this[_0x415b('0x369')](_0x565afd);_0xbb758d['move'](_0xb03fea,_0x186f3a),_0xbb758d['show'](),_0xbb758d[_0x415b('0x7b')]=this['_newLabelOpacity'];},Window_ItemCategory[_0x415b('0x3d')]=VisuMZ[_0x415b('0x246')]['Settings'][_0x415b('0x397')]['List'],Window_ItemCategory['categoryItemTypes']=[_0x415b('0x227'),_0x415b('0x29c'),_0x415b('0x19e'),'Nonconsumable',_0x415b('0x24c'),_0x415b('0x116'),_0x415b('0x3b6'),'FieldUsable',_0x415b('0x283')],VisuMZ[_0x415b('0x246')]['Window_ItemCategory_initialize']=Window_ItemCategory['prototype'][_0x415b('0x3c7')],Window_ItemCategory[_0x415b('0x386')][_0x415b('0x3c7')]=function(_0x39a0c3){VisuMZ['ItemsEquipsCore'][_0x415b('0x247')][_0x415b('0x60')](this,_0x39a0c3),this[_0x415b('0x184')](_0x39a0c3);},Window_ItemCategory[_0x415b('0x386')][_0x415b('0x184')]=function(_0x464217){const _0x3d7dae=new Rectangle(0x0,0x0,_0x464217['width'],_0x464217[_0x415b('0x14a')]);this['_categoryNameWindow']=new Window_Base(_0x3d7dae),this[_0x415b('0x3db')][_0x415b('0x7b')]=0x0,this[_0x415b('0x2a0')](this[_0x415b('0x3db')]),this[_0x415b('0x149')]();},Window_ItemCategory[_0x415b('0x386')][_0x415b('0xb0')]=function(){return Imported['VisuMZ_0_CoreEngine']&&Window_HorzCommand[_0x415b('0x386')][_0x415b('0xb0')][_0x415b('0x60')](this);},Window_ItemCategory[_0x415b('0x386')][_0x415b('0x11d')]=function(){if(!this[_0x415b('0xb0')]())Window_HorzCommand['prototype'][_0x415b('0x11d')][_0x415b('0x60')](this);},Window_ItemCategory['prototype'][_0x415b('0x30d')]=function(){return this[_0x415b('0x243')]?this[_0x415b('0x72')]():0x4;},Window_ItemCategory[_0x415b('0x386')][_0x415b('0x30b')]=function(){Window_HorzCommand[_0x415b('0x386')][_0x415b('0x30b')][_0x415b('0x60')](this);if(this[_0x415b('0x17b')]){if(_0x415b('0x3c1')!==_0x415b('0x3c1')){function _0x301651(){return 0x16;}}else this[_0x415b('0x17b')][_0x415b('0x3fe')](this['currentExt']());}},Window_ItemCategory[_0x415b('0x386')][_0x415b('0xa5')]=function(){if(this[_0x415b('0x35d')]()){const _0xb4cb6f=this[_0x415b('0x2de')]();if(this[_0x415b('0x17b')]&&this[_0x415b('0x17b')][_0x415b('0x30d')]()<=0x1){if(Input['isRepeated'](_0x415b('0x29'))){if(_0x415b('0x26b')!==_0x415b('0x26b')){function _0x4cc1f6(){this[_0x415b('0xa4')](this['index']())?(this[_0x415b('0x1e0')](),this[_0x415b('0x2d1')]()):this[_0x415b('0x18b')]();}}else this[_0x415b('0xd0')](Input['isTriggered'](_0x415b('0x29')));}if(Input['isRepeated']('left')){if(_0x415b('0x36a')!=='LmqAw'){function _0x54bdc5(){return this['defaultItemMax'](_0x808411);}}else this[_0x415b('0xd4')](Input[_0x415b('0x236')](_0x415b('0x1ca')));}}else this[_0x415b('0x17b')]&&this[_0x415b('0x17b')][_0x415b('0x30d')]()>0x1&&(Input[_0x415b('0x263')](_0x415b('0x348'))&&!Input[_0x415b('0x36b')](_0x415b('0x108'))&&this[_0x415b('0xd0')](Input[_0x415b('0x236')](_0x415b('0x348'))),Input['isRepeated']('pageup')&&!Input['isPressed']('shift')&&this['cursorLeft'](Input['isTriggered'](_0x415b('0x23f'))));if(this[_0x415b('0x2de')]()!==_0xb4cb6f){if(_0x415b('0x12e')!==_0x415b('0x1f'))this['playCursorSound']();else{function _0x1c62e7(){return this[_0x415b('0x2f7')]();}}}}},Window_ItemCategory[_0x415b('0x386')][_0x415b('0x29e')]=function(){if(this[_0x415b('0xb0')]())return;Window_HorzCommand[_0x415b('0x386')][_0x415b('0x29e')][_0x415b('0x60')](this);},Window_ItemCategory[_0x415b('0x386')]['isHoverEnabled']=function(){return this[_0x415b('0xb0')]()?![]:Window_HorzCommand[_0x415b('0x386')]['isHoverEnabled'][_0x415b('0x60')](this);},Window_ItemCategory[_0x415b('0x386')][_0x415b('0x255')]=function(){if(this[_0x415b('0x3dd')]()){if(_0x415b('0x4b')===_0x415b('0x218')){function _0x304b52(){return this[_0x415b('0x6d')]?this[_0x415b('0x1db')]?_0x322076['ShopMenuStatusStandard']:0x1:_0x264f6f['ItemsEquipsCore'][_0x415b('0x2e9')][_0x415b('0x60')](this,_0x302dbc);}}else{TouchInput[_0x415b('0x236')]()&&this[_0x415b('0x1e3')](!![]);if(TouchInput[_0x415b('0x308')]())this[_0x415b('0x1c7')]();else{if(TouchInput[_0x415b('0x3ed')]()){if('UqFJQ'!==_0x415b('0x298'))this['onTouchCancel']();else{function _0xb9c33e(){if(this[_0x415b('0xb8')](_0x285f1d)){this[_0x415b('0x3bc')]();const _0x31cd51=_0x1b878['ItemsEquipsCore'][_0x415b('0x101')][_0x415b('0x209')],_0x3a6232=_0x31cd51['ItemQuantityFmt'],_0x5aefbc=_0x3a6232[_0x415b('0x3ba')](_0x4fe052[_0x415b('0x2ef')](_0x3871e6));this[_0x415b('0x21c')][_0x415b('0x133')]=_0x31cd51[_0x415b('0x22a')],this['drawText'](_0x5aefbc,_0x54c06a,_0x20d969,_0x26ea6f,_0x415b('0x29')),this[_0x415b('0x3bc')]();}}}}}}}},Window_ItemCategory['prototype']['onTouchSelect']=function(_0x57250a){this['isUseModernControls']()?this[_0x415b('0x86')](!![]):Window_HorzCommand[_0x415b('0x386')][_0x415b('0x1e3')][_0x415b('0x60')](this,_0x57250a);},Window_ItemCategory[_0x415b('0x386')]['onTouchSelectModern']=function(_0x856344){this[_0x415b('0x1fa')]=![];if(this[_0x415b('0x35d')]()){const _0x236894=this[_0x415b('0x2de')](),_0x437b8e=this[_0x415b('0x1e9')]();_0x437b8e>=0x0&&_0x437b8e!==this[_0x415b('0x2de')]()&&this[_0x415b('0x131')](_0x437b8e);if(_0x856344&&this['index']()!==_0x236894){if(_0x415b('0x40e')!==_0x415b('0x1ce'))this['playCursorSound']();else{function _0x369d06(){return _0x149a16[_0x415b('0x325')](/#(.*)/i)?_0x415b('0x3e4')[_0x415b('0x3ba')](_0x53cdc(_0x4e2c1b['$1'])):this[_0x415b('0x35')](_0x5ccf5b(_0x3a329e));}}}}},Window_ItemCategory[_0x415b('0x386')][_0x415b('0x38')]=function(){for(const _0x2cf170 of Window_ItemCategory[_0x415b('0x3d')]){this['addItemCategory'](_0x2cf170);}this[_0x415b('0x131')](this[_0x415b('0x2de')]());},Window_ItemCategory[_0x415b('0x386')]['addItemCategory']=function(_0x49c313){const _0x3beee7=_0x49c313['Type'],_0x4b929c=_0x49c313[_0x415b('0x3f9')];let _0x1db5dc='',_0x4ee0a0=_0x415b('0x224'),_0x3b471b=_0x3beee7;if(_0x3beee7[_0x415b('0x325')](/Category:(.*)/i))_0x1db5dc=String(RegExp['$1'])[_0x415b('0x379')]();else{if(Window_ItemCategory['categoryItemTypes'][_0x415b('0x326')](_0x3beee7))_0x1db5dc=VisuMZ[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0x397')][_0x3beee7];else{if([_0x415b('0x227'),_0x415b('0xc1')]['includes'](_0x3beee7))_0x1db5dc=TextManager[_0x415b('0x2ab')];else{if(_0x3beee7===_0x415b('0x228')){if('zXXqi'!==_0x415b('0x10f'))_0x1db5dc=TextManager[_0x415b('0x3dc')];else{function _0xea0a0e(){_0x4f09bc['prototype']['isRightInputMode'][_0x415b('0x60')](this);}}}else{if(_0x3beee7===_0x415b('0x3f')){if(_0x415b('0x27f')==='zAXuk'){function _0x478a18(){_0x5b2f41[_0x415b('0x246')][_0x415b('0x31e')]['call'](this),this[_0x415b('0x203')]()&&this[_0x415b('0x373')]();}}else _0x1db5dc=TextManager['weapon'];}else{if(_0x3beee7===_0x415b('0xe9')){if('dzSkI'!=='dzSkI'){function _0x2ea0cb(){this[_0x415b('0x147')]();}}else _0x1db5dc=TextManager[_0x415b('0x282')];}else{if(_0x3beee7['match'](/WTYPE:(\d+)/i))_0x1db5dc=$dataSystem[_0x415b('0x28e')][Number(RegExp['$1'])]||'';else{if(_0x3beee7[_0x415b('0x325')](/ATYPE:(\d+)/i))_0x1db5dc=$dataSystem[_0x415b('0x205')][Number(RegExp['$1'])]||'';else{if(_0x3beee7[_0x415b('0x325')](/ETYPE:(\d+)/i)){if('gnVea'==='nIuID'){function _0x55d621(){if(_0x24dd39)_0x4a430e['prepareNewEquipSlotsOnLoad']();}}else _0x1db5dc=$dataSystem[_0x415b('0x34a')][Number(RegExp['$1'])]||'';}}}}}}}}}if(_0x4b929c>0x0&&this[_0x415b('0x3e8')]()!=='text'){if(_0x415b('0x18c')!==_0x415b('0x18c')){function _0x4401c3(){_0x41e2a1['ItemsEquipsCore'][_0x415b('0x2e6')]['call'](this,_0x3e06f7),this[_0x415b('0x99')](_0x210e3d);}}else _0x1db5dc=_0x415b('0x1f6')['format'](_0x4b929c,_0x1db5dc);}this[_0x415b('0x4c')](_0x1db5dc,_0x4ee0a0,!![],_0x3b471b);},Window_ItemCategory[_0x415b('0x386')][_0x415b('0x312')]=function(){return VisuMZ[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0x397')]['TextAlign'];},Window_ItemCategory[_0x415b('0x386')]['drawItem']=function(_0x15992c){const _0x1291f9=this[_0x415b('0x34c')](_0x15992c);if(_0x1291f9===_0x415b('0x39d'))this[_0x415b('0xec')](_0x15992c);else{if(_0x1291f9===_0x415b('0x279')){if(_0x415b('0x2e4')!=='PLuuR')this[_0x415b('0x3fc')](_0x15992c);else{function _0x3751f5(){return!!_0x38b4e7&&_0x21bb4f[_0x415b('0x213')][_0x415b('0x326')](_0x4337b7(_0x8327de['$1'])['toUpperCase']()['trim']());}}}else Window_HorzCommand[_0x415b('0x386')][_0x415b('0xee')][_0x415b('0x60')](this,_0x15992c);}},Window_ItemCategory['prototype'][_0x415b('0x3e8')]=function(){return VisuMZ[_0x415b('0x246')][_0x415b('0x101')]['Categories']['Style'];},Window_ItemCategory[_0x415b('0x386')][_0x415b('0x34c')]=function(_0x10df2a){if(_0x10df2a<0x0)return'text';const _0xcb4652=this[_0x415b('0x3e8')]();if(_0xcb4652!=='auto')return _0xcb4652;else{const _0x3f7f93=this[_0x415b('0x11e')](_0x10df2a);if(_0x3f7f93[_0x415b('0x325')](/\\I\[(\d+)\]/i)){const _0x12d4dc=this[_0x415b('0x97')](_0x10df2a),_0x192688=this[_0x415b('0x25d')](_0x3f7f93)[_0x415b('0x2c0')];if(_0x192688<=_0x12d4dc[_0x415b('0x2c0')]){if(_0x415b('0x1b1')===_0x415b('0x1b1'))return _0x415b('0x39d');else{function _0x446f1e(){return _0x51c97a[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0x36c')][_0x415b('0x339')];}}}else return _0x415b('0x279');}else return _0x415b('0x8b');}},Window_ItemCategory['prototype'][_0x415b('0xec')]=function(_0x423558){const _0x41df9b=this[_0x415b('0x97')](_0x423558),_0x1a745d=this[_0x415b('0x11e')](_0x423558),_0x25198f=this[_0x415b('0x25d')](_0x1a745d)['width'];this[_0x415b('0x27e')](this[_0x415b('0x1d7')](_0x423558));const _0x150e17=this[_0x415b('0x312')]();if(_0x150e17===_0x415b('0x29'))this[_0x415b('0x47')](_0x1a745d,_0x41df9b['x']+_0x41df9b[_0x415b('0x2c0')]-_0x25198f,_0x41df9b['y'],_0x25198f);else{if(_0x150e17===_0x415b('0x2d9')){if('isgqV'!==_0x415b('0x229')){function _0x3280b4(){return _0x18e582[_0x415b('0x246')][_0x415b('0x101')]['EquipScene']['CmdStyle'];}}else{const _0x4d0233=_0x41df9b['x']+Math['floor']((_0x41df9b[_0x415b('0x2c0')]-_0x25198f)/0x2);this[_0x415b('0x47')](_0x1a745d,_0x4d0233,_0x41df9b['y'],_0x25198f);}}else this[_0x415b('0x47')](_0x1a745d,_0x41df9b['x'],_0x41df9b['y'],_0x25198f);}},Window_ItemCategory['prototype'][_0x415b('0x3fc')]=function(_0x2f0d6a){this[_0x415b('0x11e')](_0x2f0d6a)[_0x415b('0x325')](/\\I\[(\d+)\]/i);const _0x6fc3bd=Number(RegExp['$1'])||0x0,_0x5e8efc=this[_0x415b('0x97')](_0x2f0d6a),_0x3af39e=_0x5e8efc['x']+Math[_0x415b('0x38f')]((_0x5e8efc[_0x415b('0x2c0')]-ImageManager[_0x415b('0x293')])/0x2),_0x980b0c=_0x5e8efc['y']+(_0x5e8efc['height']-ImageManager[_0x415b('0x3a')])/0x2;this['drawIcon'](_0x6fc3bd,_0x3af39e,_0x980b0c);},VisuMZ[_0x415b('0x246')][_0x415b('0x12a')]=Window_ItemCategory[_0x415b('0x386')][_0x415b('0xc')],Window_ItemCategory[_0x415b('0x386')][_0x415b('0xc')]=function(_0x8de8e1){VisuMZ[_0x415b('0x246')]['Window_ItemCategory_setItemWindow'][_0x415b('0x60')](this,_0x8de8e1),_0x8de8e1[_0x415b('0xdb')]=this;},Window_ItemCategory[_0x415b('0x386')][_0x415b('0x1fe')]=function(){Window_HorzCommand[_0x415b('0x386')]['callUpdateHelp']['call'](this);if(this[_0x415b('0x3db')])this[_0x415b('0x149')]();},Window_ItemCategory[_0x415b('0x386')][_0x415b('0x149')]=function(){const _0x312b9a=this['_categoryNameWindow'];_0x312b9a[_0x415b('0x21c')]['clear']();const _0x31e569=this[_0x415b('0x34c')](this[_0x415b('0x2de')]());if(_0x31e569===_0x415b('0x279')){if(_0x415b('0x19b')!==_0x415b('0x19b')){function _0x3d166a(){return _0x3b0f3f['ItemsEquipsCore']['Settings'][_0x415b('0x209')][_0x415b('0xb7')]['call'](this);}}else{const _0x33dced=this[_0x415b('0x97')](this[_0x415b('0x2de')]());let _0x3efce4=this[_0x415b('0x11e')](this[_0x415b('0x2de')]());_0x3efce4=_0x3efce4[_0x415b('0x355')](/\\I\[(\d+)\]/gi,''),_0x312b9a[_0x415b('0x3bc')](),this[_0x415b('0x34b')](_0x3efce4,_0x33dced),this[_0x415b('0x1b9')](_0x3efce4,_0x33dced),this[_0x415b('0xda')](_0x3efce4,_0x33dced);}}},Window_ItemCategory[_0x415b('0x386')]['categoryNameWindowDrawBackground']=function(_0xe4b762,_0x4ee70d){},Window_ItemCategory[_0x415b('0x386')][_0x415b('0x1b9')]=function(_0x4119d3,_0x5e015a){const _0x4154b2=this[_0x415b('0x3db')];_0x4154b2[_0x415b('0x2b1')](_0x4119d3,0x0,_0x5e015a['y'],_0x4154b2['innerWidth'],_0x415b('0x2d9'));},Window_ItemCategory[_0x415b('0x386')][_0x415b('0xda')]=function(_0x38c083,_0x5c4e56){const _0x4d1ad7=this[_0x415b('0x3db')],_0x22f02c=$gameSystem[_0x415b('0x336')](),_0x3829f1=_0x5c4e56['x']+Math[_0x415b('0x38f')](_0x5c4e56['width']/0x2)+_0x22f02c;_0x4d1ad7['x']=_0x4d1ad7['width']/-0x2+_0x3829f1,_0x4d1ad7['y']=Math[_0x415b('0x38f')](_0x5c4e56[_0x415b('0x14a')]/0x2);},Window_ItemList[_0x415b('0x386')][_0x415b('0xa5')]=function(){if(this[_0x415b('0x35d')]()){if('yeFjc'!==_0x415b('0xe4')){function _0x24b055(){const _0x48314e=this[_0x415b('0x302')][_0x415b('0x2ab')](),_0x12e7ab=this[_0x415b('0x17b')]['_data'][_0x415b('0x389')](_0x48314e),_0x3a045a=_0x38a2a0[_0x415b('0x38f')](this['_itemWindow']['maxVisibleItems']()/0x2)-0x1;this[_0x415b('0x17b')][_0x415b('0xa9')](_0x12e7ab>=0x0?_0x12e7ab:0x0),this[_0x415b('0x17b')]['setTopRow'](this['_itemWindow'][_0x415b('0x2de')]()-_0x3a045a);}}else{const _0x2817ac=this[_0x415b('0x2de')]();if(this['maxCols']()<=0x1){if(!this[_0x415b('0xf0')](_0x415b('0x348'))&&Input[_0x415b('0x236')](_0x415b('0x348'))){if('ptxYe'==='ptxYe')this['cursorPagedown']();else{function _0x4feeee(){if(this[_0x415b('0x2f1')](_0x3a6c32))this[_0x415b('0x231')](_0xe35309,null);}}}!this['isHandled'](_0x415b('0x23f'))&&Input[_0x415b('0x236')]('pageup')&&this[_0x415b('0x8c')]();}else{if(this[_0x415b('0x30d')]()>0x1){Input[_0x415b('0x263')](_0x415b('0x29'))&&this[_0x415b('0xd0')](Input['isTriggered'](_0x415b('0x29')));if(Input['isRepeated'](_0x415b('0x1ca'))){if(_0x415b('0xa')===_0x415b('0xa'))this[_0x415b('0xd4')](Input[_0x415b('0x236')](_0x415b('0x1ca')));else{function _0x3932e1(){if(_0x418734[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0x36c')]['DrawBackRect']===![])return;_0x5f2190=_0x2e1fe3[_0x415b('0x20e')](_0x2f9ce3||0x1,0x1);while(_0x5dd359--){_0x3e05e1=_0x17f3a1||this['lineHeight'](),this[_0x415b('0x1a7')][_0x415b('0x183')]=0xa0;const _0x95a065=_0x2766d4[_0x415b('0x341')]();this[_0x415b('0x1a7')][_0x415b('0x36e')](_0x5f40fc+0x1,_0x14fc24+0x1,_0x3af9c4-0x2,_0x180e6a-0x2,_0x95a065),this['contentsBack'][_0x415b('0x183')]=0xff;}}}}if(this[_0x415b('0xbd')]()){Input[_0x415b('0x236')](_0x415b('0x348'))&&Input['isPressed'](_0x415b('0x108'))&&this['cursorPagedown']();if(Input['isTriggered'](_0x415b('0x23f'))&&Input[_0x415b('0x36b')](_0x415b('0x108'))){if(_0x415b('0x179')===_0x415b('0x179'))this[_0x415b('0x8c')]();else{function _0x26b1a5(){_0x407e10[_0x415b('0x386')][_0x415b('0x3c7')][_0x415b('0x60')](this),this['createBitmap']();}}}}else{if(_0x415b('0xff')===_0x415b('0xff')){if(Input['isTriggered'](_0x415b('0x348'))){if('vIyHI'!=='odBnN')this[_0x415b('0x1a8')]();else{function _0x222aa2(){if(this['isOptimizeEquipOk'](_0x2ffea8))this['changeEquip'](_0x4ac179,this[_0x415b('0x248')](_0x25fc2c));}}}if(Input[_0x415b('0x236')](_0x415b('0x23f'))){if(_0x415b('0x24b')===_0x415b('0x24b'))this[_0x415b('0x8c')]();else{function _0x3733eb(){this['processShiftRemoveShortcut'](),this[_0x415b('0x2d1')]();}}}}else{function _0x22aef8(){const _0x30188d=new _0x5e48f4(0x0,0x0,_0x313852[_0x415b('0x2c0')],_0x123825[_0x415b('0x14a')]);this[_0x415b('0x3db')]=new _0x5c1f2f(_0x30188d),this['_categoryNameWindow'][_0x415b('0x7b')]=0x0,this[_0x415b('0x2a0')](this[_0x415b('0x3db')]),this[_0x415b('0x149')]();}}}}}if(Input['isRepeated']('down')){if(_0x415b('0x390')==='BSLvo'){if(Input[_0x415b('0x36b')](_0x415b('0x108')))this['cursorPagedown']();else{if(_0x415b('0x61')===_0x415b('0xe0')){function _0x3a4e64(){return![];}}else this[_0x415b('0x27b')](Input[_0x415b('0x236')](_0x415b('0xb9')));}}else{function _0x2f7c8c(){const _0x4e60dd=_0x415b('0x34');if(this['_itemData'][_0x415b('0x3ad')]>=0x0&&this[_0x415b('0x23e')][_0x415b('0x115')]>=0x0&&!this[_0x415b('0x85')][_0x4e60dd])return![];const _0x3ec3ae=this['getItemEffectsMpDamageLabel']();this['drawItemKeyData'](_0x3ec3ae,_0x2176f8,_0x3273ff,_0x2d1435,!![]);const _0x3e9561=this['getItemEffectsMpDamageText']();return this[_0x415b('0x6b')](_0x5dd021[_0x415b('0x354')](0x2)),this[_0x415b('0xe1')](_0x3e9561,_0x1fc0aa,_0xa64879,_0x55a6fd,![],_0x415b('0x29')),this[_0x415b('0x32f')](_0x325fe5,_0x3b0181,_0xcac6a1),this[_0x415b('0x3bc')](),!![];}}}if(Input[_0x415b('0x263')]('up')){if(_0x415b('0x2b2')===_0x415b('0x3b')){function _0xc02522(){_0x390705[_0x415b('0x246')][_0x415b('0x410')][_0x415b('0x60')](this),this['isUseModernControls']()&&(this['_commandWindow']['deactivate'](),this[_0x415b('0x87')]['deselect'](),this[_0x415b('0x302')][_0x415b('0xa9')](0x0),this[_0x415b('0x302')][_0x415b('0x407')]());}}else Input[_0x415b('0x36b')]('shift')?this[_0x415b('0x8c')]():this[_0x415b('0xce')](Input[_0x415b('0x236')]('up'));}if(Imported[_0x415b('0x2c6')]){if(_0x415b('0xbc')!==_0x415b('0xbc')){function _0xe0065e(){const _0x2dfba5=this[_0x415b('0x37b')]();let _0x1810bd=0x0;_0x49c300[_0x415b('0x2c6')]?_0x1810bd=this['_actor'][_0x415b('0x291')](_0x281b31,!![]):_0x1810bd=this[_0x415b('0x39a')]['param'](_0x53f5ef);const _0x333046=_0x1810bd;this[_0x415b('0x2b1')](_0x1810bd,_0x25a126,_0x44ce6a,_0x4954df-_0x2dfba5,'right');}}else this[_0x415b('0x129')]();}if(this['index']()!==_0x2817ac){if('CRVWJ'!==_0x415b('0x66'))this[_0x415b('0x400')]();else{function _0xc9a675(){return _0x3ae568[_0x415b('0x15e')];}}}}}},Window_ItemList[_0x415b('0x386')][_0x415b('0xbd')]=function(){const _0x709d48=SceneManager[_0x415b('0x19d')],_0x19e4b3=[Scene_Item,Scene_Shop];return _0x19e4b3['includes'](_0x709d48[_0x415b('0x23d')]);},Window_ItemList[_0x415b('0x386')]['activate']=function(){Window_Selectable[_0x415b('0x386')][_0x415b('0x407')][_0x415b('0x60')](this),this[_0x415b('0xdb')]&&this[_0x415b('0xdb')]['isUseModernControls']()&&this['_categoryWindow']['activate']();},Window_ItemList[_0x415b('0x386')]['deactivate']=function(){Window_Selectable[_0x415b('0x386')][_0x415b('0x3ff')][_0x415b('0x60')](this),this[_0x415b('0xdb')]&&this[_0x415b('0xdb')][_0x415b('0xb0')]()&&this[_0x415b('0xdb')][_0x415b('0x3ff')]();},Window_ItemList['prototype'][_0x415b('0x3fe')]=function(_0x4cc7af){if(this[_0x415b('0x1b2')]!==_0x4cc7af){this['_category']=_0x4cc7af,this['refresh']();if(this[_0x415b('0xdb')]&&this['_categoryWindow'][_0x415b('0xb0')]())this[_0x415b('0xa9')](0x0);else{if('KoYOX'!==_0x415b('0x90'))this[_0x415b('0x1e2')](0x0,0x0);else{function _0x190e4b(){return _0xa5c602[_0x415b('0x246')][_0x415b('0x101')]['ItemScene'][_0x415b('0x132')];}}}}},VisuMZ[_0x415b('0x246')][_0x415b('0x13d')]=Window_ItemList[_0x415b('0x386')][_0x415b('0x30d')],Window_ItemList[_0x415b('0x386')][_0x415b('0x30d')]=function(){if(SceneManager[_0x415b('0x19d')][_0x415b('0x23d')]===Scene_Battle){if(_0x415b('0x91')!=='xmBee'){function _0x37a2c5(){return _0x1d7c19[_0x415b('0x386')][_0x415b('0x1ed')][_0x415b('0x60')](this);}}else return VisuMZ[_0x415b('0x246')][_0x415b('0x13d')][_0x415b('0x60')](this);}else return VisuMZ[_0x415b('0x246')][_0x415b('0x101')]['ItemScene'][_0x415b('0x21e')];},VisuMZ[_0x415b('0x246')][_0x415b('0x391')]=Window_ItemList[_0x415b('0x386')][_0x415b('0x223')],Window_ItemList[_0x415b('0x386')][_0x415b('0x223')]=function(){if(this[_0x415b('0x30d')]()<=0x1){if(_0x415b('0x32b')!==_0x415b('0x32b')){function _0x37d8b5(){return _0x98f4bd;}}else return Window_Selectable[_0x415b('0x386')][_0x415b('0x223')][_0x415b('0x60')](this);}else return VisuMZ[_0x415b('0x246')][_0x415b('0x391')][_0x415b('0x60')](this);},Window_ItemList[_0x415b('0x386')][_0x415b('0x326')]=function(_0x54fffa){switch(this[_0x415b('0x1b2')]){case _0x415b('0x227'):return DataManager[_0x415b('0x8')](_0x54fffa);case _0x415b('0xc1'):return DataManager[_0x415b('0x8')](_0x54fffa)&&_0x54fffa[_0x415b('0x2db')]===0x1;case _0x415b('0x228'):return DataManager[_0x415b('0x8')](_0x54fffa)&&_0x54fffa[_0x415b('0x2db')]===0x2;case _0x415b('0x29c'):return DataManager[_0x415b('0x8')](_0x54fffa)&&_0x54fffa['itypeId']===0x3;case _0x415b('0x19e'):return DataManager[_0x415b('0x8')](_0x54fffa)&&_0x54fffa[_0x415b('0x2db')]===0x4;case'Consumable':return DataManager[_0x415b('0x8')](_0x54fffa)&&_0x54fffa[_0x415b('0x22e')];case _0x415b('0xe'):return DataManager[_0x415b('0x8')](_0x54fffa)&&!_0x54fffa[_0x415b('0x22e')];case _0x415b('0x116'):return DataManager[_0x415b('0x8')](_0x54fffa)&&[0x0][_0x415b('0x326')](_0x54fffa[_0x415b('0x3fa')]);case'BattleUsable':return DataManager['isItem'](_0x54fffa)&&[0x0,0x1][_0x415b('0x326')](_0x54fffa['occasion']);case _0x415b('0x1fb'):return DataManager['isItem'](_0x54fffa)&&[0x0,0x2][_0x415b('0x326')](_0x54fffa[_0x415b('0x3fa')]);case _0x415b('0x283'):return DataManager[_0x415b('0x8')](_0x54fffa)&&[0x3][_0x415b('0x326')](_0x54fffa['occasion']);case _0x415b('0x3f'):return DataManager['isWeapon'](_0x54fffa);case _0x415b('0xe9'):return DataManager[_0x415b('0x214')](_0x54fffa);default:if(this[_0x415b('0x1b2')][_0x415b('0x325')](/WTYPE:(\d+)/i))return DataManager[_0x415b('0x103')](_0x54fffa)&&_0x54fffa[_0x415b('0x320')]===Number(RegExp['$1']);else{if(this[_0x415b('0x1b2')][_0x415b('0x325')](/ATYPE:(\d+)/i))return DataManager['isArmor'](_0x54fffa)&&_0x54fffa['etypeId']===Number(RegExp['$1']);else{if(this[_0x415b('0x1b2')][_0x415b('0x325')](/ETYPE:(\d+)/i)){if('gghUg'===_0x415b('0x199'))return!!_0x54fffa&&_0x54fffa['etypeId']===Number(RegExp['$1']);else{function _0x30b715(){this[_0x415b('0x2c8')]();}}}else{if(this[_0x415b('0x1b2')][_0x415b('0x325')](/Category:(.*)/i))return!!_0x54fffa&&_0x54fffa['categories'][_0x415b('0x326')](String(RegExp['$1'])['toUpperCase']()[_0x415b('0x379')]());}}}}return![];},Window_ItemList[_0x415b('0x386')][_0x415b('0xea')]=function(){return!![];},VisuMZ['ItemsEquipsCore'][_0x415b('0x141')]=Window_ItemList['prototype'][_0x415b('0xee')],Window_ItemList[_0x415b('0x386')][_0x415b('0xee')]=function(_0x78d061){VisuMZ[_0x415b('0x246')][_0x415b('0x141')][_0x415b('0x60')](this,_0x78d061),this[_0x415b('0x136')](_0x78d061);},Window_ItemList['prototype']['drawItemNumber']=function(_0x4029fa,_0x111878,_0x54fdf4,_0x470805){Window_Selectable['prototype'][_0x415b('0x1ba')][_0x415b('0x60')](this,_0x4029fa,_0x111878,_0x54fdf4,_0x470805);},Window_ItemList[_0x415b('0x386')][_0x415b('0x136')]=function(_0x47751d){const _0x39fcfd=this[_0x415b('0x372')](_0x47751d);if(!_0x39fcfd||!this[_0x415b('0xea')]())return;if(!$gameParty[_0x415b('0x28d')](_0x39fcfd))return;const _0x2e424f=this[_0x415b('0x97')](_0x47751d),_0x1d69be=_0x2e424f['x'],_0x11c337=_0x2e424f['y']+(this['lineHeight']()-ImageManager['iconHeight'])/0x2,_0x207e34=VisuMZ[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0x2bd')][_0x415b('0x19c')],_0x59f66b=VisuMZ[_0x415b('0x246')][_0x415b('0x101')]['New'][_0x415b('0x36f')];this[_0x415b('0xd2')](_0x39fcfd,_0x1d69be+_0x207e34,_0x11c337+_0x59f66b);},Window_ItemList[_0x415b('0x386')]['setStatusWindow']=function(_0x395abd){this[_0x415b('0xaa')]=_0x395abd,this[_0x415b('0x1fe')]();},VisuMZ[_0x415b('0x246')][_0x415b('0x230')]=Window_ItemList[_0x415b('0x386')][_0x415b('0x2d1')],Window_ItemList[_0x415b('0x386')][_0x415b('0x2d1')]=function(){VisuMZ[_0x415b('0x246')][_0x415b('0x230')][_0x415b('0x60')](this),this['_statusWindow']&&this[_0x415b('0xaa')][_0x415b('0x23d')]===Window_ShopStatus&&this['_statusWindow'][_0x415b('0xc6')](this[_0x415b('0x2ab')]());},Window_EventItem['prototype'][_0x415b('0xea')]=function(){return![];},Window_EquipStatus[_0x415b('0x386')][_0x415b('0x203')]=function(){return VisuMZ[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0xe3')][_0x415b('0x155')];},VisuMZ[_0x415b('0x246')][_0x415b('0x244')]=Window_EquipStatus[_0x415b('0x386')][_0x415b('0x2ec')],Window_EquipStatus[_0x415b('0x386')][_0x415b('0x2ec')]=function(){this['hideAdditionalSprites'](),this[_0x415b('0x3bc')]();if(this[_0x415b('0x39a')])this[_0x415b('0x39a')][_0x415b('0x2ec')]();if(this[_0x415b('0x203')]())this['prepareRefreshItemsEquipsCoreLayout']();else{if(_0x415b('0x3e6')!==_0x415b('0x30e'))VisuMZ[_0x415b('0x246')][_0x415b('0x244')][_0x415b('0x60')](this);else{function _0x5f0b7b(){const _0x3c5849=_0x415b('0x27d');if(this[_0x415b('0x85')][_0x3c5849])return this[_0x415b('0x85')][_0x3c5849];return this[_0x415b('0x376')]()?_0x3dc52b[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0x36c')][_0x415b('0x24c')]:_0x4fc387[_0x415b('0x246')][_0x415b('0x101')]['StatusWindow'][_0x415b('0x3a9')];}}}},Window_EquipStatus[_0x415b('0x386')][_0x415b('0x17d')]=function(){this[_0x415b('0x21c')]['clear']();if(!this[_0x415b('0x39a')])return;if(this[_0x415b('0xed')]()){const _0x4e90b9=ImageManager['loadPicture'](this[_0x415b('0x39a')][_0x415b('0x44')]());_0x4e90b9[_0x415b('0x2d6')](this[_0x415b('0x3ef')][_0x415b('0x35c')](this));}else this[_0x415b('0x1cd')]();},Window_EquipStatus['prototype'][_0x415b('0xed')]=function(){return Imported[_0x415b('0x200')]&&this['_actor'][_0x415b('0x44')]()!==''&&VisuMZ[_0x415b('0x246')]['Settings'][_0x415b('0xe3')][_0x415b('0x114')];},Window_EquipStatus[_0x415b('0x386')][_0x415b('0x3ef')]=function(){VisuMZ[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0xe3')][_0x415b('0x2cb')][_0x415b('0x60')](this),this[_0x415b('0x278')]();},Window_EquipStatus[_0x415b('0x386')][_0x415b('0x1cd')]=function(){VisuMZ[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0xe3')][_0x415b('0x26f')][_0x415b('0x60')](this),this[_0x415b('0x278')]();},Window_EquipStatus[_0x415b('0x386')][_0x415b('0x278')]=function(){this[_0x415b('0x3bc')](),VisuMZ[_0x415b('0x246')]['Settings'][_0x415b('0xe3')][_0x415b('0x270')]['call'](this);},Window_EquipStatus[_0x415b('0x386')]['drawItemActorMenuImage']=function(_0x34f8b,_0x408ad2,_0x57344b,_0x4248d1,_0x48e170){const _0x150eca=ImageManager[_0x415b('0x29b')](_0x34f8b['getMenuImage']()),_0xe2bec6=this['innerWidth']-_0x150eca[_0x415b('0x2c0')];_0x408ad2+=_0xe2bec6/0x2;if(_0xe2bec6<0x0)_0x4248d1-=_0xe2bec6;Window_StatusBase[_0x415b('0x386')][_0x415b('0x9f')][_0x415b('0x60')](this,_0x34f8b,_0x408ad2,_0x57344b,_0x4248d1,_0x48e170);},Window_EquipStatus[_0x415b('0x386')]['actorParams']=function(){if(Imported[_0x415b('0x2c6')]){if(_0x415b('0x221')==='gQeCw')return VisuMZ[_0x415b('0x16c')][_0x415b('0x101')]['Param'][_0x415b('0x286')];else{function _0x1cfaa4(){return!![];}}}else{if(_0x415b('0x1c6')===_0x415b('0x377')){function _0x8e945b(){return this[_0x415b('0xb2')]();}}else return[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];}},Window_EquipStatus[_0x415b('0x386')]['paramValueFontSize']=function(){return VisuMZ[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0xe3')][_0x415b('0x10a')];},Window_EquipStatus['prototype']['isUseParamNamesWithIcons']=function(){return Imported[_0x415b('0x2c6')]&&VisuMZ[_0x415b('0x16c')][_0x415b('0x101')][_0x415b('0x2f0')]['DrawIcons'];},Window_EquipStatus['prototype'][_0x415b('0x3c0')]=function(_0x547e5b,_0x118d5c,_0x478cb5,_0x267711){const _0x6dc99=this[_0x415b('0x37b')]();Imported[_0x415b('0x2c6')]?this[_0x415b('0xd')](_0x118d5c+_0x6dc99,_0x478cb5,_0x267711,_0x547e5b,![]):this[_0x415b('0x2b1')](TextManager['param'](_0x547e5b),_0x118d5c+_0x6dc99,_0x478cb5,_0x267711);},Window_EquipStatus[_0x415b('0x386')][_0x415b('0x117')]=function(_0x1dd480,_0x22fa7c,_0x178444,_0x50b160){const _0x3a6f3a=this[_0x415b('0x37b')]();let _0x3e06fd=0x0;Imported[_0x415b('0x2c6')]?_0x3e06fd=this[_0x415b('0x39a')][_0x415b('0x291')](_0x1dd480,!![]):_0x3e06fd=this['_actor'][_0x415b('0x3bd')](_0x1dd480);const _0x213d67=_0x3e06fd;this['drawText'](_0x3e06fd,_0x22fa7c,_0x178444,_0x50b160-_0x3a6f3a,'right');},Window_EquipStatus[_0x415b('0x386')][_0x415b('0x106')]=function(_0x3ce07e,_0x28fa0d,_0x5e7546,_0x369fb2){const _0x9f4e17=this['itemPadding']();let _0x2ab2a7=0x0,_0x4760a9=0x0,_0x1d7c69='';if(this['_tempActor']){if('ePYZx'===_0x415b('0x331')){function _0x215bc6(){const _0x1740ae=this[_0x415b('0x11b')],_0x451360=_0x298ba8[_0x415b('0x336')](),_0x4ec9dd=_0x455386['x']+_0x35b2e4[_0x415b('0x38f')](_0x1cbcee[_0x415b('0x2c0')]/0x2)+_0x451360;_0x1740ae['x']=_0x1740ae[_0x415b('0x2c0')]/-0x2+_0x4ec9dd,_0x1740ae['y']=_0x332571[_0x415b('0x38f')](_0x5c895f[_0x415b('0x14a')]/0x2);}}else{if(Imported[_0x415b('0x2c6')]){if(_0x415b('0x1ac')===_0x415b('0x1ac'))_0x2ab2a7=this[_0x415b('0x39a')][_0x415b('0x291')](_0x3ce07e,![]),_0x4760a9=this[_0x415b('0x1d3')][_0x415b('0x291')](_0x3ce07e,![]),_0x1d7c69=this[_0x415b('0x1d3')]['paramValueByName'](_0x3ce07e,!![]);else{function _0x38afad(){this[_0x415b('0x400')]();}}}else _0x2ab2a7=this[_0x415b('0x39a')][_0x415b('0x3bd')](_0x3ce07e),_0x4760a9=this[_0x415b('0x1d3')]['param'](_0x3ce07e),_0x1d7c69=this['_tempActor'][_0x415b('0x3bd')](_0x3ce07e);const _0x93b09f=_0x2ab2a7,_0x120a1e=_0x4760a9;diffValue=_0x120a1e-_0x93b09f,this[_0x415b('0x6b')](ColorManager[_0x415b('0x16d')](diffValue)),this['drawText'](_0x1d7c69,_0x28fa0d,_0x5e7546,_0x369fb2-_0x9f4e17,_0x415b('0x29'));}}},Window_EquipStatus['prototype']['drawUpdatedParamValueDiff']=function(_0x3bf865,_0x4b6378,_0x1fb6d2,_0x342abc){const _0x36a008=this[_0x415b('0x37b')]();let _0x576dec=0x0,_0x16ade2=0x0;if(this[_0x415b('0x1d3')]){Imported[_0x415b('0x2c6')]?(_0x576dec=this[_0x415b('0x39a')][_0x415b('0x291')](_0x3bf865,![]),_0x16ade2=this['_tempActor'][_0x415b('0x291')](_0x3bf865,![])):(_0x576dec=this[_0x415b('0x39a')][_0x415b('0x3bd')](_0x3bf865),_0x16ade2=this['_tempActor'][_0x415b('0x3bd')](_0x3bf865));const _0x2ac0ad=_0x576dec,_0xe96383=_0x16ade2,_0x127d6c=_0xe96383-_0x2ac0ad;let _0x191a3b=_0x127d6c;if(_0x576dec%0x1!==0x0)_0x191a3b=Math[_0x415b('0x3d2')](_0x127d6c*0x64)+'%';if(_0x127d6c!==0x0){if(_0x415b('0x3d8')===_0x415b('0x174')){function _0x5e2261(){this[_0x415b('0xe1')](_0x2be4f6,_0x2cd22d,_0x150035,_0x3f208d,!![]),this[_0x415b('0xe1')](_0x5cd42d,_0x4c6f3f,_0x485617,_0xf30dac,![],_0x415b('0x29')),this['drawItemDarkRect'](_0x819c8a,_0x494908,_0x49863a),this[_0x415b('0x3bc')]();}}else this[_0x415b('0x6b')](ColorManager[_0x415b('0x16d')](_0x127d6c)),_0x191a3b=(_0x127d6c>0x0?_0x415b('0x307'):_0x415b('0x17'))[_0x415b('0x3ba')](_0x191a3b),this[_0x415b('0x2b1')](_0x191a3b,_0x4b6378+_0x36a008,_0x1fb6d2,_0x342abc,_0x415b('0x1ca'));}}},Window_EquipStatus[_0x415b('0x386')][_0x415b('0x32f')]=function(_0x268d86,_0x492f73,_0xdede89,_0x3f8b40,_0x4f3d2d){if(VisuMZ[_0x415b('0x246')]['Settings']['EquipScene'][_0x415b('0x20d')]===![])return;_0x4f3d2d=Math[_0x415b('0x20e')](_0x4f3d2d||0x1,0x1);while(_0x4f3d2d--){if(_0x415b('0x54')!==_0x415b('0x54')){function _0x2c7baa(){return _0x3b172c[_0x415b('0x34e')]['format'](_0x556813(_0x7c75e1['$1']));}}else{_0x3f8b40=_0x3f8b40||this[_0x415b('0x1f8')](),this['contents']['paintOpacity']=0xa0;const _0x5c28c3=ColorManager[_0x415b('0xd5')]();this[_0x415b('0x21c')][_0x415b('0x36e')](_0x268d86+0x1,_0x492f73+0x1,_0xdede89-0x2,_0x3f8b40-0x2,_0x5c28c3),this[_0x415b('0x21c')][_0x415b('0x183')]=0xff;}}},ColorManager['getItemsEquipsCoreBackColor2']=function(){const _0xf17fd4=VisuMZ[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0xe3')];let _0x3e91f3=_0xf17fd4[_0x415b('0x1c')]!==undefined?_0xf17fd4[_0x415b('0x1c')]:0x13;return ColorManager[_0x415b('0x39e')](_0x3e91f3);},VisuMZ[_0x415b('0x246')]['Window_EquipCommand_initialize']=Window_EquipCommand[_0x415b('0x386')][_0x415b('0x3c7')],Window_EquipCommand['prototype'][_0x415b('0x3c7')]=function(_0xa1265d){VisuMZ['ItemsEquipsCore']['Window_EquipCommand_initialize'][_0x415b('0x60')](this,_0xa1265d),this[_0x415b('0x99')](_0xa1265d);},Window_EquipCommand['prototype'][_0x415b('0x99')]=function(_0x243d7f){const _0x5d1cb2=new Rectangle(0x0,0x0,_0x243d7f[_0x415b('0x2c0')],_0x243d7f[_0x415b('0x14a')]);this[_0x415b('0x11b')]=new Window_Base(_0x5d1cb2),this[_0x415b('0x11b')][_0x415b('0x7b')]=0x0,this['addChild'](this[_0x415b('0x11b')]),this[_0x415b('0x13b')]();},Window_EquipCommand[_0x415b('0x386')][_0x415b('0x1fe')]=function(){Window_HorzCommand['prototype'][_0x415b('0x1fe')][_0x415b('0x60')](this);if(this[_0x415b('0x11b')])this[_0x415b('0x13b')]();},Window_EquipCommand[_0x415b('0x386')]['updateCommandNameWindow']=function(){const _0x26d2a3=this['_commandNameWindow'];_0x26d2a3[_0x415b('0x21c')][_0x415b('0x38a')]();const _0x47afd2=this[_0x415b('0xef')](this[_0x415b('0x2de')]());if(_0x47afd2==='icon'){if(_0x415b('0x1e1')===_0x415b('0x1e1')){const _0x37b0bf=this['itemLineRect'](this[_0x415b('0x2de')]());let _0x31b772=this[_0x415b('0x11e')](this[_0x415b('0x2de')]());_0x31b772=_0x31b772[_0x415b('0x355')](/\\I\[(\d+)\]/gi,''),_0x26d2a3['resetFontSettings'](),this[_0x415b('0x39')](_0x31b772,_0x37b0bf),this[_0x415b('0x1bb')](_0x31b772,_0x37b0bf),this[_0x415b('0x34d')](_0x31b772,_0x37b0bf);}else{function _0x4282de(){return _0x2971e5[_0x415b('0x246')]['Settings'][_0x415b('0xe3')]['LayoutStyle'];}}}},Window_EquipCommand[_0x415b('0x386')][_0x415b('0x39')]=function(_0x124d91,_0x198f4d){},Window_EquipCommand['prototype'][_0x415b('0x1bb')]=function(_0x21e861,_0x17ad7d){const _0x21e551=this[_0x415b('0x11b')];_0x21e551[_0x415b('0x2b1')](_0x21e861,0x0,_0x17ad7d['y'],_0x21e551[_0x415b('0x318')],_0x415b('0x2d9'));},Window_EquipCommand[_0x415b('0x386')][_0x415b('0x34d')]=function(_0x5902a3,_0x4b5748){const _0x323ec8=this[_0x415b('0x11b')],_0x17325d=$gameSystem[_0x415b('0x336')](),_0x3d2b22=_0x4b5748['x']+Math[_0x415b('0x38f')](_0x4b5748['width']/0x2)+_0x17325d;_0x323ec8['x']=_0x323ec8['width']/-0x2+_0x3d2b22,_0x323ec8['y']=Math[_0x415b('0x38f')](_0x4b5748[_0x415b('0x14a')]/0x2);},Window_EquipCommand['prototype'][_0x415b('0xb0')]=function(){return Imported[_0x415b('0x2c6')]&&Window_HorzCommand[_0x415b('0x386')][_0x415b('0xb0')]['call'](this);},Window_EquipCommand[_0x415b('0x386')][_0x415b('0x11d')]=function(){if(this[_0x415b('0x2a7')]()==='equip')Window_HorzCommand[_0x415b('0x386')]['playOkSound'][_0x415b('0x60')](this);},Window_EquipCommand[_0x415b('0x386')][_0x415b('0xa5')]=function(){!this[_0x415b('0x2fa')]()&&Window_HorzCommand[_0x415b('0x386')]['processCursorMoveModernControls'][_0x415b('0x60')](this);},Window_EquipCommand['prototype'][_0x415b('0x2fa')]=function(){if(!this[_0x415b('0x35d')]())return![];if(SceneManager[_0x415b('0x19d')]['constructor']!==Scene_Equip)return![];return Input[_0x415b('0x236')]('down')&&(this[_0x415b('0x400')](),SceneManager[_0x415b('0x19d')]['commandEquip'](),SceneManager[_0x415b('0x19d')][_0x415b('0x302')][_0x415b('0xa9')](-0x1)),![];},Window_EquipCommand['prototype'][_0x415b('0x30d')]=function(){return this[_0x415b('0x243')]?this[_0x415b('0x243')]['length']:0x3;},Window_EquipCommand[_0x415b('0x386')][_0x415b('0x255')]=function(){if(this['isOpen']()&&this[_0x415b('0x29f')]&&SceneManager[_0x415b('0x19d')]['constructor']===Scene_Equip){if(this[_0x415b('0x239')]()&&TouchInput[_0x415b('0xa2')]()){if(_0x415b('0x1bc')!==_0x415b('0x3aa'))this[_0x415b('0x268')](![]);else{function _0x424906(){_0x179dd9=this[_0x415b('0x39a')][_0x415b('0x291')](_0x5adf7b,!![]);}}}else TouchInput[_0x415b('0x236')]()&&this[_0x415b('0x268')](!![]);if(TouchInput[_0x415b('0x308')]()){if(_0x415b('0x352')!==_0x415b('0x352')){function _0x501cc4(){return _0x34a9d8[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0x209')][_0x415b('0x404')];}}else this[_0x415b('0x1c7')]();}else TouchInput[_0x415b('0x3ed')]()&&this[_0x415b('0x315')]();}},Window_EquipCommand[_0x415b('0x386')]['onTouchSelectModernControls']=function(_0x12c6a6){this[_0x415b('0x1fa')]=![];const _0x13c144=this['index'](),_0x4dfe4a=this[_0x415b('0x1e9')](),_0x2bb15b=SceneManager[_0x415b('0x19d')][_0x415b('0x302')];if(_0x2bb15b[_0x415b('0x245')]()&&_0x2bb15b[_0x415b('0x29f')]){if(_0x4dfe4a>=0x0){if(_0x4dfe4a===this['index']()){if(_0x415b('0x371')!=='hGOWW'){function _0x5463bb(){this[_0x415b('0xdb')][_0x415b('0x1ea')]();}}else this['_doubleTouch']=!![];}this['activate'](),this[_0x415b('0x131')](_0x4dfe4a);}else{if(_0x2bb15b[_0x415b('0x1e9')]()>=0x0){if(_0x415b('0x4')===_0x415b('0x78')){function _0x17d0f7(){if(this['isOptimizeEquipOk'](_0xc9a5a7))this[_0x415b('0x231')](_0x5f4023,null);}}else this[_0x415b('0x3ff')](),this[_0x415b('0xeb')]();}}}if(_0x12c6a6&&this[_0x415b('0x2de')]()!==_0x13c144){if(_0x415b('0x3a4')!==_0x415b('0x3a4')){function _0x497aa0(){const _0x1422b9=_0x3a293f['max'](_0x312ba7(_0x56e66d),0x0)/_0x36ecec['a'][_0x415b('0xde')];return this[_0x415b('0x265')](),_0x173824(_0x1422b9)?'?????':'%1%'['format'](_0x4cada0[_0x415b('0x3d2')](_0x1422b9*0x64));}}else this[_0x415b('0x400')]();}},Window_EquipCommand[_0x415b('0x386')][_0x415b('0x38')]=function(){this[_0x415b('0x26')](),this[_0x415b('0x34f')](),this[_0x415b('0x362')]();},Window_EquipCommand[_0x415b('0x386')][_0x415b('0x2ec')]=function(){Window_HorzCommand[_0x415b('0x386')][_0x415b('0x2ec')][_0x415b('0x60')](this),this[_0x415b('0x2b7')]();},Window_EquipCommand[_0x415b('0x386')]['addEquipCommand']=function(){if(!this[_0x415b('0x19a')]())return;const _0x4a71b3=this[_0x415b('0x3ea')](),_0x14ca89=VisuMZ[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0xe3')]['CmdIconEquip'],_0x4878aa=_0x4a71b3===_0x415b('0x8b')?TextManager[_0x415b('0x15')]:_0x415b('0x1f6')[_0x415b('0x3ba')](_0x14ca89,TextManager['equip2']),_0x271003=this[_0x415b('0x305')]();this[_0x415b('0x4c')](_0x4878aa,_0x415b('0x11a'),_0x271003);},Window_EquipCommand['prototype']['isEquipCommandAdded']=function(){return!this[_0x415b('0xb0')]();},Window_EquipCommand[_0x415b('0x386')][_0x415b('0x305')]=function(){return!![];},Window_EquipCommand[_0x415b('0x386')][_0x415b('0x34f')]=function(){if(!this[_0x415b('0xa0')]())return;const _0x147a27=this[_0x415b('0x3ea')](),_0x52b802=VisuMZ[_0x415b('0x246')][_0x415b('0x101')]['EquipScene'][_0x415b('0x345')],_0x1c3e47=_0x147a27===_0x415b('0x8b')?TextManager[_0x415b('0x58')]:_0x415b('0x1f6')[_0x415b('0x3ba')](_0x52b802,TextManager['optimize']),_0x42e875=this[_0x415b('0x368')]();this[_0x415b('0x4c')](_0x1c3e47,_0x415b('0x58'),_0x42e875);},Window_EquipCommand['prototype'][_0x415b('0xa0')]=function(){return VisuMZ[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0xe3')][_0x415b('0x281')];},Window_EquipCommand[_0x415b('0x386')][_0x415b('0x368')]=function(){return!![];},Window_EquipCommand['prototype'][_0x415b('0x362')]=function(){if(!this[_0x415b('0x3be')]())return;const _0x195543=this[_0x415b('0x3ea')](),_0x161135=VisuMZ[_0x415b('0x246')][_0x415b('0x101')]['EquipScene'][_0x415b('0x15a')],_0x110ea6=_0x195543===_0x415b('0x8b')?TextManager[_0x415b('0x38a')]:_0x415b('0x1f6')[_0x415b('0x3ba')](_0x161135,TextManager[_0x415b('0x38a')]),_0x3ed33b=this[_0x415b('0x393')]();this[_0x415b('0x4c')](_0x110ea6,'clear',_0x3ed33b);},Window_EquipCommand['prototype']['isClearCommandAdded']=function(){return VisuMZ[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0xe3')][_0x415b('0xbb')];},Window_EquipCommand[_0x415b('0x386')]['isClearCommandEnabled']=function(){return!![];},Window_EquipCommand[_0x415b('0x386')]['itemTextAlign']=function(){return VisuMZ['ItemsEquipsCore'][_0x415b('0x101')][_0x415b('0xe3')][_0x415b('0x159')];},Window_EquipCommand[_0x415b('0x386')]['drawItem']=function(_0x1bb731){const _0x2e16f2=this[_0x415b('0xef')](_0x1bb731);if(_0x2e16f2===_0x415b('0x39d'))this[_0x415b('0xec')](_0x1bb731);else{if(_0x2e16f2===_0x415b('0x279')){if(_0x415b('0x28c')===_0x415b('0x100')){function _0x2771be(){const _0x4d5afc=0x0,_0x4764a2=this[_0x415b('0x235')](),_0x3d3f35=_0x2a858a['boxWidth'],_0x1bfdf7=this[_0x415b('0x1f9')]();return new _0x2492d2(_0x4d5afc,_0x4764a2,_0x3d3f35,_0x1bfdf7);}}else this[_0x415b('0x3fc')](_0x1bb731);}else{if(_0x415b('0x385')!==_0x415b('0x350'))Window_HorzCommand[_0x415b('0x386')]['drawItem'][_0x415b('0x60')](this,_0x1bb731);else{function _0x3db597(){return![];}}}}},Window_EquipCommand['prototype'][_0x415b('0x3ea')]=function(){return VisuMZ[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0xe3')][_0x415b('0x2ae')];},Window_EquipCommand['prototype']['commandStyleCheck']=function(_0x4f7823){if(_0x4f7823<0x0)return'text';const _0xab36c6=this[_0x415b('0x3ea')]();if(_0xab36c6!=='auto')return _0xab36c6;else{if(this['maxItems']()>0x0){const _0x45c165=this['commandName'](_0x4f7823);if(_0x45c165[_0x415b('0x325')](/\\I\[(\d+)\]/i)){const _0x3251a0=this[_0x415b('0x97')](_0x4f7823),_0x556b7=this[_0x415b('0x25d')](_0x45c165)[_0x415b('0x2c0')];if(_0x556b7<=_0x3251a0[_0x415b('0x2c0')]){if(_0x415b('0x2ad')===_0x415b('0x2ad'))return'iconText';else{function _0x13d7fa(){this[_0x415b('0xd4')](_0x1c1892['isTriggered'](_0x415b('0x1ca')));}}}else return _0x415b('0x279');}}}return _0x415b('0x8b');},Window_EquipCommand[_0x415b('0x386')][_0x415b('0xec')]=function(_0x4cc27c){const _0x5c8c00=this['itemLineRect'](_0x4cc27c),_0x41b214=this[_0x415b('0x11e')](_0x4cc27c),_0x57c083=this[_0x415b('0x25d')](_0x41b214)['width'];this[_0x415b('0x27e')](this[_0x415b('0x1d7')](_0x4cc27c));const _0x588418=this[_0x415b('0x312')]();if(_0x588418===_0x415b('0x29'))this['drawTextEx'](_0x41b214,_0x5c8c00['x']+_0x5c8c00[_0x415b('0x2c0')]-_0x57c083,_0x5c8c00['y'],_0x57c083);else{if(_0x588418===_0x415b('0x2d9')){if(_0x415b('0x18f')!==_0x415b('0x5')){const _0x346853=_0x5c8c00['x']+Math[_0x415b('0x38f')]((_0x5c8c00[_0x415b('0x2c0')]-_0x57c083)/0x2);this['drawTextEx'](_0x41b214,_0x346853,_0x5c8c00['y'],_0x57c083);}else{function _0x253004(){_0x16ec5f[_0x415b('0x386')][_0x415b('0x2ec')][_0x415b('0x60')](this),this[_0x415b('0x2b7')]();}}}else this['drawTextEx'](_0x41b214,_0x5c8c00['x'],_0x5c8c00['y'],_0x57c083);}},Window_EquipCommand[_0x415b('0x386')]['drawItemStyleIcon']=function(_0x5800d0){this['commandName'](_0x5800d0)[_0x415b('0x325')](/\\I\[(\d+)\]/i);const _0x4babbe=Number(RegExp['$1'])||0x0,_0x5d5567=this['itemLineRect'](_0x5800d0),_0x46b4c0=_0x5d5567['x']+Math[_0x415b('0x38f')]((_0x5d5567[_0x415b('0x2c0')]-ImageManager[_0x415b('0x293')])/0x2),_0x4eca51=_0x5d5567['y']+(_0x5d5567[_0x415b('0x14a')]-ImageManager[_0x415b('0x3a')])/0x2;this[_0x415b('0x39c')](_0x4babbe,_0x46b4c0,_0x4eca51);},Window_EquipSlot[_0x415b('0x386')][_0x415b('0xb0')]=function(){return Imported[_0x415b('0x2c6')]&&Window_HorzCommand['prototype'][_0x415b('0xb0')][_0x415b('0x60')](this);},Window_EquipSlot[_0x415b('0x386')][_0x415b('0x407')]=function(){Window_StatusBase[_0x415b('0x386')][_0x415b('0x407')]['call'](this),this[_0x415b('0x1fe')]();},Window_EquipSlot['prototype'][_0x415b('0x193')]=function(){Window_StatusBase[_0x415b('0x386')][_0x415b('0x193')][_0x415b('0x60')](this),this[_0x415b('0x2ce')]();},Window_EquipSlot[_0x415b('0x386')]['checkShiftRemoveShortcut']=function(){if(!this['isShiftRemoveShortcutEnabled']())return;if(Input[_0x415b('0x236')](_0x415b('0x108'))&&this[_0x415b('0x2ab')]()){const _0x118dbf=SceneManager[_0x415b('0x19d')]['_actor'];if(_0x118dbf){if(this['canShiftRemoveEquipment'](this[_0x415b('0x2de')]())){if(_0x415b('0x96')===_0x415b('0x96'))this['processShiftRemoveShortcut'](),this[_0x415b('0x2d1')]();else{function _0x89528a(){return _0x1760fd[_0x415b('0x246')]['Scene_Shop_statusWindowRect']['call'](this);}}}else{if(_0x415b('0x197')===_0x415b('0xb3')){function _0x3a21e9(){_0x5ac35b[_0x415b('0x386')][_0x415b('0xa5')][_0x415b('0x60')](this);}}else this[_0x415b('0x18b')]();}}}},Window_EquipSlot[_0x415b('0x386')]['canShiftRemoveEquipment']=function(_0x13d32d){const _0x75f555=SceneManager[_0x415b('0x19d')][_0x415b('0x39a')];if(!_0x75f555)return;if(!_0x75f555['isEquipChangeOk'](this[_0x415b('0x2de')]()))return![];const _0x10d60b=_0x75f555[_0x415b('0x417')]()[this[_0x415b('0x2de')]()];if(_0x75f555[_0x415b('0x329')]()[_0x415b('0x326')](_0x10d60b))return![];return!![];;},Window_EquipSlot[_0x415b('0x386')][_0x415b('0x1e0')]=function(){SoundManager['playEquip']();const _0xb43829=SceneManager[_0x415b('0x19d')][_0x415b('0x39a')];_0xb43829[_0x415b('0x231')](this['index'](),null),this[_0x415b('0x2ec')](),this[_0x415b('0x17b')][_0x415b('0x2ec')]();},Window_EquipSlot[_0x415b('0x386')][_0x415b('0x33c')]=function(){if(!this[_0x415b('0x275')])return![];if(!VisuMZ[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0xe3')]['ShiftShortcutKey'])return![];return!![];},Window_EquipSlot['prototype'][_0x415b('0xa5')]=function(){if(!this[_0x415b('0x2fa')]()){if(_0x415b('0x237')===_0x415b('0x237'))Window_StatusBase[_0x415b('0x386')][_0x415b('0xa5')][_0x415b('0x60')](this);else{function _0x32cad5(){_0x297c2c[_0x415b('0xb5')]();const _0x1440ba=_0x379322[_0x415b('0x19d')][_0x415b('0x39a')];_0x1440ba[_0x415b('0x231')](this['index'](),null),this[_0x415b('0x2ec')](),this[_0x415b('0x17b')]['refresh']();}}}},Window_EquipSlot[_0x415b('0x386')][_0x415b('0x2fa')]=function(){if(!this[_0x415b('0x35d')]())return![];if(SceneManager[_0x415b('0x19d')][_0x415b('0x23d')]!==Scene_Equip)return![];if(this[_0x415b('0x1d4')]()){if(_0x415b('0x15d')!==_0x415b('0x1d6'))return this['playCursorSound'](),Input[_0x415b('0x38a')](),SceneManager[_0x415b('0x19d')][_0x415b('0x398')](),![];else{function _0x234db1(){return _0x26a284;}}}else{if(Input['isRepeated'](_0x415b('0xb9'))){if(_0x415b('0x252')===_0x415b('0x79')){function _0x2c49d1(){this[_0x415b('0x3af')]*=-0x1;}}else{const _0x100bcc=this[_0x415b('0x2de')]();if(Input[_0x415b('0x36b')](_0x415b('0x108'))){if(_0x415b('0x7e')===_0x415b('0x2d3')){function _0x24b246(){return this[_0x415b('0x15c')]()[_0x415b('0x326')](this['equipSlots']()[_0x6e9c9e])?![]:this[_0x415b('0x2f')](_0x199792);}}else this[_0x415b('0x1a8')]();}else this[_0x415b('0x27b')](Input[_0x415b('0x236')](_0x415b('0xb9')));return this[_0x415b('0x2de')]()!==_0x100bcc&&this[_0x415b('0x400')](),!![];}}else{if(this[_0x415b('0x2b')]()&&Input[_0x415b('0x236')](_0x415b('0x108')))return!![];}}return![];},Window_EquipSlot[_0x415b('0x386')][_0x415b('0x1d4')]=function(){if(this[_0x415b('0x2de')]()!==0x0)return![];const _0x420cea=VisuMZ[_0x415b('0x246')][_0x415b('0x101')]['EquipScene'];if(!_0x420cea[_0x415b('0x281')]&&!_0x420cea[_0x415b('0xbb')])return![];return Input[_0x415b('0x236')]('up');},Window_EquipSlot['prototype'][_0x415b('0x2b')]=function(){return VisuMZ[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0xe3')][_0x415b('0x138')];},Window_EquipSlot['prototype']['processTouchModernControls']=function(){if(this[_0x415b('0x245')]()&&this[_0x415b('0x29f')]&&SceneManager[_0x415b('0x19d')][_0x415b('0x23d')]===Scene_Equip){if(this['isHoverEnabled']()&&TouchInput[_0x415b('0xa2')]()){if(_0x415b('0x1c5')!==_0x415b('0x418'))this[_0x415b('0x268')](![]);else{function _0x1ffe18(){return!![];}}}else{if(TouchInput[_0x415b('0x236')]()){if(_0x415b('0x3cc')===_0x415b('0x412')){function _0x514365(){const _0x2e99f7=this[_0x415b('0x417')]()['length'];for(let _0x5d6e51=0x0;_0x5d6e51<_0x2e99f7;_0x5d6e51++){if(this[_0x415b('0x2f1')](_0x5d6e51))this[_0x415b('0x231')](_0x5d6e51,null);}}}else this[_0x415b('0x268')](!![]);}}if(TouchInput[_0x415b('0x308')]()){if(_0x415b('0x180')==='EYdnl')this[_0x415b('0x1c7')]();else{function _0x52fdb5(){_0x115b2a[_0x415b('0x19d')][_0x415b('0x23d')]===_0x1044cf&&(this[_0x415b('0x24e')]=_0xb741f2['_scene'][_0x415b('0x21b')]());}}}else{if(TouchInput[_0x415b('0x3ed')]()){if('rgOJf'!==_0x415b('0x104')){function _0x56d3d7(){this[_0x415b('0x87')][_0x415b('0x3ff')](),this['_commandWindow'][_0x415b('0xeb')](),this[_0x415b('0x302')][_0x415b('0xa9')](0x0),this[_0x415b('0x302')]['activate']();}}else this[_0x415b('0x315')]();}}}},Window_EquipSlot[_0x415b('0x386')]['onTouchSelectModernControls']=function(_0x5a6417){this[_0x415b('0x1fa')]=![];const _0x56df87=this[_0x415b('0x2de')](),_0x193ede=this['hitIndex'](),_0x136391=SceneManager[_0x415b('0x19d')][_0x415b('0x87')];if(_0x136391[_0x415b('0x245')]()&&_0x136391[_0x415b('0x29f')]){if(_0x415b('0x198')!==_0x415b('0x198')){function _0x1eeeca(){if(this[_0x415b('0x121')]())return this[_0x415b('0x201')][_0x415b('0x2c0')]/0x5/-0x3;return _0x5e63b3['prototype'][_0x415b('0x1d8')][_0x415b('0x60')](this);}}else{if(_0x193ede>=0x0)_0x193ede===this[_0x415b('0x2de')]()&&(this[_0x415b('0x1fa')]=!![]),this[_0x415b('0x407')](),this[_0x415b('0x131')](_0x193ede);else _0x136391['hitIndex']()>=0x0&&(this[_0x415b('0x3ff')](),this[_0x415b('0xeb')]());}}_0x5a6417&&this[_0x415b('0x2de')]()!==_0x56df87&&this[_0x415b('0x400')]();},VisuMZ[_0x415b('0x246')][_0x415b('0x13c')]=Window_EquipItem['prototype'][_0x415b('0x326')],Window_EquipItem[_0x415b('0x386')]['includes']=function(_0x1ea092){return _0x1ea092===null&&this['nonRemovableEtypes']()[_0x415b('0x326')](this[_0x415b('0x207')]())?this[_0x415b('0x14c')][_0x415b('0x40f')]>0x0?![]:!![]:VisuMZ[_0x415b('0x246')][_0x415b('0x13c')]['call'](this,_0x1ea092);},VisuMZ[_0x415b('0x246')][_0x415b('0xca')]=Window_EquipItem[_0x415b('0x386')][_0x415b('0x7')],Window_EquipItem[_0x415b('0x386')][_0x415b('0x7')]=function(_0x3ba786){if(!_0x3ba786&&this[_0x415b('0x329')]()[_0x415b('0x326')](this['etypeId']()))return![];else{if(_0x415b('0x32c')===_0x415b('0x64')){function _0x2deb1a(){this['changeTextColor'](_0x3b988c[_0x415b('0x16d')](_0x487687)),_0x44e856=(_0x1c70a4>0x0?'(+%1)':_0x415b('0x17'))[_0x415b('0x3ba')](_0x114f14),this['drawText'](_0x3b2982,_0xda6747+_0x58880e,_0x3a7dfe,_0x3a3c0a,_0x415b('0x1ca'));}}else return VisuMZ[_0x415b('0x246')][_0x415b('0xca')][_0x415b('0x60')](this,_0x3ba786);}},Window_EquipItem[_0x415b('0x386')][_0x415b('0x329')]=function(){return VisuMZ[_0x415b('0x246')]['Settings'][_0x415b('0xe3')][_0x415b('0x112')];},Window_EquipItem[_0x415b('0x386')][_0x415b('0xee')]=function(_0x52df32){const _0x5f15c0=this[_0x415b('0x372')](_0x52df32);if(_0x5f15c0){if(_0x415b('0x264')!==_0x415b('0x264')){function _0x3caf92(){this[_0x415b('0x194')]();}}else Window_ItemList['prototype']['drawItem']['call'](this,_0x52df32);}else this[_0x415b('0x2a8')](_0x52df32);},Window_EquipItem['prototype']['drawRemoveItem']=function(_0x2383f0){this['changePaintOpacity'](this[_0x415b('0x7')](null));const _0x57b98c=VisuMZ[_0x415b('0x246')]['Settings'][_0x415b('0xe3')],_0x4098c2=this[_0x415b('0x97')](_0x2383f0),_0x105d04=_0x4098c2['y']+(this[_0x415b('0x1f8')]()-ImageManager[_0x415b('0x3a')])/0x2,_0x46e1c8=ImageManager[_0x415b('0x293')]+0x4,_0x461ce5=Math[_0x415b('0x20e')](0x0,_0x4098c2[_0x415b('0x2c0')]-_0x46e1c8);this[_0x415b('0x356')](),this['drawIcon'](_0x57b98c['RemoveEquipIcon'],_0x4098c2['x'],_0x105d04),this[_0x415b('0x2b1')](_0x57b98c[_0x415b('0x269')],_0x4098c2['x']+_0x46e1c8,_0x4098c2['y'],_0x461ce5),this[_0x415b('0x27e')](!![]);},Window_EquipItem[_0x415b('0x386')][_0x415b('0x2d1')]=function(){Window_ItemList['prototype']['updateHelp']['call'](this);if(this[_0x415b('0x39a')]&&this[_0x415b('0xaa')]&&this[_0x415b('0x364')]>=0x0){const _0x1a45af=JsonEx[_0x415b('0x3b8')](this[_0x415b('0x39a')]);_0x1a45af[_0x415b('0x1d3')]=!![],_0x1a45af[_0x415b('0x1b3')](this[_0x415b('0x364')],this[_0x415b('0x2ab')]()),this[_0x415b('0xaa')]['setTempActor'](_0x1a45af);}},VisuMZ[_0x415b('0x246')]['Window_ShopCommand_initialize']=Window_ShopCommand[_0x415b('0x386')][_0x415b('0x3c7')],Window_ShopCommand[_0x415b('0x386')][_0x415b('0x3c7')]=function(_0xb6cc44){VisuMZ[_0x415b('0x246')][_0x415b('0x2e6')]['call'](this,_0xb6cc44),this['createCommandNameWindow'](_0xb6cc44);},Window_ShopCommand[_0x415b('0x386')]['createCommandNameWindow']=function(_0x59fd17){const _0x3c0dbc=new Rectangle(0x0,0x0,_0x59fd17[_0x415b('0x2c0')],_0x59fd17['height']);this['_commandNameWindow']=new Window_Base(_0x3c0dbc),this[_0x415b('0x11b')]['opacity']=0x0,this[_0x415b('0x2a0')](this[_0x415b('0x11b')]),this[_0x415b('0x13b')]();},Window_ShopCommand[_0x415b('0x386')][_0x415b('0x1fe')]=function(){Window_HorzCommand[_0x415b('0x386')][_0x415b('0x1fe')][_0x415b('0x60')](this);if(this[_0x415b('0x11b')])this[_0x415b('0x13b')]();},Window_ShopCommand['prototype'][_0x415b('0x13b')]=function(){const _0x177416=this[_0x415b('0x11b')];_0x177416[_0x415b('0x21c')][_0x415b('0x38a')]();const _0x39591c=this['commandStyleCheck'](this['index']());if(_0x39591c===_0x415b('0x279')){if(_0x415b('0x353')!=='cFKfB'){function _0x29e606(){if(_0x31b9e3[_0x415b('0x325')](/(.*):[ ](.*)/i)){const _0x54fb03=_0x633541(_0x584183['$1'])[_0x415b('0x33b')]()[_0x415b('0x379')](),_0x3d1032=_0x2960cf(_0x2edda3['$2'])[_0x415b('0x379')]();this[_0x415b('0x85')][_0x54fb03]=_0x3d1032;}}}else{const _0x29cb6e=this[_0x415b('0x97')](this['index']());let _0x1da82e=this[_0x415b('0x11e')](this['index']());_0x1da82e=_0x1da82e['replace'](/\\I\[(\d+)\]/gi,''),_0x177416[_0x415b('0x3bc')](),this[_0x415b('0x39')](_0x1da82e,_0x29cb6e),this[_0x415b('0x1bb')](_0x1da82e,_0x29cb6e),this[_0x415b('0x34d')](_0x1da82e,_0x29cb6e);}}},Window_ShopCommand[_0x415b('0x386')]['commandNameWindowDrawBackground']=function(_0x1e0436,_0x5134bd){},Window_ShopCommand[_0x415b('0x386')][_0x415b('0x1bb')]=function(_0x4e042f,_0x26f040){const _0x7f7ddc=this[_0x415b('0x11b')];_0x7f7ddc[_0x415b('0x2b1')](_0x4e042f,0x0,_0x26f040['y'],_0x7f7ddc[_0x415b('0x318')],_0x415b('0x2d9'));},Window_ShopCommand[_0x415b('0x386')][_0x415b('0x34d')]=function(_0xc9dc75,_0x31dd66){const _0x4b2cd1=this[_0x415b('0x11b')],_0x5703b1=$gameSystem[_0x415b('0x336')](),_0x20e731=_0x31dd66['x']+Math[_0x415b('0x38f')](_0x31dd66[_0x415b('0x2c0')]/0x2)+_0x5703b1;_0x4b2cd1['x']=_0x4b2cd1[_0x415b('0x2c0')]/-0x2+_0x20e731,_0x4b2cd1['y']=Math[_0x415b('0x38f')](_0x31dd66['height']/0x2);},Window_ShopCommand[_0x415b('0x386')][_0x415b('0x30d')]=function(){return this['_list']?this[_0x415b('0x243')][_0x415b('0x40f')]:0x3;},Window_ShopCommand[_0x415b('0x386')][_0x415b('0x2c1')]=function(){return VisuMZ['ItemsEquipsCore'][_0x415b('0x101')][_0x415b('0x41')]['CmdHideDisabled'];},Window_ShopCommand[_0x415b('0x386')]['makeCommandList']=function(){this[_0x415b('0x12f')](),this[_0x415b('0x1a1')](),this[_0x415b('0x2e1')]();},Window_ShopCommand[_0x415b('0x386')][_0x415b('0x2ec')]=function(){Window_HorzCommand[_0x415b('0x386')][_0x415b('0x2ec')][_0x415b('0x60')](this),this[_0x415b('0x2b7')]();},Window_ShopCommand[_0x415b('0x386')][_0x415b('0x12f')]=function(){const _0x52e9f8=this[_0x415b('0x3ea')](),_0x5b3c36=VisuMZ['ItemsEquipsCore'][_0x415b('0x101')][_0x415b('0x41')][_0x415b('0xba')],_0x5ec3fc=_0x52e9f8===_0x415b('0x8b')?TextManager[_0x415b('0x416')]:_0x415b('0x1f6')[_0x415b('0x3ba')](_0x5b3c36,TextManager[_0x415b('0x416')]),_0xff7be9=this[_0x415b('0x289')]();if(this[_0x415b('0x2c1')]()&&!_0xff7be9)return;this[_0x415b('0x4c')](_0x5ec3fc,_0x415b('0x416'),_0xff7be9);},Window_ShopCommand[_0x415b('0x386')][_0x415b('0x289')]=function(){if(SceneManager[_0x415b('0x19d')][_0x415b('0x23d')]===Scene_Shop)return SceneManager[_0x415b('0x19d')][_0x415b('0xad')]>0x0;else{if('XrOij'===_0x415b('0x2a9'))return!![];else{function _0x129b4c(){this[_0x415b('0xaa')]['setItem'](this[_0x415b('0x2ab')]());}}}},Window_ShopCommand[_0x415b('0x386')][_0x415b('0x1a1')]=function(){const _0x5b74f7=this[_0x415b('0x3ea')](),_0x27877e=VisuMZ[_0x415b('0x246')]['Settings'][_0x415b('0x41')][_0x415b('0xb')],_0x361117=_0x5b74f7===_0x415b('0x8b')?TextManager['sell']:_0x415b('0x1f6')[_0x415b('0x3ba')](_0x27877e,TextManager[_0x415b('0x9b')]),_0x1c1f73=this[_0x415b('0x3fb')]();if(this['hideDisabledCommands']()&&!_0x1c1f73)return;this[_0x415b('0x4c')](_0x361117,_0x415b('0x9b'),_0x1c1f73);},Window_ShopCommand[_0x415b('0x386')][_0x415b('0x3fb')]=function(){return!this[_0x415b('0x19')];},Window_ShopCommand[_0x415b('0x386')][_0x415b('0x2e1')]=function(){const _0x3c00c2=this[_0x415b('0x3ea')](),_0x278bc1=VisuMZ['ItemsEquipsCore'][_0x415b('0x101')][_0x415b('0x41')]['CmdIconCancel'],_0x23f768=VisuMZ[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0x41')][_0x415b('0x3f1')],_0x360c9a=_0x3c00c2===_0x415b('0x8b')?_0x23f768:_0x415b('0x1f6')[_0x415b('0x3ba')](_0x278bc1,_0x23f768);this['addCommand'](_0x360c9a,_0x415b('0x189'));},Window_ShopCommand[_0x415b('0x386')]['itemTextAlign']=function(){return VisuMZ[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0x41')][_0x415b('0x159')];},Window_ShopCommand[_0x415b('0x386')]['drawItem']=function(_0x51fc39){const _0x17f15a=this[_0x415b('0xef')](_0x51fc39);if(_0x17f15a==='iconText'){if('fZNKD'===_0x415b('0x1c8'))this['drawItemStyleIconText'](_0x51fc39);else{function _0x48a8a1(){const _0x4a9f47=_0x415b('0x406');if(this[_0x415b('0x85')][_0x4a9f47])return this[_0x415b('0x85')][_0x4a9f47];const _0x144ebe=_0x446c8c['ItemsEquipsCore'][_0x415b('0x101')]['StatusWindow'],_0x19bd4f=_0x415b('0x20a')[_0x415b('0x3ba')](this[_0x415b('0x37')]['hitType']);return _0x144ebe[_0x19bd4f];}}}else{if(_0x17f15a===_0x415b('0x279')){if(_0x415b('0x3a3')!=='rHDBN'){function _0x1d27ae(){if(_0x5a02a1['uiMenuStyle']&&_0x1d28a0[_0x415b('0x15e')]!==_0x3b99e7)return _0x112b23['uiInputPosition'];else{if(this[_0x415b('0x203')]())return this[_0x415b('0x3b9')]()['match'](/RIGHT/i);else _0x33ce7c[_0x415b('0x386')][_0x415b('0x1cf')][_0x415b('0x60')](this);}}}else this[_0x415b('0x3fc')](_0x51fc39);}else{if(_0x415b('0x105')===_0x415b('0x105'))Window_HorzCommand[_0x415b('0x386')][_0x415b('0xee')][_0x415b('0x60')](this,_0x51fc39);else{function _0x10d279(){const _0x1f3ea6=this[_0x415b('0x97')](this[_0x415b('0x2de')]());let _0x2a36db=this[_0x415b('0x11e')](this[_0x415b('0x2de')]());_0x2a36db=_0x2a36db[_0x415b('0x355')](/\\I\[(\d+)\]/gi,''),_0x31050c['resetFontSettings'](),this[_0x415b('0x39')](_0x2a36db,_0x1f3ea6),this[_0x415b('0x1bb')](_0x2a36db,_0x1f3ea6),this['commandNameWindowCenter'](_0x2a36db,_0x1f3ea6);}}}}},Window_ShopCommand[_0x415b('0x386')]['commandStyle']=function(){return VisuMZ['ItemsEquipsCore'][_0x415b('0x101')][_0x415b('0x41')][_0x415b('0x2ae')];},Window_ShopCommand[_0x415b('0x386')][_0x415b('0xef')]=function(_0x50d7c9){if(_0x50d7c9<0x0)return _0x415b('0x8b');const _0x3e7903=this['commandStyle']();if(_0x3e7903!==_0x415b('0x2f3'))return _0x3e7903;else{if(this[_0x415b('0x72')]()>0x0){const _0x9a5b35=this[_0x415b('0x11e')](_0x50d7c9);if(_0x9a5b35[_0x415b('0x325')](/\\I\[(\d+)\]/i)){const _0x16d22c=this['itemLineRect'](_0x50d7c9),_0x20523b=this[_0x415b('0x25d')](_0x9a5b35)['width'];return _0x20523b<=_0x16d22c[_0x415b('0x2c0')]?_0x415b('0x39d'):'icon';}}}return'text';},Window_ShopCommand[_0x415b('0x386')]['drawItemStyleIconText']=function(_0x5aecee){const _0x3f5ec8=this[_0x415b('0x97')](_0x5aecee),_0x3df239=this[_0x415b('0x11e')](_0x5aecee),_0x3038e4=this[_0x415b('0x25d')](_0x3df239)[_0x415b('0x2c0')];this[_0x415b('0x27e')](this[_0x415b('0x1d7')](_0x5aecee));const _0x43322d=this['itemTextAlign']();if(_0x43322d===_0x415b('0x29'))this[_0x415b('0x47')](_0x3df239,_0x3f5ec8['x']+_0x3f5ec8[_0x415b('0x2c0')]-_0x3038e4,_0x3f5ec8['y'],_0x3038e4);else{if(_0x43322d===_0x415b('0x2d9')){const _0x47428d=_0x3f5ec8['x']+Math[_0x415b('0x38f')]((_0x3f5ec8['width']-_0x3038e4)/0x2);this[_0x415b('0x47')](_0x3df239,_0x47428d,_0x3f5ec8['y'],_0x3038e4);}else{if(_0x415b('0x1bd')===_0x415b('0x1bd'))this[_0x415b('0x47')](_0x3df239,_0x3f5ec8['x'],_0x3f5ec8['y'],_0x3038e4);else{function _0x800155(){_0x4854ad[_0x415b('0x246')][_0x415b('0x1c4')][_0x415b('0x60')](this,_0x4e38a9,_0x68c1c1);}}}}},Window_ShopCommand[_0x415b('0x386')][_0x415b('0x3fc')]=function(_0x135939){this['commandName'](_0x135939)['match'](/\\I\[(\d+)\]/i);const _0x3c7e5e=Number(RegExp['$1'])||0x0,_0x80dea0=this[_0x415b('0x97')](_0x135939),_0x37c755=_0x80dea0['x']+Math[_0x415b('0x38f')]((_0x80dea0[_0x415b('0x2c0')]-ImageManager['iconWidth'])/0x2),_0x315371=_0x80dea0['y']+(_0x80dea0[_0x415b('0x14a')]-ImageManager[_0x415b('0x3a')])/0x2;this[_0x415b('0x39c')](_0x3c7e5e,_0x37c755,_0x315371);},VisuMZ[_0x415b('0x246')][_0x415b('0x21f')]=Window_ShopBuy[_0x415b('0x386')][_0x415b('0x2ec')],Window_ShopBuy[_0x415b('0x386')][_0x415b('0x2ec')]=function(){this[_0x415b('0x55')](),VisuMZ[_0x415b('0x246')][_0x415b('0x21f')]['call'](this);},Window_ShopBuy[_0x415b('0x386')][_0x415b('0x55')]=function(){SceneManager[_0x415b('0x19d')]['constructor']===Scene_Shop&&(this['_money']=SceneManager['_scene'][_0x415b('0x21b')]());},VisuMZ[_0x415b('0x246')]['Window_ShopBuy_price']=Window_ShopBuy[_0x415b('0x386')][_0x415b('0x49')],Window_ShopBuy[_0x415b('0x386')]['price']=function(_0x219be4){if(!_0x219be4)return 0x0;const _0x5b9b0e=VisuMZ[_0x415b('0x246')]['Window_ShopBuy_price'][_0x415b('0x60')](this,_0x219be4);return this['modifiedBuyPriceItemsEquipsCore'](_0x219be4,_0x5b9b0e);},Window_ShopBuy[_0x415b('0x386')][_0x415b('0x1f0')]=function(_0x492be3,_0x5547b9){const _0x574c8a=_0x492be3[_0x415b('0x256')];if(_0x574c8a[_0x415b('0x325')](/<JS BUY PRICE>\s*([\s\S]*)\s*<\/JS BUY PRICE>/i)){const _0x21bcad=String(RegExp['$1']);try{if(_0x415b('0x2e2')===_0x415b('0x2e2'))eval(_0x21bcad);else{function _0x5349c1(){if(this[_0x415b('0x2cc')])return 0x0;const _0x2a9fe2=(_0x39b805[_0x415b('0x103')](_0x472067)?_0x415b('0x2e5'):_0x415b('0x8d'))['format'](_0x3d2362['id']),_0x68a529='%1-%2'[_0x415b('0x3ba')](_0x2a9fe2,_0x2eb089);if(_0x158e1c['ItemsEquipsCore'][_0x415b('0x26e')][_0x68a529]){this['_calculatingJSParameters']=!![];const _0x3c6973=_0x576f0c['ItemsEquipsCore'][_0x415b('0x26e')][_0x68a529][_0x415b('0x60')](this,_0x121dcd,_0x55432e);return this[_0x415b('0x2cc')]=![],_0x3c6973;}else return 0x0;}}}catch(_0x169a12){if($gameTemp[_0x415b('0x3e0')]())console['log'](_0x169a12);}}_0x5547b9=VisuMZ[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0x41')]['BuyPriceJS']['call'](this,_0x492be3,_0x5547b9);if(isNaN(_0x5547b9))_0x5547b9=0x0;return Math[_0x415b('0x38f')](_0x5547b9);},Window_ShopBuy[_0x415b('0x386')][_0x415b('0xee')]=function(_0x52a9ff){this[_0x415b('0x3bc')]();const _0x442d07=this['itemAt'](_0x52a9ff),_0x5391f3=this[_0x415b('0x49')](_0x442d07),_0x35cd21=TextManager[_0x415b('0x332')],_0x5da944=this[_0x415b('0x97')](_0x52a9ff),_0x19f0b8=this[_0x415b('0x1cc')](),_0x3f4d43=this[_0x415b('0x27c')](_0x35cd21),_0xbf3fc7=_0x5da944['x']+_0x5da944[_0x415b('0x2c0')]-_0x19f0b8-_0x3f4d43,_0x374b9c=_0x5da944['width']-_0x19f0b8-_0x3f4d43;this[_0x415b('0x27e')](this[_0x415b('0x7')](_0x442d07)),this[_0x415b('0x1c1')](_0x442d07,_0x5da944['x'],_0x5da944['y'],_0x374b9c),this[_0x415b('0x2b1')](_0x5391f3,_0xbf3fc7,_0x5da944['y'],_0x19f0b8,'right'),this[_0x415b('0x6b')](ColorManager[_0x415b('0x40a')]()),this[_0x415b('0x2b1')](_0x35cd21,_0x5da944['x'],_0x5da944['y'],_0x5da944[_0x415b('0x2c0')],_0x415b('0x29')),this['changePaintOpacity'](!![]);},Window_ShopSell[_0x415b('0x386')][_0x415b('0x30d')]=function(){return SceneManager[_0x415b('0x19d')][_0x415b('0x203')]()?0x1:0x2;},VisuMZ['ItemsEquipsCore'][_0x415b('0x2ed')]=Window_ShopSell[_0x415b('0x386')][_0x415b('0x7')],Window_ShopSell['prototype']['isEnabled']=function(_0x2208cb){if(!_0x2208cb)return![];const _0x1bf1a5=_0x2208cb['note'];if(_0x1bf1a5[_0x415b('0x325')](/<CANNOT SELL>/i))return![];if(_0x1bf1a5[_0x415b('0x325')](/<CAN SELL>/i))return!![];if(_0x1bf1a5[_0x415b('0x325')](/<CANNOT SELL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5f06e2=JSON[_0x415b('0x191')]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x4f89e2 of _0x5f06e2){if(!$gameSwitches[_0x415b('0xc7')](_0x4f89e2))return![];}}if(_0x1bf1a5['match'](/<CANNOT SELL ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3573d0=JSON[_0x415b('0x191')]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x9d6ff1 of _0x3573d0){if(!$gameSwitches[_0x415b('0xc7')](_0x9d6ff1))return![];}}if(_0x1bf1a5['match'](/<CANNOT SELL ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x317fcb=JSON[_0x415b('0x191')]('['+RegExp['$1'][_0x415b('0x325')](/\d+/g)+']');for(const _0x362e44 of _0x317fcb){if($gameSwitches[_0x415b('0xc7')](_0x362e44))return![];}}return VisuMZ['ItemsEquipsCore']['Window_ShopSell_isEnabled'][_0x415b('0x60')](this,_0x2208cb);},Window_ShopStatus[_0x415b('0x386')][_0x415b('0x1')]=function(){Window_StatusBase[_0x415b('0x386')]['loadFaceImages'][_0x415b('0x60')](this);for(const _0x1d8a46 of $gameParty[_0x415b('0x23b')]()){ImageManager[_0x415b('0x378')](_0x1d8a46[_0x415b('0x26a')]());}},Window_ShopStatus[_0x415b('0x386')][_0x415b('0x357')]=function(){return VisuMZ['ItemsEquipsCore'][_0x415b('0x101')][_0x415b('0x36c')][_0x415b('0x360')];},Window_ShopStatus[_0x415b('0x386')]['refresh']=function(){this[_0x415b('0x21c')][_0x415b('0x38a')](),this['contentsBack'][_0x415b('0x38a')]();if(this[_0x415b('0x37')]){this[_0x415b('0x3bc')](),this[_0x415b('0x27e')](!![]),this[_0x415b('0x3e7')]();if(this[_0x415b('0x383')]()){if(_0x415b('0x18d')!=='HHLBQ'){function _0x501051(){this[_0x415b('0x1a8')]();}}else this[_0x415b('0x226')]();}else{if(_0x415b('0x333')==='pOPMD'){function _0x3b94fd(){if(!this[_0x415b('0x383')]())return![];const _0xe7b115=_0x26c53d[_0x415b('0x34a')][this[_0x415b('0x37')][_0x415b('0x207')]];return this[_0x415b('0xe1')](_0xe7b115,_0x1297d9,_0x31800b,_0x3b7377,!![]),this[_0x415b('0x32f')](_0x1efedc,_0x5b6cf6,_0x434f5d),this[_0x415b('0x3bc')](),!![];}}else this[_0x415b('0x28f')]();}}},Window_ShopStatus[_0x415b('0x386')][_0x415b('0x2e')]=function(_0x445adc,_0x112162){if(!this[_0x415b('0x383')]()&&!DataManager[_0x415b('0x8')](this[_0x415b('0x37')]))return;const _0xac14fd=this[_0x415b('0x318')]-this['itemPadding']()-_0x445adc,_0x491884=this[_0x415b('0x27c')](_0x415b('0x22'));this[_0x415b('0x6b')](ColorManager[_0x415b('0x40a')]()),this[_0x415b('0x2b1')](TextManager['possession'],_0x445adc+this[_0x415b('0x37b')](),_0x112162,_0xac14fd-_0x491884),this[_0x415b('0x356')](),this[_0x415b('0x1ba')](this[_0x415b('0x37')],_0x445adc,_0x112162,_0xac14fd);},Window_ShopStatus[_0x415b('0x386')]['drawItemDarkRect']=function(_0x375db4,_0x1ba162,_0x4355b1,_0x49f80b,_0x2331c7){if(VisuMZ[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0x36c')]['DrawBackRect']===![])return;_0x2331c7=Math['max'](_0x2331c7||0x1,0x1);while(_0x2331c7--){if(_0x415b('0x37d')===_0x415b('0x2a5')){function _0x44e38e(){const _0x9505a5=this['_commandWindow']['y'],_0x5e7d14=this[_0x415b('0x87')][_0x415b('0x2c0')],_0x220ee4=this['calcWindowHeight'](0x1,!![]),_0x567d50=this[_0x415b('0x1cf')]()?_0x438a9a['boxWidth']-_0x5e7d14:0x0;return new _0x4706e9(_0x567d50,_0x9505a5,_0x5e7d14,_0x220ee4);}}else{_0x49f80b=_0x49f80b||this[_0x415b('0x1f8')](),this[_0x415b('0x1a7')]['paintOpacity']=0xa0;const _0x5e532e=ColorManager[_0x415b('0x341')]();this[_0x415b('0x1a7')][_0x415b('0x36e')](_0x375db4+0x1,_0x1ba162+0x1,_0x4355b1-0x2,_0x49f80b-0x2,_0x5e532e),this[_0x415b('0x1a7')][_0x415b('0x183')]=0xff;}}},ColorManager[_0x415b('0x341')]=function(){const _0xa80c3a=VisuMZ[_0x415b('0x246')][_0x415b('0x101')]['StatusWindow'];let _0xd5d975=_0xa80c3a[_0x415b('0x1c')]!==undefined?_0xa80c3a[_0x415b('0x1c')]:0x13;return ColorManager[_0x415b('0x39e')](_0xd5d975);},Window_ShopStatus[_0x415b('0x386')][_0x415b('0x226')]=function(){VisuMZ[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0x36c')][_0x415b('0x23')][_0x415b('0x60')](this);},Window_ShopStatus['prototype'][_0x415b('0x7a')]=function(_0x263f96,_0x51c355,_0x7fe7d2){if(!this[_0x415b('0x383')]())return![];const _0x1576c3=$dataSystem[_0x415b('0x34a')][this[_0x415b('0x37')][_0x415b('0x207')]];return this[_0x415b('0xe1')](_0x1576c3,_0x263f96,_0x51c355,_0x7fe7d2,!![]),this[_0x415b('0x32f')](_0x263f96,_0x51c355,_0x7fe7d2),this[_0x415b('0x3bc')](),!![];},Window_ShopStatus[_0x415b('0x386')]['getItemQuantityText']=function(){const _0x28371f=VisuMZ[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0x209')]['ItemQuantityFmt'];return _0x28371f[_0x415b('0x3ba')]($gameParty[_0x415b('0x2ef')](this[_0x415b('0x37')]));},Window_ShopStatus[_0x415b('0x386')][_0x415b('0x3ee')]=function(){if(Imported[_0x415b('0x2c6')]){if(_0x415b('0x1d1')!=='YOWai'){function _0x4a7dde(){this[_0x415b('0x1cd')]();}}else return VisuMZ[_0x415b('0x16c')][_0x415b('0x101')][_0x415b('0x2f0')][_0x415b('0x286')];}else return[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];},Window_ShopStatus[_0x415b('0x386')][_0x415b('0x328')]=function(){return VisuMZ[_0x415b('0x246')]['Settings'][_0x415b('0x36c')]['ParamChangeFontSize'];},Window_ShopStatus[_0x415b('0x386')][_0x415b('0x171')]=function(_0x4c1695,_0x2969f9,_0x3ed634,_0x2f7933){this[_0x415b('0x3bc')](),this['contents'][_0x415b('0x133')]=this[_0x415b('0x328')]();let _0x185a18=this[_0x415b('0x27c')](TextManager[_0x415b('0x3bd')](_0x4c1695))+0x4+_0x2969f9;if(Imported[_0x415b('0x2c6')]){if(_0x415b('0x11c')===_0x415b('0x11c')){this[_0x415b('0xd')](_0x2969f9,_0x3ed634,_0x2f7933,_0x4c1695,!![]);if(VisuMZ['CoreEngine'][_0x415b('0x101')][_0x415b('0x2f0')][_0x415b('0x1a3')]){if('RVBEq'!==_0x415b('0x154'))_0x185a18+=ImageManager[_0x415b('0x293')]+0x4;else{function _0x54bbeb(){if(this[_0x415b('0x29d')]&&this[_0x415b('0x29d')][_0x415b('0x275')])return _0x1dc03e[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0x41')][_0x415b('0x3c6')];return _0x526348[_0x415b('0x386')][_0x415b('0x259')][_0x415b('0x60')](this);}}}}else{function _0x3ed91f(){return this[_0x415b('0x203')]()?this[_0x415b('0x1eb')]():_0x52bac7['ItemsEquipsCore'][_0x415b('0x28')]['call'](this);}}}else{if('PPZAh'!==_0x415b('0xa1')){function _0x33f850(){const _0x898979=_0x46fefa[_0x415b('0x191')]('['+_0x2bbe4a['$1'][_0x415b('0x325')](/\d+/g)+']');for(const _0x2089f3 of _0x898979){if(!_0x10631b[_0x415b('0xc7')](_0x2089f3))return![];}return!![];}}else this['changeTextColor'](ColorManager['systemColor']()),this[_0x415b('0x2b1')](TextManager[_0x415b('0x3bd')](_0x4c1695),_0x2969f9,_0x3ed634,_0x2f7933);}return this['resetFontSettings'](),_0x185a18;},Window_ShopStatus[_0x415b('0x386')]['drawActorParamDifference']=function(_0x180714,_0x21f9c1,_0x1a3e8d,_0x2ad4d4,_0x176ff8){_0x1a3e8d+=this[_0x415b('0x37b')](),_0x176ff8-=this[_0x415b('0x37b')]()*0x2;const _0x3d873=VisuMZ[_0x415b('0x246')][_0x415b('0x101')]['StatusWindow'];this[_0x415b('0x21c')]['fontSize']=_0x3d873[_0x415b('0x2bf')],this['changePaintOpacity'](_0x180714[_0x415b('0x3b4')](this[_0x415b('0x37')]));if(_0x180714[_0x415b('0x51')](this[_0x415b('0x37')])){const _0x2c2499=_0x3d873[_0x415b('0x2fd')];this[_0x415b('0x2b1')](_0x2c2499,_0x1a3e8d,_0x2ad4d4,_0x176ff8,_0x415b('0x2d9'));}else{if(_0x180714[_0x415b('0x3b4')](this['_item'])){const _0x6cfe=this[_0x415b('0x3f4')](_0x180714,this[_0x415b('0x37')]['etypeId']),_0x1fd1c1=JsonEx[_0x415b('0x3b8')](_0x180714);_0x1fd1c1['_tempActor']=!![];const _0xda1771=_0x1fd1c1[_0x415b('0x417')]()[_0x415b('0x389')](this[_0x415b('0x37')][_0x415b('0x207')]);if(_0xda1771>=0x0)_0x1fd1c1['forceChangeEquip'](_0xda1771,this['_item']);let _0xe120e1=0x0,_0x365aa1=0x0,_0x383b2a=0x0;if(Imported[_0x415b('0x2c6')]){if(_0x415b('0x17f')!==_0x415b('0x222'))_0xe120e1=_0x1fd1c1[_0x415b('0x291')](_0x21f9c1),_0x365aa1=_0xe120e1-_0x180714[_0x415b('0x291')](_0x21f9c1),this[_0x415b('0x6b')](ColorManager[_0x415b('0x16d')](_0x365aa1)),_0x383b2a=(_0x365aa1>=0x0?'+':'')+VisuMZ['ConvertNumberToString'](_0x365aa1,0x0);else{function _0x18973f(){_0x11e483[_0x415b('0x246')][_0x415b('0x33f')][_0x415b('0x60')](this,_0x49149a);if(this[_0x415b('0xea')]())this['clearNewLabelFromItem'](_0x153029);}}}else{if(_0x415b('0x1df')!==_0x415b('0x1df')){function _0x41c27a(){_0x23b494=this[_0x415b('0x39a')][_0x415b('0x3bd')](_0x1530f7),_0x3b78be=this[_0x415b('0x1d3')][_0x415b('0x3bd')](_0x4a9708);}}else _0xe120e1=_0x1fd1c1[_0x415b('0x3bd')](_0x21f9c1),_0x365aa1=_0xe120e1-_0x180714[_0x415b('0x3bd')](_0x21f9c1),this[_0x415b('0x6b')](ColorManager[_0x415b('0x16d')](_0x365aa1)),_0x383b2a=(_0x365aa1>=0x0?'+':'')+_0x365aa1;}if(_0x383b2a==='+0')_0x383b2a=_0x3d873[_0x415b('0xab')];this[_0x415b('0x2b1')](_0x383b2a,_0x1a3e8d,_0x2ad4d4,_0x176ff8,_0x415b('0x2d9'));}else{const _0x2216d8=_0x3d873[_0x415b('0x140')];this[_0x415b('0x2b1')](_0x2216d8,_0x1a3e8d,_0x2ad4d4,_0x176ff8,_0x415b('0x2d9'));}}this['resetFontSettings'](),this['changePaintOpacity'](!![]);},Window_ShopStatus[_0x415b('0x386')][_0x415b('0x28f')]=function(){VisuMZ[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0x36c')][_0x415b('0x314')][_0x415b('0x60')](this);},Window_ShopStatus[_0x415b('0x386')]['prepareItemCustomData']=function(){this['_customItemInfo']={};if(!this[_0x415b('0x37')])return;const _0x3fbfc3=this[_0x415b('0x37')][_0x415b('0x256')];if(_0x3fbfc3[_0x415b('0x325')](/<STATUS INFO>\s*([\s\S]*)\s*<\/STATUS INFO>/i)){const _0x251d85=String(RegExp['$1'])['split'](/[\r\n]+/);for(const _0x52445a of _0x251d85){if(_0x415b('0x3d5')!==_0x415b('0x3d5')){function _0x542045(){this[_0x415b('0xec')](_0x2d6939);}}else{if(_0x52445a[_0x415b('0x325')](/(.*):[ ](.*)/i)){if(_0x415b('0x1c3')===_0x415b('0x1c3')){const _0x20c9ef=String(RegExp['$1'])['toUpperCase']()[_0x415b('0x379')](),_0x2dbecb=String(RegExp['$2'])[_0x415b('0x379')]();this['_customItemInfo'][_0x20c9ef]=_0x2dbecb;}else{function _0x2ee659(){return _0x73ab7[_0x415b('0x16c')][_0x415b('0x101')][_0x415b('0x2f0')][_0x415b('0x286')];}}}}}}},Window_ShopStatus['prototype'][_0x415b('0x95')]=function(){return 0x16;},Window_ShopStatus[_0x415b('0x386')][_0x415b('0x3bc')]=function(){Window_StatusBase[_0x415b('0x386')][_0x415b('0x3bc')][_0x415b('0x60')](this),this[_0x415b('0x21c')]['fontSize']=this[_0x415b('0x349')]||this[_0x415b('0x21c')][_0x415b('0x133')],this['contents']['textColor']=this[_0x415b('0x142')]||this[_0x415b('0x21c')][_0x415b('0x35')];},Window_ShopStatus[_0x415b('0x386')][_0x415b('0x358')]=function(){return this[_0x415b('0x21c')][_0x415b('0x133')]/$gameSystem[_0x415b('0x160')]();},Window_ShopStatus[_0x415b('0x386')][_0x415b('0x39c')]=function(_0x3ff31b,_0x24317e,_0x460173){const _0x4e2994=ImageManager[_0x415b('0x15b')](_0x415b('0x324')),_0x4a39ed=ImageManager['iconWidth'],_0x3b75f8=ImageManager['iconHeight'],_0x1d5157=_0x3ff31b%0x10*_0x4a39ed,_0x19244b=Math[_0x415b('0x38f')](_0x3ff31b/0x10)*_0x3b75f8,_0x286f90=Math[_0x415b('0x2b6')](_0x4a39ed*this[_0x415b('0x358')]()),_0x57c15c=Math[_0x415b('0x2b6')](_0x3b75f8*this[_0x415b('0x358')]());this[_0x415b('0x21c')][_0x415b('0x25a')](_0x4e2994,_0x1d5157,_0x19244b,_0x4a39ed,_0x3b75f8,_0x24317e,_0x460173,_0x286f90,_0x57c15c);},Window_ShopStatus[_0x415b('0x386')][_0x415b('0x38e')]=function(_0x5e95b9,_0x2d583b){if(_0x2d583b[_0x415b('0x31a')]){if(_0x415b('0x31b')!=='Qfabm')this[_0x415b('0x39c')](_0x5e95b9,_0x2d583b['x'],_0x2d583b['y']+0x2);else{function _0x5a68b5(){_0x1eee02=_0x415b('0x63')[_0x415b('0x3ba')](_0xde2b49['id']);}}}_0x2d583b['x']+=Math[_0x415b('0x2b6')](ImageManager[_0x415b('0x293')]*this[_0x415b('0x358')]());if(this[_0x415b('0x358')]()===0x1)_0x2d583b['x']+=0x4;},Window_ShopStatus[_0x415b('0x386')][_0x415b('0xe1')]=function(_0x4dddea,_0x3ac84b,_0x261eef,_0x29e7c7,_0x5c7b1a,_0x41ef72){_0x4dddea=_0x4dddea||'',_0x41ef72=_0x41ef72||_0x415b('0x1ca'),this['_resetFontSize']=this[_0x415b('0x95')](),this[_0x415b('0x142')]=_0x5c7b1a?ColorManager[_0x415b('0x40a')]():this[_0x415b('0x21c')][_0x415b('0x35')],_0x3ac84b+=this[_0x415b('0x37b')](),_0x29e7c7-=this[_0x415b('0x37b')]()*0x2;const _0x2b69f4=this[_0x415b('0x25d')](_0x4dddea);if(_0x41ef72===_0x415b('0x2d9')){if(_0x415b('0x2df')!==_0x415b('0x2df')){function _0x47c4c9(){_0x1251d8+='%1'[_0x415b('0x3ba')](this[_0x415b('0x23e')][_0x415b('0x2bb')]);}}else _0x3ac84b=_0x3ac84b+Math['floor']((_0x29e7c7-_0x2b69f4[_0x415b('0x2c0')])/0x2);}else _0x41ef72==='right'&&(_0x3ac84b=_0x3ac84b+_0x29e7c7-_0x2b69f4['width']);_0x261eef+=(this[_0x415b('0x1f8')]()-_0x2b69f4['height'])/0x2,this['drawTextEx'](_0x4dddea,_0x3ac84b,_0x261eef,_0x29e7c7),this['_resetFontSize']=undefined,this['_resetFontColor']=undefined,this[_0x415b('0x3bc')]();},Window_ShopStatus[_0x415b('0x386')][_0x415b('0x211')]=function(_0x10d737,_0x31ad9f,_0x476eaa){if(!DataManager[_0x415b('0x8')](this[_0x415b('0x37')]))return![];const _0x257a18=this[_0x415b('0x2e3')]();this['drawItemKeyData'](_0x257a18,_0x10d737,_0x31ad9f,_0x476eaa,!![]);const _0x3a6598=this[_0x415b('0x18e')]();return this['drawItemKeyData'](_0x3a6598,_0x10d737,_0x31ad9f,_0x476eaa,![],_0x415b('0x29')),this[_0x415b('0x32f')](_0x10d737,_0x31ad9f,_0x476eaa),this[_0x415b('0x3bc')](),!![];},Window_ShopStatus[_0x415b('0x386')][_0x415b('0x2e3')]=function(){return VisuMZ[_0x415b('0x246')][_0x415b('0x101')]['StatusWindow'][_0x415b('0x156')];},Window_ShopStatus[_0x415b('0x386')][_0x415b('0x18e')]=function(){const _0x3baaff=_0x415b('0x27d');if(this[_0x415b('0x85')][_0x3baaff])return this[_0x415b('0x85')][_0x3baaff];if(this[_0x415b('0x376')]()){if(_0x415b('0x2ff')===_0x415b('0xf8')){function _0x13102a(){return _0x4f3887[_0x415b('0x2dc')];}}else return VisuMZ[_0x415b('0x246')]['Settings']['StatusWindow'][_0x415b('0x24c')];}else return VisuMZ[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0x36c')][_0x415b('0x3a9')];},Window_ShopStatus[_0x415b('0x386')][_0x415b('0x376')]=function(){if(VisuMZ[_0x415b('0x16c')]&&VisuMZ['CoreEngine'][_0x415b('0x101')][_0x415b('0x62')][_0x415b('0xf6')]&&DataManager[_0x415b('0x272')](this[_0x415b('0x37')]))return![];else{if('WjJLk'===_0x415b('0xb6')){function _0x59d7bc(){return this[_0x415b('0x119')]();}}else return this[_0x415b('0x37')][_0x415b('0x22e')];}},Window_ShopStatus[_0x415b('0x386')]['drawItemQuantity']=function(_0x6d4535,_0x5ba462,_0x2b8f6d){if(!this['isEquipItem']()&&!DataManager[_0x415b('0x8')](this[_0x415b('0x37')]))return![];if(DataManager[_0x415b('0x272')](this['_item'])&&!$dataSystem['optKeyItemsNumber']){const _0x23a663=TextManager[_0x415b('0x3dc')];this['drawItemKeyData'](_0x23a663,_0x6d4535,_0x5ba462,_0x2b8f6d,!![],'center');}else{if(_0x415b('0x120')===_0x415b('0x21')){function _0x1d1213(){this['resetFontSettings'](),_0x20fc08[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0xe3')]['DrawParamJS'][_0x415b('0x60')](this);}}else{const _0x3639e8=TextManager['possession'];this[_0x415b('0xe1')](_0x3639e8,_0x6d4535,_0x5ba462,_0x2b8f6d,!![]);const _0x1fdb4c=this[_0x415b('0x292')]();this[_0x415b('0xe1')](_0x1fdb4c,_0x6d4535,_0x5ba462,_0x2b8f6d,![],_0x415b('0x29'));}}return this[_0x415b('0x32f')](_0x6d4535,_0x5ba462,_0x2b8f6d),this[_0x415b('0x3bc')](),!![];},Window_ShopStatus['prototype'][_0x415b('0x292')]=function(){const _0x4e1fa2=_0x415b('0x37e');if(this[_0x415b('0x85')][_0x4e1fa2])return this[_0x415b('0x85')][_0x4e1fa2];const _0x2f1f79=VisuMZ[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0x209')][_0x415b('0xf2')];return _0x2f1f79['format']($gameParty[_0x415b('0x2ef')](this[_0x415b('0x37')]));},Window_ShopStatus[_0x415b('0x386')]['drawItemOccasion']=function(_0x326858,_0x4e2d79,_0x39706e){const _0x3d9a7c=this['getItemOccasionText']();return this[_0x415b('0xe1')](_0x3d9a7c,_0x326858,_0x4e2d79,_0x39706e,![],_0x415b('0x2d9')),this[_0x415b('0x32f')](_0x326858,_0x4e2d79,_0x39706e),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x415b('0x386')]['getItemOccasionText']=function(){const _0x157fbe='OCCASION';if(this['_customItemInfo'][_0x157fbe])return this[_0x415b('0x85')][_0x157fbe];const _0x12659a=VisuMZ['ItemsEquipsCore'][_0x415b('0x101')]['StatusWindow'],_0x162242='Occasion%1'['format'](this[_0x415b('0x37')][_0x415b('0x3fa')]);return _0x12659a[_0x162242];},Window_ShopStatus['prototype'][_0x415b('0x14b')]=function(_0x59a32a,_0xccd585,_0x1c5201){const _0x32ad4f=this[_0x415b('0x177')]();return this[_0x415b('0xe1')](_0x32ad4f,_0x59a32a,_0xccd585,_0x1c5201,![],_0x415b('0x2d9')),this[_0x415b('0x32f')](_0x59a32a,_0xccd585,_0x1c5201),this[_0x415b('0x3bc')](),!![];},Window_ShopStatus[_0x415b('0x386')][_0x415b('0x177')]=function(){const _0x58dee5='SCOPE';if(this[_0x415b('0x85')][_0x58dee5])return this[_0x415b('0x85')][_0x58dee5];const _0x24ec04=VisuMZ[_0x415b('0x246')][_0x415b('0x101')]['StatusWindow'];if(Imported[_0x415b('0x22c')]){const _0x37b598=this[_0x415b('0x37')]['note'];if(_0x37b598[_0x415b('0x325')](/<TARGET:[ ](.*)>/i)){const _0x7c014d=String(RegExp['$1']);if(_0x7c014d[_0x415b('0x325')](/(\d+) RANDOM ANY/i))return _0x24ec04[_0x415b('0xe2')][_0x415b('0x3ba')](Number(RegExp['$1']));else{if(_0x7c014d[_0x415b('0x325')](/(\d+) RANDOM (?:ENEMY|ENEMIES|FOE|FOES)/i))return _0x24ec04['ScopeRandomEnemies'][_0x415b('0x3ba')](Number(RegExp['$1']));else{if(_0x7c014d[_0x415b('0x325')](/(\d+) RANDOM (?:ALLY|ALLIES|FRIEND|FRIENDS)/i))return _0x24ec04[_0x415b('0x34e')]['format'](Number(RegExp['$1']));else{if(_0x7c014d[_0x415b('0x325')](/ALL (?:ALLY|ALLIES|FRIEND|FRIENDS) (?:BUT|EXCEPT) (?:USER|SELF)/i)){if('mmgAw'!=='mmgAw'){function _0x50cdeb(){_0x5c5594=this[_0x415b('0x39a')][_0x415b('0x3bd')](_0x3b6bcd),_0x3ec760=this['_tempActor']['param'](_0x4e2afd),_0x5c672f=this['_tempActor'][_0x415b('0x3bd')](_0x2c25d3);}}else return _0x24ec04['ScopeAlliesButUser'];}}}}}}const _0x30e3e9=_0x415b('0x290')[_0x415b('0x3ba')](this['_item'][_0x415b('0x212')]);return _0x24ec04[_0x30e3e9];},Window_ShopStatus[_0x415b('0x386')][_0x415b('0x296')]=function(_0xb21d0e,_0x3fd325,_0x5904ee){const _0x55ef0a=this[_0x415b('0x2f6')]();this['drawItemKeyData'](_0x55ef0a,_0xb21d0e,_0x3fd325,_0x5904ee,!![]);const _0x4ac7ac=this[_0x415b('0x25f')]();return this['drawItemKeyData'](_0x4ac7ac,_0xb21d0e,_0x3fd325,_0x5904ee,![],'right'),this[_0x415b('0x32f')](_0xb21d0e,_0x3fd325,_0x5904ee),this[_0x415b('0x3bc')](),!![];},Window_ShopStatus[_0x415b('0x386')][_0x415b('0x2f6')]=function(){return VisuMZ[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0x36c')][_0x415b('0x16b')];},Window_ShopStatus[_0x415b('0x386')][_0x415b('0x25f')]=function(){const _0x22c619=_0x415b('0x6e');if(this['_customItemInfo'][_0x22c619])return this[_0x415b('0x85')][_0x22c619];const _0x1c1897=this[_0x415b('0x37')][_0x415b('0x3e')];if(_0x1c1897>=0x7d0){if(_0x415b('0xd9')!==_0x415b('0xd9')){function _0x461e1c(){return _0x4c4bb3[_0x415b('0x246')][_0x415b('0x17a')][_0x415b('0x60')](this);}}else return VisuMZ[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0x36c')][_0x415b('0x11')];}else{if(_0x1c1897>=0x3e8)return VisuMZ['ItemsEquipsCore']['Settings'][_0x415b('0x36c')][_0x415b('0x21d')];else{if(_0x1c1897>0x0)return VisuMZ['ItemsEquipsCore'][_0x415b('0x101')][_0x415b('0x36c')][_0x415b('0x0')];else{if(_0x1c1897===0x0){if(_0x415b('0x1cb')!==_0x415b('0x3f5'))return VisuMZ[_0x415b('0x246')][_0x415b('0x101')]['StatusWindow'][_0x415b('0x2b0')];else{function _0x2da14c(){_0x5bb7bb=_0x28ea19||this[_0x415b('0x1f8')](),this[_0x415b('0x21c')][_0x415b('0x183')]=0xa0;const _0x15938b=_0x49ebb2[_0x415b('0xd5')]();this[_0x415b('0x21c')][_0x415b('0x36e')](_0x57dd9d+0x1,_0x11b8d9+0x1,_0x1dce47-0x2,_0x3dfdf6-0x2,_0x15938b),this[_0x415b('0x21c')][_0x415b('0x183')]=0xff;}}}else{if(_0x1c1897>-0x3e8)return VisuMZ[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0x36c')][_0x415b('0x262')];else{if(_0x1c1897>-0x7d0)return VisuMZ[_0x415b('0x246')]['Settings'][_0x415b('0x36c')][_0x415b('0x339')];else return _0x1c1897<=-0x7d0?VisuMZ['ItemsEquipsCore'][_0x415b('0x101')]['StatusWindow'][_0x415b('0x409')]:_0x415b('0x1f3');}}}}}},Window_ShopStatus[_0x415b('0x386')][_0x415b('0x3d3')]=function(_0x129d88,_0xb625da,_0x3685ba){const _0x1b8dc9=this['getItemSuccessRateLabel']();this[_0x415b('0xe1')](_0x1b8dc9,_0x129d88,_0xb625da,_0x3685ba,!![]);const _0x43a883=this[_0x415b('0x340')]();return this[_0x415b('0xe1')](_0x43a883,_0x129d88,_0xb625da,_0x3685ba,![],'right'),this[_0x415b('0x32f')](_0x129d88,_0xb625da,_0x3685ba),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x415b('0x386')][_0x415b('0x257')]=function(){return VisuMZ[_0x415b('0x246')]['Settings'][_0x415b('0x36c')][_0x415b('0x182')];},Window_ShopStatus[_0x415b('0x386')][_0x415b('0x340')]=function(){const _0x25029b=_0x415b('0x261');if(this[_0x415b('0x85')][_0x25029b])return this[_0x415b('0x85')][_0x25029b];if(Imported[_0x415b('0x22c')]){const _0xd0e711=this[_0x415b('0x37')][_0x415b('0x256')];if(_0xd0e711['match'](/<ALWAYS HIT>/i)){if('EnTOU'!==_0x415b('0x145')){function _0x1a6c0e(){const _0x11aae5=_0x5bff25[_0x415b('0x256')],_0x302cfd=_0x21e631[_0x415b('0x246')][_0x415b('0x3f7')];return _0x302cfd[_0xc420e0['id']]?_0x302cfd[_0x2e4f5f['id']][_0x415b('0x60')](this,_0x110f13):!![];}}else return'100%';}else{if(_0xd0e711['match'](/<ALWAYS HIT RATE: (\d+)([%％])>/i))return _0x415b('0x394')['format'](Number(RegExp['$1']));}}return'%1%'[_0x415b('0x3ba')](this[_0x415b('0x37')][_0x415b('0x98')]);},Window_ShopStatus[_0x415b('0x386')][_0x415b('0x1a0')]=function(_0x1850f4,_0x506ce0,_0x2edda1){const _0x549838=this[_0x415b('0x4e')]();this[_0x415b('0xe1')](_0x549838,_0x1850f4,_0x506ce0,_0x2edda1,!![]);const _0x16c83c=this[_0x415b('0x2c7')]();return this[_0x415b('0xe1')](_0x16c83c,_0x1850f4,_0x506ce0,_0x2edda1,![],_0x415b('0x29')),this[_0x415b('0x32f')](_0x1850f4,_0x506ce0,_0x2edda1),this[_0x415b('0x3bc')](),!![];},Window_ShopStatus[_0x415b('0x386')][_0x415b('0x4e')]=function(){return VisuMZ[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0x36c')][_0x415b('0x2a2')];},Window_ShopStatus['prototype']['getItemRepeatsText']=function(){const _0x56e0e8=_0x415b('0x83');if(this[_0x415b('0x85')][_0x56e0e8])return this[_0x415b('0x85')][_0x56e0e8];const _0x15bdc7=_0x415b('0xf');return _0x15bdc7[_0x415b('0x3ba')](this[_0x415b('0x37')][_0x415b('0x2e8')]);},Window_ShopStatus[_0x415b('0x386')]['drawItemHitType']=function(_0x24597d,_0xbf8f09,_0x1fb2a6){const _0x3a919f=this[_0x415b('0x3bf')]();this[_0x415b('0xe1')](_0x3a919f,_0x24597d,_0xbf8f09,_0x1fb2a6,!![]);const _0x3b4f44=this[_0x415b('0x181')]();return this[_0x415b('0xe1')](_0x3b4f44,_0x24597d,_0xbf8f09,_0x1fb2a6,![],_0x415b('0x29')),this['drawItemDarkRect'](_0x24597d,_0xbf8f09,_0x1fb2a6),this[_0x415b('0x3bc')](),!![];},Window_ShopStatus[_0x415b('0x386')][_0x415b('0x3bf')]=function(){return VisuMZ[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0x36c')][_0x415b('0x2a1')];},Window_ShopStatus[_0x415b('0x386')]['getItemHitTypeText']=function(){const _0x103699='HIT\x20TYPE';if(this[_0x415b('0x85')][_0x103699])return this[_0x415b('0x85')][_0x103699];const _0x47460e=VisuMZ['ItemsEquipsCore'][_0x415b('0x101')]['StatusWindow'],_0x1ca6ab=_0x415b('0x20a')[_0x415b('0x3ba')](this[_0x415b('0x37')][_0x415b('0x18a')]);return _0x47460e[_0x1ca6ab];},Window_ShopStatus[_0x415b('0x386')][_0x415b('0x1af')]=function(_0x403b15,_0x5c03fb,_0xe8d8a8){if(this[_0x415b('0x37')][_0x415b('0x1d2')][_0x415b('0x233')]<=0x0)return _0x5c03fb;if(this[_0x415b('0x2b8')](_0x403b15,_0x5c03fb,_0xe8d8a8))_0x5c03fb+=this['lineHeight']();if(this[_0x415b('0x365')](_0x403b15,_0x5c03fb,_0xe8d8a8))_0x5c03fb+=this[_0x415b('0x1f8')]();return this['resetFontSettings'](),_0x5c03fb;},Window_ShopStatus[_0x415b('0x386')]['drawItemDamageElement']=function(_0x44faa3,_0x5eef9a,_0x2f5c14){const _0x57a9f0=this['getItemDamageElementLabel']();this['drawItemKeyData'](_0x57a9f0,_0x44faa3,_0x5eef9a,_0x2f5c14,!![]);const _0x4d041b=this[_0x415b('0x3a1')]();return this['drawItemKeyData'](_0x4d041b,_0x44faa3,_0x5eef9a,_0x2f5c14,![],'right'),this['drawItemDarkRect'](_0x44faa3,_0x5eef9a,_0x2f5c14),this[_0x415b('0x3bc')](),!![];},Window_ShopStatus[_0x415b('0x386')][_0x415b('0x13a')]=function(){return VisuMZ['ItemsEquipsCore']['Settings']['StatusWindow'][_0x415b('0x304')];},Window_ShopStatus['prototype']['getItemDamageElementText']=function(){const _0x7b77dc='ELEMENT';if(this['_customItemInfo'][_0x7b77dc])return this[_0x415b('0x85')][_0x7b77dc];if(this[_0x415b('0x37')][_0x415b('0x1d2')][_0x415b('0x109')]<=-0x1){if('MhoLQ'!==_0x415b('0x28a'))return VisuMZ[_0x415b('0x246')]['Settings'][_0x415b('0x36c')][_0x415b('0xe7')];else{function _0x4255ef(){return _0x2042b2[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0x36c')][_0x415b('0x24c')];}}}else return this[_0x415b('0x37')][_0x415b('0x1d2')][_0x415b('0x109')]===0x0?VisuMZ[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0x36c')][_0x415b('0xc4')]:$dataSystem[_0x415b('0x31')][this[_0x415b('0x37')][_0x415b('0x1d2')][_0x415b('0x109')]];},Window_ShopStatus[_0x415b('0x386')][_0x415b('0x365')]=function(_0x148cbd,_0x1fa564,_0x4c9c25){const _0xd3c632=this[_0x415b('0x254')]();this[_0x415b('0xe1')](_0xd3c632,_0x148cbd,_0x1fa564,_0x4c9c25,!![]),this[_0x415b('0x3cf')]();const _0x233c17=this[_0x415b('0x2b4')](),_0x207ccf=ColorManager[_0x415b('0x354')]([0x0,0x0,0x2,0x1,0x3,0x1,0x3][this[_0x415b('0x37')][_0x415b('0x1d2')][_0x415b('0x233')]]);return this[_0x415b('0x6b')](_0x207ccf),this[_0x415b('0xe1')](_0x233c17,_0x148cbd,_0x1fa564,_0x4c9c25,![],_0x415b('0x29')),this['drawItemDarkRect'](_0x148cbd,_0x1fa564,_0x4c9c25),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x415b('0x386')][_0x415b('0x254')]=function(){if(Imported[_0x415b('0x22c')]&&DataManager[_0x415b('0x208')](this[_0x415b('0x37')])!=='MANUAL'){if('LTRlm'!==_0x415b('0x196'))return this[_0x415b('0x134')]();else{function _0x1f5eb8(){_0x1b62c3[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0x36c')][_0x415b('0x23')][_0x415b('0x60')](this);}}}else{if(_0x415b('0x10c')!==_0x415b('0x10c')){function _0x4963c1(){const _0x583ede=_0x13ea7a(_0x416917['$1'])[_0x415b('0x379')](),_0x4b8f51=_0x5cd027(_0xc10e46['$2'])[_0x415b('0x379')]();this[_0x415b('0xb1')](_0x583ede,_0x4b8f51,_0x82bff7,_0x41c675,_0xb55230),_0x4c5e7a+=this[_0x415b('0x1f8')]();}}else return this['getItemDamageAmountLabelOriginal']();}},Window_ShopStatus[_0x415b('0x386')][_0x415b('0x12b')]=function(){const _0x3a3664=VisuMZ['ItemsEquipsCore'][_0x415b('0x101')][_0x415b('0x36c')],_0x59b5d2=_0x415b('0x343')[_0x415b('0x3ba')](this[_0x415b('0x37')][_0x415b('0x1d2')][_0x415b('0x233')]),_0x223d47=[null,TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp']][this[_0x415b('0x37')][_0x415b('0x1d2')][_0x415b('0x233')]];return _0x3a3664[_0x59b5d2][_0x415b('0x3ba')](_0x223d47);},Window_ShopStatus['prototype']['setupItemDamageTempActors']=function(){const _0x232026=$gameActors[_0x415b('0x287')](0x1);this[_0x415b('0x327')]=JsonEx[_0x415b('0x3b8')](_0x232026),this[_0x415b('0x8e')]=JsonEx[_0x415b('0x3b8')](_0x232026);},Window_ShopStatus[_0x415b('0x386')][_0x415b('0x2b4')]=function(){const _0x1f2284=_0x415b('0x176');if(this[_0x415b('0x85')][_0x1f2284])return this['_customItemInfo'][_0x1f2284];return Imported[_0x415b('0x22c')]&&DataManager[_0x415b('0x208')](this[_0x415b('0x37')])!==_0x415b('0x3e9')?this[_0x415b('0x2d2')]():this['getItemDamageAmountTextOriginal']();},Window_ShopStatus[_0x415b('0x386')][_0x415b('0x56')]=function(){window['a']=this[_0x415b('0x327')],window['b']=this[_0x415b('0x8e')],this[_0x415b('0x327')][_0x415b('0x316')](!![]),this['_tempActorB'][_0x415b('0x316')]([0x3,0x4][_0x415b('0x326')](this[_0x415b('0x37')][_0x415b('0x1d2')][_0x415b('0x233')]));let _0x23a6ad=this[_0x415b('0x37')][_0x415b('0x1d2')][_0x415b('0x166')];try{if(_0x415b('0x2c5')!==_0x415b('0x35f')){const _0x14daa2=Math['max'](eval(_0x23a6ad),0x0)/window['a'][_0x415b('0xde')];return this['revertGlobalNamespaceVariables'](),isNaN(_0x14daa2)?'?????':'%1%'[_0x415b('0x3ba')](Math['round'](_0x14daa2*0x64));}else{function _0x46ea5e(){if(!_0x1f1ed3[_0x415b('0x8')](this[_0x415b('0x37')]))return![];const _0x4f21e3=this[_0x415b('0x2e3')]();this[_0x415b('0xe1')](_0x4f21e3,_0x45516a,_0x2b3922,_0x575949,!![]);const _0x307f55=this[_0x415b('0x18e')]();return this[_0x415b('0xe1')](_0x307f55,_0x4a874b,_0x5131f3,_0x407c87,![],_0x415b('0x29')),this[_0x415b('0x32f')](_0x46a216,_0x4fa772,_0x10acd5),this[_0x415b('0x3bc')](),!![];}}}catch(_0x2e39f6){if($gameTemp['isPlaytest']()){if(_0x415b('0x359')!==_0x415b('0x359')){function _0x5881f9(){const _0x376269=this[_0x415b('0xef')](_0x3f0756);if(_0x376269===_0x415b('0x39d'))this[_0x415b('0xec')](_0x240bc3);else _0x376269==='icon'?this[_0x415b('0x3fc')](_0x2e1638):_0x160b0e[_0x415b('0x386')]['drawItem']['call'](this,_0x58c2e0);}}else console[_0x415b('0x411')](_0x415b('0x92')[_0x415b('0x3ba')](this[_0x415b('0x37')][_0x415b('0x225')])),console[_0x415b('0x411')](_0x2e39f6);}return this[_0x415b('0x265')](),_0x415b('0x1f3');}},Window_ShopStatus[_0x415b('0x386')][_0x415b('0x265')]=function(){window['a']=undefined,window['b']=undefined;},Window_ShopStatus[_0x415b('0x386')][_0x415b('0x27')]=function(_0x4e0d9a,_0x13f7e6,_0x2c6fb6){if(!this[_0x415b('0x88')]())return _0x13f7e6;if(this[_0x415b('0x2a')](_0x4e0d9a,_0x13f7e6,_0x2c6fb6))_0x13f7e6+=this[_0x415b('0x1f8')]();if(this[_0x415b('0x135')](_0x4e0d9a,_0x13f7e6,_0x2c6fb6))_0x13f7e6+=this[_0x415b('0x1f8')]();if(this[_0x415b('0x3b3')](_0x4e0d9a,_0x13f7e6,_0x2c6fb6))_0x13f7e6+=this['lineHeight']();if(this[_0x415b('0x74')](_0x4e0d9a,_0x13f7e6,_0x2c6fb6))_0x13f7e6+=this[_0x415b('0x1f8')]();if(this[_0x415b('0x127')](_0x4e0d9a,_0x13f7e6,_0x2c6fb6))_0x13f7e6+=this['lineHeight']();if(this[_0x415b('0x2a3')](_0x4e0d9a,_0x13f7e6,_0x2c6fb6))_0x13f7e6+=this['lineHeight']();if(this[_0x415b('0x2c9')](_0x4e0d9a,_0x13f7e6,_0x2c6fb6))_0x13f7e6+=this[_0x415b('0x1f8')]();if(this['drawItemEffectsAddedStatesBuffs'](_0x4e0d9a,_0x13f7e6,_0x2c6fb6))_0x13f7e6+=this[_0x415b('0x1f8')]();if(this[_0x415b('0x187')](_0x4e0d9a,_0x13f7e6,_0x2c6fb6))_0x13f7e6+=this[_0x415b('0x1f8')]();return this[_0x415b('0x3bc')](),_0x13f7e6;},Window_ShopStatus['prototype']['makeItemData']=function(){let _0x3a4ddf=![];this[_0x415b('0x23e')]={'rateHP':0x0,'flatHP':0x0,'rateMP':0x0,'flatMP':0x0,'gainTP':0x0,'selfTP':0x0,'addState':[],'removeState':[],'changeBuff':[0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0],'removeBuff':[],'removeDebuff':[],'addStateBuffChanges':![],'removeStateBuffChanges':![]};for(const _0x238361 of this[_0x415b('0x37')][_0x415b('0x1e4')]){switch(_0x238361['code']){case Game_Action['EFFECT_RECOVER_HP']:this[_0x415b('0x23e')]['rateHP']+=_0x238361[_0x415b('0x42')],this[_0x415b('0x23e')][_0x415b('0x313')]+=_0x238361[_0x415b('0x35a')],_0x3a4ddf=!![];break;case Game_Action[_0x415b('0x163')]:this['_itemData'][_0x415b('0x3ad')]+=_0x238361[_0x415b('0x42')],this['_itemData'][_0x415b('0x115')]+=_0x238361[_0x415b('0x35a')],_0x3a4ddf=!![];break;case Game_Action[_0x415b('0x13')]:this[_0x415b('0x23e')][_0x415b('0x3e3')]+=_0x238361['value1'],_0x3a4ddf=!![];break;case Game_Action[_0x415b('0x188')]:this[_0x415b('0x23e')][_0x415b('0x57')][_0x415b('0x413')](_0x238361['dataId']),_0x3a4ddf=!![];break;case Game_Action[_0x415b('0x280')]:this[_0x415b('0x23e')]['removeState']['push'](_0x238361[_0x415b('0x309')]),this['_itemData'][_0x415b('0x10d')]=!![],_0x3a4ddf=!![];break;case Game_Action[_0x415b('0x242')]:this['_itemData']['changeBuff'][_0x238361['dataId']]+=0x1,_0x3a4ddf=!![];break;case Game_Action[_0x415b('0x40c')]:this[_0x415b('0x23e')][_0x415b('0x402')][_0x238361[_0x415b('0x309')]]-=0x1,_0x3a4ddf=!![];break;case Game_Action[_0x415b('0x3da')]:this['_itemData'][_0x415b('0x3ca')]['push'](_0x238361[_0x415b('0x309')]),this['_itemData'][_0x415b('0x10d')]=!![],_0x3a4ddf=!![];break;case Game_Action[_0x415b('0x157')]:this[_0x415b('0x23e')][_0x415b('0x3c9')][_0x415b('0x413')](_0x238361[_0x415b('0x309')]),this[_0x415b('0x23e')][_0x415b('0x10d')]=!![],_0x3a4ddf=!![];break;}}if(this['_itemData'][_0x415b('0x57')][_0x415b('0x40f')]>0x0)this[_0x415b('0x23e')][_0x415b('0xd1')]=!![];for(let _0x5dfb41=0x0;_0x5dfb41<this[_0x415b('0x23e')][_0x415b('0x402')][_0x415b('0x40f')];_0x5dfb41++){if(_0x415b('0x25')!==_0x415b('0x25')){function _0x1b04d1(){return this[_0x415b('0x267')]();}}else{if(this[_0x415b('0x23e')][_0x415b('0x402')][_0x5dfb41]!==0x0)this[_0x415b('0x23e')]['addStateBuffChanges']=!![];}}this[_0x415b('0x37')][_0x415b('0x126')]!==0x0&&(this[_0x415b('0x23e')]['selfTP']=this[_0x415b('0x37')][_0x415b('0x126')],_0x3a4ddf=!![]);const _0x280372=[_0x415b('0x31f'),_0x415b('0xbf'),'TP\x20RECOVERY','HP\x20DAMAGE',_0x415b('0x34'),_0x415b('0x16f'),_0x415b('0x37c'),_0x415b('0x210'),_0x415b('0x3f2')];for(const _0x5ea86e of _0x280372){if(this[_0x415b('0x85')][_0x5ea86e]){_0x3a4ddf=!![];break;}}return _0x3a4ddf;},Window_ShopStatus['prototype'][_0x415b('0x2a')]=function(_0x4327c2,_0x5005b4,_0x494321){const _0x1816e2=_0x415b('0x31f');if(this[_0x415b('0x23e')]['rateHP']<=0x0&&this['_itemData'][_0x415b('0x313')]<=0x0&&!this[_0x415b('0x85')][_0x1816e2])return![];const _0x11e29f=this['getItemEffectsHpRecoveryLabel']();this[_0x415b('0xe1')](_0x11e29f,_0x4327c2,_0x5005b4,_0x494321,!![]);const _0x2599ac=this[_0x415b('0x3d6')]();return this[_0x415b('0x6b')](ColorManager[_0x415b('0x354')](0x1)),this[_0x415b('0xe1')](_0x2599ac,_0x4327c2,_0x5005b4,_0x494321,![],_0x415b('0x29')),this[_0x415b('0x32f')](_0x4327c2,_0x5005b4,_0x494321),this[_0x415b('0x3bc')](),!![];},Window_ShopStatus[_0x415b('0x386')][_0x415b('0x40b')]=function(){const _0x4929a0=VisuMZ[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0x36c')][_0x415b('0x2f9')];return _0x4929a0[_0x415b('0x3ba')](TextManager['hp']);},Window_ShopStatus[_0x415b('0x386')]['getItemEffectsHpRecoveryText']=function(){const _0xf65e=_0x415b('0x31f');if(this[_0x415b('0x85')][_0xf65e])return this[_0x415b('0x85')][_0xf65e];let _0x4aa327='';if(this[_0x415b('0x23e')][_0x415b('0x20')]>0x0)_0x4aa327+=_0x415b('0x1dd')['format'](Math['floor'](this['_itemData'][_0x415b('0x20')]*0x64));if(this[_0x415b('0x23e')]['rateHP']>0x0&&this[_0x415b('0x23e')][_0x415b('0x313')]>0x0)_0x4aa327+='\x20';if(this[_0x415b('0x23e')][_0x415b('0x313')]>0x0)_0x4aa327+='+%1'[_0x415b('0x3ba')](this[_0x415b('0x23e')][_0x415b('0x313')]);return _0x4aa327;},Window_ShopStatus['prototype'][_0x415b('0x135')]=function(_0x57c502,_0x3bde7c,_0x41b7c3){const _0x303a3e=_0x415b('0xbf');if(this[_0x415b('0x23e')][_0x415b('0x3ad')]<=0x0&&this[_0x415b('0x23e')][_0x415b('0x115')]<=0x0&&!this[_0x415b('0x85')][_0x303a3e])return![];const _0x5441ee=this[_0x415b('0x2dd')]();this[_0x415b('0xe1')](_0x5441ee,_0x57c502,_0x3bde7c,_0x41b7c3,!![]);const _0x10b485=this[_0x415b('0x3b7')]();return this['changeTextColor'](ColorManager[_0x415b('0x354')](0x3)),this['drawItemKeyData'](_0x10b485,_0x57c502,_0x3bde7c,_0x41b7c3,![],_0x415b('0x29')),this[_0x415b('0x32f')](_0x57c502,_0x3bde7c,_0x41b7c3),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x415b('0x386')][_0x415b('0x2dd')]=function(){const _0x4a08bd=VisuMZ[_0x415b('0x246')]['Settings'][_0x415b('0x36c')]['LabelRecoverMP'];return _0x4a08bd[_0x415b('0x3ba')](TextManager['mp']);},Window_ShopStatus[_0x415b('0x386')][_0x415b('0x3b7')]=function(){const _0x56529e=_0x415b('0xbf');if(this[_0x415b('0x85')][_0x56529e])return this[_0x415b('0x85')][_0x56529e];let _0x232b7d='';if(this['_itemData']['rateMP']>0x0)_0x232b7d+='+%1%'[_0x415b('0x3ba')](Math[_0x415b('0x38f')](this[_0x415b('0x23e')]['rateMP']*0x64));if(this[_0x415b('0x23e')][_0x415b('0x3ad')]>0x0&&this[_0x415b('0x23e')][_0x415b('0x115')]>0x0)_0x232b7d+='\x20';if(this[_0x415b('0x23e')][_0x415b('0x115')]>0x0)_0x232b7d+=_0x415b('0x13e')[_0x415b('0x3ba')](this[_0x415b('0x23e')][_0x415b('0x115')]);return _0x232b7d;},Window_ShopStatus[_0x415b('0x386')]['drawItemEffectsTpRecovery']=function(_0x4c9f5f,_0x18e703,_0x249067){const _0x239592='TP\x20RECOVERY';if(this['_itemData']['gainTP']<=0x0&&!this[_0x415b('0x85')][_0x239592])return![];const _0x5c0c26=this[_0x415b('0x3c8')]();this[_0x415b('0xe1')](_0x5c0c26,_0x4c9f5f,_0x18e703,_0x249067,!![]);const _0x475845=this['getItemEffectsTpRecoveryText']();return this[_0x415b('0x6b')](ColorManager[_0x415b('0x24a')]()),this[_0x415b('0xe1')](_0x475845,_0x4c9f5f,_0x18e703,_0x249067,![],'right'),this[_0x415b('0x32f')](_0x4c9f5f,_0x18e703,_0x249067),this[_0x415b('0x3bc')](),!![];},Window_ShopStatus[_0x415b('0x386')][_0x415b('0x3c8')]=function(){const _0x5e5648=VisuMZ[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0x36c')][_0x415b('0x2e0')];return _0x5e5648[_0x415b('0x3ba')](TextManager['tp']);},Window_ShopStatus[_0x415b('0x386')][_0x415b('0x9a')]=function(){const _0x289cb4=_0x415b('0x3bb');if(this[_0x415b('0x85')][_0x289cb4])return this[_0x415b('0x85')][_0x289cb4];let _0x483667='';return _0x483667+='+%1'[_0x415b('0x3ba')](this[_0x415b('0x23e')][_0x415b('0x3e3')]),_0x483667;},Window_ShopStatus[_0x415b('0x386')][_0x415b('0x2c9')]=function(_0x46f623,_0x42ce27,_0xa5ff29){const _0xfd7497='USER\x20TP\x20GAIN';if(this[_0x415b('0x23e')][_0x415b('0x2bb')]===0x0&&!this[_0x415b('0x85')][_0xfd7497])return![];const _0x7dfdf3=this[_0x415b('0x3ac')]();this[_0x415b('0xe1')](_0x7dfdf3,_0x46f623,_0x42ce27,_0xa5ff29,!![]);const _0x591f8b=this['getItemEffectsSelfTpGainText']();return this[_0x415b('0x23e')][_0x415b('0x2bb')]>0x0?this['changeTextColor'](ColorManager[_0x415b('0x24a')]()):this[_0x415b('0x6b')](ColorManager[_0x415b('0x111')]()),this[_0x415b('0xe1')](_0x591f8b,_0x46f623,_0x42ce27,_0xa5ff29,![],_0x415b('0x29')),this[_0x415b('0x32f')](_0x46f623,_0x42ce27,_0xa5ff29),this[_0x415b('0x3bc')](),!![];},Window_ShopStatus[_0x415b('0x386')][_0x415b('0x3ac')]=function(){const _0x33b0fb=VisuMZ[_0x415b('0x246')][_0x415b('0x101')]['StatusWindow'][_0x415b('0x35b')];return _0x33b0fb[_0x415b('0x3ba')](TextManager['tp']);},Window_ShopStatus[_0x415b('0x386')]['getItemEffectsSelfTpGainText']=function(){const _0xe88768=_0x415b('0x37c');if(this[_0x415b('0x85')][_0xe88768])return this[_0x415b('0x85')][_0xe88768];let _0x54f1db='';return this[_0x415b('0x23e')][_0x415b('0x2bb')]>0x0?_0x54f1db+=_0x415b('0x13e')[_0x415b('0x3ba')](this[_0x415b('0x23e')][_0x415b('0x2bb')]):_0x54f1db+='%1'[_0x415b('0x3ba')](this['_itemData'][_0x415b('0x2bb')]),_0x54f1db;},Window_ShopStatus[_0x415b('0x386')][_0x415b('0x74')]=function(_0x105d67,_0x4a6128,_0x3d05a3){const _0x53f304=_0x415b('0x219');if(this['_itemData'][_0x415b('0x20')]>=0x0&&this[_0x415b('0x23e')][_0x415b('0x313')]>=0x0&&!this[_0x415b('0x85')][_0x53f304])return![];const _0x133190=this[_0x415b('0x39f')]();this[_0x415b('0xe1')](_0x133190,_0x105d67,_0x4a6128,_0x3d05a3,!![]);const _0x1843a4=this[_0x415b('0xfa')]();return this[_0x415b('0x6b')](ColorManager['damageColor'](0x0)),this[_0x415b('0xe1')](_0x1843a4,_0x105d67,_0x4a6128,_0x3d05a3,![],'right'),this['drawItemDarkRect'](_0x105d67,_0x4a6128,_0x3d05a3),this[_0x415b('0x3bc')](),!![];},Window_ShopStatus[_0x415b('0x386')]['getItemEffectsHpDamageLabel']=function(){const _0x39dadd=VisuMZ[_0x415b('0x246')][_0x415b('0x101')]['StatusWindow'][_0x415b('0x1d5')];return _0x39dadd[_0x415b('0x3ba')](TextManager['hp']);},Window_ShopStatus[_0x415b('0x386')][_0x415b('0xfa')]=function(){const _0x2a22e3=_0x415b('0x219');if(this[_0x415b('0x85')][_0x2a22e3])return this[_0x415b('0x85')][_0x2a22e3];let _0x5b6c86='';if(this[_0x415b('0x23e')]['rateHP']<0x0)_0x5b6c86+=_0x415b('0x394')['format'](Math[_0x415b('0x38f')](this[_0x415b('0x23e')][_0x415b('0x20')]*0x64));if(this[_0x415b('0x23e')][_0x415b('0x20')]<0x0&&this[_0x415b('0x23e')][_0x415b('0x313')]<0x0)_0x5b6c86+='\x20';if(this[_0x415b('0x23e')][_0x415b('0x313')]<0x0)_0x5b6c86+='%1'[_0x415b('0x3ba')](this[_0x415b('0x23e')]['flatHP']);return _0x5b6c86;},Window_ShopStatus['prototype'][_0x415b('0x127')]=function(_0x887ba2,_0x587f1c,_0x12210a){const _0x35e5fb=_0x415b('0x34');if(this[_0x415b('0x23e')][_0x415b('0x3ad')]>=0x0&&this[_0x415b('0x23e')][_0x415b('0x115')]>=0x0&&!this[_0x415b('0x85')][_0x35e5fb])return![];const _0x3ef05c=this['getItemEffectsMpDamageLabel']();this[_0x415b('0xe1')](_0x3ef05c,_0x887ba2,_0x587f1c,_0x12210a,!![]);const _0x2130f2=this[_0x415b('0x1ae')]();return this['changeTextColor'](ColorManager[_0x415b('0x354')](0x2)),this[_0x415b('0xe1')](_0x2130f2,_0x887ba2,_0x587f1c,_0x12210a,![],_0x415b('0x29')),this[_0x415b('0x32f')](_0x887ba2,_0x587f1c,_0x12210a),this[_0x415b('0x3bc')](),!![];},Window_ShopStatus['prototype'][_0x415b('0x68')]=function(){const _0x4d40d7=VisuMZ[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0x36c')][_0x415b('0xfe')];return _0x4d40d7[_0x415b('0x3ba')](TextManager['mp']);},Window_ShopStatus['prototype'][_0x415b('0x1ae')]=function(){const _0x30b980=_0x415b('0x34');if(this['_customItemInfo'][_0x30b980])return this[_0x415b('0x85')][_0x30b980];let _0x5b60af='';if(this[_0x415b('0x23e')][_0x415b('0x3ad')]<0x0)_0x5b60af+=_0x415b('0x394')[_0x415b('0x3ba')](Math['floor'](this[_0x415b('0x23e')][_0x415b('0x3ad')]*0x64));if(this[_0x415b('0x23e')][_0x415b('0x3ad')]<0x0&&this[_0x415b('0x23e')][_0x415b('0x115')]<0x0)_0x5b60af+='\x20';if(this[_0x415b('0x23e')][_0x415b('0x115')]<0x0)_0x5b60af+='%1'[_0x415b('0x3ba')](this[_0x415b('0x23e')][_0x415b('0x115')]);return _0x5b60af;},Window_ShopStatus[_0x415b('0x386')][_0x415b('0x2a3')]=function(_0x3895ed,_0x15c3e4,_0x344c3c){const _0x530e77=_0x415b('0x16f');if(this[_0x415b('0x23e')][_0x415b('0x3e3')]>=0x0&&!this[_0x415b('0x85')][_0x530e77])return![];const _0x534401=this[_0x415b('0x19f')]();this[_0x415b('0xe1')](_0x534401,_0x3895ed,_0x15c3e4,_0x344c3c,!![]);const _0x3f9716=this[_0x415b('0x84')]();return this['changeTextColor'](ColorManager[_0x415b('0x111')]()),this['drawItemKeyData'](_0x3f9716,_0x3895ed,_0x15c3e4,_0x344c3c,![],_0x415b('0x29')),this[_0x415b('0x32f')](_0x3895ed,_0x15c3e4,_0x344c3c),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x415b('0x386')][_0x415b('0x19f')]=function(){const _0x14e351=VisuMZ['ItemsEquipsCore'][_0x415b('0x101')][_0x415b('0x36c')][_0x415b('0x374')];return _0x14e351[_0x415b('0x3ba')](TextManager['tp']);},Window_ShopStatus[_0x415b('0x386')]['getItemEffectsTpDamageText']=function(){const _0x5c6706=_0x415b('0x16f');if(this[_0x415b('0x85')][_0x5c6706])return this[_0x415b('0x85')][_0x5c6706];let _0x2bb463='';return _0x2bb463+='%1'[_0x415b('0x3ba')](this[_0x415b('0x23e')][_0x415b('0x3e3')]),_0x2bb463;},Window_ShopStatus[_0x415b('0x386')][_0x415b('0xcb')]=function(_0x141f2c,_0x357ea7,_0x2f4744){const _0x2c9aaf=_0x415b('0x210');if(!this[_0x415b('0x23e')][_0x415b('0xd1')]&&!this[_0x415b('0x85')][_0x2c9aaf])return![];const _0x297e3a=this[_0x415b('0x1bf')]();this[_0x415b('0xe1')](_0x297e3a,_0x141f2c,_0x357ea7,_0x2f4744,!![]);const _0x48237a=this[_0x415b('0x24d')]();return this[_0x415b('0xe1')](_0x48237a,_0x141f2c,_0x357ea7,_0x2f4744,![],'right'),this[_0x415b('0x32f')](_0x141f2c,_0x357ea7,_0x2f4744),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x415b('0x386')]['getItemEffectsAddedStatesBuffsLabel']=function(){return VisuMZ[_0x415b('0x246')]['Settings'][_0x415b('0x36c')]['LabelApply'];},Window_ShopStatus['prototype'][_0x415b('0x24d')]=function(){const _0x1c64e5=_0x415b('0x210');if(this[_0x415b('0x85')][_0x1c64e5])return this[_0x415b('0x85')][_0x1c64e5];let _0x44949f='',_0x1aef5a=0x0;const _0x232718=0x8;for(const _0x25dd65 of this[_0x415b('0x23e')][_0x415b('0x57')]){const _0x2df427=$dataStates[_0x25dd65];if(_0x2df427&&_0x2df427[_0x415b('0xb4')]>0x0){_0x44949f+=_0x415b('0x25b')[_0x415b('0x3ba')](_0x2df427[_0x415b('0xb4')]),_0x1aef5a++;if(_0x1aef5a>=_0x232718)return _0x44949f;}}for(let _0x557f29=0x0;_0x557f29<this[_0x415b('0x23e')][_0x415b('0x402')][_0x415b('0x40f')];_0x557f29++){const _0x386013=this[_0x415b('0x23e')]['changeBuff'][_0x557f29],_0x21457e=Game_BattlerBase[_0x415b('0x386')][_0x415b('0x2d5')](_0x386013,_0x557f29);if(_0x21457e>0x0){_0x44949f+=_0x415b('0x25b')[_0x415b('0x3ba')](_0x21457e),_0x1aef5a++;if(_0x1aef5a>=_0x232718)return _0x44949f;}}return _0x44949f;},Window_ShopStatus[_0x415b('0x386')][_0x415b('0x187')]=function(_0x45f802,_0x1915f8,_0x5a82eb){const _0x47e777=_0x415b('0x3f2');if(!this[_0x415b('0x23e')][_0x415b('0x10d')]&&!this['_customItemInfo'][_0x47e777])return![];const _0x32fadd=this[_0x415b('0x37a')]();this[_0x415b('0xe1')](_0x32fadd,_0x45f802,_0x1915f8,_0x5a82eb,!![]);const _0x1a7054=this['getItemEffectsRemovedStatesBuffsText']();return this[_0x415b('0xe1')](_0x1a7054,_0x45f802,_0x1915f8,_0x5a82eb,![],_0x415b('0x29')),this[_0x415b('0x32f')](_0x45f802,_0x1915f8,_0x5a82eb),this[_0x415b('0x3bc')](),!![];},Window_ShopStatus[_0x415b('0x386')][_0x415b('0x37a')]=function(){return VisuMZ[_0x415b('0x246')]['Settings'][_0x415b('0x36c')][_0x415b('0x5d')];},Window_ShopStatus[_0x415b('0x386')][_0x415b('0x30a')]=function(){const _0x42d46b=_0x415b('0x3f2');if(this['_customItemInfo'][_0x42d46b])return this[_0x415b('0x85')][_0x42d46b];let _0x116f1f='',_0x3ebe2b=0x0;const _0x5cfe79=VisuMZ[_0x415b('0x246')][_0x415b('0x101')][_0x415b('0x36c')][_0x415b('0x3b0')];for(const _0xef0a9c of this[_0x415b('0x23e')][_0x415b('0x31d')]){const _0x1ed240=$dataStates[_0xef0a9c];if(_0x1ed240&&_0x1ed240[_0x415b('0xb4')]>0x0){if(_0x415b('0x77')===_0x415b('0x77')){_0x116f1f+=_0x415b('0x25b')[_0x415b('0x3ba')](_0x1ed240[_0x415b('0xb4')]),_0x3ebe2b++;if(_0x3ebe2b>=_0x5cfe79)return _0x116f1f;}else{function _0x5e4f4c(){_0x31c531[_0x415b('0x236')](_0x415b('0x348'))&&_0x35e92d['isPressed'](_0x415b('0x108'))&&this[_0x415b('0x1a8')](),_0x40e439[_0x415b('0x236')](_0x415b('0x23f'))&&_0x49bbfa[_0x415b('0x36b')](_0x415b('0x108'))&&this[_0x415b('0x8c')]();}}}}for(let _0x44385a=0x0;_0x44385a<this[_0x415b('0x23e')][_0x415b('0x3ca')][_0x415b('0x40f')];_0x44385a++){if('AoHiW'!==_0x415b('0x123')){const _0x41e1ce=Game_BattlerBase[_0x415b('0x386')][_0x415b('0x2d5')](0x1,_0x44385a);if(_0x41e1ce>0x0){_0x116f1f+=_0x415b('0x25b')[_0x415b('0x3ba')](_0x41e1ce),_0x3ebe2b++;if(_0x3ebe2b>=_0x5cfe79)return _0x116f1f;}}else{function _0x3ff003(){_0x2c3f4e['loadCharacter'](_0x3cc1ec[_0x415b('0x26a')]());}}}for(let _0x1602cf=0x0;_0x1602cf<this[_0x415b('0x23e')][_0x415b('0x3c9')]['length'];_0x1602cf++){if(_0x415b('0x1b')===_0x415b('0x1a5')){function _0x460c56(){this[_0x415b('0x36d')]();}}else{const _0x245138=Game_BattlerBase['prototype']['buffIconIndex'](-0x1,_0x1602cf);if(_0x245138>0x0){_0x116f1f+=_0x415b('0x25b')['format'](_0x245138),_0x3ebe2b++;if(_0x3ebe2b>=_0x5cfe79)return _0x116f1f;}}}return _0x116f1f;},Window_ShopStatus[_0x415b('0x386')][_0x415b('0x330')]=function(_0x288bbc,_0x21fdc4,_0x4b2e7c){if(this[_0x415b('0x37')][_0x415b('0x256')][_0x415b('0x325')](/<CUSTOM STATUS INFO>\s*([\s\S]*)\s*<\/CUSTOM STATUS INFO>/i)){const _0x57b842=String(RegExp['$1'])[_0x415b('0xe8')](/[\r\n]+/);for(const _0x478ba6 of _0x57b842){if(_0x478ba6[_0x415b('0x325')](/(.*):[ ](.*)/i)){const _0x502571=String(RegExp['$1'])[_0x415b('0x379')](),_0x5a435f=String(RegExp['$2'])['trim']();this[_0x415b('0xb1')](_0x502571,_0x5a435f,_0x288bbc,_0x21fdc4,_0x4b2e7c),_0x21fdc4+=this['lineHeight']();}}}return this[_0x415b('0x3bc')](),_0x21fdc4;},Window_ShopStatus[_0x415b('0x386')][_0x415b('0xb1')]=function(_0x1185fa,_0x42d11f,_0x540c94,_0x7b76d9,_0x57a787){this[_0x415b('0xe1')](_0x1185fa,_0x540c94,_0x7b76d9,_0x57a787,!![]),this[_0x415b('0xe1')](_0x42d11f,_0x540c94,_0x7b76d9,_0x57a787,![],_0x415b('0x29')),this[_0x415b('0x32f')](_0x540c94,_0x7b76d9,_0x57a787),this['resetFontSettings']();};