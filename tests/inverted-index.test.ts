import { InvertedIndex } from '@src/inverted-index';
import { Query } from '@src/query';

describe('Inverted Index TestSuite', () => {

    const preprocessed = new Map<string, number[]>([
        [ 'word1', [1, 3, 5, 89, 231] ],
        [ 'word2', [2, 23, 52, 89] ],
        [ 'word3', [2, 5, 23, 52] ],
        [ 'word4', [23, 52, 123, 504] ],
    ]);

    it('should query for single word', () => {
        const query = new Query('word3');
        const index = new InvertedIndex(preprocessed);
        const actualResults = index.search(query);
        expect(actualResults).toStrictEqual([2, 5, 23, 52]);
    })

})
