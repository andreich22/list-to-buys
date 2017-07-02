import React, { Component} from 'react'
import ListLtem from '../listItem/ListLtem'
import { DropTarget } from 'react-dnd';


const boxTarget = {
  drop({ allowedDropEffect }) {
    return {
      name: `${allowedDropEffect} Dustbin`,
      allowedDropEffect,
    };
  },
};


class ListLView extends Component {

    constructor(props) {
        super(props);
        this.renderListItem = this.renderListItem.bind(this);	
    }

    renderListItem (props) {
      const {tasks, tasksOrder, toogleChekbox, clickHnadlerButton} = props;

      return tasksOrder.map((elem, i) => {
        return <ListLtem 
                  key={`${i}-key`}
                  id={tasks[elem].id}
                  toogleChekbox={toogleChekbox}
                  clickHnadlerButton={clickHnadlerButton}
              />
      })
    }

    render() {
      
      return <div >
        
              {this.renderListItem(this.props)}
           </div>
    }
}

export default DropTarget('Item', boxTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))(ListLView);
