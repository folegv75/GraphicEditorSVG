/*jshint esversion: 6 */

class Util
{

    /** @desc Генератор уникального идентификатор в виде строки */
    static GenerateId()
    {
	    return 'id_' + Math.random().toString(36).substr(2, 11);
    }

    /** @desc Возвращает путь к html элементам в виде строки. Останавливает разбор после тэге Body */
    static PathToString(path)
    {
        let res = '';
        for (let i=0; i<path.length;i++) 
        {
            res += ' | ' + path[i].tagName+'#'+path[i].id ; 
            if (path[i].tagName=='BODY') break;
        }
        return res;
    }

    static ParentTreeToArray(elem)
    {
        let res=[];
        res.push(elem);
        while (elem.parentElement!=null)
        {
            elem = elem.parentElement;
            res.push(elem);
        }
        return res;
    }
}