import type { Plant, Badge } from "$lib/types";
import { propertyConfig } from "$lib/constants";

export function getPlantBadges(plant: Plant): Badge[] {
    const badges: Badge[] = [];
    for (const prop of propertyConfig) {
        const rawVal = plant[prop.key];
        if (rawVal === undefined || rawVal === null || rawVal === "")
            continue;
        const valStr = String(rawVal);

        if (prop.valueMap && prop.separator) {
            const parts = valStr.split(prop.separator);
            let foundMatch = false;

            for (const part of parts) {
                const cleanPart = part.trim();
                if (cleanPart && prop.valueMap[cleanPart]) {
                    badges.push(prop.valueMap[cleanPart]);
                    foundMatch = true;
                }
            }
            if (foundMatch) continue;
        }

        if (prop.valueMap && prop.valueMap[valStr]) {
            badges.push(prop.valueMap[valStr]);
            continue;
        }

        if (prop.classes && prop.title) {
            badges.push({
                label: `${prop.prefix || ""} ${valStr}${prop.suffix || ""}`,
                classes: prop.classes,
                title: prop.title,
            });
        }
    }
    return badges;
}