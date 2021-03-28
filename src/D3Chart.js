import * as d3 from 'd3'

const url = "https://udemy-react-d3.firebaseio.com/tallest_men.json"
const MARGIN = {TOP: 10, BOTTOM: 50, LEFT: 70, RIGHT: 10}
const WIDTH = 800 - MARGIN.LEFT - MARGIN.RIGHT
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM

export default class D3Chart {

  constructor(element) {
    this.svg = d3.select(element)
      .append("svg")
        .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
        .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append("g")
        .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)

    this.svg.append("text")
      .attr("x", WIDTH / 2)
      .attr("y", HEIGHT + 50)
      .attr("text-anchor", "middle")
      .text("the world's tallest men")

    this.svg.append("text")
      .attr("x", - (HEIGHT / 2))
      .attr("y", -50)
      .attr("text-anchor", "middle")
      .text("Height in cm")
      .attr("transform", "rotate(-90)") 

    this.xAxisGroup = this.svg.append('g')
      .attr("transform", `translate(0, ${HEIGHT})`)

    this.yAxisGroup = this.svg.append('g')

    
    d3.json(url).then(data => {
      this.data = data
      d3.interval( () => {
        this.update()
      }, 1000)  
    })
      
  }
  update() {
    const y = d3.scaleLinear()
      .domain([
        d3.min(this.data, d => d.height) * .95, 
        d3.max(this.data, d => d.height)])
      .range([HEIGHT,0])

    const x = d3.scaleBand()
      .domain(this.data.map(d => d.name))
      .range([0, WIDTH])
      .padding(0.6)

    const xAxisCall = d3.axisBottom(x)
    this.xAxisGroup.call(xAxisCall)

    const yAxisCall = d3.axisLeft(y)
    this.yAxisGroup.call(yAxisCall)

    //D3 GENERAL UPDATE PATTERN
    // DATA JOIN
    const rects = this.svg.selectAll('rect')
      .data(this.data)

    //EXIT
    rects.exit().remove()

    //UPDATE
    rects.attr("class","update")
      .attr("x", d => x(d.name))
      .attr("y", d => y(d.height))
      .attr("width", x.bandwidth)
      .attr("height", d => HEIGHT - y(d.height))

    // ENTER
    rects.enter().append('rect')
      .attr("x", d => x(d.name))
      .attr("y", d => y(d.height))
      .attr("width", x.bandwidth)
      .attr("height", d => HEIGHT - y(d.height))
      .attr("fill", "grey")
  }
}