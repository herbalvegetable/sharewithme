import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { BsThreeDots, BsThreeDotsVertical } from 'react-icons/bs';
import { signOut } from 'next-auth/react';

import styles from './RightSidebar.module.css';

import LoginModal from '../LoginModal/LoginModal';
import Auth from '../Auth/Auth';

export default function RightSidebar(props) {
    const router = useRouter();

    const [modalOpen, setModalOpen] = useState(false);

    const [authSession, setAuthSession] = useState({});
    const [authStatus, setAuthStatus] = useState('');

    useEffect(() => {
        console.log('Session: ', authSession);
        console.log('User: ', authSession?.user);
        console.log('Status: ', authStatus);
    }, [authSession, authStatus]);


    const handleAuthSession = session => {
        setAuthSession(session);
    }
    const handleAuthStatus = status => {
        setAuthStatus(status);
    }

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const [profileActions, setProfileActions] = useState([
        {
            title: 'Profile',
            handleClick: e => {
                //go to profile
            },
        },
        {
            title: 'Logout',
            handleClick: e => {
                signOut();
            },
        },
    ]);

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                {
                    authStatus == 'authenticated' && authSession?.user ?

                    <>
                        <div 
                            className={`${styles.profile} ${dropdownOpen ? styles.open : ''}`}
                            onClick={e => {
                                setDropdownOpen(!dropdownOpen);
                            }}>
                            <div className={styles.img_container}>
                                <Image
                                    width='50'
                                    height='50'
                                    src={authSession.user.image}
                                    alt='Profile Picture'
                                    className={styles.img} />
                            </div>
                            <div className={styles.name}>{authSession?.user?.name}</div>
                            <div className={`${styles.dropdown_toggle}`}>
                                {
                                    dropdownOpen ? 

                                    <BsThreeDotsVertical color='gray' className={styles.icon}/>

                                    :

                                    <BsThreeDots color='gray' className={styles.icon}/>
                                }
                            </div>
                        </div>
                        {
                            dropdownOpen && 
                            <div className={styles.dropdown}>
                                {
                                    profileActions.map((action, i) => {
                                        return (
                                            <div
                                                key={i.toString()} 
                                                className={styles.item}
                                                onClick={action.handleClick}>
                                                {action.title}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        }
                    </>

                    : authStatus == 'unauthenticated' ?

                    <>
                        <button
                            className={styles.login_btn}
                            onClick={e => {
                                setModalOpen(true);
                            }}>
                            Login
                        </button>
                        <LoginModal
                            isOpen={modalOpen}
                            setModalOpen={setModalOpen} />
                    </>

                    : authStatus == 'loading' ?

                    <span>Loading</span>

                    :

                    null
                }
                <Auth handleAuthSession={handleAuthSession} handleAuthStatus={handleAuthStatus} />
            </div>
        </div>
    )
}