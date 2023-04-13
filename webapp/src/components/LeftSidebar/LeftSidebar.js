import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from './LeftSidebar.module.css';

export default function LeftSidebar(props) {
    const router = useRouter();

    const [links, setLinks] = useState([
        { href: '/', title: 'Home' },
        { href: '/post', title: 'Post' },
    ]);

    useEffect(() => {

    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <div className={styles.logo}>
                    ShareWithMe
                </div>
                <button className={styles.login_btn}>
                    Login
                </button>
                <div className={styles.links}>
                    {
                        links.map((l, i) => {
                            const { href, title } = l;

                            return (
                                <div
                                    key={i.toString()}
                                    className={`${styles.link_container} ${router.pathname == href ? styles.active : ''}`}
                                    onClick={e => {
                                        router.push(href);
                                    }}>
                                    {title}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}