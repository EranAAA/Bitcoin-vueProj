
<script>
export default {
   props: {
      contact: {
         type: Object,
         required: true
      },
      moves: {
         type: Array,
         required: true
      }
   },

   computed: {
      filterMoves() {
         if (this.$route.fullPath === '/') {
            let filterdMoves = [...this.moves]
            filterdMoves = filterdMoves.sort((a, b) => b.at - a.at).filter((move, idx) => idx <= 2)
            return filterdMoves
         } else {
            const filterdMoves = this.moves.filter(move => move.toId === this.contact._id).sort((a, b) => b.at - a.at)
            console.log('filterdMoves', filterdMoves)
            return filterdMoves
         }
      },

      title() {
         let title = ''
         if (this.$route.fullPath === '/') title = 'Your last 3 Moves:'
         else title = 'Your Moves:'
         return title
      }
   }
}
</script>

<template>
   <section class="moves-list">
      <div class="title">{{ title }}</div>
      <ul>
         <li v-for="move in filterMoves" :key="move.at">
            <div v-if="this.$route.fullPath === '/'" class="to">To: {{ move.to }} <br /></div>
            Deal date:
            {{ new Date(move.at).toLocaleDateString('en-GB') }} {{ new Date(move.at).toLocaleTimeString('en-GB') }} <br />
            Amount: ${{ move.amount.toLocaleString() }}
            <hr />
         </li>
      </ul>
   </section>
</template>

<style lang="scss">
.moves-list {
   margin-top: 10px;
   background-color: rgba(211, 211, 211, 0.6);
   border-radius: 10px;
   padding: 20px;
   padding-top: 5px;
   padding-bottom: 0px;
   line-height: 40px;
   display: flex;
   flex-direction: column;

   .title {
      border-bottom: 1px solid gray;
      font-weight: bold;
   }

   ul {
      padding: 0;

      li {
         list-style-type: none;
         line-height: 25px;
      }
   }
}
</style>