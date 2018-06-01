/* jshint esversion: 6 */

//var MainApp = null;

class Application  extends BaseControl
{
	constructor(id)
	{
        super(id);
        this.PenLockHost = false;
    }

    Init() {
        /* Тестовые кнопки */
        this.TestA = new Button('btnTestA');
        this.TestA.SetOnClick(this.TestAOnClick.bind(this));
        this.TestB = new Button('btnTestB');
        this.TestB.SetOnClick(this.TestBOnClick.bind(this));

        this.ZoomManager = new ZoomManager();
        this.ZoomControl = new ZoomControl(this.ZoomManager);
        
        this.EditorState = new EditorState();

        this.LabelTouchInfo = new Label(Const.LabelTouchInfo);
        this.LabelMouseInfo = new Label(Const.LabelMouseInfo);
        
        this.PanelMode = new PanelModeControl(Const.PanelModeId, this.EditorState);

        this.ButtonSaveFile = new Button(Const.BtnSaveFileId);
        this.ButtonLoadFile = new Button(Const.BtnLoadFileId);

        this.Holst = new Holst(Const.HolstId);

        this.OnResizeMainWindow();

        this.InitEventListener();
        
        
    }   
    
    /** обработка нажатий тестовых кнопок */
    TestAOnClick(Event)
    {
        console.log('TestA');
        //let elem = document.getElementById(Const.PaperId);
        //elem.scrollTop = elem.scrollTop + 10;

    }
    TestBOnClick(Event)
    {
        console.log('TestB');
        
    }

    /** Создание обработчиков подисок на событие
    */        
    InitEventListener()
    {
        document.addEventListener("keydown",this.OnKeyDown.bind(this));

        this.ButtonSaveFile.SetOnClick(this.ButtonSaveFileOnClick.bind(this));
        this.ButtonLoadFile.SetOnClick(this.ButtonLoadFileOnClick.bind(this));
       
        this.SetOnMouseDown(this.HolstOnMouseDown.bind(this));
        this.SetOnMouseUp(this.HolstOnMouseUp.bind(this));
        this.SetOnMouseMove(this.HolstOnMouseMove.bind(this));
        //document.addEventListener('mousemove',this.HolstOnMouseMove.bind(this))

        /*   Событие MouseOver нам не интересно. Узнать над каким элементом,  мы можем из события MouseMove, если посмотрим в реквизит Path. 
            В нем будем вся последовательность тегов, на которым двигается мышь
        */
        let options = {};
        options.passive = false;

        this.SetOnTouchStart(this.HolstOnTouchStart.bind(this), options);
        this.SetOnTouchMove(this.HolstOnTouchMove.bind(this), options);
        this.SetOnTouchEnd(this.HolstOnTouchEnd.bind(this), options);
        this.SetOnTouchCancel(this.HolstOnTouchCancel.bind(this), options);
       
        this.SetOnContextMenu(this.HolstOnContextMenu.bind(this));

   
        window.onbeforeunload = this.OnExit.bind(this);
        window.onresize = this.OnResizeMainWindow.bind(this);
       
    }


    OnExit() 
    {
        let confirmMsg = "Возможно данные не сохранены. Вы уверены, что хотите выйти из приложения?";
        return confirmMsg;
    }

    OnResizeMainWindow()
    {
        /* Здесь нужно менять размеры самого холста */
        /* Получаем максимально доступную ширину и высоту окна */
        let W = window.innerWidth;
        let H = window.innerHeight;
        /* В строке три элементы body main-window menu host. Для получения ширины Holst вычтем из максимуму ширину остальных элементов строки/
            При определении ширины элементов необходимо учитывать отступы (margin) и границы (border)
        */
       /* Пойдем по короткому пути, т.к. значения нам известны и менять мы их не будем.
       let elemBody = document.querySelector('body');
       let elemMainWindow = document.getElementById(Const.MainWindowId);
       let elemMenu = document.getElementById(Const.MainMenuId);
       let elemHolst = document.getElementById(Const.HolstId);
        */

        /* margin body 8 + 8 + ширина меню 86 + бордюр меню 1 + 1 + отступ холста 4 + бордюр холста 1 + 1  Скроллер справ 17*/
       let hW = W - 110 - 17;
        /* margin body 8 + 8 + высота статус строк 18 + 36 + бордюр холста 1 + 1  */
        let hH = H - 72;


        this.Holst.SetSize(hW,hH);
    }


