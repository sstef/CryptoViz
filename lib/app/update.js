function UpdateData (inputs) {
  var inputs = inputs || {'start_point': '0', 'count': '10', 'sorted': 'market_cap_usd'} 
  var start = parseInt(inputs.start_point)
  var count = parseInt(inputs.count)
  var sorted = inputs.sort

  var data = d3.json('https://api.coinmarketcap.com/v1/ticker/?start=' + start + '&limit=' + count)

  BuildPieGraph(data, sorted)
}
