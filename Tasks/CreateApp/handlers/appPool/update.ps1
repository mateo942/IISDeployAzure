param
(
    [string]$poolName = "",
    [string]$managedRuntimeVersion = "",
    [bool]$use32bit = $false
)

Import-Module WebAdministration

$name = "IIS:\AppPools\$($poolName)"

if($managedRuntimeVersion -ne "") 
{
    Set-ItemProperty -Path $name managedRuntimeVersion $managedRuntimeVersion
    $appPool.managedRuntimeVersion = $managedRuntimeVersion
}

Set-ItemProperty -Path $name enable32BitAppOnWin64 $use32bit

exit 1