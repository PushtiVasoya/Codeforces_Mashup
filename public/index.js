
document.getElementById('submitButton').addEventListener('click',function() {
    var userhandle = document.getElementById('userhandle').value.split(',');
    var numberOfQuestions = document.getElementById('numberOfQuestions').value;
    var tags = document.getElementById('tags').value.split(',');


var pdata = {
    userhandle: userhandle,
    numberOfQuestions: numberOfQuestions,
    tags: tags
};

/*
var jsonData = JSON.stringify(pdata);
for (let i=0; i<userhandle.length; i++){
    let finalProblems=[]
    let p=fetch('https://codeforces.com/api/user.status?handle='+pdata.userhandle);

p.then(response => response.json())
.then(data => {
    var tableContainer = document.getElementById('tableContainer');
    var table = document.createElement('table');
    var thead = document.createElement('thead');
    var headerRow = document.createElement('tr');

    let problems=[];
    problems=problem(data.result);
    //console.log(problems);
    finalProblems.push[problems];
    console.log(finalProblems);

    let f=[];
    f=final(t,problems,numberOfQuestions);
    console.log(f);
    console.log(pdata);
    display(pdata);
    })
.catch((error) => {
    console.error('Error: ',error);
});
}
*/

fetchUserData(userhandle,tags,numberOfQuestions);

//function to fetch user data
async function fetchUserData(userhandle,tags,numberOfQuestions) {
    try {
        let prblmSet=[];
        for (let i = 0; i < userhandle.length; i++){
            console.log(userhandle[i]);
            const api='https://codeforces.com/api/user.status?handle=' + userhandle[i];
            const response = await fetch(api);
            const d = await response.json();
            //console.log(d.result);
            const problems=problem(d.result);
            console.log(problems);
            prblmSet.push(...problems);
        }
        console.log(prblmSet);
        console.log(tags);
        let searchResults= await searchInCSV(prblmSet,tags);
        console.log(searchResults);
        let finalPrblms=final(searchResults,numberOfQuestions);
        console.log(finalPrblms);
        return finalPrblms;

    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
}

function problem(data){         //list of problems solved by user
    let problems=[];
    for (let i=0; i<data.length; i++){
        let x=data[i].problem.name;
        if (!problems.includes(x)){
            problems.push(x);
        }
    }   
    return problems;
}


function final(searchResults,numberOfQuestions){      //list of not solved que
    let f=[];
    while (true){
        var j= Math.floor(Math.random() * (searchResults.length-1));
        if (!f.includes(searchResults[j])){
            f.push(searchResults[j]);
        }
        if (f.length == numberOfQuestions){
            break;
        }
    }
    return f;      
};


async function searchInCSV(prblmSet,tags) {
    try {
        const response = await fetch('data.csv');
        const csvData = await response.text();

        let searchResults = [];
        
        // Spliting CSV data into rows and search each row
        const rows = csvData.split('\n');
        rows.forEach(row => {
            const columns = row.split(',');
            if (columns.length > 1 && !columns[1].includes(prblmSet)) {     // name check for problems
                const options =columns[2].split(';');                       // tag check for problems
                //console.log(options);
                if (tags != ['']){
                    if (tags.some(item => options.includes(item))){
                        searchResults.push(columns);
                    }
                }
                else{
                    searchResults.push(columns); 
                }
            }
            else{
                console.log("No such tag or problem exists.");
            }  
        });
        
        //console.log(searchResults);
        return searchResults;
    } catch (error) {
        console.error('Error searching in CSV:', error);
        return null;
    }
}
});