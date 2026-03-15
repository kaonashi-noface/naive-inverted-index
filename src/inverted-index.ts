
export class InvertedIndex {

    dictionary: Map<string, number[]>;

    constructor(dictionary: Map<string, number[]>) {
        this.dictionary = dictionary;
    }

    query(term: string) : number[] {
        if(!term || !this.dictionary.has(term)) {
            return [];
        }

        const postings: number[] = this.dictionary.get(term)!;
        return postings;
    }

}
