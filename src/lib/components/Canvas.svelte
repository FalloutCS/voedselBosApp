<script lang="ts">
    import { gethabitIcon } from "$lib/habitIcon";
    import type { plantInfo } from "$lib/types";

    type canvasProps = {
        placedPlants: plantInfo[];
        width: number;
        heigth: number;
        openMenu: (cellIndex: number) => void;
    };

    let { placedPlants, width, heigth, openMenu }: canvasProps = $props();
</script>

<div
    class="p-5 grid rounded mx-auto my-auto h-full w-full bg-violet-100"
    style="grid-template-columns: repeat({width}, minmax(0, 1fr)); grid-template-rows: repeat({heigth}, minmax(0, 1fr));"
>
    {#each placedPlants as cell, index}
        <button
            type="button"
            onclick={() => openMenu(index)}
            class="border border-violet-400 text-sm"
        >
            {#if cell.plant}
                <img
                    src={gethabitIcon(cell.plant.habit)}
                    alt={cell.plant.habit}
                    title={cell.plant.commonName}
                    class="w-full h-full object-contain"
                />
            {:else}
                <span class="text-violet-400 font-bold opacity-50">+</span>
            {/if}
        </button>
    {/each}
</div>
