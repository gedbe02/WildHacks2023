import sqlite3

conn = sqlite3.connect('rocksdb.db')
cursor = conn.cursor()
result = conn.execute("select * from rocks")

# Get the result set as a list of tuples
result_set = cursor.fetchall()

# Print each row of the result set
for row in result:
    print(row)

conn.close()