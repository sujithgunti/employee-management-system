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
    url: "http://localhost/codeschool/task-4php/api/getAllSalaries.php",
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
function convertMonth(month) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months[month - 1];
}
function DisplayData(users) {
  let t = "";
  users.forEach((user) => {
    return (t += `
            <tr class="bg-white">
                <th class="py-3 text-center" scope="row">${user.sno}</th>
                <td class="py-3 text-center">${user.fullname}</td>
                <td class="py-3 text-center">${convertMonth(
                  user.salary_month
                )}</td>
                <td class="py-3 text-center">${user.salary_year}</td>
                <td class="py-3 text-center">${user.paid_on}</td>
                <td class="py-3 text-center">${user.gross}</td>
                <td class="py-3 text-center">${user.deduction}</td>
                <td class="py-3 text-center">${user.net}</td>
                <td class="py-3 text-center">
                <button type="button" class="btn btn-success btn-sm " data-bs-toggle="modal" data-bs-target="#viewComponentModal" id="${
                  user.id
                }"   onclick="getSingleSalaryComponent(this)">
                View
              </button>
              </tr>
           `);
  });
  $("#employDetails").html(t);
}

function getSingleSalaryComponent(ele) {
  id = $(ele).attr("id");
  console.log(id);

  $.ajax({
    url: "http://localhost/codeschool/task-4php/api/getSingleSalaryComponent.php",
    method: "POST",
    data: {
      id,
    },
    success: (response) => {
      response = JSON.parse(response);
      $("#viewName").text(response.data.details.fullname);
      $("#viewLocation").text(response.data.details.district);
      $("#viewNet").text(response.data.details.net);
      $("#viewStatus").text(response.data.details.work_description);
      $("#viewPosition").text(response.data.details.designation_description);

      let t = "",
        d = "";
      for (let i = 0; i < response.data.salaries.length; i++) {
        if (i < 6) {
          t += `
                    <tr>
                      <td>${response.data.salaries[i].salary_description}</td>
                      <td class="text-center">${response.data.salaries[i].amount}</td>
                    </tr> `;
        } else {
          d += `
                    <tr>
                    <td>${response.data.salaries[i].salary_description}</td>
                    <td class="text-center">${response.data.salaries[i].amount}</td>
                    </tr> `;
        }
      }
      t += `
             <tr>
               <td class="fw-bold">Total</td>
               <td class="fw-bold text-center ">${response.data.details.gross}</td>
             </tr> `;
      d += `
             <tr>
               <td class="fw-bold">Total</td>
               <td class="fw-bold text-center ">${response.data.details.deduction}</td>
             </tr> `;
      $("#viewEarings").html(t);
      $("#viewDeduction").html(d);
    },
    error: (response) => {
      console.log(response);
    },
  });
}

$.ajax({
  url: "http://localhost/codeschool/task-4php/api/getAllEmployees.php",
  method: "GET",
  success: function (response) {
    response = JSON.parse(response);
    let t = "";
    response.data.user.forEach((employee) => {
      return (t += `
                <option value="${employee.id}">${employee.first_name}  ${employee.last_name} </option>
               `);
    });
    $("#employeeName").html(t);
  },
  error: function (response) {
    let data = JSON.parse(response.responseText);
    localStorage.removeItem("token");
    location.href = "./login.html?error=" + data.message;
  },
});

function addSalary() {
  var id = $("#employeeName").val();
  let salary_month = $("#salary_month").val();
  let salary_year = $("#salary_year").val();
  let paid_on = $("#Paid_on").val();
  let gross = $("#Gross").val();
  let deduction = $("#Deduction").val();
  let net = $("#Net").val();
  console.log(id, salary_month, salary_year, paid_on, gross, deduction, net);
  $.ajax({
    url: "http://localhost/codeschool/task-4php/api/addSalary.php",
    method: "POST",
    data: {
      id,
      salary_month,
      salary_year,
      paid_on,
      gross,
      deduction,
      net,
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

  $.ajax({
    url: "http://localhost/codeschool/task-4php/api/getEmployeeSalaries.php",
    method: "POST",
    data: {
      id,
    },
    success: function (response) {
      response = JSON.parse(response);
      let len = response.data.salaries.length - 1;
      let id = response.data.salaries[len].id;
      console.log(id);
      let basic = $("#addbasic").val();
      let DA = $("#addDA").val();
      let HRA = $("#addHRA").val();
      let CA = $("#addCA").val();
      let Medical_Allowance = $("#addMedical_Allowance").val();
      let Bonus = $("#addBonus").val();
      let TDS = $("#addTDS").val();
      let PF = $("#addPF").val();
      console.log(id, basic, DA, HRA, CA, Medical_Allowance, Bonus, TDS, PF);
      $.ajax({
        url: "http://localhost/codeschool/task-4php/api/addSalaryDetails.php",
        method: "POST",
        data: {
          id,
          basic,
          DA,
          HRA,
          CA,
          Medical_Allowance,
          Bonus,
          TDS,
          PF,
        },
        success: function (response) {
          console.log(response);
        },
        error: function (response) {
          let data = JSON.parse(response.responseText);
          console.log(data);
          localStorage.removeItem("token");
          location.href = "./login.html?error=" + data.message;
        },
      });
    },
    error: function () {
      let data = JSON.parse(response.responseText);
      console.log(data);
      localStorage.removeItem("token");
      location.href = "./login.html?error=" + data.message;
    },
  });

  // window.location.reload();
}
