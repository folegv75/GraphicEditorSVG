/*jshint esversion: 6 */

/*description
	Управляет окном просмотра полотна. Сдвигает его влево вправо. Масштабирует.
**/
class ZoomManager
{
	/**
	 * @param {Holst} view 
	 */
	constructor ()
	{
		this.View = [];
		this.internalZoomKoef = 0;
		this.Zoom = 1;
		this.ShiftX = 0;
		this.ShiftY = 0;
		//this.InitialHeight = height;
		//this.InitialWidth = width;
		//this.Width = width;
		//this.Height = height;
		this.StepHorizontal = 100;
		this.StepVertical = 100;
		this.StepZoom = 0.25;
	}

	/**
	 * @param {Holst} view 
	 */
	AppendView(view)
	{
		this.View.push(view);
	}

	SetViewBoxSize()
	{
		for(let i=0; i<this.View.length; i++) this.View[i].SetViewBoxSize(this.ShiftX, this.ShiftY, this.Zoom);
	//	let value = '' + this.Left + ' ' + this.Top + ' ' + this.Width + ' ' + this.Height;
	//	this.View.SelfElem.setAttributeNS(null,'viewBox', value)
	}

	ViewMoveLeft() 
	{
		this.ShiftX += this.StepHorizontal;
		this.SetViewBoxSize();
	}

	ViewMoveRight()
	{
		this.ShiftX -= this.StepHorizontal;
		this.SetViewBoxSize();		
	}
	
	ViewMoveUp()
	{
		this.ShiftY += this.StepVertical;
		this.SetViewBoxSize();		
	}
	
	ViewMoveDown()
	{
		this.ShiftY -= this.StepVertical;
		this.SetViewBoxSize();		
	}
	
	ViewZoomIn()
	{

		if (this.internalZoomKoef>-1 && this.internalZoomKoef<=1) this.internalZoomKoef = -1;
		this.internalZoomKoef -= this.StepZoom;
		this.calculateZoom();


		// if (this.Zoom>=100) {
		// 	let tempZoom = this.Zoom + this.StepZoom;
		// 	if (tempZoom<200) {
		// 		let ZoomKoef = 1 - (tempZoom/100-1);
		// 		let tempWidth = Math.round(this.InitialWidth * ZoomKoef);
		// 		let tempHeight = Math.round(this.InitialHeight * ZoomKoef);
		// 	} else
		// 	{
		// 		let ZoomKoef = tempZoom/100;
		// 		let tempWidth = Math.round(this.InitialWidth / ZoomKoef);
		// 		let tempHeight = Math.round(this.InitialHeight / ZoomKoef);
		// 	}
		// 	if (tempWidth>=50 && tempHeight>=50) 
		// 	{
		// 		this.Width = tempWidth;
		// 		this.Height = tempHeight;
		// 		this.Zoom = tempZoom;
		// 	}
		// }

		this.SetViewBoxSize();		

	}
	
	ViewZoomNone()
	{
		// this.Width = this.InitialWidth;
		// this.Height = this.InitialHeight;
		this.internalZoomKoef = 0;
		this.Zoom = 1;
		this.SetViewBoxSize();
	}
	
	ViewZoomOut()
	{
		if (this.internalZoomKoef>=-1 && this.internalZoomKoef<1) this.internalZoomKoef = 1;
		this.internalZoomKoef += this.StepZoom;

		this.calculateZoom();
		this.SetViewBoxSize();
	}

	calculateZoom()
	{
		if (this.internalZoomKoef ==0 ) {
			this.Zoom = 1;
		}
		else if (this.internalZoomKoef>0) 
		{
			// увеличение
			this.Zoom = this.internalZoomKoef;
			//this.Height = Math.round(this.InitialHeight * this.ZoomKoef);
			//if (this.Width<100) {
			//	this.Width = 100;
				
				// определим какой максимальный zoom получился
				//this.Zoom = Math.round(this.InitialWidth / this.Width)*100;
				//this.calculateZoom();
		}
		else
		{
			// уменьшение
			this.Zoom = -1 / this.internalZoomKoef;
			//this.Height = -Math.round(this.InitialHeight / this.ZoomKoef);

			// if (this.Height<100) {
			// 	this.Height = 100;
			// 	// определим какой максимальный zoom получился
			// 	this.Zoom = Math.round(this.InitialHeight / this.Height)*100;
			// 	this.calculateZoom();
			// }
	
		}

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

		//this.InfoLabel = new Label('lblZoomInfo');
		//this.InfoLabel.SetValue('Zoom='+this.ZoomManager.ZoomKoef);
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
		//this.InfoLabel.SetValue('Zoom='+this.ZoomManager.ZoomKoef);
		
	}

	ButtonViewZoomNoneOnClick(Evnt)
	{
		this.ZoomManager.ViewZoomNone();
		//this.InfoLabel.SetValue('Zoom='+this.ZoomManager.ZoomKoef);

	}

	ButtonViewZoomOutOnClick(Evnt)
	{
		this.ZoomManager.ViewZoomOut();
		//this.InfoLabel.SetValue('Zoom='+this.ZoomManager.ZoomKoef);

	}

}