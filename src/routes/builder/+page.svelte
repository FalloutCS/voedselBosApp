<script lang="ts">
  import type { PageProps } from "./$types";
  import Canvas from "$lib/components/Canvas.svelte";
  import ErrorInvalidInput from "$lib/components/Error_Invalid_Input.svelte";
  import ErrorMissingData from "$lib/components/Error_MissingData.svelte";
  import { type SubmitFunction } from "@sveltejs/kit";
  import PlantMenu from "$lib/components/PlantMenu.svelte";
  import ActionMenu from "$lib/components/ActionMenu.svelte";
  import { enhance } from "$app/forms";
  import { Button } from "bits-ui";
  import LoadingComponent from "$lib/components/LoadingComponent.svelte";

  let { data, form }: PageProps = $props();
  let showMenu: boolean = $state(false);       
  let showActionMenu: boolean = $state(false); 
  let activeCellIndex: number = $state(0);
  let selectedPlantName = $derived(data.placedPlants[activeCellIndex]?.plant?.commonName || "Plant");
  let loading = $state(false);

  const handlePlantSubmission: SubmitFunction = () => {
    return async ({ update }) => {
      await update();
      showMenu = false;
      showActionMenu = false; 
    };
  };

  const loadingDuration = 2000;

  function handleCellClick(cellIndex: number) {
    activeCellIndex = cellIndex;
    const cellHasPlant = !!data.placedPlants[cellIndex].plant;

    if (cellHasPlant) {
      showActionMenu = true; 
      showMenu = false;
    } else {
      showMenu = true; 
      showActionMenu = false;
    }
  }

  function switchToPlantMenu() {
    showActionMenu = false;
    showMenu = true;
  }

  function closeAllMenus() {
    showMenu = false;
    showActionMenu = false;
  }
</script>

<div class="absolute top-4 left-4 z-10">
  <form 
    method="POST" 
    use:enhance={() => {
      loading = true;

      const timer = new Promise(resolve => setTimeout(resolve, loadingDuration));

      return async ({ update }) => {
        await Promise.all([
          update(), 
          timer
        ]);
        
        loading = false;
      };
    }}
  >
    <Button.Root 
      type="submit" 
      formaction="?/uploadSim"
      disabled={loading}
      class="bg-violet-600 hover:bg-violet-700 disabled:bg-violet-400 disabled:cursor-not-allowed text-white font-bold py-2 px-6 rounded-lg shadow-md transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
    >
      {#if loading}
        <LoadingComponent size="20" color="#ffffff" unit="px" duration="1s" />
        <span>Simuleren...</span>
      {:else}
        Simuleer
      {/if}
    </Button.Root>
  </form>
</div>

<div class="h-4/5 w-4/5 mx-auto my-auto bg-violet-50 rounded relative">

  {#if form?.missing}
    <ErrorMissingData />
  {/if}

  {#if showMenu}
    <PlantMenu 
        {handlePlantSubmission} 
        {activeCellIndex} 
        {data} 
        closeMenu={closeAllMenus}
    />
  {:else}
    <Canvas
      placedPlants={data.placedPlants}
      width={data.width}
      heigth={data.heigth}
      openMenu={handleCellClick} 
    />

    {#if showActionMenu}
       <ActionMenu 
          plantName={selectedPlantName}
          cellIndex={activeCellIndex}
          onEdit={switchToPlantMenu}
          onClose={closeAllMenus}
          handleSubmission={handlePlantSubmission}
      />
    {/if}
  {/if}
</div>
