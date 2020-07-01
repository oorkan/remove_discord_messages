// Needs to be refactored
// For now, just a trash script that works 

userLogin = 'Paste your username here';
moreText = 'Paste Edit Message -> More button text here in the language you use';
scroller = document.querySelector('.messagesWrapper-3lZDfY .scroller-2FKFPG');
interval = setInterval(function() {
    document.querySelectorAll(".message-2qnXI6").forEach(function(value) {
        value.dispatchEvent(new MouseEvent('mousemove', { 'bubbles': true }));
    });
    username = document.querySelectorAll('.header-23xsNx .username-1A8OIy');
    username.forEach(function(value, index, obj) {
        let username = value.innerText;
        if(username == userLogin) {
            let message_container = value.closest('.message-2qnXI6');
            if(message_container) {   
                message_container.click();
                setTimeout(function() {
                    let more = message_container.querySelector('.button-1ZiXG9[aria-label='+moreText+']');
                    console.log(more);
                    if(more) {
                        more.click();
                        let message_actions_delete = document.querySelector("#message-actions #message-actions-delete");
                        if(message_actions_delete) {
                            message_actions_delete.click();
                            setTimeout(function() {
                                let mad_btn = document.querySelector(".modal-3c3bKg .button-38aScr[type=submit]");
                                mad_btn.click();
                            }, 200);            
                        }
                    }
                }, 200);
            }
            else {
            	setTimeout(function() {
            			scroller.scroll(0,0);
            	}, 3000)
            }
        }
    });
}, 600);