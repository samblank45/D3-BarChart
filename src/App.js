import React from 'react'
import ChartWrapper from './ChartWrapper'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar'
import GenderDropdown from './GenderDropdown'

class App extends React.Component {
  state = {
    gender: "men"
  }

  genderSelect = (gender) => this.setState({ gender })

  render() {
    return (
      <div>
          <Navbar bg="light">
            <Navbar.Brand>Barchart</Navbar.Brand>
          </Navbar>
          <Container>
            <Row>
              <Col xs={12}>
                <GenderDropdown
                  genderSelect={this.genderSelect}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <ChartWrapper 
                  gender={this.state.gender}
                />
              </Col>
            </Row>
          </Container>
      </div>
    )
  }
}

export default App
