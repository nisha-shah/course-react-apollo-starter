import React, { Fragment } from "react"
import NewTaskForm from "../NewTaskForm/index.js"
import TaskFilters from "../TaskFilters/index.js"
import TaskList from "../TaskList/index.js"

const TaskManager = () => (
  <Fragment>
    <NewTaskForm />
    <TaskFilters />
    <TaskList />
  </Fragment>
)

export default TaskManager
