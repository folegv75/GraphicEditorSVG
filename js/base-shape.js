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

class RectangleFixedCorners
{
    /** Прямоугольник с фиксированным углом. */
    constructor (left, top, width, height, fixLeft, fixTop, fixRight, fixBottom)
    {
        /** сохранили стартовые координаты */
        this.xLeftStart = left;
        this.xTopStart = top;
        this.xRightStart = left + width;
        this.xBottomStart = top + height;
        /** Координаты после изменения размерво. Изначально равны стартовым */
        this.xLeft = this.xLeftStart;
        this.xTop = this.xTopStart;
        this.xRight = this.xRightStart;
        this.xBottom = this.xBottomStart;
        /** Если координата зафиксирована, то при установке остальных она не изменяется. 
         * Используется для пересчета размеров относительно углов. Нужно зафиксировать координаты угла чтобы остальные координаты отсчитывались от него. */
        this.FixLeft = fixLeft;
        this.FixTop = fixTop;
        this.FixRight = fixRight;
        this.FixBottom = fixBottom;
        this.SwapLR = false;
        this.SwapTB = false;
    }

    get Left() { return this.xLeft; }
    get Top() { return this.xTop; }
    get Right() { return this.xRight; }
    get Bottom() { return this.xBottom; }
    get Width() { return this.xRight-this.xLeft; }
    get Height() {return this.xBottom-this.xTop; }

    set Left(value) 
    {
        if (this.FixLeft) return;
        //if (value<=this.xRight) this.xLeft = value;
        //else this.xRight = value;
    }
    
    set Top(value) 
    {
        if (this.FixTop) return;
        //if (value<=this.xBottom) this.xTop = value;
        //else this.xBottom = value;
    }
    
    set Right(value) 
    {
        if (this.FixRight) return;
        /** Считаем, что левый угол зафиксирован */
        if (value>=this.xLeftStart)
        {
            this.xRight = value;
            this.xLeft = this.xLeftStart;
        } 
        else 
        {
            this.xRight = this.xLeftStart;
            this.xLeft = value;
        }
    }
    
    set Bottom(value) 
    {
        if (this.FixBottom) return;
        /** Считаем что верх зафиксирован */
        if (value>=this.xTopStart) 
        {
            this.xBottom = value;
            this.xTop = this.xTopStart;
        }
        else 
        {
            this.xBottom = this.xTopStart;
            this.xTop = value;
        }
    }

}

/** Общий родитель для всех элементов (shape) отображаемых на холсте*/
class BaseShape
{
    /** Создание фигуры 
     * @param {string} id - уникальный идентификатор фигуры
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
        this.xVivsible = false;
    }

    get Visible() { return this.xVisible;}
    set Visible(value) 
    {
        if(value) this.Show();
        else this.Hide();
    }

    Show()
    {
        this.xVisible = true;
    }

    Hide()
    {
        this.xVisible = false;
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
    constructor(left, top, width, height, fixLeft, fixTop, fixRight, fixBottom)
    {
        this.Id = Util.GenerateId();
        this.SelfElem = document.createElementNS(xmlns,"g");
        this.SelfElem.id = this.Id;
        this.xVisible = false;
        this.FixedCorners = new RectangleFixedCorners(left, top, width, height, fixLeft, fixTop, fixRight, fixBottom);
        this.svgrect = null;
        // созданы или все элементы фигуры
        // Если они созадны, то при отображении меняются только атрибуты
        // инач создаются
        this.subSvgCreated = false;
    }


    Show()
    {
        if (!this.subSvgCreated)  this.svgrect = document.createElementNS(xmlns,"rect");
        this.svgrect.setAttributeNS(null, 'x', this.FixedCorners.Left);
        this.svgrect.setAttributeNS(null, 'y', this.FixedCorners.Top);
        this.svgrect.setAttributeNS(null, 'width', this.FixedCorners.Width);
        this.svgrect.setAttributeNS(null, 'height', this.FixedCorners.Height);
        this.svgrect.setAttributeNS(null, 'stroke', 'red');
        this.svgrect.setAttributeNS(null, 'fill', 'none');
        if (!this.subSvgCreated)  this.SelfElem.appendChild(this.svgrect);
        this.subSvgCreated = true;
    }

    Hide() 
    {
        this.svgrect = null;
        this.SelfElem.innerHTML = "";
        this.subSvgCreated = false;
    }

}

/** Базовая фигура, представляет прямоугольник */
class BaseFigure extends BaseShape
{
    constructor(id, left, top)
    {
        super(id, left, top);
        this.Id = Util.GenerateId();
        this.SelfElem = document.createElementNS(xmlns,"g");
        this.SelfElem.id = this.Id;        
        this.Type = 'figure';
        this.SelfElem.setAttribute('figuretype',this.Type);
        this.Contour = null;
        this.subSvgCreated = null;
        this.svgrect = null;
    }    


    Show()
    {
        if (!this.subSvgCreated)  this.svgrect = document.createElementNS(xmlns,"rect");
        this.svgrect.setAttributeNS(null, 'x', this.Left);
        this.svgrect.setAttributeNS(null, 'y', this.Top);
        this.svgrect.setAttributeNS(null, 'width', this.Width);
        this.svgrect.setAttributeNS(null, 'height', this.Height);
        this.svgrect.setAttributeNS(null, 'stroke', 'black');
        this.svgrect.setAttributeNS(null, 'fill', 'white');
        if (!this.subSvgCreated)  this.SelfElem.appendChild(this.svgrect);
        this.subSvgCreated = true;
        super.Show();
    }

    Hide() 
    {
        this.svgrect = null;
        this.SelfElem.innerHTML = "";
        this.subSvgCreated = false;
        super.Hide();
    }    

    /** Создать контур фигуры. Начало контура совпадает с верхним левым углом текущий фигуры. 
     * В этот момент ширина и выcота контура равны ширине фигуры
     */
    CreateContour()
    {
        this.Contour = new BaseFigureContour(this.Left, this.Top, this.Width, this.Height, true, true, false, false);
        this.Contour.Show();
    }

    /** Установить размеры фигуры в соотвествии с контуром */
    ApproveContour()
    {
        if (this.Contour!=null) 
        {
            this.Left = this.Contour.FixedCorners.Left;
            this.Top = this.Contour.FixedCorners.Top;
            this.Width = this.Contour.FixedCorners.Width;
            this.Height = this.Contour.FixedCorners.Height;                
        }
    }

    /** Удалить контур, фигуры не изменяется */
    DeleteContour()
    {
        this.ContourLayer.SelfElem.removeChild(this.Contour.SelfElem);
        this.Contour.Hide();
        this.Contour = null;
    }

    /** Переместить нижний правый угол контура */
    MoveCornerContour(right, bottom)
    {
        this.Contour.FixedCorners.Right = right;
        this.Contour.FixedCorners.Bottom = bottom;
        this.Contour.Show();
    }

    /** Показать текущий контур */
    ShowContour(layer)
    {
        this.ContourLayer = layer;
        this.ContourLayer.SelfElem.appendChild(this.Contour.SelfElem);
        this.Contour.Show();
    }

    /** Спрятать текущий контур */
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