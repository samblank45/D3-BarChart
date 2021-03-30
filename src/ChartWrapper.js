import React from 'react'
import D3Chart from './D3Chart'

export default class ChartWrapper extends React.Component {
  chartRef = React.createRef()

  componentDidMount() {
    this.setState({
      chart: new D3Chart(this.chartRef.current)
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.gender !== this.props.gender) {
      this.state.chart.update(this.props.gender)
    }
  }

  render() {
    return (
      <div ref={this.chartRef}>

      </div>
    )
  }
}