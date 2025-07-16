export function timeToMilliseconds(time: string) {
    const timePattern = /^(\d+)([smhdw])$/i;
    const match = time.match(timePattern);

    if (!match) {
    throw new Error('Invalid time format. Use formats like 7d, 7h, 15m, 30s');
    }

    const value = parseInt(match[1], 10);
    const unit = match[2].toLocaleLowerCase();

    switch (unit) {
        case 's': return value * 1000;
        case 'm': return value * 60 * 1000;
        case 'h': return value * 60 * 60 * 1000;
        case 'd': return value * 24 * 60 * 60 * 1000;
        case 'w': return value * 7 * 24 * 60 * 60 * 1000;
        default:
            throw new Error(`Unsupported time unit: ${unit}`);
    }
}