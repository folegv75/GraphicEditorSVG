/*jshint esversion: 6 */

class Paper extends Layer
{

    constructor (id, x, y, width, height, shiftX, shiftY)
	{
        super(id, x, y, width, height, shiftX, shiftY);
        this.rectBackground = document.getElementById(Const.PaperBackgroundId);
    }
    

    Show()
    {        
        if (this.rectBackground!=null)
        {
            this.rectBackground.setAttributeNS(null,'fill','black');
            this.rectBackground.setAttributeNS(null,'opacity','0.0');
            this.rectBackground.setAttributeNS(null, "x", this.zLeft);
            this.rectBackground.setAttributeNS(null, "y", this.zTop);
            this.rectBackground.setAttributeNS(null, "width", this.zWidth);
            this.rectBackground.setAttributeNS(null, "height", this.zHeight);    
        }
        super.Show();
    }
    
}