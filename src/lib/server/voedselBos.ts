import type { voedselbos_Cel } from "$lib/types"; 

export class Voedselbos {
  name: string;
  width: number;
  height: number;
  plantSimulationDtos: voedselbos_Cel[];

  constructor(name: string, width: number, height: number) {
    this.name = name;
    this.width = width
    this.height = height
    this.plantSimulationDtos = [];
  }

  populateForest() {
    const totalSize = this.width * this.height

    for (let index = 0; index < totalSize; index++) {
      this.plantSimulationDtos.push({ 
        uid: 0,
        plantingDelay: 0,
        xPosition: 0,
        yPosition: 0,
        plant: undefined });
    }
  }
}