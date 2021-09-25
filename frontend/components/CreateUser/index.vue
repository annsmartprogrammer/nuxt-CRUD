<template>
    <div>
        <Notification :message="error" v-if="error"/>
        <b-form @submit.prevent="create">
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

    export default {  
        components: {
            Notification,
        },    
        data() {
            return {
                createUserData: {
                    fullname: "",
                    email: "",
                    password: ""
                },
                error: null
            };
        },
        methods: {
            async create() {
                try {
                    let response  = await this.$axios.$post("/api/auth/createuser", {
                        fullname: this.createUserData.fullname,
                        email: this.createUserData.email,
                        password: this.createUserData.password
                    });
                    console.log(response)
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