import {Ghost} from "@modules"
export const ghosts = new Map<string, Ghost>([
    ["banshee", {
        name: "Banshee",
        description: "A Banshee is a natural hunter and will attack anything. It has been known to single out its prey before making a killing blow.",
        clues: [2, 4, 6],
        strength: "Will target only one player at a time.",
        weakness: "Crucifix effectiveness is increased to 5m against one.",
        flag: '🇮🇪',
        origin: 'A banshee (Modern Irish bean sí, from Old Irish: ben síde, "woman of the fairy mound" or "fairy woman") is a female spirit in Irish folklore who heralds the death of a family member, usually by wailing, shrieking, or keening. Her name is connected to the mythologically important tumuli or "mounds" that dot the Irish countryside, which are known as síde (singular síd) in Old Irish.'
    }],
    ["demon", {
        name: "Demon",
        description: "A Demon is one of the worst ghosts you can encounter. It has been known to attack without reason.",
        clues: [1, 2, 5],
        strength: "Can initiate hunts more often ||(at any sanity)||.",
        weakness: "Getting Ouija Board responses will lower sanity less.",
        flag: '🌎',
        origin: 'A demon is a supernatural being, prevalent historically in religion, occultism, literature, fiction, mythology, and folklore; as well as in media such as comics, video games, movies, anime, and television series.'
    }],
    ["goryo", {
        name: "Goryo",
        description: "When a Goryo passes through a DOTS projector, using a video camera is the only way to see it.",
        clues: [0, 2, 6],
        strength: "Can only be seen interacting with D.O.T.S. through a camera when nobody is nearby.",
        weakness: "Never wanders far from its place of death.",
        flag: '🇯🇵',
        origin: "Goryō (御霊) are vengeful Japanese ghosts from the aristocratic classes, especially those who have been martyred."
    }],
    ["hantu", {
        name: "Hantu",
        description: "A Hantu is a rare ghost that can be found in hotter climates. They are known to attack often during cold weather.",
        clues: [2, 4, 5],
        strength: "Lower temperatures allow the Hantu to move faster.",
        weakness: "Warmer areas slow the Hantu's movement.",
        flag: '🇮🇩 🇲🇾',
        origin: "Hantu is the Malay and Indonesian word for spirit or ghost. In modern usage it generally means spirits of the dead but has also come to refer to any legendary invisible being, such as demons. In its traditional context the term also referred to animistic nature spirits or ancestral souls."
    }],
    ["jinn", {
        name: "Jinn",
        description: "A Jinn is a territorial ghost that will attack when threatened. It has also been known to travel at significant speed.",
        clues: [0, 2, 5],
        strength: "Travels at faster speeds if its victim is far away.",
        weakness: "Cannot use its ability if the site's fuse box is off.",
        flag: "☪️",
        origin: "Jinn (Arabic: جن‎, jinn) – also romanized as djinn or anglicized as genie (with the broader meaning of spirit or demon, depending on source) – are supernatural creatures in early pre-Islamic Arabian religious systems and later in Islamic mythology and theology. Like humans, they are created with fitra, neither born as believers nor as unbelievers their attitude depends on whether they accept God's guidance. Since jinn are neither innately evil nor innately good, Islam acknowledged spirits from other religions, and was able to adapt spirits from other religions during its expansion. Jinn are not a strictly Islamic concept; they may represent several pagan beliefs integrated into Islam."
    }],
    ["mare", {
        name: "Mare",
        description: "A Mare is the source of all nightmares, making it most powerful in the dark.",
        clues: [1, 3, 4],
        strength: "Has an increased chance to attack in the dark ||(will attack with sanity below 60%)||.",
        weakness: "Turning the lights on will reduce the chance of an attack ||(can't attack if sanity is over 40%, but can attack at sanity below 60% if the light is off)||.",
        flag: null,
        origin: "A mare (Old English: mære, Old Dutch: mare, Proto-Slavic *mara; mara in Old High German, Old Norse, and Swedish) is a malicious entity in Germanic and Slavic folklore that rides on people's chests while they sleep, bringing on nightmares."
    }],
    ["myling", {
        name: "Myling",
        description: "A Myling is a very vocal and active ghost. They are rumoured to be quiet when hunting their prey.",
        clues: [0, 1, 2],
        strength: "Has quieter footsteps during a hunt.",
        weakness: "Produces paranormal sounds more frequently.",
        flag: null,
        origin: "In Scandinavian folklore, the mylingar were the phantasmal incarnations of the souls of children that had been forced to roam the earth until they could persuade someone (or otherwise cause enough of a ruckus to make their wishes known) to bury them properly."
    }],
    ["obake", {
        name: "Obake",
        description: "Obake are terrifying shape-shifters, capable of taking on many forms. They have been seen taking on humanoid shapes to attract their prey.",
        clues: [0, 2, 4],
        strength: "Rarely leaves a trace when interacting with the environment.",
        weakness: "Sometimes leaves behind unique evidence (||handprints with 6 fingers, sometimes||).",
        flag: '🇯🇵',
        origin: 'Obake (お化け) and bakemono (化け物) are a class of yōkai, preternatural creatures in Japanese folklore. Literally, the terms mean a thing that changes, referring to a state of transformation or shapeshifting. \n\nThese words are often translated as "ghost", but primarily they refer to living things or supernatural beings who have taken on a temporary transformation, and these bakemono are distinct from the spirits of the dead. However, as a secondary usage, the term obake can be a synonym for yūrei, the ghost of a deceased human being.'
    }],
    ["oni", {
        name: "Oni",
        description: "Onis share traits with Demons, and possess extreme strength. There have been rumours that they become more active around their prey.",
        clues: [0, 5, 6],
        strength: "Increased activity if there are multiple players nearby.",
        weakness: "An Oni's increased activity makes them easier to find.",
        flag: '🇯🇵',
        origin: 'An oni (鬼) is a kind of yōkai, demon, orc, ogre, or troll in Japanese folklore. Oni are mostly known for their fierce and evil nature manifested in their propensity for murder and cannibalism. Notwithstanding their evil reputation, oni possess intriguingly complex aspects that cannot be brushed away simply as evil. They are typically portrayed as hulking figures with one or more horns growing out of their heads. Stereotypically, they are conceived of as red, blue, black, yellow, or white-colored, wearing loincloths of tiger pelt, and carrying iron kanabō clubs. A creature instills fear and danger from their grotesque outward appearance to their wild and strange behaviors and dangerous powers. Although Oni has been told as frightening creatures, they have become tamer in modern culture as people tell less scary stories.'
    }],
    ["onryo", {
        name: "Onryo",
        description: 'The Onryo is often referred to as "The Wrathful Spirit." It steals souls from dying victims\' bodies to seek revenge. This ghost has been known to fear any form of fire, and will do anything to be far from it.',
        clues: [3, 4, 5],
        strength: "Extinguishing a flame can cause an Onryo to attack. (||Every dead player will increase the possibility||))",
        weakness: "When threatened, this ghost will be less likely to hunt.",
        flag: '🇯🇵',
        origin: 'In Japanese traditional beliefs and literature, onryō (怨霊, literally "vengeful spirit", sometimes rendered "wrathful spirit") refers to a ghost (yūrei) believed to be capable of causing harm in the world of the living, injuring or killing enemies, or even causing natural disasters to exact vengeance to "re-address" the wrongs it received while alive, then taking their spirits from their dying bodies.'
    }],
    ["phantom", {
        name: "Phantom",
        description: "A Phantom is a ghost that can possess the living, inducing fear into those around it. They are most commonly summoned from Ouija Boards.",
        clues: [2, 3, 6],
        strength: "Looking at a Phantom will lower the player's sanity considerably.",
        weakness: "Taking a photo of the Phantom will cause it to briefly disappear.",
        flag: null,
        origin: "Middle English (also in the sense ‘illusion, delusion’): from Old French fantosme, based on Greek phantasma"
    }],
    ["poltergeist", {
        name: "Poltergeist",
        description: "One of the most famous ghosts, the Poltergeist. Known to manipulate objects around it to spread fear into its victims.",
        clues: [1, 2, 4],
        strength: "Capable of throwing multiple objects at once.",
        weakness: "Becomes powerless with no throwables nearby.",
        flag: '🇩🇪',
        origin: 'In ghostlore, a poltergeist (German for "loud ghost" or "noisy spirit") is a type of ghost or spirit that is responsible for physical disturbances, such as loud noises and objects being moved or destroyed. Most claims about or fictional descriptions of poltergeists show them as capable of pinching, biting, hitting, and tripping people. They are also depicted as capable of the movement or levitation of objects such as furniture and cutlery, or noises such as knocking on doors.'
    }],
    ["raiju", {
        name: "Raiju",
        description: "A Raiju is a demon that thrives on electrical current. While generally calm, they can become agitated when overwhelmed with power.",
        clues: [0, 4, 6],
        strength: "Moves faster near electrical devices.",
        weakness: "Constantly disrupt electronic equipment.",
        flag: '🇯🇵',
        origin: 'Raijū (雷獣, "thunder animal" or "thunder beast") is a legendary creature from Japanese mythology.\nIts body is composed of lightning and with the form of a white and blue wolf or dog (or even a wolf or dog wrapped in lightning) being the most common, although it can be represented with many other creatures like mammals, insects, fish, dragons etc. It may also fly about as a ball of lightning. Its cry sounds like thunder.\nRaiju is the companion of Raijin, the god of lightning. While the beast is generally calm and harmless, during thunderstorms it becomes agitated, and leaps about in trees and buildings.\nAnother of Raiju\'s peculiar behaviors is sleeping in human navels. This prompts the Raijin to shoot lightning arrows at Raiju to wake the creature up, and thus harms the person in whose belly the demon is resting. Superstitious people therefore often sleep on their stomachs during bad weather.'
    }],
    ["revenant", {
        name: "Revenant",
        description: "A Revenant is a violent ghost that will attack indiscriminately. Their speed can be deceiving, as they are slow while dormant; however, as soon as they hunt they can move incredibly fast.",
        clues: [1, 4, 5],
        strength: "Can travel significantly faster if a player is spotted during a Hunt.",
        weakness: "Without a target, the Revenant moves very slowly.",
        flag: '🌎',
        origin: 'In folklore, a revenant is an animated corpse that is believed to have revived from death to haunt the living. The word revenant is derived from the Old French word, revenant, the "returning" (see also the related French verb revenir, meaning "to come back").\nRevenants are part of the legend of various cultures, including Old Irish Celtic and Norse mythology, and stories of supposed revenant visitations were documented by English historians in the Middle Ages.'
    }],
    ["shade", {
        name: "Shade",
        description: "A Shade is known to be very shy. There is evidence to suggest that a Shade will stop all paranormal activity if there are multiple people nearby.",
        clues: [0, 1, 5],
        strength: "Being shy makes it more difficult to locate and obtain evidence.",
        weakness: "Less likely to hunt if multiple people are nearby.",
        flag: null,
        origin: 'In literature and poetry, a shade (translating Greek σκιά, Latin umbra) is the spirit or ghost of a dead person, residing in the underworld.\n\nAn underworld where the dead live in shadow is common to beliefs in the ancient Near East, in Biblical Hebrew expressed by the term tsalmaveth (צַלמָוֶת: lit. "death-shadow", "shadow of death"; alternate term for Sheol).'
    }],
    ["spirit", {
        name: "Spirit",
        description: "Spirits are very common ghosts. They are very powerful, but passive, only attacking when they need to. They defend their place of death to the utmost degree, killing anyone that is caught overstaying their welcome.",
        clues: [0, 1, 3],
        strength: "None.",
        weakness: "Smudge sticks are more effective, preventing a hunt for longer.",
        flag: '🌎',
        //Oxford Languages
        origin: "Middle English: from Anglo-Norman French, from Latin spiritus ‘breath, spirit’, from spirare ‘breathe’."
    }],
    ["the_twins", {
        name: "The Twins",
        description: "These ghosts have been reported to mimic each other's actions. They alternate their attacks to confuse their prey.",
        clues: [0, 3, 5],
        strength: "Either Twin can be angered and initiate an attack on their prey.",
        weakness: "The Twins will often interact with the environment at the same time.",
        flag: '🌎',
        origin: "Late Old English twinn ‘double’, from twi- ‘two’; related to Old Norse tvinnr . Current verb senses date from late Middle English."
    }],
    ["wraith", {
        name: "Wraith",
        description: "Wraiths are one of the most dangerous ghosts you will find. It is also the only known ghost that has the ability of flight and has sometimes been known to travel through walls.",
        clues: [0, 3, 6],
        strength: "Does not leave UV footprints after stepping in salt.",
        weakness: "Will become more active if it steps in salt.",
        flag: '🌎',
        origin: "Synonym for Ghost. The word has no certain etymology."
    }],
    ["yokai", {
        name: "Yokai",
        description: "Yokai are common ghosts that are attracted to human voices. They can usually be found haunting family homes.",
        clues: [3, 4, 6],
        strength: "Talking near the Yokai will anger it, increasing the chance to attack.",
        weakness: "Can only hear voices close to it during a hunt.",
        flag: '🇯🇵',
        origin: 'Yōkai (妖怪, "strange apparition") are a class of supernatural entities and spirits in Japanese folklore.\nYōkai often have animal features, but may also appear humanoid in appearance. Some yōkai resemble inanimate objects, while others have no discernible shape. Yōkai are typically described as having spiritual or supernatural abilities, with shapeshifting being the most common trait associated with them.'
    }],
    ["yurei", {
        name: "Yurei",
        description: "A Yurei is a ghost that has returned to the physical world, usually for the purpose of revenge or hatred.",
        clues: [4, 5, 6],
        strength: "Has a stronger effect on sanity.",
        weakness: "Smudging the Yurei's ghost room will reduce how often it wanders.",
        flag: '🇯🇵',
        origin: 'Yūrei (幽霊) are figures in Japanese folklore analogous to the Western model of ghosts.\nLike their Chinese and Western counterparts, they are thought to be spirits barred from a peaceful afterlife.'
    }],
    ["mimic", {
        name: "Mimic",
        description: "The Mimic is an elusive, mysterious, copycat ghost that mirrors traits and behaviours from others, including other ghost types.",
        clues: [2, 3, 5],
        strength: "We're unsure what this ghost is capable of. Be careful.",
        weakness: "Several reports have noted ghost orb sightings near mimics.",
        flag: '🌎',
        origin: "The word has origin from the Ancient Greek word 'mīmikós' (belonging to mimes), from 'mîmos' (actor)."
    }],
])
