<script lang="ts">
  import type { PageProps } from "./$types";
  import BuilderMenu from "$lib/components/BuilderMenu.svelte";
  import Canvas from "$lib/components/Canvas.svelte";
  import ErrorInvalidInput from "$lib/components/Error_Invalid_Input.svelte";
  import ErrorMissingData from "$lib/components/Error_MissingData.svelte";
  import { type SubmitFunction } from "@sveltejs/kit";
  import PlantMenu from "$lib/components/PlantMenu.svelte";
  import { enhance } from "$app/forms";
  let { data, form }: PageProps = $props();

  let showMenu: boolean = $state(false);
  let activeCellIndex: number = $state(0);

  const handlePlantSubmission: SubmitFunction = () => {
    return async ({ update }) => {
      await update();
      showMenu = false;
    };
  };

  function openMenu(cellIndex: number) {
    activeCellIndex = cellIndex;
    showMenu = true;
  }
</script>

<form method="POST" use:enhance>
  <button type="submit" formaction="?/uploadSim"> Simuleer </button>
</form>

<div class="h-4/5 w-4/5 mx-auto my-auto bg-violet-50 rounded">
  <BuilderMenu />

  {#if form?.missing}
    <ErrorMissingData />
  {/if}
  <!-- Fix with validate Index in forestStore.ts -->
  <!-- {#if form?.incorrect}
    <ErrorInvalidInput />
  {/if} -->

  {#if showMenu}
    <PlantMenu {handlePlantSubmission} {activeCellIndex} {data} />
  {:else}
    <Canvas
      canvas={data.canvas}
      width={data.width}
      heigth={data.heigth}
      {openMenu}
    />
  {/if}
</div>
