import { Task, TaskList } from "../../utils/schemas/tasks.schema";

/**
 *  Singleton Class to manage in-memory task storage
 */
class TaskDatabase {
  private tasks: Map<string, Task> = new Map();

  private constructor() {}

  /**
   * Singleton method
   */
  public static getInstance(): TaskDatabase {
    const globalKey = "_db_instance";
    const globalForDb = globalThis as unknown as {
      [key: string]: TaskDatabase;
    };

    if (!globalForDb[globalKey]) {
      globalForDb[globalKey] = new TaskDatabase();
    }

    return globalForDb[globalKey];
  }

  private getNowIsoTime(): string {
    return new Date().toISOString();
  }

  /**
   * CREATE: Automatically generates Id and createDateTime
   */
  public create(data: {
    title: Task["title"];
    description?: Task["description"];
  }): Task {
    const id = Math.random().toString(36).substring(2, 8);

    const newTask: Task = {
      ...data,
      id,
      createDateTime: this.getNowIsoTime(),
    };

    this.tasks.set(id, newTask);
    return newTask;
  }

  /**
   * READ: Lists all tasks
   */
  public getAll(): TaskList {
    return Array.from(this.tasks.values());
  }

  /**
   * READ: Finds a specific task by Id
   */
  public getById(id: Task["id"]): Task | undefined {
    if (id) return this.tasks.get(id.toString());
    else return undefined;
  }

  /**
   * UPDATE: Updates title, description and updateDateTime
   */
  public update({
    id,
    form,
  }: {
    id: Task["id"];
    form: Partial<Task>;
  }): Task | undefined {
    if (id) {
      const existingTask = this.tasks.get(id.toString());

      if (!existingTask) {
        throw new Error(`Task with ID ${id} not found in the database.`);
      }

      const updatedTask: Task = {
        ...existingTask,
        ...form,
        updateDateTime: this.getNowIsoTime(),
      };

      this.tasks.set(id.toString(), updatedTask);
      return updatedTask;
    } else return undefined;
  }

  /**
   * DELETE: Removes the task from the Map
   */
  public delete(id: Task["id"]): boolean {
    if (id) return this.tasks.delete(id.toString());
    else return false;
  }
}

export default TaskDatabase;
