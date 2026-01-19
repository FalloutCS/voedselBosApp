import type { PlacedPlant } from "$lib/types";

export type TerrainType = "blocked" | "water";

export class Voedselbos {
  name: string;
  location: string;
  width: number;
  height: number;
  surfaceArea: number;
  placedPlants: PlacedPlant;
  terrain: Record<number, string>;

  constructor(name: string, width: number, height: number, location: string) {
    this.name = name;
    this.width = width;
    this.height = height;
    this.location = location;
    this.surfaceArea = width * height;
    this.placedPlants = {}
    this.terrain = {};  
  }
}