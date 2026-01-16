<script lang="ts">
  import { Toolbar } from "bits-ui";
  import { Plant, Shovel, ArrowsOut } from "phosphor-svelte";

  let { editMode = $bindable() } = $props();
</script>

<Toolbar.Root
  class="rounded-4xl border-violet-500 border-2 bg-violet-100 shadow-mini flex items-center justify-center px-1 py-1"
>
  <Toolbar.Group
    bind:value={editMode}
    type="single"
    class="flex items-center gap-x-0.5"
  >
    <Toolbar.GroupItem
      aria-label="toggle shovel"
      value="shovel"
      class="rounded-2xl hover:bg-violet-400 active:bg-violet-300 data-[state=on]:bg-violet-600 data-[state=on]:text-white inline-flex size-9 items-center justify-center transition-all active:scale-[0.98]"
    >
      <Shovel class="size-6" />
    </Toolbar.GroupItem>
    <Toolbar.GroupItem
      aria-label="toggle planter"
      value="planter"
      class="rounded-2xl hover:bg-violet-400 active:bg-violet-300 data-[state=on]:bg-violet-600 data-[state=on]:text-white inline-flex size-9 items-center justify-center transition-all active:scale-[0.98]"
    >
      <Plant class="size-6" />
    </Toolbar.GroupItem>
    <Toolbar.GroupItem
      aria-label="toggle viewer"
      value="view"
      class="rounded-2xl hover:bg-violet-400 active:bg-violet-300 data-[state=on]:bg-violet-600 data-[state=on]:text-white inline-flex size-9 items-center justify-center transition-all active:scale-[0.98]"
    >
      <ArrowsOut class="size-6" />
    </Toolbar.GroupItem>
  </Toolbar.Group>
</Toolbar.Root>
