let ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('userdata');

function doGet(){
  var template = HtmlService.createTemplateFromFile('loginpage');
  template.message = '';
  template.color = '';
  return template.evaluate().setTitle('Login Page');
}

function getUrl(){
  return ScriptApp.getService().getUrl();
}

function doPost(e){
  var userdata = ss.getDataRange().getValues();
  for(var i=1; i<userdata.length; i++){
    if(userdata[i][0] == e.parameter.id && userdata[i][2] == e.parameter.password){
      var output = HtmlService.createTemplateFromFile('ranking');
      output.username = userdata[i][1];
      output.id = userdata[i][0];
      return output.evaluate().setTitle('Home');
    }else if(e.parameter.LogoutButton == 'Logout'){
      var template = HtmlService.createTemplateFromFile('loginpage');
      template.message = '';
      template.color = '';
      return template.evaluate();
    }
  }
  var template = HtmlService.createTemplateFromFile('loginpage');
  template.message = 'Username or password wrong';
  template.color = 'red';
  return template.evaluate().setTitle('Login Page');
}
