// посмотреть пример библиотеки paperjs.org
// 2918-03-27
let ShapeData = {};
var xmlns = "http://www.w3.org/2000/svg";

// генератор уникальной строки
function generateId()
{
	return 'id_'+Math.random().toString(36).substr(2, 11);
}

// генерация уникального значения. Еcли такое уже есть, генерируется следующее.
function genId()
{
	let elem = null;
	let xid = null;
	do 
	{
		xid = generateId();
		elem = document.getElementById(xid);
	} while (elem!=null);
	return xid;
}

// Найти фигуру, которая содержит координаты X, Y
function FindFigureByXY(px, py)
{
	let elem = document.getElementById('Holst');
	let list = elem.querySelectorAll('g[isfigure=true]');
	for(let i=0; i<list.length; i++)
	{
		let fig = list[i];
		let bx = +fig.getAttributeNS(null,'basex');
		let by = +fig.getAttributeNS(null,'basey');
		let bw = +fig.getAttributeNS(null,'basewidth');
		let bh = +fig.getAttributeNS(null,'baseheight');
		let bx2 = bx + bw;
		let by2 = by + bh;
		if (px>=bx && px<=bx2 && py>=by && py<=by2) 
		{
			return fig;
		}
	}
	return null;	
}

function FileDragOver(event)
{
	// отменяем действие по умолчанию
	event.preventDefault();
}
function FileDrop() 
{ // отменяем действие по умолчанию 
	event.preventDefault(); 
	let i = 0, files = event.dataTransfer.files, len = files.length; 
	for (; i < len; i++) 
	{ 
		console.log("Filename: " + 
		files[i].name); console.log("Type: " + files[i].type); 
		console.log("Size: " + files[i].size + " bytes"); 
	} 
}

function ReadShapeFromFile()
{
	var control = document.getElementById("your-files");
	// Когда происходит изменение элементов управления, значит появились новые файлы
	var i = 0,
		files = control.files,
		len = files.length;

	for (; i < len; i++)
	{
		console.log("Filename: " + files[i].name);
		console.log("Type: " + files[i].type);
		console.log("Size: " + files[i].size + " bytes");

		var reader = new FileReader();
		reader.onload = OnFileRead;
		reader.readAsText(files[i]);
	}

}

function OnFileRead(event)
{
	var contents = event.target.result;

	var elem = document.getElementById('Holst');
	elem.innerHTML = contents;	
}

function SaveShapeToFile()
{
	var elem = document.getElementById('Holst');
	var textforfile = elem.innerHTML;
	var arr = [];
	arr.push(textforfile);
	// создает blob, его  параметр это массив
	bb = new Blob(arr);
	// специальная функция для сохранения blob данных в файле.
	// приницип работы: сделать из blob URL объекта, сгненировать html <a> и 
	// присвоить ссылку на URL, затем сгенерировать события нажатия на эту ссылку
	// произодет скачивание файла по ссылке, но не с сервера, а с blob конвертированного в ссылку

	saveAs(bb, 'save.svg');

}

function Init()
{
	// глообальные элементы
	elt = document.getElementById('info');
	elmDebugInfo = document.getElementById('debug-info');
	elmXValue = document.getElementById('xvalue');
	elmEValue = document.getElementById('yvalue');
	elmHolst = document.getElementById('Holst');


	// Инициализация сохранения чтения файлов
	var control = document.getElementById("your-files");
	control.addEventListener("change", ReadShapeFromFile);

	control = document.getElementById("your-files-drag");
	control.addEventListener("dragover", FileDragOver);
	control.addEventListener("drop", FileDrop);

	control = document.getElementById("your-files-save");
	control.addEventListener("click", SaveShapeToFile);

	// Инициализация редактора фигур

	ShapeData.currShape = 'select';
	ShapeData.FigureGroup = null;

	var elem;
	elem = document.getElementById('btnSelect');
	elem.addEventListener('click', SelectClick);

	elem = document.getElementById('btnRectangle');
	elem.addEventListener('click', RectangleClick);

	elem = document.getElementById('btnCircle');
	elem.addEventListener('click', CircleClick);

	elem = document.getElementById('btnText');
	elem.addEventListener('click', TextClick);

	elem = document.getElementById('btnLine');
	elem.addEventListener('click', LineClick);

	elmHolst.addEventListener('mousedown', HolstMouseDown);
	elmHolst.addEventListener('mouseup', HolstMouseUp);
	elmHolst.addEventListener('mousemove', HolstMouseMove);
	elmHolst.addEventListener('mouseover', HolstMouseOver);
	elmHolst.addEventListener('touchstart', HolstTouchStart, false);
	elmHolst.addEventListener('touchmove', HolstTouchMove, false);
	elmHolst.addEventListener('touchend', HolstTouchEnd, false);
	document.addEventListener('keydown', HolstKeyDown);

	SelectClick();

}

var CursorEvent = {};
CursorEvent.Init = function ()
{
	CursorEvent.SetEvent(0, 0, 'none', null, null, null);
}

CursorEvent.SetEvent = function (ofsx, ofsy, type, target, srcevent)
{
	CursorEvent.OffsetX = ofsx;
	CursorEvent.OffsetY = ofsy;
	CursorEvent.Type = type;
	CursorEvent.Target = target;
	CursorEvent.SourceEvent = srcevent;
}

function ShowXY(pX, pY)
{
	var elm = document.getElementById('xvalue');
	elm.innerHTML = pX;
	var elm = document.getElementById('yvalue');
	elm.innerHTML = pY;

	holstbounds = elmHolst.getBoundingClientRect();
	var by = Math.trunc(holstbounds.top);
	var bx = Math.trunc(holstbounds.left);

	sy = document.body.scrollTop,
		sx = document.body.scrollLeft;

	elmDebugInfo.innerHTML = "Holst(" + bx + ", " + by + ") Scroll (" + sx + ", " + sy + ")";
}


