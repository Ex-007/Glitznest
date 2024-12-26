


let overAll = document.querySelector('.overAll')
let doNot = document.querySelector('.doNot')
let register = document.querySelector('.register')
let overAllReg = document.querySelector('.overAllReg')
let doot = document.querySelector('.doot')

doNot.addEventListener('click', () => {
  overAll.style.display = 'none'
  overAllReg.style.display = 'flex'
})

doot.addEventListener('click', () => {
  overAllReg.style.display = 'none'
  overAll.style.display = 'flex'
})


let passwordIn = document.getElementById('password')
let showHidePass = document.getElementById('showHidePass')

let popNotifier = document.querySelector('.popNotifier')
let productNAmee = document.querySelector('.productNAmee')

showHidePass.addEventListener('click', () => {
    if(passwordIn.type = 'password'){
        passwordIn.type = 'text'
        showHidePass.textContent = 'hide password'
    }else{
        passwordIn.type === 'password'
        showHidePass.textContent = 'show password'
    }
})

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";    


const firebaseConfig = {
    apiKey: "AIzaSyBpDrnuCX0GztgqmRxs6XXzWIsrXFofJu8",
    authDomain: "saveandget-test1.firebaseapp.com",
    databaseURL: "https://saveandget-test1-default-rtdb.firebaseio.com",
    projectId: "saveandget-test1",
    storageBucket: "saveandget-test1.appspot.com",
    messagingSenderId: "764820232194",
    appId: "1:764820232194:web:6349afe0e91f2c0aa6af1b"
};

const app = initializeApp(firebaseConfig);

import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import{getFirestore, doc, getDoc, getDocs, setDoc, collection, addDoc, updateDoc, deleteDoc, deleteField, query, where} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
const db = getFirestore()
const auth = getAuth()
const provider = new GoogleAuthProvider()
auth.useDeviceLanguage()




let States = [
    `Select State`,
    `Abia`,
    `Adamawa`,
    `Akwa Ibom`,
    `Anambra`,
    `Bauchi`,
    `Bayelsa`,
    `Benue`,
    `Borno`,
    `Cross River`,
    `Delta`,
    `Ebonyi`,
    `Edo`,
    `Ekiti`,
    `Enugu`,
    `Gombe`,
    `Imo`,
    `Jigawa`,
    `Kaduna`,
    `Kano`,
    `Katsina`,
    `Kebbi`,
    `Kogi`,
    `Kwara`,
    `Lagos`,
    `Nasarawa`,
    `Niger`,
    `Ogun`,
    `Ondo`,
    `Osun`,
    `Oyo`,
    `Plateau`,
    `Rivers`,
    `Sokoto`,
    `Taraba`,
    `Yobe`,
    `Zamfara`,
    `Federal Capital Territory (FCT)`
];

let Abia = [
    "Aba North",
    "Aba South",
    "Arochukwu",
    "Bende",
    "Ikwuano",
    "Isiala Ngwa North",
    "Isiala Ngwa South",
    "Isuikwuato",
    "Obingwa",
    "Ohafia",
    "Osisioma",
    "Ugwunagbo",
    "Ukwa East",
    "Ukwa West",
    "Umuahia North",
    "Umuahia South",
    "Uzo-Uwani"
];

let Adamawa = [
    "Demsa",
    "Fufore",
    "Ganye",
    "Gayuk",
    "Girei",
    "Glan",
    "Hong",
    "Jada",
    "Lamurde",
    "Madagali",
    "Maiha",
    "Mayo-Belwa",
    "Michika",
    "Mubi North",
    "Mubi South",
    "Numan",
    "Shelleng",
    "Song",
    "Toungo",
    "Yola North",
    "Yola South",
    "Zangra"
];

let AkwaIbom = [
    "Akamkpa",
    "Akapabuyo",
    "Bakassi",
    "Bekwarra",
    "Biase",
    "Boki",
    "Calabar Municipal",
    "Calabar South",
    "Etung",
    "Ikom",
    "Obanliku",
    "Obubra",
    "Odukpani",
    "Ogoja",
    "Yala",
    "Yarkur",
    "Obudu",
    "Uruan",
    "Uyo",
    "Mbo",
    "Ikot Abasi",
    "Nsit Ibom",
    "Nsit Atai",
    "Onna",
    "Oron",
    "Ukan",
    "Abak",
    "Etim Ekpo"
];


