export function gethabitIcon(habit: string | undefined): string {
    if (!habit) return '/HabitIcons/Annual.png';

    // cleanName verwijderd alle spaties en haakjes in namen.
    const cleanName = habit.replace(/[\s/]/g, '');

    // Plak er .png achter en geef het pad terug
    return `/HabitIcons/${cleanName}.png`;
}