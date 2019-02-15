export const filterTasks = (tasks, parent) => {
    let id = (!parent) ? null : parent;
    return tasks.filter(task => task.parent === id);
};
