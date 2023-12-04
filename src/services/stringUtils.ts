export const sanitizeClassName = (language: string): string => {
    return language
        // Replace # with _sharp (for C#)
        .replace(/#/g, '-Sharp')
        // Replace + with _plus (for C++)
        .replace(/\+/g, 'p')
        // Replace spaces with underscores
        .replace(/\s+/g, '-')
        // Remove any other invalid characters
        .replace(/[^a-zA-Z0-9_-]/g, '');
}