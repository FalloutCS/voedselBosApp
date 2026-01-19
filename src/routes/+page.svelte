<script>
    import { Button } from "bits-ui";
    import { goto } from "$app/navigation";
</script>

<div>
    <h1>Welcome to SvelteKit</h1>
    
    <p class="mb-4">Visit <a href="https://svelte.dev/docs/kit" class="underline text-blue-600">svelte.dev/docs/kit</a> to read the documentation</p>
    
    <Button.Root onclick={() => goto("/setup")} class="bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95">
        Go to Setup
    </Button.Root>
</div>
