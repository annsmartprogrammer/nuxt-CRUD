<template>
    <div>
        <createUser />
    </div>
</template>

<script>
    export default {
        middleware: "isAuthenticated"
    }
</script>

<style lang="scss" scoped>

</style>