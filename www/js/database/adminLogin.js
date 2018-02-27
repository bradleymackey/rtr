
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
            console.log("admin login success!");
            $("#admin-login-error").hide();
            $("#adminLogin").hide();
            $("#admin-login-success").show();
        }
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(`there was an admin login error: ${errorCode}, ${errorMessage}`);
        $("#admin-login-error").show();
      });
});