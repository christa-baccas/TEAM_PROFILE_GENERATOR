const fs = require("fs");
const inquirer = require("inquirer");

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const teamMemberList = [];

// prompt for manager
const addManager = () => {
  return inquirer
    .prompt([
      // enter the name of the manager
      {
        type: "input",
        message: "Please enter the name of the manager.",
        name: "name",
      },

      //enter the id of the manager
      {
        type: "input",
        message: "Please enter the ID of the manager",
        name: "id",
      },
      //enter the email of the manager
      {
        type: "input",
        message: "Please enter the email of the manager",
        name: "email",
      },
      //enter the office number of the manager
      {
        type: "input",
        message: "Please enter the office number for the manager",
        name: "number",
      },
    ])
    .then((managerData) => {
      const manager = new Manager(
        managerData.name,
        managerData.id,
        managerData.email,
        managerData.number
      );
      //Push the data into the empty array
      teamMemberList.push(manager);
      // prompt asking if you'd like to add an engineer or intern
      addEmployee(); 
    });
};
addManager();

//prompt question to add an employee (engineer or intern)
const addEmployee = () => {
  return inquirer
    .prompt([
      // select intern or engineer
      {
        type: "list",
        message: "Please select the employees title.",
        name: "title",
        choices: ["Engineer", "Intern", "Exit"],
      },
    ])
    .then((data) => {
      //if statment checking what question prompt should run (engineer or intern or none at all and generate html )
      switch (data.title) {
        case "Engineer":
          return addEngineer();
          break;
        case "Intern":
          return addIntern();
          break;
        case "Exit":
          generateHTML();
          break;
        default:
          console.log(`HTML page generated with team members!`);
          break;
      }
    });
};

//prompt questions for Engineer
const addEngineer = () => {
  return inquirer
    .prompt([
      //enter the name of the engineer
      {
        type: "input",
        message: "Please enter the name of the engineer",
        name: "name",
      },
      //enter the id of the engineer
      {
        type: "input",
        message: "Please enter the ID of the engineer",
        name: "id",
      },
      //enter the email of the engineer
      {
        type: "input",
        message: "Please enter the email of the engineer",
        name: "email",
      },
      //enter the github of the engineer
      {
        type: "input",
        message: "Please enter the github for the engineer",
        name: "github",
      },
    ])
    .then((engineerData) => {
      const engineer = new Engineer(
        engineerData.name,
        engineerData.id,
        engineerData.email,
        engineerData.github
      );
      teamMemberList.push(engineer);
      addEmployee();
    });
};

//Prompt questions for Intern
const addIntern = () => {
  return inquirer
    .prompt([
      //enter the name of the intern
      {
        type: "input",
        message: "Please enter the name of the intern",
        name: "name",
      },
      //enter the id of the intern
      {
        type: "input",
        message: "Please enter the ID of the intern",
        name: "id",
      },
      //enter the email of the intern
      {
        type: "input",
        message: "Please enter the email of the intern",
        name: "email",
      },
      //enter the school of the intern
      {
        type: "input",
        message: "Please enter the name of the school the intern attends.",
        name: "school",
      },
    ])
    .then((internData) => {
      const intern = new Intern(
        internData.name,
        internData.id,
        internData.email,
        internData.school
      );
      teamMemberList.push(intern);
      addEmployee();
    });
};

// //generates the html page
const generateHTML = () => {
  const pageData = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel="stylesheet" href="style.css">
        <title> Team Profile</title>
    </head>
    <body>
        <header >
            <h1>My Team Profile</h1>
        </header>
        <div class="container">
        <div class="row row-cols-1 row-cols-md-3 g-4 my-row">
          ${renderEmployees(teamMemberList)}
        </div>
        </div>
    </body>
    </html>`;
  fs.writeFile("./dis/index.html", pageData, (err) => {
    err ? console.log(err) : console.log("HTML file written!");
  });
};

const renderEmployees = (team) => {
  return team
    .map((emp) => {
      switch (emp.getRole()) {
        case "Manager":
          return `<div class="col-4">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">${emp.getName()}</h4>
              <h5 class="card-title my-title">${emp.getRole()}</h5>
              <p class="card-text">ID: ${emp.getId()}</p>
              <a href="mailto:${emp.getEmail()}">Email: ${emp.getEmail()}</a>
              <p class="card-text">Office Number: ${emp.getOfficeNumber()}</p>
            </div>
          </div>
        </div>`;
        case "Engineer":
          return `<div class="col-4">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">${emp.getName()}</h4>
                    <h5 class="card-title my-title">${emp.getRole()}</h5>
                    <p class="card-text">ID: ${emp.getId()}</p>
                    <a href="mailto:${emp.getEmail()}">Email: ${emp.getEmail()}</a>
                    <a href="https://github.com/${emp.getGithub()}" target="_blank">Github: ${emp.getGithub()}</a>
                  </div>
                </div>
              </div>`;
        case "Intern":
          return `<div class="col-4">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title">${emp.getName()}</h4>
                <h5 class="card-title my-title">${emp.getRole()}</h5>
                <p class="card-text">ID: ${emp.getId()}</p>
                <a href="mailto:Email: ${emp.getEmail()}">Email: ${emp.getEmail()}</a>
                <p class="card-text">School: ${emp.getSchool()}</p>
              </div>
            </div>
          </div>`;
        default:
          console.log('"Error, the getRole function gave unexpected value');
          return "";
      }
    }).join("");
};
