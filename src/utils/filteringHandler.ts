import Good from "../types/Good";
import Marketplace from "../types/Marketplace";
import Sorting from "../types/Sorting";

const filteringHandler = (search: string, data: Good[], marketplaces: Marketplace[], sorting: Sorting | null, minPrice: number | string, maxPrice: number | string, loadingLimit = Infinity) => {

    if (search !== '') {
        data = data.filter((good) => good.name.toLowerCase().includes(search));
    }

    data = data.filter((good) => marketplaces.includes(good.marketplace));

    const min = minPrice === '' ? 0 : +minPrice;
    const max = maxPrice === '' ? Infinity : +maxPrice;
    data = data.filter((good) => good.price >= min && good.price <= max);

    switch (sorting) {
        case Sorting.PRICE_DECREASE:
            data.sort((a, b) => b.price - a.price);
            break;
        case Sorting.PRICE_INCREASE:
            data.sort((a, b) => a.price - b.price);
            break;
        case Sorting.FEEDBACK:
            data.sort((a, b) => b.feedback - a.feedback);
            break;
        case Sorting.RATING:
            data.sort((a, b) => b.rating - a.rating);
            break;
        default:
            break;
    }

    return data.slice(0, loadingLimit);
}

export default filteringHandler;