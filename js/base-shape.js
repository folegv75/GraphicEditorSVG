/*jshint esversion: 6 */

/** Базовые эелменты */

/** Точка */
class BasePoint {
    constructor (left,top)
    {
        this.Left = left;
        this.Top = top;
    }
}

/** Прямоугольник. У него всегда верний левый угол выше и левее правого */
/** Вектор. У него есть начало и конец. Конец может быть как левее и выше начала. */

class BaseVector {
    constructor (beginX, beginY, endX, endY)
    {
        this.xBeginX = beginX;
        this.xBeginY = beginY;
        this.xEndX = endX;
        this.xEndY = endY;
    }
    get BeginX() { return xBeginX; }
    get BeginY() { return xBeginY; }
    get EndX() { return xEndX; }
    get EndY() { return xEndY; }
    
    set BeginX(value) 
    {
        xBeginX = value;
    }
    
    set BeginY(value) 
    {
        xBeginY = value;
    }
    
    set EndX(value) 
    {
        xEndX = value;
    }
    
    set EndY(value) 
    {
       xEndY = value; 
    }
}

class BaseRectangle
{
    constructor (left, top, right, bottom)
    {
        this.xLeft = left;
        this.xTop = top;
        this.xRight = right;
        this.xBottom = bottom;
        /** Если координата зафиксирована, то при установке остальных она не изменяется. 
         * Используется для пересчета размеров относительно углов. Нужно зафиксировать координаты угла чтобы остальные координаты отсчитывались от него. */
        /*this.FixLeft = false;
        this.FixTop = false;
        this.FixRight = false;
        this.FixBottom = false;*/
    }

    get Left() { return xLeft; }
    get Top() { return xTop; }
    get Right() { return xRight; }
    get Bottom() { return xBottom; }

    set Left(value) 
    {
        if (value<=this.xRight) this.xLeft = value;
        else this.xRight = value;
    }
    
    set Top(value) 
    {
        if (value<=this.xBottom) this.xTop = value;
        else this.xBottom = value;
    }
    
    set Right(value) 
    {
        if (value>=this.xLeft) this.xRight = value;
        else this.xLeft = value;
    }
    
    set Bottom(value) 
    {
        if (value>=this.xTop) this.xBottom = value;
        else this.xTop = value;
    }
}

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

    /** Создать контур фигуры. Начало контура совпадает с верхним левым углом текущий фигуры. В этот момент ширина и выcота контура равны нулю.
     */
    CreateContour()
    {}

    /** Переместить нижний правый  угол контура */
    MoveCornerContour(right, bottom)
    {}

    ShowContour()
    {        
    }
}

class BaseFigureContour
{
    constructor()
    {
        qwerty
        определить Id, начальные координаты создать элемент
    }

    Show()
    {
        изменить координаты элемента

    }

}

/** Базовая фигура, представляет прямоугольник */
class BaseFigure extends BaseShape
{
    constructor(id, left, top)
    {
        super(id);
        this.Type = 'figure';
    }    
}

/** Базовый соединитель, представляет линию прямую без стрелок */
class BaseConnector extends BaseShape
{
    constructor(id, left, top)
    {
        super(id);
        this.Type = 'connector';
    }    
}