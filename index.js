const qs = (selector) => document.querySelector(selector);

fetch("https://api.nbp.pl/api/exchangerates/tables/a/last/1/?format=json")
  .then((data) => data.json())
  .then((data) => {
    data[0].rates
      .filter(({ code }) => ["CHF","EUR" ,"USD" ].includes(code))
      .forEach(({ code, mid }) => {
        const option = qs(`.${code.toLowerCase()}`);
        const text = `${code} ${mid}`;
        option.innerHTML = text;
      });
  });

  const AmountDOM = qs(".value");
AmountDOM.addEventListener("change", (e) => {
  let ChoosenAmount = AmountDOM.value;

  const PLNCurrency = qs(".result");
  const Currencies = qs(".choose");

  Currencies.addEventListener("click", (e) => {
    const stringToSeparateNumber = Currencies.value.split(" ");
    const RateOfTheSelectedCurrency = parseFloat(stringToSeparateNumber[1]);

    const buttonClic = qs(".count");

  buttonClic.addEventListener("click", (e) => {
      ChoosenAmount === AmountDOM.value
        ? console.log("ojj")
        : (ChoosenAmount = AmountDOM.value);

      const Result = RateOfTheSelectedCurrency * ChoosenAmount;
      
      PLNCurrency.innerHTML = `to ${Result} PLN`;
    });
  });
});
