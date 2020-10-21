interface EntryData {
    name: string,
    readonly dateCreated: Date,
    dateModified: Date,
    readonly id: number | string
}

abstract class Entry implements EntryData {
    dateModified: Date;
    name: string;

    protected constructor(
        name: string,
        readonly dateCreated: Date,
        dateModified: Date,
        readonly id: number | string,
        readonly type: EntryType,
    ) {
        this.name = name;
        this.dateModified = dateModified;
    }
}

export class FileEntry extends Entry {
    static fromData(data: EntryData): FileEntry {
        const {name, id, dateCreated, dateModified} = data;

        return new this(
            name, dateCreated, dateModified, id
        );
    }

    constructor(name: string, dateCreated?: Date, dateModified?: Date, id?: number | string) {
        super(name, dateCreated, dateModified, id, EntryType.File);
    }

}

export class FolderEntry extends Entry {

}

export enum EntryType {
    Folder = "FOLDER",
    File = "FILE"
}