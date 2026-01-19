import {
  type SimulationResultDto,
  type PlantInfo,
  type PlacedPlant,
} from "$lib/types";
import { fail } from "@sveltejs/kit";

export async function postPlants(filteredData: {
  gardenLocation: String | undefined;
  data: PlacedPlant | undefined;
}) {
  if (!filteredData) {
    return fail(400, { eror: "Leeg voedselbos" });
  }

  try {
    const response = await fetch(
      "http://localhost:5269/api/Simulation/simulate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "plantSimulationDtos": filteredData.data, "placeName" : filteredData.gardenLocation })
      }
    );

    const data: SimulationResultDto = await response.json();
    //console.log("Raw:", data);
    console.log(data.plants);
    console.log(data.warnings);

    return data;
  } catch (error) {
    console.error(error);
  }
}
