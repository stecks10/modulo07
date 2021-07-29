import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MdAddShoppingCart } from 'react-icons/md';
import { formatPrice } from '../../util/format';
import api from '../../services/api';
import {
  fifa,
  mario,
  warfare,
  wwii,
  horizon,
  mortal,
  witcher,
  darknessshard,
  sombras,
} from "../../assets";

import * as CartActions from '../../store/modules/cart/actions';

import { ProductList } from './styles';

class Home extends Component {
  state = {
    products: [],
  }

  async componentDidMount() {
    const response = await api.get('products');

    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));

    this.setState({ products: data })
  }

  handleAddProduct = id => {
    const { addToCartRequest } = this.props;

    addToCartRequest(id);
  };

  render() {
    const { products } = this.state;
    const { amount } = this.props;

    function handleImagePath(image) {
      if (image === "super-mario-odyssey.png") return mario;
      if (image === "call-of-duty-infinite-warfare.png") return warfare;
      if (image === "fifa-18.png") return fifa;
      if (image === "call-of-duty-wwii.png") return wwii;
      if (image === "horizon-zero-dawn.png") return horizon;
      if (image === "mortal-kombat-xl.png") return mortal;
      if (image === "the-witcher-iii-wild-hunt.png") return witcher;
      if (image === "shards-of-darkness.png") return darknessshard;
      if (image === "terra-media-sombras-de-mordor.png") return sombras;
    }

    return (
      <ProductList>
        {products.map(product => (
          <li key={product.name}>
          <img src={handleImagePath(product.image)} alt={product.name} />
            <strong>{product.name}</strong>
            <span>{product.priceFormatted}</span>

            <button
              type="button"
              onClick={() => this.handleAddProduct(product.id)}
            >
              <div>
                <MdAddShoppingCart size={16} color="#fff" />
                {amount[product.id] || 0}
              </div>

              <span>ADICIONAR AO CARRINHO</span>
            </button>
          </li>
        ))}
      </ProductList>
    );
  }
}

const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;

    return amount;
  }, {}),
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps,
  mapDispatchToProps
)(Home);
