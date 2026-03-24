import { getSkipPointers } from '@src/skip-list';

describe('SkipList TestSuite', () => {
    it('should return skip pointers less than postings.length', () => {
        const postings = [1, 2, 4, 7, 27, 32, 56, 60, 62, 64, 68, 74];
        const skipPtrs = getSkipPointers(postings);
        const lastSkipPtr = skipPtrs[skipPtrs.length - 1];
        expect(lastSkipPtr).toBeLessThan(postings.length);
        expect(lastSkipPtr).toBe(8);
    });

    it('should return skip pointers equal to postings.length', () => {
        const postings = [1, 2, 4, 7, 27, 32, 56, 60, 62, 64, 68, 74, 98];
        const skipPtrs = getSkipPointers(postings);
        const lastSkipPtr = skipPtrs[skipPtrs.length - 1];
        expect(lastSkipPtr).toBeLessThan(postings.length);
        expect(lastSkipPtr).toBe(12);
    });

    it('should return skip pointers greater than postings.length', () => {
        const postings = [1, 2, 4, 7, 27, 32, 56, 60, 62, 64, 68, 74, 98, 100];
        const skipPtrs = getSkipPointers(postings);
        const lastSkipPtr = skipPtrs[skipPtrs.length - 1];
        expect(lastSkipPtr).toBeLessThan(postings.length);
        expect(lastSkipPtr).toBe(12);
    });
});
