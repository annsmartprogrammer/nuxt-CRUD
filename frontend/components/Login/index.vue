<template>
    <div>
        <p>Welcome to Login</p>
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
    export default {
        data() {
            return {
                loginData: {
                    email: "",
                    password: ""
                }
            };
        },
        methods: {
            async login() {
                try {
                    let response = await this.$auth.loginWith("local", {
                        data: this.loginData
                    });
                    this.$router.push("/");
                    console.log(response);
                }catch (err) {
                    console.log(err);
                }
            }
        }
        
    }
</script>

<style lang="scss" scoped>

</style>