import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import ImageResults from '../image/ImageResults';

class Search extends Component {
  state = {
    searchText: '',
    amount: 12,
    apiUrl: 'https://pixabay.com/api',
    apiKey: '15721916-2d3f7a785fb313e2f707fe5d7',
    images: []
  };

  onTextChange = e => {
    const val = e.target.value;
    this.setState({ [e.target.name]: val }, () => {
      if (val === '') {
        this.setState({ images: [] });
      } else {
        axios
          .get(
            `${this.state.apiUrl}/?key=${this.state.apiKey}&q=${
              this.state.searchText
            }&image_type=photo&per_page=${this.state.amount}&safesearch=true`
          )
          .then((result) => this.setState({ images: result.data.hits }))
          .catch((error) => console.log(error));
      }
    });
  };

  onAmountChange = (e, index, value) => this.setState({ amount: value });

  render() {
    console.log(this.state.images);
    return (
      <div>
        <TextField
          name="searchText"
          value={this.state.searchText}
          onChange={this.onTextChange}
          floatingLabelText="Wpisz czego potrzebujesz"         
          fullWidth={true}
        />
        <br />
        <SelectField
          name="amount"
          floatingLabelText="Ilość zdjęć"
          value={this.state.amount}
          onChange={this.onAmountChange}
          fullWidth={true}
          
        >
          <MenuItem value={12} primaryText="12" />
          <MenuItem value={24} primaryText="24" />
          <MenuItem value={36} primaryText="36" />
          <MenuItem value={48} primaryText="48" />
          <MenuItem value={60} primaryText="60" />
        </SelectField>
        <br />
        {this.state.images.length > 0 ? (
          <ImageResults images={this.state.images} />
        ) : null}
      </div>
    );
  }
}

export default Search;
