import { type plantInfo } from "$lib/types";
import { fail } from "@sveltejs/kit";

export async function postPlants(filteredData: plantInfo[] | undefined) {
    if (!filteredData) {
        return fail(400, { eror: 'Leeg voedselbos' })
    }

    try {
        const response = await fetch("http://localhost:5269/api/Simulation/simulate", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "plantSimulationDtos": filteredData })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    } catch (error) {

    }
}