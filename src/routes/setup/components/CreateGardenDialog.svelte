<script lang="ts">
  import { enhance } from "$app/forms";
  import { Dialog } from "bits-ui";

  let showDialog = $state(false);
</script>

<Dialog.Root bind:open={showDialog}>
  <Dialog.Trigger
    class="bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95"
  >
    Start New Garden
  </Dialog.Trigger>

  <Dialog.Portal>
    <Dialog.Overlay
      class="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px]"
    />

    <Dialog.Content
      class="fixed left-[50%] top-[50%] z-50 w-full max-w-md translate-x-[-50%] translate-y-[-50%] rounded-2xl bg-white p-8 shadow-2xl outline-none border border-violet-100"
    >
      <Dialog.Title class="text-2xl font-bold text-violet-900 mb-2">
        Create New Forest
      </Dialog.Title>
      <Dialog.Description class="text-sm text-gray-500 mb-6">
        Define the dimensions and location of your new project.
      </Dialog.Description>

      <form method="POST" class="flex flex-col gap-4" use:enhance>
        <div class="space-y-1">
          <label for="name" class="text-sm font-medium text-violet-700"
            >Name</label
          >
          <input
            id="name"
            type="text"
            name="name"
            placeholder="e.g. My Backyard Paradise"
            class="flex h-10 w-full rounded-lg border border-violet-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
            required
          />
        </div>

        <div class="space-y-1">
          <label for="location" class="text-sm font-medium text-violet-700"
            >Location</label
          >
          <input
            id="location"
            type="text"
            name="location"
            placeholder="e.g. Amsterdam, NL"
            class="flex h-10 w-full rounded-lg border border-violet-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
            required
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-1">
            <label for="width" class="text-sm font-medium text-violet-700"
              >Width (m)</label
            >
            <input
              id="width"
              name="width"
              type="number"
              min="1"
              placeholder="10"
              class="flex h-10 w-full rounded-lg border border-violet-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
            />
          </div>
          <div class="space-y-1">
            <label for="heigth" class="text-sm font-medium text-violet-700"
              >Height (m)</label
            >
            <input
              id="heigth"
              name="heigth"
              type="number"
              min="1"
              placeholder="10"
              class="flex h-10 w-full rounded-lg border border-violet-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          formaction="?/create"
          class="mt-4 inline-flex items-center justify-center rounded-xl bg-violet-600 px-4 py-3 text-sm font-bold text-white shadow-sm hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 transition-all active:scale-95"
        >
          Create Forest
        </button>
      </form>

      <Dialog.Close
        class="absolute right-4 top-4 rounded-full p-2 opacity-70 transition-opacity hover:opacity-100 hover:bg-violet-50 text-violet-900"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          ><line x1="18" y1="6" x2="6" y2="18"></line><line
            x1="6"
            y1="6"
            x2="18"
            y2="18"
          ></line></svg
        >
        <span class="sr-only">Close</span>
      </Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
