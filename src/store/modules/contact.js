import { contactService } from '@/services/contact.service.js'
export default {
   state: {
      contacts: [],
   },
   mutations: {
      setContacts(state, { contacts }) {
         state.contacts = contacts
      },
      removeContact(state, { contactId }) {
         const idx = state.contacts.findIndex(contact => contact._id === contactId)
         state.contacts.splice(idx, 1)
      },
      saveContact(state, { contact }) {
         const contactId = contact._id
         const idx = state.contacts.findIndex(contact => contact._id === contactId)
         if (idx === -1) {
            state.contacts.push(contact)
         } else {
            state.contacts.splice(idx, 1, contact)
         }
      }
   },
   actions: {
      async loadContacts(context) {
         const contacts = await contactService.query()
         context.commit({ type: 'setContacts', contacts })
      },
      async removeContact({ commit }, { contactId }) {
         await contactService.remove(contactId)
         commit({ type: 'removeContact', contactId })
      },
      async saveContact({ commit }, { contact }) {
         try {
            await contactService.save(contact)
            commit({ type: 'saveContact', contact })
         } catch (error) {
            throw error
         }
      }
   },
   getters: {
      contacts(state) { return state.contacts }
   }
}