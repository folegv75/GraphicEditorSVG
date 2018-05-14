/*jshint esversion: 6 */

class Label
{
	constructor(id)
	{
		this.Id = id;
		this.ElemSelf = document.getElementById(id);
	}

	SetValue(x)
	{
		this.ElemSelf.innerHTML = x;
	}
}
