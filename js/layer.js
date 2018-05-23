/*jshint esversion: 6 */

/*  Layer предназначен для создания окна в котором рисуются фигуры, Cлой не обрезает фигуры.
    Слой позволяет начать координатную систему с нуля, при этом начало нуля имеет свои координаты внутри слоя
*/
class Layer extends BaseControl
{
    /** Создает слой по Id 
     * @param {string} id - идентификатор элемента html
     * @param {number} x - позиция по X
     * @param {number} y - позиция по Y
     * @param {number} width - ширина слоя
     * @param {number} height - высота слоя
     * @param {number} shiftX - сдвиг оси координат по X
     * @param {number} shiftY - сдвиг оси координат по Y
    */
    constructor (id, x, y, width, height, shiftX, shiftY)
    {
        super(id);
        this.xX = x;
        this.xY = y;
        this.xWidth = width;
        this.xHeight = height;
        this.xShiftX = shiftX;
        this.xShiftY = shiftY;
        this.xZoom = 1;
        this.xVisible = false;
        this.SetViewBoxSize();
    }

    set Width(value) {
        this.xWidth = value;
        this.SetViewBoxSize();
    }

    get Width()  { return this.xWidth; }

    set Height(value) {
        this.xHeight = value;
        this.SetViewBoxSize();
    }

    get Height()  { return this.xHeight; }

    set X(value) {
        this.xX = value;
        this.SetViewBoxSize();
    }

    get X() { return this.xX;}

    set Y(value) {
        this.xY = value;
        this.SetViewBoxSize();
    }

    get Y() { return this.xY; }

    set ShiftX(value) {
        this.xShiftX = value;
        this.SetViewBoxSize();
    }

    get ShiftX() { return this.xShiftX;}

    set ShiftY(value) {
        this.xShiftY = value;
        this.SetViewBoxSize();
    }

    get ShiftY() { return this.xShiftY;}
    
    set Zoom(value) {
        this.xZoom = value;
        this.SetViewBoxSize();
    }

    get Zoom() { return this.xZoom;}
    
    get Visible() { return this.xVisible; }

    set Visible(value) {
        this.xVisible = value;
        if (this.xVisible) this.Show();
        else this.Hide();
    }

    /** Устанавливаем размеры и позицию слоя для элемента SVG */
    SetViewBoxSize()
    {
        this.SelfElem.setAttributeNS(null, 'x', this.X);
        this.SelfElem.setAttributeNS(null, 'y', this.Y);
        this.SelfElem.setAttributeNS(null, 'width', this.Width);
        this.SelfElem.setAttributeNS(null, 'height', this.Height);
        this.SelfElem.setAttributeNS(null, 'viewBox', '' + (this.ShiftX*this.xZoom) + ' ' + (this.ShiftY*this.xZoom) + ' ' + (this.Width*this.xZoom) + ' ' + (this.Height*this.xZoom));
        if (this.xVisible) this.Show();
    }
    
    Show() 
    {
        this.xVisible = true;
    }

    Hide()
    {
        this.xVisible = false;
    }

} 
