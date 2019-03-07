import React from "react"
import gql from "graphql-tag"
import { Row, Col, Tag, Button } from "antd"

export const TaskItemFragment = gql`
  fragment TaskItem on Task {
    name
    status
    category {
      name
      color
    }
  }
`

const TaskItem = ({ task: { name, status, category } }) => (
  <Row
    type="flex"
    style={{
      padding: `10px 25px`,
      width: `100%`,
    }}
  >
    <Col xs={12}>
      <h2>{name}</h2>
        { category && category.name ? <Tag color={category.color}>{category.name}</Tag> : null }
    </Col>
    <Col xs={12}>
      <Row type="flex" justify="end">
        {`COMPLETED` === status ? (
          <Button
            type="primary"
            onClick={() => {
              alert(`mark task incomplete: ${name}`)
            }}
          >
            Mark Incomplete
          </Button>
        ) : (
          <Button
            type="danger"
            onClick={() => {
              alert(`mark task complete: ${name}`)
            }}
          >
            Mark Completed
          </Button>
        )}
        <Button
          style={{ marginLeft: `15px` }}
          icon="delete"
          type="danger"
          onClick={() => {
            alert(`delete task ${name}`)
          }}
        >
          Delete
        </Button>
      </Row>
    </Col>
  </Row>
)

export default TaskItem