function ConvertTouchCoordToHolst(touch)
{
	var locx, locy, bx, by, newx, newy, sx, sy, point = {};
	locx = Math.trunc(touch.pageX);
	locy = Math.trunc(touch.pageY);
	holstbounds = elmHolst.getBoundingClientRect();
	by = Math.trunc(holstbounds.top);
	bx = Math.trunc(holstbounds.left);

	sy = document.body.scrollTop,
		sx = document.body.scrollLeft;

	point.X = locx - bx - sx;
	point.Y = locy - by - sy;
	return point;
}

// Обработка событий Touch
function HolstTouchStart(E)
{
	E.preventDefault();

	var touches = E.changedTouches;

	for (var i = 0; i < touches.length; i++)
	{
		var lPoint = ConvertTouchCoordToHolst(touches[i]);
		ShowXY(lPoint.X, lPoint.Y);
		CursorEvent.SetEvent(lPoint.X, lPoint.Y, 'cursordown', E.target, E);
		ProcessEvent(CursorEvent);
		break;
	}
}

function HolstTouchMove(E)
{
	E.preventDefault();

	var touches = E.changedTouches;

	for (var i = 0; i < touches.length; i++)
	{
		var lPoint = ConvertTouchCoordToHolst(touches[i]);
		ShowXY(lPoint.X, lPoint.Y);

		CursorEvent.SetEvent(lPoint.X, lPoint.Y, 'cursormove', E.target, E);
		ProcessEvent(CursorEvent);
		break;
	}
}

function HolstTouchEnd(E)
{
	E.preventDefault();

	var touches = E.changedTouches;

	for (var i = 0; i < touches.length; i++)
	{
		var lPoint = ConvertTouchCoordToHolst(touches[i]);
		ShowXY(lPoint.X, lPoint.Y);

		CursorEvent.SetEvent(lPoint.X, lPoint.Y, 'cursorup', E.target, E);
		ProcessEvent(CursorEvent);
		break;
	}
}

// Обработка событий мышм
function HolstMouseDown(E)
{
	E.preventDefault();
	ShowXY(E.offsetX, E.offsetY);
	CursorEvent.SetEvent(E.offsetX, E.offsetY, 'cursordown', E.target, E);
	ProcessEvent(CursorEvent);
}

function HolstMouseMove(E)
{
	//E.preventDefault();
	ShowXY(E.offsetX, E.offsetY);
	CursorEvent.SetEvent(E.offsetX, E.offsetY, 'cursormove', E.target, E);
	ProcessEvent(CursorEvent);
}

function HolstMouseUp(E)
{
	ShowXY(E.offsetX, E.offsetY);
	CursorEvent.SetEvent(E.offsetX, E.offsetY, 'cursorup', E.target, E);
	ProcessEvent(CursorEvent);
}

function HolstMouseOver(E)
{
	//console.log(E);
	//E.preventDefault();
}

function HolstKeyDown(E)
{
	//console.log(ShapeData.OperationMode);
	console.log(E.key);
	if (ShapeData.OperationMode == 'draw-figure-start' && E.key == 'Escape') 
	{
		CancelDrawFigure();
	} else if (ShapeData.OperationMode == 'select' && E.key == 'F2') 
	{
		ShapeData.OperationMode = 'rename-caption';
		ShapeRenameCaptionStart(ShapeData.SelectedFigure);
	} else if (ShapeData.OperationMode == 'rename-caption' && E.key == 'F2') 
	{
		ShapeData.OperationMode = 'select';
		ShapeRenameCaptionApprove(ShapeData.SelectedFigure);
	} else if (ShapeData.OperationMode == 'rename-caption' && E.key == 'Escape') 
	{
		ShapeData.OperationMode = 'select';
		ShapeRenameCaptionCancel(ShapeData.SelectedFigure);
	} else if (ShapeData.OperationMode == 'select' && E.key == 'Delete') 
	{
		if (ShapeData.SelectedFigure!=null)
		{
			DeleteFigure(ShapeData.SelectedFigure);
		}
	}

}

// Обработка событий курсора
function ProcessEvent(cursorEvent)
{
	switch (cursorEvent.Type) 
	{
		case 'cursordown':
			CursorDown(cursorEvent);
			break;
		case 'cursormove':
			CursorMove(cursorEvent);
			break;
		case 'cursorup':
			CursorUp(cursorEvent);
			break;
	}
}

// Обработка нажатия кнопки выбора фигур
function SelectClick()
{
	ShapeData.OperationMode = 'select';
	ShapeData.currShape = 'select';
	ShapeData.StartShapeX = 0;
	ShapeData.StartShapeY = 0;
	ShapeData.EndShapeX = 0;
	ShapeData.EndShapeY = 0;
	ShapeData.CurrentFigureCountur = null;
	ShapeData.StartDrawShape = false;
	ShapeData.DrawShape = false;

	ToggleMenuButton('btnSelect');
}

// Обработка нажатия кнопки Прямоугольник
function RectangleClick()
{
	ShapeData.currShape = 'rectangle';
	ShapeData.OperationMode = 'draw-figure';
	ToggleMenuButton('btnRectangle');
}

// Обработка нажатия кнопки Окружность
function CircleClick()
{
	ShapeData.currShape = 'circle';
	ShapeData.OperationMode = 'draw-figure';
	ToggleMenuButton('btnCircle');
}

// Обработка нажатия кнопки Текст
function TextClick()
{
	ShapeData.currShape = 'text';
	ShapeData.OperationMode = 'draw-figure';
	ToggleMenuButton('btnText');
}

// Обработка нажатия кнопки Линия
function LineClick()
{
	ShapeData.currShape = 'line';
	ShapeData.OperationMode = 'draw-line';
	ToggleMenuButton('btnLine');
}

// переключить выделение текущей кнопки фигуры
function ToggleMenuButton(id)
{
	var elem;
	elem = document.querySelector('.currentbtn');
	if (elem != null) elem.classList.remove('currentbtn');
	elem = document.getElementById(id);
	elem.classList.add('currentbtn');
}

