const fs = require("fs")
const yaml = require("js-yaml")
const csv = require("csv-parser")
const csvparse = require("csv-parse")
const createCsvWriter = require('csv-writer').createObjectCsvWriter
const path = require("path")
const readline = require("readline")

yamlContents = fs.readFileSync("florida_data/florida_mapping.yaml")
yaml_data = yaml.loadAll(yamlContents)

function getCSVpromise(filename) {
    /**
     * Return a promise, where the callback is invoked once the CSV has been read in.
     * @param {String} filename The filename of the CSV
     * @param {Promise} promise A promise, where the callback will be invoked once the CSV has been read.
     */
    return new Promise((resolve, reject) => {
        //Initialize empty array for CSV rows.
        var output = []
        //Set up csvparse to add rows to output and then call resolve.
        const parser = csvparse({
            delimiter: ","
        })
        parser.on("readable", () => {
            let record
            while (record = parser.read()) {
                output.push(record)
            }
        })
        parser.on("end", () => {
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
        //Feed csv rows to csvparse using linereader.
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
    /**
     * Given a table in row-major format
     * [ {"a":1, "b":2},
     *   {"a":0, "b":1} ],
     * return a CSV in column-major format
     * {"a": [1, 0], "b":[2, 1]}
     * @param csv_file The data as a table.
     * @return transposed the data in column-major format. 
     */
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

function write_output_csvs(output_csvs, output_folder) {
    /**
     * Write a dictionary in the format {filename:csv_data ... } to output folders.
     * @param output_csvs A dictionary of filenames and csv files. 
     * @param output_folder Path to the folder where the csv files will be written.
     */
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


process_csvs = function(mapping, filenames, output_folder) {
    /**
     * Rearrange the columns of the csv files in 'filenames' according to 'mapping', then write the output csvs in 'output folder'.
     * @param mapping The mapping describing how columns should be rearranged.
     * @param filenames Paths to each input file.
     * @param output_folder Path to the folder where output csvs should be stored.
     */

    output_csvs = {} //Store rows of each output csv.

    completed = {} //Indicate which output csvs have been completed.
    //Initially, assume all files have not been written yet.
    for (i = 0; i < filenames.length; i++) {
        completed[filenames[i]] = false
    }

    for (i = 0; i < filenames.length; i++) {
        filename = filenames[i]
        getCSVpromise(filenames[i] + ".csv").then(([csv_data, other_filename]) => {
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
                //Add foreign key column if present.
                if ("foreign_key_name" in destination) { 
                    console.log(destination)
                    foreign_key_name = destination["foreign_key_name"]
                    foreign_key_value = destination["foreign_key_value"] //Assume present
                    output_csvs[destination_csv][foreign_key_name] = csv_data[foreign_key_value]
                }
            })

            //Mark the file as completed. If all completed, write to files.
            completed[filename] = true
            all_completed = true
            Object.keys(completed).forEach((key) => {
                all_completed = all_completed && completed[key]
            })
            //If all files have been processed, write the output.
            if (all_completed) {
                write_output_csvs(output_csvs, output_folder)
            }
        })
    }
}

//Save mapping.
yamlContents = fs.readFileSync("florida_data/florida_mapping.yaml")
yaml_data = yaml.loadAll(yamlContents)
mapping = yaml_data[0]

//Create list of filenames
source_folder = "florida_data/"
filenames = []
Object.keys(mapping).forEach((key) => {
    filenames.push(source_folder + key)
})
console.log(filenames)

process_csvs(
    mapping,
    filenames,
    "."
)
