<template>
    <div>
        <p>Welcome to Login</p>
        <Notification :message="error" v-if="error"/>
        <b-form @submit.prevent="login">
              <b-form-group
                id="email-label"
                label="Email address:"
                label-for="email"
                >
                <b-form-input
                    id="email"
                    v-model="loginData.email"
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
                    v-model="loginData.password"
                    type="password"
                    placeholder="Password"
                    required
                ></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">login</b-button>
        </b-form>
    </div>
</template>

<script> 
    import Notification from '../../Notification';

    export default {  
        components: {
            Notification,
        },   

        data() {
            return {
                loginData: {
                    email: "",
                    password: ""
                },
                error: null
            };
        },
        methods: {
            async login() {
                try {
                    let response = await this.$auth.loginWith("local", {
                        data: this.loginData
                    });
                    this.$router.push("/users");
                }catch (err) {
                    this.error = err.response.data.message;
                }
            }
        }
        
    }
</script>

<style lang="scss" scoped>

</style>