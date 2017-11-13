export default function fetchAllCurrenecies() {
  return 'https://api.coinmarketcap.com/v1/ticker/?limit=50';
}

export default function fetchCurrency(query) {
  return `https://api.coinmarketcap.com/v1/ticker/${query}/`
}
