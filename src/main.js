/**
 * reference: https://bobtranslate.com/plugin/api/data.html#data-subdata-start-end
 * @param {str} word word to cache
 * @param {str} filepath cache file path
 * @returns {bool} true: cache success, false: cache failed
 */
function cacheToFile(word, filepath) {
  // read old data
  const oldData = $file.read(filepath);
  const newData = $data.fromUTF8(word + "\n");

  // merge old data
  if ($data.isData(oldData)) {
    newData.appendData(oldData);
  }

  // write to file
  return $file.write({
    data: newData,
    path: filepath,
  });
}

/**
 * @returns {bool} true: clear cache success, false: clear cache failed
 */
function clearCache() {
  return true;
}

/**
 * import word to BBDC(不背单词)
 * @returns {bool} true: import success, false: import failed
 */
function importToBBDC() {
  const vocabularyName = "bob-vocabulary";
  var cookie = options.cookie;
  return true;
}

/**
 * import word to GoogleSheet
 * @returns {bool} true: import success, false: import failed
 */
function importToGoogleSheet() {
  return true;
}

/**
 * @returns {string[]}
 */
function supportLanguages() {
  return ["auto", "en", "zh-Hans", "zh-Hant", "yue"];
}

/**
 * @param {string} text
 * @returns {string} formatted text
 */
function formattedWord(text) {
  text = text.trim();
  // check if only include a-zA-Z character, if true, convert to lower case
  if (/^[a-zA-Z]+$/.test(text)) {
    return text.toLowerCase();
  } else {
    return "";
  }
}

/**
 * reference: https://bobtranslate.com/plugin/quickstart/translate.html#_2-执行翻译
 * @param {object} query
 * @returns {void}
 */
function translate(query) {
  const filepath = "$sandbox/vocabulary.txt";
  const word = formattedWord(query.text);
  const result = {
    toParagraphs: [],
  };

  // check if english word
  if (query.detectFrom !== "en" || word === "") {
    result.toParagraphs = ["非英文单词，略过"];
    query.onCompletion({ result });
    return;
  }

  cacheToFile(word, filepath);

  result.toParagraphs = [word];
  query.onCompletion({ result });
}

/**
 *
 * @returns {number} timeout interval, unit: second
 */
function pluginTimeoutInterval() {
  return 10;
}

/**
 * reference: https://bobtranslate.com/plugin/quickstart/translate.html#_4-自定义验证
 * @param {object} completion
 * @returns {void}
 */
function pluginValidate(completion) {
  // 验证成功示例
  completion({ result: true });

  // 验证失败示例
  completion({
    result: false,
    error: {
      type: "secretKey",
      message: "未设置秘钥",
      troubleshootingLink: "https://www.google.com",
    },
  });
}
