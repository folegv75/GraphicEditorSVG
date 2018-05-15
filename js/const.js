/*jshint esversion: 6 */

var xmlns = "http://www.w3.org/2000/svg";

// Инициализация констант
var Const = {};
Const.HolstContainerId = 'holst-container';
Const.HolstId = 'Holst';
Const.PaperId = 'HolstPaper';

Const.GridId = 'LayerGrid';
Const.LayerLines = 'LayerLines';
Const.LayerFigures = 'LayerFigures';
Const.RulerHorizontal = 'ruler-h';
Const.RulerVertical = 'ruler-v';

Const.AddDebugInfoId = 'lblbDebugInfo';
Const.LabelTouchInfo = 'lblTouchInfo';
Const.LabelMouseInfo = 'lblMouseInfo';
Const.LabelStatusInfo = 'lblStatusInfo';


Const.BtnSelectId = 'btnSelect';
Const.BtnRectangleId = 'btnRectangle';
Const.BtnLineId = 'btnLine';
Const.BtnSaveFileId = 'btnSaveFile';
Const.BtnLoadFileId = 'btnLoadFile';

Const.BtnViewMoveLeftId = 'btnViewMoveLeft';
Const.BtnViewMoveRightId = 'btnViewMoveRight';
Const.BtnViewMoveUpId = 'btnViewMoveUp';
Const.BtnViewMoveDownId = 'btnViewMoveDown';
Const.BtnViewZoomInId = 'btnViewZoomIn';
Const.BtnViewZoomNoneId = 'btnViewZoomNone';
Const.BtnViewZoomOutId = 'btnViewZoomOut';

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