// Обработка кликов по холсту рисования
// при клике на пустом месте, координаты будут относильно холста
// при клике на фигуру, координаты также будут относительно холста
// но при клике на вложенном html элементе координаты будут относительно этих элементов, 
// значит их нужно пересчитать в координаты самой фигуры
function CursorDown(E)
{
	mouseCoord = {};
	let figureGroup = null;

	if (E.Target.id == 'Holst') 
	{
		// нажали на пустое место
		mouseCoord.offsetX = E.OffsetX;
		mouseCoord.offsetY = E.OffsetY;
		ShapeData.FigureGroup = null;
		ShapeData.FigureCursorDown = null;
	} else 
	{
		// нажали на фигуру
		var list = E.SourceEvent.path;
		for (i = 0; i < list.length; i++)
		{
			var element = list[i];
			if (element.tagName == 'g')
			{
				var isFigure = element.getAttributeNS(null, 'isfigure');
				if (isFigure != null && isFigure == 'true')
				{
					figureGroup = element;
					break;
				}
			}

		}

		ShapeData.FigureGroup = figureGroup;
		// на какой фигуре нажали курсор
		ShapeData.FigureCursorDown = figureGroup;
		if (figureGroup != null) 
		{
			baseFigure = figureGroup.querySelector("rect");
			if (baseFigure != null)
			{
				x = +baseFigure.getAttributeNS(null, "x");
				y = +baseFigure.getAttributeNS(null, "y");
				w = +baseFigure.getAttributeNS(null, "width");
				h = +baseFigure.getAttributeNS(null, "height");
				// здесь нужно считать смещение если нажали на фигуру, а координаты отсчитаны не от угла холста
				mouseCoord.offsetX = E.OffsetX;
				mouseCoord.offsetY = E.OffsetY;
			}
		}

	}

	if (ShapeData.OperationMode == 'draw-figure' || ShapeData.OperationMode == 'draw-line') 
	{
		ShapeData.StartShapeX = mouseCoord.offsetX;
		ShapeData.StartShapeY = mouseCoord.offsetY;
		ShapeData.EndShapeX = mouseCoord.offsetX;
		ShapeData.EndShapeY = mouseCoord.offsetY;
		ShapeData.OperationMode = 'draw-figure-start';
		CalculateFigureBounds();
		DrawFigureContour();
	}
	else
		if (ShapeData.OperationMode == 'select') 
		{
			// если выбрали фигуру
			if (ShapeData.FigureGroup != null) 
			{
				DeselectFigure(ShapeData.SelectedFigure);
				figureType = ShapeData.FigureGroup.getAttributeNS(null, 'figuretype');
				ShapeData.SelectedFigure = figureGroup;
				if (figureType == 'rect') 
				{
					ShapeData.OperationMode = 'select-figure-start';
					currFigureX = +ShapeData.SelectedFigure.getAttributeNS(null, 'basex');
					currFigureY = +ShapeData.SelectedFigure.getAttributeNS(null, 'basey');
					ShapeData.DeltaFigureX = mouseCoord.offsetX - currFigureX;
					ShapeData.DeltaFigureY = mouseCoord.offsetY - currFigureY;
					ShapeData.StartShapeX = mouseCoord.offsetX;
					ShapeData.StartShapeY = mouseCoord.offsetY;
				}
				SelectFigure(ShapeData.SelectedFigure);
			}

		}
}

function CursorMove(E)
{
	if (ShapeData.OperationMode == 'draw-figure-start') 
	{
		ShapeData.EndShapeX = E.OffsetX;
		ShapeData.EndShapeY = E.OffsetY;
		CalculateFigureBounds();
		DrawFigureContour();
	} else
		if (ShapeData.OperationMode == 'select-figure-start' || ShapeData.OperationMode == 'move-figure')
		{
			ShapeData.OperationMode = 'move-figure';
			ShapeData.EndShapeX = E.OffsetX;
			ShapeData.EndShapeY = E.OffsetY;

			MoveFigure();
		}

}


function CursorUp(E)
{
	
	let figup = null;
	let figureGroup = null;
	if (E.Target.id == 'Holst') 
	{
		figup = null;
	} else 
	{
		// нажали на фигуру
		figup = FindFigureByXY(ShapeData.EndShapeX,ShapeData.EndShapeY);
		
		let list = E.SourceEvent.path;
		for (let i = 0; i < list.length; i++)
		{
			let element = list[i];
			if (element.tagName == 'g')
			{
				let isFigure = element.getAttributeNS(null, 'isfigure');
				if (isFigure != null && isFigure == 'true')
				{
					figureGroup = element;
					break;
				}
			}

		}
	}

		// на какой фигуре нажали курсор
		ShapeData.FigureCursorUp = figup;
	//console.log('figdown', ShapeData.FigureCursorDown);
	//console.log('figup', ShapeData.FigureCursorUp);
	
	if (ShapeData.OperationMode == 'draw-figure-start') 
	{
		ShapeData.OperationMode = 'draw-figure-stop';
		ShapeData.EndShapeX = E.OffsetX;
		ShapeData.EndShapeY = E.OffsetY;
		CalculateFigureBounds();
		DestroyFigureContour();
		CreateFigureOnHolst();
		ShapeData.OperationMode = 'draw-figure';
	} else	if (ShapeData.OperationMode == 'move-figure')
	{
			MoveFigureApprove();			
			ShapeData.OperationMode = 'select';
	}
	else if (ShapeData.OperationMode == 'select-figure-start') 
	{
		ShapeData.OperationMode = 'select';
	}
}

