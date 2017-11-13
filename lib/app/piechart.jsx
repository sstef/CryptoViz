d3.select('svg').selectAll("*").remove();

    var margin = {top: 20, right: 20, bottom: 20, left: 20},
      width = 600 - margin.right - margin.left,
      height = 600 - margin.top - margin.bottom,
      radius = width/2;

    var color = d3.scaleOrdinal().range(["#3366CC","#DC3912","#FF9900","#109618",
      "#990099","#3B3EAC","#0099C6","#DD4477","#66AA00","#B82E2E","#316395","#994499",
      "#22AA99","#AAAA11","#6633CC","#E67300","#8B0707","#329262","#5574A6","#3B3EAC"]);

    var arc = d3.arc()
      .outerRadius(radius-10)
      .innerRadius(radius - 70)
      .cornerRadius(5)
      .padAngle(0.005);

    var labelArc = d3.arc()
      .outerRadius(radius-30)
      .innerRadius(radius-50);

    var pie =d3.pie().sort(null).value((d) => d.market_cap_usd);

    var svg = d3.select("section").append("svg")
      .attr("width", width).attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width/2 + "," + height/2 + ")")

    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("class", "title")
      .text("Top Cryptocurrencies");


    const url = 'https://api.coinmarketcap.com/v1/ticker/?limit=10'

    var data = d3.json(url, function(error, data){
      data.forEach((d) => {
        d.name = d.name;
        d.market_cap_usd = +d.market_cap_usd;
        d.price_usd = +d.price_usd;
        d.rank = +d.rank;
        d.symbol = d.symbol;
        d.percent_change_24h = +d.percent_change_24h;
        d.percent_change_7d = +d.percent_change_7d;
        d.last_updated = d.last_updated;
      });

    d3.selectAll("input[type=\"radio\"]").on("change", change);

    var div = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0.7);

    var description = d3.select("article").append("div")
      .attr("class", "description");

    description.append('div').attr('class', 'rank');
    description.append('div').attr('class', 'name');
    description.append('div').attr('class', 'symbol');
    description.append('div').attr('class', 'price');
    description.append('div').attr('class', 'market_cap_usd');
    description.append('div').attr('class', 'percent_change_7d');
    description.append('div').attr('class', 'percent_change_24h');
    description.append('div').attr('class', 'last_updated');


    var g = svg.selectAll(".arc")
      .data(pie(data)).enter().append("g")
      .attr("class", "arc")
      .style("cursor", "pointer")
      .on("mouseover", (d) => {
           div.transition()
               .duration(200)
               .style("opacity", .9);
           div .html("Currency: " + d.data.name + "<br/>" + "Rank: #" + d.data.rank)
               .style("left", (d3.event.pageX) + "px")
               .style("top", (d3.event.pageY - 28) + "px");
         })
       .on("mouseout", (d) => {
           div.transition()
               .duration(500)
               .style("opacity", 0);
           })
       .on("click", (d) => {
            description.enter().transition().style("opacity", .9);
            description.select('.rank').html('#' + d.data.rank);
            description.select('.name').html("Currency: " + d.data.name);
            description.select('.symbol').html("Symbol: " + d.data.symbol);
            description.select('.price').html("Price: $" + d.data.price_usd);
            description.select('.percent_change_7d').html("7 Day Change: " + d.data.percent_change_7d + "%");
            description.select('.percent_change_24h').html("24 Hour Change: " + d.data.percent_change_24h + "%");
            description.select('.market_cap_usd').html("Market Cap: " + d.data.market_cap_usd);
            description.style('display', 'block');
        });

    var count = 0;

    var path = g.append("path").attr("d", arc)
      .style("fill", (d) => color(d.data.name))
      .attr("id", (d) => "arc-" + (count++))
      .transition().ease(d3.easeLinear)
      .duration(2200)
      .attrTween('d', pieTween);

      g.append("text")
        .transition().ease(d3.easeLinear)
        .duration(2500)
        .attr("transform", (d) => "translate(" + labelArc.centroid(d) + ")")
        .attr("dy", "14px").text((d) => d.data.name);

      var timeout = setTimeout(function() {
          d3.select("input value=\"market_cap_usd\"").property("checked", true).each(change);
        }, 2000);

      function change() {
          var value = this.value;
          clearTimeout(timeout);
          pie.value((d) => d[value]); // change the value function
          path = path.data(pie); // compute the new angles
          path.transition().duration(2000).attrTween("d", pieTween); // redraw the arcs
        }

      function midAngle(d) {
        return d.startAngle + (d.endAngle - d.startAngle) / 2;
      }

      g.selectAll("text").data(data)
       .enter()
       .append("text")
       .attr("text-anchor", "middle")
       .attr("transform", (d) => {
         var pos = labelArc.centroid(d);
         pos[0] = radius * (midAngle(d) < Math.PI ? 1 : -1);
         return "translate("+ pos +")";
       }).text((d) => d.data.name);
     });


    function pieTween (b) {
      b.innerRadius = 0;
      var x = d3.interpolate({startAngle: 0, endAngle: 0}, b);
      return (t) => arc(x(t));
    };
