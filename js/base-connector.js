/*jshint esversion: 6 */

/** Базовый соединитель, представляет линию прямую без стрелок */
class BaseConnector extends BaseShape
{
    constructor(id, left, top)
    {
        super(id);
        this.Type = 'connector';
    }    
}