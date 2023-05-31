import data from "../../assets/data/data";

export const storeUserData = (data) => {
  localStorage.setItem("eMeduid", data);
};

export const getUserData = () => {
  return localStorage.getItem("eMeduid");
};

export const removeUserData = () => {
  localStorage.removeItem("eMeduid");
};

export const setCartData = (data) => {
  localStorage.setItem("rajMedCart", JSON.stringify(data));
};

export const getCartData = () => {
  return JSON.parse(localStorage.getItem("rajMedCart")) !== null
    ? JSON.parse(localStorage.getItem("rajMedCart"))
    : [];
};
export const setProductData = (data) => {
  localStorage.setItem("rajMedProd", JSON.stringify(data));
};

export const getProductData = () => {
  return JSON.parse(localStorage.getItem("rajMedProd")) !== null
    ? JSON.parse(localStorage.getItem("rajMedProd"))
    : data;
};
