# ŠTUDENTSKE ZMENKARIJE - Nik Česenj Vodovnik (oktober 2022)
# Za potrebe ŠD JFG
# Datoteka: main.py
import csv
import json

from Person import Person


def get_data():
    id_counter = 0
    data_dict = {}

    with open("../../lib/odgovori.csv", encoding="utf-8") as csv_file_handler:
        csv_reader = csv.DictReader(csv_file_handler)

        for row in csv_reader:
            values = list(row.values())
            data_dict[id_counter] = Person(values[1],
                                           values[2],
                                           values[3],
                                           values[4],
                                           values[5],
                                           values[6]).get_parsed()
            id_counter += 1

    return data_dict


def write_json(data):
    with open("../../lib/info.json", "w", encoding="utf-8") as json_file_handler:
        json_file_handler.write(json.dumps(data, indent=4))

    return data


def check_compatibility(podatki):
    try:
        first_person = input("Za koga gledamo kompatibilnost? [id] ")

        message = f"{podatki[first_person]['name']} je izbral"

        if podatki[first_person]["gender"] == "F":
            message += f"a {podatki[podatki[first_person]['chosen']]['name']}a."
        else:
            message += f" {podatki[podatki[first_person]['chosen']]['name'][:-1]}o."

        print(message)

        if podatki[podatki[first_person]["chosen"]]["chosen"] == first_person:
            print(f"Osebi sta kompatibilni!")
            print()
        elif podatki[podatki[first_person]["chosen"]]["chosen"] is None:
            print("Druga oseba še ni izbrala svojega favorita.")
            print()
        else:
            print("Osebi nista kompatibilni. 🙁")
            print()

    except KeyError:
        print("Druga oseba še ni izbrala svojega favorita.")
        print()


def main():
    podatki = None

    while True:
        action = input("Kaj želiš storiti?\n"
                       "u --> uredi podatke\n"
                       "g --> pridobi podatke\n"
                       "i --> izpiši podatke\n"
                       "p --> preveri kompatibilnost\n"
                       "q --> zapri program\n"
                       "Ukaz: ")
        print()

        if action == "u":
            podatki = get_data()
        elif action == "g":
            if podatki is None:
                print("Podatki še niso bili pridobljeni. Poizkusi še enkrat.")
                print()
            else:
                write_json(podatki)
                print("Poglej podatke v info.json datoteki.")
                print()
        elif action == "i":
            if podatki is None:
                print("Podatki še niso bili pridobljeni. Poizkusi še enkrat.")
                print()
            else:
                print(podatki)
                print()
        elif action == "p":
            if podatki is None:
                print("Podatki še niso bili pridobljeni. Poizkusi še enkrat.")
                print()
            else:
                check_compatibility(podatki)
        elif action == "q":
            break
        else:
            print("Tega ukaza ni na seznamu. Poizkusi še enkrat.")
            print()

    print("Program se zapira.")


if __name__ == '__main__':
    main()
