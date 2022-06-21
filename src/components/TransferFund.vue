
<script>
import { eventBus } from '@/services/eventBus.service.js'

export default {
   props: {
      contact: {
         type: Object,
         required: true
      },
      user: {
         type: Object,
         required: true
      },
      onUpdateUser: {
         type: Function,
         required: true
      }
   },

   data() {
      return {
         amount: '',
         isMsgOn: false,
         msg: ''
      }
   },

   methods: {
      async onTransferFund() {
         const updatedUser = { ...this.user }
         if (updatedUser.coins < this.amount) {
            this.showMsg('No sufficient funds', 4000)
         } else if (this.amount <= 0 || !this.amount) {
            this.showMsg(`Can't transfer zero or negative funds`, 4000)
         } else {
            updatedUser.coins -= this.amount
            const moves = [...updatedUser.moves]
            moves.push({
               toId: this.contact._id,
               to: this.contact.name,
               at: Date.now(),
               amount: this.amount
            })
            eventBus.emit('user-msg', {
               txt: `Coins transfer Successfully`,
               type: 'success',
               timeout: 2000
            })
            updatedUser.moves = moves
            const user = await this.$store.dispatch({ type: 'saveUser', user: updatedUser })
            this.onUpdateUser(user)
         }
         this.amount = ''
      },
      showMsg(msg, time) {
         this.msg = msg
         this.isMsgOn = !this.isMsgOn
         const intervalId = setTimeout(() => {
            this.isMsgOn = false
            this.msg = ''
            clearInterval(intervalId)
         }, time)
      }
   }
}
</script>

<template>
   <section class="transfer-fund">
      <div class="title">
         Transfer coins to {{ contact.name }} <span>(max transfer: ${{ user.coins.toLocaleString() }})</span>
      </div>
      <label for=""
         >Amount:
         <input placeholder="" v-model="amount" min="0" :max="user.coins" type="number" />
         <button @click="onTransferFund">Transfer</button>
         <p class="fund-msg" v-if="isMsgOn">{{ msg }}</p>
      </label>
   </section>
</template>

<style lang="scss">
.transfer-fund {
   background-color: lightblue;
   border-radius: 10px;
   padding: 20px;
   padding-top: 5px;
   padding-bottom: 5px;
   line-height: 40px;
   display: flex;
   flex-direction: column;
   line-height: 35px;

   .fund-msg {
      display: inline;
      margin-left: 10px;
      font-size: 14px;
   }

   span {
      font-size: 14px;
      color: gray;
      display: inline;
   }

   input {
      background-color: unset;
      border: unset;
      border-bottom: 1px solid #fff;
      width: 130px;
   }
   button {
      background-color: unset;
      border: unset;
      box-shadow: 0 0 2px 1px;
      border-radius: 3px;
      margin-left: 10px;
      cursor: pointer;

      &:hover {
         background-color: rgba(0, 128, 0, 0.5);
      }
   }
}
</style>