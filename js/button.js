/*jshint esversion: 6 */

class Button extends BaseControl
{
    constructor (id)
    {
        super(id);
        this.LabelElem = document.querySelector('label[for="'+id+'"]');
    }

    SetSelected(v)
    {
        if (this.LabelElem==null) return;
        if (v)  this.LabelElem.classList.add(Const.ClassCurrentButton);
        else this.LabelElem.classList.remove(Const.ClassCurrentButton);

    }

}
