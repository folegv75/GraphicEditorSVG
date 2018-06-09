/*jshint esversion: 6 */

class Util
{

    /** @desc Генератор уникального идентификатор в виде строки */
    static GenerateId()
    {
	    return 'id_' + Math.random().toString(36).substr(2, 11);
    }

    /** @desc Возвращает путь к html элементам в виде строки. Останавливает разбор после тэге Body */
    static PathToString(path,stopid)
    {
        let res = '';
        if (path==null) return res;
        for (let i=0; i<path.length;i++) 
        {
            res += ' | ' + path[i].tagName+'#'+path[i].id; 
            if (stopid!=undefined) if (path[i].id==stopid) break;
            if (path[i].tagName=='BODY') break;
        }
        return res;
    }

    /** Сформировать массив html элементов из элементов и его родителей */
    static ParentTreeToArray(elem)
    {
        let res=[];
        if (elem==null) return res;
        res.push(elem);
        while (elem.parentElement!=null)
        {
            elem = elem.parentElement;
            res.push(elem);
        }
        return res;
    }

    // Определить высоту текста через размер прямоугольника SVG
    static GetTextHeight(fontsize, parentsvg) 
    {
	    let tempShape = document.createElementNS(xmlns, 'text');
	    tempShape.setAttributeNS(null, 'x', 0);
	    tempShape.setAttributeNS(null, 'y', 0);
	    tempShape.setAttributeNS(null, 'font-size', fontsize);
	    tempShape.innerHTML = "Mg";
	    parentsvg.appendChild(tempShape);
	    let realBound = tempShape.getBBox();

	    // границы рассчитываются с учетом межстрочного интервала. Межстрочный интервал по умолчанию, половина высоту строки.
	    parentsvg.removeChild(tempShape)
	    let Res = {};
	    // Расстояние между строками
	    Res.Leading = realBound.height;

	    // Сколько нужно добавить к baseline по y, чтобы верхний угол буквы вывелся в указанной координате
	    Res.AddY = Math.round(50 - realBound.y - realBound.height / 2) + (realBound.y + realBound.height - 50);

	    return Res;
    }       
}
