/*jshint esversion: 6 */

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
