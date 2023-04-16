from google.cloud.sql.connector import Connector
import sqlalchemy
import pymysql

# initialize Connector object
connector = Connector()

# function to return the database connection
def getconn() -> pymysql.connections.Connection:
    conn: pymysql.connections.Connection = connector.connect(
        "onyx-gear-383819:us-central1:rockdb01",
        "pymysql",
        user="root",
        password="root",
        db="RockServdb"
    )
    return conn

# create connection pool
pool = sqlalchemy.create_engine(
    "mysql+pymysql://",
    creator=getconn,
)

# DDL statement to create test_table
create_table_stmt = sqlalchemy.text(
    """CREATE TABLE posts (
    assetid INT,
    userid VARCHAR(255),
    location VARCHAR(255),
    photourl VARCHAR(255),
    artist VARCHAR(255),
    caption VARCHAR(255)
)"""
)

with pool.connect() as db_conn:
    # create table
    #db_conn.execute(create_table_stmt)

    # insert into database
    #db_conn.execute(sqlalchemy.text("INSERT INTO posts (assetid, userid, location, photourl, artist, caption) VALUES (1, 10, '0,0', 'www.google.com', 'unknown', 'cool haha funny');"))
    
    # query database
    result = db_conn.execute(sqlalchemy.text("SELECT * from posts")).fetchall()
    drop_table_stmt = sqlalchemy.text('DROP TABLE posts')
    db_conn.execute(drop_table_stmt)

    # commit transaction (SQLAlchemy v2.X.X is commit as you go)
    db_conn.commit()

    # Do something with the results
    for row in result:
        print(row)


connector.close()