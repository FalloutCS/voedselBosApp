<script lang="ts">
  import { Dialog, Label, Separator } from "bits-ui";

  let forest_Garden_Size: number = $state(500);
</script>

<Dialog.Root>

  <Dialog.Trigger
    class="rounded-input bg-dark text-background
	  shadow-mini hover:bg-dark/95 focus-visible:ring-foreground focus-visible:ring-offset-background focus-visible:outline-hidden
	  inline-flex h-12 items-center justify-center whitespace-nowrap px-[21px] text-[15px] font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98]"
  >
    Nieuw Voedselbos
  </Dialog.Trigger>

  <Dialog.Portal>
    <Dialog.Overlay
      class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80"
    />
    <Dialog.Content
      class="rounded-card-lg bg-background shadow-popover data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 outline-hidden fixed left-[50%] top-[50%] z-50 w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] border p-5 sm:max-w-[490px] md:w-full"
    >
      <Dialog.Title
        class="flex w-full items-center justify-center text-lg font-semibold tracking-tight"
      >
        Start een nieuw voedselbos
      </Dialog.Title>

      <Separator.Root class="bg-muted -mx-5 mb-6 mt-5 block h-px" />
      
      <Dialog.Description class="text-foreground-alt text-sm">
        Creeer je eigen voedselbos, vul de volgende punten in en starten maar
      </Dialog.Description>
      <div class="flex flex-col items-start gap-1 pb-11 pt-7">
        <Label.Root for="apiKey" class="text-sm font-medium">Grootte voedselbos m<sup>2</sup></Label.Root
        >
        <div class="mr-2 flex items-center">
          <div class="relative mr-2">
            <span class="sr-only">m2</span>
            <span
              aria-hidden="true"
              class="text-xxs text-muted-foreground absolute left-5 top-4"
              >m<sup>2</sup></span
            >
            <input
              type="number"
              class="h-input rounded-10px border-border-input bg-background text-foreground w-[119px] border pl-10 pr-2 text-base sm:text-sm"
              bind:value={forest_Garden_Size}
            />
          </div>
        </div>
        <div class="flex w-full justify-end">
          <Dialog.Close
            class="h-input rounded-input bg-dark text-background shadow-mini hover:bg-dark/95 focus-visible:ring-dark focus-visible:ring-offset-background focus-visible:outline-hidden inline-flex items-center justify-center px-[50px] text-[15px] font-semibold focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98]"
          >
            Save
          </Dialog.Close>
        </div>
        <Dialog.Close
          class="focus-visible:ring-foreground focus-visible:ring-offset-background focus-visible:outline-hidden absolute right-5 top-5 rounded-md focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98]"
        >
          <div>
            <span class="sr-only">Close</span>
          </div>
        </Dialog.Close>
      </div></Dialog.Content
    >
  </Dialog.Portal>
</Dialog.Root>
