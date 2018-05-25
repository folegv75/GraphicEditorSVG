/*jshint esversion: 6 */

/** Общий родитель для всех  элементов (shape) отображаемых на холсте*/
class BaseShape
{
    constructor(id)
    {
        this.Id = id;
        this.Type = null;
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