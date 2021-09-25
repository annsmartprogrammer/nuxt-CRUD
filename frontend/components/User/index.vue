<template>
    <div>
      <nuxt-link
        class="nav-link active"
        aria-current="page"
        to="/createUser"
        >
        <button class="btn btn-success">Create</button>
      </nuxt-link>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Full Name</th>
            <th scope="col">Email</th>
            <th scope="col">Password</th>
          </tr>
        </thead>
        <tbody>
          <tr  v-for="user in getUserInfo" v-bind:key="user._id">
            <td>{{ user.fullname }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.password }}</td>
            <td><button class="btn btn-primary">Edit</button></td>
            <td><button class="btn btn-danger">Delete</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>

  <script>
  export default {
    computed: {
      getUserInfo() {
        return this.$store.getters.getUserInfo;
      }
    },
  };
  </script>

<style lang="scss" scoped>

</style>