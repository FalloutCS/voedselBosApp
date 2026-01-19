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
    {   key: 'nitrogenFixer',
        valueMap: {
            'TRUE': { 
                label: 'N-binder', 
                classes: 'bg-green-100 text-green-800 border-green-200', 
                title: 'Stikstofbinder' }
        }
    },
    {   key: 'deciduousEvergreen',
        valueMap: {
            'E': { 
                label: 'Wintergroen', 
                classes: 'bg-emerald-100 text-emerald-800 border-emerald-200', 
                title: 'Bladbehoud: Wintergroen' 
            },
            'D': { 
                label: 'Bladverliezend', 
                classes: 'bg-emerald-100 text-emerald-800 border-emerald-200', 
                title: 'Bladbehoud: Bladverliezend' 
            }
        }
    },
    {   key: 'wind', 
        prefix: '💨', 
        title: 'Wind Tolerantie',
        valueMap: {
            'N': { 
                label: '💨 Niet windtolerant', 
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
        prefix: '☀', 
        classes: 'bg-yellow-100 text-yellow-800 border-yellow-200', 
        title: 'Zon/Schaduw' 
    },
    { 
        key: 'moisture', 
        prefix: '💧', 
        title: 'Vochtbehoefte',
        separator: ',',
        valueMap: {
            'D': { 
                label: '💧 Droog', 
                classes: 'bg-cyan-100 text-cyan-800 border-cyan-200', 
                title: 'Vochtbehoefte: Droge grond' 
            },
            'M': { 
                label: '💧 Vochtig', 
                classes: 'bg-cyan-100 text-cyan-800 border-cyan-200', 
                title: 'Vochtbehoefte: Vochtige grond' 
            },
            'We': { 
                label: '💧 Natte grond', 
                classes: 'bg-cyan-100 text-cyan-800 border-cyan-200', 
                title: 'Vochtbehoefte: Natte grond' 
            }
        }
    },
    // { key: 'soil', 
    //     prefix: '🌱', 
    //     classes: 'bg-stone-100 text-stone-700 border-stone-200', 
    //     title: 'Grondsoort'
    // },
    // { key: 'pH', 
    //     prefix: 'pH', 
    //     classes: 'bg-purple-100 text-purple-800 border-purple-200', 
    //     title: 'Zuurgraad' 
    // },
    // { key: 'ukHardiness', 
    //     prefix: 'Zone', 
    //     classes: 'bg-rose-100 text-rose-800 border-rose-200', 
    //     title: 'Hardheid (UK Zone)' 
    // },
    { key: 'height', 
        prefix: 'Hoogte ↕', 
        suffix: 'm', 
        classes: 'bg-gray-100 text-gray-700 border-gray-200', 
        title: 'Hoogte' 
    }
];