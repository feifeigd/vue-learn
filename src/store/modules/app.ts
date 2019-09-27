import { VuexModule, getModule } from 'vuex-module-decorators';
import { getSidebarStatus } from '@/utils/cookies';
export enum DeviceType {
    Mobile,
    Desktop,
}

export interface IAppState {
    device: DeviceType,
    sidebar: {
        opened: boolean,
        withoutAnimation: boolean,
    }
}

class App extends VuexModule implements IAppState {
    public device = DeviceType.Desktop;
    public sidebar = {
        opened: getSidebarStatus() !== 'closed',
        withoutAnimation: false,
    };
}
export const AppModule = getModule(App);
