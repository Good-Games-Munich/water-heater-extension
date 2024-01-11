import type { Participant } from '@/hooks/stores/useWeeklyParticipantsStore';

interface AssignedParticipant {
    seed: number;
    tag: string;
}

export const assignPools = (
    participants: Participant[],
    numberGroups: number,
    fillerTag: string,
): AssignedParticipant[][] => {
    const groups: AssignedParticipant[][] = Array.from({ length: numberGroups }, () => []);

    let direction = 1; // 1 for left to right, -1 for right to left
    let groupIndex = 0;
    let seed = 1;

    for (const participant of participants) {
        groups[groupIndex].push({ tag: participant.tag, seed });

        // Update group index and seed based on direction
        groupIndex += direction;
        seed++;

        // Change direction if reaching the boundaries
        if (groupIndex === numberGroups) {
            groupIndex = numberGroups - 1;
            direction = -1;
        } else if (groupIndex === -1) {
            groupIndex = 0;
            direction = 1;
        }
    }

    // Calculate the maximum group size
    const maxGroupSize = Math.max(...groups.map(group => group.length));

    // Fill up each group to the maximum size
    while (true) {
        const group = groups[groupIndex];

        if (group.length < maxGroupSize) {
            group.push({ tag: fillerTag, seed });
            seed++;
        }

        // Update group index based on direction
        groupIndex += direction;

        // Change direction if reaching the boundaries
        if (groupIndex === numberGroups) {
            groupIndex = numberGroups - 1;
            direction = -1;
        } else if (groupIndex === -1) {
            groupIndex = 0;
            direction = 1;
        }

        // Break the loop if all groups have been filled
        if (groups.every(toCheckGroup => toCheckGroup.length === maxGroupSize)) {
            break;
        }
    }

    return groups;
};
