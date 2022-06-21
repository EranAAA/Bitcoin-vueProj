import { userService } from '@/services/user.service.js'
import { resolveComponent } from 'vue'

export default {
   state: {
      users: [],
      user: JSON.parse(localStorage.getItem('loggedInUser')) || {},
   },
   mutations: {
      setUsers(state, { users }) {
         state.users = users
      },
      setUser(state, { user }) {
         state.user = user
      },
      removeUser(state, { userId }) {
         const idx = state.users.findIndex(user => user._id === userId)
         state.users.splice(idx, 1)
      },
      saveUser(state, { user }) {
         const userId = user._id
         const idx = state.users.findIndex(user => user._id === userId)
         if (idx === -1) {
            state.users.push(user)
         } else {
            state.users.splice(idx, 1, user)
            state.user = user
         }
      }
   },
   actions: {
      async loadUsers(context) {
         const users = await userService.query()
         context.commit({ type: 'setUsers', users })
      },

      async login({ commit, state }, { name }) {
         const idx = state.users.findIndex(user => user.name === name)
         if (idx >= 0) {
            const user = await userService.login(state.users[idx]._id)
            await userService.get(state.users[idx]._id)
            commit({ type: 'setUser', user })
            return Promise.resolve(user)
         } else {
            return Promise.reject('Not found user')
         }
      },

      async signup({ commit }, { name }) {
         const user = await userService.signup(name)
         commit({ type: 'saveUser', user })
         commit({ type: 'setUser', user })
         return Promise.resolve(user)
      },

      async logout({ commit }) {
         await userService.logout()
         commit({ type: 'setUser', user: {} })
      },

      async removeUser({ commit }, { userId }) {
         await userService.remove(userId)
         commit({ type: 'removeUser', userId })
      },

      async saveUser({ commit }, { user }) {
         try {
            await userService.save(user)
            commit({ type: 'saveUser', user })
            return Promise.resolve(user)
         } catch (error) {
            throw error
         }
      }
   },
   getters: {
      users(state) { return state.users },
      user(state) { return state.user }
   }
}