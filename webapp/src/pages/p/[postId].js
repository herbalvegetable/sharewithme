import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Image from 'next/image';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

import styles from '@/styles/PostExpand.module.css';

import PageContainer from '@/layout/PageContainer/PageContainer';
import ImageSlider from '@/components/ImageSlider/ImageSlider';

export default function PostExpand(props) {
    const router = useRouter();
    const { postId } = router.query;

    const [post, setPost] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:5000/post?id=${postId}`)
            .then(({ data }) => {
                setPost(data);
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    return (
        <PageContainer>
            <div className={styles.title}>
                {post.title}
            </div>
            <div className={styles.body}>
                {post.body}
            </div>
            {
                post.imgList?.length > 0 &&
                <ImageSlider 
                    imgList={post.imgList}
                    customStyle={{
                        img_slider: styles.img_slider,
                        active_img: styles.img,
                        img: styles.img,
                    }}/>
            }
        </PageContainer>
    )
}