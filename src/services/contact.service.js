'use strict'

import { dbService } from './db.service.js'

const KEY = 'contact'

export const contactService = {
   query,
   get,
   remove,
   save,
   getEmptyContact,
}  

async function query() {
   var contacts = await dbService.query(KEY)
   console.log(contacts)
   
   if (!contacts || !contacts.length) {
      contacts = _createDefaultContacts()
      await dbService.insert(KEY, contacts)
   }
   return contacts
}

async function get(id) {
   return await dbService.get(KEY, id)
}

async function remove(id) {
   return await dbService.remove(KEY, id)
}

async function save(contact) {
   if (contact._id) return await dbService.put(KEY, contact)
   else return await dbService.post(KEY, contact)
}

function getEmptyContact() {
   return {
      name: '',
      email: '',
      phone: '',
      url: ''
   }
}

function _createDefaultContacts() {
   return [
      _createContact('Terry Little', 'terry.little@yahoo.com', '(739)-400-4471', 'https://randomuser.me/api/portraits/men/52.jpg'),
      _createContact('Michelle Willis', 'michelle.willis@gmail.com', '(537)-634-2658', 'https://randomuser.me/api/portraits/women/57.jpg'),
      _createContact('Clinton Alexander', 'clinton.alexander@gmail.com', '(725)-524-7787', 'https://randomuser.me/api/portraits/men/14.jpg'),
      _createContact('Willard Lee', 'willard.lee@gmail.com', '(598)-420-8635', 'https://randomuser.me/api/portraits/men/58.jpg'),
      _createContact('Donald May', 'donald.may@gmail.com', '(074)-879-3101', 'https://randomuser.me/api/portraits/men/35.jpg'),
      _createContact('Lee Davidson', 'lee.davidson@gmail.com', '(647)-573-6561', 'https://randomuser.me/api/portraits/women/60.jpg'),
      _createContact('Kaylee Wade', 'kaylee.wade@gmail.com', '(873)-740-3674', 'https://randomuser.me/api/portraits/men/2.jpg'),
   ]
}

function _createContact(name, email, phone, url) {
   return { name, email, phone, url }
}
