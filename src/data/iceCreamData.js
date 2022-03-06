import axios from "axios";

// **************node server end point**********
//const GET_MENU = `/api/menu`;

// **********json server (db.json) end point ***********

const GET_MENU = `http://localhost:5000/menuData`;

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
