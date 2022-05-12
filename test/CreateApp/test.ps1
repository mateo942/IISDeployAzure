Set-Location .\..\..\Tasks\CreateApp

# App pool
$env:INPUT_COMMAND = 'appPool';

$env:INPUT_APPPOOLNAME = 'HelloWorld';
$env:INPUT_APPPOOLRUNTIMEVERSION = 'v4.0';
$env:INPUT_APPPOOLUSE32BIT = 'false';

node index.js

Write-Host '';
Write-Host '';
Write-Host '';
Write-Host '';

#Website
$env:INPUT_COMMAND = 'webSite';

$env:INPUT_WEBSITENAME = 'HelloWorld';
$env:INPUT_WEBSITEPHYSICALPATH = 'C:\AzureEx\IISDeployAzure\test\CreateApp\testFolder';
$env:INPUT_WEBSITEAPPPOOLNAME = 'HelloWorld';
$env:INPUT_WEBSITETHUMBPRINT = '';
$env:INPUT_WEBSITEBINDING = 'localhost';
$env:INPUT_WEBSITEPORT = '5000';

node index.js

Write-Host '';
Write-Host '';
Write-Host '';
Write-Host '';

# Web Application
$env:INPUT_COMMAND = 'webApplication';

$env:INPUT_WEBAPPLICATIONNAME = 'HelloWorld';
$env:INPUT_WEBAPPLICATIONWEBSITE = 'HelloWorld';
$env:INPUT_WEBAPPLICATIONPHYSICALPATH = 'C:\AzureEx\IISDeployAzure\test\CreateApp\testFolder';
$env:INPUT_WEBAPPLICATIONAPPLICATIONPOOL = 'HelloWorld';

node index.js

Write-Host '';
Write-Host '';
Write-Host '';
Write-Host '';

# Web Binding
$env:INPUT_COMMAND = 'webBinding';

$env:INPUT_WEBBINDINGNAME = 'HelloWorld';
$env:INPUT_WEBBINDINGPORT = '5001';
$env:INPUT_WEBBINDINGHOSTNAME = '127.0.0.1.nip.io';
$env:INPUT_WEBBINDINGPROTOCOL = 'http';
$env:INPUT_WEBBINDINGTHUMBPRINT = '';
$env:INPUT_WEBBINDINGSSLCONTAINER = '';

node index.js

Write-Host '';
Write-Host '';
Write-Host '';
Write-Host '';

# Restart

$env:INPUT_COMMAND = 'restart';

$env:INPUT_RESTARTPOOLNAME = 'HelloWorld';

node index.js

Write-Host '';
Write-Host '';
Write-Host '';
Write-Host '';

Set-Location .\..\..\test\CreateApp