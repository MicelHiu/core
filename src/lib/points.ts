export const POINTS_PER_HOUR_PER_SEAT = 10;

export function calculatePointsPreview(seats: number, duration: number): number {
    return POINTS_PER_HOUR_PER_SEAT * seats * duration;
}
