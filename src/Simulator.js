export default class Simulator {

  round (number, fixed) {
    let intPart,
      value,
      floatPart

    value = number;

    // get int part
    intPart = Math.floor(value);

    // get float part
    floatPart = (value - intPart) * Math.pow(10, fixed);
    floatPart = Math.round(floatPart);

    // get full number
    value = (floatPart / Math.pow(10, fixed)) + intPart;

    return value;
  }

  calculateInstalments (valueToPay, term, interestRate) {
    interestRate = 5
    let interest = this.round(interestRate, 2);
    let factor_valor_presente = 1 / (1 + (interest / 100));
    let valorIntereses = valueToPay * (interest / 100);
    let valorCuota = (valueToPay * ((interest / 100) / (1 - Math.pow( factor_valor_presente,  term))));
    let valorBase = valorCuota - valorIntereses;
    let balance = this.round((valueToPay - valorBase), 2);

    let data = {
      interes: interest,
      valorIntereses: valorIntereses,
      valorCuota: valorCuota,
      valorBase: valorBase,
      balance: balance,
    }
    return data;
  }
}
