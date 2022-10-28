# ŠTUDENTSKE ZMENKARIJE - Nik Česenj Vodovnik (oktober 2022)
# Za potrebe ŠD JFG
# Datoteka: Person.py

class Person:
    def __init__(self, name, surname, gender, age, number, email):
        self.name = name
        self.surname = surname
        self.gender = gender
        self.age = age
        self.number = number
        self.email = email

        self.dates = []
        self.chosen = None
        self.status = ["participant", "/"]

        self.check_gender()
        self.check_number()
        self.parsed = self.parse_data()

    def get_name(self):
        return self.name

    def set_name(self, name):
        self.name = name
        self.parsed = self.parse_data()

    def get_surname(self):
        return self.surname

    def set_surname(self, surname):
        self.surname = surname
        self.parsed = self.parse_data()

    def get_gender(self):
        return self.gender

    def set_gender(self, gender):
        self.gender = gender
        self.parsed = self.parse_data()

    def check_gender(self):
        if self.gender == "Moški":
            self.set_gender("M")
        else:
            self.set_gender("F")

    def get_age(self):
        return self.age

    def set_age(self, age):
        self.age = age
        self.parsed = self.parse_data()

    def get_number(self):
        return self.number

    def set_number(self, number):
        self.number = number
        self.parsed = self.parse_data()

    def check_number(self):
        if " " in self.number:
            self.number.replace(" ", "")

        if len(self.number) == 9:
            self.set_number("+386" + self.number[1:])
        elif len(self.number) == 13:
            self.set_number("+386" + self.number[2:])

    def get_email(self):
        return self.email

    def set_email(self, email):
        self.email = email
        self.parsed = self.parse_data()

    def get_dates(self):
        return self.dates

    def add_date(self, date):
        self.dates.append(date)
        self.parsed = self.parse_data()

    def get_chosen(self):
        return self.chosen

    def set_chosen(self, chosen):
        self.chosen = chosen
        self.parsed = self.parse_data()

    def get_status(self):
        return self.status

    def add_status(self, status):
        self.status.append(status)
        self.parsed = self.parse_data()

    def get_parsed(self):
        return self.parsed

    def parse_data(self):
        return {"name": self.name,
                "surname": self.surname,
                "gender": self.gender,
                "age": self.age,
                "number": self.number,
                "dates": self.dates,
                "chosen": self.chosen,
                "status": self.status}