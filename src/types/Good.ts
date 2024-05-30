import Marketplace from "./Marketplace";

interface Good {
    id: number;
    name: string;
    price: number;
    marketplace: Marketplace;
    rating: number;
    feedback: number;
    link: string;
    imageUrl: string;
};

export default Good;