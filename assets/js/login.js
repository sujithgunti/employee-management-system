if (localStorage.getItem("token")) {
  location.href = "./index.html";
}

let params = new URLSearchParams(location.search);
if (params.get("error")) {
  alert(params.get("error"));
  window.history.replaceState(null, "", window.location.pathname);
}

function login() {
  let email = $("#userEmail").val();
  let password = $("#password").val();
  console.log(email, password);
  // Do the validation

  $.ajax({
    url: "http://localhost/codeschool/task-4php/api/login.php",
    method: "POST",
    data: {
      email,
      password,
    },
    success: (response) => {
      response = JSON.parse(response);
      if (!response.status) {
        alert(response.message);
        return false;
      }
      localStorage.setItem("token", response.data.token);
      location.href = "./index.html";
    },
    error: (response) => {
      console.log(response);
    },
  });
}
