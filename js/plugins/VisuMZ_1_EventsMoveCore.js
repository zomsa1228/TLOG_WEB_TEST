//=============================================================================
// VisuStella MZ - Events & Movement Core
// VisuMZ_1_EventsMoveCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_EventsMoveCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EventsMoveCore = VisuMZ.EventsMoveCore || {};
VisuMZ.EventsMoveCore.version = 1.04;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.04] [EventsMoveCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Events_and_Movement_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Events & Movement Core plugin adds a lot of new functionality in terms
 * of event flexibility and movement options to RPG Maker MZ. These range from
 * adding in old capabilities from previous iterations of RPG Maker to more
 * mainstream techniques found in other game engines. Movement options are also
 * expanded to support 8-directional movement as well as sprite sheets provided
 * that the VisuStella 8 format is used.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Event commands expanded upon to include old and new functions.
 * * Event templates for Copying Events, Morphing Events, and Spawning Events.
 * * 8-directional movement option available and sprite sheet support.
 * * Aesthetics for tilting the sprite when dashing and having shadows below.
 * * Pathfinding support for event movement through custom Move Route commands.
 * * Advanced switches and variable support to run code automatically.
 * * Turn regular Switches and Variables into Self Switches and Self Variables.
 * * Put labels and icons over events.
 * * Allow numerous ways to trigger events, through clicking, proximity, or by
 *   usage of Regions.
 * * Change the hitbox sizes of events to larger in any direction.
 * * Synchronize event movement options to move when player/other events move.
 * * The ability for the player to turn in place.
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
 * Features: Advanced Switches and Variables
 * ============================================================================
 *
 * Switches and variables can now run JavaScript code and return values
 * instantly. While at first glance, this may seem no different from using
 * the Control Variables event command's Script option, this can be used to
 * instantly set up Switch and/or Variable conditions for Parallel Common
 * Events, Event Page Conditions, Enemy Skill Conditions, and Troop Page
 * Conditions instantly without needing to make an event command to do so.
 *
 * ---
 *
 * <JS> code </JS>
 * - Used for: Switch and Variable names
 * - Replace 'code' with JavaScript code on what value to return.
 *
 * ---
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, or <Global> simultaneously.
 *
 * ============================================================================
 * Features: Self Switches and Variables
 * ============================================================================
 *
 * RPG Maker MZ by default has 4 Self Switches: A, B, C, D. For some types of
 * games, this isn't enough. This plugin gives you the ability convert regular
 * Switches into Self Switches so you could have more.
 *
 * Self Variables also do not exist in RPG Maker MZ by default. Just like with
 * Switches, you can turn regular Variables into Self Variables.
 *
 * ---
 *
 * <Self>
 * - Used for: Switch and Variable names
 * - Converts the Switch/Variable into a Self Switch/Variable.
 *
 * ---
 *
 * After, just use them like you would for normal Switches and Variables in an
 * event's page conditions. If the <Self> tag is present inside the Switch or
 * Variable's name, then it will use data unique to only that event.
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, or <Global> simultaneously.
 * 
 * ---
 * 
 * If you need to use a script call to get a Self Switch or Self Variable's
 * value, you can use the following script calls.
 * 
 *   ---
 * 
 *   Get Self Switch Values:
 * 
 *   getSelfSwitchValue(mapID, eventID, switchID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - This will return the true/false value of the Self Switch.
 *   - Example: getSelfSwitchValue(12, 34, 56)
 *   - Example: getSelfSwitchValue(12, 34, 'B')
 * 
 *   ---
 * 
 *   Get Self Variable Values:
 * 
 *   getSelfVariableValue(mapID, eventID, variableID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - This will return whatever stored value is found in the Self Variable.
 *   - Example: getSelfVariableValue(12, 34, 56)
 * 
 *   ---
 * 
 *   Set Self Switch Values:
 * 
 *   setSelfSwitchValue(mapID, eventID, switchID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - Replace 'value' with either 'true' or 'false' for ON/OFF respectively.
 *     Do not use quotes.
 *   - This will change the Self Switch's value to true/false.
 *     - Example: setSelfSwitchValue(12, 34, 56, false)
 *     - Example: setSelfSwitchValue(12, 34, 'B', true)
 * 
 *   ---
 * 
 *   Set Self Variable Values:
 * 
 *   setSelfVariableValue(mapID, eventID, variableID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - Replace 'value' with the value you want to set the Self Variable to.
 *   - Example: setSelfVariableValue(12, 34, 56, 88888)
 * 
 *   ---
 * 
 * ---
 *
 * ============================================================================
 * Features: VisuStella-Style 8-Directional Sprite Sheets
 * ============================================================================
 *
 * This plugin provides support for the VisuStella-Style 8-Directional Sprite
 * Sheets, also know as VS8. VS8 sprite sheets offer support for walking
 * frames, dashing frames, carrying frames, and emotes.
 *
 * ---
 *
 * To designate a sprite sheet as VS8, simply add [VS8] to the filename.
 * Something like Actor1.png would become Actor1_[VS8].png.
 *
 * ---
 *
 * VS8 sprites are formatted as such. Each block below is a set of 3 frames.
 *
 * Walk Down    Walk DL     Dash Down   Dash DL
 * Walk Left    Walk DR     Dash Left   Dash DR
 * Walk Right   Walk UL     Dash Right  Dash UL
 * Walk Up      Walk UR     Dash Up     Dash UR
 *
 * Carry Down   Carry DL    Ladder      Emotes 3
 * Carry Left   Carry DR    Rope        Emotes 4
 * Carry Right  Carry UL    Emotes 1    Emotes 5
 * Carry Up     Carry UR    Emotes 2    Emotes 6
 *
 * ---
 *
 * Here are how each of the emote sets are grouped from left to right.
 *
 * Emotes 1: Item, Hmph, Victory
 * Emotes 2: Hurt, Kneel, Collapse
 * Emotes 3: !, ?, Music Note
 * Emotes 4: Heart, Anger, Sweat
 * Emotes 5: Cobweb, ..., Light Bulb
 * Emotes 6: Sleep0, Sleep1, Sleep2
 *
 * ---
 *
 * ============================================================================
 * Notetags and Comment Tags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * Some of these are comment tags. Comment tags are used for events to mark and
 * affect individual event pages rather than the whole event.
 *
 * === Map Notetags ===
 *
 * The following notetags are used for maps only. While some of these options
 * are also available in the Plugin Parameters, some of these notetags extend
 * usage to specific maps marked by these notetags as well.
 *
 * ---
 *
 * <Diagonal Movement: On>
 * <Diagonal Movement: Off>
 *
 * - Used for: Map Notetags
 * - Turns on/off diagonal movement for those maps.
 * - If notetag isn't present, use Plugin Parameter setting.
 *
 * ---
 *
 * <type Allow Region: x>
 * <type Allow Region: x, x, x>
 *
 * <type Forbid Region: x>
 * <type Forbid Region: x, x, x>
 *
 * <type Dock Region: x>
 * <type Dock Region: x, x, x>
 *
 * - Used for: Map Notetags
 * - Replace 'type' with 'All', 'Walk', 'Player', 'Event', 'Vehicle', 'Boat',
 *   'Ship', or 'Airship'.
 * - 'Allow' notetag variants allow that type to pass through them no matter
 *   what other passability settings are in place.
 * - 'Forbid' notetag variants forbid that type from passing through at all.
 * - 'Dock' notetag variants allow vehicles to dock there. Boats and ships must
 *   face the region direction while airships must land directly on top.
 *
 * ---
 *
 * <Save Event Locations>
 *
 * - Used for: Maps Notetags
 * - Saves the locations of all events on the map so that when you return to
 *   that map at a later point, the events will be in the position they were
 *   last in.
 *
 * ---
 * 
 * === Page Comment Tags ===
 * 
 * The following comment tags are to be put inside of the pages of events,
 * troops, and common events for them to work!
 * 
 * ---
 * 
 * <Page Conditions>
 *   conditions
 *   conditions
 *   conditions
 * </Page Conditions>
 * 
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - This allows you to create custom page conditions that utilize the
 *   Conditional Branch event command to see if the additional page conditions
 *   are met.
 * 
 * ---
 * 
 * <Conditions Met>
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - If used between the <Page Conditions> and </Page Conditions> comment tag,
 *   upon reaching this part of event command list, the custom page conditions
 *   will be considered met.
 * 
 * ---
 * 
 * Example:
 * 
 * ◆Comment：<Page Conditions>
 * ◆If：Reid has equipped Potion Sword
 *   ◆Comment：If Reid has equipped the Potion Sword
 * ：       ：<Condition Met>
 *   ◆
 * ：End
 * ◆Comment：</Page Conditions>
 * 
 * If Reid has the "Potion Sword" weapon equipped, then the additional custom
 * page conditions are met and the event page will be present/active.
 * 
 * If this is a troop condition, the troop page event will activate.
 * 
 * If this is a common event, there will be a parallel common event active.
 * 
 * ---
 *
 * === Event and Event Page Notetags ===
 *
 * The following notetags have comment tag variants (with a few exceptions).
 * If a notetag is used for an event, it will affect the event constantly.
 * If a comment tag is used, it will only affect the page the comment tag is
 * on and only that page.
 *
 * ---
 *
 * <Activation Region: x>
 * <Activation Regions: x,x,x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   standing within a tile marked by a designated region.
 * - Replace 'x' with the regions you wish to remotely activate this event in.
 *   - Action Button: Player must press OK while being in the region.
 *   - Player/Event Touch: Player must step onto the region.
 *   - Autorun/Parallel: Player be in the region.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Activation Square: x>
 * <Activation Radius: x>
 * <Activation Row: x>
 * <Activation Column: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   within range of its activation type.
 * - Replace 'x' with a number stating the range in tiles.
 *   - Square: A square-shaped range with the event at the center.
 *   - Radius: A diamond-shaped range with the event at the center.
 *   - Row: Spans horizontally across the map. 'x' expands up and down.
 *   - Column: Spans vertically across the map. 'x' expands left and right.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Always Update Movement>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Events normally have to be within screen range for them to update their
 *   self movement. If this tag is present, the event is always updating.
 *
 * ---
 *
 * <Click Trigger>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to activate upon being clicked on with the mouse.
 *
 * ---
 *
 * <Copy Event: Map x, Event y>
 * <Copy Event: x, y>
 *
 * <Copy Event: template>
 *
 * - Used for: Event Notetags ONLY
 * - Makes this event copy all of the event settings from a different event
 *   that can be found on a different map (as long as that map is registered
 *   inside of Plugin Parameters => Event Template Settings => Preloaded Maps).
 * - Replace 'x' with a number representing the copied event's Map ID.
 * - Replace 'y' with a number representing the copied event's Event ID.
 * - For the 'template' variant, replace 'template' with the name of the
 *   template made in Plugin Parameters => Event Template Settings =>
 *   Event Template List.
 *
 * ---
 *
 * <Hitbox Left: x>
 * <Hitbox Right: x>
 * <Hitbox Up: x>
 * <Hitbox Down: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with a number to extend the hitbox of the event by that many
 *   tiles towards the listed direction.
 * - Use multiples of this notetag to extend them to different directions.
 *
 * ---
 *
 * <Icon: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with the Icon ID you wish to put above this event.
 * - This will not override any Icons designated to the ID through a
 *   Plugin Command.
 *
 * ---
 *
 * <Icon Buffer X: +x>
 * <Icon Buffer X: -x>
 *
 * <Icon Buffer Y: +x>
 * <Icon Buffer Y: -x>
 *
 * <Icon Buffer: +x, +y>
 * <Icon Buffer: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the icon on the envent by buffers.
 * - Replace 'x' and 'y' with the values to adjust the position buffers by.
 *
 * ---
 *
 * <Icon Blend Mode: Normal>
 * <Icon Blend Mode: Additive>
 * <Icon Blend Mode: Multiply>
 * <Icon Blend Mode: Screen>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets the blend mode for the icon on the event.
 *
 * ---
 *
 * <Label: text>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - Text codes can be used.
 *
 * ---
 *
 * <Label>
 * text
 * text
 * </Label>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - This can display multiple lines.
 * - Text codes can be used.
 *
 * ---
 *
 * <Label Range: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets a range requirement for the player to be in order for the event's
 *   label to appear.
 * - Replace 'x' with a number value depicting the range in tiles.
 *
 * ---
 *
 * <Label Offset X: +x>
 * <Label Offset X: -x>
 *
 * <Label Offset Y: +x>
 * <Label Offset Y: -x>
 *
 * <Label Offset: +x, +y>
 * <Label Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the label on the envent by offsets.
 * - Replace 'x' and 'y' with the values to adjust the position offsets by.
 *
 * ---
 * 
 * <Move Only Region: x>
 * <Move Only Regions: x,x,x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets the move range of this event to only the region(s) marked by the
 *   notetag(s) or comment tag(s).
 * - This will bypass terrain passability.
 * - This will not bypass event collision.
 * 
 * ---
 *
 * <Move Synch Target: Player>
 *
 * <Move Synch Target: Event x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Synchronizes the movement of this event with a target (either the player
 *   or another event). This event will only move whenever the synchronized
 *   target moves.
 * - For 'Event x' variant, replace 'x' with the ID of the event to synch to.
 *
 * ---
 *
 * <Move Synch Type: Random>
 * <Move Synch Type: Approach>
 * <Move Synch Type: Away>
 * <Move Synch Type: Custom>
 *
 * <Move Synch Type: Mimic>
 * <Move Synch Type: Reverse Mimic>
 *
 * <Move Synch Type: Mirror Horizontal>
 * <Move Synch Type: Mirror Vertical>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Choose the type of movement the event will have if it is synchronized to
 *   a target.
 *   - Random: Move to a random position.
 *   - Approach: Approaches target.
 *   - Away: Flees from target.
 *   - Custom: Follows a custom move route.
 *   - Mimic: Imitates the target's movement style.
 *   - Reverse Mimic: Does the opposite of the target's movement.
 *   - Mirror Horizontal: Moves as if a mirror is placed horizontally.
 *   - Mirror Vertical: Moves as if a mirror is placed vertically.
 *
 * ---
 *
 * <Move Synch Delay: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is present, the event will wait a bit after each move before
 *   moving again.
 * - Replace 'x' with the number of movement instances in between.
 *
 * ---
 *
 * <Save Event Location>
 *
 * - Used for: Event Notetags ONLY
 * - Saves the locations of the event on the map so that when you return to
 *   that map at a later point, the event will be in the position it was
 *   last in.
 *
 * ---
 *
 * <Hide Shadow>
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Hides the shadow for the event.
 *
 * ---
 *
 * <Shadow Filename: filename>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replaces the shadow graphic used with 'filename' found in the
 *   img/system/ project folder.
 *
 * ---
 *
 * <Sprite Offset X: +x>
 * <Sprite Offset X: -x>
 *
 * <Sprite Offset Y: +x>
 * <Sprite Offset Y: -x>
 *
 * <Sprite Offset: +x, +y>
 * <Sprite Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes how much the event's sprite is visibly offset by.
 * - Replace 'x' and 'y' with numbers indicating the offset in pixels.
 *
 * ---
 *
 * <Step Pattern: Left to Right>
 * <Step Pattern: Right to Left>
 *
 * <Step Pattern: Spin Clockwise>
 * <Step Pattern: Spin CW>
 *
 * <Step Pattern: Spin CounterClockwise>
 * <Step Pattern: Spin CCW>
 * <Step Pattern: Spin AntiClockwise>
 * <Step Pattern: Spin ACW>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the way the event animates if a tag is present.
 *   - Left to Right: Makes the event sprite's step behavior go from frame 0 to
 *     1 to 2, then back to 0 instead of looping backward.
 *   - Right to Left: Makes the event sprite's step behavior go from frame 2 to
 *     1 to 0, then back to 2 instead of looping forward.
 *   - Spin Clockwise: Makes the event sprite's step behavior spin CW.
 *   - Spin CounterClockwise: Makes the event sprite's step behavior spin CCW.
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
 * === Auto Movement Plugin Commands ===
 * 
 * ---
 *
 * Auto Movement: Events
 * - Allow/stop events from auto movement.
 *
 *   Value:
 *   - Allow events to move automatically?
 *
 * ---
 * 
 * === Call Event Plugin Commands ===
 * 
 * ---
 *
 * Call Event: Remote Activation
 * - Runs the page of a different event remotely.
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - You may use JavaScript code.
 *
 *   Page ID:
 *   - The page of the remote event to run.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Dash Plugin Commands ===
 * 
 * ---
 *
 * Dash Enable: Toggle
 * - Enable/Disable Dashing on maps.
 *
 *   Value:
 *   - What do you wish to change dashing to?
 *
 * ---
 * 
 * === Event Icon Plugin Commands ===
 * 
 * ---
 *
 * Event Icon: Change
 * - Change the icon that appears on an event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - You may use JavaScript code.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Event Icon: Delete
 * - Delete the icon that appears on an event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Event Label Plugin Commands ===
 * 
 * ---
 *
 * Event Label: Refresh
 * - Refresh all Event Labels on screen.
 * - This is used to refresh page conditions for map changes that don't
 *   force a refresh.
 *
 * ---
 *
 * Event Label: Visible
 * - Change the visibility of Event Labels.
 *
 *   Visibility:
 *   - What do you wish to change visibility to?
 *
 * ---
 * 
 * === Event Location Plugin Commands ===
 * 
 * ---
 *
 * Event Location: Save
 * - Memorize an event's map location so it reappears there the next time the
 *   map is loaded.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Delete
 * - Deletes an event's saved map location.
 * - The event will reappear at its default location.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *   
 *   Event ID:
 *   - The ID of the target event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Create
 * - Creates a custom spawn location for a specific map's event so it appears
 *   there the next time the map is loaded.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - You may use JavaScript code.
 *
 *   X Coordinate:
 *   - The X coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - The Y coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Direction:
 *   - The direction the event will be facing.
 *
 *   Optional:
 *
 *     Page ID:
 *     - The page of the event to set the move route to.
 *     - You may use JavaScript code.
 *
 *     Move Route Index:
 *     - The point in the move route for this event to be at if the page ID
 *       matches the rest of the page conditions.
 *
 * ---
 * 
 * === Global Switch Plugin Commands ===
 * 
 * ---
 * 
 * Global Switch: Get Self Switch A B C D
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - You may use JavaScript code.
 * 
 *   Letter:
 *   - Letter of the target event's Self Switch to obtain data from.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * Global Switch: Get Self Switch ID
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - You may use JavaScript code.
 * 
 *   Switch ID:
 *   - The ID of the source switch.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * === Global Variable Plugin Commands ===
 * 
 * ---
 * 
 * Global Variable: Get Self Variable ID
 * - Gets the current stored value from a Self Variable and stores it onto a
 *   Global Variable.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - You may use JavaScript code.
 * 
 *   Variable ID:
 *   - The ID of the source variable.
 * 
 *   -
 * 
 *   Target Variable ID:
 *   - The ID of the target variable.
 * 
 * ---
 * 
 * === Morph Event Plugin Commands ===
 * 
 * ---
 *
 * Morph Event: Change
 * - Runs the page of a different event remotely.
 *
 *   Step 1:
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Template Name:
 *     - Name of the target event template to morph into.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - You may use JavaScript code.
 *
 *     Preserve Morph:
 *     - Is the morph effect preserved?
 *     - Or does it expire upon leaving the map?
 *
 * ---
 *
 * Morph Event: Remove
 * - Remove the morph status of an event.
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - You may use JavaScript code.
 *
 *   Remove Preservation:
 *   - Also remove the preservation effect?
 *
 * ---
 * 
 * === Player Icon Plugin Commands ===
 * 
 * ---
 *
 * Player Icon: Change
 * - Change the icon that appears on on the player.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Player Icon: Delete
 * - Delete the icon that appears on the player.
 *
 * ---
 * 
 * === Player Movement Plugin Commands ===
 * 
 * ---
 * 
 * Player Movement: Control
 * - Enable or disable player control over the player character's movement.
 * 
 *   Enable?:
 *   - Let the player control where the player character moves?
 * 
 * ---
 * 
 * Player Movement: Diagonal
 * - Override settings to for player diagonal movement.
 * 
 *   Setting:
 *   - How do you want to change diagonal movement?
 *   - Default: Whatever the Map Uses
 *   - Forcefully Disable Diagonal Movement
 *   - Forcefully Enable Diagonal Movement
 * 
 * ---
 * 
 * === Self Switch Plugin Commands ===
 * 
 * ---
 *
 * Self Switch: A B C D
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - You may use JavaScript code.
 *
 *   Letter:
 *   - Letter of the target event's Self Switch to change.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 *
 * Self Switch: Switch ID
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - You may use JavaScript code.
 *
 *   Switch ID:
 *   - The ID of the target switch.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Self Variable Plugin Commands ===
 * 
 * ---
 *
 * Self Variable: Variable ID
 * - Change the Self Variable of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - You may use JavaScript code.
 *
 *   Variable ID:
 *   - The ID of the target variable.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Spawn Event Plugin Commands ===
 * 
 * ---
 *
 * Spawn Event: Spawn At X, Y
 * - Spawns desired event at X, Y location on the current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     X Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Y Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 * ---
 *
 * Spawn Event: Spawn At Region
 * - Spawns desired event at a random region-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Region ID(s):
 *     - Pick region(s) to spawn this event at.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 * ---
 *
 * Spawn Event: Despawn Event ID
 * - Despawns the selected Event ID on the current map.
 *
 *   Event ID
 *   - The ID of the target event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn At X, Y
 * - Despawns any spawned event(s) at X, Y location on the current map.
 *
 *   X Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn Region(s)
 * - Despawns the selected Region(s).
 *
 *   Region ID(s)
 *   - Pick region(s) and despawn everything inside it.
 *
 * ---
 *
 * Spawn Event: Despawn Everything
 * - Despawns all spawned events on the current map.
 *
 * ---
 *
 * ============================================================================
 * Move Route Custom Commands
 * ============================================================================
 *
 * Some custom commands have been added to the "Set Movement Route" event
 * command. These can be accessed by pressing the "Script..." command and
 * typing in the following, which don't need to be in code form.
 *
 * Keep in mind that since these are custom additions and RPG Maker MZ does not
 * allow plugins to modify the editor, the "Preview" button will not factor in
 * the effects of these commands.
 *
 * ---
 * 
 * Animation: x
 * - Replace 'x' with the ID of the animation to play on moving unit.
 *
 * ---
 * 
 * Balloon: name
 * - Replace 'name' with any of the following to play a balloon on that the
 *   target moving unit.
 * - '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep', 'User-Defined 1', 'User-Defined 2',
 *   'User-Defined 3', 'User-Defined 4', 'User-Defined 5'
 *
 * ---
 * 
 * Fade In: x
 * Fade Out: x
 * - Fades in/out the sprite's opacity.
 * - Fade In will continuously raise the opacity level until it reaches 255.
 * - Fade Out will continuously lower the opacity level until it reaches 0.
 * - Replace 'x' with the speed to fade in/out the sprite.
 * 
 * ---
 * 
 * Force Carry: On
 * Force Carry: Off
 * - For usage with the VS8 sprite sheet.
 * - Use ON to turn force carrying on.
 * - Use OFF to turn force carrying off.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Carry frames.
 * 
 * ---
 * 
 * Force Dash: On
 * Force Dash: Off
 * - Use ON to turn force dashing on.
 * - Use OFF to turn force dashing off.
 * - Forces dashing will prompt the player or event to be in the dashing state.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Dashing frames.
 * 
 * ---
 * 
 * Hug: Left
 * Hug: Right
 * - Causes the moving unit to hug the left/right side of the wall.
 *
 * ---
 * 
 * Index: x
 * - Replace 'x' with a number depicting the character index to change the
 *   moving unit's sprite to.
 *
 * ---
 * 
 * Index: +x
 * Index: -x
 * - Replace 'x' with the value to change the character index of the moving
 *   unit's sprite by.
 *
 * ---
 * 
 * Jump Forward: x
 * - Replace 'x' with the number of tiles for the unit to jump forward by.
 *
 * ---
 * 
 * Jump To: x, y
 * - Replace 'x' and 'y' with the coordinates for the unit to jump to.
 *
 * ---
 * 
 * Jump to Event: x
 * - Replace 'x' with the ID of the event for the unit to jump to.
 *
 * ---
 * 
 * Jump to Player
 * - Causes the moving unit to jump to the player.
 *
 * ---
 * 
 * Move Lower Left Until Stop
 * Move Down Until Stop
 * Move Lower Right Until Stop
 * Move Left Until Stop
 * Move Right Until Stop
 * Move Upper Left Until Stop
 * Move Up Until Stop
 * Move Upper Right Until Stop
 * - Causes the moving unit to move that direction until it hits a stop.
 *
 * ---
 * 
 * Move To: x, y
 * - Replace 'x' and 'y' with the map coordinates to move the unit to through
 *   pathfinding.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Move to Event: x
 * - Replace 'x' with the ID of the event to move the unit to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Move to Player
 * - Moves the unit to the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Move Lower Left: x
 * Move Down: x
 * Move Lower Right: x
 * Move Left: x
 * Move Right: x
 * Move Upper Left: x
 * Move Up: x
 * Move Upper Right: x
 * - Replace 'x' with the number of times to move the unit by in the designated
 *   direction on the map.
 *
 * ---
 * 
 * Opacity: x%
 * - Replace 'x' with the percentage to change the unit's sprite opacity to.
 *
 * ---
 * 
 * Opacity: +x
 * Opacity: -x
 * - Replace 'x' with the increment to change the unit's sprite opacity by.
 *
 * ---
 *
 * Pattern Lock: x
 * - Replace 'x' with the step pattern to lock the unit's sprite to.
 *
 * ---
 *
 * Pattern Unlock
 * - Removes pattern lock effect.
 *
 * ---
 * 
 * Pose: name
 * - If using a VS8 sprite, this will cause the unit to strike a pose.
 * - Replace 'name' with any the following:
 * - 'Item', 'Hmph', 'Victory', 'Hurt', 'Kneel', 'Collapse',
 *   '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep'
 *
 * ---
 * 
 * Step Toward: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step towards.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Player
 * - Causes event to take one step towards the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step away from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Player
 * - Causes event to take one step away from the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Turn To: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Event: x
 * - Replace 'x' with the ID of the event to turn the unit towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Player
 * - Causes the unit to turn towards the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Event: x
 * - Replace 'x' with the ID of the event to turn the unit away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Player
 * - Causes the unit to turn away from the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Lower Left
 * Turn Lower Right
 * Turn Upper Left
 * Turn Upper Right
 * - Causes the unit to turn to one of the diagonal directions.
 *
 * ---
 * 
 * Self Switch x: On
 * Self Switch x: Off
 * Self Switch x: Toggle
 * - Replace 'x' with 'A', 'B', 'C', 'D', or a <Self> Switch ID to adjust the
 *   unit's Self Switch.
 *
 * ---
 * 
 * Self Variable x: y
 * - Replace 'x' with a <Self> Variable ID to adjust the unit's Self Variable.
 * - Replace 'y' with a number value to set the Self Variable to.
 *
 * ---
 * 
 * Teleport To: x, y
 * - Replace 'x' and 'y' with the coordinates to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Event: x
 * - Replace 'x' with the ID of the event to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Player
 * - Instantly moves the unit to the player's location.
 *
 * ---
 * 
 * If none of the commands are detected above, then a script call will be ran.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Label Settings
 * ============================================================================
 *
 * Event Labels are small windows created to display text over an event's head.
 * They're set up using the <Label> notetags and/or comment tags. Event Labels
 * are a great way to instantly relay information about the event's role to
 * the player.
 *
 * ---
 *
 * Event Labels
 * 
 *   Font Size:
 *   - The font size used for the Event Labels.
 * 
 *   Icon Size:
 *   - The size of the icons used in the Event Labels.
 * 
 *   Line Height:
 *   - The line height used for the Event Labels.
 * 
 *   Offset X:
 *   - Globally offset all labels horizontally by this amount.
 * 
 *   Offset Y:
 *   - Globally offset all labels vertically by this amount.
 * 
 *   Fade Speed:
 *   - Fade speed for labels.
 * 
 *   Visible Range:
 *   - Range the player has to be within the event to make its label visible.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Icon Settings
 * ============================================================================
 *
 * Icons can be displayed over an event's head through the <Icon> notetags
 * and/or comment tags. These can be used for a variety of things such as
 * making them look like they're carrying an item or to indicate they have a
 * specific role.
 *
 * ---
 *
 * Event Icon
 * 
 *   Buffer X:
 *   - Default X position buffer for event icons.
 * 
 *   Buffer Y:
 *   - Default Y position buffer for event icons.
 * 
 *   Blend Mode:
 *   - Default blend mode for even icons.
 *     - 0 - Normal
 *     - 1 - Additive
 *     - 2 - Multiply
 *     - 3 - Screen
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Template Settings
 * ============================================================================
 *
 * Event Templates allow you to store specific maps and/or event data to bring
 * out on need while having a premade set base. They're similar to prefabs but
 * aren't things that can be altered individually as one setting for an event
 * template will serve as a blueprint for all of them that use them.
 *
 * Event Templates are used for the <Copy Event> notetags, the Morph Event and
 * Spawn Event Plugin Commands.
 *
 * ---
 *
 * Settings
 * 
 *   Preloaded Maps:
 *   - A list of all the ID's of the maps that will be preloaded to serve as
 *     template maps for this plugin.
 *
 * ---
 *
 * Templates
 * - A list of all the Event Templates used by this project. Used for notetags
 *   and Plugin Commands.
 * 
 *     Name:
 *     - Name of the template. It'll be used as anchor points for notetags and
 *       Plugin Commands.
 * 
 *     Map ID:
 *     - ID of the map the template event is stored on.
 *     - This will automatically add this ID to preloaded list.
 * 
 *     Event ID:
 *     - ID of the event the template event is based on.
 * 
 *     JavaScript:
 *       JS: Pre-Copy:
 *       JS: Post-Copy:
 *       JS: Pre-Morph:
 *       JS: Post-Morph:
 *       JS: Pre-Spawn:
 *       JS: Post-Spawn:
 *       - Code that's ran during certain circumstances.
 *       - The code will occur at the same time as the ones listed in the main
 *         Event Template Settings Plugin Parameters. However, the ones listed
 *         in these individual entries will only occur for these specific
 *         templates and only if the templates are used.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: Pre-Copy:
 *   JS: Post-Copy:
 *   JS: Pre-Morph:
 *   JS: Post-Morph:
 *   JS: Pre-Spawn:
 *   JS: Post-Spawn:
 *   - Code that's ran during certain circumstances.
 *   - These are global and are ran for all copies, morphs, and/or spawns.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Movement Settings
 * ============================================================================
 *
 * These plugin parameters allow you to control how movement works in your
 * game, toggling it from 4-directional to 8-directional, setting up rules to
 * stop self-movement from events while an event or message is present, and
 * other aesthetics such as tilting the sprite while dashing, setting shadows
 * beneath the sprites, and allow for turning in place.
 *
 * ---
 *
 * 8 Directional Movement
 * 
 *   Enable:
 *   - Allow 8-directional movement by default? Players can move diagonally.
 * 
 *   Strict Collision:
 *   - Enforce strict collission rules where the player must be able to pass
 *     both cardinal directions?
 * 
 *   Favor Horizontal:
 *   - Favor horizontal if cannot pass diagonally but can pass both
 *     horizontally and vertically?
 * 
 *   Slower Diagonals?
 *   - Enforce a slower movement speed when moving diagonally?
 * 
 *     Speed Multiplier
 *     - What's the multiplier to adjust movement speed when moving diagonally?
 *
 * ---
 *
 * Automatic Movement
 * 
 *   Stop During Events:
 *   - Stop automatic event movement while events are running.
 * 
 *   Stop During Messages:
 *   - Stop automatic event movement while a message is running.
 *
 * ---
 *
 * Dash
 * 
 *   Dash Modifier:
 *   - Alters the dash speed modifier.
 * 
 *   Enable Dash Tilt?:
 *   - Tilt any sprites that are currently dashing?
 * 
 *     Tilt Left Amount:
 *     - Amount in radians when moving left (upper left, left, lower left).
 * 
 *     Tilt Right Amount:
 *     - Amount in radians when moving right (upper right, right, lower right).
 * 
 *     Tilt Vertical Amount:
 *     - Amount in radians when moving vertical (up, down).
 *
 * ---
 *
 * Shadows
 * 
 *   Show:
 *   - Show shadows on all events and player-related sprites.
 * 
 *   Default Filename:
 *   - Default filename used for shadows found in img/system/ folder.
 *
 * ---
 *
 * Turn in Place
 * 
 *   Enable:
 *   - When not dashing, player will turn in place before moving.
 *   - This only applies with keyboard inputs.
 * 
 *   Delay in Frames:
 *   - The number of frames to wait before moving.
 *
 * ---
 * 
 * Vehicle Speeds
 * 
 *   Boat Speed:
 *   - Allows you to adjust the base speed of the boat vehicle.
 * 
 *   Ship Speed:
 *   - Allows you to adjust the base speed of the ship vehicle.
 * 
 *   Airship Speed:
 *   - Allows you to adjust the base speed of the airship vehicle.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: VisuStella 8-Dir Settings
 * ============================================================================
 *
 * These are settings for sprite sheets using the VS8 format.
 * For more information on the VS8 format, look in the help section above.
 *
 * ---
 *
 * Balloon Icon Settings
 * 
 *   Auto-Balloon Poses:
 *   - Automatically pose VS8 sprites when using balloon icons.
 * 
 *   Balloon Offset X:
 *   - Offset balloon icons on VS8 sprites by x pixels.
 * 
 *   Balloon Offset Y:
 *   - Offset balloon icons on VS8 sprites by y pixels.
 *
 * ---
 *
 * Icons
 * 
 *   Auto Buffer:
 *   - Automatically buffer the X and Y coordinates of VS8 sprites?
 * 
 *   Use Carry Pose:
 *   - Use the carry pose when moving with an icon overhead.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Region Rulings
 * ============================================================================
 *
 * These settings allow you to decide the passability of the player, events,
 * and various vehicles through the usage of Regions.
 *
 * ---
 *
 * Allow Regions
 * 
 *   All Allow:
 *   Walk Allow:
 *   Player Allow:
 *   Event Allow:
 *   Vehicle Allow:
 *   Boat Allow:
 *   Ship Allow:
 *   Airship Allow:
 *   - Insert Region ID's where the affected unit type can enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Forbid Regions
 * 
 *   All Forbid:
 *   Walk Forbid:
 *   Player Forbid:
 *   Event Forbid:
 *   Vehicle Forbid:
 *   Boat Forbid:
 *   Ship Forbid:
 *   Airship Forbid:
 *   - Insert Region ID's where the affected unit type cannot enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Dock Regions
 * 
 *   Vehicle Dock:
 *   Boat Dock:
 *   Ship Dock:
 *   Airship Dock:
 *   - Insert Region ID's where the affected vehicle can dock
 *   - Region ID's range from 0 to 255.
 * 
 *   Only Region Dockable:
 *   - Vehicles are only able to dock at designated regions.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on OK Button
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that activate using
 * Regions when pressing the OK button while standing on top of them or in
 * front of them. These let you create near universally interactable objects
 * using Regions, such as rivers to start up fishing events or locations to
 * places items on.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * Target Tile
 * 
 *   Target Tile:
 *   - Which tile should be checked for Common Event on OK Button?
 *     - Tile in front of player.
 *     - Tile player is standing on top of.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on Touch
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that trigger when
 * stepping onto Region-marked tiles. These let you create custom effects that
 * will occur such as customized damage floors, traps, and/or events.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Terrain Tag Settings
 * ============================================================================
 *
 * Terrain Tags are used in Database => Tilesets to mark certain tiles and
 * give them unique properties through terrain tags.
 *
 * ---
 *
 * Terrain Tag ID's
 * 
 *   Rope:
 *   - Which terrain tag number to use for ropes?
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
 * Version 1.04: September 13: 2020
 * * Feature Update!
 * * Some Move Route Custom Commands are updated to ignore spaces:
 * ** Jump To: x, y
 * ** Move To: x, y
 * ** Step Toward: x, y
 * ** Step Away From: x, y
 * ** Turn To: x, y
 * ** Turn Away From: x, y
 * ** Teleport To: x, y
 * *** These can now be written as x,y. There still needs to be a space between
 *     the : and x for parsing clarity, however.
 * *** Feature updated by Arisu with help from BlueMoon and Zeriab.
 * * New Features!
 * ** New 'Move Route Custom Commands' added by Arisu.
 * *** Fade In: x
 * *** Fade Out: x
 * *** Force Carry: On
 * *** Force Carry: Off
 * *** Force Dash: On
 * *** Force Dash: Off
 * ** New Plugin Commands added by Arisu.
 * *** Player Movement: Control
 * **** Enable or disable player control over the player character's movement.
 * *** Player Movement: Diagonal
 * **** Override settings to for player diagonal movement.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Sleeping pose is now fixed and working! Fix made by Yanfly.
 * * Documentation Update!
 * ** Extended "Features: Self Switches and Variables" to explain how to use
 *    script calls to grab self switch information.
 * * New Features!
 * ** New Plugin Commands added by Yanfly:
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * **** These plugin commands allow you to transfer data stored in a self
 *      switch or Self Variable into a global switch or global variable.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** <Diagonal Movement: Off> notetag now works properly. Fix made by Yanfly.
 * ** Plugin Command "Event Label: Visible" now works properly. Fix made by
 *    Shaz.
 * ** Custom Move Route commands should now be working properly. Fix made by
 *    Shaz.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Event Cache issues fixed upon loading a saved game. Fix made by Yanfly.
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
 * @command AutoMoveEvents
 * @text Auto Movement: Events
 * @desc Allow/stop events from auto movement.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Allow
 * @value Allow
 * @option Stop
 * @value Stop
 * @option Toggle
 * @value Toggle
 * @desc Allow events to move automatically?
 * @default Allow
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CallEvent
 * @text Call Event: Remote Activation
 * @desc Runs the page of a different event remotely.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the event to remotely run.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg PageId:eval
 * @text Page ID
 * @desc The page of the remote event to run.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DashEnableToggle
 * @text Dash Enable: Toggle
 * @desc Enable/Disable Dashing on maps.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Enable
 * @value Enable
 * @option Disable
 * @value Disable
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change dashing to?
 * @default Enable
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconChange
 * @text Event Icon: Change
 * @desc Change the icon that appears on an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconDelete
 * @text Event Icon: Delete
 * @desc Delete the icon that appears on an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelRefresh
 * @text Event Label: Refresh
 * @desc Refresh all Event Labels on screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelVisible
 * @text Event Label: Visible
 * @desc Change the visibility of Event Labels.
 *
 * @arg Visibility:str
 * @text Visibility
 * @type select
 * @option Visible
 * @value Visible
 * @option Hidden
 * @value Hidden
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change visibility to?
 * @default Visible
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationSave
 * @text Event Location: Save
 * @desc Memorize an event's map location so it reappears there
 * the next time the map is loaded.
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationDelete
 * @text Event Location: Delete
 * @desc Deletes an event's saved map location.
 * The event will reappear at its default location.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationCreate
 * @text Event Location: Create
 * @desc Creates a custom spawn location for a specific map's event
 * so it appears there the next time the map is loaded.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent MapId:eval
 * @desc The X coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent MapId:eval
 * @desc The Y coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Direction:num
 * @text Direction
 * @parent MapId:eval
 * @type select
 * @option 1 - Lower Left
 * @value 1
 * @option 2 - Down
 * @value 2
 * @option 3 - Lower Right
 * @value 3
 * @option 4 - Left
 * @value 4
 * @option 6 - Right
 * @value 6
 * @option 7 - Upper Left
 * @value 7
 * @option 8 - Up
 * @value 8
 * @option 9 - Upper Right
 * @value 9
 * @desc The direction the event will be facing.
 * @default 2
 *
 * @arg Optional
 *
 * @arg PageId:eval
 * @text Page ID
 * @parent Optional
 * @desc The page of the event to set the move route to.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg MoveRouteIndex:eval
 * @text Move Route Index
 * @parent Optional
 * @desc The point in the move route for this event to be at
 * if the page ID matches the rest of the page conditions.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchABCD
 * @text Global Switch: Get Self Switch A B C D
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to obtain data from.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchID
 * @text Global Switch: Get Self Switch ID
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the source switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableGetSelfVariableID
 * @text Global Variable: Get Self Variable ID
 * @desc Gets the current stored value from a Self Variable and
 * stores it onto a Global Variable.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the source variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetVariableId:num
 * @text Target Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventTo
 * @text Morph Event: Change
 * @desc Runs the page of a different event remotely.
 *
 * @arg Step1
 * @text Step 1: To Be Changed
 *
 * @arg Step1MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step1EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Change Into
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step2
 * @desc Name of the target event template to morph into.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg Step2MapId:eval
 * @text Map ID
 * @parent Step2
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2EventId:eval
 * @text Event ID
 * @parent Step2
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2Preserve:eval
 * @text Preserve Morph
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the morph effect preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventRemove
 * @text Morph Event: Remove
 * @desc Remove the morph status of an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the event to remotely run.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg RemovePreserve:eval
 * @text Remove Preservation
 * @parent Step2
 * @type boolean
 * @on Remove
 * @off Contain
 * @desc Also remove the preservation effect?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconChange
 * @text Player Icon: Change
 * @desc Change the icon that appears on on the player.
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconDelete
 * @text Player Icon: Delete
 * @desc Delete the icon that appears on the player.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementChange
 * @text Player Movement: Control
 * @desc Enable or disable player control over the player character's movement.
 *
 * @arg Enable:eval
 * @text Enable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Let the player control where the player character moves?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementDiagonal
 * @text Player Movement: Diagonal
 * @desc Override settings to for player diagonal movement.
 *
 * @arg Setting:str
 * @text Setting
 * @type select
 * @option Default: Whatever the Map Uses
 * @value default
 * @option Forcefully Disable Diagonal Movement
 * @value disable
 * @option Forcefully Enable Diagonal Movement
 * @value enable
 * @desc How do you want to change diagonal movement?
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchABCD
 * @text Self Switch: A B C D
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to change.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchID
 * @text Self Switch: Switch ID
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfVariableID
 * @text Self Variable: Variable ID
 * @desc Change the Self Variable of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Operation:str
 * @text Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Break2
 * @text -
 *
 * @arg Value:eval
 * @text Value
 * @desc Insert the value to modify the Self Variable by.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtXY
 * @text Spawn Event: Spawn At X, Y
 * @desc Spawns desired event at X, Y location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtRegion
 * @text Spawn Event: Spawn At Region
 * @desc Spawns desired event at a random region-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) to spawn this event at.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEventID
 * @text Spawn Event: Despawn Event ID
 * @desc Despawns the selected Event ID on the current map.
 *
 * @arg EventID:eval
 * @text Event ID
 * @type combo
 * @option $gameMap.firstSpawnedEventID()
 * @option $gameMap.lastSpawnedEventID()
 * @option 1001
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default $gameMap.lastSpawnedEventID()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnAtXY
 * @text Spawn Event: Despawn At X, Y
 * @desc Despawns any spawned event(s) at X, Y location on the current map.
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnRegions
 * @text Spawn Event: Despawn Region(s)
 * @desc Despawns the selected Region(s) on the current map.
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) and despawn everything inside it.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEverything
 * @text Spawn Event: Despawn Everything
 * @desc Despawns all spawned events on the current map.
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
 * @param EventsMoveCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Label:struct
 * @text Event Label Settings
 * @type struct<Label>
 * @desc Choose settings regarding the Event Labels.
 * @default {"FontSize:num":"22","IconSize:num":"26","LineHeight:num":"30","OffsetX:num":"0","OffsetY:num":"12","OpacitySpeed:num":"16","VisibleRange:num":"30"}
 *
 * @param Icon:struct
 * @text Event Icon Settings
 * @type struct<Icon>
 * @desc Choose settings regarding the Event Icons.
 * @default {"BufferX:num":"0","BufferY:num":"12","BlendMode:num":"0"}
 *
 * @param Template:struct
 * @text Event Template Settings
 * @type struct<Template>
 * @desc Choose settings regarding Event Templates.
 * @default {"Settings":"","PreloadMaps:arraynum":"[\"1\"]","Prefabs":"","List:arraystruct":"[]","JavaScript":"","PreCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\""}
 *
 * @param EventBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Movement:struct
 * @text Movement Settings
 * @type struct<Movement>
 * @desc Change the rules regarding movement in the game.
 * @default {"Dir8":"","EnableDir8:eval":"true","StrictCollision:eval":"true","FavorHorz:eval":"true","SlowerSpeed:eval":"false","DiagonalSpeedMultiplier:num":"0.85","AutoMove":"","StopAutoMoveEvents:eval":"true","StopAutoMoveMessages:eval":"true","Dash":"","DashModifier:num":"+1.0","EnableDashTilt:eval":"true","TiltLeft:num":"-0.15","TiltRight:num":"0.15","TiltVert:num":"0.05","Shadows":"","ShowShadows:eval":"true","DefaultShadow:str":"Shadow1","TurnInPlace":"","EnableTurnInPlace:eval":"false","TurnInPlaceDelay:num":"10","Vehicle":"","BoatSpeed:num":"4.0","ShipSpeed:num":"5.0","AirshipSpeed:num":"6.0"}
 *
 * @param VS8:struct
 * @text VisuStella 8-Dir Settings
 * @type struct<VS8>
 * @desc Choose settings regarding VisuStella 8-Directional Sprites.
 * @default {"Balloons":"","AutoBalloon:eval":"true","BalloonOffsetX:num":"0","BalloonOffsetY:num":"12","Icons":"","AutoBuffer:eval":"true","CarryPose:eval":"true"}
 *
 * @param MovementBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Region:struct
 * @text Region Rulings
 * @type struct<Region>
 * @desc Choose settings regarding regions.
 * @default {"Allow":"","AllAllow:arraynum":"[]","WalkAllow:arraynum":"[]","PlayerAllow:arraynum":"[]","EventAllow:arraynum":"[]","VehicleAllow:arraynum":"[]","BoatAllow:arraynum":"[]","ShipAllow:arraynum":"[]","AirshipAllow:arraynum":"[]","Forbid":"","AllForbid:arraynum":"[]","WalkForbid:arraynum":"[]","PlayerForbid:arraynum":"[]","EventForbid:arraynum":"[]","VehicleForbid:arraynum":"[]","BoatForbid:arraynum":"[]","ShipForbid:arraynum":"[]","AirshipForbid:arraynum":"[]","Dock":"","VehicleDock:arraynum":"[]","BoatDock:arraynum":"[]","BoatDockRegionOnly:eval":"false","ShipDock:arraynum":"[]","ShipDockRegionOnly:eval":"false","AirshipDock:arraynum":"[]","AirshipDockRegionOnly:eval":"false"}
 *
 * @param RegionOk:struct
 * @text Common Event on OK Button
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon pressing the
 * OK button while standing on top of designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param RegionOkTarget:str
 * @text Target Tile
 * @parent RegionOk:struct
 * @type select
 * @option Tile in front of player.
 * @value front
 * @option Tile player is standing on top of.
 * @value standing
 * @desc Which tile should be checked for
 * Common Event on OK Button?
 * @default front
 *
 * @param RegionTouch:struct
 * @text Common Event on Touch
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon stepping the tiles
 * marked by the designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param TerrainTag:struct
 * @text Terrain Tag Settings
 * @type struct<TerrainTag>
 * @desc Choose settings regarding terrain tags.
 * @default {"TerrainTag":"","Rope:num":"1"}
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
 * Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Label:
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc The font size used for the Event Labels.
 * @default 22
 *
 * @param IconSize:num
 * @text Icon Size
 * @type number
 * @min 1
 * @desc The size of the icons used in the Event Labels.
 * @default 26
 *
 * @param LineHeight:num
 * @text Line Height
 * @type number
 * @min 1
 * @desc The line height used for the Event Labels.
 * @default 26
 *
 * @param OffsetX:num
 * @text Offset X
 * @type number
 * @min 0
 * @desc Globally offset all labels horizontally by this amount.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @type number
 * @min 0
 * @desc Globally offset all labels vertically by this amount.
 * @default 12
 *
 * @param OpacitySpeed:num
 * @text Fade Speed
 * @type number
 * @min 1
 * @desc Fade speed for labels.
 * @default 16
 *
 * @param VisibleRange:num
 * @text Visible Range
 * @type number
 * @min 1
 * @desc Range the player has to be within the event to make its label visible.
 * @default 30
 *
 */
/* ----------------------------------------------------------------------------
 * Icon Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Icon:
 *
 * @param BufferX:num
 * @text Buffer X
 * @desc Default X position buffer for event icons.
 * @default 0
 *
 * @param BufferY:num
 * @text Buffer Y
 * @desc Default Y position buffer for event icons.
 * @default 12
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc Default blend mode for even icons.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Template Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Template:
 *
 * @param Settings
 *
 * @param PreloadMaps:arraynum
 * @text Preloaded Maps
 * @parent Settings
 * @type number[]
 * @desc A list of all the ID's of the maps that will be preloaded
 * to serve as template maps for this plugin.
 * @default ["1"]
 *
 * @param Templates
 *
 * @param List:arraystruct
 * @text Event Template List
 * @parent Templates
 * @type struct<EventTemplate>[]
 * @desc A list of all the Event Templates used by this project.
 * Used for notetags and Plugin Commands.
 * @default []
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Event Template
 * ----------------------------------------------------------------------------
 */
/*~struct~EventTemplate:
 *
 * @param Name:str
 * @text Name
 * @desc Name of the template. It'll be used as anchor points for
 * notetags and Plugin Commands.
 * @default Untitled
 *
 * @param MapID:num
 * @text Map ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the map the template event is stored on.
 * This will automatically add this ID to preloaded list.
 * @default 1
 *
 * @param EventID:num
 * @text Event ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the event the template event is based on.
 * @default 1
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Movement Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Movement:
 *
 * @param Dir8
 * @text 8 Directional Movement
 *
 * @param EnableDir8:eval
 * @text Enable
 * @parent Dir8
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Allow 8-directional movement by default? Players can move diagonally.
 * @default true
 *
 * @param StrictCollision:eval
 * @text Strict Collision
 * @parent Dir8
 * @type boolean
 * @on Strict
 * @off Flexible
 * @desc Enforce strict collission rules where the player must be able to pass both cardinal directions?
 * @default true
 *
 * @param FavorHorz:eval
 * @text Favor Horizontal
 * @parent StrictCollision:eval
 * @type boolean
 * @on Horizontal
 * @off Vertical
 * @desc Favor horizontal if cannot pass diagonally but can pass both horizontally and vertically?
 * @default true
 *
 * @param SlowerSpeed:eval
 * @text Slower Diagonals?
 * @parent Dir8
 * @type boolean
 * @on Slower
 * @off Normal
 * @desc Enforce a slower movement speed when moving diagonally?
 * @default false
 *
 * @param DiagonalSpeedMultiplier:num
 * @text Speed Multiplier
 * @parent SlowerSpeed:eval
 * @desc What's the multiplier to adjust movement speed when moving diagonally?
 * @default 0.85
 *
 * @param AutoMove
 * @text Automatic Movement
 *
 * @param StopAutoMoveEvents:eval
 * @text Stop During Events
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while events are running.
 * @default true
 *
 * @param StopAutoMoveMessages:eval
 * @text Stop During Messages
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while a message is running.
 * @default true
 *
 * @param Dash
 * @text Dash
 *
 * @param DashModifier:num
 * @text Dash Modifier
 * @parent Dash
 * @desc Alters the dash speed modifier.
 * @default +1.0
 *
 * @param EnableDashTilt:eval
 * @text Enable Dash Tilt?
 * @parent Dash
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Tilt any sprites that are currently dashing?
 * @default true
 *
 * @param TiltLeft:num
 * @text Tilt Left Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving left (upper left, left, lower left).
 * @default -0.15
 *
 * @param TiltRight:num
 * @text Tilt Right Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving right (upper right, right, lower right).
 * @default 0.15
 *
 * @param TiltVert:num
 * @text Tilt Vertical Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving vertical (up, down).
 * @default 0.05
 *
 * @param Shadows
 *
 * @param ShowShadows:eval
 * @text Show
 * @parent Shadows
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show shadows on all events and player-related sprites.
 * @default true
 *
 * @param DefaultShadow:str
 * @text Default Filename
 * @parent Shadows
 * @type file
 * @dir img/system/
 * @desc Default filename used for shadows found in img/system/ folder.
 * @default Shadow1
 *
 * @param TurnInPlace
 * @text Turn in Place
 *
 * @param EnableTurnInPlace:eval
 * @text Enable
 * @parent TurnInPlace
 * @type boolean
 * @on Turn in Place
 * @off Skip
 * @desc When not dashing, player will turn in place before moving.
 * This only applies with keyboard inputs.
 * @default false
 *
 * @param TurnInPlaceDelay:num
 * @text Delay in Frames
 * @parent TurnInPlace
 * @type number
 * @min 0
 * @desc The number of frames to wait before moving.
 * @default 10
 *
 * @param Vehicle
 * @text Vehicle Speeds
 *
 * @param BoatSpeed:num
 * @text Boat Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the boat vehicle.
 * @default 4.0
 *
 * @param ShipSpeed:num
 * @text Ship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the ship vehicle.
 * @default 5.0
 *
 * @param AirshipSpeed:num
 * @text Airship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the airship vehicle.
 * @default 6.0
 *
 */
/* ----------------------------------------------------------------------------
 * Region Rulings
 * ----------------------------------------------------------------------------
 */
/*~struct~Region:
 *
 * @param Allow
 * @text Allow Regions
 *
 * @param AllAllow:arraynum
 * @text All Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkAllow:arraynum
 * @text Walk Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerAllow:arraynum
 * @text Player Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventAllow:arraynum
 * @text Event Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleAllow:arraynum
 * @text Vehicle Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatAllow:arraynum
 * @text Boat Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipAllow:arraynum
 * @text Ship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipAllow:arraynum
 * @text Airship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Forbid
 * @text Forbid Regions
 *
 * @param AllForbid:arraynum
 * @text All Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkForbid:arraynum
 * @text Walk Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerForbid:arraynum
 * @text Player Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventForbid:arraynum
 * @text Event Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleForbid:arraynum
 * @text Vehicle Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where vehicles cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatForbid:arraynum
 * @text Boat Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipForbid:arraynum
 * @text Ship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipForbid:arraynum
 * @text Airship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Dock
 * @text Dock Regions
 *
 * @param VehicleDock:arraynum
 * @text Vehicle Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDock:arraynum
 * @text Boat Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent BoatDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Boats can only dock at designated regions.
 * @default false
 *
 * @param ShipDock:arraynum
 * @text Ship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent ShipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Ships can only dock at designated regions.
 * @default false
 *
 * @param AirshipDock:arraynum
 * @text Airship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent AirshipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Airships can only dock at designated regions.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Region Common Events
 * ----------------------------------------------------------------------------
 */
/*~struct~RegionCommonEvent:
 *
 * @param Region1:num
 * @text Region 1
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region2:num
 * @text Region 2
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region3:num
 * @text Region 3
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region4:num
 * @text Region 4
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region5:num
 * @text Region 5
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region6:num
 * @text Region 6
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region7:num
 * @text Region 7
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region8:num
 * @text Region 8
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region9:num
 * @text Region 9
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region10:num
 * @text Region 10
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region11:num
 * @text Region 11
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region12:num
 * @text Region 12
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region13:num
 * @text Region 13
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region14:num
 * @text Region 14
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region15:num
 * @text Region 15
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region16:num
 * @text Region 16
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region17:num
 * @text Region 17
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region18:num
 * @text Region 18
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region19:num
 * @text Region 19
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region20:num
 * @text Region 20
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region21:num
 * @text Region 21
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region22:num
 * @text Region 22
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region23:num
 * @text Region 23
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region24:num
 * @text Region 24
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region25:num
 * @text Region 25
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region26:num
 * @text Region 26
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region27:num
 * @text Region 27
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region28:num
 * @text Region 28
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region29:num
 * @text Region 29
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region30:num
 * @text Region 30
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region31:num
 * @text Region 31
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region32:num
 * @text Region 32
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region33:num
 * @text Region 33
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region34:num
 * @text Region 34
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region35:num
 * @text Region 35
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region36:num
 * @text Region 36
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region37:num
 * @text Region 37
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region38:num
 * @text Region 38
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region39:num
 * @text Region 39
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region40:num
 * @text Region 40
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region41:num
 * @text Region 41
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region42:num
 * @text Region 42
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region43:num
 * @text Region 43
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region44:num
 * @text Region 44
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region45:num
 * @text Region 45
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region46:num
 * @text Region 46
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region47:num
 * @text Region 47
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region48:num
 * @text Region 48
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region49:num
 * @text Region 49
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region50:num
 * @text Region 50
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region51:num
 * @text Region 51
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region52:num
 * @text Region 52
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region53:num
 * @text Region 53
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region54:num
 * @text Region 54
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region55:num
 * @text Region 55
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region56:num
 * @text Region 56
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region57:num
 * @text Region 57
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region58:num
 * @text Region 58
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region59:num
 * @text Region 59
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region60:num
 * @text Region 60
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region61:num
 * @text Region 61
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region62:num
 * @text Region 62
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region63:num
 * @text Region 63
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region64:num
 * @text Region 64
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region65:num
 * @text Region 65
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region66:num
 * @text Region 66
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region67:num
 * @text Region 67
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region68:num
 * @text Region 68
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region69:num
 * @text Region 69
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region70:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region71:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region72:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region73:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region74:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region75:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region76:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region77:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region78:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region79:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 90
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 91
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 92
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 93
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 94
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 95
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 96
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 97
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 98
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 99
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region100:num
 * @text Region 100
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region101:num
 * @text Region 101
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region102:num
 * @text Region 102
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region103:num
 * @text Region 103
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region104:num
 * @text Region 104
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region105:num
 * @text Region 105
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region106:num
 * @text Region 106
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region107:num
 * @text Region 107
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region108:num
 * @text Region 108
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region109:num
 * @text Region 109
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region110:num
 * @text Region 110
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region111:num
 * @text Region 111
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region112:num
 * @text Region 112
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region113:num
 * @text Region 113
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region114:num
 * @text Region 114
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region115:num
 * @text Region 115
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region116:num
 * @text Region 116
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region117:num
 * @text Region 117
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region118:num
 * @text Region 118
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region119:num
 * @text Region 119
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region120:num
 * @text Region 120
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region121:num
 * @text Region 121
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region122:num
 * @text Region 122
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region123:num
 * @text Region 123
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region124:num
 * @text Region 124
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region125:num
 * @text Region 125
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region126:num
 * @text Region 126
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region127:num
 * @text Region 127
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region128:num
 * @text Region 128
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region129:num
 * @text Region 129
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region130:num
 * @text Region 130
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region131:num
 * @text Region 131
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region132:num
 * @text Region 132
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region133:num
 * @text Region 133
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region134:num
 * @text Region 134
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region135:num
 * @text Region 135
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region136:num
 * @text Region 136
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region137:num
 * @text Region 137
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region138:num
 * @text Region 138
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region139:num
 * @text Region 139
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region140:num
 * @text Region 140
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region141:num
 * @text Region 141
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region142:num
 * @text Region 142
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region143:num
 * @text Region 143
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region144:num
 * @text Region 144
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region145:num
 * @text Region 145
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region146:num
 * @text Region 146
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region147:num
 * @text Region 147
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region148:num
 * @text Region 148
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region149:num
 * @text Region 149
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region150:num
 * @text Region 150
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region151:num
 * @text Region 151
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region152:num
 * @text Region 152
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region153:num
 * @text Region 153
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region154:num
 * @text Region 154
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region155:num
 * @text Region 155
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region156:num
 * @text Region 156
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region157:num
 * @text Region 157
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region158:num
 * @text Region 158
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region159:num
 * @text Region 159
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region160:num
 * @text Region 160
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region161:num
 * @text Region 161
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region162:num
 * @text Region 162
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region163:num
 * @text Region 163
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region164:num
 * @text Region 164
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region165:num
 * @text Region 165
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region166:num
 * @text Region 166
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region167:num
 * @text Region 167
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region168:num
 * @text Region 168
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region169:num
 * @text Region 169
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region170:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region171:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region172:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region173:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region174:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region175:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region176:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region177:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region178:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region179:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 190
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 191
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 192
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 193
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 194
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 195
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 196
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 197
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 198
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 199
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region200:num
 * @text Region 200
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region201:num
 * @text Region 201
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region202:num
 * @text Region 202
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region203:num
 * @text Region 203
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region204:num
 * @text Region 204
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region205:num
 * @text Region 205
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region206:num
 * @text Region 206
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region207:num
 * @text Region 207
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region208:num
 * @text Region 208
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region209:num
 * @text Region 209
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region210:num
 * @text Region 210
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region211:num
 * @text Region 211
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region212:num
 * @text Region 212
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region213:num
 * @text Region 213
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region214:num
 * @text Region 214
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region215:num
 * @text Region 215
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region216:num
 * @text Region 216
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region217:num
 * @text Region 217
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region218:num
 * @text Region 218
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region219:num
 * @text Region 219
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region220:num
 * @text Region 220
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region221:num
 * @text Region 221
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region222:num
 * @text Region 222
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region223:num
 * @text Region 223
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region224:num
 * @text Region 224
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region225:num
 * @text Region 225
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region226:num
 * @text Region 226
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region227:num
 * @text Region 227
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region228:num
 * @text Region 228
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region229:num
 * @text Region 229
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region230:num
 * @text Region 230
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region231:num
 * @text Region 231
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region232:num
 * @text Region 232
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region233:num
 * @text Region 233
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region234:num
 * @text Region 234
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region235:num
 * @text Region 235
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region236:num
 * @text Region 236
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region237:num
 * @text Region 237
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region238:num
 * @text Region 238
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region239:num
 * @text Region 239
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region240:num
 * @text Region 240
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region241:num
 * @text Region 241
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region242:num
 * @text Region 242
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region243:num
 * @text Region 243
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region244:num
 * @text Region 244
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region245:num
 * @text Region 245
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region246:num
 * @text Region 246
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region247:num
 * @text Region 247
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region248:num
 * @text Region 248
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region249:num
 * @text Region 249
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region250:num
 * @text Region 250
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region251:num
 * @text Region 251
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region252:num
 * @text Region 252
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region253:num
 * @text Region 253
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region254:num
 * @text Region 254
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region255:num
 * @text Region 255
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Terrain Tag Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TerrainTag:
 *
 * @param TerrainTag
 * @text Terrain Tag ID's
 *
 * @param Rope:num
 * @text Rope
 * @parent TerrainTag
 * @type number
 * @min 0
 * @max 7
 * @desc Which terrain tag number to use for ropes?
 * @default 1
 *
 */
/* ----------------------------------------------------------------------------
 * VisuStella 8-Dir Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~VS8:
 *
 * @param Balloons
 * @text Balloon Icon Settings
 *
 * @param AutoBalloon:eval
 * @text Auto-Balloon Poses
 * @parent Balloons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically pose VS8 sprites when using balloon icons.
 * @default true
 *
 * @param BalloonOffsetX:num
 * @text Balloon Offset X
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by x pixels.
 * @default 0
 *
 * @param BalloonOffsetY:num
 * @text Balloon Offset Y
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by y pixels.
 * @default 10
 *
 * @param Icons
 * 
 * @param AutoBuffer:eval
 * @text Auto Buffer
 * @parent Icons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically buffer the X and Y coordinates of
 * VS8 sprites?
 * @default true
 * 
 * @param CarryPose:eval
 * @text Use Carry Pose
 * @parent Icons
 * @type boolean
 * @on Carry Pose
 * @off Normal
 * @desc Use the carry pose when moving with an icon overhead.
 * @default true
 *
 */
//=============================================================================

const _0x5ae7=['SZzYt','TargetSwitchId','version','Map%1-Event%2','Game_Event_clearPageSettings','getMapSpawnedEventData','MUSICNOTE','disable','isNearTheScreen','_stepPattern','FavorHorz','isPassableByAnyDirection','deleteSavedEventLocationKey','turnLeft90','ShipSpeed','backY','VehicleForbid','page','Game_Map_events','dlSzd','VisibleEventLabels','setMoveRoute','_forceCarrying','Game_Player_checkEventTriggerThere','width','_commonEvents','OperateValues','Game_Character_processMoveCommand','processMoveSynchRandom','Nvtuy','createLowerLayer','DEiTM','Scene_Boot_onDatabaseLoaded','AutoBalloon','charAt','Visible','HXOPH','_counter','deletePreservedMorphEventDataKey','Hidden','Game_CharacterBase_moveDiagonally','bitmap','%1Allow','_labelWindow','kGKRV','_erased','string','BalloonOffsetY','code','default','Game_Interpreter_PluginCommand','eventLabelsVisible','variables','getEventIconIndex','VisuMZ_2_DragonbonesUnion','Sprite_Balloon_updatePosition','_eventIconSprite','aiqcI','contents','KZNyi','Game_CharacterBase_canPass','createSpawnedEventWithData','Game_Event_initialize','posEventsMoveCore','isSaveEventLocations','TwpYs','LIGHT\x20BULB','reverse\x20mimic','Sprite_Character_update','contentsOpacity','name','opacity','autoEventIconBuffer','jumpHeight','template','_filename','Game_Troop_meetsConditionsCPC','PlayerIconChange','deltaYFrom','characterIndex','selfValue','ANGER','column','clearDashing','initEventsMoveCoreEffects','UceCE','AllAllow','_eventSpawnData','YkyiV','switch2Valid','meetsSwitchCondition','Game_Map_update','randomInt','_characterName','PlayerMovementDiagonal','setMoveSpeed','getPosingCharacterIndex','setImage','canPass','right','JbcPt','initialize','setupCopyEvent','GIufp','setFrame','getPlayerDiagonalSetting','setPlayerControlDisable','BalloonOffsetX','Game_CharacterBase_isDashing','distance','forceMoveRoute','process_VisuMZ_EventsMoveCore_LoadTemplateMaps','_type','MapID','setupSpawn','JSlRN','mDmAA','_encounterEffectDuration','setBackgroundType','removeTemporaryMapSpawnedEvents','getInputDir8','Game_Switches_setValue','USER-DEFINED\x202','TRUE','initEventsMoveCoreSettings','backX','Step2Preserve','TfMax','oEGiL','FWbDx','turnTowardCharacter','jump','filename','RegionTouch','RlZPT','restoreSavedEventPosition','USER-DEFINED\x204','isAirship','isPassable','forceCarrying','variableValid','ReMio','isOnLadder','moveStraight','absDistance','getPreservedMorphEventData','All','shadowX','Game_Message_add','turnAwayFromPoint','SpawnEventDespawnEverything','clearPageSettings','_eventCache','_spawnData','increaseSteps','startMessage','_character','mimic','EventID','isSpriteVS8dir','Dock','characterPatternYVS8','hasEventIcon','fKrCw','PlayerIconDelete','eDZUA','ajPWY','oKPqw','Game_CharacterBase_update','_eventMorphData','_inputTime','HJqvH','_selfEvent','$callEventMap','_selfTarget','StopAutoMoveEvents','isPosing','QfOFr','igGqi','TCXMc','despawnEverything','clearSpriteOffsets','Scene_Load_onLoadSuccess','processMoveRouteBalloon','isSupportDiagonalMovement','itemPadding','bfvDJ','executeMoveDir8','PreloadedMaps','JrZCe','POcJV','_pageIndex','jkpXL','BSgGX','kMYYt','_patternLocked','isAutoBufferIcon','custom','updatePeriodicRefresh','_text','updateWaitMode','advancedValue','constructor','HMPH','NVLuJ','Spriteset_Map_createShadow','zmIkV','Game_CharacterBase_moveStraight','processMoveRouteJumpToCharacter','random','isSelfVariable','CarryPose','dfrpz','Value','loadCPC','bufferY','Game_Troop_meetsConditions','processMoveRouteStepToCharacter','lineHeight','RegionOk','PageId','_saveEventLocation','SCREEN','DoFNz','findDirectionTo','XLHGl','RIGHT\x20TO\x20LEFT','eventsXyNt','isPlaytest','includes','moveDiagonally','jzHLH','createCharacterShadow','moveSynchType','STRUCT','Step1MapId','_interpreter','KNEEL','despawnRegions','PUBVA','setup','updatePattern','clear','tWeDb','StrictCollision','USER-DEFINED\x205','Step1EventId','RIGHT','updateMove','getSavedEventLocation','XnFqr','_dragonbones','isrTn','JjyyX','mmUFG','fKBfj','Game_Event_refresh','hasClickTrigger','TkIee','CPC','OgkcU','BKNxx','forceDashing','VisuMZ_Setup_Preload_Map','_lastPluginCommandInterpreter','_needsRefresh','$preloadedMap_%1','toLowerCase','arDny','Game_Event_event','setupEvents','wmvOV','getDirectionFromPoint','reverse','isTargetEventValidForLabelWindow','TWlqG','processMoveRouteStepFrom','BtlfW','isShip','processMoveRouteAnimation','szZVQ','deleteSavedEventLocation','Game_Temp_setDestination','processMoveSynchMirrorVert','ylcMQ','EnableDashTilt','YvQdd','startMapCommonEventOnOK','VS8','_trigger','processMoveCommandEventsMoveCore','PreSpawnJS','fontSize','SWEAT','Stop','Game_SelfSwitches_setValue','_needsPeriodicRefresh','setAllowEventAutoMovement','remove','Boat','createSaveEventLocationData','boat','delay','_spawnedEvents','executeMove','Walk','canPassDiagonally','JQUaI','EventAllow','VZBid','EventLabelRefresh','splice','updateRoutineMove','Game_CharacterBase_initMembers','MoveAllSynchTargets','canMove','EXCLAMATION','DVmhp','activationProximityType','AXYCI','processMoveSynchMirrorHorz','hasStepAnime','LIGHTBULB','JRddw','DPuxx','_addedHitbox','uvLlU','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','processMoveRouteStepToPlayer','Game_Event_findProperPageIndex','loQhT','isSaveEventLocation','ARRAYFUNC','setSelfValue','AutoMoveEvents','clearEventCache','key','setupPageSettings','StopAutoMoveMessages','_pattern','_regionRules','isTurnInPlace','yjUIp','createLabelWindows','processMoveSynchReverseMimic','exit','parallelCommonEvents','checkSmartEventCollision','Game_Player_isMapPassable','isAdvancedVariable','map','PreloadMaps','MUSIC\x20NOTE','isDestinationValid','_activationProximityAutoTriggerBypass','JquHr','createSpawnedEvent','initMoveSpeed','bufferX','turnRight90','Game_Event_updateParallel','clearCarrying','XXcVJ','Game_CharacterBase_screenY','CRcwW','bind','_EventsMoveCoreSettings','frontY','TiltVert','jOUmK','setEventIconData','_commonEventId','MessageCore','zQTKW','deltaX','PostCopyJS','GPYed','SPIN\x20COUNTERCLOCKWISE','trigger','CallEvent','IconBufferX','isInVehicle','roundX','PlayerForbid','LKgnS','WRcOp','loadSystem','_labelWindows','createContents','erase','onClickTrigger','call','autosaveEventLocation','ARRAYJSON','Window_ScrollText_startMessage','IconBufferY','oUKpc','WalkForbid','isOnRope','kFUzP','qkjbo','SILENCE','EventLabelVisible','flQBL','shadowY','timer','Game_Interpreter_updateWaitMode','moveTowardCharacter','TerrainTag','hasCPCs','List','UNTITLED','prepareSpawnedEventAtXY','updatePosition','EventTemplates','indexOf','correctFacingDirection','processMoveRouteFadeOut','CASbk','saveEventLocation','deleteEventLocation','AauGu','rotation','checkActivationProximity','checkEventTriggerHere','refresh','dsPEN','activationRegionList','canStartLocalEvents','_MapSpawnedEventData','Game_Vehicle_initMoveSpeed','_saveEventLocations','findTargetSprite','PostMorphJS','checkValidEventerMap','left','setOpacity','_waitMode','ship','Allow','checkEventTriggerThere','Label','lastSpawnedEventID','regionList','zYeRN','startCallEvent','checkNeedForPeriodicRefresh','trim','textSizeEx','createLabelWindowForTarget','%1%2','log','isMoveOnlyRegionPassable','SwitchGetSelfSwitchID','checkEventsMoveCoreStringTags','switchId','lLOpu','iconIndex','initMembersEventsMoveCore','screenX','isAirshipPassable','IGnns','visibleRange','floor','isCollidedWithEvents','SpawnEventDespawnRegions','onDatabaseLoaded','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','CPCsMet','status','PQMmM','oXhUk','FhfMP','_poseDuration','processMoveRouteMoveUntilStop','execute','IbjOc','_PlayerDiagonalSetting','_characterSprites','dashSpeedModifier','characterPatternY','Map%1.json','AdvancedSwitches','posNt','setEventLabelsVisible','LKXJb','Game_CharacterBase_hasStepAnime','offsetX','visible','checkEventTriggerAuto','deltaY','nrUqM','createIconSprite','_scene','ELpiZ','event','eventsXy','iconWidth','front','format','region','updateEventsMoveCoreTagChanges','Game_Event_meetsConditions','Game_CharacterBase_screenX','WFozz','SLEEP','Letter','away','mOiIA','DKmAu','dVyTp','gHtqC','Sprite_Character_characterPatternY','reverseDir','OffsetY','SpawnEventDespawnAtXY','copy','_SavedEventLocations','createShadows','SPIN\x20CLOCKWISE','USER-DEFINED\x203','drawTextEx','COBWEB','morphInto','despawnAtXY','getSelfTarget','mirror\x20vertical','_clickTrigger','VisuMZ_1_MessageCore','innerWidth','FALSE','slice','setValue','isBigCharacter','_spriteset','PySbk','processMoveRouteJumpTo','NSkVC','_advancedSwitchVariable','hasDragonbones','Game_CharacterBase_characterIndex','JSON','sZDWC','useCarryPoseForIcons','ptFqa','_duration','CIdWD','kvbBO','WJVut','PreMorphJS','pattern','padZero','processMoveRouteFadeIn','drawIcon','EventsMoveCore','processMoveSynchAway','locate','wKKFB','VICTORY','TIPic','conditions','isJumping','Game_Map_setupEvents','_moveSynch','Operation','turn180','variableId','_target','_DisablePlayerControl','iconHeight','Game_CharacterBase_updatePattern','EnableTurnInPlace','oLVcP','isDashDisabled','_pose','processMoveCommand','PXcsc','_lastMovedDirection','Sprite_Balloon_setup','%1DockRegionOnly','events','_characterIndex','bYqkG','_eventOverload','max','NUM','HEART','Settings','makeDeepCopy','characterIndexVS8','MorphEventRemove','MUSIC-NOTE','isAdvancedSwitch','isAllowCharacterTilt','PosX','CustomPageConditions','processMoveRouteJumpForward','processMoveSynchMimic','Scene_Map_startEncounterEffect','AdvancedVariables','_callEventData','mirror\x20horz','down','moveRouteIndex','WalkAllow','LineHeight','description','_diagonalSupport','firstSpawnedEventID','setupEventsMoveCoreEffects','Game_Player_getInputDirection','searchLimit','NOTE','PreCopyJS','ckWeL','prototype','updateEventIconSprite','_callEventMap','_hidden','Game_CharacterBase_setDirection','registerCommand','BLyVF','BufferY','Disable','match','VXsqP','player','blendMode','SwitchGetSelfSwitchABCD','_event','setPlayerDiagonalSetting','_transparent','updateSelfMovement','MorphEventTo','parent','approach','isDashing','vehicle','setupSpawnedEvents','_CPCs','processMoveRouteSelfVariable','min','findProperPageIndex','hvopZ','_mapId','ARRAYEVAL','Game_CharacterBase_realMoveSpeed','requestRefresh','processMoveRouteMoveRepeat','DashEnableToggle','ZYpnv','jEvsv','Sprite_Character_initMembers','parse','resetFontSettings','isRegionForbidPass','switch1Id','%1Forbid','Game_CharacterBase_direction','moveAwayFromPoint','_forceDashing','_shadowGraphic','tMgij','_eventId','eraseEvent','windowPadding','Window_Message_startMessage','Region%1','none','zoomScale','hhpPH','processMoveRouteSelfSwitch','DefaultShadow','aQJnB','SPIN\x20CCW','meetActivationProximityConditions','HURT','initMembers','eqlPM','jyYfg','pluginCommandCallEvent','Game_Map_event','bQeqH','_moveRouteIndex','MapId','DashingEnable','startEncounterEffect','text','isLabelVisible','Game_Event_setupPageSettings','isEventRunning','Game_Variables_value','Movement','isDiagonalDirection','MULTIPLY','mirror\x20horizontal','IconIndex','QUESTION','QxzCS','Vehicle','FXxlB','add','shadowFilename','dmSIV','Setting','isBattleTest','Direction','hideShadows','isMapPassable','PazkW','Step2EventId','SPIN\x20ACW','%1Dock','removeChild','isRunning','ROUTE_SCRIPT','roundY','Game_Player_checkEventTriggerHere','value','isDashingAndMoving','terrainTag','isPlayerControlDisabled','EventId','type','getEventIconData','Game_System_initialize','AirshipSpeed','_spriteOffsetY','processMoveRouteHugWall','getPose','Airship','setPattern','PosY','updateScale','SelfSwitches','processMoveRouteTeleportToCharacter','labelWindowText','processMoveSynchApproach','RWmeo','onChange','_vehicleType','_eventIcon','DiagonalSpeedMultiplier','Game_Interpreter_executeCommand','Game_Map_parallelCommonEvents','isEventTest','processMoveRouteMoveTo','ExfJI','metCPC','processMoveSynchCustom','yYvIV','ConvertParams','OpacitySpeed','deltaXFrom','eUbJi','requestBalloon','isMoving','startMapCommonEventOnTouch','height','dlVjb','HMLRM','isDashingEnabled','frameCount','Spriteset_Map_createLowerLayer','Region','Game_Player_increaseSteps','isAllowEventAutoMovement','_shadowSprite','ySCTw','Game_Character_forceMoveRoute','refreshIfNeeded','xKdxf','onLoadSuccess','DashModifier','advancedFunc','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','Forbid','setBalloonPose','bOKQT','General','note','setupDiagonalSupport','return\x200','opacitySpeed','setDirection','_EventIcons','IconBlendMode','reverse\x20copy','Game_Event_start','roundYWithDirection','EventAutoMovement','abs','iKUqn','Cvgta','isAnyEventStarting','firstSpawnedEvent','JqNDN','TiltRight','LOWER\x20RIGHT','ERROR:\x20Map\x20%1\x20has\x20not\x20been\x20preloaded\x20for\x20<Copy\x20Event>\x20usage.','isRegionDockable','executeCommand','setupSaveEventLocations','aEHZb','BoatSpeed','IconSize','some','niGqr','SwitchId','RemovePreserve','length','_data','Namoy','MWJFB','adjustDir8MovementSpeed','lastSpawnedEvent','IconSet','getPosingCharacterPattern','GdRBQ','LVWGA','savePreservedMorphEventDataKey','isPreventSelfMovement','push','spriteId','boxWidth','turnAwayFromCharacter','turnTowardPoint','getLastPluginCommandInterpreter','direction','meetActivationRegionConditions','toUpperCase','setWaitMode','offsetY','Ship','JFiFh','isRegionAllowPass','USER-DEFINED\x201','roundXWithDirection','replace','isNormalPriority','Game_SelfSwitches_value','enable','Self\x20Variable\x20%1','SpawnEventDespawnEventID','Game_Variables_setValue','frontX','pageIndex','bjuvp','PlayerMovementChange','isLandOk','SelfSwitchID','pages','updateMoveSynch','Template','isEventClickTriggered','dGCJc','processDrawIcon','XMQHL','reserveCommonEvent','deleteIconsOnEventsData','Game_Player_executeMove','BULB','prepareSpawnedEventAtRegion','emmDv','processMoveRouteStepTo','okUKR','setDestination','regionId','Game_CharacterBase_increaseSteps','isTile','addChild','Game_Map_isDashDisabled','iRbxM','isShadowVisible','morphIntoTemplate','updateParallel','updateVS8BalloonOffsets','airship','meetsCPC','updateShadowChanges','jHPyY','despawnEventId','NORMAL','getInputDirection','cfqxL','isSelfSwitch','labelWindowRange','pageId','EVAL','_eventOverloadThreshold','Game_Map_setup','COLLAPSE','Game_Player_isDashing','XVGYw','updateShadow','clamp','qZref','concat','resizeWindow','spawnEventId','AMNUq','SelfVariables','NPUJW','start','uMcCz','setupMorphEvent','processMoveRouteSetIndex','_cpc','processMoveRouteMoveToCharacter','Self\x20Switch\x20%1','udTVg','_moveRoute','CNkPg','BufferX','list','GetMoveSynchTarget','setDashingEnabled','Game_Switches_value','dir8','vVzqx','lastMovedDirection','Game_Vehicle_isLandOk','pdAhc','moveSynchTarget','setupChild','Game_Vehicle_isMapPassable','ToeLH','yrUBA','cJOTB','moveTowardPoint','eventId','Game_CharacterBase_pattern','rBisq','processMoveRoutePatternLock','determineEventOverload','KMdtN','UwVvc','_periodicRefreshTimer','isBusy','mapId','PostSpawnJS','command357','screenY','Name','isValid','yvEjY','uqndY','xpCLy','kuCww','blt','updatePatternEventsMoveCore','FastForwardKey','clearSelfTarget','checkEventTriggerEventsMoveCore','shiftY','rXIuH','setupEventsMoveCoreCommentTags','XtHxQ','getDirectionToPoint','Game_Event_updateSelfMovement','PlayerAllow','realMoveSpeed','isEventOverloaded','hasMoveOnlyRegions','Game_Character_setMoveRoute','HeULI','FfNxh','updateTilt','vert\x20mirror','Passability','checkAdvancedSwitchVariablePresent','update','VariableGetSelfVariableID','ISiUm','wdGSA','processMoveSynch','_eventCopyData','TemplateName','activationProximityDistance','iQPcI','_spawnPreserved','ADDITIVE','updatePose','meetsConditions','updateText','SpawnEventAtXY','Game_Map_refresh','EventForbid','OFF','Game_Event_checkEventTriggerAuto','_PreservedEventMorphData','_opacity','getPosingCharacterDirection','scale','KUsJF','destinationX','clearStepPattern','_alwaysUpdateMove','startMapCommonEventOnOKTarget','puZlf','clearDestination','Game_Enemy_meetsSwitchCondition','hasAdvancedSwitchVariable','requestAnimation','Game_Event_meetsConditionsCPC','Toggle','pos','DOWN','_shadowOpacity','LEFT','oHVlt','EnableDir8','Uyeui','_moveOnlyRegions','VehicleDock','setupEventsMoveCoreNotetags','target','Collision','SlowerSpeed','VehicleAllow','registerSelfTarget','_moveSpeed','SPIN\x20ANTICLOCKWISE','Game_CommonEvent_isActive','command108','updateOpacity','_spriteOffsetX','Enable','fIKKa','ARRAYNUM','row','process_VisuMZ_EventsMoveCore_Switches_Variables','parameters','filter','IeUge','setEventIconDataKey','round','Rtzlu','EventIconDelete','initEventsMoveCore','iwFmb','processMoveRouteTeleportTo','ANNOYED','anchor','fYzpb','VariableId','registerSelfEvent','setupRegionRestrictions','isBoat','LOVE','RfyWx','iconSize','defaultFontSize','Player','findDiagonalDirectionTo','_tilemap','loadDataFile','OffsetX','EventLocationSave','setDiagonalDirection','horz\x20mirror','dcOnv','IFjZS','checkRegionEventTrigger','return\x20%1','clearPose','setPose','switches','ARRAYSTR','setLastPluginCommandInterpreter','ZZZ','EventLocationDelete','_activationProximity','determineCommonEventsWithCPC','HmmbJ','removeMorph','Icon','Step2MapId','isShadowShrink'];(function(_0x44ec15,_0x5ae777){const _0x3ac227=function(_0x83db2){while(--_0x83db2){_0x44ec15['push'](_0x44ec15['shift']());}};_0x3ac227(++_0x5ae777);}(_0x5ae7,0x76));const _0x3ac2=function(_0x44ec15,_0x5ae777){_0x44ec15=_0x44ec15-0x0;let _0x3ac227=_0x5ae7[_0x44ec15];return _0x3ac227;};var label=_0x3ac2('0x1b4'),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x3ac2('0x393')](function(_0x56e9a0){return _0x56e9a0[_0x3ac2('0x15f')]&&_0x56e9a0['description']['includes']('['+label+']');})[0x0];VisuMZ[label][_0x3ac2('0x1d5')]=VisuMZ[label][_0x3ac2('0x1d5')]||{},VisuMZ[_0x3ac2('0x279')]=function(_0x5256fa,_0x1b1acd){for(const _0x3263a2 in _0x1b1acd){if(_0x3ac2('0x2f')===_0x3ac2('0x2f')){if(_0x3263a2[_0x3ac2('0x1fa')](/(.*):(.*)/i)){const _0x26c241=String(RegExp['$1']),_0xd6cdd4=String(RegExp['$2'])['toUpperCase']()[_0x3ac2('0x149')]();let _0x113867,_0x2a8ebf,_0x394632;switch(_0xd6cdd4){case _0x3ac2('0x1d3'):_0x113867=_0x1b1acd[_0x3263a2]!==''?Number(_0x1b1acd[_0x3263a2]):0x0;break;case _0x3ac2('0x38f'):_0x2a8ebf=_0x1b1acd[_0x3263a2]!==''?JSON[_0x3ac2('0x217')](_0x1b1acd[_0x3263a2]):[],_0x113867=_0x2a8ebf['map'](_0x1b5e19=>Number(_0x1b5e19));break;case _0x3ac2('0x302'):_0x113867=_0x1b1acd[_0x3263a2]!==''?eval(_0x1b1acd[_0x3263a2]):null;break;case _0x3ac2('0x20f'):_0x2a8ebf=_0x1b1acd[_0x3263a2]!==''?JSON[_0x3ac2('0x217')](_0x1b1acd[_0x3263a2]):[],_0x113867=_0x2a8ebf['map'](_0x10d383=>eval(_0x10d383));break;case _0x3ac2('0x1a7'):_0x113867=_0x1b1acd[_0x3263a2]!==''?JSON[_0x3ac2('0x217')](_0x1b1acd[_0x3263a2]):'';break;case _0x3ac2('0x113'):_0x2a8ebf=_0x1b1acd[_0x3263a2]!==''?JSON[_0x3ac2('0x217')](_0x1b1acd[_0x3263a2]):[],_0x113867=_0x2a8ebf[_0x3ac2('0xe8')](_0x36996f=>JSON[_0x3ac2('0x217')](_0x36996f));break;case'FUNC':_0x113867=_0x1b1acd[_0x3263a2]!==''?new Function(JSON[_0x3ac2('0x217')](_0x1b1acd[_0x3263a2])):new Function(_0x3ac2('0x298'));break;case _0x3ac2('0xd6'):_0x2a8ebf=_0x1b1acd[_0x3263a2]!==''?JSON[_0x3ac2('0x217')](_0x1b1acd[_0x3263a2]):[],_0x113867=_0x2a8ebf['map'](_0x17defc=>new Function(JSON[_0x3ac2('0x217')](_0x17defc)));break;case'STR':_0x113867=_0x1b1acd[_0x3263a2]!==''?String(_0x1b1acd[_0x3263a2]):'';break;case _0x3ac2('0x3b6'):_0x2a8ebf=_0x1b1acd[_0x3263a2]!==''?JSON[_0x3ac2('0x217')](_0x1b1acd[_0x3263a2]):[],_0x113867=_0x2a8ebf[_0x3ac2('0xe8')](_0xa0027b=>String(_0xa0027b));break;case _0x3ac2('0x74'):_0x394632=_0x1b1acd[_0x3263a2]!==''?JSON[_0x3ac2('0x217')](_0x1b1acd[_0x3263a2]):{},_0x5256fa[_0x26c241]={},VisuMZ[_0x3ac2('0x279')](_0x5256fa[_0x26c241],_0x394632);continue;case'ARRAYSTRUCT':_0x2a8ebf=_0x1b1acd[_0x3263a2]!==''?JSON[_0x3ac2('0x217')](_0x1b1acd[_0x3263a2]):[],_0x113867=_0x2a8ebf[_0x3ac2('0xe8')](_0x5b88c1=>VisuMZ['ConvertParams']({},JSON[_0x3ac2('0x217')](_0x5b88c1)));break;default:continue;}_0x5256fa[_0x26c241]=_0x113867;}}else{function _0x8294e2(){return this[_0x3ac2('0xf3')]();}}}return _0x5256fa;},(_0x107e58=>{const _0x22122a=_0x107e58[_0x3ac2('0x407')];for(const _0x626ab7 of dependencies){if(!Imported[_0x626ab7]){alert(_0x3ac2('0x291')[_0x3ac2('0x17d')](_0x22122a,_0x626ab7)),SceneManager[_0x3ac2('0xe3')]();break;}}const _0x32fe1d=_0x107e58[_0x3ac2('0x1e8')];if(_0x32fe1d[_0x3ac2('0x1fa')](/\[Version[ ](.*?)\]/i)){const _0x5da1dc=Number(RegExp['$1']);if(_0x5da1dc!==VisuMZ[label][_0x3ac2('0x3c3')]){if(_0x3ac2('0x307')!==_0x3ac2('0x307')){function _0x5cd3bb(){if(!_0x34ae80['prototype']['canPass'][_0x3ac2('0x111')](this,_0x44a37+_0x2b21f0,_0xaa5e71+_0x429a1e,_0x5af301))return![];}}else alert(_0x3ac2('0x15d')[_0x3ac2('0x17d')](_0x22122a,_0x5da1dc)),SceneManager[_0x3ac2('0xe3')]();}}if(_0x32fe1d[_0x3ac2('0x1fa')](/\[Tier[ ](\d+)\]/i)){const _0x391dc1=Number(RegExp['$1']);if(_0x391dc1<tier)alert(_0x3ac2('0xd1')[_0x3ac2('0x17d')](_0x22122a,_0x391dc1,tier)),SceneManager[_0x3ac2('0xe3')]();else{if(_0x3ac2('0x20d')===_0x3ac2('0x20d'))tier=Math['max'](_0x391dc1,tier);else{function _0x4db41a(){this[_0x3ac2('0x211')](),this[_0x3ac2('0x333')]=0x3c;}}}}VisuMZ[_0x3ac2('0x279')](VisuMZ[label][_0x3ac2('0x1d5')],_0x107e58[_0x3ac2('0x392')]);})(pluginData),VisuMZ[_0x3ac2('0x3db')]=function(_0x303ed9,_0x4e358b,_0x48cb2e){switch(_0x48cb2e){case'=':return _0x4e358b;break;case'+':return _0x303ed9+_0x4e358b;break;case'-':return _0x303ed9-_0x4e358b;break;case'*':return _0x303ed9*_0x4e358b;break;case'/':return _0x303ed9/_0x4e358b;break;case'%':return _0x303ed9%_0x4e358b;break;}return _0x303ed9;},PluginManager[_0x3ac2('0x1f6')](pluginData[_0x3ac2('0x407')],_0x3ac2('0xd8'),_0x5e229f=>{VisuMZ[_0x3ac2('0x279')](_0x5e229f,_0x5e229f);switch(_0x5e229f[_0x3ac2('0x5f')]){case _0x3ac2('0x141'):$gameSystem[_0x3ac2('0xb3')](!![]);break;case _0x3ac2('0xb0'):$gameSystem['setAllowEventAutoMovement'](![]);break;case _0x3ac2('0x377'):$gameSystem['setAllowEventAutoMovement'](!$gameSystem[_0x3ac2('0x288')]());break;}}),PluginManager['registerCommand'](pluginData[_0x3ac2('0x407')],_0x3ac2('0x105'),_0x1e36b9=>{VisuMZ[_0x3ac2('0x279')](_0x1e36b9,_0x1e36b9);const _0xf51bc3={'mapId':_0x1e36b9[_0x3ac2('0x236')],'eventId':_0x1e36b9[_0x3ac2('0x25c')],'pageId':_0x1e36b9[_0x3ac2('0x66')]};if(_0xf51bc3[_0x3ac2('0x335')]<=0x0)_0xf51bc3[_0x3ac2('0x335')]=$gameMap?$gameMap[_0x3ac2('0x335')]():0x1;$gameTemp[_0x3ac2('0x2c5')]()[_0x3ac2('0x232')](_0xf51bc3);}),PluginManager[_0x3ac2('0x1f6')](pluginData['name'],_0x3ac2('0x213'),_0x374d70=>{VisuMZ[_0x3ac2('0x279')](_0x374d70,_0x374d70);switch(_0x374d70[_0x3ac2('0x5f')]){case _0x3ac2('0x38d'):$gameSystem[_0x3ac2('0x31e')](!![]);break;case _0x3ac2('0x1f9'):$gameSystem[_0x3ac2('0x31e')](![]);break;case _0x3ac2('0x377'):$gameSystem['setDashingEnabled'](!$gameSystem[_0x3ac2('0x283')]());break;}}),PluginManager[_0x3ac2('0x1f6')](pluginData[_0x3ac2('0x407')],'EventIconChange',_0x52c06f=>{VisuMZ[_0x3ac2('0x279')](_0x52c06f,_0x52c06f),_0x52c06f[_0x3ac2('0x236')]=_0x52c06f[_0x3ac2('0x236')]||$gameMap['mapId'](),$gameSystem[_0x3ac2('0x395')](_0x52c06f[_0x3ac2('0x236')],_0x52c06f[_0x3ac2('0x25c')],_0x52c06f[_0x3ac2('0x242')],_0x52c06f[_0x3ac2('0x106')],_0x52c06f[_0x3ac2('0x115')],_0x52c06f['IconBlendMode']);}),PluginManager[_0x3ac2('0x1f6')](pluginData[_0x3ac2('0x407')],_0x3ac2('0x398'),_0x2dcd3d=>{VisuMZ[_0x3ac2('0x279')](_0x2dcd3d,_0x2dcd3d),_0x2dcd3d[_0x3ac2('0x236')]=_0x2dcd3d[_0x3ac2('0x236')]||$gameMap[_0x3ac2('0x335')](),$gameSystem['deleteIconsOnEventsDataKey'](_0x2dcd3d[_0x3ac2('0x236')],_0x2dcd3d['EventId']);}),PluginManager['registerCommand'](pluginData[_0x3ac2('0x407')],_0x3ac2('0xc0'),_0x55a3ad=>{if($gameMap){if(_0x3ac2('0x434')===_0x3ac2('0x434'))for(const _0x3c157 of $gameMap[_0x3ac2('0x1ce')]()){_0x3c157[_0x3ac2('0x133')]();}else{function _0xf50299(){_0x26cead[_0x3ac2('0x1b4')][_0x3ac2('0x1cc')]['call'](this,_0x4f5391,_0x14a7cd),_0xe8098d[_0x3ac2('0x1b4')][_0x3ac2('0x1d5')][_0x3ac2('0xaa')][_0x3ac2('0x3e2')]&&this[_0x3ac2('0x1c1')][_0x3ac2('0x26')]['setBalloonPose'](_0x4a93d3,this[_0x3ac2('0x1ab')]);}}}}),PluginManager['registerCommand'](pluginData[_0x3ac2('0x407')],_0x3ac2('0x11c'),_0x7f7e50=>{VisuMZ[_0x3ac2('0x279')](_0x7f7e50,_0x7f7e50);switch(_0x7f7e50[_0x3ac2('0x3e4')]){case _0x3ac2('0x3e4'):$gameSystem[_0x3ac2('0x16e')](!![]);break;case _0x3ac2('0x3e8'):$gameSystem[_0x3ac2('0x16e')](![]);break;case _0x3ac2('0x377'):$gameSystem[_0x3ac2('0x16e')](!$gameSystem['eventLabelsVisible']());break;}}),PluginManager[_0x3ac2('0x1f6')](pluginData[_0x3ac2('0x407')],_0x3ac2('0x3ac'),_0x249332=>{VisuMZ[_0x3ac2('0x279')](_0x249332,_0x249332);if(!$gameMap)return;const _0x84863e=$gameMap[_0x3ac2('0x179')](_0x249332[_0x3ac2('0x25c')]);if(_0x84863e)_0x84863e[_0x3ac2('0x12d')]();}),PluginManager[_0x3ac2('0x1f6')](pluginData[_0x3ac2('0x407')],_0x3ac2('0x3b9'),_0x396fdf=>{VisuMZ[_0x3ac2('0x279')](_0x396fdf,_0x396fdf);const _0x1b8bf6=_0x396fdf[_0x3ac2('0x236')]||$gameMap[_0x3ac2('0x335')](),_0x17f54e=_0x396fdf[_0x3ac2('0x25c')];$gameSystem[_0x3ac2('0x3cd')](_0x1b8bf6,_0x17f54e);}),PluginManager['registerCommand'](pluginData[_0x3ac2('0x407')],'EventLocationCreate',_0xeb7df=>{VisuMZ[_0x3ac2('0x279')](_0xeb7df,_0xeb7df);const _0x1bfa36=_0xeb7df[_0x3ac2('0x236')]||$gameMap[_0x3ac2('0x335')](),_0x35f8ff=_0xeb7df[_0x3ac2('0x25c')]||0x1,_0x20ddf9=_0xeb7df[_0x3ac2('0x1dc')]||0x0,_0x5763a4=_0xeb7df[_0x3ac2('0x266')]||0x0,_0x34b538=_0xeb7df[_0x3ac2('0x24c')]||0x2,_0x1f46c4=((_0xeb7df[_0x3ac2('0x66')]||0x1)-0x1)[_0x3ac2('0x309')](0x0,0x13),_0x37ebf9=_0xeb7df['MoveRouteIndex']||0x0;$gameSystem['createSaveEventLocationData'](_0x1bfa36,_0x35f8ff,_0x20ddf9,_0x5763a4,_0x34b538,_0x1f46c4,_0x37ebf9);}),PluginManager[_0x3ac2('0x1f6')](pluginData[_0x3ac2('0x407')],_0x3ac2('0x1fe'),_0x2ed835=>{VisuMZ[_0x3ac2('0x279')](_0x2ed835,_0x2ed835),_0x2ed835[_0x3ac2('0x236')]=_0x2ed835['MapId']||$gameMap[_0x3ac2('0x335')]();const _0x579b60=[_0x2ed835[_0x3ac2('0x236')],_0x2ed835['EventId'],_0x2ed835[_0x3ac2('0x184')]],_0x371c79=_0x2ed835[_0x3ac2('0x3c2')],_0x5ac1ea=$gameSelfSwitches[_0x3ac2('0x258')](_0x579b60)||![];$gameSwitches[_0x3ac2('0x19e')](_0x371c79,_0x5ac1ea);}),PluginManager['registerCommand'](pluginData[_0x3ac2('0x407')],_0x3ac2('0x14f'),_0x334d0d=>{VisuMZ[_0x3ac2('0x279')](_0x334d0d,_0x334d0d),_0x334d0d['MapId']=_0x334d0d[_0x3ac2('0x236')]||$gameMap[_0x3ac2('0x335')]();const _0xdcdfc1=[_0x334d0d[_0x3ac2('0x236')],_0x334d0d['EventId'],_0x3ac2('0x317')[_0x3ac2('0x17d')](_0x334d0d[_0x3ac2('0x2b2')])],_0x2283b2=_0x334d0d[_0x3ac2('0x3c2')],_0x454250=$gameSelfSwitches[_0x3ac2('0x258')](_0xdcdfc1)||![];$gameSwitches[_0x3ac2('0x19e')](_0x2283b2,_0x454250);}),PluginManager[_0x3ac2('0x1f6')](pluginData[_0x3ac2('0x407')],_0x3ac2('0x356'),_0x7d7755=>{VisuMZ[_0x3ac2('0x279')](_0x7d7755,_0x7d7755),_0x7d7755[_0x3ac2('0x236')]=_0x7d7755['MapId']||$gameMap[_0x3ac2('0x335')]();const _0x508767=[_0x7d7755[_0x3ac2('0x236')],_0x7d7755[_0x3ac2('0x25c')],'Self\x20Variable\x20%1'[_0x3ac2('0x17d')](_0x7d7755['VariableId'])],_0x36f1a5=_0x7d7755['TargetVariableId'],_0x37db14=$gameSelfSwitches[_0x3ac2('0x258')](_0x508767)||![];$gameVariables[_0x3ac2('0x19e')](_0x36f1a5,_0x37db14);}),PluginManager[_0x3ac2('0x1f6')](pluginData[_0x3ac2('0x407')],_0x3ac2('0x203'),_0x570bd7=>{VisuMZ[_0x3ac2('0x279')](_0x570bd7,_0x570bd7);if(!$gameMap)return;const _0x2c3ed3=_0x570bd7[_0x3ac2('0x8')];_0x570bd7[_0x3ac2('0x75')]=_0x570bd7[_0x3ac2('0x75')]||$gameMap[_0x3ac2('0x335')](),_0x570bd7[_0x3ac2('0x3bf')]=_0x570bd7[_0x3ac2('0x3bf')]||$gameMap[_0x3ac2('0x335')](),_0x570bd7[_0x3ac2('0x35b')]=_0x570bd7[_0x3ac2('0x35b')]['toUpperCase']()[_0x3ac2('0x149')]();if(!_0x2c3ed3&&_0x570bd7[_0x3ac2('0x75')]!==$gameMap[_0x3ac2('0x335')]())return;if($gameMap[_0x3ac2('0x335')]()===_0x570bd7[_0x3ac2('0x75')]){if(_0x3ac2('0x36c')===_0x3ac2('0x4c')){function _0x528624(){const _0x428941=this[_0x3ac2('0x2c6')]();return _0x16831c[_0x3ac2('0x29f')](this['y'],_0x428941);}}else{const _0x17d796=$gameMap[_0x3ac2('0x179')](_0x570bd7['Step1EventId']);if(!_0x17d796)return;if(_0x570bd7[_0x3ac2('0x35b')]!==_0x3ac2('0x125')){if(_0x3ac2('0x99')!=='wmvOV'){function _0x3a91da(){const _0x3b4ce7=[_0x599f0e[_0x3ac2('0x20e')],_0x3adc6e[_0x3ac2('0x221')],_0x3ac2('0x317')[_0x3ac2('0x17d')](_0x15e83b)];return _0x15cee1[_0x3ac2('0x258')](_0x3b4ce7);}}else _0x17d796[_0x3ac2('0x2f4')](_0x570bd7[_0x3ac2('0x35b')]);}else{if(_0x3ac2('0x3e5')!==_0x3ac2('0x3e5')){function _0x3a9082(){if(!this['_interpreter'])return;if(!this[_0x3ac2('0x3b1')](!![]))return;if(!this[_0x3ac2('0x131')](!![]))return;_0x1b868c[_0x3ac2('0x1b4')][_0x3ac2('0xf2')]['call'](this);}}else _0x17d796[_0x3ac2('0x195')](_0x570bd7[_0x3ac2('0x3bf')],_0x570bd7[_0x3ac2('0x250')]);}}}_0x2c3ed3&&$gameSystem[_0x3ac2('0x2be')](_0x570bd7[_0x3ac2('0x75')],_0x570bd7[_0x3ac2('0x80')],_0x570bd7['TemplateName'],_0x570bd7['Step2MapId'],_0x570bd7['Step2EventId']);}),PluginManager[_0x3ac2('0x1f6')](pluginData[_0x3ac2('0x407')],_0x3ac2('0x1d8'),_0x8e537c=>{VisuMZ[_0x3ac2('0x279')](_0x8e537c,_0x8e537c);if(!$gameMap)return;_0x8e537c[_0x3ac2('0x236')]=_0x8e537c[_0x3ac2('0x236')]||$gameMap[_0x3ac2('0x335')]();if($gameMap[_0x3ac2('0x335')]()===_0x8e537c['MapId']){const _0x2c16c4=$gameMap['event'](_0x8e537c[_0x3ac2('0x25c')]);_0x2c16c4[_0x3ac2('0x3bd')]();}if(_0x8e537c[_0x3ac2('0x2b3')]){if('JjyyX'===_0x3ac2('0x87'))$gameSystem[_0x3ac2('0x3e7')](_0x8e537c[_0x3ac2('0x236')],_0x8e537c[_0x3ac2('0x25c')]);else{function _0x4b2a57(){if(_0x6cd54d)this[_0x3ac2('0x2ea')](_0x5b6cf1['x'],_0x2c82cf['y']);}}}}),PluginManager[_0x3ac2('0x1f6')](pluginData[_0x3ac2('0x407')],_0x3ac2('0x2da'),_0x44e9b6=>{VisuMZ[_0x3ac2('0x279')](_0x44e9b6,_0x44e9b6),$gameSystem['setPlayerControlDisable'](!_0x44e9b6['Enable']);}),PluginManager[_0x3ac2('0x1f6')](pluginData[_0x3ac2('0x407')],_0x3ac2('0x41f'),_0x40c0fc=>{VisuMZ[_0x3ac2('0x279')](_0x40c0fc,_0x40c0fc),$gameSystem[_0x3ac2('0x200')](_0x40c0fc[_0x3ac2('0x24a')]);}),PluginManager[_0x3ac2('0x1f6')](pluginData[_0x3ac2('0x407')],_0x3ac2('0x40e'),_0x571fa5=>{VisuMZ['ConvertParams'](_0x571fa5,_0x571fa5),$gameSystem[_0x3ac2('0xfc')]($gamePlayer,_0x571fa5[_0x3ac2('0x242')],_0x571fa5[_0x3ac2('0x106')],_0x571fa5[_0x3ac2('0x115')],_0x571fa5[_0x3ac2('0x29c')]);}),PluginManager[_0x3ac2('0x1f6')](pluginData[_0x3ac2('0x407')],_0x3ac2('0x2e'),_0x4a297c=>{VisuMZ[_0x3ac2('0x279')](_0x4a297c,_0x4a297c),$gameSystem[_0x3ac2('0x2e5')]($gamePlayer);}),PluginManager[_0x3ac2('0x1f6')](pluginData[_0x3ac2('0x407')],'SelfSwitchABCD',_0x4a86bc=>{VisuMZ[_0x3ac2('0x279')](_0x4a86bc,_0x4a86bc),_0x4a86bc[_0x3ac2('0x236')]=_0x4a86bc[_0x3ac2('0x236')]||$gameMap[_0x3ac2('0x335')]();const _0x46902f=[_0x4a86bc[_0x3ac2('0x236')],_0x4a86bc[_0x3ac2('0x25c')],_0x4a86bc[_0x3ac2('0x184')]];switch(_0x4a86bc['Value']){case'ON':$gameSelfSwitches[_0x3ac2('0x19e')](_0x46902f,!![]);break;case _0x3ac2('0x366'):$gameSelfSwitches[_0x3ac2('0x19e')](_0x46902f,![]);break;case _0x3ac2('0x377'):$gameSelfSwitches[_0x3ac2('0x19e')](_0x46902f,!$gameSelfSwitches[_0x3ac2('0x258')](_0x46902f));break;}}),PluginManager[_0x3ac2('0x1f6')](pluginData['name'],_0x3ac2('0x2dc'),_0x26a349=>{VisuMZ[_0x3ac2('0x279')](_0x26a349,_0x26a349),_0x26a349[_0x3ac2('0x236')]=_0x26a349[_0x3ac2('0x236')]||$gameMap[_0x3ac2('0x335')]();const _0x211fad=[_0x26a349[_0x3ac2('0x236')],_0x26a349[_0x3ac2('0x25c')],_0x3ac2('0x317')[_0x3ac2('0x17d')](_0x26a349[_0x3ac2('0x2b2')])];switch(_0x26a349[_0x3ac2('0x5f')]){case'ON':$gameSelfSwitches[_0x3ac2('0x19e')](_0x211fad,!![]);break;case _0x3ac2('0x366'):$gameSelfSwitches['setValue'](_0x211fad,![]);break;case _0x3ac2('0x377'):$gameSelfSwitches[_0x3ac2('0x19e')](_0x211fad,!$gameSelfSwitches[_0x3ac2('0x258')](_0x211fad));break;}}),PluginManager[_0x3ac2('0x1f6')](pluginData[_0x3ac2('0x407')],'SelfVariableID',_0x1b9136=>{VisuMZ[_0x3ac2('0x279')](_0x1b9136,_0x1b9136);const _0x443be8=[_0x1b9136[_0x3ac2('0x236')],_0x1b9136[_0x3ac2('0x25c')],'Self\x20Variable\x20%1'[_0x3ac2('0x17d')](_0x1b9136[_0x3ac2('0x39f')])];_0x1b9136[_0x3ac2('0x236')]=_0x1b9136[_0x3ac2('0x236')]||$gameMap[_0x3ac2('0x335')]();const _0xcc7447=VisuMZ['OperateValues']($gameSelfSwitches['value'](_0x443be8),_0x1b9136[_0x3ac2('0x5f')],_0x1b9136[_0x3ac2('0x1be')]);$gameSelfSwitches[_0x3ac2('0x19e')](_0x443be8,_0xcc7447);}),PluginManager[_0x3ac2('0x1f6')](pluginData[_0x3ac2('0x407')],_0x3ac2('0x363'),_0x6cdccb=>{VisuMZ[_0x3ac2('0x279')](_0x6cdccb,_0x6cdccb);const _0x27bcfc={'template':_0x6cdccb['TemplateName'],'mapId':_0x6cdccb[_0x3ac2('0x236')],'eventId':_0x6cdccb[_0x3ac2('0x25c')],'x':_0x6cdccb[_0x3ac2('0x1dc')],'y':_0x6cdccb[_0x3ac2('0x266')],'spawnPreserved':_0x6cdccb['key'],'spawnEventId':$gameMap['_spawnedEvents'][_0x3ac2('0x2b4')]+0x3e8};$gameMap['prepareSpawnedEventAtXY'](_0x27bcfc,_0x6cdccb[_0x3ac2('0x383')],_0x6cdccb['Passability']);}),PluginManager[_0x3ac2('0x1f6')](pluginData[_0x3ac2('0x407')],'SpawnEventAtRegion',_0x3af6b7=>{VisuMZ[_0x3ac2('0x279')](_0x3af6b7,_0x3af6b7);const _0x16f887={'template':_0x3af6b7[_0x3ac2('0x35b')],'mapId':_0x3af6b7[_0x3ac2('0x236')],'eventId':_0x3af6b7[_0x3ac2('0x25c')],'x':-0x1,'y':-0x1,'spawnPreserved':_0x3af6b7['key'],'spawnEventId':$gameMap[_0x3ac2('0xb9')]['length']+0x3e8};$gameMap[_0x3ac2('0x2e8')](_0x16f887,_0x3af6b7['Region'],_0x3af6b7[_0x3ac2('0x383')],_0x3af6b7[_0x3ac2('0x353')]);}),PluginManager[_0x3ac2('0x1f6')](pluginData[_0x3ac2('0x407')],_0x3ac2('0x2d5'),_0x1cee02=>{VisuMZ[_0x3ac2('0x279')](_0x1cee02,_0x1cee02),$gameMap[_0x3ac2('0x2fb')](_0x1cee02[_0x3ac2('0x28')]);}),PluginManager[_0x3ac2('0x1f6')](pluginData[_0x3ac2('0x407')],_0x3ac2('0x18d'),_0x924e31=>{VisuMZ[_0x3ac2('0x279')](_0x924e31,_0x924e31);const _0x8c65af=_0x924e31[_0x3ac2('0x1dc')],_0x7e5e86=_0x924e31[_0x3ac2('0x266')];$gameMap[_0x3ac2('0x196')](_0x8c65af,_0x7e5e86);}),PluginManager['registerCommand'](pluginData['name'],_0x3ac2('0x15b'),_0x39d591=>{VisuMZ[_0x3ac2('0x279')](_0x39d591,_0x39d591),$gameMap[_0x3ac2('0x78')](_0x39d591['Region']);}),PluginManager[_0x3ac2('0x1f6')](pluginData[_0x3ac2('0x407')],_0x3ac2('0x20'),_0x1b2f86=>{VisuMZ[_0x3ac2('0x279')](_0x1b2f86,_0x1b2f86),$gameMap[_0x3ac2('0x3e')]();}),VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x3e1')]=Scene_Boot[_0x3ac2('0x1f1')][_0x3ac2('0x15c')],Scene_Boot['prototype']['onDatabaseLoaded']=function(){VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x3e1')][_0x3ac2('0x111')](this),this[_0x3ac2('0x430')](),this[_0x3ac2('0x391')]();if(VisuMZ[_0x3ac2('0x1b4')]['CustomPageConditions'])VisuMZ[_0x3ac2('0x1b4')]['CustomPageConditions'][_0x3ac2('0x426')]();},VisuMZ[_0x3ac2('0x46')]=[],VisuMZ[_0x3ac2('0x128')]={},Scene_Boot[_0x3ac2('0x1f1')]['process_VisuMZ_EventsMoveCore_LoadTemplateMaps']=function(){if(DataManager[_0x3ac2('0x24b')]()||DataManager[_0x3ac2('0x273')]())return;const _0x11c784=VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x1d5')][_0x3ac2('0x2df')],_0x48206b=_0x11c784[_0x3ac2('0xe9')][_0x3ac2('0x19d')](0x0);for(const _0x24a016 of _0x11c784[_0x3ac2('0x124')]){_0x24a016[_0x3ac2('0x339')]=_0x24a016['Name']['toUpperCase']()[_0x3ac2('0x149')](),VisuMZ[_0x3ac2('0x128')][_0x24a016[_0x3ac2('0x339')]]=_0x24a016;if(!_0x48206b[_0x3ac2('0x6f')](_0x24a016[_0x3ac2('0x432')]))_0x48206b['push'](_0x24a016[_0x3ac2('0x432')]);}for(const _0x558066 of _0x48206b){if(_0x3ac2('0x146')!==_0x3ac2('0x37c')){if(VisuMZ['PreloadedMaps'][_0x558066])continue;const _0x371d43=_0x3ac2('0x16b')[_0x3ac2('0x17d')](_0x558066[_0x3ac2('0x1b1')](0x3)),_0x51be21=_0x3ac2('0x94')[_0x3ac2('0x17d')](_0x558066);DataManager['loadDataFile'](_0x51be21,_0x371d43),setTimeout(this[_0x3ac2('0x91')]['bind'](this,_0x558066,_0x51be21),0x64);}else{function _0x487b3a(){_0x237b4b[_0x3ac2('0x1b4')][_0x3ac2('0x3')]['call'](this,_0x15a3fd,_0x4359d5);}}}},Scene_Boot[_0x3ac2('0x1f1')]['VisuMZ_Setup_Preload_Map']=function(_0x6f96a4,_0x3de23d){window[_0x3de23d]?(VisuMZ[_0x3ac2('0x46')][_0x6f96a4]=window[_0x3de23d],window[_0x3de23d]=undefined):setTimeout(this[_0x3ac2('0x91')][_0x3ac2('0xf7')](this,_0x6f96a4,_0x3de23d),0x64);},VisuMZ[_0x3ac2('0x16c')]=[],VisuMZ[_0x3ac2('0x268')]=[],VisuMZ[_0x3ac2('0x1e1')]=[],VisuMZ[_0x3ac2('0x30f')]=[],Scene_Boot[_0x3ac2('0x1f1')][_0x3ac2('0x391')]=function(){for(let _0x5c8571=0x1;_0x5c8571<$dataSystem[_0x3ac2('0x3b5')]['length'];_0x5c8571++){if(_0x3ac2('0x11a')===_0x3ac2('0x24f')){function _0x4b55f2(){return _0x51b788>0x0?0x8:0x2;}}else{if($dataSystem[_0x3ac2('0x3b5')][_0x5c8571]['match'](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ[_0x3ac2('0x16c')][_0x3ac2('0x2c0')](_0x5c8571);if($dataSystem[_0x3ac2('0x3b5')][_0x5c8571][_0x3ac2('0x1fa')](/<SELF>/i))VisuMZ[_0x3ac2('0x268')][_0x3ac2('0x2c0')](_0x5c8571);}}for(let _0x47335e=0x1;_0x47335e<$dataSystem[_0x3ac2('0x3f5')][_0x3ac2('0x2b4')];_0x47335e++){if($dataSystem['variables'][_0x47335e][_0x3ac2('0x1fa')](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ[_0x3ac2('0x1e1')]['push'](_0x47335e);if($dataSystem['variables'][_0x47335e]['match'](/<SELF>/i))VisuMZ['SelfVariables'][_0x3ac2('0x2c0')](_0x47335e);}},VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x1dd')]={},VisuMZ['EventsMoveCore'][_0x3ac2('0x1dd')][_0x3ac2('0x426')]=function(){this[_0x3ac2('0x76')]=new Game_CPCInterpreter(),this[_0x3ac2('0x3bb')]();},VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x1dd')][_0x3ac2('0x3bb')]=function(){this['_commonEvents']=[];for(const _0x5d9fc0 of $dataCommonEvents){if(_0x3ac2('0x9f')===_0x3ac2('0x189')){function _0x40bad0(){return this[_0x3ac2('0x92')];}}else{if(!_0x5d9fc0)continue;VisuMZ['EventsMoveCore']['CustomPageConditions'][_0x3ac2('0x60')](_0x5d9fc0);if(_0x5d9fc0[_0x3ac2('0x8d')]['length']>0x0)this[_0x3ac2('0x3da')][_0x3ac2('0x2c0')](_0x5d9fc0['id']);}}},VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x1dd')][_0x3ac2('0x276')]=function(_0x3ec5fd,_0x5c1b26){return this[_0x3ac2('0x76')][_0x3ac2('0x7a')](_0x3ec5fd,_0x5c1b26),this[_0x3ac2('0x76')][_0x3ac2('0x165')](),this['_interpreter'][_0x3ac2('0x315')];},VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x1dd')]['loadCPC']=function(_0x34633f){let _0x3b6b11=![];_0x34633f[_0x3ac2('0x8d')]=[];for(const _0x2001ce of _0x34633f['list']){if(_0x3ac2('0x10b')!==_0x3ac2('0x10b')){function _0x5d0793(){_0x5c3448[_0x3ac2('0x1b4')]['Spriteset_Map_createShadow'][_0x3ac2('0x111')](this),this[_0x3ac2('0x190')]();}}else{if([0x6c,0x198]['includes'](_0x2001ce[_0x3ac2('0x3f1')])){if(_0x3ac2('0x9d')===_0x3ac2('0x9d')){const _0x1a58a9=_0x2001ce[_0x3ac2('0x392')][0x0];if(_0x1a58a9['match'](/<PAGE (?:CONDITION|CONDITIONS)>/i))_0x3b6b11=!![];else _0x1a58a9[_0x3ac2('0x1fa')](/<\/PAGE (?:CONDITION|CONDITIONS)>/i)&&(_0x3b6b11=![]);}else{function _0x3adc19(){const _0x2b25e4=_0x2fd23f[_0x3ac2('0x23')][_0x3ac2('0x335')],_0x41a16e=_0x46b1a5[_0x3ac2('0x23')][_0x3ac2('0x32c')];return _0x3d6aa4['PreloadedMaps'][_0x2b25e4][_0x3ac2('0x1ce')][_0x41a16e];}}}_0x3b6b11&&_0x34633f[_0x3ac2('0x8d')][_0x3ac2('0x2c0')](_0x2001ce);}}},getSelfSwitchValue=function(_0x4279a6,_0x4b906e,_0x392eba){let _0x16699c=[_0x4279a6,_0x4b906e,_0x3ac2('0x317')['format'](_0x392eba)];return typeof _0x392eba===_0x3ac2('0x3ef')&&(_0x16699c=[_0x4279a6,_0x4b906e,_0x392eba[_0x3ac2('0x2c8')]()['trim']()]),$gameSelfSwitches[_0x3ac2('0x258')](_0x16699c);},getSelfVariableValue=function(_0x9e3cd0,_0x4d0092,_0x15c538){const _0x29c274=[_0x9e3cd0,_0x4d0092,'Self\x20Variable\x20%1'[_0x3ac2('0x17d')](_0x15c538)];return $gameSelfSwitches['value'](_0x29c274);},setSelfSwitchValue=function(_0x370e0e,_0xb2349e,_0x57534c,_0x34bcd1){let _0x770c68=[_0x370e0e,_0xb2349e,_0x3ac2('0x317')[_0x3ac2('0x17d')](_0x57534c)];typeof _0x57534c===_0x3ac2('0x3ef')&&(_0x770c68=[_0x370e0e,_0xb2349e,_0x57534c[_0x3ac2('0x2c8')]()['trim']()]);},setSelfVariableValue=function(_0x249e2b,_0x1b1df,_0x1f395b,_0x38fcba){const _0x309acb=[_0x249e2b,_0x1b1df,_0x3ac2('0x2d4')[_0x3ac2('0x17d')](_0x1f395b)];},DataManager[_0x3ac2('0x1da')]=function(_0x24dc2b){if(SceneManager['_scene'][_0x3ac2('0x54')]===Scene_Debug)return![];return VisuMZ[_0x3ac2('0x16c')][_0x3ac2('0x6f')](_0x24dc2b);},DataManager[_0x3ac2('0xe7')]=function(_0x1326fe){if(SceneManager[_0x3ac2('0x177')][_0x3ac2('0x54')]===Scene_Debug)return![];return VisuMZ[_0x3ac2('0x1e1')]['includes'](_0x1326fe);},DataManager[_0x3ac2('0x2ff')]=function(_0x133cb0){if(SceneManager[_0x3ac2('0x177')][_0x3ac2('0x54')]===Scene_Debug)return![];return VisuMZ[_0x3ac2('0x268')][_0x3ac2('0x6f')](_0x133cb0);},DataManager['isSelfVariable']=function(_0xff5969){if(SceneManager[_0x3ac2('0x177')][_0x3ac2('0x54')]===Scene_Debug)return![];return VisuMZ[_0x3ac2('0x30f')][_0x3ac2('0x6f')](_0xff5969);},VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0xa4')]=Game_Temp['prototype']['setDestination'],Game_Temp[_0x3ac2('0x1f1')][_0x3ac2('0x2ec')]=function(_0x6648c,_0x26f263){if(this[_0x3ac2('0x2e0')](_0x6648c,_0x26f263))return;VisuMZ['EventsMoveCore'][_0x3ac2('0xa4')][_0x3ac2('0x111')](this,_0x6648c,_0x26f263);},Game_Temp[_0x3ac2('0x1f1')][_0x3ac2('0x2e0')]=function(_0x472bc5,_0x5663d0){const _0x6ff6a=$gameMap[_0x3ac2('0x17a')](_0x472bc5,_0x5663d0);for(const _0x46bb7d of _0x6ff6a){if(_0x46bb7d&&_0x46bb7d[_0x3ac2('0x8b')]()){if(_0x3ac2('0x2a6')==='JqNDN')return _0x46bb7d[_0x3ac2('0x110')](),!![];else{function _0x4288db(){if(_0x4861ea[_0x3ac2('0x2cd')](_0x3e1616,_0x34411f,_0x4d9b18,this[_0x3ac2('0x431')]))return!![];if(_0x9b4a33['isRegionForbidPass'](_0x5099c6,_0x38f88e,_0x26c2a1,this[_0x3ac2('0x431')]))return![];return _0x3f9f39[_0x3ac2('0x1b4')][_0x3ac2('0x327')][_0x3ac2('0x111')](this,_0x428217,_0x3ef496,_0x13c467);}}}}return![];},Game_Temp[_0x3ac2('0x1f1')][_0x3ac2('0x3b7')]=function(_0x4c7cbc){this[_0x3ac2('0x92')]=_0x4c7cbc;},Game_Temp[_0x3ac2('0x1f1')]['getLastPluginCommandInterpreter']=function(){return this[_0x3ac2('0x92')];},Game_Temp[_0x3ac2('0x1f1')][_0x3ac2('0x386')]=function(_0x4d37b0){this[_0x3ac2('0x38')]=_0x4d37b0;},Game_Temp[_0x3ac2('0x1f1')][_0x3ac2('0x342')]=function(){this[_0x3ac2('0x38')]=undefined;},Game_Temp[_0x3ac2('0x1f1')]['getSelfTarget']=function(){return this[_0x3ac2('0x38')];},VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x25f')]=Game_System[_0x3ac2('0x1f1')][_0x3ac2('0x426')],Game_System[_0x3ac2('0x1f1')]['initialize']=function(){VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x25f')][_0x3ac2('0x111')](this),this[_0x3ac2('0x399')]();},Game_System[_0x3ac2('0x1f1')][_0x3ac2('0x399')]=function(){this['_EventsMoveCoreSettings']={'DashingEnable':!![],'EventAutoMovement':!![],'VisibleEventLabels':!![]},this[_0x3ac2('0x29b')]={},this[_0x3ac2('0x137')]=[],this[_0x3ac2('0x368')]={},this['_SavedEventLocations']={},this[_0x3ac2('0x1c2')]=![],this[_0x3ac2('0x167')]=_0x3ac2('0x3f2');},Game_System[_0x3ac2('0x1f1')][_0x3ac2('0x283')]=function(){if(this[_0x3ac2('0xf8')]===undefined)this[_0x3ac2('0x399')]();if(this[_0x3ac2('0xf8')][_0x3ac2('0x237')]===undefined)this[_0x3ac2('0x399')]();return this[_0x3ac2('0xf8')]['DashingEnable'];},Game_System['prototype'][_0x3ac2('0x31e')]=function(_0x2ff566){if(this[_0x3ac2('0xf8')]===undefined)this[_0x3ac2('0x399')]();if(this[_0x3ac2('0xf8')]['DashingEnable']===undefined)this['initEventsMoveCore']();this[_0x3ac2('0xf8')][_0x3ac2('0x237')]=_0x2ff566;},Game_System[_0x3ac2('0x1f1')][_0x3ac2('0x288')]=function(){if(this[_0x3ac2('0xf8')]===undefined)this[_0x3ac2('0x399')]();if(this[_0x3ac2('0xf8')]['EventAutoMovement']===undefined)this[_0x3ac2('0x399')]();return this['_EventsMoveCoreSettings'][_0x3ac2('0x2a0')];},Game_System[_0x3ac2('0x1f1')][_0x3ac2('0xb3')]=function(_0x5ce3eb){if(this['_EventsMoveCoreSettings']===undefined)this[_0x3ac2('0x399')]();if(this[_0x3ac2('0xf8')][_0x3ac2('0x2a0')]===undefined)this[_0x3ac2('0x399')]();this['_EventsMoveCoreSettings'][_0x3ac2('0x2a0')]=_0x5ce3eb;},Game_System[_0x3ac2('0x1f1')][_0x3ac2('0x3f4')]=function(){if(this[_0x3ac2('0xf8')]===undefined)this[_0x3ac2('0x399')]();if(this[_0x3ac2('0xf8')][_0x3ac2('0x3d5')]===undefined)this[_0x3ac2('0x399')]();return this[_0x3ac2('0xf8')][_0x3ac2('0x3d5')];},Game_System['prototype'][_0x3ac2('0x16e')]=function(_0x702b28){if(this['_EventsMoveCoreSettings']===undefined)this[_0x3ac2('0x399')]();if(this[_0x3ac2('0xf8')][_0x3ac2('0x3d5')]===undefined)this[_0x3ac2('0x399')]();this[_0x3ac2('0xf8')][_0x3ac2('0x3d5')]=_0x702b28;},Game_System[_0x3ac2('0x1f1')][_0x3ac2('0x25b')]=function(){return this[_0x3ac2('0x1c2')]===undefined&&(this[_0x3ac2('0x1c2')]=![]),this[_0x3ac2('0x1c2')];},Game_System[_0x3ac2('0x1f1')][_0x3ac2('0x42b')]=function(_0x102cf8){this['_DisablePlayerControl']=_0x102cf8;},Game_System[_0x3ac2('0x1f1')][_0x3ac2('0x42a')]=function(){return this[_0x3ac2('0x167')];},Game_System[_0x3ac2('0x1f1')][_0x3ac2('0x200')]=function(_0x11441d){this['_PlayerDiagonalSetting']=String(_0x11441d)['toLowerCase']()[_0x3ac2('0x149')]();},Game_System[_0x3ac2('0x1f1')][_0x3ac2('0x25e')]=function(_0x5e56ee){if(this[_0x3ac2('0x29b')]===undefined)this[_0x3ac2('0x399')]();if(!_0x5e56ee)return null;if(_0x5e56ee===$gamePlayer)return this[_0x3ac2('0x29b')]['Player'];else{if(_0x3ac2('0x2b7')!=='MWJFB'){function _0x834818(){return _0x125366[_0x3ac2('0x34b')]();}}else{const _0x19212d=_0x3ac2('0x3c4')[_0x3ac2('0x17d')](_0x5e56ee[_0x3ac2('0x20e')],_0x5e56ee[_0x3ac2('0x221')]);return this['_EventIcons'][_0x19212d];}}},Game_System[_0x3ac2('0x1f1')][_0x3ac2('0xfc')]=function(_0x491ec0,_0x4fd9f9,_0x514f6f,_0x3d27b5,_0x4f4257){if(this['_EventIcons']===undefined)this[_0x3ac2('0x399')]();const _0x3055dc=_0x491ec0===$gamePlayer?_0x3ac2('0x3a7'):_0x3ac2('0x3c4')[_0x3ac2('0x17d')](_0x491ec0['_mapId'],_0x491ec0['_eventId']);this['_EventIcons'][_0x3055dc]={'iconIndex':_0x4fd9f9,'bufferX':_0x514f6f,'bufferY':_0x3d27b5,'blendMode':_0x4f4257};},Game_System[_0x3ac2('0x1f1')][_0x3ac2('0x395')]=function(_0x5f5199,_0x418a41,_0x2b3fab,_0x23a523,_0x544331,_0x2dc7d3){if(this[_0x3ac2('0x29b')]===undefined)this[_0x3ac2('0x399')]();const _0x126fc7=_0x3ac2('0x3c4')[_0x3ac2('0x17d')](_0x5f5199,_0x418a41);this[_0x3ac2('0x29b')][_0x126fc7]={'iconIndex':_0x2b3fab,'bufferX':_0x23a523,'bufferY':_0x544331,'blendMode':_0x2dc7d3};},Game_System[_0x3ac2('0x1f1')]['deleteIconsOnEventsData']=function(_0x2dc58c){if(this[_0x3ac2('0x29b')]===undefined)this[_0x3ac2('0x399')]();if(!_0x2dc58c)return null;if(_0x2dc58c===$gamePlayer)delete this[_0x3ac2('0x29b')][_0x3ac2('0x3a7')];else{if(_0x3ac2('0x22b')!==_0x3ac2('0xc7'))this['deleteIconsOnEventsDataKey'](_0x2dc58c[_0x3ac2('0x20e')],_0x2dc58c[_0x3ac2('0x221')]);else{function _0x1f7590(){return _0x2a0f51[0x2][_0x3ac2('0x1fa')](/VAR/i)?this[_0x3ac2('0x2b5')][_0x5382a9]||0x0:!!this[_0x3ac2('0x2b5')][_0x49ff50];}}}},Game_System[_0x3ac2('0x1f1')]['deleteIconsOnEventsDataKey']=function(_0xa1ffc2,_0x16d5fe){if(this[_0x3ac2('0x29b')]===undefined)this[_0x3ac2('0x399')]();const _0x3b605c=_0x3ac2('0x3c4')[_0x3ac2('0x17d')](_0xa1ffc2,_0x16d5fe);delete this[_0x3ac2('0x29b')][_0x3b605c];},Game_System[_0x3ac2('0x1f1')][_0x3ac2('0x83')]=function(_0x5d203e){if(this[_0x3ac2('0x18f')]===undefined)this[_0x3ac2('0x399')]();if(!_0x5d203e)return null;const _0x33ce47=_0x3ac2('0x3c4')[_0x3ac2('0x17d')](_0x5d203e[_0x3ac2('0x20e')],_0x5d203e['_eventId']);return this[_0x3ac2('0x18f')][_0x33ce47];},Game_System['prototype']['saveEventLocation']=function(_0x5f5615){if(this[_0x3ac2('0x18f')]===undefined)this[_0x3ac2('0x399')]();if(!_0x5f5615)return;const _0xb1f095=_0x3ac2('0x3c4')['format'](_0x5f5615[_0x3ac2('0x20e')],_0x5f5615[_0x3ac2('0x221')]);this[_0x3ac2('0x18f')][_0xb1f095]={'direction':_0x5f5615[_0x3ac2('0x2c6')](),'x':Math[_0x3ac2('0x396')](_0x5f5615['x']),'y':Math[_0x3ac2('0x396')](_0x5f5615['y']),'pageIndex':_0x5f5615[_0x3ac2('0x49')],'moveRouteIndex':_0x5f5615[_0x3ac2('0x235')]};},Game_System[_0x3ac2('0x1f1')][_0x3ac2('0xa3')]=function(_0x318a16){if(this[_0x3ac2('0x18f')]===undefined)this[_0x3ac2('0x399')]();if(!_0x318a16)return;this[_0x3ac2('0x3cd')](_0x318a16[_0x3ac2('0x20e')],_0x318a16['_eventId']);},Game_System[_0x3ac2('0x1f1')][_0x3ac2('0x3cd')]=function(_0x1c7bd5,_0x43604c){if(this[_0x3ac2('0x18f')]===undefined)this['initEventsMoveCore']();const _0x48436c=_0x3ac2('0x3c4')[_0x3ac2('0x17d')](_0x1c7bd5,_0x43604c);delete this[_0x3ac2('0x18f')][_0x48436c];},Game_System['prototype'][_0x3ac2('0xb6')]=function(_0x1d860c,_0x2545fa,_0x45c7e5,_0x5287d4,_0x4392,_0x921a2c,_0xf7065f){if(this[_0x3ac2('0x18f')]===undefined)this[_0x3ac2('0x399')]();const _0x27c50f=_0x3ac2('0x3c4')[_0x3ac2('0x17d')](_0x1d860c,_0x2545fa);this[_0x3ac2('0x18f')][_0x27c50f]={'direction':_0x4392,'x':Math[_0x3ac2('0x396')](_0x45c7e5),'y':Math['round'](_0x5287d4),'pageIndex':_0x921a2c,'moveRouteIndex':_0xf7065f};},Game_System['prototype']['getPreservedMorphEventData']=function(_0xf5cdd5){if(this[_0x3ac2('0x368')]===undefined)this[_0x3ac2('0x399')]();if(!_0xf5cdd5)return;const _0x5b5e42=_0x3ac2('0x3c4')[_0x3ac2('0x17d')](_0xf5cdd5['_mapId'],_0xf5cdd5[_0x3ac2('0x221')]);return this[_0x3ac2('0x368')][_0x5b5e42];},Game_System[_0x3ac2('0x1f1')][_0x3ac2('0x2be')]=function(_0x28f164,_0x395424,_0x4d4dab,_0x21de15,_0x315725){if(this[_0x3ac2('0x368')]===undefined)this[_0x3ac2('0x399')]();const _0x2dd8a3=_0x3ac2('0x3c4')[_0x3ac2('0x17d')](_0x28f164,_0x395424);this['_PreservedEventMorphData'][_0x2dd8a3]={'template':_0x4d4dab,'mapId':_0x21de15,'eventId':_0x315725};},Game_System[_0x3ac2('0x1f1')][_0x3ac2('0x3e7')]=function(_0x5c9313,_0x5c342d){if(this[_0x3ac2('0x368')]===undefined)this[_0x3ac2('0x399')]();const _0xe26baa=_0x3ac2('0x3c4')[_0x3ac2('0x17d')](_0x5c9313,_0x5c342d);delete this[_0x3ac2('0x368')][_0xe26baa];},Game_System['prototype']['getMapSpawnedEventData']=function(_0x55d44e){if(this[_0x3ac2('0x137')]===undefined)this[_0x3ac2('0x399')]();return this[_0x3ac2('0x137')][_0x55d44e]=this[_0x3ac2('0x137')][_0x55d44e]||[],this[_0x3ac2('0x137')][_0x55d44e];},Game_System[_0x3ac2('0x1f1')][_0x3ac2('0x1')]=function(_0x1af1fc){const _0x37c006=this[_0x3ac2('0x3c6')](_0x1af1fc);for(const _0x529eb6 of _0x37c006){if(!_0x529eb6)continue;if(_0x529eb6[_0x3ac2('0x35e')])continue;const _0x17fab8=_0x37c006[_0x3ac2('0x129')](_0x529eb6);_0x37c006[_0x17fab8]=null;}},VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x1e')]=Game_Message[_0x3ac2('0x1f1')]['add'],Game_Message[_0x3ac2('0x1f1')][_0x3ac2('0x247')]=function(_0x2de73d){VisuMZ[_0x3ac2('0x1b4')]['Game_Message_add']['call'](this,_0x2de73d),this['_selfEvent']=$gameTemp[_0x3ac2('0x197')]();},Game_Message['prototype'][_0x3ac2('0x3a0')]=function(){$gameTemp[_0x3ac2('0x386')](this[_0x3ac2('0x36')]);},VisuMZ['EventsMoveCore'][_0x3ac2('0x31f')]=Game_Switches['prototype'][_0x3ac2('0x258')],Game_Switches[_0x3ac2('0x1f1')][_0x3ac2('0x258')]=function(_0x265209){if(DataManager[_0x3ac2('0x1da')](_0x265209))return!!this[_0x3ac2('0x53')](_0x265209);else return DataManager[_0x3ac2('0x2ff')](_0x265209)?!!this[_0x3ac2('0x411')](_0x265209):VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x31f')][_0x3ac2('0x111')](this,_0x265209);},Game_Switches[_0x3ac2('0x290')]={},Game_Switches[_0x3ac2('0x1f1')][_0x3ac2('0x53')]=function(_0x27d20b){if(!Game_Switches[_0x3ac2('0x290')][_0x27d20b]){$dataSystem['switches'][_0x27d20b][_0x3ac2('0x1fa')](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x5e6ca8='return\x20%1'[_0x3ac2('0x17d')](String(RegExp['$1']));Game_Switches[_0x3ac2('0x290')][_0x27d20b]=new Function(_0x3ac2('0x151'),_0x5e6ca8);}const _0x180ae0=$gameTemp['getSelfTarget']()||this;return Game_Switches['advancedFunc'][_0x27d20b]['call'](_0x180ae0,_0x27d20b);},Game_Switches[_0x3ac2('0x1f1')]['selfValue']=function(_0x2a10e2){const _0x1aab67=$gameTemp[_0x3ac2('0x197')]()||this;if(_0x1aab67[_0x3ac2('0x54')]!==Game_Event)return VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x31f')][_0x3ac2('0x111')](this,_0x2a10e2);else{const _0x57c7b0=[_0x1aab67['_mapId'],_0x1aab67['_eventId'],_0x3ac2('0x317')[_0x3ac2('0x17d')](_0x2a10e2)];return $gameSelfSwitches['value'](_0x57c7b0);}},VisuMZ['EventsMoveCore'][_0x3ac2('0x3')]=Game_Switches[_0x3ac2('0x1f1')][_0x3ac2('0x19e')],Game_Switches[_0x3ac2('0x1f1')][_0x3ac2('0x19e')]=function(_0x1688c3,_0x187fb7){if(DataManager[_0x3ac2('0x2ff')](_0x1688c3))this[_0x3ac2('0xd7')](_0x1688c3,_0x187fb7);else{if(_0x3ac2('0x329')==='KaAyB'){function _0x31ab92(){const _0x5e27cb=this['_callEventData'],_0x3c7d89=_0x25b2f7[this[_0x3ac2('0x1f3')]],_0x3acee6=_0x3c7d89['events'][_0x5e27cb['eventId']];if(_0x3acee6&&_0x3acee6[_0x3ac2('0x2dd')][_0x5e27cb[_0x3ac2('0x301')]-0x1]){const _0x1f6fe0=_0x3acee6[_0x3ac2('0x2dd')][_0x5e27cb['pageId']-0x1][_0x3ac2('0x31c')];this[_0x3ac2('0x326')](_0x1f6fe0,this[_0x3ac2('0x32c')]());}_0x49b5ca[this[_0x3ac2('0x1f3')]]=_0x49a223,this[_0x3ac2('0x1f3')]=_0x154d72,this[_0x3ac2('0x1e2')]=_0x18aa56;}}else VisuMZ[_0x3ac2('0x1b4')]['Game_Switches_setValue'][_0x3ac2('0x111')](this,_0x1688c3,_0x187fb7);}},Game_Switches['prototype'][_0x3ac2('0xd7')]=function(_0x3292e1,_0x26fc9e){const _0x55c65d=$gameTemp[_0x3ac2('0x197')]()||this;if(_0x55c65d[_0x3ac2('0x54')]!==Game_Event)VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x3')][_0x3ac2('0x111')](this,_0x3292e1,_0x26fc9e);else{const _0x22d6e5=[_0x55c65d['_mapId'],_0x55c65d[_0x3ac2('0x221')],_0x3ac2('0x317')['format'](_0x3292e1)];$gameSelfSwitches[_0x3ac2('0x19e')](_0x22d6e5,_0x26fc9e);}},VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x23d')]=Game_Variables[_0x3ac2('0x1f1')][_0x3ac2('0x258')],Game_Variables[_0x3ac2('0x1f1')]['value']=function(_0x1a92a2){if(DataManager['isAdvancedVariable'](_0x1a92a2)){if(_0x3ac2('0x425')!==_0x3ac2('0x2e3'))return this[_0x3ac2('0x53')](_0x1a92a2);else{function _0x1e913c(){this['_forceDashing']=!![];}}}else return DataManager[_0x3ac2('0x5c')](_0x1a92a2)?this['selfValue'](_0x1a92a2):VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x23d')][_0x3ac2('0x111')](this,_0x1a92a2);},Game_Variables[_0x3ac2('0x290')]={},Game_Variables['prototype']['advancedValue']=function(_0x4955d9){if(!Game_Variables[_0x3ac2('0x290')][_0x4955d9]){if('IphyD'!=='bVgBj'){$dataSystem[_0x3ac2('0x3f5')][_0x4955d9][_0x3ac2('0x1fa')](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0xc834d2=_0x3ac2('0x3b2')[_0x3ac2('0x17d')](String(RegExp['$1']));Game_Variables[_0x3ac2('0x290')][_0x4955d9]=new Function(_0x3ac2('0x1c0'),_0xc834d2);}else{function _0x5d028e(){return _0x4c79f0['onClickTrigger'](),!![];}}}const _0x4a6437=$gameTemp[_0x3ac2('0x197')]()||this;return Game_Variables['advancedFunc'][_0x4955d9][_0x3ac2('0x111')](_0x4a6437,_0x4955d9);},Game_Variables[_0x3ac2('0x1f1')][_0x3ac2('0x411')]=function(_0xd8c5ac){const _0x45d521=$gameTemp['getSelfTarget']()||this;if(_0x45d521[_0x3ac2('0x54')]!==Game_Event)return VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x23d')][_0x3ac2('0x111')](this,_0xd8c5ac);else{const _0x2c65f=[_0x45d521[_0x3ac2('0x20e')],_0x45d521[_0x3ac2('0x221')],_0x3ac2('0x2d4')['format'](_0xd8c5ac)];return $gameSelfSwitches[_0x3ac2('0x258')](_0x2c65f);}},VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x2d6')]=Game_Variables[_0x3ac2('0x1f1')][_0x3ac2('0x19e')],Game_Variables[_0x3ac2('0x1f1')][_0x3ac2('0x19e')]=function(_0x2c29d2,_0x32ea02){if(DataManager['isSelfVariable'](_0x2c29d2))this[_0x3ac2('0xd7')](_0x2c29d2,_0x32ea02);else{if('fmQNd'===_0x3ac2('0x275')){function _0x49d713(){if(this===_0x54c790)return;const _0x51d165=[this['_mapId'],this[_0x3ac2('0x221')],_0x3ac2('0x2d4')[_0x3ac2('0x17d')](_0xdcb814)];_0x470bf6[_0x3ac2('0x19e')](_0x51d165,_0x4a387e(_0x26dd35));}}else VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x2d6')]['call'](this,_0x2c29d2,_0x32ea02);}},Game_Variables[_0x3ac2('0x1f1')][_0x3ac2('0xd7')]=function(_0x1659aa,_0x18c113){const _0x275523=$gameTemp[_0x3ac2('0x197')]()||this;if(_0x275523[_0x3ac2('0x54')]!==Game_Event)VisuMZ[_0x3ac2('0x1b4')]['Game_Variables_setValue'][_0x3ac2('0x111')](this,_0x1659aa,_0x18c113);else{if(_0x3ac2('0x89')==='fKBfj'){const _0x41289b=[_0x275523[_0x3ac2('0x20e')],_0x275523[_0x3ac2('0x221')],'Self\x20Variable\x20%1'[_0x3ac2('0x17d')](_0x1659aa)];$gameSelfSwitches[_0x3ac2('0x19e')](_0x41289b,_0x18c113);}else{function _0x50a538(){return _0x373ae3[_0x3ac2('0x1b4')]['Settings'][_0x3ac2('0x143')][_0x3ac2('0x27a')];}}}},VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x2d2')]=Game_SelfSwitches['prototype']['value'],Game_SelfSwitches[_0x3ac2('0x1f1')][_0x3ac2('0x258')]=function(_0x581c69){if(_0x581c69[0x2]['match'](/SELF/i)){if(_0x3ac2('0xbf')===_0x3ac2('0xbf'))return this[_0x3ac2('0x411')](_0x581c69);else{function _0x36c730(){this[_0x3ac2('0x199')]=!![];}}}else{return VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x2d2')][_0x3ac2('0x111')](this,_0x581c69);;}},Game_SelfSwitches['prototype']['selfValue']=function(_0x22e930){return _0x22e930[0x2][_0x3ac2('0x1fa')](/VAR/i)?this['_data'][_0x22e930]||0x0:!!this[_0x3ac2('0x2b5')][_0x22e930];},VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0xb1')]=Game_SelfSwitches[_0x3ac2('0x1f1')][_0x3ac2('0x19e')],Game_SelfSwitches[_0x3ac2('0x1f1')]['setValue']=function(_0x164fe4,_0x5269ce){if(_0x164fe4[0x2][_0x3ac2('0x1fa')](/SELF/i)){if(_0x3ac2('0x38e')==='qeFXD'){function _0x3f3932(){if(_0x510133[_0x3ac2('0x25b')]())return 0x0;return _0x51961b['isSupportDiagonalMovement']()?this[_0x3ac2('0x2')]():_0x20b68b[_0x3ac2('0x1b4')][_0x3ac2('0x1ec')][_0x3ac2('0x111')](this);}}else this[_0x3ac2('0xd7')](_0x164fe4,_0x5269ce);}else VisuMZ['EventsMoveCore'][_0x3ac2('0xb1')]['call'](this,_0x164fe4,_0x5269ce);},Game_SelfSwitches['prototype']['setSelfValue']=function(_0x53f207,_0x42cc48){this[_0x3ac2('0x2b5')][_0x53f207]=_0x53f207[0x2][_0x3ac2('0x1fa')](/VAR/i)?_0x42cc48:!!_0x42cc48,this[_0x3ac2('0x26d')]();},VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x373')]=Game_Enemy[_0x3ac2('0x1f1')][_0x3ac2('0x41b')],Game_Enemy[_0x3ac2('0x1f1')][_0x3ac2('0x41b')]=function(_0x38a3e1){$gameTemp['registerSelfTarget'](this);const _0x590523=VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x373')]['call'](this,_0x38a3e1);return $gameTemp[_0x3ac2('0x342')](),_0x590523;},VisuMZ['EventsMoveCore'][_0x3ac2('0x62')]=Game_Troop['prototype'][_0x3ac2('0x361')],Game_Troop[_0x3ac2('0x1f1')][_0x3ac2('0x361')]=function(_0x54c20c){$gameTemp[_0x3ac2('0x386')](this);const _0x4c7b7d=VisuMZ['EventsMoveCore']['Game_Troop_meetsConditions'][_0x3ac2('0x111')](this,_0x54c20c);return $gameTemp[_0x3ac2('0x342')](),_0x4c7b7d;},VisuMZ['EventsMoveCore'][_0x3ac2('0x304')]=Game_Map['prototype'][_0x3ac2('0x7a')],Game_Map[_0x3ac2('0x1f1')][_0x3ac2('0x7a')]=function(_0x316091){this[_0x3ac2('0x1')](_0x316091),VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x304')][_0x3ac2('0x111')](this,_0x316091),this[_0x3ac2('0xd9')](),this[_0x3ac2('0x330')](),this[_0x3ac2('0x297')](),this['setupRegionRestrictions'](),this[_0x3ac2('0x2ac')](),this[_0x3ac2('0x208')]();},VisuMZ[_0x3ac2('0x1b4')]['Game_Map_setupEvents']=Game_Map[_0x3ac2('0x1f1')][_0x3ac2('0x98')],Game_Map[_0x3ac2('0x1f1')]['setupEvents']=function(){VisuMZ['EventsMoveCore'][_0x3ac2('0x1bc')][_0x3ac2('0x111')](this),this[_0x3ac2('0x28c')]();},Game_Map[_0x3ac2('0x303')]=0xc8,Game_Map[_0x3ac2('0x1f1')][_0x3ac2('0x330')]=function(){const _0x3653f8=Game_Map[_0x3ac2('0x303')];this[_0x3ac2('0x1d1')]=this[_0x3ac2('0x1ce')]()['length']>_0x3653f8;if(this[_0x3ac2('0x1d1')]&&$gameTemp[_0x3ac2('0x6e')]()){}},Game_Map[_0x3ac2('0x1f1')][_0x3ac2('0x34c')]=function(){return this[_0x3ac2('0x1d1')];},Game_Map['prototype'][_0x3ac2('0xd9')]=function(){this[_0x3ac2('0x22')]=undefined;},Game_Map['prototype']['setupDiagonalSupport']=function(){this[_0x3ac2('0x1e9')]=VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x1d5')][_0x3ac2('0x23e')][_0x3ac2('0x37d')];const _0x2f7d8e=$dataMap[_0x3ac2('0x296')]||'';if(_0x2f7d8e[_0x3ac2('0x1fa')](/<DIAGONAL MOVEMENT: ON>/i))this[_0x3ac2('0x1e9')]=!![];else _0x2f7d8e[_0x3ac2('0x1fa')](/<DIAGONAL MOVEMENT: OFF>/i)&&(this[_0x3ac2('0x1e9')]=![]);},Game_Map[_0x3ac2('0x1f1')][_0x3ac2('0x42')]=function(){const _0x360283=$gameSystem['getPlayerDiagonalSetting']();if(_0x360283===_0x3ac2('0x2d3'))return!![];if(_0x360283===_0x3ac2('0x3c8'))return![];if(this[_0x3ac2('0x1e9')]===undefined)this[_0x3ac2('0x297')]();return this['_diagonalSupport'];},Game_Map[_0x3ac2('0x1f1')][_0x3ac2('0x2cf')]=function(_0x4990f8,_0x154414){if([0x1,0x4,0x7][_0x3ac2('0x6f')](_0x154414))_0x4990f8-=0x1;if([0x3,0x6,0x9]['includes'](_0x154414))_0x4990f8+=0x1;return this[_0x3ac2('0x108')](_0x4990f8);},Game_Map[_0x3ac2('0x1f1')]['roundYWithDirection']=function(_0x3eee58,_0xef3437){if([0x1,0x2,0x3]['includes'](_0xef3437))_0x3eee58+=0x1;if([0x7,0x8,0x9][_0x3ac2('0x6f')](_0xef3437))_0x3eee58-=0x1;return this[_0x3ac2('0x256')](_0x3eee58);},Game_Map[_0x3ac2('0x1f1')][_0x3ac2('0x1a')]=function(_0x4576b2,_0x591e82,_0x591b49,_0x2c18f3){return Math['max'](Math[_0x3ac2('0x2a1')](this[_0x3ac2('0x100')](_0x4576b2,_0x591b49)),Math[_0x3ac2('0x2a1')](this[_0x3ac2('0x174')](_0x591e82,_0x2c18f3)));},Game_Map['prototype'][_0x3ac2('0x3a1')]=function(){const _0x344b29=VisuMZ['EventsMoveCore']['Settings'][_0x3ac2('0x286')],_0x106797={},_0x1e9cbc=[_0x3ac2('0x141'),_0x3ac2('0x292'),_0x3ac2('0x2a')],_0x10b67d=[_0x3ac2('0x1c'),_0x3ac2('0xbb'),'Player','Event',_0x3ac2('0x245'),_0x3ac2('0xb5'),_0x3ac2('0x2cb'),_0x3ac2('0x264')];for(const _0x140597 of _0x1e9cbc){if(_0x3ac2('0x39e')===_0x3ac2('0x39e'))for(const _0x35f461 of _0x10b67d){if('tvAdi'!==_0x3ac2('0x5e')){const _0xd5f824='%1%2'[_0x3ac2('0x17d')](_0x35f461,_0x140597);if(_0x344b29[_0xd5f824]){if(_0x3ac2('0x12c')===_0x3ac2('0x3bc')){function _0x2fe270(){const _0x58f129=_0x10b192(_0x34943d['$1']);_0x58f129!==_0xf815a[_0x148a26][_0x3ac2('0x3c3')]&&(_0x41de7f(_0x3ac2('0x15d')['format'](_0xe8fba6,_0x58f129)),_0x20a4f3[_0x3ac2('0xe3')]());}}else _0x106797[_0xd5f824]=_0x344b29[_0xd5f824]['slice'](0x0);}}else{function _0x3d93cc(){if(!_0x9a3128[_0x3ac2('0x3f4')]())return![];if(this[_0x3ac2('0x1ff')]?.['_erased'])return![];if(_0x22e2f0['_scene']['_encounterEffectDuration']>0x0)return![];const _0x16c8ad=_0x37fe7c['x'],_0x37354e=_0x23cf64['y'],_0x373f34=this['_event']['x'],_0xa804a2=this[_0x3ac2('0x1ff')]['y'];if(_0x107391[_0x3ac2('0x1a')](_0x16c8ad,_0x37354e,_0x373f34,_0xa804a2)>this[_0x3ac2('0x1ff')][_0x3ac2('0x300')]())return![];return!![];}}}else{function _0x2138df(){const _0x13dd15=_0x2e70a3['EventsMoveCore'][_0x3ac2('0x272')][_0x3ac2('0x111')](this),_0x2dbe19=_0x4a01a3[_0x3ac2('0x1b4')][_0x3ac2('0x1dd')]['_commonEvents'][_0x3ac2('0xe8')](_0x5e73ba=>_0x28f78f[_0x5e73ba]);return _0x13dd15[_0x3ac2('0x30b')](_0x2dbe19)[_0x3ac2('0x393')]((_0x29bafc,_0x411fb1,_0x278b35)=>_0x278b35['indexOf'](_0x29bafc)===_0x411fb1);}}}const _0x2f8c3e=$dataMap[_0x3ac2('0x296')]||'',_0x2e9870=_0x2f8c3e[_0x3ac2('0x1fa')](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i);if(_0x2e9870)for(const _0x81520f of _0x2e9870){if(_0x3ac2('0x1ac')===_0x3ac2('0x1ac')){_0x81520f[_0x3ac2('0x1fa')](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i);let _0x2ccddd=String(RegExp['$1'])[_0x3ac2('0x95')]()[_0x3ac2('0x149')](),_0x412c38=String(RegExp['$1'])['toLowerCase']()['trim']();const _0x32c886=JSON[_0x3ac2('0x217')]('['+RegExp['$3'][_0x3ac2('0x1fa')](/\d+/g)+']');_0x2ccddd=_0x2ccddd[_0x3ac2('0x3e3')](0x0)[_0x3ac2('0x2c8')]()+_0x2ccddd['slice'](0x1),_0x412c38=_0x412c38[_0x3ac2('0x3e3')](0x0)['toUpperCase']()+_0x412c38[_0x3ac2('0x19d')](0x1);const _0x43368d=_0x3ac2('0x14c')['format'](_0x2ccddd,_0x412c38);if(_0x106797[_0x43368d])_0x106797[_0x43368d]=_0x106797[_0x43368d][_0x3ac2('0x30b')](_0x32c886);}else{function _0x264e1c(){this[_0x3ac2('0x21f')][_0x3ac2('0x172')]=![];}}}this[_0x3ac2('0xde')]=_0x106797;},Game_Map[_0x3ac2('0x1f1')]['isRegionAllowPass']=function(_0x1b26be,_0x5a1c63,_0x1076c9,_0x1cca75){const _0x36603e=this['roundXWithDirection'](_0x1b26be,_0x1076c9),_0x44b9ff=this['roundYWithDirection'](_0x5a1c63,_0x1076c9),_0x4522c9=this[_0x3ac2('0x2ed')](_0x36603e,_0x44b9ff),_0x3d743b=this['_regionRules'];if(_0x3d743b[_0x3ac2('0x417')][_0x3ac2('0x6f')](_0x4522c9))return!![];else{if(_0x1cca75===_0x3ac2('0x1fc'))return _0x3d743b[_0x3ac2('0x34a')][_0x3ac2('0x6f')](_0x4522c9)||_0x3d743b[_0x3ac2('0x1e6')][_0x3ac2('0x6f')](_0x4522c9);else{if(_0x1cca75===_0x3ac2('0x179'))return _0x3d743b[_0x3ac2('0xbe')][_0x3ac2('0x6f')](_0x4522c9)||_0x3d743b[_0x3ac2('0x1e6')][_0x3ac2('0x6f')](_0x4522c9);else{if(_0x3d743b[_0x3ac2('0x385')][_0x3ac2('0x6f')](_0x4522c9)){if(_0x3ac2('0x214')!=='ZYpnv'){function _0x17970b(){if(this[_0x3ac2('0x29b')]===_0x3ef79d)this['initEventsMoveCore']();const _0x36f7b2='Map%1-Event%2'['format'](_0x5f2b5f,_0x4b7c28);delete this[_0x3ac2('0x29b')][_0x36f7b2];}}else return!![];}else{if(_0x3ac2('0xa2')===_0x3ac2('0xa2')){const _0x10d73f=_0x3ac2('0x3eb')[_0x3ac2('0x17d')](_0x1cca75[_0x3ac2('0x3e3')](0x0)['toUpperCase']()+_0x1cca75[_0x3ac2('0x19d')](0x1));if(_0x3d743b[_0x10d73f])return _0x3d743b[_0x10d73f][_0x3ac2('0x6f')](_0x4522c9);}else{function _0x5361a5(){return this[_0x3ac2('0x206')]()&&(this[_0x3ac2('0x27e')]()||this[_0x3ac2('0x2fd')]()!==0x0&&this['canPass'](this['_x'],this['_y'],this[_0x3ac2('0x2fd')]())||_0x5a8acd[_0x3ac2('0xeb')]());}}}}}}return![];},Game_Map['prototype'][_0x3ac2('0x219')]=function(_0x21834b,_0x2e62ad,_0x41b60a,_0x2525d3){const _0x313bb8=this[_0x3ac2('0x2cf')](_0x21834b,_0x41b60a),_0x5829ae=this[_0x3ac2('0x29f')](_0x2e62ad,_0x41b60a),_0x5e12f4=this[_0x3ac2('0x2ed')](_0x313bb8,_0x5829ae),_0x4c0736=this[_0x3ac2('0xde')];if(_0x4c0736['AllForbid']['includes'](_0x5e12f4))return!![];else{if(_0x2525d3==='player')return _0x4c0736[_0x3ac2('0x109')][_0x3ac2('0x6f')](_0x5e12f4)||_0x4c0736['WalkForbid'][_0x3ac2('0x6f')](_0x5e12f4);else{if(_0x2525d3===_0x3ac2('0x179')){if(_0x3ac2('0x34f')===_0x3ac2('0x34f'))return _0x4c0736[_0x3ac2('0x365')][_0x3ac2('0x6f')](_0x5e12f4)||_0x4c0736[_0x3ac2('0x117')][_0x3ac2('0x6f')](_0x5e12f4);else{function _0x2e8034(){this[_0x3ac2('0x1e9')]=!![];}}}else{if(_0x4c0736[_0x3ac2('0x3d1')][_0x3ac2('0x6f')](_0x5e12f4))return!![];else{const _0x14f900='%1Forbid'[_0x3ac2('0x17d')](_0x2525d3[_0x3ac2('0x3e3')](0x0)[_0x3ac2('0x2c8')]()+_0x2525d3[_0x3ac2('0x19d')](0x1));if(_0x4c0736[_0x14f900])return _0x4c0736[_0x14f900][_0x3ac2('0x6f')](_0x5e12f4);}}}}return![];},Game_Map[_0x3ac2('0x1f1')][_0x3ac2('0x2aa')]=function(_0x12dbb2,_0x2e672e,_0x460c89,_0x4159e8){_0x460c89=_0x4159e8===_0x3ac2('0x2f7')?0x5:_0x460c89;const _0xdc538a=this[_0x3ac2('0x2cf')](_0x12dbb2,_0x460c89),_0x51c0ab=this[_0x3ac2('0x29f')](_0x2e672e,_0x460c89),_0x4c324d=this[_0x3ac2('0x2ed')](_0xdc538a,_0x51c0ab),_0x5745f=this['_regionRules'];if(_0x5745f[_0x3ac2('0x380')]['includes'](_0x4c324d)){if(_0x3ac2('0x3af')!==_0x3ac2('0x3af')){function _0x58b225(){this[_0x3ac2('0x426')]['apply'](this,arguments);}}else return!![];}else{const _0x202397=_0x3ac2('0x252')[_0x3ac2('0x17d')](_0x4159e8[_0x3ac2('0x3e3')](0x0)[_0x3ac2('0x2c8')]()+_0x4159e8['slice'](0x1));if(_0x5745f[_0x202397])return _0x5745f[_0x202397][_0x3ac2('0x6f')](_0x4c324d);}return![];},VisuMZ['EventsMoveCore']['Game_Map_refresh']=Game_Map[_0x3ac2('0x1f1')]['refresh'],Game_Map['prototype']['refresh']=function(){VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x364')][_0x3ac2('0x111')](this),this['checkNeedForPeriodicRefresh']();},Game_Map['prototype'][_0x3ac2('0x148')]=function(){this['_needsPeriodicRefresh']=![];if(this[_0x3ac2('0x1ce')]()[_0x3ac2('0x2b0')](_0x21cf1e=>_0x21cf1e[_0x3ac2('0x374')]())){this['_needsPeriodicRefresh']=!![];return;}if(this['events']()[_0x3ac2('0x2b0')](_0xdb4b02=>_0xdb4b02['hasCPCs']())){this[_0x3ac2('0xb2')]=!![];return;}if(this[_0x3ac2('0x3da')][_0x3ac2('0x2b0')](_0x577d43=>_0x577d43[_0x3ac2('0x374')]())){this[_0x3ac2('0xb2')]=!![];return;}if(this[_0x3ac2('0x3da')][_0x3ac2('0x2b0')](_0x439e4f=>_0x439e4f[_0x3ac2('0x123')]())){if(_0x3ac2('0x228')==='hhpPH'){this[_0x3ac2('0xb2')]=!![];return;}else{function _0x4946a9(){if(this[_0x3ac2('0x85')])return![];return this['_character'][_0x3ac2('0x259')]()&&!this['_character'][_0x3ac2('0x18')]()&&!this['_character'][_0x3ac2('0x3a')]()&&this[_0x3ac2('0x3f6')]()===0x0;}}}},VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x41c')]=Game_Map[_0x3ac2('0x1f1')]['update'],Game_Map[_0x3ac2('0x1f1')][_0x3ac2('0x355')]=function(_0x4db43f){this[_0x3ac2('0x50')](),VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x41c')][_0x3ac2('0x111')](this,_0x4db43f);},Game_Map[_0x3ac2('0x1f1')]['updatePeriodicRefresh']=function(){if(!this[_0x3ac2('0xb2')])return;this[_0x3ac2('0x333')]=this[_0x3ac2('0x333')]||0x3c,this[_0x3ac2('0x333')]--,this[_0x3ac2('0x333')]<=0x0&&(this['requestRefresh'](),this[_0x3ac2('0x333')]=0x3c);},VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x2f1')]=Game_Map[_0x3ac2('0x1f1')][_0x3ac2('0x1c7')],Game_Map[_0x3ac2('0x1f1')]['isDashDisabled']=function(){if(!$gameSystem[_0x3ac2('0x283')]())return!![];return VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x2f1')][_0x3ac2('0x111')](this);},Game_Map[_0x3ac2('0x1f1')][_0x3ac2('0x2ac')]=function(){this[_0x3ac2('0x139')]=![];const _0x1d2cb1=$dataMap[_0x3ac2('0x296')]||'';if(_0x1d2cb1[_0x3ac2('0x1fa')](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)){if(_0x3ac2('0x394')==='IeUge')this[_0x3ac2('0x139')]=!![];else{function _0xee6558(){_0x10c092[_0x3ac2('0x7c')]();}}}},Game_Map[_0x3ac2('0x1f1')][_0x3ac2('0x401')]=function(){if(this[_0x3ac2('0x139')]===undefined)this[_0x3ac2('0x2ac')]();return this[_0x3ac2('0x139')];},Game_Map[_0x3ac2('0x1f1')][_0x3ac2('0x1')]=function(_0x2192ae){_0x2192ae!==this[_0x3ac2('0x335')]()&&$gamePlayer&&$gameSystem[_0x3ac2('0x1')](_0x2192ae);},Game_Map[_0x3ac2('0x1f1')][_0x3ac2('0x208')]=function(){this[_0x3ac2('0xb9')]=$gameSystem['getMapSpawnedEventData'](this['mapId']()),this[_0x3ac2('0x93')]=!![];},VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x3d3')]=Game_Map[_0x3ac2('0x1f1')][_0x3ac2('0x1ce')],Game_Map[_0x3ac2('0x1f1')][_0x3ac2('0x1ce')]=function(){if(this[_0x3ac2('0x22')])return this[_0x3ac2('0x22')];const _0x5325fd=VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x3d3')][_0x3ac2('0x111')](this),_0x3b12a7=_0x5325fd[_0x3ac2('0x30b')](this['_spawnedEvents']||[]);return this[_0x3ac2('0x22')]=_0x3b12a7[_0x3ac2('0x393')](_0x48d74f=>!!_0x48d74f),this[_0x3ac2('0x22')];},VisuMZ['EventsMoveCore']['Game_Map_event']=Game_Map['prototype'][_0x3ac2('0x179')],Game_Map['prototype'][_0x3ac2('0x179')]=function(_0x3e24cb){return _0x3e24cb>=0x3e8?(_0x3e24cb-=0x3e8,this[_0x3ac2('0xb9')][_0x3e24cb]):VisuMZ['EventsMoveCore'][_0x3ac2('0x233')][_0x3ac2('0x111')](this,_0x3e24cb);},Game_Map[_0x3ac2('0x1f1')][_0x3ac2('0x222')]=function(_0x351f30){const _0x51fa26=this[_0x3ac2('0x179')](_0x351f30);if(_0x51fa26)_0x51fa26[_0x3ac2('0x10f')]();},Game_Map[_0x3ac2('0x1f1')][_0x3ac2('0x3fe')]=function(_0x30497b){$gameTemp[_0x3ac2('0x23')]=_0x30497b;const _0x35bae0=new Game_Event(_0x30497b['mapId'],_0x30497b[_0x3ac2('0x32c')]);$gameTemp[_0x3ac2('0x23')]=undefined,this[_0x3ac2('0xb9')][_0x3ac2('0x2c0')](_0x35bae0),_0x35bae0[_0x3ac2('0x433')](_0x30497b),this[_0x3ac2('0xd9')]();},Game_Map[_0x3ac2('0x1f1')]['prepareSpawnedEventAtXY']=function(_0x36702a,_0x5be6fe,_0x1c3586){const _0x4f8b13=_0x36702a['x'],_0x5c796b=_0x36702a['y'];if(!this[_0x3ac2('0x33a')](_0x4f8b13,_0x5c796b))return;if(_0x5be6fe){if('fQRhZ'!=='rdlcn'){if(this[_0x3ac2('0x17a')](_0x4f8b13,_0x5c796b)[_0x3ac2('0x2b4')]>0x0)return;if($gamePlayer['x']===_0x4f8b13&&$gamePlayer['y']===_0x5c796b)return;if(this[_0x3ac2('0xb7')]()[_0x3ac2('0x16d')](_0x4f8b13,_0x5c796b))return;if(this[_0x3ac2('0x140')]()[_0x3ac2('0x16d')](_0x4f8b13,_0x5c796b))return;}else{function _0x476152(){this[_0x3ac2('0x2c9')]('CallEvent');}}}if(_0x1c3586){if(_0x3ac2('0x1f0')===_0x3ac2('0x215')){function _0x2a8a7c(){return this['posEventsMoveCore'](_0xbeb95,_0x20c607);}}else{if(!this['isPassableByAnyDirection'](_0x4f8b13,_0x5c796b))return;}}this[_0x3ac2('0x3fe')](_0x36702a);},Game_Map['prototype'][_0x3ac2('0x2e8')]=function(_0x1608f3,_0x225ced,_0x52d938,_0x4a252f){const _0x38d53e=[],_0x4aad9a=this['width'](),_0xfd1deb=this[_0x3ac2('0x280')]();for(let _0x428b82=0x0;_0x428b82<_0x4aad9a;_0x428b82++){for(let _0x484a69=0x0;_0x484a69<_0xfd1deb;_0x484a69++){if(!_0x225ced[_0x3ac2('0x6f')](this[_0x3ac2('0x2ed')](_0x428b82,_0x484a69)))continue;if(!this[_0x3ac2('0x33a')](_0x428b82,_0x484a69))continue;if(_0x52d938){if(this[_0x3ac2('0x17a')](_0x428b82,_0x484a69)[_0x3ac2('0x2b4')]>0x0)continue;if($gamePlayer['x']===_0x428b82&&$gamePlayer['y']===_0x484a69)continue;if(this[_0x3ac2('0xb7')]()[_0x3ac2('0x16d')](_0x428b82,_0x484a69))continue;if(this[_0x3ac2('0x140')]()[_0x3ac2('0x16d')](_0x428b82,_0x484a69))continue;}if(_0x4a252f){if(!this[_0x3ac2('0x3cc')](_0x428b82,_0x484a69))continue;}_0x38d53e[_0x3ac2('0x2c0')]([_0x428b82,_0x484a69]);}}if(_0x38d53e['length']>0x0){if(_0x3ac2('0x187')===_0x3ac2('0x187')){const _0x20eb31=_0x38d53e[Math[_0x3ac2('0x41d')](_0x38d53e[_0x3ac2('0x2b4')])];_0x1608f3['x']=_0x20eb31[0x0],_0x1608f3['y']=_0x20eb31[0x1],this[_0x3ac2('0x3fe')](_0x1608f3);}else{function _0x1a5600(){return this[_0x3ac2('0x314')](_0x2ec648(_0xa59465['$1']));}}}},Game_Map[_0x3ac2('0x1f1')][_0x3ac2('0x3cc')]=function(_0x122ffd,_0x4b065a){if(this[_0x3ac2('0x14')](_0x122ffd,_0x4b065a,0x2))return!![];if(this['isPassable'](_0x122ffd,_0x4b065a,0x4))return!![];if(this[_0x3ac2('0x14')](_0x122ffd,_0x4b065a,0x6))return!![];if(this[_0x3ac2('0x14')](_0x122ffd,_0x4b065a,0x8))return!![];return![];},Game_Map[_0x3ac2('0x1f1')][_0x3ac2('0x2fb')]=function(_0x1612ea){if(_0x1612ea<0x3e8)return;if(!this[_0x3ac2('0xb9')])return;const _0x2757e2=this['event'](_0x1612ea);_0x2757e2[_0x3ac2('0x1b6')](-0x1,-0x1),_0x2757e2['erase'](),this['_spawnedEvents'][_0x1612ea-0x3e8]=null,this[_0x3ac2('0xd9')]();},Game_Map[_0x3ac2('0x1f1')]['firstSpawnedEvent']=function(){for(const _0x4ac65d of this['_spawnedEvents']){if(_0x3ac2('0x86')===_0x3ac2('0x402')){function _0x17ae7b(){_0x6d2dcc[0x2]=_0x5e0d51(_0x199287)[_0x3ac2('0x3e3')](0x0)[_0x3ac2('0x2c8')]()[_0x3ac2('0x149')]();}}else{if(_0x4ac65d)return _0x4ac65d;}}return null;},Game_Map['prototype'][_0x3ac2('0x1ea')]=function(){const _0x4c043e=this[_0x3ac2('0x2a5')]();return _0x4c043e?_0x4c043e[_0x3ac2('0x221')]:0x0;},Game_Map[_0x3ac2('0x1f1')]['lastSpawnedEvent']=function(){const _0x5ea586=this[_0x3ac2('0xb9')][_0x3ac2('0x19d')](0x0)[_0x3ac2('0x9b')]();for(const _0x23a531 of _0x5ea586){if(_0x3ac2('0x1aa')==='ptFqa'){if(_0x23a531)return _0x23a531;}else{function _0x3bed53(){if(!this[_0x3ac2('0x423')](this['_x'],this['_y'],_0x594e54))return this[_0x3ac2('0x19')](_0x45a728);if(!this[_0x3ac2('0x423')](this['_x'],this['_y'],_0x4e8eff))return this[_0x3ac2('0x19')](_0x555336);if(!this[_0x3ac2('0xbc')](this['_x'],this['_y'],_0x584eb4,_0x36d0d2)){let _0x3705d0=_0x29e1ef[_0x3ac2('0x1b4')][_0x3ac2('0x1d5')][_0x3ac2('0x23e')][_0x3ac2('0x3cb')]?_0x3ccaca:_0x20c113;return this[_0x3ac2('0x19')](_0x3705d0);}}}}return null;},Game_Map['prototype'][_0x3ac2('0x144')]=function(){const _0x29f9f7=this[_0x3ac2('0x2b9')]();return _0x29f9f7?_0x29f9f7[_0x3ac2('0x221')]:0x0;},Game_Map[_0x3ac2('0x1f1')][_0x3ac2('0x196')]=function(_0x4c0990,_0x28f971){const _0x3e7b06=this[_0x3ac2('0x17a')](_0x4c0990,_0x28f971);for(const _0x367251 of _0x3e7b06){if(!_0x367251)continue;if(_0x367251['isSpawnedEvent']())this[_0x3ac2('0x2fb')](_0x367251[_0x3ac2('0x221')]);}},Game_Map['prototype'][_0x3ac2('0x78')]=function(_0x49f339){for(const _0x260ced of this[_0x3ac2('0xb9')]){if('VrWce'!=='EuBOQ'){if(!_0x260ced)continue;if(_0x49f339[_0x3ac2('0x6f')](_0x260ced['regionId']())){if('vNvJq'==='vNvJq')this[_0x3ac2('0x2fb')](_0x260ced['_eventId']);else{function _0x2a303f(){if([0x2,0x4,0x6,0x8][_0x3ac2('0x6f')](_0x1484ef))return 0x4;if([0x1,0x3,0x7,0x9][_0x3ac2('0x6f')](_0x385d13))return 0x5;}}}}else{function _0x31849e(){this[_0x3ac2('0x261')]=_0x271f64(_0x20c4e0['$1']);}}}},Game_Map[_0x3ac2('0x1f1')][_0x3ac2('0x3e')]=function(){for(const _0x57ea57 of this[_0x3ac2('0xb9')]){if(!_0x57ea57)continue;this[_0x3ac2('0x2fb')](_0x57ea57[_0x3ac2('0x221')]);}},Game_CommonEvent[_0x3ac2('0x1f1')][_0x3ac2('0x374')]=function(){const _0x56b1be=this['event']();return this['isActive']()&&_0x56b1be[_0x3ac2('0x104')]>=0x1&&DataManager[_0x3ac2('0x1da')](_0x56b1be[_0x3ac2('0x151')]);},Game_CommonEvent[_0x3ac2('0x1f1')][_0x3ac2('0x123')]=function(){return VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x1dd')][_0x3ac2('0x3da')][_0x3ac2('0x6f')](this[_0x3ac2('0xfd')]);},VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x389')]=Game_CommonEvent['prototype']['isActive'],Game_CommonEvent[_0x3ac2('0x1f1')]['isActive']=function(){return VisuMZ['EventsMoveCore']['Game_CommonEvent_isActive'][_0x3ac2('0x111')](this)?!![]:VisuMZ['EventsMoveCore']['CustomPageConditions'][_0x3ac2('0x276')](this['event']()['CPC'],this[_0x3ac2('0xfd')]);},VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x272')]=Game_Map[_0x3ac2('0x1f1')][_0x3ac2('0xe4')],Game_Map[_0x3ac2('0x1f1')][_0x3ac2('0xe4')]=function(){const _0x5b29b1=VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x272')][_0x3ac2('0x111')](this),_0x7d1057=VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x1dd')]['_commonEvents'][_0x3ac2('0xe8')](_0x295ecb=>$dataCommonEvents[_0x295ecb]);return _0x5b29b1[_0x3ac2('0x30b')](_0x7d1057)['filter']((_0x863212,_0x1c852b,_0x4e2714)=>_0x4e2714[_0x3ac2('0x129')](_0x863212)===_0x1c852b);},VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0xc3')]=Game_CharacterBase[_0x3ac2('0x1f1')][_0x3ac2('0x22f')],Game_CharacterBase[_0x3ac2('0x1f1')][_0x3ac2('0x22f')]=function(){VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0xc3')]['call'](this),this[_0x3ac2('0x6')]();},Game_CharacterBase[_0x3ac2('0x1f1')][_0x3ac2('0x6')]=function(){this[_0x3ac2('0x4d')]=![],this[_0x3ac2('0x3b3')](),this[_0x3ac2('0x414')](),this['clearSpriteOffsets'](),this[_0x3ac2('0x36e')]();},Game_CharacterBase[_0x3ac2('0x1f1')][_0x3ac2('0x29')]=function(){if(this[_0x3ac2('0x54')]===Game_Player&&this[_0x3ac2('0x107')]()){if(_0x3ac2('0x30')===_0x3ac2('0x48')){function _0x43aceb(){this[_0x3ac2('0x315')]=!![];}}else return this[_0x3ac2('0x207')]()['characterName']()['match'](/\[VS8\]/i);}else return Imported[_0x3ac2('0x3f7')]&&this[_0x3ac2('0x1a5')]()?!![]:this['characterName']()[_0x3ac2('0x1fa')](/\[VS8\]/i);},VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x21c')]=Game_CharacterBase[_0x3ac2('0x1f1')][_0x3ac2('0x2c6')],Game_CharacterBase[_0x3ac2('0x1f1')][_0x3ac2('0x2c6')]=function(){if(this[_0x3ac2('0x18')]()&&!this[_0x3ac2('0x1bb')]()&&this[_0x3ac2('0x29')]()){if('yWgfv'===_0x3ac2('0x96')){function _0x46bf13(){this[_0x3ac2('0x235')]=_0x170726['moveRouteIndex'];}}else return this['directionOnLadderSpriteVS8dir']();}else{if(this[_0x3ac2('0x18')]()&&!this[_0x3ac2('0x1bb')]()){if(_0x3ac2('0x12f')!==_0x3ac2('0x166'))return 0x8;else{function _0x48f129(){return _0x4665ad>0x0?0x6:0x4;}}}else{if(this['isPosing']()&&this['isSpriteVS8dir']()){if('nFWbc'===_0x3ac2('0x9')){function _0x45ed7d(){this[_0x3ac2('0x26f')][_0x3ac2('0xf0')]=_0x4d05df(_0x161567['$1']),this[_0x3ac2('0x26f')][_0x3ac2('0x61')]=_0x5871f5(_0x300377['$2']);}}else return this[_0x3ac2('0x36a')]();}else return VisuMZ['EventsMoveCore'][_0x3ac2('0x21c')][_0x3ac2('0x111')](this);}}},VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x1f5')]=Game_CharacterBase[_0x3ac2('0x1f1')][_0x3ac2('0x29a')],Game_CharacterBase[_0x3ac2('0x1f1')][_0x3ac2('0x29a')]=function(_0x2cd372){if(!this[_0x3ac2('0x29')]())_0x2cd372=this[_0x3ac2('0x12a')](_0x2cd372);VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x1f5')][_0x3ac2('0x111')](this,_0x2cd372);},Game_CharacterBase[_0x3ac2('0x1f1')][_0x3ac2('0x12a')]=function(_0x1c7a8d){if(_0x1c7a8d===0x1)return this[_0x3ac2('0x423')](this['_x'],this['_y'],0x4)?0x4:0x2;if(_0x1c7a8d===0x3)return this[_0x3ac2('0x423')](this['_x'],this['_y'],0x6)?0x6:0x2;if(_0x1c7a8d===0x7)return this[_0x3ac2('0x423')](this['_x'],this['_y'],0x4)?0x4:0x8;if(_0x1c7a8d===0x9)return this['canPass'](this['_x'],this['_y'],0x6)?0x6:0x8;return _0x1c7a8d;},Game_CharacterBase[_0x3ac2('0x1f1')][_0x3ac2('0x23f')]=function(_0xcb9e28){return[0x1,0x3,0x5,0x7,0x9]['includes'](_0xcb9e28);},Game_CharacterBase[_0x3ac2('0x1f1')][_0x3ac2('0x322')]=function(){return this[_0x3ac2('0x1cb')]||0x0;},VisuMZ[_0x3ac2('0x1b4')]['Game_CharacterBase_moveStraight']=Game_CharacterBase[_0x3ac2('0x1f1')][_0x3ac2('0x19')],Game_CharacterBase[_0x3ac2('0x1f1')]['moveStraight']=function(_0x5987ba){this['_lastMovedDirection']=_0x5987ba,VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x59')][_0x3ac2('0x111')](this,_0x5987ba);},Game_CharacterBase[_0x3ac2('0x1f1')][_0x3ac2('0x45')]=function(_0x1f5395){if(!this[_0x3ac2('0x23f')](_0x1f5395))return this[_0x3ac2('0x19')](_0x1f5395);let _0x58f8cc=0x0,_0x32011b=0x0;switch(_0x1f5395){case 0x1:_0x58f8cc=0x4,_0x32011b=0x2;break;case 0x3:_0x58f8cc=0x6,_0x32011b=0x2;break;case 0x7:_0x58f8cc=0x4,_0x32011b=0x8;break;case 0x9:_0x58f8cc=0x6,_0x32011b=0x8;break;}if(VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x1d5')][_0x3ac2('0x23e')][_0x3ac2('0x7e')]){if(!this[_0x3ac2('0x423')](this['_x'],this['_y'],_0x58f8cc))return this[_0x3ac2('0x19')](_0x32011b);if(!this[_0x3ac2('0x423')](this['_x'],this['_y'],_0x32011b)){if(_0x3ac2('0x134')===_0x3ac2('0x2e9')){function _0x209d83(){_0x3071f2[_0x3ac2('0x279')](_0x26aa20,_0x5689a1),_0x191ff9['setEventIconData'](_0x37c496,_0x2135c6['IconIndex'],_0x5c3513[_0x3ac2('0x106')],_0x1424ed[_0x3ac2('0x115')],_0x1a65ca['IconBlendMode']);}}else return this[_0x3ac2('0x19')](_0x58f8cc);}if(!this[_0x3ac2('0xbc')](this['_x'],this['_y'],_0x58f8cc,_0x32011b)){let _0x54fffa=VisuMZ[_0x3ac2('0x1b4')]['Settings'][_0x3ac2('0x23e')][_0x3ac2('0x3cb')]?_0x58f8cc:_0x32011b;return this[_0x3ac2('0x19')](_0x54fffa);}}this[_0x3ac2('0x1cb')]=_0x1f5395,this['moveDiagonally'](_0x58f8cc,_0x32011b);},VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x210')]=Game_CharacterBase[_0x3ac2('0x1f1')][_0x3ac2('0x34b')],Game_CharacterBase[_0x3ac2('0x1f1')][_0x3ac2('0x34b')]=function(){let _0x406094=this[_0x3ac2('0x387')];return this[_0x3ac2('0x206')]()&&(_0x406094+=this[_0x3ac2('0x169')]()),this[_0x3ac2('0x2b8')](_0x406094);},Game_CharacterBase[_0x3ac2('0x1f1')][_0x3ac2('0x169')]=function(){const _0x4c9f07=VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x1d5')][_0x3ac2('0x23e')];if(_0x4c9f07[_0x3ac2('0x28f')]!==undefined){if(_0x3ac2('0x7d')!==_0x3ac2('0x2e1'))return _0x4c9f07[_0x3ac2('0x28f')];else{function _0x4f044d(){if(this['_EventsMoveCoreSettings']===_0x50fbb5)this[_0x3ac2('0x399')]();if(this[_0x3ac2('0xf8')][_0x3ac2('0x2a0')]===_0x45538b)this[_0x3ac2('0x399')]();return this[_0x3ac2('0xf8')][_0x3ac2('0x2a0')];}}}else return VisuMZ[_0x3ac2('0x1b4')]['Game_CharacterBase_realMoveSpeed']['call'](this)-this['_moveSpeed'];},Game_CharacterBase[_0x3ac2('0x1f1')][_0x3ac2('0x2b8')]=function(_0x4da38c){const _0xbdcf3e=VisuMZ['EventsMoveCore'][_0x3ac2('0x1d5')][_0x3ac2('0x23e')];if(!_0xbdcf3e[_0x3ac2('0x384')])return _0x4da38c;return[0x1,0x3,0x7,0x9][_0x3ac2('0x6f')](this[_0x3ac2('0x1cb')])&&(_0x4da38c*=_0xbdcf3e[_0x3ac2('0x270')]||0.01),_0x4da38c;},VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x42d')]=Game_CharacterBase[_0x3ac2('0x1f1')]['isDashing'],Game_CharacterBase[_0x3ac2('0x1f1')][_0x3ac2('0x206')]=function(){if(this[_0x3ac2('0x21e')])return!![];return VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x42d')][_0x3ac2('0x111')](this);},Game_CharacterBase[_0x3ac2('0x1f1')][_0x3ac2('0x259')]=function(){return this[_0x3ac2('0x206')]();},VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x32d')]=Game_CharacterBase[_0x3ac2('0x1f1')]['pattern'],Game_CharacterBase[_0x3ac2('0x1f1')][_0x3ac2('0x1b0')]=function(){if(this[_0x3ac2('0x3a')]())return this[_0x3ac2('0x2bb')]();else{if('OPLiO'!=='aaMlR')return VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x32d')][_0x3ac2('0x111')](this);else{function _0xf41f2b(){const _0x36c759=_0x2ec45c(_0x228663['$1']);if(_0x36c759[_0x3ac2('0x1fa')](/PLAYER/i))this[_0x3ac2('0x1bd')][_0x3ac2('0x382')]=0x0;else _0x36c759[_0x3ac2('0x1fa')](/EVENT[ ](\d+)/i)&&(this[_0x3ac2('0x1bd')][_0x3ac2('0x382')]=_0x3c148b(_0xb389ff['$1']));}}}},VisuMZ['EventsMoveCore']['Game_CharacterBase_increaseSteps']=Game_CharacterBase['prototype']['increaseSteps'],Game_CharacterBase['prototype'][_0x3ac2('0x24')]=function(){VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x2ee')]['call'](this),this['clearPose']();},VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x1a6')]=Game_CharacterBase[_0x3ac2('0x1f1')]['characterIndex'],Game_CharacterBase[_0x3ac2('0x1f1')][_0x3ac2('0x410')]=function(){if(this[_0x3ac2('0x29')]())return this[_0x3ac2('0x1d7')]();return VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x1a6')][_0x3ac2('0x111')](this);},Game_CharacterBase['prototype']['characterIndexVS8']=function(){const _0x3b6058=this[_0x3ac2('0x2c6')]();if(this[_0x3ac2('0x1bb')]()){if(_0x3ac2('0x3d')===_0x3ac2('0x278')){function _0x222bde(){_0x3e72bf=[_0x59e2bf,_0x4cf9cf,_0x494f10[_0x3ac2('0x2c8')]()[_0x3ac2('0x149')]()];}}else{if([0x2,0x4,0x6,0x8][_0x3ac2('0x6f')](_0x3b6058))return 0x4;if([0x1,0x3,0x7,0x9][_0x3ac2('0x6f')](_0x3b6058))return 0x5;}}else{if(this[_0x3ac2('0x18')]())return 0x6;else{if(this[_0x3ac2('0x3a')]())return this[_0x3ac2('0x421')]();else{if(this['_forceCarrying']){if([0x2,0x4,0x6,0x8][_0x3ac2('0x6f')](_0x3b6058))return 0x4;if([0x1,0x3,0x7,0x9][_0x3ac2('0x6f')](_0x3b6058))return 0x5;}else{if(this[_0x3ac2('0x2c')]()&&this[_0x3ac2('0x1a9')]()){if([0x2,0x4,0x6,0x8]['includes'](_0x3b6058))return 0x4;if([0x1,0x3,0x7,0x9][_0x3ac2('0x6f')](_0x3b6058))return 0x5;}else{if(this[_0x3ac2('0x259')]()){if(_0x3ac2('0x16f')!==_0x3ac2('0xd0')){if([0x2,0x4,0x6,0x8][_0x3ac2('0x6f')](_0x3b6058))return 0x2;if([0x1,0x3,0x7,0x9]['includes'](_0x3b6058))return 0x3;}else{function _0xb4d027(){_0x241892=_0x589c5a(_0x523237['$1']),_0xbbe673=_0x46dd47(_0x342f88['$2']);}}}else{if([0x2,0x4,0x6,0x8][_0x3ac2('0x6f')](_0x3b6058))return 0x0;if([0x1,0x3,0x7,0x9][_0x3ac2('0x6f')](_0x3b6058))return 0x1;}}}}}}},Game_CharacterBase[_0x3ac2('0x1f1')]['useCarryPoseForIcons']=function(){return VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x1d5')][_0x3ac2('0xaa')][_0x3ac2('0x5d')];},Game_CharacterBase[_0x3ac2('0x1f1')][_0x3ac2('0x118')]=function(){return this[_0x3ac2('0x18')]()&&this[_0x3ac2('0x25a')]()===VisuMZ['EventsMoveCore'][_0x3ac2('0x1d5')][_0x3ac2('0x122')]['Rope'];},Game_CharacterBase[_0x3ac2('0x1f1')]['directionOnLadderSpriteVS8dir']=function(){if(this[_0x3ac2('0x118')]()){if(_0x3ac2('0x1ae')!==_0x3ac2('0x1ae')){function _0x3bf067(){this[_0x3ac2('0x1ff')][_0x3ac2('0x26a')]()!==this[_0x3ac2('0x51')]&&(this['_text']=this[_0x3ac2('0x1ff')][_0x3ac2('0x26a')](),this[_0x3ac2('0x133')]());}}else return 0x4;}else return 0x2;},VisuMZ[_0x3ac2('0x1b4')]['Game_CharacterBase_update']=Game_CharacterBase[_0x3ac2('0x1f1')][_0x3ac2('0x355')],Game_CharacterBase['prototype'][_0x3ac2('0x355')]=function(){VisuMZ['EventsMoveCore'][_0x3ac2('0x32')][_0x3ac2('0x111')](this),this[_0x3ac2('0x360')]();},Game_CharacterBase[_0x3ac2('0x1f1')][_0x3ac2('0x360')]=function(){this[_0x3ac2('0x163')]=this[_0x3ac2('0x163')]||0x0;if(this[_0x3ac2('0x163')]>0x0){if('FTUqQ'!=='oYdXQ'){this['_poseDuration']--;if(this[_0x3ac2('0x163')]<=0x0&&this[_0x3ac2('0x1c8')]!==_0x3ac2('0x3b8'))this[_0x3ac2('0x3b3')]();}else{function _0x537e0f(){this[_0x3ac2('0x51')]=this[_0x3ac2('0x1ff')][_0x3ac2('0x26a')](),this['refresh']();}}}},VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x3e9')]=Game_CharacterBase[_0x3ac2('0x1f1')][_0x3ac2('0x70')],Game_CharacterBase[_0x3ac2('0x1f1')]['moveDiagonally']=function(_0x48252b,_0x35b91a){VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x3e9')][_0x3ac2('0x111')](this,_0x48252b,_0x35b91a);if(this[_0x3ac2('0x29')]())this['setDiagonalDirection'](_0x48252b,_0x35b91a);},Game_CharacterBase['prototype'][_0x3ac2('0x3ad')]=function(_0x11d5ef,_0x43e294){if(_0x11d5ef===0x4&&_0x43e294===0x2)this['setDirection'](0x1);if(_0x11d5ef===0x6&&_0x43e294===0x2)this['setDirection'](0x3);if(_0x11d5ef===0x4&&_0x43e294===0x8)this['setDirection'](0x7);if(_0x11d5ef===0x6&&_0x43e294===0x8)this[_0x3ac2('0x29a')](0x9);},VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x170')]=Game_CharacterBase[_0x3ac2('0x1f1')][_0x3ac2('0xcb')],Game_CharacterBase['prototype'][_0x3ac2('0xcb')]=function(){if(this['isPosing']()&&this[_0x3ac2('0x263')]()==='ZZZ')return!![];return VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x170')][_0x3ac2('0x111')](this);},Game_CharacterBase[_0x3ac2('0x1f1')]['setPose']=function(_0x41376c,_0x40c051){if(_0x41376c[_0x3ac2('0x1fa')](/Z/i))_0x41376c=_0x3ac2('0x3b8');if(_0x41376c['match'](/SLEEP/i))_0x41376c=_0x3ac2('0x3b8');this[_0x3ac2('0x29')]()&&(this[_0x3ac2('0x1c8')]=_0x41376c['toUpperCase']()[_0x3ac2('0x149')](),this[_0x3ac2('0x163')]=_0x40c051||Infinity);},Game_CharacterBase[_0x3ac2('0x1f1')]['getPose']=function(){if(this[_0x3ac2('0x29')]()){if(_0x3ac2('0x220')===_0x3ac2('0x220'))return(this[_0x3ac2('0x1c8')]||'')[_0x3ac2('0x2c8')]()['trim']();else{function _0x4d006c(){const _0x4fd1f5=_0x3ac2('0x21b')[_0x3ac2('0x17d')](_0x5cebe7[_0x3ac2('0x3e3')](0x0)['toUpperCase']()+_0xfdfdb7[_0x3ac2('0x19d')](0x1));if(_0x1eae45[_0x4fd1f5])return _0x12583f[_0x4fd1f5][_0x3ac2('0x6f')](_0x4b48dc);}}}else return''[_0x3ac2('0x2c8')]()[_0x3ac2('0x149')]();},Game_CharacterBase[_0x3ac2('0x1f1')][_0x3ac2('0x293')]=function(_0x2c8515,_0x5f5766){if(this[_0x3ac2('0x29')]()){const _0x521bca=['',_0x3ac2('0xc6'),'QUESTION',_0x3ac2('0xea'),_0x3ac2('0x1d4'),_0x3ac2('0x412'),_0x3ac2('0xaf'),'COBWEB',_0x3ac2('0x11b'),'LIGHT\x20BULB',_0x3ac2('0x3b8'),'','','','',''][_0x2c8515];this[_0x3ac2('0x3b4')](_0x521bca,_0x5f5766);}},Game_CharacterBase['prototype'][_0x3ac2('0x3b3')]=function(){this[_0x3ac2('0x1c8')]='',this['_poseDuration']=0x0;},Game_CharacterBase[_0x3ac2('0x1f1')][_0x3ac2('0x3a')]=function(){return this[_0x3ac2('0x29')]()&&!!this['_pose'];},Game_CharacterBase[_0x3ac2('0x1f1')][_0x3ac2('0x421')]=function(){const _0x160958=this[_0x3ac2('0x1c8')][_0x3ac2('0x2c8')]();switch(this[_0x3ac2('0x1c8')][_0x3ac2('0x2c8')]()[_0x3ac2('0x149')]()){case'ITEM':case _0x3ac2('0x55'):case _0x3ac2('0x1b8'):case _0x3ac2('0x22e'):case'KNEEL':case _0x3ac2('0x305'):return 0x6;break;default:return 0x7;break;}},Game_CharacterBase[_0x3ac2('0x1f1')][_0x3ac2('0x36a')]=function(){switch(this[_0x3ac2('0x1c8')][_0x3ac2('0x2c8')]()){case _0x3ac2('0xc6'):case _0x3ac2('0x243'):case'MUSIC\x20NOTE':return 0x2;break;case _0x3ac2('0x1d4'):case _0x3ac2('0x412'):case _0x3ac2('0xaf'):return 0x4;break;case'ITEM':case'HMPH':case _0x3ac2('0x1b8'):case _0x3ac2('0x194'):case _0x3ac2('0x11b'):case _0x3ac2('0x403'):return 0x6;break;case'HURT':case _0x3ac2('0x77'):case _0x3ac2('0x305'):case _0x3ac2('0x3b8'):case _0x3ac2('0x183'):return 0x8;break;default:return VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x1f5')][_0x3ac2('0x111')](this);break;}},Game_CharacterBase['prototype'][_0x3ac2('0x2bb')]=function(){switch(this['_pose']['toUpperCase']()){case'ITEM':case _0x3ac2('0x22e'):case _0x3ac2('0xc6'):case _0x3ac2('0x1d4'):case _0x3ac2('0x194'):return 0x0;break;case _0x3ac2('0x55'):case _0x3ac2('0x77'):case _0x3ac2('0x243'):case _0x3ac2('0x412'):case _0x3ac2('0x11b'):return 0x1;break;case'VICTORY':case _0x3ac2('0x305'):case _0x3ac2('0xea'):case _0x3ac2('0xaf'):case _0x3ac2('0x403'):return 0x2;break;default:return VisuMZ[_0x3ac2('0x1b4')]['Game_CharacterBase_pattern'][_0x3ac2('0x111')](this);break;}},Game_CharacterBase[_0x3ac2('0x1f1')][_0x3ac2('0x15')]=function(){this[_0x3ac2('0x3d7')]=!![];},Game_CharacterBase[_0x3ac2('0x1f1')][_0x3ac2('0xf3')]=function(){this[_0x3ac2('0x3d7')]=![];},Game_CharacterBase[_0x3ac2('0x1f1')][_0x3ac2('0x90')]=function(){this[_0x3ac2('0x21e')]=!![];},Game_CharacterBase[_0x3ac2('0x1f1')][_0x3ac2('0x414')]=function(){this[_0x3ac2('0x21e')]=![];},Game_CharacterBase[_0x3ac2('0x1f1')][_0x3ac2('0x2f3')]=function(){if(this[_0x3ac2('0x2ef')]())return![];if(this['_isObjectCharacter'])return![];if(this[_0x3ac2('0x201')])return![];if(this['_characterName']==='')return![];if(this['constructor']===Game_Vehicle)return![];return!![];},Game_CharacterBase[_0x3ac2('0x1f1')][_0x3ac2('0x3c0')]=function(){if(this['isOnLadder']())return!![];if(this[_0x3ac2('0x54')]===Game_Player&&this['isInVehicle']())return!![];return![];},Game_CharacterBase[_0x3ac2('0x1f1')][_0x3ac2('0x248')]=function(){return VisuMZ['EventsMoveCore'][_0x3ac2('0x1d5')][_0x3ac2('0x23e')][_0x3ac2('0x22a')];},Game_CharacterBase['prototype'][_0x3ac2('0x1d')]=function(){return this[_0x3ac2('0x155')]();},Game_CharacterBase[_0x3ac2('0x1f1')][_0x3ac2('0x11e')]=function(){return this[_0x3ac2('0x338')]()+this[_0x3ac2('0x344')]()+this[_0x3ac2('0x40a')]();},Game_Character['prototype'][_0x3ac2('0x3a8')]=function(_0x319de7,_0x3d98b0){const _0x5f2786=this[_0x3ac2('0x1ed')](),_0x5f67fd=$gameMap[_0x3ac2('0x3d9')](),_0x25e61f=[],_0x3a3a84=[],_0x28a73f=[],_0x55b9ea={};let _0x2de1f8=_0x55b9ea;if(this['x']===_0x319de7&&this['y']===_0x3d98b0)return 0x0;_0x55b9ea[_0x3ac2('0x204')]=null,_0x55b9ea['x']=this['x'],_0x55b9ea['y']=this['y'],_0x55b9ea['g']=0x0,_0x55b9ea['f']=$gameMap[_0x3ac2('0x42e')](_0x55b9ea['x'],_0x55b9ea['y'],_0x319de7,_0x3d98b0),_0x25e61f[_0x3ac2('0x2c0')](_0x55b9ea),_0x3a3a84['push'](_0x55b9ea['y']*_0x5f67fd+_0x55b9ea['x']);while(_0x25e61f['length']>0x0){if(_0x3ac2('0x357')!==_0x3ac2('0x116')){let _0x1871e1=0x0;for(let _0x3b5198=0x0;_0x3b5198<_0x25e61f[_0x3ac2('0x2b4')];_0x3b5198++){if(_0x3ac2('0x10a')===_0x3ac2('0x10a'))_0x25e61f[_0x3b5198]['f']<_0x25e61f[_0x1871e1]['f']&&(_0x1871e1=_0x3b5198);else{function _0x1dbf86(){return this['_interpreter'][_0x3ac2('0x7a')](_0x49f9fa,_0x3e0dfb),this[_0x3ac2('0x76')][_0x3ac2('0x165')](),this[_0x3ac2('0x76')]['_cpc'];}}}const _0x54913f=_0x25e61f[_0x1871e1],_0x7df8b7=_0x54913f['x'],_0x324210=_0x54913f['y'],_0x2599c9=_0x324210*_0x5f67fd+_0x7df8b7,_0x5ef2ba=_0x54913f['g'];_0x25e61f['splice'](_0x1871e1,0x1),_0x3a3a84[_0x3ac2('0xc1')](_0x3a3a84['indexOf'](_0x2599c9),0x1),_0x28a73f['push'](_0x2599c9);if(_0x54913f['x']===_0x319de7&&_0x54913f['y']===_0x3d98b0){_0x2de1f8=_0x54913f;break;}if(_0x5ef2ba>=_0x5f2786)continue;for(let _0x5bac01=0x1;_0x5bac01<0xa;_0x5bac01++){if(_0x5bac01===0x5)continue;const _0x3e00a8=_0x5bac01,_0x1d9432=[0x0,0x4,0x0,0x6,0x4,0x0,0x6,0x4,0x0,0x6][_0x5bac01],_0x1058eb=[0x0,0x2,0x2,0x2,0x0,0x0,0x0,0x8,0x8,0x8][_0x5bac01],_0x59977f=$gameMap[_0x3ac2('0x2cf')](_0x7df8b7,_0x3e00a8),_0x18b2d9=$gameMap[_0x3ac2('0x29f')](_0x324210,_0x3e00a8),_0xd77171=_0x18b2d9*_0x5f67fd+_0x59977f;if(_0x28a73f[_0x3ac2('0x6f')](_0xd77171)){if(_0x3ac2('0xe0')===_0x3ac2('0xe0'))continue;else{function _0x1f312a(){return this[_0x3ac2('0x29a')](0x7);}}}if(this[_0x3ac2('0x54')]===Game_Player&&VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x1d5')][_0x3ac2('0x23e')][_0x3ac2('0x7e')]){if(!this[_0x3ac2('0x423')](_0x7df8b7,_0x324210,_0x1d9432))continue;if(!this[_0x3ac2('0x423')](_0x7df8b7,_0x324210,_0x1058eb))continue;}if(!this[_0x3ac2('0xbc')](_0x7df8b7,_0x324210,_0x1d9432,_0x1058eb))continue;const _0x39e4d3=_0x5ef2ba+0x1,_0x44878b=_0x3a3a84[_0x3ac2('0x129')](_0xd77171);if(_0x44878b<0x0||_0x39e4d3<_0x25e61f[_0x44878b]['g']){let _0x3f385d={};if(_0x44878b>=0x0)_0x3f385d=_0x25e61f[_0x44878b];else{if('pJHHt'==='pJHHt')_0x25e61f[_0x3ac2('0x2c0')](_0x3f385d),_0x3a3a84[_0x3ac2('0x2c0')](_0xd77171);else{function _0x3e590a(){return this[_0x3ac2('0x90')]();}}}_0x3f385d[_0x3ac2('0x204')]=_0x54913f,_0x3f385d['x']=_0x59977f,_0x3f385d['y']=_0x18b2d9,_0x3f385d['g']=_0x39e4d3,_0x3f385d['f']=_0x39e4d3+$gameMap[_0x3ac2('0x42e')](_0x59977f,_0x18b2d9,_0x319de7,_0x3d98b0),(!_0x2de1f8||_0x3f385d['f']-_0x3f385d['g']<_0x2de1f8['f']-_0x2de1f8['g'])&&(_0x2de1f8=_0x3f385d);}}}else{function _0x9474d7(){return _0x829d0b[_0x3ac2('0x1b4')]['Game_CharacterBase_pattern'][_0x3ac2('0x111')](this);}}}let _0x205eda=_0x2de1f8;while(_0x205eda[_0x3ac2('0x204')]&&_0x205eda[_0x3ac2('0x204')]!==_0x55b9ea){if(_0x3ac2('0x2ad')!==_0x3ac2('0x310'))_0x205eda=_0x205eda[_0x3ac2('0x204')];else{function _0xec47a1(){return _0x5c6e2a[_0x3ac2('0x25e')](this);}}}const _0x56f047=$gameMap[_0x3ac2('0x100')](_0x205eda['x'],_0x55b9ea['x']),_0x5cb19a=$gameMap[_0x3ac2('0x174')](_0x205eda['y'],_0x55b9ea['y']);if(_0x56f047<0x0&&_0x5cb19a>0x0)return 0x1;if(_0x56f047>0x0&&_0x5cb19a>0x0)return 0x3;if(_0x56f047<0x0&&_0x5cb19a<0x0)return 0x7;if(_0x56f047>0x0&&_0x5cb19a<0x0)return 0x9;if(_0x5cb19a>0x0)return 0x2;if(_0x56f047<0x0)return 0x4;if(_0x56f047>0x0)return 0x6;if(_0x5cb19a<0x0)return 0x8;const _0x26f2ec=this[_0x3ac2('0x27b')](_0x319de7),_0xbf70b1=this[_0x3ac2('0x40f')](_0x3d98b0);if(Math[_0x3ac2('0x2a1')](_0x26f2ec)>Math[_0x3ac2('0x2a1')](_0xbf70b1))return _0x26f2ec>0x0?0x4:0x6;else{if(_0xbf70b1!==0x0)return _0xbf70b1>0x0?0x8:0x2;}return 0x0;},VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x3fd')]=Game_CharacterBase[_0x3ac2('0x1f1')][_0x3ac2('0x423')],Game_CharacterBase['prototype'][_0x3ac2('0x423')]=function(_0x51d823,_0x58fc0f,_0x3d2336){if(this[_0x3ac2('0x26e')]===_0x3ac2('0x2f7')){if(_0x3ac2('0x30a')!==_0x3ac2('0x2a3'))return this[_0x3ac2('0x207')]()[_0x3ac2('0x156')](_0x51d823,_0x58fc0f,_0x3d2336);else{function _0x430f77(){_0x226107+=this[_0x3ac2('0x169')]();}}}else return VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x3fd')][_0x3ac2('0x111')](this,_0x51d823,_0x58fc0f,_0x3d2336);},Game_CharacterBase['prototype']['clearSpriteOffsets']=function(){this[_0x3ac2('0x38c')]=0x0,this[_0x3ac2('0x261')]=0x0;},VisuMZ['EventsMoveCore']['Game_CharacterBase_screenX']=Game_CharacterBase['prototype'][_0x3ac2('0x155')],Game_CharacterBase['prototype']['screenX']=function(){return VisuMZ['EventsMoveCore'][_0x3ac2('0x181')][_0x3ac2('0x111')](this)+(this[_0x3ac2('0x38c')]||0x0);},VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0xf5')]=Game_CharacterBase[_0x3ac2('0x1f1')][_0x3ac2('0x338')],Game_CharacterBase[_0x3ac2('0x1f1')]['screenY']=function(){return VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0xf5')][_0x3ac2('0x111')](this)+(this[_0x3ac2('0x261')]||0x0);},Game_CharacterBase['prototype'][_0x3ac2('0x36e')]=function(){this[_0x3ac2('0x3ca')]='';},VisuMZ['EventsMoveCore'][_0x3ac2('0x1c4')]=Game_CharacterBase[_0x3ac2('0x1f1')][_0x3ac2('0x7b')],Game_CharacterBase[_0x3ac2('0x1f1')][_0x3ac2('0x7b')]=function(){if(this['_patternLocked'])return;if(this['updatePatternEventsMoveCore']())return;VisuMZ[_0x3ac2('0x1b4')]['Game_CharacterBase_updatePattern']['call'](this);},Game_CharacterBase['prototype'][_0x3ac2('0x340')]=function(){if(!this['hasStepAnime']()&&this['_stopCount']>0x0)return![];switch(String(this[_0x3ac2('0x3ca')])[_0x3ac2('0x2c8')]()[_0x3ac2('0x149')]()){case'LEFT\x20TO\x20RIGHT':this[_0x3ac2('0xdd')]+=0x1;if(this[_0x3ac2('0xdd')]>0x2)this[_0x3ac2('0x265')](0x0);break;case _0x3ac2('0x6c'):this[_0x3ac2('0xdd')]-=0x1;if(this[_0x3ac2('0xdd')]<0x0)this[_0x3ac2('0x265')](0x2);break;case _0x3ac2('0x191'):case'SPIN\x20CW':this[_0x3ac2('0xf1')]();break;case _0x3ac2('0x103'):case _0x3ac2('0x22c'):case _0x3ac2('0x388'):case _0x3ac2('0x251'):this[_0x3ac2('0x3ce')]();break;default:return![];}return!![];},Game_CharacterBase['prototype'][_0x3ac2('0x25e')]=function(){return $gameSystem[_0x3ac2('0x25e')](this);},Game_CharacterBase[_0x3ac2('0x1f1')]['hasEventIcon']=function(){const _0x390e60=this[_0x3ac2('0x25e')]();if(!_0x390e60)return![];return _0x390e60[_0x3ac2('0x153')]>0x0;},Game_CharacterBase[_0x3ac2('0x1f1')][_0x3ac2('0x2d7')]=function(){const _0x3becf3=this[_0x3ac2('0x2c6')]();return $gameMap['roundXWithDirection'](this['x'],_0x3becf3);},Game_CharacterBase[_0x3ac2('0x1f1')][_0x3ac2('0xf9')]=function(){const _0xd99c7a=this[_0x3ac2('0x2c6')]();return $gameMap[_0x3ac2('0x29f')](this['y'],_0xd99c7a);},Game_CharacterBase[_0x3ac2('0x1f1')][_0x3ac2('0x7')]=function(){const _0x19948c=this[_0x3ac2('0x18b')](this[_0x3ac2('0x2c6')]());return $gameMap[_0x3ac2('0x2cf')](this['x'],_0x19948c);},Game_CharacterBase[_0x3ac2('0x1f1')][_0x3ac2('0x3d0')]=function(){const _0x280305=this['reverseDir'](this[_0x3ac2('0x2c6')]());return $gameMap['roundYWithDirection'](this['y'],_0x280305);},VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x34e')]=Game_Character[_0x3ac2('0x1f1')][_0x3ac2('0x3d6')],Game_Character[_0x3ac2('0x1f1')][_0x3ac2('0x3d6')]=function(_0x548b58){route=JsonEx[_0x3ac2('0x1d6')](_0x548b58),VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x34e')][_0x3ac2('0x111')](this,route);},VisuMZ[_0x3ac2('0x1b4')]['Game_Character_forceMoveRoute']=Game_Character['prototype'][_0x3ac2('0x42f')],Game_Character[_0x3ac2('0x1f1')][_0x3ac2('0x42f')]=function(_0x2cfa64){route=JsonEx[_0x3ac2('0x1d6')](_0x2cfa64),VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x28b')][_0x3ac2('0x111')](this,route);},VisuMZ['EventsMoveCore']['Game_Character_processMoveCommand']=Game_Character[_0x3ac2('0x1f1')][_0x3ac2('0x1c9')],Game_Character[_0x3ac2('0x1f1')][_0x3ac2('0x1c9')]=function(_0x25c420){const _0x291645=Game_Character,_0x410a13=_0x25c420[_0x3ac2('0x392')];if(_0x25c420[_0x3ac2('0x3f1')]===_0x291645[_0x3ac2('0x255')]){if(_0x3ac2('0x3c')!==_0x3ac2('0x3e0')){const _0x91ceb1=_0x25c420[_0x3ac2('0x392')][0x0];this[_0x3ac2('0xac')](_0x25c420,_0x91ceb1);}else{function _0x530b9f(){const _0x258434=_0x16ba70[_0x3ac2('0x392')][0x0];if(_0x258434[_0x3ac2('0x1fa')](/<PAGE (?:CONDITION|CONDITIONS)>/i))_0x3e9db6=!![];else _0x258434[_0x3ac2('0x1fa')](/<\/PAGE (?:CONDITION|CONDITIONS)>/i)&&(_0x15ecdb=![]);}}}else VisuMZ['EventsMoveCore'][_0x3ac2('0x3dc')][_0x3ac2('0x111')](this,_0x25c420);},Game_Character['prototype'][_0x3ac2('0xac')]=function(_0x47018a,_0x1e7fa4){if(_0x1e7fa4[_0x3ac2('0x1fa')](/ANIMATION:[ ](\d+)/i)){if(_0x3ac2('0x282')===_0x3ac2('0x2d9')){function _0xd52188(){return this[_0x3ac2('0x212')](0x2,_0x444acf(_0x359772['$1']));}}else return this[_0x3ac2('0xa1')](Number(RegExp['$1']));}if(_0x1e7fa4[_0x3ac2('0x1fa')](/BALLOON:[ ](.*)/i)){if(_0x3ac2('0x2cc')!==_0x3ac2('0x2b1'))return this[_0x3ac2('0x41')](String(RegExp['$1']));else{function _0x4a69d9(){this[_0x3ac2('0x289')]['x']=this[_0x3ac2('0x26')][_0x3ac2('0x1d')](),this[_0x3ac2('0x289')]['y']=this[_0x3ac2('0x26')]['shadowY'](),this[_0x3ac2('0x289')][_0x3ac2('0x408')]=this[_0x3ac2('0x408')],this['_shadowSprite'][_0x3ac2('0x172')]=this[_0x3ac2('0x26')][_0x3ac2('0x2f3')](),this[_0x3ac2('0x289')][_0x3ac2('0x1f4')]=this['_hidden'],!this[_0x3ac2('0x26')][_0x3ac2('0x3c0')]()?(this['_shadowSprite'][_0x3ac2('0x36b')]['x']=_0x13b436['min'](0x1,this['_shadowSprite'][_0x3ac2('0x36b')]['x']+0.1),this[_0x3ac2('0x289')][_0x3ac2('0x36b')]['y']=_0x36134a[_0x3ac2('0x20b')](0x1,this[_0x3ac2('0x289')][_0x3ac2('0x36b')]['y']+0.1)):(this[_0x3ac2('0x289')][_0x3ac2('0x36b')]['x']=_0x513070[_0x3ac2('0x1d2')](0x0,this['_shadowSprite'][_0x3ac2('0x36b')]['x']-0.1),this['_shadowSprite'][_0x3ac2('0x36b')]['y']=_0x49a0a7['max'](0x0,this[_0x3ac2('0x289')][_0x3ac2('0x36b')]['y']-0.1));}}}if(_0x1e7fa4[_0x3ac2('0x1fa')](/FADE IN:[ ](\d+)/i)){if(_0x3ac2('0xf4')!==_0x3ac2('0xf4')){function _0x5d281d(){return _0x390f6d[_0x3ac2('0x1b4')]['Game_Variables_value']['call'](this,_0x31b913);}}else return this[_0x3ac2('0x1b2')](Number(RegExp['$1']));}if(_0x1e7fa4[_0x3ac2('0x1fa')](/FADE OUT:[ ](\d+)/i))return this[_0x3ac2('0x12b')](Number(RegExp['$1']));if(_0x1e7fa4[_0x3ac2('0x1fa')](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:TRUE|ON)/i)){if(_0x3ac2('0x3fa')==='aiqcI')return this[_0x3ac2('0x15')]();else{function _0x40d947(){if(this[_0x3ac2('0x17a')](_0x496e05,_0x203304)[_0x3ac2('0x2b4')]>0x0)return;if(_0x56e8f0['x']===_0x72fd9b&&_0x461623['y']===_0x554b32)return;if(this[_0x3ac2('0xb7')]()[_0x3ac2('0x16d')](_0x1f3d7a,_0x43405e))return;if(this[_0x3ac2('0x140')]()[_0x3ac2('0x16d')](_0x4afbc6,_0x82dc65))return;}}}if(_0x1e7fa4[_0x3ac2('0x1fa')](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:FALSE|OFF)/i)){if('UXCAH'===_0x3ac2('0x3de')){function _0x1bcbf0(){if(!this[_0x3ac2('0x179')]())return;this[_0x3ac2('0x415')](),this['setupEventsMoveCoreNotetags'](),this[_0x3ac2('0x346')](),this[_0x3ac2('0x17f')]();}}else return this[_0x3ac2('0xf3')]();}if(_0x1e7fa4[_0x3ac2('0x1fa')](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:TRUE|ON)/i)){if(_0x3ac2('0x26c')===_0x3ac2('0x26c'))return this[_0x3ac2('0x90')]();else{function _0x5cc37f(){return _0x597606['EventsMoveCore'][_0x3ac2('0x1d5')][_0x3ac2('0x23e')][_0x3ac2('0x22a')];}}}if(_0x1e7fa4[_0x3ac2('0x1fa')](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:FALSE|OFF)/i)){if('fQQyg'==='fQQyg')return this[_0x3ac2('0x414')]();else{function _0x622975(){const _0x13a030=[_0x593cf5[_0x3ac2('0x20e')],_0x8fcb79[_0x3ac2('0x221')],_0x3ac2('0x2d4')[_0x3ac2('0x17d')](_0x1fa90f)];_0x108813[_0x3ac2('0x19e')](_0x13a030,_0x2f232e);}}}if(_0x1e7fa4[_0x3ac2('0x1fa')](/HUG:[ ]LEFT/i)){if(_0x3ac2('0x1d0')===_0x3ac2('0xd4')){function _0x3ebf6e(){return!!this[_0x3ac2('0x418')];}}else return this[_0x3ac2('0x262')]('left');}if(_0x1e7fa4[_0x3ac2('0x1fa')](/HUG:[ ]RIGHT/i))return this[_0x3ac2('0x262')](_0x3ac2('0x424'));if(_0x1e7fa4['match'](/INDEX:[ ](\d+)/i)){if('RpaPu'!=='RpaPu'){function _0x2b4a4c(){this['_lastMovedDirection']=_0x4378f9,_0x4aea65['EventsMoveCore'][_0x3ac2('0x59')][_0x3ac2('0x111')](this,_0x2eb760);}}else return this[_0x3ac2('0x314')](Number(RegExp['$1']));}if(_0x1e7fa4[_0x3ac2('0x1fa')](/INDEX:[ ]([\+\-]\d+)/i)){const _0x2b62b0=this[_0x3ac2('0x1cf')]+Number(RegExp['$1']);return this[_0x3ac2('0x314')](_0x2b62b0);}if(_0x1e7fa4[_0x3ac2('0x1fa')](/JUMP FORWARD:[ ](\d+)/i)){if(_0x3ac2('0x3b0')!=='IFjZS'){function _0x2b358c(){this[_0x3ac2('0x3ec')]['text']=this[_0x3ac2('0x3ec')][_0x3ac2('0x239')][_0x3ac2('0x2d0')](/\\V\[(\d+)\]/gi,(_0x29b075,_0x1f19ee)=>_0x4a9499[_0x3ac2('0x258')](_0x2718da(_0x1f19ee)));}}else return this['processMoveRouteJumpForward'](Number(RegExp['$1']));}if(_0x1e7fa4[_0x3ac2('0x1fa')](/JUMP TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){if('JrZCe'!==_0x3ac2('0x47')){function _0x4321ab(){if(!this[_0x3ac2('0x26')])return 0x0;const _0x209fee=this[_0x3ac2('0x26')][_0x3ac2('0x25e')]();return _0x209fee?_0x209fee[_0x3ac2('0x153')]||0x0:0x0;}}else return this[_0x3ac2('0x1a2')](Number(RegExp['$1']),Number(RegExp['$2']));}if(_0x1e7fa4['match'](/JUMP TO EVENT:[ ](\d+)/i)){const _0x482d94=$gameMap[_0x3ac2('0x179')](Number(RegExp['$1']));return this[_0x3ac2('0x5a')](_0x482d94);}if(_0x1e7fa4[_0x3ac2('0x1fa')](/JUMP TO PLAYER/i))return this[_0x3ac2('0x5a')]($gamePlayer);if(_0x1e7fa4[_0x3ac2('0x1fa')](/MOVE[ ](.*)[ ]UNTIL STOP/i)){const _0x429474=String(RegExp['$1']);return this[_0x3ac2('0x164')](_0x429474);}if(_0x1e7fa4[_0x3ac2('0x1fa')](/MOVE TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0x3ac2('0x28d')!==_0x3ac2('0x1a1')){const _0x3cedfb=Number(RegExp['$1']),_0x24dd8c=Number(RegExp['$2']);return this[_0x3ac2('0x274')](_0x3cedfb,_0x24dd8c);}else{function _0x350060(){return this[_0x3ac2('0x411')](_0x4b45b0);}}}if(_0x1e7fa4[_0x3ac2('0x1fa')](/MOVE TO EVENT:[ ](\d+)/i)){const _0x56982f=$gameMap[_0x3ac2('0x179')](Number(RegExp['$1']));return this[_0x3ac2('0x316')](_0x56982f);}if(_0x1e7fa4[_0x3ac2('0x1fa')](/MOVE TO PLAYER/i)){if(_0x3ac2('0x350')!==_0x3ac2('0x350')){function _0x5a4323(){const _0xf3f8fb=_0xd7933c[_0x3ac2('0x396')](_0x44d696-this['x']),_0x54c7b5=_0x2f2c87[_0x3ac2('0x396')](_0x1d6b96-this['y']);this[_0x3ac2('0xd')](_0xf3f8fb,_0x54c7b5);}}else return this[_0x3ac2('0x316')]($gamePlayer);}if(_0x1e7fa4[_0x3ac2('0x1fa')](/MOVE LOWER LEFT:[ ](\d+)/i)){if('Ovtyg'!=='KDqAA')return this['processMoveRouteMoveRepeat'](0x1,Number(RegExp['$1']));else{function _0x59b938(){return this[_0x3ac2('0x338')]()+this[_0x3ac2('0x344')]()+this['jumpHeight']();}}}if(_0x1e7fa4[_0x3ac2('0x1fa')](/MOVE DOWN:[ ](\d+)/i))return this[_0x3ac2('0x212')](0x2,Number(RegExp['$1']));if(_0x1e7fa4[_0x3ac2('0x1fa')](/MOVE LOWER RIGHT:[ ](\d+)/i)){if(_0x3ac2('0xa8')===_0x3ac2('0xa8'))return this[_0x3ac2('0x212')](0x3,Number(RegExp['$1']));else{function _0xbad3e6(){_0x368020[_0x3ac2('0x279')](_0x1a560e,_0x4b2057),_0x2fa48[_0x3ac2('0x2fb')](_0x41c54c[_0x3ac2('0x28')]);}}}if(_0x1e7fa4['match'](/MOVE LEFT:[ ](\d+)/i)){if(_0x3ac2('0x39a')===_0x3ac2('0x39a'))return this[_0x3ac2('0x212')](0x4,Number(RegExp['$1']));else{function _0x5ded68(){if([0x2,0x4,0x6,0x8]['includes'](_0x5ddcc1))return 0x4;if([0x1,0x3,0x7,0x9][_0x3ac2('0x6f')](_0x5c011c))return 0x5;}}}if(_0x1e7fa4[_0x3ac2('0x1fa')](/MOVE RIGHT:[ ](\d+)/i))return this[_0x3ac2('0x212')](0x6,Number(RegExp['$1']));if(_0x1e7fa4[_0x3ac2('0x1fa')](/MOVE UPPER LEFT:[ ](\d+)/i))return this[_0x3ac2('0x212')](0x7,Number(RegExp['$1']));if(_0x1e7fa4[_0x3ac2('0x1fa')](/MOVE UP:[ ](\d+)/i))return this[_0x3ac2('0x212')](0x8,Number(RegExp['$1']));if(_0x1e7fa4['match'](/MOVE UPPER RIGHT:[ ](\d+)/i))return this[_0x3ac2('0x212')](0x9,Number(RegExp['$1']));if(_0x1e7fa4[_0x3ac2('0x1fa')](/OPACITY:[ ](\d+)([%％])/i)){if(_0x3ac2('0x347')===_0x3ac2('0x10')){function _0x12bfd3(){this['_alwaysUpdateMove']=!![];}}else{const _0x9e023a=Math[_0x3ac2('0x396')](Number(RegExp['$1'])/0x64*0xff);return this[_0x3ac2('0x13e')](_0x9e023a[_0x3ac2('0x309')](0x0,0xff));}}if(_0x1e7fa4[_0x3ac2('0x1fa')](/OPACITY:[ ]([\+\-]\d+)([%％])/i)){const _0x4dc759=this[_0x3ac2('0x369')]+Math[_0x3ac2('0x396')](Number(RegExp['$1'])/0x64*0xff);return this[_0x3ac2('0x13e')](_0x4dc759[_0x3ac2('0x309')](0x0,0xff));}if(_0x1e7fa4[_0x3ac2('0x1fa')](/OPACITY:[ ]([\+\-]\d+)/i)){const _0x134b7b=this[_0x3ac2('0x369')]+Number(RegExp['$1']);return this['setOpacity'](_0x134b7b[_0x3ac2('0x309')](0x0,0xff));}if(_0x1e7fa4['match'](/PATTERN LOCK:[ ](\d+)/i))return this[_0x3ac2('0x32f')](Number(RegExp['$1']));if(_0x1e7fa4[_0x3ac2('0x1fa')](/PATTERN UNLOCK/i))return this[_0x3ac2('0x4d')]=![];if(_0x1e7fa4[_0x3ac2('0x1fa')](/POSE:[ ](.*)/i)){if('GdRBQ'===_0x3ac2('0x2bc')){const _0xae36e1=String(RegExp['$1'])[_0x3ac2('0x2c8')]()[_0x3ac2('0x149')]();return this['setPose'](_0xae36e1);}else{function _0x2a484d(){const _0x5e615a=this[_0x3ac2('0x179')](_0x1c3794);if(_0x5e615a)_0x5e615a[_0x3ac2('0x10f')]();}}}if(_0x1e7fa4[_0x3ac2('0x1fa')](/STEP TOWARD:\s*(\d+)\s*[, ]\s*(\d+)/i)){const _0x2e8b22=Number(RegExp['$1']),_0x4d0302=Number(RegExp['$2']);return this['processMoveRouteStepTo'](_0x2e8b22,_0x4d0302);}if(_0x1e7fa4[_0x3ac2('0x1fa')](/STEP TOWARD EVENT:[ ](\d+)/i)){const _0xcbc4b9=$gameMap[_0x3ac2('0x179')](Number(RegExp['$1']));return this['processMoveRouteStepToCharacter'](_0xcbc4b9);}if(_0x1e7fa4[_0x3ac2('0x1fa')](/STEP TOWARD PLAYER/i)){if(_0x3ac2('0x234')!==_0x3ac2('0x234')){function _0x271c82(){if(_0x1540bb[_0x3ac2('0x3cf')])this[_0x3ac2('0x420')](_0xbce9[_0x3ac2('0x3cf')]);}}else return this[_0x3ac2('0xd2')]($gamePlayer);}if(_0x1e7fa4[_0x3ac2('0x1fa')](/STEP AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0x3ac2('0x175')===_0x3ac2('0x4b')){function _0x508a9b(){this[_0x3ac2('0x3d7')]=!![];}}else return this[_0x3ac2('0x21d')](Number(RegExp['$1']),Number(RegExp['$2']));}if(_0x1e7fa4[_0x3ac2('0x1fa')](/STEP AWAY FROM EVENT:[ ](\d+)/i)){const _0x547fcd=$gameMap[_0x3ac2('0x179')](Number(RegExp['$1']));return this['moveAwayFromCharacter'](_0x547fcd);}if(_0x1e7fa4[_0x3ac2('0x1fa')](/STEP AWAY FROM PLAYER/i)){if(_0x3ac2('0x58')===_0x3ac2('0x188')){function _0x4ef1a5(){return this[_0x3ac2('0x38')];}}else return this['moveAwayFromCharacter']($gamePlayer);}if(_0x1e7fa4[_0x3ac2('0x1fa')](/TURN TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0x3ac2('0x102')==='GPYed')return this[_0x3ac2('0x32b')](Number(RegExp['$1']),Number(RegExp['$2']));else{function _0x51086e(){this[_0x3ac2('0xb2')]=!![];return;}}}if(_0x1e7fa4['match'](/TURN TO EVENT:[ ](\d+)/i)){const _0x4001f5=$gameMap['event'](Number(RegExp['$1']));return this[_0x3ac2('0xc')](_0x4001f5);}if(_0x1e7fa4[_0x3ac2('0x1fa')](/TURN TO PLAYER/i))return this[_0x3ac2('0xc')]($gamePlayer);if(_0x1e7fa4[_0x3ac2('0x1fa')](/TURN AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x3ac2('0x1f')](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x1e7fa4[_0x3ac2('0x1fa')](/TURN AWAY FROM EVENT:[ ](\d+)/i)){const _0xd7e7a6=$gameMap['event'](Number(RegExp['$1']));return this[_0x3ac2('0x2c3')](_0xd7e7a6);}if(_0x1e7fa4[_0x3ac2('0x1fa')](/TURN AWAY FROM PLAYER/i)){if(_0x3ac2('0x3ed')===_0x3ac2('0x3ed'))return this[_0x3ac2('0x2c3')]($gamePlayer);else{function _0x49aef7(){return this[_0x3ac2('0x2c3')](_0x1de24a);}}}if(_0x1e7fa4[_0x3ac2('0x1fa')](/TURN LOWER LEFT/i))return this[_0x3ac2('0x29a')](0x1);if(_0x1e7fa4[_0x3ac2('0x1fa')](/TURN LOWER RIGHT/i)){if(_0x3ac2('0x2f2')!=='xxIGI')return this[_0x3ac2('0x29a')](0x3);else{function _0x1d0e6f(){return this[_0x3ac2('0x262')]('left');}}}if(_0x1e7fa4[_0x3ac2('0x1fa')](/TURN UPPER LEFT/i)){if('LVWGA'!==_0x3ac2('0x2bd')){function _0x4f7a5b(){return _0x4ce935[_0x3ac2('0x1b4')][_0x3ac2('0x21c')][_0x3ac2('0x111')](this);}}else return this[_0x3ac2('0x29a')](0x7);}if(_0x1e7fa4[_0x3ac2('0x1fa')](/TURN UPPER RIGHT/i)){if(_0x3ac2('0xcd')!==_0x3ac2('0x17'))return this[_0x3ac2('0x29a')](0x9);else{function _0x4763cd(){if(_0x4c9c0a[_0x3ac2('0x23c')]())return![];if(_0x20ca0c[_0x3ac2('0x2a4')]())return![];return _0x28ad8d['activationRegionList']()[_0x3ac2('0x6f')](this[_0x3ac2('0x2ed')]());}}}if(_0x1e7fa4[_0x3ac2('0x1fa')](/Self Switch[ ](.*):[ ](.*)/i))return this[_0x3ac2('0x229')](RegExp['$1'],RegExp['$2']);if(_0x1e7fa4[_0x3ac2('0x1fa')](/Self Variable[ ](.*):[ ](.*)/i))return this[_0x3ac2('0x20a')](RegExp['$1'],RegExp['$2']);if(_0x1e7fa4[_0x3ac2('0x1fa')](/TELEPORT TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this['processMoveRouteTeleportTo'](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x1e7fa4['match'](/TELEPORT TO EVENT:[ ](\d+)/i)){if(_0x3ac2('0x1fb')!==_0x3ac2('0x3fc')){const _0x4c598f=$gameMap['event'](Number(RegExp['$1']));return this[_0x3ac2('0x269')](_0x4c598f);}else{function _0x2d0a27(){_0x4b36ac=_0x506592[_0x3ac2('0x2c8')]()[_0x3ac2('0x149')]();const _0x4870d3=_0x4f4baa[_0x3ac2('0x128')][_0x153067];if(!_0x4870d3)return;const _0x82c6e8=_0x4870d3[_0x3ac2('0x432')],_0x570536=_0x4870d3[_0x3ac2('0x28')];if(!this['checkValidEventerMap'](_0x82c6e8,_0x570536))return;if(!_0x4cae6f)_0x4870d3[_0x3ac2('0x1af')][_0x3ac2('0x111')](this,_0x82c6e8,_0x570536,this);this[_0x3ac2('0x195')](_0x82c6e8,_0x570536,_0x7a3b47);if(!_0x2eb1d2)_0x4870d3[_0x3ac2('0x13b')][_0x3ac2('0x111')](this,_0x82c6e8,_0x570536,this);this[_0x3ac2('0xd9')]();}}}if(_0x1e7fa4['match'](/TELEPORT TO PLAYER/i))return this['processMoveRouteTeleportToCharacter']($gamePlayer);try{VisuMZ['EventsMoveCore']['Game_Character_processMoveCommand'][_0x3ac2('0x111')](this,_0x47018a);}catch(_0x213cfb){if($gameTemp[_0x3ac2('0x6e')]())console[_0x3ac2('0x14d')](_0x213cfb);}},Game_Character[_0x3ac2('0x1f1')]['processMoveRouteAnimation']=function(_0x4d7493){$gameTemp[_0x3ac2('0x375')]([this],_0x4d7493);},Game_Character[_0x3ac2('0x1f1')][_0x3ac2('0x41')]=function(_0xf233bd){let _0x12e956=0x0;switch(_0xf233bd[_0x3ac2('0x2c8')]()['trim']()){case'!':case _0x3ac2('0xc6'):_0x12e956=0x1;break;case'?':case _0x3ac2('0x243'):_0x12e956=0x2;break;case'MUSIC':case _0x3ac2('0x1ee'):case _0x3ac2('0xea'):case _0x3ac2('0x1d9'):case _0x3ac2('0x3c7'):_0x12e956=0x3;break;case _0x3ac2('0x1d4'):case _0x3ac2('0x3a3'):_0x12e956=0x4;break;case'ANGER':_0x12e956=0x5;break;case _0x3ac2('0xaf'):_0x12e956=0x6;break;case'COBWEB':case _0x3ac2('0x39c'):_0x12e956=0x7;break;case _0x3ac2('0x11b'):case'...':_0x12e956=0x8;break;case'LIGHT':case _0x3ac2('0x2e7'):case _0x3ac2('0x403'):case'LIGHT-BULB':case _0x3ac2('0xcc'):_0x12e956=0x9;break;case'Z':case'ZZ':case _0x3ac2('0x3b8'):case _0x3ac2('0x183'):_0x12e956=0xa;break;case _0x3ac2('0x2ce'):_0x12e956=0xb;break;case _0x3ac2('0x4'):_0x12e956=0xc;break;case _0x3ac2('0x192'):_0x12e956=0xd;break;case _0x3ac2('0x12'):_0x12e956=0xe;break;case _0x3ac2('0x7f'):_0x12e956=0xf;break;}$gameTemp[_0x3ac2('0x27d')](this,_0x12e956);},Game_Character[_0x3ac2('0x1f1')][_0x3ac2('0x1b2')]=function(_0x4ae7d5){_0x4ae7d5+=this['_opacity'],this[_0x3ac2('0x13e')](_0x4ae7d5[_0x3ac2('0x309')](0x0,0xff));if(this[_0x3ac2('0x369')]<0xff)this[_0x3ac2('0x235')]--;},Game_Character[_0x3ac2('0x1f1')][_0x3ac2('0x12b')]=function(_0x32238c){_0x32238c=this[_0x3ac2('0x369')]-_0x32238c,this[_0x3ac2('0x13e')](_0x32238c['clamp'](0x0,0xff));if(this[_0x3ac2('0x369')]>0x0)this[_0x3ac2('0x235')]--;},Game_Character[_0x3ac2('0x1f1')][_0x3ac2('0x262')]=function(_0x3a9466){const _0x59a8ac=[0x0,0x3,0x6,0x9,0x2,0x0,0x8,0x1,0x4,0x7],_0x4472be=[0x0,0x7,0x4,0x1,0x8,0x0,0x2,0x9,0x6,0x3],_0x56dcab=this[_0x3ac2('0x2c6')](),_0x127461=(_0x3a9466===_0x3ac2('0x13d')?_0x59a8ac:_0x4472be)[_0x56dcab],_0x41aa13=(_0x3a9466===_0x3ac2('0x13d')?_0x4472be:_0x59a8ac)[_0x56dcab];if(this[_0x3ac2('0x423')](this['x'],this['y'],_0x127461)){if('iQPcI'!==_0x3ac2('0x35d')){function _0x18b613(){if(_0x42ee83)this[_0x3ac2('0x39b')](_0x593902['x'],_0x4d6ee5['y']);}}else{if(_0x3a9466===_0x3ac2('0x13d')){if(_0x3ac2('0x71')!==_0x3ac2('0x321'))this[_0x3ac2('0x3ce')]();else{function _0x17a982(){return this['processMoveRouteMoveRepeat'](0x4,_0x220d02(_0x17ad5f['$1']));}}}else this['turnRight90']();}}else{if(!this[_0x3ac2('0x423')](this['x'],this['y'],this['direction']())){if(_0x3ac2('0x33d')!==_0x3ac2('0x33d')){function _0x4e81cb(){this[_0x3ac2('0x2f9')]();}}else this[_0x3ac2('0x423')](this['x'],this['y'],_0x41aa13)?_0x3a9466===_0x3ac2('0x13d')?this[_0x3ac2('0xf1')]():this[_0x3ac2('0x3ce')]():this[_0x3ac2('0x1bf')]();}}if(this[_0x3ac2('0x423')](this['x'],this['y'],this[_0x3ac2('0x2c6')]())){if(_0x3ac2('0x35')===_0x3ac2('0x33c')){function _0x57ee21(){_0x475b66=_0xb9b7c4[_0x504dc8];}}else this['moveForward']();}},Game_Character[_0x3ac2('0x1f1')]['processMoveRouteSetIndex']=function(_0x39c94e){if(ImageManager[_0x3ac2('0x19f')](this['_characterName']))return;_0x39c94e=_0x39c94e['clamp'](0x0,0x7),this[_0x3ac2('0x422')](this[_0x3ac2('0x41e')],_0x39c94e);},Game_Character[_0x3ac2('0x1f1')][_0x3ac2('0x1de')]=function(_0x9f8a14){switch(this['direction']()){case 0x1:this[_0x3ac2('0xd')](-_0x9f8a14,_0x9f8a14);break;case 0x2:this[_0x3ac2('0xd')](0x0,_0x9f8a14);break;case 0x3:this[_0x3ac2('0xd')](_0x9f8a14,_0x9f8a14);break;case 0x4:this[_0x3ac2('0xd')](-_0x9f8a14,0x0);break;case 0x6:this[_0x3ac2('0xd')](_0x9f8a14,0x0);break;case 0x7:this[_0x3ac2('0xd')](-_0x9f8a14,-_0x9f8a14);break;case 0x8:this[_0x3ac2('0xd')](0x0,-_0x9f8a14);break;case 0x9:this['jump'](_0x9f8a14,-_0x9f8a14);break;}},Game_Character[_0x3ac2('0x1f1')]['processMoveRouteJumpTo']=function(_0x51fcac,_0x59b66b){const _0x6ebb77=Math[_0x3ac2('0x396')](_0x51fcac-this['x']),_0x31054e=Math[_0x3ac2('0x396')](_0x59b66b-this['y']);this[_0x3ac2('0xd')](_0x6ebb77,_0x31054e);},Game_Character[_0x3ac2('0x1f1')]['processMoveRouteJumpToCharacter']=function(_0x1b243d){if(_0x1b243d)this[_0x3ac2('0x1a2')](_0x1b243d['x'],_0x1b243d['y']);},Game_Character[_0x3ac2('0x1f1')][_0x3ac2('0x2ea')]=function(_0x30b65f,_0x169796){let _0x26042c=0x0;$gameMap[_0x3ac2('0x42')]()?_0x26042c=this[_0x3ac2('0x3a8')](_0x30b65f,_0x169796):_0x26042c=this[_0x3ac2('0x6a')](_0x30b65f,_0x169796),this[_0x3ac2('0x45')](_0x26042c),this['setMovementSuccess'](!![]);},Game_Character[_0x3ac2('0x1f1')][_0x3ac2('0x63')]=function(_0x4dfe10){if(_0x4dfe10)this[_0x3ac2('0x2ea')](_0x4dfe10['x'],_0x4dfe10['y']);},Game_Character[_0x3ac2('0x1f1')][_0x3ac2('0x9e')]=function(_0x52e801,_0x2d9b56){const _0x3fe76e=this[_0x3ac2('0x27b')](_0x52e801),_0x32f58e=this[_0x3ac2('0x40f')](_0x2d9b56);},Game_Character[_0x3ac2('0x1f1')][_0x3ac2('0x164')]=function(_0x21af85){const _0x5c42ac=['','LOWER\x20LEFT',_0x3ac2('0x379'),_0x3ac2('0x2a8'),_0x3ac2('0x37b'),'',_0x3ac2('0x81'),'UPPER\x20LEFT','UP','UPPER\x20RIGHT'],_0x2e35b1=_0x5c42ac[_0x3ac2('0x129')](_0x21af85[_0x3ac2('0x2c8')]()[_0x3ac2('0x149')]());if(directioin<=0x0)return;this[_0x3ac2('0x423')](this['x'],this['y'],_0x2e35b1)&&(this[_0x3ac2('0x45')](_0x2e35b1),this[_0x3ac2('0x235')]-=0x1);},Game_Character[_0x3ac2('0x1f1')][_0x3ac2('0x274')]=function(_0x473940,_0x25f631){this[_0x3ac2('0x2ea')](_0x473940,_0x25f631);if(this['x']!==_0x473940||this['y']!==_0x25f631)this['_moveRouteIndex']--;},Game_Character[_0x3ac2('0x1f1')][_0x3ac2('0x316')]=function(_0x50a871){if(_0x50a871)this[_0x3ac2('0x274')](_0x50a871['x'],_0x50a871['y']);},Game_Character[_0x3ac2('0x1f1')][_0x3ac2('0x212')]=function(_0x1a9cf0,_0x1c71de){_0x1c71de=_0x1c71de||0x0;const _0x131b6e={'code':0x1,'indent':null,'parameters':[]};_0x131b6e['code']=[0x0,0x5,0x1,0x6,0x2,0x0,0x3,0x7,0x4,0x8][_0x1a9cf0],this[_0x3ac2('0x319')]['list'][this[_0x3ac2('0x235')]][_0x3ac2('0x392')][0x0]='';while(_0x1c71de--){this['_moveRoute'][_0x3ac2('0x31c')]['splice'](this[_0x3ac2('0x235')]+0x1,0x0,_0x131b6e);}},Game_Character['prototype']['processMoveRoutePatternLock']=function(_0x2f4756){this[_0x3ac2('0x4d')]=!![],this[_0x3ac2('0x265')](_0x2f4756);},Game_Character['prototype'][_0x3ac2('0x229')]=function(_0x2f0876,_0x4c0639){if(this===$gamePlayer)return;const _0x715821=[this[_0x3ac2('0x20e')],this[_0x3ac2('0x221')],'A'];_0x2f0876['match'](/\b[ABCD]\b/i)?_0x715821[0x2]=String(_0x2f0876)[_0x3ac2('0x3e3')](0x0)[_0x3ac2('0x2c8')]()[_0x3ac2('0x149')]():_0x715821[0x2]='Self\x20Switch\x20%1'[_0x3ac2('0x17d')](_0x2f0876);switch(_0x4c0639[_0x3ac2('0x2c8')]()[_0x3ac2('0x149')]()){case'ON':case _0x3ac2('0x5'):$gameSelfSwitches[_0x3ac2('0x19e')](_0x715821,!![]);break;case _0x3ac2('0x366'):case _0x3ac2('0x19c'):$gameSelfSwitches[_0x3ac2('0x19e')](_0x715821,![]);break;case'Toggle':$gameSelfSwitches[_0x3ac2('0x19e')](_0x715821,!$gameSelfSwitches[_0x3ac2('0x258')](_0x715821));break;}},Game_Character[_0x3ac2('0x1f1')]['processMoveRouteSelfVariable']=function(_0x4cee3c,_0x4632e0){if(this===$gamePlayer)return;const _0x332cbc=[this[_0x3ac2('0x20e')],this[_0x3ac2('0x221')],_0x3ac2('0x2d4')[_0x3ac2('0x17d')](switchId)];$gameSelfSwitches[_0x3ac2('0x19e')](_0x332cbc,Number(_0x4632e0));},Game_Character[_0x3ac2('0x1f1')][_0x3ac2('0x39b')]=function(_0x461895,_0x3f6c73){this[_0x3ac2('0x1b6')](_0x461895,_0x3f6c73);},Game_Character[_0x3ac2('0x1f1')]['processMoveRouteTeleportToCharacter']=function(_0x40ce33){if(_0x40ce33)this[_0x3ac2('0x39b')](_0x40ce33['x'],_0x40ce33['y']);},Game_Character[_0x3ac2('0x1f1')][_0x3ac2('0xf1')]=function(){switch(this[_0x3ac2('0x2c6')]()){case 0x1:this[_0x3ac2('0x29a')](0x7);break;case 0x2:this['setDirection'](0x4);break;case 0x3:this[_0x3ac2('0x29a')](0x1);break;case 0x4:this[_0x3ac2('0x29a')](0x8);break;case 0x6:this[_0x3ac2('0x29a')](0x2);break;case 0x7:this[_0x3ac2('0x29a')](0x9);break;case 0x8:this[_0x3ac2('0x29a')](0x6);break;case 0x9:this[_0x3ac2('0x29a')](0x3);break;}},Game_Character[_0x3ac2('0x1f1')][_0x3ac2('0x3ce')]=function(){switch(this[_0x3ac2('0x2c6')]()){case 0x1:this[_0x3ac2('0x29a')](0x3);break;case 0x2:this[_0x3ac2('0x29a')](0x6);break;case 0x3:this['setDirection'](0x9);break;case 0x4:this[_0x3ac2('0x29a')](0x2);break;case 0x6:this[_0x3ac2('0x29a')](0x8);break;case 0x7:this[_0x3ac2('0x29a')](0x1);break;case 0x8:this[_0x3ac2('0x29a')](0x4);break;case 0x9:this[_0x3ac2('0x29a')](0x7);break;}},Game_Character['prototype'][_0x3ac2('0x348')]=function(_0x433b9c,_0x313778,_0x4aee24){const _0x435130=this['deltaXFrom'](_0x433b9c),_0x31b352=this[_0x3ac2('0x40f')](_0x313778);if($gameMap[_0x3ac2('0x42')]()){if(_0x4aee24||this['isSpriteVS8dir']()){if(_0x435130>0x0&&_0x31b352<0x0)return 0x1;if(_0x435130<0x0&&_0x31b352<0x0)return 0x3;if(_0x435130>0x0&&_0x31b352>0x0)return 0x7;if(_0x435130<0x0&&_0x31b352>0x0)return 0x9;}}if(Math[_0x3ac2('0x2a1')](_0x435130)>Math[_0x3ac2('0x2a1')](_0x31b352)){if('PENJh'==='PENJh')return _0x435130>0x0?0x4:0x6;else{function _0x49740d(){const _0x444de6=_0x552ed6(_0x51bb0b['$1']),_0x33f4ee=_0x542ecf(_0x48d3f2['$2']);return this[_0x3ac2('0x2ea')](_0x444de6,_0x33f4ee);}}}else{if(_0x31b352!==0x0)return _0x31b352>0x0?0x8:0x2;}return 0x0;},Game_Character['prototype'][_0x3ac2('0x9a')]=function(_0x100003,_0x2896d5,_0x212df1){const _0x56ac9b=this[_0x3ac2('0x27b')](_0x100003),_0x48177d=this[_0x3ac2('0x40f')](_0x2896d5);if($gameMap[_0x3ac2('0x42')]()){if(_0x212df1||this['isSpriteVS8dir']()){if(_0x3ac2('0x358')===_0x3ac2('0x358')){if(_0x56ac9b>0x0&&_0x48177d<0x0)return 0x9;if(_0x56ac9b<0x0&&_0x48177d<0x0)return 0x7;if(_0x56ac9b>0x0&&_0x48177d>0x0)return 0x3;if(_0x56ac9b<0x0&&_0x48177d>0x0)return 0x1;}else{function _0x8a37bb(){return this[_0x3ac2('0x316')](_0x15790c);}}}}if(Math[_0x3ac2('0x2a1')](_0x56ac9b)>Math['abs'](_0x48177d))return _0x56ac9b>0x0?0x6:0x4;else{if(_0x48177d!==0x0)return _0x48177d>0x0?0x2:0x8;}return 0x0;},Game_Character['prototype']['moveTowardPoint']=function(_0x3edfd2,_0x19f688){const _0x49321a=this[_0x3ac2('0x348')](_0x3edfd2,_0x19f688,!![]);if(_0x49321a)this[_0x3ac2('0x45')](_0x49321a);},Game_Character[_0x3ac2('0x1f1')][_0x3ac2('0x21d')]=function(_0x5527a2,_0x222d40){const _0xfef73=this[_0x3ac2('0x9a')](_0x5527a2,_0x222d40,!![]);if(_0xfef73)this['executeMoveDir8'](_0xfef73);},Game_Character[_0x3ac2('0x1f1')][_0x3ac2('0x2c4')]=function(_0x124e10,_0xf01a2){const _0x2ea7e4=this[_0x3ac2('0x348')](_0x124e10,_0xf01a2,![]);if(_0x2ea7e4)this[_0x3ac2('0x29a')](_0x2ea7e4);},Game_Character[_0x3ac2('0x1f1')][_0x3ac2('0x1f')]=function(_0x256122,_0x402007){const _0x17d9bc=this[_0x3ac2('0x9a')](_0x256122,_0x402007,![]);if(_0x17d9bc)this[_0x3ac2('0x29a')](_0x17d9bc);},Game_Character[_0x3ac2('0x1f1')][_0x3ac2('0x121')]=function(_0x350ada){if(_0x350ada)this['moveTowardPoint'](_0x350ada['x'],_0x350ada['y']);},Game_Character[_0x3ac2('0x1f1')]['moveAwayFromCharacter']=function(_0x757c3f){if(_0x757c3f)this[_0x3ac2('0x21d')](_0x757c3f['x'],_0x757c3f['y']);},Game_Character[_0x3ac2('0x1f1')][_0x3ac2('0xc')]=function(_0x5296e8){if(_0x5296e8)this[_0x3ac2('0x2c4')](_0x5296e8['x'],_0x5296e8['y']);},Game_Character[_0x3ac2('0x1f1')][_0x3ac2('0x2c3')]=function(_0x5e61a5){if(_0x5e61a5)this[_0x3ac2('0x1f')](_0x5e61a5['x'],_0x5e61a5['y']);},VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x306')]=Game_Player['prototype']['isDashing'],Game_Player[_0x3ac2('0x1f1')]['isDashing']=function(){if(this[_0x3ac2('0x21e')])return!![];return VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x306')][_0x3ac2('0x111')](this);},Game_Player[_0x3ac2('0x1f1')][_0x3ac2('0x259')]=function(){return this[_0x3ac2('0x206')]()&&(this[_0x3ac2('0x27e')]()||this[_0x3ac2('0x2fd')]()!==0x0&&this[_0x3ac2('0x423')](this['_x'],this['_y'],this[_0x3ac2('0x2fd')]())||$gameTemp['isDestinationValid']());},VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x1ec')]=Game_Player[_0x3ac2('0x1f1')][_0x3ac2('0x2fd')],Game_Player[_0x3ac2('0x1f1')][_0x3ac2('0x2fd')]=function(){if($gameSystem['isPlayerControlDisabled']())return 0x0;if($gameMap[_0x3ac2('0x42')]())return this[_0x3ac2('0x2')]();else{if(_0x3ac2('0x1ca')!==_0x3ac2('0x1ca')){function _0x509986(){return!![];}}else return VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x1ec')][_0x3ac2('0x111')](this);}},Game_Player['prototype'][_0x3ac2('0x2')]=function(){return Input[_0x3ac2('0x320')];},Game_Player[_0x3ac2('0x1f1')]['moveByInput']=function(){if(!this[_0x3ac2('0x27e')]()&&this[_0x3ac2('0xc5')]()){if(_0x3ac2('0x186')!==_0x3ac2('0x2fe')){let _0x22faf3=this[_0x3ac2('0x2fd')]();if(_0x22faf3>0x0)$gameTemp[_0x3ac2('0x372')]();else{if($gameTemp[_0x3ac2('0xeb')]()){if('CrUoL'!=='CrUoL'){function _0x4acb5e(){return _0x390fcc[_0x3ac2('0x1b4')][_0x3ac2('0x3fd')][_0x3ac2('0x111')](this,_0x1b9ce1,_0x29762b,_0x319acf);}}else{const _0x3f7907=$gameTemp[_0x3ac2('0x36d')](),_0x37875d=$gameTemp['destinationY']();if($gameMap[_0x3ac2('0x42')]())_0x22faf3=this[_0x3ac2('0x3a8')](_0x3f7907,_0x37875d);else{if(_0x3ac2('0x162')===_0x3ac2('0x1c6')){function _0x12cfbb(){const _0x3446a8=_0xe723ce[_0x5bd51f[_0x3ac2('0x41d')](_0x44b363[_0x3ac2('0x2b4')])];this['executeMoveDir8'](_0x3446a8);}}else _0x22faf3=this[_0x3ac2('0x6a')](_0x3f7907,_0x37875d);}}}}if(_0x22faf3>0x0){if(_0x3ac2('0x2fa')==='QYUdl'){function _0x53b88a(){return this[_0x3ac2('0x206')]();}}else this[_0x3ac2('0x34')]=this[_0x3ac2('0x34')]||0x0,this[_0x3ac2('0xdf')]()?this[_0x3ac2('0x29a')](_0x22faf3):this[_0x3ac2('0xba')](_0x22faf3),this[_0x3ac2('0x34')]++;}else{if('fsiTz'===_0x3ac2('0x27c')){function _0x4463d3(){return _0x2cdbee[_0x3ac2('0x1b4')]['Game_CharacterBase_realMoveSpeed']['call'](this)-this[_0x3ac2('0x387')];}}else this[_0x3ac2('0x34')]=0x0;}}else{function _0xddfe85(){return _0xcb27fd[_0x3ac2('0x1b4')][_0x3ac2('0x233')][_0x3ac2('0x111')](this,_0x1437db);}}}},Game_Player[_0x3ac2('0x1f1')][_0x3ac2('0xdf')]=function(){const _0x30892a=VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x1d5')][_0x3ac2('0x23e')];if(!_0x30892a[_0x3ac2('0x1c5')])return![];if($gameTemp[_0x3ac2('0xeb')]())return![];if(this['isDashing']()||this[_0x3ac2('0x27e')]()||this[_0x3ac2('0x18')]())return![];return this[_0x3ac2('0x34')]<_0x30892a['TurnInPlaceDelay'];},VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x2e6')]=Game_Player[_0x3ac2('0x1f1')][_0x3ac2('0xba')],Game_Player[_0x3ac2('0x1f1')]['executeMove']=function(_0x329e79){$gameMap[_0x3ac2('0x42')]()?this[_0x3ac2('0x45')](_0x329e79):VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x2e6')]['call'](this,_0x329e79);},VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0xe6')]=Game_Player[_0x3ac2('0x1f1')][_0x3ac2('0x24e')],Game_Player[_0x3ac2('0x1f1')][_0x3ac2('0x24e')]=function(_0x292b84,_0x38e55e,_0x593cae){if($gameMap[_0x3ac2('0x2cd')](_0x292b84,_0x38e55e,_0x593cae,_0x3ac2('0x1fc')))return!![];if($gameMap[_0x3ac2('0x219')](_0x292b84,_0x38e55e,_0x593cae,_0x3ac2('0x1fc')))return![];return VisuMZ[_0x3ac2('0x1b4')]['Game_Player_isMapPassable']['call'](this,_0x292b84,_0x38e55e,_0x593cae);},VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x257')]=Game_Player['prototype'][_0x3ac2('0x132')],Game_Player[_0x3ac2('0x1f1')][_0x3ac2('0x132')]=function(_0x2e3388){VisuMZ['EventsMoveCore'][_0x3ac2('0x257')]['call'](this,_0x2e3388);if(this['canStartLocalEvents']()){if(_0x3ac2('0x332')===_0x3ac2('0x332')){this[_0x3ac2('0x343')](_0x2e3388);if(_0x2e3388[_0x3ac2('0x6f')](0x0)&&this[_0x3ac2('0x370')]()==='standing')this['startMapCommonEventOnOK'](this['x'],this['y']);else{if(_0x2e3388[_0x3ac2('0x6f')](0x1)||_0x2e3388['includes'](0x2)){if(_0x3ac2('0x294')==='bOKQT')this[_0x3ac2('0x27f')]();else{function _0x37a1a2(){if(_0x2b7e28[0x2]['match'](/SELF/i))return this[_0x3ac2('0x411')](_0x56d5cc);else{return _0x270e63['EventsMoveCore'][_0x3ac2('0x2d2')][_0x3ac2('0x111')](this,_0x582cae);;}}}}}}else{function _0x3379b9(){if(_0x4a5780[_0x3ac2('0x3b5')][_0x3b78f9][_0x3ac2('0x1fa')](/<JS>\s*([\s\S]*)\s*<\/JS>/i))_0x137fc4[_0x3ac2('0x16c')]['push'](_0x31219f);if(_0x22a29d[_0x3ac2('0x3b5')][_0x108b5a]['match'](/<SELF>/i))_0x2418a1[_0x3ac2('0x268')][_0x3ac2('0x2c0')](_0x5b061b);}}}},VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x3d8')]=Game_Player[_0x3ac2('0x1f1')]['checkEventTriggerThere'],Game_Player[_0x3ac2('0x1f1')][_0x3ac2('0x142')]=function(_0x580602){VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x3d8')][_0x3ac2('0x111')](this,_0x580602);if(this[_0x3ac2('0x136')]()&&_0x580602['includes'](0x0)&&this[_0x3ac2('0x370')]()===_0x3ac2('0x17c')){const _0x3db386=this[_0x3ac2('0x2c6')](),_0x34f290=$gameMap[_0x3ac2('0x2cf')](this['x'],_0x3db386),_0x2f4303=$gameMap[_0x3ac2('0x29f')](this['y'],_0x3db386);this[_0x3ac2('0xa9')](_0x34f290,_0x2f4303);}},Game_Player['prototype'][_0x3ac2('0x343')]=function(_0x554446){if($gameMap[_0x3ac2('0x23c')]())return;if($gameMap[_0x3ac2('0x2a4')]())return;const _0x4d62c5=$gameMap[_0x3ac2('0x1ce')]();for(const _0x24eb12 of _0x4d62c5){if(!_0x24eb12)continue;if(!_0x24eb12['isTriggerIn'](_0x554446))continue;if(this[_0x3ac2('0x2c7')](_0x24eb12))return _0x24eb12[_0x3ac2('0x311')]();if(this[_0x3ac2('0x22d')](_0x24eb12))return _0x24eb12[_0x3ac2('0x311')]();}},Game_Player[_0x3ac2('0x1f1')][_0x3ac2('0x2c7')]=function(_0x5eb168){if($gameMap['isEventRunning']())return![];if($gameMap[_0x3ac2('0x2a4')]())return![];return _0x5eb168[_0x3ac2('0x135')]()[_0x3ac2('0x6f')](this['regionId']());},Game_Player[_0x3ac2('0x1f1')][_0x3ac2('0x22d')]=function(_0x10b8e3){if($gameMap[_0x3ac2('0x23c')]())return![];if($gameMap[_0x3ac2('0x2a4')]())return![];if([_0x3ac2('0x226'),_0x3ac2('0x17e')][_0x3ac2('0x6f')](_0x10b8e3[_0x3ac2('0xc8')]()))return![];const _0x3be33b=_0x10b8e3[_0x3ac2('0xc8')](),_0x379f6b=_0x10b8e3[_0x3ac2('0x35c')]();switch(_0x3be33b){case'radius':const _0x2b7027=$gameMap[_0x3ac2('0x42e')](this['x'],this['y'],_0x10b8e3['x'],_0x10b8e3['y']);return _0x10b8e3[_0x3ac2('0x35c')]()>=_0x2b7027;break;case'square':return _0x379f6b>=Math[_0x3ac2('0x2a1')](_0x10b8e3[_0x3ac2('0x27b')](this['x']))&&_0x379f6b>=Math[_0x3ac2('0x2a1')](_0x10b8e3['deltaYFrom'](this['y']));break;case _0x3ac2('0x390'):return _0x379f6b>=Math[_0x3ac2('0x2a1')](_0x10b8e3[_0x3ac2('0x40f')](this['y']));break;case _0x3ac2('0x413'):return _0x379f6b>=Math[_0x3ac2('0x2a1')](_0x10b8e3[_0x3ac2('0x27b')](this['x']));break;case _0x3ac2('0x3f2'):return![];break;}},Game_Player[_0x3ac2('0x1f1')][_0x3ac2('0xa9')]=function(_0x5efbe5,_0x46f293){if($gameMap[_0x3ac2('0x23c')]())return;if($gameMap['isAnyEventStarting']())return;let _0x2a7aad=VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x1d5')][_0x3ac2('0x65')],_0x2bd24b=$gameMap['regionId'](_0x5efbe5,_0x46f293);const _0x41a8e9=_0x3ac2('0x225')['format'](_0x2bd24b);_0x2a7aad[_0x41a8e9]&&$gameTemp[_0x3ac2('0x2e4')](_0x2a7aad[_0x41a8e9]);},Game_Player[_0x3ac2('0x1f1')][_0x3ac2('0x370')]=function(){return VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x1d5')]['RegionOkTarget'];},Game_Player[_0x3ac2('0x1f1')][_0x3ac2('0x27f')]=function(){if($gameMap['isEventRunning']())return;if($gameMap[_0x3ac2('0x2a4')]())return;let _0x444c8f=VisuMZ[_0x3ac2('0x1b4')]['Settings'][_0x3ac2('0xf')];const _0x1773f1='Region%1'[_0x3ac2('0x17d')](this[_0x3ac2('0x2ed')]());_0x444c8f[_0x1773f1]&&$gameTemp[_0x3ac2('0x2e4')](_0x444c8f[_0x1773f1]);},VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x287')]=Game_Player[_0x3ac2('0x1f1')][_0x3ac2('0x24')],Game_Player['prototype']['increaseSteps']=function(){VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x287')][_0x3ac2('0x111')](this),VisuMZ['MoveAllSynchTargets'](0x0);},Game_Follower['prototype'][_0x3ac2('0x206')]=function(){return $gamePlayer[_0x3ac2('0x206')]();},Game_Follower[_0x3ac2('0x1f1')][_0x3ac2('0x259')]=function(){return $gamePlayer[_0x3ac2('0x259')]();},Game_Follower[_0x3ac2('0x1f1')][_0x3ac2('0x34b')]=function(){return $gamePlayer[_0x3ac2('0x34b')]();},VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x327')]=Game_Vehicle['prototype'][_0x3ac2('0x24e')],Game_Vehicle[_0x3ac2('0x1f1')][_0x3ac2('0x24e')]=function(_0x12aafe,_0x397b94,_0x227735){if($gameMap[_0x3ac2('0x2cd')](_0x12aafe,_0x397b94,_0x227735,this[_0x3ac2('0x431')]))return!![];if($gameMap['isRegionForbidPass'](_0x12aafe,_0x397b94,_0x227735,this[_0x3ac2('0x431')]))return![];return VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x327')][_0x3ac2('0x111')](this,_0x12aafe,_0x397b94,_0x227735);},Game_Vehicle[_0x3ac2('0x1f1')][_0x3ac2('0x156')]=function(_0x4e933a,_0x197b74,_0x1bb960){if($gameMap['isRegionAllowPass'](_0x4e933a,_0x197b74,_0x1bb960,this[_0x3ac2('0x431')]))return!![];if($gameMap[_0x3ac2('0x219')](_0x4e933a,_0x197b74,_0x1bb960,this[_0x3ac2('0x431')]))return![];return VisuMZ['EventsMoveCore']['Game_CharacterBase_canPass'][_0x3ac2('0x111')]($gamePlayer,_0x4e933a,_0x197b74,_0x1bb960);},VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x323')]=Game_Vehicle[_0x3ac2('0x1f1')]['isLandOk'],Game_Vehicle[_0x3ac2('0x1f1')][_0x3ac2('0x2db')]=function(_0x53997e,_0x508fed,_0x3471bc){if($gameMap[_0x3ac2('0x2aa')](_0x53997e,_0x508fed,_0x3471bc,this['_type']))return!![];const _0x472fd0=this[_0x3ac2('0x431')][_0x3ac2('0x3e3')](0x0)[_0x3ac2('0x2c8')]()+this['_type'][_0x3ac2('0x19d')](0x1),_0x301412=_0x3ac2('0x1cd')[_0x3ac2('0x17d')](_0x472fd0);if(VisuMZ['EventsMoveCore'][_0x3ac2('0x1d5')][_0x3ac2('0x286')][_0x301412]){if(_0x3ac2('0x244')===_0x3ac2('0xc9')){function _0x39ae0b(){if(!this[_0x3ac2('0x3d2')]())return;const _0x19809e=this[_0x3ac2('0x31c')]();let _0x5480c2='';for(const _0xf99bf0 of _0x19809e){if([0x6c,0x198][_0x3ac2('0x6f')](_0xf99bf0[_0x3ac2('0x3f1')])){if(_0x5480c2!=='')_0x5480c2+='\x0a';_0x5480c2+=_0xf99bf0[_0x3ac2('0x392')][0x0];}}this[_0x3ac2('0x150')](_0x5480c2);}}else return![];}else return VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x323')][_0x3ac2('0x111')](this,_0x53997e,_0x508fed,_0x3471bc);},VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x138')]=Game_Vehicle[_0x3ac2('0x1f1')][_0x3ac2('0xef')],Game_Vehicle[_0x3ac2('0x1f1')][_0x3ac2('0xef')]=function(){VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x138')][_0x3ac2('0x111')](this);const _0x852518=VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x1d5')]['Movement'];if(this[_0x3ac2('0x3a2')]()){if(_0x852518[_0x3ac2('0x2ae')])this[_0x3ac2('0x420')](_0x852518[_0x3ac2('0x2ae')]);}else{if(this[_0x3ac2('0xa0')]()){if(_0x852518[_0x3ac2('0x3cf')])this[_0x3ac2('0x420')](_0x852518['ShipSpeed']);}else{if(this[_0x3ac2('0x13')]()){if('vdawh'===_0x3ac2('0x84')){function _0x40ab6d(){return this[_0x3ac2('0x15')]();}}else{if(_0x852518[_0x3ac2('0x260')])this['setMoveSpeed'](_0x852518[_0x3ac2('0x260')]);}}}}},VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x3ff')]=Game_Event[_0x3ac2('0x1f1')][_0x3ac2('0x426')],Game_Event['prototype'][_0x3ac2('0x426')]=function(_0x82b83c,_0x32a001){VisuMZ['EventsMoveCore'][_0x3ac2('0x3ff')][_0x3ac2('0x111')](this,_0x82b83c,_0x32a001),this[_0x3ac2('0x427')](),this[_0x3ac2('0x313')](),this['restoreSavedEventPosition']();},VisuMZ['EventsMoveCore']['Game_Event_event']=Game_Event['prototype'][_0x3ac2('0x179')],Game_Event['prototype'][_0x3ac2('0x179')]=function(){if(this[_0x3ac2('0x33')]!==undefined){const _0xc6a850=this['_eventMorphData'][_0x3ac2('0x335')],_0x2401e4=this[_0x3ac2('0x33')]['eventId'];return VisuMZ[_0x3ac2('0x46')][_0xc6a850][_0x3ac2('0x1ce')][_0x2401e4];}if(this['_eventCopyData']!==undefined){if('UudrM'!=='UudrM'){function _0x225c1a(){return _0x5a7a0f[_0x3ac2('0x1b4')]['Game_Vehicle_isLandOk'][_0x3ac2('0x111')](this,_0x5b2a5e,_0x4d4994,_0x17fa71);}}else{const _0x1bee3d=this[_0x3ac2('0x35a')][_0x3ac2('0x335')],_0x5cc403=this[_0x3ac2('0x35a')][_0x3ac2('0x32c')];return VisuMZ[_0x3ac2('0x46')][_0x1bee3d][_0x3ac2('0x1ce')][_0x5cc403];}}if(this[_0x3ac2('0x418')]!==undefined){const _0x3ae07d=this['_eventSpawnData'][_0x3ac2('0x335')],_0x106f9e=this[_0x3ac2('0x418')][_0x3ac2('0x32c')];return VisuMZ['PreloadedMaps'][_0x3ae07d][_0x3ac2('0x1ce')][_0x106f9e];}if($gameTemp[_0x3ac2('0x23')]!==undefined){const _0x3d9b5f=$gameTemp[_0x3ac2('0x23')][_0x3ac2('0x335')],_0x472efb=$gameTemp[_0x3ac2('0x23')][_0x3ac2('0x32c')];return VisuMZ[_0x3ac2('0x46')][_0x3d9b5f][_0x3ac2('0x1ce')][_0x472efb];}return VisuMZ['EventsMoveCore'][_0x3ac2('0x97')][_0x3ac2('0x111')](this);},Game_Event['prototype'][_0x3ac2('0x13c')]=function(_0x208c75,_0x28ed57){if(_0x208c75===0x0||_0x28ed57===0x0)return![];if(!VisuMZ[_0x3ac2('0x46')][_0x208c75])return $gameTemp[_0x3ac2('0x6e')]()&&console[_0x3ac2('0x14d')](_0x3ac2('0x2a9')['format'](_0x208c75)),![];return!![];},VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x29e')]=Game_Event['prototype'][_0x3ac2('0x311')],Game_Event[_0x3ac2('0x1f1')][_0x3ac2('0x311')]=function(){VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x29e')][_0x3ac2('0x111')](this);if(Imported[_0x3ac2('0x19a')]&&Input['isPressed'](VisuMZ[_0x3ac2('0xfe')][_0x3ac2('0x1d5')][_0x3ac2('0x295')][_0x3ac2('0x341')])){if(_0x3ac2('0x416')!==_0x3ac2('0x79'))Input[_0x3ac2('0x7c')]();else{function _0x2ec16b(){const _0x28c8b4=_0x518745(_0x1d008c['$1']),_0x4c9ca2=_0x43ce80(_0x43b71c['$2']);return this[_0x3ac2('0x274')](_0x28c8b4,_0x4c9ca2);}}}},Game_Event['prototype'][_0x3ac2('0x427')]=function(){const _0x6cb666=this[_0x3ac2('0x179')]()[_0x3ac2('0x296')];if(_0x6cb666==='')return;if(DataManager[_0x3ac2('0x24b')]()||DataManager[_0x3ac2('0x273')]())return;const _0x827e24=VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x1d5')][_0x3ac2('0x2df')];let _0x494340=null,_0x1c1cb4=0x0,_0x4d0461=0x0;if(_0x6cb666['match'](/<COPY EVENT:[ ]MAP[ ](\d+),[ ]EVENT[ ](\d+)>/i))_0x1c1cb4=Number(RegExp['$1']),_0x4d0461=Number(RegExp['$2']);else{if(_0x6cb666[_0x3ac2('0x1fa')](/<COPY EVENT:[ ](\d+),[ ](\d+)>/i))_0x1c1cb4=Number(RegExp['$1']),_0x4d0461=Number(RegExp['$2']);else{if(_0x6cb666[_0x3ac2('0x1fa')](/<COPY EVENT:[ ](.*?)>/i)){const _0x4c34df=String(RegExp['$1'])[_0x3ac2('0x2c8')]()['trim']();_0x494340=VisuMZ['EventTemplates'][_0x4c34df];if(!_0x494340)return;_0x1c1cb4=_0x494340['MapID'],_0x4d0461=_0x494340[_0x3ac2('0x28')];}}}if(!this[_0x3ac2('0x13c')](_0x1c1cb4,_0x4d0461))return;_0x827e24[_0x3ac2('0x1ef')]['call'](this,_0x1c1cb4,_0x4d0461,this);if(_0x494340)_0x494340[_0x3ac2('0x1ef')][_0x3ac2('0x111')](this,_0x1c1cb4,_0x4d0461,this);this[_0x3ac2('0x35a')]={'mapId':_0x1c1cb4,'eventId':_0x4d0461},this[_0x3ac2('0x49')]=-0x2,this[_0x3ac2('0x133')](),_0x827e24['PostCopyJS'][_0x3ac2('0x111')](this,_0x1c1cb4,_0x4d0461,this);if(_0x494340)_0x494340[_0x3ac2('0x101')][_0x3ac2('0x111')](this,_0x1c1cb4,_0x4d0461,this);$gameMap['clearEventCache']();},Game_Event[_0x3ac2('0x1f1')]['setupMorphEvent']=function(){const _0x15e64f=$gameSystem[_0x3ac2('0x1b')](this);if(!_0x15e64f)return;const _0x39d73d=_0x15e64f[_0x3ac2('0x40b')]['toUpperCase']()[_0x3ac2('0x149')]();if(_0x39d73d!=='UNTITLED'){if(_0x3ac2('0x1b7')!==_0x3ac2('0x1b7')){function _0xfb2217(){return _0x58beda[_0x3ac2('0x1b4')]['Settings'][_0x3ac2('0x143')][_0x3ac2('0x2af')];}}else this['morphIntoTemplate'](_0x39d73d,!![]);}else this[_0x3ac2('0x195')](_0x15e64f[_0x3ac2('0x335')],_0x15e64f[_0x3ac2('0x32c')],!![]);},Game_Event[_0x3ac2('0x1f1')][_0x3ac2('0x195')]=function(_0x1609f8,_0x3261d3,_0x3bcb28){if(!this[_0x3ac2('0x13c')](_0x1609f8,_0x3261d3))return;const _0x22f540=VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x1d5')][_0x3ac2('0x2df')];if(!_0x3bcb28)_0x22f540[_0x3ac2('0x1af')][_0x3ac2('0x111')](this,_0x1609f8,_0x3261d3,this);this['_eventMorphData']={'mapId':_0x1609f8,'eventId':_0x3261d3},this[_0x3ac2('0x49')]=-0x2,this[_0x3ac2('0x133')]();if(!_0x3bcb28)_0x22f540[_0x3ac2('0x13b')]['call'](this,_0x1609f8,_0x3261d3,this);this[_0x3ac2('0xd9')]();},Game_Event[_0x3ac2('0x1f1')][_0x3ac2('0x2f4')]=function(_0x5d56ec,_0x4c192c){_0x5d56ec=_0x5d56ec[_0x3ac2('0x2c8')]()[_0x3ac2('0x149')]();const _0x3d8bfe=VisuMZ[_0x3ac2('0x128')][_0x5d56ec];if(!_0x3d8bfe)return;const _0x5230cc=_0x3d8bfe[_0x3ac2('0x432')],_0x38fa68=_0x3d8bfe[_0x3ac2('0x28')];if(!this[_0x3ac2('0x13c')](_0x5230cc,_0x38fa68))return;if(!_0x4c192c)_0x3d8bfe[_0x3ac2('0x1af')][_0x3ac2('0x111')](this,_0x5230cc,_0x38fa68,this);this[_0x3ac2('0x195')](_0x5230cc,_0x38fa68,_0x4c192c);if(!_0x4c192c)_0x3d8bfe['PostMorphJS'][_0x3ac2('0x111')](this,_0x5230cc,_0x38fa68,this);this[_0x3ac2('0xd9')]();},Game_Event[_0x3ac2('0x1f1')][_0x3ac2('0x3bd')]=function(){this[_0x3ac2('0x33')]=undefined,this[_0x3ac2('0x49')]=-0x2,this[_0x3ac2('0x133')]();},Game_Event[_0x3ac2('0x1f1')][_0x3ac2('0x433')]=function(_0x36606c){const _0x37ad98=VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x1d5')][_0x3ac2('0x2df')],_0x3a7b6b=_0x36606c[_0x3ac2('0x40b')][_0x3ac2('0x2c8')]()[_0x3ac2('0x149')](),_0x45b9c1=!['',_0x3ac2('0x125')][_0x3ac2('0x6f')](_0x3a7b6b);let _0x20bea6=0x0,_0x3e1960=0x0;if(_0x45b9c1){const _0x1c4c5d=VisuMZ[_0x3ac2('0x128')][_0x3a7b6b];if(!_0x1c4c5d)return;_0x20bea6=_0x1c4c5d[_0x3ac2('0x432')],_0x3e1960=_0x1c4c5d['EventID'];}else{if(_0x3ac2('0x8e')===_0x3ac2('0x8e'))_0x20bea6=_0x36606c[_0x3ac2('0x335')],_0x3e1960=_0x36606c[_0x3ac2('0x32c')];else{function _0x2fc859(){return _0x2acf24>0x0?0x2:0x8;}}}if(!this[_0x3ac2('0x13c')](_0x20bea6,_0x3e1960))return;if(_0x45b9c1){if(_0x3ac2('0x32a')!==_0x3ac2('0x32a')){function _0x429dde(){return _0x5eaec7[_0x3ac2('0x1b4')][_0x3ac2('0x1ec')][_0x3ac2('0x111')](this);}}else{const _0x4fbdf5=VisuMZ[_0x3ac2('0x128')][_0x3a7b6b];_0x4fbdf5['PreSpawnJS'][_0x3ac2('0x111')](this,_0x20bea6,_0x3e1960,this);}}_0x37ad98[_0x3ac2('0xad')]['call'](this,_0x20bea6,_0x3e1960,this),this['_eventSpawnData']=_0x36606c,this[_0x3ac2('0x49')]=-0x2,this[_0x3ac2('0x20e')]=$gameMap[_0x3ac2('0x335')](),this[_0x3ac2('0x221')]=_0x36606c[_0x3ac2('0x30d')],this[_0x3ac2('0x35e')]=_0x36606c['spawnPreserved'],this[_0x3ac2('0x1b6')](_0x36606c['x'],_0x36606c['y']),this['setDirection'](_0x36606c['direction']),this[_0x3ac2('0x133')]();if(_0x45b9c1){const _0x35e582=VisuMZ['EventTemplates'][_0x3a7b6b];if(!_0x35e582)return;_0x35e582[_0x3ac2('0x336')]['call'](this,_0x20bea6,_0x3e1960,this);}_0x37ad98[_0x3ac2('0x336')]['call'](this,_0x20bea6,_0x3e1960,this);const _0x40da38=SceneManager[_0x3ac2('0x177')];if(_0x40da38&&_0x40da38['_spriteset'])_0x40da38[_0x3ac2('0x1a0')][_0x3ac2('0xee')](this);},Game_Event[_0x3ac2('0x1f1')]['isSpawnedEvent']=function(){return!!this[_0x3ac2('0x418')];},VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x8a')]=Game_Event[_0x3ac2('0x1f1')][_0x3ac2('0x133')],Game_Event[_0x3ac2('0x1f1')][_0x3ac2('0x133')]=function(){VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x8a')][_0x3ac2('0x111')](this),this['setupEventsMoveCoreEffects']();},VisuMZ['EventsMoveCore'][_0x3ac2('0x3c5')]=Game_Event[_0x3ac2('0x1f1')][_0x3ac2('0x21')],Game_Event[_0x3ac2('0x1f1')][_0x3ac2('0x21')]=function(){VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x3c5')]['call'](this),this[_0x3ac2('0x415')]();},VisuMZ['EventsMoveCore']['Game_Event_setupPageSettings']=Game_Event[_0x3ac2('0x1f1')][_0x3ac2('0xdb')],Game_Event[_0x3ac2('0x1f1')][_0x3ac2('0xdb')]=function(){this[_0x3ac2('0xec')]=!![],VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x23b')][_0x3ac2('0x111')](this),this[_0x3ac2('0x1eb')](),this[_0x3ac2('0xec')]=![];},Game_Event[_0x3ac2('0x1f1')][_0x3ac2('0x1eb')]=function(){if(!this[_0x3ac2('0x179')]())return;this[_0x3ac2('0x415')](),this[_0x3ac2('0x381')](),this[_0x3ac2('0x346')](),this[_0x3ac2('0x17f')]();},Game_Event[_0x3ac2('0x1f1')][_0x3ac2('0x381')]=function(){const _0x50c839=this[_0x3ac2('0x179')]()[_0x3ac2('0x296')];if(_0x50c839==='')return;this[_0x3ac2('0x150')](_0x50c839);},Game_Event[_0x3ac2('0x1f1')][_0x3ac2('0x346')]=function(){if(!this[_0x3ac2('0x3d2')]())return;const _0x2e4ade=this[_0x3ac2('0x31c')]();let _0x447d12='';for(const _0x1c453d of _0x2e4ade){if(_0x3ac2('0x6b')==='XLHGl'){if([0x6c,0x198]['includes'](_0x1c453d[_0x3ac2('0x3f1')])){if(_0x3ac2('0xa6')!==_0x3ac2('0x2eb')){if(_0x447d12!=='')_0x447d12+='\x0a';_0x447d12+=_0x1c453d[_0x3ac2('0x392')][0x0];}else{function _0x5928fa(){this['_pose']=_0x4f2ad7[_0x3ac2('0x2c8')]()[_0x3ac2('0x149')](),this[_0x3ac2('0x163')]=_0x56c636||_0x1e9c85;}}}}else{function _0x46e9a5(){_0xd75250[_0x3ac2('0x3e7')](_0x198f0a[_0x3ac2('0x236')],_0x144261[_0x3ac2('0x25c')]);}}}this['checkEventsMoveCoreStringTags'](_0x447d12);},Game_Event[_0x3ac2('0x1f1')][_0x3ac2('0x415')]=function(){const _0x290561=VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x1d5')];this['_activationProximity']={'type':_0x3ac2('0x226'),'distance':0x0,'regionList':[]},this[_0x3ac2('0x36f')]=![],this[_0x3ac2('0x199')]=![],this['_addedHitbox']={'up':0x0,'down':0x0,'left':0x0,'right':0x0},this[_0x3ac2('0x26f')]={'iconIndex':0x0,'bufferX':_0x290561[_0x3ac2('0x3be')][_0x3ac2('0x31b')],'bufferY':_0x290561['Icon'][_0x3ac2('0x1f8')],'blendMode':_0x290561[_0x3ac2('0x3be')]['BlendMode']},this[_0x3ac2('0x3ec')]={'text':'','visibleRange':_0x290561[_0x3ac2('0x143')]['VisibleRange'],'offsetX':_0x290561['Label'][_0x3ac2('0x3ab')],'offsetY':_0x290561[_0x3ac2('0x143')][_0x3ac2('0x18c')]},this[_0x3ac2('0x37f')]=[],this[_0x3ac2('0x1bd')]={'target':-0x1,'type':_0x3ac2('0x5b'),'delay':0x1},this[_0x3ac2('0x67')]=![],this['_shadowGraphic']={'visible':!![],'filename':_0x290561[_0x3ac2('0x23e')][_0x3ac2('0x22a')]},this[_0x3ac2('0x3f')](),this[_0x3ac2('0x36e')]();},Game_Event[_0x3ac2('0x1f1')][_0x3ac2('0x150')]=function(_0x138ef2){if(_0x138ef2[_0x3ac2('0x1fa')](/<ACTIVATION[ ](?:REGION|REGIONS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x3ac2('0x8c')===_0x3ac2('0x8c'))this[_0x3ac2('0x3ba')][_0x3ac2('0x145')]=JSON[_0x3ac2('0x217')]('['+RegExp['$1'][_0x3ac2('0x1fa')](/\d+/g)+']'),this[_0x3ac2('0x3ba')][_0x3ac2('0x25d')]=_0x3ac2('0x17e');else{function _0x4bab06(){const _0x23991f=_0x472207['getSelfTarget']()||this;if(_0x23991f['constructor']!==_0x77b423)return _0x471fde[_0x3ac2('0x1b4')][_0x3ac2('0x31f')][_0x3ac2('0x111')](this,_0xd5b5ab);else{const _0x11af59=[_0x23991f[_0x3ac2('0x20e')],_0x23991f['_eventId'],_0x3ac2('0x317')[_0x3ac2('0x17d')](_0x22e12a)];return _0x1265ed['value'](_0x11af59);}}}}else{if(_0x138ef2[_0x3ac2('0x1fa')](/<ACTIVATION[ ](.*?):[ ](\d+)>/i)){if(_0x3ac2('0x31a')!==_0x3ac2('0xa'))type=String(RegExp['$1'])['toLowerCase']()['trim'](),this[_0x3ac2('0x3ba')][_0x3ac2('0x25d')]=type,this['_activationProximity'][_0x3ac2('0x42e')]=Number(RegExp['$2']);else{function _0x2610ea(){return this[_0x3ac2('0x39b')](_0x4d00ea(_0x2199a9['$1']),_0x453eb5(_0x419c66['$2']));}}}}if(_0x138ef2[_0x3ac2('0x1fa')](/<ALWAYS UPDATE MOVEMENT>/i)){if(_0x3ac2('0x281')!==_0x3ac2('0x3c1'))this[_0x3ac2('0x36f')]=!![];else{function _0xa0941f(){_0x49253c[_0x3ac2('0x3f5')][_0x301a82][_0x3ac2('0x1fa')](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x556712='return\x20%1'[_0x3ac2('0x17d')](_0x1df8e1(_0x1d740d['$1']));_0x1b18cd[_0x3ac2('0x290')][_0x2a11e4]=new _0x548682(_0x3ac2('0x1c0'),_0x556712);}}}if(_0x138ef2[_0x3ac2('0x1fa')](/<CLICK TRIGGER>/i)){if(_0x3ac2('0x231')===_0x3ac2('0x231'))this[_0x3ac2('0x199')]=!![];else{function _0xc4700f(){this[_0x3ac2('0xd7')](_0xc2053b,_0x35db27);}}}const _0x22f1a4=_0x138ef2[_0x3ac2('0x1fa')](/<HITBOX[ ](.*?):[ ](\d+)>/gi);if(_0x22f1a4){if(_0x3ac2('0x230')===_0x3ac2('0x230'))for(const _0x36d221 of _0x22f1a4){if(_0x36d221['match'](/<HITBOX[ ](.*?):[ ](\d+)>/i)){if(_0x3ac2('0x32e')===_0x3ac2('0x182')){function _0x6a3732(){const _0x371fbe=_0x155359['eventsXyNt'](_0x53d582,_0x4f9a16)[_0x3ac2('0x393')](_0x4ee968=>_0x4ee968!==this&&_0x4ee968[_0x3ac2('0x2d1')]());return _0x371fbe[_0x3ac2('0x2b4')]>0x0;}}else{const _0x2c4586=String(RegExp['$1'])[_0x3ac2('0x95')]()[_0x3ac2('0x149')](),_0xe52a2d=Number(RegExp['$2']);this[_0x3ac2('0xcf')][_0x2c4586]=_0xe52a2d;}}}else{function _0x4dea24(){_0x5356a3['EventsMoveCore'][_0x3ac2('0x3f8')]['call'](this),this[_0x3ac2('0x2f6')]();}}}_0x138ef2[_0x3ac2('0x1fa')](/<ICON:[ ](\d+)>/i)&&(this[_0x3ac2('0x26f')]['iconIndex']=Number(RegExp['$1']));if(_0x138ef2[_0x3ac2('0x1fa')](/<ICON (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)){if(_0x3ac2('0x397')!==_0x3ac2('0x397')){function _0x13461d(){const _0x38895a=_0x13a8f3(_0x28bf30['$1']);return this[_0x3ac2('0x164')](_0x38895a);}}else this[_0x3ac2('0x26f')]['bufferX']=Number(RegExp['$1']);}_0x138ef2['match'](/<ICON (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(this[_0x3ac2('0x26f')][_0x3ac2('0x61')]=Number(RegExp['$1']));if(_0x138ef2[_0x3ac2('0x1fa')](/<ICON (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)){if(_0x3ac2('0x178')===_0x3ac2('0x178'))this[_0x3ac2('0x26f')][_0x3ac2('0xf0')]=Number(RegExp['$1']),this[_0x3ac2('0x26f')]['bufferY']=Number(RegExp['$2']);else{function _0x42f2ca(){_0x2e3a0b(_0x3ac2('0xd1')[_0x3ac2('0x17d')](_0x41cca6,_0x33fdc9,_0x15e840)),_0x29f070['exit']();}}}if(_0x138ef2[_0x3ac2('0x1fa')](/<ICON BLEND MODE:[ ](.*?)>/i)){const _0x19e69b=String(RegExp['$1'])[_0x3ac2('0x2c8')]()[_0x3ac2('0x149')](),_0x548859=[_0x3ac2('0x2fc'),_0x3ac2('0x35f'),_0x3ac2('0x240'),_0x3ac2('0x68')];this[_0x3ac2('0x26f')][_0x3ac2('0x1fd')]=_0x548859[_0x3ac2('0x129')](_0x19e69b)[_0x3ac2('0x309')](0x0,0x3);}if(_0x138ef2[_0x3ac2('0x1fa')](/<LABEL:[ ](.*?)>/i)){if(_0x3ac2('0x3b')!==_0x3ac2('0x3b')){function _0xe9a53e(){_0x5d9662[_0x3ac2('0x279')](_0x55ac86,_0x22cc9e),_0x477dd4['setPlayerControlDisable'](!_0x1dd47f['Enable']);}}else this[_0x3ac2('0x3ec')]['text']=String(RegExp['$1'])['trim']();}if(_0x138ef2[_0x3ac2('0x1fa')](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i)){if(_0x3ac2('0x246')!==_0x3ac2('0x246')){function _0x32dc3d(){for(const _0x496c9f of _0x47b982){if(_0x496c9f[_0x3ac2('0x1fa')](/<HITBOX[ ](.*?):[ ](\d+)>/i)){const _0x4144e7=_0x22a71e(_0x22c726['$1'])[_0x3ac2('0x95')]()[_0x3ac2('0x149')](),_0x16fe46=_0x139ed3(_0x6938ea['$2']);this['_addedHitbox'][_0x4144e7]=_0x16fe46;}}}}else this[_0x3ac2('0x3ec')][_0x3ac2('0x239')]=String(RegExp['$1'])[_0x3ac2('0x149')]();}_0x138ef2[_0x3ac2('0x1fa')](/<LABEL (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this['_labelWindow']['offsetX']=Number(RegExp['$1']));_0x138ef2[_0x3ac2('0x1fa')](/<LABEL (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(this['_labelWindow'][_0x3ac2('0x2ca')]=Number(RegExp['$1']));_0x138ef2[_0x3ac2('0x1fa')](/<LABEL (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x3ac2('0x3ec')]['offsetX']=Number(RegExp['$1']),this['_labelWindow'][_0x3ac2('0x2ca')]=Number(RegExp['$2']));$gameTemp[_0x3ac2('0x386')](this);for(;;){if(_0x3ac2('0x44')!==_0x3ac2('0x44')){function _0x168e66(){this[_0x3ac2('0x354')](_0x59ff27),_0x5df523[_0x3ac2('0x386')](this);const _0x4e45bb=_0x467eb6[_0x3ac2('0x1b4')][_0x3ac2('0x180')][_0x3ac2('0x111')](this,_0x59ae7c);return _0x523a77[_0x3ac2('0x342')](),_0x4e45bb;}}else{if(this['_labelWindow'][_0x3ac2('0x239')]['match'](/\\V\[(\d+)\]/gi)){if(_0x3ac2('0x33b')===_0x3ac2('0xfb')){function _0x3112d9(){this[_0x3ac2('0x168')]=this[_0x3ac2('0x168')]||[];const _0x5417d6=new _0x53672d(_0x2e1f46);this['_characterSprites']['push'](_0x5417d6),this['_tilemap'][_0x3ac2('0x2f0')](_0x5417d6),this[_0x3ac2('0x72')](_0x5417d6),this[_0x3ac2('0x14b')](_0x2b187d),_0x5417d6['update']();}}else this[_0x3ac2('0x3ec')][_0x3ac2('0x239')]=this[_0x3ac2('0x3ec')]['text'][_0x3ac2('0x2d0')](/\\V\[(\d+)\]/gi,(_0x27d7ed,_0x40a8d6)=>$gameVariables[_0x3ac2('0x258')](parseInt(_0x40a8d6)));}else{if(_0x3ac2('0x371')===_0x3ac2('0x371'))break;else{function _0x40741d(){this[_0x3ac2('0x2f4')](_0xd20bb5,!![]);}}}}}$gameTemp[_0x3ac2('0x342')]();if(_0x138ef2[_0x3ac2('0x1fa')](/<LABEL RANGE:[ ](\d+)>/i)){if(_0x3ac2('0x56')==='NVLuJ')this[_0x3ac2('0x3ec')][_0x3ac2('0x158')]=Number(RegExp['$1']);else{function _0x5daa4e(){this['_moveSynch'][_0x3ac2('0x382')]=_0x3ac54a(_0x1abbea['$1']);}}}if(_0x138ef2['match'](/<MOVE ONLY (?:REGION|REGIONS):[ ](\d+(?:\s*,\s*\d+)*)>/i)){const _0x46c693=JSON[_0x3ac2('0x217')]('['+RegExp['$1'][_0x3ac2('0x1fa')](/\d+/g)+']');this[_0x3ac2('0x37f')]=this[_0x3ac2('0x37f')]['concat'](_0x46c693),this['_moveOnlyRegions'][_0x3ac2('0xb4')](0x0);}if(_0x138ef2[_0x3ac2('0x1fa')](/<MOVE SYNCH TARGET:[ ](.*?)>/i)){if('cEVNN'===_0x3ac2('0x161')){function _0x161804(){this['x']+=_0x55233c[_0x3ac2('0x1b4')][_0x3ac2('0x1d5')]['VS8'][_0x3ac2('0x42c')],this['y']+=_0x2d397f[_0x3ac2('0x1b4')][_0x3ac2('0x1d5')][_0x3ac2('0xaa')][_0x3ac2('0x3f0')];}}else{const _0x5bfd66=String(RegExp['$1']);if(_0x5bfd66['match'](/PLAYER/i)){if('AMNUq'!==_0x3ac2('0x30e')){function _0x244fbb(){return![];}}else this[_0x3ac2('0x1bd')][_0x3ac2('0x382')]=0x0;}else _0x5bfd66[_0x3ac2('0x1fa')](/EVENT[ ](\d+)/i)&&(this['_moveSynch']['target']=Number(RegExp['$1']));}}_0x138ef2['match'](/<MOVE SYNCH TYPE:[ ](.*?)>/i)&&(this[_0x3ac2('0x1bd')][_0x3ac2('0x25d')]=String(RegExp['$1'])[_0x3ac2('0x95')]()[_0x3ac2('0x149')]());if(_0x138ef2[_0x3ac2('0x1fa')](/<MOVE SYNCH DELAY:[ ](\d+)>/i)){if(_0x3ac2('0x160')===_0x3ac2('0x160'))this[_0x3ac2('0x1bd')][_0x3ac2('0xb8')]=Number(RegExp['$1']);else{function _0x4df401(){_0x46a7d7[_0x3ac2('0xa3')](this);}}}if(_0x138ef2[_0x3ac2('0x1fa')](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)){if(_0x3ac2('0x152')!==_0x3ac2('0x152')){function _0x3bde09(){return this[_0x3ac2('0x1d1')];}}else this[_0x3ac2('0x67')]=!![];}if(_0x138ef2[_0x3ac2('0x1fa')](/<HIDE SHADOW>/i)){if(_0x3ac2('0x2b6')!==_0x3ac2('0x318'))this[_0x3ac2('0x21f')]['visible']=![];else{function _0x3ad832(){_0x31ae3b['EventsMoveCore'][_0x3ac2('0x3ff')]['call'](this,_0x22dd25,_0x190425),this['setupCopyEvent'](),this[_0x3ac2('0x313')](),this[_0x3ac2('0x11')]();}}}_0x138ef2['match'](/<SHADOW FILENAME:[ ](.*?)>/i)&&(this[_0x3ac2('0x21f')][_0x3ac2('0xe')]=String(RegExp['$1']));if(_0x138ef2[_0x3ac2('0x1fa')](/<SPRITE OFFSET X:[ ]([\+\-]\d+)>/i)){if(_0x3ac2('0x3a4')===_0x3ac2('0x3a4'))this[_0x3ac2('0x38c')]=Number(RegExp['$1']);else{function _0x4ad2d6(){this[_0x3ac2('0x406')]-=this[_0x3ac2('0x299')]();}}}if(_0x138ef2[_0x3ac2('0x1fa')](/<SPRITE OFFSET Y:[ ]([\+\-]\d+)>/i)){if('ghAhp'===_0x3ac2('0x324')){function _0x2b3081(){_0x232e3a[_0x3ac2('0x1b4')][_0x3ac2('0x3dc')][_0x3ac2('0x111')](this,_0x28937a);}}else this['_spriteOffsetY']=Number(RegExp['$1']);}_0x138ef2[_0x3ac2('0x1fa')](/<SPRITE OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x3ac2('0x38c')]=Number(RegExp['$1']),this[_0x3ac2('0x261')]=Number(RegExp['$2'])),_0x138ef2[_0x3ac2('0x1fa')](/<STEP PATTERN:[ ](.*)>/i)&&(this[_0x3ac2('0x3ca')]=String(RegExp['$1'])[_0x3ac2('0x2c8')]()[_0x3ac2('0x149')]());},Game_Event[_0x3ac2('0x1f1')][_0x3ac2('0x17f')]=function(){this['updateShadowChanges']();},Game_Event[_0x3ac2('0x1f1')]['isNearTheScreen']=function(){if(this[_0x3ac2('0x36f')])return!![];return Game_Character[_0x3ac2('0x1f1')][_0x3ac2('0x3c9')][_0x3ac2('0x111')](this);},VisuMZ['EventsMoveCore'][_0x3ac2('0x349')]=Game_Event[_0x3ac2('0x1f1')][_0x3ac2('0x202')],Game_Event['prototype'][_0x3ac2('0x202')]=function(){if(this['isPreventSelfMovement']())return;VisuMZ['EventsMoveCore'][_0x3ac2('0x349')][_0x3ac2('0x111')](this),this[_0x3ac2('0x27e')]()&&VisuMZ[_0x3ac2('0xc4')](this[_0x3ac2('0x221')]);},Game_Event['prototype'][_0x3ac2('0x2bf')]=function(){const _0x379ab8=VisuMZ[_0x3ac2('0x1b4')]['Settings'][_0x3ac2('0x23e')];if($gameMap['isEventRunning']()&&_0x379ab8[_0x3ac2('0x39')])return!![];if($gameMessage[_0x3ac2('0x334')]()&&_0x379ab8[_0x3ac2('0xdc')])return!![];if(!$gameSystem[_0x3ac2('0x288')]())return!![];if(this['moveSynchTarget']()>=0x0)return!![];return![];},Game_Event[_0x3ac2('0x1f1')][_0x3ac2('0x2f9')]=function(){const _0x14c3f5=SceneManager[_0x3ac2('0x177')][_0x3ac2('0x1a0')];if(_0x14c3f5){if(_0x3ac2('0x69')!==_0x3ac2('0xf6')){const _0x1bcc96=_0x14c3f5[_0x3ac2('0x13a')](this);_0x1bcc96&&_0x1bcc96[_0x3ac2('0x289')]&&_0x1bcc96[_0x3ac2('0x289')][_0x3ac2('0x40c')]!==this[_0x3ac2('0x248')]()&&(_0x1bcc96['_shadowSprite']['_filename']=this[_0x3ac2('0x248')](),_0x1bcc96[_0x3ac2('0x289')][_0x3ac2('0x3ea')]=ImageManager[_0x3ac2('0x10c')](_0x1bcc96[_0x3ac2('0x289')][_0x3ac2('0x40c')]));}else{function _0x1590c7(){_0x38d919=this['findDirectionTo'](_0x273108,_0x52791d);}}}},Game_Event['prototype'][_0x3ac2('0x248')]=function(){return this[_0x3ac2('0x21f')][_0x3ac2('0xe')];},Game_Event[_0x3ac2('0x1f1')][_0x3ac2('0x2f3')]=function(){if(!this[_0x3ac2('0x21f')][_0x3ac2('0x172')])return![];return Game_CharacterBase[_0x3ac2('0x1f1')]['isShadowVisible'][_0x3ac2('0x111')](this);},Game_Event[_0x3ac2('0x1f1')][_0x3ac2('0x26a')]=function(){return this[_0x3ac2('0x3ec')][_0x3ac2('0x239')];},Game_Event['prototype'][_0x3ac2('0x300')]=function(){return this['_labelWindow'][_0x3ac2('0x158')];},Game_Event[_0x3ac2('0x1f1')][_0x3ac2('0x24e')]=function(_0x6829c2,_0x5b1c3f,_0x525887){if(this[_0x3ac2('0x34d')]())return this[_0x3ac2('0x14e')](_0x6829c2,_0x5b1c3f,_0x525887);if($gameMap[_0x3ac2('0x2cd')](_0x6829c2,_0x5b1c3f,_0x525887,_0x3ac2('0x179')))return!![];if($gameMap[_0x3ac2('0x219')](_0x6829c2,_0x5b1c3f,_0x525887,_0x3ac2('0x179')))return![];return Game_Character[_0x3ac2('0x1f1')][_0x3ac2('0x24e')][_0x3ac2('0x111')](this,_0x6829c2,_0x5b1c3f,_0x525887);},Game_Event[_0x3ac2('0x1f1')][_0x3ac2('0x34d')]=function(){if(this[_0x3ac2('0x37f')]===undefined)this['initEventsMoveCoreEffects']();return this[_0x3ac2('0x37f')][_0x3ac2('0x2b4')]>0x0;},Game_Event[_0x3ac2('0x1f1')][_0x3ac2('0x14e')]=function(_0x2c03bb,_0x23d0e3,_0x1f0d5e){const _0x50b955=$gameMap[_0x3ac2('0x2cf')](_0x2c03bb,_0x1f0d5e),_0x5489ec=$gameMap[_0x3ac2('0x29f')](_0x23d0e3,_0x1f0d5e),_0x332f65=$gameMap[_0x3ac2('0x2ed')](_0x50b955,_0x5489ec);return this[_0x3ac2('0x37f')][_0x3ac2('0x6f')](_0x332f65);},VisuMZ['EventsMoveCore'][_0x3ac2('0xd3')]=Game_Event[_0x3ac2('0x1f1')][_0x3ac2('0x20c')],Game_Event[_0x3ac2('0x1f1')]['findProperPageIndex']=function(){return this[_0x3ac2('0x1a4')]=![],this[_0x3ac2('0x209')]=![],this['event']()?VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0xd3')][_0x3ac2('0x111')](this):-0x1;},VisuMZ[_0x3ac2('0x1b4')]['Game_Event_meetsConditions']=Game_Event[_0x3ac2('0x1f1')][_0x3ac2('0x361')],Game_Event['prototype'][_0x3ac2('0x361')]=function(_0x1688a0){this[_0x3ac2('0x354')](_0x1688a0),$gameTemp[_0x3ac2('0x386')](this);const _0x156cba=VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x180')][_0x3ac2('0x111')](this,_0x1688a0);return $gameTemp[_0x3ac2('0x342')](),_0x156cba;},Game_Event[_0x3ac2('0x1f1')][_0x3ac2('0x374')]=function(){return this[_0x3ac2('0x1a4')];},Game_Event[_0x3ac2('0x1f1')][_0x3ac2('0x354')]=function(_0x2dd692){const _0x231faf=_0x2dd692[_0x3ac2('0x1ba')];if(_0x231faf['switch1Valid']&&DataManager[_0x3ac2('0x1da')](_0x231faf[_0x3ac2('0x21a')]))this[_0x3ac2('0x1a4')]=!![];else{if(_0x231faf[_0x3ac2('0x41a')]&&DataManager[_0x3ac2('0x1da')](_0x231faf['switch2Id'])){if(_0x3ac2('0x37e')==='ZJkTT'){function _0x2b97a7(){this[_0x3ac2('0xa9')](this['x'],this['y']);}}else this['_advancedSwitchVariable']=!![];}else _0x231faf[_0x3ac2('0x16')]&&DataManager[_0x3ac2('0xe7')](_0x231faf[_0x3ac2('0x1c0')])&&(this[_0x3ac2('0x1a4')]=!![]);}},Game_Event[_0x3ac2('0x1f1')]['hasClickTrigger']=function(){return this['_clickTrigger'];},Game_Event[_0x3ac2('0x1f1')][_0x3ac2('0x110')]=function(){$gameTemp[_0x3ac2('0x372')](),this[_0x3ac2('0x311')]();},Game_Event[_0x3ac2('0x1f1')][_0x3ac2('0x378')]=function(_0x37c077,_0x59da3b){if(this[_0x3ac2('0xcf')])return this[_0x3ac2('0x400')](_0x37c077,_0x59da3b);else{if('UFLtc'!==_0x3ac2('0x419'))return Game_Character[_0x3ac2('0x1f1')][_0x3ac2('0x378')][_0x3ac2('0x111')](this,_0x37c077,_0x59da3b);else{function _0x49dd18(){return 0x8;}}}},Game_Event['prototype']['posEventsMoveCore']=function(_0x33badc,_0x59eba4){var _0x4753a5=this['x']-this[_0x3ac2('0xcf')]['left'],_0x4044d8=this['x']+this[_0x3ac2('0xcf')][_0x3ac2('0x424')],_0x4c92a2=this['y']-this[_0x3ac2('0xcf')]['up'],_0x421aed=this['y']+this[_0x3ac2('0xcf')][_0x3ac2('0x1e4')];return _0x4753a5<=_0x33badc&&_0x33badc<=_0x4044d8&&_0x4c92a2<=_0x59eba4&&_0x59eba4<=_0x421aed;},Game_Event[_0x3ac2('0x1f1')][_0x3ac2('0x423')]=function(_0x530c41,_0x7eacf5,_0x499b7c){for(let _0x3be8f2=-this[_0x3ac2('0xcf')][_0x3ac2('0x13d')];_0x3be8f2<=this[_0x3ac2('0xcf')][_0x3ac2('0x424')];_0x3be8f2++){if(_0x3ac2('0x312')===_0x3ac2('0x312'))for(let _0x2c8df1=-this[_0x3ac2('0xcf')]['up'];_0x2c8df1<=this[_0x3ac2('0xcf')]['down'];_0x2c8df1++){if(!Game_Character[_0x3ac2('0x1f1')]['canPass'][_0x3ac2('0x111')](this,_0x530c41+_0x3be8f2,_0x7eacf5+_0x2c8df1,_0x499b7c)){if(_0x3ac2('0x33e')!==_0x3ac2('0x28a'))return![];else{function _0x2aa8c4(){const _0x3f717a=_0x30e8a0[_0x3ac2('0x179')](_0x484372[_0x3ac2('0x80')]);if(!_0x3f717a)return;_0xfb2dd1[_0x3ac2('0x35b')]!==_0x3ac2('0x125')?_0x3f717a[_0x3ac2('0x2f4')](_0x302a0a[_0x3ac2('0x35b')]):_0x3f717a[_0x3ac2('0x195')](_0x548159[_0x3ac2('0x3bf')],_0x28a6f1['Step2EventId']);}}}}else{function _0x1ea703(){this[_0x3ac2('0x1bd')][_0x3ac2('0xb8')]=_0x3963b4(_0x3fd0dd['$1']);}}}return!![];},Game_Event[_0x3ac2('0x1f1')][_0x3ac2('0x15a')]=function(_0x236b1f,_0x6df5c8){const _0x1f0a27=$gameMap[_0x3ac2('0x6d')](_0x236b1f,_0x6df5c8)[_0x3ac2('0x393')](_0x37d5ca=>_0x37d5ca!==this);return _0x1f0a27[_0x3ac2('0x2b4')]>0x0;},Game_Event[_0x3ac2('0x1f1')][_0x3ac2('0xe5')]=function(_0x53751a,_0x4aed62){if(!this[_0x3ac2('0x2d1')]())return![];else{const _0x5084a9=$gameMap[_0x3ac2('0x6d')](_0x53751a,_0x4aed62)[_0x3ac2('0x393')](_0x21d051=>_0x21d051!==this&&_0x21d051[_0x3ac2('0x2d1')]());return _0x5084a9[_0x3ac2('0x2b4')]>0x0;}},Game_Event['prototype'][_0x3ac2('0xc8')]=function(){return this['_activationProximity'][_0x3ac2('0x25d')]||_0x3ac2('0x226');},Game_Event[_0x3ac2('0x1f1')][_0x3ac2('0x35c')]=function(){return this[_0x3ac2('0x3ba')][_0x3ac2('0x42e')]||0x0;},Game_Event[_0x3ac2('0x1f1')][_0x3ac2('0x135')]=function(){return this[_0x3ac2('0x3ba')]['regionList']||[];},Game_Event[_0x3ac2('0x1f1')][_0x3ac2('0x24')]=function(){Game_Character[_0x3ac2('0x1f1')][_0x3ac2('0x24')][_0x3ac2('0x111')](this);if([_0x3ac2('0x226'),_0x3ac2('0x17e')][_0x3ac2('0x6f')](this[_0x3ac2('0xc8')]()))return;$gamePlayer['checkEventTriggerEventsMoveCore']([0x2]);},VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x367')]=Game_Event[_0x3ac2('0x1f1')]['checkEventTriggerAuto'],Game_Event[_0x3ac2('0x1f1')][_0x3ac2('0x173')]=function(){if(this[_0x3ac2('0xab')]!==0x3)return;if(this['_activationProximityAutoTriggerBypass'])return;if(!this[_0x3ac2('0x3b1')](![]))return;if(!this['checkActivationProximity'](![]))return;VisuMZ[_0x3ac2('0x1b4')]['Game_Event_checkEventTriggerAuto'][_0x3ac2('0x111')](this);},VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0xf2')]=Game_Event[_0x3ac2('0x1f1')][_0x3ac2('0x2f5')],Game_Event[_0x3ac2('0x1f1')][_0x3ac2('0x2f5')]=function(){if(!this[_0x3ac2('0x76')])return;if(!this[_0x3ac2('0x3b1')](!![]))return;if(!this['checkActivationProximity'](!![]))return;VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0xf2')][_0x3ac2('0x111')](this);},Game_Event[_0x3ac2('0x1f1')][_0x3ac2('0x3b1')]=function(_0x56bedc){if(!_0x56bedc&&$gameMap[_0x3ac2('0x23c')]())return![];if(!_0x56bedc&&$gameMap[_0x3ac2('0x2a4')]())return![];if(this[_0x3ac2('0x135')]()<=0x0)return!![];return $gamePlayer[_0x3ac2('0x2c7')](this);},Game_Event[_0x3ac2('0x1f1')][_0x3ac2('0x131')]=function(_0x52ef03){if(!_0x52ef03&&$gameMap[_0x3ac2('0x23c')]())return![];if(!_0x52ef03&&$gameMap['isAnyEventStarting']())return![];if([_0x3ac2('0x226'),_0x3ac2('0x17e')][_0x3ac2('0x6f')](this[_0x3ac2('0xc8')]()))return!![];return $gamePlayer[_0x3ac2('0x22d')](this);},VisuMZ[_0x3ac2('0xc4')]=function(_0x561113){for(const _0x1bb464 of $gameMap[_0x3ac2('0x1ce')]()){if(!_0x1bb464)continue;_0x1bb464[_0x3ac2('0x325')]()===_0x561113&&_0x1bb464[_0x3ac2('0x2de')]();}},VisuMZ['GetMoveSynchTarget']=function(_0x1b3b3e){if(_0x1b3b3e===0x0)return $gamePlayer;return $gameMap[_0x3ac2('0x179')](_0x1b3b3e);},Game_Event[_0x3ac2('0x1f1')][_0x3ac2('0x325')]=function(){return this[_0x3ac2('0x1bd')][_0x3ac2('0x382')];},Game_Event[_0x3ac2('0x1f1')]['moveSynchType']=function(){return this[_0x3ac2('0x1bd')][_0x3ac2('0x25d')];},Game_Event[_0x3ac2('0x1f1')]['realMoveSpeed']=function(){if(this[_0x3ac2('0x325')]()>=0x0){const _0x489f59=VisuMZ[_0x3ac2('0x31d')](this['moveSynchTarget']());if(_0x489f59)return _0x489f59[_0x3ac2('0x34b')]();}return Game_Character['prototype'][_0x3ac2('0x34b')]['call'](this);},Game_Event[_0x3ac2('0x1f1')][_0x3ac2('0x2de')]=function(){this[_0x3ac2('0x1bd')][_0x3ac2('0x11f')]=this[_0x3ac2('0x1bd')][_0x3ac2('0x11f')]||0x0,this['_moveSynch'][_0x3ac2('0x11f')]--;if(this[_0x3ac2('0x1bd')][_0x3ac2('0x11f')]>0x0)return;this['_moveSynch'][_0x3ac2('0x11f')]=this[_0x3ac2('0x1bd')][_0x3ac2('0xb8')],this[_0x3ac2('0x359')]();},Game_Event[_0x3ac2('0x1f1')][_0x3ac2('0x359')]=function(){switch(this[_0x3ac2('0x73')]()){case _0x3ac2('0x5b'):this[_0x3ac2('0x3dd')]();break;case _0x3ac2('0x205'):this[_0x3ac2('0x26b')]();break;case _0x3ac2('0x185'):this[_0x3ac2('0x1b5')]();break;case _0x3ac2('0x4f'):this[_0x3ac2('0x277')]();break;case _0x3ac2('0x27'):case _0x3ac2('0x18e'):this['processMoveSynchMimic']();break;case _0x3ac2('0x404'):case _0x3ac2('0x29d'):this[_0x3ac2('0xe2')]();break;case _0x3ac2('0x241'):case'horizontal\x20mirror':case _0x3ac2('0x1e3'):case _0x3ac2('0x3ae'):this[_0x3ac2('0xca')]();break;case _0x3ac2('0x198'):case'vertical\x20mirror':case'mirror\x20vert':case _0x3ac2('0x352'):this[_0x3ac2('0xa5')]();break;default:this[_0x3ac2('0x3dd')]();break;}this[_0x3ac2('0x355')]();},Game_Event[_0x3ac2('0x1f1')][_0x3ac2('0x3dd')]=function(){const _0x8898e0=[0x2,0x4,0x6,0x8];$gameMap[_0x3ac2('0x42')]()&&_0x8898e0[_0x3ac2('0x2c0')](0x1,0x3,0x7,0x9);const _0x73f0e6=[];for(const _0x4cc1f8 of _0x8898e0){if(this[_0x3ac2('0x423')](this['x'],this['y'],_0x4cc1f8))_0x73f0e6[_0x3ac2('0x2c0')](_0x4cc1f8);}if(_0x73f0e6[_0x3ac2('0x2b4')]>0x0){if(_0x3ac2('0x1b9')===_0x3ac2('0x1b9')){const _0x4cb162=_0x73f0e6[Math[_0x3ac2('0x41d')](_0x73f0e6['length'])];this[_0x3ac2('0x45')](_0x4cb162);}else{function _0x3338a0(){_0xdceef1=_0x3668e7===_0x3ac2('0x2f7')?0x5:_0x2c32ee;const _0x29200d=this[_0x3ac2('0x2cf')](_0x56a61e,_0x4d2b0f),_0x22d716=this[_0x3ac2('0x29f')](_0x30ca23,_0x233c87),_0x2c5567=this['regionId'](_0x29200d,_0x22d716),_0x3ea0a0=this[_0x3ac2('0xde')];if(_0x3ea0a0[_0x3ac2('0x380')][_0x3ac2('0x6f')](_0x2c5567))return!![];else{const _0x101c66=_0x3ac2('0x252')[_0x3ac2('0x17d')](_0x3c82bd[_0x3ac2('0x3e3')](0x0)[_0x3ac2('0x2c8')]()+_0x35a277['slice'](0x1));if(_0x3ea0a0[_0x101c66])return _0x3ea0a0[_0x101c66][_0x3ac2('0x6f')](_0x2c5567);}return![];}}}},Game_Event[_0x3ac2('0x1f1')][_0x3ac2('0x26b')]=function(){const _0x302022=VisuMZ[_0x3ac2('0x31d')](this[_0x3ac2('0x325')]());this[_0x3ac2('0x121')](_0x302022);},Game_Event[_0x3ac2('0x1f1')][_0x3ac2('0x1b5')]=function(){const _0x17b26a=VisuMZ[_0x3ac2('0x31d')](this[_0x3ac2('0x325')]());this['moveAwayFromCharacter'](_0x17b26a);},Game_Event[_0x3ac2('0x1f1')][_0x3ac2('0x277')]=function(){this[_0x3ac2('0xc2')]();},Game_Event[_0x3ac2('0x1f1')][_0x3ac2('0x1df')]=function(){const _0x55b1ed=VisuMZ[_0x3ac2('0x31d')](this[_0x3ac2('0x325')]());this[_0x3ac2('0x45')](_0x55b1ed[_0x3ac2('0x322')]());},Game_Event[_0x3ac2('0x1f1')][_0x3ac2('0xe2')]=function(){const _0x2defd0=VisuMZ[_0x3ac2('0x31d')](this[_0x3ac2('0x325')]()),_0x1fa835=this[_0x3ac2('0x18b')](_0x2defd0[_0x3ac2('0x322')]());this[_0x3ac2('0x45')](this[_0x3ac2('0x18b')](_0x2defd0[_0x3ac2('0x2c6')]()));},Game_Event[_0x3ac2('0x1f1')][_0x3ac2('0xca')]=function(){const _0x50e2e1=VisuMZ[_0x3ac2('0x31d')](this[_0x3ac2('0x325')]()),_0x45c419=[0x0,0x7,0x8,0x9,0x4,0x0,0x6,0x1,0x2,0x3][_0x50e2e1['lastMovedDirection']()];this[_0x3ac2('0x45')](_0x45c419);},Game_Event[_0x3ac2('0x1f1')][_0x3ac2('0xa5')]=function(){const _0x32d884=VisuMZ['GetMoveSynchTarget'](this[_0x3ac2('0x325')]()),_0x1546b2=[0x0,0x3,0x2,0x1,0x6,0x0,0x4,0x9,0x8,0x7][_0x32d884[_0x3ac2('0x322')]()];this[_0x3ac2('0x45')](_0x1546b2);},Game_Event[_0x3ac2('0x1f1')][_0x3ac2('0x11')]=function(){const _0x5af3f5=$gameSystem[_0x3ac2('0x83')](this);if(!_0x5af3f5)return;this[_0x3ac2('0x1b6')](_0x5af3f5['x'],_0x5af3f5['y']),this[_0x3ac2('0x29a')](_0x5af3f5[_0x3ac2('0x2c6')]);if(this[_0x3ac2('0x49')]===_0x5af3f5[_0x3ac2('0x2d8')]){if(_0x3ac2('0x1a3')!==_0x3ac2('0x1a3')){function _0x6f73cf(){return _0xf36d3d[_0x3ac2('0x25e')]()?_0x4d16ea['prototype']['getEventIconData'][_0x3ac2('0x111')](this):this[_0x3ac2('0x26f')];}}else this[_0x3ac2('0x235')]=_0x5af3f5[_0x3ac2('0x1e5')];}},Game_Event['prototype'][_0x3ac2('0x82')]=function(){Game_Character[_0x3ac2('0x1f1')][_0x3ac2('0x82')][_0x3ac2('0x111')](this),this[_0x3ac2('0x112')]();},Game_Event[_0x3ac2('0x1f1')][_0x3ac2('0xd5')]=function(){if($gameMap[_0x3ac2('0x401')]())return!![];return this[_0x3ac2('0x67')];},Game_Event[_0x3ac2('0x1f1')][_0x3ac2('0x112')]=function(){if(!this[_0x3ac2('0xd5')]())return;this[_0x3ac2('0x12d')]();},Game_Event[_0x3ac2('0x1f1')][_0x3ac2('0x12d')]=function(){$gameSystem[_0x3ac2('0x12d')](this);},Game_Event[_0x3ac2('0x1f1')][_0x3ac2('0x12e')]=function(){$gameSystem[_0x3ac2('0xa3')](this);},Game_Event[_0x3ac2('0x1f1')][_0x3ac2('0x25e')]=function(){return $gameSystem[_0x3ac2('0x25e')]()?Game_Character[_0x3ac2('0x1f1')][_0x3ac2('0x25e')][_0x3ac2('0x111')](this):this['_eventIcon'];},Game_Event['prototype'][_0x3ac2('0x123')]=function(){return this[_0x3ac2('0x209')];},VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x376')]=Game_Event[_0x3ac2('0x1f1')][_0x3ac2('0x361')],Game_Event['prototype'][_0x3ac2('0x361')]=function(_0x4bab27){const _0x1a1c42=VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x376')]['call'](this,_0x4bab27);if(!_0x1a1c42)return![];return this[_0x3ac2('0x2f8')](_0x4bab27);},Game_Event['prototype'][_0x3ac2('0x2f8')]=function(_0x450915){VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x1dd')][_0x3ac2('0x60')](_0x450915),this[_0x3ac2('0x209')]=_0x450915[_0x3ac2('0x8d')][_0x3ac2('0x2b4')]>0x0;if(_0x450915[_0x3ac2('0x8d')]===undefined){if(_0x3ac2('0x88')!==_0x3ac2('0xbd'))VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x1dd')]['loadCPC'](_0x450915);else{function _0x31e56f(){return this['isSpriteVS8dir']()&&_0x4a19f6[_0x3ac2('0x1b4')][_0x3ac2('0x1d5')][_0x3ac2('0xaa')]['AutoBuffer'];}}}if(_0x450915[_0x3ac2('0x8d')]['length']>0x0)return $gameMap['event'](this[_0x3ac2('0x221')])&&VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x1dd')][_0x3ac2('0x276')](_0x450915[_0x3ac2('0x8d')],this['_eventId']);return!![];},VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x40d')]=Game_Troop[_0x3ac2('0x1f1')]['meetsConditions'],Game_Troop[_0x3ac2('0x1f1')][_0x3ac2('0x361')]=function(_0xe277c4){var _0xdbc494=VisuMZ[_0x3ac2('0x1b4')]['Game_Troop_meetsConditionsCPC'][_0x3ac2('0x111')](this,_0xe277c4);return _0xdbc494&&this['CPCsMet'](_0xe277c4);},Game_Troop[_0x3ac2('0x1f1')][_0x3ac2('0x15e')]=function(_0x453c3c){_0x453c3c[_0x3ac2('0x8d')]===undefined&&VisuMZ[_0x3ac2('0x1b4')]['CustomPageConditions']['loadCPC'](_0x453c3c);if(_0x453c3c[_0x3ac2('0x8d')][_0x3ac2('0x2b4')]>0x0){if(_0x3ac2('0x345')===_0x3ac2('0x31')){function _0x2f4566(){this[_0x3ac2('0x72')](_0x55698e);}}else return VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x1dd')][_0x3ac2('0x276')](_0x453c3c['CPC'],0x0);}return!![];},VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x120')]=Game_Interpreter['prototype'][_0x3ac2('0x52')],Game_Interpreter[_0x3ac2('0x1f1')][_0x3ac2('0x52')]=function(){if(this['_waitMode']===_0x3ac2('0x105')){if(window[this[_0x3ac2('0x1f3')]])this[_0x3ac2('0x13f')]='',this[_0x3ac2('0x147')]();else{if(_0x3ac2('0x2a2')!==_0x3ac2('0x8f'))return!![];else{function _0x35efcf(){return _0x334f43['EventsMoveCore'][_0x3ac2('0x181')][_0x3ac2('0x111')](this)+(this[_0x3ac2('0x38c')]||0x0);}}}}else return VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x120')][_0x3ac2('0x111')](this);},VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x271')]=Game_Interpreter[_0x3ac2('0x1f1')][_0x3ac2('0x2ab')],Game_Interpreter[_0x3ac2('0x1f1')][_0x3ac2('0x2ab')]=function(){const _0x543eb6=$gameMap&&this['_eventId']?$gameMap[_0x3ac2('0x179')](this['_eventId']):null;$gameTemp[_0x3ac2('0x386')](_0x543eb6);const _0x3b64e7=VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x271')][_0x3ac2('0x111')](this);return $gameTemp[_0x3ac2('0x342')](),_0x3b64e7;},VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x3f3')]=Game_Interpreter['prototype'][_0x3ac2('0x337')],Game_Interpreter[_0x3ac2('0x1f1')][_0x3ac2('0x337')]=function(_0x5196e3){return $gameTemp[_0x3ac2('0x3b7')](this),VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x3f3')][_0x3ac2('0x111')](this,_0x5196e3);},Game_Interpreter[_0x3ac2('0x1f1')][_0x3ac2('0x232')]=function(_0xff1cfd){this[_0x3ac2('0x1e2')]=_0xff1cfd;const _0x2648c7=_0x3ac2('0x16b')[_0x3ac2('0x17d')](_0xff1cfd[_0x3ac2('0x335')][_0x3ac2('0x1b1')](0x3));this[_0x3ac2('0x1f3')]=_0x3ac2('0x37')+Graphics[_0x3ac2('0x284')]+'_'+this[_0x3ac2('0x32c')](),DataManager[_0x3ac2('0x3aa')](this[_0x3ac2('0x1f3')],_0x2648c7);if(window[this[_0x3ac2('0x1f3')]])this[_0x3ac2('0x147')]();else{if(_0x3ac2('0x4a')!==_0x3ac2('0x1f7'))this[_0x3ac2('0x2c9')](_0x3ac2('0x105'));else{function _0x5cd204(){_0x3e1aa1[_0x3ac2('0x1b4')]['Game_CharacterBase_moveDiagonally'][_0x3ac2('0x111')](this,_0x25764f,_0x367675);if(this['isSpriteVS8dir']())this[_0x3ac2('0x3ad')](_0x30ba32,_0x360d7b);}}}},Game_Interpreter['prototype'][_0x3ac2('0x147')]=function(){const _0x28a67d=this[_0x3ac2('0x1e2')],_0x312679=window[this[_0x3ac2('0x1f3')]],_0xdaf1cb=_0x312679['events'][_0x28a67d['eventId']];if(_0xdaf1cb&&_0xdaf1cb[_0x3ac2('0x2dd')][_0x28a67d[_0x3ac2('0x301')]-0x1]){if(_0x3ac2('0x1ad')!==_0x3ac2('0x328')){const _0x264059=_0xdaf1cb[_0x3ac2('0x2dd')][_0x28a67d[_0x3ac2('0x301')]-0x1][_0x3ac2('0x31c')];this['setupChild'](_0x264059,this[_0x3ac2('0x32c')]());}else{function _0x2f78b0(){let _0x5dda0c='';for(const _0x141bec of _0x134d5a[_0x3ac2('0x31c')]){[0x6c,0x198][_0x3ac2('0x6f')](_0x141bec['code'])&&(_0x5dda0c+=_0x141bec[_0x3ac2('0x392')][0x0]);}if(_0x5dda0c[_0x3ac2('0x1fa')](/<LABEL:[ ](.*?)>/i))return!![];if(_0x5dda0c['match'](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];}}}window[this[_0x3ac2('0x1f3')]]=undefined,this[_0x3ac2('0x1f3')]=undefined,this[_0x3ac2('0x1e2')]=undefined;};function Game_CPCInterpreter(){this['initialize']['apply'](this,arguments);};Game_CPCInterpreter[_0x3ac2('0x1f1')]=Object['create'](Game_Interpreter['prototype']),Game_CPCInterpreter[_0x3ac2('0x1f1')][_0x3ac2('0x54')]=Game_CPCInterpreter,Game_CPCInterpreter[_0x3ac2('0x1f1')][_0x3ac2('0x7c')]=function(){Game_Interpreter[_0x3ac2('0x1f1')][_0x3ac2('0x7c')]['call'](this),this[_0x3ac2('0x315')]=![];},Game_CPCInterpreter[_0x3ac2('0x1f1')]['execute']=function(){while(this[_0x3ac2('0x254')]()){if(_0x3ac2('0x11d')===_0x3ac2('0x11d'))this['executeCommand']();else{function _0x1419fe(){this[_0x3ac2('0x3ce')]();}}}},Game_CPCInterpreter[_0x3ac2('0x1f1')][_0x3ac2('0x38a')]=function(_0x42db01){Game_Interpreter['prototype'][_0x3ac2('0x38a')][_0x3ac2('0x111')](this,_0x42db01);if(this['_comments'][_0x3ac2('0x2b0')](_0x5d9a79=>_0x5d9a79['match'](/<(?:CONDITION|CONDITIONS) MET>/i))){if('DWroI'!==_0x3ac2('0x119'))this[_0x3ac2('0x315')]=!![];else{function _0x3802b1(){if(this[_0x3ac2('0x29')]())return this[_0x3ac2('0x1d7')]();return _0x5b2c88['EventsMoveCore'][_0x3ac2('0x1a6')][_0x3ac2('0x111')](this);}}}return!![];},VisuMZ['EventsMoveCore'][_0x3ac2('0x1e0')]=Scene_Map[_0x3ac2('0x1f1')][_0x3ac2('0x238')],Scene_Map[_0x3ac2('0x1f1')][_0x3ac2('0x238')]=function(){VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x1e0')][_0x3ac2('0x111')](this),this[_0x3ac2('0x1a0')]['hideShadows']();},VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x40')]=Scene_Load[_0x3ac2('0x1f1')][_0x3ac2('0x28e')],Scene_Load[_0x3ac2('0x1f1')][_0x3ac2('0x28e')]=function(){if($gameMap)$gameMap[_0x3ac2('0xd9')]();VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x40')][_0x3ac2('0x111')](this);},VisuMZ[_0x3ac2('0x1b4')]['Sprite_Character_initMembers']=Sprite_Character['prototype'][_0x3ac2('0x22f')],Sprite_Character[_0x3ac2('0x1f1')][_0x3ac2('0x22f')]=function(){VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x216')][_0x3ac2('0x111')](this),this[_0x3ac2('0x154')](),this[_0x3ac2('0x176')]();},Sprite_Character[_0x3ac2('0x1f1')][_0x3ac2('0x154')]=function(){this[_0x3ac2('0x37a')]=0xff;},Sprite_Character[_0x3ac2('0x1f1')]['createIconSprite']=function(){this[_0x3ac2('0x3f9')]=new Sprite(),this['_eventIconSprite'][_0x3ac2('0x3ea')]=ImageManager[_0x3ac2('0x10c')](_0x3ac2('0x2ba')),this[_0x3ac2('0x3f9')]['setFrame'](0x0,0x0,0x0,0x0),this[_0x3ac2('0x3f9')][_0x3ac2('0x39d')]['x']=0.5,this[_0x3ac2('0x3f9')][_0x3ac2('0x39d')]['y']=0x1,this[_0x3ac2('0x2f0')](this[_0x3ac2('0x3f9')]);},Sprite_Character[_0x3ac2('0x1f1')][_0x3ac2('0x29')]=function(){return this['_characterName']&&this[_0x3ac2('0x41e')][_0x3ac2('0x1fa')](/\[VS8\]/i);},Sprite_Character[_0x3ac2('0x1f1')][_0x3ac2('0x4e')]=function(){return this[_0x3ac2('0x29')]()&&VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x1d5')][_0x3ac2('0xaa')]['AutoBuffer'];},VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x405')]=Sprite_Character[_0x3ac2('0x1f1')][_0x3ac2('0x355')],Sprite_Character[_0x3ac2('0x1f1')][_0x3ac2('0x355')]=function(){VisuMZ['EventsMoveCore'][_0x3ac2('0x405')][_0x3ac2('0x111')](this),VisuMZ[_0x3ac2('0x1b4')]['Settings']['Movement'][_0x3ac2('0xa7')]&&this[_0x3ac2('0x351')](),this[_0x3ac2('0x289')]&&this[_0x3ac2('0x308')](),this[_0x3ac2('0x3f9')]&&this[_0x3ac2('0x1f2')]();},VisuMZ[_0x3ac2('0x1b4')]['Sprite_Character_characterPatternY']=Sprite_Character[_0x3ac2('0x1f1')][_0x3ac2('0x16a')],Sprite_Character[_0x3ac2('0x1f1')][_0x3ac2('0x16a')]=function(){if(this[_0x3ac2('0x29')]()){if('fKrCw'!==_0x3ac2('0x2d')){function _0x5767e0(){this[_0x3ac2('0xf1')]();}}else return this[_0x3ac2('0x2b')]();}else{if(_0x3ac2('0x331')!==_0x3ac2('0x1a8'))return VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x18a')]['call'](this);else{function _0x2b77d1(){return _0x3dcaf9[_0x3ac2('0x1b4')][_0x3ac2('0x18a')][_0x3ac2('0x111')](this);}}}},Sprite_Character[_0x3ac2('0x1f1')]['characterPatternYVS8']=function(){const _0x2a3d36=this[_0x3ac2('0x26')]['direction'](),_0xc72c25=[0x2,0x2,0x2,0x4,0x4,0x2,0x6,0x6,0x8,0x8];return(_0xc72c25[_0x2a3d36]-0x2)/0x2;},Sprite_Character[_0x3ac2('0x1f1')][_0x3ac2('0x351')]=function(){this['rotation']=0x0;if(this[_0x3ac2('0x1db')]()){const _0x442ef=VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x1d5')][_0x3ac2('0x23e')],_0xe9655=this[_0x3ac2('0x26')][_0x3ac2('0x2c6')]();if([0x1,0x4,0x7][_0x3ac2('0x6f')](_0xe9655))this[_0x3ac2('0x130')]=_0x442ef['TiltLeft'];if([0x3,0x6,0x9][_0x3ac2('0x6f')](_0xe9655))this[_0x3ac2('0x130')]=_0x442ef[_0x3ac2('0x2a7')];[0x2,0x8][_0x3ac2('0x6f')](_0xe9655)&&(this[_0x3ac2('0x130')]=[-_0x442ef[_0x3ac2('0xfa')],0x0,_0x442ef[_0x3ac2('0xfa')]][this['_character']['pattern']()]);}},Sprite_Character[_0x3ac2('0x1f1')]['isAllowCharacterTilt']=function(){if(this[_0x3ac2('0x85')])return![];return this[_0x3ac2('0x26')][_0x3ac2('0x259')]()&&!this[_0x3ac2('0x26')][_0x3ac2('0x18')]()&&!this[_0x3ac2('0x26')][_0x3ac2('0x3a')]()&&this[_0x3ac2('0x3f6')]()===0x0;},Sprite_Character[_0x3ac2('0x1f1')][_0x3ac2('0x308')]=function(){this[_0x3ac2('0x289')]['x']=this['_character'][_0x3ac2('0x1d')](),this[_0x3ac2('0x289')]['y']=this[_0x3ac2('0x26')][_0x3ac2('0x11e')](),this[_0x3ac2('0x289')][_0x3ac2('0x408')]=this['opacity'],this[_0x3ac2('0x289')]['visible']=this[_0x3ac2('0x26')][_0x3ac2('0x2f3')](),this['_shadowSprite'][_0x3ac2('0x1f4')]=this['_hidden'],!this[_0x3ac2('0x26')][_0x3ac2('0x3c0')]()?(this['_shadowSprite'][_0x3ac2('0x36b')]['x']=Math[_0x3ac2('0x20b')](0x1,this[_0x3ac2('0x289')][_0x3ac2('0x36b')]['x']+0.1),this[_0x3ac2('0x289')][_0x3ac2('0x36b')]['y']=Math[_0x3ac2('0x20b')](0x1,this[_0x3ac2('0x289')][_0x3ac2('0x36b')]['y']+0.1)):(this[_0x3ac2('0x289')]['scale']['x']=Math[_0x3ac2('0x1d2')](0x0,this['_shadowSprite'][_0x3ac2('0x36b')]['x']-0.1),this[_0x3ac2('0x289')][_0x3ac2('0x36b')]['y']=Math[_0x3ac2('0x1d2')](0x0,this[_0x3ac2('0x289')][_0x3ac2('0x36b')]['y']-0.1));},Sprite_Character[_0x3ac2('0x1f1')][_0x3ac2('0x1f2')]=function(){const _0x269f4c=this[_0x3ac2('0x3f9')],_0xe32315=this[_0x3ac2('0x3f6')]();if(_0xe32315<=0x0)return _0x269f4c[_0x3ac2('0x429')](0x0,0x0,0x0,0x0);else{const _0x148eaf=ImageManager['iconWidth'],_0x4d55b5=ImageManager[_0x3ac2('0x1c3')],_0x3ecbf6=_0xe32315%0x10*_0x148eaf,_0x3605f1=Math[_0x3ac2('0x159')](_0xe32315/0x10)*_0x4d55b5;_0x269f4c[_0x3ac2('0x429')](_0x3ecbf6,_0x3605f1,_0x148eaf,_0x4d55b5),this[_0x3ac2('0x172')]=!![];}const _0x233dca=this['_character'][_0x3ac2('0x25e')]();if(this[_0x3ac2('0x4e')]()){if(_0x3ac2('0x3d4')===_0x3ac2('0x3d4'))this[_0x3ac2('0x409')](_0x269f4c);else{function _0x285752(){return _0x32a0eb[_0x3ac2('0x259')]();}}}else{if(_0x3ac2('0x157')!==_0x3ac2('0xff'))_0x269f4c['x']=_0x233dca?_0x233dca[_0x3ac2('0xf0')]:0x0,_0x269f4c['y']=_0x233dca?-this[_0x3ac2('0x280')]+_0x233dca[_0x3ac2('0x61')]:0x0;else{function _0x145c08(){_0x30bbb1[_0x3ac2('0x279')](_0x40b041,_0xa7649);const _0x266dda={'template':_0x3a6d17[_0x3ac2('0x35b')],'mapId':_0x1559d5[_0x3ac2('0x236')],'eventId':_0x33a237[_0x3ac2('0x25c')],'x':_0x3e79f6[_0x3ac2('0x1dc')],'y':_0xf7d4ea[_0x3ac2('0x266')],'spawnPreserved':_0x1b4798[_0x3ac2('0xda')],'spawnEventId':_0x251a6c[_0x3ac2('0xb9')]['length']+0x3e8};_0xa48ce4[_0x3ac2('0x126')](_0x266dda,_0x7d9b3c[_0x3ac2('0x383')],_0x376743[_0x3ac2('0x353')]);}}}_0x269f4c[_0x3ac2('0x1fd')]=_0x233dca?_0x233dca[_0x3ac2('0x1fd')]:0x0,this[_0x3ac2('0x253')](_0x269f4c),this[_0x3ac2('0x2f0')](_0x269f4c),_0x269f4c[_0x3ac2('0x130')]=-this['rotation'];},Sprite_Character[_0x3ac2('0x1f1')][_0x3ac2('0x409')]=function(_0x4cf75e){_0x4cf75e['x']=0x0,_0x4cf75e['y']=-this[_0x3ac2('0x280')]+this[_0x3ac2('0x280')]*0x2/0x5,this[_0x3ac2('0x26')][_0x3ac2('0x1b0')]()!==0x1&&(_0x4cf75e['y']+=0x1);},Sprite_Character[_0x3ac2('0x1f1')][_0x3ac2('0x3f6')]=function(){if(!this[_0x3ac2('0x26')])return 0x0;const _0x53e238=this[_0x3ac2('0x26')][_0x3ac2('0x25e')]();return _0x53e238?_0x53e238[_0x3ac2('0x153')]||0x0:0x0;},VisuMZ[_0x3ac2('0x1b4')]['Sprite_Balloon_setup']=Sprite_Balloon['prototype'][_0x3ac2('0x7a')],Sprite_Balloon['prototype'][_0x3ac2('0x7a')]=function(_0x15519e,_0x57df18){VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x1cc')][_0x3ac2('0x111')](this,_0x15519e,_0x57df18),VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x1d5')][_0x3ac2('0xaa')][_0x3ac2('0x3e2')]&&this['_target']['_character'][_0x3ac2('0x293')](_0x57df18,this[_0x3ac2('0x1ab')]);},VisuMZ[_0x3ac2('0x1b4')]['Sprite_Balloon_updatePosition']=Sprite_Balloon[_0x3ac2('0x1f1')][_0x3ac2('0x127')],Sprite_Balloon[_0x3ac2('0x1f1')][_0x3ac2('0x127')]=function(){VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x3f8')][_0x3ac2('0x111')](this),this[_0x3ac2('0x2f6')]();},Sprite_Balloon[_0x3ac2('0x1f1')][_0x3ac2('0x2f6')]=function(){this[_0x3ac2('0x1c1')][_0x3ac2('0x26')][_0x3ac2('0x29')]()&&(this['x']+=VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x1d5')][_0x3ac2('0xaa')][_0x3ac2('0x42c')],this['y']+=VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x1d5')][_0x3ac2('0xaa')]['BalloonOffsetY']);},VisuMZ[_0x3ac2('0x1b4')]['Spriteset_Map_createLowerLayer']=Spriteset_Map[_0x3ac2('0x1f1')]['createLowerLayer'],Spriteset_Map[_0x3ac2('0x1f1')][_0x3ac2('0x3df')]=function(){VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x285')][_0x3ac2('0x111')](this),this[_0x3ac2('0xe1')]();},VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x57')]=Spriteset_Map[_0x3ac2('0x1f1')]['createShadow'],Spriteset_Map[_0x3ac2('0x1f1')]['createShadow']=function(){VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x57')][_0x3ac2('0x111')](this),this[_0x3ac2('0x190')]();},Spriteset_Map[_0x3ac2('0x1f1')][_0x3ac2('0x190')]=function(){if(!VisuMZ[_0x3ac2('0x1b4')]['Settings'][_0x3ac2('0x23e')]['ShowShadows'])return;for(const _0x2e66c0 of this[_0x3ac2('0x168')]){this[_0x3ac2('0x72')](_0x2e66c0);}},Spriteset_Map[_0x3ac2('0x1f1')][_0x3ac2('0x72')]=function(_0x547826){_0x547826[_0x3ac2('0x289')]=new Sprite(),_0x547826[_0x3ac2('0x289')][_0x3ac2('0x40c')]=_0x547826['_character'][_0x3ac2('0x248')](),_0x547826[_0x3ac2('0x289')][_0x3ac2('0x3ea')]=ImageManager[_0x3ac2('0x10c')](_0x547826[_0x3ac2('0x289')][_0x3ac2('0x40c')]),_0x547826[_0x3ac2('0x289')][_0x3ac2('0x39d')]['x']=0.5,_0x547826['_shadowSprite'][_0x3ac2('0x39d')]['y']=0x1,_0x547826[_0x3ac2('0x289')]['z']=0x0,this[_0x3ac2('0x3a9')][_0x3ac2('0x2f0')](_0x547826[_0x3ac2('0x289')]);},Spriteset_Map[_0x3ac2('0x1f1')][_0x3ac2('0x24d')]=function(){if(!VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x1d5')]['Movement']['ShowShadows'])return;for(const _0x4b4c0d of this['_characterSprites']){this[_0x3ac2('0x3a9')]['removeChild'](_0x4b4c0d[_0x3ac2('0x289')]);}},Spriteset_Map[_0x3ac2('0x1f1')][_0x3ac2('0xe1')]=function(){this[_0x3ac2('0x10d')]=[];for(const _0x544f84 of $gameMap[_0x3ac2('0x1ce')]()){this[_0x3ac2('0x14b')](_0x544f84);}},Spriteset_Map[_0x3ac2('0x1f1')][_0x3ac2('0x14b')]=function(_0x2002e5){if(!this[_0x3ac2('0x9c')](_0x2002e5))return;const _0x2db276=new Window_EventLabel(_0x2002e5);_0x2db276['z']=0x8,_0x2db276[_0x3ac2('0x2c1')]=Sprite[_0x3ac2('0x3e6')]++,this[_0x3ac2('0x3a9')][_0x3ac2('0x2f0')](_0x2db276),this[_0x3ac2('0x10d')][_0x3ac2('0x2c0')](_0x2db276);},Spriteset_Map[_0x3ac2('0x1f1')]['isTargetEventValidForLabelWindow']=function(_0x15ccfd){const _0x19c41e=_0x15ccfd[_0x3ac2('0x179')]();if(_0x19c41e[_0x3ac2('0x296')]['match'](/<LABEL:[ ](.*?)>/i))return!![];if(_0x19c41e['note'][_0x3ac2('0x1fa')](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];for(const _0x1beb3b of _0x19c41e[_0x3ac2('0x2dd')]){if(_0x3ac2('0x435')==='mDmAA'){let _0x26de3c='';for(const _0x59f2a6 of _0x1beb3b[_0x3ac2('0x31c')]){[0x6c,0x198][_0x3ac2('0x6f')](_0x59f2a6['code'])&&(_0x26de3c+=_0x59f2a6[_0x3ac2('0x392')][0x0]);}if(_0x26de3c['match'](/<LABEL:[ ](.*?)>/i))return!![];if(_0x26de3c[_0x3ac2('0x1fa')](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i)){if(_0x3ac2('0xed')!==_0x3ac2('0x428'))return!![];else{function _0x9715ec(){const _0x3ea4cc=this['reverseDir'](this['direction']());return _0x4d2f9c[_0x3ac2('0x2cf')](this['x'],_0x3ea4cc);}}}}else{function _0x223187(){this[_0x3ac2('0x22')]=_0x1940af;}}}return![];},Spriteset_Map[_0x3ac2('0x1f1')][_0x3ac2('0xee')]=function(_0x55e292){this[_0x3ac2('0x168')]=this[_0x3ac2('0x168')]||[];const _0x243fa7=new Sprite_Character(_0x55e292);this[_0x3ac2('0x168')][_0x3ac2('0x2c0')](_0x243fa7),this[_0x3ac2('0x3a9')][_0x3ac2('0x2f0')](_0x243fa7),this[_0x3ac2('0x72')](_0x243fa7),this[_0x3ac2('0x14b')](_0x55e292),_0x243fa7[_0x3ac2('0x355')]();},VisuMZ[_0x3ac2('0x1b4')]['Window_Message_startMessage']=Window_Message['prototype'][_0x3ac2('0x25')],Window_Message[_0x3ac2('0x1f1')][_0x3ac2('0x25')]=function(){$gameMessage['registerSelfEvent'](),VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x224')][_0x3ac2('0x111')](this),$gameTemp['clearSelfTarget']();},VisuMZ[_0x3ac2('0x1b4')]['Window_ScrollText_startMessage']=Window_ScrollText[_0x3ac2('0x1f1')][_0x3ac2('0x25')],Window_ScrollText[_0x3ac2('0x1f1')][_0x3ac2('0x25')]=function(){$gameMessage['registerSelfEvent'](),VisuMZ['EventsMoveCore'][_0x3ac2('0x114')][_0x3ac2('0x111')](this),$gameTemp[_0x3ac2('0x342')]();};function Window_EventLabel(){this[_0x3ac2('0x426')](...arguments);}Window_EventLabel['prototype']=Object['create'](Window_Base[_0x3ac2('0x1f1')]),Window_EventLabel[_0x3ac2('0x1f1')][_0x3ac2('0x54')]=Window_EventLabel,Window_EventLabel[_0x3ac2('0x1f1')][_0x3ac2('0x426')]=function(_0xa4033a){this['_event']=_0xa4033a;const _0x59837e=new Rectangle(0x0,0x0,Graphics[_0x3ac2('0x2c2')]/0x4,this['fittingHeight'](0x1));Window_Base[_0x3ac2('0x1f1')]['initialize'][_0x3ac2('0x111')](this,_0x59837e),this[_0x3ac2('0x0')](0x2),this[_0x3ac2('0x51')]='';},Window_EventLabel[_0x3ac2('0x1f1')][_0x3ac2('0x355')]=function(){Window_Base[_0x3ac2('0x1f1')][_0x3ac2('0x355')][_0x3ac2('0x111')](this),this[_0x3ac2('0x362')](),this[_0x3ac2('0x267')](),this['updatePosition'](),this[_0x3ac2('0x38b')]();},Window_EventLabel[_0x3ac2('0x1f1')][_0x3ac2('0x362')]=function(){this[_0x3ac2('0x1ff')][_0x3ac2('0x26a')]()!==this['_text']&&(this[_0x3ac2('0x51')]=this[_0x3ac2('0x1ff')][_0x3ac2('0x26a')](),this[_0x3ac2('0x133')]());},Window_EventLabel['prototype'][_0x3ac2('0x267')]=function(){this[_0x3ac2('0x36b')]['x']=0x1/$gameScreen[_0x3ac2('0x227')](),this['scale']['y']=0x1/$gameScreen['zoomScale']();},Window_EventLabel['prototype'][_0x3ac2('0x127')]=function(){const _0x160196=SceneManager[_0x3ac2('0x177')]['_spriteset'][_0x3ac2('0x13a')](this[_0x3ac2('0x1ff')]);this['x']=Math[_0x3ac2('0x396')](this[_0x3ac2('0x1ff')][_0x3ac2('0x155')]()-Math[_0x3ac2('0x159')](this[_0x3ac2('0x3d9')]*this['scale']['x']/0x2)),this['x']+=this[_0x3ac2('0x1ff')][_0x3ac2('0x3ec')][_0x3ac2('0x171')],this['y']=this[_0x3ac2('0x1ff')][_0x3ac2('0x338')]()-_0x160196[_0x3ac2('0x280')],this['y']+=Math[_0x3ac2('0x396')]($gameSystem[_0x3ac2('0x223')]()*0.5),this['y']-=Math['round'](this['height']*this[_0x3ac2('0x36b')]['y']),this['y']+=this[_0x3ac2('0x1ff')][_0x3ac2('0x3ec')][_0x3ac2('0x2ca')];},Window_EventLabel[_0x3ac2('0x1f1')][_0x3ac2('0x38b')]=function(){if(this[_0x3ac2('0x23a')]()){if(_0x3ac2('0xb')!=='CxzFz')this[_0x3ac2('0x406')]+=this[_0x3ac2('0x299')]();else{function _0x1d03ef(){_0x5b39c7[_0x3ac2('0x1b4')][_0x3ac2('0x285')][_0x3ac2('0x111')](this),this['createLabelWindows']();}}}else SceneManager[_0x3ac2('0x177')][_0x3ac2('0x436')]>0x0?this['contentsOpacity']=0x0:this['contentsOpacity']-=this[_0x3ac2('0x299')]();},Window_EventLabel['prototype'][_0x3ac2('0x23a')]=function(){if(!$gameSystem[_0x3ac2('0x3f4')]())return![];if(this['_event']?.[_0x3ac2('0x3ee')])return![];if(SceneManager[_0x3ac2('0x177')]['_encounterEffectDuration']>0x0)return![];const _0x2e4808=$gamePlayer['x'],_0x2ecdfd=$gamePlayer['y'],_0x49b2b4=this[_0x3ac2('0x1ff')]['x'],_0x1c1e46=this[_0x3ac2('0x1ff')]['y'];if($gameMap[_0x3ac2('0x1a')](_0x2e4808,_0x2ecdfd,_0x49b2b4,_0x1c1e46)>this[_0x3ac2('0x1ff')][_0x3ac2('0x300')]()){if(_0x3ac2('0xce')==='OseMt'){function _0x5b6ef2(){this[_0x3ac2('0x3a9')][_0x3ac2('0x253')](_0x89f5ed['_shadowSprite']);}}else return![];}return!![];},Window_EventLabel[_0x3ac2('0x1f1')][_0x3ac2('0x299')]=function(){return VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x1d5')][_0x3ac2('0x143')][_0x3ac2('0x27a')];},Window_EventLabel[_0x3ac2('0x1f1')][_0x3ac2('0x30c')]=function(){const _0x510587=this[_0x3ac2('0x14a')](this[_0x3ac2('0x51')]);this[_0x3ac2('0x3d9')]=_0x510587[_0x3ac2('0x3d9')]+($gameSystem[_0x3ac2('0x223')]()+this[_0x3ac2('0x43')]())*0x2,this[_0x3ac2('0x280')]=Math[_0x3ac2('0x1d2')](this[_0x3ac2('0x64')](),_0x510587[_0x3ac2('0x280')])+$gameSystem['windowPadding']()*0x2,this[_0x3ac2('0x10e')]();},Window_EventLabel[_0x3ac2('0x1f1')][_0x3ac2('0x64')]=function(){return VisuMZ[_0x3ac2('0x1b4')]['Settings']['Label'][_0x3ac2('0x1e7')];},Window_EventLabel[_0x3ac2('0x1f1')][_0x3ac2('0x218')]=function(){Window_Base['prototype'][_0x3ac2('0x218')][_0x3ac2('0x111')](this),this[_0x3ac2('0x3fb')][_0x3ac2('0xae')]=this[_0x3ac2('0x3a6')]();},Window_EventLabel[_0x3ac2('0x1f1')][_0x3ac2('0x3a6')]=function(){return VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x1d5')][_0x3ac2('0x143')]['FontSize'];},Window_EventLabel[_0x3ac2('0x1f1')][_0x3ac2('0x133')]=function(){this[_0x3ac2('0x30c')](),this[_0x3ac2('0x3fb')]['clear']();const _0x5f112d=this['_text']['split'](/[\r\n]+/);let _0x173233=0x0;for(const _0x5d7a0a of _0x5f112d){if('dmSIV'===_0x3ac2('0x249')){const _0x9d6ca6=this[_0x3ac2('0x14a')](_0x5d7a0a),_0x211604=Math['floor']((this[_0x3ac2('0x19b')]-_0x9d6ca6[_0x3ac2('0x3d9')])/0x2);this[_0x3ac2('0x193')](_0x5d7a0a,_0x211604,_0x173233),_0x173233+=_0x9d6ca6[_0x3ac2('0x280')];}else{function _0x1fc14f(){_0x3fd496[_0x3ac2('0x279')](_0x26d51e,_0x207fce);if(!_0x2bb7ed)return;_0x5bebe3[_0x3ac2('0x236')]=_0x4d7c5['MapId']||_0x437759[_0x3ac2('0x335')]();if(_0x17ddb5[_0x3ac2('0x335')]()===_0x144d31[_0x3ac2('0x236')]){const _0x400d9e=_0x496b6a[_0x3ac2('0x179')](_0x4174c5[_0x3ac2('0x25c')]);_0x400d9e['removeMorph']();}_0x4b4f29['RemovePreserve']&&_0x20cfe7[_0x3ac2('0x3e7')](_0x326e09['MapId'],_0x59b92a[_0x3ac2('0x25c')]);}}}},Window_EventLabel[_0x3ac2('0x1f1')][_0x3ac2('0x2e2')]=function(_0x371c42,_0x34323d){_0x34323d['drawing']&&this[_0x3ac2('0x1b3')](_0x371c42,_0x34323d['x']+0x2,_0x34323d['y']),_0x34323d['x']+=Math[_0x3ac2('0x20b')](this[_0x3ac2('0x3a5')](),ImageManager[_0x3ac2('0x17b')])+0x4;},Window_EventLabel['prototype']['drawIcon']=function(_0x5e13d6,_0x24099c,_0x12c978){const _0x27ecc4=ImageManager['loadSystem'](_0x3ac2('0x2ba')),_0x2ae6e1=ImageManager[_0x3ac2('0x17b')],_0x124b6d=ImageManager[_0x3ac2('0x1c3')],_0x516d90=_0x5e13d6%0x10*_0x2ae6e1,_0x1e842b=Math[_0x3ac2('0x159')](_0x5e13d6/0x10)*_0x124b6d,_0x599af6=Math[_0x3ac2('0x20b')](this[_0x3ac2('0x3a5')]()),_0x17927e=Math[_0x3ac2('0x20b')](this[_0x3ac2('0x3a5')]());this['contents'][_0x3ac2('0x33f')](_0x27ecc4,_0x516d90,_0x1e842b,_0x2ae6e1,_0x124b6d,_0x24099c,_0x12c978,_0x599af6,_0x17927e);},Window_EventLabel['prototype'][_0x3ac2('0x3a5')]=function(){return VisuMZ[_0x3ac2('0x1b4')][_0x3ac2('0x1d5')][_0x3ac2('0x143')][_0x3ac2('0x2af')];};