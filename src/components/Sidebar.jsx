import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import ManageIcon from 'svg/ManageIcon';
import RegisterIcon from 'svg/RegisterIcon';
import ConfigureIcon from 'svg/ConfigureIcon';

const SideNavbar = ({ navs }) => {
    const location = useLocation();

    const icons = {
        manage: <ManageIcon className="w-5 h-5 my-auto mr-2" />,
        register: <RegisterIcon className="w-5 h-5 my-auto mr-2" />,
        configure: <ConfigureIcon className="w-5 h-5 my-auto mr-2" />,
    };

    return (
        <div className="relative px-3 py-4 shadow border-r border-gray-400 h-full bg-white overflow-x-hidden" style={{ width: '250px' }}>
            <div className="flex flex-col gap-3">
                {navs.map((n) => (
                    <div key={n.title}>
                        <p className="text-lg font-medium pl-3 mt-8">{n.title}</p>
                        {n.links.map((l) => (
                            <Link to={l.link} key={l.name}>
                                <div className={`flex flex-row hover:bg-gray-300 rounded py-2 px-3 ${location.pathname.includes(l.link) ? 'bg-gray-200' : ''}`}>
                                    {icons[l.name.toLowerCase()]}
                                    {l.name}
                                </div>
                            </Link>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

SideNavbar.propTypes = {
    navs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SideNavbar;
