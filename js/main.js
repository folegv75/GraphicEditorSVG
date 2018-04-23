
var MainApp = null;

class Application 
{
	constructor()
	{

        // TODO создать структуры взаимосвязанных объектов
        this.HolstContainer = new HolstContainer(Const.HolstConteinerId);

        this.LabelDebugInfo = new Label(Const.AddDebugInfoId);
        this.LabelXValue = new Label(Const.XValueId);
        this.LabelYValue = new Label(Const.YValueId);
        this.LabelDebugInfo = new Label(Const.AddDebugInfoId);
        this.LabelDebugInfo = new Label(Const.AddDebugInfoId);
        this.Holst = new Holst('Holst');

        this.HolstContainer.SetMainWindowSize(Const.HolstId);



        this.Holst = new Holst();
        // TODO инициализация подписчиков
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
