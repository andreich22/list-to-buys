import {randomId} from '../../lib/id';


export function toogleCheckbox (state, payload) {
    let {tasks} = state;
    const {id, name} = payload;
    tasks[id][name] = !tasks[id][name];

    return {...state, 
        tasks : tasks
    }
}

/**
 * удалаяет задачи
 * TODO Надо переделать удаления
 */
export function deleteTask (state) {
    let {tasks, tasksOrder} = state;

    for (var key in tasks) {
        if (tasks.hasOwnProperty(key)) {
            var element = tasks[key];
            if (element.shouldByDelete) {
                delete tasks[key];
                delete tasksOrder[key];
                tasksOrder = deleteElemArray(tasksOrder, key)
            }
        }
    }

    return {...state, 
        tasks : tasks,
        tasksOrder: tasksOrder
    }
}

/**
 * Удаляет из массива элемент по значению поля
 */
function deleteElemArray (array, field) {
    return array.filter((elem) => {
        if (elem == field) {
            return false;
        }
        return true;
    })
}

/**
 * Создает задачу
 */
export function createTask (state) {
    const createTask = {
            name: '', 
            text : '',
            shouldByDelete : false,
            shouldByFinish : false,
            id: randomId()
    }

    return {...state, 
        createTask : createTask, 
        neededCreateNewTask : true, 
        startEditedTask: false 
    }
}

/**
 * Сохранить задачу
 */
export function taskSave (state, payload) {
    const {id} = payload;
    let {tasks, editedTask} = state;

    tasks[id] = editedTask;

    return {
        ...state, 
        tasks, 
        neededCreateNewTask : false,
        startEditedTask: false,
        editedTask: {}
    }
}

/**
 * Сохранить задачу
 */
export function taskSaveCreate (state) {
    const {tasks, createTask} = state;
    let {tasksOrder} = state;
    const {id} = createTask;

    tasks[id] = createTask;
    tasksOrder.push(id);

    return {
        ...state, 
        tasks, 
        neededCreateNewTask : false,
        startEditedTask: false, 
        createTask : {}
    }
}

/**
 * Отменить создание задачи
 */
export function cancelCreateTask (state) {
    return {...state, 
        neededCreateNewTask : false, 
        startEditedTask: false, 
        createTask : {}
    }
}

/**
 * Редактирование поля
 */
export function editField (state, payload) {
    const {name, value, typeTask} = payload;
    return {
        ...state, 
        [typeTask] : {...state[typeTask], [name]: value}
    }
}

/**
 * Редактирование задачи
 * TODO Вынести состояние формы в отдельный редюсер
 */
export function editTask (state, payload) {
    const {id} = payload;
    const {tasks} = state;

    return {...state, 
        editedTask: tasks[id], 
        startEditedTask: true 
    }
}