let Anambra = [
    "Aguata",
    "Awka North",
    "Awka South",
    "Anambra East",
    "Anambra West",
    "Anocha",
    "Dunukofia",
    "Ekwusigo",
    "Idemili North",
    "Idemili South",
    "Ihiala",
    "Njikoka",
    "Nnewi North",
    "Nnewi South",
    "Ogbaru",
    "Onitsha North",
    "Onitsha South",
    "Oyi",
    "Orumba North",
    "Orumba South",
    "Awka South"
];


let Bauchi = [
    "Alkaleri",
    "Bauchi",
    "Bogoro",
    "Damban",
    "Darazo",
    "Dass",
    "Ganjuwa",
    "Girei",
    "Glon",
    "Hong",
    "Jada",
    "Lamurde",
    "Madagali",
    "Maiha",
    "Mayo-Belwa",
    "Michika",
    "Mubi North",
    "Mubi South",
    "Warji",
    "Shani",
    "Zaki"
];


let Bayelsa = [
    "Brass",
    "Ekeremor",
    "Kolokuma/Opokuma",
    "Nembe",
    "Ogbia",
    "Sagbama",
    "Southern Ijaw",
    "Yenagoa"
];

let Benue = [
    "Ado",
    "Agatu",
    "Apa",
    "Buruku",
    "Gboko",
    "Guma",
    "Gwer East",
    "Gwer West",
    "Katcha",
    "Katsina-Ala",
    "Konshisha",
    "Kwande",
    "Logo",
    "Makurdi",
    "Ogbadibo",
    "Ohimini",
    "Oju",
    "Okpokwu",
    "Otukpo",
    "Tarka",
    "Ukum",
    "Vandeikya"
];


let Borno = [
    "Abadam",
    "Askira/Uba",
    "Bama",
    "Bayo",
    "Biu",
    "Chibok",
    "Damboa",
    "Dikwa",
    "Gubio",
    "Guzamala",
    "Hawul",
    "Jere",
    "Kaga",
    "Kala/Balge",
    "Konduga",
    "Kukawa",
    "Kwaya Kusar",
    "Mafa",
    "Magumeri",
    "Maiduguri",
    "Marte",
    "Mobbar",
    "Monguno",
    "Ngala",
    "Nganzai",
    "Shani"
];


let CrossRiver = [
    "Akamkpa",
    "Akapabuyo",
    "Bakassi",
    "Bekwarra",
    "Biase",
    "Boki",
    "Calabar Municipal",
    "Calabar South",
    "Etung",
    "Ikom",
    "Obanliku",
    "Obubra",
    "Odukpani",
    "Ogoja",
    "Yala",
    "Yarkur",
    "Obudu"
];

let Delta = [
    "Aniocha North",
    "Aniocha South",
    "Bomadi",
    "Burutu",
    "Ethiope East",
    "Ethiope West",
    "Ika North East",
    "Ika South",
    "Isoko North",
    "Isoko South",
    "Ndokwa East",
    "Ndokwa West",
    "Okpe",
    "Oshimili North",
    "Oshimili South",
    "Patani",
    "Sapele",
    "Udu",
    "Ughelli North",
    "Ughelli South",
    "Ukwuani",
    "Warri North",
    "Warri South",
    "Warri South West",
    "Uvwie"
];

let Ebonyi = [
    "Abakaliki",
    "Afikpo North",
    "Afikpo South",
    "Ebonyi",
    "Ekiti",
    "Ezza North",
    "Ezza South",
    "Ikwo",
    "Ivo",
    "Izzi",
    "Ohaukwu",
    "Ohaozara",
    "Onicha"
];

let Edo = [
    "Akoko Edo",
    "Egor",
    "Esan Central",
    "Esan North-East",
    "Esan South-East",
    "Esan West",
    "Etsako Central",
    "Etsako East",
    "Etsako West",
    "Igueben",
    "Ikpoba-Okha",
    "Oredo",
    "Orhionmwon",
    "Ovia North-East",
    "Ovia South-West",
    "Uhunmwonde"
];

