import { Input } from '@/components/ui/input';
import {
    type Participant,
    useWeeklyParticipantsStore,
} from '@/hooks/stores/useWeeklyParticipantsStore';
import { MoreHorizontalIcon, PencilIcon, XIcon } from 'lucide-react';
import { useState } from 'react';
import { Draggable, type DraggableProps } from 'react-beautiful-dnd';

export const DraggableEditSeedItem = ({
    participant,
    ...draggableProperties
}: Omit<DraggableProps, 'children'> & { readonly participant: Participant }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [tag, setTag] = useState(participant.tag);

    const { update, remove } = useWeeklyParticipantsStore();

    const handleTextEditAction = () => {
        setIsEditing(true);
    };

    const handleEditDone = () => {
        const trimmedTag = tag.trim();
        if (trimmedTag === '') {
            return;
        }

        update(participant.id, trimmedTag);
        setIsEditing(false);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleEditDone();
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newTag = event.target.value;
        setTag(newTag);
    };

    return (
        <Draggable {...draggableProperties}>
            {(draggableProvided, draggableSnapshot) => (
                <li
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}
                >
                    <div
                        className={`group select-none p-4 rounded-lg flex items-center space-x-4 truncate hover:bg-secondary ${
                            draggableSnapshot.isDragging ? 'border-2 bg-background' : ''
                        }`}
                    >
                        <div className="shrink-0">
                            <MoreHorizontalIcon height="24" />
                        </div>
                        <div className="min-w-0 flex-1 h-7 flex items-center">
                            {isEditing ? (
                                <Input
                                    autoFocus
                                    className="w-full"
                                    onBlur={handleEditDone}
                                    onChange={handleChange}
                                    onKeyDown={handleKeyDown}
                                    placeholder={chrome.i18n.getMessage('inputTagPlaceholder')}
                                    value={tag}
                                />
                            ) : (
                                // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
                                <p className="cursor-pointer" onClick={handleTextEditAction}>
                                    {tag}
                                </p>
                            )}
                        </div>
                        <div className="cursor-pointer shrink-0 invisible group-hover:visible">
                            <PencilIcon height="24" onClick={handleTextEditAction} />
                        </div>
                        <div className="cursor-pointer shrink-0 invisible group-hover:visible">
                            <XIcon height="24" onClick={() => remove(participant.id)} />
                        </div>
                    </div>
                </li>
            )}
        </Draggable>
    );
};
