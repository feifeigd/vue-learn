import request from '@/utils/request';

export const getUsers = (params: any) => request({
    url: '/users',
    method: 'get',
    params,
});

export const getUserInfo = (params: any) => request({
    url: '/users/info',
    method: 'post',
    params,
});


export const getUserByName = (username: string) => request({
    url: `/users/${username}`,
    method: 'get',
});

export const updateUser = (username: string, params: any) => request({
    url: `/users/${username}`,
    method: 'put',
    params,
});

export const deleteUser = (username: string) => request({
    url: `/users/${username}`,
    method: 'delete',
});

export const login = (params: any) => request({
    url: '/users/login',
    method: 'post',
    params,
});

export const logout = () => request({
    url: '/users/logout',
    method: 'post',
});

export const register = (params: any) => request({
    url: '/users/register',
    method: 'post',
    params,
});
