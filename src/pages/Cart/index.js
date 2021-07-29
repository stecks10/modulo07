import React from 'react';
import { connect } from 'react-redux';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete
} from 'react-icons/md';

import { formatPrice } from '../../util/format';
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

import { Container, ProductTable, Total } from './styles';

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

import { bindActionCreators } from 'redux';

function Cart({ cart, total, removeFromCart, updateAmountRequest }) {
  function increment(product) {
    updateAmountRequest(product.id, product.amount + 1);
  }

  function decrement(product) {
    updateAmountRequest(product.id, product.amount - 1);
  }

  function CalculateFrete(total, cart) {
    if (total * cart >= 250 ) return "Frete gratís";


    return formatPrice(cart * 10);
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th />
            <th>Frete</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {cart.map(product => (
            <tr>
              <td>
              <img src={handleImagePath(product.image)} alt={product.name} />
              </td>
              <td>
                <strong>{product.name}</strong>
                <span>{product.priceFormatted}</span>
              </td>
              <td>
                <div>
                  <button type="button" onClick={() => decrement(product)}>
                    <MdRemoveCircleOutline size={20} color="#7159c1" />
                  </button>
                  <input type="number" readOnly value={product.amount} />
                  <button type="button" onClick={() => increment(product)}>
                    <MdAddCircleOutline size={20} color="#7159c1" />
                  </button>
                </div>
              </td>
              <td>
                <strong>{product.subtotal}</strong>

              </td>
              <td>

                <button
                  type="button"
                  onClick={() =>
                    removeFromCart(product.id)}>
                  <MdDelete size={20} color="#7159c1" />
                </button>
              </td>
              <td>
                <section>{CalculateFrete(product.price, product.amount)}</section>
                </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>

      <footer>
        <button type="button">Finalizar pedido</button>

        <Total>
          <span>TOTAL</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
}

const mapStateToProps = state => ({
  cart: state.cart.map(product => ({
    ...product,
    subtotal: formatPrice(product.price * product.amount),
  })),
  total: formatPrice(state.cart.reduce((total, product) => {
    return total + product.price * product.amount;
  }, 0)),
  frete: formatPrice()
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
