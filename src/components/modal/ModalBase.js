import React from 'react'
import Modal from 'react-modal';
import ButtonBasic from '../button/ButtonBasic';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

const STRING = 'PropTypes.string,';
const NUMBER = 'PropTypes.number,';
const FUNC = 'PropTypes.func,';
const BOOLEAN = 'PropTypes.bool,';
const ARRAY = 'PropTypes.array,';
const ELEMENT_REACT = 'PropTypes.element,'

//перебор объекта
function iterations(object) { //TODO rename function
    let newObject = Object.assign({}, object);
    let prop = {};
    for (let key in newObject) {
        if (newObject.hasOwnProperty(key)) {
            const element = newObject[key];
            prop = assingDiscription(prop, element, key);
        }
    }
    return prop;
}

//Присваивает описание на основе типа данных
function assingDiscription(prop, elem, key) {
    let copyProp = Object.assign({}, prop);
    if(typeof elem === 'object' && elem._owner) {
        copyProp[key] = ELEMENT_REACT
        return copyProp
    }    
    if (Array.isArray(elem)) {
        copyProp[key] = ARRAY
        return copyProp
    }
    if (typeof elem === 'function') {
        copyProp[key] = FUNC
        return copyProp
    }
    if (typeof elem === 'object' && !Array.isArray(elem)) {
        copyProp[key] = 'PropTypes.shape({\n' + objToString(iterations(elem)) + '}),'
        return copyProp
    }
    if (typeof elem === 'string') {
        copyProp[key] = STRING
        return copyProp
    }
    if (typeof elem === 'number') {
        copyProp[key] = NUMBER
        return copyProp
    }
    if (typeof elem === 'boolean') {
        copyProp[key] = BOOLEAN
        return copyProp
    }
}

//приводит объект к строке
function objToString(obj) {
    let str = '';
    for (let p in obj) {
        if (obj.hasOwnProperty(p)) {
            str += p + ':' + obj[p] + '\n';
        }
    }
    return str;
}

//получить описание proptypes
function getDiscriptionProptypes(props) {
  return '{\n' + objToString(iterations(props)) + '}';
}

//TODO Переделать в class и добавить shouldComponentUpdate написать условия 
// input, textarea сделать аналогично
export default function ModalBase(props) {

    const {
            isOpen,
            update,
            valueInput,
            nameValue,
            valueTextarea,
            nameTextarea,
            save,
            cancel,
            contentLabel
    } = props;

    console.log(getDiscriptionProptypes(props));
    // test(props)
    
    return (
            <Modal
              isOpen={isOpen}
              style={customStyles}
              contentLabel={contentLabel}
            >
              <h2>{contentLabel}</h2>
                
                <input value={valueInput} name={nameValue} onChange={update}/>
                
                <textarea value={valueTextarea} name={nameTextarea} onChange={update}/>
                
                <ButtonBasic 
                    clikHandler={save}
                    text='Сохранить' 
                />

                <ButtonBasic 
                    clikHandler={cancel}
                    text='Отмена' 
                />

            </Modal>
    );
}