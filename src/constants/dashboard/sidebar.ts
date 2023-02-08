import {IconType} from 'react-icons';
import {AiFillMessage} from 'react-icons/ai';
import {BsTelephoneFill} from 'react-icons/bs';
import {GiTwoCoins} from 'react-icons/gi';
import {HiDocument} from 'react-icons/hi';
import {MdHelp} from 'react-icons/md';
import {VscDashboard} from 'react-icons/vsc';


export type MenuSectionData = {
    name: string;
    icon: IconType;
    link?: string;
    pages?: Readonly<SectionPageData[]>;
};

type SectionPageData = {
    name: string;
    link: string;
};


export const MENU: Readonly<MenuSectionData[]> = [
    {
        name: 'Dashboard',
        icon: VscDashboard,
        link: '/dashboard',
    },
    {
        name: 'Messenger',
        icon: AiFillMessage,
        link: '/dashboard/messenger',
    },
    {
        name: 'Finance',
        icon: GiTwoCoins,
        pages: [
            {
                name: 'Swap',
                link: '/dashboard/finance/swap',
            },
            {
                name: 'Transactions',
                link: '/dashboard/finance/transactions',
            },
        ],
    },
    {
        name: 'MetaVerse Telecom Service',
        icon: BsTelephoneFill,
        pages: [
            {
                name: 'About',
                link: '/dashboard/mvts',
            },
            {
                name: 'Shop',
                link: '/dashboard/mvts/shop',
            },
            {
                name: 'Marketplace',
                link: '/dashboard/mvts/marketplace',
            },
            {
                name: 'Account',
                link: '/dashboard/mvts/account',
            },
            {
                name: 'Settings',
                link: '/dashboard/mvts/settings',
            },
        ],
    },
    {
        name: 'Documentation',
        icon: HiDocument,
    },
    {
        name: 'Help',
        icon: MdHelp,
    },
];
