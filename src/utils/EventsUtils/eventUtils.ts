export function formatEventDateTime(startDate: string, endDate: string) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const dateOptions: Intl.DateTimeFormatOptions = {
        month: "short",
        day: "numeric",
        year: "numeric",
    };

    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    };

    return {
        startDate: start.toLocaleDateString(undefined, dateOptions),
        endDate: end.toLocaleDateString(undefined, dateOptions),
        startTime: start.toLocaleTimeString(undefined, timeOptions),
        endTime: end.toLocaleTimeString(undefined, timeOptions),
    };
}

export function isEventMultiday(
    startDate: string,
    endDate: string
): boolean {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const differenceInMilliseconds =
        end.getTime() - start.getTime();

    const twentyFourHours = 24 * 60 * 60 * 1000;

    return differenceInMilliseconds >= twentyFourHours;
}