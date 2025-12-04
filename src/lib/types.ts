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

export type Plant = {
  id: number;
  latinName: string;
  commonName: string;
  habit: "Annual" | "Annual/Biennial" | "Annual Climber" | "Annual/Perennial" | "Bamboo" | "Biennial" | "Biennial/Perennial" | "Bulb" | "Climber" | "Corm" | "Fern" | "Grass" | "Lichen" | "Nothofagus Obliqua" | "Perennial" | "Perennial Climber" | "Shrub" | "Tree" | undefined;
  wind: "N" | "W" | "M" | "F" | undefined;
};


export type voedselbos_Cel = {
  uid: number;
  xPosition: number;
  yPosition: number;
  plantingDelay: number;
  plant?: Plant;
};

export type sideBarState = "none" | "analyse" | "settings"

