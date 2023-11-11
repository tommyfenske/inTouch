//Firebase Import and Config
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
//import { getDatabase, push, onValue } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-storage.js";

const firebaseConfig = {
    //databaseURL: "https://intouch-60715-default-rtdb.firebaseio.com",
    storageBucket: "intouch-60715.appspot.com"
};
const app = initializeApp(firebaseConfig);
//const myDB = getDatabase(app);
//const namesInDB = ref(myDB, "names")
const storage = getStorage();
const photosRef = ref(storage, "photos/")

//Get HTML Elements
const fileUpload = document.getElementById("file-upload")
const feedElement = document.getElementById("feed")
const testP = document.getElementById("test-p")
const testImg = document.getElementById("test-img")

//On File Uploaded
fileUpload.addEventListener("change", function() {
    let inputFile = fileUpload.files[0]
    let fileName = fileUpload.files[0].name
    var uploadRef = ref(storage, `photos/${fileName}`)
    uploadBytes(uploadRef, inputFile).then((snapshot) => {
        testP.innerText = fileName
        
        getDownloadURL(uploadRef).then((url) => {
            testImg.src = url
            //testP.innerText = url
        })
    })   

    inputFile = ""
    updateFeed()
})

function updateFeed() {
    feedElement.innerHTML = ""

    listAll(photosRef).then((response) => {
        response.items.forEach((item) => {
            getDownloadURL(item).then((url) => {
                let newImg = document.createElement("img")
                feedElement.appendChild(newImg)
                newImg.src = url
                
            })
        })
    })
}

function createPost () {

}

updateFeed()
//Update Feed of Pictures
/*
function updateFeed(arr) {
    clearFeed()
    //create photos for each item in the list
    for(let i = 0; i < arr.length; i++) {
        let photoID = arr[i][0]
        let photoPath = arr[i][1]
        let newPhoto = document.createElement("img")
        newPhoto.src = photoPath
        feedElement.appendChild(newPhoto)
        
        //make event listener for each button that deletes the item in the DB
        newPhoto.addEventListener("dblclick", function() {
            let photoRef = ref(database, `photos/${photoID}`)
            remove(photoRef)
        })
    }
} */

//Clear Feed
//function clearFeed() {
//    feedElement.innerHTML = ""
//}

//On Value
/*
onValue (photosInDB, function (snapshot) {

    if (snapshot.exists()) {
        let photoArr = Object.entries(snapshot.val())
        updateFeed(photoArr)  
    } else {
        feedElement.innerHTML = "<p>Your items show up here</p>"
    }
})*/