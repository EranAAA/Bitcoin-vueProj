
<script>
import ContactList from '@/components/ContactList.vue'
import ContactFilter from '@/components/ContactFilter.vue'
export default {
   data() {
      return {
         filterBy: { txt: '' }
      }
   },

   methods: {
      onFilter(filterBy) {
         this.filterBy = filterBy
      }
   },

   computed: {
      contactsToShow() {
         const regex = new RegExp(this.filterBy.txt, 'i')
         return this.contacts.filter(contact => regex.test(contact.name) || regex.test(contact.phone) || regex.test(contact.email))
      },
      contacts() {
         return this.$store.getters.contacts
      }
   },

   async created() {
      this.$store.dispatch({ type: 'loadContacts' })
   },

   components: {
      ContactList,
      ContactFilter
   }
}
</script>

<template >
   <img
      class="img-contact"
      src="https://images.unsplash.com/uploads/141103282695035fa1380/95cdfeef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1430&q=80"
      alt=""
   />
   <div v-if="contacts" class="contact-app">
      <ContactFilter @filter="onFilter" />
      <RouterLink class="new-btn" :to="`/contact/edit`">Add new contact</RouterLink>
      <ContactList :contacts="contactsToShow" />
   </div>
</template>

<style lang="scss">
.img-contact {
   position: fixed;
   opacity: 0.15;
   z-index: -1;
   height: 100%;
}
.contact-app {
   margin-top: 60px;
   margin-bottom: 60px;
   display: flex;
   flex-direction: column;
   gap: 10px;

   .new-btn {
      text-align: center;
      color: #121212;
      text-decoration: none;
      font-size: 16px;
      font-weight: bold;
      &:hover {
         color: green;
         cursor: pointer;
      }
   }
}
</style>