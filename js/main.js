
var MainApp = null;

class Application 
{
	constructor()
	{

        // TODO создать структуры взаимосвязанных объектов

        this.LabelDebugInfo = new Label(Const.AddDebugInfoId);
        this.LabelXValue = new Label(Const.XValueId);
        this.LabelYValue = new Label(Const.YValueId);
        this.LabelDebugInfo = new Label(Const.AddDebugInfoId);
        this.LabelDebugInfo = new Label(Const.AddDebugInfoId);

        this.ButtonSelect = new Button(Const.BtnSelectId)
        this.ButtonRectangle = new Button(Const.BtnRectangleId)
        this.ButtonLine = new Button(Const.BtnLineId)
        this.ButtonSaveFile = new Button(Const.BtnSaveFileId)
        this.ButtonLoadFile = new Button(Const.BtnLoadFileId)

        this.Holst = new Holst(Const.HolstId);
        
        this.ZoomManager = new ZoomManager(this.Holst, 0, 0, 1500, 1500);

        InitButtonZoom();

        this.HolstContainer = new HolstContainer(Const.HolstContainerId);
        this.HolstContainer.SetMainWindowSize();

        // TODO инициализация подписчиков
        this.InitEventListener();
        
        //Запуск работы системы
        //SelectClick();
        
    }  

    InitButtonZoom()
    {
        this.ButtonViewMoveLeft = new Button(Const.BtnViewMoveLeftId);
        this.ButtonViewMoveRight = new Button(Const.BtnViewMoveRightId);
        this.ButtonViewMoveUp = new Button(Const.BtnViewMoveUpId);
        this.ButtonViewMoveDown = new Button(Const.BtnViewMoveDownId);
        this.ButtonViewZoomIn = new Button(Const.BtnViewZoomInId);
        this.ButtonViewZoomNone = new Button(Const.BtnViewZoomNoneId);
        this.ButtonViewZoomOut = new Button(Const.BtnViewZoomOutId);

    }
        

    /** Создание обработчиков подисок на событие
    */        
    InitEventListener()
    {
        document.addEventListener("keydown",this.OnKeyDown)

       this.ButtonSelect.SetOnClick(this.ButtonSelectOnClick);
       this.ButtonSaveFile.SetOnClick(this.ButtonSaveFileOnClick);
       this.ButtonLoadFile.SetOnClick(this.ButtonLoadFile);
       this.ButtonRectangle.SetOnClick(this.ButtonRectangleOnClick);
       this.ButtonLine.SetOnClick(this.ButtonLineOnClick);

       this.Holst.SetOnMouseDown(this.HolstOnMouseDown);
       this.Holst.SetOnMouseUp(this.HolstOnMouseUp);
       this.Holst.SetOnMouseMove(this.HolstOnMouseMove);
       this.Holst.SetOnMouseOver(this.HolstOnMouseOver);
       this.Holst.SetOnTouchStart(this.HolstOnTouchStart, false);
       this.Holst.SetOnTouchMove(this.HolstOnTouchMove, false);
       this.Holst.SetOnTouchEnd(this.HolstOnTouchEnd, false);
       this.Holst.SetOnContextMenu(this.HolstOnContextMenu);

   

       window.onbeforeunload = this.OnExit;
       window.onresize = this.OnResizeMainWindow;
       
    }

    OnExit() 
    {
        let confirmMsg = "Возможно данные не сохранены. Вы уверены, что хотите выйти из приложения?";
        return confirmMsg;
    }

    OnResizeMainWindow()
    {
        this.HolstContainer.SetMainWindowSize();
    }



    /**
    * @param {KeyboardEvent} Event
    */        
    OnKeyDown(Event)
    {
        console.log('KeyDown:',Event.key)
    }

    /**
    * @param {MouseEvent} Event
    */        
    ButtonSelectOnClick(Event)
    {
    console.log('ButtonSelectOnClick')
    }

    /**
    * @param {MouseEvent} Event
    */        
    ButtonSaveFileOnClick(Event)
    {
        console.log('ButtonSaveFileOnClick')
    }

    /**
    * @param {MouseEvent} Event
    */        
    ButtonLoadFileOnClick(Event)
    {
        console.log('ButtonLoadFileOnClick')
    }
   
    /**
    * @param {MouseEvent} Event
    */        
    ButtonRectangleOnClick(Event)
    {
        console.log('ButtonRectangleOnClick')
    }
  
    /**
    * @param {MouseEvent} Event
    */        
    ButtonLineOnClick(Event)
    {
        console.log('ButtonLineOnClick')
    } 

    /**
    * @param {MouseEvent} Event
    */        
    HolstOnMouseDown(Event)
    {
       console.log('HolstOnMouseDown')
    } 

    /**
    * @param {MouseEvent} Event
    */        
    HolstOnMouseUp(Event)
    {
       console.log('HolstOnMouseUp')
    } 

    /**
    * @param {MouseEvent} Event
    */        
    HolstOnMouseMove(Event)
    {
       console.log('HolstOnMouseMove')
    } 

    /**
    * @param {MouseEvent} Event
    */        
    HolstOnMouseOver(Event)
    {
       console.log('HolstOnMouseOver')
    } 

    HolstOnTouchStart(Event)
    {
        console.log('HolstOnTouchStart')
    }

    HolstOnTouchMove(Event)
    {
        console.log('HolstOnTouchMove')
    }

    HolstOnTouchEnd(Event)
    {
        console.log('HolstOnTouchEnd')
    }

    HolstOnKeyDown(Event)
    {
        console.log('HolstOnKeyDown')
    }

    HolstOnContextMenu(Event)
    {
        console.log('HolstOnContextMenu')
    }
  
}

function ApplicationInit()
{
    MainApp = new Application; 
}

window.onload = ApplicationInit;
