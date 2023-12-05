import {hasNextPage, sanitizeClassName} from "../services/stringUtils";

describe('sanitizeClassName', () => {
    it('replaces # with -Sharp', () => {
        expect(sanitizeClassName('C#')).toBe('C-Sharp');
    });

    it('replaces + with p', () => {
        expect(sanitizeClassName('C++')).toBe('Cpp');
    });

    it('replaces spaces with dashes', () => {
        expect(sanitizeClassName('Some Language')).toBe('Some-Language');
    });

    it('removes invalid characters', () => {
        expect(sanitizeClassName('Language!@$%^&*()')).toBe('Language');
    });

    it('handles a combination of cases', () => {
        expect(sanitizeClassName('C# ++ Language')).toBe('C-Sharp-pp-Language');
    });
});

describe('hasNextPage', () => {
    it('returns true if link contains rel="next"', () => {
        const link = '<https://api.github.com/user/58343300/repos?per_page=15&page=4>; rel="next"';
        expect(hasNextPage(link)).toBe(true);
    });

    it('returns false if link does not contain rel="next"', () => {
        const link = '<https://api.github.com/user/58343300/repos?per_page=15&page=2>; rel="prev"';
        expect(hasNextPage(link)).toBe(false);
    });

    it('returns false for an empty string', () => {
        const link = '';
        expect(hasNextPage(link)).toBe(false);
    });

    it('returns true for multiple links when rel="next" is present', () => {
        const link = '<https://api.github.com/user/58343300/repos?per_page=15&page=2>; rel="prev", <https://api.github.com/user/58343300/repos?per_page=15&page=4>; rel="next", <https://api.github.com/user/58343300/repos?per_page=15&page=1>; rel="first"';
        expect(hasNextPage(link)).toBe(true);
    });
});