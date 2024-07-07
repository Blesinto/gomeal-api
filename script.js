const searchBtn = document.getElementById('search_btn');
const recepicontainer = document.querySelector('.go');
const loginForm = document.getElementById('loginForm');
const wrongPasswordDiv = document.getElementById('wrongPassword');

loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const validUsername = 'Blesinto';
  const validPassword = '2001';

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === validUsername && password === validPassword) {
    window.location.href = 'index.html';
  } else {
    wrongPasswordDiv.classList.remove('opacity-0', 'translate-x-full');
    wrongPasswordDiv.classList.add('slide-in');
  }
});

const getMeal = () => {
  const searchBox = document.querySelector('.search').value.trim();

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchBox}`)
    .then(response => response.json())
    .then(data => {
      recepicontainer.innerHTML = ''; // Clear previous results
      if (data.meals) {
        data.meals.forEach(meal => {
          const receipDiv = document.createElement('div');
          receipDiv.classList.add(
            'flex-col',
            'items-center',
            'justify-center',
            'border',
            'border-[#e6e3e3]',
            'rounded-2xl'
          );
          receipDiv.innerHTML = `
            <div class="w-fit">
              <img src="${meal.strMealThumb}" alt="${
            meal.strMeal
          }" class="w-[15rem] rounded-full" />
            </div>
            <div class="px-6">
              <h1 class="font-bold mb-1">${meal.strMeal}</h1>
              <p>${meal.strInstructions.substring(0, 100)}...</p>
            </div>
            <div class="flex justify-between px- m-4">
              <span class="text-xl">$5.0</span>
              <span class="w-8 bg-black rounded-full text-center">
                <i class="fa-solid fa-plus text-white"></i>
              </span>
            </div>
          `;
          recepicontainer.appendChild(receipDiv);
        });
      } else {
        recepicontainer.innerHTML =
          '<p class ="flex items-center justify-center" >Meal not found.</p>';
      }
    })
    .catch(error => console.error('Error fetching the meal:', error));
};

// Add event listener to the search button
searchBtn.addEventListener('click', getMeal);
