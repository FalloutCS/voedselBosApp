<script lang="ts">
    import type { PageProps } from './$types';
    import { Button, AlertDialog } from "bits-ui";

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
            {isSettingsOpen ? 'Sluit Instellingen' : 'Instellingen'}
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

{#snippet feedbackCard(item: { title: string, message: string })}
    <div class="p-4 border rounded-card bg-muted/20 hover:bg-muted/40 transition-colors">
        <h3 class="font-semibold text-foreground mb-1">{item.title}</h3>
        <p class="text-sm text-muted-foreground">{item.message}</p>
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
                    
                    <AlertDialog.Root>
                        <AlertDialog.Trigger
                            class="w-full rounded-card bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-mini 
                                   flex h-12 items-center justify-start px-[21px] text-[15px] 
                                   border font-medium border-border transition-all active:scale-[0.98]"
                        >
                            Nieuwe bos aanmaken
                        </AlertDialog.Trigger>
                        
                        <AlertDialog.Portal>
                            <AlertDialog.Overlay
                                class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80"
                            />
                            <AlertDialog.Content
                                class="rounded-card-lg bg-background shadow-popover data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 outline-hidden fixed left-[50%] top-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 border p-7 sm:max-w-lg md:w-full"
                            >
                                <div class="flex flex-col gap-4 pb-6">
                                    <AlertDialog.Title class="text-lg font-semibold tracking-tight">
                                        Nieuw bos aanmaken?
                                    </AlertDialog.Title>
                                    <AlertDialog.Description class="text-muted-foreground text-sm">
                                        Weet u zeker dat u een nieuw bos wilt aanmaken? Uw huidige niet-opgeslagen wijzigingen gaan mogelijk verloren.
                                    </AlertDialog.Description>
                                </div>
                                <div class="flex w-full items-center justify-center gap-2">
                                    <AlertDialog.Cancel
                                        class="h-input rounded-input bg-muted shadow-mini hover:bg-muted/80 focus-visible:ring-foreground focus-visible:ring-offset-background focus-visible:outline-hidden inline-flex w-full items-center justify-center text-[15px] font-medium transition-all focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98]"
                                    >
                                        Annuleren
                                    </AlertDialog.Cancel>
                                    <AlertDialog.Action
                                        class="h-input rounded-input bg-dark text-background shadow-mini hover:bg-dark/95 focus-visible:ring-dark focus-visible:ring-offset-background focus-visible:outline-hidden inline-flex w-full items-center justify-center text-[15px] font-semibold transition-all focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98]"
                                    >
                                        Aanmaken
                                    </AlertDialog.Action>
                                </div>
                            </AlertDialog.Content>
                        </AlertDialog.Portal>
                    </AlertDialog.Root>
                </div>

            </div>
        </div>
    </div>
{/snippet}
