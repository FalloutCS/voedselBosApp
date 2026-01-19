import type { FilterConfig } from './types';
import { layerMapping } from './constants';

export const activeFilters: FilterConfig[] = [
    {
        key: 'layer',
        label: 'Laag (Habit)',
        options: [
            { value: 'Boom', label: 'Boomlaag' },
            { value: 'Struik', label: 'Struiklaag' },
            { value: 'Kruid', label: 'Kruidlaag' },
            { value: 'Grond', label: 'Grondlaag' }
        ],
        matcher: (plant, value) => {
            if (!plant.habit) return false;
            const allowedHabits = layerMapping[value];
            return allowedHabits ? allowedHabits.includes(plant.habit) : true;
        }
    },
    {
        key: 'wind',
        label: 'Wind Tolerantie',
        options: [
            { value: 'N', label: 'Niet Tolerant' },
            { value: 'W', label: 'Windbestendig' },
            { value: 'M', label: 'Zee- & Windbestendig' }
        ],
        matcher: (plant, value) => plant.wind === value
    },
    {
        key: 'leaf',
        label: 'Bladbehoud',
        options: [
            { value: 'D', label: 'Bladverliezend' },
            { value: 'E', label: 'Wintergroen' }
        ],
        matcher: (plant, value) => plant.deciduousEvergreen === value
    },
    {
        key: 'moisture',
        label: 'Vochtbehoefte',
        options: [
            { value: 'D', label: 'Droge bodem' },
            { value: 'M', label: 'Vochthoudende bodem' },
            { value: 'We', label: 'Natte bodem' }
        ],
        matcher: (plant, value) => {
            if (!plant.moisture) return false;
            return plant.moisture.split('').includes(value) || plant.moisture.includes(value);
        }
    },
    {
        key: 'shade',
        label: 'Schaduw Tolerantie',
        options: [
            { value: 'N', label: 'Geen schaduw' },
            { value: 'S', label: 'Halfschaduw' },
            { value: 'F', label: 'Volle schaduw' }
        ],
        matcher: (plant, value) => {
            if (!plant.shade) return false;
            return plant.shade.split('').includes(value) || plant.shade.includes(value);
        }
    },
];