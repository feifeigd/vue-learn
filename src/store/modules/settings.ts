import defaultSettings from '@/settings';
import elementVariables from '@/styles/element-variables.scss'; // .d.ts
import { Module, VuexModule, getModule, Mutation, Action } from 'vuex-module-decorators';
import store from '@/store';

export interface ISettingsState {
    fixedHeader: boolean;
    showSettings: boolean;
    showSidebarLogo: boolean;
    showTagsView: boolean;
    sidebarTextTheme: boolean;
    theme: string;
}

@Module({ dynamic: true, store, name: 'settings' })
class Settings extends VuexModule implements ISettingsState {
    public fixedHeader = defaultSettings.fixedHeader;
    public showSettings = defaultSettings.showSettings;
    public showSidebarLogo = defaultSettings.showSidebarLogo;
    public showTagsView = defaultSettings.showTagsView;
    public sidebarTextTheme = defaultSettings.sidebarTextTheme;
    public theme = elementVariables.theme;

    @Mutation
    private CHANGE_SETTING(payload: { key: string, value: any }){
        const { key, value } = payload;
        if (Object.prototype.hasOwnProperty.call(this, key)) {
            (this as any)[key] = value;
        }
    }

    @Action
    public ChangeSetting(payload: { key: string, value: any }){
        this.CHANGE_SETTING(payload);
    }
}

export const SettingsModule = getModule(Settings);
