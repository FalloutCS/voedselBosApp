export function gethabitIcon(habit: string | undefined): string {
    const cleanName = habit?.replace(/[\s/-]/g, '') || 'Annual';

    return `/HabitIcons/${cleanName}.png`;
}