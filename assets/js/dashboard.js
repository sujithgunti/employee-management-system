if (!localStorage.getItem("token")) {
  location.href = "./login.html";
}

$.ajax({
  url: "http://localhost/codeschool/task-4php/api/getUser.php",
  method: "POST",
  data: {
    token: localStorage.getItem("token"),
  },
  success: function (response) {
    response = JSON.parse(response);
    console.log(response);
    $("#profileName").text(response.data.user.name);
  },
  error: function (response) {
    let data = JSON.parse(response.responseText);
    localStorage.removeItem("token");
    location.href = "./login.html?error=" + data.message;
  },
});

function logout() {
  localStorage.clear();

  location.href = "./index.html";
}
