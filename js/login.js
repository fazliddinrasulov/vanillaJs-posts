const loginForm = document.querySelector(".login-form");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    let resp = await fetch("https://webstar-post-app.onrender.com/api/login", {
      method: "Post",
      body: new FormData(e.target),
    });
    let data = await resp.json();
    let qwe = new FormData(e.target);
    console.log(qwe);
    alert(data.message);
    // console.log(resp);
    if (resp.status === 200) {
      localStorage.setItem("access_token", data.token);
      window.location.replace("./index.html");
    }
  } catch (error) {
    console.log("xato");
  }
});
