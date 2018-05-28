/*jshint esversion: 6 */

/** Общий родитель для всех элементов (shape) отображаемых на холсте*/
class BaseShape
{
    /** Создание фигуры 
     * @param {string} id -eникальный идентификатор фигуры
     * @param {umber} left - x координата верхнего левого угла
     * @param {umber} top - e координата верхнего левого угла
    */

    constructor(id, left, top)
    {
        this.Id = id;
        this.Type = null;
        this.Left = left;
        this.Top = top;
        this.Width = 1;
        this.Height = 1;
    }

    /** Показать выделение фигуры */
    Select()
    {

    }

    /** Снять выделение фигуры */
    UnSelect()
    {

    }
}

/** Базовая фигура, представляет прямоугольник */
class BaseFigure extends BaseShape
{
    constructor(id)
    {
        super(id);
        this.Type = 'figure';
    }    
}

/** Базовый соединитель, представляет линию прямую без стрелок */
class BaseConnector extends BaseShape
{
    constructor(id)
    {
        super(id);
        this.Type = 'connector';
    }    
}