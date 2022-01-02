const BASE_URL = "https://api.coinpaprika.com/v1"


export function fetchCoin() {
    return fetch(`${BASE_URL}/coins`).then(response => response.json())

}

export function fetchCoinInfo(coinId: string) {
    return fetch(`${BASE_URL}/coins/${coinId}`).then(response => response.json())
}

export function fetchCoinTickers(coinId: string) {
    return fetch(`${BASE_URL}/tickers/${coinId}`).then(response => response.json())
}

export function fecthHistoricalData(coinId: string) {
    const endDate = Math.floor(Date.now() / 1000)// convert miilioseconds to seconds
    const startDate = endDate - 60 * 60 * 24 * 14 // set the start date to 7days ago
    return fetch(`${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`).then(response => response.json())
}