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

        this.editTask = this.editTask.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    fetchLists() {
        const fetch = window.fetch.bind(window)
        fetch('https://mbarragan-board.herokuapp.com/api/v1/tasks')
            .then(response => response.json())
            .then(data => this.setState({...data}))
    }

    // Acá va la request al back (esta trucha por ahora)
    componentDidMount () {

        // let todo = {
        //     title: 'To do',
        //     tasks: []
        // };
        // let doing = {
        //     title: 'Doing',
        //     tasks: []
        // };
        // let done = {
        //     title: 'Done',
        //     tasks: []
        // };

        // for (let i = 0; i < 10; i++) {
        //     todo.tasks.push({
        //         id: `item-${i}`,
        //         title: `Tarea ${i}`,
        //         desc: 'Descripción de la tarea',
        //         list: 'todo'
        //     })
        // }

        // for (let i = 10; i < 20; i++) {
        //     doing.tasks.push({
        //         id: `item-${i}`,
        //         title: `Tarea ${i}`,
        //         desc: 'Descripción de la tarea larga para que sea truncada en el preview, así no es muy larga e incomoda y por sobre todo no se pase de sus limites',
        //         list: 'doing'
        //     })
        // }

        // for (let i = 20; i < 30; i++) {
        //     done.tasks.push({
        //         id: `item-${i}`,
        //         title: `Tarea ${i}`,
        //         desc: 'Descripción de la tarea',
        //         list: 'done'
        //     })
        // }

        // this.setState({
        //     todo,
        //     doing,
        //     done
        // })

        this.fetchLists();

    } 

    onDragEnd = result => {

        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        // Drop en la misma lista
        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                this.state[source.droppableId].tasks, 
                source.index,
                destination.index
            );

            let stateCopy = this.state[source.droppableId];
           
            stateCopy.tasks = items;

            this.setState({
                [source.droppableId]: stateCopy,
            });

        // Drop de una lista a otra
        } else {
            const result = move(
                this.state[source.droppableId].tasks,
                this.state[destination.droppableId].tasks,
                source,
                destination
            );

            let stateCopySource = this.state[source.droppableId];
            stateCopySource.tasks = result[source.droppableId];

            let stateCopyDestination = this.state[destination.droppableId];
            stateCopyDestination.tasks = result[destination.droppableId];

            this.setState({
                [source.droppableId]: stateCopySource,
                [destination.droppableId]: stateCopyDestination
            });
        }
    };
  
    editTask = (data, dataTochange, newData) => {
        
        let newTask = data;

        // Que parte de la tarea vamos a cambiar
        dataTochange === 'title' ? newTask.title = newData : newTask.desc = newData;

        let stateCopy = this.state[data.list];

        stateCopy.tasks =  this.state[data.list].tasks.map(task => task.id === data.id ? newTask : task );

        this.setState({

            [data.list]: stateCopy
        })

    }

    render() {
console.log(this.state)
        if (this.state != null) {
            return (
                <div>
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <div className="listas" >
                            { Object.keys(this.state).map(
                                key =>  <DroppableList title={this.state[key].title} droppableId={key} key={key} items={this.state[key].tasks } editTask={this.editTask}/>
                            )}

                        </div>

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