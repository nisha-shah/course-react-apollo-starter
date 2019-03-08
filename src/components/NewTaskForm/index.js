import React, { Component } from "react"
import { Input, Button, Divider } from "antd"
import CategorySelect from "../CategorySelect"
import { Mutation, Query } from "react-apollo"
import gql from "graphql-tag"
import { GET_TASK_FILTERS_QUERY, GET_TASKS_QUERY } from "../TaskList"

const CREATE_TASK_MUTATION = gql`
  mutation createTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      task {
        id
        name
      }
    }
  }
`

class NewTaskForm extends Component {
  state = {
    name: null,
    category: null,
  }

  setCategory = category => {
    this.setState({ category })
  }

  render() {
    return (
      <Query query={GET_TASK_FILTERS_QUERY}>
        {({ data, loading, errors }) => {
            if (errors || loading) {
                return null
            }
          const { taskFilters } = data
          if (taskFilters && taskFilters.__typename) {
            delete taskFilters.__typename
          }
          return (
            <Mutation
              mutation={CREATE_TASK_MUTATION}
              update={(
                cache,
                {
                  data: {
                    createTask: { task },
                  },
                }
              ) => {
                const query = {
                  query: GET_TASKS_QUERY,
                  variables: { filters: taskFilters },
                }
                const { tasks } = cache.readQuery(query)
                const newTasks = [...[task], ...tasks]
                cache.writeQuery({
                  query: GET_TASKS_QUERY,
                  variables: { filters: taskFilters },
                  data: {
                    tasks: newTasks,
                  },
                })
              }}
            >
              {createTask => {
                return (
                  <form
                    onSubmit={e => {
                      e.preventDefault()
                      createTask({
                        variables: {
                          input: {
                            name: this.state.name,
                            category: this.state.category,
                          },
                        },
                        refetchQueries: [
                          {
                            query: GET_TASKS_QUERY,
                            variables: {
                              filters: taskFilters,
                            },
                          },
                        ],
                      })
                      this.setState({
                        name: null,
                        category: null,
                      })
                    }}
                  >
                    <h2>Create Task: </h2>
                    <Input.Group compact>
                      <Input
                        name="name"
                        style={{ width: `70%` }}
                        placeholder="Type here to add new task"
                        value={this.state.name}
                        onChange={e => {
                          this.setState({ name: e.target.value })
                        }}
                      />
                      <CategorySelect
                        value={this.state.category}
                        handleOnChange={this.setCategory}
                        style={{ width: `20%` }}
                      />
                      <Button
                        style={{ width: `10%` }}
                        type="primary"
                        htmlType="submit"
                      >
                        Create Task
                      </Button>
                    </Input.Group>
                    <Divider />
                  </form>
                )
              }}
            </Mutation>
          )
        }}
      </Query>
    )
  }
}

export default NewTaskForm
