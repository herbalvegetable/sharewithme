import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { AiOutlineSearch } from 'react-icons/ai';

import styles from '@/styles/Home.module.css';

import PageContainer from '@/layout/PageContainer/PageContainer';
import SmallPost from '@/components/SmallPost/SmallPost';
import AppContext from '@/components/AppContext/AppContext';

export default function Home(props) {
	const ctx = useContext(AppContext);

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

		console.log('CONTEXT: ', ctx.nameContext);
	}, []);

	const [searchText, setSearchText] = useState('');

	useEffect(() => {
		if(searchText == ''){
			handleSearch();
		}
	}, [searchText]);

	const handleSearch = (searchValue) => {

		if(searchValue){
			setSearchText(searchValue.trim());
		}
		else{
			searchValue = searchText.trim().toLowerCase();
		}

		console.log(`SEARCHVALUE: "${searchValue}"`, searchValue == '');

		if(searchValue == ''){
			setVisiblePosts([...posts]);
			return;
		}

		console.log(searchValue);

		const words = searchValue.split(' ');
		let tags = [], terms = [];

		for (let word of words) {
			if (word.startsWith('#')) {
				tags.push(word.replaceAll('#', ''));
			}
			else {
				terms.push(word);
			}
		}

		const filteredPosts = [...posts].filter(post => {

			return terms.every(term => {
				// console.log(post.title, term.toLowerCase(), post.title.includes(term.toLowerCase()));

				return post.title.includes(term.toLowerCase());
			}) && // term match title
				tags.every(tag => {
					console.log(post.tags, tag.toLowerCase(), post.tags.includes(tag.toLowerCase()));

					return post.tags.includes(tag.toLowerCase());
				}) // tag match
		});

		console.log(filteredPosts);

		setVisiblePosts(filteredPosts);
	}

	return (
		<PageContainer>
			<div className={styles.top_container}>
				<div className={styles.fixed}>
					<div className={styles.search_container}>
						<div
							className={styles.search_enter}
							onClick={e => {
								e.preventDefault();
								handleSearch();
							}}>
							<AiOutlineSearch
								className={styles.icon}
								// color='rgb(50, 50, 50)' 
								color='gray'
							/>
						</div>
						<input
							className={styles.search_input}
							value={searchText}
							onChange={e => {
								setSearchText(e.target.value);
							}}
							onKeyDown={e => {
								if (['Enter'].includes(e.key)) {
									handleSearch();
								}
							}}
							placeholder='Search Home' />
					</div>
				</div>
			</div>
			{
				visiblePosts.length > 0 ?

				visiblePosts.map((post, i) => {
					return (
						<SmallPost
							key={i.toString()}
							{...post} 
							searchText={searchText}
							setSearchText={setSearchText}
							handleSearch={handleSearch}/>
					)
				})

				:

				<div className={styles.no_results}>
					No results, try searching for something else.
				</div>
			}
		</PageContainer>
	)
}