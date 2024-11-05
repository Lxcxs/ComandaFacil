import { jwtDecode } from "jwt-decode";


const useCustomerToken = (token: string) => {
  try {
    const decodedToken = jwtDecode<{
      customerId: number;
      customerName: string;
      table: number;
      storeId: number;
      iat: number;
      exp: number;
    }>(token);

    const { customerId, customerName, table, storeId, iat, exp } = decodedToken;

    return { customerId, customerName, table, storeId, iat, exp };
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};

export default useCustomerToken;
