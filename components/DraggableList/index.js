import React, { Component } from 'react'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';



const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  padding: '16px',
  display: 'flex',
  alignItems: 'center',
  margin: '8px 0',
  borderRadius: '4px',
  cursor: 'pointer',
  background: isDragging ? '#03CEAB' : '#019e81',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  marginTop: '24px'
});

class DraggableList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.data,
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }
  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items,
    });

    this.props.onSort(items)
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    console.log('draggable', this.state.items)
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {this.state.items.map((item, index) => (
                <Draggable key={item._id} draggableId={item._id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <div className="video"></div>
                      <div className="content">
                        <h3>{item.title}</h3>
                        {(item.types.length > 0) && <div className="meta">
                          {item.types.map(type => (
                            <span key={type} className="type">{type}</span>
                          ))}
                        </div>}
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        {/* <style jsx>{`
            .video {
              width: 100px;
              height: 56px;
              background: #ccc;
              margin-right: 24px;
            }

            h3 {
              margin: 0 0 8px 0;
            }

            .type {
              display: inline-block;
              padding: 0 6px 3px;
              border-radius: 2px;
              margin-right: 4px;
              line-height: 16px;
              background: ${colors.purple};
              font-size: 12px;
              color: white;
            }

            .button-wrapper {
              text-align: center
            }

            button {
              background: ${colors.yellow};
              margin: 24px auto;
            }
        `}
        </style> */}
      </DragDropContext>
    );
  }
}

export default DraggableList
