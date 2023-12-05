import { sanitizeClassName } from "../services/stringUtils";

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