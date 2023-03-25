export type cartType = {
    id:number;
    amount:number;
}

export type informationType = {
    id: number;
    name: string;
    description: string;
    price: number;
    images: Array<string>;
    download: string;
}

export type settingsType = {
    infinite: boolean;
    speed: number;
    slidesToShow: number;
    slidesToScroll: number;
}

export type cupomType = {
    code: string;
    percent: number;
}