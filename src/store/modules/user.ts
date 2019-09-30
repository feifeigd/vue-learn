import { getToken, setToken, removeToken } from '@/utils/cookies';
import { login, logout, getUserInfo, } from '@/api/users';
import { Module, VuexModule, getModule, Mutation, Action } from 'vuex-module-decorators';
import { PermissionModule } from './permission';
import router, { resetRouter } from '@/router';
import store from '@/store/index';
import { TagsViewModule } from './tags-view';

export interface IUserState {
    avatar: string;
    email: string;
    introduction: string;
    name: string;
    roles: string[];
    token: string;
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
    public avatar = '';
    public email = '';
    public introduction = '';
    public name = '';
    public roles: string[] = [];
    public token = getToken() || '';

    @Mutation
    private SET_TOKEN(token: string){
        this.token = token;
    }

    @Mutation
    private SET_NAME(name: string){
        this.name = name;
    }

    @Mutation
    private SET_AVATAR(avatar:string){
        this.avatar = avatar;
    }

    @Mutation
    private SET_INTRODUCTION(introduction: string){
        this.introduction = introduction;
    }

    @Mutation
    private SET_ROLES(roles: string[]){
        this.roles = roles;
    }

    @Mutation
    private SET_EMAIL(email:string){
        this.email = email;
    }

    @Action
    public async Login(userInfo: { username: string, password: string }){
        let { username, password } = userInfo;
        username = username.trim();
        password = password.trim();
        const { data } = await login({ username, password });
        setToken(data.accessToken);
        this.SET_TOKEN(data.accessToken);
    }

    @Action
    public ResetToken(){
        removeToken();
        this.SET_TOKEN('');
        this.SET_ROLES([]);
    }

    @Action
    public async GetUserInfo(){
        if (this.token === ''){
            throw Error('GetUserInfo: token is undefined!');
        }
        const { data } = await getUserInfo({ /* your params here */});
        if (!data) {
            throw Error('Verification failed, please Login again.');
        }
        const { roles, name, avatar, introduction, email } = data;
        // roles must be a non-empty array
        if (!roles || roles.length <= 0){
            throw Error('GetUserInfo: roles must be a non-null array!');
        }

        this.SET_ROLES(roles);
        this.SET_NAME(name);
        this.SET_AVATAR(avatar);
        this.SET_INTRODUCTION(introduction);
        this.SET_EMAIL(email);
    }

    @Action
    public async ChangeRoles(role: string){
        // Dynamically modiby permissions
        const token = role + '-token';
        this.SET_TOKEN(token);
        setToken(token);
        await this.GetUserInfo();
        resetRouter();
        // Generate dynamic accessible routes based on rolse
        PermissionModule.GenerateRoutes(this.roles);
        // Add generated routes
        router.addRoutes(PermissionModule.dynamicRoutes);
        // Reset visited views and cached views
        TagsViewModule.delAllViews();
    }

    @Action
    public async LogOut(){
        if (this.token === ''){
            throw Error('LogOut: token is undefined!');
        }
        await logout();
        removeToken();
        resetRouter();
        this.SET_TOKEN('');
        this.SET_ROLES([]);
    }
}

export const UserModule = getModule(User);

/* const state = {
    auth: {},
    info: {
      data: 'store data from user.ts'
    },
};

const getters = {
    info: (s: any) => s.info,
};

export default {
    state,
    getters
}; */
