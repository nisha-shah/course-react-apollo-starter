import React from "react"
import { Select, Tag } from "antd"
import { Query } from "react-apollo"
import gql from "graphql-tag"

const { Option } = Select

const GET_CATEGORIES_QUERY = gql`
  query GET_CATEGORIES {
    categories {
      id
      name
      color
    }
  }
`

const CategorySelect = props => {
  const { handleOnChange } = props
  return (
    <Query query={GET_CATEGORIES_QUERY}>
      {({ data, loading, errors }) => {
        if (errors) {
          console.log(errors)
        }
        const { categories } = data
        return (
          <Select
            style={{ width: 200 }}
            loading={loading}
            allowClear={true}
            onChange={handleOnChange}
          >
            {categories &&
              categories.map(category => {
                const { id, name, color } = category
                return (
                  <Option key={id} value={id}>
                    <Tag color={color}>{name}</Tag>
                    {name}
                  </Option>
                )
              })}
          </Select>
        )
      }}
    </Query>
  )
}

export default CategorySelect
