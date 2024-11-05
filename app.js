const BASE_URL =
"https://2024-03-06.currency-api.pages.dev/v1/currencies/";
  const dropdowns = document.querySelectorAll("#country-item");
  const countryList = {
    AED: "AE",
    AFN: "AF",
    XCD: "AG",
    ALL: "AL",
    AMD: "AM",
    ANG: "AN",
    AOA: "AO",
    AQD: "AQ",
    ARS: "AR",
    AUD: "AU",
    AZN: "AZ",
    BAM: "BA",
    BBD: "BB",
    BDT: "BD",
    XOF: "BE",
    BGN: "BG",
    BHD: "BH",
    BIF: "BI",
    BMD: "BM",
    BND: "BN",
    BOB: "BO",
    BRL: "BR",
    BSD: "BS",
    NOK: "BV",
    BWP: "BW",
    BYR: "BY",
    BZD: "BZ",
    CAD: "CA",
    CDF: "CD",
    XAF: "CF",
    CHF: "CH",
    CLP: "CL",
    CNY: "CN",
    COP: "CO",
    CRC: "CR",
    CUP: "CU",
    CVE: "CV",
    CYP: "CY",
    CZK: "CZ",
    DJF: "DJ",
    DKK: "DK",
    DOP: "DO",
    DZD: "DZ",
    ECS: "EC",
    EEK: "EE",
    EGP: "EG",
    ETB: "ET",
    EUR: "FR",
    FJD: "FJ",
    FKP: "FK",
    GBP: "GB",
    GEL: "GE",
    GGP: "GG",
    GHS: "GH",
    GIP: "GI",
    GMD: "GM",
    GNF: "GN",
    GTQ: "GT",
    GYD: "GY",
    HKD: "HK",
    HNL: "HN",
    HRK: "HR",
    HTG: "HT",
    HUF: "HU",
    IDR: "ID",
    ILS: "IL",
    INR: "IN",
    IQD: "IQ",
    IRR: "IR",
    ISK: "IS",
    JMD: "JM",
    JOD: "JO",
    JPY: "JP",
    KES: "KE",
    KGS: "KG",
    KHR: "KH",
    KMF: "KM",
    KPW: "KP",
    KRW: "KR",
    KWD: "KW",
    KYD: "KY",
    KZT: "KZ",
    LAK: "LA",
    LBP: "LB",
    LKR: "LK",
    LRD: "LR",
    LSL: "LS",
    LTL: "LT",
    LVL: "LV",
    LYD: "LY",
    MAD: "MA",
    MDL: "MD",
    MGA: "MG",
    MKD: "MK",
    MMK: "MM",
    MNT: "MN",
    MOP: "MO",
    MRO: "MR",
    MTL: "MT",
    MUR: "MU",
    MVR: "MV",
    MWK: "MW",
    MXN: "MX",
    MYR: "MY",
    MZN: "MZ",
    NAD: "NA",
    XPF: "NC",
    NGN: "NG",
    NIO: "NI",
    NPR: "NP",
    NZD: "NZ",
    OMR: "OM",
    PAB: "PA",
    PEN: "PE",
    PGK: "PG",
    PHP: "PH",
    PKR: "PK",
    PLN: "PL",
    PYG: "PY",
    QAR: "QA",
    RON: "RO",
    RSD: "RS",
    RUB: "RU",
    RWF: "RW",
    SAR: "SA",
    SBD: "SB",
    SCR: "SC",
    SDG: "SD",
    SEK: "SE",
    SGD: "SG",
    SKK: "SK",
    SLL: "SL",
    SOS: "SO",
    SRD: "SR",
    STD: "ST",
    SVC: "SV",
    SYP: "SY",
    SZL: "SZ",
    THB: "TH",
    TJS: "TJ",
    TMT: "TM",
    TND: "TN",
    TOP: "TO",
    TRY: "TR",
    TTD: "TT",
    TWD: "TW",
    TZS: "TZ",
    UAH: "UA",
    UGX: "UG",
    USD: "US",
    UYU: "UY",
    UZS: "UZ",
    VEF: "VE",
    VND: "VN",
    VUV: "VU",
    YER: "YE",
    ZAR: "ZA",
    ZMK: "ZM",
    ZWD: "ZW",
  };
  let from = document.querySelector("#from select");
  let to = document.querySelector("#to select"); 
  let selector = document.querySelectorAll(".selector");
  for(let select of selector){
    for (let currcode in countryList){
      let option = document.createElement("option");
      option.value = currcode;
      option.text = currcode; 
      if(select.name === "from" && currcode === "USD"){
        option.selected = "selected";
      } else if(select.name === "to" && currcode === "INR"){
        option.selected = "selected";
      }
      select.append(option);
    }
    select.addEventListener('change',(event) =>{
      updateFlage(event.target);
    });
  }
 

  
  function updateFlage(element){
    let currcode = element.value;
    let countryCode = countryList[currcode];
    let newSrc = "https://flagsapi.com/"+countryCode+"/flat/64.png";
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
  }
  let btn = document.querySelector("#btn");
  btn.addEventListener("click", async (evt) =>{
    evt.preventDefault;
    let amount = document.querySelector("#amount");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1){
      amtVal = 1;
      amount.value = 1;
    }
    // https://2024-03-06.currency-api.pages.dev/v1/currencies/eur.json
    const URL = "https://2024-03-06.currency-api.pages.dev/v1/currencies/"+from.value.toLowerCase()+".json";
    let responce = await fetch(URL);
    let toVal = to.value.toLowerCase();
    let data = await responce.json();
    let rate = data[from.value.toLowerCase()];
    let finalRate = rate[to.value.toLowerCase()];
    let msg = document.querySelector("#msg-box p");
    msg.innerHTML = amtVal+" "+from.value+" = "+finalRate * amtVal+" "+to.value;
    if(amtVal<400000){
      msg.style.fontSize = "2.5vh";
    } else{
      msg.style.fontSize = "2vh";
    }
    
  })

  
  
  
  
  