// Пересчитать прямоугольник границы фигуры
function CalculateFigureBounds()
{
	if (ShapeData.StartShapeX <= ShapeData.EndShapeX) 
	{
		ShapeData.BoundsLeft = ShapeData.StartShapeX;
		ShapeData.BoundsRight = ShapeData.EndShapeX;
	} else 
	{
		ShapeData.BoundsLeft = ShapeData.EndShapeX;
		ShapeData.BoundsRight = ShapeData.StartShapeX;
	}
	if (ShapeData.StartShapeY <= ShapeData.EndShapeY) 
	{
		ShapeData.BoundsTop = ShapeData.StartShapeY;
		ShapeData.BoundsBottom = ShapeData.EndShapeY;
	} else 
	{
		ShapeData.BoundsTop = ShapeData.EndShapeY;
		ShapeData.BoundsBottom = ShapeData.StartShapeY;
	}

	ShapeData.Width = ShapeData.BoundsRight - ShapeData.BoundsLeft;
	ShapeData.Height = ShapeData.BoundsBottom - ShapeData.BoundsTop;
}

function CreateFigureOnHolst()
{

	// слишком маленькие не создает, предполагаем что пользователь передумал и свел размеры в ноль
	if (ShapeData.Width <= 15 && ShapeData.Height <= 15) return;

	switch (ShapeData.currShape) 
	{
		case 'select':
			break;
		case 'rectangle':
			ShapeAddRectangle(ShapeData.BoundsLeft, ShapeData.BoundsTop, ShapeData.Width, ShapeData.Height);
			break;
		case 'circle':
			ShapeAddCircle(ShapeData.StartShapeX, ShapeData.StartShapeY, ShapeData.EndShapeX - ShapeData.StartShapeX);
			break;
		case 'line':
			ShapeAddLine(ShapeData.StartShapeX, ShapeData.StartShapeY, ShapeData.EndShapeX, ShapeData.EndShapeY);
			break;
		case 'text':
			ShapeAddText(ShapeData.StartShapeX, ShapeData.StartShapeY, 'Текстовая надпись');
			break;
	}

}


function CancelDrawFigure()
{
	ShapeData.OperationMode = 'draw-figure';
	DestroyFigureContour();
}

function DrawFigureContour()
{
	if (ShapeData.CurrentFigureCountur == null) 
	{
		switch (ShapeData.currShape)
		{
			case 'rectangle':
				ShapeData.CurrentFigureCountur = CreateFigureConturRectangle(ShapeData.BoundsLeft, ShapeData.BoundsTop, ShapeData.Width, ShapeData.Height);
				break;
			case 'line':
				ShapeData.CurrentFigureCountur = CreateFigureConturLine(ShapeData.BoundsLeft, ShapeData.BoundsTop, ShapeData.Width, ShapeData.Height);
				break;
		}

	} else
	{
		switch (ShapeData.currShape)
		{
			case 'rectangle':
				ShapeData.CurrentFigureCountur.setAttributeNS(null, 'x', ShapeData.BoundsLeft);
				ShapeData.CurrentFigureCountur.setAttributeNS(null, 'y', ShapeData.BoundsTop);
				ShapeData.CurrentFigureCountur.setAttributeNS(null, 'width', ShapeData.Width);
				ShapeData.CurrentFigureCountur.setAttributeNS(null, 'height', ShapeData.Height);
				break;
			case 'line':
				ShapeData.CurrentFigureCountur.setAttributeNS(null, 'x2', ShapeData.EndShapeX);
				ShapeData.CurrentFigureCountur.setAttributeNS(null, 'y2', ShapeData.EndShapeY);

				break;
		}

	}

}

function DestroyFigureContour()
{
	if (ShapeData.CurrentFigureCountur != null)
		HolstRemoveShape(ShapeData.CurrentFigureCountur);
	ShapeData.CurrentFigureCountur = null;
}

// Создать контур фигуруры прямоугольник
function CreateFigureConturRectangle(x, y, w, h)
{
	var shape;
	shape = document.createElementNS(xmlns, 'rect');
	shape.setAttributeNS(null, 'x', x);
	shape.setAttributeNS(null, 'y', y);
	shape.setAttributeNS(null, 'width', w);
	shape.setAttributeNS(null, 'height', h);
	shape.setAttributeNS(null, 'fill', 'rgba(255,255,255,1)');
	shape.setAttributeNS(null, 'stroke', 'black');
	shape.setAttributeNS(null, 'stroke-width', '1');

	HolstAppendShape(shape);
	return shape;
}

//Создать контур фигуры линия
function CreateFigureConturLine(x, y, w, h)
{
	var shape;
	shape = document.createElementNS(xmlns, 'line');
	shape.setAttributeNS(null, 'x1', x);
	shape.setAttributeNS(null, 'y1', y);
	shape.setAttributeNS(null, 'x2', x + w);
	shape.setAttributeNS(null, 'y2', y + h);
	shape.setAttributeNS(null, 'fill', 'rgba(255,255,255,1)');
	shape.setAttributeNS(null, 'stroke', 'black');
	shape.setAttributeNS(null, 'stroke-width', '0.5');

	HolstAppendShape(shape);
	return shape;
}

function MoveFigure()
{
	if (ShapeData.SelectedFigure == null) return;
	shape = ShapeData.SelectedFigure;
	figuretype = shape.getAttributeNS(null, 'figuretype');
	if (figuretype == 'rect')
	{

		newX = ShapeData.EndShapeX - ShapeData.DeltaFigureX;
		newY = ShapeData.EndShapeY - ShapeData.DeltaFigureY;

		if (newX < 0) newX = 0;
		if (newY < 0) newY = 0;

		if (newX > 1000) newX = 1000;
		if (newY > 1000) newY = 1000;

		ShapeMoveRectangle(shape, newX, newY);

		shape.setAttributeNS(null, 'x', newX);
		shape.setAttributeNS(null, 'y', newY);				

	}
	else
		if (figuretype == 'line') 
		{
		}
	else
		if (figuretype == 'circle') 
		{
			cx = shape.getAttributeNS(null, 'cx');
			cy = shape.getAttributeNS(null, 'cy');
			shape.setAttributeNS(null, 'cx', E.offsetX);
			shape.setAttributeNS(null, 'cy', E.offsetY);
		}
	let list = shape.querySelectorAll('link');
	for (let i=0; i<list.length; i++)
	{
		let elm = list[i];
		let linkline = document.getElementById(elm.getAttributeNS(null, 'figid'));
		ShapeMoveLinkTip(linkline, elm.getAttributeNS(null,'tip'));
	}
	
}

