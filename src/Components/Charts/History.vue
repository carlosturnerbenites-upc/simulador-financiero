<template>
    <canvas id="history" width="400" height="400"></canvas>
</template>

<script>

import Chart from 'chart.js'
import dataDaily from '@/history.json'

export default {
    name: 'HistoryChart',
    data () {
        return {}
    },
    methods: {
        draw () {
            let labels = []
            let data = dataDaily.map(item => item.value)

            dataDaily.forEach(item => {
                labels.push(item.date)
            })

            let ctx = document.getElementById('history').getContext('2d');

            let options = {
                responsive: true,
                title: {
                    display: true,
                    text: 'Historial'
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Month'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Value'
                        }
                    }]
                }
            }

            var myLineChart = new Chart(ctx, {
                type: 'line',
                data: {
                labels,
                datasets: [{
                    label: 'Interes',
                    fill: false,
                    backgroundColor: 'blue',
                    borderColor: 'blue',
                    borderWidth: 0.1,
                    pointRadius: 0.1,
                    pointHoverRadius: 0.1,
                    data
                }]
                },
                options: options
            });
        },
    },
}
</script>
