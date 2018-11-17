<template>
    <div id="app">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo">
                        Simulador de Crédito de libre Inversión
                    </div>
                </Menu>
            </Header>
            <!--<Sider></Sider>-->
            <Content class="content">
                <Layout>
                    <Row>
                        <Col span="12">
                            <Form ref="form" :model="form" :rules="rules" >
                                <FormItem prop="term" :label="$t('form.term.label')">
                                    <Input type="text" v-model.number="form.term">
                                        <Icon type="ios-calendar" slot="prepend"></Icon>
                                    </Input>
                                </FormItem>
                                <FormItem prop="valueToPay" :label="$t('form.valueToPay.label')">
                                    <Input type="text" v-model.number="form.valueToPay">
                                        <Icon type="ios-cash" slot="prepend"></Icon>
                                    </Input>
                                </FormItem>
                                <FormItem prop="valueToPay" :label="$t('form.valueToPay.label')">
                                    <DatePicker
                                        class="d-block"
                                        type="date"
                                        v-model="form.date"
                                        @on-change="changeDate"
                                    ></DatePicker>
                                </FormItem>
                                <FormItem>
                                    <label> Tipo de Tasa: <b>Tasa Fija</b> </label>
                                    <br>
                                    <label> Tasa de Interes: <b>{{form.interestRate}} %</b> </label>
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" @click="validateForm()">{{$t('form.buttons.calc')}}</Button>
                                </FormItem>
                            </Form>
                        </Col>
                        <Col span="12">
                            <div style="width: 400px; margin: 0 auto">
                                <canvas id="histogram" width="400" height="400"></canvas>
                            </div>
                            <!-- v-if="simulation.totalInterest">
                                Interes Total: {{this.formatter.format(simulation.totalInterest)}}
                            </p>
                            <p v-if="simulation.totalInstalments">
                                Total Cuotas: {{this.formatter.format(simulation.totalInstalments)}}
                            </p>
                            <p v-if="simulation.sumInterest">
                                Sumatoria de Interes: {{this.formatter.format(simulation.sumInterest)}}
                            </p>
                            <p v-if="simulation.interesPromedio">
                                Tasa de Interes Promedio : {{this.formatter.format(simulation.interesPromedio)}}
                            </p-->
                        </Col>
                    </Row>
                    <Row>
                        <Tabs>
                            <TabPane label="Tabla">
                                <Table :loading="loading" height="300" stripe :columns="columns" :data="data"></Table>
                            </TabPane>
                            <TabPane label="Histograma de Intereses">
                                <div style="width: 600px; margin: 0 auto">
                                    <canvas id="history" width="400" height="400"></canvas>
                                </div>
                            </TabPane>
                        </Tabs>
                        <!--Col></Col-->
                    </Row>
                </Layout>
            </Content>
            <Footer class="footer">
                <label>Basado en el simulador de Grupo Bancolombia</label>
            </Footer>
        </Layout>
    </div>
</template>

<script>

import Simulator from '@/Simulator'
import Generator from '@/Generator'
import Formatter from '@/Formatter'
import data from '@/history.json'
import dataGen from '@/history.gen.json'
import Chart from 'chart.js'

import dataDaily from '@/history.daily.json'

const history = data.map(item => ({
    date: item.date,
    value: parseFloat(item.value.toString().replace(",", ".")),
    year: parseInt(item.date.split('-')[0]),
    month: parseInt(item.date.split('-')[1]),
    day: parseInt(item.date.split('-')[2]),
}))

