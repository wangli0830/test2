<template>
  <div class="stark">

    <RichStark msg="Welcome to Your Vue.js App"/>
  </div>
</template>


<script>
// @ is an alias to /src
import RichStark from '@/components/RichStark.vue'

export default {
  name: 'Stark',
  components: {
    RichStark
  }
}
</script>