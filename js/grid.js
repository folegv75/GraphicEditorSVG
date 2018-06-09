/*jshint esversion: 6 */


/** Слой содержащий сетку 
 
*/
class Grid extends Layer
{
    constructor (id, x, y, width, height, shiftX, shiftY)
	{
        super(id, x, y, width, height, shiftX, shiftY);
        this.StepVertical = 10;
        this.StepHorizontal = 10;
    }
   
    Show()
    {        
        this.SelfElem.innerHTML = "";
        let gridgroup = document.createElementNS(xmlns, "g");
        //gridgroup.setAttributeNS(null, 'figuretype', 'grid');
        gridgroup.setAttributeNS(null, 'stroke', 'lightgray');
        gridgroup.setAttributeNS(null, 'stroke-width', '1');
 
        let gridpath = document.createElementNS(xmlns, "path");
        let pathd = "";

        for(let x = this.zLeft; x<this.zRight; x+=this.StepHorizontal)
        {
            pathd += "M " + x + " " + this.zTop + " L " + x + " " + this.zBottom + " ";
        }

       
        for(let y = this.zTop; y<this.zBottom; y+=this.StepVertical)
        {
            pathd += "M " + this.zLeft + " " + y + " L " + this.zRight + " " + y + " ";
        }

        let gridcircle = document.createElementNS(xmlns, "circle");
        gridcircle.setAttributeNS(null, "cx", this.zLeft);
        gridcircle.setAttributeNS(null, "cy", this.zTop);
        gridcircle.setAttributeNS(null, "r", 4);
        gridcircle.setAttributeNS(null, "fill", 'red');
        gridcircle.setAttributeNS(null, "stroke", 'red');

        let gridcircle2 = document.createElementNS(xmlns, "circle");
        gridcircle2.setAttributeNS(null, "cx", this.zRight);
        gridcircle2.setAttributeNS(null, "cy", this.zTop);
        gridcircle2.setAttributeNS(null, "r", 4);
        gridcircle2.setAttributeNS(null, "fill", 'red');
        gridcircle2.setAttributeNS(null, "stroke", 'red');

        let gridcircle3 = document.createElementNS(xmlns, "circle");
        gridcircle3.setAttributeNS(null, "cx", this.zLeft);
        gridcircle3.setAttributeNS(null, "cy", this.zBottom);
        gridcircle3.setAttributeNS(null, "r", 4);
        gridcircle3.setAttributeNS(null, "fill", 'red');
        gridcircle3.setAttributeNS(null, "stroke", 'red');

        let gridcircle4 = document.createElementNS(xmlns, "circle");
        gridcircle4.setAttributeNS(null, "cx", this.zRight);
        gridcircle4.setAttributeNS(null, "cy", this.zBottom);
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