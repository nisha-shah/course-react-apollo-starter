import React from "react"
import { Row, Col, Radio } from "antd"
import CategorySelect from "../CategorySelect"
import { Mutation } from "react-apollo"
import gql from "graphql-tag"
import { withTaskFilters } from "../WithTaskFilters"

const RadioButton = Radio.Button
const RadioGroup = Radio.Group

const SET_TASK_FILTERS_MUTATION = gql`
  mutation SET_TASK_FILTERS($id: ID, $status: TaskStatusEnum) {
    setTaskFilters(id: $id, status: $status) @client {
      category
      status
    }
  }
`

const TaskFilters = ({ filters }) => {
  return (
    <Mutation mutation={SET_TASK_FILTERS_MUTATION}>
      {setTaskFilters => {
        return (
          <Row style={{ padding: `20px 0` }}>
            <h2>Filter Tasks:</h2>
            <Col xs={12}>
              <CategorySelect
                value={filters.category ? filters.category : null}
                handleOnChange={value => {
                  setTaskFilters({ variables: { id: value ? value : null } })
                }}
              />
            </Col>
            <Col xs={12}>
              <Row type="flex" justify="end">
                <RadioGroup
                  onChange={e => {
                    setTaskFilters({ variables: { status: e.target.value } })
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
      }}
    </Mutation>
  )
}

export default withTaskFilters(TaskFilters)
