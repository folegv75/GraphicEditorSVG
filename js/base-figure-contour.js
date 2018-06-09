/*jshint esversion: 6 */

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
        // Если они созданы, то при отображении меняются только атрибуты
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
