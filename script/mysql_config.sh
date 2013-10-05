#!/bin/bash
#  mysql database setup for human
#  should only need to be run once 
#  to set things up
#

mysql.server start
mysql -u root < mysql_database_setup
