import React, { Fragment } from "react"
import { Query } from "react-apollo"
import gql from "graphql-tag"
import { List } from "antd"
import TaskItem from "../TaskItem"
import Box from "../Box"
import StatefulBox from "../StatefulBox"
import { TaskItemFragment } from "../TaskItem"
import { withTaskFilters } from "../WithTaskFilters"

export const GET_TASKS_QUERY = gql`
  query GET_TASKS($filters: TaskFilterInput) {
    tasks(filters: $filters) {
      ...TaskItem
    }
  }
  ${TaskItemFragment}
`

export const TASK_CREATED_SUBSCRIPTION = gql`
  subscription {
    taskCreated {
      ...TaskItem
    }
  }
  ${TaskItemFragment}
`

export const TASK_DELETED_SUBSCRIPTION = gql`
  subscription {
    taskDeleted {
      ...TaskItem
    }
  }
  ${TaskItemFragment}
`

export const TASK_UPDATED_SUBCRIPTION = gql`
  subscription {
    taskUpdated {
      ...TaskItem
    }
  }
  ${TaskItemFragment}
`

let unsubscribe = null

const TaskList = ({ filters }) => {
  return (
    <Query
      query={GET_TASKS_QUERY}
      variables={{
        filters: filters ? filters : { category: null, status: `ALL` },
      }}
    >
      {({ data, loading, errors, subscribeToMore }) => {
        if (loading) {
          return "...loading"
        }
        if (errors) {
          return null
        }
        const { tasks } = data

        if (!unsubscribe) {
          unsubscribe = subscribeToMore({
            document: TASK_CREATED_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev
              const { taskCreated } = subscriptionData.data
              if (taskCreated) {
                console.log(taskCreated)

                return {
                  ...prev,
                  tasks: [taskCreated, ...prev.tasks],
                }
              }
              return prev
            },
          })
          unsubscribe = subscribeToMore({
            document: TASK_DELETED_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev
              const { taskDeleted } = subscriptionData.data

              console.log(taskDeleted)

              if (taskDeleted) {
                const index = prev.tasks.findIndex(
                  obj => obj.id === taskDeleted.id
                )
                const newTasks = [
                  ...prev.tasks.slice(0, index),
                  ...prev.tasks.slice(index + 1),
                ]
                return {
                  ...prev,
                  tasks: newTasks,
                }
              }
              return prev
            },
          })
          unsubscribe = subscribeToMore({
            document: TASK_UPDATED_SUBCRIPTION,
          })
        }

        return (
          <Fragment>
            <List
              style={{
                background: `white`,
              }}
              loading={loading}
              dataSource={tasks}
              renderItem={task => {
                return (
                  <List.Item>
                    <TaskItem task={task} />
                  </List.Item>
                )
              }}
            />
            <Box>
              <Box>
                <Box>
                  <Box>
                    <Box>
                      <Box>
                        <Box>
                          <StatefulBox />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Query
              query={gql`
                query luke {
                  person @rest(type: "Person", path: "people/1/") {
                    name
                  }
                  species @rest(type: "Species", path: "species/1/") {
                    name
                  }
                }
              `}
            >
              {({ data, loading, errors }) => {
                if (loading || errors) return null
                return (
                  <div>
                    {data.person.name} {data.species.name}
                  </div>
                )
              }}
            </Query>
          </Fragment>
        )
      }}
    </Query>
  )
}

export default withTaskFilters(TaskList)
