import { Voedselbos, type Plant } from '$lib/types';
import type { Actions, PageServerLoad } from './$types';
import { validateIndex } from '$lib/server/utils';
import { getPlants } from '$lib/server/plantService';
import { fail } from '@sveltejs/kit';

let garden_State: Voedselbos | null = null;
let plants: Plant[]

let PLANT_TO_ADD: Plant = {
    commonName: "apple",
    habit: "Tree",
    id: 0,
    latinName: "Aplcauts",
    wind: 'M'
}

export const load = (async () => {
    if (!garden_State) {
        garden_State = new Voedselbos("Mijn Voedselbos", 10, 10)
        console.log("Garden Created for the first time.")
        garden_State?.populateForest()
    }

    plants = await getPlants()

    console.log(plants)

    return {
        canvas: garden_State.canvas,
        width: garden_State.width,
        heigth: garden_State.height,
    };
}) satisfies PageServerLoad;

export const actions = {
    addPlant: async ({ request }) => {
        const data = await request.formData()
        const cellIndexString = data.get("cellIndex")
        const cellIndex = Number(cellIndexString)

        if (!garden_State) {
            return fail(400, { missing: true })
        }

        if (validateIndex(cellIndex, garden_State)) {
            return fail(400, { incorrect: true })
        }

        garden_State.canvas[cellIndex].isPopulated = true
        garden_State.canvas[cellIndex].plant = { ...PLANT_TO_ADD }

        return { succes: true }
    },

    removePlant: async (event) => {
        // TODO remove plant from canvas state
    }
} satisfies Actions;

