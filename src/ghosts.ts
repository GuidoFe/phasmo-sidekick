import {Ghost} from "./modules/index.js"
export const ghosts = new Map<string, Ghost>([
    ["banshee", {
        name: "Banshee",
	url: "https://phasmophobia.fandom.com/wiki/Banshee",
        description: "The singing siren, known for attracting its victims through song. It has been known to single out its prey before making a killing blow.",
        clues: [2, 4, 6],
        strength: "Banshee's will weaken their target before striking.",
        weakness: "Banshee's can sometimes be heard screaming with a parabolic microphone.",
        flag: '🇮🇪',
        origin: 'A banshee (Modern Irish bean sí, from Old Irish: ben síde, "woman of the fairy mound" or "fairy woman") is a female spirit in Irish folklore who heralds the death of a family member, usually by wailing, shrieking, or keening. Her name is connected to the mythologically important tumuli or "mounds" that dot the Irish countryside, which are known as síde (singular síd) in Old Irish.'
    }],
    ["demon", {
        name: "Demon",
	url: "https://phasmophobia.fandom.com/wiki/Demon",
        description: "Demons are the most aggressive ghosts we've ever encountered. Known to attack without reason, they seem to enjoy the thrill of the hunt.",
        clues: [1, 2, 5],
        strength: "Demons will initiate hunts more often than other ghosts.",
        weakness: "Demons fear the Crucifix and will be less aggressive near one.",
        flag: '🌎',
        origin: 'A demon is a supernatural being, prevalent historically in religion, occultism, literature, fiction, mythology, and folklore; as well as in media such as comics, video games, movies, anime, and television series.'
    }],
    ["deogen", {
        name: "Deogen",
	url: "https://phasmophobia.fandom.com/wiki/Deogen",
        description: "Sometimes surrounded by an endless fog, Deogen have been eluding ghost hunters for years. These ghosts have been reported to find even the most hidden prey, before stalking them into exhaustion.",
        clues: [1, 3, 6],
        strength: "Deogen constantly sense the living. You can run but you can't hide.",
        weakness: "Deogen require a lot of energy to form and will move very slowly when approaching its victims.",
        flag: '🇧🇪',
        origin: 'The Deogen, also known as the De Ogen or The Eyes, is an evil spirit said to haunt the Sonian Forest in Belgium, often seen in fog form and followed by smaller shadow figures. From obscurban-legend.fandom.com',
    }],
    ["goryo", {
        name: "Goryo",
	url: "https://phasmophobia.fandom.com/wiki/Goryo",
        description: "When a Goryo passes through a DOTS projector, using a video camera is the only way to see it.",
        clues: [0, 2, 6],
        strength: "A Goryo will usually only show itself on camera if there are no people nearby.",
        weakness: "They are rarely seen far from their place of death.",
        flag: '🇯🇵',
        origin: "Goryō (御霊) are vengeful Japanese ghosts from the aristocratic classes, especially those who have been martyred."
    }],
    ["hantu", {
        name: "Hantu",
	url: "https://phasmophobia.fandom.com/wiki/Hantu",
        description: "A Hantu is a rare ghost that thrives in the coldest climates. The cold seems to make them more aggressive and empowered.",
        clues: [2, 4, 5],
        strength: "Lower temperatures allow the Hantu to move at faster speeds.",
        weakness: "Hantus move slower in warmer areas.",
        flag: '🇮🇩 🇲🇾',
        origin: "Hantu is the Malay and Indonesian word for spirit or ghost. In modern usage it generally means spirits of the dead but has also come to refer to any legendary invisible being, such as demons. In its traditional context the term also referred to animistic nature spirits or ancestral souls."
    }],
    ["jinn", {
        name: "Jinn", 
	url: "https://phasmophobia.fandom.com/wiki/Jinn",
        description: "A Jinn is a territorial ghost that will attack when threatened. It has also been known to travel at significant speed.",
        clues: [0, 2, 5],
        strength: "A Jinn will travels at faster speeds if its victim is far away.",
        weakness: "Turning off the location's power source will prevent the Jinn from using its ability.",
        flag: "☪️",
        origin: "Jinn (Arabic: جن‎, jinn) – also romanized as djinn or anglicized as genie (with the broader meaning of spirit or demon, depending on source) – are supernatural creatures in early pre-Islamic Arabian religious systems and later in Islamic mythology and theology. Like humans, they are created with fitra, neither born as believers nor as unbelievers their attitude depends on whether they accept God's guidance. Since jinn are neither innately evil nor innately good, Islam acknowledged spirits from other religions, and was able to adapt spirits from other religions during its expansion. Jinn are not a strictly Islamic concept; they may represent several pagan beliefs integrated into Islam."
    }],
    ["mare", {
        name: "Mare",
	url: "https://phasmophobia.fandom.com/wiki/Mare",
        description: "A Mare is the source of all nightmares, making it most powerful in the dark.",
        clues: [1, 3, 4],
        strength: "A Mare will have an increased chance to attack in the dark.",
        weakness: "Turning the lights on around the Mare will lower its chance to attack.",
        flag: null,
        origin: "A mare (Old English: mære, Old Dutch: mare, Proto-Slavic *mara; mara in Old High German, Old Norse, and Swedish) is a malicious entity in Germanic and Slavic folklore that rides on people's chests while they sleep, bringing on nightmares."
    }],
    ["moroi", {
	    name: "Moroi",
	    url: "https://phasmophobia.fandom.com/wiki/Moroi",
	    description: "Moroi have risen from the grave to drain energy from the living. They have been known to place curses on their victims, curable only by antidotes or moving very far away.",
	    clues: [1, 3, 5],
	    strength: "The weaker their victims, the stronger the Moroi becomes.",
	    weakness: "Moroi suffer from hyperosmia, weakening them for longer periods.",
	    flag: "🇷🇴",
	    origin: "A moroi (f. moroaică) is a type of vampire or ghost in Romanian folklore. In some versions, a moroi is a phantom of a dead person which leaves the grave to draw energy from the living."
    }],
    ["myling", {
        name: "Myling",
	url: "https://phasmophobia.fandom.com/wiki/Myling",
        description: "A Myling is a very vocal and active ghost. They are rumoured to be quiet when hunting their prey.",
        clues: [0, 1, 2],
        strength: "A Myling is known to be quieter when hunting.",
        weakness: "Mylings more frequently make paranormal sounds.",
        flag: null,
        origin: "In Scandinavian folklore, the mylingar were the phantasmal incarnations of the souls of children that had been forced to roam the earth until they could persuade someone (or otherwise cause enough of a ruckus to make their wishes known) to bury them properly."
    }],
    ["obake", {
        name: "Obake",
	url: "https://phasmophobia.fandom.com/wiki/Obake",
        description: "Obake are terrifying shape-shifters, capable of taking on many forms. They have been seen taking on humanoid shapes to attract their prey.",
        clues: [0, 2, 4],
        strength: "When interacting with the environment, an Obake will rarely leave a trace.",
        weakness: "Sometimes this ghost will shapeshift, leaving behind unique evidence.",
        flag: '🇯🇵',
        origin: 'Obake (お化け) and bakemono (化け物) are a class of yōkai, preternatural creatures in Japanese folklore. Literally, the terms mean a thing that changes, referring to a state of transformation or shapeshifting. \n\nThese words are often translated as "ghost", but primarily they refer to living things or supernatural beings who have taken on a temporary transformation, and these bakemono are distinct from the spirits of the dead. However, as a secondary usage, the term obake can be a synonym for yūrei, the ghost of a deceased human being.'
    }],
    ["oni", {
        name: "Oni",
	url: "https://phasmophobia.fandom.com/wiki/Oni",
        description: "Onis love to scare their victims as much as possible before attacking. They are often seen in their physical form, guarding their place of death.",
        clues: [0, 5, 6],
        strength: "Onis are more active whilst people are nearby and will drain their sanity faster when manifesting.",
        weakness: "Oni disappear less often while hunting their prey.",
        flag: '🇯🇵',
        origin: 'An oni (鬼) is a kind of yōkai, demon, orc, ogre, or troll in Japanese folklore. Oni are mostly known for their fierce and evil nature manifested in their propensity for murder and cannibalism. Notwithstanding their evil reputation, oni possess intriguingly complex aspects that cannot be brushed away simply as evil. They are typically portrayed as hulking figures with one or more horns growing out of their heads. Stereotypically, they are conceived of as red, blue, black, yellow, or white-colored, wearing loincloths of tiger pelt, and carrying iron kanabō clubs. A creature instills fear and danger from their grotesque outward appearance to their wild and strange behaviors and dangerous powers. Although Oni has been told as frightening creatures, they have become tamer in modern culture as people tell less scary stories.'
    }],
    ["onryo", {
        name: "Onryo",
	url: "https://phasmophobia.fandom.com/wiki/Onryo",
        description: 'The Onryo is often referred to as "The Wrathful Spirit." It steals souls from dying victims\' bodies to seek revenge. This ghost has been known to fear any form of fire, and will do anything to be far from it.',
        clues: [3, 4, 5],
        strength: "Extinguishing a flame can cause an Onryo to attack.",
        weakness: "When threatened, this ghost will be less likely to hunt.",
        flag: '🇯🇵',
        origin: 'In Japanese traditional beliefs and literature, onryō (怨霊, literally "vengeful spirit", sometimes rendered "wrathful spirit") refers to a ghost (yūrei) believed to be capable of causing harm in the world of the living, injuring or killing enemies, or even causing natural disasters to exact vengeance to "re-address" the wrongs it received while alive, then taking their spirits from their dying bodies.'
    }],
    ["phantom", {
        name: "Phantom",
	url: "https://phasmophobia.fandom.com/wiki/Phantom",
        description: "A Phantom is a ghost that can possess the living, inducing fear into those around it. They are most commonly summoned from Ouija Boards.",
        clues: [2, 3, 6],
        strength: "Looking at a Phantom will drop your sanity considerably faster.",
        weakness: "Taking a photo of the Phantom will make it temporarily disappear.",
        flag: null,
        origin: "Middle English (also in the sense ‘illusion, delusion’): from Old French fantosme, based on Greek phantasma"
    }],
    ["poltergeist", {
        name: "Poltergeist",
	url: "https://phasmophobia.fandom.com/wiki/Poltergeist",
        description: "One of the most famous ghosts, the Poltergeist. Known to manipulate objects around it to spread fear into its victims.",
        clues: [1, 2, 3],
        strength: "Poltergeists can throw multiple objects at once, and with great force.",
        weakness: "With nothing to throw, Poltergeists become powerless.",
        flag: '🇩🇪',
        origin: 'In ghostlore, a poltergeist (German for "loud ghost" or "noisy spirit") is a type of ghost or spirit that is responsible for physical disturbances, such as loud noises and objects being moved or destroyed. Most claims about or fictional descriptions of poltergeists show them as capable of pinching, biting, hitting, and tripping people. They are also depicted as capable of the movement or levitation of objects such as furniture and cutlery, or noises such as knocking on doors.'
    }],
    ["raiju", {
        name: "Raiju",
	url: "https://phasmophobia.fandom.com/wiki/Raiju",
        description: "A Raiju is a demon that thrives on electrical current. While generally calm, they can become agitated when overwhelmed with power.",
        clues: [0, 4, 6],
        strength: "A Raiju can siphon power from nearby electrical devices, making it move faster.",
        weakness: "Raiju are constantly disrupting electronic equipment when attacking, making it easier to track.",
        flag: '🇯🇵',
        origin: 'Raijū (雷獣, "thunder animal" or "thunder beast") is a legendary creature from Japanese mythology.\nIts body is composed of lightning and with the form of a white and blue wolf or dog (or even a wolf or dog wrapped in lightning) being the most common, although it can be represented with many other creatures like mammals, insects, fish, dragons etc. It may also fly about as a ball of lightning. Its cry sounds like thunder.\nRaiju is the companion of Raijin, the god of lightning. While the beast is generally calm and harmless, during thunderstorms it becomes agitated, and leaps about in trees and buildings.\nAnother of Raiju\'s peculiar behaviors is sleeping in human navels. This prompts the Raijin to shoot lightning arrows at Raiju to wake the creature up, and thus harms the person in whose belly the demon is resting. Superstitious people therefore often sleep on their stomachs during bad weather.'
    }],
    ["revenant", {
        name: "Revenant",
	url: "https://phasmophobia.fandom.com/wiki/Revenant",
        description: "A Revenant is a violent ghost that will attack indiscriminately. Their speed can be deceiving, as they are slow while dormant; however, as soon as they hunt they can move incredibly fast.",
        clues: [1, 4, 5],
        strength: "A Revenant will travel at a significantly faster speed when hunting their prey.",
        weakness: "Hiding from the Revenant will cause it to move very slowly.",
        flag: '🌎',
        origin: 'In folklore, a revenant is an animated corpse that is believed to have revived from death to haunt the living. The word revenant is derived from the Old French word, revenant, the "returning" (see also the related French verb revenir, meaning "to come back").\nRevenants are part of the legend of various cultures, including Old Irish Celtic and Norse mythology, and stories of supposed revenant visitations were documented by English historians in the Middle Ages.'
    }],
    ["shade", {
        name: "Shade",
	url: "https://phasmophobia.fandom.com/wiki/Shade",
        description: "A Shade is known to be very shy. There is evidence to suggest that a Shade will stop all paranormal activity if there are multiple people nearby.",
        clues: [0, 1, 5],
        strength: "Shades are much harder to find.",
        weakness: "The ghost will not enter a hunt if there are multiple people nearby.",
        flag: null,
        origin: 'In literature and poetry, a shade (translating Greek σκιά, Latin umbra) is the spirit or ghost of a dead person, residing in the underworld.\n\nAn underworld where the dead live in shadow is common to beliefs in the ancient Near East, in Biblical Hebrew expressed by the term tsalmaveth (צַלמָוֶת: lit. "death-shadow", "shadow of death"; alternate term for Sheol).'
    }],
    ["spirit", {
        name: "Spirit",
	url: "https://phasmophobia.fandom.com/wiki/Spirit",
        description: "Spirits are very common ghosts. They are very powerful, but passive, only attacking when they need to. They defend their place of death to the utmost degree, killing anyone that is caught overstaying their welcome.",
        clues: [0, 1, 3],
        strength: "None.",
        weakness: "A Spirit can be temporarily stopped by burning Smudge Sticks near them.",
        flag: '🌎',
        //Oxford Languages
        origin: "Middle English: from Anglo-Norman French, from Latin spiritus ‘breath, spirit’, from spirare ‘breathe’."
    }],
    ["thaye", {
        name: "Thaye",
	url: "https://phasmophobia.fandom.com/wiki/Thaye",
        description: "Thaye have been known to rapidly age over time, even in the afterlife. From what we've learned, they seem to deteriorate faster while within the presence of the living.",
        clues: [1, 4, 6],
        strength: "Upon entering the location, Thaye will become active, defensive and agile",
        weakness: "Thaye will weaken over time, making them weaker, slower and less aggressive",
        flag: '🇲🇲',
        origin: "In Burmese mythology, the thayé, also spelled 'tasei'), are deceased evil people condemned to be disembodied spirits. They often appear as tall, dark people with huge ears, long tongues, and tusk-like teeth. Thayé enter towns at noon or at night, and usually cause minor illnesses. \n\nThe thayé is said have many faces and bodies; e.g., one might be a pregnant ghost with a fat white body and big ears. Others may be tall and slim, male, or with other varying characteristics."    
    }],
    ["the_twins", {
        name: "The Twins",
	url: "https://phasmophobia.fandom.com/wiki/The_Twins",
        description: "These ghosts have been reported to mimic each other's actions. They alternate their attacks to confuse their prey.",
        clues: [0, 3, 5],
        strength: "Either Twin can be angered and initiate an attack on their prey.",
        weakness: "The Twins will often interact with the environment at the same time.",
        flag: '🌎',
        origin: "Late Old English twinn ‘double’, from twi- ‘two’; related to Old Norse tvinnr . Current verb senses date from late Middle English."
    }],
    ["wraith", {
        name: "Wraith",
	url: "https://phasmophobia.fandom.com/wiki/Wraith",
        description: "Wraiths are one of the most dangerous ghosts you will find. It is also the only known ghost that has the ability of flight and has sometimes been known to travel through walls.",
        clues: [0, 3, 6],
        strength: "Wraith almost never touch the ground, meaning it can't be tracked by footsteps",
        weakness: "Wraiths have a toxic reactiion to Salt.",
        flag: '🌎',
        origin: "Synonym for Ghost. The word has no certain etymology."
    }],
    ["yokai", {
        name: "Yokai",
	url: "https://phasmophobia.fandom.com/wiki/Yokai",
        description: "Yokai are common ghosts that are attracted to human voices. They can usually be found haunting family homes.",
        clues: [3, 4, 6],
        strength: "Talking near the Yokai will anger it, increasing the chance to attack.",
        weakness: "When hunting, a Yokai can only hear voices close to it.",
        flag: '🇯🇵',
        origin: 'Yōkai (妖怪, "strange apparition") are a class of supernatural entities and spirits in Japanese folklore.\nYōkai often have animal features, but may also appear humanoid in appearance. Some yōkai resemble inanimate objects, while others have no discernible shape. Yōkai are typically described as having spiritual or supernatural abilities, with shapeshifting being the most common trait associated with them.'
    }],
    ["yurei", {
        name: "Yurei",
	url: "https://phasmophobia.fandom.com/wiki/Yurei",
        description: "A Yurei is a ghost that has returned to the physical world, usually for the purpose of revenge or hatred.",
        clues: [4, 5, 6],
        strength: "Yureis have been known to have a stronger effect on people's sanity.",
        weakness: "Smudging the Yurei's place of death will trap it temporarily, reducing how much it wanders.",
        flag: '🇯🇵',
        origin: 'Yūrei (幽霊) are figures in Japanese folklore analogous to the Western model of ghosts.\nLike their Chinese and Western counterparts, they are thought to be spirits barred from a peaceful afterlife.'
    }],
    ["mimic", {
        name: "The Mimic",
	url: "https://phasmophobia.fandom.com/wiki/The_Mimic",
        description: "The Mimic is an elusive, mysterious, copycat ghost that mirrors traits and behaviours from others, including other ghost types.",
        clues: [2, 3, 5],
        strength: "We're unsure what this ghost is capable of. Be careful.",
        weakness: "Several reports have noted ghost orb sightings near mimics.",
        flag: '🌎',
        origin: "The word has origin from the Ancient Greek word 'mīmikós' (belonging to mimes), from 'mîmos' (actor)."
    }],
])
