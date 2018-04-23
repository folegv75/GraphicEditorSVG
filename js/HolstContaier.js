class HolstContainer 
{
	constructor(Id)
	{	
		this.Id = Id;
		this.ElemSelf = document.getElementById(Id); 
	}
    
    SetMainWindowSize()
    {
        this.ElemSelf.style.width = "" + (window.innerWidth - 270) + "px";
        this.ElemSelf.style.height = window.innerHeight-110 + "px";
    }
	
}