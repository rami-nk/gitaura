/**
 * Transforms a programming language string into a sanitized, CSS-friendly class name.
 *
 * This function is designed to take a language name (as returned from the GitHub repositories API)
 * and sanitize it for use as a CSS class name. It handles specific cases like 'C#' and 'C++',
 * replacing special characters with text that can be used in CSS class names.
 *
 * @param {string} language - The programming language string from a GitHub repository.
 * @returns {string} - A sanitized string suitable for use as a CSS class name.
 *
 * Transformations:
 * - Replaces '#' with '-Sharp' (for 'C#').
 * - Replaces '+' with 'p' (for 'C++').
 * - Replaces spaces with '-'.
 * - Removes any characters that are not alphanumeric, underscores, or hyphens.
 *
 * Usage:
 * This function is particularly useful for dynamically assigning CSS classes based on programming languages
 * returned from the GitHub API. The sanitized string ensures valid and consistent class names.
 *
 * Example:
 * const language = "C#";
 * const className = sanitizeClassName(language); // Returns "C-Sharp"
 */
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

/**
 * Determines whether there is a next page of data available in a paginated GitHub API response.
 *
 * The GitHub API includes pagination information in the `Link` header of the response. This function checks
 * if there is a link with `rel="next"` in the provided `Link` header string, indicating the presence of a subsequent page of data.
 *
 * @param {string} link - The `Link` header string from a GitHub API paginated response.
 * @returns {boolean} - Returns `true` if there is a next page available, `false` otherwise.
 *
 * Usage:
 * This function is useful when handling paginated responses from the GitHub API. After fetching data,
 * you can use this function to determine if additional pages of data are available to be fetched.
 *
 * Example:
 * const linkHeader = '<https://api.github.com/user/repos?page=2>; rel="next", <https://api.github.com/user/repos?page=2>; rel="last"';
 * const morePagesAvailable = hasNextPage(linkHeader);
 */
export const hasNextPage = (link: string): boolean => {
    const nextLinkRegex = /<([^>]+)>;\s*rel="next"/;
    return nextLinkRegex.test(link);
}