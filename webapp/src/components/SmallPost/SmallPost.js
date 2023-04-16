import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

import styles from './SmallPost.module.css';

export default function SmallPost(props) {

    const router = useRouter();
    const { title, body, imgList, tags, isPreview } = props;

    const [activeImg, setActiveImg] = useState(0);

    const handleClick = e => {
        e.preventDefault();
    }

    const handleScrollLeft = e => {
        e.preventDefault();

        let newIndex = activeImg == 0 ? imgList.length - 1 : activeImg - 1;
        setActiveImg(newIndex);
    }
    const handleScrollRight = e => {
        e.preventDefault();

        let newIndex = activeImg == imgList.length - 1 ? 0 : activeImg + 1;
        setActiveImg(newIndex);
    }

    return (
        <div className={styles.main}>
            <div className={`${styles.content} ${imgList.length > 0 ? styles.img : styles.text}`}>
                <div className={styles.text_content}>
                    <div className={styles.title}>{title}</div>
                    <div className={styles.body}>{body}</div>
                </div>
                {
                    imgList.length > 0 &&
                    <div className={styles.img_slider}>
                        {
                            imgList.map((img, i) => {
                                return (
                                    <div
                                        key={i.toString()}
                                        className={styles.img_container}>
                                        <Image
                                            className={`${styles.img} ${activeImg == i ? styles.active : ''}`}
                                            src={img}
                                            width={100}
                                            height={100}
                                            alt='Image' />
                                    </div>
                                )
                            })
                        }
                        {
                            imgList.length > 1 &&
                            <>
                                <div
                                    className={styles.left_arrow}
                                    onClick={handleScrollLeft}>
                                    <BsArrowLeft
                                        color='white'
                                        className={styles.icon} />
                                </div>
                                <div
                                    className={styles.right_arrow}
                                    onClick={handleScrollRight}>
                                    <BsArrowRight
                                        color='white'
                                        className={styles.icon} />
                                </div>
                                <div className={styles.img_counter}>
                                    {activeImg + 1}/{imgList.length}
                                </div>
                            </>
                        }
                    </div>

                }
            </div>
            {
                tags.length > 0 &&
                <div className={styles.tags}>
                    {
                        tags.map((tag, i) => {
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
    )
}