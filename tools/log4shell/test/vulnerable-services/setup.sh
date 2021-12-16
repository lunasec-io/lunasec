#!/bin/bash
curl -O https://dlcdn.apache.org/struts/2.5.28/struts-2.5.28-all.zip
unzip struts-2.5.28-all.zip -d struts-2.5.28-all
rm struts-2.5.28-all.zip

curl -O https://dlcdn.apache.org/tomcat/tomcat-8/v8.5.73/bin/apache-tomcat-8.5.73.tar.gz
tar -xvf apache-tomcat-8.5.73.tar.gz
rm apache-tomcat-8.5.73.tar.gz

curl -O https://dlcdn.apache.org/tomcat/tomcat-10/v10.1.0-M8/bin/apache-tomcat-10.1.0-M8.tar.gz
tar -xvf apache-tomcat-10.1.0-M8.tar.gz
rm apache-tomcat-10.1.0-M8.tar.gz

curl -O https://dlcdn.apache.org/tomcat/tomcat-9/v9.0.56/bin/apache-tomcat-9.0.56.tar.gz
tar -xvf apache-tomcat-9.0.56.tar.gz
rm apache-tomcat-9.0.56.tar.gz
