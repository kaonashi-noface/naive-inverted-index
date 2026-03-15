import { Query } from './query';

export class InvertedIndex {

    dictionary: Map<string, number[]>;

    constructor(dictionary: Map<string, number[]>) {
        this.dictionary = dictionary;
    }

    search(query: Query) : number[] {
        if(!query || query.terms.length === 0) {
            return [];
        }

        const term = query.terms.shift()!;
        if(query.terms.length === 1 && !this.dictionary.has(term)) {
            return [];
        }
        const postings: number[] = this.dictionary.get(term)!;
        return postings;
    }

}
