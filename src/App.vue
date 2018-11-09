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
            <FormItem prop="typeInterestRate" :label="$t('form.typeInterestRate.label')">
                <RadioGroup v-model="form.typeInterestRate">
                    <Radio label="fixed">{{$t('form.typeInterestRate.options.fixed')}}</Radio>
                    <Radio label="variant">{{$t('form.typeInterestRate.options.variant')}}</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="validateForm()">{{$t('form.buttons.calc')}}</Button>
            </FormItem>
          </Form>
        </Col>
        <Col span="12">
        </Col>
    </Row>
    <Row>
      <Col>
        <Table :loading="loading" height="200" stripe :columns="columns" :data="data"></Table>
      </Col>
    </Row>

    </Layout>
  </Content>
  <Footer></Footer>
</Layout>
  </div>
</template>

<script>

import Simulator from '@/Simulator'
import Formatter from '@/Formatter'

export default {
  name: 'app',
  data () {
      return {
          loading: false,
          simulator: new Simulator(),
          formatter: new Formatter(),
          nameForm: 'form',
          form: {
              term: 37,
              valueToPay: 20000000,
              typeInterestRate: 'fixed',
              interestRate: 5
          },
          rules: {
              term: [
                  { type: 'number', min: 36, message: this.$t('form.rules.term.min'), trigger: 'blur' },
                  { type: 'number', max: 120, message: this.$t('form.rules.term.max'), trigger: 'blur' }
              ],
              valueToPay: [
                  { type: 'number', min: 1000000, message: this.$t('form.rules.valueToPay.min'), trigger: 'blur' },
                  { type: 'number', max: 5000000000, message: this.$t('form.rules.valueToPay.max'), trigger: 'blur' }
              ],
              typeInterestRate: [
                  { type: "enum", enum: ['fixed', 'variant'], message: this.$t('form.rules.typeInterestRate.enum'), trigger: 'change' }
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
                title: 'Valor Cuota',
                key: 'valorCuota'
              },
              {
                title: 'Valor Base',
                key: 'valorBase'
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
      validateForm(name) {
          this.$refs[this.nameForm].validate((valid) => {
              if (valid) {
                  this.loading = true
                let responses = []

                let valueToPay = this.form.valueToPay
                for(let index = this.form.term; index > 0; index--) {
                    let response = this.simulator.calculateInstalments(
                        valueToPay,
                        index,
                        this.form.interestRate
                    )
                    response.index = this.form.term - index
                    responses.push(response)

                    valueToPay = response.balance
                }
                this.data = responses.map(response => ({
                    index: response.index,
                    interes: `${response.interes} %`,
                    valorIntereses: this.formatter.format(response.valorIntereses),
                    valorCuota: this.formatter.format(response.valorCuota),
                    valorBase: this.formatter.format(response.valorBase),
                    balance: this.formatter.format(response.balance),
                }))

                this.loading = false
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
