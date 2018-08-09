import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { DroppableList } from './components/DroppableList';
//import { WebcamCapture } from './components/Camera';
import './App.css';


// a little function to help us with reordering the result
const reorder =  (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

// Moves an item from one list to another list.
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            toDoItems: [],
            workingItems: [],
            doneItems: []
        }

        this.onDragEnd = this.onDragEnd.bind(this);
    }


    // Acá va la request al back (esta trucha por ahora)
    componentDidMount () {

        let toDoItems = [];
        let workingItems = [];
        let doneItems = [];

        for (let i = 0; i < 10; i++) {
            toDoItems.push({
                id: `item-${i}`,
                title: `Tarea ${i}`,
                desc: 'Descripción de la tarea'
            })
        }

        for (let i = 10; i < 20; i++) {
            workingItems.push({
                id: `item-${i}`,
                title: `Tarea ${i}`,
                desc: 'Descripción de la tarea larga para que sea truncada en el preview, así no es muy larga e incomoda y por\
                        sobre todo no se pase de sus limites'
            })
        }

        for (let i = 20; i < 30; i++) {
            doneItems.push({
                id: `item-${i}`,
                title: `Tarea ${i}`,
                desc: 'Descripción de la tarea'
            })
        }

        this.setState({
            toDoItems,
            workingItems,
            doneItems
        })
    } 

   onDragEnd = result => {
        console.log(result);
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        // Drop en la misma lista
        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                this.state[source.droppableId], 
                source.index,
                destination.index
            );

            this.setState({
                [ source.droppableId ]: items,
            });
        // Drop de una lista a otra
        } else {
            const result = move(
                this.state[source.droppableId],
                this.state[destination.droppableId],
                source,
                destination
            );

            this.setState({
                [source.droppableId]: result[source.droppableId],
                [destination.droppableId]: result[destination.droppableId]
            });
        }
    };
  

    render() {
        console.log(this.state)
        return (
            <div>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <div className="listas" >
                        <DroppableList title="To do" droppableId="toDoItems" items={this.state.toDoItems}/>
                        <DroppableList title="Doing" droppableId="workingItems" items={this.state.workingItems}/>
                        <DroppableList title="Done" droppableId="doneItems" items={this.state.doneItems}/>
                    </div>

                </DragDropContext>
                {/*<WebcamCapture/>*/}
            </div>
        ); 
    }
}

export default App;
