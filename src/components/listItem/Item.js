import React, { Component, PropTypes} from 'react'
import ButtonBasic from '../button/ButtonBasic'
import { DragSource } from 'react-dnd';


const boxSource = {
  beginDrag(props) {
    return {
      dropTarget: props,
    };
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    props.toogleChekbox(props)
    debugger
    
    
    
    if (dropResult) {
      let alertMessage = '';
      if (dropResult.allowedDropEffect === 'any' || dropResult.allowedDropEffect === dropResult.dropEffect) {
        alertMessage = `You ${dropResult.dropEffect === 'copy' ? 'copied' : 'moved'} ${item.name} into ${dropResult.name}!`;
      } else {
        alertMessage = `You cannot ${dropResult.dropEffect} an item into the ${dropResult.name}`;
      }
      window.alert( // eslint-disable-line no-alert
        alertMessage,
      );
    }
  },
};


class Item extends Component {

    static propTypes = {
        shouldByDelete     : PropTypes.func,
        text : PropTypes.string,
        checkedDelete  : PropTypes.bool,
        checkedFinish  : PropTypes.bool,
        connectDragSource: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired,
        name: PropTypes.string.isRequired,
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
    const {isDragging, connectDragSource, name, text, shouldByDelete, shouldByFinish, id, clickHnadlerСheckbox} = this.props;
console.log(isDragging, connectDragSource)
    return connectDragSource(<div className='list-item'>
                <div className='list-item-head'>{name}</div>
                <div className='list-item-body'>{text}</div>
                
                <input 
                    type='checkbox' 
                    name='shouldByDelete' 
                    checked={shouldByDelete}
                    onClick={clickHnadlerСheckbox} 
                /> <span>
                        Отметить для удаленя
                    </span>
                
                <input 
                    type='checkbox' 
                    name='shouldByFinish' 
                    checked={shouldByFinish}
                    onClick={clickHnadlerСheckbox}  
                />
                <span>
                    Завершить задачу
                    </span>

                <ButtonBasic 
                    id={id}
                    clikHandler={this.clickHnadlerButton}
                    text='Редактировать задачу' 
                />
           </div>)
    }
}

Item.defaultProps = {
  name: 'default',
  text: 'default',
  shouldByDelete: false,
  shouldByFinish : false,
  idTask: 1
};

export default DragSource('Item', boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))(Item);