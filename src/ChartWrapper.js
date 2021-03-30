import React from 'react'
import D3Chart from './D3Chart'

export default class ChartWrapper extends React.Component {
  chartRef = React.createRef()

  componentDidMount() {
    this.setState({
      chart: new D3Chart(this.chartRef.current)
    })

  }

  shouldComponentUpdate() {
    return false
  }

  static getDerivedStateFromProps(nextProps, PrevState) {
    if (nextProps.gender !== PrevState.gender) {
      if (PrevState.chart) {
        PrevState.chart.update(nextProps.gender)
      }
      return {gender: nextProps.gender}
    }
    return null
  }

  render() {
    return (
      <div ref={this.chartRef}>

      </div>
    )
  }
}