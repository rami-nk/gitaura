import { describe, it, expect } from 'vitest';
import { timeAgo } from '../services/dateUtils.ts';
import * as MockDate from "mockdate";

describe('timeAgo', () => {
    beforeAll(() => {
        // Freeze the new Date()/ Date.now() creation on this period
        MockDate.set("2023-01-01");
    });
    afterAll(() => {
        // Restore the original Date() / Date.now() behavior
        MockDate.reset();
    });

    it('returns just now for current time', () => {
        const result = timeAgo('2023-01-01T00:00:00Z');
        expect(result).toBe('Updated just now');
    });

    it('returns minutes ago', () => {
        const result = timeAgo('2022-12-31T23:58:00Z');
        expect(result).toBe('Updated 2 minute(s) ago');
    });

    it('returns hours ago', () => {
        const result = timeAgo('2022-12-31T22:00:00Z');
        expect(result).toBe('Updated 2 hour(s) ago');
    });

    it('returns days ago', () => {
        const result = timeAgo('2022-12-30T00:00:00Z');
        expect(result).toBe('Updated 2 day(s) ago');
    });

    it('returns weeks ago', () => {
        const result = timeAgo('2022-12-16T00:00:00Z');
        expect(result).toBe('Updated 2 week(s) ago');
    });

    it('returns formatted date for more than 4 weeks but less than a year', () => {
        const result = timeAgo('2022-11-01T00:00:00Z');
        expect(result).toBe('Updated on November 1');
    });

    it('returns formatted date for older than a year', () => {
        const result = timeAgo('2021-12-31T22:00:00Z');
        expect(result).toBe('Updated on December 31, 2021');
    });

    it('throws an error for future dates', () => {
        const futureDate = '2023-01-09T00:00:00Z';
        expect(() => timeAgo(futureDate)).toThrow("Argument dateString must be before Date.now()!");
    });
});