import { Voedselbos } from '$lib/types';
import type { PageServerLoad } from './$types';

let garden_State: Voedselbos | null = null;

export const load = (async () => {

    if (!garden_State) {
        garden_State = new Voedselbos("Mijn Voedselbos", 10, 10)
        console.log("Garden Created for the first time.")
        garden_State?.populateForest()
    }

    return {
        canvas: garden_State.canvas,
        width: garden_State.width
    };
}) satisfies PageServerLoad;


export const actions = (async() =>{
    
})

