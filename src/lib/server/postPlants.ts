import { type SimulationResultDto, type voedselbos_Cel } from "$lib/types";
import { fail } from "@sveltejs/kit";

export async function postPlants(filteredData: { location: String, data: voedselbos_Cel[] | undefined }) {
    if (!filteredData) {
        return fail(400, { eror: 'Leeg voedselbos' })
    }

    try {
        console.log(filteredData)
        const response = await fetch("http://localhost:5269/api/Simulation/simulate", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "plantSimulationDtos": filteredData.data, "placeName" : filteredData.location })
        })
        
        const data: SimulationResultDto = await response.json();
        //console.log("Raw:", data);
        console.log(data.plants);
        console.log(data.warnings);

        return data;
    } catch (error) {
        console.error(error);
    }
}