let Ekiti = [
    "Ado-Ekiti",
    "Efon",
    "Ekiti East",
    "Ekiti South-West",
    "Ekiti West",
    "Emure",
    "Ido-Osi",
    "Ijero",
    "Ikere",
    "Ikole",
    "Irepodun/Ifelodun",
    "Ise/Orun",
    "Moba",
    "Oye"
];

let Enugu = [
    "Aninri",
    "Awgu",
    "Enugu East",
    "Enugu North",
    "Enugu South",
    "Ezeagu",
    "Igbo Etiti",
    "Igboeze North",
    "Igboeze South",
    "Isi-Uzo",
    "Nkanu East",
    "Nkanu West",
    "Nsukka",
    "Oji River",
    "Udenu",
    "Udi",
    "Uzouwani"
];

let Gombe = [
    "Akko",
    "Balanga",
    "Billiri",
    "Dukku",
    "Funakaye",
    "Gombe",
    "Kaltungo",
    "Kwami",
    "Nafada",
    "Shongom",
    "Yamaltu-Deba"
];

let Imo = [
    "Ahiazu Mbaise",
    "Ehime Mbano",
    "Ezinihitte Mbaise",
    "Ideato North",
    "Ideato South",
    "Ihitte/Uboma",
    "Ikeduru",
    "Isiala Mbano",
    "Isu",
    "Mbaitoli",
    "Ngor Okpala",
    "Njaba",
    "Nwangele",
    "Obowo",
    "Oguta",
    "Ohaji/Egbema",
    "Okigwe",
    "Onuimo",
    "Orlu",
    "Orsu",
    "Oru East",
    "Oru West",
    "Owerri Municipal",
    "Owerri North",
    "Owerri West",
    "Unuimo",
    "Ngor Okpala"
];

let Jigawa = [
    "Auyo",
    "Babura",
    "Birniwa",
    "Buji",
    "Dutse",
    "Gagarawa",
    "Garki",
    "Gumel",
    "Guri",
    "Hadejia",
    "Jahun",
    "Kafin Hausa",
    "Kauwa",
    "Kazaure",
    "Kirikasamma",
    "Kiyawa",
    "Maigatari",
    "Miga",
    "Ringim",
    "Roni",
    "Sayya",
    "Sulleri",
    "Yankwashi"
];

let Kaduna = [
    "Birnin Gwari",
    "Chikun",
    "Giwa",
    "Igabi",
    "Ikara",
    "Jaba",
    "Jema'a",
    "Kachia",
    "Kaduna North",
    "Kaduna South",
    "Kagara",
    "Kajuru",
    "Lere",
    "Makarfi",
    "Sabon Gari",
    "Sanga",
    "Soba",
    "Zangon Kataf"
];

let Kano = [
    "Ajingi",
    "Albasu",
    "Bagwai",
    "Bebeji",
    "Bichi",
    "Bunkure",
    "Dala",
    "Dambatta",
    "Danbatta",
    "Dengi",
    "Fagge",
    "Gabu",
    "Garko",
    "Garun Malam",
    "Gwale",
    "Gaya",
    "Gezawa",
    "Gwale",
    "Karaye",
    "Kibiya",
    "Kunchi",
    "Kura",
    "Madobi",
    "Makoda",
    "Minjibir",
    "Nassarawa",
    "Rano",
    "Rimin Gado",
    "Rogo",
    "Shanono",
    "Sumaila",
    "Takai",
    "Tarauni",
    "Tofa",
    "Tsanyawa",
    "Tudun Wada",
    "Warawa",
    "Wudil",
    "Gaya"
];

let Katsina = [
    "Bakori",
    "Batagarawa",
    "Batsari",
    "Baure",
    "Bindawa",
    "Charanchi",
    "Dandume",
    "Danmusa",
    "Dutsin-Ma",
    "Funtua",
    "Ingawa",
    "Jibia",
    "Kafur",
    "Kaita",
    "Kankara",
    "Katsina",
    "Kurfi",
    "Kusada",
    "Mai'adua",
    "Malumfashi",
    "Mani",
    "Mashi",
    "Matazu",
    "Musawa",
    "Rimi",
    "Sabuwa",
    "Safana",
    "Sandamu",
    "Zango"
];

