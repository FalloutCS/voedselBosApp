<script lang="ts">
    import type { PageProps } from './$types';
    import { Button } from "bits-ui";

    let { data }: PageProps = $props();
    $inspect(data.data)

    // Button state
    let isResultsOpen = $state(false);
    let isSettingsOpen = $state(false);

    // Functie: Toggle Analyse (en sluit settings als die open is)
    function toggleAnalyse() {
        if (isResultsOpen) {
            isResultsOpen = false; // Sluiten als hij al open is
        } else {
            isResultsOpen = true;  // Openen
            isSettingsOpen = false; // Zorg dat de andere dicht is
        }
    }

    // Functie: Toggle Settings (en sluit analyse als die open is)
    function toggleSettings() {
        if (isSettingsOpen) {
            isSettingsOpen = false;
        } else {
            isSettingsOpen = true;
            isResultsOpen = false;
        }
    }

    // Dummy data
    let feedbackItems = [
        { id: 1, title: "Melding 1", message: "Een voedselbos is een door mensen ontworpen productief ecosysteem naar het voorbeeld van een natuurlijk bos, met een grote diversiteit aan meerjarige, houtige soorten, waarvan delen (vruchten, zaden, bladeren, stengels, etc.) voor de mens als voedsel dienen’" },
        { id: 2, title: "Melding 2", message: "Een voedselbos is een door mensen ontworpen productief ecosysteem naar het voorbeeld van een natuurlijk bos, met een grote diversiteit aan meerjarige, houtige soorten, waarvan delen (vruchten, zaden, bladeren, stengels, etc.) voor de mens als voedsel dienen’" },
        { id: 3, title: "Melding 3", message: "Een voedselbos is een door mensen ontworpen productief ecosysteem naar het voorbeeld van een natuurlijk bos, met een grote diversiteit aan meerjarige, houtige soorten, waarvan delen (vruchten, zaden, bladeren, stengels, etc.) voor de mens als voedsel dienen’" },
        { id: 4, title: "Melding 4", message: "Een voedselbos is een door mensen ontworpen productief ecosysteem naar het voorbeeld van een natuurlijk bos, met een grote diversiteit aan meerjarige, houtige soorten, waarvan delen (vruchten, zaden, bladeren, stengels, etc.) voor de mens als voedsel dienen’" },
    ];
</script>

<div class="flex items-center justify-between mb-5">
    <h1 class="font-jost text-3xl font-semibold text-foreground">
        Resultaat pagina
    </h1>

    <div class="flex items-center gap-3">
        <Button.Root
            onclick={toggleAnalyse}
            class="rounded-input bg-dark text-background shadow-mini hover:bg-dark/95 
                   inline-flex h-12 items-center justify-center px-[21px] text-[15px]
                   font-semibold border border-background z-50 relative transition-all active:scale-[0.98]"
        >
            {isResultsOpen ? 'Sluit Analyse' : 'Analyse'}
        </Button.Root>

        <Button.Root
            onclick={toggleSettings}
            class="rounded-input bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-mini 
                   inline-flex h-12 items-center justify-center px-[21px] text-[15px]
                   font-semibold border border-border z-50 relative transition-all active:scale-[0.98]"
        >
            {isSettingsOpen ? 'Instellingen' : 'Instellingen'}
        </Button.Root>
    </div>
</div>


{@render analyseSidebar()}
{@render settingsSidebar()}


{#snippet analyseSidebar()}
    <div 
        class="fixed top-0 right-0 h-full w-[350px] bg-background border-l border-border shadow-popover z-40 
               transition-transform duration-300 ease-in-out"
        class:translate-x-0={isResultsOpen}
        class:translate-x-full={!isResultsOpen}
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


{#snippet settingsSidebar()}
    <div 
        class="fixed top-0 right-0 h-full w-[350px] bg-background border-l border-border shadow-popover z-40 
               transition-transform duration-300 ease-in-out"
        class:translate-x-0={isSettingsOpen}
        class:translate-x-full={!isSettingsOpen}
    >
        <div class="p-8 mt-20 h-full overflow-y-auto pb-20">
            <h2 class="text-xl font-bold mb-4">Instellingen</h2>
            <p class="text-muted-foreground mb-6">
                Pas hier uw voorkeuren aan.
            </p>
            
            <div class="space-y-6">
                
                <div class="space-y-2">
                    <h3 class="font-bold">Bos bewerken</h3>
                    <Button.Root
                        class="w-full rounded-card bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-mini 
                        inline-flex h-12 items-center justify-start px-[21px] text-[15px] 
                        border font-medium border-border z-50 relative transition-all active:scale-[0.98]"
                        >
                        Wijzig bodemsoort
                    </Button.Root>

                    <Button.Root
                        class="w-full rounded-card bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-mini 
                        inline-flex h-12 items-center justify-start px-[21px] text-[15px] 
                        border font-medium border-border z-50 relative transition-all active:scale-[0.98]"
                        >
                        Wijzig oppervlakte
                    </Button.Root>
                </div>

                <div class="space-y-2">
                    <h3 class="font-bold">Bossen beheren</h3>
                    
                    <div class="flex items-center justify-between p-3 border rounded-card">
                        <span>Nieuwe bos aanmaken</span>
                    </div>
                </div>

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