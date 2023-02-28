var people = [
    {
        username: "user",
        password: "password1234"
    }
]

function getInfo() {
    var username = document.getElementById("username").value
    var password = document.getElementById("password").value

    for( i = 0; i < people.length; i++) {
        if(username == people[i].username && password == people[i].password) {
            console.log(username + " is logged in!")
            window.location = "home.html";
        }else {
            window.alert("incorrect username or password")
        }
    }
}