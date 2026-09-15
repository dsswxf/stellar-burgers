import ingredientsReducer, { fetchIngredients } from '../ingredientsSlice';
import { TIngredient } from '@utils-types';

describe('ingredientsSlice reducer', () => {
  const initialState = {
    items: [],
    isLoading: false,
    error: null
  };

  const mockIngredients: TIngredient[] = [
    {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    }
  ];

  it('should return the initial state with unknown action', () => {
    expect(ingredientsReducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      initialState
    );
  });

  it('should handle fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const expectedState = {
      ...initialState,
      isLoading: true,
      error: null
    };
    expect(ingredientsReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle fetchIngredients.fulfilled', () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const expectedState = {
      ...initialState,
      isLoading: false,
      items: mockIngredients
    };
    expect(
      ingredientsReducer({ ...initialState, isLoading: true }, action)
    ).toEqual(expectedState);
  });

  it('should handle fetchIngredients.rejected', () => {
    const error = new Error('Network error');
    const action = {
      type: fetchIngredients.rejected.type,
      error: error
    };
    const expectedState = {
      ...initialState,
      isLoading: false,
      error: 'Network error'
    };
    expect(
      ingredientsReducer({ ...initialState, isLoading: true }, action)
    ).toEqual(expectedState);
  });
});
