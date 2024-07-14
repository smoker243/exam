
$('#toogle2').on('click',function(){
    // console.log('dd');
    $('#link').show(500 ,function(){
        $('#toogle1').show(50)
        $('#toogle2').hide(50)  
    })


})


$(function(){
  $('#loader').fadeOut(1000,function(){
$('#load').slideUp(500,function(){
  $('body').css('overflow','auto')
})
  })
})





$('#toogle1').on("click",function(){
    $('#link').hide(50 ,function () {
        $('#toogle1').hide(50)
        $('#toogle2').show(50)
    })

})
$(' #link  li ').on('click',function(){
  $('#link').hide(50 ,function () {
    $('#toogle1').hide(50)
    $('#toogle2').show(50)
    // document.getElementById('row-date').innerHTML=''
  }
)


})

let allmeal=[]
async function getmeal(){
    const api= await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
  let response=await api.json()

allmeal=response.meals
 displaydate()
}

let search=document.getElementById('search').addEventListener('click',function(){
 let div=`
   <div class="row  justify-content-around g-3">
      <div class="col-5" id="input1">
        <input type="text" class="form-control " placeholder="Search By Name" aria-label="First name">
      </div>
      <div class="col-5" id="input2">
        <input type="text" class="form-control" placeholder="Search By Letter" aria-label="Last name">
      </div>
    </div>
     `


document.getElementById('row-search').innerHTML=div
document.getElementById('row-date').innerHTML=''

inputt()
})
function inputt(){
  let input1=document.getElementById('input1')
  input1.addEventListener('input',function(e){
    searchmeal(e.target.value);
  })

let input2=document.getElementById('input2')

input2.addEventListener('input',function(e){
searchmealletter(e.target.value)
})
}
async function searchmeal(nome){
  const api= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`)
let response=await api.json()
displaysearch(response.meals)


}
async function searchmealletter(nome){
  const api= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${nome}`)
let response=await api.json()

displaysearch(response.meals)
$("#load").fadeIn(300,function(){
  $("#loader").slideDown(300)
})

}

 function displaysearch(date){
  let cartoon='' 
  for( let i=0;i<25;i++)

    {  
         cartoon+=`
           
         
         <div id="${date[i].idMeal}" class="col-12 mt-1 col-md-3 lo  rounded-4 ">
         <div class="conterma p-1   w-100 rounded-4  overflow-hidden position-relative" >
       <img src="${date[i].strMealThumb}" class="w-100 mb-1" alt="">
    <div class=" pt-1 content bg-light "> 
       <h3 class=" h5 m-0 pt-2 mt-5 text text-black">${date[i].strMeal}</h3>
        </div>
      </div>
    
       </div> 
           
           
           
           `
   }


document.getElementById('row-date').innerHTML=cartoon

getids(date)
 }



