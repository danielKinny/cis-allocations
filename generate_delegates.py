#!/usr/bin/env python3
import random
import csv
import json
from datetime import datetime

# Read committees to get all committee names
with open('/Users/danny/cis-allocations/committees.json', 'r') as f:
    committees = json.load(f)
    committee_names = [committee["name"] for committee in committees]

# First and last names for random generation
first_names = [
    "James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth",
    "David", "Susan", "Richard", "Jessica", "Joseph", "Sarah", "Thomas", "Karen", "Charles", "Nancy",
    "Christopher", "Lisa", "Daniel", "Margaret", "Matthew", "Betty", "Anthony", "Sandra", "Mark", "Ashley",
    "Donald", "Emily", "Steven", "Donna", "Paul", "Michelle", "Andrew", "Carol", "Joshua", "Amanda",
    "Kenneth", "Dorothy", "Kevin", "Melissa", "Brian", "Deborah", "George", "Stephanie", "Edward", "Rebecca",
    "Ronald", "Sharon", "Timothy", "Laura", "Jason", "Cynthia", "Jeffrey", "Kathleen", "Ryan", "Amy",
    "Jacob", "Angela", "Gary", "Shirley", "Nicholas", "Anna", "Eric", "Ruth", "Jonathan", "Brenda",
    "Stephen", "Pamela", "Larry", "Nicole", "Justin", "Katherine", "Scott", "Samantha", "Brandon", "Christine",
    "Benjamin", "Helen", "Samuel", "Emma", "Gregory", "Rachel", "Alexander", "Maria", "Patrick", "Catherine",
    "Frank", "Heather", "Raymond", "Diane", "Jack", "Julie", "Dennis", "Joyce", "Jerry", "Victoria",
]

last_names = [
    "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
    "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin",
    "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson",
    "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores",
    "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts",
    "Gomez", "Phillips", "Evans", "Turner", "Diaz", "Parker", "Cruz", "Edwards", "Collins", "Reyes",
    "Stewart", "Morris", "Morales", "Murphy", "Cook", "Rogers", "Gutierrez", "Ortiz", "Morgan", "Cooper",
    "Peterson", "Bailey", "Reed", "Kelly", "Howard", "Ramos", "Kim", "Cox", "Ward", "Richardson",
    "Watson", "Brooks", "Chavez", "Wood", "James", "Bennett", "Gray", "Mendoza", "Ruiz", "Hughes",
    "Price", "Alvarez", "Castillo", "Sanders", "Patel", "Myers", "Long", "Ross", "Foster", "Jimenez",
]

num_delegates = 550
delegates = []

header = [
    "Timestamp", 
    "Enter your name:", 
    "Enter your email:", 
    "Enter the name of your school:", 
    "Personal contact number:", 
    "How many MUNs have you been to?", 
    "What is your first preferred committee?", 
    "What is your second preferred committee? (cannot be identical to first preferred committee)"
]

timestamp = "2025/05/08 11:49:21 AM GMT+4"

for i in range(num_delegates):
    first_name = random.choice(first_names)
    last_name = random.choice(last_names)
    name = f"{first_name} {last_name}"
    first_committee = random.choice(committee_names)
    second_committee = random.choice([c for c in committee_names if c != first_committee])
    
    mun_experience = random.randint(1, 15)
    
    delegate = [
        timestamp,
        name,
        "",  # email
        "CIS",  # school
        "",  # contact number
        mun_experience,
        first_committee,
        second_committee
    ]
    
    delegates.append(delegate)

# Write to CSV
with open('/Users/danny/cis-allocations/input.csv', 'w', newline='') as f:
    writer = csv.writer(f, quoting=csv.QUOTE_ALL)
    
    # Write header and comment
    f.write('// filepath: /Users/danny/cis-allocations/input.csv\n')
    writer.writerow(header)
    
    # Write delegate data
    writer.writerows(delegates)

print(f"Generated {num_delegates} delegates with randomized preferences across all committees")
