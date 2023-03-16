import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Pizza from '../components/Pizza';
import PizzaSkeleton from '../components/UI/PizzaSkeleton';

import { useDispatch, useSelector } from 'react-redux';
import { changeCategoryId, selectFilters } from '../store/slices/filterSlice';
import { fetchItems, selectPizzas } from '../store/slices/pizzasSlice';

const HomePage: React.FC = () => {
  const dispatch = useDispatch();

  const { categoryId, sortBy, searchValue } = useSelector(selectFilters);
  const { items, status } = useSelector(selectPizzas);

  const onChangeCategory = (id: number) => {
    dispatch(changeCategoryId(id));
  };

  React.useEffect(() => {
    async function fetchPizzas() {
      const categoryParam = categoryId ? `categories=${categoryId}` : '';
      const sortParam = `sortBy=${
        sortBy.name === 'rating' ? sortBy.name + '&order=desc' : sortBy.name
      }`;
      const params = `?${categoryParam}&${sortParam}`;

      // @ts-ignore
      dispatch(fetchItems(params));

      window.scrollTo(0, 0);
    }

    fetchPizzas();
  }, [categoryId, sortBy]);

  const pizzas = items
    .filter((pizza: any) =>
      pizza.title.toLowerCase().includes(searchValue.toLowerCase())
    )
    .map((pizza: any) => (
      <Pizza
        key={pizza.id}
        {...pizza}
      />
    ));

  const skeletons = [...new Array(6)].map((_, i) => {
    return (
      <PizzaSkeleton
        key={i}
        styles={{ width: '100%' }}
      />
    );
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
      {/* <h2 className="content__description">
        Внимание - акция! Только сегодня, <b>каждая</b> пицца идет за полцены!
        Добавьте любую понравишуюся пиццу в корзину, где она автоматически
        получит 50% скидку.
      </h2> */}
      <div className="content__items">
        {status === 'loading' ? skeletons : pizzas}
        {!pizzas.length && <h3>Ничего не найдено :(</h3>}
      </div>
    </div>
  );
};

export default HomePage;
