import { DraggableEditSeedItem } from '@/components/Seeding/DraggableEditSeedItem';
import { StrictModeDroppable } from '@/components/StrictModeDroppable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useWeeklyParticipantsStore } from '@/hooks/stores/useWeeklyParticipantsStore';
import { PlusCircleIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { DragDropContext, type DropResult } from 'react-beautiful-dnd';

export const DragAndDropSeedingList = () => {
    const { participants, reorder, add } = useWeeklyParticipantsStore();

    const [tag, setTag] = useState<string>('');
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
        <DragDropContext onDragEnd={onDragEnd}>
            <StrictModeDroppable droppableId="participantsSeedList">
                {provided => (
                    <div className="flex-grow" {...provided.droppableProps} ref={provided.innerRef}>
                        <Card>
                            <CardHeader>
                                <CardTitle>{chrome.i18n.getMessage('seedingTitle')}</CardTitle>
                                <CardDescription className="flex items-center">
                                    <Input
                                        className="mr-2"
                                        onChange={handleChange}
                                        onKeyDown={handleKeyDown}
                                        placeholder={chrome.i18n.getMessage('inputTagPlaceholder')}
                                        ref={inputRef}
                                        value={tag}
                                    />
                                    <PlusCircleIcon
                                        className="cursor-pointer ml-2"
                                        height="24"
                                        onClick={handleAddNewParticipant}
                                        width="24"
                                    />
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul>
                                    {participants.map((participant, index) => (
                                        <DraggableEditSeedItem
                                            draggableId={participant.id}
                                            index={index}
                                            key={participant.id}
                                            participant={participant}
                                        />
                                    ))}
                                    {provided.placeholder}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </StrictModeDroppable>
        </DragDropContext>
    );
};
