
<script>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale)

export default {
   props: {
      averageBlockSize: {
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
            labels: this.averageBlockSize.values.map(value => new Date(value['x'] * 1000).toLocaleDateString('it-IT')),
            datasets: [
               {
                  data: this.averageBlockSize.values.map(value => value['y']),
                  backgroundColor: ['rgb(255, 200, 0)'],
                  label: 'Average Block Size'
               }
            ]
         },
         chartOptions: {
            responsive: true,
            maintainAspectRatio: false
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