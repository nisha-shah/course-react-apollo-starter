export const typeDefs = `
type Query {
    hello: String
    category(id: ID!): Category
    categories: [Category]
    task(id:ID!): Task
    tasks(filters: TaskFilterInput ): [Task]
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

input TaskFilterInput {
    status: TaskStatusEnum
    category: ID
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
}

type Category {
 id: ID!
 name: String
 color: String
 tasks: [Task]
}
`;
