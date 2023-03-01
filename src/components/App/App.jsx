import React, { useEffect, useState } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Modal } from '../Modal/Modal';
import { Wrapper } from './App.styled';
import { Button } from '../Button/Button';
import { Loader } from 'components/Loader/Loader';

const API_KEY = '33394453-d5a8c72f7be6b764d04762919';

// const fetchImage = ({ searchName ='', page=1 })=>{
//   return
//    .get( ` https://pixabay.com/api/?q=${searchName}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`),

//   .then(res => res.json())
// };

export function App() {
  const [searchName, setSearchName] = useState('');
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState('');

  const handleSubmit = e => {
    setSearchName(e);
    setPage(1);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    if (searchName === '') {
      return;
    }

    setLoading(true);
    fetch(
      ` https://pixabay.com/api/?q=${searchName}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(res => res.json())
      .then(items => {
        const ApiArray = items.hits;
        // console.log(ApiArray.largeImageURL);
        if (page === 1) {
          setItems(ApiArray);
        } else {
          setItems(prevState => [...prevState, ...ApiArray]);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page, searchName]);

  const toggleModal = largeImageURL => {
    setModalImg(largeImageURL);
    setShowModal(!showModal);
  };

  return (
    <Wrapper>
      <Searchbar onSubmit={handleSubmit} />
      {items.length > 0 && (
        <ImageGallery
          onClick={toggleModal}
          items={items}
          // selectesImg={selectesImg}
        />
      )}
      {showModal && (
        <Modal
          onClose={toggleModal}
          onClick={modalImg}
          // largeImageURL={items.largeImageURL}
        />
      )}
      <ToastContainer autoClose={3000} theme="colored" />
      {loading && <Loader />}
      {items.length > 11 && <Button onLoadMore={loadMore} />}
    </Wrapper>
  );
}
