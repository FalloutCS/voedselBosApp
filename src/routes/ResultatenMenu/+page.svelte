<script lang="ts">
  import type { PageProps } from "./$types";
  import { fade, fly, slide } from "svelte/transition";
  import { getPairedIssuesForLocation, getStressLevels } from "$lib/simulationUtils";
  import ResultatenCanvas from "$lib/components/ResultatenCanvas.svelte";
  import { CompassRose } from "phosphor-svelte";
  
  // Imports from phosphor-svelte
  import { 
    Warning,      
    CheckCircle, 
    Sun, 
    Wind, 
    Leaf, 
    CaretDown,    
    X, 
    Funnel
  } from "phosphor-svelte";

  let { data }: PageProps = $props();

  let activeCellIndex: number | null = $state(null);
  let expandedIssueId: string | null = $state(null);
  
  // Nieuwe state voor het filteren: 'ALL', 'SUN', 'WIND', of 'NITROGEN'
  let activeFilter: 'ALL' | 'SUN' | 'WIND' | 'NITROGEN' = $state('ALL');

  let stressMap = $derived.by(() => {
    if (data.simulationResults && "warnings" in data.simulationResults) {
      return getStressLevels(data.simulationResults.warnings);
    }
    return {};
  });

  let activePlantData = $derived.by(() => {
    if (activeCellIndex === null) return null;
    return data.placedPlants[activeCellIndex]?.plant || null;
  });

  // Haal alle ruwe berichten op
  let allIssues = $derived.by(() => {
    const results = data.simulationResults;
    if (activeCellIndex === null || !results || !("warnings" in results))
      return [];
    return getPairedIssuesForLocation(results.warnings, activeCellIndex);
  });

  // Helper om te bepalen welk type een bericht is
  function getIssueType(text: string): 'SUN' | 'WIND' | 'NITROGEN' | 'OTHER' {
    const t = text.toLowerCase();
    if (t.includes('zon')) return 'SUN';
    if (t.includes('wind')) return 'WIND';
    if (t.includes('stikstof')) return 'NITROGEN';
    return 'OTHER';
  }

  // De gefilterde lijst die we daadwerkelijk tonen
  let filteredIssues = $derived.by(() => {
    if (activeFilter === 'ALL') return allIssues;
    return allIssues.filter(i => getIssueType(i.warning) === activeFilter);
  });

  // --- Translations ---
  function translateSun(code?: string): string {
    switch(code) {
        case "N": return "Volle zon";
        case "M": return "Halfschaduw";
        case "S": return "Schaduw";
        default: return "Onbekend";
    }
  }

  function translateWind(code?: string): string {
    switch(code) {
        case "W": return "Zeer bestendig";
        case "M": return "Matig";
        case "S": return "Kwetsbaar";
        default: return "Onbekend";
    }
  }

  function translateNitrogen(need?: number): string {
    if (need === undefined) return "Onbekend";
    if (need >= 3) return "Groot";
    if (need === 2) return "Gemiddeld";
    return "Klein";
  }

  function handleCellClick(cellIndex: number) {
    if (data.placedPlants[cellIndex]?.plant) {
      activeCellIndex = cellIndex;
      expandedIssueId = null;
      activeFilter = 'ALL'; // Reset filter bij openen nieuwe plant
    } else {
      activeCellIndex = null;
    }
  }

  function closePopup() {
    activeCellIndex = null;
  }

  function toggleIssue(id: string) {
    expandedIssueId = expandedIssueId === id ? null : id;
  }
</script>

