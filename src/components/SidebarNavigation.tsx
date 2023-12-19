import logo from '../assets/logo.svg';
import {
    BookOpenIcon,
    ChatBubbleLeftRightIcon,
    HomeIcon,
    LockClosedIcon,
    QueueListIcon,
} from '@heroicons/react/24/outline';
import {
    Button,
    DarkThemeToggle,
    Sidebar,
    SidebarItem,
    SidebarItemGroup,
    SidebarItems,
    SidebarLogo,
} from 'flowbite-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const SidebarNavigation = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Button onClick={() => setOpen(!open)}>sdwfgh</Button>
            <Sidebar className="h-screen" collapsed={open}>
                <SidebarLogo href="/" img={logo}>
                    {chrome.i18n.getMessage('extensionName')}
                </SidebarLogo>
                <SidebarItems>
                    <SidebarItemGroup>
                        <Link to="/">
                            <SidebarItem icon={HomeIcon}>
                                {chrome.i18n.getMessage('navigationHome')}
                            </SidebarItem>
                        </Link>
                        <Link to="/seeding">
                            <SidebarItem icon={QueueListIcon}>
                                {chrome.i18n.getMessage('navigationSeeding')}
                            </SidebarItem>
                        </Link>
                        <SidebarItem
                            href="https://discord.com/invite/P9HRxenvex"
                            icon={ChatBubbleLeftRightIcon}
                            target="_blank"
                        >
                            {chrome.i18n.getMessage('navigationDiscord')}
                        </SidebarItem>
                        <SidebarItem
                            href="https://wiki.ggmunich.de/"
                            icon={BookOpenIcon}
                            target="_blank"
                        >
                            {chrome.i18n.getMessage('navigationWiki')}
                        </SidebarItem>
                        <SidebarItem
                            href="https://vault.ggmunich.de/"
                            icon={LockClosedIcon}
                            target="_blank"
                        >
                            {chrome.i18n.getMessage('navigationVault')}
                        </SidebarItem>
                        <DarkThemeToggle />
                    </SidebarItemGroup>
                </SidebarItems>
            </Sidebar>
        </>
    );
};
