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

        //user adding the Income
        document.getElementById("saveEmployee").onclick = function() {

                let fullName = document.getElementById("fullName").value;
                let nationalId = document.getElementById("nationalId").value;
                let department = document.getElementById("department").value;
                let salary = document.getElementById("salary").value;
                let phoneNo = document.getElementById("phoneNo").value;
                let empType = document.getElementById("empType").value;

                let empDoc = firebase.firestore().collection("Employees").doc();
                empDoc.set({
                    fullName: fullName,
                    nationalId: nationalId,
                    department: department,
                    salary: salary,
                    phoneNo: phoneNo,
                    empType: empType,
                    empDoc: empDoc.id
                }).then(() => {
                    window.location.reload();
                })
            }
            //showing to the employee!
        firebase.firestore().collection("Employees").get().then((querySnapshot) => {
            let content = '';
            querySnapshot.forEach((doc) => {
                let fullName = doc.data().fullName;
                let nationalId = doc.data().nationalId;
                let department = doc.data().department;
                let salary = doc.data().salary;
                let phoneNo = doc.data().phoneNo;
                let empType = doc.data().empType;

                function addComma(value) {
                    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
                let salaryGood = addComma(salary);

                content += '<tr>';
                content += '<td>' + fullName + '</td>';
                content += '<td>' + nationalId + '</td>';
                content += '<td>' + department + '</td>';
                content += '<td>' + salaryGood + '</td>';
                content += '<td>' + phoneNo + '</td>';
                content += '<td>' + empType + '</td>';
                content += '<td> <button class="btn btn-primary">Pay Salary</button> </td>';
                content += '<td> <button class="btn btn-danger">Delete</button> </td>';
                content += '</tr>';

            })
            $("#employeesDisplay").append(content);
        })


    } else {
        window.location.href = "/Office_management/index.html"
    }
})