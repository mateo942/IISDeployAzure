param
(
    [string]$site = "",
    [string]$name = "",
    [string]$physicalPath = "",
    [string]$applicationPool = ""
)

Import-Module WebAdministration

New-WebApplication -Name $name -Site $site -PhysicalPath $physicalPath -ApplicationPool $applicationPool

exit 1