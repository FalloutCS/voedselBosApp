<h1>Welcome to SvelteKit</h1>

<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<script>
    import Modal from './Modal.svelte';

    let showModal = false;

    // demo plant list — replace /example.png later with your actual images or dynamic src
    let query = '';
    let plants = Array.from({length: 30}, (_, i) => ({ id: i, name: `Plant ${i + 1}` }));
    $: filtered = plants.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
</script>

<button on:click={() => (showModal = true)}>Show modal</button>

<Modal bind:showModal>
    {#snippet header()}
        <h2>Selecteer een plant</h2>
    {/snippet}

    <!-- Search area (keeps room above the scrollable list) -->
    <div class="search-area">
        <input type="text" placeholder="Zoek planten..." bind:value={query} />
    </div>

    <!-- Scrollable grid of evenly sized boxes -->
    <div class="grid-scroll" role="list">
        {#each filtered as plant (plant.id)}
            <div class="plant-card" role="listitem">
                <img src="\example.png" alt={plant.name} />
                <div class="plant-name">{plant.name}</div>
            </div>
        {/each}
    </div>

    <!-- example external link kept below modal content -->

</Modal>

<style>
    /* search area above the scrollable list */
    .search-area {
        padding: 0.75rem;
        border-bottom: 1px solid #eee;
    }
    .search-area input {
        width: 100%;
        padding: 0.5rem 0.75rem;
        border: 1px solid #ccc;
        border-radius: 6px;
        font-size: 1rem;
    }

    /* scrollable grid */
    .grid-scroll {
        padding: 1rem;
        max-height: 30vh; /* adjust if you want the modal taller/shorter */
        overflow: auto;
        display: grid;
        /* changed: prefer about 3 boxes wide */
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 1rem;
        /* optional: limit width so modal content centers and stays ~3 cols on typical modal sizes */
        max-width: 900px;
        margin: 0 auto;
    }

    .plant-card {
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 8px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        height: 190px; /* fixed height so all boxes are same size */
        box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }
    .plant-card img {
        width: 100%;
        height: 120px;
        object-fit: cover;
        display: block;
    }
    .plant-name {
        padding: 0.5rem 0.75rem;
        text-align: center;
        font-weight: 600;
        width: 100%;
    }

    /* responsive fallback: if modal is narrow, reduce columns */
    @media (max-width: 760px) {
        .grid-scroll {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }
    @media (max-width: 420px) {
        .grid-scroll {
            grid-template-columns: 1fr;
        }
    }
</style>
