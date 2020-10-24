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

//edit button
  document.getElementById('editDescModal').addEventListener('submit', updateDesc);
  function updateDesc() {
    var issues = JSON.parse(localStorage.getItem('issues'));
    var newDesc = document.getElementById("bookId").value;
  for (var i = 0; i < issues.length; i++) {
      issues[i].description = newDesc;
      localStorage.setItem('issues', JSON.stringify(issues));
    getIssues();
  }}

// var searchBar = document.getElementById('searchBar');

// let searchArray = [];
// console.log(searchBar);

// searchBar.addEventListener('keyup', (e) => {
//   const searchString = e.target.value;
//   const filteredIssues =  searchArray.filter(issues => {
//     return issues.id.contain(searchString);
//   });
//   console.log(filteredIssues);
// })
// function searchIssues(){
//   var issues = JSON.parse(localStorage.getItem('issues'));
//   var issuesList = document.getElementById('issuesList');
//    let searchArray = [];
//   for (var i = 0; i < issues.length; i++) {
//     var id = issues[i].id;
//     searchArray.push(id);
//     console.log(searchArray)
//     localStorage.setItem('issues', JSON.stringify(issues));
//     getIssues();
//   }}
//   searchIssues();
//   console.log(searchArray)







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
                              '<a data-toggle="modal" title="Add to description" class="open-AddBookDialog btn btn-info" href="#addBookDialog" data-target="#exampleModalCenter">Edit Description</a>'+
                              '</div>';
                              
  }
}
