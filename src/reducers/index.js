import { combineReducers } from 'redux'
import task from './task'
import editorTask from './editorTask'

export default combineReducers({
  task,
  editorTask
})