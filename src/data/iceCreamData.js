import axios from "axios";

// **************node server end point**********
//const GET_MENU = `/api/menu`;

// **********json server (db.json) end point ***********

const GET_MENU = `http://localhost:5000/menuData`;
const GET_ICE_CREAM = `http://localhost:5000/iceCreams`;

export const getMenu = () => {
  return axios.get(GET_MENU).then((response) => {
    return response.data.sort((a, b) => {
      if (a.iceCream.name < b.iceCream.name) {
        return -1;
      }
      if (a.iceCream.name > b.iceCream.name) {
        return 1;
      }
      return 0;
    });
  });
};

export const getMenuItem = (id) => {
  return axios
    .get(`${GET_MENU}/${id}`)
    .then((response) => response.data)
    .catch((err) => {
      throw err;
    });
};

export const putMenuItem = (menuItem) => {
  return axios
    .put(`${GET_MENU}/${menuItem.id}`, menuItem)
    .then((response) => response.data)
    .catch((err) => {
      throw err;
    });
};

export const deleteMenuItem = (id) => {
  return axios.delete(`${GET_MENU}/${id}`).then((response) => response.data);
};

export const getICeCreams = () => {
  return axios.get(GET_ICE_CREAM).then((response) => {
    return response.data.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  });
};

export const getIceCream = (id) => {
  return axios
    .get(`${GET_ICE_CREAM}/${id.toString()}`)
    .then((response) => response.data)
    .catch((err) => {
      throw err;
    });
};

export const postMenuItem = (menuItem) => {
  return axios
    .post(GET_MENU, menuItem)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
};
