export function convertEventDateTime(dateString: string) {
    const date = new Date(dateString);

    const datePart = date.toLocaleDateString(undefined, {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });

    const timePart = date.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });

    return {
        date: datePart,
        time: timePart,
    }
}