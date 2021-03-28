import * as d3 from 'd3'

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

    Promise.all([
      d3.json("https://udemy-react-d3.firebaseio.com/tallest_men.json"),
      d3.json("https://udemy-react-d3.firebaseio.com/tallest_women.json")
    ]).then((response) => {
      const [men, women] = response
      let flag = true

      this.data = men
      this.update()

      d3.interval( () => {
        this.data = flag ? men : women
        this.update()
        flag = !flag
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
    this.xAxisGroup.transition().duration(500).call(xAxisCall)

    const yAxisCall = d3.axisLeft(y)
    this.yAxisGroup.transition().duration(500).call(yAxisCall)

    //D3 GENERAL UPDATE PATTERN
    // DATA JOIN  select all matching elements and update data
    const rects = this.svg.selectAll('rect')
      .data(this.data)

    //EXIT  remove elements that don't exist in our new array of data
    rects.exit()
      .transition().duration(500)
        .attr("height", 0)
        .attr("y", HEIGHT)
        .remove()

    //UPDATE  set attributes for existing elements
    rects.transition().duration(500)
      .attr("x", d => x(d.name))
      .attr("y", d => y(d.height))
      .attr("width", x.bandwidth)
      .attr("height", d => HEIGHT - y(d.height))

    // ENTER  set attriutes for new items in data array 
    rects.enter().append('rect')
      .attr("x", d => x(d.name))
      .attr("width", x.bandwidth)
      .attr("fill", "grey")
      .attr("y", HEIGHT)
      .transition().duration(500)
        .attr("height", d => HEIGHT - y(d.height))
        .attr("y", d => y(d.height))


  }
}