<script lang="ts">
    import { enhance } from "$app/forms";
    import type { SubmitFunction } from "@sveltejs/kit";
    import type { Plant } from "$lib/types";
    import { gethabitIcon } from "$lib/habitIcon";
    import { filterState } from '$lib/filterState.svelte';

    type PlantMenuProps = {
        handlePlantSubmission: SubmitFunction;
        activeCellIndex: number;
        closeMenu: () => void; // Nieuwe prop
        data: {
            width: number;
            heigth: number
            plants: Plant[];
        };
    };
    
    // closeMenu toegevoegd aan de props destructuring
    let { handlePlantSubmission, activeCellIndex, data, closeMenu }: PlantMenuProps = $props();

    function calc_X_Position() {
        return activeCellIndex % data.width;
    }

    function calc_Y_Position() {
        return Math.floor(activeCellIndex / data.width);
    }

    function getBtnClass(layerName: string | null) {
        const baseClass = "rounded-2xl transition-all px-4 py-1 border border-violet-200 text-sm font-medium";
        if (filterState.selectedLayer === layerName) {
            return `${baseClass} bg-violet-600 text-white shadow-md border-violet-600`;
        }
        return `${baseClass} bg-white hover:bg-violet-100 text-violet-900`;
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

    $inspect(data.plants)
</script>

<form
    class="bg-white border border-violet-100 shadow-xl rounded-2xl p-6 w-full h-full flex flex-col relative"
    method="POST"
    use:enhance={handlePlantSubmission}
>
    <input hidden name="cellIndex" value={activeCellIndex} />
    <input hidden name="xPosition" value={calc_X_Position()} />
    <input hidden name="yPosition" value={calc_Y_Position()} />
    <input hidden name="plantingDelay" value={0} />

    <div class="flex justify-between items-start mb-2 border-b pb-2">
        <h2 class="text-3xl font-extrabold text-violet-900">
            Plant Selectie
        </h2>
        
        <button 
            type="button" 
            onclick={closeMenu}
            class="p-2 -mr-2 -mt-2 text-violet-400 hover:text-violet-700 hover:bg-violet-50 rounded-full transition-colors"
            title="Sluiten"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
            </svg>
        </button>
    </div>

    <div class="flex flex-wrap items-center px-1 w-full gap-2 mb-4">
        <button type="button" onclick={() => filterState.setLayer(null)} class={getBtnClass(null)}>Alle lagen</button>
        <button type="button" onclick={() => filterState.setLayer("Boom")} class={getBtnClass("Boom")}>Boom laag</button>
        <button type="button" onclick={() => filterState.setLayer("Struik")} class={getBtnClass("Struik")}>Struik laag</button>
        <button type="button" onclick={() => filterState.setLayer("Kruid")} class={getBtnClass("Kruid")}>Kruid laag</button>
        <button type="button" onclick={() => filterState.setLayer("Grond")} class={getBtnClass("Grond")}>Grond laag</button>
    </div>

    <div class="grow overflow-y-auto pr-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each filteredPlants as plant (plant.id)}
            <div class="bg-violet-50/50 border border-violet-100 rounded-xl p-4 flex flex-col justify-between transition-shadow hover:shadow-lg hover:border-violet-300">
                <div>
                    <h3 class="text-lg font-semibold text-violet-800 leading-tight">{plant.nlName}</h3>
                    <p class="text-sm italic text-violet-500 mt-0.5 mb-3">{plant.latinName}</p>
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