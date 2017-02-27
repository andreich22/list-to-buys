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