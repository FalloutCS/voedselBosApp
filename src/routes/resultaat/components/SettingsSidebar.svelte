<script lang="ts">
    import { Button } from "bits-ui";
    import type { sideBarState } from "$lib/types";
    import CreateForestDialog from "./CreateForestDialog.svelte";
    CreateForestDialog;

    let {ui_State}: {ui_State: sideBarState} = $props()

    const actionBtn =
        "w-full rounded-card bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-mini inline-flex h-12 items-center justify-start px-[21px] text-[15px] border font-medium border-border transition-all active:scale-[0.98]";

    function handleCreate() {
        console.log("Creating...");
    }
</script>

<aside
    class="fixed top-0 right-0 h-full w-[350px] bg-background border-l border-border shadow-popover z-40 transition-transform duration-300 ease-in-out"
    class:translate-x-0={ui_State === "settings"}
    class:translate-x-full={ui_State !== "settings"}
>
    <div class="p-8 mt-20 h-full overflow-y-auto pb-20">
        <h2 class="text-xl font-bold mb-4">Instellingen</h2>
        <div class="space-y-6">
            <div class="space-y-2">
                <h3 class="font-bold">Bos bewerken</h3>
                <Button.Root class={actionBtn}>Wijzig bodemsoort</Button.Root>
            </div>
            <div class="space-y-2">
                <h3 class="font-bold">Bossen beheren</h3>
                <CreateForestDialog onConfirm={handleCreate} />
            </div>
        </div>
    </div>
</aside>
