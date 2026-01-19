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
                title: 'Bladbehoud: Wintergroen' 
            },
            'D': { 
                label: '🍃 Bladverliezend', 
                classes: 'bg-emerald-100 text-emerald-800 border-emerald-200', 
                title: 'Bladbehoud: Bladverliezend' 
            }
        }
    },
    {   key: 'wind',  
        valueMap: {
            'N': { 
                label: '💨 Niet windbestendig', 
                classes: 'bg-slate-100 text-slate-700 border-slate-200', 
                title: 'Wind: Niet tolerant' 
            },
            'W': { 
                label: '💨 Windbestendig', 
                classes: 'bg-slate-100 text-slate-700 border-slate-200', 
                title: 'Wind: Bestendig' 
            },
            'M': { 
                label: '💨 Zee- & windbestendig', 
                classes: 'bg-slate-100 text-slate-700 border-slate-200', 
                title: 'Wind: Geschikt voor zeewind' 
            }
        }
    },
    {   key: 'shade', 
        separator: ',',
        valueMap: {
            'F': {
                label: '☀️ Volle Schaduw',
                classes: 'bg-yellow-100 text-yellow-800 border-yellow-200', 
                title: 'Volle Schaduw' 
            },
            'S': {
                label: '☀️ Halfschaduw',
                classes: 'bg-yellow-100 text-yellow-800 border-yellow-200', 
                title: 'Halfschaduw' 
            },
            'N': {
                label: '☀️ Geen Schaduw',
                classes: 'bg-yellow-100 text-yellow-800 border-yellow-200', 
                title: 'Geen Schaduw' 
            },
        }
        
    },
    { 
        key: 'moisture', 
        separator: ',',
        valueMap: {
            'D': { 
                label: '💧 Droge bodem', 
                classes: 'bg-cyan-100 text-cyan-800 border-cyan-200', 
                title: 'Vochtbehoefte: Droge bodem' 
            },
            'M': { 
                label: '💧 Vochthoudende bodem', 
                classes: 'bg-cyan-100 text-cyan-800 border-cyan-200', 
                title: 'Vochtbehoefte: Vochthoudende bodem' 
            },
            'We': { 
                label: '💧 Natte bodem', 
                classes: 'bg-cyan-100 text-cyan-800 border-cyan-200', 
                title: 'Vochtbehoefte: Natte bodem' 
            }
        }
    },
    { key: 'nitrogenNeed', 
        prefix: 'Stikstofbehoefte klasse: ', 
        classes: 'bg-gray-100 text-gray-700 border-gray-200', 
        title: 'Stikstofbehoefte' 
    },
    { key: 'height', 
        prefix: 'Hoogte ↕', 
        suffix: 'm', 
        classes: 'bg-gray-100 text-gray-700 border-gray-200', 
        title: 'Hoogte' 
    }
];