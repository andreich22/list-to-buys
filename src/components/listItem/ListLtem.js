import React, { Component, PropTypes} from 'react'
import {connect}              from 'react-redux';
import Item from './Item'

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
    return <Item {...this.props}/>
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