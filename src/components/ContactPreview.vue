
<script>
export default {
   props: {
      contact: {
         type: Object,
         required: true
      }
   }
}
</script>

<template>
   <div class="contact-preview">
      <img v-bind:src="this.contact.url" alt="" />
      <h3>{{ contact.name }}</h3>
   </div>
</template>

<style lang="scss">
.contact-preview {
   display: flex;
   width: 100%;
   gap: 25px;
   align-items: center;
   img {
      border-radius: 100%;
      background-color: #fff;
      width: 80px;
      height: 80px;
   }
   h2 {
      flex-grow: 1;
   }
}
</style>