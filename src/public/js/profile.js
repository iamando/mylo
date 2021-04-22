$(function () {
  $("#submitFacebookProfile").on("click", (e) => {
    e.preventDefault();
    $.ajax({
      url: `${window.location.origin}/set-up-user-fb-profile`,
      method: "POST",
      data: {},
      success: (data) => {
        alert("Setup succeeds");
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  });
});
