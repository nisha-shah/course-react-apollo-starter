import React from "react"
import gql from "graphql-tag"
import { Row, Col, Tag, Button } from "antd"
import DeleteTaskButton from "../DeleteTaskButton"
import TaskStatusButtons from "../TaskStatusButtons"

export const TaskItemFragment = gql`
  fragment TaskItem on Task {
    name
    id
    status
    category {
      name
      color
    }
  }
`

const TaskItem = ({ task: { id, name, status, category } }) => (
  <Row
    type="flex"
    style={{
      borderLeft: status === `COMPLETED` ? `5px solid green` : `0`,
      padding: `10px 25px`,
      width: `100%`,
    }}
  >
    <Col xs={12}>
      <h2
        style={{
          textDecoration: status === `COMPLETED` ? `line-through` : `none`,
        }}
      >
        {name}
      </h2>
      {category && category.name ? (
        <Tag color={category.color}>{category.name}</Tag>
      ) : null}
    </Col>
    <Col xs={12}>
      <Row type="flex" justify="end">
        <TaskStatusButtons id={id} status={status} />
        <DeleteTaskButton id={id} />
      </Row>
    </Col>
  </Row>
)

export default TaskItem
