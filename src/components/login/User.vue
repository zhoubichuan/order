<template>
  <li ><span class="lititle">账号：</span><input type="text" v-model="username" class="input" @keyup="chuser"><span class="close" @click="clear"></span></li>
</template>

<script>
  export default {
    name: 'User',
    props: ['user'],
    data () {
      return {
        username: this.$props.user
      }
    },
    methods: {
      chuser () {
        this.$emit('changeuser', this.username)
      },
      clear () {
        this.username = ''
        // 传回父系
        this.chuser()
      }
    }
  }
</script>

<style>

</style>
