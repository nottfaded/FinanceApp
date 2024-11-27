import { MenuUnfoldOutlined, MoonOutlined, SunOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Drawer, Menu, Switch, Typography } from "antd";
import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import { GrMoney } from "react-icons/gr";
import { LiaWalletSolid } from "react-icons/lia";
import ROUTES from "../config/routes";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserStore } from "../hooks/useUserStore";
import { TbCategoryPlus } from "react-icons/tb";

export function MainDrawer() {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const [collapsed, setCollapsed] = useState(false);

    const handleResize = () => {
        if (window.innerWidth < 768) {
            setCollapsed(true);
        } else {
            setCollapsed(false);
        }
    };

    useEffect(() => {
        handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <Button
                type="primary"
                className="absolute shadow-none left-2 top-2"
                size='middle'
                onClick={showDrawer}
            >
                <MenuUnfoldOutlined />
            </Button>

            <Drawer
                title={<Header />}
                placement="left"
                onClose={onClose}
                open={open}
                closable={collapsed}
                footer={<Footer />}
                styles={{
                    body:{
                        padding: '10px 0px 0px 0px'
                    }
                }}
            >
                <Body onClose={onClose} />
            </Drawer>
        </>
    )
}

function Header() {
    const user = useUserStore(); 
    const { isDarkTheme, toggleTheme } = useTheme();

    return (
        <div>
            {user.isLogged()
                ? (
                    <div className="flex">
                        <div className="flex gap-4 items-center">
                            <Avatar size={64} icon={<UserOutlined />} />
                            <div className="flex flex-col gap-1">
                                <div>{user.email}</div>
                                <div>Total: 1000$</div>
                            </div>
                        </div>

                        <Button onClick={user.resetUserData}>Logout</Button>

                        <div className="flex-1 m-auto text-end">
                            <Switch
                                checkedChildren={<SunOutlined />}
                                unCheckedChildren={<MoonOutlined />}
                                checked={!isDarkTheme}
                                onClick={toggleTheme}
                            />
                        </div>
                    </div>
                )
                : (
                    <div className="flex">
                        <div className="flex gap-4 items-center cursor-pointer" onClick={() => {
                            window.location.href = ROUTES.auth;
                        }}>
                            <Avatar size={64} icon={<UserOutlined />} />
                            Sign In
                        </div>

                        <div className="flex-1 m-auto text-end">
                            <Switch
                                checkedChildren={<SunOutlined />}
                                unCheckedChildren={<MoonOutlined />}
                                checked={!isDarkTheme}
                                onClick={toggleTheme}
                            />
                        </div>
                    </div>
                )
            }
        </div>
    )
}

const items: ItemType<MenuItemType>[] = [
    { key: ROUTES.main, icon: <GrMoney />, label: 'Main'},
    { key: ROUTES.bills, icon: <LiaWalletSolid />, label: 'Bills' },
    // { key: ROUTES.categories, icon: <TbCategoryPlus />, label: 'Categories' },
];

function Body({onClose} : {onClose : () => void}) {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Menu
            defaultSelectedKeys={[location.pathname.split('/')[1]]}
            mode="inline"
            items={items}
            onClick={(info) => {
                onClose();
                navigate(info.key);
            }}
        />
    )
}

function Footer() {
    return (
        <Typography className='p-1'>
            FinanceApp ©{new Date().getFullYear()} Created by <a href="https://www.linkedin.com/in/oleksii-oleinykov-5a3117239/" target='_blank'>Oleksii Oleinykov</a>
        </Typography>
    )
}