/*jshint esversion: 6 */

/** Общий родитель для всех элементов (shape) отображаемых на холсте*/
class BaseShape
{
    /** Создание фигуры 
     * @param {string} id - уникальный идентификатор фигуры
     * @param {number} left - x координата верхнего левого угла
     * @param {number} top - e координата верхнего левого угла
    */

    constructor(id, left, top)
    {
        this.Id = id;
        this.Type = null;
        this.Left = left;
        this.Top = top;
        this.Width = 0;
        this.Height = 0;
        this.xVivsible = false;
        this.xSelected = false;
    }

    get Right()
    {
        return this.Left + this.Width;
    }

    get Bottom()
    {
        return this.Top + this.Height;
    }

    get Visible() { return this.xVisible;}
    set Visible(value) 
    {
        if(value) this.Show();
        else this.Hide();
    }

    Show()
    {
        this.xVisible = true;
    }

    Hide()
    {
        this.xVisible = false;
    }

    /** Показать выделение фигуры */
    Select()
    {
        this.xSelected = true;
    }

    /** Снять выделение фигуры */
    UnSelect()
    {
        this.xSelected = false;
    }

    // Получить тип координаты в фигуре. 
    // фигура состоит из несколькоих подфигур. Сама фигура, граница, заголовок, точка соединения и т.п.
    GetTypeCoordinates(x,y)
    {
       return ShapeTypeCoordinates.Figure; 
    }

}