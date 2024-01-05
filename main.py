import argparse
import parsepdf as p
import translate_ch as t
import SQL3body as db

def main():

    parser = argparse.ArgumentParser(prog="main", description="makes backend and db")
    parser.add_argument("-r", "--remake", help="if set, will remake the database even if it exists", action="store_const", const=True)

    args = parser.parse_args()

    content = []
    content = p.pdfinit(args.remake)
    if (content):
        content = t.translateEnglish(content)
        db.dbTranslate3bodySetup(content)

if __name__ == "__main__":
    main()