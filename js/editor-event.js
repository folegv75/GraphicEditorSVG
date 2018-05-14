/*jshint esversion: 6 */

class EditorEvent 
{
    /**
     * 
     * @param {EditorEventType} evnttype
     */
    contructor (evnttype)
    {
        /** @type {EditorEventType) тип события */
        this.Type = evnttype;

        /** @type {number} X координата относительно бумаги холста */
        this.X = 0;
        
        /** @type {number} Y координата относительно бумаги холста */
        this.Y = 0;

        /** @type {Event} исходное событие */
        this.SourceEvent = null; 
    }


}