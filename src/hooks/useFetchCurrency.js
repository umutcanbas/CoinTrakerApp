export const changeCurrency = async currency => {
  try {
    const response = await fetch(
      `https://api.currencylayer.com/convert?access_key=YOUR_API_KEY&from=USD&to=${currency}&amount=1&date=2024-11-11`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.log('getData Error: ', error);
    return [];
  }
};

export const getAllCurrencies = async page => {
  try {
    const response = await fetch(
      `https://api.currencylayer.com/list?access_key=YOUR_API_KEY`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.log('getData Error: ', error);
    return [];
  }
};
