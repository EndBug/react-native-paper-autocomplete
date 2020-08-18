"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var react_native_paper_1 = require("react-native-paper");
function Autocomplete(_a) {
    var array = _a.array, placeholder = _a.placeholder, label = _a.label, textInputProps = _a.textInputProps, onValueSelected = _a.onValueSelected, onError = _a.onError;
    var _b = react_1.useState(placeholder || ''), text = _b[0], setText = _b[1];
    var _c = react_1.useState(placeholder || ''), selected = _c[0], setSelected = _c[1];
    var _d = react_1.useState(true), error = _d[0], setError = _d[1];
    var onFocus = function () {
        if (text == selected && error)
            setError(false);
        else if (text != selected && !error) {
            (onError || defaultCallback)();
            setError(true);
        }
    };
    var showList = function () { return (react_1["default"].createElement(react_native_1.View, { style: styles.listView },
        react_1["default"].createElement(react_native_1.ScrollView, { showsVerticalScrollIndicator: false, keyboardShouldPersistTaps: "handled", style: styles.list }, array.filter(function (str) { return str.toLowerCase().includes(text.toLowerCase()); }).map(function (str, index) { return (react_1["default"].createElement(react_native_1.TouchableOpacity, { accessible: true, accessibilityLabel: "Autocomplete list", style: styles.onTop, key: index, onPress: function () {
                (onValueSelected || defaultCallback)(str);
                setSelected(str);
                setText(str);
                setError(false);
            } },
            react_1["default"].createElement(react_native_paper_1.Text, { style: styles.autoCompleteText }, str))); })))); };
    return (react_1["default"].createElement(react_native_1.View, null,
        react_1["default"].createElement(react_native_paper_1.TextInput, __assign({ label: label, onFocus: onFocus, onKeyPress: onFocus, value: text, error: error, onChangeText: setText }, (textInputProps || {}))),
        error && showList()));
}
exports["default"] = Autocomplete;
var styles = react_native_1.StyleSheet.create({
    listView: {
        position: react_native_1.Platform.OS == 'ios' ? 'absolute' : 'relative',
        zIndex: Infinity,
        width: '100%',
        top: 0
    },
    list: {
        backgroundColor: '#cecece',
        zIndex: Infinity
    },
    onTop: {
        zIndex: Infinity
    },
    autoCompleteText: {
        zIndex: Infinity,
        flex: 1,
        padding: 10,
        fontSize: 17,
        fontWeight: 'bold'
    }
});
var defaultCallback = function () { };
