import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';

import styles from '@/styles/Home.module.css';

import PageContainer from '@/layout/PageContainer/PageContainer';
import SmallPost from '@/components/SmallPost/SmallPost';

export default function Home(props) {
	const [posts, setPosts] = useState([]);
	const [visiblePosts, setVisiblePosts] = useState([]);

	useEffect(() => {
		axios.get(`http://localhost:5000/post?sort=new`)
			.then(({ data }) => {
				setPosts(data);
				// console.log(data);
				setVisiblePosts(data);
			})
			.catch(err => console.log(err));
	}, []);

	const [searchText, setSearchText] = useState('');
	const [tags, setTags] = useState([]);

	return (
		<PageContainer>
			<div className={styles.search_container}>
				<div className={styles.fixed}>
					{
						tags.length > 0 &&
						<div className={styles.tags}>

						</div>
					}
					<input
						className={styles.search_input}
						value={searchText}
						onChange={e => {
							setSearchText(e.target.value);
						}}
						placeholder='Search Home' />
				</div>
			</div>
			{
				visiblePosts.map((post, i) => {
					return (
						<SmallPost
							key={i.toString()}
							{...post} />
					)
				})
			}
		</PageContainer>
	)
}