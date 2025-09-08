const categoryContainer = document.getElementById("category-container");
const cardContainer = document.getElementById("card-container");
const cartContainer = document.getElementById("cart-container");
const loadCategory = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => {
      displayCategory(data.categories);
    });
};

const displayCategory = (categories) => {
  categories.forEach((category) => {
    categoryContainer.innerHTML += `
            <li id= "${category.id}" class="px-2 py-1 font-semibold p-1 hover:cursor-pointer hover:bg-green-600 hover:text-white list-none">
            ${category.category_name}
            </li>
            `;
  });
  categoryContainer.addEventListener("click", (e) => {
    cardContainer.innerHTML = "";
    const allLi = document.querySelectorAll("li");
    allLi.forEach((category) => {
      category.classList.remove("bg-green-500");
    });
    if (e.target.localName === "li") {
      e.target.classList.add("bg-green-500");
      loadPlantByCategory(e.target.id);
    }
  });
};

const loadPlantByCategory = (categoryId) => {
  manageSpinner(true);
  fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
    .then((res) => res.json())
    .then((plants) => {
      displayPlantByCategory(plants.plants);
    });
};

const displayPlantByCategory = (plants) => {
  plants.forEach((plant) => {
    cardContainer.innerHTML += `
    <div id="${plant.id}" class="card shadow-lg border-1 border-gray-500 p-1 flex flex-col justify-between">
              <div> 
                <img class="max-h-50 w-full" src="${plant.image}" alt="" />
              </div>
              <div class="space-y-3 py-3">
                <h3 class="plant-name text-lg font-semibold">${plant.name}</h3>
                <p class='text-justify'>=${plant.description}</p>
                <div class="flex justify-between">
                  <button class="categoryBtn btn rounded-2xl bg-sky-200">${plant.category}</button>
                  <h3 class="text-xl font-bold"><i class="fa-solid fa-bangladeshi-taka-sign"></i><span>${plant.price}</span> </h3>
                </div>
              </div>
              <button class="btn addCartBtn w-full bg-green-700 rounded-xl text-white">
                Add to cart
              </button>
            </div>
    `;
  });
  const addCartBtn = document.getElementsByClassName("addCartBtn");
  for (let btn of addCartBtn) {
    btn.addEventListener("click", () => {
      const cartPrice =
        btn.parentNode.children[1].children[2].children[1].children[1]
          .innerText;
      const itemId = btn.parentNode.id;
      const cardTitle = btn.parentNode.children[1].children[0].innerText;
      const total = document.getElementById("total-price").innerText;
      const currentTotal = Number(total) + Number(cartPrice);
      document.getElementById("total-price").innerText = currentTotal;
      cartContainer.innerHTML += `
      <div id="${itemId}"
                class="cart-item flex justify-between items-center p-2 bg-sky-300 m-2 rounded-lg"
              >
                <div>
                  <h3 class="font-bold">${cardTitle}</h3>
                  <p><i class="fa-solid fa-bangladeshi-taka-sign text-sm"></i> ${cartPrice}</p>
                </div>
                <div
                  class="deleteBtn hover:bg-red-600 hover:text-white text-lg p-2 rounded-xl"
                >
                  <i class="fa-solid fa-xmark"></i>
                </div>
              </div>
      `;
    });
  }
  // Show Modal
  const modal = document.getElementById("my_modal_5");
  const modalHeading = document.getElementById("modal-heading");
  const modalImage = document.getElementById("modal-image");
  const modalText = document.getElementById("modal-text");
  const plantName = document.getElementsByClassName("plant-name");
  for (let name of plantName) {
    name.addEventListener("click", (e) => {
      const plantTitle = e.target.innerText;
      const plantImage =
        e.target.parentNode.parentNode.children[0].children[0].src;
      const plantDescription = e.target.parentNode.children[1].innerText;

      modalHeading.innerText = plantTitle;
      modalImage.src = plantImage;
      modalText.innerText = plantDescription;
      modal.showModal();
    });
  }
  manageSpinner(false);
};

const loadAllCategory = () => {
  manageSpinner(true);
  fetch(`https://openapi.programming-hero.com/api/plants`)
    .then((res) => res.json())
    .then((plants) => {
      displayPlantByCategory(plants.plants);
    });
};

const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
  } else {
    document.getElementById("spinner").classList.add("hidden");
  }
};
loadAllCategory();
loadCategory();
