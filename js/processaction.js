/*jshint esversion: 6 */

/** Действия (комнады) выполняемые редактором при переходе их одного состояния в другое*/
class ProcessAction
{
    constructor()
    {

    }

	/** Выделить фигуру. Значит подсветить ее границу цветом выделения. */
	SelectFigure()
	{    
      if (MainApp.EditorState.SelectedFigure!=null) MainApp.EditorState.SelectedFigure.UnSelect();
      MainApp.EditorState.SelectedFigure = TopFigure;
      if (MainApp.EditorState.SelectedFigure!=null) MainApp.EditorState.SelectedFigure.Select();    
	}

	/** Начать перемещение фигуры */
	BeginMoveFigure()
	{
		alert('Не реализовано.TODO');
	}

    /** Продолжить перемещение фигуры */
    ContinueMoveFigure()
    {
		alert('Не реализовано.TODO');
    } 
    
    /** Завершить перемещение фигуры  */
    ApproveMoveFigure()
    {
		alert('Не реализовано.TODO');
    }
    
    /** Отменить завершени фигуры */
    CancelMoveFigure()
    {
		alert('Не реализовано.TODO');
    }
    
    /** Начать переименование фигуры */
    BeginRenameFigure()
    {
		alert('Не реализовано.TODO');
    }
    
    /** Принять переименование фигуры */
    ApproveRenameFigure()
    {
		alert('Не реализовано.TODO');
    }
    
    /** отменить переименование фигуры */
    CancelRenameFigure()
    {
		alert('Не реализовано.TODO');
    }
    
    /** Начать рисование фигуры */
	BeginDrawFigure()
    {
		alert('Не реализовано.TODO');
    }
    
    /** Продолжить рисование фигуры */
    ContinueDrawFigure()
    {
		alert('Не реализовано.TODO');
    }

    /** Принять рисование фигуры */
	ApproveDrawFigure()
    {
		alert('Не реализовано.TODO');
    }

    /** Отменить рисование фигуры */
	CancelDrawFigure()
    {
		alert('Не реализовано.TODO');
    }

    /** Начать рисование коннектор с непривязанным началом  */
    BeginDrawConnectorFree()
    {
		alert('Не реализовано.TODO');
    }
    
    /** Начать рисование коннектор с началом, привязанным к фигуре */
    BeginDrawConnectorTipBegin()
    {
		alert('Не реализовано.TODO');
    }

    /** Продолжить рисование коннектора */
	ContinueDrawConnector()
    {
		alert('Не реализовано.TODO');
    }

    /** Принять рисование коннектора с непривязанным концом */
	ApproveDrawConnectorFree()
    {
		alert('Не реализовано.TODO');
    }
    
    /** Принять рисование коннектора концом, привязанным к фигуре */
	ApproveDrawConnectorTipEnd()
    {
		alert('Не реализовано.TODO');
    }

    /** Отменить рисование коннектора */
	CancelDrawConnector()
    {
		alert('Не реализовано.TODO');
    }
    
}