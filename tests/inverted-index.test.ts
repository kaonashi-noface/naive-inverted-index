import { InvertedIndex } from '@src/inverted-index';

describe('Inverted Index TestSuite', () => {

    const preprocessed = new Map<string, number[]>([
        [ 'word1', [1, 3, 5, 89, 231] ],
        [ 'word2', [2, 23, 52, 89] ],
        [ 'word3', [2, 5, 23, 52] ],
        [ 'word4', [23, 52, 123, 504] ],
    ]);

    it('should query for single word', () => {
        const index = new InvertedIndex(preprocessed);
        const actualResults = index.query('word3');
        expect(actualResults).toStrictEqual([2, 5, 23, 52]);
    })

})
