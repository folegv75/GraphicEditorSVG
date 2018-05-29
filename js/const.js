/*jshint esversion: 6 */

var xmlns = "http://www.w3.org/2000/svg";

// Инициализация констант
var Const = {};
Const.MainApplicationId = 'Main-Application';
Const.MainWindowId = 'mainwindow';
Const.MainMenuId = 'mainmenu';

Const.HolstId = 'Holst';
Const.PaperId = 'HolstPaper';
Const.PaperBackgroundId = 'PaperBackground';

Const.GridId = 'LayerGrid';
Const.RulerHorizontalId = 'ruler-h';
Const.RulerVerticalId = 'ruler-v';

Const.LayerLineId = 'LayerLine';
Const.LayerFigureId = 'LayerFigure';
Const.LayerContourId = 'LayerContour';

Const.AddDebugInfoId = 'lblbDebugInfo';
Const.LabelTouchInfo = 'lblTouchInfo';
Const.LabelMouseInfo = 'lblMouseInfo';
Const.LabelStatusInfo = 'lblStatusInfo';

Const.PanelModeId= 'panel-mode';
Const.BtnSelectId = 'btnSelect';
Const.BtnRectangleId = 'btnRectangle';
Const.BtnLineId = 'btnLine';
Const.ClassCurrentButton = 'currentbtn';

Const.BtnSaveFileId = 'btnSaveFile';
Const.BtnLoadFileId = 'btnLoadFile';

Const.BtnViewMoveLeftId = 'btnViewMoveLeft';
Const.BtnViewMoveRightId = 'btnViewMoveRight';
Const.BtnViewMoveUpId = 'btnViewMoveUp';
Const.BtnViewMoveDownId = 'btnViewMoveDown';
Const.BtnViewZoomInId = 'btnViewZoomIn';
Const.BtnViewZoomNoneId = 'btnViewZoomNone';
Const.BtnViewZoomOutId = 'btnViewZoomOut';


/* определения типов */
/** 
    desc Тип направления линейки
*/
var RulerType = {};
/** @desc Горизонтальная линейка */
RulerType.Horizontal = 'horizontal';
/** @desc Вертикальная линейка */
RulerType.Vertical = 'vertical';



/** typedef {EditorEventType}
    @property {string} PenDown Перо опущено
*/
var EditorEventType = {};
EditorEventType.PenDown = 'pendown';
EditorEventType.PenUp = 'penup';
EditorEventType.PenMove = 'penmove';

/** Режим редактора */
var EditorMode = {};
EditorMode.Select = 'select';
EditorMode.Figure = 'figure';
EditorMode.Connector = 'connector';

/** Состояние действия */
var EditorAction = {};
EditorAction.None = 'None';
EditorAction.MoveFigure = 'MoveFigure';
EditorAction.DrawFigure = 'DrawFigure';
EditorAction.DrawConnector = 'DrawConnector';
EditorAction.RenameFigure = 'RenameFigure';