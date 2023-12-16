import { useItemsStore } from '../hooks/useItemsStore';
import { DraggableEditListItem } from './DraggableEditListItem';
import { StrictModeDroppable } from './StrictModeDroppable';
import { Card } from 'flowbite-react';
import { DragDropContext, type DropResult } from 'react-beautiful-dnd';

export const SeedingList = () => {
    const { items, reorder } = useItemsStore();

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }

        reorder(result.source.index, result.destination.index);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <StrictModeDroppable droppableId="participantsSeedList">
                {provided => (
                    <div {...provided.droppableProps} className="h-full" ref={provided.innerRef}>
                        <Card className="max-w-full">
                            <div className="flex">
                                <h5 className="text-xl font-bold leading-none">
                                    {chrome.i18n.getMessage('seedingTitle')}
                                </h5>
                            </div>
                            <div className="flow-root">
                                <ul>
                                    {items.map((item, index) => (
                                        <DraggableEditListItem
                                            draggableId={item.id}
                                            index={index}
                                            item={item}
                                            key={item.id}
                                        />
                                    ))}
                                    {provided.placeholder}
                                </ul>
                            </div>
                        </Card>
                    </div>
                )}
            </StrictModeDroppable>
        </DragDropContext>
    );
};
