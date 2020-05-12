Copy-Item -Path .\Profinet-backend -Destination C:\
Copy-Item -Path .\Profinet-backend\pn_discovery.nse -Destination C:\
$client = new-object System.Net.WebClient
$client.DownloadFile("https://nodejs.org/dist/v12.16.3/node-v12.16.3-x64.msi", ".\node-js-installer.msi")
.\node-js-installer.msi
$client = new-object System.Net.WebClient
$client.DownloadFile("https://nmap.org/dist/nmap-7.80-setup.exe", ".\nmap.exe")
.\nmap.exe
echo "bitte Installationen druchführen"
$test = Read-Host "Alle Installationenen wurden ausgeführt (Y)"
echo "führen sie nun den Befehl 'node-red' aus und navigieren sie im Browser auf http://localhost:1880"
echo "Dort importieren sie bitte die .json aus dem Backend Ordner und drücken auf Deploy. Nun ist das Backend einsatzbereit."
cmd.exe