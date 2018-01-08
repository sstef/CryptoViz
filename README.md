## README

# CryptoViz

The hottest trend in the financial world today has been cryptocurrency. These enigmas of market mentality have shown enormous profitability with staggering volatility. Still, the demand continues to soar as their value increases. As such, I wanted to create an interactive visualization of cryptocurrencies so that potential investors or enthusiasts could learn about each one.

## Functionality

CryptoViz is a single screen app with a central point for pie chart. The visualization is simplistic and intuitive. An interactive pie chart visualizes the currencies multiple JSON responses. A hover and click feature displays currency information through dynamic asynchronous API calls. After selection of currency the user may switch chart views and and visualize historical pricing.

![Chart change](/readme/chart_change.gif)

Additionally, interactive "controls" will allow for user interaction and adjustment of data through dynamic API fetching.

![Controls](/readme/rerender.gif)

Furthermore, rendering top headlines via D3 have in app page opening capabilities through iframes and modal features.

![News](/readme/news.gif)


## Architecture and technologies
The core of this app is JavaScript and jQuery to handle the user control interaction.
Within the JavaScript I implemented a few API additions to fetch the currency data.
I utilize D3.js for the pie chart representation and TechanJS for the candlestick chart.

entry.js - the webpack bundle entry file. It also gives functionality to the controls and buttons, mainly through jQuery.

piechart.js - within the pie chart file will be the core of the rendering. It will handle all of the visualization and re-rendering of new visualization for user data.

chart.js - an added view allowing the user to see the historical pricing as a candlestick chart (a popular financial graph representing the days high, low, close and opening prices).

news.js - provides information extension to user with top headlines as well as in-site iframe rendering of links to news, achieved by having the browser make the call to the page.
```JavaScript
    var wrapper = article.append("div").attr('class', 'wrapper');
    wrapper.append('div').attr('class', 'url').style('cursor', 'pointer').style('color', 'cyan')
      .html("See more").on("click", () => {
        window.open(a.url, "newsFrame");
        $('#news-view').toggleClass("hidden instructions");
      });
```

index.html - will run the piechart.js/chart.js and news.js as well as contain form inputs for the user interaction.

## Credits
*  API calls are being made to https://api.coinmarketcap.com for broad scale currency data.
*  Meanwhile, API calls to https://min-api.cryptocompare.com are for historical price data.
*  Top news headlines comes from another API, specifically the cryptocurrency section of NewsAPI.
