<template>
    <canvas id="histogram" width="400" height="400"></canvas>
</template>

<script>

import Chart from 'chart.js'

export default {
    name: 'SimulationChart',
    data () {
        return {}
    },
    methods: {
        draw (term, payToInstalments, payToInterest) {
            let labels = []
            for (let index = 1; index <= term; index++) {
              labels.push(index)
            }
            let ctx = document.getElementById('histogram').getContext('2d');

            let options = {
                responsive: true,
                title: {
                    display: true,
                    text: 'Interes vs Capital'
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
                    datasets: [
                        {
                            label: 'Couta',
                            fill: false,
                            backgroundColor: 'green',
                            borderColor: 'green',
                            borderWidth: 0.1,
                            pointRadius: 0.1,
                            pointHoverRadius: 0.1,
                            data: payToInstalments
                        },
                        {
                            label: 'Interes',
                            fill: false,
                            backgroundColor: 'red',
                            borderColor: 'red',
                            borderWidth: 0.1,
                            pointRadius: 0.1,
                            pointHoverRadius: 0.1,
                            data: payToInterest
                        }
                    ]
                },
                options: options
            });
        }
    },
}
</script>
