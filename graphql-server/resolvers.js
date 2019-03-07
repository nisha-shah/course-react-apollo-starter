// import { PubSub } from "graphql-subscriptions"
import { CategoryModel, TasksModel } from "./models"

// const pubsub = new PubSub()
// const TASK_CREATED = "taskCreated"
// const TASK_DELETED = "taskDeleted"
// const TASK_UPDATED = "taskUpdated"

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
            const newTask = await TasksModel.createTask(input);
            return {
                task: newTask
            }
        },
        updateTask: async ( root, { id, input } ) => {
            const UpdatedTask = await TasksModel.updateTask(id, input);
            return {
                task: UpdatedTask
            }
        },
        deleteTask: async (root, { id }) => {
            const task = await TasksModel.getTaskById(id);
            const deletedId = await TasksModel.deleteTask(id);
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
    }
};
