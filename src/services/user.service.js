'use strict'

import { dbService } from './db.service.js'
import { storageService } from '@/services/storage.service.js'
import { utilService } from '@/services/util.service.js'

const KEY = 'user'

export const userService = {
   query,
   get,
   remove,
   save,
   getEmptyUser,
   login,
   loggedInUser,
   logout,
   signup
}

async function query() {
   var users = await dbService.query(KEY)
   if (!users || !users.length) {
      users = _createDefaultUsers()
      await dbService.insert(KEY, users)
   }
   return users
}

async function get(id) {
   return await dbService.get(KEY, id)
}

async function login(id) {
   const user = await dbService.get(KEY, id)
   storageService.save('loggedInUser', user)
   return user
}

async function signup(name) {
   const user = getEmptyUser()
   const users = await query()

   user._id = utilService.makeId()
   user.name = name
   user.url = 'https://img.redro.pl/plakaty/bitcoin-symbol-icon-vector-blockchain-cryptocurrency-with-male-person-profile-avatar-for-digital-wallet-in-a-glyph-pictogram-illustratio-400-232299653.jpg'
   users.push(user)

   storageService.save('loggedInUser', user)
   storageService.save(KEY, users)

   return user
}

async function logout() {
   storageService.remove('loggedInUser')
}

async function loggedInUser() {
   var user = storageService.load('loggedInUser')
   if (!user) user = ''
   return Promise.resolve(user)
}

async function remove(id) {
   return await dbService.remove(KEY, id)
}

async function save(user) {
   storageService.save('loggedInUser', user)
   if (user._id) return await dbService.put(KEY, user)
   else return await dbService.post(KEY, user)
}

function getEmptyUser() {
   return {
      name: '',
      coins: 100,
      url: '',
      moves: []
   }
}

function _createDefaultUsers() {
   return [
      _createUser('Eran Avichzer', 10000, 'https://miro.medium.com/max/3150/0*un1JxapV2XzlNgpA', []),
      _createUser('Larry Ellis', 854, 'https://randomuser.me/api/portraits/women/64.jpg', []),
      _createUser('Dolores Austin', 7510, 'https://randomuser.me/api/portraits/women/33.jpg', []),
      _createUser('Colleen Ramirez', 108, 'https://randomuser.me/api/portraits/men/75.jpg', []),
   ]
}

function _createUser(name, coins, url, moves) {
   return { name, coins, url, moves }
}
