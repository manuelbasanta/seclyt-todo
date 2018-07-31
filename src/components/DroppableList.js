import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { DraggableItem } from './DraggableItem';
import './DroppableList.css'

const grid = 8;

const colors = {
	toDoItems: '#028090',
	workingItems: '#456990',
	doneItems: '#F45B69',
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
			<h1 className="list-title">{props.title}</h1>
			<Droppable droppableId={props.droppableId} >

		  		{(provided, snapshot) => (

	        		<div 
	          			ref={provided.innerRef} 
	          			style={getListStyle(snapshot.isDraggingOver, props.droppableId)}
	          			{...provided.droppableProps}
	        		>
	              		{props.items.map((item, index) => (
	                		<DraggableItem item={ item } index={ index } key={item.id}/>
	               		))}
	          			{provided.placeholder}
	        		</div>
	       		)}
		  	</Droppable>
	  	</div>
	);

}