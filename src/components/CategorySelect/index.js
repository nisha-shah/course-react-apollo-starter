import React from "react"
import { Select, Tag } from "antd"
import { Query } from "react-apollo"
import gql from "graphql-tag"

const { Option } = Select

export const CATEGORY_DATA_FRAGMENT = gql`
  fragment CategoryData on Category {
    id
    name
    color
  }
`

const GET_CATEGORIES_QUERY = gql`
  query GET_CATEGORIES {
    categories {
      ...CategoryData
    }
  }
  ${CATEGORY_DATA_FRAGMENT}
`

const CategorySelect = props => {
  const { handleOnChange, value } = props
  return (
    <Query query={GET_CATEGORIES_QUERY}>
      {({ data, loading, errors }) => {
        if (errors) {
          return null
        }
        const { categories } = data
        return (
          <Select
            value={value}
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
