const post = document.querySelector(".post");
const container = document.querySelectorAll(".container");
const commentsList = document.querySelector(".comments-list");

const postId = localStorage.getItem("user_id") || null;
const userData = JSON.parse(localStorage.getItem("user_data")) || null;
let comments = null;
// console.log("user dat:" + userData.id);
const getPost = async (id) => {
  try {
    let resp = await fetch(`https://webstar-post-app.onrender.com/api/post/${id}`, {
      method: "Get",
    });
    let data = await resp.json();
    // console.log(postId);
    // console.log(data)
    displayPost(data[0]);
  } catch (error) {
    console.log(error);
  }
};

const displayPost = (data) => {
  comments = [...data.comments];
  container[1].innerHTML = `<div class="post">
          <h1 class="text-center text-info my-3">${data.title}</h1>
          <img src="${
            data.image.url
          }" class="d_block mx-auto img mb-3" alt="post_image" />
          <p>
            ${data.content}
          </p>
          <small>${data.createdAt.slice(0, 10)} </small>
          <blockquote>${data.author[0].name} ${data.author[0].surname} </blockquote>
          <button onclick="like()" class="btn btn-outline-info like-btn" >${
            data.like.length
          } Likes</button>
          <button onclick="disLike()" class="btn btn-outline-danger dislike-btn ">${
            data.dislike.length
          } Disikes</button>
          <button onclick="showComment()" class="btn btn-outline-success">${
            data.comments.length
          } Comments</button>
        </div>`;
  const likeBtn = document.querySelector(".like-btn");
  const dislikeBtn = document.querySelector(".dislike-btn");
  data.like.forEach((item) => {
    if (userData.id === item) {
      likeBtn.classList.add("liked");
    }
  });
  data.dislike.forEach((item) => {
    if (userData.id === item) {
      dislikeBtn.classList.add("disliked");
    }
  });
};
if (postId) {
  getPost(postId);
}

const like = async () => {
  try {
    let resp = await fetch(`https://webstar-post-app.onrender.com/api/like/${postId}`, {
      method: "Get",
      headers: { access_token: localStorage.getItem("access_token") },
    });
    getPost(postId);

    let data = await resp.json();
    // console.log(data);
  } catch (error) {}
};

const disLike = async () => {
  try {
    let resp = await fetch(
      `https://webstar-post-app.onrender.com/api/dislike/${postId}`,
      {
        method: "Get",
        headers: { access_token: localStorage.getItem("access_token") },
      }
    );
    getPost(postId);
  } catch (error) {}
};

const showComment = () => {
  console.log(comments);
  let result = "";
  comments.forEach((comment) => {
    result += `<li>
            <blockquote>${comment.author[0].name} ${comment.author[0].surname}</blockquote>
            <p>
             ${comment.content}
            </p>
            <small>${comment.createdAt}</small>
            <hr />
          </li>`;
  });
  container[2].innerHTML = result;
};
