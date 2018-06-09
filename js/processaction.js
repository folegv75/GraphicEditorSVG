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
      MainApp.EditorState.SelectedFigure = editorEvent.TopFigure;
      if (MainApp.EditorState.SelectedFigure!=null) MainApp.EditorState.SelectedFigure.Select();    
	}

	/** Начать перемещение фигуры */
	BeginMoveFigure(editorEvent)
	{
    MainApp.EditorState.Action = EditorAction.MoveFigure;
    MainApp.EditorState.ActionFigure = editorEvent.TopFigure;
    // сохраним координаты фигуры
    MainApp.EditorState.SaveLeft =   MainApp.EditorState.ActionFigure.Left;
    MainApp.EditorState.SaveTop =   MainApp.EditorState.ActionFigure.Top;
    MainApp.EditorState.DeltaLeft = editorEvent.X - MainApp.EditorState.ActionFigure.Left;
    MainApp.EditorState.DeltaTop = editorEvent.Y - MainApp.EditorState.ActionFigure.Top;

    MainApp.EditorState.ActionFigure.Move(editorEvent.X - MainApp.EditorState.DeltaLeft, editorEvent.Y - MainApp.EditorState.DeltaTop);
	}

  /** Продолжить перемещение фигуры */
   ContinueMoveFigure(editorEvent)
   {
    MainApp.EditorState.ActionFigure.Move(editorEvent.X - MainApp.EditorState.DeltaLeft, editorEvent.Y - MainApp.EditorState.DeltaTop);
  } 
    
    /** Завершить перемещение фигуры  */
    ApproveMoveFigure(editorEvent)
    {
      MainApp.EditorState.ActionFigure.Move(editorEvent.X - MainApp.EditorState.DeltaLeft, editorEvent.Y - MainApp.EditorState.DeltaTop);
      MainApp.EditorState.Action = EditorAction.None;
      MainApp.EditorState.ActionFigure = null;
    }
    
    /** Отменить завершени фигуры */
    CancelMoveFigure(editorEvent)
    {
      MainApp.EditorState.ActionFigure.Move(MainApp.EditorState.SaveLeft, MainApp.EditorState.SaveTop);
      MainApp.EditorState.Action = EditorAction.None;
    MainApp.EditorState.ActionFigure = null;
  }
    
    /** Начать переименование фигуры */
    BeginRenameFigure(editorEvent)
    {
      if (MainApp.EditorState.SelectedFigure==null) return;
      MainApp.EditorState.Action = EditorAction.RenameFigure;
      MainApp.EditorState.SelectedFigure.BeginEditCaption();
		
    }
    
    /** Принять переименование фигуры */
    ApproveRenameFigure(editorEvent)
    {
      MainApp.EditorState.SelectedFigure.ApproveEditCaption();
      MainApp.EditorState.Action = EditorAction.None;
    }
    
    /** отменить переименование фигуры */
    CancelRenameFigure(editorEvent)
    {
      MainApp.EditorState.SelectedFigure.CancelEditCaption();
      MainApp.EditorState.Action = EditorAction.None;
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
      // слишком маленькие фигуры не создаем
      if (MainApp.EditorState.ActionFigure.Width<5 || MainApp.EditorState.ActionFigure.Height<5)
      {
        this.CancelDrawFigure(editorEvent);
        return;
      }
    MainApp.EditorState.ActionFigure.Show();
    MainApp.EditorState.ActionFigure.DeleteContour();
    // добавляем фигуру на холст
    this.Holst.Paper.LayerFigure.SelfElem.appendChild(MainApp.EditorState.ActionFigure.SelfElem);    
    // Добавляем фигуру в список фигур
    this.Holst.ShapeList[MainApp.EditorState.ActionFigure.Id] = MainApp.EditorState.ActionFigure;

    MainApp.EditorState.Action = EditorAction.None;
    MainApp.EditorState.ActionFigure = null;
  }

    /** Отменить рисование фигуры */
	  CancelDrawFigure(editorEvent)
    {
      MainApp.EditorState.ActionFigure.DeleteContour();
      MainApp.EditorState.ActionFigure = null;
      MainApp.EditorState.Action = EditorAction.None;
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