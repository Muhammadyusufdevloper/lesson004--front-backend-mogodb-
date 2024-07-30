const userBoxes = document.querySelector(".user__boxes");
const API__URL = "http://localhost:8000/users";
const form = document.querySelector(".form");

async function fetchDat(api) {
    const response = await fetch(api);
    const data = await response.json();
    mapUser(data);
}

fetchDat(API__URL);

function mapUser(userData) {
    let setCard = "";

    userData.payload.forEach((element) => {
        setCard += `
            <div data-id="${element.id}" class="user__card">
                <div class="user__part">
                    <img src="${element.image}" alt="${element.fname} ${element.lname}" />
                </div>
                <div class="user__info">
                    <h3 class="user__info__title">${element.fname} ${element.lname}</h3>
                    <p class="user__info__desc">${element.username}</p>
                    <p class="user__info__desc user__info__text">${element.age}</p>
                    <div class="user__btns">
                        <button class="user__btn user__btn--delete">Delete</button>
                    </div>
                </div>
            </div>
        `;
    });
    userBoxes.innerHTML = setCard;
}

async function createData(api, newUser) {
    const response = await fetch(api, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
    });
    const res = await response.json();
    console.log(res);
    fetchDat(API__URL);
}

async function deleteData(api, id) {
    const response = await fetch(`${api}/${id}`, {
        method: "DELETE",
    });
    const res = await response.json();
    console.log(res);
    fetchDat(API__URL);
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newUser = {
        fname: document.getElementById("fname").value,
        lname: document.getElementById("lname").value,
        username: document.getElementById("username").value,
        age: +document.getElementById("age").value,
        password: document.getElementById("password").value,
        image: document.getElementById("image").value,
    };
    createData(API__URL, newUser);
    form.reset();
});

userBoxes.addEventListener("click", (e) => {
    if (e.target.classList.contains("user__btn--delete")) {
        if (!confirm("malumot o'chirmoqchimisiz?")) return;
        const id = e.target.closest(".user__card").dataset.id;
        deleteData(API__URL, id);
    }
});
