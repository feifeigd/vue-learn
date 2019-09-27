import { VuexModule, getModule } from 'vuex-module-decorators';

export enum DeviceType {
    Mobile,
    Desktop,
}

export interface IAppState {
    device: DeviceType,
}

class App extends VuexModule implements IAppState {
    public device = DeviceType.Desktop;
}
export const AppModule = getModule(App);