let Kebbi = [
    "Aleiro",
    "Arewa",
    "Augie",
    "Bagudo",
    "Birnin Kebbi",
    "Bunza",
    "Dandi",
    "Danko/Wasagu",
    "Fakai",
    "Gwandu",
    "Jega",
    "Kalgo",
    "Koko/Besse",
    "Maiyama",
    "Ngaski",
    "Shanga",
    "Suru",
    "Zuru",
    "Kabi",
    "Kebbi North"
];

let Kogi = [
    "Adavi",
    "Ajaokuta",
    "Ankpa",
    "Bassa",
    "Dekina",
    "Ibaji",
    "Idah",
    "Igalamela/Odolu",
    "Ijumu",
    "Kabba/Bunu",
    "Kogi",
    "Mopa-Muro",
    "Ofu",
    "Ogori/Magongo",
    "Okehi",
    "Okene",
    "Omala",
    "Yagba East",
    "Yagba West",
    "Lokoja"
];

let Kwara = [
    "Asa",
    "Baruten",
    "Edu",
    "Ekiti",
    "Ifelodun",
    "Ilorin East",
    "Ilorin South",
    "Ilorin West",
    "Irepodun",
    "Isin",
    "Kaiama",
    "Moro",
    "Offa",
    "Oke-Ero",
    "Oyun",
    "Pategi"
];

let Lagos = [
    "Agege",
    "Alimosho",
    "Amuwo Odofin",
    "Apapa",
    "Badagry",
    "Epe",
    "Eti Osa",
    "Ibeju-Lekki",
    "Ifako-Ijaiye",
    "Ikeja",
    "Ikorodu",
    "Kosofe",
    "Lagos Island",
    "Lagos Mainland",
    "Mushin",
    "Ojo",
    "Oshodi-Isolo",
    "Shomolu",
    "Surulere"
];

let Nasarawa = [
    "Akwanga",
    "Awe",
    "Doma",
    "Karu",
    "Keana",
    "Keffi",
    "Kokona",
    "Lafia",
    "Nasarawa",
    "Obi",
    "Toto",
    "Wamba"
];

let Niger = [
    "Agaie",
    "Agwara",
    "Bida",
    "Borgu",
    "Chanchaga",
    "Edati",
    "Gbako",
    "Gurara",
    "Katcha",
    "Kontagora",
    "Lapai",
    "Lemu",
    "Magama",
    "Mariga",
    "Mashegu",
    "Mokwa",
    "Munya",
    "Paikoro",
    "Rafi",
    "Rijau",
    "Shiroro",
    "Suleja",
    "Tafa",
    "Wushishi"
];

let Ogun = [
    "Abeokuta North",
    "Abeokuta South",
    "Ado-Odo/Ota",
    "Ewekoro",
    "Ifo",
    "Ijebu East",
    "Ijebu North",
    "Ijebu North East",
    "Ijebu Ode",
    "Ikenne",
    "Imeko-Afon",
    "Ipokia",
    "Obafemi-Owode",
    "Odeda",
    "Odogbolu",
    "Ogun Waterside",
    "Remo North",
    "Shagamu"
];

let Ondo = [
    "Akoko North East",
    "Akoko North West",
    "Akoko South East",
    "Akoko South West",
    "Akure North",
    "Akure South",
    "Ese Odo",
    "Idanre",
    "Ifedore",
    "Ilaje",
    "Ile Oluji/Okeigbo",
    "Irele",
    "Odigbo",
    "Okitipupa",
    "Ondo East",
    "Ondo West",
    "Ose",
    "Owo"
];

let Osun = [
    "Aiyedade",
    "Aiyedire",
    "Atakumosa East",
    "Atakumosa West",
    "Boluwaduro",
    "Boripe",
    "Ede North",
    "Ede South",
    "Egbedore",
    "Ejigbo",
    "Ife Central",
    "Ife East",
    "Ife North",
    "Ife South",
    "Ilesa East",
    "Ilesa West",
    "Irepodun",
    "Irewole",
    "Isokan",
    "Isokan West",
    "Obokun",
    "Odo-Otin",
    "Ola-Oluwa",
    "Olorunda",
    "Oriade",
    "Orolu",
    "Osogbo",
    "Ede South"
];

