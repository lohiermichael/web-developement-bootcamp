var lis = document.querySelectorAll("li");

for (i = 0; i < lis.length; i++){
    // It works every time we start hovering over the element
    lis[i].addEventListener("mouseover", function(){
        this.classList.add("selected");
    })
    
    // We want the color to change back when we stop hovering over the element
    lis[i].addEventListener("mouseout", function(){
        this.classList.remove("selected");
    })
    lis[i].addEventListener("click", function(){
        this.classList.toggle("done");
    })
}