import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";    

    
// const env = require('env.js')
// env.load('.env')


//         const firebaseConfig = {
//             apiKey: env.API_KEY,
//             authDomain: env.AUTH_DOMAIN,
//             databaseURL: env.DATABASE_URL,
//             projectId: env.ROJECT_ID,
//             storageBucket: env.TORAGE_BUCKET,
//             messagingSenderId: env.MESSAGING_SENDER_ID,
//             appId: env.PP_ID
//         };

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
    

                // service workers
                if ('serviceWorker' in navigator) {
                    window.addEventListener('load', () => {
                      navigator.serviceWorker.register('/service-worker.js')
                        .then((registration) => {
                          console.log('Service Worker registered with scope:', registration.scope);
                        })
                        .catch((error) => {
                          console.log('Service Worker registration failed:', error);
                        });
                    });
                  }
        
      import{getFirestore, doc, getDoc, getDocs, setDoc, collection, addDoc, updateDoc, deleteDoc, deleteField, query, where} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
      import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-storage.js";
      import {getAuth, signOut, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";


      const db = getFirestore()
      let auth = getAuth()
      const storage = getStorage()
    
        
        // const analytics = getAnalytics(app);

        //   FUNTION TO CHECK IF USER IS LOGGED IN OR OUT
    function stateChanged(){
        onAuthStateChanged(auth, (user) => {
            if(user){
                let userId = user.uid
                logUserDetails(userId)
                console.log(userId)
            }else{
                window.location.href = 'adminFirst.html'
            }
        })
    }
    stateChanged()


    //   FUNCTION TO GET USER DATA FROM DATABASE AND DISPLAY IT

    async function logUserDetails(userId){
        var ref = doc(db, "Admin", userId)
        const docSnap = await getDoc(ref)
        if(docSnap.exists()){
        let adminName = document.getElementById('adminName')

        adminName.textContent = docSnap.data().Fullname + '!'
            console.log(docSnap.data())
        }else{
            alert('data does not exist')
        }
    }











        // FOR JEWELERIES PAGE
        let productNameIn = document.getElementById('productName')
        let productPriceIn = document.getElementById('productPrice')
        let productImageIn = document.getElementById('productImage')
        let productCategoryIn = document.getElementById('categoryy')

        let productWrite = document.getElementById('productWrite')
        let productUpdate = document.getElementById('productUpdate')
        let productRead = document.getElementById('productRead')
        let productDelete = document.getElementById('productDelete')
    
        async function writeForProduct() {
            let productName = productNameIn.value
            let productPrice = productPriceIn.value

                // SLUGIFY THE TITLE
            function stringify(productName){
                return productName.toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .split('')
                .map(character => (/[a-z0-9]/.test(character) ? character : '-'))
                .join('')
                .replace(/-+/g, '-')
                .replace(/^- |- $/g, '')
            }
    
            if (productName == '' || productPrice == '') {
                alert('Please fill all empty spaces');
            } else {
                let file = productImageIn.files[0];
                var fileName = file.name;
    
                const storageRef = ref(storage, 'JEWELERIES/' + fileName);
                const uploadTask = uploadBytesResumable(storageRef, file);
    
                uploadTask.on('state_changed', (snapshot) => {
                    let progressDigit = document.getElementById('productProgress')
                    var progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes) * 100)
                    progressDigit.textContent = progress + "%"
                    console.log(snapshot);
                }, (error) => {
                    console.log(error);
                }, async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
    
                    const ref = doc(db, "JEWELERIES", productName);
                    await setDoc(ref, {
                        productName: productName,
                        productPrice: parseFloat(productPrice),
                        slug : stringify(productName),
                        productImage: downloadURL,  
                    });
    
                    alert("Uploading Successful");
                    clearFormProduct();
                });
            }
        }
    
        function clearFormProduct() {
            // Clear form fields after successful upload
            productNameIn.value = ''
            productPriceIn.value = ''
            progressDigit.value = ''
        }
    
        productWrite.addEventListener('click', writeForProduct);
    
    
        // UPDATE FOR PRODUCT
        async function updateForProduct(){
    
            let productName = productNameIn.value
            let productPrice = productPriceIn.value

            // SLUGIFY THE TITLE
            function stringify(productName){
                return productName.toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .split('')
                .map(character => (/[a-z0-9]/.test(character) ? character : '-'))
                .join('')
                .replace(/-+/g, '-')
                .replace(/^- |- $/g, '')
            }
    
            var ref = doc(db, "JEWELERIES", productName)
            await updateDoc(ref, {
                productName: productName,
                productPrice: parseFloat(productPrice),
                slug : stringify(productName)
                // productImage: downloadURL,
            })
            .then(() => {
                alert('Updated Successfully')
            })
            .catch(error => {
                alert(error.message)
            })
            productNameIn.value = ''
            productPriceIn.value = ''
        }
        productUpdate.addEventListener('click', updateForProduct)
    
    
        // READ FOR PRODUCT
        async function readForProduct(){
    
            let productName = productNameIn.value
            var ref = doc(db, "JEWELERIES", productName)
            const docSnap = await getDoc(ref)
            if(docSnap.exists()){
                // console.log(docSnap.data())
                productNameIn.value = docSnap.data().productName
                productPriceIn.value = docSnap.data().productPrice
                let photoSee = docSnap.data().productImage
    
                console.log(photoSee)
            }else{
                alert('Product does not exist')
            }
        }
        productRead.addEventListener('click', readForProduct)
    
        // DELETE FOR PRODUCT
            async function deleteForProduct(){
                let productName = productNameIn.value
                var ref = doc(db, "JEWELERIES", productName)
                const docSnap = await getDoc(ref)
                if(!docSnap.exists()){
                    alert('No such Document')
                }
                await deleteDoc(ref)
                .then(() => {
                    alert('Product Deleted')
                })
                .catch(error => {
                    alert(error.message)
                })
            }
    
            productDelete.addEventListener('click', deleteForProduct)


        // FOR KITCHEN PAGE
        let kitchenNameIn = document.getElementById('kitchenName')
        let kitchenPriceIn = document.getElementById('kitchenPrice')
        let kitchenImageIn = document.getElementById('kitchenImage')

        let kitchenWrite = document.getElementById('kitchenWrite')
        let kitchenUpdate = document.getElementById('kitchenUpdate')
        let kitchenRead = document.getElementById('kitchenRead')
        let kitchenDelete = document.getElementById('kitchenDelete')
    
        async function writeForkitchen() {
            let kitchenName = kitchenNameIn.value
            let kitchenPrice = kitchenPriceIn.value
    
            if (kitchenName == '' || kitchenPrice == '') {
                alert('Please fill all empty spaces');
            } else {
                let file = kitchenImageIn.files[0];
                var fileName = file.name;
    
                const storageRef = ref(storage, 'KITCHEN/' + fileName);
                const uploadTask = uploadBytesResumable(storageRef, file);
    
                uploadTask.on('state_changed', (snapshot) => {
                    let progressDigit = document.getElementById('kitchenProgress')
                    var progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes) * 100)
                    progressDigit.textContent = progress + "%"
                    console.log(snapshot);
                }, (error) => {
                    console.log(error);
                }, async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
    
                    const ref = doc(db, "KITCHEN", kitchenName);
                    await setDoc(ref, {
                        kitchenName: kitchenName,
                        kitchenPrice: parseFloat(kitchenPrice),
                        kitchenImage: downloadURL,  
                    });
    
                    alert("Uploading Successful");
                    clearFormProductF();
                });
            }
        }
    
        function clearFormProductF() {
            // Clear form fields after successful upload
            kitchenNameIn.value = ''
            kitchenPriceIn.value = ''
            progressDigit.value = ''
        }
    
        kitchenWrite.addEventListener('click', writeForkitchen);
    
    
        // UPDATE FOR KITCHEN
        async function updateForkitchen(){
    
            let kitchenName = kitchenNameIn.value
            let kitchenPrice = kitchenPriceIn.value
            
            var ref = doc(db, "KITCHEN", kitchenName)
            await updateDoc(ref, {
                kitchenName: kitchenName,
                kitchenPrice: parseFloat(kitchenPrice),
                // productImage: downloadURL,
            })
            .then(() => {
                alert('Updated Successfully')
            })
            .catch(error => {
                alert(error.message)
            })
            kitchenNameIn.value = ''
            kitchenPriceIn.value = ''
            }
            kitchenUpdate.addEventListener('click', updateForkitchen)
    
    
        // READ FOR KITCHEN
        async function readForkitchen(){
    
            let kitchenName = kitchenNameIn.value
            var ref = doc(db, "KITCHEN", kitchenName)
            const docSnap = await getDoc(ref)
            if(docSnap.exists()){
                // console.log(docSnap.data())
                kitchenNameIn.value = docSnap.data().kitchenName
                kitchenPriceIn.value = docSnap.data().kitchenPrice
                let photoSee = docSnap.data().productImage
    
                console.log(photoSee)
            }else{
                alert('Product does not exist')
            }
        }
        kitchenRead.addEventListener('click', readForkitchen)
    
        // DELETE FOR KITCHEN
            async function deleteForkitchen(){
                let kitchenName = kitchenNameIn.value
                var ref = doc(db, "KITCHEN", kitchenName)
                const docSnap = await getDoc(ref)
                if(!docSnap.exists()){
                    alert('No such Document')
                }
                await deleteDoc(ref)
                .then(() => {
                    alert('Product Deleted')
                })
                .catch(error => {
                    alert(error.message)
                })
            }
    
            kitchenDelete.addEventListener('click', deleteForkitchen)


        // FOR LAUNDARY PAGE
        let laundaryNameIn = document.getElementById('laundaryName')
        let laundaryPriceIn = document.getElementById('laundaryPrice')
        let laundaryImageIn = document.getElementById('laundaryImage')
      
        let laundaryWrite = document.getElementById('laundaryWrite')
        let laundaryUpdate = document.getElementById('laundaryUpdate')
        let laundaryRead = document.getElementById('laundaryRead')
        let laundaryDelete = document.getElementById('laundaryDelete')
    
        async function writeForlaundary() {
            let laundaryName = laundaryNameIn.value
            let laundaryPrice = laundaryPriceIn.value
    
            if (laundaryName == '' || laundaryPrice == '') {
                alert('Please fill all empty spaces');
            } else {
                let file = laundaryImageIn.files[0];
                var fileName = file.name;
    
                const storageRef = ref(storage, 'LAUNDARY/' + fileName);
                const uploadTask = uploadBytesResumable(storageRef, file);
    
                uploadTask.on('state_changed', (snapshot) => {
                    let progressDigit = document.getElementById('laundaryProgress')
                    var progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes) * 100)
                    progressDigit.textContent = progress + "%"
                    console.log(snapshot);
                }, (error) => {
                    console.log(error);
                }, async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
    
                    const ref = doc(db, "LAUNDARY", laundaryName);
                    await setDoc(ref, {
                        laundaryName: laundaryName,
                        laundaryPrice: parseFloat(laundaryPrice),
                        laundaryImage: downloadURL,  
                    });
    
                    alert("Uploading Successful");
                    clearFormlaundary();
                });
            }
        }
    
        function clearFormlaundary() {
            // Clear form fields after successful upload
            laundaryNameIn.value = ''
            laundaryPriceIn.value = ''
            progressDigit.value = ''
            }
    
            laundaryWrite.addEventListener('click', writeForlaundary);
    
    
        // UPDATE FOR LAUNDARY
        async function updateForlaundary(){
    
            let laundaryName = laundaryNameIn.value
            let laundaryPrice = laundaryPriceIn.value
    
            var ref = doc(db, "LAUNDARY", laundaryName)
            await updateDoc(ref, {
                laundaryName: laundaryName,
                laundaryPrice: parseFloat(laundaryPrice),
                // productImage: downloadURL,
            })
            .then(() => {
                alert('Updated Successfully')
            })
            .catch(error => {
                alert(error.message)
            })
            laundaryNameIn.value = ''
            laundaryPriceIn.value = ''
        }
        laundaryUpdate.addEventListener('click', updateForlaundary)
    
    
        // READ FOR LAUNDARY
        async function readForlaundary(){
    
            let laundaryName = laundaryNameIn.value
            var ref = doc(db, "LAUNDARY", laundaryName)
            const docSnap = await getDoc(ref)
            if(docSnap.exists()){
                // console.log(docSnap.data())
                laundaryNameIn.value = docSnap.data().laundaryName
                laundaryPriceIn.value = docSnap.data().laundaryPrice
            let photoSee = docSnap.data().productImage
    
                console.log(photoSee)
            }else{
                alert('Product does not exist')
            }
        }
        laundaryRead.addEventListener('click', readForlaundary)
    
        // DELETE FOR LAUNDARY
            async function deleteForlaundary(){
                let laundaryName = laundaryNameIn.value
                var ref = doc(db, "LAUNDARY", laundaryName)
                const docSnap = await getDoc(ref)
                if(!docSnap.exists()){
                    alert('No such Document')
                }
                await deleteDoc(ref)
                .then(() => {
                    alert('Product Deleted')
                })
                .catch(error => {
                    alert(error.message)
                })
            }
    
            laundaryDelete.addEventListener('click', deleteForlaundary)


        // FOR CLOTHING PAGE
        let clothingNameIn = document.getElementById('clothingName')
        let clothingPriceIn = document.getElementById('clothingPrice')
        let clothingImageIn = document.getElementById('clothingImage')

        let clothingWrite = document.getElementById('clothingWrite')
        let clothingUpdate = document.getElementById('clothingUpdate')
        let clothingRead = document.getElementById('clothingRead')
        let clothingDelete = document.getElementById('clothingDelete')
    
        async function writeForclothing() {
            let clothingName = clothingNameIn.value
            let clothingPrice = clothingPriceIn.value
    
            if (clothingName == '' || clothingPrice == '') {
                alert('Please fill all empty spaces');
            } else {
                let file = clothingImageIn.files[0];
                var fileName = file.name;
    
                const storageRef = ref(storage, 'CLOTHING/' + fileName);
                const uploadTask = uploadBytesResumable(storageRef, file);
    
                uploadTask.on('state_changed', (snapshot) => {
                    let progressDigit = document.getElementById('clothingProgress')
                    var progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes) * 100)
                    progressDigit.textContent = progress + "%"
                    console.log(snapshot);
                }, (error) => {
                    console.log(error);
                }, async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
    
                    const ref = doc(db, "CLOTHING", clothingName);
                    await setDoc(ref, {
                        clothingName: clothingName,
                        clothingPrice: parseFloat(clothingPrice),
                        productImage: downloadURL,  
                    });
    
                    alert("Uploading Successful");
                    clearFormclothing();
                });
            }
        }
    
        function clearFormclothing() {
            // Clear form fields after successful upload
            clothingNameIn.value = ''
            clothingPriceIn.value = ''
            progressDigit.value = ''
            }
    
            clothingWrite.addEventListener('click', writeForclothing);
    
    
        // UPDATE FOR CLOTHING
        async function updateForclothing(){
    
            let clothingName = clothingNameIn.value
            let clothingPrice = productPriceIn.value
            
            var ref = doc(db, "CLOTHING", clothingName)
            await updateDoc(ref, {
                clothingName: clothingName,
                clothingPrice: parseFloat(clothingPrice),
                // productImage: downloadURL,
            })
            .then(() => {
                alert('Updated Successfully')
            })
            .catch(error => {
                alert(error.message)
            })
            clothingNameIn.value = ''
            clothingPriceIn.value = ''
            }
            clothingUpdate.addEventListener('click', updateForclothing)
    
    
        // READ FOR CLOTHING
        async function readForclothing(){
    
            let clothingName = clothingNameIn.value
            var ref = doc(db, "CLOTHING", clothingName)
            const docSnap = await getDoc(ref)
            if(docSnap.exists()){
                // console.log(docSnap.data())
                clothingNameIn.value = docSnap.data().clothingName
                clothingPriceIn.value = docSnap.data().clothingPrice
                let photoSee = docSnap.data().clothingImage
    
                console.log(photoSee)
            }else{
                alert('Product does not exist')
            }
        }
        clothingRead.addEventListener('click', readForclothing)
    
        // DELETE FOR CLOTHINGS
            async function deleteForclothing(){
                let clothingName = clothingNameIn.value
                var ref = doc(db, "CLOTHING", clothingName)
                const docSnap = await getDoc(ref)
                if(!docSnap.exists()){
                    alert('No such Document')
                }
                await deleteDoc(ref)
                .then(() => {
                    alert('Product Deleted')
                })
                .catch(error => {
                    alert(error.message)
                })
            }
    
            clothingDelete.addEventListener('click', deleteForclothing)


        // FOR BATHROOM PAGE
        let bathroomNameIn = document.getElementById('bathroomName')
        let bathroomPriceIn = document.getElementById('bathroomPrice')
        let bathroomImageIn = document.getElementById('bathroomImage')


        let bathroomWrite = document.getElementById('bathroomWrite')
        let bathroomUpdate = document.getElementById('bathroomUpdate')
        let bathroomRead = document.getElementById('bathroomRead')
        let bathroomDelete = document.getElementById('bathroomDelete')
    
        async function writeForbathroom() {
            let bathroomName = bathroomNameIn.value
            let bathroomPrice = bathroomPriceIn.value
            
            if (bathroomName == '' || bathroomPrice == '') {
                alert('Please fill all empty spaces');
            } else {
                let file = bathroomImageIn.files[0];
                var fileName = file.name;
    
                const storageRef = ref(storage, 'BATHROOM/' + fileName);
                const uploadTask = uploadBytesResumable(storageRef, file);
    
                uploadTask.on('state_changed', (snapshot) => {
                    let progressDigit = document.getElementById('bathroomProgress')
                    var progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes) * 100)
                    progressDigit.textContent = progress + "%"
                    console.log(snapshot);
                }, (error) => {
                    console.log(error);
                }, async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
    
                    const ref = doc(db, "BATHROOM", bathroomName);
                    await setDoc(ref, {
                        bathroomName: bathroomName,
                        bathroomPrice: parseFloat(bathroomPrice),
                        bathroomImage: downloadURL,  
                    });
    
                    alert("Uploading Successful");
                    clearFormbathroom();
                });
            }
        }
    
        function clearFormbathroom() {
            // Clear form fields after successful upload
            bathroomNameIn.value = ''
            bathroomPriceIn.value = ''
            progressDigit.value = ''
            }
    
            bathroomWrite.addEventListener('click', writeForbathroom);
    
    
        // UPDATE FOR BATHROOM
        async function updateForbathroom(){
    
            let bathroomName = bathroomNameIn.value
            let bathroomPrice = bathroomPriceIn.value
            
            var ref = doc(db, "BATHROOM", bathroomName)
            await updateDoc(ref, {
                bathroomName: bathroomName,
                bathroomPrice: parseFloat(bathroomPrice),
                })
            .then(() => {
                alert('Updated Successfully')
            })
            .catch(error => {
                alert(error.message)
            })
            bathroomNameIn.value = ''
            bathroomPriceIn.value = ''
            }
            bathroomUpdate.addEventListener('click', updateForbathroom)
    
    
        // READ FOR BATHROOM
        async function readForbathroom(){
    
            let bathroomName = bathroomNameIn.value
            var ref = doc(db, "BATHROOM", bathroomName)
            const docSnap = await getDoc(ref)
            if(docSnap.exists()){
                // console.log(docSnap.data())
                bathroomNameIn.value = docSnap.data().bathroomName
                bathroomPriceIn.value = docSnap.data().bathroomPrice
                let photoSee = docSnap.data().bathroomImage
    
                console.log(photoSee)
            }else{
                alert('Product does not exist')
            }
        }
        bathroomRead.addEventListener('click', readForbathroom)
    
        // DELETE FOR BATHROOM
            async function deleteForbathroom(){
                let bathroomName = bathroomNameIn.value
                var ref = doc(db, "BATHROOM", bathroomName)
                const docSnap = await getDoc(ref)
                if(!docSnap.exists()){
                    alert('No such Document')
                }
                await deleteDoc(ref)
                .then(() => {
                    alert('Product Deleted')
                })
                .catch(error => {
                    alert(error.message)
                })
            }
    
            bathroomDelete.addEventListener('click', deleteForbathroom)


        // FOR PHONE PAGE
        let phoneNameIn = document.getElementById('phoneName')
        let phonePriceIn = document.getElementById('phonePrice')
        let phoneImageIn = document.getElementById('phoneImage')
        
        let phoneWrite = document.getElementById('phoneWrite')
        let phoneUpdate = document.getElementById('phoneUpdate')
        let phoneRead = document.getElementById('phoneRead')
        let phoneDelete = document.getElementById('phoneDelete')
    
        async function writeForphone() {
            let phoneName = phoneNameIn.value
            let phonePrice = phonePriceIn.value
            
            if (phoneName == '' || phonePrice == '') {
                alert('Please fill all empty spaces');
            } else {
                let file = phoneImageIn.files[0];
                var fileName = file.name;
    
                const storageRef = ref(storage, 'PHONE/' + fileName);
                const uploadTask = uploadBytesResumable(storageRef, file);
    
                uploadTask.on('state_changed', (snapshot) => {
                    let progressDigit = document.getElementById('phoneProgress')
                    var progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes) * 100)
                    progressDigit.textContent = progress + "%"
                    console.log(snapshot);
                }, (error) => {
                    console.log(error);
                }, async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
    
                    const ref = doc(db, "PHONE", phoneName);
                    await setDoc(ref, {
                        phoneName: phoneName,
                        phonePrice: parseFloat(phonePrice),
                        phoneImage: downloadURL,  
                    });
    
                    alert("Uploading Successful");
                    clearFormphone();
                });
            }
        }
    
        function clearFormphone() {
            // Clear form fields after successful upload
            phoneNameIn.value = ''
            phonePriceIn.value = ''
            progressDigit.value = ''
            }
    
            phoneWrite.addEventListener('click', writeForphone);
    
    
        // UPDATE FOR PHONE
        async function updateForphone(){
    
            let phoneName = phoneNameIn.value
            let phonePrice = phonePriceIn.value
            
            var ref = doc(db, "PHONE", phoneName)
            await updateDoc(ref, {
                phoneName: phoneName,
                phonePrice: parseFloat(phonePrice),
                // productImage: downloadURL,
            })
            .then(() => {
                alert('Updated Successfully')
            })
            .catch(error => {
                alert(error.message)
            })
            phoneNameIn.value = ''
            phonePriceIn.value = ''
            }
            phoneUpdate.addEventListener('click', updateForphone)
    
    
        // READ FOR PHONE
        async function readForphone(){
    
            let phoneName = phoneNameIn.value
            var ref = doc(db, "PHONE", phoneName)
            const docSnap = await getDoc(ref)
            if(docSnap.exists()){
                // console.log(docSnap.data())
                phoneNameIn.value = docSnap.data().phoneName
                phonePriceIn.value = docSnap.data().phonePrice
                let photoSee = docSnap.data().phoneImage
    
                console.log(photoSee)
            }else{
                alert('Product does not exist')
            }
        }
        phoneRead.addEventListener('click', readForphone)
    
        // DELETE FOR PHONE
            async function deleteForphone(){
                let phoneName = phoneNameIn.value
                var ref = doc(db, "PHONE", phoneName)
                const docSnap = await getDoc(ref)
                if(!docSnap.exists()){
                    alert('No such Document')
                }
                await deleteDoc(ref)
                .then(() => {
                    alert('Product Deleted')
                })
                .catch(error => {
                    alert(error.message)
                })
            }
    
            phoneDelete.addEventListener('click', deleteForphone)


        // FOR HOME PAGE
        let homeNameIn = document.getElementById('homeName')
        let homePriceIn = document.getElementById('homePrice')
        let homeImageIn = document.getElementById('homeImage')
        
        let homeWrite = document.getElementById('homeWrite')
        let homeUpdate = document.getElementById('homeUpdate')
        let homeRead = document.getElementById('homeRead')
        let homeDelete = document.getElementById('homeDelete')
    
        async function writeForhome() {
            let homeName = homeNameIn.value
            let homePrice = homePriceIn.value
            
            if (homeName == '' || homePrice == '') {
                alert('Please fill all empty spaces');
            } else {
                let file = homeImageIn.files[0];
                var fileName = file.name;
    
                const storageRef = ref(storage, 'HOME/' + fileName);
                const uploadTask = uploadBytesResumable(storageRef, file);
    
                uploadTask.on('state_changed', (snapshot) => {
                    let progressDigit = document.getElementById('homeProgress')
                    var progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes) * 100)
                    progressDigit.textContent = progress + "%"
                    console.log(snapshot);
                }, (error) => {
                    console.log(error);
                }, async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
    
                    const ref = doc(db, "HOME", homeName);
                    await setDoc(ref, {
                        homeName: homeName,
                        homePrice: parseFloat(homePrice),
                        homeImage: downloadURL,  
                    });
    
                    alert("Uploading Successful");
                    clearFormhome();
                });
            }
        }
    
        function clearFormhome() {
            // Clear form fields after successful upload
            homeNameIn.value = ''
            homePriceIn.value = ''
            progressDigit.value = ''
            }
    
            homeWrite.addEventListener('click', writeForhome);
    
    
        // UPDATE FOR HOME
        async function updateForhome(){
    
            let homeName = homeNameIn.value
            let homePrice = homePriceIn.value
            
            var ref = doc(db, "HOME", homeName)
            await updateDoc(ref, {
                homeName: homeName,
                homePrice: parseFloat(homePrice),
                // productImage: downloadURL,
            })
            .then(() => {
                alert('Updated Successfully')
            })
            .catch(error => {
                alert(error.message)
            })
            homeNameIn.value = ''
            homePriceIn.value = ''
            }
            homeUpdate.addEventListener('click', updateForhome)
    
    
        // READ FOR HOME
        async function readForhome(){
    
            let homeName = homeNameIn.value
            var ref = doc(db, "HOME", homeName)
            const docSnap = await getDoc(ref)
            if(docSnap.exists()){
                // console.log(docSnap.data())
                homeNameIn.value = docSnap.data().homeName
                homePriceIn.value = docSnap.data().homePrice
                let photoSee = docSnap.data().homeImage
    
                console.log(photoSee)
            }else{
                alert('Product does not exist')
            }
        }
        homeRead.addEventListener('click', readForhome)
    
        // DELETE FOR HOME
            async function deleteForhome(){
                let homeName = homeNameIn.value
                var ref = doc(db, "HOME", homeName)
                const docSnap = await getDoc(ref)
                if(!docSnap.exists()){
                    alert('No such Document')
                }
                await deleteDoc(ref)
                .then(() => {
                    alert('Product Deleted')
                })
                .catch(error => {
                    alert(error.message)
                })
            }
    
            homeDelete.addEventListener('click', deleteForhome)


        // FOR OTHERS PAGE
        let othersNameIn = document.getElementById('othersName')
        let othersPriceIn = document.getElementById('othersPrice')
        let othersImageIn = document.getElementById('othersImage')
        
        let othersWrite = document.getElementById('othersWrite')
        let othersUpdate = document.getElementById('othersUpdate')
        let othersRead = document.getElementById('othersRead')
        let othersDelete = document.getElementById('othersDelete')
    
        async function writeForothers() {
            let othersName = othersNameIn.value
            let othersPrice = othersPriceIn.value
            
            if (othersName == '' || othersPrice == '') {
                alert('Please fill all empty spaces');
            } else {
                let file = othersImageIn.files[0];
                var fileName = file.name;
    
                const storageRef = ref(storage, 'OTHERS/' + fileName);
                const uploadTask = uploadBytesResumable(storageRef, file);
    
                uploadTask.on('state_changed', (snapshot) => {
                let progressDigit = document.getElementById('othersProgress')
                var progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes) * 100)
                progressDigit.textContent = progress + "%"



                    console.log(snapshot);
                }, (error) => {
                    console.log(error);
                }, async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
    
                    const ref = doc(db, "OTHERS", othersName);
                    await setDoc(ref, {
                        othersName: othersName,
                        othersPrice: parseFloat(othersPrice),
                        othersImage: downloadURL,  
                    });
    
                    alert("Uploading Successful");
                    clearFormothers();
                });
            }
        }
    
        function clearFormothers() {
            // Clear form fields after successful upload
            othersNameIn.value = ''
            othersPriceIn.value = ''
            progressDigit.value = ''
            }
    
            othersWrite.addEventListener('click', writeForothers);
    
    
        // UPDATE FOR OTHERS
        async function updateForothers(){
    
            let othersName = othersNameIn.value
            let othersPrice = othersPriceIn.value
            
            var ref = doc(db, "OTHERS", othersName)
            await updateDoc(ref, {
                othersName: othersName,
                othersPrice: parseFloat(othersPrice),
                // productImage: downloadURL,
            })
            .then(() => {
                alert('Updated Successfully')
            })
            .catch(error => {
                alert(error.message)
            })
            othersNameIn.value = ''
            othersPriceIn.value = ''
            }
            othersUpdate.addEventListener('click', updateForothers)
    
    
        // READ FOR OTHERS
        async function readForothers(){
    
            let othersName = othersNameIn.value
            var ref = doc(db, "OTHERS", othersName)
            const docSnap = await getDoc(ref)
            if(docSnap.exists()){
                // console.log(docSnap.data())
                othersNameIn.value = docSnap.data().othersName
                othersPriceIn.value = docSnap.data().othersPrice
                let photoSee = docSnap.data().othersImage
    
                console.log(photoSee)
            }else{
                alert('Product does not exist')
            }
        }
        othersRead.addEventListener('click', readForothers)
    
        // DELETE FOR OTHERS
            async function deleteForothers(){
                let othersName = othersNameIn.value
                var ref = doc(db, "OTHERS", othersName)
                const docSnap = await getDoc(ref)
                if(!docSnap.exists()){
                    alert('No such Document')
                }
                await deleteDoc(ref)
                .then(() => {
                    alert('Product Deleted')
                })
                .catch(error => {
                    alert(error.message)
                })
            }
    
            othersDelete.addEventListener('click', deleteForothers)




        // FOR LATEST PAGE
        let latestNameIn = document.getElementById('latestName')
        let latestPriceIn = document.getElementById('latestPrice')
        let latestImageIn = document.getElementById('latestImage')
        
        let latestWrite = document.getElementById('latestWrite')
        let latestUpdate = document.getElementById('latestUpdate')
        let latestRead = document.getElementById('latestRead')
        let latestDelete = document.getElementById('latestDelete')
    
        async function writeForlatest() {
            let latestName = latestNameIn.value
            let latestPrice = latestPriceIn.value
            
            if (latestName == '' || latestPrice == '') {
                alert('Please fill all empty spaces');
            } else {
                let file = latestImageIn.files[0];
                var fileName = file.name;
    
                const storageRef = ref(storage, 'LATEST/' + fileName);
                const uploadTask = uploadBytesResumable(storageRef, file);
    
                uploadTask.on('state_changed', (snapshot) => {
                let progressDigit = document.getElementById('latestProgress')
                var progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes) * 100)
                progressDigit.textContent = progress + "%"



                    console.log(snapshot);
                }, (error) => {
                    console.log(error);
                }, async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
    
                    const ref = doc(db, "LATEST", latestName);
                    await setDoc(ref, {
                        latestName: latestName,
                        latestPrice: parseFloat(latestPrice),
                        latestImage: downloadURL,  
                    });
    
                    alert("Uploading Successful");
                    clearFormlatest();
                });
            }
        }
    
        function clearFormlatest() {
            // Clear form fields after successful upload
            latestNameIn.value = ''
            latestPriceIn.value = ''
            latestDigit.value = ''
            }
    
            latestWrite.addEventListener('click', writeForlatest);
    
    
        // UPDATE FOR LATEST
        async function updateForlatest(){
    
            let latestName = latestNameIn.value
            let latestPrice = latestPriceIn.value
            
            var ref = doc(db, "LATEST", latestName)
            await updateDoc(ref, {
                latestName: latestName,
                latestPrice: parseFloat(latestPrice),
                // productImage: downloadURL,
            })
            .then(() => {
                alert('Updated Successfully')
            })
            .catch(error => {
                alert(error.message)
            })
            latestNameIn.value = ''
            latestPriceIn.value = ''
            }
            latestUpdate.addEventListener('click', updateForlatest)
    
    
        // READ FOR LATEST
        async function readForlatest(){
    
            let latestName = latestNameIn.value
            var ref = doc(db, "LATEST", latestName)
            const docSnap = await getDoc(ref)
            if(docSnap.exists()){
                // console.log(docSnap.data())
                latestNameIn.value = docSnap.data().latestName
                latestPriceIn.value = docSnap.data().latestPrice
                let photoSee = docSnap.data().latestImage
    
                console.log(photoSee)
            }else{
                alert('Product does not exist')
            }
        }
        latestRead.addEventListener('click', readForlatest)
    
        // DELETE FOR LATEST
            async function deleteForlatest(){
                let latestName = latestNameIn.value
                var ref = doc(db, "LATEST", latestName)
                const docSnap = await getDoc(ref)
                if(!docSnap.exists()){
                    alert('No such Document')
                }
                await deleteDoc(ref)
                .then(() => {
                    alert('Product Deleted')
                })
                .catch(error => {
                    alert(error.message)
                })
            }
    
            latestDelete.addEventListener('click', deleteForlatest)




        // FOR LATEST PAGE
        let blogNameIn = document.getElementById('blogTitle')
        let blogPriceIn = document.getElementById('blogText')
        let blogImageIn = document.getElementById('blogImage')
        
        let blogWrite = document.getElementById('blogWrite')
        let blogUpdate = document.getElementById('blogUpdate')
        let blogRead = document.getElementById('blogRead')
        let blogDelete = document.getElementById('blogDelete')
    
        async function writeForblog() {
            let blogName = blogNameIn.value
            let blogPrice = blogPriceIn.value
            
            if (blogName == '' || blogPrice == '') {
                alert('Please fill all empty spaces');
            } else {
                let file = blogImageIn.files[0];
                var fileName = file.name;
    
                const storageRef = ref(storage, 'BLOG/' + fileName);
                const uploadTask = uploadBytesResumable(storageRef, file);
    
                uploadTask.on('state_changed', (snapshot) => {
                let progressDigit = document.getElementById('blogProgress')
                var progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes) * 100)
                progressDigit.textContent = progress + "%"



                    console.log(snapshot);
                }, (error) => {
                    console.log(error);
                }, async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
    
                    const ref = doc(db, "BLOG", blogName);
                    await setDoc(ref, {
                        blogName: blogName,
                        blogPrice: blogPrice,
                        blogImage: downloadURL,  
                    });
    
                    alert("Uploading Successful");
                    clearFormblog();
                });
            }
        }
    
        function clearFormblog() {
            // Clear form fields after successful upload
            blogNameIn.value = ''
            blogPriceIn.value = ''
            blogDigit.value = ''
            }
    
            blogWrite.addEventListener('click', writeForblog);
    
    
        // UPDATE FOR BLOG
        async function updateForblog(){
    
            let blogName = blogNameIn.value
            let blogPrice = blogPriceIn.value
            
            var ref = doc(db, "BLOG", blogName)
            await updateDoc(ref, {
                blogName: blogName,
                blogPrice: blogPrice,
                // productImage: downloadURL,
            })
            .then(() => {
                alert('Updated Successfully')
            })
            .catch(error => {
                alert(error.message)
            })
            blogNameIn.value = ''
            blogPriceIn.value = ''
            }
            blogUpdate.addEventListener('click', updateForblog)
    
    
        // READ FOR BLOG
        async function readForblog(){
    
            let blogName = blogNameIn.value
            var ref = doc(db, "BLOG", blogName)
            const docSnap = await getDoc(ref)
            if(docSnap.exists()){
                // console.log(docSnap.data())
                blogNameIn.value = docSnap.data().blogName
                blogPriceIn.value = docSnap.data().blogPrice
                let photoSee = docSnap.data().blogImage
    
                console.log(photoSee)
            }else{
                alert('Product does not exist')
            }
        }
        blogRead.addEventListener('click', readForblog)
    
        // DELETE FOR BLOG
            async function deleteForblog(){
                let blogName = blogNameIn.value
                var ref = doc(db, "BLOG", blogName)
                const docSnap = await getDoc(ref)
                if(!docSnap.exists()){
                    alert('No such Document')
                }
                await deleteDoc(ref)
                .then(() => {
                    alert('Product Deleted')
                })
                .catch(error => {
                    alert(error.message)
                })
            }
    
            blogDelete.addEventListener('click', deleteForblog)






        // FOR LATEST PAGE
        let discountNameIn = document.getElementById('discountName')
        let discountPriceIn = document.getElementById('discountPrice')
        let discountImageIn = document.getElementById('discountImage')
        
        let discountWrite = document.getElementById('discountWrite')
        let discountUpdate = document.getElementById('discountUpdate')
        let discountRead = document.getElementById('discountRead')
        let discountDelete = document.getElementById('discountDelete')
    
        async function writeFordiscount() {
            let discountName = discountNameIn.value
            let discountPrice = discountPriceIn.value
            
            if (discountName == '' || discountPrice == '') {
                alert('Please fill all empty spaces');
            } else {
                let file = discountImageIn.files[0];
                var fileName = file.name;
    
                const storageRef = ref(storage, 'DISCOUNT/' + fileName);
                const uploadTask = uploadBytesResumable(storageRef, file);
    
                uploadTask.on('state_changed', (snapshot) => {
                let progressDigit = document.getElementById('discountProgress')
                var progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes) * 100)
                progressDigit.textContent = progress + "%"



                    console.log(snapshot);
                }, (error) => {
                    console.log(error);
                }, async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
    
                    const ref = doc(db, "DISCOUNT", discountName);
                    await setDoc(ref, {
                        discountName: discountName,
                        discountPrice: parseFloat(discountPrice),
                        discountImage: downloadURL,  
                    });
    
                    alert("Uploading Successful");
                    clearFormdiscount();
                });
            }
        }
    
        function clearFormdiscount() {
            // Clear form fields after successful upload
            discountNameIn.value = ''
            discountPriceIn.value = ''
            discountDigit.value = ''
            }
    
            discountWrite.addEventListener('click', writeFordiscount);
    
    
        // UPDATE FOR LATEST
        async function updateFordiscount(){
    
            let discountName = discountNameIn.value
            let discountPrice = discountPriceIn.value
            
            var ref = doc(db, "DISCOUNT", discountName)
            await updateDoc(ref, {
                discountName: discountName,
                discountPrice: parseFloat(discountPrice),
                // productImage: downloadURL,
            })
            .then(() => {
                alert('Updated Successfully')
            })
            .catch(error => {
                alert(error.message)
            })
            discountNameIn.value = ''
            discountPriceIn.value = ''
            }
            discountUpdate.addEventListener('click', updateFordiscount)
    
    
        // READ FOR LATEST
        async function readFordiscount(){
    
            let discountName = discountNameIn.value
            var ref = doc(db, "DISCOUNT", discountName)
            const docSnap = await getDoc(ref)
            if(docSnap.exists()){
                // console.log(docSnap.data())
                discountNameIn.value = docSnap.data().discountName
                discountPriceIn.value = docSnap.data().discountPrice
                let photoSee = docSnap.data().discountImage
    
                console.log(photoSee)
            }else{
                alert('Product does not exist')
            }
        }
        discountRead.addEventListener('click', readFordiscount)
    
        // DELETE FOR LATEST
            async function deleteFordiscount(){
                let discountName = discountNameIn.value
                var ref = doc(db, "DISCOUNT", discountName)
                const docSnap = await getDoc(ref)
                if(!docSnap.exists()){
                    alert('No such Document')
                }
                await deleteDoc(ref)
                .then(() => {
                    alert('Product Deleted')
                })
                .catch(error => {
                    alert(error.message)
                })
            }
    
            discountDelete.addEventListener('click', deleteFordiscount)




















