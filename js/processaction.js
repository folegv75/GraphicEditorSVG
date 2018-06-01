/*jshint esversion: 6 */

/** Действия (комнады) выполняемые редактором при переходе их одного состояния в другое*/
class ProcessAction
{
    constructor(holst)
    {
      this.Holst = holst;
    }

	/** Выделить фигуру. Значит подсветить ее границу цветом выделения. */
	SelectFigure(editorEvent)
	{    
      if (MainApp.EditorState.SelectedFigure!=null) MainApp.EditorState.SelectedFigure.UnSelect();
      MainApp.EditorState.SelectedFigure = TopFigure;
      if (MainApp.EditorState.SelectedFigure!=null) MainApp.EditorState.SelectedFigure.Select();    
	}

	/** Начать перемещение фигуры */
	BeginMoveFigure(editorEvent)
	{
		alert('Не реализовано.TODO');
	}

  /** Продолжить перемещение фигуры */
   ContinueMoveFigure(editorEvent)
   {
		alert('Не реализовано.TODO');
    } 
    
    /** Завершить перемещение фигуры  */
    ApproveMoveFigure(editorEvent)
    {
		alert('Не реализовано.TODO');
    }
    
    /** Отменить завершени фигуры */
    CancelMoveFigure(editorEvent)
    {
		alert('Не реализовано.TODO');
    }
    
    /** Начать переименование фигуры */
    BeginRenameFigure(editorEvent)
    {
		alert('Не реализовано.TODO');
    }
    
    /** Принять переименование фигуры */
    ApproveRenameFigure(editorEvent)
    {
		alert('Не реализовано.TODO');
    }
    
    /** отменить переименование фигуры */
    CancelRenameFigure(editorEvent)
    {
		alert('Не реализовано.TODO');
    }
    
   /** Начать рисование фигуры */
	 BeginDrawFigure(editorEvent)
   {
      if (editorEvent.TopFigure==null && editorEvent.Layer==this.Holst.Paper) 
      {
        // создаем новую фигуру. Тип фигуры, начальная позиция (x, y) с учетом привязки к сетке
        // TODO определение типа фигуры, который нужно нарисовать
        MainApp.EditorState.ActionFigure = new BaseFigure(Util.GenerateId, editorEvent.X, editorEvent.Y);
        MainApp.EditorState.ActionFigure.CreateContour();
        MainApp.EditorState.ActionFigure.ShowContour(this.Holst.Paper.LayerCountour);

        MainApp.EditorState.Action = EditorAction.DrawFigure;
      }
  }
    
    /** Продолжить рисование фигуры */
    ContinueDrawFigure(editorEvent)
    {
      MainApp.EditorState.ActionFigure.MoveCornerContour(editorEvent.X, editorEvent.Y);
    }

    /** Принять рисование фигуры */
	  ApproveDrawFigure(editorEvent)
    {
    MainApp.EditorState.ActionFigure.ApproveContour();
    MainApp.EditorState.ActionFigure.Show();
    MainApp.EditorState.ActionFigure.DeleteContour();
    // добавляем фигуру на холст
    this.Holst.Paper.LayerFigure.SelfElem.appendChild(MainApp.EditorState.ActionFigure.SelfElem);    

    MainApp.EditorState.ActionFigure = null;
    MainApp.EditorState.Action = EditorAction.None;
  }

    /** Отменить рисование фигуры */
	  CancelDrawFigure(editorEvent)
    {
      MainApp.EditorState.Action = EditorAction.None;
      MainApp.EditorState.ActionFigure.DeleteContour();
      MainApp.EditorState.ActionFigure = null;
    }

    /** Начать рисование коннектор с непривязанным началом  */
    BeginDrawConnectorFree(editorEvent)
    {
		alert('Не реализовано.TODO');
    }
    
    /** Начать рисование коннектор с началом, привязанным к фигуре */
    BeginDrawConnectorTipBegin(editorEvent)
    {
		alert('Не реализовано.TODO');
    }

    /** Продолжить рисование коннектора */
	ContinueDrawConnector(editorEvent)
    {
		alert('Не реализовано.TODO');
    }

    /** Принять рисование коннектора с непривязанным концом */
	ApproveDrawConnectorFree(editorEvent)
    {
		alert('Не реализовано.TODO');
    }
    
    /** Принять рисование коннектора концом, привязанным к фигуре */
	ApproveDrawConnectorTipEnd(editorEvent)
    {
		alert('Не реализовано.TODO');
    }

    /** Отменить рисование коннектора */
	CancelDrawConnector(editorEvent)
    {
		alert('Не реализовано.TODO');
    }
    
}