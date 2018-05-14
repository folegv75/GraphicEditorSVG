/*jshint esversion: 6 */

class HolstContainer 
{
	constructor(Id)
	{	
		this.Id = Id;
		this.SelfElem = document.getElementById(Id); 
	}
    
    SetMainWindowSize()
    {
        this.SelfElem.style.width = (window.innerWidth - 270) + "px";
        this.SelfElem.style.height = window.innerHeight-200 + "px";
    }
	
}