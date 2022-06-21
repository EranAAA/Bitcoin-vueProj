
<script>
import { bitcoinService } from '@/services/bitcoin.service.js'
import MoveList from '@/components/MoveList.vue'

export default {
   data() {
      return {
         name: '',
         rate: '',
         user: this.$store.getters.user || '',
         msg: '',
         isSignup: false
      }
   },

   methods: {
      async onLoginSignup() {
         try {
            console.log(this.loginSignup)
            const user = await this.$store.dispatch({ type: this.loginSignup, name: this.name })
            this.rate = await bitcoinService.getRate()
            this.user = user
         } catch (error) {
            this.msg = error
            console.log('onLogin', error)
         }
      },
      async onLogOut() {
         await this.$store.dispatch({ type: 'logout', name: this.name })
         this.rate = ''
         this.user = ''
         this.isSignup = false
      },
      onToggleClass() {
         this.isSignup = !this.isSignup
      },
      onGoToContact() {
         this.$router.push('/contact')
      },
   
   },

   computed: {
      loginSignup() {
         return this.isSignup ? 'signup' : 'login'
      }
   },

   async created() {
      this.$store.dispatch({ type: 'loadUsers' })
      if (this.user.coins) this.rate = await bitcoinService.getRate(this.user.coins)
   },

   components: {
      MoveList
   }
}
</script>

<template>
   <img
      class="img-contact"
      src="https://images.unsplash.com/photo-1625806334882-079c2a4a92ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
      alt=""
   />
   <div class="home-page">
      <div class="home-container">
         <div v-if="!user?.name" class="login">
            <img src="https://bitstickers.net/wp-content/uploads/2013/12/btc-mono1.jpg" alt="" />
            <form @submit.prevent="save">
               <input placeholder="Enter your Full Name" v-model="name" type="name" />
               <button @click="onLoginSignup">{{ loginSignup }}</button>
               <br />
               <p @click="onToggleClass" class="loginSignup">Change to {{ this.isSignup ? 'login' : 'signup' }}</p>
               <p>{{ msg }}</p>
            </form>
         </div>

         <div v-if="user?.name" class="user-details">
            <div class="info">
               <img v-bind:src="user.url" alt="" />
               <h2>{{ user.name }}</h2>
            </div>

            <h3>Wallet: ${{ user.coins.toLocaleString() }}</h3>
            <h3>
               USD/BTC: {{ rate }}₿
               <span>(Last updated: {{ new Date().toLocaleDateString('en-GB') }} at: {{ new Date().toLocaleTimeString('en-GB') }})</span>
            </h3>
            <hr />

            <button @click="onLogOut">Logout</button>
            <MoveList :moves="user.moves" />
         </div>
         <button @click="onGoToContact" class="sellers">Search for sellers ⇒</button>
      </div>
   </div>
</template>

<style lang="scss">
.home-page {
   margin-top: 60px;
   margin-bottom: 60px;
   padding: 10px;
   display: flex;
   justify-content: center;

   .home-container {
      min-width: 360px;
      width: 50%;
      .login {
         box-shadow: 0 0 2px 1px;
         padding: 10px;
         height: 250px;
         text-align: center;
      }
      .user-details {
         text-align: left;
         .info {
            display: flex;
            align-items: center;
            gap: 10px;

            .loginSignup {
               cursor: pointer;
               &:hover {
                  text-decoration: underline;
               }
            }
         }
         span {
            color: gray;
            font-size: 13px;
            font-style: italic;
         }
      }
      img {
         width: 100px;
      }
      button {
         font-family: BlinkMacSystemFont;
         font-size: 16px;
         font-weight: bold;
         border: unset;
         background-color: unset;
         padding: 0;
         cursor: pointer;
         margin-left: 5px;

         &:hover {
            color: orange;
         }
      }
      .sellers {
         width: 100%;
         margin-top: 25px;
         box-shadow: 0px 0px 3px 1px;
         line-height: 25px;
         margin-left: 0px;

         &:hover {
         box-shadow: 0px 0px 8px 1px;
            border-radius: 3px;
            color: #121212;
         }
      }
   }
}
</style>