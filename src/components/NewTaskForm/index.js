import React, { Component } from "react"
import { Input, Button, Divider } from "antd"
import CategorySelect from "../CategorySelect"

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
      <form
        onSubmit={e => {
          e.preventDefault()
          alert(
            `Create new task ${this.state.name}, category: ${
              this.state.category
            }`
          )
        }}
      >
        <h2>Create Task: </h2>
        <Input.Group compact>
          <Input
            style={{ width: `70%` }}
            placeholder="Type here to add new task"
            onChange={e => {
              this.setState({ name: e.target.value })
            }}
          />
          <CategorySelect
            handleOnChange={this.setCategory}
            style={{ width: `20%` }}
          />
          <Button style={{ width: `10%` }} type="primary" htmlType="submit">
            Create Task
          </Button>
        </Input.Group>
        <Divider />
      </form>
    )
  }
}

export default NewTaskForm
