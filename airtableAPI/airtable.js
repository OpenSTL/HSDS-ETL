const base = require('airtable').base('appiqD4xhYq3CJXDZ');

let tables = ['services', 'locations', 'organizations', 'contact', 'phones', 'address', 'schedule', 'service_area', 'taxonomy', 'details'];

export const createRecord = (data) => {
    tables.forEach(table => {

        if (data[i] == table){
            base(table).create(data.table_name.info)
        }
    })
}
