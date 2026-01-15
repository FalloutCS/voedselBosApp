import { type Plant } from "$lib/types";
import type { Actions, PageServerLoad } from "./$types";
import { getPlants } from "$lib/server/plantService";
import { fail } from "@sveltejs/kit";
import { postPlants } from "$lib/server/postPlants";
import { forestStore } from "$lib/server/db/forestStore";
import { redirect } from "@sveltejs/kit"; // Add this import

let plants: Plant[];

export const load = (async () => {
  let globalForest = forestStore.get();

  if (!globalForest) {
    globalForest = forestStore.create("Mijn Bos", 10, 10, "Rotterdam");
  }

  // TODO: add error handler
  plants = await getPlants();

  return {
    plants: plants,
    surfaceArea: globalForest.surfaceArea,
    placedPlants: globalForest.placedPlants,
    shapeArray: globalForest.shapeArray,
    width: globalForest.width,
    height: globalForest.height,
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
      return plant.id === plantID;
    });

    const res = forestStore.addPlant(
      cellIndex,
      plant,
      xPosition,
      yPosition,
      plantingDelay
    );
    // TODO add index validation on the forestStore

    if (res === "Missing forest") {
      return fail(400, { missing: true });
    }

    if (res === "Succes") {
      return { succes: true };
    }
  },

  removePlant: async ({ request }) => {
    const data = await request.formData();
    const cellIndex = Number(data.get("cellIndex"));

    const globalForest = forestStore.get();

    if (!globalForest) return fail(400, { missing: true });
    forestStore.removePlant(cellIndex);

    return { success: true };
  },

  uploadSim: async (event) => {
    const filteredData = {
      gardenLocation: forestStore.get()?.location,
      data: forestStore.get()?.placedPlants,
    };

    try {
      await postPlants(filteredData);

    } catch (err) {
      console.error("Simulation upload error:", err);
      return fail(400, { error: "Failed to run simulation" });
    }
    throw redirect(303, "/ResultatenMenu");
  },
  disableCell: async ({ request }) => {
    const data = await request.formData();
    const cellIndex = Number(data.get("cellIndex"));

    try {
      forestStore.disableCell(cellIndex);
      return { success: true };
    } catch (err) {
      return fail(400, { error: "Failed to update cell shape" });
    }
  },
} satisfies Actions;
