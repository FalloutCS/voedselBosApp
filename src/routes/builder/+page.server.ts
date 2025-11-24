import { Voedselbos, type Plant } from '$lib/types';
import type { Actions, PageServerLoad } from './$types';
import { validateIndex } from '$lib/server/utils';

let garden_State: Voedselbos | null = null;

const PLANT_TO_ADD: Plant = {
    name: "Apple Tree",
    img: "/images/apple.png"
}

export const load = (async () => {
    if (!garden_State) {
        garden_State = new Voedselbos("Mijn Voedselbos", 10, 10)
        console.log("Garden Created for the first time.")
        garden_State?.populateForest()
    }
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

        if (!garden_State){
            return {status: 400, body: {error: 'Garden state not initialized'}}
        }

        if (validateIndex(cellIndex, garden_State)) {
            console.log("error")
            return {status: 400, body: {error: "Cellindex is invalid"}}
        }

        garden_State.canvas[cellIndex].isPopulated = true
        garden_State.canvas[cellIndex].plant = {...PLANT_TO_ADD}
    },

    removePlant: async (event) => {
        // TODO remove plant from canvas state
    }
} satisfies Actions;

