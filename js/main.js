//Todo list app by Afolabi Sheriff
//features
//store in localstorage of browser
//delete list items


var addButton = document.getElementById('addButton');
var addInput = document.getElementById('itemInput');
var startTime = document.getElementById('startTime');
var endTime = document.getElementById('endTime');
var todoList = document.getElementById('todoList');
var timedOutList = document.getElementById('timedOut');
var image = document.getElementById('image');




var listArray = []
timeOutArray = [];



var h, m, s;
let currDetails = function () {
    var currDate = document.getElementById('date');
    var currTime = document.getElementById('time');
    var today = new Date();
    h = today.getHours();
    m = today.getMinutes();
    s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var time = h + ":" + m + ":" + s;
    currDate.innerText = `Date:: ${date}`;
    currTime.innerText = `Time:: ${time}`;


    var wish = document.getElementById('wish');
    if (h >= 5 && h < 12) {
        wish.innerText = "GOOD MORNING";
        image.src = "https://littlenivi.com/wp-content/uploads/2018/12/28-Amazing-Good-Morning-Quotes-and-Wishes-with-Beautiful-Images-7.jpg"


    }
    else if (h < 18) {
        wish.innerText = "GOOD AFTERNOON";
        image.src = "https://media.istockphoto.com/photos/aerial-view-dramatic-sunset-and-sunrise-sky-nature-background-with-picture-id1183953762?b=1&k=20&m=1183953762&s=170667a&w=0&h=-Ms-xGm6J0W9qUBtAJ5xLhW5ipUnhzF9zbL4lj1d3as="
    }
    else if (h < 21) {
        wish.innerText = "GOOD EVENING";
        image.src = "https://images.unsplash.com/photo-1472120435266-53107fd0c44a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZXZlbmluZyUyMHNreXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
    }
    else {
        wish.innerText = "GOOD NIGHT";
        image.src = "https://images.unsplash.com/photo-1507502707541-f369a3b18502?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bmlnaHR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
    }

    for (let i = 0; i < listArray.length; i++) {

        if (!listArray[i].timedout) {
            var d = new Date();
            var m = d.getMinutes();
            var h = d.getHours();
            if (h == '0') { h = 24 }

            var currentTime = h + "." + m;

            var stime = listArray[i].startTime.split(":");
            var shour = stime[0];
            if (shour == '00') { shour = 24 }
            var smin = stime[1];
            if (h < shour || (h == shour && m < smin)) continue;

            var sTime = shour + "." + smin;


            var etime = listArray[i].endTime.split(":");
            var ehour = etime[0];
            if (ehour == '00') { ehour = 24 }
            var emin = etime[1];
            var eTime = ehour + "." + emin;
            var timeRemaining = (ehour - h) * 60 + (emin - m);
            if (timeRemaining <= 0) {
                listArray[i].timedout = 1;
                refreshLocal()
                location.reload()
                continue;
            }
            // var totalTime = eTime - currentTime;
            console.log(`${timeRemaining} minutes remains`);
        }
        else {
            //console.log(listArray[i].content)
        }
    }

    setTimeout(currDetails, 1000)

}



function checkTime(i) {
    if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
    return i;
}
currDetails();

let refreshTasks = function () {

}




//declare addToList function

function listItemObj(content, status) {
    this.content = '';
    this.status = 'incomplete';
    this.startTime = 0;
    this.endTime = 0;
    this.timeElapsed = 0;
    this.ongoing = 0;
    this.timedout = 0;

}
var changeToComp = function () {
    var parent = this.parentElement;
    console.log(parent)
    console.log('Changed to complete');
    parent.className = 'uncompleted well';
    this.innerText = 'Incomplete';
    this.removeEventListener('click', changeToComp);
    this.addEventListener('click', changeToInComp);
    changeListArray(parent.firstChild.innerText, 'complete');

}

var changeToInComp = function () {
    var parent = this.parentElement;
    console.log('Changed to incomplete');
    parent.className = 'completed well';
    this.innerText = 'Complete';
    this.removeEventListener('click', changeToInComp);
    this.addEventListener('click', changeToComp);

    changeListArray(parent.firstChild.innerText, 'incomplete');

}

var removeItem = function () {
    var parent = this.parentElement.parentElement;

    parent.removeChild(this.parentElement);

    var data = this.parentElement.firstChild.innerText;
    for (var i = 0; i < listArray.length; i++) {

        if (listArray[i].content == data) {
            listArray.splice(i, 1);
            refreshLocal();
            break;
        }
    }


}

