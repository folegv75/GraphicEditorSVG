/*jshint esversion: 6 */

/** Базовая фигура, представляет прямоугольник */
class BaseFigure extends BaseShape
{
    constructor(id, left, top)
    {
        super(id, left, top);
        this.Id = Util.GenerateId();
        this.SelfElem = document.createElementNS(xmlns,"g");
        this.SelfElem.id = this.Id;        
        this.Type = 'figure';
        this.SelfElem.setAttribute('figuretype',this.Type);
        this.Contour = null;
        this.subSvgCreated = null;
        this.svgRect = null;
        this.svgCaption = null
        this.elmInputCaption = null
        this.xCaption = "Объект";
    }

    get Caption() { return this.xCaption; }
    set Caption(value) 
    {
        this.xCaption = value;
        this.Show();

    }

    Select() 
    {
        super.Select();
        this.svgRect.setAttributeNS(null, 'stroke', 'red');
    }

    UnSelect()
    {
        super.Select();
        this.svgRect.setAttributeNS(null, 'stroke', 'black');
    }

    BeginEditCaption()
    {
        //ShapeRectHideCaption(fig);
        this.OldCaption = this.xCaption;
    
        this.elmInputCaption.setAttribute('contenteditable',"true");
        this.elmInputCaption.focus();
    }

    CancelEditCaption()
    {
        this.elmInputCaption.setAttribute('contenteditable',"false");
        this.xCaption = this.OldCaption;
        this.Show();
    }

    ApproveEditCaption()
    {
        this.elmInputCaption.setAttribute('contenteditable',"false");
        this.xCaption = this.elmInputCaption.innerHTML;
        this.Show();        
    } 

    Move(newLeft, newTop)
    {
        this.Left = newLeft;
        this.Top = newTop;
        this.Show();
    }

    Show()
    {
        if (!this.subSvgCreated) 
        {   
            this.svgRect = document.createElementNS(xmlns,"rect");
            this.svgCaption = document.createElementNS(xmlns,"text");
            this.grpInput = document.createElementNS(xmlns, 'foreignObject');
            //this.elmInputCaption = document.createElementNS("http://www.w3.org/1999/xhtml",'div');

            /** А так все видно, но не устанавливается ширина */
            this.elmInputCaption = document.createElement('div');

            /** С этой строкй устанавливается ширина, но не видно текста */
            //this.elmInputCaption = document.createElementNS(xmlns,'div');

           // this.elmCaption = document.createElement('div');
           // this.elmCaption.innerHTML = "t e s t";
           // this.elmInputCaption.appendChild(this.elmCaption);
        }

        this.svgRect.setAttributeNS(null, 'x', this.Left);
        this.svgRect.setAttributeNS(null, 'y', this.Top);
        this.svgRect.setAttributeNS(null, 'width', this.Width);
        this.svgRect.setAttributeNS(null, 'height', this.Height);
        if (this.xSelected) this.svgRect.setAttributeNS(null, 'stroke', 'red');
        else  this.svgRect.setAttributeNS(null, 'stroke', 'black');
        this.svgRect.setAttributeNS(null, 'fill', 'white');


        this.grpInput.setAttributeNS(null, 'transform', 'translate(' +this.Left + ',' + this.Top + ')');

    
        let s = this.elmInputCaption.style;
        //s.width = ""+this.Width+"px";
        s.width = (this.Width - 8 )+ "px";
        s.height = (this.Height -8)+ "px";
        this.elmInputCaption.classList.add('input-field');
        this.elmInputCaption.setAttribute('contenteditable',"false");
        this.elmInputCaption.innerHTML = this.xCaption;
        
        /** Вывод текста через svg, прежний способ */
        /*
        this.SelfElem.appendChild(this.grpInput);
        this.elmInputCaption.focus();
        
        let fontsize= '12px';
        let textBound = 5;
        let textRect = Util.GetTextHeight(fontsize,MainApp.Holst.SelfElem);     

        this.svgCaption.setAttributeNS(null, 'x', this.Left+textBound);
        this.svgCaption.setAttributeNS(null, 'y', this.Top+textBound+textRect.AddY);
        this.svgCaption.setAttributeNS(null, 'font-size', fontsize);
        this.svgCaption.innerHTML = this.xCaption;
        */

        if (!this.subSvgCreated)  
        {
            this.SelfElem.appendChild(this.svgRect);
            /*this.SelfElem.appendChild(this.svgCaption);*/
            this.SelfElem.appendChild(this.grpInput);
            this.grpInput.appendChild(this.elmInputCaption);
        }
        this.subSvgCreated = true;
        super.Show();
    }

    Hide() 
    {
        this.svgrect = null;
        this.SelfElem.innerHTML = "";
        this.subSvgCreated = false;
        super.Hide();
    }    

    /** Создать контур фигуры. Начало контура совпадает с верхним левым углом текущий фигуры. 
     * В этот момент ширина и выcота контура равны ширине фигуры
     */
    CreateContour()
    {
        this.Contour = new BaseFigureContour(this.Left, this.Top, this.Width, this.Height, true, true, false, false);
        this.Contour.Show();
    }

    /** Установить размеры фигуры в соотвествии с контуром */
    ApproveContour()
    {
        if (this.Contour!=null) 
        {
            this.Left = this.Contour.FixedCorners.Left;
            this.Top = this.Contour.FixedCorners.Top;
            this.Width = this.Contour.FixedCorners.Width;
            this.Height = this.Contour.FixedCorners.Height;                
        }
    }

    /** Удалить контур, фигуры не изменяется */
    DeleteContour()
    {
        this.ContourLayer.SelfElem.removeChild(this.Contour.SelfElem);
        this.Contour.Hide();
        this.Contour = null;
    }

    /** Переместить нижний правый угол контура */
    MoveCornerContour(right, bottom)
    {
        this.Contour.FixedCorners.Right = right;
        this.Contour.FixedCorners.Bottom = bottom;
        this.Contour.Show();
    }

    /** Показать текущий контур */
    ShowContour(layer)
    {
        this.ContourLayer = layer;
        this.ContourLayer.SelfElem.appendChild(this.Contour.SelfElem);
        this.Contour.Show();
    }

    /** Спрятать текущий контур */
    HideContour()
    {        
        this.Contour.Hide();
    }    

}

