class Library {
    titles: string[];

    constructor(underRenovation: boolean) {
        if (underRenovation) {
            this.titles = ['Some text'];
        }
    }
}

const library = new Library(false);

const shortTitles = library.titles.filter(
    title => title.length < 5
);