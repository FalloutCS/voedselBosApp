<script>
    let { showModal = $bindable(), header, children } = $props();

    let dialog = $state(); // HTMLDialogElement

    $effect(() => {
        if (showModal) dialog.showModal();
    });
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog
    bind:this={dialog}
    onclose={() => (showModal = false)}
    onclick={(e) => { if (e.target === dialog) dialog.close(); }}
>
    <div>
        {@render header?.()}
        <hr />
        {@render children?.()}
        <hr />
        <!-- svelte-ignore a11y_autofocus -->
        <button autofocus onclick={() => dialog.close()}>close modal</button>
    </div>
</dialog>

<style>

    /* dialog {
        max-width: 90rem; 
        border-radius: 0.2em;
        border: none;
        padding: 0;
    } */
    /* dialog::backdrop {
        background: rgba(0, 0, 0, 0.3);
    }
    dialog > div {
        padding: 1em;
    }
    dialog[open] {
        animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    @keyframes zoom {
        from { transform: scale(0.95); }
        to { transform: scale(1); }
    }
    dialog[open]::backdrop {
        animation: fade 0.2s ease-out;
    }
    @keyframes fade {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    button {
        display: block;
    } */

    /* search area (keeps room above the scrollable list) */
    /* .search-area {
        padding: 0.75rem;
        border-bottom: 1px solid #eee;
    }
    .search-area input {
        width: 100%;
        padding: 0.5rem 0.75rem;
        border: 1px solid #ccc;
        border-radius: 6px;
        font-size: 1rem;
        box-sizing: border-box;
    } */

    /* scrollable grid inside modal */
    /* .grid-scroll {
        padding: 1rem;
        max-height: 60vh;
        overflow: auto;
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr)); 
        gap: 1rem;
        max-width: 900px; 
        margin: 0 auto;
        box-sizing: border-box;
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
        height: 190px; 
        box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    } */
    /* .plant-card img {
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
        box-sizing: border-box;
    } */

    /* responsive fallback: if modal is narrow, reduce columns */
    /* @media (max-width: 760px) {
        .grid-scroll {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }
    @media (max-width: 420px) {
        .grid-scroll {
            grid-template-columns: 1fr;
        }
    }  */
</style>