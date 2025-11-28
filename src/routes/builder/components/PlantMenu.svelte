<script lang="ts">
    import { enhance } from "$app/forms";
    import type { SubmitFunction } from "@sveltejs/kit";
    import type { Plant } from "$lib/types"; // [cite: 2]

    type PlantMenuProps = {
        handlePlantSubmission: SubmitFunction;
        activeCellIndex: number | undefined; // 
        data: {
            plants: Plant[];
        };
    }; // [cite: 4]

    let { handlePlantSubmission, activeCellIndex, data }: PlantMenuProps =
        $props(); // 
</script>

<form
    class="bg-white border border-violet-100 shadow-xl rounded-2xl p-6 w-full h-full flex flex-col"
    method="POST"
    use:enhance={handlePlantSubmission}
>
    <input hidden name="cellIndex" value={activeCellIndex} />
    
    <h2 class="text-3xl font-extrabold text-violet-900 mb-6 border-b pb-2">
        Plant Selection
    </h2>

    <div class="grow overflow-y-auto pr-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {#each data.plants as plant}
            <div class="bg-violet-50/50 border border-violet-100 rounded-xl p-4 flex flex-col justify-between transition-shadow hover:shadow-lg hover:border-violet-300">
                
                <div>
                    <h3 class="text-lg font-semibold text-violet-800 leading-tight">
                        {plant.commonName}
                    </h3>
                    <p class="text-sm italic text-violet-500 mt-0.5 mb-3">
                        {plant.latinName}
                    </p>
                </div>

                <img src="/placeholder.png" alt="Afbeelding niet beschikbaar">

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
        {/each}
        
    </div>
</form>