// src/routes/ResultatenMenu/+page.server.ts
import type { PageServerLoad } from "./$types";
import { forestStore } from "$lib/server/db/forestStore";
import { postPlants } from "$lib/server/postPlants";
import { redirect } from "@sveltejs/kit";

export const load = (async () => {
  let globalForest = forestStore.get();

  // Redirect back if no forest exists
  if (!globalForest) {
    throw redirect(307, "/builder");
  }

  // Prepare data for simulation
  const filteredData = {
    gardenLocation: "Rotterdam", // Could be dynamic based on globalForest properties
    data: globalForest.placedPlants,
  };

  console.log(filteredData)

  // Fetch simulation results
  let simulationResults = null;
  try {
    // We use the existing postPlants function
    simulationResults = await postPlants(filteredData);
  } catch (err) {
    console.error("Simulation failed:", err);
    // We continue loading the page even if simulation fails, 
    // though you might want to handle this differently in the UI.
  }

  return {
    placedPlants: globalForest.placedPlants,
    shapeArray: globalForest.shapeArray,
    width: globalForest.width,
    heigth: globalForest.height, // Note: keeping your typo 'heigth' to match existing Canvas prop
    simulationResults: simulationResults
  };
}) satisfies PageServerLoad;