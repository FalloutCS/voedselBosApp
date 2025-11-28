<script lang="ts">
  import type { PageProps } from "./$types";
  import BuilderMenu from "./components/BuilderMenu.svelte";
  import Canvas from "./components/Canvas.svelte";
  import ErrorInvalidInput from "./components/Error_Invalid_Input.svelte";
  import ErrorMissingData from "./components/Error_MissingData.svelte";
  import { type SubmitFunction } from "@sveltejs/kit";
  import PlantMenu from "./components/PlantMenu.svelte";

  let { data, form }: PageProps = $props();
  let showMenu: boolean = $state(false);
  let activeCellIndex: number | undefined = $state();

  const handlePlantSubmission: SubmitFunction = () => {
    return async ({ update }) => {
      await update();
      showMenu = false;
    };
  };

  function openPlantMenu(index: number) {
    activeCellIndex = index;
    showMenu = true;
  }
</script>

<div class="h-4/5 w-4/5 mx-auto my-auto bg-violet-50 rounded">
  <BuilderMenu />

  {#if form?.missing}
    <ErrorMissingData />
  {/if}

  {#if form?.incorrect}
    <ErrorInvalidInput />
  {/if}

  {#if showMenu}
    <PlantMenu {handlePlantSubmission} {activeCellIndex} {data} />
  {:else}
    <Canvas {data} {openPlantMenu} />
  {/if}
</div>
