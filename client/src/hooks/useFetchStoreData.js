import { useSelector } from "react-redux";
export const useFetchStoreData = () => {
  const { token, userData } = useSelector((state) => state.user.data);
  const { cartData } = useSelector((state) => state.cart);
  return { token, userData, cartData };
};
