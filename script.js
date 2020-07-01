// Needs to be refactored
// For now, just a trash script that works 

let username, interval, counter = 0;

const remove_messages = (resumed = false) => {    
    if(!resumed) {
        alert('After confirming this window, you\'ll be asked to provide your username, then the operation will begin. \n\n To stop the operation at any time, please type ok in the console window and hit Enter.');
        username = prompt('What is your username?');
    }
    
    let scroller = document.querySelector('.messagesWrapper-3lZDfY .scroller-2FKFPG');
    
    interval = setInterval(function() {
        console.clear(); 
        
        let username_container = document.querySelectorAll('.header-23xsNx .username-1A8OIy');
        
        document.querySelectorAll(".message-2qnXI6").forEach(function(value) {
            value.dispatchEvent(new MouseEvent('mousemove', { 'bubbles': true }));
        });
        
        username_container.forEach(function(value, index, obj) {
            let me = value.innerText;
            
            if(me == username) {
                let message_container = value.closest('.message-2qnXI6');
                
                if(message_container) {   
                    message_container.click();
                    setTimeout(function() {
                        let more_btn = message_container.querySelector('.button-1ZiXG9:last-of-type');
                        
                        if(more_btn) {
                            more_btn.click();
                            let message_actions_delete = document.querySelector("#message-actions #message-actions-delete");
                            if(message_actions_delete) {
                                message_actions_delete.click();
                                setTimeout(function() {
                                    let mad_btn = document.querySelector(".modal-3c3bKg .button-38aScr[type=submit]");
                                    mad_btn.click(); counter++;
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
}

const stop_it = function() {
    console.clear(); clearInterval(interval);
    
    alert(`The operation was cancelled!!! \n Total messages removed: ${counter} \n\n To resume the operation again, please type go in the console window and hit Enter.`);
    return;
}
Object.defineProperty(window, 'ok', { get: stop_it });
Object.defineProperty(window, 'go', { get: () => { remove_messages(true) } });

remove_messages();
