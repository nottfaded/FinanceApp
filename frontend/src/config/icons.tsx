import { Avatar } from "antd";
import { CiBank } from "react-icons/ci";
import { FaPiggyBank, FaWallet } from "react-icons/fa";

const DEF_BG_ICON = "#575757";

export const ALL_ICONS: { [key: string]: React.ReactNode } = {
    'bill 1': <FaWallet />,
    'bill 2': <FaPiggyBank />,
    'bill 3': <CiBank />
}

export const BILL_ICONS: Category[] = [
    {
        iconName: 'bill 1',
        name: 'Bill 1',
        color: DEF_BG_ICON
    },
    {
        iconName: 'bill 2',
        name: 'Bill 2',
        color: DEF_BG_ICON
    },
]


export const getIcon = (category: Category, size = 45) => {
    const icon = ALL_ICONS[category.iconName]

    return (<Avatar
        icon={icon}
        size={size}
        style={{
            backgroundColor: category.color,
        }}
    />)
}