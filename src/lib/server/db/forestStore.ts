import type { Plant } from "$lib/types";
import { Voedselbos } from "../voedselBos";

let globalForest: Voedselbos | null = null;

export const forestStore = {

    get: () => {
        return globalForest
    },

    create: (name: string, width: number, height: number) => {
        globalForest = new Voedselbos(name, width, height)
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

        globalForest.forest_Cubes_Array[cellIndex].plant = plantID
        globalForest.forest_Cubes_Array[cellIndex].uid = cellIndex;
        globalForest.forest_Cubes_Array[cellIndex].plantingDelay = plantingDelay;
        globalForest.forest_Cubes_Array[cellIndex].xPosition = xPosition;
        globalForest.forest_Cubes_Array[cellIndex].yPosition = yPosition;

        return "Succes"
    }
}