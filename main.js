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
                              '<h5 id = "wellId">Issue ID: ' + id + '</h5><br>'+
                              '<p>Date/Time:' +  dt +'</p>' +
                              '<h6><span class="label label-info">Current Status: ' + status + '</span></h6>'+
                              '<p class="editDesc">Description: ' + desc + '</p>'+
                              '<p><span class="glyphicon glyphicon-time">Type:</span> ' + type + '</p>'+
                              '<p><span class="glyphicon glyphicon-time">Severity:</span> ' + severity + '</p>'+
                              '<p><span class="glyphicon glyphicon-user">Issue Owner:</span> ' + assignedTo + '</p>'+
                              '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning">Close</a> '+
                              '<a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a> '+
                              '<a href="#" onclick="editIssue(\''+id+'\')" class="btn btn-info">Edit</a>'+
                              '</div>';
  }
}

//editing description of issue
function editIssue(id){
    var issues = JSON.parse(localStorage.getItem('issues'));
    var updateDesc = prompt("Enter new description here: ")
    for (var i = 0; i < issues.length; i++) {
      if (issues[i].id == id) {
         issues[i].description = updateDesc;
    } 
  }

    localStorage.setItem('issues', JSON.stringify(issues));
  
    getIssues();
  }

  // var ctx = document.getElementById('myChart').getContext('2d');
  // var myChart = new Chart(ctx, {
  //     type: 'bar',
  //     data: {
  //         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  //         datasets: [{
  //             label: '# of Votes',
  //             data: [12, 19, 3, 5, 2, 3],
  //             backgroundColor: [
  //                 'rgba(255, 99, 132, 0.2)',
  //                 'rgba(54, 162, 235, 0.2)',
  //                 'rgba(255, 206, 86, 0.2)',
  //                 'rgba(75, 192, 192, 0.2)',
  //                 'rgba(153, 102, 255, 0.2)',
  //                 'rgba(255, 159, 64, 0.2)'
  //             ],
  //             borderColor: [
  //                 'rgba(255, 99, 132, 1)',
  //                 'rgba(54, 162, 235, 1)',
  //                 'rgba(255, 206, 86, 1)',
  //                 'rgba(75, 192, 192, 1)',
  //                 'rgba(153, 102, 255, 1)',
  //                 'rgba(255, 159, 64, 1)'
  //             ],
  //             borderWidth: 1
  //         }]
  //     },
  //     options: {
  //         scales: {
  //             yAxes: [{
  //                 ticks: {
  //                     beginAtZero: true
  //                 }
  //             }]
  //         }
  //     }
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


