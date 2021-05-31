import { updateQuantity } from '../slices/basketSlice';
import { useDispatch } from 'react-redux';

function QuantityCount({
  setQuantity,
  quantity = 1,
  dispatch = false,
  id = null,
}) {
  const newDispatch = useDispatch();

  const increaseCount = () => {
    setQuantity(quantity + 1);
    updateQuantityHere(quantity + 1);
  };

  const decreaseCount = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      updateQuantityHere(quantity - 1);
    }
  };

  const updateQuantityHere = (count) => {
    if (dispatch) {
      const product = { id, quantity: count };
      newDispatch(updateQuantity(product));
    }
  };

  return (
    <div className="flex items-center">
      <button onClick={decreaseCount} className="qtyButton">
        -
      </button>
      <div className="flex justify-center text-sm sm:text-base self-center sm:min-w-[60px] mx-[3px]">
        {quantity}
      </div>
      <button onClick={increaseCount} className="qtyButton">
        +
      </button>
    </div>
  );
}

export default QuantityCount;
