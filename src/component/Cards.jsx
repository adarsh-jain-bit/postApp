import React, { useEffect, useState } from 'react';
import SingleCard from './SingleCard';
import ErrorPage from './ErrorPage';
import { Pagination, Stack } from '@mui/material';
import Loading from './Skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { allPost } from '../utils/dataSlice';
import { v4 as uuidv4 } from 'uuid';
const Cards = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;
  const dispatch = useDispatch();
  
  const post = useSelector((state) => state.post.data);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (post.length === 0) {
      setCurrentPage(1);
    } else if (currentPage > Math.ceil(post.length / cardsPerPage)) {
      setCurrentPage(Math.ceil(post.length / cardsPerPage));
    }
  }, [post ]);



  const fetchData = async () => {
    setLoading(true);
    try {
      setTimeout(async () => {
        const response = await fetch(
          `https://raw.githubusercontent.com/SauravKanchan/NewsAPI/master/everything/bbc-news.json`
        );
        const data1 = await response.json();
        console.log(data1)
       const posts =  data1.articles.map(article => ({ ...article, id: uuidv4() }));
       console.log(posts)
          dispatch(allPost(posts));
          setError('');
        setLoading(false);
      }, 2000);
    } catch (err) {
      console.error(err);
      setError('Something went wrong!');
      setLoading(false);
    }
  };

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = post.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(post.length / cardsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorPage error={error} />
      ) : (
        <>
          <SingleCard data={currentCards} />
          <Stack direction="row" justifyContent="center" spacing={2} marginTop={2}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Stack>
        </>
      )}
    </div>
  );
};

export default Cards;
