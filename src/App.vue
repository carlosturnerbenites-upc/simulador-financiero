<template>
  <div id="app">
<Layout>
  <Header>
    <h1>Banco</h1>
  </Header>
  <!--<Sider></Sider>-->
  <Content>
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
        <Table stripe :columns="columns" :data="data"></Table>
      </Col>
    </Row>

    </Layout>
  </Content>
  <Footer></Footer>
</Layout>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
      return {
          nameForm: 'form',
          form: {
              term: 37, // '',
              valueToPay: 1200000, // '',
              typeInterestRate: 'fixed'
          },
          rules: {
              term: [
                  // { required: true, message: 'Please fill in the term name', trigger: 'blur' },
                  { type: 'number', min: 36, message: 'El campo no cumple con el valor mínimo 36', trigger: 'blur' },
                  { type: 'number', max: 120, message: 'El campo no cumple con el valor máximo 120', trigger: 'blur' }
              ],
              valueToPay: [
                  // { required: true, message: 'Please fill in the valueToPay.', trigger: 'blur' },
                  { type: 'number', min: 1000000, message: 'El campo no cumple con el valor mínimo $1,000,000.00', trigger: 'blur' },
                  { type: 'number', max: 5000000000, message: 'El campo no cumple con el valor máximo $5,000,000,000.00', trigger: 'blur' }
              ],
              typeInterestRate: [
                  // { required: true, message: 'Please fill in the valueToPay.', trigger: 'change' },
                  { type: "enum", enum: ['fixed', 'variant'], trigger: 'change' }
              ]
          },
          columns: [
              {
                title: '# Cuota',
                key: ''
              },
              {
                title: 'Tasa Interés',
                key: ''
              },
              {
                title: 'Valor Interés',
                key: ''
              },
              {
                title: 'Abono Capital',
                key: ''
              },
              {
                title: 'Couta con interes',
                key: ''
              },
              {
                title: 'Saldo',
                key: ''
              }
          ],
          data: []
      }
  },
  methods: {
      validateForm(name) {
          this.$refs[this.nameForm].validate((valid) => {
              if (valid) {
              } else {
                  this.$Message.error('Verifique los valores.');
              }
          })
      }
  }
}
</script>

<style lang="scss">
</style>
