<script lang="ts">
  import { gethabitIcon } from "$lib/habitIcon";
  import type { PlacedPlant } from "$lib/types";

  type ResultsCanvasProps = {
    placedPlants: PlacedPlant;
    surfaceArea: number;
    shapeArray: number[];
    width: number;
    height: number;
    stressMap?: Record<number, number>; // Specific to Results
    onCellClick: (cellIndex: number) => void; // Simplified callback
  };

  let {
    placedPlants,
    width,
    height,
    shapeArray,
    surfaceArea,
    onCellClick,
    stressMap = {},
  }: ResultsCanvasProps = $props();

  // --- Constants ---
  const CELL_SIZE = 64;
  const GAP_SIZE = 0;

  // --- Drag Logic (Always Active) ---
  let scrollContainer: HTMLDivElement | undefined = $state();
  let isDown = $state(false);
  let startX = $state(0);
  let startY = $state(0);
  let scrollLeft = $state(0);
  let scrollTop = $state(0);

  function handleMouseDown(e: MouseEvent) {
    if (!scrollContainer) return;
    isDown = true;
    startX = e.pageX - scrollContainer.offsetLeft;
    startY = e.pageY - scrollContainer.offsetTop;
    scrollLeft = scrollContainer.scrollLeft;
    scrollTop = scrollContainer.scrollTop;
  }

  function handleMouseUp() {
    isDown = false;
  }

  function handleMouseLeave() {
    isDown = false;
  }

  function handleMouseMove(e: MouseEvent) {
    if (!isDown || !scrollContainer) return;
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
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  bind:this={scrollContainer}
  onmousedown={handleMouseDown}
  onmouseleave={handleMouseLeave}
  onmouseup={handleMouseUp}
  onmousemove={handleMouseMove}
  class="w-full h-full overflow-hidden bg-violet-50 rounded select-none border border-violet-200 shadow-inner transition-colors
  {isDown ? 'cursor-grabbing' : 'cursor-grab'}
  "
>
  <div
    class="grid bg-violet-100 p-10 w-max h-max"
    style="
      grid-template-columns: repeat({width}, {CELL_SIZE}px); 
      grid-template-rows: repeat({height}, {CELL_SIZE}px);
      gap: {GAP_SIZE}px;
    "
  >
    {#each { length: surfaceArea }, index}
      {@const isBlocked = shapeArray.includes(index)}
      {@const stressStyle = getStressStyle(index)}

      <button
        type="button"
        onclick={() => onCellClick(index)}
        class="{!placedPlants[index]
          ? isDown
            ? 'cursor-grabbing'
            : 'cursor-grab'
          : 'cursor-help'}
          relative border border-violet-300/50 rounded-md
          flex items-center justify-center transition-all duration-200
          {isBlocked
          ? 'bg-slate-100'
          : 'bg-white hover:border-violet-500 hover:shadow-md hover:z-10'}
        "
        style="{isBlocked ? 'background-color: #f1f5f9;' : ''} {stressStyle}"
        disabled={isBlocked}
      >
        {#if placedPlants[index]}
          <img
            src={gethabitIcon(placedPlants[index].plant?.habit)}
            alt={placedPlants[index].plant?.habit}
            class="w-4/5 h-4/5 object-contain pointer-events-none"
          />
        {/if}
        <span class="absolute top-0 left-1 text-[8px] text-violet-300"
          >{index}</span
        >
      </button>
    {/each}
  </div>
</div>