    /**
    * @param {KeyboardEvent} Event
    */        
    OnKeyDown(Event)
    {
        if (Event.key=='Escape') {
            this.Holst.KeyDown(Event);
        }
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
            Event.type + Util.PathToString(Event.path);
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

    /** Пересчт в координаты холста */
    GetCoordinatesMouseEvent(Event)
    {
        let HolstRect = this.Holst.SelfElem.getBoundingClientRect();
        let point = {};
        point.X = Math.round(Event.clientX - HolstRect.left);
        point.Y = Math.round(Event.clientY - HolstRect.top);
        return point;
    }
   
    isHostOnPoint(x,y)
    {
        let elems = document.elementsFromPoint(x, y);
        for(let i=0; i<elems.length; i++)       
            if (elems[i].id==Const.HolstId)
                return true;
        return false;
    }

    /**
    * @param {MouseEvent} Event
    */        
    HolstOnMouseDown(Event)
    {
        this.ShowInfoMouseEvent(Event);

        if (this.isHostOnPoint(Event.clientX, Event.clientY)) 
        {
            this.PenLockHost = true;
            Event.preventDefault();        
            let point = this.GetCoordinatesMouseEvent(Event);
            this.Holst.PenDown(point.X, point.Y, Event.clientX, Event.clientY, Event);
        }
        else this.PenLockHost = false;
    } 

    /**
    * @param {MouseEvent} Event
    */        
    HolstOnMouseUp(Event)
    {
        this.ShowInfoMouseEvent(Event);
        if (this.PenLockHost)
        {
            Event.preventDefault();        
            let point = this.GetCoordinatesMouseEvent(Event);
            this.Holst.PenUp(point.X, point.Y, Event.clientX, Event.clientY, Event); 
        }
        this.PenLockHost = false;     
    } 

    /**
    * @param {MouseEvent} Event
    */        
    HolstOnMouseMove(Event)
    {
        this.ShowInfoMouseEvent(Event);

        if (this.PenLockHost || this.isHostOnPoint(Event.clientX, Event.clientY))
        {
            Event.preventDefault();        
            let point = this.GetCoordinatesMouseEvent(Event);
            this.Holst.PenMove(point.X, point.Y, Event.clientX, Event.clientY, Event);
        }
    } 

    /**
    * @param {TouchEvent} Event
    */        
   HolstOnTouchStart(Event)
    {
        this.ShowInfoTouchEvent(Event);
        let coord = this.GetCoordinatesTouchEvent(Event);
        if (coord==null) return;
        if (this.isHostOnPoint(coord.ClientX, coord.ClientY))
        {
            this.PenLockHost = true;
            Event.preventDefault();        
            this.Holst.PenDown(coord.X, coord.Y, coord.ClientX, coord.ClientY, Event);        
        }
    }

    /**
    * @param {TouchEvent} Event
    */        
   HolstOnTouchMove(Event)
    {
        this.ShowInfoTouchEvent(Event);
        this.ShowInfoTouchEvent(Event);
        let coord = this.GetCoordinatesTouchEvent(Event);
        if (coord==null) return;
        if (this.PenLockHost) 
        {
            Event.preventDefault();        
            this.Holst.PenMove(coord.X, coord.Y, coord.ClientX, coord.ClientY, Event);        
        }
    }

    /**
    * @param {TouchEvent} Event
    */        
   HolstOnTouchEnd(Event)
    {
        //console.log(Event.type, Event);
        this.ShowInfoTouchEvent(Event);
        let coord = this.GetCoordinatesTouchEvent(Event);
        if (coord==null) return;
        if (this.PenLockHost) 
        {
            Event.preventDefault();
            this.Holst.PenUp(coord.X, coord.Y, coord.ClientX, coord.ClientY, Event);        
        }
        this.PenLockHost = false;
    }

    HolstOnTouchCancel(Event)
    {
        this.PenLockHost = false;
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
    window.MainApp = new Application(Const.MainApplicationId); 
    MainApp.Init();
}

window.onload = ApplicationInit;
