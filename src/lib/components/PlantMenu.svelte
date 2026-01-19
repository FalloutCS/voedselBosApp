<script lang="ts">
    import { enhance } from "$app/forms";
    import type { SubmitFunction } from "@sveltejs/kit";
    import type { Plant } from "$lib/types";
    import { filterState } from "$lib/filterState.svelte";
    import { activeFilters } from "$lib/filterConfig";
    import FilterSidebar from "./FilterSidebar.svelte";
    import PlantCard from "./PlantCard.svelte";

    type PlantMenuProps = {
        handlePlantSubmission: SubmitFunction;
        activeCellIndex: number;
        closeMenu: () => void;
        data: {
            width: number;
            height: number;
            plants: Plant[];
        };
    };

    let {
        handlePlantSubmission,
        activeCellIndex,
        data,
        closeMenu,
    }: PlantMenuProps = $props();

    let showFilters = $state(true);
    let activeFilterCount = $derived(Object.keys(filterState.selected).length);

    let activeQuery = $derived(
        activeFilters
            .filter((f) => filterState.selected[f.key])
            .map((f) => ({
                matcher: f.matcher,
                value: filterState.selected[f.key],
            })),
    );

    let filteredPlants = $derived(
        data.plants.filter((plant) => {
            const query = (filterState.searchQuery || "").toLowerCase().trim();
            const matchesSearch =
                !query ||
                plant.nlName?.toLowerCase().includes(query) ||
                plant.latinName?.toLowerCase().includes(query);

            if (!matchesSearch) return false;

            if (activeQuery.length === 0) return true;
            return activeQuery.every(({ matcher, value }) =>
                matcher(plant, value),
            );
        }),
    );

    function calc_X_Position() {
        return activeCellIndex % data.width;
    }
    function calc_Y_Position() {
        return Math.floor(activeCellIndex / data.width);
    }
</script>

<form
    class="bg-white border border-violet-100 shadow-xl rounded-2xl w-full h-full flex flex-col relative overflow-hidden"
    method="POST"
    use:enhance={handlePlantSubmission}
>
    <input hidden name="cellIndex" value={activeCellIndex} />
    <input hidden name="xPosition" value={calc_X_Position()} />
    <input hidden name="yPosition" value={calc_Y_Position()} />
    <input hidden name="plantingDelay" value={0} />

    <div class="flex justify-between items-center p-6 border-b shrink-0">
        <h2 class="text-3xl font-extrabold text-violet-900">Plant Selectie</h2>
        <button
            type="button"
            onclick={closeMenu}
            class="p-2 -mr-2 text-violet-400 hover:text-violet-700 hover:bg-violet-50 rounded-full transition-colors"
            title="Sluiten"
            aria-label="Sluit menu"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                ><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg
            >
        </button>
    </div>

    <div class="flex grow min-h-0 overflow-hidden">
        {#if showFilters}
            <FilterSidebar />
        {/if}

        <div class="grow flex flex-col min-w-0 bg-white">
            <div class="flex flex-wrap items-center gap-3 p-4 pb-2">
                <button
                    type="button"
                    onclick={() => (showFilters = !showFilters)}
                    class="flex items-center gap-2 text-sm font-bold text-violet-700 hover:text-violet-900 bg-violet-50 hover:bg-violet-100 px-3 py-1.5 rounded-lg transition-colors"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
                    </svg>
                    <span>{showFilters ? "Verberg Filters" : "Filters"}</span>
                    {#if !showFilters && activeFilterCount > 0}
                        <span class="bg-violet-600 text-white text-xs px-2 py-0.5 rounded-full">
                            {activeFilterCount}
                        </span>
                    {/if}
                </button>

                <div class="relative grow max-w-md">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg class="h-4 w-4 text-violet-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Zoek op naam..."
                        bind:value={filterState.searchQuery}
                        class="bg-white border border-violet-200 text-violet-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full pl-9 p-1.5 hover:border-violet-400 transition-colors"
                    />
                    {#if filterState.searchQuery}
                        <button
                            type="button"
                            onclick={() => (filterState.searchQuery = "")}
                            class="absolute inset-y-0 right-0 pr-3 flex items-center text-violet-400 hover:text-violet-700"
                            aria-label="Zoekopdracht wissen"
                            title="Zoekopdracht wissen"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                            </svg>
                        </button>
                    {/if}
                </div>

                <div class="text-xs text-gray-400 ml-auto whitespace-nowrap">
                    {filteredPlants.length} resultaten
                </div>
            </div>

            <div
                class="grow overflow-y-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                style="content-visibility: auto;"
            >
                {#each filteredPlants as plant (plant.id)}
                    <PlantCard {plant} />
                {:else}
                    <div class="col-span-full flex flex-col items-center justify-center text-gray-400 py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                        <p class="text-lg font-medium text-gray-500">
                            Geen planten gevonden
                        </p>
                        <p class="text-sm text-gray-400 mb-4">
                            Probeer andere filter combinaties
                        </p>
                        <button
                            type="button"
                            onclick={() => {
                                filterState.reset();
                                showFilters = true;
                            }}
                            class="px-4 py-2 bg-violet-100 text-violet-700 rounded-lg hover:bg-violet-200 transition-colors font-medium text-sm"
                        >
                            Filters wissen
                        </button>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</form>