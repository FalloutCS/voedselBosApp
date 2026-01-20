import type { Habit } from './types';
import type { PlantBadgeConfig } from './types';

export const layerMapping: Record<string, Habit[]> = {
    "Boom": [
        "Tree",
        "Nothofagus Obliqua"
    ],
    "Struik": [
        "Shrub",
        "Bamboo",
        "Climber",
        "Perennial Climber"
    ],
    "Kruid": [
        "Annual",
        "Annual/Biennial",
        "Annual Climber",
        "Annual/Perennial",
        "Biennial",
        "Biennial/Perennial",
        "Fern",
        "Grass",
        "Perennial"
    ],
    "Grond": [
        "Bulb",
        "Corm",
        "Lichen"
    ]
};

export const propertyConfig: PlantBadgeConfig[] = [
    {   key: 'deciduousEvergreen',
        valueMap: {
            'E': { 
                label: '🍃 Wintergroen', 
                classes: 'bg-emerald-100 text-emerald-800 border-emerald-200', 
                title: 'Deze plant blijft groen in de winter' 
            },
            'D': { 
                label: '🍂 Bladverliezend', 
                classes: 'bg-emerald-100 text-emerald-800 border-emerald-200', 
                title: 'Deze plant verliest zijn blad in de winter' 
            }
        }
    },
    {   key: 'wind',  
        valueMap: {
            'N': { 
                label: '💨 Niet windbestendig', 
                classes: 'bg-slate-100 text-slate-700 border-slate-200', 
                title: 'Heeft een beschutte plek nodig' 
            },
            'W': { 
                label: '💨 Windbestendig', 
                classes: 'bg-slate-100 text-slate-700 border-slate-200', 
                title: 'Kan goed tegen wind' 
            },
            'M': { 
                label: '💨 Zee- & windbestendig', 
                classes: 'bg-slate-100 text-slate-700 border-slate-200', 
                title: 'Bestand tegen harde wind en zoute zeewind' 
            }
        }
    },
    {   key: 'shade', 
        separator: ',',
        valueMap: {
            'F': {
                label: '🌑 Volle Schaduw',
                classes: 'bg-yellow-100 text-yellow-800 border-yellow-200', 
                title: 'Groeit in volledige schaduw' 
            },
            'S': {
                label: '🌓 Halfschaduw',
                classes: 'bg-yellow-100 text-yellow-800 border-yellow-200', 
                title: 'Groeit in zowel zon als schaduw' 
            },
            'N': {
                label: '☀️ Geen Schaduw',
                classes: 'bg-yellow-100 text-yellow-800 border-yellow-200', 
                title: 'Heeft een plek in de volle zon nodig' 
            },
        }
        
    },
    { 
        key: 'nitrogenNeed', 
        valueMap: {
            '0': { 
                label: '🧪 Stikstofbehoefte: Geen', 
                classes: 'bg-orange-200 text-orange-900 border-orange-300', 
                title: 'Heeft geen extra stikstof nodig' 
            },
            '1': { 
                label: '🧪 Stikstofbehoefte: Zeer laag', 
                classes: 'bg-orange-200 text-orange-900 border-orange-300', 
                title: 'Heeft zeer weinig stikstof nodig' 
            },
            '2': { 
                label: '🧪 Stikstofbehoefte: Laag', 
                classes: 'bg-orange-200 text-orange-900 border-orange-300', 
                title: 'Heeft weinig stikstof nodig' 
            },
            '3': { 
                label: '🧪 Stikstofbehoefte: Gemiddeld', 
                classes: 'bg-orange-200 text-orange-900 border-orange-300', 
                title: 'Heeft een gemiddelde hoeveelheid stikstof nodig' 
            },
            '4': { 
                label: '🧪 Stikstofbehoefte: Hoog', 
                classes: 'bg-orange-200 text-orange-900 border-orange-300', 
                title: 'Heeft veel stikstof nodig' 
            },
            '5': { 
                label: '🧪 Stikstofbehoefte: Zeer hoog', 
                classes: 'bg-orange-200 text-orange-900 border-orange-300', 
                title: 'Heeft zeer veel stikstof nodig' 
            }
        }
    },
    { 
        key: 'moisture', 
        separator: ',',
        valueMap: {
            'D': { 
                label: '💧 Droge bodem', 
                classes: 'bg-cyan-100 text-cyan-800 border-cyan-200', 
                title: 'Geschikt voor droge grond' 
            },
            'M': { 
                label: '💧 Vochthoudende bodem', 
                classes: 'bg-cyan-100 text-cyan-800 border-cyan-200', 
                title: 'Geschikt voor vochthoudende grond' 
            },
            'We': { 
                label: '💧 Natte bodem', 
                classes: 'bg-cyan-100 text-cyan-800 border-cyan-200', 
                title: 'Geschikt voor natte grond' 
            }
        }
    },
    { key: 'height', 
        prefix: 'Hoogte ↕', 
        suffix: 'm', 
        classes: 'bg-gray-100 text-gray-700 border-gray-200', 
        title: 'De maximale hoogte van de plant' 
    }
];