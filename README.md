To run the db instance, launch docker via this command 
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=Password1&" -p 1433:1433 -d mcr.microsoft.com/mssql/server:2022-latest
