import { useSettingsStore } from '../../hooks/stores/useSettingsStore';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Separator } from '@/components/ui/separator';
import { useWeeklyParticipantsStore } from '@/hooks/stores/useWeeklyParticipantsStore';
import { useWeeklySeedingStore } from '@/hooks/stores/useWeeklySeedingStore';
import { assignPools } from '@/utils/seeding';
import { useMemo } from 'react';

export const ChallongeGrouping = () => {
    const { settings } = useSettingsStore();
    const { participants } = useWeeklyParticipantsStore();
    const {
        weeklySeeding: { seedingWeeklyGroups },
    } = useWeeklySeedingStore();

    const pools = useMemo(
        () => assignPools(participants, seedingWeeklyGroups, settings.fillerTag),
        [participants, seedingWeeklyGroups, settings.fillerTag],
    );

    return (
        <div>
            {pools.map((pool, index) => (
                <div className="mb-4" key={`pool-${index + 1}`}>
                    <h2 className="select-none scroll-m-20 text-2xl font-semibold tracking-tight">
                        {chrome.i18n.getMessage('seedingPool', [(index + 1).toString()])}
                    </h2>
                    <Separator className="my-2" />
                    {pool.map(participant => (
                        <div className="flex w-full gap-2 my-1" key={participant.seed}>
                            <div className="bg-secondary inline-block px-1 flex-grow-0 min-w-1 text-center select-none">
                                <HoverCard>
                                    <HoverCardTrigger>{participant.seed}</HoverCardTrigger>
                                    <HoverCardContent>
                                        {chrome.i18n.getMessage('seedingPositionTooltip')}
                                    </HoverCardContent>
                                </HoverCard>
                            </div>
                            <div className="flex-grow-1">{participant.tag}</div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};
