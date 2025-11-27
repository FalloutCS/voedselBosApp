<script lang="ts">
  import { enhance } from "$app/forms";
  import type { PageProps } from "./$types";
  import BuilderMenu from "./components/BuilderMenu.svelte";
  import ErrorInvalidInput from "./components/Error_Invalid_Input.svelte";
  import ErrorMissingData from "./components/Error_MissingData.svelte";
  let { data, form }: PageProps = $props();
</script>

<div class="h-4/5 w-4/5 mx-auto my-auto bg-violet-50 rounded">
  <BuilderMenu />

  {#if form?.missing}
    <ErrorMissingData />
  {/if}

  {#if form?.incorrect}
    <ErrorInvalidInput />
  {/if}

  <form
    class="p-5 grid rounded mx-auto my-auto h-full w-full bg-violet-100"
    style="grid-template-columns: repeat({data.width}, minmax(0, 1fr)); grid-template-rows: repeat({data.heigth}, minmax(0, 1fr));"
    method="POST"
    use:enhance
  >
    {#each data.canvas as cell, index}
      <button
        type="submit"
        name="cellIndex"
        value={index}
        formaction="?/addPlant"
        class="border border-violet-400 text-sm"
        disabled={cell.isPopulated}
      >
        {#if cell.isPopulated}
          {cell.plant?.commonName}
        {:else}
          +
        {/if}
      </button>
    {/each}
  </form>
</div>
