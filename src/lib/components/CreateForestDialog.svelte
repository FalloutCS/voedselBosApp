<script lang="ts">
    import { AlertDialog } from "bits-ui";

    let { onConfirm }: { onConfirm: () => void } = $props();

    const triggerClass = "w-full rounded-card bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-mini inline-flex h-12 items-center justify-start px-[21px] text-[15px] border font-medium border-border transition-all active:scale-[0.98]";
</script>

<AlertDialog.Root>
    <AlertDialog.Trigger class={triggerClass}>
        Nieuwe bos aanmaken
    </AlertDialog.Trigger>
    
    <AlertDialog.Portal>
        <AlertDialog.Overlay 
            class="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" 
        />
        <AlertDialog.Content 
            class="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg sm:rounded-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]"
        >
            <div class="flex flex-col gap-2">
                <AlertDialog.Title class="text-lg font-semibold text-foreground">
                    Nieuw bos aanmaken?
                </AlertDialog.Title>
                <AlertDialog.Description class="text-muted-foreground">
                    Weet u zeker dat u een nieuw bos wilt aanmaken? Dit kan niet ongedaan worden gemaakt.
                </AlertDialog.Description>
            </div>

            <div class="flex justify-end gap-2">
                <AlertDialog.Cancel class="rounded-md bg-muted px-4 py-2 text-sm font-semibold hover:bg-muted/80">
                    Annuleren
                </AlertDialog.Cancel>
                <AlertDialog.Action 
                    onclick={onConfirm}
                    class="rounded-md bg-dark text-background px-4 py-2 text-sm font-semibold hover:bg-dark/90"
                >
                    Aanmaken
                </AlertDialog.Action>
            </div>
        </AlertDialog.Content>
    </AlertDialog.Portal>
</AlertDialog.Root>