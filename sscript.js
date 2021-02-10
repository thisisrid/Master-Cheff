const mealList = document.getElementById("mealList");
const searchBtn = document.getElementById("search-btn");

/////////////SEARCH BUTTON HANDLER//////
searchBtn.addEventListener("click", () => {
  const searchString = document.getElementById("searchBar").value;
  if (searchString.length != 1) {
    sorry(" Search With Single Letter");
    document.getElementById("searchBar").value = "";
  } else {
    getData(searchString);
    document.getElementById("searchBar").value = "";
  }
});

//////////MACHINE FOR GETTING SEARCHED MEAL INFO/////
const getData = async (name) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${name}`;
  const response = await fetch(url);
  const data = await response.json();
  if (data.meals === null) {
    sorry("Not Found!");
  } else {
    getAllMeal(data.meals);
  }
};

//showing all meals, searched
const getAllMeal = (mealName) => {
  const div = document.getElementById("mealList");
  div.innerHTML = "";
  document.getElementById('details').innerHTML = ""
  mealName.forEach((obj) => {
    const newdiv = document.createElement("div");
    newdiv.className = "col";
    let mealInfo = `
    <div class="card h-100">
    <img onclick="getDetails(${obj.idMeal})" src="${obj.strMealThumb}" class="card-img-top" alt="pic">
    <div class="card-body">
      <h5 onclick="getDetails(${obj.idMeal})" class="card-title text-center">${obj.strMeal}</h5>
    </div>
  </div>`;
    newdiv.innerHTML = mealInfo;
    div.appendChild(newdiv);
  });
};

///////////MACHINE FOR GIVE MORE DETAILS OF SINGLE ITEM MEAL///////
const getDetails = async (mealId) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    const res = await fetch(url);
    const data = await res.json();
    setInfo(data.meals[0]);
  };
  

  ///machine for meal details
  const setInfo = (info) => {
    const information = document.getElementById("details");
     information.style.display = "block";
     information.innerHTML = ''
    let ingArray = [];
    ////getting meal ingredients
    for (let i = 1; i < 20; i++) {
      ingArray.push(info[`strIngredient${i}`]);
    }

let ul = document.createElement('ul');
ul.innerHTML = ''
    ingArray.forEach((obj) => {
        const li = document.createElement("li");
        li.innerText = obj;
        ul.appendChild(li);
      });
    
information.innerHTML= `<div class="col-sm-8 col-md-5">
<div id="card" class="card h-100">
  <div class="card-body">
  <img src="${info.strMealThumb}" class="card-img-top" alt="pic"></img>
  <h3>${info.strMeal}</h3>
    <h6 class="card-title">Ingredients</h6>
    ${ul.innerHTML}
 </div>
</div>
</div>`
    
  }

  const displayNone = () => {
    document.getElementById("details").style.display = "none";
  };
  
  ///////GIVE ERROR NOTIFICATION WHILE SOMEONE INPUT 2 OR MORE VALUE//////
  const sorry = (string) => {
    const div = document.getElementById("details");
    div.innerHTML = "";
    document.getElementById("mealList").innerHTML = "";
    const newdiv = document.createElement("div");
    newdiv.className = 'card h-100 text-center py-5 bg-danger text-white';
    const mealInfo = `
      <h1> ${string} </h1>
      <button class=" mt-3 bg-primary text-white"  onclick="location.reload()">CLEAR</button>`;
    newdiv.innerHTML = mealInfo;
    div.appendChild(newdiv);
  };
