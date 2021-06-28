/* eslint-disable @next/next/no-img-element */
import Cookie from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { DataContext } from '../store/GlobalState'

const Navbar = () => {
    const router = useRouter()
    
    const [state , dispatch] = useContext(DataContext)

    const { auth } = state

    const isActive = (r) => {
        if( r=== router.pathname ){
            return " active"
        }else{
            return ""
        }
    }

    const handleLogout = () => {
        Cookie.remove('refreshtoken' , {path: 'api/auth/accessToken'})
        localStorage.removeItem('firstLogin')
        dispatch({ type: 'AUTH' , payload: {}})
        dispatch({ type: 'NOTIFY' ,  payload: {success: 'Logged out!'}})
    }

    const loggedRouter = () => {
        return(
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img src={auth.user.avatar} alt={auth.user.name}  
                style={{
                        borderRadius: '50%', width: '30px', height: '30px',
                        transform: 'translateY(-3px)', marginRight: '3px'
                    }}/ >
                {auth.user.name} <br></br>        
                Menu
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <Link href='#'>
                            <a className="dropdown-item" >Profile</a>
                    </Link>
                    <Link href='#'>
                            <a className="dropdown-item" onClick={handleLogout} >Logout</a>
                    </Link>
                </div>
        </li>
        )
    }

    return (
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
           <Link href='/'>
                <a className="navbar-brand" href="#">Sky Sea</a>
           </Link>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                <ul className="navbar-nav">

                <li className="nav-item active">
                   <Link href='/cart'>
                        <a className={"nav-link" + isActive('/cart')}> <i className="fas fa-shopping-cart" aria-hidden="true"></i> Cart </a>
                   </Link>
                </li>

                {
                    Object.keys(auth).length === 0 ?
                    <li className="nav-item active">
                    <Link href='/signin'>
                         <a className={"nav-link" + isActive('/signin')}> <i className="fas fa-user" aria-hidden="true"></i> Sign in </a>
                    </Link>
                 </li> 
                 : loggedRouter()
                }

                </ul>
            </div>
        </nav>
        </div>
    )
}

export default Navbar