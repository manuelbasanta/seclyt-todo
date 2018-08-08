import React from 'react';
import Modal from 'react-responsive-modal';
import MaterialIcon from 'material-icons-react';
import './Modal.css';
import { BrowserView,  MobileView,  isBrowser,  isMobile } from "react-device-detect";

export class ModalBox extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            editDescShown: false,
            editTitleShown: false
        }
    }
    
    mouseOver = (element) => {
        this.setState({[element]: true});
    }

    mouseOut = (element) => {
        this.setState({[element]: false});
    }

    editModalElement = () => {

    }

    render() {

        
        return (
            <div className="modal" >
                <Modal open={this.props.open} onClose={this.props.closeModal} center>

                    <BrowserView>

                        <h2 className="modal-editable" onMouseOver={() => this.mouseOver('editTitleShown')} onMouseLeave={() => this.mouseOut('editTitleShown')}>
                            {this.props.data.content}
                            < div className="edit-btn" onClick={this.editModalElement}>
                                {this.state.editTitleShown && <MaterialIcon icon="edit" size={18}/>}
                            </div>
                        </h2>
                    

                        <div className="modal-editable" onMouseOver={() => this.mouseOver('editDescShown')} onMouseLeave={() => this.mouseOut('editDescShown')} >
                            {this.props.data.desc}
                            < div className="edit-btn" onClick={this.editModalElement}>
                                {this.state.editDescShown && <MaterialIcon icon="edit" size={18}/>}
                            </div>
                        </div>

                    </BrowserView>

                </Modal>
            </div>
        );
    }
}