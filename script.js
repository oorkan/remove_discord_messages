// Needs to be refactored
// For now, just a trash script that works 

let username, timeout, counter = 0, delete_success = false;

const remove_messages = (resumed = false) => {
    if(!resumed) {
        alert(`After confirming this window, you'll be asked to provide your username, then the operation will begin. The cleanup process can take time, this depends on the quantity of your messages. \nPlease be patient.
        \nTo stop the operation at any time, please type ok in the console window and hit Enter.`);
        username = prompt('What is your username?');
        draw_modal(); hide_discord_popups();
    }
    console.clear(); console.log('Removing messages...');
    
    let scroller = document.querySelector('.messagesWrapper-3lZDfY .scroller-2FKFPG');
        
    let username_container = Array.prototype.filter.call(document.querySelectorAll('.header-23xsNx span.username-1A8OIy'), (el) => {
        return el.innerText == username;
    });
    username_container = username_container[username_container.length - 1];

    document.querySelectorAll('.message-2qnXI6').forEach(function(value) {
        value.dispatchEvent(new MouseEvent('mousemove', { 'bubbles': true }));
    });   
            
    if(username_container) {
        let message_container = username_container.closest('.message-2qnXI6');
        
        if(message_container) {
            message_container.click();
            let more_btn = message_container.querySelector('.button-1ZiXG9:last-of-type');
            more_btn.click();
            
            let message_actions_delete = document.querySelector('#message-actions #message-actions-delete');
            if(message_actions_delete) {
                message_actions_delete.click();
                
                timeout = setTimeout(function() {
                    let mad_btn = document.querySelector('.button-38aScr[type=submit]');
                    mad_btn.click();
                    
                    let interval = setInterval(function() {
                        if(delete_success) {
                            clearInterval(interval); 
                            update_counter();
                            return remove_messages(true);
                        }
                    }, 400);

                }, 200);   
            }
        }
    }
    else {
        clear_and_reset();
    }
}

const draw_modal = () => {
    let modal = `<div class='_rdm_7f7ieb_modal'>
        <div class='_rdm_7f7ieb_modal__inner'>
            <div class='_rdm_7f7ieb_counter'>Messages Removed: <span id='_rdm_7f7ieb_messages_removed'>0</span></div>
            <div class='_rdm_7f7ieb_processing'><span class='_rdm_7f7ieb_clock'>🔁</span> Processing...</div>
        </div>
    </div>`;

    let modal_styles = `<style class='_rdm_7f7ieb_style'>
        ._rdm_7f7ieb_modal {
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background-color: rgba(0,0,0,.65);
            z-index: 10000;
        }
      
        ._rdm_7f7ieb_modal__inner {
            position: relative;
            width: 100%; height: 100%;
        }
        
        ._rdm_7f7ieb_counter, ._rdm_7f7ieb_processing {
            display: inline-block;
            position: absolute;
        }
        
        ._rdm_7f7ieb_counter {
            top: 16px; right: 16px;
            background-color: white;
            padding: 16px;
            border-radius: 8px;
        }
        
        ._rdm_7f7ieb_processing {
            font-size: 24px;
            color: white;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%); 
        }
        
        ._rdm_7f7ieb_clock {
            display: inline-block;
            animation: _rdm_7f7ieb_rotateY 1s infinite;
        }
        
        @keyframes _rdm_7f7ieb_rotateY {
            to {
                transform: rotateY(360deg);
            }
        }
    </style>`;

    document.body.insertAdjacentHTML('beforeend', modal);
    document.head.insertAdjacentHTML('beforeend', modal_styles);
}

const hide_discord_popups = () => {
    document.head.insertAdjacentHTML('beforeend', `<style class='_rdm_7f7ieb_style'>
        .backdrop-1wrmKB,
        .modal-3c3bKg {
            transform: none !important;
            opacity: 0 !important;
        }
    </style>`);
}

const update_counter = () => {
    counter++;
    document.querySelector('#_rdm_7f7ieb_messages_removed').innerText = `${counter}`;
}

const stop_it = function() {
    console.clear(); console.log('Stopped!'); clearTimeout(timeout);
    
    alert(`The operation was stopped! \nTotal messages removed: ${counter}
    \nTo resume the operation again, please type go in the console window and hit Enter.`);
    return;
}
Object.defineProperty(window, 'ok', { get: stop_it });
Object.defineProperty(window, 'go', { get: () => { remove_messages(true) } });

const clear_and_reset = () => {
    clearTimeout(timeout);
    let styles = document.querySelectorAll('._rdm_7f7ieb_style');
    styles.forEach((el) => {
        el.remove();
    });
    console.clear();
    alert(`The process is finished! \nTotal messages removed: ${counter}`);
}

(function(open) {
    XMLHttpRequest.prototype.open = function(m, u, a, us, p) {
        this.addEventListener('readystatechange', function() {
            if(this.status === 204 && this.statusText === 'No Content' && this.__sentry_xhr__.method === 'DELETE') {
                delete_success = true;
            }
            else {
                delete_success = false;
            }
        }, false);

        open.call(this, m, u, a, us, p);
    };
})(XMLHttpRequest.prototype.open);

remove_messages();
