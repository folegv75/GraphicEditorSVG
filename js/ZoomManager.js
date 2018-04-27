/*description
	Управляет окном просмотра полотна. Сдвигает его влево вправо. Масштабирует.
**/
class ZoomManager
{
	constructor (view, left, right, width, height)
	{
		this.View = view;
		this.Zoom = 100;
		this.Left = left;
		this.Right = right;
		this.Width = width;
		this.Height = height;
	}
}