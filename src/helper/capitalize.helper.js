const capitalizeEachFirstWord = (word) => {
    const words = word.split(" ");
    return words.map(word => word.at(0).toUpperCase().concat(word.substring(1, word.length)))
        .join(" ")
}

module.exports = {
    capitalizeEachFirstWord
}
