param
(
    [string]$site = "",
    [string]$name = ""
)

Import-Module WebAdministration

$application =  Get-WebApplication -Site $site -Name $name

if ($application)
{
    exit 1;
}

exit 0;