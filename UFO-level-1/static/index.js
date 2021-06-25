//THE FORMS------------------------------------------------------------------
//label and reorder more logically
//alphabetize
//set button events for filter
var resetButton = d3.select("#reset");//resets filter
resetButton.on("click",initialTable);

var dateField= d3.select("#date-field");//filter for date
dateField.on("change", filteredDateTable);

var shapeField= d3.select("#shape");//filter for shape
shapeField.on("change", filteredDateTable);

var countryField= d3.select("#country");//filter for shape
countryField.on("change", filteredDateTable);

var stateField= d3.select("#state");//filter for shape
stateField.on("change", filteredDateTable);

var cityField= d3.select("#city");//filter for shape
cityField.on("change", filteredDateTable);

function dropDowns(theField,theData,theColumn){

  //create dropdown
  theField.html("");//clears dynamic dropdown
  var theValues=theData.map(function(item){//finds all the shapes
    return Object.values(item)[theColumn];
  });
  //console.log(theValues);
  theField.append("option").text('All').attr('value','All');
  var uniqueValues=[];
  theValues.forEach(thevalue=>{
    if (uniqueValues.includes(thevalue));//if shape is already found skip
    else {//if shape is first time appearing add to dropdown menu
      theField.append("option").text(thevalue).attr('value',thevalue);
      uniqueValues.push(thevalue);
    };
  });
}
 

//THE TABLE SETUP------------------------------------------------------------------

//use D3 to select table elements
var table=d3.select("table");
//use D3 to select table head
 var thead=d3.select("thead");
 //use D3 to select table body
var tbody=d3.select("tbody");


//append header column names for Table
var columnNames=['date/time', 'city', 'state', 'country', 'shape','durationMinutes:','comments'];
var row = thead.append("tr");
columnNames.forEach(columnName => row.append("th").text(columnName));


//initial data add to table
function initialTable(){

    tbody.html(""); //clears table body
    
    //prevents from reloading if reset button is hit
    if (d3.event !=null){
      d3.event.preventDefault();
    };
    
    //populate table
    data.forEach(sighting => {

    var row =tbody.append("tr")
    Object.entries(sighting).forEach(([key,value]) => {
       row.append("td").text(value); 
    }); 
  }); 
};

//THE FILTERED TABLE INFORMTATON------------------------------------------------------------------

//function for filtered table
function filteredDateTable(){
  if (d3.event){
    var triggerValue=d3.event.target.name;
    if (triggerValue==="") triggerValue="textField";//returns textfield if the event was text change
    //console.log('hit')
  }
  else {
    var triggerValue="";
  }
  
  d3.event.preventDefault();// Prevent the page from refreshing
  tbody.html(""); //clears table body

  var filtered_data=data;
  if (triggerValue!="textField"){
      filtered_data=filtered_data.filter(selectCountry);
    if (triggerValue==="Country" || triggerValue===""){
      dropDowns(stateField,filtered_data,2);
    }
    filtered_data=filtered_data.filter(selectState);
    
    if (triggerValue==="State" || triggerValue==="Country" || triggerValue===""){ 
      dropDowns(cityField,filtered_data,1);
    }
    filtered_data=filtered_data.filter(selectCity);
  }
  else {
    filtered_data=filtered_data.filter(selectCountry);
    filtered_data=filtered_data.filter(selectState);
    filtered_data=filtered_data.filter(selectCity);
  }
    filtered_data=filtered_data.filter(selectDate);
    filtered_data=filtered_data.filter(selectShape);
    
    filtered_data.forEach(sighting => {
        var row =tbody.append("tr");
        Object.entries(sighting).forEach(([key,value]) => row.append("td").text(value));   
    })
  
}



//Custom Filter Functions

//Date Filter
function selectDate(theDate){
  if (dateField.property("value")===""){
    return theDate.datetime;
  }
  else {
    return theDate.datetime === dateField.property("value");
  }
};

function selectCountry(theCountry){
  if (countryField.property("value")==="All"){
    return theCountry.country;
  }
  else{
    return theCountry.country === countryField.property("value");
  }
};

function selectState(theState){
  if (stateField.property("value")==="All"){
    return theState.state;
  }
  return theState.state === stateField.property("value");
};

function selectCity(theCity){
  if (cityField.property("value")==="All"){
    return theCity.city;
  }
  return theCity.city === cityField.property("value");
};

function selectShape(theShape){
  if (shapeField.property("value")===""){
    return theShape.shape;
  }
  return theShape.shape === shapeField.property("value");
};

//MAIN-------------------------------------------------------------------------

//initialize table on load
initialTable();
dropDowns(countryField,data,3);
dropDowns(stateField,data,2);
dropDowns(cityField,data,1);
