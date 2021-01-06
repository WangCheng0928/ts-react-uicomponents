var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React, { useRef, useState } from 'react';
import axios from 'axios';
import UploadList from './uploadList';
import Dragger from './dragger';
import Button from '../Button/button';
export var Upload = function (props) {
    var fileInputRef = useRef(null);
    var action = props.action, defaultFileList = props.defaultFileList, beforeUpload = props.beforeUpload, onProgress = props.onProgress, onSucess = props.onSucess, onError = props.onError, onChange = props.onChange, onRemove = props.onRemove, header = props.header, name = props.name, data = props.data, withCredentials = props.withCredentials, accept = props.accept, multiple = props.multiple, drag = props.drag, children = props.children, uploadType = props.uploadType;
    var _a = useState(defaultFileList || []), fileList = _a[0], setFileList = _a[1];
    var updateFileList = function (updateFile, updateObj) {
        //这里传一个函数是官方文档推荐，因为更新state可能是异步的，可能拿不到当前的状态，而传入函数就可以解决这一问题
        setFileList(function (prevList) {
            return prevList.map(function (file) {
                if (file.uid === updateFile.uid) {
                    return __assign(__assign({}, file), updateObj);
                }
                else {
                    return file;
                }
            });
        });
    };
    var handleClick = function () {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    var handleFileChange = function (e) {
        var files = e.target.files;
        if (!files) {
            return;
        }
        uploadFiles(files);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };
    var handleRemove = function (file) {
        setFileList(function (preList) {
            return preList.filter(function (item) { return item.uid !== file.uid; });
        });
        if (onRemove) {
            onRemove(file);
        }
    };
    var uploadFiles = function (files) {
        var postFiles = Array.from(files);
        postFiles.forEach(function (file) {
            if (!beforeUpload) {
                post(file);
            }
            else {
                var result = beforeUpload(file);
                if (result && result instanceof Promise) {
                    result.then(function (processedFile) {
                        post(processedFile);
                    });
                }
                else if (result !== false) {
                    post(file);
                }
            }
        });
    };
    var post = function (file) {
        // 刚上传时给每个上传的文件设置初始状态
        var _file = {
            uid: Date.now() + 'upload-file',
            status: 'ready',
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file,
        };
        // setFileList([_file, ...fileList])
        setFileList(function (preFileList) {
            return __spreadArrays([_file], preFileList);
        });
        console.log(fileList);
        var formData = new FormData();
        formData.append(name || 'file', file);
        if (data) {
            Object.keys(data).forEach(function (key) {
                formData.append(key, data[key]);
            });
        }
        axios
            .post(action, formData, {
            headers: __assign(__assign({}, header), { 'Content-Type': 'multipart/form-data' }),
            withCredentials: withCredentials,
            onUploadProgress: function (e) {
                var percentage = Math.round((e.loaded * 100) / e.total) || 0;
                if (percentage < 100) {
                    updateFileList(_file, { percent: percentage, status: 'uploading' });
                    console.log(1111, fileList);
                    if (onProgress) {
                        onProgress(percentage, file);
                    }
                }
            },
        })
            .then(function (resp) {
            console.log(resp);
            updateFileList(_file, { status: 'success', response: resp.data });
            if (onSucess) {
                onSucess(resp, file);
            }
            if (onChange) {
                onChange(file);
            }
        })
            .catch(function (err) {
            console.log(err);
            updateFileList(_file, { status: 'error', error: err });
            if (onError) {
                onError(err, file);
            }
            if (onChange) {
                onChange(file);
            }
        });
    };
    return (React.createElement("div", { className: "upload-component" },
        uploadType === 'btn' ? (React.createElement("div", null,
            React.createElement(Button, { btnType: "primary", onClick: handleClick }, "upload File"),
            React.createElement("input", { className: "file-input", style: { display: 'none' }, ref: fileInputRef, type: "file", onChange: handleFileChange, accept: accept, multiple: multiple }))) : (React.createElement("div", { className: "upload-input", style: { display: 'inline-block' }, onClick: handleClick },
            drag ? (React.createElement(Dragger, { onFile: function (files) {
                    uploadFiles(files);
                } }, children)) : (children),
            React.createElement("input", { className: "file-input", style: { display: 'none' }, ref: fileInputRef, type: "file", onChange: handleFileChange, accept: accept, multiple: multiple }))),
        React.createElement(UploadList, { fileList: fileList, onRemove: handleRemove })));
};
Upload.defaultProps = {
    name: 'file',
    uploadType: 'btn',
};
export default Upload;