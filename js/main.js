/*jshint esversion: 6 */

var MainApp = null;

class Application 
{
	constructor()
	{

        // TODO создать структуры взаимосвязанных объектов

        this.LabelDebugInfo = new Label(Const.AddDebugInfoId);
        this.LabelXValue = new Label(Const.XValueId);
        this.LabelYValue = new Label(Const.YValueId);
        this.LabelTouchInfo = new Label(Const.LabelTouchInfo);

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
        document.addEventListener("keydown",this.OnKeyDown);

       this.ButtonSelect.SetOnClick(this.ButtonSelectOnClick.bind(this));
       this.ButtonSaveFile.SetOnClick(this.ButtonSaveFileOnClick.bind(this));
       this.ButtonLoadFile.SetOnClick(this.ButtonLoadFileOnClick.bind(this));
       this.ButtonRectangle.SetOnClick(this.ButtonRectangleOnClick.bind(this));
       this.ButtonLine.SetOnClick(this.ButtonLineOnClick.bind(this));

       this.Holst.SetOnMouseDown(this.HolstOnMouseDown.bind(this));
       this.Holst.SetOnMouseUp(this.HolstOnMouseUp.bind(this));
       this.Holst.SetOnMouseMove(this.HolstOnMouseMove.bind(this));

       /*   Событие MouseOver нам не интересно. Узнать над каким элементом,  мы можем из события MouseMove, если посмотрим в реквизит Path. 
            В нем будем вся последовательность тегов, на которым двигается мышь
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

        console.log('KeyDown:',Event.key);
    }

    /**
    * @param {MouseEvent} Event
    */        
    ButtonSelectOnClick(Event)
    {
    console.log('ButtonSelectOnClick');
    }

    /**
    * @param {MouseEvent} Event
    */        
    ButtonSaveFileOnClick(Event)
    {
        console.log('ButtonSaveFileOnClick');
    }

    /**
    * @param {MouseEvent} Event
    */        
    ButtonLoadFileOnClick(Event)
    {
        console.log('ButtonLoadFileOnClick');
    }
   
    /**
    * @param {MouseEvent} Event
    */        
    ButtonRectangleOnClick(Event)
    {
        console.log('ButtonRectangleOnClick');
    }
  
    /**
    * @param {MouseEvent} Event
    */        
    ButtonLineOnClick(Event)
    {
        console.log('ButtonLineOnClick');
    } 

    /** @desc Показать событие пера */   
    ShowInfoMouseEvent(Event)
    {
        if (Event.offsetX!=undefined) this.LabelXValue.SetValue(Event.offsetX);
        if (Event.offsetY!=undefined) this.LabelYValue.SetValue(Event.offsetY);
        let pv = Event.type + Util.PathToString(Event.path) + ' Scroll=' + this.HolstContainer.SelfElem.scrollTop;
        this.LabelDebugInfo.SetValue(pv);
    }

    ConvertTouchCoordToHolst(touch)
    {
        var locx, locy, bx, by, newx, newy, sx, sy, point = {};
        locx = Math.trunc(touch.pageX);
        locy = Math.trunc(touch.pageY);
        holstbounds = elmHolst.getBoundingClientRect();
        by = Math.trunc(holstbounds.top);
        bx = Math.trunc(holstbounds.left);
    
        sy = document.body.scrollTop;
            sx = document.body.scrollLeft;
    
        point.X = locx - bx - sx;
        point.Y = locy - by - sy;
        return point;
    }    

    /** @desc Показать событие пера */
    ShowInfoTouchEvent(Event)
    {
        /* Событие содержит массив касаний полотна 
        changedTouches - массив объектов Touch
        touches - массив объектов Touch
        targetTouches - массив объектов Touch
        каждый Touch прдставляет следующий важных для нас свойства:
            identifier - уникальный идентификатор касания
            screenX, screenY - координаты относительно верхнего угла экрана
            сlientX, сlientY  - координаты относительно viewport браузера
            pageX, pageY - координаты относительно документы с учтом скролинга документа. Используем их для расчета.
            target - htmlelemnt когда было первое касание даже если свдинули или удалили элемент

        Пример для одного касания:
        touch start - все три массива объектов touch содержат касание. информация о касании одинакова.
        touch move - все три массива объектов touch содержат касание. информация о касании одинакова.
        touch end - touches и targetTouches - пустые. changedTouches - содержит касание которого было отпущено.

        Event.path - над которым было первое касание. Далее не изменяется.
        Event.target и Event.srcElement не изменяюстя и равны первому элементу где было касание
        Для определения на каком элементе сработало событие будем использовать document.elementsFromPoint(t.clientX, t.clientY); 
        Первый элемент массива будем считать верхним
        
        Если нет скролинга, координаты верхнего левого угла холста совпадает с touch PageX,PageY
        При скролинге координаты холста меняются на величину скролинга. 
        Тек поз Y = pageY - HolstRect.y;
        */
        
       let HolstRect = this.Holst.SelfElem.getBoundingClientRect();

        let thInfo = Event.type + Util.PathToString(Event.path);
        for(let i=0; i<Event.changedTouches.length; i++) 
        {
            let t= Event.changedTouches[i];

            thInfo += "<br>\n";
            let tx = t.pageX - HolstRect.left;
            let ty = t.pageY - HolstRect.top;
            thInfo += 'tX=' + Math.round(tx) + '; tY=' +  Math.round(ty);
            thInfo += '; Chg: id=' + t.identifier + ' scX=' + Math.round(t.screenX) + ' scY=' + Math.round(t.screenY) 
            + '  | pgX=' + Math.round(t.pageX) + ' pgY=' + Math.round(t.pageY) + '  | clX=' + Math.round(t.clientX) + ' clY=' + Math.round(t.clientY);
            
            let ZZ = document.elementsFromPoint(t.clientX, t.clientY);            
            for (let z=0; z<ZZ.length; z++)
            {
               // console.log(Util.ParentTreeToArray(ZZ[z]));
            }

        }
        thInfo += "<br>\nHolst X=" + Math.round(HolstRect.left) + ' Y=' + Math.round(HolstRect.top);
         //+ ' L='+HolstRect.left + ' T=' + HolstRect.top + ' W='+ HolstRect.width + ' H='+ HolstRect.height + ' R='+ HolstRect.right + ' B='+ HolstRect.bottom;

        this.LabelTouchInfo.SetValue(thInfo);        

       //console.log(thInfo);
    }
   

    /**
    * @param {MouseEvent} Event
    */        
    HolstOnMouseDown(Event)
    {
        //console.log(Event.type);
        /*
            В событии от мыши координаты не учитывают скроллинг, масштабирование, сдвиг.
            Необходимо преобразовать их из координаты мыши, в координату холста с учетом скролиинга, масштабирования и сдвига
            скролинг учитывается внутри svg
        */
        this.ShowInfoMouseEvent(Event);

        /*  Event.offsetX - координата X от нуля холста
            Event.offsetY - координата Y от нуля холста
            Пересчет в координаты холста не требуется
         */
        this.Holst.MouseDown(Event.offsetX, Event.offsetY, Event);
    } 

    /**
    * @param {MouseEvent} Event
    */        
    HolstOnMouseUp(Event)
    {
        //console.log(Event.type, Event);
        this.ShowInfoMouseEvent(Event);
        this.Holst.MouseUp(Event.offsetX, Event.offsetY, Event);       
    } 

    /**
    * @param {MouseEvent} Event
    */        
    HolstOnMouseMove(Event)
    {
        //console.log(Event.type);
        this.ShowInfoMouseEvent(Event);
        this.Holst.MouseMove(Event.offsetX, Event.offsetY, Event);
    } 

    /**
    * @param {TouchEvent} Event
    */        
   HolstOnTouchStart(Event)
    {
        Event.preventDefault();        
        //console.log(Event.type, Event);
        this.ShowInfoTouchEvent(Event);
    }

    /**
    * @param {TouchEvent} Event
    */        
   HolstOnTouchMove(Event)
    {
        Event.preventDefault();        
        //console.log(Event.type, Event);
        this.ShowInfoTouchEvent(Event);
    }

    /**
    * @param {TouchEvent} Event
    */        
   HolstOnTouchEnd(Event)
    {
        Event.preventDefault();
        //console.log(Event.type, Event);
        this.ShowInfoTouchEvent(Event);
    }

    HolstOnKeyDown(Event)
    {
        console.log('HolstOnKeyDown');
    }

    HolstOnContextMenu(Event)
    {
        console.log('HolstOnContextMenu');
    }
  
}

function ApplicationInit()
{
    MainApp = new Application(); 
}

window.onload = ApplicationInit;
