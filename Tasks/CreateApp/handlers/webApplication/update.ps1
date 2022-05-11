param
(
    [string]$site = "",
    [string]$name = "",
    [string]$physicalPath = "",
    [string]$applicationPool = ""
)

Import-Module WebAdministration

$webApplication = "IIS:\Sites\$($site )\$($name)\";

Set-ItemProperty -Path $webApplication applicationPool $applicationPool
Set-ItemProperty -Path $webApplication physicalPath $physicalPath

exit 1