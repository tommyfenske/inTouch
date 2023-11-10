//Firebase Import and Config
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js"

const firebaseConfig = {
    databaseURL: "https://intouch-60715-default-rtdb.firebaseio.com"
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
const photosInDB = ref(database, "photos")

//Get HTML Elements
const fileUpload = document.getElementById("file-upload")
const feedElement = document.getElementById("feed")

//On File Uploaded
fileUpload.addEventListener("change", function(){
    let inputFile = fileUpload.value
    push(photosInDB, inputFile)

    inputFile = ""
})

//Update Feed of Pictures
function updateFeed(arr) {
    clearFeed()
    //create photos for each item in the list
    for(let i = 0; i < arr.length; i++) {
        let photoID = arr[i][0]
        let photoPath = arr[i][1]
        let newPhoto = document.createElement("button")
        newPhoto.innerHTML = photoPath
        feedElement.appendChild(newPhoto)
        
        //make event listener for each button that deletes the item in the DB
        newPhoto.addEventListener("dblclick", function() {
            let photoRef = ref(database, `photos/${photoID}`)
            remove(photoRef)
        })
    }
}

//Clear Feed
function clearFeed() {
    feedElement.innerHTML = ""
}

//On Value
onValue (photosInDB, function (snapshot) {

    if (snapshot.exists()) {
        let photoArr = Object.entries(snapshot.val())
        updateFeed(photoArr)  
    } else {
        feedElement.innerHTML = "<p>Your items show up here</p>"
    }
})