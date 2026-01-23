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

    setSearch(query: string) {
        this.searchQuery = query;
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