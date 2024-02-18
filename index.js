document.getElementById('submitButton').addEventListener('click',function() {
    var userhandle = document.getElementById('userhandle').value;
    var numberOfQuestions = document.getElementById('numberOfQuestions').value;
    var tags = document.getElementById('tags').value.split(',');


var data = {
    userhandle: userhandle,
    numberOfQuestions: numberOfQuestions,
    tags: tags
};


var jsonData = JSON.stringify(data);
let p=fetch('https://codeforces.com/api/user.status?handle='+data.userhandle);
let q=fetch('https://codeforces.com/api/problemset.problems?tags=');

q.then(response => response.json()).then(
    total => {
        let t=[];
        t=all(total);
        console.log(t);
    
    

p.then(response => response.json())
.then(data => {
    var tableContainer = document.getElementById('tableContainer');

    var table = document.createElement('table');

    var thead = document.createElement('thead');
    var headerRow = document.createElement('tr');

    let problems=[];
    problems=problem(data.result);
    console.log(problems);

    let f=[];
    f=final(t,problems,numberOfQuestions);
    console.log(f);


})

    /*Object.keys(data[0]).forEach(key => {
        var th = document.createElement('th');
        th.textContent = key;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    var tbody = document.createElement('tbody');
    data.forEach(item => {
        var row = document.createElement('tr');
        Object.values(item).forEach(value => {
            var td = document.createElement('td');
            td.textContent = value;
            row.appendChild(td);
        });
        tbody.appendChild(row);
    });
    table.appendChild(tbody);
    tableContainer.appendChild(table);*/
})
.catch((error) => {
    console.error('Error: ',error);
});

});

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

function all(total){            //list of all problems
    let t=[];
    for (let i=0; i<total.result.problems.length; i++){
        t.push(total.result.problems[i].name);
    }
    
    return t;
    }

function final(t,p,numberOfQuestions){      //list of not solved que
    let f=[];
    for (let i=0; i<t.length; i++){
        if (!p.includes(t[i])){
            f.push(t[i]);
        }
        if (f.length == numberOfQuestions){
            break;
        }
    }
    return f;
    
    
}
