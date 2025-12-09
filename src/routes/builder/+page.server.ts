import { type Plant } from '$lib/types';
import { Voedselbos } from '$lib/server/voedselBos';
import type { Actions, PageServerLoad } from './$types';
import { validateIndex } from '$lib/server/indexValidation';
import { getPlants } from '$lib/server/plantService';
import { fail } from '@sveltejs/kit';
import { postPlants } from '$lib/server/postPlants';
import { forestStore } from '$lib/server/db/forestStore';

let garden_State: Voedselbos | null = null;
let plants: Plant[]


export const load = (async () => {


        let globalForest = forestStore.get()

    // AFTER THE MAIN PAGE IS DONE, WE SHOULD REDIRECT THE USER TO THE CREATE FOREST PAGE
    // if (!globalForest) {
    //     redirect(307, "/")
    // }

    if (!globalForest) {
        globalForest = forestStore.create("Mijn Bos", 10, 10)
    }

    // TODO: add error handler
    plants = await getPlants()

    return {
        plants: plants,
        canvas: globalForest.forest_Cubes_Array,
        width: globalForest.width,
        heigth: globalForest.height,
    };
}) satisfies PageServerLoad;

export const actions = {
    addPlant: async ({ request }) => {
        const data = await request.formData();
        const cellIndex = Number(data.get("cellIndex"));
        const plantID = Number(data.get("plantID"));
        const xPosition = Number(data.get("xPosition"));
        const yPosition = Number(data.get("yPosition"));
        const plantingDelay = Number(data.get("plantingDelay"));

        let res = forestStore.addPlant(cellIndex, )

        return { succes: true }
    },

    uploadSim: async (event) => {
        const filteredData = garden_State?.forest_Cubes_Array.filter((el) => {
            return el.plant != undefined
        })

        const res = await postPlants(filteredData)
    }
} satisfies Actions;

