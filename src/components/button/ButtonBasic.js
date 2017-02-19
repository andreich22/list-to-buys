import React, { Component, PropTypes} from 'react'

export default class ButtonBasic extends Component {

    static propTypes = {
        text     : PropTypes.string.isRequired,
        clikHandler: PropTypes.func,
    };

    constructor(props) {
		super(props);

        this.clikHandler = this.clikHandler.bind(this);
	}

    shouldComponentUpdate(nextProps) {
        if(this.props.id == nextProps.id && this.props.clikHandler == nextProps.clikHandler && this.props.text == nextProps.text) {
            return false;
        }
        
        return true;
    }


    //Обработчик клика
    clikHandler (x) {
        this.props.clikHandler(x)
    }

    render() {

    const {text, id} = this.props;

    return <div>
                <button id={id} onClick={this.clikHandler}>{text}</button>
            </div>
    }
}

ButtonBasic.defaultProps = {
  text: 'Stranger',
  clikHandler: x=>x,
  id: 1
};