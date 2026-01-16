<script lang="ts">
  import { enhance } from "$app/forms";
  import { gethabitIcon } from "$lib/habitIcon";
  import type { PlacedPlant } from "$lib/types";

  type canvasProps = {
    placedPlants: PlacedPlant;
    surfaceArea: number;
    shapeArray: number[];
    width: number;
    height: number;
    editMode: "shovel" | "planter" | "view";
    openMenu: (cellIndex: number) => void;
    stressMap?: Record<number, number>;
    endScrollLeft: number;
    endScrollTop: number;
  };

  let {
    placedPlants,
    width,
    height,
    editMode,
    shapeArray,
    surfaceArea,
    openMenu,
    stressMap = {},
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

  function handleMouseDown(e: MouseEvent) {
    if (editMode !== "view" || !scrollContainer) return;

    isDown = true;
    startX = e.pageX - scrollContainer.offsetLeft;
    startY = e.pageY - scrollContainer.offsetTop;
    scrollLeft = scrollContainer.scrollLeft;
    scrollTop = scrollContainer.scrollTop;
  }

  function handleMouseUp(e: MouseEvent) {
    if (editMode !== "view" || !scrollContainer) return;
    isDown = false;
    endScrollLeft = scrollContainer.scrollLeft;
    endScrollTop = scrollContainer.scrollTop;
  }

  function handleMouseLeave(e: MouseEvent) {
    if (editMode !== "view" || !scrollContainer) return;
    isDown = false;
    endScrollLeft = scrollContainer.scrollLeft;
    endScrollTop = scrollContainer.scrollTop;
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

  function getStressStyle(index: number): string {
    const count = stressMap[index] || 0;
    if (count === 0) return "";
    const opacity = Math.min(count * 0.1, 0.8);
    return `box-shadow: inset 0 0 0 100px rgba(220, 38, 38, ${opacity});`;
  }

  import type { Action } from 'svelte/action';
	const scrollToLastPos: Action = (node) => {
		// the node has been mounted in the DOM

		$effect(() => {
			// setup goes here
      scrollContainer?.scroll(endScrollLeft, endScrollTop)

		});
	};
</script>


<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  bind:this={scrollContainer}
  use:scrollToLastPos
  onmousedown={handleMouseDown}
  onmouseleave={handleMouseLeave}
  onmouseup={handleMouseUp}
  onmousemove={handleMouseMove}
  class="w-full h-full overflow-hidden bg-violet-50 rounded select-none border border-violet-200 shadow-inner transition-colors
  {editMode === 'view'
    ? isDown
      ? 'cursor-grabbing'
      : 'cursor-grab'
    : 'cursor-default'}"
>
  <form
    class="grid bg-violet-100 p-10 w-max h-max transition-opacity duration-200
    {editMode === 'view' ? 'pointer-events-none opacity-90' : ''}"
    style="
      grid-template-columns: repeat({width}, {CELL_SIZE}px); 
      grid-template-rows: repeat({height}, {CELL_SIZE}px);
      gap: {GAP_SIZE}px;
    "
    method="POST"
    use:enhance
  >
    {#each { length: surfaceArea }, index}
      {@const isShovel = editMode === "shovel"}
      {@const isBlocked = shapeArray.includes(index)}
      {@const stressStyle = getStressStyle(index)}

      <button
        formaction="?/disableCell"
        name="cellIndex"
        value={index}
        type={isShovel ? "submit" : "button"}
        onclick={() => (isShovel ? undefined : openMenu(index))}
        class="
          relative border border-violet-300/50 rounded-md
          flex items-center justify-center transition-all duration-200
          {isBlocked
          ? 'bg-slate-100'
          : 'bg-white hover:border-violet-500 hover:shadow-md hover:z-10'}
        "
        style="{isBlocked ? 'background-color: #f1f5f9;' : ''} {stressStyle}"
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
</div>
