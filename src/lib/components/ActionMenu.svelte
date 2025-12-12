<script lang="ts">
    import { enhance } from "$app/forms";
    import type { SubmitFunction } from "@sveltejs/kit";

    type ActionMenuProps = {
        plantName: string;
        cellIndex: number;
        onEdit: () => void;
        onClose: () => void;
        handleSubmission: SubmitFunction;
    };

    let { plantName, cellIndex, onEdit, onClose, handleSubmission }: ActionMenuProps = $props();
</script>

<div class="absolute inset-0 z-50 flex items-center justify-center bg-violet-900/20 backdrop-blur-[1px] rounded">
    <div class="bg-white p-6 rounded-2xl shadow-xl border border-violet-100 max-w-sm w-full text-center">
        
        <h3 class="text-xl font-bold text-violet-900 mb-2">Opties voor {plantName}</h3>
        <p class="text-violet-600 mb-6 text-sm">Wat wil je doen met deze plant?</p>

        <div class="flex flex-col gap-3">
            <button 
                type="button"
                onclick={onEdit}
                class="w-full py-2 px-4 bg-violet-100 hover:bg-violet-200 text-violet-800 rounded-lg font-medium transition-colors"
            >
                Plant Wijzigen
            </button>

            <form 
                method="POST" 
                action="?/removePlant" 
                use:enhance={handleSubmission} 
                class="w-full"
            >
                <input type="hidden" name="cellIndex" value={cellIndex} />
                <button 
                    type="submit"
                    class="w-full py-2 px-4 bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 rounded-lg font-medium transition-colors"
                >
                    Verwijderen
                </button>
            </form>

            <div class="border-t border-gray-100 my-1"></div>

            <button 
                type="button"
                onclick={onClose}
                class="w-full py-2 px-4 text-gray-400 hover:text-gray-600 font-medium transition-colors text-sm"
            >
                Annuleren
            </button>
        </div>

    </div>
</div>