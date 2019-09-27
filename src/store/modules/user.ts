const state = {
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
};
