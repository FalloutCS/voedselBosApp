<script lang="ts">
  import { Stage, Layer, Rect, Circle } from "svelte-konva";
  let {
    width,
    height,
    terrain,
    placedPlants,
    endScrollLeft,
    endScrollTop,
    percentageViewportW,
    percentageViewportH,
  } = $props();

  const MINIMAP_SIZE = 208; // px

  let scaledPixel = $derived.by(() => {
    const scaledW = MINIMAP_SIZE / width;
    const scaledH = MINIMAP_SIZE / height;
    return Math.min(scaledH, scaledW);
  });

  let overlayW = $derived(MINIMAP_SIZE * percentageViewportW); // 5px safety margin
  let overlayH = $derived(MINIMAP_SIZE * percentageViewportH); // 7px safety margin
  let overlayPosTop = $derived((endScrollTop / 64) * scaledPixel);
  let overlayPosLeft = $derived((endScrollLeft / 64) * scaledPixel);
</script>

<div
  class="bg-violet-50 rounded select-none border border-violet-200 shadow-inner absolute bottom-4 right-4 w-52 h-52"
>
  <div class="relative">
    <div
      class="absolute border-2 border-slate-500 z-50 rounded shadow-inner"
      style="
        width: {overlayW}px; 
        height: {overlayH}px;
        top: {overlayPosTop}px;
        left: {overlayPosLeft}px;
        "
    ></div>
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
</div>
