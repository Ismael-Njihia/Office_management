firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        userId = user.uid;
        console.log(userId)
            //pull the payment cycle!
        firebase.firestore().collection("cyclePeriod").get().then((querySnapshot) => {
            let content = '';
            querySnapshot.forEach((doc) => {
                let cyclename = doc.data().cyclePeriod;
                let docId = doc.data().docId;

                content += '<option value="' + cyclename + '">' + cyclename + '</option>';
            })
            $("#paymentCycle").append(content);
        })

        document.getElementById("addBills").onclick = function() {
            let theBill = document.getElementById("theBill").value;
            let billAmount = document.getElementById("billAmount").value;
            let cyclename = document.getElementById("paymentCycle").value;
            //store in the firestore database
            let recExpenses = firebase.firestore().collection("recExpenses").doc();
            recExpenses.set({
                    theBill: theBill,
                    billAmount: billAmount,
                    cyclename: cyclename,
                    docId: recExpenses.id

                }).then(() => {
                    window.location.reload();
                })
                //show the rec_expenses to the User

        }
        firebase.firestore().collection("recExpenses").get().then((querySnapshot) => {
            let content = '';
            querySnapshot.forEach((doc) => {
                let theBill = doc.data().theBill;
                let billAmount = doc.data().billAmount;
                let paymentCycle = doc.data().cyclename;
                let docId = doc.data().docId

                content += '<tr>';
                content += '<td>' + theBill + '</td>';
                content += '<td>' + billAmount + '</td>';
                content += '<td>' + paymentCycle + '</td>';
                content += '  <td> <button class="btn btn-primary">Edit</button> </td>';
                content += '  <td> <button class="btn btn-danger">Delete</button> </td>';
                content += '<td>'

                content += '</tr>';
            })
            $("#billList").append(content);
        })

    } else {
        window.location.href = "OFFICE_MANAGEMENT/index.html"
    }
})