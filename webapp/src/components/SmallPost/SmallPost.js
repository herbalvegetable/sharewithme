import React, { useState, useEffect, useRef, useContext } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import axios from 'axios';
import parse from 'html-react-parser';

import styles from './SmallPost.module.css';
import ImageSlider from '../ImageSlider/ImageSlider';

export default function SmallPost(props) {

    const router = useRouter();
    const { _id: postId, user, title, body, imgList, tags, isPreview, searchText, setSearchText, handleSearch } = props;

    const [activeImg, setActiveImg] = useState(0);

    const handleClick = e => {
        e.preventDefault();

        router.push(`/p/${postId}`);
    }

    const bodyRef = useRef(null);
    const [isOverflow, setIsOverflow] = useState(false);

    const [author, setAuthor] = useState({});

    useEffect(() => {
        if (body) {
            const bodyEl = bodyRef.current;
            setIsOverflow(bodyEl.clientHeight < bodyEl.scrollHeight);
        }

        console.log('SMALLPOST USERID: ', user);
        if (user) {
            axios.get(`http://localhost:5000/login?user=${user}`)
                .then(({ data }) => {
                    console.log('SMALLPOST USER: ', data);
                    setAuthor(data);
                })
                .catch(err => console.log(err));
        }

        // TODO: show user information on top of each smallpost
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
            {
                author ?

                <div className={styles.author}>
                    <div className={styles.img_wrapper}>
                        <Image
                            width='50'
                            height='50'
                            src={author.img}
                            alt='Profile Image'
                            className={styles.img} />
                    </div>
                    <div className={styles.username}>{author.username}</div>
                </div>

                :

                null
            }
            <div className={styles.title}>{title}</div>
            {
                body &&
                <div className={`${styles.body} ${isPreview ? styles.preview : ''}`} ref={bodyRef}>
                    {isOverflow && <div className={styles.fade_container}></div>}
                    {parse(body)}
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