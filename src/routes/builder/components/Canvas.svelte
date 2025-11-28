<script lang="ts">
    import type { Plant, voedselbos_Cel } from "$lib/types";
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
            {#if cell.isPopulated}
                {cell.plant?.commonName}
            {:else}
                +
            {/if}
        </button>
    {/each}
</div>
