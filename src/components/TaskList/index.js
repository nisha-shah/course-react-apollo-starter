import React, { Fragment } from "react"
import { Query } from "react-apollo"
import gql from "graphql-tag"
import { List } from "antd"
import TaskItem from "../TaskItem"
import Box from "../Box"
import StatefulBox from "../StatefulBox"
import { TaskItemFragment } from "../TaskItem"

export const GET_TASKS_QUERY = gql`
  query GET_TASKS($filters: TaskFilterInput) {
    tasks(filters: $filters) {
      ...TaskItem
    }
  }
  ${TaskItemFragment}
`

export const GET_TASK_FILTERS_QUERY = gql`
  query GET_TASK_FILTERS {
    taskFilters @client {
      category
      status
    }
  }
`

const TaskList = () => {
  return (
    <Query query={GET_TASK_FILTERS_QUERY}>
      {({ data, loading, errors }) => {
        if (errors) {
          return `Errors! ${errors}`
        }
        if (loading) {
          return null
        }
        const { taskFilters } = data

        return (
          <Query
            query={GET_TASKS_QUERY}
            variables={{
              filters: taskFilters
                ? taskFilters
                : { category: null, status: `ALL` },
            }}
          >
            {({ data, loading, errors }) => {
                if (errors || loading) {
                    return null
                }
              const { tasks } = data
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
                </Fragment>
              )
            }}
          </Query>
        )
      }}
    </Query>
  )
}

export default TaskList
