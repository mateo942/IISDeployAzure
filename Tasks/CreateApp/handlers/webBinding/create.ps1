param
(
    [string]$name = "",
    [string]$ipAddress = "*",
    [int]$port = 80,
    [string]$hostName = "",
    [string]$protocol = "",
    [string]$thumbPrint = "",
    [string]$sslContainer = "my"
)

Import-Module WebAdministration

New-WebBinding -Name $name -IPAddress $ipAddress -Port $port -HostHeader $hostName -Protocol $protocol

if($thumbPrint -ne "")
{
    $exists = Get-WebBinding -Name $name -Port $port -Protocol $protocol -HostHeader $hostName
    $exists.AddSslCertificate($thumbPrint, $sslContainer)
}