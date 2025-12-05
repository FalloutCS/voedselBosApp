<script lang="ts">
    import { enhance } from "$app/forms";
    import type { SubmitFunction } from "@sveltejs/kit";
    import type { Plant } from "$lib/types";
    import { gethabitIcon } from "$lib/habitIcon";
    import { filterState } from '$lib/filterState.svelte';

    type PlantMenuProps = {
        handlePlantSubmission: SubmitFunction;
        activeCellIndex: number;
        data: {
            width: number;
            heigth: number
            plants: Plant[];
        };
    };

    let { handlePlantSubmission, activeCellIndex, data }: PlantMenuProps = $props();

    function calc_X_Position() {
        return activeCellIndex % data.width;
    }

    function calc_Y_Position() {
        return Math.floor(activeCellIndex / data.width);
    }

    const layerMapping: Record<string, string[]> = {
        "Boom": ["Tree", "Nothofagus Obliqua"],
        "Struik": ["Shrub", "Bamboo", "Climber", "Perennial Climber"],
        "Kruid": [
            "Annual", "Annual/Biennial", "Annual Climber", "Annual/Perennial", 
            "Biennial", "Biennial/Perennial", "Fern", "Grass", 
            "Perennial"
        ],
        "Grond": ["Bulb", "Corm", "Lichen"]
    };

    let filteredPlants = $derived(
        !filterState.selectedLayer 
            ? data.plants 
            : data.plants.filter(plant => 
                plant.habit && layerMapping[filterState.selectedLayer!]?.includes(plant.habit)
              )
    );
</script>



<form
    class="bg-white border border-violet-100 shadow-xl rounded-2xl p-6 w-full h-full flex flex-col"
    method="POST"
    use:enhance={handlePlantSubmission}
>
    <input hidden name="cellIndex" value={activeCellIndex} />
    <input hidden name="xPosition" value={calc_X_Position()} />
    <input hidden name="yPosition" value={calc_Y_Position()} />
    <input hidden name="plantingDelay" value={0} />

    <div class="flex justify-between items-end mb-6 border-b pb-2">
        <h2 class="text-3xl font-extrabold text-violet-900">
            Plant Selectie
        </h2>
        {#if filterState.selectedLayer}
            <span class="text-sm font-medium text-violet-600 bg-violet-100 px-3 py-1 rounded-full">
                Filter: {filterState.selectedLayer}
            </span>
        {/if}
    </div>

    <div class="grow overflow-y-auto pr-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {#each filteredPlants as plant (plant.id)}
            <div
                class="bg-violet-50/50 border border-violet-100 rounded-xl p-4 flex flex-col justify-between transition-shadow hover:shadow-lg hover:border-violet-300"
            >
                <div>
                    <h3 class="text-lg font-semibold text-violet-800 leading-tight">
                        {plant.commonName}
                    </h3>
                    <p class="text-sm italic text-violet-500 mt-0.5 mb-3">
                        {plant.latinName}
                    </p>
                </div>

                <img
                    src={gethabitIcon(plant.habit)}
                    alt={plant.habit}
                    title={plant.commonName}
                    class="w-full h-32 object-contain my-2"
                />

                <button
                    type="submit"
                    name="plantID"
                    value={plant.id}
                    formaction="?/addPlant"
                    class="mt-3 w-full bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white font-medium py-2 rounded-lg transition-colors shadow-md"
                >
                    Plaats (ID: {plant.id})
                </button>
            </div>
        {:else}
            <div class="col-span-full flex flex-col items-center justify-center text-gray-400 py-10">
                <p>Geen planten gevonden in de categorie <strong>{filterState.selectedLayer}</strong>.</p>
                <button 
                    type="button" 
                    onclick={() => filterState.setLayer(null)}
                    class="mt-2 text-violet-600 hover:underline"
                >
                    Toon alle lagen
                </button>
            </div>
        {/each}
    </div>
</form>
