
$("#adminLogin").submit((event) => {
    // prevent the page from reloading when the admin is logged in.
    event.preventDefault();
    // get the admin login values from the form
    const adminEmail = $("#admin-email").val();
    const adminPassword = $("#admin-password").val();
    // login the admin with the valid email and password
    firebase.auth().signInWithEmailAndPassword(adminEmail, adminPassword)
    .then(function(user) {
        if (user) {
            // login success
            console.log("admin login success!");
            $("#admin-login-error").hide();
            $("#adminLogin").hide();
            $("#admin-login-success").show();
        } else {
            // login success, but user object (a weird edge case!)
            console.log("logged in successfully, but we have no user object");
            $("#admin-login-error").show();
            $("#adminLogin").show();
            $("#admin-login-success").hide();
        }
    })
    .catch(function(error) {
        // the admin could not be logged in, show the error
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(`there was an admin login error: ${errorCode}, ${errorMessage}`);
        $("#admin-login-error").show();
      });
});