import React from "react"
import { Row, Col, Radio } from "antd"
import CategorySelect from "../CategorySelect"

const RadioButton = Radio.Button
const RadioGroup = Radio.Group

const TaskFilters = ({ handleStatusChange, handleCategoryChange }) => {
  return (
    <Row style={{ padding: `20px 0` }}>
      <h2>Filter Tasks:</h2>
      <Col xs={12}>
        <CategorySelect
          handleOnChange={value => {
            handleCategoryChange(value)
          }}
        />
      </Col>
      <Col xs={12}>
        <Row type="flex" justify="end">
          <RadioGroup
            onChange={e => {
              handleStatusChange(e.target.value)
            }}
          >
            <RadioButton value="ALL">ALL</RadioButton>
            <RadioButton value="COMPLETED">Completed</RadioButton>
            <RadioButton value="INCOMPLETE">Incomplete</RadioButton>
          </RadioGroup>
        </Row>
      </Col>
    </Row>
  )
}

export default TaskFilters
