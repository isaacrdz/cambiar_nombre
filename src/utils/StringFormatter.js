export const InicialToUpperCase = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};


export const Capitalize = (string) => {
    const words = string.split(" ");
    let finalString = '';
    words.map( (word, i) => {
        if(i !== 0 && i!==(words.length)){ finalString += ' ' }
        if(word.includes(".") || word.includes("/")){
            finalString += word.toUpperCase();
        }
        else{
            finalString += word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        }
        return false;
    })
    return finalString;
};
