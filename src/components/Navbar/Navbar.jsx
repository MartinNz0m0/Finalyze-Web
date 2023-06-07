import React, { useContext, useState } from 'react'
import './Navbar.scss'
import { NavLink } from 'react-router-dom'
import { GiEntryDoor } from 'react-icons/gi'
import { MdArrowDropDown, MdArrowDropUp, MdDashboard, MdLogin, MdUpload } from 'react-icons/md'
import Logo from '../../images/logo.png'
import { UserContext } from '../UserContext'
import { useLocation } from 'react-router-dom'

const Navbar = (props) => {
    const { user, setUser } = useContext(UserContext);
    const [show, setShow] = useState(false)
    const location = useLocation()
    const pathname = location.pathname.split('/')[1]

    const rtnclick = () => {
        window.location.reload()
    };

    return (
        <div className="Navbar">
            <h1><NavLink to='/'><img src={Logo} alt="" /> Finalyze</NavLink></h1>
            <div className="nav-links">
                {pathname === "upload" ? null :
                    <>
                        {!user && <NavLink to='/demo'>Demo <GiEntryDoor /></NavLink>}
                        <NavLink to='/upload'>Upload <MdUpload /></NavLink>
                    </>
                }
            </div>
            <div className="actions">
                {
                    user ?
                        <>
                            {pathname === "dashboard" ?
                                <button
                                    type="button"
                                    onClick={rtnclick}
                                >
                                    Back to dashboard
                                </button>
                                :
                                <NavLink to='/dashboard' className='dash'>Dashboard <MdDashboard /></NavLink>}
                        </>
                        :
                        <NavLink to='/login'>Login <MdLogin /></NavLink>
                }
            </div>
            <div className="phone-bar">
                {!show ? <MdArrowDropDown id='drop' onClick={() => setShow(true)} /> :
                    <MdArrowDropUp id='up' onClick={() => setShow(false)} />}
                {show ? <div className="drop-down">
                    <div className="phone-links">
                        {pathname === "upload" ? null :
                            <>
                                {!user && <NavLink to='/demo'>Demo <GiEntryDoor /></NavLink>}
                                <NavLink to='/upload'>Upload <MdUpload /></NavLink>
                            </>
                        }
                    </div>
                    <div className="phone-actions">
                        {
                            user ?
                                <>
                                    {pathname === "dashboard" ?
                                        <button
                                            type="button"
                                            onClick={rtnclick}
                                        >
                                            Back to dashboard
                                        </button>
                                        :
                                        <NavLink to='/dashboard' className='dash'>Dashboard <MdDashboard /></NavLink>}
                                </>
                                :
                                <NavLink to='/login'>Login <MdLogin /></NavLink>
                        }
                    </div>
                </div>
                    :
                    null
                }
            </div>
        </div>
    )
}

export default Navbar