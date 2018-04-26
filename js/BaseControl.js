class BaseControl
{
    constructor (id)
    {
        this.Id = id;
        this.SelfElem = document.getElementById(id);
       
    }
    
	SetOnClick(proclink)
    {
        this.OnClick = proclink;
        this.SelfElem.addEventListener('click',proclink);
	}
    
    SetOnMouseDown(proclink)
    {
        this.OnMouseDown = proclink;
        this.SelfElem.addEventListener('mousedown',proclink);
	}
    
	SetOnMouseUp(proclink)
    {
        this.OnMouseUp = proclink;
        this.SelfElem.addEventListener('mouseup',proclink);
    }
    
	SetOnMouseMove(proclink)
    {
        this.OnMouseMove = proclink;
        this.SelfElem.addEventListener('mousemove',proclink);
	}
    
    SetOnMouseOver(proclink)
    {
        this.OnMouseOver = proclink;
        this.SelfElem.addEventListener('mouseover',proclink);
	}
    
    SetOnTouchStart(proclink, option)
    {
        this.OnTouchStart = proclink;
        this.SelfElem.addEventListener('touchstart',proclink, option);
	}
    
    SetOnTouchMove(proclink, option)
    {
        this.OnTouchMove = proclink;
        this.SelfElem.addEventListener('touchmove',proclink, option);
	}
    
    SetOnTouchEnd(proclink, option)
    {
        this.OnTouchEnd = proclink;
        this.SelfElem.addEventListener('touchend',proclink, option);
	}
    
	SetOnKeyDown(proclink)
    {
        this.OnKeyDown = proclink;
        this.SelfElem.addEventListener('keydown',proclink);
	}
    
    SetOnContextMenu(proclink)
    {
        this.OnContextMenu = proclink;
        this.SelfElem.addEventListener('contextmenu',proclink);
	}
    
}