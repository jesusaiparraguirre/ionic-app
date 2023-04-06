export interface Home {
    course : Products,
    meeting : Products,
    event : Products,
    campaign : Products,
}

export interface Products {
    title ?: string;
    detail?: string;
    data ?: Product[]
}

export interface Product {
    id ?: string | number;
    type ?: string;
    slug ?: string;
    name ?: string;
    detail ?: string;
    image ?: string;
    currency ?: string;
    isPayment ?: boolean;
    visualizations ?: string;
    creator ?: string;
    duration ?: string;
    isLive ?: boolean;
    liveDesc ?: string;
    isTicket ?: boolean;
    subscription ?: Subscription;
    price ?: Price;
    priceFormat ?: string;
    ticket ?: Ticket[];
    stream ?: string;
    meetingType ?: string;
    meetingTypeDesc ?: string;
    date ?: string;
    totalProducts ?: number;
    author ?: any[];
    isNew ?: boolean;
    subType ?: string;
    city ?: string;
}

export interface Subscription {
    active ?: boolean;
    progress ?: number;
    summary ?: number;
}

export interface Price {
    id ?:  string;
    name ?:  string;
    price ?:  string;
    pricePromotion ?:  string;
    pricePromotionFormat ?:  string;
    priceFormat?: string;
    enabledPromotion ?: boolean;
    currency ?: string;
}

export interface Ticket {
    id ?: string;
    title ?: string;
    detail ?: string;
    status ?: string;
    payment ?: string;
    benefit ?: any[],
    price ?: TicketPrice[]
}

export interface TicketPrice {
    id ?: string;
    name ?: string;
    order ?: string;
    price ?: string;
    value ?: string;
    expiration ?: string;
    status ?: string;
}

export interface IRecommend {
    image: string;
    title: string;
    url: string;
    type: string;
}

export interface Logo {
    img_id: string;
    img_uri: string;
    type: string;
    img_name: string;
    type_file: string;
    size: string;
    partner_id: string;
    large: string;
    real: string;
    mediun: string;
    semilarg: string;
    semimedi: string;
    square: string;
    thumbnai: string;
}

export interface Stream {
    id: string,
    name: string,
    code: string,
    detail: string,
    tag: string,
}
