<script lang="ts">
  import type { PageProps } from "./$types";
  import Canvas from "$lib/components/Canvas.svelte";
  import ErrorInvalidInput from "$lib/components/Error_Invalid_Input.svelte";
  import ErrorMissingData from "$lib/components/Error_MissingData.svelte";
  import { type SubmitFunction } from "@sveltejs/kit";
  import PlantMenu from "$lib/components/PlantMenu.svelte";
  import ActionMenu from "$lib/components/ActionMenu.svelte"; // Nieuwe import
  import { enhance } from "$app/forms";
  import { Toolbar } from "bits-ui";
  import { Plant, Shovel } from "phosphor-svelte";

  let { data, form }: PageProps = $props();
  let showMenu: boolean = $state(false);
  let showActionMenu: boolean = $state(false);
  let activeCellIndex: number = $state(0);
  let editMode = $state("shovel");

  // Helper om de naam van de plant op te halen
  let selectedPlantName = $derived(
    data.placedPlants[activeCellIndex]?.plant?.commonName || "Plant",
  );

  const handlePlantSubmission: SubmitFunction = () => {
    return async ({ update }) => {
      await update();
      showMenu = false;
      showActionMenu = false;
    };
  };

  function handleCellClick(cellIndex: number) {
    if (editMode === "shovel") {
      console.log(`Adding ${cellIndex} to forbidden array`);
    }
    if (editMode === "planter") {
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

<div class="h-4/5 w-4/5 mx-auto my-auto rounded relative flex flex-col">
  <div class="flex justify-between items-center pb-2">
    <Toolbar.Root
      class="rounded-4xl border-violet-500 border-2 bg-violet-100 shadow-mini flex items-center justify-center px-1 py-1"
    >
      <Toolbar.Group
        bind:value={editMode}
        type="single"
        class="flex items-center gap-x-0.5"
      >
        <Toolbar.GroupItem
          aria-label="toggle shovel"
          value="shovel"
          class="rounded-2xl hover:bg-violet-400 active:bg-violet-300 data-[state=on]:bg-violet-600 data-[state=on]:text-white inline-flex size-9 items-center justify-center transition-all active:scale-[0.98]"
        >
          <Shovel class="size-6" />
        </Toolbar.GroupItem>
        <Toolbar.GroupItem
          aria-label="toggle planter"
          value="planter"
          class="rounded-2xl hover:bg-violet-400 active:bg-violet-300 data-[state=on]:bg-violet-600 data-[state=on]:text-white inline-flex size-9 items-center justify-center transition-all active:scale-[0.98]"
        >
          <Plant class="size-6" />
        </Toolbar.GroupItem>
      </Toolbar.Group>
    </Toolbar.Root>

    <form method="POST" use:enhance>
      <button type="submit" formaction="?/uploadSim"> Simuleer </button>
    </form>
  </div>

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