<div class="h-4/5 w-4/5 mx-auto my-auto rounded relative flex flex-col font-sans">
  <div class="flex justify-between items-end pb-4">
    <h1 class="text-2xl font-bold text-emerald-800 leading-none mb-1">Simulatie Resultaten</h1>

    <div class="absolute left-1/2 top-[10%] -translate-x-1/2 -translate-y-1/2 pointer-events-none grid grid-cols-[1rem_auto_1rem] grid-rows-[1rem_auto_1rem] place-items-center text-violet-600 bg-white-50/50 p-1 rounded-full shadow-sm select-none">
        <span class="col-start-2 row-start-1 text-xs font-bold leading-none">N</span>
        
        <span class="col-start-1 row-start-2 text-xs font-bold leading-none">W</span>
        
        <div class="col-start-2 row-start-2 flex items-center justify-center">
             <CompassRose size={40} weight="duotone" />
        </div>

        <span class="col-start-3 row-start-2 text-xs font-bold leading-none">E</span>

        <span class="col-start-2 row-start-3 text-xs font-bold leading-none">S</span>
    </div>

    <a
      href="/builder"
      class="bg-stone-500 hover:bg-stone-600 text-white font-bold py-2 px-4 rounded transition-colors shadow-sm"
    >
      Terug naar Ontwerp
    </a>
  </div>

  <div class="relative grow border-2 border-emerald-100 rounded-lg overflow-hidden bg-white shadow-sm">
    <ResultatenCanvas
      surfaceArea={data.surfaceArea}
      terrain={data.terrain}
      placedPlants={data.placedPlants}
      width={data.width}
      height={data.height}
      onCellClick={handleCellClick}
      {stressMap}
    />

    {#if activeCellIndex !== null && activePlantData}
      <div
        role="button"
        tabindex="0"
        class="absolute inset-0 bg-stone-900/20 z-10 backdrop-blur-[2px]"
        onclick={closePopup}
        onkeydown={(e) => e.key === "Escape" && closePopup()}
        transition:fade={{ duration: 200 }}
      ></div>

      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-2xl max-h-[85%] bg-white rounded-xl shadow-2xl z-20 flex flex-col overflow-hidden border-l-8 animate-in fade-in slide-in-from-bottom-4"
        class:border-emerald-500={allIssues.length === 0}
        class:border-red-500={allIssues.length > 0}
        transition:fly={{ y: 20, duration: 300 }}
      >
        
        <div class="px-6 py-4 border-b border-stone-100 flex justify-between items-start bg-white z-10">
            <div>
                <div class="flex items-center gap-3">
                    <h3 class="text-xl font-bold text-stone-800 leading-tight">
                        {activePlantData.nlName || activePlantData.commonName}
                    </h3>
                    <span class={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${allIssues.length === 0 ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                        {allIssues.length === 0 
                            ? 'Gezond' 
                            : `${allIssues.length} ${allIssues.length === 1 ? 'Probleem' : 'Problemen'}`}
                    </span>
                </div>
                <p class="text-xs text-stone-500 italic mt-0.5">{activePlantData.latinName}</p>
            </div>
            <button onclick={closePopup} class="text-stone-400 hover:text-stone-600 transition-colors">
                 <X size={24} />
            </button>
        </div>

        <div class="p-6 overflow-y-auto grow bg-stone-50/50">
          
            <div class="flex gap-4 mb-4 p-3 bg-white rounded-lg border border-stone-200 shadow-sm">
    <div class="flex-1 flex items-center gap-3 px-2 border-r border-stone-100 last:border-0">
        <div class="text-amber-500 bg-amber-50 p-1.5 rounded-full shrink-0">
            <Sun size={16} />
        </div>
        <div class="overflow-hidden">
            <span class="block text-[9px] uppercase text-stone-400 font-bold leading-none mb-1 truncate">Lichtbehoefte</span>
            <span class="font-semibold text-sm text-stone-700 leading-tight block truncate">{translateSun(activePlantData.shade)}</span>
        </div>
    </div>

    <div class="flex-1 flex items-center gap-3 px-2 border-r border-stone-100 last:border-0">
        <div class="text-blue-500 bg-blue-50 p-1.5 rounded-full shrink-0">
            <Wind size={16} />
        </div>
        <div class="overflow-hidden">
            <span class="block text-[9px] uppercase text-stone-400 font-bold leading-none mb-1 truncate">Windbestendigheid</span>
            <span class="font-semibold text-sm text-stone-700 leading-tight block truncate">{translateWind(activePlantData.wind)}</span>
        </div>
    </div>

    <div class="flex-1 flex items-center gap-3 px-2">
        <div class="text-emerald-500 bg-emerald-50 p-1.5 rounded-full shrink-0">
            <Leaf size={16} />
        </div>
        <div class="overflow-hidden">
            <span class="block text-[9px] uppercase text-stone-400 font-bold leading-none mb-1 truncate">Stikstofbehoefte</span>
            <span class="font-semibold text-sm text-stone-700 leading-tight block truncate">{translateNitrogen(activePlantData.nitrogenNeed)}</span>
        </div>
    </div>
</div>

            {#if allIssues.length > 0}
                <div class="flex gap-2 mb-4 overflow-x-auto pb-1">
                    <button 
                        onclick={() => activeFilter = 'ALL'}
                        class="px-3 py-1.5 rounded-full text-xs font-bold border transition-colors flex items-center gap-2 whitespace-nowrap
                        {activeFilter === 'ALL' ? 'bg-stone-800 text-white border-stone-800' : 'bg-white text-stone-500 border-stone-200 hover:bg-stone-50'}"
                    >
                       <span>Alle</span>
                       <span class="bg-white/20 px-1.5 rounded-full text-[10px]">{allIssues.length}</span>
                    </button>

                    <button 
                        onclick={() => activeFilter = 'SUN'}
                        class="px-3 py-1.5 rounded-full text-xs font-bold border transition-colors flex items-center gap-2 whitespace-nowrap
                        {activeFilter === 'SUN' ? 'bg-amber-100 text-amber-800 border-amber-200' : 'bg-white text-stone-500 border-stone-200 hover:bg-amber-50'}"
                    >
                        <Sun size={12} />
                        <span>Zon</span>
                    </button>

                    <button 
                        onclick={() => activeFilter = 'WIND'}
                        class="px-3 py-1.5 rounded-full text-xs font-bold border transition-colors flex items-center gap-2 whitespace-nowrap
                        {activeFilter === 'WIND' ? 'bg-blue-100 text-blue-800 border-blue-200' : 'bg-white text-stone-500 border-stone-200 hover:bg-blue-50'}"
                    >
                        <Wind size={12} />
                        <span>Wind</span>
                    </button>

                    <button 
                        onclick={() => activeFilter = 'NITROGEN'}
                        class="px-3 py-1.5 rounded-full text-xs font-bold border transition-colors flex items-center gap-2 whitespace-nowrap
                        {activeFilter === 'NITROGEN' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-white text-stone-500 border-stone-200 hover:bg-emerald-50'}"
                    >
                        <Leaf size={12} />
                        <span>Stikstof</span>
                    </button>
                </div>

                <div class="space-y-2">
                    <h4 class="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2 ml-1">
                        {activeFilter === 'ALL' ? 'Diagnose & Advies' : `Resultaten voor ${activeFilter === 'SUN' ? 'Zon' : activeFilter === 'WIND' ? 'Wind' : 'Stikstof'}`}
                    </h4>
                    
                    {#if filteredIssues.length === 0}
                        <div class="text-center py-6 text-stone-400 text-sm italic border border-dashed border-stone-200 rounded-lg">
                            Geen {activeFilter === 'SUN' ? 'zon' : activeFilter === 'WIND' ? 'wind' : 'stikstof'} problemen gevonden.
                        </div>
                    {/if}

                    {#each filteredIssues as issue (issue.id)}
                        <div class="bg-white rounded-lg border border-red-100 shadow-sm overflow-hidden group">
                            <button 
                                class="w-full text-left px-4 py-3 flex gap-3 items-center hover:bg-red-50/50 transition-colors"
                                onclick={() => toggleIssue(issue.id)}
                            >
                                <div class="text-red-500 bg-red-50 p-1.5 rounded shrink-0">
                                    <Warning size={16} />
                                </div>
                                <div class="grow">
                                    <p class="font-medium text-red-900 text-sm">{issue.warning}</p>
                                </div>
                                <div class="text-stone-300 group-hover:text-stone-500 transform transition-transform duration-200 {expandedIssueId === issue.id ? 'rotate-180' : ''}">
                                    <CaretDown size={16} />
                                </div>
                            </button>

                            {#if expandedIssueId === issue.id && issue.advice}
                                <div class="bg-stone-50 px-4 py-3 border-t border-stone-100 pl-[3.25rem]" transition:slide={{ duration: 200 }}>
                                    <div class="flex gap-3 text-sm text-stone-700 items-start">
                                        <span class="text-emerald-600 font-bold text-xs uppercase mt-0.5 shrink-0">Tip:</span>
                                        <p class="leading-relaxed">{issue.advice}</p>
                                    </div>
                                </div>
                            {/if}
                        </div>
                    {/each}
                </div>
            {:else}
                <div class="flex items-center justify-center h-32 bg-emerald-50/50 rounded-lg border border-emerald-100 border-dashed text-center p-4">
                    <div class="flex flex-col items-center">
                        <div class="text-emerald-500 mb-2">
                            <CheckCircle size={32} />
                        </div>
                        <p class="text-emerald-900 font-bold text-sm">Optimale groeiomstandigheden</p>
                        <p class="text-emerald-700 text-xs">Geen stressfactoren gedetecteerd.</p>
                    </div>
                </div>
            {/if}

        </div>
      </div>
    {/if}
  </div>
</div>