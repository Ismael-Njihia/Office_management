firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        const userId = user.uid;
        console.log(userId)


        document.getElementById("addIncome").onclick = function() {
            let incomeAmount = document.getElementById("incomeAmount").value;
            let incomeAddTime = document.getElementById("incomeAddTime").value;
            let incomeFrom = document.getElementById("incomeFrom").value;
            let incomeDescription = document.getElementById("incomeDescription").value;
            let paymentMethod = document.getElementById("paymentMethod").value;

            firebase.firestore

        }
    } else {
        alert("You are not logged in!");
        window.location.href = "/index.html";
    }
})