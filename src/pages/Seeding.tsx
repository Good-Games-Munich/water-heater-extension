import { DragAndDropSeedingList } from '@/components/Seeding/DragAndDropSeedingList';
import { Groups } from '@/components/Seeding/Groups';

export const Seeding = () => {
    return (
        <div className="flex flex-wrap">
            <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 pr-2">
                <DragAndDropSeedingList />
            </div>
            <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 pl-2 mt-4 sm:mt-0">
                <Groups />
            </div>
        </div>
    );
};
