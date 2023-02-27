import PropTypes from 'prop-types';
import { Component } from 'react';
import { toast } from 'react-toastify';
import { GoSearch } from 'react-icons/go';
import {
  SearchForm,
  SearchFormInput,
  SearchbarHeader,
  FormButton,
} from './Searchbar.stuyled';

export class Searchbar extends Component {
  state = {
    searchName: '',
  };

  handleNameChange = event => {
    this.setState({
      searchName: event.currentTarget.value.toLowerCase(),
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.searchName.trim() === '') {
      toast.error('Заповніть форму');
      return;
    }
    this.props.onSubmit(this.state.searchName);
    this.setState({
      searchName: '',
      page: 1,
      items: [],
    });
    event.target.reset();
  };
  render() {
    return (
      <SearchbarHeader class="searchbar">
        <SearchForm onSubmit={this.handleSubmit}>
          <FormButton type="submit">
            <GoSearch />
            {/* <span class="button-label">Search</span> */}
          </FormButton>

          <SearchFormInput
            class="input"
            name=" searchName"
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
            value={this.state.searchName}
            onChange={this.handleNameChange}
          />
        </SearchForm>
      </SearchbarHeader>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
