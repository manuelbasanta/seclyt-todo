import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { DraggableItem } from './DraggableItem';
import './DroppableList.css'

const grid = 8;

const colors = {
	'To do': '#028090',
	Doing: '#456990',
	Done: '#F45B69',
	dragging: '#C6CCC6'
}
 
const getListStyle = (isDraggingOver,list) => ({

	background: isDraggingOver ? colors.dragging : colors[list],
	padding: grid,
	width: 250
});

export const DroppableList = props => {

	return (

			<Draggable draggableId={props.droppableId} index={props.index}>
			  {(provided, snapshot) => (
			    <div
			      ref={provided.innerRef}
			      {...provided.draggableProps}
			      {...provided.dragHandleProps}
			    >
					<div className="list">
			
						<Droppable droppableId={props.droppableId} >

					  		{(provided, snapshot) => (
					  			
					  			
				        		<div 
				          			ref={provided.innerRef} 
				          			style={getListStyle(snapshot.isDraggingOver, props.droppableId)}
				          			{...provided.droppableProps}
				        		>
				        		<h1 className="list-title">{props.droppableId}</h1>
				              		{props.items.map((item, index) => (

				                		<DraggableItem listParent={props.droppableId} item={ item } index={ index } key={item.id} editTask={props.editTask} />
				              			
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