## README

# CryptoViz

The hottest trend in the financial world today has been cryptocurrency. These enigmas of market mentality have shown enormous profitability with staggering volatility. Still, the demand continues to soar as their value increases. As such, I wanted to create an interactive visualization of cryptocurrencies so that potential investors or enthusiasts could learn about each one.

## Functionality & MVP

The visualization will be simplistic and intuitive. There will be an interactive pie chart that will visualize the currencies. A hover and click feature will be implemented to display currency information. Additionally, interactive "controls" will allow for user interaction and adjustment of data.

The app will be a single screen with a central point for pie chart. The controls and description box will be on the right hand side, while tooltips will appear on hover of pie slice segments.

## Architecture and technologies
The core of this app is JavaScript and jQuery to handle the user control interaction.
Within the JavaScript I implemented a few API additions to fetch the currency data.
I utilize 3D.js for the pie chart representation and TechanJS for the candlestick chart.

piechart.js - within the piechart file will be the core of the rendering. It will handle all of the visualization and re rendering of new visualization for user data.

chart.js - an added view allowing the user to see the historical pricing as a candlestick chart (a poplular financial graph representing the days high, low, close and opening prices).

index.html - will run the piechart.js/chart.js as well as contain form inputs for the user interaction.

## Implementation Timeline

Day 1: Read up on and learn to use d3, begin creating the pie chart element.

Day 2: Render the information associated with pie slices as tooltips and side information.

Day 3: Implement the interactive user controls.

## Credits
API calls are being made to https://api.coinmarketcap.com for broad scale currency data.
Meanwhile, API calls to https://min-api.cryptocompare.com are for historical price data.
