const paymentMethods = (req, res) => {
  res.render("payment", {
    title: "Desafio - Pago",
    style: "index.css",
  });
};

module.exports = { paymentMethods };
