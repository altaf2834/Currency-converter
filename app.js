const BASE_URL="https://latest.currency-api.pages.dev/v1/currencies/";

const dropdowns = document.querySelectorAll("select");
const btn=document.querySelector(".convertbtn");
const fromcurr=document.querySelector(".from select")
const tocurr=document.querySelector(".to select")
const msg=document.querySelector(".msg");


for (let select of dropdowns) {
    for (let currencyCode in countryList) {
        let newopt = document.createElement("option");

        newopt.innerText = currencyCode;
        newopt.value = currencyCode;

        select.appendChild(newopt);
    }
    select.addEventListener("change",(evt)=>{
    updateFlag(evt.target);
    })
};


// for (let select of dropdowns) {
//     select.addEventListener("change", (evt) => {
//         updateFlag(evt.target);
//     });
// }

const updateFlag = (element) => {
    let currcode = element.value;
    let countrycode = countryList[currcode];

    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;

    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
};

btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    let amount=document.querySelector("form input");
    let amtval=amount.value;
    if(amtval==="" || amtval<0){
        amtval=0;
        amount.value="0";
    }
    let to=tocurr.value.toLowerCase();
    let from=fromcurr.value.toLowerCase();
    // console.log(fromcurr.value,tocurr.value);
    let url=`${BASE_URL}/${from}.json`;
    let response=await fetch(url);
    let data= await response.json();
    let rate=data[from][to];
    // console.log(rate);
    let finalamount=rate*amount.value;
    // console.log(finalamount);
    msg.innerHTML=`${amtval}${fromcurr.value}=${finalamount  }${tocurr.value}`;
})

const swapBtn = document.querySelector(".fa-arrow-right-arrow-left");


