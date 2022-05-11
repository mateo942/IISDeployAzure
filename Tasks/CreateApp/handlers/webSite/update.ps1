param
(
    [string]$poolName = "",
    [string]$physicalPath = "",
    [string]$binding = "",
    [int]$port = 80,
    [string]$name = ""
)

Import-Module WebAdministration

$websiteName = "IIS:\Sites\$($name)"

Set-ItemProperty -Path $websiteName applicationPool $poolName
Set-ItemProperty -Path $websiteName physicalPath $physicalPath