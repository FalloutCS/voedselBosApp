export type Plant = {
  id: number;
  latinName: string;
  commonName: string;
  nlName: string;
  habit: Habit | undefined;
  wind?: string;
  deciduousEvergreen?: string;
  soil?: string;
  shade?: string;
  moisture?: string;
  pH?: string;
  nitrogenFixer?: string;
  sandGround?: string;
  clayGround?: string;
  wellDrained?: string;
  height?: number;
  width?: number;
  ukHardiness?: string;
  nitrogenNeed?: number;
};

export type PlantBadgeConfig = {
    key: keyof Plant;
    prefix?: string;
    suffix?: string;
    classes?: string;
    title?: string;
    separator?: string
    valueMap?: Record<string, { label: string, classes: string, title: string }>;
};

export type FilterConfig = {
    key: string;
    label: string;
    options: { value: string, label: string }[];
    matcher: (plant: Plant, selectedValue: string) => boolean;
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

export type Badge = {
        label: string;
        classes: string;
        title?: string;
    };

export type menuMode = "" | "plantMenu" | "actionMenu";

export type PlacedPlant = Record<number, PlantInfo>;

