import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { BsPlus } from 'react-icons/bs';

import styles from '@/styles/PostCreate.module.css';

import PageContainer from '@/layout/PageContainer/PageContainer';

export default function Post(props) {

    const router = useRouter();

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [imgBase64, setImgBase64] = useState('')

    useEffect(() => {

    }, []);

    const handlePost = e => {
        e.preventDefault();

        const postData = { title, body, imgBase64 };

        axios.post('http://localhost:5000/post', postData)
            .then(res => {
                console.log(res.status);

                setTitle('');
                setBody('');
                setImgBase64('');

                router.push('/');
            })
            .catch(err => console.log(err));
    }

    return (
        <PageContainer>
            <div className={styles.center}>
                <input
                    className={styles.title}
                    type='text'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder='Title' />
                <textarea
                    className={styles.body}
                    rows={25}
                    cols={50}
                    value={body}
                    onChange={e => setBody(e.target.value)}
                    placeholder='Body' />
                <button
                    className={styles.post_btn}
                    onClick={handlePost}>
                    Post
                </button>
            </div>
        </PageContainer>
    )
}