const signUpForm = document.querySelector(".signup-form");

signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    let resp = await fetch("https://webstar-post-app.onrender.com/api/signup", {
      method: "Post",
      body: new FormData(e.target),
    });
    let data = await resp.json();
    alert(data.message);
    // console.log(resp);
    if (resp.status === 201) {
      localStorage.setItem("access_token", data.token);
      window.location.replace("./index.html");
    }
  } catch (error) {
    console.log("xato");
  }
});
