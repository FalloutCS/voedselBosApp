<script lang="ts">
  import { browser } from "$app/environment";
  import { enhance } from "$app/forms";
  import { gethabitIcon } from "$lib/habitIcon";
  import type { TerrainType } from "$lib/server/voedselBos";
  import type { PlacedPlant } from "$lib/types";
  import { Stage, Layer, Rect } from "svelte-konva";

  type canvasProps = {
    placedPlants: PlacedPlant;
    surfaceArea: number;
    terrain: Record<number, string>;
    width: number;
    height: number;
    editMode: "shovel" | "planter" | "view";
    shovelType: TerrainType;
    openMenu: (cellIndex: number) => void;
    endScrollLeft: number;
    endScrollTop: number;
  };

  let {
    placedPlants,
    width,
    height,
    editMode,
    terrain,
    shovelType,
    surfaceArea,
    openMenu,
    endScrollLeft = $bindable(0),
    endScrollTop = $bindable(0),
  }: canvasProps = $props();

  // --- Constants ---
  const CELL_SIZE = 64; // px
  const GAP_SIZE = 0; // px

  // --- Drag Logic ---
  let scrollContainer: HTMLDivElement | undefined = $state();
  let isDown = $state(false);
  let startX = $state(0);
  let startY = $state(0);
  let scrollLeft = $state(0);
  let scrollTop = $state(0);

  // --- Minimap Logic ---
  let containerHeight = $state(0);
  let containerWidth = $state(0);
  let scaledContainerHeight = $derived(containerHeight * 0.2);
  let scaledContainerWidth = $derived(containerWidth * 0.2);
  const surfaceAreaSqrt = Math.floor(Math.sqrt(surfaceArea));
  let pixelScaledHeight = $derived(
    Math.floor(scaledContainerHeight / surfaceAreaSqrt)
  );
  let pixelScaledWidth = $derived(
    Math.floor(scaledContainerWidth / surfaceAreaSqrt)
  );

  function finishDrag() {
    if (editMode !== "view" || !scrollContainer) return;
    isDown = false;
    endScrollLeft = scrollContainer.scrollLeft;
    endScrollTop = scrollContainer.scrollTop;
  }

  function handleMouseDown(e: MouseEvent) {
    if (editMode !== "view" || !scrollContainer) return;

    isDown = true;
    startX = e.pageX - scrollContainer.offsetLeft;
    startY = e.pageY - scrollContainer.offsetTop;
    scrollLeft = scrollContainer.scrollLeft;
    scrollTop = scrollContainer.scrollTop;
  }

  function handleMouseMove(e: MouseEvent) {
    if (!isDown || !scrollContainer || editMode !== "view") return;

    e.preventDefault();
    const x = e.pageX - scrollContainer.offsetLeft;
    const y = e.pageY - scrollContainer.offsetTop;
    const walkX = (x - startX) * 1.5;
    const walkY = (y - startY) * 1.5;

    scrollContainer.scrollLeft = scrollLeft - walkX;
    scrollContainer.scrollTop = scrollTop - walkY;
  }

  import type { Action } from "svelte/action";
  const scrollToLastPos: Action = (node) => {
    // the node has been mounted in the DOM

    $effect(() => {
      // setup goes here
      node.scroll(endScrollLeft, endScrollTop);
    });
  };

  function getTerrainStyle(type?: TerrainType) {
    if (type === "blocked") return "bg-gray-500 border-slate-300";
    if (type === "water") return "bg-blue-200 border-blue-300";
    return "bg-white hover:border-violet-500";
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  bind:this={scrollContainer}
  bind:clientHeight={containerHeight}
  bind:clientWidth={containerWidth}
  use:scrollToLastPos
  onmousedown={handleMouseDown}
  onmouseleave={finishDrag}
  onmouseup={finishDrag}
  onmousemove={handleMouseMove}
  class="w-full h-full overflow-hidden bg-violet-50 rounded select-none border border-violet-200 shadow-inner transition-colors
  {editMode === 'view'
    ? isDown
      ? 'cursor-grabbing'
      : 'cursor-grab'
    : 'cursor-default'}"
>
  <form
    class="grid bg-violet-100 m-10 w-max h-max transition-opacity duration-200
    {editMode === 'view' ? 'pointer-events-none opacity-90' : ''}"
    style="
      grid-template-columns: repeat({width}, {CELL_SIZE}px); 
      grid-template-rows: repeat({height}, {CELL_SIZE}px);
      gap: {GAP_SIZE}px;
    "
    method="POST"
    use:enhance
  >
    <input type="hidden" name="terraformType" value={shovelType} />

    {#each { length: surfaceArea }, index}
      {@const isShovel = editMode === "shovel"}
      {@const currentTerrain = terrain[index] as TerrainType}
      {@const isBlocked = !!currentTerrain}

      <button
        formaction="?/terraform"
        name="cellIndex"
        value={index}
        type={isShovel ? "submit" : "button"}
        onclick={() => (isShovel ? undefined : openMenu(index))}
        class="
          relative border border-violet-300/50 rounded-md
          flex items-center justify-center transition-all duration-200
          {getTerrainStyle(currentTerrain)}
        "
        disabled={isBlocked && !isShovel}
      >
        {#if placedPlants[index]}
          <img
            src={gethabitIcon(placedPlants[index].plant?.habit)}
            alt={placedPlants[index].plant?.habit}
            class="w-4/5 h-4/5 object-contain"
          />
        {:else if !isBlocked}
          <span class="text-violet-200 font-bold text-xl select-none">+</span>
        {/if}
      </button>
    {/each}
  </form>

  {#if browser}
    <div class="w-1/5 h-1/5 bg-violet-50 rounded select-none border border-violet-200 shadow-inner absolute top-4/5 left-4/5">
      <Stage width={scaledContainerWidth} height={scaledContainerHeight}>
        <Layer>
          {#each Object.entries(terrain) as [index, type]}
            {@const indexNum = Number(index)}
            {console.log(index, type)}
            {#if type === "blocked"}
              <Rect
                x={(indexNum % width) * pixelScaledWidth}
                y={Math.floor(indexNum / width) * pixelScaledHeight}
                width={pixelScaledWidth}
                height={pixelScaledHeight}
                fill="gray"
              />
            {:else if type === "water"}
              <Rect
                x={(indexNum % width) * pixelScaledWidth}
                y={Math.floor(indexNum / width) * pixelScaledHeight}
                width={pixelScaledWidth}
                height={pixelScaledHeight}
                fill="blue"
              />
            {/if}
          {/each}
          {#each Object.entries(placedPlants) as [index, plant]}
            {@const indexNum = Number(index)}
            <Rect
              x={(indexNum % width) * pixelScaledWidth}
              y={Math.floor(indexNum / width) * pixelScaledHeight}
              width={pixelScaledWidth}
              height={pixelScaledHeight}
              fill="green"
            />
          {/each}
        </Layer>
      </Stage>
    </div>
  {/if}
</div>
