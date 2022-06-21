
<template>
   <AppHeader />
   <main class="route">
      <RouterView />
   </main>
   <AppFooter />
   <UserMsg />
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import UserMsg from '@/components/UserMsg.vue'
export default {
   components: {
      AppHeader,
      AppFooter,
      UserMsg
   }
}
</script>

<style>
/* @import "@/assets/base.css"; */
* {
   box-sizing: border-box;
}
body {
   margin: 0;
   font-family: BlinkMacSystemFont;
}

</style>
