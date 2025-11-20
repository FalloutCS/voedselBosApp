export class Voedselbos {
  name: string;
  canvas: voedselbos_Cel[];

  constructor(name: string) {
    this.name = name;
    this.canvas = [];
  }

  populateForest(size: number) {
    for (let index = 0; index < size; index++) {
      this.canvas.push({ isPopulated: false, plant: undefined });
    }
  }
}

export type Plant = {
  name: string;
  img: string;
};

export type voedselbos_Cel = {
  isPopulated: boolean;
  plant?: Plant;
};
