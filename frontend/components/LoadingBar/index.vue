<template>
  <div v-if="loading" class="loading"></div>
</template>
<script>
  export default {
   name: "LoadingBar",
   props: ['loading']
  }
</script>
<style scoped>
  .loading {
    display: inline-block;
    right: 50%;
    top: 50%;
    position: fixed;
    width: 5rem;
    height: 5rem;
    border: 10px solid rgba(9, 133, 81, 0.705);
    border-radius: 50%;
    border-radius: 50%;
    border-top-color: #158876;
    animation: spin 1s ease-in-out infinite;
    align-items: center;
  }
  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
</style>
