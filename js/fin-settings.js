firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        //adding a payment Method
        document.getElementById("addPaymentsave").onclick = function() {
                let paymenMethod = document.getElementById("paymenMethod").value;

                let addPayment = firebase.firestore().collection("dPaymentMethod").doc();
                addPayment.set({
                    pMethodInput: paymenMethod,
                    docId: addPayment.id,
                }).then(() => {
                    window.location.reload();
                })
            }
            //Making the Payment available to the User
        firebase.firestore().collection("dPaymentMethod").get().then((querySnapshot) => {
                let content = '';
                querySnapshot.forEach((doc) => {
                    let pMethod = doc.data().pMethodInput;
                    let docId = doc.data().docId

                    content += '<tr>';
                    content += '<td>' + pMethod + '</td>';
                    content += '<td> <button class = "btn btn-danger"> Delete</button> </td>';
                    content += '</tr>'
                })
                $("#paymentMethodList").append(content);
            })
            // adding billing Cycle
        document.getElementById("saveCycleBilling").onclick = function() {
                let cyclePeriod = document.getElementById("cyclePeriod").value;
                let cyclePeriodAdd = firebase.firestore().collection("cyclePeriod").doc();
                cyclePeriodAdd.set({
                    docId: cyclePeriodAdd.id,
                    cyclePeriod: cyclePeriod,

                }).then(() => {
                    window.location.reload();
                })

            }
            //showing the billing cycle to the user
        firebase.firestore().collection("cyclePeriod").get().then((querySnapshot) => {
            let content = '';
            querySnapshot.forEach((doc) => {
                let docId = doc.data().docId;
                let cyclePeriod = doc.data().cyclePeriod;

                content += '<tr>';
                content += '<td>' + cyclePeriod + '</td>';
                content += '<td> <button class="btn btn-danger">Delete </td>';
                content += '</tr>';


            })
            $("#paymentCycleList").append(content);
        })

    } else {
        window.location.href = "OFFICE_MANAGEMENT/index.html"
    }
})