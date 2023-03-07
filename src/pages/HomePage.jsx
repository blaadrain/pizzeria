import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Pizza from '../components/Pizza';
import PizzaSkeleton from '../components/UI/PizzaSkeleton';
import { changeCategoryId } from '../store/slices/filterSlice';

const Home = ({ searchValue }) => {
  const dispatch = useDispatch();

  const [items, setItems] = React.useState([]);
  const [isItemsLoading, setIsItemsLoading] = React.useState(true);

  const { categoryId, sortBy } = useSelector((state) => state.filters);

  const onChangeCategory = (id) => {
    dispatch(changeCategoryId(id));
  };

  React.useEffect(() => {
    setIsItemsLoading(true);

    const categoryParam = categoryId ? `categories=${categoryId}` : '';
    const sortParam = `sortBy=${
      sortBy.name === 'rating' ? sortBy.name + '&order=desc' : sortBy.name
    }`;
    const params = `?${categoryParam}&${sortParam}`;

    axios
      .get(
        `https://6403a6883bdc59fa8f2a61db.mockapi.io/pizzeria_items${params}`
      )
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => console.warn(err))
      .finally(() => setIsItemsLoading(false));

    window.scrollTo(0, 0);
  }, [categoryId, sortBy]);

  const pizzas = items
    .filter((pizza) =>
      pizza.title.toLowerCase().includes(searchValue.toLowerCase())
    )
    .map((pizza) => (
      <Pizza
        key={pizza.id}
        {...pizza}
      />
    ));
  const skeletons = [...new Array(6)].map((_, i) => {
    return <PizzaSkeleton key={i} />;
  });

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          id={categoryId}
          onChangeCategory={onChangeCategory}
        />
        <Sort />
      </div>
      <h1 className="content__title">Все пиццы</h1>
      <h2 className="content__description">
        Внимание - акция! Только сегодня, <b>каждая</b> пицца идет за полцены!
        Добавьте любую понравишуюся пиццу в корзину, где она автоматически
        получит 50% скидку.
      </h2>
      <div className="content__items">
        {isItemsLoading ? skeletons : pizzas}
        {!pizzas.length && <h3>Ничего не найдено :(</h3>}
      </div>
    </div>
  );
};

export default Home;
