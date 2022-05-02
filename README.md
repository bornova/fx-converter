# fx-converter

Simple NodeJS library to convert currency values based on present-day exchange rates.

Rates are provided by https://www.floatrates.com, updated daily (once in 12 hours at 12 AM/PM).

## Install

```
npm i fx-converter
```

## Usage

#### ES modules

```javascript
import fxConverter from 'fx-converter'

let rates = await fxConverter('usd', 'try', 100)
console.log(rates.result)

// Or

fxConverter('usd', 'try', 100).then((rates) => {
  console.log(rates.result)
})
```

#### commonJS

```javascript
const fxConverter = require('fx-converter')

async function convert() {
  let rates = await fxConverter('usd', 'try', 100)
  console.log(rates.result)
}

// Or

fxConverter('usd', 'try', 100).then((rates) => {
  console.log(rates.result)
})
```

### Parameters

```javascript
fxConverter(from: string, to: string, amount: number): Promise<Object>

/**
 * @param {string} from - Currency code to convert from (ISO 4217)
 * @param {string} to - Currency code to convert to (ISO 4217)
 * @param {number} amount - Amount to convert. Must be positive number.
 */
```

### return object

Returns a Promise object:

```javascript
{
  from: {
    code: string,         // ISO 4217 currency code to convert from
    alphaCode: string,    // Alpha code of currency
    numericCode: string,  // Numeric code of currency
    name: string          // Name of currency
  },
  to: {
    code: string,         // ISO 4217 currency code to convert to
    alphaCode: string,    // Alpha code of currency
    numericCode: string,  // Numeric code of currency
    name: string          // Name of currency
  },
  amount: number,         // Amount to be converted
  result: number,         // Conversion result
  rate: number,           // Conversion rate
  inverseRate: number,    // Inverse conversion rate
  date: string            // The date/time currency rate was updated
}
```
