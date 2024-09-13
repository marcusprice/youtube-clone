export function formatResourceDate(resourceDate: Date): string {
    const now = Date.now();
    const timeSince = (now - resourceDate.getTime()); //milliseconds
    const hoursSince = Math.round(timeSince / (1000 * 60 * 60));
    const uploadedToday = hoursSince < 22;

    if (uploadedToday) {
        if (hoursSince === 0) {
            const minutesSince = Math.round(timeSince / (1000 * 60 * 60 * 60));
            if (minutesSince === 0) {
                return "just now";
            } else {
                // get mins since upload
                const plural = minutesSince === 1 ? "minute" : "minutes";
                return `${hoursSince} ${plural} ago`;
            }
        } else {
            // get hours since upload
            const plural = hoursSince === 1 ? "hour" : "hours";
            return `${hoursSince} ${plural} ago`;
        }
    }

    const daysSince = Math.round(hoursSince / 24);
    const uploadedInLastMonth = daysSince < 30;
    if (uploadedInLastMonth) {
        const plural = daysSince === 1 ? "day" : "days";
        return `${daysSince} ${plural} ago`;
    }

    const monthsSince = Math.round(daysSince / 30);
    const uploadedInLastYear = monthsSince < 12;
    if (uploadedInLastYear) {
        const plural = monthsSince === 1 ? "month" : "months";
        return `${monthsSince} ${plural} ago`;
    }

    const yearsSince = Math.round(monthsSince / 12);
    const plural = yearsSince === 1 ? "year" : "years";
    return `${yearsSince} ${plural} ago`
}
