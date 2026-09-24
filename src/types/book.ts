interface Book {
    id: number;
    title: string;
    year: number;
    author_id: number;
    available: boolean;
}

interface NewBook {
    id: number;
    title: string;
    year: number;
}

interface UpdateBook {
    id: number | null;
    title: string | null;
    year: number | null;
}