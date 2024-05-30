import User from "../../types/User";

interface HeaderProps {
    user: User | null;
    value: string;
    onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined ;
    disabledSearch: boolean;
    readOnly: boolean;
}

export default HeaderProps;