import type { Habit } from './types';

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