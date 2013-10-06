# !/bin/bash
#  mysql database setup for human
#  will load wikipedia data into 
#  database
#

mysql.server start
mysql -u root < load_command

