import Marketplace from "../../types/Marketplace";
interface CardProps {
    cardId: number;
    name: string;
    price: number;
    marketplace: Marketplace;
    rating: number;
    feedback: number;
    link: string;
    imagePath: string;
    isFavorite: boolean;
}

export default CardProps;