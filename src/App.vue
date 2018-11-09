<template>
  <div id="app">
<Layout>
  <Header>
    <Menu mode="horizontal" theme="dark" active-name="1">
        <div class="layout-logo"></div>
        <div class="layout-nav">
            <MenuItem name="4">
                <Icon type="ios-paper"></Icon>
                <span></span>
            </MenuItem>
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
                    type="date"
                    placeholder="Select date"
                    style="width: 200px"
                    v-model.number="form.date"
                ></DatePicker>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="validateForm()">{{$t('form.buttons.calc')}}</Button>
            </FormItem>
          </Form>
        </Col>
        <Col span="12">
            <p v-if="simulation.totalInterest">
                totalInterest: {{this.formatter.format(simulation.totalInterest)}}
            </p>
            <p v-if="simulation.totalInstalments">
                totalInstalments: {{this.formatter.format(simulation.totalInstalments)}}
            </p>
            <p v-if="simulation.sumInterest">
                sumInterest: {{this.formatter.format(simulation.sumInterest)}}
            </p>
            <p v-if="simulation.interesPromedio">
                interesPromedio: {{this.formatter.format(simulation.interesPromedio)}}
            </p>
        </Col>
    </Row>
    <Row>
      <Col>
        <Table :loading="loading" height="300" stripe :columns="columns" :data="data"></Table>
      </Col>
    </Row>
    <canvas id="myChart" width="400" height="400"></canvas>

    </Layout>
  </Content>
  <Footer></Footer>
</Layout>
  </div>
</template>

<script>

import Simulator from '@/Simulator'
import Formatter from '@/Formatter'
import data from '@/history.json'
import Chart from 'chart.js'

const history = data.map(item => ({
    date: item.date,
    value: parseFloat(item.value.toString().replace(",", ".")),
    year: parseInt(item.date.split('-')[0]),
    month: parseInt(item.date.split('-')[1]),
    day: parseInt(item.date.split('-')[2]),
}))

// console.log('history', history)

export default {
  name: 'app',
  data () {
      return {
          history,
          loading: false,
          simulator: new Simulator(),
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
                title: 'index',
                key: 'index',
                width: 70
              },
              {
                title: 'interes',
                key: 'interes',
                width: 70
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
      draw (term, payToInstalments, payToInterest) {
          let labels = []
        for (let index = 1; index <= term; index++) {
            labels.push(index)
        }
        let ctx = document.getElementById('myChart').getContext('2d');

        let options = {
            responsive: true,
            title: {
                display: true,
                text: 'Chart.js Line Chart'
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
                        data: payToInstalments
                    },
                    {
                        label: 'Interes',
                        fill: false,
                        backgroundColor: 'red',
                        borderColor: 'red',
                        data: payToInterest
                    }
                ]
            },
            options: options
        });
      },
      validateForm(name) {
          this.$refs[this.nameForm].validate((valid) => {
            let year = this.form.date.getFullYear()
            let month =  this.form.date.getMonth() + 1
            let day =  this.form.date.getDate()

            let object = history.find(h => h.year === year && h.month === month && h.day === day)
            if (object) {
                this.form.interestRate = object.value
            } else {
                let last = this.history.slice(0, 30)
                let sum = last
                    .map(h => h.value)
                    .reduce((a, b) => { return a + b; }, 0)
                let avg = sum / last.length
                console.log('avg', avg)
                this.form.interestRate = avg
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
      }
  }
}
</script>

<style lang="scss">
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
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }
    .layout-nav{
        width: 420px;
        margin: 0 auto;
        margin-right: 20px;
    }
    .layout-footer-center{
        text-align: center;
    }
</style>
