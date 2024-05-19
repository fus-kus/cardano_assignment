import json
import sqlite3

# Load JSON data
with open('dummy_db.json', 'r') as file:
    users = json.load(file)

# Connect to SQLite database (or create it)
conn = sqlite3.connect('test.db')
cursor = conn.cursor()

# Create table
cursor.execute('''
    CREATE TABLE users (
        id TEXT PRIMARY KEY,
        firstName TEXT,
        lastName TEXT,
        email TEXT,
        age INTEGER,
        maritalStatus TEXT,
        address TEXT
    )
''')

# Insert data into table
for user in users:
    cursor.execute(
        '''
        INSERT INTO users (id, firstName, lastName, email, age, maritalStatus, address)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', (user['id'], user['firstName'], user['lastName'], user['email'],
          user['age'], user['maritalStatus'], user['address']))

# Commit and close
conn.commit()
conn.close()
