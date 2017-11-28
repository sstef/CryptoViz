import BuildPiechart from './app/piechart'
import BuildCandlestickChart from './app/chart'

document.addEventListener('DOMContentLoaded', () => {
  UpdateData();

  $('#closeModal').on("click", (e) => {
      e.preventDefault();
      $('#modal').toggleClass("hidden instructions");
    });
});

$(document).ready(function(){
    $('#userForm').on('submit', function(e){
        e.preventDefault();
        // Find all values of user inputs to repopulate the charts
        var count = $("select#DropDownList option:checked").val();
        var category = $("select#categories option:checked").val();
        var start = $("input#count").val();
        var inputs = Object.assign({}, {'start_point': start, 'count': count, 'category': category});
        UpdateData(inputs);
    });

    $('aside').hover( () => {
        $('aside').stop().animate({"left":"-10px"}, 300);
      },
      () => {
        $('aside').stop().animate({"left":"-85px"}, 300);
      }
    );

    $('#glossaryIcon').on("click", (e) => {
        e.preventDefault();
        $('#glossary').toggleClass("instructions hidden");
      });
});

function UpdateData (inputs) {
  var inputs = (typeof inputs !== 'undefined') ? inputs :  {'start_point': '0', 'count': '5', 'category': 'market_cap_usd'}
  var start = parseInt(inputs.start_point);
  var count = parseInt(inputs.count);
  var category = inputs.category;

  var url = `https://api.coinmarketcap.com/v1/ticker/?start=${start}&limit=${count}`;


  BuildPiechart(url, category);
  BuildCandlestickChart('BTC');
};
