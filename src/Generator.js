
import randoms from '@/random.json'
Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
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
    /*
    this.rateChange = [
      {
        range: [0, 0.000206270627],
        value: 0.75
      },
      {
        range: [0.000206270628, 0.000618811880],
        value: -1
      },
      {
        range: [0.000618811881, 0.001031353133],
        value: -0.5
      },
      {
        range: [0.001031353134, 0.003712871284],
        value: 1
      },
      {
        range: [0.003712871285, 0.007219471943],
        value: 0.5
      },
      {
        range: [0.007219471944, 0.987004950490],
        value: 0
      },
      {
        range: [0.987004950491, 0.995049504944],
        value: -0.25
      },
      {
        range: [0.995049504945, 0.999381188111],
        value: 0.25
      },
      {
        range: [0.999381188112, 0.999793729364],
        value: 2
      },
      {
        range: [0.999793729365, 1],
        value: 3
      },
    ]
    */
    /*
    this.rateChange = [
      {
        range: [0.0000000000000000, 0.0500000000000000],
        value: 2.0
      },
      {
        range: [0.0500000000000001, 0.1000000000000000],
        value: 1.5
      },
      {
        range: [0.1000000000000001, 0.2500000000000000],
        value: 1.0
      },
      {
        range: [0.2500000000000001, 0.4000000000000000],
        value: 0.5
      },
      {
        range: [0.4000000000000001, 0.6000000000000000],
        value: 0
      },
      {
        range: [0.6000000000000001, 0.7500000000000000],
        value: -0.5
      },
      {
        range: [0.7500000000000001, 0.9000000000000000],
        value: -1.0
      },
      {
        range: [0.9000000000000001, 0.9500000000000000],
        value: -1.5
      },
      {
        range: [0.9500000000000001, 1.0000000000000000],
        value: -2.0
      },
    ]
    */
   /*
    this.rateChange = [
      {
        range: [0.000000000000000, 0.700000000000000],
        value: 0.5
      },
      {
        range: [0.700000000000001, 1.0000000000000000],
        value: -0.5
      },
    ]
    */

    this.history = {
      config: {
        base: 4
      },
      history: [
        {
          year: 2013,
          value: null,
          initialMonth: 1, // Enero
          endMonth: 3, // Enero
        },
        {
          year: 2013,
          value: null,
          initialMonth: 4, // Abril
          endMonth: 6, // Abril
        },
        {
          year: 2013,
          value: null,
          initialMonth: 7, // Julio
          endMonth: 9, // Julio
        },
        {
          year: 2013,
          value: null,
          initialMonth: 10, // Octubre
          endMonth: 12, // Octubre
        },

        {
          year: 2014,
          value: null,
          initialMonth: 1, // Enero
          endMonth: 3, // Enero
        },
        {
          year: 2014,
          value: null,
          initialMonth: 4, // Abril
          endMonth: 6, // Abril
        },
        {
          year: 2014,
          value: null,
          initialMonth: 7, // Julio
          endMonth: 9, // Julio
        },
        {
          year: 2014,
          value: null,
          initialMonth: 10, // Octubre
          endMonth: 12, // Octubre
        },

        {
          year: 2015,
          value: null,
          initialMonth: 1, // Enero
          endMonth: 3, // Enero
        },
        {
          year: 2015,
          value: null,
          initialMonth: 4, // Abril
          endMonth: 6, // Abril
        },
        {
          year: 2015,
          value: null,
          initialMonth: 7, // Julio
          endMonth: 9, // Julio
        },
        {
          year: 2015,
          value: null,
          initialMonth: 10, // Octubre
          endMonth: 12, // Octubre
        },

        {
          year: 2016,
          value: null,
          initialMonth: 1, // Enero
          endMonth: 3, // Enero
        },
        {
          year: 2016,
          value: null,
          initialMonth: 4, // Abril
          endMonth: 6, // Abril
        },
        {
          year: 2016,
          value: null,
          initialMonth: 7, // Julio
          endMonth: 9, // Julio
        },
        {
          year: 2016,
          value: null,
          initialMonth: 10, // Octubre
          endMonth: 12, // Octubre
        },

        {
          year: 2017,
          value: null,
          initialMonth: 1, // Enero
          endMonth: 3, // Enero
        },
        {
          year: 2017,
          value: null,
          initialMonth: 4, // Abril
          endMonth: 6, // Abril
        },
        {
          year: 2017,
          value: null,
          initialMonth: 7, // Julio
          endMonth: 9, // Julio
        },
        {
          year: 2017,
          value: null,
          initialMonth: 10, // Octubre
          endMonth: 12, // Octubre
        },

        {
          year: 2018,
          value: null,
          initialMonth: 1, // Enero
          endMonth: 3, // Enero
        },
        {
          year: 2018,
          value: null,
          initialMonth: 4, // Abril
          endMonth: 6, // Abril
        },
        {
          year: 2018,
          value: null,
          initialMonth: 7, // Julio
          endMonth: 9, // Julio
        },
        {
          year: 2018,
          value: null,
          initialMonth: 10, // Octubre
          endMonth: 12, // Octubre
        },






        {
          year: 2019,
          value: null,
          initialMonth: 1, // Enero
          endMonth: 3, // Enero
        },
        {
          year: 2019,
          value: null,
          initialMonth: 4, // Abril
          endMonth: 6, // Abril
        },
        {
          year: 2019,
          value: null,
          initialMonth: 7, // Julio
          endMonth: 9, // Julio
        },
        {
          year: 2019,
          value: null,
          initialMonth: 10, // Octubre
          endMonth: 12, // Octubre
        },

        {
          year: 2020,
          value: null,
          initialMonth: 1, // Enero
          endMonth: 3, // Enero
        },
        {
          year: 2020,
          value: null,
          initialMonth: 4, // Abril
          endMonth: 6, // Abril
        },
        {
          year: 2020,
          value: null,
          initialMonth: 7, // Julio
          endMonth: 9, // Julio
        },
        {
          year: 2020,
          value: null,
          initialMonth: 10, // Octubre
          endMonth: 12, // Octubre
        },

        {
          year: 2021,
          value: null,
          initialMonth: 1, // Enero
          endMonth: 3, // Enero
        },
        {
          year: 2021,
          value: null,
          initialMonth: 4, // Abril
          endMonth: 6, // Abril
        },
        {
          year: 2021,
          value: null,
          initialMonth: 7, // Julio
          endMonth: 9, // Julio
        },
        {
          year: 2021,
          value: null,
          initialMonth: 10, // Octubre
          endMonth: 12, // Octubre
        },





        {
          year: 2020,
          value: null,
          initialMonth: 1, // Enero
          endMonth: 3, // Enero
        },
        {
          year: 2020,
          value: null,
          initialMonth: 4, // Abril
          endMonth: 6, // Abril
        },
        {
          year: 2020,
          value: null,
          initialMonth: 7, // Julio
          endMonth: 9, // Julio
        },
        {
          year: 2020,
          value: null,
          initialMonth: 10, // Octubre
          endMonth: 12, // Octubre
        },

        {
          year: 2021,
          value: null,
          initialMonth: 1, // Enero
          endMonth: 3, // Enero
        },
        {
          year: 2021,
          value: null,
          initialMonth: 4, // Abril
          endMonth: 6, // Abril
        },
        {
          year: 2021,
          value: null,
          initialMonth: 7, // Julio
          endMonth: 9, // Julio
        },
        {
          year: 2021,
          value: null,
          initialMonth: 10, // Octubre
          endMonth: 12, // Octubre
        },
      ]
    }
  }
  getRandom() {
    // return Math.random()
    let n = randoms[this.indexRandom]
    this.indexRandom += 1
    return n
  }
  getRateChange (n) {
    // console.log(n)
    let range = this.rateChange.find(range => {
      return n >= range.range[0] && n <= range.range[1]
    })

    if (range) {
      // console.log(`${n} into ${range.range[0]} - ${range.range[1]}`)
    }
    return range
  }

  generateHistory (json = true) {
    let history = Object.assign({}, this.history)
    history.history[0].value = history.config.base
    history.history.forEach((item, index) => {
      console.log('index', index)
      if (index === 0) {
        item.value = history.config.base
      } else {
        let random = this.getRandom()
        let range = this.getRateChange(random)
        item.value = history.history[index - 1].value + range.value
        item.random = random
        item.changeRate = range.value
      }
    })
    if (json) {
      return JSON.stringify(history.history)
    }
    return history.history1000
  }
  generateHistoryDaily (json = true) {
    let history = Object.assign({}, this.history)
    let curDate = new Date('2017-4-1')

    let data = [{
      value: 3.5,
      date: curDate.getFullYear() + "-" + curDate.getMonth() + "-" + curDate.getDate(),
    }]

    let days = 1000

    for (let index = 0; index < days; index++) {
      let random = this.getRandom()
      let range = this.getRateChange(random)

      curDate = curDate.addDays(1)
      let value

      if (index === 0) {
        value = 3.5
      } else {
        value = data[index - 1].value
      }

      let change = null
      if (range) {
        change = range.value
        value = value + change
      } else {
        console.info('not found')
      }

      let item = {
        date: curDate.getFullYear() + "-" + curDate.getMonth() + "-" + curDate.getDate(),
        value,
        random,
        change
      }

      data.push(item)

    }

    return data
  }
}

// 8 años
// cambios mensuales 12 añosde * 3 meses