let Oyo = [
    "Afijio",
    "Akinyele",
    "Atiba",
    "Atigun",
    "Egbeda",
    "Ibadan North",
    "Ibadan North East",
    "Ibadan North West",
    "Ibadan South East",
    "Ibadan South West",
    "Ibarapa Central",
    "Ibarapa East",
    "Ibarapa North",
    "Ido",
    "Irepo",
    "Isokan",
    "Itesiwaju",
    "Lagelu",
    "Ogbomosho North",
    "Ogbomosho South",
    "Olorunsogo",
    "Ona-Ara",
    "Orire",
    "Oyo East",
    "Oyo West",
    "Saki West",
    "Saki East",
    "Surulere"
];

let Plateau = [
    "Bokkos",
    "Jos East",
    "Jos North",
    "Jos South",
    "Kanke",
    "Kanam",
    "Langtang North",
    "Langtang South",
    "Mangu",
    "Mikang",
    "Pankshin",
    "Quaan Pan",
    "Riyom",
    "Shendam",
    "Wase"
];

let Rivers = [
    "Abua/Odual",
    "Ahoada East",
    "Ahoada West",
    "Akuku-Toru",
    "Andoni",
    "Bonny",
    "Emohua",
    "Gokana",
    "Ikwerre",
    "Khana",
    "Obio/Akpor",
    "Ogba/Egbema/Ndoni",
    "Ogu/Bolo",
    "Okrika",
    "Omuma",
    "Port Harcourt",
    "Tai",
    "Eleme",
    "Abua",
    "Ayama"
];

let Sokoto = [
    "Binji",
    "Bodinga",
    "Dange Shuni",
    "Gada",
    "Goronyo",
    "Gudu",
    "Illela",
    "Kebbe",
    "Kware",
    "Rabah",
    "Sabon Birni",
    "Shagari",
    "Silame",
    "Sokoto North",
    "Sokoto South",
    "Tambuwal",
    "Tureta",
    "Wamako",
    "Wurno",
    "Yabo",
    "Mahal"
];

let Taraba = [
    "Ardo Kola",
    "Bali",
    "Donga",
    "Gashaka",
    "Gassol",
    "Ibi",
    "Jalingo",
    "Karim Lamido",
    "Keffi",
    "Lau",
    "Sada",
    "Takum",
    "Ussa",
    "Wukari",
    "Zing"
];

let Yobe = [
    "Bade",
    "Bursari",
    "Damaturu",
    "Fika",
    "Fune",
    "Geidam",
    "Gujba",
    "Gulani",
    "Jakusko",
    "Karasuwa",
    "Machina",
    "Nangere",
    "Nguru",
    "Potiskum",
    "Tarmuwa",
    "Yunusari",
    "Zangon"
];

let Zamfara = [
    "Anka",
    "Bakura",
    "Birnin Magaji",
    "Bukkuyum",
    "Chafe",
    "Gummi",
    "Gusau",
    "Kayawa",
    "Maru",
    "Shinkafi",
    "Talata Mafara",
    "Tsafe",
    "Zurmi"
];

let FCT_Abuja = [
    "Abaji",
    "Bwari",
    "Gwagwalada",
    "Kuje",
    "Abuja Municipal Area Council (AMAC)",
    "Nyanya"
];


let slct1 = document.getElementById("state");
let slct2 = document.getElementById("localGvt");

States.forEach(function addSchool(item){
    let option = document.createElement("option");
    option.text = item;
    option.value = item;
    slct1.appendChild(option);
});

