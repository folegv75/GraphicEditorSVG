/* jshint esversion: 6 */

class EditorState
{
    constructor ()
    {
        /** Режим редактирования */
        this.Mode = EditorMode.Select;
        /** Текущее действие редактора. 
         * Например, по кругу: нет действия -> начало рисование фигуры -> продолжение рисования -> завершение рисования -> нет действия */
        this.Action = EditorAction.None;
        /** Текущая выделенаня фигура */
        this.SelectedFigure = null;
        /** Последнее событие */
        this.LastEvent = null;
        /** Хеш текущего состояния */
        this.Hash = '';
        this.ListenersOnChange = [];
    }

    /** Вычисляет хеш состояния и события Режим + ТекущееДействие + Событие
     *  Пример, 'Select-None-PenDown'
     */
    CalculateHash()
    {
        this.Hash = this.Mode + '-' + this.Action + '-' + this.LastEvent.Type;        
    }    

    SetMode(newmode)
    {
        this.Mode = newmode;
        this.OnStateChange();
    }

    OnStateChange()
    {
        for(let i=0; i<this.ListenersOnChange.length; i++)
            this.ListenersOnChange[i]();            
    }

    AddListenerOnChange(proc)
    {
        this.ListenersOnChange.push(proc);       
    }
    
}

class PanelModeControl extends BaseControl
{
    constructor (id, manager)
    {
        super(id);

        this.StateManager = manager;
        this.ButtonSelect = new Button(Const.BtnSelectId);
        this.ButtonRectangle = new Button(Const.BtnRectangleId);
        this.ButtonLine = new Button(Const.BtnLineId);

        this.ButtonSelect.SetOnClick(this.ButtonSelectOnClick.bind(this));
        this.ButtonRectangle.SetOnClick(this.ButtonRectangleOnClick.bind(this));
        this.ButtonLine.SetOnClick(this.ButtonLineOnClick.bind(this));

        this.StateManager.AddListenerOnChange(this.ShowMode.bind(this));
    }

    ShowMode()
    {
        switch(MainApp.EditorState.Mode)
        {
            case EditorMode.Select:
                this.ButtonSelect.SetSelected(true);
                this.ButtonRectangle.SetSelected(false);
                this.ButtonLine.SetSelected(false);
                break;
            case EditorMode.Figure:
                this.ButtonSelect.SetSelected(false);
                this.ButtonRectangle.SetSelected(true);
                this.ButtonLine.SetSelected(false);
            break;
            case EditorMode.Connector:
                this.ButtonSelect.SetSelected(false);
                this.ButtonRectangle.SetSelected(false);
                this.ButtonLine.SetSelected(true);
            break;
        }
    }
    
    /**
    * @param {MouseEvent} Event
    */        
    ButtonSelectOnClick(Event)    
    {
        this.StateManager.SetMode(EditorMode.Select);
    }

    /**
    * @param {MouseEvent} Event
    */        
    ButtonRectangleOnClick(Event)
    {
        this.StateManager.SetMode(EditorMode.Figure);
    }
 
    /**
    * @param {MouseEvent} Event
    */        
    ButtonLineOnClick(Event)
    {
        this.StateManager.SetMode(EditorMode.Connector);
    }    
}