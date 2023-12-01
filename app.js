const url = "https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood";

async function fetchFood(food = '') {
    try {
        let apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${food}`;
        let res = await axios.get(apiUrl);
        let foodData = res.data.meals;
        console.log(foodData);
        if (!foodData) {
            alert(`No meals found for category: ${food}`);
            return;
        }
        let card = '';
        document.querySelector(".container").innerHTML = '';
        for (let i = 0; i < foodData.length; i++) {
            card = `<div class="card" data-aos="fade-down">
                <img src=${foodData[i].strMealThumb} alt="">
                <div class="food-name">${foodData[i].strMeal}</div>
                <button class="details-btn" data-id="${foodData[i].idMeal}"><img src="./expand.png" alt=""></button>
            </div>`;
            document.querySelector(".container").innerHTML += card;
        }
        addDetails();
    } catch (error) {
        console.log("error:", error);
    }
}

document.querySelector("form").addEventListener('submit', (e) => {
    e.preventDefault();
    let food = document.querySelector('#food-input').value;
    if (food == '') {
        fetchFood();
    } else {
        fetchFood(food);
        document.querySelector('#food-input').value = '';
    }
});

async function displayRandomFood() {
    try {
        let apiUrl = "https://www.themealdb.com/api/json/v1/1/random.php";
        let res = await axios.get(apiUrl);
        randomData = res.data.meals;
        console.log(randomData);
        let randomCard = `<div class="random-card">
            <div><img src=${randomData[0].strMealThumb} alt="" id="random-pic"></div>
            <div class="random-name">${randomData[0].strMeal}</div>
            <button class="details-btn" data-id="${randomData[0].idMeal}"><img src="./expand.png" alt=""></button>
        </div>`;
        document.querySelector(".random-container").innerHTML = randomCard;
        addDetails()
    } catch (error) {
        console.log("error:", error);
    }
}

displayRandomFood();

function addDetails() {
    const detailsButtons = document.querySelectorAll('.details-btn');
    detailsButtons.forEach(button => {
        button.addEventListener('click', () => {
            const foodId = button.dataset.id;
            displayFoodDetails(foodId);
        });
    });
}

async function displayFoodDetails(foodId) {
    try {
        let apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`;
        let res = await axios.get(apiUrl);
        let foodDetails = res.data.meals[0]; 
        let detailsHTML = `
        <div class="details-card">
        <div id="details">
                <div><img src=${foodDetails.strMealThumb} alt="" id="details-img"></div>
                <div id="detail-ingredients">INGREDIENTS: ${generateIngredientsList(foodDetails)}</div>
            </div>
            <div id="detail-instruction"><a href=${foodDetails.strYoutube}>Tutorial Video</a></div>
        </div>`;
         
         document.querySelector(".modal-details").innerHTML = detailsHTML;
         
         document.querySelector('.modal').style.display = 'block';
     } catch (error) {
         console.log("error:", error);
     }
 }

function generateIngredientsList(foodDetails) {
    let ingredientsList = [];
    for (let i = 1; i <= 20; i++) {
        let ingredient = foodDetails[`strIngredient${i}`];

        if (ingredient) {
            ingredientsList.push(`${ingredient}`);
        } else if (ingredient) {
            ingredientsList.push(ingredient);
        }
    }
    return ingredientsList.join(', ');
}


function closeModal() {
    document.querySelector('.modal').style.display = 'none';
}


document.querySelector('.close').addEventListener('click', closeModal);

window.addEventListener('click', (event) => {
    const modal = document.querySelector('.modal');
    if (event.target === modal) {
        closeModal();
    }
});


const hamburgerIcon = document.getElementById('hamburger-icon-div');
const hamburgerMenu = document.getElementById('hamburger-menu');

hamburgerIcon.addEventListener('click', function() {
    // Toggle the visibility of the hamburger menu by changing its display property
    if (hamburgerMenu.style.display === 'block') {
        hamburgerMenu.style.display = 'none';
    } else {
        hamburgerMenu.style.display = 'block';
    }
});


