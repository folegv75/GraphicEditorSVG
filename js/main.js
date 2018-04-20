/* /// <reference path="editor.js" />*/

var MainApp = null;

class Application 
{
	constructor()
	{

        this.InitEventListener();
    }

    
        

    /** Создание обработчиков подисок на событие
    */        
   InitEventListener()
   {
       document.addEventListener("keydown",this.OnKeyDown)
   }

    /**
    * @param {KeyboardEvent} Event
    */        
    OnKeyDown(Event)
    {
        console.log(Event.key)
    }
   
}

function ApplicationInit()
{
    MainApp = new Application; 
}

window.onload = ApplicationInit;
