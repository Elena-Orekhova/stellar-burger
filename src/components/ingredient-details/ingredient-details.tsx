import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { RootState } from '../../services/store';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const ingredientData = useSelector(
    (state: RootState) => state.ingredients.ingredients
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  const selectedIngredient = ingredientData.find(
    (ingredient) => ingredient._id === id
  );

  if (!selectedIngredient) {
    return <div>Ингредиент не найден</div>;
  }

  return <IngredientDetailsUI ingredientData={selectedIngredient} />;
};
