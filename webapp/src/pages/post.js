import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { BsPlus, BsUpload, BsX } from 'react-icons/bs';
import Image from 'next/image';

import styles from '@/styles/PostCreate.module.css';

import PageContainer from '@/layout/PageContainer/PageContainer';
import SmallPost from '@/components/SmallPost/SmallPost';

export default function Post(props) {

    const router = useRouter();

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [imgList, setImgList] = useState([]);

    const [canPost, setCanPost] = useState(false);
    useEffect(() => {
        setCanPost(title && body);
    }, [title, body]);

    // useEffect(() => {
    //     if(title || body || imgList.length > 0){
    //         return () => {
    //             console.log({title, body, imgList});
    //             confirm('Changes you made may not be saved.');
    //         }
    //     }
    // }, [title, body, imgList]);

    // useEffect(() => {
    //     router.beforePopState(({url, as, options}) => {
    //         console.log('before pop state');
    //         if(title || body || imgList.length > 0){
    //             return confirm('Unsaved changes will be lost.');
    //         }
    //         return true;
    //     })
    // }, [router]);

    const handlePost = e => {
        e.preventDefault();
        setPristine();

        const postData = { title, body, imgList: imgList.map(img => img.data) };

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

    const fileInputRef = useRef();

    return (
        <PageContainer>
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
                placeholder='Body' />

            <label
                htmlFor='img-upload'
                className={styles.img_upload}>
                <BsUpload
                    className={styles.icon}
                    color='black' />
                Upload
            </label>
            <input
                // key={Math.floor(Math.random() * 10000).toString()}
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
                            currImgList.push({
                                data: reader.result,
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

            <div className={imgList.length > 0 ? styles.img_grid : styles.img_grid_empty}>
                {
                    imgList.length > 0 ?

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

                        :

                        <div className={styles.text}>Uploaded images will appear here</div>
                }
            </div>

            {
                (title || body || imgList.length > 0) &&
                <>
                    <hr className={styles.divider} />

                    <div className={styles.preview}>
                        <div className={styles.text}>
                            Preview Post
                        </div>
                        <SmallPost
                            title={title}
                            body={body}
                            imgList={imgList.map(img => img.data)} />
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


        </PageContainer>
    )
}