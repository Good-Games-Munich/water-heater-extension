import { DraggableEditListItem } from '../components/DraggableEditListItem';
import { StrictModeDroppable } from '../components/StrictModeDroppable';
import { useParticipantsStore } from '../hooks/stores/useParticipantsStore';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { Card, TextInput } from 'flowbite-react';
import { useRef, useState } from 'react';
import { DragDropContext, type DropResult } from 'react-beautiful-dnd';

export const SeedingList = () => {
    const { participants, reorder, add } = useParticipantsStore();

    const [tag, setTag] = useState<string>();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newTag = event.target.value;
        setTag(newTag);
    };

    const handleAddNewParticipant = () => {
        const trimmedTag = tag?.trim() ?? '';
        if (trimmedTag === '') {
            return;
        }

        add(trimmedTag);
        setTag('');
        inputRef.current?.focus();
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleAddNewParticipant();
        }
    };

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }

        reorder(result.source.index, result.destination.index);
    };

    return (
        <div className="flex">
            <DragDropContext onDragEnd={onDragEnd}>
                <StrictModeDroppable droppableId="participantsSeedList">
                    {provided => (
                        <div
                            className="flex-grow"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            <Card>
                                <div className="flex space-x-4 items-center">
                                    <h5 className="text-xl font-bold leading-none">
                                        {chrome.i18n.getMessage('seedingTitle')}
                                    </h5>
                                    <TextInput
                                        onChange={handleChange}
                                        onKeyDown={handleKeyDown}
                                        placeholder={chrome.i18n.getMessage('inputTagPlaceholder')}
                                        ref={inputRef}
                                        value={tag}
                                    />
                                    <PlusCircleIcon
                                        className="cursor-pointer"
                                        height="24"
                                        onClick={handleAddNewParticipant}
                                        width="24"
                                    />
                                </div>
                                <div className="flow-root">
                                    <ul>
                                        {participants.map((participant, index) => (
                                            <DraggableEditListItem
                                                draggableId={participant.id}
                                                index={index}
                                                key={participant.id}
                                                participant={participant}
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
            <div className="flex-grow">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
                eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
                dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
                ipsum dolor sit amet.
            </div>
        </div>
    );
};
