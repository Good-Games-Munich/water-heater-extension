import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
    BookOpenTextIcon,
    HomeIcon,
    ListFilterIcon,
    LockIcon,
    MessageCircleHeartIcon,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const Navigation = () => {
    return (
        <NavigationMenu className="m-auto mt-4 mb-4">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Link className={navigationMenuTriggerStyle()} to="/">
                        <HomeIcon className="mr-2 h-4 w-4" />
                        {chrome.i18n.getMessage('navigationHome')}
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link className={navigationMenuTriggerStyle()} to="/seeding">
                        <ListFilterIcon className="mr-2 h-4 w-4" />
                        {chrome.i18n.getMessage('navigationSeeding')}
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                        href="https://discord.com/invite/P9HRxenvex"
                        target="_blank"
                    >
                        <MessageCircleHeartIcon className="mr-2 h-4 w-4" />
                        {chrome.i18n.getMessage('navigationDiscord')}
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                        href="https://wiki.ggmunich.de/"
                        target="_blank"
                    >
                        <BookOpenTextIcon className="mr-2 h-4 w-4" />
                        {chrome.i18n.getMessage('navigationWiki')}
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                        href="https://vault.ggmunich.de/"
                        target="_blank"
                    >
                        <LockIcon className="mr-2 h-4 w-4" />
                        {chrome.i18n.getMessage('navigationVault')}
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
};
