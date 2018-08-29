/*jshint esversion: 6 */

class EditorEvent 
{
    /**
     * 
     * @param {EditorEventType} evnttype
     */
    constructor (evnttype)
    {
        /** @type {EditorEventType) тип события */
        this.Type = evnttype;

        /** @type {number} X координата относительно бумаги холста */
        this.X = 0;
        
        /** @type {number} Y координата относительно бумаги холста */
        this.Y = 0;

        /** @type {number} X координата относительно клиентской области браузера */
        this.ClientX = 0;
        
        /** @type {number} Y координата относительно клиентской области браузера */
        this.ClientY = 0;
        
        /** @type {Event} исходное событие */
        this.SourceEvent = null;

        this.TopFigure = null;
        this.TopElement= null;
        this.Layer = null;
        /** Тип координаты фигуры, если нажали на фигуру */
        this.TypeCoordinates = null;

    }


}