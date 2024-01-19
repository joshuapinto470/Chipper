import React from 'react'
import { Link } from 'react-router-dom'

/* eslint-disable react/prop-types */
const Nav = ({ Icon, Heading, to }) => {
    return (
        <Link 
            to={to}
            className="mt-1 group flex items-center px-5 py-5 text-base leading-6 font-semibold rounded-lg shadow-custom hover:text-blue-500">
            {Icon}
            {Heading}
        </Link>
    )
}

export default Nav