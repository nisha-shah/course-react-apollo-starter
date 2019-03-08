export const typeDefs = `
type Query {
    hello: String
    category(id: ID!): Category
    categories: [Category]
    task(id:ID!): Task
    tasks(page: Int limit: Int filters: TaskFilterInput ): [Task]
    paginatedTasks( page: Int limit: Int filters: TaskFilterInput): PaginatedTasks
}

enum ConnectionOrder {
  asc
  desc
}

type PaginatedTasks {
  page: Int
  limit: Int
  total: Int
  nextPage: Int
  tasks: [Task]
}

type Mutation {
  createTask(input: CreateTaskInput!): CreateTaskPayload
  updateTask(id: ID! input: UpdateTaskInput!): UpdateTaskPayload
  deleteTask(id: ID!): DeleteTaskPayload
}

type Subscription {
  taskCreated: Task
  taskDeleted: Task
  taskUpdated: Task
}

input UpdateTaskInput {
  name: String
  category: ID
  status: TaskStatusEnum
}

type DeleteTaskPayload {
  deletedId: ID
  task: Task
}

type UpdateTaskPayload {
  task: Task
}

type CreateTaskPayload {
  task: Task
}

input CreateTaskInput {
  name: String!
  category: ID
}

enum TaskSortEnum {
  createdDate
  name
  status
}

input TaskFilterInput {
    status: TaskStatusEnum
    category: ID
    order: ConnectionOrder
    sort: TaskSortEnum
}

enum TaskStatusEnum {
 ALL
 COMPLETED
 INCOMPLETE
}

type Task {
  id: ID!
  name: String
  category: Category
  status: TaskStatusEnum
  createdDate: String
}

type Category {
 id: ID!
 name: String
 color: String
 tasks: [Task]
}
`;
