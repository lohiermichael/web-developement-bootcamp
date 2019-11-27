// Check off specific todos by clicking
// Events work for li inside ul
$("ul").on("click", "li", (function(){
    $(this).toggleClass("completed");
}));

// Click on X to delete Todos
$("ul").on("click", "span", (function(e){
    // We don't want to toggle the class of the li by clicking on X
    e.stopPropagation();
    $(this).parent().fadeOut(500, function(){
        $(this).remove();
    })
}));

// Input add to the checklist
$("input[type='text']").on("keypress", function(e){
    // If click on enter
    if (e.which === 13){
        if ($(this).val() !== ""){
            // Grabbing new todo text from input
            var todoText = $(this).val();
            // Add input text in a new li of the ul
            $("ul").append("<li><span>X</span> " + todoText + "</li>");
            // Remove text from input
            $(this).val("");
        }
    }
})