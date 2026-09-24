export interface Book {
    id: number;
    title: string;
    year: number;
    author_id: number;
    available: boolean;
}

export interface NewBook {
    id: number;
    title: string;
    year: number;
}

export interface UpdateBook {
    id: number | null;
    title: string | null;
    year: number | null;
}
