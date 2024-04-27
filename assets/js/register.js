if (localStorage.getItem("token")) {
  location.href = "./index.html";
}

function register(event) {
  event.preventDefault();
  let name = $("#name").val();
  let email = $("#email").val();
  let password = $("#password").val();

  // Do the validation
  const userPattern = /^[a-zA-Z0-9_]{5,}$/;
  const emailPattern = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
  const passPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,10}$/;

  if (!userPattern.test(name)) {
    $("#name").addClass("form-control  text-danger is-invalid");
    $("#helpName")
      .removeClass("d-none")
      .addClass("d-block  text-danger ")
      .html("must contain 5 minimum letter,at least capital letter and number");
  } else if (!emailPattern.test(email)) {
    $("#email").addClass("form-control  text-danger is-invalid");
    $("#helpEmail")
      .removeClass("d-none")
      .addClass("d-block  text-danger ")
      .html("Invalid email");
  } else if (!passPattern.test(password)) {
    $("#password").addClass("form-control  text-danger is-invalid");
    $("#helpPass")
      .removeClass("d-none")
      .addClass("d-block  text-danger")
      .html("must contain 5 minimum letter,at least capital letter and number");
  } else {
    $.ajax({
      url: "http://localhost/codeschool/task-4php/api/register.php",
      method: "POST",
      data: {
        name,
        email,
        password,
      },
      success: (response) => {
        response = JSON.parse(response);
        if (!response.status) {
          alert(response.message);
          return false;
        }
        location.href = "./login.html";
      },
      error: (response) => {
        console.log(response);
      },
    });
  }
}
