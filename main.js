document.getElementById('issueForm').addEventListener('submit', saveIssue);

//save issue
function saveIssue(e) {
  var issueDesc = document.getElementById('issueDesc').value;
  var issueSeverity = document.getElementById('issueSeverity').value;
  var issueAssignedTo = document.getElementById('issueAssignedTo').value;
  var issueType = document.getElementById('issueType').value;
  var issueId = chance.guid({version: 1});
  var issueStatus = 'Open';
  var issueDateTime = new Date();

  var issue = {
    id: issueId,
    description: issueDesc,
    severity: issueSeverity,
    assignedTo: issueAssignedTo,
    status: issueStatus,
    type: issueType,
    dt: issueDateTime,
  }

  if (localStorage.getItem('issues') == null) {
    var issues = [];
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  } else {
    var issues = JSON.parse(localStorage.getItem('issues'));
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  }

  document.getElementById('issueForm').reset();

  getIssues();

  e.preventDefault();
}

//closing the issue
function setStatusClosed(id) {
  var issues = JSON.parse(localStorage.getItem('issues'));

  for (var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues[i].status = 'Closed';
    }
  }

  localStorage.setItem('issues', JSON.stringify(issues));

  getIssues();
}
//removing the issue
function deleteIssue(id) {
  var issues = JSON.parse(localStorage.getItem('issues'));

  for (var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues.splice(i, 1);
    }
  }

  localStorage.setItem('issues', JSON.stringify(issues));

  getIssues();
}

//rendering the issue
function getIssues() {
  var issues = JSON.parse(localStorage.getItem('issues'));
  var issuesList = document.getElementById('issuesList');

  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    var id = issues[i].id;
    var desc = issues[i].description;
    var severity = issues[i].severity;
    var assignedTo = issues[i].assignedTo;
    var status = issues[i].status;
    var type = issues[i].type;
    var dt = issues[i].dt;
    

    issuesList.innerHTML +=   '<div class="well">'+
                              '<h5 id = "wellId">Issue ID: ' + id + '</h5><br id="br1">'+
                              '<p>Date/Time:' +  dt +'</p>' +
                              '<h6><span class="label label-info">Current Status: ' + status + '</span></h6>'+
                              '<p class="editDesc">Description: ' + desc + '  </p>'+
                              '<p><span class="glyphicon glyphicon-time">Type:</span> ' + type + '</p>'+
                              '<p><span class="glyphicon glyphicon-time">Severity:</span> ' + severity + '</p>'+
                              '<p><span class="glyphicon glyphicon-user">Issue Owner:</span> ' + assignedTo + '</p>'+
                              '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning">Close</a> '+
                              '<a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a> '+
                              '<a href="#" onclick="editIssue(\''+id+'\')"class="btn btn-info" data-toggle="modal" data-target="#myModal">Edit</a>'+
                              '</div>';
  }
}
// function editIssue(id){
  var issues = JSON.parse(localStorage.getItem('issues'));
  var issuesList = document.getElementById('issuesList');

const toggleModal = () => {
  document.querySelector('.modal1')
  .classList.toggle('modal fade modal-dialog modal-dialog-centered');
};

document.querySelector('#saveNewDesc')
.addEventListener('submit', toggleModal);

document.querySelector('#close1').addEventListener('submit', toggleModal);

var updateDesc = document.getElementById("updateDesc").value;
var saveNewDesc = document.getElementById("saveNewDesc").value;


console.log(updateDesc);
console.log({saveNewDesc});
// var issues = JSON.parse(localStorage.getItem('issues'));
//   for (var i = 0; i < issues.length; i++) {
//     if (issues[i].id == id) {
//       var desc = issues[i].description;

          
//   }
//  }

//     localStorage.setItem('issues', JSON.stringify(issues));
  
//   getIssues();
// }




  // var ctx = document.getElementById('myChart').getContext('2d');
  // var chart = new Chart(ctx, {
  //     // The type of chart we want to create
  //     type: 'bar',
  
  //     // The data for our dataset
  //     data: {
  //         labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  //         datasets: [{
  //             label: 'Total Cases',
  //             backgroundColor: 'rgb(255,255,255)',
  //             borderColor: 'rgb(169, 169, 169)',
  //             data: [0, 10, 5, 2, 20, 30, 45]
  //         }]
  //     },
  
      // Configuration options go here
  //     options: {}
  // });

  //filter issues by ID
// var issues = JSON.parse(localStorage.getItem('issues'));
// var issuesList = document.getElementById('issuesList');

// const wellIds = document.querySelector('wellId')
// const searchBar = document.forms["searchBar"].querySelector("input");
// searchBar.addEventListener("keyup", function(e){
//   const searchTerm = e.target.value.toLowerCase();
//   const searchIds = wellIds.getElementsByTagName("h6");
//   Array.from(searchIds).forEach(function(id){
//     const getId = id.firstElementChild.textContent;
//     if(getId.toLowerCase().indexOf(searchTerm)!= -1){
//       id.style.display = "block";
//     } else {
//       id.style.display = "none";
//     }
//   })
// })


