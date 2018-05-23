/*jshint esversion: 6 */

/**
 * @class Holst
 */
class Holst extends BaseControl
{
	constructor(id)
	{
		super(id);

		this.RulerWidth=30;
        this.LabelStatusInfo = new Label(Const.LabelStatusInfo);
		this.Paper = new Paper(Const.PaperId, this.RulerWidth, this.RulerWidth, 1500,1500, 0,0);


		this.Grid = new Grid(Const.GridId, this.RulerWidth, this.RulerWidth, 1500,1500, 0,0);
		this.Grid.Show();
		this.RulerHorizontal = new Ruler(Const.RulerHorizontal, RulerType.Horizontal, this.RulerWidth,0, 1500, this.RulerWidth, 0,0);
		this.RulerHorizontal.Show();
        this.RulerVertical = new Ruler(Const.RulerVertical, RulerType.Vertical, 0, this.RulerWidth, this.RulerWidth, 1500, 0,0);
		this.RulerVertical.Show();
		
        MainApp.ZoomManager.AppendView(this);
	}

	SetSize(Width, Height)
	{
        this.SelfElem.style.width = Width + "px";
		this.SelfElem.style.height = Height + "px";
		this.Grid.Width = Width - this.RulerWidth;
		this.Grid.Height = Height - this.RulerWidth;
		this.RulerHorizontal.Width = Width-this.RulerWidth;
		this.RulerVertical.Height = Height-this.RulerWidth;
		this.Paper.Width = Width-this.RulerWidth;
		this.Paper.Height = Height-this.RulerWidth;

	}

	/** @desc утановить размеры холста */
	SetViewBoxSize(shiftX, shiftY, zoom)
	{
		//let value = '' + (left-30) + ' ' + (top-30) + ' ' + width + ' ' + height;
		//this.Paper.setAttributeNS(null,'viewBox', value);\

        this.Grid.ShiftX = shiftX;
		this.Grid.ShiftY = shiftY;
		this.Grid.Zoom = zoom;
		this.RulerHorizontal.ShiftX = shiftX;
        this.RulerVertical.ShiftY = shiftY;
        this.Paper.ShiftX = shiftX;
        this.Paper.ShiftY = shiftY;
	}
	
	
	/** @param {EditorEvent}  editorEvent*/
	ShowEventInStatusInfo(editorEvent)
	{
		let st = 	"X=" +  editorEvent.X + " Y=" +  editorEvent.Y  + 
					" cX=" +  editorEvent.ClientX + " cY=" +  editorEvent.ClientY + 
					" " + editorEvent.Type +
					" " + Util.PathToString(Util.ParentTreeToArray(editorEvent.TopElement), 'Holst') +
					" " + "TopFig: " + (editorEvent.TopFigure == null ? "" : editorEvent.TopFigure.tagName+"#"+editorEvent.TopFigure.id);
		this.LabelStatusInfo.SetValue(st);
	}


	/** обработка изменения координата пера и генерация события
	 * @param x {number} координата X относительно нуля холста
	 * @param y {number} координата Y относительно нуля холста
	 */
	PenChange(x, y, clientx, clienty, sourceEvent, evtype)
	{

		let editorEvent = new EditorEvent(evtype);
		editorEvent.SourceEvent = sourceEvent;
		editorEvent.ClientX = clientx;
		editorEvent.ClientY = clienty;

        // координаты относительно верxнего левого угла окна рабочей области браузера
		editorEvent.TopElement = document.elementFromPoint(clientx, clienty);
		let topFigureId = this.FindTopFigureIdClientArea(clientx, clienty);
		if (topFigureId!=null) 
		{
			editorEvent.TopFigure = document.getElementById(topFigureId);
		}

		editorEvent.X = x;
		editorEvent.Y = y;
		
        /* TODO нужно пересчитать координаты 
            x - координата X от нуля холста
            y - координата Y от нуля холста
			масштабировнаие нужно учитывать
			сдвиг бумаги на холсте надо учитывать
            сдвиг линейки надо учитывать. она сдвигается синхронно с бумагойт
        */
	   this.ProcessEvent(editorEvent);
		
	}

	PenDown(x, y, clientx, clienty, sourceEvent)
	{
		this.PenChange(x, y, clientx, clienty, sourceEvent, EditorEventType.PenDown);
	}
	
	PenUp(x, y, clientx, clienty, sourceEvent)
	{
		this.PenChange(x, y, clientx, clienty, sourceEvent, EditorEventType.PenUp);
	}

	PenMove(x, y, clientx, clienty, sourceEvent)
	{
		this.PenChange(x, y, clientx, clienty, sourceEvent, EditorEventType.PenMove);
	}

	PenMove2(x, y, clientx, clienty, sourceEvent)
	{
		//this.PenChange(x, y, clientx, clienty, sourceEvent, EditorEventType.PenMove);
	}

	// Найти верхнюю фигуру. Фигура это элемент <g>, у которого есть tag 'figuretype' 'figure' или  'connector'
	FindTopFigureIdClientArea(x,y) 
	{
		// получили список фигур по координатами
		let elems = document.elementsFromPoint(x, y);
		for (let i=0; i<elems.length; i++)
		{ 
			//let currelem = elems[i];
			let path = Util.ParentTreeToArray(elems[i]);
			for (let i=0; i<path.length;i++)
			{
				let currelem = path[i];
				if (currelem.tagName=='BODY') break;
				if (currelem.tagName!='g') continue;
				let figuretype = currelem.getAttribute('figuretype');
				if (figuretype==null) continue;
				return currelem.id;
			}
		}
	}

	/** @desc обработать событие редактора
	 * 	@param {EditorEventType} editorEvent
	 */
	ProcessEvent(editorEvent)
	{
		this.ShowEventInStatusInfo(editorEvent);
	}

	
}