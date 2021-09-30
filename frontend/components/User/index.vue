<template>
    <div>      
        <SuccessNotification :message="response" v-if="response"/>
        <Notification :message="error" v-if="error"/>
        <button class="btn btn-success">
            <nuxt-link
                class="nav-link active"
                aria-current="page"
                to="/createUser"
                >
                Create      
            </nuxt-link>
        </button>

      <table class="table">
        <thead>
          <tr>
            <th scope="col">Full Name</th>
            <th scope="col">Email</th>
            <th scope="col">Password</th>
          </tr>
        </thead>
        <LoadingBar v-if="loading" :loading="loading"/>
        <tbody v-if="!loading">
          <tr  v-for="user in pageOfUsers" v-bind:key="user._id">
            <td><b-form-input
                    v-if="user.isEditable"
                    id="fullname"
                    v-model="user.fullname"
                    type="text"
                    :class="{'editable': user.isEditable}"
                    >
                </b-form-input>
                {{!user.isEditable ? user.fullname : ''}}
            </td>
            <td>
                <b-form-input
                    v-if="user.isEditable"
                    id="email"
                    v-model="user.email"
                    type="email"
                    :class="{'editable': user.isEditable}"
                    >
                </b-form-input>
                {{!user.isEditable ? user.email : ''}}
            </td>
            <td>
                <b-form-input
                    v-if="user.isEditable"
                    id="password"
                    v-model="user.password"
                    type="password"
                    :class="{'editable': user.isEditable}"
                    >
                </b-form-input>
                {{!user.isEditable ? user.password : ''}}</td>
            <td><button class="btn btn-primary" v-on:click="edit(user._id)">{{!user.isEditable ? 'Edit' : 'Update'}}</button></td>
            <td><button class="btn btn-danger" v-on:click="deleteUser(user._id)">Delete</button></td>
          </tr>
        </tbody>
      </table>
       <Pagination :items="users" @changePage="onChangePage" :pageSize="5"></Pagination>
    </div>
  </template>

  <script>
    import SuccessNotification from '../SuccessNotification';
    import LoadingBar from '../LoadingBar';
    import Pagination from 'jw-vue-pagination';

    export default {
        components: {
            SuccessNotification,
            LoadingBar,
            Pagination
        }, 
        data() {
            return {
                users: [],
                response: "",
                error: null,
                loading: false,
                pageOfUsers: []
            };
        },
     
        mounted() {
            this.fetchUser()
        },
       
        methods: {
            fetchUser() {
                this.$axios.$get("api/auth/users")
                .then(res => {
                    this.rows = res.user.length
                    this.users = res.user.map(user => ({isEditable: false, ...user}))
                })
                .catch(err => {
                    this.error = err.response
                })  
            },
            edit(_id) {
                this.users.forEach(user => {
                    if(user._id == _id){
                        user.isEditable = !user.isEditable
                        if(user.isEditable == false) {
                            this.loading = true;
                            this.$axios.$put("/api/auth/edit", {
                                _id: _id,
                                fullname: user.fullname,
                                email: user.email,
                                password: user.password
                            })
                            .then(res => {
                                this.loading = false;
                                this.response = res.message
                                setTimeout(() => this.response = "", 1000);
                                this.users = res.user.map(user => ({isEditable: false, ...user}))
                            })
                            .catch(err => {
                                this.error = err.response;
                            })
                        }
                    }
                }) 
            },
            deleteUser(id) {
                this.loading = true;
                this.$axios.$post("api/auth/delete", {
                    _id: id
                })
                .then(res => {
                    this.response = res.message;
                    this.response = res.message
                    setTimeout(() => this.response = "", 1000);
                    this.users = res.user.map(user => ({isEditable: false, ...user}))
                    this.loading = false;
                })
                .catch(err => {
                    this.error = err.response
                })
            },
            onChangePage(pageOfUsers) {
                console.log("page", pageOfUsers)
                this.pageOfUsers = pageOfUsers
            }
        }
    };
  </script>

<style>
    a {
        color: white;
    }

    .editable {
        border: 2px solid green;
    }
    
</style>