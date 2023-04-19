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
            <div className={styles.post}>
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
                            img_container: styles.img_container,
                            active_img: styles.img,
                            img: styles.img,
                        }} />
                }
                {
                    post.tags?.length > 0 &&
                    <div className={styles.tags}>
                        {
                            post.tags.map((tag, i) => {
                                return (
                                    <div
                                        key={i.toString()}
                                        className={styles.tag}>
                                        <span className={styles.text}>{tag}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                }
            </div>
        </PageContainer>
    )
}