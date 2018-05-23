/*jshint esversion: 6 */

class Ruler extends Layer
{
    constructor (id, rulertype, x, y, width, height, shiftX, shiftY)
	{
        super (id, x, y, width, height, shiftX, shiftY);
        this.RulerType = rulertype;
        this.Base = 0;
        this.Scale = 1;
        this.Dimension = 100;
        this.SubDimension = 50;
        this.DetailDimension = 10;
    }
  
    ShowHorizontal()
    {
        // выводим фоновый прямоугольник
        let backrect = document.createElementNS(xmlns, "rect");
        backrect.setAttributeNS(null,'fill','black');
        backrect.setAttributeNS(null,'opacity','0.0');
        backrect.setAttributeNS(null, "x", this.zLeft);
        backrect.setAttributeNS(null, "y", this.zTop);
        backrect.setAttributeNS(null, "width", this.zWidth);
        backrect.setAttributeNS(null, "height", this.zHeight);
        this.SelfElem.appendChild(backrect);
        
        
        // Выводим вертикальные полоски основных измерений и названия измерений
        let groupLine = document.createElementNS(xmlns, "g");
        groupLine.setAttributeNS(null,'stroke','black');
        let groupText = document.createElementNS(xmlns, "g");        

        let gridpath = document.createElementNS(xmlns, "path");
        let pathd = "";
        
        for(let x = this.zLeft, value=this.Base; x<this.zRight; x+=this.Dimension*this.Scale, value+=this.Dimension)
        {
            pathd += "M " + x + " " + this.zTop + " L " + x + " " + this.zBottom + " ";
            let elText = document.createElementNS(xmlns, "text");
            elText.innerHTML = value;
            elText.setAttributeNS(null, "x", x+2);
            elText.setAttributeNS(null, "y", 15+this.zTop);
            groupText.appendChild(elText);

        }
        gridpath.setAttributeNS(null, "d", pathd);
        groupLine.appendChild(gridpath);

        // Выводим вертикальные полоски дополнительных  измерений
        // создаем под измерения
         gridpath = document.createElementNS(xmlns, "path");
         pathd = "";
         for(let x = this.zLeft; x<this.zRight; x+=this.SubDimension*this.Scale)
         {
             pathd += "M " + x + " " + this.zBottom + " L " + x + " " + (this.zBottom-10) + " ";
         }
        gridpath.setAttributeNS(null, "d", pathd);
        groupLine.appendChild(gridpath);
 
        // // Выводим вертикальные полоски детальных  измерений
        gridpath = document.createElementNS(xmlns, "path");
        pathd = "";
        for(let x = this.zLeft; x<this.zRight; x+=this.DetailDimension*this.Scale)
        {
             pathd += "M " + x + " " +  this.zBottom + " L " + x + " " + (this.zBottom-5) + " ";
        }
        gridpath.setAttributeNS(null, "d", pathd);
        groupLine.appendChild(gridpath);

        this.SelfElem.appendChild(groupLine);
        this.SelfElem.appendChild(groupText);
    }

    ShowVertical()
    {
        let backrect = document.createElementNS(xmlns, "rect");
        backrect.setAttributeNS(null,'fill','black');
        backrect.setAttributeNS(null,'opacity','0.0');
        backrect.setAttributeNS(null, "x", this.zLeft);
        backrect.setAttributeNS(null, "y", this.zTop);
        backrect.setAttributeNS(null, "width", this.zWidth);
        backrect.setAttributeNS(null, "height", this.zHeight);
        this.SelfElem.appendChild(backrect);

        // Основные измерения с выводом значений
        let groupLine = document.createElementNS(xmlns, "g");
        groupLine.setAttributeNS(null,'stroke','black');

        let groupText = document.createElementNS(xmlns, "g");
        this.SelfElem.appendChild(groupText);

        let gridpath = document.createElementNS(xmlns, "path");
        let pathd = "";
        for(let y = this.zTop, value=this.Base; y<this.zBottom; y+=this.Dimension*this.Scale, value+=this.Dimension)
        {
            pathd += "M " + this.zLeft + " " + y + " L " + this.zRight + " " + y + " ";
            let elText = document.createElementNS(xmlns, "text");
            elText.innerHTML = value;
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
        for(let y = this.zTop; y<this.zBottom; y+=this.SubDimension*this.Scale)
        {
            pathd += "M " + this.zRight + " " + y + " L " + (this.zRight-10) + " " + y + " ";
        }
        gridpath.setAttributeNS(null, "d", pathd);
        groupLine.appendChild(gridpath);
 
        // // Создаем детальные измерения
        gridpath = document.createElementNS(xmlns, "path");
        pathd = "";
        for(let y = this.zTop; y<this.zBottom; y+=this.DetailDimension*this.Scale)
        {
            pathd += "M " + (this.zRight) + " " + y + " L " + (this.zRight-5) + " " + y + " ";
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