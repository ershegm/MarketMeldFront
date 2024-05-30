import Marketplace from "../types/Marketplace";
import Sorting from "../types/Sorting";

export const shopsOptions = [
    { value: Marketplace.WB, label: 'Wildberries' },
    { value: Marketplace.OZON, label: 'Ozon' },
    { value: Marketplace.YANDEX, label: 'ЯндексМаркет' },
];
export const sortingOptions = [
    { value: Sorting.PRICE_INCREASE, label: 'Цена по возрастанию' },
    { value: Sorting.PRICE_DECREASE, label: 'Цена по убыванию' },
    { value: Sorting.RATING, label: 'По рейтингу' },
    { value: Sorting.FEEDBACK, label: 'По количеству отзывов' },
];