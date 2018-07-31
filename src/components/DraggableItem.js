import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const grid = 8;

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


export const DraggableItem = (props) => {
	return (
		<Draggable
  			key={props.item.id}
  			draggableId={props.item.id}
  			index={props.index}
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
     				>
        				{props.item.content}
      				</div>
      				{provided.placeholder}
    			</div>
   			)}
		</Draggable>
	);
}