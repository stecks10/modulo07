import styled from 'styled-components';
import { darken } from 'polished';

export const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 100px;
  list-style: none;

  li {
    display: flex;
    margin-top: 50px;
    flex-direction: column;
    background: #fff;
    border-radius: 10px;
    padding: 20px;

    img {
      align-self: center;
      max-width: 200px;
      height: 200px;
      align-items: center;
    }

    > strong {
      font-size: 16px;
      line-height: 20px;
      color: #333;
      margin-top: 5px;
    }

    > span {
      font-size: 21px;
      font-weight: bold;
      margin: 5px 0 20px;
    }

    button {
      background: #7159c1;
      color: #fff;
      border: 0;
      border-radius: 4px;
      overflow: hidden;
      margin-top: auto;
      font-size: medium;

      display: flex;
      align-items: center;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.3, '#7159c1')};
      }

      div {
        display: flex;
        align-items: center;
        padding: 12px;
        background: rgba(0, 0, 0, 0.1);

        svg {
          margin-right: 10px;
        }
      }

      span {
        flex: 1;
        text-align: center;

        font-weight: bold;
      }
    }
  }
`;
