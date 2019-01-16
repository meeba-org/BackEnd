export const filterTasks = (tasks, parent) => {
    let id = (!parent) ? null : parent._id;
    return tasks.filter(task => task.parent === id);
};
