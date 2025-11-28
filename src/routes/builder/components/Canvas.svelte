<script lang="ts">
    import type { Plant, voedselbos_Cel } from "$lib/types";
    import { gethabitIcon } from "$lib/habitIcon";
    type CanvasProps = {
        data: {
            width: number;
            heigth: number;
            canvas: voedselbos_Cel[];
            plants: Plant[];
        };
        openPlantMenu: (index: number) => void;
    };
    let { data, openPlantMenu }: CanvasProps = $props();
</script>

<div
    class="p-5 grid rounded mx-auto my-auto h-full w-full bg-violet-100"
    style="grid-template-columns: repeat({data.width}, minmax(0, 1fr)); grid-template-rows: repeat({data.heigth}, minmax(0, 1fr));"
>
    {#each data.canvas as cell, index}
        <button
            type="button"
            onclick={() => openPlantMenu(index)}
            class="border border-violet-400 text-sm"
            disabled={cell.isPopulated}
        >
            {#if cell.isPopulated && cell.plant}
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
