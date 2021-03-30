import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'

export default function GenderDropdown({genderSelect}) {
  return (
    <Dropdown> 
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        Please select gender
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onSelect={() => genderSelect("men")}>Men</Dropdown.Item>
        <Dropdown.Item onSelect={() => genderSelect("women")}>Women</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}