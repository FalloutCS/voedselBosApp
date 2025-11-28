<script lang="ts">
    import { enhance } from "$app/forms";
    import type { SubmitFunction } from "@sveltejs/kit";
    import type { Plant } from "$lib/types";

    type PlantMenuProps = {
        handlePlantSubmission: SubmitFunction;
        activeCellIndex: number | undefined;
        data: {
            plants: Plant[];
        };
    };

    let { handlePlantSubmission, activeCellIndex, data }: PlantMenuProps =
        $props();
</script>

<form
    class="bg-violet-200 w-full h-full rounded flex flex-wrap overflow-scroll p-5"
    method="POST"
    use:enhance={handlePlantSubmission}
>
    <input hidden name="cellIndex" value={activeCellIndex} />
    {#each data.plants as plant}
        <div class=" rounded-2xl w-1/3 h-1/3 border border-violet-400 p-5 mt-1">
            <h1 class="text-xl">{plant.commonName}</h1>
            <p class="text-sm">{plant.latinName}</p>
            <button
                type="submit"
                name="plantID"
                value={plant.id}
                formaction="?/addPlant"
                class="bg-violet-600 px-2 py-1 rounded-xl text-amber-50"
                >Plaats</button
            >
        </div>
    {/each}
</form>
