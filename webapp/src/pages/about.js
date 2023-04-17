import React, { useState, useEffect } from 'react';

import styles from '@/styles/About.module.css';

import PageContainer from '@/layout/PageContainer/PageContainer';

export default function About(props) {

    useEffect(() => {

    }, []);

    return (
        <PageContainer>
            <h2>About</h2>
            <p>ShareWithMe is a social media platform, designed for users to share information and media related to any topic they desire.</p>
            <p>
                Developer: Ben Aw Yong<br />
                GitHub: <a href='https://github.com/herbalvegetable' target="_blank">https://github.com/herbalvegetable</a><br />
                LinkedIn: <a href='https://www.linkedin.com/in/ben-aw-yong-0173201a8/' target="_blank">https://www.linkedin.com/in/ben-aw-yong-0173201a8/</a>
            </p>

        </PageContainer>
    )
}