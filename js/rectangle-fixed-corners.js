/*jshint esversion: 6 */
/** Прямоугольник c фиксированным углом. У него всегда верний левый угол выше и левее правого */
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
