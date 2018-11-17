const Mixin = {
  data () {
    return {
      form: {
        term: 36,
        valueToPay: 10000000,
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
          { type: 'number', max: 15000000, message: this.$t('form.rules.valueToPay.max'), trigger: 'blur' }
        ]
      },
    }
  }
}

export default Mixin
