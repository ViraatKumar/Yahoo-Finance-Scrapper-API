import scrapeDataAndSave from "./helper.js";
let counter = 0;
const forexData = async (req, res) => {
  try {
    const { fromCurrency, toCurrency, period } = req.query;
    if (!(fromCurrency && toCurrency && period))
      throw new Error("incorrect args"); // Here we can check for format also but to keep it simple this is good enough for now
    const response = await scrapeDataAndSave(fromCurrency, toCurrency, period);
    console.log(`Call Number ${counter}`);
    counter += 1;
    res.status(201).send(response);
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
};
export { forexData };
