
import { Voedselbos } from "$lib/types";

export function validateIndex (cellIndex: number, garden_State: Voedselbos) {
    if (cellIndex >= garden_State.canvas.length){
        return true
    }

    if (cellIndex < 0){
        return true
    }

    if (isNaN(cellIndex)){
        return true
    }

    return false
}