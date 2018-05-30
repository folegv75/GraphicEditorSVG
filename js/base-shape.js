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

    get Left() { return this.xLeft; }
    get Top() { return this.xTop; }
    get Right() { return this.xRight; }
    get Bottom() { return this.xBottom; }
    get Width() { return this.xRight-this.xLeft; }
    get Height() {return this.xBottom-this.xTop; }

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

    /** Ширина и высота всегда устанавилвается от левого верхнего угла */
    set Width(value)
    {
        this.xRight = this.xLeft + value;
    }

    set Height(value)
    {
        this.xBottom = this.xTop + value;
    }
}

/** Общий родитель для всех элементов (shape) отображаемых на холсте*/
class BaseShape
{
    /** Создание фигуры 
     * @param {string} id -eникальный идентификатор фигуры
     * @param {number} left - x координата верхнего левого угла
     * @param {number} top - e координата верхнего левого угла
    */

    constructor(id, left, top)
    {
        this.Id = id;
        this.Type = null;
        this.Left = left;
        this.Top = top;
        this.Width = 0;
        this.Height = 0;
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

class BaseFigureContour
{
    constructor()
    {
        this.Id = Util.GenerateId();
        this.SelfItem = document.createElement("g");
        this.SelfItem.id = this.Id;
        this.Coord = new BaseRectangle(0,0,0,0);
        this.xVisible = false;
        this.svgrect = null;
    }


    Show()
    {
        if (!this.xVisible)
        this.svgrect = document.createElement("rect");
        this.svgrect.setAttributeNS(null, 'x', this.Coord.Left);
        this.svgrect.setAttributeNS(null, 'y', this.Coord.Top);
        this.svgrect.setAttributeNS(null, 'width', this.Coord.Width);
        this.svgrect.setAttributeNS(null, 'height', this.Coord.Height);
        this.svgrect.setAttributeNS(null, 'stroke', 'red');
        if (!this.xVisible)  this.SelfItem.appendChild(this.svgrect);
        this.xVisible = true;
    }

    Hide() 
    {
        this.xVisible = false;
        this.svgrect = null;
        this.SelfItem.innerHTML = "";
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

    /** Создать контур фигуры. Начало контура совпадает с верхним левым углом текущий фигуры. 
     * В этот момент ширина и выcота контура равны ширине фигуры
     */
    CreateContour()
    {
        this.Contour = new BaseFigureContour();
        this.Contour.Coord.Left = this.Left;
        this.Contour.Coord.Top = this.Top;
        this.Contour.Coord.Width = this.Width;
        this.Contour.Coord.Height = this.Height;
        this.Contour.Show();
    }

    /** Переместить нижний правый угол контура */
    MoveCornerContour(right, bottom)
    {
        this.Contour.Coord.Right = right;
        this.Contour.Coord.bottom = left;
        this.Contour.Show();
    }

    ShowContour(layer)
    {
        this.ContourLayer = layer;
        this.ContourLayer.SelfElem.appendChild(this.Contour.SelfElem);
        this.Contour.Show();
    }

    HideContour()
    {        
        this.Contour.Hide();
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