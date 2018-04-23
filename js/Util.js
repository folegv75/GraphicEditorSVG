class Util
{

    // генератор уникальной строки
    static GenerateId()
    {
	    return 'id_' + Math.random().toString(36).substr(2, 11);
    }

}