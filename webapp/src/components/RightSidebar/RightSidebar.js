import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from './RightSidebar.module.css';

export default function RightSidebar(props) {
    const router = useRouter();

    useEffect(() => {

    }, []);

    return (
        <div className={styles.main}>
            
        </div>
    )
}