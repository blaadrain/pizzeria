import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PizzaPage: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    prices: number[];
  }>();

  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://6403a6883bdc59fa8f2a61db.mockapi.io/pizzeria_items/${id}`
        );
        setPizza(data);
      } catch (error) {
        console.error(error);
        alert('Ошибка при получении пиццы');
        navigate('/');
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="pizza-page">
      <h2>{pizza.title}</h2>
      <img
        src={pizza.imageUrl}
        style={{ width: '300px' }}
        alt="pizza"
      />
      <p>Цена: {pizza.prices.join(' / ')}</p>
    </div>
  );
};

export default PizzaPage;
