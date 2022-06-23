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
            //capture the user input
        document.getElementById("submit").onclick = function() {
            let incomeAmount = document.getElementById("incomeAmount").Value;
            let incomeAddTime = document.getElementById("incomeAddTime").Value;
            let incomeFrom = document.getElementById("incomeFrom").Value;
            let incomeDescription = document.getElementById("incomeDescription").Value;
            let paymentMethod = document.getElementById("paymentMethod").Value;

            firebase.firestore().collection("Income").doc().set({
                incomeAmount: incomeAmount,
                incomeAddTime: incomeAddTime,
                incomeFrom: incomeFrom,
                incomeDescription: incomeDescription,
                paymentMethod: paymentMethod
            })
        }
    } else {
        window.location.href = "/Office_management/index.html"
    }
})