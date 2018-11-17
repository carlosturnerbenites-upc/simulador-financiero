const es = {
  form: {
    term:{
      label: "¿Cuál es el plazo que necesitas para tu préstamo? (meses)",
    },
    valueToPay:{
      label: "¿Cuánto es el valor que deseas prestar? ($)",
    },
    date:{
      label: "¿Cuando piensa solicitar el crédito?",
    },
    buttons: {
      calc: 'Calcular'
    },
    rules: {
      term: {
        min: 'El campo no cumple con el valor mínimo 36',
        max: 'El campo no cumple con el valor máximo 120'
      },
      valueToPay: {
        min: 'El campo no cumple con el valor mínimo $1,000,000.00',
        max: 'El campo no cumple con el valor máximo $5,000,000,000.00'
      }
    }
  }
}

export default es
