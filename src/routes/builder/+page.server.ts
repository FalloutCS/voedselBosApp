import { Voedselbos, type Plant } from '$lib/types';
import type { Actions, PageServerLoad } from './$types';
import { validateIndex } from '$lib/server/utils';
import { getPlants } from '$lib/server/plantService';
import { fail } from '@sveltejs/kit';

let garden_State: Voedselbos | null = null;
let plants: Plant[]


export const load = (async () => {
    if (!garden_State) {
        garden_State = new Voedselbos("Mijn Voedselbos", 10, 10)
        console.log("Garden Created for the first time.")
        garden_State?.populateForest()
    }

    // TODO: add error handler
    plants = await getPlants()

    return {
        plants: plants,
        canvas: garden_State.canvas,
        width: garden_State.width,
        heigth: garden_State.height,
    };
}) satisfies PageServerLoad;

export const actions = {
    addPlant: async ({ request }) => {
        const data = await request.formData()
        const cellIndex = Number(data.get("cellIndex"))
        const plantID = Number(data.get("plantID"))

        if (!garden_State) {
            return fail(400, { missing: true })
        }

        if (validateIndex(cellIndex, garden_State)) {
            return fail(400, { incorrect: true })
        }

        garden_State.canvas[cellIndex].isPopulated = true
        garden_State.canvas[cellIndex].plant = plants.find((plant) => {
            return plant.id === plantID
        })

        return { succes: true }
    },

    removePlant: async (event) => {
        // TODO remove plant from canvas state
    }
} satisfies Actions;

