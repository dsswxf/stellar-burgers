import constructorReducer, {
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} from '../constructorSlice';
import { TConstructorIngredient, TIngredient } from '@utils-types';

describe('burgerConstructor reducer', () => {
  const initialState = {
    bun: null,
    ingredients: []
  };

  const mockBun: TIngredient = {
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
  };

  const mockIngredient1: TIngredient = {
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
  };

  const mockIngredient2: TIngredient = {
    _id: '643d69a5c3f7b9001cfa093e',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
  };

  it('should return the initial state with unknown action', () => {
    expect(constructorReducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      initialState
    );
  });

  it('should handle addBun', () => {
    const action = addBun(mockBun);
    const expectedState = {
      bun: action.payload, // the prepare function generates the payload
      ingredients: []
    };
    expect(constructorReducer(initialState, action)).toEqual(expectedState);
    expect(action.payload).toHaveProperty('id');
    expect(action.payload.name).toEqual(mockBun.name);
  });

  it('should handle addIngredient', () => {
    const action = addIngredient(mockIngredient1);
    const expectedState = {
      bun: null,
      ingredients: [action.payload]
    };
    expect(constructorReducer(initialState, action)).toEqual(expectedState);
    expect(action.payload).toHaveProperty('id');
    expect(action.payload.name).toEqual(mockIngredient1.name);
  });

  it('should handle removeIngredient', () => {
    const startingState = {
      bun: null,
      ingredients: [
        { ...mockIngredient1, id: 'test-id-1' },
        { ...mockIngredient2, id: 'test-id-2' }
      ]
    };
    const expectedState = {
      bun: null,
      ingredients: [{ ...mockIngredient2, id: 'test-id-2' }]
    };
    expect(
      constructorReducer(startingState, removeIngredient('test-id-1'))
    ).toEqual(expectedState);
  });

  it('should handle moveIngredient', () => {
    const startingState = {
      bun: null,
      ingredients: [
        { ...mockIngredient1, id: 'test-id-1' }, // index 0
        { ...mockIngredient2, id: 'test-id-2' } // index 1
      ]
    };
    const expectedState = {
      bun: null,
      ingredients: [
        { ...mockIngredient2, id: 'test-id-2' }, // moved to index 0
        { ...mockIngredient1, id: 'test-id-1' } // moved to index 1
      ]
    };
    expect(
      constructorReducer(
        startingState,
        moveIngredient({ fromIndex: 0, toIndex: 1 })
      )
    ).toEqual(expectedState);
  });

  it('should handle clearConstructor', () => {
    const startingState = {
      bun: { ...mockBun, id: 'test-bun' },
      ingredients: [{ ...mockIngredient1, id: 'test-id-1' }]
    };
    expect(constructorReducer(startingState, clearConstructor())).toEqual(
      initialState
    );
  });
});
