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

        const cell = globalForest.forest_Cubes_Array[cellIndex];

        cell.plant = plantID
        cell.uid = cellIndex;
        cell.plantingDelay = plantingDelay;
        cell.xPosition = xPosition;
        cell.yPosition = yPosition; 

        console.log(cell)

        return "Succes"
    },

    removePlant: (cellIndex: number) => {
        if (!globalForest) {
            return "Missing forest"
        }

        const cell = globalForest.forest_Cubes_Array[cellIndex];

        cell.plant = undefined;
        cell.plantingDelay = 0;
        
        console.log(cell);

        return "Succes"
    }
}