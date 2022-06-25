document.getElementById("login").onclick = function() {

    let Email = document.getElementById("Email").value;
    let Password = document.getElementById("Password").value;
    //summon firebase to authorise a login
    firebase.auth().signInWithEmailAndPassword(Email, Password).then((userCred) => {
        let userId = userCred.user.uid;
        //getting the UserType from the firestore
        firebase.firestore().collection("users").doc(userId).get().then((user) => {
            let UserType = user.data().userType;

            if (UserType == "admin") {
                window.location.href = "dashboard.html";
            } else if (UserType == "Hr") {
                window.location.href = "../Office_management/dashboard/Hr.html";
            } else if (UserType == "finance") {
                window.location.href = "../Office_management/dashboard/finance.html";
            } else {
                alert("UserType not found");
            }
        })

    }).catch((error) => {
        const error1 = error.message;
        alert(error1);
    });
}