"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dictionary_1 = require("./dictionary");
var email_address = "([a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*)";
var domainWithTLD = "([a-z0-9]+(-+[a-z0-9]+)*\\.)+(" + dictionary_1.TLDs + ")";
var domainWithAnyTLD = "([a-z0-9]+(-+[a-z0-9]+)*\\.)+([a-z0-9][a-z0-9-]{0," + (Math.max.apply(this, dictionary_1.TLDs.split("|").map(function (x) { return x.length; })) - 2) + "}[a-z0-9])";
var allowedInPath = "a-zA-Z\\d\\-._~\\!$&*+,;=:@%'\"\\[\\]()";
var path = "(((\\/(?:(?:[" + allowedInPath + "]+(?:\\/[" + allowedInPath + "]*)*))?)?)((?:\\?([" + allowedInPath + "\\/?]*))?)((?:\\#([" + allowedInPath + "\\/?]*))?))?";
var ipv4 = "(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)";
var ipv6 = "(([a-f0-9:]+:+)+[a-f0-9]+)";
var port = "(:\\d{1,5})?";
var protocol = "(https?:|ftps?:)\\/\\/";
var confirmedByProtocol = protocol + "\\S+";
var additionalSlashes = "(([\\/]?))+";
var nonLatinMatches = "(((" + protocol + ")?" + domainWithTLD + ")|" + protocol + domainWithAnyTLD + ")(" + port + ")((((\\/(?:(?:[" + allowedInPath + "]+(?:\\/[" + allowedInPath + dictionary_1.nonLatinAlphabetRanges + "]*)*))?)?)((?:\\?([" + allowedInPath + "\\/?]*))?)((?:\\#([" + allowedInPath + "\\/?]*))?))?\\b((([" + allowedInPath + "\\/" + dictionary_1.nonLatinAlphabetRanges + "][a-zA-Z\\d\\-_~+=\\/" + dictionary_1.nonLatinAlphabetRanges + "]+)?))+)";
exports.email = "\\b(mailto:)?" + email_address + "@(" + domainWithTLD + "|" + ipv4 + ")\\b";
exports.url = "(" + nonLatinMatches + ")|(\\b(((" + protocol + ")?(" + domainWithTLD + "|" + ipv4 + "|" + protocol + "(" + ipv6 + "|" + domainWithAnyTLD + "))(?!@\\w)" + port + path + ")|(" + confirmedByProtocol + "))\\b" + additionalSlashes + ")";
exports.file = "file:\\/\\/\\/([a-z]+:\\/)?([\\w.]+[\\/\\\\]?)+";
exports.final = exports.url + "|" + exports.email + "|" + exports.file;
exports.finalRegex = new RegExp(exports.final, "gi");
// for validation purposes
exports.ipRegex = new RegExp("^(" + ipv4 + "|" + ipv6 + ")$", "i");
exports.emailRegex = new RegExp("^(" + exports.email + ")$", "i");
exports.fileRegex = new RegExp("^(" + exports.file + ")$", "i");
exports.urlRegex = new RegExp("^(" + exports.url + ")$", "i");
exports.protocolPresent = /^((file:\/\/\/)|(https?:|ftps?:)\/\/|(mailto:))/i;
