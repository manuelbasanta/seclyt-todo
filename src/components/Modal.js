import React from 'react';
import Modal from 'react-responsive-modal';
import './Modal.css';

const styles = {
    minWidth: 300
}

export class ModalBox extends React.Component {

    render() {

        return (
            <div className="modal" >
                <Modal classNames={'modal'}styles={styles} open={this.props.open} onClose={this.props.closeModal} center>
                    <h2 >{this.props.data.content}</h2>
                    <p>{this.props.data.desc}</p>
                </Modal>
            </div>
        );
    }
}