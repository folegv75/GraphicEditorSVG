class Ruler extends BaseControl
{
	constructor (id, rulertype, startpos, width)
	{
        super(id);
        this.RulerType = rulertype;
        this.Dimension = 100;
        this.SubDimension = 50;
        this.DetailDimension = 10;
        this.StartPosition = startpos;
        this.EndPosition = startpos + width;
        this.Base = 0;
        this.Show();

    }

    SetViewBoxSize(startX, startY, width, height)
    {
        if (this.RulerType == RulerType.Horizontal) 
        {
            this.StartPosition = startX;
            this.EndPosition = startX + width;
            //this.Base = startY;
            let value = '' + (startX-30) + ' ' + 0 + ' ' + width + ' ' + height;
            this.SelfElem.setAttributeNS(null,'viewBox', value);
        } else
        {
            this.StartPosition = startY;
            this.EndPosition = startY + height;
            //this.Base = startX;
            let value = '' + 0 + ' ' + (startY-30) + ' ' + width + ' ' + height;
            this.SelfElem.setAttributeNS(null,'viewBox', value);
        }
        if (this.Visible) this.Show();
        
    }
    
    ShowHorizontal()
    {
        let elem = document.getElementById(Const.HolstContainerId);
        //this.Base = elem.scrollTop;
        
        let backgroundrect = document.createElementNS(xmlns, "rect");
        backgroundrect.setAttributeNS(null,'stroke','none');
        backgroundrect.setAttributeNS(null,'fill','white');
        backgroundrect.setAttributeNS(null,'opacity','0.95');
        backgroundrect.setAttributeNS(null,'x', this.StartPosition-30);
        //if (elem.scrollTop==0) {
            backgroundrect.setAttributeNS(null,'y', this.Base);
            backgroundrect.setAttributeNS(null,'height','30');
        // }
        // else{
        //     backgroundrect.setAttributeNS(null,'y', this.Base-5);
        //     backgroundrect.setAttributeNS(null,'height','35');
            
        // }
        backgroundrect.setAttributeNS(null,'width',this.EndPosition - this.StartPosition);
        
        let groupLine = document.createElementNS(xmlns, "g");
        groupLine.setAttributeNS(null,'stroke','black');


        let groupText = document.createElementNS(xmlns, "g");        
        // Основные измерения с выводом значений
        let gridpath = document.createElementNS(xmlns, "path");
        let pathd = "";
        for(let x = this.StartPosition; x<this.EndPosition; x+=this.Dimension)
        {
            pathd += "M " + x + " " + (this.Base) + " L " + x + " " + (this.Base+30) + " ";
            let elText = document.createElementNS(xmlns, "text");
            elText.innerHTML = x;
            elText.setAttributeNS(null, "x", x+2);
            elText.setAttributeNS(null, "y", this.Base + 15);
            groupText.appendChild(elText);
        }
        gridpath.setAttributeNS(null, "d", pathd);
        groupLine.appendChild(gridpath);

        // создаем под измерения
        gridpath = document.createElementNS(xmlns, "path");
        pathd = "";
        for(let x = this.StartPosition; x<this.EndPosition; x+=this.SubDimension)
        {
            pathd += "M " + x + " " + (this.Base+30) + " L " + x + " " + (this.Base+30-10) + " ";
        }
        gridpath.setAttributeNS(null, "d", pathd);
        groupLine.appendChild(gridpath);
 
        // Создаем детальные измерения
        gridpath = document.createElementNS(xmlns, "path");
        pathd = "";
        for(let x = this.StartPosition; x<this.EndPosition; x+=this.DetailDimension)
        {
            pathd += "M " + x + " " +  (this.Base+30) + " L " + x + " " + (this.Base+30-5) + " ";
        }
        gridpath.setAttributeNS(null, "d", pathd);
        groupLine.appendChild(gridpath);

        this.SelfElem.appendChild(backgroundrect);
        this.SelfElem.appendChild(groupLine);
        this.SelfElem.appendChild(groupText);
    }

    ShowVertical()
    {
        let backgroundrect = document.createElementNS(xmlns, "rect");
        backgroundrect.setAttributeNS(null,'stroke','none');
        backgroundrect.setAttributeNS(null,'fill','white');
        backgroundrect.setAttributeNS(null,'opacity','0.95');
        backgroundrect.setAttributeNS(null,'x', 0);
        backgroundrect.setAttributeNS(null,'y',this.StartPosition-30);
        backgroundrect.setAttributeNS(null,'width','30');
        backgroundrect.setAttributeNS(null,'height',this.EndPosition - this.StartPosition);

        let groupLine = document.createElementNS(xmlns, "g");
        groupLine.setAttributeNS(null,'stroke','black');

        let groupText = document.createElementNS(xmlns, "g");

        // Основные измерения с выводом значений
        let gridpath = document.createElementNS(xmlns, "path");
        let pathd = "";
        for(let y = this.StartPosition; y<this.EndPosition; y+=this.Dimension)
        {
            pathd += "M " + (this.Base) + " " + y + " L " + (this.Base+30) + " " + y + " ";
            let elText = document.createElementNS(xmlns, "text");
            elText.innerHTML = y;
            elText.setAttributeNS(null, "x", this.Base + 15);
            elText.setAttributeNS(null, "y", y-3);
            elText.setAttributeNS(null, "transform", "rotate(270,"+this.Base + 15+"," + (y-3) + ")");
            groupText.appendChild(elText);
        }
        gridpath.setAttributeNS(null, "d", pathd);
        groupLine.appendChild(gridpath);

        // создаем под измерения
        gridpath = document.createElementNS(xmlns, "path");
        pathd = "";
        for(let y = this.StartPosition; y<this.EndPosition; y+=this.SubDimension)
        {
            pathd += "M " + (this.Base+30) + " " + y + " L " + (this.Base+30-10) + " " + y + " ";
        }
        gridpath.setAttributeNS(null, "d", pathd);
        groupLine.appendChild(gridpath);
 
        // Создаем детальные измерения
        gridpath = document.createElementNS(xmlns, "path");
        pathd = "";
        for(let y = this.StartPosition; y<this.EndPosition; y+=this.DetailDimension)
        {
            pathd += "M " + (this.Base+30) + " " + y + " L " + (this.Base+30-5) + " " + y + " ";
        }
        gridpath.setAttributeNS(null, "d", pathd);
        groupLine.appendChild(gridpath);

        this.SelfElem.appendChild(backgroundrect);
        this.SelfElem.appendChild(groupLine);
        this.SelfElem.appendChild(groupText);
        
    }
    
    Show()
    {        
        this.SelfElem.innerHTML = "";
        if (this.RulerType == RulerType.Horizontal) this.ShowHorizontal();
        else this.ShowVertical();

        this.Visible = true;
    }

    Hide()
    {
        this.SelfElem.innerHTML = "";
        this.Visible = false;
    }
	
}