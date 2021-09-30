<template>
    <div>
        <Notification :message="error" v-if="error"/>
        <LoadingBar v-if="loading" :loading = loading />
        <b-form @submit.prevent="createUser" v-if="!loading">
              <b-form-group
                id="fullname-label"
                label="Full Name:"
                label-for="fullname"
                >
                <b-form-input
                    id="fullname"
                    v-model="createUserData.fullname"
                    type="text"
                    placeholder="Enter Full Name"
                    required
                    >
                </b-form-input>
              </b-form-group>
              <b-form-group
                id="email-label"
                label="Email address:"
                label-for="email"
                >
                <b-form-input
                    id="email"
                    v-model="createUserData.email"
                    type="email"
                    placeholder="Enter email"
                    required
                    >
                </b-form-input>
            </b-form-group>
            <b-form-group
                id="password-label"
                label="Password:"
                label-for="password"
                >
                <b-form-input
                    id="password"
                    v-model="createUserData.password"
                    type="password"
                    placeholder="Password"
                    required
                ></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Create User</b-button>
        </b-form>
    </div>
</template>

<script> 
    import Notification from '../Notification';
    import LoadingBar from '../LoadingBar';

    export default {  
        components: {
            Notification,
            LoadingBar,
        },    
        data() {
            return {
                createUserData: {
                    fullname: "",
                    email: "",
                    password: ""
                },
                error: null,
                loading: false
            };
        },
        methods: {
            createUser() {
                this.loading = true;
                this.$axios.$post("/api/auth/createuser", {
                    fullname: this.createUserData.fullname,
                    email: this.createUserData.email,
                    password: this.createUserData.password
                })
                .then(res => {
                    console.log(res)
                    this.loading = false;
                    window.alert(res)
                    this.$router.push("/users");
                })
                .catch(error => {
                    console.log(error)
                    this.loading = false
                    this.error = error.response;
                })
        }
        }
        
    }
</script>

<style lang="scss" scoped>

</style>