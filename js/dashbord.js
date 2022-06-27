firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        let userId = user.uid;
        console.log(userId);

        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'March', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                        label: 'Income',
                        data: [20000, 14000, 30000, 15000, 21000, 30000, 10000, 21000, 13000, 40000, 30000, 52000, 34000],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    },

                    {
                        label: 'Expense',
                        data: [10000, 4000, 14000, 10000, 17000, 18000, 10000, 31000, 17000, 20000, 20000, 32000, 30000],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    },

                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        firebase.firestore().collection("income").get().then((querSnapshot) => {
            let income = 0;
            querSnapshot.forEach((doc) => {
                    let incomeToday = doc.data().incAmount;
                    let incomeDate = doc.data().incomeAddTime;
                    let incomeConverted = parseInt(incomeToday)


                    //lets get todays date
                    let todaysDate = new Date();
                    let thisYear = todaysDate.getFullYear();
                    let thisMonth = todaysDate.getMonth();
                    let thisDate = todaysDate.getDate();
                    thisMonth += 1

                    if (thisMonth < 10) {
                        thisMonth = "0" + thisMonth
                    }
                    let todayFinal = thisYear + "-" + thisMonth + "-" + thisDate;

                    //the date int the doc

                    //split the date
                    let splitDate = incomeDate.split("T");
                    let dateFine = splitDate[0];

                    if (dateFine == todayFinal) {
                        income += incomeConverted;

                    }


                })
                //function to add comma after 3 digits
            function addComma(value) {
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
            document.getElementById("incomeToday").innerText = "KES" + " " + addComma(income);

        })
        firebase.firestore().collection("income").get().then((querySnapshot) => {
            let Income = 0;
            querySnapshot.forEach((doc) => {
                    let incomeMonth = doc.data().incAmount;
                    let incomeDate = doc.data().incomeAddTime;
                    let incomeConverted = parseInt(incomeMonth)

                    //lets get todays date
                    let todaysDate = new Date();
                    let thisYear = todaysDate.getFullYear();
                    let thisMonth = todaysDate.getMonth();
                    thisMonth += 1

                    if (thisMonth < 10) {
                        thisMonth = "0" + thisMonth
                    }

                    //current Month and year
                    let IncomeMonth = thisYear + "-" + thisMonth;

                    //month and year in the doc
                    let splitMonth = incomeDate.split("-");
                    let yearFine = splitMonth[0];
                    let monthFine = splitMonth[1];
                    let finalMonth = yearFine + "-" + monthFine;
                    console.log(IncomeMonth)
                    console.log(finalMonth)

                    if (IncomeMonth == finalMonth) {
                        Income += incomeConverted;
                    }
                    console.log(Income);


                })
                //function to add comma after 3 digits
            function addComma(value) {
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
            document.getElementById("incomeMonth").innerText = "KES" + " " + addComma(Income);

        })

    } else {
        window.location.href = "/Office_management/index.html"

    }
})