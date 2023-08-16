const logOutBtn = document.querySelector(".logout-btn");
const privateLink = document.querySelectorAll(".private");
const login = document.querySelectorAll(".login");
const user = document.querySelector(".user-link");
const postList = document.querySelector(".post-list");

login[0].classList.remove("d-none");
login[1].classList.remove("d-none");

logOutBtn.classList.add("d-none");
privateLink.forEach((element) => {
  element.classList.add("d-none");
});

logOutBtn.addEventListener("click", () => {
  localStorage.clear();
  window.location.replace("./login.html");
});

let token = localStorage.getItem("access_token") || null;

const savePostId = (id) => {
  localStorage.setItem("user_id", id);
};

const showPosts = (posts) => {
  let result = "";
  posts?.forEach((post) => {
    result += `<div class="col-12 col-md-6 col-lg-3 p-2 mb-3">
            <div class="card">
              <img src="${post?.image.url}" class="card-img-top img" alt="post_image" />
              <div class="card-body">
                <h5 class="card-title">${post.title}</h5>
                <p class="card-text">
                  ${post.content}
                </p>
                <a onclick="savePostId('${post._id}')" href="./post.html" class="btn btn-primary">Read More</a>
              </div>
            </div>
          </div>`;
  });
  postList.innerHTML = result;
};

const getPosts = async () => {
  try {
    let resp = await fetch("https://webstar-post-app.onrender.com/api/post", {
      method: "Get",
    });
    let data = await resp.json();
    showPosts(data);
  } catch (error) {}
};
getPosts();

if (token) {
  logOutBtn.classList.remove("d-none");
  login[0].classList.add("d-none");
  login[1].classList.add("d-none");

  privateLink.forEach((element) => {
    element.classList.remove("d-none");
  });
  const getUser = async () => {
    try {
      let resp = await fetch("https://webstar-post-app.onrender.com/api/", {
        method: "Get",
        headers: {
          access_token: token,
        },
      });
      let data = await resp.json();
      user.textContent = `${data.user.name}`;
      localStorage.setItem("user_data", JSON.stringify(data.user));
      user.innerHTML = data.user.name;
    } catch (error) {
      console.log(error);
    }
  };
  getUser();
}
