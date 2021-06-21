 //@TODO: Uncomment the following file and complete the code
 //       according to the instructions in README.md.

 //Roster of player
 var roster = [{
   name: "Doug",
   position: "Quarterback",
   madeTeam: true
 },
 {
   name: "Antonio",
   position: "Tight End",
   madeTeam: true
 },
 {
   name: "Nick",
   position: "Kicker",
   madeTeam: false
 },
 {
   name: "Ereck",
   position: "Offensive Live",
   madeTeam: false
},
 {
   name: "AJ",
   position: "Line Backer",
   madeTeam: true
 }];

// YOUR CODE HERE

function whoMadeTeam(player){
    return player.madeTeam===true;
}

var the_team=roster.filter(whoMadeTeam);

console.log(the_team);
console.log(`${the_team.length} players made the team`)
console.log(`${roster.length-the_team.length} didn't make  the team`)

