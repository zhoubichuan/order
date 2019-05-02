<template>
  <li><span class="lititle">密码：</span><input type="password" v-model="password" @keyup="chpass"  class="input"><span class="close" @click="clear"></span></li>
</template>

<script>
  export default {
    name: 'Pass',
    props: ['pass'],
    data () {
      return {
        password: this.$props.pass
      }
    },
    methods: {
      chpass () {
        this.$emit('changepass', this.password)
      },
      clear () {
        this.password = ''
        this.chpass()
      }
    }
  }
</script>

<style>

</style>
