import { useToast } from '../ui/use-toast';
import { DraggableEditSeedItem } from '@/components/Seeding/DraggableEditSeedItem';
import { StrictModeDroppable } from '@/components/StrictModeDroppable';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useSettingsStore } from '@/hooks/stores/useSettingsStore';
import { useWeeklyParticipantsStore } from '@/hooks/stores/useWeeklyParticipantsStore';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BotIcon, PlusCircleIcon, XCircleIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { DragDropContext, type DropResult } from 'react-beautiful-dnd';

export const DragAndDropSeedingList = () => {
    const { toast } = useToast();
    const { participants, reorder, add, removeAll, bulkAdd } = useWeeklyParticipantsStore();
    const { settings } = useSettingsStore();

    const [tag, setTag] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);

    const { refetch, error, isError } = useQuery({
        queryKey: [settings.guildId, 'weekly', 'participants'],
        queryFn: async () =>
            await axios
                .get(`https://water-heater.ggmunich.de/weekly/participants/${settings.guildId}`)
                .then(async response => response.data),
        enabled: false,
    });

    useEffect(() => {
        if (isError) {
            toast({
                title: 'Error',
                description: error.message,
                variant: 'destructive',
            });
        }
    }, [error, toast, isError]);

    const fetchParticipants = async (): Promise<string[]> => {
        const fetchedParticipants = (await refetch()).data;

        // Check if right format
        if (
            !Array.isArray(fetchedParticipants) ||
            !fetchedParticipants.every(item => typeof item === 'string')
        ) {
            throw new Error('Fetched participants is not an array of strings');
        }

        return fetchedParticipants;
    };

    const onDiscordReplace = async () => {
        const newParticipants = await fetchParticipants();
        removeAll();
        bulkAdd(newParticipants);
    };

    const onDiscordAdd = async () => {
        bulkAdd(await fetchParticipants());
    };

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
                            <CardHeader className="border-b">
                                <CardTitle>{chrome.i18n.getMessage('seedingTitle')} </CardTitle>
                                <CardDescription className="flex items-center">
                                    <span className="mr-2 whitespace-nowrap">
                                        {chrome.i18n.getMessage('seedingTotalParticipants', [
                                            participants.length.toString(),
                                        ])}
                                    </span>
                                    <Input
                                        className="mr-2"
                                        onChange={handleChange}
                                        onKeyDown={handleKeyDown}
                                        placeholder={chrome.i18n.getMessage('inputTagPlaceholder')}
                                        ref={inputRef}
                                        value={tag}
                                    />
                                    <HoverCard>
                                        <HoverCardTrigger>
                                            <PlusCircleIcon
                                                className="cursor-pointer ml-2"
                                                height="24"
                                                onClick={handleAddNewParticipant}
                                                width="24"
                                            />
                                        </HoverCardTrigger>
                                        <HoverCardContent>
                                            {chrome.i18n.getMessage(
                                                'seedingAddParticipantDescription',
                                            )}
                                        </HoverCardContent>
                                    </HoverCard>
                                    <HoverCard>
                                        <HoverCardTrigger>
                                            <XCircleIcon
                                                className="cursor-pointer ml-2"
                                                onClick={removeAll}
                                            />
                                        </HoverCardTrigger>
                                        <HoverCardContent>
                                            {chrome.i18n.getMessage(
                                                'seedingRemoveAllParticipantsDescription',
                                            )}
                                        </HoverCardContent>
                                    </HoverCard>
                                    <Popover>
                                        <PopoverTrigger>
                                            <BotIcon className="cursor-pointer ml-2" />
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <div className="grid gap-4">
                                                <div className="space-y-2">
                                                    <h4 className="font-medium leading-none">
                                                        {chrome.i18n.getMessage(
                                                            'seedingFetchDiscordDescription',
                                                        )}
                                                    </h4>
                                                </div>
                                                <div className="flex items-center flex-wrap justify-center">
                                                    <Button
                                                        className="m-2"
                                                        onClick={onDiscordReplace}
                                                    >
                                                        {chrome.i18n.getMessage(
                                                            'seedingDiscordReplaceAction',
                                                        )}
                                                    </Button>
                                                    <Button className="m-2" onClick={onDiscordAdd}>
                                                        {chrome.i18n.getMessage(
                                                            'seedingDiscordAddAction',
                                                        )}
                                                    </Button>
                                                </div>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-6">
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
