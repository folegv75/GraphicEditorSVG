/**
 * @class Holst
 */
class Holst extends BaseControl
{
	constructor(id)
	{
		super(id);

		this.Paper = document.getElementById(Const.PaperId);
		

        this.Grid = new Grid(Const.GridId, 0, 0, 1500,1500);
        this.RulerHorizontal = new Ruler(Const.RulerHorizontal, RulerType.Horizontal, 0, 1500);
        this.RulerVertical = new Ruler(Const.RulerVertical, RulerType.Vertical, 0, 1500);
		
	}

	SetViewBoxSize(left, top, width, height)
	{
		let value = '' + (left-30) + ' ' + (top-30) + ' ' + width + ' ' + height;
		this.Paper.setAttributeNS(null,'viewBox', value);
		this.Grid.SetViewBoxSize(left, top, width, height);
		this.RulerHorizontal.SetViewBoxSize(left, top, width, height);
		this.RulerVertical.SetViewBoxSize(left, top, width, height);

	}
	
}