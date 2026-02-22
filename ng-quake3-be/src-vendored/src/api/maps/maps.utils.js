export function getMapList() {
    return new Promise((resolve, reject) => {
        resolve([
            {
                name: 'q3dm1',
                title: 'Arena Gate',
                source: 'Orignal Quake 3 Arena',
                description: 'Included in the demo. This arena is an excellent way to start off the Quake III Arena experience; the guys at id Software chose well. It\'s a very simple level, with two main rooms connected by a small branching corridor. The outdoor room has a rocket launcher, some armor shards and health, while the indoor room has a plasma gun, red armor, and some more health. In the corridor lies health and a shotgun. It\'s a simple map, although as would be expected the outdoor room (with the rocket launcher) tends to lead to "king of the mountain" type scenarios.'
            },
            {
                name: 'q3dm2',
                title: 'House of Pain',
                source: 'Orignal Quake 3 Arena',
                description: 'Another good introductory arena. The rocket launcher is in a closed room, and there is a moat-filled passage leading through the center of the arena which leads to a red armor and some health. In the area above the internal moat is a platform where there is ammunition, a shotgun, and the haste powerup spawn point. '
            },
            {
                name: 'q3dm3',
                title: 'Arena of Death',
                source: 'Orignal Quake 3 Arena',
                description: 'This is a fairly modest two-level arena, with the red armor on the top catwalk, and the main weapon respawn alternating between the rocket launcher and the plasma gun. It also contains the first appearance of the grenade launcher; it is located on the diametrically opposite side of the arena, in a dark alcove. '
            },
            {
                name: 'q3dm4',
                title: 'The Place of Many Deaths',
                source: 'Orignal Quake 3 Arena',
                description: 'This is an interesting arena with a quad damage respawn point, and an upper level which can be reached with stairs which contains a rocket launcher. The lower level contains a plasma gun and shotgun. '
            },
            {
                name: 'q3dm5',
                title: 'The Forgotten Place',
                source: 'Orignal Quake 3 Arena',
                description: 'This is a two-level arena with an upper catwalk which contains red armor, a lower level which spans through several large rooms, and several tight corridors. The rocket launcher is contained in a small, vulnerable alcove in the main room; the plasma gun is to be had in the other major room. '
            },
            {
                name: 'q3dm6',
                title: 'The Forgotten Place',
                source: 'Orignal Quake 3 Arena',
                description: 'This relatively large arena has pretty much everything -- numerous upper levels, a precarious walk over some isolated mesas to get the red armor, ammunition, and the personal teleporter, and an extensive central room which contains a quad damage at its base and a rocket launcher at the top (accessible from below via a bounce pad). This one is complex enough to make for a very interesting battle, but not so large that players can\'t find each other. '
            },
            {
                name: 'q3dm7',
                title: 'Temple of Retribution',
                source: 'Orignal Quake 3 Arena',
                description: 'Included in the demo. This is a well-rounded level with a lot of interesting areas. The main area contains a catwalk over a lava moat, a railgun, and a quad damage respawn point, and has a small area beyond the lava moat which leads to an isolated room with the mega health and a gate. Another major nexus is the wide room with the overlying catwalk containing the rocket launcher, a personal teleporter, and a trigger which opens a gate in the floor to an underground area with a cache of health, armor, and red armor. This underground passage leads to yet another major area, an open area which contains the rocket launcher and a plasma gun. Finally, there is a room with a sloping corridor that contains some green health and a plasma gun, and is the point the isolated gate takes you to. '
            },
            {
                name: 'q3dm8',
                title: 'Brimstone Abbey',
                source: 'Orignal Quake 3 Arena',
                description: 'Areas of this arena are very reminiscent of Q3CTF3, but a little exploration reveals that they are similar in vague appearance only. Most noteworthy is that, in the place you might expect a flag, is a powerup respawn point that alternates between the quad damage and invisibility. There is a central, relatively deep moat, which contains some health and the red armor, and is surrounded by several levels and a bounce pad. '
            },
            {
                name: 'q3dm9',
                title: 'Hero\'s Keep',
                source: 'Orignal Quake 3 Arena',
                description: 'This is an example of arena that looks a lot larger than it is, although fog of death hazards are ubiquitous. There are only three significant rooms in this arena, connected by narrow corridors: a room with an acceleration pad back and forth to a small, isolated platform which contains the rocket launcher; a room featuring an acceleration pad to the railgun and another clever sequence of bounce pads which lead to a high-placed platform containing the red armor; and a rather nondescript room which contains the plasma gun and some health. '
            },
            {
                name: 'q3dm10',
                title: 'The Nameless Place',
                source: 'Orignal Quake 3 Arena',
                description: 'This arena is a rather large, complex maze of corridors and stairs and shafts, surrounding a main, exposed hallway which contains the yellow armor leading to a tight T-junction where the rocket launcher rests. Perched on various catwalks and ledges are red armor, a plasma gun, and a lightning gun. '
            },
            {
                name: 'q3dm11',
                title: 'Deva Station',
                source: 'Orignal Quake 3 Arena',
                description: 'Another instant classic arena. This one\'s large but has lots of things to do: a rocket launcher surrounding a partial moat of slime, a plasma gun leading to an empty cliff with a bounce pad in the middle that can get you to a hovering mega health, and a curious hidden passage that leads through a gate to the quad damage, but also an instant barrage of automated grenade fire (get it and run!), past which is the haste on a platform surrounded by health. '
            },
            {
                name: 'q3dm12',
                title: 'The Dredwerkz',
                source: 'Orignal Quake 3 Arena',
                description: 'This is one of my favorite arenas. It is relatively large, and has it all: sniping points (coupled with antisniping points), an underwater passage leading to a regeneration powerup, nearly every weapon in the Quake III Arena arsenal, and acceleration and bumper pads galore. This arena even contains the first appearance of the BFG (perched in a room accessible either via teleporter or the underwater passage). '
            },
            {
                name: 'q3dm13',
                title: 'Lost World',
                source: 'Orignal Quake 3 Arena',
                description: 'Lost World is something of a deviation from the arenas immediately following t and preceding it; it is another multilevel, half-in, half-out arena with most of the weapons but without the BFG. The rocket launcher is placed on a catwalk near a vulnerable alcove where the quad damage powerup spawn point is located. '
            },
            {
                name: 'q3dm14',
                title: 'Grim Dungeons',
                source: 'Orignal Quake 3 Arena',
                description: 'This arena is a bilevel affair with a few topside rooms, including a main courtyard (with a lowered center, containing a mega health under an overhang) which contains a rocket launcher at one end and BFG ammunition at the other, as well as a personal teleporter in a side room. The "dungeons" below contain several areas where a wrong step will toss you into the fog of death; in particular, one room contains a small runaround and a moving platform which, when carefully traversed, will take you to the BFG. (A passage down near the teleporter will also bring you to the isolated BFG platform.) '
            },
            {
                name: 'q3dm15',
                title: 'Demon Keep',
                source: 'Orignal Quake 3 Arena',
                description: 'Another BFG arena, although this time it\'s harder to get to; in the large strangely-shaped platform outside (over the lava lake), a carefully placed rocketjump will get you to a bounce pad, which if hit right (a little below center is just right) will spring you up through the air, into the BFG, and onto a platform containing the red armor. There is also an area underneath where a tight catwalk contains the quad damage, but three pendulums swing back and forth threatening to squash any player that gets in the way (all they need do is touch you). '
            },
            {
                name: 'q3dm16',
                title: 'The Bouncy Map',
                source: 'Orignal Quake 3 Arena',
                description: 'From this point out all the arenas hover over the void. This arena is a relatively straightforward (and small) affair but is loaded with bounce pads. It has a symmetrical layout with a railgun perched on the thin wall separating the two mirror imaged sides; one side contains a rocket launcher and rockets and the other contains a plasma gun and ammunition. '
            },
            {
                name: 'q3dm17',
                title: 'The Longest Yard',
                source: 'Orignal Quake 3 Arena',
                description: 'Included in the demo, The Longest Yard rapidly became one of the most popular Quake III Arena maps. It contains several bounce pads which can juggling people back and forth between two levels, where rocket launchers are easy to find. A central bounce pad can send you up to get a hovering mega health, and one of the other bounce pads can send you to second one, which in turn will launch you up onto the highest platform of all, containing quad damage and a teleporter to the red armor in the center of a walkway. Finally and accelerator pad can launch players to a small, offset platform which contains a railgun. '
            },
            {
                name: 'q3dm18',
                title: ' Space Chamber',
                source: 'Orignal Quake 3 Arena',
                description: 'This is one of the less popular space arenas. It is rather cluttered. It features a hovering rocket launcher which can be reached either by acceleration pad or bounce pad. Further there is a small ridge with stairs leading away on top of which is a railgun. There are numerous bounce pads to the different catwalks and platforms. '
            },
            {
                name: 'q3dm19',
                title: 'Apocalypse Void',
                source: 'Orignal Quake 3 Arena',
                description: 'Another one of the favorites, this arena actually contains numerous platforms which move up and down rhythmically. This arena contains most of the standard weapons and powerups, in addition to the flight powerup, which makes its first and last appearance. '
            },
            {
                name: 'q3tourney1',
                title: 'Powerstation 0218',
                source: 'Orignal Quake 3 Arena',
                description: 'The tournament with Sarge. It\'s the simplest of the tournament levels, and is relatively well-stocked; each substantial room contains a large pillar in the middle which makes for some interesting and non-trivial combat. There\'s a rocket launcher in a dead end, a powerup spawn point that alternates between quad damage and regeneration, and a shotgun.'
            },
            {
                name: 'q3tourney2',
                title: 'The Proving Grounds',
                source: 'Orignal Quake 3 Arena',
                description: 'The tournament with Hunter; it was included in the demo. This arena is somewhat large for two, but it\'s got a simple enough layout that makes it acceptable for this role. It has a symmetrical layout, with a "catacombs" type layout, with a topside area and an area beneath, which can be reached either by dropping through the platform in the main room topside, or by following passages to stairs around the outsides. The main room topside contains numerous armor shards and the yellow armor; the central room underneath contains several bounce pads to reach the top and a rocket launcher. In the underground area that the passages lead to contains some more yellow armor, health, and a lightning gun. '
            },
            {
                name: 'q3tourney3',
                title: 'Hell\'s Gate',
                source: 'Orignal Quake 3 Arena',
                description: 'This is the tournament with Klesk. The arena is small, and contains three precarious catwalks over fog of death. On either side of those catwalks are two small, defensible rooms; one contains the red armor (beneath) and the other contains the rocket launcher (above). A railgun is perched on one side in the open. In the middle of the center catwalk is a respawn point for the battle suit (its first appearance). '
            },
            {
                name: 'q3tourney4',
                title: 'Vertical Vengeance',
                source: 'Orignal Quake 3 Arena',
                description: 'The tournament against Anarki (the only bot, incidentally, to have a colored name). This arena is small but involved; it is multilevel and has a central enclosed (also multilevel) building, which contains an acceleration pad to the railgun. Outside on the various levels is a rocket launcher, the red armor, mega health, and the other weapons. '
            },
            {
                name: 'q3tourney5',
                title: 'Fatal Instinct',
                source: 'Orignal Quake 3 Arena',
                description: 'The last tournament before the final showdown, this time with Uriel. This is a fairly nondescript level (its only salient features being a central courtyard containing the rocket launcher and a short staircase up to a catwalk along the walls). What makes this arena unique (and rather difficult) is that it is filled with a pervasive and very thick yellowish fog, which hampers your vision but not Uriel\'s. '
            },
            {
                name: 'q3tourney6',
                title: 'The Very End of You',
                source: 'Orignal Quake 3 Arena',
                description: 'This is the final tournament with Xaero. There are two main platforms, accessible with acceleration pads, and an interesting arrangement where symmetrical acceleration pads lead to bounce pads which then land the player in a platform containing a BFG with a low ceiling -- which a floating trigger, when shot, will come crashing down on any hapless player (or, after it stays shut for a few moments, will cause any player just reaching the pads to hit the enclosure and fall into the void). Another interesting, but relatively unused feature of this arena is another platform off to the side which contains a mega health and a teleporter, which is accessible via a moving platform which cycles back and forth between the two halves of the arena. '
            },
            {
                name: 'q3ctf1',
                title: 'Dueling Keeps',
                source: 'Orignal Quake 3 Arena',
                description: 'A very reasonable introduction to capture the flag, this arena is a symmetric area with two bases separated by a central courtyard. The courtyard contains in a depressed area in the middle where the red armor respawns, and rocket launchers and health on either side. Each base is connected to the central courtyard by windows (which fire and carefully maneuvering players can traverse) and a door, which then lead to a branching passage, one of which leads the low way to the flag room, and the other the high way. The high way contains the actual platform where the flag is located, and the low way contains a depressed area with rocket armor, a plasma gun, and a yellow armor, ending with a bounce pad that leads to the high platform. '
            },
            {
                name: 'q3ctf2',
                title: 'Troubled Waters',
                source: 'Orignal Quake 3 Arena',
                description: 'This is another symmetric arena, but with each flag area separated by a moat. Each flag area is actually underground. The flag area is on a platform about halfway up the wall with an angled bounce pad to provide access, as well as to a high catwalk overlooking the flag room where defenders can camp. The central moat also connects to each team\'s base by means of an underground, underwater passage. '
            },
            {
                name: 'q3ctf3',
                title: 'The Stronghold',
                source: 'Orignal Quake 3 Arena',
                description: 'A fairly large, symmetric capture the flag arena. The central area contains plasma guns as well as alternating spawns for invisibility and regeneration, and three exits on each side toward the bases -- two via staircase, and one via a floor-level passage. Each staircase leads to the high entrance to the flag room symmetrically on each side, which encounters red armor, lots of green health, an arc of armor shards, and a rocket launcher. The low passage leads through a small, almost maze-like area that enters the flag room from the bottom, with somewhat precarious walkways up to the top of a ramp where the flag rests. The high way connects to this room by a precarious upper passage down an easily defended corridor. '
            },
            {
                name: 'q3ctf4',
                title: 'Space CTF',
                source: 'Orignal Quake 3 Arena',
                description: 'One of the perennial favorites, this is the one and only capture the flag arena with platforms floating in space. Each player starts with a shotgun, and the two bases are connected by various platforms with bounce and acceleration pads. Most noteworthy is the BFG that is floating high above the large platforms, accessible via a tiny platform that slides back and forth underneath it, which can be reached by a well-timed jump off of one of the angled bounce pads from the center platform which contains the mega health. '
            },
            {
                name: 'ospdm1',
                title: 'New Edge',
                source: 'OSP',
                description: ''
            },
            {
                name: 'ospdm2',
                title: 'Batcula',
                source: 'OSP',
                description: ''
            },
            {
                name: 'ospdm3',
                title: 'Scrap Metal ][ - TE',
                source: 'OSP',
                description: ''
            },
            {
                name: 'ospdm4',
                title: 'Bitter Embrace - TE',
                source: 'OSP',
                description: ''
            },
            {
                name: 'ospdm5',
                title: 'Deep Inside',
                source: 'OSP',
                description: ''
            },
            {
                name: 'ospdm6',
                title: 'Suicide',
                source: 'OSP',
                description: ''
            },
            {
                name: 'ospdm7',
                title: 'The Dancehall',
                source: 'OSP',
                description: ''
            },
            {
                name: 'ospdm8',
                title: 'The Chastity Belt Duel (Orange remix)',
                source: 'OSP',
                description: ''
            },
            {
                name: 'ospdm9',
                title: 'Anticipating Oblivion - TE',
                source: 'OSP',
                description: ''
            },
            {
                name: 'ospdm10',
                title: 'Apologie',
                source: 'OSP',
                description: ''
            },
            {
                name: 'ospdm11',
                title: 'The Olden Domain',
                source: 'OSP',
                description: ''
            },
            {
                name: 'ospdm12',
                title: 'Deschutes',
                source: 'OSP',
                description: ''
            },
            {
                name: 'pro-q3dm6',
                title: 'The Campgrounds II',
                source: 'Id Software, Inc.',
                description: 'This relatively large arena has pretty much everything -- numerous upper levels, a precarious walk over some isolated mesas to get the red armor, ammunition, and the personal teleporter, and an extensive central room which contains a quad damage at its base and a rocket launcher at the top (accessible from below via a bounce pad). This one is complex enough to make for a very interesting battle, but not so large that players can\'t find each other. '
            },
            {
                name: 'pro-q3dm13',
                title: 'Lost World II',
                source: 'Id Software, Inc.',
                description: 'Lost World is something of a deviation from the arenas immediately following t and preceding it; it is another multilevel, half-in, half-out arena with most of the weapons but without the BFG. The rocket launcher is placed on a catwalk near a vulnerable alcove where the quad damage powerup spawn point is located. '
            },
            {
                name: 'pro-q3tourney2',
                title: 'The Proving Grounds II',
                source: 'Id Software, Inc.',
                description: ''
            },
            {
                name: 'pro-q3tourney4',
                title: 'Vertical Vengeance II',
                source: 'Id Software, Inc.',
                description: ''
            },
            {
                name: 'rustgrad',
                title: 'Rustgrad',
                source: '..::LvL (Hipshot)',
                description: 'A stunning industrial ruins environment with incredible visual detail. Features multiple levels connected by corridors, catwalks, and jump pads. Excellent flow for FFA and TDM with 3-6 players. One of the highest-rated community maps ever created.'
            },
            {
                name: 'q3gwdm1',
                title: 'Achromatic',
                source: '..::LvL (flipout)',
                description: 'A beautifully crafted gothic arena with clean sightlines and excellent item placement. Supports FFA, TDM, and Tourney for 2-8 players. The monochromatic palette creates a striking visual style while maintaining competitive readability.'
            },
            {
                name: 'trespass',
                title: 'Trespass',
                source: '..::LvL (Pat Howard)',
                description: 'A medium-sized gothic arena with tight corridors and vertical gameplay. Designed primarily for FFA and Tourney (2-5 players). Features strong flow and satisfying combat spaces with careful weapon placement throughout.'
            },
            {
                name: 'phantq3dm3_rev',
                title: 'Corrosion',
                source: '..::LvL (Phantazm11)',
                description: 'An industrial-themed arena with excellent connectivity and multiple routes between areas. Supports FFA, TDM, and Clan Arena for 4-10 players. Features a revised layout optimized for competitive play with balanced item distribution.'
            },
            {
                name: 'hydra',
                title: 'Hydra',
                source: '..::LvL (Pat Howard)',
                description: 'A large gothic arena with impressive architecture and varied combat spaces. Supports FFA, Tourney, and TDM for 2-6 players. Features multi-level areas connected by corridors and teleporters with strategic item placement.'
            },
            {
                name: 'phantq3dm6_mc',
                title: 'Geotechnic',
                source: '..::LvL (Phantazm11)',
                description: 'A massive industrial complex with interconnected rooms and corridors. Best for FFA with 3-8 players. Features expansive vertical spaces, heavy machinery aesthetics, and strategic power-up placement that rewards map knowledge.'
            },
            {
                name: 'solitude',
                title: 'Solitude',
                source: '..::LvL (Hipshot)',
                description: 'An atmospheric gothic arena designed for intimate combat. Ideal for Tourney and small FFA with 2-4 players. Features tight spaces with exceptional lighting and architectural detail from one of the community\'s most respected mappers.'
            },
            {
                name: 'bst3dm1',
                title: 'Terminatria',
                source: '..::LvL (bst)',
                description: 'A well-balanced arena suitable for FFA, TDM, and Tourney with 2-8 players. Features a mix of open areas and tight corridors with multiple height levels. Clean design with strong gameplay flow and satisfying combat encounters.'
            },
            {
                name: 'pukka3tourney2',
                title: 'Evolution',
                source: '..::LvL (thefury)',
                description: 'One of the highest-rated tournament maps in Q3 history. Designed specifically for 1v1 Tourney and CPM with 2-4 players. Features perfectly balanced weapon placement, multiple routes, and intense vertical gameplay. A must-play for competitive duelers.'
            },
            {
                name: 'phantq3dm4',
                title: 'Windsong Keep',
                source: '..::LvL (Phantazm11)',
                description: 'A medieval castle arena with atmospheric lighting and detailed architecture. Supports FFA, TDM, and Tourney for 2-8 players. Features interconnected rooms with catwalks, jump pads, and strategic vantage points.'
            },
            {
                name: 'akutadm1',
                title: 'ALIEN',
                source: '..::LvL (AKUTA)',
                description: 'A sci-fi horror themed arena inspired by the Alien franchise. Supports FFA, TDM, and Tourney for 2-8 players. Dark corridors and atmospheric lighting create tension while maintaining competitive gameplay flow.'
            },
            {
                name: 'map-katdm3',
                title: 'Inner Sanctum',
                source: '..::LvL (kat)',
                description: 'A compact, beautifully detailed arena optimized for 4-player FFA. One of the most consistently highly-rated maps on ..::LvL. Features tight, interconnected spaces with excellent weapon balance and satisfying combat flow.'
            },
            {
                name: 'map-13vast',
                title: 'The Vast And Furious',
                source: '..::LvL (sst13)',
                description: 'A versatile arena supporting CTF, FFA, and TDM for 3-7 players. Features a spacious layout with multiple routes and excellent flag placement for CTF mode. The 13th remix with refined gameplay and improved visuals.'
            },
            {
                name: 'zl3tourney1',
                title: 'Hypersonic Tourney',
                source: '..::LvL (zeal0r)',
                description: 'A fast-paced tourney map designed for intense 1v1 duels with support for 2-5 players in FFA. Features clean architecture, precise item timing, and multiple engagement distances for varied combat styles.'
            },
            {
                name: 'map-wintergames',
                title: 'Winter Games',
                source: '..::LvL (Comic Relief)',
                description: 'A unique snow-themed arena with a skiing and skating motif. Supports FFA for 3-8 players. A fun novelty map that combines solid gameplay with a distinctive winter sports aesthetic. Great for casual sessions.'
            },
            {
                name: 'zih_roof',
                title: 'East Berlin Roofs',
                source: '..::LvL (Zihaben & Alex Vishnevsky)',
                description: 'Fight across the rooftops of East Berlin in this atmospheric open-air arena. Best with 4-12 players for chaotic FFA action. Features custom music, dramatic skybox, and a unique urban setting unlike any other Q3 map.'
            },
            {
                name: 'shad3dm2',
                title: 'Deep Freeze',
                source: '..::LvL (Shadowdane)',
                description: 'An ice-themed arena with excellent flow for FFA, TDM, Tourney, and CPM with 2-6 players. One of the most popular community maps, featuring clean layout, balanced items, and satisfying combat at all skill levels.'
            },
            {
                name: 'map-13dream',
                title: 'Dreamscape',
                source: '..::LvL (sst13)',
                description: 'A surreal, dreamlike arena supporting CTF, FFA, and TDM for 6-10 players. Features unique visual design with floating platforms and ethereal atmosphere. Excellent CTF layout with well-designed flag runs and defensive positions.'
            },
            {
                name: 'revenga',
                title: 'Revenga!',
                source: '..::LvL (Strahlemann)',
                description: 'A compact gothic arena designed for FFA and Tourney with 2-4 players. Features tight corridors and vertical combat spaces with careful item placement. Fast-paced and intense gameplay in a well-polished environment.'
            },
            // === Popular Maps (lvlworld.com/popularmaps) ===
            // Batch 1: High total downloads (classic popular maps)
            {
                name: 'ztn3dm1',
                title: 'Blood Run',
                source: '..::LvL (ztn)',
                description: 'One of the most legendary Q3 custom maps. A masterfully designed tourney/DM arena with perfect item placement and flow. Supports DM, Tourney, and CPM for 3-6 players. Over 27,000 downloads. Also includes ztn3dm1-ho variant with High-Octane item layout.'
            },
            {
                name: 'lun3dm1',
                title: 'Coriolis Storm v2',
                source: '..::LvL (Lunaran)',
                description: 'A sprawling industrial DM map by acclaimed mapper Lunaran. Excellent flow with multiple paths and levels for 4-9 players. Over 28,000 downloads. One of the most popular custom maps ever made.'
            },
            {
                name: 'runtfest',
                title: 'Runtfest',
                source: '..::LvL (Xzed)',
                description: 'A classic fan-favorite DM arena with over 28,000 downloads. Large-scale combat with multiple areas connected by corridors and jump pads. A staple of Q3 custom map servers.'
            },
            {
                name: 'japandm',
                title: 'Japanese Castles (DM)',
                source: '..::LvL (g1zm0)',
                description: 'A beautifully themed Japanese castle environment supporting DM and CTF for 3-8 players. Over 25,000 downloads. Features traditional architecture with cherry blossoms and pagodas. One of the most visually distinctive Q3 maps.'
            },
            {
                name: 'japanctf',
                title: 'Japanese Castles (CTF)',
                source: '..::LvL (g1zm0)',
                description: 'The CTF version of the iconic Japanese Castles map. Symmetric layout with beautiful traditional architecture, perfect for team-based flag capture.'
            },
            {
                name: 'lae3dm1',
                title: 'Nothing At All',
                source: '..::LvL (Laerth)',
                description: 'A tight DM and Tourney arena for 4-5 players with excellent sightlines and item placement. Over 24,000 downloads. Clean gothic design with fast-paced vertical gameplay.'
            },
            {
                name: 'pom_bots',
                title: 'Pyramid of the Magician',
                source: '..::LvL (Sock)',
                description: 'A stunning Mesoamerican-themed arena by legendary mapper Sock. DM and Tourney for 2-5 players. Rated 4.6/5. Over 20,000 downloads. Features incredible architectural detail and atmosphere with bot support.'
            },
            {
                name: 'mvdm01',
                title: 'The Very End Of You Too',
                source: '..::LvL (Munyul Verminard)',
                description: 'A compact Tourney and DM arena for 2-3 players. Over 20,000 downloads. Tight, fast-paced gameplay in a well-crafted space gothic environment.'
            },
            {
                name: 'overkill',
                title: 'Overkill!',
                source: '..::LvL (Wiebo de Wit)',
                description: 'A large-scale DM and TDM arena for 5-16 players. Over 19,000 downloads. Perfect for big FFA matches with multiple combat zones and heavy weapon placement.'
            },
            {
                name: 'fr3dm1',
                title: 'Iron Yard',
                source: '..::LvL (Friction)',
                description: 'An industrial DM arena for 3-7 players rated 4.3/5. Over 19,000 downloads. Gritty industrial theme with excellent gameplay flow and item balance.'
            },
            {
                name: 'lloydmdm2',
                title: 'Ancient Archipelago',
                source: '..::LvL (Lloyd Morris)',
                description: 'A sprawling DM map for 5-12 players. Over 19,000 downloads. Features a unique island/archipelago theme with bridges and open areas for large-scale combat.'
            },
            {
                name: 't8dm5',
                title: 'Kihaku (Intensity)',
                source: '..::LvL (Mr.CleaN)',
                description: 'A polished DM arena for 3-6 players. Over 18,000 downloads. Clean design with excellent flow and item placement. A tournament-quality map.'
            },
            {
                name: 'simetrik',
                title: "Si'Metrik",
                source: '..::LvL (Sock)',
                description: 'An elegant DM arena by Sock for 3-8 players. Over 18,000 downloads. Features clean symmetrical design with excellent flow. Also included in the PlanetQuake Pack.'
            },
            {
                name: 'auh3dm1',
                title: 'OverWhelming Hostility',
                source: '..::LvL (Auhsan)',
                description: 'A DM and Tourney arena with CPM support for 2-5 players. Over 18,000 downloads. Dark gothic theme with tight corridors and vertical combat.'
            },
            {
                name: 'estatica',
                title: 'Estatica',
                source: '..::LvL (Cardigan)',
                description: 'A beautiful DM, Tourney, and FFA arena by Cardigan (also creator of Trespass and Hydra). Rated 4.4/5 with over 18,000 downloads. Elegant design with excellent gameplay.'
            },
            {
                name: 'lun3dm5',
                title: "You'll Shoot Your Eye Out",
                source: '..::LvL (Lunaran & KungFuSquirrel)',
                description: 'A collaborative masterpiece by Lunaran and KungFuSquirrel. DM, Tourney, and CPM for 2-6 players. Rated 4.6/5 with over 13,000 downloads. Incredible visual quality and level design.'
            },
            {
                name: 'nor3ctf1',
                title: "Derwyll's Castle 2",
                source: '..::LvL (Noruen)',
                description: 'A grand CTF and TDM castle map for 8+ players. Rated 4.6/5 with over 10,000 downloads. Massive medieval castle with epic flag runs and team combat.'
            },
            {
                name: 'illdm2',
                title: 'The Hive',
                source: '..::LvL (redRum)',
                description: 'A compact DM and Tourney arena for 2-4 players. Organic hive-like architecture with tight combat spaces and good vertical gameplay.'
            },
            {
                name: 'spikectf3',
                title: 'New Disease',
                source: '..::LvL (Spike)',
                description: 'A CTF map for 2-6 players with modern design sensibilities. Clean layout with well-designed flag runs and chokepoints.'
            },
            // Batch 2: All remaining popular maps
            {
                name: 'simpsons_q3',
                title: 'The Simpsons Map',
                source: '..::LvL (Maggu)',
                description: 'The most downloaded custom Q3 map ever with 84,000+ downloads! A fun recreation of Springfield locations from The Simpsons. Supports CTF, DM, and TDM. A classic novelty map that everyone should try.'
            },
            {
                name: 'yan_test',
                title: "Yan's Test",
                source: '..::LvL (Yan)',
                description: 'A DM and Tourney arena for 2-3 players. Includes two BSP variants with different teleport exit locations and lava pit configurations.'
            },
            {
                name: 'backrooms_arena',
                title: 'Backrooms Arena',
                source: '..::LvL (M00nbot)',
                description: 'An FFA arena inspired by the Backrooms creepypasta. Eerie yellow-tinted corridors and liminal spaces create a unique and unsettling combat environment.'
            },
            {
                name: 'smo1v1',
                title: 'Red, Yellow, Green, Blue',
                source: '..::LvL (Tim Smulders)',
                description: 'A colorful DM and Tourney arena with a vibrant color-coded design. Clean layout for 2-4 players with distinct visual zones.'
            },
            {
                name: 'reqapartament',
                title: 'Blast from the Past',
                source: '..::LvL (Requiem)',
                description: 'A large DM, TDM, and Tourney arena with CPM support for 2-8 players. Rated 4.9/5. Features a detailed apartment/building theme with multiple combat areas.'
            },
            {
                name: 'rockshellwill',
                title: 'Rockshellwill',
                source: '..::LvL (Maxell)',
                description: 'A DM arena for 3-7 players with rocky, industrial aesthetics. Multiple elevation levels and interconnected rooms.'
            },
            {
                name: '13night',
                title: 'Vanilla Nights',
                source: '..::LvL (sst13)',
                description: 'A DM, TDM, and Tourney arena with CPM support for 2-6 players. Rated 4.3/5. Night-themed setting with atmospheric lighting and clean gameplay.'
            },
            {
                name: 'amon3tourney02',
                title: 'SILENT PLACE',
                source: '..::LvL (AmonG0D)',
                description: 'A DM and Tourney arena with a minimalist, eerie atmosphere. Quiet corridors and open spaces create tension-filled combat encounters.'
            },
            {
                name: 'acid3dm11',
                title: 'Rostwind',
                source: '..::LvL (acid)',
                description: 'A DM, TDM, and Tourney arena. Rated 4.3/5. Clean industrial design with excellent flow and tight combat spaces.'
            },
            {
                name: 'redwar',
                title: 'Red Warrior Shot The Food!',
                source: '..::LvL (Foo)',
                description: 'A CPM, DM, and Tourney arena for 2-3 players. A remake of a GeoComp 4 entry with vibrant red-themed visuals and fast-paced combat.'
            },
            {
                name: 'rv3sfi1',
                title: 'VIOLENCE INTERDICTION',
                source: '..::LvL (Rynvord)',
                description: 'A DM arena for 3-6 players. Sci-fi themed with dramatic lighting and multiple combat zones connected by corridors and verticality.'
            },
            {
                name: 'tsh3dm2_v2',
                title: 'Rust and Chrome v2',
                source: '..::LvL (tehSandwich)',
                description: 'A DM and TDM arena rated 4.8/5. Industrial rust-and-metal aesthetic with excellent flow. Updated version with improved gameplay and visuals.'
            },
            {
                name: 'mxl_school',
                title: 'School',
                source: '..::LvL (Maxell)',
                description: 'A massive exploration-friendly DM map for 4-12 players. Rated 5.0/5. Detailed school building environment with classrooms, hallways, and outdoor areas. Includes bot support.'
            },
            {
                name: 'oxodm1',
                title: 'de_dust2 for Quake 3',
                source: '..::LvL (OXOTHuK)',
                description: 'A faithful recreation of Counter-Strike\'s iconic de_dust2 in Q3. Supports CPM, DM, TDM, and Tourney for 4-6 players. Rated 4.6/5. A must-play for CS fans.'
            },
            {
                name: 'exhumed',
                title: 'Exhumed - Humiliation Redux',
                source: '..::LvL (Foo)',
                description: 'A CPM, DM, and Tourney arena with dark gothic aesthetics. Tight corridors and combat spaces with intense close-quarters action.'
            },
            {
                name: 'shivaportal',
                title: 'PORTALS OF SHIVA',
                source: '..::LvL (Bung Fluff)',
                description: 'A DM arena for 2-8 players with mystical Eastern-themed architecture. Portal-based connectivity creates unique combat dynamics.'
            },
            {
                name: 'acid3dm12',
                title: 'Mondkind',
                source: '..::LvL (acid)',
                description: 'A CPM, DM, TDM, and Tourney arena for 2-4 players. Rated 4.4/5. Part of the Q3 25th Anniversary Pack. Clean, modern design with excellent competitive flow.'
            },
            {
                name: 'rv3dm3',
                title: 'VELOCITY SHIFT',
                source: '..::LvL (Rynvord)',
                description: 'A DM, TDM, and DeFRaG arena for 2-6 players. Sci-fi speed-focused design with wide corridors and jump pad chains for high-velocity combat.'
            },
            {
                name: 'atomized',
                title: 'Atomized - Rebirth Of Mayhem',
                source: '..::LvL (Shub-Niggurath)',
                description: 'A DM and Tourney arena with dark, industrial aesthetics. Tight layout focused on close-quarters combat and map control.'
            },
            {
                name: 'oildm1',
                title: 'Elbow Room',
                source: '..::LvL (BoilingOil)',
                description: 'A compact DM and Tourney arena for 2-3 players. Tight spaces and minimal room to maneuver create intense 1v1 encounters.'
            },
            {
                name: 'quake3stuff',
                title: 'Quake3Stuff',
                source: '..::LvL (Senn)',
                description: 'A DM and Tourney arena for 2-5 players. Over 22,000 downloads. A quirky, fun map that has remained popular for over two decades.'
            },
            // === LvL Pack: The cream off the top ===
            {
                name: 'auh3dm2',
                title: 'The BackStab',
                source: '..::LvL Pack (Auhsan)',
                description: 'A dark gothic DM arena from the legendary LvL Pack. Tight corridors with ambush opportunities and vertical combat. Companion map to OverWhelming Hostility.'
            },
            {
                name: 'bal3dm2',
                title: 'Golconda',
                source: '..::LvL Pack (Bal)',
                description: 'An elegant DM arena from the LvL Pack. Clean architecture with good flow and item placement.'
            },
            {
                name: 'd3xf1',
                title: 'Up Close and Personal',
                source: '..::LvL Pack (DruZli)',
                description: 'A tight Tourney arena from the LvL Pack designed for intense 1v1 combat. Minimal space, maximum action.'
            },
            {
                name: 'devdm3',
                title: 'Infernal Genesis',
                source: '..::LvL Pack (DeV)',
                description: 'A lava-themed DM arena from the LvL Pack. Hellish environment with dramatic lighting and dangerous terrain.'
            },
            {
                name: 'fff',
                title: 'fff',
                source: '..::LvL Pack (stecki)',
                description: 'A compact DM arena from the LvL Pack. Clean, minimalist design focused on pure gameplay.'
            },
            {
                name: 'ik3dm1',
                title: 'Future Brownie',
                source: '..::LvL Pack (Fingers)',
                description: 'A futuristic DM arena from the LvL Pack. Sci-fi architecture with smooth gameplay flow.'
            },
            {
                name: 'lun3dm2',
                title: "Let's Drink Beer and Shoot Things",
                source: '..::LvL Pack (Lunaran)',
                description: 'A fun DM arena by Lunaran from the LvL Pack. Relaxed but competitive design with excellent craftsmanship.'
            },
            {
                name: 'natedm2',
                title: "Natestah's Beotch",
                source: '..::LvL Pack (Nathan Silvers)',
                description: 'A DM arena from the LvL Pack. Well-designed combat spaces with good item distribution.'
            },
            {
                name: 'mrcq3t3',
                title: 'Heavy Duty',
                source: '..::LvL Pack (Mr.CleaN)',
                description: 'A Tourney arena from the LvL Pack by Mr.CleaN. Solid competitive layout designed for skilled 1v1 play.'
            },
            {
                name: 'shortcircuit',
                title: 'Short Circuit',
                source: '..::LvL Pack (Binaryshi)',
                description: 'A tech-themed DM arena from the LvL Pack. Electronic/circuit board aesthetic with tight combat flow.'
            },
            {
                name: 'tig_den',
                title: "Tig's Den",
                source: '..::LvL Pack (Tigger-oN)',
                description: 'A cozy DM arena by Tigger-oN (founder of ..::LvL) from the LvL Pack. A personal favorite of the community.'
            },
            // === PlanetQuake Pack: Space Madness ===
            {
                name: 'distonic_small',
                title: 'Distonic_Small',
                source: 'PQ Pack (nunuk)',
                description: 'A compact space-themed DM arena from the PlanetQuake Space Madness pack. Zero-gravity combat in a tight space station environment.'
            },
            {
                name: 'htourney1',
                title: 'Space Jam',
                source: 'PQ Pack (}{ammer)',
                description: 'A space-themed Tourney arena from the PlanetQuake pack. Designed for intense 1v1 duels in a space station setting.'
            },
            {
                name: 'klhights',
                title: 'Kleskonian Heights',
                source: 'PQ Pack (nunuk)',
                description: 'A DM arena from the PlanetQuake Space Madness pack. Features elevated platforms and long sightlines in a space environment.'
            },
            {
                name: 'unitooldm3a',
                title: 'Cosmik Debris',
                source: 'PQ Pack (unitool)',
                description: 'A space-themed DM arena from the PlanetQuake pack. Floater gameplay with debris and asteroid-like structures.'
            },
            {
                name: 'mrcq3t2',
                title: 'Mutually Assured Destruction',
                source: 'PQ Pack (Mr.CleaN)',
                description: 'A Tourney arena from the PlanetQuake pack by Mr.CleaN. Tournament edition with balanced competitive layout.'
            },
            {
                name: 'nedmaj',
                title: 'Majesty',
                source: 'PQ Pack (Ned Man)',
                description: 'A majestic DM arena from the PlanetQuake Space Madness pack. Grand architecture with space vistas.'
            },
            {
                name: 'plutonians',
                title: 'Flying Plutonians',
                source: 'PQ Pack (nunuk)',
                description: 'A floater-style DM arena from the PlanetQuake pack. Zero-gravity combat with flying platforms and space jumps.'
            },
            // === Q3 25th Anniversary Pack ===
            {
                name: 'caustic',
                title: 'Caustic',
                source: '25th Anniversary (StormCatcher.77)',
                description: 'A DM arena from the Q3 25th Anniversary Pack. Toxic/caustic industrial theme with hazardous terrain elements.'
            },
            {
                name: 'jam3dm3_25',
                title: 'Knoblauch',
                source: '25th Anniversary (Jameson)',
                description: 'A DM arena from the Q3 25th Anniversary Pack. Clean design celebrating 25 years of Quake 3 Arena.'
            },
            {
                name: '13castle',
                title: 'Castle Of Aaargh!',
                source: '25th Anniversary (sst13)',
                description: 'A medieval castle DM arena from the Q3 25th Anniversary Pack. Grand castle architecture with multiple levels and combat zones.'
            },
            {
                name: 'ori_apt',
                title: 'ori_apt',
                source: '25th Anniversary (an_origamian)',
                description: 'A DM arena from the Q3 25th Anniversary Pack. Modern apartment-themed environment with clean geometry.'
            },
            {
                name: 'q325_deck',
                title: 'The Deck (Q3 Edition)',
                source: '25th Anniversary (Neon_Knight)',
                description: 'A Q3 recreation of the classic Unreal Tournament map "Deck" for the 25th Anniversary Pack. Industrial multi-level arena faithful to the UT original.'
            },
            {
                name: 'q3ctfchnu01',
                title: 'Porcelain',
                source: '25th Anniversary (Chnucki Erdbeer)',
                description: 'A CTF map from the Q3 25th Anniversary Pack. Clean white porcelain-themed architecture with symmetric flag layouts.'
            },
            {
                name: 'quadctf',
                title: 'Quadranscentennial CTF',
                source: '25th Anniversary (Foo)',
                description: 'A CTF map from the Q3 25th Anniversary Pack. Designed to celebrate 25 years of Q3 with balanced competitive CTF gameplay.'
            },
            {
                name: 'spikedm1c',
                title: 'The Fragpit Remastered',
                source: '25th Anniversary (Spike)',
                description: 'A remastered DM arena from the Q3 25th Anniversary Pack. Updated version of a classic map with modern polish.'
            },
            {
                name: 'spikedm9',
                title: 'Shaft 25',
                source: '25th Anniversary (Spike)',
                description: 'A DM arena from the Q3 25th Anniversary Pack. Vertical shaft-themed combat with multiple elevation levels.'
            },
            {
                name: 'tsh3dm2',
                title: 'Rust and Chrome',
                source: '25th Anniversary (tehSandwich)',
                description: 'The original version of Rust and Chrome from the 25th Anniversary Pack. Industrial rust-metal aesthetic. See also the standalone v2 update.'
            },
            // === Threewave CTF ===
            {
                name: 'q3wctf1',
                title: 'Bloodlust (Threewave)',
                source: 'Threewave CTF (Zoid & Casey)',
                description: 'The first map from the legendary Threewave CTF pack. A classic 16-player CTF arena. Over 20,000 downloads. One of the most iconic Q3 CTF experiences.'
            },
            {
                name: 'q3wctf2',
                title: 'Courtyard Conundrum (Threewave)',
                source: 'Threewave CTF (Zoid & Casey)',
                description: 'The second Threewave CTF map. A 10-player CTF arena with courtyard-based combat and flag defense.'
            },
            {
                name: 'q3wctf3',
                title: "Finnegan's Revenge (Threewave)",
                source: 'Threewave CTF (Zoid & Casey)',
                description: 'The third Threewave CTF map. A 12-player CTF arena completing the legendary Threewave trilogy.'
            },
            // === LvL Top Downloaded / Popular Maps ===
            {
                name: 'gm3tourney2',
                title: 'Dead Souls',
                source: '..::LvL (GlassMan)',
                description: 'A stunning DM, TDM, and Tourney arena with CPM support for 2-6 players. Rated 4.4/5 with over 14,000 downloads. Features atmospheric gothic architecture with excellent flow and multiple engagement distances.'
            },
            {
                name: 'pro-q3tourney7',
                title: 'Almost Lost',
                source: 'Id Software, Inc.',
                description: 'A restored id Software tourney/DM map for 2-5 players. Rated 4.4/5 with over 11,000 downloads. Originally cut from the game, this hidden gem features classic id design sensibilities.'
            },
            {
                name: 'rpg3dm2',
                title: 'Trial by Error',
                source: '..::LvL (R.P.G.)',
                description: 'A compact CPM and DM arena for 2-4 players. Rated 4.3/5 with over 14,000 downloads. Clean design with tight corridors and excellent competitive flow.'
            },
            {
                name: 'lsdm1',
                title: 'Desert Temple',
                source: '..::LvL (LordSquart)',
                description: 'An atmospheric DM arena set in a desert temple for 3-7 players. Rated 4.3/5 with over 11,000 downloads. Beautiful Middle Eastern architecture with excellent item placement.'
            },
            {
                name: 'wvwq3dm7',
                title: 'Decidia',
                source: '..::LvL (wviperw)',
                description: 'A visually striking DM arena for 3-6 players. Rated 4.3/5 with over 12,000 downloads. Clean gothic design with balanced combat spaces and excellent flow.'
            },
            {
                name: 'chiropteradm',
                title: 'ChiropteraDM',
                source: '..::LvL (Alcatraz, nunuk & Sock)',
                description: 'A collaborative DM and Tourney masterpiece for 2-6 players. Rated 4.2/5 with over 13,000 downloads. Features work from three legendary mappers including Sock. Bat-themed gothic architecture.'
            },
            {
                name: 'mrcq3t6',
                title: 'Bitter Embrace',
                source: '..::LvL (Mr.CleaN)',
                description: 'A CPM, DM, and Tourney arena for 2-5 players by Mr.CleaN. Rated 4.2/5 with over 10,000 downloads. Includes custom bot and FFA variant. Companion to Prophecy and Heavy Duty.'
            },
            {
                name: 'dangercity',
                title: 'Dangercity',
                source: '..::LvL (M. Kupfer)',
                description: 'A realism-based city DM arena for 4-10 players. Rated 4.2/5 with over 15,000 downloads. Features shops, offices, warehouse, sewer access, and rooftops. One of the most popular city maps ever made.'
            },
            {
                name: 'addict',
                title: 'Quake3:Addiction',
                source: '..::LvL (Peej)',
                description: 'A CPM, DM, and Tourney arena for 2-6 players. Rated 4.1/5 with over 16,000 downloads. A Quake 1 remake that plays brilliantly with bots and in competitive 1v1.'
            },
            {
                name: 'bal3dm3',
                title: 'Disinformation',
                source: '..::LvL (Bal)',
                description: 'A DM arena for 3-6 players by Bal (also author of Golconda). Rated 4.1/5 with over 15,000 downloads. Set on a rusting space ship/station with outstanding architecture.'
            },
            {
                name: 'ztn3dm2',
                title: 'Beatbox',
                source: '..::LvL (ztn)',
                description: 'A CPM, DM, and Tourney arena for 2-5 players by ztn (author of Blood Run). Rated 4.1/5 with over 13,000 downloads. Another classic from one of Q3\'s most legendary mappers.'
            },
            {
                name: 'mrcq3t4',
                title: 'Prophecy',
                source: '..::LvL (Mr.CleaN)',
                description: 'A CPM, DM, and Tourney arena for 2-4 players. Rated 4.1/5 with over 13,000 downloads. Part of Mr.CleaN\'s acclaimed tournament map series alongside Heavy Duty and Bitter Embrace.'
            },
            {
                name: 't8dm6',
                title: 'Mindfields',
                source: '..::LvL (Senn)',
                description: 'A DM and Tourney arena for 2-5 players by Senn (author of Quake3Stuff). Rated 4.1/5 with over 14,000 downloads. Tight, intense combat with excellent sightlines.'
            },
            {
                name: 'dmmq3dm3',
                title: 'Lonely Planet',
                source: '..::LvL (SmallPileOfGibs)',
                description: 'A DM arena for 3-8 players. Rated 4.1/5 with over 13,000 downloads. A large, visually rich environment with custom TGA textures. One of the most downloaded community maps.'
            },
            {
                name: 'senndm2',
                title: 'Falling Higher',
                source: '..::LvL (Senn)',
                description: 'A DM and Tourney arena for 3-8 players by Senn. Rated 4.1/5 with over 12,000 downloads. Multi-level design with vertical gameplay and excellent flow.'
            },
            {
                name: 'nedsword',
                title: 'Caliburnus',
                source: '..::LvL (Ned Man)',
                description: 'A DM and TDM arena for 4-9 players by Ned Man (author of Majesty). Rated 4.1/5 with over 12,000 downloads. Beautifully textured medieval theme featuring a prominent sword element.'
            },
            {
                name: 'bal3dm1',
                title: 'Ash Rain',
                source: '..::LvL (Bal)',
                description: 'A DM and Tourney arena for 2-6 players by Bal. Rated 4.1/5 with over 11,000 downloads. Atmospheric industrial design from one of Q3\'s most respected mappers.'
            },
            {
                name: 'lae3dm2',
                title: 'White Collar Violence',
                source: '..::LvL (Laerth)',
                description: 'A DM and Tourney arena for 2-5 players by Laerth (author of Nothing At All). Rated 4.1/5 with over 11,000 downloads. Clean design with tight competitive gameplay.'
            },
            {
                name: 'rcq3dm1',
                title: 'A Glasswork Fishbowl',
                source: '..::LvL (Redchurch)',
                description: 'A DM arena for 3-7 players. Rated 4.1/5 with over 12,000 downloads. Unique glass-themed architecture with transparent walkways and creative use of see-through surfaces.'
            },
            {
                name: 'sokar3dm5',
                title: 'Ice Storm',
                source: '..::LvL (SoKaR)',
                description: 'A CPM, DM, and Tourney arena for 2-4 players. Rated 4.0/5 with over 13,000 downloads. Ice/winter themed with clean competitive layout.'
            },
            {
                name: 'storm3tourney5',
                title: 'Cajun Hell',
                source: '..::LvL (StormShadow)',
                description: 'An FFA, Tourney, and TDM arena for 2-4 players. Rated 4.0/5 with over 14,000 downloads. Tight gothic design with excellent duel gameplay.'
            },
            {
                name: 'gm3tourney1',
                title: 'Until The Next Life',
                source: '..::LvL (GlassMan)',
                description: 'A CPM tourney arena for 2 players by GlassMan (author of Dead Souls). Rated 4.1/5 with over 14,000 downloads. Designed for intense 1v1 duels.'
            },
            {
                name: 'reqkitchen',
                title: 'Nu Clear Lunch Time',
                source: '..::LvL (Requiem)',
                description: 'A fun novelty DM arena for 3-12 players. Rated 4.2/5 with over 12,000 downloads. A giant kitchen where players are mouse-sized! Features interactive appliances and high-detail environment.'
            },
            {
                name: 'facer2d',
                title: 'Facing Worlds',
                source: '..::LvL (Bauul)',
                description: 'A CTF map for 4-8 players inspired by Unreal Tournament\'s iconic Facing Worlds. Rated 3.1/5 with over 10,000 downloads. Two giant towers floating in space connected by bridges. A nostalgic classic for UT fans.'
            }
        ])
    })
}
