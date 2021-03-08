import Head from 'next/head'
import styles from '../styles/Selection.module.css'
import { exercises } from '../excercises.json'
import {ExtendedExerciseCard} from '../components/ExerciseCard'
import { usePersistedState } from '../hooks/usePersistedState'
import { useState, useEffect } from 'react'
import DraggableList from '../components/DraggableList'

export default function Home() {
  const [selectedExercises] = usePersistedState("selectedExercises", [])
  // const [store, setStore] = usePersistedState("selectedExercises", [])
  const [selection, setSelection] = useState([]);


  useEffect(() => {

    const storedSelection = exercises.filter(x => selectedExercises.includes(x.id));
    storedSelection.map(x => x._id = x.id.toString())
    setSelection(storedSelection)
  },[])

  console.log(selection)
  const handleAddOrRemoveExercise = (id) => {
    const updatedSelection = selectedExercises.includes(id) ? selectedExercises.filter(x => x !== id) : [...selectedExercises, id];
    console.log(id, updatedSelection);
    setSelectedExercises(updatedSelection);
  }

  const handleUpdateSorting = (sortedExercises) => {
    setSelection(sortedExercises)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Okidoki träningsapp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Min workout
        </h1>

        {<DraggableList onSort={handleUpdateSorting} data={selection} />}
      </main>
    </div>
  )
}



// import React, { Component } from "react";
// import ReactDOM from "react-dom";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// // fake data generator
// const getItems = count =>
//   Array.from({ length: count }, (v, k) => k).map(k => ({
//     id: `item-${k}`,
//     content: `item ${k}`
//   }));

// // a little function to help us with reordering the result
// const reorder = (list, startIndex, endIndex) => {
//   const result = Array.from(list);
//   const [removed] = result.splice(startIndex, 1);
//   result.splice(endIndex, 0, removed);

//   return result;
// };

// const grid = 8;

// const getItemStyle = (isDragging, draggableStyle) => ({
//   // some basic styles to make the items look a bit nicer
//   userSelect: "none",
//   padding: grid * 2,
//   margin: `0 0 ${grid}px 0`,

//   // change background colour if dragging
//   background: isDragging ? "lightgreen" : "grey",

//   // styles we need to apply on draggables
//   ...draggableStyle
// });

// const getListStyle = isDraggingOver => ({
//   background: isDraggingOver ? "lightblue" : "lightgrey",
//   padding: grid,
//   width: 250
// });

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       items: getItems(10)
//     };
//     this.onDragEnd = this.onDragEnd.bind(this);
//   }

//   onDragEnd(result) {
//     // dropped outside the list
//     if (!result.destination) {
//       return;
//     }

//     const items = reorder(
//       this.state.items,
//       result.source.index,
//       result.destination.index
//     );

//     this.setState({
//       items
//     });
//   }

//   // Normally you would want to split things out into separate components.
//   // But in this example everything is just done in one place for simplicity
//   render() {
//     return (
//       <DragDropContext onDragEnd={this.onDragEnd}>
//         <Droppable droppableId="droppable">
//           {(provided, snapshot) => (
//             <div
//               {...provided.droppableProps}
//               ref={provided.innerRef}
//               style={getListStyle(snapshot.isDraggingOver)}
//             >
//               {this.state.items.map((item, index) => (
//                 <Draggable key={item.id} draggableId={item.id} index={index}>
//                   {(provided, snapshot) => (
//                     <div
//                       ref={provided.innerRef}
//                       {...provided.draggableProps}
//                       {...provided.dragHandleProps}
//                       style={getItemStyle(
//                         snapshot.isDragging,
//                         provided.draggableProps.style
//                       )}
//                     >
//                       {item.content}
//                     </div>
//                   )}
//                 </Draggable>
//               ))}
//               {provided.placeholder}
//             </div>
//           )}
//         </Droppable>
//       </DragDropContext>
//     );
//   }
// }

// // Put the thing into the DOM!
// ReactDOM.render(<App />, document.getElementById("root"));
