const axios = require("axios");

const getData = async url => {
  try {
    const response = await axios.get(url);
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
    getData
}