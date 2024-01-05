import os
from multilingual_pdf2text.pdf2text import PDF2Text
from multilingual_pdf2text.models.document_model.document import Document
import logging
#import PyPDF2
#import tika
#tika.initVM()
#from tika import parser

logging.basicConfig(level=logging.INFO)
PAGE=0
PATH=os.getcwd()
INPATH="/pdf/"
OUTPATH="/txt/"

class page:
    pageNum = 0
    text = []

def pdfinit(remake=False):
    """
    converts the pdf in the pdf folder into a text file.
    only supports 1 pdf for now, which is the first pdf it finds in the folder.
    returns a list of dictionaries, each dictionary represents a page of text

    parameter remake: default false. If true will remake txt even if it exists
    """
    # find path of input and output file
    inFile = ""
    outFile = ""
    for f in os.listdir(PATH+INPATH):
        if f[-4:] == ".pdf":
            inFile = PATH+INPATH+f
            outFile = PATH+OUTPATH+f[:-4]+".txt"
            break
    
    # if output file already exists we don't have to make it again
    if os.path.isfile(outFile) and not remake:
        return
    
    # create document for extraction with configurations
    pdf_document = Document(
        document_path=inFile,
        language='chi_sim'
        )
    pdf2text = PDF2Text(document=pdf_document)
    # content is a python List, each item representing a page
    # a page is a dictonary:
    #   page['page_number'] = page number
    #   page['text'] = page content
    content = pdf2text.extract()

    # write document contents to text

    f = open(outFile, "a")
    for c in content:
        makepage(f, c)
    f.close()

    return content

# TODO: insert class (with SQL)
def makepage(file, content):
    file.write(content['text'])

    '''
    pdfinFileObj = open(inFile, 'rb')

    pdfReader = PyPDF2.PdfReader(pdfFileObj)


    i=0
    while i < len(pdfReader.pages):
        pageObj = pdfReader.pages[i]

        # extracting text from page
        print(pageObj.extract_text())
        print(i)

        i = i+1

    # closing the pdf file object
    pdfFileObj.close()
    '''