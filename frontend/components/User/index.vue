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
        <tbody>
          <tr  v-for="(user, index) in getUserInfo" v-bind:key="index">
            <td><b-form-input
                    v-if="user.isEditable"
                    :id="user._id"
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
            <td><button class="btn btn-primary" v-on:click="edit(index, user._id)">{{!user.isEditable ? 'Edit' : 'Update'}}</button></td>
            <td><button class="btn btn-danger" v-on:click="deleteUser(user._id)">Delete</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>

  <script>
    import SuccessNotification from '../SuccessNotification';

    export default {
        components: {
            SuccessNotification,
        }, 
        data() {
            return {
                editData: {
                    fullname: "",
                    email: "",
                    password: ""
                },
                users: [],
                response: "",
                error: null,
            };
        },
        computed: {
            getUserInfo() {
                return this.users;
            }
        },
        created() {
            this.users = this.$store.getters.getUserInfo.map(user => ({isEditable: false, ...user}));
        },
        methods: {
            edit(index, _id) {
                this.users[index].isEditable = !this.users[index].isEditable;
                console.log("edit data", this.users[index].fullname, this.users[index].email, this.users[index].password )
                if(this.users[index].isEditable == false)
                    this.$axios.$put("/api/auth/edit", {
                        _id: _id,
                        fullname: this.users[index].fullname,
                        email: this.users[index].email,
                        password: this.users[index].password
                    })
                    .then(res => {
                        this.response = res;
                    })
                    .catch(err => {
                        this.error = err.response;
                    })
            },
            deleteUser(id) {
                this.$axios.$post("api/auth/delete", {
                    _id: id
                })
                .then(res => {
                    this.response = res
                })
                .catch(err => {
                    this.error = err.response
                })
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