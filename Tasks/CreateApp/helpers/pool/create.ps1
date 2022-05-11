param
(
    [string]$poolName = "",
    [string]$managedRuntimeVersion = "",
    [bool]$use32bit = $false
)

Import-Module WebAdministration

$appPool = New-WebAppPool -Name $poolName

if($managedRuntimeVersion -ne "") 
{
    $appPool.managedRuntimeVersion = $managedRuntimeVersion
}

$appPool.enable32BitAppOnWin64 = $use32bit

$appPool | Set-Item

exit 1