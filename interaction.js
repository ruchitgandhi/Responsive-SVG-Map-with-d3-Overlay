/* Created on jsFiddle */

//To display additional information on hovering over states
$("path").hover(function(e) {
  $('#information-box').css('display', 'block');
  $('#information-box').html($(this).data('info'));
});
$("path").mouseleave(function(e) {
  $('#information-box').css('display', 'none');
});
$(document).mousemove(function(e) {
  $('#information-box').css('top', e.pageY - $('#information-box').height() - 30);
  $('#information-box').css('left', e.pageX - ($('#information-box').width()) / 2);
}).mouseover();

//d3 overlay of cities in circles over US SVG map
var width = 959;
var height = 593;
var projection = d3.geo.albersUsa().translate([width / 2, height / 2]).scale(1260);

//Parse the CSV data for cities
var data = d3.csv.parse(d3.select("pre#data").text());

d3.select("svg").selectAll("circle").data(data)
  .enter()
  .append("circle")
  .attr("cx", function(d) {
    return projection([d.lon, d.lat])[0];
  })
  .attr("cy", function(d) {
    return projection([d.lon, d.lat])[1];
  })
  .attr("r", function(d) {
    return Math.sqrt(d.radius) * 4;
  })
  .attr("data-info", function(d) {
    return "<div>" + d.place + "</div>";
  })
  .style("fill", "rgb(217,91,67)")
  .style("opacity", 0.85)
  .on("mouseover", function(e) {
    d3.select("#information-box")
      .attr("class", "tooltip")
      .style("display", "block")
      .text(e.place);
  });
