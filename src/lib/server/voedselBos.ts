import type { plantInfo } from "$lib/types";

export class Voedselbos {
  name: string;
  location: string;
  width: number;
  height: number;
  surfaceArea: number;
  placedPlants: plantInfo[];

  constructor(name: string, width: number, height: number, location: string) {
    this.name = name;
    this.width = width;
    this.height = height;
    this.location = location;
    this.surfaceArea = width * height;
    this.placedPlants = [];
  }

  populateForest() {
    const totalSize = this.width * this.height

    for (let index = 0; index < totalSize; index++) {
      this.placedPlants.push({
        uid: 0,
        plantingDelay: 0,
        xPosition: 0,
        yPosition: 0,
        plant: undefined
      });
    }
  }
}