$(()=>{
    var chatBox_main =  $('._im_chat_input_parent')
    if (!chatBox_main) return
    var key = "говноключ"
    var signature = "123"
    var onCEnter = false
    const gg = "AKYCH_SHASHOLEOSH_LIBGEAR_2020."
    const spec_symbol = `⁣`
    const sailt = `U2FsdGVkX1`
    chrome.storage.local.get('settings', function(data) {
        
        key = data["settings"].key
        signature = data["settings"].code
        onCEnter = data["settings"].enter_send

        if(onCEnter){
            // О ВЕЛИКАЙ КАСТЫЛЬ НАВАЛИЛИ, О ШИКАРНЫЙ КОСТЫЛЬ НАВАЛИЛИ
            var Contrl = false
            chatBox_textenter.keydown(function (e) {
                if(e.keyCode == 17){
                    Contrl = true
                }
            })
            chatBox_textenter.keyup(function (e) {
                if(Contrl){
                    if (e.keyCode == 13){
                        crypto_button.click()
                    }
                    if(e.keyCode == 17){
                        Contrl = false
                    }
                }
            });
        }
    });

    chrome.storage.onChanged.addListener(function(changes, namespace) {
          var storageChange = changes["settings"];
          if(storageChange){
            key = storageChange.key
            signature = storageChange.code
            onCEnter = storageChange.enter_send
            location.reload(); 
          }
    });

    function randKey(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }
    const contents = chrome.extension.getURL("i");
    console.log(contents)


    var chatBox_buttonPanel = $('.im_chat-input--buttons')
    var chatBox_textenter = $('.im-chat-input--text')
        chatBox_textenter.css('background','RGB(250, 250, 250)');

    var crypto_button = $("<button><img id='LibGear_crypto_button' src='"+ contents+"/images/2.png'"+" height='21px' ></button>")
        crypto_button.css('background','RGBA(0, 0, 0, 0)');
        crypto_button.css('border','0px solid');
        crypto_button.css('margin-left','-15px');
        crypto_button.css('margin-top','2px');
        crypto_button.css('cursor','pointer');

    
    crypto_button.mouseleave(()=>{
        Icon.attr("src",contents+"/images/2.png");
    })

    crypto_button.mouseenter(()=>{
        Icon.attr("src",contents+"/images/2_hover.png");
    })

    setInterval(() => {
        $("._im_log_body").each(function(){
            let msg =  $( this )
            if( !msg.attr('class').endsWith('detected')){
             try {
                var decryptedBytes = CryptoJS.AES.decrypt(msg.text(), key);
                var plaintext = decryptedBytes.toString(CryptoJS.enc.Utf8);

                let r_key = plaintext.substring(0, 30);
                let k_msg = sailt + plaintext.substring(30, plaintext.length);

                var decryptedBytes = CryptoJS.AES.decrypt(k_msg, r_key);
                plaintext = decryptedBytes.toString(CryptoJS.enc.Utf8);
                let array = JSON.parse(plaintext)
               // if (array.signature){
                    msg.text( array.msg )
                    msg.prepend($(`<span style='color:RGB(100,100,100)' >${array.signature} </span><span style='color:RGB(160,160,160)' >➤ </span>`))
               // }
              } catch (err) {}
                msg.addClass('detected');
            }
        })
    }, 1500);

    chatBox_buttonPanel.append(crypto_button)
    var Icon = $('#LibGear_crypto_button')
    var sendButton = $(".im-chat-input--send")
    crypto_button.click(()=>{
        var text = chatBox_textenter.text()  
        if (text.length < 0 || text == ""){
            return 
        }
        let r_key = sailt + randKey(20)   
        let json = `{"signature" : "${signature}" , "msg" : "${text}"}`  
        let msg =  CryptoJS.AES.encrypt(r_key + CryptoJS.AES.encrypt(json, r_key).toString().replace(/^(U2FsdGVkX1)/g,"") , key) 
        chatBox_textenter.text( msg )
        sendButton.click()
    })
})
