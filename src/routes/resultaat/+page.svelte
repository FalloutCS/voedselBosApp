<script lang="ts">
    import { Button } from "bits-ui";
    import type {sideBarState} from '$lib/types.ts'
    import AnalyseSidebar from "./components/AnalyseSidebar.svelte";
    import SettingsSidebar from "./components/SettingsSidebar.svelte";
    AnalyseSidebar;
    SettingsSidebar;

    let ui_State: sideBarState = $state("none");

    // ToDO create Button component
    const btnBase =
        "rounded-input shadow-mini inline-flex h-12 items-center justify-center px-[21px] text-[15px] font-semibold border z-50 relative transition-all active:scale-[0.98]";
</script>

<div class="flex items-center justify-between mb-5">
    <h1 class="text-3xl font-semibold text-foreground">Resultaat pagina</h1>

    <div class="flex items-center gap-3">
        <Button.Root
            onclick={() => ui_State = "analyse"}
            class="{btnBase} bg-dark text-background hover:bg-dark/95 border-background"
        >
            {ui_State === "analyse" ? "Sluit Analyse" : "Analyse"}
        </Button.Root>

        <Button.Root
            onclick={() => ui_State = "settings"}
            class="{btnBase} text-secondary-foreground border-border"
        >
            {ui_State === "settings"
                ? "Sluit Instellingen"
                : "Instellingen"}
        </Button.Root>
    </div>
</div>

<AnalyseSidebar {ui_State} />
<SettingsSidebar {ui_State} />
