import BuildPiechart from './app/piechart'
import BuildCandlestickChart from './app/chart'

document.addEventListener('DOMContentLoaded', () => {
  UpdateData()
})

$(document).ready(function(){
    $('#userForm').on('submit', function(e){
        e.preventDefault();
        var count = $("select#DropDownList option:checked").val();
        var category = $("select#categories option:checked").val();
        var start = $("input#count").val();
        var inputs = Object.assign({}, {'start_point': start, 'count': count, 'category': category});
        UpdateData(inputs);
    });
});

function UpdateData (inputs) {
  var inputs = (typeof inputs !== 'undefined') ? inputs :  {'start_point': '0', 'count': '10', 'category': 'market_cap_usd'}
  var start = parseInt(inputs.start_point);
  var count = parseInt(inputs.count);
  var category = inputs.category;

  var url = `https://api.coinmarketcap.com/v1/ticker/?start=${start}&limit=${count}`;


  BuildPiechart(url, category);
  BuildCandlestickChart('BTC');
};
