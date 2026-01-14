<script lang="ts">
    import { enhance } from "$app/forms";
    import { slide } from "svelte/transition";
    import type { SubmitFunction } from "@sveltejs/kit";
    import type { Plant } from "$lib/types";
    import { gethabitIcon } from "$lib/habitIcon";
    import { filterState } from '$lib/filterState.svelte';
    import { activeFilters } from '$lib/filterConfig';
    import { propertyConfig } from '$lib/constants';

    type PlantMenuProps = {
        handlePlantSubmission: SubmitFunction;
        activeCellIndex: number;
        closeMenu: () => void;
        data: {
            width: number;
            heigth: number;
            plants: Plant[];
        };
    };

    type Badge = {
        label: string;
        classes: string;
        title?: string;
    };

    let { handlePlantSubmission, activeCellIndex, data, closeMenu }: PlantMenuProps = $props();

    let showFilters = $state(false);
    let activeFilterCount = $derived(Object.keys(filterState.selected).length);

    function calc_X_Position() { 
        return activeCellIndex % data.width; 
    }
    
    function calc_Y_Position() { 
        return Math.floor(activeCellIndex / data.width); 
    }

    let filteredPlants = $derived(
        data.plants.filter(plant => {
            return activeFilters.every(filterDef => {
                const selectedValue = filterState.selected[filterDef.key];
                if (!selectedValue) return true;
                return filterDef.matcher(plant, selectedValue);
            });
        })
    );

    function getPlantBadges(plant: Plant): Badge[] {
        const badges: Badge[] = [];

        propertyConfig.forEach(prop => {
            const rawVal = plant[prop.key]; 
            const valStr = String(rawVal);

            if (prop.valueMap && prop.valueMap[valStr]) {
                badges.push(prop.valueMap[valStr]);
            } 
            else if (rawVal && prop.classes && prop.title) {
                badges.push({
                    label: `${prop.prefix || ''} ${rawVal}${prop.suffix || ''}`.trim(),
                    classes: prop.classes,
                    title: prop.title
                });
            }
        });

        return badges;
    }
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
        <h2 class="text-3xl font-extrabold text-violet-900">Plant Selectie</h2>
        <button 
            type="button" 
            onclick={closeMenu}
            class="p-2 -mr-2 -mt-2 text-violet-400 hover:text-violet-700 hover:bg-violet-50 rounded-full transition-colors"
            title="Sluiten"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
    </div>

    <div class="mb-4">
        <button 
            type="button"
            onclick={() => showFilters = !showFilters}
            class="flex items-center gap-2 text-sm font-bold text-violet-700 hover:text-violet-900 bg-violet-50 hover:bg-violet-100 px-4 py-2 rounded-lg transition-colors w-full sm:w-auto"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform duration-300 {showFilters ? 'rotate-180' : ''}"><path d="m6 9 6 6 6-6"/></svg>
            <span>Filters</span>
            {#if activeFilterCount > 0}
                <span class="bg-violet-600 text-white text-xs px-2 py-0.5 rounded-full ml-1">{activeFilterCount} actief</span>
            {/if}
        </button>
    </div>

    {#if showFilters}
        <div transition:slide={{ duration: 300, axis: 'y' }}>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4 p-4 bg-violet-50/80 rounded-xl border border-violet-100">
                {#each activeFilters as filterDef (filterDef.key)}
                    <div class="flex flex-col gap-1">
                        <label for={filterDef.key} class="text-xs font-bold text-violet-800 uppercase tracking-wide ml-1">{filterDef.label}</label>
                        <select 
                            id={filterDef.key}
                            value={filterState.get(filterDef.key)} 
                            onchange={(e) => filterState.set(filterDef.key, e.currentTarget.value)}
                            class="bg-white border border-violet-200 text-violet-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2 hover:border-violet-400 transition-colors"
                        >
                            <option value="">Alles</option>
                            {#each filterDef.options as option}
                                <option value={option.value}>{option.label}</option>
                            {/each}
                        </select>
                    </div>
                {/each}
                
                {#if activeFilterCount > 0}
                    <div class="col-span-full flex justify-end mt-2 pt-2 border-t border-violet-200/50">
                        <button type="button" onclick={() => filterState.reset()} class="text-xs text-violet-500 hover:text-violet-700 hover:underline"> Alle filters wissen </button>
                    </div>
                {/if}
            </div>
        </div>
    {/if}

    <div class="text-xs text-gray-400 mb-2 px-1">{filteredPlants.length} resultaten gevonden</div>

    <div class="grow overflow-y-auto pr-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each filteredPlants as plant (plant.id)}
            <div class="bg-violet-50/50 border border-violet-100 rounded-xl p-4 flex flex-col justify-between transition-all hover:shadow-lg hover:border-violet-300 hover:bg-white group">
                <div>
                    <h3 class="text-lg font-semibold text-violet-800 leading-tight group-hover:text-violet-900">{plant.nlName}</h3>
                    <p class="text-sm italic text-violet-500 mt-0.5 mb-2">{plant.latinName}</p>

                    <div class="flex flex-wrap gap-1.5 mb-3">
                        {#each getPlantBadges(plant) as badge}
                            <span class="tag {badge.classes}" title={badge.title}>
                                {badge.label}
                            </span>
                        {/each}
                    </div>
                </div>

                <img
                    src={gethabitIcon(plant.habit)}
                    alt={plant.habit}
                    title={plant.commonName}
                    class="w-full h-32 object-contain my-2 transition-transform group-hover:scale-105"
                />

                <button
                    type="submit"
                    name="plantID"
                    value={plant.id}
                    formaction="?/addPlant"
                    class="mt-3 w-full bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white font-medium py-2 rounded-lg transition-colors shadow-md flex justify-center items-center gap-2"
                >
                    <span>Plaats</span>
                    <span class="text-violet-200 text-sm font-normal">{plant.nlName}</span> 
                </button>
            </div>
        {:else}
            <div class="col-span-full flex flex-col items-center justify-center text-gray-400 py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <p class="text-lg font-medium text-gray-500">Geen planten gevonden</p>
                <p class="text-sm text-gray-400 mb-4">Probeer andere filter combinaties</p>
                <button 
                    type="button" 
                    onclick={() => { filterState.reset(); showFilters = true; }}
                    class="px-4 py-2 bg-violet-100 text-violet-700 rounded-lg hover:bg-violet-200 transition-colors font-medium text-sm"
                >
                    Filters wissen
                </button>
            </div>
        {/each}
    </div>
</form>

<style>
    .tag {
        font-size: 0.65rem;
        font-weight: 600;
        padding: 0.125rem 0.375rem;
        border-radius: 0.25rem;
        border-width: 1px;
        white-space: nowrap;
        cursor: default;
    }
</style>