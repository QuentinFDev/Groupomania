<template>
<div class="body">
    <headerforum/>
    <postforum/>
</div>
</template>

<script>
import headerforum from '@/components/HeaderForum.vue'
import postforum from '@/components/PostForum'

export default {
  name: "Forum",
  components: {
    headerforum,
    postforum
  },
}
</script>

<style scoped lang="scss">

</style>