slct1.onchange = function(){
    slct2.innerHTML = "<option>Select local Government</option>";
    if (this.value == "Abia"){
        addToSlct2(Abia);
    }
    if (this.value == "Adamawa"){
        addToSlct2(Adamawa);
    }
    if (this.value == "Akwa Ibom"){
        addToSlct2(AkwaIbom);
    }
    if (this.value == "Anambra"){
        addToSlct2(Anambra);
    }
    if (this.value == "Bauchi"){
        addToSlct2(Bauchi);
    }
    if (this.value == "Bayelsa"){
        addToSlct2(Bayelsa);
    }
    if (this.value == "Benue"){
        addToSlct2(Benue);
    }
    if (this.value == "Borno"){
        addToSlct2(Borno);
    }
    if (this.value == "Cross River"){
        addToSlct2(CrossRiver);
    }
    if (this.value == "Delta"){
        addToSlct2(Delta);
    }
    if (this.value == "Ebonyi"){
        addToSlct2(Ebonyi);
    }
    if (this.value == "Edo"){
        addToSlct2(Edo);
    }
    if (this.value == "Ekiti"){
        addToSlct2(Ekiti);
    }
    if (this.value == "Enugu"){
        addToSlct2(Enugu);
    }
    if (this.value == "Gombe"){
        addToSlct2(Gombe);
    }
    if (this.value == "Imo"){
        addToSlct2(Imo);
    }
    if (this.value == "Jigawa"){
        addToSlct2(Jigawa);
    }
    if (this.value == "Kaduna"){
        addToSlct2(Kaduna);
    }
    if (this.value == "Kano"){
        addToSlct2(Kano);
    }
    if (this.value == "Katsina"){
        addToSlct2(Katsina);
    }
    if (this.value == "Kebbi"){
        addToSlct2(Kebbi);
    }
    if (this.value == "Kogi"){
        addToSlct2(Kogi);
    }
    if (this.value == "Kwara"){
        addToSlct2(Kwara);
    }
    if (this.value == "Lagos"){
        addToSlct2(Lagos);
    }
    if (this.value == "Nasarawa"){
        addToSlct2(Nasarawa);
    }
    if (this.value == "Niger"){
        addToSlct2(Niger);
    }
    if (this.value == "Ogun"){
        addToSlct2(Ogun);
    }
    if (this.value == "Ondo"){
        addToSlct2(Ondo);
    }
    if (this.value == "Osun"){
        addToSlct2(Osun);
    }
    if (this.value == "Oyo"){
        addToSlct2(Oyo);
    }
    if (this.value == "Plateau"){
        addToSlct2(Plateau);
    }
    if (this.value == "Rivers"){
        addToSlct2(Rivers);
    }
    if (this.value == "Sokoto"){
        addToSlct2(Sokoto);
    }
    if (this.value == "Taraba"){
        addToSlct2(Taraba);
    }
    if (this.value == "Yobe"){
        addToSlct2(Yobe);
    }
    if (this.value == "Zamfara"){
        addToSlct2(Zamfara);
    }
    if (this.value == "Federal Capital Territory (FCT)"){
        addToSlct2(FCT_Abuja);
    }
}

function addToSlct2(arr) {
    arr.forEach(function (item){
        let option = document.createElement("option");
        option.text = item;
        option.value = item;
        slct2.appendChild(option);
    })
};



    let Fullname = document.getElementById('username')
    let email = document.getElementById('email')
    let password = document.getElementById('password')
    let address = document.getElementById('addressIn')
    let state = document.getElementById('stateIn')
    let phoneNumber = document.getElementById('phoneNumberIn')



    let fullnameNoti = document.querySelector('.fullnameNoti')
    let emailNoti = document.querySelector('.emailNoti')
    let phoneNoti = document.querySelector('.phoneNoti')
    let stateNoti = document.querySelector('.stateNoti')
    let localNoti = document.querySelector('.localNoti')
    let addressNoti = document.querySelector('.addressNoti')
    let passNoti = document.querySelector('.passNoti')

// validate user input
function validationUser(){
  let nameregex = /^[a-zA-Z]+\s+[a-zA-Z]+$/
  let emailregex = /^[a-zA-Z0-9]+@(gmail|yahoo|outlook)\.com$/
  let uerregex = /^[a-zA-Z0-9]{5,}$/
  let addressregex = /\s+/;
  let phoneNumberregex = /^(070|080|090|081|091)\d{8}$/
//   let phoneNumberregex = /^[0-9]+$/
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{9,}$/;

    if(!nameregex.test(Fullname.value)){
        fullnameNoti.style.display = 'flex'
        Fullname.style.border = '2px solid red'
        return false;
    }
    // Validate email format
    if(!emailregex.test(email.value)){
        emailNoti.style.display = 'flex'
        email.style.border = '2px solid red'
        return false;
    }
    if (!addressregex.test(address.value)) {
        addressNoti.style.display = 'flex'
        address.style.border = '2px solid red'
        return false;
    }
    if(Fullname.value == '' || email.value == '' || address.value == '' || slct1.value == '' || phoneNumber.value == '' || slct2.value == '' || password.value == ''){
        alert('Please fill every details')
        return false
    }
    if (!phoneNumberregex.test(phoneNumber.value)) {
        phoneNoti.style.display = 'flex'
        phoneNumber.style.border = '2px solid red'
        return false;
    }
    if (!passwordRegex.test(password.value)) {
        passNoti.style.display = 'flex'
        password.style.border = '2px solid red'
        return false;
    }
    if(slct1.value == 'Select State'){
        slct1.style.border = '2px solid red'
        stateNoti.style.display = 'flex'
        return
    }
    if(slct2.value == 'Select local Government'){
        localNoti.style.display = 'flex'
        slct2.style.border = '2px solid red'
        return
    }

  return true
}

