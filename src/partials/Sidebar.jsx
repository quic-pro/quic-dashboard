import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import SidebarLinkGroup from './SidebarLinkGroup';

function Sidebar({ sidebarOpen, setSidebarOpen }) {
    const location = useLocation();
    const { pathname } = location;

    const trigger = useRef(null);
    const sidebar = useRef(null);

    const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
    const [sidebarExpanded, setSidebarExpanded] = useState(storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true');

    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!sidebar.current || !trigger.current) return;
            if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
            setSidebarOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    });

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!sidebarOpen || keyCode !== 27) return;
            setSidebarOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });

    useEffect(() => {
        localStorage.setItem('sidebar-expanded', sidebarExpanded);
        if (sidebarExpanded) {
            document.querySelector('body').classList.add('sidebar-expanded');
        } else {
            document.querySelector('body').classList.remove('sidebar-expanded');
        }
    }, [sidebarExpanded]);

    return (
        <div>
            {/* Sidebar backdrop (mobile only) */}
            <div
                className={`fixed inset-0 shadow-lg shadow-gray-400/30 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                aria-hidden="true"
            ></div>

            {/* Sidebar */}
            <div
                id="sidebar"
                ref={sidebar}
                className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-companyBottomL dark:bg-companyBottomD p-4 transition-all duration-200 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-64'
                    }`}
            >
                {/* Sidebar header */}
                <div className="flex justify-between mb-10 pr-3 sm:px-2">
                    {/* Close button */}
                    <button
                        ref={trigger}
                        className="lg:hidden text-companyL hover:text-companyL-200 dark:text-companyD dark:hover:text-companyD-200"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        aria-controls="sidebar"
                        aria-expanded={sidebarOpen}
                    >
                        <span className="sr-only">Close sidebar</span>
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
                        </svg>
                    </button>
                    {/* Logo */}
                    <NavLink end to="/" className="block">
                        <svg width="32" height="32" viewBox="0 0 32 32">
                            <defs>
                                <linearGradient x1="28.538%" y1="20.229%" x2="100%" y2="108.156%" id="logo-a">
                                    <stop stopColor="#A5B4FC" stopOpacity="0" offset="0%" />
                                    <stop stopColor="#A5B4FC" offset="100%" />
                                </linearGradient>
                                <linearGradient x1="88.638%" y1="29.267%" x2="22.42%" y2="100%" id="logo-b">
                                    <stop stopColor="#38BDF8" stopOpacity="0" offset="0%" />
                                    <stop stopColor="#38BDF8" offset="100%" />
                                </linearGradient>
                            </defs>
                            <rect fill="#6366F1" width="32" height="32" rx="16" />
                            <path d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z" fill="#4F46E5" />
                            <path
                                d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z"
                                fill="url(#logo-a)"
                            />
                            <path
                                d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z"
                                fill="url(#logo-b)"
                            />
                        </svg>
                    </NavLink>
                </div>

                {/* Links */}
                <div className="space-y-8">
                    {/* Pages group */}
                    <div>
                        <h3 className="text-xs uppercase text-companyL hover:text-companyL-200 dark:text-companyD dark:hover:text-companyD-200 font-semibold pl-3">
                            <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">
                                •••
                            </span>
                            {/* <span className="2xl:block">Pages</span> */}
                        </h3>
                        <ul className="mt-3">
                            {/* Dashboard */}
                            <SidebarLinkGroup activecondition={pathname === '/' || pathname.includes('dashboard')}>
                                {(handleClick, open) => {
                                    return (
                                        <React.Fragment>
                                            <a
                                                href="#0"
                                                className={`block text-slate-200 hover:text-white truncate transition duration-150 ${(pathname === '/' || pathname.includes('dashboard')) && 'hover:text-slate-200'
                                                    }`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                                                }}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                                                            <path
                                                                className={`fill-current text-slate-400 ${(pathname === '/' || pathname.includes('dashboard')) && '!text-indigo-500'
                                                                    }`}
                                                                d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z"
                                                            />
                                                            <path
                                                                className={`fill-current text-slate-600 ${(pathname === '/' || pathname.includes('dashboard')) && 'text-indigo-600'}`}
                                                                d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z"
                                                            />
                                                            <path
                                                                className={`fill-current text-slate-400 ${(pathname === '/' || pathname.includes('dashboard')) && 'text-indigo-200'}`}
                                                                d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z"
                                                            />
                                                        </svg>
                                                        <span className="text-sm font-medium ml-3 2xl:opacity-100 duration-200">
                                                            Dashboard
                                                        </span>
                                                    </div>
                                                    {/* Icon */}
                                                    <div className="flex shrink-0 ml-2">
                                                        <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-companyL dark:text-companyD ${open && 'rotate-180'}`} viewBox="0 0 12 12">
                                                            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </a>
                                            <div className="2xl:block">
                                                <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                                                    <li className="mb-1 last:mb-0">
                                                        <NavLink
                                                            end
                                                            to="/"
                                                            className={({ isActive }) =>
                                                                'block text-companyL dark:text-companyD hover:text-companyL-200 hover:dark:text-companyD-200 transition duration-150 truncate ' + (isActive ? '!text-companyL-400' : '')
                                                            }
                                                        >
                                                            <span className="text-sm font-medium 2xl:opacity-100 duration-200">
                                                                Main
                                                            </span>
                                                        </NavLink>
                                                    </li>
                                                    <li className="mb-1 last:mb-0">
                                                        <NavLink
                                                            end
                                                            to="/my-number"
                                                            className={({ isActive }) =>
                                                                'block text-companyL dark:text-companyD hover:text-companyL-200 hover:dark:text-companyD-200 transition duration-150 truncate ' + (isActive ? '!text-companyL-400' : '')
                                                            }
                                                        >
                                                            <span className="text-sm font-medium 2xl:opacity-100 duration-200">
                                                                My Numbers
                                                            </span>
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            </div>
                                        </React.Fragment>
                                    );
                                }}
                            </SidebarLinkGroup>
                            {/* Communication */}
                            <SidebarLinkGroup activecondition={pathname.includes('community')}>
                                {(handleClick, open) => {
                                    return (
                                        <React.Fragment>
                                            <a
                                                href="#0"
                                                className={`block text-slate-200 hover:text-white truncate transition duration-150 ${pathname.includes('community') && 'hover:text-slate-200'
                                                    }`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                                                }}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                                                            <path
                                                                className={`fill-current text-slate-600 ${pathname.includes('community') && 'text-indigo-500'}`}
                                                                d="M18.974 8H22a2 2 0 012 2v6h-2v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5h-2v-6a2 2 0 012-2h.974zM20 7a2 2 0 11-.001-3.999A2 2 0 0120 7zM2.974 8H6a2 2 0 012 2v6H6v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5H0v-6a2 2 0 012-2h.974zM4 7a2 2 0 11-.001-3.999A2 2 0 014 7z"
                                                            />
                                                            <path
                                                                className={`fill-current text-slate-400 ${pathname.includes('community') && 'text-indigo-300'}`}
                                                                d="M12 6a3 3 0 110-6 3 3 0 010 6zm2 18h-4a1 1 0 01-1-1v-6H6v-6a3 3 0 013-3h6a3 3 0 013 3v6h-3v6a1 1 0 01-1 1z"
                                                            />
                                                        </svg>
                                                        <span className="text-sm font-medium ml-3 2xl:opacity-100 duration-200">
                                                            Communication
                                                        </span>
                                                    </div>
                                                    {/* Icon */}
                                                    <div className="flex shrink-0 ml-2">
                                                        <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-companyL dark:text-companyD ${open && 'rotate-180'}`} viewBox="0 0 12 12">
                                                            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </a>
                                            <div className="2xl:block">
                                                <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                                                    <li className="mb-1 last:mb-0">
                                                        <NavLink
                                                            end
                                                            to="/21"
                                                            className={({ isActive }) =>
                                                                'block text-companyL dark:text-companyD hover:text-companyL-200 hover:dark:text-companyD-200 transition duration-150 truncate ' + (isActive ? '!text-companyL-400' : '')
                                                            }
                                                        >
                                                            <span className="text-sm font-medium 2xl:opacity-100 duration-200">
                                                                Call Log
                                                            </span>
                                                        </NavLink>
                                                    </li>
                                                    <li className="mb-1 last:mb-0">
                                                        <NavLink
                                                            end
                                                            to="/22"
                                                            className={({ isActive }) =>
                                                                'block text-companyL dark:text-companyD hover:text-companyL-200 hover:dark:text-companyD-200 transition duration-150 truncate ' + (isActive ? '!text-companyL-400' : '')
                                                            }
                                                        >
                                                            <span className="text-sm font-medium 2xl:opacity-100 duration-200">
                                                                Messages
                                                            </span>
                                                        </NavLink>
                                                    </li>
                                                    <li className="mb-1 last:mb-0">
                                                        <NavLink
                                                            end
                                                            to="/23"
                                                            className={({ isActive }) =>
                                                                'block text-companyL dark:text-companyD hover:text-companyL-200 hover:dark:text-companyD-200 transition duration-150 truncate ' + (isActive ? '!text-companyL-400' : '')
                                                            }
                                                        >
                                                            <span className="text-sm font-medium 2xl:opacity-100 duration-200">
                                                                Phone Book
                                                            </span>
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            </div>
                                        </React.Fragment>
                                    );
                                }}
                            </SidebarLinkGroup>
                            {/* Shop */}
                            <SidebarLinkGroup activecondition={pathname.includes('ecommerce')}>
                                {(handleClick, open) => {
                                    return (
                                        <React.Fragment>
                                            <a
                                                href="#0"
                                                className={`block text-slate-200 hover:text-white truncate transition duration-150 ${pathname.includes('ecommerce') && 'hover:text-slate-200'
                                                    }`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                                                }}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                                                            <path
                                                                className={`fill-current text-slate-400 ${pathname.includes('ecommerce') && 'text-indigo-300'}`}
                                                                d="M13 15l11-7L11.504.136a1 1 0 00-1.019.007L0 7l13 8z"
                                                            />
                                                            <path
                                                                className={`fill-current text-slate-700 ${pathname.includes('ecommerce') && '!text-indigo-600'}`}
                                                                d="M13 15L0 7v9c0 .355.189.685.496.864L13 24v-9z"
                                                            />
                                                            <path
                                                                className={`fill-current text-slate-600 ${pathname.includes('ecommerce') && 'text-indigo-500'}`}
                                                                d="M13 15.047V24l10.573-7.181A.999.999 0 0024 16V8l-11 7.047z"
                                                            />
                                                        </svg>
                                                        <span className="text-sm font-medium ml-3 2xl:opacity-100 duration-200">
                                                            Shop
                                                        </span>
                                                    </div>
                                                    {/* Icon */}
                                                    <div className="flex shrink-0 ml-2">
                                                        <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-companyL dark:text-companyD ${open && 'rotate-180'}`} viewBox="0 0 12 12">
                                                            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </a>
                                            <div className="2xl:block">
                                                <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                                                    <li className="mb-1 last:mb-0">
                                                        <NavLink
                                                            end
                                                            to="/buy"
                                                            className={({ isActive }) =>
                                                                'block text-companyL dark:text-companyD hover:text-companyL-200 hover:dark:text-companyD-200 transition duration-150 truncate ' + (isActive ? '!text-companyL-400' : '')
                                                            }
                                                        >
                                                            <span className="text-sm font-medium 2xl:opacity-100 duration-200">
                                                                Buy Number
                                                            </span>
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            </div>
                                        </React.Fragment>
                                    );
                                }}
                            </SidebarLinkGroup>
                            {/* Finance */}
                            <SidebarLinkGroup activecondition={pathname.includes('finance')}>
                                {(handleClick, open) => {
                                    return (
                                        <React.Fragment>
                                            <a
                                                href="#0"
                                                className={`block text-slate-200 hover:text-white truncate transition duration-150 ${pathname.includes('finance') && 'hover:text-slate-200'
                                                    }`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                                                }}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                                                            <path
                                                                className={`fill-current text-slate-400 ${pathname.includes('finance') && 'text-indigo-300'}`}
                                                                d="M13 6.068a6.035 6.035 0 0 1 4.932 4.933H24c-.486-5.846-5.154-10.515-11-11v6.067Z"
                                                            />
                                                            <path
                                                                className={`fill-current text-slate-700 ${pathname.includes('finance') && '!text-indigo-500'}`}
                                                                d="M18.007 13c-.474 2.833-2.919 5-5.864 5a5.888 5.888 0 0 1-3.694-1.304L4 20.731C6.131 22.752 8.992 24 12.143 24c6.232 0 11.35-4.851 11.857-11h-5.993Z"
                                                            />
                                                            <path
                                                                className={`fill-current text-slate-600 ${pathname.includes('finance') && 'text-indigo-600'}`}
                                                                d="M6.939 15.007A5.861 5.861 0 0 1 6 11.829c0-2.937 2.167-5.376 5-5.85V0C4.85.507 0 5.614 0 11.83c0 2.695.922 5.174 2.456 7.17l4.483-3.993Z"
                                                            />
                                                        </svg>
                                                        <span className="text-sm font-medium ml-3 2xl:opacity-100 duration-200">
                                                            Finance
                                                        </span>
                                                    </div>
                                                    {/* Icon */}
                                                    <div className="flex shrink-0 ml-2">
                                                        <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-companyL dark:text-companyD ${open && 'rotate-180'}`} viewBox="0 0 12 12">
                                                            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </a>
                                            <div className="2xl:block">
                                                <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                                                    <li className="mb-1 last:mb-0">
                                                        <NavLink
                                                            end
                                                            to="/swap"
                                                            className={({ isActive }) =>
                                                                'block text-companyL dark:text-companyD hover:text-companyL-200 hover:dark:text-companyD-200 transition duration-150 truncate ' + (isActive ? '!text-companyL-400' : '')
                                                            }                                                        >
                                                            <span className="text-sm font-medium 2xl:opacity-100 duration-200">
                                                                Swap
                                                            </span>
                                                        </NavLink>
                                                    </li>
                                                    <li className="mb-1 last:mb-0">
                                                        <NavLink
                                                            end
                                                            to="/42"
                                                            className={({ isActive }) =>
                                                                'block text-companyL dark:text-companyD hover:text-companyL-200 hover:dark:text-companyD-200 transition duration-150 truncate ' + (isActive ? '!text-companyL-400' : '')
                                                            }                                                        >
                                                            <span className="text-sm font-medium 2xl:opacity-100 duration-200">
                                                                Transactions
                                                            </span>
                                                        </NavLink>
                                                    </li>
                                                    <li className="mb-1 last:mb-0">
                                                        <NavLink
                                                            end
                                                            to="/43"
                                                            className={({ isActive }) =>
                                                                'block text-companyL dark:text-companyD hover:text-companyL-200 hover:dark:text-companyD-200 transition duration-150 truncate ' + (isActive ? '!text-companyL-400' : '')
                                                            }                                                        >
                                                            <span className="text-sm font-medium 2xl:opacity-100 duration-200">
                                                                Balance
                                                            </span>
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            </div>
                                        </React.Fragment>
                                    );
                                }}
                            </SidebarLinkGroup>
                            {/* System Messages */}
                            <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('messages') && 'bg-slate-900'}`}>
                                <NavLink
                                    end
                                    to="/5"
                                    className={`block text-slate-200 hover:text-white truncate transition duration-150 ${pathname.includes('messages') && 'hover:text-slate-200'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="grow flex items-center">
                                            <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                                                <path
                                                    className={`fill-current text-slate-600 ${pathname.includes('messages') && 'text-indigo-500'}`}
                                                    d="M14.5 7c4.695 0 8.5 3.184 8.5 7.111 0 1.597-.638 3.067-1.7 4.253V23l-4.108-2.148a10 10 0 01-2.692.37c-4.695 0-8.5-3.184-8.5-7.11C6 10.183 9.805 7 14.5 7z"
                                                />
                                                <path
                                                    className={`fill-current text-slate-400 ${pathname.includes('messages') && 'text-indigo-300'}`}
                                                    d="M11 1C5.477 1 1 4.582 1 9c0 1.797.75 3.45 2 4.785V19l4.833-2.416C8.829 16.85 9.892 17 11 17c5.523 0 10-3.582 10-8s-4.477-8-10-8z"
                                                />
                                            </svg>
                                            <span className="text-sm font-medium ml-3 2xl:opacity-100 duration-200">
                                                System Messages
                                            </span>
                                        </div>
                                        {/* Badge */}
                                        <div className="flex flex-shrink-0 ml-2">
                                            <span className="inline-flex items-center justify-center h-5 text-xs font-medium text-white bg-companyL-400 px-2 rounded">4</span>
                                        </div>
                                    </div>
                                </NavLink>
                            </li>
                            {/* Settings */}
                            <SidebarLinkGroup activecondition={pathname.includes('settings')}>
                                {(handleClick, open) => {
                                    return (
                                        <React.Fragment>
                                            <a
                                                href="#0"
                                                className={`block text-slate-200 hover:text-white truncate transition duration-150 ${pathname.includes('settings') && 'hover:text-slate-200'
                                                    }`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                                                }}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                                                            <path
                                                                className={`fill-current text-slate-600 ${pathname.includes('settings') && 'text-indigo-500'}`}
                                                                d="M19.714 14.7l-7.007 7.007-1.414-1.414 7.007-7.007c-.195-.4-.298-.84-.3-1.286a3 3 0 113 3 2.969 2.969 0 01-1.286-.3z"
                                                            />
                                                            <path
                                                                className={`fill-current text-slate-400 ${pathname.includes('settings') && 'text-indigo-300'}`}
                                                                d="M10.714 18.3c.4-.195.84-.298 1.286-.3a3 3 0 11-3 3c.002-.446.105-.885.3-1.286l-6.007-6.007 1.414-1.414 6.007 6.007z"
                                                            />
                                                            <path
                                                                className={`fill-current text-slate-600 ${pathname.includes('settings') && 'text-indigo-500'}`}
                                                                d="M5.7 10.714c.195.4.298.84.3 1.286a3 3 0 11-3-3c.446.002.885.105 1.286.3l7.007-7.007 1.414 1.414L5.7 10.714z"
                                                            />
                                                            <path
                                                                className={`fill-current text-slate-400 ${pathname.includes('settings') && 'text-indigo-300'}`}
                                                                d="M19.707 9.292a3.012 3.012 0 00-1.415 1.415L13.286 5.7c-.4.195-.84.298-1.286.3a3 3 0 113-3 2.969 2.969 0 01-.3 1.286l5.007 5.006z"
                                                            />
                                                        </svg>
                                                        <span className="text-sm font-medium ml-3 2xl:opacity-100 duration-200">
                                                            Settings
                                                        </span>
                                                    </div>
                                                    {/* Icon */}
                                                    <div className="flex shrink-0 ml-2">
                                                        <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-companyL dark:text-companyD ${open && 'rotate-180'}`} viewBox="0 0 12 12">
                                                            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </a>
                                            <div className="2xl:block">
                                                <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                                                    <li className="mb-1 last:mb-0">
                                                        <NavLink
                                                            end
                                                            to="/61"
                                                            className={({ isActive }) =>
                                                                'block text-companyL dark:text-companyD hover:text-companyL-200 hover:dark:text-companyD-200 transition duration-150 truncate ' + (isActive ? '!text-companyL-400' : '')
                                                            }                                                         >
                                                            <span className="text-sm font-medium 2xl:opacity-100 duration-200">
                                                                My Account
                                                            </span>
                                                        </NavLink>
                                                    </li>
                                                    <li className="mb-1 last:mb-0">
                                                        <NavLink
                                                            end
                                                            to="/62"
                                                            className={({ isActive }) =>
                                                                'block text-companyL dark:text-companyD hover:text-companyL-200 hover:dark:text-companyD-200 transition duration-150 truncate ' + (isActive ? '!text-companyL-400' : '')
                                                            }                                                         >
                                                            <span className="text-sm font-medium 2xl:opacity-100 duration-200">
                                                                Base settings
                                                            </span>
                                                        </NavLink>
                                                    </li>
                                                    <li className="mb-1 last:mb-0">
                                                        <NavLink
                                                            end
                                                            to="/63"
                                                            className={({ isActive }) =>
                                                                'block text-companyL dark:text-companyD hover:text-companyL-200 hover:dark:text-companyD-200 transition duration-150 truncate ' + (isActive ? '!text-companyL-400' : '')
                                                            }                                                         >
                                                            <span className="text-sm font-medium 2xl:opacity-100 duration-200">
                                                                Advanced settings
                                                            </span>
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            </div>
                                        </React.Fragment>
                                    );
                                }}
                            </SidebarLinkGroup>

                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
                            <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">
                                •••
                            </span>
                            <span className="2xl:block">Account</span>
                        </h3>
                        <ul className="mt-3">
                            {/* Authentication */}
                            <SidebarLinkGroup>
                                {(handleClick, open) => {
                                    return (
                                        <React.Fragment>
                                            <a
                                                href="#0"
                                                className={`block text-slate-200 hover:text-white truncate transition duration-150 ${open && 'hover:text-slate-200'}`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                                                }}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                                                            <path className="fill-current text-slate-600" d="M8.07 16H10V8H8.07a8 8 0 110 8z" />
                                                            <path className="fill-current text-slate-400" d="M15 12L8 6v5H0v2h8v5z" />
                                                        </svg>
                                                        <span className="text-sm font-medium ml-3 2xl:opacity-100 duration-200">
                                                            Authentication
                                                        </span>
                                                    </div>
                                                    {/* Icon */}
                                                    <div className="flex shrink-0 ml-2">
                                                        <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-companyL dark:text-companyD ${open && 'rotate-180'}`} viewBox="0 0 12 12">
                                                            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </a>
                                            <div className="2xl:block">
                                                <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                                                    <li className="mb-1 last:mb-0">
                                                        <NavLink
                                                            end
                                                            to="/72"
                                                            className={({ isActive }) =>
                                                                'block text-companyL dark:text-companyD hover:text-companyL-200 hover:dark:text-companyD-200 transition duration-150 truncate ' + (isActive ? '!text-companyL-400' : '')
                                                            }  >
                                                            <span className="text-sm font-medium 2xl:opacity-100 duration-200">
                                                                Sign up
                                                            </span>
                                                        </NavLink>
                                                    </li>
                                                    <li className="mb-1 last:mb-0">
                                                        <NavLink
                                                            end
                                                            to="/73"
                                                            className={({ isActive }) =>
                                                                'block text-companyL dark:text-companyD hover:text-companyL-200 hover:dark:text-companyD-200 transition duration-150 truncate ' + (isActive ? '!text-companyL-400' : '')
                                                            }  >
                                                            <span className="text-sm font-medium 2xl:opacity-100 duration-200">
                                                                Reset Password
                                                            </span>
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            </div>
                                        </React.Fragment>
                                    );
                                }}
                            </SidebarLinkGroup>
                        </ul>
                    </div>
                </div>


                {/* Expand / collapse button */}
                {/* <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
                    // <div className="px-3 py-2">
                        <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
                            <span className="sr-only">Expand / collapse sidebar</span>
                            <svg className="w-6 h-6 fill-current sidebar-expanded:rotate-180" viewBox="0 0 24 24">
                                <path className="text-slate-400" d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z" />
                                <path className="text-slate-600" d="M3 23H1V1h2z" />
                            </svg>
                        </button>
                    </div>
                </div> */}
            </div>
        </div>
    );
}

export default Sidebar;
