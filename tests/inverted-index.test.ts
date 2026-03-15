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
        const index = new InvertedIndex(preprocessed);
        const actualResults = index.search(new Query('word3'));
        expect(actualResults).toStrictEqual([2, 5, 23, 52]);
    })

    it('should perform an AND query', () => {
        const query = new Query('word2')
            .and('word3');
        const index = new InvertedIndex(preprocessed);
        const actualResults = index.search(query);
        expect(actualResults).toStrictEqual([2, 23, 52]);
    })

    it('should perform an OR query', () => {
        const query = new Query('word1')
            .or('word2');
        const index = new InvertedIndex(preprocessed);
        const actualResults = index.search(query);
        expect(actualResults).toStrictEqual([1, 2, 3, 5, 23, 52, 89, 231]);
    })

})
