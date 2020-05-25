
$(()=>{

    const randKey = (i) => {      
        var rnd = ''
        while (rnd.length < i) 
            rnd += Math.random().toString(36).substring(2)
        return rnd.substring(0, i)
    }
    var switcher = false

    const names = [
        "Зашифруй свои сообщения",
        "Vk Message Cryptor",
        "Мы против секретов",
        "Понтанись перед друзьями"
    ]
    $("#title_msg").text( names[ Math.floor(Math.random() * names.length)] )

    chrome.storage.local.get('settings', function(data) {
        let arr = data["settings"] 
        $("#key_send_text").val( arr.key  || "Key" )  
        $("#pod_send_text").val( arr.code || "Name" )
        switcher = arr.enter_send || false
        setSwitch(switcher);
    });
 

    const save_all = ()=>{
        chrome.storage.local.set({
            "settings" :{
                "key" : $("#key_send_text").val() || "Key",
                "code": $("#pod_send_text").val() || "Name",
                "enter_send": switcher 
            }
        });
    }

    const contents = chrome.extension.getURL("i");

    const setHover = (btn,def,hover,click)=>{
       let image = btn.children().first()
        btn.mouseleave(()=>{
            image.attr("src",def);
        })
        btn.mouseenter(()=>{
            image.attr("src",hover);
        })
        btn.mousedown(()=>{
            image.attr("src",click);
        })        
        btn.mouseup(()=>{
            image.attr("src",hover);
        })
    }

    const key_send = $("#key_send")
    setHover(key_send,contents+"/images/Accept-default.png" , contents+"/images/Accept-hover.png",contents+"/images/Accept-click.png")
    key_send.click(save_all)

    const pod_send = $("#pod_send")
    setHover(pod_send,contents+"/images/Accept-default.png" , contents+"/images/Accept-hover.png",contents+"/images/Accept-click.png")
    $("#pod_send").click(save_all)

    const key_rand = $("#key_rand")
    setHover(key_rand,contents+"/images/Random-default.png" , contents+"/images/Random-hover.png",contents+"/images/Random-click.png")
    key_rand.click(()=>{
        $("#key_send_text").val( randKey(16) )
    })

    var switcher_value = "";
    const setSwitch = (switcher) => {
      if (switcher) {
        $(".point").css("margin-left", "20px");
        $(".centr").css("border-radius", "5px 0px 0px 5px");
        $(".var-2").css("border-radius", "0px 5px 5px 0px");
        $(".var-2").css("background-color", "#fff");
        $(".var-1").css("background-color", "#bfcee0");
        switcher_value = $(".var-2").text();
      } else {
        $(".point").css("margin-left", "-3px");
        $(".centr").css("border-radius", "0px 5px 5px 0px");
        $(".var-1").css("border-radius", "5px 0px 0px 5px");
        $(".var-1").css("background-color", "#fff");
        $(".var-2").css("background-color", "#bfcee0");
        switcher_value = $(".var-1").text();
      }
      save_all()
      $("#output").text(switcher_value);
    };
    
    switcher_value = $(".var-1").text();
    $("#output").text($(".var-1").text());
    $(".selector").click(function () {
      switcher = !switcher;
      setSwitch(switcher);
    });
    $(".var-1").click(() => {
      switcher = false;
      setSwitch(switcher);
    });
    $(".var-2").click(() => {
      switcher = true;
      setSwitch(switcher);
    });
    











})

