class AddressResponse {
    id;
    name;
    phone_number;
    street;
    city;
    province;
    district;
    postal_code;
    is_main_address;
    is_active;
    created_at;
    updated_at;


    constructor(id, name, phone_number, street, city, province, district, postal_code, is_main_address, is_active, created_at, updated_at) {
        this.id = id;
        this.name = name;
        this.phone_number = phone_number;
        this.street = street;
        this.city = city;
        this.province = province;
        this.district = district;
        this.postal_code = postal_code;
        this.is_main_address = is_main_address;
        this.is_active = is_active;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}

module.exports = {
    AddressResponse
}