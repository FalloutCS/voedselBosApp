<script lang="ts">
    import type { PageProps } from './$types';
    import { Button } from "bits-ui";
    import { ui } from '$lib/state/ui.svelte'; 
    import AnalyseSidebar from '$lib/components/AnalyseSidebar.svelte';
    import SettingsSidebar from '$lib/components/SettingsSidebar.svelte';

    let { data }: PageProps = $props();

    const btnBase = "rounded-input shadow-mini inline-flex h-12 items-center justify-center px-[21px] text-[15px] font-semibold border z-50 relative transition-all active:scale-[0.98]";
</script>

<div class="flex items-center justify-between mb-5">
    <h1 class="text-3xl font-semibold text-foreground">
        Resultaat pagina
    </h1>

    <div class="flex items-center gap-3">
        <Button.Root
            onclick={() => ui.toggleSidebar('analyse')}
            class="{btnBase} bg-dark text-background hover:bg-dark/95 border-background"
        >
            {ui.activeSidebar === 'analyse' ? 'Sluit Analyse' : 'Analyse'}
        </Button.Root>

        <Button.Root
            onclick={() => ui.toggleSidebar('settings')}
            class="{btnBase} text-secondary-foreground border-border"
        >
            {ui.activeSidebar === 'settings' ? 'Sluit Instellingen' : 'Instellingen'}
        </Button.Root>
    </div>
</div>

<AnalyseSidebar plants={data.plants} />
<SettingsSidebar />