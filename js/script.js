// var data = [[],[]]
// data[0][0] = 0;
// data[0][1] = document.querySelector('.ani-box').clientHeight;
// data[1][0] = document.querySelector('.ani-box').clientWidth;
// data[1][1] = document.querySelector('.ani-box').clientHeight;
var width = document.querySelector('.ani-box').clientWidth
var height = document.querySelector('.ani-box').clientHeight
var data = [width, height];


var area = d3.svg.area()
  .interpolate('linear')
  .x(function(d, i) {
    return d[0]
  })
  .y0(function(d) {
    return d[1]
  })
  .y1(function(d) {
    return 0
  })

var svgL = d3.selectAll('.box-left')
  .datum(data)
  .append('svg')
  .attr('viewBox', '0,0,' + width + ',' + height)
  .attr('preserveAspectRatio', 'none')
  .append('g')
  .attr('transform', 'translate(' + data[0] / 2 + ',0)')

var pathL = svgL.append('path')
  .attr('d', function(d) {
    return createCur(d, 0, d[1] / 2, 'l')
  })


var svgR = d3.selectAll('.box-right')
  .datum(data)
  .append('svg')
  .attr('viewBox', '0,0,' + width + ',' + height)
  .attr('preserveAspectRatio', 'none')
  .append('g')
  .attr('transform', 'translate(' + -data[0] / 2 + ',0)')

var pathR = svgR.append('path')
  .attr('d', function(d) {
    return createCur(d, d[0], d[1] / 2)
  })


function update(times) {
  pathL
    .transition()
    .attr('d', function(d) {
      return createCur(d, d[0], d[1] / 2, 'l')
    })
    .duration(300)
    .transition()
    .attr('d', function(d) {
      return createCur(d, -d[0], d[1] / 2, 'l')
    })
    .duration(300)

  pathR
    .transition()
    .attr('d', function(d) {
      return createCur(d, d[0] * 2, d[1] / 2)
    })
    .duration(300)
    .transition()
    .attr('d', function(d) {
      return createCur(d, 0, d[1] / 2)
    })
    .duration(300)
}

setInterval(function() {
  update()
}, 600)

//d:数据d x,y:贝塞尔曲柄坐标
function createCur(d, x, y, lr) {
  if (lr === 'l')
    return 'M0,0L' + d[0] + ',0L' + d[0] + ',' + d[1] + 'L0,' + d[1] + 'Q' + x + ',' + y + ' 0,0z'
  else
    return 'M0,0L' + d[0] + ',0' + 'Q' + x + ',' + y + ' ' + d[0] + ',' + d[1] + 'L0,' + d[1] + ' 0,0z'

}