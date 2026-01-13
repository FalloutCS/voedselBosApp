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
            { value: 'N', label: 'Niet tolerant (N)' },
            { value: 'W', label: 'Weinig (W)' },
            { value: 'M', label: 'Matig (M)' },
            { value: 'F', label: 'Sterk (F)' }
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
        key: 'soil',
        label: 'Grondsoort',
        options: [
            { value: 'L', label: 'Licht / Zand' },
            { value: 'M', label: 'Medium / Leem' },
            { value: 'H', label: 'Zwaar / Klei' }
        ],
        matcher: (plant, value) => plant.soil ? plant.soil.includes(value) : false
    },
    {
        key: 'shade',
        label: 'Schaduw',
        options: [
            { value: 'N', label: 'Geen schaduw (Volle zon)' },
            { value: 'S', label: 'Halfschaduw' },
            { value: 'F', label: 'Volle schaduw' }
        ],
        matcher: (plant, value) => plant.shade ? plant.shade.includes(value) : false
    },
    {
        key: 'nitrogen',
        label: 'Stikstofbinder',
        options: [
            { value: 'TRUE', label: 'Ja' },
            { value: 'FALSE', label: 'Nee' }
        ],
        matcher: (plant, value) => plant.nitrogenFixer === value
    }
];