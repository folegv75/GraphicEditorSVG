/*description
	Управляет окном просмотра полотна. Сдвигает его влево вправо. Масштабирует.
**/
class ZoomManager
{
	/**
	 * @param {Holst} view 
	 */
	constructor (view, left, top, width, height)
	{
		this.View = view;
		this.ZoomKoef = 1;
		this.Left = left;
		this.Top = top;
		this.InitialHeight = height;
		this.InitialWidth = width;
		this.Width = width;
		this.Height = height;
		this.StepHorizontal = 100;
		this.StepVertical = 100;
		this.StepZoom = 0.1;
	}

	SetViewBoxSize()
	{
		let value = '' + this.Left + ' ' + this.Top + ' ' + this.Width + ' ' + this.Height;
		this.View.SelfElem.setAttributeNS(null,'viewBox', value)
	}

	ViewMoveLeft() 
	{
		this.Left += this.StepHorizontal;
		this.SetViewBoxSize()		
	}

	ViewMoveRight()
	{
		this.Left -= this.StepHorizontal;
		this.SetViewBoxSize()		
	}
	
	ViewMoveUp()
	{
		this.Top += this.StepVertical;
		this.SetViewBoxSize()		
	}
	
	ViewMoveDown()
	{
		this.Top -= this.StepVertical;
		this.SetViewBoxSize()		
	}
	
	ViewZoomIn()
	{

		this.ZoomKoef = this.ZoomKoef*this.StepZoom;
		this.calcaulateZoom();
		this.SetViewBoxSize()		

	}
	
	ViewZoomNone()
	{
		this.Width = this.InitialWidth;
		this.Height = this.InitialHeight;
		this.ZoomKoef = 1;
		this.SetViewBoxSize()		
	}
	
	ViewZoomOut()
	{
		this.ZoomKoef = this.ZoomKoef/this.StepZoom;
		this.calcaulateZoom();
		this.SetViewBoxSize()		
	}

	calcaulateZoom()
	{
		this.Width = this.InitialWidth * this.ZoomKoef;
		if (this.Width<1) this.Width = 1;
		this.Height = this.InitialHeight * this.ZoomKoef;
		if (this.Height<1) this.Height = 1;
	}

}

class ZoomControl
{
	constructor (zoomManager)
	{
		this.ZoomManager = zoomManager;

		this.ButtonViewMoveLeft = new Button(Const.BtnViewMoveLeftId);
		this.ButtonViewMoveLeft.SetOnClick(this.ButtonViewMoveLeftOnClick.bind(this));

		this.ButtonViewMoveRight = new Button(Const.BtnViewMoveRightId);
		this.ButtonViewMoveRight.SetOnClick(this.ButtonViewMoveRightOnClick.bind(this));

        this.ButtonViewMoveUp = new Button(Const.BtnViewMoveUpId);
		this.ButtonViewMoveUp.SetOnClick(this.ButtonViewMoveUpOnClick.bind(this));

		this.ButtonViewMoveDown = new Button(Const.BtnViewMoveDownId);
		this.ButtonViewMoveDown.SetOnClick(this.ButtonViewMoveDownOnClick.bind(this));

		this.ButtonViewZoomIn = new Button(Const.BtnViewZoomInId);
		this.ButtonViewZoomIn.SetOnClick(this.ButtonViewZoomInOnClick.bind(this));

		this.ButtonViewZoomNone = new Button(Const.BtnViewZoomNoneId);
		this.ButtonViewZoomNone.SetOnClick(this.ButtonViewZoomNoneOnClick.bind(this));

		this.ButtonViewZoomOut = new Button(Const.BtnViewZoomOutId);
		this.ButtonViewZoomOut.SetOnClick(this.ButtonViewZoomOutOnClick.bind(this));
	}
	
	ButtonViewMoveLeftOnClick(Evnt)
	{
		this.ZoomManager.ViewMoveLeft();
	}

	ButtonViewMoveRightOnClick(Evnt)
	{
		this.ZoomManager.ViewMoveRight();
	}

	ButtonViewMoveUpOnClick(Evnt)
	{
		this.ZoomManager.ViewMoveUp();
	}

	ButtonViewMoveDownOnClick(Evnt)
	{
		this.ZoomManager.ViewMoveDown();
	}

	ButtonViewZoomInOnClick(Evnt)
	{
		this.ZoomManager.ViewZoomIn();
	}

	ButtonViewZoomNoneOnClick(Evnt)
	{
		this.ZoomManager.ViewZoomNone();
	}

	ButtonViewZoomOutOnClick(Evnt)
	{
		this.ZoomManager.ViewZoomOut();
	}

}