import { Query, EOperators } from './query';
// TODO: replace number[] postings with SkipList type
// import { SkipList } from "./skip-list";

export class InvertedIndex {
    dictionary: Map<string, number[]>;

    constructor(dictionary: Map<string, number[]>) {
        this.dictionary = dictionary;
    }

    search(query: Query): number[] {
        if (!query || query.terms.length === 0) {
            return [];
        }

        const term = query.terms.shift()!;
        if (query.terms.length === 1 && !this.dictionary.has(term)) {
            return [];
        }

        let results: number[] = this.dictionary.get(term)!;
        while (query.operator.length > 0) {
            const operator = query.operator.shift()!;
            const term = query.terms.shift()!;
            const postings = this.dictionary.get(term)!;

            if (operator === EOperators.AND) {
                results = intersect(results, postings);
            } else if (operator === EOperators.OR) {
                results = union(results, postings);
            } else {
                throw new Error('Unexpected Operator');
            }
        }
        return results;
    }
}

function intersect(setA: number[], setB: number[]): number[] {
    const set: number[] = [];
    let i = 0,
        j = 0;
    while (i < setA.length && j < setB.length) {
        if (setA[i] === setB[j]) {
            set.push(setA[i]);
        }

        if (setA[i] <= setB[j]) {
            i++;
        } else {
            j++;
        }
    }
    return set;
}

function union(setA: number[], setB: number[]): number[] {
    const set: number[] = [];
    let i = 0,
        j = 0;
    while (i < setA.length && j < setB.length) {
        if (setA[i] < setB[j]) {
            set.push(setA[i]);
        } else if (setB[j] < setA[i]) {
            set.push(setB[j]);
        }

        if (setA[i] <= setB[j]) {
            i++;
        } else {
            j++;
        }
    }

    if (i >= setA.length) {
        return set.concat(setB.slice(j));
    }

    if (j >= setB.length) {
        return set.concat(setA.slice(i));
    }

    return set;
}
