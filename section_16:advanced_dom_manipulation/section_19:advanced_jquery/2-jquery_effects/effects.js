// // 1. Fade out

// $("#wrongButton").click(function() {
//   $("div").fadeOut(5000);
//   $("div").remove();
//   alert("Fade not completed");
// });

// // Note the use of call back function to run an action after the fadeout
// $("#rightButton").click(function() {
//   $("div").fadeOut(5000, function() {
//     $(this).remove();
//     alert("Fade completed");
//   });
// });

// // 2. Fade in
// // Comment the rest
// $("#rightButton").click(function() {
//     $("div").fadeIn(1000);
//   });

// // 3. Fade toggle
// // Comment the rest
// $("#rightButton").click(function() {
//     $("div").fadeToggle(1000);
//   });

// // 4. slide down
// // Comment the rest
// $("#rightButton").click(function() {
//     $("div").slideDown(1000);
//   });

// // 5. slide up
// // Comment the rest
// $("#rightButton").click(function() {
//     $("div").slideUp(1000);
//   });

// 4. slide toggle
// Comment the rest
$("#rightButton").click(function() {
    $("div").slideToggle(1000, function(){
        console.log("SLIDE IS DONE!")
        $(this).remove();
    });
  });
