import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BsHexagonHalf, BsFillHouseFill, BsFillSendFill } from 'react-icons/bs';

import styles from './LeftSidebar.module.css';

export default function LeftSidebar(props) {
    const router = useRouter();

    const [links, setLinks] = useState([
        { href: '/', title: 'Home', Icon: BsFillHouseFill },
        { href: '/post', title: 'Post', Icon: BsFillSendFill },
    ]);

    useEffect(() => {

    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <div className={styles.logo}>
                    <BsHexagonHalf
                        className={styles.icon} 
                        color='rgb(45, 148, 45)'/>
                    ShareWithMe
                </div>
                <button className={styles.login_btn}>
                    Login
                </button>
                <div className={styles.links}>
                    {
                        links.map((l, i) => {
                            const { href, title, Icon } = l;

                            return (
                                <div
                                    key={i.toString()}
                                    className={styles.link_container}
                                    onClick={e => {
                                        router.push(href);
                                    }}>
                                    <div className={`${styles.active_container} ${router.pathname == href ? styles.active : ''}`}>
                                        <Icon
                                            className={styles.icon} 
                                            color='black'/>
                                        {title}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}