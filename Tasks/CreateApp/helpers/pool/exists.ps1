param
(
    [string]$poolName = ""
)

Import-Module WebAdministration

$appPool =  Get-IISAppPool $poolName

if ($appPool)
{
    exit 1;
}

exit 0;