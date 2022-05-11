param
(
    [string]$name = "",
    [int]$port = 80,
    [string]$hostName = "",
    [string]$protocol = ""
)

Import-Module WebAdministration

$exists = Get-WebBinding -Name $name -Port $port -Protocol $protocol -HostHeader $hostName

Write-Host $exists
if($exists)
{
    exit 1;
}

exit 0;