function displaydate(){
    let cartoon=''
    for( let i=0;i<allmeal.length;i++)
{
            cartoon+=`
        
      
      <div id="${allmeal[i].idMeal}" class="col-12 mt-1 col-md-3 lo  rounded-4 ">
      <div class="conterma p-1  w-100 rounded-4  overflow-hidden position-relative" >
    <img src="${allmeal[i].strMealThumb}" class="w-100" alt="">
 <div class=" pt-1 content bg-light "> 
    <h3 class=" m-0 pt-1 text-black">${allmeal[i].strMeal}</h3>
     </div>
   </div>
 
    </div> 
        
        
        
        `
}

document.getElementById('row-date').innerHTML=cartoon
getids(allmeal)
}
let getId
function getids(date){
    let id =document.querySelectorAll('.lo').forEach(id => {
    id.addEventListener('click', async function(){

       getId=+id.getAttribute('id');

 const api=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${getId}`)
let response =await api.json()
    displaydetails(response.meals[0])
//     
})

  });

}

function displaydetails(getId){
 let cartoon=""
 let carton=``
 for(let i=1;i<21;i++){


  if(getId[`strIngredient${i}`]){
carton+=`
<li class="alert  p-1 " >${getId[`strMeasure${i}`]+'\t'+getId[`strIngredient${i}`]}</li>
`

  }
 }
  cartoon =` 
 
     <div class=" col-12 col-md-4 col-lg-5  p-4 rounded-4 ">
      <img src="${getId.strMealThumb}"class="w-100" alt="">
  <h3 class="text-light p-3">${getId.strMeal} </h3>
    </div>
  <div class="caption col-12  col-md-8 col-lg-6    text-light  ">
  <h5 class='p-5' >Instructions</h5>
  <p class='p-5'>${getId.strInstructions}   </p>
  <h5 class='p-5' ><span>Area </span><span>: ${getId.strArea}</span></h5>
  <h5 class='p-5'> <span>Category </span><span>: ${getId.strCategory} </span> </h5>
  <h3 class='p-5'>recipes:</h3>
  <ul class="d-flex  flex-wrap gap-1 ">
  ${carton}
    
  </ul>
  <h3>tags :</h3>
     <button class="btn btn-success m-2 text-light"><a href="${getId.strSource}"class='text-light text-decoration-none ' target="_blank">source</a></button> 
     <button class="btn btn-danger  text-light"><a href="${getId.  strYoutube}"class='text-light text-decoration-none ' target="_blank">Youtube</a></button> 
  
     </div>
   
   
   
   `


   document.getElementById('row-date').innerHTML=cartoon 
   document.getElementById('row-search').innerHTML='' 

}
let datcat=[]
async function getCategory(){
const api=await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
let response=await api.json()
datcat=response.categories
displaydatecatgory()

}

  let categories=document.getElementById('categories').addEventListener('click',function(){
    getCategory()


  }) 

function displaydatecatgory (){

  let cartoon=''
for(let i=0;i<datcat.length;i++){
  cartoon+=`
        
      
  <div id="${datcat[i].idCategory}" class="col-12 mt-1 col-md-3 lo  rounded-4 ">
  <div class="conterma p-1  w-100 rounded-4  overflow-hidden position-relative" >
<img src="${datcat[i].strCategoryThumb}" class="w-100" alt="">
<div class=" pt-1 content bg-light "> 
<h3 id=${datcat[i].strCategory} class=" cat  m-0 pt-1 text-black">${datcat[i].strCategory}</h3>
 </div>
</div>
</div> 
    
    
    
    `
}


// console.log(cartoon);
document.getElementById('row-date').innerHTML=cartoon
document.getElementById('row-search').innerHTML=''
getcatss(datcat)
}
let alldate=[]
function getcatss(cat){

  let id =document.querySelectorAll('.lo').forEach(id => {
  id.addEventListener('click', async function(cat){
    cat=id.querySelector( 'h3').getAttribute('id') ;
  const api=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`)
  let response=await api.json()

  // console.log(response);
  // displaydetailcatgory(response.meals)
  alldate=response.meals
displaydetailcatgory()

  })
  })
}

  function getdelss(){

    let id =document.querySelectorAll('.content').forEach(id => {
    id.addEventListener('click', async function(cat){
      cat=id.querySelector( 'h3').getAttribute('id') ;
    const api=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${cat}`)
    let response=await api.json()
  getids(response.meals[0].idMeal);
    // displaydetailcatgory(response.meals)


    })
    })


}
 function getdelss(){

    let id =document.querySelectorAll('.content').forEach(id => {
    id.addEventListener('click', async function(cat){
      cat=id.querySelector( 'h3').getAttribute('id') ;
      console.log(cat);
    const api=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${cat}`)
    let response=await api.json()
  getids(response.meals[0].idMeal);
    // displaydetailcatgory(response.meals)


    })
    })


}
function displaydatek(get){
  let cartoon=""
 let carton=``
 console.log(get);
 for(let i=1;i<21;i++){


  if(get[`strIngredient${i}`]){
carton+=`
<li class="alert  p-1 " >${get[`strMeasure${i}`]+'\t'+get[`strIngredient${i}`]}</li>
`

  }
 }
  cartoon =` 
 
     <div class=" col-12 col-md-4 col-lg-5  p-4 rounded-4 ">
      <img src="${get.strMealThumb}"class="w-100" alt="">
  <h3 class="text-light">${get.strMeal} </h3>
    </div>
  <div class="caption col-12  col-md-8 col-lg-6    text-light  ">
  <h5>Instructions</h5>
  <p>${get.strInstructions}   </p>
  <h5><span>Area </span><span>: ${get.strArea}</span></h5>
  <h5> <span>Category </span><span>: ${get.strCategory} </span> </h5>
  <h3>recipes:</h3>
  <ul class="d-flex  flex-wrap gap-1 ">
  ${carton}
    
  </ul>
  <h3>tags :</h3>
     <button class="btn btn-success m-2 text-light"><a href="${get.strSource}"class='text-light text-decoration-none ' target="_blank">source</a></button> 
     <button class="btn btn-danger  text-light"><a href="${get.  strYoutube}"class='text-light text-decoration-none ' target="_blank">Youtube</a></button> 
  
     </div>
   
   
   
   `


   document.getElementById('row-date').innerHTML=cartoon 
   document.getElementById('row-search').innerHTML='' 


}
function displaydetailcatgory(){
  let cartoon=''
  for(let i=0;i<alldate.length;i++){

    cartoon+=`
          
        
    <div id="${alldate[i].idMeal}" class="col-12 mt-1 col-md-3 lo  rounded-4 ">
    <div class="conterma p-1  w-100 rounded-4  overflow-hidden position-relative" >
  <img src="${alldate[i].strMealThumb}" class="w-100 mb-4 pb-3 " alt="">
  <div class="  mt-1 content bg-light "> 
  <h3 id="${alldate[i].strMeal}" class=" mt-2 pt-4  text-black">${alldate[i].strMeal}</h3>
   </div>
  </div>
  
  </div> 
      
      
      
      `
}

document.getElementById('row-date').innerHTML=cartoon
document.getElementById('row-search').innerHTML=''
getidss()
getdelss(alldate)

}
function getidss(){
  let id =document.querySelectorAll('.lo').forEach(id => {
  id.addEventListener('click', async function(){

     getId=+id.getAttribute('id');

const api=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${getId}`)
let response =await api.json()
  displaydetails(response.meals[0])
  })
})    
  }
 let allarea=[]
  async function Area(){
    const api=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let response= await api.json()
  allarea=response.meals
  area()
  }
  function area(){
    let cartoon=''
//  console.log(allarea);
    for(let i=0;i<allarea.length;i++ ){
cartoon+= `
 <div class=" col-3 mb-1 text-light area">
    <span class="text-light  fon"><i class="fa-solid fa-house-laptop"></i></span>
    <h4 id="${allarea[i].strArea}" class="text-center gg  ">${allarea[i].strArea}</h4>
   </div>
`
    }
document.getElementById('row-date').innerHTML=cartoon
document.getElementById('row-search').innerHTML=''
    getidss()
  }
document.getElementById('area').addEventListener('click',function(){
  Area()


})
let arre=[]
function getidss(){
  let ids =document.querySelectorAll('.area').forEach(bd => {
  bd.addEventListener('click', async function(){

   let coutry =bd.querySelector('.gg').getAttribute('id') ;

const api=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${coutry}`)
let response =await api.json()
arre=response.meals  
darea()
  })
})  }
function darea(){

  let cartn=''

  for(let i=0;i<arre.length;i++){
    cartn+=`
          
        
    <div id="${arre[i].idMeal}" class="col-12 mt-1 col-md-3 lo  rounded-4 ">
    <div class="conterma p-1  w-100 rounded-4  overflow-hidden position-relative" >
  <img src="${arre[i].strMealThumb}" class="w-100 mb-4 pb-3 " alt="">
  <div class="  mt-1 content bg-light "> 
  <h3 class=" mt-2 pt-4  text-black">${arre[i].strMeal}</h3>
   </div>
  </div>
  
  </div> 
      
      
      
      `
}
document.getElementById('row-date').innerHTML=cartn
document.getElementById('row-search').innerHTML=''
}
let ingredients=[]
async function Ingredients(){
const api =await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
let response=await api.json()
ingredients=response.meals.slice(0,20);
displayingredients()
// Ingredients=response

}
function displayingredients(){
let carton=''
for(let i=0 ; i<ingredients.length;i++ ){
carton+=`
 <div class="col-12 col-md-3 text-center intg text-light " >
      <span class="fon"><i class="fa-solid fa-drumstick-bite"></i></span>
      <h3 id="${ingredients[i].strIngredient}">${ingredients[i].strIngredient}</h3>
      <p>${ingredients[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
     </div>
`
}
document.getElementById('row-date').innerHTML=carton
document.getElementById('row-search').innerHTML=''

geting()
}
document.getElementById('ing').addEventListener('click',function(){
  Ingredients()

})
function geting(){
  let ingg =document.querySelectorAll('.intg').forEach(ingg => {
  ingg.addEventListener('click', async function(){
   let intger =ingg.querySelector('h3').getAttribute('id') ;
getii(intger)
  })
})  }
let allinter=[]
async function getii(intger){
  const api=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${intger}`)
let response =await api.json()
console.log(response);
allinter=response.meals
displaydateintg()
}
function displaydateintg(){
  let caron=''
  for(i=0 ;i<allinter.length;i++ ){
  caron+=`
  
  
        
      <div id="${allinter[i].idMeal}" class="col-12 mt-1 col-md-3 lo  rounded-4 ">
      <div class="conterma p-1  w-100 rounded-4  overflow-hidden position-relative" >
    <img src="${allinter[i].strMealThumb}" class="mb-4 w-100" alt="">
 <div class=" pt-1 content bg-light "> 
    <h3 id="${allinter[i].idMeal}" class=" m-0 pt-1 text-black">${allinter[i].strMeal}</h3>
     </div>
   </div>
 
    </div> 
        
  
  `

  // console.log(allinter[i].idMeal);
  }
  document.getElementById('row-date').innerHTML=caron
document.getElementById('row-search').innerHTML=''

int(allinter)
}
function int(allinter){
  let d =document.querySelectorAll('.content').forEach(d => {
  d.addEventListener('click', async function(){
  let f=+d.querySelector('h3').getAttribute('id');

const api=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${f}`)
let response =await api.json()
  displaydetails(response.meals[0])
//     
})

});

}


document.getElementById('con').addEventListener("click",function(w){
show(w)
})
function show(e){
  showContacts()
}
  function showContacts() {
 let rowData=document.getElementById('row-date').innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
    submitBtn = document.getElementById("submitBtn")
    document.getElementById('row-search').innerHTML=''


    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched = true
    })
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;




function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}
getmeal()