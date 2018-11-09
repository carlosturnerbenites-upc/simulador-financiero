export default class Formatter {
  constructor () {
    this.formatter = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 2
    })
  }


  format (value) {
    return this.formatter.format(value)
  }
}
