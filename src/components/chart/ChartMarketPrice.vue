
<script>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale)

export default {
   props: {
      marketPrice: {
         type: [],
         required: true
      },
      chartId: {
         type: String,
         default: 'line-chart'
      },
      // datasetIdKey: {
      //    type: String,
      //    default: 'label'
      // },
      width: {
         type: Number,
         default: 400
      },
      height: {
         type: Number,
         default: 400
      },
      cssClasses: {
         default: '',
         type: String
      },
      styles: {
         type: Object,
         default: () => {}
      },
      plugins: {
         type: Array,
         default: () => []
      }
   },

   data() {
      return {
         chartData: {
            labels: this.marketPrice.values.map(value => new Date(value['x'] * 1000).toLocaleDateString('it-IT')),
            datasets: [
               {
                  data: this.marketPrice.values.map(value => value['y']),
                  // backgroundColor: ['rgba(23, 94, 236)'],
                  backgroundColor: this.marketPrice.values.map((value, idx) =>
                     this.marketPrice.values[idx === 0 ? 0 : idx-1].y < value.y ? 'rgba(158,222, 90)' : 'rgba(253, 24, 11)'
                  ),
                  label: 'Market Price'
               }
            ]
         },
         chartOptions: {
            responsive: true,
            maintainAspectRatio: false,
         }
      }
   },

   // name: 'BarChart',
   components: { Line }
}
</script>

<template>
   <Line
      class="line"
      :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="chartId"
      :plugins="plugins"
      :css-classes="cssClasses"
      :styles="styles"
   />
</template>

<style lang="scss">
.line {
   width: 800px;
}
</style>