export default {
    name: 'app',
    data () {
        return {
            history,
            loading: false,
            simulator: new Simulator(),
            generator: new Generator(),
            simulation: {
                totalInterest: null,
                totalInstalments: null,
                sumInterest: null,
                interesPromedio: null
            },
            formatter: new Formatter(),
            nameForm: 'form',
            form: {
                term: 37,
                valueToPay: 20000000,
                interestRate: 1.35,
                date: new Date()
            },
            rules: {
                term: [
                    { type: 'number', min: 36, message: this.$t('form.rules.term.min'), trigger: 'blur' },
                    { type: 'number', max: 120, message: this.$t('form.rules.term.max'), trigger: 'blur' }
                ],
                valueToPay: [
                    { type: 'number', min: 1000000, message: this.$t('form.rules.valueToPay.min'), trigger: 'blur' },
                    { type: 'number', max: 5000000000, message: this.$t('form.rules.valueToPay.max'), trigger: 'blur' }
                ]
            },
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
            data: []
        }
    },
    methods: {
        changeDate (nValue) {
            this.setInterestRate()
        },
        drawHistory () {
            let labels = []
            let data = dataDaily.map(item => item.value) // dataGen

            dataDaily.forEach(item => { // dataGen
                // labels.push(`${item.year} - ${item.initialMonth}`)
                labels.push(`${item.date}`)
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
        },
        setInterestRate () {
            let year = this.form.date.getFullYear()
            let month =  this.form.date.getMonth() + 1
            let day =  this.form.date.getDate()

            if (year > 2021 || year < 2013) {
            throw new Error('Fecha invalida')
            }

            let data = dataGen.find(item => item.year === year && (month >= item.initialMonth && month <= item.endMonth))
            this.form.interestRate = data.value
        },
        validateForm(name) {
            this.$refs[this.nameForm].validate((valid) => {
                let year = this.form.date.getFullYear()
                let month =  this.form.date.getMonth() + 1
                let day =  this.form.date.getDate()

                if (year > 2023 || year < 2013) {
                    throw new Error('Fecha invalida')
                }

                if (valid) {
                    this.loading = true
                    let responses = []

                    let valueToPay = this.form.valueToPay

                    let totalInterest = 0
                    let totalInstalments = 0
                    let sumInterest = 0

                    let payToInstalments = new Array(this.form.term)
                    let payToInterest = new Array(this.form.term)

                    for(let index = this.form.term; index > 0; index--) {
                        let response = this.simulator.calculateInstalments(
                            valueToPay,
                            index,
                            this.form.interestRate
                        )

                        payToInstalments[(this.form.term - index)] = response.valorBase
                        payToInterest[(this.form.term - index)] = response.valorIntereses

                        response.index = (this.form.term - index) + 1
                        responses.push(response)

                        totalInterest += response.valorIntereses
                        totalInstalments += response.valorCuota
                        sumInterest += response.interes

                        valueToPay = response.balance
                    }

                    let interesPromedio = sumInterest / this.form.term;

                    this.simulation.totalInterest = totalInterest
                    this.simulation.totalInstalments = totalInstalments
                    this.simulation.sumInterest = sumInterest
                    this.simulation.interesPromedio = interesPromedio

                    let data = responses.map(response => ({
                        index: response.index,
                        interes: `${response.interes} %`,
                        valorIntereses: this.formatter.format(response.valorIntereses),
                        valorCuota: this.formatter.format(response.valorCuota),
                        valorBase: this.formatter.format(response.valorBase),
                        balance: this.formatter.format(response.balance),
                    }))

                    data.unshift({
                        index: 0,
                        interes: '',
                        valorIntereses: this.formatter.format(0),
                        valorCuota: this.formatter.format(0),
                        valorBase: this.formatter.format(0),
                        balance: this.formatter.format(this.form.valueToPay),
                    })

                    this.data = data

                    this.loading = false

                    this.draw(this.form.term, payToInstalments, payToInterest)
                } else {
                    this.$Message.error('Verifique los valores.');
                }
          })
        },
    },
    mounted () {
        this.drawHistory()
    }
}
</script>

<style lang="scss">
    .footer{
        position: fixed;
        bottom: 0;
        left: 0;
        padding: 0;
    }
    .d-block {
        display: block;
    }
    .content {
        padding: 0px 50px
    }
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-logo{
        // width: 100px;
        // height: 30px;
        background: #5b6270;
        border-radius: 3px;
        // float: left;
        // position: relative;
        // top: 15px;
        // left: 20px;
        color: white;
        font-weight: bold;
        font-size: 20px;
    }
    .layout-footer-center{
        text-align: center;
    }
</style>
