<script>
    let { showModal = $bindable(), header, children } = $props();

    let dialog = $state(); // HTMLDialogElement

    $effect(() => {
        if (showModal) dialog.showModal();
    });
</script>

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
        <button autofocus onclick={() => dialog.close()}>close modal</button>
    </div>
</dialog>

<style>

</style>