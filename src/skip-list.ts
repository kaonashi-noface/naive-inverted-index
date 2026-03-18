export class SkipList {
    postings: number[];
    skipIdx: number[];

    constructor(postings: number[]) {
        this.postings = postings;
        // NOTE: use integer sqrt in serious/ final impl of search engine (e.g. rust or golang):
        const skipLength = Math.sqrt(this.postings.length);
        const numSkips = Math.ceil(this.postings.length / skipLength);
        this.skipIdx = [...Array(numSkips).keys()].map(
            (i) => skipLength * (i + 1),
        );

        // TODO: integrate skip lists into inverted index & refactor unit tests
    }
}
