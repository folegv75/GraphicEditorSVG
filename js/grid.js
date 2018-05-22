/*jshint esversion: 6 */

class Layer extends BaseControl
{
    constructor (id, startX, startY, width, height)
    {
        super(id);
    }

} 

class Grid extends Layer
{
	constructor (id, startX, startY, width, height)
	{
        super(id, startX, startY, width, height);
        this.StepVertical = 20;
        this.StepHorizontal = 20;
        this.StartX = 0;
        this.StartY = 0;
        this.EndX = width;
        this.EndY = height;
        this.Width = width;
        this.Height = height;
        this.Visible = false;
        this.SetPos(startX, startY);
        this.Show();
    }

    // устанавливает начальную позицию слоя
    SetPos(x,y) 
    {
        this.SelfElem.setAttributeNS(null, 'viewBox', '-' + x + ' -' + y + ' ' + this.Width + ' ' + this.Height);
    }

    SetViewBoxSize(startX, startY, width, height)
    {
        //this.StartX = startX;
        //this.StartY = startY;
        this.EndX = width;
        this.EndY = height;
        this.Width = width;
        this.Height =  height;
        this.SetPos(30,30);
        if (this.Visible) this.Show();
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
        for(let x = this.StartX; x<this.EndX; x+=this.StepHorizontal)
        {
            pathd += "M " + x + " " + this.StartY + " L " + x + " " + this.EndY + " ";
        }
        for(let y = this.StartY; y<this.EndY; y+=this.StepVertical)
        {
            pathd += "M " + this.StartX + " " + y + " L " + this.EndX + " " + y + " ";
        }
        
        gridpath.setAttributeNS(null, "d", pathd);
        gridgroup.appendChild(gridpath);
        this.SelfElem.appendChild(gridgroup);
        this.Visible = true;
    }

    Hide()
    {
        this.SelfElem.innerHTML = "";
        this.Visible = false;
    }
	
}