import Tesseract from 'tesseract.js';

export type TRecognizeResult = {
  result?: string;
  error?: string;
};

export type TRecognize = (url?: string | null, lang?: string) => Promise<TRecognizeResult>;

const recognize: TRecognize = async (url, lang = 'eng') => {
  try {
    if (!url) {
      throw url;
    }
    const result = await Tesseract.recognize(url, lang, {cacheMethod: 'none'});
    return {result: result.data.text};
  } catch (error) {
    return {error: error?.message ?? 'unknownError'};
  }
};

export default recognize;
