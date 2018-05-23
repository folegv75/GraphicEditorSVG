/*jshint esversion: 6 */

class Ruler extends Layer
{
    constructor (id, rulertype, x, y, width, height, shiftX, shiftY)
	{
        super (id, x, y, width, height, shiftX, shiftY);
        this.RulerType = rulertype;
        this.Dimension = 100;
        this.SubDimension = 50;
        this.DetailDimension = 10;
    }

    // SetViewBoxSize(startX, startY, width, height)
    // {
    //     if (this.RulerType == RulerType.Horizontal) 
    //     {
    //         this.StartPosition = startX;
    //         this.EndPosition = startX + width;
    //         //this.Base = startY;
    //         let value = '' + (startX-30) + ' ' + 0 + ' ' + width + ' ' + height;
    //         this.SelfElem.setAttributeNS(null,'viewBox', value);
    //     } else
    //     {
    //         this.StartPosition = startY;
    //         this.EndPosition = startY + height;
    //         //this.Base = startX;
    //         let value = '' + 0 + ' ' + (startY-30) + ' ' + width + ' ' + height;
    //         this.SelfElem.setAttributeNS(null,'viewBox', value);
    //     }
    //     if (this.Visible) this.Show();
        
    // }
    
    ShowHorizontal()
    {
        // Выводим вертикальные полоски основных измерений и названия измерений
        let groupLine = document.createElementNS(xmlns, "g");
        groupLine.setAttributeNS(null,'stroke','black');
        let groupText = document.createElementNS(xmlns, "g");        

        let gridpath = document.createElementNS(xmlns, "path");
        let pathd = "";
        
        for(let x = this.ShiftX; x<this.Width+this.ShiftX; x+=this.Dimension)
        {
            pathd += "M " + x + " " + this.ShiftY + " L " + x + " " + (this.Height+this.ShiftY) + " ";
            let elText = document.createElementNS(xmlns, "text");
            elText.innerHTML = x;
            elText.setAttributeNS(null, "x", x+2);
            elText.setAttributeNS(null, "y", 15+this.ShiftY);
            groupText.appendChild(elText);
        }
        gridpath.setAttributeNS(null, "d", pathd);
        groupLine.appendChild(gridpath);

        // Выводим вертикальные полоски дополнительных  измерений
        // создаем под измерения
        gridpath = document.createElementNS(xmlns, "path");
        pathd = "";
        for(let x = this.ShiftX; x<this.Width+this.ShiftX; x+=this.SubDimension)
        {
            pathd += "M " + x + " " + (this.Height+this.ShiftY) + " L " + x + " " + (this.Height-10+this.ShiftY) + " ";
        }
        gridpath.setAttributeNS(null, "d", pathd);
        groupLine.appendChild(gridpath);
 
        // Выводим вертикальные полоски детальных  измерений
        gridpath = document.createElementNS(xmlns, "path");
        pathd = "";
        for(let x = this.ShiftX; x<this.Width+this.ShiftX; x+=this.DetailDimension)
        {
            pathd += "M " + x + " " +  (this.Height+this.ShiftY) + " L " + x + " " + (this.Height-5+this.ShiftY) + " ";
        }
        gridpath.setAttributeNS(null, "d", pathd);
        groupLine.appendChild(gridpath);

        //this.SelfElem.appendChild(backgroundrect);
        this.SelfElem.appendChild(groupLine);
        this.SelfElem.appendChild(groupText);
    }

    ShowVertical()
    {
        // Основные измерения с выводом значений
        let groupLine = document.createElementNS(xmlns, "g");
        groupLine.setAttributeNS(null,'stroke','black');

        let groupText = document.createElementNS(xmlns, "g");
        this.SelfElem.appendChild(groupText);

        let gridpath = document.createElementNS(xmlns, "path");
        let pathd = "";
        for(let y = this.ShiftY; y<this.Height+this.ShiftY; y+=this.Dimension)
        {
            pathd += "M " + this.ShiftX + " " + y + " L " + (this.Width+this.ShiftX) + " " + y + " ";
            let elText = document.createElementNS(xmlns, "text");
            elText.innerHTML = y;
            let x = 15;
            elText.setAttributeNS(null, "x", x);
            elText.setAttributeNS(null, "y", y);
            groupText.appendChild(elText);
            let boundRect = elText.getBBox();
            let newy = y+boundRect.width+1;
            elText.setAttributeNS(null, "y", newy);
            elText.setAttributeNS(null, "transform", "rotate(270," + x + "," + newy + ")");
            
        }
        gridpath.setAttributeNS(null, "d", pathd);
        groupLine.appendChild(gridpath);

        // создаем под измерения
        gridpath = document.createElementNS(xmlns, "path");
        pathd = "";
        for(let y = this.ShiftY; y<this.Height+this.ShiftY; y+=this.SubDimension)
        {
            pathd += "M " + (this.Width+this.ShiftX) + " " + y + " L " + (this.Width-10+this.ShiftX) + " " + y + " ";
        }
        gridpath.setAttributeNS(null, "d", pathd);
        groupLine.appendChild(gridpath);
 
        // Создаем детальные измерения
        gridpath = document.createElementNS(xmlns, "path");
        pathd = "";
        for(let y = this.ShiftY; y<this.Height+this.ShiftY; y+=this.DetailDimension)
        {
            pathd += "M " + (this.Width+this.ShiftX) + " " + y + " L " + (this.Width-5+this.ShiftX) + " " + y + " ";
        }
        gridpath.setAttributeNS(null, "d", pathd);
        groupLine.appendChild(gridpath);

        this.SelfElem.appendChild(groupLine);
        
    }
    
    Show()
    {        
        this.SelfElem.innerHTML = "";
        if (this.RulerType == RulerType.Horizontal) this.ShowHorizontal();
        else this.ShowVertical();
        super.Show();
    }

	
}