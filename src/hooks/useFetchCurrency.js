
export const getCurrency = async page => {
  try {
    const response = await fetch(
      `
        https://api.currencylayer.com/convert?access_key=feb9630e0d0fb98a57d28e10918222dc&from=USD&to=GBP&amount=10&date=2024-11-11
        `,
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
      `https://api.currencylayer.com/list?access_key=feb9630e0d0fb98a57d28e10918222dc`,
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