//function to change the todo list array
var changeListArray = function (data, status) {

    for (var i = 0; i < listArray.length; i++) {

        if (listArray[i].content == data) {
            listArray[i].status = status;
            refreshLocal();
            break;
        }
    }
}

//function to chage the dom of the list of todo list
var createItemDom = function (newItem, status) {

    var text = newItem.content;
    var listItem = document.createElement('li');
    /* var listContent = document.createElement('div');
    listContent.className = "container" */
    listItem.className = "container d-flex justify-content-around"

    var itemLabel = document.createElement('label');
    var startTimeLabel = document.createElement('button');
    var endTimeLabel = document.createElement('button');


    startTimeLabel.className = 'btn btn-success';
    startTimeLabel.innerText = newItem.startTime;


    endTimeLabel.className = 'btn btn-danger';
    endTimeLabel.innerText = newItem.endTime;


    var itemCompBtn = document.createElement('button');

    var itemIncompBtn = document.createElement('button');

    listItem.className = (status == 'incomplete') ? 'completed well' : 'uncompleted well';

    itemLabel.innerText = text;
    itemCompBtn.className = 'btn btn-success';
    itemCompBtn.innerText = (status == 'incomplete') ? 'Complete' : 'Incomplete';
    if (status == 'incomplete') {
        itemCompBtn.addEventListener('click', changeToComp);
    } else {
        itemCompBtn.addEventListener('click', changeToInComp);
    }


    itemIncompBtn.className = 'btn btn-danger';
    itemIncompBtn.innerText = 'Delete';
    itemIncompBtn.addEventListener('click', removeItem);

    listItem.appendChild(itemLabel);
    listItem.appendChild(startTimeLabel);
    listItem.appendChild(endTimeLabel);


    if (newItem.timedout == 1) {

        //listItem.className = "d - flex justify - content - around my - 3 border border - dark border - 4 py - 3 bg - warning rounded"


    }
    else {
        listItem.appendChild(itemCompBtn);
        listItem.appendChild(itemIncompBtn);
        //listItem.className = "d-flex justify-content-around my-3 border border-dark border-4 py-3 bg-success rounded"
    }


    /* if (newItem.timedout) {
        itemCompBtn.disabled = true;
        itemCompBtn.disabled = true;
        itemInCompBtn.disabled = true;
        startTimeLabel.disabled = true;
        endTimeLabel.disabled = true;
    } */

    return listItem;
}

var refreshLocal = function () {
    var todos = listArray;
    localStorage.removeItem('todoList');
    localStorage.setItem('todoList', JSON.stringify(todos));
}



var addToList = function () {
    var newItem = new listItemObj();
    newItem.content = addInput.value;
    newItem.startTime = startTime.value;
    newItem.endTime = endTime.value;
    listArray.push(newItem);
    //add to the local storage
    refreshLocal();
    //change the dom
    var item = createItemDom(newItem, 'incomplete');
    item.className = "d-flex justify-content-around my-3 border border-dark border-4 py-3 bg-info rounded"
    todoList.appendChild(item);
    addInput.value = '';
    startTime.value = '';
    endTime.value = '';

}

//function to clear todo list array
var clearList = function () {
    listArray = [];
    localStorage.removeItem('todoList');
    todoList.innerHTML = '';

}

window.onload = function () {
    var list = localStorage.getItem('todoList');

    if (list != null) {
        todos = JSON.parse(list);
        listArray = todos;

        for (var i = 0; i < listArray.length; i++) {
            //var data = listArray[i].content;
            if (!listArray[i].timedout) {
                var item = createItemDom(listArray[i], listArray[i].status);
                item.className = "d-flex justify-content-around my-3 border border-dark border-4 py-3 bg-info rounded"
                todoList.appendChild(item);
            }

        }

        for (var i = 0; i < listArray.length; i++) {
            //var data = listArray[i].content;
            if (listArray[i].timedout) {
                var item = createItemDom(listArray[i], listArray[i].status);
                item.className = "d-flex justify-content-around my-3 border border-dark border-4 py-3 bg-warning rounded"
                timedOutList.appendChild(item);
            }

        }



    }

};
//add an event binder to the button
addButton.addEventListener('click', addToList);
clearButton.addEventListener('click', clearList);
