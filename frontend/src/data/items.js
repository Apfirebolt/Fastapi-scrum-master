const initialData = {
    
    columns: {
        'Sunday': {
            id: 'Sunday',
            title: 'To do',
            taskIds: ['task-1', 'task-2', 'task-3', 'task-4', 'Source'],
        },
        'Monday': {
            id: 'Monday',
            title: 'In progress',
            taskIds: ['task-5', 'task-6'],
        },
        'Tuesday': {
            id: 'Tuesday',
            title: 'Active',
            taskIds: ['task-7', 'task-8'],
        },
        'Wednesday': {
            id: 'Wednesday',
            title: 'More',
            taskIds: [],
        },
        'Thursday': {
            id: 'Thursday',
            title: 'Bark More',
            taskIds: [],
        },
        'Friday': {
            id: 'Friday',
            title: 'Good Friday',
            taskIds: [],
        },
        'Saturday': {
            id: 'Saturday',
            title: 'Party',
            taskIds: [],
        }
    },
    // facilitate the ordering of columns
    columnOrder: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
};

export default initialData;