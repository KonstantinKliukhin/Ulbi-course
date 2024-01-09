import { type FC } from 'react';
import { Button } from '@/shared/ui';
import { useDispatch, useSelector } from 'react-redux';
import { counterActions } from '../../model/slice/counterSlice';
import { getCounterValue } from '../../model/selectors/getCounterValue/getCounterValue';
import { useTranslation } from 'react-i18next';

export const Counter: FC = () => {
  const { t, } = useTranslation();
  const dispatch = useDispatch();
  const counterValue = useSelector(getCounterValue);
  const decrement = () => {
    dispatch(counterActions.decrement());
  };

  const increment = () => {
    dispatch(counterActions.increment());
  };

  return (
    <div>
      <h1 data-testid="value-title">{counterValue}</h1>
      <Button onClick={increment} data-testid="increment-btn">{t('increment')}</Button>
      <Button onClick={decrement} data-testid="decrement-btn">{t('decrement')}</Button>
    </div>
  );
};
