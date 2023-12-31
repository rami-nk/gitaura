/**
 * Converts a date string into a human-readable "time ago" format.
 *
 * This function calculates the time elapsed since the given date and returns
 * a string representing this time in a human-readable format. It handles various
 * time ranges from seconds to months and defaults to the exact date for longer periods.
 *
 * @param {string} dateString - The date string to be converted into "time ago" format.
 * @returns {string} - A string representing the time elapsed since the date.
 *                     The format varies based on the time difference: "Updated just now",
 *                     "Updated [x] minute(s) ago", "Updated [x] hour(s) ago", etc.
 *
 * Throws:
 * - Error if the `dateString` represents a date in the future relative to the current time.
 *
 * Usage:
 * This function is useful for displaying the relative time since an event occurred,
 * such as the last update time of a file or a post.
 *
 * Example:
 * const lastUpdated = "2021-03-29T12:30:00Z";
 * console.log(timeAgo(lastUpdated)); // Output: "Updated [x] days ago"
 */
export const timeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();

    if (date.getTime() > now.getTime()) throw Error("Argument dateString must be before Date.now()!");
    const seconds = Math.round((now.getTime() - date.getTime()) / 1000);
    const minutes = Math.round(seconds / 60);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);
    const weeks = Math.round(days / 7);
    const months = Math.round(weeks / 4.345); // Average weeks in a month

    if (seconds < 60) {
        return 'Updated just now';
    } else if (minutes < 60) {
        return `Updated ${minutes} minute(s) ago`;
    } else if (hours < 24) {
        return `Updated ${hours} hour(s) ago`;
    } else if (days < 7) {
        return `Updated ${days} day(s) ago`;
    } else if (weeks < 5) {
        return `Updated ${weeks} week(s) ago`;
    } else if (months < 12) {
        return `Updated on ${date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`;
    } else {
        return `Updated on ${date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`;
    }
}