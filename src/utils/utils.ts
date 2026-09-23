export function getInitials(name: string) : string {
    const names = name.trim().split(/\s+/);

        if (names.length === 1) {
            return names[0].charAt(0).toUpperCase();
        }

        return (
            names[0].charAt(0) +
            names[1].charAt(0)
        ).toUpperCase();
}