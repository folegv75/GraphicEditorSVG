/*jshint esversion: 6 */

/**
 * @class Holst
 */
class Holst extends BaseControl
{
	constructor(id)
	{
		super(id);

		this.Actions = new ProcessAction(this);

		this.RulerWidth=30;
        this.LabelStatusInfo = new Label(Const.LabelStatusInfo);
		let StartWidth = 1500;

		this.Grid = new Grid(Const.GridId, this.RulerWidth, this.RulerWidth, StartWidth,StartWidth, 0,0);
		this.Grid.Show();
		this.RulerHorizontal = new Ruler(Const.RulerHorizontalId, RulerType.Horizontal, this.RulerWidth,0, StartWidth, this.RulerWidth, 0,0);
		this.RulerHorizontal.Show();
        this.RulerVertical = new Ruler(Const.RulerVerticalId, RulerType.Vertical, 0, this.RulerWidth, this.RulerWidth, StartWidth, 0,0);
		this.RulerVertical.Show();
		this.Paper = new Paper(Const.PaperId, this.RulerWidth, this.RulerWidth, StartWidth,StartWidth, 0,0);
		this.Paper.Show();

		this.ShapeList = new Object;
		
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
        this.Grid.ShiftX = shiftX;
		this.Grid.ShiftY = shiftY;
		this.Grid.Zoom = zoom;
		
		this.RulerHorizontal.Base = shiftX;
		this.RulerHorizontal.Scale = 1/zoom;
		this.RulerHorizontal.Show();
		
		this.RulerVertical.Base = shiftY;
		this.RulerVertical.Scale = 1/zoom;
		this.RulerVertical.Show();

        this.Paper.ShiftX = shiftX;
        this.Paper.ShiftY = shiftY;
		this.Paper.Zoom = zoom;
	}
	
	
	/** @param {EditorEvent}  editorEvent*/
	ShowEventInStatusInfo(editorEvent)
	{
		let st = 	"X=" +  editorEvent.X + " Y=" +  editorEvent.Y  + 
					" cX=" +  editorEvent.ClientX + " cY=" +  editorEvent.ClientY + 
					" " + editorEvent.Type + " " + MainApp.EditorState.Hash +
					//" " + Util.PathToString(Util.ParentTreeToArray(editorEvent.TopElement), 'Holst') +
					" " + " | TopFig: " + (editorEvent.TopFigure == null ? "nul" : editorEvent.TopFigure.Caption+"#"+editorEvent.TopFigure.Id) +
					" " + " | Layer: " + (editorEvent.Layer == null ? "nul" : editorEvent.Layer.Id) +
					" " + " | Elem: " + (editorEvent.TopElement == null ? "nul" : editorEvent.TopElement.tagName+"#"+editorEvent.TopElement.id);
		this.LabelStatusInfo.SetValue(st);
	}


