const inputSlider=document.querySelector("[data-lengthSlider]");
const lengthDisplay=document.querySelector("[ data-lengthNumber]");
const passwordDsiplay=document.querySelector("[data-passwordDisplay]");
const copybtn=document.querySelector("[data-copy]");
const copyMsg=document.querySelector("[data-copymsg]");
const uppercaseCheck=document.querySelector("#uppercase");
const lowercaseCheck=document.querySelector("#lowercase");
const numberCheck=document.querySelector("#numbers");
const symbolCheck=document.querySelector("#symbols");



const  indcater=document.querySelector("[ data-indicater]");
const generateBtn=document.querySelector(".generate-password");
const allcheckbox=document.querySelectorAll("[type=checkbox]");
const symbols='~"![]{}()&*%$#@&^?/><,:-/';


// -----------------------------------------------------/
//initeal state 
let password="";
//empty
let passwordLength=10;
//10
let checkCount=0;
//start from 1




handelesSlider();
setIndicater("#ccc");



//hanellsider use to eflect password on desktop.


// str strrneth colour to grey

//----------------------------------------------------/


//set password length.

function handelesSlider(){
    inputSlider.value=passwordLength;
    //combine kr diya slider ko value sa jesa slider move hoga wea value change hogi
    lengthDisplay.innerText=passwordLength;
    const min=inputSlider.min;
    const max=inputSlider.max;
    inputSlider.style.backgroundSize=((passwordLength-min)*100/(max-min))+"% 100%"


}
///--------------------------------------------------------------

 function setIndicater(color){
   indcater.style.backgroundColor=color;
 indcater.style.boxShadow ='0px 0px 12px 1px ${color}';


     


 }

 //-------------------------- find random int----------------------------------------
function getRandomInteger( min,max){
    //generate no between minand max
    return Math.floor(Math.random()*(max-min))+min;
    //math.floor use to float no round off.
    //math.random 0,1 tk n ka liya 
    //ex=we take 0.5*(9-1)+1=
    //random no.
    //?why we doing this.
    //ans for finding getrandom no.lowercase uppersae no betwin min to max;
    //a sa z ka bich ma no cheeya usa get random wala function write keya
}
//----------------------------------------------------------

function getRandomNumber(){
    return getRandomInteger(0,9);
}
function generateLowercase(){
   return String.fromCharCode (getRandomInteger(97,123));

   //string.fom char code use to convert no into char
}
function generateUppercase(){
    return String.fromCharCode (getRandomInteger(65,91));
}
   
    function generateSymbol(){
        const randNum=getRandomInteger(0,symbols.length);
        return symbols.charAt(randNum);
        //charat use to find what symbol pal 
    }

//---------------------- chek how many box check or not------------------------------------------


    function calsstrength(){
       
        let hasUpper=false;
        let hasLower=false;
        let hasNum=false;
        let hasSym=false;


        if (uppercaseCheck.checked)
            hasUpper=true;    
            if (lowercaseCheck.checked)
            hasLower=true;        
            if (numberCheck.checked)
            hasNum=true;        
            if (symbolCheck.checked)
            hasSym=true;   
        //-------------------------------use indicate light according to waek or strong---------------------------------
        
            if((hasUpper || hasLower) && (hasNum|| hasSym) && passwordLength>=0){
                setIndicater("#0f0");


            }
            else if( (hasUpper||hasLower) && (hasNum || hasSym) && passwordLength>=6){
                setIndicater("#ff0");
            }
            else{
                setIndicater("#f00");
            }

    }

//----------------------------password field ka ander passwordk copy krna ka liya---------------------------------------------


     async function copycont() {
        try{
            await navigator.clipboard.writeText(passwordDsiplay.value);
            //use to copied meg in promise
            copyMsg.innerText="copied";

        }
        catch(e){
            copyMsg.innerText="failed";

        }
          copyMsg.classList.add("active");

          setTimeout ( ()=>{
            copyMsg.classList.remove("active");
          },2000);
        
    }
     function shuffelPassword(array){
        //FASER YATS MEATHOD USE FOE SUFFEL THING
        for(let i=array.length-1; i>0; i--){ // <--- Changed `1` to `i`
            const j=Math.floor(Math.random()*(i+1));
            const temp=array[i];
            array[i]=array[j];
            array[j]= temp;
        
        }
        let str="";
        array.forEach((el)=>(str+=el));
        return str;



     }

    function handelCheckBoxChange(){
        checkCount=0;
        allcheckbox.forEach((checkbox)=>{
            if(checkbox.checked)
            checkCount++;
        });
        //special condition
        if(passwordLength<checkCount){
            passwordLength=checkCount;
            handelesSlider();
        }
        
    }
//checkboc change

    allcheckbox.forEach((checkbox)=>{
        checkbox.addEventListener('change',handelCheckBoxChange);

    })




//event listner concept

   inputSlider.addEventListener('input',(e)=>{
    passwordLength=e.target.value;
    handelesSlider();
   })




   copybtn.addEventListener('click',()=>{
    if(passwordDsiplay.value)
    copycont();

   })



   //generate password


   generateBtn.addEventListener('click',()=>{

    //con1
    if(checkCount==0)
    return;

    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handelesSlider();

    }
    console.log('starting jorney');


//remove old password;

    password="";

  
    
    let funArr=[];
   
    if(uppercaseCheck.checked)
    funArr.push(generateUppercase);

    if(lowercaseCheck.checked)
    funArr.push(generateLowercase);


    if(numberCheck.checked)
    funArr.push(getRandomNumber);


    if(symbolCheck.checked)
    funArr.push(generateSymbol);


//compalsoury addditio
    for(let i=0; i<funArr.length;i++){
        password +=funArr[i]();

    }
    console.log("compalsour addation");
    //remaing addition

    for(let i=0; i<passwordLength-funArr.length;i++){
        let randIndex= getRandomInteger(0,funArr.length);
        password+=funArr[randIndex]();
    }

    console.log(" remaning addation");
    //pass suffel


    password=shuffelPassword(Array.from(password));
    
    console.log("suffel done");
    //show in ui


    passwordDsiplay.value=password;
    calsstrength();
    
    console.log("ui addation");
    




    //calculate strength.



   });