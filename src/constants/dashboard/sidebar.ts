import {IconType} from 'react-icons';
import {GiTwoCoins} from 'react-icons/gi';
import {GrDocumentText, GrHelp, GrPhone} from 'react-icons/gr';
import {TbDashboard} from 'react-icons/tb';


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
        icon: TbDashboard,
        link: '/dashboard',
    },
    {
        name: 'MetaVerse Telecom Service',
        icon: GrPhone,
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
        name: 'Documentation',
        icon: GrDocumentText,
    },
    {
        name: 'Help',
        icon: GrHelp,
    },
];
