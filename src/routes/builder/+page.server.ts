import { type Plant } from '$lib/types';
import { Voedselbos } from '$lib/server/voedselBos';
import type { Actions, PageServerLoad } from './$types';
import { validateIndex } from '$lib/server/indexValidation';
import { getPlants } from '$lib/server/plantService';
import { fail } from '@sveltejs/kit';
import { postPlants } from '$lib/server/postPlants';

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
        canvas: garden_State.plantSimulationDtos,
        width: garden_State.width,
        heigth: garden_State.height,
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

        if (!garden_State) {
            return fail(400, { missing: true });
        }

        if (validateIndex(cellIndex, garden_State)) {
            return fail(400, { incorrect: true });
        }

        garden_State.plantSimulationDtos[cellIndex].plant = plants.find((plant) => {
            return plant.id === plantID
        })
        garden_State.plantSimulationDtos[cellIndex].uid = cellIndex;
        garden_State.plantSimulationDtos[cellIndex].plantingDelay = plantingDelay;
        garden_State.plantSimulationDtos[cellIndex].xPosition = xPosition;
        garden_State.plantSimulationDtos[cellIndex].yPosition = yPosition;

        return { succes: true }
    },

    removePlant: async ({ request }) => {
        const data = await request.formData();
        const cellIndex = Number(data.get("cellIndex"));

        if (!garden_State) return fail(400, { missing: true });
        if (validateIndex(cellIndex, garden_State)) return fail(400, { incorrect: true });

        // Reset the plant data for this cell
        garden_State.plantSimulationDtos[cellIndex].plant = undefined;
        // Optionally reset other properties if needed
        garden_State.plantSimulationDtos[cellIndex].plantingDelay = 0;

        return { success: true };
    },

    uploadSim: async (event) => {
        const filteredData = garden_State?.plantSimulationDtos.filter((el) => {
            return el.plant != undefined
        })

        const res = await postPlants(filteredData)
    }
} satisfies Actions;

