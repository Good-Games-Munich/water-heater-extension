import { Checkbox } from '../ui/checkbox';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card';
import { Input } from '@/components/ui/input';
import {
    type Participant,
    useWeeklyParticipantsStore,
} from '@/hooks/stores/useWeeklyParticipantsStore';
import { CheckIcon, MoreHorizontalIcon, PencilIcon, XCircleIcon } from 'lucide-react';
import { useState } from 'react';
import { Draggable, type DraggableProps } from 'react-beautiful-dnd';

export const DraggableEditSeedItem = ({
    participant,
    ...draggableProperties
}: Omit<DraggableProps, 'children'> & { readonly participant: Participant }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [tag, setTag] = useState(participant.tag);
    const [checked, setChecked] = useState(false);

    const { update, remove } = useWeeklyParticipantsStore();

    const handleTextEditAction = () => {
        setIsEditing(true);
    };

    const handleEditDone = () => {
        const trimmedTag = tag.trim();
        if (trimmedTag === '') {
            return;
        }

        update(participant.id, { tag: trimmedTag });
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
                        <div className="cursor-pointer shrink-0 hidden group-hover:block">
                            <HoverCard>
                                <HoverCardTrigger>
                                    <PencilIcon height="24" onClick={handleTextEditAction} />
                                </HoverCardTrigger>
                                <HoverCardContent>
                                    {chrome.i18n.getMessage('seedingEditDescription')}
                                </HoverCardContent>
                            </HoverCard>
                        </div>
                        <div className="items-center space-x-2 hidden group-hover:flex">
                            <HoverCard>
                                <HoverCardTrigger>
                                    <Checkbox
                                        onCheckedChange={checkedState =>
                                            setChecked(
                                                checkedState === 'indeterminate'
                                                    ? false
                                                    : checkedState,
                                            )
                                        }
                                    />
                                </HoverCardTrigger>
                                <HoverCardContent className="w-auto">
                                    {chrome.i18n.getMessage('seedingCheckboxDescription')}
                                </HoverCardContent>
                            </HoverCard>
                        </div>
                        <div className="flex items-center space-x-2 group-hover:hidden">
                            {checked ? <CheckIcon height="24" /> : null}
                        </div>
                        <div className="cursor-pointer shrink-0 hidden group-hover:block">
                            <HoverCard>
                                <HoverCardTrigger>
                                    <XCircleIcon
                                        height="24"
                                        onClick={() => remove(participant.id)}
                                    />
                                </HoverCardTrigger>
                                <HoverCardContent>
                                    {chrome.i18n.getMessage('seedingRemoveDescription')}
                                </HoverCardContent>
                            </HoverCard>
                        </div>
                    </div>
                </li>
            )}
        </Draggable>
    );
};
