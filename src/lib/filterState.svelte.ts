class FilterState {
    selectedLayer = $state<string | null>(null);

    setLayer(layer: string | null) {
        this.selectedLayer = layer;
    }
}

export const filterState = new FilterState();