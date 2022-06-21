
<script>
import { eventBus } from '@/services/eventBus.service.js'
import { contactService } from '@/services/contact.service.js'
export default {
   data() {
      return {
         contact: null
      }
   },

   methods: {
      async save() {
         await this.$store.dispatch({ type: 'saveContact', contact: this.contact })
         this.$router.push('/contact')
      },
      back() {
         this.$router.push('/contact')
      },
      async removeContact(contactId) {
         await this.$store.dispatch({ type: 'removeContact', contactId })
         this.$router.push('/contact')

         eventBus.emit('user-msg', {
            txt: `Contact ${contactId} Deleted`,
            type: 'success',
            timeout: 2000
         })
      }
   },

   async created() {
      const _id = this.$route.params._id
      if (_id) this.contact = await contactService.get(_id)
      else this.contact = await contactService.getEmptyContact()
   }
}
</script>

<template>
   <img
      class="img-contact"
      src="https://images.unsplash.com/uploads/141103282695035fa1380/95cdfeef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1430&q=80"
      alt=""
   />
   <div class="contact-edit">
      <div class="edit-container">
         <div class="btn-container">
            <button @click="back">Back</button>
            <button @click="save">Save</button>
            <button @click="removeContact(contact._id)">Delete</button>
         </div>
         <hr />

         <form v-if="contact" @submit.prevent="save">
            <label for="">
               Name:
               <input v-model="contact.name" type="text" />
            </label>
            <label for="">
               Email:
               <input v-model="contact.email" type="email" />
            </label>
            <label for="">
               Phone:
               <input v-model="contact.phone" type="text" />
            </label>
            <label for="">
               Image URL:
               <input v-model="contact.url" type="text" />
            </label>

            <img v-bind:src="this.contact.url" alt="" />
         </form>
      </div>
   </div>
</template>

<style lang="scss">
.contact-edit {
   display: flex;
   justify-content: center;
   flex-direction: column;
   align-items: center;

   .edit-container {
      min-width: 360px;
      width: 50%;
      margin-top: 60px;
      margin-bottom: 60px;
      gap: 10px;
      padding: 10px;

      .btn-container {
         display: flex;
         justify-content: space-between;
         width: 100%;
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

      form {
         display: flex;
         flex-direction: column;
         align-items: flex-start;
         font-size: 14px;
         gap: 10px;

         label {
            width: 350px;
         }
         input {
            width: 350px;
         }
      }
   }
}
</style>