export const getRates = async (ticker1, ticker2) => {
  const formData = new FormData()
  formData.append('currency_from', ticker1.toLowerCase())
  formData.append('currency_to', ticker2.toLowerCase())
  const answer = await fetch('https://crypto-verse.info/api/calculator/exchange/calculate/', {
    method: 'POST',
    headers: {
      Accept: 'application/json'
    },
    body: formData
  })
  const res = await answer.json()
  return res
}
