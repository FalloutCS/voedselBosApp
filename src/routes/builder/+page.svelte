<script lang="ts">
    import type { PageProps } from "./$types";
    import Are from "./components/Are.svelte";
    let { data }: PageProps = $props();

    let mijnVoedselbos: voedselbos = $state([])

    let cells = 100

    for (let index = 0; index < cells; index++) {
        mijnVoedselbos.push({isPopulated: false, plant: undefined})
    }


    $inspect(mijnVoedselbos)

</script>



<div class="bg-violet-50 h-[500px] w-[500px] grid grid-cols-5 grid-rows-5">
    <!-- svelte props in typescript? -->
    {#each mijnVoedselbos as grid}
        <Are  />
    {/each}
</div>
