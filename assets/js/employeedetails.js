if (!localStorage.getItem("token")) {
  location.href = "./login.html";
}

function logout() {
  localStorage.clear();
  location.href = "./index.html";
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

function RenderData() {
  $.ajax({
    url: "http://localhost/codeschool/task-4php/api/getAllEmployees.php",
    method: "GET",
    success: function (response) {
      response = JSON.parse(response);
      DisplayData(response.data.user);
      console.log(response.data);
    },
    error: function (response) {
      let data = JSON.parse(response.responseText);
      localStorage.removeItem("token");
      location.href = "./login.html?error=" + data.message;
    },
  });
}

RenderData();

function DisplayData(users) {
  let t = "";
  users.forEach((user) => {
    return (t += `
            <tr>
            <th class="py-3 text-center" scope="row">${user.id}</th>
                <td class="py-3 text-center">${user.first_name} ${user.last_name} </td>
                <td class="py-3 text-center">${user.date_of_joining}</td>
                <td class="py-3 text-center">${user.date_of_birth}</td>
                <td class="py-3 text-center">${user.gender}</td>
                <td class="py-3 text-center">${user.work_description}</td>
                <td class="py-3 text-center">${user.designation_description}</td>
                <td class="py-3 text-center">${user.district}</td>
                <td class="py-3 text-center">${user.gross}</td>
                <td class="py-3 text-center">
                <button type="button" class="btn btn-success btn-sm " data-bs-toggle="modal" data-bs-target="#viewModal" id="${user.id}"   onclick="viewEmployee(this)">
                View
              </button>
                </td>
                <td class="py-3 text-center">
                <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#modalUpdateEmployee" id="${user.id}" onclick="getSingleEmployee(this)">
                Edit
                </button>
                </td>
                <td class="py-3 text-center">
                <button type="button" class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#deleteModal" id="${user.id}"   onclick="deleteEmployee(this)">
                  delete
                </button>
              </td>
            </tr>
           `);
  });
  $("#employDetails").html(t);
}

function addEmployee() {
  let first_name = $("#firstName").val();
  let last_name = $("#lastName").val();
  let date_of_joining = $("#dateOfJoining").val();
  let date_of_birth = $("#dateOfBirth").val();
  let gender = $("#Gender").val();
  let phone_no = 0;
  let working_status_id = $("#Working_status_id").val();
  let designation_id = $("#Designation").val();
  let location_id = $("#employeelocation").val();
  let gross = $("#gross").val();
  console.log(
    first_name,
    last_name,
    date_of_birth,
    date_of_joining,
    gender,
    phone_no,
    working_status_id,
    designation_id,
    location_id,
    gross
  );
  $.ajax({
    url: "http://localhost/codeschool/task-4php/api/addEmployee.php",
    method: "POST",
    data: {
      first_name,
      last_name,
      date_of_joining,
      date_of_birth,
      gender,
      phone_no,
      working_status_id,
      designation_id,
      location_id,
      gross,
    },
    success: function (response) {
      console.log(response);
    },
    error: function (response) {
      let data = JSON.parse(response.responseText);
      localStorage.removeItem("token");
      location.href = "./login.html?error=" + data.message;
    },
  });
  window.location.reload();
}
var id = 0;
function deleteEmployee(ele) {
  id = $(ele).attr("id");
  console.log(id);
}
function sureDelete() {
  $.ajax({
    url: "http://localhost/codeschool/task-4php/api/deleteEmployee.php",
    method: "POST",
    data: {
      id,
    },
    success: (response) => {
      response = JSON.parse(response);
      console.log(response);
    },
    error: (response) => {
      console.log(response);
    },
  });
  window.location.reload();
}

function getSingleEmployee(ele) {
  id = $(ele).attr("id");
  console.log(id);

  $.ajax({
    url: "http://localhost/codeschool/task-4php/api/getSingleEmployee.php",
    method: "POST",
    data: {
      id,
    },
    success: (response) => {
      response = JSON.parse(response);
      $("#updatefirstName").val(response.data.employee.first_name);
      $("#updatelastName").val(response.data.employee.last_name);
      $("#updatedateOfJoining").val(response.data.employee.date_of_joining);
      $("#updatedateOfBirth").val(response.data.employee.date_of_birth);
      $("#updateGender").val(response.data.employee.gender);
      $("#updateWorking_status_id").val(
        response.data.employee.working_status_id
      );
      $("#updateDesignation").val(response.data.employee.designation_id);
      $("#updatelocation").val(response.data.employee.location_id);
      $("#updategross").val(response.data.employee.gross);
    },
    error: (response) => {
      console.log(response);
    },
  });
}

function updateEmployee() {
  let first_name = $("#updatefirstName").val();
  let last_name = $("#updatelastName").val();
  let date_of_joining = $("#updatedateOfJoining").val();
  let date_of_birth = $("#updatedateOfBirth").val();
  let gender = $("#updateGender").val();
  let phone_no = 0;
  let working_status_id = $("#updateWorking_status_id").val();
  let designation_id = $("#updateDesignation").val();
  let location_id = $("#updatelocation").val();
  let gross = $("#updategross").val();

  $.ajax({
    url: "http://localhost/codeschool/task-4php/api/updateEmployee.php",
    method: "POST",
    data: {
      id,
      first_name,
      last_name,
      date_of_joining,
      date_of_birth,
      gender,
      phone_no,
      working_status_id,
      designation_id,
      location_id,
      gross,
    },
    success: function (response) {
      console.log(response);
    },
    error: function (response) {
      let data = JSON.parse(response.responseText);
      localStorage.removeItem("token");
      location.href = "./login.html?error=" + data.message;
    },
  });
  window.location.reload();
}

function viewEmployee(ele) {
  id = $(ele).attr("id");
  console.log(id);

  $.ajax({
    url: "http://localhost/codeschool/task-4php/api/getEmployeeSalaries.php",
    method: "POST",
    data: {
      id,
    },
    success: (response) => {
      response = JSON.parse(response);

      let t = "";
      response.data.salaries.forEach((salary) => {
        return (t += `
            <tr class="text-center">
            <td>${salary.salary_month}</td>
            <td>${salary.salary_year}</td>
            <td>${salary.paid_on}</td>
            <td>${salary.gross}</td>
            <td>${salary.deduction}</td>
            <td>${salary.net}</td>
          </tr>
           `);
      });
      $("#viewTable").html(t);
    },
    error: (response) => {
      console.log(response);
    },
  });
}
