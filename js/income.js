firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        //who is logged in?
        let userId = user.uid;
        console.log(userId)
            //userType logged in
        firebase.firestore().collection("users").doc(userId).get().then((doc) => {
                let userName = doc.data().userName;
                let userType = doc.data().userType;

                document.getElementById("navUserName").innerText = userName;
                document.getElementById("navUserType").innerText = userType;
            })
            //show the paymentMethod from the settings
        firebase.firestore().collection("paymentMethod").get().then((querySnapshot) => {
            let content = '';
            querySnapshot.forEach((doc) => {
                let pMethod = doc.data().pMethodInput;
                let docId = doc.data().docId;

                content += '<option value="' + pMethod + '">' + pMethod + '</option';

            })
            $("#paymentMethod").append(content);
        })

        //capture the user input
        document.getElementById("submit").onclick = function() {
            let incomeAmount = document.getElementById("incAmount").Value;
            let incomeAddTime = document.getElementById("incomeAddTime").Value;
            let incomeFrom = document.getElementById("incomeFrom").Value;
            let incomeDescription = document.getElementById("incomeDescription").Value;
            // let paymentMethod = document.getElementById("paymentMethod").Value;
            console.log(incomeAddTime);

            let addIncome = firebase.firestore().collection("income").doc();
            addIncome.set({
                docId: addIncome.id,
                incomeAmount: incomeAmount,
                incomeAddTime: incomeAddTime,
                incomeFrom: incomeFrom,
                incomeDescription: incomeDescription,
                paymentMethod: paymentMethod
            }).then(() => {
                window.location.reload;
            })
        }
    } else {
        window.location.href = "/Office_management/index.html"
    }
})