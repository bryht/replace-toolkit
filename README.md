
# replace-toolkit 
[![Build Status](https://travis-ci.org/bryht/replace-toolkit.svg?branch=master)](https://travis-ci.org/bryht/replace-toolkit)
A tool for replacing a value for all file-names&folder-names&file-contents under a folder

# install
```npm
npm i replace-toolkit -g
```

# use
open powershell or cmd
```powershell
replace-toolkit oldValue newValue
```
only change file name
```powershell
replace-toolkit oldValue newValue -f
```
only change file content
```powershell
replace-toolkit oldValue newValue -c
```
