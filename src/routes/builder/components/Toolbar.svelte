<script lang="ts">
  import { Toolbar, DropdownMenu } from "bits-ui";
  import { Plant, Shovel, ArrowsOut, Drop, Prohibit } from "phosphor-svelte";

  let { editMode = $bindable(), shovelType = $bindable() } = $props();
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
      aria-label="toggle viewer"
      value="view"
      class="rounded-2xl hover:bg-violet-400 active:bg-violet-300 data-[state=on]:bg-violet-600 data-[state=on]:text-white inline-flex size-9 items-center justify-center transition-all active:scale-[0.98]"
    >
      <ArrowsOut class="size-6" />
    </Toolbar.GroupItem>

    <DropdownMenu.Root>
      <DropdownMenu.Trigger class="outline-none">
        <div
          class="rounded-2xl inline-flex size-9 items-center justify-center transition-all active:scale-[0.98]
            {editMode === 'shovel'
            ? 'bg-violet-600 text-white'
            : 'hover:bg-violet-400 active:bg-violet-300'}"
        >
          <Shovel class="size-6" />
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        class="w-48 rounded-xl bg-white p-1 shadow-xl border border-violet-100 z-50"
      >
        <DropdownMenu.Item
          onclick={() => {
            editMode = "shovel";
            shovelType = "blocked";
          }}
          class="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-violet-50 cursor-pointer outline-none"
        >
          <Prohibit class="size-4 text-gray-500" />
          <span>Blokkeer Terrein</span>
        </DropdownMenu.Item>

        <DropdownMenu.Item
          onclick={() => {
            editMode = "shovel";
            shovelType = "water";
          }}
          class="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-violet-50 cursor-pointer outline-none"
        >
          <Drop class="size-4 text-blue-500" />
          <span>Water / Sloot</span>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>

    <Toolbar.GroupItem
      aria-label="toggle planter"
      value="planter"
      class="rounded-2xl hover:bg-violet-400 active:bg-violet-300 data-[state=on]:bg-violet-600 data-[state=on]:text-white inline-flex size-9 items-center justify-center transition-all active:scale-[0.98]"
    >
      <Plant class="size-6" />
    </Toolbar.GroupItem>
  </Toolbar.Group>
</Toolbar.Root>