function MoveFigureApprove()
{
	if (ShapeData.SelectedFigure == null) return;
	shape = ShapeData.SelectedFigure;
	figuretype = shape.getAttributeNS(null, 'figuretype');
	if (figuretype == 'rect')
	{

		newX = ShapeData.EndShapeX - ShapeData.DeltaFigureX;
		newY = ShapeData.EndShapeY - ShapeData.DeltaFigureY;

		if (newX < 0) newX = 0;
		if (newY < 0) newY = 0;

		if (newX > 1000) newX = 1000;
		if (newY > 1000) newY = 1000;

		ShapeMoveRectangle(shape, newX, newY);

		shape.setAttributeNS(null, 'x', newX);
		shape.setAttributeNS(null, 'y', newY);				

	}
	else
		if (figuretype == 'line') 
		{
		}
	else
		if (figuretype == 'circle') 
		{
			cx = shape.getAttributeNS(null, 'cx');
			cy = shape.getAttributeNS(null, 'cy');
			shape.setAttributeNS(null, 'cx', E.offsetX);
			shape.setAttributeNS(null, 'cy', E.offsetY);
		}
	let list = shape.querySelectorAll('link');
	for (let i=0; i<list.length; i++)
	{
		let elm = list[i];
		let linkline = document.getElementById(elm.getAttributeNS(null, 'figid'));
		ShapeMoveApproveLinkTip(linkline, elm.getAttributeNS(null,'tip'));
	}
	
}
	


// передвинуть конец линии
function ShapeMoveLinkTip(linkline, tip)
{
	if (linkline==null) return;
	let line = linkline.querySelector('line:not([linetype])');
	if (line==null) return;
	let linecontur = linkline.querySelector('line[linetype=contur]');



	if (tip=='begin') 
	{

		// ------------------
		let originX = +linkline.getAttributeNS(null, 'basex');
		let originY = +linkline.getAttributeNS(null, 'basey');
		let deltax = ShapeData.StartShapeX - originX;
		let deltay = ShapeData.StartShapeY - originY;
		let newx = ShapeData.EndShapeX - deltax;
		let newy = ShapeData.EndShapeY - deltay;
	
		line.setAttributeNS(null,'x1',newx);
		line.setAttributeNS(null,'y1',newy);
		linecontur.setAttributeNS(null,'x1',newx);
		linecontur.setAttributeNS(null,'y1',newy);

		// это надо сделать после окончания перемещения
		//linkline.setAttributeNS(null, 'basex', newx);
		//linkline.setAttributeNS(null, 'basey', newy);
						
	} else if (tip =='end')
	{
		let originX = +linkline.getAttributeNS(null, 'endx');
		let originY = +linkline.getAttributeNS(null, 'endy');
		let deltax = ShapeData.StartShapeX - originX;
		let deltay = ShapeData.StartShapeY - originY;
		let newx = ShapeData.EndShapeX - deltax;
		let newy = ShapeData.EndShapeY - deltay;
	
		line.setAttributeNS(null,'x2',newx);
		line.setAttributeNS(null,'y2',newy);
		linecontur.setAttributeNS(null,'x2',newx);
		linecontur.setAttributeNS(null,'y2',newy);

		// это надо сделать после окончания перемещения
		//linkline.setAttributeNS(null, 'endx', newx);
		//linkline.setAttributeNS(null, 'endy', newy);
		
	}
}

// передвинуть конец линии
function ShapeMoveApproveLinkTip(linkline, tip)
{
	if (linkline==null) return;
	let line = linkline.querySelector('line:not([linetype])');
	if (line==null) return;
	let linecontur = linkline.querySelector('line[linetype=contur]');

	if (tip=='begin') 
	{

		// ------------------
		let originX = +linkline.getAttributeNS(null, 'basex');
		let originY = +linkline.getAttributeNS(null, 'basey');
		let deltax = ShapeData.StartShapeX - originX;
		let deltay = ShapeData.StartShapeY - originY;
		let newx = ShapeData.EndShapeX - deltax;
		let newy = ShapeData.EndShapeY - deltay;
	
		line.setAttributeNS(null,'x1',newx);
		line.setAttributeNS(null,'y1',newy);
		linecontur.setAttributeNS(null,'x1',newx);
		linecontur.setAttributeNS(null,'y1',newy);

		// это надо сделать после окончания перемещения
		linkline.setAttributeNS(null, 'basex', newx);
		linkline.setAttributeNS(null, 'basey', newy);
						
	} else if (tip =='end')	
	{

		let originX = +linkline.getAttributeNS(null, 'endx');
		let originY = +linkline.getAttributeNS(null, 'endy');
		let deltax = ShapeData.StartShapeX - originX;
		let deltay = ShapeData.StartShapeY - originY;
		let newx = ShapeData.EndShapeX - deltax;
		let newy = ShapeData.EndShapeY - deltay;
	
		line.setAttributeNS(null,'x2',newx);
		line.setAttributeNS(null,'y2',newy);
		linecontur.setAttributeNS(null,'x2',newx);
		linecontur.setAttributeNS(null,'y2',newy);

		// это надо сделать после окончания перемещения
		linkline.setAttributeNS(null, 'endx', newx);
		linkline.setAttributeNS(null, 'endy', newy);
		
	}
}


function ClearLinkTip(figlink, tip)
{
	if (tip=='begin') figtag='figbegin';
	else if (tip=='end') figtag='figend';
	let elmtip = figlink.querySelector(figtag);
	HolstRemoveShape(elmtip);
}

// Создает и добавляет на холст фигуру круг
function ShapeAddCircle(x, y, r)
{

	var shape;
	shape = document.createElementNS(xmlns, 'circle');
	shape.setAttributeNS(null, 'cx', x);
	shape.setAttributeNS(null, 'cy', y);
	shape.setAttributeNS(null, 'r', r);
	shape.setAttributeNS(null, 'fill', 'rgba(255,255,255,1)');
	shape.setAttributeNS(null, 'stroke', 'black');
	shape.setAttributeNS(null, 'stroke-width', '2');

	HolstAppendShape(shape);
}

