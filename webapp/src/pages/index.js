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
		axios.get('http://localhost:5000/post')
			.then(({ data }) => {
				setPosts(data);
				setVisiblePosts(data);
			})
			.catch(err => console.log(err));
	}, []);

	return (
		<PageContainer>
			<div className={styles.center}>
				{
					visiblePosts.map((post, i) => {
						return (
							<SmallPost 
								key={i.toString()}
								{...post}/>
						)
					})
				}
			</div>
		</PageContainer>
	)
}
