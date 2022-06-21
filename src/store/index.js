import { createStore } from 'vuex'
import contact from './modules/contact.js'
import user from './modules/user.js'

// Create a new store instance.
const storeOptions = {
   strict: true,

   modules: {
      contact,
      user
   }
}
const store = createStore(storeOptions)
export default store