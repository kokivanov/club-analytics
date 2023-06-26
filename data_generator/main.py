import dataclasses
from datetime import datetime, timedelta
from random import randrange, choice
import lorem
import psycopg2

CONNECTION_STRING = "dbname=analytics user=postgres password=123pswd port=5435"

START_PERIOD = datetime(2020, 1, 1, 0, 0, 0, 0)
DAY_MAX_ADD = 365*3
HOURS_MAX_ADD = 14
MIN_MAX_ADD = 60*3
MAX_VISITORS = 3000

CLUBS_AMOUNT = 3
MAX_PER_CLUB = 400000

def create_visit_time():
    start_time = START_PERIOD + timedelta(days=randrange(0, DAY_MAX_ADD), hours=randrange(7, HOURS_MAX_ADD), minutes=randrange(0, 60))
    end_time = start_time + timedelta(minutes=randrange(25, MIN_MAX_ADD))
    
    return start_time, end_time

@dataclasses.dataclass
class visit():
    club_id : int
    start_time : datetime
    end_time : datetime
    duration : int
    visitor_id : int
    with_tutor : bool

@dataclasses.dataclass   
class club():
    name : str
    description : str
    
@dataclasses.dataclass   
class visitor():
    age : int
    gender : str

def make_clubs():
    for _ in range(CLUBS_AMOUNT):
        yield club(
            name=" ".join(lorem.sentence().split(' ')[0:4]),
            description=lorem.paragraph()
            )
    

def make_visits(club_id):
    for _ in range(randrange(int(MAX_PER_CLUB/2), MAX_PER_CLUB)):
        start_time, end_time = create_visit_time()
        duration = (end_time - start_time).seconds
        yield visit(club_id, start_time, end_time, duration, randrange(MAX_VISITORS), choice([True, False]))

def make_visitors():
    for _ in range(MAX_VISITORS):
        yield visitor(randrange(12, 81), choice(['MALE', 'FEMALE']))

def main():
    conn = psycopg2.connect(CONNECTION_STRING)
    cur = conn.cursor()

    cur.execute("delete from visitor")
    cur.execute("delete from club")
    cur.execute("delete from visit")

    print("")
    for vi, vs in enumerate(make_visitors()):
        cur.execute("insert into visitor(id, age, gender) values(%s, %s, %s)", (vi, vs.age, vs.gender))
    conn.commit()
    for ci, c in enumerate(make_clubs()):
        cur.execute("insert into club(id, name, description) values(%s, %s, %s)", (ci, c.name, c.description))
        conn.commit()
        for vi, v in enumerate(make_visits(ci)):
            print(f"Club {ci+1}/{CLUBS_AMOUNT}: {int((vi/MAX_PER_CLUB)*100)}%    \r", end='')
            cur.execute("insert into visit(club_id, start_time, end_time, duration, visitor_id, with_tutor) values (%s, %s, %s, %s, %s, %s)", (v.club_id, v.start_time.isoformat(), v.end_time.isoformat(), v.duration, v.visitor_id, v.with_tutor))
        conn.commit()
    cur.close()
    conn.close()

if __name__ == "__main__":
    main()