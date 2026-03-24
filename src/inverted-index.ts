import { Query, EOperators } from './query';
import { SkipList, getSkipPointers } from './skip-list';

export class InvertedIndex {
    dictionary: Map<string, SkipList>;

    constructor(dictionary: Map<string, number[]>) {
        this.dictionary = new Map<string, SkipList>();
        for (const [term, postings] of dictionary.entries()) {
            const skipList: SkipList = {
                postings,
                skipPtrs: getSkipPointers(postings),
            };
            this.dictionary.set(term, skipList);
        }
    }

    search(query: Query): number[] {
        if (!query || query.terms.length === 0) {
            return [];
        }

        const term = query.terms.shift()!;
        if (query.terms.length === 1 && !this.dictionary.has(term)) {
            return [];
        }

        let results: SkipList = this.dictionary.get(term)!;
        while (query.operator.length > 0) {
            const operator = query.operator.shift()!;
            const term = query.terms.shift()!;
            if (operator === EOperators.AND) {
                const postingsA = results.postings;
                const postingsB = this.dictionary.get(term)!.postings;
                const postings = intersect(postingsA, postingsB);
                results = {
                    postings,
                    skipPtrs: getSkipPointers(postings),
                };
            } else if (operator === EOperators.OR) {
                const postingsA = results.postings;
                const postingsB = this.dictionary.get(term)!.postings;
                const postings = union(postingsA, postingsB);
                results = {
                    postings,
                    skipPtrs: getSkipPointers(postings),
                };
            } else {
                throw new Error('Unexpected Operator');
            }
        }
        return results.postings;
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
