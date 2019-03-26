#!/usr/bin/env node
'use strict'
const fs = require('fs-extra');
const path = require('path');


var args = process.argv.slice(2);
var isReanmeFile = true;
var isRenameContent = true;
if (args.length < 2) {
    console.log("replace-toolkit oldname newname -f -c");
    return;
}
if (args.includes("-f")) {
    isReanmeFile = true;
    isRenameContent=false;
    var index = args.indexOf("-f");
    args.splice(index, 1);
}
if (args.includes("-c")) {
    isReanmeFile=false;
    isRenameContent = true;
    var index = args.indexOf("-c");
    args.splice(index, 1);
}
var oldValue = args[0];
var newValue = args[1];

//rename folders
renameFilesSync('./');


var exts = [".cs", ".json", ".sln", ".csproj", ".dockerignore", ".gitignore", ".Production", ".yml", ".yaml"];

async function renameFilesSync(dir) {

    var files = await fs.readdirSync(dir);

    files.forEach(async name => {
        var fullName = dir + "/" + name;
        if (name.includes(oldValue)) {

            fullName = await replaceFileName(fullName, name);
        }
        var state = await fs.statSync(fullName);
        if (state.isDirectory()) {
            await renameFilesSync(fullName);
        } else if (state.isFile() && exts.indexOf(path.extname(fullName)) > -1) {
            changeFileContentSync(fullName);
        }
    });

}

async function replaceFileName(oldFullName, oldName) {
    if (isReanmeFile==false) {
        return oldFullName;
    }
    var newFullName = oldFullName.slice(0, -(oldName.length)) + oldName.replace(oldValue, newValue);
    await fs.renameSync(oldFullName, newFullName);
    console.log("+++++++" + newFullName);
    return newFullName;
}

function changeFileContentSync(file) {
    if (isRenameContent==false) {
        return;
    }

    fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        var result = data.replace(new RegExp(oldValue, 'g'), newValue);
        console.log("=======" + file);
        fs.writeFile(file, result, 'utf8', function (err) {
            if (err) return console.log(err);
        });
    });
}