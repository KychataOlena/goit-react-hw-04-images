import React, { Component } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Modal } from '../Modal/Modal';
import { Wrapper } from './App.styled';
import { Button } from '../Button/Button';
import { Loader } from 'components/Loader/Loader';

const API_KEY = '33394453-d5a8c72f7be6b764d04762919';

export class App extends Component {
  state = {
    searchName: '',
    page: 1,
    items: [],
    loading: false,
    showModal: false,
    modalImg: '',
  };

  handleSubmit = searchName => {
    this.setState({ searchName });
    this.setState({ page: 1 });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  componentDidUpdate(_, prevState) {
    const { page, searchName } = this.state;

    if (prevState.page !== page || prevState.searchName !== searchName) {
      this.setState({ loading: true });

      fetch(
        ` https://pixabay.com/api/?q=${searchName}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => res.json())
        .then(items => {
          const ApiArray = items.hits;
          // console.log(ApiArray.largeImageURL);
          if (page === 1) {
            this.setState({ items: ApiArray });
          } else {
            this.setState(prevState => ({
              items: [...prevState.items, ...ApiArray],
            }));
          }
        })
        .finally(() => this.setState({ loading: false }));
    }
  }

  toggleModal = largeImageURL => {
    this.setState(({ showModal, modalImg }) => ({
      showModal: !showModal,
      modalImg: largeImageURL,
    }));
  };

  // selectesImg = largeImageURL => {
  //   this.setState({
  //     modalImg: largeImageURL,
  //   });
  // };

  render() {
    const { items, loading, showModal, modalImg } = this.state;
    console.log(items.length > 11);

    return (
      <Wrapper>
        <Searchbar onSubmit={this.handleSubmit} />

        {items && (
          <ImageGallery
            onClick={this.toggleModal}
            items={items}
            // selectesImg={this.selectesImg}
          />
        )}
        {showModal && (
          <Modal
            onClose={this.toggleModal}
            onClick={modalImg}
            // largeImageURL={items.largeImageURL}
          />
        )}

        <ToastContainer autoClose={3000} theme="colored" />
        {loading && <Loader />}
        {items.length > 11 && <Button onLoadMore={this.loadMore} />}
      </Wrapper>
    );
  }
}
