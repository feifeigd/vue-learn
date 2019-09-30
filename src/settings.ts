interface ISettings {
    fixedHeader: boolean;   // If true, will fix the header component
    showSettings: boolean;  // Controls settings pannel display
    showSidebarLogo: boolean;   // Controls settings panel display
    showTagsView: boolean;  // Controls tagsview display
    sidebarTextTheme: boolean;  // If true, will change active text color for side bar based on theme
    title: string;  // Overrides the default title

}

const settings: ISettings = {
    fixedHeader: false,
    showSettings: true,
    showSidebarLogo: false,
    showTagsView: true,
    sidebarTextTheme: true,
    title: 'Vue Typescript Admin',
}

export default settings;
