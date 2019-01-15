export const filterTasks = (tasks, parent) => {
    return tasks.filter(task => task.parent === parent);
};
