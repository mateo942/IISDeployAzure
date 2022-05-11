param
(
    [string]$name = ""
)

Import-Module WebAdministration

$website =  Get-WebSite $name

if ($website)
{
    exit 1;
}

exit 0;