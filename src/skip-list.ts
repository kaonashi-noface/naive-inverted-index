
export type SkipList = {
    postings: number[],
    skipPtrs: number[],
};

export function getSkipPointers(postings: number[]) : number[] {
    const skipLength = Math.ceil(Math.sqrt(postings.length));
    const skipPtrs: number[] = getMultiples(postings.length, skipLength);
    return skipPtrs;
}

function getMultiples(n: number, k: number) : number[] {
    const multiples: number[] = [];
    for (let i=k; i<n; i+=k) {
        multiples.push(i);
    }
    return multiples;
}
