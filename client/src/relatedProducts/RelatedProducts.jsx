import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import CarouselWrapper from './CarouselWrapper.jsx';
import RelatedCarousel from './RelatedCarousel.jsx';
import OutfitCarousel from './OutfitCarousel.jsx';

class RelatedProductsWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedProductsData: {},
      isLoading: true
    };
  }

  //get list of related products using productId prop
  getRelatedProducts() {
    let product_id = this.props.product_id;
    axios.get(`/api/products/${product_id}/related`, {
      params: {
        product_id: {product_id}
      }
    }).then(({data}) => {
      return Promise.all(data.map((id) => {
        return this.getProductData(id);
      }));
    }).then(() => {
      this.setState({
        isLoading: false
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  //get data for an individual product
  //to be added to product card
  getProductData(id) {
    return axios.get(`/api/products/${id}`, {
      params: {
        product_id: id
      }
    }).then(({data}) => {
      var oldProductData = this.state.relatedProductsData;
      oldProductData[data.id] = data;
      this.setState({
        relatedProductsData: oldProductData
      });
    });
  }

  componentDidMount() {
    this.getRelatedProducts();
  }

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = () => {
      return;
    };
  }

  render() {
    if (this.state.isLoading) {
      return <div>RELATED LOADING</div>;
    }
    return (
      <div>
        <CarouselWrapper
          name='Related Products'
          data={this.state.relatedProductsData}
          render={(data) => {
            return <RelatedCarousel
              data={data}
              currentProduct={this.props.product}/>;
          }}/>
        <CarouselWrapper
          name='Your Outfit'
          data={{}}
          render={(data) => {
            return <OutfitCarousel
              currentProduct={this.props.product}
              data={data} />;
          }} />
      </div>
    );
  }
}

RelatedProductsWrapper.propTypes = {
  product_id: PropTypes.number,
  product: PropTypes.object
};

export default RelatedProductsWrapper;
