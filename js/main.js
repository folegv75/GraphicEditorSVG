/* jshint esversion: 6 */

var MainApp = null;

class Application  extends BaseControl
{
	constructor(id)
	{
        super(id);

        //Запуск работы системы
        this.EditorState = new EditorState();
        

        this.LabelTouchInfo = new Label(Const.LabelTouchInfo);
        this.LabelMouseInfo = new Label(Const.LabelMouseInfo);
        
        this.PanelMode = new PanelModeControl(Const.PanelModeId, this.EditorState);

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

        this.InitEventListener();
        
        
    }        

    /** Создание обработчиков подисок на событие
    */        
    InitEventListener()
    {
        document.addEventListener("keydown",this.OnKeyDown);

       this.ButtonSaveFile.SetOnClick(this.ButtonSaveFileOnClick.bind(this));
       this.ButtonLoadFile.SetOnClick(this.ButtonLoadFileOnClick.bind(this));
       
       this.SetOnMouseDown(this.HolstOnMouseDown.bind(this));
       this.SetOnMouseUp(this.HolstOnMouseUp.bind(this));
       this.SetOnMouseMove(this.HolstOnMouseMove.bind(this));
       //document.addEventListener('mousemove',this.HolstOnMouseMove.bind(this))

       /*   Событие MouseOver нам не интересно. Узнать над каким элементом,  мы можем из события MouseMove, если посмотрим в реквизит Path. 
            В нем будем вся последовательность тегов, на которым двигается мышь
       */

       this.SetOnTouchStart(this.HolstOnTouchStart.bind(this), false);
       this.SetOnTouchMove(this.HolstOnTouchMove.bind(this), false);
       this.SetOnTouchEnd(this.HolstOnTouchEnd.bind(this), false);
       this.SetOnTouchCancel(this.HolstOnTouchCancel.bind(this), false);
       
       this.SetOnContextMenu(this.HolstOnContextMenu.bind(this));

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
   

    /** @desc Показать событие пера */   
    ShowInfoMouseEvent(Event)
    {
        let ofsx='';
        let ofsy = '';
        if (Event.offsetX!=undefined) ofsx = Event.offsetX;
        if (Event.offsetY!=undefined) ofsy = Event.offsetY;
        let pv = "ofsX="+ofsx+" ofsY=" + ofsy + " clX=" + Event.clientX + " clY=" + Event.clientY + " " + 
            Event.type + Util.PathToString(Event.path) + ' Scroll=' + this.HolstContainer.SelfElem.scrollTop;
        this.LabelMouseInfo.SetValue(pv);
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

    /** 
        Показать событие пера*/
    /*
        Событие содержит массив касаний полотна 
        changedTouches - массив объектов Touch
        touches - массив объектов Touch
        targetTouches - массив объектов Touch
        каждый Touch прдставляет следующий важных для нас свойства:
            identifier - уникальный идентификатор касания
            screenX, screenY - координаты относительно верхнего угла экрана
            сlientX, сlientY  - координаты относительно viewport браузера
            pageX, pageY - координаты относительно документы с учтом скролинга документа. Используем их для расчета.
            target - htmlelemnt когда было первое касание даже если свдинули или удалили элемент

        PageY = ClientY + ScrollY нужно складывать прокрутки для разных элементов

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
        Тек поз Y = pageY - HolstRect.y; */

    ShowInfoTouchEvent(Event)
    {
        
       let HolstRect = this.Holst.SelfElem.getBoundingClientRect();

        let thInfo = "";
        let tInfoNewline = "";

        for(let i=0; i<Event.changedTouches.length; i++)
        {
            let t= Event.changedTouches[i];

            thInfo += tInfoNewline ;
            
            let tx = t.pageX - HolstRect.left;
            let ty = t.pageY - HolstRect.top;
            // координаты относительно вернего левого угла окна рабочей области браузера
            let ZZ = document.elementsFromPoint(t.clientX, t.clientY);

            thInfo += 'X=' + Math.round(tx) + ' Y=' +  Math.round(ty) + "; " + Event.type + " " + Util.PathToString(ZZ);
           thInfo += '; Chg: id=' + t.identifier + /*' scX=' + Math.round(t.screenX) + ' scY=' + Math.round(t.screenY) + */
            '  | pgX=' + Math.round(t.pageX) + ' pgY=' + Math.round(t.pageY) + '  | clX=' + Math.round(t.clientX) + ' clY=' + Math.round(t.clientY);

            tInfoNewline = "<br>\n";
        }

        // thInfo += "<br>\nHolst X=" + Math.round(HolstRect.left) + ' Y=' + Math.round(HolstRect.top);
         //+ ' L='+HolstRect.left + ' T=' + HolstRect.top + ' W='+ HolstRect.width + ' H='+ HolstRect.height + ' R='+ HolstRect.right + ' B='+ HolstRect.bottom;

        this.LabelTouchInfo.SetValue(thInfo);        

    }

    GetCoordinatesTouchEvent(Event)
    {
        let HolstRect = this.Holst.SelfElem.getBoundingClientRect();

        let thInfo = "";
        let tInfoNewline = "";
        for(let i=0; i<Event.changedTouches.length; i++) 
        {
            let t= Event.changedTouches[i];
            if (t.identifier!=0) continue;
            else 
            {
                let res = {};
                res.X = t.pageX - HolstRect.left;
                res.Y = t.pageY - HolstRect.top;
                res.ClientX = t.clientX;
                res.ClientY = t.clientY;
                return res;
            }
        }
        return null;
    }
   

    /**
    * @param {MouseEvent} Event
    */        
    HolstOnMouseDown(Event)
    {
        this.ShowInfoMouseEvent(Event);

        /* Пересчет в координаты холста оносительно окна html
         */
        let HolstRect = this.Holst.SelfElem.getBoundingClientRect();
        let x = Math.round(Event.clientX - HolstRect.left);
        let y = Math.round(Event.clientY - HolstRect.top);
        this.Holst.PenDown(x, y, Event.clientX, Event.clientY, Event);
    } 

    /**
    * @param {MouseEvent} Event
    */        
    HolstOnMouseUp(Event)
    {
        this.ShowInfoMouseEvent(Event);
        let HolstRect = this.Holst.SelfElem.getBoundingClientRect();
        let x = Math.round(Event.clientX - HolstRect.left);
        let y = Math.round(Event.clientY - HolstRect.top);
        this.Holst.PenUp(x, y, Event.clientX, Event.clientY, Event);       
    } 

    /**
    * @param {MouseEvent} Event
    */        
    HolstOnMouseMove(Event)
    {
        this.ShowInfoMouseEvent(Event);
        let HolstRect = this.Holst.SelfElem.getBoundingClientRect();

        let x = Math.round(Event.clientX -  HolstRect.left);
        let y = Math.round(Event.clientY -  HolstRect.top);
        this.Holst.PenMove(x, y, Event.clientX, Event.clientY, Event);
    } 

    /**
    * @param {TouchEvent} Event
    */        
   HolstOnTouchStart(Event)
    {
        Event.preventDefault();        
        this.ShowInfoTouchEvent(Event);
        let coord = this.GetCoordinatesTouchEvent(Event);
        if (coord==null) return;
        this.Holst.PenDown(coord.X, coord.Y, coord.ClientX, coord.ClientY, Event);        
    }

    /**
    * @param {TouchEvent} Event
    */        
   HolstOnTouchMove(Event)
    {
        Event.preventDefault();        
        this.ShowInfoTouchEvent(Event);
        let coord = this.GetCoordinatesTouchEvent(Event);
        if (coord==null) return;
        this.Holst.PenMove(coord.X, coord.Y, coord.ClientX, coord.ClientY, Event);        
    }

    /**
    * @param {TouchEvent} Event
    */        
   HolstOnTouchEnd(Event)
    {
        Event.preventDefault();
        //console.log(Event.type, Event);
        this.ShowInfoTouchEvent(Event);
        let coord = this.GetCoordinatesTouchEvent(Event);
        if (coord==null) return;
        this.Holst.PenUp(coord.X, coord.Y, coord.ClientX, coord.ClientY, Event);        
    }

    HolstOnTouchCancel(Event)
    {

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
    MainApp = new Application(Const.MainApplication); 
}

window.onload = ApplicationInit;
