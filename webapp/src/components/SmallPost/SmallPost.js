import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

import styles from './SmallPost.module.css';
import ImageSlider from '../ImageSlider/ImageSlider';

export default function SmallPost(props) {

    const router = useRouter();
    const { _id: postId, title, body, imgList, tags, isPreview } = props;

    const [activeImg, setActiveImg] = useState(0);

    const handleClick = e => {
        e.preventDefault();
    }

    const handleScrollLeft = e => {
        e.stopPropagation();
        e.preventDefault();

        let newIndex = activeImg == 0 ? imgList.length - 1 : activeImg - 1;
        setActiveImg(newIndex);
    }
    const handleScrollRight = e => {
        e.stopPropagation();
        e.preventDefault();

        let newIndex = activeImg == imgList.length - 1 ? 0 : activeImg + 1;
        setActiveImg(newIndex);
    }

    const bodyRef = useRef(null);
    const [isOverflow, setIsOverflow] = useState(false);

    useEffect(() => {
        if(body){
            const bodyEl = bodyRef.current;
            setIsOverflow(bodyEl.clientHeight < bodyEl.scrollHeight);
        }
    }, []);
    return (
        <div
            className={styles.main}
            onClick={e => {
                router.push(`/p/${postId}`);
            }}>
            <div className={styles.title}>{title}</div>
            {
                body &&
                <div className={styles.body} ref={bodyRef}>
                    {isOverflow && <div className={styles.fade_container}></div>}
                    {body}
                </div>
            }
            {
                imgList.length > 0 &&
                <ImageSlider
                    imgList={imgList}
                    customStyle={{
                        img_slider: styles.img_slider,
                        active_img: styles.img,
                        img: styles.img,
                    }} />
            }
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