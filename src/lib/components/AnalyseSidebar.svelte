<script lang="ts">
    import { ui } from '$lib/state/ui.svelte';
    
    let { plants }: { plants: any[] } = $props();

    const feedbackItems = [
        { id: 1, title: "Melding 1", message: "Natuurlijke Airco: Eén volwassen boom heeft hetzelfde koelende effect als 10 airconditioners." },
        { id: 2, title: "Melding 2", message: "Dood doet leven: Een dode boom bevat vaak meer leven dan een levende boom." },
        { id: 3, title: "Melding 3", message: "De oudste bewoners: De oudste bomen ter wereld zijn meer dan 4.800 jaar oud." },
        { id: 4, title: "Melding 4", message: "Snelheidsduivels: Bamboe is de snelst groeiende plant ter wereld." },
    ];
</script>

<aside 
    class="fixed top-0 right-0 h-full w-[350px] bg-background border-l border-border shadow-popover z-40 transition-transform duration-300 ease-in-out"
    class:translate-x-0={ui.activeSidebar === 'analyse'}
    class:translate-x-full={ui.activeSidebar !== 'analyse'}
>
    <div class="p-8 mt-20 h-full overflow-y-auto pb-20">
        <h2 class="text-xl font-bold mb-4">Analyse Resultaten</h2>
        <p class="text-muted-foreground mb-4">
            Items: {feedbackItems.length} | API Plants: {plants.length}
        </p>
        
        <div class="space-y-4">
            {#each feedbackItems as item (item.id)}
                <div class="p-4 border rounded-card bg-muted/20">
                    <h3 class="font-semibold">{item.title}</h3>
                    <p class="text-sm text-muted-foreground">{item.message}</p>
                </div>
            {/each}
        </div>
    </div>
</aside>