type SidebarID = 'none' | 'analyse' | 'settings';

class UIState {
    activeSidebar = $state<SidebarID>('none');

    toggleSidebar = (view: SidebarID) => {
        if (this.activeSidebar === view) {
            this.activeSidebar = 'none';
        } else {
            this.activeSidebar = view;
        }
    }

    close = () => {
        this.activeSidebar = 'none';
    }
}

export const ui = new UIState();