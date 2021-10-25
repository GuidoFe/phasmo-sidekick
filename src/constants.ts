import { Constants } from "@modules"
export const constants: Constants = {
    prefix: "!ph",
    items: ["Spirit box", "Book", "Photo Camera", "EMF", "Video Camera", "UV Flashlight", "D.O.T.S.", "Candle", "Crucifix", "Glow Stick", "Head Mounted Camera", "Motion Sensor", "Lighter", "Parabolic Mic", "Salt", "Pills", "Smudge Stick", "Sound Sensor", "Strong Flashlight", "Thermometer", "Tripod"],

    maps: new Map<string, string>([
        ["t", "Tanglewood"],
        ["e", "Edgefield"],
        ["w", "Willow"],
        ["r", "Ridgeview"],
        ["g", "Grafton"],
        ["b", "Bleasdale"],
        ["h", "Highschool"],
        ["p", "Prison"],
        ["a", "Asylum"],
        ["c", "Campfire"]
    ]),

    commonClueNames: new Map<string, number>([
        ["emf", 0], ["emf5", 0],
        ["book", 1], ["writing", 1], ["ghostwriting", 1],
        ["fingerprints", 2], ["fingers", 2],
        ["spirit", 3], ["spiritbox", 3],
        ["orbs", 4], ["orb", 4], ["ghostorbs", 4],
        ["freezing", 5], ["temps", 5],
        ["dots", 6], ["DOTS", 6], ["D.O.T.S.", 6]
    ]),

    correctClueNames: ["EMF 5", "Ghost Writing", "Fingerprints", "Spiritbox", "Ghost orbs", "Freezing", "D.O.T.S."],
    ghosts: new Map<string, number[]>([
        ["Myling", [0, 1, 2]],
        ["Spirit", [0, 1, 3]],
        ["Shade", [0, 1, 5]],
        ["Obake", [0, 2, 4]],
        ["Jinn", [0, 2, 5]],
        ["Goryo", [0, 2, 6]],
        ["The Twins", [0, 3, 5]],
        ["Wraith", [0, 3, 6]],
        ["Raiju", [0, 4, 6]],
        ["Oni", [0, 5, 6]],
        ["Poltergeist", [1, 2, 4]],
        ["Demon", [1, 2, 5]],
        ["Mare", [1, 3, 4]],
        ["Revenant", [1, 4, 5]],
        ["Phantom", [2, 3, 6]],
        ["Hantu", [2, 4, 5]],
        ["Banshee", [2, 4, 6]],
        ["Onryo", [3, 4, 5]],
        ["Yokai", [3, 4, 6]],
        ["Yurei", [4, 5, 6]],
    ]),
};
