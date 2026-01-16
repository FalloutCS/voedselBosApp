import type { Plant, PlantInfo } from "$lib/types";
import { Voedselbos, type TerrainType } from "../voedselBos";

let globalForest: Voedselbos | null = null;

export const forestStore = {
  get: () => {
    return globalForest;
  },

  create: (name: string, width: number, height: number, location: string) => {
    globalForest = new Voedselbos(name, width, height, location);
    return globalForest;
  },

  addPlant: (
    cellIndex: number,
    plantID: Plant | undefined,
    xPosition: number,
    yPosition: number,
    plantingDelay: number
  ) => {
    if (!globalForest) {
      return "Missing forest";
    }

    if (!plantID) {
      return "Plant not found";
    }

    const newPlantInfo: PlantInfo = {
      uid: cellIndex,
      plantingDelay: plantingDelay,
      xPosition: xPosition,
      yPosition: yPosition,
      plant: plantID,
    };

    globalForest.placedPlants[cellIndex] = newPlantInfo;

    return "Succes";
  },

  removePlant: (cellIndex: number) => {
    if (!globalForest) {
      return "Missing forest";
    }

    delete globalForest.placedPlants[cellIndex];

    return "Succes";
  },

  terraformCell: (cellIndex: number, type: TerrainType) => {
    if (!globalForest) {
      throw new Error("Forest not initialized");
    }

    const currentType = globalForest.terrain[cellIndex];

    if (currentType === type) {
      // Toggle OFF if clicking the same tool
      delete globalForest.terrain[cellIndex];
    } else {
      // Overwrite/Set if new tool
      globalForest.terrain[cellIndex] = type;
    }

    return "success";
  },
};
