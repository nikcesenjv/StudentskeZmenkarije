class Person:
    def __init__(self, name, surname, gender, number):
        self.name = name
        self.surname = surname
        self.gender = gender
        self.number = number

        self.dates = []
        self.chosen = None

        self.check_gender()
        self.check_number()
        self.parsed = self.parse_data()

    def get_info(self):
        return f"Ime:     {self.name}\n" \
               f"Priimek: {self.surname}\n" \
               f"Spol:    {self.gender}\n" \
               f"Telefon: {self.number}"

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

    def get_parsed(self):
        return self.parsed

    def parse_data(self):
        return {"name": self.name,
                "surname": self.surname,
                "gender": self.gender,
                "number": self.number,
                "dates": self.dates,
                "chosen": self.chosen}