export interface NewsArticles {
    status: string;
    copyright: string;
    response: Response;
}

export interface Response {
    docs: Doc[];
    metadata: Metadata;
}

export interface Doc {
    abstract: string;
    byline: Byline;
    document_type: DocumentType;
    headline: Headline;
    _id: string;
    keywords: Keyword[];
    multimedia: Multimedia;
    news_desk: NewsDesk;
    print_page: string;
    print_section: PrintSection;
    pub_date: Date;
    section_name: string;
    snippet: string;
    source: Source;
    subsection_name: string;
    type_of_material: TypeOfMaterial;
    uri: string;
    web_url: string;
    word_count: number;
}

export interface Byline {
    original: string;
}

export type DocumentType = "article";

export interface Headline {
    main: string;
    kicker: Kicker;
    print_headline: string;
}

export type Kicker = "" | "DealBook Newsletter";

export interface Keyword {
    name: Name;
    value: string;
    rank: number;
}

export type Name = "Person" | "Subject" | "Organization" | "Location";

export interface Multimedia {
    caption: string;
    credit: string;
    default: Default;
    thumbnail: Default;
}

export interface Default {
    url: string;
    height: number;
    width: number;
}

export type NewsDesk = "Washington" | "Business" | "Foreign";

export type PrintSection = "A" | "" | "B";

export type Source = "The New York Times";

export type TypeOfMaterial = "News";

export interface Metadata {
    hits: number;
    offset: number;
    time: number;
}
