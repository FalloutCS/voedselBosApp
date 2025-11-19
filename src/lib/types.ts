    type cell = {
        isPopulated: Boolean;
        plant: plant | undefined;
    };
    type plant = {
        name: string;
        img: string;
        windResistance:
            | "No Wind"
            | "Medium Wind"
            | "Strong Wind"
            | "Storm Wind";
    };
    type voedselbos = cell[];