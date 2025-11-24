<script>
    import { onMount } from 'svelte';
    import Modal from './Modal.svelte';

    /**
     * Define the shape of a Plant object so VS Code understands it
     * @typedef {Object} Plant
     * @property {number} id
     * @property {string} latinName
     * @property {string} [commonName]
     * @property {string} [habit] 
     */

    let showModal = false;
    let query = '';
    let loading = true;
    let error = '';

    /** @type {Plant[]} */
    let plants = [];

    /** @type {Plant[]} */
    let filtered = [];

    // --- HELPER FUNCTION ---
    /** * Removes special characters to match filenames 
     * @param {string|undefined} habit - The habit string (can be undefined)
     */
    const getIconPath = (habit) => {
        // If habit is null, undefined, or empty, return the default
        if (!habit) return '/HabitIcons/Shrub.png';
        
        const cleanName = habit.replace(/[^a-zA-Z0-9]/g, ''); 
        return `/HabitIcons/${cleanName}.png`;
    };

    /**
     * Handles missing images by reverting to a default
     * @param {Event} e 
     */
    const handleImgError = (e) => {
        // We tell VS Code that the target is definitely an Image Element
        const img = /** @type {HTMLImageElement} */ (e.target);
        img.src = '/HabitIcons/Shrub.png';
    };

    onMount(async () => {
        try {
            const response = await fetch('http://localhost:5269/api/Plants');
            if (response.ok) {
                plants = await response.json();
                console.log("Loaded plants:", plants);
            } else {
                error = "Failed to load data from API";
            }
        } catch (err) {
            error = "Could not connect to API (Check CORS)";
            console.error(err);
        } finally {
            loading = false;
        }
    });

    // Reactive filter
    $: filtered = plants.filter(p => {
        const q = query.toLowerCase();
        const common = (p.commonName || '').toLowerCase();
        const latin = (p.latinName || '').toLowerCase();
        return common.includes(q) || latin.includes(q);
    });
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<button on:click={() => (showModal = true)}>Show modal</button>

<Modal bind:showModal>
    {#snippet header()}
        <h2>Selecteer een plant</h2>
    {/snippet}

    <div class="search-area">
        <input type="text" placeholder="Zoek planten..." bind:value={query} />
    </div>

    <div class="grid-scroll" role="list">
        {#if loading}
            <p style="padding: 1rem;">Loading plants...</p>
        {:else if error}
            <p style="padding: 1rem; color: red;">{error}</p>
        {:else if filtered.length === 0}
            <p style="padding: 1rem;">No plants found.</p>
        {:else}
            {#each filtered as plant (plant.id)}
                <div class="plant-card" role="listitem">
                    
                    <img 
                        src={getIconPath(plant.habit)} 
                        alt={plant.habit} 
                        on:error={handleImgError} 
                    />
                    
                    <div class="plant-name">
                        <span class="main-name">
                            {plant.commonName ? plant.commonName : plant.latinName}
                        </span>
                        {#if plant.commonName}
                            <span class="sub-name">{plant.latinName}</span>
                        {/if}
                    </div>
                </div>
            {/each}
        {/if}
    </div>
</Modal>

<style>
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

    .grid-scroll {
        padding: 1rem;
        max-height: 50vh;
        overflow: auto;
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 1rem;
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
        height: 210px; 
        box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }
    
    /* I consolidated your CSS here. 
       Previously you had this block twice, and the second one 
       was overwriting the 'contain' logic. */
    .plant-card img {
        width: 100%;
        height: 120px;
        object-fit: contain; /* Ensures icon isn't cut off */
        padding: 10px;       /* Adds breathing room */
        display: block;
    }

    .plant-name {
        padding: 0.5rem;
        text-align: center;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex-grow: 1;
    }
    .main-name {
        font-weight: 600;
        font-size: 0.95rem;
        margin-bottom: 2px;
    }
    .sub-name {
        font-size: 0.8rem;
        color: #666;
        font-style: italic;
    }

    @media (max-width: 760px) {
        .grid-scroll { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
    @media (max-width: 420px) {
        .grid-scroll { grid-template-columns: 1fr; }
    }
</style>