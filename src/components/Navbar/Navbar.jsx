import React, { useContext } from 'react'
import './Navbar.scss'
import { NavLink } from 'react-router-dom'
import { GiEntryDoor } from 'react-icons/gi'
import { MdDashboard, MdLogin, MdUpload } from 'react-icons/md'
import Logo from '../../images/logo.png'
import { UserContext } from '../UserContext'
import { useLocation } from 'react-router-dom'

const Navbar = () => {
    const { user, setUser } = useContext(UserContext);

    const location = useLocation()
    const pathname = location.pathname.split('/')[1]

    return (
        <div className="Navbar">
            <h1><NavLink to='/'><img src={Logo} alt="" /> Finalyze</NavLink></h1>
            <div className="nav-links">
                {pathname === "upload" ? null :
                    <>
                        <NavLink to='/demo'>Demo <GiEntryDoor /></NavLink>
                        <NavLink to='/upload'>Upload <MdUpload /></NavLink>
                    </>
                }
            </div>
            <div className="actions">
                {
                    user ?
                        <NavLink to='/login'>Login <MdLogin /></NavLink>
                        :
                        <NavLink to='/dashboard' className='dash'><MdDashboard /></NavLink>
                }
            </div>
        </div>
    )
}

export default Navbar