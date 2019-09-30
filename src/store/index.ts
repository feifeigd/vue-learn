import Vue from 'vue';
import Vuex from 'vuex';
import { IAppState } from './modules/app';
import { IUserState } from './modules/user';
import { IErrorLogState } from './modules/error-log';
import { IPermissionState } from './modules/permission';
import { ISettingsState } from './modules/settings';
import { ITagsViewState } from './modules/tags-view';

Vue.use(Vuex);

export interface IRootState {
    app: IAppState;
    errorLog: IErrorLogState,
    permission: IPermissionState,
    settings: ISettingsState,
    tagsView: ITagsViewState
    user: IUserState,
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({});
