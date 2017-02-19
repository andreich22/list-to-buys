import React, { Component, PropTypes} from 'react'
import {connect}              from 'react-redux';
import ButtonBasic from '../button/ButtonBasic'

class ListLtem extends Component {

    static propTypes = {
        name     : PropTypes.string,
        text : PropTypes.string,
        checkedDelete  : PropTypes.bool,
        checkedFinish  : PropTypes.bool,
    };

    constructor(props) {
		super(props);
		
        this.clickHnadlerButton = this.clickHnadlerButton.bind(this);
        this.clickHnadlerСheckbox = this.clickHnadlerСheckbox.bind(this);
	}

    clickHnadlerButton (x) {
        this.props.clickHnadlerButton(x)
    }

    clickHnadlerСheckbox (x) {
        const {target} = x;
        const {id} = this.props;
        this.props.toogleChekbox({id, target})
    }

    render() {

    const {name, text, shouldByDelete, shouldByFinish, id} = this.props;

    return <div className='list-item'>
                <div className='list-item-head'>{name}</div>
                <div className='list-item-body'>{text}</div>
                
                <input 
                    type='checkbox' 
                    name='shouldByDelete' 
                    checked={shouldByDelete}
                    onClick={this.clickHnadlerСheckbox} 
                /> <span>
                        Отметить для удаленя
                    </span>
                
                <input 
                    type='checkbox' 
                    name='shouldByFinish' 
                    checked={shouldByFinish}
                    onClick={this.clickHnadlerСheckbox}  
                />
                <span>
                    Завершить задачу
                    </span>

                <ButtonBasic 
                    id={id}
                    clikHandler={this.clickHnadlerButton}
                    text='Редактировать задачу' 
                />
           </div>
    }
}

export default connect((state, ownProps) => {
   return { ...state.task.tasks[ownProps.id] }
})(ListLtem);

ListLtem.defaultProps = {
  name: 'default',
  text: 'default',
  shouldByDelete: false,
  shouldByFinish : false,
  idTask: 1
};