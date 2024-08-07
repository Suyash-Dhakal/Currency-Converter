const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns=document.querySelectorAll(".dropdown select");

let i=0;

for(let select of dropdowns){
    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        }
        else if(select.name==="to" && currCode==="NPR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
select.addEventListener("change",(evt)=>{  //this arrow function is handler func
    updateFlag(evt.target);
})
}

const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}

//Currency Converter Api

const updateExchangeRate=async ()=>{
    fromCurr=document.querySelector(".from select").value;
    toCurr=document.querySelector(".to select").value;
    msg=document.querySelector(".msg");

    let amount=document.querySelector(".amount input");
    let amountVal=amount.value;
    if(amountVal==="" || amountVal<1){
        amountVal=1;
        amount.value="1";
    }
    //update URL structure
    
    const URL=`${BASE_URL}/${fromCurr.toLowerCase()}.json`;

    let response= await fetch(URL);
    let data=await response.json();
    let rate=data[fromCurr.toLowerCase()][toCurr.toLowerCase()];
    let finalAmount=(amountVal*rate).toFixed(3);
    msg.innerText=`${amountVal} ${fromCurr} = ${finalAmount} ${toCurr}`;
};

btn=document.querySelector("form button");
btn.addEventListener("click",(evt)=>{
evt.preventDefault();
updateExchangeRate();
});

window.addEventListener("load",()=>{
    updateExchangeRate();
})

//exchange
exchange=document.querySelector(".exchange");
exchange.addEventListener("click",()=>{
//swap the currencies and their flag
fromCurr=document.querySelector(".from select");
toCurr=document.querySelector(".to select");
temp=fromCurr.value;
fromCurr.value=toCurr.value;
updateFlag(fromCurr);
toCurr.value=temp;
updateFlag(toCurr);
});

