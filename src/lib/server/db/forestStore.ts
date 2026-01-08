import type {Plant, PlantInfo } from "$lib/types";
import { Voedselbos } from "../voedselBos";

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
