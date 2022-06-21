<template>
   <header class="app-header">
      <h1 @click="home">₿itcoin</h1>
      <nav>
         <RouterLink to="/"><img src="../assets/home.svg" alt="" /> </RouterLink>
         <RouterLink to="/contact"><img src="../assets/contact.svg" alt="" /> </RouterLink>
         <RouterLink to="/chart"><img src="../assets/chart.svg" alt="" /></RouterLink>
      </nav>
   </header>
</template>

<script>
export default {

   methods: {
      home() {
         this.$router.push('/')
      },
   }
}
</script>

<style lang="scss">
.app-header {
   display: flex;
   align-items: center;
   justify-content: space-between;
   height: 50px;
   border-bottom: 2px solid rgb(215, 138, 42);
   position: fixed;
   top: 0;
   width: 100%;
   background-color: #fff;
   h1 {
      margin: 10px;
      margin-top: 0px;
      margin-bottom: 0px;
      cursor: pointer;
   }

   nav {
      display: flex;
      gap: 70px;
      flex-grow: 1;
      justify-content: center;
      margin-inline-end: 125px;

      @media (max-width: 560px) {
         gap: 40px;
         justify-content: flex-end;
         margin-inline-end: 20px;
      }
      a {
         color: rgb(215, 138, 42);
         color: #121212;
         text-decoration: none;
         img {
            width: 30px;
         }
      }
   }
}
</style>