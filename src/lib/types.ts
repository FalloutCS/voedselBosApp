export class Voedselbos {
  name: string;
  width: number;
  height: number;
  canvas: voedselbos_Cel[];

  constructor(name: string, width: number, height: number) {
    this.name = name;
    this.width = width
    this.height = height
    this.canvas = [];
  }

  populateForest() {
    const totalSize = this.width * this.height

    for (let index = 0; index < totalSize; index++) {
      this.canvas.push({ isPopulated: false, plant: undefined });
    }
  }

  getCellIndex(pos_X: number, pos_Y: number){
    if (pos_X < 0 || pos_X >= this.width || pos_Y < 0 || pos_Y >= this.height) {
      throw new Error("Coordinates are out of bounds")
    }
    return (pos_Y * this.width) - (this.width - pos_X)
  }
}

export type Plant = {
  id: number;
  latinName: string;
  commonName: string;
  habit: "Annual" | "Annual/Biennial" | "Annual Climber" | "Annual/Perennial" | "Bamboo" | "Biennial" | "Bulb" | "Climber" | "Corm" | "Fern" | "Lichen" | "Perennial" | "Perennial Climber" | "Shrub" | "Tree" | undefined;
  wind: "N" | "W" | "M" | "F" | undefined;
};


export type voedselbos_Cel = {
  isPopulated: boolean;
  plant?: Plant;
};

