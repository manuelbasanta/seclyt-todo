import React, { Component } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
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

        this.states = {
            lists: []
        }
        this.editTask = this.editTask.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    fetchLists() {
        const fetch = window.fetch.bind(window)
        fetch('https://mbarragan-board.herokuapp.com/api/v1/tasks')
            .then(response => response.json())
            .then(data => this.setState({lists: data}))
    }

    // Request de tareas
    componentDidMount () {
        this.fetchLists();
        //this.setState({lists: db})
    } 

    getListIndex(nameKey, array) {       
        for (var i=0; i < array.length; i++) {
            if (array[i].title === nameKey) {
                return i;
            }
        }
    }

    onDragEnd = result => {

        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        // Dragueo de listas
        if (source.droppableId === 'context' ) {

            const items = reorder(
                this.state.lists, 
                source.index,
                destination.index
            );

            this.setState({lists: items});
        
        // Drop en la misma lista
        } else if (source.droppableId === destination.droppableId) {
            
            let listIndex = this.getListIndex(source.droppableId, this.state.lists);

            const items = reorder(
                this.state.lists[listIndex].tasks, 
                source.index,
                destination.index
            );

            let stateCopy = this.state.lists;
           
            stateCopy[listIndex].tasks = items;

            this.setState({
                lists: stateCopy,
            });

        // Drop de una lista a otra
        } else {

            let listIndexSource = this.getListIndex(source.droppableId, this.state.lists);
            let listIndexDestination = this.getListIndex(destination.droppableId, this.state.lists);

            const result = move(
                this.state.lists[listIndexSource].tasks,
                this.state.lists[listIndexDestination].tasks,
                source,
                destination
            );

            let stateCopy = this.state.lists;

            stateCopy[listIndexSource].tasks = result[source.droppableId];
            stateCopy[listIndexDestination].tasks = result[destination.droppableId];

            this.setState({
                lists: stateCopy
            });
        }
    };
  
    editTask = (data, dataTochange, newData, listParent) => {
        
        let newTask = data;

        let listIndex = this.getListIndex(listParent, this.state.lists);

        // Que parte de la tarea vamos a cambiar
        dataTochange === 'title' ? newTask.title = newData : newTask.desc = newData;

        let stateCopy = this.state.lists;

        stateCopy[listIndex].tasks =  this.state.lists[listIndex].tasks.map(task => task.id === data.id ? newTask : task );

        this.setState({

            lists: stateCopy
        })

    }

    render() {

        if (this.state != null) {

            return (
                <div>
                    <DragDropContext onDragEnd={this.onDragEnd}>

                        <Droppable droppableId="context" direction="horizontal" type="listDrop">
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                            >
                                <div className="listas" >
                                    { this.state.lists.map(
                                        (list, i) =>  <DroppableList color={list.color} type="listDrop" droppableId={list.title} index={i} key={list.title} items={ list.tasks } editTask={this.editTask}/>
                                    )}

                                </div>
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>



                    </DragDropContext>
                    {/*<WebcamCapture/>*/}
                </div>
            );            
        } else {
            return <div className="loader">Loading...</div>
        }

    }
}

export default App;