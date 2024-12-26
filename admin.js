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
    

                // service workers
                if ('serviceWorker' in navigator) {
                    window.addEventListener('load', () => {
                      navigator.serviceWorker.register('/service-worker.js')
                        .then((registration) => {
                        //   console.log('Service Worker registered with scope:', registration.scope);
                        })
                        .catch((error) => {
                          console.log('Service Worker registration failed:', error);
                        });
                    });
                  }
        
      import{orderBy, onSnapshot, serverTimestamp, getFirestore, doc, getDoc, getDocs, setDoc, collection, addDoc, updateDoc, deleteDoc, deleteField, query, where} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
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
            }else{
                window.location.href = 'adminFirst.html'
            }
        })
    }
    stateChanged()


    //   FUNCTION TO GET USER DATA FROM DATABASE AND DISPLAY IT

    async function logUserDetails(userId){
        var ref = doc(db, "CUSTOMERS", userId)
        const docSnap = await getDoc(ref)
        if(docSnap.exists()){
        let adminName = document.getElementById('adminName')

        adminName.textContent = docSnap.data().Fullname + '!!!'
            // console.log(docSnap.data())
        }else{
            alert('data does not exist')
        }
    }








        // FOR JEWELERIES PAGE
        let productNameIn = document.getElementById('productName')
        let productPriceIn = document.getElementById('productPrice')
        let productImageIn = document.getElementById('productImage')
        let NewproductPriceIn = document.getElementById('NewproductPrice')

        let productWrite = document.getElementById('productWrite')
        let productUpdate = document.getElementById('productUpdate')
        let productRead = document.getElementById('productRead')
        let productDelete = document.getElementById('productDelete')
    
        async function writeForProduct() {
            let productName = productNameIn.value
            let productPrice = productPriceIn.value
            let newProductPrice = NewproductPriceIn.value

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
    
            if (productName == '' || productPrice == '' || newProductPrice == '') {
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
                        productPrice: productPrice,
                        newProductPrice: newProductPrice,
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
            NewproductPriceIn.value = ''
        }
    
        productWrite.addEventListener('click', writeForProduct);
    
    
        // UPDATE FOR PRODUCT
        async function updateForProduct(){
    
            let productName = productNameIn.value
            let productPrice = productPriceIn.value
            let newproductPrice = NewproductPriceIn.value

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
                productPrice: productPrice,
                slug : stringify(productName),
                newProductPrice: newproductPrice,
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
        let newkitchenPriceIn = document.getElementById('newkitchenPrice')

        let kitchenWrite = document.getElementById('kitchenWrite')
        let kitchenUpdate = document.getElementById('kitchenUpdate')
        let kitchenRead = document.getElementById('kitchenRead')
        let kitchenDelete = document.getElementById('kitchenDelete')
    
        async function writeForkitchen() {
            let kitchenName = kitchenNameIn.value
            let kitchenPrice = kitchenPriceIn.value
            let newkitchenPrice = newkitchenPriceIn.value

                        // SLUGIFY THE TITLE
                        function stringify(kitchenName){
                            return kitchenName.toLowerCase()
                            .normalize('NFD')
                            .replace(/[\u0300-\u036f]/g, '')
                            .split('')
                            .map(character => (/[a-z0-9]/.test(character) ? character : '-'))
                            .join('')
                            .replace(/-+/g, '-')
                            .replace(/^- |- $/g, '')
                        }
    
            if (kitchenName == '' || kitchenPrice == '' || newkitchenPrice == '') {
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
                        kitchenPrice: kitchenPrice,
                        newkitchenPrice: newkitchenPrice,
                        slug : stringify(kitchenName),
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
            newkitchenPriceIn.value = ''
        }
    
        kitchenWrite.addEventListener('click', writeForkitchen);
    
    
        // UPDATE FOR KITCHEN
        async function updateForkitchen(){
    
            let kitchenName = kitchenNameIn.value
            let kitchenPrice = kitchenPriceIn.value
            let newkitchenPrice = newkitchenPriceIn.value

            
                        // SLUGIFY THE TITLE
                        function stringify(kitchenName){
                            return kitchenName.toLowerCase()
                            .normalize('NFD')
                            .replace(/[\u0300-\u036f]/g, '')
                            .split('')
                            .map(character => (/[a-z0-9]/.test(character) ? character : '-'))
                            .join('')
                            .replace(/-+/g, '-')
                            .replace(/^- |- $/g, '')
                        }
            
            var ref = doc(db, "KITCHEN", kitchenName)
            await updateDoc(ref, {
                kitchenName: kitchenName,
                kitchenPrice: kitchenPrice,
                newkitchenPrice: newkitchenPrice,
                slug : stringify(kitchenName),
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
        let newlaundaryPriceIn = document.getElementById('newlaundaryPrice')
      
        let laundaryWrite = document.getElementById('laundaryWrite')
        let laundaryUpdate = document.getElementById('laundaryUpdate')
        let laundaryRead = document.getElementById('laundaryRead')
        let laundaryDelete = document.getElementById('laundaryDelete')
    
        async function writeForlaundary() {
            let laundaryName = laundaryNameIn.value
            let laundaryPrice = laundaryPriceIn.value
            let newlaundaryPrice = newlaundaryPriceIn.value
                        // SLUGIFY THE TITLE
                        function stringify(laundaryName){
                            return laundaryName.toLowerCase()
                            .normalize('NFD')
                            .replace(/[\u0300-\u036f]/g, '')
                            .split('')
                            .map(character => (/[a-z0-9]/.test(character) ? character : '-'))
                            .join('')
                            .replace(/-+/g, '-')
                            .replace(/^- |- $/g, '')
                        }
    
            if (laundaryName == '' || laundaryPrice == '' || newlaundaryPrice == '') {
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
                        laundaryPrice: laundaryPrice,
                        newlaundaryPrice: newlaundaryPrice,
                        slug : stringify(laundaryName),
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
            newlaundaryPriceIn.value = ''
            progressDigit.value = ''
            }
    
            laundaryWrite.addEventListener('click', writeForlaundary);
    
    
        // UPDATE FOR LAUNDARY
        async function updateForlaundary(){
    
            let laundaryName = laundaryNameIn.value
            let laundaryPrice = laundaryPriceIn.value
            let newlaundaryPrice = newlaundaryPriceIn.value
    
            // SLUGIFY THE TITLE
            function stringify(laundaryName){
                return laundaryName.toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .split('')
                .map(character => (/[a-z0-9]/.test(character) ? character : '-'))
                .join('')
                .replace(/-+/g, '-')
                .replace(/^- |- $/g, '')
            }

            var ref = doc(db, "LAUNDARY", laundaryName)
            await updateDoc(ref, {
                laundaryName: laundaryName,
                laundaryPrice: laundaryPrice,
                newlaundaryPrice: newlaundaryPrice,
                slug : stringify(laundaryName),
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
            newlaundaryPriceIn.value = ''
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
        let newclothingPriceIn = document.getElementById('newclothingPrice')

        let clothingWrite = document.getElementById('clothingWrite')
        let clothingUpdate = document.getElementById('clothingUpdate')
        let clothingRead = document.getElementById('clothingRead')
        let clothingDelete = document.getElementById('clothingDelete')
    
        async function writeForclothing() {
            let clothingName = clothingNameIn.value
            let clothingPrice = clothingPriceIn.value
            let newclothingPrice = newclothingPriceIn.value

            // SLUGIFY THE TITLE
            function stringify(clothingName){
                return clothingName.toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .split('')
                .map(character => (/[a-z0-9]/.test(character) ? character : '-'))
                .join('')
                .replace(/-+/g, '-')
                .replace(/^- |- $/g, '')
            }
    
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
                        clothingPrice: clothingPrice,
                        newclothingPrice: newclothingPrice,
                        slug : stringify(clothingName),
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
            newclothingPriceIn.value = ''
            progressDigit.value = ''
            }
    
            clothingWrite.addEventListener('click', writeForclothing);
    
    
        // UPDATE FOR CLOTHING
        async function updateForclothing(){
    
            let clothingName = clothingNameIn.value
            let clothingPrice = productPriceIn.value
            let newclothingPrice = newclothingPriceIn.value
            

            // SLUGIFY THE TITLE
            function stringify(clothingName){
                return clothingName.toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .split('')
                .map(character => (/[a-z0-9]/.test(character) ? character : '-'))
                .join('')
                .replace(/-+/g, '-')
                .replace(/^- |- $/g, '')
            }

            var ref = doc(db, "CLOTHING", clothingName)
            await updateDoc(ref, {
                clothingName: clothingName,
                clothingPrice: clothingPrice,
                newclothingPrice: newclothingPrice,
                slug : stringify(clothingName),
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
            newclothingPriceIn.value = ''
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
        let newbathroomPriceIn = document.getElementById('newbathroomPrice')


        let bathroomWrite = document.getElementById('bathroomWrite')
        let bathroomUpdate = document.getElementById('bathroomUpdate')
        let bathroomRead = document.getElementById('bathroomRead')
        let bathroomDelete = document.getElementById('bathroomDelete')
    
        async function writeForbathroom() {
            let bathroomName = bathroomNameIn.value
            let bathroomPrice = bathroomPriceIn.value
            let newbathroomPrice = newbathroomPriceIn.value
            
            // SLUGIFY THE TITLE
            function stringify(bathroomName){
                return bathroomName.toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .split('')
                .map(character => (/[a-z0-9]/.test(character) ? character : '-'))
                .join('')
                .replace(/-+/g, '-')
                .replace(/^- |- $/g, '')
            }

            if (bathroomName == '' || bathroomPrice == '' || newbathroomPrice == '') {
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
                        bathroomPrice: bathroomPrice,
                        newbathroomPrice: newbathroomPrice,
                        slug : stringify(bathroomName),
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
            newbathroomPriceIn.value = ''
            progressDigit.value = ''
            }
    
            bathroomWrite.addEventListener('click', writeForbathroom);
    
    
        // UPDATE FOR BATHROOM
        async function updateForbathroom(){
    
            let bathroomName = bathroomNameIn.value
            let bathroomPrice = bathroomPriceIn.value
            let newbathroomPrice = newbathroomPriceIn.value
            

            
            // SLUGIFY THE TITLE
            function stringify(bathroomName){
                return bathroomName.toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .split('')
                .map(character => (/[a-z0-9]/.test(character) ? character : '-'))
                .join('')
                .replace(/-+/g, '-')
                .replace(/^- |- $/g, '')
            }


            var ref = doc(db, "BATHROOM", bathroomName)
            await updateDoc(ref, {
                bathroomName: bathroomName,
                bathroomPrice: bathroomPrice,
                newbathroomPrice: newbathroomPrice,
                slug: stringify(bathroomName),
                })
            .then(() => {
                alert('Updated Successfully')
            })
            .catch(error => {
                alert(error.message)
            })
            bathroomNameIn.value = ''
            bathroomPriceIn.value = ''
            newbathroomPriceIn.value = ''
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
        let newphonePriceIn = document.getElementById('newphonePrice')
        
        let phoneWrite = document.getElementById('phoneWrite')
        let phoneUpdate = document.getElementById('phoneUpdate')
        let phoneRead = document.getElementById('phoneRead')
        let phoneDelete = document.getElementById('phoneDelete')
    
        async function writeForphone() {
            let phoneName = phoneNameIn.value
            let phonePrice = phonePriceIn.value
            let newphonePrice = newphonePriceIn.value
            

            
            // SLUGIFY THE TITLE
            function stringify(phoneName){
                return phoneName.toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .split('')
                .map(character => (/[a-z0-9]/.test(character) ? character : '-'))
                .join('')
                .replace(/-+/g, '-')
                .replace(/^- |- $/g, '')
            }


            if (phoneName == '' || phonePrice == '' || newphonePrice == '') {
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
                        phonePrice: phonePrice,
                        newphonePrice: newphonePrice,
                        slug : stringify(phoneName),
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
            newphonePriceIn.value = ''
            progressDigit.value = ''
            }
    
            phoneWrite.addEventListener('click', writeForphone);
    
    
        // UPDATE FOR PHONE
        async function updateForphone(){
    
            let phoneName = phoneNameIn.value
            let phonePrice = phonePriceIn.value
            let newphonePrice = newphonePriceIn.value
            


            
            // SLUGIFY THE TITLE
            function stringify(phoneName){
                return phoneName.toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .split('')
                .map(character => (/[a-z0-9]/.test(character) ? character : '-'))
                .join('')
                .replace(/-+/g, '-')
                .replace(/^- |- $/g, '')
            }

            var ref = doc(db, "PHONE", phoneName)
            await updateDoc(ref, {
                phoneName: phoneName,
                phonePrice: phonePrice,
                newphonePrice: newphonePrice,
                slug : stringify(phoneName),
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
            newphonePriceIn.value = ''
            }
            phoneUpdate.addEventListener('click', updateForphone)
    
    
        // READ FOR PHONE
        async function readForphone(){
    
            let phoneName = phoneNameIn.value
            var ref = doc(db, "PHONE", phoneName)
            const docSnap = await getDoc(ref)
            if(docSnap.exists()){
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
        let newhomePriceIn = document.getElementById('newhomePrice')
        
        let homeWrite = document.getElementById('homeWrite')
        let homeUpdate = document.getElementById('homeUpdate')
        let homeRead = document.getElementById('homeRead')
        let homeDelete = document.getElementById('homeDelete')
    
        async function writeForhome() {
            let homeName = homeNameIn.value
            let homePrice = homePriceIn.value
            let newhomePrice = newhomePriceIn.value
            

            
            // SLUGIFY THE TITLE
            function stringify(homeName){
                return homeName.toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .split('')
                .map(character => (/[a-z0-9]/.test(character) ? character : '-'))
                .join('')
                .replace(/-+/g, '-')
                .replace(/^- |- $/g, '')
            }

            if (homeName == '' || homePrice == '' || newhomePrice == '') {
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
                        homePrice: homePrice,
                        newhomePrice: newhomePrice,
                        slug : stringify(homeName),
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
            newhomePriceIn.value = ''
            progressDigit.value = ''
            }
    
            homeWrite.addEventListener('click', writeForhome);
    
    
        // UPDATE FOR HOME
        async function updateForhome(){
    
            let homeName = homeNameIn.value
            let homePrice = homePriceIn.value
            let newhomePrice = newhomePriceIn.value
            
                        
            // SLUGIFY THE TITLE
            function stringify(homeName){
                return homeName.toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .split('')
                .map(character => (/[a-z0-9]/.test(character) ? character : '-'))
                .join('')
                .replace(/-+/g, '-')
                .replace(/^- |- $/g, '')
            }


            var ref = doc(db, "HOME", homeName)
            await updateDoc(ref, {
                homeName: homeName,
                homePrice: homePrice,
                newhomePrice: newhomePrice,
                slug : stringify(homeName)
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
            newhomePriceIn.value = ''
            }
            homeUpdate.addEventListener('click', updateForhome)
    
    
        // READ FOR HOME
        async function readForhome(){
    
            let homeName = homeNameIn.value
            var ref = doc(db, "HOME", homeName)
            const docSnap = await getDoc(ref)
            if(docSnap.exists()){
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
        let newothersPriceIn = document.getElementById('newothersPrice')
        
        let othersWrite = document.getElementById('othersWrite')
        let othersUpdate = document.getElementById('othersUpdate')
        let othersRead = document.getElementById('othersRead')
        let othersDelete = document.getElementById('othersDelete')
    
        async function writeForothers() {
            let othersName = othersNameIn.value
            let othersPrice = othersPriceIn.value
            let newothersPrice = newothersPriceIn.value

            // SLUGIFY THE TITLE
            function stringify(othersName){
                return othersName.toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .split('')
                .map(character => (/[a-z0-9]/.test(character) ? character : '-'))
                .join('')
                .replace(/-+/g, '-')
                .replace(/^- |- $/g, '')
            }
        
            
            if (othersName == '' || othersPrice == '' || newothersPrice == '') {
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
                        othersPrice: othersPrice,
                        newothersPrice: newothersPrice,
                        slug : stringify(othersName),
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
            newothersPriceIn.value = ''
            progressDigit.value = ''
            }
    
            othersWrite.addEventListener('click', writeForothers);
    
    
        // UPDATE FOR OTHERS
        async function updateForothers(){
    
            let othersName = othersNameIn.value
            let othersPrice = othersPriceIn.value
            let newothersPrice = newothersPriceIn.value
            
            // SLUGIFY THE TITLE
            function stringify(othersName){
                return othersName.toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .split('')
                .map(character => (/[a-z0-9]/.test(character) ? character : '-'))
                .join('')
                .replace(/-+/g, '-')
                .replace(/^- |- $/g, '')
            }


            var ref = doc(db, "OTHERS", othersName)
            await updateDoc(ref, {
                othersName: othersName,
                othersPrice: othersPrice,
                newothersPrice: newothersPrice,
                slug : stringify(othersName)
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
            newothersPriceIn.value = ''
            }
            othersUpdate.addEventListener('click', updateForothers)
    
    
        // READ FOR OTHERS
        async function readForothers(){
    
            let othersName = othersNameIn.value
            var ref = doc(db, "OTHERS", othersName)
            const docSnap = await getDoc(ref)
            if(docSnap.exists()){
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
                        latestPrice: latestPrice,
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
                latestPrice: latestPrice,
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
                        discountPrice: discountPrice,
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
                discountPrice: discountPrice,
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




    let proAppend = document.getElementById('proAppend')
    let fetchPro = document.getElementById('fetchPro')
    let updatePro = document.getElementById('updatePro')
    let statusLooker = document.querySelector('.statusLooker')
    let statusUpdate = document.querySelector('.statusUpdate')

            // FETCH PRODUCT
    async function fetcher() {
        let userId = document.getElementById('userId').value
        let proId = document.getElementById('proId').value

        const ordersRef = collection(db, "CARTS", userId, "orders");
        const q = query(ordersRef, where("id", "==", proId))

        getDocs(q)
        .then((snapshot) => {
            proAppend.innerHTML = ''
            if (!snapshot.empty) {
            snapshot.forEach((docSnap) => {

                const orderData = docSnap.data();
                let formattedPrice = new Intl.NumberFormat('en-NG', {
                    style : 'currency',
                    currency : 'NGN'
                }).format(`${orderData.price}`)

                let newDiv = document.createElement('div')
                newDiv.setAttribute('class', 'productDetails')
                newDiv.innerHTML = `
                    <img src="${orderData.image}" alt="">
                    <p id="proName">${orderData.name}</p>
                    <p id="proPrice">${formattedPrice}</p>
                    <p id="proStatus">${orderData.status}</p>                
                `
                proAppend.appendChild(newDiv)
            });
            } else {
            console.log("No matching product found in orders.");
            }
        })
        .catch((error) => {
            console.error("Error fetching product from orders:", error);
        });

    }

// UPDATE THE PRODUCT STATUS
let proStatus = document.getElementById('proStatus')
    async function updater(){
        try {
            
            let proStatuss = proStatus.value
            let userId = document.getElementById('userId').value
            let proId = document.getElementById('proId').value
            
            const updateValue = {
                status : proStatuss
            }
            const ordersRef = collection(db, "CARTS", userId, "orders");
            const q = query(ordersRef, where("id", "==", proId))
            const snapshot = await getDocs(q);


            if (!snapshot.empty) {
                snapshot.forEach(async (docSnap) => {
                  const orderRef = doc(db, "CARTS", userId, "orders", docSnap.id);
                  await updateDoc(orderRef, updateValue);

                  statusLooker.style.display = 'flex'
                  statusUpdate.textContent = proStatuss
                  setTimeout(() => {
                    statusLooker.style.display = 'none'
                  }, 3000);

                //   console.log("Cart updated successfully.");
                  proAppend.innerHTML = ''
                  document.getElementById('userId').value = ''
                  document.getElementById('proId').value = ''
                });
              } else {
                // console.log("No matching product found in the cart.");
              }
        } catch (error) {
            console.error("Error updating the cart:", error)
        }
    }

fetchPro.addEventListener('click', fetcher)
updatePro.addEventListener('click', updater)



// ANALYTICS
const analyticsContainer = document.getElementById("analyticsData");
const analyticsQuery = query(collection(db, "analyticsEvents"), orderBy("timestamp", "desc"));
onSnapshot(analyticsQuery, (snapshot) => {
    // Clear previous results
    analyticsContainer.innerHTML = "";

    snapshot.forEach(doc => {
        const data = doc.data();
        const eventData = `
            <div>
                <strong>Event:</strong> ${data.event}<br>
                <strong>Content ID:</strong> ${data.content_id}<br>
                <strong>Timestamp:</strong> ${new Date(data.timestamp.seconds * 1000).toLocaleString()}
            </div><hr>
        `;
        analyticsContainer.innerHTML += eventData;
    });
});