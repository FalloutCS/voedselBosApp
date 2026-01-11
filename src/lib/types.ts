export type Plant = {
  id: number;
  latinName: string;
  commonName: string;
  nlName: string;
  habit: Habit | undefined;
  wind: Wind | undefined;
};

export type Wind = "N" | "W" | "M" | "F";

export type Habit =
  | "Annual"
  | "Annual/Biennial"
  | "Annual Climber"
  | "Annual/Perennial"
  | "Bamboo"
  | "Biennial"
  | "Biennial/Perennial"
  | "Bulb"
  | "Climber"
  | "Corm"
  | "Fern"
  | "Grass"
  | "Lichen"
  | "Nothofagus Obliqua"
  | "Perennial"
  | "Perennial Climber"
  | "Shrub"
  | "Tree";
  
export type SimulatedPlantResultDto = {
  uid: number;
  health: number;
};

export type SimulationResultDto = {
  plants: SimulatedPlantResultDto[];
  warnings: string[];
};

export type PlantInfo = {
  uid: number;
  xPosition: number;
  yPosition: number;
  plantingDelay: number;
  plant?: Plant;
};

export type menuMode = "" | "plantMenu" | "actionMenu";

export type PlacedPlant = Record<number, PlantInfo>;