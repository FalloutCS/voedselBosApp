import { type Plant } from '$lib/types';
import type { Actions, PageServerLoad } from './$types';
import { getPlants } from '$lib/server/plantService';
import { fail } from '@sveltejs/kit';
import { postPlants } from '$lib/server/postPlants';
import { forestStore } from '$lib/server/db/forestStore';
import { validateIndex } from '$lib/server/indexValidation';

let plants: Plant[]


export const load = (async () => {
    let globalForest = forestStore.get()

    // AFTER THE MAIN PAGE IS DONE, WE SHOULD REDIRECT THE USER TO THE CREATE FOREST PAGE
    // if (!globalForest) {
    //     redirect(307, "/")
    // }

    if (!globalForest) {
        globalForest = forestStore.create("Mijn Bos", 10, 10, "Rotterdam")
    }

    // TODO: add error handler
    plants = await getPlants()

    return {
        plants: plants,
        placedPlants: globalForest.placedPlants,
        shapeArray: globalForest.shapeArray,
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

        // TODO add error handling for missing plant
        let plant = plants.find((plant) => {
            return plant.id === plantID
        })

        const res = forestStore.addPlant(cellIndex, plant, xPosition, yPosition, plantingDelay)
        // TODO add index validation on the forestStore

        if (res === "Missing forest") {
            return fail(400, { missing: true })
        }

        if (res === "Succes") {
            return { succes: true }
        }
    },

    removePlant: async ({ request }) => {
        const data = await request.formData();
        const cellIndex = Number(data.get("cellIndex"));

        const globalForest = forestStore.get();

        // Validatie
        if (!globalForest) return fail(400, { missing: true });
        if (validateIndex(cellIndex, globalForest)) return fail(400, { incorrect: true });

        // Gebruik nu de store functie in plaats van directe manipulatie
        forestStore.removePlant(cellIndex);

        return { success: true };
    },

    uploadSim: async (event) => {
        const filteredData = {
            gardenLocation: "Rotterdam",
            data: forestStore.get()?.placedPlants.filter((el) => {
                return el.plant != undefined
            })
        }

        const res = await postPlants(filteredData)
    },

    disableCell: async ({ request }) => {
        const data = await request.formData();
        const cellIndex = Number(data.get("cellIndex"));

        const res = forestStore.disableCell(cellIndex)
    }
} satisfies Actions;

