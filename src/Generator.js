
import randoms from '@/random.json'
Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}
Date.prototype.format = function (days) {
  return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate()
}
export default class Generator {
  constructor () {
    this.indexRandom = 0
    this.rateChange = [
      {
        range: [0, 0.007386888273315],
        value: 0.25
      },
      {
        range: [0.007386888273316,0.009233610341644],
        value: 0.5
      },
      {
        range: [0.009233610341645, 0.988457987072946],
        value: 0
      },
      {
        range: [0.988457987072947, 0.999076638965836 ],
        value: -0.25
      },
      {
        range: [0.999076638965837, 1 ],
        value: -0.5
      },
    ]
  }
  getRandom() {
    // return Math.random()
    let n = randoms[this.indexRandom]
    this.indexRandom += 1
    return n
  }
  getRateChange (n) {
    let range = this.rateChange.find(range => {
      return n >= range.range[0] && n <= range.range[1]
    })
    return range
  }
  generateHistory (json = true) {
    let curDate = new Date('2017-4-1')
    let valueDate = 4.25

    let data = [{
      value: valueDate,
      date: curDate.format(),
    }]

    let days = 1000
    let last = valueDate

    for (let index = 0; index < days; index++) {
      let random = this.getRandom()
      let range = this.getRateChange(random)

      curDate = curDate.addDays(1)
      let value = last

      let change = range.value
      console.log('change', change)
      value = value + change

      let item = {
        date: curDate.format(),
        value,
        random,
        change: change
      }


      data.push(Object.assign({}, item))

      last = value
    }

    return data
  }
}
