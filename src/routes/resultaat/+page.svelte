<script lang="ts">
    import type { PageProps } from './$types';
    import { Button, AlertDialog } from "bits-ui";

    let { data }: PageProps = $props();
    
    let plants = $derived(data.plants); 


    let feedbackItems = [
        { id: 1, title: "Melding 1", message: "Natuurlijke Airco: Eén volwassen boom heeft hetzelfde koelende effect als 10 airconditioners die 24 uur per dag draaien. Bossen kunnen de temperatuur in een stad aanzienlijk verlagen." },
        { id: 2, title: "Melding 2", message: "Dood doet leven: Een dode boom die op de grond ligt, bevat vaak meer leven dan een levende boom. Het is een hotel voor duizenden soorten kevers, schimmels, mossen en insecten." },
        { id: 3, title: "Melding 3", message: "De oudste bewoners: De oudste bomen ter wereld, zoals de Bristlecone dennen, zijn meer dan 4.800 jaar oud. Ze stonden er al toen de piramides in Egypte werden gebouwd!" },
        { id: 4, title: "Melding 4", message: "Snelheidsduivels: Bamboe (technisch gezien gras, maar vormt bossen) is de snelst groeiende plant ter wereld. Sommige soorten kunnen tot wel 91 centimeter per dag groeien. Je kunt het bijna zien gebeuren!" },
    ];

    type SidebarState = 'none' | 'analyse' | 'settings';
    let activeSidebar = $state<SidebarState>('none');

    function toggleSidebar(view: SidebarState) {
        activeSidebar = activeSidebar === view ? 'none' : view;
    }

    const baseBtnClass = "rounded-input shadow-mini inline-flex h-12 items-center justify-center px-[21px] text-[15px] font-semibold border z-50 relative transition-all active:scale-[0.98]";
    const primaryBtnClass = `${baseBtnClass} bg-dark text-background hover:bg-dark/95 border-background`;
    const secondaryBtnClass = `${baseBtnClass} text-secondary-foreground border-border`;
    const actionBtnClass = "w-full rounded-card bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-mini inline-flex h-12 items-center justify-start px-[21px] text-[15px] border font-medium border-border z-50 relative transition-all active:scale-[0.98]";
</script>

<div class="flex items-center justify-between mb-5">
    <h1 class="text-3xl font-semibold text-foreground">
        Resultaat pagina
    </h1>

    <div class="flex items-center gap-3">
        <Button.Root
            onclick={() => toggleSidebar('analyse')}
            class={primaryBtnClass}
        >
            {activeSidebar === 'analyse' ? 'Sluit Analyse' : 'Analyse'}
        </Button.Root>

        <Button.Root
            onclick={() => toggleSidebar('settings')}
            class={secondaryBtnClass}
        >
            {activeSidebar === 'settings' ? 'Sluit Instellingen' : 'Instellingen'}
        </Button.Root>
    </div>
</div>

{@render analyseSidebar()}
{@render settingsSidebar()}

{#snippet analyseSidebar()}
    <div 
        class="fixed top-0 right-0 h-full w-[350px] bg-background border-l border-border shadow-popover z-40 transition-transform duration-300 ease-in-out"
        class:translate-x-0={activeSidebar === 'analyse'}
        class:translate-x-full={activeSidebar !== 'analyse'}
    >
        <div class="p-8 mt-20 h-full overflow-y-auto pb-20">
            <h2 class="text-xl font-bold mb-4">Analyse Resultaten</h2>
            <p class="text-muted-foreground mb-4">
                Er zijn {feedbackItems.length} punten gevonden.
                <br>API Planten: {plants.length}
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
        class="fixed top-0 right-0 h-full w-[350px] bg-background border-l border-border shadow-popover z-40 transition-transform duration-300 ease-in-out"
        class:translate-x-0={activeSidebar === 'settings'}
        class:translate-x-full={activeSidebar !== 'settings'}
    >
        <div class="p-8 mt-20 h-full overflow-y-auto pb-20">
            <h2 class="text-xl font-bold mb-4">Instellingen</h2>
            <p class="text-muted-foreground mb-6">
                Pas hier uw voorkeuren aan.
            </p>
            
            <div class="space-y-6">
                <div class="space-y-2">
                    <h3 class="font-bold">Bos bewerken</h3>
                    <Button.Root class={actionBtnClass}>
                        Wijzig bodemsoort
                    </Button.Root>
                    <Button.Root class={actionBtnClass}>
                        Wijzig oppervlakte
                    </Button.Root>
                </div>

                <div class="space-y-2">
                    <h3 class="font-bold">Bossen beheren</h3>
                    <AlertDialog.Root>
                        <AlertDialog.Trigger class={actionBtnClass}>
                            Nieuwe bos aanmaken
                        </AlertDialog.Trigger>
                        <AlertDialog.Portal>
                            <AlertDialog.Overlay class="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                            <AlertDialog.Content class="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg sm:rounded-lg">
                                <div class="flex flex-col gap-2">
                                    <AlertDialog.Title class="text-lg font-semibold">
                                        Nieuw bos aanmaken?
                                    </AlertDialog.Title>
                                    <AlertDialog.Description class="text-muted-foreground">
                                        Weet u zeker dat u een nieuw bos wilt aanmaken?
                                    </AlertDialog.Description>
                                </div>
                                <div class="flex justify-end gap-2">
                                    <AlertDialog.Cancel class="rounded-md bg-muted px-4 py-2 hover:bg-muted/80">
                                        Annuleren
                                    </AlertDialog.Cancel>
                                    <AlertDialog.Action class="rounded-md bg-dark text-background px-4 py-2 hover:bg-dark/90">
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