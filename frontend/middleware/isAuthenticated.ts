export default function({store, redirect}: {store: any, redirect: any}) {
    if(!store.state.auth.loggedIn) {
        return redirect("/")
    }
}