//   EXTRACT SLUG CONTENT
const urlParameters = new URLSearchParams(window.location.search)
const redirect = urlParameters.get('redirect')


function createNewCustomer(){

    let Fullname = document.getElementById('username').value
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    let address = document.getElementById('addressIn').value
    let state = slct1.value
    let localGovernment = slct2.value
    let phoneNumber = document.getElementById('phoneNumberIn').value

    if(!validationUser()){
        return
    }
    slct2.style.border = '2px solid black'
    slct1.style.border = '2px solid black'

    stateNoti.style.display = 'none'
    fullnameNoti.style.display = 'none'
    emailNoti.style.display = 'none'
    localNoti.style.display = 'none'
    stateNoti.style.display = 'none'
    passNoti.style.display = 'none'
    phoneNoti.style.display = 'none'
    addressNoti.style.display = 'none'

    document.getElementById('username').style.border = '2px solid black'
    document.getElementById('email').style.border = '2px solid black'
    document.getElementById('password').style.border = '2px solid black'
    document.getElementById('addressIn').style.border = '2px solid black'
    document.getElementById('phoneNumberIn').style.border = '2px solid black'



    createUserWithEmailAndPassword(auth, email, password)
            .then((credentials) => {

              productNAmee.textContent = Fullname
              popNotifier.style.display = 'flex'
              setTimeout(() => {
                popNotifier.style.display = 'none'
              }, 1500)
                let userId = credentials.user.uid;

                var ref = doc(db, "CUSTOMERS", userId);

                setDoc(ref, {
                    Fullname: Fullname,
                    Email: email,
                    Address : address,
                    State : state,
                    Phone_Number : phoneNumber,
                    localGovernment : localGovernment

                })
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((error) => {
                        console.error(error);
                    });

                
                setTimeout(() => {
                    window.location.href =  redirect
                }, 3000);

            })
            .catch((error) => {
                alert(error.message);
            });
}



function signInUser(){
    let email = document.getElementById('signEmail').value
    let password = document.getElementById('signPassword').value
    let overIn = document.querySelector('.overIn')

    signInWithEmailAndPassword(auth, email, password)
    .then(() => {
        overIn.textContent = 'Welcome ' + ' ' + email
        popNotifier.style.display = 'flex'
        setTimeout(() => {
          popNotifier.style.display = 'none'
        }, 1500)
        setTimeout(() => {
                window.location.href =  redirect
            }, 3000);
    })
    .catch((error) => {
            alert(error.message);
        });
}

let signUp = document.getElementById('signUp')
signUp.addEventListener('click', createNewCustomer)

let signIn = document.getElementById('signIn')
signIn.addEventListener('click', signInUser)


// GOOGLE SIGN IN

let withGoogle = document.querySelector('.withGoogle')

const googleRegister = async () => {

    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

        let userId = user.uid
        let email = user.email
        let fullNamee = user.displayName



        productNAmee.textContent = fullNamee
        popNotifier.style.display = 'flex'
        setTimeout(() => {
          popNotifier.style.display = 'none'
        }, 1500)


          var ref = doc(db, "CUSTOMERS", userId);

          setDoc(ref, {
              Fullname: fullNamee,
              Email: email,
              Address : 'Update your Address',
              State : 'Select a State',
              Phone_Number : 'Your Phone Number',
              localGovernment : 'Your Local Government'

          })
              .then((response) => {
                  console.log(response);
              })
              .catch((error) => {
                  console.error(error);
              });

          
          setTimeout(() => {
              window.location.href =  'index.html'
          }, 3000);



      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
}


withGoogle.addEventListener('click', googleRegister)
