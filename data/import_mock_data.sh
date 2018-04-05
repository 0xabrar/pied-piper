HOST="Cluster0-shard-0/cluster0-shard-00-00-sxvcc.mongodb.net:27017,cluster0-shard-00-01-sxvcc.mongodb.net:27017,cluster0-shard-00-02-sxvcc.mongodb.net:27017"
USERNAME="admin"
PASSWORD="Y70TcYY3BVVKK7zp"
AUTHDB="admin"
DB="test"

mongoimport --host $HOST --ssl --username $USERNAME --password $PASSWORD --authenticationDatabase $AUTHDB --db $DB --collection Faculty --drop --type json --file ./FACULTY_DATA.json

mongoimport --host $HOST --ssl --username $USERNAME --password $PASSWORD --authenticationDatabase $AUTHDB --db $DB --collection Applicants --drop --type json --file ./APPLICANT_DATA.json

mongoimport --host $HOST --ssl --username $USERNAME --password $PASSWORD --authenticationDatabase $AUTHDB --db $DB --collection Tickets --drop --type json --file ./TICKET_DATA.json