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
        firebase.firestore().collection("dPaymentMethod").get().then((querySnapshot) => {
                let content = '';
                querySnapshot.forEach((doc) => {
                    let pMethod = doc.data().pMethodInput;
                    let docId = doc.data().docId;

                    content += '<option value="' + pMethod + '">' + pMethod + '</option>';

                })
                $("#paymentMethod").append(content);
            })
            //user adding the Income
        document.getElementById("saveIncome").onclick = function() {

                let incAmount = document.getElementById("incAmount").value;
                let incomeAddTime = document.getElementById("incomeAddTime").value;
                let incomeFrom = document.getElementById("incomeFrom").value;
                let incomeDescription = document.getElementById("incomeDescription").value;
                let paymentMethod = document.getElementById("paymentMethod").value;

                let incomeDoc = firebase.firestore().collection("income").doc();
                incomeDoc.set({
                    incAmount: incAmount,
                    incomeAddTime: incomeAddTime,
                    incomeFrom: incomeFrom,
                    incomeDescription: incomeDescription,
                    paymentMethod: paymentMethod,
                    incomeDoc: incomeDoc.id
                }).then(() => {
                    window.location.reload();
                })
            }
            //showing to the User!
        firebase.firestore().collection("income").get().then((querySnapshot) => {
            let contentIncome = '';
            querySnapshot.forEach((doc) => {
                let incAmount = doc.data().incAmount;
                let incomeAddTime = doc.data().incomeAddTime;
                let incomeFrom = doc.data().incomeFrom;
                let paymentMethod = doc.data().paymentMethod;
                let incomeDescription = doc.data().incomeDescription;

                contentIncome += '<tr>';
                contentIncome += '<td>' + incAmount + '</td>';
                contentIncome += '<td>' + incomeAddTime + '</td>';
                contentIncome += '<td>' + incomeFrom + '</td>';
                contentIncome += '<td>' + paymentMethod + '</td>';
                contentIncome += '<td>' + incomeDescription + '</td>';
                contentIncome += '</tr>';

            })
            $("incomeDisplay").append(contentIncome);
        })


    } else {
        window.location.href = "/Office_management/index.html"
    }
})