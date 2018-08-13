import React from 'react';
import Modal from 'react-responsive-modal';
import MaterialIcon from 'material-icons-react';
import './Modal.css';
import { /*BrowserView,  MobileView,  isBrowser,*/  isMobile } from "react-device-detect";

// Estilos textarea
const textareaStyles = {
    overflow: 'auto',
    resize: 'none',
    whiteSpace: 'unset',
    fontSize: 16,
    fontFamily: 'Roboto-Regular'
}

export class ModalBox extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: this.props.data.title,
            desc: this.props.data.desc,
            editingTitle: false,
            editingDesc: false
        }
    }
    

    render() {

        return (
            
            <div className="modal" >

                <Modal open={this.props.open} onClose={this.props.closeModal} classNames={{ modal: 'modal' }} center>
                    
                    { this.state.editingTitle ? (

                            <div>

                                <input className="title-input" value={this.state.title} onChange={ (e) => this.setState({title: e.target.value}) } onKeyPress={ e => {
                                    if (e.key === 'Enter') {
                                        this.props.editTask(this.props.data, 'title' , this.state.title);
                                        this.setState({ editingTitle: false })
                                    }   
                                } }/>

                                <div className="save-btn" onClick={ () => {
                                    this.props.editTask(this.props.data, 'title' , this.state.title);
                                    this.setState({ editingTitle: false })
                                }}>
                                    <MaterialIcon icon="save" size={18} />
                                </div>

                            </div>

                        ) : (

                            <h2 className={isMobile ? "modal-editable-mobile" : "modal-editable" }>

                                {this.props.data.title}
                    
                                <div className="edit-btn" onClick={() => this.setState({ editingTitle: true })}>
                                    <MaterialIcon icon="edit" size={18}/>
                                </div>
                               
                            </h2>

                        )
                    }

                    { this.state.editingDesc ? (

                            <div>
                                <textarea style={textareaStyles} rows="3" cols="60"  wrap="off" className="" value={this.state.desc} onChange={ (e) => this.setState({desc: e.target.value}) } onKeyPress={ e => {
                                    if (e.key === 'Enter') {
                                        this.props.editTask(this.props.data, 'desc' , this.state.desc);
                                        this.setState({ editingDesc: false })
                                    }   
                                } }></textarea>

                                <div className="save-btn" onClick={ () => {
                                    this.props.editTask(this.props.data, 'desc' , this.state.desc);
                                    this.setState({ editingDesc: false })
                                }}>
                                    <MaterialIcon icon="save" size={18} />
                                </div>

                            </div>

                        ) : (

                            <div className={isMobile ? "modal-editable-mobile" : "modal-editable" } >
                                {this.props.data.desc}
                                <div className="edit-btn" onClick={() => this.setState({ editingDesc: true })} >
                                    <MaterialIcon icon="edit" size={18}/>
                                </div>
                            </div>

                        )
                    }




                </Modal>
            </div>
        );
    }
}