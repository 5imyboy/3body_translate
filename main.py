import argparse
import parsepdf as p
import translate_ch as t
import SQL3body as db
import mysql.connector

def main():

    parser = argparse.ArgumentParser(prog="main", description="makes backend and db")
    parser.add_argument("-r", "--remake", help="if set, will remake the database even if it exists", action="store_const", const=True)

    args = parser.parse_args()

    content = []
    content = p.pdfinit(args.remake)
    if (content):
        content = t.translateEnglish(content)
        db.dbTranslate3bodySetup(content)
    '''

    d = mysql.connector.connect(
    host="localhost",
    user="3body",
    password="password"
    )
    cursor = d.cursor()

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
    
    for query in setup_queries:
        cursor.execute(query)

    d.commit()
    cursor.close()
    d.close()
    '''

if __name__ == "__main__":
    main()