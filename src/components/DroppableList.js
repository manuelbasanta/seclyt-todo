import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { DraggableItem } from './DraggableItem';
import './DroppableList.css'

const grid = 8;

const colors = {
	'Gris tenue': '#696D7D',
	'Topaz': '#FFD275',
	'Rojo medio': '#E39774',
	'Azul cadete': '#5C9EAD',
	'Fuzzy wuzzy': '#C97064',
	'Xanadu': '#73937E',
	'Coral negro': '#565676',
	'Negro': '#000000' ,
	'dragging': '#C6CCC6'
};

const getListStyle = (isDraggingOver,colorName) => ({

	background: isDraggingOver ? colors.dragging : colors[colorName],
	padding: grid,
	width: 250,
	transition: 'background .3s'
});



export class DroppableList extends React.Component {

	constructor(props) {
		super(props);

		this.onClick = this.onClick.bind(this);
	}

    onClick = (event: MouseEvent) => {

        if (event.defaultPrevented) {
            return;
        }

        if (event.button !== 0 ) {
            return;
        }

        // marking the event as used
        event.preventDefault();

        //const wasMetaKeyUsed: boolean = event.metaKey;
        //const wasShiftKeyUsed: boolean = event.shiftKey;

        console.log(React.Children);

    };

	render () {
		return (

				<Draggable draggableId={this.props.droppableId} index={this.props.index}>
				  {(provided, snapshot) => (
				    <div
				      ref={provided.innerRef}
				      {...provided.draggableProps}
				      {...provided.dragHandleProps}
				    >
						<div className="list">
				
							<Droppable droppableId={this.props.droppableId} >

						  		{(provided, snapshot) => (
						  			
						  			
					        		<div 
					          			ref={provided.innerRef} 
					          			style={getListStyle(snapshot.isDraggingOver, this.props.color)}
					          			{...provided.droppableProps}
					          			onClick={this.onClick}
					        		>
					        		<h1 className="list-title">{this.props.droppableId}</h1>
					              		{this.props.items.map((item, index) => (

					                		<DraggableItem listParent={this.props.droppableId} item={ item } index={ index } key={item.id} editTask={this.props.editTask} />
					              			
					               		))}
					          			{provided.placeholder}
					        		</div>
					        	
					       		)}
						  	</Droppable>
					  	</div>
				    </div>
				  )}
				</Draggable>


		);

	}

}