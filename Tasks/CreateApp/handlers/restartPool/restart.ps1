param
(
    [string]$poolName = ""
)

Import-Module WebAdministration

Restart-WebAppPool $poolName