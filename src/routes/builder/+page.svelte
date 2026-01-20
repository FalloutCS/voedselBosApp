<script lang="ts">
  import type { PageProps } from "./$types";
  import Canvas from "$lib/components/Canvas.svelte";
  import ErrorMissingData from "$lib/components/Error_MissingData.svelte";
  import { type SubmitFunction } from "@sveltejs/kit";
  import PlantMenu from "$lib/components/PlantMenu.svelte";
  import ActionMenu from "$lib/components/ActionMenu.svelte";
  import { enhance } from "$app/forms";
  import { Button } from "bits-ui";
  import LoadingComponent from "$lib/components/LoadingComponent.svelte";
  import type { menuMode } from "$lib/types";
  import Toolbar from "./components/Toolbar.svelte";
  import type { TerrainType } from "$lib/server/voedselBos";
  import { Compass } from "phosphor-svelte";

  let { data, form }: PageProps = $props();
  let menuState: menuMode = $state("");
  let activeCellIndex: number = $state(0);
  let loading = $state(false);
  let editMode: "shovel" | "planter" | "view" = $state("view");
  let shovelType: TerrainType = $state("blocked");
  let selectedPlantName = $derived(
    data.placedPlants[activeCellIndex]?.plant?.commonName || "Plant",
  );
  const loadingDuration = 2000;
  let endScrollTop = $state(0);
  let endScrollLeft = $state(0);
  // Waits for the browser to finish updating before closing the menu
  const handlePlantSubmission: SubmitFunction = () => {
    return async ({ update }) => {
      await update();
      menuState = "";
    };
  };

  function handleCellClick(cellIndex: number) {
    if (editMode === "planter") {
      activeCellIndex = cellIndex;
      data.placedPlants[cellIndex]
        ? (menuState = "actionMenu")
        : (menuState = "plantMenu");
    }
  }
</script>

<div class="h-4/5 w-4/5 mx-auto my-auto rounded relative flex flex-col">
  <div class="flex justify-between items-center pb-2">
    <Toolbar bind:editMode bind:shovelType />

    <div class="flex flex-col items-center justify-center text-violet-600 bg-white/50 p-1 rounded-full shadow-sm select-none">
        <Compass size={32} weight="duotone" />
        <span class="text-xs font-bold">N</span>
    </div>
    <form
      method="POST"
      use:enhance={() => {
        loading = true;
        const timer = new Promise((resolve) =>
          setTimeout(resolve, loadingDuration),
        );
        return async ({ update }) => {
          await Promise.all([update(), timer]);
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

  {#if form?.missing}
    <ErrorMissingData />
  {/if}

  {#if menuState === "plantMenu"}
    <PlantMenu
      {handlePlantSubmission}
      {activeCellIndex}
      {data}
      closeMenu={() => {
        menuState = "";
      }}
    />
  {:else if menuState === "actionMenu"}
    <ActionMenu
      plantName={selectedPlantName}
      cellIndex={activeCellIndex}
      onEdit={() => {
        menuState = "plantMenu";
      }}
      onClose={() => {
        menuState = "";
      }}
      handleSubmission={handlePlantSubmission}
    />
  {:else}
    <Canvas
      {editMode}
      {shovelType}
      surfaceArea={data.surfaceArea}
      terrain={data.terrain}
      placedPlants={data.placedPlants}
      width={data.width}
      height={data.height}
      openMenu={handleCellClick}
      bind:endScrollLeft
      bind:endScrollTop
    />
  {/if}
</div>