function Popup() {
    let popup = this,
        modal = document.createElement('div'),
        wrap = document.createElement('div'),
        form = document.createElement('div'),
        close = document.createElement('button');

    close.innerHTML = '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.43934 0.43934C-0.146447 1.02513 -0.146447 1.97487 0.43934 2.56066L15.4393 17.5607C16.0251 18.1464 16.9749 18.1464 17.5607 17.5607C18.1464 16.9749 18.1464 16.0251 17.5607 15.4393L2.56066 0.43934C1.97487 -0.146447 1.02513 -0.146447 0.43934 0.43934Z" fill="#DADADA"/><path fill-rule="evenodd" clip-rule="evenodd" d="M17.5607 0.43934C18.1464 1.02513 18.1464 1.97487 17.5607 2.56066L2.56066 17.5607C1.97487 18.1464 1.02513 18.1464 0.43934 17.5607C-0.146446 16.9749 -0.146446 16.0251 0.43934 15.4393L15.4393 0.43934C16.0251 -0.146447 16.9749 -0.146447 17.5607 0.43934Z" fill="#DADADA"/></svg>';

    // adds class
    close.classList.add('popup__close');
    form.classList.add('popup__form');
    wrap.classList.add('popup__wrap');
    modal.classList.add('popup');

    // appends
    wrap.append(close);
    wrap.append(form);
    modal.append(wrap);
    document.body.append(modal);

    this.open = function (content) {
        let html = getHtml(content);
        form.innerHTML = html;
        modal.classList.add('active');
        popup.setOverflow();
    };

    this.close = function () {
        form.innerHTML = '';
        modal.classList.remove('active');
        popup.removeOverflow();
    };

    this.setOverflow = function (){
        document.body.classList.add('ovh');
    }

    this.removeOverflow = function (){
        document.body.classList.remove('ovh');
    }

    function getHtml(content){
        let type = typeof content;

        if (type=='string'){
            return content;
        } else {
            return content.outerHTML;
        }
    }

    modal.addEventListener('click', function (e){
        if (!e.target.closest('.popup__wrap')){
            popup.close();
        }
    });
    close.addEventListener('click', popup.close);
}
