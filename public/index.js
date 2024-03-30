
document.getElementById('submitButton').addEventListener('click',function() {
    var userhandle = document.getElementById('userhandle').value.split(',');
    var numberOfQuestions = document.getElementById('numberOfQuestions').value;
    var tags = document.getElementById('tags').value.split(',');
    var rating = document.getElementById('rate').value;


var pdata = {
    userhandle: userhandle,
    numberOfQuestions: numberOfQuestions,
    tags: tags,
    rating: rating
};

class data {
    constructor(){
    this.qname= null;
    this.contestId= null;
    this.index= null;
}
}

fetchUserData(userhandle,tags,numberOfQuestions,rating);

//function to fetch user data
async function fetchUserData(userhandle,tags,numberOfQuestions,rating) {
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
        let searchResults= await searchInCSV(prblmSet,tags,rating);
        console.log(searchResults);
        let finalPrblms=final(searchResults,numberOfQuestions);
        console.log(finalPrblms);
        let finalLst = prblmIds(finalPrblms);
        console.log(finalLst);
        return finalLst;

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

/*
function prblmIds(finalPrblms){
    let finalLst=[];
    let str='';
    for (let i=0; i<finalPrblms.length; i++){
        str = finalPrblms[i][3] + '-' + finalPrblms[i][4];
        finalLst.push(str);
    }
    return finalLst;
}
*/

function prblmIds(finalPrblms){
    let l=[];
    for (let i=0; i<finalPrblms.length; i++){
        const que = new data();
        que.qname = finalPrblms[i][1];
        que.contestId = finalPrblms[i][3];
        que.index = finalPrblms[i][4];
        l.push(que);
    }
    return l
}

async function searchInCSV(prblmSet,tags,rating) {
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
                        //console.log(columns[0]);
                        console.log(rating);
                        if (parseInt(columns[0])==rating){
                            searchResults.push(columns);
                        }  
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