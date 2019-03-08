import React from "react"
import { Row, Col, Radio } from "antd"
import CategorySelect from "../CategorySelect"
import { Mutation, withApollo } from "react-apollo"
import gql from "graphql-tag"
import { withTaskFilters } from "../WithTaskFilters"
import { GET_TASKS_QUERY } from "../TaskList"

const RadioButton = Radio.Button
const RadioGroup = Radio.Group

const SET_TASK_FILTERS_MUTATION = gql`
  mutation SET_TASK_FILTERS(
    $order: ConnectionOrder
    $id: ID
    $status: TaskStatusEnum
  ) {
    setTaskFilters(order: $order, id: $id, status: $status) @client {
      category
      status
    }
  }
`

const TaskFilters = ({ filters, client }) => {
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
              <RadioGroup
                onChange={e => {
                  console.log(e.target.value)
                  setTaskFilters({ variables: { order: e.target.value } })
                }}
              >
                <RadioButton value="asc">ASC</RadioButton>
                <RadioButton value="desc">DESC</RadioButton>
              </RadioGroup>
            </Col>
            <Col xs={12}>
              <Row type="flex" justify="end">
                <RadioGroup
                  onChange={e => {
                    setTaskFilters({ variables: { status: e.target.value } })
                  }}
                >
                  <RadioButton value="ALL">ALL</RadioButton>
                  <RadioButton
                    onMouseEnter={() => {
                      client.query({
                        query: GET_TASKS_QUERY,
                        variables: {
                          filters: { category: null, status: `COMPLETED` },
                        },
                      })
                    }}
                    value="COMPLETED"
                  >
                    Completed
                  </RadioButton>
                  <RadioButton
                    onMouseEnter={e => {
                      console.log(e.target.value)
                    }}
                    value="INCOMPLETE"
                  >
                    Incomplete
                  </RadioButton>
                </RadioGroup>
              </Row>
            </Col>
          </Row>
        )
      }}
    </Mutation>
  )
}

export default withApollo(withTaskFilters(TaskFilters))
