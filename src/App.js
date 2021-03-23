import React from 'react'
import ChartWrapper from './ChartWrapper'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'

class App extends React.Component {
  render() {
    return (
      <div>
          <Navbar bg="light">
            <Navbar.Brand>Barchart</Navbar.Brand>
          </Navbar>
          <Container>
            <ChartWrapper />
          </Container>
      </div>
    )
  }
}

export default App
