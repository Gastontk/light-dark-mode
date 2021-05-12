const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById('nav')
const toggleIcon = document.getElementById('toggle-icon')
const image1 = document.getElementById('image1')
const image2 = document.getElementById('image2')
const image3 = document.getElementById('image3')
const textBox = document.getElementById('text-box')

// methods to enable dark or light mode
//Thesse two functions can be combined into one using ternary operators
function darkMode(){
    nav.style.backgroundColor ='rgb(0 0 0 / 50%';
    textBox.style.backgroundColor =  'rgb(255 255 255 /50%';
    toggleIcon.children[0].textContent = 'Dark Mode';
    toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon');
    imageMode('dark')
}
function lightMode(){
    nav.style.backgroundColor =  'rgb(255 255 255 /50%';
    textBox.style.backgroundColor ='rgb(0 0 0 / 50%';
    toggleIcon.children[0].textContent = 'Light Mode';
    toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun')
    imageMode('light')

}

function imageMode(color){
    image1.src = `img/undraw_proud_coder_${color}.svg`
    image2.src = `img/undraw_feeling_proud_${color}.svg`
    image3.src = `img/undraw_progressive_app_m9ms_${color}.svg`
}


// Switch theme method
function switchTheme(event){
    if(event.target.checked){
        document.documentElement.setAttribute('data-theme', 'dark');
        darkMode()
        localStorage.setItem('theme', 'dark')
    } else {
        document.documentElement.setAttribute('data-theme', 'light')
        lightMode()
        localStorage.setItem('theme', 'light')

    }
}
function checkLocalStorage(){
    let whichMode = localStorage.getItem('theme');
    console.log(whichMode);
    if(whichMode == 'dark'){
        toggleSwitch.setAttribute('checked', true);

        document.documentElement.setAttribute('data-theme', 'dark');
        darkMode()
        // localStorage.setItem('theme', 'dark')

    }  else{
        document.documentElement.setAttribute('data-theme', 'light')
        lightMode()
        

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
checkLocalStorage()

