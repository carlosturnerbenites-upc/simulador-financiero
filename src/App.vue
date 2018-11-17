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
                                <FormItem prop="valueToPay" :label="$t('form.date.label')">
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
                                <SimulationChart ref="simulationChart"></SimulationChart>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Tabs>
                            <TabPane label="Tabla">
                                <SimulationTable :loading="loading" :data="data"></SimulationTable>
                            </TabPane>
                            <TabPane label="Histograma de Intereses">
                                <div style="width: 600px; margin: 0 auto">
                                    <HistoryChart ref="historyChart"></HistoryChart>
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

import SimulationChart from '@/Components/Charts/Simulation'
import SimulationTable from '@/Components/Table'
import HistoryChart from '@/Components/Charts/History'
import Simulator from '@/Simulator'
import Generator from '@/Generator'
import Formatter from '@/Formatter'
import Chart from 'chart.js'
import MixinForm from '@/mixins/form'

import dataDaily from '@/history.json'

export default {
    name: 'app',
    mixins: [MixinForm],
    data () {
        return {
            loading: false,
            simulator: new Simulator(),
            generator: new Generator(),
            formatter: new Formatter(),
            nameForm: 'form',
            data: []
        }
    },
    methods: {
        changeDate (nValue) { this.setInterestRate() },
        setInterestRate () {
            let format = this.form.date.format()

            let data = dataDaily.find(item => item.date === format)

            if (!data) {
                $vm0.$Message.error("Fecha invalida")
                this.form.date = new Date()
            } else {
                this.form.interestRate = data.value
            }
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

                    this.$refs.simulationChart.draw(this.form.term, payToInstalments, payToInterest)
                } else {
                    this.$Message.error('Verifique los valores.');
                }
          })
        },
    },
    mounted () {
        this.setInterestRate()
        this.$refs.historyChart.draw()
    },
    components: {
        SimulationChart,
        HistoryChart,
        SimulationTable
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
        background: #5b6270;
        border-radius: 3px;
        color: white;
        font-weight: bold;
        font-size: 20px;
    }
</style>
