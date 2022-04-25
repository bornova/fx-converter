const axios = require('axios').default

/**
 * Convert currency values based on present-day exchange rates.
 *
 * Rates are provided by https://www.floatrates.com, updated daily (once in 12 hours at 12 AM/PM)
 *
 * @param {string} from Currency code to convert from (ISO 4217)
 * @param {string} to Currency code to convert to (ISO 4217)
 * @param {number} amount Amount to convert. Must be a positive number.
 * @returns {Promise<{
 *  from: { code: string, alphaCode: string, numericCode: string, name: string },
 *  to: { code: string, alphaCode: string, numericCode: string, name: string },
 *  amount: number,
 *  result: number,
 *  rate: number,
 *  inverseRate: number,
 *  date: string
 * }>} Results object, including the converted currency value
 */

module.exports = (from, to, amount) => {
  if (!from) {
    throw new Error('"from" currency code cannot be an empty string')
  }

  if (typeof from !== 'string') {
    throw new Error('"from" currency code must be a string')
  }

  if (!to) {
    throw new Error('"to" currency code cannot be an empty string')
  }

  if (typeof to !== 'string') {
    throw new Error('"to" currency code must be a string')
  }

  if (amount && isNaN(amount)) {
    throw new Error('"amount" must be a number')
  }

  if (amount && amount <= 0) {
    throw new Error('"amount" must be a positive number')
  }

  from = from.trim().toLowerCase()
  to = to.trim().toLowerCase()
  amount = amount ? Number(amount) : 1

  return new Promise((resolve, reject) => {
    const feed = 'https://www.floatrates.com/daily/usd.json'
    const usd = { code: 'USD', alphaCode: 'USD', numericCode: '840', name: 'U.S. Dollar' }

    axios
      .get(feed)
      .then((response) => {
        const data = response.data

        if (from !== 'usd' && !data[from]) {
          throw new Error(`"${from}" is not a valid currency code in "from" parameter`)
        }

        if (to !== 'usd' && !data[to]) {
          throw new Error(`"${to}" is not a valid currency code in "to" parameter`)
        }

        const fromRate = from === 'usd' ? 1 : data[from].rate
        const toRate = to === 'usd' ? 1 : data[to].rate

        const rate = toRate / fromRate
        const inverseRate = 1 / rate

        const result = rate * amount

        const date =
          from === to ? 'N/A' : from === 'usd' ? data[to].date : to === 'usd' ? data[from].date : data[to].date

        const results = {
          from:
            from === 'usd'
              ? usd
              : {
                  code: data[from].code,
                  alphaCode: data[from].alphaCode,
                  numericCode: data[from].numericCode,
                  name: data[from].name
                },
          to:
            to === 'usd'
              ? usd
              : {
                  code: data[to].code,
                  alphaCode: data[to].alphaCode,
                  numericCode: data[to].numericCode,
                  name: data[to].name
                },
          amount,
          result,
          rate,
          inverseRate,
          date
        }

        resolve(results)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
