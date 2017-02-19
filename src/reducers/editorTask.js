//import * as types from '../constans/taskActionTypes';
import * as helpers from './helpers/editorTaskHelper';


const stateInit = {
    createTask : {},
    editedTask : false
}

/**
 * Создаёт редьюсер редактирования задач
 * @param {object} state
 * @returns {object} action
 */
export default function editorTask(state = stateInit, action) {
    const {payload, type} = action;
    
    switch (type) {
      
      //создает задачу
        case 'types.TASK_CREATE':
            return helpers.createTask(state, payload)
      
    }

    return state;
}