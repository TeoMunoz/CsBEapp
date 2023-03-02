//Entry Class: Represent each entry in the parking lot
class Entry{
    constructor(name,lastname,room,entryDateRoom,exitDateRoom){
        this.name = name;
        this.lastname = lastname;
        this.room = room;
        this.entryDateRoom = entryDateRoom;
        this.exitDateRoom = exitDateRoom;
    }
}
//UI Class: Handle User Interface Tasks
class UI{
    static displayEntries(){
   
        const entries = Store.getEntriesRoom();
        entries.forEach((entry) => UI.addEntryToTableRoom(entry));
    }
    static addEntryToTableRoom(entry){
        const tableBodyRooms=document.querySelector('#tableBodyRooms');
        const row = document.createElement('tr');
        row.innerHTML = `   <td>${entry.name}</td>
                            <td>${entry.lastname}</td>
                            <td>${entry.room}</td>
                            <td>${entry.entryDateRoom}</td>
                            <td>${entry.exitDateRoom}</td>
                            <td><button class="btn btn-danger delete">X</button></td>
                        `;
        tableBodyRooms.appendChild(row);
    }
    static clearInput(){
        //Selects all the inputs
        const inputs = document.querySelectorAll('.form-control');
        //Clear the content of each input
        inputs.forEach((input)=>input.value="");
    }
    static deleteEntry(target){
        if(target.classList.contains('delete')){
            target.parentElement.parentElement.remove();
        }
    }
    static showAlert(message,className){
        const div = document.createElement('div');
        div.className=`alert alert-${className} w-50 mx-auto`;
        div.appendChild(document.createTextNode(message));
        const formContainer = document.querySelector('.form-container');
        const form = document.querySelector('#entryForm');
        formContainer.insertBefore(div,form);
        setTimeout(() => document.querySelector('.alert').remove(),3000);
    }
    static validateInputs(){
        const name = document.querySelector('#name').value;
        const lastname = document.querySelector('#lastname').value;
        const room = document.querySelector('#room').value;
        const entryDateRoom = document.querySelector('#entryDateRoom').value;
        const exitDateRoom = document.querySelector('#exitDateRoom').value;
        var roomRegex = /^(?:[A-Z]{2}-\d{2}-\d{2})|(?:\d{2}-[A-Z]{2}-\d{2})|(?:\d{2}-\d{2}-[A-Z]{2})$/;
        if(name === '' || lastname === '' || room === '' || entryDateRoom === '' || exitDateRoom === ''){
            UI.showAlert('All fields must me filled!','danger');
            return false;
        }
        if(exitDateRoom < entryDateRoom){
            UI.showAlert('Exit Date cannot be lower than Entry Date','danger');
            return false;
        }
        if(!roomRegex.test(room)){
            UI.showAlert('License Plate must be like NN-NN-LL, NN-LL-NN, LL-NN-NN','danger');
            return false;
        }
        return true;
    }
}
//Store Class: Handle Local Storage
class Store{
    static getEntriesRoom(){
        let entries;
        if(localStorage.getItem('entries') === null){
            entries = [];
        }
        else{
            entries = JSON.parse(localStorage.getItem('entries'));
        }
        return entries;
    }
    static addEntriesRoom(entry){
        const entries = Store.getEntriesRoom();
        entries.push(entry);
        localStorage.setItem('entries', JSON.stringify(entries));
    }
    static removeEntries(room){
        const entries = Store.getEntriesRoom();
        entries.forEach((entry,index) => {
            if(entry.room === room){
                entries.splice(index, 1);
            }
        });
        localStorage.setItem('entries', JSON.stringify(entries));
    }
}
//Event Display
    document.addEventListener('DOMContentLoaded',UI.displayEntries);
//Event Add
    document.querySelector('#entryForm').addEventListener('submit',(e)=>{
        e.preventDefault();
        
        //Declare Variables
        const name = document.querySelector('#name').value;
        const lastname = document.querySelector('#lastname').value;
        const room = document.querySelector('#room').value;
        const entryDateRoom = document.querySelector('#entryDateRoom').value;
        const exitDateRoom = document.querySelector('#exitDateRoom').value;
        if(!UI.validateInputs()){
            return;
        }
        //Instatiate Entry
        const entry = new Entry(name, lastname, room, entryDateRoom, exitDateRoom);
        //Add the entry do de UI table
        UI.addEntryToTableRoom(entry);
        Store.addEntriesRoom(entry);
        //Delete content of input's
        UI.clearInput();

        UI.showAlert('Room successfully added to the booking lot','success');

    });
//Event Remove
    document.querySelector('#tableBodyRooms').addEventListener('click',(e)=>{
        //Call to UI function that removes entry from the table
        UI.deleteEntry(e.target);
        //Get license plate to use as unique element of an entry
        var room = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
        //Call to Store function to remove entry from the local storage
        Store.removeEntries(room);
        //Show alert that entry was removed
        UI.showAlert('Room successfully removed from the booking lot list','success');
    })

//Event Search
    document.querySelector('#searchInputRoom').addEventListener('keyup', function searchTable(){
        //Get value of the input search
        const searchValue = document.querySelector('#searchInputRoom').value.toUpperCase();
        //Get all lines of table body
        const tableLine = (document.querySelector('#tableBodyRooms')).querySelectorAll('tr');
        //for loop #1 (used to pass all the lines)
        for(let i = 0; i < tableLine.length; i++){
            var count = 0;
            //Get all collumns of each line
            const lineValues = tableLine[i].querySelectorAll('td');
            //for loop #2 (used to pass all the collumns)
            for(let j = 0; j < lineValues.length - 1; j++){
                //Check if any collumn of the line starts with the input search string
                if((lineValues[j].innerHTML.toUpperCase()).startsWith(searchValue)){
                    count++;
                }
            }
            if(count > 0){
                //If any collumn contains the search value the display block
                tableLine[i].style.display = '';
            }else{
                //Else display none 
                tableLine[i].style.display = 'none';
            }
        }
    });