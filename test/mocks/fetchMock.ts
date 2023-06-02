
export const getMockData = (qtyItems: number = 5) => ({
  data: {
    items: getSecurityItems(qtyItems)
  }
})

const getSecurityItems = (qty: number) => {
  return [...Array(qty).keys()].map((_, i) => {
    return getSecurityItem(i+1)
  })
}

const getSecurityItem = (ind: number) => (
  {
    basic: {
      name: `test-${ind}`,
      symbol: `test-${ind}`,
      exchange:  `test-${ind}`,
      exchangeCode: `test-${ind}`,
      bridgeExchangeCode:  `test-${ind}`,
      currency: `test-${ind}`,
    },
    quote: {
      change1DayPercent: ind,
      change1WeekPercent: ind + 7,
      lastPrice: ind,
      openPrice: ind,
      high: ind,
      low: ind,
      previousClosePrice: ind,
      change1Day: ind,
      change1Week: ind,
      timeStamp:  ind,
      volume: ind
    },
    symbolInput: `test-${ind}`
  }
)

export const getSecurityParsedItem = (index: number, duration: '1Day' | '1Week' ) => ({ 
  name:`test-${index}`,
  symbol: `test-${index}`,
  openPrice: index,
  changePercent: duration === '1Day' ? index : index+7,
})