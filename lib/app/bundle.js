/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _piechart = __webpack_require__(1);

var _piechart2 = _interopRequireDefault(_piechart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  UpdateData();
});
//
// var form = document.getElementById("userForm");
//
// if (form) { form.elements.addEventListener("submit", (e) => {
//     e.preventDefault();
//     form;
//     debugger
//   });
// };

$(document).ready(function () {
  $('#userForm').on('submit', function (e) {
    e.preventDefault();
    var count = $("select#DropDownList option:checked").val();
    var category = $("select#categories option:checked").val();
    var start = $("input#count").val();
    var inputs = Object.assign({}, { 'start_point': start, 'count': count, 'category': category });
    UpdateData(inputs);
  });
});

function UpdateData(inputs) {
  var inputs = typeof inputs !== 'undefined' ? inputs : { 'start_point': '0', 'count': '10', 'category': 'market_cap_usd' };
  var start = parseInt(inputs.start_point);
  var count = parseInt(inputs.count);
  var category = inputs.category;

  var url = 'https://api.coinmarketcap.com/v1/ticker/?start=' + start + '&limit=' + count;
  (0, _piechart2.default)(url, category);
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = BuildPiechart;
function BuildPiechart(url, category) {

  d3.select('svg').remove();
  d3.select('article').selectAll('div').remove();

  var margin = { top: 20, right: 20, bottom: 20, left: 20 },
      width = 600 - margin.right - margin.left,
      height = 600 - margin.top - margin.bottom,
      radius = width / 2;

  // Other Color codes
  // ["#3366CC","#DC3912","#FF9900","#109618",
  //   "#990099","#3B3EAC","#0099C6","#DD4477","#66AA00","#B82E2E","#316395","#994499",
  //   "#22AA99","#AAAA11","#6633CC","#E67300","#8B0707","#329262","#5574A6","#3B3EAC"]

  var color = d3.scaleOrdinal().range(['#ffffcc', '#ffff99', '#ffff66', '#ffff33', '#ffff00', '#ccff66', '#ccff33', '#ccff00', '#99ff66', '#99ff33', '#99ff00', '#99cc66', '#99cc33', '#99cc00', '#cccc66', '#cccc33', '#cccc00', '#ffcc66', '#ffcc33', '#ffcc00']);

  var arc = d3.arc().outerRadius(radius - 10).innerRadius(radius - 70).cornerRadius(5).padAngle(0.005);

  var labelArc = d3.arc().outerRadius(radius - 30).innerRadius(radius - 50);

  var pie = d3.pie().sort(null).value(function (d) {
    return d[category];
  });

  var svg = d3.select("section").append("svg").attr("width", width).attr("height", height).append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  svg.append("text").attr("text-anchor", "middle").attr("class", "title").attr("dy", "0em").text("CRYPTOCURRENCIES");
  svg.append("text").attr("text-anchor", "middle").attr("class", "subtitle").attr("dy", "1.2em").text("Sorted by " + category.replace(/_|-|\./g, ' '));

  var data = d3.json(url, function (error, data) {
    data.forEach(function (d) {
      d.name = d.name;
      d.market_cap_usd = +d.market_cap_usd;
      d.price_usd = +d.price_usd;
      d.rank = +d.rank;
      d.symbol = d.symbol;
      d.percent_change_24h = +d.percent_change_24h;
      d.percent_change_7d = +d.percent_change_7d;
      d.last_updated = d.last_updated;
    });

    var div = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0.7);

    var description = d3.select("article").append("div").attr("class", "description");

    description.append('div').attr('class', 'rank');
    description.append('div').attr('class', 'name');
    description.append('div').attr('class', 'symbol');
    description.append('div').attr('class', 'price');
    description.append('div').attr('class', 'market_cap_usd');
    description.append('div').attr('class', 'percent_change_7d');
    description.append('div').attr('class', 'percent_change_24h');
    description.append('div').attr('class', 'last_updated');

    var g = svg.selectAll(".arc").data(pie(data)).enter().append("g").attr("class", "arc").style("cursor", "pointer").on("mouseover", function (d) {
      div.transition().duration(200).style("opacity", .9);
      div.html("Currency: " + d.data.name + "<br/>" + "Rank: #" + d.data.rank).style("left", d3.event.pageX + "px").style("top", d3.event.pageY - 28 + "px");
    }).on("mouseout", function (d) {
      div.transition().duration(500).style("opacity", 0);
    }).on("click", function (d) {
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

    var path = g.append("path").attr("d", arc).style("fill", function (d) {
      return color(d.data.name);
    }).attr("id", function (d) {
      return "arc-" + count++;
    }).transition().ease(d3.easeLinear).duration(2200).attrTween('d', pieTween);

    g.append("text").transition().ease(d3.easeLinear).duration(2500).attr("transform", function (d) {
      return "translate(" + labelArc.centroid(d) + ")";
    }).attr("dy", "14px").text(function (d) {
      return d.data.name;
    });

    function change() {
      var value = this.value;
      clearTimeout(timeout);
      pie.value(function (d) {
        return d[value];
      });
      path = path.data(pie);
      path.transition().duration(2000).attrTween("d", pieTween);
    }

    function midAngle(d) {
      return d.startAngle + (d.endAngle - d.startAngle) / 2;
    }
  });

  function pieTween(b) {
    b.innerRadius = 0;
    var x = d3.interpolate({ startAngle: 0, endAngle: 0 }, b);
    return function (t) {
      return arc(x(t));
    };
  };
}

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map