import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { DraggableItem } from './DraggableItem';
import './DroppableList.css'

const grid = 8;

const getListStyle = (isDraggingOver) => ({
	background: isDraggingOver ? 'lightblue' : 'lightgrey',
	padding: grid,
	width: 250
});

export const DroppableList = props => {

	return (
		<div className="lista">
			<h1>{props.title}</h1>
			<Droppable droppableId={props.droppableId} >

		  		{(provided, snapshot) => (
	        		<div 
	          			ref={provided.innerRef} 
	          			style={getListStyle(snapshot.isDraggingOver)}
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