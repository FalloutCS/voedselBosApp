import type { Plant } from "$lib/types";
import { Voedselbos } from "../voedselBos";

let globalForest: Voedselbos | null = null;

export const forestStore = {
  get: () => {
    return globalForest;
  },

  create: (name: string, width: number, height: number, location: string) => {
    globalForest = new Voedselbos(name, width, height, location);
    globalForest.populateForest();
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

    const cell = globalForest.placedPlants[cellIndex];

    cell.plant = plantID;
    cell.uid = cellIndex;
    cell.plantingDelay = plantingDelay;
    cell.xPosition = xPosition;
    cell.yPosition = yPosition;

    return "Succes";
  },

  removePlant: (cellIndex: number) => {
    if (!globalForest) {
      return "Missing forest";
    }

    const cell = globalForest.placedPlants[cellIndex];

    cell.plant = undefined;
    cell.plantingDelay = 0;

    return "Succes";
  },

  disableCell: (cellIndex: number) => {
    if (!globalForest) {
      throw new Error("Forest not initialized");
    }

    const index = globalForest.shapeArray.indexOf(cellIndex);

    if (index > -1) {
      globalForest.shapeArray.splice(index, 1);
    } else {
      globalForest.shapeArray.push(cellIndex);
    }

    return globalForest.shapeArray;
  },
};
