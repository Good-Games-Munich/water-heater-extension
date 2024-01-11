import { useSettingsStore } from '../hooks/stores/useSettingsStore';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
    BanknoteIcon,
    BookOpenTextIcon,
    HomeIcon,
    ListFilterIcon,
    LockIcon,
    MessageCircleHeartIcon,
    SettingsIcon,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const Navigation = () => {
    const { settings } = useSettingsStore();
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
                    <Link className={navigationMenuTriggerStyle()} to="/payout">
                        <BanknoteIcon className="mr-2 h-4 w-4" />
                        {chrome.i18n.getMessage('navigationPayout')}
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                        href={`https://discord.com/channels/${settings.guildId}`}
                        target="_blank"
                    >
                        <MessageCircleHeartIcon className="mr-2 h-4 w-4" />
                        {chrome.i18n.getMessage('navigationDiscord')}
                    </NavigationMenuLink>
                </NavigationMenuItem>
                {settings.wikiUrl && (
                    <NavigationMenuItem>
                        <NavigationMenuLink
                            className={navigationMenuTriggerStyle()}
                            href={settings.wikiUrl}
                            target="_blank"
                        >
                            <BookOpenTextIcon className="mr-2 h-4 w-4" />
                            {chrome.i18n.getMessage('navigationWiki')}
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                )}
                {settings.passwordManagerUrl && (
                    <NavigationMenuItem>
                        <NavigationMenuLink
                            className={navigationMenuTriggerStyle()}
                            href={settings.passwordManagerUrl}
                            target="_blank"
                        >
                            <LockIcon className="mr-2 h-4 w-4" />
                            {chrome.i18n.getMessage('navigationVault')}
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                )}
                <NavigationMenuItem>
                    <Link className={navigationMenuTriggerStyle()} to="/settings">
                        <SettingsIcon className="mr-2 h-4 w-4" />
                        {chrome.i18n.getMessage('navigationSettings')}
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
};