/**
 * Обрезать строку по ширине
 * @param {string} src - исходная строка
 * @param {number} pStartPos - начальный номер строки, начинается с нуля
 * @param {number} pMaxwidth - максимально допустимая длина в пикселах
 * @param {string} pCuttingType - тип обрезки 'word' - по словам, 'symbol' - по символам
 * 
 * @returns {object} 
 */
function CutOffStringOnWidth(pSrc, pStartPos, pMaxWidth, pCuttingType)
{
	var Res = {};
	Res.StartPos = 0;
	Res.EndPos = 0;
	Res.Length = 0;
	var canvas = document.getElementById("Holst");

	var sx = 50;
	var sy = 50;
	var tempShape = document.createElementNS(xmlns, 'text');
	tempShape.setAttributeNS(null, 'x', sx);
	tempShape.setAttributeNS(null, 'y', sy);
	//tempShape.style.font = "14pt 'Noto Sans', sans-serif";
	//tempShape.style.fillStyle = "#000";
	tempShape.setAttributeNS(null, 'fill', 'rgba(128,128,128,0)');

	HolstAppendShape(tempShape);


	var testString = "";
	var testPos = pStartPos - 1;
	var maxTestPos = pSrc.length - 1;

	// накапливаем длину строки, которая влазит в максимальную длину
	stop = false;
	do
	{
		testPos++;
		var testSymbol = pSrc.substr(testPos);
		tempShape.innerHTML = pSrc.substring(pStartPos, testPos);
		currwidth = tempShape.getBBox().width;
		if (currwidth > pMaxWidth) 
		{
			stop = true;
		}
	} while (stop == false && testPos <= maxTestPos);
	HolstRemoveShape(tempShape);
	// вся строка влезла или нет
	if (stop) 
	{
		// строка должна быть обрезана
		Res.StartPos = pStartPos;
		Res.EndPos = testPos - 1;
		// TODO перенос по словам и знакам препинания

	} else 
	{
		// влезла вся строка
		Res.StartPos = pStartPos;
		Res.EndPos = testPos;
	}
	return Res;
}

// function CutOffStringOnWidthCanvas(pSrc, pStartPos, pMaxWidth, pCuttingType)
// {
// 	var Res = {};
// 	Res.StartPos = 0;
// 	Res.EndPos = 0;
// 	Res.Length = 0;
// 	var canvas = document.getElementById("canvas");
// 	var context = canvas.getContext("2d");

// 	context.font = "14pt 'Noto Sans', sans-serif";
// 	context.fillStyle = "#000";

// 	var testString = "";
// 	var testPos = pStartPos-1;
// 	var maxTestPos = pSrc.length-1;

// 	// накапливаем длину строки, которая влазит в максимальную длину
// 	stop = false;
// 	do
// 	{
// 		testPos++;
// 		var testSymbol = pSrc.substr(testPos);
// 		currwidth = context.measureText(pSrc.substring(pStartPos,testPos)).width;
// 		if (currwidth > pMaxWidth) 
// 		{
// 			stop = true;
// 		}
// 	} while (stop == false && testPos<=maxTestPos);

// 	// вся строка влезла или нет
// 	if (stop) 
// 	{
// 		// строка должна быть обрезана
// 		Res.StartPos = pStartPos;
// 		Res.EndPos = testPos-1;

// 	} else 
// 	{
// 		// влезла вся строка
// 		Res.StartPos = pStartPos;
// 		Res.EndPos = testPos;
// 	}
// 	return Res;
// }

// Создает фигуру прямоугольник
function ShapeAddRectangle(x, y, w, h)
{
	// фигура состоит из группы фигур
	groupshape = document.createElementNS(xmlns, 'g');
	groupshape.id = genId();
	groupshape.setAttributeNS(null, 'isfigure', true);
	groupshape.setAttributeNS(null, 'figuretype', 'rect');
	groupshape.setAttributeNS(null, 'basex', x);
	groupshape.setAttributeNS(null, 'basey', y);
	groupshape.setAttributeNS(null, 'basewidth', w);
	groupshape.setAttributeNS(null, 'baseheight', h);


	// добавляет прямоугольник
	var shape;
	shape = document.createElementNS(xmlns, 'rect');
	shape.setAttributeNS(null, 'x', x);
	shape.setAttributeNS(null, 'y', y);
	shape.setAttributeNS(null, 'width', w);
	shape.setAttributeNS(null, 'height', h);
	shape.setAttributeNS(null, 'fill', 'rgba(255,255,255,1)');
	shape.setAttributeNS(null, 'stroke', 'black');
	shape.setAttributeNS(null, 'stroke-width', '1');
	shape.classList.add('mainrect');

	groupshape.appendChild(shape);

	ShapeRectSetCaption(groupshape, "Объект");


	HolstAppendShape(groupshape);
}

function ShapeRectHideCaption(fig)
{
	var listCaption = fig.querySelectorAll('text');
	for (var i = 0; i < listCaption.length; i++)
	{
		fig.removeChild(listCaption[i]);
	}
}

function ShapeRectSetCaption(fig, caption)
{
	fig.setAttributeNS(null, 'caption', caption);
	ShapeRectHideCaption(fig);

	var CharRect = GetTextHeight();

	var testLine = caption;

	var x = +fig.getAttributeNS(null, 'basex');
	var y = +fig.getAttributeNS(null, 'basey');
	var h = +fig.getAttributeNS(null, 'baseheight');
	var w = +fig.getAttributeNS(null, 'basewidth');

	var LeftBound = 5;
	var RightBound = 5;
	var TopBound = 10;
	var BottomBound = 10;

	var baseY = y + CharRect.AddY + TopBound;
	var currY = baseY;
	var Res = {};
	Res.EndPos = 0;
	var isBreak = false;
	while (!isBreak)
	{
		Res = CutOffStringOnWidth(testLine, Res.EndPos, w - LeftBound - RightBound, 'symbol');
		currtext = testLine.substring(Res.StartPos, Res.EndPos);

		var shapeCaption = document.createElementNS(xmlns, 'text');
		shapeCaption.setAttributeNS(null, 'x', x + LeftBound);
		shapeCaption.setAttributeNS(null, 'y', currY);
		shapeCaption.innerHTML = currtext;
		shapeCaption.classList.add('caption');

		fig.appendChild(shapeCaption);

		currY = currY + CharRect.Leading;
		if (Res.EndPos >= testLine.length) isBreak = true;
	}

}

