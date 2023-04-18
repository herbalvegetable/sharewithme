import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

import styles from './ImageSlider.module.css';

export default function ImageSlider(props) {

    const { imgList, customStyle = {} } = props;

    const [activeImg, setActiveImg] = useState(0);
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

    const [isHover, setIsHover] = useState(false);

    return (
        <div
            className={`${styles.main} ${customStyle.img_slider || ''}`}
            onMouseEnter={e => setIsHover(true)}
            onMouseLeave={e => setIsHover(false)}>
            {
                imgList.map((img, i) => {
                    return (
                        <div
                            key={i.toString()}
                            className={`${styles.img_container} ${customStyle.img_container || ''}`}>
                            <Image
                                className={`${activeImg == i ? `${styles.active_img} ${customStyle.active_img || ''}` : `${styles.img} ${customStyle.img || ''}`}`}
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
                    {
                        isHover &&
                        <>
                            <div
                                className={styles.left_arrow}
                                onClick={handleScrollLeft}>
                                <div className={styles.highlight}>
                                    <BsArrowLeft
                                        color='white'
                                        className={styles.icon} />
                                </div>
                            </div>
                            <div
                                className={styles.right_arrow}
                                onClick={handleScrollRight}>
                                <div className={styles.highlight}>
                                    <BsArrowRight
                                        color='white'
                                        className={styles.icon} />
                                </div>
                            </div>
                        </>
                    }
                    <div className={styles.img_counter}>
                        {activeImg + 1}/{imgList.length}
                    </div>
                </>
            }
        </div>
    )
}