	/** обработка изменения координата пера и генерация события
	 * @param x {number} координата X относительно нуля холста
	 * @param y {number} координата Y относительно нуля холста
	 * @param clientx {number} координата X относительно нуля окна
	 * @param clienty {number} координата Y относительно нуля окна
	 */
	PenChange(x, y, clientx, clienty, sourceEvent, evtype)
	{

		let editorEvent = new EditorEvent(evtype);
		editorEvent.SourceEvent = sourceEvent;
		editorEvent.ClientX = clientx;
		editorEvent.ClientY = clienty;
		editorEvent.X = x - this.RulerWidth;
		editorEvent.Y = y - this.RulerWidth;

		// координаты относительно верxнего левого угла окна рабочей области браузера
		editorEvent.TopElement = document.elementFromPoint(clientx, clienty);
		let elems = Util.ParentTreeToArray(editorEvent.TopElement);
		for (let i=0; i<elems.length; i++)
		{
			switch (elems[i].id)
			{
				case Const.HolstId:
					editorEvent.Layer = this;
					break;
				case Const.GridId:
					editorEvent.Layer = this.Grid;
					break;
				case Const.PaperId:
					editorEvent.Layer = this.Paper;
					break;
				case Const.RulerHorizontalId:
					editorEvent.Layer = this.RulerHorizontal;
					break;
				case Const.RulerVerticalId:
					editorEvent.Layer = this.RulerVertical;
					break;
			}
			if (editorEvent.Layer!=null) break;
		}

		let topFigureId = this.FindTopFigureIdClientArea(clientx, clienty);
		if (topFigureId!=null) 
		{
			/** Здесь нужно найти фигуру по id
			 * Вариант 1. Найти элемент и по его типу создать фигуру и считать из html элемента
			 * Вариант 2. Хранить список фигур в массиве, и найти объект в массив по ID.
			 */

			let tf = this.ShapeList[topFigureId];
			if (tf===undefined) editorEvent.TopFigure = null;
			editorEvent.TopFigure = tf;
			
			qwerty
			/** Спросить у фигуры куда в нее нажали, чтобы определить какое изменение надо делать Перемещение фигуры, изменение размера (формы) перемещение точки крепления...*/
		}

		
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

	KeyDown(sourceEvent)
	{

		if (sourceEvent.key=='Escape') {
			let editorEvent = new EditorEvent(EditorEventType.Cancel);		
			editorEvent.SourceEvent = sourceEvent;
			this.ProcessEvent(editorEvent);
		}
		if (sourceEvent.key=='F2') {
			let editorEvent = new EditorEvent(EditorEventType.Rename);		
			editorEvent.SourceEvent = sourceEvent;
			this.ProcessEvent(editorEvent);
		}
	}

	// Найти верхнюю фигуру. Фигура это элемент <g>, у которого есть tag 'figuretype' 'figure' или  'connector'
	FindTopFigureIdClientArea(x,y) 
	{
		// получили список фигур по координатами
		//let elems = document.elementsFromPoint(x, y);
		let elem = document.elementFromPoint(x, y);
		//for (let i=0; i<elems.length; i++)
		//{ 
			//let currelem = elems[i];
			//let path = Util.ParentTreeToArray(elems[i]);
			let path = Util.ParentTreeToArray(elem);
			for (let i=0; i<path.length;i++)
			{
				let currelem = path[i];
				if (currelem.tagName=='BODY') break;
				if (currelem.tagName!='g') continue;
				let figuretype = currelem.getAttribute('figuretype');
				if (figuretype==null) continue;
				if (currelem.id=='') continue;
				return currelem.id;
			}
		//}
		return null;
	}

	/** @desc обработать событие редактора
	 * 	@param {EditorEventType} editorEvent
	 */
	ProcessEvent(editorEvent)
	{
		//console.log(editorEvent);
		
		MainApp.EditorState.LastEvent = editorEvent;
		MainApp.EditorState.CalculateHash();

		this.ShowEventInStatusInfo(editorEvent);

		switch (MainApp.EditorState.Hash)
		{
			case 'Select-None-PenDown':
			{
				if (editorEvent.TopFigure != null && MainApp.EditorState.SelectedFigure == editorEvent.TopFigure)
				{
					// нажали на уже выделенную фигуру, значит ее перемещаем или изменяем размеры
					this.Actions.BeginMoveFigure(editorEvent);
				}
				else this.Actions.SelectFigure(editorEvent);
			}
			break;
			case 'Select-None-PenMove':
			{
			}
			break;			
			case 'Select-None-SetMode':
			{
				// TODO
			}
			break;
			case 'Select-None-Rename':
			{
				this.Actions.BeginRenameFigure(editorEvent);
			}
			break;

			case 'Select-MoveFigure-PenMove':
			{
				this.Actions.ContinueMoveFigure(editorEvent);
			}
			break;
			case 'Select-MoveFigure-PenUp':
			{
				this.Actions.ApproveMoveFigure(editorEvent);;
			}
			break;
			case 'Select-MoveFigure-SetMode':
			{
				// TODO
			}
			break;
			case 'Select-MoveFigure-Cancel':
			{
				this.Actions.CancelMoveFigure(editorEvent);;
			}
			break;

			case 'Select-RenameFigure-SetMode':
			{
				// TODO
			}
			break;

			case 'Select-RenameFigure-Cancel':
			{
				this.Actions.CancelRenameFigure(editorEvent);
			}
			break;
			case 'Select-RenameFigure-Rename':
			{
				this.Actions.ApproveRenameFigure(editorEvent);
				// TODO
			}
			break;

			case 'Figure-None-PenDown':
			{
				this.Actions.BeginDrawFigure(editorEvent);
			}
			break;
			case 'Figure-None-SetMode':
			{
				// TODO
			}
			break;
			case 'Figure-DrawFigure-PenMove':
			{
				this.Actions.ContinueDrawFigure(editorEvent);
			}
			break;
			case 'Figure-DrawFigure-PenUp':
			{
				this.Actions.ApproveDrawFigure(editorEvent);
			}
			break;
			case 'Figure-DrawFigure-SetMode':
			{
				this.Actions.CancelDrawFigure(editorEvent);
			}
			break;
			case 'Figure-DrawFigure-Cancel':
			{
				this.Actions.CancelDrawFigure(editorEvent);
			}
			break;


			case 'Connector-None-PenDown':
			{
				// TODO
			}
			break;
			case 'Connector-None-SetMode':
			{
				// TODO
			}
			break;

			case 'Connector-DrawConnector-PenMove':
			{
				// TODO
			}
			break;
			case 'Connector-DrawConnector-PenUp':
			{
				// TODO
			}
			break;
			case 'Connector-DrawConnector-Setmode':
			{
				// TODO
			}
			break;
			case 'Connector-DrawConnector-Cancel':
			{
				// TODO
			}
			break;

			default:
				/* Игнорируем событие */
			break;
		}
	}

}