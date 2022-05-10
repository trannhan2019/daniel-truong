import { useReducer } from 'react';

const initState = 0;
const reducer = (state, action) => {
  switch (action) {
    case 'add':
      return state + 1;
    case 'sub':
      return state - 1;
    case 'reset':
      return 0;
    default:
      throw new Error('Loi...');
  }
};
const Reducer = () => {
  const [number, dispatch] = useReducer(reducer, initState);
  return (
    <>
      <h3>Vi du ve useContext</h3>
      <button onClick={() => dispatch('add')}>+</button>
      <hr />
      {number}
      <hr />
      <button onClick={() => dispatch('sub')}>+</button>
      <hr />
      <button onClick={() => dispatch('reset')}>Reset</button>
    </>
  );
};

export default Reducer;
