<template>
  <Table :loading="loading" height="300" stripe :columns="columns" :data="data"></Table>
</template>

<script>

import Chart from 'chart.js'
import dataDaily from '@/history.json'

export default {
    name: 'SimulationTable',
    props: {
        data: {
          type: Array,
          required: true
        },
        loading: {
          type: Boolean,
          required: true
        }
    },
    data () {
      return {
        columns: [
          {
              title: '#',
              key: 'index',
              width: 70
          },
          {
              title: 'Interes',
              key: 'interes',
              width: 80
          },
          {
              title: 'Valor Intereses',
              key: 'valorIntereses'
          },
          {
              title: 'Abono a Capital',
              key: 'valorBase'
          },
          {
              title: 'Cuota con Interes',
              key: 'valorCuota'
          },
          {
              title: 'Saldo',
              key: 'balance'
          }
        ],
      }
    },
    methods: {
    },
}
</script>
