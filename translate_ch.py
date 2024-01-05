from translate import Translator
from deep_translator import GoogleTranslator

TEXT = "text"
PAGE_DELIM = "\n\n"
SENTENCE_DELIM = "。"
LIMIT = 500

def translateEnglish(content):
    """
    translates content (simplified chinese) into english

    assumes content is a list of dictionaries, with the key name in the TEXT variable
    """

    translator = Translator(to_lang='en', from_lang='zh')

    for page in content:
        '''
        translated_page = ""
        untranslated_page_arr = page[TEXT].split(PAGE_DELIM)
        for paragraph in untranslated_page_arr:
            paragraph_arr = paragraph.split(SENTENCE_DELIM)
            for sentence in paragraph_arr:
                i = 0
                while i < len(sentence):
                    translated_page = translated_page + GoogleTranslator(source="zh-CN", target="en").translate(sentence[i:i+LIMIT])
                    i = i + LIMIT
                translated_page = translated_page + SENTENCE_DELIM
            translated_page = translated_page + PAGE_DELIM
            i = 0
        '''
        translated_page = GoogleTranslator(source="zh-CN", target="en").translate(page[TEXT])
        page["translated "+TEXT] = translated_page
        


    return content
