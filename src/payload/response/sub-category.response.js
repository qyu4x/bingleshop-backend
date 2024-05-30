class SubCategoryResponse {
    id;
    name;
    description;


    constructor(id, name, description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }
}

module.exports = {
    SubCategoryResponse
}