function Template(settings,current){
    let tmpl = this;
    if (settings.parent){
        let parent = current.closest(settings.parent);
        this.template = parent.querySelector(settings.template).content;
    } else{
        this.template = document.querySelector(settings.template).content;
    }
    this.content = this.template.querySelector(settings.content);

    this.html = function (){
        return tmpl.content.outerHTML;
    }
}
