
<script>
import { contactService } from '@/services/contact.service.js'
import TransferFund from '@/components/TransferFund.vue'
import MoveList from '@/components/MoveList.vue'

export default {
   data() {
      return {
         contact: null,
         user: this.$store.getters.user || {}
      }
   },
   methods: {
      back() {
         this.$router.push('/contact')
      },
      onUpdateUser(user) {
         this.user = user
      }
   },
   async created() {
      const _id = this.$route.params._id
      this.contact = await contactService.get(_id)
   },

   components: {
      TransferFund,
      MoveList
   }
}
</script>

<template>
   <img
      class="img-contact"
      src="https://images.unsplash.com/uploads/141103282695035fa1380/95cdfeef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1430&q=80"
      alt=""
   />
   <div v-if="contact" class="contact-details">
      <div class="details-container">
         <div class="btn-container">
            <button @click="back">Back</button>
            <RouterLink :to="`/contact/edit/${contact._id}`">Edit</RouterLink>
         </div>
         <hr />

         <img v-bind:src="this.contact.url" alt="" />
         <h2>{{ contact.name }}</h2>
         <h3>Email: {{ contact.email }}</h3>
         <h3>Phone: {{ contact.phone }}</h3>
         <TransferFund :contact="contact" :user="user" :onUpdateUser="onUpdateUser" />
         <MoveList :contact="contact" :moves="user.moves" />
      </div>
   </div>
   <p v-else>Loading...</p>
</template>

<style lang="scss">
.contact-details {
   display: flex;
   justify-content: center;
   flex-direction: column;
   align-items: center;

   .details-container {
      min-width: 360px;
      width: 50%;
      margin-top: 60px;
      margin-bottom: 60px;
      padding: 10px;

      h2,
      h3 {
         margin: 10px;
         margin-left: 0px;
      }

      .btn-container {
         display: flex;
         justify-content: space-between;
         width: 100%;
         a {
            color: #121212;
            text-decoration: none;
            font-size: 16px;
            &:hover {
               color: green;
               cursor: pointer;
            }
         }
         button {
            font-family: BlinkMacSystemFont;
            font-size: 16px;
            border: unset;
            background-color: unset;
            padding: 0;
            &:hover {
               color: blue;
               cursor: pointer;
            }
         }
      }
   }
}
</style>