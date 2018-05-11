
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

        this.ButtonSelect = new Button(Const.BtnSelectId);
        this.ButtonRectangle = new Button(Const.BtnRectangleId);
        this.ButtonLine = new Button(Const.BtnLineId);
        this.ButtonSaveFile = new Button(Const.BtnSaveFileId);
        this.ButtonLoadFile = new Button(Const.BtnLoadFileId);

        this.Holst = new Holst(Const.HolstId);

        this.Grid = new Grid(Const.GridId, 0, 0, 1500,1500);
        this.RulerHorizontal = new Ruler(Const.RulerHorizontal, RulerType.Horizontal, 0, 1500);
        this.RulerVertical = new Ruler(Const.RulerVertical, RulerType.Vertical, 0, 1500);

       
        this.ZoomManager = new ZoomManager(0, 0, 1500, 1500);
        this.ZoomControl = new ZoomControl(this.ZoomManager);

        
        this.ZoomManager.AppendView(this.Holst);
        this.ZoomManager.AppendView(this.Grid);
        this.ZoomManager.AppendView(this.RulerHorizontal);
        this.ZoomManager.AppendView(this.RulerVertical);


        this.HolstContainer = new HolstContainer(Const.HolstContainerId);
        this.HolstContainer.SetMainWindowSize();

        // TODO инициализация подписчиков
        this.InitEventListener();
        
        //Запуск работы системы
        //SelectClick();
        
    }        

    /** Создание обработчиков подисок на событие
    */        
    InitEventListener()
    {
        document.addEventListener("keydown",this.OnKeyDown)

       this.ButtonSelect.SetOnClick(this.ButtonSelectOnClick.bind(this));
       this.ButtonSaveFile.SetOnClick(this.ButtonSaveFileOnClick.bind(this));
       this.ButtonLoadFile.SetOnClick(this.ButtonLoadFileOnClick.bind(this));
       this.ButtonRectangle.SetOnClick(this.ButtonRectangleOnClick.bind(this));
       this.ButtonLine.SetOnClick(this.ButtonLineOnClick.bind(this));

       this.Holst.SetOnMouseDown(this.HolstOnMouseDown.bind(this));
       this.Holst.SetOnMouseUp(this.HolstOnMouseUp.bind(this));
       this.Holst.SetOnMouseMove(this.HolstOnMouseMove.bind(this));
       /*
            Событие MouseOver нам не интересно. Узнать над каким элементом,  мы можем из события MouseMove, если посмотрим в реквизит Path. 
            В нем будем вся последовательность тегов, на которым двигается мышь

       this.Holst.SetOnMouseOver(this.HolstOnMouseOver.bind(this));
       */

       this.Holst.SetOnTouchStart(this.HolstOnTouchStart.bind(this), false);
       this.Holst.SetOnTouchMove(this.HolstOnTouchMove.bind(this), false);
       this.Holst.SetOnTouchEnd(this.HolstOnTouchEnd.bind(this), false);
       this.Holst.SetOnContextMenu(this.HolstOnContextMenu.bind(this));

       let el = document.getElementById(Const.HolstContainerId);
       el.addEventListener("scroll",this.onScroll.bind(this));
   
       window.onbeforeunload = this.OnExit.bind(this);
       window.onresize = this.OnResizeMainWindow.bind(this);
       
    }

    /**
    * @param {ScrollEvent} Evnt
    */  
    onScroll(Evnt)
    {
        //this.ZoomManager.SetViewBoxSize();
        this.ShowInfoMouseEvent(Evnt);
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


    ShowInfoMouseEvent(Event)
    {
        this.LabelXValue.SetValue(Event.offsetX);
        this.LabelYValue.SetValue(Event.offsetY);
        let pv = Event.type;
        for (let i=0; i<Event.path.length;i++) 
        {
            pv += ' | ' + Event.path[i].tagName+'#'+Event.path[i].id ; 
            if (Event.path[i].tagName=='BODY') break;
        }
        pv += ' Scroll=' + this.HolstContainer.SelfElem.scrollTop;
        this.LabelDebugInfo.SetValue(pv);
    }

    /**
    * @param {MouseEvent} Event
    */        
    HolstOnMouseDown(Event)
    {
        /*
            В событии от мыши координаты не учитывают скроллинг, масштабирование, сдвиг.
            Необходимо преобразовать их из координаты мыши, в координату холста с учетом скролиинга, масштабирования и сдвига
            скролинг учитывается внутри svg
        */
        this.ShowInfoMouseEvent(Event);
    } 

    /**
    * @param {MouseEvent} Event
    */        
    HolstOnMouseUp(Event)
    {
        this.ShowInfoMouseEvent(Event);
    } 

    /**
    * @param {MouseEvent} Event
    */        
    HolstOnMouseMove(Event)
    {
        this.ShowInfoMouseEvent(Event);
    } 

    /**
    * @param {MouseEvent} Event
    */        
    HolstOnMouseOver(Event)
    {
       // ShowInfoMouseEvent(Event);
       //console.log('HolstOnMouseOver')
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
