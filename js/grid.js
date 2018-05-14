/*jshint esversion: 6 */

class Grid extends BaseControl
{
	constructor (id, startX, startY, width, height)
	{
        super(id);
        this.StepVertical = 20;
        this.StepHorizontal = 20;
        this.StartX = startX;
        this.StartY = startY;
        this.EndX = startX + width;
        this.EndY = startY + height;
        this.Visible = false;
        this.Show();
    }

    SetViewBoxSize(startX, startY, width, height)
    {
        this.StartX = startX;
        this.StartY = startY;
        this.EndX = startX + width;
        this.EndY = startY + height;
        if (this.Visible) this.Show();
    }
    
    Show()
    {        
        this.SelfElem.innerHTML = "";
        let gridpath = document.createElementNS(xmlns, "path");
        let pathd = "";
        for(let x = this.StartX; x<this.EndX; x+=this.StepHorizontal)
        {
            pathd += "M " + x + " " + this.StartY + " L " + x + " " + this.EndY + " ";
        }
        for(let y = this.StartY; y<this.EndY; y+=this.StepVertical)
        {
            pathd += "M " + this.StartX + " " + y + " L " + this.EndX + " " + y + " ";
        }
        
        gridpath.setAttributeNS(null, "d", pathd);
        this.SelfElem.appendChild(gridpath);
        this.Visible = true;
    }

    Hide()
    {
        this.SelfElem.innerHTML = "";
        this.Visible = false;
    }
	
}