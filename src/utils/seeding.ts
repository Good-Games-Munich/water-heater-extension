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

    for (const [index, participant] of participants.entries()) {
        groups[groupIndex].push({ tag: participant.tag, seed: index + 1 });

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
    }

    // Find the size of the largest group
    let maxSize = groups[0].length;
    for (const group of groups) {
        if (group.length > maxSize) {
            maxSize = group.length;
        }
    }

    // Add filler participants to the groups that have fewer participants
    for (const group of groups) {
        while (group.length < maxSize) {
            group.push({
                tag: fillerTag,
                seed: participants.length + 1 + group.length,
            });
        }
    }

    return groups;
};
