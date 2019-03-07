import React, { Fragment, Component } from "react"
import NewTaskForm from "../NewTaskForm/index.js"
import TaskFilters from "../TaskFilters/index.js"
import TaskList from "../TaskList/index.js"

class TaskManager extends Component {
  state = {
    filters: {
      status: `ALL`,
      category: null,
    },
  }

  setCategoryFilter = category => {
    const { filters } = this.state
    const newFilters = { ...filters, ...{ category } }
    this.setState({ filters: newFilters })
  }

  setStatusFilter = status => {
    const { filters } = this.state
    const newFilters = { ...filters, ...{ status } }
    this.setState({ filters: newFilters })
  }

  render() {
    return (
      <Fragment>
        <NewTaskForm />
        <TaskFilters
          handleStatusChange={this.setStatusFilter}
          handleCategoryChange={this.setCategoryFilter}
        />
        <TaskList filters={this.state.filters} />
      </Fragment>
    )
  }
}

export default TaskManager
