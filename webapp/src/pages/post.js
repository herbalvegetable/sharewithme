import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { BsPlus, BsUpload, BsX } from 'react-icons/bs';
import Image from 'next/image';

import styles from '@/styles/PostCreate.module.css';

import PageContainer from '@/layout/PageContainer/PageContainer';
import SmallPost from '@/components/SmallPost/SmallPost';

function Tag(props) {
    const { tag, tagIndex, handleRemoveTag } = props;

    const [isHover, setIsHover] = useState(false);

    return (
        <div
            className={styles.tag}>
            <span className={styles.text}>{tag}</span>
            <div
                className={styles.delete_container}
                onClick={e => handleRemoveTag(tagIndex)}
                onMouseEnter={e => setIsHover(true)}
                onMouseLeave={e => setIsHover(false)}>
                <BsX
                    className={styles.icon}
                    color={isHover ? 'red' : 'black'} />
            </div>
        </div>
    )
}

function NormalPostType(props) {

    const router = useRouter();

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [imgList, setImgList] = useState([]);
    const [currTag, setCurrTag] = useState('');
    const [tags, setTags] = useState([]);

    const [canPost, setCanPost] = useState(false);

    useEffect(() => {
        setCanPost(title != '');
    }, [title]);

    const handlePost = e => {
        e.preventDefault();

        const postData = {
            title,
            body,
            imgList: imgList.map(img => img.data),
            tags,
        };

        axios.post('http://localhost:5000/post', postData)
            .then(res => {
                console.log(res.status);

                setTitle('');
                setBody('');
                setImgList([]);

                router.push('/');
            })
            .catch(err => console.log(err));
    }

    const handleRemoveTag = tagIndex => {
        let newTags = [...tags];
        newTags.splice(tagIndex, 1);
        setTags(newTags);
    }

    const fileInputRef = useRef();

    return (
        <>
            <input
                className={styles.title}
                type='text'
                value={title}
                onChange={e => {
                    setTitle(e.target.value);
                }}
                placeholder='Title' />
            <textarea
                className={styles.body}
                rows={10}
                cols={50}
                value={body}
                onChange={e => {
                    setBody(e.target.value);
                }}
                placeholder='Body (optional)' />

            <div className={styles.img_grid}>
                {
                    imgList.map((img, i) => {
                        return (
                            <div
                                key={i.toString()}
                                className={styles.img_container}
                                onMouseEnter={e => {
                                    let newImgList = [...imgList];
                                    newImgList[i].isHover = true;
                                    setImgList(newImgList);
                                }}
                                onMouseLeave={e => {
                                    let newImgList = [...imgList];
                                    newImgList[i].isHover = false;
                                    setImgList(newImgList);
                                }}
                                onClick={e => {
                                    let newImgList = [...imgList];
                                    newImgList.splice(i, 1);
                                    setImgList(newImgList);
                                }}>
                                <Image
                                    className={styles.img}
                                    src={img.data}
                                    width={100}
                                    height={100}
                                    alt='Image' />
                                {
                                    imgList[i].isHover &&
                                    <div className={styles.delete_container}>
                                        <BsX
                                            className={styles.icon}
                                            color='white' />
                                    </div>
                                }
                            </div>
                        )
                    })
                }
                <label
                    htmlFor='img-upload'
                    className={styles.img_upload}
                    title='Upload Media'>
                    <BsUpload
                        className={styles.icon}
                        color='black' />
                </label>
                <input
                    className={styles.file_input}
                    ref={fileInputRef}
                    type='file'
                    id='img-upload'
                    accept="image/png, image/jpeg"
                    multiple
                    onChange={e => {
                        const files = e.target.files;

                        const currImgList = [...imgList];

                        for (let i = 0; i < files.length; i++) {
                            const file = files[i];

                            const reader = new FileReader();
                            reader.readAsDataURL(file);

                            // after reader returns base64 output
                            reader.onload = () => {
                                // console.log(reader.result);

                                // var aspectRatio;

                                // var img = new Image();
                                // img.src = reader.result;
                                // img.onload = () => {
                                //     aspectRatio = this.width / this.height;
                                // }

                                currImgList.push({
                                    data: reader.result,
                                    // aspectRatio: ,
                                    isHover: false,
                                });

                                if (i >= files.length - 1) {
                                    setImgList(currImgList);
                                    e.target.value = '';
                                }
                            }
                            reader.onerror = err => console.log(err);

                            console.log(file);
                        }
                    }}
                />
            </div>

            <div className={styles.tags_container}>
                {
                    tags.length > 0 &&
                    <div className={styles.tags}>
                        {
                            tags.map((tag, i) => {
                                return (
                                    <Tag
                                        key={i.toString()}
                                        tag={tag}
                                        tagIndex={i}
                                        handleRemoveTag={handleRemoveTag} />
                                )
                            })
                        }
                    </div>
                }
                <input
                    type='text'
                    className={styles.input}
                    value={currTag}
                    onChange={e => {
                        setCurrTag(e.target.value.trim().toLowerCase());
                    }}
                    placeholder={tags.length > 0 ? '' : 'Tags'}
                    onKeyDown={e => {
                        if (['Enter', ',', ' '].includes(e.key) &&
                            currTag &&
                            !currTag.includes(' ') &&
                            !tags.includes(currTag)) {

                            setTags([...tags, currTag]);
                            setCurrTag('');
                        }
                        if (['Backspace'].includes(e.key) && currTag == '') {
                            let newTags = [...tags];
                            newTags.pop();
                            setTags(newTags);
                        }
                    }} />
            </div>

            {
                canPost &&
                <>
                    <hr className={styles.divider} />

                    <div className={styles.preview}>
                        <div className={styles.text}>
                            Preview Post
                        </div>
                        <SmallPost
                            title={title}
                            body={body}
                            imgList={imgList.map(img => img.data)}
                            tags={tags}
                            isPreview />
                    </div>

                    <hr className={styles.divider} />
                </>
            }

            <button
                className={`${styles.post_btn} ${!canPost ? styles.disabled : ''}`}
                onClick={handlePost}
                disabled={!canPost}>
                Post
            </button>
        </>
    )
}

export default function Post(props) {

    const [postTypeIndex, setPostTypeIndex] = useState(1);
    const POSTTYPES = [
        { type: 'normal', title: 'Post', PostType: <NormalPostType /> },
        { type: 'emoji_board', title: 'Board', PostType: null },
    ];

    return (
        <PageContainer>

            <div className={styles.post_types}>
                {
                    POSTTYPES.map((postType, i) => {
                        return (
                            <div
                                key={i.toString()}
                                className={`${styles.type} ${i == postTypeIndex ? styles.active : ''}`}
                                onClick={e => {
                                    setPostTypeIndex(i);
                                }}>
                                {postType.title}
                            </div>
                        )
                    })
                }
            </div>

            {POSTTYPES[postTypeIndex].PostType}

        </PageContainer>
    )
}