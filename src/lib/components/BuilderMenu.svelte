<script lang="ts">
    import { filterState } from '$lib/filterState.svelte';

    function getBtnClass(layerName: string | null) {
        const baseClass = "rounded-2xl transition-all px-4 py-1 border border-violet-200 text-sm font-medium";
        
        if (filterState.selectedLayer === layerName) {
            return `${baseClass} bg-violet-600 text-white shadow-md border-violet-600`;
        }
        
        return `${baseClass} bg-white hover:bg-violet-100 text-violet-900`;
    }
</script>

<div class="flex flex-wrap items-center px-5 py-2 w-full gap-2">
    <button 
        onclick={() => filterState.setLayer(null)}
        class={getBtnClass(null)}
    >
        Alle lagen
    </button>

    <button 
        onclick={() => filterState.setLayer("Boom")}
        class={getBtnClass("Boom")}
    >
        Boom laag
    </button>
    
    <button 
        onclick={() => filterState.setLayer("Struik")}
        class={getBtnClass("Struik")}
    >
        Struik laag
    </button>
    
    <button 
        onclick={() => filterState.setLayer("Kruid")}
        class={getBtnClass("Kruid")}
    >
        Kruid laag
    </button>
    
    <button 
        onclick={() => filterState.setLayer("Grond")}
        class={getBtnClass("Grond")}
    >
        Grond laag
    </button>
</div>