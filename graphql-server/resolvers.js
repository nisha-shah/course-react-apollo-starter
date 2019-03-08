import { PubSub } from "graphql-subscriptions"
import { CategoryModel, TasksModel } from "./models"

const pubsub = new PubSub()
const TASK_CREATED = "taskCreated"
const TASK_DELETED = "taskDeleted"
const TASK_UPDATED = "taskUpdated"

export const resolvers = {
    Query:  {
        hello: () => {
            return `world!`
        },
        category: async (root, { id }) => {
            return await CategoryModel.getCategoryById(id)
        },
        categories: async () => {
            return await CategoryModel.getCategories();
        },
        task: async (root, { id }) => {
            return await TasksModel.getTaskById( id );
        },
        tasks: async (root, { filters = {} }) => {
            const res = await TasksModel.getTasks(filters);
            return res.tasks;
        }
    },
    Mutation: {
        createTask: async (root, { input }) => {
            return await TasksModel.createTask(input).then(task => {
                pubsub.publish(TASK_CREATED, { taskCreated: task })
                return {
                    task,
                }
            })
        },
        updateTask: async ( root, { id, input } ) => {
            const updatedTask = await TasksModel.updateTask(id, input);
            pubsub.publish( TASK_UPDATED, { taskUpdated: updatedTask });
            return {
                task: updatedTask
            }
        },
        deleteTask: async (root, { id }) => {
            const task = await TasksModel.getTaskById(id);
            const deletedId = await TasksModel.deleteTask(id);
            pubsub.publish( TASK_UPDATED, { task, deletedId });
            return {
                task,
                deletedId
            }
        }
    },
    Task: {
        category: async ({ category }) => {
            return await CategoryModel.getCategoryById( category );
        }
    },
    Subscription: {
        taskCreated: {
            subscribe: () => pubsub.asyncIterator(TASK_CREATED)
        },
        taskDeleted: {
            subscribe: () => pubsub.asyncIterator(TASK_UPDATED)
        },
        taskUpdated: {
            subscribe: () => pubsub.asyncIterator(TASK_DELETED)
        }
    }
};
