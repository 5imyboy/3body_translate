import mysql.connector

"""
Run:
GRANT ALL PRIVILEGES ON translate.* to '3body'@'localhost'
in mysql before using this
"""
def dbTranslate3bodySetup(content):
    """
    Makes a new SQL database and table for the translation of the 3 Body Problem.
    The table, 3body, will contain 3 columns: 
    - the page number
    - the untranslated simplified chinese text
    - the translated english text (we won't fill it in here)

    parameter content: list of dictionaries, each dictionary is a page of a processed pdf
    """

    db = mysql.connector.connect(
    host="localhost",
    user="3body",
    password="password"
    )

    cursor = db.cursor()

    columns = [
        "page_number",
        "untranslated_chinese",
        "translated_english"
    ]

    setup_queries = [
        "CREATE DATABASE IF NOT EXISTS translate ",
        "USE translate ",
        "DROP TABLE IF EXISTS 3body ",
        "CREATE TABLE 3body ("+columns[0]+" INT, "+columns[1]+" TEXT, "+columns[2]+" TEXT) "
    ]

    data_query = (
        "INSERT INTO 3body "
        "VALUES (%("+columns[0]+")s, %("+columns[1]+")s, %("+columns[2]+")s)"
    )

    select_queries = [
        "SELECT * FROM 3body"
    ]

    data_example = {
        columns[0]: 1,
        columns[1]: "你好",
        columns[2]: "hello"
    }

    for query in setup_queries:
        cursor.execute(query)

    for page in content:
        data = {
            columns[0]: "",
            columns[1]: "",
            columns[2]: ""
        }
        i = 0
        for key in page:
            data[columns[i]] = page[key]
            i = i+1
            if i > len(columns): break

        cursor.execute(data_query, data)

    db.commit()
    cursor.close()
    db.close()
