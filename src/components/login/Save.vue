<template>
  <li class="liauto"><span class="lititle">自动登录：</span><span :class="{switch:true, switch_on:autosave}" @click="change"><span></span></span></li>
</template>

<script>
  export default {
    name: 'Save',
    props: ['save'],
    data () {
      return {
        autosave: this.$props.save
      }
    },
    methods: {
      change () {
        this.autosave = !this.autosave
        this.$emit('changesave', this.autosave)
      }
    }
  }
</script>

<style>

</style>
