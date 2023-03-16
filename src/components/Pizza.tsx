import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem, CartItemType } from '../store/slices/cartSlice';
import JSConfetti from 'js-confetti';
import { Link } from 'react-router-dom';

const jsConfetti = new JSConfetti();

type PizzaProps = {
  id: string;
  title: string;
  prices: number[];
  imageUrl: string;
  types: number[];
  sizes: string[];
  categories: number[];
  rating: number;
};

const Pizza: React.FC<PizzaProps> = ({
  id,
  title,
  prices,
  imageUrl,
  types,
  sizes,
}) => {
  const dispatch = useDispatch();
  // Пример реализации сложного селектора
  // const cartItem = useSelector(selectCartItemById(id));
  // const addedCount = cartItem ? cartItem.count : 0;

  const [typeId, setTypeId] = React.useState<number>(0);
  const [sizeId, setSizeId] = React.useState<number>(0);

  const onClickAdd = () => {
    const item: CartItemType = {
      id,
      title,
      price: prices[sizeId],
      imageUrl,
      typeId,
      sizeId,
      count: 0,
    };
    jsConfetti.addConfetti({
      emojis: ['🥳', '🥰', '🤗'],
    });
    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link to={`/pizza/${id}`}>
          <img
            className="pizza-block__image"
            src={imageUrl}
            alt="Pizza"
          />
        </Link>
        <div className="pizza-block__title">
          <h4>{title}</h4>
        </div>
        <div className="pizza-block__selector">
          <ul>
            {types.map((type, i) => (
              <li
                key={i}
                className={i === typeId ? 'active' : ''}
                onClick={() => setTypeId(i)}
              >
                {type === 0 ? 'Тонкое' : 'Традиционное'}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, i) => (
              <li
                key={i}
                className={i === sizeId ? 'active' : ''}
                onClick={() => setSizeId(i)}
              >
                {size}
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {prices[sizeId]} ₽</div>
          <button
            className="button button--outline button--add"
            onClick={onClickAdd}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pizza;
