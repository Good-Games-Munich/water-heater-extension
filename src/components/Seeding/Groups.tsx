import { ChallongeGrouping } from '@/components/GroupPlatform/ChallongeGrouping';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useWeeklySeedingStore } from '@/hooks/stores/useWeeklySeedingStore';

export const Groups = () => {
    const {
        weeklySeeding: { seedingWeeklyPlatform, seedingWeeklyGroups },
        update,
    } = useWeeklySeedingStore();

    return (
        <>
            <div className="flex items-center">
                <Select
                    defaultValue={seedingWeeklyPlatform}
                    onValueChange={value => update({ seedingWeeklyPlatform: value })}
                >
                    <SelectTrigger className="w-[180px] mr-2">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {/* eslint-disable-next-line i18next/no-literal-string */}{' '}
                            <SelectItem value="challonge">Challonge</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Input
                    className="w-[90px] mx-2"
                    onChange={event => {
                        const value = Number.parseInt(event.target.value, 10);
                        if (Number.isNaN(value) || value <= 0) {
                            // Ignore the input or set it to a default value
                            return;
                        }

                        update({ seedingWeeklyGroups: value });
                    }}
                    type="number"
                    value={seedingWeeklyGroups}
                />
                {chrome.i18n.getMessage('seedingGroups')}
            </div>
            <div className="mt-4">
                {seedingWeeklyPlatform === 'challonge' && <ChallongeGrouping />}
            </div>
        </>
    );
};
