// all possible solutions
const solutions = [
  "leans",
  "abbey",
  "adapt",
  "rebut",
  "today",
  "might",
  "fries",
  "mills",
  "aroma",
  "moist",
  "toils",
  "foils",
  "those",
  "shard",
  "these",
  "grind",
  "rough",
  "grain",
  "pause",
  "robin",
  "ultra",
  "super",
  "wrung",
  "whack",
  "proxy",
  "knoll",
  "hills",
  "prick",
  "robot",
  "solar",
  "favor",
  "crank",
  "query",
  "siege",
  "wreck",
  "cigar",
  "drank",
  "drunk",
  "panic",
  "mount",
  "mound",
  "moult",
  "evade",
  "bench",
  "quiet",
  "dwarf",
  "health",
  "focal",
  "sissy",
  "crust",
  "floss",
  "helix",
  "croak",
  "cloak",
  "capes",
  "horns",
  "digit",
  "crate",
  "fears",
  "linen",
  "aloft",
  "elder",
  "older",
  "stalk",
  "bland",
  "salty",
  "quart",
  "twice",
  "needy",
  "widow",
  "irony",
  "fungi",
  "alpha",
  "recap",
  "glory",
  "soggy",
  "usurp",
  "marsh",
  "vigor",
  "spade",
  "quirk",
  "spiel",
  "caught",
  "irate",
  "waltz",
  "adieu",
  "photo",
  "aloud",
  "unite",
  "snarl",
  "glyph",
  "poops",
  "poopy",
  "vault",
  "godly",
  "threw",
  "grave",
  "codes",
  "yanks",
  "opera",
  "dimes",
  "crave",
  "raves",
  "valve",
  "seats",
  "rifle",
  "valet",
  "refer",
  "quota",
  "quote",
  "wheel",
  "lifts",
  "cords",
  "wires",
  "cello",
  "games",
  "squid",
  "bests",
  "bumps",
  "trunk",
  "wells",
  "holes",
  "comma",
  "colon",
  "beard",
  "short",
  "shelf",
  "draws",
  "cases",
  "balls",
  "dumps",
  "drops",
  "jumps",
  "cheer",
  "caves",
  "react",
  "sharp",
  "dreer",
  "dread",
  "magic",
  "medal",
  "ports",
  "falls",
  "salts",
  "flats",
  "skate",
  "silly",
  "goofy",
  "smart",
  "solid",
  "spare",
  "urban",
  "vague",
  "wrong",
  "young",
  "vital",
  "valid",
  "usual",
  "upset",
  "tough",
  "upper",
  "tight",
  "third",
  "thick",
  "still",
  "steep",
  "sorry",
  "sheer",
  "sixth",
  "royal",
  "rural",
  "ready",
  "rapid",
  "prior",
  "plain",
  "outer",
  "naval",
  "nasty",
  "naked",
  "moral",
  "minor",
  "miner",
  "loose",
  "boats",
  "mined",
  "rains",
  "tiers",
  "reins",
  "reign",
  "moles",
  "awoke",
  "dazed",
  "wakes",
  "spent",
  "cells",
  "meals",
  "cooks",
  "chefs",
  "loves",
  "loved",
  "weary",
  "bills",
  "clubs",
  "cards",
  "doors",
  "deals",
  "faces",
  "farms",
  "files",
  "films",
  "fires",
  "foods",
  "girls",
  "goals",
  "hands",
  "males",
  "hopes",
  "hours",
  "ideas",
  "jacks",
  "looks",
  "marks",
  "moves",
  "needs",
  "risks",
  "rocks",
  "roles",
  "sales",
  "rules",
  "signs",
  "steps",
  "tasks",
  "turns",
  "units",
  "weeks",
  "years",
  "woods",
  "would",
  "towns",
  "skins",
  "sites",
  "parks",
  "parts",
  "about",
  "above",
  "actor",
  "acute",
  "admit",
  "adopt",
  "after",
  "again",
  "agree",
  "ahead",
  "alarm",
  "album",
  "alert",
  "alike",
  "alive",
  "alone",
  "along",
  "alter",
  "angle",
  "apart",
  "apply",
  "arena",
  "argue",
  "arise",
  "array",
  "aside",
  "asset",
  "audit",
  "avoid",
  "aware",
  "badly",
  "baker",
  "bases",
  "tiger",
  "words",
  "joint",
  "fresh",
  "trees",
  "times",
  "allow",
  "among",
  "angry",
  "audio",
  "boost",
  "carry",
  "check",
  "clean",
  "could",
  "craft",
  "dying",
  "enter",
  "equal",
  "first",
  "fleet",
  "frank",
  "funny",
  "giant",
  "gross",
  "happy",
  "heavy",
  "human",
  "inner",
  "lives",
  "basic",
  "began",
  "begin",
  "begun",
  "being",
  "below",
  "black",
  "blame",
  "blind",
  "booth",
  "bound",
  "brand",
  "break",
  "breed",
  "brief",
  "bring",
  "broad",
  "broke",
  "build",
  "built",
  "cable",
  "catch",
  "chart",
  "chase",
  "cheap",
  "clear",
  "click",
  "close",
  "count",
  "crash",
  "cross",
  "curve",
  "daily",
  "dated",
  "dealt",
  "debut",
  "delay",
  "depth",
  "doing",
  "dozen",
  "drawn",
  "drill",
  "drove",
  "eager",
  "early",
  "eight",
  "elite",
  "empty",
  "enjoy",
  "every",
  "exact",
  "exist",
  "extra",
  "false",
  "fiber",
  "fifth",
  "fifty",
  "flash",
  "fluid",
  "forth",
  "forty",
  "forum",
  "found",
  "fraud",
  "fully",
  "given",
  "globe",
  "going",
  "grace",
  "grade",
  "grand",
  "great",
  "grown",
  "guard",
  "guess",
  "guest",
  "hence",
  "ideal",
  "mauls",
  "balds",
  "stall",
  "birth",
  "crime",
  "crowd",
  "crown",
  "drive",
  "level",
  "nurse",
  "plate",
  "ratio",
  "route",
  "rugby",
  "scale",
  "scene",
  "scope",
  "score",
  "sense",
  "shape",
  "share",
  "sheep",
  "sheet",
  "shift",
  "sound",
  "speed",
  "sport",
  "squad",
  "stage",
  "start",
  "state",
  "steam",
  "steel",
  "stock",
  "stone",
  "store",
  "study",
  "taste",
  "theme",
  "title",
  "touch",
  "tower",
  "track",
  "train",
  "trend",
  "trial",
  "trust",
  "truth",
  "uncle",
  "unity",
  "value",
  "video",
  "visit",
  "voice",
  "waste",
  "watch",
  "water",
  "while",
  "woman",
  "abuse",
  "adult",
  "agent",
  "anger",
  "apple",
  "award",
  "basis",
  "beach",
  "block",
  "blood",
  "board",
  "brain",
  "bread",
  "brown",
  "buyer",
  "cause",
  "chain",
  "chair",
  "chest",
  "chief",
  "child",
  "claim",
  "class",
  "clock",
  "coach",
  "coast",
  "court",
  "cover",
  "cream",
  "cycle",
  "dance",
  "death",
  "doubt",
  "draft",
  "drama",
  "dream",
  "dress",
  "drink",
  "earth",
  "enemy",
  "entry",
  "error",
  "event",
  "faith",
  "fault",
  "field",
  "fight",
  "final",
  "focus",
  "force",
  "frame",
  "front",
  "fruit",
  "glass",
  "grant",
  "grass",
  "green",
  "group",
  "guide",
  "heart",
  "horse",
  "hotel",
  "house",
  "image",
  "index",
  "input",
  "issue",
  "judge",
  "knife",
  "layer",
  "light",
  "limit",
  "lunch",
  "major",
  "march",
  "match",
  "metal",
  "model",
  "money",
  "month",
  "motor",
  "mouth",
  "music",
  "night",
  "noise",
  "north",
  "novel",
  "offer",
  "order",
  "other",
  "owner",
  "panel",
  "paper",
  "party",
  "peace",
  "phase",
  "phone",
  "piece",
  "pilot",
  "pitch",
  "place",
  "plane",
  "plant",
  "point",
  "power",
  "press",
  "price",
  "pride",
  "prize",
  "proof",
  "queen",
  "radio",
  "range",
  "reply",
  "right",
  "river",
  "round",
  "shirt",
  "shock",
  "sight",
  "skill",
  "sleep",
  "smile",
  "smoke",
  "south",
  "space",
  "spite",
  "staff",
  "stuff",
  "style",
  "sugar",
  "table",
  "thing",
  "total",
  "trade",
  "union",
  "white",
  "whole",
  "world",
  "youth",
  "zebra",
  "xerox",
  "acidy",
  "acids",
  "troll",
  "chasm",
  "poppy",
  "phony",
  "raggy",
  "pygmy",
  "lyric",
  "pushy",
  "merry",
  "fixer",
  "annex",
  "packs",
  "hacks",
  "latex",
  "vases",
  "jolts",
  "joker",
  "joins",
  "jokes",
  "jewel",
  "junks",
  "jumbo",
  "jazzy",
  "jerky",
  "junky",
  "jerks",
  "gears",
  "bares",
  "bears",
  "scare",
  "wears",
  "reads",
  "crawl",
  "crush",
  "pores",
  "towel",
  "flush",
  "works",
  "nuked",
  "nukes",
  "ticks",
  "marry",
  "boxes",
  "foxes",
  "fixed",
  "spear",
  "lines",
  "pound",
  "floor",
  "mouse"
];
