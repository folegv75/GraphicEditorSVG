/*jshint esversion: 6 */

/**
 * @class Holst
 */
class Holst extends BaseControl
{
	constructor(id)
	{
		super(id);

        this.LabelStatusInfo = new Label(Const.LabelStatusInfo);
		this.Paper = document.getElementById(Const.PaperId);
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

	/** @desc утановить размеры холста */
	SetViewBoxSize(left, top, width, height)
	{
		let value = '' + (left-30) + ' ' + (top-30) + ' ' + width + ' ' + height;
		this.Paper.setAttributeNS(null,'viewBox', value);
	}
	
}