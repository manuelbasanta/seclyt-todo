import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { ModalBox } from './Modal.js'
import './DraggableItem.css'

const grid = 8;

// Estilo de la terea según se este drageando o no
const getItemStyle = (draggableStyle, isDragging) => ({
	// some basic styles to make the items look a bit nicer
	userSelect: 'none',
	padding: grid * 2,
	margin: `0 0 ${grid}px 0`,
    color: 'white',
	// change background colour if dragging
	background: isDragging ? '#067FA8' : '#114B5F',

	// styles we need to apply on draggables
	...draggableStyle
});


export class DraggableItem extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false
        }

        //this.truncateDesc = this.truncateDesc.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    // Setea el estado a modal abierto cuando se abre el modal
    onOpenModal = () => {
        this.setState({ modalOpen: true });
    };

    // Setea el estado a modal cerrado cuando se cierra el modal
    onCloseModal = () => {
        this.setState({modalOpen: false });
    };

    // trunca una string para mostrart
    truncateDesc = ( desc, maxLength) => {
        return desc.length > maxLength ? desc.slice(0, maxLength).concat('...') : desc ;
    }

    // Using onClick as it will be correctly
    // preventing if there was a drag
    onClick = (event: MouseEvent) => {

        if (event.defaultPrevented) {
            return;
        }

        if (event.button !== 0 ) {
            return;
        }

        // marking the event as used
        event.preventDefault();

        const wasMetaKeyUsed: boolean = event.metaKey;
        const wasShiftKeyUsed: boolean = event.shiftKey;

        this.onOpenModal();

    };


    render () {
        return (
            <div>
                <Draggable
                    key={this.props.item.id}
                    draggableId={this.props.item.id}
                    index={this.props.index}
                    
                >
                    {(provided, snapshot) => (
                        <div>
                            <div
                                ref={provided.innerRef}
                                {...provided.dragHandleProps}
                                {...provided.draggableProps}
                                style={getItemStyle(
                                    provided.draggableProps.style,
                                    snapshot.isDragging
                                )}
                                onClick={this.onClick}
                            >
                                {this.props.item.content}
                                <div className="task-desc">
                                    {this.truncateDesc(this.props.item.desc, 35)}
                                </div>
                            </div>

                        </div>
                    )}

                </Draggable>
                <ModalBox open={this.state.modalOpen} 
                          closeModal={this.onCloseModal}
                          data={this.props.item} />
            </div>
        );      
    }

}