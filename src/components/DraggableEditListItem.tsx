import { type Item, useItemsStore } from '../hooks/useItemsStore';
import { EllipsisHorizontalIcon, PencilIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Draggable, type DraggableProps } from 'react-beautiful-dnd';

export const DraggableEditListItem = ({
    item,
    ...draggableProperties
}: Omit<DraggableProps, 'children'> & { readonly item: Item }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(item.content);

    const { update, remove } = useItemsStore();

    const handleTextEditAction = () => {
        setIsEditing(true);
    };

    const handleEditDone = () => {
        const trimmedValue = value.trim();
        if (trimmedValue === '') {
            return;
        }

        update(item.id, trimmedValue);
        setIsEditing(false);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleEditDone();
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setValue(newValue);
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
                        className={`group select-none p-4 rounded-lg flex items-center space-x-4 truncate hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${
                            draggableSnapshot.isDragging
                                ? 'border-2 border-primary-light dark:border-primary-dark bg-content-background-light dark:bg-content-background-dark'
                                : ''
                        }`}
                    >
                        <div className="shrink-0">
                            <EllipsisHorizontalIcon height="24" />
                        </div>
                        <div className="min-w-0 flex-1 h-7 flex items-center">
                            {isEditing ? (
                                <TextInput
                                    autoFocus
                                    className="w-full"
                                    onBlur={handleEditDone}
                                    onChange={handleChange}
                                    onKeyDown={handleKeyDown}
                                    value={value}
                                />
                            ) : (
                                // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
                                <p className="cursor-pointer" onClick={handleTextEditAction}>
                                    {value}
                                </p>
                            )}
                        </div>
                        <div className="cursor-pointer shrink-0 invisible group-hover:visible">
                            <PencilIcon height="24" onClick={handleTextEditAction} />
                        </div>
                        <div className="cursor-pointer shrink-0 invisible group-hover:visible">
                            <XMarkIcon height="24" onClick={() => remove(item.id)} />
                        </div>
                    </div>
                </li>
            )}
        </Draggable>
    );
};
