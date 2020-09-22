exports.config = {

    project: "PXnLVd88ExbvwYBXg611",
    token: "dFOgZpMvl8PtjHIecaXBuvp6AWhDkhReB98MMM0ey4voZagj5N",

    // Specify which label you would like to run. All tests with the 
    // specified label will be executed
    // label: "sanity",

    // Your Selenium grid
    grid: "Testim-Grid",
    suite: "Employees",

    // Override the base URL defined in the test in order to run it again a     // different envinronment
    //baseUrl: 'http://staging.example.com',

    // =====
    // Hooks
    // =====
    // Testim provides several hooks you can use to interfere the test 
    // process in order to enhance it and build services around it.

    // Hook that gets executed before the suite starts
    // beforeSuite: function (suite) {
    //     let username = Math.round(Math.random()*100000);
    //     let password = "123456";
    //     let email = `${username}@email.com`;
    //
    //     return {
    //         overrideTestData: {
    //             "Register": {username, password, email },
    //             "Employees - Create": {username, password, email },
    //             "Employees - Update": {username, password, email },
    //             "Employees - Delete": {username, password, email },
    //         }
    //     };
    // }
};
