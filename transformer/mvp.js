const fs = require("fs")
const yaml = require("js-yaml")
const csv = require("csv-parser")
const csvparse = require("csv-parse")
const createCsvWriter = require('csv-writer').createObjectCsvWriter
const path = require("path")
const readline = require("readline")

csvExample = "/home/paul/Documents/proj/open_source/openstl/hsds-transformer/hsds-transformer/examples/florida_data/locations.csv"
 
yamlContents = fs.readFileSync("/home/paul/Documents/proj/open_source/openstl/hsds-transformer/hsds-transformer/examples/florida_data/florida_mapping.yaml")
yaml_data = yaml.loadAll(yamlContents)

function getCSVpromise(filename) {
    return new Promise((resolve, reject) => {
        const parser = csvparse({
            delimiter: ","
        })
        var output = []
        parser.on("readable", () => {
            let record
            while (record = parser.read()) {
                output.push(record)
            }
        })
        parser.on("end", () => {
            debugger;
            output_in_csv_format = []
            columns = output.shift()
            output.forEach((row) => {
                row_in_csv_format = {}
                for (var i = 0; i < output[0].length; i++) {
                    row_in_csv_format[columns[i]] = row[i]
                }
                output_in_csv_format.push(row_in_csv_format)
            })
            resolve([output_in_csv_format, filename])
        })
        var lineReader = readline.createInterface({
            input: fs.createReadStream(filename)
        })
        lineReader.on("line", function (line) {
            try {
                parser.write(line + "\n")
            }
            catch (error) {
            }
        })
        lineReader.on("close", () => {
            parser.end()
        })
    })
}

function transposeCSV(csv_file) {
    transposed = {}
    columns = []
    csv_file.forEach((row) => {
        Object.keys(row).forEach((column) => {
            if (!columns.includes(column)) {
                columns.push(column)
            }
        })
    })
    columns.forEach((column) => {
        transposed[column] = []
    })
    for (var i = 0; i < csv_file.length; i++) {
        row = csv_file[i]
        columns.forEach(function(column_name) {
            if (column_name in row) {
                transposed[column_name].push(row[column_name])
            }
            else {
                transposed[column_name].push("")
            } 
        })
    }
    return transposed
}

process_csvs = function(mapping, filenames, output_folder) {
    completed = {}
    output_csvs = {} 

    function write_output_csvs(output_csvs) {
        Object.entries(output_csvs).forEach(([filename, data]) => {
            csv_header = []
            Object.keys(data).forEach((key) => {
                csv_header.push({
                    id: key,
                    title: key
                })
            })
            csv_length = data[Object.keys(data)[0]].length
            csv_data = []
            for (i = 0; i < csv_length; i++) {
                row = {}
                Object.keys(data).forEach((key) => {
                    row[key] = data[key][i]
                })
                csv_data.push(row)
            }
            createCsvWriter({
                path: path.join(output_folder, filename + ".csv"),
                header: csv_header
            }).writeRecords(csv_data)
        })
    }

    for (i = 0; i < filenames.length; i++) {
        completed[filenames[i]] = false
    }
    for (i = 0; i < filenames.length; i++) {
        filename = filenames[i]
        getCSVpromise(filenames[i] + ".csv").then(([csv_data, other_filename]) => {
            //write_csv(csv_data, other_filename + ".test")
            filename = other_filename
            filename = filename.slice(0, filename.length - 4)
            csv_data = transposeCSV(csv_data)
            //Add the columns to the output.
            mapping_for_file = mapping[path.basename(filename)]
            Object.entries(mapping_for_file).forEach(([source_column, destination]) => {
                destination_column = destination["field"]
                destination_csv = destination["model"]
                if (!(destination_csv in output_csvs)) {
                    output_csvs[destination_csv] = {}
                }
                output_csvs[destination_csv][destination_column] = csv_data[source_column]
            })
            //Mark the file as completed. If all completed, write to files.
            completed[filename] = true
            all_completed = true
            Object.keys(completed).forEach((key) => {
                all_completed = all_completed && completed[key]
            })
            if (all_completed) {
                write_output_csvs(output_csvs)
            }
        })
    }
}

source_folder = "/home/paul/Documents/proj/open_source/openstl/hsds-transformer/hsds-transformer/examples/florida_data/"

filenames = []

mapping = yaml_data[0]

Object.keys(mapping).forEach((key) => {
    filenames.push(source_folder + key)
})

console.log(filenames)

process_csvs(
    mapping,
   filenames,
    "."
)
