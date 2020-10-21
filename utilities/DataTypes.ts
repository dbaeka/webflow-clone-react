export class Entry {
    constructor(
        public id: number | string,
        public dateCreated: Date,
        public dateModified: Date,
        public name: string
    ) {
    }
}
