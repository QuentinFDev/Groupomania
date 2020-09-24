<template>
  <div class="body">
    <div class="toggle" v-click-outside="hide" @click="toggle">Toggle</div>
    <div class="popup" v-show="opened">Popup item</div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'

export default {
  name: "test",
  data () {
    return {
      opened: false
    }
  },

  methods: {
    toggle () {
      this.opened = true
    },

    hide () {
      this.opened = false
    }
  },

  mounted () {
    // prevent click outside event with popupItem.
    this.popupItem = this.$el
  },

  // do not forget this section
  directives: {
    ClickOutside
  }
}
</script>

<style lang="scss" scoped>

.toggle{
    background-color: blue;
}
.popup{
    background-color: yellow;
}

</style>