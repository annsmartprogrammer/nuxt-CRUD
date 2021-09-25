export const getters = {
    isAuthenticated(state: any) {
        return state.auth.loggedIn;
    },
    getUserInfo(state: any) {
        console.log(state.auth.user)
        return state.auth.user;
    }
}