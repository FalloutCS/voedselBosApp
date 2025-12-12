<script lang="ts">
  import type { PageProps } from "./$types";
  import Canvas from "$lib/components/Canvas.svelte";
  import ErrorInvalidInput from "$lib/components/Error_Invalid_Input.svelte";
  import ErrorMissingData from "$lib/components/Error_MissingData.svelte";
  import { type SubmitFunction } from "@sveltejs/kit";
  import PlantMenu from "$lib/components/PlantMenu.svelte";
  import ActionMenu from "$lib/components/ActionMenu.svelte"; // Nieuwe import
  import { enhance } from "$app/forms";

  let { data, form }: PageProps = $props();
  let showMenu: boolean = $state(false);       
  let showActionMenu: boolean = $state(false); 
  let activeCellIndex: number = $state(0);

  // Helper om de naam van de plant op te halen
  let selectedPlantName = $derived(data.canvas[activeCellIndex]?.plant?.commonName || "Plant");

  const handlePlantSubmission: SubmitFunction = () => {
    return async ({ update }) => {
      await update();
      showMenu = false;
      showActionMenu = false; 
    };
  };

  function handleCellClick(cellIndex: number) {
    activeCellIndex = cellIndex;
    const cellHasPlant = !!data.canvas[cellIndex].plant;

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

<form method="POST" use:enhance>
  <button type="submit" formaction="?/uploadSim"> Simuleer </button>
</form>

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
      canvas={data.canvas}
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