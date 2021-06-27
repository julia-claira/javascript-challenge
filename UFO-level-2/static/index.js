//The Filter Selection Form------------------------------------------------------------------

//User Events
var resetButton = d3.select("#reset");//resets filter
resetButton.on("click",resetTable);

var dateField= d3.select("#date-field");//filter for date
dateField.on("change", filteredTable);

var shapeField= d3.select("#shape");//filter for shape
shapeField.on("change", filteredTable);

var countryField= d3.select("#country");//filter for country
countryField.on("change", filteredTable);

var stateField= d3.select("#state");//filter for state
stateField.on("change", filteredTable);

var cityField= d3.select("#city");//filter for city
cityField.on("change", filteredTable);


//Function For Dynamic Dropdown Menus -- State Dropdown options update if Country changes///City Dropdown options update if State changes
function dropDowns(theField,theData,theColumn){

  theField.html("");//clears dynamic dropdown
  
  
  var theValues=theData.map(function(item){//finds all the values
    return Object.values(item)[theColumn];
  });
  
  theField.append("option").text('All').attr('value','All');//adds "All" to dropdown as default
  
  var uniqueValues=[];//holds all the unique values to populate the dropdown
  theValues.forEach(thevalue=>{
    if (uniqueValues.includes(thevalue));//if value is already in array skip
    else {//if value is first time appearing add to dropdown array
      uniqueValues.push(thevalue);
    };
  });
  //alphabetizes array and appends the dropdown
  uniqueValues.sort();
  uniqueValues.forEach((item) => {
    theField.append("option").text(item).attr('value',item);
  });
};
 

//Function to Populate Filtered Table-------------------------------------------------------------------------

function filteredTable(){
  
  tbody.html(""); //clears table body
  var filtered_data=data;//stores data in temporary variable
  

  if (d3.event){//if the function is triggered by a user event
    d3.event.preventDefault();// prevent the page from refreshing  
    var triggerValue=d3.event.target.id//stores the trigger event so dropbox options can dynamically update
  }
  else {
    var triggerValue="reset";//no trigger event if page is just loaded
  }
  

  //depending on the trigger event, this will regenerate dropdown options for state and/or city
  if (triggerValue!="date-field" && triggerValue!="shape" && triggerValue !="reset"){//if this is triggered by an event change in the dropdown options
      filtered_data=filtered_data.filter(selectCountry);
    if (triggerValue==="country"){
      dropDowns(stateField,filtered_data,2);//regenerates state dropdown options if Country is changed
    }
    filtered_data=filtered_data.filter(selectState);
    
    if (triggerValue==="state" || triggerValue==="country"){ 
      console.log('yes')
      dropDowns(cityField,filtered_data,1);// regnerates city dropdown options if Country or State is changed.
    }
    filtered_data=filtered_data.filter(selectCity);
  }
  //if country, state, or city is NOT the trigger event, filter table without regenerating their dropdown options
  else {
    
    filtered_data=filtered_data.filter(selectCountry);
    filtered_data=filtered_data.filter(selectState);
    filtered_data=filtered_data.filter(selectCity);
  }
  
  //filters table by date and shape
  filtered_data=filtered_data.filter(selectDate);
  filtered_data=filtered_data.filter(selectShape);
   
  //Populates the table with the now filtered data based on user selection
  filtered_data.forEach(sighting => {
    var row =tbody.append("tr");
    Object.entries(sighting).forEach(([key,value]) => row.append("td").text(value));   
  })
  
}

//Custom Filter Functions-------------------------------------------------------------------

//Date Filter
function selectDate(theDate){
  if (dateField.property("value")===""){
    return theDate.datetime;
  }
  else {
    return theDate.datetime === dateField.property("value");
  }
};

//Country Filter
function selectCountry(theCountry){
  if (countryField.property("value")==="All"){
    return theCountry.country;
  }
  else{
    return theCountry.country === countryField.property("value");
  }
};

//State Filter
function selectState(theState){
  if (stateField.property("value")==="All"){
    return theState.state;
  }
  return theState.state === stateField.property("value");
};

//City Filter
function selectCity(theCity){
  if (cityField.property("value")==="All"){
    return theCity.city;
  }
  return theCity.city === cityField.property("value");
};

//Shape Filter
function selectShape(theShape){
  if (shapeField.property("value")===""){
    return theShape.shape;
  }
  return theShape.shape === shapeField.property("value");
};

//Function to Reset Table----------------------------------------------------------
function resetTable(){

  dateField.property("value","")
  shapeField.property("value","")
  dropDowns(countryField,data,3);
  dropDowns(stateField,data,2);
  dropDowns(cityField,data,1);

  filteredTable();
}

//MAIN-----------------------------------------------------------------------------------------


//use D3 to select table elements
var table=d3.select("#ufo-table");
//use D3 to select table head
var thead=d3.select("thead");
 //use D3 to select table body
var tbody=d3.select("tbody");


//Append header column names for Table
var columnNames=['Date/Time', 'City', 'State', 'Country', 'Shape','Duration-Minutes:','Comments'];
var row = thead.append("tr");
columnNames.forEach(columnName => row.append("th").text(columnName));


//populate table on load
resetTable();
