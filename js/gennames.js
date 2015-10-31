var genName = function()
{
    var abs = ["N", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G",
                                             "H", "J", "K", "L", "Z", "X", "C", "V", "B",
                                             "Q", "M"
                                         ];
    var result;

    var variant = Math.sRandom(0, 100);

    if (variant < 70)
    {
        //Элемент буквеный
        var el="";
        //Элемент численый
        var numEl="";
        //Максимум букв в буквеном элементе
        var maxCountAbs = 4;
        //Максимум цифр в цифреном элементе
        var maxCountNum = 4;
        //рандом количество
        var countAbs = Math.floor(Math.sRandom(1, maxCountAbs));

        for(var i = 0; i < countAbs; i++)
            el += abs[Math.floor(Math.sRandom(0, abs.length - 1)*Math.random())];

        //рандом количество
        var countNum = Math.floor(Math.sRandom(1, maxCountNum));

        for(var i = 0; i < countNum; i++)
            numEl += Math.floor(Math.sRandom(0, 9)).toString();

        result = el+"-"+numEl;
    }

    if (variant >= 70)
    {
        //Элемент буквеный
        var el="";
        //Элемент буквеный 2
        var el2="";
        //Максимум букв в буквеном элементе
        var maxCountEl = 4;
        //Максимум букв в буквеном элементе 2
        var maxCountEl2 = 2;
        //рандом количество
        var countAbs = Math.floor(Math.sRandom(1, maxCountEl));

        for(var i = 0; i < countAbs; i++)
            el += abs[Math.floor(Math.sRandom(0, abs.Count - 1)*Math.random())];

        //рандом количество
        var countNum = Math.floor(Math.sRandom(1, maxCountEl2));

        for(var i = 0; i < countNum; i++)
            el2 += abs[Math.floor(Math.sRandom(0, abs.Count - 1)*Math.random())];

        result = el+"-"+el2;
    }


    return result;
}