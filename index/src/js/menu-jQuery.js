$("p.btnController").on("click", function(){
    // console.log("1")
    if ($("div.MenuBar").hasClass("hidden")){
        $("div.MenuBar").removeClass("hidden").addClass("flex");
        $(document.body).css("overflow", "hidden")
        $("footer").addClass("hidden")
        $("main.ContentWrapper").addClass("hidden")
        $("div.avatarContain").addClass("hidden")
    } else {
        $("div.MenuBar").removeClass("flex").addClass("hidden");
        $(document.body).css("overflow", "auto")
        $("main.ContentWrapper").removeClass("hidden")
        $("div.avatarContain").removeClass("hidden")

        $("footer").removeClass("hidden")

    }
})

// console.log($("p.btnController"))