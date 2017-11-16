//  This code comes from the TechanJS Library for financial
//  modelling. You can see it here http://bl.ocks.org/andredumas/a48008ea8e2c832144db
//  I have made it more modular to my needs.

export default function BuildCandlestickChart (symbol) {

  d3.select('.candles').remove();

  var margin = {top: 20, right: 20, bottom: 30, left: 50},
          width = 660 - margin.left - margin.right,
          height = 560 - margin.top - margin.bottom;

  var x = techan.scale.financetime()
          .range([0, width]);

  var y = d3.scaleLinear()
          .range([height, 0]);

  var zoom = d3.zoom()
          .on("zoom", zoomed);

  var zoomableInit;

  var candlestick = techan.plot.candlestick()
          .xScale(x)
          .yScale(y);

  var xAxis = d3.axisBottom(x);

  var yAxis = d3.axisLeft(y);

  var svg = d3.select("section").append("svg")
          .attr("class", "candles back")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
      .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.append("text")
          .attr("dy", "40px")
          .style("transform", "translate(225px, -30px)")
          .style("color", "white")
          .html("Historical Price in USD");

  svg.append("clipPath")
          .attr("id", "clip")
      .append("rect")
          .attr("x", 0)
          .attr("y", y(1))
          .attr("width", width)
          .attr("height", y(0) - y(1));

  svg.append("g")
          .attr("class", "candlestick")
          .attr("clip-path", "url(#clip)");

  svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .attr("color", "white");

  svg.append("g")
          .attr("class", "y axis")
      .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", -40)
          .attr("dy", "16px")
          .attr("color", "white")
          .style("text-anchor", "end")
          .text("Price ($)");

  svg.append("rect")
          .attr("class", "pane")
          .attr("width", width)
          .attr("height", height)
          .call(zoom)

  var url = `https://min-api.cryptocompare.com/data/histoday?aggregate=1&e=CCCAGG&extraParams=CryptoCompare&fsym=${symbol}&limit=365&tryConversion=false&tsym=USD`;

  function returnDate (date) {
    var day = date.getDate();
    var month = ("0" + (date.getMonth() + 1)).slice(-2)
    var year = date.getYear() - 100;

    return `${day}-${month}-${year}`;
  }

  var parseDate = d3.timeParse("%d-%m-%y");

  var result = d3.json(url, function(error, data) {
      var accessor = candlestick.accessor();
      data = data.Data.map((d) => {
          let dDate = new Date(+d.time * 1000);
          return {
              date: parseDate(returnDate(dDate)),
              open: +d.open,
              high: +d.high,
              low: +d.low,
              close: +d.close,
              volume: +d.volume
          };
      }).sort(function(a, b) { return d3.ascending(accessor.d(a), accessor.d(b)); });

      x.domain(data.map(accessor.d));
      y.domain(techan.scale.plot.ohlc(data, accessor).domain());

      svg.select("g.candlestick").datum(data);
      draw();

      zoomableInit = x.zoomable().clamp(false).copy();
  });

  function zoomed() {
      var rescaledY = d3.event.transform.rescaleY(y);
      yAxis.scale(rescaledY);
      candlestick.yScale(rescaledY);

      x.zoomable().domain(d3.event.transform.rescaleX(zoomableInit).domain());

      draw();
  }

  function draw() {
      svg.select("g.candlestick").call(candlestick);
      svg.select("g.x.axis").call(xAxis);
      svg.select("g.y.axis").call(yAxis)
  }
}
