import type { Participant } from '../hooks/stores/useWeeklyParticipantsStore';

interface AssignedParticipant {
    seed: number;
    tag: string;
}

export const assignPools = (
    participants: Participant[],
    numberGroups: number,
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

    return groups;
};
