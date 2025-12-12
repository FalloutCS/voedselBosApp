import type { Plant } from "$lib/types";
import { Voedselbos } from "../voedselBos";

let globalForest: Voedselbos | null = null;

export const forestStore = {

    get: () => {
        return globalForest
    },

    create: (name: string, width: number, height: number, location: string) => {
        globalForest = new Voedselbos(name, width, height, location)
        globalForest.populateForest()
        return globalForest
    },

    addPlant: (cellIndex: number, plantID: Plant | undefined, xPosition: number, yPosition: number, plantingDelay: number) => {
        if (!globalForest) {
            return "Missing forest"
        }

        if (!plantID) {
            return "Plant not found"
        }

        globalForest.placedPlants[cellIndex].plant = plantID
        globalForest.placedPlants[cellIndex].uid = cellIndex;
        globalForest.placedPlants[cellIndex].plantingDelay = plantingDelay;
        globalForest.placedPlants[cellIndex].xPosition = xPosition;
        globalForest.placedPlants[cellIndex].yPosition = yPosition;

        return "Succes"
    }
}