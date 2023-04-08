import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import styles from './SmallPost.module.css';

export default function SmallPost(props) {

    const router = useRouter();
    const { title, body, imgBase64 } = props;

    useEffect(() => {
        
    }, []);

    const handleClick = e => {
        e.preventDefault();
    }

    return (
        <div className={styles.main}>
            <div className={styles.title}>{title}</div>
            <div className={styles.body}>{body}</div>
        </div>
    )
}