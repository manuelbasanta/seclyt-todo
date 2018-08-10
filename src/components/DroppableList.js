import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { DraggableItem } from './DraggableItem';
import './DroppableList.css'

const grid = 8;

const colors = {
	todo: '#028090',
	doing: '#456990',
	done: '#F45B69',
	dragging: '#C6CCC6'
}
 
const getListStyle = (isDraggingOver,list) => ({
	background: isDraggingOver ? colors.dragging : colors[list],
	padding: grid,
	width: 250
});

export const DroppableList = props => {

	return (

		<div className="list">
			
			<Droppable droppableId={props.droppableId} >

		  		{(provided, snapshot) => (
		  			
		  			
	        		<div 
	          			ref={provided.innerRef} 
	          			style={getListStyle(snapshot.isDraggingOver, props.droppableId)}
	          			{...provided.droppableProps}
	        		>
	        		<h1 className="list-title">{props.title}</h1>
	              		{props.items.map((item, index) => (
	                		<DraggableItem item={ item } index={ index } key={item.id} editTask={props.editTask} />
	               		))}
	          			{provided.placeholder}
	        		</div>
	        	
	       		)}
		  	</Droppable>
	  	</div>
	);

}