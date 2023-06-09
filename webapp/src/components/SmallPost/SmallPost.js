import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

import styles from './SmallPost.module.css';
import ImageSlider from '../ImageSlider/ImageSlider';

export default function SmallPost(props) {

    const router = useRouter();
    const { _id: postId, title, body, imgList, tags, isPreview, searchText, setSearchText, handleSearch } = props;

    const [activeImg, setActiveImg] = useState(0);

    const handleClick = e => {
        e.preventDefault();

        router.push(`/p/${postId}`);
    }

    const bodyRef = useRef(null);
    const [isOverflow, setIsOverflow] = useState(false);

    useEffect(() => {
        if(body){
            const bodyEl = bodyRef.current;
            setIsOverflow(bodyEl.clientHeight < bodyEl.scrollHeight);
        }
    }, []);

    const handleClickTag = tag => {
        console.log(tag);

        // setSearchText(
        //     (searchText != '' ? `${searchText} ` : '') + `#${tag}`
        // );

        handleSearch(
            (searchText != '' ? `${searchText} ` : '') + `#${tag}`
        );
    }

    return (
        <div
            className={styles.main}
            onClick={handleClick}>
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
                                    className={styles.tag}
                                    onClick={e => {
                                        e.stopPropagation();
                                        e.preventDefault();

                                        handleClickTag(tag);
                                    }}>
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