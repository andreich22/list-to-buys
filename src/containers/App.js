import React, { Component, PropTypes} from 'react'
import { connect }              from 'react-redux';
import { bindActionCreators } from 'redux';
import ButtonBasic from '../components/button/ButtonBasic'
import ListLView from '../components/listLView/ListLView'
import ModalBase from '../components/modal/ModalBase'
import * as taskAction from '../actions/taskAction'
import { postRequest } from '../../request/request'


/**
 * Класс, создающий контейнер приложения.
 * @param {object} props  Свойства.
 * @param {array} [props.tasks]  Массив задач.
 * @param {object} [props.createTask]  Содержит объект задачи до ее сохранения или отмены.
 * @param {object} [props.editedTask]  Содержит объект редактируемой задачи до ее сохранения или отмены.
 * @param {boolean} [props.startEditedTask] Нужно ли начать редактирование задачи
 * @param {function} props.neededCreateNewTask Нужно ли начать создание задачи
 */
class App extends Component {

  constructor(props) {
		super(props);

		this.actionsTask = bindActionCreators(taskAction, props.dispatch);
    this.addNewTask = this.addNewTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.clickHnadlerButton = this.clickHnadlerButton.bind(this);
    this.toogleChekbox = this.toogleChekbox.bind(this);
    this.cancelCreateTask = this.cancelCreateTask.bind(this);
    this.editFieldTask = this.editFieldTask.bind(this);
    this.editFieldCreateTask = this.editFieldCreateTask.bind(this);
    this.taskEditedSave = this.taskEditedSave.bind(this);
    this.taskCreateSave = this.taskCreateSave.bind(this);
    
	}

  static propTypes = {
        tasks     : PropTypes.array.isRequired,
        createTask : PropTypes.object,
        editedTask  : PropTypes.bool,
        startEditedTask  : PropTypes.bool,
        neededCreateNewTask  : PropTypes.bool,
    };
 
  
  addNewTask () {
    const url = 'http://localhost:3000/list/?url=new_list';
    const {createTask} = this.actionsTask;
    postRequest(url, {text: 'items'}, createTask);
  }

  //Удалить задачу Mark for Removal
  deleteTask () {
    this.actionsTask.deleteTask()
  }

  //Редактировать задачу
  clickHnadlerButton (x) {
    const {id} = x.target;
    this.actionsTask.editTask({id})
  }

  toogleChekbox (x) {
    const {id, target : {name}} = x
    this.actionsTask.toogleChekbox({id, name})
  }

  // Отменить создание задачи
  cancelCreateTask() {
    this.actionsTask.cancelCreateTask();
  }

  //Редактировать поле созданой задачи
  editFieldCreateTask (x) {
    const {name, value} = x.target
    this.actionsTask.editField({name, value, typeTask : 'createTask' })
  }

  //Редактировать поле задачи
  editFieldTask (x) {
    const {name, value} = x.target
    this.actionsTask.editField({name, value, typeTask : 'editedTask' })
    
  }

  //Схранить созданую задачу
  taskCreateSave() {
    this.actionsTask.taskSaveCreate()
  }

  //Схранить редактируемую задачу
  taskEditedSave() {
    const {editedTask} = this.props;
    const {id} = editedTask;
    this.actionsTask.taskSave({id : id})
  }

  render() {
    const {tasks, tasksOrder, neededCreateNewTask, createTask, editedTask, startEditedTask} = this.props;

    return <div>
    
            <ButtonBasic 
              clikHandler={this.addNewTask}
              text='Добавление задачи' 
              />
             
            <ButtonBasic 
              clikHandler={this.deleteTask}
              text='Удалить задачу' 
             />
            
            <ListLView 
              tasks={tasks}
              tasksOrder={tasksOrder}
              toogleChekbox={this.toogleChekbox}
              clickHnadlerButton={this.clickHnadlerButton}
            />
            
            <ModalBase 
              contentLabel='Создать задачу'
              isOpen={neededCreateNewTask }
              update={this.editFieldCreateTask}
              valueInput={createTask.name}
              nameValue='name'
              valueTextarea={createTask.text}
              nameTextarea='text'
              save={this.taskCreateSave}
              cancel={this.cancelCreateTask}
            />

            <ModalBase 
              contentLabel='Редактировать задачу'
              isOpen={startEditedTask}
              update={this.editFieldTask}
              valueInput={editedTask.name}
              nameValue='name'
              valueTextarea={editedTask.text}
              nameTextarea='text'
              save={this.taskEditedSave}
              cancel={this.cancelCreateTask}
              elm={<ListLView 
                tasks={tasks}
                tasksOrder={tasksOrder}
                toogleChekbox={this.toogleChekbox}
                clickHnadlerButton={this.clickHnadlerButton}
              />}
              mod={<ModalBase 
              contentLabel='Создать задачу'
              isOpen={neededCreateNewTask }
              update={this.editFieldCreateTask}
              valueInput={createTask.name}
              nameValue='name'
              valueTextarea={createTask.text}
              nameTextarea='text'
              save={this.taskCreateSave}
              cancel={this.cancelCreateTask}
            />}
            obj={{test:'test'}}
            />
    </div>
  }
}

App.defaultProps = {
    tasks : [],
    createTask : {},
    editedTask  : false,
    startEditedTask  : false,
    neededCreateNewTask  : false,
};

function mapStateToProps({task}) {
    return {
        ...task
    };
}

export default connect(mapStateToProps)(App);