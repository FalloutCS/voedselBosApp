<script lang="ts">
    import type { Plant } from "$lib/types";
    import { gethabitIcon } from "$lib/habitIcon";
    import { getPlantBadges } from "$lib/plantBadge";

    let { plant }: { plant: Plant } = $props();
</script>

<div
    class="bg-violet-50/50 border border-violet-100 rounded-xl p-4 flex flex-col justify-between transition-all hover:shadow-lg hover:border-violet-300 hover:bg-white group"
>
    <div>
        <h3
            class="text-lg font-semibold text-violet-800 leading-tight group-hover:text-violet-900"
        >
            {plant.nlName}
        </h3>
        <p class="text-sm italic text-violet-500 mt-0.5 mb-2">
            {plant.latinName}
        </p>

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
        loading="lazy"
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