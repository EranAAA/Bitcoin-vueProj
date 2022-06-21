
<script>
import ChartTradeVolume from '@/components/chart/ChartTradeVolume.vue'
import ChartAverageBlockSize from '@/components/chart/ChartAverageBlockSize.vue'
import ChartMarketPrice from '@/components/chart/ChartMarketPrice.vue'
import { bitcoinService } from '@/services/bitcoin.service.js'

export default {
   data() {
      return {
         tradeVolume: '',
         averageBlockSize: '',
         marketPrice: ''
      }
   },

   components: {
      ChartTradeVolume,
      ChartAverageBlockSize,
      ChartMarketPrice
   },

   async created() {
      // Remove from locale storage after a day.
      this.tradeVolume = await bitcoinService.getTradeVolume()
      this.averageBlockSize = await bitcoinService.getAverageBlockSize()
      this.marketPrice = await bitcoinService.getMarketPrice()
   }
}
</script>

<template>
   <div class="chart-container">
      <ChartMarketPrice v-if="this.marketPrice" v-bind:marketPrice="marketPrice" />
      <ChartTradeVolume v-if="this.tradeVolume" v-bind:tradeVolume="tradeVolume" />
      <ChartAverageBlockSize v-if="this.averageBlockSize" v-bind:averageBlockSize="averageBlockSize" />
   </div>
</template>

<style lang="scss">
.chart-container {
   margin-top: 60px;
   margin-bottom: 60px;
   display: flex;
   gap: 10px;
   justify-content: center;
   align-items: center;
   align-content: center;
   flex-wrap: wrap;
}
</style>