function ShapeRectGetCaption(fig)
{
	return fig.getAttributeNS(null, 'caption');
}

// /Определить высоту текста через размер прямоугольника SVG
function GetTextHeight() 
{
	tempShape = document.createElementNS(xmlns, 'text');
	tempShape.setAttributeNS(null, 'x', 0);
	tempShape.setAttributeNS(null, 'y', 50);
	tempShape.innerHTML = "Mg";
	HolstAppendShape(tempShape);
	realBound = tempShape.getBBox();

	// границы рассчитываются с учетом межстрочного интервала. Межстрочный интервал по умолчанию, половина высоту строки.
	HolstRemoveShape(tempShape)
	Res = {};
	// Расстояние между строками
	Res.Leading = realBound.height;

	// Сколько нужно добавить к baseline по y, чтобы верхний угол буквы вывелся в указанной координате
	Res.AddY = Math.round(50 - realBound.y - realBound.height / 2) + (realBound.y + realBound.height - 50);

	return Res;
}

function ShapeMoveRectangle(groupshape, x, y)
{
	var originX = +groupshape.getAttributeNS(null, 'basex');
	var originY = +groupshape.getAttributeNS(null, 'basey');
	var deltaX = x - originX;
	var deltaY = y - originY;
	groupshape.setAttributeNS(null, 'basex', originX + deltaX);
	groupshape.setAttributeNS(null, 'basey', originY + deltaY)

	var list = groupshape.querySelectorAll("*");
	for (var i = 0; i < list.length; i++) 
	{
		var tmpShape = list[i];
		if (tmpShape.tagName == 'rect' || tmpShape.tagName == 'text') 
		{
			var newx = +tmpShape.getAttributeNS(null, 'x') + deltaX;
			var newy = +tmpShape.getAttributeNS(null, 'y') + deltaY;

			tmpShape.setAttributeNS(null, 'x', newx);
			tmpShape.setAttributeNS(null, 'y', newy);
		} else
		if (tmpShape.tagName == 'link')
		{
		}

	}

}

// Создает фигуру линия
function ShapeAddLine(x1, y1, x2, y2)
{

	let basex = x1;
	let basey = y1;
	let basewidth = x2-x1;
	let baseheight = y2-y1;
	let groupShape = document.createElementNS(xmlns, 'g');
	groupShape.id= genId();
	
	groupShape.setAttributeNS(null, 'isfigure', true);
	groupShape.setAttributeNS(null, 'basex', basex);
	groupShape.setAttributeNS(null, 'basey', basey);
	groupShape.setAttributeNS(null, 'endx', x2);
	groupShape.setAttributeNS(null, 'endy', y2);
	groupShape.setAttributeNS(null, 'basewidth', basewidth);
	groupShape.setAttributeNS(null, 'baseheight', baseheight);
	groupShape.setAttributeNS(null, 'figuretype', 'line');
	
	if (ShapeData.FigureCursorDown != null) 
	{
		let figbegin = document.createElement('FigBegin');
		figbegin.setAttributeNS(null,'figid',ShapeData.FigureCursorDown.id);
		groupShape.appendChild(figbegin);
		let elmlink = document.createElement('link');
		elmlink.setAttributeNS(null,'figid',groupShape.id);
		elmlink.setAttributeNS(null,'tip','begin');
		ShapeData.FigureCursorDown.appendChild(elmlink);
	}
	
	if (ShapeData.FigureCursorUp != null)
	{
		let figend = document.createElement('FigEnd');
		figend.setAttributeNS(null,'figid',ShapeData.FigureCursorUp.id);
		groupShape.appendChild(figend);
		let elmlink = document.createElement('link');
		elmlink.setAttributeNS(null,'figid',groupShape.id);
		elmlink.setAttributeNS(null,'tip','end');
		ShapeData.FigureCursorUp.appendChild(elmlink);
	}

	//console.log('figdown', ShapeData.FigureCursorDown);
	//console.log('figup', ShapeData.FigureCursorUp);

	let shape;
	shape = document.createElementNS(xmlns, 'line');
	shape.setAttributeNS(null, 'linetype', 'contur');
	shape.setAttributeNS(null, 'x1', x1);
	shape.setAttributeNS(null, 'y1', y1);
	shape.setAttributeNS(null, 'x2', x2);
	shape.setAttributeNS(null, 'y2', y2);
	//shape.setAttributeNS(null, 'stroke', 'rgba(255,255,0,0.2)');
	shape.setAttributeNS(null, 'stroke', 'rgba(255,255,0,0)');
	// 20 пикселей чтобы кликать по линии
	shape.setAttributeNS(null, 'stroke-width', '20');
	groupShape.appendChild(shape);

	shape = document.createElementNS(xmlns, 'line');
	shape.setAttributeNS(null, 'x1', x1);
	shape.setAttributeNS(null, 'y1', y1);
	shape.setAttributeNS(null, 'x2', x2);
	shape.setAttributeNS(null, 'y2', y2);
	shape.setAttributeNS(null, 'stroke', 'black');
	shape.setAttributeNS(null, 'stroke-width', '0.5');
	
	groupShape.appendChild(shape);

	HolstInsertShape(groupShape);
}

// создает фигуру текст
function ShapeAddText(x, y, text)
{

	var shape;
	shape = document.createElementNS(xmlns, 'text');
	shape.setAttributeNS(null, 'x', x);
	shape.setAttributeNS(null, 'y', y);

	shape.appendChild(document.createTextNode(text));

	HolstAppendShape(shape);
}

