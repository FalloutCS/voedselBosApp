<h1>Welcome to SvelteKit</h1>

<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<script>
	import Modal from './Modal.svelte';

	let showModal = $state(false);
</script>

<button onclick={() => (showModal = true)}> show modal </button>

<Modal bind:showModal>
	{#snippet header()}
		<h2>
			Selecteer een plant
		</h2>
	{/snippet}


<div id="parent" style="display:flex; height:100%; border:solid 1px black">
	<div id="left" class="center" style="background-color:#aaaaff; flex:1;">
		<h2>Boom A</h2>
		

		
	</div>
	<div id="right" style="flex:10; display:flex; flex-flow:column">
		<div id="red" class="center" style="background-color:#ffaaaa; flex:1;">
			<h2>Content area 2</h2>
			Top
		</div>
		<div id="red" class="center" style="background-color:yellow; flex:1;display:flex; flex-flow:column; justify-content:center;">
			<h2>Content area 3</h2>
			Bottom			
		</div>
	</div>
		
</div>
<style>
	.center {
		text-align: center;
    display: flex;
    flex-flow: column;
    justify-content: center;
	}
</style>
    

	<a href="https://www.merriam-webster.com/dictionary/modal">merriam-webster.com</a>
</Modal>
