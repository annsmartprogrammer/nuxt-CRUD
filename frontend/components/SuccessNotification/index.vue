<template>
  <div class="notification is-success">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'SuccessNotification',
  props: ['message']
}
</script>