// Изменение заголовка фигуры
function ShapeRenameCaptionStart(fig)
{
	ShapeRectHideCaption(fig);

	var currCaption = ShapeRectGetCaption(fig);

	var bx = +fig.getAttributeNS(null, 'basex');
	var by = +fig.getAttributeNS(null, 'basey');
	var bw = +fig.getAttributeNS(null, 'basewidth');
	var bh = +fig.getAttributeNS(null, 'baseheight');

	var grpInput = document.createElementNS(xmlns, 'foreignObject');
	grpInput.classList.add('input-field');
	grpInput.setAttributeNS(null, 'x', bx);
	grpInput.setAttributeNS(null, 'y', by);
	grpInput.setAttributeNS(null, 'width', bw);
	grpInput.setAttributeNS(null, 'height', bh);


	elmInputCaption = document.createElement('textarea');
	elmInputCaption.classList.add('input-field');
	elmInputCaption.innerHTML = currCaption;
	grpInput.appendChild(elmInputCaption);

	fig.appendChild(grpInput);
	elmInputCaption.focus();

}

function FigureRemoveGroupInput(fig)
{
	var elem = fig.querySelector("foreignObject.input-field");
	if (elem != null) 
	{
		fig.removeChild(elem);
	}

}

function ShapeRenameCaptionApprove(fig)
{
	var elmInputCaption = fig.querySelector('textarea.input-field');
	if (elmInputCaption != null)
	{
		var newCaption = elmInputCaption.value;
		FigureRemoveGroupInput(fig);
		ShapeRectSetCaption(fig, newCaption);
	}
}

function ShapeRenameCaptionCancel(fig)
{
	FigureRemoveGroupInput(fig);
	ShapeRectSetCaption(fig, ShapeRectGetCaption(fig));
}

function DeselectFigure(figureGroup)
{
	console.log('deselect:',figureGroup);
	if (figureGroup==null || figureGroup==undefined) return;
	let figtype = figureGroup.getAttributeNS(null, 'figuretype');
	if (figtype==null) return;
	switch (figtype)
	{
		case 'rect':
		{
			DeSelectRect(figureGroup)		
			break
		}
		case 'line':
		{
			DeSelectLine(figureGroup)		
			break
		}
	}

}

function SelectFigure(figureGroup)
{
	console.log('select:',figureGroup);
	if (figureGroup==null || figureGroup==undefined) return;
	let figtype = figureGroup.getAttributeNS(null,'figuretype');
	if (figtype==null) return;
	switch (figtype)
	{
		case 'rect':
		{
	 		SelectRect(figureGroup)		
			break
		}
		case 'line':
		{
			 SelectLine(figureGroup);			
			break
		}
	}
}

function SelectRect(figureGroup)
{
	if (figureGroup==null || figureGroup==undefined) return;
	let rect = figureGroup.querySelector('rect');
	rect.setAttributeNS(null, 'stroke', 'red');
	rect.setAttributeNS(null, 'stroke-width', '2');
}

function DeSelectRect(figureGroup)
{
	if (figureGroup==null || figureGroup==undefined) return;
	let rect = figureGroup.querySelector('rect');
	rect.setAttributeNS(null, 'stroke', 'black');
	rect.setAttributeNS(null, 'stroke-width', '1');	
}

function SelectLine(figureGroup)
{
	if (figureGroup==null || figureGroup==undefined) return;
	let line = figureGroup.querySelector('line:not([linetype="contur"])');

	line.setAttributeNS(null, 'stroke', 'red');
	line.setAttributeNS(null, 'stroke-width', '1');
	
}

function DeSelectLine(figureGroup)
{
	if (figureGroup==null || figureGroup==undefined) return;
	let line = figureGroup.querySelector('line:not([linetype="contur"])');

	line.setAttributeNS(null, 'stroke', 'black');
	line.setAttributeNS(null, 'stroke-width', '0.5');
	
}

function DeleteFigure(figureGroup)
{
	if (figureGroup==null || figureGroup==undefined) return;
	let figtype = figureGroup.getAttributeNS(null,'figuretype');
	if (figtype==null) return;
	result = confirm("Удалить выделенную фигуру?");
	if (!result) return;
	switch (figtype)
	{
		case 'rect':
		{
	 		DeleteRect(figureGroup)		
			break
		}
		case 'line':
		{
			 DeleteLine(figureGroup);			
			break
		}
	}
	
}

// Удаляем фигуру и чисти концы связей
function DeleteRect(figureGroup)
{
	if (figureGroup==null) return;
	HolstRemoveShape(figureGroup);
	let list = figureGroup.querySelectorAll("link");
	for(let i=0; i<list.length; i++)
	{
		let link = list[i];
		let linkid = link.getAttributeNS(null,'figid');
		let tip = link.getAttributeNS(null,'tip');
		let figlink = document.getElementById(linkid);
		ClearLinkTip(figlink,tip);
	}
	
}

// Удаляем линии и чистим фигуры на концах от связи
function DeleteLine(figureGroup)
{
	if (figureGroup==null) return;
	let elem = document.getElementById('Holst');
	
	let list = elem.querySelectorAll("link[figid='"+ figureGroup.id+"']")
	
	for(let i=0; i<list.length; i++) HolstRemoveShape(list[i]);
	HolstRemoveShape(figureGroup);

}


// Добавлет фигуру на холст
function HolstAppendShape(shape)
{
	let elem;
	elem = document.getElementById('Holst');
	elem.appendChild(shape);
}

// вставляет фигуру в начало (на задний фон)
function HolstInsertShape(shape)
{
	let elem;
	elem = document.getElementById('Holst');
	if (elem.children.length==0) elem.appendChild(shape);
	else elem.insertBefore(shape, elem.children[0]);
}

//удаляет фигуру с холста
function HolstRemoveShape(shape)
{
	let elem=shape.parentElement;
	elem.removeChild(shape);
}

window.onload = Init;
