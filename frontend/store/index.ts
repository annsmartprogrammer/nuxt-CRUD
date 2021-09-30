export const getters = {
    isAuthenticated(state: any) {
        return state.auth.loggedIn;
    },
    getUserInfo(state: any) {
        return state.auth.user;
    }
}