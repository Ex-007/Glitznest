

const firebaseConfig = {
    apiKey: "AIzaSyBpDrnuCX0GztgqmRxs6XXzWIsrXFofJu8",
    authDomain: "saveandget-test1.firebaseapp.com",
    databaseURL: "https://saveandget-test1-default-rtdb.firebaseio.com",
    projectId: "saveandget-test1",
    storageBucket: "saveandget-test1.appspot.com",
    messagingSenderId: "764820232194",
    appId: "1:764820232194:web:6349afe0e91f2c0aa6af1b",
    measurementId: "G-2JC8HYT8ZK"
  };


    
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
  import { getAnalytics, logEvent  } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
  import {getAuth, signOut, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
  import { getFirestore, doc, collection, getDocs, addDoc, query, where } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

    let productCard = document.getElementById('mainCard')


    
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    let auth = getAuth()
    let db = getFirestore();
    logEvent(analytics, 'page_view');



    const shareButton = document.querySelector(".share");
    shareButton.addEventListener("click", function() {
        logAndSaveEvent('share', 'shareButton')
    });

    const buyButton = document.querySelector(".buyBtn");
    buyButton.addEventListener("click", function() {
        logAndSaveEvent('purchase', 'buyButton')
    });
    

            // Function to log event and save it to Firestore
            const logAndSaveEvent = async (event, contentId) => {
                // Log event to Firebase Analytics
                logEvent(analytics, event, {
                    content_type: 'button',
                    content_id: contentId
                });
                try {
                    await addDoc(collection(db, "analyticsEvents"), {
                        event: event,
                        content_id: contentId,
                        timestamp: serverTimestamp()
                    });
                    console.log("Event saved to Firestore");
                } catch (error) {
                    console.error("Error saving event to Firestore: ", error);
                }
            };