param
(
    [string]$poolName = "",
    [string]$physicalPath = "",
    [string]$binding = "",
    [int]$port = 80,
    [string]$name = ""
)

Import-Module WebAdministration

New-WebSite -Name $name -Port $port -HostHeader $binding -PhysicalPath $physicalPath -ApplicationPool $poolName