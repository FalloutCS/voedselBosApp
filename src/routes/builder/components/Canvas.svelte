<script lang="ts">
  import { browser } from "$app/environment";
  import { enhance } from "$app/forms";
  import { gethabitIcon } from "$lib/habitIcon";
  import type { TerrainType } from "$lib/server/voedselBos";
  import type { canvasProps } from "$lib/types";
  import { Stage, Layer, Rect, Circle } from "svelte-konva";
  import type { Action } from "svelte/action";

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
  const MINIMAP_SIZE = 208; // px

  // --- Drag Logic ---
  let scrollContainer: HTMLDivElement | undefined = $state();
  let isDown = $state(false);
  let startX = $state(0);
  let startY = $state(0);
  let scrollLeft = $state(0);
  let scrollTop = $state(0);

  // --- Minimap Logic ---
  let viewportW = $state(0);
  let viewportH = $state(0);
  let scaledPixel = $derived.by(() => {
    const scaledW = MINIMAP_SIZE / width;
    const scaledH = MINIMAP_SIZE / height;
    return Math.min(scaledH, scaledW);
  });

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
  bind:clientHeight={viewportH}
  bind:clientWidth={viewportW}
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
    <div
      class="bg-violet-50 rounded select-none border border-violet-200 shadow-inner absolute bottom-4 right-4 w-52 h-52"
    >
      <Stage width={scaledPixel * width} height={scaledPixel * height}>
        <Layer>
          {#each Object.entries(terrain) as [index, type]}
            {@const indexNum = Number(index)}
            {#if type === "blocked"}
              <Rect
                x={(indexNum % width) * scaledPixel}
                y={Math.floor(indexNum / width) * scaledPixel}
                width={scaledPixel}
                height={scaledPixel}
                fill="#62748e"
              />
            {:else if type === "water"}
              <Rect
                x={(indexNum % width) * scaledPixel}
                y={Math.floor(indexNum / width) * scaledPixel}
                width={scaledPixel}
                height={scaledPixel}
                fill="#a2f4fd"
              />
            {/if}
          {/each}
          {#each Object.entries(placedPlants) as [index, plant]}
            {@const indexNum = Number(index)}
            <Circle
              x={(indexNum % width) * scaledPixel}
              y={Math.floor(indexNum / width) * scaledPixel}
              width={scaledPixel}
              height={scaledPixel}
              fill="#05df72"
            />
          {/each}
        </Layer>
      </Stage>
    </div>
  {/if}
</div>
