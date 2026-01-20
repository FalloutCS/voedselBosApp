<script lang="ts">
    import { slide } from "svelte/transition";
    import { filterState } from "$lib/filterState.svelte";
    import { activeFilters } from "$lib/filterConfig";

    let activeFilterCount = $derived(Object.keys(filterState.selected).length);
</script>

<div
    transition:slide={{ duration: 300, axis: "x" }}
    class="w-64 shrink-0 bg-violet-50/50 border-r border-violet-100 flex flex-col overflow-y-auto"
>
    <div class="p-4 space-y-4">
        <div class="flex justify-between items-baseline">
            <h3 class="font-bold text-violet-800 uppercase tracking-wide text-xs">
                Filters
            </h3>
            {#if activeFilterCount > 0}
                <button
                    type="button"
                    onclick={() => filterState.reset()}
                    class="text-xs text-violet-500 hover:text-violet-700 hover:underline"
                >
                    Wissen
                </button>
            {/if}
        </div>

        <div class="space-y-3">
            {#each activeFilters as filterDef (filterDef.key)}
                <div class="flex flex-col gap-1">
                    <label
                        for={filterDef.key}
                        class="text-xs font-semibold text-violet-700 ml-1"
                    >
                        {filterDef.label}
                    </label>
                    <select
                        id={filterDef.key}
                        value={filterState.get(filterDef.key)}
                        onchange={(e) =>
                            filterState.set(filterDef.key, e.currentTarget.value)}
                        class="bg-white border border-violet-200 text-violet-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2 hover:border-violet-400 transition-colors"
                    >
                        <option value="">Alles</option>
                        {#each filterDef.options as option}
                            <option value={option.value}>{option.label}</option>
                        {/each}
                    </select>
                </div>
            {/each}
        </div>
    </div>
</div>