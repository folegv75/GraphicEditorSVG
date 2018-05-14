/*jshint esversion: 6 */

/**
 * @class Holst
 */
class Holst extends BaseControl
{
	constructor(id)
	{
		super(id);

		this.Paper = document.getElementById(Const.PaperId);
	}

	MouseDown(x, y, sourceEvent)
	{
        let editorEvent = new EditorEvent(EditorEventType.PenDown);
        editorEvent.SourceEvent = sourceEvent;
        
        /* TODO нужно пересчитать координаты 
            x - координата X от нуля холста
            y - координата Y от нуля холста
			масштабировнаие нужно учитывать
			сдвиг бумаги на холсте надо учитывать
            сдвиг линейки надо учитывать. она сдвигается синхронно с бумагойт
        */

	   this.ProcessEvent(editorEvent);
		
	}

	MouseUp(x, y, sourceEvent)
	{
        let editorEvent = new EditorEvent(EditorEventType.PenUp);
        editorEvent.SourceEvent = sourceEvent;

	   this.ProcessEvent(editorEvent);
		
	}
	MouseMove(x, y, sourceEvent)
	{
        let editorEvent = new EditorEvent(EditorEventType.PenMove);
        editorEvent.SourceEvent = sourceEvent;

	   this.ProcessEvent(editorEvent);
		
	}


	/** @desc обработать событие редактора
	 * 	@param {EditorEventType} editorEvent
	 */
	ProcessEvent(editorEvent)
	{

	}

	/** @desc утановить размеры холста */
	SetViewBoxSize(left, top, width, height)
	{
		let value = '' + (left-30) + ' ' + (top-30) + ' ' + width + ' ' + height;
		this.Paper.setAttributeNS(null,'viewBox', value);
	}
	
}