export type Plant = {
  id: number;
  latinName: string;
  commonName: string;
  habit: "Annual" | "Annual/Biennial" | "Annual Climber" | "Annual/Perennial" | "Bamboo" | "Biennial" | "Biennial/Perennial" | "Bulb" | "Climber" | "Corm" | "Fern" | "Grass" | "Lichen" | "Nothofagus Obliqua" | "Perennial" | "Perennial Climber" | "Shrub" | "Tree" | undefined;
  wind: "N" | "W" | "M" | "F" | undefined;
};

export type SimulatedPlantResultDto = {
  uid: number;
  health: number;
};

export type SimulationResultDto = {
  plants: SimulatedPlantResultDto[];
  warnings: string[];
};

export type placedPlant = {
  [uid: number]: plantInfo
};

export type plantInfo = {
  uid: number;
  xPosition: number;
  yPosition: number;
  plantingDelay: number;
  plant?: Plant;
};

export type sideBarState = "none" | "analyse" | "settings"

export type menuMode = "" | "plantMenu" | "actionMenu"
