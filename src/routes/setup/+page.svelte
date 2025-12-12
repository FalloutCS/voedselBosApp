<script lang="ts">
  import { enhance } from "$app/forms";
  import { fade } from "svelte/transition";
  import type { PageProps } from "./$types";
  import { Dialog } from "bits-ui";
  import CreateGardenDialog from "./components/CreateGardenDialog.svelte";

  let { data }: PageProps = $props();
  let showDialog = $state(false);
</script>

<div class="h-screen w-full flex items-center justify-center bg-violet-50">
    <CreateGardenDialog />
</div>
