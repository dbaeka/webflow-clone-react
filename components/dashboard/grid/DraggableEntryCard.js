import React, {memo, useRef} from "react";
import {useDrag, useDrop} from "react-dnd";

const DraggableEntryCard = memo(({id, onMoveItem, children}) => {
    const ref = useRef(null);

    const [{isDragging}, connectDrag] = useDrag({
        item: {id, type: "IMG"},
        collect: monitor => {
            return {
                isDragging: monitor.isDragging()
            }
        }
    })

    const [{isOver, canDrop}, connectDrop] = useDrop({
        accept: "IMG",
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
        canDrop: (movingItem) =>  (movingItem.id !== id),
        hover(hoveredOverItem, monitor) {
            if (hoveredOverItem.id !== id) {
                // console.log(hoveredOverItem)
                console.log(monitor.canDrop())
                // onMoveItem(hoveredOverItem.id, id)
            }
        }
    })

    connectDrag(ref);
    connectDrop(ref);

    const opacity = isDragging ? 0.5 : 1;
    const containerStyle = {opacity};

    console.log("canDrop " + canDrop)
    console.log("isOver " + isOver)

    return children && React.Children.map(children, child =>
        React.cloneElement(child, {
            forwardedRef: ref,
            style: containerStyle
        })
    );
});

export default DraggableEntryCard;