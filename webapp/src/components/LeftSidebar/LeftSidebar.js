import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BsHexagonHalf, BsFillHouseFill, BsFillSendFill, BsFillInfoCircleFill } from 'react-icons/bs';

import styles from './LeftSidebar.module.css';
import LoginModal from '../LoginModal/LoginModal';

function LinkContainer(props) {
    const [isHover, setIsHover] = useState(false);

    const { href, title, Icon, router } = props;

    const [isActive, setIsActive] = useState(false);
    useEffect(() => {
        setIsActive(router.pathname == href);
    }, [router]);

    return (
        <div
            className={styles.link_container}
            onClick={e => {
                router.push(href);
            }}
            onMouseEnter={e => {
                setIsHover(true);
            }}
            onMouseLeave={e => {
                setIsHover(false);
            }}>
            <div className={`${styles.active_container} ${isActive ? styles.active : ''} ${isHover ? styles.hover : ''}`}>
                <Icon
                    className={styles.icon}
                    color={isActive ? 'white' : 'black'} />
                {title}
            </div>
        </div>
    )
}

export default function LeftSidebar(props) {
    const router = useRouter();

    const [links, setLinks] = useState([
        { href: '/', title: 'Home', Icon: BsFillHouseFill },
        { href: '/post', title: 'Post', Icon: BsFillSendFill },
        { href: '/about', title: 'About', Icon: BsFillInfoCircleFill },
    ]);

    useEffect(() => {

    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <div className={styles.logo}>
                    <BsHexagonHalf
                        className={styles.icon}
                        color='rgb(45, 148, 45)' />
                    ShareWithMe
                </div>
                <div className={styles.links}>
                    {
                        links.map((l, i) => {
                            const { href, title, Icon } = l;

                            const isActive = router.pathname == href;
                            return (
                                <LinkContainer
                                    key={i.toString()}
                                    {...l}
                                    router={router} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}