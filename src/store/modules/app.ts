import { VuexModule, getModule, Module, Mutation, Action } from 'vuex-module-decorators';
import { getSidebarStatus, getSize, setSidebarStatus, setLanguage, setSize } from '@/utils/cookies';
import { getLocale } from '@/lang';

import store from '@/store';

export enum DeviceType {
    Mobile,
    Desktop,
}

export interface IAppState {
    device: DeviceType;
    language: string;
    sidebar: {
        opened: boolean,
        withoutAnimation: boolean,
    };
    size: string;
}

@Module({ dynamic: true, store, name: 'app' })
class App extends VuexModule implements IAppState {
    public device = DeviceType.Desktop;
    public language = getLocale();
    public sidebar = {
        opened: getSidebarStatus() !== 'closed',
        withoutAnimation: false,
    };
    public size = getSize() || 'medium';

    @Action
    public ToggleSideBar(withoutAnimation: boolean){
        this.TOGGLE_SIDEBAR(withoutAnimation);
    }

    @Action
    public CloseSideBar(withoutAnimation: boolean){
        this.CLOSE_SIDEBAR(withoutAnimation);
    }

    @Action
    public ToggleDevice(device: DeviceType){
        this.TOGGLE_DEVICE(device);
    }

    @Action
    public SetLanguage(language: string){
        this.SET_LANGUAGE(language);
    }

    @Action
    public SetSize(size: string){
        this.SET_SIZE(size);
    }

    @Mutation
    private TOGGLE_SIDEBAR(withoutAnimation: boolean){
        this.sidebar.opened = !this.sidebar.opened;
        this.sidebar.withoutAnimation = withoutAnimation;
        setSidebarStatus(this.sidebar.opened ? 'opened' : 'closed');
    }

    @Mutation
    private CLOSE_SIDEBAR(withoutAnimation: boolean){
        this.sidebar.opened = false;
        this.sidebar.withoutAnimation = withoutAnimation;
        setSidebarStatus('closed');
    }

    @Mutation
    private TOGGLE_DEVICE(device: DeviceType){
        this.device = device;
    }

    @Mutation
    private SET_LANGUAGE(language: string){
        this.language = language;
        setLanguage(language);
    }

    @Mutation
    private SET_SIZE(size: string){
        this.size = size;
        setSize(size);
    }
}
export const AppModule = getModule(App);
