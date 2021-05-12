const toggleSwitch = document.querySelector('input[type="checkbox"]');


// Switch theme method
function switchTheme(event){
    if(event.target.checked){
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light')
    }
}
async function checkIP(){
    fetch('https://ipapi.co/json/')
            .then(data=>{
       return data.json()})
       .then(res=>{
            let now = Date.now();
            let timeDate = new Date(now);
            res.timeDate=timeDate;
            res.app ='Ligt-dark-mode';
            sendIpToFirebase(res)

       });
}

function sendIpToFirebase(res){
    var firebaseConfig = {
        apiKey: "AIzaSyB61iGOSYQlOCo1rGU0qjc9mYNT9SqNEsM",
        authDomain: "store-ips.firebaseapp.com",
        projectId: "store-ips",
        storageBucket: "store-ips.appspot.com",
        messagingSenderId: "902404946025",
        appId: "1:902404946025:web:ee9e588996640f15614af8"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    let db =firebase.firestore()
    db.collection("ips").add({
        ...res
    }).then((docRef)=>{
        // unnimportant. If it fails, it's not important to the function of the app.
    })
    .catch((error =>{
        console.log('error adding doc',error);
    }))
}
    

// add event listener
toggleSwitch.addEventListener('change', switchTheme);

checkIP();

