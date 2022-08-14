import React, { useState, useEffect } from 'react'
import LogoutIcon from '../svg/Logout'
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useStoreActions } from 'easy-peasy'
import ListIcon from 'svg/List';
import UserIcon from 'svg/User';


const linkList = [
    {
        title: 'Overview',
        link: '/overview',
        icon: <ListIcon className="my-auto h-5 w-5 " />,
    },
    {
        title: 'Profile',
        link: '/profile',
        icon: <UserIcon className="my-auto h-5 w-5 " />,
    }
]

export default function Navbar() {
    const location = useLocation();
    const history = useHistory();
    const { setLogout } = useStoreActions((state) => state);
    const [currentLocation, setCurrentLocation] = useState('')

    // Kalo ada pengen nambahin navbar list baru
    useEffect(() => {
        if (!currentLocation.includes(location.pathname))
            setCurrentLocation(location.pathname)
    }, [location, currentLocation])

    const logoutHandler = () => {
        setLogout()
        history.push('/login')
    }
    return (
        <nav className="shadow relative top-0 z-10 flex h-20 justify-between bg-white text-sm">
            <div className="relative mt-4 ml-8 hidden w-1/3 xl:block">
                <img src="https://fintech.id/storage/files/shares/logo/logofi2/paperid.png" alt="logo-company" className='w-38 h-14' />
            </div>
            {/* logo only when resized */}
            <div className="mt-5 ml-8 mr-4 block w-1/3 xl:hidden">
                <img src="https://fintech.id/storage/files/shares/logo/logofi2/paperid.png" alt="logo-company" className='w-38 h-14' />
            </div>
            <div
                className="py-auto flex flex-row whitespace-nowrap"
                style={{ minWidth: '800px' }}
            >
                <ul className="px-auto flex w-full flex-row justify-center space-x-20">
                    {linkList.map((el) => (
                        <li
                            key={el.title}
                            className={`${currentLocation.includes(el.link)
                                ? 'border-b border-black'
                                : ''
                                } flex`}
                        >
                            <Link
                                to={el.link}
                                className="hover:text-blue-ribbon transition my-auto mx-6 flex flex-row duration-300 ease-in-out items-center"
                            >
                                {el.icon}
                                <span className="ml-4 text-md">{el.title}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mr-10 flex w-1/3 justify-end whitespace-nowrap">
                <div
                    onClick={logoutHandler}
                    className="flex cursor-pointer p-6"
                >
                    <LogoutIcon />
                </div>
            </div>
        </nav>
    )
};