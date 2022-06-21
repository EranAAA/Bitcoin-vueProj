
<script>
import ContactPreview from '@/components/ContactPreview.vue'
export default {
   props: {
      contacts: {
         type: Array,
         required: true
      }
   },
   methods: {},
   components: {
      ContactPreview
   }
}
</script>

<template>
   <section class="contact-list">
      <!-- <TransitionGroup name="list"> -->
      <ul>
         <RouterLink :to="`/contact/details/${contact._id}`" v-for="contact in contacts" :key="contact._id" class="contact-preview-container">
            <ContactPreview :contact="contact" />
         </RouterLink>
      </ul>
      <!-- </TransitionGroup> -->
   </section>
</template>

<style lang="scss">
.contact-list {

   ul {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      padding: 0;
      margin-top: 0px;

      .contact-preview-container {
         box-shadow: 0 0 3px 0px;
         border-radius: 3px;
         min-width: 360px;
         width: 50%;
         padding: 10px;
         display: flex;
         text-decoration: none;
         color: #121212;

         &:hover {
            background-color: rgba(119, 136, 153, 0.2);
         }
      }
   }

   .list-move,
   .list-enter-active,
   .list-leave-active {
      transition: all 0.5s ease;
   }

   .list-enter-from,
   .list-leave-to {
      opacity: 0;
      transform: translateX(30px);
   }

   .list-leave-active {
      position: absolute;
   }
}
</style>