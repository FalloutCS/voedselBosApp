class FilterState {
    selected = $state<Record<string, string>>({});
    searchQuery = $state("");

    set(key: string, value: string | null) {
        if (!value) {
            delete this.selected[key];
        } else {
            this.selected[key] = value;
        }
    }

    reset() {
        this.selected = {};
        this.searchQuery = "";
    }

    get(key: string) {
        return this.selected[key] || "";
    }
}

export const filterState = new FilterState();