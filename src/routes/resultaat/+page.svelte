<script lang="ts">
    import type { PageProps } from './$types';
    import { Button } from "bits-ui";

    let { data }: PageProps = $props();

    // Button state
    let isPanelOpen = $state(false);

    function togglePanel() {
        isPanelOpen = !isPanelOpen;
    }

    // Dit is voor nu dummy data, want ik heb nog geen database
    let feedbackItems = [
        { id: 1, title: "Melding 1", message: "Tekst voor melding 1" },
        { id: 2, title: "Melding 2", message: "Tekst voor melding 2" },
        { id: 3, title: "Melding 3", message: "Tekst voor melding 3" },
        { id: 4, title: "Melding 4", message: "Tekst voor melding 4" },
        { id: 5, title: "Melding 5", message: "Tekst voor melding 5" },
        { id: 6, title: "Melding 6", message: "Tekst voor melding 6" },
    ];
</script>

<div class="flex items-center justify-between mb-5">
    <h1 class="font-jost text-3xl font-semibold text-foreground">
        Resultaat pagina
    </h1>

    <Button.Root
        onclick={() => isPanelOpen = !isPanelOpen}
        class="rounded-input bg-dark text-background shadow-mini hover:bg-dark/95 
               inline-flex h-12 items-center justify-center px-[21px] text-[15px]
               font-semibold border border-background z-50 relative transition-all active:scale-[0.98]"
    >
        {isPanelOpen ? 'Sluit Analyse' : 'Analyse'}
    </Button.Root>
</div>


{@render analyseSidebar()}


{#snippet analyseSidebar()}
    <div 
        class="fixed top-0 right-0 h-full w-[450px] bg-background border-l border-border shadow-popover z-40 
               transition-transform duration-300 ease-in-out"
        class:translate-x-0={isPanelOpen}
        class:translate-x-full={!isPanelOpen}
    >
        <div class="p-8 mt-20 h-full overflow-y-auto pb-20">
            <h2 class="text-xl font-bold mb-4">Analyse Resultaten</h2>
            
            <p class="text-muted-foreground mb-4">
                Er zijn {feedbackItems.length} punten gevonden
            </p>
            
            <div class="space-y-4">
                {#each feedbackItems as item (item.id)}
                    {@render feedbackCard(item)}
                {/each}
            </div>
        </div>
    </div>
{/snippet}

{#snippet feedbackCard(item: { title: string, message: string })}
    <div class="p-4 border rounded-card bg-muted/20 hover:bg-muted/40 transition-colors">
        <h3 class="font-semibold text-foreground mb-1">{item.title}</h3>
        <p class="text-sm text-muted-foreground">{item.message}</p>
    </div>
{/snippet}