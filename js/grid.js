/*jshint esversion: 6 */


/** Слой содержащий сетку 
 
*/
class Grid extends Layer
{
    constructor (id, x, y, width, height, shiftX, shiftY)
	{
        super(id, x, y, width, height, shiftX, shiftY);
        this.StepVertical = 20;
        this.StepHorizontal = 20;
    }
   
    Show()
    {        
        this.SelfElem.innerHTML = "";
        let gridgroup = document.createElementNS(xmlns, "g");
        gridgroup.setAttributeNS(null, 'figuretype', 'grid');
        gridgroup.setAttributeNS(null, 'stroke', 'lightgray');
        gridgroup.setAttributeNS(null, 'stroke-width', '1');
 
        let gridpath = document.createElementNS(xmlns, "path");
        let pathd = "";
        for(let x = this.ShiftX; x<this.Width+this.ShiftX; x+=this.StepHorizontal)
        {
            pathd += "M " + x + " " + this.ShiftY + " L " + x + " " + (this.Height+this.ShiftY) + " ";
        }
        for(let y = this.ShiftY; y<this.Height+this.ShiftY; y+=this.StepVertical)
        {
            pathd += "M " + this.ShiftX + " " + y + " L " + (this.Width+this.ShiftX) + " " + y + " ";
        }

        let gridcircle = document.createElementNS(xmlns, "circle");
        gridcircle.setAttributeNS(null, "cx", this.ShiftX);
        gridcircle.setAttributeNS(null, "cy", this.ShiftY);
        gridcircle.setAttributeNS(null, "r", 4);
        gridcircle.setAttributeNS(null, "fill", 'red');
        gridcircle.setAttributeNS(null, "stroke", 'red');

        let gridcircle2 = document.createElementNS(xmlns, "circle");
        gridcircle2.setAttributeNS(null, "cx", (this.Width+this.ShiftX)*this.Zoom);
        gridcircle2.setAttributeNS(null, "cy", this.ShiftY);
        gridcircle2.setAttributeNS(null, "r", 4);
        gridcircle2.setAttributeNS(null, "fill", 'red');
        gridcircle2.setAttributeNS(null, "stroke", 'red');

        let gridcircle3 = document.createElementNS(xmlns, "circle");
        gridcircle3.setAttributeNS(null, "cx", this.ShiftX);
        gridcircle3.setAttributeNS(null, "cy", this.Height+this.ShiftY);
        gridcircle3.setAttributeNS(null, "r", 4);
        gridcircle3.setAttributeNS(null, "fill", 'red');
        gridcircle3.setAttributeNS(null, "stroke", 'red');

        let gridcircle4 = document.createElementNS(xmlns, "circle");
        gridcircle4.setAttributeNS(null, "cx", this.Width+this.ShiftX);
        gridcircle4.setAttributeNS(null, "cy", this.Height+this.ShiftY);
        gridcircle4.setAttributeNS(null, "r", 4);
        gridcircle4.setAttributeNS(null, "fill", 'red');
        gridcircle4.setAttributeNS(null, "stroke", 'red');

        gridpath.setAttributeNS(null, "d", pathd);
        gridgroup.appendChild(gridpath);
        gridgroup.appendChild(gridcircle);
        gridgroup.appendChild(gridcircle2);
        gridgroup.appendChild(gridcircle3);
        gridgroup.appendChild(gridcircle4);
        this.SelfElem.appendChild(gridgroup);
        super.Show();

    }

    Hide()
    {
        this.SelfElem.innerHTML = "";
        super.Hide();
    }
	
}